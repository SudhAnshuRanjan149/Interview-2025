/*

========================================================
SECTION 15 — REACT INTERNALS & ADVANCED MECHANISMS
========================================================
109. What is React Fiber and why was it introduced?  
110. What are lanes in React 18?  
111. How does React schedule rendering updates?  
112. What is the difference between legacy mode and concurrent mode?  
113. How does React handle state batching internally?  
114. What is the role of keys in lists and how does React use them?  
115. Why should keys not be array indices in lists?  

*/




/**
109. What is React Fiber and why was it introduced?
--------------------------------------------------

React Fiber is a complete rewrite of React's reconciliation algorithm introduced
in React 16. It enables React to break rendering work into chunks and prioritize
updates, making React more responsive and capable of handling complex UIs.

What is React Fiber:
--------------------

// Fiber is React's internal data structure [web:141]
// Each React element becomes a "fiber" node

// Old React (Stack Reconciler):
// - Recursive algorithm [web:143]
// - Processes entire tree at once [web:143]
// - Cannot pause/interrupt [web:143]
// - Long updates block UI [web:143]

// New React (Fiber Reconciler):
// - Incremental algorithm [web:141][web:144]
// - Can pause and resume work [web:141][web:142]
// - Can prioritize updates [web:141]
// - Can interrupt low-priority work [web:141]
// - Keeps UI responsive [web:143]

Why Fiber Was Introduced:
--------------------------

// Problem 1: Blocking updates [web:143]
function App() {
  const [count, setCount] = useState(0);
  
  // Imagine this renders 10,000 items
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Update {count}
      </button>
      
      {/* This takes 500ms to render * /}
      <ExpensiveComponent count={count} />
    </div>
  );
}

// Old React (Stack):
// Click button → UI freezes for 500ms → update shows [web:143]
// Can't interact during update!

// New React (Fiber):
// Click button → Update starts → UI stays responsive [web:141]
// Can interrupt if higher priority work comes in

// Problem 2: All updates treated equally [web:143]
// No way to prioritize:
// - User input (high priority)
// - Animations (high priority)  
// - Data fetching (low priority)
// - Off-screen content (lowest priority)

// Fiber solution: Priority-based scheduling [web:141]

Fiber Architecture:
-------------------

// Each component becomes a fiber node [web:141][web:144]

// Fiber node structure (simplified):
{
  type: 'div',              // Component type
  key: 'unique-key',        // Unique identifier
  stateNode: DOMElement,    // Actual DOM node
  child: ChildFiber,        // First child
  sibling: SiblingFiber,    // Next sibling
  return: ParentFiber,      // Parent fiber
  
  // Work-related
  pendingProps: {},         // New props
  memoizedProps: {},        // Previous props
  memoizedState: {},        // Previous state
  updateQueue: [],          // Pending updates
  
  // Priority
  lanes: 0b000001,          // Update priority
  
  // Effects
  flags: 0b010100,          // What needs to be done
  subtreeFlags: 0b001000    // Child effects
}

// Fiber tree structure:
//        App (parent)
//         |
//      Header (child)
//         |
//      --------
//      |      |
//   Logo   Nav (siblings)

Fiber Tree Example:
-------------------

function App() {
  return (
    <div>
      <Header />
      <Main>
        <Article />
        <Sidebar />
      </Main>
      <Footer />
    </div>
  );
}

// Fiber tree (linked list structure): [web:141]
//
//     App
//      |
//     div
//      |
//   Header -> Main -> Footer
//              |
//          Article -> Sidebar

// Traversal using child/sibling/return pointers [web:141]
// Can pause at any node, resume later

Two-Phase Rendering:
--------------------

// Fiber splits rendering into two phases [web:142][web:147]

// Phase 1: Render Phase (Reconciliation) [web:142][web:147]
// - Can be interrupted [web:142]
// - Async, can pause/resume [web:142]
// - Builds fiber tree [web:144]
// - Calculates what changed [web:147]
// - No side effects [web:142]

function renderPhase() {
  // Compare old and new fiber trees [web:144]
  // Mark which nodes need updates [web:147]
  // Can pause if higher priority work arrives [web:142]
  // Can split work across multiple frames [web:141]
}

// Phase 2: Commit Phase [web:142][web:147]
// - Cannot be interrupted [web:142]
// - Synchronous [web:142]
// - Apply changes to DOM [web:147]
// - Run side effects (useEffect) [web:142]
// - Must complete once started [web:142]

function commitPhase() {
  // Apply all DOM updates at once [web:147]
  // Run lifecycle methods
  // Run useEffect callbacks
  // Update refs
}

How Fiber Works:
----------------

// Example: Updating a large list

function App() {
  const [items, setItems] = useState([...Array(10000)]);
  
  return (
    <div>
      <button onClick={() => setItems([...items, 'new'])}>
        Add Item
      </button>
      
      {items.map((item, i) => (
        <ExpensiveItem key={i} item={item} />
      ))}
    </div>
  );
}

// Without Fiber (Old React): [web:143]
// 1. Click button
// 2. Start reconciliation
// 3. Process all 10,000 items (takes 500ms)
// 4. UI frozen during this time
// 5. Update DOM
// 6. UI responsive again

// With Fiber (New React): [web:141][web:142]
// 1. Click button
// 2. Start reconciliation (Render Phase)
// 3. Process chunk of items (16ms) [web:141]
// 4. Pause, let browser handle other tasks
// 5. Resume processing next chunk
// 6. Repeat until done
// 7. Commit all changes at once (Commit Phase)
// 8. UI stays responsive throughout!

Work Loop:
----------

// Simplified Fiber work loop [web:141]

function workLoop(deadline) {
  // Process work units until out of time [web:141]
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  
  // If more work, schedule next chunk [web:141]
  if (nextUnitOfWork) {
    requestIdleCallback(workLoop);
  } else {
    // All work done, commit to DOM [web:142]
    commitRoot();
  }
}

// Start work loop
requestIdleCallback(workLoop);

// Each "unit of work" is processing one fiber node [web:141]

Priority and Interruption:
---------------------------

// Fiber can interrupt low-priority work [web:141]

function App() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  
  return (
    <div>
      {/* High priority: User input [web:141] * /}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      {/* Low priority: Search results [web:141] * /}
      <SearchResults query={search} />
    </div>
  );
}

// Scenario:
// 1. Typing in input (high priority) [web:141]
// 2. SearchResults rendering (low priority) [web:141]
// 3. User types → Fiber pauses SearchResults [web:141]
// 4. Process keystroke immediately [web:141]
// 5. Resume SearchResults rendering [web:141]

// Old React: Keystroke delayed until SearchResults done [web:143]
// New React: Keystroke handled immediately [web:141]

Benefits of Fiber:
------------------

// 1. Responsive UI [web:143]
// Long updates don't freeze the app [web:141]

// 2. Prioritization [web:141]
// Handle urgent updates first (user input, animations)
// Defer less important work (analytics, logging)

// 3. Better error handling
// Error boundaries work better
// Can recover from errors mid-render

// 4. Suspense and Concurrent Features [web:141]
// Enables Suspense for data fetching
// Concurrent rendering
// useTransition
// useDeferredValue

// 5. Time slicing [web:141]
// Split work across multiple frames
// Keeps frame rate smooth

// 6. Incremental rendering [web:141]
// Render part of tree, pause, continue later

Real-World Impact:
------------------

// Before Fiber (React 15): [web:143]
function HeavyComponent() {
  // Rendering 10,000 items blocks UI for 500ms
  return items.map(item => <Item key={item.id} {...item} />);
}
// Result: Stuttering animations, delayed input [web:143]

// After Fiber (React 16+): [web:141]
function HeavyComponent() {
  // Same code, but Fiber breaks work into chunks [web:141]
  return items.map(item => <Item key={item.id} {...item} />);
}
// Result: Smooth animations, responsive input [web:141]

Fiber Reconciliation Algorithm:
--------------------------------

// Fiber reconciliation process [web:144][web:147]

// 1. Create work-in-progress tree [web:144]
currentFiber = {
  type: 'div',
  props: { children: [<A />, <B />] }
};

workInProgressFiber = cloneFiber(currentFiber);

// 2. Compare with previous tree [web:144][web:147]
function reconcile(current, workInProgress) {
  // Compare props [web:144]
  if (propsChanged(current, workInProgress)) {
    markUpdate(workInProgress);
  }
  
  // Reconcile children [web:144]
  reconcileChildren(current, workInProgress);
  
  return workInProgress.child; // Next unit of work [web:141]
}

// 3. Mark effects (what changed) [web:147]
workInProgressFiber.flags |= Update;

// 4. Build effect list (changes to apply) [web:142]
// Only nodes with changes tracked

// 5. Commit effects to DOM [web:142][web:147]
commitWork(effectList);

Summary:

React Fiber:
- Complete rewrite of reconciliation [web:141][web:143]
- Introduced in React 16 [web:143]
- Enables incremental rendering [web:141]
- Can pause and resume work [web:141][web:142]
- Prioritizes updates [web:141]
- Two-phase rendering [web:142][web:147]
- Render phase (interruptible) [web:142]
- Commit phase (synchronous) [web:142]
- Enables Concurrent features [web:141]
- Keeps UI responsive [web:143]
*/


