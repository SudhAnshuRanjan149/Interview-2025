/*

========================================================
SECTION 2 — COMPONENT LIFECYCLE & CLASS COMPONENTS
========================================================
11. What are React lifecycle methods?  
12. What is the mounting phase and which lifecycle methods belong to it?  
13. What is the updating phase?  
14. What is the unmounting phase?  
15. What is componentDidMount and when is it used?  
16. What is shouldComponentUpdate and why use it?  
17. What is getDerivedStateFromProps?  
18. What is componentDidCatch and error boundaries?  
19. How does setState work internally?  
20. What is the difference between setState() and forceUpdate()?  

*/





/**
11. What are React lifecycle methods?
-------------------------------------

React lifecycle methods are special methods on class components that run at specific points
in a component’s life: when it is created (mount), updated (re-render), and removed
(unmount).

Main lifecycle groups (class components):

Mounting (first time in the DOM):
- constructor
- static getDerivedStateFromProps
- render
- componentDidMount

Updating (when props/state change):
- static getDerivedStateFromProps
- shouldComponentUpdate
- render
- getSnapshotBeforeUpdate
- componentDidUpdate

Unmounting (removed from DOM):
- componentWillUnmount

Error handling:
- static getDerivedStateFromError
- componentDidCatch

In modern React, function components use Hooks (useEffect, useLayoutEffect, etc.) to
express the same lifecycle concepts without classes.
*/


/**
12. What is the mounting phase and which lifecycle methods belong to it?
------------------------------------------------------------------------

Mounting is the phase where a component is created and inserted into the DOM for the very
first time.

Order for class components:

1) constructor(props)
   - Initialize state, bind methods, set up initial instance fields.
   - Avoid side effects here.

2) static getDerivedStateFromProps(props, state)
   - Rarely used; derive state from props before render if needed.
   - Must be pure and return new state or null.

3) render()
   - Returns React elements (JSX) describing the UI.
   - Pure: no side effects, same output for same props/state.

4) componentDidMount()
   - Runs once after the initial render has been committed to the DOM.
   - Good place for:
     - Fetching data
     - Subscribing to events
     - Measuring DOM
     - Initializing third‑party libraries

Example:

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, loading: true };
  }

  async componentDidMount() {
    const res = await fetch(`/api/users/${this.props.id}`);
    const user = await res.json();
    this.setState({ user, loading: false });
  }

  render() {
    if (this.state.loading) return <p>Loading...</p>;
    return <h1>{this.state.user.name}</h1>;
  }
}
*/


/**
13. What is the updating phase?
-------------------------------

The updating phase happens whenever a mounted component re-renders due to:

- New props from its parent.
- Internal state changes via setState.
- A forced update via forceUpdate.

For class components, the typical update sequence:

1) static getDerivedStateFromProps(nextProps, prevState)
   - Optional; can adjust state based on new props.

2) shouldComponentUpdate(nextProps, nextState)
   - Decide whether to re-render.
   - Return false to skip render and subsequent lifecycle methods for this update.

3) render()
   - Produce the next UI based on new props/state.

4) getSnapshotBeforeUpdate(prevProps, prevState)
   - Called right before DOM changes are committed.
   - Used to capture information like scroll position before it changes.
   - Its return value is passed to componentDidUpdate.

5) componentDidUpdate(prevProps, prevState, snapshot)
   - Runs after DOM has been updated.
   - Good for side effects that depend on prop/state changes:
     - Fetch new data when an ID changes.
     - Adjust scroll based on snapshot.
   - Must guard against infinite loops before calling setState again.

Example:

class Chat extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.roomId !== this.props.roomId) {
      // room changed, fetch new messages
      this.fetchMessages();
    }
  }

  fetchMessages() { / * ... * / }

  render() { / * ... * / }
}
*/


/**
14. What is the unmounting phase?
---------------------------------

Unmounting is the phase where a component is removed from the DOM and destroyed.

Class components have one main lifecycle method here:

- componentWillUnmount()
  - Called right before the component is unmounted.
  - Used for cleanup:
    - Clear timers/intervals
    - Cancel network requests
    - Remove event listeners
    - Unsubscribe from stores/WebSockets

Example:

class Clock extends React.Component {
  state = { now: new Date() };

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.setState({ now: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId); // prevent memory leaks
  }

  render() {
    return <p>{this.state.now.toLocaleTimeString()}</p>;
  }
}
*/


