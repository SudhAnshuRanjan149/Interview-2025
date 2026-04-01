# Node.js Interview Questions (Q51-Q60 Detailed Answers)

## SECTION 7 CONTINUED: EXPRESS.JS FUNDAMENTALS

## 51. What is express.json() and express.urlencoded()?

**Answer:**

These are built-in middleware functions that parse incoming request bodies.

### Simple Analogy:

Think of middleware like a **translator**:

- Incoming data: Raw bytes
- Middleware: Translates to JavaScript objects
- Your code: Works with JavaScript objects

### express.json():

Parses requests with JSON content-type to JavaScript objects.

```javascript
const express = require('express');
const app = express();

// Enable JSON parsing
app.use(express.json());

app.post('/users', (req, res) => {
  // req.body is now a JavaScript object!
  console.log(req.body);
  
  const { name, email, age } = req.body;
  
  res.json({ status: 'User received', name, email, age });
});

app.listen(3000);
```

**Request Example:**

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","age":25}'
```

**What Happens:**

```
Incoming: {"name":"John","email":"john@example.com","age":25}
  ↓ express.json() middleware
req.body: { name: 'John', email: 'john@example.com', age: 25 }
```

### express.urlencoded():

Parses form data (application/x-www-form-urlencoded).

```javascript
const express = require('express');
const app = express();

// Enable form data parsing
app.use(express.urlencoded({ extended: false }));

app.post('/login', (req, res) => {
  // req.body is now a JavaScript object!
  const { username, password } = req.body;
  
  console.log('Username:', username);
  console.log('Password:', password);
  
  res.json({ status: 'Login received' });
});

app.listen(3000);
```

**Request Example:**

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=john&password=secret123"
```

### Real Example - Both Together:

```javascript
const express = require('express');
const app = express();

// Parse JSON requests
app.use(express.json());

// Parse form data
app.use(express.urlencoded({ extended: false }));

// Now both JSON and form data work!
app.post('/submit', (req, res) => {
  console.log('Received:', req.body);
  res.json(req.body);
});

app.listen(3000);
```

### Difference Between them:

```
express.json():
- Parses: Content-Type: application/json
- Data: {"name":"John"}
- Use: API requests, modern apps

express.urlencoded():
- Parses: Content-Type: application/x-www-form-urlencoded
- Data: name=John&age=25
- Use: HTML forms, traditional web
```

### extended Option:

```javascript
// extended: false
// Uses querystring library (simple)
// Only parses strings and arrays

// extended: true
// Uses qs library (advanced)
// Can parse nested objects
app.use(express.urlencoded({ extended: true }));
```

---

## 52. How do you handle errors in Express.js?

**Answer:**

Multiple strategies to handle errors in Express applications.

### Strategy 1: Try-Catch in Route Handlers:

```javascript
const express = require('express');
const app = express();

app.get('/user/:id', (req, res) => {
  try {
    const userId = req.params.id;
  
    // Simulate error
    if (!userId) {
      throw new Error('User ID is required');
    }
  
    // Get user from database
    const user = getUser(userId); // Could throw error
  
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(3000);
```

### Strategy 2: Error Handling Middleware:

```javascript
const express = require('express');
const app = express();

// Regular routes
app.get('/users/:id', (req, res, next) => {
  try {
    const user = getUser(req.params.id);
    res.json(user);
  } catch (err) {
    // Pass error to error handling middleware
    next(err);
  }
});

// Error handling middleware (4 parameters!)
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status || 500
    }
  });
});

app.listen(3000);
```

### Strategy 3: Async/Await with Wrapper:

```javascript
const express = require('express');
const app = express();

// Wrapper function to catch async errors
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Use with async routes
app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await getUser(req.params.id); // Errors caught automatically!
  res.json(user);
}));

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(3000);
```

### Strategy 4: Custom Error Class:

```javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const express = require('express');
const app = express();

app.get('/users/:id', (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new AppError('User ID required', 400);
    }
  
    res.json({ user: 'data' });
  } catch (err) {
    next(err);
  }
});

// Error middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Server error';
  
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { error: err })
  });
});

app.listen(3000);
```