/**
110. What are lanes in React 18?
--------------------------------

Lanes are React's internal priority system introduced in React 18 for scheduling
and prioritizing updates. They replace the old priority system and provide
fine-grained control over which updates should be processed and in what order.

What are Lanes:
---------------

// Lanes are bit masks representing update priorities [web:191][web:194]

// Binary representation (simplified):
const SyncLane =             0b0000000000000000000000000000001; // Highest
const InputContinuousLane =  0b0000000000000000000000000000100;
const DefaultLane =          0b0000000000000000000000000010000;
const TransitionLane1 =      0b0000000000000000000000001000000;
const TransitionLane2 =      0b0000000000000000000000010000000;
const RetryLane1 =           0b0000000000000001000000000000000;
const IdleLane =             0b0100000000000000000000000000000; // Lowest

// Multiple lanes can be active simultaneously [web:191]
const lanes = SyncLane | DefaultLane; // Both lanes active

Lane Priority Levels:
---------------------

// From highest to lowest priority: [web:194]

// 1. SyncLane - Synchronous updates (highest) [web:191]
// - User input in controlled components
// - Discrete user events (clicks)
// - Must process immediately

// 2. InputContinuousLane - Continuous input
// - Mouse move
// - Scroll events
// - Touch move

// 3. DefaultLane - Normal updates [web:191]
// - setState from useEffect
// - Network responses
// - Regular component updates

// 4. TransitionLanes - Transitions (low priority) [web:191]
// - useTransition updates
// - Can be interrupted
// - Multiple transition lanes for parallel work [web:191]

// 5. RetryLanes - Retry after error
// - Suspense retries
// - Error recovery

// 6. IdleLane - Idle work (lowest)
// - Background tasks
// - Analytics
// - Non-urgent work

How Lanes Work:
---------------

// Example: Multiple updates with different priorities

function App() {
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState('');
  const [isPending, startTransition] = useTransition();
  
  const handleClick = () => {
    // High priority (SyncLane) [web:191]
    setCount(c => c + 1);
    
    // Low priority (TransitionLane) [web:191]
    startTransition(() => {
      setSearch('updated');
    });
  };
  
  return (
    <div>
      {/* count updates immediately [web:191] * /}
      <div>Count: {count}</div>
      
      {/* search updates can be interrupted [web:191] * /}
      <SearchResults search={search} />
    </div>
  );
}

// Execution:
// 1. User clicks button
// 2. setCount assigned SyncLane (high priority) [web:191]
// 3. startTransition assigned TransitionLane (low priority) [web:191]
// 4. SyncLane processed first [web:191]
// 5. TransitionLane can be interrupted by new high-priority work [web:191]

Lane Assignment:
----------------

// React assigns lanes based on context [web:194]

// Discrete events (click, keydown) → SyncLane [web:191]
button.addEventListener('click', () => {
  setState(newValue); // SyncLane
});

// Continuous events (scroll, mouse move) → InputContinuousLane
window.addEventListener('scroll', () => {
  setState(scrollY); // InputContinuousLane
});

// Transitions → TransitionLane [web:191]
startTransition(() => {
  setState(newValue); // TransitionLane
});

// Default updates → DefaultLane [web:191]
useEffect(() => {
  setState(newValue); // DefaultLane
}, []);

// Timeouts → varies based on delay
setTimeout(() => {
  setState(newValue); // Lower priority
}, 1000);

Multiple Transitions:
---------------------

// Each transition can get its own lane [web:191]

function SearchApp() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  
  // Transition 1 [web:191]
  const updateQuery = (value) => {
    startTransition(() => {
      setQuery(value); // TransitionLane1
    });
  };
  
  // Transition 2 [web:191]
  const updateCategory = (value) => {
    startTransition(() => {
      setCategory(value); // TransitionLane2 (different lane)
    });
  };
  
  return (
    <div>
      <input onChange={(e) => updateQuery(e.target.value)} />
      <CategoryFilter onChange={updateCategory} />
      <Results query={query} category={category} />
    </div>
  );
}

// Benefits of separate lanes: [web:191]
// - Can finish independently [web:191]
// - Can render out of order [web:191]
// - Better performance for multiple transitions [web:191]

Lane Batching:
--------------

// Updates in same lane batch together [web:191]

function Component() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  
  const handleClick = () => {
    // Both SyncLane → batch together [web:191]
    setA(1);
    setB(2);
    // Only one render!
  };
  
  return <div>{a} {b}</div>;
}

// Same lane = always batch [web:191]
// Different lanes = may render separately [web:191]

Priority Comparison:
--------------------

// Three priority systems in React: [web:194]

// 1. Scheduler Priority (task scheduling) [web:194]
const ImmediatePriority = 1;
const UserBlockingPriority = 2;
const NormalPriority = 3;
const LowPriority = 4;
const IdlePriority = 5;

// 2. Event Priority (user interactions) [web:194]
const DiscreteEventPriority = 1;  // Click, keydown
const ContinuousEventPriority = 2; // Scroll, mouse move
const DefaultEventPriority = 3;    // Regular updates

// 3. Lane Priority (update scheduling) [web:194]
// 31 lanes for fine-grained priority [web:194]

// Mapping: Lane → Event Priority → Scheduler Priority [web:194]

Real-World Example:
-------------------

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [deferredQuery, setDeferredQuery] = useDeferredValue(searchQuery);
  const [isPending, startTransition] = useTransition();
  
  const handleInput = (e) => {
    // High priority: Update input immediately (SyncLane) [web:191]
    setSearchQuery(e.target.value);
    
    // Low priority: Update results (TransitionLane) [web:191]
    startTransition(() => {
      setDeferredQuery(e.target.value);
    });
  };
  
  return (
    <div>
      {/* Updates immediately [web:191] * /}
      <input value={searchQuery} onChange={handleInput} />
      
      {/* Can lag behind while typing [web:191] * /}
      {isPending && <Spinner />}
      <SearchResults query={deferredQuery} />
    </div>
  );
}

// Lanes enable this prioritization: [web:191]
// - Input updates in SyncLane (high priority) [web:191]
// - Results updates in TransitionLane (low priority) [web:191]
// - Input stays responsive even during expensive renders [web:191]

Lane Expiration:
----------------

// Lanes can expire to prevent starvation [web:191]

// Low-priority update waits too long → upgraded to higher priority
// Ensures all updates eventually complete

startTransition(() => {
  setItems(newItems); // TransitionLane
});

// If interrupted repeatedly for 5 seconds:
// TransitionLane → DefaultLane (higher priority)
// Ensures update completes

Benefits of Lanes:
------------------

// 1. Fine-grained priority control [web:191][web:194]
// 31 lanes vs 3-5 priority levels in old system

// 2. Independent transitions [web:191]
// Multiple transitions can progress separately [web:191]

// 3. Better batching [web:191]
// Same lane = automatic batching [web:191]

// 4. Flexible scheduling [web:191]
// Can choose to batch or separate based on lanes [web:191]

// 5. Improved performance
// Smarter about what to work on when

// 6. Enables Concurrent Features [web:191]
// useTransition, useDeferredValue, Suspense

Lanes vs Old Priority System:
------------------------------

// Old system (React 17):
// - Fixed number of priority levels
// - Less flexible
// - Harder to manage multiple transitions

// New system (React 18): [web:191][web:194]
// - 31 lanes for fine-grained control [web:194]
// - Flexible lane assignment [web:191]
// - Better handling of multiple concurrent updates [web:191]
// - Enables advanced scheduling [web:191]

Summary:

Lanes in React 18:
- Bit mask priority system [web:191][web:194]
- 31 lanes for fine-grained control [web:194]
- Replace old priority levels [web:194]
- Enable concurrent rendering [web:191]
- Independent transitions [web:191]
- Automatic batching same lane [web:191]
- Maps to scheduler priorities [web:194]
- Three priority systems [web:194]
- Prevents starvation with expiration [web:191]
*/


