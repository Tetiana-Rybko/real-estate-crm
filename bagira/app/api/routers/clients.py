from fastapi import APIRouter, HTTPException
from app.api.deps import DBSession, CurrentUser
from app.schemas.client import ClientCreate, ClientOut, ClientUpdate
from app.services.clients import ClientService

router = APIRouter(prefix="/clients", tags=["clients"])

@router.get("", response_model=list[ClientOut])
def list_clients(db: DBSession, user: CurrentUser):
    return ClientService.list(db)

@router.get("/{client_id}", response_model=ClientOut)
def get_client(client_id: int, db: DBSession, user: CurrentUser):
    client = ClientService.get(db, client_id)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return client

@router.post("", response_model=ClientOut)
def create_client(payload: ClientCreate, db: DBSession, user: CurrentUser):
    try:
        return ClientService.create(db, payload)
    except ValueError as e:
        raise HTTPException(status_code=409, detail=str(e)) from None

@router.put("/{client_id}", response_model=ClientOut)
def update_client(client_id: int, payload: ClientUpdate, db: DBSession, user: CurrentUser):
    client = ClientService.get(db, client_id)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")

    try:
        return ClientService.update(db, client, payload)
    except ValueError as e:
        raise HTTPException(status_code=409, detail=str(e)) from None

@router.delete("/{client_id}", status_code=204)
def delete_client(client_id: int, db: DBSession, user: CurrentUser):
    client = ClientService.get(db, client_id)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    ClientService.delete(db, client)