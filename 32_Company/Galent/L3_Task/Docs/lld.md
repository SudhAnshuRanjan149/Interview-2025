# Low Level Design (LLD)
## Automotive Fleet Health & Predictive Maintenance Engine

> **Task Ref:** Task 2 — Fleet Health & Predictive Maintenance  
> **Version:** 1.0 | **Date:** 2026-09-26  
> **Companion Docs:** [HLD](./hld.md) | [Task](./Task.md)

---

## Table of Contents

1. [Complete Project Folder Structure](#1-complete-project-folder-structure)
2. [Service-by-Service Module Design](#2-service-by-service-module-design)
   - 2.1 [Ingestion API](#21-ingestion-api)
   - 2.2 [Rule Engine](#22-rule-engine)
   - 2.3 [Alert Processor](#23-alert-processor)
   - 2.4 [CSV Batch Ingestion](#24-csv-batch-ingestion)
   - 2.5 [Spare-Parts API Mock](#25-spare-parts-api-mock)
   - 2.6 [Webhook Receiver](#26-webhook-receiver)
   - 2.7 [Dashboard API](#27-dashboard-api)
   - 2.8 [Scheduler](#28-scheduler)
   - 2.9 [Frontend (React)](#29-frontend-react)
3. [Database Schema (Full DDL)](#3-database-schema-full-ddl)
4. [Kafka Topic & Message Schemas](#4-kafka-topic--message-schemas)
5. [Redis Key Patterns](#5-redis-key-patterns)
6. [Rule Engine — Detailed Logic](#6-rule-engine--detailed-logic)
7. [Idempotency — Implementation Detail](#7-idempotency--implementation-detail)
8. [REST API Contracts](#8-rest-api-contracts)
9. [WebSocket Protocol](#9-websocket-protocol)
10. [Configuration Files](#10-configuration-files)
11. [Environment Variables](#11-environment-variables)
12. [Docker & Compose Structure](#12-docker--compose-structure)
13. [Test Structure & Acceptance Scenario Tests](#13-test-structure--acceptance-scenario-tests)
14. [Sample Data Files](#14-sample-data-files)
15. [Error Handling & Status Codes](#15-error-handling--status-codes)

---

## 1. Complete Project Folder Structure

```
fleet-maintenance-engine/
│
├── docker-compose.yml                  # Orchestrates all services
├── docker-compose.test.yml             # Test environment overrides
├── .env.example                        # Template for environment variables
├── .env                                # Local secrets (git-ignored)
├── Makefile                            # Shortcut commands (make up, make test, etc.)
├── README.md                           # Project setup guide
│
├── docs/                               # Architecture docs
│   ├── hld.md
│   ├── lld.md
│   └── Task.md
│
├── data/                               # Sample data files
│   ├── sample_telemetry.json           # Streaming telemetry event samples
│   ├── service_records.csv             # Batch service history CSV
│   └── parts_catalog.json             # Mock parts reference data
│
├── config/                             # Shared configuration
│   ├── rules.yaml                      # Configurable rule definitions
│   └── logging.yaml                    # Logging configuration
│
├── services/
│   │
│   ├── ingestion_api/                  # Telemetry ingestion service
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── main.py                     # FastAPI app entrypoint
│   │   ├── app/
│   │   │   ├── __init__.py
│   │   │   ├── api/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── routes/
│   │   │   │   │   ├── __init__.py
│   │   │   │   │   ├── telemetry.py    # POST /telemetry
│   │   │   │   │   └── health.py       # GET /health
│   │   │   │   └── dependencies.py     # Auth, rate-limit deps
│   │   │   ├── core/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── config.py           # Settings (pydantic BaseSettings)
│   │   │   │   ├── security.py         # API key validation
│   │   │   │   └── logging.py          # Structured logger setup
│   │   │   ├── models/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── telemetry.py        # Pydantic input models
│   │   │   │   └── events.py           # Kafka event models
│   │   │   ├── services/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── deduplicator.py     # Redis dedup logic
│   │   │   │   ├── normalizer.py       # Schema normalization
│   │   │   │   └── publisher.py        # Kafka producer wrapper
│   │   │   └── middleware/
│   │   │       ├── __init__.py
│   │   │       └── rate_limiter.py     # Per-vehicle rate limiting
│   │   └── tests/
│   │       ├── __init__.py
│   │       ├── test_routes.py
│   │       ├── test_deduplicator.py
│   │       └── conftest.py
│   │
│   ├── rule_engine/                    # Rule evaluation service
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── main.py                     # Consumer entrypoint
│   │   ├── app/
│   │   │   ├── __init__.py
│   │   │   ├── core/
│   │   │   │   ├── config.py
│   │   │   │   ├── logging.py
│   │   │   │   └── rules_loader.py     # Loads rules.yaml at startup
│   │   │   ├── consumer/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── kafka_consumer.py   # Kafka consumer loop
│   │   │   │   └── dispatcher.py       # Routes events to correct handler
│   │   │   ├── engine/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── rule_evaluator.py   # Main rule runner
│   │   │   │   ├── window_manager.py   # Per-vehicle sliding window state
│   │   │   │   ├── fingerprint.py      # Alert fingerprint computation
│   │   │   │   └── rules/
│   │   │   │       ├── __init__.py
│   │   │   │       ├── base_rule.py    # Abstract base class
│   │   │   │       ├── overheating.py  # Overheating rule
│   │   │   │       ├── fault_code.py   # Repeated DTC rule
│   │   │   │       └── overdue_service.py # Service interval rule
│   │   │   ├── models/
│   │   │   │   ├── event.py
│   │   │   │   └── alert_trigger.py
│   │   │   └── services/
│   │   │       ├── idempotency.py      # Redis fingerprint check/write
│   │   │       └── publisher.py        # Kafka producer (alert triggers)
│   │   └── tests/
│   │       ├── test_overheating_rule.py
│   │       ├── test_fault_code_rule.py
│   │       ├── test_idempotency.py
│   │       └── conftest.py
│   │
│   ├── alert_processor/                # Alert persistence & parts API service
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── main.py
│   │   ├── app/
│   │   │   ├── __init__.py
│   │   │   ├── core/
│   │   │   │   ├── config.py
│   │   │   │   └── logging.py
│   │   │   ├── consumer/
│   │   │   │   ├── kafka_consumer.py
│   │   │   │   └── handler.py          # Processes alert trigger events
│   │   │   ├── models/
│   │   │   │   ├── alert.py            # SQLAlchemy ORM model
│   │   │   │   └── parts_request.py
│   │   │   ├── repository/
│   │   │   │   ├── alert_repo.py       # DB CRUD for alerts
│   │   │   │   └── parts_repo.py       # DB CRUD for parts requests
│   │   │   └── services/
│   │   │       ├── parts_client.py     # HTTP client for spare-parts API
│   │   │       ├── retry_manager.py    # Redis-backed retry queue
│   │   │       └── notifier.py         # Publishes to alerts.notifications
│   │   └── tests/
│   │       ├── test_handler.py
│   │       ├── test_parts_client.py
│   │       └── conftest.py
│   │
│   ├── csv_ingestion/                  # Batch CSV ingestion service
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── main.py                     # CLI entrypoint (also callable by scheduler)
│   │   ├── app/
│   │   │   ├── __init__.py
│   │   │   ├── core/
│   │   │   │   └── config.py
│   │   │   ├── parser/
│   │   │   │   ├── csv_parser.py       # Reads, validates CSV rows
│   │   │   │   └── schema.py           # Expected CSV column definitions
│   │   │   ├── services/
│   │   │   │   ├── deduplicator.py     # Dedup service records
│   │   │   │   └── publisher.py        # Publish to Kafka
│   │   │   └── models/
│   │   │       └── service_record.py
│   │   └── tests/
│   │       ├── test_csv_parser.py
│   │       └── conftest.py
│   │
│   ├── parts_api_mock/                 # Mocked spare-parts supplier API
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── main.py
│   │   ├── app/
│   │   │   ├── __init__.py
│   │   │   ├── routes/
│   │   │   │   ├── parts.py            # GET /parts/available
│   │   │   │   └── control.py          # POST /mock/mode (set failure mode)
│   │   │   ├── core/
│   │   │   │   └── config.py           # PARTS_API_MODE env var
│   │   │   └── data/
│   │   │       └── parts_catalog.json  # Static parts availability data
│   │   └── tests/
│   │       └── test_parts_routes.py
│   │
│   ├── webhook_receiver/               # Inbound service-status webhooks
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── main.py
│   │   ├── app/
│   │   │   ├── __init__.py
│   │   │   ├── routes/
│   │   │   │   └── webhooks.py         # POST /webhooks/service-status
│   │   │   ├── core/
│   │   │   │   ├── config.py
│   │   │   │   └── hmac_validator.py   # HMAC-SHA256 signature check
│   │   │   ├── models/
│   │   │   │   └── webhook_event.py    # SQLAlchemy ORM
│   │   │   ├── repository/
│   │   │   │   └── webhook_repo.py
│   │   │   └── workers/
│   │   │       ├── event_processor.py  # Async event processor
│   │   │       └── dlq_worker.py       # Dead-letter queue retry worker
│   │   └── tests/
│   │       └── test_webhook_routes.py
│   │
│   ├── dashboard_api/                  # REST + WebSocket API for dashboard
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── main.py
│   │   ├── app/
│   │   │   ├── __init__.py
│   │   │   ├── api/
│   │   │   │   ├── routes/
│   │   │   │   │   ├── fleet.py        # GET /fleet/health, /fleet/summary
│   │   │   │   │   ├── alerts.py       # GET /alerts, GET /alerts/:id
│   │   │   │   │   ├── vehicles.py     # GET /vehicles/:id/history
│   │   │   │   │   └── depots.py       # GET /depots
│   │   │   │   └── websocket.py        # WS /ws/live-updates
│   │   │   ├── core/
│   │   │   │   ├── config.py
│   │   │   │   ├── auth.py             # JWT validation
│   │   │   │   └── cache.py            # Redis cache helpers
│   │   │   ├── models/
│   │   │   │   ├── vehicle.py
│   │   │   │   ├── alert.py
│   │   │   │   └── depot.py
│   │   │   ├── repository/
│   │   │   │   ├── alert_repo.py
│   │   │   │   ├── vehicle_repo.py
│   │   │   │   └── fleet_repo.py
│   │   │   └── services/
│   │   │       ├── fleet_service.py    # Business logic for fleet health
│   │   │       └── ws_manager.py       # WebSocket connection manager
│   │   └── tests/
│   │       ├── test_fleet_routes.py
│   │       ├── test_alerts_routes.py
│   │       └── conftest.py
│   │
│   └── scheduler/                      # Cron job runner
│       ├── Dockerfile
│       ├── requirements.txt
│       ├── main.py                     # APScheduler entrypoint
│       └── app/
│           ├── __init__.py
│           ├── jobs/
│           │   ├── csv_ingest_job.py   # Triggers CSV ingestion
│           │   └── parts_retry_job.py  # Retries pending parts requests
│           └── core/
│               └── config.py
│
├── frontend/                           # React dashboard
│   ├── Dockerfile
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── index.jsx
│       ├── App.jsx
│       ├── api/
│       │   ├── fleetApi.js             # REST calls to dashboard_api
│       │   └── wsClient.js             # WebSocket connection handler
│       ├── components/
│       │   ├── FleetOverview/
│       │   │   ├── FleetOverview.jsx
│       │   │   └── FleetOverview.css
│       │   ├── AlertsList/
│       │   │   ├── AlertsList.jsx
│       │   │   ├── AlertCard.jsx
│       │   │   └── AlertsList.css
│       │   ├── VehiclePanel/
│       │   │   ├── VehiclePanel.jsx
│       │   │   └── VehiclePanel.css
│       │   ├── Filters/
│       │   │   ├── FilterBar.jsx
│       │   │   └── FilterBar.css
│       │   └── shared/
│       │       ├── SeverityBadge.jsx
│       │       ├── StatusDot.jsx
│       │       └── LoadingSpinner.jsx
│       ├── hooks/
│       │   ├── useFleetHealth.js
│       │   ├── useAlerts.js
│       │   └── useLiveUpdates.js       # WebSocket hook
│       ├── store/
│       │   ├── alertsSlice.js          # Redux or Zustand store
│       │   └── fleetSlice.js
│       └── utils/
│           ├── severityColors.js
│           └── formatters.js
│
├── shared/                             # Shared Python utilities (pip-installed locally)
│   ├── __init__.py
│   ├── db/
│   │   ├── __init__.py
│   │   ├── session.py                  # SQLAlchemy async engine + session factory
│   │   └── migrations/                 # Alembic migrations
│   │       ├── env.py
│   │       ├── alembic.ini
│   │       └── versions/
│   │           ├── 001_initial_schema.py
│   │           └── 002_add_parts_status.py
│   ├── kafka/
│   │   ├── __init__.py
│   │   ├── producer.py                 # Shared Kafka producer
│   │   └── consumer.py                 # Shared Kafka consumer base
│   ├── redis_client/
│   │   ├── __init__.py
│   │   └── client.py                   # Shared Redis connection pool
│   └── models/
│       ├── __init__.py
│       └── enums.py                    # Shared enums (Severity, AlertStatus, etc.)
│
└── tests/
    ├── acceptance/
    │   ├── test_acceptance_overheating.py   # Full acceptance scenario
    │   └── conftest.py                      # Docker-compose test fixtures
    └── integration/
        ├── test_kafka_flow.py
        ├── test_idempotency_e2e.py
        └── conftest.py
```

---

## 2. Service-by-Service Module Design

### 2.1 Ingestion API

**Responsibility:** Accept telemetry from vehicle agents, validate, deduplicate, and publish to Kafka.

#### Class: `TelemetryRoute` (`routes/telemetry.py`)

```python
POST /telemetry
  Input:  TelemetryEvent (Pydantic model)
  Steps:
    1. Authenticate API key (dependency)
    2. Validate schema → reject unknowns, fill defaults
    3. Check dedup key in Redis
    4. Normalize units (e.g., Fahrenheit → Celsius if needed)
    5. Publish to Kafka: topic=telemetry.raw
    6. Return 202 Accepted

POST /telemetry/batch
  Input:  List[TelemetryEvent]  (max 100 per batch)
  Steps:
    1..3 same as above per event
    4. Publish all valid events atomically to Kafka
    5. Return 207 Multi-Status with per-event results
```

#### Pydantic Model: `TelemetryEvent` (`models/telemetry.py`)

```python
class TelemetryEvent(BaseModel):
    vehicle_id:       str          # Required, e.g. "VH-001"
    timestamp:        datetime     # ISO-8601, UTC
    engine_temp_c:    float | None # Celsius; None if sensor absent
    battery_voltage:  float | None # Volts
    odometer_km:      float | None # Kilometres
    dtc_codes:        list[str]    # e.g. ["P0300", "P0171"], can be empty
    depot_id:         str | None   # Optional depot tag

    class Config:
        extra = "ignore"           # Schema-change tolerance: ignore unknown fields
```

#### Class: `Deduplicator` (`services/deduplicator.py`)

```python
class Deduplicator:
    KEY_PREFIX = "dedup:telemetry:"
    TTL_SECONDS = 86400  # 24 hours

    def is_duplicate(self, event: TelemetryEvent) -> bool:
        key = f"{self.KEY_PREFIX}{event.vehicle_id}:{self._hash(event)}"
        return self.redis.exists(key)

    def mark_seen(self, event: TelemetryEvent) -> None:
        key = f"{self.KEY_PREFIX}{event.vehicle_id}:{self._hash(event)}"
        self.redis.set(key, 1, ex=self.TTL_SECONDS)

    def _hash(self, event: TelemetryEvent) -> str:
        # Hash: vehicle_id + timestamp + all readings
        payload = f"{event.vehicle_id}|{event.timestamp}|{event.engine_temp_c}|
                    {event.battery_voltage}|{event.odometer_km}|{sorted(event.dtc_codes)}"
        return hashlib.sha256(payload.encode()).hexdigest()[:16]
```

#### Out-of-Order Handling

- Events with `timestamp` > 60 seconds in the future → **reject** (400)
- Events with `timestamp` > 24 hours in the past → **accept but tag** `late_arrival: true`
- Kafka consumer uses **event time** (from `timestamp` field), not Kafka arrival time, for window calculations

---

### 2.2 Rule Engine

**Responsibility:** Stateful consumer that evaluates health rules per vehicle and emits alert triggers.

#### Class: `WindowManager` (`engine/window_manager.py`)

```python
class VehicleWindow:
    vehicle_id:         str
    temp_readings:      deque[TempReading]        # bounded by rule config
    dtc_occurrences:    defaultdict[str, deque]   # dtc_code → deque[datetime]
    last_service_km:    float | None
    last_service_date:  datetime | None
    last_updated:       datetime

class WindowManager:
    # In-memory dict keyed by vehicle_id
    # Evicts stale vehicles after 1 hour of inactivity
    _windows: dict[str, VehicleWindow]

    def update(self, event: TelemetryEvent) -> VehicleWindow:
        ...

    def get(self, vehicle_id: str) -> VehicleWindow | None:
        ...
```

#### Abstract Base Rule (`engine/rules/base_rule.py`)

```python
class BaseRule(ABC):
    name: str
    severity: Severity

    @abstractmethod
    def evaluate(self, window: VehicleWindow, config: dict) -> RuleTrigger | None:
        """Returns RuleTrigger if rule fires, else None."""
        ...
```

#### Class: `OverheatingRule` (`engine/rules/overheating.py`)

```python
class OverheatingRule(BaseRule):
    name = "overheating"

    def evaluate(self, window: VehicleWindow, config: dict) -> RuleTrigger | None:
        threshold   = config["threshold"]       # e.g. 105.0 °C
        consecutive = config["consecutive"]     # e.g. 3

        recent_temps = list(window.temp_readings)[-consecutive:]

        if len(recent_temps) < consecutive:
            return None  # Not enough data yet

        if all(r.value >= threshold for r in recent_temps):
            return RuleTrigger(
                rule_name   = self.name,
                severity    = self.severity,
                vehicle_id  = window.vehicle_id,
                evidence    = [{"ts": r.ts, "engine_temp_c": r.value}
                               for r in recent_temps],
                trigger_ts  = datetime.utcnow(),
            )
        return None
```

#### Class: `FaultCodeRule` (`engine/rules/fault_code.py`)

```python
class FaultCodeRule(BaseRule):
    name = "repeated_fault_code"

    def evaluate(self, window: VehicleWindow, config: dict) -> list[RuleTrigger]:
        window_minutes = config["window_minutes"]   # e.g. 60
        min_occ        = config["min_occurrences"]  # e.g. 3
        cutoff         = datetime.utcnow() - timedelta(minutes=window_minutes)
        triggers = []

        for dtc_code, timestamps in window.dtc_occurrences.items():
            recent = [t for t in timestamps if t >= cutoff]
            if len(recent) >= min_occ:
                triggers.append(RuleTrigger(
                    rule_name  = self.name,
                    severity   = self.severity,
                    vehicle_id = window.vehicle_id,
                    evidence   = [{"dtc_code": dtc_code, "occurrences": len(recent),
                                   "first_seen": recent[0], "last_seen": recent[-1]}],
                ))
        return triggers
```

#### Class: `RuleEvaluator` (`engine/rule_evaluator.py`)

```python
class RuleEvaluator:
    rules: list[BaseRule]  # loaded from rules.yaml at startup

    def evaluate_all(self, window: VehicleWindow) -> list[RuleTrigger]:
        triggers = []
        for rule in self.rules:
            result = rule.evaluate(window, self.config[rule.name])
            if result:
                triggers.extend(result if isinstance(result, list) else [result])
        return triggers
```

#### Class: `Fingerprinter` (`engine/fingerprint.py`)

```python
class Fingerprinter:
    def compute(self, trigger: RuleTrigger) -> str:
        # Deterministic hash; same trigger on replay → same fingerprint
        evidence_str = json.dumps(trigger.evidence, sort_keys=True, default=str)
        payload = f"{trigger.vehicle_id}|{trigger.rule_name}|{evidence_str}"
        return hashlib.sha256(payload.encode()).hexdigest()
```

---

### 2.3 Alert Processor

**Responsibility:** Persists alerts to DB, calls spare-parts API, manages retry state.

#### Class: `AlertHandler` (`consumer/handler.py`)

```python
class AlertHandler:
    async def handle(self, trigger: RuleTrigger) -> None:
        # 1. Write alert to DB (status=OPEN, parts_status=PENDING)
        alert_id = await self.alert_repo.create(trigger)

        # 2. Call spare-parts API
        parts_result = await self.parts_client.check_availability(
            part_codes=self._get_required_parts(trigger)
        )

        if parts_result.success:
            await self.alert_repo.update_parts_status(
                alert_id, PartsStatus.AVAILABLE, parts_result.data
            )
        else:
            # Enqueue for retry; alert remains PENDING
            await self.retry_manager.enqueue(alert_id, attempt=1)

        # 3. Publish to alerts.notifications for WebSocket push
        await self.notifier.publish(alert_id)
```

#### Class: `PartsClient` (`services/parts_client.py`)

```python
class PartsClient:
    BASE_URL: str
    MAX_RETRIES = 5
    BACKOFF_BASE = 5  # seconds

    async def check_availability(self, part_codes: list[str]) -> PartsResult:
        for attempt in range(1, self.MAX_RETRIES + 1):
            try:
                response = await self.http.get(
                    f"{self.BASE_URL}/parts/available",
                    params={"codes": ",".join(part_codes)},
                    timeout=5.0
                )
                if response.status_code == 200:
                    return PartsResult(success=True, data=response.json())
                elif response.status_code == 429:
                    # Honour Retry-After header
                    wait = int(response.headers.get("Retry-After", self.BACKOFF_BASE))
                    await asyncio.sleep(wait)
                elif response.status_code == 503:
                    await asyncio.sleep(self.BACKOFF_BASE * (2 ** (attempt - 1)))
                else:
                    return PartsResult(success=False, error=f"HTTP {response.status_code}")
            except httpx.TimeoutException:
                await asyncio.sleep(self.BACKOFF_BASE * attempt)

        return PartsResult(success=False, error="max_retries_exceeded")
```

#### Class: `RetryManager` (`services/retry_manager.py`)

```python
# Redis sorted set: score = next_retry_at (unix timestamp)
RETRY_QUEUE_KEY = "retry:parts_requests"

class RetryManager:
    async def enqueue(self, alert_id: str, attempt: int) -> None:
        delay = 5 * (2 ** (attempt - 1))        # 5s, 10s, 20s, 40s, 80s
        next_retry = time.time() + delay
        self.redis.zadd(RETRY_QUEUE_KEY, {f"{alert_id}:{attempt}": next_retry})

    async def dequeue_due(self) -> list[tuple[str, int]]:
        now = time.time()
        items = self.redis.zrangebyscore(RETRY_QUEUE_KEY, 0, now, withscores=False)
        self.redis.zremrangebyscore(RETRY_QUEUE_KEY, 0, now)
        return [(item.split(":")[0], int(item.split(":")[1])) for item in items]
```

---

### 2.4 CSV Batch Ingestion

**Responsibility:** Parse service history CSVs and publish normalized records to Kafka.

#### Expected CSV Schema (`parser/schema.py`)

```python
REQUIRED_COLUMNS = [
    "vehicle_id",       # str
    "service_date",     # ISO date: YYYY-MM-DD
    "service_type",     # str: OIL_CHANGE | BRAKE_SERVICE | FULL_SERVICE | etc.
    "odometer_km",      # float
    "depot_id",         # str
    "technician_id",    # str
    "notes",            # str (optional, can be empty)
]

OPTIONAL_COLUMNS = ["parts_used", "cost_gbp", "next_service_km"]
```

#### Class: `CSVParser` (`parser/csv_parser.py`)

```python
class CSVParser:
    def parse(self, file_path: str) -> tuple[list[ServiceRecord], list[ParseError]]:
        records, errors = [], []
        with open(file_path, newline="") as f:
            reader = csv.DictReader(f)
            self._validate_headers(reader.fieldnames)
            for i, row in enumerate(reader, start=2):
                try:
                    records.append(self._parse_row(row, line=i))
                except ValueError as e:
                    errors.append(ParseError(line=i, reason=str(e)))
        return records, errors

    def _parse_row(self, row: dict, line: int) -> ServiceRecord:
        # Type-cast, validate dates, handle empty optionals
        ...
```

#### Dedup Key for Service Records

```
Redis key: dedup:service:{vehicle_id}:{service_date}:{service_type}
TTL: 365 days
```

---

### 2.5 Spare-Parts API Mock

**Responsibility:** Simulate external supplier API with controllable failure modes.

#### Routes (`routes/parts.py`)

```
GET  /parts/available?codes=P001,P002
  Response 200: { "available": {"P001": true, "P002": false}, "lead_time_days": {"P001": 2} }
  Response 429: { "error": "rate_limited" }  +  Retry-After: 30
  Response 503: { "error": "service_unavailable" }

POST /mock/mode          # Control endpoint (internal only)
  Body: { "mode": "normal" | "rate_limited" | "unavailable" }
  Response 200: { "mode": "rate_limited" }
```

#### Mode State Machine

```
PARTS_API_MODE env var (or /mock/mode POST):
  normal       → always return 200
  rate_limited → return 429 on every 3rd request, others 200
  unavailable  → always return 503
```

---

### 2.6 Webhook Receiver

#### HMAC Validation (`core/hmac_validator.py`)

```python
def validate_signature(payload: bytes, signature_header: str, secret: str) -> bool:
    expected = hmac.new(
        secret.encode(), payload, hashlib.sha256
    ).hexdigest()
    received = signature_header.replace("sha256=", "")
    return hmac.compare_digest(expected, received)  # timing-safe comparison
```

#### Webhook Payload Model

```python
class ServiceStatusWebhook(BaseModel):
    event_type:  str        # "SERVICE_COMPLETED" | "SERVICE_SCHEDULED" | "SERVICE_CANCELLED"
    alert_id:    str        # Links back to maintenance_alert
    vehicle_id:  str
    timestamp:   datetime
    details:     dict       # Free-form from service centre
```

#### DLQ Strategy

```
On processing failure:
  attempt 1 → immediate retry
  attempt 2 → +30s
  attempt 3 → +2min
  attempt 4 → +10min
  attempt 5 → move to DLQ Redis key: dlq:webhooks
              log ERROR + trigger alertmanager notification
```

---

### 2.7 Dashboard API

#### REST Routes Summary

```
GET  /fleet/health
     → FleetHealthSummary (total vehicles, counts by status, high-risk list)

GET  /fleet/summary?depot_id=D01
     → Aggregated stats filtered by depot

GET  /alerts
     ?depot_id=D01&vehicle_id=VH-001&severity=HIGH&status=OPEN
     &page=1&page_size=20
     → PaginatedAlertList

GET  /alerts/{alert_id}
     → AlertDetail (with full evidence JSON, parts status, timeline)

PATCH /alerts/{alert_id}
     Body: { "status": "ACKNOWLEDGED" | "RESOLVED" }
     → Updated AlertDetail

GET  /vehicles/{vehicle_id}/history
     → VehicleTelemetryHistory (last 100 readings + service records)

GET  /depots
     → List[Depot]

WS   /ws/live-updates
     → Pushes AlertCreated, AlertUpdated, FleetHealthChanged events
```

#### WebSocket Manager (`services/ws_manager.py`)

```python
class WebSocketManager:
    _connections: set[WebSocket] = set()

    async def connect(self, ws: WebSocket) -> None:
        await ws.accept()
        self._connections.add(ws)

    def disconnect(self, ws: WebSocket) -> None:
        self._connections.discard(ws)

    async def broadcast(self, message: dict) -> None:
        dead = set()
        for ws in self._connections:
            try:
                await ws.send_json(message)
            except WebSocketDisconnect:
                dead.add(ws)
        self._connections -= dead
```

#### Caching Strategy

```
Redis cache keys for dashboard_api:
  fleet:health:summary              TTL: 10s  (refreshed on new alert)
  fleet:health:depot:{depot_id}     TTL: 10s
  alerts:open:page:{n}              TTL: 5s
```

---

### 2.8 Scheduler

#### Job Definitions (`jobs/`)

```python
# csv_ingest_job.py
@scheduler.scheduled_job("interval", minutes=5, id="csv_ingest")
async def run_csv_ingest():
    # Discovers new CSV files in /data/incoming/
    # Calls csv_ingestion main.py via subprocess or HTTP
    ...

# parts_retry_job.py
@scheduler.scheduled_job("interval", minutes=5, id="parts_retry")
async def run_parts_retry():
    due_items = await retry_manager.dequeue_due()
    for alert_id, attempt in due_items:
        await alert_handler.retry_parts_check(alert_id, attempt)
```

---

### 2.9 Frontend (React)

#### Component Tree

```
App
├── FilterBar              ← Depot / Vehicle / Severity dropdowns
├── FleetOverview          ← Summary cards (total, healthy, at-risk, critical)
│   └── StatusDot          ← Green/Yellow/Red indicator
├── AlertsList             ← Scrollable list, live-updated
│   └── AlertCard          ← Severity badge, vehicle ID, rule name, evidence preview
├── VehiclePanel           ← Drawer: telemetry history + service records
└── MaintenanceQueue       ← Priority-ranked list of vehicles needing service
```

#### WebSocket Hook (`hooks/useLiveUpdates.js`)

```javascript
export function useLiveUpdates(onAlert) {
  useEffect(() => {
    const ws = new WebSocket(`${WS_BASE_URL}/ws/live-updates`);
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === "ALERT_CREATED") onAlert(msg.payload);
    };
    ws.onerror = () => setTimeout(() => reconnect(), 3000);  // auto-reconnect
    return () => ws.close();
  }, []);
}
```

---

## 3. Database Schema (Full DDL)

```sql
-- ==================================================================
-- EXTENSION
-- ==================================================================
CREATE EXTENSION IF NOT EXISTS timescaledb;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==================================================================
-- ENUMS
-- ==================================================================
CREATE TYPE severity_level     AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');
CREATE TYPE alert_status       AS ENUM ('OPEN', 'ACKNOWLEDGED', 'RESOLVED', 'SUPPRESSED');
CREATE TYPE parts_status       AS ENUM ('PENDING', 'AVAILABLE', 'UNAVAILABLE', 'NOT_REQUIRED');
CREATE TYPE service_type       AS ENUM ('OIL_CHANGE','BRAKE_SERVICE','FULL_SERVICE',
                                        'TYRE_ROTATION','BATTERY_CHECK','OTHER');
CREATE TYPE webhook_event_type AS ENUM ('SERVICE_SCHEDULED','SERVICE_COMPLETED','SERVICE_CANCELLED');

-- ==================================================================
-- DEPOTS
-- ==================================================================
CREATE TABLE depots (
    depot_id    VARCHAR(50)  PRIMARY KEY,
    name        VARCHAR(200) NOT NULL,
    region      VARCHAR(100),
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ==================================================================
-- VEHICLES
-- ==================================================================
CREATE TABLE vehicles (
    vehicle_id       VARCHAR(50)   PRIMARY KEY,
    depot_id         VARCHAR(50)   REFERENCES depots(depot_id),
    make             VARCHAR(100),
    model            VARCHAR(100),
    year             INTEGER,
    registration     VARCHAR(20)   UNIQUE,
    status           VARCHAR(20)   NOT NULL DEFAULT 'ACTIVE',
    created_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_vehicles_depot ON vehicles(depot_id);

-- ==================================================================
-- TELEMETRY READINGS  (TimescaleDB hypertable)
-- ==================================================================
CREATE TABLE telemetry_readings (
    id               UUID         NOT NULL DEFAULT uuid_generate_v4(),
    vehicle_id       VARCHAR(50)  NOT NULL,
    ts               TIMESTAMPTZ  NOT NULL,
    engine_temp_c    NUMERIC(6,2),
    battery_voltage  NUMERIC(5,2),
    odometer_km      NUMERIC(10,2),
    dtc_codes        TEXT[],
    depot_id         VARCHAR(50),
    late_arrival     BOOLEAN      NOT NULL DEFAULT FALSE,
    raw_payload      JSONB,                              -- original event for audit
    PRIMARY KEY (id, ts)
);

SELECT create_hypertable('telemetry_readings', 'ts', chunk_time_interval => INTERVAL '1 day');

CREATE INDEX idx_telemetry_vehicle_ts ON telemetry_readings(vehicle_id, ts DESC);
CREATE INDEX idx_telemetry_dtc        ON telemetry_readings USING GIN(dtc_codes);

-- ==================================================================
-- SERVICE RECORDS
-- ==================================================================
CREATE TABLE service_records (
    id               UUID         PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id       VARCHAR(50)  NOT NULL REFERENCES vehicles(vehicle_id),
    service_date     DATE         NOT NULL,
    service_type     service_type NOT NULL,
    odometer_km      NUMERIC(10,2),
    depot_id         VARCHAR(50)  REFERENCES depots(depot_id),
    technician_id    VARCHAR(100),
    parts_used       TEXT[],
    cost_gbp         NUMERIC(10,2),
    next_service_km  NUMERIC(10,2),
    notes            TEXT,
    source           VARCHAR(20)  NOT NULL DEFAULT 'CSV',  -- 'CSV' | 'WEBHOOK'
    created_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    UNIQUE(vehicle_id, service_date, service_type)          -- dedup constraint
);

CREATE INDEX idx_service_records_vehicle ON service_records(vehicle_id, service_date DESC);

-- ==================================================================
-- MAINTENANCE ALERTS
-- ==================================================================
CREATE TABLE maintenance_alerts (
    id               UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id       VARCHAR(50)   NOT NULL REFERENCES vehicles(vehicle_id),
    depot_id         VARCHAR(50)   REFERENCES depots(depot_id),
    rule_name        VARCHAR(100)  NOT NULL,
    severity         severity_level NOT NULL,
    status           alert_status  NOT NULL DEFAULT 'OPEN',
    parts_status     parts_status  NOT NULL DEFAULT 'PENDING',
    evidence         JSONB         NOT NULL,          -- triggering readings/events
    recommendation   TEXT,
    fingerprint      VARCHAR(64)   UNIQUE NOT NULL,   -- idempotency key
    parts_data       JSONB,                           -- spare-parts API response
    resolved_at      TIMESTAMPTZ,
    created_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_alerts_vehicle     ON maintenance_alerts(vehicle_id);
CREATE INDEX idx_alerts_depot       ON maintenance_alerts(depot_id);
CREATE INDEX idx_alerts_severity    ON maintenance_alerts(severity);
CREATE INDEX idx_alerts_status      ON maintenance_alerts(status);
CREATE INDEX idx_alerts_created     ON maintenance_alerts(created_at DESC);
CREATE INDEX idx_alerts_fingerprint ON maintenance_alerts(fingerprint);   -- fast dedup

-- ==================================================================
-- PARTS REQUESTS
-- ==================================================================
CREATE TABLE parts_requests (
    id               UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
    alert_id         UUID          NOT NULL REFERENCES maintenance_alerts(id),
    part_codes       TEXT[]        NOT NULL,
    attempt_number   INTEGER       NOT NULL DEFAULT 1,
    status           VARCHAR(20)   NOT NULL DEFAULT 'PENDING',
    response_code    INTEGER,
    response_body    JSONB,
    next_retry_at    TIMESTAMPTZ,
    created_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- ==================================================================
-- WEBHOOK EVENTS
-- ==================================================================
CREATE TABLE webhook_events (
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

CREATE INDEX idx_webhook_unprocessed ON webhook_events(processed, received_at)
    WHERE processed = FALSE;
```

---

## 4. Kafka Topic & Message Schemas

### Topics

| Topic | Partitions | Replication | Retention | Partitioned By |
|-------|-----------|-------------|-----------|----------------|
| `telemetry.raw` | 20 | 2 | 7 days | `vehicle_id` |
| `service.records` | 5 | 2 | 7 days | `vehicle_id` |
| `alerts.notifications` | 10 | 2 | 30 days | `alert_id` |

### Message Schema: `telemetry.raw`

```json
{
  "schema_version": "1.0",
  "vehicle_id":       "VH-001",
  "timestamp":        "2026-09-26T10:00:00Z",
  "engine_temp_c":    109.2,
  "battery_voltage":  12.4,
  "odometer_km":      54231.5,
  "dtc_codes":        ["P0300"],
  "depot_id":         "D01",
  "late_arrival":     false,
  "ingested_at":      "2026-09-26T10:00:01Z"
}
```

### Message Schema: `service.records`

```json
{
  "schema_version": "1.0",
  "vehicle_id":       "VH-001",
  "service_date":     "2026-06-15",
  "service_type":     "FULL_SERVICE",
  "odometer_km":      50000.0,
  "depot_id":         "D01",
  "technician_id":    "TECH-42",
  "parts_used":       ["OIL_FILTER", "AIR_FILTER"],
  "cost_gbp":         285.00,
  "next_service_km":  60000.0,
  "source_file":      "service_records_2026_06.csv"
}
```

### Message Schema: `alerts.notifications`

```json
{
  "schema_version":  "1.0",
  "event_type":      "ALERT_CREATED",
  "alert_id":        "a1b2c3d4-...",
  "vehicle_id":      "VH-001",
  "depot_id":        "D01",
  "rule_name":       "overheating",
  "severity":        "HIGH",
  "status":          "OPEN",
  "parts_status":    "PENDING",
  "created_at":      "2026-09-26T10:00:05Z"
}
```

---

## 5. Redis Key Patterns

| Key Pattern | Type | TTL | Purpose |
|-------------|------|-----|---------|
| `dedup:telemetry:{vehicle_id}:{hash}` | String | 24h | Telemetry event deduplication |
| `dedup:service:{vehicle_id}:{date}:{type}` | String | 365d | Service record deduplication |
| `alert:fingerprint:{sha256}` | String | 30d | Alert creation idempotency |
| `ratelimit:parts_api:{minute_bucket}` | Integer | 60s | Parts API call counter per minute |
| `retry:parts_requests` | ZSet (score=next_retry_unix) | — | Parts retry queue |
| `dlq:webhooks` | List | — | Dead-letter queue for failed webhooks |
| `cache:fleet:health` | JSON String | 10s | Fleet health summary cache |
| `cache:fleet:depot:{depot_id}` | JSON String | 10s | Per-depot summary cache |
| `cache:alerts:open:{page}` | JSON String | 5s | Open alerts page cache |

---

## 6. Rule Engine — Detailed Logic

### Processing Loop

```
Kafka Consumer (telemetry.raw)
    │
    ▼ per message:
    1. Deserialize event
    2. WindowManager.update(event)           → updates vehicle's in-memory window
    3. RuleEvaluator.evaluate_all(window)    → returns list[RuleTrigger]
    4. For each RuleTrigger:
        a. fingerprint = Fingerprinter.compute(trigger)
        b. if Redis.exists(f"alert:fingerprint:{fingerprint}"):
               log("duplicate — skipping"); continue
        c. Redis.set(f"alert:fingerprint:{fingerprint}", 1, ex=2592000)
        d. Kafka.publish("alerts.notifications", trigger.to_dict())
    5. Kafka.commit_offset()                 ← only after safe processing
```

### Consecutive Reading Logic (Overheating)

```
vehicle_state["VH-001"].temp_readings = deque(maxlen=10)

On each new reading:
  append TempReading(ts=event.timestamp, value=event.engine_temp_c)

Evaluation:
  last_N = list(deque)[-config.consecutive:]   # e.g. last 3
  if len(last_N) == config.consecutive and all(r.value >= config.threshold):
      FIRE RULE
```

### Out-of-Order Resilience

```
Readings are sorted by timestamp within the deque:
  bisect.insort(window.temp_readings_sorted, new_reading, key=lambda r: r.ts)

The deque always holds readings in time order regardless of arrival order.
```

---

## 7. Idempotency — Implementation Detail

### Two-Layer Protection Sequence

```
Layer 1 — At Ingestion API boundary:
─────────────────────────────────────
  Incoming event
    → hash = SHA256(vehicle_id | timestamp | readings)
    → key  = dedup:telemetry:{vehicle_id}:{hash[:16]}
    → if Redis.exists(key) → return 200 (silently dropped, not error)
    → else → Redis.SETNX(key, 1, EX=86400) → publish to Kafka

Layer 2 — At Rule Engine, before publishing alert:
──────────────────────────────────────────────────
  Alert trigger computed
    → fingerprint = SHA256(vehicle_id | rule_name | sorted(evidence timestamps+values))
    → key  = alert:fingerprint:{fingerprint}
    → if Redis.exists(key) → skip (do not publish to Kafka)
    → else → Redis.SETNX(key, 1, EX=2592000) → publish trigger
              DB insert will also have UNIQUE constraint on fingerprint column
              → acts as final safety net if Redis is unavailable
```

### DB Constraint as Final Guard

```sql
-- In maintenance_alerts:
fingerprint VARCHAR(64) UNIQUE NOT NULL

-- If Rule Engine publishes duplicate (Redis missed), alert_processor's INSERT
-- will fail with UniqueViolation → caught, alert_id returned from existing row
-- → no duplicate stored ✅
```

---

## 8. REST API Contracts

### `GET /fleet/health`

**Response 200:**
```json
{
  "total_vehicles": 150,
  "healthy":        112,
  "at_risk":         28,
  "critical":        10,
  "open_alerts":     38,
  "last_updated":   "2026-09-26T10:05:00Z",
  "high_risk_vehicles": [
    {
      "vehicle_id":    "VH-001",
      "depot_id":      "D01",
      "severity":      "HIGH",
      "active_alerts": 2,
      "last_reading":  "2026-09-26T10:04:55Z"
    }
  ]
}
```

---

### `GET /alerts`

**Query params:** `depot_id`, `vehicle_id`, `severity`, `status`, `page`, `page_size`

**Response 200:**
```json
{
  "page": 1,
  "page_size": 20,
  "total": 38,
  "items": [
    {
      "id":            "a1b2c3d4-...",
      "vehicle_id":    "VH-001",
      "depot_id":      "D01",
      "rule_name":     "overheating",
      "severity":      "HIGH",
      "status":        "OPEN",
      "parts_status":  "PENDING",
      "created_at":    "2026-09-26T10:00:05Z",
      "evidence_summary": "Engine temp ≥105°C for 3 consecutive readings"
    }
  ]
}
```

---

### `GET /alerts/{alert_id}`

**Response 200:**
```json
{
  "id":           "a1b2c3d4-...",
  "vehicle_id":   "VH-001",
  "rule_name":    "overheating",
  "severity":     "HIGH",
  "status":       "OPEN",
  "parts_status": "PENDING",
  "evidence": [
    {"ts": "2026-09-26T09:58:00Z", "engine_temp_c": 106.1},
    {"ts": "2026-09-26T09:59:00Z", "engine_temp_c": 107.8},
    {"ts": "2026-09-26T10:00:00Z", "engine_temp_c": 109.2}
  ],
  "recommendation":  "Immediate cooling system inspection required.",
  "parts_data":      null,
  "created_at":      "2026-09-26T10:00:05Z",
  "updated_at":      "2026-09-26T10:00:05Z"
}
```

---

### `PATCH /alerts/{alert_id}`

**Request:**
```json
{ "status": "ACKNOWLEDGED" }
```

**Response 200:** Updated `AlertDetail`

---

### Error Response Schema (all endpoints)

```json
{
  "error":   "validation_error",
  "message": "engine_temp_c must be a number",
  "details": { "field": "engine_temp_c", "value": "hot" }
}
```

---

## 9. WebSocket Protocol

### Connection

```
Client → WS /ws/live-updates
         Header: Authorization: Bearer <jwt>
Server → 101 Switching Protocols
```

### Server-to-Client Message Types

```json
// New alert created
{
  "type":    "ALERT_CREATED",
  "payload": { "alert_id": "...", "vehicle_id": "VH-001",
               "severity": "HIGH", "rule_name": "overheating" },
  "ts":      "2026-09-26T10:00:05Z"
}

// Alert status updated
{
  "type":    "ALERT_UPDATED",
  "payload": { "alert_id": "...", "status": "ACKNOWLEDGED",
               "parts_status": "AVAILABLE" },
  "ts":      "2026-09-26T10:01:00Z"
}

// Fleet health changed (throttled: max 1/10s)
{
  "type":    "FLEET_HEALTH_CHANGED",
  "payload": { "open_alerts": 39, "critical": 11 },
  "ts":      "2026-09-26T10:00:05Z"
}

// Heartbeat (every 30s to keep connection alive)
{
  "type": "PING",
  "ts":   "2026-09-26T10:00:30Z"
}
```

### Client-to-Server Message Types

```json
// Subscribe to specific depot only
{ "type": "SUBSCRIBE", "filter": { "depot_id": "D01" } }

// Pong response to heartbeat
{ "type": "PONG" }
```

---

## 10. Configuration Files

### `config/rules.yaml`

```yaml
rules:
  overheating:
    enabled: true
    metric: engine_temp_c
    threshold: 105.0          # degrees Celsius
    consecutive: 3            # consecutive readings above threshold
    severity: HIGH
    recommendation: "Immediate cooling system inspection required."

  repeated_fault_code:
    enabled: true
    window_minutes: 60
    min_occurrences: 3
    severity: MEDIUM
    recommendation: "Schedule diagnostic scan; check fault code history."

  overdue_service:
    enabled: true
    odometer_interval_km: 10000   # km since last service
    time_interval_days: 180       # days since last service
    severity: MEDIUM
    recommendation: "Vehicle due for scheduled service."

global:
  alert_fingerprint_ttl_days: 30
  telemetry_dedup_ttl_hours: 24
  max_parts_retry_attempts: 5
```

---

### `config/logging.yaml`

```yaml
version: 1
formatters:
  json:
    class: pythonjsonlogger.jsonlogger.JsonFormatter
    format: "%(asctime)s %(name)s %(levelname)s %(message)s"

handlers:
  console:
    class: logging.StreamHandler
    formatter: json
    stream: ext://sys.stdout

root:
  level: INFO
  handlers: [console]

loggers:
  rule_engine:
    level: DEBUG
  alert_processor:
    level: INFO
  parts_client:
    level: WARNING    # Reduce noise from retry attempts
```

---

## 11. Environment Variables

### Shared across services

```dotenv
# Database
DATABASE_URL=postgresql+asyncpg://fleet:secret@postgres:5432/fleet_db

# Kafka
KAFKA_BOOTSTRAP_SERVERS=kafka:9092
KAFKA_CONSUMER_GROUP_ID=fleet-maintenance

# Redis
REDIS_URL=redis://redis:6379/0

# Security
API_KEY_HASH=<bcrypt-hashed API key for vehicle agents>
JWT_SECRET=<random 256-bit secret>
WEBHOOK_HMAC_SECRET=<random 256-bit secret>

# Environment
APP_ENV=development   # development | staging | production
LOG_LEVEL=INFO
```

### Per-service extras

```dotenv
# ingestion_api
MAX_BATCH_SIZE=100
TELEMETRY_DEDUP_TTL_HOURS=24

# rule_engine
RULES_CONFIG_PATH=/app/config/rules.yaml
VEHICLE_WINDOW_EVICT_SECONDS=3600

# alert_processor
PARTS_API_BASE_URL=http://parts-api-mock:8004
PARTS_API_MAX_RETRIES=5
PARTS_RETRY_INTERVAL_SECONDS=300

# parts_api_mock
PARTS_API_MODE=normal    # normal | rate_limited | unavailable

# dashboard_api
WS_HEARTBEAT_INTERVAL_SECONDS=30
CACHE_FLEET_HEALTH_TTL_SECONDS=10

# scheduler
CSV_INGEST_INTERVAL_MINUTES=5
CSV_INCOMING_DIR=/data/incoming
PARTS_RETRY_JOB_INTERVAL_MINUTES=5
```

---

## 12. Docker & Compose Structure

### `docker-compose.yml` (skeleton)

```yaml
version: "3.9"

networks:
  public-net:
  internal-net:

volumes:
  postgres-data:
  kafka-data:
  redis-data:

services:

  # ─── Infrastructure ───────────────────────────────
  postgres:
    image: timescale/timescaledb:latest-pg15
    environment:
      POSTGRES_USER: fleet
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: fleet_db
    volumes: [ "postgres-data:/var/lib/postgresql/data" ]
    networks: [ internal-net ]
    healthcheck:
      test: [ "CMD-SHELL", "pg_isready -U fleet" ]
      interval: 5s

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes: [ "redis-data:/data" ]
    networks: [ internal-net ]

  kafka:
    image: confluentinc/cp-kafka:7.6.0
    environment:
      KAFKA_NODE_ID: 1
      KAFKA_PROCESS_ROLES: broker,controller
      KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:9092,CONTROLLER://0.0.0.0:9093
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092
      KAFKA_CONTROLLER_QUORUM_VOTERS: 1@kafka:9093
      KAFKA_AUTO_CREATE_TOPICS_ENABLE: "true"
    volumes: [ "kafka-data:/var/lib/kafka/data" ]
    networks: [ internal-net ]

  # ─── Application Services ─────────────────────────
  ingestion-api:
    build: ./services/ingestion_api
    env_file: .env
    ports: [ "8001:8000" ]
    networks: [ public-net, internal-net ]
    depends_on: [ kafka, redis, postgres ]
    restart: always

  rule-engine:
    build: ./services/rule_engine
    env_file: .env
    networks: [ internal-net ]
    depends_on: [ kafka, redis, postgres ]
    restart: always

  alert-processor:
    build: ./services/alert_processor
    env_file: .env
    networks: [ internal-net ]
    depends_on: [ kafka, redis, postgres, parts-api-mock ]
    restart: always

  parts-api-mock:
    build: ./services/parts_api_mock
    env_file: .env
    ports: [ "8004:8000" ]        # internal only in prod; exposed for dev
    networks: [ internal-net ]
    restart: always

  webhook-receiver:
    build: ./services/webhook_receiver
    env_file: .env
    ports: [ "8003:8000" ]
    networks: [ public-net, internal-net ]
    depends_on: [ postgres, redis ]
    restart: always

  dashboard-api:
    build: ./services/dashboard_api
    env_file: .env
    ports: [ "8002:8000" ]
    networks: [ public-net, internal-net ]
    depends_on: [ postgres, redis, kafka ]
    restart: always

  scheduler:
    build: ./services/scheduler
    env_file: .env
    volumes: [ "./data:/data" ]   # mounts sample data directory
    networks: [ internal-net ]
    depends_on: [ kafka, redis ]
    restart: always

  csv-ingestion:
    build: ./services/csv_ingestion
    env_file: .env
    volumes: [ "./data:/data" ]
    networks: [ internal-net ]
    depends_on: [ kafka, redis ]
    profiles: [ "manual" ]        # run manually: docker compose run csv-ingestion

  frontend:
    build: ./frontend
    ports: [ "3000:80" ]
    networks: [ public-net ]
    depends_on: [ dashboard-api ]
    restart: always
```

### Per-service `Dockerfile` Pattern

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Non-root user for security
RUN useradd -m appuser && chown -R appuser /app
USER appuser

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## 13. Test Structure & Acceptance Scenario Tests

### Test Pyramid

```
tests/
├── unit/             → Fast, no external deps (mock Redis/Kafka)
│   ├── test_overheating_rule.py
│   ├── test_fault_code_rule.py
│   ├── test_overdue_service_rule.py
│   ├── test_fingerprinter.py
│   ├── test_deduplicator.py
│   ├── test_csv_parser.py
│   └── test_parts_client.py
│
├── integration/      → Requires Redis + Kafka + Postgres (docker-compose.test.yml)
│   ├── test_telemetry_ingest_flow.py
│   ├── test_idempotency_e2e.py
│   └── test_alert_lifecycle.py
│
└── acceptance/       → Full-stack, tests against running docker-compose
    └── test_acceptance_overheating.py    ← PRIMARY ACCEPTANCE TEST
```

### Acceptance Test: Overheating Scenario

```python
# tests/acceptance/test_acceptance_overheating.py

import pytest, httpx, time

BASE_URL  = "http://localhost:8001"   # ingestion-api
DASH_URL  = "http://localhost:8002"   # dashboard-api
VEHICLE   = "VH-ACCEPTANCE-001"

THRESHOLD        = 105.0   # from rules.yaml
CONSECUTIVE      = 3

OVERHEATING_EVENTS = [
    {"vehicle_id": VEHICLE, "timestamp": "2026-09-26T08:00:00Z",
     "engine_temp_c": 106.1, "battery_voltage": 12.4,
     "odometer_km": 50000, "dtc_codes": [], "depot_id": "D-TEST"},
    {"vehicle_id": VEHICLE, "timestamp": "2026-09-26T08:01:00Z",
     "engine_temp_c": 107.8, "battery_voltage": 12.4,
     "odometer_km": 50001, "dtc_codes": [], "depot_id": "D-TEST"},
    {"vehicle_id": VEHICLE, "timestamp": "2026-09-26T08:02:00Z",
     "engine_temp_c": 109.2, "battery_voltage": 12.4,
     "odometer_km": 50002, "dtc_codes": [], "depot_id": "D-TEST"},
]

@pytest.fixture(autouse=True)
def cleanup(db_session):
    yield
    db_session.execute("DELETE FROM maintenance_alerts WHERE vehicle_id = :v",
                        {"v": VEHICLE})
    db_session.commit()


class TestOverheatingAcceptanceScenario:

    def test_three_consecutive_readings_create_one_alert(self):
        """
        GIVEN  3 consecutive engine temp readings above threshold
        WHEN   events are sent to the ingestion API
        THEN   exactly ONE high-priority alert is created
        """
        for event in OVERHEATING_EVENTS:
            r = httpx.post(f"{BASE_URL}/telemetry", json=event,
                           headers={"X-API-Key": "test-key"})
            assert r.status_code == 202, f"Ingest failed: {r.text}"

        time.sleep(3)  # allow pipeline processing

        alerts = httpx.get(
            f"{DASH_URL}/alerts",
            params={"vehicle_id": VEHICLE, "rule_name": "overheating"}
        ).json()["items"]

        assert len(alerts) == 1, f"Expected 1 alert, got {len(alerts)}"
        assert alerts[0]["severity"] == "HIGH"
        assert alerts[0]["status"]   == "OPEN"


    def test_replaying_events_does_not_create_duplicate_alert(self):
        """
        GIVEN  the same 3 overheating events already processed
        WHEN   they are replayed through the ingestion API
        THEN   still exactly ONE alert exists (no duplicate)
        """
        # Send original events
        for event in OVERHEATING_EVENTS:
            httpx.post(f"{BASE_URL}/telemetry", json=event,
                       headers={"X-API-Key": "test-key"})
        time.sleep(3)

        # Replay the same events
        for event in OVERHEATING_EVENTS:
            r = httpx.post(f"{BASE_URL}/telemetry", json=event,
                           headers={"X-API-Key": "test-key"})
            assert r.status_code == 200  # silently deduplicated, not error
        time.sleep(3)

        alerts = httpx.get(
            f"{DASH_URL}/alerts",
            params={"vehicle_id": VEHICLE, "rule_name": "overheating"}
        ).json()["items"]

        assert len(alerts) == 1, \
            f"Expected 1 alert after replay, got {len(alerts)} (idempotency FAILED)"


    def test_parts_api_unavailable_keeps_alert_pending(self, mock_parts_unavailable):
        """
        GIVEN  parts API is unavailable
        WHEN   overheating alert is created
        THEN   alert is visible with parts_status=PENDING
        """
        mock_parts_unavailable()   # sets PARTS_API_MODE=unavailable

        for event in OVERHEATING_EVENTS:
            httpx.post(f"{BASE_URL}/telemetry", json=event,
                       headers={"X-API-Key": "test-key"})
        time.sleep(3)

        alerts = httpx.get(
            f"{DASH_URL}/alerts",
            params={"vehicle_id": VEHICLE}
        ).json()["items"]

        assert len(alerts) == 1
        assert alerts[0]["parts_status"] == "PENDING"
        assert alerts[0]["status"]       == "OPEN"   # still visible
```

---

## 14. Sample Data Files

### `data/sample_telemetry.json`

```json
[
  {"vehicle_id":"VH-001","timestamp":"2026-09-26T08:00:00Z","engine_temp_c":106.1,"battery_voltage":12.4,"odometer_km":50000,"dtc_codes":[],"depot_id":"D01"},
  {"vehicle_id":"VH-001","timestamp":"2026-09-26T08:01:00Z","engine_temp_c":107.8,"battery_voltage":12.3,"odometer_km":50001,"dtc_codes":[],"depot_id":"D01"},
  {"vehicle_id":"VH-001","timestamp":"2026-09-26T08:02:00Z","engine_temp_c":109.2,"battery_voltage":12.3,"odometer_km":50002,"dtc_codes":["P0300"],"depot_id":"D01"},
  {"vehicle_id":"VH-002","timestamp":"2026-09-26T08:00:00Z","engine_temp_c":88.0, "battery_voltage":12.6,"odometer_km":32000,"dtc_codes":[],"depot_id":"D02"},
  {"vehicle_id":"VH-003","timestamp":"2026-09-26T08:00:00Z","engine_temp_c":95.5, "battery_voltage":11.8,"odometer_km":71000,"dtc_codes":["P0171","P0171","P0171"],"depot_id":"D01"}
]
```

### `data/service_records.csv`

```csv
vehicle_id,service_date,service_type,odometer_km,depot_id,technician_id,parts_used,cost_gbp,next_service_km,notes
VH-001,2026-03-01,FULL_SERVICE,45000,D01,TECH-01,"OIL_FILTER,AIR_FILTER",320.00,55000,Annual service
VH-002,2026-06-15,OIL_CHANGE,30000,D02,TECH-02,"OIL_FILTER",85.00,35000,
VH-003,2025-09-01,FULL_SERVICE,60000,D01,TECH-03,"OIL_FILTER,BRAKE_PADS,AIR_FILTER",580.00,70000,Brake wear noted
VH-004,2026-09-01,BRAKE_SERVICE,48000,D03,TECH-04,"BRAKE_PADS,BRAKE_DISCS",420.00,58000,
```

---

## 15. Error Handling & Status Codes

### Ingestion API

| Scenario | HTTP Code | Action |
|----------|-----------|--------|
| Valid new event | 202 | Published to Kafka |
| Duplicate event (deduped) | 200 | Silently dropped |
| Schema validation failure | 400 | Error detail returned |
| Future timestamp (>60s ahead) | 400 | Rejected |
| Missing required field | 422 | Pydantic validation error |
| Invalid API key | 401 | Unauthorized |
| Rate limit exceeded (per-vehicle) | 429 | Retry-After header set |
| Kafka unavailable | 503 | Service Unavailable; client should retry |

### Dashboard API

| Scenario | HTTP Code | Action |
|----------|-----------|--------|
| Resource not found | 404 | `{"error": "not_found"}` |
| Invalid filter param | 400 | Validation detail |
| Unauthorized (bad JWT) | 401 | `{"error": "unauthorized"}` |
| DB unavailable | 503 | Returns stale cache if available |

### Parts API Mock

| Mode | Response |
|------|---------|
| `normal` | 200 with parts data |
| `rate_limited` (every 3rd) | 429 + `Retry-After: 30` |
| `unavailable` | 503 |
| Part not in catalog | 404 |

---

*LLD Version 1.0 — Automotive Fleet Health & Predictive Maintenance Engine*  
*See also: [HLD](./hld.md) | [Task](./Task.md)*
