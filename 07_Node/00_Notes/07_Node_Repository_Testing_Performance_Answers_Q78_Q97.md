# Node.js Interview Questions (Q78-Q88 Detailed Answers)

## SECTION 10 CONTINUED: DESIGN PATTERNS

## 78. What is the repository pattern?

**Answer:**

**Repository pattern** abstracts database access logic. It acts as an intermediary between business logic and data access layer.

### Simple Analogy:

Think of repository like a **librarian**:

- You ask librarian for a book (don't care how they find it)
- Librarian knows where books are stored
- Librarian returns the book
- Database implementation is hidden

### Without Repository Pattern:

```javascript
// ❌ WRONG - Database logic mixed with business logic
app.get('/users/:id', async (req, res) => {
  // Direct database query in route
  const user = await User.findById(req.params.id);
  res.json(user);
});

app.post('/users', async (req, res) => {
  // Database logic here too
  const user = await User.create(req.body);
  res.json(user);
});

// Problems:
// - Hard to test (need real database)
// - Hard to change database (update everywhere)
// - Business logic mixed with data access
```

### With Repository Pattern:

```javascript
// Repository - All database logic here
class UserRepository {
  constructor(db) {
    this.db = db;
  }
  
  async findById(id) {
    return await this.db.query('SELECT * FROM users WHERE id = ?', [id]);
  }
  
  async findAll() {
    return await this.db.query('SELECT * FROM users');
  }
  
  async create(userData) {
    const result = await this.db.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [userData.name, userData.email]
    );
    return result;
  }
  
  async update(id, userData) {
    return await this.db.query(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [userData.name, userData.email, id]
    );
  }
  
  async delete(id) {
    return await this.db.query('DELETE FROM users WHERE id = ?', [id]);
  }
}

// Service - Business logic
class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  
  async getUserById(id) {
    const user = await this.userRepository.findById(id);
  
    if (!user) {
      throw new Error('User not found');
    }
  
    return user;
  }
  
  async createUser(userData) {
    // Validation
    if (!userData.email || !userData.name) {
      throw new Error('Email and name required');
    }
  
    // Create via repository
    return await this.userRepository.create(userData);
  }
}

// Controller - HTTP handling
class UserController {
  constructor(userService) {
    this.userService = userService;
  }
  
  async getUser(req, res, next) {
    try {
      const user = await this.userService.getUserById(req.params.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
  
  async createUser(req, res, next) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }
}

// Routes
const express = require('express');
const app = express();

const db = new Database();
const userRepository = new UserRepository(db);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

app.get('/users/:id', (req, res, next) => 
  userController.getUser(req, res, next)
);
app.post('/users', (req, res, next) => 
  userController.createUser(req, res, next)
);
```

### Testing with Repository Pattern:

```javascript
// Easy to test! Mock the repository
class MockUserRepository {
  async findById(id) {
    return { id: 1, name: 'John', email: 'john@ex.com' };
  }
  
  async create(userData) {
    return { id: 1, ...userData };
  }
}

// Test service without database
describe('UserService', () => {
  let userService;
  
  beforeEach(() => {
    const mockRepo = new MockUserRepository();
    userService = new UserService(mockRepo);
  });
  
  test('should return user by id', async () => {
    const user = await userService.getUserById(1);
    expect(user.name).toBe('John');
  });
});
```

### Benefits:

✅ **Separation of concerns** - Data access separated from business logic
✅ **Testable** - Easy to mock repositories
✅ **Flexible** - Switch databases easily
✅ **Maintainable** - Change database queries in one place

---

## 79. What is event-driven architecture in Node.js apps?

**Answer:**

**Event-driven architecture** uses events to communicate between components instead of direct function calls.

### Simple Analogy:

Think of events like a **newspaper**:

- Publisher (NewsStation) publishes news
- Subscribers (Readers) get notified
- They don't call each other directly

### Without Event-Driven (Bad):

```javascript
// ❌ WRONG - Tight coupling
class OrderService {
  async createOrder(orderData) {
    const order = await this.saveOrder(orderData);
  
    // Tightly coupled to other services
    await this.emailService.sendConfirmation(order);
    await this.inventoryService.reduceStock(order);
    await this.paymentService.processPayment(order);
  
    return order;
  }
}

// Problem:
// - OrderService depends on EmailService, InventoryService, PaymentService
// - If one fails, entire chain breaks
// - Hard to test
// - New requirements need code changes
```

### With Event-Driven (Good):

```javascript
const EventEmitter = require('events');

// Order Service - emits events
class OrderService extends EventEmitter {
  async createOrder(orderData) {
    const order = await this.saveOrder(orderData);
  
    // Emit event instead of calling services directly
    this.emit('order:created', order);
  
    return order;
  }
}

// Email Service - listens for events
class EmailService extends EventEmitter {
  subscribe(orderService) {
    orderService.on('order:created', (order) => {
      console.log('Sending confirmation email...');
      this.sendConfirmation(order);
    });
  }
}

// Inventory Service - listens for events
class InventoryService extends EventEmitter {
  subscribe(orderService) {
    orderService.on('order:created', (order) => {
      console.log('Reducing inventory...');
      this.reduceStock(order);
    });
  }
}

// Payment Service - listens for events
class PaymentService extends EventEmitter {
  subscribe(orderService) {
    orderService.on('order:created', (order) => {
      console.log('Processing payment...');
      this.processPayment(order);
    });
  }
}

// Setup
const orderService = new OrderService();
const emailService = new EmailService();
const inventoryService = new InventoryService();
const paymentService = new PaymentService();

// Subscribe to events
emailService.subscribe(orderService);
inventoryService.subscribe(orderService);
paymentService.subscribe(orderService);

// Now when order is created, all services are notified
await orderService.createOrder({ items: [...] });
```

### Real Example - User Registration:

```javascript
const EventEmitter = require('events');

class UserService extends EventEmitter {
  async register(userData) {
    // Create user
    const user = await this.saveUser(userData);
  
    // Emit events
    this.emit('user:registered', user);
    this.emit('user:created', user);
  
    return user;
  }
}

// Email Service - sends welcome email
class EmailService {
  subscribe(userService) {
    userService.on('user:registered', (user) => {
      console.log(`Sending welcome email to ${user.email}`);
      this.sendWelcomeEmail(user.email);
    });
  }
}

// Analytics Service - track user signup
class AnalyticsService {
  subscribe(userService) {
    userService.on('user:registered', (user) => {
      console.log('User registration tracked');
      this.trackEvent('user_signup', { userId: user.id });
    });
  }
}

// Notification Service - send notification
class NotificationService {
  subscribe(userService) {
    userService.on('user:registered', (user) => {
      console.log('Sending notification');
      this.notify(user.id, 'Welcome to our platform!');
    });
  }
}

// Setup
const userService = new UserService();
new EmailService().subscribe(userService);
new AnalyticsService().subscribe(userService);
new NotificationService().subscribe(userService);

// Register user - all services notified automatically
await userService.register({
  name: 'John',
  email: 'john@example.com'
});
```

### Using Message Queue (Production):

```javascript
// Instead of EventEmitter, use message queue for production
const amqp = require('amqplib');

class OrderService {
  constructor(channel) {
    this.channel = channel;
  }
  
  async createOrder(orderData) {
    const order = await this.saveOrder(orderData);
  
    // Publish to message queue
    await this.channel.assertExchange('orders', 'fanout', { durable: true });
    this.channel.publish(
      'orders',
      '',
      Buffer.from(JSON.stringify(order))
    );
  
    return order;
  }
}

class EmailService {
  constructor(channel) {
    this.channel = channel;
  }
  
  async subscribe() {
    await this.channel.assertExchange('orders', 'fanout', { durable: true });
    const queue = await this.channel.assertQueue('', { exclusive: true });
    await this.channel.bindQueue(queue.queue, 'orders', '');
  
    this.channel.consume(queue.queue, (msg) => {
      const order = JSON.parse(msg.content.toString());
      this.sendConfirmation(order.email);
    });
  }
}
```

### Benefits:

✅ **Loose coupling** - Services don't depend on each other
✅ **Scalability** - Easy to add new services
✅ **Resilience** - One failure doesn't crash everything
✅ **Flexibility** - Easy to change behavior

---

## SECTION 11: TESTING & DEVOPS

## 80. What is unit testing in Node.js?

**Answer:**

**Unit testing** tests individual functions/methods in isolation to ensure they work correctly.

### Simple Analogy:

Think of unit testing like testing **individual LEGO blocks**:

- Each block must be correct
- Before assembling the building
- Test each piece first

### Real Example - Simple Function:

```javascript
// Function to test
function calculateTotal(items) {
  let total = 0;
  
  for (let item of items) {
    total += item.price * item.quantity;
  }
  
  return total;
}

// Unit tests
describe('calculateTotal', () => {
  test('should return 0 for empty array', () => {
    expect(calculateTotal([])).toBe(0);
  });
  
  test('should calculate total correctly', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 }
    ];
    expect(calculateTotal(items)).toBe(35); // 10*2 + 5*3
  });
  
  test('should handle single item', () => {
    const items = [{ price: 100, quantity: 1 }];
    expect(calculateTotal(items)).toBe(100);
  });
});
```

### Real Example - User Validation:

```javascript
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

describe('validateEmail', () => {
  test('should accept valid emails', () => {
    expect(validateEmail('john@example.com')).toBe(true);
  });
  
  test('should reject invalid emails', () => {
    expect(validateEmail('invalid.email')).toBe(false);
    expect(validateEmail('@example.com')).toBe(false);
    expect(validateEmail('john@')).toBe(false);
  });
  
  test('should reject empty string', () => {
    expect(validateEmail('')).toBe(false);
  });
});
```

### Testing Async Functions:

```javascript
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    if (id <= 0) {
      reject(new Error('Invalid ID'));
    }
    setTimeout(() => {
      resolve({ id, name: 'John' });
    }, 100);
  });
}

describe('fetchUser', () => {
  test('should return user data', async () => {
    const user = await fetchUser(1);
    expect(user.name).toBe('John');
  });
  
  test('should reject invalid ID', async () => {
    await expect(fetchUser(-1)).rejects.toThrow('Invalid ID');
  });
});
```

---

## 81. What is Jest/Mocha/Chai used for?

**Answer:**

Testing frameworks for Node.js that help write and run tests.

### Comparison Table:

| Feature              | Jest                | Mocha       | Chai                |
| -------------------- | ------------------- | ----------- | ------------------- |
| **Type**       | Complete framework  | Test runner | Assertion library   |
| **Setup**      | Built-in, no config | Needs setup | Partner with Mocha  |
| **Assertions** | Built-in            | Needs Chai  | Provides assertions |
| **Mocking**    | Built-in            | Need sinon  | Need sinon          |
| **Snapshot**   | Yes                 | No          | No                  |

### Jest Example:

```bash
npm install --save-dev jest
```

```javascript
// calculator.test.js
describe('Calculator', () => {
  test('adds two numbers', () => {
    expect(2 + 2).toBe(4);
  });
  
  test('subtracts two numbers', () => {
    expect(5 - 3).toBe(2);
  });
  
  test('handles async operations', async () => {
    const result = await Promise.resolve(42);
    expect(result).toBe(42);
  });
});
```

### Mocha + Chai Example:

```bash
npm install --save-dev mocha chai
```

```javascript
// calculator.test.js
const { expect } = require('chai');
const calculator = require('./calculator');

describe('Calculator', () => {
  it('should add two numbers', () => {
    expect(calculator.add(2, 2)).to.equal(4);
  });
  
  it('should subtract two numbers', () => {
    expect(calculator.subtract(5, 3)).to.equal(2);
  });
  
  it('should handle async operations', async () => {
    const result = await Promise.resolve(42);
    expect(result).to.equal(42);
  });
});
```

### Running Tests:

```bash
# Jest
npm test

# Mocha
npx mocha

# With watch mode
npm test -- --watch
```

---

## 82. What is supertest and how do you test endpoints?

**Answer:**

**Supertest** is a library for testing HTTP endpoints in Node.js.

### Installation:

```bash
npm install --save-dev supertest
```

### Real Example:

```javascript
const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json());

app.get('/api/users/:id', (req, res) => {
  if (req.params.id === '1') {
    res.json({ id: 1, name: 'John' });
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

app.post('/api/users', (req, res) => {
  res.status(201).json({
    id: 1,
    name: req.body.name,
    email: req.body.email
  });
});

describe('User API', () => {
  test('GET /api/users/1 returns user', async () => {
    const response = await request(app)
      .get('/api/users/1')
      .expect(200);
  
    expect(response.body.name).toBe('John');
  });
  
  test('GET /api/users/999 returns 404', async () => {
    await request(app)
      .get('/api/users/999')
      .expect(404);
  });
  
  test('POST /api/users creates user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'Alice', email: 'alice@ex.com' })
      .expect(201);
  
    expect(response.body.name).toBe('Alice');
    expect(response.body.email).toBe('alice@ex.com');
  });
  
  test('POST /api/users validates input', async () => {
    await request(app)
      .post('/api/users')
      .send({ name: '' })
      .expect(400);
  });
});
```

---

## 83. What is mocking and stubbing in Node.js tests?

**Answer:**

**Mocking** replaces a function/module for testing. **Stubbing** replaces implementation with a test version.

### Real Example - Without Mocking:

```javascript
// ❌ WRONG - Tests depend on real database
function getUserById(id, db) {
  return db.query(`SELECT * FROM users WHERE id = ${id}`);
}

test('should get user', async () => {
  const realDb = new Database();
  const user = await getUserById(1, realDb); // Needs real database!
  expect(user.name).toBe('John');
});
```

### With Mocking:

```javascript
const sinon = require('sinon');

function getUserById(id, db) {
  return db.query(`SELECT * FROM users WHERE id = ${id}`);
}

test('should get user', async () => {
  // Mock the database
  const mockDb = {
    query: sinon.stub().resolves({ id: 1, name: 'John' })
  };
  
  const user = await getUserById(1, mockDb);
  expect(user.name).toBe('John');
  
  // Verify the query was called
  expect(mockDb.query.calledWith('SELECT * FROM users WHERE id = 1')).toBe(true);
});
```

### Real Example - API Testing:

```javascript
const sinon = require('sinon');
const axios = require('axios');

async function fetchUserData(userId) {
  const response = await axios.get(`/api/users/${userId}`);
  return response.data;
}

test('should fetch user data', async () => {
  // Mock axios
  const stub = sinon.stub(axios, 'get').resolves({
    data: { id: 1, name: 'John' }
  });
  
  const user = await fetchUserData(1);
  expect(user.name).toBe('John');
  
  // Verify
  expect(stub.calledWith('/api/users/1')).toBe(true);
  
  // Restore
  stub.restore();
});
```

---

## 84. What is integration testing?

**Answer:**

**Integration testing** tests multiple components working together, not just individual functions.

### Simple Analogy:

- **Unit testing** = Test individual LEGO blocks
- **Integration testing** = Test LEGO blocks assembled together

### Real Example:

```javascript
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const User = mongoose.model('User', { name: String, email: String });

app.post('/api/users', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

app.get('/api/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

describe('User API Integration Tests', () => {
  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect('mongodb://localhost/test');
  });
  
  afterAll(async () => {
    await mongoose.disconnect();
  });
  
  test('should create and retrieve user', async () => {
    // Create user
    const createResponse = await request(app)
      .post('/api/users')
      .send({ name: 'John', email: 'john@ex.com' })
      .expect(201);
  
    const userId = createResponse.body._id;
  
    // Retrieve user
    const getResponse = await request(app)
      .get(`/api/users/${userId}`)
      .expect(200);
  
    expect(getResponse.body.name).toBe('John');
    expect(getResponse.body.email).toBe('john@ex.com');
  });
});
```

### Tests Multiple Layers:

```
HTTP Request
  ↓
Express Route Handler
  ↓
Service Logic
  ↓
Database Query
  ↓
Response

Integration tests verify entire flow!
```

---

## SECTION 12: PERFORMANCE & OPTIMIZATION

## 85. What are Node.js performance bottlenecks?

**Answer:**

Common issues that slow down Node.js applications.

### Bottleneck 1: CPU-Intensive Operations:

```javascript
// ❌ BAD - Blocks event loop
function slowCalculation() {
  let sum = 0;
  for (let i = 0; i < 10000000000; i++) {
    sum += i;
  }
  return sum;
}

app.get('/calculate', (req, res) => {
  const result = slowCalculation(); // Blocks for 10 seconds!
  res.json(result);
  // All other requests wait!
});

// ✅ GOOD - Offload to worker thread
const { Worker } = require('worker_threads');

app.get('/calculate', (req, res) => {
  const worker = new Worker('./calculate.js');
  worker.on('message', (result) => {
    res.json(result);
  });
});
```

### Bottleneck 2: Synchronous File Operations:

```javascript
// ❌ BAD - Blocking
app.get('/file', (req, res) => {
  const data = fs.readFileSync('large-file.txt'); // Blocks!
  res.send(data);
});

// ✅ GOOD - Non-blocking
app.get('/file', (req, res) => {
  fs.readFile('large-file.txt', (err, data) => {
    res.send(data);
  });
});
```

### Bottleneck 3: Memory Leaks:

```javascript
// ❌ BAD - Memory leak
const cache = [];

app.get('/data/:id', (req, res) => {
  // Cache keeps growing forever!
  cache.push({ id: req.params.id, timestamp: Date.now() });
  res.json({ cached: cache.length });
});

// ✅ GOOD - Limit cache size
const LRU = require('lru-cache');
const cache = new LRU({ max: 1000, ttl: 1000 * 60 * 60 }); // 1 hour

app.get('/data/:id', (req, res) => {
  if (cache.has(req.params.id)) {
    return res.json(cache.get(req.params.id));
  }
  // Fetch and cache
});
```

### Bottleneck 4: N+1 Queries:

```javascript
// ❌ BAD - Too many queries
app.get('/users/:id/posts', async (req, res) => {
  const user = await User.findById(req.params.id); // Query 1
  
  // Query for each post!
  const posts = user.postIds.map(postId =>
    Post.findById(postId) // Query N
  );
  
  res.json(posts);
});

// ✅ GOOD - Use population
const user = await User.findById(req.params.id)
  .populate('posts'); // Single query with JOIN

res.json(user.posts);
```

---

## 86. What is clustering in Node.js and when should you use it?

**Answer:**

**Clustering** lets you run multiple Node.js processes to utilize all CPU cores.

### Simple Analogy:

Think of clustering like **hiring multiple servers**:

- Single Node.js uses 1 CPU core
- Clustering uses all cores
- Better performance

### How Clustering Works:

```
Master Process
├─ Worker 1 (Core 1)
├─ Worker 2 (Core 2)
├─ Worker 3 (Core 3)
└─ Worker 4 (Core 4)

Request comes in → Load balancer → Assigns to available worker
```

### Real Example:

```javascript
const cluster = require('cluster');
const os = require('os');
const http = require('http');

if (cluster.isMaster) {
  // Master process
  const numCPUs = os.cpus().length;
  
  console.log(`Master process ${process.pid} starting`);
  
  // Create worker for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  // If worker dies, create new one
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  // Worker process
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Hello from worker ${process.pid}`);
  }).listen(3000);
  
  console.log(`Worker ${process.pid} started`);
}
```

### Using PM2 (Better in Production):

```bash
npm install -g pm2

