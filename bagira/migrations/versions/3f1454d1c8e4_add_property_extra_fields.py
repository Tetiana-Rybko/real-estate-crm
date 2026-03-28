"""add property extra fields

Revision ID: 3f1454d1c8e4
Revises: 7ae77bg07
Create Date: 2026-03-28
"""

from alembic import op
import sqlalchemy as sa


revision = "3f1454d1c8e4"
down_revision = "7ae77bg07"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column("properties", sa.Column("class_type", sa.String(), nullable=True))
    op.add_column("properties", sa.Column("year_built", sa.Integer(), nullable=True))
    op.add_column("properties", sa.Column("heating", sa.String(), nullable=True))
    op.add_column("properties", sa.Column("furniture", sa.String(), nullable=True))
    op.add_column("properties", sa.Column("commission", sa.Integer(), nullable=True))


def downgrade():
    op.drop_column("properties", "commission")
    op.drop_column("properties", "furniture")
    op.drop_column("properties", "heating")
    op.drop_column("properties", "year_built")
    op.drop_column("properties", "class_type")
