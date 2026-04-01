# TypeScript Interview Questions (Q16-Q25 Detailed Answers)

## SECTION 2: INTERFACES & CLASSES

## 16. What are interfaces in TypeScript?

**Answer:**

**Interfaces** define the **structure** or **shape** of objects - what properties and methods they must have.

### Simple Analogy:

Think of an interface like a **contract** or **blueprint**:
- "If you want to be a Car, you must have: wheels, engine, doors"
- "If you want to be a User, you must have: id, name, email"

### Real Example:

```typescript
// Define what a User should look like
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

// Use the interface to type a variable
const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  isActive: true
};

// Type checking works!
const user2: User = {
  id: 2,
  name: "Bob"
  // ❌ Error: Missing 'email' and 'isActive'
};
```

### Functions with Interfaces:

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

function displayProduct(product: Product): void {
  console.log(`${product.name}: $${product.price}`);
}

displayProduct({
  id: 1,
  name: "Laptop",
  price: 999,
  inStock: true
}); // ✅ OK

displayProduct({
  id: 2,
  name: "Phone"
}); // ❌ Error: Missing properties
```

### Methods in Interfaces:

```typescript
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

const myCalc: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};

myCalc.add(5, 3); // 8
myCalc.subtract(10, 4); // 6
```

### Benefits of Interfaces:

✅ **Clear contracts** - Everyone knows what properties are needed  
✅ **Type safety** - Catch missing or wrong properties  
✅ **Documentation** - Interface shows what object should contain  
✅ **IDE support** - Autocomplete shows all required properties  

---

## 17. How do you extend interfaces?

**Answer:**

**Extending interfaces** means creating a new interface that includes all properties of another interface, plus new ones.

### Simple Analogy:

Think of extending like **inheriting traits**:
- Basic trait: "Has wheels"
- Car trait: Extends Basic, adds "Has engine"
- Tesla trait: Extends Car, adds "Is electric"

### Basic Extension:

```typescript
// Base interface
interface Animal {
  name: string;
  age: number;
}

// Extend it
interface Dog extends Animal {
  breed: string;
  barkVolume: number;
}

// Dog now has: name, age, breed, barkVolume
const myDog: Dog = {
  name: "Buddy",
  age: 3,
  breed: "Labrador",
  barkVolume: 85
};

// If you forget a property from Animal, error!
const badDog: Dog = {
  breed: "Poodle",
  barkVolume: 60
  // ❌ Error: Missing 'name' and 'age' from Animal
};
```

### Multiple Extension (Mix-ins):

```typescript
interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

// Duck can do both!
interface Duck extends Flyable, Swimmable {
  quack(): void;
}

const duck: Duck = {
  fly: () => console.log("Flying!"),
  swim: () => console.log("Swimming!"),
  quack: () => console.log("Quack!")
};

duck.fly(); // "Flying!"
duck.swim(); // "Swimming!"
duck.quack(); // "Quack!"
```

### Real Example - User Hierarchy:

```typescript
// Base user
interface User {
  id: number;
  name: string;
  email: string;
}

// Admin has everything User has, plus admin stuff
interface Admin extends User {
  permissions: string[];
  canDeleteUsers: boolean;
}

// Moderator extends User too
interface Moderator extends User {
  approveContent: boolean;
  canBanUsers: boolean;
}

// Premium user with payment info
interface PremiumUser extends User {
  subscriptionLevel: "gold" | "platinum";
  paymentMethod: string;
}

// Create instances
const admin: Admin = {
  id: 1,
  name: "John",
  email: "john@admin.com",
  permissions: ["delete", "ban"],
  canDeleteUsers: true
};

const premium: PremiumUser = {
  id: 2,
  name: "Alice",
  email: "alice@example.com",
  subscriptionLevel: "platinum",
  paymentMethod: "credit-card"
};
```

### Extending Generic Interfaces:

```typescript
interface Container<T> {
  value: T;
  getValue(): T;
}

interface NumberContainer extends Container<number> {
  add(n: number): void;
}

interface StringContainer extends Container<string> {
  uppercase(): string;
}

