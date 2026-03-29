"""add property intakes

Revision ID: b26333d18d32
Revises: 3f1454d1c8e4
Create Date: 2026-03-29
"""

from alembic import op
import sqlalchemy as sa


revision = "b26333d18d32"
down_revision = "3f1454d1c8e4"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "property_intakes",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("created_by_id", sa.Integer(), nullable=False),
        sa.Column("property_id", sa.Integer(), nullable=True),
        sa.Column("status", sa.String(), nullable=False),
        sa.Column("property_type", sa.String(), nullable=True),
        sa.Column("residential_complex", sa.String(), nullable=True),
        sa.Column("class_type", sa.String(), nullable=True),
        sa.Column("exclusive", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("city", sa.String(), nullable=True),
        sa.Column("district", sa.String(), nullable=True),
        sa.Column("street", sa.String(), nullable=True),
        sa.Column("building_number", sa.String(), nullable=True),
        sa.Column("apartment_number", sa.String(), nullable=True),
        sa.Column("rooms", sa.Integer(), nullable=True),
        sa.Column("total_floors", sa.Integer(), nullable=True),
        sa.Column("floor", sa.Integer(), nullable=True),
        sa.Column("area_total", sa.Numeric(10, 2), nullable=True),
        sa.Column("area_living", sa.Numeric(10, 2), nullable=True),
        sa.Column("area_kitchen", sa.Numeric(10, 2), nullable=True),
        sa.Column("ceiling_height", sa.Numeric(10, 2), nullable=True),
        sa.Column("layout_features", sa.Text(), nullable=True),
        sa.Column("sanitary_unit", sa.String(), nullable=True),
        sa.Column("wall_type", sa.String(), nullable=True),
        sa.Column("lift", sa.Boolean(), nullable=True),
        sa.Column("security", sa.Text(), nullable=True),
        sa.Column("repair", sa.String(), nullable=True),
        sa.Column("insulation", sa.String(), nullable=True),
        sa.Column("communications", sa.Text(), nullable=True),
        sa.Column("power_outage_notes", sa.Text(), nullable=True),
        sa.Column("year_built", sa.Integer(), nullable=True),
        sa.Column("individual_meters", sa.Boolean(), nullable=True),
        sa.Column("heating", sa.String(), nullable=True),
        sa.Column("water_heating", sa.String(), nullable=True),
        sa.Column("furniture_appliances", sa.Text(), nullable=True),
        sa.Column("bathroom_type", sa.String(), nullable=True),
        sa.Column("living_room_details", sa.Text(), nullable=True),
        sa.Column("walls_condition", sa.String(), nullable=True),
        sa.Column("ceiling_condition", sa.String(), nullable=True),
        sa.Column("floor_condition", sa.String(), nullable=True),
        sa.Column("price", sa.Numeric(12, 2), nullable=True),
        sa.Column("commission", sa.Numeric(12, 2), nullable=True),
        sa.Column("osbb_monthly", sa.Numeric(10, 2), nullable=True),
        sa.Column("electricity_price_per_kw", sa.Numeric(10, 2), nullable=True),
        sa.Column("has_direct_electric_contract", sa.Boolean(), nullable=True),
        sa.Column("utility_debts", sa.Text(), nullable=True),
        sa.Column("owner_count", sa.Integer(), nullable=True),
        sa.Column("owner_name", sa.Text(), nullable=True),
        sa.Column("marital_status", sa.String(), nullable=True),
        sa.Column("registered_residents_count", sa.Integer(), nullable=True),
        sa.Column("deal_formalization", sa.Text(), nullable=True),
        sa.Column("documents_ready", sa.Boolean(), nullable=True),
        sa.Column("children_shares", sa.Boolean(), nullable=True),
        sa.Column("programs", sa.Text(), nullable=True),
        sa.Column("viewing_schedule", sa.Text(), nullable=True),
        sa.Column("has_keys", sa.Boolean(), nullable=True),
        sa.Column("owner_phone", sa.String(), nullable=True),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.ForeignKeyConstraint(["created_by_id"], ["users.id"]),
        sa.ForeignKeyConstraint(["property_id"], ["properties.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_property_intakes_id"), "property_intakes", ["id"], unique=False)


def downgrade():
    op.drop_index(op.f("ix_property_intakes_id"), table_name="property_intakes")
    op.drop_table("property_intakes")