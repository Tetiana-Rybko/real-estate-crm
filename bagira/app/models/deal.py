from __future__ import annotations

import enum
from datetime import datetime

from sqlalchemy import DateTime, Enum as SAEnum, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class DealType(str, enum.Enum):
    sale = "sale"
    rent = "rent"
    purchase = "purchase"
    lease = "lease"


class DealStatus(str, enum.Enum):
    new = "new"
    qualified = "qualified"
    showing = "showing"
    negotiation = "negotiation"
    contract = "contract"
    won = "won"
    lost = "lost"
    archived = "archived"


class Deal(Base):
    __tablename__ = "deals"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    title: Mapped[str] = mapped_column(String(255), nullable=False)
    type: Mapped[DealType] = mapped_column(
        SAEnum(DealType, name="deal_type"),
        nullable=False,
        default=DealType.sale,
    )
    status: Mapped[DealStatus] = mapped_column(
        SAEnum(DealStatus, name="deal_status"),
        nullable=False,
        default=DealStatus.new,
    )

    client_id: Mapped[int] = mapped_column(
        ForeignKey("clients.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )
    realtor_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )

    budget_min: Mapped[int | None] = mapped_column(Integer, nullable=True)
    budget_max: Mapped[int | None] = mapped_column(Integer, nullable=True)
    note: Mapped[str | None] = mapped_column(Text, nullable=True)

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

    client: Mapped["Client"] = relationship("Client", back_populates="deals")
    realtor: Mapped["User"] = relationship("User", back_populates="deals")

    tasks: Mapped[list["Task"]] = relationship("Task", back_populates="deal")
    activities: Mapped[list["Activity"]] = relationship("Activity", back_populates="deal")

    deal_properties: Mapped[list["DealProperty"]] = relationship(
        "DealProperty",
        back_populates="deal",
        cascade="all, delete-orphan",
    )

    properties: Mapped[list["Property"]] = relationship(
        "Property",
        secondary="deal_properties",
        viewonly=True,
    )



