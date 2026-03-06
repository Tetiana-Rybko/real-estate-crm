from __future__ import annotations

import enum
from datetime import datetime

from sqlalchemy import Boolean, DateTime, Enum as SAEnum, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class TaskStatus(str, enum.Enum):
    todo = "todo"
    in_progress = "in_progress"
    done = "done"
    canceled = "canceled"


class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)

    status: Mapped[TaskStatus] = mapped_column(
        SAEnum(TaskStatus, name="task_status"),
        nullable=False,
        default=TaskStatus.todo,
    )

    is_done: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

    # Кому назначена задача (исполнитель)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )

    # Опционально — задача может быть привязана к контакту
    client_id: Mapped[int | None] = mapped_column(
        ForeignKey("clients.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    # Опционально — к сделке/объекту
    deal_id: Mapped[int | None] = mapped_column(
        ForeignKey("deals.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    property_id: Mapped[int | None] = mapped_column(
        ForeignKey("properties.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    due_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="tasks")
    client: Mapped["Client | None"] = relationship("Client", back_populates="tasks")

    deal: Mapped["Deal | None"] = relationship("Deal", back_populates="tasks")
    property: Mapped["Property | None"] = relationship("Property", back_populates="tasks")