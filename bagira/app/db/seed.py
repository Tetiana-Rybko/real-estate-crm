from app.db.session import SessionLocal
from app.models.user import User, UserRole
from app.models.client import Client
from app.models.property import Property, PropertyType, PropertyStatus
from app.models.deal import Deal, DealType, DealStatus
from app.models.deal_property import DealProperty


def run():
    db = SessionLocal()

    # --- USER ---
    user = User(
        full_name="Admin",
        email="admin@bagira.com",
        hashed_password="test123",
        role=UserRole.ADMIN,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # --- CLIENTS ---
    clients = [
        Client(full_name="Иван Петров", phone="+49123", email="ivan@test.com", agent_id=user.id),
        Client(full_name="Анна Смирнова", phone="+49124", email="anna@test.com", agent_id=user.id),
        Client(full_name="John Doe", phone="+49125", email="john@test.com", agent_id=user.id),
    ]
    db.add_all(clients)
    db.commit()

    # --- PROPERTIES ---
    properties = [
        Property(
            type=PropertyType.apartment,
            status=PropertyStatus.active,
            agent_id=user.id,
            title="Квартира в центре",
            city="Berlin",
            price=200000,
            owner_id=clients[0].id,
        ),
        Property(
            type=PropertyType.house,
            status=PropertyStatus.active,
            agent_id=user.id,
            title="Дом",
            city="Berlin",
            price=500000,
            owner_id=clients[1].id,
        ),
    ]
    db.add_all(properties)
    db.commit()

    # --- DEALS ---
    deals = [
        Deal(
            title="Покупка квартиры",
            type=DealType.purchase,
            status=DealStatus.new,
            client_id=clients[0].id,
            realtor_id=user.id,
        ),
        Deal(
            title="Продажа дома",
            type=DealType.sale,
            status=DealStatus.negotiation,
            client_id=clients[1].id,
            realtor_id=user.id,
        ),
    ]
    db.add_all(deals)
    db.commit()

    # --- LINK DEALS ↔️ PROPERTIES ---
    links = [
        DealProperty(deal_id=deals[0].id, property_id=properties[0].id),
        DealProperty(deal_id=deals[1].id, property_id=properties[1].id),
    ]
    db.add_all(links)
    db.commit()

    db.close()
    print("SEED DONE")


if __name__ == "__main__":
    run()