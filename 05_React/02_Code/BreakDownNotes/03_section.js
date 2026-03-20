/*

========================================================
SECTION 3 — FUNCTION COMPONENTS & HOOKS
========================================================
21. What are React Hooks?  
22. What rules must be followed when using hooks?  
23. What is useState and how does state updating work?  
24. What is useEffect and when is it triggered?  
25. What is the difference between useEffect and useLayoutEffect?  
26. What is useRef and what problems does it solve?  
27. What is useMemo and why is memoization important?  
28. What is useCallback and how does it help performance?  
29. What is useContext and how does the Context API work?  
30. What is useReducer and when should you use it over useState?  
31. What is useImperativeHandle?  
32. What is useTransition and when to use concurrent features?  
33. What is useDeferredValue?  

*/




/**
21. What are React Hooks?
--------------------------

React Hooks are functions that let you "hook into" React features (state, lifecycle, 
context, etc.) from function components. They were introduced in React 16.8 to allow 
function components to do everything class components could do, with cleaner syntax.

Before Hooks (class components):

class Counter extends React.Component {
  state = { count: 0 };
  
  componentDidMount() {
    document.title = `Count: ${this.state.count}`;
  }
  
  componentDidUpdate() {
    document.title = `Count: ${this.state.count}`;
  }
  
  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        {this.state.count}
      </button>
    );
  }
}

After Hooks (function components):

import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}

Built-in Hooks:

State Hooks:
- useState: add state to function components
- useReducer: manage complex state with reducer pattern

Effect Hooks:
- useEffect: side effects after render (data fetching, subscriptions, DOM updates)
- useLayoutEffect: synchronous effects before browser paint

Ref Hooks:
- useRef: persist values across renders without causing re-renders, access DOM elements

Performance Hooks:
- useMemo: memoize expensive calculations
- useCallback: memoize functions to prevent child re-renders

Context Hook:
- useContext: consume context values

Additional Hooks:
- useImperativeHandle: customize instance value exposed to parent via ref
- useDebugValue: display custom label in React DevTools
- useId: generate unique IDs for accessibility
- useTransition: mark state updates as low-priority transitions
- useDeferredValue: defer updating a value to keep UI responsive

Why Hooks?

1. Simpler code:
   - No classes, no `this`, no binding methods.
   - Easier to understand and write.

2. Reusable logic:
   - Custom hooks let you extract component logic into reusable functions.
   
   function useWindowWidth() {
     const [width, setWidth] = useState(window.innerWidth);
     
     useEffect(() => {
       const handleResize = () => setWidth(window.innerWidth);
       window.addEventListener('resize', handleResize);
       return () => window.removeEventListener('resize', handleResize);
     }, []);
     
     return width;
   }
   
   function MyComponent() {
     const width = useWindowWidth(); // reuse across components
     return <p>Width: {width}</p>;
   }

3. Better composition:
   - Hooks compose better than HOCs and render props.
   - Avoid "wrapper hell" in component trees.

4. Co-located related logic:
   - Instead of splitting logic across lifecycle methods, hooks group related code together.

Hooks vs Class Components:

Feature               | Class Components          | Function Components + Hooks
----------------------|---------------------------|-----------------------------
State                 | this.state, setState      | useState, useReducer
Lifecycle             | componentDidMount, etc.   | useEffect, useLayoutEffect
Side effects          | componentDidMount/Update  | useEffect
Context               | this.context, Consumer    | useContext
Refs                  | createRef                 | useRef
Performance           | shouldComponentUpdate     | React.memo, useMemo, useCallback
Code complexity       | Higher (classes, this)    | Lower (functions)
Reusable logic        | HOCs, render props        | Custom hooks

Modern React strongly recommends function components with hooks for new code.
*/


/**
22. What rules must be followed when using hooks?
-------------------------------------------------

Hooks have strict rules to ensure they work correctly. These are called the "Rules of Hooks."

Rule 1: Only call hooks at the top level
-----------------------------------------

DON'T call hooks inside:
- Conditionals (if/else)
- Loops (for, while, map)
- Nested functions

Why? React relies on the order hooks are called to track their state between renders.

BAD ❌:

function BadExample({ isLoggedIn }) {
  if (isLoggedIn) {
    const [user, setUser] = useState(null); // ❌ Conditional hook!
  }
  
  const [count, setCount] = useState(0);
  
  return <div>...</div>;
}

Problem: On first render, React sees 2 hooks. After login, React sees 1 hook. 
Order is inconsistent → state gets confused.

GOOD ✅:

function GoodExample({ isLoggedIn }) {
  const [user, setUser] = useState(null); // ✅ Always called
  const [count, setCount] = useState(0);   // ✅ Always called
  
  if (!isLoggedIn) {
    return <div>Please log in</div>;
  }
  
  return <div>...</div>;
}

Rule 2: Only call hooks from React functions
---------------------------------------------

Call hooks from:
✅ Function components
✅ Custom hooks (functions starting with "use")

Don't call from:
❌ Regular JavaScript functions
❌ Class components
❌ Event handlers (directly)

BAD ❌:

function regularFunction() {
  const [state, setState] = useState(0); // ❌ Not a React component or hook
}

class MyClass extends React.Component {
  render() {
    const [state, setState] = useState(0); // ❌ Can't use hooks in classes
    return <div>...</div>;
  }
}

function MyComponent() {
  const handleClick = () => {
    const [clicked, setClicked] = useState(false); // ❌ Hook in event handler
  };
  
  return <button onClick={handleClick}>Click</button>;
}

GOOD ✅:

// ✅ Function component
function MyComponent() {
  const [state, setState] = useState(0);
  
  const handleClick = () => {
    setState(prev => prev + 1); // ✅ Using state setter from top level
  };
  
  return <button onClick={handleClick}>Click</button>;
}

// ✅ Custom hook
function useCustomHook() {
  const [state, setState] = useState(0);
  return [state, setState];
}

Why these rules?

Internal implementation:
React stores hooks in a linked list per component instance. The order hooks are called 
determines which state corresponds to which hook. Breaking the order breaks this tracking.

Conceptually:

First render:
1. useState(0) → Hook slot 1 → state: 0
2. useState('') → Hook slot 2 → state: ''
3. useEffect(...) → Hook slot 3 → effect registered

Next render (must be same order):
1. useState(0) → Hook slot 1 → retrieve state from slot 1
2. useState('') → Hook slot 2 → retrieve state from slot 2
3. useEffect(...) → Hook slot 3 → check dependencies, run if needed

If you conditionally skip hook 2, React tries to match hook 3 to slot 2 → chaos!

Enforcing rules:

ESLint plugin:
npm install eslint-plugin-react-hooks

// .eslintrc
{
  "plugins": ["react-hooks"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",      // Enforce rules
    "react-hooks/exhaustive-deps": "warn"       // Check useEffect dependencies
  }
}

This plugin catches violations at development time.

Summary of Rules:

1. ✅ Always call hooks at the top level (not in conditionals, loops, nested functions)
2. ✅ Only call hooks from React function components or custom hooks
3. ✅ Custom hooks must start with "use" prefix (convention + tooling relies on this)
4. ✅ Keep hook call order consistent across renders

Following these rules ensures React can correctly track hook state and effects.
*/


/**
23. What is useState and how does state updating work?
------------------------------------------------------

useState is a hook that adds state to function components. It returns the current state 
value and a function to update it.

Basic syntax:

const [state, setState] = useState(initialValue);

- state: current value
- setState: function to update state
- initialValue: starting value (used only on first render)

Example:

import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // initial count is 0
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

Multiple state variables:

function Form() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  return (
    <form>
      <input value={name} onChange={e => setName(e.target.value)} />
      <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} />
      <input type="checkbox" checked={isSubscribed} onChange={e => setIsSubscribed(e.target.checked)} />
    </form>
  );
}

How state updating works:
--------------------------

1. Asynchronous updates:

State updates are asynchronous and may be batched for performance.

function Example() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    console.log('Before:', count); // 0
    setCount(count + 1);
    console.log('After:', count);  // Still 0! (not updated yet)
  };
  
  return <button onClick={handleClick}>{count}</button>;
}

The component re-renders with new state, but `count` in current execution context 
remains the old value.

2. Batching multiple updates:

React batches multiple setState calls in the same event handler:

function Example() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(count + 1); // count is 0, so sets to 1
    setCount(count + 1); // count is still 0, so sets to 1 again
    setCount(count + 1); // count is still 0, so sets to 1 again
    // Result: count becomes 1, not 3!
  };
  
  return <button onClick={handleClick}>{count}</button>;
}

Problem: All three use the same `count` value (0) from the render closure.

3. Functional updates:

To correctly update based on previous state, use functional form:

function Example() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(prev => prev + 1); // prev is the actual current state
    setCount(prev => prev + 1); // prev is the result of previous update
    setCount(prev => prev + 1); // prev is the result of previous update
    // Result: count becomes 3 ✅
  };
  
  return <button onClick={handleClick}>{count}</button>;
}

Functional form: setState(prevState => newState)
- React passes the latest state value to your function
- Use when new state depends on old state

4. Object and array state:

State must be replaced, not mutated:

BAD ❌:

function TodoList() {
  const [todos, setTodos] = useState([]);
  
  const addTodo = (text) => {
    todos.push({ id: Date.now(), text }); // ❌ Mutation!
    setTodos(todos); // React may not detect change (same reference)
  };
  
  return <div>...</div>;
}

GOOD ✅:

function TodoList() {
  const [todos, setTodos] = useState([]);
  
  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text }]); // ✅ New array
  };
  
  const removeTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id)); // ✅ New array
  };
  
  const updateTodo = (id, newText) => {
    setTodos(todos.map(t => 
      t.id === id ? { ...t, text: newText } : t // ✅ New objects
    ));
  };
  
  return <div>...</div>;
}

For objects:

function UserProfile() {
  const [user, setUser] = useState({ name: '', email: '' });
  
  const updateName = (name) => {
    setUser({ ...user, name }); // ✅ Spread old values, override name
  };
  
  const updateEmail = (email) => {
    setUser(prev => ({ ...prev, email })); // ✅ Functional update
  };
  
  return <div>...</div>;
}

5. Lazy initialization:

If initial state is expensive to compute, pass a function:

function ExpensiveComponent() {
  // ❌ Bad: runs on every render
  const [data, setData] = useState(expensiveCalculation());
  
  // ✅ Good: only runs once on mount
  const [data, setData] = useState(() => expensiveCalculation());
  
  return <div>...</div>;
}

useState accepts:
- A value: used directly as initial state
- A function: called once on first render, return value is initial state

6. Bailing out of updates:

If you set state to the same value (Object.is comparison), React may skip re-render:

function Example() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(0); // Already 0, React may skip re-render
  };
  
  return <button onClick={handleClick}>{count}</button>;
}

React optimizes by checking if the new value is the same as current.

Real-world examples:

Toggle:

function Toggle() {
  const [isOn, setIsOn] = useState(false);
  
  return (
    <button onClick={() => setIsOn(prev => !prev)}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}

Input controlled component:

function NameInput() {
  const [name, setName] = useState('');
  
  return (
    <input
      value={name}
      onChange={e => setName(e.target.value)}
      placeholder="Enter name"
    />
  );
}

Derived state (computed from other state):

function ShoppingCart() {
  const [items, setItems] = useState([]);
  
  // Derived value, no separate state needed
  const total = items.reduce((sum, item) => sum + item.price, 0);
  
  return (
    <div>
      <p>Total: ${total}</p>
    </div>
  );
}

Summary:

- useState(initialValue) returns [state, setState]
- Updates are asynchronous and may be batched
- Use functional updates when new state depends on old: setState(prev => ...)
- Always replace state (new object/array), never mutate
- React compares new state with old using Object.is to optimize re-renders
*/


