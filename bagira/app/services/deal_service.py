from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.activity import Activity, ActivityStatus, ActivityType
from app.models.deal_property import DealProperty
from app.models.deal import Deal, DealStatus
from app.models.user import User, UserRole
from app.repositories.deal import DealRepository


class DealService:

    @staticmethod
    def get_or_404(db: Session, deal_id: int) -> Deal:
        deal = DealRepository.get(db, deal_id)
        if not deal:
            raise HTTPException(status_code=404, detail="Deal not found")
        return deal

    @staticmethod
    def ensure_access(user: User, deal: Deal):
        if user.role == UserRole.ADMIN:
            return
        if deal.realtor_id != user.id:
            raise HTTPException(status_code=403, detail="Not allowed")

    @staticmethod
    def _create_activity(
        db: Session,
        *,
        deal: Deal,
        user: User,
        note: str,
    ):
        activity = Activity(
            type=ActivityType.note,
            status=ActivityStatus.done,
            note=note,
            user_id=user.id,
            client_id=deal.client_id,
            deal_id=deal.id,
        )
        db.add(activity)
        db.commit()
        db.refresh(activity)
        return activity

    @staticmethod
    def create(db: Session, user: User, payload):
        realtor_id = user.id
        if user.role == UserRole.ADMIN and payload.realtor_id:
            realtor_id = payload.realtor_id

        deal = Deal(
            client_id=payload.client_id,
            realtor_id=realtor_id,
            title=payload.title,
            type=payload.type,
            status=DealStatus.new,
            budget_min=payload.budget_min,
            budget_max=payload.budget_max,
            note=payload.note,
        )

        created_deal = DealRepository.create(db, deal)

        DealService._create_activity(
            db,
            deal=created_deal,
            user=user,
            note=f"Deal created: {created_deal.title}",
        )

        return created_deal

    @staticmethod
    def update(db: Session, user: User, deal: Deal, payload):
        DealService.ensure_access(user, deal)

        for k, v in payload.model_dump(exclude_unset=True).items():
            setattr(deal, k, v)

        updated_deal = DealRepository.save(db, deal)
        return updated_deal

    @staticmethod
    def update_status(db: Session, user: User, deal: Deal, status):
        DealService.ensure_access(user, deal)

        old_status = deal.status
        deal.status = status
        updated_deal = DealRepository.save(db, deal)

        if old_status != status:
            DealService._create_activity(
                db,
                deal=updated_deal,
                user=user,
                note=f"Deal status changed: {old_status} -> {status}",
            )

        return updated_deal

    @staticmethod
    def assign(db: Session, user: User, deal: Deal, realtor_id: int):
        if user.role != UserRole.ADMIN:
            raise HTTPException(status_code=403, detail="Admin only")

        old_realtor_id = deal.realtor_id
        deal.realtor_id = realtor_id
        updated_deal = DealRepository.save(db, deal)

        if old_realtor_id != realtor_id:
            DealService._create_activity(
                db,
                deal=updated_deal,
                user=user,
                note=f"Deal assigned to realtor_id={realtor_id}",
            )

        return updated_deal

    @staticmethod
    def attach_property(db: Session, user: User, deal: Deal, property_id: int):
        DealService.ensure_access(user, deal)

        property_obj = DealRepository.get_property(db, property_id)
        if not property_obj:
            raise HTTPException(status_code=404, detail="Property not found")

        existing = DealRepository.get_deal_property_link(db, deal.id, property_id)
        if existing:
            raise HTTPException(status_code=409, detail="Property already attached to deal")

        link = DealRepository.attach_property(db, deal.id, property_id)

        DealService._create_activity(
            db,
            deal=deal,
            user=user,
            note=f"Property attached to deal: property_id={property_id}",
        )

        return link

    @staticmethod
    def get_with_properties_or_404(db: Session, deal_id: int) -> Deal:
        deal = DealRepository.get_with_properties(db, deal_id)
        if not deal:
            raise HTTPException(status_code=404, detail="Deal not found")
        return deal