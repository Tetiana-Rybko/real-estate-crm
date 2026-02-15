from future import annotations

import enum
from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class DealType(str, enum.Enum):
    sale = "sale"
    rent = "rent"
    purchase = "purchase"   # подбор на покупку
    lease = "lease"         # подбор на аренду


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
    tablename = "deals"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    title: Mapped[str] = mapped_column(String(255), nullable=False)
    type: Mapped[DealType] = mapped_column(Enum(DealType), nullable=False, default=DealType.sale)
    status: Mapped[DealStatus] = mapped_column(Enum(DealStatus), nullable=False, default=DealStatus.new)

    # связи
    client_id: Mapped[int] = mapped_column(ForeignKey("clients.id", ondelete="RESTRICT"), nullable=False, index=True)
    realtor_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="RESTRICT"), nullable=False, index=True)

    # бизнес-поля
    budget_min: Mapped[int | None] = mapped_column(Integer, nullable=True)
    budget_max: Mapped[int | None] = mapped_column(Integer, nullable=True)
    note: Mapped[str | None] = mapped_column(Text, nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    # ORM relationships
    client: Mapped["Client"] = relationship(back_populates="deals")
    realtor: Mapped["User"] = relationship(back_populates="deals")

    # many-to-many с объектами через DealProperty
    links: Mapped[list["DealProperty"]] = relationship(
        back_populates="deal",
        cascade="all, delete-orphan",
    )
    properties: Mapped[list["Property"]] = relationship(
        secondary="deal_properties",
        back_populates="deals",
        viewonly=True,  # чтобы управлять через links
    )

    # если у Task/Activity есть deal_id — можно включить:
    tasks: Mapped[list["Task"]] = relationship(back_populates="deal")
    activities: Mapped[list["Activity"]] = relationship(back_populates="deal")