/**
24. What is useEffect and when is it triggered?
-----------------------------------------------

useEffect is a hook for side effects in function components. Side effects are operations 
that affect things outside the component: data fetching, subscriptions, DOM manipulation, 
timers, logging, etc.

Basic syntax:

useEffect(() => {
  // Side effect code here
  
  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]);

- First argument: effect function (runs after render)
- Second argument: dependency array (controls when effect runs)
- Return value: cleanup function (runs before next effect or unmount)

When useEffect is triggered:
-----------------------------

1. After every render (no dependency array):

useEffect(() => {
  console.log('Runs after every render');
});

Use case: Rare; usually you want to control when effects run.

2. Only on mount (empty dependency array):

useEffect(() => {
  console.log('Runs once after initial mount');
  
  return () => {
    console.log('Cleanup on unmount');
  };
}, []); // ← empty array

Equivalent to componentDidMount + componentWillUnmount

Example - data fetching:

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, []); // Only fetch on mount
  
  return <div>{user?.name}</div>;
}

3. When specific dependencies change:

useEffect(() => {
  console.log('Runs when count changes');
}, [count]); // ← depends on count

React compares dependency values between renders using Object.is:
- If any dependency changed, effect runs
- If all dependencies same, effect skipped

Example - sync with external system:

function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    
    return () => {
      connection.disconnect(); // Cleanup previous connection
    };
  }, [roomId]); // Re-run when roomId changes
  
  return <div>Connected to {roomId}</div>;
}

Behavior:
- Mount: effect runs (connect to room A)
- roomId changes A → B: cleanup runs (disconnect A), effect runs (connect B)
- Unmount: cleanup runs (disconnect B)

Execution order:
----------------

1. Component renders
2. React commits changes to DOM
3. Browser paints
4. useEffect runs (after paint, non-blocking)

function Example() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('Effect ran');
    document.title = `Count: ${count}`;
  }, [count]);
  
  console.log('Render phase');
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

Log order:
1. "Render phase"
2. (React updates DOM)
3. (Browser paints)
4. "Effect ran"

Common use cases:
-----------------

1. Data fetching:

useEffect(() => {
  async function fetchData() {
    const res = await fetch('/api/data');
    const data = await res.json();
    setData(data);
  }
  
  fetchData();
}, []);

2. Subscriptions:

useEffect(() => {
  const subscription = someAPI.subscribe(data => {
    setData(data);
  });
  
  return () => {
    subscription.unsubscribe(); // Cleanup
  };
}, []);

3. Event listeners:

useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

4. Timers:

useEffect(() => {
  const timer = setInterval(() => {
    setCount(c => c + 1);
  }, 1000);
  
  return () => clearInterval(timer);
}, []);

5. Manual DOM manipulation:

useEffect(() => {
  const element = document.getElementById('my-element');
  element.focus();
}, []);

6. Syncing with external state:

useEffect(() => {
  localStorage.setItem('theme', theme);
}, [theme]);

Cleanup function:
-----------------

Always return a cleanup function if your effect:
- Creates subscriptions
- Starts timers
- Adds event listeners
- Opens connections

function Example() {
  useEffect(() => {
    console.log('Effect setup');
    
    return () => {
      console.log('Effect cleanup');
    };
  }, [dependency]);
}

Cleanup runs:
- Before effect re-runs (dependency changed)
- Before component unmounts

Example lifecycle with cleanup:

Mount:
  → "Effect setup"

Dependency changes:
  → "Effect cleanup"
  → "Effect setup"

Unmount:
  → "Effect cleanup"

Dependency array gotchas:
-------------------------

1. Missing dependencies:

function Example({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, []); // ❌ Missing userId!
  
  // If userId changes, effect doesn't re-run → stale data
}

Fix:

useEffect(() => {
  fetchUser(userId).then(setUser);
}, [userId]); // ✅ Include all used values

2. Object/array dependencies:

const options = { id: userId }; // New object every render

useEffect(() => {
  fetchUser(options);
}, [options]); // ❌ Effect runs every render (new object)

Fix - primitive dependencies:

useEffect(() => {
  const options = { id: userId };
  fetchUser(options);
}, [userId]); // ✅ Depend on primitive

Or useMemo:

const options = useMemo(() => ({ id: userId }), [userId]);

useEffect(() => {
  fetchUser(options);
}, [options]); // ✅ Stable reference

3. ESLint exhaustive-deps:

The eslint-plugin-react-hooks warns about missing dependencies:

useEffect(() => {
  fetchUser(userId);
}, []); // ⚠️ Warning: userId should be in dependency array

Always fix these warnings or explicitly document why you're ignoring them.

Multiple effects:

Split different concerns into separate effects:

function UserProfile({ userId }) {
  // Effect 1: Fetch user data
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  
  // Effect 2: Update document title
  useEffect(() => {
    document.title = user?.name || 'Loading...';
  }, [user]);
  
  // Effect 3: Analytics
  useEffect(() => {
    trackPageView(userId);
  }, [userId]);
}

This is cleaner than one giant effect and allows each to have specific dependencies.

Summary:

- useEffect runs side effects after render
- Dependency array controls when effect re-runs:
  - No array: every render
  - []: only on mount
  - [dep1, dep2]: when dependencies change
- Return cleanup function to undo side effects
- Always include all dependencies used in effect
- Use ESLint plugin to catch dependency issues
*/


/**
25. Difference between useEffect and useLayoutEffect?
-----------------------------------------------------

useEffect and useLayoutEffect are both hooks for side effects, but they run at different 
times relative to rendering and browser paint.

useEffect (most common):
------------------------

Runs AFTER browser paint (asynchronous):

1. React renders component
2. React commits changes to DOM
3. Browser paints (user sees updates)
4. useEffect runs

Example:

function Example() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('useEffect ran'); // After paint
  });
  
  return <div>{count}</div>;
}

Timeline:
  Render → Commit to DOM → Browser Paint → useEffect

Characteristics:
- Non-blocking: doesn't delay visual updates
- Runs asynchronously after paint
- Preferred for most side effects (data fetching, subscriptions, analytics)
- Better for performance (doesn't block painting)

useLayoutEffect (rare):
-----------------------

Runs BEFORE browser paint (synchronous):

1. React renders component
2. React commits changes to DOM
3. useLayoutEffect runs (synchronously)
4. Browser paints

Example:

function Example() {
  const [count, setCount] = useState(0);
  
  useLayoutEffect(() => {
    console.log('useLayoutEffect ran'); // Before paint
  });
  
  return <div>{count}</div>;
}

Timeline:
  Render → Commit to DOM → useLayoutEffect → Browser Paint

Characteristics:
- Blocking: delays visual updates until effect completes
- Runs synchronously before paint
- Used when you need to read layout or mutate DOM before user sees it
- Can hurt performance if effect is slow

When to use which:
------------------

Use useEffect (99% of cases):
- Data fetching
- Setting up subscriptions
- Event listeners
- Analytics tracking
- LocalStorage updates
- Any side effect that doesn't need to happen before paint

Use useLayoutEffect (rare):
- Reading layout from DOM (scroll position, element sizes)
- Making DOM mutations before user sees them (to avoid flicker)
- Measuring elements
- Synchronous DOM updates

Real-world examples:
--------------------

Example 1: Reading layout (useLayoutEffect)

Tooltip that positions itself based on target element:

function Tooltip({ targetRef, children }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  
  useLayoutEffect(() => {
    // Read layout before paint to position tooltip correctly
    const targetRect = targetRef.current.getBoundingClientRect();
    setPosition({
      top: targetRect.bottom + 10,
      left: targetRect.left
    });
  }, [targetRef]);
  
  return (
    <div style={{ position: 'absolute', ...position }}>
      {children}
    </div>
  );
}

Why useLayoutEffect?
- If we used useEffect, tooltip would briefly appear at wrong position, then jump to 
  correct position (flicker).
- useLayoutEffect calculates position before paint, so user never sees incorrect position.

Example 2: Preventing flicker (useLayoutEffect)

function AnimatedComponent() {
  const ref = useRef();
  
  useLayoutEffect(() => {
    // Measure element and set initial animation state before user sees it
    const width = ref.current.offsetWidth;
    ref.current.style.transform = `translateX(${width}px)`;
    
    // Then trigger animation
    requestAnimationFrame(() => {
      ref.current.style.transform = 'translateX(0)';
    });
  }, []);
  
  return <div ref={ref}>Content</div>;
}

Example 3: Data fetching (useEffect - correct choice)

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  // ✅ useEffect: data fetching doesn't need to block paint
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(setUser);
  }, [userId]);
  
  return <div>{user?.name}</div>;
}

If we used useLayoutEffect here, it would block painting while fetching data → bad UX.

Example 4: Scroll restoration (useLayoutEffect)

function ScrollRestoration({ scrollPosition }) {
  useLayoutEffect(() => {
    // Restore scroll before paint to avoid jump
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);
  
  return <div>Content</div>;
}

Why useLayoutEffect?
- If we used useEffect, user would briefly see page at top, then jump to saved position.
- useLayoutEffect scrolls before paint, so user never sees the jump.

Example 5: Focus management (useLayoutEffect)

function Modal({ isOpen }) {
  const firstInputRef = useRef();
  
  useLayoutEffect(() => {
    if (isOpen && firstInputRef.current) {
      // Focus before user sees modal to avoid visible delay
      firstInputRef.current.focus();
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div className="modal">
      <input ref={firstInputRef} />
    </div>
  );
}

Comparison table:
-----------------

Aspect                | useEffect                | useLayoutEffect
----------------------|--------------------------|---------------------------
Timing                | After paint              | Before paint
Blocking              | Non-blocking             | Blocking
Performance           | Better (doesn't delay)   | Worse (can delay paint)
Use for               | Most side effects        | Layout measurements, DOM mutations
Visual updates        | May cause flicker        | Prevents flicker
Server rendering      | Safe                     | Warning in SSR

Performance impact:
-------------------

useEffect:

function Example() {
  useEffect(() => {
    // Slow operation, but doesn't block painting
    for (let i = 0; i < 1000000; i++) { / * work * / }
  });
  
  return <div>User sees this immediately</div>;
}

User sees UI quickly, then effect runs.

useLayoutEffect:

function Example() {
  useLayoutEffect(() => {
    // Slow operation blocks painting!
    for (let i = 0; i < 1000000; i++) { / * work * / }
  });
  
  return <div>User waits to see this</div>;
}

User waits for effect to complete before seeing UI.

Server-side rendering (SSR):
-----------------------------

useLayoutEffect causes warnings in SSR because there's no DOM to measure/mutate:

Warning: useLayoutEffect does nothing on the server

If you must use useLayoutEffect but also support SSR:

function useIsomorphicLayoutEffect(effect, deps) {
  const isServer = typeof window === 'undefined';
  const useEffectFn = isServer ? useEffect : useLayoutEffect;
  
  useEffectFn(effect, deps);
}

Or conditionally render:

function Component() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useLayoutEffect(() => {
    if (!isMounted) return; // Skip on server
    // Layout effect code
  }, [isMounted]);
}

When to switch from useEffect to useLayoutEffect:
--------------------------------------------------

If you see:
1. Visual flicker or jump
2. Incorrect initial layout
3. Race conditions with DOM measurements

Then try useLayoutEffect. Otherwise, stick with useEffect.

Rule of thumb:
- Default to useEffect
- Only use useLayoutEffect when you have a specific visual/layout problem
- Test performance impact of useLayoutEffect

Summary:

- useEffect: After paint, non-blocking, for most side effects
- useLayoutEffect: Before paint, blocking, for layout measurements and DOM mutations
- Prefer useEffect unless you have flicker/layout issues
- useLayoutEffect can hurt performance, use sparingly
*/


