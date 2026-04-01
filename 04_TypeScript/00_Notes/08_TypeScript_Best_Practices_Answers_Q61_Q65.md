# TypeScript Interview Questions (Q61-Q65 Detailed Answers)

## SECTION 7: BEST PRACTICES & ADVANCED PATTERNS

## 61. When should you use 'interface' vs 'type'?

**Answer:**

Both `interface` and `type` can define object shapes, but they have different capabilities and use cases. Modern TypeScript allows most things with both, but practical differences exist.

### Simple Analogy:

- **interface** = Like a class blueprint (can be inherited, merged)
- **type** = Like a label for any shape (more flexible, composable)

### Comparison Table:

| Feature | Interface | Type |
|---------|-----------|------|
| **Object shapes** | ✅ Best | ✅ Yes |
| **Inheritance** | ✅ extends | ✅ & (intersection) |
| **Union types** | ❌ No | ✅ Yes |
| **Primitives** | ❌ No | ✅ Yes |
| **Declaration merging** | ✅ Yes | ❌ No |
| **Mapped types** | ❌ No | ✅ Yes |
| **Conditional types** | ❌ No | ✅ Yes |
| **Performance** | ✅ Slightly better | ✅ Fine |
| **Error messages** | ✅ Clearer | ⚠️ Complex |

### Real Example - When to Use Interface:

```typescript
// ✅ USE INTERFACE for object contracts
interface User {
  id: number;
  name: string;
  email: string;
}

// ✅ INTERFACE for class implementations
interface Animal {
  name: string;
  speak(): void;
}

class Dog implements Animal {
  name = "Buddy";
  speak() {
    console.log("Woof!");
  }
}

// ✅ INTERFACE for inheritance
interface Admin extends User {
  permissions: string[];
}

// ✅ INTERFACE allows declaration merging
interface Window {
  myCustomMethod(): void;
}

interface Window {
  myOtherMethod(): void;
}
// Window now has both methods!
```

### Real Example - When to Use Type:

```typescript
// ✅ USE TYPE for unions
type Status = "pending" | "approved" | "rejected";

// ✅ USE TYPE for intersections
type Person = { name: string };
type Employee = Person & { employeeId: number };

// ✅ USE TYPE for primitives
type ID = string | number;

// ✅ USE TYPE for tuples
type Coordinate = [number, number];

// ✅ USE TYPE for function signatures
type Callback = (data: string) => void;

// ✅ USE TYPE for complex transformations
type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};

// ✅ USE TYPE for conditional logic
type NonNullable<T> = T extends null | undefined ? never : T;

// ✅ USE TYPE for template literals
type EventHandler = `on${Capitalize<"click">}`; // "onClick"
```

### Decision Tree:

```
Do you need unions, primitives, or mapped types?
  ├─ YES → Use TYPE
  └─ NO
    ├─ Do you want class implementation or declaration merging?
    │   ├─ YES → Use INTERFACE
    │   └─ NO → Use TYPE (more modern, flexible)
```

### Practical Recommendation:

```typescript
// RECOMMENDATION: Use INTERFACE for object shapes
// - More intuitive for most developers
// - Better for class implementations
// - Clearer intent

interface UserProfile {
  id: number;
  name: string;
  email: string;
}

// RECOMMENDATION: Use TYPE for everything else
// - More flexible (unions, intersections, etc.)
// - More modern TypeScript
// - Can do everything interface does (mostly)

type ApiResponse<T> = {
  data: T;
  status: number;
  error?: string;
};

// RECOMMENDATION: Mix both as needed
// Don't force one style everywhere
```

### Real-World Example - E-commerce:

```typescript
// INTERFACE for domain models (should be stable)
interface Product {
  id: string;
  name: string;
  price: number;
  inventory: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
}

// TYPE for unions and responses
type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

type OrderResponse = 
  | { success: true; order: Order }
  | { success: false; error: string };

// TYPE for API utilities
type ApiHandler<T> = (data: T) => Promise<void>;

// INTERFACE for class-based services
interface OrderService {
  createOrder(items: OrderItem[]): Promise<Order>;
  getOrder(id: string): Promise<Order | null>;
  cancelOrder(id: string): Promise<void>;
}

class OrderServiceImpl implements OrderService {
  // ... implementation
}
```

