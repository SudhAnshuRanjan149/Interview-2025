# Task Planner — Automotive Fleet Health & Predictive Maintenance Engine

> **Version:** 1.0 | **Date:** 2026-09-26  
> **Companion Docs:** [HLD](./hld.md) | [LLD](./lld.md) | [Task](./Task.md)

---

## Legend

| Symbol | Meaning |
|--------|---------|
| `[ ]` | Not started |
| `[~]` | In progress |
| `[x]` | Done |
| `[!]` | Blocked |
| 🔴 | High priority |
| 🟡 | Medium priority |
| 🟢 | Low priority |
| **SP** | Story points (1=trivial → 8=complex) |

---

## Epics Overview

| # | Epic | Modules Covered | Status |
|---|------|----------------|--------|
| E1 | Infrastructure & DevOps Setup | Docker, Kafka, Redis, Postgres | `[x]` |
| E2 | Shared Libraries | DB session, Kafka client, Redis client, Enums | `[x]` |
| E3 | Fault-Tolerant Ingestion | Ingestion API, CSV Batch Ingestion | `[x]` |
| E4 | Maintenance Intelligence | Rule Engine | `[x]` |
| E5 | Alert Lifecycle | Alert Processor, Parts API Mock, Retry Manager | `[x]` |
| E6 | Webhook Handling | Webhook Receiver, DLQ Worker | `[~]` |
| E7 | Web Dashboard — Backend | Dashboard API (REST + WebSocket) | `[x]` |
| E8 | Web Dashboard — Frontend | React UI, Live Updates | `[x]` |
| E9 | Scheduler & Automation | Scheduler, Cron Jobs | `[x]` |
| E10 | Testing | Unit, Integration, Acceptance | `[~]` |
| E11 | Documentation & Architecture Note | Architecture write-up | `[ ]` |

---

## Phase Plan

```
Phase 1 (Foundation)  → E1, E2
Phase 2 (Core Engine) → E3, E4, E5
Phase 3 (Reliability) → E6, E9
Phase 4 (Dashboard)   → E7, E8
Phase 5 (Quality)     → E10, E11
```

---

---

## E1 — Infrastructure & DevOps Setup

> **Goal:** Spin up all infrastructure services locally via Docker Compose; ensure they are healthy and reachable.

---

### US-1.1 🔴 — As a developer, I want a working Docker Compose environment so that all services can run locally with one command.

**SP: 5** | **Priority: Critical** | **Dependencies: None**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T1.1.1 | Create root `docker-compose.yml` with all service stubs | `[x]` | | Start with infra only |
| T1.1.2 | Configure PostgreSQL 15 + TimescaleDB service + volume | `[x]` | | Image: `timescale/timescaledb:latest-pg15` |
| T1.1.3 | Configure Redis 7 service + AOF persistence volume | `[x]` | | `--appendonly yes` |
| T1.1.4 | Configure Kafka (KRaft mode) service + volume | `[x]` | | No Zookeeper; use KRaft |
| T1.1.5 | Define `public-net` and `internal-net` Docker networks | `[x]` | | Only API services on public-net |
| T1.1.6 | Add health checks for Postgres, Redis, Kafka | `[x]` | | `depends_on: condition: service_healthy` |
| T1.1.7 | Create `.env.example` with all required variables | `[x]` | | See LLD §11 for full list |
| T1.1.8 | Create `Makefile` with `make up`, `make down`, `make logs`, `make test` | `[x]` | | |
| T1.1.9 | Verify `docker compose up` brings all infra healthy | `[x]` | | ✅ All 11 containers running |

---

### US-1.2 🔴 — As a developer, I want the database schema auto-applied on startup so that I don't configure it manually each time.

**SP: 3** | **Priority: High** | **Dependencies: T1.1.2**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T1.2.1 | Set up Alembic in `shared/db/migrations/` | `[x]` | | `alembic init` |
| T1.2.2 | Write migration `001_initial_schema.py` — all tables from LLD §3 | `[x]` | | All ENUMs + tables + indexes |
| T1.2.3 | Write migration `002_add_parts_status.py` — parts status enum | `[x]` | | Merged into 001 |
| T1.2.4 | Add `alembic upgrade head` to DB init step in compose | `[x]` | | `db-migrate` one-shot container |
| T1.2.5 | Verify TimescaleDB hypertable for `telemetry_readings` created | `[x]` | | Created in migration |

---

### US-1.3 🟡 — As a developer, I want Kafka topics pre-created on startup with correct partition counts.

**SP: 2** | **Priority: Medium** | **Dependencies: T1.1.4**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T1.3.1 | Write Kafka topic init script (shell or Python) | `[x]` | | Creates `telemetry.raw`, `service.records`, `alerts.notifications` |
| T1.3.2 | Configure partition counts per LLD §4 (20/5/10) | `[x]` | | |
| T1.3.3 | Add topic init as a one-shot Docker init container | `[x]` | | `kafka-init` container in compose |
| T1.3.4 | Test topic creation with `kafka-topics.sh --list` | `[x]` | | ✅ Verified |

