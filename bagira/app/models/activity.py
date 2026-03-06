from __future__ import annotations

import enum
from datetime import datetime

from sqlalchemy import DateTime, Enum as SAEnum, ForeignKey, Integer, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class ActivityType(str, enum.Enum):
    note = "note"
    call = "call"
    meeting = "meeting"
    showing = "showing"


class ActivityStatus(str, enum.Enum):
    planned = "planned"
    done = "done"
    canceled = "canceled"


class Activity(Base):
    __tablename__ = "activities"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    type: Mapped[ActivityType] = mapped_column(
        SAEnum(ActivityType, name="activity_type"),
        nullable=False,
        default=ActivityType.note,
    )
    status: Mapped[ActivityStatus] = mapped_column(
        SAEnum(ActivityStatus, name="activity_status"),
        nullable=False,
        default=ActivityStatus.planned,
    )

    note: Mapped[str | None] = mapped_column(Text, nullable=True)

    # связи (все nullable, чтобы можно было логировать что угодно)
    user_id: Mapped[int | None] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    client_id: Mapped[int | None] = mapped_column(
        ForeignKey("clients.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
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

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    # relationships
    user: Mapped["User | None"] = relationship("User", back_populates="activities")
    client: Mapped["Client | None"] = relationship("Client", back_populates="activities")
    deal: Mapped["Deal | None"] = relationship("Deal", back_populates="activities")
    property: Mapped["Property | None"] = relationship("Property", back_populates="activities")