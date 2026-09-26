# 🎯 Interview Demo Guide — Fleet Health & Predictive Maintenance Engine

> **Written in simple English. No jargon. Step by step.**  
> Read this once before the interview. You'll be confident.

---

## 🧠 First — Understand What You Built (In Plain English)

Imagine you run a company with **500 buses/trucks**. Your job is to make sure none of them break down on the road.

**The old way:** A mechanic manually checks each vehicle. By the time he finds a problem, the vehicle has already broken down.

**What you built:** A **smart computer system** that:
1. Every vehicle sends its health data (engine temperature, error codes, distance driven) every few seconds — automatically
2. Your system **reads all this data in real-time**
3. If something looks dangerous (e.g. engine getting too hot for 3 readings in a row), the system **immediately creates an alert**
4. The alert checks: "Do we have the spare parts in stock?"
5. The fleet manager **sees the alert on a live dashboard** on their screen
6. They can send a mechanic before the vehicle breaks down

**That's it. That's the whole system.**

---

## 🗺️ The 6 Layers — Explain Like a Factory Assembly Line

Think of it like a **factory assembly line** where each station does one job:

```
🚐 Vehicle
    │  (sends data every few seconds)
    ▼
📥 STATION 1: Ingestion API  →  "The Security Guard"
    │  (checks if data is valid, rejects fakes/duplicates)
    ▼
📨 STATION 2: Kafka  →  "The Post Office / Conveyor Belt"
    │  (stores messages, delivers them to next station)
    ▼
🧠 STATION 3: Rule Engine  →  "The Smart Doctor"
    │  (reads data, applies rules: is this dangerous?)
    ▼
🚨 STATION 4: Alert Processor  →  "The Office Manager"
    │  (creates alert record, checks spare parts, saves to database)
    ▼
📊 STATION 5: Dashboard API + Frontend  →  "The Control Room TV"
    │  (shows all alerts live on screen, updates automatically)
    ▼
👨‍💼 Fleet Manager sees alert on screen → sends mechanic → vehicle saved!
```

---

## 🌍 Where Would Each Part Be Deployed in Real Life?

This is a great question an interviewer might ask. Here's your answer:

| What you built | Where it runs in real life | Simple explanation |
|----------------|---------------------------|-------------------|
| **Vehicle data sender** | Inside the vehicle (IoT device / OBD reader) | Like a FitBit, but for trucks |
| **Ingestion API** | Cloud (AWS/GCP) — multiple copies running | The front door that accepts data from 500 vehicles at once |
| **Kafka** | Cloud managed service (AWS MSK or Confluent Cloud) | A super fast email inbox that never loses messages |
| **Rule Engine** | Cloud — multiple copies, one per group of vehicles | The doctors watching patients in ICU |
| **Alert Processor** | Cloud — with auto-scaling | Office workers processing paperwork |
| **Database (Postgres)** | Cloud managed DB (AWS RDS or Google Cloud SQL) | The filing cabinet that stores all records forever |
| **Redis** | Cloud managed (AWS ElastiCache) | A super fast sticky note board (temporary memory) |
| **Parts API** | Your spare parts supplier's server | You call them to check if they have the part in stock |
| **Dashboard** | Web browser — fleet manager opens it on their laptop | Like a website, open in Chrome |

**In your demo:** All of these run locally on your laptop inside Docker containers. Think of Docker as a "mini-computer inside your computer" for each service.

---

## 🖥️ Before the Interview — Setup Checklist

Do this **30 minutes before** the interview starts:

```bash
# Step 1: Open Terminal and go to the project folder
cd /Users/priyaupadhyay/Desktop/sudhanshu/Job_search/Galent/L3_Task

# Step 2: Start the entire system with ONE command
make up

# Step 3: Wait about 2-3 minutes for everything to start
# You'll see lots of text scrolling — that's normal

# Step 4: Check everything is running (should show 11 containers)
docker compose ps

# Step 5: Open the dashboard in your browser
# Go to: http://localhost:3000
```

✅ If you see the dashboard with a dark theme and a header saying "Fleet Health" — you're ready.

---

## 🎬 The Demo Script — Step by Step

### STEP 1: Open Your Browser + Terminal Side by Side

- **Left half of screen:** Browser at `http://localhost:3000` (the dashboard)
- **Right half of screen:** Terminal window

This way the interviewer can see data arriving in real-time.

---

### STEP 2: Start Talking — The Big Picture (2 minutes)

Say something like this:

> *"So what I've built is a real-time fleet monitoring system. Imagine you have 500 vehicles — buses, trucks, delivery vans. Each vehicle sends its health data — engine temperature, battery voltage, error codes — every few seconds. My system receives this data, analyses it using business rules, and if something dangerous is detected, it immediately creates an alert that the fleet manager sees on this dashboard."*

