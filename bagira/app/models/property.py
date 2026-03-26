from __future__ import annotations

import enum
from datetime import datetime
from typing import Optional

from sqlalchemy import Boolean, DateTime, Enum as SAEnum, ForeignKey, Integer, String, Text, func
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
    __tablename__ = "properties"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    type: Mapped[PropertyType] = mapped_column(
        SAEnum(PropertyType, name="property_type"),
        nullable=False,
        default=PropertyType.apartment,
    )
    status: Mapped[PropertyStatus] = mapped_column(
        SAEnum(PropertyStatus, name="property_status"),
        nullable=False,
        default=PropertyStatus.draft,
    )

    agent_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )

    title: Mapped[str] = mapped_column(String(255), nullable=False)
    address: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    city: Mapped[Optional[str]] = mapped_column(String(120), nullable=True)
    district: Mapped[Optional[str]] = mapped_column(String(120), nullable=True)

    price: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    rooms: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    area_total: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    floor: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)

    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    is_published: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

    owner_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("clients.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

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

    owner: Mapped[Optional["Client"]] = relationship("Client", back_populates="properties")
    agent: Mapped["User"] = relationship("User", back_populates="properties")

    tasks: Mapped[list["Task"]] = relationship("Task", back_populates="property")
    activities: Mapped[list["Activity"]] = relationship("Activity", back_populates="property")

    deal_properties: Mapped[list["DealProperty"]] = relationship(
        "DealProperty",
        back_populates="property",
        cascade="all, delete-orphan",
    )

    deals: Mapped[list["Deal"]] = relationship(
        "Deal",
        secondary="deal_properties",
        viewonly=True,
    )
    images: Mapped[list["PropertyImage"]] = relationship(
        "PropertyImage",
        back_populates="property",
        cascade="all, delete-orphan",
        order_by="PropertyImage.sort_order",
    )