import React, { useState, useEffect } from 'react';

/**
useEffect - Example 1: Basic Effect on Mount
============================================
*/
export function Example1_BasicMount() {
  const [message, setMessage] = useState('Component mounted');

  useEffect(() => {
    console.log('Component mounted - effect ran');
    setMessage('Effect has run!');

    return () => {
      console.log('Component unmounting - cleanup ran');
    };
  }, []); // Empty dependency array = run once on mount

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 1: Basic Effect on Mount</h3>
      <p>{message}</p>
      <p>Check console to see effect and cleanup logs</p>
    </div>
  );
}

/**
useEffect - Example 2: Effect with Dependencies
==============================================
*/
export function Example2_WithDependencies() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage(`Count changed to: ${count}`);
    console.log('Count dependency effect ran, count =', count);
  }, [count]); // Run when count changes

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 2: Effect with Dependencies</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <p style={{ marginTop: '10px', color: '#666' }}>Message: {message}</p>
      <p style={{ fontSize: '12px', color: '#999' }}>Open console to see effect logs</p>
    </div>
  );
}

/**
useEffect - Example 3: Multiple Dependencies
===========================================
*/
export function Example3_MultipleDependencies() {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    setFullName(`${firstName} ${lastName}`);
  }, [firstName, lastName]); // Run when either changes

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 3: Multiple Dependencies</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label>First Name: </label>
          <input value={firstName} onChange={e => setFirstName(e.target.value)} />
        </div>
        <div>
          <label>Last Name: </label>
          <input value={lastName} onChange={e => setLastName(e.target.value)} />
        </div>
        <p style={{ fontWeight: 'bold', marginTop: '10px' }}>Full Name: {fullName}</p>
      </div>
    </div>
  );
}

/**
useEffect - Example 4: Cleanup Function
======================================
*/
export function Example4_Cleanup() {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    // Set up timer
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    console.log('Timer started');

    // Cleanup: clear timer
    return () => {
      clearInterval(interval);
      console.log('Timer cleared - cleanup ran');
    };
  }, []); // Run once

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 4: Cleanup Function</h3>
      <p>Current Time: {time}</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment Count</button>
      <p style={{ fontSize: '12px', color: '#999' }}>Timer updates every second. Check console.</p>
    </div>
  );
}

/**
useEffect - Example 5: Event Listener with Cleanup
=================================================
*/
export function Example5_EventListener() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    console.log('Resize listener added');

    return () => {
      window.removeEventListener('resize', handleResize);
      console.log('Resize listener removed');
    };
  }, []); // Run once

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 5: Event Listener with Cleanup</h3>
      <p>Window Width: {windowWidth}px</p>
      <p style={{ fontSize: '12px', color: '#999' }}>Try resizing the window</p>
    </div>
  );
}

/**
useEffect - Example 6: Data Fetching
===================================
*/
export function Example6_DataFetching() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Track if component is mounted

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        const data = await response.json();

        if (isMounted) {
          setPosts(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup: mark component as unmounted
    };
  }, []); // Fetch on mount

  if (loading) return <div style={{ padding: '15px' }}>Loading...</div>;
  if (error) return <div style={{ padding: '15px', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 6: Data Fetching</h3>
      <ul>
        {posts.map(post => (
          <li key={post.id} style={{ marginBottom: '10px', fontSize: '14px' }}>
            <strong>{post.title}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
useEffect - Example 7: Multiple Effects
======================================
*/
export function Example7_MultipleEffects() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [logMessages, setLogMessages] = useState([]);

  // Effect 1: Log count changes
  useEffect(() => {
    setLogMessages(prev => [...prev, `Count changed to: ${count}`]);
  }, [count]);

  // Effect 2: Log name changes
  useEffect(() => {
    setLogMessages(prev => [...prev, `Name changed to: ${name}`]);
  }, [name]);

  // Effect 3: Document title
  useEffect(() => {
    document.title = `Count: ${count}, Name: ${name}`;
  }, [count, name]);

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 7: Multiple Effects</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '15px' }}>
        <div>
          <button onClick={() => setCount(c => c + 1)}>
            Count: {count}
          </button>
        </div>
        <div>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter name"
          />
        </div>
      </div>
      <div style={{ background: '#f0f0f0', padding: '10px', borderRadius: '3px', maxHeight: '150px', overflow: 'auto' }}>
        <p style={{ fontWeight: 'bold', marginTop: 0 }}>Logs:</p>
        {logMessages.slice(-5).map((msg, idx) => (
          <p key={idx} style={{ margin: '5px 0', fontSize: '12px' }}>
            {msg}
          </p>
        ))}
      </div>
    </div>
  );
}

/**
useEffect - Example 8: Document Title
====================================
*/
export function Example8_DocumentTitle() {
  const [title, setTitle] = useState('My Page');

  useEffect(() => {
    document.title = title;

    return () => {
      document.title = 'React App'; // Reset on cleanup
    };
  }, [title]);

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 8: Document Title Sync</h3>
      <div>
        <label>Update Page Title: </label>
        <input value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <p style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>
        Check browser tab title - it updates as you type
      </p>
    </div>
  );
}

/**
All Examples Component
======================
*/
export function UseEffectExamples() {
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h2>useEffect - Practical Examples</h2>
      <Example1_BasicMount />
      <Example2_WithDependencies />
      <Example3_MultipleDependencies />
      <Example4_Cleanup />
      <Example5_EventListener />
      <Example6_DataFetching />
      <Example7_MultipleEffects />
      <Example8_DocumentTitle />
    </div>
  );
}

export default UseEffectExamples;
