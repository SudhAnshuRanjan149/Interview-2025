# TypeScript Interview Questions (Q8-Q15 Detailed Answers)

## SECTION 1 CONTINUED: BASIC CONCEPTS

## 8. What is the 'any' type and when should you avoid it?

**Answer:**

The `any` type **disables all type checking** for a variable. TypeScript treats it like plain JavaScript - no type safety at all.

### Simple Analogy:

Think of `any` like giving up on safety:
- With types: Seatbelt in car (protects you)
- With `any`: No seatbelt (dangerous!)

### What is `any`?

```typescript
// Variable can be anything
let data: any = "hello";
data = 123;           // ✅ OK (changes to number)
data = true;          // ✅ OK (changes to boolean)
data = { name: "Alice" }; // ✅ OK (changes to object)

// You can do anything with it
data.someMethod();     // ✅ No error (even if method doesn't exist!)
data.nonexistent;      // ✅ No error
data.crazy.chaining(); // ✅ No error (until runtime!)

// But it WILL crash at runtime!
const result = data.toUpperCase(); // Crashes if data is a number
```

### When `any` Causes Problems:

```typescript
// ❌ BAD - Using 'any' everywhere
function processBad(data: any): any {
  return data.toUpperCase(); // Might crash!
}

processBad(123); // No compile error, but crashes at runtime!
processBad(null); // No compile error, but crashes at runtime!
```

### When You MIGHT Use `any`:

1. **Migrating from JavaScript to TypeScript** (temporary)
```typescript
// During migration, use 'any' as placeholder
let legacyCode: any; // TODO: Replace with proper type
```

2. **Working with untyped third-party libraries**
```typescript
// Library has no type definitions
import unknownLibrary = require('some-untyped-library');
const result: any = unknownLibrary.doSomething();
```

3. **Truly dynamic data from user**
```typescript
// Only if data is completely unpredictable
function handleUserInput(input: any) {
  // At least validate/check
  if (typeof input === 'string') {
    return input.toUpperCase();
  }
}
```

### The Problem with `any`:

```typescript
// ❌ WRONG - Loses all benefits of TypeScript
let value: any = "hello";
value = 123;
value.substring(0, 5); // No error, but crashes! substring is string method

// ✅ CORRECT - Use proper types
let value2: string = "hello";
value2.substring(0, 5); // ✅ Safe - TypeScript knows substring exists
```

### Best Practices - Never Use `any`:

```typescript
// ❌ WRONG
function getData(): any {
  return { id: 1, name: 'Alice' };
}

// ✅ CORRECT
interface User {
  id: number;
  name: string;
}

function getDataGood(): User {
  return { id: 1, name: 'Alice' };
}

// ❌ WRONG
let items: any[] = [1, 'two', true];

// ✅ CORRECT
let itemsGood: (number | string | boolean)[] = [1, 'two', true];

// ❌ WRONG
function process(input: any): any {
  return input.something;
}

// ✅ CORRECT
function processGood<T extends { something: string }>(input: T): string {
  return input.something;
}
```

### When ESLint Prevents `any`:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "noImplicitAny": true // Error if type is any (even implicit)
  }
}
```

---

## 9. What is the 'unknown' type?

**Answer:**

`unknown` is the **type-safe version of `any`**. It represents any value, but you must check the type before using it.

### Simple Analogy:

- `any` = Open a box without looking
- `unknown` = Open box but must see what's inside before using

### Key Difference:

```typescript
// With 'any' (UNSAFE)
let anyValue: any = "hello";
anyValue.toUpperCase();  // ✅ No error (but might crash!)

