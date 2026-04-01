# TypeScript Interview Questions (Q48-Q60 Detailed Answers)

## SECTION 6: TYPE ASSERTIONS & TYPE GUARDS (CONTINUED)

## 48. What is type assertion?

**Answer:**

**Type assertion** tells the TypeScript compiler to treat a value as a specific type. It does NOT change the runtime value - only the compile-time type.

### Simple Analogy:

Think of type assertion like **telling a teacher what grade you think you deserve** - the teacher accepts your claim without actually changing your score, but they'll grade based on that assumption.

### Syntax:

```typescript
// Syntax 1: 'as' keyword (recommended)
value as Type

// Syntax 2: Angle bracket (not for JSX/TSX)
<Type>value
```

### Real Examples:

```typescript
// Example 1: From unknown to specific type
let someValue: unknown = "hello";

// Without assertion (error)
// const length = someValue.length; // Error: Object is of type 'unknown'

// With assertion
const length = (someValue as string).length; // OK - treated as string

// Example 2: DOM elements
const element = document.getElementById("app");
// element is HTMLElement | null

// Narrow to specific element type
const divElement = element as HTMLDivElement;
divElement.className = "my-class"; // HTMLDivElement-specific property

// Example 3: Narrowing union types
type Status = string | number;

function handleStatus(status: Status): void {
  if (typeof status === "string") {
    const upper = (status as string).toUpperCase();
    console.log(upper);
  }
}

// Example 4: From API response
interface User {
  id: number;
  name: string;
}

const apiResponse: any = { id: 1, name: "Alice" };
const user = apiResponse as User; // Assert shape
```

### When to Use Type Assertion:

✅ **Converting from `any` or `unknown`** - When you know more than TypeScript  
✅ **DOM elements** - Getting specific element types  
✅ **Third-party libraries** - When types aren't available  
✅ **After validation** - After runtime checks confirm the type  

### When NOT to Use (Dangers):

❌ **Without validation** - Assertion doesn't check, it just claims  
❌ **Avoiding proper typing** - Use better types instead  
❌ **Chaining assertions** - `value as unknown as Type` is dangerous  

### Real-World Warning:

```typescript
// ❌ DANGEROUS - No runtime check
const num = ("123" as any) as number; // Compiler believes it's number
console.log(num + 5); // But it's still a string at runtime!
// Result: "1235" (string concatenation, not math)

// ✅ SAFE - With validation
function toNumber(value: string): number {
  const num = Number(value);
  if (isNaN(num)) {
    throw new Error("Invalid number");
  }
  return num;
}

const result = toNumber("123");
console.log(result + 5); // 128 (correct)
```

---

## 49. What is the difference between 'as' and angle bracket syntax?

**Answer:**

Both `as` and angle bracket syntax (`<Type>`) are type assertions, but they have different compatibility and use cases.

### Syntax Comparison:

```typescript
// 'as' syntax
value as Type

// Angle bracket syntax
<Type>value
```

### Key Differences:

| Aspect | `as` syntax | Angle bracket |
|--------|-----------|---|
| **Compatibility** | Works everywhere | Conflicts with JSX |
| **Readability** | More readable | Less clear (looks like generic) |
| **Recommended** | ✅ Modern standard | ❌ Legacy/avoided |
| **In .tsx files** | Works | Doesn't work (JSX ambiguity) |
| **Performance** | Same | Same |

### Real Examples:

```typescript
// Both work in .ts files
const value: unknown = "hello";

// Method 1: 'as' syntax (preferred)
const len1 = (value as string).length;

// Method 2: Angle bracket (less used)
const len2 = (<string>value).length;

// Both compile to same JavaScript
// const len1 = value.length;
// const len2 = value.length;
```

### In JSX/TSX Files (Only 'as' works):

```typescript
// ❌ ERROR in .tsx file - JSX syntax conflict
// const element = (<div>Hello</div>); // Could be JSX or assertion?
// const len = (<string>value).length; // Ambiguous!

// ✅ CORRECT - Use 'as' in JSX
const element = <div>Hello</div>; // Clearly JSX
const len = (value as string).length; // Clearly type assertion

// React component example
const MyComponent = () => {
  const data = document.getElementById("data") as HTMLDivElement;
  const input = document.querySelector("input") as HTMLInputElement;
  
  return <div>{data.textContent}</div>;
};
```

### Why Angle Bracket is Problematic:

```typescript
// In .tsx files, this is ambiguous
<Type>value

// Is it:
// 1. Type assertion: (value as Type)
// 2. JSX element: <Type>...</Type>

// That's why TypeScript only allows 'as' syntax in TSX
```

### Best Practices:

✅ **Always use `as` syntax** - Works everywhere, clearer intent  
❌ **Avoid angle brackets** - Legacy, causes issues in JSX  

```typescript
// GOOD
const num = value as number;
const str = data as string;
const element = el as HTMLElement;

// BAD (don't do this)
const num2 = <number>value;
const str2 = <string>data;
const element2 = <HTMLElement>el;
```

---

## 50. What are user-defined type guards?

**Answer:**

**User-defined type guards** are functions that return a special boolean type called a **type predicate**. They let you encode runtime checks that TypeScript uses to narrow types.

### Type Predicate Syntax:

```typescript
function isType(value: unknown): value is SpecificType {
  // Return true if value is SpecificType
}
```

### Real Example - Discriminated Union:

```typescript
type Cat = { type: "cat"; meow: () => void };
type Dog = { type: "dog"; bark: () => void };
type Animal = Cat | Dog;

// Without type guard (need manual narrowing)
function soundWithoutGuard(animal: Animal): void {
  if (animal.type === "cat") {
    animal.meow();
  } else {
    animal.bark();
  }
}

// With type guard (more reusable)
function isCat(animal: Animal): animal is Cat {
  return animal.type === "cat";
}

function soundWithGuard(animal: Animal): void {
  if (isCat(animal)) {
    animal.meow(); // TypeScript knows it's Cat
  } else {
    animal.bark(); // TypeScript knows it's Dog
  }
}
```

### Real Example - Complex Object Validation:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

// Without type guard - tedious
function processWithoutGuard(data: unknown): void {
  if (
    typeof data === "object" &&
    data !== null &&
    typeof (data as any).id === "number" &&
    typeof (data as any).name === "string" &&
    typeof (data as any).email === "string"
  ) {
    // Still no type safety!
    console.log((data as any).name);
  }
}

// With type guard - clean and safe
function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as any).id === "number" &&
    typeof (value as any).name === "string" &&
    typeof (value as any).email === "string"
  );
}

function processWithGuard(data: unknown): void {
  if (isUser(data)) {
    // Now TypeScript knows data is User
    console.log(data.name); // No assertion needed
    console.log(data.age?.toString()); // Optional property works
  }
}
```

### Real Example - API Response:

```typescript
interface SuccessResponse {
  status: "success";
  data: { id: number; name: string };
}

interface ErrorResponse {
  status: "error";
  message: string;
}

type ApiResponse = SuccessResponse | ErrorResponse;

// Type guard function
function isSuccess(response: ApiResponse): response is SuccessResponse {
  return response.status === "success";
}

// Usage
function handleResponse(response: ApiResponse): void {
  if (isSuccess(response)) {
    console.log(response.data.name); // Safe - SuccessResponse
  } else {
    console.log(response.message); // Safe - ErrorResponse
  }
}
```

### Real Example - Array Type Guard:

```typescript
// Check if something is array of specific type
function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every((item) => typeof item === "string")
  );
}

function processStrings(data: unknown): void {
  if (isStringArray(data)) {
    // data is string[]
    data.forEach((str) => console.log(str.toUpperCase()));
  }
}

processStrings(["hello", "world"]); // Works
processStrings([1, 2, 3]); // Safely rejected
```

### Benefits of Type Guards:

✅ **Reusable** - Define once, use many times  
✅ **Type-safe** - After guard, TypeScript knows the type  
✅ **Readable** - Clearer intent than manual checks  
✅ **DRY** - Don't repeat validation logic  

---

## 51. What is the 'in' operator?

**Answer:**

The **`in` operator** checks if a property exists in an object. In TypeScript, it acts as a type guard that narrows union types based on property presence.

### Simple Syntax:

```typescript
"propertyName" in object
```

### Real Example - Discriminating Union Types:

```typescript
type Admin = {
  role: "admin";
  permissions: string[];
};

type User = {
  role: "user";
  favorites: string[];
};

type AnyUser = Admin | User;

// Without 'in' operator (manual check)
function printUserInfoWithout(user: AnyUser): void {
  if (user.role === "admin") {
    console.log("Permissions:", user.permissions); // Might error
  }
}

