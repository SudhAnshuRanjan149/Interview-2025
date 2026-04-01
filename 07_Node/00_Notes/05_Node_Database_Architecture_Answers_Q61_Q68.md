# Node.js Interview Questions (Q61-Q68 Detailed Answers)

## SECTION 9: DATABASE INTEGRATION

## 61. How do you connect Node.js with MongoDB using Mongoose?

**Answer:**

**Mongoose** is an ODM (Object Data Modeling) library for MongoDB. It provides a simple way to connect and interact with MongoDB databases.

### Simple Analogy:

Think of Mongoose like a **translator between JavaScript and MongoDB**:

- You work with JavaScript objects
- Mongoose converts them to MongoDB format
- Makes it easier to validate and manage data

### Installation:

```bash
npm install mongoose
```

### Basic Connection:

```javascript
const mongoose = require('mongoose');

// Connect to MongoDB
const uri = 'mongodb://localhost:27017/myapp';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});
```

### Using Environment Variables:

```javascript
require('dotenv').config();

const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp';

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));
```

### Real Example - Full Setup:

```javascript
const mongoose = require('mongoose');

// Define schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create model
const User = mongoose.model('User', userSchema);

// Connect
mongoose.connect('mongodb://localhost:27017/myapp');

// Use model
async function createUser() {
  try {
    const user = new User({
      name: 'John Doe',
      email: 'john@example.com',
      age: 30
    });
  
    await user.save();
    console.log('User created:', user);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

createUser();
```

### Connection String:

```
mongodb://localhost:27017/myapp
          ↑        ↑       ↑
      host:port  database
  
mongodb+srv://user:pass@cluster.mongodb.net/myapp?retryWrites=true
- MongoDB Atlas connection string
```

### Connection Options:

```javascript
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,          // Connection pool size
  socketTimeoutMS: 45000,   // Socket timeout
  serverSelectionTimeoutMS: 5000, // Server selection timeout
};

mongoose.connect(uri, options);
```

---

## 62. What is a schema and model in Mongoose?

**Answer:**

**Schema** = Blueprint of data structure
**Model** = Constructor to create documents

### Simple Analogy:

- **Schema** = House blueprint
- **Model** = Factory to build houses

### Schema Definition:

```javascript
const mongoose = require('mongoose');

// Define schema
const userSchema = new mongoose.Schema({
  // Field name: { type, options }
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  age: {
    type: Number,
    min: 0,
    max: 150
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
```

### Schema Types:

```javascript
const schema = new mongoose.Schema({
  // Primitive types
  string: String,
  number: Number,
  boolean: Boolean,
  date: Date,
  
  // Complex types
  array: [String],           // Array of strings
  object: mongoose.Schema.Types.Mixed,
  objectId: mongoose.Schema.Types.ObjectId,
  
  // Nested document
  address: {
    street: String,
    city: String,
    country: String
  }
});
```

### Creating a Model:

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

// Create model from schema
const User = mongoose.model('User', userSchema);
// Collection name will be 'users' (lowercase, plural)

module.exports = User;
```

### Using Model:

```javascript
const User = require('./models/User');

// Create document
const newUser = new User({
  name: 'Alice',
  email: 'alice@example.com'
});

await newUser.save();

// Or create directly
const user = await User.create({
  name: 'Bob',
  email: 'bob@example.com'
});

// Find documents
const users = await User.find();
const user = await User.findById(id);

// Update
await User.updateOne({ _id: id }, { name: 'Charlie' });

// Delete
await User.deleteOne({ _id: id });
```

### Schema with Methods:

```javascript
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String
});

// Instance method
userSchema.methods.fullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

// Static method
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email });
};

const User = mongoose.model('User', userSchema);

// Use methods
const user = await User.findById(id);
console.log(user.fullName()); // Instance method

const userByEmail = await User.findByEmail('john@example.com'); // Static method
```

---

## 63. What is population in MongoDB/Mongoose?

**Answer:**

**Population** replaces a reference (ObjectId) with the actual document data from another collection.

### Simple Analogy:

Think of population like **replacing a photo ID with the actual person**:

- Without population: You get a photo ID number
- With population: You get the full person's information

### Real Example - Without Population:

```javascript
const mongoose = require('mongoose');

// Author schema
const authorSchema = new mongoose.Schema({
  name: String,
  email: String
});

// Book schema (references Author)
const bookSchema = new mongoose.Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'  // Reference to Author model
  }
});

const Author = mongoose.model('Author', authorSchema);
const Book = mongoose.model('Book', bookSchema);

// Create data
const author = await Author.create({
  name: 'J.K. Rowling',
  email: 'jk@example.com'
});

const book = await Book.create({
  title: 'Harry Potter',
  author: author._id  // Store just the ID
});

