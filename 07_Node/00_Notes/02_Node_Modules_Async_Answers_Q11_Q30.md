# Node.js Interview Questions (Q11-Q30 Detailed Answers)

## SECTION 2: MODULES & PACKAGE MANAGEMENT (Q11-Q20)

## 11. What are CommonJS modules in Node.js?

**Answer:**

**CommonJS** is the module system used by default in Node.js. It allows you to split code into files and reuse them.

### Simple Analogy:

Think of modules like **LEGO blocks**:

- Each file is a block with specific functionality
- You export what you want others to use
- Other files import and use those blocks

### How CommonJS Works:

```javascript
// ===== math.js (exporting) =====
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

// Export functions
module.exports = {
  add,
  subtract
};

// ===== app.js (importing) =====
const math = require('./math');

console.log(math.add(5, 3));       // 8
console.log(math.subtract(10, 4)); // 6
```

### Different Export Styles:

**Style 1: Export entire object**

```javascript
// math.js
module.exports = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};

// app.js
const math = require('./math');
math.add(5, 3); // Works
```

**Style 2: Export single function**

```javascript
// greet.js
module.exports = function greet(name) {
  return `Hello, ${name}!`;
};

// app.js
const greet = require('./greet');
greet('Alice'); // "Hello, Alice!"
```

**Style 3: Export object with exports**

```javascript
// user.js
exports.getName = function() {
  return 'John';
};

exports.getAge = function() {
  return 25;
};

// app.js
const user = require('./user');
user.getName(); // 'John'
```

### Module Caching:

```javascript
// math.js
console.log('math.js loaded');

exports.add = (a, b) => a + b;

// app.js
const math1 = require('./math'); // Logs "math.js loaded"
const math2 = require('./math'); // Does NOT log again (cached)

console.log(math1 === math2); // true (same instance)
```

**Important:** Module is loaded once and cached!

---

## 12. What is the difference between require() and import?

**Answer:**

`require()` is CommonJS syntax. `import` is ES6/ESM syntax. They serve the same purpose but work differently.

### Comparison Table:

| Aspect             | require()       | import                         |
| ------------------ | --------------- | ------------------------------ |
| **Standard** | CommonJS        | ES6/ESM                        |
| **Type**     | Synchronous     | Asynchronous (can be)          |
| **When**     | Runtime         | Parse time                     |
| **Scope**    | Can be anywhere | Top level only                 |
| **Default**  | Node.js default | Needs .mjs or "type": "module" |

### Using require() (CommonJS):

```javascript
// math.js
module.exports = {
  add: (a, b) => a + b
};

// app.js
const math = require('./math'); // Synchronous
console.log(math.add(5, 3)); // 8

// Can be used anywhere
if (someCondition) {
  const utils = require('./utils'); // OK
}

function myFunction() {
  const helpers = require('./helpers'); // OK
}
```

### Using import (ES6/ESM):

```javascript
// math.js (needs .mjs extension or "type": "module" in package.json)
export function add(a, b) {
  return a + b;
}

// app.js
import { add } from './math.js'; // Must be at top level
console.log(add(5, 3)); // 8

// ❌ Can't use import conditionally
if (someCondition) {
  import('./utils.js'); // This DOESN'T work like require
}

// ✅ But can use dynamic import()
const utils = await import('./utils.js'); // Works (async)
```

### Real Example Comparison:

**CommonJS (require):**

```javascript
// calculator.js
exports.calculate = (a, b, operation) => {
  if (operation === 'add') return a + b;
  if (operation === 'subtract') return a - b;
};

// main.js
const calc = require('./calculator');
console.log(calc.calculate(10, 5, 'add')); // 15
```

**ES6/ESM (import):**

```javascript
// calculator.js
export function calculate(a, b, operation) {
  if (operation === 'add') return a + b;
  if (operation === 'subtract') return a - b;
}

// main.js
import { calculate } from './calculator.js';
console.log(calculate(10, 5, 'add')); // 15
```

### To Use import in Node.js:

**Option 1: Use .mjs extension**

```
app.mjs  (instead of app.js)
```

**Option 2: Add to package.json**

```json
{
  "type": "module"
}
```

### Dynamic Import (Modern Approach):

```javascript
// Can import dynamically with dynamic import()
async function loadModule() {
  const math = await import('./math.js');
  console.log(math.add(5, 3)); // 8
}

loadModule();
```

---

## 13. What is module.exports and exports?

**Answer:**

`module.exports` and `exports` are how you share code from one file to another in CommonJS.

### Simple Difference:

```javascript
// exports = reference to module.exports
// They start as the same object, but can diverge

// ✅ Correct - both work
exports.name = 'John';
module.exports.age = 25;

// ❌ Wrong - this breaks exports
module.exports = { name: 'John' }; // Now exports doesn't work!

// ✅ Correct - reassign module.exports properly
module.exports = { name: 'John', age: 25 };
```

### Real Example 1 - Using exports:

```javascript
// user.js
exports.getName = () => 'Alice';
exports.getAge = () => 25;
exports.getEmail = () => 'alice@example.com';

// app.js
const user = require('./user');
console.log(user.getName());   // Alice
console.log(user.getAge());    // 25
console.log(user.getEmail());  // alice@example.com
```

### Real Example 2 - Using module.exports:

```javascript
// calculator.js
module.exports = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b
};

// app.js
const calc = require('./calculator');
console.log(calc.add(10, 5));      // 15
console.log(calc.multiply(4, 3));  // 12
```

### Real Example 3 - Export a Single Function:

```javascript
// logger.js
module.exports = function log(message) {
  console.log(`[LOG] ${message}`);
};

// app.js
const log = require('./logger');
log('Application started'); // [LOG] Application started
```

### ❌ Common Mistake:

```javascript
// ❌ WRONG - This doesn't work as expected
exports = { name: 'John' };

// Why? Because exports is just a reference
// When you reassign exports, it no longer points to module.exports!

// ✅ CORRECT - Always use module.exports
module.exports = { name: 'John' };
```

### The Internal Mechanism:

```javascript
// This is what happens internally:
exports = module.exports;

// So these are the same:
exports.x = 1;
module.exports.x = 1;

// But when you do this:
exports = { y: 2 }; // exports now points to a different object!

// Now they're different:
module.exports.x; // 1 (still there)
exports.y;        // 2 (different object)

// When requiring, you get module.exports, not exports!
// So only module.exports.x is available
```

### Best Practice:

```javascript
// ✅ For exporting multiple things
module.exports = {
  function1: () => {},
  function2: () => {},
  variable1: 'value'
};

// ✅ For exporting a single thing
module.exports = function myFunction() {};

// ✅ For adding to exports
exports.fn1 = () => {};
exports.fn2 = () => {};
```

---

## 14. What are ES Modules (ESM) in Node.js?

**Answer:**

**ES Modules (ESM)** are the modern JavaScript module system. They use `import` and `export` syntax (different from CommonJS).

### Simple Analogy:

If CommonJS is the "old way" with `require()`, ES Modules is the "new standard way" with `import/export`.

### Basic ES Module Syntax:

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export const PI = 3.14;

// app.js
import { add, subtract, PI } from './math.js';

console.log(add(10, 5));       // 15
console.log(subtract(10, 5));  // 5
console.log(PI);               // 3.14
```

### How to Enable ESM in Node.js:

**Method 1: Use .mjs extension**

```bash
# Create files with .mjs extension
app.mjs
math.mjs
```

**Method 2: Set in package.json**

```json
{
  "type": "module",
  "name": "my-app",
  "version": "1.0.0"
}
```

### Different Import/Export Styles:

**Named Exports:**

```javascript
// utils.js
export function log(msg) { console.log(msg); }
export function error(msg) { console.error(msg); }
export const MAX_SIZE = 100;

// app.js
import { log, error, MAX_SIZE } from './utils.js';
log('Hello'); // Hello
```

**Default Export:**

```javascript
// logger.js
export default function log(message) {
  console.log(`[LOG] ${message}`);
}

// app.js
import log from './logger.js'; // No curly braces for default
log('Started'); // [LOG] Started
```

**Mix Named and Default:**

```javascript
// server.js
export default function startServer() {
  console.log('Server started');
}

export function stopServer() {
  console.log('Server stopped');
}

// app.js
import startServer, { stopServer } from './server.js';
startServer();  // Server started
stopServer();   // Server stopped
```

**Alias Imports:**

```javascript
// math.js
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }

// app.js
import { add as addition, subtract as subtraction } from './math.js';
console.log(addition(5, 3));    // 8
console.log(subtraction(10, 4)); // 6
```

**Import Everything:**

```javascript
// utils.js
export const name = 'John';
export const age = 25;
export function greet() { return 'Hello'; }

// app.js
import * as user from './utils.js';
console.log(user.name);    // John
console.log(user.age);     // 25
console.log(user.greet()); // Hello
```

### Dynamic Import:

```javascript
// Can import asynchronously
async function loadModule() {
  const math = await import('./math.js');
  console.log(math.add(5, 3)); // 8
}

