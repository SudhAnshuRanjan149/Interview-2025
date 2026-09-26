# High Level Design (HLD)
## Automotive Fleet Health & Predictive Maintenance Engine

> **Task Ref:** Task 2 — Fleet Health & Predictive Maintenance  
> **Version:** 1.0 | **Date:** 2026-09-26

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Architecture Diagram](#2-architecture-diagram)
3. [Tech Component Breakdown](#3-tech-component-breakdown)
4. [End-to-End Data Flow](#4-end-to-end-data-flow)
5. [Rule Engine Design](#5-rule-engine-design)
6. [Idempotency & Exactly-Once Guarantee](#6-idempotency--exactly-once-guarantee)
7. [External API Handling](#7-external-api-handling)
8. [Security Layer](#8-security-layer)
9. [Observability Stack](#9-observability-stack)
10. [Failure Recovery](#10-failure-recovery)
11. [Scalability Plan (10M+ Daily Events)](#11-scalability-plan-10m-daily-events)
12. [Deployment (Docker Topology)](#12-deployment-docker-topology)
13. [Component Responsibility Summary](#13-component-responsibility-summary)

---

## 1. System Overview

The system ingests telemetry from a fleet of vehicles in real-time, evaluates configurable health rules, generates de-duplicated maintenance alerts, checks spare-parts availability, and surfaces everything through a live web dashboard.

```
Vehicle Fleet
    │
    ├── Streaming Telemetry (engine temp, battery, odometer, DTCs)
    └── Batch Service History (CSV)
            │
            ▼
    ┌─────────────────┐
    │  Ingestion Layer │  ← validates, normalises, deduplicates
    └────────┬────────┘
             │
             ▼
    ┌─────────────────┐
    │   Message Queue  │  ← Kafka / Redis Streams
    └────────┬────────┘
             │
             ▼
    ┌─────────────────┐
    │   Rule Engine   │  ← stateful, configurable, idempotent
    └────────┬────────┘
             │
    ┌────────┴────────────────────┐
    │                             │
    ▼                             ▼
┌──────────┐            ┌──────────────────┐
│ Alert DB │            │ Spare-Parts API  │
│(Postgres)│            │   (mocked)       │
└──────────┘            └──────────────────┘
         │
         ▼
┌─────────────────┐
│   API Server    │  ← REST + WebSocket
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Web Dashboard  │  ← live fleet health UI
└─────────────────┘
```

---

## 2. Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────┐
│                          VEHICLE FLEET                             │
│   VehicleA  VehicleB  VehicleC  ...  VehicleN                      │
│   [Sensors: temp / voltage / odometer / DTC codes]                 │
└──────────────────────────┬─────────────────────────────────────────┘
                           │  HTTP / MQTT / WebSocket push
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      INGESTION LAYER                                │
│  ┌──────────────────────────┐    ┌──────────────────────────────┐  │
│  │  Telemetry Ingestion     │    │   CSV Batch Ingestion        │  │
│  │  Service (FastAPI)       │    │   Service (Scheduler/Cron)   │  │
│  │  - Schema validation     │    │   - Parse service records    │  │
│  │  - Deduplication check   │    │   - Normalize & publish      │  │
│  │  - Out-of-order handling │    │                              │  │
│  │  - Rate-limit awareness  │    │                              │  │
│  └───────────┬──────────────┘    └──────────────┬───────────────┘  │
└──────────────┼────────────────────────────────┬─┘                  │
               │                                │
               ▼                                ▼
┌──────────────────────────────────────────────────────────────────────┐
│                       MESSAGE QUEUE  (Kafka)                         │
│   Topics:                                                            │
│   ├── telemetry.raw         ← raw vehicle readings                   │
│   ├── service.records       ← batch service history events           │
│   └── alerts.notifications  ← generated maintenance alerts          │
└───────────────────────────────┬──────────────────────────────────────┘
                                │
                    ┌───────────┼────────────────┐
                    ▼           ▼                ▼
        ┌────────────────┐  ┌────────────┐  ┌──────────────────────┐
        │  Rule Engine   │  │  Alert     │  │  Webhook Receiver    │
        │  Service       │  │  Processor │  │  (service-status)    │
        │  (Python)      │  │            │  │  with retry/DLQ      │
        └───────┬────────┘  └─────┬──────┘  └──────────────────────┘
                │                 │
    ┌───────────┘                 │
    │  Check idempotency          │
    ▼                             ▼
┌──────────────┐         ┌────────────────────────┐
│  Redis       │         │  Spare-Parts API        │
│  (Cache)     │         │  (Mocked Stub Server)   │
│  - Idempotency│        │  - GET /parts/available │
│    key store  │        │  - Simulates 200/429/503│
│  - Rate-limit │        │  - Retry w/ backoff     │
│    counters   │        └─────────┬───────────────┘
└──────────────┘                   │
                                   ▼
┌────────────────────────────────────────────────────────────┐
│                    DATABASE LAYER                          │
│  ┌─────────────────────────────┐  ┌──────────────────────┐│
│  │  PostgreSQL + TimescaleDB   │  │  PostgreSQL (OLTP)   ││
│  │  (Time-Series Store)        │  │  (Operational Store) ││
│  │  - telemetry_readings       │  │  - vehicles          ││
│  │  - aggregations             │  │  - depots            ││
│  │                             │  │  - maintenance_alerts││
│  │                             │  │  - service_records   ││
│  │                             │  │  - parts_requests    ││
│  └─────────────────────────────┘  └──────────────────────┘│
└─────────────────────────────┬──────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────┐
│                     API LAYER (FastAPI)                    │
│   REST Endpoints + WebSocket Server                        │
│   - GET  /fleet/health                                     │
│   - GET  /alerts?depot=X&severity=HIGH                     │
│   - GET  /vehicles/:id/history                             │
│   - WS   /ws/live-updates                                  │
│   - POST /webhooks/service-status                          │
└─────────────────────────────┬──────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────┐
│                   WEB DASHBOARD (React)                    │
│   - Fleet Health Overview                                  │
│   - High-Risk Vehicles Panel                               │
│   - Active Alerts with Severity Badges                     │
│   - Maintenance Priority Queue                             │
│   - Filters: Depot / Vehicle / Severity                    │
│   - Live Updates via WebSocket                             │
└────────────────────────────────────────────────────────────┘
```

---

## 3. Tech Component Breakdown

### 3.1 API Layer — FastAPI (Python)

| Aspect | Detail |
|--------|--------|
| **Role** | Receives vehicle telemetry pushes; serves dashboard data; exposes WebSocket for live updates |
| **Why FastAPI** | Async-native, high throughput, built-in OpenAPI docs, WebSocket support |
| **Endpoints** | REST for data queries + WebSocket for real-time dashboard push |
| **Auth** | JWT Bearer tokens for internal services; API Keys for vehicle agents |

---

### 3.2 Message Queue — Apache Kafka

| Aspect | Detail |
|--------|--------|
| **Role** | Decouples ingestion from processing; acts as durable, ordered event log |
| **Topics** | `telemetry.raw`, `service.records`, `alerts.notifications` |
| **Why Kafka** | Partitioned by `vehicle_id` (ordering preserved per vehicle), replay support, consumer groups, high throughput |
| **Retention** | 7-day log retention for replay & recovery |
| **Alternative (local dev)** | Redis Streams (lighter weight for development) |

> **Key guarantee:** Partitioning by `vehicle_id` ensures all readings from a single vehicle are processed in order by the Rule Engine, which is critical for detecting N **consecutive** overheating readings.

---

### 3.3 Cache — Redis

| Aspect | Detail |
|--------|--------|
| **Role 1 — Idempotency Store** | Stores fingerprint hashes of processed alert windows; prevents duplicate alerts on event replay |
| **Role 2 — Rate Limit Counter** | Tracks outbound call counts to the spare-parts API; enforces rate limits per time window |
| **Role 3 — Session Cache** | Caches frequently-read fleet summary data for dashboard API responses |
| **Data structure** | `SET` for idempotency keys (TTL: 30 days), `INCR` + `EXPIRE` for rate counters |
| **Why Redis** | In-memory, sub-millisecond latency, native TTL support |

---

### 3.4 Time-Series Database — PostgreSQL + TimescaleDB

| Aspect | Detail |
|--------|--------|
| **Role** | Stores raw telemetry readings with timestamps; supports time-range queries and aggregations |
| **Why TimescaleDB** | Built on Postgres; automatic hypertable partitioning by time; fast range queries (`WHERE time > NOW() - INTERVAL '1h'`) |
| **Key Table** | `telemetry_readings(vehicle_id, ts, engine_temp, battery_voltage, odometer, dtc_code)` |
| **Hypertable partition** | By `ts` (1-day chunks) |

---

### 3.5 Operational Database — PostgreSQL (OLTP)

| Aspect | Detail |
|--------|--------|
| **Role** | Stores all non-time-series operational data |
| **Key Tables** | `vehicles`, `depots`, `maintenance_alerts`, `service_records`, `parts_requests`, `webhook_events` |
| **Why separate from timeseries** | OLTP queries are relational (joins, updates); time-series store is optimised for append-only bulk reads |

> **Note:** Both databases can run on the same Postgres instance with TimescaleDB extension enabled — kept logically separate here for clarity.

---

### 3.6 Rule Engine Service (Python)

| Aspect | Detail |
|--------|--------|
| **Role** | Consumes telemetry events from Kafka; evaluates configurable health rules; triggers alert creation |
| **Rules config** | YAML file — thresholds are tunable without code changes |
| **Stateful window** | Maintains in-memory sliding window per `vehicle_id` for consecutive-reading checks |
| **Idempotency** | Before creating alert → checks Redis for existing fingerprint; skips if already processed |

**Rules evaluated (configurable):**

```yaml
rules:
  overheating:
    metric: engine_temp
    threshold: 105       # °C
    consecutive: 3       # consecutive readings required
    severity: HIGH

  repeated_fault_code:
    window_minutes: 60
    min_occurrences: 3
    severity: MEDIUM

  overdue_service:
    odometer_interval_km: 10000
    time_interval_days: 180
    severity: MEDIUM
```

---

### 3.7 Alert Processor Service (Python)

| Aspect | Detail |
|--------|--------|
| **Role** | Receives triggered rule events; persists `maintenance_alerts` to DB; calls spare-parts API; publishes to `alerts.notifications` Kafka topic |
| **Parts API call** | If available → attach to alert; if unavailable → mark `parts_status: PENDING`, schedule retry |
| **Retry queue** | Uses Redis-backed retry queue with exponential backoff for failed API calls |

---

### 3.8 Spare-Parts API (Mocked Stub Server — FastAPI)

| Aspect | Detail |
|--------|--------|
| **Role** | Simulates an external third-party parts supplier API |
| **Endpoints** | `GET /parts/available?part_code=X` |
| **Simulated responses** | `200 OK` (available), `404` (not found), `429` (rate limited), `503` (unavailable) |
| **Controllable via env var** | `PARTS_API_MODE=normal|rate_limited|unavailable` |
| **Why mock** | Allows testing failure scenarios (retries, pending states) without a real supplier |

---

### 3.9 Webhook Receiver (Python)

| Aspect | Detail |
|--------|--------|
| **Role** | Receives inbound `POST` callbacks from service centres updating job status |
| **Reliability** | Validates payload signature (HMAC); writes raw event to `webhook_events` table immediately; processes asynchronously |
| **Failure handling** | Dead-Letter Queue (DLQ) in Redis for events that fail processing after N retries |

---

### 3.10 Web Dashboard (React + WebSocket)

| Aspect | Detail |
|--------|--------|
| **Role** | Real-time visualization of fleet health; alert management |
| **Live updates** | Subscribes to WebSocket endpoint; renders new alerts instantly |
| **Panels** | Fleet Health Overview, High-Risk Vehicles, Active Alerts, Maintenance Queue |
| **Filters** | Depot, Vehicle ID, Severity |
| **Tech** | React (or plain HTML+JS with EventSource / WebSocket) |

---

### 3.11 Scheduler / Cron Service

| Aspect | Detail |
|--------|--------|
| **Role** | Triggers batch CSV ingestion on a schedule; also retries failed parts API requests |
| **Tool** | APScheduler (Python) or a dedicated cron container |
| **Jobs** | `ingest_csv_service_records` (every N minutes), `retry_pending_parts_requests` (every 5 min) |

---

### ❌ No LLM / RAG — Why?

> The task is **rule-based** with explicit, configurable thresholds — not a semantic search or generative AI problem. Introducing an LLM would add latency, cost, and non-determinism without benefit. The rule engine already provides explainable, auditable maintenance decisions.
>
> **ML extension (future):** A lightweight anomaly-detection model (e.g., Isolation Forest on odometer + temp trends) could complement rules for early warnings — but is out of scope for this task.

---

## 4. End-to-End Data Flow

### Flow A — Streaming Telemetry → Alert

```
1. Vehicle sensor pushes reading → POST /telemetry (Ingestion API)
2. Ingestion API:
   a. Validates schema (rejects unknown fields gracefully)
   b. Checks Redis dedup key [vehicle_id + reading_hash] → skip if duplicate
   c. Publishes validated event to Kafka topic: telemetry.raw
3. Rule Engine Consumer:
   a. Reads from telemetry.raw (partitioned by vehicle_id)
   b. Updates in-memory sliding window for vehicle
   c. Evaluates all rules
   d. If rule triggers:
      i.  Computes alert fingerprint = hash(vehicle_id + rule_id + event_window_timestamps)
      ii. Checks Redis: if fingerprint exists → skip (idempotent)
      iii. Publishes rule-trigger event to Kafka topic: alerts.notifications
4. Alert Processor Consumer:
   a. Reads alert trigger event
   b. Writes maintenance_alert to PostgreSQL (status: OPEN)
   c. Calls Spare-Parts API:
      - Success → update alert with parts_status: AVAILABLE, suggest slot
      - 429/503 → store fingerprint, enqueue retry in Redis, parts_status: PENDING
   d. Alert is now visible on dashboard
5. Dashboard:
   a. API Server receives new alert from DB / Kafka notification
   b. Pushes update to all connected WebSocket clients
   c. Dashboard renders new alert card in real-time
```

### Flow B — Batch CSV Ingestion

```
1. Scheduler triggers CSV ingest job
2. CSV Ingestion Service:
   a. Reads service record file
   b. Parses and validates each row
   c. Deduplicates by [vehicle_id + service_date + service_type]
   d. Publishes records to Kafka topic: service.records
3. Rule Engine Consumer:
   a. Reads from service.records
   b. Updates vehicle's last_service_date and odometer_at_service in DB
   c. Re-evaluates overdue_service rule for vehicle
```

### Flow C — Replay (Idempotency Check)

```
1. Same telemetry events re-published to Kafka (replay scenario)
2. Ingestion API: dedup key hit in Redis → event dropped at boundary
   OR
3. Rule Engine: alert fingerprint hit in Redis → alert creation skipped
4. Result: Zero duplicate alerts created ✅
```

### Flow D — Parts API Unavailable

```
1. Alert Processor calls Spare-Parts API → 503 response
2. Alert saved with parts_status: PENDING
3. Alert visible on dashboard with "Parts: Pending" badge
4. Retry job (every 5 min) picks up PENDING alerts:
   - Calls API again with exponential backoff
   - On success → updates alert parts_status: AVAILABLE
   - On max retries exceeded → parts_status: UNAVAILABLE, alert stays visible
```

---

## 5. Rule Engine Design

### Stateful Window Management

Each Rule Engine worker maintains an in-memory buffer keyed by `vehicle_id`:

```python
vehicle_state = {
  "VH-001": {
    "temp_window": [103, 106, 109],   # last N temp readings
    "dtc_window":  {"P0300": [t1, t2, t3]},  # DTC → timestamps
    "last_service_km": 45000,
    "last_service_date": "2026-03-01"
  }
}
```

- **Overheating rule:** Maintain a rolling list of the last N temperature readings; trigger if all ≥ threshold.
- **Fault code rule:** Maintain a time-bucketed counter per DTC code; trigger if count ≥ M within window.
- **Overdue service rule:** Compare current odometer / date against last service from DB.

### Fingerprint Formula

```
fingerprint = SHA256(
    vehicle_id +
    rule_id +
    sorted(event_timestamps_in_trigger_window)
)
```

Stored in Redis with 30-day TTL.

---

## 6. Idempotency & Exactly-Once Guarantee

Two-layer protection:

| Layer | Where | Mechanism |
|-------|-------|-----------|
| **Ingestion dedup** | Ingestion API | Redis SET with `vehicle_id + reading_hash`, TTL 24h |
| **Alert dedup** | Rule Engine | Redis SET with alert fingerprint, TTL 30 days |

**On replay:**
- If a reading was already ingested → blocked at Layer 1
- If the alert was already created (different entry path) → blocked at Layer 2
- Either way: **zero duplicate alerts** ✅

---

## 7. External API Handling

### Spare-Parts API — Retry Strategy

```
Attempt 1  → immediate
Attempt 2  → +5s
Attempt 3  → +15s
Attempt 4  → +45s
Attempt 5  → +2min  → mark UNAVAILABLE if still failing
```

- **429 Rate Limit:** Honour `Retry-After` header; use Redis rate-limit counter to prevent exceeding quota proactively.
- **503 Unavailable:** Exponential backoff with jitter; alert stays visible with `PENDING` status.
- **All retries exhausted:** Alert marked `parts_status: UNAVAILABLE`; operations team notified via observability alert.

### Inbound Webhooks (Service-Status)

```
Webhook arrives → validate HMAC signature
    → write raw payload to webhook_events table (immediate, safe)
    → async worker processes event
        → on failure → move to Redis DLQ
        → DLQ worker retries with backoff
        → after max retries → page on-call (alertmanager)
```

---

## 8. Security Layer

### 8.1 Transport Security

| Channel | Mechanism |
|---------|-----------|
| Vehicle → API | HTTPS / TLS 1.3; mutual TLS (mTLS) for vehicle agents |
| Internal services | TLS-encrypted Kafka, service mesh or Docker network isolation |
| Dashboard → API | HTTPS; WebSocket over `wss://` |
| Webhook inbound | HTTPS + HMAC-SHA256 signature validation |

### 8.2 Authentication & Authorization

| Actor | Auth method |
|-------|-------------|
| Vehicle agents | API Key (rotated per-vehicle, stored in secrets manager) |
| Dashboard users | JWT Bearer (short-lived, refresh-token pattern) |
| Internal services | Service accounts with minimal-privilege API keys |
| Admin users | JWT + RBAC roles (`viewer`, `operator`, `admin`) |

### 8.3 Data Privacy & Protection

| Concern | Approach |
|---------|---------|
| **Vehicle location data** | Anonymized/pseudonymized at ingestion; raw GPS never stored, only depot-level location |
| **Driver identity** | Never stored in telemetry; only vehicle ID used |
| **Data at rest** | PostgreSQL Transparent Data Encryption (TDE) or filesystem-level encryption |
| **Data in transit** | TLS everywhere |
| **Secrets management** | Environment variables injected via Docker secrets / HashiCorp Vault (production) |
| **Audit logging** | All alert state changes and API access logged with actor + timestamp |
| **Data retention** | Raw telemetry: 90 days; aggregated summaries: 2 years; alerts: 5 years |

### 8.4 Network Security

```
Internet
   │
   ▼
[Load Balancer / Reverse Proxy — Nginx / Traefik]
   │  (terminates TLS, rate-limits, DDoS basic mitigation)
   ▼
[API Gateway — internal network only]
   ├── Ingestion API
   ├── Dashboard API
   └── Webhook Receiver
        │
        ▼ (Docker internal network — not exposed to internet)
   ├── Kafka
   ├── Redis
   ├── PostgreSQL
   └── Rule Engine / Alert Processor
```

---

## 9. Observability Stack

### 9.1 Logging

| Tool | Purpose |
|------|---------|
| **Structured JSON logs** | All services log in JSON; include `trace_id`, `vehicle_id`, `alert_id` |
| **Log aggregation** | Loki + Grafana (or ELK stack in production) |
| **Log levels** | `ERROR` for failures, `WARN` for retries/degraded states, `INFO` for normal events |

### 9.2 Metrics (Prometheus + Grafana)

| Metric | Description |
|--------|-------------|
| `telemetry_events_received_total` | Counter — total inbound events |
| `telemetry_events_deduplicated_total` | Counter — duplicates dropped |
| `rule_engine_alerts_generated_total` | Counter — alerts created, labelled by rule + severity |
| `parts_api_latency_seconds` | Histogram — spare-parts API response time |
| `parts_api_errors_total` | Counter — by status code (429, 503, etc.) |
| `kafka_consumer_lag` | Gauge — processing lag per topic/partition |
| `alert_resolution_time_seconds` | Histogram — time from alert creation to resolution |

### 9.3 Distributed Tracing

- **OpenTelemetry** SDK in all services
- Trace spans: `ingest → kafka → rule-engine → alert-processor → parts-api`
- Visualized in **Jaeger** or **Tempo**
- Every alert has a `trace_id` linking the full processing chain

### 9.4 Alerting (Alertmanager)

| Alert | Condition |
|-------|-----------|
| High Kafka consumer lag | `kafka_consumer_lag > 10000` for > 5 min |
| Parts API down | `parts_api_errors_total{code="503"}` rate > threshold |
| Redis unavailable | Health check failure |
| DB connection pool exhausted | `pg_pool_size > 90%` |

---

## 10. Failure Recovery

| Failure Scenario | Recovery Mechanism |
|-----------------|-------------------|
| **Ingestion service crash** | Kafka retains events (7-day retention); service restarts and continues from last committed offset |
| **Rule Engine crash** | Kafka consumer group offset not committed until alert fingerprint written to Redis; restarts from last safe offset |
| **PostgreSQL down** | Rule Engine buffers alert to Redis queue; Alert Processor retries DB write on recovery |
| **Redis down** | Idempotency falls back to DB-based fingerprint check (slower but safe); rate limiting temporarily disabled |
| **Kafka broker failure** | Kafka replication factor ≥ 2; automatic leader election; consumers reconnect |
| **Parts API down** | Alerts remain visible with `PENDING` status; retry job recovers on API restoration |
| **Webhook delivery failure** | DLQ in Redis; replayed after service recovery |
| **Container crash** | Docker Compose `restart: always`; Kubernetes pod auto-restart in production |

---

## 11. Scalability Plan (10M+ Daily Events)

### Baseline Math

```
10,000,000 events/day
= 416,666 events/hour
= ~116 events/second (average)
= ~580 events/second (5× peak factor)
```

### Scaling Strategy

| Layer | Strategy |
|-------|---------|
| **Ingestion API** | Horizontal scale behind load balancer; stateless, scale to N replicas |
| **Kafka** | Increase partitions per topic (e.g., 50 partitions for `telemetry.raw`); broker cluster |
| **Rule Engine** | One consumer per Kafka partition; scale consumer group to match partition count |
| **Alert Processor** | Horizontal scale; idempotency layer prevents race conditions |
| **TimescaleDB** | Automatic chunk compression; read replicas for dashboard queries; partition by time + vehicle_id |
| **Redis** | Redis Cluster for horizontal sharding of idempotency keys |
| **API Server** | Horizontal scale behind load balancer; WebSocket sticky sessions |

### Target SLAs (at 10M/day scale)

| Metric | Target |
|--------|--------|
| Telemetry ingestion latency (p99) | < 200ms |
| Alert generation latency (from reading to alert) | < 5 seconds |
| Dashboard data freshness | < 3 seconds |
| Parts API retry convergence | < 10 minutes |
| System uptime | 99.9% |

---

## 12. Deployment (Docker Topology)

```yaml
Services (docker-compose):
  ├── ingestion-api          # FastAPI — receives telemetry + CSV triggers
  ├── rule-engine            # Python consumer — evaluates health rules
  ├── alert-processor        # Python consumer — persists alerts, calls parts API
  ├── parts-api-mock         # FastAPI stub — simulates supplier API
  ├── webhook-receiver       # FastAPI — handles inbound service callbacks
  ├── scheduler              # APScheduler — CSV ingestion + retry jobs
  ├── dashboard-api          # FastAPI — REST + WebSocket for frontend
  ├── frontend               # React (or Nginx-served static build)
  ├── kafka                  # Apache Kafka (+ Zookeeper or KRaft mode)
  ├── redis                  # Redis 7
  ├── postgres               # PostgreSQL 15 + TimescaleDB extension
  └── grafana + prometheus   # Observability (optional in dev)
```

**Volumes:**
- `postgres-data` — persistent DB storage
- `kafka-data` — persistent message log
- `redis-data` — AOF persistence for idempotency keys

**Networks:**
- `public-net` — only `ingestion-api`, `dashboard-api`, `webhook-receiver`, `frontend`
- `internal-net` — all backend services; not exposed externally

---

## 13. Component Responsibility Summary

| Component | Technology | Primary Responsibility |
|-----------|-----------|----------------------|
| Ingestion API | FastAPI (Python) | Receive telemetry; validate; deduplicate; publish to Kafka |
| CSV Ingestion | Python script + APScheduler | Parse service records; publish to Kafka |
| Message Queue | Apache Kafka | Durable, ordered, partitioned event bus |
| Rule Engine | Python + Kafka consumer | Stateful rule evaluation; alert fingerprinting |
| Alert Processor | Python + Kafka consumer | Persist alerts; call parts API; manage retries |
| Cache | Redis | Idempotency keys; rate-limit counters; retry queues |
| Time-Series DB | PostgreSQL + TimescaleDB | Store telemetry readings; fast time-range queries |
| Operational DB | PostgreSQL | Vehicles, alerts, service records, parts requests |
| Parts API (Mock) | FastAPI (Python) | Simulate external supplier; controllable failure modes |
| Webhook Receiver | FastAPI (Python) | Inbound service-status callbacks; DLQ handling |
| Scheduler | APScheduler | Batch jobs; retry jobs |
| Dashboard API | FastAPI (Python) | REST endpoints + WebSocket for real-time push |
| Frontend | React | Fleet health dashboard; live alerts; filters |
| Observability | Prometheus + Grafana + OTel | Metrics, logs, distributed traces |

---

*HLD Version 1.0 — Automotive Fleet Health & Predictive Maintenance Engine*  
*See also: [Task.md](./Task.md) | [Task.txt](./Task.txt)*