// With 'in' operator (type-safe)
function printUserInfoWith(user: AnyUser): void {
  if ("permissions" in user) {
    // TypeScript knows user is Admin here
    console.log("Permissions:", user.permissions);
  } else {
    // TypeScript knows user is User here
    console.log("Favorites:", user.favorites);
  }
}
```

### Real Example - Method Checking:

```typescript
type Drawable = {
  draw: () => void;
};

type Writable = {
  write: (text: string) => void;
};

type Shape = Drawable | Writable;

function process(shape: Shape): void {
  if ("draw" in shape) {
    shape.draw(); // Safe - has draw method
  } else if ("write" in shape) {
    shape.write("text"); // Safe - has write method
  }
}
```

### Real Example - Nested Objects:

```typescript
type Car = {
  wheels: 4;
  drive: () => void;
};

type Boat = {
  sails: 2;
  sail: () => void;
};

type Vehicle = Car | Boat;

function useVehicle(vehicle: Vehicle): void {
  if ("drive" in vehicle) {
    vehicle.drive(); // Car
  } else if ("sail" in vehicle) {
    vehicle.sail(); // Boat
  }
}
```

### Creating Custom Type Guard with 'in':

```typescript
function hasProperty<T, K extends PropertyKey>(
  obj: T,
  key: K
): obj is T & Record<K, unknown> {
  return key in obj;
}

const user = { name: "Alice", age: 30 };

if (hasProperty(user, "name")) {
  console.log(user.name); // Safe
}

// if (hasProperty(user, "email")) { // Type narrowing works
//   console.log(user.email); // Wouldn't compile - email doesn't exist
// }
```

### Combining Multiple Operators:

```typescript
interface Rectangle {
  width: number;
  height: number;
}

interface Circle {
  radius: number;
}

type Shape = Rectangle | Circle;

function getArea(shape: Shape): number {
  if ("radius" in shape) {
    // It's a Circle
    return Math.PI * shape.radius * shape.radius;
  } else if ("width" in shape && "height" in shape) {
    // It's a Rectangle
    return shape.width * shape.height;
  }
  // Unreachable - all cases covered
  const _exhaustive: never = shape;
  return _exhaustive;
}
```

---

## 52. What is the 'instanceof' operator?

**Answer:**

The **`instanceof` operator** checks if an object is an instance of a specific class or constructor function at runtime. In TypeScript, it narrows the type accordingly.

### Simple Syntax:

```typescript
value instanceof ClassName
```

### Real Example - Class Instances:

```typescript
class Animal {
  speak(): void {
    console.log("Some sound");
  }
}

class Dog extends Animal {
  bark(): void {
    console.log("Woof!");
  }
}

class Cat extends Animal {
  meow(): void {
    console.log("Meow!");
  }
}

function makeSound(animal: Animal | Dog | Cat): void {
  if (animal instanceof Dog) {
    // animal is Dog here
    animal.bark();
  } else if (animal instanceof Cat) {
    // animal is Cat here
    animal.meow();
  } else {
    // animal is Animal here
    animal.speak();
  }
}

const dog = new Dog();
makeSound(dog); // Logs: "Woof!"
```

### Real Example - Built-in Types:

```typescript
function formatValue(value: string | Date | number[]): string {
  if (value instanceof Date) {
    // value is Date
    return value.toISOString();
  } else if (value instanceof Array) {
    // value is number[]
    return value.join(", ");
  } else {
    // value is string
    return value.toUpperCase();
  }
}

formatValue(new Date()); // ISO format
formatValue([1, 2, 3]); // "1, 2, 3"
formatValue("hello"); // "HELLO"
```

### Real Example - Error Handling:

```typescript
function handleError(error: unknown): string {
  if (error instanceof TypeError) {
    return `Type error: ${error.message}`;
  } else if (error instanceof RangeError) {
    return `Range error: ${error.message}`;
  } else if (error instanceof Error) {
    return `Error: ${error.message}`;
  } else {
    return `Unknown error: ${String(error)}`;
  }
}

try {
  // Some code
} catch (e) {
  console.log(handleError(e));
}
```

### Important Limitations:

```typescript
// ❌ DOESN'T WORK with interfaces (no runtime representation)
interface User {
  id: number;
}

// const user: unknown = { id: 1 };
// if (user instanceof User) { } // Error: User not a constructor