// With 'unknown' (SAFE)
let unknownValue: unknown = "hello";
unknownValue.toUpperCase(); // ❌ ERROR: Must check type first!
```

### Using `unknown` Safely:

```typescript
function processValue(value: unknown) {
  // ❌ Can't use directly
  // value.toUpperCase(); // Error!
  
  // ✅ Must narrow type first
  if (typeof value === 'string') {
    console.log(value.toUpperCase()); // OK - now we know it's string
  } else if (typeof value === 'number') {
    console.log(value.toFixed(2)); // OK - now we know it's number
  } else if (typeof value === 'boolean') {
    console.log(value ? 'true' : 'false'); // OK - now we know it's boolean
  }
}
```

### Real Example - Handling API Response:

```typescript
// API returns unknown data
async function fetchData(url: string): Promise<unknown> {
  const response = await fetch(url);
  return response.json(); // Could be anything!
}

// Using the data safely
async function handleData() {
  const data = await fetchData('/api/user');
  
  // ❌ WRONG - Can't use directly
  // console.log(data.name); // Error!
  
  // ✅ CORRECT - Check type first
  if (typeof data === 'object' && data !== null && 'name' in data) {
    console.log((data as any).name); // After check, can use
  }
}
```

### Real Example - Type Guard Function:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Type guard function
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    'email' in obj &&
    typeof (obj as any).id === 'number' &&
    typeof (obj as any).name === 'string' &&
    typeof (obj as any).email === 'string'
  );
}

// Using type guard
function processUser(data: unknown) {
  if (isUser(data)) {
    // Now data is safely typed as User
    console.log(`${data.name} (${data.email})`);
  } else {
    console.error('Invalid user data');
  }
}
```

### Comparison: `any` vs `unknown`:

```typescript
let anyValue: any = 'text';
let unknownValue: unknown = 'text';

// With 'any' (DANGEROUS)
anyValue.foo.bar.baz(); // No error (but crashes at runtime)

// With 'unknown' (SAFE)
// unknownValue.foo.bar.baz(); // ❌ Compile error - must check type

// Safe way
if (typeof unknownValue === 'object') {
  // Now we know it's an object
  // But still can't access properties without more checking
}
```

### Best Practice - Prefer `unknown` over `any`:

```typescript
// ❌ BAD
function handleAny(data: any) {
  return data.something;
}

// ✅ GOOD
function handleUnknown(data: unknown) {
  if (typeof data === 'object' && data !== null && 'something' in data) {
    return (data as any).something;
  }
  throw new Error('Invalid data');
}
```

---

## 10. What is the 'never' type?

**Answer:**

`never` represents values that **never occur**. It's used for:
- Functions that never return (always throw or infinite loop)
- Impossible cases in type checking
- Unreachable code

### Simple Analogy:

Think of `never` like **an empty box that can never have anything in it**.

### Functions That Never Return:

```typescript
// Function that always throws
function throwError(message: string): never {
  throw new Error(message);
}

// Function that loops forever
function runForever(): never {
  while (true) {
    // Never exits
  }
}

// Function that never completes (via external factors)
async function waitForever(): Promise<never> {
  return new Promise(() => {}); // Never resolves
}
```

### Impossible Type:

```typescript
// Variable that can never have a value
let impossible: never;
// impossible = 1;       // ❌ Error
// impossible = "text";  // ❌ Error
// impossible = null;    // ❌ Error

// Only 'never' is assignable to 'never'
impossible = impossible; // ✅ OK
```

### Exhaustive Type Checking (Most Common Use):

```typescript
type Status = 'pending' | 'approved' | 'rejected';

function handleStatus(status: Status): string {
  switch (status) {
    case 'pending':
      return 'Waiting for review';
    case 'approved':
      return 'Request approved';
    case 'rejected':
      return 'Request rejected';
    default:
      // If all cases handled, this code is unreachable
      const _exhaustive: never = status; // Catches missing cases!
      return _exhaustive;
  }
}

// If someone adds a new status:
type StatusBug = 'pending' | 'approved' | 'rejected' | 'cancelled';

function handleStatusBug(status: StatusBug): string {
  switch (status) {
    case 'pending':
      return 'Waiting for review';
    case 'approved':
      return 'Request approved';
    case 'rejected':
      return 'Request rejected';
    // ❌ ERROR: 'cancelled' not handled
    default:
      // 'cancelled' flows here
      const _exhaustive: never = status; // ❌ Type error! Forces you to handle it
      return _exhaustive;
  }
}
```

