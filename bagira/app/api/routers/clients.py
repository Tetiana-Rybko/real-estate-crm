from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.schemas.client import ClientCreate, ClientOut, ClientUpdate
from app.db.session import get_db
from app.models.client import Client
from app.core.security import get_current_user
from app.models.user import User


router = APIRouter(prefix="/clients", tags=["clients"])


# Общая зависимость: и защищает эндпоинты, и даёт current_user в функциях
def current_user_dep(current_user: User = Depends(get_current_user)) -> User:
    return current_user


@router.get("", response_model=list[ClientOut])
def list_clients(
    db: Session = Depends(get_db),
    current_user: User = Depends(current_user_dep),
):
    # current_user доступен (можешь использовать для фильтрации/логов)
    return db.scalars(select(Client).order_by(Client.id.desc())).all()


@router.get("/{client_id}", response_model=ClientOut)
def get_client(
    client_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(current_user_dep),
):
    client = db.get(Client, client_id)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return client


@router.post("", response_model=ClientOut)
def create_client(
    payload: ClientCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(current_user_dep),
):
    client = Client(**payload.model_dump())
    try:
        db.add(client)
        db.commit()
        db.refresh(client)
        return client
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="Client with this email already exists") from None


@router.put("/{client_id}", response_model=ClientOut)
def update_client(
    client_id: int,
    payload: ClientUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(current_user_dep),
):
    client = db.get(Client, client_id)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")

    data = payload.model_dump(exclude_unset=True)
    for k, v in data.items():
        setattr(client, k, v)

    try:
        db.commit()
        db.refresh(client)
        return client
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="Client with this email already exists") from None


@router.delete("/{client_id}", status_code=204)
def delete_client(
    client_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(current_user_dep),
):
    client = db.get(Client, client_id)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")

    db.delete(client)
    db.commit()