loadModule();

// Useful for conditional imports
if (process.env.NODE_ENV === 'production') {
  const config = await import('./config.production.js');
} else {
  const config = await import('./config.development.js');
}
```

### ESM vs CommonJS in Node.js:

| Feature                   | CommonJS               | ESM           |
| ------------------------- | ---------------------- | ------------- |
| **Syntax**          | require/module.exports | import/export |
| **Loading**         | Synchronous            | Asynchronous  |
| **Top-level await** | No                     | Yes           |
| **__filename**      | Built-in               | Need meta.url |
| **__dirname**       | Built-in               | Need meta.url |

### Getting __filename and __dirname in ESM:

```javascript
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__filename); // /Users/john/app.js
console.log(__dirname);  // /Users/john
```

---

## 15. What is npm and what is package.json used for?

**Answer:**

**npm (Node Package Manager)** is the tool for managing packages (reusable code). **package.json** is a configuration file that describes your project.

### Simple Analogy:

Think of npm like **Amazon Prime for code packages**:

- You order packages (npm install)
- They arrive in node_modules
- package.json is your order list

### What is package.json?

It's a JSON file that contains:

- Project metadata (name, version, description)
- Dependencies (packages you need)
- Scripts (commands to run)
- Configuration (settings for tools)

### Real Example - package.json:

```json
{
  "name": "my-awesome-app",
  "version": "1.0.0",
  "description": "A simple Node.js application",
  "author": "John Doe",
  "license": "MIT",
  
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "build": "webpack"
  },
  
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "dotenv": "^16.0.3"
  },
  
  "devDependencies": {
    "nodemon": "^2.0.20",
    "jest": "^29.0.0",
    "eslint": "^8.0.0"
  }
}
```

### Key Fields Explained:

```javascript
{
  "name": "my-app",           // Package name (must be lowercase)
  "version": "1.0.0",         // Semantic versioning
  "description": "...",       // What the project does
  "main": "index.js",         // Entry point file
  "scripts": {                // Commands to run
    "start": "node index.js"  // npm start
  },
  "dependencies": {           // Packages needed for production
    "express": "^4.18.2"      // Name and version
  },
  "devDependencies": {        // Packages needed only for development
    "nodemon": "^2.0.20"
  }
}
```

### Common npm Commands:

```bash
# Initialize new project
npm init

# Install all dependencies from package.json
npm install

# Install specific package
npm install express

# Install as dev dependency
npm install --save-dev nodemon

# Remove package
npm uninstall express

# List installed packages
npm list

# Update packages
npm update

# Run a script from package.json
npm run dev

# Install globally
npm install -g nodemon
```

### Creating package.json Manually:

```bash
# Method 1: Interactive setup
npm init

# Method 2: With defaults
npm init -y

