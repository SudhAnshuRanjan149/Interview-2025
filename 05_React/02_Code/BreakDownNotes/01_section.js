/*

========================================================
SECTION 1 — REACT BASICS & CORE CONCEPTS
========================================================
1. What is React and why is it used?  
2. What problems does React solve?  
3. What is the difference between React and other frameworks like Angular/Vue?  
4. What is JSX and why do we use it?  
5. What is a component in React?  
6. What is the difference between functional and class components?  
7. What are props in React?  
8. What are default props and propTypes?  
9. What is state in React?  
10. What is one-way data binding in React? 

*/


/**
1. What is React and why is it used?
--------------------------------------------------

React is a JavaScript library for building user interfaces, created by Facebook. It focuses on building UI as a tree of reusable components 
rather than as a set of imperative DOM operations.

Key ideas:

- Component-based:
  You build the UI from small, isolated pieces called components, and compose them to form complex interfaces.

- Declarative:
  Instead of manually updating the DOM, you describe what the UI should look like for a given state, and React handles updating the DOM when state changes.

- Virtual DOM:
  React keeps a lightweight in-memory representation of the DOM (the “virtual DOM”). When state changes, it diffs the new virtual tree against 
  the previous one and applies only the minimal required operations to the real DOM. This is usually more efficient and leads to smoother UI updates.

Why it’s used:

1. Reusability:
   Components can be reused across pages and projects, which reduces duplication and bugs.

2. Predictable UI:
   UI is a pure function of state and props: given the same inputs, a component renders the same output. This makes reasoning and testing easier.

3. Ecosystem and tooling:
   Huge ecosystem (React Router, Redux/Zustand, React Query, Next.js, etc.), strong community, and first-class TypeScript support.

4. Cross‑platform:
   The same mental model powers React DOM, React Native, React Native Web, etc.

Basic example:

function Hello() {
  return <h1>Hello, world!</h1>;
}

*/


/**
2. What problems does React solve?
----------------------------------

Before React, UI code in many apps tended to have problems like:

1. Manual DOM manipulation:
   - jQuery-style code scattered everywhere (append, remove, change classes).
   - Hard to keep UI in sync with application state as complexity grows.
   React abstracts this with the virtual DOM and declarative rendering.

2. Spaghetti event handling:
   - Business logic mixed with DOM traversal and event wiring.
   - Hard to reason about “what changes what”.

3. Poor structure for large apps:
   - Global templates and ad-hoc patterns.
   - Hard to reuse UI logic and UI pieces.

React’s solutions:

- Single source of truth for UI:
  The UI is derived from state. You update state; React re-renders and updates DOM correctly.

- Component abstraction:
  Encapsulates markup + behavior + styling (CSS modules / styled-components) inside components, making them easier to test, reuse, and refactor.

- One-way data flow:
  Data flows down from parents to children; changes are propagated predictably, reducing accidental coupling.

*/


/**
3. Difference between React and frameworks like Angular/Vue?
------------------------------------------------------------

High-level comparison (at a conceptual level):

React:
- “Just the View”: Primarily a UI library.
- You pick your own router, state manager, HTTP client, etc.
- Uses JSX for templates.
- Virtual DOM diffing, function components + hooks.

Angular:
- Full framework (routing, DI, HTTP, forms, etc. included).
- Uses TypeScript heavily and a more opinionated architecture.
- Templates in HTML with Angular directives and bindings.
- Two-way binding plus reactive patterns.

Vue:
- Progressive framework.
- Built‑in templates (HTML with directives) and reactivity system.
- Can be used as a simple view layer or full framework (with Vue Router, Vuex/Pinia).
- Single File Components (.vue) by default.

Conceptual differences:

- Opinionation:
  - React: unopinionated about state management, side-effects, folder structure.
  - Angular: strongly opinionated, “batteries included”.
  - Vue: in the middle; more structured than React, less heavy than Angular.

- Learning curve:
  - React: smaller core API, but you need to pick ecosystem pieces.
  - Angular: bigger initial surface (modules, DI, decorators, RxJS).
  - Vue: often considered easy for template‑oriented devs.

- Use cases:
  - React: excellent for large, long-lived apps where fine‑grained architectural control is desired.
  - Angular: enterprise apps where a standardized, full-stack front-end framework is beneficial.
  - Vue: small to medium apps, progressive migration into existing apps, template-friendly environments.

*/


