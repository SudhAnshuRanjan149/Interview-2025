# TypeScript Interview Questions (Q33-Q41 Detailed Answers)

## SECTION 4: ADVANCED TYPES & TYPE MANIPULATION

## 33. What is type narrowing (type guards)?

**Answer:**

**Type narrowing** is the process where TypeScript refines a variable's type to a more specific type based on code analysis and runtime checks. **Type guards** are expressions or functions that help the compiler narrow types.

### Simple Analogy:

Think of type narrowing like a **detective investigation**:

- Start with: "The criminal is either Alice or Bob"
- Found: Alice was in New York at the time
- Narrowed: "The criminal must be Bob"

### Using typeof Guard:

```typescript
function printValue(value: string | number) {
  // value is string | number here
  
  if (typeof value === "string") {
    // Inside this block, value is narrowed to string
    console.log(value.toUpperCase());
  } else {
    // Inside this block, value is narrowed to number
    console.log(value.toFixed(2));
  }
}

printValue("hello");  // "HELLO"
printValue(42);       // "42.00"
```

### Using instanceof Guard:

```typescript
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

function handlePet(pet: Animal | Dog) {
  if (pet instanceof Dog) {
    // pet is Dog here
    pet.bark();
  } else {
    // pet is Animal here
    pet.move();
  }
}
```

### Using 'in' Operator Guard:

```typescript
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    // animal is Fish here
    animal.swim();
  } else {
    // animal is Bird here
    animal.fly();
  }
}
```

### User-Defined Type Guard:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Type predicate function
function isUser(obj: any): obj is User {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    typeof obj.email === "string"
  );
}

function processEntity(entity: unknown) {
  if (isUser(entity)) {
    // entity is User here
    console.log(entity.name);
  } else {
    console.log("Not a user");
  }
}
```

### Real Example - API Response Handler:

```typescript
type SuccessResponse = {
  status: "success";
  data: { id: number; name: string };
};

type ErrorResponse = {
  status: "error";
  error: string;
};

type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(response: ApiResponse) {
  // Discriminated union - narrow by discriminator
  if (response.status === "success") {
    // response is SuccessResponse here
    console.log(response.data.name);
  } else {
    // response is ErrorResponse here
    console.log(response.error);
  }
}
```

### Truthiness Guard:

```typescript
function printLength(str: string | null | undefined) {
  if (str) {
    // str is string here (null and undefined removed)
    console.log(str.length);
  } else {
    console.log("No string provided");
  }
}
```

### Control Flow Analysis:

```typescript
function process(value: string | number) {
  // Start: value is string | number
  
  if (typeof value === "string") {
    // Here: value is string
    return value.toUpperCase();
  }
  
  // Here: value is number (string already returned)
  return value + 10;
}
```

---

## 34. What are utility types (Partial, Required, Pick, Omit, etc.)?

**Answer:**

**Utility types** are built-in generic types that perform common type transformations. They help you manipulate and construct new types from existing ones.

### Partial`<T>` - Make All Properties Optional:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type PartialUser = Partial<User>;
// Results in:
// {
//   id?: number;
//   name?: string;
//   email?: string;
//   age?: number;
// }

// Useful for updates
function updateUser(id: number, updates: PartialUser) {
  // Can pass any subset of properties
}

updateUser(1, { name: "Alice" });
updateUser(1, { email: "alice@example.com", age: 25 });
```

### Required`<T>` - Make All Properties Required:

```typescript
interface Config {
  url?: string;
  timeout?: number;
  retries?: number;
}

type RequiredConfig = Required<Config>;
// Results in:
// {
//   url: string;
//   timeout: number;
//   retries: number;
// }

// Enforces all properties must be provided
function createConnection(config: RequiredConfig) {
  // All properties guaranteed to exist
}
```

### Readonly`<T>` - Make All Properties Readonly:

```typescript
interface User {
  id: number;
  name: string;
}

type ReadonlyUser = Readonly<User>;
// Results in:
// {
//   readonly id: number;
//   readonly name: string;
// }

const user: ReadonlyUser = { id: 1, name: "Alice" };
// user.id = 2; // Error: Cannot assign to readonly property
```

### Pick<T, K> - Select Specific Properties:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  address: string;
}