---

## 62. How do you avoid using 'any' type?

**Answer:**

The `any` type defeats TypeScript's purpose by disabling all type checking. Here are strategies to avoid it completely.

### Simple Analogy:

Using `any` is like **turning off your seatbelt while driving**:
- Without `any`: Protected and safe
- With `any`: Exposed to runtime crashes

### Strategy 1: Use `unknown` Instead of `any`

```typescript
// ❌ BAD - disables all type checking
function processBad(data: any) {
  return data.toUpperCase(); // No error, but might crash!
}

processBad(123); // Crash at runtime: number has no toUpperCase

// ✅ GOOD - forces type checking
function processGood(data: unknown) {
  if (typeof data === "string") {
    return data.toUpperCase(); // Type-safe!
  }
  throw new Error("Expected string");
}

processGood(123); // Error caught before running
```

### Strategy 2: Use Generics for Reusable Functions

```typescript
// ❌ BAD
function wrapInArrayBad(value: any): any[] {
  return [value];
}

const result1 = wrapInArrayBad("hello"); // type: any[]
const result2 = wrapInArrayBad(42); // type: any[]
// Type information lost

// ✅ GOOD
function wrapInArrayGood<T>(value: T): T[] {
  return [value];
}

const result1 = wrapInArrayGood("hello"); // type: string[]
const result2 = wrapInArrayGood(42); // type: number[]
// Type information preserved
```

### Strategy 3: Use Union Types for Multiple Possibilities

```typescript
// ❌ BAD
function formatBad(value: any): string {
  return String(value);
}

// ✅ GOOD
function formatGood(value: string | number | boolean): string {
  return String(value);
}

formatGood("text"); // OK
formatGood(42); // OK
formatGood(true); // OK
// formatGood({}); // Error - not in union
```

### Strategy 4: Proper Typing for External Data

```typescript
// ❌ BAD
async function fetchUserBad(id: number): Promise<any> {
  const response = await fetch(`/api/users/${id}`);
  return response.json(); // Could be anything!
}

const user = await fetchUserBad(1);
console.log(user.name); // What if it's not there?

// ✅ GOOD
interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUserGood(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  
  // Validate structure (production code)
  if (!data.id || !data.name || !data.email) {
    throw new Error("Invalid user data");
  }
  
  return data as User;
}

const user = await fetchUserGood(1);
console.log(user.name); // TypeScript knows it exists
```

### Strategy 5: Use Index Signatures for Dynamic Objects

```typescript
// ❌ BAD
const configBad: any = {
  host: "localhost",
  port: 3000,
  timeout: 5000
};

// ✅ GOOD - Structured but flexible
const configGood: Record<string, string | number> = {
  host: "localhost",
  port: 3000,
  timeout: 5000
};

// ✅ EVEN BETTER - Type-specific
interface AppConfig {
  host: string;
  port: number;
  timeout: number;
  [key: string]: string | number; // Allow additional properties
}

const config: AppConfig = {
  host: "localhost",
  port: 3000,
  timeout: 5000,
  customOption: "value"
};
```

### Strategy 6: Use Type Guards and Narrowing

```typescript
// ❌ BAD - using any
function processDataBad(value: any) {
  if (value.type === "string") {
    return value.data.toUpperCase(); // might crash
  }
}

// ✅ GOOD - proper narrowing
function processDataGood(value: unknown) {
  if (
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    (value as any).type === "string" &&
    "data" in value &&
    typeof (value as any).data === "string"
  ) {
    return (value as any).data.toUpperCase();
  }
  throw new Error("Invalid data");
}
```

### Strategy 7: Create Type Guards for Complex Objects

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Type predicate function
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "name" in obj &&
    "email" in obj &&
    typeof (obj as any).id === "number" &&
    typeof (obj as any).name === "string" &&
    typeof (obj as any).email === "string"
  );
}

// Use it
function handleData(data: unknown) {
  if (isUser(data)) {
    console.log(data.name); // Type-safe, no any needed
  }
}

