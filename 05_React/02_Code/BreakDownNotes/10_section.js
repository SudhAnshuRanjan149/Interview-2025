/*

========================================================
SECTION 10 — REACT DOM & RENDERING
========================================================
77. What is ReactDOM and how does rendering work?  
78. What is reconciliation in React?  
79. What is the virtual DOM and how does it differ from the real DOM?  
80. What is diffing in React?  
81. What is hydration in React?  
82. What is server-side rendering (SSR)?  
83. What is static site generation (SSG)?  
84. What is React Fiber?  

*/




/**
77. What is ReactDOM and how does rendering work?
------------------------------------------------

ReactDOM is the library that provides DOM-specific methods for rendering React
components to the web. It acts as the bridge between React (the core library)
and the browser DOM.

React vs ReactDOM:
------------------

// React: Core library (components, hooks, state)
import React from 'react';

const element = <h1>Hello</h1>; // JSX -> React.createElement()

// ReactDOM: Browser-specific rendering
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')).render(element);

// Why separate?
// - React can target different platforms (web, mobile, VR)
// - ReactDOM targets browser/web
// - React Native targets mobile
// - React VR targets virtual reality

Main ReactDOM Methods:
-----------------------

// 1. createRoot (React 18+)
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

// Enables concurrent features
// - Automatic batching
// - Transitions
// - Suspense
// - Improved performance

// 2. render (Legacy - React 17 and below)
import ReactDOM from 'react-dom';

ReactDOM.render(<App />, document.getElementById('root'));

// Synchronous rendering
// No concurrent features
// Still works but deprecated

// 3. unmountComponentAtNode
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

// Later...
ReactDOM.unmountComponentAtNode(rootElement);
// Removes component and cleans up event handlers

// 4. createPortal
import { createPortal } from 'react-dom';

function Modal({ children }) {
  return createPortal(
    children,
    document.getElementById('modal-root')
  );
}

// Renders children into different DOM node
// Useful for modals, tooltips, dropdowns

// 5. flushSync (React 18+)
import { flushSync } from 'react-dom';

function handleClick() {
  flushSync(() => {
    setCount(count + 1); // Updates immediately
  });
  // DOM updated synchronously here
  console.log(divRef.current.textContent); // Shows new count
}

How Rendering Works:
--------------------

// Step-by-step rendering process:

// 1. JSX Transformation
const element = <h1 className="title">Hello</h1>;

// Transforms to:
const element = React.createElement(
  'h1',
  { className: 'title' },
  'Hello'
);

// Creates React element (plain object):
{
  type: 'h1',
  props: {
    className: 'title',
    children: 'Hello'
  },
  key: null,
  ref: null
}

// 2. Create Root
const root = createRoot(document.getElementById('root'));

// Creates fiber root
// - Internal data structure
// - Manages component tree
// - Tracks updates

// 3. Initial Render
root.render(<App />);

// React creates virtual DOM tree:
<App>
  <Header>
    <h1>Title</h1>
    <Nav>
      <a>Home</a>
      <a>About</a>
    </Nav>
  </Header>
  <Content>
    <p>Content here</p>
  </Content>
</App>

// Converts to real DOM:
<div id="root">
  <div class="header">
    <h1>Title</h1>
    <nav>
      <a>Home</a>
      <a>About</a>
    </nav>
  </div>
  <div class="content">
    <p>Content here</p>
  </div>
</div>

// 4. Updates
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

// When button clicked:
// 1. setCount(count + 1) called
// 2. React schedules update
// 3. Re-renders Counter component
// 4. Creates new virtual DOM
// 5. Compares with previous virtual DOM (diffing)
// 6. Calculates minimal changes
// 7. Updates only changed DOM nodes

// Only <p> text content changes:
// Before: <p>Count: 0</p>
// After:  <p>Count: 1</p>
// React only updates text node, not entire <p> or <div>

Rendering Phases:
-----------------

// Phase 1: Render Phase (Can be paused/interrupted in React 18)
// - Call components
// - Calculate what changed
// - Build new virtual DOM tree
// - Diff with previous tree
// - Mark nodes for update
// - Pure, no side effects

// Phase 2: Commit Phase (Synchronous, cannot be interrupted)
// - Apply DOM updates
// - Run useLayoutEffect
// - Update refs
// - Run useEffect (after commit)
// - Browser paints screen

Example: Full Rendering Cycle
------------------------------

function App() {
  const [items, setItems] = useState(['Apple', 'Banana']);
  
  return (
    <div>
      <h1>Fruits</h1>
      <ul>
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button onClick={() => setItems([...items, 'Orange'])}>
        Add Orange
      </button>
    </div>
  );
}

// Initial Render:
// 1. createRoot creates fiber root
// 2. render() called with <App />
// 3. App function executed
// 4. Virtual DOM created:
{
  type: 'div',
  props: {
    children: [
      { type: 'h1', props: { children: 'Fruits' } },
      { 
        type: 'ul',
        props: {
          children: [
            { type: 'li', key: 'Apple', props: { children: 'Apple' } },
            { type: 'li', key: 'Banana', props: { children: 'Banana' } }
          ]
        }
      },
      { type: 'button', props: { onClick: [Function], children: 'Add Orange' } }
    ]
  }
}
// 5. Real DOM created and inserted

// After clicking "Add Orange":
// 1. setItems called
// 2. App re-renders
// 3. New virtual DOM created (with Orange)
// 4. Diff algorithm compares:
//    - <h1> same ✓
//    - <ul> same ✓
//    - <li>Apple</li> same ✓
//    - <li>Banana</li> same ✓
//    - <li>Orange</li> NEW! +
//    - <button> same ✓
// 5. Only ONE DOM operation: append new <li>Orange</li> to <ul>
// 6. useEffect cleanup from previous render
// 7. New useEffect runs

Concurrent Rendering (React 18):
---------------------------------

// Old (Synchronous):
ReactDOM.render(<App />, root);
// Blocks main thread until complete
// Can cause janky UI

// New (Concurrent):
const root = createRoot(document.getElementById('root'));
root.render(<App />);

// Can pause/resume rendering
// Prioritizes urgent updates
// Keeps UI responsive

// Example: Urgent vs Non-urgent updates
import { startTransition } from 'react';

function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  const handleChange = (e) => {
    // Urgent: Update input immediately
    setQuery(e.target.value);
    
    // Non-urgent: Update results (can be interrupted)
    startTransition(() => {
      const filtered = filterLargeDataset(e.target.value);
      setResults(filtered);
    });
  };
  
  return (
    <div>
      <input value={query} onChange={handleChange} />
      <ResultsList results={results} />
    </div>
  );
}

// User types "hello":
// h - Input updates, results start filtering
// e - Input updates immediately, previous filtering paused, new filtering starts
// l - Input updates immediately, previous filtering paused, new filtering starts
// l - Input updates immediately, previous filtering paused, new filtering starts
// o - Input updates immediately, previous filtering paused, new filtering starts
// (User stops typing)
// - Final filtering completes, results displayed
// Smooth typing experience!

Batching in ReactDOM:
---------------------

// React 18: Automatic batching everywhere

function Component() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  
  // In event handler - batched
  const handleClick = () => {
    setCount(c => c + 1);
    setFlag(f => !f);
    // Single re-render
  };
  
  // In timeout - batched in React 18!
  const handleTimeout = () => {
    setTimeout(() => {
      setCount(c => c + 1);
      setFlag(f => !f);
      // Single re-render (batched in React 18)
    }, 1000);
  };
  
  // In promise - batched in React 18!
  const handlePromise = () => {
    fetch('/api').then(() => {
      setCount(c => c + 1);
      setFlag(f => !f);
      // Single re-render (batched in React 18)
    });
  };
  
  return (
    <div>
      <button onClick={handleClick}>Click</button>
      <button onClick={handleTimeout}>Timeout</button>
      <button onClick={handlePromise}>Promise</button>
    </div>
  );
}

Portals:
--------

// Render component outside parent hierarchy

// HTML:
<div id="root"></div>
<div id="modal-root"></div>

// Component:
function Modal({ isOpen, children }) {
  if (!isOpen) return null;
  
  // Renders into #modal-root, not #root
  return createPortal(
    <div className="modal">
      <div className="modal-content">
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

function App() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowModal(true)}>
        Open Modal
      </button>
      
      {/* Rendered outside this div * /}
      <Modal isOpen={showModal}>
        <h2>Modal Content</h2>
      </Modal>
    </div>
  );
}

// Events still bubble through React tree
// Even though Modal is in different DOM location

Summary:

ReactDOM:
- Bridge between React and browser DOM
- createRoot for React 18 (concurrent features)
- render for legacy (synchronous)
- createPortal for rendering outside hierarchy
- Handles initial render and updates
- Two phases: render and commit
- Automatic batching in React 18
- Enables concurrent rendering
- Minimal DOM manipulation through diffing
*/


