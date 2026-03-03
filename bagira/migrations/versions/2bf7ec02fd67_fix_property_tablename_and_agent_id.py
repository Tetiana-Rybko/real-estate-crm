"""fix property tablename and agent_id

Revision ID: 2bf7ec02fd67
Revises: 3c4a8437e3a9
Create Date: 2026-03-04 00:34:16.474301
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision = "2bf7ec02fd67"
down_revision = "3c4a8437e3a9"
branch_labels = None
depends_on = None


property_type_enum = postgresql.ENUM(
    "apartment",
    "house",
    "land",
    "commercial",
    name="property_type",
)

property_status_enum = postgresql.ENUM(
    "draft",
    "active",
    "reserved",
    "closed",
    "archived",
    name="property_status",
)


def upgrade():
    # создаём enum типы если их нет
    property_type_enum.create(op.get_bind(), checkfirst=True)
    property_status_enum.create(op.get_bind(), checkfirst=True)

    # меняем тип колонок
    op.alter_column(
        "properties",
        "type",
        existing_type=sa.String(),
        type_=property_type_enum,
        postgresql_using="type::text::property_type",
        existing_nullable=False,
    )

    op.alter_column(
        "properties",
        "status",
        existing_type=sa.String(),
        type_=property_status_enum,
        postgresql_using="status::text::property_status",
        existing_nullable=False,
    )


def downgrade():
    op.alter_column(
        "properties",
        "status",
        existing_type=property_status_enum,
        type_=sa.String(),
        postgresql_using="status::text",
        existing_nullable=False,
    )

    op.alter_column(
        "properties",
        "type",
        existing_type=property_type_enum,
        type_=sa.String(),
        postgresql_using="type::text",
        existing_nullable=False,
    )

    property_status_enum.drop(op.get_bind(), checkfirst=True)
    property_type_enum.drop(op.get_bind(), checkfirst=True)