// ✅ WORKS with classes
class UserModel {
  id: number;
  constructor(id: number) {
    this.id = id;
  }
}

const userModel: unknown = new UserModel(1);
if (userModel instanceof UserModel) {
  console.log(userModel.id); // Safe - type narrowed
}
```

### Real Example - Custom Error Classes:

```typescript
class NetworkError extends Error {
  statusCode?: number;
  constructor(message: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

class ValidationError extends Error {
  field: string;
  constructor(message: string, field: string) {
    super(message);
    this.field = field;
  }
}

function handleApiError(error: unknown): void {
  if (error instanceof NetworkError) {
    console.error(`Network error: ${error.message}`);
    if (error.statusCode) {
      console.error(`Status code: ${error.statusCode}`);
    }
  } else if (error instanceof ValidationError) {
    console.error(`Validation error in ${error.field}: ${error.message}`);
  } else if (error instanceof Error) {
    console.error(`Error: ${error.message}`);
  }
}

// Usage
try {
  throw new NetworkError("Connection failed", 500);
} catch (e) {
  handleApiError(e);
}
```

---

## SECTION 7: PRACTICAL TYPESCRIPT

## 53. How do you configure TypeScript (tsconfig.json)?

**Answer:**

**tsconfig.json** is the configuration file that tells the TypeScript compiler how to compile your project. It defines compiler options, file inclusion/exclusion, and project settings.

### Creating tsconfig.json:

```bash
# Generate default tsconfig.json
npx tsc --init
```

### Real Example - Complete Configuration:

```json
{
  "compilerOptions": {
    // === LANGUAGE & ENVIRONMENT ===
    "target": "ES2020",                    // Output ECMAScript version
    "lib": ["ES2020", "DOM"],              // Include type definitions
    "jsx": "react-jsx",                    // JSX support for React
    "useDefineForClassFields": true,
    
    // === MODULE RESOLUTION ===
    "module": "ESNext",                    // Module format
    "moduleResolution": "node",            // How to resolve modules
    "baseUrl": "./src",                    // Base directory for resolution
    "rootDir": "./src",                    // Root of source files
    "paths": {
      "@components/*": ["components/*"],
      "@utils/*": ["utils/*"],
      "@types/*": ["types/*"]
    },
    
    // === EMIT ===
    "outDir": "./dist",                    // Output directory
    "declaration": true,                   // Generate .d.ts files
    "declarationMap": true,                // Generate source maps for .d.ts
    "sourceMap": true,                     // Generate .js.map files
    "removeComments": true,                // Strip comments
    "noEmit": false,                       // Whether to emit files
    
    // === TYPE CHECKING (STRICT MODE) ===
    "strict": true,                        // Enable all strict checks
    "noImplicitAny": true,                 // Error on implicit any
    "strictNullChecks": true,              // Strict null checking
    "strictFunctionTypes": true,           // Strict function types
    "strictBindCallApply": true,           // Strict bind/call/apply
    "strictPropertyInitialization": true,  // Class properties initialized
    "noImplicitThis": true,                // Error on this with implicit any
    "alwaysStrict": true,                  // Use 'use strict' mode
    "noUnusedLocals": true,                // Error on unused variables
    "noUnusedParameters": true,            // Error on unused parameters
    "noImplicitReturns": true,             // Error if not all paths return
    "noFallthroughCasesInSwitch": true,    // Error on fallthrough cases
    
    // === INTEROP ===
    "esModuleInterop": true,               // CommonJS/ES module interop
    "allowSyntheticDefaultImports": true,  // Allow default imports
    "isolatedModules": true,               // Each file as separate module
    
    // === JAVASCRIPT SUPPORT ===
    "allowJs": true,                       // Check .js files
    "checkJs": true,                       // Enable checkJs
    
    // === EXPERIMENTAL ===
    "experimentalDecorators": true,        // Support decorators
    "emitDecoratorMetadata": true,         // Emit decorator metadata
    
    // === OTHER ===
    "skipLibCheck": true,                  // Skip type checking .d.ts
    "forceConsistentCasingInFileNames": true, // Enforce case sensitivity
    "resolveJsonModule": true,             // Import JSON files
    "incremental": true,                   // Enable incremental compilation
    "tsBuildInfoFile": ".tsbuildinfo"      // Incremental build file
  },
  
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.js"
  ],
  
  "exclude": [
    "node_modules",
    "dist",
    "build",
    "**/*.spec.ts",
    "**/*.test.ts"
  ],
  
  "ts-node": {
    "esm": true,
    "experimentalEsm": true
  }
}
```

### Project References (for monorepos):

```json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "outDir": "./dist"
  },
  "references": [
    { "path": "./packages/utils" },
    { "path": "./packages/api" }
  ]
}
```

### Build Configuration (separate):

```json
// tsconfig.build.json - extends main config
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noEmit": false
  },
  "include": ["src"],
  "exclude": ["src/**/*.test.ts", "src/**/*.spec.ts"]
}
```

---

## 54. What is strict mode in TypeScript?

**Answer:**

**Strict mode** enables multiple strict type-checking options at once. Setting `"strict": true` activates all strict checks and is considered a best practice for new projects.

### What `strict: true` Enables:

```json
{
  "compilerOptions": {
    "strict": true
    // Equivalent to:
    // "noImplicitAny": true,
    // "strictNullChecks": true,
    // "strictFunctionTypes": true,
    // "strictBindCallApply": true,
    // "strictPropertyInitialization": true,
    // "noImplicitThis": true,
    // "alwaysStrict": true
  }
}
```

### Real Example - Strict Catches Errors:

```typescript
// ===== WITHOUT STRICT MODE =====
// Works (but unsafe)