/**
78. What is reconciliation in React?
------------------------------------

Reconciliation is the algorithm React uses to update the DOM efficiently by
comparing the new virtual DOM tree with the previous one and determining the
minimal set of changes needed.

Core Concept:
-------------

// When state/props change:
// 1. React creates new virtual DOM tree
// 2. Compares with previous virtual DOM tree (reconciliation)
// 3. Calculates differences (diffing)
// 4. Updates real DOM with only the changes

// Example:
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Counter App</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

// Initial render creates:
<div>
  <h1>Counter App</h1>
  <p>Count: 0</p>
  <button>+</button>
</div>

// After clicking button:
// New virtual DOM:
<div>
  <h1>Counter App</h1>
  <p>Count: 1</p>  ← Only this changed
  <button>+</button>
</div>

// Reconciliation:
// - Compares trees
// - Finds: <p> text changed from "Count: 0" to "Count: 1"
// - Updates: Only the text node inside <p>
// - Doesn't recreate entire DOM tree

Reconciliation Algorithm:
--------------------------

// React uses heuristics to make O(n) instead of O(n³):

// 1. Different element types -> replace entire tree
// Before:
<div>
  <Counter />
</div>

// After:
<span>
  <Counter />
</span>

// React destroys old <div> and Counter
// Creates new <span> and Counter from scratch
// Counter loses state (unmounted and remounted)

// 2. Same element type -> keep DOM node, update attributes
// Before:
<div className="before" title="old" />

// After:
<div className="after" title="new" />

// React keeps same DOM node
// Only updates className and title attributes

// 3. Same component type -> update props
// Before:
<Counter value={0} />

// After:
<Counter value={1} />

// React keeps Counter instance
// Calls componentDidUpdate or runs useEffect
// State preserved

// 4. Recurse on children
// Before:
<ul>
  <li>A</li>
  <li>B</li>
</ul>

// After:
<ul>
  <li>A</li>
  <li>B</li>
  <li>C</li>
</ul>

// React iterates children:
// - <li>A</li> same ✓
// - <li>B</li> same ✓
// - <li>C</li> new, insert +

Keys in Reconciliation:
-----------------------

// Without keys - inefficient
function List() {
  const [items, setItems] = useState(['A', 'B', 'C']);
  
  return (
    <ul>
      {items.map(item => <li>{item}</li>)}
    </ul>
  );
}

// Initial:
<ul>
  <li>A</li>
  <li>B</li>
  <li>C</li>
</ul>

// After inserting 'X' at start:
setItems(['X', 'A', 'B', 'C']);

// Without keys, React thinks:
<li>A</li> changed to <li>X</li> ← Update
<li>B</li> changed to <li>A</li> ← Update
<li>C</li> changed to <li>B</li> ← Update
NEW: <li>C</li> ← Insert
// 4 operations!

// With keys - efficient
function List() {
  const [items, setItems] = useState(['A', 'B', 'C']);
  
  return (
    <ul>
      {items.map(item => <li key={item}>{item}</li>)}
    </ul>
  );
}

// Initial:
<ul>
  <li key="A">A</li>
  <li key="B">B</li>
  <li key="C">C</li>
</ul>

// After inserting 'X' at start:
setItems(['X', 'A', 'B', 'C']);

// With keys, React knows:
<li key="A">A</li> ← Same, keep ✓
<li key="B">B</li> ← Same, keep ✓
<li key="C">C</li> ← Same, keep ✓
NEW: <li key="X">X</li> ← Insert at start
// 1 operation!

Reconciliation Examples:
------------------------

// Example 1: Element type changed
function App() {
  const [useDiv, setUseDiv] = useState(true);
  
  return useDiv ? (
    <div>
      <Counter /> {/* Counter with state * /}
    </div>
  ) : (
    <span>
      <Counter /> {/* New Counter, state lost! * /}
    </span>
  );
}

// Toggling destroys and recreates Counter
// State is lost

// Solution: Keep same element type
function App() {
  const [className, setClassName] = useState('div-style');
  
  return (
    <div className={className}>
      <Counter /> {/* Counter kept, state preserved * /}
    </div>
  );
}

// Example 2: Conditional rendering
function App() {
  const [showA, setShowA] = useState(true);
  
  return (
    <div>
      {showA ? <ComponentA /> : <ComponentB />}
    </div>
  );
}

// Toggling destroys ComponentA and creates ComponentB
// Each loses state when hidden

// Solution: Render both, hide with CSS
function App() {
  const [showA, setShowA] = useState(true);
  
  return (
    <div>
      <ComponentA style={{ display: showA ? 'block' : 'none' }} />
      <ComponentB style={{ display: !showA ? 'block' : 'none' }} />
    </div>
  );
}

// Both stay mounted, state preserved

// Example 3: List reordering
const items = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Cherry' }
];

// ❌ Bad: Using index as key
function BadList() {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item.name}</li>
      ))}
    </ul>
  );
}

// After sorting: ['Banana', 'Apple', 'Cherry']
// React thinks items changed positions:
// Index 0: "Apple" -> "Banana" (Update)
// Index 1: "Banana" -> "Apple" (Update)
// Index 2: "Cherry" -> "Cherry" (Keep)
// Wrong! Unnecessary updates

// ✅ Good: Using stable ID as key
function GoodList() {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// After sorting:
// Key 1: "Apple" - moved position but same element ✓
// Key 2: "Banana" - moved position but same element ✓
// Key 3: "Cherry" - same position ✓
// Correct! Just reorder DOM nodes

Reconciliation with State:
---------------------------

class Counter extends React.Component {
  state = { count: 0 };
  
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };
  
  render() {
    console.log('Counter rendered');
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>+</button>
      </div>
    );
  }
}

function App() {
  const [show, setShow] = useState(true);
  
  return (
    <div>
      <button onClick={() => setShow(!show)}>Toggle</button>
      
      {/* Scenario 1: Conditional rendering * /}
      {show && <Counter />}
      {/* Counter unmounted when hidden, state lost * /}
      
      {/* Scenario 2: Always rendered * /}
      <div style={{ display: show ? 'block' : 'none' }}>
        <Counter />
      </div>
      {/* Counter stays mounted, state preserved * /}
      
      {/* Scenario 3: Key change * /}
      <Counter key={show ? 'visible' : 'hidden'} />
      {/* Key changes, React creates new instance, state lost * /}
    </div>
  );
}

Reconciliation Performance:
----------------------------

// Expensive reconciliation (avoid)
function ExpensiveList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        // ❌ Creating new object every render
        <ExpensiveItem
          key={item.id}
          data={{ ...item }}  // New reference!
          onClick={() => handleClick(item.id)}  // New function!
        />
      ))}
    </ul>
  );
}

// Every render:
// - New data object -> props changed -> ExpensiveItem re-renders
// - New onClick function -> props changed -> ExpensiveItem re-renders

// Optimized reconciliation
const ExpensiveItem = React.memo(ExpensiveItem);

function OptimizedList({ items }) {
  const handleClick = useCallback((id) => {
    // handle click
  }, []);
  
  return (
    <ul>
      {items.map(item => (
        <ExpensiveItem
          key={item.id}
          data={item}  // Same reference if item unchanged
          onClick={handleClick}  // Same function reference
        />
      ))}
    </ul>
  );
}

// React.memo prevents unnecessary re-renders
// Only re-renders if item actually changed

Reconciliation vs Re-rendering:
--------------------------------

// Re-rendering: Calling component function again
function Component() {
  console.log('Component re-rendered');
  return <div>Hello</div>;
}

// Reconciliation: Comparing virtual DOM trees
// Just because component re-renders doesn't mean DOM updates

function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child />  {/* Re-renders but reconciliation finds no changes * /}
    </div>
  );
}

const Child = React.memo(function Child() {
  console.log('Child re-rendered'); // Doesn't log (memoized)
  return <div>Static content</div>;
});

// Parent re-renders when count changes
// Child doesn't re-render (React.memo)
// Reconciliation skips Child subtree

Summary:

Reconciliation:
- Process of updating DOM efficiently
- Compares new and old virtual DOM trees
- Calculates minimal changes needed
- O(n) complexity with heuristics
- Different element types = replace tree
- Same element types = update attributes
- Uses keys to track element identity
- Keys must be stable and unique
- Preserves component state when possible
- Foundation for React's performance
*/


