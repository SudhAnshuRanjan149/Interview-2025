# Node.js Interview Questions (Q89-Q100 Detailed Answers)

## SECTION 13: ADVANCED NODE.JS CONCEPTS

## 89. What are child processes and worker threads?

**Answer:**

Both run code in parallel, but have different purposes and capabilities.

### Simple Analogy:

- **Child Process** = Hire a new employee (separate person, separate desk)
- **Worker Thread** = Hire a contractor (works in your office, shares resources)

### Comparison Table:

| Aspect | Child Process | Worker Thread |
|--------|---------------|---------------|
| **Memory** | Separate (expensive) | Shared (efficient) |
| **Creation time** | Slower | Faster |
| **Communication** | Message passing (IPC) | Shared memory |
| **CPU cores** | Can use multiple | Can use multiple |
| **Overhead** | High | Low |
| **Use** | Heavy isolation | CPU-bound tasks |

### Child Process Example:

```javascript
const { spawn, exec, fork } = require('child_process');

// Method 1: spawn (stream-based)
const child = spawn('node', ['script.js']);

child.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

child.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

// Method 2: exec (command-based)
exec('ls -la', (error, stdout, stderr) => {
  if (error) {
    console.error(`error: ${error.message}`);
  }
  console.log(`stdout: ${stdout}`);
});

// Method 3: fork (Node.js process)
const child = fork('worker.js');

// Send data to child
child.send({ hello: 'world' });

// Receive data from child
child.on('message', (msg) => {
  console.log('Message from child:', msg);
});

// Terminate child
child.kill();
```

### Worker Thread Example:

```bash
npm install worker_threads
```

```javascript
const { Worker } = require('worker_threads');
const path = require('path');

// Create worker thread
const worker = new Worker(path.join(__dirname, 'worker.js'));

// Send message to worker
worker.postMessage({ num: 10 });

// Receive message from worker
worker.on('message', (result) => {
  console.log('Result from worker:', result);
});

// Handle errors
worker.on('error', (err) => {
  console.error('Worker error:', err);
});

// Handle exit
worker.on('exit', (code) => {
  console.log('Worker exited with code:', code);
});
```

**worker.js:**
```javascript
const { parentPort } = require('worker_threads');

parentPort.on('message', (data) => {
  // Do CPU-intensive work
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += data.num;
  }
  
  // Send result back
  parentPort.postMessage(result);
});
```

### Real Example - Fibonacci Calculation:

```javascript
const { Worker } = require('worker_threads');
const os = require('os');

// CPU-bound task
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Without worker threads (blocks main thread)
app.get('/fib-slow/:n', (req, res) => {
  const result = fibonacci(req.params.n); // Blocks!
  res.json(result);
});

// With worker threads (non-blocking)
app.get('/fib-fast/:n', (req, res) => {
  const worker = new Worker('./fib-worker.js');
  
  worker.on('message', (result) => {
    res.json(result);
    worker.terminate();
  });
  
  worker.postMessage(req.params.n);
});
```

---

## 90. What is the difference between blocking and non-blocking operations?

**Answer:**

**Blocking** = waits for operation to complete  
**Non-blocking** = continues without waiting

### Simple Analogy:

- **Blocking** = Restaurant: Order and wait for food before leaving counter
- **Non-blocking** = Pager system: Order, get pager, sit down, continue reading

### Real Examples:

**Blocking Code (BAD):**
```javascript
// ❌ WRONG - Blocks entire server
const data = fs.readFileSync('large-file.txt'); // Waits here
console.log('File read:', data);
// All other requests wait!
```

**Non-Blocking Code (GOOD):**
```javascript
// ✅ CORRECT - Non-blocking
fs.readFile('large-file.txt', (err, data) => {
  console.log('File read:', data);
});
console.log('Reading file...'); // Continues immediately
// Other requests processed!
```

### Performance Impact:

```
Blocking Timeline:
Request 1: Read file (5 seconds) ████
Request 2: Wait... (5 seconds) ████
Request 3: Wait... (5 seconds) ████
Total: 15 seconds

Non-Blocking Timeline:
Request 1: Start reading file ▓
Request 2: Start reading file ▓
Request 3: Start reading file ▓
All complete: (5 seconds) ▓▓▓
Total: 5 seconds (3x faster!)
```

---

## 91. What is CPU-bound vs I/O-bound tasks?

**Answer:**

**CPU-bound** = Needs processor power  
**I/O-bound** = Waits for input/output

### Real Examples:

**CPU-Bound Tasks:**
```javascript
// Calculations, data processing, encryption
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function compress(data) {
  // Heavy processing
  return zlib.gzipSync(data);
}

function decrypt(encryptedData, key) {
  // Crypto operations
  return crypto.privateDecrypt(key, encryptedData);
}
```

