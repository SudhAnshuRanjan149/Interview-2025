# RabbitMQ POC - Microservices Communication

This POC demonstrates RabbitMQ message patterns with two Node.js services communicating through different exchange types.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Step-by-Step Setup Guide](#step-by-step-setup-guide)
- [Running the Services](#running-the-services)
- [Testing the Patterns](#testing-the-patterns)
- [API Endpoints](#api-endpoints)
- [RabbitMQ Management UI](#rabbitmq-management-ui)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This POC demonstrates:
- **Direct Exchange**: Point-to-point messaging for order processing
- **Fanout Exchange**: Broadcasting messages to all subscribers
- **Topic Exchange**: Pattern-based routing for event handling
- **RPC Pattern**: Request-response communication for payment processing
- **Dead Letter Queue**: Handling failed messages
- **Connection Management**: Automatic reconnection with exponential backoff

## 🏗️ Architecture

```
┌─────────────┐         ┌──────────────────┐         ┌─────────────┐
│  Service A  │────────▶│   RabbitMQ       │────────▶│  Service B  │
│  (Producer) │         │   - Direct       │         │  (Consumer) │
│  Port: 3001 │◀────────│   - Fanout       │◀────────│  Port: 3002 │
└─────────────┘         │   - Topic        │         └─────────────┘
                        │   - RPC Queue    │
                        └──────────────────┘
                        Management: 15672
                        AMQP: 5672
```

## ✅ Prerequisites

- **Node.js**: v16 or higher
- **Docker**: v20 or higher
- **Docker Compose**: v2 or higher
- **curl** or **Postman**: For API testing

## 📁 Project Structure

```
16_RabbitMQ/01_POCs/
├── docker-compose.yml          # RabbitMQ container setup
├── README.md                   # This file
├── service-a/                  # Producer service
│   ├── index.js                # Main application logic
│   ├── rabbitmq-config.js      # RabbitMQ connection manager
│   └── package.json            # Dependencies
└── service-b/                  # Consumer service
    ├── index.js                # Main application logic
    ├── rabbitmq-config.js      # RabbitMQ connection manager
    └── package.json            # Dependencies
```

## 🚀 Step-by-Step Setup Guide

### Step 1: Create Project Directory Structure

```bash
mkdir -p 16_RabbitMQ/01_POCs/{service-a,service-b}
cd 16_RabbitMQ/01_POCs
```

### Step 2: Set Up RabbitMQ with Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  rabbitmq:
    image: rabbitmq:3-management
    container_name: rabbitmq
    ports:
      - "5672:5672"      # AMQP port
      - "15672:15672"    # Management UI
    environment:
      RABBITMQ_DEFAULT_USER: admin
      RABBITMQ_DEFAULT_PASS: SecurePassword123!
    healthcheck:
      test: rabbitmq-diagnostics -q ping
      interval: 10s
      timeout: 5s
      retries: 5
```

### Step 3: Create Service A (Producer)

#### 3.1 Navigate to service-a directory:
```bash
cd service-a
```

#### 3.2 Initialize Node.js project:
```bash
npm init -y
```

#### 3.3 Install dependencies:
```bash
npm install amqplib express helmet express-rate-limit dotenv
```

#### 3.4 Create `.env` file:
```bash
cat > .env << 'EOF'
RABBITMQ_URL=amqp://admin:SecurePassword123!@localhost:5672
SERVICE_NAME=Service-A
PORT=3001
EOF
```

#### 3.5 Create `rabbitmq-config.js` (Connection Manager)

#### 3.6 Create `index.js` (Main Application)

### Step 4: Create Service B (Consumer)

#### 4.1 Navigate to service-b directory:
```bash
cd ../service-b
```

#### 4.2 Initialize Node.js project:
```bash
npm init -y
```

#### 4.3 Install dependencies:
```bash
npm install amqplib express helmet express-rate-limit dotenv
```

#### 4.4 Create `.env` file:
```bash
cat > .env << 'EOF'
RABBITMQ_URL=amqp://admin:SecurePassword123!@localhost:5672
SERVICE_NAME=Service-B
PORT=3002
EOF
```

#### 4.5 Create `rabbitmq-config.js` (Connection Manager)

#### 4.6 Create `index.js` (Main Application)

## 🎬 Running the Services

### Option 1: Using Docker Compose + Local Node.js

#### 1. Start RabbitMQ:
```bash
cd /Users/priyaupadhyay/Desktop/sudhanshu/Code/InterviewPrep-2025/16_RabbitMQ/01_POCs
docker-compose up -d
```

#### 2. Verify RabbitMQ is running:
```bash
docker ps
docker logs rabbitmq
```

Wait until you see: `Server startup complete`

#### 3. Start Service A (Terminal 1):
```bash
cd service-a
node index.js
```

Expected output:
```
[Service-A] Attempting to connect to RabbitMQ...
[Service-A] Connected to RabbitMQ securely
[Service-A] RabbitMQ setup complete
[Service A] Producer service started on port 3001
```

#### 4. Start Service B (Terminal 2):
```bash
cd service-b
node index.js
```

Expected output:
```
[Service-B] Attempting to connect to RabbitMQ...
[Service-B] Connected to RabbitMQ securely
[Service-B] RabbitMQ setup complete
[Service B] Consumer service started on port 3002
```

### Option 2: Quick Start Script

Create a `start.sh` script:

```bash
#!/bin/bash

# Start RabbitMQ
echo "Starting RabbitMQ..."
docker-compose up -d

# Wait for RabbitMQ to be ready
echo "Waiting for RabbitMQ to be ready..."
sleep 10

# Start Service A in background
echo "Starting Service A..."
cd service-a
node index.js > service-a.log 2>&1 &
SERVICE_A_PID=$!
cd ..

# Start Service B in background
echo "Starting Service B..."
cd service-b
node index.js > service-b.log 2>&1 &
SERVICE_B_PID=$!
cd ..

echo "All services started!"
echo "Service A PID: $SERVICE_A_PID"
echo "Service B PID: $SERVICE_B_PID"
echo "RabbitMQ Management: http://localhost:15672"
```

Make it executable and run:
```bash
chmod +x start.sh
./start.sh
```

## 🧪 Testing the Patterns

### 1. Direct Exchange - Order Processing (Point-to-Point)

**Test creating an order:**

```bash
curl -X POST http://localhost:3001/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "product": "laptop",
    "quantity": 1,
    "price": 999.99
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Order placed successfully",
  "orderId": 1734703200000
}
```

**Check logs:**
- Service A: "Order published to queue"
- Service B: "Processing order: [orderId]" → "Order processed successfully"

---

### 2. Fanout Exchange - Broadcasting (Publish-Subscribe)

**Send a broadcast message:**

```bash
curl -X POST http://localhost:3001/api/broadcast \
  -H "Content-Type: application/json" \
  -d '{
    "message": "System maintenance scheduled at 2 AM"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Broadcast sent"
}
```

**Check logs:**
- Service A: "Broadcast message sent"
- Service B: "Received broadcast: System maintenance scheduled at 2 AM"

---

### 3. Topic Exchange - Event Routing (Pattern Matching)

**Test User Events:**

```bash
# User created event
curl -X POST http://localhost:3001/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "routingKey": "user.created",
    "data": {
      "userId": "12345",
      "email": "user@example.com"
    }
  }'

# User updated event
curl -X POST http://localhost:3001/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "routingKey": "user.updated",
    "data": {
      "userId": "12345",
      "changes": ["email"]
    }
  }'
```

**Test Payment Events:**

```bash
# Payment success
curl -X POST http://localhost:3001/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "routingKey": "payment.success",
    "data": {
      "transactionId": "txn_123",
      "amount": 99.99
    }
  }'

