from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.models.property import Property, PropertyStatus


class PropertyRepository:
    @staticmethod
    def list_all(db: Session) -> list[Property]:
        stmt = (
            select(Property)
            .options(selectinload(Property.images))
            .order_by(Property.id.desc())
        )
        return db.scalars(stmt).all()

    @staticmethod
    def list_by_agent(db: Session, agent_id: int) -> list[Property]:
        stmt = (
            select(Property)
            .options(selectinload(Property.images))
            .where(Property.agent_id == agent_id)
            .order_by(Property.id.desc())
        )
        return db.scalars(stmt).all()

    @staticmethod
    def get(db: Session, property_id: int) -> Property | None:
        stmt = (
            select(Property)
            .options(selectinload(Property.images))
            .where(Property.id == property_id)
        )
        return db.scalar(stmt)

    @staticmethod
    def add(db: Session, obj: Property) -> Property:
        db.add(obj)
        return obj

    @staticmethod
    def delete(db: Session, obj: Property) -> None:
        db.delete(obj)

    @staticmethod
    def list_matching_for_deal(
        db: Session,
        *,
        budget_min: int | None,
        budget_max: int | None,
        agent_id: int | None = None,
    ) -> list[Property]:
        query = select(Property).options(selectinload(Property.images))

        if budget_min is not None:
            query = query.where(Property.price >= budget_min)

        if budget_max is not None:
            query = query.where(Property.price <= budget_max)

        if agent_id is not None:
            query = query.where(Property.agent_id == agent_id)

        query = query.order_by(Property.price.asc(), Property.id.desc())
        return db.scalars(query).all()