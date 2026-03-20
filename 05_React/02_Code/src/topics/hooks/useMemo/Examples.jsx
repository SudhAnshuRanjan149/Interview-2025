import React, { useState, useMemo } from 'react';

/**
useMemo - Example 1: Basic Memoized Value
==========================================
*/
export function Example1_BasicMemoization() {
  const [count, setCount] = useState(0);
  const [renderTrigger, setRenderTrigger] = useState(0);

  // Without useMemo: recalculates on every render
  const expensiveCalculationBad = () => {
    console.log('Computing without useMemo...');
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
      sum += i;
    }
    return sum;
  };

  // With useMemo: only recalculates when dependencies change
  const expensiveCalculationGood = useMemo(() => {
    console.log('Computing with useMemo...');
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
      sum += i;
    }
    return sum;
  }, []);

  const resultBad = expensiveCalculationBad();
  const resultGood = expensiveCalculationGood;

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 1: Basic Memoization</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)} style={{ marginRight: '10px' }}>
        Increment Count
      </button>
      <button onClick={() => setRenderTrigger(r => r + 1)}>
        Trigger Re-render
      </button>
      
      <div style={{ marginTop: '15px', padding: '10px', background: '#f9f9f9', borderRadius: '3px' }}>
        <p><strong>Without useMemo:</strong> {resultBad}</p>
        <p><strong>With useMemo:</strong> {resultGood}</p>
      </div>
      
      <p style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>
        Check console: Without useMemo computes on every render. With useMemo computes only once.
      </p>
    </div>
  );
}

