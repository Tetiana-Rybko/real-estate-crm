from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.property import Property


class PropertyRepository:
    @staticmethod
    def list_all(db: Session) -> list[Property]:
        return db.scalars(select(Property).order_by(Property.id.desc())).all()

    @staticmethod
    def list_by_agent(db: Session, agent_id: int) -> list[Property]:
        # В твоей модели Property сейчас НЕТ agent_id.
        # Поэтому этот метод пока не работает как "мои".
        # Оставляю заглушку: возвращаем всё (или потом добавишь agent_id и поправим).
        return db.scalars(select(Property).order_by(Property.id.desc())).all()

    @staticmethod
    def get(db: Session, property_id: int) -> Property | None:
        return db.get(Property, property_id)

    @staticmethod
    def add(db: Session, obj: Property) -> Property:
        db.add(obj)
        return obj

    @staticmethod
    def delete(db: Session, obj: Property) -> None:
        db.delete(obj)