/**
26. What is useRef and what problems does it solve?
---------------------------------------------------

useRef is a hook that returns a mutable ref object with a `.current` property that 
persists across renders without causing re-renders when changed.

Syntax:

const ref = useRef(initialValue);

// Access/modify via .current
ref.current = newValue;

Key characteristics:
- Persists across renders (like instance variables in classes)
- Mutating .current doesn't trigger re-render
- Returns same ref object on every render (stable reference)
- Can hold any value (DOM elements, timers, previous values, etc.)

Problems useRef solves:
-----------------------

Problem 1: Accessing DOM elements
----------------------------------

Solution: Use ref to get direct reference to DOM node

function TextInputWithFocusButton() {
  const inputRef = useRef(null);
  
  const handleClick = () => {
    inputRef.current.focus(); // Direct DOM manipulation
  };
  
  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Focus Input</button>
    </>
  );
}

Why this works:
- React assigns the DOM node to inputRef.current after rendering
- You can imperatively call DOM methods

Problem 2: Storing mutable values that don't cause re-renders
--------------------------------------------------------------

State vs Ref comparison:

// useState: re-renders on change
function CounterWithState() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    setCount(c => c + 1); // Triggers re-render
  };
  
  return <div>{count}</div>; // Shows updated value
}

// useRef: no re-render on change
function CounterWithRef() {
  const countRef = useRef(0);
  
  const increment = () => {
    countRef.current += 1; // No re-render!
    console.log(countRef.current); // Updates, but UI doesn't
  };
  
  return <div>{countRef.current}</div>; // Won't update on screen
}

When to use ref instead of state:
- Value changes but UI doesn't need to update
- Storing timers, intervals, subscriptions
- Caching expensive computations
- Tracking previous values

Problem 3: Storing timer IDs
-----------------------------

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);
  
  const start = () => {
    if (timerRef.current) return; // Already running
    
    timerRef.current = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
  };
  
  const stop = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };
  
  useEffect(() => {
    return () => clearInterval(timerRef.current); // Cleanup
  }, []);
  
  return (
    <div>
      <p>Seconds: {seconds}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}

Why ref?
- Timer ID needs to persist across renders
- Changing timer ID shouldn't cause re-render
- Can access in cleanup function

Problem 4: Tracking previous values
------------------------------------

function usePrevious(value) {
  const prevRef = useRef();
  
  useEffect(() => {
    prevRef.current = value; // Store after render
  });
  
  return prevRef.current; // Return previous value
}

function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  
  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}

How it works:
- First render: prevCount is undefined
- Click: count becomes 1, prevCount still 0 (from before effect ran)
- Effect runs after render, updates prevRef.current to 1
- Next render: prevCount is 1

Problem 5: Avoiding stale closures in callbacks
------------------------------------------------

function ChatRoom() {
  const [message, setMessage] = useState('');
  const latestMessageRef = useRef('');
  
  useEffect(() => {
    latestMessageRef.current = message; // Keep ref updated
  }, [message]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Latest message:', latestMessageRef.current);
      // Always reads current message, not stale closure value
    }, 1000);
    
    return () => clearInterval(timer);
  }, []); // Empty deps, but latestMessageRef.current is always fresh
  
  return <input value={message} onChange={e => setMessage(e.target.value)} />;
}

Why this works:
- Without ref, setInterval closure captures initial message value
- With ref, we read latestMessageRef.current which always has latest value

Problem 6: Measuring elements
------------------------------

function MeasureExample() {
  const divRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const measure = () => {
      if (divRef.current) {
        const { width, height } = divRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);
  
  return (
    <div ref={divRef}>
      Size: {dimensions.width} x {dimensions.height}
    </div>
  );
}

Problem 7: Callback refs for dynamic measurements
--------------------------------------------------

Sometimes you need to run code when ref is attached:

function MeasureOnMount() {
  const [height, setHeight] = useState(0);
  
  // Callback ref: function called when element is attached/detached
  const measureRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);
  
  return (
    <div ref={measureRef}>
      Height: {height}px
    </div>
  );
}

Callback ref signature:
- Called with DOM node when element mounts
- Called with null when element unmounts

Problem 8: Forwarding refs to child components
-----------------------------------------------

Parent needs ref to child's DOM:

const FancyInput = React.forwardRef((props, ref) => {
  return <input ref={ref} className="fancy-input" {...props} />;
});

function Parent() {
  const inputRef = useRef();
  
  const focusInput = () => {
    inputRef.current.focus();
  };
  
  return (
    <>
      <FancyInput ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}

Without forwardRef, refs aren't passed to function components.

Problem 9: Instance variables (class component equivalent)
-----------------------------------------------------------

Class component:

class Example extends React.Component {
  userId = null; // Instance variable
  
  componentDidMount() {
    this.userId = fetchUserId();
  }
}

Function component with useRef:

function Example() {
  const userIdRef = useRef(null);
  
  useEffect(() => {
    userIdRef.current = fetchUserId();
  }, []);
}

Problem 10: Avoiding unnecessary effects
-----------------------------------------

Tracking if component is mounted:

function DataFetcher() {
  const isMountedRef = useRef(true);
  const [data, setData] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      const result = await fetch('/api/data');
      const json = await result.json();
      
      // Only update state if still mounted
      if (isMountedRef.current) {
        setData(json);
      }
    }
    
    fetchData();
    
    return () => {
      isMountedRef.current = false; // Mark as unmounted
    };
  }, []);
  
  return <div>{data}</div>;
}

This prevents "Can't perform a React state update on an unmounted component" warnings.

Common patterns:
----------------

Pattern 1: Caching expensive values

function ExpensiveComponent({ data }) {
  const cacheRef = useRef(new Map());
  
  const processData = (id) => {
    if (cacheRef.current.has(id)) {
      return cacheRef.current.get(id); // Return cached
    }
    
    const result = expensiveOperation(data[id]);
    cacheRef.current.set(id, result); // Cache for next time
    return result;
  };
  
  return <div>{processData(123)}</div>;
}

Pattern 2: Debouncing without recreating timer

function SearchBox() {
  const [query, setQuery] = useState('');
  const timerRef = useRef();
  
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      performSearch(value);
    }, 500);
  };
  
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);
  
  return <input value={query} onChange={handleChange} />;
}

Pattern 3: Ref callback for multiple elements

function MultiElementMeasure() {
  const elementsRef = useRef(new Map());
  
  const setRef = useCallback((id) => (node) => {
    if (node) {
      elementsRef.current.set(id, node);
    } else {
      elementsRef.current.delete(id);
    }
  }, []);
  
  return (
    <>
      <div ref={setRef('div1')}>Element 1</div>
      <div ref={setRef('div2')}>Element 2</div>
    </>
  );
}

Ref vs State decision tree:
----------------------------

Use useState when:
✅ Value changes should re-render component
✅ Value is displayed in UI
✅ Value affects what user sees

Use useRef when:
✅ Value changes shouldn't trigger re-render
✅ Need to access DOM elements
✅ Storing timers, subscriptions, IDs
✅ Tracking values without triggering effects
✅ Caching values between renders
✅ Working with third-party imperative APIs

Summary:

useRef solves:
1. DOM access (most common use)
2. Storing mutable values without re-renders
3. Persisting values across renders
4. Timer/interval IDs
5. Previous value tracking
6. Avoiding stale closures
7. Instance variables in function components
8. Caching and performance optimizations
*/


/**
27. What is useMemo and why is memoization important?
-----------------------------------------------------

useMemo is a hook that memoizes (caches) the result of an expensive calculation, 
recomputing only when dependencies change.

Syntax:

const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

- First argument: function that computes the value
- Second argument: dependency array
- Returns: cached value until dependencies change

Why memoization is important:
------------------------------

1. Avoid expensive recalculations
2. Maintain referential equality (prevent unnecessary re-renders)
3. Improve performance in large component trees
4. Optimize child components that depend on props

Problem 1: Expensive calculations on every render
--------------------------------------------------

WITHOUT useMemo (bad performance):

function ProductList({ products, filter }) {
  // This runs on EVERY render, even if products/filter haven't changed
  const filteredProducts = products.filter(p => {
    // Expensive operation
    return expensiveFilterLogic(p, filter);
  });
  
  return (
    <div>
      {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}

If parent re-renders (e.g., unrelated state changes), this expensive filter runs again!

WITH useMemo (optimized):

function ProductList({ products, filter }) {
  // Only recalculates when products or filter change
  const filteredProducts = useMemo(() => {
    return products.filter(p => expensiveFilterLogic(p, filter));
  }, [products, filter]);
  
  return (
    <div>
      {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}

Now if parent re-renders but products/filter haven't changed, filteredProducts is reused.

Problem 2: Referential equality and child re-renders
-----------------------------------------------------

JavaScript objects/arrays are compared by reference:

const obj1 = { a: 1 };
const obj2 = { a: 1 };
obj1 === obj2; // false (different references)

WITHOUT useMemo:

function Parent() {
  const [count, setCount] = useState(0);
  
  // New object created on every render!
  const config = { theme: 'dark', fontSize: 14 };
  
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <Child config={config} />
    </div>
  );
}

const Child = React.memo(({ config }) => {
  console.log('Child rendered');
  return <div>Theme: {config.theme}</div>;
});

Result: Child re-renders on every Parent render, even though config values are same
(because config is a new object reference each time).

WITH useMemo:

function Parent() {
  const [count, setCount] = useState(0);
  
  // Same object reference unless dependencies change
  const config = useMemo(() => ({
    theme: 'dark',
    fontSize: 14
  }), []); // Empty deps = never changes
  
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <Child config={config} />
    </div>
  );
}

const Child = React.memo(({ config }) => {
  console.log('Child rendered');
  return <div>Theme: {config.theme}</div>;
});

Result: Child only renders once, skips subsequent re-renders (config reference is stable).

Real-world examples:
--------------------

Example 1: Filtering/sorting large lists

function DataTable({ data, sortBy, filterText }) {
  const processedData = useMemo(() => {
    // Step 1: Filter
    let filtered = data.filter(item => 
      item.name.toLowerCase().includes(filterText.toLowerCase())
    );
    
    // Step 2: Sort
    filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return a.price - b.price;
      return 0;
    });
    
    return filtered;
  }, [data, sortBy, filterText]);
  
  return (
    <table>
      {processedData.map(item => (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>${item.price}</td>
        </tr>
      ))}
    </table>
  );
}

Example 2: Computing derived state

function ShoppingCart({ items }) {
  const summary = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const shipping = subtotal > 50 ? 0 : 5;
    const total = subtotal + tax + shipping;
    
    return { subtotal, tax, shipping, total };
  }, [items]);
  
  return (
    <div>
      <p>Subtotal: ${summary.subtotal}</p>
      <p>Tax: ${summary.tax}</p>
      <p>Shipping: ${summary.shipping}</p>
      <p>Total: ${summary.total}</p>
    </div>
  );
}

Example 3: Expensive regex/validation

function EmailValidator({ email }) {
  const validation = useMemo(() => {
    if (!email) return { valid: false, message: 'Required' };
    
    // Expensive regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = emailRegex.test(email);
    
    return {
      valid,
      message: valid ? 'Valid email' : 'Invalid email format'
    };
  }, [email]);
  
  return (
    <div>
      <input value={email} />
      <p style={{ color: validation.valid ? 'green' : 'red' }}>
        {validation.message}
      </p>
    </div>
  );
}

Example 4: Memoizing style objects

function StyledComponent({ size }) {
  // Prevent new style object on every render
  const styles = useMemo(() => ({
    container: {
      width: size === 'large' ? '400px' : '200px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    title: {
      fontSize: size === 'large' ? '24px' : '16px'
    }
  }), [size]);
  
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Title</h1>
    </div>
  );
}

Example 5: Context value optimization

const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  // Prevent new context value object on every render
  const value = useMemo(() => ({
    theme,
    setTheme
  }), [theme]);
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

Without useMemo, every render creates new { theme, setTheme } object → all consumers 
re-render unnecessarily.

When NOT to use useMemo:
-------------------------

1. Simple calculations:

// Don't memoize simple operations
const doubled = useMemo(() => count * 2, [count]); // Overkill!

// Just do it directly
const doubled = count * 2;

2. Primitive values:

// Don't memoize primitives
const value = useMemo(() => 42, []); // Pointless!

// Primitives are compared by value anyway
const value = 42;

3. Values only used once:

// Don't memoize if not passed to children or used multiple times
const temporary = useMemo(() => transform(data), [data]);
return <div>{temporary}</div>; // Only used once, no benefit

4. Premature optimization:

// Don't memoize everything "just in case"
const x = useMemo(() => a + b, [a, b]); // Addition is cheap!
const y = useMemo(() => arr.length, [arr]); // .length is instant!

When TO use useMemo:
--------------------

✅ Expensive calculations (loops, complex algorithms)
✅ Referential equality matters (passed to React.memo components)
✅ Large list operations (filter, sort, map)
✅ Objects/arrays passed as props or context values
✅ Dependencies in other hooks (useEffect, useMemo, useCallback)

Decision tree:

Is the calculation expensive (>10ms)?
  ├─ YES → Use useMemo
  └─ NO → Is the value passed to optimized child (React.memo)?
          ├─ YES → Use useMemo (for referential equality)
          └─ NO → Don't use useMemo

useMemo vs useCallback:
------------------------

useMemo: Memoizes a VALUE
const memoizedValue = useMemo(() => computeValue(), [deps]);

useCallback: Memoizes a FUNCTION
const memoizedFn = useCallback(() => { / * function * / }, [deps]);

Actually, useCallback is just syntactic sugar:
useCallback(fn, deps) === useMemo(() => fn, deps)

Performance considerations:
---------------------------

useMemo itself has cost:
- Creates closure
- Stores value in memory
- Compares dependencies on every render

Only use when benefit > cost:

Bad (cost > benefit):
const sum = useMemo(() => a + b, [a, b]); // Comparison cost > addition cost

Good (benefit > cost):
const filtered = useMemo(() => 
  hugeArray.filter(item => expensiveCheck(item)), 
  [hugeArray]
); // Saves expensive re-filtering

Debugging:
----------

Check if memoization is working:

const value = useMemo(() => {
  console.log('Computing expensive value');
  return expensiveComputation();
}, [deps]);

If you see "Computing expensive value" on every render, deps are changing too often.

Common mistakes:
----------------

1. Missing dependencies:

const result = useMemo(() => {
  return data.filter(item => item.type === filterType);
}, [data]); // ❌ Missing filterType!

Fix:
}, [data, filterType]); // ✅

2. Inline object dependencies:

const value = useMemo(() => {
  return computeFromOptions(options);
}, [{ option1, option2 }]); // ❌ New object every render!

Fix:
}, [option1, option2]); // ✅ Depend on primitives

3. Over-memoizing:

function Component() {
  const a = useMemo(() => 1 + 1, []); // ❌ Overkill
  const b = useMemo(() => 'hello', []); // ❌ Overkill
  const c = useMemo(() => true, []); // ❌ Overkill
}

Summary:

useMemo:
- Caches expensive computation results
- Maintains referential equality for objects/arrays
- Prevents unnecessary re-renders of child components
- Has overhead, use judiciously
- Dependencies must include all used values
- Primary use: performance optimization, not correctness
*/