type PublicUserInfo = Pick<User, "id" | "name">;
// Results in:
// {
//   id: number;
//   name: string;
// }

// Use for API responses
function getUserPublicInfo(): PublicUserInfo {
  return { id: 1, name: "Alice" };
}
```

### Omit<T, K> - Exclude Specific Properties:

```typescript
type PrivateUserInfo = Omit<User, "email" | "address">;
// Results in:
// {
//   id: number;
//   name: string;
//   age: number;
// }

// Use when you want everything except certain fields
function getUserPrivateInfo(): PrivateUserInfo {
  return { id: 1, name: "Alice", age: 25 };
}
```

### Record<K, T> - Create Object with Specific Keys:

```typescript
type Role = "admin" | "user" | "guest";

type Permissions = Record<Role, string[]>;
// Results in:
// {
//   admin: string[];
//   user: string[];
//   guest: string[];
// }

const permissions: Permissions = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"]
};

// Type-safe key access
const adminPerms = permissions["admin"]; // string[]
```

### Exclude<T, U> - Remove Types from Union:

```typescript
type Letters = "a" | "b" | "c" | "d";

type OnlyABC = Exclude<Letters, "d">;
// Results in: "a" | "b" | "c"

type ExcludeNumbers = Exclude<string | number | boolean, number>;
// Results in: string | boolean
```

### Extract<T, U> - Keep Only Matching Types:

```typescript
type ExtractLetters = Extract<Letters, "a" | "b">;
// Results in: "a" | "b"

type OnlyStrings = Extract<string | number | boolean, string>;
// Results in: string
```

### NonNullable`<T>` - Remove null and undefined:

```typescript
type MaybeString = string | null | undefined;

type StrictString = NonNullable<MaybeString>;
// Results in: string

// Useful for narrowing
type MaybeUser = User | null | undefined;
type DefiniteUser = NonNullable<MaybeUser>;
// Results in: User
```

### ReturnType`<T>` - Extract Return Type:

```typescript
function getUserById(id: number): User {
  return { id, name: "Alice", email: "alice@ex.com" };
}

type UserReturnType = ReturnType<typeof getUserById>;
// Results in: User
```

### Parameters`<T>` - Extract Function Parameters:

```typescript
type GetUserParams = Parameters<typeof getUserById>;
// Results in: [id: number]

// Create function with same signature
const getUser: (...args: GetUserParams) => User = getUserById;
```

### Real Example - API Response Types:

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
  error?: string;
}

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

// API returns full response
type UserApiResponse = ApiResponse<User>;

// Public response (omit password)
type PublicUserResponse = ApiResponse<Omit<User, "password">>;

// Partial update response
type UpdateUserRequest = Partial<Omit<User, "id">>;

// Response without error field
type SuccessResponse<T> = Omit<ApiResponse<T>, "error">;
```

---

## 35. What is the 'keyof' operator?

**Answer:**

**keyof** produces a **union of property names** (keys) from a type. It lets you refer to property names in a type-safe way.

### Simple Analogy:

Think of `keyof` like getting all **column names from a database table**.

### Basic Usage:

```typescript
type User = {
  id: number;
  name: string;
  email: string;
};

type UserKeys = keyof User;
// Results in: "id" | "name" | "email"

// Now you can use it as a type
let key: UserKeys = "id";     // ✅ OK
// let wrongKey: UserKeys = "password"; // ❌ Error
```

### Accessing Type Properties Safely:

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = { id: 1, name: "Alice", email: "alice@ex.com" };

const userId = getProperty(user, "id");      // type: number
const userName = getProperty(user, "name");  // type: string

// getProperty(user, "password"); // ❌ Error: "password" not in keyof User
```

### Mapping Over Keys:

```typescript
type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};
// Results in:
// {
//   readonly id: number;
//   readonly name: string;
//   readonly email: string;
// }

type OptionalUser = {
  [K in keyof User]?: User[K];
};
// Results in:
// {
//   id?: number;
//   name?: string;
//   email?: string;
// }
```

### Creating Getters and Setters:

```typescript
function createGetter<T, K extends keyof T>(obj: T, key: K) {
  return () => obj[key];
}

