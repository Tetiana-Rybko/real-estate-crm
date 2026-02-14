from typing import Any, Literal, Optional
from fastapi import APIRouter, HTTPException,UploadFile,File
from pydantic import BaseModel, Field
import os
import uuid

router = APIRouter(prefix="/objects", tags=["objects"])

ObjectKind = Literal["apartment", "house", "commercial", "land", "other"]

class ObjectBase(BaseModel):
    kind: ObjectKind = "apartment"
    name: str = ""
    address: str = ""
    city: str = ""
    status: str = "new"           # new / active / archived (пока строкой)
    price: Optional[float] = None
    currency: str = "UAH"
    photos: list[str] = []
    details: dict[str, Any] = Field(default_factory=dict)  # сюда кладем всё из листа

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

# временное хранилище (быстро, чтобы SRM “ожила”)
_DB: list[ObjectItem] = []
_NEXT_ID = 1


@router.get("/", response_model=list[ObjectItem])
def list_objects() -> list[ObjectItem]:
    return _DB


@router.post("/", response_model=ObjectItem, status_code=201)
def create_object(payload: ObjectCreate) -> ObjectItem:
    global _NEXT_ID
    item = ObjectItem(id=_NEXT_ID, **payload.model_dump())
    _NEXT_ID += 1
    _DB.append(item)
    return item

@router.post("/{object_id}/photos")
def upload_photo(object_id: int, file: UploadFile = File(...)):
    # найдём объект
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

    raise HTTPException(status_code=404, detail="Object not found")


@router.get("/{object_id}", response_model=ObjectItem)
def get_object(object_id: int) -> ObjectItem:
    for obj in _DB:
        if obj.id == object_id:
            return obj
    raise HTTPException(status_code=404, detail="Object not found")


@router.put("/{object_id}", response_model=ObjectItem)
def update_object(object_id: int, payload: ObjectUpdate) -> ObjectItem:
    for i, obj in enumerate(_DB):
        if obj.id == object_id:
            data = obj.model_dump()
            patch = payload.model_dump(exclude_unset=True)

            # если details пришёл — мерджим
            if "details" in patch and isinstance(patch["details"], dict):
                data["details"] = {**(data.get("details") or {}), **patch["details"]}
                patch.pop("details")

            data.update(patch)
            updated = ObjectItem(**data)
            _DB[i] = updated
            return updated

    raise HTTPException(status_code=404, detail="Object not found")


@router.delete("/{object_id}", status_code=204)
def delete_object(object_id: int) -> None:
    for i, obj in enumerate(_DB):
        if obj.id == object_id:
            _DB.pop(i)
            return
    raise HTTPException(status_code=404, detail="Object not found")

@router.delete("/{object_id}/photos")
def delete_photo(object_id: int, url: str):
    for i, obj in enumerate(_DB):
        if obj.id == object_id:
            data = obj.model_dump()
            photos = list(data.get("photos") or [])

            if url not in photos:
                raise HTTPException(status_code=404, detail="Photo not found")

            photos.remove(url)
            data["photos"] = photos
            updated = ObjectItem(**data)
            _DB[i] = updated

            # пробуем удалить файл (если локальный uploads)
            if url.startswith("/uploads/"):
                path = os.path.join("uploads", url.split("/uploads/")[1])
                if os.path.exists(path):
                    os.remove(path)

            return {"ok": True}

    raise HTTPException(status_code=404, detail="Object not found")