from __future__ import annotations

from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models.client import Client
from app.repositories.clients import ClientRepository
from app.schemas.client import ClientCreate, ClientUpdate


class ClientService:
    @staticmethod
    def list(db: Session) -> list[Client]:
        return ClientRepository.list(db)

    @staticmethod
    def get(db: Session, client_id: int) -> Client | None:
        return ClientRepository.get(db, client_id)

    @staticmethod
    def create(db: Session, payload: ClientCreate) -> Client:
        client = Client(**payload.model_dump())
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