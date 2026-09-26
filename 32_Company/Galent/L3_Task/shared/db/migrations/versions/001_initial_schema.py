"""Initial schema — all tables and indexes."""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Extensions
    op.execute("CREATE EXTENSION IF NOT EXISTS timescaledb;")
    op.execute('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

    # ENUMs
    op.execute("""
        DO $$ BEGIN
            CREATE TYPE severity_level AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');
        EXCEPTION WHEN duplicate_object THEN null; END $$;
    """)
    op.execute("""
        DO $$ BEGIN
            CREATE TYPE alert_status AS ENUM ('OPEN', 'ACKNOWLEDGED', 'RESOLVED', 'SUPPRESSED');
        EXCEPTION WHEN duplicate_object THEN null; END $$;
    """)
    op.execute("""
        DO $$ BEGIN
            CREATE TYPE parts_status AS ENUM ('PENDING', 'AVAILABLE', 'UNAVAILABLE', 'NOT_REQUIRED');
        EXCEPTION WHEN duplicate_object THEN null; END $$;
    """)
    op.execute("""
        DO $$ BEGIN
            CREATE TYPE service_type AS ENUM ('OIL_CHANGE','BRAKE_SERVICE','FULL_SERVICE',
                                              'TYRE_ROTATION','BATTERY_CHECK','OTHER');
        EXCEPTION WHEN duplicate_object THEN null; END $$;
    """)
    op.execute("""
        DO $$ BEGIN
            CREATE TYPE webhook_event_type AS ENUM ('SERVICE_SCHEDULED','SERVICE_COMPLETED','SERVICE_CANCELLED');
        EXCEPTION WHEN duplicate_object THEN null; END $$;
    """)

    # depots
    op.execute("""
        CREATE TABLE IF NOT EXISTS depots (
            depot_id   VARCHAR(50)  PRIMARY KEY,
            name       VARCHAR(200) NOT NULL,
            region     VARCHAR(100),
            created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
        );
    """)

    # vehicles
    op.execute("""
        CREATE TABLE IF NOT EXISTS vehicles (
            vehicle_id   VARCHAR(50)  PRIMARY KEY,
            depot_id     VARCHAR(50)  REFERENCES depots(depot_id),
            make         VARCHAR(100),
            model        VARCHAR(100),
            year         INTEGER,
            registration VARCHAR(20)  UNIQUE,
            status       VARCHAR(20)  NOT NULL DEFAULT 'ACTIVE',
            created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
            updated_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
        );
    """)
    op.execute("CREATE INDEX IF NOT EXISTS idx_vehicles_depot ON vehicles(depot_id);")

    # telemetry_readings (TimescaleDB hypertable)
    op.execute("""
        CREATE TABLE IF NOT EXISTS telemetry_readings (
            id              UUID         NOT NULL DEFAULT uuid_generate_v4(),
            vehicle_id      VARCHAR(50)  NOT NULL,
            ts              TIMESTAMPTZ  NOT NULL,
            engine_temp_c   NUMERIC(6,2),
            battery_voltage NUMERIC(5,2),
            odometer_km     NUMERIC(10,2),
            dtc_codes       TEXT[],
            depot_id        VARCHAR(50),
            late_arrival    BOOLEAN      NOT NULL DEFAULT FALSE,
            raw_payload     JSONB,
            PRIMARY KEY (id, ts)
        );
    """)
    op.execute("""
        SELECT create_hypertable('telemetry_readings', 'ts',
            chunk_time_interval => INTERVAL '1 day',
            if_not_exists => TRUE);
    """)
    op.execute("CREATE INDEX IF NOT EXISTS idx_telemetry_vehicle_ts ON telemetry_readings(vehicle_id, ts DESC);")
    op.execute("CREATE INDEX IF NOT EXISTS idx_telemetry_dtc ON telemetry_readings USING GIN(dtc_codes);")

    # service_records
    op.execute("""
        CREATE TABLE IF NOT EXISTS service_records (
            id             UUID         PRIMARY KEY DEFAULT uuid_generate_v4(),
            vehicle_id     VARCHAR(50)  NOT NULL,
            service_date   DATE         NOT NULL,
            service_type   service_type NOT NULL,
            odometer_km    NUMERIC(10,2),
            depot_id       VARCHAR(50),
            technician_id  VARCHAR(100),
            parts_used     TEXT[],
            cost_gbp       NUMERIC(10,2),
            next_service_km NUMERIC(10,2),
            notes          TEXT,
            source         VARCHAR(20)  NOT NULL DEFAULT 'CSV',
            created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
            UNIQUE(vehicle_id, service_date, service_type)
        );
    """)
    op.execute("CREATE INDEX IF NOT EXISTS idx_service_records_vehicle ON service_records(vehicle_id, service_date DESC);")

    # maintenance_alerts
    op.execute("""
        CREATE TABLE IF NOT EXISTS maintenance_alerts (
            id           UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
            vehicle_id   VARCHAR(50)     NOT NULL,
            depot_id     VARCHAR(50),
            rule_name    VARCHAR(100)    NOT NULL,
            severity     severity_level  NOT NULL,
            status       alert_status    NOT NULL DEFAULT 'OPEN',
            parts_status parts_status    NOT NULL DEFAULT 'PENDING',
            evidence     JSONB           NOT NULL,
            recommendation TEXT,
            fingerprint  VARCHAR(64)     UNIQUE NOT NULL,
            parts_data   JSONB,
            resolved_at  TIMESTAMPTZ,
            created_at   TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
            updated_at   TIMESTAMPTZ     NOT NULL DEFAULT NOW()
        );
    """)
    op.execute("CREATE INDEX IF NOT EXISTS idx_alerts_vehicle     ON maintenance_alerts(vehicle_id);")
    op.execute("CREATE INDEX IF NOT EXISTS idx_alerts_depot       ON maintenance_alerts(depot_id);")
    op.execute("CREATE INDEX IF NOT EXISTS idx_alerts_severity    ON maintenance_alerts(severity);")
    op.execute("CREATE INDEX IF NOT EXISTS idx_alerts_status      ON maintenance_alerts(status);")
    op.execute("CREATE INDEX IF NOT EXISTS idx_alerts_created     ON maintenance_alerts(created_at DESC);")
    op.execute("CREATE INDEX IF NOT EXISTS idx_alerts_fingerprint ON maintenance_alerts(fingerprint);")

    # parts_requests
    op.execute("""
        CREATE TABLE IF NOT EXISTS parts_requests (
            id             UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
            alert_id       UUID        NOT NULL REFERENCES maintenance_alerts(id),
            part_codes     TEXT[]      NOT NULL,
            attempt_number INTEGER     NOT NULL DEFAULT 1,
            status         VARCHAR(20) NOT NULL DEFAULT 'PENDING',
            response_code  INTEGER,
            response_body  JSONB,
            next_retry_at  TIMESTAMPTZ,
            created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
    """)

    # webhook_events
    op.execute("""
        CREATE TABLE IF NOT EXISTS webhook_events (
            id               UUID               PRIMARY KEY DEFAULT uuid_generate_v4(),
            event_type       webhook_event_type NOT NULL,
            alert_id         UUID               REFERENCES maintenance_alerts(id),
            vehicle_id       VARCHAR(50),
            raw_payload      JSONB              NOT NULL,
            processed        BOOLEAN            NOT NULL DEFAULT FALSE,
            processing_error TEXT,
            attempt_count    INTEGER            NOT NULL DEFAULT 0,
            received_at      TIMESTAMPTZ        NOT NULL DEFAULT NOW(),
            processed_at     TIMESTAMPTZ
        );
    """)
    op.execute("CREATE INDEX IF NOT EXISTS idx_webhook_unprocessed ON webhook_events(processed, received_at) WHERE processed = FALSE;")

    # Seed depots and vehicles for testing
    op.execute("""
        INSERT INTO depots (depot_id, name, region) VALUES
            ('D01', 'London North Depot', 'London'),
            ('D02', 'Manchester Central', 'North West'),
            ('D03', 'Birmingham Hub', 'Midlands'),
            ('D-TEST', 'Test Depot', 'Test')
        ON CONFLICT DO NOTHING;
    """)
    op.execute("""
        INSERT INTO vehicles (vehicle_id, depot_id, make, model, year, registration, status) VALUES
            ('VH-001', 'D01', 'Ford', 'Transit', 2021, 'LN21 ABC', 'ACTIVE'),
            ('VH-002', 'D02', 'Mercedes', 'Sprinter', 2020, 'MC20 DEF', 'ACTIVE'),
            ('VH-003', 'D01', 'Volkswagen', 'Crafter', 2019, 'LN19 GHI', 'ACTIVE'),
            ('VH-004', 'D03', 'Ford', 'Transit Custom', 2022, 'BH22 JKL', 'ACTIVE'),
            ('VH-ACCEPTANCE-001', 'D-TEST', 'Test', 'Vehicle', 2024, 'TS24 ACC', 'ACTIVE')
        ON CONFLICT DO NOTHING;
    """)


def downgrade() -> None:
    op.execute("DROP TABLE IF EXISTS webhook_events CASCADE;")
    op.execute("DROP TABLE IF EXISTS parts_requests CASCADE;")
    op.execute("DROP TABLE IF EXISTS maintenance_alerts CASCADE;")
    op.execute("DROP TABLE IF EXISTS service_records CASCADE;")
    op.execute("DROP TABLE IF EXISTS telemetry_readings CASCADE;")
    op.execute("DROP TABLE IF EXISTS vehicles CASCADE;")
    op.execute("DROP TABLE IF EXISTS depots CASCADE;")
    op.execute("DROP TYPE IF EXISTS webhook_event_type;")
    op.execute("DROP TYPE IF EXISTS service_type;")
    op.execute("DROP TYPE IF EXISTS parts_status;")
    op.execute("DROP TYPE IF EXISTS alert_status;")
    op.execute("DROP TYPE IF EXISTS severity_level;")
