# Node.js Interview Questions (Q69-Q77 Detailed Answers)

## SECTION 9 CONTINUED: DATABASE & SECURITY

## 69. How do you connect Node.js to SQL databases?

**Answer:**

Multiple ways to connect to SQL databases from Node.js: direct drivers, query builders, or ORMs.

### Connection Methods:

**1. Using MySQL2/Promise (Direct Driver):**

```bash
npm install mysql2/promise
```

```javascript
const mysql = require('mysql2/promise');

async function connectDB() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'myapp'
  });
  
  console.log('Connected to MySQL');
  return connection;
}

// Use connection
const connection = await connectDB();

// Query
const [rows] = await connection.execute('SELECT * FROM users');
console.log(rows);

// Insert
await connection.execute(
  'INSERT INTO users (name, email) VALUES (?, ?)',
  ['John', 'john@example.com']
);

await connection.end();
```

**2. Using Connection Pool (Better for Apps):**

```javascript
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'myapp',
  waitForConnections: true,
  connectionLimit: 10,        // Max connections
  queueLimit: 0               // Queue limit
});

// Use pool (not single connection)
async function getUsers() {
  const connection = await pool.getConnection();
  const [rows] = await connection.execute('SELECT * FROM users');
  connection.release();
  return rows;
}
```

**3. Using Query Builder (Knex.js):**

```bash
npm install knex mysql2
```

```javascript
const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'myapp'
  }
});

// Query building (readable, safe)
const users = await knex('users')
  .select('*')
  .where('active', true);

// Insert
await knex('users').insert({
  name: 'John',
  email: 'john@example.com'
});

// Update
await knex('users')
  .where('id', 1)
  .update({ name: 'Jane' });

// Delete
await knex('users').where('id', 1).delete();
```

### Using ORM (Sequelize):

```bash
npm install sequelize mysql2
```

```javascript
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('myapp', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

// Define model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  }
}, {
  timestamps: true
});

// Sync database
await sequelize.sync();

// Create
const user = await User.create({
  name: 'John',
  email: 'john@example.com'
});

// Read
const users = await User.findAll();

// Update
await User.update({ name: 'Jane' }, { where: { id: 1 } });

// Delete
await User.destroy({ where: { id: 1 } });
```

---

## 70. What is Sequelize/TypeORM/Prisma ORM?

**Answer:**

ORMs are libraries that map database tables to JavaScript objects/classes, making database operations easier.

### Comparison Table:

| Aspect               | Sequelize             | TypeORM    | Prisma     |
| -------------------- | --------------------- | ---------- | ---------- |
| **Language**   | JavaScript/TypeScript | TypeScript | TypeScript |
| **Learning**   | Easy                  | Medium     | Easiest    |
| **Query**      | Method chains         | Decorators | Schema DSL |
| **Database**   | Multiple              | Multiple   | Multiple   |
| **Migrations** | Built-in              | Built-in   | Built-in   |

### Sequelize Example:

```javascript
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('db', 'user', 'pass', {
  host: 'localhost',
  dialect: 'mysql'
});

// Define model
const User = sequelize.define('User', {
  username: DataTypes.STRING,
  email: DataTypes.STRING
});

// Create
await User.create({ username: 'john', email: 'john@ex.com' });

// Find
const user = await User.findByPk(1);

// Update
await user.update({ username: 'jane' });

// Delete
await user.destroy();
```

### TypeORM Example:

```typescript
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  username: string;
  
  @Column()
  email: string;
}

// Create
const user = new User();
user.username = 'john';
user.email = 'john@ex.com';
await repository.save(user);

// Find
const user = await repository.findOne(1);

// Update
user.username = 'jane';
await repository.save(user);
```

### Prisma Example:

```prisma
// schema.prisma
model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
}
```

```typescript
// Use
const user = await prisma.user.create({
  data: {
    name: 'John',
    email: 'john@ex.com'
  }
});

const user = await prisma.user.findUnique({
  where: { email: 'john@ex.com' }
});
```

---

## 71. What is connection pooling?

