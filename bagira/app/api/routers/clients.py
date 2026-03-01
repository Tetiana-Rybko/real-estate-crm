import logging

from fastapi import APIRouter, HTTPException, status

from app.api.deps import CurrentUser, DBSession
from app.schemas.client import ClientCreate, ClientOut, ClientUpdate
from app.services.clients import ClientService

logger = logging.getLogger("app")

router = APIRouter(prefix="/clients", tags=["clients"])


@router.get("", response_model=list[ClientOut])
def list_clients(db: DBSession, user: CurrentUser):
    logger.info("list_clients user_id=%s", user.id)
    return ClientService.list(db)


@router.get("/{client_id}", response_model=ClientOut)
def get_client(client_id: int, db: DBSession, user: CurrentUser):
    logger.info("get_client client_id=%s user_id=%s", client_id, user.id)

    client = ClientService.get(db, client_id)
    if not client:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Client not found")
    return client


@router.post("", response_model=ClientOut, status_code=status.HTTP_201_CREATED)
def create_client(payload: ClientCreate, db: DBSession, user: CurrentUser):
    logger.info("create_client user_id=%s email=%s", user.id, payload.email)

    try:
        return ClientService.create(db, payload)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e)) from None


@router.put("/{client_id}", response_model=ClientOut)
def update_client(client_id: int, payload: ClientUpdate, db: DBSession, user: CurrentUser):
    logger.info("update_client client_id=%s user_id=%s", client_id, user.id)

    client = ClientService.get(db, client_id)
    if not client:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Client not found")

    try:
        return ClientService.update(db, client, payload)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e)) from None


@router.delete("/{client_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_client(client_id: int, db: DBSession, user: CurrentUser):
    logger.info("delete_client client_id=%s user_id=%s", client_id, user.id)

    client = ClientService.get(db, client_id)
    if not client:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Client not found")

    ClientService.delete(db, client)
    return None