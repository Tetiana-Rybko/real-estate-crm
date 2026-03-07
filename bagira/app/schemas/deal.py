from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from app.models.deal import DealType, DealStatus


class DealCreate(BaseModel):
    client_id: int
    title: str
    type: DealType
    budget_min: Optional[int] = None
    budget_max: Optional[int] = None
    note: Optional[str] = None

    # только для ADMIN
    realtor_id: Optional[int] = None


class DealUpdate(BaseModel):
    title: Optional[str] = None
    budget_min: Optional[int] = None
    budget_max: Optional[int] = None
    note: Optional[str] = None


class DealStatusUpdate(BaseModel):
    status: DealStatus


class DealAssign(BaseModel):
    realtor_id: int


class DealOut(BaseModel):
    id: int
    client_id: int
    realtor_id: int
    title: str
    type: DealType
    status: DealStatus
    budget_min: Optional[int] = None
    budget_max: Optional[int] = None
    note: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class DealPropertyAttach(BaseModel):
    property_id: int
