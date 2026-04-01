# TypeScript Interview Questions (Q1-Q15 Detailed Answers)

## SECTION 1: BASIC CONCEPTS

## 1. What is TypeScript and how does it differ from JavaScript?

**Answer:**

**TypeScript** is a superset of JavaScript developed by Microsoft that adds **optional static typing** to JavaScript. It compiles to plain JavaScript that runs anywhere JavaScript runs.

### Simple Analogy:

Think of TypeScript like **spell-checker for JavaScript**:
- JavaScript = Write freely (but typos possible)
- TypeScript = Check spelling as you write (catches errors early)

### Key Differences:

| Feature | JavaScript | TypeScript |
|---------|-----------|-----------|
| **Type System** | Dynamic (runtime) | Static (compile-time) |
| **Error Detection** | At runtime (crashes) | At compile-time (before running) |
| **Development** | No compilation needed | Needs compilation to JS |
| **IDE Support** | Basic | Excellent (autocomplete, refactoring) |
| **Learning Curve** | Easier | Steeper (must learn types) |
| **Browser Support** | Direct | After compilation |

### Real Example:

```javascript
// JavaScript - Works but has a bug!
function add(a, b) {
  return a + b;
}

add(5, "10");  // Returns "510" (string!) - No error!
add(5, 10);    // Returns 15 (number)
// Unexpected behavior, hard to find bug
```

```typescript
// TypeScript - Catches the error immediately!
function add(a: number, b: number): number {
  return a + b;
}

add(5, "10");  // ❌ Compile Error: 'string' not assignable to 'number'
add(5, 10);    // ✅ Returns 15
// Error caught before running!
```

### How TypeScript Works:

```
Write TypeScript Code (.ts files)
         ↓
TypeScript Compiler (tsc)
         ↓
JavaScript Code (.js files)
         ↓
JavaScript Runtime (Browser/Node.js)
```

### Why TypeScript Exists:

✅ **Catch errors early** - During development, not in production  
✅ **Better tooling** - IDE knows types, provides autocomplete  
✅ **Code documentation** - Types serve as inline docs  
✅ **Refactoring safety** - Change code with confidence  
✅ **Scalability** - Better for large teams and projects  

### TypeScript is a Superset:

```typescript
// All valid JavaScript is valid TypeScript
const message = "Hello";
const numbers = [1, 2, 3];
const user = { name: "Alice", age: 30 };

// But you CAN add types (optional)
const message2: string = "Hello";
const numbers2: number[] = [1, 2, 3];
const user2: { name: string; age: number } = { name: "Alice", age: 30 };
```

---

## 2. What are the benefits of using TypeScript?

**Answer:**

TypeScript provides numerous benefits that improve code quality, developer experience, and team productivity.

### Main Benefits:

### 1. Early Error Detection

```typescript
// Without TypeScript (JavaScript)
function calculateTotal(price, quantity) {
  return price * quantity;
}

calculateTotal("50", 3);  // Returns "50505050" - BUG! (string multiplication)
// Error only found at runtime, maybe in production!

// With TypeScript
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

calculateTotal("50", 3);  // ❌ Compile Error immediately!
// Caught before running
```

### 2. Better IDE Support & Autocomplete

```typescript
// JavaScript - IDE can't help much
const user = { name: "Alice", age: 30 };
user.email;  // IDE can't tell if this exists

// TypeScript - IDE knows everything
interface User {
  name: string;
  age: number;
}

const user: User = { name: "Alice", age: 30 };
user.email;  // ❌ IDE shows error: property doesn't exist
user.name;   // ✅ IDE autocompletes and knows it's a string
```

### 3. Code Documentation

```typescript
// Without types - What should we pass?
function saveUser(user) {
  // No idea what properties user should have
}

// With types - Clear documentation
interface User {
  id: number;           // User's unique ID
  name: string;         // Full name
  email: string;        // Email address
  isActive: boolean;    // Account status
}

function saveUser(user: User) {
  // Clear what's expected
}
```

