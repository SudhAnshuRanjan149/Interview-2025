import React, { useState } from 'react';
import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [sanitizedOutput, setSanitizedOutput] = useState('');

  // XSS Protection - Always sanitize user input
  const handleSubmit = (e) => {
    e.preventDefault();
    const DOMPurify = require('dompurify');
    const clean = DOMPurify.sanitize(userInput);
    setSanitizedOutput(clean);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Secure React App with Podman</h1>
        <p>Production-ready React application with security best practices</p>
        
        {/* XSS Protection Demo */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter text (XSS protected)"
            style={{ padding: '10px', margin: '10px', width: '300px' }}
          />
          <button type="submit" style={{ padding: '10px 20px' }}>
            Sanitize & Display
          </button>
        </form>
        
        {sanitizedOutput && (
          <div style={{ marginTop: '20px', padding: '10px', background: '#282c34' }}>
            <p>Sanitized Output: {sanitizedOutput}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