/**
79. What is the virtual DOM and how does it differ from the real DOM?
---------------------------------------------------------------------

The Virtual DOM is a lightweight JavaScript representation of the real DOM.
React uses it to optimize updates by calculating changes in memory before
touching the actual DOM.

Virtual DOM Concept:
--------------------

// Real DOM (browser):
<div id="app">
  <h1 class="title">Hello</h1>
  <button>Click</button>
</div>

// Virtual DOM (JavaScript object):
{
  type: 'div',
  props: {
    id: 'app',
    children: [
      {
        type: 'h1',
        props: {
          className: 'title',
          children: 'Hello'
        }
      },
      {
        type: 'button',
        props: {
          children: 'Click'
        }
      }
    ]
  }
}

// Virtual DOM is just a plain JavaScript object
// Cheap to create and manipulate
// Represents what DOM should look like

How Virtual DOM Works:
-----------------------

// 1. Initial Render
function App() {
  return (
    <div>
      <h1>Hello</h1>
      <p>Counter: 0</p>
    </div>
  );
}

// Step 1: Create virtual DOM
const virtualDOM = {
  type: 'div',
  props: {
    children: [
      { type: 'h1', props: { children: 'Hello' } },
      { type: 'p', props: { children: 'Counter: 0' } }
    ]
  }
};

// Step 2: Create real DOM from virtual DOM
const realDOM = document.createElement('div');
const h1 = document.createElement('h1');
h1.textContent = 'Hello';
const p = document.createElement('p');
p.textContent = 'Counter: 0';
realDOM.appendChild(h1);
realDOM.appendChild(p);

// Step 3: Insert into document
document.getElementById('root').appendChild(realDOM);

// 2. Update
function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Hello</h1>
      <p>Counter: {count}</p>  {/* Changed! * /}
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

// Step 1: Create new virtual DOM
const newVirtualDOM = {
  type: 'div',
  props: {
    children: [
      { type: 'h1', props: { children: 'Hello' } },
      { type: 'p', props: { children: 'Counter: 1' } },  // Changed
      { type: 'button', props: { onClick: fn, children: '+' } }
    ]
  }
};

// Step 2: Compare (diff) with previous virtual DOM
// - div: same ✓
// - h1: same ✓
// - p: text changed from "Counter: 0" to "Counter: 1" ✓
// - button: same ✓

// Step 3: Update only changed real DOM nodes
p.textContent = 'Counter: 1';  // Only this operation!

Virtual DOM vs Real DOM:
------------------------

// Real DOM operations are EXPENSIVE:

// Creating element
const div = document.createElement('div');  // Slow
div.className = 'container';  // Slow
div.innerHTML = '<h1>Title</h1>';  // Slow
document.body.appendChild(div);  // Slow, triggers reflow

// Why slow?
// - Creates actual browser DOM nodes
// - Triggers layout calculations (reflow)
// - Triggers painting
// - Blocks main thread

// Virtual DOM operations are CHEAP:

// Creating virtual element
const vDiv = {
  type: 'div',
  props: {
    className: 'container',
    children: [
      { type: 'h1', props: { children: 'Title' } }
    ]
  }
};  // Fast! Just JavaScript object

// Why fast?
// - Plain JavaScript object
// - No browser API calls
// - No reflow/repaint
// - Doesn't block main thread

Real DOM:
---------

// Characteristics:
// - Heavyweight
// - Tree structure
// - Browser API
// - Slow manipulation
// - Triggers reflow/repaint
// - UI updates expensive

// Example: Direct DOM manipulation (slow)
function updateList(items) {
  const ul = document.getElementById('list');
  
  // ❌ Slow: Removes all, recreates all
  ul.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);  // Reflow for each!
  });
}

// Adding 1000 items = 1000 reflows = slow!

Virtual DOM:
------------

// Characteristics:
// - Lightweight
// - JavaScript object
// - Fast manipulation
// - Batches updates
// - Minimal real DOM changes
// - Efficient

// Example: React with virtual DOM (fast)
function List({ items }) {
  return (
    <ul>
      {items.map(item => <li key={item.id}>{item.text}</li>)}
    </ul>
  );
}

// Adding 1 item:
// 1. Creates new virtual DOM (cheap)
// 2. Diffs with previous (cheap)
// 3. Finds: only 1 new <li> needed
// 4. Adds only 1 <li> to real DOM (1 reflow)
// Fast!

Detailed Comparison:
--------------------

// Feature          | Real DOM          | Virtual DOM
// -----------------|-------------------|------------------
// Structure        | Tree of nodes     | JS object tree
// Updates          | Slow              | Fast
// Memory           | Heavy             | Light
// Re-rendering     | Expensive         | Cheap
// Direct access    | Yes               | No
// Manipulation     | document.* API    | React API
// Browser specific | Yes               | No (platform agnostic)

// Performance:

// Real DOM (1000 updates):
for (let i = 0; i < 1000; i++) {
  document.getElementById('counter').textContent = i;
}
// 1000 DOM updates = 1000 reflows = ~500ms

// Virtual DOM (1000 updates):
for (let i = 0; i < 1000; i++) {
  setCount(i);
}
// React batches: 1 virtual DOM update = 1 DOM update = ~5ms

Batching with Virtual DOM:
---------------------------

function Component() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  
  const handleClick = () => {
    setCount1(c => c + 1);
    setCount2(c => c + 1);
    setCount3(c => c + 1);
  };
  
  return (
    <div>
      <p>Count1: {count1}</p>
      <p>Count2: {count2}</p>
      <p>Count3: {count3}</p>
      <button onClick={handleClick}>Update All</button>
    </div>
  );
}

// Without virtual DOM:
// 3 state updates = 3 DOM updates = 3 reflows

// With virtual DOM:
// 1. Update all state in memory
// 2. Create new virtual DOM with all changes
// 3. Diff with previous
// 4. Apply all DOM changes at once
// 5. Single reflow!

Virtual DOM Tree Example:
--------------------------

// JSX:
<div className="app">
  <header>
    <h1>My App</h1>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  </header>
  <main>
    <p>Content here</p>
  </main>
</div>

// Virtual DOM representation:
{
  type: 'div',
  props: {
    className: 'app',
    children: [
      {
        type: 'header',
        props: {
          children: [
            {
              type: 'h1',
              props: { children: 'My App' }
            },
            {
              type: 'nav',
              props: {
                children: [
                  {
                    type: 'a',
                    props: { href: '/', children: 'Home' }
                  },
                  {
                    type: 'a',
                    props: { href: '/about', children: 'About' }
                  }
                ]
              }
            }
          ]
        }
      },
      {
        type: 'main',
        props: {
          children: [
            {
              type: 'p',
              props: { children: 'Content here' }
            }
          ]
        }
      }
    ]
  }
}

// Entire tree is just a JavaScript object!

When Virtual DOM Shines:
-------------------------

// Scenario 1: Frequent small updates
function LiveCounter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => c + 1);
    }, 100);  // Update every 100ms
    return () => clearInterval(timer);
  }, []);
  
  return <div>Count: {count}</div>;
}

// 10 updates/second
// Virtual DOM: Minimal overhead
// Real DOM: Would thrash browser

// Scenario 2: Complex UIs
function Dashboard() {
  return (
    <div>
      <Header />
      <Sidebar />
      <MainContent>
        <DataTable data={data} />  {/* 1000 rows * /}
        <Charts />
        <Analytics />
      </MainContent>
      <Footer />
    </div>
  );
}

// Update single data point:
// - Virtual DOM diffs entire tree
// - Finds only one cell changed
// - Updates only that cell
// - Rest of UI untouched

When Virtual DOM Doesn't Help:
-------------------------------

// Initial render: No benefit
// - Must create real DOM anyway
// - Virtual DOM adds overhead
// - Better to use SSR

// Large batch updates:
// - Replacing entire list
// - Virtual DOM overhead wasted
// - Direct DOM manipulation might be faster

Summary:

Virtual DOM:
- JavaScript representation of real DOM
- Lightweight objects
- Fast to create and manipulate
- Enables efficient updates through diffing
- Batches changes
- Minimizes real DOM operations
- Platform agnostic
- Foundation of React's performance

Real DOM:
- Actual browser DOM
- Heavyweight
- Slow to manipulate
- Triggers reflow/repaint
- No batching
- Expensive updates

Virtual DOM Process:
1. Create virtual DOM tree
2. Compare with previous (diff)
3. Calculate minimal changes
4. Batch update real DOM
5. Single reflow/repaint
*/


