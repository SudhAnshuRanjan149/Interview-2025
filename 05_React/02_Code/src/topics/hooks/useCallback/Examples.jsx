import React, { useState, useCallback, useMemo } from 'react';

/**
useCallback - Example 1: Basic Memoized Callback
==================================================
*/
export function Example1_BasicMemoizedCallback() {
  const [count, setCount] = useState(0);

  // Without useCallback: new function created on every render
  const handleClickBad = () => {
    setCount(count + 1);
  };

  // With useCallback: same function reference (dependencies not changed)
  const handleClickGood = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 1: Basic Memoized Callback</h3>
      <p>Count: {count}</p>
      <button onClick={handleClickGood} style={{ marginRight: '10px' }}>
        Increment with useCallback
      </button>
      <p style={{ fontSize: '12px', color: '#999' }}>
        Same function reference maintained across renders when dependencies don't change
      </p>
    </div>
  );
}

/**
useCallback - Example 2: Passing Callback to Child Component
============================================================
*/
function ChildComponent({ onButtonClick, label }) {
  console.log(`ChildComponent rendered with label: ${label}`);
  
  return (
    <button 
      onClick={onButtonClick}
      style={{
        padding: '8px 12px',
        background: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer'
      }}
    >
      {label}
    </button>
  );
}

