/*
TYPESCRIPT INTERVIEW QUESTIONS

=== BASIC CONCEPTS ===
1. What is TypeScript and how does it differ from JavaScript?
2. What are the benefits of using TypeScript?
3. What are the primitive types in TypeScript?
4. What is type inference?
5. What is type annotation?
6. What is the difference between 'interface' and 'type'?
7. What are union types and intersection types?
8. What is the 'any' type and when should you avoid it?
9. What is the 'unknown' type?
10. What is the 'never' type?

=== FUNCTIONS ===
11. How do you define function types in TypeScript?
12. What are optional parameters and default parameters?
13. What are rest parameters in TypeScript?
14. What is function overloading?
15. What are arrow functions and their type annotations?

=== INTERFACES & CLASSES ===
16. What are interfaces in TypeScript?
17. How do you extend interfaces?
18. What are optional properties in interfaces?
19. What are readonly properties?
20. What are index signatures?
21. How do you implement interfaces in classes?
22. What are access modifiers (public, private, protected)?
23. What are abstract classes?
24. What is the difference between abstract class and interface?

=== GENERICS ===
25. What are generics in TypeScript?
26. Why are generics useful?
27. How do you use generic constraints?
28. What are generic classes?
29. What are generic interfaces?
30. How do you use multiple type parameters?

=== ADVANCED TYPES ===
31. What are mapped types?
32. What are conditional types?
33. What is type narrowing (type guards)?
34. What are utility types (Partial, Required, Pick, Omit, etc.)?
35. What is the 'keyof' operator?
36. What is the 'typeof' operator?
37. What are template literal types?
38. What is the 'infer' keyword?

=== ENUMS ===
39. What are enums in TypeScript?
40. What is the difference between numeric and string enums?
41. What are const enums?

=== MODULES & NAMESPACES ===
42. What are modules in TypeScript?
43. What is the difference between modules and namespaces?
44. How do you import and export in TypeScript?

=== DECORATORS ===
45. What are decorators in TypeScript?
46. What are the different types of decorators?
47. How do you create custom decorators?

=== TYPE ASSERTIONS & TYPE GUARDS ===
48. What is type assertion?
49. What is the difference between 'as' and angle bracket syntax?
50. What are user-defined type guards?
51. What is the 'in' operator?
52. What is the 'instanceof' operator?

=== PRACTICAL QUESTIONS ===
53. How do you configure TypeScript (tsconfig.json)?
54. What is strict mode in TypeScript?
55. How does TypeScript handle null and undefined?
56. What are declaration files (.d.ts)?
57. How do you use TypeScript with React?
58. How do you handle asynchronous code in TypeScript?
59. What is the difference between 'Promises' and 'async/await' in TypeScript?
60. How do you type third-party libraries?

=== BEST PRACTICES ===
61. When should you use 'interface' vs 'type'?
62. How do you avoid using 'any' type?
63. What are some common TypeScript pitfalls?
64. How do you structure large TypeScript projects?
65. What are the performance considerations in TypeScript?
* /




/*
=== BASIC CONCEPTS - DETAILED ANSWERS ===

1. WHAT IS TYPESCRIPT AND HOW DOES IT DIFFER FROM JAVASCRIPT?
================================================================================

TypeScript is a statically-typed superset of JavaScript developed by Microsoft.
It adds optional static typing to JavaScript and compiles to plain JavaScript.

Key Differences:
- Type System: TypeScript has static typing (compile-time), JavaScript has dynamic typing (runtime)
- Error Detection: TypeScript catches errors during development, JavaScript at runtime
- Compilation: TypeScript needs compilation to JavaScript, JavaScript runs directly
- Tooling: TypeScript provides better IDE support, autocompletion, and refactoring
- Learning Curve: TypeScript has steeper learning curve due to type system
* /

// JavaScript Example
function add(a, b) {
  return a + b;
}
add(5, "10"); // Returns "510" - no error, unexpected behavior

// TypeScript Example
function add(a: number, b: number): number {
  return a + b;
}
// add(5, "10"); // Compile error: Argument of type 'string' is not assignable to parameter of type 'number'


/*
2. WHAT ARE THE BENEFITS OF USING TYPESCRIPT?
================================================================================

Benefits:
- Early Error Detection: Catches type-related errors during development
- Better IDE Support: Enhanced autocomplete, IntelliSense, and code navigation
- Code Readability: Types serve as inline documentation
- Refactoring: Safer refactoring with type checking
- Scalability: Better for large codebases and team collaboration
- Modern JavaScript Features: Access to latest ECMAScript features
- OOP Features: Support for interfaces, generics, enums, decorators
- Type Safety: Prevents common runtime errors
* /

// Example: Autocomplete and Type Safety
interface User {
  id: number;
  name: string;
  email: string;
}

function getUserInfo(user: User) {
  return `${user.name} - ${user.email}`; // IDE provides autocomplete for user properties
  // user.invalid // IDE will warn about non-existent property
}


/*
3. WHAT ARE THE PRIMITIVE TYPES IN TYPESCRIPT?
================================================================================

TypeScript has several primitive types:
- number: All numeric values (integers and floats)
- string: Text values
- boolean: true or false
- null: Intentional absence of value
- undefined: Variable declared but not assigned
- symbol: Unique identifiers (ES6)
- bigint: Large integers beyond Number.MAX_SAFE_INTEGER
- void: Absence of return value (functions)
- any: Disables type checking
- unknown: Type-safe version of any
- never: Values that never occur
* /

// Examples of Primitive Types
let age: number = 25;
let price: number = 99.99;
let name: string = "John Doe";
let isActive: boolean = true;
let notDefined: undefined = undefined;
let empty: null = null;

// Symbol
let sym: symbol = Symbol("unique");

// BigInt
let bigNumber: bigint = 9007199254740991n;

// Void - used for functions that don't return anything
function logMessage(message: string): void {
  console.log(message);
  // No return statement
}

// Arrays with primitive types
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Alice", "Bob", "Charlie"];
let flags: Array<boolean> = [true, false, true];


/*
4. WHAT IS TYPE INFERENCE?
================================================================================

Type inference is TypeScript's ability to automatically deduce and assign types
to variables without explicit type annotations. The compiler analyzes the value
assigned and infers the appropriate type.

Benefits:
- Less verbose code while maintaining type safety
- Automatic type assignment based on context
- Works with variables, function returns, and complex expressions
* /

// Type Inference Examples

// Variable inference
let inferredNumber = 42; // Type inferred as number
let inferredString = "Hello"; // Type inferred as string
let inferredBoolean = true; // Type inferred as boolean

// inferredNumber = "text"; // Error: Type 'string' is not assignable to type 'number'

// Function return type inference
function multiply(a: number, b: number) {
  return a * b; // Return type inferred as number
}

// Array inference
let mixedArray = [1, 2, 3]; // Inferred as number[]
let mixedTypes = [1, "two", 3]; // Inferred as (string | number)[]

// Object inference
let person = {
  name: "Alice",
  age: 30
}; // Inferred as { name: string; age: number; }

// Best of both type inference
const result = multiply(5, 10); // result inferred as number

// Contextual typing - type inferred from context
window.addEventListener("click", (event) => {
  console.log(event.button); // event inferred as MouseEvent
});


/*
5. WHAT IS TYPE ANNOTATION?
================================================================================

Type annotation is explicitly declaring the type of a variable, parameter, or
return value using TypeScript's type syntax. You manually specify what type
a value should have.

Syntax: variableName: type = value

When to use:
- When type inference isn't clear or specific enough
- For function parameters (always required)
- For better code documentation
- When declaring variables without initialization
* /

// Type Annotation Examples

// Variable annotations
let username: string = "john_doe";
let age: number = 25;
let isStudent: boolean = false;
let scores: number[] = [85, 90, 78];

// Without initialization
let futureValue: string;
futureValue = "assigned later";

// Function parameter and return type annotations
function greet(name: string, age: number): string {
  return `Hello ${name}, you are ${age} years old`;
}

// Object type annotation
let employee: {
  id: number;
  name: string;
  department: string;
} = {
  id: 101,
  name: "Jane Smith",
  department: "Engineering"
};

// Function type annotation
let calculate: (x: number, y: number) => number;
calculate = (a, b) => a + b;

// Union type annotation
let id: string | number;
id = 123; // Valid
id = "ABC123"; // Also valid

// Array of specific type
let usernames: string[] = ["alice", "bob", "charlie"];
let coordinates: [number, number] = [10, 20]; // Tuple annotation


/*
6. WHAT IS THE DIFFERENCE BETWEEN 'INTERFACE' AND 'TYPE'?
================================================================================

Both 'interface' and 'type' can define object shapes, but they have differences:

INTERFACE:
- Can be extended using 'extends' keyword
- Can be merged (declaration merging)
- Better for object-oriented programming
- Can only describe object shapes
- Better error messages

TYPE:
- Can use union, intersection, and mapped types
- Cannot be merged
- More flexible (primitives, unions, tuples, etc.)
- Can use computed properties
- Cannot be extended, only intersected
* /

// INTERFACE Examples

interface Animal {
  name: string;
  age: number;
}

// Interface extension
interface Dog extends Animal {
  breed: string;
  bark(): void;
}

const myDog: Dog = {
  name: "Buddy",
  age: 3,
  breed: "Labrador",
  bark() {
    console.log("Woof!");
  }
};

// Declaration Merging - interfaces with same name merge
interface User {
  name: string;
}

interface User {
  age: number;
}

// Now User has both name and age
const user: User = {
  name: "Alice",
  age: 30
};


// TYPE Examples

type Point = {
  x: number;
  y: number;
};

// Type can define primitives and unions
type ID = string | number;
type Status = "pending" | "approved" | "rejected";

// Type intersection
type Person = {
  name: string;
};

type Employee = Person & {
  employeeId: number;
  department: string;
};

const emp: Employee = {
  name: "John",
  employeeId: 101,
  department: "IT"
};

// Type can define tuples
type Coordinate = [number, number];
type RGB = [number, number, number];

// Type with unions (not possible with interface)
type Response = 
  | { success: true; data: string }
  | { success: false; error: string };

// Mapped types (only possible with type)
type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};


/*
WHEN TO USE WHICH?

Use INTERFACE when:
- Defining object shapes and contracts
- Building libraries (allows users to extend)
- Need declaration merging
- Object-oriented design

Use TYPE when:
- Need unions or intersections
- Working with primitives, tuples
- Need mapped or conditional types
- Aliasing complex types
* /


/*
7. WHAT ARE UNION TYPES AND INTERSECTION TYPES?
================================================================================

UNION TYPES:
A value can be one of several types (OR logic). Uses the | operator.
Useful when a value can have multiple possible types.

INTERSECTION TYPES:
Combines multiple types into one (AND logic). Uses the & operator.
The result has all properties of all types.
* /

// UNION TYPES Examples

// Basic union
let userId: string | number;
userId = 101; // Valid
userId = "USER_101"; // Valid
// userId = true; // Error

// Union with literal types
type Status = "active" | "inactive" | "pending";
let accountStatus: Status = "active";

// Function with union parameter
function formatId(id: string | number): string {
  if (typeof id === "string") {
    return id.toUpperCase();
  } else {
    return `ID-${id}`;
  }
}

console.log(formatId(123)); // "ID-123"
console.log(formatId("abc")); // "ABC"

// Union of object types
type SuccessResponse = {
  status: "success";
  data: any;
};

type ErrorResponse = {
  status: "error";
  message: string;
};

type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(response: ApiResponse) {
  if (response.status === "success") {
    console.log(response.data);
  } else {
    console.log(response.message);
  }
}

// Array with union types
let mixed: (string | number)[] = [1, "two", 3, "four"];


// INTERSECTION TYPES Examples

// Combining object types
type HasName = {
  name: string;
};

type HasAge = {
  age: number;
};

type Person = HasName & HasAge;

const person: Person = {
  name: "Alice",
  age: 30
  // Must have both properties
};

// More complex intersection
type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};

type User = {
  id: number;
  username: string;
};

type UserWithTimestamp = User & Timestamped;

const newUser: UserWithTimestamp = {
  id: 1,
  username: "john_doe",
  createdAt: new Date(),
  updatedAt: new Date()
};

// Intersection with multiple types
type Draggable = {
  drag(): void;
};

type Resizable = {
  resize(): void;
};

type UIWidget = Draggable & Resizable & {
  render(): void;
};

const widget: UIWidget = {
  drag() {
    console.log("Dragging...");
  },
  resize() {
    console.log("Resizing...");
  },
  render() {
    console.log("Rendering...");
  }
};


/*
8. WHAT IS THE 'ANY' TYPE AND WHEN SHOULD YOU AVOID IT?
================================================================================

The 'any' type disables all type checking for a variable. TypeScript treats
it like plain JavaScript - no type safety.

When to use 'any':
- Migrating JavaScript code to TypeScript incrementally
- Working with dynamic content from third-party libraries
- Prototyping or temporary code
- When type is truly unknowable

When to AVOID 'any':
- In production code (defeats purpose of TypeScript)
- When type can be defined (even if complex)
- When 'unknown' would be safer
- In function signatures without good reason

Problems with 'any':
- Loses all type safety
- No autocomplete or IntelliSense
- Errors only caught at runtime
- Makes code harder to maintain
* /

// BAD: Using 'any' unnecessarily
let data: any = "hello";
data = 123;
data = { name: "test" };
data.nonExistentMethod(); // No error, but will fail at runtime

function processData(input: any): any {
  return input.toUpperCase(); // No type checking
}

// GOOD: Proper typing
let data1: string = "hello";
// data1 = 123; // Error caught

function processString(input: string): string {
  return input.toUpperCase(); // Type-safe
}

// ACCEPTABLE: When migrating JS code
let legacyData: any; // Temporary during migration
// TODO: Replace with proper type

// BETTER ALTERNATIVE: Use 'unknown' instead
let userInput: unknown;
userInput = "text";
userInput = 123;

// Must check type before using
if (typeof userInput === "string") {
  console.log(userInput.toUpperCase()); // Type-safe after check
}

// Using generics instead of any
function identity<T>(arg: T): T {
  return arg;
}

const result1 = identity<string>("hello"); // Type preserved
const result2 = identity<number>(42); // Type preserved


/*
9. WHAT IS THE 'UNKNOWN' TYPE?
================================================================================

'unknown' is the type-safe counterpart of 'any'. It represents any value,
but you must perform type checking before using it.

Key differences from 'any':
- 'unknown' requires type narrowing before use
- 'any' disables type checking completely
- 'unknown' is safer and preferred

Use 'unknown' when:
- Type is not known at compile time
- Handling user input or external data
- Working with API responses
- You want type safety with flexibility
* /

// Basic 'unknown' usage
let userInput: unknown;

userInput = 5;
userInput = "hello";
userInput = { name: "Alice" };
userInput = [1, 2, 3];

// Cannot use directly - causes compile error
// let inputLength = userInput.length; // Error
// userInput.toUpperCase(); // Error

// Must narrow type first
if (typeof userInput === "string") {
  console.log(userInput.toUpperCase()); // OK - type narrowed to string
  console.log(userInput.length); // OK
}

if (typeof userInput === "number") {
  console.log(userInput.toFixed(2)); // OK - type narrowed to number
}

// Type guards with unknown
function processValue(value: unknown) {
  if (typeof value === "string") {
    return value.trim();
  }
  
  if (typeof value === "number") {
    return value * 2;
  }
  
  if (Array.isArray(value)) {
    return value.length;
  }
  
  return "Unknown type";
}

// Using with type assertion (after validation)
function parseJSON(jsonString: string): unknown {
  return JSON.parse(jsonString);
}

const data = parseJSON('{"name": "John", "age": 30}');

// Type guard before using
if (typeof data === "object" && data !== null && "name" in data) {
  console.log((data as { name: string }).name);
}

// Comparison: any vs unknown
let anyValue: any;
anyValue.foo.bar.baz; // No error, fails at runtime

let unknownValue: unknown;
// unknownValue.foo.bar.baz; // Compile error - must check type first

// Safe type checking pattern
function isUser(obj: unknown): obj is { name: string; age: number } {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "name" in obj &&
    "age" in obj &&
    typeof (obj as any).name === "string" &&
    typeof (obj as any).age === "number"
  );
}

const apiResponse: unknown = { name: "Alice", age: 25 };

if (isUser(apiResponse)) {
  console.log(apiResponse.name); // Type-safe
  console.log(apiResponse.age); // Type-safe
}



/*
10. WHAT IS THE 'NEVER' TYPE? (COMPLETED)
================================================================================

'never' represents values that never occur. It's used for:
- Functions that never return (because they always throw or loop forever)
- Unreachable code paths
- Exhaustive type checking in unions
- Conditional types where some branches are impossible

Key characteristics:
- No value can be assigned to 'never' (other than 'never' itself)
- 'never' is assignable to every other type
- No other type is assignable to 'never'
* /

// Function that never returns because it always throws
function throwError(message: string): never {
  throw new Error(message);
}

// Function that never returns because it loops forever
function runForever(): never {
  while (true) {
    // some background task
  }
}

// Variable of type never can never hold any value
let impossible: never;
// impossible = 1;         // Error
// impossible = "hello";  // Error
// impossible = null;     // Error

// --- Exhaustive checking with 'never' ---

type Shape = "circle" | "square" | "triangle";

function getShapeArea(shape: Shape): number {
  switch (shape) {
    case "circle":
      return Math.PI * 5 * 5;
    case "square":
      return 5 * 5;
    case "triangle":
      return (5 * 5) / 2;
    default: {
      // If all cases above are covered, 'shape' is 'never' here
      const _exhaustiveCheck: never = shape; // Compile-time safety
      return _exhaustiveCheck;
    }
  }
}

// If a new variant is added but not handled, TypeScript will error in 'default'
type ExtendedShape = "circle" | "square" | "triangle" | "pentagon";

function getExtendedShapeArea(shape: ExtendedShape): number {
  switch (shape) {
    case "circle":
      return Math.PI * 5 * 5;
    case "square":
      return 5 * 5;
    case "triangle":
      return (5 * 5) / 2;
    // case "pentagon": // if this is missing, default becomes 'pentagon'
    //   return 10;
    default: {
      // Now 'shape' is 'pentagon', not 'never' → TypeScript error
      const _exhaustiveCheck: never = shape; // Error forces you to handle "pentagon"
      return _exhaustiveCheck;
    }
  }
}

// --- 'never' after full narrowing ---

function handleValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else if (typeof value === "number") {
    console.log(value.toFixed(2));
  } else {
    // All cases are already handled; 'value' is 'never' here
    const _neverHere: never = value;
  }
}

// --- Conditional types producing 'never' ---

// Simple custom NonNullable
type NonNullableCustom<T> = T extends null | undefined ? never : T;

type T1 = NonNullableCustom<string | null>;          // string
type T2 = NonNullableCustom<number | undefined>;     // number
type T3 = NonNullableCustom<string | null | number>; // string | number

// Union with 'never' simplifies
type A = string | never;              // string
type B = string | number | never;     // string | number

// 'never' in generic constraints
function assertNever(x: never): never {
  throw new Error("Unexpected value: " + x);
}

type EventType = "click" | "hover";

function handleEvent(event: EventType) {
  switch (event) {
    case "click":
      console.log("Clicked");
      break;
    case "hover":
      console.log("Hovered");
      break;
    default:
      // If a new event type is added and not handled, this will fail
      assertNever(event);
  }
}


/*
11. HOW DO YOU DEFINE FUNCTION TYPES IN TYPESCRIPT?
================================================================================

In TypeScript, a function has two type aspects:
- The types of its parameters.
- The type of its return value.

You can define function types in three main ways:
1) Inline annotation on a function declaration.
2) As a function type (call signature) and reuse it.
3) As a method in an object or interface.
* /

// 1) Inline function declaration with types
function add(a: number, b: number): number {
  return a + b;
}

// 2) Function type (call signature) in a variable
let multiply: (x: number, y: number) => number;

multiply = (x, y) => x * y;

// 3) Function type in an interface
interface MathOperation {
  (x: number, y: number): number;
}

const subtract: MathOperation = (x, y) => x - y;

// 4) Function type in object properties
type Logger = {
  log: (message: string) => void;
};

const consoleLogger: Logger = {
  log(message) {
    console.log(message);
  }
};

// 5) Using type alias for reusable function signatures
type StringTransformer = (input: string) => string;

const toUpperCaseFn: StringTransformer = (input) => input.toUpperCase();


// ============================================================================
// 12. WHAT ARE OPTIONAL PARAMETERS AND DEFAULT PARAMETERS?
// ============================================================================

/*
OPTIONAL PARAMETERS:
- Marked with ? after the parameter name.
- They may be omitted when calling the function.
- They are treated as type | undefined internally.
- Optional parameters must come after required parameters.

DEFAULT PARAMETERS:
- Provide a default value in the parameter list.
- If the argument is missing or explicitly undefined, the default is used.
- They are still considered required from the type system’s perspective
  unless also marked as optional, but usually default alone is enough.
* /

// OPTIONAL PARAMETERS
function greet(name: string, greeting?: string): string {
  // greeting is string | undefined
  if (greeting) {
    return `${greeting}, ${name}!`;
  }
  return `Hello, ${name}!`;
}

greet("Alice");
greet("Bob", "Hi");

// Multiple optional parameters (must be at the end)
function createUser(
  username: string,
  email?: string,
  age?: number
) {
  return { username, email, age };
}

// DEFAULT PARAMETERS
function applyDiscount(price: number, discount: number = 0.1): number {
  // If discount is not passed, 0.1 is used.
  return price - price * discount;
}

applyDiscount(100);       // uses default 0.1
applyDiscount(100, 0.2);  // uses 0.2

// Optional + default (rarely needed, usually default alone is fine)
function printMessage(message: string = "Default message") {
  console.log(message);
}

printMessage();           // "Default message"
printMessage("Custom");   // "Custom"


// ============================================================================
// 13. WHAT ARE REST PARAMETERS IN TYPESCRIPT?
// ============================================================================

/*
Rest parameters:
- Allow a function to accept a variable number of arguments.
- Use ... before the parameter name.
- In TypeScript, rest parameters are typed as arrays of a given type.
- There can only be one rest parameter, and it must be the last one.
* /

// Basic rest parameter
function sumAll(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

sumAll(1, 2, 3);       // 6
sumAll(5, 10, 15, 20); // 50

// Rest parameter after fixed parameters
function logMessages(level: "info" | "warn" | "error", ...messages: string[]) {
  messages.forEach((msg) => {
    console.log(`[${level.toUpperCase()}] ${msg}`);
  });
}

logMessages("info", "Server started", "Listening on port 3000");

// Using tuples with rest parameters (more advanced)
function join(
  separator: string,
  ...parts: (string | number)[]
): string {
  return parts.join(separator);
}

join("-", "a", "b", "c");
join(":", 10, 20, 30);

// Strongly typed tuples
function logUserAction(...[userId, action]: [number, string]) {
  console.log(`User ${userId} performed ${action}`);
}

logUserAction(1, "login");


// ============================================================================
// 14. WHAT IS FUNCTION OVERLOADING?
// ============================================================================

/*
Function overloading:
- Allows multiple function signatures for a single function implementation.
- You declare several overload signatures (only the heads, no body).
- Then provide ONE implementation that handles all cases.
- The caller gets precise types based on which overload matches.

Rules:
- Overload signatures come first.
- The implementation signature must be compatible with all overloads.
- The implementation usually has more general types (e.g., union types).
* /

// Overload signatures
function toArray(value: number): number[];
function toArray(value: string): string[];
function toArray(value: number | string): (number | string)[] {
  if (typeof value === "number") {
    return [value];
  }
  return value.split("");
}

const numbersArray = toArray(5);     // number[]
const stringArray = toArray("abc");  // string[]

// More complex example
function format(input: string): string;
function format(input: number): string;
function format(input: Date): string;
function format(input: string | number | Date): string {
  if (typeof input === "string") {
    return input.toUpperCase();
  }
  if (typeof input === "number") {
    return input.toFixed(2);
  }
  return input.toISOString();
}

const a = format("hello");    // string
const b = format(10);         // string
const c = format(new Date()); // string

// Implementation signature is usually the "union" of overloads
// Callers see only the overloads, not the implementation signature.


// ============================================================================
// 15. WHAT ARE ARROW FUNCTIONS AND THEIR TYPE ANNOTATIONS?
// ============================================================================

/*
Arrow functions:
- Introduced in ES6, also supported in TypeScript.
- Shorter syntax compared to function keyword.
- Lexically bind 'this' (do not have their own 'this').
- Commonly used for callbacks, array methods, and functional patterns.

Type annotations for arrow functions:
- Parameter types go after the parameter list.
- Return type comes after =>, or is inferred.
- When assigning to a variable, you can:
  - Annotate the variable with a function type, or
  - Annotate parameters and/or return type inline.
* /

// Basic arrow function with type inference
const double = (x: number) => x * 2; // return type inferred as number

// Explicit parameter and return type annotation
const greetUser = (name: string): string => {
  return `Hello, ${name}`;
};

// Function type on the variable, arrow for implementation
type Comparator = (a: number, b: number) => number;

const compare: Comparator = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

// Arrow function as callback with types inferred from context
const numbers = [1, 2, 3, 4];

const squares = numbers.map((n) => n * n); // n inferred as number

// If needed, annotate explicitly
const filtered = numbers.filter((n: number) => n > 2);

// Arrow function in an interface
interface ButtonProps {
  onClick: (event: MouseEvent) => void;
}

const handleClick: ButtonProps["onClick"] = (event) => {
  console.log("Clicked at", event.clientX, event.clientY);
};

// Arrow function vs regular function in classes (lexical this)
class Counter {
  private count = 0;

  // Regular method
  increment() {
    this.count++;
  }

  // Arrow method stored as property – keeps 'this' bound to instance
  incrementAsync = () => {
    setTimeout(() => {
      this.count++; // 'this' is the Counter instance
    }, 1000);
  };
}


/*
16. WHAT ARE INTERFACES IN TYPESCRIPT?
================================================================================

- Interfaces define the shape (structure) of objects: which properties and methods they must have.
- They describe contracts for objects, functions, classes, etc.
- They are compile-time only; they do not exist in the generated JavaScript.
- They support inheritance, declaration merging, and are heavily used for typing in large codebases.
* /

interface User {
  id: number;
  name: string;
  isActive: boolean;
  login(): void;
}

const user: User = {
  id: 1,
  name: "Alice",
  isActive: true,
  login() {
    console.log("Logged in");
  }
};


/*
17. HOW DO YOU EXTEND INTERFACES?
================================================================================

- Interfaces can extend one or more other interfaces using the 'extends' keyword.
- The child interface gets all members of the parent plus its own.
- You can achieve a form of multiple inheritance by extending multiple interfaces.
* /

interface Person {
  firstName: string;
  lastName: string;
}

interface Employee extends Person {
  employeeId: number;
  department: string;
}

const emp: Employee = {
  firstName: "John",
  lastName: "Doe",
  employeeId: 101,
  department: "IT"
};

// Extending multiple interfaces
interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

interface AuditedEmployee extends Employee, Timestamps {}

const audited: AuditedEmployee = {
  firstName: "Jane",
  lastName: "Smith",
  employeeId: 102,
  department: "HR",
  createdAt: new Date(),
  updatedAt: new Date()
};


/*
18. WHAT ARE OPTIONAL PROPERTIES IN INTERFACES?
================================================================================

- Optional properties are properties that may or may not be present.
- Marked with ? after the property name.
- Their type is effectively 'T | undefined'.
- Useful when modeling partial data (e.g., API responses, configuration objects).
* /

interface Config {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE"; // optional
  timeout?: number; // optional
}

function request(config: Config) {
  const method = config.method ?? "GET";
  const timeout = config.timeout ?? 5000;
  console.log(`Requesting ${config.url} with ${method} and timeout ${timeout}`);
}

request({ url: "/api/users" });
request({ url: "/api/users", method: "POST", timeout: 10000 });

/*
- Optional properties can be omitted at creation time.
- Accessing them requires handling the possibility of 'undefined'.
* /


/*
19. WHAT ARE READONLY PROPERTIES?
================================================================================

- 'readonly' makes a property assignable only at initialization time.
- After the object is created, these properties cannot be reassigned.
- Helps enforce immutability and prevent accidental mutations.
* /

interface Point {
  readonly x: number;
  readonly y: number;
}

const p: Point = { x: 10, y: 20 };
// p.x = 5; // Error: Cannot assign to 'x' because it is a read-only property

// Readonly arrays
const nums: ReadonlyArray<number> = [1, 2, 3];
// nums.push(4); // Error: Property 'push' does not exist on type 'readonly number[]'

// Equivalent with 'readonly' modifier on array type
const coords: readonly [number, number] = [10, 20];
// coords[0] = 5; // Error


/*
20. WHAT ARE INDEX SIGNATURES?
================================================================================

- Index signatures allow typing properties whose names are not known in advance.
- Common for objects used as dictionaries or maps.
- Syntax: [key: KeyType]: ValueType
- KeyType is usually 'string' or 'number' (or 'symbol' in more advanced cases).
* /

interface StringDictionary {
  [key: string]: string;
}

const translations: StringDictionary = {
  hello: "Hola",
  goodbye: "Adiós"
};

translations["thanks"] = "Gracias";

// More specific index signature with fixed properties
interface UserSettings {
  theme: string;
  language: string;
  [key: string]: string; // all additional properties must be string values
}

const settings: UserSettings = {
  theme: "dark",
  language: "en",
  timezone: "UTC",
  region: "US"
};

// Numeric index signature (e.g., for arrays-like structures)
interface NumberArray {
  [index: number]: number;
}

const arr: NumberArray = [1, 2, 3];
const first = arr[0]; // number


/*
21. HOW DO YOU IMPLEMENT INTERFACES IN CLASSES?
================================================================================

- Classes can implement one or more interfaces using 'implements'.
- The class must provide all properties and methods declared by the interface.
- This enforces that a class conforms to a specific contract.
* /

interface Logger {
  log(message: string): void;
}

interface Identifiable {
  id: number;
}

class ConsoleLogger implements Logger, Identifiable {
  id: number;

  constructor(id: number) {
    this.id = id;
  }

  log(message: string): void {
    console.log(`[${this.id}] ${message}`);
  }
}

const logger = new ConsoleLogger(1);
logger.log("Application started");

// Using interface type for class instances
function useLogger(logger: Logger) {
  logger.log("Log from function");
}

useLogger(logger);


/*
22. WHAT ARE ACCESS MODIFIERS (PUBLIC, PRIVATE, PROTECTED)?
================================================================================

- Access modifiers control visibility of class members.

public:
- Default if no modifier is given.
- Accessible from anywhere: inside the class, subclasses, and outside.

private:
- Accessible only within the class where it's declared.
- Not accessible from subclasses or outside the class.

protected:
- Accessible within the class and its subclasses.
- Not accessible from outside instances.

These modifiers are compile-time checks in TypeScript, but also influence how
fields are emitted (e.g., #private for some targets or conventional JS fields).
* /

class PersonClass {
  public name: string;       // can be accessed anywhere
  private age: number;       // only inside PersonClass
  protected email: string;   // inside PersonClass and subclasses

  constructor(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
  }

  public getInfo(): string {
    // Can access all members here
    return `${this.name}, ${this.age}, ${this.email}`;
  }

  private getAge(): number {
    return this.age;
  }
}

class EmployeeClass extends PersonClass {
  public role: string;

  constructor(name: string, age: number, email: string, role: string) {
    super(name, age, email);
    this.role = role;
  }

  public getEmployeeInfo(): string {
    // this.name → OK (public)
    // this.age  → Error (private in base)
    // this.email → OK (protected, accessible in subclass)
    return `${this.name}, ${this.role}, ${this.email}`;
  }
}

const personObj = new PersonClass("Alice", 30, "alice@example.com");
console.log(personObj.name);      // OK
// console.log(personObj.age);    // Error: private
// console.log(personObj.email);  // Error: protected


/*
23. WHAT ARE ABSTRACT CLASSES?
================================================================================

- Abstract classes are base classes that cannot be instantiated directly.
- Declared with the 'abstract' keyword.
- Can contain:
  - Abstract methods (no implementation, must be implemented in subclasses).
  - Concrete methods (with implementation).
  - Fields (with or without default values).
- Used when there is shared functionality plus required methods for subclasses.
* /

abstract class Shape {
  abstract getArea(): number; // must be implemented by subclasses

  constructor(public color: string) {}

  describe(): string {
    return `A ${this.color} shape`;
  }
}

class Circle extends Shape {
  constructor(color: string, public radius: number) {
    super(color);
  }

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(color: string, public width: number, public height: number) {
    super(color);
  }

  getArea(): number {
    return this.width * this.height;
  }
}

// const s = new Shape("red"); // Error: Cannot create an instance of an abstract class
const c = new Circle("blue", 5);
const r = new Rectangle("green", 10, 20);

console.log(c.getArea());
console.log(r.describe());


/*
24. DIFFERENCE BETWEEN ABSTRACT CLASS AND INTERFACE
================================================================================

HIGH-LEVEL DIFFERENCES:

1) Purpose:
   - Interface: Describes a contract (shape) without implementation.
   - Abstract Class: Base class with both contracts and shared implementation.

2) Implementation:
   - Interface: Cannot contain implementation (only type declarations).
   - Abstract Class: Can have implemented methods, fields, constructors.

3) Inheritance / Implementation Count:
   - Class can implement multiple interfaces.
   - Class can extend only one abstract (or concrete) class.

4) Members:
   - Interface: No access modifiers in older TS; mainly public shape, no state.
   - Abstract Class: Can have fields, access modifiers, constructors, concrete + abstract methods.

5) Instantiation:
   - Interface: No runtime representation; completely erased at compile time.
   - Abstract Class: Exists at runtime (compiled to JS), but cannot be instantiated directly.

EXAMPLES:
* /

// Interface example
interface Flyable {
  fly(): void;
}

interface Runnable {
  run(): void;
}

class Bird implements Flyable, Runnable {
  fly() {
    console.log("Bird is flying");
  }
  run() {
    console.log("Bird is running");
  }
}

// Abstract class example
abstract class AnimalBase {
  constructor(public name: string) {}

  abstract makeSound(): void; // must be implemented

  move() {
    console.log(`${this.name} is moving`);
  }
}

class Dog extends AnimalBase {
  makeSound() {
    console.log("Woof!");
  }
}

const dog = new Dog("Buddy");
dog.move();      // from abstract base class
dog.makeSound(); // implemented in Dog

/*
WHEN TO USE WHICH?

Use INTERFACE when:
- You need to describe a shape or contract.
- You don't need shared implementation.
- You want something lightweight and purely structural.
- You expect many unrelated classes/objects to implement it.

Use ABSTRACT CLASS when:
- You have shared logic that should be reused.
- You want to force subclasses to implement certain methods.
- You need fields, constructors, and access modifiers in the base.
* /


/*
25. WHAT ARE GENERICS IN TYPESCRIPT?
================================================================================

- Generics let you create reusable components that work with many types instead of a single one.
- They are like type variables: you pass types as parameters to functions, classes, or interfaces.
- Syntax uses angle brackets: <T>, <T, U>, etc.
* /

function identity<T>(value: T): T {
  return value;
}

const numResult = identity<number>(42);
const strResult = identity("hello"); // type inferred as string

// Generic function with array
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const firstNum = firstElement([1, 2, 3]);        // T inferred as number
const firstStr = firstElement(["a", "b", "c"]);  // T inferred as string


/*
26. WHY ARE GENERICS USEFUL?
================================================================================

Generics are useful because they:
- Provide reusability: One implementation works for many types.
- Preserve type information: Input and output types are linked.
- Improve type safety: Prevents 'any' and catches errors at compile time.
- Enhance IDE support: Better IntelliSense and autocompletion.

Without generics (using any):
- You lose type information and safety.

With generics:
- The compiler knows the actual types and enforces correct usage.
* /

// Without generics - using any (unsafe)
function wrapAny(value: any): any {
  return { value };
}

const wrapped1 = wrapAny("hello");
wrapped1.value.toFixed(); // runtime error, but no compile-time error

// With generics (safe)
function wrap<T>(value: T): { value: T } {
  return { value };
}

const wrapped2 = wrap("hello");
wrapped2.value.toUpperCase(); // OK, value is string

const wrapped3 = wrap(123);
wrapped3.value.toFixed(2); // OK, value is number


/*
27. HOW DO YOU USE GENERIC CONSTRAINTS?
================================================================================

- Generic constraints restrict what types can be used as generic arguments.
- Use the 'extends' keyword to specify the constraint.
- Common use: enforce that T has certain properties or implements some shape.
* /

interface HasLength {
  length: number;
}

// T must have a 'length' property
function logLength<T extends HasLength>(item: T): void {
  console.log("Length:", item.length);
}

logLength("hello");        // string has length
logLength([1, 2, 3]);      // array has length
logLength({ length: 10 }); // object with length works
// logLength(123);         // Error: number does not have length

// Constraining to specific object shape
interface User {
  id: number;
  name: string;
}

function getUserName<T extends User>(user: T): string {
  return user.name;
}

getUserName({ id: 1, name: "Alice" });

// Constrain to keys of another type
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "John", age: 30 };
const nameValue = getProperty(person, "name"); // type is string
// getProperty(person, "email"); // Error: "email" is not a key of person


/*
28. WHAT ARE GENERIC CLASSES?
================================================================================

- Generic classes are classes parameterized by one or more type variables.
- They allow class instances to be strongly typed based on the generic arguments.
- You define generics on the class name: class Box<T> { ... }
* /

class Box<T> {
  // T is used for property and methods
  private _value: T;

  constructor(value: T) {
    this._value = value;
  }

  get value(): T {
    return this._value;
  }

  set value(newValue: T) {
    this._value = newValue;
  }
}

const numberBox = new Box<number>(123);
numberBox.value = 456;
// numberBox.value = "abc"; // Error: string not assignable to number

const stringBox = new Box("hello"); // T inferred as string
stringBox.value = "world";


// Generic class with constraints
interface Identifiable {
  id: number;
}

class Repository<T extends Identifiable> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  findById(id: number): T | undefined {
    return this.items.find((item) => item.id === id);
  }
}

type Product = { id: number; name: string };

const productRepo = new Repository<Product>();
productRepo.add({ id: 1, name: "Laptop" });
const found = productRepo.findById(1);


/*
29. WHAT ARE GENERIC INTERFACES?
================================================================================

- Generic interfaces are interfaces with type parameters.
- They let you describe reusable structures that depend on types passed in.
* /

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

type UserProfile = {
  id: number;
  username: string;
};

const userResponse: ApiResponse<UserProfile> = {
  data: { id: 1, username: "alice" },
  status: 200,
  message: "OK"
};

const stringResponse: ApiResponse<string> = {
  data: "simple string data",
  status: 200,
  message: "OK"
};

// Generic interface for collections
interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

const usersPage: PaginatedResult<UserProfile> = {
  items: [{ id: 1, username: "alice" }],
  total: 1,
  page: 1,
  pageSize: 10
};


// Generic interface with function types
interface Mapper<TInput, TOutput> {
  (input: TInput): TOutput;
}

const numberToString: Mapper<number, string> = (n) => n.toString();
const stringToNumber: Mapper<string, number> = (s) => parseFloat(s);


/*
30. HOW DO YOU USE MULTIPLE TYPE PARAMETERS? (COMPLETED)
================================================================================

You can use multiple type parameters when a generic needs to relate or transform
more than one type at the same time (for example, mapping from one type to another,
or pairing two different types together). These parameters are usually written as
<T, U>, <T, U, V>, etc., and each of them can participate in constraints,
return types, parameter types, and object shapes.

Below are some extended, practical patterns for multiple type parameters.
* /


// 1) BASIC MULTI-TYPE PARAMETER FUNCTION
// --------------------------------------
// Create a tuple that combines two possibly different types.
function makePair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const pair1 = makePair<number, string>(1, "one");
const pair2 = makePair(true, { id: 1, name: "Alice" }); // inferred: [boolean, { id: number; name: string }]


// 2) MULTIPLE TYPE PARAMETERS IN INTERFACES
// ----------------------------------------
// Key-value pair interface with generic key and value.
interface KeyValue<K, V> {
  key: K;
  value: V;
}

const kvNumberString: KeyValue<number, string> = {
  key: 1,
  value: "one"
};

const kvStringBoolean: KeyValue<string, boolean> = {
  key: "isActive",
  value: true
};


// 3) MULTIPLE TYPE PARAMETERS IN CLASSES
// -------------------------------------
// A generic dictionary that maps keys of type K to values of type V.
class Dictionary<K, V> {
  private items = new Map<K, V>();

  set(key: K, value: V): void {
    this.items.set(key, value);
  }

  get(key: K): V | undefined {
    return this.items.get(key);
  }

  delete(key: K): boolean {
    return this.items.delete(key);
  }

  has(key: K): boolean {
    return this.items.has(key);
  }
}

const stringNumberDict = new Dictionary<string, number>();
stringNumberDict.set("one", 1);
stringNumberDict.set("two", 2);
const oneValue = stringNumberDict.get("one"); // number | undefined


// 4) MULTIPLE TYPE PARAMETERS WITH CONSTRAINTS
// -------------------------------------------
// K must be a valid key of T.
function pluck<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map((key) => obj[key]);
}

const user = { id: 1, name: "Alice", age: 30 };
const names = pluck(user, ["name"]);        // type: string[]
const idAndAge = pluck(user, ["id", "age"]); // type: (number)[]


// 5) GENERIC TRANSFORM FUNCTION USING TWO TYPE PARAMETERS
// ------------------------------------------------------
// Map an array of TInput to an array of TOutput.
function mapArray<TInput, TOutput>(
  items: TInput[],
  mapper: (item: TInput, index: number) => TOutput
): TOutput[] {
  return items.map(mapper);
}

const nums = [1, 2, 3];
const labels = mapArray<number, string>(nums, (n, i) => `#${i}:${n}`);


// 6) RELATING MULTIPLE GENERICS IN A TYPE
// --------------------------------------
// TEntity is the main entity type, TId is a subset of its property types.
interface Repository<TEntity, TId> {
  findById(id: TId): TEntity | null;
  save(entity: TEntity): void;
}

type Post = {
  id: string;
  title: string;
};

class PostRepository implements Repository<Post, string> {
  private posts: Post[] = [];

  findById(id: string): Post | null {
    return this.posts.find((p) => p.id === id) ?? null;
  }

  save(post: Post): void {
    this.posts.push(post);
  }
}


// 7) GENERIC COMPOSITION TYPES
// ----------------------------
// Relate source type S and subset type P using two type parameters.
type PickProps<S, K extends keyof S> = {
  [P in K]: S[P];
};

type UserInfo = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
};

type PublicUserInfo = PickProps<UserInfo, "id" | "name">;
// PublicUserInfo => { id: number; name: string; }


// 8) FUNCTION RETURNING A GENERIC MAPPED OVER TWO TYPES
// -----------------------------------------------------
// Convert keys of one type to values of another with constraints.
function createRecord<K extends string | number | symbol, V>(
  entries: [K, V][]
): Record<K, V> {
  const result: Partial<Record<K, V>> = {};
  for (const [key, value] of entries) {
    result[key] = value;
  }
  return result as Record<K, V>;
}

const rolePermissions = createRecord<string, string[]>([
  ["admin", ["read", "write", "delete"]],
  ["user", ["read"]]
]);

/*
SUMMARY:
- Multiple type parameters (<T, U, ...>) let you link several types together.
- They are heavily used in:
  - Tuple and pair utilities.
  - Collections (e.g., Dictionary<K, V>, Map<K, V>).
  - Transform functions (map, pluck, bindProperty).
  - Relationship modeling (Repository<TEntity, TId>).
* /


/*
31. WHAT ARE MAPPED TYPES?
================================================================================

- Mapped types create new types by transforming each property of an existing type.
- They iterate over a set of property keys (usually keyof T) and apply modifiers or new types.
- Syntax: { [K in Keys]: SomeTransformation<T[K]> }

Basic mapped type:
* /

type ReadonlyUser<T> = {
  readonly [K in keyof T]: T[K];
};

type User = {
  id: number;
  name: string;
  active: boolean;
};

type ReadonlyUserExample = ReadonlyUser<User>;
/*
ReadonlyUserExample is:
{
  readonly id: number;
  readonly name: string;
  readonly active: boolean;
}
* /

// Adding optional modifier via mapping
type Optional<T> = {
  [K in keyof T]?: T[K];
};

type PartialUser = Optional<User>;
/*
PartialUser is:
{
  id?: number;
  name?: string;
  active?: boolean;
}
* /


/*
32. WHAT ARE CONDITIONAL TYPES?
================================================================================

- Conditional types choose one of two types based on a condition on type parameters.
- Syntax: T extends U ? X : Y
- They are evaluated at compile time and allow powerful type logic.

Basic conditional type:
* /

type IsNumber<T> = T extends number ? "number" : "not-number";

type A1 = IsNumber<number>;  // "number"
type A2 = IsNumber<string>;  // "not-number"

// Conditional type for extracting element type from an array
type ElementType<T> = T extends (infer U)[] ? U : T;

type E1 = ElementType<string[]>;   // string
type E2 = ElementType<number[]>;   // number
type E3 = ElementType<boolean>;    // boolean

// Conditional with unions is distributive over naked T
type Nullable<T> = T | null | undefined;
type NonNullableCustom<T> = T extends null | undefined ? never : T;

type N1 = NonNullableCustom<string | null>;        // string
type N2 = NonNullableCustom<number | undefined>;   // number
type N3 = NonNullableCustom<string | null | 0>;    // string | 0


/*
33. WHAT IS TYPE NARROWING (TYPE GUARDS)?
================================================================================

- Type narrowing is the process where TypeScript refines a variable’s type based on runtime checks.
- Type guards are expressions that check the runtime shape or type and tell the compiler to narrow.

Common type guards:
- typeof
- instanceof
- 'in' operator
- User-defined type predicates
* /

function printId(id: string | number) {
  if (typeof id === "string") {
    // Here id is string
    console.log(id.toUpperCase());
  } else {
    // Here id is number
    console.log(id.toFixed(2));
  }
}

class Animal {
  speak() {}
}
class Dog extends Animal {
  bark() {}
}

function handleAnimal(a: Animal) {
  if (a instanceof Dog) {
    // a is Dog
    a.bark();
  } else {
    // a is Animal
    a.speak();
  }
}

// 'in' operator guard
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    animal.swim(); // Fish
  } else {
    animal.fly(); // Bird
  }
}

// User-defined type predicate
type Cat = { meow: () => void };

function isCat(animal: any): animal is Cat {
  return typeof animal.meow === "function";
}

function handlePet(pet: Cat | Dog) {
  if (isCat(pet)) {
    pet.meow(); // pet is Cat
  } else {
    pet.bark(); // pet is Dog
  }
}


/*
34. WHAT ARE UTILITY TYPES (PARTIAL, REQUIRED, PICK, OMIT, ETC.)?
================================================================================

- Utility types are built-in generic types that perform common type transformations.

Some core ones:

1) Partial<T>
   - Makes all properties of T optional.
* /

interface Profile {
  id: number;
  name: string;
  email: string;
  age?: number;
}

type PartialProfile = Partial<Profile>;
/*
{
  id?: number;
  name?: string;
  email?: string;
  age?: number;
}
* /

// 2) Required<T>
//    - Makes all properties of T required (removes optional ?).
type RequiredProfile = Required<Profile>;
/*
{
  id: number;
  name: string;
  email: string;
  age: number;
}
* /

// 3) Readonly<T>
//    - Makes all properties of T readonly.
type ReadonlyProfile = Readonly<Profile>;

// 4) Pick<T, K>
//    - Picks a subset of properties K from T.
type PublicProfile = Pick<Profile, "id" | "name">;
/*
{
  id: number;
  name: string;
}
* /

// 5) Omit<T, K>
//    - Creates a type with all properties of T except K.
type PrivateProfile = Omit<Profile, "email">;
/*
{
  id: number;
  name: string;
  age?: number;
}
* /

// 6) Record<K, T>
//    - Creates an object type with keys K and values T.
type Role = "admin" | "user" | "guest";
type Permissions = Record<Role, string[]>;

const perms: Permissions = {
  admin: ["read", "write", "delete"],
  user: ["read"],
  guest: []
};

// 7) Exclude<T, U>
//    - Excludes from T all members that are assignable to U.
type Letters = "a" | "b" | "c";
type Excluded = Exclude<Letters, "b">; // "a" | "c"

// 8) Extract<T, U>
//    - Extracts from T all members that are assignable to U.
type OnlyB = Extract<Letters, "b">; // "b"

// 9) NonNullable<T>
//    - Removes null and undefined from T.
type MaybeString = string | null | undefined;
type StrictString = NonNullable<MaybeString>; // string


/*
35. WHAT IS THE 'KEYOF' OPERATOR?
================================================================================

- 'keyof' produces a union of property names (keys) of a type.
- It is used to refer to property names in a type-safe way.
* /

type Person = {
  id: number;
  name: string;
  age: number;
};

type PersonKeys = keyof Person; // "id" | "name" | "age"

function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person: Person = { id: 1, name: "Alice", age: 30 };
const nameValue = getProp(person, "name"); // string
// getProp(person, "email"); // Error: "email" not in keyof Person


/*
36. WHAT IS THE 'TYPEOF' OPERATOR?
================================================================================

- At runtime (JavaScript), 'typeof' returns a string describing the type of a value: "string", "number", etc.
- In TypeScript’s type system, 'typeof' is used to capture the static type of a variable or value and reuse it.

Runtime typeof (JS):
* /

const value = 42;
if (typeof value === "number") {
  // runtime check
}

// Type-level typeof (TS):
const config = {
  url: "/api/users",
  timeout: 5000,
  withCredentials: true
};

type ConfigType = typeof config;
/*
ConfigType is:
{
  url: string;
  timeout: number;
  withCredentials: boolean;
}
* /

const anotherConfig: ConfigType = {
  url: "/api/posts",
  timeout: 3000,
  withCredentials: false
};


/*
37. WHAT ARE TEMPLATE LITERAL TYPES?
================================================================================

- Template literal types build new string types by combining unions and string literals using a template syntax.
- Similar to JavaScript template strings, but at type level.
* /

type EventName = "click" | "hover" | "submit";

type EventHandlerName = `on${Capitalize<EventName>}`;
/*
EventHandlerName is:
"onClick" | "onHover" | "onSubmit"
* /

type Size = "small" | "medium" | "large";
type Color = "red" | "blue";

type Variant = `${Size}-${Color}`;
/*
Variant is:
"small-red" | "small-blue" |
"medium-red" | "medium-blue" |
"large-red" | "large-blue"
* /

function setVariant(variant: Variant) {
  console.log("Variant:", variant);
}

setVariant("small-red");
// setVariant("extra-large-red"); // Error

// Template literals with unions:
type ApiRoute = `/api/${"users" | "posts" | "comments"}`;
// "/api/users" | "/api/posts" | "/api/comments"


/*
38. WHAT IS THE 'INFER' KEYWORD?
================================================================================

- 'infer' is used inside conditional types to capture a type from a position in another type.
- It lets you "pull out" a type parameter from something more complex.
- Commonly used in helper types like ReturnType, Parameters, etc.

Basic example: infer return type of a function
* /

type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type F1 = (a: number) => string;
type F2 = (a: string, b: boolean) => Promise<number>;

type R1 = MyReturnType<F1>; // string
type R2 = MyReturnType<F2>; // Promise<number>

// Infer element type from array
type ElementOf<T> = T extends (infer U)[] ? U : T;

type Arr1 = string[];
type Arr2 = number[];

type EArr1 = ElementOf<Arr1>; // string
type EArr2 = ElementOf<Arr2>; // number

// Infer tuple parameter types
type MyParameters<T> = T extends (...args: infer P) => any ? P : never;

type Params1 = MyParameters<(x: number, y: string) => void>; // [number, string]

// Infer promise resolved type
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type P1 = UnwrapPromise<Promise<string>>; // string
type P2 = UnwrapPromise<number>;         // number

/*
- 'infer' can only be used in the "true" branch of a conditional type.
- It enables powerful meta-programming over types (extracting, transforming, reusing).
* /


/*
=== ENUMS ===

39. WHAT ARE ENUMS IN TYPESCRIPT?
================================================================================

Enums (short for enumerations) are a TypeScript feature that allows you to define
a set of named constants [web:13]. They provide a way to give friendly names to
numeric or string values, making code more readable and maintainable [web:18].

Enums create both a type and a value that can be used at runtime [web:11].
The values of enum members cannot be modified or reassigned after creation [web:18].
* /

// Basic numeric enum
enum Direction {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right    // 3
}

let move: Direction = Direction.Up;
console.log(move); // 0

// String enum
enum Status {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED"
}

let orderStatus: Status = Status.Pending;
console.log(orderStatus); // "PENDING"

// Using enums in functions
function navigate(direction: Direction) {
  switch (direction) {
    case Direction.Up:
      console.log("Moving up");
      break;
    case Direction.Down:
      console.log("Moving down");
      break;
    case Direction.Left:
      console.log("Moving left");
      break;
    case Direction.Right:
      console.log("Moving right");
      break;
  }
}

navigate(Direction.Left);


/*
40. WHAT IS THE DIFFERENCE BETWEEN NUMERIC AND STRING ENUMS?
================================================================================

NUMERIC ENUMS:
- Default enum type in TypeScript
- Members are auto-incremented starting from 0 (or specified value) [web:15]
- Can have custom numeric initializers
- Support reverse mapping (value to name lookup)

STRING ENUMS:
- Provide readable values for enum members using string constants [web:15]
- Each member must be explicitly initialized with a string literal
- No auto-increment behavior
- No reverse mapping
- Better for debugging (meaningful values in logs)
* /

// NUMERIC ENUM EXAMPLES
enum NumericStatus {
  Inactive,     // 0
  Active,       // 1
  Suspended     // 2
}

// Custom starting value
enum HttpStatus {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404
}

// Reverse mapping (numeric enums only)
console.log(NumericStatus[0]); // "Inactive"
console.log(NumericStatus.Active); // 1

// STRING ENUM EXAMPLES
enum LogLevel {
  Info = "INFO",
  Warning = "WARNING",
  Error = "ERROR",
  Debug = "DEBUG"
}

// No reverse mapping for string enums
console.log(LogLevel.Info); // "INFO"
// console.log(LogLevel["INFO"]); // undefined (no reverse mapping)

// MIXED ENUM (not recommended but possible)
enum MixedEnum {
  No = 0,
  Yes = "YES"
}

/*
WHEN TO USE WHICH:

Use NUMERIC ENUMS when:
- Order or numeric values matter
- Need reverse mapping
- Working with flags or bit fields

Use STRING ENUMS when:
- Need readable/debuggable values [web:15]
- Values will be serialized (JSON, logs)
- Better for API responses
* /


/*
41. WHAT ARE CONST ENUMS?
================================================================================

Const enums are enums declared with the 'const' modifier [web:15].
They are completely removed during compilation and their values are inlined
at use sites [web:15]. This means const enum members are directly replaced
with their literal values in the compiled JavaScript.

Benefits:
- No JavaScript code generated for the enum itself
- Smaller bundle size
- Better performance (no runtime lookup)

Limitations:
- Cannot have computed members [web:15]
- Cannot be used where runtime enum object is needed
- No reverse mapping
* /

// Regular enum (generates JavaScript object)
enum RegularColor {
  Red,
  Green,
  Blue
}

let color1 = RegularColor.Red;
// Compiled JS: let color1 = RegularColor.Red;

// Const enum (values inlined, no JS object)
const enum ConstColor {
  Red,
  Green,
  Blue
}

let color2 = ConstColor.Red;
// Compiled JS: let color2 = 0; (inlined value)

// String const enum
const enum Environment {
  Development = "DEV",
  Staging = "STAGING",
  Production = "PROD"
}

let env = Environment.Production;
// Compiled JS: let env = "PROD";

// Cannot use computed values in const enums
const enum InvalidEnum {
  // Error: const enums can only use constant expressions
  // Value = Math.random()
}

/*
WHEN TO USE CONST ENUMS:

Use CONST ENUMS when:
- You want smallest possible bundle size
- Values are truly constant (compile-time)
- You don't need runtime enum object
- Not exporting from a library (can cause issues)

Avoid CONST ENUMS when:
- Need to iterate over enum values at runtime
- Exporting from a library/package
- Need reverse mapping
* /


/*
=== MODULES & NAMESPACES ===

42. WHAT ARE MODULES IN TYPESCRIPT?
================================================================================

Modules are TypeScript/JavaScript files that export and import code [web:16].
They are the preferred way to organize code in modern TypeScript applications [web:16].

Each file with top-level import or export is considered a module [web:19].
Modules have their own scope (not global) and support dependency management.

Benefits:
- Better code organization
- Encapsulation
- Tree-shaking support (remove unused code)
- Better tooling support [web:16]
- Standard ES module syntax
* /

// math.ts - exporting from a module
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export const PI = 3.14159;

// app.ts - importing from a module
// import { add, subtract, PI } from './math';
// console.log(add(5, 3));

// Default export
// calculator.ts
export default class Calculator {
  multiply(a: number, b: number): number {
    return a * b;
  }
}

// app.ts
// import Calculator from './calculator';
// const calc = new Calculator();


/*
43. WHAT IS THE DIFFERENCE BETWEEN MODULES AND NAMESPACES?
================================================================================

MODULES:
- File-based organization (each file is a module)
- Use import/export syntax (ES6 standard)
- Better tree-shaking and bundling [web:16]
- Modern, preferred approach [web:16][web:19]
- Automatic scope isolation
- Better for large-scale applications [web:19]

NAMESPACES:
- Internal module system (TypeScript-specific)
- Organize code in global scope [web:19]
- Use namespace keyword
- Useful for declaration merging [web:16]
- Legacy approach, still useful for specific scenarios [web:16]
- Good for organizing libraries/frameworks in global scope [web:19]
* /

// MODULES EXAMPLE (preferred)

// userService.ts
export interface User {
  id: number;
  name: string;
}

export class UserService {
  getUser(id: number): User {
    return { id, name: "Alice" };
  }
}

// app.ts
// import { UserService } from './userService';
// const service = new UserService();


// NAMESPACES EXAMPLE (legacy/specific use cases)

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

// Usage (same file or after /// <reference path="..." />)
const emailValidator = new Validation.EmailValidator();
console.log(emailValidator.isValid("test@example.com"));

/*
KEY DIFFERENCES SUMMARY [web:16][web:19]:

| Aspect | Modules | Namespaces |
|--------|---------|------------|
| Organization | File-based | Within file/global |
| Syntax | import/export | namespace keyword |
| Scope | Automatic isolation | Global scope |
| Standard | ES6 standard | TypeScript-specific |
| Tooling | Better support | Limited |
| Use Case | Modern apps | Legacy/libraries |

WHEN TO USE WHICH:

Use MODULES (preferred):
- Modern TypeScript/JavaScript projects
- Large-scale applications [web:19]
- When using bundlers (webpack, vite, etc.)
- Library packages (npm)

Use NAMESPACES:
- Legacy codebases
- Global libraries [web:16]
- Declaration merging scenarios
- Simple scripts without build tools
* /


/*
44. HOW DO YOU IMPORT AND EXPORT IN TYPESCRIPT?
================================================================================

TypeScript uses ES6 module syntax for import and export.
Multiple ways to export and import based on your needs.
* /

// ===== EXPORTS =====

// Named exports (multiple per file)
// file: utilities.ts
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

// Export list
function helper1() {}
function helper2() {}
// export { helper1, helper2 };

// Export with rename
function internalName() {}
// export { internalName as publicName };

// Re-export from another module
// export { something } from './otherModule';
// export * from './otherModule'; // re-export all

// Default export (one per file)
// file: Logger.ts
export default class Logger {
  log(message: string) {
    console.log(message);
  }
}

// Or
class Database {}
// export default Database;


// ===== IMPORTS =====

// Named imports
// import { formatDate, capitalize } from './utilities';
// import { Config } from './utilities';

// Import with rename
// import { formatDate as format } from './utilities';

// Import all as namespace
// import * as Utils from './utilities';
// Utils.formatDate(new Date());

// Default import
// import Logger from './Logger';
// const logger = new Logger();

// Mix default and named imports
// import Logger, { Config } from './Logger';

// Side-effect import (runs code without importing anything)
// import './polyfills';

// Dynamic import (async)
// async function loadModule() {
//   const module = await import('./utilities');
//   module.formatDate(new Date());
// }

// Type-only imports (TypeScript 3.8+)
// import type { Config } from './utilities';
// import { type User, createUser } from './user';


/*
=== DECORATORS ===

45. WHAT ARE DECORATORS IN TYPESCRIPT?
================================================================================

Decorators are special declarations that can be attached to classes, methods,
properties, accessors, or parameters [web:17][web:20].
They provide a way to add annotations and modify class behavior [web:17].

Decorators use the @expression syntax where expression evaluates to a function
that will be called at runtime with information about the decorated item [web:20].

Note: Decorators are an experimental feature - enable in tsconfig.json:
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
* /

// Simple decorator example
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


/*
46. WHAT ARE THE DIFFERENT TYPES OF DECORATORS?
================================================================================

TypeScript supports five types of decorators [web:17][web:20]:

1. Class Decorators - Modify or observe a class [web:17]
2. Method Decorators - Modify how a method works [web:17]
3. Property Decorators - Add behavior or rules to properties [web:17]
4. Accessor Decorators - Add functionality to getters/setters [web:17]
5. Parameter Decorators - Add behavior to method parameters [web:17]
* /

// 1. CLASS DECORATOR
// Signature: (constructor: Function) => void [web:20]
function frozen(constructor: Function) {
  Object.freeze(constructor);
  Object.freeze(constructor.prototype);
}

@frozen
class ImmutableClass {
  name = "Test";
}


// 2. METHOD DECORATOR
// Signature: (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void [web:20]
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${propertyKey} with args:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Result:`, result);
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


// 3. PROPERTY DECORATOR
// Signature: (target: any, propertyKey: string) => void [web:20]
function readonly(target: any, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    writable: false
  });
}

class Person {
  @readonly
  name = "John";
}


// 4. ACCESSOR DECORATOR
// Applied to getter/setter [web:17]
function enumerable(value: boolean) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value;
  };
}

class Product {
  private _price: number = 0;

  @enumerable(false)
  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }
}


// 5. PARAMETER DECORATOR
// Signature: (target: any, propertyKey: string, parameterIndex: number) => void [web:20]
function validate(target: any, propertyKey: string, parameterIndex: number) {
  console.log(`Parameter in ${propertyKey} at index ${parameterIndex}`);
}

class Greeter {
  greet(@validate message: string): string {
    return `Hello, ${message}`;
  }
}


/*
47. HOW DO YOU CREATE CUSTOM DECORATORS?
================================================================================

Custom decorators are functions that follow specific signatures based on
what they decorate [web:20]. They can be simple functions or decorator factories
(functions that return decorator functions).
* /

// DECORATOR FACTORY (with parameters)
// Returns a decorator function
function component(options: { selector: string; template: string }) {
  return function(constructor: Function) {
    console.log("Component created with:", options);
    // Add metadata or modify constructor
    (constructor as any).selector = options.selector;
    (constructor as any).template = options.template;
  };
}

@component({
  selector: "app-root",
  template: "<div>Hello</div>"
})
class AppComponent {}


// METHOD DECORATOR WITH PARAMETERS
function timeout(milliseconds: number) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function(...args: any[]) {
      return Promise.race([
        originalMethod.apply(this, args),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Timeout")), milliseconds)
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


// PROPERTY DECORATOR WITH VALIDATION
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

class UserModel {
  @required
  username: string;
  
  @required
  email: string;
}


// MULTIPLE DECORATORS (executed bottom to top)
function first() {
  console.log("first(): factory");
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("first(): called");
  };
}

function second() {
  console.log("second(): factory");
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("second(): called");
  };
}

class ExampleClass {
  @first()
  @second()
  method() {}
}

// Output:
// first(): factory
// second(): factory
// second(): called
// first(): called


/*
48. WHAT IS TYPE ASSERTION?
================================================================================

- Type assertion tells TypeScript to treat a value as a specific type.
- It does NOT change the runtime value, only the compile-time type.
- Useful when the developer knows more about the type than the compiler.
- Does not perform any runtime checks; unsafe if used incorrectly.

Two main syntaxes:
- value as SomeType
- <SomeType>value  (not recommended in JSX/TSX)

Examples:
* /

let someValue: unknown = "Hello TypeScript";

// Assert as string
let strLength = (someValue as string).length;

// DOM example
const el = document.getElementById("app");
// el is HTMLElement | null
const divEl = el as HTMLDivElement; // assert more specific type

// Narrowing from union
type ApiResponse = string | number;

function handleResponse(res: ApiResponse) {
  if (typeof res === "string") {
    const upper = (res as string).toUpperCase();
    console.log(upper);
  }
}

// Dangerous assertion (avoid)
const num = "123" as unknown as number; // compiles, but incorrect at runtime


/*
49. WHAT IS THE DIFFERENCE BETWEEN 'AS' AND ANGLE BRACKET SYNTAX?
================================================================================

TypeScript supports two assertion syntaxes:

1) 'as' syntax:
   value as Type

2) Angle bracket syntax:
   <Type>value

Differences:
- Behavior is the same in TypeScript (both are compile-time only).
- Angle bracket syntax conflicts with JSX syntax, so 'as' is recommended in React/TSX.
- Style-wise, 'as' is preferred in modern TypeScript codebases.

Examples:
* /

let value: unknown = "text";

// 'as' syntax (recommended)
let len1 = (value as string).length;

// Angle bracket syntax (NOT for .tsx / JSX)
let len2 = (<string>value).length;

// In JSX/TSX files, only 'as' is allowed:
// const element = (<div>Hi</div>); // JSX, so <Type> would be ambiguous
// const length = (value as string).length; // safe in TSX


/*
50. WHAT ARE USER-DEFINED TYPE GUARDS?
================================================================================

- User-defined type guards are functions that return a special boolean type predicate:
  parameterName is SomeType
- They allow you to encode runtime checks that inform the compiler about a more specific type.
- Inside an if block using such a guard, TypeScript narrows the type accordingly.

Syntax:
function isX(arg: any): arg is X { ... }

Examples:
* /

type Cat = { meow: () => void };
type Dog = { bark: () => void };

function isCat(pet: Cat | Dog): pet is Cat {
  return (pet as Cat).meow !== undefined;
}

function makeSound(pet: Cat | Dog) {
  if (isCat(pet)) {
    // pet is Cat here
    pet.meow();
  } else {
    // pet is Dog here
    pet.bark();
  }
}

// More complex guard for objects
type User = { id: number; name: string };

function isUser(value: any): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.id === "number" &&
    typeof value.name === "string"
  );
}

function processEntity(entity: unknown) {
  if (isUser(entity)) {
    // entity is User here
    console.log(entity.name);
  } else {
    console.log("Not a User");
  }
}


/*
51. WHAT IS THE 'IN' OPERATOR?
================================================================================

- The 'in' operator checks if a property exists in an object at runtime.
- In TypeScript, it is also a type guard that narrows union types based on property presence.

Syntax:
"propName" in obj

Examples:
* /

type Admin = {
  role: "admin";
  permissions: string[];
};

type RegularUser = {
  role: "user";
  favorites: string[];
};

type AnyUser = Admin | RegularUser;

function printUserInfo(user: AnyUser) {
  if ("permissions" in user) {
    // user is Admin
    console.log("Admin with permissions:", user.permissions);
  } else {
    // user is RegularUser
    console.log("User favorites:", user.favorites);
  }
}

// Generic object check
function hasProperty<O, K extends PropertyKey>(
  obj: O,
  key: K
): obj is O & Record<K, unknown> {
  return key in obj;
}

const obj = { a: 1, b: 2 };

if (hasProperty(obj, "a")) {
  // obj has key 'a' here
  console.log(obj.a);
}


/*
52. WHAT IS THE 'INSTANCEOF' OPERATOR?
================================================================================

- The 'instanceof' operator checks if an object is an instance of a specific constructor function or class at runtime.
- In TypeScript, it is a type guard that narrows the type to the class in the true branch.

Syntax:
value instanceof Constructor

Examples:
* /

class Animal {
  move() {
    console.log("Moving...");
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof!");
  }
}

class Cat {
  meow() {
    console.log("Meow!");
  }
}

function handlePet(pet: Animal | Cat) {
  if (pet instanceof Dog) {
    // pet is Dog
    pet.bark();
  } else if (pet instanceof Animal) {
    // pet is Animal (but not Dog here)
    pet.move();
  } else {
    // pet is Cat
    pet.meow();
  }
}

// For built-ins
function formatDateOrString(value: Date | string) {
  if (value instanceof Date) {
    console.log(value.toISOString());
  } else {
    console.log(value.toUpperCase());
  }
}

/*
Notes:
- 'instanceof' works with class constructors and function-based constructors.
- It does NOT work with interfaces, because interfaces are erased at compile time.
- For structural checks (shape-based), use custom type guards or 'in' checks instead.
* /


/*
53. HOW DO YOU CONFIGURE TYPESCRIPT (TSCONFIG.JSON)?
================================================================================

The tsconfig.json file configures the TypeScript compiler and defines project settings [web:22].
It is located in the root directory of a TypeScript project [web:23].

Creating tsconfig.json:
Run: npx tsc --init [web:23]
This generates a default configuration file with common options.

Key configuration sections:
- compilerOptions: Compiler behavior settings
- include/exclude: Which files to compile
- files: Explicitly list files to include
- extends: Inherit from another config file [web:24]
* /

// Example tsconfig.json structure
{
  "compilerOptions": {
    // Language and Environment
    "target": "ES2022",                    // ECMAScript target version [web:24]
    "lib": ["ES2022", "DOM"],              // Library files to include
    "module": "ESNext",                    // Module system [web:24]
    "jsx": "react-jsx",                    // JSX support for React
    
    // Modules
    "moduleResolution": "node",            // How modules are resolved
    "baseUrl": "./",                       // Base directory for resolution
    "paths": {                             // Path mapping for imports
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"]
    },
    "rootDir": "./src",                    // Root of source files
    
    // Emit
    "outDir": "./dist",                    // Output directory [web:23]
    "sourceMap": true,                     // Generate .map files for debugging
    "declaration": true,                   // Generate .d.ts files
    "noEmit": true,                        // Don't emit files (for type checking only) [web:24]
    "removeComments": true,                // Strip comments from output
    
    // Type Checking
    "strict": true,                        // Enable all strict type checks [web:24]
    "noImplicitAny": true,                 // Error on 'any' type
    "strictNullChecks": true,              // Strict null/undefined checks
    "strictFunctionTypes": true,           // Strict function type checking
    "noUnusedLocals": true,                // Error on unused variables
    "noUnusedParameters": true,            // Error on unused parameters
    
    // Interop Constraints
    "esModuleInterop": true,               // Better CommonJS/ES module interop [web:24]
    "allowSyntheticDefaultImports": true,  // Allow default imports from modules
    "isolatedModules": true,               // Each file as separate module [web:24]
    
    // Other
    "skipLibCheck": true,                  // Skip type checking of .d.ts files [web:24]
    "forceConsistentCasingInFileNames": true  // Enforce case sensitivity
  },
  
  // File inclusion
  "include": [
    "src/** /*.ts",                         // Include all TS files in src [web:23]
    "src/** /*.tsx"
  ],
  
  // File exclusion
  "exclude": [
    "node_modules",                        // Exclude dependencies
    "dist",
    "** /*.spec.ts"                         // Exclude test files
  ],
  
  // Extend from base config
  "extends": "./tsconfig.base.json"      // Inherit settings [web:24]
}


/*
54. WHAT IS STRICT MODE IN TYPESCRIPT?
================================================================================

Strict mode is a compiler option that enables multiple strict type-checking options
at once [web:24]. Setting "strict": true activates all strict checks.

Strict mode includes these sub-options:
- strictNullChecks: Null/undefined type safety [web:29]
- noImplicitAny: Disallow implicit 'any' types
- strictFunctionTypes: Strict function parameter checking
- strictBindCallApply: Strict bind/call/apply checking
- strictPropertyInitialization: Ensure class properties are initialized
- noImplicitThis: Error when 'this' has implicit 'any'
- alwaysStrict: Parse in strict mode and emit "use strict"

Benefits:
- Catches more errors at compile time
- Better type safety
- Prevents common runtime errors
- Industry best practice for new projects
* /

// tsconfig.json
{
  "compilerOptions": {
    "strict": true  // Enables all strict checks [web:24]
  }
}

// Or enable individually
{
  "compilerOptions": {
    "strictNullChecks": true,
    "noImplicitAny": true,
    "strictFunctionTypes": true
  }
}

// Example: strictNullChecks effect
// With strictNullChecks: false
function getLength(str: string | null) {
  return str.length; // No error, but runtime crash if str is null
}

// With strictNullChecks: true [web:29]
function getLengthSafe(str: string | null) {
  // return str.length; // Error: Object is possibly 'null'
  
  // Must check first
  if (str !== null) {
    return str.length; // OK
  }
  return 0;
}


/*
55. HOW DOES TYPESCRIPT HANDLE NULL AND UNDEFINED?
================================================================================

TypeScript treats null and undefined as distinct types when strictNullChecks is enabled [web:29].

Without strictNullChecks (not recommended):
- null and undefined are assignable to any type [web:29]
- Can lead to runtime errors

With strictNullChecks (recommended):
- null and undefined have their own distinct types [web:29]
- Must explicitly handle null/undefined cases
- Cannot assign to other types without checking
* /

// tsconfig.json
{
  "compilerOptions": {
    "strictNullChecks": true  // Recommended [web:29]
  }
}

// With strictNullChecks: true
let name: string = "Alice";
// name = null;  // Error: Type 'null' is not assignable to type 'string'
// name = undefined;  // Error

// Allow null explicitly
let nullableName: string | null = "Bob";
nullableName = null; // OK

// Optional properties (implicitly include undefined)
interface User {
  id: number;
  name: string;
  email?: string;  // string | undefined
}

const user: User = { id: 1, name: "Alice" };
// user.email is undefined

// Handling null/undefined
function greet(name: string | null | undefined) {
  // Type narrowing required
  if (name) {
    console.log(`Hello, ${name}`);
  } else {
    console.log("Hello, guest");
  }
}

// Non-null assertion operator (!)
// Use cautiously - bypasses null checks
function getNameLength(name: string | null): number {
  return name!.length; // Assert name is not null (dangerous if wrong)
}

// Nullish coalescing operator (??)
function getDisplayName(name: string | null | undefined): string {
  return name ?? "Anonymous"; // Returns "Anonymous" if name is null/undefined
}

// Optional chaining (?.)
interface Person {
  name: string;
  address?: {
    street?: string;
    city?: string;
  };
}

function getCity(person: Person): string | undefined {
  return person.address?.city; // Safe navigation
}


/*
56. WHAT ARE DECLARATION FILES (.D.TS)?
================================================================================

Declaration files (.d.ts) provide type information for JavaScript code [web:27].
They describe the shape of existing JavaScript libraries without containing implementation [web:30].

Purpose:
- Add types to untyped JavaScript libraries [web:30]
- Allow TypeScript to understand third-party JS code
- Enable autocomplete and type checking for JS libraries
- Can be generated from JS files with JSDoc [web:27]

Structure:
* /

// example.d.ts - Declaration file
declare module "my-library" {
  export function doSomething(value: string): number;
  
  export interface Config {
    timeout: number;
    retries: number;
  }
  
  export class MyClass {
    constructor(config: Config);
    execute(): Promise<void>;
  }
}

// Ambient declarations (global variables)
// globals.d.ts
declare const API_URL: string;
declare const VERSION: number;

interface Window {
  myCustomProperty: string;
}

// Using the declarations
// import { doSomething } from "my-library";
// const result = doSomething("test"); // TypeScript knows the types

// Generating .d.ts from TypeScript source [web:27]
// tsconfig.json
{
  "compilerOptions": {
    "declaration": true,  // Generate .d.ts files
    "declarationMap": true,  // Generate source maps
    "outDir": "./dist"
  }
}

/*
When to create .d.ts files [web:30]:
1. Adding types for untyped third-party JavaScript libraries
2. Making TypeScript aware of global variables loaded via script tags
3. Publishing TypeScript libraries (auto-generated during build)
* /


/*
57. HOW DO YOU USE TYPESCRIPT WITH REACT?
================================================================================

TypeScript integrates well with React for type-safe component development.
Key aspects: typing props, state, events, and hooks.

Setup:
* /

// tsconfig.json for React
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",  // or "react" for older React
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true
  }
}

// Install types for React
// npm install --save-dev @types/react @types/react-dom

// Functional component with typed props
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

// Or without React.FC (preferred modern approach)
const ButtonAlt = ({ label, onClick, disabled = false }: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

// useState hook with types
const Counter = () => {
  const [count, setCount] = React.useState<number>(0);
  const [user, setUser] = React.useState<{ name: string } | null>(null);
  
  return <div>{count}</div>;
};

// Event handlers with types
const Form = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Clicked");
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
      <button onClick={handleClick}>Submit</button>
    </form>
  );
};

// useRef with types
const InputComponent = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  const focusInput = () => {
    inputRef.current?.focus();
  };
  
  return <input ref={inputRef} />;
};

// useReducer with types
type State = { count: number };
type Action = { type: "increment" } | { type: "decrement" } | { type: "reset" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
  }
};

const CounterWithReducer = () => {
  const [state, dispatch] = React.useReducer(reducer, { count: 0 });
  
  return <div>{state.count}</div>;
};


/*
58. HOW DO YOU HANDLE ASYNCHRONOUS CODE IN TYPESCRIPT?
================================================================================

TypeScript provides type safety for asynchronous operations using Promises and async/await.
The types ensure correct handling of async values and errors.
* /

// Basic Promise with types
function fetchUser(id: number): Promise<{ id: number; name: string }> {
  return fetch(`/api/users/${id}`)
    .then(response => response.json())
    .then(data => data as { id: number; name: string });
}

// Using the Promise
fetchUser(1).then(user => {
  console.log(user.name); // TypeScript knows user has 'name' property
});

// Async/await with types
async function getUserData(id: number): Promise<{ id: number; name: string }> {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return data as { id: number; name: string };
}

// Error handling with try-catch
async function fetchWithErrorHandling(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.text();
    return data;
  } catch (error) {
    // Type narrowing for error
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    }
    throw error;
  }
}

// Generic async function
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  const data: T = await response.json();
  return data;
}

// Usage with specific type
interface User {
  id: number;
  name: string;
}

const user = await fetchData<User>("/api/user/1");
console.log(user.name);

// Promise.all with types
async function fetchMultiple() {
  const [users, posts] = await Promise.all([
    fetchData<User[]>("/api/users"),
    fetchData<Post[]>("/api/posts")
  ]);
  
  return { users, posts };
}


/*
59. WHAT IS THE DIFFERENCE BETWEEN 'PROMISES' AND 'ASYNC/AWAIT' IN TYPESCRIPT?
================================================================================

Promises and async/await are two ways to handle asynchronous code in TypeScript.
They have the same underlying behavior but different syntax and readability.

PROMISES:
- Use .then() and .catch() chaining
- More verbose, especially for sequential operations
- Callback-based style
- All operations are explicit

ASYNC/AWAIT:
- Syntactic sugar over Promises
- More readable, looks like synchronous code
- Uses try-catch for error handling
- Easier to debug and maintain
* /

// PROMISES APPROACH
function getUserWithPromises(id: number): Promise<string> {
  return fetch(`/api/users/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      return response.json();
    })
    .then(user => {
      return `User: ${user.name}`;
    })
    .catch(error => {
      console.error("Error:", error);
      throw error;
    });
}

// ASYNC/AWAIT APPROACH (cleaner)
async function getUserWithAsync(id: number): Promise<string> {
  try {
    const response = await fetch(`/api/users/${id}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    
    const user = await response.json();
    return `User: ${user.name}`;
    
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// Sequential operations comparison
// With Promises (harder to read)
function sequentialPromises(): Promise<number> {
  return fetchData<{ value: number }>("/api/step1")
    .then(result1 => {
      return fetchData<{ value: number }>(`/api/step2?val=${result1.value}`);
    })
    .then(result2 => {
      return fetchData<{ value: number }>(`/api/step3?val=${result2.value}`);
    })
    .then(result3 => {
      return result3.value;
    });
}

// With async/await (cleaner)
async function sequentialAsync(): Promise<number> {
  const result1 = await fetchData<{ value: number }>("/api/step1");
  const result2 = await fetchData<{ value: number }>(`/api/step2?val=${result1.value}`);
  const result3 = await fetchData<{ value: number }>(`/api/step3?val=${result2.value}`);
  return result3.value;
}

/*
Key differences summary:
1. Syntax: async/await is more concise and readable
2. Error handling: try-catch vs .catch()
3. Debugging: async/await has better stack traces
4. Both return Promises and have same type safety
5. async/await requires function to be marked 'async'
* /


/*
60. HOW DO YOU TYPE THIRD-PARTY LIBRARIES?
================================================================================

Three main approaches to add types for third-party JavaScript libraries:

1. Use @types packages (DefinitelyTyped)
2. Create your own declaration files
3. Use 'declare module' for quick typing
* /

// APPROACH 1: Install @types packages (most common)
// npm install --save-dev @types/library-name
// npm install --save-dev @types/lodash
// npm install --save-dev @types/express

// Then use with types automatically
// import _ from 'lodash';
// _.chunk([1, 2, 3, 4], 2); // TypeScript knows the types


// APPROACH 2: Create custom declaration file
// Create: types/my-library.d.ts

declare module "my-untyped-library" {
  export function doSomething(value: string): number;
  export function processData(data: any[]): void;
  
  export interface LibConfig {
    apiKey: string;
    timeout: number;
  }
  
  export class Library {
    constructor(config: LibConfig);
    initialize(): Promise<void>;
  }
}

// Now you can import with types
// import { doSomething, Library } from "my-untyped-library";


// APPROACH 3: Quick declare module (for simple cases)
// In any .d.ts file or at top of your file

declare module "simple-lib" {
  const value: any;
  export default value;
}

// Or for specific exports
declare module "another-lib" {
  export const helper: (x: number) => string;
}


// APPROACH 4: Partial typing with index signature
declare module "flexible-lib" {
  interface API {
    [key: string]: any; // Allow any property access
    knownMethod(x: number): string; // But type specific known methods
  }
  
  const api: API;
  export default api;
}


// Configuration in tsconfig.json
{
  "compilerOptions": {
    "typeRoots": [
      "./node_modules/@types",  // Default location
      "./types"                 // Custom declaration files
    ],
    "types": [
      "node",     // Only include specific @types
      "express"
    ]
  }
}

/*
Best practices:
1. Always check if @types/package exists first
2. Keep custom declarations in a 'types' or '@types' folder
3. Be as specific as possible with types (avoid 'any')
4. Document your custom types for maintainability
5. Consider contributing types to DefinitelyTyped
* /

/*
61. WHEN SHOULD YOU USE 'INTERFACE' VS 'TYPE'?
================================================================================

Both 'interface' and 'type' can define object shapes, but they have different
capabilities and use cases. Modern TypeScript allows most things with both,
but there are still practical differences.

USE INTERFACE WHEN:
- Defining object/class shapes (most common use)
- You want declaration merging capability
- Working with classes and inheritance (extends keyword)
- Building public APIs (allows consumers to extend)
- OOP-style programming
- Want better error messages (interfaces often have clearer errors)

USE TYPE WHEN:
- Need unions or intersections
- Defining primitives, tuples, or function types
- Using mapped types, conditional types, or template literals
- Creating complex type transformations
- Don't want declaration merging (more predictable)
* /

// INTERFACE - Best for object shapes and classes
interface User {
  id: number;
  name: string;
  email: string;
}

interface Admin extends User {
  permissions: string[];
}

class UserImpl implements User {
  id = 1;
  name = "Alice";
  email = "alice@example.com";
}

// Declaration merging (interface-only feature)
interface Window {
  myCustomMethod: () => void;
}

interface Window {
  myOtherMethod: () => void;
}
// Window now has both methods


// TYPE - Best for unions, intersections, and complex types
type ID = string | number;
type Status = "pending" | "approved" | "rejected";

type Point = { x: number; y: number };
type Shape = Circle | Square | Triangle;

// Intersection (works with both, but type is more common)
type Person = { name: string };
type Employee = Person & { employeeId: number };

// Tuple
type Coordinate = [number, number, number];

// Function type
type Callback = (data: string) => void;

// Mapped type (type-only)
type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};

// Conditional type (type-only)
type NonNullable<T> = T extends null | undefined ? never : T;

/*
PRACTICAL GUIDELINES:

1. Default to 'interface' for object shapes - more intuitive for most developers
2. Use 'type' for unions, intersections, and advanced type operations
3. Be consistent within your codebase
4. Some teams prefer 'type' everywhere for consistency
5. Libraries should use 'interface' for extensibility
* /


/*
62. HOW DO YOU AVOID USING 'ANY' TYPE?
================================================================================

The 'any' type defeats TypeScript's purpose. Here are strategies to avoid it:

1. USE UNKNOWN INSTEAD OF ANY
   - Forces type checking before use
   - Type-safe alternative
* /

// BAD: using any
function processBad(data: any) {
  return data.toUpperCase(); // No type safety
}

// GOOD: using unknown
function processGood(data: unknown) {
  if (typeof data === "string") {
    return data.toUpperCase(); // Type-safe after check
  }
  throw new Error("Expected string");
}

/*
2. USE GENERICS FOR REUSABLE FUNCTIONS
* /

// BAD
function wrapInArrayBad(value: any): any[] {
  return [value];
}

// GOOD
function wrapInArrayGood<T>(value: T): T[] {
  return [value];
}

/*
3. USE UNION TYPES FOR MULTIPLE POSSIBILITIES
* /

// BAD
function formatValue(value: any): string {
  return String(value);
}

// GOOD
function formatValueGood(value: string | number | boolean): string {
  return String(value);
}

/*
4. USE PROPER TYPING FOR EXTERNAL DATA
* /

// BAD
async function fetchUserBad(id: number): Promise<any> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// GOOD
interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUserGood(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  // Validate data structure here in production
  return data as User;
}

/*
5. USE INDEX SIGNATURES FOR DYNAMIC OBJECTS
* /

// BAD
const config: any = {
  host: "localhost",
  port: 3000
};

// GOOD
const configGood: Record<string, string | number> = {
  host: "localhost",
  port: 3000
};

// Or more specific
interface AppConfig {
  host: string;
  port: number;
  [key: string]: string | number; // Allow additional properties
}

/*
6. USE TYPE GUARDS AND NARROWING
* /

function processValue(value: unknown) {
  // Type guard
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else if (typeof value === "number") {
    console.log(value.toFixed(2));
  } else if (Array.isArray(value)) {
    console.log(value.length);
  }
}

/*
7. ENABLE STRICT MODE IN TSCONFIG
* /

{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,  // Errors on implicit any
    "strictNullChecks": true
  }
}


/*
63. WHAT ARE SOME COMMON TYPESCRIPT PITFALLS?
================================================================================

Common mistakes developers make when using TypeScript:
* /

// PITFALL 1: Using 'any' everywhere (defeats TypeScript's purpose)
// BAD
function processBad1(data: any): any {
  return data.something;
}

// GOOD
function processGood1<T extends { something: string }>(data: T): string {
  return data.something;
}


// PITFALL 2: Not enabling strict mode
// Always use strict mode in tsconfig.json
{
  "compilerOptions": {
    "strict": true
  }
}


// PITFALL 3: Type assertions without validation
// BAD
const user = JSON.parse(userString) as User;
// No runtime validation - might crash

// GOOD
function isUser(obj: any): obj is User {
  return (
    typeof obj === "object" &&
    typeof obj.id === "number" &&
    typeof obj.name === "string"
  );
}

const parsed = JSON.parse(userString);
if (isUser(parsed)) {
  const user = parsed; // Type-safe
}


// PITFALL 4: Ignoring null/undefined checks
// BAD
function getLength(arr: number[] | null) {
  return arr.length; // Runtime error if null
}

// GOOD
function getLengthSafe(arr: number[] | null) {
  return arr?.length ?? 0; // Safe
}


// PITFALL 5: Mutation of readonly types
interface ReadonlyConfig {
  readonly apiKey: string;
}

const config: ReadonlyConfig = { apiKey: "secret" };
// (config as any).apiKey = "new"; // Bypass with 'as any' - bad!

// Instead, create new object
const newConfig = { ...config, apiKey: "new" };


// PITFALL 6: Forgetting that interfaces are compile-time only
interface Product {
  id: number;
  name: string;
}

function processProduct(item: any) {
  // BAD: instanceof doesn't work with interfaces
  // if (item instanceof Product) { } // Error
  
  // GOOD: Use type guard
  if (typeof item === "object" && "id" in item && "name" in item) {
    const product = item as Product;
  }
}


// PITFALL 7: Not understanding type widening
// BAD
let status = "pending"; // Type: string (too wide)
// status = "approved"; // Works, but not type-safe

// GOOD
let statusGood: "pending" | "approved" | "rejected" = "pending";
// Or
const statusConst = "pending" as const; // Type: "pending"


// PITFALL 8: Overusing non-null assertion (!)
// BAD
function getName(user: User | null): string {
  return user!.name; // Dangerous - might crash
}

// GOOD
function getNameSafe(user: User | null): string {
  if (!user) {
    throw new Error("User is null");
  }
  return user.name;
}


// PITFALL 9: Circular dependencies in types
// Can cause issues - organize types in separate files
// BAD structure:
// typeA.ts imports typeB.ts
// typeB.ts imports typeA.ts

// GOOD structure:
// types/index.ts exports all types
// Other files import from types/index


/*
64. HOW DO YOU STRUCTURE LARGE TYPESCRIPT PROJECTS?
================================================================================

Best practices for organizing large TypeScript codebases:
* /

/*
RECOMMENDED FOLDER STRUCTURE:

project-root/
├── src/
│   ├── components/           # React/UI components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.types.ts
│   │   │   ├── Button.test.ts
│   │   │   └── index.ts
│   │   └── ...
│   │
│   ├── features/             # Feature-based modules
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   └── ...
│   │
│   ├── services/             # API and business logic
│   │   ├── api.ts
│   │   ├── userService.ts
│   │   └── index.ts
│   │
│   ├── hooks/                # Reusable React hooks
│   │   ├── useAuth.ts
│   │   ├── useLocalStorage.ts
│   │   └── index.ts
│   │
│   ├── types/                # Shared type definitions
│   │   ├── models.ts
│   │   ├── api.ts
│   │   └── index.ts
│   │
│   ├── utils/                # Utility functions
│   │   ├── formatting.ts
│   │   ├── validation.ts
│   │   └── index.ts
│   │
│   ├── config/               # Configuration files
│   │   ├── constants.ts
│   │   └── env.ts
│   │
│   └── App.tsx
│
├── types/                    # Global type declarations
│   └── global.d.ts
│
├── tests/                    # Test utilities
│   ├── setup.ts
│   └── mocks/
│
├── tsconfig.json
├── tsconfig.build.json       # Separate build config
└── package.json
* /

// EXAMPLE: Organizing types
// types/models.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Post {
  id: number;
  title: string;
  authorId: number;
}

// types/api.ts
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export type ApiError = {
  code: string;
  message: string;
};

// types/index.ts - Barrel export
export * from "./models";
export * from "./api";


// EXAMPLE: Path aliases in tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@components/*": ["components/*"],
      "@features/*": ["features/*"],
      "@services/*": ["services/*"],
      "@hooks/*": ["hooks/*"],
      "@types/*": ["types/*"],
      "@utils/*": ["utils/*"]
    }
  }
}

// Now import with cleaner paths
// import { Button } from "@components/Button";
// import { useAuth } from "@hooks/useAuth";
// import type { User } from "@types";


// EXAMPLE: Feature-based structure (for large apps)
/*
features/
├── auth/
│   ├── components/
│   │   └── LoginForm.tsx
│   ├── hooks/
│   │   └── useAuth.ts
│   ├── services/
│   │   └── authService.ts
│   ├── types.ts
│   └── index.ts              # Public API of the feature
│
└── posts/
    ├── components/
    ├── hooks/
    ├── services/
    ├── types.ts
    └── index.ts
* /

/*
BEST PRACTICES:

1. Use barrel exports (index.ts) to control public API
2. Keep related files close together
3. Use path aliases for cleaner imports
4. Separate types into their own files when they grow large
5. Use feature folders for domain-specific code
6. Have a shared types folder for cross-cutting types
7. Use multiple tsconfig files (base, app, tests)
8. Keep business logic separate from UI components
* /


/*
65. WHAT ARE THE PERFORMANCE CONSIDERATIONS IN TYPESCRIPT?
================================================================================

TypeScript is compile-time only, so it doesn't affect runtime performance.
However, compilation speed and developer experience matter:
* /

/*
1. COMPILATION PERFORMANCE

Slow compilation in large projects can hurt developer productivity.
* /

// OPTIMIZATION: Use project references for monorepos
// tsconfig.json
{
  "compilerOptions": {
    "composite": true,          // Enable project references
    "incremental": true,        // Enable incremental compilation
    "tsBuildInfoFile": ".tsbuildinfo"
  }
}

// OPTIMIZATION: Skip lib checks
{
  "compilerOptions": {
    "skipLibCheck": true  // Skip type checking of .d.ts files
  }
}

// OPTIMIZATION: Use include/exclude wisely
{
  "include": ["src/** /*"],
  "exclude": ["node_modules", "dist", "** /*.spec.ts"]
}


/*
2. TYPE CHECKING PERFORMANCE

Complex types can slow down the compiler and IDE.
* /

// BAD: Overly complex recursive types
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object
    ? DeepPartial<T[K]>
    : T[K];
};
// Use sparingly - can slow down IDE

// GOOD: Simpler, more specific types
type PartialUser = Partial<User>; // Built-in utility


// BAD: Extremely large unions
type AllEvents = 
  | "click" | "hover" | "scroll" | "load" 
  | ... // 100+ more events
  
// GOOD: Group related types
type MouseEvents = "click" | "dblclick" | "mousedown";
type KeyEvents = "keydown" | "keyup" | "keypress";
type AllEvents = MouseEvents | KeyEvents;


/*
3. BUNDLE SIZE (Runtime)

TypeScript features that affect bundle size:
* /

// GOOD: Use const enums (no runtime code)
const enum Direction {
  Up,
  Down,
  Left,
  Right
}

let dir = Direction.Up; // Compiled to: let dir = 0;

// BAD: Regular enums generate runtime code
enum DirectionEnum {
  Up,
  Down
}
// Generates extra JavaScript object


// GOOD: Use type imports (removed at compile time)
import type { User } from "./types";

// BAD: Importing types as values (might include in bundle)
import { User } from "./types"; // If User is also used as value


/*
4. DEVELOPMENT EXPERIENCE

Fast feedback loop is important.
* /

// OPTIMIZATION: Use TypeScript's watch mode
// package.json
{
  "scripts": {
    "dev": "tsc --watch"
  }
}

// OPTIMIZATION: Use tools like ts-node for faster dev
// npm install -D ts-node nodemon

{
  "scripts": {
    "dev": "nodemon --exec ts-node src/index.ts"
  }
}


/*
5. AVOID EXPENSIVE TYPE OPERATIONS

Some patterns are computationally expensive.
* /

// BAD: Deeply nested conditional types (slow)
type ComplexType<T> = T extends A
  ? T extends B
    ? T extends C
      ? D
      : E
    : F
  : G;

// GOOD: Simpler, flatter logic
type SimpleType<T> = T extends A & B & C ? D : E;


/*
SUMMARY OF BEST PRACTICES:

1. Enable incremental compilation for faster rebuilds
2. Use skipLibCheck to speed up type checking
3. Avoid overly complex recursive types
4. Use const enums when appropriate
5. Import types with 'import type' syntax
6. Structure code to minimize circular dependencies
7. Use project references for monorepos
8. Keep tsconfig.json optimized (include/exclude)
9. Profile compilation with --diagnostics flag
10. Use build tools (esbuild, swc) for faster builds in production
* /

// Check compilation performance
// npx tsc --diagnostics
// Shows: Files, Lines, Nodes, Identifiers, Symbols, Types, Memory used, Time

*/