const numContainer: NumberContainer = {
  value: 42,
  getValue: () => 42,
  add: (n) => {
    // Add to value
  }
};
```

---

## 18. What are optional properties in interfaces?

**Answer:**

**Optional properties** are properties that **may or may not** be present on an object. Marked with `?`.

### Simple Analogy:

Think of optional properties like **toppings on a pizza**:
- Cheese: required
- Pepperoni: optional
- Mushrooms: optional

### Real Example:

```typescript
interface User {
  id: number;          // Required
  name: string;        // Required
  email: string;       // Required
  age?: number;        // Optional
  phone?: string;      // Optional
  address?: string;    // Optional
}

// Valid - has all required, some optional
const user1: User = {
  id: 1,
  name: "Alice",
  email: "alice@ex.com",
  age: 25,
  phone: "555-1234"
  // address is optional, can skip it
};

// Valid - has only required
const user2: User = {
  id: 2,
  name: "Bob",
  email: "bob@ex.com"
  // All optional properties skipped
};

// Invalid - missing required
const user3: User = {
  id: 3,
  name: "Charlie"
  // ❌ Error: Missing 'email' (required)
};
```

### Using Optional Properties:

```typescript
interface Config {
  apiUrl: string;
  timeout?: number;
  retries?: number;
  debug?: boolean;
}

function initializeApp(config: Config) {
  const timeout = config.timeout || 5000;  // Use default if not provided
  const retries = config.retries ?? 3;
  const debug = config.debug || false;
  
  console.log(`Connecting to ${config.apiUrl}`);
  console.log(`Timeout: ${timeout}ms`);
}

// Can call with just required property
initializeApp({ apiUrl: "https://api.example.com" });

// Or include optional ones
initializeApp({
  apiUrl: "https://api.example.com",
  timeout: 10000,
  debug: true
});
```

### Real Example - Form Validation:

```typescript
interface FormField {
  name: string;
  label: string;
  required: boolean;
  type: "text" | "email" | "password" | "number";
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  helpText?: string;
}

const emailField: FormField = {
  name: "email",
  label: "Email Address",
  required: true,
  type: "email",
  placeholder: "your@email.com",
  minLength: 5,
  helpText: "We'll never share your email"
  // maxLength and pattern are optional
};

const passwordField: FormField = {
  name: "password",
  label: "Password",
  required: true,
  type: "password",
  minLength: 8,
  pattern: /^(?=.*[A-Z])(?=.*\d)/  // At least one uppercase, one digit
  // Other optional properties omitted
};
```

### Optional vs Required Pattern:

```typescript
// ❌ ALL optional (too loose)
interface BadConfig {
  name?: string;
  email?: string;
  age?: number;
}

// ✅ Mix required and optional (good)
interface GoodConfig {
  name: string;      // Always need this
  email: string;     // Always need this
  age?: number;      // Nice to have
  phone?: string;    // Nice to have
}
```

---

## 19. What are readonly properties?

**Answer:**

**Readonly properties** can only be assigned when creating the object, never changed afterward.

### Simple Analogy:

Think of readonly like **immutable data**:
- Book: Once printed, can't change the pages
- Certificate: Once issued, can't modify it

### Real Example:

```typescript
interface User {
  readonly id: number;     // Can't change after creation
  readonly email: string;  // Can't change after creation
  name: string;            // Can be changed
}

const user: User = {
  id: 1,
  email: "john@example.com",
  name: "John"
};

// Can update name
user.name = "Jane"; // ✅ OK

// Cannot update readonly properties
user.id = 2; // ❌ Error: Cannot assign to readonly property 'id'
user.email = "jane@example.com"; // ❌ Error: Cannot assign to readonly property 'email'
```

### Readonly Arrays:

```typescript
interface ReadonlyConfig {
  readonly allowedRoles: readonly string[];
}

const config: ReadonlyConfig = {
  allowedRoles: ["admin", "user", "guest"]
};

// Can read
console.log(config.allowedRoles[0]); // "admin" ✅