/**
80. What is diffing in React?
-----------------------------

Diffing is the algorithm React uses to compare two virtual DOM trees (old and new)
and determine the minimum number of operations needed to transform the old tree
into the new one.

Diffing Algorithm Assumptions:
-------------------------------

// React's diffing makes two assumptions for O(n) performance:

// 1. Elements of different types produce different trees
// 2. Developer can hint at stable elements with keys

// These assumptions allow O(n) instead of O(n³) complexity

Diffing Rules:
--------------

// Rule 1: Different Element Types
// --------------------------------

// Old tree:
<div>
  <Counter />
</div>

// New tree:
<span>
  <Counter />
</span>

// React:
// 1. Destroys old <div> and entire subtree
// 2. Unmounts old Counter (state lost)
// 3. Creates new <span>
// 4. Mounts new Counter (fresh state)

// Rule 2: Same Element Type (DOM Elements)
// -----------------------------------------

// Old:
<div className="before" title="old" />

// New:
<div className="after" title="new" />

// React:
// 1. Keeps same DOM node
// 2. Compares attributes
// 3. Updates only changed attributes
//    - className: "before" -> "after"
//    - title: "old" -> "new"

// Rule 3: Same Component Type
// ----------------------------

// Old:
<Counter value={5} />

// New:
<Counter value={10} />

// React:
// 1. Keeps component instance
// 2. Updates props
// 3. Calls componentDidUpdate or useEffect
// 4. State preserved

// Rule 4: Recursing on Children
// ------------------------------

// Old:
<ul>
  <li>A</li>
  <li>B</li>
</ul>

// New:
<ul>
  <li>A</li>
  <li>B</li>
  <li>C</li>
</ul>

// React iterates children:
// 1. <li>A</li> matches <li>A</li> ✓
// 2. <li>B</li> matches <li>B</li> ✓
// 3. Insert <li>C</li> +

Detailed Diffing Process:
--------------------------

// Example: Todo list update

function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          <button>Delete</button>
        </li>
      ))}
    </ul>
  );
}

// Initial state:
const todos = [
  { id: 1, text: 'Buy milk' },
  { id: 2, text: 'Walk dog' },
  { id: 3, text: 'Write code' }
];

// Virtual DOM:
<ul>
  <li key="1">
    <span>Buy milk</span>
    <button>Delete</button>
  </li>
  <li key="2">
    <span>Walk dog</span>
    <button>Delete</button>
  </li>
  <li key="3">
    <span>Write code</span>
    <button>Delete</button>
  </li>
</ul>

// After deleting item 2:
const todos = [
  { id: 1, text: 'Buy milk' },
  { id: 3, text: 'Write code' }
];

// New virtual DOM:
<ul>
  <li key="1">
    <span>Buy milk</span>
    <button>Delete</button>
  </li>
  <li key="3">
    <span>Write code</span>
    <button>Delete</button>
  </li>
</ul>

// Diffing process:
// 1. Compare <ul> elements: same type ✓
// 2. Compare children by key:
//    - key="1": found in both, compare subtree ✓
//    - key="2": not in new tree, remove -
//    - key="3": found in both, compare subtree ✓
// 3. Operations:
//    - Keep <li key="1">
//    - Remove <li key="2">
//    - Keep <li key="3">
// 4. Single DOM operation: remove one <li>

Keys and Diffing:
-----------------

// Without keys (bad performance)
function BadList() {
  const items = ['A', 'B', 'C'];
  
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

// Initial:
<ul>
  <li key="0">A</li>
  <li key="1">B</li>
  <li key="2">C</li>
</ul>

// After inserting 'X' at start:
<ul>
  <li key="0">X</li>
  <li key="1">A</li>
  <li key="2">B</li>
  <li key="3">C</li>
</ul>

// Diffing with index keys:
// key="0": "A" -> "X" (update content)
// key="1": "B" -> "A" (update content)
// key="2": "C" -> "B" (update content)
// key="3": new, insert "C"
// Result: 4 operations!

// With proper keys (good performance)
function GoodList() {
  const items = [
    { id: 'a', text: 'A' },
    { id: 'b', text: 'B' },
    { id: 'c', text: 'C' }
  ];
  
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}

// After inserting item with id='x' at start:
// Diffing with stable keys:
// key="x": new, insert "X"
// key="a": found, keep "A"
// key="b": found, keep "B"
// key="c": found, keep "C"
// Result: 1 operation!

Diffing Edge Cases:
-------------------

// Edge Case 1: Reordering without keys
const items1 = ['A', 'B', 'C'];
const items2 = ['C', 'B', 'A'];

// Without keys:
// - React thinks all items changed
// - Updates every <li> content
// - Inefficient!

// With keys:
// - React recognizes items moved
// - Reorders DOM nodes
// - No content updates needed
// - Efficient!

// Edge Case 2: Component type changes mid-tree
function App() {
  const [type, setType] = useState('input');
  
  return (
    <div>
      {type === 'input' ? (
        <InputField />
      ) : (
        <TextArea />
      )}
    </div>
  );
}

// Changing type:
// - Unmounts InputField (state lost)
// - Mounts TextArea (fresh state)
// - No diffing, full replacement

// Solution: Use same component
function App() {
  const [multiline, setMultiline] = useState(false);
  
  return (
    <div>
      <TextField multiline={multiline} />
    </div>
  );
}

// Now:
// - TextField stays mounted
// - Props updated
// - State preserved

Diffing Performance:
--------------------

// Expensive diffing (avoid)
function SlowList({ items }) {
  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <ExpensiveComponent data={item} />
        </div>
      ))}
    </div>
  );
}

// Every update:
// - Compares all items
// - Re-renders all ExpensiveComponent instances
// - Slow!

// Optimized diffing
const ExpensiveComponent = React.memo(ExpensiveComponent);

function FastList({ items }) {
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <ExpensiveComponent data={item} />
        </div>
      ))}
    </div>
  );
}

// Only changed items:
// - Diffing identifies changed items by stable key
// - React.memo prevents re-render if data unchanged
// - Fast!

Diffing Algorithm Steps:
-------------------------

// Step 1: Compare root elements
function diffTrees(oldTree, newTree) {
  // Different types? Replace entire tree
  if (oldTree.type !== newTree.type) {
    return ['REPLACE', newTree];
  }
  
  // Same type, continue diffing
  return diffElement(oldTree, newTree);
}

// Step 2: Compare attributes
function diffElement(oldElement, newElement) {
  const patches = [];
  
  // Diff props
  const oldProps = oldElement.props || {};
  const newProps = newElement.props || {};
  
  // Find changed/removed props
  Object.keys(oldProps).forEach(key => {
    if (newProps[key] !== oldProps[key]) {
      patches.push(['UPDATE_PROP', key, newProps[key]]);
    }
  });
  
  // Find new props
  Object.keys(newProps).forEach(key => {
    if (!(key in oldProps)) {
      patches.push(['ADD_PROP', key, newProps[key]]);
    }
  });
  
  // Diff children
  patches.push(...diffChildren(oldElement.children, newElement.children));
  
  return patches;
}

// Step 3: Diff children
function diffChildren(oldChildren, newChildren) {
  const patches = [];
  const maxLength = Math.max(oldChildren.length, newChildren.length);
  
  for (let i = 0; i < maxLength; i++) {
    patches.push(diff(oldChildren[i], newChildren[i], i));
  }
  
  return patches;
}

// Step 4: Apply patches to DOM
function applyPatches(domNode, patches) {
  patches.forEach(patch => {
    const [type, ...args] = patch;
    
    switch (type) {
      case 'REPLACE':
        domNode.replaceWith(createDOM(args[0]));
        break;
      case 'UPDATE_PROP':
        domNode.setAttribute(args[0], args[1]);
        break;
      case 'ADD_PROP':
        domNode.setAttribute(args[0], args[1]);
        break;
      case 'REMOVE':
        domNode.remove();
        break;
    }
  });
}

Optimizing Diffing:
-------------------

// 1. Use proper keys
<ul>
  {items.map(item => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>

// 2. Keep element types consistent
// ❌ Bad
{condition ? <div>...</div> : <span>...</span>}

// ✅ Good
<div className={condition ? 'class-a' : 'class-b'}>...</div>

// 3. Memoize expensive components
const HeavyComponent = React.memo(HeavyComponent);

// 4. Avoid inline objects/arrays in props
// ❌ Bad
<Component data={{ value: 1 }} />

// ✅ Good
const data = useMemo(() => ({ value: 1 }), []);
<Component data={data} />

// 5. Split components for granular updates
// ❌ Bad - entire list re-renders
function BigList({ items, filter }) {
  const filtered = items.filter(i => i.category === filter);
  return filtered.map(item => <Item item={item} />);
}

// ✅ Good - only Filter re-renders
function BigList({ items }) {
  return items.map(item => <Item item={item} />);
}

function FilteredList({ items, filter }) {
  const filtered = useMemo(
    () => items.filter(i => i.category === filter),
    [items, filter]
  );
  return <BigList items={filtered} />;
}

Summary:

Diffing Algorithm:
- Compares old and new virtual DOM trees
- O(n) complexity (linear time)
- Finds minimal set of changes
- Uses heuristics for speed
- Different types = replace tree
- Same types = update attributes
- Keys identify stable elements
- Recurses on children
- Enables efficient DOM updates
- Foundation of React performance
*/


