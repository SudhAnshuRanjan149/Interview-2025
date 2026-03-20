/**
useState Hook - Comprehensive Notes
====================================

useState is a hook that adds state to function components. It returns the current state 
value and a function to update it.

SYNTAX
------
const [state, setState] = useState(initialValue)

PARAMETERS
----------
- initialValue: The initial value of the state (can be any type)
              Can also be a function that returns the initial value (lazy initialization)

RETURNS
-------
Returns an array with exactly 2 elements:
[0] state: The current state value
[1] setState: Function to update the state

FEATURES
--------
1. State can be any type: string, number, boolean, object, array, function, etc.

2. Supports multiple state variables:
   const [name, setName] = useState('');
   const [age, setAge] = useState(0);
   const [isActive, setIsActive] = useState(false);

3. Updates are asynchronous and may be batched:
   - setState doesn't immediately update the value
   - Component re-renders with new state
   - Old value persists in current execution context

4. Functional updates (when new state depends on old state):
   setCount(prev => prev + 1)
   - React passes the latest state value
   - Used when batching multiple updates
   - Prevents stale closure issues

5. Lazy initialization (for expensive computations):
   const [data, setData] = useState(() => expensiveCalculation())
   - Function only runs once on first render
   - Improves performance

6. Bailing out of updates:
   - If you set state to the same value (Object.is), React may skip re-render
   - React optimizes by comparing new and old values

HOW STATE UPDATING WORKS
------------------------

1. Closure Binding:
   - setState call captures current value in closure
   - State changes trigger re-render
   - New render has new value in its closure

2. Batching:
   - React batches multiple setState calls in event handlers
   - All updates use the state value from render's closure
   - Updates happen after event handler completes

3. Functional Updates (solution to batching issues):
   - Pass function to setState instead of value
   - React calls function with latest state
   - Each call receives updated state from previous call

IMMUTABILITY REQUIREMENT
------------------------

State must NEVER be mutated directly. Always create new objects/arrays.

BAD ❌
------
const [items, setItems] = useState([]);

const addItem = () => {
  items.push({ id: 1, name: 'New' }); // Mutation!
  setItems(items); // React may not detect change
}

GOOD ✅
-------
const addItem = () => {
  setItems([...items, { id: 1, name: 'New' }]); // New array
}

For objects:
const [user, setUser] = useState({ name: '', email: '' });

setUser({ ...user, name: 'John' }); // Spread old, override name

COMPARISON WITH CLASS COMPONENT STATE
--------------------------------------

Class Component:
  this.state = { count: 0 };
  this.setState({ count: this.state.count + 1 });

Function Component with Hook:
  const [count, setCount] = useState(0);
  setCount(count + 1);

Benefits of hooks:
- No `this` binding required
- Simpler syntax
- Multiple independent state variables
- Better code organization
- Easier to share logic between components

COMMON PATTERNS
---------------

1. Toggle boolean:
   const [isOpen, setIsOpen] = useState(false);
   setIsOpen(prev => !prev);

2. Increment/Decrement counter:
   const [count, setCount] = useState(0);
   setCount(prev => prev + 1);

3. Controlled form input:
   const [email, setEmail] = useState('');
   <input value={email} onChange={e => setEmail(e.target.value)} />

4. Update object property:
   const [user, setUser] = useState({ name: '', age: 0 });
   setUser({ ...user, name: 'John' });

5. Add item to array:
   const [items, setItems] = useState([]);
   setItems([...items, newItem]);

6. Remove item from array:
   setItems(items.filter(item => item.id !== idToRemove));

7. Update item in array:
   setItems(items.map(item =>
     item.id === idToUpdate ? { ...item, ...updates } : item
   ));

PERFORMANCE CONSIDERATIONS
--------------------------

1. Each useState call creates a re-render when value changes
2. Use multiple useState calls for independent state updates
3. Consider useReducer for many related state changes
4. Use React.memo or useMemo to prevent unnecessary child re-renders

DEBUGGING
---------

1. State updates are asynchronous:
   setCount(5);
   console.log(count); // Still old value!

2. Use useEffect to react to state changes:
   useEffect(() => {
     console.log('Count changed:', count);
   }, [count]);

3. React DevTools shows component state in real-time

VERSION HISTORY
---------------

- React 16.8: Introduced useState
- React 18: Added automatic batching for all updates (not just event handlers)
- No breaking changes in subsequent versions

GOTCHAS
-------

1. Order matters: Always call hooks in same order every render
2. Don't call hooks conditionally
3. Object/array references matter for dependencies
4. New function objects created on each render if not memoized
5. Async functions require error handling

BEST PRACTICES
--------------

1. Use descriptive names for setState functions: setEmail, setIsLoading, etc.
2. Keep state close to where it's used
3. Lift state up only when multiple components need it
4. Consider extracting to custom hook if logic is reusable
5. Use functional updates when new state depends on old
6. Always create new objects/arrays, never mutate
7. Use TypeScript for better type safety
8. Include state in useEffect dependency array when used
*/

export const UseStateNotes = () => (
  <div style={{ padding: '20px', fontFamily: 'monospace', lineHeight: '1.6' }}>
    <h2>useState - Complete Documentation</h2>
    <pre style={{ background: '#f5f5f5', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
      {`const [state, setState] = useState(initialValue)

Adds state to function components
- Returns: [currentValue, updateFunction]
- Updates are asynchronous and may be batched
- Use functional updates for state depending on previous value
- Always replace state (never mutate)
- Can initialize with function for expensive computations`}
    </pre>
  </div>
);

export default UseStateNotes;