---

---

## E2 — Shared Libraries

> **Goal:** Build reusable Python utilities consumed by all services.

---

### US-2.1 🔴 — As a backend developer, I want a shared async DB session factory so that all services connect to Postgres consistently.

**SP: 3** | **Priority: High** | **Dependencies: T1.2.5**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T2.1.1 | Create `shared/db/session.py` with SQLAlchemy async engine | `[x]` | | `create_async_engine` + `AsyncSession` factory |
| T2.1.2 | Create `get_db()` dependency for FastAPI services | `[x]` | | Yields session, closes on exit |
| T2.1.3 | Create `shared/models/enums.py` with all shared ENUMs | `[x]` | | `Severity`, `AlertStatus`, `PartsStatus`, `ServiceType` |
| T2.1.4 | Write unit tests for session factory | `[ ]` | | Mock engine |

---

### US-2.2 🔴 — As a backend developer, I want shared Kafka producer and consumer wrappers so that all services publish/consume consistently.

**SP: 3** | **Priority: High** | **Dependencies: T1.3.4**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T2.2.1 | Create `shared/kafka/producer.py` — async Kafka producer wrapper | `[x]` | | Wraps `aiokafka.AIOKafkaProducer` |
| T2.2.2 | Add serialization: JSON → bytes, with `schema_version` field | `[x]` | | |
| T2.2.3 | Create `shared/kafka/consumer.py` — base consumer with offset commit | `[x]` | | Commit only after successful processing |
| T2.2.4 | Add error handler: on exception → log + skip + commit (no infinite loop) | `[x]` | | |
| T2.2.5 | Write unit tests with mocked Kafka | `[ ]` | | |

---

### US-2.3 🟡 — As a backend developer, I want a shared Redis client pool so that all services share the same connection configuration.

**SP: 2** | **Priority: Medium** | **Dependencies: T1.1.3**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T2.3.1 | Create `shared/redis_client/client.py` with connection pool | `[x]` | | `redis.asyncio.from_url(REDIS_URL)` |
| T2.3.2 | Add `get_redis()` FastAPI dependency | `[x]` | | |
| T2.3.3 | Write test for connection pool behaviour | `[ ]` | | |

---

---

## E3 — Fault-Tolerant Ingestion

> **Goal:** Accept streaming telemetry and batch CSVs; validate, deduplicate, and publish to Kafka.

---

### US-3.1 🔴 — As a vehicle agent, I want to POST telemetry readings so that they are ingested into the pipeline.

**SP: 5** | **Priority: Critical** | **Dependencies: E2**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T3.1.1 | Scaffold `services/ingestion_api/` with FastAPI app | `[x]` | | `main.py` + `app/` structure per LLD §2.1 |
| T3.1.2 | Implement `TelemetryEvent` Pydantic model with `extra="ignore"` | `[x]` | | Schema-change tolerance |
| T3.1.3 | Implement `POST /telemetry` route | `[x]` | | Returns 202 on success |
| T3.1.4 | Implement `POST /telemetry/batch` route (max 100 events) | `[x]` | | Returns 207 Multi-Status |
| T3.1.5 | Add API key authentication dependency | `[x]` | | Check `X-API-Key` header against `API_KEY_HASH` |
| T3.1.6 | Write unit tests for routes (happy path + auth failure) | `[ ]` | | |
| T3.1.7 | Add `GET /health` endpoint | `[x]` | | Returns Kafka + Redis connectivity status |

---

### US-3.2 🔴 — As the system, I want duplicate telemetry events silently dropped so that downstream processing is not polluted.

**SP: 3** | **Priority: Critical** | **Dependencies: T3.1.3, T2.3.1**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T3.2.1 | Implement `Deduplicator` class in `services/deduplicator.py` | `[x]` | | Per LLD §2.1 — SHA256 hash of event fields |
| T3.2.2 | Integrate deduplicator into `POST /telemetry` before publishing | `[x]` | | Return 200 (not 202) on duplicate |
| T3.2.3 | Configure Redis key TTL to 24h | `[x]` | | Key pattern: `dedup:telemetry:{vid}:{hash}` |
| T3.2.4 | Write unit tests: first send → 202; same send again → 200 | `[ ]` | | |
| T3.2.5 | Write unit test: different timestamp same readings → new event accepted | `[ ]` | | |

---

### US-3.3 🟡 — As the system, I want out-of-order and future-timestamped readings handled gracefully.

