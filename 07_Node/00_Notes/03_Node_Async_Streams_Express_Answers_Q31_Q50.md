# Node.js Interview Questions (Q31-Q50 Detailed Answers)

## SECTION 3 CONTINUED: ASYNCHRONY & FILE OPERATIONS

## 31. What is the difference between synchronous and asynchronous functions?

**Answer:**

**Synchronous** = waits for completion before continuing
**Asynchronous** = doesn't wait, continues immediately

### Simple Analogy:

- **Synchronous** = Phone call (must wait for response)
- **Asynchronous** = Email (send and continue working)

### Real Example Comparison:

```javascript
const fs = require('fs');

// ===== SYNCHRONOUS (BLOCKS) =====
console.log('Start');

// This blocks - waits 1 second
const data = fs.readFileSync('file.txt', 'utf-8');

console.log('File read:', data);
console.log('End');

// Timeline:
// Start (0ms)
// Read file (blocks for 1000ms)
// File read: ... (1000ms)
// End (1000ms)
// Total: ~1000ms


// ===== ASYNCHRONOUS (NON-BLOCKING) =====
console.log('Start');

// This doesn't block - continues immediately
fs.readFile('file.txt', 'utf-8', (err, data) => {
  console.log('File read:', data);
});

console.log('End');

// Timeline:
// Start (0ms)
// End (1ms) - doesn't wait!
// File read: ... (1000ms - happens later)
// Total: ~1000ms but other code runs meanwhile
```

### Key Differences Table:

| Aspect                | Synchronous    | Asynchronous       |
| --------------------- | -------------- | ------------------ |
| **Blocking**    | Yes            | No                 |
| **Performance** | Slower (waits) | Faster (continues) |
| **Use**         | Simple tasks   | I/O operations     |
| **Scalability** | Poor           | Excellent          |

### Real World Scenario:

```javascript
// Synchronous - Like a restaurant with 1 cashier
// Person 1: Wait 5 minutes
// Person 2: Wait 5 minutes
// Person 3: Wait 5 minutes
// Total: 15 minutes

// Asynchronous - Like a restaurant with 1 cashier but queuing
// Person 1: Order (continue shopping)
// Person 2: Order (continue shopping)
// Person 3: Order (continue shopping)
// Cashier prepares all in parallel
// Total: 5 minutes (same time, more efficiency)
```

---

## 32. What is non-blocking I/O?

**Answer:**

**Non-blocking I/O** means when you request I/O (reading files, network requests), Node doesn't wait for the result. It continues executing other code.

### How Non-Blocking I/O Works:

```javascript
const fs = require('fs');

console.log('1. Start');

// Request 1: Read file (don't wait)
fs.readFile('file1.txt', (err, data) => {
  console.log('3. File 1 read');
});

// Request 2: Read file (don't wait)
fs.readFile('file2.txt', (err, data) => {
  console.log('4. File 2 read');
});

console.log('2. End');

// Output:
// 1. Start
// 2. End
// 3. File 1 read (when ready)
// 4. File 2 read (when ready)

// Timeline:
// Both files read in parallel!
// If each takes 1 second:
// - Blocking: 2 seconds total
// - Non-blocking: 1 second total
```

### Blocking Code (Never Use):

```javascript
// ❌ WRONG - Blocking everyone
function handleRequest(req, res) {
  // This blocks all other requests!
  const data = fs.readFileSync('large-file.txt');
  
  res.write(data);
  res.end();
}

// If request takes 5 seconds:
// Request 1: Wait 5 seconds
// Request 2: Wait 10 seconds (waits for 1 + 5 more)
// Request 3: Wait 15 seconds (waits for 1 + 2 + 5 more)
```

### Non-Blocking Code (Always Use):

```javascript
// ✅ CORRECT - Non-blocking
function handleRequest(req, res) {
  // This doesn't block other requests!
  fs.readFile('large-file.txt', (err, data) => {
    res.write(data);
    res.end();
  });
}

// If request takes 5 seconds:
// Request 1: Start reading (continue)
// Request 2: Start reading (continue)
// Request 3: Start reading (continue)
// After 5 seconds: All requests complete
```

### Benefits:

✅ **Handles many requests** - Don't wait for each one
✅ **Better performance** - CPU does useful work
✅ **Scalability** - Single server handles 1000s of connections

---

## 33. What is backpressure in streams?

**Answer:**

**Backpressure** happens when data is being written faster than it can be read/processed. It's like a traffic jam.

### Simple Analogy:

Think of it like a **water pipe**:

- Water flows in (write)
- Pipe is narrow (slow processing)
- Water backs up (backpressure)

### Real Example - Without Backpressure Handling (BAD):

```javascript
const fs = require('fs');

// Reading huge file
const readStream = fs.createReadStream('large-file.txt');
const writeStream = fs.createWriteStream('output.txt');

// ❌ WRONG - No backpressure handling
readStream.on('data', (chunk) => {
  // Writing faster than processing
  writeStream.write(chunk);
  
  // All data buffered in memory!
  // Could crash with out-of-memory error
});
```