Then point to the screen and say:
> *"This is the live dashboard. Right now it's empty because no data has come in yet. Let me show you the entire flow working."*

---

### STEP 3: Show the Architecture (2 minutes)

Draw this on paper or show the diagram from README:

```
Vehicle → Ingestion API → Kafka → Rule Engine → Alert Processor → Database
                                                                        ↓
                                              Fleet Manager ← Dashboard API
```

Explain each box in one sentence:
- **Ingestion API** = "The front door. Validates and accepts telemetry data."
- **Kafka** = "A message queue. Like a conveyor belt — data goes in, nothing gets lost."
- **Rule Engine** = "The brain. Reads the rules from a config file and decides: is this an emergency?"
- **Alert Processor** = "Creates the alert, saves it to database, and checks if spare parts are available."
- **Dashboard** = "Live screen for the fleet manager."

---

### STEP 4: Show the Rules Config (1 minute)

Open this file and show it:
```
config/rules.yaml
```

Say:
> *"The business rules are not hardcoded in the code. They live in this YAML file. So if the business decides 'change the overheating threshold from 105°C to 110°C', they just change this file — no code change needed, no deployment."*

Point to the three rules:
1. **Overheating** — Engine temp above 105°C for 3 readings in a row → HIGH alert
2. **Fault Code** — Same error code appears 3+ times in 60 minutes → MEDIUM alert
3. **Overdue Service** — Vehicle has driven 10,000 km since last service OR 180+ days → LOW alert

---

### STEP 5: SEND REAL DATA — The Live Demo (3 minutes)

This is the most impressive part. Copy-paste these commands in the terminal:

```bash
# Get current timestamps (vehicles send NOW, not future)
T1=$(date -u -v-2M +"%Y-%m-%dT%H:%M:%SZ")
T2=$(date -u -v-1M +"%Y-%m-%dT%H:%M:%SZ")
NOW=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Send 3 temperature readings for vehicle VH-DEMO
# All above 105°C — this should trigger overheating alert
curl -X POST http://localhost:8001/telemetry/batch \
  -H "X-API-Key: dev-api-key" \
  -H "Content-Type: application/json" \
  -d "{\"events\":[
    {\"vehicle_id\":\"VH-DEMO\",\"timestamp\":\"$T1\",\"engine_temp_c\":108.0,\"battery_voltage\":12.4,\"odometer_km\":50000,\"dtc_codes\":[],\"depot_id\":\"D01\"},
    {\"vehicle_id\":\"VH-DEMO\",\"timestamp\":\"$T2\",\"engine_temp_c\":109.5,\"battery_voltage\":12.3,\"odometer_km\":50001,\"dtc_codes\":[],\"depot_id\":\"D01\"},
    {\"vehicle_id\":\"VH-DEMO\",\"timestamp\":\"$NOW\",\"engine_temp_c\":111.0,\"battery_voltage\":12.1,\"odometer_km\":50002,\"dtc_codes\":[],\"depot_id\":\"D01\"}
  ]}"
```

You'll see: `{"accepted": 3, "duplicates": 0, "errors": 0}`

Say:
> *"I just sent 3 temperature readings for vehicle VH-DEMO. All three are above 105°C. Now watch the dashboard..."*

**Wait 10-15 seconds** (the data travels: API → Kafka → Rule Engine → Alert Processor → Database → Dashboard).

The alert will appear on the dashboard automatically! 🎉

Point to it and say:
> *"There it is. HIGH severity alert. Vehicle VH-DEMO. Overheating rule triggered. You can see the evidence — all 3 readings. And it already checked the spare parts — parts are AVAILABLE with 4-day lead time."*

---

### STEP 6: Show Idempotency — "No Duplicate Alerts" (1 minute)

Send the EXACT same data again:
```bash
# Send the same 3 readings again
curl -X POST http://localhost:8001/telemetry/batch \
  -H "X-API-Key: dev-api-key" \
  -H "Content-Type: application/json" \
  -d "{\"events\":[
    {\"vehicle_id\":\"VH-DEMO\",\"timestamp\":\"$T1\",\"engine_temp_c\":108.0,\"battery_voltage\":12.4,\"odometer_km\":50000,\"dtc_codes\":[],\"depot_id\":\"D01\"},
    {\"vehicle_id\":\"VH-DEMO\",\"timestamp\":\"$T2\",\"engine_temp_c\":109.5,\"battery_voltage\":12.3,\"odometer_km\":50001,\"dtc_codes\":[],\"depot_id\":\"D01\"},
    {\"vehicle_id\":\"VH-DEMO\",\"timestamp\":\"$NOW\",\"engine_temp_c\":111.0,\"battery_voltage\":12.1,\"odometer_km\":50002,\"dtc_codes\":[],\"depot_id\":\"D01\"}
  ]}"
```

