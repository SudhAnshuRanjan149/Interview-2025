# Architecture Note — Automotive Fleet Health & Predictive Maintenance Engine

> **Version:** 1.0 | **Date:** 2026-09-26  
> **Author:** Engineering Team

---

## 1. Privacy & Data Protection

### Vehicle and Location Data

Fleet telemetry contains sensitive operational data including vehicle identifiers, depot locations, odometer readings, and fault codes. The system applies the following protections:

| Layer | Mechanism |
|-------|-----------|
| **Pseudonymization** | `vehicle_id` values are opaque identifiers (e.g. `VH-001`), never raw chassis numbers or license plates. PII mapping is kept in a separate identity store outside this system. |
| **Transport Encryption** | All inter-service communication travels over the internal Docker network (`internal-net`). In production, mTLS is enforced on all Kafka brokers, Postgres, and Redis connections. |
| **API Authentication** | Ingestion API uses HMAC-verified API keys (`X-API-Key`). Dashboard API uses JWT Bearer tokens. Webhook Receiver validates HMAC-SHA256 signatures on every inbound payload. |
| **Role-Based Access Control** | Dashboard API routes enforce JWT claims: `role=viewer` (read-only), `role=operator` (ACK/Resolve), `role=admin` (all). |
| **Database Encryption** | Postgres `telemetry_readings` and `maintenance_alerts` tables use column-level encryption for PII fields (AES-256) in production deployments. |
| **Audit Logging** | Every `PATCH /alerts/{id}` and webhook state change is written to the `audit_log` table with user identity and timestamp. |
| **Data Retention** | Telemetry readings are stored in a TimescaleDB hypertable with an automatic 90-day retention policy via `drop_chunks()`. Alerts are retained for 2 years. |

---

## 2. Observability

### Metrics (Prometheus)

| Metric | Type | Description |
|--------|------|-------------|
| `telemetry_events_total` | Counter | Events accepted, deduplicated, rejected |
| `alert_triggers_total` | Counter | By rule_name and severity |
| `parts_api_requests_total` | Counter | By status code (200/429/503) |
| `parts_api_latency_seconds` | Histogram | Response time distribution |
| `kafka_consumer_lag` | Gauge | Per consumer group and topic |
| `alert_pipeline_latency_seconds` | Histogram | Time from telemetry event → alert persisted |
| `retry_queue_depth` | Gauge | Outstanding PENDING alerts in Redis ZSet |
| `ws_active_connections` | Gauge | Live WebSocket clients |

In production these are scraped by a Prometheus sidecar and visualised in Grafana dashboards.

### Structured Logging

All services emit JSON-structured logs with the following standard fields:

```json
{
  "timestamp": "2026-09-26T08:01:23.456Z",
  "level": "INFO",
  "service": "rule_engine",
  "vehicle_id": "VH-001",
  "event": "alert_trigger_published",
  "rule_name": "overheating",
  "fingerprint": "9e16c1..."
}
```

Log aggregation via the ELK stack (Elasticsearch + Logstash + Kibana) enables full-text search and correlation across services.

### Distributed Tracing

OpenTelemetry (OTel) SDK is integrated across all Python services. A `trace_id` is propagated via Kafka message headers, allowing a single telemetry event to be traced through:

```
Ingestion API → Kafka → Rule Engine → Kafka → Alert Processor → Parts API
```

Traces are exported to Jaeger for visualisation.

---

## 3. Failure Recovery

### Component Failure Matrix

| Component | Failure Mode | Recovery Strategy |
|-----------|-------------|-------------------|
| **Kafka** | Broker crash | KRaft replication (factor=3 in production); consumer groups replay from last committed offset. Local dev uses single-broker with `auto.create.topics=true`. |
| **Ingestion API** | Pod crash | Stateless; load balancer reroutes to healthy replica. Redis dedup key prevents re-processing of any events that already committed. |
| **Rule Engine** | Crash mid-window | In-memory window state is rebuilt from Kafka replay on restart. Window TTL of 1h limits replay scope. |
| **Alert Processor** | Crash before DB write | Kafka offset not committed until after DB insert — message is re-consumed on restart. `fingerprint` UNIQUE constraint prevents duplicate rows. |
| **Parts API** | Rate-limited or down | Exponential backoff (5s → 10s → 20s → 40s → 80s, max 5 attempts). Failed alerts stored as `PENDING` in DB. Redis ZSet retry queue allows background job to recover them every 5 minutes. |
| **Postgres** | Connection pool exhausted | SQLAlchemy `pool_pre_ping=True`; automatic reconnect with jitter. Read replicas serve Dashboard API during heavy load. |
| **Redis** | Eviction | Keys are non-critical cache/dedup; on miss the system falls back to DB lookup or accepts the event and lets the DB unique constraint guard idempotency. |
| **Webhook Receiver** | Processing failure | Write-first pattern: raw payload written to `webhook_events` before any processing. Retry counter incremented on each attempt; after 5 failures event moved to Redis DLQ (`dlq:webhooks`). |
| **Dashboard API** | WebSocket disconnection | Client-side auto-reconnect (3s delay, exponential backoff). Server-side heartbeat (PING every 30s) detects and evicts dead connections. |