/**
111. How does React schedule rendering updates?
----------------------------------------------

React uses a sophisticated scheduling system to prioritize and coordinate
rendering updates, ensuring high-priority updates (like user input) are
processed immediately while low-priority updates can be deferred.

Update Scheduling Overview:
----------------------------

// When setState is called:
function Component() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(count + 1); // Triggers update scheduling
  };
  
  return <button onClick={handleClick}>{count}</button>;
}

// React's scheduling process:
// 1. Assign priority (lane) to update [web:194]
// 2. Add to update queue
// 3. Schedule work with appropriate priority [web:194]
// 4. Process updates based on priority [web:191]
// 5. Commit changes to DOM

Priority-Based Scheduling:
--------------------------

// React categorizes updates by priority [web:192]

// High Priority (Immediate) [web:192]
// - User input (clicks, typing)
// - Discrete events
// - Processed synchronously [web:192]

function HighPriority() {
  const [value, setValue] = useState('');
  
  // High priority - must be immediate [web:192]
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  
  return <input value={value} onChange={handleChange} />;
}

// Medium Priority (Default) [web:192]
// - Network responses
// - useEffect updates
// - Batched when possible [web:192]

function MediumPriority() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Medium priority - can be batched [web:192]
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  return <div>{data}</div>;
}

// Low Priority (Deferrable) [web:192]
// - useTransition updates [web:192]
// - useDeferredValue [web:192]
// - Can be interrupted [web:192]

function LowPriority() {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  
  const handleSearch = (value) => {
    // Low priority - interruptible [web:192]
    startTransition(() => {
      setQuery(value);
    });
  };
  
  return <SearchResults query={query} />;
}

Scheduling Algorithm:
---------------------

// Simplified scheduling flow

// 1. User interaction triggers update
handleClick() {
  setState(newValue);
  // Enters scheduling system
}

// 2. Determine priority [web:194]
const priority = getCurrentEventPriority(); // [web:194]
const lane = eventPriorityToLane(priority); // [web:194]

// 3. Create update object
const update = {
  lane: lane,
  action: newValue,
  next: null
};

// 4. Add to fiber's update queue
fiber.updateQueue.pending = update;

// 5. Schedule work [web:194]
if (lane === SyncLane) {
  // Schedule immediate work [web:191]
  scheduleSyncCallback(performSyncWork);
} else {
  // Schedule with priority [web:194]
  scheduleCallback(priority, performWork);
}

// 6. Process work when scheduled
function performWork() {
  // Enter render phase
  renderRoot();
  
  // If completed, commit
  if (workInProgressRoot === null) {
    commitRoot();
  }
}

Work Loop:
----------

// React's work loop processes updates [web:141]

function workLoopConcurrent() {
  // Process fibers while time available
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress);
  }
}

function shouldYield() {
  // Check if we should pause [web:141]
  const currentTime = getCurrentTime();
  const deadline = currentDeadline;
  
  // Yield if:
  // - Out of time (>5ms spent) [web:141]
  // - Higher priority work pending [web:191]
  // - Browser needs to paint
  
  return currentTime >= deadline || hasHigherPriorityWork();
}

// If shouldYield returns true:
// - Save current progress
// - Let browser handle events
// - Resume later [web:141]

Batching Updates:
-----------------

// React batches updates in same priority [web:191]

function Component() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  
  const handleClick = () => {
    // All batched into single render (React 18) [web:191]
    setA(1);
    setB(2);
    setC(3);
    console.log(a, b, c); // Still 0, 0, 0 (not updated yet)
  };
  
  // Only renders once! [web:191]
  
  return <div>{a} {b} {c}</div>;
}

// Automatic batching in React 18 [web:191]:
setTimeout(() => {
  setA(1); // Batched
  setB(2); // Batched
  // Single render
}, 1000);

fetch('/api').then(() => {
  setA(1); // Batched
  setB(2); // Batched
  // Single render
});

Concurrent Scheduling:
----------------------

// Legacy Mode (React 17): [web:192][web:195]
// - Synchronous rendering [web:192][web:195]
// - Cannot interrupt [web:192][web:195]
// - Blocks main thread [web:195]

function legacyRender() {
  // Start rendering
  let fiber = rootFiber;
  
  // Process entire tree without stopping [web:195]
  while (fiber !== null) {
    updateFiber(fiber);
    fiber = getNextFiber(fiber);
  }
  
  // Commit all changes [web:195]
  commitChanges();
}

// Concurrent Mode (React 18): [web:192][web:195]
// - Asynchronous rendering [web:192][web:195]
// - Can interrupt [web:192][web:195]
// - Yields to browser [web:141][web:195]

function concurrentRender() {
  let fiber = rootFiber;
  
  // Process with interruptions [web:195]
  while (fiber !== null) {
    // Check if should yield [web:141]
    if (shouldYield()) {
      // Save progress, resume later [web:141][web:195]
      saveWorkInProgress(fiber);
      scheduleCallback(resumeRender);
      return;
    }
    
    updateFiber(fiber);
    fiber = getNextFiber(fiber);
  }
  
  // Commit when done [web:195]
  commitChanges();
}

Time Slicing:
-------------

// Break work into small chunks [web:141]

// React's time slice: ~5ms per frame [web:141]
const FRAME_TIME = 5; // milliseconds

function workLoop(deadline) {
  const startTime = performance.now();
  
  while (workInProgress !== null) {
    const elapsed = performance.now() - startTime;
    
    // Worked for 5ms, yield to browser [web:141]
    if (elapsed > FRAME_TIME) {
      scheduleCallback(workLoop);
      return;
    }
    
    performUnitOfWork(workInProgress);
  }
  
  // All work done
  commitRoot();
}

// Keeps UI responsive at 60fps [web:141]

Priority Interruption:
----------------------

// High priority work interrupts low priority [web:191]

function Component() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  
  const handleInput = (e) => {
    const value = e.target.value;
    
    // High priority: Update input [web:191]
    setSearch(value);
    
    // Low priority: Update results [web:191]
    startTransition(() => {
      const filtered = expensiveFilter(allItems, value);
      setResults(filtered);
    });
  };
  
  return (
    <div>
      <input value={search} onChange={handleInput} />
      <ResultsList results={results} />
    </div>
  );
}

// Scenario:
// 1. User types 'a'
// 2. Start filtering (low priority) [web:191]
// 3. User types 'b' (interrupts filtering) [web:191]
// 4. Process 'b' immediately [web:191]
// 5. Restart filtering with 'ab' [web:191]

Scheduler Integration:
----------------------

// React uses its own scheduler [web:194]

// Schedule callback with priority [web:194]
import { scheduleCallback, ImmediatePriority, UserBlockingPriority, NormalPriority } from 'scheduler';

// Immediate priority [web:194]
scheduleCallback(ImmediatePriority, () => {
  processHighPriorityWork();
});

// Normal priority [web:194]
scheduleCallback(NormalPriority, () => {
  processNormalWork();
});

// Scheduler manages:
// - Priority queue of tasks [web:194]
// - Time slicing [web:141]
// - Task expiration
// - Work scheduling

Update Queue:
-------------

// Each fiber has update queue

fiber.updateQueue = {
  pending: null,    // Circular linked list of updates
  shared: {
    pending: null   // Shared with work-in-progress
  },
  effects: null     // Side effects
};

// Add update
const update = {
  lane: SyncLane,
  action: newState,
  next: null
};

// Insert into circular list
if (fiber.updateQueue.pending === null) {
  update.next = update; // Point to self
} else {
  update.next = fiber.updateQueue.pending.next;
  fiber.updateQueue.pending.next = update;
}
fiber.updateQueue.pending = update;

// Process updates
function processUpdateQueue(fiber) {
  let update = fiber.updateQueue.pending;
  let newState = fiber.memoizedState;
  
  // Process each update
  while (update !== null) {
    newState = getStateFromUpdate(update, newState);
    update = update.next;
  }
  
  fiber.memoizedState = newState;
}

Summary:

React Scheduling:
- Priority-based system [web:192][web:194]
- Three priority levels [web:192]
- Uses lanes for fine-grained control [web:191][web:194]
- Batches same-priority updates [web:191]
- Time slicing for responsiveness [web:141]
- Can interrupt low-priority work [web:191][web:192]
- Concurrent rendering [web:192][web:195]
- Yields to browser [web:141][web:195]
- Scheduler manages task queue [web:194]
*/