**I/O-Bound Tasks:**
```javascript
// File reading, database queries, network requests
fs.readFile('file.txt', callback);
db.query('SELECT * FROM users', callback);
fetch('https://api.example.com/data');
```

### Node.js Handling:

```
I/O-Bound Tasks:
  ✅ Node.js handles well
  ✅ Non-blocking by default
  ✅ Event loop manages efficiently

CPU-Bound Tasks:
  ❌ Node.js blocks event loop
  ❌ Single-threaded limitation
  ✅ Solution: Use worker threads
```

### Solution - Worker Threads for CPU-Bound:

```javascript
const { Worker } = require('worker_threads');

// CPU-intensive function in worker
app.post('/process', (req, res) => {
  const worker = new Worker('./cpu-worker.js');
  
  worker.on('message', (result) => {
    res.json(result);
  });
  
  // Send data to worker
  worker.postMessage(req.body);
});
```

---

## 92. What is garbage collection in Node.js?

**Answer:**

**Garbage collection** is automatic memory cleanup - removing data that's no longer needed.

### Simple Analogy:

Think of garbage collection like a **cleaning service**:
- You use items (variables, objects)
- When done, they become trash
- Cleaning service removes trash
- Memory freed for new items

### How Garbage Collection Works:

```javascript
// Object created (uses memory)
let user = { name: 'John', age: 30 };

// Object used
console.log(user.name);

// Object no longer needed (assigned to null)
user = null;

// Garbage collector finds unreferenced objects
// Removes them to free memory
```

### Garbage Collection Types in V8:

**1. Scavenge (Minor GC)** - Fast, frequent
```javascript
// Objects in new space
const temp = new Array(1000);
// temp no longer used
// Quick cleanup
```

**2. Mark-Sweep (Major GC)** - Slower, less frequent
```javascript
// Long-lived objects
const cache = new Map();
// Still referenced
// Cleaned less often
```

### Memory Leak Example:

```javascript
// ❌ MEMORY LEAK - Event listener never removed
emitter.on('data', (data) => {
  console.log(data);
  // Listener persists forever!
});

// ✅ CORRECT - Remove when done
const handler = (data) => console.log(data);
emitter.on('data', handler);
emitter.off('data', handler); // Cleanup
```

### Monitoring Garbage Collection:

```bash
# Run with GC flags
node --expose-gc app.js

# In code:
if (global.gc) {
  global.gc(); // Force garbage collection
}

# Monitor memory
console.log(process.memoryUsage());
// {
//   rss: 27648000,      // Total memory
//   heapTotal: 8896000, // Heap total
//   heapUsed: 4648320,  // Heap used
//   external: 0
// }
```

---

## 93. How does memory management work in Node.js?

**Answer:**

Node.js manages memory through the V8 engine's heap.

### Memory Structure:

```
V8 Heap:
├── New Space (young generation)
│   └── Quick garbage collection
├── Old Space (long-lived objects)
│   └── Slower garbage collection
└── Code Space (compiled code)
```

### Real Example:

```javascript
// Monitor memory usage
function monitorMemory() {
  const used = process.memoryUsage();
  console.log({
    heapUsed: `${Math.round(used.heapUsed / 1024 / 1024)} MB`,
    heapTotal: `${Math.round(used.heapTotal / 1024 / 1024)} MB`,
    external: `${Math.round(used.external / 1024 / 1024)} MB`
  });
}

// Memory leak example
const cache = [];

app.get('/data', (req, res) => {
  const data = { id: req.query.id, timestamp: Date.now() };
  cache.push(data); // Cache grows infinitely!
  res.json(data);
});

// Memory leak fix
const LRU = require('lru-cache');
const cache = new LRU({ max: 1000 }); // Max 1000 items

app.get('/data', (req, res) => {
  const data = { id: req.query.id, timestamp: Date.now() };
  cache.set(req.query.id, data);
  res.json(data);
});
```

---

## 94. What is zero-downtime deployment?

**Answer:**

**Zero-downtime deployment** means updating your app without stopping it or losing requests.

### Simple Analogy:

Think of it like **replacing a car engine while driving**:
- Before: Stop car, replace engine, restart (downtime)
- Zero-downtime: Smoothly transition, no stopping

### Strategies:

### 1. Rolling Deployment:

```
Server 1: v1.0
Server 2: v1.0
Server 3: v1.0

Step 1:
Server 1: v2.0 ← Updated, handles traffic
Server 2: v1.0 ← Still running
Server 3: v1.0 ← Still running

Step 2:
Server 1: v2.0 ← Running
Server 2: v2.0 ← Updated
Server 3: v1.0 ← Still running

Step 3:
Server 1: v2.0 ← Running
Server 2: v2.0 ← Running
Server 3: v2.0 ← Updated

Result: No downtime!
```

