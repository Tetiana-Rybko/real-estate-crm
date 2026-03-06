"""add activity relations

Revision ID: bc80db1735ac
Revises: 2bf7ec02fd67
Create Date: 2026-03-06 01:55:14.277151
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "bc80db1735ac"
down_revision = "2bf7ec02fd67"
branch_labels = None
depends_on = None


def upgrade():
    bind = op.get_bind()

    # --- 1) Create enum types FIRST (Postgres requires this) ---
    activity_type_enum = postgresql.ENUM(
        "note", "call", "meeting", "showing",
        name="activity_type",
        create_type=True
    )
    activity_status_enum = postgresql.ENUM(
        "planned", "done", "canceled",
        name="activity_status",
        create_type=True
    )
    task_status_enum = postgresql.ENUM(
        "todo", "in_progress", "done", "canceled",
        name="task_status",
        create_type=True
    )

    activity_type_enum.create(bind, checkfirst=True)
    activity_status_enum.create(bind, checkfirst=True)
    task_status_enum.create(bind, checkfirst=True)

    # --- 2) Activities: safe data normalization before type cast ---
    # (если там есть старые/левые значения — приведи к 'note', иначе ALTER TYPE упадёт)
    op.execute("""
        UPDATE activities
        SET type = 'note'
        WHERE type NOT IN ('note', 'call', 'meeting', 'showing')
    """)

    # --- 3) Activities: alter type -> enum ---
    op.alter_column(
        "activities",
        "type",
        existing_type=sa.VARCHAR(length=50),
        type_=sa.Enum("note", "call", "meeting", "showing", name="activity_type"),
        existing_nullable=False,
        postgresql_using="type::activity_type",
    )

    # --- 4) Add new columns to activities ---
    # status NOT NULL: добавляем с server_default, потом убираем дефолт
    op.add_column(
        "activities",
        sa.Column(
            "status",
            sa.Enum("planned", "done", "canceled", name="activity_status"),
            nullable=False,
            server_default="planned",
        ),
    )
    op.add_column("activities", sa.Column("user_id", sa.Integer(), nullable=True))
    op.add_column("activities", sa.Column("client_id", sa.Integer(), nullable=True))

    op.create_index(op.f("ix_activities_user_id"), "activities", ["user_id"], unique=False)
    op.create_index(op.f("ix_activities_client_id"), "activities", ["client_id"], unique=False)

    op.create_foreign_key(
        "fk_activities_user_id_users",
        "activities", "users",
        ["user_id"], ["id"],
        ondelete="SET NULL",
    )
    op.create_foreign_key(
        "fk_activities_client_id_clients",
        "activities", "clients",
        ["client_id"], ["id"],
        ondelete="SET NULL",
    )

    # убираем server_default после заливки
    op.alter_column("activities", "status", server_default=None)

    # --- 5) Tasks: add fields (если у тебя в модели tasks это реально есть) ---
    # Если ты НЕ добавляла эти поля в модель Task — скажи, и я выкину этот блок.
    op.add_column(
        "tasks",
        sa.Column(
            "status",
            sa.Enum("todo", "in_progress", "done", "canceled", name="task_status"),
            nullable=False,
            server_default="todo",
        ),
    )
    op.add_column("tasks", sa.Column("user_id", sa.Integer(), nullable=False))
    op.add_column("tasks", sa.Column("client_id", sa.Integer(), nullable=True))
    op.add_column("tasks", sa.Column("due_at", sa.DateTime(timezone=True), nullable=True))
    op.add_column(
        "tasks",
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
    )

    op.create_index(op.f("ix_tasks_user_id"), "tasks", ["user_id"], unique=False)
    op.create_index(op.f("ix_tasks_client_id"), "tasks", ["client_id"], unique=False)

    op.create_foreign_key(
        "fk_tasks_user_id_users",
        "tasks", "users",
        ["user_id"], ["id"],
        ondelete="RESTRICT",
    )
    op.create_foreign_key(
        "fk_tasks_client_id_clients",
        "tasks", "clients",
        ["client_id"], ["id"],
        ondelete="SET NULL",
    )

    op.alter_column("tasks", "status", server_default=None)

    # IMPORTANT:
    # НИКАКИХ drop_table('deal_properties') тут быть не должно.


def downgrade():
    bind = op.get_bind()

    # --- Tasks: drop constraints + indexes + columns ---
    op.drop_constraint("fk_tasks_client_id_clients", "tasks", type_="foreignkey")
    op.drop_constraint("fk_tasks_user_id_users", "tasks", type_="foreignkey")
    op.drop_index(op.f("ix_tasks_client_id"), table_name="tasks")
    op.drop_index(op.f("ix_tasks_user_id"), table_name="tasks")
    op.drop_column("tasks", "updated_at")
    op.drop_column("tasks", "due_at")
    op.drop_column("tasks", "client_id")
    op.drop_column("tasks", "user_id")
    op.drop_column("tasks", "status")

    # --- Activities: drop constraints + indexes + columns ---
    op.drop_constraint("fk_activities_client_id_clients", "activities", type_="foreignkey")
    op.drop_constraint("fk_activities_user_id_users", "activities", type_="foreignkey")
    op.drop_index(op.f("ix_activities_client_id"), table_name="activities")
    op.drop_index(op.f("ix_activities_user_id"), table_name="activities")
    op.drop_column("activities", "client_id")
    op.drop_column("activities", "user_id")
    op.drop_column("activities", "status")

    # revert enum -> varchar
    op.alter_column(
        "activities",
        "type",
        existing_type=sa.Enum("note", "call", "meeting", "showing", name="activity_type"),
        type_=sa.VARCHAR(length=50),
        existing_nullable=False,
        postgresql_using="type::text",
    )

    # --- Drop enum types LAST ---
    postgresql.ENUM(name="task_status").drop(bind, checkfirst=True)
    postgresql.ENUM(name="activity_status").drop(bind, checkfirst=True)
    postgresql.ENUM(name="activity_type").drop(bind, checkfirst=True)