### Strategy 5: Complete Error Handling Setup:

```javascript
const express = require('express');
const app = express();

// Error handling for undefined routes
app.use('*', (req, res, next) => {
  const err = new Error(`${req.originalUrl} - Not Found`);
  res.status(404);
  next(err);
});

// Error handling middleware
app.use((err, req, res, next) => {
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(status);
  res.json({
    message: err.message,
    status: status,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

app.listen(3000);
```

---

## 53. What are custom middleware?

**Answer:**

**Custom middleware** are functions you create to process requests, responses, or perform operations.

### Simple Analogy:

Think of middleware like **security checkpoints**:

- Request comes in
- Checkpoint validates it
- If OK, passes to next checkpoint
- Eventually reaches the handler

### Basic Middleware Structure:

```javascript
// Middleware function has 3 parameters (4 for error handling)
const myMiddleware = (req, res, next) => {
  // Do something with request
  console.log('Middleware running');
  
  // MUST call next() to pass to next middleware
  next();
};

// Apply middleware
app.use(myMiddleware);
```

### Real Examples:

**Example 1 - Logging Middleware:**

```javascript
const express = require('express');
const app = express();

// Custom logging middleware
const logger = (req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
  next();
};

app.use(logger);

app.get('/users', (req, res) => {
  res.json({ users: [] });
});

// Output when request comes in:
// [10:30:45] GET /users
```

**Example 2 - Authentication Middleware:**

```javascript
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  // Verify token
  if (token === 'valid-token-123') {
    req.user = { id: 1, name: 'John' };
    next();
  } else {
    res.status(401).json({ error: 'Invalid token' });
  }
};

app.get('/profile', authenticate, (req, res) => {
  // Only runs if authenticate middleware calls next()
  res.json({ user: req.user });
});
```

**Example 3 - Request Timing Middleware:**

```javascript
const timingMiddleware = (req, res, next) => {
  const start = Date.now();
  
  // When response is sent, calculate time taken
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`Request took ${duration}ms`);
  });
  
  next();
};

app.use(timingMiddleware);
```

**Example 4 - CORS Middleware:**

```javascript
const corsMiddleware = (req, res, next) => {
  // Allow requests from anywhere
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  
  next();
};

app.use(corsMiddleware);
```

**Example 5 - Request Validation Middleware:**

```javascript
const validateJSON = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!req.is('application/json')) {
      return res.status(400).json({ error: 'Content-Type must be JSON' });
    }
  }
  
  next();
};

app.use(validateJSON);

app.post('/data', (req, res) => {
  res.json({ received: req.body });
});
```

### Middleware Order Matters:

```javascript
const express = require('express');
const app = express();

// Middleware runs in order of definition!

app.use((req, res, next) => {
  console.log('Middleware 1');
  next();
});

app.use((req, res, next) => {
  console.log('Middleware 2');
  next();
});

app.get('/', (req, res) => {
  console.log('Handler');
  res.json({ msg: 'ok' });
});

// Request output:
// Middleware 1
// Middleware 2
// Handler
```

### Route-Specific Middleware:

```javascript
const authMiddleware = (req, res, next) => {
  // Check authorization
  next();
};

const adminMiddleware = (req, res, next) => {
  // Check if admin
  next();
};

const express = require('express');
const app = express();

// Middleware only on specific route
app.get('/public', (req, res) => {
  res.json({ data: 'public' });
});

app.get('/profile', authMiddleware, (req, res) => {
  res.json({ data: 'user profile' });
});

app.delete('/admin', authMiddleware, adminMiddleware, (req, res) => {
  res.json({ data: 'admin action' });
});
```

---

## 54. How do you implement file uploads in Express?

**Answer:**

Handling file uploads in Express using the `multer` middleware.

### Installation:

```bash
npm install multer
```

### Basic File Upload:

```javascript
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save to uploads folder
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Route for single file upload
app.post('/upload', upload.single('file'), (req, res) => {
  console.log('File uploaded:', req.file);
  
  res.json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
    originalname: req.file.originalname,
    size: req.file.size
  });
});

app.listen(3000);
```

### Multiple Files Upload:

```javascript
const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Upload multiple files
app.post('/upload-multiple', upload.array('files', 5), (req, res) => {
  console.log('Files uploaded:', req.files);
  
  res.json({
    message: 'Files uploaded',
    count: req.files.length,
    files: req.files.map(f => ({
      filename: f.filename,
      size: f.size
    }))
  });
});

app.listen(3000);
```

### File Type Validation:

```javascript
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// File filter
const fileFilter = (req, file, cb) => {
  // Allow only images
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files allowed'));
  }
};

const upload = multer({
  dest: 'uploads/',
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // 5MB max
});

app.post('/upload-image', upload.single('image'), (req, res) => {
  res.json({ message: 'Image uploaded', file: req.file });
});

app.listen(3000);
```

### HTML Form for Upload:

```html
<form action="/upload" method="POST" enctype="multipart/form-data">
  <input type="file" name="file" required />
  <button type="submit">Upload</button>
</form>
```

---

## 55. How do you create modular routes in Express?

**Answer:**

Organizing routes into separate modules for better code organization.

### Basic Structure:

```
project/
├── routes/
│   ├── users.js
│   ├── products.js
│   └── orders.js
├── app.js
└── server.js
```

### Route Module Example:

**routes/users.js:**

```javascript
const express = require('express');
const router = express.Router();

// Get all users
router.get('/', (req, res) => {
  res.json({ users: [] });
});

// Get user by ID
router.get('/:id', (req, res) => {
  res.json({ user: { id: req.params.id } });
});

// Create user
router.post('/', (req, res) => {
  res.json({ message: 'User created' });
});

// Update user
router.put('/:id', (req, res) => {
  res.json({ message: 'User updated' });
});

// Delete user
router.delete('/:id', (req, res) => {
  res.json({ message: 'User deleted' });
});

module.exports = router;
```

**routes/products.js:**

```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ products: [] });
});

router.get('/:id', (req, res) => {
  res.json({ product: { id: req.params.id } });
});

router.post('/', (req, res) => {
  res.json({ message: 'Product created' });
});

module.exports = router;
```

### Main App File:

**app.js:**

```javascript
const express = require('express');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');

const app = express();

app.use(express.json());

// Use modular routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

module.exports = app;
```

**server.js:**

```javascript
const app = require('./app');

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### With Middleware:

```javascript
// routes/admin.js
const express = require('express');
const router = express.Router();

// Middleware for admin routes only
const checkAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ error: 'Admin only' });
  }
};

router.get('/dashboard', checkAdmin, (req, res) => {
  res.json({ dashboard: 'admin data' });
});

module.exports = router;
```

### Real Example - Complete Structure:

```javascript
// app.js
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Auth middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    req.user = { id: 1, name: 'John' };
    next();
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
};

// Import routes
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

// Apply routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', authenticate, orderRoutes); // With auth

app.listen(3000);
```

---

## SECTION 8: AUTHENTICATION & SECURITY

## 56. What is JWT (JSON Web Token) and how does it work?

**Answer:**

**JWT** is a way to securely transmit information as a JSON object.

### Simple Analogy:

Think of JWT like a **passport**:

- Passport contains information about you
- Stamp proves government issued it (signed)
- Border guard verifies it (doesn't need to call government)

### JWT Structure:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

│─────────────────────────────────────────────────────────────────────────────────────────────┤
          Header                    Payload                           Signature
│─────────────────────────────────────────────────────────────────────────────────────────────┤
```

### Three Parts:

**1. Header:**

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**2. Payload:**

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

**3. Signature:**

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  your-secret-key
)
```

### JWT Implementation in Node.js:

**Installation:**

```bash
npm install jsonwebtoken
```

**Create JWT:**

```javascript
const jwt = require('jsonwebtoken');

const secret = 'your-secret-key';

