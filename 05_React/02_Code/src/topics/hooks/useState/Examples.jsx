import React, { useState } from 'react';

/**
useState - Example 1: Basic Counter
====================================
*/
export function Example1_BasicCounter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 1: Basic Counter</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)} style={{ marginRight: '10px' }}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)} style={{ marginRight: '10px' }}>
        Decrement
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}

/**
useState - Example 2: Multiple State Variables
==============================================
*/
export function Example2_MultipleStates() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 2: Multiple State Variables</h3>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter name"
          />
        </div>
        <div>
          <label>Age: </label>
          <input
            type="number"
            value={age}
            onChange={e => setAge(Number(e.target.value))}
            placeholder="Enter age"
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>
      </form>
      <div style={{ marginTop: '15px', padding: '10px', background: '#f0f0f0', borderRadius: '3px' }}>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Age:</strong> {age}</p>
        <p><strong>Email:</strong> {email}</p>
      </div>
    </div>
  );
}

/**
useState - Example 3: Functional Updates (Batching)
==================================================
*/
export function Example3_FunctionalUpdates() {
  const [count, setCount] = useState(0);

  // Without functional updates: all use count value from render
  const handleClickBad = () => {
    setCount(count + 1); // count is 0, so sets to 1
    setCount(count + 1); // count is still 0, so sets to 1
    setCount(count + 1); // count is still 0, so sets to 1
    // Result: count becomes 1
  };

  // With functional updates: each receives updated value
  const handleClickGood = () => {
    setCount(prev => prev + 1); // prev is current state
    setCount(prev => prev + 1); // prev is result of previous update
    setCount(prev => prev + 1); // prev is result of previous update
    // Result: count becomes 3
  };

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 3: Functional Updates</h3>
      <p>Count: {count}</p>
      <button onClick={handleClickBad} style={{ marginRight: '10px' }}>
        Bad: Direct Update (+1 per click becomes +1)
      </button>
      <button onClick={handleClickGood}>
        Good: Functional Update (+3 per click)
      </button>
    </div>
  );
}

/**
useState - Example 4: Working with Arrays
=========================================
*/
export function Example4_Arrays() {
  const [items, setItems] = useState(['Item 1', 'Item 2']);
  const [input, setInput] = useState('');

  const addItem = () => {
    if (input.trim()) {
      setItems([...items, input]); // Create new array
      setInput('');
    }
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index)); // Create new array
  };

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 4: Working with Arrays</h3>
      <div style={{ marginBottom: '10px', display: 'flex', gap: '5px' }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add item"
          onKeyPress={e => e.key === 'Enter' && addItem()}
        />
        <button onClick={addItem}>Add</button>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index} style={{ marginBottom: '5px' }}>
            {item}
            <button onClick={() => removeItem(index)} style={{ marginLeft: '10px', color: 'red' }}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
useState - Example 5: Working with Objects
==========================================
*/
export function Example5_Objects() {
  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com'
  });

  const updateField = (field, value) => {
    setUser({ ...user, [field]: value }); // Create new object, spread old values
  };

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 5: Working with Objects</h3>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label>First Name: </label>
          <input
            type="text"
            value={user.firstName}
            onChange={e => updateField('firstName', e.target.value)}
          />
        </div>
        <div>
          <label>Last Name: </label>
          <input
            type="text"
            value={user.lastName}
            onChange={e => updateField('lastName', e.target.value)}
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={user.email}
            onChange={e => updateField('email', e.target.value)}
          />
        </div>
      </form>
      <div style={{ marginTop: '15px', padding: '10px', background: '#f0f0f0', borderRadius: '3px' }}>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
}

/**
useState - Example 6: Toggle
===========================
*/
export function Example6_Toggle() {
  const [isVisible, setIsVisible] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 6: Toggle Boolean State</h3>
      <button onClick={() => setIsVisible(prev => !prev)} style={{ marginRight: '10px' }}>
        {isVisible ? 'Hide' : 'Show'} Content
      </button>
      <button onClick={() => setIsDarkMode(prev => !prev)}>
        {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>

      {isVisible && (
        <div style={{
          marginTop: '15px',
          padding: '15px',
          background: isDarkMode ? '#333' : '#f0f0f0',
          color: isDarkMode ? '#fff' : '#000',
          borderRadius: '3px'
        }}>
          This content is visible in {isDarkMode ? 'Dark' : 'Light'} Mode
        </div>
      )}
    </div>
  );
}

/**
useState - Example 7: Lazy Initialization
========================================
*/
export function Example7_LazyInitialization() {
  // Expensive calculation only runs once on first render
  const [data, setData] = useState(() => {
    console.log('Expensive calculation running...');
    let sum = 0;
    for (let i = 0; i < 10000; i++) {
      sum += i;
    }
    return sum;
  });

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 7: Lazy Initialization</h3>
      <p>Calculated Value (check console): {data}</p>
      <p>Note: Expensive calculation only ran once on mount</p>
    </div>
  );
}

/**
useState - Example 8: Todo List (Complex State)
==============================================
*/
export function Example8_TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build Project', completed: true }
  ]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      const newTodo = {
        id: Date.now(),
        text: input,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 8: Todo List</h3>
      <div style={{ marginBottom: '15px', display: 'flex', gap: '5px' }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a new todo"
          onKeyPress={e => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>
        {completedCount} of {todos.length} completed
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{
              padding: '10px',
              marginBottom: '5px',
              background: todo.completed ? '#e8f5e9' : '#fff3e0',
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: 'auto', color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
All Examples Component
======================
*/
export function UseStateExamples() {
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h2>useState - Practical Examples</h2>
      <Example1_BasicCounter />
      <Example2_MultipleStates />
      <Example3_FunctionalUpdates />
      <Example4_Arrays />
      <Example5_Objects />
      <Example6_Toggle />
      <Example7_LazyInitialization />
      <Example8_TodoList />
    </div>
  );
}

export default UseStateExamples;