/**
4. What is JSX and why do we use it?
------------------------------------

JSX is a syntax extension for JavaScript that looks like HTML inside JS.

Example:

const element = <h1 className="title">Hello, JSX</h1>;

Under the hood this compiles roughly to:

const element = React.createElement('h1', { className: 'title' }, 'Hello, JSX');

Why it’s used:

1. Better DX (developer experience):
   - Writing UI structure inline with component logic is more ergonomic than concatenating strings or manually calling React.createElement.

2. Co-locating markup with logic:
   - Components often have logic tightly coupled to their UI.
   - JSX lets you use full JS power (conditionals, loops, variables) directly in your “template”.

3. Static analysis and tooling:
   - JSX is compiled; tooling can catch errors early (e.g., missing closing tags, undefined components).

Key JSX details:

- You must use `className` instead of `class`.
- Expressions inside `{}`:
  const name = 'Alice';
  const greeting = <p>Hello, {name}</p>;
- Components must return a single parent element (or `<>...</>` fragment).

*/


/**
5. What is a component in React?
--------------------------------

A component is a reusable, isolated piece of UI that takes inputs (props) and returns React elements describing what should appear on the screen.

Types of components:

- Function components:
  Functions that accept props and return JSX.

  function Greeting(props) {
    return <h1>Hello, {props.name}</h1>;
  }

- Class components (legacy style):
  ES6 classes extending React.Component, with a render() method.

  class Greeting extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  }

Properties of components:

- Reusable:
  You can render `<Greeting name="Alice" />` in multiple places.

- Composable:
  Components can contain other components:

  function App() {
    return (
      <div>
        <Greeting name="Alice" />
        <Greeting name="Bob" />
      </div>
    );
  }

- Encapsulated:
  Each component manages its own state and logic; external code interacts via props.

*/


/**
6. Difference between functional and class components?
------------------------------------------------------

Historically:

- Class components:
  - Use ES6 classes.
  - State stored in this.state, updated with this.setState().
  - Lifecycle methods: componentDidMount, componentDidUpdate, componentWillUnmount, etc.

  class Counter extends React.Component {
    state = { count: 0 };

    componentDidMount() {
      // side-effects after first render
    }

    componentDidUpdate(prevProps, prevState) {
      // side-effects after updates
    }

    componentWillUnmount() {
      // cleanup
    }

    increment = () => {
      this.setState({ count: this.state.count + 1 });
    };

    render() {
      return (
        <button onClick={this.increment}>
          Count: {this.state.count}
        </button>
      );
    }
  }

- Functional components (with hooks):
  - Just functions that take props and return JSX.
  - Manage state and lifecycle with Hooks (useState, useEffect, useMemo, etc.).

  import { useState, useEffect } from 'react';

  function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
      // runs after render
      return () => {
        // cleanup on unmount
      };
    }, []);

    return (
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
    );
  }

Key differences (modern React):

- Hooks vs lifecycle methods:
  Functional components use hooks, which are more composable and reduce duplication.
- Simplicity:
  Functional components are usually shorter and easier to read.
- Recommended style:
  Modern React docs recommend functional components + hooks for new code; class components are mostly legacy/maintenance.

Conceptually they are equivalent in capabilities; hooks were introduced to let function components handle state and side effects without classes.

*/


/**
7. What are props in React?
---------------------------

Props (short for “properties”) are read-only inputs passed from a parent component to a child component.

Example:

function Greeting(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Greeting name="Alice" />
      <Greeting name="Bob" />
    </div>
  );
}

Here:

- `name="Alice"` and `name="Bob"` are props passed to the Greeting component.
- Inside Greeting, `props.name` contains the string value.

Core characteristics:

- Read-only:
  A component must not modify its own props.
  If you need to change something, lift state up into a parent and pass a new prop down.

- One-way:
  Data flows from parent → child. Children cannot directly change parent props; they can call callbacks passed as props:

  function Parent() {
    const [value, setValue] = useState('');

    return (
      <Child
        value={value}
        onChange={newValue => setValue(newValue)}
      />
    );
  }

  function Child({ value, onChange }) {
    return (
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    );
  }

- Used for configuration:
  Components can behave differently based on props (labels, colors, callbacks, etc.).

*/


