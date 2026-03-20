/*

========================================================
SECTION 8 — PERFORMANCE OPTIMIZATION
========================================================
64. What causes unnecessary re-renders in React?  
65. What is React.memo and when should you use it?  
66. What is memoization in React and how does it work?  
67. What is virtualization and how does react-window or react-virtualized work?  
68. What is the difference between useMemo and useCallback?  
69. How does React batching work?  
70. What is concurrency in React 18?  
71. What is Suspense and how does it help with async rendering?  

*/




/**
64. What causes unnecessary re-renders in React?
-----------------------------------------------

A re-render occurs when React needs to update the DOM based on state or props changes.
Unnecessary re-renders happen when a component re-renders but produces the same output,
wasting computation and potentially causing performance issues.

Common Causes of Unnecessary Re-renders:
----------------------------------------

1. Parent Component Re-renders
-------------------------------

// When parent re-renders, ALL children re-render by default
function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      
      {/* Child re-renders even though it doesn't use count * /}
      <ExpensiveChild />
    </div>
  );
}

function ExpensiveChild() {
  console.log('ExpensiveChild rendered'); // Logs on every parent render
  
  return <div>I'm expensive to render!</div>;
}

// Solution: Use React.memo
const ExpensiveChild = React.memo(function ExpensiveChild() {
  console.log('ExpensiveChild rendered'); // Only logs once
  return <div>I'm expensive to render!</div>;
});

2. Creating New Objects/Arrays in Render
-----------------------------------------

function Parent() {
  const [count, setCount] = useState(0);
  
  // ❌ Bad: New object created on every render
  const user = { name: 'John', age: 30 };
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child user={user} /> {/* Child always re-renders * /}
    </div>
  );
}

const Child = React.memo(function Child({ user }) {
  console.log('Child rendered'); // Logs every time
  return <div>{user.name}</div>;
});

// Why? user object is recreated on every render (different reference)
// React.memo compares references: {} !== {}

// ✅ Solution: Use useMemo
function Parent() {
  const [count, setCount] = useState(0);
  
  const user = useMemo(() => ({ name: 'John', age: 30 }), []);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child user={user} /> {/* Child only renders once * /}
    </div>
  );
}

3. Inline Functions as Props
-----------------------------

function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      
      {/* ❌ Bad: New function created on every render * /}
      <Child onClick={() => console.log('clicked')} />
    </div>
  );
}

const Child = React.memo(function Child({ onClick }) {
  console.log('Child rendered'); // Logs every time
  return <button onClick={onClick}>Click me</button>;
});

// ✅ Solution: Use useCallback
function Parent() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child onClick={handleClick} /> {/* Child only renders once * /}
    </div>
  );
}

4. Inline Styles and Objects
-----------------------------

function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      
      {/* ❌ Bad: New style object on every render * /}
      <Child style={{ color: 'red', fontSize: '16px' }} />
    </div>
  );
}

// ✅ Solution: Define outside or use useMemo
const childStyle = { color: 'red', fontSize: '16px' };

function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child style={childStyle} />
    </div>
  );
}

5. Context Changes
------------------

const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ name: 'John' });
  
  // Every time user changes, ALL consumers re-render
  return (
    <UserContext.Provider value={user}>
      <Header />      {/* Re-renders if uses context * /}
      <Sidebar />     {/* Re-renders if uses context * /}
      <Content />     {/* Re-renders if uses context * /}
      <Footer />      {/* Re-renders if uses context * /}
    </UserContext.Provider>
  );
}

// ✅ Solution: Split contexts or memoize value
function App() {
  const [user, setUser] = useState({ name: 'John' });
  
  // Memoize context value
  const value = useMemo(() => ({ user, setUser }), [user]);
  
  return (
    <UserContext.Provider value={value}>
      {/* ... * /}
    </UserContext.Provider>
  );
}

6. Using Index as Key
---------------------

function TodoList({ todos }) {
  return (
    <ul>
      {/* ❌ Bad: Using index as key * /}
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} />
      ))}
    </ul>
  );
}

// When you add/remove items, indices change, causing unnecessary re-renders

// ✅ Solution: Use stable unique IDs
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

7. State in Wrong Component
----------------------------

// ❌ Bad: State at top level affects all siblings
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div>
      <HeavyComponent1 />  {/* Re-renders when modal state changes * /}
      <HeavyComponent2 />  {/* Re-renders when modal state changes * /}
      <HeavyComponent3 />  {/* Re-renders when modal state changes * /}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

// ✅ Solution: Move state closer to where it's used
function App() {
  return (
    <div>
      <HeavyComponent1 />
      <HeavyComponent2 />
      <HeavyComponent3 />
      <ModalManager />  {/* State contained here * /}
    </div>
  );
}

function ModalManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

8. Passing Entire Objects When Only Part is Needed
---------------------------------------------------

// ❌ Bad: Passing entire user object
function Parent() {
  const [user, setUser] = useState({ name: 'John', age: 30, email: 'john@example.com' });
  
  return <Child user={user} />;
}

const Child = React.memo(function Child({ user }) {
  return <div>{user.name}</div>; {/* Only uses name * /}
});

// Child re-renders when any part of user changes

// ✅ Solution: Pass only what's needed
function Parent() {
  const [user, setUser] = useState({ name: 'John', age: 30, email: 'john@example.com' });
  
  return <Child name={user.name} />;
}

const Child = React.memo(function Child({ name }) {
  return <div>{name}</div>;
});

// Now child only re-renders when name changes

9. Anonymous JSX Components
----------------------------

function Parent() {
  const [count, setCount] = useState(0);
  
  // ❌ Bad: Component defined inside render
  const ChildComponent = () => <div>Child</div>;
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ChildComponent /> {/* New component every render! * /}
    </div>
  );
}

// ✅ Solution: Define component outside
const ChildComponent = () => <div>Child</div>;

function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ChildComponent />
    </div>
  );
}

10. Props Spreading with Extra Props
-------------------------------------

function Parent() {
  const [count, setCount] = useState(0);
  
  const props = {
    name: 'John',
    age: 30,
    onClick: () => console.log('clicked') // New function every render!
  };
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child {...props} />
    </div>
  );
}

// ✅ Solution: Memoize props object or individual props
function Parent() {
  const [count, setCount] = useState(0);
  
  const onClick = useCallback(() => console.log('clicked'), []);
  
  const props = useMemo(() => ({
    name: 'John',
    age: 30,
    onClick
  }), [onClick]);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child {...props} />
    </div>
  );
}

Detecting Unnecessary Re-renders:
----------------------------------

// Method 1: Console logs
function MyComponent({ name }) {
  console.log('MyComponent rendered');
  return <div>{name}</div>;
}

// Method 2: React DevTools Profiler
// 1. Open React DevTools
// 2. Go to Profiler tab
// 3. Start recording
// 4. Interact with app
// 5. Stop recording
// 6. See which components rendered and why

// Method 3: why-did-you-render library
import whyDidYouRender from '@welldone-software/why-did-you-render';

whyDidYouRender(React, {
  trackAllPureComponents: true,
});

function MyComponent({ name }) {
  return <div>{name}</div>;
}
MyComponent.whyDidYouRender = true;

// Method 4: Custom hook
function useWhyDidYouUpdate(name, props) {
  const previousProps = useRef();
  
  useEffect(() => {
    if (previousProps.current) {
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      const changedProps = {};
      
      allKeys.forEach(key => {
        if (previousProps.current[key] !== props[key]) {
          changedProps[key] = {
            from: previousProps.current[key],
            to: props[key]
          };
        }
      });
      
      if (Object.keys(changedProps).length > 0) {
        console.log('[why-did-you-update]', name, changedProps);
      }
    }
    
    previousProps.current = props;
  });
}

// Usage
function MyComponent(props) {
  useWhyDidYouUpdate('MyComponent', props);
  return <div>{props.name}</div>;
}

Summary of Solutions:
---------------------

1. Use React.memo for pure components
2. Use useMemo for expensive calculations and object props
3. Use useCallback for function props
4. Move state closer to where it's used
5. Split contexts when they change frequently
6. Use stable keys (not indices)
7. Define objects/arrays/functions outside render
8. Pass only needed props to children
9. Define components outside render
10. Use React DevTools Profiler to identify issues

Best Practices:
---------------

✅ DO:
- Use React.memo for expensive pure components
- Use useMemo/useCallback when passing to memoized children
- Keep state as local as possible
- Use stable keys
- Profile before optimizing

❌ DON'T:
- Optimize prematurely
- Memo everything (adds overhead)
- Worry about cheap re-renders
- Use index as key for dynamic lists
- Create functions/objects in render
*/