/**
useMemo - Example 2: Memoizing Computed List
=============================================
*/
export function Example2_ComputedList() {
  const [items, setItems] = useState([1, 2, 3, 4, 5]);
  const [multiplier, setMultiplier] = useState(1);
  const [renderCount, setRenderCount] = useState(0);

  // Without useMemo: recreates array on every render
  const multipliedItemsBad = items.map(item => item * multiplier);

  // With useMemo: only recreates when items or multiplier change
  const multipliedItemsGood = useMemo(
    () => {
      console.log('Computing multiplied items...');
      return items.map(item => item * multiplier);
    },
    [items, multiplier]
  );

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 2: Memoizing Computed List</h3>
      <p>Multiplier: {multiplier}</p>
      
      <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
        <button onClick={() => setMultiplier(m => m + 1)}>Increase Multiplier</button>
        <button onClick={() => setRenderCount(r => r + 1)}>Force Re-render</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div>
          <h4>Without useMemo (new array):</h4>
          <div style={{ padding: '10px', background: '#fff3e0', borderRadius: '3px' }}>
            {multipliedItemsBad.map((item, idx) => (
              <span key={idx} style={{ marginRight: '10px', padding: '5px', background: '#fff', borderRadius: '2px' }}>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4>With useMemo (stable reference):</h4>
          <div style={{ padding: '10px', background: '#e8f5e9', borderRadius: '3px' }}>
            {multipliedItemsGood.map((item, idx) => (
              <span key={idx} style={{ marginRight: '10px', padding: '5px', background: '#fff', borderRadius: '2px' }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
useMemo - Example 3: Memoizing Objects
======================================
*/
export function Example3_MemoizedObjects() {
  const [name, setName] = useState('John');
  const [age, setAge] = useState(30);
  const [renderCount, setRenderCount] = useState(0);

  // Without useMemo: new object on every render
  const userBad = {
    name: name,
    age: age,
    email: `${name.toLowerCase()}@example.com`
  };

  // With useMemo: same object reference when name/age don't change
  const userGood = useMemo(() => ({
    name: name,
    age: age,
    email: `${name.toLowerCase()}@example.com`
  }), [name, age]);

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 3: Memoizing Objects</h3>
      
      <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
        <div>
          <label>Name: </label>
          <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)}
            style={{ padding: '5px', marginLeft: '5px' }}
          />
        </div>
        <div>
          <label>Age: </label>
          <input 
            type="number" 
            value={age} 
            onChange={e => setAge(Number(e.target.value))}
            style={{ padding: '5px', marginLeft: '5px', width: '60px' }}
          />
        </div>
        <button onClick={() => setRenderCount(r => r + 1)}>Force Re-render</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div>
          <h4>Without useMemo:</h4>
          <pre style={{ background: '#fff3e0', padding: '10px', borderRadius: '3px', fontSize: '12px' }}>
            {JSON.stringify(userBad, null, 2)}
          </pre>
        </div>

        <div>
          <h4>With useMemo:</h4>
          <pre style={{ background: '#e8f5e9', padding: '10px', borderRadius: '3px', fontSize: '12px' }}>
            {JSON.stringify(userGood, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

/**
useMemo - Example 4: Filtering and Sorting
===========================================
*/
export function Example4_FilteringAndSorting() {
  const [data] = useState([
    { id: 3, name: 'Charlie', score: 85 },
    { id: 1, name: 'Alice', score: 95 },
    { id: 2, name: 'Bob', score: 88 },
    { id: 5, name: 'Eve', score: 92 },
    { id: 4, name: 'David', score: 78 }
  ]);
  
  const [minScore, setMinScore] = useState(0);
  const [sortBy, setSortBy] = useState('name');

  // Without useMemo: filters and sorts on every render
  const filteredAndSortedBad = data
    .filter(item => item.score >= minScore)
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return b.score - a.score;
    });

  // With useMemo: only recalculates when dependencies change
  const filteredAndSortedGood = useMemo(() => {
    console.log('Filtering and sorting...');
    return data
      .filter(item => item.score >= minScore)
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return b.score - a.score;
      });
  }, [data, minScore, sortBy]);

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 4: Filtering and Sorting</h3>
      
      <div style={{ marginBottom: '15px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <div>
          <label>Min Score: </label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={minScore}
            onChange={e => setMinScore(Number(e.target.value))}
            style={{ marginLeft: '5px' }}
          />
          <span>{minScore}</span>
        </div>

        <div>
          <label>Sort By: </label>
          <select 
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{ marginLeft: '5px', padding: '5px' }}
          >
            <option value="name">Name</option>
            <option value="score">Score</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div>
          <h4>Without useMemo:</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f0f0f0' }}>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedBad.map(item => (
                <tr key={item.id} style={{ background: '#fff3e0' }}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.name}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h4>With useMemo:</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f0f0f0' }}>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedGood.map(item => (
                <tr key={item.id} style={{ background: '#e8f5e9' }}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.name}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/**
useMemo - Example 5: Expensive Computation
===========================================
*/
export function Example5_ExpensiveComputation() {
  const [count, setCount] = useState(10);
  const [triggerRender, setTriggerRender] = useState(0);

  // Expensive: Fibonacci calculation
  const fibonacciBad = (n) => {
    console.log(`Computing fibonacci(${n}) without memoization...`);
    if (n <= 1) return n;
    return fibonacciBad(n - 1) + fibonacciBad(n - 2);
  };

  // With useMemo
  const fibonacciGood = useMemo(() => {
    console.log(`Computing fibonacci(${count}) with memoization...`);
    const fib = (n) => {
      if (n <= 1) return n;
      return fib(n - 1) + fib(n - 2);
    };
    return fib(count);
  }, [count]);

  const resultBad = fibonacciBad(count);

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 5: Expensive Computation (Fibonacci)</h3>
      
      <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
        <div>
          <label>N: </label>
          <input 
            type="number" 
            value={count}
            onChange={e => setCount(Number(e.target.value))}
            min="1"
            max="35"
            style={{ marginLeft: '5px', width: '60px', padding: '5px' }}
          />
        </div>
        <button onClick={() => setTriggerRender(r => r + 1)}>Force Re-render</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div style={{ padding: '10px', background: '#fff3e0', borderRadius: '3px' }}>
          <h4>Without useMemo:</h4>
          <p>fibonacci({count}) = {resultBad}</p>
          <p style={{ fontSize: '12px', color: '#999' }}>Recalculates on every render</p>
        </div>

        <div style={{ padding: '10px', background: '#e8f5e9', borderRadius: '3px' }}>
          <h4>With useMemo:</h4>
          <p>fibonacci({count}) = {fibonacciGood}</p>
          <p style={{ fontSize: '12px', color: '#999' }}>Only recalculates when count changes</p>
        </div>
      </div>

      <p style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>
        Check console to see calculation timing. Note: Try high values (25+) to see performance difference!
      </p>
    </div>
  );
}

/**
useMemo - Example 6: Derived State
==================================
*/
export function Example6_DerivedState() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn useMemo', completed: false },
    { id: 2, text: 'Optimize app', completed: true },
    { id: 3, text: 'Write tests', completed: false }
  ]);
  const [input, setInput] = useState('');

  // Derived state: calculate statistics
  const stats = useMemo(() => {
    console.log('Calculating statistics...');
    return {
      total: todos.length,
      completed: todos.filter(t => t.completed).length,
      pending: todos.filter(t => !t.completed).length,
      completionRate: Math.round((todos.filter(t => t.completed).length / todos.length) * 100)
    };
  }, [todos]);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 6: Derived State (Todo Statistics)</h3>

      <div style={{ marginBottom: '15px', display: 'flex', gap: '5px' }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && addTodo()}
          placeholder="Add a todo..."
          style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '3px' }}
        />
        <button 
          onClick={addTodo}
          style={{ padding: '8px 15px', background: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
        >
          Add
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '15px' }}>
        <div style={{ padding: '10px', background: '#e3f2fd', borderRadius: '3px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1976d2' }}>{stats.total}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Total</div>
        </div>
        <div style={{ padding: '10px', background: '#e8f5e9', borderRadius: '3px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#388e3c' }}>{stats.completed}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Completed</div>
        </div>
        <div style={{ padding: '10px', background: '#fff3e0', borderRadius: '3px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f57c00' }}>{stats.pending}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Pending</div>
        </div>
        <div style={{ padding: '10px', background: '#f3e5f5', borderRadius: '3px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#7b1fa2' }}>{stats.completionRate}%</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Progress</div>
        </div>
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
              onChange={() => setTodos(todos.map(t => 
                t.id === todo.id ? { ...t, completed: !t.completed } : t
              ))}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>

      <p style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>
        Check console: Statistics recalculate only when todos change, not on every render
      </p>
    </div>
  );
}

