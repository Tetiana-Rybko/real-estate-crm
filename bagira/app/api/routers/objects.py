from __future__ import annotations

import os
import uuid
from typing import Any, Literal, Optional

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status,Response
from pydantic import BaseModel, Field

from app.api.deps import CurrentUser, require_roles
from app.models.user import UserRole

router = APIRouter(prefix="/objects", tags=["objects"])

ObjectKind = Literal["apartment", "house", "commercial", "land", "other"]


class ObjectBase(BaseModel):
    kind: ObjectKind = "apartment"
    name: str = ""
    address: str = ""
    city: str = ""
    status: str = "new"  # new / active / archived
    price: Optional[float] = None
    currency: str = "UAH"
    photos: list[str] = []
    details: dict[str, Any] = Field(default_factory=dict)


class ObjectCreate(ObjectBase):
    pass


class ObjectUpdate(BaseModel):
    kind: Optional[ObjectKind] = None
    name: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    status: Optional[str] = None
    price: Optional[float] = None
    currency: Optional[str] = None
    details: Optional[dict[str, Any]] = None


class ObjectItem(ObjectBase):
    id: int


_DB: list[ObjectItem] = []
_NEXT_ID = 1


@router.get(
    "",
    response_model=list[ObjectItem],
    dependencies=[Depends(require_roles(UserRole.ADMIN, UserRole.AGENT))],
)
def list_objects(user: CurrentUser) -> list[ObjectItem]:
    return _DB


@router.post(
    "",
    response_model=ObjectItem,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_roles(UserRole.ADMIN, UserRole.AGENT))],
)
def create_object(payload: ObjectCreate, user: CurrentUser) -> ObjectItem:
    global _NEXT_ID
    item = ObjectItem(id=_NEXT_ID, **payload.model_dump())
    _NEXT_ID += 1
    _DB.append(item)
    return item


@router.get(
    "/{object_id}",
    response_model=ObjectItem,
    dependencies=[Depends(require_roles(UserRole.ADMIN, UserRole.AGENT))],
)
def get_object(object_id: int, user: CurrentUser) -> ObjectItem:
    for obj in _DB:
        if obj.id == object_id:
            return obj
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Object not found")


@router.put(
    "/{object_id}",
    response_model=ObjectItem,
    dependencies=[Depends(require_roles(UserRole.ADMIN, UserRole.AGENT))],
)
def update_object(object_id: int, payload: ObjectUpdate, user: CurrentUser) -> ObjectItem:
    for i, obj in enumerate(_DB):
        if obj.id == object_id:
            data = obj.model_dump()
            patch = payload.model_dump(exclude_unset=True)

            # merge details
            if "details" in patch and isinstance(patch["details"], dict):
                data["details"] = {**(data.get("details") or {}), **patch["details"]}
                patch.pop("details")

            data.update(patch)
            updated = ObjectItem(**data)
            _DB[i] = updated
            return updated

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Object not found")


@router.delete(
    "/{object_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    response_class=Response,
    dependencies=[Depends(require_roles(UserRole.ADMIN, UserRole.AGENT))],
)
def delete_object(object_id: int, user: CurrentUser) -> Response:
    for i, obj in enumerate(_DB):
        if obj.id == object_id:
            _DB.pop(i)
            return Response(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Object not found",
    )

@router.post(
    "/{object_id}/photos",
    dependencies=[Depends(require_roles(UserRole.ADMIN, UserRole.AGENT))],
)
def upload_photo(object_id: int, user: CurrentUser, file: UploadFile = File(...)):
    os.makedirs("uploads", exist_ok=True)

    for i, obj in enumerate(_DB):
        if obj.id == object_id:
            ext = os.path.splitext(file.filename or "")[1].lower() or ".jpg"
            name = f"{uuid.uuid4().hex}{ext}"
            path = os.path.join("uploads", name)

            with open(path, "wb") as f:
                f.write(file.file.read())

            url = f"/uploads/{name}"

            data = obj.model_dump()
            photos = list(data.get("photos") or [])
            photos.append(url)
            data["photos"] = photos

            updated = ObjectItem(**data)
            _DB[i] = updated
            return {"url": url}
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Object not found")
@router.delete(
    "/{object_id}/photos",
    dependencies=[Depends(require_roles(UserRole.ADMIN, UserRole.AGENT))],
)
def delete_photo(object_id: int, user: CurrentUser, url: str):
    for i, obj in enumerate(_DB):
        if obj.id == object_id:
            data = obj.model_dump()
            photos = list(data.get("photos") or [])

            if url not in photos:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Photo not found")

            photos.remove(url)
            data["photos"] = photos
            _DB[i] = ObjectItem(**data)

            if url.startswith("/uploads/"):
                path = os.path.join("uploads", url.split("/uploads/")[1])
                if os.path.exists(path):
                    os.remove(path)

            return {"ok": True}

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Object not found")