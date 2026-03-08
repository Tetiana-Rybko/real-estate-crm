from __future__ import annotations

import logging

from sqlalchemy import select

from app.models.activity import Activity
from app.schemas.activity import ActivityRead
from app.schemas.property import PropertyCreate, PropertyOut, PropertyUpdate
from fastapi import APIRouter, Depends, status

from app.api.deps import CurrentUser, DBSession, require_roles
from app.models.user import UserRole
from app.services.properties import PropertyService

logger = logging.getLogger("app")

router = APIRouter(prefix="/properties", tags=["properties"])


@router.get(
    "",
    response_model=list[PropertyOut],
    dependencies=[Depends(require_roles(UserRole.ADMIN))],
)
def list_all_properties(db: DBSession, user: CurrentUser):
    logger.info("list_all_properties user_id=%s", user.id)
    return PropertyService.list(db, user)


@router.get(
    "/my",
    response_model=list[PropertyOut],
    dependencies=[Depends(require_roles(UserRole.ADMIN, UserRole.AGENT))],
)
def list_my_properties(db: DBSession, user: CurrentUser):
    logger.info("list_my_properties user_id=%s", user.id)
    return PropertyService.list(db, user)


@router.get(
    "/{property_id}",
    response_model=PropertyOut,
    dependencies=[Depends(require_roles(UserRole.ADMIN, UserRole.AGENT))],
)
def get_property(property_id: int, db: DBSession, user: CurrentUser):
    obj = PropertyService.get_or_404(db, property_id)
    PropertyService.ensure_access(user, obj)
    return obj


@router.post(
    "",
    response_model=PropertyOut,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_roles(UserRole.ADMIN, UserRole.AGENT))],
)
def create_property(payload: PropertyCreate, db: DBSession, user: CurrentUser):
    logger.info("create_property user_id=%s", user.id)
    return PropertyService.create(db, user, payload)


@router.put(
    "/{property_id}",
    response_model=PropertyOut,
    dependencies=[Depends(require_roles(UserRole.ADMIN, UserRole.AGENT))],
)
def update_property(property_id: int, payload: PropertyUpdate, db: DBSession, user: CurrentUser):
    obj = PropertyService.get_or_404(db, property_id)
    return PropertyService.update(db, user, obj, payload)


@router.delete(
    "/{property_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(require_roles(UserRole.ADMIN))],
)
def delete_property(property_id: int, db: DBSession, user: CurrentUser):
    obj = PropertyService.get_or_404(db, property_id)
    PropertyService.delete(db, user, obj)
    return None

@router.get(
    "/{property_id}/timeline",
    response_model=list[ActivityRead],
    dependencies=[Depends(require_roles(UserRole.ADMIN, UserRole.AGENT))],
)
def get_property_timeline(property_id: int, db: DBSession, user: CurrentUser):
    obj = PropertyService.get_or_404(db, property_id)
    PropertyService.ensure_access(user, obj)

    activities = db.scalars(
        select(Activity)
        .where(Activity.property_id == property_id)
        .order_by(Activity.created_at.desc())
    ).all()

    return activities


