from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.deal import Deal


class DealRepository:

    @staticmethod
    def get(db: Session, deal_id: int) -> Deal | None:
        return db.scalar(select(Deal).where(Deal.id == deal_id))

    @staticmethod
    def list_all(db: Session):
        return db.scalars(select(Deal).order_by(Deal.id.desc())).all()

    @staticmethod
    def list_by_realtor(db: Session, realtor_id: int):
        return db.scalars(
            select(Deal)
            .where(Deal.realtor_id == realtor_id)
            .order_by(Deal.id.desc())
        ).all()

    @staticmethod
    def create(db: Session, deal: Deal):
        db.add(deal)
        db.commit()
        db.refresh(deal)
        return deal

    @staticmethod
    def save(db: Session, deal: Deal):
        db.commit()
        db.refresh(deal)
        return deal