/**
112. What is the difference between legacy mode and concurrent mode?
-------------------------------------------------------------------

Legacy Mode is React's traditional synchronous rendering system, while
Concurrent Mode is the new interruptible rendering system that enables
React to work on multiple tasks simultaneously and prioritize updates.

Legacy Mode (React ≤17):
------------------------

// Also called "Blocking Mode" or "Synchronous Mode" [web:192][web:195]

// Characteristics: [web:192][web:195]
// - Synchronous rendering [web:192][web:195]
// - Cannot interrupt [web:192][web:195]
// - Processes entire tree at once [web:195]
// - Blocks main thread [web:195]
// - All updates treated equally [web:192]

// Example problem:
function LegacyApp() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Update
      </button>
      
      {/* Renders 10,000 items * /}
      <ExpensiveList count={count} />
    </div>
  );
}

// User clicks button:
// 1. Start rendering [web:195]
// 2. Process all 10,000 items (takes 500ms) [web:195]
// 3. UI frozen during this time [web:192][web:195]
// 4. Cannot respond to user input [web:195]
// 5. Finally updates [web:195]

// Issues: [web:192][web:195]
// - Long updates block UI [web:192][web:195]
// - Animations stutter [web:195]
// - Input feels unresponsive [web:195]
// - App feels "frozen" [web:195]

Concurrent Mode (React 18+):
----------------------------

// Also called "Concurrent Rendering" [web:192]

// Characteristics: [web:192][web:195]
// - Asynchronous rendering [web:192][web:195]
// - Can interrupt and resume [web:192][web:195]
// - Processes work in chunks [web:195]
// - Yields to browser [web:195]
// - Priority-based scheduling [web:192]

// Same code, different behavior:
function ConcurrentApp() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Update
      </button>
      
      {/* Same 10,000 items * /}
      <ExpensiveList count={count} />
    </div>
  );
}

// User clicks button:
// 1. Start rendering [web:195]
// 2. Process chunk of items (5ms) [web:195]
// 3. Yield to browser [web:195]
// 4. Browser handles events [web:195]
// 5. Resume rendering next chunk [web:195]
// 6. Repeat until done [web:195]
// 7. Commit all changes [web:195]

// Benefits: [web:192][web:195]
// - UI stays responsive [web:192][web:195]
// - Can handle user input during render [web:195]
// - Smooth animations [web:195]
// - Better user experience [web:192]

Rendering Comparison:
---------------------

// Legacy Mode rendering: [web:195]
function legacyRender(root) {
  // Start
  beginWork(root);
  
  // Process entire tree without stopping [web:195]
  while (hasMoreWork()) {
    processNextUnit(); // Cannot interrupt
  }
  
  // Commit
  commitWork();
  
  // Done - blocked UI for entire duration [web:195]
}

// Concurrent Mode rendering: [web:195]
function concurrentRender(root) {
  // Start
  beginWork(root);
  
  // Process with interruptions [web:195]
  while (hasMoreWork()) {
    // Check if should yield [web:195]
    if (shouldYield()) {
      // Pause and schedule continuation [web:195]
      saveProgress();
      scheduleCallback(concurrentRender);
      return; // Yield to browser
    }
    
    processNextUnit(); // Can interrupt
  }
  
  // Commit
  commitWork();
  
  // Done - UI was responsive throughout [web:195]
}

Priority in Different Modes:
-----------------------------

// Legacy Mode: [web:192]
// - No real prioritization [web:192]
// - Limited batching [web:192]
// - First update started must finish [web:192]

function LegacyComponent() {
  const handleClick = () => {
    // Both processed together, cannot interrupt [web:192]
    setUrgent('user clicked');
    setNonUrgent('background task');
  };
}

// Concurrent Mode: [web:192]
// - Sophisticated prioritization [web:192]
// - Extensive batching [web:192]
// - Can interrupt low-priority work [web:192]

function ConcurrentComponent() {
  const [urgent, setUrgent] = useState('');
  const [nonUrgent, setNonUrgent] = useState('');
  
  const handleClick = () => {
    // High priority - processed immediately [web:192]
    setUrgent('user clicked');
    
    // Low priority - can be interrupted [web:192]
    startTransition(() => {
      setNonUrgent('background task');
    });
  };
}

Feature Comparison:
-------------------

// Feature              | Legacy Mode    | Concurrent Mode
// ---------------------|----------------|------------------
// Rendering            | Synchronous    | Asynchronous [web:192][web:195]
// Interruptible        | No             | Yes [web:192][web:195]
// Time Slicing         | No             | Yes [web:195]
// Priority             | Basic          | Advanced [web:192]
// useTransition        | No             | Yes [web:192]
// useDeferredValue     | No             | Yes [web:192]
// Suspense (full)      | No             | Yes [web:192]
// Batching             | Limited        | Automatic [web:192]
// Responsiveness       | Can freeze     | Always responsive [web:192][web:195]

Enabling Concurrent Mode:
--------------------------

// Legacy Mode (React 17):
import ReactDOM from 'react-dom';

ReactDOM.render(<App />, document.getElementById('root'));

// Concurrent Mode (React 18):
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// React 18 uses concurrent features by default [web:192]
// But rendering is still mostly synchronous unless you use:
// - useTransition [web:192]
// - useDeferredValue [web:192]
// - Suspense [web:192]

Concurrent Features:
--------------------

// 1. useTransition [web:192]
function SearchWithTransition() {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  
  const handleChange = (e) => {
    const value = e.target.value;
    
    // Immediate (high priority) [web:192]
    setQuery(value);
    
    // Deferred (low priority, interruptible) [web:192]
    startTransition(() => {
      filterLargeList(value);
    });
  };
  
  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      <Results />
    </div>
  );
}

// 2. useDeferredValue [web:192]
function SearchWithDeferred() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  
  return (
    <div>
      {/* Updates immediately * /}
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      
      {/* Can lag behind during typing * /}
      <Results query={deferredQuery} />
    </div>
  );
}

// 3. Suspense for Data Fetching [web:192]
function ConcurrentDataFetching() {
  return (
    <Suspense fallback={<Loading />}>
      <DataComponent />
    </Suspense>
  );
}

// These features require Concurrent Mode [web:192]

Migration Path:
---------------

// Gradual adoption

// Step 1: Upgrade to React 18
npm install react@18 react-dom@18

// Step 2: Use createRoot [web:192]
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// Step 3: Add concurrent features gradually [web:192]
// Start with useTransition for heavy updates
function App() {
  const [isPending, startTransition] = useTransition();
  
  const handleHeavyUpdate = () => {
    startTransition(() => {
      updateLargeList();
    });
  };
}

// Step 4: Add useDeferredValue for inputs [web:192]
const deferredValue = useDeferredValue(inputValue);

// Step 5: Use Suspense for data fetching [web:192]
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>

Real-World Impact:
------------------

// Legacy Mode example: [web:195]
function LegacyDashboard() {
  const [data, setData] = useState([]);
  
  // Updating 10,000 rows
  const updateData = () => {
    const newData = processHugeDataset();
    setData(newData); // Blocks UI for 500ms [web:195]
  };
  
  return (
    <div>
      <button onClick={updateData}>Update</button>
      <DataTable data={data} />
    </div>
  );
}
// Result: Button click → UI freeze → Update appears [web:195]

// Concurrent Mode example: [web:195]
function ConcurrentDashboard() {
  const [data, setData] = useState([]);
  const [isPending, startTransition] = useTransition();
  
  // Same update, but concurrent [web:195]
  const updateData = () => {
    startTransition(() => {
      const newData = processHugeDataset();
      setData(newData); // Doesn't block UI [web:195]
    });
  };
  
  return (
    <div>
      <button onClick={updateData}>Update</button>
      {isPending && <Spinner />}
      <DataTable data={data} />
    </div>
  );
}
// Result: Button click → Shows spinner → UI stays responsive → Update appears [web:195]

Trade-offs:
-----------

// Legacy Mode: [web:192]
// ✅ Simpler to reason about [web:192]
// ✅ Predictable behavior [web:192]
// ✅ No need to learn new APIs [web:192]
// ❌ Can freeze UI [web:192][web:195]
// ❌ Poor performance for complex UIs [web:192]
// ❌ No advanced features [web:192]

// Concurrent Mode: [web:192]
// ✅ Better performance [web:192]
// ✅ Responsive UI [web:192][web:195]
// ✅ Advanced features [web:192]
// ✅ Better user experience [web:192]
// ❌ More complex [web:192]
// ❌ Need to understand prioritization [web:192]
// ❌ Requires careful state management [web:192]

Summary:

Legacy vs Concurrent Mode:
- Legacy: Synchronous, blocking [web:192][web:195]
- Concurrent: Asynchronous, interruptible [web:192][web:195]
- Concurrent uses time slicing [web:195]
- Concurrent has priority scheduling [web:192]
- Concurrent enables new features [web:192]
- React 18 uses Concurrent by default [web:192]
- Gradual migration path [web:192]
- Better UX with Concurrent [web:192][web:195]
*/