/**
15. What is componentDidMount and when is it used?
--------------------------------------------------

componentDidMount is a lifecycle method that runs once, immediately after a component is
mounted (inserted into the DOM) and its initial render is committed.

Signature:
componentDidMount() {}

Uses:

1) Data fetching:
   - Call APIs, then setState with fetched data.

2) Subscriptions:
   - WebSockets, event emitters, window/document event listeners.

3) DOM interactions:
   - Measure elements (getBoundingClientRect).
   - Initialize charts, maps, or other libraries that require a real DOM node.

4) One‑time setup:
   - Start timers/intervals, set up observers.

Important notes:

- Safe to call setState here; React will trigger a second render, but the user sees the
  initial UI quickly and then updated UI.
- Runs only on mount, not on subsequent updates.

Example:

class TodoList extends React.Component {
  state = { todos: [], loading: true };

  async componentDidMount() {
    const res = await fetch('/api/todos');
    const todos = await res.json();
    this.setState({ todos, loading: false });
  }

  render() {
    if (this.state.loading) return <p>Loading...</p>;
    return (
      <ul>
        {this.state.todos.map(t => <li key={t.id}>{t.text}</li>)}
      </ul>
    );
  }
}
*/


/**
16. What is shouldComponentUpdate and why use it?
-------------------------------------------------

shouldComponentUpdate lets you control whether a component should re-render in response
to changes in props or state.

Signature:
shouldComponentUpdate(nextProps, nextState) {
  // return true to re-render, false to skip
}

Default behavior:
- If you don’t define it, React re-renders the component on every state/prop change.

Why use it:

1) Performance optimization:
   - If rendering is expensive or the subtree is large, avoid unnecessary renders by
     comparing current props/state to nextProps/nextState.

2) Fine-grained control:
   - Skip updates when changes don’t affect visible output.

Example:

class PureCounter extends React.Component {
  shouldComponentUpdate(nextProps) {
    // re-render only when value actually changes
    return nextProps.value !== this.props.value;
  }

  render() {
    console.log('rendering counter');
    return <div>{this.props.value}</div>;
  }
}

Modern alternative:
- React.PureComponent automatically implements shallow prop/state comparison.
- In function components, use React.memo for similar behavior.

*/


/**
17. What is getDerivedStateFromProps?
-------------------------------------

getDerivedStateFromProps is a static lifecycle method used to derive state from props in a
controlled way.

Signature:
static getDerivedStateFromProps(nextProps, prevState) {
  // return an object to update state, or null to do nothing
}

Characteristics:

- Runs before every render:
  - On initial mount and on subsequent updates.
- Static and pure:
  - No access to `this`.
  - Must not cause side effects.
- Intended for rare use cases:
  - Keeping state in sync with props (e.g., controlled/uncontrolled hybrid patterns).
  - Replacing some legacy uses of componentWillReceiveProps.

Example (simplified controlled input mirror):

class SyncedInput extends React.Component {
  state = { value: '' };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value != null && nextProps.value !== prevState.value) {
      return { value: nextProps.value };
    }
    return null;
  }

  render() {
    return <input value={this.state.value} readOnly />;
  }
}

Cautions:

- Overuse leads to complex, hard‑to‑reason state logic.
- Often better to:
  - Derive data in render, or
  - Lift state up, or
  - Use memoization instead of duplicating props into state.

*/


/**
18. What is componentDidCatch and error boundaries?
---------------------------------------------------

componentDidCatch is a lifecycle method used in error boundaries to catch JavaScript
errors in child components’ render, lifecycle methods, and constructors.

Error boundary:
- A React component that catches errors below it in the tree and displays a fallback UI
  instead of crashing the entire app.

Two key pieces:

1) static getDerivedStateFromError(error)
   - Update state so the next render shows a fallback UI.

2) componentDidCatch(error, info)
   - Side effects like logging error details to an error reporting service.

Example:

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    // update state so fallback UI is shown
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // log error, send to monitoring, etc.
    console.error('ErrorBoundary caught an error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }
    return this.props.children;
  }
}

// Usage:
<ErrorBoundary>
  <SomeComponent />
</ErrorBoundary>;

What they catch:
- Errors in render, lifecycle methods, constructors of children.

What they do NOT catch:
- Event handlers (you handle those yourself with try/catch).
- Asynchronous code outside React (e.g. setTimeout callbacks, raw promises).
- Server-side rendering errors.

*/


