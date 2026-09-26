# 🚐 Fleet Health & Predictive Maintenance Engine

A production-grade, event-driven microservices system for real-time vehicle fleet health monitoring and predictive maintenance alert generation.

---

## 📐 Architecture Overview

```
┌──────────────────┐     Kafka          ┌─────────────────┐     Kafka
│  Ingestion API   │ ──► telemetry.raw ─►│  Rule Engine    │ ──► alerts.notifications
│  :8001           │                     │  (3 rules)      │
└──────────────────┘                     └─────────────────┘
        │                                        │
  CSV Ingestion                         ┌────────▼────────┐
  (batch + scheduler)                   │ Alert Processor │ ──► Parts API Mock :8003
                                        └────────┬────────┘
                                                 │ DB write
                                    ┌────────────▼────────────┐
                                    │    PostgreSQL            │
                                    │    (TimescaleDB)         │
                                    └────────────┬────────────┘
                                                 │
                                    ┌────────────▼────────────┐
                                    │    Dashboard API :8002   │
                                    │    REST + WebSocket      │
                                    └────────────┬────────────┘
                                                 │
                                    ┌────────────▼────────────┐
                                    │    React Frontend :3000  │
                                    │    Live alerts + filters │
                                    └─────────────────────────┘
```

**Infrastructure:** Kafka (KRaft, no Zookeeper) · PostgreSQL 15 + TimescaleDB · Redis 7

---

## 🚀 Quick Start

### Prerequisites
- Docker Desktop ≥ 4.25
- Docker Compose v2 (`docker compose` not `docker-compose`)
- 4 GB free RAM (Kafka + Postgres are memory-hungry)

### Start the Full Stack

```bash
# Clone and enter the project
cd L3_Task

# Start everything (builds images on first run, ~3 min)
make up

# Watch all service logs
make logs

# Check all containers are healthy
docker compose ps
```

### Ports

| Service | URL |
|---------|-----|
| **React Dashboard** | http://localhost:3000 |
| **Ingestion API** | http://localhost:8001 |
| **Dashboard API** | http://localhost:8002 |
| **Parts API Mock** | http://localhost:8003 |
| **Webhook Receiver** | http://localhost:8004 |
| **PostgreSQL** | localhost:5432 |
| **Redis** | localhost:6379 |
| **Kafka** | localhost:9092 |

---

## 📡 Send Test Telemetry

### Single overheating alert (3 readings above 105°C)

```bash
# Get current UTC time
NOW=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
T1=$(date -u -v-2M +"%Y-%m-%dT%H:%M:%SZ")  # macOS
T2=$(date -u -v-1M +"%Y-%m-%dT%H:%M:%SZ")  # macOS

curl -X POST http://localhost:8001/telemetry/batch \
  -H "X-API-Key: dev-api-key" \
  -H "Content-Type: application/json" \
  -d "{
    \"events\": [
      {\"vehicle_id\":\"VH-001\",\"timestamp\":\"$T1\",\"engine_temp_c\":108.0,\"battery_voltage\":12.4,\"odometer_km\":50000,\"dtc_codes\":[],\"depot_id\":\"D01\"},
      {\"vehicle_id\":\"VH-001\",\"timestamp\":\"$T2\",\"engine_temp_c\":109.0,\"battery_voltage\":12.3,\"odometer_km\":50001,\"dtc_codes\":[],\"depot_id\":\"D01\"},
      {\"vehicle_id\":\"VH-001\",\"timestamp\":\"$NOW\",\"engine_temp_c\":110.0,\"battery_voltage\":12.2,\"odometer_km\":50002,\"dtc_codes\":[],\"depot_id\":\"D01\"}
    ]
  }"
```

Wait ~15 seconds, then query the alert:

```bash
curl "http://localhost:8002/alerts?vehicle_id=VH-001" \
  -H "Authorization: Bearer dev-dashboard-token"
```

### Ingest sample CSV data

```bash
make seed
```

---

## 🧪 Running Tests

### Unit Tests (no Docker required)

```bash
# Install test dependencies
pip3 install pytest pydantic pydantic-settings pyyaml

# Run all unit tests
make test-unit
# or
python3 -m pytest tests/unit/ -v
```

### Acceptance Tests (requires running stack)

```bash
# Start the stack first
make up

# Run the 3 required acceptance scenarios
make test-acceptance
```

