# Node.js Interview Questions - Basics & Core Fundamentals (Q1-Q10 Detailed Answers)

## 1. What is Node.js and why was it created?

**Answer:**

**Node.js** is a JavaScript runtime that lets you run JavaScript outside the browser (on servers, computers, etc.). It's built on top of the V8 engine (same engine that powers Chrome).

### Simple Analogy:

- **JavaScript in browser** = JavaScript can run inside web pages
- **Node.js** = JavaScript can run on your server, computer, or anywhere else

### Why Was Node.js Created?

**Problem Before Node.js:**

```
Web Development Before 2009:
- Frontend: JavaScript (in browser)
- Backend: Python, Java, PHP, Ruby, etc.
- Problem: Developers had to learn 2 languages!
```

**Solution - Node.js (2009):**

```
Web Development After 2009:
- Frontend: JavaScript
- Backend: JavaScript (Node.js)
- Benefit: Use same language everywhere!
```

### Real Example - Creating a Simple Server:

```javascript
// Before Node.js - needed Python or PHP or Java
// Now with Node.js - just JavaScript!

const http = require('http');

// Create a server
const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello from Node.js!');
});

// Listen on port 3000
server.listen(3000);
console.log('Server running at http://localhost:3000/');
```

### Key Benefits of Node.js:

✅ **JavaScript everywhere** - Same language for frontend and backend
✅ **Non-blocking I/O** - Handle many requests simultaneously
✅ **Fast execution** - V8 engine compiles to machine code
✅ **Large ecosystem** - npm has millions of packages
✅ **Easy to learn** - If you know JavaScript, you can use Node.js

### Use Cases for Node.js:

✅ Web servers and APIs
✅ Real-time applications (chat, notifications)
✅ Command-line tools (CLI)
✅ Build tools (webpack, gulp)
✅ IoT applications
✅ Streaming applications

---

## 2. What is the difference between Node.js and JavaScript in the browser?

**Answer:**

JavaScript in browser and Node.js are similar but have different purposes and APIs.

### Comparison Table:

| Aspect                    | Browser JavaScript                          | Node.js                            |
| ------------------------- | ------------------------------------------- | ---------------------------------- |
| **Purpose**         | Interact with webpage                       | Run on servers                     |
| **Access**          | DOM, localStorage, cookies                  | File system, OS, databases         |
| **Global object**   | `window`                                  | `global`                         |
| **Module system**   | import/export                               | require/module.exports             |
| **APIs**            | `fetch`, `localStorage`, `setTimeout` | `fs`, `os`, `path`, `http` |
| **Security**        | Sandboxed (can't access files)              | Full system access                 |
| **Window/Document** | Yes                                         | No                                 |

### Real Example - Difference:

```javascript
// ===== BROWSER JAVASCRIPT =====
// Can access webpage elements
document.getElementById('button').addEventListener('click', () => {
  alert('Button clicked!');
});

// Can use browser APIs
localStorage.setItem('user', 'John');

// Has window object
console.log(window.location.href);

// ===== NODE.JS =====
// Cannot access webpage elements (no DOM)
// document is not available here

// Can access file system
const fs = require('fs');
const data = fs.readFileSync('file.txt', 'utf-8');

// Cannot use localStorage
// localStorage is not available here

// Has global object instead of window
console.log(global.process.version);
```

### Browser vs Node.js Timeline:

```
Browser JavaScript:
  1. HTML loads
  2. JavaScript runs
  3. Can manipulate page
  4. Interacts with user

Node.js:
  1. JavaScript file runs
  2. Can read files
  3. Can connect to databases
  4. Can handle HTTP requests
```

### Key Differences in APIs:

**Browser Only:**

```javascript
// ❌ Not available in Node.js
document.getElementById('id');
window.location;
localStorage.setItem('key', 'value');
fetch('/api/data'); // Use node-fetch instead
```

**Node.js Only:**

```javascript
// ❌ Not available in browser
const fs = require('fs');
fs.readFileSync('file.txt');

const os = require('os');
console.log(os.homedir());

const http = require('http');
http.createServer().listen(3000);
```

---

## 3. What is the V8 engine and how does Node use it?

**Answer:**

**V8** is Google's JavaScript engine that compiles JavaScript to machine code for fast execution.

### Simple Analogy:

Think of V8 like a **translator**:

- Input: JavaScript code (human-readable)
- Output: Machine code (fast execution)

### How V8 Works:

```
JavaScript Code:
  ↓
Parsing (create Abstract Syntax Tree)
  ↓
Compilation (compile to machine code)
  ↓
Optimization (make it faster)
  ↓
Machine Code (CPU executes)
  ↓
Output
```

### Real Example:

```javascript
// Simple JavaScript code
function add(a, b) {
  return a + b;
}

console.log(add(5, 3)); // Output: 8
```

**V8 does:**

1. **Parse** - Understands the code structure
2. **Compile** - Converts to machine code
3. **Execute** - Runs the compiled code (very fast!)

### How Node.js Uses V8:

```
Node.js Architecture:

┌─────────────────────────┐
│   Your JavaScript Code  │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│    Node.js APIs         │  (fs, http, path, etc.)
│    (libuv, others)      │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│    V8 Engine            │  (Compiles & Executes)
└─────────────────────────┘
```

### V8 Features:

✅ **Just-In-Time (JIT) compilation** - Compiles during runtime
✅ **Optimization** - Gets faster the more code runs
✅ **Garbage collection** - Automatic memory management
✅ **Fast execution** - Near-native speed

### V8 Timeline Example:

```javascript
// First run - slower (compilation)
let sum = 0;
for (let i = 0; i < 1000000; i++) {
  sum += i;
}
// Time: 50ms

// Second run - same code
// V8 has optimized it!
sum = 0;
for (let i = 0; i < 1000000; i++) {
  sum += i;
}
// Time: 5ms (10x faster!)
```

---

## 4. What is the event-driven, non-blocking I/O model in Node.js?

**Answer:**

Node.js uses **event-driven, non-blocking I/O** to handle many requests efficiently.

### Simple Analogy:

Think of a restaurant:

- **Blocking (traditional)** - Chef waits for each order to finish before taking next order
- **Non-blocking (Node.js)** - Chef takes all orders, cooks them simultaneously

### Event-Driven Model:

```
Traditional Synchronous Code:
  1. Read file (wait 5 seconds)
  2. Read database (wait 3 seconds)
  3. Send response
  Total time: 8 seconds

Node.js Non-Blocking:
  1. Read file (starts, don't wait)
  2. Read database (starts, don't wait)
  3. When both done, send response
  Total time: 5 seconds (max wait time)
```

### Real Example - Blocking vs Non-Blocking:

```javascript
// ===== BLOCKING (Bad) =====
const fs = require('fs');

console.log('Start');

// Blocks - waits for file to read
const data = fs.readFileSync('large-file.txt', 'utf-8');

console.log('File read');
console.log('End');

// Timeline:
// Start (0ms)
// Read file (takes 1000ms) - BLOCKS HERE
// File read (1000ms)
// End (1000ms)
// Total time: ~1000ms


// ===== NON-BLOCKING (Good) =====
const fs = require('fs');

console.log('Start');

// Doesn't block - continues immediately
fs.readFile('large-file.txt', 'utf-8', (err, data) => {
  console.log('File read');
});

console.log('End');

// Timeline:
// Start (0ms)
// End (1ms) - doesn't wait for file!
// File read (1000ms) - callback runs when ready
// Total time: ~1000ms but other code runs meanwhile
```

### How Non-Blocking Works:

```
Step 1: Request comes in
  ↓
Step 2: Start operation (don't wait)
  ↓
Step 3: Node.js handles next request immediately
  ↓
Step 4: When operation completes, callback runs
  ↓
Step 5: Send response
```

### Event-Driven Architecture:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  console.log('Request received');
  
  // Non-blocking operation
  setTimeout(() => {
    console.log('Operation complete');
    res.write('Hello World');
    res.end();
  }, 1000);
});

server.listen(3000);
console.log('Server listening on port 3000');

// Multiple requests:
// Request 1 comes in → starts 1000ms operation → doesn't wait
// Request 2 comes in → starts 1000ms operation → doesn't wait
// Request 3 comes in → starts 1000ms operation → doesn't wait
// After 1000ms → all three requests get responses
```

### Benefits:

✅ **Handle many requests** - Don't wait for each one
✅ **Better resource usage** - CPU does useful work
✅ **Scalability** - Server handles thousands of connections

---

## 5. What is the Node.js event loop?

**Answer:**

The **event loop** is Node.js's heart - it continuously checks for work to do and executes callbacks.

### Simple Analogy:

Think of event loop like a **cashier at a store**:

- Check if there are customers waiting
- Serve one customer
- Go back and check again
- Repeat forever

### Event Loop Phases:

```
Event Loop runs in this order:

1. timers → execute setTimeout/setInterval callbacks
   ↓
2. pending callbacks → execute deferred I/O callbacks
   ↓
3. idle, prepare → internal operations
   ↓
4. poll → wait for I/O events
   ↓
5. check → execute setImmediate callbacks
   ↓
6. close callbacks → execute close event callbacks
   ↓
(Back to step 1)
```

### Real Example:

```javascript
console.log('Start');

setTimeout(() => {
  console.log('setTimeout (0ms)');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise');
});

console.log('End');
```

**Output:**

```
Start
End
Promise
setTimeout (0ms)
```

**Why this order?**

```
1. console.log('Start') - synchronous, runs immediately
2. setTimeout queued - added to timers queue
3. Promise queued - added to microtask queue
4. console.log('End') - synchronous, runs immediately
5. Microtasks run - Promise executes
6. Timers phase - setTimeout executes
```

### Event Loop Visualization:

```javascript
// 1. Synchronous code runs first
console.log('1');

// 2. setTimeout goes to timers queue (0ms means "next phase")
setTimeout(() => {
  console.log('2');
}, 0);

// 3. Promise goes to microtask queue (higher priority than timers)
Promise.resolve().then(() => {
  console.log('3');
});

// 4. More synchronous code
console.log('4');

// Output:
// 1
// 4
// 3 (microtask - higher priority)
// 2 (timer)
```

### Step-by-Step Timeline:

```
Call Stack: [console.log('1')]
  ↓ Execute
  ↓ Output: 1