### Handling Backpressure (GOOD):

```javascript
const fs = require('fs');

const readStream = fs.createReadStream('large-file.txt');
const writeStream = fs.createWriteStream('output.txt');

// ✅ CORRECT - Handle backpressure
readStream.on('data', (chunk) => {
  // Check if write buffer is full
  const canContinue = writeStream.write(chunk);
  
  if (!canContinue) {
    // Pause reading
    readStream.pause();
  }
});

// Resume when write buffer is empty
writeStream.on('drain', () => {
  readStream.resume();
});
```

### Using pipe() (Easiest Way):

```javascript
// ✅ BEST - pipe() handles backpressure automatically!
const fs = require('fs');

fs.createReadStream('input.txt')
  .pipe(fs.createWriteStream('output.txt'));

// pipe() automatically handles backpressure
// No manual pause/resume needed!
```

---

## 34. What is the thread pool in Node.js?

**Answer:**

**Thread pool** is a collection of threads that handle blocking operations (file I/O, DNS, crypto) in the background.

### How Thread Pool Works:

```
Main Thread (Event Loop):
  ├─ Receives requests
  ├─ Queues operations to thread pool
  └─ Continues processing

Thread Pool (Background Workers):
  ├─ Thread 1: Reading file 1
  ├─ Thread 2: Reading file 2
  ├─ Thread 3: DNS lookup
  └─ Thread 4: Crypto operation

When done:
  └─ Callback added to event loop
```

### Default Thread Pool Size:

```javascript
// libuv uses 4 threads by default
// Can be changed via environment variable
process.env.UV_THREADPOOL_SIZE = 8; // Use 8 threads instead

// Check current size
console.log(process.env.UV_THREADPOOL_SIZE);
```

### Real Example - File Operations with Thread Pool:

```javascript
const fs = require('fs');

console.log('Start');

// All 4 queued to thread pool
fs.readFile('file1.txt', (err, data) => {
  console.log('File 1 read');
});

fs.readFile('file2.txt', (err, data) => {
  console.log('File 2 read');
});

fs.readFile('file3.txt', (err, data) => {
  console.log('File 3 read');
});

fs.readFile('file4.txt', (err, data) => {
  console.log('File 4 read');
});

console.log('End');

// With 4 threads:
// All 4 read in parallel (if each takes 1 second, total ~1 second)

// If we had 8 threads and 8 files:
// All 8 read in parallel (total ~1 second)

// If we had 4 threads and 8 files:
// First 4 read in parallel
// Next 4 wait in queue
// Total time: ~2 seconds
```

### Operations Using Thread Pool:

```javascript
// These use thread pool:
fs.readFile()
fs.writeFile()
fs.stat()
dns.lookup()
crypto.pbkdf2()
```

### When Thread Pool Matters:

```javascript
// Problem: CPU-intensive work blocks event loop
function slowCalculation() {
  let sum = 0;
  for (let i = 0; i < 10000000000; i++) {
    sum += i;
  }
  return sum;
}

// ❌ WRONG - Blocks event loop
app.get('/calculate', (req, res) => {
  const result = slowCalculation(); // Blocks for 10 seconds!
  res.json(result);
  // All other requests wait!
});

// ✅ BETTER - Use worker threads
const { Worker } = require('worker_threads');
app.get('/calculate', (req, res) => {
  const worker = new Worker('./calculate.js');
  worker.on('message', (result) => {
    res.json(result);
  });
});
```

---

## SECTION 5: STREAMS & BUFFERS

## 35. What are buffers in Node.js?

**Answer:**

**Buffers** are temporary storage for binary data. They're like containers that hold raw bytes.

### Simple Analogy:

Think of buffer like a **cup**:

- Holds liquid (data)
- Has a fixed size
- Can be filled/emptied

### Creating Buffers:

```javascript
// Method 1: From string
const buf1 = Buffer.from('Hello');
console.log(buf1); // <Buffer 48 65 6c 6c 6f>

// Method 2: Allocate size
const buf2 = Buffer.alloc(10);
console.log(buf2); // <Buffer 00 00 00 00 00 00 00 00 00 00>

// Method 3: From array
const buf3 = Buffer.from([65, 66, 67]);
console.log(buf3); // <Buffer 41 42 43> (ABC in hex)

// Method 4: From base64
const buf4 = Buffer.from('SGVsbG8=', 'base64');
console.log(buf4.toString()); // Hello
```

### Converting Buffers:

```javascript
const buf = Buffer.from('Hello World');

// To string
console.log(buf.toString()); // Hello World

// To base64
console.log(buf.toString('base64')); // SGVsbG8gV29ybGQ=

// To hex
console.log(buf.toString('hex')); // 48656c6c6f20576f726c64

// Get length
console.log(buf.length); // 11
```

### Real Example - File Upload:

```javascript
const fs = require('fs');

// Read file as buffer
fs.readFile('image.jpg', (err, buffer) => {
  console.log('Buffer size:', buffer.length, 'bytes');
  
  // Send as base64
  const base64 = buffer.toString('base64');
  
  // Or write to another file
  fs.writeFile('image-copy.jpg', buffer, (err) => {
    console.log('File copied');
  });
});
```

### Buffer vs String:

```javascript
// String
const str = 'Hello';
console.log(typeof str); // string

// Buffer
const buf = Buffer.from('Hello');
console.log(typeof buf); // object
console.log(Buffer.isBuffer(buf)); // true

// Binary data (can't be stored as string)
const binary = Buffer.from([0xFF, 0xD8, 0xFF]); // JPEG header
```

---

## 36. What is the difference between Buffer and TypedArray?

**Answer:**

Both store binary data, but have different purposes and capabilities.

### Comparison Table:

| Aspect                  | Buffer                 | TypedArray             |
| ----------------------- | ---------------------- | ---------------------- |
| **Where**         | Node.js                | Browser + Node.js      |
| **Purpose**       | File I/O, networking   | Math, graphics         |
| **Methods**       | Many buffer-specific   | Standard array methods |
| **Compatibility** | Node only              | Cross-platform         |
| **Encoding**      | Supports (base64, hex) | No encoding support    |

### Real Examples:

```javascript
// ===== BUFFER (Node.js) =====
const buf = Buffer.from('Hello');
console.log(buf.toString()); // Hello
console.log(buf.toString('base64')); // SGVsbG8=

// Has many buffer methods
buf.write('H', 0); // Write at offset 0
buf.slice(0, 3); // Get part of buffer


// ===== TYPEDARRAY (Browser + Node.js) =====
const arr = new Uint8Array(5);
arr[0] = 72; // H
arr[1] = 101; // e
arr[2] = 108; // l
arr[3] = 108; // l
arr[4] = 111; // o

// Acts like normal array
arr.map(x => x * 2);
arr.forEach(x => console.log(x));

// No encoding methods!
// arr.toString('base64') // Won't work
```

### When to Use:

**Use Buffer:**
✅ Node.js file operations
✅ Network communication
✅ Need encoding (base64, hex)

**Use TypedArray:**
✅ Browser-compatible
✅ Math operations
✅ WebGL, Canvas

---

## 37. What are streams in Node.js?

**Answer:**

**Streams** are objects that let you read/write data in chunks instead of loading everything into memory at once.

### Simple Analogy:

- **Without streams** = Download entire movie, then watch
- **With streams** = Watch while downloading

### Types of Streams:

```javascript
// 1. Readable - Read data
const readable = fs.createReadStream('file.txt');

// 2. Writable - Write data
const writable = fs.createWriteStream('output.txt');

// 3. Duplex - Both read and write
// Example: TCP socket

// 4. Transform - Read, modify, write
const transform = fs.createReadStream('input.txt')
  .pipe(someTransformStream)
  .pipe(fs.createWriteStream('output.txt'));
```

### Real Example - Reading Large File:

```javascript
// ❌ WITHOUT STREAMS (loads entire file in memory)
const fs = require('fs');
const data = fs.readFileSync('large-file.txt'); // 1GB file!
// Uses 1GB RAM!

// ✅ WITH STREAMS (reads in chunks)
const stream = fs.createReadStream('large-file.txt');
stream.on('data', (chunk) => {
  console.log('Received chunk:', chunk.length, 'bytes');
  // Process chunk
  // Uses ~64KB RAM (default chunk size)
});
```

### Stream Events:

```javascript
const fs = require('fs');
const stream = fs.createReadStream('file.txt');

// When data is available
stream.on('data', (chunk) => {
  console.log('Got chunk:', chunk.length);
});

// When stream is done
stream.on('end', () => {
  console.log('Stream finished');
});

// When error occurs
stream.on('error', (err) => {
  console.error('Stream error:', err);
});

// Pause/resume reading
stream.pause();
setTimeout(() => stream.resume(), 1000);
```

### Stream Benefits:

✅ **Memory efficient** - Process data in chunks
✅ **Fast** - Start processing immediately
✅ **Scalable** - Handle large files

---

## 38. What are the types of streams (readable, writable, duplex, transform)?

**Answer:**

Four types of streams for different I/O operations.

### 1. Readable Stream:

```javascript
const fs = require('fs');

// Reading a file in chunks
const readable = fs.createReadStream('input.txt');

readable.on('data', (chunk) => {
  console.log('Read:', chunk.length, 'bytes');
});

readable.on('end', () => {
  console.log('Read finished');
});
```

### 2. Writable Stream:

```javascript
const fs = require('fs';

// Writing to file
const writable = fs.createWriteStream('output.txt');

writable.write('Hello\n');
writable.write('World\n');
writable.end(); // Signal end of data

writable.on('finish', () => {
  console.log('Write finished');
});
```

### 3. Duplex Stream (Both readable and writable):