/**
65. What is React.memo and when should you use it?
--------------------------------------------------

React.memo is a higher-order component that memoizes a component, preventing
re-renders when props haven't changed. It does a shallow comparison of props.

Purpose:
- Prevent unnecessary re-renders
- Optimize performance for expensive components
- Memoize pure components

Basic Usage:
------------

// Without React.memo
function ExpensiveComponent({ name, age }) {
  console.log('ExpensiveComponent rendered');
  
  // Expensive computation
  const result = expensiveCalculation(age);
  
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Result: {result}</p>
    </div>
  );
}

// Parent
function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveComponent name={name} age={30} />
      {/* Re-renders on every count change! * /}
    </div>
  );
}

// With React.memo
const ExpensiveComponent = React.memo(function ExpensiveComponent({ name, age }) {
  console.log('ExpensiveComponent rendered');
  
  const result = expensiveCalculation(age);
  
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Result: {result}</p>
    </div>
  );
});

// Now only re-renders when name or age changes

Alternative Syntax:
-------------------

// Method 1: Wrap function component
const MemoizedComponent = React.memo(MyComponent);

// Method 2: Wrap inline
export default React.memo(function MyComponent(props) {
  return <div>{props.name}</div>;
});

// Method 3: With named function
function MyComponent(props) {
  return <div>{props.name}</div>;
}

export default React.memo(MyComponent);

Custom Comparison Function:
----------------------------

// By default, React.memo does shallow comparison
// You can provide custom comparison for deep comparison

const MyComponent = React.memo(
  function MyComponent({ user, settings }) {
    return (
      <div>
        <p>{user.name}</p>
        <p>{settings.theme}</p>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    // Return false if props are different (re-render)
    
    return (
      prevProps.user.name === nextProps.user.name &&
      prevProps.settings.theme === nextProps.settings.theme
    );
  }
);

// Custom comparison examples:

// Compare by ID only
const UserCard = React.memo(
  UserCardComponent,
  (prev, next) => prev.user.id === next.user.id
);

// Deep comparison (use with caution - expensive!)
const ComplexComponent = React.memo(
  ComplexComponentComponent,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
);

// Ignore certain props
const PartialCompareComponent = React.memo(
  Component,
  (prev, next) => {
    // Only compare these props, ignore others
    return (
      prev.id === next.id &&
      prev.name === next.name
      // Ignore prev.timestamp !== next.timestamp
    );
  }
);

When to Use React.memo:
-----------------------

✅ Use React.memo when:

1. Component renders often with same props
   
function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      {/* Always receives same props but parent re-renders frequently * /}
      <ExpensiveList items={staticItems} />
    </div>
  );
}

const ExpensiveList = React.memo(function ExpensiveList({ items }) {
  return items.map(item => <ExpensiveItem key={item.id} item={item} />);
});

2. Component is expensive to render

const HeavyChart = React.memo(function HeavyChart({ data }) {
  // Complex D3.js visualization
  // Heavy calculations
  // Many DOM elements
  
  return <svg>{/* ... * /}</svg>;
});

3. Component is pure (same props = same output)

const PureComponent = React.memo(function PureComponent({ name, age }) {
  // No side effects
  // No random values
  // No Date.now()
  // No Math.random()
  
  return <div>{name} is {age} years old</div>;
});

4. Component is in a list

const TodoItem = React.memo(function TodoItem({ todo, onToggle }) {
  return (
    <li onClick={() => onToggle(todo.id)}>
      {todo.text}
    </li>
  );
});

function TodoList({ todos, onToggle }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
}

When NOT to Use React.memo:
---------------------------

❌ Don't use React.memo when:

1. Props change frequently

function Parent() {
  const [time, setTime] = useState(Date.now());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  // ❌ Bad: Props change every second, memo adds overhead
  return <MemoizedClock time={time} />;
}

2. Component is already fast to render

// ❌ Bad: Unnecessary memo for simple component
const SimpleText = React.memo(function SimpleText({ text }) {
  return <p>{text}</p>;
});

// Simple components are fast, memo adds overhead

3. Props include functions/objects not memoized

function Parent() {
  const [count, setCount] = useState(0);
  
  // ❌ Bad: New function every render, memo useless
  return (
    <MemoizedChild
      onClick={() => console.log('clicked')}
      data={{ count }}
    />
  );
}

// Memo won't help because props always change (new references)

4. Component always needs to re-render anyway

// ❌ Bad: Component uses context that changes frequently
const MemoizedComponent = React.memo(function Component({ name }) {
  const value = useContext(FrequentlyChangingContext);
  return <div>{name} - {value}</div>;
});

// Context changes trigger re-render regardless of memo

React.memo with Hooks:
----------------------

// Correct usage with useCallback and useMemo

function Parent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  
  // ✅ Memoize callback
  const handleClick = useCallback((id) => {
    console.log('Clicked:', id);
  }, []);
  
  // ✅ Memoize object/array
  const config = useMemo(() => ({
    theme: 'dark',
    fontSize: 16
  }), []);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      
      {/* Child only re-renders when items change * /}
      <MemoizedList items={items} onClick={handleClick} config={config} />
    </div>
  );
}

const MemoizedList = React.memo(function List({ items, onClick, config }) {
  return items.map(item => (
    <div key={item.id} onClick={() => onClick(item.id)}>
      {item.name}
    </div>
  ));
});

Common Pitfalls:
----------------

// Pitfall 1: Inline object prop
const MemoChild = React.memo(Child);

function Parent() {
  return (
    <div>
      {/* ❌ New object every render, memo useless * /}
      <MemoChild config={{ theme: 'dark' }} />
    </div>
  );
}

// Fix:
const config = { theme: 'dark' };

function Parent() {
  return <MemoChild config={config} />;
}

// Pitfall 2: Inline function prop
function Parent() {
  return (
    <div>
      {/* ❌ New function every render, memo useless * /}
      <MemoChild onClick={() => console.log('click')} />
    </div>
  );
}

// Fix:
function Parent() {
  const handleClick = useCallback(() => console.log('click'), []);
  return <MemoChild onClick={handleClick} />;
}

// Pitfall 3: Children prop
function Parent() {
  return (
    <MemoChild>
      {/* ❌ Children are new every render * /}
      <div>Content</div>
    </MemoChild>
  );
}

// Fix: Extract children to separate memoized component
const Content = React.memo(function Content() {
  return <div>Content</div>;
});

function Parent() {
  return (
    <MemoChild>
      <Content />
    </MemoChild>
  );
}

Real-World Example:
-------------------

// Product card in a list
const ProductCard = React.memo(
  function ProductCard({ product, onAddToCart }) {
    console.log('ProductCard rendered:', product.id);
    
    return (
      <div className="product-card">
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>${product.price}</p>
        <button onClick={() => onAddToCart(product.id)}>
          Add to Cart
        </button>
      </div>
    );
  },
  // Custom comparison: only re-render if product data changed
  (prevProps, nextProps) => {
    return (
      prevProps.product.id === nextProps.product.id &&
      prevProps.product.name === nextProps.product.name &&
      prevProps.product.price === nextProps.product.price &&
      prevProps.product.image === nextProps.product.image
    );
  }
);

function ProductList({ products }) {
  const [cart, setCart] = useState([]);
  
  // Memoize callback so ProductCard memo works
  const handleAddToCart = useCallback((productId) => {
    setCart(prev => [...prev, productId]);
  }, []);
  
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}

Measuring Performance:
----------------------

// Use React DevTools Profiler to measure impact

function App() {
  return (
    <Profiler id="ProductList" onRender={onRenderCallback}>
      <ProductList products={products} />
    </Profiler>
  );
}

function onRenderCallback(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) {
  console.log(`${id} (${phase}) took ${actualDuration}ms`);
}

// Compare with and without React.memo

Summary:

React.memo:
- HOC that memoizes components
- Prevents re-renders when props unchanged
- Does shallow comparison by default
- Can provide custom comparison function
- Use for expensive pure components
- Must memoize function/object props too
- Don't overuse (adds overhead)
- Profile to measure impact
- Alternative to PureComponent for function components
*/


