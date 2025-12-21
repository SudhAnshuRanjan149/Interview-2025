# Kafka Node.js Microservices POC

> **A production-ready demonstration of event-driven microservices architecture using Apache Kafka, Node.js, and Docker**

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture](#️-architecture)
- [Key Features](#-key-features)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Testing the Flow](#-testing-the-flow)
- [Kafka Topics](#-kafka-topics)
- [Monitoring and Debugging](#-monitoring-and-debugging)
- [Configuration](#️-configuration)
- [Troubleshooting](#-troubleshooting)
- [Next Steps](#-next-steps)
- [Technology Stack](#️-technology-stack)

---

## 📖 Overview


This POC demonstrates **event-driven communication** between two Node.js microservices using Apache Kafka as the message broker. The implementation showcases:


- ✅ **Asynchronous request handling** via Kafka topics

- ✅ **Dead Letter Topic (DLT)** pattern for failure handling

- ✅ **Clean architecture** with separation of concerns

- ✅ **Graceful shutdown** and error handling

- ✅ **Schema validation** using Zod

- ✅ **KRaft mode** Kafka (no ZooKeeper dependency)


### Use Case: Order Processing System


The POC simulates an e-commerce order processing flow where:

1. **Service A** (Orders Service) receives order requests via REST API

2. Orders are published to Kafka for async processing

3. **Service B** (Payments Service) processes payments

4. Payment results are sent back to Service A via Kafka

5. Failed processing attempts are routed to a Dead Letter Topic


---


## 🏗️ Architecture


### High-Level Flow


```

┌─────────────┐                    ┌───────────┐                    ┌─────────────┐

│  Service A  │                    │   Kafka   │                    │  Service B  │

│  (Orders)   │                    │  Broker   │                    │  (Payments) │

│  Producer/  │                    │  (KRaft)  │                    │  Consumer/  │

│  Consumer   │                    │           │                    │  Producer   │

└──────┬──────┘                    └─────┬─────┘                    └──────┬──────┘

       │                                 │                                 │

       │ 1. POST /orders                 │                                 │

       │    (HTTP Request)               │                                 │

       │────────────────────────────────>│                                 │

       │                                 │                                 │

       │ 2. Produce ORDER_CREATED        │                                 │

       │    to 'orders' topic            │                                 │

       │────────────────────────────────>│                                 │

       │    (key: orderId)               │                                 │

       │                                 │                                 │

       │                                 │ 3. Consume ORDER_CREATED        │

       │                                 │    from 'orders'                │

       │                                 │<────────────────────────────────│

       │                                 │                                 │

       │                                 │ 4. Process Payment              │

       │                                 │    (Business Logic)             │

       │                                 │    • Validate event             │

       │                                 │    • Simulate payment           │

       │                                 │    • 80% success rate           │

       │                                 │                                 │

       │                                 │ 5a. On Success:                 │

       │                                 │     Produce PAYMENT_COMPLETED   │

       │                                 │<────────────────────────────────│

       │                                 │     to 'payments' topic         │

       │                                 │                                 │

       │                                 │ 5b. On Failure:                 │

       │                                 │     Produce to 'orders.DLT'     │

       │                                 │<────────────────────────────────│

       │                                 │                                 │

       │ 6. Consume PAYMENT_COMPLETED    │                                 │

       │    from 'payments'              │                                 │

       │<────────────────────────────────│                                 │

       │                                 │                                 │

       │ 7. Update Order Status          │                                 │

       │    (in-memory store)            │                                 │

       │                                 │                                 │

```


### Components


#### 1. **Kafka Broker**

- Runs in **KRaft mode** (no ZooKeeper dependency)

- Uses Confluent Kafka image `7.6.0`

- Single broker setup for POC

- PLAINTEXT listener on `kafka:9092`

- Auto-creates 3 topics with 3 partitions each


#### 2. **Service A - Orders Service**

- **Technology**: Node.js + Express

- **Port**: 3001

- **Role**: Producer & Consumer


**REST API Endpoints:**

| Method | Endpoint | Description |

|--------|----------|-------------|

| POST | `/orders` | Create new order (returns 202 Accepted) |

| GET | `/orders/:id` | Retrieve order status by ID |

| GET | `/health` | Health check endpoint |


**Kafka Operations:**

- **Produces to**: `orders` topic (ORDER_CREATED events)

- **Consumes from**: `payments` topic (PAYMENT_COMPLETED events)

- **State Management**: In-memory Map (use database in production)


#### 3. **Service B - Payments Service**

- **Technology**: Node.js + Express

- **Port**: 3002

- **Role**: Consumer & Producer


**REST API Endpoints:**

| Method | Endpoint | Description |

|--------|----------|-------------|

| GET | `/health` | Health check endpoint |


**Kafka Operations:**

- **Consumes from**: `orders` topic (ORDER_CREATED events)

- **Produces to**: `payments` topic (success) or `orders.DLT` (failure)

- **Business Logic**:

  - Validates incoming events with Zod schemas

  - Simulates payment processing (80% success rate)

  - Implements retry and DLT pattern for failures


---


## ✨ Key Features

Event-driven communication between microservices using Kafka topics.

### 🎯 Architecture Patterns

- ✅ **Event-Driven Architecture** - Loose coupling between services
- ✅ **Dead Letter Topic (DLT)** - Automatic failure handling and retry capability
- ✅ **Idempotency** - Key-based partitioning ensures order consistency
- ✅ **Graceful Shutdown** - Proper cleanup of Kafka connections
- ✅ **Async Processing** - Non-blocking order processing

### 🔧 Technical Implementation

- ✅ **KafkaJS** - Modern, feature-rich Kafka client for Node.js
- ✅ **Zod Schema Validation** - Type-safe event validation
- ✅ **Winston Logging** - Structured logging for observability
- ✅ **Helmet** - Security headers for Express apps
- ✅ **CORS Support** - Cross-origin resource sharing enabled
- ✅ **Clean Architecture** - Separation of concerns (routes, kafka, utils, config)

### 📊 Kafka Features

- ✅ **Multiple Partitions** - All topics use 3 partitions for scalability
- ✅ **Consumer Groups** - Parallel processing capability
- ✅ **Key-Based Partitioning** - Same orderId always goes to same partition
- ✅ **Automatic Topic Creation** - Topics created on startup
- ✅ **Health Checks** - Docker health checks for reliable startup

**Topic design:** orders, payments, orders.DLT, each with multiple partitions.

**Producer / Consumer patterns** in Node.js using KafkaJS.

**Asynchronous, decoupled request flow** (HTTP → Kafka → Kafka → HTTP).

**Dead-letter topic** (orders.DLT) to capture failed processing attempts.

**Express app hardening basics:**
- helmet for security headers.
- Centralized error handling.
- JSON body size limits and structured logging.
- Graceful shutdown for services (closing Kafka producers/consumers on SIGINT/SIGTERM).

This POC intentionally focuses first on functionality and architecture; security can later be enhanced with SASL/TLS and ACLs.

---

## 📁 Project Structure

```text
kafka-poc/
├── docker-compose.yml
├── kafka/
│   └── (optional: config/, certs/ for more advanced setups)
├── service-a/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── index.js          # Entry point: starts Express + Kafka clients
│       ├── app.js            # Express app configuration
│       ├── config/
│       │   └── env.js        # Environment variable validation
│       ├── kafka/
│       │   ├── client.js     # KafkaJS client config
│       │   ├── producer.js   # Producer wrapper
│       │   └── consumer.js   # Consumer wrapper
│       ├── routes/
│       │   └── orders.js     # /orders endpoints + payment event handler
│       └── utils/
│           └── logger.js     # Winston logger
└── service-b/
    ├── Dockerfile
    ├── package.json
    └── src/
        ├── index.js          # Entry point
        ├── app.js            # Express app
        ├── config/
        │   └── env.js
        ├── kafka/
        │   ├── client.js
        │   ├── producer.js
        │   └── consumer.js
        ├── processors/
        │   └── orderProcessor.js  # Consumes orders, creates payments/DLT
        └── utils/
            └── logger.js
```

---

## How It Works (Step-by-Step)

### 1. Service A: Creating an order

Client calls POST /orders on Service A with JSON body:

```json
{
  "orderId": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "user-123",
  "amount": 99.99,
  "currency": "USD",
  "items": [
    {
      "productId": "prod-001",
      "quantity": 2,
      "price": 49.995
    }
  ]
}
```

Service A:

- Validates the body with a schema (e.g., zod).
- Caches the order in an in-memory store with status = "pending".
- Builds an event:

```json
{
  "eventType": "ORDER_CREATED",
  "eventId": "<uuid>",
  "timestamp": "<ISO timestamp>",
  "data": {
    "orderId": "...",
    "userId": "...",
    "amount": 99.99,
    "currency": "USD",
    "items": [...]
  }
}
```

- Produces this event to the orders topic:
  - key = orderId (ensures all events for same order go to the same partition).
  - value = JSON.stringify(event).

**Response:**

- Returns 202 Accepted with the orderId.

### 2. Kafka: orders topic

- orders has multiple partitions.
- The key-based partitioning ensures deterministic placement based on orderId.
- Messages are stored durably and can be re-consumed if needed.

### 3. Service B: Consuming orders and simulating payments

Service B runs a Kafka consumer with:

- groupId = "service-b-consumers".
- Subscribed to the orders topic.

For each ORDER_CREATED event:

- Validates the event structure.
- Simulates payment processing (pseudo business rule):
  - ~80% chance of success.
  - ~20% chance of "payment gateway declined" (or other error).

On success:

- Builds a PAYMENT_COMPLETED event:

```json
{
  "eventType": "PAYMENT_COMPLETED",
  "eventId": "<uuid>",
  "timestamp": "<ISO>",
  "data": {
    "orderId": "...",
    "paymentId": "<uuid>",
    "paymentStatus": "completed",
    "amount": 99.99,
    "currency": "USD",
    "processedAt": "<ISO>"
  }
}
```

- Produces it to the payments topic, keyed by orderId.

On failure (validation or business error):

- Builds a Dead Letter Topic (DLT) event:

```json
{
  "originalTopic": "orders",
  "originalPartition": "<partition>",
  "originalOffset": "<offset>",
  "originalKey": "<orderId>",
  "originalValue": { /* ...original event... */ },
  "errorType": "<Error type>",
  "errorMessage": "<Error message>",
  "errorStack": "<stack>",
  "failedAt": "<ISO>",
  "retryCount": 0
}
```

- Produces it to orders.DLT.

### 4. Service A: Consuming payment results

Service A also runs a Kafka consumer:

- groupId = "service-a-consumers".
- Subscribed to payments.

For each PAYMENT_COMPLETED event:

- It reads orderId from the message key.
- Looks up the order in its in-memory store.
- Updates:
  - status = "completed"
  - paymentId = <paymentId>
  - updatedAt = <timestamp>

GET /orders/:id returns the current state, including payment status if processed.

---

## Running the POC

### Prerequisites

- Docker and Docker Compose installed.
- Node.js installed if you want to run the services locally (optional; Docker-only is fine).

### 1. Build and start

From the project root:

```bash
# Clean any previous runs
docker-compose down -v

# Build and start all services
docker-compose up --build
```

You should see logs for:

- kafka starting, formatting storage, and creating topics.
- service-a and service-b connecting to Kafka and starting their consumers.

If you prefer detached mode:

```bash
docker-compose up -d --build
```

### 2. Health checks

Verify services are up:

```bash
curl http://localhost:3001/health
curl http://localhost:3002/health
```

You should get simple JSON responses indicating status: "healthy" and the service name.

---

## Testing Message Flow

### Create a single order

```bash
curl -X POST http://localhost:3001/orders \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "550e8400-e29b-41d4-a716-446655440000",
    "userId": "user-123",
    "amount": 99.99,
    "currency": "USD",
    "items": [
      {
        "productId": "prod-001",
        "quantity": 2,
        "price": 49.995
      }
    ]
  }'
```

**Expected:**

- HTTP 202 Accepted.
- In logs:
  - Service A: produced to orders.
  - Service B: consumed from orders, processed, produced to payments or orders.DLT.
  - Service A: consumed from payments and updated order.

### Check order status

```bash
curl http://localhost:3001/orders/550e8400-e29b-41d4-a716-446655440000
```

- If payment succeeded, you'll see status: "completed" and a paymentId.
- If payment failed, status may remain pending and the failed event will be in orders.DLT.

### View Kafka topics directly

Use the Kafka console consumer inside the kafka container:

```bash
# Orders topic
docker exec -it kafka kafka-console-consumer \
  --bootstrap-server localhost:9092 \
  --topic orders \
  --from-beginning \
  --property print.key=true \
  --property key.separator=" : "

# Payments topic
docker exec -it kafka kafka-console-consumer \
  --bootstrap-server localhost:9092 \
  --topic payments \
  --from-beginning \
  --property print.key=true \
  --property key.separator=" : "

# Dead-letter topic
docker exec -it kafka kafka-console-consumer \
  --bootstrap-server localhost:9092 \
  --topic orders.DLT \
  --from-beginning \
  --property print.key=true \
  --property key.separator=" : "
```

Press Ctrl+C to exit.

### Load test (optional)

Create a small script, e.g. test-load.sh, to send multiple orders quickly and see steady Kafka traffic and some DLT entries. This helps observe:

- High-level throughput.
- That Service B can keep up with Service A.
- That failures are routed to DLT correctly.

---

## Extending This POC

Once comfortable with this baseline, useful next steps:

- Replace in-memory state with a real database (e.g., PostgreSQL or MongoDB).
- Add SASL + TLS to secure Kafka connections.
- Add Kafka ACLs to constrain which service can read/write to which topics.
- Introduce a Schema Registry and serialize messages with Avro/Protobuf for stricter contracts.
- Add observability:
  - Prometheus metrics.
  - Centralized logging (e.g., ELK, Loki, or cloud logging).
- Add a frontend that calls Service A's APIs and visualizes order states in real time.

---

## Summary

This POC gives a concrete, end-to-end view of:

- How two Node.js microservices communicate asynchronously via Kafka.
- How to design topics and events for an order → payment flow.
- How to wire producers and consumers with clean separation and graceful shutdown.
- How to reason about success paths and failure handling (DLT) in an event-driven system.

You can use this as a foundation to explore more advanced Kafka patterns and security practices.

---

## 🛠️ Technology Stack

### Core Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **Apache Kafka** | 7.6.0 (Confluent) | Message broker |
| **Node.js** | 20-alpine | Runtime environment |
| **Express** | 4.18.2 | Web framework |
| **KafkaJS** | 2.2.4 | Kafka client library |
| **Docker** | Latest | Containerization |
| **Docker Compose** | v3.8 | Multi-container orchestration |

### Libraries & Tools
| Library | Purpose |
|---------|---------|
| **Zod** | Schema validation |
| **Winston** | Structured logging |
| **Helmet** | Security headers |
| **CORS** | Cross-origin requests |

### Architecture Patterns
- Event-Driven Architecture (EDA)
- Microservices Architecture
- Producer-Consumer Pattern
- Dead Letter Queue Pattern
- Request-Reply Pattern (async)

---

## 📝 Summary

This POC provides a **complete, production-ready foundation** for understanding:

✅ **Event-driven communication** between microservices using Kafka  
✅ **Topic design** and partitioning strategies  
✅ **Producer/Consumer patterns** with KafkaJS in Node.js  
✅ **Error handling** with Dead Letter Topics  
✅ **Clean architecture** with separation of concerns  
✅ **Docker orchestration** with health checks and dependencies  
✅ **Graceful shutdown** and connection management  

### Key Takeaways

1. **Async is King**: Kafka decouples services, enabling independent scaling
2. **Partitioning Matters**: Key-based partitioning ensures order consistency
3. **Failure Handling**: DLT pattern allows debugging without blocking main flow
4. **Clean Code**: Well-structured services are easier to maintain and scale
5. **Observability**: Logging and monitoring are critical for production systems

---

## 📄 License

This POC is for educational purposes. Feel free to use and modify as needed.

---

## 🤝 Contributing

Found an issue or want to improve this POC? Contributions are welcome!

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📧 Support

For questions or issues:
- Check the [Troubleshooting](#-troubleshooting) section
- Review Docker logs: `docker-compose logs -f`
- Verify Kafka topics: `docker exec -it kafka kafka-topics --list --bootstrap-server localhost:9092`

---

**Happy Kafka Learning! 🎉**