# Method 3: Manual creation (create file manually)
```

### Real Example - Express Project:

```json
{
  "name": "express-server",
  "version": "1.0.0",
  "description": "Simple Express server",
  "main": "server.js",
  
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest"
  },
  
  "dependencies": {
    "express": "^4.18.2",
    "body-parser": "^1.20.0"
  },
  
  "devDependencies": {
    "nodemon": "^2.0.20",
    "jest": "^29.0.0"
  }
}
```

---

## 16. What is semantic versioning (semver)?

**Answer:**

**Semantic Versioning (semver)** is a standard way of numbering packages: MAJOR.MINOR.PATCH (e.g., 1.2.3).

### The Three Numbers:

```
1.2.3
│ │ └─ PATCH (bug fixes, internal changes)
│ └─── MINOR (new features, backward compatible)
└───── MAJOR (breaking changes, incompatible updates)
```

### Real Examples:

**PATCH version (1.2.3 → 1.2.4)**

```
- Bug fix
- Small improvement
- No new features
- Still compatible with 1.2.3
```

**MINOR version (1.2.0 → 1.3.0)**

```
- New features added
- Still backward compatible
- Old code still works
- Can add new functions but not remove old ones
```

**MAJOR version (1.0.0 → 2.0.0)**

```
- Breaking changes
- Could change API
- Could remove features
- Old code might not work
```

### Version Symbols in package.json:

```json
{
  "dependencies": {
    "express": "4.18.2",        // Exact version (only 4.18.2)
    "express": "^4.18.2",       // Allow MINOR and PATCH updates (4.x.x)
    "express": "~4.18.2",       // Allow PATCH updates only (4.18.x)
    "express": ">=4.18.0",      // 4.18.0 or higher
    "express": "^4.0.0 <5.0.0", // 4.x.x range
    "express": "*"              // Any version
  }
}
```

### Understanding the Symbols:

**^ (Caret - allows minor updates)**

```
^4.18.2 means >=4.18.2, <5.0.0
- Can update to 4.18.3, 4.19.0, 4.20.1
- Cannot update to 5.0.0 (major change)
```

**~ (Tilde - allows patch updates)**

```
~4.18.2 means >=4.18.2, <4.19.0
- Can update to 4.18.3, 4.18.4
- Cannot update to 4.19.0 (minor change)
```

### Real World Example:

```json
{
  "dependencies": {
    "express": "^4.18.2",      // Can be 4.x.x (4.19.0, 4.20.1, etc.)
    "mongoose": "~7.0.0",      // Can be 7.0.x only (7.0.3, 7.0.5)
    "dotenv": "16.0.3"         // Exact version only
  }
}
```

### When Versions Update:

```
1.0.0 - Initial release
1.0.1 - Bug fix (PATCH)
1.1.0 - New feature added (MINOR)
1.1.1 - Bug fix (PATCH)
2.0.0 - Breaking change (MAJOR)
```

---

## 17. What are devDependencies vs dependencies?

**Answer:**

**dependencies** = packages needed to run your app
**devDependencies** = packages only needed for development

### Simple Analogy:

- **dependencies** = tools needed to build a car (engine, wheels, seats)
- **devDependencies** = tools to make/test the car (screwdriver, testing equipment)

### Real Comparison:

| Type                      | Purpose              | Examples                 | Installed         |
| ------------------------- | -------------------- | ------------------------ | ----------------- |
| **dependencies**    | Required to run app  | express, mongoose, axios | In production     |
| **devDependencies** | Only for development | nodemon, jest, eslint    | NOT in production |

### Real Example:

```json
{
  "dependencies": {
    "express": "^4.18.2",      // Your app NEEDS express
    "mongoose": "^7.0.0",      // Your app NEEDS mongoose
    "dotenv": "^16.0.3"        // Your app NEEDS dotenv
  },
  
  "devDependencies": {
    "nodemon": "^2.0.20",      // Only for development (auto-restart)
    "jest": "^29.0.0",         // Only for testing
    "eslint": "^8.0.0"         // Only for linting
  }
}
```

### Installing Packages:

```bash
# Install as dependency (needed in production)
npm install express
npm install --save express

# Install as devDependency (only for development)
npm install --save-dev nodemon
npm install -D nodemon

# Install all dependencies and devDependencies
npm install

# Install only production dependencies
npm install --production
```

### In Production Environment:

```bash
# When deploying to server:
npm install --production

# This installs ONLY:
# - dependencies
# - NOT devDependencies (saves space and time)
```

### Real World Example - Full Stack App:

```json
{
  "name": "my-web-app",
  "version": "1.0.0",
  
  "dependencies": {
    "express": "^4.18.2",        // ✓ Production
    "mongoose": "^7.0.0",        // ✓ Production
    "bcryptjs": "^2.4.3",        // ✓ Production (for hashing passwords)
    "jsonwebtoken": "^9.0.0",    // ✓ Production (for auth)
    "dotenv": "^16.0.3"          // ✓ Production
  },
  
  "devDependencies": {
    "nodemon": "^2.0.20",        // ✗ Dev only (auto-restart during development)
    "jest": "^29.0.0",           // ✗ Dev only (testing)
    "supertest": "^6.3.3",       // ✗ Dev only (API testing)
    "eslint": "^8.0.0",          // ✗ Dev only (code quality)
    "prettier": "^2.8.0"         // ✗ Dev only (code formatting)
  }
}
```

### Why This Matters:

```
Development machine:
  npm install
  Installs: 25 packages (dependencies + devDependencies)
  Size: 500MB

Production server:
  npm install --production
  Installs: 5 packages (only dependencies)
  Size: 50MB (10x smaller!)
  Faster deployment!
```

---

## 18. What is npx and how is it different from npm?

**Answer:**

**npm** = Package manager (installs packages)
**npx** = Executes packages (runs them without installing globally)

### Simple Analogy:

- **npm** = Shop (buy and store items)
- **npx** = Delivery service (use item temporarily, don't need to own it)

### Comparison Table:

| Aspect                     | npm                     | npx                 |
| -------------------------- | ----------------------- | ------------------- |
| **Purpose**          | Install packages        | Execute packages    |
| **Install location** | Saves to disk           | Runs from cache     |
| **Global install**   | Needed for global tools | Not needed          |
| **Space**            | Takes disk space        | Minimal space       |
| **Version**          | Uses installed version  | Uses latest version |

### Real Examples:

**Using npm (traditional way):**

```bash
# Install globally
npm install -g create-react-app