// API response handling
async function fetchUsers() {
  const response = await fetch("/api/users");
  const data = await response.json();
  
  if (Array.isArray(data) && data.every(isUser)) {
    return data; // typed as User[]
  }
  
  throw new Error("Invalid response");
}
```

### Strategy 8: Enable Strict Mode

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,           // Enable all strict checks
    "noImplicitAny": true,    // Error on implicit any
    "strictNullChecks": true, // Strict null/undefined
    "noUnusedLocals": true,   // Error on unused variables
    "noUnusedParameters": true // Error on unused parameters
  }
}
```

### Real-World Example - API Response Handling:

```typescript
// ❌ BAD - Using any everywhere
function handleApiResponse(response: any) {
  if (response.success) {
    console.log(response.data.users[0].name);
  }
}

// ✅ GOOD - Type-safe
interface User {
  id: number;
  name: string;
}

interface SuccessResponse<T> {
  success: true;
  data: {
    users: T[];
  };
}

interface ErrorResponse {
  success: false;
  error: string;
}

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

function handleApiResponse(response: ApiResponse<User>) {
  if (response.success) {
    console.log(response.data.users[0].name); // Type-safe!
  }
}
```

---

## 63. What are some common TypeScript pitfalls?

**Answer:**

Common mistakes developers make when using TypeScript and how to avoid them.

### Pitfall 1: Using `any` to Bypass Type Checking

```typescript
// ❌ WRONG
const data: any = fetchFromApi();
data.nonexistent.property.access(); // No error, crashes at runtime

// ✅ CORRECT
interface ApiData {
  field: string;
}

const data: ApiData = fetchFromApi();
// data.nonexistent // Error caught by TypeScript
```

### Pitfall 2: Forgetting About Null/Undefined

```typescript
// ❌ WRONG - assuming value exists
function getName(user: User | null) {
  return user.name; // Runtime crash if user is null
}

// ✅ CORRECT - handle null case
function getName(user: User | null) {
  if (!user) {
    return "Unknown";
  }
  return user.name;
}

// Or using optional chaining
function getNameOptional(user: User | null) {
  return user?.name ?? "Unknown";
}
```

### Pitfall 3: Type Assertions Without Validation

```typescript
// ❌ WRONG - blind assertion
const user = JSON.parse(userJson) as User;
// Data might not match User type at runtime!

// ✅ CORRECT - validate first
function parseUser(userJson: string): User {
  const data = JSON.parse(userJson);
  
  if (!isUser(data)) {
    throw new Error("Invalid user data");
  }
  
  return data;
}

function isUser(obj: any): obj is User {
  return obj.id && obj.name && obj.email;
}
```

### Pitfall 4: Mutating `readonly` Properties

```typescript
// ❌ WRONG - bypassing readonly
interface Config {
  readonly apiKey: string;
}

const config: Config = { apiKey: "secret" };
(config as any).apiKey = "compromised"; // Can bypass!

// ✅ CORRECT - respect readonly
interface Config {
  readonly apiKey: string;
}

const config: Config = { apiKey: "secret" };
// Can't modify, must create new object
const newConfig = { ...config, apiKey: "new" };
```

### Pitfall 5: Forgetting Interfaces Are Compile-Time Only

```typescript
// ❌ WRONG - instanceof doesn't work with interfaces
interface Product {
  id: number;
  name: string;
}

function handleItem(item: any) {
  // if (item instanceof Product) {} // Error! No runtime class
}

// ✅ CORRECT - use type guards
function isProduct(obj: any): obj is Product {
  return obj.id && obj.name;
}

function handleItem(item: any) {
  if (isProduct(item)) {
    // item is Product here
  }
}
```

### Pitfall 6: Not Understanding Type Widening

```typescript
// ❌ WRONG - type too wide
let status = "pending"; // type: string
// Can be any string, but you only want specific values
status = "random"; // Allowed!

// ✅ CORRECT - use literal type
let statusGood: "pending" | "approved" | "rejected" = "pending";
// statusGood = "random"; // Error!

// Or use const
const statusConst = "pending" as const; // type: "pending"
```

### Pitfall 7: Circular Dependencies