// Create token
const token = jwt.sign(
  { userId: 123, email: 'john@example.com' },
  secret,
  { expiresIn: '24h' } // Expires in 24 hours
);

console.log('Token:', token);
```

**Verify JWT:**

```javascript
const jwt = require('jsonwebtoken');

const secret = 'your-secret-key';
const token = 'eyJhbGc...'; // Token from client

try {
  // Verify token
  const decoded = jwt.verify(token, secret);
  console.log('Decoded:', decoded);
  // { userId: 123, email: 'john@example.com', iat: ..., exp: ... }
} catch (err) {
  console.error('Invalid token:', err.message);
}
```

### Complete Authentication Flow:

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const secret = 'my-secret-key';

// Step 1: Login endpoint - Create JWT
app.post('/login', (req, res) => {
  const user = {
    id: 1,
    email: 'john@example.com',
    name: 'John Doe'
  };
  
  // Create token
  const token = jwt.sign(user, secret, { expiresIn: '24h' });
  
  res.json({
    message: 'Login successful',
    token: token
  });
});

// Step 2: Middleware - Verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Step 3: Protected route
app.get('/profile', verifyToken, (req, res) => {
  res.json({
    message: 'Profile data',
    user: req.user
  });
});

app.listen(3000);
```

### How to Use:

```bash
# 1. Login to get token
curl -X POST http://localhost:3000/login

# Response:
# {
#   "message": "Login successful",
#   "token": "eyJhbGc..."
# }

# 2. Use token to access protected route
curl -H "Authorization: Bearer eyJhbGc..." http://localhost:3000/profile

# Response:
# {
#   "message": "Profile data",
#   "user": { "id": 1, "email": "john@example.com" }
# }
```

---

## 57. What is OAuth and how is it used in Node.js?

**Answer:**

**OAuth** is an authorization standard that lets users login using third-party accounts (Google, GitHub, Facebook).

### Simple Analogy:

Think of OAuth like **using your passport at an airport**:

- You don't give your passport to the airport
- You show it to verify your identity
- Airport verifies with government
- You're allowed in

### OAuth Flow:

```
User clicks "Login with Google"
         ↓
Your app → Google: "Hey, user wants to login"
         ↓
User logs in to Google
         ↓
Google → Your app: "User confirmed, here's code"
         ↓
Your app → Google: "Give me access token for user"
         ↓
Google → Your app: "Here's access token"
         ↓
Your app gets user info
         ↓
User logged in to your app
```

### OAuth Implementation with Google:

**Installation:**

```bash
npm install passport passport-google-oauth20
```

**Setup:**

```javascript
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// Configure Google Strategy
passport.use(new GoogleStrategy(
  {
    clientID: 'your-google-client-id',
    clientSecret: 'your-google-client-secret',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    // User info from Google
    const user = {
      id: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName
    };
  
    // Save to database or create session
    return done(null, user);
  }
);

// OAuth routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // User authenticated, redirect to home
    res.redirect('/dashboard');
  }
);

app.listen(3000);
```

### OAuth vs Regular Login:

| Aspect                     | Regular Login       | OAuth               |
| -------------------------- | ------------------- | ------------------- |
| **Password storage** | Your server         | Third-party (safer) |
| **User data**        | You manage          | Third-party manages |
| **Convenience**      | Type password       | Click and login     |
| **Security**         | Your responsibility | Delegated           |

---

## 58. What is the difference between authentication and authorization?

**Answer:**

**Authentication** = Verifying WHO you are
**Authorization** = Verifying WHAT you can do

### Simple Analogy:

- **Authentication** = Checking your ID at airport (are you really John Doe?)
- **Authorization** = Checking your ticket (can you board flight 123?)

### Real Examples:

```javascript
const express = require('express');
const app = express();

// ===== AUTHENTICATION =====
// Verifying the user is who they claim to be
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: 'No token - not authenticated' });
  }
  
  // Verify token
  if (verifyToken(token)) {
    req.user = getUser(token);
    next();
  } else {
    return res.status(401).json({ error: 'Invalid token - not authenticated' });
  }
};

// ===== AUTHORIZATION =====
// Verifying the user has permission to do something
const authorize = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
  
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Not authorized - forbidden' });
    }
  
    next();
  };
};

// Route that requires authentication
app.get('/profile', authenticate, (req, res) => {
  res.json({ user: req.user }); // Can access
});

// Route that requires authentication AND authorization
app.delete('/admin', authenticate, authorize('admin'), (req, res) => {
  res.json({ message: 'Admin action performed' }); // Only admins
});

app.listen(3000);
```

### Status Codes:

```
401 Unauthorized = Authentication failed
  (Who are you? I don't know!)

403 Forbidden = Authorization failed
  (I know who you are, but you can't do this!)
```

---

## 59. What is bcrypt and how do you hash passwords?

**Answer:**

**bcrypt** is a library for securely hashing passwords.

### Why Hash Passwords?

```
❌ WRONG - Store plain text
User table:
| id | email | password |
| 1  | john@ex | mypassword123 |
← If database leaked, passwords are exposed!

✅ CORRECT - Store hashed
User table:
| id | email | password |
| 1  | john@ex | $2b$10$N9qo8uLO... |
← Even if database leaked, passwords are safe!
```

### Installation:

```bash
npm install bcrypt
```

### Hashing Passwords:

```javascript
const bcrypt = require('bcrypt');

async function hashPassword(plainPassword) {
  // Generate salt with 10 rounds
  const salt = await bcrypt.genSalt(10);
  
  // Hash password
  const hashedPassword = await bcrypt.hash(plainPassword, salt);
  
  console.log('Original:', plainPassword);
  console.log('Hashed:', hashedPassword);
  
  return hashedPassword;
}

hashPassword('myPassword123');
// Original: myPassword123
// Hashed: $2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7Tz0KKP...
```

### Verifying Passwords:

```javascript
const bcrypt = require('bcrypt');

async function verifyPassword(plainPassword, hashedPassword) {
  // Compare plain password with hashed
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  
  return isMatch;
}

// Usage
const plainPassword = 'myPassword123';
const hashedPassword = '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7Tz0KKP...';

const isCorrect = await verifyPassword(plainPassword, hashedPassword);
console.log('Password matches:', isCorrect); // true
```

### Complete Login/Register Flow:

```javascript
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

// In-memory user storage (use database in production)
const users = [];

// Register endpoint
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
  
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Save user
    const user = {
      id: Date.now(),
      email,
      password: hashedPassword
    };
  
    users.push(user);
  
    res.json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
  
    // Find user
    const user = users.find(u => u.email === email);
  
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
  
    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
  
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }
  
    res.json({ message: 'Login successful', user: { id: user.id, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000);
```

---

## 60. How do you secure Express routes?

**Answer:**

Multiple strategies to protect routes in Express applications.

### Strategy 1: JWT Authentication:

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const secret = 'my-secret';

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }
  
  try {
    req.user = jwt.verify(token, secret);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Protected route
app.get('/secure', verifyToken, (req, res) => {
  res.json({ message: 'This is secure', user: req.user });
});

app.listen(3000);
```

### Strategy 2: Role-Based Access:

```javascript
const authorize = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    next();
  };
};

// Only admins can delete
app.delete('/user/:id', verifyToken, authorize(['admin']), (req, res) => {
  res.json({ message: 'User deleted' });
});
```

### Strategy 3: HTTPS Only:

```javascript
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem')
};

https.createServer(options, app).listen(3000);
```

### Strategy 4: Rate Limiting:

```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit to 100 requests per windowMs
});

app.use(limiter); // Apply to all routes
```

---

## Complete Summary of Q51-Q60

You now understand:

✅ express.json() and express.urlencoded()
✅ Error handling strategies
✅ Custom middleware creation
✅ File uploads with multer
✅ Modular route organization
✅ JWT authentication flow
✅ OAuth integration
✅ Authentication vs Authorization
✅ Password hashing with bcrypt
✅ Route security strategies