# Now can use it
create-react-app my-app

# Takes disk space, need to update manually
npm update -g create-react-app
```

**Using npx (modern way):**

```bash
# Run directly without installing
npx create-react-app my-app

# Always uses latest version
# No disk space used for package
# No need to update
```

### Common Use Cases for npx:

**1. Create projects:**

```bash
# Create React app
npx create-react-app my-app

# Create Vue app
npx vue create my-app

# Create Next.js app
npx create-next-app@latest my-app
```

**2. Run build tools:**

```bash
# Run webpack
npx webpack

# Run prettier
npx prettier --write .

# Run jest tests
npx jest
```

**3. Run scripts from different Node versions:**

```bash
# Run with Node 14
npx node@14 --version

# Run package with specific version
npx express@4.18.0 --version
```

### Real Example - npx vs npm:

**Scenario: Using ESLint**

**With npm:**

```bash
# 1. Install globally
npm install -g eslint

# 2. Run it
eslint my-file.js

# 3. Need to update
npm update -g eslint
```

**With npx:**

```bash
# 1. Just run it
npx eslint my-file.js

# Done! It's cached and ready to use
# Automatically uses latest version next time
```

### Why npx is Better:

✅ **No global installation needed** - Cleaner system
✅ **Always latest version** - No need to update
✅ **No disk space wasted** - Cache is small
✅ **Avoid version conflicts** - Each package uses its version

---

## 19. What is package-lock.json and why is it important?

**Answer:**

**package-lock.json** is a file that locks the exact versions of packages you installed. It ensures everyone gets the same versions.

### Simple Analogy:

Think of it like a **recipe with exact measurements**:

- package.json = "Use flour and sugar"
- package-lock.json = "Use exactly 2 cups flour and 1 cup sugar"

### Why It's Important:

```
Without package-lock.json:
  Developer A: npm install → Gets express 4.18.0
  Developer B: npm install → Gets express 4.19.0 (newer)
  Server: npm install → Gets express 4.18.5
  
  Problem: Different versions cause bugs!

With package-lock.json:
  Developer A: npm install → Gets express 4.18.0
  Developer B: npm install → Gets express 4.18.0 (same!)
  Server: npm install → Gets express 4.18.0 (same!)
  
  Benefit: Everyone has same version!
```

### What package-lock.json Contains:

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "lockfileVersion": 3,
  
  "packages": {
    "": {
      "name": "my-app",
      "version": "1.0.0",
      "dependencies": {
        "express": "4.18.2"
      }
    },
  
    "node_modules/express": {
      "version": "4.18.2",
      "resolved": "https://registry.npmjs.org/express/-/express-4.18.2.tgz",
      "integrity": "sha512-...",
      "dependencies": {
        "body-parser": "1.20.0",
        "cookie": "0.4.2"
      }
    },
  
    "node_modules/body-parser": {
      "version": "1.20.0",
      "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-1.20.0.tgz"
    }
  }
}
```

### How It Works:

```
Step 1: npm install (first time)
  ↓ Reads package.json
  ↓ Downloads dependencies and sub-dependencies
  ↓ Creates package-lock.json with exact versions

Step 2: npm install (next time)
  ↓ Reads package-lock.json
  ↓ Installs exact versions from lock file
  ↓ Skips version resolution (faster!)

Result: Same versions every time!
```

### Practical Example:

```json
// package.json
{
  "dependencies": {
    "express": "^4.18.2"  // Can be 4.x.x
  }
}

// package-lock.json
{
  "packages": {
    "node_modules/express": {
      "version": "4.18.2"  // Locked to exactly 4.18.2
    }
  }
}
```

### When package-lock.json Updates:

```bash
# npm install (uses lock file, doesn't update it)
npm install

# npm update (updates packages and lock file)
npm update

# npm install new-package (adds to lock file)
npm install new-package
```

### Best Practices:

✅ **Commit to git** - Include in version control
✅ **Don't modify manually** - Let npm manage it
✅ **Check for conflicts** - Merge carefully with git
✅ **Delete and reinstall** - If lock file is corrupted

```bash
# If lock file is corrupted:
rm package-lock.json
rm -rf node_modules
npm install  # Recreates everything
```

---

## 20. What is the purpose of node_modules folder?

**Answer:**

**node_modules** folder is where all the installed packages live. Every package you install via npm goes here.

### Simple Analogy:

Think of node_modules like a **library**:

- Each file is a book
- Thousands of books organized in folders
- Your code borrows from this library

