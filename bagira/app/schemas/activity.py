from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel

from app.models.activity import ActivityStatus, ActivityType


class ActivityCreate(BaseModel):
    type: ActivityType = ActivityType.note
    status: ActivityStatus = ActivityStatus.planned
    note: str | None = None

    user_id: int | None = None
    client_id: int | None = None
    deal_id: int | None = None
    property_id: int | None = None


class ActivityRead(BaseModel):
    id: int
    type: ActivityType
    status: ActivityStatus
    note: str | None = None

    user_id: int | None = None
    client_id: int | None = None
    deal_id: int | None = None
    property_id: int | None = None

    created_at: datetime

    class Config:
        from_attributes = True