function greet(name) {
  return `Hello, ${name}`;
}

greet(123); // No error - but incorrect!

let user: { name: string };
// user.name = "Alice"; // No error - but never initialized!

function getValue(obj: { value: string }) {
  return obj.value.toUpperCase();
}

getValue({ value: null } as any); // No error - runtime crash!


// ===== WITH STRICT MODE =====
// Errors caught immediately

function greetStrict(name: string) {
  // Error: Parameter must have explicit type
  return `Hello, ${name}`;
}

let userStrict: { name: string };
// Error: Property 'name' has no initializer

function getValueStrict(obj: { value: string }) {
  return obj.value.toUpperCase();
}

// Error: null not assignable to string
// getValueStrict({ value: null });
```

### Benefits of Strict Mode:

✅ **Catches more errors** - At compile time, not runtime  
✅ **Type safety** - Prevents common mistakes  
✅ **Code quality** - Encourages better practices  
✅ **Maintenance** - Easier to refactor safely  

### Recommended for All New Projects:

```json
{
  "compilerOptions": {
    "strict": true  // Always use this!
  }
}
```

---

## 55. How does TypeScript handle null and undefined?

**Answer:**

TypeScript treats null and undefined as distinct types when `strictNullChecks` is enabled. This prevents many common bugs.

### With strictNullChecks: true (Recommended):

```typescript
// Strict null checking is ON

let name: string = "Alice";
// name = null;      // Error: null not assignable to string
// name = undefined; // Error: undefined not assignable to string

// Allow null explicitly
let nullableName: string | null = "Bob";
nullableName = null; // OK

// Allow undefined
let optionalName: string | undefined = "Charlie";
optionalName = undefined; // OK

// Both
let flexibleName: string | null | undefined = "Diana";
flexibleName = null;      // OK
flexibleName = undefined; // OK
flexibleName = "Eve";     // OK
```

### Handling Null/Undefined Safely:

```typescript
function greet(name: string | null | undefined): string {
  if (!name) {
    return "Hello, guest";
  }
  return `Hello, ${name}`;
}

// Or with explicit checks
function greetExplicit(name: string | null | undefined): string {
  if (name === null || name === undefined) {
    return "Hello, guest";
  }
  return `Hello, ${name}`;
}

// Or with optional chaining
function getNameLength(person: { name?: string }): number {
  return person.name?.length ?? 0;
}

// Or with nullish coalescing
function setDefault(value: string | null | undefined): string {
  return value ?? "default";
}
```

### Strict Null Checks in Functions:

```typescript
interface User {
  id: number;
  name: string;
  email?: string;  // Optional = string | undefined
  phone: string | null; // Explicit null
}

function printUser(user: User | null): void {
  if (!user) {
    console.log("No user");
    return;
  }
  
  console.log(user.name); // Safe - user exists
  console.log(user.email); // Safe - might be undefined
  console.log(user.phone); // Safe - might be null
}
```

### Without strictNullChecks (NOT Recommended):

```typescript
// With strictNullChecks: false
let name: string = "Alice";
name = null;      // ❌ No error (dangerous!)
name = undefined; // ❌ No error (dangerous!)

