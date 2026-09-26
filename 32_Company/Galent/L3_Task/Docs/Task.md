# Task 2: Automotive Fleet Health & Predictive Maintenance Engine

## Overview

Design and implement a **production-ready Automotive Fleet Health & Predictive Maintenance Engine** that combines:

- **Real-time vehicle telemetry** (streaming data)
- **Service history** (batch CSV records)
- **Spare-parts availability** (external API)

The system must identify vehicles **at risk of failure** and intelligently **prioritize maintenance** across a fleet.

---

## Goals

| Goal | Description |
|------|-------------|
| Fault-tolerant ingestion | Process streaming telemetry and batch CSV service records reliably |
| Maintenance intelligence | Detect anomalies and generate actionable recommendations |
| Web dashboard | Visualize fleet health, alerts, and maintenance priorities |
| Reliable processing | Prevent duplicates; handle API and webhook failures gracefully |
| Deployment & architecture | Containerized with a robust architectural write-up |

---

## Detailed Requirements

### 1. Fault-Tolerant Ingestion

The system must ingest two types of data:

#### a) Streaming Vehicle Telemetry
Process simulated real-time vehicle sensor data including:
- **Engine temperature** — detect overheating events
- **Battery voltage** — detect power anomalies
- **Odometer readings** — track mileage for service intervals
- **Diagnostic Trouble Codes (DTCs)** — detect recurring fault codes

**Resilience requirements:**
- Handle **schema changes** gracefully (e.g., new or missing fields)
- Deduplicate **duplicate events** (same reading sent multiple times)
- Handle **out-of-order readings** (late-arriving telemetry)
- Respect **external API rate limits** (e.g., spare-parts API throttling)

#### b) Batch CSV Service Records
Ingest historical service records from CSV files alongside the streaming data. This forms the baseline for overdue service detection.

---

### 2. Maintenance Intelligence

Implement a **configurable rule engine** that detects the following conditions:

| Rule | Trigger | Severity |
|------|---------|----------|
| Sustained Overheating | Engine temp exceeds threshold for N consecutive readings | High |
| Repeated Fault Codes | Same DTC appears M times within a time window | Medium–High |
| Overdue Servicing | Odometer or time since last service exceeds threshold | Medium |

For each triggered rule, the system must:

1. **Generate a maintenance recommendation** containing:
   - Severity level (e.g., `HIGH`, `MEDIUM`, `LOW`)
   - Supporting evidence (the readings/events that triggered it)
   - Recommended action

2. **Check spare-parts availability** via a **mocked spare-parts API** before recommending a service slot.
   - If the API is unavailable → mark parts availability as **"pending"**, keep the alert visible.

---

### 3. Web Dashboard

Build a real-time web dashboard that displays:

- **Fleet health overview** — summary of all vehicles and their current status
- **High-risk vehicles** — vehicles with active alerts or critical readings
- **Active alerts** — list of current maintenance alerts with severity badges
- **Maintenance priorities** — ranked list of vehicles needing service

**Filtering support:**
- Filter by **depot** (location/garage)
- Filter by **vehicle** (individual vehicle ID)
- Filter by **severity** (HIGH / MEDIUM / LOW)

**Live updates:** The dashboard must refresh automatically as new telemetry arrives (e.g., via WebSockets or polling).

---

### 4. Reliable Processing

The system must guarantee **exactly-once maintenance alert creation**:

- **Idempotency:** Replaying the same telemetry events must **not** create duplicate maintenance requests/alerts.
- **API failure handling:** If the spare-parts API is unavailable, implement **retries with backoff** and keep the alert in a `pending` state.
- **Webhook reliability:** Handle unreliable service-status webhooks with retry logic and failure recovery (e.g., dead-letter queue or persistent retry store).

---

### 5. Deployment & Architecture

#### Containerization
- Containerize the full application using **Docker**
- Provide a `docker-compose.yml` (or equivalent) to spin up all services locally

#### Architectural Write-Up
The write-up must cover:

| Topic | Details Required |
|-------|-----------------|
| **Data Privacy** | How vehicle and driver/location data is protected (encryption, access control, anonymization) |
| **Observability** | Logging, metrics, and tracing strategy (e.g., structured logs, Prometheus, OpenTelemetry) |
| **Failure Recovery** | How the system recovers from crashes, data loss, or partial failures |
| **Scalability** | Proposed approach to scale to **10+ million daily telemetry events** |

---

## Acceptance Scenario (Example)

> A vehicle reports engine temperatures above a **configurable threshold** for **three consecutive readings**.

**Expected system behavior:**

```
1. System detects 3 consecutive overheating readings for vehicle X.
2. Creates ONE high-priority maintenance alert with:
   - Vehicle ID
   - The 3 supporting readings (timestamps + temperatures)
   - Severity: HIGH
3. Checks spare-parts API:
   - If available  → recommend service slot
   - If unavailable → mark availability as "pending"; alert remains visible
4. Replaying the same 3 events → NO new alert created (idempotency)
```

---

## Submission Checklist

| Deliverable | Description |
|-------------|-------------|
| ✅ **Working code** | Full implementation of the engine |
| ✅ **Docker setup** | `Dockerfile` + `docker-compose.yml` for local deployment |
| ✅ **Sample data** | Sample streaming telemetry events + CSV service records |
| ✅ **Dashboard** | Functional web UI showing fleet health and alerts |
| ✅ **Tests** | Automated tests covering the acceptance scenario |
| ✅ **Architecture note** | Short write-up on privacy, observability, recovery, and scaling |

---

## Key Design Considerations

### Idempotency Strategy
Use a **fingerprint/hash** of the triggering event window (vehicle ID + reading timestamps + rule ID) stored in a persistent store (e.g., Redis, DB) to prevent duplicate alert creation.

### Streaming vs Batch
Consider using an event-streaming backbone (e.g., **Kafka**, **Redis Streams**, or a simple in-memory queue for local dev) to unify streaming telemetry and batch ingestion into a single processing pipeline.

### Rule Engine
Rules should be **configurable** (e.g., via YAML/JSON config) so thresholds (temperature limit, consecutive count, service interval) can be changed without code changes.

### Mocked External APIs
The spare-parts API should be mocked using a stub/fake server that can simulate:
- Normal responses
- Rate-limited responses (`429`)
- Unavailable responses (`503`)

### Scaling to 10M+ Daily Events
- ~115 events/second average throughput
- Use **horizontal scaling** of ingestion workers
- **Partitioned processing** by vehicle ID to maintain ordering
- **Time-series database** (e.g., InfluxDB, TimescaleDB) for efficient telemetry storage and querying

---

## Suggested Tech Stack

| Layer | Options |
|-------|---------|
| Backend | Python (FastAPI / Flask) or Node.js |
| Streaming | Kafka / Redis Streams / in-memory queue |
| Database | PostgreSQL + TimescaleDB or SQLite (for local dev) |
| Cache / Idempotency store | Redis |
| Dashboard | React / Vue / plain HTML+JS with WebSocket or SSE |
| Containerization | Docker + Docker Compose |
| Testing | pytest / Jest |

---

*Created: 2026-09-26 | Task Source: [Task.txt](./Task.txt)*