/**
66. What is memoization in React and how does it work?
------------------------------------------------------

Memoization is an optimization technique that caches the result of expensive
function calls and returns the cached result when the same inputs occur again.

In React, memoization prevents:
- Unnecessary re-renders (React.memo)
- Expensive recalculations (useMemo)
- Function recreations (useCallback)

React Memoization Tools:
------------------------

1. React.memo - Memoize components
2. useMemo - Memoize values/calculations
3. useCallback - Memoize functions

How Memoization Works:
----------------------

// Concept: Cache results based on inputs

// Without memoization
function expensiveCalculation(num) {
  console.log('Calculating...');
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += num;
  }
  return result;
}

// Every call recalculates
expensiveCalculation(5); // Calculating... (takes time)
expensiveCalculation(5); // Calculating... (takes time again!)
expensiveCalculation(5); // Calculating... (takes time again!)

// With memoization
const memoizedCalculation = (() => {
  const cache = {};
  
  return (num) => {
    if (cache[num]) {
      console.log('From cache');
      return cache[num];
    }
    
    console.log('Calculating...');
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
      result += num;
    }
    
    cache[num] = result;
    return result;
  };
})();

memoizedCalculation(5); // Calculating... (takes time)
memoizedCalculation(5); // From cache (instant!)
memoizedCalculation(5); // From cache (instant!)

1. useMemo - Memoize Values:
-----------------------------

// Syntax: useMemo(calculateValue, dependencies)

function SearchResults({ query, items }) {
  // Without useMemo - filters on EVERY render
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  
  return <List items={filteredItems} />;
}

// With useMemo - only filters when query or items change
function SearchResults({ query, items }) {
  const filteredItems = useMemo(() => {
    console.log('Filtering...');
    return items.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, items]);
  
  return <List items={filteredItems} />;
}

// useMemo Examples:

// Example 1: Expensive calculation
function ProductList({ products, category }) {
  const filteredProducts = useMemo(() => {
    console.log('Filtering products...');
    return products.filter(p => p.category === category);
  }, [products, category]);
  
  const totalPrice = useMemo(() => {
    console.log('Calculating total...');
    return filteredProducts.reduce((sum, p) => sum + p.price, 0);
  }, [filteredProducts]);
  
  return (
    <div>
      <h2>Total: ${totalPrice}</h2>
      {filteredProducts.map(p => <Product key={p.id} product={p} />)}
    </div>
  );
}

// Example 2: Sorting
function SortedList({ items, sortBy }) {
  const sortedItems = useMemo(() => {
    console.log('Sorting...');
    return [...items].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return a.price - b.price;
      return 0;
    });
  }, [items, sortBy]);
  
  return sortedItems.map(item => <Item key={item.id} item={item} />);
}

// Example 3: Object for React.memo
function Parent() {
  const [count, setCount] = useState(0);
  
  // Without useMemo: new object every render
  const config = { theme: 'dark', fontSize: 16 };
  
  // With useMemo: same object reference
  const config = useMemo(() => ({
    theme: 'dark',
    fontSize: 16
  }), []); // Empty deps = created once
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <MemoizedChild config={config} />
    </div>
  );
}

const MemoizedChild = React.memo(function Child({ config }) {
  console.log('Child rendered');
  return <div>{config.theme}</div>;
});

2. useCallback - Memoize Functions:
------------------------------------

// Syntax: useCallback(function, dependencies)

// Without useCallback
function Parent() {
  const [count, setCount] = useState(0);
  
  // New function created every render
  const handleClick = () => {
    console.log('Clicked');
  };
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <MemoizedChild onClick={handleClick} />
    </div>
  );
}

// With useCallback
function Parent() {
  const [count, setCount] = useState(0);
  
  // Same function reference across renders
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // Empty deps = function never changes
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <MemoizedChild onClick={handleClick} />
    </div>
  );
}

// useCallback Examples:

// Example 1: With dependencies
function TodoList({ todos }) {
  const [filter, setFilter] = useState('all');
  
  // Function recreated when filter changes
  const handleToggle = useCallback((id) => {
    console.log('Toggle todo:', id, 'Filter:', filter);
    toggleTodo(id);
  }, [filter]); // Recreate when filter changes
  
  return todos.map(todo => (
    <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} />
  ));
}

// Example 2: Event handlers
function Form() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  
  const handleNameChange = useCallback((e) => {
    setFormData(prev => ({ ...prev, name: e.target.value }));
  }, []); // No deps, uses functional update
  
  const handleEmailChange = useCallback((e) => {
    setFormData(prev => ({ ...prev, email: e.target.value }));
  }, []);
  
  return (
    <form>
      <MemoizedInput value={formData.name} onChange={handleNameChange} />
      <MemoizedInput value={formData.email} onChange={handleEmailChange} />
    </form>
  );
}

// Example 3: Callback with access to state
function Counter() {
  const [count, setCount] = useState(0);
  
  // ❌ Without dependency: stale closure
  const handleIncrement = useCallback(() => {
    setCount(count + 1); // count is always 0!
  }, []); // Missing count dependency
  
  // ✅ With dependency
  const handleIncrement = useCallback(() => {
    setCount(count + 1);
  }, [count]); // Recreate when count changes
  
  // ✅ Better: Functional update (no dependency needed)
  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1);
  }, []); // No dependencies needed!
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}

useMemo vs useCallback:
-----------------------

// useCallback(fn, deps) is equivalent to useMemo(() => fn, deps)

// These are the same:
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

const memoizedCallback = useMemo(() => {
  return () => doSomething(a, b);
}, [a, b]);

// Use useCallback for functions
const handleClick = useCallback(() => {
  console.log('clicked');
}, []);

// Use useMemo for values
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

When to Use Memoization:
-------------------------

✅ Use useMemo when:

1. Expensive calculations
   
const fibonacci = useMemo(() => {
  return calculateFibonacci(n); // Expensive recursive calculation
}, [n]);

2. Filtering/sorting large lists

const filteredList = useMemo(() => {
  return largeList.filter(item => item.category === category);
}, [largeList, category]);

3. Creating objects/arrays for memoized components

const config = useMemo(() => ({ theme, fontSize }), [theme, fontSize]);

✅ Use useCallback when:

1. Passing functions to memoized children

const handleClick = useCallback(() => {
  // handle click
}, []);

<MemoizedChild onClick={handleClick} />

2. Dependencies of other hooks

const fetchData = useCallback(() => {
  return fetch('/api/data');
}, []);

useEffect(() => {
  fetchData();
}, [fetchData]); // fetchData in dependency array

3. Event handlers for optimized components

const handleChange = useCallback((e) => {
  setValue(e.target.value);
}, []);

When NOT to Use Memoization:
-----------------------------

❌ Don't use when:

1. Calculation is cheap

// ❌ Overkill
const doubled = useMemo(() => value * 2, [value]);

// ✅ Just do it
const doubled = value * 2;

2. Dependencies change frequently

// ❌ Useless memoization
const result = useMemo(() => {
  return compute(a, b, c, d, e);
}, [a, b, c, d, e]); // All change frequently

3. Premature optimization

// ❌ Don't memoize everything
const Component = React.memo(function Component() {
  const value1 = useMemo(() => compute1(), []);
  const value2 = useMemo(() => compute2(), []);
  const value3 = useMemo(() => compute3(), []);
  // ... too much!
});

Real-World Example:
-------------------

function DataGrid({ data, sortBy, filterBy }) {
  // 1. Filter data (expensive for large datasets)
  const filteredData = useMemo(() => {
    console.log('Filtering data...');
    return data.filter(item => 
      item.category.includes(filterBy)
    );
  }, [data, filterBy]);
  
  // 2. Sort filtered data
  const sortedData = useMemo(() => {
    console.log('Sorting data...');
    return [...filteredData].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return a.price - b.price;
      return 0;
    });
  }, [filteredData, sortBy]);
  
  // 3. Calculate statistics
  const stats = useMemo(() => {
    console.log('Calculating stats...');
    return {
      total: sortedData.length,
      avgPrice: sortedData.reduce((sum, item) => sum + item.price, 0) / sortedData.length,
      maxPrice: Math.max(...sortedData.map(item => item.price))
    };
  }, [sortedData]);
  
  // 4. Memoized event handlers
  const handleRowClick = useCallback((id) => {
    console.log('Row clicked:', id);
    navigateToDetail(id);
  }, []);
  
  const handleSort = useCallback((column) => {
    setSortBy(column);
  }, []);
  
  return (
    <div>
      <Stats {...stats} />
      <SortControls onSort={handleSort} />
      <Table data={sortedData} onRowClick={handleRowClick} />
    </div>
  );
}

// Memoized child components
const Stats = React.memo(function Stats({ total, avgPrice, maxPrice }) {
  return (
    <div>
      <p>Total: {total}</p>
      <p>Average: ${avgPrice.toFixed(2)}</p>
      <p>Max: ${maxPrice.toFixed(2)}</p>
    </div>
  );
});

const Table = React.memo(function Table({ data, onRowClick }) {
  return (
    <table>
      <tbody>
        {data.map(item => (
          <Row key={item.id} item={item} onClick={onRowClick} />
        ))}
      </tbody>
    </table>
  );
});

const Row = React.memo(function Row({ item, onClick }) {
  return (
    <tr onClick={() => onClick(item.id)}>
      <td>{item.name}</td>
      <td>${item.price}</td>
    </tr>
  );
});

Dependency Array Best Practices:
---------------------------------

// 1. Include all used values
const memoized = useMemo(() => {
  return a + b + c; // Use a, b, c
}, [a, b, c]); // Include a, b, c

// 2. Use ESLint rule
// eslint-plugin-react-hooks warns about missing dependencies

// 3. Empty array = computed once
const constant = useMemo(() => {
  return { theme: 'dark' };
}, []); // Never recomputed

// 4. No dependency array = computed every render
const alwaysNew = useMemo(() => {
  return { theme: 'dark' };
}); // Computed every render (useless!)

Summary:

Memoization in React:
- Cache results to avoid recalculation
- React.memo: Memoize components
- useMemo: Memoize values/calculations
- useCallback: Memoize functions
- Provide dependency array
- Only use for expensive operations
- Profile before optimizing
- Don't overuse (adds overhead)
- Essential for large apps/lists
*/