/**
81. What is hydration in React?
-------------------------------

Hydration is the process of attaching React event handlers and state to server-rendered
HTML, making it interactive. The HTML is already present (from SSR), and hydration
"brings it to life" on the client.

Server-Side Rendering (SSR) + Hydration Flow:
----------------------------------------------

// 1. Server renders HTML
// Server:
import { renderToString } from 'react-dom/server';

const html = renderToString(<App />);
// Returns: "<div><h1>Hello</h1><button>Click me</button></div>"

// Send to client:
res.send(`
  <!DOCTYPE html>
  <html>
    <body>
      <div id="root">${html}</div>
      <script src="/bundle.js"></script>
    </body>
  </html>
`);

// 2. Browser receives HTML
// - Parses HTML immediately
// - Renders UI (users see content)
// - Downloads JavaScript bundle
// - JavaScript executes
// - Hydration begins

// 3. Client hydrates
// Client:
import { hydrateRoot } from 'react-dom/client';

hydrateRoot(document.getElementById('root'), <App />);

// React:
// - Creates virtual DOM from <App />
// - Compares with existing HTML
// - Attaches event handlers
// - Sets up state management
// - Makes page interactive

Why Hydration:
--------------

// Without SSR (Client-only rendering):

// 1. Browser loads HTML
<html>
  <body>
    <div id="root"></div>  {/* Empty! * /}
    <script src="/bundle.js"></script>
  </body>
</html>

// 2. JavaScript downloads and executes
// 3. React renders UI
// 4. User sees content

// Timeline:
// 0ms:    Browser receives HTML (blank page)
// 0-500ms: Downloading JavaScript
// 500ms:  JavaScript executes, React renders
// 500ms:  User finally sees content

// With SSR + Hydration:

// 1. Browser loads HTML
<html>
  <body>
    <div id="root">
      {/* Already has content! * /}
      <h1>Hello</h1>
      <button>Click me</button>
    </div>
    <script src="/bundle.js"></script>
  </body>
</html>

// Timeline:
// 0ms:    User sees content (from HTML)
// 0-500ms: JavaScript downloading (user sees content)
// 500ms:  Hydration completes (interactive)

// Benefits:
// - Faster First Contentful Paint (FCP)
// - Better SEO (search engines see content)
// - Better perceived performance

Hydration Process:
------------------

function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Counter</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

// Server renders to HTML:
<div>
  <h1>Counter</h1>
  <p>Count: 0</p>
  <button>Increment</button>
</div>

// Client hydrates:
hydrateRoot(document.getElementById('root'), <App />);

// React:
// 1. Renders <App /> in memory (virtual DOM)
// 2. Compares with existing HTML
// 3. Verifies markup matches
// 4. Attaches onClick handler to button
// 5. Sets up useState hook
// 6. Button now interactive!

Hydration vs Render:
--------------------

// render() - Client-only
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

// - Expects empty container
// - Creates all DOM nodes from scratch
// - No existing HTML expected

// hydrateRoot() - After SSR
import { hydrateRoot } from 'react-dom/client';

hydrateRoot(document.getElementById('root'), <App />);

// - Expects existing HTML
// - Reuses DOM nodes
// - Only attaches handlers/state
// - More efficient

Hydration Mismatches:
---------------------

// Mismatch causes re-render and warning

// Server:
function App() {
  return <div>{new Date().toString()}</div>;
}

// Renders: <div>Sun Dec 14 2025 13:54:00</div>

// Client (later):
function App() {
  return <div>{new Date().toString()}</div>;
}

// Renders: <div>Sun Dec 14 2025 13:54:01</div>

// Different!
// Console warning: "Hydration failed because the initial UI does not match..."
// React throws away server HTML and re-renders client-side
// Defeats purpose of SSR!

// Common mismatch causes:

// 1. Different data on server vs client
// ❌ Bad
function RandomNumber() {
  return <div>{Math.random()}</div>;
}

// 2. Browser-only APIs
// ❌ Bad
function Component() {
  return <div>{window.innerWidth}</div>;
}

// 3. Date/Time without synchronization
// ❌ Bad
function Clock() {
  return <div>{new Date().toISOString()}</div>;
}

// Solutions:

// Solution 1: Use useEffect for client-only code
function Component() {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  
  return <div>Width: {width || 'Loading...'}</div>;
}

// Server renders: "Width: Loading..."
// Client hydrates: "Width: Loading..."
// useEffect runs: "Width: 1920"
// No mismatch!

// Solution 2: Suppress hydration warning (rare!)
function Component() {
  return (
    <div suppressHydrationWarning>
      {new Date().toString()}
    </div>
  );
}

// Tells React: "I know these will differ, don't warn me"
// Use sparingly!

// Solution 3: Two-pass rendering
function Component() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    // Server and initial client render
    return <div>Loading...</div>;
  }
  
  // Only after hydration
  return <div>{Math.random()}</div>;
}

Selective Hydration (React 18):
--------------------------------

// React 18 allows hydrating parts incrementally

import { lazy, Suspense } from 'react';
import { hydrateRoot } from 'react-dom/client';

const Comments = lazy(() => import('./Comments'));
const Sidebar = lazy(() => import('./Sidebar'));

function App() {
  return (
    <div>
      <Header />
      <MainContent />
      
      <Suspense fallback={<div>Loading comments...</div>}>
        <Comments />
      </Suspense>
      
      <Suspense fallback={<div>Loading sidebar...</div>}>
        <Sidebar />
      </Suspense>
    </div>
  );
}

hydrateRoot(document.getElementById('root'), <App />);

// Hydration order:
// 1. Header and MainContent hydrate immediately
// 2. Comments and Sidebar hydrate when JS loads
// 3. Can interact with Header while Comments loads!
// 4. Prioritizes user interaction

// If user clicks in Comments before it hydrates:
// - React prioritizes hydrating Comments
// - Sidebar waits
// - Better interactivity!

Progressive Hydration Example:
-------------------------------

// Server renders everything:
<html>
  <body>
    <div id="root">
      <header>Header content</header>
      <main>Main content</main>
      <div class="comments">100 comments...</div>
      <aside class="sidebar">Sidebar...</aside>
    </div>
  </body>
</html>

// Client hydrates progressively:

// Time 0ms: User sees all content
// Time 100ms: Header interactive
// Time 200ms: Main interactive
// Time 300ms: User clicks on comments section
// Time 310ms: Comments hydrated (prioritized!)
// Time 400ms: Sidebar hydrates

// Without selective hydration:
// - Must wait for all JS to download
// - Hydrate everything before anything interactive
// - Slower time to interactive

Partial Hydration:
-------------------

// Some components never hydrate (static content)

function Article({ content }) {
  return (
    <div>
      <ArticleHeader />
      
      {/* Static content, no hydration needed * /}
      <div dangerouslySetInnerHTML={{ __html: content }} />
      
      {/* Interactive comments * /}
      <Comments />
    </div>
  );
}

// Benefits:
// - Less JavaScript shipped
// - Faster hydration
// - Lower memory usage

Full Example: Blog Post
------------------------

// Server (Node.js):
import { renderToString } from 'react-dom/server';
import BlogPost from './BlogPost';

app.get('/post/:id', async (req, res) => {
  const post = await fetchPost(req.params.id);
  const html = renderToString(<BlogPost post={post} />);
  
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${post.title}</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_DATA__ = ${JSON.stringify(post)};
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `);
});

// Client:
import { hydrateRoot } from 'react-dom/client';
import BlogPost from './BlogPost';

// Get data from server
const post = window.__INITIAL_DATA__;

// Hydrate with same data
hydrateRoot(
  document.getElementById('root'),
  <BlogPost post={post} />
);

// Now interactive!

Debugging Hydration Issues:
----------------------------

// Enable React DevTools
// Shows hydration warnings clearly

// Check console for:
// "Warning: Text content did not match..."
// "Warning: Expected server HTML to contain..."
// "Warning: Did not expect server HTML to contain..."

// Common fixes:

// 1. Wrap client-only code in useEffect
useEffect(() => {
  // Client-only code here
}, []);

// 2. Use suppressHydrationWarning sparingly
<div suppressHydrationWarning>
  {clientOnlyContent}
</div>

// 3. Ensure same data on server and client
// Pass data via window.__INITIAL_DATA__

// 4. Avoid Math.random(), Date.now() during render
// Use useEffect instead

Summary:

Hydration:
- Attaches React to server-rendered HTML
- Makes static HTML interactive
- Reuses existing DOM nodes
- Faster initial page load
- Better SEO
- Use hydrateRoot() instead of createRoot()
- Must match server HTML exactly
- React 18 enables selective/progressive hydration
- Critical for SSR applications
- Improves Time to Interactive (TTI)
*/