// Cannot modify
config.allowedRoles.push("moderator"); // ❌ Error
config.allowedRoles[0] = "superadmin"; // ❌ Error
```

### Real Example - Database Record:

```typescript
interface DatabaseRecord {
  readonly id: string;        // Never changes
  readonly createdAt: Date;   // Set once
  readonly createdBy: string; // Set once
  title: string;              // Can be updated
  content: string;            // Can be updated
  readonly deletedAt?: Date;  // Can only be set once (deletion date)
}

const record: DatabaseRecord = {
  id: "doc-123",
  createdAt: new Date(),
  createdBy: "admin@example.com",
  title: "My Document",
  content: "Initial content"
};

// Can edit working data
record.title = "Updated Title"; // ✅ OK
record.content = "Updated content"; // ✅ OK

// Cannot edit metadata
record.id = "doc-456"; // ❌ Error
record.createdAt = new Date(); // ❌ Error
record.createdBy = "user@example.com"; // ❌ Error
```

### Benefits:

✅ **Prevents accidental changes** to important data  
✅ **Documents intent** - Shows which fields are fixed  
✅ **Type safety** - Compiler prevents modifications  

---

## 20. What are index signatures?

**Answer:**

**Index signatures** let you define properties with **unknown names** - you know the type but not the exact property names.

### Simple Analogy:

Think of index signatures like a **phonebook**:
- You have many contact names (unknown how many)
- Each maps to a phone number
- You don't know all names in advance

### Real Example - Dictionary:

```typescript
interface Dictionary {
  [key: string]: string; // Key is string, value is string
}

const translations: Dictionary = {
  hello: "Hola",
  goodbye: "Adiós",
  please: "Por favor",
  thank: "Gracias"
};

// Can add any string key
translations.welcome = "Bienvenido"; // ✅ OK

// Access any property
console.log(translations.hello); // "Hola"
console.log(translations["goodbye"]); // "Adiós"
```

### With Multiple Index Signatures:

```typescript
interface FlexibleObject {
  [key: string]: string | number; // Value can be string OR number
}

const obj: FlexibleObject = {
  name: "Alice",    // string ✅
  age: 30,          // number ✅
  email: "a@ex.com" // string ✅
};

obj.score = 95;     // number ✅
obj.status = "ok";  // string ✅
// obj.flag = true; // ❌ Error: boolean not allowed
```

### Real Example - Application Settings:

```typescript
interface Settings {
  [key: string]: string | number | boolean;
}

const appSettings: Settings = {
  theme: "dark",
  fontSize: 14,
  autoSave: true,
  debugMode: false,
  maxRetries: 3,
  apiTimeout: 5000,
  notificationsEnabled: true
};

// Can access any setting
function getSetting(key: string) {
  return appSettings[key];
}

// Can set any setting
function setSetting(key: string, value: string | number | boolean) {
  appSettings[key] = value;
}
```

### Real Example - API Response Map:

```typescript
interface APIResponses {
  [endpoint: string]: any; // Any endpoint can return any data
}

const responses: APIResponses = {
  "/users": [{ id: 1, name: "Alice" }],
  "/products": { id: 101, title: "Laptop" },
  "/status": { code: 200, message: "OK" }
};

// Access different endpoints
console.log(responses["/users"]);
console.log(responses["/products"]);
```

### Fixed Properties + Index Signature:

```typescript
interface User {
  id: number;           // Fixed property
  name: string;         // Fixed property
  [key: string]: any;   // Allow any other properties
}

const user: User = {
  id: 1,
  name: "Alice",
  age: 30,              // Extra property ✅
  department: "Sales",  // Extra property ✅
  customField: true     // Extra property ✅
};
```

---

## 21. How do you implement interfaces in classes?

**Answer:**

Classes can **implement** interfaces to ensure they have required properties and methods.

### Simple Analogy:

Think of `implements` like **promising to follow a contract**:
- Interface: "You must have drive() and stop() methods"
- Car class: "I promise to implement both!"

### Real Example:

```typescript
interface Animal {
  name: string;
  speak(): void;
  move(): void;
}

