"""Add parts_status column update support."""
from alembic import op

revision = "002"
down_revision = "001"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Add UNAVAILABLE to parts_status enum if not already there
    # (enum was already created in 001 with all values)
    # This migration is a placeholder for schema evolution
    pass


def downgrade() -> None:
    pass