Notice: **NO new alert appears on dashboard.** Same alert count.

Say:
> *"This is called idempotency. Even if the vehicle sends the same data twice — maybe due to a network glitch — the system is smart enough to not create duplicate alerts. It uses a SHA256 fingerprint stored in Redis to detect this. Same event window always produces the same fingerprint."*

---

### STEP 7: Show Parts API Failure Scenario (1 minute)

First, simulate the parts API being down:
```bash
curl -X POST http://localhost:8003/mock/mode \
  -H "Content-Type: application/json" \
  -d '{"mode": "unavailable"}'
```

Now send a new vehicle's data:
```bash
T1=$(date -u -v-3M +"%Y-%m-%dT%H:%M:%SZ")
T2=$(date -u -v-2M +"%Y-%m-%dT%H:%M:%SZ")
T3=$(date -u -v-1M +"%Y-%m-%dT%H:%M:%SZ")

curl -X POST http://localhost:8001/telemetry/batch \
  -H "X-API-Key: dev-api-key" \
  -H "Content-Type: application/json" \
  -d "{\"events\":[
    {\"vehicle_id\":\"VH-PARTS-TEST\",\"timestamp\":\"$T1\",\"engine_temp_c\":108,\"battery_voltage\":12.4,\"odometer_km\":60000,\"dtc_codes\":[],\"depot_id\":\"D02\"},
    {\"vehicle_id\":\"VH-PARTS-TEST\",\"timestamp\":\"$T2\",\"engine_temp_c\":109,\"battery_voltage\":12.3,\"odometer_km\":60001,\"dtc_codes\":[],\"depot_id\":\"D02\"},
    {\"vehicle_id\":\"VH-PARTS-TEST\",\"timestamp\":\"$T3\",\"engine_temp_c\":110,\"battery_voltage\":12.1,\"odometer_km\":60002,\"dtc_codes\":[],\"depot_id\":\"D02\"}
  ]}"
```

After 15 seconds, the new alert appears but with **parts_status: PENDING** instead of AVAILABLE.

Say:
> *"Even when the spare parts supplier's API is down, the alert is still created. It just shows PENDING status. The system has a retry queue — it will automatically try again every 5 minutes, up to 5 times. This is the fault-tolerance design."*

Restore parts API:
```bash
curl -X POST http://localhost:8003/mock/mode \
  -H "Content-Type: application/json" \
  -d '{"mode": "normal"}'
```

---

### STEP 8: Show the Unit Tests (1 minute)

```bash
make test-unit
```

35 tests will run and all pass in under 1 second.

Say:
> *"These are unit tests for the core business logic — all three rules, the fingerprinting system, and the window manager. They run without needing Docker or any database — pure logic tests."*

---

### STEP 9: Show the Code Structure (2 minutes)

Open VS Code or just show the folder in Finder. Walk through quickly:

```
services/
├── ingestion_api/    ← "The front door"
├── rule_engine/      ← "The brain — 3 rules in YAML config"
├── alert_processor/  ← "Creates alerts, retries, saves to DB"
├── dashboard_api/    ← "REST + WebSocket API for frontend"
├── parts_api_mock/   ← "Fake spare parts supplier for testing"
├── scheduler/        ← "Auto-runs jobs every 5 minutes"
└── webhook_receiver/ ← "Receives callbacks from service centres"
```

Open `services/rule_engine/app/engine/rules/overheating.py` and show:
> *"This is the overheating rule. It reads the last 3 temperature readings. If all 3 are above 105°C, it returns a trigger. The threshold and the number 3 come from the YAML config — not hardcoded."*

---

## ❓ Questions the Interviewer Will Ask — Your Answers

### Q: "Why did you use Kafka instead of just a direct API call?"

> *"Because Kafka is a buffer. If the Rule Engine crashes or is slow, messages don't get lost — they wait in Kafka. Also, if we need to scale to 500 vehicles sending data every second, Kafka handles millions of messages per second. A direct API call would timeout under that load. Also, different services can consume the same message independently — the Rule Engine and the Dashboard can both read from the same topic without knowing about each other."*

---

### Q: "What happens if the Rule Engine crashes in the middle of processing?"

> *"Kafka tracks where each consumer left off — this is called an 'offset'. The Rule Engine only marks a message as 'processed' AFTER it has successfully handled it and saved the fingerprint to Redis. So if it crashes before that, on restart it picks up from where it left off and processes the message again. No data is lost."*

---

### Q: "How does the system prevent duplicate alerts?"