/**
82. What is server-side rendering (SSR)?
----------------------------------------

Server-Side Rendering (SSR) is the process of rendering React components to HTML
on the server and sending fully-rendered HTML to the client. The client then
"hydrates" the HTML to make it interactive.

SSR vs Client-Side Rendering (CSR):
------------------------------------

// Client-Side Rendering (CSR):
// 1. Server sends minimal HTML + JavaScript bundle
// 2. Browser downloads JavaScript
// 3. JavaScript executes
// 4. React renders UI
// 5. User sees content

// HTML sent by server:
<!DOCTYPE html>
<html>
  <body>
    <div id="root"></div>  {/* Empty! * /}
    <script src="/bundle.js"></script>
  </body>
</html>

// Server-Side Rendering (SSR):
// 1. Server renders React to HTML
// 2. Server sends fully-rendered HTML
// 3. User sees content immediately
// 4. JavaScript downloads in background
// 5. Hydration makes it interactive

// HTML sent by server:
<!DOCTYPE html>
<html>
  <body>
    <div id="root">
      {/* Already has content! * /}
      <div class="app">
        <header><h1>My App</h1></header>
        <main><p>Content here...</p></main>
      </div>
    </div>
    <script src="/bundle.js"></script>
  </body>
</html>

Basic SSR Setup:
----------------

// Server (Node.js + Express):
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

const app = express();

app.get('*', (req, res) => {
  // Render React component to HTML string
  const html = renderToString(<App />);
  
  // Send complete HTML
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>My SSR App</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `);
});

app.listen(3000);

// Client (browser):
import { hydrateRoot } from 'react-dom/client';
import App from './App';

hydrateRoot(document.getElementById('root'), <App />);

SSR with Data Fetching:
-----------------------

// App component:
function App({ posts }) {
  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

// Server:
app.get('/', async (req, res) => {
  // 1. Fetch data on server
  const posts = await fetchPosts();
  
  // 2. Render with data
  const html = renderToString(<App posts={posts} />);
  
  // 3. Send HTML + data
  res.send(`
    <!DOCTYPE html>
    <html>
      <body>
        <div id="root">${html}</div>
        <script>
          // Pass data to client
          window.__INITIAL_DATA__ = ${JSON.stringify({ posts })};
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `);
});

// Client:
const initialData = window.__INITIAL_DATA__;
hydrateRoot(
  document.getElementById('root'),
  <App posts={initialData.posts} />
);

SSR Benefits:
-------------

// 1. Faster First Contentful Paint (FCP)
// User sees content immediately, not after JavaScript loads

// CSR: 0ms (blank) -> 500ms (content)
// SSR: 0ms (content) -> 500ms (interactive)

// 2. Better SEO
// Search engines see fully-rendered HTML

// CSR: <div id="root"></div> (no content for crawlers)
// SSR: <div id="root"><h1>Title</h1><p>Content...</p></div>

// 3. Social Media Sharing
// Meta tags populated for rich previews

app.get('/post/:id', async (req, res) => {
  const post = await fetchPost(req.params.id);
  
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${post.title}</title>
        <meta property="og:title" content="${post.title}">
        <meta property="og:description" content="${post.excerpt}">
        <meta property="og:image" content="${post.image}">
      </head>
      <body>
        <div id="root">${renderToString(<Post post={post} />)}</div>
      </body>
    </html>
  `);
});

// 4. Better Performance on Slow Devices
// Less JavaScript to parse and execute

SSR Challenges:
---------------

// 1. Server Load
// Server must render every request

// Solution: Caching
const cache = new Map();

app.get('/post/:id', async (req, res) => {
  const { id } = req.params;
  
  // Check cache
  if (cache.has(id)) {
    return res.send(cache.get(id));
  }
  
  // Render and cache
  const post = await fetchPost(id);
  const html = renderToString(<Post post={post} />);
  cache.set(id, html);
  
  res.send(html);
});

// 2. Longer Time to Interactive (TTI)
// Must download JavaScript before interactive

// Timeline:
// 0ms: User sees content (FCP)
// 0-500ms: Downloading JavaScript
// 500ms: Hydration begins
// 600ms: Interactive (TTI)

// CSR Timeline:
// 0ms: Blank page
// 0-500ms: Downloading JavaScript
// 500ms: React renders (FCP)
// 600ms: Interactive (TTI)

// SSR: Better FCP, same TTI
// CSR: Worse FCP, same TTI

// 3. Code Complexity
// Must work on server and client

// ❌ Won't work on server:
function Component() {
  const width = window.innerWidth; // window not defined on server!
  return <div>{width}</div>;
}

// ✅ Works on both:
function Component() {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    setWidth(window.innerWidth); // Only runs on client
  }, []);
  
  return <div>{width || 'Loading...'}</div>;
}

// 4. Build Complexity
// Need two builds: server and client

// webpack.server.js (Node.js target)
module.exports = {
  target: 'node',
  entry: './server.js',
  output: {
    filename: 'server.bundle.js'
  }
};

// webpack.client.js (Browser target)
module.exports = {
  target: 'web',
  entry: './client.js',
  output: {
    filename: 'client.bundle.js'
  }
};

SSR with React 18 Features:
----------------------------

// renderToString (Legacy):
import { renderToString } from 'react-dom/server';

const html = renderToString(<App />);
// Returns complete HTML string
// Blocks until entire tree rendered
// Doesn't support Suspense

// renderToPipeableStream (React 18):
import { renderToPipeableStream } from 'react-dom/server';

app.get('/', (req, res) => {
  const { pipe } = renderToPipeableStream(<App />, {
    onShellReady() {
      res.setHeader('Content-Type', 'text/html');
      pipe(res); // Start streaming HTML
    }
  });
});

// Benefits:
// - Streams HTML as it's ready
// - Supports Suspense
// - Better Time to First Byte (TTFB)
// - Server can start sending before everything rendered

// Streaming SSR Example:
import { Suspense, lazy } from 'react';

const Comments = lazy(() => import('./Comments'));

function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
      
      {/* Stream this later * /}
      <Suspense fallback={<div>Loading comments...</div>}>
        <Comments postId={post.id} />
      </Suspense>
    </article>
  );
}

// Server sends:
// 1. Initial HTML with article and fallback
// 2. Comments HTML when ready (streamed)
// 3. Script to replace fallback with comments

SSR Frameworks:
---------------

// 1. Next.js (Most popular)
// pages/index.js
export async function getServerSideProps() {
  const posts = await fetchPosts();
  return { props: { posts } };
}

export default function Home({ posts }) {
  return (
    <div>
      {posts.map(post => <Post key={post.id} post={post} />)}
    </div>
  );
}

// 2. Remix
// routes/index.tsx
export async function loader() {
  const posts = await fetchPosts();
  return json({ posts });
}

export default function Index() {
  const { posts } = useLoaderData();
  return (
    <div>
      {posts.map(post => <Post key={post.id} post={post} />)}
    </div>
  );
}

// 3. Gatsby (Hybrid SSG/SSR)
// gatsby-node.js
exports.createPages = async ({ actions }) => {
  const posts = await fetchPosts();
  posts.forEach(post => {
    actions.createPage({
      path: `/post/${post.id}`,
      component: require.resolve('./src/templates/post.js'),
      context: { post }
    });
  });
};

When to Use SSR:
----------------

// ✅ Use SSR for:
// - Content-heavy sites (blogs, news)
// - E-commerce product pages
// - Marketing pages
// - Social media shareable content
// - SEO-critical pages

// ❌ Don't use SSR for:
// - Dashboards (authenticated)
// - Internal tools
// - Real-time apps
// - Apps with lots of user interaction

// Alternative: Static Site Generation (SSG)
// Pre-render pages at build time
// Serve static HTML
// Best of both worlds for content that doesn't change often

Summary:

Server-Side Rendering (SSR):
- Renders React on server
- Sends HTML to client
- Client hydrates HTML
- Faster First Contentful Paint
- Better SEO
- Social media meta tags
- Requires server
- More complex setup
- Higher server load
- Use for content-heavy, SEO-critical sites
- React 18 enables streaming SSR
- Frameworks: Next.js, Remix, Gatsby
*/