**SP: 2** | **Priority: Medium** | **Dependencies: T3.1.3**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T3.3.1 | Reject events with `timestamp` > 60s in the future → 400 | `[x]` | | ✅ Verified working |
| T3.3.2 | Accept late events (> 24h old) but tag `late_arrival: true` | `[x]` | | |
| T3.3.3 | Write unit tests for both cases | `[ ]` | | |

---

### US-3.4 🟡 — As an operator, I want batch CSV service records ingested on a schedule so that historical data feeds the rule engine.

**SP: 5** | **Priority: Medium** | **Dependencies: E2**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T3.4.1 | Scaffold `services/csv_ingestion/` with CLI entrypoint | `[x]` | | Runnable as `python main.py --file path/to/file.csv` |
| T3.4.2 | Implement `CSVParser` class — parse, type-cast, validate per LLD schema | `[x]` | | Collect all row errors without crashing |
| T3.4.3 | Implement header validation — fail fast on missing required columns | `[x]` | | |
| T3.4.4 | Implement service record deduplication (Redis key per LLD §5) | `[x]` | | |
| T3.4.5 | Publish valid rows to Kafka `service.records` topic | `[x]` | | |
| T3.4.6 | Log parse errors with line numbers; continue processing remaining rows | `[x]` | | |
| T3.4.7 | Add sample `data/service_records.csv` per LLD §14 | `[x]` | | |
| T3.4.8 | Write unit tests: valid CSV, missing columns, duplicate rows, bad dates | `[ ]` | | |

---

---

## E4 — Maintenance Intelligence (Rule Engine)

> **Goal:** Stateful consumer that evaluates configurable health rules and emits de-duplicated alert triggers.

---

### US-4.1 🔴 — As the system, I want a configurable rule engine that loads rules from YAML so that thresholds can be changed without code changes.

**SP: 3** | **Priority: Critical** | **Dependencies: E2**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T4.1.1 | Create `config/rules.yaml` with all three rules per LLD §10 | `[x]` | | overheating, fault_code, overdue_service |
| T4.1.2 | Implement `rules_loader.py` — loads and validates YAML on startup | `[x]` | | Fail fast on invalid config |
| T4.1.3 | Implement `BaseRule` abstract class with `evaluate()` method | `[x]` | | |
| T4.1.4 | Write unit test: invalid YAML → startup fails with clear error | `[ ]` | | |

---

### US-4.2 🔴 — As the system, I want a sliding window state manager per vehicle so that consecutive readings can be tracked.

**SP: 5** | **Priority: Critical** | **Dependencies: T4.1.3**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T4.2.1 | Implement `VehicleWindow` dataclass with bounded deque per LLD §2.2 | `[x]` | | `deque(maxlen=10)` for temp readings |
| T4.2.2 | Implement `WindowManager` class with `update()` and `get()` | `[x]` | | In-memory dict keyed by `vehicle_id` |
| T4.2.3 | Implement out-of-order insertion using `bisect.insort` on timestamp | `[x]` | | Readings sorted by event time, not arrival time |
| T4.2.4 | Implement stale window eviction (no activity for 1h) | `[x]` | | Prevents unbounded memory growth |
| T4.2.5 | Write unit tests: normal insertion, out-of-order insertion, eviction | `[ ]` | | |

---

### US-4.3 🔴 — As the system, I want an overheating rule that triggers after N consecutive readings above threshold.

**SP: 3** | **Priority: Critical** | **Dependencies: T4.2.2**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T4.3.1 | Implement `OverheatingRule(BaseRule)` per LLD §2.2 | `[x]` | | Reads `threshold` and `consecutive` from config |
| T4.3.2 | Return `None` when fewer than N readings available | `[x]` | | Avoid false positives on startup |
| T4.3.3 | Return `RuleTrigger` with full evidence list when rule fires | `[x]` | | Evidence = list of `{ts, engine_temp_c}` |
| T4.3.4 | Write unit tests: exactly N readings → triggers; N-1 → does not | `[ ]` | | |
| T4.3.5 | Write unit test: one reading below threshold resets window | `[ ]` | | |

---

### US-4.4 🔴 — As the system, I want a repeated fault-code rule that triggers when the same DTC appears M times within a time window.

**SP: 3** | **Priority: Critical** | **Dependencies: T4.2.2**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T4.4.1 | Implement `FaultCodeRule(BaseRule)` per LLD §2.2 | `[x]` | | Reads `window_minutes` and `min_occurrences` |
| T4.4.2 | Filter DTC timestamps to within the configured window | `[x]` | | `cutoff = now - timedelta(minutes=window_minutes)` |
| T4.4.3 | Return one `RuleTrigger` per qualifying DTC code | `[x]` | | Multiple codes → multiple triggers |
| T4.4.4 | Write unit tests: same DTC M times → triggers; M-1 → does not | `[ ]` | | |
| T4.4.5 | Write unit test: old DTCs outside window are excluded | `[ ]` | | |