/**
28. What is useCallback and how does it help performance?
---------------------------------------------------------

useCallback is a hook that memoizes a function, returning the same function reference 
across renders unless dependencies change.

Syntax:

const memoizedCallback = useCallback(
  () => {
    // function body
  },
  [dependencies]
);

Equivalent to:
const memoizedCallback = useMemo(() => functionDefinition, [dependencies]);

Problem useCallback solves:
----------------------------

Functions are recreated on every render:

function Parent() {
  const [count, setCount] = useState(0);
  
  // New function created every render
  const handleClick = () => {
    console.log('Clicked');
  };
  
  return <Child onClick={handleClick} />;
}

Every render creates new handleClick → new reference → Child sees "different" prop → 
Child re-renders even if memoized with React.memo.

Problem 1: Preventing unnecessary child re-renders
---------------------------------------------------

WITHOUT useCallback:

function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  
  const handleClick = () => {
    console.log('Clicked');
  };
  
  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <ExpensiveChild onClick={handleClick} />
    </div>
  );
}

const ExpensiveChild = React.memo(({ onClick }) => {
  console.log('ExpensiveChild rendered');
  return <button onClick={onClick}>Child Button</button>;
});

Problem: Typing in input creates new handleClick → ExpensiveChild re-renders unnecessarily.

WITH useCallback:

function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  
  // Same function reference across renders
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // No dependencies = never changes
  
  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <ExpensiveChild onClick={handleClick} />
    </div>
  );
}

const ExpensiveChild = React.memo(({ onClick }) => {
  console.log('ExpensiveChild rendered'); // Only once!
  return <button onClick={onClick}>Child Button</button>;
});

Result: ExpensiveChild doesn't re-render when text changes (handleClick reference is stable).

Problem 2: Stable dependencies in useEffect
--------------------------------------------

WITHOUT useCallback:

function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  
  const fetchMessages = () => {
    fetch(`/api/messages/${roomId}`)
      .then(res => res.json())
      .then(setMessages);
  };
  
  useEffect(() => {
    fetchMessages();
    // ⚠️ Warning: fetchMessages recreated every render
  }, [fetchMessages]); // Dependency changes every render!
  
  return <div>...</div>;
}

Problem: fetchMessages is a new function every render → useEffect runs every render!

WITH useCallback:

function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  
  const fetchMessages = useCallback(() => {
    fetch(`/api/messages/${roomId}`)
      .then(res => res.json())
      .then(setMessages);
  }, [roomId]); // Only recreate when roomId changes
  
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]); // Stable dependency
  
  return <div>...</div>;
}

Now useEffect only runs when roomId actually changes.

Real-world examples:
--------------------

Example 1: Event handlers passed to children

function TodoList() {
  const [todos, setTodos] = useState([]);
  
  const handleToggle = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  }, []); // No external dependencies
  
  const handleDelete = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);
  
  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

const TodoItem = React.memo(({ todo, onToggle, onDelete }) => {
  console.log('TodoItem rendered:', todo.id);
  
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      {todo.text}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
});

Without useCallback, all TodoItems would re-render when any todo changes.

Example 2: Debounced search

function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  const performSearch = useCallback(async (searchQuery) => {
    const res = await fetch(`/api/search?q=${searchQuery}`);
    const data = await res.json();
    setResults(data);
  }, []);
  
  // Debounce function
  const debouncedSearch = useCallback(
    debounce((q) => performSearch(q), 500),
    [performSearch]
  );
  
  const handleChange = (e) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };
  
  return (
    <div>
      <input value={query} onChange={handleChange} />
      {results.map(r => <div key={r.id}>{r.title}</div>)}
    </div>
  );
}

Example 3: Custom hooks with callbacks

function useKeyPress(targetKey, callback) {
  // Memoize callback to avoid re-attaching event listener
  const memoizedCallback = useCallback(callback, [callback]);
  
  useEffect(() => {
    const handler = (e) => {
      if (e.key === targetKey) {
        memoizedCallback(e);
      }
    };
    
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [targetKey, memoizedCallback]);
}

// Usage
function Component() {
  const handleEscape = useCallback(() => {
    console.log('Escape pressed');
  }, []);
  
  useKeyPress('Escape', handleEscape);
}

Example 4: Callbacks with dependencies

function ProductFilter({ minPrice, maxPrice }) {
  const [products, setProducts] = useState([]);
  
  // Recreates when min/max price changes
  const filterProducts = useCallback((products) => {
    return products.filter(p => 
      p.price >= minPrice && p.price <= maxPrice
    );
  }, [minPrice, maxPrice]);
  
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(filterProducts(data)));
  }, [filterProducts]);
  
  return <div>...</div>;
}

Example 5: Inline handlers vs useCallback

When to use inline:

function Parent() {
  const [count, setCount] = useState(0);
  
  // Inline is fine if child isn't memoized
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
      <UnmemoizedChild onClick={() => console.log('clicked')} />
    </div>
  );
}

When to useCallback:

function Parent() {
  const [count, setCount] = useState(0);
  
  // useCallback needed if child is memoized
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);
  
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <MemoizedChild onClick={handleClick} />
    </div>
  );
}

const MemoizedChild = React.memo(({ onClick }) => {
  return <button onClick={onClick}>Click</button>;
});

When NOT to use useCallback:
-----------------------------

1. Functions not passed to children:

// Don't useCallback for internal handlers not passed down
function Component() {
  const handleClick = useCallback(() => {
    console.log('Local handler');
  }, []); // Unnecessary!
  
  return <button onClick={handleClick}>Click</button>;
}

Better:

function Component() {
  const handleClick = () => {
    console.log('Local handler');
  };
  
  return <button onClick={handleClick}>Click</button>;
}

2. Children not memoized:

// Don't useCallback if child doesn't use React.memo
const handleClick = useCallback(() => {}, []); // Wasted effort

<UnmemoizedChild onClick={handleClick} />

3. Premature optimization:

// Don't useCallback everything
const add = useCallback((a, b) => a + b, []); // Pointless!
const value = add(1, 2);

When TO use useCallback:
-------------------------

✅ Function passed to memoized child (React.memo)
✅ Function used as dependency in useEffect/useMemo/useCallback
✅ Function passed to custom hooks
✅ Function attached to expensive event listeners
✅ Function identity matters for equality checks

Performance trade-offs:
------------------------

useCallback has cost:
- Creates closure
- Stores function in memory
- Compares dependencies on every render

Only beneficial when:
- Child component is expensive to render
- Function is used in hooks' dependency arrays
- Function identity matters for other optimizations

Bad (no benefit):

function Component() {
  const handleClick = useCallback(() => {
    console.log('click');
  }, []); // Cost of useCallback > benefit
  
  return <button onClick={handleClick}>Click</button>;
}

Good (clear benefit):

function Component() {
  const handleClick = useCallback(() => {
    console.log('click');
  }, []);
  
  return <ExpensiveChild onClick={handleClick} />;
  // Prevents expensive child re-render
}

Common patterns:
----------------

Pattern 1: Handler factories

function ItemList({ items }) {
  const handleItemClick = useCallback((id) => {
    console.log('Item clicked:', id);
  }, []);
  
  return (
    <div>
      {items.map(item => (
        <Item key={item.id} item={item} onClick={() => handleItemClick(item.id)} />
      ))}
    </div>
  );
}

Pattern 2: Callback with state updates

function Counter() {
  const [count, setCount] = useState(0);
  
  // No dependency on count (uses functional update)
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  
  const incrementBy = useCallback((amount) => {
    setCount(c => c + amount);
  }, []);
  
  return (
    <div>
      <button onClick={increment}>+1</button>
      <button onClick={() => incrementBy(5)}>+5</button>
    </div>
  );
}

Pattern 3: Combining with useMemo

function DataProcessor({ data }) {
  const processedData = useMemo(() => {
    return expensiveProcess(data);
  }, [data]);
  
  const handleExport = useCallback(() => {
    exportToCSV(processedData);
  }, [processedData]); // Depends on memoized value
  
  return <button onClick={handleExport}>Export</button>;
}

Debugging:
----------

Check if callback is stable:

const handleClick = useCallback(() => {
  console.log('Click handler created');
}, [deps]);

If you see "Click handler created" on every render, dependencies are changing too often.

Common mistakes:
----------------

1. Missing dependencies:

const handleSubmit = useCallback(() => {
  sendData(formData);
}, []); // ❌ Missing formData dependency!

Fix:
}, [formData]); // ✅

2. Inline object/array dependencies:

const callback = useCallback(() => {
  doSomething(config);
}, [{ option1, option2 }]); // ❌ New object every render!

Fix:
}, [option1, option2]); // ✅ Primitive dependencies

3. Overusing useCallback:

function Component() {
  const a = useCallback(() => {}, []);
  const b = useCallback(() => {}, []);
  const c = useCallback(() => {}, []);
  // Too much! Evaluate if needed
}

Summary:

useCallback:
- Memoizes functions to maintain stable references
- Prevents unnecessary child re-renders (with React.memo)
- Stabilizes dependencies in useEffect/useMemo
- Has overhead, use when benefits are clear
- Primary use: child component optimization, not correctness
- Alternative to useMemo(() => fn, deps)
*/


