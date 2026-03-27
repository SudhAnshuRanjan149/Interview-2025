# React Interview Questions - Basic Level (Detailed Answers)

## 1. What is React?

**Answer:**

React is a **JavaScript library** made by Facebook for building user interfaces. Think of it as a tool that helps you build interactive websites easily.

### Key Points:

**What does React do?**
- Builds web applications quickly
- Makes websites interactive
- Manages how data flows in your app
- Updates the page automatically when data changes

### Why Use React?

| Feature | Benefit |
|---------|---------|
| Component-based | Reuse code in different places |
| Declarative | Write what you want, not how to do it |
| Virtual DOM | Fast updates to the page |
| Easy to learn | Minimal JavaScript knowledge needed |
| Large community | Lots of help available online |

### Simple Analogy:

Think of React like **LEGO blocks**:
- Each block is a component
- You combine blocks to build bigger structures
- Blocks are reusable
- When you change one block, everything updates automatically

### Real Example:

```javascript
// Without React (Traditional JavaScript)
// Lots of code to update the page manually
document.getElementById('name').innerHTML = 'John';
document.getElementById('age').innerHTML = 25;

// With React
// Simple and clean
<UserProfile name="John" age={25} />
```

---

## 2. What is JSX?

**Answer:**

JSX stands for **JavaScript XML**. It allows you to write HTML-like code inside JavaScript!

### What is JSX?

JSX lets you write code that looks like HTML but it's actually JavaScript:

```javascript
// JSX looks like HTML
const greeting = <h1>Hello, World!</h1>;

// But it's really JavaScript
const greeting = React.createElement('h1', null, 'Hello, World!');
```

### Why Use JSX?

✅ Looks like HTML (familiar to developers)  
✅ Easy to read and understand  
✅ Mix JavaScript and HTML together  
✅ Less code to write  

### JSX Rules:

1. **Return single element:**
```javascript
// ❌ Wrong - multiple elements
return (
  <h1>Title</h1>
  <p>Text</p>
);

// ✅ Correct - wrapped in one element
return (
  <div>
    <h1>Title</h1>
    <p>Text</p>
  </div>
);
```

2. **Close all tags:**
```javascript
// ❌ Wrong - unclosed tag
<input type="text">

// ✅ Correct - self-closing tag
<input type="text" />
```

3. **Use className instead of class:**
```javascript
// ❌ Wrong - 'class' is reserved in JavaScript
<div class="container">Content</div>

// ✅ Correct - use 'className'
<div className="container">Content</div>
```

4. **Use camelCase for attributes:**
```javascript
// ❌ Wrong - using dash
<input onclick="handleClick" />

// ✅ Correct - use camelCase
<input onClick={handleClick} />
```

### JSX with Variables:

```javascript
const name = 'Alice';
const age = 25;

// Use curly braces to insert variables
const greeting = <h1>Hello, {name}! You are {age} years old.</h1>;
```

### JSX with JavaScript Expressions:

```javascript
const isLoggedIn = true;

// Use curly braces for any JavaScript expression
const message = <div>{isLoggedIn ? 'Welcome Back!' : 'Please Login'}</div>;
```

---

## 3. What are components in React?

**Answer:**

**Components** are reusable blocks of code that return JSX (what you see on the page).

### Simple Definition:

A component is a JavaScript function or class that returns HTML-like code (JSX).

### Real-World Analogy:

Think of components like **functions** in regular JavaScript:
- Functions do a specific job
- You can call them multiple times
- You pass data (arguments) to them
- Components work the same way!

### Types of Components:

### 1. Functional Components (Recommended):

```javascript
// Simple function that returns JSX
function Welcome() {
  return <h1>Hello, World!</h1>;
}

// Or using arrow function
const Welcome = () => {
  return <h1>Hello, World!</h1>;
};
```

### 2. Class Components (Older style):

```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, World!</h1>;
  }
}
```

### Reusing Components:

```javascript
// Define once
function Button() {
  return <button>Click Me</button>;
}

// Use many times
export default function App() {
  return (
    <div>
      <Button />
      <Button />
      <Button />
    </div>
  );
}
```

### Components with Data:

```javascript
// Component receives data (props)
function Card(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </div>
  );
}

// Use the component with different data
<Card title="React" description="Library for UI" />
<Card title="JavaScript" description="Programming language" />
```

---

## 4. What is the difference between functional and class components?

**Answer:**

| Aspect | Functional | Class |
|--------|-----------|-------|
| **Syntax** | JavaScript function | JavaScript class |
| **Learning** | Easier to learn | More complex |
| **Hooks** | Can use hooks | Cannot use hooks |
| **Performance** | Slightly faster | Slightly slower |
| **Code** | Less code | More code |
| **State** | Use useState | Use this.state |
| **Modern** | Recommended | Older style |

### Functional Component:

```javascript
function Welcome() {
  const [name, setName] = React.useState('John');
  
  return (
    <div>
      <h1>Hello, {name}</h1>
      <button onClick={() => setName('Alice')}>Change Name</button>
    </div>
  );
}
```

### Class Component (Same functionality):

```javascript
class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: 'John' };
  }
  
  render() {
    return (
      <div>
        <h1>Hello, {this.state.name}</h1>
        <button onClick={() => this.setState({ name: 'Alice' })}>
          Change Name
        </button>
      </div>
    );
  }
}
```

### Key Differences:

**Functional (Modern):**
- Simple function
- Use hooks (useState, useEffect)
- Recommended for new projects
- Easier to understand

**Class (Older):**
- Extends React.Component
- Use this.state and methods
- Still works but older style
- More verbose

### Recommendation:

✅ **Use Functional Components** - They are simpler and recommended for all new React projects!

---

## 5. What is the difference between state and props?

**Answer:**

**State** and **props** both hold data, but they work differently:

### State:

- **Internal data** of a component
- **Can be changed** (mutable)
- **Belongs to** one component
- **Updated** using setState or setCount
- **Created** inside the component

```javascript
function Counter() {
  const [count, setCount] = React.useState(0); // This is STATE
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Props:

- **External data** passed from parent
- **Cannot be changed** (immutable)
- **Comes from** parent component
- **Read-only** in child component
- **Created** in parent, used in child

```javascript
function Welcome(props) {
  // props.name comes from parent
  return <h1>Hello, {props.name}!</h1>;
}

// Parent passes props
<Welcome name="Alice" /> // Props set here
```

### Comparison Table:

| Aspect | State | Props |
|--------|-------|-------|
| **Owner** | Component itself | Parent component |
| **Mutable** | Can change | Cannot change |
| **Purpose** | Internal data | Pass data down |
| **Update** | setState/setX | Cannot update |
| **Example** | User input | Component setting |

### Real Example:

```javascript
// Parent Component (sends props)
function App() {
  const [userName, setUserName] = React.useState('Alice');
  
  return (
    <Profile 
      name={userName}  // This is PROPS
      onNameChange={setUserName}
    />
  );
}

// Child Component (receives props)
function Profile(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <button onClick={() => props.onNameChange('Bob')}>
        Change Name
      </button>
    </div>
  );
}
```

### Key Takeaway:

- **Props** = Data coming IN (from parent)
- **State** = Data stored INSIDE (in the component)

---

## 6. How do you create a functional component?

**Answer:**

A functional component is a JavaScript function that returns JSX.

### Step 1: Create a Function:

```javascript
function MyComponent() {
  return <h1>Hello!</h1>;
}
```

### Step 2: Export It:

```javascript
function MyComponent() {
  return <h1>Hello!</h1>;
}

export default MyComponent;
```

### Step 3: Use It in Another Component:

```javascript
import MyComponent from './MyComponent';

function App() {
  return (
    <div>
      <MyComponent />
    </div>
  );
}

export default App;
```

### Syntax Options:

**Regular function:**
```javascript
function Greeting() {
  return <p>Hello, World!</p>;
}
```

**Arrow function:**
```javascript
const Greeting = () => {
  return <p>Hello, World!</p>;
};
```

**Arrow function (short form):**
```javascript
const Greeting = () => <p>Hello, World!</p>;
```

### Functional Component with Props:

```javascript
function Card(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.text}</p>
    </div>
  );
}