/**
19. How does setState work internally?
--------------------------------------

setState is the primary way to schedule state updates in class components. In function
components, the equivalent is the setter returned by useState.

Key internal behaviors (conceptual):

1) Asynchronous and batched:
   - Inside React events, multiple setState calls may be batched into one update for
     performance.
   - You shouldn’t rely on this.state having the updated value immediately after calling
     setState.

2) Partial updates (class components):
   - You can pass an object that will be shallow‑merged into the current state:

     this.setState({ count: this.state.count + 1 });

   - Or pass an updater function:

     this.setState(prevState => ({ count: prevState.count + 1 }));

3) Scheduling a re-render:
   - When setState is called, React queues an update.
   - React reconciles the new state with the previous state, re-runs render, diffs the
     virtual DOM, and applies minimal changes to the real DOM.

4) Functional updates:
   - Recommended when the new state depends on previous state or props:

     this.setState(prev => ({ count: prev.count + 1 }));

   - Avoids bugs caused by batched/asynchronous updates.

5) In function components:
   - useState gives you [state, setState].
   - Calling the setter schedules a re-render.
   - If you pass the same value, React may bail out and skip a full re-render.

Example (class):

class Counter extends React.Component {
  state = { count: 0 };

  incrementTwiceWrong = () => {
    // Might only increment once, because both see the same this.state
    this.setState({ count: this.state.count + 1 });
    this.setState({ count: this.state.count + 1 });
  };

  incrementTwiceRight = () => {
    // Correct: each update uses the previous result
    this.setState(prev => ({ count: prev.count + 1 }));
    this.setState(prev => ({ count: prev.count + 1 }));
  };

  render() {
    return (
      <button onClick={this.incrementTwiceRight}>
        Count: {this.state.count}
      </button>
    );
  }
}

Conceptually, React maintains an internal queue of updates, merges them, computes the new
state, and then re-renders.
*/


/**
20. Difference between setState() and forceUpdate()
---------------------------------------------------

Both cause re-renders, but they differ in intent and behavior.

setState(partialState or updater):

- What it does:
  - Schedules a state update.
  - Merges the provided partial state (class components) into existing state.
  - Triggers the normal update lifecycle:
    - getDerivedStateFromProps
    - shouldComponentUpdate
    - render
    - getSnapshotBeforeUpdate
    - componentDidUpdate

- Recommended use:
  - Normal way to update UI in response to events, data, etc.
  - Keeps state as the “source of truth” for what the UI should look like.

forceUpdate():

- What it does:
  - Forces a re-render of the component, skipping shouldComponentUpdate.
  - Doesn’t modify this.state.
  - Triggers render and componentDidUpdate for that component and its children.

- When to use (rare):
  - If the UI depends on something *outside* React’s state/props that has changed and you
    can’t or don’t want to move it into state (e.g., a mutable object, external global).
  - Even then, it’s usually better to model that data inside state or props.

Example:

class Clock extends React.Component {
  // BAD example, but illustrates forceUpdate
  tick() {
    // time stored outside state
    this.time = new Date();
    this.forceUpdate(); // force re-render
  }

  render() {
    return <span>{this.time.toLocaleTimeString()}</span>;
  }
}

Key differences:

- Data model:
  - setState: updates component state, which the UI derives from.
  - forceUpdate: does NOT update state; it just re-renders with whatever data is currently
    in instance fields/props.

- Lifecycle:
  - setState: respects shouldComponentUpdate (can skip render).
  - forceUpdate: bypasses shouldComponentUpdate and always renders.

- Best practice:
  - Use setState (or hook setters) for almost all updates.
  - Treat forceUpdate as an escape hatch; if you need it frequently, reconsider your
    state management design.

*/