**Answer:**

**Connection pooling** maintains a pool of reusable database connections instead of creating/closing connections for each request.

### Simple Analogy:

Think of connection pooling like a **swimming pool with lanes**:

- Without pooling: Build new pool for each swimmer (expensive)
- With pooling: Reuse same pool for many swimmers (efficient)

### Problem Without Pooling:

```javascript
// ❌ WRONG - Create new connection for each request
app.get('/users', async (req, res) => {
  // Create connection (slow)
  const connection = await mysql.createConnection(config);
  
  // Query
  const [rows] = await connection.execute('SELECT * FROM users');
  
  // Close connection (slow)
  await connection.end();
  
  res.json(rows);
});

// 100 requests = 100 connections created/closed
// Very slow!
```

### Solution - Connection Pooling:

```javascript
// ✅ CORRECT - Reuse connections
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'myapp',
  waitForConnections: true,
  connectionLimit: 10,  // Max 10 connections
  queueLimit: 0         // Queue limit
});

app.get('/users', async (req, res) => {
  // Get connection from pool (fast)
  const connection = await pool.getConnection();
  
  try {
    // Query
    const [rows] = await connection.execute('SELECT * FROM users');
    res.json(rows);
  } finally {
    // Return connection to pool (not close it)
    connection.release();
  }
});

// 100 requests = reuse 10 connections
// Much faster!
```

### How Connection Pooling Works:

```
Pool: [conn1, conn2, conn3, conn4, conn5] (size = 5)

Request 1:
  ↓ Take conn1 from pool
  ↓ Query database
  ↓ Return conn1 to pool

Request 2:
  ↓ Take conn2 from pool
  ↓ Query database
  ↓ Return conn2 to pool

Request 1-5 run in parallel (5 connections)

Request 6:
  ↓ Wait for connection to be available
  ↓ When conn1 is released, use it
  ↓ Query database
  ↓ Return to pool
```

### Real Example - Express with Connection Pooling:

```javascript
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();

// Create pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'myapp',
  connectionLimit: 10,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0
});

// Helper function
async function query(sql, params) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(sql, params);
    return rows;
  } finally {
    connection.release();
  }
}

// Routes
app.get('/users', async (req, res) => {
  const users = await query('SELECT * FROM users', []);
  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  const users = await query('SELECT * FROM users WHERE id = ?', [req.params.id]);
  res.json(users[0]);
});

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const result = await query(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email]
  );
  res.json({ id: result.insertId });
});

app.listen(3000);
```

### Configuration Options:

```javascript
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'myapp',
  
  // Pool options
  connectionLimit: 10,           // Max concurrent connections
  waitForConnections: true,      // Wait if no connections available
  queueLimit: 0,                 // 0 = unlimited queue
  enableKeepAlive: true,         // Keep connections alive
  keepAliveInitialDelayMs: 0,    // Initial delay
  
  // Connection options
  waitForConnectionsMs: 10000,   // Wait timeout
  connectionTimeoutMs: 30000,    // Connection timeout
  idleTimeout: 1000              // Close idle connections
});
```

---

## 72. What is database migration?

**Answer:**

**Database migration** is a controlled way to modify database schema (tables, columns, etc.) over time, tracking all changes.

### Simple Analogy:

Think of migrations like **version control for your database**:

- Git tracks code changes
- Migrations track database changes
- You can go forward and backward

### Why Migrations Matter:

```
Without migrations:
  Developer 1: Adds users table manually
  Developer 2: Doesn't know about the change
  Server: Already has different schema
  Result: Chaos and bugs!

With migrations:
  Developer 1: Creates migration "create_users_table"
  Developer 2: Runs migrations and gets same schema
  Server: Migrations auto-run on deploy
  Result: Everyone synchronized!
```

### Sequelize Migrations Example:

**Installation:**

```bash
npm install sequelize-cli
```

**Generate Migration:**

```bash
npx sequelize-cli migration:generate --name create-users
```

**Migration File (auto-generated):**

