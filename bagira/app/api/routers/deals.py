from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.schemas.property import PropertyOut
from app.models.activity import Activity
from app.schemas.activity import ActivityRead
from app.db.session import get_db
from app.api.deps import get_current_user, require_roles
from app.models.user import UserRole
from app.models.user import User
from app.repositories.deal import DealRepository
from app.services.deal_service import DealService
from app.schemas.deal import (
    DealCreate,
    DealUpdate,
    DealStatusUpdate,
    DealAssign,
    DealOut,
    DealPropertyAttach,
    DealWithPropertiesOut
)

router = APIRouter(prefix="/deals", tags=["deals"])


@router.get("/my", response_model=list[DealOut])
def list_my_deals(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    return DealRepository.list_by_realtor(db, user.id)


@router.get("", response_model=list[DealOut])
def list_all_deals(
    db: Session = Depends(get_db),
    _: User = Depends(require_roles(UserRole.ADMIN)),
):
    return DealRepository.list_all(db)


@router.post("", response_model=DealOut, status_code=201)
def create_deal(
    payload: DealCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    return DealService.create(db, user, payload)


@router.get("/{deal_id}", response_model=DealOut)
def get_deal(
    deal_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    deal = DealService.get_or_404(db, deal_id)
    DealService.ensure_access(user, deal)
    return deal


@router.patch("/{deal_id}", response_model=DealOut)
def update_deal(
    deal_id: int,
    payload: DealUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    deal = DealService.get_or_404(db, deal_id)
    return DealService.update(db, user, deal, payload)


@router.patch("/{deal_id}/status", response_model=DealOut)
def update_status(
    deal_id: int,
    payload: DealStatusUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    deal = DealService.get_or_404(db, deal_id)
    return DealService.update_status(db, user, deal, payload.status)


@router.patch("/{deal_id}/assign", response_model=DealOut)
def assign_deal(
    deal_id: int,
    payload: DealAssign,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    deal = DealService.get_or_404(db, deal_id)
    return DealService.assign(db, user, deal, payload.realtor_id)

@router.get("/{deal_id}/timeline", response_model=list[ActivityRead])
def get_deal_timeline(
    deal_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    deal = DealService.get_or_404(db, deal_id)
    DealService.ensure_access(user, deal)

    activities = db.scalars(
        select(Activity)
        .where(Activity.deal_id == deal_id)
        .order_by(Activity.created_at.desc())
    ).all()

    return activities
@router.post("/{deal_id}/properties", status_code=201)
def attach_property_to_deal(
    deal_id: int,
    payload: DealPropertyAttach,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    deal = DealService.get_or_404(db, deal_id)
    return DealService.attach_property(db, user, deal, payload.property_id)
@router.get("/{deal_id}/properties", response_model=list[PropertyOut])
def list_deal_properties(
    deal_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    deal = DealService.get_with_properties_or_404(db, deal_id)
    DealService.ensure_access(user, deal)
    return deal.properties