---

### US-4.5 🟡 — As the system, I want an overdue-service rule that triggers when a vehicle is past its service interval.

**SP: 3** | **Priority: Medium** | **Dependencies: T4.2.2**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T4.5.1 | Implement `OverdueServiceRule(BaseRule)` | `[x]` | | Reads `odometer_interval_km` and `time_interval_days` |
| T4.5.2 | Compare current odometer vs `last_service_km + interval` | `[x]` | | |
| T4.5.3 | Compare current date vs `last_service_date + interval_days` | `[x]` | | |
| T4.5.4 | Trigger if either condition exceeded | `[x]` | | |
| T4.5.5 | Handle `None` last_service data — do not trigger if unknown | `[x]` | | |
| T4.5.6 | Update `last_service_km` and `last_service_date` from `service.records` Kafka topic | `[x]` | | Rule Engine also consumes service.records |
| T4.5.7 | Write unit tests for both time and odometer conditions | `[ ]` | | |

---

### US-4.6 🔴 — As the system, I want alert fingerprinting so that the same event window never creates duplicate alerts.

**SP: 3** | **Priority: Critical** | **Dependencies: T4.1.3, T2.3.1**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T4.6.1 | Implement `Fingerprinter.compute(trigger)` per LLD §6 | `[x]` | | SHA256 of vehicle_id + rule_name + sorted evidence |
| T4.6.2 | Implement `IdempotencyService.is_seen(fingerprint)` → Redis | `[x]` | | Key: `alert:fingerprint:{sha}`, TTL 30 days |
| T4.6.3 | Implement `IdempotencyService.mark_seen(fingerprint)` | `[x]` | | Redis SETNX |
| T4.6.4 | Integrate into Kafka consumer loop: check before publishing trigger | `[x]` | | |
| T4.6.5 | Commit Kafka offset only after fingerprint written to Redis | `[x]` | | Prevents re-processing on crash |
| T4.6.6 | Write unit test: same trigger twice → only one Kafka publish | `[ ]` | | |

---

### US-4.7 🔴 — As the system, I want the Rule Engine to consume from Kafka and process events in vehicle_id order.

**SP: 3** | **Priority: Critical** | **Dependencies: T4.3.1, T4.4.1, T4.5.1, T4.6.4**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T4.7.1 | Implement Kafka consumer loop in `consumer/kafka_consumer.py` | `[x]` | | Consumes `telemetry.raw` and `service.records` |
| T4.7.2 | Implement `dispatcher.py` — routes event type to correct handler | `[x]` | | |
| T4.7.3 | Implement `RuleEvaluator.evaluate_all(window)` — runs all rules | `[x]` | | |
| T4.7.4 | Wire together: consumer → window update → evaluate → fingerprint → publish | `[x]` | | ✅ E2E verified |
| T4.7.5 | Test consumer with mocked Kafka messages end-to-end | `[ ]` | | |

---

---

## E5 — Alert Lifecycle

> **Goal:** Persist alerts, check spare-parts availability, manage retry state.

---

### US-5.1 🔴 — As the system, I want triggered alerts persisted to the database immediately.

**SP: 3** | **Priority: Critical** | **Dependencies: T1.2.5, E2**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T5.1.1 | Scaffold `services/alert_processor/` service | `[x]` | | |
| T5.1.2 | Implement `MaintenanceAlert` SQLAlchemy ORM model | `[x]` | | Maps to `maintenance_alerts` table |
| T5.1.3 | Implement `AlertRepo.create(trigger)` — insert into DB | `[x]` | | Include `fingerprint` for DB-level dedup guard |
| T5.1.4 | Handle `UniqueViolation` on fingerprint — return existing alert_id | `[x]` | | DB as final idempotency safety net |
| T5.1.5 | Implement Kafka consumer for `alerts.notifications` topic | `[x]` | | |
| T5.1.6 | Implement `AlertHandler.handle(trigger)` orchestration method | `[x]` | | Per LLD §2.3 |
| T5.1.7 | Write unit tests for `AlertRepo.create` with duplicate handling | `[ ]` | | |

---

### US-5.2 🔴 — As the system, I want the spare-parts API checked before confirming a service slot.

**SP: 5** | **Priority: Critical** | **Dependencies: T5.1.6, US-5.4**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T5.2.1 | Implement `PartsClient.check_availability(part_codes)` per LLD §2.3 | `[x]` | | Async httpx client |
| T5.2.2 | Implement retry loop: 5 attempts with exponential backoff | `[x]` | | 5s, 10s, 20s, 40s, 80s |
| T5.2.3 | Handle `429` — read `Retry-After` header; sleep accordingly | `[x]` | | |
| T5.2.4 | Handle `503` — exponential backoff | `[x]` | | |
| T5.2.5 | On max retries → return `PartsResult(success=False)` | `[x]` | | Alert stays PENDING |
| T5.2.6 | Implement Redis rate-limit counter before each outbound call | `[x]` | | Key: `ratelimit:parts_api:{minute_bucket}` |
| T5.2.7 | Write unit tests for each response scenario (200, 429, 503, timeout) | `[ ]` | | Use `respx` to mock httpx |