```javascript
// migrations/20240101000000-create-users.js
module.exports = {
  async up(queryInterface, Sequelize) {
    // Define what happens when migrating UP (applying change)
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down(queryInterface, Sequelize) {
    // Define what happens when migrating DOWN (reverting change)
    await queryInterface.dropTable('Users');
  }
};
```

**Run Migrations:**

```bash
# Run all pending migrations
npx sequelize-cli db:migrate

# Undo last migration
npx sequelize-cli db:migrate:undo

# Undo all migrations
npx sequelize-cli db:migrate:undo:all
```

### Real Example - Multiple Migrations:

**Migration 1: Create users table**

```javascript
// migrations/20240101000000-create-users.js
async up(queryInterface, Sequelize) {
  await queryInterface.createTable('Users', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    name: Sequelize.STRING,
    email: Sequelize.STRING
  });
}

async down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Users');
}
```

**Migration 2: Add phone column**

```javascript
// migrations/20240102000000-add-phone-to-users.js
async up(queryInterface, Sequelize) {
  await queryInterface.addColumn('Users', 'phone', {
    type: Sequelize.STRING,
    allowNull: true
  });
}

async down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('Users', 'phone');
}
```

**Migration 3: Make email unique**

```javascript
// migrations/20240103000000-make-email-unique.js
async up(queryInterface, Sequelize) {
  await queryInterface.addConstraint('Users', {
    fields: ['email'],
    type: 'unique',
    name: 'unique_email_constraint'
  });
}

async down(queryInterface, Sequelize) {
  await queryInterface.removeConstraint('Users', 'unique_email_constraint');
}
```

### Timeline:

```
Database:
  Initially: Empty

Run Migration 1:
  ↓ Users table created (id, name, email)

Run Migration 2:
  ↓ phone column added to Users

Run Migration 3:
  ↓ email made unique

Revert Migration 3:
  ↓ unique constraint removed from email

Revert Migration 2:
  ↓ phone column removed

Revert Migration 1:
  ↓ Users table dropped
  ↓ Back to empty database
```

---

## 73. What is the MVC pattern in Node.js?

**Answer:**

**MVC** = Model-View-Controller. Separates application into three layers:

- **Model** = Database logic
- **View** = What user sees
- **Controller** = Business logic

### Simple Analogy:

Think of MVC like a **restaurant**:

- **Model** = Kitchen (database, recipes)
- **View** = Dining room (what customer sees)
- **Controller** = Waiter (takes orders, delivers food)

### Project Structure:

```
project/
├── models/
│   └── User.js           (Database schema)
├── views/
│   └── users/
│       ├── list.html     (Display users)
│       └── detail.html   (Show user details)
├── controllers/
│   └── UserController.js (Business logic)
├── routes/
│   └── users.js          (Route definitions)
└── app.js
```

### Model (Database):

```javascript
// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

module.exports = mongoose.model('User', userSchema);
```

### Controller (Business Logic):

```javascript
// controllers/UserController.js
const User = require('../models/User');

class UserController {
  // Get all users
  static async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.render('users/list', { users });
    } catch (err) {
      res.status(500).send('Error');
    }
  }
  
  // Get single user
  static async getUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      res.render('users/detail', { user });
    } catch (err) {
      res.status(404).send('User not found');
    }
  }
  
  // Create user
  static async createUser(req, res) {
    try {
      const user = new User(req.body);
      await user.save();
      res.redirect('/users');
    } catch (err) {
      res.status(400).send('Error creating user');
    }
  }
}

module.exports = UserController;
```

### Routes (URL Mapping):

```javascript
// routes/users.js
const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUser);
router.post('/', UserController.createUser);

module.exports = router;
```

### View (HTML):

```html
<!-- views/users/list.html -->
<h1>Users</h1>
<ul>
  <% users.forEach(user => { %>
    <li>
      <a href="/users/<%= user.id %>"><%= user.name %></a>
    </li>
  <% }); %>
</ul>
```

### App Setup:

```javascript
// app.js
const express = require('express');
const userRoutes = require('./routes/users');

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());

// Use routes
app.use('/users', userRoutes);

app.listen(3000);
```