/**
67. What is virtualization and how does react-window or react-virtualized work?
-------------------------------------------------------------------------------

Virtualization (or windowing) is a technique that renders only the visible portion
of a large list, dramatically improving performance. Instead of rendering 10,000 items,
you render only ~20 visible items.

Problem Without Virtualization:
--------------------------------

function LargeList() {
  const items = Array.from({ length: 10000 }, (_, i) => `Item ${i}`);
  
  return (
    <div style={{ height: '400px', overflow: 'auto' }}>
      {items.map((item, index) => (
        <div key={index} style={{ height: '50px' }}>
          {item}
        </div>
      ))}
    </div>
  );
}

// Problems:
// - Renders 10,000 DOM nodes
// - Initial render: slow
// - Memory usage: high
// - Scrolling: janky
// - Browser struggles with large DOM

Solution: Virtualization
-------------------------

// Only render visible items (~20)
// Total items: 10,000
// Visible items: 20
// DOM nodes: 20 (instead of 10,000!)

react-window:
-------------

Lightweight library (3KB) for virtualizing lists and grids.

Installation:
npm install react-window

Basic FixedSizeList:
--------------------

import { FixedSizeList } from 'react-window';

function VirtualizedList() {
  const items = Array.from({ length: 10000 }, (_, i) => `Item ${i}`);
  
  // Row component
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index]}
    </div>
  );
  
  return (
    <FixedSizeList
      height={400}        // Container height
      itemCount={10000}   // Total number of items
      itemSize={50}       // Height of each item
      width="100%"        // Container width
    >
      {Row}
    </FixedSizeList>
  );
}

// Only renders ~8 items (400px / 50px per item)
// Plus buffer items for smooth scrolling

VariableSizeList:
-----------------

// Items with different heights

import { VariableSizeList } from 'react-window';

function VariableList() {
  const items = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    text: `Item ${i}`,
    height: 50 + Math.random() * 100 // Random height 50-150px
  }));
  
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].text}
    </div>
  );
  
  // Function that returns height for each item
  const getItemSize = (index) => items[index].height;
  
  return (
    <VariableSizeList
      height={400}
      itemCount={items.length}
      itemSize={getItemSize}  // Function
      width="100%"
    >
      {Row}
    </VariableSizeList>
  );
}

FixedSizeGrid:
--------------

// 2D virtualization (rows and columns)

import { FixedSizeGrid } from 'react-window';

function VirtualizedGrid() {
  const Cell = ({ columnIndex, rowIndex, style }) => (
    <div style={style}>
      Cell {rowIndex},{columnIndex}
    </div>
  );
  
  return (
    <FixedSizeGrid
      columnCount={1000}    // Number of columns
      columnWidth={100}     // Width of each column
      height={400}          // Container height
      rowCount={1000}       // Number of rows
      rowHeight={50}        // Height of each row
      width={600}           // Container width
    >
      {Cell}
    </FixedSizeGrid>
  );
}

// Renders only visible cells (not all 1,000,000 cells!)

How It Works:
-------------

// Conceptual implementation

function VirtualList({ items, itemHeight, containerHeight }) {
  const [scrollTop, setScrollTop] = useState(0);
  
  // Calculate visible range
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.ceil((scrollTop + containerHeight) / itemHeight);
  
  // Add buffer for smooth scrolling
  const visibleItems = items.slice(
    Math.max(0, startIndex - 5),
    Math.min(items.length, endIndex + 5)
  );
  
  // Total height of all items
  const totalHeight = items.length * itemHeight;
  
  // Offset for visible items
  const offsetY = Math.max(0, startIndex - 5) * itemHeight;
  
  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      {/* Spacer to maintain scroll height * /}
      <div style={{ height: totalHeight, position: 'relative' }}>
        {/* Render only visible items * /}
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, i) => (
            <div key={startIndex + i} style={{ height: itemHeight }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Real-World Example with Styling:
---------------------------------

import { FixedSizeList } from 'react-window';

function UserList({ users }) {
  const Row = ({ index, style }) => {
    const user = users[index];
    
    return (
      <div
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
          borderBottom: '1px solid #eee'
        }}
      >
        <img
          src={user.avatar}
          alt={user.name}
          style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 10 }}
        />
        <div>
          <div style={{ fontWeight: 'bold' }}>{user.name}</div>
          <div style={{ fontSize: '0.875rem', color: '#666' }}>{user.email}</div>
        </div>
      </div>
    );
  };
  
  return (
    <FixedSizeList
      height={600}
      itemCount={users.length}
      itemSize={70}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}

Infinite Loading:
-----------------

import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

function InfiniteList() {
  const [items, setItems] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  
  const loadMoreItems = async (startIndex, stopIndex) => {
    const newItems = await fetchItems(startIndex, stopIndex);
    setItems(prev => [...prev, ...newItems]);
    
    if (newItems.length === 0) {
      setHasNextPage(false);
    }
  };
  
  const isItemLoaded = (index) => !hasNextPage || index < items.length;
  
  const Row = ({ index, style }) => {
    if (!isItemLoaded(index)) {
      return <div style={style}>Loading...</div>;
    }
    
    return <div style={style}>{items[index]}</div>;
  };
  
  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={hasNextPage ? items.length + 1 : items.length}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <FixedSizeList
          height={400}
          itemCount={hasNextPage ? items.length + 1 : items.length}
          itemSize={50}
          onItemsRendered={onItemsRendered}
          ref={ref}
          width="100%"
        >
          {Row}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  );
}

Scrolling to Item:
------------------

import { useRef } from 'react';
import { FixedSizeList } from 'react-window';

function ScrollableList() {
  const listRef = useRef();
  
  const scrollToItem = (index) => {
    listRef.current.scrollToItem(index, 'center');
  };
  
  const scrollToTop = () => {
    listRef.current.scrollTo(0);
  };
  
  return (
    <div>
      <button onClick={() => scrollToItem(500)}>Go to item 500</button>
      <button onClick={scrollToTop}>Scroll to top</button>
      
      <FixedSizeList
        ref={listRef}
        height={400}
        itemCount={1000}
        itemSize={50}
        width="100%"
      >
        {Row}
      </FixedSizeList>
    </div>
  );
}

Dynamic Content Height:
-----------------------

// For variable content height
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';

function ResponsiveList() {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          height={height}
          itemCount={1000}
          itemSize={50}
          width={width}
        >
          {Row}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
}

Sticky Headers:
---------------

import { FixedSizeList } from 'react-window';

function ListWithStickyHeaders() {
  const items = generateGroupedItems(); // [{ type: 'header', text: 'A' }, { type: 'item', ...}]
  
  const Row = ({ index, style }) => {
    const item = items[index];
    
    if (item.type === 'header') {
      return (
        <div
          style={{
            ...style,
            position: 'sticky',
            top: 0,
            background: '#f0f0f0',
            fontWeight: 'bold',
            zIndex: 1
          }}
        >
          {item.text}
        </div>
      );
    }
    
    return <div style={style}>{item.text}</div>;
  };
  
  return (
    <FixedSizeList
      height={400}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}

react-virtualized (older, more features):
------------------------------------------

// react-virtualized is older but has more features
// react-window is newer, smaller, recommended

import { List } from 'react-virtualized';

function VirtualizedListOld() {
  const rowRenderer = ({ index, key, style }) => (
    <div key={key} style={style}>
      Item {index}
    </div>
  );
  
  return (
    <List
      width={300}
      height={400}
      rowCount={1000}
      rowHeight={50}
      rowRenderer={rowRenderer}
    />
  );
}

Performance Comparison:
-----------------------

Without virtualization (10,000 items):
- Initial render: 2-3 seconds
- DOM nodes: 10,000
- Memory: ~50MB
- Scroll FPS: 15-20

With virtualization (10,000 items):
- Initial render: 100ms
- DOM nodes: ~20 (only visible)
- Memory: ~5MB
- Scroll FPS: 60

Best Practices:
---------------

1. Use for large lists (>100 items)
2. Use FixedSizeList when all items same height
3. Use VariableSizeList for different heights
4. Use AutoSizer for responsive sizing
5. Add overscan for smooth scrolling
6. Memoize row components
7. Use keys properly

Complete Example:
-----------------

import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

const Row = React.memo(({ index, style, data }) => {
  const item = data[index];
  
  return (
    <div
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #eee'
      }}
    >
      <img src={item.avatar} alt={item.name} />
      <div>
        <div>{item.name}</div>
        <div>{item.email}</div>
      </div>
    </div>
  );
});

function VirtualizedUserList({ users }) {
  return (
    <div style={{ height: '100vh' }}>
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            height={height}
            itemCount={users.length}
            itemSize={70}
            itemData={users}
            width={width}
            overscanCount={5}  // Render 5 extra items for smooth scroll
          >
            {Row}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  );
}

Summary:

Virtualization:
- Render only visible items
- Dramatically improves performance
- react-window: Lightweight, modern
- react-virtualized: Feature-rich, older
- Use for lists > 100 items
- Fixed or variable sizes
- 2D grid support
- Infinite loading
- Scrolling APIs
- Essential for large datasets
*/


