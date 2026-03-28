from uuid import uuid4
import os

from fastapi import APIRouter, UploadFile, File, HTTPException, status
from sqlalchemy import select,update,func

from app.api.deps import DBSession, CurrentUser
from app.models.property import Property
from app.models.property_image import PropertyImage
from app.schemas.property import PropertyImageOut

router = APIRouter(prefix="/properties", tags=["property-images"])

UPLOAD_DIR = "uploads"


@router.post("/{property_id}/images")
async def upload_images(
    property_id: int,
    db: DBSession,
    user: CurrentUser,
    files: list[UploadFile] = File(...),
):
    property_obj = db.get(Property, property_id)
    if not property_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found",
        )

    os.makedirs(UPLOAD_DIR, exist_ok=True)

    existing_main = db.scalar(
        select(PropertyImage.id).where(
            PropertyImage.property_id == property_id,
            PropertyImage.is_main.is_(True),
        ).limit(1)
    )

    existing_count = db.scalar(
        select(func.count())
        .select_from(PropertyImage)
        .where(PropertyImage.property_id == property_id)
    ) or 0

    saved = []

    for idx, file in enumerate(files[:20]):
        ext = file.filename.split(".")[-1] if "." in file.filename else "jpg"
        filename = f"{uuid4()}.{ext}"
        path = os.path.join(UPLOAD_DIR, filename)

        with open(path, "wb") as buffer:
            buffer.write(await file.read())

        img = PropertyImage(
            property_id=property_id,
            file_path=path,
            is_main=(existing_main is None and idx == 0),
            sort_order=existing_count + idx,
        )

        db.add(img)
        saved.append(img)

    db.commit()

    return {"uploaded": len(saved)}
@router.post("/images/{image_id}/make-main", response_model=PropertyImageOut)
def make_image_main(
    image_id: int,
    db: DBSession,
    user: CurrentUser,
):
    image = db.get(PropertyImage, image_id)
    if not image:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Image not found",
        )

    property_obj = db.get(Property, image.property_id)
    if not property_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found",
        )

    db.execute(
        update(PropertyImage)
        .where(PropertyImage.property_id == image.property_id)
        .values(is_main=False)
    )

    image.is_main = True
    db.commit()
    db.refresh(image)
    return image


@router.get(
    "/{property_id}/images",
    response_model=list[PropertyImageOut],
)
def list_property_images(
    property_id: int,
    db: DBSession,
    user: CurrentUser,
):
    property_obj = db.get(Property, property_id)
    if not property_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found",
        )

    images = db.scalars(
        select(PropertyImage)
        .where(PropertyImage.property_id == property_id)
        .order_by(PropertyImage.is_main.desc(), PropertyImage.sort_order.asc(), PropertyImage.id.asc())
    ).all()

    return images
@router.delete(
    "/images/{image_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_property_image(
    image_id: int,
    db: DBSession,
    user: CurrentUser,
):
    image = db.get(PropertyImage, image_id)
    if not image:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Image not found",
        )

    property_obj = db.get(Property, image.property_id)
    if not property_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found",
        )

    was_main = image.is_main
    property_id = image.property_id
    file_path = image.file_path

    db.delete(image)
    db.commit()

    if file_path and os.path.exists(file_path):
        try:
            os.remove(file_path)
        except OSError:
            pass

    if was_main:
        next_image = db.scalars(
            select(PropertyImage)
            .where(PropertyImage.property_id == property_id)
            .order_by(PropertyImage.sort_order.asc(), PropertyImage.id.asc())
        ).first()

        if next_image:
            next_image.is_main = True
            db.commit()

    return None