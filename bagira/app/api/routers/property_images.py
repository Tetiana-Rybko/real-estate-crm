from fastapi import APIRouter, UploadFile, File
from uuid import uuid4
import os

from app.api.deps import DBSession, CurrentUser
from app.models.property_image import PropertyImage

router = APIRouter(prefix="/properties", tags=["property-images"])

UPLOAD_DIR = "uploads"


@router.post("/{property_id}/images")
async def upload_images(
    property_id: int,
    db: DBSession,
    user: CurrentUser,
    files: list[UploadFile] = File(...),
):
    os.makedirs(UPLOAD_DIR, exist_ok=True)

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
            is_main=(idx == 0),
            sort_order=idx,
        )
        db.add(img)
        saved.append(img)

    db.commit()

    return {"uploaded": len(saved)}