### How It Works:

```
User visits /users/123
     ↓
Router matches route
     ↓
UserController.getUser() called
     ↓
Model queries database
     ↓
View renders HTML
     ↓
HTML sent to browser
```

---

## 74. What are services and controllers in Node.js architecture?

**Answer:**

**Controllers** handle HTTP requests
**Services** contain business logic

### Simple Analogy:

- **Controller** = Waiter (takes order, serves food)
- **Service** = Chef (prepares food)

### Structure:

```
project/
├── controllers/
│   └── UserController.js
├── services/
│   └── UserService.js
├── models/
│   └── User.js
└── routes/
    └── users.js
```

### Service (Business Logic):

```javascript
// services/UserService.js
const User = require('../models/User');
const bcrypt = require('bcrypt');

class UserService {
  // Create user with validation and hashing
  static async createUser(userData) {
    // Validation
    if (!userData.email || !userData.password) {
      throw new Error('Email and password required');
    }
  
    // Check if user exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('User already exists');
    }
  
    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
  
    // Create user
    const user = await User.create({
      ...userData,
      password: hashedPassword
    });
  
    return user;
  }
  
  // Get user by ID
  static async getUserById(id) {
    const user = await User.findById(id);
  
    if (!user) {
      throw new Error('User not found');
    }
  
    return user;
  }
  
  // Update user
  static async updateUser(id, updateData) {
    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });
  
    return user;
  }
}

module.exports = UserService;
```

### Controller (HTTP Handling):

```javascript
// controllers/UserController.js
const UserService = require('../services/UserService');

class UserController {
  // Create user endpoint
  static async createUser(req, res, next) {
    try {
      const user = await UserService.createUser(req.body);
  
      res.status(201).json({
        success: true,
        message: 'User created',
        user
      });
    } catch (err) {
      // Pass error to error handling middleware
      next(err);
    }
  }
  
  // Get user endpoint
  static async getUser(req, res, next) {
    try {
      const user = await UserService.getUserById(req.params.id);
  
      res.json({
        success: true,
        user
      });
    } catch (err) {
      next(err);
    }
  }
  
  // Update user endpoint
  static async updateUser(req, res, next) {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
  
      res.json({
        success: true,
        message: 'User updated',
        user
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
```

### Routes:

```javascript
// routes/users.js
const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.post('/', UserController.createUser);
router.get('/:id', UserController.getUser);
router.put('/:id', UserController.updateUser);

module.exports = router;
```

### Flow Diagram:

```
HTTP Request
    ↓
Route Handler
    ↓
Controller (extract data, call service)
    ↓
Service (business logic, validation, database)
    ↓
Model (database operations)
    ↓
Service returns result
    ↓
Controller formats response
    ↓
HTTP Response
```

### Benefits:

✅ **Separation of concerns** - Each layer has responsibility
✅ **Testable** - Easy to unit test services
✅ **Reusable** - Services used by multiple controllers
✅ **Maintainable** - Easy to modify business logic

---

## 75. What is dependency injection and why use it?

**Answer:**

**Dependency injection (DI)** is passing required objects/dependencies to a function instead of creating them inside.

### Simple Analogy:

- **Without DI** = You make your own breakfast (depends on having all ingredients)
- **With DI** = Someone brings you breakfast (depends on their delivery)

### Problem Without DI:

```javascript
// ❌ WRONG - Hard dependencies
class UserService {
  constructor() {
    this.db = new Database(); // Creates its own database
    this.logger = new Logger(); // Creates its own logger
    this.emailer = new Emailer(); // Creates its own emailer
  }
  
  async createUser(userData) {
    try {
      const user = this.db.insert(userData);
      this.logger.info('User created');
      this.emailer.send(user.email, 'Welcome');
      return user;
    } catch (err) {
      this.logger.error(err);
    }
  }
}

// Problems:
// - Can't test without real database, logger, emailer
// - Hard to swap implementations
// - Changes to dependencies affect this class
```