function createSetter<T, K extends keyof T>(obj: T, key: K) {
  return (value: T[K]) => {
    obj[key] = value;
  };
}

const user: User = { id: 1, name: "Alice", email: "alice@ex.com" };

const getName = createGetter(user, "name");
const setName = createSetter(user, "name");

console.log(getName()); // "Alice"
setName("Bob");
console.log(getName()); // "Bob"
```

### Real Example - Object Validator:

```typescript
function validateProperty<T, K extends keyof T>(
  obj: T,
  key: K,
  validator: (value: T[K]) => boolean
): boolean {
  return validator(obj[key]);
}

const user: User = { id: 1, name: "Alice", email: "alice@ex.com" };

const isValidEmail = validateProperty(user, "email", (email) =>
  email.includes("@")
);

// validateProperty(user, "password", ...); // ❌ Error
```

---

## 36. What is the 'typeof' operator?

**Answer:**

TypeScript's `typeof` operator (at the **type level**) captures the static type of a variable and lets you reuse it. This is different from JavaScript's runtime `typeof`.

### Simple Analogy:

Think of `typeof` like taking a **photograph of a type** to use it elsewhere.

### Capturing Variable Types:

```typescript
// Regular variable
const config = {
  url: "/api/users",
  timeout: 5000,
  withCredentials: true
};

// Capture its type
type ConfigType = typeof config;
// Results in:
// {
//   url: string;
//   timeout: number;
//   withCredentials: boolean;
// }

// Reuse the type
const anotherConfig: ConfigType = {
  url: "/api/posts",
  timeout: 3000,
  withCredentials: false
};
```

### Capturing Function Return Types:

```typescript
function getUser(id: number) {
  return { id, name: "Alice", email: "alice@ex.com" };
}

type User = ReturnType<typeof getUser>;
// Results in:
// {
//   id: number;
//   name: string;
//   email: string;
// }

const user: User = getUser(1);
```

### Capturing Enum Types:

```typescript
const Direction = {
  Up: "UP",
  Down: "DOWN",
  Left: "LEFT",
  Right: "RIGHT"
} as const;

type DirectionType = typeof Direction;
// Results in:
// {
//   readonly Up: "UP";
//   readonly Down: "DOWN";
//   readonly Left: "LEFT";
//   readonly Right: "RIGHT";
// }

type DirectionValue = DirectionType[keyof DirectionType];
// Results in: "UP" | "DOWN" | "LEFT" | "RIGHT"
```

### Capturing Array Element Types:

```typescript
const colors = ["red", "green", "blue"] as const;

type ColorType = typeof colors;
// Results in: readonly ["red", "green", "blue"]

type Color = typeof colors[number];
// Results in: "red" | "green" | "blue"
```

### Real Example - Configuration Types:

```typescript
const appConfig = {
  environment: "production" as const,
  version: "1.0.0",
  features: {
    auth: true,
    api: true,
    websocket: false
  }
};

type AppConfig = typeof appConfig;

function initializeApp(config: AppConfig) {
  console.log(`Starting ${config.environment} v${config.version}`);
}

initializeApp(appConfig);
```

### Combining typeof with keyof:

```typescript
type ConfigKeys = keyof typeof appConfig;
// Results in: "environment" | "version" | "features"

function getConfigValue<K extends keyof typeof appConfig>(
  key: K
): typeof appConfig[K] {
  return appConfig[key];
}

const env = getConfigValue("environment"); // type: "production"
```

### Runtime vs Type-Level typeof:

```typescript
// Runtime typeof (JavaScript)
const value = 42;
if (typeof value === "number") {
  console.log("It's a number");
}

// Type-level typeof (TypeScript)
type ValueType = typeof value;
// ValueType is: number

// They can be used together
const anotherValue: typeof value = 100; // Must be number
```

---

## 37. What are template literal types?

**Answer:**

**Template literal types** create new string types by combining string literals and unions using template syntax. They work similar to JavaScript template strings but at the type level.

### Simple Analogy:

Think of template literal types like a **type generator** that combines patterns.

### Basic String Literal Types:

```typescript
type Greeting = `Hello, World!`;

