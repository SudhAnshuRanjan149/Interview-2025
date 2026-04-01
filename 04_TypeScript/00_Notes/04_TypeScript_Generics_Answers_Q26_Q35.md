# TypeScript Interview Questions (Q26-Q35 Detailed Answers)

## SECTION 3: GENERICS & ADVANCED TYPES

## 26. What are generics in TypeScript?

**Answer:**

**Generics** are a way to write reusable code that works with multiple types. They allow you to create components, functions, or classes that can work with any type while maintaining type safety.

### Simple Analogy:

Think of generics like a **template or blueprint**:

- Without generics: "This box holds strings"
- With generics: "This box holds ANY type of item"

### Real Example - The Problem:

```typescript
// Without generics - not flexible
function getFirstString(arr: string[]): string {
  return arr[0];
}

function getFirstNumber(arr: number[]): number {
  return arr[0];
}

function getFirstBoolean(arr: boolean[]): boolean {
  return arr[0];
}

// Need separate function for each type! 😞
```

### The Solution - Using Generics:

```typescript
// With generics - flexible and reusable
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

// Works with any type!
const firstString = getFirst<string>(["Alice", "Bob"]);    // string
const firstNumber = getFirst<number>([1, 2, 3]);           // number
const firstBoolean = getFirst<boolean>([true, false]);     // boolean

// Or let TypeScript infer the type
const inferred = getFirst(["a", "b"]); // automatically inferred as string
```

### What is `<T>`?

- `<T>` is a **type variable** (like a placeholder)
- It gets replaced with the actual type when the function is called
- `T` stands for "Type" (could be any name)

### Real Example - Stack Data Structure:

```typescript
class Stack<T> {
  private items: T[] = [];
  
  push(item: T): void {
    this.items.push(item);
  }
  
  pop(): T | undefined {
    return this.items.pop();
  }
  
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
  
  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

// Use with different types
const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.pop()); // 2

const stringStack = new Stack<string>();
stringStack.push("hello");
stringStack.push("world");
console.log(stringStack.pop()); // "world"
```

### Multiple Type Parameters:

```typescript
// Function with multiple types
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const result = pair<string, number>("age", 30);
// result is [string, number]

// Or let TypeScript infer
const inferred = pair("name", true);
// inferred is [string, boolean]
```

### Generic Constraints - Limiting the Type:

```typescript
// Without constraint - T could be anything
function getLength1<T>(item: T): number {
  // return item.length; // Error! T might not have length property
}

// With constraint - T must have length property
function getLength2<T extends { length: number }>(item: T): number {
  return item.length; // OK now!
}

getLength2("hello");       // OK (string has length)
getLength2([1, 2, 3]);     // OK (array has length)
// getLength2(123);        // Error! (number doesn't have length)
```

---

## 27. Why are generics useful?

**Answer:**

Generics provide several critical benefits that make code better and safer.

### Benefit 1: Code Reusability

```typescript
// Without generics - lots of duplication
function filterStrings(arr: string[], predicate: (s: string) => boolean): string[] {
  return arr.filter(predicate);
}

function filterNumbers(arr: number[], predicate: (n: number) => boolean): number[] {
  return arr.filter(predicate);
}

function filterBooleans(arr: boolean[], predicate: (b: boolean) => boolean): boolean[] {
  return arr.filter(predicate);
}

// With generics - single reusable function
function filter<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  return arr.filter(predicate);
}

// Use for any type
filter([1, 2, 3, 4, 5], n => n > 2);
filter(["a", "ab", "abc"], s => s.length > 1);
filter([true, false, true], b => b);
```

### Benefit 2: Type Safety Preserved

```typescript
// Without generics - loses type information
function getAny(arr: any[]): any {
  return arr[0];
}

const item1 = getAny(["hello"]); // type is 'any' - NO type safety
item1.toUpperCase(); // Might crash at runtime if not actually string

// With generics - preserves type information
function getGeneric<T>(arr: T[]): T {
  return arr[0];
}

const item2 = getGeneric(["hello"]); // type is 'string' - TYPE SAFE
item2.toUpperCase(); // TypeScript knows it's safe!
```