/**
113. How does React handle state batching internally?
----------------------------------------------------

State batching is React's optimization where multiple setState calls are
grouped together and processed in a single render, reducing the number of
re-renders and improving performance.

What is State Batching:
-----------------------

// Without batching:
function Component() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  
  const handleClick = () => {
    setA(1);    // Render 1
    setB(2);    // Render 2
    setA(3);    // Render 3
    // 3 renders total
  };
}

// With batching:
function Component() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  
  const handleClick = () => {
    setA(1);    // Queued
    setB(2);    // Queued
    setA(3);    // Queued
    // 1 render with all updates
  };
}

How Batching Works:
-------------------

// React uses execution context to batch [web:191]

let isBatchingUpdates = false;
const updateQueue = [];

function setState(update) {
  // Add update to queue
  updateQueue.push(update);
  
  // Schedule flush if not already batching
  if (!isBatchingUpdates) {
    scheduleFlush();
  }
}

function batchedUpdates(fn) {
  // Set batching flag [web:191]
  const previousBatching = isBatchingUpdates;
  isBatchingUpdates = true;
  
  try {
    // Execute function (may have multiple setState)
    fn();
  } finally {
    // Reset flag
    isBatchingUpdates = previousBatching;
    
    // Flush all queued updates [web:191]
    if (!isBatchingUpdates) {
      flushUpdates();
    }
  }
}

// React event handlers are automatically batched
function handleClick() {
  batchedUpdates(() => {
    setA(1);
    setB(2);
    setC(3);
  });
  // Single render
}

React 17 Batching:
------------------

// React 17: Only batches in event handlers

function Component() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  
  // ✅ Batched (event handler)
  const handleClick = () => {
    setA(1);
    setB(2);
    // 1 render
  };
  
  // ❌ Not batched (setTimeout)
  const handleAsync = () => {
    setTimeout(() => {
      setA(1);  // Render 1
      setB(2);  // Render 2
      // 2 renders
    }, 0);
  };
  
  // ❌ Not batched (Promise)
  const handlePromise = () => {
    fetch('/api').then(() => {
      setA(1);  // Render 1
      setB(2);  // Render 2
      // 2 renders
    });
  };
}

React 18 Automatic Batching:
----------------------------

// React 18: Batches everywhere! [web:191]

function Component() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  
  // ✅ Batched (event handler) [web:191]
  const handleClick = () => {
    setA(1);
    setB(2);
    // 1 render
  };
  
  // ✅ Batched (setTimeout) [web:191]
  const handleAsync = () => {
    setTimeout(() => {
      setA(1);
      setB(2);
      // 1 render (NEW in React 18!)
    }, 0);
  };
  
  // ✅ Batched (Promise) [web:191]
  const handlePromise = () => {
    fetch('/api').then(() => {
      setA(1);
      setB(2);
      // 1 render (NEW in React 18!)
    });
  };
  
  // ✅ Batched (native events) [web:191]
  useEffect(() => {
    document.addEventListener('click', () => {
      setA(1);
      setB(2);
      // 1 render (NEW in React 18!)
    });
  }, []);
}

Update Queue Processing:
------------------------

// Simplified internal process [web:191]

// 1. setState called
setCount(1);

// 2. Create update object
const update = {
  lane: SyncLane,  // Priority [web:191]
  action: 1,
  next: null
};

// 3. Add to fiber's update queue
fiber.updateQueue.pending = update;

// 4. Mark fiber for update
fiber.lanes |= SyncLane;

// 5. Schedule work [web:191]
if (!isBatchingUpdates) {
  // Start new batch
  isBatchingUpdates = true;
  scheduleMicrotask(flushUpdates);
}

// 6. Process all queued updates [web:191]
function flushUpdates() {
  isBatchingUpdates = false;
  
  // Process all fibers with pending updates [web:191]
  workLoop();
  
  // Commit to DOM
  commitRoot();
}

Same Lane Batching:
-------------------

// Updates in same lane batch together [web:191]

function Component() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    // All same lane (SyncLane) → batch [web:191]
    setCount(c => c + 1);  // Lane: SyncLane
    setCount(c => c + 1);  // Lane: SyncLane
    setCount(c => c + 1);  // Lane: SyncLane
    // Single render, count = 3
  };
  
  return <button onClick={handleClick}>{count}</button>;
}

// Different lanes may not batch [web:191]
function TransitionComponent() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    // High priority [web:191]
    setCount(c => c + 1);  // Lane: SyncLane
    
    // Low priority [web:191]
    startTransition(() => {
      setCount(c => c + 1);  // Lane: TransitionLane
    });
    
    // May render separately based on lanes [web:191]
  };
}

Batching with Functional Updates:
----------------------------------

// Functional updates guarantee order

function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    // ❌ Won't work as expected (all read current count)
    setCount(count + 1);  // 0 + 1 = 1
    setCount(count + 1);  // 0 + 1 = 1
    setCount(count + 1);  // 0 + 1 = 1
    // Result: 1 (not 3!)
  };
  
  const incrementCorrect = () => {
    // ✅ Works correctly (uses previous value)
    setCount(c => c + 1);  // 0 + 1 = 1
    setCount(c => c + 1);  // 1 + 1 = 2
    setCount(c => c + 1);  // 2 + 1 = 3
    // Result: 3 ✓
  };
}

Opting Out of Batching:
-----------------------

// React 18: Use flushSync to opt out [web:191]

import { flushSync } from 'react-dom';

function Component() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  
  const handleClick = () => {
    // Force immediate render
    flushSync(() => {
      setA(1);
    });
    // a is now 1, re-rendered
    
    // Another immediate render
    flushSync(() => {
      setB(2);
    });
    // b is now 2, re-rendered again
    
    // Total: 2 renders instead of 1
  };
  
  // Use sparingly! Hurts performance
}

Batching with Multiple Components:
-----------------------------------

// Batching works across components

function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <Child1 onUpdate={() => setCount(c => c + 1)} />
      <Child2 count={count} />
    </div>
  );
}

function Child1({ onUpdate }) {
  const [local, setLocal] = useState(0);
  
  const handleClick = () => {
    // Both batched together [web:191]
    setLocal(l => l + 1);  // Update Child1
    onUpdate();            // Update Parent
    // Single render for both!
  };
  
  return <button onClick={handleClick}>{local}</button>;
}

Internal Batching Implementation:
----------------------------------

// Simplified React internals

// Execution context stack
const executionContext = {
  NoContext: 0b000,
  BatchedContext: 0b001,
  EventContext: 0b010,
  DiscreteEventContext: 0b100
};

let currentContext = executionContext.NoContext;

// Check if batching
function isBatching() {
  return (currentContext & executionContext.BatchedContext) !== 0;
}

// Set batching context [web:191]
function batchedEventUpdates(fn) {
  const prevContext = currentContext;
  currentContext |= executionContext.BatchedContext;
  
  try {
    return fn();
  } finally {
    currentContext = prevContext;
    
    // Flush if no longer batching [web:191]
    if (!isBatching()) {
      flushSyncCallbacks();
    }
  }
}

// Wrap event handlers
button.addEventListener('click', () => {
  batchedEventUpdates(() => {
    handleClick(); // User code runs here
  });
});

Batching Benefits:
------------------

// Performance improvement

// Without batching:
function Component() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  
  const handleClick = () => {
    setA(1);  // Render 1: Process A
    setB(2);  // Render 2: Process A, B
    setC(3);  // Render 3: Process A, B, C
  };
  
  // 3 renders, 6 total updates
  // Multiple DOM operations
  // Multiple layout calculations
}

// With batching: [web:191]
function Component() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  
  const handleClick = () => {
    setA(1);  // Queued
    setB(2);  // Queued
    setC(3);  // Queued
  };
  
  // 1 render, 3 updates [web:191]
  // Single DOM operation
  // Single layout calculation
  // Much faster!
}

Summary:

State Batching:
- Groups multiple setState calls [web:191]
- Single render for batch [web:191]
- React 17: Only event handlers
- React 18: Automatic everywhere [web:191]
- Same lane batches together [web:191]
- Use functional updates for order
- flushSync opts out [web:191]
- Major performance optimization
- Reduces unnecessary renders
*/


