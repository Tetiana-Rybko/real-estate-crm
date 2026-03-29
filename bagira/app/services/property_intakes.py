from __future__ import annotations

from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models.property_intake import PropertyIntake
from app.models.user import User, UserRole
from app.repositories.property_intakes import PropertyIntakeRepository
from app.schemas.property_intake import PropertyIntakeCreate, PropertyIntakeUpdate


class PropertyIntakeService:
    @staticmethod
    def list(db: Session, user: User) -> list[PropertyIntake]:
        if user.role == UserRole.ADMIN:
            return PropertyIntakeRepository.list_all(db)
        return PropertyIntakeRepository.list_by_creator(db, user.id)

    @staticmethod
    def get_or_404(db: Session, intake_id: int) -> PropertyIntake:
        obj = PropertyIntakeRepository.get(db, intake_id)
        if not obj:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Property intake not found",
            )
        return obj

    @staticmethod
    def ensure_access(user: User, obj: PropertyIntake) -> None:
        if user.role == UserRole.ADMIN:
            return
        if obj.created_by_id != user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not allowed",
            )

    @staticmethod
    def create(db: Session, user: User, payload: PropertyIntakeCreate) -> PropertyIntake:
        data = payload.model_dump()
        data["created_by_id"] = user.id
        data["status"] = "draft"

        obj = PropertyIntake(**data)

        try:
            PropertyIntakeRepository.add(db, obj)
            db.commit()
            db.refresh(obj)
            return obj
        except IntegrityError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Property intake conflict",
            ) from e

    @staticmethod
    def update(
        db: Session,
        user: User,
        obj: PropertyIntake,
        payload: PropertyIntakeUpdate,
    ) -> PropertyIntake:
        PropertyIntakeService.ensure_access(user, obj)

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
                detail="Property intake conflict",
            ) from e

    @staticmethod
    def delete(db: Session, user: User, obj: PropertyIntake) -> None:
        PropertyIntakeService.ensure_access(user, obj)
        PropertyIntakeRepository.delete(db, obj)
        db.commit()