# Payment failure
curl -X POST http://localhost:3001/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "routingKey": "payment.failed",
    "data": {
      "transactionId": "txn_124",
      "reason": "Insufficient funds"
    }
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Event published",
  "routingKey": "user.created"
}
```

**Check logs:**
- Service B will receive events matching patterns: `user.*` and `payment.#`

---

### 4. RPC Pattern - Request-Response

**Process a payment (synchronous):**

```bash
curl -X POST http://localhost:3001/api/payment/process \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 150.00,
    "method": "credit_card",
    "customerId": "cust_789"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "transactionId": "txn_1734703200000",
  "status": "approved",
  "processedAt": "2025-12-20T10:30:00.000Z"
}
```

**Check logs:**
- Service A: "Sending RPC request for payment processing"
- Service B: "Processing payment RPC request"
- Service A: "Payment RPC response received"

---

### 5. Dead Letter Queue - Error Handling

**Trigger a message failure:**

```bash
curl -X POST http://localhost:3001/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "product": "invalid",
    "quantity": -1,
    "price": "not-a-number"
  }'
```

Failed messages will be routed to the Dead Letter Queue after retry attempts.

---

## 📊 API Endpoints

### Service A (Producer) - Port 3001

| Method | Endpoint | Description | Pattern |
|--------|----------|-------------|---------|
| POST | `/api/orders` | Create an order | Direct Exchange |
| POST | `/api/broadcast` | Send broadcast message | Fanout Exchange |
| POST | `/api/events` | Publish event | Topic Exchange |
| POST | `/api/payment/process` | Process payment (RPC) | RPC Pattern |
| GET | `/health` | Health check | - |

