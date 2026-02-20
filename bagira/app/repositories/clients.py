from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.client import Client


class ClientRepository:
    @staticmethod
    def list(db: Session) -> list[Client]:
        return db.scalars(select(Client).order_by(Client.id.desc())).all()

    @staticmethod
    def get(db: Session, client_id: int) -> Client | None:
        return db.get(Client, client_id)

    @staticmethod
    def get_by_email(db: Session, email: str) -> Client | None:
        return db.scalar(select(Client).where(Client.email == email))

    @staticmethod
    def add(db: Session, client: Client) -> Client:
        db.add(client)
        return client

    @staticmethod
    def delete(db: Session, client: Client) -> None:
        db.delete(client)