---

### US-5.3 🟡 — As the system, I want failed parts-API requests retried automatically until resolved.

**SP: 3** | **Priority: Medium** | **Dependencies: T5.2.5**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T5.3.1 | Implement `RetryManager.enqueue(alert_id, attempt)` with Redis ZSet | `[x]` | | Score = next_retry_unix_timestamp |
| T5.3.2 | Implement `RetryManager.dequeue_due()` — fetch items due now | `[x]` | | `ZRANGEBYSCORE 0 now` |
| T5.3.3 | After max attempts (5) → update `parts_status: UNAVAILABLE` | `[x]` | | Alert remains visible |
| T5.3.4 | Write unit tests for enqueue, dequeue, max-attempts path | `[ ]` | | |

---

### US-5.4 🔴 — As a developer, I want a mocked spare-parts API with controllable failure modes for testing.

**SP: 3** | **Priority: High** | **Dependencies: T1.1.1**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T5.4.1 | Scaffold `services/parts_api_mock/` FastAPI app | `[x]` | | |
| T5.4.2 | Implement `GET /parts/available?codes=P001,P002` | `[x]` | | Returns availability + lead time |
| T5.4.3 | Implement mode switching via `PARTS_API_MODE` env var | `[x]` | | `normal`, `rate_limited`, `unavailable` |
| T5.4.4 | Implement `POST /mock/mode` control endpoint | `[x]` | | Allows runtime mode change in tests |
| T5.4.5 | Add `data/parts_catalog.json` sample parts reference | `[ ]` | | |
| T5.4.6 | Write unit tests for each response mode | `[ ]` | | |

---

---

## E6 — Webhook Handling

> **Goal:** Receive inbound service-status callbacks reliably with DLQ recovery.

---

### US-6.1 🟡 — As a service centre, I want to POST service-status updates so that alerts are automatically resolved.

**SP: 5** | **Priority: Medium** | **Dependencies: T1.2.5, E2**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T6.1.1 | Scaffold `services/webhook_receiver/` FastAPI app | `[x]` | | |
| T6.1.2 | Implement `POST /webhooks/service-status` route | `[~]` | | Endpoint exists as `/webhooks/service-events` |
| T6.1.3 | Implement HMAC-SHA256 signature validator per LLD §2.6 | `[x]` | | Reject if signature mismatch → 401 |
| T6.1.4 | Implement `ServiceStatusWebhook` Pydantic model | `[ ]` | | |
| T6.1.5 | Write raw payload to `webhook_events` table immediately on receipt | `[ ]` | | Before processing — safe write-first |
| T6.1.6 | Return `202 Accepted` after write; process asynchronously | `[x]` | | |
| T6.1.7 | Write unit tests: valid signature → 202; invalid → 401 | `[ ]` | | |

---

### US-6.2 🟡 — As the system, I want failed webhook processing retried via a Dead-Letter Queue.

**SP: 3** | **Priority: Medium** | **Dependencies: T6.1.5**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T6.2.1 | Implement async `EventProcessor` that processes `webhook_events` rows | `[ ]` | | Updates `maintenance_alerts.status` |
| T6.2.2 | On processing error → increment `attempt_count`; schedule retry | `[ ]` | | Retry delays per LLD §2.6 |
| T6.2.3 | After 5 failed attempts → move to Redis `dlq:webhooks` list | `[ ]` | | |
| T6.2.4 | Implement `DLQWorker` that logs DLQ items and triggers alertmanager | `[ ]` | | |
| T6.2.5 | Write unit tests for retry escalation path | `[ ]` | | |

---

---

## E7 — Web Dashboard — Backend

> **Goal:** REST + WebSocket API serving all dashboard data with live-update support.

---

### US-7.1 🔴 — As a fleet manager, I want to see a real-time fleet health summary via the API.

**SP: 5** | **Priority: High** | **Dependencies: T1.2.5, E2**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T7.1.1 | Scaffold `services/dashboard_api/` FastAPI app | `[x]` | | |
| T7.1.2 | Implement `FleetService.get_health_summary()` business logic | `[x]` | | Aggregates from `maintenance_alerts` + `vehicles` |
| T7.1.3 | Implement `GET /fleet/health` route with Redis cache (TTL 10s) | `[x]` | | |
| T7.1.4 | Implement `GET /fleet/summary?depot_id=` route | `[x]` | | Depot-filtered summary |
| T7.1.5 | Implement `FleetRepo.get_high_risk_vehicles()` DB query | `[x]` | | Vehicles with open HIGH/CRITICAL alerts |
| T7.1.6 | Write unit tests for fleet health endpoint | `[ ]` | | |

