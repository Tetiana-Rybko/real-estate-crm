from alembic import op
import sqlalchemy as sa



revision = "7ae77bg07"
down_revision = "977e21dce484"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "property_images",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("property_id", sa.Integer(), nullable=False),
        sa.Column("file_path", sa.String(length=500), nullable=False),
        sa.Column("is_main", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("sort_order", sa.Integer(), nullable=False, server_default="0"),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
        sa.ForeignKeyConstraint(
            ["property_id"],
            ["properties.id"],
            ondelete="CASCADE",
        ),
    )

    op.create_index(
        op.f("ix_property_images_id"),
        "property_images",
        ["id"],
        unique=False,
    )
    op.create_index(
        op.f("ix_property_images_property_id"),
        "property_images",
        ["property_id"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(op.f("ix_property_images_property_id"), table_name="property_images")
    op.drop_index(op.f("ix_property_images_id"), table_name="property_images")
    op.drop_table("property_images")