### Service B (Consumer) - Port 3002

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |

Service B automatically consumes messages from RabbitMQ queues.

---

## 🖥️ RabbitMQ Management UI

Access the RabbitMQ Management Console:

**URL:** http://localhost:15672

**Credentials:**
- Username: `admin`
- Password: `SecurePassword123!`

### What to Check:

1. **Connections Tab**: Verify both services are connected
2. **Exchanges Tab**: See `direct_exchange`, `fanout_exchange`, `topic_exchange`
3. **Queues Tab**: View all queues and message counts
   - `orders.process`
   - `notifications`
   - `payments.process`
   - `dead_letter_queue`
   - Response queues
4. **Admin Tab**: Monitor system resources

---

## 🔍 Troubleshooting

### RabbitMQ Connection Issues

**Problem:** `Error: connect ECONNREFUSED`

**Solution:**
```bash
# Check if RabbitMQ is running
docker ps | grep rabbitmq

# Check RabbitMQ logs
docker logs rabbitmq

# Restart RabbitMQ
docker-compose restart
```

---

### Services Not Starting

**Problem:** Port already in use

**Solution:**
```bash
# Find process using port 3001 or 3002
lsof -ti:3001
lsof -ti:3002

# Kill the process
kill -9 $(lsof -ti:3001)

# Or change port in .env file
```

---

### Messages Not Being Consumed

**Problem:** Messages stuck in queue

**Solution:**
1. Check Service B is running
2. Verify queue bindings in RabbitMQ UI
3. Check Service B logs for errors
4. Restart Service B:
```bash
cd service-b
node index.js
```

---

### Authentication Failed

**Problem:** `ACCESS_REFUSED - Login was refused`

**Solution:**
```bash
# Check credentials in .env files
cat service-a/.env
cat service-b/.env

# Verify RabbitMQ credentials
docker exec rabbitmq rabbitmqctl list_users
```

---

## 🛑 Stopping Services

### Stop All Services:

```bash
# Stop RabbitMQ
docker-compose down

# Stop Node.js services (if running in background)
pkill -f "node index.js"

# Or use specific PIDs
kill $SERVICE_A_PID
kill $SERVICE_B_PID
```

### Clean Up Everything:

```bash
# Remove RabbitMQ container and volumes
docker-compose down -v

# Remove node_modules if needed
rm -rf service-a/node_modules
rm -rf service-b/node_modules
```

---

## 📝 Common Commands Reference

```bash
# Start RabbitMQ
docker-compose up -d

# View RabbitMQ logs
docker logs -f rabbitmq

# Restart RabbitMQ
docker-compose restart

# Stop RabbitMQ
docker-compose down

# Start Service A
cd service-a && node index.js

# Start Service B
cd service-b && node index.js

# View all running containers
docker ps

# Check RabbitMQ status
docker exec rabbitmq rabbitmqctl status

# List all queues
docker exec rabbitmq rabbitmqctl list_queues

# List all exchanges
docker exec rabbitmq rabbitmqctl list_exchanges
```

---

## 🎓 Learning Points

This POC demonstrates:

1. **Connection Resilience**: Automatic reconnection with exponential backoff
2. **Message Persistence**: Durable queues and persistent messages
3. **Error Handling**: Dead letter queues for failed messages
4. **Multiple Exchange Types**: Direct, Fanout, and Topic patterns
5. **RPC Pattern**: Synchronous request-response over async messaging
6. **Security**: Rate limiting, Helmet middleware, authentication
7. **Monitoring**: Health checks and management UI

---

## 📚 Further Reading

- [RabbitMQ Official Documentation](https://www.rabbitmq.com/documentation.html)
- [AMQP Protocol](https://www.amqp.org/)
- [Node.js amqplib](https://www.npmjs.com/package/amqplib)
- [RabbitMQ Tutorials](https://www.rabbitmq.com/getstarted.html)

---

## 🤝 Contributing

Feel free to enhance this POC by:
- Adding more exchange patterns
- Implementing priority queues
- Adding message TTL examples
- Creating monitoring dashboards
- Adding integration tests

---

**Happy Messaging! 🚀**