const greeting: Greeting = "Hello, World!"; // ✅ OK
// const wrong: Greeting = "Hi"; // ❌ Error
```

### Combining with Unions:

```typescript
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type ApiPath = "/users" | "/posts" | "/comments";

type ApiEndpoint = `${HttpMethod} ${ApiPath}`;
// Results in:
// "GET /users" | "GET /posts" | "GET /comments" |
// "POST /users" | "POST /posts" | "POST /comments" |
// ... (12 total combinations)

const endpoint: ApiEndpoint = "GET /users"; // ✅ OK
```

### Creating Event Handler Names:

```typescript
type Event = "click" | "hover" | "submit" | "blur";

type EventHandler = `on${Capitalize<Event>}`;
// Results in: "onClick" | "onHover" | "onSubmit" | "onBlur"

function addEventListener(handler: EventHandler, callback: () => void) {
  // ...
}

addEventListener("onClick", () => console.log("Clicked"));
```

### Generating Database Queries:

```typescript
type Table = "users" | "posts" | "comments";
type Action = "select" | "insert" | "update" | "delete";

type Query = `${Action}_${Table}`;
// Results in:
// "select_users" | "select_posts" | ... (12 combinations)

function executeQuery(query: Query) {
  // Handle different queries
}

executeQuery("select_users");  // ✅ OK
executeQuery("insert_posts");  // ✅ OK
// executeQuery("unknown"); // ❌ Error
```

### Intrinsic String Manipulation Types:

```typescript
type EventName = "click" | "hover" | "submit";

// Capitalize first letter
type CapitalizedEvent = Capitalize<EventName>;
// Results in: "Click" | "Hover" | "Submit"

// Lowercase
type LowercaseEvent = Lowercase<EventName>;
// Results in: "click" | "hover" | "submit"

// Uppercase
type UppercaseEvent = Uppercase<EventName>;
// Results in: "CLICK" | "HOVER" | "SUBMIT"

// Uncapitalize first letter
type UncapitalizedEvent = Uncapitalize<EventName>;
// Results in: "click" | "hover" | "submit"
```

### Real Example - React Props:

```typescript
type Size = "small" | "medium" | "large";
type Color = "red" | "blue" | "green";

type VariantClass = `${Size}-${Color}`;
// Results in: "small-red" | "small-blue" | ... (9 combinations)

interface ButtonProps {
  variant: VariantClass;
  label: string;
}

function Button({ variant, label }: ButtonProps) {
  return <button className={`btn-${variant}`}>{label}</button>;
}

<Button variant="large-red" label="Delete" />;
```

### Extracting Parts of Strings:

```typescript
type FileName = `${string}.${string}`;
// Matches any filename like "file.txt", "image.png"

function saveFile(filename: FileName, content: string) {
  // ...
}

saveFile("document.txt", "content");     // ✅ OK
// saveFile("no-extension", "content"); // ❌ Error (no dot)
```

---

## 38. What is the 'infer' keyword?

**Answer:**

The **`infer`** keyword is used inside conditional types to **capture and extract** types from complex type expressions. It allows you to "pull out" type parameters from nested types.

### Simple Analogy:

Think of `infer` like using a **variable in a pattern match** to extract information.

### Extracting Function Return Types:

```typescript
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type F1 = (a: number) => string;
type F2 = (a: string, b: boolean) => Promise<number>;

type R1 = GetReturnType<F1>; // string
type R2 = GetReturnType<F2>; // Promise<number>
```

### Extracting Array Element Types:

```typescript
type GetArrayElement<T> = T extends (infer U)[] ? U : never;

type StringArray = GetArrayElement<string[]>;    // string
type NumberArray = GetArrayElement<number[]>;    // number
type NotArray = GetArrayElement<boolean>;        // never
```

### Extracting Tuple Element Types:

```typescript
type GetFirstElement<T> = T extends [infer F, ...any[]] ? F : never;
type GetLastElement<T> = T extends [...any[], infer L] ? L : never;

type First = GetFirstElement<[string, number, boolean]>; // string
type Last = GetLastElement<[string, number, boolean]>;   // boolean
```

### Extracting Promise Resolved Values:

```typescript
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type P1 = UnwrapPromise<Promise<string>>;  // string
type P2 = UnwrapPromise<string>;           // string
type P3 = UnwrapPromise<Promise<number>>; // number
```

### Extracting Function Parameters:

```typescript
type GetParameters<T> = T extends (...args: infer P) => any ? P : never;