### Benefit 3: IDE Support & Autocompletion

```typescript
// With generics
const numbers: number[] = [1, 2, 3];
const first = getGeneric(numbers); // IDE knows first is number

// Can suggest number methods
first.toFixed(2); // ✅ IDE autocompletes and knows this is available

// Without generics
const firstAny = getAny(numbers); // IDE doesn't know type
// firstAny. // ❌ IDE can't suggest anything useful
```

### Benefit 4: Catch Errors Early

```typescript
// Generics catch mistakes at compile time
function processArray<T>(arr: T[]): T {
  // return arr[0].length; // Error! T doesn't necessarily have length
  return arr[0];
}

// Type checking prevents runtime bugs
const result: string = processArray(["hello"]); // OK

// const wrong: number = processArray(["hello"]); // Compile Error! string ≠ number
```

### Benefit 5: Self-Documenting Code

```typescript
// Without generics - unclear what's expected
function transform(data: any): any {
  // What type should data be?
  // What will be returned?
  return data;
}

// With generics - clear intent
function transform<TInput, TOutput>(data: TInput, transformer: (x: TInput) => TOutput): TOutput {
  return transformer(data);
}

// Clear what's needed!
const doubled = transform<number, number>(5, n => n * 2);
const stringified = transform<number, string>(5, n => n.toString());
```

### Real-World Example - API Response Handling:

```typescript
// Without generics - have to use 'any' or repeat types
interface ApiResponseAny {
  data: any;
  status: number;
}

// With generics - type-safe and reusable
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
}

// Same interface works for different data types
const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "Alice" },
  status: 200,
  message: "OK"
};

const postResponse: ApiResponse<Post> = {
  data: { id: 1, title: "Hello" },
  status: 200,
  message: "OK"
};

// Function that works with any ApiResponse
function handleResponse<T>(response: ApiResponse<T>): T {
  if (response.status === 200) {
    return response.data;
  }
  throw new Error(response.message);
}

const user = handleResponse(userResponse); // type: User
const post = handleResponse(postResponse); // type: Post
```

### Summary of Benefits:

✅ **Write once, use many times** - Eliminate code duplication
✅ **Type safety maintained** - Catches errors at compile time
✅ **Better IDE support** - Autocompletion and error checking
✅ **Self-documenting** - Intent is clear from types
✅ **Flexibility** - Works with any type

---

## 28. How do you use generic constraints?

**Answer:**

**Generic constraints** limit what types can be used with a generic. They say "this generic must satisfy certain requirements."

### Simple Analogy:

Think of constraints like **requirements for a job**:

- Without constraint: "Anyone can apply"
- With constraint: "Must know JavaScript and TypeScript"

### Real Example - The Problem:

```typescript
// Without constraint - causes errors
function printLength<T>(item: T): void {
  // console.log(item.length); // Error! T doesn't necessarily have length
}

// Works with arrays
printLength([1, 2, 3]); // Array has length

// But what about numbers?
printLength(123); // Number doesn't have length - would break!
```

### The Solution - Using Constraints:

```typescript
// With constraint - T must have length property
function printLength<T extends { length: number }>(item: T): void {
  console.log(item.length);
}

// Works with arrays
printLength([1, 2, 3]);        // ✅ OK - array has length

// Works with strings
printLength("hello");          // ✅ OK - string has length

// Works with objects that have length
printLength({ length: 5 });    // ✅ OK - has length property

// Doesn't work with numbers
// printLength(123);            // ❌ Error - number doesn't have length
```

### Constraint 1: Extends a Type:

```typescript
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

// Constraint: T must be Animal or subclass of Animal
function handleAnimal<T extends Animal>(animal: T): void {
  console.log(animal.name);
  animal.speak();
}

handleAnimal(new Dog()); // ✅ OK - Dog implements Animal

class Robot {
  name = "R2D2";
}

// handleAnimal(new Robot()); // ❌ Error - Robot is not Animal
```

### Constraint 2: Extends String/Number/etc:

```typescript
// T must be one of these string values
function createEnumValue<T extends "red" | "green" | "blue">(color: T): T {
  return color;
}

createEnumValue("red");    // ✅ OK
createEnumValue("green");  // ✅ OK
// createEnumValue("yellow"); // ❌ Error
```

### Constraint 3: Extends keyof - Access Object Properties Safely:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Without constraint - might access non-existent property
function getValue1<T>(obj: T, key: string): any {
  return obj[key]; // Could be undefined, type is 'any'
}

// With constraint - only allow keys that exist on T
function getValue2<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]; // Type is preserved!
}

const user: User = { id: 1, name: "Alice", email: "alice@ex.com" };

const userId = getValue2(user, "id");      // ✅ type: number
const userName = getValue2(user, "name");  // ✅ type: string

// getValue2(user, "phone");               // ❌ Error - "phone" is not a key of User
```

### Constraint 4: Multiple Constraints (Intersection):

```typescript
interface Named {
  name: string;
}

interface Aged {
  age: number;
}

// T must have both name AND age properties
function person<T extends Named & Aged>(p: T): string {
  return `${p.name} is ${p.age} years old`;
}

person({ name: "Alice", age: 30 }); // ✅ OK

// person({ name: "Bob" });          // ❌ Error - missing age
```

### Constraint 5: Conditional Constraints:

```typescript
// T must extend string
function stringOnly<T extends string>(value: T): number {
  return value.length;
}

stringOnly("hello");  // ✅ OK

// stringOnly(123);   // ❌ Error - number is not string

// T must extend array
function arrayOnly<T extends any[]>(items: T): number {
  return items.length;
}

arrayOnly([1, 2, 3]); // ✅ OK
arrayOnly("hello");   // ❌ Error - string is not array
```

### Real Example - Map Over Object Keys:

```typescript
// Safely map function over object properties
function mapObject<T, K extends keyof T>(
  obj: T,
  transform: (value: T[K], key: K) => void
): void {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      transform(obj[key as K], key as K);
    }
  }
}

const config = { host: "localhost", port: 3000 };

mapObject(config, (value, key) => {
  console.log(`${key}: ${value}`);
});

// Guarantees key exists on config, so no type errors!
```

### Real Example - Generic Repository with Constraint:

```typescript
interface Entity {
  id: number;
  createdAt: Date;
}

class Repository<T extends Entity> {
  private items: T[] = [];
  
  add(item: T): void {
    this.items.push(item);
  }
  
  findById(id: number): T | undefined {
    // Can safely access 'id' because T extends Entity
    return this.items.find(item => item.id === id);
  }
  
  getAll(): T[] {
    return this.items;
  }
}

// Usage - must extend Entity
interface User extends Entity {
  name: string;
}

const userRepo = new Repository<User>();
userRepo.add({ id: 1, name: "Alice", createdAt: new Date() }); // ✅ OK
```

---

## 29. What are generic classes?

**Answer:**

**Generic classes** are classes that work with multiple types using type parameters.

### Simple Syntax:

```typescript
class ClassName<T> {
  // T is used throughout the class
}
```

### Real Example - Simple Generic Box:

```typescript
// Generic class that can hold any type
class Box<T> {
  private value: T;
  
  constructor(value: T) {
    this.value = value;
  }
  
  getValue(): T {
    return this.value;
  }
  
  setValue(value: T): void {
    this.value = value;
  }
}

// Use with string
const stringBox = new Box<string>("hello");
const str = stringBox.getValue(); // type: string

// Use with number
const numberBox = new Box<number>(42);
const num = numberBox.getValue(); // type: number

// Or infer the type
const boolBox = new Box(true); // inferred as Box<boolean>
```

### Real Example - Generic Array Wrapper:

```typescript
class ArrayList<T> {
  private items: T[] = [];
  
  add(item: T): void {
    this.items.push(item);
  }
  
  get(index: number): T {
    if (index < 0 || index >= this.items.length) {
      throw new Error("Index out of bounds");
    }
    return this.items[index];
  }
  
  remove(index: number): T {
    if (index < 0 || index >= this.items.length) {
      throw new Error("Index out of bounds");
    }
    const item = this.items[index];
    this.items.splice(index, 1);
    return item;
  }
  