// Use it
<Card title="React" text="A JavaScript library" />
```

### Functional Component with State:

```javascript
function Counter() {
  const [count, setCount] = React.useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

---

## 7. How do you create a class component?

**Answer:**

A class component is a JavaScript class that extends React.Component.

### Basic Structure:

```javascript
class MyComponent extends React.Component {
  render() {
    return <h1>Hello!</h1>;
  }
}

export default MyComponent;
```

### Breakdown:

1. **extends React.Component** - Inherit from React.Component
2. **render()** - Required method that returns JSX
3. **return** - Must return JSX

### Class Component with Props:

```javascript
class Welcome extends React.Component {
  render() {
    // Access props using this.props
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

// Use it
<Welcome name="Alice" />
```

### Class Component with State:

```javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = { count: 0 };
  }
  
  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          +
        </button>
      </div>
    );
  }
}
```

### Important Notes:

⚠️ **Constructor is optional** (only needed for state)  
⚠️ **render() is required** (must return JSX)  
⚠️ **Use this.props** (not just props)  
⚠️ **Use this.state** (to access state)  

### When to Use Class Components:

Today, **mostly use Functional Components** with hooks instead!

Class components are mostly used in older codebases or when maintaining legacy code.

---

## 8. What is the render method in class components?

**Answer:**

The **render()** method is the only required method in a class component. It returns the JSX that should be displayed on the screen.

### Basic Syntax:

```javascript
class MyComponent extends React.Component {
  render() {
    return <h1>Hello, World!</h1>;
  }
}
```

### Key Points About render():

1. **Must return JSX:**
```javascript
render() {
  return <div>Content</div>; // ✅ Correct
}
```

2. **Can only return one element:**
```javascript
// ❌ Wrong - two elements
render() {
  return (
    <h1>Title</h1>
    <p>Text</p>
  );
}

// ✅ Correct - wrapped in one element
render() {
  return (
    <div>
      <h1>Title</h1>
      <p>Text</p>
    </div>
  );
}
```

3. **Can include JavaScript logic:**
```javascript
render() {
  const isLoggedIn = true;
  
  return (
    <div>
      {isLoggedIn ? <h1>Welcome!</h1> : <h1>Please Login</h1>}
    </div>
  );
}
```

4. **Access props and state:**
```javascript
class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: 'Alice' };
  }
  
  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <p>{this.props.message}</p>
      </div>
    );
  }
}
```

### What You CANNOT Do in render():

❌ Update state directly  
❌ Make API calls  
❌ Create subscriptions  

Use lifecycle methods for these tasks instead.

---

## 9. How do you pass props to a component?

**Answer:**

Props are passed like HTML attributes. The parent component sends data, the child receives it.

### Simple Example:

```javascript
// Parent passes props
function App() {
  return <Greeting name="Alice" age={25} />;
}

// Child receives props
function Greeting(props) {
  return <h1>Hello, {props.name}! You are {props.age} years old.</h1>;
}
```

### Passing Different Types of Data:

**String:**
```javascript
<Card title="React" />
```

**Number:**
```javascript
<Counter start={10} />
```

**Boolean:**
```javascript
<Button isActive={true} />
```

**Object:**
```javascript
<User info={{ name: 'Alice', age: 25 }} />
```

**Array:**
```javascript
<List items={['A', 'B', 'C']} />
```

**Function:**
```javascript
<Button onClick={handleClick} />
```

### Multiple Props:

```javascript
function App() {
  return (
    <Product 
      name="Laptop"
      price={999}
      inStock={true}
      description="High-end laptop"
    />
  );
}

function Product(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Price: ${props.price}</p>
      <p>In Stock: {props.inStock ? 'Yes' : 'No'}</p>
      <p>{props.description}</p>
    </div>
  );
}
```

### Passing Children:

```javascript
function App() {
  return (
    <Card>
      <h1>This is inside Card</h1>
      <p>Card content</p>
    </Card>
  );
}

function Card(props) {
  return (
    <div className="card">
      {props.children}
    </div>
  );
}
```

---

## 10. How do you destructure props?

**Answer:**

Destructuring makes code cleaner by extracting specific props instead of using `props.name`.

### Without Destructuring:

```javascript
function User(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.email}</p>
      <p>{props.age}</p>
    </div>
  );
}
```

### With Destructuring (Cleaner):

```javascript
function User({ name, email, age }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{email}</p>
      <p>{age}</p>
    </div>
  );
}
```

### How It Works:

```javascript
// Before destructuring
const person = { name: 'Alice', age: 25, email: 'alice@example.com' };
const name = person.name;
const age = person.age;

// After destructuring
const { name, age, email } = person;
// Now you can use: name, age, email directly
```

### In React Components:

```javascript
// Function receives props
function Card({ title, description, price }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>${price}</p>
    </div>
  );
}

// Parent passes props
<Card 
  title="React Course" 
  description="Learn React" 
  price={99} 
/>
```

### With Default Values:

```javascript
function Button({ text = 'Click Me', color = 'blue', size = 'medium' }) {
  return (
    <button style={{ color, fontSize: size }}>
      {text}
    </button>
  );
}

// If props not provided, defaults are used
<Button /> // Uses all defaults
<Button text="Submit" /> // text="Submit", color and size use defaults
```

### Destructuring Children:

```javascript
function Container({ children, className = 'default' }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
```

---

## 11. How do you use the useState hook?

**Answer:**

`useState` is a hook that lets functional components have state (remember data).

### Basic Syntax:

```javascript
const [value, setValue] = useState(initialValue);
```

### Breakdown:

- **value** - Current state value
- **setValue** - Function to update the value
- **initialValue** - Starting value

### Simple Example:

```javascript
function Counter() {
  const [count, setCount] = React.useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Step by Step:

1. Import useState:
```javascript
import { useState } from 'react';
```

2. Call useState with initial value:
```javascript
const [count, setCount] = useState(0); // Initial value is 0
```

3. Use the value:
```javascript
<p>Count: {count}</p> // Display the value
```

4. Update the value:
```javascript
<button onClick={() => setCount(count + 1)}>+</button> // Update it
```

### Multiple States:

```javascript
function UserForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');
  
  return (
    <div>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input 
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
      />
      <input 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
    </div>
  );
}
```

### Different Initial Values:

**Number:**
```javascript
const [count, setCount] = useState(0);
```

**String:**
```javascript
const [name, setName] = useState('');
```

**Boolean:**
```javascript
const [isVisible, setIsVisible] = useState(false);
```

**Array:**
```javascript
const [items, setItems] = useState([]);
```

**Object:**
```javascript
const [user, setUser] = useState({ name: '', age: 0 });
```

---

## 12. How do you initialize state in a class component?

**Answer:**

In class components, state is initialized in the **constructor**.

### Basic Syntax:

```javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  render() {
    return <p>Count: {this.state.count}</p>;
  }
}
```

### Step by Step:

1. **constructor()** - Special method that runs first
2. **super(props)** - Always call this first
3. **this.state** - Initialize state as an object

### Multiple State Properties:

```javascript
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Alice',
      age: 25,
      email: 'alice@example.com',
      isActive: true
    };
  }
  
  render() {
    return (
      <div>
        <p>Name: {this.state.name}</p>
        <p>Age: {this.state.age}</p>
        <p>Email: {this.state.email}</p>
      </div>
    );
  }
}
```

### Accessing State:

```javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  render() {
    return (
      <p>
        {/* Access using this.state.propertyName */}
        Current count: {this.state.count}
      </p>
    );
  }
}
```

### Important Note:

✅ **Modern way (use useState hook in functional components)** - Cleaner and recommended!  
⚠️ **Class component way** - Still works but more complex

---

## 13. How do you update state?

**Answer:**

State can be updated differently depending on whether you're using functional or class components.

### Functional Component (Modern):

Use the setter function from `useState`:

```javascript
function Counter() {
  const [count, setCount] = useState(0);
  
  // Update state by calling setCount
  const increment = () => {
    setCount(count + 1); // Update state
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

### Class Component (Older):

Use `this.setState()`:

```javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  increment = () => {
    // Update state using this.setState()
    this.setState({ count: this.state.count + 1 });
  };
  
  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}
```

### Different Update Patterns:

**Toggle Boolean:**
```javascript
const [isVisible, setIsVisible] = useState(true);

// Toggle it
setIsVisible(!isVisible);
```

**Update String:**
```javascript
const [name, setName] = useState('');

setName('Alice'); // Set new value
```

**Update Object:**
```javascript
const [user, setUser] = useState({ name: 'Alice', age: 25 });

// Method 1: Spread operator (recommended)
setUser({ ...user, age: 26 });

// Method 2: Create new object
setUser({ name: user.name, age: 26 });
```

**Update Array:**
```javascript
const [items, setItems] = useState(['A', 'B']);

// Add item
setItems([...items, 'C']);

// Remove item
setItems(items.filter(item => item !== 'B'));

// Update item
setItems(items.map(item => item === 'A' ? 'X' : item));
```

---

## 14. What happens when state is updated?

**Answer:**

When state is updated, React automatically **re-renders** the component with the new data.

### The Process:

1. **State changes** - You call setCount or setState
2. **Component re-renders** - React runs the component function again
3. **JSX is updated** - New JSX is created with new state
4. **Page updates** - Browser displays the new content

### Real Example:

```javascript
function Counter() {
  const [count, setCount] = useState(0);
  
  console.log('Component rendered with count:', count);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Console Output:

```
First render: "Component rendered with count: 0"
User clicks button: setState(1) is called
Second render: "Component rendered with count: 1"
User clicks button: setState(2) is called
Third render: "Component rendered with count: 2"
```

### Component Re-renders:

```javascript
function App() {
  const [count, setCount] = useState(0);
  
  // This whole function runs again when state changes!
  console.log('App rendered');
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### What Gets Updated:

- ✅ The state value changes
- ✅ The component function runs again
- ✅ All JSX is re-evaluated
- ✅ Only the changed parts update on the page (Virtual DOM)

### What Does NOT Update:

- ❌ Page doesn't reload (no page refresh)
- ❌ Other components don't re-render (just this one)
- ❌ User input loses focus

---

## 15. Can you modify state directly?

**Answer:**

**NO! Never modify state directly.**

You must use the setter function or setState method.

### ❌ WRONG - Direct modification:

```javascript
function Counter() {
  const [count, setCount] = useState(0);
  
  // ❌ WRONG - This won't work!
  count = count + 1; // React won't notice the change
  
  // ❌ WRONG - This won't work!
  const obj = { name: 'Alice' };
  obj.name = 'Bob'; // React won't re-render
}
```

### ✅ CORRECT - Use setter function:

```javascript
function Counter() {
  const [count, setCount] = useState(0);
  
  // ✅ CORRECT - Use setter
  const increment = () => {
    setCount(count + 1); // React will update
  };
}
```

### ✅ CORRECT - For objects/arrays:

```javascript
function UserForm() {
  const [user, setUser] = useState({ name: 'Alice', age: 25 });
  
  // ✅ CORRECT - Create new object
  const updateName = (newName) => {
    setUser({ ...user, name: newName });
  };
  
  // ✅ CORRECT - Another way
  const updateAge = (newAge) => {
    setUser({
      name: user.name,
      age: newAge
    });
  };
}
```

### Why Not Modify Directly?

1. **React won't know about changes** - Component won't re-render
2. **Breaks React's rules** - React expects immutable updates
3. **Can cause bugs** - Unexpected behavior
4. **Hard to debug** - Difficult to track changes

### For Arrays:

```javascript
const [items, setItems] = useState(['A', 'B', 'C']);

// ❌ WRONG - Direct modification
items[0] = 'X'; // React won't update

// ✅ CORRECT - Create new array
setItems(['X', 'B', 'C']);

// ✅ CORRECT - Using map
setItems(items.map((item, i) => i === 0 ? 'X' : item));

// ✅ CORRECT - Using spread
setItems([...items]); // Then modify if needed
```

### Key Takeaway:

**Always use the setter function or setState!** React needs to know when state changes so it can update the page.

---

## Summary of Basic Level (Questions 1-15)

You now understand:

✅ What React is and why use it  
✅ JSX syntax and rules  
✅ How to create components  
✅ Functional vs Class components  
✅ State and Props  
✅ How to pass and destructure props  
✅ How to use useState hook  
✅ How to initialize state in class components  
✅ How to update state correctly  
✅ What happens when state updates  
✅ Never modify state directly  

**Next:** Continue with questions 16-25 (Events, Forms, and Lists)
