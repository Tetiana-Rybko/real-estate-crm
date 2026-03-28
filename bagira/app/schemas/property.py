from __future__ import annotations

from datetime import datetime
from typing import Optional,List

from pydantic import BaseModel, ConfigDict

from app.models.property import PropertyStatus, PropertyType


class PropertyBase(BaseModel):
    type: PropertyType = PropertyType.apartment
    status: PropertyStatus = PropertyStatus.draft

    title: str
    address: Optional[str] = None
    city: Optional[str] = None
    district: Optional[str] = None

    price: Optional[int] = None
    rooms: Optional[int] = None
    area_total: Optional[int] = None
    floor: Optional[int] = None

    description: Optional[str] = None
    is_published: bool = False

    owner_id: Optional[int] = None  # client.id


class PropertyCreate(PropertyBase):
    pass


class PropertyUpdate(BaseModel):
    type: Optional[PropertyType] = None
    status: Optional[PropertyStatus] = None

    title: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    district: Optional[str] = None

    price: Optional[int] = None
    rooms: Optional[int] = None
    area_total: Optional[int] = None
    floor: Optional[int] = None

    description: Optional[str] = None
    is_published: Optional[bool] = None

    owner_id: Optional[int] = None


class PropertyOut(PropertyBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime

    main_image: str | None = None
    images_count: int = 0
    images: List[PropertyImageOut] = []

class PropertyImageOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    property_id: int
    file_path: str
    is_main: bool
    sort_order: int
    created_at: datetime