### 4. Refactoring Safety

```typescript
// JavaScript - Scary to refactor!
const users = [
  { id: 1, name: "Alice", email: "alice@ex.com" },
  { id: 2, name: "Bob", email: "bob@ex.com" }
];

function printUsers(items) {
  items.forEach(item => {
    console.log(item.name);  // What if we rename this field?
  });
}

// If we rename 'name' to 'fullName', printUsers breaks!
// But we won't know until we run it

// TypeScript - Catches rename issues!
interface User {
  id: number;
  name: string;  // Change to fullName...
  email: string;
}

function printUsers(items: User[]) {
  items.forEach(item => {
    console.log(item.name);  // ❌ Error: Property 'name' doesn't exist
    // Fixed automatically by TypeScript before running!
  });
}
```

### 5. Better Tooling for Large Projects

```typescript
// Large teams need to know:
// - What functions exist?
// - What parameters do they need?
// - What do they return?

// TypeScript answers all these questions!
// Go to definition, find usages, rename safely
```

### 6. Modern JavaScript Features

```typescript
// TypeScript lets you use modern ES features
// and compiles to older ES versions for older browsers

// Write modern code
const names: string[] = ["Alice", "Bob"];
const upperNames = names.map(n => n.toUpperCase());

// Compiles to ES5 for older browsers
// TypeScript handles the compatibility
```

### 7. Object-Oriented Programming Support

```typescript
// Classes, interfaces, inheritance, access modifiers
class Animal {
  protected name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks`);
  }
}

// TypeScript enforces OOP patterns
```

### 8. Team Collaboration

```typescript
// When working in teams, types prevent misunderstandings
interface PaymentData {
  amount: number;     // Required
  currency?: string;  // Optional
  description: string;
}

// Everyone knows exactly what to pass
function processPayment(data: PaymentData): void {
  // Implementation
}
```

### Summary of Benefits:

✅ **Catch bugs early** - Before they reach users  
✅ **Better IDE support** - Autocomplete, go to definition, refactoring  
✅ **Self-documenting code** - Types show intent  
✅ **Easier maintenance** - Know what changed, why  
✅ **Scalability** - Scales with team size  
✅ **Modern features** - Use latest JS with compatibility  
✅ **Fewer runtime errors** - Type safety prevents many crashes  
✅ **Confidence** - Refactor with confidence  

---

## 3. What are the primitive types in TypeScript?

**Answer:**

Primitive types are the basic building blocks in TypeScript. They represent simple, single values.

### The Primitive Types:

### 1. **number** - All numeric values

```typescript
let age: number = 25;
let price: number = 99.99;
let negative: number = -5;
let infinity: number = Infinity;
let notANumber: number = NaN;
let hex: number = 0xFF;      // Hexadecimal
let binary: number = 0b1010; // Binary
let octal: number = 0o755;   // Octal
```

### 2. **string** - Text values

```typescript
let name: string = "Alice";
let message: string = 'Hello, World!';
let template: string = `Hello, ${name}!`; // Template literal

// String operations
let upper: string = message.toUpperCase();
let lower: string = message.toLowerCase();
let length: number = message.length;
```

### 3. **boolean** - true or false

```typescript
let isActive: boolean = true;
let isAdmin: boolean = false;

// From comparisons
let hasEmail: boolean = email !== "";
let isOldEnough: boolean = age >= 18;
```

### 4. **null** - Intentional absence of value

```typescript
let emptyValue: null = null;

// Usually used in union types
let possibleNull: string | null = null;
possibleNull = "value";  // Can be string or null
possibleNull = null;     // Can be null
```

### 5. **undefined** - Not yet assigned

```typescript
let notAssigned: undefined = undefined;

// Usually implicit (when variable declared but not assigned)
let x: number;  // x is undefined initially
x = 5;         // Now assigned

