import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Update this URL when deploying to Kubernetes
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
    
    fetch(`${apiUrl}/api/health`)
      .then(res => res.json())
      .then(data => {
        setMessage(data.message);
        setLoading(false);
      })
      .catch(err => {
        setMessage('Failed to connect to backend');
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React + Node.js Kubernetes App</h1>
        {loading ? <p>Loading...</p> : <p>{message}</p>}
        <p>Environment: {process.env.NODE_ENV}</p>
      </header>
    </div>
  );
}

export default App;
