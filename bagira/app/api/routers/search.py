from fastapi import APIRouter, Depends
from sqlalchemy import select, or_
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.api.deps import get_current_user
from app.models.client import Client
from app.models.deal import Deal
from app.models.property import Property
from app.schemas.client import ClientOut
from app.schemas.deal import DealOut
from app.schemas.property import PropertyOut
from app.models.user import User

router = APIRouter(prefix="/search", tags=["search"])


@router.get("")
def global_search(
    q: str,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    query = f"%{q}%"

    clients = db.scalars(
        select(Client).where(
            or_(
                Client.full_name.ilike(query),
                Client.email.ilike(query),
                Client.phone.ilike(query),
            )
        )
        .limit(10)
    ).all()

    deals = db.scalars(
        select(Deal).where(
            Deal.title.ilike(query)
        )
        .limit(10)
    ).all()

    properties = db.scalars(
        select(Property).where(
            or_(
                Property.title.ilike(query),
                Property.address.ilike(query),
                Property.city.ilike(query),
            )
        )
        .limit(10)
    ).all()

    return {
        "clients": [ClientOut.model_validate(c) for c in clients],
        "deals": [DealOut.model_validate(d) for d in deals],
        "properties": [PropertyOut.model_validate(p) for p in properties],
    }