// Or explicit
let unassignedValue: undefined = undefined;
```

### 6. **symbol** - Unique identifiers (advanced)

```typescript
let sym1: symbol = Symbol("description");
let sym2: symbol = Symbol("description");

// Each symbol is unique
console.log(sym1 === sym2); // false (different symbols)

// Used for unique object keys
const mySymbol = Symbol("id");
const obj = {
  [mySymbol]: "unique value",
  name: "object"
};

// Can only access with the symbol
console.log(obj[mySymbol]); // "unique value"
```

### 7. **bigint** - Large integers beyond Number.MAX_SAFE_INTEGER

```typescript
let large: bigint = 9007199254740991n;  // Note the 'n' suffix
let bigger: bigint = BigInt("9007199254740992");

// Operations with bigint
let result: bigint = large + 1n;

// Can't mix bigint with regular numbers
// let mix = large + 5; // Error!
let mix: bigint = large + 5n; // Correct
```

### 8. **void** - No return value (used in functions)

```typescript
// Function that returns nothing
function logMessage(message: string): void {
  console.log(message);
  // No return statement
}

// Variable with void type (rarely used)
let noValue: void = undefined;
```

### 9. **any** - Any type (disables type checking)

```typescript
let anything: any = "text";
anything = 123;      // OK
anything = true;     // OK
anything = { x: 1 }; // OK

// No type safety with any (avoid when possible!)
anything.someMethod();  // No error, but might crash at runtime
```

### 10. **unknown** - Unknown type (type-safe version of any)

```typescript
let unknownValue: unknown = "text";

// Must check type before using
if (typeof unknownValue === "string") {
  console.log(unknownValue.toUpperCase()); // OK
}

// Without check:
// console.log(unknownValue.toUpperCase()); // Error!
```

### 11. **never** - Values that never occur

```typescript
// Function that always throws
function throwError(message: string): never {
  throw new Error(message);
}

// Function that never returns (infinite loop)
function infiniteLoop(): never {
  while (true) {
    // Never ends
  }
}

// Unreachable code
type OnlyString = string & number;  // Impossible type
let impossibleValue: OnlyString;    // never type
```

### Real Example - Using Primitives Together:

```typescript
interface User {
  id: number;              // primitive: number
  name: string;            // primitive: string
  email: string;           // primitive: string
  isActive: boolean;       // primitive: boolean
  age?: number;            // optional number
  preferences: null | undefined; // null or undefined
}

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  isActive: true,
  age: 25,
  preferences: null
};
```

### Quick Reference Table:

| Type | Example | Use |
|------|---------|-----|
| **number** | 42, 3.14, -5 | Numeric values |
| **string** | "text", 'hello' | Text values |
| **boolean** | true, false | Yes/No values |
| **null** | null | Intentional absence |
| **undefined** | undefined | Not assigned |
| **symbol** | Symbol("id") | Unique identifiers |
| **bigint** | 123n | Large integers |
| **void** | (in functions) | No return |
| **any** | anything | ⚠️ Avoid |
| **unknown** | anything (safe) | ✅ Prefer |
| **never** | (unreachable) | Impossible types |

---

## 4. What is type inference?

**Answer:**

**Type inference** is TypeScript's ability to automatically figure out what type a variable should be without you explicitly stating it.

### Simple Analogy:

Think of type inference like **a teacher knowing what subject you're learning by looking at your work**, without you saying it.

### How Type Inference Works:

```typescript
// TypeScript infers the type from the value assigned

let message = "Hello";    // Inferred as: string
let count = 5;            // Inferred as: number
let isActive = true;      // Inferred as: boolean
let emptyArray = [];       // Inferred as: never[] (array of never)