The acceptance tests cover:
1. **Overheating scenario** — 3 readings > 105°C → one `HIGH` alert created
2. **Idempotency** — same 3 readings replayed → still only one alert
3. **Parts API unavailable** — alert created with `PENDING` parts status

---

## 📁 Project Structure

```
L3_Task/
├── docker-compose.yml          # Full stack orchestration
├── Makefile                    # Developer shortcuts
├── .env.example                # Environment variable template
├── config/
│   └── rules.yaml              # Business rules (thresholds, windows)
├── shared/                     # Shared Python libraries
│   ├── db/                     # SQLAlchemy session + Alembic migrations
│   ├── kafka/                  # aiokafka producer/consumer wrappers
│   ├── redis_client/           # Redis connection pool
│   └── models/enums.py         # Shared Enums (Severity, AlertStatus, ...)
├── services/
│   ├── ingestion_api/          # FastAPI — telemetry ingest, dedup, auth
│   ├── rule_engine/            # Kafka consumer + 3 rules + fingerprinting
│   ├── alert_processor/        # Alert DB persistence + parts API + retry
│   ├── parts_api_mock/         # Controllable mock (normal/rate_limited/unavailable)
│   ├── dashboard_api/          # REST + WebSocket API for frontend
│   ├── csv_ingestion/          # Batch CSV ingestion CLI
│   ├── scheduler/              # APScheduler (CSV + retry jobs)
│   └── webhook_receiver/       # HMAC-validated inbound webhooks
├── frontend/                   # React + Vite dashboard
├── data/
│   ├── service_records.csv     # Sample service records
│   ├── parts_catalog.json      # Parts reference data
│   └── incoming/               # Drop CSVs here for auto-ingestion
├── tests/
│   ├── unit/rule_engine/       # 35 passing unit tests
│   └── acceptance/             # End-to-end acceptance scenarios
└── Docs/
    ├── task_planner.md         # Implementation progress tracker
    ├── architecture_note.md    # Privacy, observability, scaling
    ├── hld.md                  # High-level design
    └── lld.md                  # Low-level design
```

---

## ⚙️ Configuration

Copy `.env.example` to `.env` (done automatically by `make up`):

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `postgresql+asyncpg://fleet:secret@postgres/fleet_db` | Postgres connection |
| `REDIS_URL` | `redis://redis:6379/0` | Redis connection |
| `KAFKA_BOOTSTRAP_SERVERS` | `kafka:9092` | Kafka broker |
| `API_KEY` | `dev-api-key` | Ingestion API key |
| `PARTS_API_URL` | `http://parts-api-mock:8000` | Parts API endpoint |
| `PARTS_API_MODE` | `normal` | `normal` / `rate_limited` / `unavailable` |

### Switching Parts API Mode at Runtime

```bash
# Simulate parts API being unavailable
curl -X POST http://localhost:8003/mock/mode \
  -H "Content-Type: application/json" \
  -d '{"mode": "unavailable"}'

# Restore normal mode
curl -X POST http://localhost:8003/mock/mode \
  -H "Content-Type: application/json" \
  -d '{"mode": "normal"}'
```

---

## 🔧 Makefile Reference

```bash
make up              # Build images + start all services
make down            # Stop and remove all containers
make logs            # Tail all service logs
make seed            # Send sample telemetry events
make test-unit       # Run unit tests (no Docker needed)
make test-acceptance # Run acceptance scenario tests
make restart svc=rule-engine  # Restart a specific service
make psql            # Open Postgres shell
make redis-cli       # Open Redis CLI
```

---

## 📋 Business Rules

Configured in [`config/rules.yaml`](./config/rules.yaml):

| Rule | Trigger | Severity |
|------|---------|----------|
| **Overheating** | 3 consecutive engine temp readings ≥ 105°C | HIGH |
| **Repeated Fault Code** | Same DTC code appears ≥ 3× within 60 minutes | MEDIUM |
| **Overdue Service** | Odometer exceeds last service by 10,000 km OR 180+ days since last service | LOW |

---

## 📚 Documentation

- [Architecture Note](./Docs/architecture_note.md) — Privacy, observability, failure recovery, scaling
- [High-Level Design](./Docs/hld.md) — System overview and data flow
- [Low-Level Design](./Docs/lld.md) — Module design and API contracts
- [Task Planner](./Docs/task_planner.md) — Implementation progress (125/176 tasks complete)