```typescript
// ❌ WRONG - circular imports cause issues
// typeA.ts
import { TypeB } from "./typeB"; // typeB imports typeA!

// ✅ CORRECT - organize in separate index
// types/index.ts
export * from "./typeA";
export * from "./typeB";

// Other files import from types/index
import { TypeA, TypeB } from "@types";
```

### Pitfall 8: Over-Complicated Type Utility

```typescript
// ❌ WRONG - complex recursive type
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

// Slows down IDE and compiler

// ✅ CORRECT - simpler or built-in utilities
type SimplePartial = Partial<User>;

// Use complex utilities only when necessary
```

### Pitfall 9: Inconsistent Error Handling

```typescript
// ❌ WRONG - no error handling
async function fetchData() {
  const response = await fetch("/api/data");
  return response.json(); // Might throw!
}

// ✅ CORRECT - proper error handling
async function fetchDataSafe() {
  try {
    const response = await fetch("/api/data");
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Fetch error:", error.message);
    }
    throw error;
  }
}
```

### Pitfall 10: Ignoring TypeScript Warnings

```typescript
// ❌ WRONG - ignoring strict mode
// tsconfig.json
{
  "compilerOptions": {
    "noUnusedLocals": false,     // Ignoring unused variables
    "noUnusedParameters": false, // Ignoring unused parameters
    "noImplicitAny": false       // Allowing implicit any
  }
}

// ✅ CORRECT - enable all strict checks
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitAny": true
  }
}
```

### Summary Table of Pitfalls:

| Pitfall | Wrong | Right |
|---------|-------|-------|
| Using `any` | `value: any` | `value: unknown` or specific type |
| Null/undefined | `user.name` | `user?.name ?? default` |
| Type assertion | `as Type` (no check) | Validate first, then assert |
| `readonly` bypass | `(obj as any).prop = x` | Create new object with spread |
| Interface instanceof | `instanceof Interface` | Use type guard function |
| Wide types | `let x = "value"` | `let x: "value"` or `as const` |
| Circular deps | Import A from B, B from A | Use barrel exports |
| Complex types | Overly recursive types | Keep simple, use built-ins |
| No error handling | Ignore errors | Try-catch, type narrowing |
| Ignore warnings | Disable strict mode | Enable strict mode |

---

## 64. How do you structure large TypeScript projects?

**Answer:**

Best practices for organizing large TypeScript codebases for maintainability and scalability.

### Recommended Folder Structure:

```
project-root/
├── src/
│   ├── components/                  # UI components (if React)
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.types.ts
│   │   │   ├── Button.test.ts
│   │   │   └── index.ts
│   │   └── index.ts                # Barrel export
│   │
│   ├── features/                    # Feature modules
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── types.ts
│   │   │   └── index.ts            # Public API
│   │   ├── users/
│   │   │   └── ...
│   │   └── index.ts
│   │
│   ├── services/                    # Business logic
│   │   ├── api.ts
│   │   ├── userService.ts
│   │   ├── authService.ts
│   │   └── index.ts
│   │
│   ├── hooks/                       # Reusable hooks (React)
│   │   ├── useAuth.ts
│   │   ├── useLocalStorage.ts
│   │   └── index.ts
│   │
│   ├── types/                       # Shared type definitions
│   │   ├── models.ts
│   │   ├── api.ts
│   │   ├── common.ts
│   │   └── index.ts
│   │
│   ├── utils/                       # Utility functions
│   │   ├── formatting.ts
│   │   ├── validation.ts
│   │   ├── helpers.ts
│   │   └── index.ts
│   │
│   ├── constants/                   # Constants
│   │   ├── env.ts
│   │   └── config.ts
│   │
│   ├── App.tsx
│   └── index.tsx
│
├── tests/                           # Test files
│   ├── setup.ts
│   ├── mocks/
│   └── factories/
│
├── types/                           # Global type declarations
│   └── global.d.ts
│
├── tsconfig.json
├── tsconfig.build.json              # For production builds
└── package.json
```

### Example: Using Barrel Exports

```typescript
// components/Button/index.ts - Barrel export
export { Button } from "./Button";
export type { ButtonProps } from "./Button.types";

// Usage - clean import
import { Button, ButtonProps } from "@components/Button";

// Instead of
import { Button } from "@components/Button/Button";
import { ButtonProps } from "@components/Button/Button.types";
```