> *"Two layers of protection:*
> 1. *Redis — when an alert is about to be published, we compute a SHA256 fingerprint (hash of vehicle ID + rule name + evidence). We check Redis first. If fingerprint exists — skip it. This is fast, sub-millisecond.*
> 2. *Database — the fingerprint column has a UNIQUE constraint. Even if somehow two identical alerts race into the DB at the same time, only one will succeed. The other gets a UniqueViolation error which we catch gracefully."*

---

### Q: "How would this scale to 10 million events per day?"

> *"10 million per day is about 115 events per second. Kafka's `telemetry.raw` topic has 20 partitions — so we can run 20 Rule Engine instances in parallel, each handling a subset of vehicles. Vehicle IDs are used as partition keys, so all events for one vehicle always go to the same partition — maintaining order. For the database, we use TimescaleDB which is optimised for time-series data and can compress it 10–20× automatically."*

---

### Q: "Why Redis?"

> *"Redis is used for three things:*
> 1. *Deduplication — checking fingerprints in under 1ms*
> 2. *Rate limiting — counting how many times we've called the Parts API per minute*
> 3. *Retry queue — a sorted set where we store failed alert IDs with the timestamp for when to retry them. It's like a scheduled task queue."*

---

### Q: "What is TimescaleDB and why not plain Postgres?"

> *"TimescaleDB is Postgres with superpowers for time-series data. Regular Postgres slows down when you have billions of rows in a time-ordered table. TimescaleDB automatically splits the table into chunks by time period, compresses old chunks, and has built-in functions for time-series queries like 'average temperature per hour'. Under the hood it's still Postgres — so we use the same SQL and same tools."*

---

### Q: "What is the WebSocket for in the dashboard?"

> *"WebSocket is a persistent connection between the browser and the server. Instead of the browser asking 'any new alerts?' every 5 seconds (polling), the server pushes the alert to the browser the moment it's created. So the fleet manager sees the alert within seconds of it being generated — not 5 seconds later. The Dashboard API has a Kafka consumer that reads new alerts and broadcasts them to all connected browsers instantly."*

---

## 🎯 Key Points to Emphasise

These are the things that show you're a **strong engineer**, not just a code writer:

1. **"The rules are configurable in YAML"** — shows you thought about operations
2. **"Two layers of idempotency"** — shows you thought about edge cases
3. **"Kafka offset commit only after processing"** — shows you understand distributed systems
4. **"Write-first for webhooks"** — shows you thought about failure recovery
5. **"Parts API has exponential backoff"** — shows you handle external failures gracefully
6. **"TimescaleDB hypertable"** — shows you thought about scale from day one
7. **"Vehicle ID as Kafka partition key"** — shows you understand ordering requirements
8. **"All services have their own consumer group ID"** — shows you debugged and fixed real issues

---

## 🚨 Things to Avoid Saying

❌ Don't say "it's just a demo"  
❌ Don't say "I didn't have time for X" — say "X is on the backlog, the core flow is complete"  
❌ Don't apologise for missing features — pivot to what works  
❌ Don't read from the screen — know the flow by heart  

---

## ✅ Quick Reference — Commands to Know by Heart

```bash
make up                    # Start everything
make down                  # Stop everything
make logs                  # See all logs
make test-unit             # Run 35 unit tests
docker compose ps          # Check all containers

# Check alert was created
curl "http://localhost:8002/alerts" -H "Authorization: Bearer dev-dashboard-token"

# Switch parts API to unavailable
curl -X POST http://localhost:8003/mock/mode -H "Content-Type: application/json" -d '{"mode":"unavailable"}'

# Switch parts API back to normal
curl -X POST http://localhost:8003/mock/mode -H "Content-Type: application/json" -d '{"mode":"normal"}'
```

**Dashboard URL:** http://localhost:3000  
**Ingestion API docs:** http://localhost:8001/docs  
**Dashboard API docs:** http://localhost:8002/docs  

---

## 🕐 Timing Guide for a 15-Minute Interview Slot

| Time | What to do |
|------|-----------|
| 0:00–2:00 | Explain the problem and your solution in plain English |
| 2:00–4:00 | Draw/show the architecture diagram, explain each layer |
| 4:00–5:00 | Show `config/rules.yaml` — explain configurable rules |
| 5:00–8:00 | **Live demo** — send data, show alert appear on dashboard |
| 8:00–9:00 | Show idempotency — send same data again, no duplicate |
| 9:00–10:00 | Show parts API failure — PENDING status alert |
| 10:00–11:00 | Run `make test-unit` — show 35 tests passing |
| 11:00–13:00 | Walk through key code files |
| 13:00–15:00 | Answer questions |

---

*Good luck! You've built something genuinely impressive. Be confident.*
