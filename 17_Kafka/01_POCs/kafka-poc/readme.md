# Kafka Node.js Microservices POC# Kafka Node.js Microservices POC



> **A production-ready demonstration of event-driven microservices architecture using Apache Kafka, Node.js, and Docker**> **A production-ready demonstration of event-driven microservices architecture using Apache Kafka, Node.js, and Docker**



## 📋 Table of Contents## 📋 Table of Contents



- [Overview](#-overview)- [Overview](#overview)

- [Architecture](#️-architecture)- [Architecture](#architecture)

- [Key Features](#-key-features)- [Key Features](#key-features)

- [Project Structure](#-project-structure)- [Project Structure](#project-structure)

- [Prerequisites](#-prerequisites)- [Prerequisites](#prerequisites)

- [Getting Started](#-getting-started)- [Getting Started](#getting-started)

- [API Documentation](#-api-documentation)- [API Documentation](#api-documentation)

- [Testing the Flow](#-testing-the-flow)- [Testing the Flow](#testing-the-flow)

- [Kafka Topics](#-kafka-topics)- [Kafka Topics](#kafka-topics)

- [Monitoring and Debugging](#-monitoring-and-debugging)- [Monitoring and Debugging](#monitoring-and-debugging)

- [Configuration](#️-configuration)- [Configuration](#configuration)

- [Troubleshooting](#-troubleshooting)- [Troubleshooting](#troubleshooting)

- [Next Steps](#-next-steps)- [Next Steps](#next-steps)

- [Technology Stack](#️-technology-stack)- [Technology Stack](#technology-stack)



------



## 📖 Overview## 📖 Overview



This POC demonstrates **event-driven communication** between two Node.js microservices using Apache Kafka as the message broker. The implementation showcases:This POC demonstrates **event-driven communication** between two Node.js microservices using Apache Kafka as the message broker. The implementation showcases:



- ✅ **Asynchronous request handling** via Kafka topics- **Asynchronous request handling** via Kafka topics

- ✅ **Dead Letter Topic (DLT)** pattern for failure handling- **Dead Letter Topic (DLT)** pattern for failure handling

- ✅ **Clean architecture** with separation of concerns- **Clean architecture** with separation of concerns

- ✅ **Graceful shutdown** and error handling- **Graceful shutdown** and error handling

- ✅ **Schema validation** using Zod- **Schema validation** using Zod

- ✅ **KRaft mode** Kafka (no ZooKeeper dependency)- **KRaft mode** Kafka (no ZooKeeper dependency)



### Use Case: Order Processing System### Use Case: Order Processing System



The POC simulates an e-commerce order processing flow where:The POC simulates an e-commerce order processing flow where:

1. **Service A** (Orders Service) receives order requests via REST API1. **Service A** (Orders Service) receives order requests via REST API

2. Orders are published to Kafka for async processing2. Orders are published to Kafka for async processing

3. **Service B** (Payments Service) processes payments3. **Service B** (Payments Service) processes payments

4. Payment results are sent back to Service A via Kafka4. Payment results are sent back to Service A via Kafka

5. Failed processing attempts are routed to a Dead Letter Topic5. Failed processing attempts are routed to a Dead Letter Topic



------



## 🏗️ Architecture## 🏗️ Architecture



### High-Level Flow### High-Level Flow



``````

┌─────────────┐                    ┌───────────┐                    ┌─────────────┐┌─────────────┐                    ┌───────────┐                    ┌─────────────┐

│  Service A  │                    │   Kafka   │                    │  Service B  ││  Service A  │                    │   Kafka   │                    │  Service B  │

│  (Orders)   │                    │  Broker   │                    │  (Payments) ││  (Orders)   │                    │  Broker   │                    │  (Payments) │

│  Producer/  │                    │  (KRaft)  │                    │  Consumer/  ││  Producer/  │                    │  (KRaft)  │                    │  Consumer/  │

│  Consumer   │                    │           │                    │  Producer   ││  Consumer   │                    │           │                    │  Producer   │

└──────┬──────┘                    └─────┬─────┘                    └──────┬──────┘└──────┬──────┘                    └─────┬─────┘                    └──────┬──────┘

       │                                 │                                 │       │                                 │                                 │

       │ 1. POST /orders                 │                                 │       │ 1. POST /orders                 │                                 │

       │    (HTTP Request)               │                                 │       │    (HTTP Request)               │                                 │

       │────────────────────────────────>│                                 │       │────────────────────────────────>│                                 │

       │                                 │                                 │       │                                 │                                 │

       │ 2. Produce ORDER_CREATED        │                                 │       │ 2. Produce ORDER_CREATED        │                                 │

       │    to 'orders' topic            │                                 │       │    to 'orders' topic            │                                 │

       │────────────────────────────────>│                                 │       │────────────────────────────────>│                                 │

       │    (key: orderId)               │                                 │       │    (key: orderId)               │                                 │

       │                                 │                                 │       │                                 │                                 │

       │                                 │ 3. Consume ORDER_CREATED        │       │                                 │ 3. Consume ORDER_CREATED        │

       │                                 │    from 'orders'                │       │                                 │    from 'orders'                │

       │                                 │<────────────────────────────────│       │                                 │<────────────────────────────────│

       │                                 │                                 │       │                                 │                                 │

       │                                 │ 4. Process Payment              │       │                                 │ 4. Process Payment              │

       │                                 │    (Business Logic)             │       │                                 │    (Business Logic)             │

       │                                 │    • Validate event             │       │                                 │    • Validate event             │

       │                                 │    • Simulate payment           │       │                                 │    • Simulate payment           │

       │                                 │    • 80% success rate           │       │                                 │    • 80% success rate           │

       │                                 │                                 │       │                                 │                                 │

       │                                 │ 5a. On Success:                 │       │                                 │ 5a. On Success:                 │

       │                                 │     Produce PAYMENT_COMPLETED   │       │                                 │     Produce PAYMENT_COMPLETED   │

       │                                 │<────────────────────────────────│       │                                 │<────────────────────────────────│

       │                                 │     to 'payments' topic         │       │                                 │     to 'payments' topic         │

       │                                 │                                 │       │                                 │                                 │

       │                                 │ 5b. On Failure:                 │       │                                 │ 5b. On Failure:                 │

       │                                 │     Produce to 'orders.DLT'     │       │                                 │     Produce to 'orders.DLT'     │

       │                                 │<────────────────────────────────│       │                                 │<────────────────────────────────│

       │                                 │                                 │       │                                 │                                 │

       │ 6. Consume PAYMENT_COMPLETED    │                                 │       │ 6. Consume PAYMENT_COMPLETED    │                                 │

       │    from 'payments'              │                                 │       │    from 'payments'              │                                 │

       │<────────────────────────────────│                                 │       │<────────────────────────────────│                                 │

       │                                 │                                 │       │                                 │                                 │

       │ 7. Update Order Status          │                                 │       │ 7. Update Order Status          │                                 │

       │    (in-memory store)            │                                 │       │    (in-memory store)            │                                 │

       │                                 │                                 │       │                                 │                                 │

``````



### Components### Components



#### 1. **Kafka Broker**#### 1. **Kafka Broker**

- Runs in **KRaft mode** (no ZooKeeper dependency)- Runs in **KRaft mode** (no ZooKeeper dependency)

- Uses Confluent Kafka image `7.6.0`- Uses Confluent Kafka image `7.6.0`

- Single broker setup for POC- Single broker setup for POC

- PLAINTEXT listener on `kafka:9092`- PLAINTEXT listener on `kafka:9092`

- Auto-creates 3 topics with 3 partitions each- Auto-creates 3 topics with 3 partitions each



#### 2. **Service A - Orders Service**#### 2. **Service A - Orders Service**

- **Technology**: Node.js + Express- **Technology**: Node.js + Express

- **Port**: 3001- **Port**: 3001

- **Role**: Producer & Consumer- **Role**: Producer & Consumer



**REST API Endpoints:****REST API Endpoints:**

| Method | Endpoint | Description || Method | Endpoint | Description |

|--------|----------|-------------||--------|----------|-------------|

| POST | `/orders` | Create new order (returns 202 Accepted) || POST | `/orders` | Create new order (returns 202 Accepted) |

| GET | `/orders/:id` | Retrieve order status by ID || GET | `/orders/:id` | Retrieve order status by ID |

| GET | `/health` | Health check endpoint || GET | `/health` | Health check endpoint |



**Kafka Operations:****Kafka Operations:**

- **Produces to**: `orders` topic (ORDER_CREATED events)- **Produces to**: `orders` topic (ORDER_CREATED events)

- **Consumes from**: `payments` topic (PAYMENT_COMPLETED events)- **Consumes from**: `payments` topic (PAYMENT_COMPLETED events)

- **State Management**: In-memory Map (use database in production)- **State Management**: In-memory Map (use database in production)



#### 3. **Service B - Payments Service**#### 3. **Service B - Payments Service**

- **Technology**: Node.js + Express- **Technology**: Node.js + Express

- **Port**: 3002- **Port**: 3002

- **Role**: Consumer & Producer- **Role**: Consumer & Producer



**REST API Endpoints:****REST API Endpoints:**

| Method | Endpoint | Description || Method | Endpoint | Description |

|--------|----------|-------------||--------|----------|-------------|

| GET | `/health` | Health check endpoint || GET | `/health` | Health check endpoint |



**Kafka Operations:****Kafka Operations:**

- **Consumes from**: `orders` topic (ORDER_CREATED events)- **Consumes from**: `orders` topic (ORDER_CREATED events)

- **Produces to**: `payments` topic (success) or `orders.DLT` (failure)- **Produces to**: `payments` topic (success) or `orders.DLT` (failure)

- **Business Logic**:- **Business Logic**:

  - Validates incoming events with Zod schemas  - Validates incoming events with Zod schemas

  - Simulates payment processing (80% success rate)  - Simulates payment processing (80% success rate)

  - Implements retry and DLT pattern for failures  - Implements retry and DLT pattern for failures



------



## ✨ Key Features## ✨ Key Features

Event-driven communication between microservices using Kafka topics.

### 🎯 Architecture Patterns

- ✅ **Event-Driven Architecture** - Loose coupling between servicesTopic design:

- ✅ **Dead Letter Topic (DLT)** - Automatic failure handling and retry capability

- ✅ **Idempotency** - Key-based partitioning ensures order consistencyorders, payments, orders.DLT, each with multiple partitions.

- ✅ **Graceful Shutdown** - Proper cleanup of Kafka connections

- ✅ **Async Processing** - Non-blocking order processingProducer / Consumer patterns in Node.js using KafkaJS.



### 🔧 Technical ImplementationAsynchronous, decoupled request flow (HTTP → Kafka → Kafka → HTTP).

- ✅ **KafkaJS** - Modern, feature-rich Kafka client for Node.js

- ✅ **Zod Schema Validation** - Type-safe event validationDead-letter topic (orders.DLT) to capture failed processing attempts.

- ✅ **Winston Logging** - Structured logging for observability

- ✅ **Helmet** - Security headers for Express appsExpress app hardening basics:

- ✅ **CORS Support** - Cross-origin resource sharing enabled

- ✅ **Clean Architecture** - Separation of concerns (routes, kafka, utils, config)helmet for security headers.



### 📊 Kafka FeaturesCentralized error handling.

- ✅ **Multiple Partitions** - All topics use 3 partitions for scalability

- ✅ **Consumer Groups** - Parallel processing capabilityJSON body size limits and structured logging.

- ✅ **Key-Based Partitioning** - Same orderId always goes to same partition

- ✅ **Automatic Topic Creation** - Topics created on startupGraceful shutdown for services (closing Kafka producers/consumers on SIGINT/SIGTERM).

- ✅ **Health Checks** - Docker health checks for reliable startup

This POC intentionally focuses first on functionality and architecture; security can later be enhanced with SASL/TLS and ACLs.

---

Project Structure

## 📁 Project Structuretext

kafka-poc/

```├── docker-compose.yml

kafka-poc/├── kafka/

├── docker-compose.yml          # Multi-container orchestration│   ├── (optional: config/, certs/ for more advanced setups)

├── kafka/                      # (Optional: for advanced configs, certs)├── service-a/

││   ├── Dockerfile

├── service-a/                  # Orders Service│   ├── package.json

│   ├── Dockerfile│   └── src/

│   ├── package.json│       ├── index.js          # Entry point: starts Express + Kafka clients

│   ├── .env.example│       ├── app.js            # Express app configuration

│   └── src/│       ├── config/

│       ├── index.js           # Entry point - starts Express + Kafka│       │   └── env.js        # Environment variable validation

│       ├── app.js             # Express app configuration│       ├── kafka/

│       ├── config/│       │   ├── client.js     # KafkaJS client config

│       │   └── env.js         # Environment variable validation│       │   ├── producer.js   # Producer wrapper

│       ├── kafka/│       │   └── consumer.js   # Consumer wrapper

│       │   ├── client.js      # KafkaJS client setup│       ├── routes/

│       │   ├── producer.js    # Producer wrapper with error handling│       │   └── orders.js     # /orders endpoints + payment event handler

│       │   └── consumer.js    # Consumer wrapper with subscription│       └── utils/

│       ├── routes/│           └── logger.js     # Winston logger

│       │   └── orders.js      # Order endpoints + payment handler└── service-b/

│       └── utils/    ├── Dockerfile

│           └── logger.js      # Winston logger configuration    ├── package.json

│    └── src/

└── service-b/                  # Payments Service        ├── index.js          # Entry point

    ├── Dockerfile        ├── app.js            # Express app

    ├── package.json        ├── config/

    ├── .env.example        │   └── env.js

    └── src/        ├── kafka/

        ├── index.js           # Entry point        │   ├── client.js

        ├── app.js             # Express app configuration        │   ├── producer.js

        ├── config/        │   └── consumer.js

        │   └── env.js         # Environment variable validation        ├── processors/

        ├── kafka/        │   └── orderProcessor.js  # Consumes orders, creates payments/DLT

        │   ├── client.js      # KafkaJS client setup        └── utils/

        │   ├── producer.js    # Producer wrapper            └── logger.js

        │   └── consumer.js    # Consumer wrapperHow It Works (Step-by-Step)

        ├── processors/1. Service A: Creating an order

        │   └── orderProcessor.js  # Order processing + payment logicClient calls POST /orders on Service A with JSON body:

        ├── routes/

        │   └── health.js      # Health check endpointjson

        └── utils/{

            └── logger.js      # Winston logger configuration  "orderId": "550e8400-e29b-41d4-a716-446655440000",

```  "userId": "user-123",

  "amount": 99.99,

---  "currency": "USD",

  "items": [

## 📋 Prerequisites    {

      "productId": "prod-001",

Before running this POC, ensure you have:      "quantity": 2,

      "price": 49.995

- **Docker** (v20.10+) and **Docker Compose** (v2.0+)    }

- **Node.js** (v20+) - Optional, only if running services locally  ]

- **curl** or **Postman** - For testing API endpoints}

- At least **4GB RAM** allocated to DockerService A:



### Verify InstallationValidates the body with a schema (e.g., zod).



```bashCaches the order in an in-memory store with status = "pending".

docker --version

docker-compose --versionBuilds an event:

```

json

---{

  "eventType": "ORDER_CREATED",

## 🚀 Getting Started  "eventId": "<uuid>",

  "timestamp": "<ISO timestamp>",

### 1. Clone and Navigate  "data": {

    "orderId": "...",

```bash    "userId": "...",

cd kafka-poc    "amount": 99.99,

```    "currency": "USD",

    "items": [...]

### 2. Clean Previous Runs (if any)  }

}

```bashProduces this event to the orders topic:

docker-compose down -v

```key = orderId (ensures all events for same order go to the same partition).



The `-v` flag removes volumes, ensuring a fresh start.value = JSON.stringify(event).



### 3. Build and Start ServicesResponse:



```bashReturns 202 Accepted with the orderId.

# Build and start in foreground (recommended for first run)

docker-compose up --build2. Kafka: orders topic

orders has multiple partitions.

# OR start in detached mode

docker-compose up -d --buildThe key-based partitioning ensures deterministic placement based on orderId.

```

Messages are stored durably and can be re-consumed if needed.

### 4. Wait for Services to Be Ready

3. Service B: Consuming orders and simulating payments

The startup sequence:Service B runs a Kafka consumer with:

1. **Kafka** initializes (~30 seconds)

2. Topics are auto-created (`orders`, `payments`, `orders.DLT`)groupId = "service-b-consumers".

3. **Service A** and **Service B** connect to Kafka

4. Consumer groups are initializedSubscribed to the orders topic.



**Look for these log messages:**For each ORDER_CREATED event:

```

kafka       | Kafka is ready!Validates the event structure.

kafka       | Topics created: orders, payments, orders.DLT

service-a   | Service A listening on port 3001Simulates payment processing (pseudo business rule):

service-b   | Service B listening on port 3002

```~80% chance of success.



### 5. Verify Health~20% chance of "payment gateway declined" (or other error).



```bashOn success:

# Check Service A

curl http://localhost:3001/healthBuilds a PAYMENT_COMPLETED event:



# Check Service Bjson

curl http://localhost:3002/health{

```  "eventType": "PAYMENT_COMPLETED",

  "eventId": "<uuid>",

**Expected Response:**  "timestamp": "<ISO>",

```json  "data": {

{    "orderId": "...",

  "status": "healthy",    "paymentId": "<uuid>",

  "service": "service-a",    "paymentStatus": "completed",

  "timestamp": "2025-12-20T10:30:00.000Z"    "amount": 99.99,

}    "currency": "USD",

```    "processedAt": "<ISO>"

  }

---}

Produces it to the payments topic, keyed by orderId.

## 📚 API Documentation

On failure (validation or business error):

### Service A - Orders Service

Builds a Dead Letter Topic (DLT) event:

#### Create Order

json

**Endpoint:** `POST http://localhost:3001/orders`{

  "originalTopic": "orders",

**Headers:**  "originalPartition": <partition>,

```  "originalOffset": "<offset>",

Content-Type: application/json  "originalKey": "<orderId>",

```  "originalValue": { ...original event... },

  "errorType": "<Error type>",

**Request Body:**  "errorMessage": "<Error message>",

```json  "errorStack": "<stack>",

{  "failedAt": "<ISO>",

  "orderId": "550e8400-e29b-41d4-a716-446655440000",  "retryCount": 0

  "userId": "user-123",}

  "amount": 99.99,Produces it to orders.DLT.

  "currency": "USD",

  "items": [4. Service A: Consuming payment results

    {Service A also runs a Kafka consumer:

      "productId": "prod-001",

      "quantity": 2,groupId = "service-a-consumers".

      "price": 49.995

    }Subscribed to payments.

  ]

}For each PAYMENT_COMPLETED event:

```

It reads orderId from the message key.

**Response:** `202 Accepted`

```jsonLooks up the order in its in-memory store.

{

  "message": "Order accepted for processing",Updates:

  "orderId": "550e8400-e29b-41d4-a716-446655440000"

}status = "completed"

```

paymentId = <paymentId>

**Validation Rules:**

- `orderId`: Must be a valid UUIDupdatedAt = <timestamp>

- `userId`: Required string

- `amount`: Must be positive numberGET /orders/:id returns the current state, including payment status if processed.

- `currency`: Must be 3-character string (e.g., USD, EUR)

- `items`: Array of products with valid price and quantityRunning the POC

Prerequisites

#### Get Order StatusDocker and Docker Compose installed.



**Endpoint:** `GET http://localhost:3001/orders/:id`Node.js installed if you want to run the services locally (optional; Docker-only is fine).



**Example:**1. Build and start

```bashFrom the project root:

curl http://localhost:3001/orders/550e8400-e29b-41d4-a716-446655440000

```bash

# Clean any previous runs

**Response:** `200 OK`docker-compose down -v

```json

{# Build and start all services

  "orderId": "550e8400-e29b-41d4-a716-446655440000",docker-compose up --build

  "userId": "user-123",You should see logs for:

  "amount": 99.99,

  "currency": "USD",kafka starting, formatting storage, and creating topics.

  "items": [...],

  "status": "completed",service-a and service-b connecting to Kafka and starting their consumers.

  "paymentId": "pay-7890abcd-...",

  "createdAt": "2025-12-20T10:30:00.000Z",If you prefer detached mode:

  "updatedAt": "2025-12-20T10:30:05.000Z"

}bash

```docker-compose up -d --build

2. Health checks

**Possible Status Values:**Verify services are up:

- `pending` - Order created, payment processing

- `completed` - Payment successfulbash

- `failed` - Payment failed (check DLT)curl http://localhost:3001/health

curl http://localhost:3002/health

---You should get simple JSON responses indicating status: "healthy" and the service name.



## 🧪 Testing the FlowTesting Message Flow

Create a single order

### Test 1: Successful Order Flowbash

curl -X POST http://localhost:3001/orders \

```bash  -H "Content-Type: application/json" \

# Create an order  -d '{

curl -X POST http://localhost:3001/orders \    "orderId": "550e8400-e29b-41d4-a716-446655440000",

  -H "Content-Type: application/json" \    "userId": "user-123",

  -d '{    "amount": 99.99,

    "orderId": "550e8400-e29b-41d4-a716-446655440000",    "currency": "USD",

    "userId": "user-123",    "items": [

    "amount": 99.99,      {

    "currency": "USD",        "productId": "prod-001",

    "items": [        "quantity": 2,

      {        "price": 49.995

        "productId": "prod-001",      }

        "quantity": 2,    ]

        "price": 49.995  }'

      }Expected:

    ]

  }'HTTP 202 Accepted.

```

In logs:

**What Happens:**

1. Service A receives request → returns `202 Accepted`Service A: produced to orders.

2. Service A produces `ORDER_CREATED` event to `orders` topic

3. Service B consumes event from `orders`Service B: consumed from orders, processed, produced to payments or orders.DLT.

4. Service B simulates payment (80% success probability)

5. Service B produces `PAYMENT_COMPLETED` to `payments` topicService A: consumed from payments and updated order.

6. Service A consumes from `payments` and updates order status

Check order status

**Check Status:**bash

```bashcurl http://localhost:3001/orders/550e8400-e29b-41d4-a716-446655440000

curl http://localhost:3001/orders/550e8400-e29b-41d4-a716-446655440000If payment succeeded, you’ll see status: "completed" and a paymentId.

```If payment failed, status may remain pending and the failed event will be in orders.DLT.



### Test 2: Multiple Orders (Load Test)View Kafka topics directly

Use the Kafka console consumer inside the kafka container:

Create a bash script `test-orders.sh`:

bash

```bash# Orders topic

#!/bin/bashdocker exec -it kafka kafka-console-consumer \

  --bootstrap-server localhost:9092 \

for i in {1..10}; do  --topic orders \

  ORDER_ID=$(uuidgen)  --from-beginning \

  echo "Creating order $i with ID: $ORDER_ID"  --property print.key=true \

    --property key.separator=" : "

  curl -X POST http://localhost:3001/orders \

    -H "Content-Type: application/json" \# Payments topic

    -d "{docker exec -it kafka kafka-console-consumer \

      \"orderId\": \"$ORDER_ID\",  --bootstrap-server localhost:9092 \

      \"userId\": \"user-$i\",  --topic payments \

      \"amount\": $((50 + RANDOM % 200)),  --from-beginning \

      \"currency\": \"USD\",  --property print.key=true \

      \"items\": [{  --property key.separator=" : "

        \"productId\": \"prod-00$i\",

        \"quantity\": $((1 + RANDOM % 5)),# Dead-letter topic

        \"price\": $((10 + RANDOM % 100))docker exec -it kafka kafka-console-consumer \

      }]  --bootstrap-server localhost:9092 \

    }"  --topic orders.DLT \

    --from-beginning \

  echo ""  --property print.key=true \

  sleep 0.5  --property key.separator=" : "

donePress Ctrl+C to exit.

```

Load test (optional)

Run it:Create a small script, e.g. test-load.sh, to send multiple orders quickly and see steady Kafka traffic and some DLT entries. This helps observe:

```bash

chmod +x test-orders.shHigh-level throughput.

./test-orders.sh

```That Service B can keep up with Service A.



### Test 3: Check Service LogsThat failures are routed to DLT correctly.



```bashExtending This POC

# View all logsOnce comfortable with this baseline, useful next steps:

docker-compose logs -f

Replace in-memory state with a real database (e.g., PostgreSQL or MongoDB).

# View specific service logs

docker-compose logs -f service-aAdd SASL + TLS to secure Kafka connections.

docker-compose logs -f service-b

docker-compose logs -f kafkaAdd Kafka ACLs to constrain which service can read/write to which topics.

```

Introduce a Schema Registry and serialize messages with Avro/Protobuf for stricter contracts.

---

Add observability:

## 📊 Kafka Topics

Prometheus metrics.

### Topic Configuration

Centralized logging (e.g., ELK, Loki, or cloud logging).

| Topic Name | Partitions | Replication Factor | Purpose |

|------------|------------|-------------------|---------|Add a frontend that calls Service A’s APIs and visualizes order states in real time.

| `orders` | 3 | 1 | New order events from Service A |

| `payments` | 3 | 1 | Payment result events from Service B |Summary

| `orders.DLT` | 3 | 1 | Failed order processing events |This POC gives a concrete, end-to-end view of:



### Event SchemasHow two Node.js microservices communicate asynchronously via Kafka.



#### ORDER_CREATED EventHow to design topics and events for an order → payment flow.

```json

{How to wire producers and consumers with clean separation and graceful shutdown.

  "eventType": "ORDER_CREATED",

  "eventId": "uuid-v4",How to reason about success paths and failure handling (DLT) in an event-driven system.

  "timestamp": "ISO-8601 timestamp",

  "data": {You can use this as a foundation to explore more advanced Kafka patterns and security practices.
    "orderId": "uuid-v4",
    "userId": "string",
    "amount": "number",
    "currency": "string",
    "items": "array"
  }
}
```

#### PAYMENT_COMPLETED Event
```json
{
  "eventType": "PAYMENT_COMPLETED",
  "eventId": "uuid-v4",
  "timestamp": "ISO-8601 timestamp",
  "data": {
    "orderId": "uuid-v4",
    "paymentId": "uuid-v4",
    "paymentStatus": "completed",
    "amount": "number",
    "currency": "string",
    "processedAt": "ISO-8601 timestamp"
  }
}
```

#### Dead Letter Topic Event
```json
{
  "originalTopic": "orders",
  "originalPartition": "number",
  "originalOffset": "string",
  "originalKey": "orderId",
  "originalValue": { /* original event */ },
  "errorType": "string",
  "errorMessage": "string",
  "errorStack": "string",
  "failedAt": "ISO-8601 timestamp",
  "retryCount": "number"
}
```

---

## 🔍 Monitoring and Debugging

### View Kafka Topics

```bash
# List all topics
docker exec -it kafka kafka-topics \
  --bootstrap-server localhost:9092 \
  --list
```

### Consume Messages from Topics

#### Orders Topic
```bash
docker exec -it kafka kafka-console-consumer \
  --bootstrap-server localhost:9092 \
  --topic orders \
  --from-beginning \
  --property print.key=true \
  --property key.separator=" : "
```

#### Payments Topic
```bash
docker exec -it kafka kafka-console-consumer \
  --bootstrap-server localhost:9092 \
  --topic payments \
  --from-beginning \
  --property print.key=true \
  --property key.separator=" : "
```

#### Dead Letter Topic
```bash
docker exec -it kafka kafka-console-consumer \
  --bootstrap-server localhost:9092 \
  --topic orders.DLT \
  --from-beginning \
  --property print.key=true \
  --property key.separator=" : "
```

**Note:** Press `Ctrl+C` to exit the consumer.

### View Consumer Groups

```bash
# List all consumer groups
docker exec -it kafka kafka-consumer-groups \
  --bootstrap-server localhost:9092 \
  --list

# Describe specific consumer group
docker exec -it kafka kafka-consumer-groups \
  --bootstrap-server localhost:9092 \
  --group service-a-consumers \
  --describe
```

### Check Topic Details

```bash
# Describe a topic
docker exec -it kafka kafka-topics \
  --bootstrap-server localhost:9092 \
  --describe \
  --topic orders
```

---

## ⚙️ Configuration

### Environment Variables

#### Service A
```env
NODE_ENV=development
SERVICE_PORT=3001
KAFKA_BROKERS=kafka:9092
KAFKA_CLIENT_ID=service-a
KAFKA_GROUP_ID=service-a-consumers
```

#### Service B
```env
NODE_ENV=development
SERVICE_PORT=3002
KAFKA_BROKERS=kafka:9092
KAFKA_CLIENT_ID=service-b
KAFKA_GROUP_ID=service-b-consumers
```

### Kafka Configuration Highlights

```yaml
# KRaft Mode (No ZooKeeper)
KAFKA_PROCESS_ROLES: broker,controller
KAFKA_CONTROLLER_QUORUM_VOTERS: 1@kafka:9094

# Listeners
KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:9092,CONTROLLER://0.0.0.0:9094
KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092

# Retention
KAFKA_LOG_RETENTION_HOURS: 168  # 7 days
```

---

## 🐛 Troubleshooting

### Issue: Services can't connect to Kafka

**Symptoms:**
```
Error: Connection to Kafka failed
```

**Solutions:**
1. Ensure Kafka is healthy:
   ```bash
   docker-compose ps
   ```
2. Check Kafka logs:
   ```bash
   docker-compose logs kafka
   ```
3. Wait longer for Kafka to initialize (~30 seconds)
4. Restart all services:
   ```bash
   docker-compose restart
   ```

### Issue: Orders stay in "pending" status

**Possible Causes:**
1. Service B is not running
2. Service B consumer is not subscribed
3. Payment failed and sent to DLT

**Debug Steps:**
```bash
# Check Service B logs
docker-compose logs service-b

# Check DLT for failed messages
docker exec -it kafka kafka-console-consumer \
  --bootstrap-server localhost:9092 \
  --topic orders.DLT \
  --from-beginning
```

### Issue: Port already in use

**Error:**
```
Bind for 0.0.0.0:3001 failed: port is already allocated
```

**Solution:**
```bash
# Find and kill process using the port
lsof -ti:3001 | xargs kill -9
lsof -ti:3002 | xargs kill -9

# Or change ports in docker-compose.yml
ports:
  - "3003:3001"  # Map to different host port
```

### Issue: Docker out of memory

**Solution:**
```bash
# Increase Docker memory allocation (Docker Desktop)
# Settings → Resources → Memory → Set to at least 4GB

# Clean up Docker resources
docker system prune -a --volumes
```

### Viewing Detailed Logs

```bash
# Follow logs for all services
docker-compose logs -f

# Filter by service
docker-compose logs -f service-a | grep "ERROR"

# View last 100 lines
docker-compose logs --tail=100 service-b
```

---

## 🚀 Next Steps

Once comfortable with this baseline POC, consider these enhancements:

### 1. **Data Persistence**
- [ ] Replace in-memory storage with PostgreSQL or MongoDB
- [ ] Implement proper database migrations
- [ ] Add connection pooling

### 2. **Security**
- [ ] Enable SASL/SCRAM authentication for Kafka
- [ ] Add TLS encryption for Kafka connections
- [ ] Implement Kafka ACLs for topic-level access control
- [ ] Add API authentication (JWT tokens)
- [ ] Use environment secrets management (Docker Secrets, Vault)

### 3. **Observability**
- [ ] Add Prometheus metrics exporters
- [ ] Set up Grafana dashboards for Kafka metrics
- [ ] Implement distributed tracing (Jaeger, Zipkin)
- [ ] Centralized logging (ELK Stack, Loki)
- [ ] Add health check endpoints with detailed status

### 4. **Schema Management**
- [ ] Integrate Schema Registry (Confluent/Apicurio)
- [ ] Use Avro or Protobuf for message serialization
- [ ] Implement schema evolution strategies
- [ ] Add schema validation at producer/consumer level

### 5. **Resilience**
- [ ] Implement retry logic with exponential backoff
- [ ] Add circuit breakers (using libraries like Opossum)
- [ ] Implement saga pattern for distributed transactions
- [ ] Add consumer rebalancing listeners
- [ ] Configure exactly-once semantics (EOS)

### 6. **Scalability**
- [ ] Add more Kafka brokers (multi-broker cluster)
- [ ] Increase replication factor to 3
- [ ] Scale services horizontally (multiple instances)
- [ ] Implement consumer group partition assignment strategies
- [ ] Add Kafka Connect for data integration

### 7. **Testing**
- [ ] Unit tests for business logic
- [ ] Integration tests with Testcontainers
- [ ] Contract testing for event schemas (Pact)
- [ ] Load testing with k6 or Apache JMeter
- [ ] Chaos engineering (kill containers, network delays)

### 8. **CI/CD**
- [ ] GitHub Actions / GitLab CI pipelines
- [ ] Automated testing on PR
- [ ] Container image scanning (Trivy, Snyk)
- [ ] Kubernetes deployment manifests
- [ ] Helm charts for easy deployment

### 9. **Frontend**
- [ ] React/Vue dashboard to create orders
- [ ] Real-time order status updates (WebSockets)
- [ ] Admin panel for DLT management
- [ ] Kafka topic visualization

### 10. **Advanced Kafka Features**
- [ ] Kafka Streams for real-time processing
- [ ] KSQL for stream queries
- [ ] Kafka Connect for data pipelines
- [ ] Transactional producers/consumers
- [ ] Compacted topics for state management

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