```javascript
const net = require('net');

// TCP socket is duplex
const socket = net.createConnection(3000);

// Can read
socket.on('data', (chunk) => {
  console.log('Received:', chunk);
});

// Can write
socket.write('Hello Server');
```

### 4. Transform Stream (Read → Modify → Write):

```javascript
const { Transform } = require('stream');
const fs = require('fs');

// Create transform stream (convert to uppercase)
const uppercase = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

// Use it
fs.createReadStream('input.txt')
  .pipe(uppercase)
  .pipe(fs.createWriteStream('output.txt'));
```

### Real Example - Compress File:

```javascript
const fs = require('fs');
const zlib = require('zlib');

// Transform stream that compresses
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip()) // Compress
  .pipe(fs.createWriteStream('input.txt.gz')); // Write
```

---

## 39. What is pipe() and how does it work?

**Answer:**

**pipe()** connects a readable stream to a writable stream, automatically handling data flow and backpressure.

### Simple Analogy:

Think of pipe like a **water pipe**:

- Water flows in (readable)
- Through the pipe (piping)
- Comes out (writable)

### Basic Syntax:

```javascript
readableStream.pipe(writableStream);
```

### Real Examples:

```javascript
const fs = require('fs');

// Copy file using pipe
fs.createReadStream('input.txt')
  .pipe(fs.createWriteStream('output.txt'));

// Compress file
fs.createReadStream('input.txt')
  .pipe(require('zlib').createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));

// Send file to HTTP response
app.get('/file', (req, res) => {
  fs.createReadStream('large-file.pdf')
    .pipe(res);
});
```

### How pipe() Works:

```javascript
// Automatically handles:
// 1. Data buffering
// 2. Backpressure
// 3. Error handling
// 4. Cleanup

// Equivalent manual code:
const readable = fs.createReadStream('input.txt');
const writable = fs.createWriteStream('output.txt');

readable.on('data', (chunk) => {
  const canContinue = writable.write(chunk);
  if (!canContinue) {
    readable.pause();
  }
});

writable.on('drain', () => {
  readable.resume();
});

readable.on('end', () => {
  writable.end();
});
```

### Chaining Pipes:

```javascript
const fs = require('fs');
const zlib = require('zlib');

// Read → Compress → Write
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'))
  .on('finish', () => console.log('Done'));

// Read → Transform → Write
fs.createReadStream('input.txt')
  .pipe(uppercase) // Custom transform
  .pipe(fs.createWriteStream('output.txt'));
```

### Error Handling:

```javascript
const fs = require('fs');

fs.createReadStream('input.txt')
  .pipe(fs.createWriteStream('output.txt'))
  .on('error', (err) => {
    console.error('Write error:', err);
  })
  .on('finish', () => {
    console.log('Copy finished');
  });
```

---

## SECTION 6: NETWORKING & HTTP

## 40. What are flow mode and paused mode in streams?

**Answer:**

**Flow mode** = data flows automatically
**Paused mode** = you pull data when ready

### Flow Mode:

```javascript
const fs = require('fs');

const stream = fs.createReadStream('file.txt');

// Automatically flows (flow mode)
stream.on('data', (chunk) => {
  console.log('Chunk:', chunk.length);
});

// Or explicitly switch to flow mode
stream.resume();
```

### Paused Mode:

```javascript
const fs = require('fs');

const stream = fs.createReadStream('file.txt', { autoDestroy: true });

// Start in paused mode
stream.pause();

// Manually read chunks
const chunk = stream.read();
console.log('Chunk:', chunk);

// Later:
stream.resume(); // Back to flow mode
```

### Switching Between Modes:

```javascript
const fs = require('fs');

const stream = fs.createReadStream('file.txt');

// Flow mode
stream.on('data', (chunk) => {
  console.log('Got:', chunk.length);
  
  // Switch to paused
  stream.pause();
  
  // Do something async
  setTimeout(() => {
    // Back to flow mode
    stream.resume();
  }, 1000);
});
```

### Real Example - Rate Limiting:

```javascript
const fs = require('fs');

const stream = fs.createReadStream('large-file.txt');

stream.on('data', (chunk) => {
  // Process chunk slowly
  processChunk(chunk);
  
  // Pause stream
  stream.pause();
  
  // Resume after delay (rate limiting)
  setTimeout(() => {
    stream.resume();
  }, 1000);
});

function processChunk(chunk) {
  console.log('Processing:', chunk.length, 'bytes');
}
```

---

## SECTION 7: EXPRESS.JS FUNDAMENTALS

## 41. How do you create an HTTP server in Node.js?

**Answer:**

Using the `http` module to create a basic web server.

### Basic HTTP Server:

```javascript
const http = require('http');

// Create server
const server = http.createServer((req, res) => {
  // req = incoming request
  // res = outgoing response
  
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!');
});

// Listen on port 3000
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
```

### Handling Different Routes:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Home page');
  } else if (req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('About page');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found');
  }
});

