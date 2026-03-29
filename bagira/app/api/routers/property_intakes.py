from __future__ import annotations

from fastapi import APIRouter, status

from app.api.deps import CurrentUser, DBSession
from app.schemas.property_intake import (
    PropertyIntakeCreate,
    PropertyIntakeOut,
    PropertyIntakeUpdate,
)
from app.services.property_intakes import PropertyIntakeService

router = APIRouter(prefix="/property-intakes", tags=["property-intakes"])


@router.get("", response_model=list[PropertyIntakeOut])
def list_property_intakes(
    db: DBSession,
    user: CurrentUser,
):
    return PropertyIntakeService.list(db, user)


@router.post("", response_model=PropertyIntakeOut, status_code=status.HTTP_201_CREATED)
def create_property_intake(
    payload: PropertyIntakeCreate,
    db: DBSession,
    user: CurrentUser,
):
    return PropertyIntakeService.create(db, user, payload)


@router.get("/{intake_id}", response_model=PropertyIntakeOut)
def get_property_intake(
    intake_id: int,
    db: DBSession,
    user: CurrentUser,
):
    obj = PropertyIntakeService.get_or_404(db, intake_id)
    PropertyIntakeService.ensure_access(user, obj)
    return obj


@router.put("/{intake_id}", response_model=PropertyIntakeOut)
def update_property_intake(
    intake_id: int,
    payload: PropertyIntakeUpdate,
    db: DBSession,
    user: CurrentUser,
):
    obj = PropertyIntakeService.get_or_404(db, intake_id)
    return PropertyIntakeService.update(db, user, obj, payload)


@router.delete("/{intake_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_property_intake(
    intake_id: int,
    db: DBSession,
    user: CurrentUser,
):
    obj = PropertyIntakeService.get_or_404(db, intake_id)
    PropertyIntakeService.delete(db, user, obj)
    return None