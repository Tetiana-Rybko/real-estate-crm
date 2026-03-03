from __future__ import annotations

from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models.client import Client
from app.models.user import User, UserRole
from app.repositories.clients import ClientRepository
from app.schemas.client import ClientCreate, ClientUpdate
from fastapi import HTTPException, status

class ClientService:
    # ADMIN: все клиенты
    @staticmethod
    def list_all(db: Session) -> list[Client]:
        return ClientRepository.list_all(db)

    # AGENT: только свои
    @staticmethod
    def list_my(db: Session, user: User) -> list[Client]:
        return ClientRepository.list_by_agent(db, user.id)


    @staticmethod
    def list(db: Session, user: User) -> list[Client]:
        if user.role == UserRole.ADMIN:
            return ClientRepository.list_all(db)
        return ClientRepository.list_by_agent(db, user.id)

    @staticmethod
    def get(db: Session, client_id: int) -> Client | None:
        return ClientRepository.get(db, client_id)

    @staticmethod
    def get_or_404(db: Session, client_id: int) -> Client:
        client = ClientRepository.get(db, client_id)
        if not client:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Client not found",
            )
        return client

    @staticmethod
    def ensure_access(user: User, client: Client) -> None:
        if user.role == UserRole.ADMIN:
            return
        if client.agent_id != user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Forbidden",
            )

    @staticmethod
    def create(db: Session, user: User, payload: ClientCreate) -> Client:
        client = Client(**payload.model_dump())
        # если создаёт ADMIN — клиент всё равно должен принадлежать агенту
        # сейчас привязываем к тому, кто создаёт
        client.agent_id = user.id

        try:
            ClientRepository.add(db, client)
            db.commit()
            db.refresh(client)
            return client
        except IntegrityError as e:
            db.rollback()
            raise ValueError("Client with this email already exists") from e

    @staticmethod
    def update(db: Session, client: Client, payload: ClientUpdate) -> Client:
        for k, v in payload.model_dump(exclude_unset=True).items():
            setattr(client, k, v)

        try:
            db.commit()
            db.refresh(client)
            return client
        except IntegrityError as e:
            db.rollback()
            raise ValueError("Client with this email already exists") from e

    @staticmethod
    def delete(db: Session, client: Client) -> None:
        ClientRepository.delete(db, client)
        db.commit()