/**
68. What is the difference between useMemo and useCallback?
-----------------------------------------------------------

useMemo and useCallback are both React hooks for memoization, but they memoize
different things. useMemo memoizes values/results, while useCallback memoizes
functions.

Core Difference:
----------------

// useMemo: Memoizes the RESULT of a function
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// useCallback: Memoizes the FUNCTION itself
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

// They're related:
useCallback(fn, deps) === useMemo(() => fn, deps)

useMemo - Memoize Values:
--------------------------

function Component({ items, filter }) {
  // Without useMemo: filters on every render
  const filteredItems = items.filter(item => item.category === filter);
  
  // With useMemo: only filters when items or filter changes
  const filteredItems = useMemo(() => {
    console.log('Filtering...');
    return items.filter(item => item.category === filter);
  }, [items, filter]);
  
  return <List items={filteredItems} />;
}

// useMemo returns the filtered array
// Recalculates only when dependencies change

useCallback - Memoize Functions:
---------------------------------

function Component() {
  const [count, setCount] = useState(0);
  
  // Without useCallback: new function every render
  const handleClick = () => {
    console.log('Clicked');
  };
  
  // With useCallback: same function across renders
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // Empty deps = function never changes
  
  return <MemoizedChild onClick={handleClick} />;
}

// useCallback returns the function itself
// Recreates function only when dependencies change

Side-by-Side Comparison:
-------------------------

// useMemo
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b); // Returns result
}, [a, b]);

console.log(expensiveValue); // The computed value (e.g., 42)

// useCallback
const expensiveCallback = useCallback(() => {
  return computeExpensiveValue(a, b); // Returns function
}, [a, b]);

console.log(expensiveCallback); // The function itself
console.log(expensiveCallback()); // Call it to get result (42)

When to Use Each:
-----------------

// Use useMemo for:
// 1. Expensive calculations
const sortedList = useMemo(() => {
  return [...items].sort((a, b) => a.value - b.value);
}, [items]);

// 2. Filtered/transformed data
const filteredData = useMemo(() => {
  return data.filter(item => item.active);
}, [data]);

// 3. Objects/arrays passed to memoized components
const config = useMemo(() => ({
  theme: 'dark',
  fontSize: 16
}), []); // Stable reference

<MemoizedChild config={config} />

// Use useCallback for:
// 1. Event handlers passed to memoized components
const handleClick = useCallback((id) => {
  console.log('Clicked:', id);
}, []);

<MemoizedChild onClick={handleClick} />

// 2. Functions in dependency arrays
const fetchData = useCallback(() => {
  return fetch('/api/data');
}, []);

useEffect(() => {
  fetchData(); // fetchData in deps
}, [fetchData]);

// 3. Callbacks for child components
const handleSubmit = useCallback((values) => {
  submitForm(values);
}, []);

<Form onSubmit={handleSubmit} />

Practical Examples:
-------------------

// Example 1: Search with filtering

function SearchableList({ items }) {
  const [query, setQuery] = useState('');
  
  // useMemo: Memoize filtered results
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]);
  
  // useCallback: Memoize search handler
  const handleSearch = useCallback((e) => {
    setQuery(e.target.value);
  }, []); // No deps, uses event directly
  
  return (
    <div>
      <input value={query} onChange={handleSearch} />
      <List items={filteredItems} />
    </div>
  );
}

// Example 2: Todo app

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  
  // useMemo: Compute filtered todos
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);
  
  // useMemo: Compute stats
  const stats = useMemo(() => ({
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length
  }), [todos]);
  
  // useCallback: Memoize handlers
  const handleToggle = useCallback((id) => {
    setTodos(prev => prev.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  }, []);
  
  const handleDelete = useCallback((id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, []);
  
  const handleAdd = useCallback((text) => {
    setTodos(prev => [...prev, {
      id: Date.now(),
      text,
      completed: false
    }]);
  }, []);
  
  return (
    <div>
      <TodoStats stats={stats} />
      <TodoInput onAdd={handleAdd} />
      <TodoList
        todos={filteredTodos}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
}

// Example 3: Form with validation

function Form() {
  const [values, setValues] = useState({ name: '', email: '' });
  
  // useMemo: Compute validation errors
  const errors = useMemo(() => {
    const errs = {};
    if (!values.name) errs.name = 'Required';
    if (!values.email.includes('@')) errs.email = 'Invalid email';
    return errs;
  }, [values]);
  
  // useMemo: Check if form is valid
  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);
  
  // useCallback: Memoize change handler
  const handleChange = useCallback((field, value) => {
    setValues(prev => ({ ...prev, [field]: value }));
  }, []);
  
  // useCallback: Memoize submit handler
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (isValid) {
      submitForm(values);
    }
  }, [values, isValid]);
  
  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={values.name}
        onChange={(val) => handleChange('name', val)}
        error={errors.name}
      />
      <Input
        value={values.email}
        onChange={(val) => handleChange('email', val)}
        error={errors.email}
      />
      <button disabled={!isValid}>Submit</button>
    </form>
  );
}

Common Mistakes:
----------------

// Mistake 1: Using useMemo for functions

// ❌ Wrong: useMemo returns value, not function
const handleClick = useMemo(() => {
  console.log('clicked');
}, []);

// Calling it: handleClick is undefined or the return value!

// ✅ Correct: Use useCallback for functions
const handleClick = useCallback(() => {
  console.log('clicked');
}, []);

// Mistake 2: Using useCallback for values

// ❌ Wrong: useCallback returns function
const sortedList = useCallback(() => {
  return [...items].sort();
}, [items]);

// You'd have to call it: sortedList()

// ✅ Correct: Use useMemo for values
const sortedList = useMemo(() => {
  return [...items].sort();
}, [items]);

// Use directly: sortedList

// Mistake 3: Missing dependencies

// ❌ Wrong: Stale closure
const handleClick = useCallback(() => {
  console.log(count); // Always logs initial count!
}, []); // Missing count dependency

// ✅ Correct: Include dependencies
const handleClick = useCallback(() => {
  console.log(count);
}, [count]);

// ✅ Better: Use functional update (no dependency needed)
const handleClick = useCallback(() => {
  setCount(prev => {
    console.log(prev);
    return prev + 1;
  });
}, []);

Relationship:
-------------

// These are equivalent:

// useCallback
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b]
);

// Same as useMemo returning a function
const memoizedCallback = useMemo(
  () => () => {
    doSomething(a, b);
  },
  [a, b]
);

// useCallback is just syntactic sugar for useMemo returning a function

Performance Impact:
-------------------

// Without memoization (re-renders even with same props)
function Parent() {
  const [count, setCount] = useState(0);
  
  const data = items.filter(i => i.active); // New array every render
  const handleClick = () => console.log('click'); // New function every render
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <MemoizedChild data={data} onClick={handleClick} />
      {/* Child re-renders every time! * /}
    </div>
  );
}

// With memoization (only re-renders when dependencies change)
function Parent() {
  const [count, setCount] = useState(0);
  
  const data = useMemo(() => items.filter(i => i.active), [items]);
  const handleClick = useCallback(() => console.log('click'), []);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <MemoizedChild data={data} onClick={handleClick} />
      {/* Child only re-renders if data or onClick changes * /}
    </div>
  );
}

Cheat Sheet:
------------

// Use useMemo when you want to memoize:
const value = useMemo(() => compute(), [deps]); // Computed value
const array = useMemo(() => [...items], [items]); // Array
const object = useMemo(() => ({ key: value }), [value]); // Object
const sorted = useMemo(() => items.sort(), [items]); // Sorted array
const filtered = useMemo(() => items.filter(fn), [items]); // Filtered array

// Use useCallback when you want to memoize:
const callback = useCallback(() => {}, [deps]); // Function
const handler = useCallback((e) => {}, [deps]); // Event handler
const onClick = useCallback(() => {}, [deps]); // Click handler
const onSubmit = useCallback(() => {}, [deps]); // Submit handler

Summary:

useMemo:
- Memoizes VALUES/RESULTS
- Returns computed value
- Use for expensive calculations
- Use for objects/arrays passed to children
- Syntax: useMemo(() => value, [deps])

useCallback:
- Memoizes FUNCTIONS
- Returns the function itself
- Use for event handlers
- Use for callbacks passed to children
- Syntax: useCallback(() => {}, [deps])

Both:
- Take dependency array
- Recreate when dependencies change
- Help optimize performance
- Should be used with React.memo
- Don't overuse (adds overhead)

useCallback(fn, deps) === useMemo(() => fn, deps)
*/

// Continuing with remaining questions...

