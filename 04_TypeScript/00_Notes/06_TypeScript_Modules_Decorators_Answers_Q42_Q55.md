# TypeScript Interview Questions (Q42-Q47 Detailed Answers)

## SECTION 5: MODULES & NAMESPACES

## 42. What are modules in TypeScript?

**Answer:**

**Modules** are TypeScript/JavaScript files that export and import code. They are the preferred way to organize code in modern TypeScript applications.

### Simple Analogy:

Think of modules like **LEGO boxes**:

- Each box contains specific pieces (exports)
- You can open multiple boxes and use pieces from each (imports)
- Pieces from one box don't interfere with other boxes

### How Modules Work:

Each file with top-level import or export is considered a module. Modules have their own scope (not global).

### Real Example - Creating Modules:

**math.ts** (Module that exports functions)

```typescript
// Export named functions
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

// Export constant
export const PI = 3.14159;

// Export type
export interface Calculator {
  add(a: number, b: number): number;
}
```

**app.ts** (Module that imports)

```typescript
// Import specific exports
import { add, subtract, PI } from './math';

console.log(add(5, 3));        // 8
console.log(subtract(10, 4));  // 6
console.log(PI);               // 3.14159
```

### Different Ways to Export:

```typescript
// Named exports
export function helper() {}
export const MAX = 100;
export interface Config {}

// Export list
function internal() {}
function external() {}
export { external };

// Export with rename
function internalName() {}
export { internalName as publicName };

// Default export (one per file)
export default function calculate() {}

// Or default export of class
export default class Calculator {
  add(a: number, b: number) {
    return a + b;
  }
}

// Re-export from another module
export { add, subtract } from './math';
export * from './utils'; // Re-export all
```

### Different Ways to Import:

```typescript
// Import named exports
import { add, subtract } from './math';

// Import with rename
import { add as addition } from './math';

// Import everything as namespace
import * as Math from './math';
Math.add(5, 3);

// Import default export
import Calculator from './Calculator';

// Mix default and named imports
import Logger, { log, info } from './logging';

// Import for side effects (runs code without importing)
import './polyfills';

// Type-only imports (TypeScript 3.8+)
import type { User } from './types';

// Dynamic import (async)
async function loadModule() {
  const module = await import('./math');
  console.log(module.add(5, 3));
}
```

### Benefits of Modules:

✅ **Better code organization** - Related code together
✅ **Encapsulation** - Hide internal implementation
✅ **Tree-shaking support** - Remove unused code
✅ **Better tooling** - IDE support, autocomplete
✅ **Reusability** - Share code across projects
✅ **Standard** - ES6 modules are the standard

---

## 43. What is the difference between modules and namespaces?

**Answer:**

**Modules** and **namespaces** are two different ways to organize code in TypeScript. They serve similar purposes but have important differences.

### Comparison Table:

| Aspect                 | Modules               | Namespaces            |
| ---------------------- | --------------------- | --------------------- |
| **Organization** | File-based            | Within file/global    |
| **Syntax**       | `import`/`export` | `namespace` keyword |
| **Scope**        | Automatic isolation   | Global scope          |
| **Standard**     | ES6 standard          | TypeScript-specific   |
| **Tooling**      | Excellent support     | Limited support       |
| **Modern Use**   | Preferred             | Legacy/specific cases |
| **Tree-shaking** | Supported             | Not supported         |

### Modules (Modern Approach):

```typescript
// userService.ts - Module
export interface User {
  id: number;
  name: string;
}

export function getUser(id: number): User {
  return { id, name: "Alice" };
}

// app.ts - Using module
import { User, getUser } from './userService';

const user = getUser(1);
```

**File-based:**

- Each file is automatically a module
- Uses import/export syntax
- Each module has its own scope
- Better for large applications

### Namespaces (Legacy Approach):

```typescript
// Everything in one file or with triple-slash references

// validation.ts
namespace Validation {
  export interface Validator {
    isValid(s: string): boolean;
  }

  export class EmailValidator implements Validator {
    isValid(email: string): boolean {
      return email.includes("@");
    }
  }

  export class PhoneValidator implements Validator {
    isValid(phone: string): boolean {
      return /^\d{10}$/.test(phone);
    }
  }
}

// Usage (same file or after /// <reference path="validation.ts" />)
const emailValidator = new Validation.EmailValidator();
console.log(emailValidator.isValid("test@example.com")); // true
```

**Global scope:**

- All code in same namespace accessible globally
- Uses `namespace` keyword
- Used with triple-slash references
- Good for organizing legacy code