// Class promises to implement Animal interface
class Dog implements Animal {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  speak(): void {
    console.log(`${this.name} says: Woof!`);
  }
  
  move(): void {
    console.log(`${this.name} is running`);
  }
}

// Using the class
const dog = new Dog("Buddy");
dog.speak(); // "Buddy says: Woof!"
dog.move(); // "Buddy is running"
```

### Implementing Multiple Interfaces:

```typescript
interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

// Class implements both
class Duck implements Flyable, Swimmable {
  fly(): void {
    console.log("Duck is flying");
  }
  
  swim(): void {
    console.log("Duck is swimming");
  }
  
  quack(): void {
    console.log("Quack!");
  }
}

const duck = new Duck();
duck.fly(); // "Duck is flying"
duck.swim(); // "Duck is swimming"
duck.quack(); // "Quack!"
```

### Real Example - Database Interface:

```typescript
interface DatabaseConnection {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  query(sql: string): Promise<any[]>;
  insert(table: string, data: object): Promise<void>;
}

class MySQLConnection implements DatabaseConnection {
  async connect(): Promise<void> {
    console.log("Connecting to MySQL...");
    // Connection logic
  }
  
  async disconnect(): Promise<void> {
    console.log("Disconnecting from MySQL...");
  }
  
  async query(sql: string): Promise<any[]> {
    console.log("Executing query:", sql);
    // Query logic
    return [];
  }
  
  async insert(table: string, data: object): Promise<void> {
    console.log(`Inserting into ${table}`);
  }
}

class PostgreSQLConnection implements DatabaseConnection {
  async connect(): Promise<void> {
    console.log("Connecting to PostgreSQL...");
  }
  
  async disconnect(): Promise<void> {
    console.log("Disconnecting from PostgreSQL...");
  }
  
  async query(sql: string): Promise<any[]> {
    console.log("Executing PostgreSQL query:", sql);
    return [];
  }
  
  async insert(table: string, data: object): Promise<void> {
    console.log(`Inserting into PostgreSQL ${table}`);
  }
}

// Both classes follow the same contract
const db: DatabaseConnection = new MySQLConnection();
// or
const db2: DatabaseConnection = new PostgreSQLConnection();
```

### Benefits:

✅ **Type safety** - Compiler ensures all methods exist  
✅ **Contract** - Clear what class must implement  
✅ **Interchangeable** - Different classes can implement same interface  

---

## 22. What are access modifiers (public, private, protected)?

**Answer:**

Access modifiers control **who can access** class properties and methods.

### Simple Analogy:

Think of access modifiers like **house zones**:
- **public** = Front porch (everyone can see)
- **private** = Bedroom (only you can enter)
- **protected** = Family areas (family can enter)

### Three Access Levels:

```typescript
class BankAccount {
  // PUBLIC: Anyone can access
  public accountNumber: string;
  
  // PRIVATE: Only this class can access
  private balance: number;
  
  // PROTECTED: This class and subclasses can access
  protected owner: string;
  
  constructor(accountNumber: string, balance: number, owner: string) {
    this.accountNumber = accountNumber;
    this.balance = balance;
    this.owner = owner;
  }
  
  // PUBLIC method - anyone can call
  public deposit(amount: number): void {
    this.balance += amount;
  }
  
  // PRIVATE method - only class can call
  private calculateInterest(): number {
    return this.balance * 0.05;
  }
  
  // PROTECTED method - class and subclasses can call
  protected getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount("123456", 1000, "John");

// PUBLIC: Can access
console.log(account.accountNumber); // "123456" ✅

// PUBLIC: Can call
account.deposit(500); // ✅

// PRIVATE: Cannot access
console.log(account.balance); // ❌ Error: Private property

// PRIVATE: Cannot call
account.calculateInterest(); // ❌ Error: Private method

// PROTECTED: Cannot access (not a subclass)
console.log(account.owner); // ❌ Error: Protected property
```

### Using Protected in Inheritance:

```typescript
class BankAccount {
  protected balance: number;
  
  constructor(balance: number) {
    this.balance = balance;
  }
  