type F = (x: number, y: string) => void;
type Params = GetParameters<F>; // [x: number, y: string]

function callWithParams<T extends (...args: any[]) => any>(
  fn: T,
  ...args: GetParameters<T>
) {
  fn(...args);
}
```

### Extracting Object Property Types:

```typescript
type GetPropertyType<T, K extends keyof T> = T[K];

interface User {
  id: number;
  name: string;
}

type IdType = GetPropertyType<User, "id">;   // number
type NameType = GetPropertyType<User, "name">; // string
```

### Real Example - REST API Response Handler:

```typescript
type ApiCall<T> = {
  data: T;
  status: number;
};

type ExtractApiData<T> = T extends ApiCall<infer D> ? D : never;

type UserResponse = ApiCall<{ id: number; name: string }>;
type UserData = ExtractApiData<UserResponse>; // { id: number; name: string }

function handleResponse<T extends ApiCall<any>>(
  response: T
): ExtractApiData<T> {
  return response.data;
}

const userResponse: UserResponse = {
  data: { id: 1, name: "Alice" },
  status: 200
};

const userData = handleResponse(userResponse); // { id: number; name: string }
```

### Complex Example - Conditional Extraction:

```typescript
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type Nested = [1, [2, [3, [4]]]];
type Flattened = Flatten<Nested>; // number

type StringOrArrayOfNumbers = string | number[];
type Extracted = Flatten<StringOrArrayOfNumbers>; // string | number
```

---

## 39. What are enums in TypeScript?

**Answer:**

**Enums** are a TypeScript feature that lets you define a set of named constants. They provide friendly names for numeric or string values.

### Simple Analogy:

Think of enums like **named labels for a set of options**.

### Numeric Enums:

```typescript
enum Direction {
  Up = 0,
  Down = 1,
  Left = 2,
  Right = 3
}

// Auto-incremented (if not explicitly set)
enum AutoDirection {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right    // 3
}

let dir: Direction = Direction.Up;
console.log(dir); // 0

// Reverse mapping (numeric enums only)
console.log(Direction[0]); // "Up"
```

### String Enums:

```typescript
enum Status {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED"
}

let status: Status = Status.Pending;
console.log(status); // "PENDING"

// Better for debugging and API responses
function updateStatus(newStatus: Status) {
  console.log(`Status updated to ${newStatus}`);
}

updateStatus(Status.Approved);
```

### Mixed Enums:

```typescript
enum Mixed {
  No = 0,
  Yes = "YES"
}

// Not recommended but possible
```

### Using Enums in Functions:

```typescript
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}

function getColorName(color: Color): string {
  switch (color) {
    case Color.Red:
      return "Red color";
    case Color.Green:
      return "Green color";
    case Color.Blue:
      return "Blue color";
  }
}

getColorName(Color.Red); // "Red color"
```

### Const Enums:

```typescript
const enum HttpStatus {
  Ok = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404
}

let status = HttpStatus.Ok;
// Compiles to: let status = 200;
// No runtime code generated for enum
```

### Real Example - Game States:

```typescript
enum GameState {
  Menu = "MENU",
  Playing = "PLAYING",
  Paused = "PAUSED",
  GameOver = "GAME_OVER"
}

enum Difficulty {
  Easy = "EASY",
  Normal = "NORMAL",
  Hard = "HARD"
}

interface Game {
  state: GameState;
  difficulty: Difficulty;
  score: number;
}

function playGame(game: Game) {
  if (game.state === GameState.Playing) {
    if (game.difficulty === Difficulty.Hard) {
      console.log("Challenging!");
    }
  }
}
```

---

## 40. What is the difference between numeric and string enums?

**Answer:**

| Aspect                    | Numeric Enums           | String Enums             |
| ------------------------- | ----------------------- | ------------------------ |
| **Syntax**          | `enum E { A = 0 }`    | `enum E { A = "A" }`   |
| **Auto-increment**  | ✅ Yes                  | ❌ No (must be explicit) |
| **Reverse Mapping** | ✅ Yes                  | ❌ No                    |
| **Debug Output**    | Numbers (less readable) | Strings (readable)       |
| **API Responses**   | Less common             | More common              |
| **Use Case**        | Flags, ordinal values   | Status, states, modes    |

### Numeric Enum Example:

```typescript
enum NumericDirection {
  Up,     // 0
  Down,   // 1
  Left,   // 2
  Right   // 3
}