/**
83. What is static site generation (SSG)?
-----------------------------------------

Static Site Generation (SSG) is the process of pre-rendering pages at build time,
generating static HTML files that can be served directly. No server rendering
needed for each request.

SSG vs SSR vs CSR:
------------------

// Client-Side Rendering (CSR):
// 1. Server sends empty HTML
// 2. Browser downloads JavaScript
// 3. React renders content
// 4. Content appears

// Server-Side Rendering (SSR):
// 1. User requests page
// 2. Server renders React to HTML
// 3. Server sends HTML
// 4. User sees content
// 5. JavaScript hydrates

// Static Site Generation (SSG):
// 1. At build time, render all pages to HTML
// 2. Deploy static HTML files
// 3. User requests page
// 4. CDN serves pre-rendered HTML instantly
// 5. JavaScript hydrates

Basic SSG Example:
------------------

// Build time (during deployment):
import { renderToString } from 'react-dom/server';
import fs from 'fs';

// Generate homepage
const homeHtml = renderToString(<HomePage />);
fs.writeFileSync('dist/index.html', `
  <!DOCTYPE html>
  <html>
    <body>
      <div id="root">${homeHtml}</div>
      <script src="/bundle.js"></script>
    </body>
  </html>
`);

// Generate about page
const aboutHtml = renderToString(<AboutPage />);
fs.writeFileSync('dist/about.html', `
  <!DOCTYPE html>
  <html>
    <body>
      <div id="root">${aboutHtml}</div>
      <script src="/bundle.js"></script>
    </body>
  </html>
`);

// Deploy dist/ folder to CDN
// Users get instant HTML, no server rendering!

SSG with Data:
--------------

// Build script:
async function generateBlogPosts() {
  // Fetch all posts at build time
  const posts = await fetchAllPosts();
  
  // Generate HTML for each post
  for (const post of posts) {
    const html = renderToString(<BlogPost post={post} />);
    
    fs.writeFileSync(`dist/posts/${post.slug}.html`, `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${post.title}</title>
          <meta name="description" content="${post.excerpt}">
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
            window.__INITIAL_DATA__ = ${JSON.stringify({ post })};
          </script>
          <script src="/bundle.js"></script>
        </body>
      </html>
    `);
  }
}

// Run at build time
generateBlogPosts();

// Result: 100 blog posts = 100 HTML files
// dist/posts/first-post.html
// dist/posts/second-post.html
// ...

SSG Benefits:
-------------

// 1. Blazing Fast
// No server rendering, just static files
// Served from CDN edge locations
// Sub-100ms response times

// 2. Cheap/Free Hosting
// No server needed
// Host on Netlify, Vercel, GitHub Pages, S3
// Pay only for CDN bandwidth

// 3. Perfect SEO
// Fully-rendered HTML from first request
// No JavaScript required for search engines

// 4. Scalability
// Handles millions of users
// No server to crash
// CDN handles traffic spikes

// 5. Security
// No server = no server vulnerabilities
// No database connections
// Static files only

SSG with Next.js:
-----------------

// pages/index.js
export async function getStaticProps() {
  // Runs at build time
  const posts = await fetchPosts();
  
  return {
    props: { posts }
  };
}

export default function Home({ posts }) {
  return (
    <div>
      <h1>Blog</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

// Dynamic routes:
// pages/posts/[slug].js
export async function getStaticPaths() {
  // Generate paths at build time
  const posts = await fetchAllPosts();
  
  return {
    paths: posts.map(post => ({
      params: { slug: post.slug }
    })),
    fallback: false // 404 for paths not generated
  };
}

export async function getStaticProps({ params }) {
  // Fetch data for specific post
  const post = await fetchPost(params.slug);
  
  return {
    props: { post }
  };
}

export default function Post({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}

// Build command generates:
// /index.html
// /posts/first-post.html
// /posts/second-post.html
// /posts/third-post.html

Incremental Static Regeneration (ISR):
---------------------------------------

// Problem: Content changes after build
// SSG: Must rebuild entire site
// SSR: Server renders every request

// ISR: Best of both worlds
// - Serve static HTML
// - Rebuild specific pages on demand

// Next.js ISR:
export async function getStaticProps() {
  const posts = await fetchPosts();
  
  return {
    props: { posts },
    revalidate: 60 // Rebuild every 60 seconds
  };
}

// How it works:
// 1. User requests /blog
// 2. Serve cached HTML (instant)
// 3. Check if > 60 seconds old
// 4. If yes, rebuild in background
// 5. Next request gets fresh HTML

// Timeline:
// 0:00 - Build site, cache blog page
// 0:30 - User A requests /blog -> cached HTML (fast!)
// 1:00 - User B requests /blog -> cached HTML + triggers rebuild
// 1:05 - Rebuild completes
// 1:10 - User C requests /blog -> fresh HTML

SSG with Gatsby:
----------------

// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/posts`
      }
    },
    'gatsby-transformer-remark'
  ]
};

// gatsby-node.js
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  
  // Query all posts
  const result = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
          id
          frontmatter {
            slug
          }
        }
      }
    }
  `);
  
  // Create page for each post
  result.data.allMarkdownRemark.nodes.forEach(node => {
    createPage({
      path: `/posts/${node.frontmatter.slug}`,
      component: require.resolve('./src/templates/blog-post.js'),
      context: {
        id: node.id
      }
    });
  });
};

// src/templates/blog-post.js
import { graphql } from 'gatsby';

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        date
      }
      html
    }
  }
`;

export default function BlogPost({ data }) {
  const { markdownRemark } = data;
  
  return (
    <article>
      <h1>{markdownRemark.frontmatter.title}</h1>
      <time>{markdownRemark.frontmatter.date}</time>
      <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
    </article>
  );
}

When to Use SSG:
----------------

// ✅ Use SSG for:
// - Marketing websites
// - Blogs
// - Documentation sites
// - Landing pages
// - Portfolio sites
// - Product catalogs (that don't change often)

// Example: Blog
const pages = [
  '/index.html',           // Homepage
  '/about.html',          // About
  '/posts/post-1.html',   // Blog posts
  '/posts/post-2.html',
  // ...
];
// All pre-rendered at build time

// ❌ Don't use SSG for:
// - User dashboards (personalized content)
// - Real-time data (stock prices)
// - User-generated content (comments in real-time)
// - Frequently changing data

// Example: Dashboard
// - Shows user's personal data
// - Different for every user
// - Can't pre-render
// - Use SSR or CSR instead

Hybrid Approach:
----------------

// Next.js allows mixing SSG, SSR, and CSR

// pages/index.js (SSG)
export async function getStaticProps() {
  const posts = await fetchPosts();
  return { props: { posts }, revalidate: 3600 };
}

// pages/dashboard.js (SSR)
export async function getServerSideProps({ req }) {
  const user = await getUserFromSession(req);
  return { props: { user } };
}

// pages/profile.js (CSR)
export default function Profile() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetch('/api/user').then(r => r.json()).then(setUser);
  }, []);
  
  if (!user) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}

// Choose strategy per page!

Build Process:
--------------

// package.json
{
  "scripts": {
    "build": "next build && next export"
  }
}

// Run build:
$ npm run build

// Next.js:
// 1. Calls getStaticProps for each page
// 2. Fetches data
// 3. Renders pages to HTML
// 4. Writes HTML files to out/ directory
// 5. Copies static assets

// Output:
out/
  index.html
  about.html
  posts/
    first-post.html
    second-post.html
  _next/
    static/
      chunks/
      css/

// Deploy out/ directory to CDN

Performance Comparison:
-----------------------

// Request Timeline:

// CSR:
// 0ms:    Request sent
// 50ms:   HTML received (empty)
// 150ms:  JS downloaded
// 200ms:  JS parsed
// 250ms:  React rendered
// 300ms:  API call
// 400ms:  Data received
// 450ms:  Content displayed
// Total: 450ms to content

// SSR:
// 0ms:    Request sent
// 200ms:  HTML received (with content)
// 250ms:  JS downloaded
// 300ms:  Hydration complete
// Total: 200ms to content, 300ms to interactive

// SSG:
// 0ms:    Request sent
// 20ms:   HTML received from CDN (with content)
// 100ms:  JS downloaded
// 150ms:  Hydration complete
// Total: 20ms to content, 150ms to interactive

// SSG is fastest!

Summary:

Static Site Generation (SSG):
- Pre-render pages at build time
- Generate static HTML files
- Serve from CDN
- Blazing fast performance
- Perfect SEO
- Cheap hosting
- Excellent scalability
- Best for content that doesn't change often
- Incremental Static Regeneration for updating
- Frameworks: Next.js, Gatsby, Astro
- Can mix with SSR and CSR
- Industry best practice for content sites
*/