/**
29. What is useContext and how does the Context API work?
---------------------------------------------------------

useContext is a hook that lets you consume context values without using Context.Consumer.
Context API provides a way to pass data through the component tree without manually passing 
props at every level ("prop drilling").

Problem Context solves: Prop drilling
--------------------------------------

WITHOUT Context (prop drilling):

function App() {
  const [user, setUser] = useState({ name: 'Alice', theme: 'dark' });
  
  return <Layout user={user} />;
}

function Layout({ user }) {
  return <Sidebar user={user} />;
}

function Sidebar({ user }) {
  return <Navigation user={user} />;
}

function Navigation({ user }) {
  return <UserProfile user={user} />;
}

function UserProfile({ user }) {
  return <div>{user.name}</div>;
}

Problem: user is passed through Layout, Sidebar, Navigation just to reach UserProfile.

WITH Context:

// 1. Create context
const UserContext = React.createContext();

// 2. Provide value at top level
function App() {
  const [user, setUser] = useState({ name: 'Alice', theme: 'dark' });
  
  return (
    <UserContext.Provider value={user}>
      <Layout />
    </UserContext.Provider>
  );
}

// 3. Components in between don't need to know about user
function Layout() {
  return <Sidebar />;
}

function Sidebar() {
  return <Navigation />;
}

function Navigation() {
  return <UserProfile />;
}

// 4. Consume context where needed
function UserProfile() {
  const user = useContext(UserContext);
  return <div>{user.name}</div>;
}

No more prop drilling!

Basic Context API usage:
------------------------

Step 1: Create context

import { createContext } from 'react';

// Optional default value
const ThemeContext = createContext('light');

Step 2: Provide context value

function App() {
  const [theme, setTheme] = useState('dark');
  
  return (
    <ThemeContext.Provider value={theme}>
      <Page />
    </ThemeContext.Provider>
  );
}

Step 3: Consume context with useContext

function ThemedButton() {
  const theme = useContext(ThemeContext);
  
  return (
    <button className={theme === 'dark' ? 'btn-dark' : 'btn-light'}>
      Click me
    </button>
  );
}

How Context works internally:
------------------------------

1. Provider broadcasts value
2. Any component below Provider can subscribe to context
3. When context value changes, all subscribers re-render
4. Components between Provider and consumer don't need to pass props

Real-world examples:
--------------------

Example 1: Theme context

// contexts/ThemeContext.js
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  const value = {
    theme,
    toggleTheme
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// App.js
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Content />
      <Footer />
    </ThemeProvider>
  );
}

// Any component can use theme
function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className={theme}>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'}
      </button>
    </header>
  );
}

Example 2: Authentication context

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in
    fetchCurrentUser()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);
  
  const login = async (email, password) => {
    const user = await loginAPI(email, password);
    setUser(user);
  };
  
  const logout = () => {
    logoutAPI();
    setUser(null);
  };
  
  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// Usage
function Profile() {
  const { user, logout } = useAuth();
  
  if (!user) return <div>Please log in</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  return children;
}

Example 3: Multi-level nested context

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <Router>
            <Routes />
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

function Component() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  return (
    <div className={theme}>
      {t('welcome', { name: user.name })}
    </div>
  );
}

Example 4: Form context

const FormContext = createContext();

export function Form({ initialValues, onSubmit, children }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  
  const setValue = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
    } else {
      setErrors(validationErrors);
    }
  };
  
  const value = {
    values,
    errors,
    setValue
  };
  
  return (
    <FormContext.Provider value={value}>
      <form onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

export function FormField({ name, label }) {
  const { values, errors, setValue } = useContext(FormContext);
  
  return (
    <div>
      <label>{label}</label>
      <input
        value={values[name] || ''}
        onChange={e => setValue(name, e.target.value)}
      />
      {errors[name] && <span className="error">{errors[name]}</span>}
    </div>
  );
}

// Usage
function MyForm() {
  return (
    <Form
      initialValues={{ email: '', password: '' }}
      onSubmit={values => console.log(values)}
    >
      <FormField name="email" label="Email" />
      <FormField name="password" label="Password" />
      <button type="submit">Submit</button>
    </Form>
  );
}

Context performance optimization:
---------------------------------

Problem: All consumers re-render when context value changes

function App() {
  const [user, setUser] = useState({ name: 'Alice' });
  const [theme, setTheme] = useState('dark');
  
  // New object on every render!
  const value = { user, theme, setUser, setTheme };
  
  return (
    <AppContext.Provider value={value}>
      <Component />
    </AppContext.Provider>
  );
}

Every render creates new value object → all consumers re-render even if data unchanged.

Solution 1: useMemo for context value

function App() {
  const [user, setUser] = useState({ name: 'Alice' });
  const [theme, setTheme] = useState('dark');
  
  // Memoize context value
  const value = useMemo(() => ({
    user,
    theme,
    setUser,
    setTheme
  }), [user, theme]);
  
  return (
    <AppContext.Provider value={value}>
      <Component />
    </AppContext.Provider>
  );
}

Now value only changes when user or theme actually changes.

Solution 2: Split contexts

// Instead of one context with everything
const UserContext = createContext();
const ThemeContext = createContext();

function App() {
  const [user, setUser] = useState({ name: 'Alice' });
  const [theme, setTheme] = useState('dark');
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Component />
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

// Components only re-render when their specific context changes
function UserProfile() {
  const { user } = useContext(UserContext);
  // Only re-renders when user changes, not theme
  return <div>{user.name}</div>;
}

function ThemedButton() {
  const { theme } = useContext(ThemeContext);
  // Only re-renders when theme changes, not user
  return <button className={theme}>Click</button>;
}

Solution 3: Context selectors (with external libraries)

// Using libraries like use-context-selector
import { createContext, useContextSelector } from 'use-context-selector';

const AppContext = createContext();

function UserName() {
  // Only re-renders when user.name changes
  const userName = useContextSelector(AppContext, state => state.user.name);
  return <div>{userName}</div>;
}

Default values in createContext:
---------------------------------

const ThemeContext = createContext('light'); // Default value

Default value is used ONLY when:
- Component uses context but there's no Provider above it in tree

function Component() {
  const theme = useContext(ThemeContext);
  // If no Provider, theme === 'light' (default)
  return <div className={theme}>Content</div>;
}

Default value is NOT used when:
- Provider exists with value={undefined}

<ThemeContext.Provider value={undefined}>
  <Component /> {/ * theme is undefined, not 'light' * /}
</ThemeContext.Provider>

Common patterns:
----------------

Pattern 1: Custom hook for context

export function useMyContext() {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error('useMyContext must be used within MyContextProvider');
  }
  return context;
}

Pattern 2: Context with reducer

const StateContext = createContext();
const DispatchContext = createContext();

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export function useState() {
  return useContext(StateContext);
}

export function useDispatch() {
  return useContext(DispatchContext);
}

Pattern 3: Composed providers

function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <I18nProvider>
          {children}
        </I18nProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

When NOT to use Context:
-------------------------

❌ For frequently changing values (causes many re-renders)
❌ For performance-critical state (consider useState, Redux, Zustand)
❌ For simple parent-child communication (just use props)
❌ For everything (overusing context makes code harder to understand)

When TO use Context:
--------------------

✅ Theme, locale, authentication (changes infrequently)
✅ Avoiding deep prop drilling (5+ levels)
✅ Sharing state across unrelated components
✅ Providing dependencies/services to subtree

Summary:

useContext:
- Consumes context created with createContext
- Avoids prop drilling
- All consumers re-render when context value changes
- Optimize with useMemo and split contexts
- Best for infrequently changing data
- Combine with custom hooks for better API
*/


