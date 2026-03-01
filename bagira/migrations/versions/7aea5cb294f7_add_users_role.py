"""add users.role and clients.agent_id

Revision ID: 7aea5cb294f7
Revises: 641c7b96112a
Create Date: 2026-03-01 17:51:06.632017
"""

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = "7aea5cb294f7"
down_revision = "641c7b96112a"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # 1) Создаём enum-тип в Postgres (если ещё не создан)
    user_role = sa.Enum("ADMIN", "AGENT", name="user_role")
    user_role.create(op.get_bind(), checkfirst=True)

    # 2) Добавляем колонку role в users с дефолтом AGENT
    op.add_column(
        "users",
        sa.Column("role", sa.Enum("ADMIN", "AGENT", name="user_role"), nullable=False, server_default="AGENT"),
    )
    # убираем server_default, чтобы дальше оно не жило в схеме БД
    op.alter_column("users", "role", server_default=None)

    # 3) clients.agent_id
    # ВАЖНО: если в clients уже есть записи — нельзя сразу nullable=False.
    # Поэтому делаем в 2 шага: сначала nullable=True, потом заполняем, потом NOT NULL.
    op.add_column("clients", sa.Column("agent_id", sa.Integer(), nullable=True))
    op.create_index(op.f("ix_clients_agent_id"), "clients", ["agent_id"], unique=False)
    op.create_foreign_key(
        "fk_clients_agent_id_users",
        "clients",
        "users",
        ["agent_id"],
        ["id"],
        ondelete="RESTRICT",
    )

    # Если в таблице clients уже есть строки — проставим всем агентом первого ADMIN
    # (иначе NOT NULL будет невозможно включить).
    op.execute(
        """
        UPDATE clients
        SET agent_id = (
            SELECT id FROM users
            WHERE role = 'ADMIN'
            ORDER BY id
            LIMIT 1
        )
        WHERE agent_id IS NULL;
        """
    )

    # Теперь можно сделать NOT NULL (если admin существует или clients пустая)
    op.alter_column("clients", "agent_id", nullable=False)


def downgrade() -> None:
    op.drop_constraint("fk_clients_agent_id_users", "clients", type_="foreignkey")
    op.drop_index(op.f("ix_clients_agent_id"), table_name="clients")
    op.drop_column("clients", "agent_id")

    op.drop_column("users", "role")

    # удаляем enum-тип (если не используется)
    user_role = sa.Enum("ADMIN", "AGENT", name="user_role")
    user_role.drop(op.get_bind(), checkfirst=True)