---

### US-7.2 🔴 — As a fleet manager, I want to query and filter active alerts.

**SP: 5** | **Priority: High** | **Dependencies: T7.1.1**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T7.2.1 | Implement `GET /alerts` with filtering (depot, vehicle, severity, status) | `[x]` | | |
| T7.2.2 | Add pagination: `page` and `page_size` query params | `[x]` | | Default page_size=20 |
| T7.2.3 | Implement `GET /alerts/{alert_id}` with full evidence JSON | `[x]` | | |
| T7.2.4 | Implement `PATCH /alerts/{alert_id}` — status update (ACK / RESOLVED) | `[x]` | | |
| T7.2.5 | Implement `GET /vehicles/{vehicle_id}/history` | `[x]` | | Last 100 readings + service records |
| T7.2.6 | Implement `GET /depots` | `[x]` | | |
| T7.2.7 | Add JWT authentication dependency to all routes | `[x]` | | Dev token bypass included |
| T7.2.8 | Write unit tests for each endpoint | `[ ]` | | |

---

### US-7.3 🔴 — As a dashboard user, I want live alert updates pushed to me without refreshing.

**SP: 5** | **Priority: High** | **Dependencies: T7.1.1, E5**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T7.3.1 | Implement `WebSocketManager` with connection registry per LLD §2.7 | `[x]` | | |
| T7.3.2 | Implement `WS /ws/live-updates` endpoint with JWT auth | `[x]` | | |
| T7.3.3 | Implement subscribe filter: client sends `{"type":"SUBSCRIBE","filter":{...}}` | `[x]` | | |
| T7.3.4 | Implement heartbeat: server sends `PING` every 30s | `[x]` | | Drop client on no PONG after 60s |
| T7.3.5 | Integrate: Alert Processor publishes to `alerts.notifications` → Dashboard API consumer → WS broadcast | `[x]` | | |
| T7.3.6 | Handle graceful disconnect — remove from connection registry | `[x]` | | |
| T7.3.7 | Write integration test: send event → alert created → WS message received | `[ ]` | | |

---

---

## E8 — Web Dashboard — Frontend

> **Goal:** Build a React dashboard with real-time fleet health visualization.

---

### US-8.1 🔴 — As a fleet manager, I want to see a fleet health overview on the dashboard.

**SP: 5** | **Priority: High** | **Dependencies: US-7.1**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T8.1.1 | Scaffold React app in `frontend/` with Vite | `[x]` | | `npm create vite@latest` |
| T8.1.2 | Set up API base URL via `VITE_API_BASE_URL` env var | `[x]` | | |
| T8.1.3 | Implement `fleetApi.js` — REST client for all dashboard API calls | `[x]` | | |
| T8.1.4 | Implement `FleetOverview` component — summary cards | `[x]` | | Total / Healthy / At-Risk / Critical counts |
| T8.1.5 | Implement `StatusDot` component (Green / Yellow / Red) | `[x]` | | Integrated into live indicator |
| T8.1.6 | Implement `useFleetHealth` custom hook — fetches + auto-refreshes | `[x]` | | 30s interval in App.jsx |
| T8.1.7 | Style with modern CSS — dark mode, gradient cards | `[x]` | | Dark theme with glassmorphism |

---

### US-8.2 🔴 — As a fleet manager, I want to see a live list of active alerts with severity badges.

**SP: 5** | **Priority: High** | **Dependencies: US-7.2, T8.1.1**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T8.2.1 | Implement `AlertsList` component — scrollable alert list | `[x]` | | |
| T8.2.2 | Implement `AlertCard` component — severity badge, vehicle ID, rule, time | `[x]` | | |
| T8.2.3 | Implement `SeverityBadge` component (HIGH=red, MEDIUM=amber, LOW=green) | `[x]` | | CSS badge classes |
| T8.2.4 | Add click-to-expand: show full evidence for an alert | `[x]` | | JSON evidence panel |
| T8.2.5 | Add ACK / Resolve button on alert card (calls `PATCH /alerts/:id`) | `[x]` | | |
| T8.2.6 | Implement `useAlerts` hook with pagination support | `[x]` | | Prev/Next pagination |

---

### US-8.3 🔴 — As a fleet manager, I want live updates without refreshing the page.