  size(): number {
    return this.items.length;
  }
  
  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

// Usage
const list = new ArrayList<string>();
list.add("Alice");
list.add("Bob");
list.add("Charlie");

console.log(list.get(0)); // "Alice"
console.log(list.size()); // 3

const removed = list.remove(1); // type: string, value: "Bob"
```

### Generic Class with Constraints:

```typescript
interface Identifiable {
  id: number;
}

// T must extend Identifiable
class Database<T extends Identifiable> {
  private records: Map<number, T> = new Map();
  
  insert(record: T): void {
    this.records.set(record.id, record);
  }
  
  findById(id: number): T | undefined {
    return this.records.get(id);
  }
  
  findAll(): T[] {
    return Array.from(this.records.values());
  }
  
  delete(id: number): boolean {
    return this.records.delete(id);
  }
}

// Usage
interface User extends Identifiable {
  id: number;
  name: string;
  email: string;
}

const userDb = new Database<User>();
userDb.insert({ id: 1, name: "Alice", email: "alice@ex.com" });
userDb.insert({ id: 2, name: "Bob", email: "bob@ex.com" });

const user = userDb.findById(1); // type: User | undefined
```

### Multiple Type Parameters:

```typescript
// Key-Value pair class
class Pair<K, V> {
  constructor(private key: K, private value: V) {}
  
  getKey(): K {
    return this.key;
  }
  
  getValue(): V {
    return this.value;
  }
  
  toString(): string {
    return `${this.key}: ${this.value}`;
  }
}

// Usage
const pair1 = new Pair<string, number>("age", 30);
const pair2 = new Pair<string, boolean>("isActive", true);

console.log(pair1.getKey());   // "age"
console.log(pair1.getValue()); // 30
```

### Generic Class Inheritance:

```typescript
// Base generic class
class Collection<T> {
  protected items: T[] = [];
  
  add(item: T): void {
    this.items.push(item);
  }
  
  getAll(): T[] {
    return this.items;
  }
}

// Derived class inherits generic
class SortedCollection<T> extends Collection<T> {
  getAll(): T[] {
    // Sort before returning
    return this.items.sort();
  }
}

// Or constrain the generic
interface Comparable {
  compare(other: this): number;
}

class SortedCollectionTyped<T extends Comparable> extends Collection<T> {
  sort(): void {
    this.items.sort((a, b) => a.compare(b));
  }
}
```

---

## 30. What are generic interfaces?

**Answer:**

**Generic interfaces** are interfaces that use type parameters to define a reusable contract.

### Real Example - Simple Generic Interface:

```typescript
// Generic interface
interface Repository<T> {
  findAll(): T[];
  findById(id: number): T | undefined;
  insert(item: T): void;
  delete(id: number): void;
}

// Implement for User
interface User {
  id: number;
  name: string;
}

class UserRepository implements Repository<User> {
  private users: User[] = [];
  
  findAll(): User[] {
    return this.users;
  }
  
  findById(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }
  
  insert(user: User): void {
    this.users.push(user);
  }
  
  delete(id: number): void {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx >= 0) this.users.splice(idx, 1);
  }
}

// Usage
const repo = new UserRepository();
repo.insert({ id: 1, name: "Alice" });
const users = repo.findAll(); // type: User[]
```

### Real Example - API Response Interface:

```typescript
// Generic API response interface
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Use with different data types
interface User {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
}

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "Alice" },
  status: 200,
  message: "OK"
};

const postResponse: ApiResponse<Post> = {
  data: { id: 1, title: "Hello", content: "World" },
  status: 200,
  message: "OK"
};

// Generic function to handle any ApiResponse
function processResponse<T>(response: ApiResponse<T>): T {
  if (response.status === 200) {
    return response.data;
  }
  throw new Error(response.message);
}

const user = processResponse(userResponse); // type: User
const post = processResponse(postResponse); // type: Post
```

### Real Example - Paginated Results:

```typescript
// Generic pagination interface
interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}

// Use with different item types
interface Product {
  id: number;
  name: string;
  price: number;
}