// Causes runtime errors:
console.log(name.toUpperCase()); // Runtime crash: Cannot read property 'toUpperCase' of null
```

---

## 56. What are declaration files (.d.ts)?

**Answer:**

**Declaration files** (.d.ts) provide type information for JavaScript code without containing implementation. They tell TypeScript what types exist in a library.

### Simple Analogy:

Think of .d.ts files like **interface specifications** - they describe what's available without showing how it works.

### Real Example - Basic Declaration File:

```typescript
// mylib.d.ts
declare module "mylib" {
  export function doSomething(x: number): string;
  
  export const VERSION: string;
  
  export interface Config {
    timeout: number;
    retries: number;
  }
  
  export class MyClass {
    constructor(name: string);
    getValue(): number;
  }
}

// Now in your code:
// import { doSomething, MyClass } from "mylib";
// TypeScript knows the types even though mylib is JavaScript!
```

### Global Declarations:

```typescript
// globals.d.ts
declare const API_URL: string;
declare const APP_VERSION: string;

declare global {
  interface Window {
    myCustomAPI: {
      init(): void;
      getValue(): string;
    };
  }
}

// Now available globally
console.log(API_URL); // ✅ TypeScript knows this exists
window.myCustomAPI.init(); // ✅ TypeScript knows this exists
```

### Generating Declaration Files:

```json
// tsconfig.json
{
  "compilerOptions": {
    "declaration": true,      // Generate .d.ts files
    "declarationDir": "./dist" // Where to put them
  }
}
```

When you compile TypeScript with `declaration: true`, it automatically generates .d.ts files:

```typescript
// user.ts (source)
export class User {
  constructor(public name: string) {}
  
  getName(): string {
    return this.name;
  }
}

// Generates: user.d.ts
export declare class User {
  name: string;
  constructor(name: string);
  getName(): string;
}
```

### Real Example - Library Declaration:

```typescript
// @types/custom-lib.d.ts
declare module "custom-lib" {
  export interface Options {
    debug?: boolean;
    timeout?: number;
  }
  
  export function initialize(options?: Options): Promise<void>;
  
  export class Client {
    constructor(token: string);
    request<T>(path: string): Promise<T>;
  }
  
  export namespace Utils {
    function formatDate(date: Date): string;
  }
}

// Usage:
// import { Client, initialize, Utils } from "custom-lib";
// const client = new Client("token");
// const result = await client.request<{ id: number }>("/api/user");
```

---

## 57. How do you use TypeScript with React?

**Answer:**

TypeScript integrates with React to provide type-safe components, props, and hooks.

### Setup:

```bash
# Create React app with TypeScript
npx create-react-app my-app --template typescript

# Or with Vite
npm create vite@latest my-app -- --template react-ts
```

### Basic Functional Component with Props:

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  variant = "primary"
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
};

export default Button;
```

### Using useState Hook:

```typescript
interface Counter {
  count: number;
  name: string;
}

const CounterComponent = () => {
  const [state, setState] = useState<Counter>({
    count: 0,
    name: "Counter"
  });
  
  const increment = () => {
    setState(prev => ({
      ...prev,
      count: prev.count + 1
    }));
  };
  
  return (
    <div>
      <h1>{state.name}</h1>
      <p>Count: {state.count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};
```

### Event Handlers:

```typescript
const Form = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle submit
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);
  };
  
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.disabled = true;
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleInputChange} />
      <button onClick={handleButtonClick}>Submit</button>
    </form>
  );
};
```

### useRef with DOM Elements:

```typescript
const InputFocus = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  const focusInput = () => {
    inputRef.current?.focus();
  };
  
  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </>
  );
};
```

### useReducer Hook:

```typescript
type State = { count: number };
type Action = 
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
  }
};

const AdvancedCounter = () => {
  const [state, dispatch] = React.useReducer(reducer, { count: 0 });
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </div>
  );
};
```

### Context with TypeScript:

```typescript
interface User {
  id: number;
  name: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used in UserProvider");
  }
  return context;
};
```

---

## 58. How do you handle asynchronous code in TypeScript?

**Answer:**

TypeScript provides type safety for async operations using Promises and async/await.

### Promises with Types:

```typescript
function fetchUser(id: number): Promise<{ id: number; name: string }> {
  return fetch(`/api/users/${id}`)
    .then(res => res.json());
}

fetchUser(1).then(user => {
  console.log(user.name); // TypeScript knows user has name
});
```

### Async/Await:

```typescript
async function getUserData(id: number): Promise<string> {
  const response = await fetch(`/api/users/${id}`);
  const user = await response.json();
  return user.name;
}

// Call it
const name = await getUserData(1); // name is string
```

### Error Handling:

```typescript
async function fetchWithErrorHandling(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
  }
}
```

### Generic Async Functions:

```typescript
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json() as Promise<T>;
}

interface Post {
  id: number;
  title: string;
}

const post = await fetchData<Post>("/api/posts/1");
console.log(post.title); // TypeScript knows it's string
```

---

## 59. What is the difference between 'Promises' and 'async/await' in TypeScript?

**Answer:**

Both handle asynchronous code, but have different syntax and readability.

### Promises (Callback-based):

```typescript
function getData(): Promise<string> {
  return fetch("/api/data")
    .then(res => res.json())
    .then(data => data.value)
    .catch(error => {
      console.error(error);
      throw error;
    });
}
```

### Async/Await (Cleaner):

```typescript
async function getDataAsync(): Promise<string> {
  try {
    const res = await fetch("/api/data");
    const data = await res.json();
    return data.value;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
```

### Sequential Operations:

```typescript
// Promises (harder to read)
function sequentialPromises(): Promise<number> {
  return step1()
    .then(result1 => step2(result1.value))
    .then(result2 => step3(result2.value))
    .then(result3 => result3.value);
}

// Async/await (cleaner)
async function sequentialAsync(): Promise<number> {
  const result1 = await step1();
  const result2 = await step2(result1.value);
  const result3 = await step3(result2.value);
  return result3.value;
}
```

### Parallel Operations:

```typescript
// Promises
Promise.all([fetch("/api/1"), fetch("/api/2")])
  .then(([res1, res2]) => {
    return Promise.all([res1.json(), res2.json()]);
  })
  .then(([data1, data2]) => {
    console.log(data1, data2);
  });

// Async/await (cleaner)
async function loadBoth() {
  const [res1, res2] = await Promise.all([
    fetch("/api/1"),
    fetch("/api/2")
  ]);
  
  const [data1, data2] = await Promise.all([
    res1.json(),
    res2.json()
  ]);
  
  console.log(data1, data2);
}
```

---

## 60. How do you type third-party libraries?

**Answer:**

Three approaches to add types for untyped JavaScript libraries.

### Approach 1: Install @types Package (Preferred):

```bash
# Most libraries have types available
npm install --save-dev @types/lodash
npm install --save-dev @types/express
npm install --save-dev @types/jquery
```

Then use with full type support:

```typescript
import _ from "lodash";
_.chunk([1, 2, 3], 2); // Types available
```

### Approach 2: Create Declaration File:

```typescript
// types/my-library.d.ts
declare module "my-library" {
  export function init(config: { apiKey: string }): void;
  export class Client {
    request(path: string): Promise<any>;
  }
}

// Now in your code:
// import { Client } from "my-library";
```

### Approach 3: Quick Ambient Declaration:

```typescript
// In any .d.ts file
declare module "untyped-lib" {
  export const helper: (x: number) => string;
}
```

### Configuration:

```json
// tsconfig.json
{
  "compilerOptions": {
    "typeRoots": [
      "./node_modules/@types",
      "./types"
    ]
  }
}
```

---

## Complete Summary of Q48-Q60

You now understand:

✅ **Type assertion** - Tell compiler what type something is  
✅ **`as` vs angle bracket** - Syntax differences and compatibility  
✅ **User-defined type guards** - Custom type narrowing functions  
✅ **`in` operator** - Check property existence  
✅ **`instanceof` operator** - Check class instances  
✅ **tsconfig.json** - Configure TypeScript compiler  
✅ **Strict mode** - Enable all strict type checks  
✅ **Null and undefined** - Handling nullable types  
✅ **Declaration files** - Type information without implementation  
✅ **React with TypeScript** - Type-safe React components  
✅ **Async/await** - Type-safe asynchronous code  
✅ **Promises vs async/await** - Different async patterns  
✅ **Third-party libraries** - Adding types to untyped code  

**These practical concepts connect TypeScript to real-world development!** 🎯