**SP: 3** | **Priority: High** | **Dependencies: US-7.3, T8.2.1**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T8.3.1 | Implement `wsClient.js` — WebSocket connection with auto-reconnect (3s) | `[x]` | | In `useLiveUpdates.js` |
| T8.3.2 | Implement `useLiveUpdates` hook per LLD §2.9 | `[x]` | | |
| T8.3.3 | On `ALERT_CREATED` message → prepend to alerts list with animation | `[x]` | | `alert-new` CSS slide-in animation |
| T8.3.4 | On `FLEET_HEALTH_CHANGED` → update summary cards | `[x]` | | Health re-fetched on new alert |
| T8.3.5 | Show "Live" indicator dot in header (green pulse when WS connected) | `[x]` | | Animated pulse in header |

---

### US-8.4 🟡 — As a fleet manager, I want to filter alerts by depot, vehicle, and severity.

**SP: 3** | **Priority: Medium** | **Dependencies: T8.2.1**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T8.4.1 | Implement `FilterBar` component with three dropdowns | `[x]` | | Depot / Severity / Status / Rule |
| T8.4.2 | Fetch depots from `GET /depots` to populate dropdown | `[x]` | | |
| T8.4.3 | Pass filter state to `useAlerts` hook → re-fetches with filter params | `[x]` | | |
| T8.4.4 | Persist filter state in URL query params for shareable links | `[ ]` | | |

---

### US-8.5 🟡 — As a fleet manager, I want to see a vehicle's telemetry history and service records.

**SP: 3** | **Priority: Medium** | **Dependencies: US-7.2**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T8.5.1 | Implement `VehiclePanel` component — slide-in drawer on vehicle click | `[x]` | | |
| T8.5.2 | Show last 100 telemetry readings as a sparkline/table | `[x]` | | Table view with last 5 |
| T8.5.3 | Show service records timeline | `[x]` | | |
| T8.5.4 | Show parts status for active alerts | `[ ]` | | |

---

---

## E9 — Scheduler & Automation

> **Goal:** Automate CSV ingestion and parts-retry jobs on a schedule.

---

### US-9.1 🟡 — As an operator, I want CSV files automatically ingested every 5 minutes without manual intervention.

**SP: 3** | **Priority: Medium** | **Dependencies: E3**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T9.1.1 | Scaffold `services/scheduler/` with APScheduler | `[x]` | | |
| T9.1.2 | Implement `csv_ingest_job.py` — discovers new CSV files in `/data/incoming/` | `[x]` | | Tracks processed files to avoid re-ingestion |
| T9.1.3 | Configure job interval: every 5 min via `CSV_INGEST_INTERVAL_MINUTES` env | `[x]` | | |
| T9.1.4 | Add `docker compose` volume mount: `./data:/data` | `[x]` | | |
| T9.1.5 | Write unit test for file discovery and dedup | `[ ]` | | |

---

### US-9.2 🟡 — As the system, I want parts retry job to run every 5 minutes to recover PENDING alerts.

**SP: 2** | **Priority: Medium** | **Dependencies: US-5.3**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T9.2.1 | Implement `parts_retry_job.py` — calls `RetryManager.dequeue_due()` | `[x]` | | |
| T9.2.2 | For each due item: re-call `PartsClient.check_availability()` | `[x]` | | |
| T9.2.3 | On success → update `alert.parts_status` to AVAILABLE | `[~]` | | DB update pending |
| T9.2.4 | On failure → re-enqueue with incremented attempt count | `[x]` | | |
| T9.2.5 | Write unit test for retry job with mocked client | `[ ]` | | |

---

---

## E10 — Testing

> **Goal:** Comprehensive test coverage for unit, integration, and acceptance scenarios.

---

### US-10.1 🔴 — As a developer, I want unit tests for all rule implementations.

**SP: 5** | **Priority: Critical** | **Dependencies: E4**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T10.1.1 | Unit tests for `OverheatingRule` — boundary conditions (N-1, N, N+1) | `[ ]` | | |
| T10.1.2 | Unit tests for `FaultCodeRule` — time window boundary | `[ ]` | | |
| T10.1.3 | Unit tests for `OverdueServiceRule` — both odometer and time conditions | `[ ]` | | |
| T10.1.4 | Unit tests for `Fingerprinter` — same input → same hash always | `[ ]` | | |
| T10.1.5 | Unit tests for `WindowManager` — out-of-order, eviction | `[ ]` | | |
| T10.1.6 | Unit tests for `Deduplicator` — first vs second vs different event | `[ ]` | | |
| T10.1.7 | Unit tests for `CSVParser` — all error cases | `[ ]` | | |
| T10.1.8 | Unit tests for `PartsClient` — all HTTP response scenarios | `[ ]` | | |
| T10.1.9 | Unit tests for `RetryManager` — enqueue, dequeue, max retries | `[ ]` | | |
| T10.1.10 | Unit tests for `HMACValidator` — valid + tampered payloads | `[ ]` | | |

---

### US-10.2 🟡 — As a developer, I want integration tests that verify end-to-end event flow through Kafka.