  protected getBalance(): number {
    return this.balance;
  }
}

class SavingsAccount extends BankAccount {
  addInterest(): void {
    const interest = this.getBalance() * 0.05;
    this.balance += interest; // Can access protected member!
  }
}

const savings = new SavingsAccount(1000);
savings.addInterest(); // ✅ Works
console.log(savings.getBalance()); // ❌ Error: Protected, can't access from outside
```

### Real Example - User Class:

```typescript
class User {
  public id: number;
  public email: string;
  
  private passwordHash: string;
  private sessionToken: string;
  
  protected role: string;
  
  constructor(id: number, email: string, passwordHash: string, role: string) {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = role;
  }
  
  // PUBLIC - anyone can check email
  public getEmail(): string {
    return this.email;
  }
  
  // PRIVATE - only user class can check password
  private verifyPassword(password: string): boolean {
    // Complex password verification
    return true;
  }
  
  // PRIVATE - only user class creates sessions
  private createSession(): string {
    this.sessionToken = "token-123";
    return this.sessionToken;
  }
  
  // PROTECTED - user and admins can check
  protected getRole(): string {
    return this.role;
  }
  
  // PUBLIC - login process
  public login(password: string): boolean {
    if (this.verifyPassword(password)) {
      this.createSession();
      return true;
    }
    return false;
  }
}

// Admin extends User
class Admin extends User {
  public getAllUsers(): void {
    console.log(`Admin with role ${this.getRole()} viewing all users`); // ✅ Protected OK
  }
}
```

### Default Access Level:

```typescript
class Example {
  // All these are PUBLIC by default
  x: number; // public x
  
  y: number; // public y
  
  method() { } // public method
  
  // To be private, must say 'private'
  private secret: string;
}
```

---

## 23. What are abstract classes?

**Answer:**

**Abstract classes** are base classes that **cannot be instantiated directly**. They exist to be inherited and extended.

### Simple Analogy:

Think of abstract classes like **blueprints for buildings**:
- Blueprint itself isn't a building
- Builders use blueprint to create actual buildings
- Blueprint defines what must be in building

### Real Example:

```typescript
// Cannot create abstract class directly
abstract class Animal {
  abstract name: string;
  
  abstract makeSound(): void; // Must be implemented by subclass
  
  // Concrete method (same for all)
  sleep(): void {
    console.log("Sleeping...");
  }
}

// Error: Cannot instantiate abstract class
// const animal = new Animal(); // ❌ Error

// Subclass must implement abstract methods
class Dog extends Animal {
  name: string = "Dog";
  
  makeSound(): void {
    console.log("Woof!");
  }
}

const dog = new Dog(); // ✅ OK
dog.makeSound(); // "Woof!"
dog.sleep(); // "Sleeping..." (from abstract class)
```

### Real Example - Logger Framework:

```typescript
abstract class Logger {
  abstract log(message: string): void;
  
  abstract error(message: string): void;
  
  // Common behavior
  info(message: string): void {
    this.log(`[INFO] ${message}`);
  }
  
  warn(message: string): void {
    this.log(`[WARN] ${message}`);
  }
}

class ConsoleLogger extends Logger {
  log(message: string): void {
    console.log(message);
  }
  
  error(message: string): void {
    console.error(message);
  }
}

class FileLogger extends Logger {
  log(message: string): void {
    // Write to file
  }
  
  error(message: string): void {
    // Write error to file
  }
}

// Usage
const logger: Logger = new ConsoleLogger();
logger.info("Application started"); // Works ✅
logger.error("Something went wrong"); // Works ✅
```

### Abstract Properties:

```typescript
abstract class Vehicle {
  abstract wheelCount: number;
  abstract start(): void;
}

class Car extends Vehicle {
  wheelCount: number = 4; // ✅ Must implement
  
  start(): void {
    console.log("Car starting");
  }
}

class Motorcycle extends Vehicle {
  wheelCount: number = 2;
  