### 2. Blue-Green Deployment:

```
Blue (Current): v1.0 (handling traffic)
Green (New): v2.0 (not handling traffic)

Step 1: Deploy v2.0 to Green
Green is ready but not receiving traffic

Step 2: Test Green with v2.0
Ensure everything works

Step 3: Switch traffic
Blue stops receiving traffic
Green starts receiving traffic

Step 4: Keep Blue as rollback
If issues, quickly switch back to Blue
```

### 3. Canary Deployment:

```
Step 1: Deploy v2.0 to 5% of servers
95% users: v1.0
5% users: v2.0 (test group)

Step 2: Monitor for issues
If good, increase to 25%
If bad, rollback immediately

Step 3: Gradually increase
25% → 50% → 100%

Result: Slow, safe rollout
```

### PM2 Rolling Restart:

```bash
# Rolling restart (zero-downtime)
pm2 reload app --max-memory-restart 1G

# Immediate restart (has downtime)
pm2 restart app
```

---

## 95. What is API rate throttling and how is it implemented?

**Answer:**

**Rate throttling** limits how many requests a client can make in a time period.

### Simple Analogy:

Think of it like a **speed limit on a highway**:
- Too fast: Police (rate limiter) stops you
- Within limit: You continue
- Over limit repeatedly: Banned temporarily

### Real Example:

```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

// Basic rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
});

// Apply to all requests
app.use(limiter);

// Apply to specific routes
app.post('/login', limiter, (req, res) => {
  // Handle login
});

// Different limits for different routes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Only 5 login attempts
  skipSuccessfulRequests: true, // Don't count successful logins
  message: 'Too many login attempts, try again later.'
});

app.post('/login', loginLimiter, (req, res) => {
  // Handle login
});

// API rate limit
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30 // 30 requests per minute
});

app.use('/api/', apiLimiter);
```

### Custom Rate Limiter:

```javascript
const redis = require('redis');
const client = redis.createClient();

async function rateLimit(key, maxRequests, windowMs) {
  const count = await client.incr(key);
  
  if (count === 1) {
    // First request, set expiry
    await client.expire(key, Math.ceil(windowMs / 1000));
  }
  
  return count <= maxRequests;
}

app.get('/api/data', async (req, res) => {
  const clientId = req.ip;
  const allowed = await rateLimit(clientId, 100, 60000); // 100 per minute
  
  if (!allowed) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }
  
  res.json({ data: 'some data' });
});
```

### Throttling vs Debouncing:

```
Rate Limiting (Server):
  - Throttles requests from clients
  - Prevents abuse
  - Returns 429 status

Debouncing (Client):
  - Delays function execution
  - Waits for pauses in requests
  - Used in search bars
```

---

## 96. What is the purpose of Docker for Node.js applications?

**Answer:**

**Docker** packages Node.js apps in containers so they run consistently anywhere.

### Simple Analogy:

Think of Docker like **shipping containers**:
- Before: Ship different items (inconsistent)
- Docker: Everything in standard container (consistent)
- Destination: Just receive container, works perfectly

### Real Example - Dockerfile:

```dockerfile
# Use Node.js official image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app code
COPY . .

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "start"]
```

### Building and Running:

```bash
# Build image
docker build -t my-node-app .

# Run container
docker run -p 3000:3000 my-node-app

# Run with environment variables
docker run -p 3000:3000 -e NODE_ENV=production my-node-app

# Run in background
docker run -d -p 3000:3000 my-node-app
```

### Docker Compose (Multiple Services):

```yaml
version: '3'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      DATABASE_URL: mongodb://db:27017/myapp
    depends_on:
      - db
  
  db:
    image: mongo:5
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

---

## 97. What is the purpose of Kubernetes for Node.js?

**Answer:**

**Kubernetes** orchestrates (manages) containers at scale.

### Simple Analogy:

Think of Kubernetes like an **orchestra conductor**:
- Docker containers = Musicians
- Kubernetes = Conductor directing them
- Ensures they play together perfectly

### Features:

✅ **Auto-scaling** - More traffic = more pods  
✅ **Load balancing** - Distribute requests  
✅ **Self-healing** - Restart crashed pods  
✅ **Rolling updates** - Zero-downtime deploy  
✅ **Resource management** - Allocate CPU/memory  

### Real Example - Kubernetes Deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: node-app

spec:
  replicas: 3  # 3 running instances
  selector:
    matchLabels:
      app: node-app
  
  template:
    metadata:
      labels:
        app: node-app
    spec:
      containers:
      - name: node-app
        image: my-node-app:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 10

---
apiVersion: v1
kind: Service
metadata:
  name: node-app-service

spec:
  selector:
    app: node-app
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

---

## 98. What is serverless computing and AWS Lambda for Node.js?

**Answer:**

**Serverless** means no server management - just deploy code, it runs.

### Simple Analogy:

- **Traditional server** = Own a house (buy, maintain, pay mortgage)
- **Serverless** = Hotel room (book when needed, pay per night)

### AWS Lambda Example:

```javascript
// handler.js
exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from Lambda!'
    })
  };
};