# Run with clustering
pm2 start app.js -i max  # -i max = number of CPUs

# Monitor
pm2 monit
```

**package.json:**

```json
{
  "scripts": {
    "start": "pm2 start app.js -i max"
  }
}
```

### When to Use:

✅ **Production** - Maximize CPU usage
✅ **Multi-core servers** - Take advantage of all cores
✅ **Need high throughput** - Handle many requests

---

## 87. What is PM2 and why is it used?

**Answer:**

**PM2** is a process manager for Node.js that handles clustering, monitoring, and auto-restart.

### Installation:

```bash
npm install -g pm2
```

### Common Commands:

```bash
# Start app
pm2 start app.js

# Start with clustering
pm2 start app.js -i max

# List all processes
pm2 list

# Monitor processes
pm2 monit

# View logs
pm2 logs app

# Restart
pm2 restart app

# Stop
pm2 stop app

# Delete
pm2 delete app

# Save current configuration
pm2 save

# Resurrect on reboot
pm2 startup
```

### PM2 Configuration File:

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'my-app',
    script: 'app.js',
    instances: 'max',           // Use all CPU cores
    exec_mode: 'cluster',       // Clustering mode
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    },
    error_file: 'logs/error.log',
    out_file: 'logs/out.log',
    max_memory_restart: '1G',    // Restart if > 1GB memory
    watch: true,                 // Watch for file changes
    ignore_watch: ['node_modules', 'logs']
  }]
};
```