  start(): void {
    console.log("Motorcycle starting");
  }
}
```

---

## 24. What is the difference between abstract class and interface?

**Answer:**

| Aspect | Abstract Class | Interface |
|--------|---|---|
| **Instantiation** | Cannot create instance | Cannot create instance |
| **Implementation** | Can have implementation | Only describes structure |
| **Properties** | Can have fields with values | Can describe fields (no values) |
| **Methods** | Can mix abstract & concrete | All abstract by default |
| **Access modifiers** | public, private, protected | Mostly public |
| **Inheritance** | Extend one class | Implement multiple |
| **Use case** | Shared code | Contracts |

### Real Example Showing Differences:

```typescript
// ABSTRACT CLASS - Has implementation
abstract class Animal {
  // Has actual field with value
  protected species: string = "Unknown";
  
  // Abstract method (no body)
  abstract makeSound(): void;
  
  // Concrete method (has body)
  move(): void {
    console.log("Moving...");
  }
  
  // Can have private stuff
  private incrementAge(): void {
    // Implementation
  }
}

// INTERFACE - Only describes shape
interface Drawable {
  // Only describes, no implementation
  color: string;
  size: number;
  
  // Only method signature, no body
  draw(): void;
}
```

### When to Use Abstract Class:

✅ Share **implementation** across classes  
✅ Have **protected** or **private** members  
✅ Define **non-public** properties  

```typescript
abstract class BaseRepository {
  protected db: Database; // Protected shared property
  
  async findById(id: string) {
    // Shared implementation
    return this.db.query(`SELECT * WHERE id = ${id}`);
  }
  
  abstract validate(data: any): boolean;
}

class UserRepository extends BaseRepository {
  validate(user: any): boolean {
    return user.id && user.name;
  }
}
```

### When to Use Interface:

✅ Define **contracts** for unrelated classes  
✅ Multiple unrelated classes implement it  
✅ Just describing **what** not **how**  

```typescript
// Unrelated things that can be "saved"
interface Saveable {
  save(): Promise<void>;
}

class User implements Saveable {
  async save(): Promise<void> { }
}

class Document implements Saveable {
  async save(): Promise<void> { }
}

class Settings implements Saveable {
  async save(): Promise<void> { }
}
```

---

## 25. When should you use 'interface' vs 'type'? (REPEATED - KEY QUESTION)

**Answer:**

This is so important it appears twice! Here's the practical guide:

### Decision Tree:

```
Are you defining an object shape?
├─ YES, with shared implementation → USE ABSTRACT CLASS
├─ YES, simple contract → USE INTERFACE
├─ NO, need unions/intersections → USE TYPE
├─ NO, need primitives → USE TYPE
└─ NO, complex transformations → USE TYPE
```

### Real World Scenarios:

**Scenario 1: API Response (use interface)**
```typescript
interface UserResponse {
  id: number;
  name: string;
  email: string;
}
```

**Scenario 2: Database Model (use interface)**
```typescript
interface User {
  id: number;
  email: string;
  createdAt: Date;
}
```

**Scenario 3: Union of responses (use type)**
```typescript
type ApiResponse = 
  | SuccessResponse
  | ErrorResponse
  | LoadingResponse;
```

**Scenario 4: Shared code (use abstract class)**
```typescript
abstract class Repository {
  async findById(id: string) {
    // Shared implementation
  }
}
```

### Team Recommendation:

```
For most teams:
- Interface = 70% of cases (objects, contracts)
- Type = 20% of cases (unions, transformations)
- Abstract class = 10% of cases (shared code)
```

---

## Complete Summary of Q16-Q25

You now understand:

✅ **Interfaces** - Define object shapes and contracts  
✅ **Extending interfaces** - Create hierarchies of types  
✅ **Optional properties** - Make some properties optional  
✅ **Readonly properties** - Make properties immutable  
✅ **Index signatures** - Allow unknown property names  
✅ **Implementing interfaces** - Classes must follow contracts  
✅ **Access modifiers** - Control who can access what  
✅ **Abstract classes** - Base classes that can't be instantiated  
✅ **Abstract vs Interface** - Key differences in use  
✅ **Interface vs Type** - When to use which  

**These foundations are essential for object-oriented TypeScript!** 🏗️
