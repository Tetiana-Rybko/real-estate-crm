from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel

from app.models.task import TaskStatus


class TaskCreate(BaseModel):
    title: str
    description: str | None = None
    status: TaskStatus = TaskStatus.todo
    is_done: bool = False

    user_id: int
    client_id: int | None = None
    deal_id: int | None = None
    property_id: int | None = None

    due_at: datetime | None = None


class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    status: TaskStatus | None = None
    is_done: bool | None = None

    user_id: int | None = None
    client_id: int | None = None
    deal_id: int | None = None
    property_id: int | None = None

    due_at: datetime | None = None


class TaskRead(BaseModel):
    id: int
    title: str
    description: str | None = None
    status: TaskStatus
    is_done: bool

    user_id: int
    client_id: int | None = None
    deal_id: int | None = None
    property_id: int | None = None

    due_at: datetime | None = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True