### Solution - Dependency Injection:

```javascript
// ✅ CORRECT - Dependencies injected
class UserService {
  constructor(db, logger, emailer) {
    this.db = db;        // Dependencies passed in
    this.logger = logger;
    this.emailer = emailer;
  }
  
  async createUser(userData) {
    try {
      const user = this.db.insert(userData);
      this.logger.info('User created');
      this.emailer.send(user.email, 'Welcome');
      return user;
    } catch (err) {
      this.logger.error(err);
    }
  }
}

// Usage - Production
const userService = new UserService(
  new Database(),
  new Logger(),
  new Emailer()
);

// Usage - Testing (with mocks)
const mockDb = { insert: () => ({ id: 1, name: 'Test' }) };
const mockLogger = { info: () => {}, error: () => {} };
const mockEmailer = { send: () => {} };

const userService = new UserService(mockDb, mockLogger, mockEmailer);
```

### Real Example - Express with DI:

```javascript
// services/UserService.js
class UserService {
  constructor(userRepository, emailService) {
    this.userRepository = userRepository;
    this.emailService = emailService;
  }
  
  async createUser(userData) {
    const user = await this.userRepository.create(userData);
    await this.emailService.sendWelcomeEmail(user);
    return user;
  }
}

// repositories/UserRepository.js
class UserRepository {
  constructor(db) {
    this.db = db;
  }
  
  async create(userData) {
    return this.db.query('INSERT INTO users ...', userData);
  }
  
  async findById(id) {
    return this.db.query('SELECT * FROM users WHERE id = ?', [id]);
  }
}

// controllers/UserController.js
class UserController {
  constructor(userService) {
    this.userService = userService;
  }
  
  async createUser(req, res) {
    const user = await this.userService.createUser(req.body);
    res.json(user);
  }
}

// app.js - Wire everything together
const express = require('express');
const app = express();

// Create instances
const db = new Database();
const userRepository = new UserRepository(db);
const emailService = new EmailService();
const userService = new UserService(userRepository, emailService);
const userController = new UserController(userService);

// Routes
app.post('/users', (req, res) => userController.createUser(req, res));
```

### Benefits:

✅ **Testable** - Easy to mock dependencies
✅ **Flexible** - Swap implementations easily
✅ **Loosely coupled** - Components don't depend on each other
✅ **Maintainable** - Easy to understand dependencies

---

## 76. What is the singleton pattern in Node.js?

**Answer:**

**Singleton pattern** ensures only one instance of a class exists throughout the application.

### Simple Analogy:

Think of singleton like a **Queen Bee in a hive**:

- Only one queen
- All bees reference the same queen
- Everyone gets the same queen instance

### Real Example - Database Connection:

```javascript
// ❌ WRONG - Multiple instances
const connection1 = new Database();
const connection2 = new Database();
const connection3 = new Database();

// 3 different connections (wasteful!)
```

**✅ CORRECT - Singleton:**

```javascript
// database/Database.js
class Database {
  // Private static instance
  static #instance = null;
  
  // Private constructor (can't use new directly)
  constructor() {
    if (Database.#instance) {
      return Database.#instance;
    }
  
    this.pool = createConnectionPool();
    Database.#instance = this;
  }
  
  // Static method to get instance
  static getInstance() {
    if (!Database.#instance) {
      new Database();
    }
    return Database.#instance;
  }
}

// Usage
const db1 = Database.getInstance();
const db2 = Database.getInstance();

console.log(db1 === db2); // true - same instance!
```

### Real Example - Logger Singleton:

```javascript
// logger/Logger.js
class Logger {
  static #instance = null;
  
  constructor() {
    if (Logger.#instance) {
      return Logger.#instance;
    }
  
    this.logs = [];
    Logger.#instance = this;
  }
  
  static getInstance() {
    if (!Logger.#instance) {
      new Logger();
    }
    return Logger.#instance;
  }
  
  log(message) {
    const timestamp = new Date().toISOString();
    this.logs.push({ timestamp, message });
    console.log(`[${timestamp}] ${message}`);
  }
  
  getLogs() {
    return this.logs;
  }
}

// Usage
const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();

logger1.log('Event 1');
logger2.log('Event 2');

console.log(logger1.getLogs()); // Both events (same instance)
```