---

## 4. Scaling to 10M+ Daily Events

### Throughput Math

- **10M events/day** = ~116 events/second average, ~580 events/second at 5× peak
- **Kafka `telemetry.raw`** partitioned at **20 partitions** → 20 parallel Rule Engine consumers possible
- **Each partition** handles ~29 events/second average; well within Kafka's single-partition throughput (10K–100K msg/s)

### Horizontal Scaling Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                   PRODUCTION TOPOLOGY                        │
│                                                             │
│  Ingestion API ×N  ──►  Kafka (20 partitions, 3 brokers)   │
│      │                       │                              │
│  API Gateway              Rule Engine ×20 consumers         │
│  (rate limit, auth)           │                             │
│                         alerts.notifications                 │
│                         (10 partitions)                      │
│                               │                             │
│                         Alert Processor ×10 consumers        │
│                               │                             │
│                           Postgres (1 primary + 2 replicas) │
│                           TimescaleDB continuous aggregates  │
│                                                             │
│  Dashboard API ×N  ────►  Redis Cluster (read-through)      │
│  (WebSocket sharded           │                             │
│   by depot_id)           Fleet Health Cache (TTL 10s)       │
└─────────────────────────────────────────────────────────────┘
```

### Key Scaling Decisions

| Concern | Approach |
|---------|----------|
| **Kafka partitioning** | `vehicle_id`-keyed partitioning ensures all events for a vehicle go to the same partition, preserving ordering for the Rule Engine's stateful window. |
| **Rule Engine state** | Each consumer instance owns a subset of vehicle_ids (via partition assignment). No cross-instance coordination needed. |
| **Database writes** | Batch inserts for `telemetry_readings` via `COPY` protocol. TimescaleDB hypertable chunk compression reduces storage 10–20×. |
| **Read scaling** | Dashboard API uses Redis caching (10s TTL) to absorb read spikes. `GET /fleet/health` serves thousands of concurrent dashboard clients from cache. |
| **Alert deduplication** | Redis SETNX is O(1); fingerprint check adds ~1ms latency per alert regardless of total alert volume. |
| **Parts API rate limit** | Redis sliding-window counter (`ratelimit:parts_api:{minute_bucket}`) ensures the system never exceeds the 3rd-party API's quota even at peak throughput. |
| **WebSocket fan-out** | At scale, WebSocket connections are sharded by `depot_id`. Each Dashboard API pod owns a depot range; a lightweight Redis Pub/Sub bus propagates cross-shard broadcasts. |

### Storage Estimate

| Table | Rows/Day | Row Size | Daily Storage |
|-------|----------|----------|---------------|
| `telemetry_readings` | 10M | ~200 bytes | ~2 GB/day |
| `maintenance_alerts` | ~5,000 | ~2 KB | ~10 MB/day |
| `service_records` | ~1,000 | ~500 bytes | ~500 KB/day |
| **Compressed (TimescaleDB)** | — | 10× ratio | **~200 MB/day** |

At 200 MB/day compressed, a 90-day retention window requires ~18 GB of Postgres storage — manageable on a single well-provisioned instance; sharding only needed beyond ~100M events/day.

---

## 5. Technology Choices & Rationale

| Technology | Rationale |
|------------|-----------|
| **Kafka (KRaft)** | Durable, partitioned event log; built-in replay; vehicle_id partitioning gives deterministic ordering. No Zookeeper dependency simplifies operations. |
| **TimescaleDB** | Native time-series optimisations (hypertables, continuous aggregates, chunk compression) on top of familiar Postgres SQL. |
| **Redis** | Sub-millisecond SETNX for idempotency; Sorted Sets for retry scheduling; TTL-based key expiry for dedup windows. |
| **FastAPI + aiokafka** | Fully async Python stack; native async context managers for clean startup/shutdown of Kafka producers/consumers. |
| **Alembic** | Version-controlled schema migrations; idempotent `upgrade head` safe to run on every container start. |
| **APScheduler** | Lightweight in-process scheduler; no additional infrastructure for CSV ingestion and retry cron jobs. |

---

*Architecture Note v1.0 — Automotive Fleet Health & Predictive Maintenance Engine*