### Example: Path Aliases

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@components/*": ["components/*"],
      "@features/*": ["features/*"],
      "@services/*": ["services/*"],
      "@hooks/*": ["hooks/*"],
      "@types/*": ["types/*"],
      "@utils/*": ["utils/*"],
      "@constants/*": ["constants/*"]
    }
  }
}

// Clean imports
import { Button } from "@components/Button";
import { useAuth } from "@hooks/useAuth";
import type { User } from "@types/models";
import { formatDate } from "@utils/formatting";
```

### Example: Feature-Based Structure (Large Apps)

```
features/
├── auth/
│   ├── components/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useLogin.ts
│   │   └── index.ts
│   ├── services/
│   │   ├── authService.ts
│   │   └── index.ts
│   ├── types.ts
│   └── index.ts            # Public API - controls what others can use
│
└── users/
    ├── components/
    ├── hooks/
    ├── services/
    ├── types.ts
    └── index.ts
```

### Example: Feature `index.ts` (Public API)

```typescript
// features/auth/index.ts - Controls what's exported from feature
export { LoginForm, RegisterForm } from "./components";
export { useAuth, useLogin } from "./hooks";
export type { AuthState, LoginCredentials } from "./types";

// features/auth/services/index.ts - NOT exported to public
// Keeps service implementations private
```

### Best Practices:

**1. Keep Modules Focused**
```typescript
// ✅ GOOD - One responsibility
// features/users/services/userService.ts
export class UserService {
  async getUser(id: string): Promise<User> { }
  async updateUser(id: string, data: Partial<User>): Promise<User> { }
  async deleteUser(id: string): Promise<void> { }
}

// ❌ BAD - Too many responsibilities
class MegaService {
  // User operations
  // Auth operations
  // Payment operations
  // Notification operations
  // ... everything!
}
```

**2. Use Barrel Exports**
```typescript
// ✅ GOOD - Clean import
import { formatDate, formatCurrency } from "@utils";

// ❌ BAD - Verbose import
import { formatDate } from "@utils/formatting";
import { formatCurrency } from "@utils/formatting/currency";
```

**3. Separate Types from Implementation**
```typescript
// ✅ GOOD - Types isolated
// types/models.ts
export interface User { }
export interface Post { }

// services/userService.ts
import type { User } from "@types/models";
export class UserService { }

// ❌ BAD - Mixed
// services/userService.ts
export interface User { }
export class UserService { }
```

**4. Avoid Deep Nesting**
```typescript
// ✅ GOOD - 2-3 levels deep
features/auth/components/

// ❌ BAD - Too deep
features/auth/components/forms/login/containers/

// Use flatter structure instead
features/auth/components/LoginForm/
```

---

## 65. What are the performance considerations in TypeScript?

**Answer:**

TypeScript is compile-time only, so it doesn't affect runtime performance. However, compilation speed and development experience matter significantly.

### Compilation Performance Optimization:

**1. Enable Incremental Compilation**

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "incremental": true,            // Only recompile changed files
    "tsBuildInfoFile": ".tsbuildinfo" // Store build info
  }
}
```

**Before incremental:** 5000ms (recompile everything)  
**After incremental:** 200ms (only changed files)

**2. Use Project References for Monorepos**

```typescript
// tsconfig.json (root)
{
  "references": [
    { "path": "./packages/api" },
    { "path": "./packages/ui" },
    { "path": "./packages/utils" }
  ]
}

// packages/api/tsconfig.json
{
  "compilerOptions": {
    "composite": true,      // Enable for project refs
    "outDir": "./dist"
  }
}
```

**3. Skip Library Type Checking**

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "skipLibCheck": true  // Don't check @types files
  }
}
```

**Compilation time:** -30-50%

**4. Exclude Large Directories**

```typescript
// tsconfig.json
{
  "include": ["src/**/*"],
  "exclude": [
    "node_modules",
    "dist",
    "build",
    "**/*.test.ts",
    "**/*.spec.ts"
  ]
}
```

### Type Checking Performance:

**1. Avoid Overly Complex Types**

```typescript
// ❌ BAD - Complex recursive type (slow)
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object
    ? DeepPartial<T[K]>
    : T[K];
};