server.listen(3000);
```

### Handling Request Methods:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    res.writeHead(200);
    res.end('GET request');
  } else if (req.method === 'POST') {
    res.writeHead(200);
    res.end('POST request');
  } else if (req.method === 'DELETE') {
    res.writeHead(200);
    res.end('DELETE request');
  }
});

server.listen(3000);
```

### Reading Request Body:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
  
    // Read data in chunks
    req.on('data', (chunk) => {
      body += chunk;
    });
  
    // When done reading
    req.on('end', () => {
      console.log('Received:', body);
      res.end('Data received');
    });
  }
});

server.listen(3000);
```

---

## 42. What is the http module and how does routing work?

**Answer:**

The `http` module creates web servers. Routing maps URLs to handlers.

### HTTP Module Basics:

```javascript
const http = require('http');

// Create server
const server = http.createServer((req, res) => {
  // req properties
  console.log('Method:', req.method); // GET, POST, etc.
  console.log('URL:', req.url); // /page, /api/users, etc.
  console.log('Headers:', req.headers); // User-Agent, etc.
  
  // res methods
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({ status: 'ok' }));
  res.end();
});

server.listen(3000);
```

### Simple Routing Example:

```javascript
const http = require('http');

const routes = {
  '/': (req, res) => {
    res.end('Home');
  },
  '/about': (req, res) => {
    res.end('About');
  },
  '/contact': (req, res) => {
    res.end('Contact');
  }
};

const server = http.createServer((req, res) => {
  const handler = routes[req.url];
  
  if (handler) {
    handler(req, res);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3000);
```

### Route with Dynamic Segments:

```javascript
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;
  
  // Match /users/:id
  if (pathname.startsWith('/users/')) {
    const userId = pathname.split('/')[2];
    res.end(`User ID: ${userId}`);
  }
  
  // Match /search?q=...
  if (pathname === '/search') {
    const searchTerm = query.q;
    res.end(`Search for: ${searchTerm}`);
  }
});

server.listen(3000);
```

---

## 43. What is the difference between HTTP and HTTPS modules?

**Answer:**

**HTTP** = unencrypted communication
**HTTPS** = encrypted communication with SSL/TLS certificates

### Comparison Table:

| Aspect                | HTTP          | HTTPS           |
| --------------------- | ------------- | --------------- |
| **Security**    | No encryption | Encrypted       |
| **Port**        | 80            | 443             |
| **Certificate** | Not needed    | Required        |
| **Speed**       | Faster        | Slightly slower |
| **Use**         | Development   | Production      |

### HTTP Server:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello HTTP');
});

server.listen(80); // Standard HTTP port
```

### HTTPS Server:

```javascript
const https = require('https');
const fs = require('fs');

// Load SSL certificates
const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem')
};

const server = https.createServer(options, (req, res) => {
  res.end('Hello HTTPS');
});

server.listen(443); // Standard HTTPS port
```

### Getting SSL Certificates:

```bash
# For development (self-signed)
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365

# For production (use Let's Encrypt with Certbot)
certbot certonly --standalone -d example.com
```

---

## 44. What are request and response objects?

**Answer:**

**Request** = incoming HTTP request from client
**Response** = outgoing HTTP response to client

### Request Object (req):

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // URL
  console.log('req.url:', req.url); // /page?id=123
  
  // Method
  console.log('req.method:', req.method); // GET, POST, etc.
  
  // Headers
  console.log('req.headers:', req.headers); // User-Agent, etc.
  
  // Remote address
  console.log('req.socket.remoteAddress:', req.socket.remoteAddress); // Client IP
  
  // HTTP version
  console.log('req.httpVersion:', req.httpVersion); // 1.1
  
  // Read body
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
});

server.listen(3000);
```

### Response Object (res):

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // Set status and headers
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'X-Custom-Header': 'value'
  });
  
  // Write body
  res.write('Hello ');
  res.write('World');
  
  // End response
  res.end();
  
  // Or write and end together
  res.end('Hello World');
  
  // Check if headers sent
  console.log('Headers sent:', res.headersSent); // true after writeHead
});

server.listen(3000);
```

### Complete Request/Response Example:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // Parse request
  console.log(`${req.method} ${req.url}`);
  
  // Read body for POST
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  
  // When body fully received
  req.on('end', () => {
    // Create response
    res.writeHead(200, { 'Content-Type': 'application/json' });
  
    res.end(JSON.stringify({
      method: req.method,
      url: req.url,
      body: body
    }));
  });
  
  // Handle errors
  req.on('error', (err) => {
    res.writeHead(500);
    res.end('Server error');
  });
});

server.listen(3000);
```

---

## 45. How do you parse incoming request data in Node.js?

**Answer:**

Reading and parsing data from incoming HTTP requests.

### Parsing URL and Query Parameters:

```javascript
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  // Parse URL
  const parsedUrl = url.parse(req.url, true);
  
  console.log('pathname:', parsedUrl.pathname); // /search
  console.log('query:', parsedUrl.query); // { q: 'react' }
  
  res.end(JSON.stringify(parsedUrl));
});