interface User {
  id: number;
  email: string;
}

const productPage: PaginatedResult<Product> = {
  items: [
    { id: 1, name: "Laptop", price: 999 },
    { id: 2, name: "Phone", price: 499 }
  ],
  total: 100,
  page: 1,
  pageSize: 2,
  hasNextPage: true
};

const userPage: PaginatedResult<User> = {
  items: [
    { id: 1, email: "alice@ex.com" },
    { id: 2, email: "bob@ex.com" }
  ],
  total: 50,
  page: 1,
  pageSize: 2,
  hasNextPage: true
};

// Generic function for both
function displayPage<T>(page: PaginatedResult<T>): void {
  console.log(`Page ${page.page} of ${Math.ceil(page.total / page.pageSize)}`);
  console.log(`Items: ${page.items.length}`);
  console.log(`More items available: ${page.hasNextPage}`);
}

displayPage(productPage);
displayPage(userPage);
```

### Multiple Type Parameters in Interfaces:

```typescript
// Request-Response interface
interface RequestHandler<TRequest, TResponse> {
  handle(request: TRequest): Promise<TResponse>;
}

// Implement for specific types
interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  userId: number;
}

class LoginHandler implements RequestHandler<LoginRequest, LoginResponse> {
  async handle(request: LoginRequest): Promise<LoginResponse> {
    // Validate and authenticate
    return {
      token: "jwt_token_here",
      userId: 1
    };
  }
}

// Usage
const handler = new LoginHandler();
const response = await handler.handle({
  username: "alice",
  password: "secret"
}); // type: LoginResponse
```

### Generic Interface with Constraints:

```typescript
interface Identifiable {
  id: number;
}

// T must extend Identifiable
interface Storage<T extends Identifiable> {
  save(item: T): Promise<void>;
  load(id: number): Promise<T | null>;
  delete(id: number): Promise<void>;
}

interface User extends Identifiable {
  id: number;
  name: string;
}

class UserStorage implements Storage<User> {
  async save(user: User): Promise<void> {
    // Save user
  }
  
  async load(id: number): Promise<User | null> {
    // Load user
    return null;
  }
  
  async delete(id: number): Promise<void> {
    // Delete user
  }
}
```

---

## Complete Summary of Q26-Q30

You now understand:

✅ **Generics** - Write reusable code for any type
✅ **Why generics matter** - Type safety, reusability, IDE support
✅ **Generic constraints** - Limit what types can be used
✅ **Generic classes** - Classes that work with multiple types
✅ **Generic interfaces** - Interfaces with type parameters

**These are foundational concepts for advanced TypeScript!** 🚀

---

## 31. What are mapped types?

**Answer:**

**Mapped types** create new types by transforming each property of an existing type. They allow you to apply changes across all properties of a type.

### Simple Analogy:

Think of mapped types like a **spreadsheet transformation**:

- Original spreadsheet has columns: name, age, email
- Transform: "Make all columns optional"
- Result: same columns, but all optional

### Real Example - Making All Properties Readonly:

```typescript
// Without mapped types - have to duplicate the type
interface User {
  id: number;
  name: string;
  email: string;
}

interface ReadonlyUser {
  readonly id: number;
  readonly name: string;
  readonly email: string;
}

// With mapped types - automatic transformation
type Readonly2<T> = {
  readonly [K in keyof T]: T[K];
};

type ReadonlyUserAuto = Readonly2<User>;
// Same as ReadonlyUser, but generated!
```

### Built-in Mapped Types:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// 1. Readonly<T> - Make all properties readonly
type ReadonlyUser = Readonly<User>;
// { readonly id: number; readonly name: string; ... }

// 2. Partial<T> - Make all properties optional
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; }

// 3. Record<K, T> - Create object with keys K and values T
type UserRoles = Record<"admin" | "user" | "guest", User>;
// { admin: User; user: User; guest: User; }

// 4. Pick<T, K> - Select specific properties
type UserPreview = Pick<User, "id" | "name">;
// { id: number; name: string; }

// 5. Omit<T, K> - Exclude specific properties
type UserWithoutEmail = Omit<User, "email">;
// { id: number; name: string; }
```