/**
114. What is the role of keys in lists and how does React use them?
------------------------------------------------------------------

Keys help React identify which items in a list have changed, been added, or
removed. React uses keys to optimize reconciliation by tracking element
identity across renders, enabling efficient DOM updates.

Why Keys Are Needed:
--------------------

// Without keys: [web:144]
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li>{todo.text}</li>  // No key!
      ))}
    </ul>
  );
}

// Problems:
// 1. React can't track which todo is which [web:144]
// 2. Deleting first todo → React re-renders all todos
// 3. Reordering → unnecessary DOM updates
// 4. Component state gets confused

// With keys: [web:144]
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>  // With key! [web:144]
      ))}
    </ul>
  );
}

// Benefits:
// 1. React knows which todo is which [web:144]
// 2. Deleting first todo → React only removes that DOM node
// 3. Reordering → React moves DOM nodes, no re-render
// 4. Component state preserved correctly

How React Uses Keys:
--------------------

// Reconciliation with keys [web:144]

// Initial render:
<ul>
  <li key="1">Apple</li>
  <li key="2">Banana</li>
  <li key="3">Cherry</li>
</ul>

// React creates:
// Virtual DOM: [key="1", key="2", key="3"]
// Real DOM: 3 li elements

// Update: Remove "Banana" [web:144]
<ul>
  <li key="1">Apple</li>
  <li key="3">Cherry</li>
</ul>

// React's reconciliation: [web:144]
// 1. Compare keys: [1, 2, 3] vs [1, 3]
// 2. key="1" → Same, keep DOM node [web:144]
// 3. key="2" → Missing, remove DOM node [web:144]
// 4. key="3" → Same, keep DOM node [web:144]

// Result: Only 1 DOM removal, 0 re-renders [web:144]

// Without keys: [web:144]
// 1. Compare positions [0, 1, 2] vs [0, 1]
// 2. Position 0 changed: Apple → Apple (re-render) [web:144]
// 3. Position 1 changed: Banana → Cherry (re-render) [web:144]
// 4. Position 2 removed [web:144]

// Result: 2 DOM updates + 1 removal (inefficient!) [web:144]

Key Requirements:
-----------------

// Keys must be: [web:144]

// 1. Unique among siblings [web:144]
function GoodList() {
  return (
    <ul>
      <li key="1">Item 1</li>  // ✅ Unique
      <li key="2">Item 2</li>  // ✅ Unique
    </ul>
  );
}

function BadList() {
  return (
    <ul>
      <li key="1">Item 1</li>  // ❌ Duplicate!
      <li key="1">Item 2</li>  // ❌ Duplicate!
    </ul>
  );
}

// 2. Stable (don't change between renders) [web:144]
// ✅ Good: Database ID
items.map(item => <li key={item.id}>{item.name}</li>);

// ❌ Bad: Random value
items.map(item => <li key={Math.random()}>{item.name}</li>);

// 3. Predictable [web:144]
// ✅ Good: Deterministic
items.map(item => <li key={item.id}>{item.name}</li>);

// ❌ Bad: Changes on re-render
items.map(item => <li key={Date.now()}>{item.name}</li>);

Reordering Example:
-------------------

// Demonstrating key importance

function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

// Initial state:
const todos = [
  { id: 1, text: 'Task A', completed: false },
  { id: 2, text: 'Task B', completed: true },
  { id: 3, text: 'Task C', completed: false }
];

// After reordering (drag and drop):
const todos = [
  { id: 2, text: 'Task B', completed: true },  // Moved to top
  { id: 1, text: 'Task A', completed: false },
  { id: 3, text: 'Task C', completed: false }
];

// With keys: [web:144]
// - React identifies items by key [web:144]
// - Moves existing DOM nodes [web:144]
// - Preserves component state (completed status) [web:144]
// - No re-render needed! [web:144]

// Without keys:
// - React compares by position
// - Position 0 changed: A → B (re-render)
// - Position 1 changed: B → A (re-render)
// - Component state gets mixed up
// - Completed status might be wrong!

Component State Preservation:
------------------------------

// Keys preserve component state

function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  
  return (
    <li>
      {isEditing ? (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : (
        <span>{todo.text}</span>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </li>
  );
}

// With proper keys: [web:144]
// - Reordering preserves isEditing state [web:144]
// - Input value persists [web:144]
// - Each item maintains its own state [web:144]

// Without keys or wrong keys:
// - State gets mixed up
// - Editing wrong item
// - Input values swap

Keys in Fragments:
------------------

// Keys work with fragments

function Table({ rows }) {
  return (
    <table>
      <tbody>
        {rows.map(row => (
          <Fragment key={row.id}>
            <tr>
              <td>{row.name}</td>
            </tr>
            <tr>
              <td>{row.details}</td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  );
}

// Or shorthand (can't use key):
function Table({ rows }) {
  return (
    <table>
      <tbody>
        {rows.map(row => (
          // ❌ Can't add key to <>
          <>
            <tr>
              <td>{row.name}</td>
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
}

Dynamic Lists:
--------------

// Keys help with dynamic operations

function DynamicList() {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' }
  ]);
  
  // Add item [web:144]
  const addItem = () => {
    const newItem = { id: Date.now(), text: `Item ${items.length + 1}` };
    setItems([...items, newItem]);
    // React adds new DOM node [web:144]
  };
  
  // Remove item [web:144]
  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
    // React removes specific DOM node [web:144]
  };
  
  // Reorder items [web:144]
  const moveUp = (index) => {
    if (index === 0) return;
    const newItems = [...items];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    setItems(newItems);
    // React moves DOM nodes [web:144]
  };
  
  return (
    <ul>
      {items.map((item, index) => (
        <li key={item.id}>
          {item.text}
          <button onClick={() => removeItem(item.id)}>Delete</button>
          <button onClick={() => moveUp(index)}>Move Up</button>
        </li>
      ))}
      <button onClick={addItem}>Add Item</button>
    </ul>
  );
}

Keys and Performance:
---------------------

// Keys enable efficient reconciliation [web:144]

// Bad performance (no keys):
function SlowList({ items }) {
  return items.map(item => <ExpensiveComponent data={item} />);
  // Every update re-renders ALL components
}

// Good performance (with keys): [web:144]
function FastList({ items }) {
  return items.map(item => (
    <ExpensiveComponent key={item.id} data={item} />
  ));
  // Only changed items re-render [web:144]
}

// Example measurement:
// 1000 items, remove first item:
// - Without keys: ~500ms (re-renders all)
// - With keys: ~5ms (removes one) [web:144]

Summary:

Keys in Lists:
- Identify elements across renders [web:144]
- Enable efficient reconciliation [web:144]
- Must be unique among siblings [web:144]
- Must be stable (don't change) [web:144]
- Preserve component state [web:144]
- Optimize reordering [web:144]
- Improve add/remove performance [web:144]
- Use database IDs when possible [web:144]
*/