### What's Inside node_modules:

```
node_modules/
├── express/              (Express framework)
│   ├── package.json
│   ├── index.js
│   ├── lib/
│   └── ...
├── mongoose/             (MongoDB library)
│   ├── package.json
│   ├── index.js
│   └── ...
├── dotenv/               (Environment variables)
├── nodemon/              (Auto-restart)
└── ... (thousands of packages)
```

### How Packages Get There:

```bash
# When you run:
npm install express

# npm creates:
node_modules/express/    (main package)
node_modules/body-parser/ (dependency of express)
node_modules/cookie/      (dependency of body-parser)
node_modules/... (all dependencies)
```

### How Your Code Uses node_modules:

```javascript
// Node.js automatically looks in node_modules
const express = require('express');
// Looks in: node_modules/express/

const mongoose = require('mongoose');
// Looks in: node_modules/mongoose/

const dotenv = require('dotenv');
// Looks in: node_modules/dotenv/
```

### Size of node_modules:

```
A typical project:
- 50 packages in package.json
- 5000+ packages in node_modules (with sub-dependencies)
- 200MB+ disk space

That's why:
- We don't commit node_modules to git
- We add node_modules to .gitignore
- We only commit package-lock.json and package.json
```

### .gitignore Example:

```
# Don't commit node_modules
node_modules/

# But DO commit these:
package.json
package-lock.json
```

### Recreating node_modules:

```bash
# Delete folder
rm -rf node_modules

# Reinstall from lock file
npm install

# Everything comes back!
```

### Real Project Structure:

```
my-app/
├── node_modules/          (Don't commit, 200MB)
├── src/
│   ├── index.js
│   └── ...
├── package.json           (Commit to git)
├── package-lock.json      (Commit to git)
└── .gitignore            (includes node_modules/)
```

### Best Practices:

✅ **Don't commit node_modules** - Too large
✅ **Commit package.json and package-lock.json** - Others can recreate it
✅ **Use .gitignore** - Prevent accidental commits
✅ **Run npm install when cloning** - Recreate node_modules locally

---

## SECTION 4: ASYNCHRONY & EVENT LOOP DEEP DIVE (Q26-Q30)

## 26. How does the Node.js event loop work step-by-step?

**Answer:**

The **event loop** is the heart of Node.js. It continuously checks for work (callbacks, timers, I/O operations) and executes them in a specific order.

### Visual Representation:

```
┌───────────────────────────┐
│      Event Loop Cycle     │
└───────────────────────────┘
        ↓
┌─────────────────────────────────┐
│ 1. Timers Phase                 │
│ Execute setTimeout/setInterval  │
└─────────────────────────────────┘
        ↓
┌─────────────────────────────────┐
│ 2. Pending Callbacks Phase      │
│ Execute deferred I/O callbacks  │
└─────────────────────────────────┘
        ↓
┌─────────────────────────────────┐
│ 3. Idle, Prepare Phase          │
│ Internal Node.js operations     │
└─────────────────────────────────┘
        ↓
┌─────────────────────────────────┐
│ 4. Poll Phase                   │
│ Wait for I/O events             │
│ Execute I/O callbacks           │
└─────────────────────────────────┘
        ↓
┌─────────────────────────────────┐
│ 5. Check Phase                  │
│ Execute setImmediate callbacks  │
└─────────────────────────────────┘
        ↓
┌─────────────────────────────────┐
│ 6. Close Callbacks Phase        │
│ Execute close event callbacks   │
└─────────────────────────────────┘
        ↓
    (Loop back to phase 1)
```

### Detailed Step-by-Step:

```javascript
console.log('1. Start');

setTimeout(() => {
  console.log('2. setTimeout (timers phase)');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Promise (microtask queue - runs before phases)');
});

console.log('4. End');

// Output:
// 1. Start
// 4. End
// 3. Promise
// 2. setTimeout
```

**Timeline:**

```
Phase: Synchronous code
  ↓ Execute console.log('1. Start')
  ↓ Queue setTimeout callback to timers phase
  ↓ Queue Promise to microtask queue
  ↓ Execute console.log('4. End')

Phase: Microtask Queue (higher priority!)
  ↓ Execute Promise callback
  ↓ console.log('3. Promise')

Phase: Timers
  ↓ Execute setTimeout callback
  ↓ console.log('2. setTimeout')
```

### Real Example - File Reading:

```javascript
const fs = require('fs');

console.log('Start');

// I/O operation (will be executed in poll phase)
fs.readFile('file.txt', (err, data) => {
  console.log('File read (poll phase)');
});

// Immediate callback (will be executed in check phase)
setImmediate(() => {
  console.log('Immediate (check phase)');
});

// Timer callback (will be executed in timers phase)
setTimeout(() => {
  console.log('Timeout (timers phase)');
}, 0);

console.log('End');

// Output:
// Start
// End
// Timeout (timers phase)
// Immediate (check phase)
// File read (poll phase) - might vary based on system
```

---

## 27. What are microtasks and macrotasks in Node.js?

**Answer:**

**Microtasks** and **macrotasks** are two different queues. Microtasks have higher priority and run before macrotasks.

### Queue Priority:

```
High Priority ➜ Microtask Queue
  - Promises (.then, .catch, .finally)
  - process.nextTick()
  - queueMicrotask()

Low Priority ➜ Macrotask Queue
  - setTimeout
  - setInterval
  - setImmediate
  - I/O operations
  - UI rendering
```

### Execution Order:

```
1. Execute synchronous code
     ↓
2. Execute ALL microtasks (complete queue)
     ↓
3. Execute ONE macrotask
     ↓
4. Execute ALL microtasks again
     ↓
5. Execute next macrotask
     ↓
(Repeat 3-5)
```

### Real Example:

```javascript
console.log('1. Sync');

setTimeout(() => {
  console.log('2. setTimeout (macrotask)');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('3. Promise 1 (microtask)');
  })
  .then(() => {
    console.log('4. Promise 2 (microtask)');
  });

setImmediate(() => {
  console.log('5. setImmediate (macrotask)');
});

console.log('6. Sync');

// Output:
// 1. Sync
// 6. Sync
// 3. Promise 1 (all microtasks)
// 4. Promise 2 (all microtasks)
// 2. setTimeout (first macrotask)
// 5. setImmediate (second macrotask)
```

### Timeline Visualization:

```
Call Stack:
  [console.log('1. Sync')] → Executes → Output: "1. Sync"
  
Queues:
  Microtask: Promise 1, Promise 2
  Macrotask: setTimeout, setImmediate
  
Call Stack:
  [console.log('6. Sync')] → Executes → Output: "6. Sync"

Microtask Queue (execute ALL):
  [Promise 1] → Output: "3. Promise 1"
  [Promise 2] → Output: "4. Promise 2"

Macrotask Queue (execute ONE):
  [setTimeout] → Output: "2. setTimeout"

Microtask Queue (check again - empty)
  
Macrotask Queue (execute next):
  [setImmediate] → Output: "5. setImmediate"
```

---

## 28. What is process.nextTick()?

**Answer:**

**process.nextTick()** schedules a callback to run as soon as possible, right before the next event loop phase.

### Simple Analogy:

- **setTimeout** = Appointment next week
- **process.nextTick** = Appointment after this phone call ends

### Execution Order:

```
process.nextTick() executes BEFORE setImmediate()
process.nextTick() executes BEFORE Promise

┌──────────────────────┐
│ Synchronous code     │
└──────────────────────┘
         ↓
┌──────────────────────┐
│ process.nextTick()   │ ← Runs here (first!)
└──────────────────────┘
         ↓
┌──────────────────────┐
│ Microtasks (Promise) │
└──────────────────────┘
         ↓
┌──────────────────────┐
│ setImmediate()       │
└──────────────────────┘
```

### Real Example:

```javascript
console.log('1. Sync');

process.nextTick(() => {
  console.log('2. nextTick');
});

Promise.resolve().then(() => {
  console.log('3. Promise');
});

setImmediate(() => {
  console.log('4. Immediate');
});

console.log('5. Sync');

// Output:
// 1. Sync
// 5. Sync
// 2. nextTick (runs first!)
// 3. Promise
// 4. Immediate
```

### Practical Use Case:

```javascript
// process.nextTick is useful for deferring execution
class EventEmitter {
  emit(event, data) {
    // Emit the event after current operation completes
    process.nextTick(() => {
      this.listeners[event]?.(data);
    });
  }
}

// Example:
const emitter = new EventEmitter();
emitter.on('ready', () => console.log('Ready!'));

console.log('Start');
emitter.emit('ready');
console.log('End');

// Output:
// Start
// End
// Ready!
```

---

## 29. What is setImmediate() and how does it differ from setTimeout()?

**Answer:**

Both schedule code to run later, but they run in different phases of the event loop.

### Key Differences:

| Aspect          | setTimeout               | setImmediate          |
| --------------- | ------------------------ | --------------------- |
| **Phase** | Timers phase             | Check phase           |
| **Delay** | After milliseconds       | After current phase   |
| **Order** | Runs before setImmediate | Runs after setTimeout |
| **Use**   | Delay execution          | Run ASAP after I/O    |