/**
84. What is React Fiber?
------------------------

React Fiber is a complete rewrite of React's core reconciliation algorithm introduced
in React 16. It enables incremental rendering, allowing React to split work into chunks,
pause and resume rendering, and prioritize updates for a more responsive user experience.

Before Fiber (React 15 and earlier):
------------------------------------

// Stack Reconciler:
// - Synchronous rendering
// - Once started, can't stop
// - Blocks main thread
// - Janky animations during large updates

function renderTree(element) {
  // Render all children recursively
  const children = element.children.map(renderTree);
  
  // Create DOM node
  const node = createElement(element.type);
  children.forEach(child => node.appendChild(child));
  
  return node;
}

// Problem: Large trees block UI
const tree = (
  <div>
    {[...Array(10000)].map((_, i) => <Item key={i} />)}
  </div>
);

renderTree(tree); // Blocks for 100ms+
// User can't click, scroll, or type during render!

With Fiber (React 16+):
-----------------------

// Fiber Reconciler:
// - Incremental rendering
// - Can pause and resume work
// - Prioritizes updates
// - Keeps UI responsive
// - Enables concurrent features

// Can split 100ms render into 10ms chunks
// Yield to browser between chunks
// Handle user input immediately

What is a Fiber?
----------------

// A Fiber is a JavaScript object representing a unit of work
// Each component has a corresponding fiber node

// Fiber Node Structure:
const fiberNode = {
  // Component info
  type: 'div',              // Type of element/component
  key: 'unique-key',        // Key for reconciliation
  
  // Instance
  stateNode: DOMNode,       // Reference to actual DOM node or component instance
  
  // Relationships (Linked List)
  return: parentFiber,      // Parent fiber
  child: firstChildFiber,   // First child
  sibling: nextSiblingFiber, // Next sibling
  
  // Work tracking
  pendingProps: {},         // Props for this render
  memoizedProps: {},        // Props from last render
  memoizedState: {},        // State from last render
  
  // Effects
  effectTag: 'UPDATE',      // What needs to happen (PLACEMENT, UPDATE, DELETION)
  nextEffect: nextFiber,    // Next fiber with effects
  
  // Scheduling
  lanes: 0,                 // Priority of work
  
  // Double buffering
  alternate: wipFiber       // Reference to work-in-progress fiber
};

Fiber Tree Structure:
---------------------

// React component tree:
<App>
  <Header>
    <Logo />
    <Nav />
  </Header>
  <Content>
    <Sidebar />
    <Main />
  </Content>
</App>

// Corresponding Fiber tree (linked list):
//
//        App
//         |
//         ↓ (child)
//      Header → Content (sibling)
//         |         |
//         ↓         ↓ (child)
//      Logo → Nav  Sidebar → Main (sibling)
//         ↑         ↑
//         | (return/parent)

// Each arrow represents a pointer:
// - child: First child
// - sibling: Next sibling
// - return: Parent

// Traversal order:
// App → Header → Logo → Nav → Content → Sidebar → Main

Key Features of Fiber:
----------------------

// 1. Incremental Rendering
// Work split into units that can be paused

function workLoop(deadline) {
  let shouldYield = false;
  
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    
    // Check if we have time remaining
    shouldYield = deadline.timeRemaining() < 1;
  }
  
  if (nextUnitOfWork) {
    // More work to do, schedule next frame
    requestIdleCallback(workLoop);
  } else {
    // All work done, commit to DOM
    commitRoot();
  }
}

requestIdleCallback(workLoop);

// React yields control back to browser every few milliseconds
// Keeps UI responsive even during large updates

// 2. Priority Levels
// Different updates have different priorities

const priorities = {
  Immediate: 1,        // User input (clicks, typing)
  UserBlocking: 2,     // Needs to complete quickly (hover, scroll)
  Normal: 3,           // Most updates (data fetching)
  Low: 4,              // Can be deferred (analytics)
  Idle: 5              // Nice to have (prefetching)
};

// Example:
function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  const handleChange = (e) => {
    // High priority - update input immediately
    setQuery(e.target.value);
    
    // Low priority - update results when time available
    startTransition(() => {
      const filtered = expensiveFilter(e.target.value);
      setResults(filtered);
    });
  };
  
  return (
    <div>
      <input value={query} onChange={handleChange} />
      <Results results={results} />
    </div>
  );
}

// 3. Time Slicing
// Break work into slices, yield between slices

// Without time slicing:
// [====== 100ms render ======] (UI frozen)

// With time slicing:
// [5ms]--[5ms]--[5ms]--[5ms]--[5ms]...
//      ↑      ↑      ↑      ↑
//      Browser can handle events here

// 4. Suspense
// Fiber enables Suspense for data/code loading

function Component() {
  const data = use(fetchData()); // Suspends if not ready
  return <div>{data}</div>;
}

<Suspense fallback={<Loading />}>
  <Component />
</Suspense>

// Fiber pauses rendering while waiting for data
// Shows fallback UI
// Resumes when data ready

Two-Phase Architecture:
------------------------

// Phase 1: Render Phase (Interruptible)
// - Build work-in-progress fiber tree
// - Call render methods
// - Compute diffs
// - Can be paused/aborted
// - Pure, no side effects

function renderPhase() {
  // Build new fiber tree
  const workInProgress = createWorkInProgress(currentFiber);
  
  // Call component functions
  const element = Component(props);
  
  // Reconcile children
  reconcileChildren(workInProgress, element);
  
  // Mark effects needed
  workInProgress.effectTag = 'UPDATE';
  
  // Can pause here if higher priority work arrives
  if (hasHigherPriorityWork()) {
    return; // Resume later
  }
  
  // Continue with next unit of work
  performUnitOfWork(nextFiber);
}

// Phase 2: Commit Phase (Synchronous, Cannot be interrupted)
// - Apply changes to DOM
// - Run lifecycle methods
// - Run useLayoutEffect
// - Schedule useEffect
// - Must complete once started

function commitPhase() {
  // Apply all DOM mutations
  commitMutations(finishedWork);
  
  // Update refs
  commitRefs(finishedWork);
  
  // Run useLayoutEffect
  commitLayoutEffects(finishedWork);
  
  // Switch current tree pointer
  currentRoot = finishedWork;
  
  // Schedule useEffect (after paint)
  scheduleEffects(finishedWork);
}

Double Buffering:
-----------------

// Fiber uses two trees:
// 1. Current tree - what's on screen
// 2. Work-in-progress tree - being built

// Current tree:
App (v1)
  └─ Component (v1)

// Update triggered, create work-in-progress tree:
App (v2) WIP
  └─ Component (v2) WIP

// Each fiber has 'alternate' pointer:
currentFiber.alternate = workInProgressFiber;
workInProgressFiber.alternate = currentFiber;

// After commit, swap pointers:
currentRoot = workInProgressRoot;

// Old current becomes new work-in-progress for next update
// Reuses memory, avoids garbage collection

Reconciliation with Fiber:
---------------------------

function reconcileChildren(fiber, elements) {
  let index = 0;
  let oldFiber = fiber.alternate?.child;
  let prevSibling = null;
  
  while (index < elements.length || oldFiber) {
    const element = elements[index];
    let newFiber = null;
    
    // Compare old and new
    const sameType = oldFiber && element && 
                     oldFiber.type === element.type;
    
    if (sameType) {
      // Update existing fiber
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        stateNode: oldFiber.stateNode,
        parent: fiber,
        alternate: oldFiber,
        effectTag: 'UPDATE'
      };
    }
    
    if (element && !sameType) {
      // New element, create fiber
      newFiber = {
        type: element.type,
        props: element.props,
        stateNode: null,
        parent: fiber,
        alternate: null,
        effectTag: 'PLACEMENT'
      };
    }
    
    if (oldFiber && !sameType) {
      // Old element removed
      oldFiber.effectTag = 'DELETION';
      deletions.push(oldFiber);
    }
    
    // Link siblings
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }
    
    prevSibling = newFiber;
    index++;
    oldFiber = oldFiber?.sibling;
  }
}

Work Loop:
----------

// Simplified work loop
let nextUnitOfWork = null;
let currentRoot = null;
let workInProgressRoot = null;

function workLoop(deadline) {
  let shouldYield = false;
  
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  
  if (!nextUnitOfWork && workInProgressRoot) {
    // Render phase complete, commit
    commitRoot();
  }
  
  requestIdleCallback(workLoop);
}

function performUnitOfWork(fiber) {
  // 1. Render this fiber
  if (fiber.type instanceof Function) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }
  
  // 2. Return next unit of work
  if (fiber.child) {
    return fiber.child; // Process children first
  }
  
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling; // Process siblings
    }
    nextFiber = nextFiber.return; // Go up to parent
  }
  
  return null; // All work done
}

requestIdleCallback(workLoop);

Benefits of Fiber:
------------------

// 1. Better Performance
// - Splits work into chunks
// - Doesn't block main thread
// - Smooth animations even during updates

// 2. Better User Experience
// - Prioritizes user input
// - Keeps UI responsive
// - No janky interactions

// 3. Enables New Features
// - Concurrent Mode
// - Suspense
// - startTransition
// - useDeferredValue
// - Automatic batching

// 4. Better Error Handling
// - Error boundaries work better
// - Can recover from errors
// - Doesn't crash entire app

// 5. Scheduling
// - High priority updates interrupt low priority
// - Time-sensitive updates processed first
// - Background updates when idle

Real-World Example:
-------------------

// Large list update with Fiber

function ItemList({ items }) {
  return (
    <div>
      {items.map(item => <Item key={item.id} data={item} />)}
    </div>
  );
}

// User adds 1000 items:
setItems([...items, ...new1000Items]);

// Without Fiber (React 15):
// - Renders all 1000 items synchronously
// - Blocks for ~200ms
// - UI frozen
// - User can't interact

// With Fiber (React 16+):
// - Splits into ~40 chunks of 25 items each
// - Renders chunk 1 (5ms)
// - Yields to browser
// - User can click, scroll
// - Renders chunk 2 (5ms)
// - Yields to browser
// - ... continues ...
// - All chunks complete in ~200ms total
// - But UI never frozen!

Fiber Reconciliation Example:
------------------------------

// Update scenario:
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

// Click button:

// 1. Fiber Work Phase (Render):
// - Current fiber tree:
//   div → h1 ("Count: 0") → button
//
// - Create work-in-progress tree:
//   div → h1 ("Count: 1") → button
//
// - Compare trees:
//   div: same ✓
//   h1: text changed, mark UPDATE
//   button: same ✓
//
// - Build effect list: [h1]

// 2. Commit Phase:
// - Apply effects:
//   h1.textContent = "Count: 1"
//
// - Switch trees:
//   currentRoot = workInProgressRoot

// 3. Result:
// - Only h1 text node updated
// - div and button untouched
// - Minimal DOM operations

Comparison Table:
-----------------

// Feature              | Stack (Old)    | Fiber (New)
// ---------------------|----------------|------------------
// Rendering            | Synchronous    | Incremental
// Can pause            | No             | Yes
// Priority             | No             | Yes
// Concurrent           | No             | Yes
// Suspense             | No             | Yes
// Error boundaries     | Basic          | Advanced
// Time slicing         | No             | Yes
// Scheduling           | No             | Yes
// Main thread blocking | Yes            | Minimal

Summary:

React Fiber:
- Complete rewrite of React's core (React 16+)
- Enables incremental rendering
- Can pause and resume work
- Prioritizes updates
- Uses linked list data structure
- Two-phase architecture (render + commit)
- Double buffering for efficiency
- Enables concurrent features
- Better performance and UX
- Foundation for modern React features
- Time slicing keeps UI responsive
- Scheduling based on priority
- Critical innovation for React's future
*/