/**
115. Why should keys not be array indices in lists?
--------------------------------------------------

Using array indices as keys causes problems when the list can be reordered,
filtered, or have items added/removed, leading to bugs with component state
and poor performance.

The Problem with Index Keys:
-----------------------------

// ❌ Bad: Using array indices
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo.text}</li>
      ))}
    </ul>
  );
}

// Looks fine, but causes issues when list changes

Issues with Index Keys:
-----------------------

// Issue 1: Deleting items causes wrong updates

// Initial state:
const todos = ['Apple', 'Banana', 'Cherry'];

// Render:
<li key={0}>Apple</li>    // index 0
<li key={1}>Banana</li>   // index 1
<li key={2}>Cherry</li>   // index 2

// Delete "Banana":
const todos = ['Apple', 'Cherry'];

// New render:
<li key={0}>Apple</li>    // index 0 (same key)
<li key={1}>Cherry</li>   // index 1 (same key as Banana!)

// React's reconciliation:
// key={0}: Apple → Apple (no change)
// key={1}: Banana → Cherry (UPDATE TEXT!) ❌
// key={2}: Missing (REMOVE NODE)

// Problem: Cherry re-renders unnecessarily!
// Should just remove Banana, but React updates Cherry instead

// Issue 2: Component state gets mixed up

function TodoItem({ text }) {
  const [isChecked, setIsChecked] = useState(false);
  
  return (
    <li>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      {text}
    </li>
  );
}

// Initial:
<TodoItem key={0} text="Task A" />  // User checks this
<TodoItem key={1} text="Task B" />
<TodoItem key={2} text="Task C" />

// User checks "Task A" → isChecked = true for key={0}

// Delete "Task A":
<TodoItem key={0} text="Task B" />  // Now has Task A's state!
<TodoItem key={1} text="Task C" />

// Bug: "Task B" appears checked because it has key={0} now
// React preserved the state of key={0}, but the item changed!

Real-World Bug Example:
-----------------------

// Input state bug

function EditableList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <EditableItem key={index} item={item} />
      ))}
    </ul>
  );
}

function EditableItem({ item }) {
  const [value, setValue] = useState(item.name);
  
  return (
    <li>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </li>
  );
}

// Scenario:
// 1. User types in first input: "ABC"
items = [{ name: 'Item 1' }];  // key={0}, value="ABC"

// 2. Add new item at beginning:
items = [{ name: 'New Item' }, { name: 'Item 1' }];

// Now:
// key={0} → "New Item" (has value="ABC"!) ❌
// key={1} → "Item 1" (new state, value="Item 1")

// Bug: "New Item" input shows "ABC" instead of "New Item"

Reordering Bug:
---------------

// Drag and drop bug

function DraggableList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <DraggableItem key={index} item={item} />
      ))}
    </ul>
  );
}

function DraggableItem({ item }) {
  const [isDragging, setIsDragging] = useState(false);
  
  return (
    <li
      draggable
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {item.text}
    </li>
  );
}

// Before drag:
[
  { key: 0, text: 'A', isDragging: false },
  { key: 1, text: 'B', isDragging: false },
  { key: 2, text: 'C', isDragging: false }
]

// Drag B to top:
[
  { key: 0, text: 'B', isDragging: false },  // Wrong state!
  { key: 1, text: 'A', isDragging: false },
  { key: 2, text: 'C', isDragging: false }
]

// Bug: isDragging state doesn't follow the item
// State is tied to index, not item identity

Performance Issues:
-------------------

// Indices cause unnecessary re-renders

// Before filter:
const items = [
  { id: 1, name: 'A' },  // key={0}
  { id: 2, name: 'B' },  // key={1}
  { id: 3, name: 'C' },  // key={2}
  { id: 4, name: 'D' }   // key={3}
];

// After filter (remove B):
const items = [
  { id: 1, name: 'A' },  // key={0} (same)
  { id: 3, name: 'C' },  // key={1} (was 2) ❌
  { id: 4, name: 'D' }   // key={2} (was 3) ❌
];

// With index keys:
// - A: no change
// - C: key changed from 2 to 1 → re-render
// - D: key changed from 3 to 2 → re-render
// Total: 2 re-renders

// With stable IDs:
const items = [
  { id: 1, name: 'A' },  // key="1"
  { id: 3, name: 'C' },  // key="3" (same!)
  { id: 4, name: 'D' }   // key="4" (same!)
];

// - A: no change
// - C: key unchanged → no re-render
// - D: key unchanged → no re-render
// Total: 0 re-renders ✓

When Indices Are Acceptable:
-----------------------------

// ✅ OK to use index when:

// 1. List is static (never changes)
const STATIC_ITEMS = ['About', 'Contact', 'FAQ'];

function StaticList() {
  return (
    <ul>
      {STATIC_ITEMS.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

// 2. List is never reordered or filtered
function ReadOnlyList({ items }) {
  // Items only appended, never removed or reordered
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

// 3. List items have no state
function SimpleList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>  // Just text, no state
      ))}
    </ul>
  );
}

Better Key Alternatives:
------------------------

// ✅ Best: Database ID
items.map(item => <Item key={item.id} {...item} />);

// ✅ Good: Stable unique identifier
items.map(item => <Item key={item.uuid} {...item} />);

// ✅ Good: Combination of fields
items.map(item => (
  <Item key={`${item.category}-${item.name}`} {...item} />
));

// ✅ Acceptable: Generate stable IDs
const itemsWithIds = items.map((item, index) => ({
  ...item,
  _id: `${item.name}-${index}` // Generated once
}));

// ❌ Bad: Index
items.map((item, index) => <Item key={index} {...item} />);

// ❌ Bad: Random value
items.map(item => <Item key={Math.random()} {...item} />);

Fixing Index Key Bugs:
-----------------------

// Before (buggy):
function TodoList() {
  const [todos, setTodos] = useState([
    'Task A',
    'Task B',
    'Task C'
  ]);
  
  const removeTodo = (indexToRemove) => {
    setTodos(todos.filter((_, index) => index !== indexToRemove));
  };
  
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>  {/* ❌ Index key * /}
          <input type="checkbox" />
          {todo}
          <button onClick={() => removeTodo(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

// After (fixed):
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Task A' },
    { id: 2, text: 'Task B' },
    { id: 3, text: 'Task C' }
  ]);
  
  const removeTodo = (idToRemove) => {
    setTodos(todos.filter(todo => todo.id !== idToRemove));
  };
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>  {/* ✅ Stable ID * /}
          <input type="checkbox" />
          {todo.text}
          <button onClick={() => removeTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

Summary:

Index Keys Problems:
- State gets mixed up
- Wrong items re-render
- Performance issues
- Bugs with reordering
- Bugs with filtering
- Bugs with adding/removing
- Component state follows index, not item
- Use only for static lists
- Use stable IDs instead
- Database IDs are best
*/