exports.processData = async (event) => {
  const data = JSON.parse(event.body);
  
  // Process data
  const result = data.value * 2;
  
  return {
    statusCode: 200,
    body: JSON.stringify({ result })
  };
};
```

### Deployment:

```bash
# Using AWS CLI
aws lambda create-function \
  --function-name my-function \
  --runtime nodejs16.x \
  --role arn:aws:iam::ACCOUNT:role/lambda-role \
  --handler handler.hello \
  --zip-file fileb://function.zip
```

### Benefits:

✅ **No server management**  
✅ **Auto-scaling**  
✅ **Pay only for execution time**  
✅ **Highly available**  

### Drawbacks:

❌ **Cold start latency**  
❌ **Limited execution time** (15 minutes max)  
❌ **Vendor lock-in**  

---

## 99. What are logging strategies in Node.js?

**Answer:**

Proper logging helps debug and monitor applications.

### Logging Levels:

```
ERROR   - Critical issues
WARN    - Warnings
INFO    - General information
DEBUG   - Detailed debugging
TRACE   - Very detailed
```

### Real Example - Winston Logger:

```bash
npm install winston
```

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    // Log to file
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    
    // Log to console
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// Usage
logger.error('Database connection failed');
logger.warn('Cache miss for key');
logger.info('User logged in');
logger.debug('Query took 100ms');
```

### Logging in Express:

```javascript
const morgan = require('morgan');

// HTTP request logging
app.use(morgan('combined'));

// Or custom format
app.use(morgan(':method :url :status :response-time ms'));

// Error logging middleware
app.use((err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });
  
  res.status(500).json({ error: 'Internal server error' });
});
```

---

## 100. What are best practices for Node.js development?

**Answer:**

Key practices for production-ready applications.

### 1. Error Handling:

```javascript
// Always handle errors
app.get('/data', async (req, res, next) => {
  try {
    const data = await fetchData();
    res.json(data);
  } catch (err) {
    next(err); // Pass to error handler
  }
});

// Global error handler
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
```

### 2. Environment Variables:

```javascript
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DATABASE_URL;
const NODE_ENV = process.env.NODE_ENV || 'development';
```

### 3. Input Validation:

```javascript
const { body, validationResult } = require('express-validator');

app.post('/user', [
  body('email').isEmail(),
  body('password').isLength({ min: 8 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors });
  }
  
  // Process
});
```

### 4. Security:

```javascript
const helmet = require('helmet');
const cors = require('cors');

// Set security headers
app.use(helmet());

// Enable CORS safely
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',')
}));

// Rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));
```

### 5. Logging:

```javascript
// Use structured logging
logger.info('User login successful', {
  userId: user.id,
  timestamp: new Date(),
  ip: req.ip
});
```

### 6. Database Connection Pooling:

```javascript
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'myapp'
});
```

### 7. Graceful Shutdown:

```javascript
const server = app.listen(3000);

process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
```

---

## Complete Summary of Q89-Q100

You now understand:

✅ Child processes vs worker threads  
✅ Blocking vs non-blocking operations  
✅ CPU-bound vs I/O-bound tasks  
✅ Garbage collection  
✅ Memory management  
✅ Zero-downtime deployment  
✅ API rate throttling  
✅ Docker containerization  
✅ Kubernetes orchestration  
✅ AWS Lambda serverless  
✅ Logging strategies  
✅ Best practices  

**You've completed comprehensive Node.js interview preparation!** 🎉

---

## FINAL SUMMARY (Q1-Q100)

### Complete Node.js Interview Coverage:

**Basics (Q1-20)** - Core concepts and fundamentals  
**Modules (Q11-20)** - Package management  
**File System (Q21-25)** - File operations  
**Asynchrony (Q26-34)** - Event loop and async patterns  
**Streams (Q35-40)** - Stream processing  
**HTTP (Q41-50)** - Server creation and routing  
**Express.js (Q51-64)** - Web framework essentials  
**Authentication (Q65-77)** - Security and auth  
**Database (Q65-72)** - Database integration  
**Architecture (Q73-79)** - Design patterns  
**Testing (Q80-84)** - Testing frameworks  
**Performance (Q85-91)** - Optimization  
**Advanced (Q92-100)** - Deployment and production

**Total: 100 Comprehensive Questions covering every aspect of Node.js development!**
