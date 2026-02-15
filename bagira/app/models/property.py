from future import annotations

import enum
from datetime import datetime

from sqlalchemy import Boolean, DateTime, Enum, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class PropertyType(str, enum.Enum):
    apartment = "apartment"
    house = "house"
    land = "land"
    commercial = "commercial"


class PropertyStatus(str, enum.Enum):
    draft = "draft"
    active = "active"
    reserved = "reserved"
    closed = "closed"
    archived = "archived"


class Property(Base):
    tablename = "properties"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    type: Mapped[PropertyType] = mapped_column(Enum(PropertyType), nullable=False, default=PropertyType.apartment)
    status: Mapped[PropertyStatus] = mapped_column(Enum(PropertyStatus), nullable=False, default=PropertyStatus.draft)

    title: Mapped[str] = mapped_column(String(255), nullable=False)
    address: Mapped[str | None] = mapped_column(String(500), nullable=True)
    city: Mapped[str | None] = mapped_column(String(120), nullable=True)
    district: Mapped[str | None] = mapped_column(String(120), nullable=True)

    price: Mapped[int | None] = mapped_column(Integer, nullable=True)
    rooms: Mapped[int | None] = mapped_column(Integer, nullable=True)
    area_total: Mapped[int | None] = mapped_column(Integer, nullable=True)  # м² можно хранить int или numeric
    floor: Mapped[int | None] = mapped_column(Integer, nullable=True)

    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    is_published: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

    owner_id: Mapped[int | None] = mapped_column(ForeignKey("clients.id", ondelete="SET NULL"), nullable=True, index=True)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    owner: Mapped["Client"] = relationship(back_populates="properties")

    links: Mapped[list["DealProperty"]] = relationship(
        back_populates="property",
        cascade="all, delete-orphan",
    )
    deals: Mapped[list["Deal"]] = relationship(
        secondary="deal_properties",
        back_populates="properties",
        viewonly=True,
    )

    tasks: Mapped[list["Task"]] = relationship(back_populates="property")
    activities: Mapped[list["Activity"]] = relationship(back_populates="property")