### Real Example - Modules (Recommended):

```typescript
// types/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserWithAdmin extends User {
  isAdmin: boolean;
}

// services/userService.ts
import type { User } from '../types/user';

export class UserService {
  async getUser(id: number): Promise<User> {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
  }

  async createUser(user: User): Promise<User> {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(user)
    });
    return response.json();
  }
}

// app.ts
import { UserService } from './services/userService';

const service = new UserService();
const user = await service.getUser(1);
```

### Real Example - Namespaces (Legacy):

```typescript
namespace App {
  namespace Models {
    export interface User {
      id: number;
      name: string;
    }
  }

  namespace Services {
    export class UserService {
      getUser(id: number): Models.User {
        return { id, name: "Alice" };
      }
    }
  }

  // Usage
  const service = new Services.UserService();
  const user = service.getUser(1);
}
```

### When to Use Which:

**Use MODULES (Recommended):**
✅ New projects
✅ Modern TypeScript/JavaScript
✅ Large-scale applications
✅ Using bundlers (webpack, vite, etc.)
✅ Publishing npm packages
✅ Team projects (standardized approach)

**Use NAMESPACES:**
❌ Legacy codebases
❌ Global libraries loaded via script tags
❌ Simple scripts without build tools
❌ Declaration merging scenarios (rare)
❌ Only if no module system available

### Key Takeaway:

**Modules are the modern standard.** Use modules for all new TypeScript code. Namespaces are legacy and should only be used in specific legacy scenarios or when maintaining old code.

---

## 44. How do you import and export in TypeScript?

**Answer:**

TypeScript uses ES6 module syntax for import and export. Multiple patterns exist based on your needs.

### Named Exports (Multiple per file):

```typescript
// utilities.ts
export function formatDate(date: Date): string {
  return date.toISOString();
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const MAX_SIZE = 100;

export interface Config {
  timeout: number;
  retries: number;
}

export type Status = "active" | "inactive" | "pending";

export class Logger {
  log(message: string) {
    console.log(message);
  }
}

// app.ts - Importing named exports
import { formatDate, capitalize, MAX_SIZE, Config, Status, Logger } from './utilities';

const date = formatDate(new Date());
const upper = capitalize("hello");
const config: Config = { timeout: 5000, retries: 3 };
const logger = new Logger();
```

### Default Export (One per file):

```typescript
// Logger.ts - Default export
export default class Logger {
  log(message: string) {
    console.log(`[LOG] ${message}`);
  }
}

// Calculator.ts - Default export function
export default function calculate(a: number, b: number): number {
  return a + b;
}

// Database.ts - Default export object
const database = {
  connect() { },
  disconnect() { }
};

export default database;

// app.ts - Importing default exports
import Logger from './Logger';
import calculate from './Calculator';
import db from './Database';

const logger = new Logger();
logger.log("Starting");

const result = calculate(5, 3);

db.connect();
```

### Export with Rename:

```typescript
// Original functions
function internalHelper() {}
function getValue() {}

// Export with different names
export { internalHelper as helper };
export { getValue as publicAPI };

// Importing with rename
import { helper, publicAPI as api } from './utils';
```

### Mix Default and Named Exports:

```typescript
// mixed.ts
export default class User {
  constructor(public name: string) {}
}

export function getUserId(user: User): string {
  return `user_${user.name}`;
}

export interface UserData {
  id: string;
  name: string;
}

// app.ts - Import both
import User, { getUserId, UserData } from './mixed';

const user = new User("Alice");
const id = getUserId(user);
```

### Re-exporting (Barrel Exports):

```typescript
// utils/math.ts
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

// utils/string.ts
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// utils/index.ts (Barrel/re-export file)
export * from './math';
export * from './string';
export { default as Logger } from './Logger';

// app.ts - Import everything from one place
import { add, capitalize, Logger } from './utils';
// Instead of importing from multiple files
```

### Type-Only Imports (TypeScript 3.8+):

```typescript
// types.ts
export interface User {
  id: number;
  name: string;
}

export type Status = "active" | "inactive";

// app.ts
// Only types (removed at compile time)
import type { User, Status } from './types';

// This import is erased from JavaScript, reducing bundle size
const user: User = { id: 1, name: "Alice" };

// Or mix type and value imports
import { type User, getUserById } from './types';
```

### Dynamic Imports (Async):