### Using `never` in Conditional Types:

```typescript
// Remove null and undefined from types
type NonNullable<T> = T extends null | undefined ? never : T;

type T1 = NonNullable<string | null>;          // string
type T2 = NonNullable<number | undefined>;     // number
type T3 = NonNullable<string | null | number>; // string | number

// Union with never simplifies
type A = string | never;  // string
type B = number | never;  // number
type C = never | never;   // never
```

### Real Example - API Response Handler:

```typescript
type SuccessResponse = {
  status: 'success';
  data: string;
};

type ErrorResponse = {
  status: 'error';
  error: Error;
};

type Response = SuccessResponse | ErrorResponse;

function handleResponse(response: Response): string {
  switch (response.status) {
    case 'success':
      return response.data;
    case 'error':
      throw response.error;
    default:
      // If all cases handled, status is never
      const _exhaustive: never = response.status;
      return _exhaustive;
  }
}

// If someone adds new status type:
type ExtendedResponse = 
  | SuccessResponse 
  | ErrorResponse 
  | { status: 'pending' };

function handleExtendedResponse(response: ExtendedResponse): string {
  switch (response.status) {
    case 'success':
      return response.data;
    case 'error':
      throw response.error;
    // ❌ ERROR: 'pending' not handled
    default:
      const _exhaustive: never = response.status; // Type error!
      return _exhaustive;
  }
}
```

---

## 11. How do you define function types in TypeScript?

**Answer:**

Function types define **what parameters** a function takes and **what it returns**.

### Simple Function Type:

```typescript
// Function that takes two numbers and returns a number
function add(a: number, b: number): number {
  return a + b;
}

// Another way - using type alias
type AddFunction = (a: number, b: number) => number;

// Or using interface
interface AddFunctionInterface {
  (a: number, b: number): number;
}
```

### Storing Function in Variable:

```typescript
// Function type for variable
let multiply: (x: number, y: number) => number;

multiply = (x, y) => x * y; // ✅ OK

// multiply = "not a function"; // ❌ Error
```

### Function with Different Parameter Types:

```typescript
// No parameters
function greet(): string {
  return "Hello!";
}

// One parameter
function double(n: number): number {
  return n * 2;
}

// Multiple parameters
function combine(a: string, b: string): string {
  return a + b;
}

// Optional parameter (ends with ?)
function formatName(firstName: string, lastName?: string): string {
  return lastName ? `${firstName} ${lastName}` : firstName;
}

// Default parameter
function repeat(text: string, times: number = 1): string {
  return text.repeat(times);
}

// Rest parameters (...)
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3, 4, 5); // ✅ Works with any number of args
```

### Complex Function Types:

```typescript
// Function that takes another function
function runCallback(callback: (value: string) => void): void {
  callback("Hello");
}

runCallback((msg) => console.log(msg)); // ✅ OK

// Function that returns another function
function createMultiplier(factor: number): (n: number) => number {
  return (n: number) => n * factor;
}

const double = createMultiplier(2);
console.log(double(5)); // 10
```

### Callback Function Types:

```typescript
// Array.map takes a callback function
type MapCallback<T, U> = (item: T, index: number) => U;

function myMap<T, U>(items: T[], callback: MapCallback<T, U>): U[] {
  return items.map(callback);
}

myMap([1, 2, 3], (n) => n * 2); // ✅ OK
```

---

## 12. What are optional parameters and default parameters?

**Answer:**

**Optional parameters** can be omitted when calling a function.  
**Default parameters** provide a value if not supplied.

### Optional Parameters (with ?):

```typescript
function greet(name: string, greeting?: string): string {
  // greeting might be undefined
  if (greeting) {
    return `${greeting}, ${name}!`;
  }
  return `Hello, ${name}!`;
}

greet("Alice");              // ✅ OK - uses default message
greet("Bob", "Hi");          // ✅ OK - uses custom greeting
greet("Charlie", undefined); // ✅ OK - explicitly undefined

// greeting parameter is: string | undefined
```

