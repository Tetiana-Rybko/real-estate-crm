from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.property_intake import PropertyIntake


class PropertyIntakeRepository:
    @staticmethod
    def list_all(db: Session) -> list[PropertyIntake]:
        stmt = select(PropertyIntake).order_by(PropertyIntake.id.desc())
        return db.scalars(stmt).all()

    @staticmethod
    def list_by_creator(db: Session, user_id: int) -> list[PropertyIntake]:
        stmt = (
            select(PropertyIntake)
            .where(PropertyIntake.created_by_id == user_id)
            .order_by(PropertyIntake.id.desc())
        )
        return db.scalars(stmt).all()

    @staticmethod
    def get(db: Session, intake_id: int) -> PropertyIntake | None:
        return db.get(PropertyIntake, intake_id)

    @staticmethod
    def add(db: Session, obj: PropertyIntake) -> PropertyIntake:
        db.add(obj)
        return obj

    @staticmethod
    def delete(db: Session, obj: PropertyIntake) -> None:
        db.delete(obj)