server.listen(3000);

// Request: /search?q=react&page=1
// Output:
// {
//   "pathname": "/search",
//   "query": { "q": "react", "page": "1" }
// }
```

### Parsing Request Body (JSON):

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
  
    // Read chunks
    req.on('data', (chunk) => {
      body += chunk;
    });
  
    // Parse when complete
    req.on('end', () => {
      try {
        const json = JSON.parse(body);
        console.log('Parsed JSON:', json);
    
        res.writeHead(200);
        res.end(JSON.stringify({ status: 'ok' }));
      } catch (err) {
        res.writeHead(400);
        res.end('Invalid JSON');
      }
    });
  }
});

server.listen(3000);
```

### Parsing Request Body (Form Data):

```javascript
const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.headers['content-type'] === 'application/x-www-form-urlencoded') {
    let body = '';
  
    req.on('data', (chunk) => {
      body += chunk;
    });
  
    req.on('end', () => {
      // Parse form data
      const formData = querystring.parse(body);
      console.log('Form data:', formData);
  
      res.end('Form received');
    });
  }
});

server.listen(3000);
```

### Helper Function for Parsing Body:

```javascript
const http = require('http');

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
  
    req.on('data', (chunk) => {
      body += chunk;
    });
  
    req.on('end', () => {
      try {
        const json = JSON.parse(body);
        resolve(json);
      } catch (err) {
        reject(err);
      }
    });
  
    req.on('error', reject);
  });
}

// Use it
const server = http.createServer(async (req, res) => {
  if (req.method === 'POST') {
    try {
      const data = await parseBody(req);
      res.end(JSON.stringify(data));
    } catch (err) {
      res.writeHead(400);
      res.end('Bad request');
    }
  }
});

server.listen(3000);
```

---

## 46. What is the http2 module and how does it differ from http1.1?

**Answer:**

**HTTP/2** is faster and more efficient than HTTP/1.1 with multiplexing and server push.

### Key Differences:

| Feature              | HTTP/1.1             | HTTP/2                           |
| -------------------- | -------------------- | -------------------------------- |
| **Connection** | Multiple connections | Single connection (multiplexing) |
| **Speed**      | Slower               | Faster (parallel requests)       |
| **Headers**    | Text                 | Binary (compressed)              |
| **Push**       | No                   | Server can push resources        |
| **Priority**   | No                   | Can prioritize requests          |

### Creating HTTP/2 Server:

```javascript
const spdy = require('spdy');
const fs = require('fs');

// Load SSL certificates
const options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt')
};

// Create HTTP/2 server
const server = spdy.createServer(options, (req, res) => {
  res.end('Hello HTTP/2');
});

server.listen(443);
```

### Or Using Native Node.js:

```javascript
const http2 = require('http2');
const fs = require('fs');

const options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt')
};

const server = http2.createSecureServer(options, (req, res) => {
  res.end('Hello HTTP/2');
});

server.listen(443);
```

### HTTP/2 Server Push:

```javascript
const http2 = require('http2');
const fs = require('fs');

const options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt')
};

const server = http2.createSecureServer(options, (req, res) => {
  if (req.url === '/') {
    // Push CSS file to client
    res.push('/style.css', {
      'content-type': 'text/css'
    }, (err, pushRes) => {
      pushRes.end(fs.readFileSync('./public/style.css'));
    });
  
    // Send main HTML
    res.end('<html>...</html>');
  }
});

server.listen(443);
```

### Performance Comparison:

```
HTTP/1.1: 6 parallel connections (browser limit)
- Request 1: 100ms
- Request 2: 100ms
- Request 3: 100ms
- Request 4: 100ms
- Request 5: 100ms
- Request 6: 100ms
- Request 7: Wait 100ms, then 100ms
Total: ~200ms (7 requests)

HTTP/2: Single connection, multiplexing
- Requests 1-7: All in parallel
Total: ~100ms (7 requests)
```

---

## Complete Summary of Q31-Q46

You now understand:

✅ Synchronous vs asynchronous functions
✅ Non-blocking I/O operations
✅ Backpressure in streams
✅ Thread pool mechanics
✅ Buffers and typed arrays
✅ Stream types (readable, writable, duplex, transform)
✅ pipe() functionality
✅ Flow and paused modes
✅ Basic HTTP server creation
✅ HTTP routing
✅ HTTP vs HTTPS
✅ Request and response objects
✅ Parsing incoming data
✅ HTTP/2 advantages

**Continue to Q47-70 for Express.js, authentication, and databases!** 🚀

---

## 47. What is Express.js and why is it used?

**Answer:**

**Express.js** is a lightweight Node.js web framework that makes building web applications and APIs much easier.

### Simple Analogy:

Think of Express like a **toolbox for building web applications**:

- Without Express: Build tools yourself (hard)
- With Express: Pre-built tools ready to use (easy)

### Why Use Express?