### Creating Custom Mapped Types:

```typescript
// Make all properties nullable
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

interface Config {
  host: string;
  port: number;
}

type NullableConfig = Nullable<Config>;
// { host: string | null; port: number | null; }

// Get only properties of specific type
type StringPropertiesOnly<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

interface Data {
  name: string;
  age: number;
  email: string;
  score: number;
}

type StringFields = StringPropertiesOnly<Data>;
// { name: string; email: string; }

// Get only method names (getters)
type GetterNames<T> = {
  [K in keyof T as K extends `get${infer U}`
    ? Uncapitalize<U>
    : never]: T[K];
};

class MyClass {
  getName() { return "name"; }
  getAge() { return 30; }
  description = "test";
}

type Getters = GetterNames<MyClass>;
// { name: () => string; age: () => number; }
```

---

## 32. What are conditional types?

**Answer:**

**Conditional types** choose one type or another based on a condition. They're like type-level if-else statements.

### Syntax:

```typescript
T extends U ? X : Y
```

### Real Example - Simple Conditional:

```typescript
// If T is string, type is boolean; otherwise type is number
type IsString<T> = T extends string ? boolean : number;

type A = IsString<"hello">;  // boolean
type B = IsString<123>;      // number
type C = IsString<User>;     // number

// Real use case - extract element type from array
type GetArrayElement<T> = T extends (infer U)[] ? U : T;

type ArrayString = GetArrayElement<string[]>;  // string
type ArrayNumber = GetArrayElement<number[]>;  // number
type Scalar = GetArrayElement<string>;         // string

// Extract return type from function
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type F1 = ReturnType<(x: number) => string>;   // string
type F2 = ReturnType<(x: string) => number>;   // number
```

### Real Example - Conditional with Union Types:

```typescript
// Conditional types distribute over unions
type NonNullable<T> = T extends null | undefined ? never : T;

type A = NonNullable<string | null>;           // string
type B = NonNullable<number | undefined>;      // number
type C = NonNullable<string | null | 0>;       // string | 0

// Use case: Create nullable type
type Nullable<T> = T extends null | undefined ? T : T | null;

type StrOrNull = Nullable<string>;             // string | null
type NumOrNull = Nullable<number>;             // number | null
```

### Practical Example - API Response Handling:

```typescript
interface SuccessResponse {
  status: "success";
  data: string;
}

interface ErrorResponse {
  status: "error";
  error: string;
}

type ApiResponse = SuccessResponse | ErrorResponse;

// Extract data type based on response status
type GetData<T> = T extends { status: "success"; data: infer D }
  ? D
  : T extends { status: "error"; error: infer E }
  ? E
  : never;

type SuccessData = GetData<SuccessResponse>; // string
type ErrorData = GetData<ErrorResponse>;     // string
```

### Using `infer` Keyword:

The `infer` keyword lets you extract and reuse types from the condition.

```typescript
// Extract Promise value
type PromiseValue<T> = T extends Promise<infer U> ? U : T;

type P1 = PromiseValue<Promise<string>>;   // string
type P2 = PromiseValue<Promise<number>>;   // number
type P3 = PromiseValue<string>;            // string

// Extract function parameter types
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

type P1 = Parameters<(x: number, y: string) => void>;
// [x: number, y: string]

// Extract constructor parameters
type ConstructorParams<T> = T extends new (...args: infer P) => any
  ? P
  : never;

class User {
  constructor(name: string, age: number) {}
}

type UserParams = ConstructorParams<typeof User>;
// [name: string, age: number]
```

---

## Complete Summary of Q26-Q32

You now understand:

✅ **Generics** - Reusable types for multiple type parameters
✅ **Why generics matter** - Type safety and reusability
✅ **Generic constraints** - Limit what types can be used
✅ **Generic classes** - Classes with type parameters
✅ **Generic interfaces** - Interfaces with type parameters
✅ **Mapped types** - Transform existing types
✅ **Conditional types** - Type-level if-else logic

**These advanced type features enable powerful, reusable TypeScript code!** 💪