/**
30. What is useReducer and when should you use it over useState?
----------------------------------------------------------------

useReducer is a hook for managing complex state with a reducer function, similar to Redux.

Syntax:

const [state, dispatch] = useReducer(reducer, initialState);

// Or with lazy initialization:
const [state, dispatch] = useReducer(reducer, initialArg, init);

- reducer: (state, action) => newState function
- initialState: starting state value
- init: optional function to lazily create initial state
- state: current state value
- dispatch: function to send actions to reducer

Basic example:
--------------

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}

Equivalent with useState:

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      Count: {count}
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <button onClick={() => setCount(c => c - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

When to use useReducer over useState:
--------------------------------------

1. Multiple related state values
---------------------------------

BAD with useState (too many related states):

function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Many separate setters, hard to coordinate
  const handleSubmit = async () => {
    setLoading(true);
    setErrors({});
    try {
      await submitForm({ name, email, password });
      setSubmitted(true);
      setLoading(false);
    } catch (err) {
      setErrors(err.errors);
      setLoading(false);
    }
  };
}

GOOD with useReducer (grouped state logic):

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: null }
      };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'SUBMIT_START':
      return { ...state, loading: true, errors: {} };
    case 'SUBMIT_SUCCESS':
      return { ...state, loading: false, submitted: true };
    case 'SUBMIT_ERROR':
      return { ...state, loading: false, errors: action.errors };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const initialState = {
  name: '',
  email: '',
  password: '',
  errors: {},
  loading: false,
  submitted: false
};

function Form() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_START' });
    
    try {
      await submitForm(state);
      dispatch({ type: 'SUBMIT_SUCCESS' });
    } catch (err) {
      dispatch({ type: 'SUBMIT_ERROR', errors: err.errors });
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={state.name}
        onChange={e => dispatch({ 
          type: 'SET_FIELD', 
          field: 'name', 
          value: e.target.value 
        })}
      />
      {state.errors.name && <span>{state.errors.name}</span>}
      
      <input
        value={state.email}
        onChange={e => dispatch({ 
          type: 'SET_FIELD', 
          field: 'email', 
          value: e.target.value 
        })}
      />
      {state.errors.email && <span>{state.errors.email}</span>}
      
      <button disabled={state.loading}>
        {state.loading ? 'Submitting...' : 'Submit'}
      </button>
      
      {state.submitted && <p>Success!</p>}
    </form>
  );
}

2. Complex state transitions
-----------------------------

Shopping cart with complex logic:

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        item => item.id === action.item.id
      );
      
      if (existingIndex >= 0) {
        // Item exists, increase quantity
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + 1
        };
        return { ...state, items: newItems };
      } else {
        // New item
        return {
          ...state,
          items: [...state.items, { ...action.item, quantity: 1 }]
        };
      }
    }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id)
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.id
            ? { ...item, quantity: action.quantity }
            : item
        )
      };
    
    case 'APPLY_DISCOUNT':
      return {
        ...state,
        discount: action.discount,
        discountCode: action.code
      };
    
    case 'CLEAR_CART':
      return { items: [], discount: 0, discountCode: null };
    
    default:
      return state;
  }
}

function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    discount: 0,
    discountCode: null
  });
  
  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const finalTotal = total * (1 - state.discount);
  
  return (
    <div>
      {state.items.map(item => (
        <div key={item.id}>
          {item.name} x {item.quantity}
          <button onClick={() => 
            dispatch({ type: 'REMOVE_ITEM', id: item.id })
          }>
            Remove
          </button>
        </div>
      ))}
      <p>Total: ${finalTotal}</p>
    </div>
  );
}

3. Next state depends on previous state
----------------------------------------

With useState, you need functional updates:

const [state, setState] = useState({ count: 0, history: [] });

const increment = () => {
  setState(prev => ({
    count: prev.count + 1,
    history: [...prev.history, prev.count + 1]
  }));
};

With useReducer, logic is centralized:

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {
        count: state.count + 1,
        history: [...state.history, state.count + 1]
      };
    case 'decrement':
      return {
        count: state.count - 1,
        history: [...state.history, state.count - 1]
      };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0, history: [] });

4. Easier testing
-----------------

Reducer is a pure function, easy to test:

// reducer.test.js
import { reducer } from './reducer';

test('increment increases count', () => {
  const state = { count: 0 };
  const action = { type: 'increment' };
  
  expect(reducer(state, action)).toEqual({ count: 1 });
});

test('decrement decreases count', () => {
  const state = { count: 5 };
  const action = { type: 'decrement' };
  
  expect(reducer(state, action)).toEqual({ count: 4 });
});

5. Sharing logic across components
-----------------------------------

Same reducer can be used in multiple components:

// reducers/todoReducer.js
export function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.text, done: false }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
}

// Component A
function TodoListA() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  // ...
}

// Component B (reuses same reducer)
function TodoListB() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  // ...
}

6. Combining with Context (Redux pattern)
------------------------------------------

const TodoContext = createContext();

function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, []);
  
  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

function useTodos() {
  return useContext(TodoContext);
}

// Any component can access
function TodoList() {
  const { todos, dispatch } = useTodos();
  
  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          {todo.text}
          <button onClick={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id })}>
            Toggle
          </button>
        </div>
      ))}
    </div>
  );
}

Lazy initialization:
--------------------

Expensive initial state calculation:

function init(initialCount) {
  // Expensive computation
  return { count: initialCount, history: [] };
}

function Counter({ initialCount }) {
  // init only runs once
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  
  return <div>Count: {state.count}</div>;
}

Real-world example: Data fetching
----------------------------------

function dataReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return {
        loading: false,
        error: null,
        data: action.data
      };
    case 'FETCH_ERROR':
      return {
        loading: false,
        error: action.error,
        data: null
      };
    default:
      return state;
  }
}

function UserProfile({ userId }) {
  const [state, dispatch] = useReducer(dataReducer, {
    loading: false,
    error: null,
    data: null
  });
  
  useEffect(() => {
    dispatch({ type: 'FETCH_START' });
    
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => dispatch({ type: 'FETCH_SUCCESS', data }))
      .catch(error => dispatch({ type: 'FETCH_ERROR', error }));
  }, [userId]);
  
  if (state.loading) return <div>Loading...</div>;
  if (state.error) return <div>Error: {state.error.message}</div>;
  if (!state.data) return null;
  
  return <div>{state.data.name}</div>;
}

useState vs useReducer decision tree:
--------------------------------------

Use useState when:
✅ Simple independent state (single value)
✅ Boolean toggles
✅ Simple counters
✅ Form inputs (single field)
✅ State updates are straightforward

Use useReducer when:
✅ Multiple related state values
✅ Complex state transitions
✅ Next state depends on previous state
✅ Need to track state history
✅ State logic is complex enough to benefit from separation
✅ Easier to test state logic in isolation
✅ Want to share state logic across components
✅ Building state management similar to Redux

Comparison table:
-----------------

Aspect              | useState                    | useReducer
--------------------|----------------------------|---------------------------
State structure     | Simple, single values      | Complex, multiple values
Logic location      | In components              | Centralized in reducer
Testability         | Test components            | Test pure reducer function
Readability         | Simple cases               | Complex state transitions
Boilerplate         | Less                       | More (action types, reducer)
Redux-like          | No                         | Yes
Learning curve      | Easier                     | Steeper

Common patterns with useReducer:
---------------------------------

Pattern 1: Action creators

// Instead of inline dispatch
dispatch({ type: 'ADD_TODO', text: 'Buy milk' });

// Use action creators
function addTodo(text) {
  return { type: 'ADD_TODO', text };
}

dispatch(addTodo('Buy milk'));

Pattern 2: Middleware-like logic

function reducerWithLogger(reducer) {
  return (state, action) => {
    console.log('Previous state:', state);
    console.log('Action:', action);
    const newState = reducer(state, action);
    console.log('New state:', newState);
    return newState;
  };
}

const [state, dispatch] = useReducer(
  reducerWithLogger(todoReducer),
  initialState
);

Pattern 3: Immer for immutable updates

import { useImmerReducer } from 'use-immer';

function reducer(draft, action) {
  switch (action.type) {
    case 'ADD_TODO':
      // Mutate draft directly (Immer handles immutability)
      draft.push({ id: Date.now(), text: action.text });
      break;
    case 'TOGGLE_TODO':
      const todo = draft.find(t => t.id === action.id);
      if (todo) todo.done = !todo.done;
      break;
  }
}

const [todos, dispatch] = useImmerReducer(reducer, []);

Summary:

useReducer is ideal when:
- State has multiple sub-values
- Complex state transitions
- Next state depends on previous
- Need testable state logic
- Building Redux-like architecture
- Want to separate state logic from component

useState is simpler for:
- Single values
- Independent state pieces
- Simple updates
- Getting started quickly
*/


/**
31. What is useImperativeHandle?
--------------------------------

useImperativeHandle customizes the instance value exposed when using ref with 
forwardRef. It allows parent components to call specific methods on child components 
while keeping most of the component's internals private.

Syntax:

useImperativeHandle(ref, createHandle, [dependencies]);

- ref: the ref forwarded from parent
- createHandle: function that returns the object exposed to parent
- dependencies: optional array (like useEffect)

Why it exists:
--------------

React encourages declarative programming (passing props), but sometimes you need 
imperative actions (calling methods on child components). useImperativeHandle lets 
you expose a controlled API while keeping implementation details private.

Basic example:
--------------

WITHOUT useImperativeHandle (full DOM exposure):

const Input = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

function Parent() {
  const inputRef = useRef();
  
  const handleClick = () => {
    // Parent has full access to DOM node
    inputRef.current.focus();
    inputRef.current.select();
    inputRef.current.value = 'hello'; // Can do anything!
  };
  
  return (
    <>
      <Input ref={inputRef} />
      <button onClick={handleClick}>Focus</button>
    </>
  );
}

WITH useImperativeHandle (controlled API):

const Input = forwardRef((props, ref) => {
  const inputRef = useRef();
  
  useImperativeHandle(ref, () => ({
    // Only expose specific methods
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = '';
    }
    // Don't expose: select, blur, or direct DOM access
  }));
  
  return <input ref={inputRef} {...props} />;
});

function Parent() {
  const inputRef = useRef();
  
  const handleClick = () => {
    inputRef.current.focus(); // ✅ Works
    inputRef.current.clear(); // ✅ Works
    // inputRef.current.select(); // ❌ Not available
    // inputRef.current.blur(); // ❌ Not available
  };
  
  return (
    <>
      <Input ref={inputRef} />
      <button onClick={handleClick}>Focus & Clear</button>
    </>
  );
}

Real-world examples:
--------------------

Example 1: Modal component with imperative API

const Modal = forwardRef(({ children }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef();
  
  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
      // Could add animation, focus management, etc.
    },
    close: () => {
      setIsOpen(false);
    },
    toggle: () => {
      setIsOpen(prev => !prev);
    }
  }));
  
  if (!isOpen) return null;
  
  return (
    <div className="modal-backdrop">
      <div className="modal" ref={dialogRef}>
        {children}
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
    </div>
  );
});

function App() {
  const modalRef = useRef();
  
  return (
    <div>
      <button onClick={() => modalRef.current.open()}>
        Open Modal
      </button>
      <button onClick={() => modalRef.current.toggle()}>
        Toggle Modal
      </button>
      
      <Modal ref={modalRef}>
        <h2>Modal Content</h2>
      </Modal>
    </div>
  );
}

Example 2: Video player with playback controls

const VideoPlayer = forwardRef(({ src }, ref) => {
  const videoRef = useRef();
  
  useImperativeHandle(ref, () => ({
    play: () => {
      videoRef.current.play();
    },
    pause: () => {
      videoRef.current.pause();
    },
    seek: (time) => {
      videoRef.current.currentTime = time;
    },
    setVolume: (volume) => {
      videoRef.current.volume = Math.max(0, Math.min(1, volume));
    },
    getCurrentTime: () => {
      return videoRef.current.currentTime;
    },
    getDuration: () => {
      return videoRef.current.duration;
    }
  }));
  
  return (
    <video ref={videoRef} src={src} />
  );
});

function VideoController() {
  const playerRef = useRef();
  
  return (
    <div>
      <VideoPlayer ref={playerRef} src="/video.mp4" />
      
      <div className="controls">
        <button onClick={() => playerRef.current.play()}>Play</button>
        <button onClick={() => playerRef.current.pause()}>Pause</button>
        <button onClick={() => playerRef.current.seek(0)}>Restart</button>
        <button onClick={() => playerRef.current.setVolume(0.5)}>50% Volume</button>
      </div>
    </div>
  );
}

Example 3: Form with validation API

const Form = forwardRef(({ children, onSubmit }, ref) => {
  const [errors, setErrors] = useState({});
  const fieldsRef = useRef({});
  
  useImperativeHandle(ref, () => ({
    validate: () => {
      const newErrors = {};
      
      Object.entries(fieldsRef.current).forEach(([name, field]) => {
        if (field.required && !field.value) {
          newErrors[name] = 'This field is required';
        }
      });
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    reset: () => {
      Object.values(fieldsRef.current).forEach(field => {
        field.value = '';
      });
      setErrors({});
    },
    getValues: () => {
      const values = {};
      Object.entries(fieldsRef.current).forEach(([name, field]) => {
        values[name] = field.value;
      });
      return values;
    }
  }));
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Can call validate internally too
    onSubmit(fieldsRef.current);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {children}
      {Object.entries(errors).map(([field, error]) => (
        <div key={field} className="error">{error}</div>
      ))}
    </form>
  );
});

function App() {
  const formRef = useRef();
  
  const handleExternalValidation = () => {
    if (formRef.current.validate()) {
      const values = formRef.current.getValues();
      console.log('Form is valid:', values);
    } else {
      console.log('Form has errors');
    }
  };
  
  return (
    <div>
      <Form ref={formRef} onSubmit={console.log}>
        <input name="email" type="email" required />
        <input name="password" type="password" required />
      </Form>
      
      <button onClick={handleExternalValidation}>
        Validate Externally
      </button>
      <button onClick={() => formRef.current.reset()}>
        Reset Form
      </button>
    </div>
  );
}

Example 4: Animation controller

const AnimatedBox = forwardRef((props, ref) => {
  const boxRef = useRef();
  const animationRef = useRef();
  
  useImperativeHandle(ref, () => ({
    slideIn: () => {
      boxRef.current.style.transform = 'translateX(0)';
      boxRef.current.style.opacity = '1';
    },
    slideOut: () => {
      boxRef.current.style.transform = 'translateX(100%)';
      boxRef.current.style.opacity = '0';
    },
    fadeIn: () => {
      boxRef.current.style.opacity = '1';
    },
    fadeOut: () => {
      boxRef.current.style.opacity = '0';
    },
    reset: () => {
      boxRef.current.style.transform = '';
      boxRef.current.style.opacity = '';
    }
  }));
  
  return (
    <div
      ref={boxRef}
      style={{ transition: 'all 0.3s ease' }}
      {...props}
    />
  );
});

function AnimationDemo() {
  const boxRef = useRef();
  
  return (
    <div>
      <AnimatedBox ref={boxRef}>Animated Content</AnimatedBox>
      
      <button onClick={() => boxRef.current.slideIn()}>Slide In</button>
      <button onClick={() => boxRef.current.slideOut()}>Slide Out</button>
      <button onClick={() => boxRef.current.fadeOut()}>Fade Out</button>
      <button onClick={() => boxRef.current.reset()}>Reset</button>
    </div>
  );
}

Example 5: Combining with other hooks

const DataGrid = forwardRef(({ data, columns }, ref) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const gridRef = useRef();
  
  useImperativeHandle(ref, () => ({
    getSelectedRows: () => selectedRows,
    clearSelection: () => setSelectedRows([]),
    selectAll: () => setSelectedRows(data.map((_, i) => i)),
    exportToCSV: () => {
      // Complex export logic
      const csv = generateCSV(data, columns);
      downloadCSV(csv);
    },
    scrollToTop: () => {
      gridRef.current.scrollTop = 0;
    }
  }), [selectedRows, data, columns]); // Dependencies!
  
  return (
    <div ref={gridRef} className="data-grid">
      {/ * Grid rendering * /}
    </div>
  );
});

function DataGridDemo() {
  const gridRef = useRef();
  
  return (
    <div>
      <div className="toolbar">
        <button onClick={() => gridRef.current.selectAll()}>
          Select All
        </button>
        <button onClick={() => gridRef.current.clearSelection()}>
          Clear Selection
        </button>
        <button onClick={() => gridRef.current.exportToCSV()}>
          Export CSV
        </button>
      </div>
      
      <DataGrid
        ref={gridRef}
        data={[/ * ... * /]}
        columns={[/ * ... * /]}
      />
    </div>
  );
}

Dependencies array:
-------------------

useImperativeHandle can have dependencies, like useEffect:

const Component = forwardRef((props, ref) => {
  const [count, setCount] = useState(0);
  
  useImperativeHandle(ref, () => ({
    getCount: () => count, // Uses count
    increment: () => setCount(c => c + 1)
  }), [count]); // ✅ Include count as dependency
  
  return <div>{count}</div>;
});

Without dependencies, the exposed methods would capture stale closure values.

When NOT to use useImperativeHandle:
-------------------------------------

❌ When declarative props would work better
❌ For simple parent-child communication (use callbacks)
❌ To bypass React's data flow without good reason
❌ When you can lift state up instead

BAD (unnecessary):

const Input = forwardRef((props, ref) => {
  const [value, setValue] = useState('');
  
  useImperativeHandle(ref, () => ({
    getValue: () => value, // ❌ Just use controlled component!
    setValue: (v) => setValue(v)
  }));
  
  return <input value={value} onChange={e => setValue(e.target.value)} />;
});

GOOD (declarative):

function Input({ value, onChange }) {
  return <input value={value} onChange={onChange} />;
}

function Parent() {
  const [value, setValue] = useState('');
  
  return <Input value={value} onChange={e => setValue(e.target.value)} />;
}

When TO use useImperativeHandle:
---------------------------------

✅ Exposing imperative methods (focus, play, pause, reset)
✅ Integrating with third-party imperative libraries
✅ Building reusable UI components with imperative APIs (modals, players, editors)
✅ When declarative approach is overly complex or impossible
✅ Encapsulating complex DOM interactions

Best practices:
---------------

1. Keep exposed API minimal:

// ❌ Bad: Expose too much
useImperativeHandle(ref, () => ({
  ...internalRef.current, // Everything!
  internalState,
  helpers
}));

// ✅ Good: Only what's needed
useImperativeHandle(ref, () => ({
  focus: () => internalRef.current.focus(),
  clear: () => internalRef.current.value = ''
}));

2. Use descriptive method names:

// ❌ Bad
useImperativeHandle(ref, () => ({
  fn1: () => {},
  fn2: () => {},
  do: () => {}
}));

// ✅ Good
useImperativeHandle(ref, () => ({
  open: () => {},
  close: () => {},
  toggle: () => {}
}));

3. Always forward ref:

// ❌ Bad: useImperativeHandle without forwardRef
function Component(props) {
  useImperativeHandle(???, () => ({})); // No ref!
}

// ✅ Good
const Component = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({}));
});

4. Include dependencies:

// ❌ Bad: Missing dependencies
useImperativeHandle(ref, () => ({
  getState: () => state
})); // Missing [state]

// ✅ Good
useImperativeHandle(ref, () => ({
  getState: () => state
}), [state]);

5. Document the API:

/**
 * Exposed API:
 * - open(): Opens the modal
 * - close(): Closes the modal
 * - toggle(): Toggles modal visibility
 * /
const Modal = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    open,
    close,
    toggle
  }));
});

Summary:

useImperativeHandle:
- Customizes ref value exposed to parent
- Used with forwardRef
- Exposes imperative API for declarative components
- Keeps internals private while exposing specific methods
- Common for modals, media players, forms, animations
- Use sparingly; prefer declarative props when possible
*/