/**
69. How does React batching work?
---------------------------------

React batching is an optimization where multiple state updates are grouped together
into a single re-render for better performance. Instead of re-rendering after each
setState, React batches them and re-renders once.

Before React 18:
----------------

// In event handlers - batched automatically
function Component() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  
  console.log('Render');
  
  const handleClick = () => {
    setCount(c => c + 1);
    setFlag(f => !f);
    // Only 1 render (batched)
  };
  
  return <button onClick={handleClick}>Click</button>;
}

// Outside event handlers - NOT batched
function Component() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  
  useEffect(() => {
    fetch('/api/data').then(() => {
      setCount(c => c + 1); // Render 1
      setFlag(f => !f);     // Render 2
      // 2 renders (not batched before React 18)
    });
  }, []);
  
  return <div>{count}</div>;
}

React 18 - Automatic Batching:
-------------------------------

// ALL updates are batched automatically in React 18

function Component() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  
  console.log('Render');
  
  // Event handlers - batched
  const handleClick = () => {
    setCount(c => c + 1);
    setFlag(f => !f);
    // 1 render
  };
  
  // Timeouts - batched (new in React 18!)
  const handleTimeout = () => {
    setTimeout(() => {
      setCount(c => c + 1);
      setFlag(f => !f);
      // 1 render (batched in React 18)
    }, 1000);
  };
  
  // Promises - batched (new in React 18!)
  const handlePromise = () => {
    fetch('/api/data').then(() => {
      setCount(c => c + 1);
      setFlag(f => !f);
      // 1 render (batched in React 18)
    });
  };
  
  // Native events - batched (new in React 18!)
  useEffect(() => {
    window.addEventListener('resize', () => {
      setCount(c => c + 1);
      setFlag(f => !f);
      // 1 render (batched in React 18)
    });
  }, []);
  
  return (
    <div>
      <button onClick={handleClick}>Click</button>
      <button onClick={handleTimeout}>Timeout</button>
      <button onClick={handlePromise}>Promise</button>
    </div>
  );
}

How Batching Works:
-------------------

// Conceptual implementation

// React maintains a queue of updates
const updateQueue = [];
let isBatching = false;

function setState(newState) {
  updateQueue.push(newState);
  
  if (!isBatching) {
    isBatching = true;
    
    // Schedule flush at end of current execution
    Promise.resolve().then(() => {
      // Process all queued updates
      const updates = [...updateQueue];
      updateQueue.length = 0;
      
      // Apply all updates
      updates.forEach(applyUpdate);
      
      // Re-render once
      rerender();
      
      isBatching = false;
    });
  }
}

// Example:
setCount(1);    // Queued
setFlag(true);  // Queued
setName('Joe'); // Queued
// ... (end of synchronous execution)
// -> Single re-render with all updates

Opting Out of Batching:
------------------------

// Use flushSync to force immediate update (rare!)

import { flushSync } from 'react-dom';

function Component() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  
  const handleClick = () => {
    flushSync(() => {
      setCount(c => c + 1);
      // Renders immediately
    });
    
    // Continuing execution...
    setFlag(f => !f);
    // Renders again
    
    // Total: 2 renders
  };
  
  return <button onClick={handleClick}>Click</button>;
}

// Use cases for flushSync:
// - Need to measure DOM after state change
// - Third-party libraries expecting immediate DOM updates
// - Very rare!

Example: Measuring DOM
----------------------

function Component() {
  const [height, setHeight] = useState(0);
  const divRef = useRef();
  
  const handleClick = () => {
    flushSync(() => {
      setHeight(100); // Update immediately
    });
    
    // Measure DOM after update
    console.log(divRef.current.offsetHeight); // 100
  };
  
  return (
    <div>
      <div ref={divRef} style={{ height }}>Content</div>
      <button onClick={handleClick}>Update</button>
    </div>
  );
}

Batching with Multiple Components:
-----------------------------------

// Parent and child updates are batched together

function Parent() {
  const [count, setCount] = useState(0);
  
  console.log('Parent render');
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child count={count} />
    </div>
  );
}

function Child({ count }) {
  const [localCount, setLocalCount] = useState(0);
  
  console.log('Child render');
  
  useEffect(() => {
    // Both updates batched
    setLocalCount(count * 2);
  }, [count]);
  
  return <div>Local: {localCount}</div>;
}

// Click button:
// -> setCount in Parent
// -> setLocalCount in Child effect
// -> Single render cycle for both

Batching and Event Bubbling:
-----------------------------

function Component() {
  const [count, setCount] = useState(0);
  
  return (
    <div onClick={() => {
      console.log('Div clicked');
      setCount(c => c + 1);
    }}>
      <button onClick={() => {
        console.log('Button clicked');
        setCount(c => c + 1);
      }}>
        Click
      </button>
    </div>
  );
}

// Click button:
// 1. Button onClick fires: setCount
// 2. Event bubbles to div
// 3. Div onClick fires: setCount
// 4. Both updates batched -> 1 render

// Logs:
// Button clicked
// Div clicked
// Render (once)

Comparison: Before vs After React 18
-------------------------------------

// React 17
function OldBehavior() {
  const [count, setCount] = useState(0);
  
  // Event handler: batched
  const handleClick = () => {
    setCount(1); // Batched
    setCount(2); // Batched
    // 1 render
  };
  
  // Timeout: NOT batched
  const handleTimeout = () => {
    setTimeout(() => {
      setCount(1); // Render 1
      setCount(2); // Render 2
      // 2 renders!
    });
  };
  
  // Promise: NOT batched
  const handlePromise = () => {
    Promise.resolve().then(() => {
      setCount(1); // Render 1
      setCount(2); // Render 2
      // 2 renders!
    });
  };
}

// React 18
function NewBehavior() {
  const [count, setCount] = useState(0);
  
  // Event handler: batched
  const handleClick = () => {
    setCount(1); // Batched
    setCount(2); // Batched
    // 1 render
  };
  
  // Timeout: NOW batched!
  const handleTimeout = () => {
    setTimeout(() => {
      setCount(1); // Batched
      setCount(2); // Batched
      // 1 render
    });
  };
  
  // Promise: NOW batched!
  const handlePromise = () => {
    Promise.resolve().then(() => {
      setCount(1); // Batched
      setCount(2); // Batched
      // 1 render
    });
  };
}

Benefits of Batching:
---------------------

1. Better performance
   - Fewer renders
   - Fewer DOM updates
   - Better FPS

2. Consistency
   - State updates applied together
   - Prevents "tearing" (partial updates visible)

3. Simpler mental model
   - Predictable behavior
   - Works everywhere (React 18)

Testing Batching:
-----------------

function BatchingDemo() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  
  console.log('Render:', count1, count2, count3);
  
  const handleBatchedUpdate = () => {
    console.log('Starting updates...');
    setCount1(c => c + 1);
    setCount2(c => c + 1);
    setCount3(c => c + 1);
    console.log('Updates queued');
  };
  
  return (
    <div>
      <button onClick={handleBatchedUpdate}>
        Batched Update
      </button>
      <p>Count1: {count1}</p>
      <p>Count2: {count2}</p>
      <p>Count3: {count3}</p>
    </div>
  );
}

// Click button:
// Starting updates...
// Updates queued
// Render: 1 1 1 (single render)

Summary:

React Batching:
- Groups multiple state updates into single re-render
- React 17: Only in event handlers
- React 18: Everywhere (automatic batching)
- Improves performance
- Use flushSync to opt out (rare)
- Transparent optimization
- Works across components
- No code changes needed (React 18)
*/