```
Without Express (Raw Node.js):
- Write routing manually
- Handle requests/responses manually
- Write middleware from scratch
- Lots of boilerplate code

With Express:
- Simple routing
- Built-in middleware
- Request/response helpers
- Clean, readable code
```

### Real Example - Express vs Raw Node.js:

**Without Express (complicated):**

```javascript
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  if (pathname === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Home' }));
  } else if (pathname === '/users' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ users: [] }));
  } else if (pathname === '/users' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User created' }));
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3000);
```

**With Express (simple):**

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// GET /
app.get('/', (req, res) => {
  res.json({ message: 'Home' });
});

// GET /users
app.get('/users', (req, res) => {
  res.json({ users: [] });
});

// POST /users
app.post('/users', (req, res) => {
  res.status(201).json({ message: 'User created' });
});

// 404 (automatic)
app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(3000);
```

### Key Benefits of Express:

✅ **Simple routing** - Easy URL mapping
✅ **Middleware** - Built-in request processing
✅ **Less code** - 50% less boilerplate
✅ **Large ecosystem** - Thousands of plugins
✅ **Popular** - Most used Node.js framework

### What Express Provides:

```javascript
const express = require('express');
const app = express();

// 1. Routing
app.get('/path', handler);
app.post('/path', handler);
app.put('/path', handler);
app.delete('/path', handler);

// 2. Middleware
app.use(express.json());
app.use(logger);

// 3. Request helpers
app.get('/user/:id', (req, res) => {
  console.log(req.params.id);        // URL parameters
  console.log(req.query);            // Query string
  console.log(req.body);             // Request body
  console.log(req.headers);          // Headers
});

// 4. Response helpers
res.status(200).json({ data });
res.send('text');
res.sendFile('file.txt');
res.redirect('/other');

// 5. Error handling
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
```

---

## 48. What are middleware functions in Express.js?

**Answer:**

**Middleware** are functions that process requests/responses. They run between request and response.

### Simple Analogy:

Think of middleware like **security checkpoints**:

- Request comes in
- Middleware 1 checks it (logging)
- Middleware 2 checks it (auth)
- Middleware 3 checks it (validation)
- Request reaches handler
- Response goes back through middlewares

### Basic Middleware Structure:

```javascript
// Middleware has 3 parameters (4 for error handling)
const myMiddleware = (req, res, next) => {
  // Do something
  console.log('Middleware running');
  
  // MUST call next() to pass to next middleware
  next();
};

// Apply middleware
app.use(myMiddleware);
```

### Real Examples:

**Logging Middleware:**

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

// When request comes: [10:30:45] GET /users
```

**Authentication Middleware:**

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

// Protect routes
app.get('/profile', authenticate, (req, res) => {
  res.json({ user: req.user });
});
```

**Request Validation Middleware:**

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
```

**Error Handling Middleware (4 parameters):**

```javascript
// Must have 4 parameters for error handling
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  
  res.status(500).json({
    error: {
      message: err.message,
      status: 500
    }
  });
});
```

### Middleware Order Matters:

```javascript
const express = require('express');
const app = express();

// Middleware runs in order of definition

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

### Common Built-in Middleware:

```javascript
const express = require('express');
const app = express();

// Parse JSON
app.use(express.json());

// Parse form data
app.use(express.urlencoded({ extended: false }));

// Serve static files
app.use(express.static('public'));
```

---

## 49. What is the difference between app.use() and app.get()?

**Answer:**

**app.use()** applies middleware to all requests
**app.get()** only handles GET requests to specific routes

### Comparison Table:

| Aspect            | app.use()              | app.get()           |
| ----------------- | ---------------------- | ------------------- |
| **Purpose** | Middleware/all methods | Handle GET requests |
| **Routes**  | Any/all routes         | Specific route      |
| **Methods** | All (GET, POST, etc.)  | GET only            |
| **Use**     | Logging, auth, parsing | Handle requests     |

### Real Examples:

**app.use() - Applies to All Routes:**

```javascript
const express = require('express');
const app = express();

// This runs for EVERY request
app.use((req, res, next) => {
  console.log('This runs for all requests');
  next();
});

// Parse JSON for ALL requests
app.use(express.json());

// Serve static files for ALL requests
app.use(express.static('public'));

app.get('/users', (req, res) => {
  // Middleware already ran!
  res.json({ users: [] });
});

app.post('/users', (req, res) => {
  // Middleware already ran!
  res.json({ message: 'Created' });
});
```

**app.get() - Specific Route:**

```javascript
const express = require('express');
const app = express();

// Only handles GET /users
app.get('/users', (req, res) => {
  res.json({ users: [] });
});

// Only handles GET /posts
app.get('/posts', (req, res) => {
  res.json({ posts: [] });
});

// GET /other won't match any route
```

### Using Both Together:

```javascript
const express = require('express');
const app = express();

// Global middleware (runs for everything)
app.use(express.json());
app.use((req, res, next) => {
  console.log('Global middleware');
  next();
});