```typescript
// Load module at runtime
async function loadUtilities() {
  const utils = await import('./utilities');
  
  console.log(utils.MAX_SIZE);
  utils.Logger.log("Loaded");
}

loadUtilities();

// Or in event handler
document.getElementById("loadBtn")?.addEventListener("click", async () => {
  const module = await import('./heavyModule');
  module.initialize();
});
```

### Side-Effect Imports:

```typescript
// polyfills.ts - Just runs code, doesn't export anything
if (!Array.prototype.at) {
  Array.prototype.at = function(index: number) {
    if (index < 0) {
      return this[this.length + index];
    }
    return this[index];
  };
}

// app.ts - Import just to run the code
import './polyfills';
// Now Array.prototype.at exists for all arrays

// CSS file import (with appropriate loader)
import './styles/global.css';
```

### Export Syntax Summary:

```typescript
// All export syntaxes
export const x = 1;                    // Named export
export function foo() {}               // Named export
export class Bar {}                    // Named export
export interface Baz {}                // Named export

export default class {};               // Default export
export default function() {}           // Default export
export default 42;                     // Default export

export { x, foo, Bar };                // Export list
export { x as X };                     // Export with rename
export * from './other';               // Re-export all
export { default } from './other';     // Re-export default

export type { Type1, Type2 };           // Type-only exports
export type { Type as T } from './t';  // Type re-export with rename
```

---

## SECTION 6: DECORATORS

## 45. What are decorators in TypeScript?

**Answer:**

**Decorators** are special declarations that can be attached to classes, methods, properties, accessors, or parameters. They provide a way to add annotations and modify behavior.

### Simple Analogy:

Think of decorators like **stickers on a gift box**:

- The box is the class/method
- Stickers add extra information or modify the box
- A red sticker might mean "fragile"
- A blue sticker might mean "handle with care"

### Decorator Syntax:

Decorators use the `@expression` syntax. Enable in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### Basic Decorator Example:

```typescript
// Simple class decorator
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class BugReport {
  type = "report";
  title: string;

  constructor(t: string) {
    this.title = t;
  }
}

// Now the class is sealed - can't add/remove properties
```

### Real Example - Logger Decorator:

```typescript
// Decorator that logs when method is called
function logged(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${propertyKey} with arguments:`, args);
  
    const result = originalMethod.apply(this, args);
  
    console.log(`${propertyKey} returned:`, result);
    return result;
  };

  return descriptor;
}

// Using the decorator
class Calculator {
  @logged
  add(a: number, b: number): number {
    return a + b;
  }

  @logged
  multiply(a: number, b: number): number {
    return a * b;
  }
}

// Usage
const calc = new Calculator();
calc.add(5, 3);
// Logs:
// Calling add with arguments: [5, 3]
// add returned: 8

calc.multiply(4, 2);
// Logs:
// Calling multiply with arguments: [4, 2]
// multiply returned: 8
```

### Decorator Factory (With Parameters):

```typescript
// Decorator factory that accepts parameters
function validate(maxLength: number) {
  return function(target: any, propertyKey: string) {
    let value: string;

    const getter = () => {
      return value;
    };

    const setter = (newValue: string) => {
      if (newValue.length > maxLength) {
        throw new Error(`${propertyKey} cannot exceed ${maxLength} characters`);
      }
      value = newValue;
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
}

// Using decorator with parameters
class User {
  @validate(50)
  name: string = "John";

  @validate(100)
  bio: string = "Developer";
}

const user = new User();
user.name = "Alice"; // OK
// user.name = "A".repeat(60); // Error: name cannot exceed 50 characters
```

### Benefits of Decorators:

✅ **Cross-cutting concerns** - Logging, validation, authentication
✅ **Reduce boilerplate** - Don't repeat code
✅ **Cleaner code** - Separate concerns
✅ **Metadata** - Add information to classes/methods
✅ **Easier testing** - Mock decorators in tests

### Common Use Cases:

1. **Logging** - Track method calls
2. **Caching** - Cache method results
3. **Validation** - Validate inputs
4. **Authentication** - Check permissions
5. **Error Handling** - Wrap in try-catch
6. **Performance** - Measure execution time
7. **API Documentation** - Mark endpoints

---

## 46. What are the different types of decorators?

**Answer:**

TypeScript supports **five types of decorators**, each applied to different targets:

### 1. **Class Decorators**

Applied to the class constructor.

```typescript
// Class decorator signature
function decorator(constructor: Function): void | Function {
  // Modify constructor or return new one
}

// Real example - Make class frozen
function frozen(constructor: Function) {
  Object.freeze(constructor);
  Object.freeze(constructor.prototype);
}

@frozen
class ImmutableClass {
  name = "Test";
}

// Cannot modify the class
// ImmutableClass.name = "Modified"; // Error

// Real example - Add metadata
function Component(metadata: any) {
  return function(constructor: Function) {
    (constructor as any).metadata = metadata;
  };
}

@Component({ selector: "app-root", template: "<div>Hello</div>" })
class AppComponent {}
```

### 2. **Method Decorators**

Applied to methods in a class.

```typescript
// Method decorator signature
function decorator(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor | void {
  // Modify the method
}

// Real example - Time tracking
function timed(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args: any[]) {
    const start = performance.now();
  
    const result = originalMethod.apply(this, args);
  
    const end = performance.now();
    console.log(`${propertyKey} took ${end - start}ms`);
  
    return result;
  };

  return descriptor;
}

class DataProcessor {
  @timed
  processLargeData(data: any[]): number {
    // Simulate processing
    return data.length;
  }
}
```

### 3. **Property Decorators**

Applied to class properties.

```typescript
// Property decorator signature
function decorator(target: any, propertyKey: string): void {
  // Modify property
}

// Real example - Make property readonly
function readonly(target: any, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    writable: false
  });
}