/**
70. What is concurrency in React 18?
------------------------------------

Concurrency in React 18 is the ability for React to work on multiple tasks at once,
pausing and resuming work as needed. It allows React to prepare multiple versions
of the UI simultaneously and prioritize updates based on urgency.

Key Concept:
- React can interrupt rendering to handle higher-priority updates
- Keeps UI responsive during expensive operations
- Not about parallel threads (JavaScript is single-threaded)
- About interruptible rendering

Before Concurrency (Blocking Rendering):
-----------------------------------------

// React 17: Rendering blocks main thread
function App() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  
  const handleChange = (e) => {
    setQuery(e.target.value);
    
    // Expensive filtering blocks UI
    const filtered = expensiveFilter(e.target.value, largeDataset);
    setItems(filtered);
    // UI freezes during filtering!
  };
  
  return (
    <div>
      <input value={query} onChange={handleChange} />
      <List items={items} />
    </div>
  );
}

// User types "hello":
// h - Update starts, UI freezes
// e - Queued (can't process yet)
// l - Queued
// l - Queued  
// o - Queued
// Finally all process at once -> janky experience

With Concurrency (Interruptible Rendering):
--------------------------------------------

import { startTransition } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  
  const handleChange = (e) => {
    // Urgent: Update input immediately
    setQuery(e.target.value);
    
    // Non-urgent: Mark as transition
    startTransition(() => {
      const filtered = expensiveFilter(e.target.value, largeDataset);
      setItems(filtered);
    });
  };
  
  return (
    <div>
      <input value={query} onChange={handleChange} />
      <List items={items} />
    </div>
  );
}

// User types "hello":
// h - Input updates immediately, filtering starts
// e - Input updates, previous filtering paused, new filtering starts
// l - Input updates, previous filtering paused, new filtering starts
// (etc.)
// Smooth typing experience!

useTransition Hook:
-------------------

import { useTransition } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [isPending, startTransition] = useTransition();
  
  const handleChange = (e) => {
    setQuery(e.target.value);
    
    startTransition(() => {
      // This update is marked as non-urgent
      const filtered = expensiveFilter(e.target.value, largeData);
      setItems(filtered);
    });
  };
  
  return (
    <div>
      <input value={query} onChange={handleChange} />
      
      {/* Show loading state during transition * /}
      {isPending && <Spinner />}
      
      {/* Show results (may be stale during transition) * /}
      <List items={items} />
    </div>
  );
}

useDeferredValue Hook:
-----------------------

import { useDeferredValue } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  
  // Defer expensive computation
  const deferredQuery = useDeferredValue(query);
  
  // Items computed with deferred value
  const items = useMemo(() => {
    return expensiveFilter(deferredQuery, largeData);
  }, [deferredQuery]);
  
  return (
    <div>
      {/* Input always responsive * /}
      <input value={query} onChange={e => setQuery(e.target.value)} />
      
      {/* Results may lag behind input * /}
      <List items={items} />
    </div>
  );
}

// query updates immediately (urgent)
// deferredQuery updates later (non-urgent)

useTransition vs useDeferredValue:
-----------------------------------

// useTransition: You control when to start transition
function Component() {
  const [isPending, startTransition] = useTransition();
  
  const handleClick = () => {
    startTransition(() => {
      // Explicitly mark this as non-urgent
      updateState();
    });
  };
  
  return <button onClick={handleClick}>Update</button>;
}

// useDeferredValue: React defers the value automatically
function Component() {
  const [value, setValue] = useState('');
  const deferredValue = useDeferredValue(value);
  
  // value updates urgently
  // deferredValue updates non-urgently
  
  return <ExpensiveTree value={deferredValue} />;
}

Priority Levels:
----------------

// React now has multiple priority levels:

// 1. Urgent updates (high priority)
// - User input (typing, clicking)
// - Immediate feedback
// - Must not be interrupted

// 2. Transition updates (low priority)
// - Expensive renders
// - Data fetching results
// - Can be interrupted

// Example:
function TabContainer() {
  const [activeTab, setActiveTab] = useState('home');
  const [isPending, startTransition] = useTransition();
  
  const switchTab = (tab) => {
    // Urgent: Update tab immediately
    setActiveTab(tab);
    
    // Non-urgent: Render tab content
    startTransition(() => {
      renderTabContent(tab);
    });
  };
  
  return (
    <div>
      <Tabs active={activeTab} onChange={switchTab} />
      {isPending && <LoadingBar />}
      <TabContent tab={activeTab} />
    </div>
  );
}

Real-World Example: Tab Switching
----------------------------------

function SlowTab() {
  // Simulate slow component
  const items = [];
  for (let i = 0; i < 1000; i++) {
    items.push(<SlowItem key={i} />);
  }
  return <div>{items}</div>;
}

// Without transitions: UI freezes when switching tabs
function AppWithoutTransition() {
  const [activeTab, setActiveTab] = useState('home');
  
  return (
    <div>
      <button onClick={() => setActiveTab('home')}>Home</button>
      <button onClick={() => setActiveTab('profile')}>Profile</button>
      <button onClick={() => setActiveTab('settings')}>Settings</button>
      
      {activeTab === 'home' && <div>Home</div>}
      {activeTab === 'profile' && <SlowTab />}
      {activeTab === 'settings' && <div>Settings</div>}
    </div>
  );
}

// With transitions: UI stays responsive
function AppWithTransition() {
  const [activeTab, setActiveTab] = useState('home');
  const [isPending, startTransition] = useTransition();
  
  const selectTab = (tab) => {
    startTransition(() => {
      setActiveTab(tab);
    });
  };
  
  return (
    <div>
      <button onClick={() => selectTab('home')}>Home</button>
      <button onClick={() => selectTab('profile')}>Profile</button>
      <button onClick={() => selectTab('settings')}>Settings</button>
      
      {isPending && <Spinner />}
      
      <div style={{ opacity: isPending ? 0.5 : 1 }}>
        {activeTab === 'home' && <div>Home</div>}
        {activeTab === 'profile' && <SlowTab />}
        {activeTab === 'settings' && <div>Settings</div>}
      </div>
    </div>
  );
}

Concurrent Features in React 18:
---------------------------------

// 1. Automatic Batching (covered earlier)

// 2. Transitions (startTransition, useTransition)

// 3. Suspense for data fetching

// 4. useDeferredValue

// 5. Concurrent rendering (automatic with React 18)

How Concurrency Works Internally:
----------------------------------

// Fiber architecture enables concurrency

// Without concurrency:
// Start render -> Render all components -> Commit -> Done
// (Blocks main thread, can't be interrupted)

// With concurrency:
// Start render
// -> Render Component 1
// -> High-priority update arrives!
// -> Pause current work
// -> Handle high-priority update
// -> Resume previous work
// -> Finish render -> Commit

// React uses time slicing: breaks work into chunks

Best Practices:
---------------

// 1. Use transitions for expensive updates
function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();
  
  const search = (q) => {
    setQuery(q); // Urgent: show what user typed
    
    startTransition(() => {
      // Non-urgent: update results
      const filtered = expensiveSearch(q);
      setResults(filtered);
    });
  };
  
  return (
    <div>
      <input value={query} onChange={e => search(e.target.value)} />
      {isPending ? <Skeleton /> : <Results data={results} />}
    </div>
  );
}

// 2. Show loading states during transitions
{isPending && <LoadingIndicator />}
<div style={{ opacity: isPending ? 0.6 : 1 }}>
  {/* Content * /}
</div>

// 3. Use useDeferredValue for derived state
const deferredValue = useDeferredValue(expensiveValue);

// 4. Keep urgent updates separate from transitions
const handleChange = (e) => {
  setValue(e.target.value); // Urgent
  startTransition(() => {
    updateResults(e.target.value); // Non-urgent
  });
};

Enabling Concurrent Features:
------------------------------

// React 18: Use createRoot (not render)
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

// This enables concurrent features!

// Old way (React 17):
import ReactDOM from 'react-dom';
ReactDOM.render(<App />, document.getElementById('root'));

Summary:

Concurrency in React 18:
- Interruptible rendering
- Prioritizes urgent updates
- Keeps UI responsive
- useTransition for non-urgent updates
- useDeferredValue for derived values
- isPending for loading states
- Automatic batching everywhere
- Requires createRoot
- Backward compatible
- Opt-in for new features
- Major performance improvement for complex UIs
*/