// TypeScript "remembers" these types and checks them
message = "World";        // ✅ OK (still string)
message = 123;            // ❌ Error: number not assignable to string
count = 10;               // ✅ OK (still number)
count = "abc";            // ❌ Error: string not assignable to number
```

### Inference in Function Return Types:

```typescript
// Return type inferred from the return statement
function add(a: number, b: number) {
  return a + b;  // Returns number, so inferred as number
}

// add returns number type
const result = add(5, 10);  // result is inferred as: number

function greet(name: string) {
  return `Hello, ${name}!`;  // Returns string, so inferred as string
}

// greet returns string type
const greeting = greet("Alice");  // greeting is inferred as: string
```

### Inference with Arrays:

```typescript
// Array inference
const numbers = [1, 2, 3];        // Inferred as: number[]
const strings = ["a", "b"];       // Inferred as: string[]
const mixed = [1, "two", 3];      // Inferred as: (number | string)[]

// Type checking still works
numbers.push(4);         // ✅ OK (number)
numbers.push("five");    // ❌ Error: string not assignable to number
```

### Inference with Objects:

```typescript
const person = {
  name: "Alice",         // name: string
  age: 30,               // age: number
  isStudent: false       // isStudent: boolean
};

// Inferred as:
// {
//   name: string;
//   age: number;
//   isStudent: boolean;
// }

console.log(person.name);           // ✅ OK (known property)
console.log(person.email);          // ❌ Error: property doesn't exist
```

### Benefits of Type Inference:

✅ **Less typing** - Don't repeat types unnecessarily  
✅ **Still type-safe** - TypeScript still checks types  
✅ **Cleaner code** - Less verbose  
✅ **Works with complex types** - Figures out unions, intersections  

### When to Use Explicit Types vs Inference:

```typescript
// ✅ Use inference for obvious cases
const count = 5;              // Obviously a number
const name = "Alice";         // Obviously a string
const user = { id: 1, name: "Bob" }; // Obviously an object

// ❌ Use explicit types for clarity when not obvious
const data = {}; // Too vague - should specify

// ✅ Better:
const data: { id: number; name: string } = {};

// ✅ Or with inference:
const data = { id: 0, name: "" }; // Clear what types should be

// ✅ Always explicit for function parameters
function calculate(a: number, b: number): number {
  return a + b;
}

// ❌ Don't do this:
function calculate(a, b) {  // What types are a and b?
  return a + b;
}
```

### Inference with Contextual Types:

```typescript
// TypeScript can infer type from context

// Array methods with inference
const numbers = [1, 2, 3, 4, 5];

numbers.map(n => {  // n is inferred as: number
  return n * 2;
});

numbers.forEach(n => {  // n is inferred as: number
  console.log(n);
});

// Event handlers with inference
const button = document.querySelector("button");

button?.addEventListener("click", (event) => {
  // event is inferred as: MouseEvent
  console.log(event.clientX);
});
```

---

## 5. What is type annotation?

**Answer:**

**Type annotation** is explicitly telling TypeScript what type a variable, parameter, or return value should have.

### Simple Analogy:

Type annotation is like **labeling a box with what's inside**: 
- "This box contains strings"
- "This box contains numbers"

### Basic Syntax:

```typescript
// Variable annotation
variableName: Type = value;

// Function parameter annotation
function name(parameter: Type): ReturnType {
  // ...
}
```

### Real Examples - Variables:

```typescript
// Primitive type annotations
let age: number = 25;
let name: string = "Alice";
let isStudent: boolean = false;

// Can't assign wrong type
name = "Bob";      // ✅ OK (still string)
name = 123;        // ❌ Error: number not assignable to string

// Array annotations
let numbers: number[] = [1, 2, 3];
let strings: string[] = ["a", "b", "c"];
let mixed: (number | string)[] = [1, "two", 3];

// Alternative array syntax
let numberList: Array<number> = [1, 2, 3];
let stringList: Array<string> = ["a", "b"];
```

### Real Examples - Objects:

```typescript
// Object with inline annotations
let person: {
  name: string;
  age: number;
  email: string;
} = {
  name: "Alice",
  age: 30,
  email: "alice@example.com"
};