/**
32. What is useTransition and when to use concurrent features?
--------------------------------------------------------------

useTransition is a React 18+ hook that lets you mark state updates as "transitions" 
(low-priority updates that can be interrupted), keeping the UI responsive during 
expensive operations.

Syntax:

const [isPending, startTransition] = useTransition();

- isPending: boolean indicating if a transition is in progress
- startTransition: function to wrap state updates you want to mark as transitions

What are transitions?
---------------------

Transitions are state updates that:
- Can be interrupted by more urgent updates
- Don't block the UI
- Keep the interface responsive during heavy rendering

Two types of updates in React:

1. Urgent updates:
   - Typing, clicking, hovering
   - Need immediate feedback
   - Should never be slow

2. Transitions (non-urgent updates):
   - Search results appearing
   - Filtering large lists
   - Route transitions
   - Can show stale content briefly while preparing new content

Basic example:
--------------

WITHOUT useTransition (blocking):

function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value); // Updates input
    
    // Expensive filtering (blocks UI)
    const filtered = hugeList.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered); // Blocks until done
  };
  
  return (
    <div>
      <input value={query} onChange={handleChange} />
      {/* Input feels sluggish during filtering * /}
      <ResultsList results={results} />
    </div>
  );
}

WITH useTransition (non-blocking):

function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();
  
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value); // Urgent update (immediate)
    
    startTransition(() => {
      // Non-urgent update (can be interrupted)
      const filtered = hugeList.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    });
  };
  
  return (
    <div>
      <input value={query} onChange={handleChange} />
      {/* Input stays responsive! * /}
      
      {isPending && <div>Loading...</div>}
      <ResultsList results={results} />
    </div>
  );
}

How it works:
- Typing updates query immediately (urgent)
- Filtering results is marked as transition (non-urgent)
- If user keeps typing, React can interrupt the transition and start a new one
- UI stays responsive; input never lags

Real-world examples:
--------------------

Example 1: Tab switching with heavy content

function Tabs() {
  const [activeTab, setActiveTab] = useState('home');
  const [isPending, startTransition] = useTransition();
  
  const switchTab = (tab) => {
    startTransition(() => {
      setActiveTab(tab);
      // Even if this tab has expensive rendering, UI stays responsive
    });
  };
  
  return (
    <div>
      <div className="tabs">
        <button onClick={() => switchTab('home')}>Home</button>
        <button onClick={() => switchTab('profile')}>Profile</button>
        <button onClick={() => switchTab('settings')}>Settings</button>
      </div>
      
      {isPending && <div className="loading-indicator">Loading...</div>}
      
      <div className="tab-content" style={{ opacity: isPending ? 0.5 : 1 }}>
        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'profile' && <ProfileTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </div>
    </div>
  );
}

Example 2: Search with autocomplete

function SearchBox() {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isPending, startTransition] = useTransition();
  
  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value); // Immediate update
    
    startTransition(() => {
      // Expensive suggestion generation
      const newSuggestions = generateSuggestions(value, hugeDatabase);
      setSuggestions(newSuggestions);
    });
  };
  
  return (
    <div>
      <input
        value={input}
        onChange={handleChange}
        placeholder="Search..."
      />
      
      {isPending && <Spinner />}
      
      <ul>
        {suggestions.map(s => (
          <li key={s.id}>{s.text}</li>
        ))}
      </ul>
    </div>
  );
}

Example 3: Filtering large data sets

function ProductList({ products }) {
  const [filterText, setFilterText] = useState('');
  const [category, setCategory] = useState('all');
  const [isPending, startTransition] = useTransition();
  
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesText = p.name.toLowerCase().includes(filterText.toLowerCase());
      const matchesCategory = category === 'all' || p.category === category;
      return matchesText && matchesCategory;
    });
  }, [products, filterText, category]);
  
  const handleFilterChange = (e) => {
    setFilterText(e.target.value); // Immediate
  };
  
  const handleCategoryChange = (newCategory) => {
    startTransition(() => {
      setCategory(newCategory); // Can be interrupted
    });
  };
  
  return (
    <div>
      <input
        value={filterText}
        onChange={handleFilterChange}
        placeholder="Filter products..."
      />
      
      <div className="categories">
        <button onClick={() => handleCategoryChange('all')}>All</button>
        <button onClick={() => handleCategoryChange('electronics')}>Electronics</button>
        <button onClick={() => handleCategoryChange('clothing')}>Clothing</button>
      </div>
      
      {isPending && <div>Updating...</div>}
      
      <div style={{ opacity: isPending ? 0.7 : 1 }}>
        {filteredProducts.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

Example 4: Pagination with smooth transitions

function DataTable({ data }) {
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();
  
  const pageData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  }, [data, page]);
  
  const goToPage = (newPage) => {
    startTransition(() => {
      setPage(newPage);
    });
  };
  
  return (
    <div>
      <table style={{ opacity: isPending ? 0.5 : 1 }}>
        {pageData.map(row => (
          <tr key={row.id}>
            <td>{row.name}</td>
            <td>{row.value}</td>
          </tr>
        ))}
      </table>
      
      <div className="pagination">
        <button onClick={() => goToPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => goToPage(page + 1)}>
          Next
        </button>
      </div>
      
      {isPending && <LoadingBar />}
    </div>
  );
}

Concurrent features in React 18:
---------------------------------

useTransition is part of React's concurrent rendering features:

1. useTransition:
   - Manual control over transitions
   - Returns isPending state
   - Wrap updates you want to mark as transitions

2. useDeferredValue (covered next):
   - Automatic transitions for values
   - Returns deferred version of value
   - Simpler API for common cases

3. Suspense:
   - Show fallback while components load
   - Works with transitions

4. Concurrent rendering:
   - React can pause, resume, or abandon rendering work
   - Keeps UI responsive
   - Automatic in React 18 (opt-in for specific features)

When to use useTransition:
---------------------------

✅ Large list filtering/sorting
✅ Search autocomplete with many results
✅ Tab switching with heavy content
✅ Route transitions in routers
✅ Any UI update that takes >100ms to render
✅ When you need isPending state to show loading indicators

When NOT to use useTransition:
-------------------------------

❌ Simple, fast updates (overhead not worth it)
❌ Critical updates that must happen immediately
❌ Server data fetching (use Suspense instead)
❌ Form submissions (should be immediate)

useTransition vs debouncing:
----------------------------

Debouncing:
- Delays execution until user stops typing
- User sees stale data during delay
- Simple but can feel sluggish

const debouncedSearch = debounce(search, 500);
// User types → waits 500ms → sees results

useTransition:
- Starts work immediately
- Can interrupt if user keeps typing
- Shows loading state while working
- Feels more responsive

startTransition(() => search(query));
// User types → work starts immediately → can be interrupted → stays responsive

You can combine both for best results:

const handleChange = (e) => {
  const value = e.target.value;
  setInput(value); // Immediate
  
  debouncedTransition(() => {
    startTransition(() => {
      search(value); // Debounced + transition
    });
  }, 300);
};

Performance considerations:
---------------------------

useTransition has a small overhead:
- Only use for genuinely expensive updates
- For simple updates, regular setState is faster

Benchmark before using:

console.time('render');
// expensive operation
console.timeEnd('render');
// If > 100ms, consider useTransition

Combining with Suspense:
-------------------------

function App() {
  const [tab, setTab] = useState('home');
  const [isPending, startTransition] = useTransition();
  
  const switchTab = (newTab) => {
    startTransition(() => {
      setTab(newTab);
    });
  };
  
  return (
    <div>
      <TabButtons activeTab={tab} onSwitch={switchTab} />
      
      <Suspense fallback={<Spinner />}>
        <div style={{ opacity: isPending ? 0.7 : 1 }}>
          {tab === 'home' && <HomeTab />}
          {tab === 'profile' && <ProfileTab />}
        </div>
      </Suspense>
    </div>
  );
}

The transition will:
- Keep old content visible with reduced opacity (isPending)
- Load new content in background
- Show Suspense fallback if needed

Common patterns:
----------------

Pattern 1: Show stale content with loading indicator

const [isPending, startTransition] = useTransition();

return (
  <>
    {isPending && <LoadingBar />}
    <div style={{ opacity: isPending ? 0.6 : 1 }}>
      <Content />
    </div>
  </>
);

Pattern 2: Disable interactions during transition

<button
  onClick={() => startTransition(() => action())}
  disabled={isPending}
>
  {isPending ? 'Loading...' : 'Click me'}
</button>

Pattern 3: Multiple transitions

const [isPending1, startTransition1] = useTransition();
const [isPending2, startTransition2] = useTransition();

// Different transitions for different concerns
startTransition1(() => updateList());
startTransition2(() => updateChart());

Summary:

useTransition:
- Marks state updates as low-priority transitions
- Keeps UI responsive during expensive rendering
- Returns isPending boolean for loading states
- Can be interrupted by urgent updates
- Part of React 18 concurrent features
- Use for heavy computations, large list filtering, tab switching
- Combine with Suspense for data fetching
*/