### Running with Config:

```bash
# Development
pm2 start ecosystem.config.js

# Production
pm2 start ecosystem.config.js --env production
```

---

## 88. What is caching and how can Redis be used for caching?

**Answer:**

**Caching** stores frequently accessed data in memory for fast retrieval instead of querying database every time.

### Simple Analogy:

- **Without cache** = Go to library for every book (slow)
- **With cache** = Keep favorite books on shelf (fast)

### Real Example - Without Redis:

```javascript
// ❌ BAD - Query database every time
app.get('/user/:id', async (req, res) => {
  const user = await User.findById(req.params.id); // Slow database query
  res.json(user);
});

// If 100 requests for same user = 100 database queries!
```

### With Redis Cache:

```bash
npm install redis
```

```javascript
const redis = require('redis');
const client = redis.createClient();

app.get('/user/:id', async (req, res) => {
  const cacheKey = `user:${req.params.id}`;
  
  // Check cache first
  const cachedUser = await client.get(cacheKey);
  if (cachedUser) {
    console.log('Cache hit!');
    return res.json(JSON.parse(cachedUser));
  }
  
  // Not in cache, query database
  const user = await User.findById(req.params.id);
  
  // Store in cache for 1 hour
  await client.setEx(cacheKey, 3600, JSON.stringify(user));
  
  res.json(user);
});
```

### Cache Invalidation:

```javascript
app.put('/user/:id', async (req, res) => {
  // Update database
  const user = await User.findByIdAndUpdate(req.params.id, req.body);
  
  // Invalidate cache
  const cacheKey = `user:${req.params.id}`;
  await client.del(cacheKey);
  
  res.json(user);
});
```

### Cache Patterns:

**Pattern 1: Cache-Aside (Lazy Loading)**

```javascript
// Check cache first
// If miss, query database and cache result
```

**Pattern 2: Write-Through**

```javascript
// When writing, update both database and cache
```

**Pattern 3: Write-Behind**

```javascript
// Update cache immediately
// Update database later (batch)
```

---

## Complete Summary of Q78-Q88

You now understand:

✅ Repository pattern
✅ Event-driven architecture
✅ Unit testing
✅ Jest/Mocha/Chai frameworks
✅ Supertest for endpoint testing
✅ Mocking and stubbing
✅ Integration testing
✅ Performance bottlenecks
✅ Clustering and PM2
✅ Caching with Redis