/**
8. What are default props and propTypes?
----------------------------------------

Default props:

Default props provide fallback values when a prop isn’t supplied.

Function components (modern pattern):

function Button({ label = 'Click me', color = 'blue' }) {
  return <button style={{ color }}>{label}</button>;
}

<Button />                // label = "Click me", color = "blue"
<Button label="Save" />   // label = "Save", color = "blue"

Older pattern (defaultProps):

function Button(props) {
  return <button style={{ color: props.color }}>{props.label}</button>;
}

Button.defaultProps = {
  label: 'Click me',
  color: 'blue',
};

PropTypes:

PropTypes is a runtime type-checking mechanism for props in development.

Usage:

import PropTypes from 'prop-types';

function UserCard({ name, age, isAdmin }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      {isAdmin && <span>Admin</span>}
    </div>
  );
}

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  isAdmin: PropTypes.bool,
};

UserCard.defaultProps = {
  age: 18,
  isAdmin: false,
};

Benefits:

- Catch bugs early (e.g., passing a string where a number is expected).
- Serve as lightweight documentation for component API.

In TypeScript projects, compile-time typing often replaces or supplements PropTypes.

*/


/**
9. What is state in React?
--------------------------

State is mutable data managed by a component that affects what is rendered. When state changes, React re-renders the component 
(and its children) to reflect the new UI.

In function components:

import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // state variable + setter

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  );
}

In class components:

class Counter extends React.Component {
  state = { count: 0 };

  increment = () => {
    this.setState(prev => ({ count: prev.count + 1 }));
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>
          Increment
        </button>
      </div>
    );
  }
}

Key points:

- State vs props:
  - Props: external inputs, read-only from the component’s perspective.
  - State: internal data, owned and modified by the component.

- Asynchronous updates:
  State updates are batched; don’t rely on the old value directly, use functional updates when needed (`setCount(c => c + 1)`).

- Local vs global:
  State can be local to a component, or lifted up to a shared parent, or managed in an external store (Redux, Zustand, etc.)
  for global app state.

- Triggers re-render:
  Calling setState/useState setter causes React to re-run the component and reconcile UI.

*/


/**
10. What is one-way data binding in React?
------------------------------------------

React uses one-way (unidirectional) data flow: data goes from parent → child via props, and never directly in the opposite direction.

Mechanism:

- Parent holds state.
- Parent passes data and callbacks to children as props.
- Child calls callbacks to *request* state changes in parent.
- Parent updates state and re-renders, passing updated data down again.

Example:

function Parent() {
  const [text, setText] = useState('');

  const handleChange = (value) => {
    setText(value);
  };

  return (
    <div>
      <p>Current: {text}</p>
      <Child value={text} onChange={handleChange} />
    </div>
  );
}

function Child({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}

Explanation:

- `Parent` owns the `text` state.
- `Child` receives the current value and a callback `onChange`.
- When the user types, `Child` calls `onChange`, passing the new value.
- `Parent` updates its state; the new value flows down again as a prop.
- Data always flows downward; changes propagate upward only through callbacks, not by mutating parent state directly.

Benefits of one-way data binding:

1. Predictability:
   - You can trace any piece of data to a single owner.
   - Easier debugging: when UI is wrong, check the component that owns the state.

2. Easier mental model:
   - UI = f(state, props).
   - No hidden bidirectional bindings that can cause unexpected feedback loops.

3. Better performance:
   - React can optimize re-renders knowing exactly where state lives and how it changes.

Contrast with two-way binding (like classic AngularJS):

- In two-way binding, a form input might directly update a model which automatically re-updates the view, sometimes leading 
to hard-to-trace dependencies.
- In React, this is always explicit through controlled components.

*/