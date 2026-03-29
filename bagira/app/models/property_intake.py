from __future__ import annotations

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.db.base import Base


class PropertyIntake(Base):
    __tablename__ = "property_intakes"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    created_by_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    property_id: Mapped[int | None] = mapped_column(ForeignKey("properties.id"), nullable=True)

    status: Mapped[str] = mapped_column(String, nullable=False, default="draft")

    property_type: Mapped[str | None] = mapped_column(String, nullable=True)
    residential_complex: Mapped[str | None] = mapped_column(String, nullable=True)
    class_type: Mapped[str | None] = mapped_column(String, nullable=True)
    exclusive: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

    city: Mapped[str | None] = mapped_column(String, nullable=True)
    district: Mapped[str | None] = mapped_column(String, nullable=True)
    street: Mapped[str | None] = mapped_column(String, nullable=True)
    building_number: Mapped[str | None] = mapped_column(String, nullable=True)
    apartment_number: Mapped[str | None] = mapped_column(String, nullable=True)

    rooms: Mapped[int | None] = mapped_column(Integer, nullable=True)
    total_floors: Mapped[int | None] = mapped_column(Integer, nullable=True)
    floor: Mapped[int | None] = mapped_column(Integer, nullable=True)
    area_total: Mapped[float | None] = mapped_column(Numeric(10, 2), nullable=True)
    area_living: Mapped[float | None] = mapped_column(Numeric(10, 2), nullable=True)
    area_kitchen: Mapped[float | None] = mapped_column(Numeric(10, 2), nullable=True)
    ceiling_height: Mapped[float | None] = mapped_column(Numeric(10, 2), nullable=True)
    layout_features: Mapped[str | None] = mapped_column(Text, nullable=True)
    sanitary_unit: Mapped[str | None] = mapped_column(String, nullable=True)

    wall_type: Mapped[str | None] = mapped_column(String, nullable=True)
    lift: Mapped[bool | None] = mapped_column(Boolean, nullable=True)
    security: Mapped[str | None] = mapped_column(Text, nullable=True)
    repair: Mapped[str | None] = mapped_column(String, nullable=True)
    insulation: Mapped[str | None] = mapped_column(String, nullable=True)
    communications: Mapped[str | None] = mapped_column(Text, nullable=True)
    power_outage_notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    year_built: Mapped[int | None] = mapped_column(Integer, nullable=True)
    individual_meters: Mapped[bool | None] = mapped_column(Boolean, nullable=True)
    heating: Mapped[str | None] = mapped_column(String, nullable=True)
    water_heating: Mapped[str | None] = mapped_column(String, nullable=True)

    furniture_appliances: Mapped[str | None] = mapped_column(Text, nullable=True)
    bathroom_type: Mapped[str | None] = mapped_column(String, nullable=True)
    living_room_details: Mapped[str | None] = mapped_column(Text, nullable=True)
    walls_condition: Mapped[str | None] = mapped_column(String, nullable=True)
    ceiling_condition: Mapped[str | None] = mapped_column(String, nullable=True)
    floor_condition: Mapped[str | None] = mapped_column(String, nullable=True)

    price: Mapped[float | None] = mapped_column(Numeric(12, 2), nullable=True)
    commission: Mapped[float | None] = mapped_column(Numeric(12, 2), nullable=True)
    osbb_monthly: Mapped[float | None] = mapped_column(Numeric(10, 2), nullable=True)
    electricity_price_per_kw: Mapped[float | None] = mapped_column(Numeric(10, 2), nullable=True)
    has_direct_electric_contract: Mapped[bool | None] = mapped_column(Boolean, nullable=True)
    utility_debts: Mapped[str | None] = mapped_column(Text, nullable=True)

    owner_count: Mapped[int | None] = mapped_column(Integer, nullable=True)
    owner_name: Mapped[str | None] = mapped_column(Text, nullable=True)
    marital_status: Mapped[str | None] = mapped_column(String, nullable=True)
    registered_residents_count: Mapped[int | None] = mapped_column(Integer, nullable=True)
    deal_formalization: Mapped[str | None] = mapped_column(Text, nullable=True)
    documents_ready: Mapped[bool | None] = mapped_column(Boolean, nullable=True)
    children_shares: Mapped[bool | None] = mapped_column(Boolean, nullable=True)
    programs: Mapped[str | None] = mapped_column(Text, nullable=True)

    viewing_schedule: Mapped[str | None] = mapped_column(Text, nullable=True)
    has_keys: Mapped[bool | None] = mapped_column(Boolean, nullable=True)
    owner_phone: Mapped[str | None] = mapped_column(String, nullable=True)

    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    updated_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    created_by = relationship("User", foreign_keys=[created_by_id])
    property = relationship("Property", foreign_keys=[property_id])