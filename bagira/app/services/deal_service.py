from fastapi import HTTPException
from sqlalchemy.orm import Session

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

        return DealRepository.create(db, deal)

    @staticmethod
    def update(db: Session, user: User, deal: Deal, payload):
        DealService.ensure_access(user, deal)

        for k, v in payload.model_dump(exclude_unset=True).items():
            setattr(deal, k, v)

        return DealRepository.save(db, deal)

    @staticmethod
    def update_status(db: Session, user: User, deal: Deal, status):
        DealService.ensure_access(user, deal)
        deal.status = status
        return DealRepository.save(db, deal)

    @staticmethod
    def assign(db: Session, user: User, deal: Deal, realtor_id: int):
        if user.role != UserRole.ADMIN:
            raise HTTPException(status_code=403, detail="Admin only")

        deal.realtor_id = realtor_id
        return DealRepository.save(db, deal)