// Without population
const bookWithoutPopulation = await Book.findById(book._id);
console.log(bookWithoutPopulation);
// {
//   _id: '123...',
//   title: 'Harry Potter',
//   author: '456...'  // Just the ID!
// }
```

### With Population:

```javascript
// With population
const bookWithPopulation = await Book.findById(book._id)
  .populate('author'); // Replace author ID with actual author document

console.log(bookWithPopulation);
// {
//   _id: '123...',
//   title: 'Harry Potter',
//   author: {
//     _id: '456...',
//     name: 'J.K. Rowling',
//     email: 'jk@example.com'
//   }
// }
```

### Multiple Levels of Population:

```javascript
// Author has posts, posts have comments
const postSchema = new mongoose.Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

// Get post with author name and comments
const post = await Post.findById(postId)
  .populate('author')      // Replace author ID with author data
  .populate('comments');   // Replace comment IDs with comment data

// Or nested population
const post = await Post.findById(postId)
  .populate({
    path: 'author'
  })
  .populate({
    path: 'comments',
    populate: { path: 'author' } // Populate author within comments
  });
```

### Select Specific Fields:

```javascript
const book = await Book.findById(book._id)
  .populate('author', 'name email'); // Only name and email fields

console.log(book);
// {
//   title: 'Harry Potter',
//   author: {
//     name: 'J.K. Rowling',
//     email: 'jk@example.com'
//     // _id is always included
//   }
// }
```

### Real Example - Blog System:

```javascript
// Author model
const authorSchema = new mongoose.Schema({
  name: String,
  bio: String
});

// Post model
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  }
});

const Author = mongoose.model('Author', authorSchema);
const Post = mongoose.model('Post', postSchema);

// Get all posts with author details
const posts = await Post.find()
  .populate('author')
  .exec();

// Result:
// [
//   {
//     title: 'Post 1',
//     content: 'Content...',
//     author: { name: 'Alice', bio: 'Bio...' }
//   },
//   {
//     title: 'Post 2',
//     content: 'Content...',
//     author: { name: 'Bob', bio: 'Bio...' }
//   }
// ]
```

---

## 64. What is indexing in MongoDB?

**Answer:**

**Indexing** speeds up queries by creating a sorted data structure. Without indexes, MongoDB scans every document.

### Simple Analogy:

Think of indexing like a **book index**:

- Without index: Read entire book to find a topic
- With index: Look up topic in index, jump to page directly

### Creating Indexes:

```javascript
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    index: true  // Create index on email
  },
  name: String,
  age: Number
});

const User = mongoose.model('User', userSchema);
```

### Different Index Types:

**1. Single Field Index:**

```javascript
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    index: true
  }
});

// Queries using email are fast
const user = await User.findOne({ email: 'john@example.com' });
```

**2. Unique Index:**

```javascript
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true  // Index + unique constraint
  }
});

// Can't create two users with same email
```

**3. Compound Index:**

```javascript
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
});

// Index on multiple fields
userSchema.index({ firstName: 1, lastName: 1 });

// Fast query using both fields
const user = await User.findOne({ firstName: 'John', lastName: 'Doe' });
```

**4. Text Index:**

```javascript
const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});

// Text search index
articleSchema.index({ title: 'text', content: 'text' });

// Search articles
const results = await Article.find({
  $text: { $search: 'mongodb' }
});
```

**5. Sparse Index:**

```javascript
const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    sparse: true  // Only index documents with this field
  }
});
```

### Real Example - E-commerce:

```javascript
const productSchema = new mongoose.Schema({
  name: String,
  sku: {
    type: String,
    unique: true,
    index: true  // Fast lookup by SKU
  },
  category: {
    type: String,
    index: true  // Fast lookup by category
  },
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now,
    index: true  // Fast sorting by date
  }
});

// Compound index for common queries
productSchema.index({ category: 1, price: 1 });

const Product = mongoose.model('Product', productSchema);

// Fast queries
const product = await Product.findOne({ sku: 'ABC123' });
const productsByCategory = await Product.find({ category: 'Electronics' });
const recentProducts = await Product.find()
  .sort({ createdAt: -1 })
  .limit(10);
```

### Index Performance:

```
Without index:
- Query: Find user by email
- MongoDB scans: 1,000,000 documents
- Time: 500ms

With index:
- Query: Find user by email
- MongoDB jumps to index: O(log n)
- Time: 1ms

500x faster!
```

---

## 65. How do you connect Node.js to SQL databases?

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

## 66. What is Sequelize/TypeORM/Prisma ORM?

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

## SECTION 10: NODE.JS ARCHITECTURE & DESIGN PATTERNS

## 67. What is the MVC pattern in Node.js?

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

## 68. What are services and controllers in Node.js architecture?

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

## Complete Summary of Q61-Q68

You now understand:

✅ Connecting Node.js to MongoDB with Mongoose
✅ Schemas and Models
✅ Population in MongoDB
✅ Indexing for performance
✅ Connecting to SQL databases
✅ ORMs (Sequelize, TypeORM, Prisma)
✅ MVC pattern in Node.js
✅ Services and Controllers architecture