class Person {
  @readonly
  name = "John";
}

const person = new Person();
// person.name = "Jane"; // Error: Cannot assign to readonly property
```

### 4. **Accessor Decorators**

Applied to getter/setter methods.

```typescript
// Accessor decorator signature
function decorator(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor | void {
  // Modify getter/setter
}

// Real example - Add logging to getter/setter
function logged(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const getter = descriptor.get;
  const setter = descriptor.set;

  descriptor.get = function() {
    console.log(`Getting ${propertyKey}`);
    return getter?.call(this);
  };

  descriptor.set = function(value: any) {
    console.log(`Setting ${propertyKey} to ${value}`);
    setter?.call(this, value);
  };

  return descriptor;
}

class Temperature {
  private _celsius: number = 0;

  @logged
  get celsius(): number {
    return this._celsius;
  }

  @logged
  set celsius(value: number) {
    this._celsius = value;
  }
}
```

### 5. **Parameter Decorators**

Applied to method parameters.

```typescript
// Parameter decorator signature
function decorator(
  target: any,
  propertyKey: string,
  parameterIndex: number
): void {
  // Collect metadata about parameter
}

// Real example - Mark which parameters are validated
function required(target: any, propertyKey: string, parameterIndex: number) {
  const existingMetadata = Reflect.getOwnMetadata("required", target, propertyKey) || [];
  existingMetadata.push(parameterIndex);
  Reflect.defineMetadata("required", existingMetadata, target, propertyKey);
}

class UserService {
  createUser(
    @required name: string,
    @required email: string,
    bio?: string
  ) {
    // Validate that name and email are provided
  }
}
```

### Comparing All Five Types:

```typescript
// Decorator types summary
@classDecorator
class Example {
  @propertyDecorator
  myProperty: string;

  @propertyDecorator
  myValue = "test";

  @methodDecorator
  myMethod() {}

  @accessorDecorator
  get myAccessor() {
    return "value";
  }

  @accessorDecorator
  set myAccessor(value: string) {}

  myComplexMethod(
    @parameterDecorator arg1: string,
    @parameterDecorator arg2: number
  ) {}
}
```

### Execution Order:

When multiple decorators are on one member, they execute **from bottom to top**:

```typescript
function first() {
  console.log("first(): factory");
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    console.log("first(): called");
  };
}

function second() {
  console.log("second(): factory");
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    console.log("second(): called");
  };
}

class Test {
  @first()
  @second()
  method() {}
}

// Output:
// first(): factory
// second(): factory
// second(): called
// first(): called
```

---

## 47. How do you create custom decorators?

**Answer:**

Custom decorators are functions that follow specific signatures. They can be simple or be decorator factories (functions returning decorators).

### Simple Decorator (No Parameters):

```typescript
// Simple logger decorator
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${propertyKey}`);
    const result = originalMethod.apply(this, args);
    console.log(`${propertyKey} completed`);
    return result;
  };

  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(5, 3);
// Logs:
// Calling add
// add completed
```

### Decorator Factory (With Parameters):

```typescript
// Decorator factory with parameters
function timeout(ms: number) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function(...args: any[]) {
      return Promise.race([
        originalMethod.apply(this, args),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
        )
      ]);
    };

    return descriptor;
  };
}

class ApiService {
  @timeout(5000)
  async fetchData(): Promise<string> {
    // Simulate API call
    return "data";
  }
}
```