/**
useMemo - Example 7: Search Results
===================================
*/
export function Example7_SearchResults() {
  const [searchTerm, setSearchTerm] = useState('');
  const [renderCount, setRenderCount] = useState(0);

  const items = [
    'Apple', 'Apricot', 'Avocado',
    'Banana', 'Blueberry', 'Blackberry',
    'Cherry', 'Cranberry',
    'Date', 'Dragonfruit',
    'Elderberry',
    'Fig',
    'Grape', 'Guava',
    'Honeydew'
  ];

  // Without useMemo: searches on every render
  const resultsBad = items.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // With useMemo: only searches when searchTerm changes
  const resultsGood = useMemo(() => {
    console.log(`Searching for "${searchTerm}"...`);
    return items.filter(item =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 7: Search Results</h3>

      <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search fruits..."
          style={{
            flex: 1,
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '3px'
          }}
        />
        <button 
          onClick={() => setRenderCount(r => r + 1)}
          style={{ padding: '10px 15px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
        >
          Re-render
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div>
          <h4>Without useMemo ({resultsBad.length} results):</h4>
          <div style={{ padding: '10px', background: '#fff3e0', borderRadius: '3px', maxHeight: '200px', overflow: 'auto' }}>
            {resultsBad.length > 0 ? (
              resultsBad.map((item, idx) => (
                <div key={idx} style={{ padding: '5px', marginBottom: '3px', background: '#fff', borderRadius: '2px' }}>
                  {item}
                </div>
              ))
            ) : (
              <div style={{ color: '#999' }}>No results</div>
            )}
          </div>
        </div>

        <div>
          <h4>With useMemo ({resultsGood.length} results):</h4>
          <div style={{ padding: '10px', background: '#e8f5e9', borderRadius: '3px', maxHeight: '200px', overflow: 'auto' }}>
            {resultsGood.length > 0 ? (
              resultsGood.map((item, idx) => (
                <div key={idx} style={{ padding: '5px', marginBottom: '3px', background: '#fff', borderRadius: '2px' }}>
                  {item}
                </div>
              ))
            ) : (
              <div style={{ color: '#999' }}>No results</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
All Examples Component
======================
*/
export function UseMemoExamples() {
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h2>useMemo - Practical Examples</h2>
      <Example1_BasicMemoization />
      <Example2_ComputedList />
      <Example3_MemoizedObjects />
      <Example4_FilteringAndSorting />
      <Example5_ExpensiveComputation />
      <Example6_DerivedState />
      <Example7_SearchResults />
    </div>
  );
}

export default UseMemoExamples;
