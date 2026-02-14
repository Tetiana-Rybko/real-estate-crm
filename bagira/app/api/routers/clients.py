from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.schemas.client import ClientCreate, ClientOut,ClientUpdate
from app.db.session import get_db
from app.models.client import Client

router = APIRouter(prefix="/clients", tags=["clients"])


@router.get("", response_model=list[ClientOut])
def list_clients(db: Session = Depends(get_db)):
    clients = db.scalars(select(Client).order_by(Client.id.desc())).all()
    return clients


@router.get(path="/{client_id}", response_model=ClientOut)
def get_client(client_id: int, db: Session = Depends(get_db)):
    client = db.get(Client, client_id)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return client



@router.post("", response_model=ClientOut)
def create_client(
    payload: ClientCreate,
    db: Session = Depends(get_db),
):
    client = Client(**payload.model_dump())

    try:
        db.add(client)
        db.commit()
        db.refresh(client)
        return client

    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=409,
            detail="Client with this email already exists",
        ) from None
@router.put("/{client_id}", response_model=ClientOut)
def update_client(client_id: int, payload: ClientUpdate, db: Session = Depends(get_db)):
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

    except IntegrityError as e :
        db.rollback()
        raise HTTPException(status_code=409, detail="Client with this email already exists")
@router.delete("/{client_id}", status_code=204)
def delete_client(client_id: int, db: Session = Depends(get_db)):
    client = db.get(Client, client_id)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")

    db.delete(client)
    db.commit()