### Alternative - Module-level Singleton (Simpler):

```javascript
// logger.js
class Logger {
  constructor() {
    this.logs = [];
  }
  
  log(message) {
    this.logs.push(message);
    console.log(message);
  }
}

// Create single instance at module level
const logger = new Logger();

// Export singleton instance
module.exports = logger;

// Usage
const logger = require('./logger');
logger.log('Event 1');
logger.log('Event 2');

// Always the same instance!
```

### In Express Application:

```javascript
// app.js
const express = require('express');
const Logger = require('./Logger');
const Database = require('./Database');

const app = express();

const logger = Logger.getInstance();
const db = Database.getInstance();

app.get('/api/data', (req, res) => {
  logger.log('Request received');
  
  const data = db.query('SELECT * FROM users');
  res.json(data);
});

app.listen(3000);
```

### Benefits:

✅ **Single instance** - Controlled resource usage
✅ **Global access** - Available everywhere
✅ **State sharing** - All components see same state

### Drawbacks:

❌ **Hard to test** - Can't easily mock
❌ **Global state** - Can cause issues
❌ **Not thread-safe** - Problems in concurrent environments

---

## 77. What is the factory pattern in backend development?

**Answer:**

**Factory pattern** creates objects without specifying their exact classes. It's like a factory that produces different products.

### Simple Analogy:

Think of factory like a **car dealership**:

- You ask for a "car"
- Dealership decides if it's a sedan, SUV, or truck
- You get the right type

### Real Example - Database Factory:

```javascript
// factories/DatabaseFactory.js
class DatabaseFactory {
  static createDatabase(type) {
    switch(type) {
      case 'mysql':
        return new MySQLDatabase();
      case 'mongodb':
        return new MongoDBDatabase();
      case 'postgresql':
        return new PostgreSQLDatabase();
      default:
        throw new Error('Unknown database type');
    }
  }
}

// Usage
const dbType = process.env.DB_TYPE;
const db = DatabaseFactory.createDatabase(dbType);

// Different database, same interface!
```

### Real Example - User Factory:

```javascript
// factories/UserFactory.js
class UserFactory {
  static createUser(type, data) {
    switch(type) {
      case 'admin':
        return new AdminUser(data);
      case 'customer':
        return new CustomerUser(data);
      case 'moderator':
        return new ModeratorUser(data);
      default:
        return new User(data);
    }
  }
}

// User classes
class User {
  constructor(data) {
    this.name = data.name;
    this.email = data.email;
    this.role = 'user';
  }
  
  getPermissions() {
    return ['read'];
  }
}

class AdminUser extends User {
  constructor(data) {
    super(data);
    this.role = 'admin';
  }
  
  getPermissions() {
    return ['read', 'write', 'delete', 'admin'];
  }
}

class CustomerUser extends User {
  constructor(data) {
    super(data);
    this.role = 'customer';
  }
  
  getPermissions() {
    return ['read', 'write'];
  }
}

// Usage
const admin = UserFactory.createUser('admin', { name: 'John', email: 'john@ex.com' });
const customer = UserFactory.createUser('customer', { name: 'Jane', email: 'jane@ex.com' });

console.log(admin.getPermissions());    // ['read', 'write', 'delete', 'admin']
console.log(customer.getPermissions()); // ['read', 'write']
```

### Benefits:

✅ **Flexibility** - Easy to add new types
✅ **Decoupling** - Client doesn't know concrete classes
✅ **Centralized** - All object creation in one place

---

## Complete Summary of Q69-Q77

You now understand:

✅ Connecting to SQL databases
✅ ORMs (Sequelize, TypeORM, Prisma)
✅ Connection pooling
✅ Database migrations
✅ MVC pattern
✅ Services and controllers
✅ Dependency injection
✅ Singleton pattern
✅ Factory pattern