/**
71. What is Suspense and how does it help with async rendering?
---------------------------------------------------------------

Suspense is a React component that lets you "wait" for some code or data to load,
displaying a fallback UI (like a loading spinner) while waiting. It helps handle
async operations declaratively by suspending component rendering until data is ready.

Basic Concept:
--------------

// Instead of this (traditional approach):
function Component() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchData()
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <Spinner />;
  if (error) return <Error />;
  return <div>{data}</div>;
}

// Use Suspense (declarative approach):
function Component() {
  const data = useDataResource(); // Suspends while loading
  return <div>{data}</div>;
}

// Wrap with Suspense boundary
<Suspense fallback={<Spinner />}>
  <Component />
</Suspense>

Basic Usage:
------------

import { Suspense } from 'react';

function App() {
  return (
    <div>
      <h1>My App</h1>
      
      <Suspense fallback={<div>Loading...</div>}>
        <AsyncComponent />
      </Suspense>
    </div>
  );
}

// AsyncComponent "suspends" (throws promise) while loading
// Suspense catches it and shows fallback
// When promise resolves, AsyncComponent renders

Code Splitting with Suspense:
------------------------------

import { lazy, Suspense } from 'react';

// Lazy load component
const HeavyComponent = lazy(() => import('./HeavyComponent'));
const Dashboard = lazy(() => import('./Dashboard'));
const Profile = lazy(() => import('./Profile'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading component...</div>}>
        <HeavyComponent />
      </Suspense>
      
      <Suspense fallback={<PageSkeleton />}>
        <Dashboard />
      </Suspense>
    </div>
  );
}

// Benefits:
// - Smaller initial bundle
// - Faster initial load
// - Load components only when needed

Multiple Components in One Boundary:
------------------------------------

// All components under one Suspense boundary load together

<Suspense fallback={<LoadingScreen />}>
  <ProfilePage />
  <Comments />
  <RecommendedPosts />
</Suspense>

// If ANY child suspends, shows LoadingScreen
// When ALL are ready, shows everything together (no waterfall)
// Avoids partial loading states

Nested Suspense Boundaries:
----------------------------

// Different loading states for different parts of the UI

<Suspense fallback={<PageSkeleton />}>
  <Header />
  
  <Suspense fallback={<PostsSkeleton />}>
    <Posts />
  </Suspense>
  
  <Suspense fallback={<SidebarSkeleton />}>
    <Sidebar />
  </Suspense>
  
  <Footer />
</Suspense>

// Granular loading:
// - Header suspends -> shows PageSkeleton for whole page
// - Posts suspends -> shows PostsSkeleton (sidebar/footer still visible)
// - Sidebar suspends -> shows SidebarSkeleton (posts/footer still visible)

How Suspense Works (Internally):
---------------------------------

// Suspense-compatible resource throws a promise while loading

function createResource(promise) {
  let status = 'pending';
  let result;
  
  let suspender = promise.then(
    (data) => {
      status = 'success';
      result = data;
    },
    (error) => {
      status = 'error';
      result = error;
    }
  );
  
  return {
    read() {
      if (status === 'pending') {
        throw suspender; // Suspense catches this!
      }
      if (status === 'error') {
        throw result;
      }
      return result;
    }
  };
}

// Component using the resource
function Component() {
  const data = resource.read(); // Throws promise if pending
  return <div>{data}</div>;
}

// Suspense catches thrown promise
<Suspense fallback={<Loading />}>
  <Component />
</Suspense>

Data Fetching with Suspense:
-----------------------------

// Example: TV show search app

// fetchData utility (Suspense-compatible)
export const fetchData = (apiURL) => {
  let status = 'pending';
  let result;
  
  let suspender = fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      status = 'success';
      result = data;
    })
    .catch(error => {
      status = 'error';
      result = error;
    });
  
  return {
    read() {
      if (status === 'pending') {
        throw suspender; // Suspend!
      }
      if (status === 'error') {
        throw result;
      }
      return result;
    }
  };
};

// Create resource outside component
const showsResource = fetchData('https://api.tvmaze.com/search/shows?q=heist');

// Component using the resource
function Shows() {
  const shows = showsResource.read(); // Suspends if pending
  
  return (
    <div>
      {shows.map(show => (
        <div key={show.show.id}>
          <h2>{show.show.name}</h2>
          <img src={show.show.image?.medium} alt={show.show.name} />
        </div>
      ))}
    </div>
  );
}

// App with Suspense
function App() {
  return (
    <div className="App">
      <h1>React Suspense Demo</h1>
      
      <Suspense fallback={<p>Loading shows...</p>}>
        <Shows />
      </Suspense>
    </div>
  );
}

Revealing Content All at Once:
-------------------------------

// Fetch show details and episodes separately
// Show both only when BOTH are ready

const showDetailsResource = fetchData('https://api.tvmaze.com/shows/1234');
const episodesResource = fetchData('https://api.tvmaze.com/shows/1234/episodes');

function ShowDetails() {
  const show = showDetailsResource.read();
  
  return (
    <div>
      <h2>{show.name}</h2>
      <img src={show.image?.medium} alt={show.name} />
      <p>{show.summary}</p>
    </div>
  );
}

function ShowEpisodes() {
  const episodes = episodesResource.read();
  
  return (
    <div>
      <h3>Episodes</h3>
      <ul>
        {episodes.map(ep => (
          <li key={ep.id}>
            S{ep.season}E{ep.number}: {ep.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Both components under one Suspense boundary
function App() {
  return (
    <div>
      <h1>Show Details</h1>
      
      <Suspense fallback={<p>Loading show data...</p>}>
        <ShowDetails />
        <ShowEpisodes />
      </Suspense>
    </div>
  );
}

// Shows fallback until BOTH details and episodes are loaded
// Then reveals both together (no partial loading)

Progressive Reveal with Nested Suspense:
-----------------------------------------

// Show details immediately, load episodes after

function ShowDetails() {
  const show = showDetailsResource.read();
  
  return (
    <div>
      <h2>{show.name}</h2>
      <img src={show.image?.medium} alt={show.name} />
      <p>{show.summary}</p>
      <p>Rating: {show.rating.average}/10</p>
      
      {/* Nested Suspense for episodes * /}
      <Suspense fallback={<p>Loading episodes for {show.name}...</p>}>
        <ShowEpisodes />
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>Show Details</h1>
      
      <Suspense fallback={<p>Loading show details...</p>}>
        <ShowDetails />
      </Suspense>
    </div>
  );
}

// Flow:
// 1. Shows "Loading show details..."
// 2. Show details load -> display them
// 3. Shows "Loading episodes for [show]..."
// 4. Episodes load -> display them
// Progressive loading!

Error Boundaries with Suspense:
--------------------------------

import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loading />}>
        <AsyncComponent />
      </Suspense>
    </ErrorBoundary>
  );
}

// ErrorBoundary catches errors from async operations
// Suspense handles loading states
// Clean separation of concerns

Suspense with React Router:
----------------------------

import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy load route components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// Each route loads only when navigated to
// Shows PageLoader while route component loads

Real-World Example: User Dashboard
-----------------------------------

const UserProfile = lazy(() => import('./UserProfile'));
const ActivityFeed = lazy(() => import('./ActivityFeed'));
const Recommendations = lazy(() => import('./Recommendations'));

function Dashboard() {
  return (
    <div className="dashboard">
      <header>
        <h1>Dashboard</h1>
      </header>
      
      {/* Critical content loads first * /}
      <Suspense fallback={<ProfileSkeleton />}>
        <UserProfile />
      </Suspense>
      
      <div className="content">
        {/* Secondary content loads separately * /}
        <Suspense fallback={<FeedSkeleton />}>
          <ActivityFeed />
        </Suspense>
        
        <Suspense fallback={<RecommendationsSkeleton />}>
          <Recommendations />
        </Suspense>
      </div>
    </div>
  );
}

// Benefits:
// - Header shows immediately
// - Profile loads and shows
// - Feed and Recommendations load independently
// - Better perceived performance

Suspense vs useEffect/useState:
--------------------------------

// Traditional approach with useEffect/useState
function TraditionalComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetch('https://api.example.com/data');
        const json = await result.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{data.map(item => <div key={item.id}>{item.name}</div>)}</div>;
}

// Suspense approach (with compatible data source)
function SuspenseComponent() {
  const data = dataResource.read(); // Suspends automatically
  
  return <div>{data.map(item => <div key={item.id}>{item.name}</div>)}</div>;
}

<Suspense fallback={<div>Loading...</div>}>
  <SuspenseComponent />
</Suspense>

// Advantages of Suspense:
// - Declarative (not imperative)
// - Less boilerplate
// - Coordinated loading states
// - Better code splitting
// - Centralized loading UI

Using Suspense with Libraries:
-------------------------------

// React Query with Suspense
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true, // Enable Suspense mode
    },
  },
});

function Posts() {
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
  
  return data.map(post => <Post key={post.id} post={post} />);
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loading />}>
        <Posts />
      </Suspense>
    </QueryClientProvider>
  );
}

// SWR with Suspense
import useSWR from 'swr';

function Profile() {
  const { data } = useSWR('/api/user', fetcher, { suspense: true });
  
  return <div>{data.name}</div>;
}

<Suspense fallback={<Loading />}>
  <Profile />
</Suspense>

Best Practices:
---------------

// 1. Use appropriate fallback UIs
<Suspense fallback={<Skeleton />}> {/* Better than spinner * /}
  <Content />
</Suspense>

// 2. Avoid too many Suspense boundaries
// ❌ Too granular
{items.map(item => (
  <Suspense key={item.id} fallback={<Spinner />}>
    <Item item={item} />
  </Suspense>
))}

// ✅ Group related content
<Suspense fallback={<ListSkeleton />}>
  {items.map(item => <Item key={item.id} item={item} />)}
</Suspense>

// 3. Show context in loading states
<Suspense fallback={<div>Loading {userName}'s posts...</div>}>
  <UserPosts />
</Suspense>

// 4. Use nested Suspense for progressive loading
<Suspense fallback={<PageSkeleton />}>
  <Header />
  <Suspense fallback={<ContentSkeleton />}>
    <MainContent />
  </Suspense>
</Suspense>

// 5. Combine with Error Boundaries
<ErrorBoundary fallback={<ErrorUI />}>
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
</ErrorBoundary>

Current Limitations (as of React 18):
--------------------------------------

// 1. Not all data fetching libraries support Suspense yet
// 2. Server-side rendering with Suspense requires React 18+
// 3. Error handling requires Error Boundaries
// 4. Need Suspense-compatible data sources

// Libraries with Suspense support:
// - React Router (lazy loading)
// - React Query (with suspense option)
// - SWR (with suspense option)
// - Relay (built-in)
// - Next.js 13+ (with App Router)

Summary:

React Suspense:
- Declarative loading states for async operations
- Wrap components with <Suspense fallback={...}>
- Component "suspends" by throwing promise
- Shows fallback while waiting
- Perfect for code splitting with React.lazy()
- Coordinate multiple async operations
- Nested boundaries for progressive loading
- Works with Error Boundaries
- Eliminates loading state boilerplate
- Improves user experience with coordinated loading
- Part of React 18 concurrent features
- Growing ecosystem support
- Future of async rendering in React
*/