Call Stack: [setTimeout callback]
  ↓ Move to Timers queue (don't execute yet)

Call Stack: [Promise]
  ↓ Move to Microtask queue (don't execute yet)

Call Stack: [console.log('4')]
  ↓ Execute
  ↓ Output: 4

Call Stack: Empty
  ↓ Check Microtask queue (higher priority)
  ↓ Execute Promise
  ↓ Output: 3

Call Stack: Empty
  ↓ Check Timers queue
  ↓ Execute setTimeout
  ↓ Output: 2
```

---

## 6. What is the difference between process and thread?

**Answer:**

**Process** and **thread** are both ways to run code, but they're different levels of parallelism.

### Simple Analogy:

- **Process** = Separate factory (own resources, memory, CPU)
- **Thread** = Worker in factory (share factory resources)

### Comparison Table:

| Aspect                  | Process                    | Thread                                    |
| ----------------------- | -------------------------- | ----------------------------------------- |
| **Memory**        | Own memory                 | Share memory with other threads           |
| **Creation time** | Slower (expensive)         | Faster (lightweight)                      |
| **Communication** | Isolated, slower           | Shared memory, faster                     |
| **Failure**       | One fails, others continue | One thread crashes, whole process crashes |
| **Number**        | Few processes              | Many threads                              |
| **CPU**           | Can use multiple cores     | Depends on language                       |

### Real Example - Process:

```javascript
// Each Node.js app = separate process

// app1.js
console.log('App 1 running with PID:', process.pid);

// app2.js
console.log('App 2 running with PID:', process.pid);

// Run both:
// node app1.js → Output: App 1 running with PID: 1234
// node app2.js → Output: App 2 running with PID: 5678
// Two separate processes!
```

### Real Example - Thread:

```javascript
// Threads share memory
const { Worker } = require('worker_threads');

// Create worker thread
const worker = new Worker('./worker.js');

// Send data from main thread to worker thread
worker.postMessage('Hello from main thread');

// Receive data from worker thread
worker.on('message', (message) => {
  console.log('Received:', message);
});
```

### Node.js and Processes:

```
Node.js by default = Single process, single thread

But Node.js can create:
- Child processes (separate Node.js instances)
- Worker threads (threads within same process)

Example:
const { spawn } = require('child_process');
const child = spawn('node', ['script.js']);
// Creates separate process
```

### When to Use:

**Process:**
✅ Run completely separate applications
✅ Want isolation (one crash doesn't affect others)
✅ Need different language runtimes

**Thread:**
✅ CPU-intensive tasks in Node.js
✅ Need to share memory
✅ Want lightweight parallelism

---

## 7. What is libuv and what role does it play in Node.js?

**Answer:**

**libuv** is a C library that handles all the asynchronous I/O operations in Node.js.

### Simple Analogy:

Think of libuv like a **post office**:

- You drop off letters (async operations)
- Post office handles delivery (libuv manages them)
- You get notified when delivered (callback runs)

### Node.js Architecture with libuv:

```
Your JavaScript Code
        ↓
   Node.js APIs
        ↓
  libuv Library (handles async I/O)
        ↓
   Operating System
```

### What libuv Does:

✅ **Manages the event loop** - Continuous cycle checking for work
✅ **File system operations** - Reading/writing files asynchronously
✅ **Network operations** - TCP, UDP, DNS queries
✅ **Timer callbacks** - setTimeout, setInterval
✅ **Thread pool** - Offloads blocking operations
✅ **Process operations** - Managing child processes

### Real Example - libuv in Action:

```javascript
const fs = require('fs');

console.log('Start reading file');

// This operation is handled by libuv
fs.readFile('large-file.txt', (err, data) => {
  console.log('File read complete');
});

console.log('File read requested (non-blocking)');

// Timeline:
// 1. JavaScript says "read file"
// 2. libuv adds to queue (doesn't wait)
// 3. JavaScript continues
// 4. libuv reads file in background
// 5. When done, libuv calls the callback
```

### libuv Thread Pool:

```
Node.js can't do all I/O truly asynchronously (file system).
Solution: Thread pool!

libuv Thread Pool:
┌─ Thread 1: Reading file 1
├─ Thread 2: Reading file 2
├─ Thread 3: Reading file 3
├─ Thread 4: Reading file 4
└─ (Default 4 threads, can be changed)

Example:
const fs = require('fs');

fs.readFile('file1.txt', cb); // Thread 1
fs.readFile('file2.txt', cb); // Thread 2
fs.readFile('file3.txt', cb); // Thread 3
fs.readFile('file4.txt', cb); // Thread 4
fs.readFile('file5.txt', cb); // Waits for thread 1 to finish

All 4 files read simultaneously!
```

### libuv Benefits:

✅ **Makes Node.js fast** - Non-blocking I/O
✅ **Handles complexity** - Developers don't worry about threads
✅ **Cross-platform** - Works on Linux, Windows, macOS
✅ **Scalable** - Handle thousands of connections

---

## 8. What is REPL in Node.js?

**Answer:**

**REPL** stands for "Read-Eval-Print Loop" - it's an interactive JavaScript shell where you can type code and see results immediately.

### Simple Analogy:

Think of REPL like talking to a **helpful assistant**:

- You ask (Read): "What is 5 + 3?"
- It calculates (Eval): 5 + 3 = 8
- It responds (Print): "8"
- It waits (Loop): Ready for next question

### How to Start REPL:

```bash
# Open Node.js REPL
node

# You'll see:
> _

# Now type JavaScript:
> console.log('Hello')
Hello
undefined
>
```

### Real Examples in REPL:

```javascript
// Start REPL
> 5 + 3
8

> const name = 'John'
undefined

> name
'John'

> const greet = (n) => `Hello, ${n}`
undefined

> greet('Alice')
'Hello, Alice'

> const fs = require('fs')
undefined

> fs.readdirSync('.')
['file1.js', 'file2.js', 'package.json']
```

### REPL Features:

✅ **Line editing** - Arrow keys work
✅ **Autocomplete** - Press Tab to complete
✅ **Multiline code** - Type `...` to continue
✅ **History** - Up arrow to see previous commands

### Multiline Code in REPL:

```javascript
> const add = (a, b) => {
... return a + b;
... }
undefined

> add(5, 3)
8
```

### REPL Commands:

```javascript
> .help         // Show all commands
> .exit         // Exit REPL (or Ctrl+D)
> .clear        // Clear the screen
> .save file.js // Save session to file
> .load file.js // Load code from file
```

### When to Use REPL:

✅ **Quick testing** - Test small code snippets
✅ **Learning** - Understand how code works
✅ **Debugging** - Check values quickly
✅ **Experimentation** - Try ideas before writing files

---

## 9. What are global objects in Node.js?

**Answer:**

**Global objects** are objects available everywhere in Node.js without importing them.

### Main Global Objects:

| Object                           | Purpose                                         |
| -------------------------------- | ----------------------------------------------- |
| **global**                 | Root global object (like `window` in browser) |
| **process**                | Information about current process               |
| **console**                | Logging (console.log, console.error)            |
| **Buffer**                 | Handle binary data                              |
| **setTimeout/setInterval** | Schedule callbacks                              |
| **URL**                    | Parse URLs                                      |
| **__filename**             | Current file path                               |
| **__dirname**              | Current directory path                          |

### Real Examples:

```javascript
// global object
console.log(global); // Shows all global properties

// process object
console.log(process.pid); // Current process ID
console.log(process.env.NODE_ENV); // Environment variable
process.exit(0); // Exit the process

// console object
console.log('Log message');
console.error('Error message');
console.table({ a: 1, b: 2 });

// __filename and __dirname
console.log(__filename); // /Users/john/app.js
console.log(__dirname); // /Users/john

// setTimeout (available globally)
setTimeout(() => {
  console.log('After 1 second');
}, 1000);

// Buffer
const buf = Buffer.from('Hello');
console.log(buf); // <Buffer 48 65 6c 6c 6f>

// URL
const url = new URL('https://example.com/path?key=value');
console.log(url.hostname); // example.com
console.log(url.searchParams.get('key')); // value
```

### Accessing Global Objects:

```javascript
// These are available without importing
console.log(global); // Root global object
console.log(process); // Current process
console.log(__filename); // Current file

// But these need importing
const fs = require('fs');
const http = require('http');
```

### Browser vs Node.js Globals:

| Browser          | Node.js           |
| ---------------- | ----------------- |
| `window`       | `global`        |
| `document`     | (not available)   |
| `localStorage` | (not available)   |
| `fetch`        | (need node-fetch) |
| `setTimeout`   | `setTimeout`    |

---

## 10. What are environment variables in Node.js and how do you use them?

**Answer:**

**Environment variables** are key-value pairs that contain configuration settings (like API keys, database URLs, etc.).

### Simple Analogy:

Think of environment variables like **configuration files**:

- Contains sensitive/changeable settings
- Different for development, testing, production
- Not hardcoded in code

### How to Use Environment Variables:

```javascript
// Access environment variables via process.env
console.log(process.env.NODE_ENV); // Get variable
console.log(process.env.PORT); // Get PORT variable

// Example:
const port = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;

if (process.env.NODE_ENV === 'development') {
  console.log('Running in development mode');
}
```

### Setting Environment Variables:

**Method 1: Terminal (Temporary)**

```bash
# Linux/macOS
PORT=8000 node app.js

# Windows
set PORT=8000 && node app.js
```

**Method 2: .env File (Recommended)**

Create `.env` file:

```
PORT=3000
DATABASE_URL=mongodb://localhost:27017/mydb
API_KEY=secret123
NODE_ENV=development
```

Then use dotenv package:

```javascript
// Install: npm install dotenv

// Load environment variables
require('dotenv').config();

console.log(process.env.PORT); // 3000
console.log(process.env.DATABASE_URL); // mongodb://localhost:27017/mydb
console.log(process.env.API_KEY); // secret123
```

### Real Example - Express App:

```javascript
require('dotenv').config();

const express = require('express');
const app = express();

// Use environment variables
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const DB_URL = process.env.DATABASE_URL;

// Different behavior based on environment
if (NODE_ENV === 'development') {
  app.use(express.static('public')); // Serve static files
}

if (NODE_ENV === 'production') {
  app.use(compression()); // Compress responses
}

// Connect to database using DB_URL
// const connection = mongoose.connect(DB_URL);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`);
});
```

### Common Environment Variables:

```
NODE_ENV=development|production|test
PORT=3000
DATABASE_URL=mongodb://localhost:27017/db
API_KEY=your_secret_key
JWT_SECRET=your_jwt_secret
LOG_LEVEL=debug|info|warn|error
```

### Best Practices:

✅ **Never commit .env files** - Add to .gitignore
✅ **Use different values per environment** - Dev, staging, production
✅ **Document required variables** - Create .env.example
✅ **Use defaults** - `process.env.PORT || 3000`
✅ **Validate on startup** - Ensure required variables exist

---

## Summary of Q1-Q10

You now understand:

✅ What Node.js is and why it was created
✅ Difference between Node.js and browser JavaScript
✅ How V8 engine works
✅ Event-driven, non-blocking I/O model
✅ Node.js event loop phases
✅ Difference between process and thread
✅ What libuv does
✅ How to use Node.js REPL
✅ Global objects in Node.js
✅ Environment variables and how to use them