### Execution Order:

```
setTimeout(..., 0)    → Timers phase (earlier)
setImmediate()        → Check phase (later)

So setImmediate runs AFTER setTimeout!
```

### Real Example:

```javascript
setTimeout(() => {
  console.log('setTimeout');
}, 0);

setImmediate(() => {
  console.log('setImmediate');
});

// Output:
// setTimeout
// setImmediate

// Why? setTimeout runs in timers phase
// setImmediate runs in check phase
// Timers phase comes before check phase
```

### Exception - Inside I/O Callback:

```javascript
const fs = require('fs');

fs.readFile('file.txt', () => {
  // Inside I/O callback (poll phase)
  
  setTimeout(() => {
    console.log('setTimeout');
  }, 0);
  
  setImmediate(() => {
    console.log('setImmediate');
  });
});

// Output (REVERSED!):
// setImmediate
// setTimeout

// Why? After poll phase comes check phase
// setImmediate is in check phase (next)
// setTimeout has to wait for next timers phase
```

### When to Use:

**setImmediate:**

- Run code as soon as current phase completes
- After I/O operations
- When you want next phase

**setTimeout:**

- Delay code by milliseconds
- For periodic tasks (with loop)
- When you want exact timing

---

## 30. How does async/await work internally in Node.js?

**Answer:**

**async/await** is syntactic sugar for Promises. It makes asynchronous code look synchronous and easier to read.

### Simple Analogy:

- **Promises** = Calling ahead and waiting for a callback
- **async/await** = Using a walkie-talkie to get updates

### How async/await Works:

```javascript
// async function always returns a Promise
async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return data;
}

// Equivalent to:
function fetchUser(id) {
  return fetch(`/api/users/${id}`)
    .then(response => response.json())
    .then(data => data);
}
```

### Real Example:

```javascript
// Traditional Promise approach
function getUser(id) {
  return fetch(`/api/users/${id}`)
    .then(res => res.json())
    .then(user => {
      return fetch(`/api/posts/${user.id}`)
        .then(res => res.json())
        .then(posts => ({
          user,
          posts
        }));
    })
    .catch(err => console.error(err));
}

// With async/await (much cleaner!)
async function getUser(id) {
  try {
    const userRes = await fetch(`/api/users/${id}`);
    const user = await userRes.json();
  
    const postsRes = await fetch(`/api/posts/${user.id}`);
    const posts = await postsRes.json();
  
    return { user, posts };
  } catch (err) {
    console.error(err);
  }
}
```

### Internally, async/await:

1. **Creates a Promise** - async function returns Promise
2. **Pauses execution** - await pauses at each await
3. **Resumes when resolved** - continues after Promise settles
4. **Passes value** - await returns the resolved value

### Behind the Scenes:

```javascript
// This:
async function getData() {
  const data = await fetch('/api/data').then(r => r.json());
  console.log(data);
}

// Becomes something like:
function getData() {
  return new Promise((resolve, reject) => {
    fetch('/api/data')
      .then(r => r.json())
      .then(data => {
        console.log(data);
        resolve();
      })
      .catch(reject);
  });
}
```

### Error Handling:

```javascript
// With try/catch (async/await)
async function getData() {
  try {
    const res = await fetch('/api/data');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Equivalent with .catch()
function getData() {
  return fetch('/api/data')
    .then(res => res.json())
    .catch(error => console.error('Error:', error));
}
```

### Parallel Execution with async/await:

```javascript
// Sequential (slow)
async function slow() {
  const user = await getUser(1);      // Wait 1 second
  const posts = await getPosts(1);    // Wait 1 second
  return { user, posts };             // Total: 2 seconds
}

// Parallel (fast)
async function fast() {
  const [user, posts] = await Promise.all([
    getUser(1),                        // Both start at same time
    getPosts(1)                        // Runs concurrently
  ]);                                  // Total: 1 second
  return { user, posts };
}
```

---

## Complete Summary of Q11-Q30

You now understand:

✅ CommonJS modules (require/module.exports)
✅ require() vs import differences
✅ module.exports and exports
✅ ES Modules (ESM)
✅ npm and package.json
✅ Semantic versioning
✅ Dependencies vs devDependencies
✅ npx utility
✅ package-lock.json importance
✅ node_modules folder
✅ Event loop phases
✅ Microtasks vs macrotasks
✅ process.nextTick()
✅ setTimeout vs setImmediate
✅ async/await internals
