import logging

from fastapi import APIRouter, Depends, HTTPException, status

from app.api.deps import CurrentUser, DBSession, require_roles
from app.models.user import UserRole
from app.schemas.client import ClientCreate, ClientOut, ClientUpdate
from app.services.clients import ClientService

logger = logging.getLogger("app")

router = APIRouter(prefix="/clients", tags=["clients"])


# ADMIN: видит всех клиентов
@router.get(
    "",
    response_model=list[ClientOut],
    dependencies=[Depends(require_roles(UserRole.ADMIN))],
)
def list_clients(db: DBSession, user: CurrentUser):
    logger.info("list_clients admin_id=%s", user.id)
    return ClientService.list_all(db)


# AGENT: видит только своих
@router.get(
    "/my",
    response_model=list[ClientOut],
    dependencies=[Depends(require_roles(UserRole.AGENT))],
)
def list_my_clients(db: DBSession, user: CurrentUser):
    logger.info("list_my_clients user_id=%s", user.id)
    return ClientService.list_my(db, user)


@router.get(
    "/{client_id}",
    response_model=ClientOut,
    dependencies=[Depends(require_roles(UserRole.ADMIN, UserRole.AGENT))],
)
def get_client(client_id: int, db: DBSession, user: CurrentUser):
    logger.info("get_client client_id=%s user_id=%s", client_id, user.id)

    client = ClientService.get_or_404(db, client_id)
    ClientService.ensure_access(user, client)
    return client


@router.post(
    "",
    response_model=ClientOut,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_roles(UserRole.ADMIN, UserRole.AGENT))],
)
def create_client(payload: ClientCreate, db: DBSession, user: CurrentUser):
    logger.info("create_client user_id=%s email=%s", user.id, payload.email)

    try:
        return ClientService.create(db, user, payload)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e)) from None


@router.put(
    "/{client_id}",
    response_model=ClientOut,
    dependencies=[Depends(require_roles(UserRole.ADMIN, UserRole.AGENT))],
)
def update_client(client_id: int, payload: ClientUpdate, db: DBSession, user: CurrentUser):
    logger.info("update_client client_id=%s user_id=%s", client_id, user.id)

    client = ClientService.get_or_404(db, client_id)
    ClientService.ensure_access(user, client)

    try:
        return ClientService.update(db, client, payload)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e)) from None


@router.delete(
    "/{client_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(require_roles(UserRole.ADMIN, UserRole.AGENT))],
)
def delete_client(client_id: int, db: DBSession, user: CurrentUser):
    logger.info("delete_client client_id=%s user_id=%s", client_id, user.id)

    client = ClientService.get_or_404(db, client_id)
    ClientService.ensure_access(user, client)

    ClientService.delete(db, client)
    return None