### Property Decorator - Validation:

```typescript
function required(target: any, propertyKey: string) {
  let value: any;

  const getter = () => {
    if (value === undefined) {
      throw new Error(`${propertyKey} is required`);
    }
    return value;
  };

  const setter = (newValue: any) => {
    if (newValue === undefined || newValue === null) {
      throw new Error(`${propertyKey} cannot be null or undefined`);
    }
    value = newValue;
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  });
}

class User {
  @required
  username: string;

  @required
  email: string;
}

const user = new User();
// user.username = undefined; // Error: username cannot be null or undefined
```

### Method Decorator - Caching:

```typescript
function cache(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const cacheMap = new Map();

  descriptor.value = function(...args: any[]) {
    const cacheKey = JSON.stringify(args);

    if (cacheMap.has(cacheKey)) {
      console.log(`Returning cached result for ${propertyKey}`);
      return cacheMap.get(cacheKey);
    }

    const result = originalMethod.apply(this, args);
    cacheMap.set(cacheKey, result);

    return result;
  };

  return descriptor;
}

class MathService {
  @cache
  fibonacci(n: number): number {
    if (n <= 1) return n;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }
}
```

### Class Decorator - Component:

```typescript
function component(options: { selector: string; template: string }) {
  return function(constructor: Function) {
    console.log(`Creating component with selector: ${options.selector}`);
  
    // Attach metadata
    (constructor as any).selector = options.selector;
    (constructor as any).template = options.template;
  
    // Could also modify the class
    const originalInit = constructor.prototype.constructor;
  
    constructor.prototype.constructor = function(...args: any[]) {
      originalInit.apply(this, args);
      console.log(`${options.selector} initialized`);
    };
  };
}

@component({
  selector: "app-root",
  template: "<div>Hello</div>"
})
class AppComponent {
  constructor() {
    console.log("AppComponent constructor");
  }
}
```

### Complex Decorator - Authorization:

```typescript
function authorize(requiredRole: string) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(context: { user: { role: string } }, ...args: any[]) {
      if (context.user.role !== requiredRole) {
        throw new Error(`Requires ${requiredRole} role`);
      }

      return originalMethod.apply(this, [context, ...args]);
    };

    return descriptor;
  };
}

class AdminService {
  @authorize("admin")
  deleteUser(context: any, userId: number): void {
    console.log(`Deleting user ${userId}`);
  }
}
```

### Real-World Example - Validation Decorator:

```typescript
interface ValidationRule {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  required?: boolean;
}

function validate(rules: ValidationRule) {
  return function(target: any, propertyKey: string) {
    let value: any;

    const getter = () => value;

    const setter = (newValue: any) => {
      // Required check
      if (rules.required && (newValue === undefined || newValue === null)) {
        throw new Error(`${propertyKey} is required`);
      }

      // Min length check
      if (rules.minLength && newValue.length < rules.minLength) {
        throw new Error(
          `${propertyKey} must be at least ${rules.minLength} characters`
        );
      }

      // Max length check
      if (rules.maxLength && newValue.length > rules.maxLength) {
        throw new Error(
          `${propertyKey} cannot exceed ${rules.maxLength} characters`
        );
      }

      // Pattern check
      if (rules.pattern && !rules.pattern.test(newValue)) {
        throw new Error(`${propertyKey} format is invalid`);
      }

      value = newValue;
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
}

class SignUpForm {
  @validate({
    required: true,
    minLength: 3,
    maxLength: 50
  })
  username: string;

  @validate({
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  })
  email: string;

  @validate({
    required: true,
    minLength: 8
  })
  password: string;
}

const form = new SignUpForm();
form.username = "john_doe"; // OK
form.email = "john@example.com"; // OK
// form.username = "ab"; // Error: must be at least 3 characters
// form.email = "invalid"; // Error: format is invalid
```

---

## Complete Summary of Q42-Q47

You now understand:

✅ **Modules** - File-based organization with import/export
✅ **Modules vs Namespaces** - Modern vs legacy approaches
✅ **Import/Export patterns** - Named, default, re-export, type-only
✅ **Decorators** - Add annotations and modify behavior
✅ **Types of decorators** - Class, method, property, accessor, parameter
✅ **Custom decorators** - Create your own with parameters

**These intermediate TypeScript features enable scalable, maintainable code!** 💪