// Wrong type causes error
person.name = 123;  // ❌ Error: number not assignable to string
```

### Real Examples - Functions:

```typescript
// Function parameter and return type annotation
function add(a: number, b: number): number {
  return a + b;
}

// Function with optional parameters
function greet(name: string, age?: number): string {
  if (age) {
    return `Hello ${name}, you are ${age}`;
  }
  return `Hello ${name}`;
}

// Function with default values
function multiply(a: number, b: number = 1): number {
  return a * b;
}

multiply(5);        // ✅ OK (b defaults to 1)
multiply(5, 3);     // ✅ OK (b is 3)
multiply(5, "3");   // ❌ Error: string not assignable to number
```

### Real Examples - Complex Types:

```typescript
// Union types
let id: string | number;
id = "USER_123";    // ✅ OK (string)
id = 123;           // ✅ OK (number)
id = true;          // ❌ Error: boolean not assignable

// Function type
let calculateDiscount: (price: number, percentage: number) => number;
calculateDiscount = (p, pct) => p * (1 - pct / 100);

// Interface annotation
interface User {
  id: number;
  name: string;
  active: boolean;
}

let user: User = {
  id: 1,
  name: "Alice",
  active: true
};
```

### When to Annotate vs Infer:

```typescript
// ❌ Unnecessary annotation (inference is clear)
const count: number = 5;       // Obvious it's a number
const name: string = "Alice";  // Obvious it's a string

// ✅ Better (let inference work)
const count = 5;
const name = "Alice";

// ✅ Necessary annotation (not obvious)
const data: { id: number; name: string } = {};

// ❌ Without annotation
const data = {};  // What should this contain?

// ✅ Necessary for function parameters
function save(user: User): void {
  // Without annotation, TypeScript doesn't know what user should contain
}

// ❌ Unnecessary
function save(user: User): User {
  // Redundant return type if we infer it
  return user;
}

// ✅ Better
function save(user: User) {
  // Return type inferred from code
  return user;
}
```

### Best Practices:

✅ **Annotate function parameters** - Always specify what functions expect  
✅ **Annotate public APIs** - Functions exported from modules  
✅ **Let inference work** - For obvious assignments  
✅ **Use for complex types** - When intent isn't clear  
✅ **Be explicit in interfaces** - All properties should have types  

---

## 6. What is the difference between 'interface' and 'type'?

**Answer:**

Both `interface` and `type` can define object shapes, but they have important differences in capabilities and use cases.

### Simple Analogy:

- **interface** = Official blueprint (can be extended)
- **type** = Label (can be combined in more ways)

### Comparison Table:

| Feature | Interface | Type |
|---------|-----------|------|
| **Can describe objects** | ✅ Yes | ✅ Yes |
| **Can describe primitives** | ❌ No | ✅ Yes |
| **Can describe functions** | ✅ Yes | ✅ Yes |
| **Can describe unions** | ❌ No | ✅ Yes |
| **Declaration merging** | ✅ Yes | ❌ No |
| **Inheritance** | ✅ extends | ✅ & (intersection) |
| **Better for OOP** | ✅ Yes | ❌ No |
| **Better for FP** | ❌ No | ✅ Yes |

### Interface Examples:

```typescript
// Basic interface
interface User {
  id: number;
  name: string;
  email: string;
}

// Interface extending another
interface Admin extends User {
  permissions: string[];
  isAdmin: true;
}

// Function in interface
interface Logger {
  log(message: string): void;
  error(message: string): void;
}

// Implementing interface in class
class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(message);
  }
  
  error(message: string): void {
    console.error(message);
  }
}

// Declaration merging (interface only feature!)
interface Window {
  myProperty: string;
}

interface Window {
  myOtherProperty: number;
}