### Default Parameters:

```typescript
function greet2(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

greet2("Alice");         // ✅ OK - uses "Hello"
greet2("Bob", "Hi");     // ✅ OK - uses "Hi"
greet2("Charlie", "Hey"); // ✅ OK - uses "Hey"

// greeting parameter is just: string (not optional type)
```

### Key Difference:

```typescript
// Optional: Type is string | undefined
function optionalExample(name: string, age?: number): void {
  // age could be number or undefined
  console.log(age?.toString()); // Safe - might be undefined
}

// Default: Type is just string
function defaultExample(name: string, age: number = 18): void {
  // age is always a number (if not provided, uses 18)
  console.log(age.toString()); // Safe - always a number
}

optionalExample("Alice");        // age is undefined
optionalExample("Bob", 25);      // age is 25

defaultExample("Charlie");       // age is 18
defaultExample("Diana", 30);     // age is 30
```

### Real Example - Configuration Object:

```typescript
interface UserConfig {
  name: string;
  email: string;
  age?: number;              // Optional
  theme: string = 'light';   // Default
  notifications: boolean = true; // Default
}

function createUser(config: UserConfig): void {
  const {
    name,
    email,
    age,           // Could be number or undefined
    theme = 'dark', // Default if not provided
    notifications = false
  } = config;
}
```

---

## 13. What are rest parameters in TypeScript?

**Answer:**

**Rest parameters** (`...`) allow a function to accept **any number of arguments** as an array.

### Simple Rest Parameters:

```typescript
// Accepts any number of numbers
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3);           // ✅ Returns 6
sum(1, 2, 3, 4, 5);     // ✅ Returns 15
sum();                  // ✅ Returns 0 (empty array)
```

### Rest Parameters After Regular Parameters:

```typescript
function greetAll(greeting: string, ...names: string[]): void {
  names.forEach(name => console.log(`${greeting}, ${name}!`));
}

greetAll("Hello", "Alice", "Bob", "Charlie");
// Logs:
// Hello, Alice!
// Hello, Bob!
// Hello, Charlie!
```

### Multiple Parameters with Rest:

```typescript
// Regular param, then rest
function format(separator: string, ...items: string[]): string {
  return items.join(separator);
}

format(" - ", "Apple", "Banana", "Cherry");
// Returns: "Apple - Banana - Cherry"
```

### Typed Rest Parameters with Tuples:

```typescript
// Rest parameter with specific types
function logEvent(
  eventName: string,
  ...args: [string, number] // Each argument pair is [string, number]
): void {
  console.log(`Event: ${eventName}`, args);
}

logEvent("click", "button", 5);      // ✅ OK
logEvent("hover", "element", 10);    // ✅ OK
// logEvent("error", "message", "wrong"); // ❌ Error - second arg must be number
```

### Real Example - Logger:

```typescript
function log(level: 'info' | 'warn' | 'error', ...messages: string[]): void {
  const timestamp = new Date().toISOString();
  const fullMessage = messages.join(' ');
  
  console.log(`[${timestamp}] [${level.toUpperCase()}] ${fullMessage}`);
}

log('info', 'User', 'logged', 'in');
// [2024-01-15T10:30:00Z] [INFO] User logged in

log('error', 'Failed', 'to', 'save', 'data');
// [2024-01-15T10:30:01Z] [ERROR] Failed to save data
```

---

## 14. What is function overloading?

**Answer:**

**Function overloading** allows you to define multiple signatures for the same function with different parameter types.

### Simple Function Overloading:

```typescript
// Overload signatures (no implementation)
function toArray(value: number): number[];
function toArray(value: string): string[];

// Implementation (handles all overloads)
function toArray(value: number | string): (number | string)[] {
  if (typeof value === 'number') {
    return [value];
  }
  return value.split('');
}

const numArray = toArray(5);        // number[]
const strArray = toArray("hello");  // string[]
```

### How Overloading Works:

```typescript
// Define what each version should do
function format(input: number): string; // Version 1
function format(input: Date): string;   // Version 2
function format(input: string[]): string; // Version 3

// Single implementation handles all versions
function format(input: number | Date | string[]): string {
  if (typeof input === 'number') {
    return `Number: ${input}`;
  } else if (input instanceof Date) {
    return `Date: ${input.toISOString()}`;
  } else {
    return `Array: ${input.join(', ')}`;
  }
}

format(42);              // ✅ "Number: 42"
format(new Date());      // ✅ "Date: ..."
format(['a', 'b']);     // ✅ "Array: a, b"
```

### Real Example - Search Function:

```typescript
// Can search by ID (number)
function findUser(id: number): User | null;

// Can search by email (string)
function findUser(email: string): User | null;

// Can search by name (string)
function findUser(nameOrId: number | string): User | null {
  if (typeof nameOrId === 'number') {
    // Search by ID
    return users.find(u => u.id === nameOrId) || null;
  } else {
    // Search by email
    return users.find(u => u.email === nameOrId) || null;
  }
}

const userById = findUser(123);          // Search by ID
const userByEmail = findUser("john@ex.com"); // Search by email
```

---

## 15. What are arrow functions and their type annotations?

**Answer:**

**Arrow functions** are a shorter syntax for functions introduced in ES6, and they have the same type annotation rules.

### Basic Arrow Function:

```typescript
// Regular function
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function (same thing)
const addArrow = (a: number, b: number): number => {
  return a + b;
};

// Arrow function one-liner (return implicit)
const addOneliner = (a: number, b: number): number => a + b;
```

### Function Type Annotation:

```typescript
// Type annotation on variable
let multiply: (x: number, y: number) => number;

multiply = (x, y) => x * y; // ✅ OK

// Without types
multiply = (x, y) => `${x} times ${y}`; // ❌ Error - returns string
```

### Arrow Function with No Parameters:

```typescript
const greet = (): string => {
  return "Hello!";
};

const greetShort = (): string => "Hello!";
```

### Arrow Function with One Parameter:

```typescript
// Can omit parentheses with one param
const double = (n: number) => n * 2;

// Or with parentheses
const doubleExplicit = (n: number): number => n * 2;
```

### Arrow Functions as Callback:

```typescript
const numbers = [1, 2, 3, 4, 5];

// Arrow function as callback
const doubled = numbers.map((n): number => n * 2);

// With type inference
const doubledInferred = numbers.map(n => n * 2);
```

### Real Example - React Component (with Arrow):

```typescript
interface ButtonProps {
  onClick: (event: React.MouseEvent) => void;
  label: string;
}

// Arrow function parameter type
const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
  const handleClick = (event: React.MouseEvent): void => {
    console.log('Clicked');
    onClick(event);
  };
  
  return <button onClick={handleClick}>{label}</button>;
};
```

### Arrow Function vs Regular Function:

```typescript
// Arrow function - lexical 'this'
const obj1 = {
  value: 10,
  getValue: () => {
    console.log(this.value); // 'this' from outer scope
  }
};

// Regular function - own 'this'
const obj2 = {
  value: 10,
  getValue: function() {
    console.log(this.value); // 'this' from obj2
  }
};

class Counter {
  count = 0;
  
  // Arrow method - always has correct 'this'
  incrementArrow = (): void => {
    this.count++;
  };
  
  // Regular method - 'this' can change
  incrementRegular(): void {
    this.count++;
  }
}
```

---

## Complete Summary of Q8-Q15

You now understand:

✅ **`any` type** - Disable type checking (avoid)  
✅ **`unknown` type** - Type-safe alternative to any  
✅ **`never` type** - Impossible values and exhaustive checking  
✅ **Function types** - Defining parameter and return types  
✅ **Optional parameters** - Parameters that can be omitted  
✅ **Default parameters** - Parameters with default values  
✅ **Rest parameters** - Accept variable number of arguments  
✅ **Function overloading** - Multiple signatures for one function  
✅ **Arrow functions** - Modern function syntax with types  

**Continue to Q16-25 for interfaces, classes, and advanced types!** 🚀
