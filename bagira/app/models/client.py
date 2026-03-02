from __future__ import annotations

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Client(Base):
    __tablename__ = "clients"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    full_name: Mapped[str] = mapped_column(String(200))
    phone: Mapped[str | None] = mapped_column(String(50), nullable=True)
    email: Mapped[str | None] = mapped_column(String(200), nullable=True, unique=True, index=True)
    note: Mapped[str | None] = mapped_column(String(500), nullable=True)

    agent_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )

    # связь клиент -> пользователь(агент)
    agent: Mapped["User"] = relationship("User", back_populates="clients")

    deals: Mapped[list["Deal"]] = relationship("Deal", back_populates="client")
    properties: Mapped[list["Property"]] = relationship("Property", back_populates="owner")