console.log(NumericDirection.Up); // 0
console.log(NumericDirection[0]); // "Up" (reverse mapping)

// Good for: Flags, bit operations, performance
```

### String Enum Example:

```typescript
enum StringStatus {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED"
}

console.log(StringStatus.Pending); // "PENDING"
// console.log(StringStatus["PENDING"]); // undefined (no reverse mapping)

// Good for: API responses, logging, readability
```

### When to Use Which:

**Use Numeric:**

- Flags/bitwise operations
- Performance-critical code
- Internal state tracking

**Use String:**

- API responses (more readable)
- Serialization/logging
- User-facing values
- Clearer intent

### Real Example Comparison:

```typescript
// Numeric (less readable in logs)
enum HttpStatus {
  OK = 200,
  Created = 201,
  BadRequest = 400
}

console.log(HttpStatus.OK); // 200

// String (more readable in logs)
enum HttpStatusString {
  OK = "OK",
  Created = "CREATED",
  BadRequest = "BAD_REQUEST"
}

console.log(HttpStatusString.OK); // "OK"
```

---

## 41. What are const enums?

**Answer:**

**Const enums** are enums declared with the `const` keyword. They are completely removed during compilation and their values are inlined at use sites.

### Simple Analogy:

Think of const enums like **find-and-replace** - they're replaced with their actual values at compile time.

### Const Enum vs Regular Enum:

**Regular Enum:**

```typescript
enum Color {
  Red = 0,
  Green = 1,
  Blue = 2
}

let color = Color.Red;
// Compiled JS:
// let color = Color.Red;
// Runtime lookup needed
```

**Const Enum:**

```typescript
const enum ConstColor {
  Red = 0,
  Green = 1,
  Blue = 2
}

let color = ConstColor.Red;
// Compiled JS:
// let color = 0;
// Values inlined, no runtime lookup
```

### Benefits:

- ✅ **No runtime code** - Smaller bundle size
- ✅ **Better performance** - Direct value access
- ✅ **Same behavior** - From developer perspective

### Limitations:

- ❌ **Cannot iterate** - No enum object to iterate
- ❌ **Cannot reverse-map** - No `Color[0]` lookup
- ❌ **Library issues** - Can cause problems when exported

### String Const Enum:

```typescript
const enum Environment {
  Development = "DEV",
  Staging = "STAGING",
  Production = "PROD"
}

let env = Environment.Production;
// Compiled JS:
// let env = "PROD";
```

### When to Use Const Enums:

✅ **Small projects** - Bundle size doesn't matter much
✅ **Performance-critical code** - Every bit helps
✅ **Constants won't be exported** - Using internally only

❌ **Large libraries** - Users might need to iterate
❌ **External APIs** - Exported enums might be extended
❌ **Complex logic** - Might need enum object at runtime

### Real Example:

```typescript
// Configuration flags
const enum FeatureFlags {
  EnableAuth = "enable_auth",
  EnablePayments = "enable_payments",
  EnableAnalytics = "enable_analytics"
}

function isFeatureEnabled(feature: FeatureFlags): boolean {
  // Check if feature is enabled
  return true;
}

isFeatureEnabled(FeatureFlags.EnableAuth);
// Compiles to:
// isFeatureEnabled("enable_auth");
```

---

## Complete Summary of Q33-Q41

You now understand:

✅ **Type narrowing** - Refining types with guards
✅ **Utility types** - Partial, Required, Pick, Omit, etc.
✅ **keyof operator** - Getting property names
✅ **typeof operator** - Capturing types
✅ **Template literal types** - Creating string patterns
✅ **infer keyword** - Extracting types from patterns
✅ **Enums** - Named constants
✅ **Numeric vs string enums** - When to use which
✅ **Const enums** - Performance-optimized enums

**These advanced type features enable powerful, type-safe TypeScript code!** 💪