// ✅ GOOD - Simpler approach
type SimplePartial = Partial<User>;

// Or only use complex types when needed
```

**2. Avoid Large Unions**

```typescript
// ❌ BAD - 100+ items (slow IDE)
type AllEvents = 
  | "click" | "hover" | "scroll" | "load" 
  | ... // 100 more events

// ✅ GOOD - Organize into groups
type MouseEvents = "click" | "dblclick" | "mousedown";
type KeyEvents = "keydown" | "keyup" | "keypress";
type AllEvents = MouseEvents | KeyEvents;
```

**3. Be Careful with Mapped Types**

```typescript
// ❌ BAD - Expensive operation
type AllKeys<T> = {
  [K in keyof T]: {
    [K2 in keyof T]: T[K2]
  }
};

// ✅ GOOD - Simpler mapping
type ReadonlyT<T> = {
  readonly [K in keyof T]: T[K];
};
```

### Bundle Size:

**1. Use `const` Enums**

```typescript
// ❌ BAD - generates runtime code
enum Direction {
  Up,
  Down,
  Left,
  Right
}

// Compiled to:
// var Direction;
// (function(Direction) {
//   Direction[Direction["Up"] = 0] = "Up";
//   // ... more code ...
// })(Direction || (Direction = {}));

// ✅ GOOD - no runtime code
const enum ConstDirection {
  Up,
  Down,
  Left,
  Right
}

let dir = ConstDirection.Up;
// Compiled to: let dir = 0;
```

**2. Use Type-Only Imports**

```typescript
// ❌ BAD - might include in bundle
import { User } from "./types";

// ✅ GOOD - removed at compile time
import type { User } from "./types";

// Or mixed
import { createUser } from "./types"; // Value import
import type { User } from "./types";  // Type import
```

### Development Experience:

**1. Use Watch Mode**

```json
{
  "scripts": {
    "dev": "tsc --watch",
    "build": "tsc"
  }
}
```

**2. Use Faster Alternatives for Development**

```bash
# Install ts-node and nodemon
npm install -D ts-node nodemon

# package.json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/index.ts"
  }
}
```

**3. Use IDE with Good TypeScript Support**

- **VS Code** - Best support, fastest
- **WebStorm** - Good but slower on large projects
- **Vim/Neovim** - Use with TypeScript plugins

### Profiling Compilation:

```bash
# See detailed compilation metrics
tsc --diagnostics

# Output shows:
# Files: 150
# Lines: 45000
# Nodes: 500000
# Identifiers: 50000
# Symbols: 40000
# Types: 30000
# Memory: 150 MB
# Time: 2500 ms
```

### Real-World Performance Comparison:

| Optimization | Before | After | Improvement |
|--------------|--------|-------|-------------|
| No incremental | 5000ms | 200ms | 96% faster |
| skipLibCheck | 3000ms | 2000ms | 33% faster |
| Project refs | 8000ms | 2000ms | 75% faster |
| const enums | 100KB | 80KB | 20% smaller |
| Type imports | 150KB | 140KB | 7% smaller |

### Complete Optimized `tsconfig.json`:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    // === PERFORMANCE ===
    "incremental": true,
    "tsBuildInfoFile": ".tsbuildinfo",
    "skipLibCheck": true,
    "isolatedModules": true,
    
    // === LANGUAGE ===
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "moduleResolution": "node",
    
    // === EMIT ===
    "outDir": "./dist",
    "rootDir": "./src",
    "sourceMap": true,
    "declaration": true,
    "removeComments": true,
    
    // === STRICT ===
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    
    // === OTHER ===
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.spec.ts"]
}
```

---

## Complete Summary of Q61-Q65

You now understand:

✅ **Interface vs Type** - When to use each pattern  
✅ **Avoiding `any`** - Strategies for type safety  
✅ **Common pitfalls** - What to avoid and why  
✅ **Project structure** - How to organize large codebases  
✅ **Performance** - Compilation and bundle size optimization  

**Congratulations! You've mastered TypeScript fundamentals through advanced practices!** 🎉
