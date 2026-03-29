from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict


class PropertyIntakeBase(BaseModel):
    property_type: str | None = None
    residential_complex: str | None = None
    class_type: str | None = None
    exclusive: bool = False

    city: str | None = None
    district: str | None = None
    street: str | None = None
    building_number: str | None = None
    apartment_number: str | None = None

    rooms: int | None = None
    total_floors: int | None = None
    floor: int | None = None
    area_total: float | None = None
    area_living: float | None = None
    area_kitchen: float | None = None
    ceiling_height: float | None = None
    layout_features: str | None = None
    sanitary_unit: str | None = None

    wall_type: str | None = None
    lift: bool | None = None
    security: str | None = None
    repair: str | None = None
    insulation: str | None = None
    communications: str | None = None
    power_outage_notes: str | None = None
    year_built: int | None = None
    individual_meters: bool | None = None
    heating: str | None = None
    water_heating: str | None = None

    furniture_appliances: str | None = None
    bathroom_type: str | None = None
    living_room_details: str | None = None
    walls_condition: str | None = None
    ceiling_condition: str | None = None
    floor_condition: str | None = None

    price: float | None = None
    commission: float | None = None
    osbb_monthly: float | None = None
    electricity_price_per_kw: float | None = None
    has_direct_electric_contract: bool | None = None
    utility_debts: str | None = None

    owner_count: int | None = None
    owner_name: str | None = None
    marital_status: str | None = None
    registered_residents_count: int | None = None
    deal_formalization: str | None = None
    documents_ready: bool | None = None
    children_shares: bool | None = None
    programs: str | None = None

    viewing_schedule: str | None = None
    has_keys: bool | None = None
    owner_phone: str | None = None

    notes: str | None = None


class PropertyIntakeCreate(PropertyIntakeBase):
    pass


class PropertyIntakeUpdate(PropertyIntakeBase):
    status: str | None = None
    property_id: int | None = None


class PropertyIntakeOut(PropertyIntakeBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_by_id: int
    property_id: int | None
    status: str
    created_at: datetime
    updated_at: datetime