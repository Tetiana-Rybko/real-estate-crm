from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.deal import Deal
from app.models.deal_property import DealProperty
from app.models.property import Property


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

    @staticmethod
    def get_property(db: Session, property_id: int) -> Property | None:
        return db.scalar(select(Property).where(Property.id == property_id))

    @staticmethod
    def get_deal_property_link(db: Session, deal_id: int, property_id: int) -> DealProperty | None:
        return db.scalar(
            select(DealProperty).where(
                DealProperty.deal_id == deal_id,
                DealProperty.property_id == property_id,
            )
        )

    @staticmethod
    def attach_property(db: Session, deal_id: int, property_id: int) -> DealProperty:
        link = DealProperty(deal_id=deal_id, property_id=property_id)
        db.add(link)
        db.commit()
        db.refresh(link)
        return link