// Now Window has both properties - they merged!
```

### Type Examples:

```typescript
// Basic type
type User = {
  id: number;
  name: string;
  email: string;
};

// Type union (interface can't do this!)
type Status = "pending" | "approved" | "rejected";

// Type intersection (like extends)
type Employee = User & {
  employeeId: number;
  department: string;
};

// Primitive type (interface can't do this!)
type ID = string | number;

// Function type (interface can, but type is more common)
type GreetFunction = (name: string) => string;

// Mapping types (interface can't do this!)
type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};

// Union of types (interface can't do this!)
type Result = 
  | { status: "success"; data: string }
  | { status: "error"; error: Error };
```

### When to Use Interface:

✅ **Defining object shapes** for classes/OOP  
✅ **Class contracts** with `implements`  
✅ **When you need declaration merging** (extending global types)  
✅ **Library/API design** where users might extend  

```typescript
// Good use of interface
interface Database {
  query(sql: string): Promise<any[]>;
  execute(sql: string): Promise<number>;
}

class PostgresDB implements Database {
  query(sql: string): Promise<any[]> {
    // Implementation
    return Promise.resolve([]);
  }
  
  execute(sql: string): Promise<number> {
    // Implementation
    return Promise.resolve(0);
  }
}
```

### When to Use Type:

✅ **Unions and discriminated unions**  
✅ **Mapping/utility types**  
✅ **Function types**  
✅ **Primitives and complex combinations**  

```typescript
// Good use of type
type ApiResponse<T> = 
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

type UserResponse = ApiResponse<{ id: number; name: string }>;

// This pattern is hard to do with interface
```

### Side-by-Side Comparison:

```typescript
// INTERFACE approach
interface PersonInterface {
  name: string;
  age: number;
}

interface EmployeeInterface extends PersonInterface {
  employeeId: number;
}

// TYPE approach
type PersonType = {
  name: string;
  age: number;
};

type EmployeeType = PersonType & {
  employeeId: number;
};

// Both create the same result, but:
// - Interface is clearer for OOP inheritance
// - Type is more flexible for unions/combinations
```

### Modern Recommendation:

```typescript
// Many teams now prefer 'type' for consistency
// because it can do everything 'interface' does
// EXCEPT declaration merging (rare use case)

// But stick with 'interface' for:
// - Library authors (let users extend)
// - OOP-style code (classes, extends)
// - Team preference

// Use 'type' for:
// - Unions and discriminated unions
// - Complex transformations
// - Functional programming style
```

---

## 7. What are union types and intersection types?

**Answer:**

**Union types** represent a value that can be ONE of several types (OR logic).  
**Intersection types** represent a value that is ALL of several types combined (AND logic).

### Simple Analogy:

- **Union** = "Coffee OR Tea" (you pick one)
- **Intersection** = "Coffee AND Sugar" (you get both)

### Union Types (OR):

```typescript
// Definition: Value can be type A OR type B
type Status = "pending" | "approved" | "rejected";

let status: Status = "pending";  // ✅ OK
status = "approved";             // ✅ OK
status = "unknown";              // ❌ Error (not in union)

// Union with primitives
let id: string | number;
id = "USER_123";  // ✅ OK (string)
id = 123;         // ✅ OK (number)
id = true;        // ❌ Error (boolean not in union)

// Union with objects
type Result = 
  | { success: true; data: string }
  | { success: false; error: string };

let result: Result;
result = { success: true, data: "Hello" };        // ✅ OK
result = { success: false, error: "Network" };   // ✅ OK
result = { success: true, error: "conflicting" }; // ❌ Error