/**
33. What is useDeferredValue?
-----------------------------

useDeferredValue is a React 18+ hook that lets you defer updating a value, keeping the 
UI responsive during expensive computations. It's simpler than useTransition for common 
cases where you just want to delay re-rendering with a specific value.

Syntax:

const deferredValue = useDeferredValue(value);

- value: the value you want to defer
- deferredValue: potentially "stale" version of value that lags behind

How it works:
-------------

1. On initial render, deferredValue === value
2. When value changes:
   - React re-renders immediately with old deferredValue (keeps UI responsive)
   - React schedules background update with new value
   - When background update completes, deferredValue updates
3. If value changes again during background update, React abandons old work and starts new update

Basic example:
--------------

WITHOUT useDeferredValue (blocking):

function SearchResults({ query }) {
  // Expensive filtering on every keystroke
  const results = useMemo(() => {
    return hugeList.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);
  
  return <ResultsList results={results} />;
}

function App() {
  const [query, setQuery] = useState('');
  
  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {/* Input lags while filtering * /}
      <SearchResults query={query} />
    </div>
  );
}

WITH useDeferredValue (non-blocking):

function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  
  // Expensive filtering uses deferred value
  const results = useMemo(() => {
    return hugeList.filter(item =>
      item.name.toLowerCase().includes(deferredQuery.toLowerCase())
    );
  }, [deferredQuery]);
  
  return <ResultsList results={results} />;
}

function App() {
  const [query, setQuery] = useState('');
  
  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {/* Input stays responsive! * /}
      <SearchResults query={query} />
    </div>
  );
}

Now:
- User types → query updates immediately → input stays responsive
- deferredQuery lags behind, updates in background
- Results update smoothly without blocking input

Real-world examples:
--------------------

Example 1: Search with large dataset

function ProductSearch() {
  const [searchText, setSearchText] = useState('');
  const deferredSearchText = useDeferredValue(searchText);
  
  const filteredProducts = useMemo(() => {
    if (!deferredSearchText) return allProducts;
    
    return allProducts.filter(product =>
      product.name.toLowerCase().includes(deferredSearchText.toLowerCase()) ||
      product.description.toLowerCase().includes(deferredSearchText.toLowerCase())
    );
  }, [deferredSearchText]);
  
  // Show if we're behind
  const isStale = searchText !== deferredSearchText;
  
  return (
    <div>
      <input
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        placeholder="Search products..."
      />
      
      {isStale && <div className="searching">Searching...</div>}
      
      <div style={{ opacity: isStale ? 0.5 : 1 }}>
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
}

Example 2: Live preview with expensive rendering

function MarkdownEditor() {
  const [markdown, setMarkdown] = useState('');
  const deferredMarkdown = useDeferredValue(markdown);
  
  // Expensive markdown parsing and rendering
  const html = useMemo(() => {
    return parseMarkdown(deferredMarkdown);
  }, [deferredMarkdown]);
  
  const isUpdating = markdown !== deferredMarkdown;
  
  return (
    <div className="editor-layout">
      <textarea
        value={markdown}
        onChange={e => setMarkdown(e.target.value)}
        placeholder="Write markdown..."
      />
      
      <div className="preview">
        {isUpdating && <div className="updating-badge">Updating...</div>}
        <div
          style={{ opacity: isUpdating ? 0.7 : 1 }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}

Example 3: Filtering with multiple criteria

function DataTable({ data }) {
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    priceRange: [0, 1000]
  });
  
  const deferredFilters = useDeferredValue(filters);
  
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(deferredFilters.search.toLowerCase());
      
      const matchesCategory =
        deferredFilters.category === 'all' ||
        item.category === deferredFilters.category;
      
      const matchesPrice =
        item.price >= deferredFilters.priceRange[0] &&
        item.price <= deferredFilters.priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [data, deferredFilters]);
  
  const isFiltering = filters !== deferredFilters;
  
  return (
    <div>
      <div className="filters">
        <input
          value={filters.search}
          onChange={e => setFilters({ ...filters, search: e.target.value })}
        />
        
        <select
          value={filters.category}
          onChange={e => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>
      </div>
      
      {isFiltering && <ProgressBar />}
      
      <div style={{ opacity: isFiltering ? 0.6 : 1 }}>
        <Table data={filteredData} />
      </div>
    </div>
  );
}

Example 4: Chart rendering with live updates

function LiveChart({ dataStream }) {
  const [data, setData] = useState([]);
  const deferredData = useDeferredValue(data);
  
  useEffect(() => {
    const subscription = dataStream.subscribe(newPoint => {
      setData(prevData => [...prevData, newPoint]);
    });
    
    return () => subscription.unsubscribe();
  }, [dataStream]);
  
  // Expensive chart rendering
  const chartComponent = useMemo(() => {
    return <ExpensiveChart data={deferredData} />;
  }, [deferredData]);
  
  return (
    <div>
      <h3>Live Data Chart</h3>
      {chartComponent}
    </div>
  );
}

useDeferredValue vs useTransition:
-----------------------------------

useDeferredValue:
- Simpler API
- You defer a VALUE
- React decides when to update
- Good when you receive a value from props or parent state

const deferredValue = useDeferredValue(value);

useTransition:
- More control
- You defer STATE UPDATES
- You control what updates are deferred
- Returns isPending state
- Good when you own the state update

const [isPending, startTransition] = useTransition();
startTransition(() => {
  setState(newValue);
});

Choosing between them:

Use useDeferredValue when:
✅ You receive props and want to defer their use
✅ Simpler case: just want a value to lag behind
✅ Don't need granular control over pending state

function Child({ value }) {
  const deferredValue = useDeferredValue(value);
  // Use deferredValue for expensive computation
}

Use useTransition when:
✅ You own the state update
✅ Need isPending for loading indicators
✅ Want to wrap specific updates as transitions

function Parent() {
  const [value, setValue] = useState('');
  const [isPending, startTransition] = useTransition();
  
  const handleChange = (newValue) => {
    setValue(newValue); // Immediate
    startTransition(() => {
      setExpensiveValue(newValue); // Deferred
    });
  };
}

Converting between them:
-------------------------

useDeferredValue equivalent with useTransition:

// Using useDeferredValue
const deferredQuery = useDeferredValue(query);

// Roughly equivalent with useTransition
const [deferredQuery, setDeferredQuery] = useState(query);
const [isPending, startTransition] = useTransition();

useEffect(() => {
  startTransition(() => {
    setDeferredQuery(query);
  });
}, [query]);

Detecting stale values:
------------------------

Check if deferred value is behind:

function Component({ value }) {
  const deferredValue = useDeferredValue(value);
  const isStale = value !== deferredValue;
  
  return (
    <div>
      {isStale && <LoadingSpinner />}
      <div style={{ opacity: isStale ? 0.5 : 1 }}>
        <ExpensiveComponent value={deferredValue} />
      </div>
    </div>
  );
}

Performance optimization:
--------------------------

Combine with memo to skip rendering when deferred value hasn't changed:

const SlowList = memo(function SlowList({ items }) {
  // Expensive rendering
  return items.map(item => <SlowItem key={item.id} item={item} />);
});

function App() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);
  
  const filteredItems = useMemo(() => {
    return items.filter(item => item.text.includes(deferredText));
  }, [deferredText]);
  
  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      {/* SlowList only re-renders when deferredText changes * /}
      <SlowList items={filteredItems} />
    </div>
  );
}

Common patterns:
----------------

Pattern 1: Search with debounce-like behavior

function Search() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  
  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <SearchResults query={deferredQuery} />
    </>
  );
}

Pattern 2: Show loading state during updates

function FilteredList({ filter }) {
  const deferredFilter = useDeferredValue(filter);
  const isStale = filter !== deferredFilter;
  
  return (
    <>
      {isStale ? <Skeleton /> : <List filter={deferredFilter} />}
    </>
  );
}

Pattern 3: Progressive enhancement

function DataVisualization({ data }) {
  const deferredData = useDeferredValue(data);
  
  // Show simple version while complex version loads
  const isStale = data !== deferredData;
  
  return isStale ? (
    <SimpleChart data={data} />
  ) : (
    <ComplexChart data={deferredData} />
  );
}

When NOT to use useDeferredValue:
----------------------------------

❌ For async operations (use Suspense instead)
❌ For simple, fast updates (unnecessary overhead)
❌ When you need precise control (use useTransition)
❌ For network requests (different pattern needed)

When TO use useDeferredValue:
------------------------------

✅ Large list filtering/searching
✅ Expensive computations based on input
✅ Live previews (markdown, code editors)
✅ Charts and visualizations with frequent updates
✅ Any rendering that takes >100ms

Combining with other hooks:
----------------------------

With useMemo:

const deferredQuery = useDeferredValue(query);

const results = useMemo(() => {
  return expensiveFilter(data, deferredQuery);
}, [data, deferredQuery]);

With useTransition:

const [query, setQuery] = useState('');
const [isPending, startTransition] = useTransition();
const deferredQuery = useDeferredValue(query);

const handleChange = (value) => {
  setQuery(value);
  startTransition(() => {
    // Additional expensive update
  });
};

With Suspense:

<Suspense fallback={<Loading />}>
  <DeferredComponent value={useDeferredValue(value)} />
</Suspense>

Summary:

useDeferredValue:
- Defers updating a value to keep UI responsive
- Simpler than useTransition for common cases
- Returns potentially stale version of value
- React updates it in background
- Can be interrupted if value changes again
- Perfect for search, filters, live previews
- Combine with useMemo for expensive computations
- Check value !== deferredValue to detect stale state
- Part of React 18 concurrent features
*/