**SP: 5** | **Priority: Medium** | **Dependencies: E4, E5**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T10.2.1 | Set up `docker-compose.test.yml` with isolated test containers | `[ ]` | | Separate DB + Kafka for tests |
| T10.2.2 | Integration test: ingest event → verify in Kafka `telemetry.raw` | `[ ]` | | |
| T10.2.3 | Integration test: Kafka event → rule engine → alert in DB | `[ ]` | | |
| T10.2.4 | Integration test: idempotency — two identical events → one alert | `[ ]` | | |
| T10.2.5 | Integration test: alert → `PENDING` → parts retry → `AVAILABLE` | `[ ]` | | |

---

### US-10.3 🔴 — As a reviewer, I want full acceptance scenario tests passing per the task requirements.

**SP: 5** | **Priority: Critical** | **Dependencies: All epics E1–E9**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T10.3.1 | Write `test_acceptance_overheating.py` — three readings create one HIGH alert | `[x]` | | ✅ E2E verified live |
| T10.3.2 | Write acceptance test — replay same events → still one alert (idempotency) | `[x]` | | Written in `test_acceptance_scenario.py` |
| T10.3.3 | Write acceptance test — parts API unavailable → alert PENDING and visible | `[x]` | | Written in `test_acceptance_scenario.py` |
| T10.3.4 | Set up `conftest.py` with Docker fixture (starts full compose stack) | `[ ]` | | `pytest-docker` or `testcontainers` |
| T10.3.5 | Ensure all 3 acceptance tests pass on clean `docker compose up` | `[~]` | | E2E verified manually; automated run pending |
| T10.3.6 | Add `make test-acceptance` target to Makefile | `[x]` | | |

---

---

## E11 — Documentation & Architecture Note

> **Goal:** Final write-up covering privacy, observability, failure recovery, and scaling.

---

### US-11.1 🟢 — As a reviewer, I want a short architecture note covering all required topics from the task.

**SP: 3** | **Priority: Low (last step)** | **Dependencies: All**

| # | Task | Status | Owner | Notes |
|---|------|--------|-------|-------|
| T11.1.1 | Write `docs/architecture_note.md` — vehicle/location data protection | `[ ]` | | Privacy: pseudonymization, encryption, RBAC |
| T11.1.2 | Document observability strategy (metrics, logs, tracing) | `[ ]` | | Reference Prometheus + Grafana + OTel |
| T11.1.3 | Document failure recovery for each component | `[ ]` | | Reference failure table from HLD |
| T11.1.4 | Document scaling approach to 10M+ daily events | `[ ]` | | Kafka partition math, horizontal scaling |
| T11.1.5 | Update `README.md` — setup, run, test instructions | `[ ]` | | `make up`, `make test-acceptance`, dashboard URL |
| T11.1.6 | Final review: verify all submission checklist items in `Task.md` | `[ ]` | | Working code, Docker, sample data, dashboard, tests, arch note |

---

---

## 📊 Progress Tracker

> Update this table as tasks are completed.

| Epic | Total Tasks | Done | In Progress | Blocked | % Complete |
|------|------------|------|------------|---------|-----------|
| E1 — Infrastructure | 14 | 14 | 0 | 0 | 100% |
| E2 — Shared Libraries | 12 | 9 | 0 | 0 | 75% |
| E3 — Ingestion | 18 | 14 | 0 | 0 | 78% |
| E4 — Rule Engine | 28 | 22 | 0 | 0 | 79% |
| E5 — Alert Lifecycle | 20 | 16 | 0 | 0 | 80% |
| E6 — Webhooks | 10 | 3 | 2 | 0 | 30% |
| E7 — Dashboard API | 20 | 18 | 0 | 0 | 90% |
| E8 — Frontend | 18 | 16 | 0 | 0 | 89% |
| E9 — Scheduler | 10 | 8 | 1 | 0 | 80% |
| E10 — Testing | 20 | 5 | 1 | 0 | 25% |
| E11 — Documentation | 6 | 0 | 0 | 0 | 0% |
| **TOTAL** | **176** | **125** | **4** | **0** | **71%** |

---

## 🔗 Dependency Graph

```
E1 (Infra)
 └─► E2 (Shared Libs)
      ├─► E3 (Ingestion)
      │    └─► E4 (Rule Engine)
      │         └─► E5 (Alert Processor)
      │              ├─► E7 (Dashboard API)
      │              │    └─► E8 (Frontend)
      │              └─► E9 (Scheduler)
      ├─► E6 (Webhooks)
      └─► E10 (Testing) ← depends on E3–E9 complete
           └─► E11 (Docs) ← final step
```

---

*Task Planner v1.0 — Automotive Fleet Health & Predictive Maintenance Engine*  
*See also: [HLD](./hld.md) | [LLD](./lld.md) | [Task](./Task.md)*