// Specific route handler (only GET /users)
app.get('/users', (req, res) => {
  res.json({ users: [] });
});

// Another middleware
app.use((req, res, next) => {
  console.log('Another global middleware');
  next();
});

// Another route handler (only POST /users)
app.post('/users', (req, res) => {
  res.json({ message: 'Created' });
});

// Timeline for GET /users:
// 1. express.json() middleware
// 2. Global middleware
// 3. Another global middleware
// 4. GET /users handler
```

### Route-Specific Middleware:

```javascript
const express = require('express');
const app = express();

// Middleware only for /admin routes
const adminAuth = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ error: 'Admin only' });
  }
};

// Public route
app.get('/public', (req, res) => {
  res.json({ data: 'public' });
});

// Protected route
app.get('/admin/dashboard', adminAuth, (req, res) => {
  res.json({ dashboard: 'admin data' });
});

// Multiple middleware on one route
app.delete('/admin/users/:id', adminAuth, validateId, (req, res) => {
  res.json({ message: 'User deleted' });
});
```

---

## 50. What are route parameters and query parameters?

**Answer:**

**Route parameters** are in the URL path
**Query parameters** are in the query string

### Simple Analogy:

```
URL: /users/123?page=1&limit=10
          ↑         ↑              ↑
        path    route param    query params
```

### Route Parameters:

Located in the URL path itself:

```javascript
const express = require('express');
const app = express();

// :id is a route parameter
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ userId });
});

// Request: GET /users/123
// Output: { userId: '123' }

// Multiple parameters
app.get('/posts/:postId/comments/:commentId', (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  
  res.json({ postId, commentId });
});

// Request: GET /posts/456/comments/789
// Output: { postId: '456', commentId: '789' }
```

### Query Parameters:

In the query string (after `?`):

```javascript
const express = require('express');
const app = express();

app.get('/search', (req, res) => {
  const q = req.query.q;        // Search term
  const page = req.query.page;  // Page number
  const limit = req.query.limit; // Items per page
  
  res.json({ q, page, limit });
});

// Request: GET /search?q=react&page=1&limit=10
// Output: { q: 'react', page: '1', limit: '10' }
```

### Real Example - User API:

```javascript
const express = require('express');
const app = express();

// Get all users with filters
app.get('/users', (req, res) => {
  const page = req.query.page || 1;      // Query param
  const limit = req.query.limit || 10;   // Query param
  const role = req.query.role;           // Query param
  
  // Fetch users with filters
  const users = getUsers({ page, limit, role });
  
  res.json(users);
});

// Request: GET /users?page=2&limit=20&role=admin

// Get specific user
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;  // Route param
  
  // Fetch user by ID
  const user = getUserById(userId);
  
  res.json(user);
});

// Request: GET /users/123

// Get user posts with pagination
app.get('/users/:userId/posts', (req, res) => {
  const userId = req.params.userId;     // Route param
  const page = req.query.page || 1;     // Query param
  const limit = req.query.limit || 10;  // Query param
  
  const posts = getUserPosts(userId, { page, limit });
  
  res.json(posts);
});

// Request: GET /users/123/posts?page=1&limit=5
```

### Accessing Parameters:

```javascript
const express = require('express');
const app = express();

app.get('/api/:version/users/:id', (req, res) => {
  // Route parameters
  console.log(req.params.version);  // API version
  console.log(req.params.id);       // User ID
  
  // Query parameters
  console.log(req.query.format);    // Response format
  console.log(req.query.include);   // Include related data
  
  res.json({
    params: req.params,
    query: req.query
  });
});

// Request: GET /api/v1/users/123?format=json&include=posts

// Output:
// {
//   "params": { "version": "v1", "id": "123" },
//   "query": { "format": "json", "include": "posts" }
// }
```

### Type Conversion:

```javascript
const express = require('express');
const app = express();

app.get('/products/:id', (req, res) => {
  // Query parameters are strings by default
  let page = req.query.page;      // '1' (string)
  let limit = req.query.limit;    // '10' (string)
  
  // Convert to numbers
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  
  // Route parameters are also strings
  let productId = req.params.id;  // '123' (string)
  productId = parseInt(productId);
  
  res.json({ productId, page, limit });
});

// Request: GET /products/123?page=2&limit=20
```

---

## Complete Summary of Q31-Q50

You now understand:

✅ Synchronous vs asynchronous functions
✅ Non-blocking I/O operations
✅ Backpressure in streams
✅ Thread pool mechanics
✅ Buffers and typed arrays
✅ Stream types (readable, writable, duplex, transform)
✅ pipe() functionality
✅ Flow and paused modes
✅ Basic HTTP server creation
✅ HTTP routing
✅ HTTP vs HTTPS
✅ Request and response objects
✅ Parsing incoming data
✅ HTTP/2 advantages
✅ What is Express.js
✅ Middleware functions
✅ app.use() vs app.get()
✅ Route and query parameters