export function Example2_CallbackToChild() {
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  // Without useCallback: ChildComponent re-renders on every parent render
  const handleClickBad = () => {
    setCount(c => c + 1);
  };

  // With useCallback: ChildComponent only re-renders if dependencies change
  const handleClickGood = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  const forceRerender = () => setRenderCount(r => r + 1);

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 2: Callback to Child Component</h3>
      <p>Count: {count} | Parent Re-renders: {renderCount}</p>
      
      <div style={{ marginBottom: '15px' }}>
        <h4>Without useCallback (re-renders child every time):</h4>
        <ChildComponent onButtonClick={handleClickBad} label="Increment (No useCallback)" />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <h4>With useCallback (stable reference):</h4>
        <ChildComponent onButtonClick={handleClickGood} label="Increment (useCallback)" />
      </div>

      <button onClick={forceRerender} style={{ background: '#28a745', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
        Force Parent Re-render
      </button>
      <p style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>
        Check console - ChildComponent logs show how many times it renders
      </p>
    </div>
  );
}

/**
useCallback - Example 3: Callback with Dependencies
==================================================
*/
export function Example3_CallbackWithDependencies() {
  const [multiplier, setMultiplier] = useState(1);
  const [value, setValue] = useState(0);

  // Callback depends on multiplier
  const handleMultiply = useCallback(() => {
    setValue(v => v + multiplier);
  }, [multiplier]); // Re-creates when multiplier changes

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 3: Callback with Dependencies</h3>
      <p>Value: {value}</p>
      <p>Multiplier: {multiplier}</p>
      
      <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
        <button onClick={handleMultiply} style={{ padding: '8px 12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
          Add {multiplier}
        </button>
        <button 
          onClick={() => setMultiplier(m => m + 1)}
          style={{ padding: '8px 12px', background: '#17a2b8', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
        >
          Increase Multiplier
        </button>
        <button 
          onClick={() => setValue(0)}
          style={{ padding: '8px 12px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
        >
          Reset Value
        </button>
      </div>
      <p style={{ fontSize: '12px', color: '#999' }}>
        When multiplier changes, callback re-creates with new dependency
      </p>
    </div>
  );
}

/**
useCallback - Example 4: Filter List (Common Use Case)
====================================================
*/
function FilteredListDisplay({ items, onItemClick, filterFn }) {
  console.log('FilteredListDisplay rendered');
  const filtered = items.filter(filterFn);
  
  return (
    <ul style={{ listStyle: 'none', padding: '10px', background: '#f9f9f9', borderRadius: '3px' }}>
      {filtered.map((item, idx) => (
        <li 
          key={idx}
          onClick={() => onItemClick(item)}
          style={{
            padding: '8px',
            marginBottom: '5px',
            background: '#fff',
            border: '1px solid #ddd',
            borderRadius: '3px',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseEnter={e => e.target.style.background = '#f0f0f0'}
          onMouseLeave={e => e.target.style.background = '#fff'}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Example4_FilterList() {
  const [items] = useState(['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterLength, setFilterLength] = useState(5);

  // Without useCallback: FilteredListDisplay re-renders and filter runs every time
  const filterBad = (item) => item.length <= filterLength;

  // With useCallback: Only creates new filter when filterLength changes
  const filterGood = useCallback((item) => item.length <= filterLength, [filterLength]);

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 4: Filter List</h3>
      <p>Filter by length: 
        <input 
          type="number" 
          value={filterLength}
          onChange={e => setFilterLength(Number(e.target.value))}
          min="1"
          max="10"
          style={{ marginLeft: '10px', padding: '5px', width: '60px' }}
        />
      </p>
      
      <div style={{ marginBottom: '15px' }}>
        <h4>With useCallback (stable filter function):</h4>
        <FilteredListDisplay items={items} onItemClick={setSelectedItem} filterFn={filterGood} />
      </div>

      {selectedItem && (
        <div style={{ marginTop: '10px', padding: '10px', background: '#e7f3ff', borderRadius: '3px', border: '1px solid #b3d9ff' }}>
          Selected: <strong>{selectedItem}</strong>
        </div>
      )}
    </div>
  );
}

/**
useCallback - Example 5: Event Handler with Arguments
===================================================
*/
function TodoItem({ id, text, onDelete, onToggle, completed }) {
  console.log(`TodoItem ${id} rendered`);
  
  return (
    <li style={{
      padding: '10px',
      marginBottom: '8px',
      background: completed ? '#e8f5e9' : '#fff3e0',
      borderRadius: '3px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      textDecoration: completed ? 'line-through' : 'none'
    }}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
      />
      <span style={{ flex: 1 }}>{text}</span>
      <button 
        onClick={() => onDelete(id)}
        style={{
          background: '#ff6b6b',
          color: 'white',
          border: 'none',
          padding: '5px 10px',
          borderRadius: '3px',
          cursor: 'pointer'
        }}
      >
        Delete
      </button>
    </li>
  );
}

export function Example5_EventHandlerWithArguments() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn useCallback', completed: false },
    { id: 2, text: 'Optimize React', completed: true },
    { id: 3, text: 'Memoize callbacks', completed: false }
  ]);

  // Create stable callbacks even with arguments
  const handleDelete = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const handleToggle = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 5: Event Handler with Arguments</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ))}
      </ul>
      <p style={{ fontSize: '12px', color: '#999', marginTop: '15px' }}>
        Check console - TodoItem logs show stable references (minimal re-renders)
      </p>
    </div>
  );
}

/**
useCallback - Example 6: Search with Debounce Pattern
===================================================
*/
export function Example6_SearchWithCallback() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  // Simulated search function
  const performSearch = useCallback((term) => {
    console.log('Searching for:', term);
    const allItems = ['React', 'Redux', 'Router', 'Relay', 'Angular', 'Vue', 'Svelte'];
    if (term) {
      const filtered = allItems.filter(item => 
        item.toLowerCase().includes(term.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, []); // No dependencies - search logic is stable

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    performSearch(term);
  };

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 6: Search with Callback</h3>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search frameworks..."
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '10px',
          border: '1px solid #ccc',
          borderRadius: '3px',
          boxSizing: 'border-box'
        }}
      />
      
      {results.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {results.map((result, idx) => (
            <li
              key={idx}
              style={{
                padding: '8px',
                marginBottom: '5px',
                background: '#e3f2fd',
                borderLeft: '3px solid #2196F3',
                paddingLeft: '10px'
              }}
            >
              {result}
            </li>
          ))}
        </ul>
      ) : searchTerm ? (
        <p style={{ color: '#999' }}>No results found for "{searchTerm}"</p>
      ) : null}
    </div>
  );
}

/**
useCallback - Example 7: useCallback vs Creating Function Inline
==============================================================
*/
function ComparingComponent({ onCallback, label }) {
  const [renderCount, setRenderCount] = useState(0);

  return (
    <div style={{
      padding: '10px',
      marginBottom: '10px',
      background: '#f5f5f5',
      borderRadius: '3px',
      border: '1px solid #ddd'
    }}>
      <p>{label}</p>
      <p>Renders: {renderCount}</p>
      <button 
        onClick={() => setRenderCount(r => r + 1)}
        style={{
          padding: '5px 10px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer'
        }}
      >
        Trigger Callback Prop Check
      </button>
    </div>
  );
}

export function Example7_ComparisonWithInline() {
  const [parentRenders, setParentRenders] = useState(0);

  // Inline function - different reference every render
  const inlineCallback = () => {
    console.log('Inline callback called');
  };

  // useCallback - same reference if dependencies don't change
  const memoizedCallback = useCallback(() => {
    console.log('Memoized callback called');
  }, []);

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 7: useCallback vs Inline Function</h3>
      <p>Parent Renders: {parentRenders}</p>
      
      <button 
        onClick={() => setParentRenders(r => r + 1)}
        style={{
          padding: '8px 12px',
          background: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          marginBottom: '15px'
        }}
      >
        Force Parent Re-render
      </button>

      <ComparingComponent onCallback={inlineCallback} label="Inline Function (new on each render)" />
      <ComparingComponent onCallback={memoizedCallback} label="useCallback (stable reference)" />
    </div>
  );
}

/**
All Examples Component
======================
*/
export function UseCallbackExamples() {
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h2>useCallback - Practical Examples</h2>
      <Example1_BasicMemoizedCallback />
      <Example2_CallbackToChild />
      <Example3_CallbackWithDependencies />
      <Example4_FilterList />
      <Example5_EventHandlerWithArguments />
      <Example6_SearchWithCallback />
      <Example7_ComparisonWithInline />
    </div>
  );
}

export default UseCallbackExamples;
