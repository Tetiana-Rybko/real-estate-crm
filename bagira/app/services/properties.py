from __future__ import annotations

from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models.property import Property
from app.models.user import User, UserRole
from app.repositories.properties import PropertyRepository
from app.schemas.property import PropertyCreate, PropertyUpdate


class PropertyService:
    @staticmethod
    def list(db: Session, user: User) -> list[Property]:
        if user.role == UserRole.ADMIN:
            return PropertyRepository.list_all(db)
        return PropertyRepository.list_by_agent(db, user.id)

    @staticmethod
    def get_or_404(db: Session, property_id: int) -> Property:
        obj = PropertyRepository.get(db, property_id)
        if not obj:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Property not found",
            )
        return obj

    @staticmethod
    def ensure_access(user: User, obj: Property) -> None:
        if user.role == UserRole.ADMIN:
            return
        if obj.agent_id != user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not allowed",
            )

    @staticmethod
    def create(db: Session, user: User, payload: PropertyCreate) -> Property:
        data = payload.model_dump()


        data["agent_id"] = user.id

        obj = Property(**data)

        try:
            PropertyRepository.add(db, obj)
            db.commit()
            db.refresh(obj)
            return obj
        except IntegrityError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Property conflict",
            ) from e

    @staticmethod
    def update(db: Session, user: User, obj: Property, payload: PropertyUpdate) -> Property:
        PropertyService.ensure_access(user, obj)

        for k, v in payload.model_dump(exclude_unset=True).items():
            setattr(obj, k, v)

        try:
            db.commit()
            db.refresh(obj)
            return obj
        except IntegrityError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Property conflict",
            ) from e

    @staticmethod
    def delete(db: Session, user: User, obj: Property) -> None:
        PropertyService.ensure_access(user, obj)
        PropertyRepository.delete(db, obj)
        db.commit()