// Union of arrays
type AllowedValues = number[] | string[];
let values: AllowedValues;
values = [1, 2, 3];           // ✅ OK (number[])
values = ["a", "b"];          // ✅ OK (string[])
values = [1, "a"];            // ❌ Error (mixed)
```

### Type Narrowing with Unions:

```typescript
// You must narrow the type before using it
function printId(id: string | number) {
  // ❌ Error: Can't use string methods directly
  // console.log(id.toUpperCase());
  
  // ✅ Use type narrowing
  if (typeof id === "string") {
    console.log(id.toUpperCase());  // OK (now we know it's string)
  } else {
    console.log(id.toFixed(2));     // OK (now we know it's number)
  }
}

// Discriminated unions (common pattern)
type SuccessResponse = {
  status: "success";
  data: any;
};

type ErrorResponse = {
  status: "error";
  error: string;
};

type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(response: ApiResponse) {
  if (response.status === "success") {
    console.log(response.data);   // OK (known to be SuccessResponse)
  } else {
    console.log(response.error);  // OK (known to be ErrorResponse)
  }
}
```

### Intersection Types (AND):

```typescript
// Definition: Value has ALL properties from type A AND type B
type HasName = {
  name: string;
};

type HasAge = {
  age: number;
};

type Person = HasName & HasAge;

// Person must have BOTH name AND age
const person: Person = {
  name: "Alice",
  age: 30
  // If we forget either property, it's an error
};

// More complex intersection
type Timestamps = {
  createdAt: Date;
  updatedAt: Date;
};

type User = {
  id: number;
  name: string;
};

type UserWithTimestamps = User & Timestamps;

const user: UserWithTimestamps = {
  id: 1,
  name: "Alice",
  createdAt: new Date(),
  updatedAt: new Date()
  // All properties from both types required
};

// Intersection with functions
type Loggable = {
  log(): void;
};

type Saveable = {
  save(): void;
};

type Widget = Loggable & Saveable;

const widget: Widget = {
  log() { console.log("Logging"); },
  save() { console.log("Saving"); }
  // Must have both methods
};
```

### Real Example - Discriminated Union:

```typescript
// Common pattern for handling different states
type LoadingState = {
  status: "loading";
};

type SuccessState = {
  status: "success";
  data: string[];
};

type ErrorState = {
  status: "error";
  error: Error;
};

type AppState = LoadingState | SuccessState | ErrorState;

function render(state: AppState) {
  switch (state.status) {
    case "loading":
      return <p>Loading...</p>;
    
    case "success":
      // state is now SuccessState, data is accessible
      return <ul>{state.data.map(d => <li key={d}>{d}</li>)}</ul>;
    
    case "error":
      // state is now ErrorState, error is accessible
      return <p>Error: {state.error.message}</p>;
  }
}
```

### Union vs Intersection Summary:

```typescript
// UNION - Pick ONE
type A = {
  x: number;
};

type B = {
  y: string;
};

type UnionType = A | B;

const u1: UnionType = { x: 1 };           // ✅ OK (has A properties)
const u2: UnionType = { y: "hello" };     // ✅ OK (has B properties)
const u3: UnionType = { x: 1, y: "hi" }; // ✅ OK (has both)


// INTERSECTION - MUST HAVE ALL
type IntersectionType = A & B;

const i1: IntersectionType = { x: 1 };                // ❌ Error (missing y)
const i2: IntersectionType = { y: "hello" };         // ❌ Error (missing x)
const i3: IntersectionType = { x: 1, y: "hello" }; // ✅ OK (has both)
```

---

## Complete Summary of Q1-Q7

You now understand:

✅ **What TypeScript is** - JavaScript with types, catches errors early  
✅ **Benefits of TypeScript** - Better tooling, error detection, documentation  
✅ **Primitive types** - number, string, boolean, null, undefined, symbol, bigint, void, any, unknown, never  
✅ **Type inference** - TypeScript figures out types automatically  
✅ **Type annotations** - Explicitly telling TypeScript what type something is  
✅ **Interface vs Type** - Different use cases for different patterns  
✅ **Union & Intersection** - Combining types with OR and AND logic  

**Continue to Q8-Q15 for more TypeScript concepts!** 🚀
