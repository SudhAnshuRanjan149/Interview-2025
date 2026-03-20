/*


========================================================
SECTION 9 — ERROR HANDLING & DEBUGGING
========================================================
72. What are error boundaries?  
73. How does React handle errors in components?  
74. What is componentDidCatch?  
75. How do you debug React applications?  
76. What tools can be used for profiling React performance?  

*/




/**
72. What are error boundaries?
------------------------------

Error boundaries are React components that catch JavaScript errors anywhere in their
child component tree, log those errors, and display a fallback UI instead of crashing
the entire app. They work like a JavaScript catch {} block but for components.

Why Error Boundaries:
---------------------

// Without error boundary: One error crashes entire app
function App() {
  return (
    <div>
      <Header />
      <BuggyComponent /> {/* Error here crashes everything! * /}
      <Footer />
    </div>
  );
}

// With error boundary: Error contained, rest of app works
function App() {
  return (
    <div>
      <Header />
      <ErrorBoundary fallback={<ErrorMessage />}>
        <BuggyComponent /> {/* Error here only affects this section * /}
      </ErrorBoundary>
      <Footer /> {/* Still works! * /}
    </div>
  );
}

Creating an Error Boundary:
----------------------------

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  
  // Catch errors during rendering
  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true };
  }
  
  // Log error details
  componentDidCatch(error, errorInfo) {
    // Log to error reporting service
    console.error('Error caught by boundary:', error);
    console.error('Error info:', errorInfo);
    
    // Store error details in state
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Send to error tracking service (e.g., Sentry)
    logErrorToService(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <div className="error-boundary">
          <h1>Something went wrong</h1>
          <p>We're sorry for the inconvenience.</p>
          {process.env.NODE_ENV === 'development' && (
            <details>
              <summary>Error details</summary>
              <pre>{this.state.error?.toString()}</pre>
              <pre>{this.state.errorInfo?.componentStack}</pre>
            </details>
          )}
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    
    // No error, render children normally
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>

Error Boundary with Custom Fallback:
-------------------------------------

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      // Use custom fallback from props
      return this.props.fallback;
    }
    
    return this.props.children;
  }
}

// Usage with custom fallback
<ErrorBoundary fallback={<h1>Something went wrong!</h1>}>
  <MyComponent />
</ErrorBoundary>

<ErrorBoundary fallback={<CustomErrorUI />}>
  <AnotherComponent />
</ErrorBoundary>

Error Boundary with Reset:
---------------------------

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }
  
  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
  };
  
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Error occurred</h1>
          <p>{this.state.error?.message}</p>
          <button onClick={this.resetErrorBoundary}>
            Try again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

What Error Boundaries Catch:
-----------------------------

✅ Error boundaries catch:

1. Errors during rendering
   
function BuggyComponent() {
  throw new Error('Rendering error!');
  return <div>Content</div>;
}

2. Errors in lifecycle methods

class BuggyComponent extends React.Component {
  componentDidMount() {
    throw new Error('Lifecycle error!');
  }
  
  render() {
    return <div>Content</div>;
  }
}

3. Errors in constructors

class BuggyComponent extends React.Component {
  constructor(props) {
    super(props);
    throw new Error('Constructor error!');
  }
  
  render() {
    return <div>Content</div>;
  }
}

What Error Boundaries DON'T Catch:
-----------------------------------

❌ Error boundaries do NOT catch:

1. Errors in event handlers

function BuggyComponent() {
  const handleClick = () => {
    throw new Error('Event handler error!'); // Not caught!
  };
  
  return <button onClick={handleClick}>Click</button>;
}

// Solution: Use try-catch
function SafeComponent() {
  const handleClick = () => {
    try {
      throw new Error('Event handler error!');
    } catch (error) {
      console.error('Caught:', error);
    }
  };
  
  return <button onClick={handleClick}>Click</button>;
}

2. Async code (setTimeout, promises)

function BuggyComponent() {
  useEffect(() => {
    setTimeout(() => {
      throw new Error('Timeout error!'); // Not caught!
    }, 1000);
  }, []);
  
  return <div>Content</div>;
}

// Solution: Use try-catch
function SafeComponent() {
  useEffect(() => {
    setTimeout(() => {
      try {
        throw new Error('Timeout error!');
      } catch (error) {
        console.error('Caught:', error);
      }
    }, 1000);
  }, []);
  
  return <div>Content</div>;
}

3. Server-side rendering errors

4. Errors in the error boundary itself

class BuggyErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    throw new Error('Error in error boundary!'); // Not caught!
  }
  
  render() {
    return this.props.children;
  }
}

Granular Error Boundaries:
---------------------------

// Wrap different parts of app with separate boundaries

function App() {
  return (
    <div>
      <Header />
      
      {/* Sidebar errors don't affect main content * /}
      <ErrorBoundary fallback={<div>Sidebar unavailable</div>}>
        <Sidebar />
      </ErrorBoundary>
      
      {/* Main content errors don't affect sidebar * /}
      <ErrorBoundary fallback={<div>Content unavailable</div>}>
        <MainContent />
      </ErrorBoundary>
      
      {/* Comments errors don't affect main content * /}
      <ErrorBoundary fallback={<div>Comments unavailable</div>}>
        <Comments />
      </ErrorBoundary>
      
      <Footer />
    </div>
  );
}

Error Boundary with Retry Logic:
---------------------------------

class RetryErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      retryCount: 0,
      maxRetries: 3
    };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }
  
  handleReset = () => {
    const { retryCount, maxRetries } = this.state;
    
    if (retryCount < maxRetries) {
      this.setState({
        hasError: false,
        retryCount: retryCount + 1
      });
    }
  };
  
  render() {
    const { hasError, retryCount, maxRetries } = this.state;
    
    if (hasError) {
      if (retryCount >= maxRetries) {
        return (
          <div>
            <h1>Unable to load content</h1>
            <p>Maximum retry attempts reached.</p>
            <button onClick={() => window.location.reload()}>
              Reload page
            </button>
          </div>
        );
      }
      
      return (
        <div>
          <h1>Something went wrong</h1>
          <p>Retry attempt {retryCount + 1} of {maxRetries}</p>
          <button onClick={this.handleReset}>
            Try again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

Using react-error-boundary Library:
------------------------------------

// Install: npm install react-error-boundary

import { ErrorBoundary } from 'react-error-boundary';

// Simple usage
function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <MyComponent />
    </ErrorBoundary>
  );
}

// With custom fallback component
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset app state
      }}
      onError={(error, errorInfo) => {
        // Log to error service
        console.error('Error:', error);
      }}
    >
      <MyComponent />
    </ErrorBoundary>
  );
}

// With reset keys (reset when key changes)
function App() {
  const [userId, setUserId] = useState(null);
  
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      resetKeys={[userId]} // Reset boundary when userId changes
    >
      <UserProfile userId={userId} />
    </ErrorBoundary>
  );
}

Error Boundaries in Production:
--------------------------------

class ProductionErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorId: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    // Generate unique error ID
    const errorId = generateErrorId();
    
    // Log to error tracking service (Sentry, LogRocket, etc.)
    logToErrorService({
      errorId,
      error: error.toString(),
      errorInfo: errorInfo.componentStack,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      userId: getCurrentUserId(),
    });
    
    this.setState({ errorId });
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page">
          <h1>We're sorry, something went wrong</h1>
          <p>Our team has been notified.</p>
          <p>Error ID: {this.state.errorId}</p>
          <button onClick={() => window.location.reload()}>
            Reload page
          </button>
          <button onClick={() => window.location.href = '/'}>
            Go to homepage
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

Testing Error Boundaries:
--------------------------

// Test component that throws error
function BombComponent({ shouldThrow }) {
  if (shouldThrow) {
    throw new Error('Boom!');
  }
  return <div>No error</div>;
}

// Test
import { render, screen } from '@testing-library/react';

test('error boundary catches error', () => {
  // Suppress error console logs in test
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
  
  render(
    <ErrorBoundary fallback={<div>Error occurred</div>}>
      <BombComponent shouldThrow={true} />
    </ErrorBoundary>
  );
  
  expect(screen.getByText('Error occurred')).toBeInTheDocument();
  
  spy.mockRestore();
});

Best Practices:
---------------

// 1. Use multiple error boundaries for different sections
<ErrorBoundary fallback={<HeaderFallback />}>
  <Header />
</ErrorBoundary>

<ErrorBoundary fallback={<ContentFallback />}>
  <MainContent />
</ErrorBoundary>

// 2. Provide helpful error messages
<ErrorBoundary
  fallback={
    <div>
      <h1>Unable to load user profile</h1>
      <p>Please check your internet connection and try again.</p>
    </div>
  }
>
  <UserProfile />
</ErrorBoundary>

// 3. Log errors to monitoring service
componentDidCatch(error, errorInfo) {
  Sentry.captureException(error, { extra: errorInfo });
}

// 4. Show different UI in development vs production
render() {
  if (this.state.hasError) {
    if (process.env.NODE_ENV === 'development') {
      return <DetailedErrorUI error={this.state.error} />;
    }
    return <UserFriendlyErrorUI />;
  }
  return this.props.children;
}

// 5. Provide reset functionality
<button onClick={this.resetErrorBoundary}>Try again</button>


/**

73. How does React handle errors in components?
-----------------------------------------------

React has a comprehensive error handling system that prevents errors from crashing
the entire application. It uses error boundaries, lifecycle methods, and built-in
error handling mechanisms.

Error Handling Flow:
--------------------

1. Error occurs in component
   ↓
2. React catches error during render
   ↓
3. React looks for nearest error boundary
   ↓
4. Error boundary catches error
   ↓
5. getDerivedStateFromError called (update state)
   ↓
6. componentDidCatch called (log error)
   ↓
7. Error boundary renders fallback UI
   ↓
8. Rest of app continues working

Different Types of Errors:
---------------------------

// 1. Render Errors (caught by error boundaries)

function ComponentWithRenderError() {
  const user = null;
  return <div>{user.name}</div>; // TypeError: Cannot read property 'name' of null
}

<ErrorBoundary>
  <ComponentWithRenderError />
</ErrorBoundary>

// Error caught, fallback UI shown

// 2. Lifecycle Errors (caught by error boundaries)

class ComponentWithLifecycleError extends React.Component {
  componentDidMount() {
    throw new Error('Mount error');
  }
  
  render() {
    return <div>Content</div>;
  }
}

// 3. Event Handler Errors (NOT caught by error boundaries)

function ComponentWithEventError() {
  const handleClick = () => {
    throw new Error('Click error'); // Not caught by error boundary!
  };
  
  return <button onClick={handleClick}>Click</button>;
}

// Solution: Use try-catch
function SafeComponent() {
  const handleClick = () => {
    try {
      throw new Error('Click error');
    } catch (error) {
      console.error('Caught error:', error);
      // Show user-friendly message
      alert('An error occurred. Please try again.');
    }
  };
  
  return <button onClick={handleClick}>Click</button>;
}

// 4. Async Errors (NOT caught by error boundaries)

function ComponentWithAsyncError() {
  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .catch(error => {
        // Handle error here
        console.error('Fetch error:', error);
      });
  }, []);
  
  return <div>Content</div>;
}

// 5. Promise Errors

function ComponentWithPromiseError() {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/data');
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error:', error);
        setError(error);
      }
    }
    
    fetchData();
  }, []);
  
  if (error) return <div>Error: {error.message}</div>;
  return <div>Content</div>;
}

Development vs Production Error Handling:
------------------------------------------

// Development Mode:
// - Detailed error messages
// - Component stack traces
// - Red error overlay
// - Console errors

// Production Mode:
// - User-friendly error messages
// - No stack traces shown to users
// - Errors logged to monitoring service
// - Graceful degradation

// Example: Conditional error display
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  render() {
    if (this.state.hasError) {
      // Development: Show detailed error
      if (process.env.NODE_ENV === 'development') {
        return (
          <div style={{ padding: '20px', background: '#ffebee' }}>
            <h1>Development Error</h1>
            <h2>{this.state.error?.message}</h2>
            <pre>{this.state.error?.stack}</pre>
          </div>
        );
      }
      
      // Production: Show friendly message
      return (
        <div>
          <h1>Oops! Something went wrong</h1>
          <p>We're working to fix the issue.</p>
          <button onClick={() => window.location.reload()}>
            Reload page
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

Error Handling Patterns:
-------------------------

// Pattern 1: Component-level error handling

function DataFetchingComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('/api/data');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data</div>;
  
  return <div>{data.map(item => <div key={item.id}>{item.name}</div>)}</div>;
}

// Pattern 2: Custom error hook

function useAsyncError() {
  const [, setError] = useState();
  
  return useCallback((error) => {
    setError(() => {
      throw error; // This will be caught by error boundary
    });
  }, []);
}

// Usage
function Component() {
  const throwError = useAsyncError();
  
  const handleClick = async () => {
    try {
      await fetchData();
    } catch (error) {
      throwError(error); // Caught by error boundary
    }
  };
  
  return <button onClick={handleClick}>Fetch</button>;
}

// Pattern 3: Global error handler

window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Log to error service
  logToSentry(event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Log to error service
  logToSentry(event.reason);
});

// Pattern 4: React Query error handling

import { useQuery } from '@tanstack/react-query';

function Component() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
    retry: 3,
    onError: (error) => {
      // Handle error globally
      console.error('Query error:', error);
      toast.error('Failed to load data');
    }
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{data}</div>;
}

Error Recovery Strategies:
---------------------------

// 1. Retry mechanism

function ComponentWithRetry() {
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  
  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      setData(data);
      setError(null);
    } catch (err) {
      setError(err);
      
      // Auto-retry up to 3 times
      if (retryCount < 3) {
        setTimeout(() => {
          setRetryCount(retryCount + 1);
          fetchData();
        }, 1000 * Math.pow(2, retryCount)); // Exponential backoff
      }
    }
  };
  
  if (error && retryCount >= 3) {
    return (
      <div>
        <p>Error: {error.message}</p>
        <button onClick={() => {
          setRetryCount(0);
          fetchData();
        }}>
          Try again
        </button>
      </div>
    );
  }
  
  return <div>Content</div>;
}

// 2. Fallback to cached data

function ComponentWithCache() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const cachedData = useRef(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/data');
        const json = await response.json();
        setData(json);
        cachedData.current = json; // Cache successful data
        setError(null);
      } catch (err) {
        setError(err);
        // Fall back to cached data if available
        if (cachedData.current) {
          setData(cachedData.current);
        }
      }
    }
    
    fetchData();
  }, []);
  
  if (error && !data) return <div>Error: {error.message}</div>;
  if (error && data) {
    return (
      <div>
        <div className="warning">Showing cached data (offline)</div>
        {/* Render cached data * /}
      </div>
    );
  }
  
  return <div>{/* Render fresh data * /}</div>;
}

// 3. Graceful degradation

function ComponentWithDegradation() {
  const [enhancedFeatureAvailable, setEnhancedFeatureAvailable] = useState(true);
  
  useEffect(() => {
    async function loadEnhancedFeature() {
      try {
        await import('./EnhancedFeature');
      } catch (error) {
        console.error('Enhanced feature unavailable:', error);
        setEnhancedFeatureAvailable(false);
      }
    }
    
    loadEnhancedFeature();
  }, []);
  
  return (
    <div>
      {enhancedFeatureAvailable ? (
        <EnhancedFeature />
      ) : (
        <BasicFeature /> // Fallback to basic version
      )}
    </div>
  );
}

Error Logging Integration:
---------------------------

// Sentry integration
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});

// Wrap app with Sentry error boundary
function App() {
  return (
    <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
      <MyApp />
    </Sentry.ErrorBoundary>
  );
}

// LogRocket integration
import LogRocket from 'logrocket';

LogRocket.init('YOUR_APP_ID');

// In error boundary
componentDidCatch(error, errorInfo) {
  LogRocket.captureException(error, {
    extra: errorInfo
  });
}

Summary:

React Error Handling:
- Error boundaries catch render/lifecycle errors
- Use getDerivedStateFromError and componentDidCatch
- Event handler errors need try-catch
- Async errors need try-catch or .catch()
- Different handling for dev vs production
- Multiple strategies: retry, cache, degradation
- Integrate with error monitoring services
- Granular error boundaries for isolation
- Provide user-friendly error messages
- Log errors for debugging
*/


/**
74. What is componentDidCatch?
------------------------------

componentDidCatch is a lifecycle method in class components used for error handling.
It's called when an error is thrown in a descendant component. It receives the error
and additional information about which component threw the error.

Signature:
----------

componentDidCatch(error, errorInfo)

// error: The error that was thrown
// errorInfo: Object with componentStack property containing stack trace

Purpose:
--------

1. Log errors to error reporting services
2. Track error occurrences
3. Gather error context/metadata
4. Side effects related to errors

Note: For updating state, use getDerivedStateFromError instead

Basic Usage:
------------

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('Error caught:', error);
    console.error('Component stack:', errorInfo.componentStack);
    
    // Log to error service
    logErrorToService(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    
    return this.props.children;
  }
}

Parameters Explained:
---------------------

componentDidCatch(error, errorInfo) {
  // error: The actual error object
  console.log('Error message:', error.message);
  console.log('Error stack:', error.stack);
  console.log('Error name:', error.name);
  
  // errorInfo: React-specific error info
  console.log('Component stack:', errorInfo.componentStack);
  
  /*
  Component stack looks like:
  
      in BuggyComponent (at App.js:10)
      in ErrorBoundary (at App.js:20)
      in div (at App.js:25)
      in App (at index.js:7)
  
  Shows where in component tree error occurred
  * /
}

Logging to Error Services:
---------------------------

// Example 1: Sentry
import * as Sentry from '@sentry/react';

componentDidCatch(error, errorInfo) {
  Sentry.withScope((scope) => {
    scope.setExtras(errorInfo);
    Sentry.captureException(error);
  });
}

// Example 2: LogRocket
import LogRocket from 'logrocket';

componentDidCatch(error, errorInfo) {
  LogRocket.captureException(error, {
    extra: {
      componentStack: errorInfo.componentStack
    }
  });
}

// Example 3: Custom logging service
componentDidCatch(error, errorInfo) {
  fetch('/api/log-error', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name
      },
      errorInfo: {
        componentStack: errorInfo.componentStack
      },
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      userId: getCurrentUserId()
    })
  });
}

Advanced Error Tracking:
-------------------------

class AdvancedErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
      lastErrorTime: null
    };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    const now = Date.now();
    const { lastErrorTime, errorCount } = this.state;
    
    // Track error frequency
    const timeSinceLastError = lastErrorTime ? now - lastErrorTime : Infinity;
    const newErrorCount = timeSinceLastError < 5000 ? errorCount + 1 : 1;
    
    this.setState({
      errorInfo,
      errorCount: newErrorCount,
      lastErrorTime: now
    });
    
    // Log with additional context
    this.logError({
      error,
      errorInfo,
      errorCount: newErrorCount,
      frequency: timeSinceLastError,
      props: this.props,
      state: this.state
    });
    
    // Alert if errors are happening frequently
    if (newErrorCount > 5) {
      console.warn('Multiple errors detected in short time!');
      // Maybe show different UI or take action
    }
  }
  
  logError(errorData) {
    console.error('Error details:', errorData);
    
    // Send to monitoring service
    if (window.errorMonitor) {
      window.errorMonitor.track(errorData);
    }
  }
  
  render() {
    const { hasError, error, errorCount } = this.state;
    
    if (hasError) {
      if (errorCount > 5) {
        return (
          <div>
            <h1>Multiple errors detected</h1>
            <p>Please reload the page.</p>
          </div>
        );
      }
      
      return (
        <div>
          <h1>Something went wrong</h1>
          <p>{error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

getDerivedStateFromError vs componentDidCatch:
-----------------------------------------------

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  // Called during RENDER phase
  // Pure function (no side effects)
  // Update state to show fallback
  static getDerivedStateFromError(error) {
    console.log('getDerivedStateFromError called');
    // ✅ Return new state
    return { hasError: true, error };
    
    // ❌ Don't do side effects here
    // Don't log to service
    // Don't call setState
  }
  
  // Called during COMMIT phase  
  // Can have side effects
  // Log errors, send to services
  componentDidCatch(error, errorInfo) {
    console.log('componentDidCatch called');
    // ✅ Side effects allowed
    logToService(error, errorInfo);
    
    // ✅ Can call setState (but usually use getDerivedStateFromError)
    this.setState({ errorInfo });
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

// Order of execution:
// 1. Error thrown in child component
// 2. getDerivedStateFromError called (update state)
// 3. render called with new state (show fallback)
// 4. componentDidCatch called (log error)

User Context in Error Logs:
----------------------------

class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Gather user context
    const userContext = {
      userId: getUserId(),
      userName: getUserName(),
      userEmail: getUserEmail(),
      userRole: getUserRole(),
      accountType: getAccountType(),
      subscriptionStatus: getSubscriptionStatus()
    };
    
    // Gather app context
    const appContext = {
      route: window.location.pathname,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      timestamp: new Date().toISOString(),
      appVersion: process.env.REACT_APP_VERSION,
      environment: process.env.NODE_ENV
    };
    
    // Log everything
    logError({
      error: {
        message: error.message,
        stack: error.stack
      },
      errorInfo,
      userContext,
      appContext
    });
  }
  
  render() {
    // ...
  }
}

Error Boundary with Analytics:
-------------------------------

class AnalyticsErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Track error in analytics
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: true
      });
    }
    
    // Track in custom analytics
    if (window.analytics) {
      window.analytics.track('Error Occurred', {
        error: error.message,
        component: errorInfo.componentStack,
        page: window.location.pathname
      });
    }
    
    // Log to error service
    logToErrorService(error, errorInfo);
  }
  
  render() {
    // ...
  }
}

Limitations:
------------

// componentDidCatch does NOT catch:

// 1. Event handler errors
<button onClick={() => {
  throw new Error('Not caught!');
}}>
  Click
</button>

// 2. Async code
useEffect(() => {
  setTimeout(() => {
    throw new Error('Not caught!');
  }, 1000);
}, []);

// 3. Server-side rendering

// 4. Errors in error boundary itself

Best Practices:
---------------

// 1. Always use both methods
static getDerivedStateFromError(error) {
  return { hasError: true };
}

componentDidCatch(error, errorInfo) {
  logError(error, errorInfo);
}

// 2. Don't try to recover in componentDidCatch
componentDidCatch(error, errorInfo) {
  // ❌ Don't do this
  this.setState({ hasError: false }); // Trying to recover
  
  // ✅ Just log
  logError(error, errorInfo);
}

// 3. Include enough context
componentDidCatch(error, errorInfo) {
  logError({
    error,
    errorInfo,
    userId: getUserId(),
    route: window.location.href,
    timestamp: Date.now()
  });
}

// 4. Use separate error boundaries for different sections
<ErrorBoundary name="Header">
  <Header />
</ErrorBoundary>

<ErrorBoundary name="Main Content">
  <MainContent />
</ErrorBoundary>

Summary:

componentDidCatch:
- Lifecycle method for error handling
- Called after error in descendant
- Receives error and errorInfo
- Use for logging/side effects
- Called in commit phase
- Can't be used to update state (use getDerivedStateFromError)
- Pair with getDerivedStateFromError
- Only in class components
- Essential for error monitoring
- Doesn't catch event handler/async errors
*/


/**
75. How do you debug React applications?
----------------------------------------

Debugging React applications involves multiple tools and techniques. Here's a
comprehensive guide to debugging React apps effectively.

1. React Developer Tools (Browser Extension):
----------------------------------------------

// Install: Chrome/Firefox extension "React Developer Tools"

// Features:
// - Inspect component tree
// - View component props and state
// - Track component updates
// - Profile performance
// - View hooks

// Using React DevTools:

// a) Components Tab
// - See component hierarchy
// - Select component to inspect
// - View props, state, hooks
// - Edit props/state in real-time
// - Search components

// b) Profiler Tab
// - Record performance
// - See which components rendered
// - Identify expensive renders
// - Flamegraph visualization

// Example: Finding why component re-renders
function MyComponent({ user, settings }) {
  console.log('MyComponent rendered');
  
  return (
    <div>
      <p>{user.name}</p>
      <p>{settings.theme}</p>
    </div>
  );
}

// In React DevTools:
// 1. Select component
// 2. Click "Why did this render?"
// 3. Shows: props changed (user.name changed from "John" to "Jane")

2. Console.log Debugging:
--------------------------

// Strategic console.log placement

function Component({ data }) {
  console.log('Component rendered with data:', data);
  
  useEffect(() => {
    console.log('Effect ran, data:', data);
    return () => {
      console.log('Cleanup ran');
    };
  }, [data]);
  
  const handleClick = () => {
    console.log('Button clicked');
  };
  
  return <button onClick={handleClick}>Click</button>;
}

// Better: Custom debug hook
function useDebugValue(label, value) {
  useEffect(() => {
    console.log(`[${label}] Changed:`, value);
  }, [label, value]);
}

// Usage
function Component({ user }) {
  useDebugValue('user', user);
  return <div>{user.name}</div>;
}

3. Browser Debugger:
--------------------

// Use debugger statement

function Component({ data }) {
  // Execution pauses here when this line runs
  debugger;
  
  const processedData = processData(data);
  
  if (processedData.length === 0) {
    debugger; // Conditional breakpoint
  }
  
  return <div>{processedData}</div>;
}

// Or set breakpoints in browser DevTools:
// 1. Open Sources tab
// 2. Find your file
// 3. Click line number to add breakpoint
// 4. Interact with app
// 5. Execution pauses at breakpoint

4. Custom Debug Components:
----------------------------

// Create debug components to log data

function DebugProps({ data }) {
  return (
    <div style={{ background: '#f0f0f0', padding: '10px', margin: '10px' }}>
      <h3>Debug Info:</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

// Usage
function MyComponent({ user, settings }) {
  return (
    <div>
      {process.env.NODE_ENV === 'development' && (
        <DebugProps data={{ user, settings }} />
      )}
      {/* Rest of component * /}
    </div>
  );
}

// Debug component tree
function DebugTree({ children }) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div>
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Hide' : 'Show'} Debug Info
      </button>
      {expanded && (
        <pre>{JSON.stringify(children, null, 2)}</pre>
      )}
      {children}
    </div>
  );
}

5. useDebugValue Hook:
-----------------------

// Add debug info to custom hooks (shows in React DevTools)

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Shows in React DevTools under hooks
  useDebugValue(isOnline ? 'Online' : 'Offline');
  
  return isOnline;
}

// Format debug value
function useDate() {
  const date = new Date();
  
  // Second argument formats the value
  useDebugValue(date, date => date.toLocaleDateString());
  
  return date;
}

6. Why Did You Render:
-----------------------

// Install: npm install @welldone-software/why-did-you-render

// In index.js (before imports)
import React from 'react';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    logOnDifferentValues: true,
  });
}

// Flag components to track
function MyComponent({ user }) {
  return <div>{user.name}</div>;
}

MyComponent.whyDidYouRender = true;

// Console logs why component re-rendered:
// - Props changed
// - State changed
// - Parent re-rendered

7. Error Debugging:
-------------------

// Add error boundaries with detailed info

class DebugErrorBoundary extends React.Component {
  state = { hasError: false, error: null, errorInfo: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', {
      error,
      errorInfo,
      props: this.props,
      state: this.state
    });
    
    this.setState({ errorInfo });
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: '#ffebee' }}>
          <h1>Error Occurred</h1>
          <details>
            <summary>Error Details</summary>
            <p><strong>Message:</strong> {this.state.error?.message}</p>
            <pre><strong>Stack:</strong> {this.state.error?.stack}</pre>
            <pre><strong>Component Stack:</strong> {this.state.errorInfo?.componentStack}</pre>
          </details>
          <button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

8. Network Debugging:
---------------------

// Monitor API calls

function useDebugFetch(url, options) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    console.log(`[FETCH START] ${url}`, options);
    const startTime = Date.now();
    
    setLoading(true);
    
    fetch(url, options)
      .then(response => {
        console.log(`[FETCH SUCCESS] ${url} - ${Date.now() - startTime}ms`, response);
        return response.json();
      })
      .then(data => {
        console.log(`[FETCH DATA] ${url}`, data);
        setData(data);
      })
      .catch(error => {
        console.error(`[FETCH ERROR] ${url} - ${Date.now() - startTime}ms`, error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url, options]);
  
  return { data, loading, error };
}

9. Redux DevTools:
------------------

// If using Redux, install Redux DevTools extension

import { createStore } from 'redux';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Features:
// - See all actions
// - Time-travel debugging
// - Inspect state changes
// - Export/import state
// - Trace action sources

10. VS Code Debugging:
----------------------

// Create .vscode/launch.json

{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }
  ]
}

// Debug in VS Code:
// 1. Set breakpoints in editor
// 2. Press F5 to start debugging
// 3. Inspect variables
// 4. Step through code

11. Performance Debugging:
--------------------------

// Use React Profiler API

import { Profiler } from 'react';

function onRenderCallback(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime,
  interactions
) {
  console.log(`${id} (${phase}) took ${actualDuration}ms`);
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Navigation />
      <Profiler id="Content" onRender={onRenderCallback}>
        <MainContent />
      </Profiler>
    </Profiler>
  );
}

12. Custom Debug Hooks:
------------------------

// Create utility hooks for debugging

function useTraceUpdate(props) {
  const prev = useRef(props);
  
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((acc, [key, val]) => {
      if (prev.current[key] !== val) {
        acc[key] = {
          from: prev.current[key],
          to: val
        };
      }
      return acc;
    }, {});
    
    if (Object.keys(changedProps).length > 0) {
      console.log('Changed props:', changedProps);
    }
    
    prev.current = props;
  });
}

// Usage
function MyComponent(props) {
  useTraceUpdate(props);
  return <div>{props.value}</div>;
}

// Render count tracker
function useRenderCount(componentName) {
  const renders = useRef(0);
  
  useEffect(() => {
    renders.current += 1;
    console.log(`${componentName} rendered ${renders.current} times`);
  });
}

// Usage
function MyComponent() {
  useRenderCount('MyComponent');
  return <div>Content</div>;
}

Summary:

Debugging Tools:
- React DevTools (component inspection)
- Console.log (strategic logging)
- Browser debugger (breakpoints)
- useDebugValue (custom hooks)
- Why Did You Render (unnecessary re-renders)
- Error boundaries (error tracking)
- Network tab (API calls)
- Redux DevTools (state management)
- VS Code debugger (IDE debugging)
- React Profiler (performance)
- Custom debug hooks (utilities)
*/


/**
76. What tools can be used for profiling React performance?
-----------------------------------------------------------

Profiling helps identify performance bottlenecks in React applications. Here are
the main tools and techniques for measuring and optimizing performance.

1. React DevTools Profiler:
----------------------------

// Built into React DevTools browser extension

// How to use:
// 1. Open React DevTools
// 2. Click "Profiler" tab
// 3. Click record button (circle)
// 4. Interact with your app
// 5. Click stop button
// 6. Analyze results

// Profiler shows:
// - Flamegraph: Visual representation of render times
// - Ranked chart: Components sorted by render time
// - Component chart: Individual component render timeline
// - Interactions: Track user interactions

// Reading the flamegraph:
// - Width = time spent rendering
// - Color = render duration (yellow = faster, green = average, blue = slower)
// - Height = component depth in tree
// - Click component for details

// Example: Identifying slow component
function App() {
  return (
    <div>
      <FastComponent />      {/* Thin bar * /}
      <SlowComponent />      {/* Wide bar - PROBLEM! * /}
      <AnotherFast />        {/* Thin bar * /}
    </div>
  );
}

// In Profiler, SlowComponent shows:
// - Render duration: 500ms
// - Why rendered: Props changed (data)
// - Render count: 10 times
// -> Need to optimize!

2. React Profiler API:
-----------------------

// Programmatic performance measurement

import { Profiler } from 'react';

function onRenderCallback(
  id,                    // Component id
  phase,                 // "mount" or "update"
  actualDuration,        // Time spent rendering
  baseDuration,          // Estimated time without memoization
  startTime,             // When React began rendering
  commitTime,            // When React committed update
  interactions           // Set of interactions
) {
  console.log(`${id} (${phase})`);
  console.log(`Actual duration: ${actualDuration}ms`);
  console.log(`Base duration: ${baseDuration}ms`);
  
  // Log to analytics
  if (actualDuration > 16) { // > 1 frame (60fps)
    logSlowRender({ id, phase, actualDuration });
  }
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Navigation />
      <MainContent />
    </Profiler>
  );
}

// Nested profilers for granular tracking
function Dashboard() {
  return (
    <Profiler id="Dashboard" onRender={onRenderCallback}>
      <Header />
      
      <Profiler id="UserSection" onRender={onRenderCallback}>
        <UserProfile />
        <UserSettings />
      </Profiler>
      
      <Profiler id="DataSection" onRender={onRenderCallback}>
        <DataTable />
        <Charts />
      </Profiler>
    </Profiler>
  );
}

3. Chrome DevTools Performance:
--------------------------------

// Browser-level performance profiling

// How to use:
// 1. Open Chrome DevTools
// 2. Go to "Performance" tab
// 3. Click record button
// 4. Interact with app
// 5. Click stop
// 6. Analyze flame chart

// What it shows:
// - JavaScript execution time
// - Rendering/painting
// - Network requests
// - Long tasks (>50ms)
// - Frame rate (FPS)
// - Memory usage

// Look for:
// - Red indicators (long tasks blocking main thread)
// - Dropped frames (stuttering)
// - Expensive JavaScript functions
// - Layout thrashing

// Example findings:
// Function             | Time    | Impact
// ---------------------|---------|--------
// ExpensiveSort        | 200ms   | HIGH - blocks UI
// RenderList           | 50ms    | MEDIUM
// HandleClick          | 5ms     | LOW

4. Lighthouse:
--------------

// Automated performance audit

// How to use:
// 1. Open Chrome DevTools
// 2. Go to "Lighthouse" tab
// 3. Select "Performance"
// 4. Click "Generate report"

// Metrics measured:
// - First Contentful Paint (FCP)
// - Largest Contentful Paint (LCP)
// - Time to Interactive (TTI)
// - Total Blocking Time (TBT)
// - Cumulative Layout Shift (CLS)

// Example report:
// Performance Score: 78/100
// FCP: 1.2s (Good)
// LCP: 2.5s (Needs Improvement)
// TTI: 3.8s (Poor) <- OPTIMIZE THIS
// TBT: 300ms (Needs Improvement)
// CLS: 0.1 (Good)

// Opportunities:
// 1. Remove unused JavaScript (-500ms)
// 2. Reduce JavaScript execution time (-1.2s)
// 3. Minimize main thread work (-800ms)

5. React Profiler with Custom Logging:
---------------------------------------

// Track performance metrics over time

class PerformanceMonitor extends React.Component {
  measurements = [];
  
  onRender = (id, phase, actualDuration) => {
    // Store measurement
    this.measurements.push({
      id,
      phase,
      duration: actualDuration,
      timestamp: Date.now()
    });
    
    // Warn if slow
    if (actualDuration > 16) {
      console.warn(`Slow render: ${id} took ${actualDuration}ms`);
    }
    
    // Send to analytics every 10 renders
    if (this.measurements.length >= 10) {
      this.sendAnalytics();
    }
  };
  
  sendAnalytics = () => {
    const avgDuration = this.measurements.reduce((sum, m) => 
      sum + m.duration, 0
    ) / this.measurements.length;
    
    analytics.track('Performance', {
      avgRenderTime: avgDuration,
      slowRenders: this.measurements.filter(m => m.duration > 16).length
    });
    
    this.measurements = [];
  };
  
  render() {
    return (
      <Profiler id="App" onRender={this.onRender}>
        {this.props.children}
      </Profiler>
    );
  }
}

6. Why Did You Render:
-----------------------

// Detect unnecessary re-renders

import whyDidYouRender from '@welldone-software/why-did-you-render';

if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackHooks: true,
    trackExtraHooks: [[require('react-redux/lib'), 'useSelector']],
    logOnDifferentValues: true,
  });
}

// Flag components to track
function ExpensiveComponent({ data }) {
  return <div>{data.map(item => <Item key={item.id} {...item} />)}</div>;
}

ExpensiveComponent.whyDidYouRender = true;

// Console output:
// ExpensiveComponent re-rendered because of:
// - Props changed: data.length changed from 10 to 10
// - Same values, different reference!
// -> Need to memoize data

7. React Render Tracker:
-------------------------

// Custom hook to track renders

function useRenderTracker(componentName) {
  const renderCount = useRef(0);
  const lastRenderTime = useRef(Date.now());
  
  useEffect(() => {
    renderCount.current += 1;
    const now = Date.now();
    const timeSinceLastRender = now - lastRenderTime.current;
    
    console.log(`[${componentName}]`, {
      renderNumber: renderCount.current,
      timeSinceLastRender: `${timeSinceLastRender}ms`,
      timestamp: new Date(now).toISOString()
    });
    
    lastRenderTime.current = now;
  });
  
  return renderCount.current;
}

// Usage
function MyComponent(props) {
  const renderCount = useRenderTracker('MyComponent');
  
  return (
    <div>
      Render #{renderCount}
      {/* Component content * /}
    </div>
  );
}

8. Bundle Analyzer:
-------------------

// Analyze JavaScript bundle size

// Install: npm install --save-dev webpack-bundle-analyzer

// In webpack.config.js or CRA:
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
};

// For Create React App:
// npm install --save-dev source-map-explorer
// Add to package.json:
"scripts": {
  "analyze": "source-map-explorer 'build/static/js/*.js'"
}

// Run: npm run build && npm run analyze

// Shows:
// - Size of each module
// - Which libraries are largest
// - Duplicate dependencies
// - Opportunities for code splitting

9. Custom Performance Hook:
----------------------------

// Measure component render time

function usePerformance(componentName) {
  const startTime = useRef(performance.now());
  
  useEffect(() => {
    const endTime = performance.now();
    const duration = endTime - startTime.current;
    
    console.log(`${componentName} rendered in ${duration.toFixed(2)}ms`);
    
    // Track in analytics
    if (duration > 16) {
      analytics.track('Slow Render', {
        component: componentName,
        duration
      });
    }
    
    startTime.current = performance.now();
  });
}

// Usage
function ExpensiveComponent() {
  usePerformance('ExpensiveComponent');
  
  // Expensive operations
  const data = useMemo(() => expensiveCalculation(), []);
  
  return <div>{data}</div>;
}

10. Real User Monitoring (RUM):
--------------------------------

// Track performance in production

// Using Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics({ name, delta, id }) {
  analytics.track('Web Vital', {
    metric: name,
    value: delta,
    id
  });
}

// Track all metrics
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);

// Custom React metrics
function useReportRenderTime(componentName) {
  const renderStart = useRef(performance.now());
  
  useEffect(() => {
    const renderTime = performance.now() - renderStart.current;
    
    // Report to analytics
    analytics.track('Component Render', {
      component: componentName,
      duration: renderTime,
      url: window.location.pathname
    });
  }, [componentName]);
}

11. React DevTools Highlight Updates:
--------------------------------------

// Visual feedback for component updates

// In React DevTools:
// Settings (gear icon) -> "Highlight updates when components render"

// Components that render will flash with colored border:
// - Blue: Updated
// - Green: Mounted
// - Orange: Updated slowly
// - Red: Updated very slowly

// Use to spot:
// - Components updating too frequently
// - Entire tree re-rendering
// - Cascading updates

12. Performance Budget:
-----------------------

// Set performance budgets and monitor

const PERFORMANCE_BUDGETS = {
  renderTime: 16,        // 60fps
  componentMount: 100,   // 100ms
  dataFetch: 1000,       // 1s
  bundleSize: 200        // 200KB
};

function checkPerformanceBudget(metric, value) {
  const budget = PERFORMANCE_BUDGETS[metric];
  
  if (value > budget) {
    console.warn(`⚠️ Budget exceeded: ${metric}`);
    console.warn(`Budget: ${budget}, Actual: ${value}`);
    
    // Alert team
    if (process.env.NODE_ENV === 'production') {
      alertSlack({
        message: `Performance budget exceeded: ${metric}`,
        budget,
        actual: value
      });
    }
  }
}

// Use in Profiler
function onRender(id, phase, actualDuration) {
  checkPerformanceBudget('renderTime', actualDuration);
}

Summary:

Performance Profiling Tools:
1. React DevTools Profiler - Visual component rendering
2. React Profiler API - Programmatic measurement
3. Chrome DevTools Performance - Browser-level profiling
4. Lighthouse - Automated audits
5. Why Did You Render - Unnecessary re-renders
6. Bundle Analyzer - Code size analysis
7. Web Vitals - Real user metrics
8. Custom hooks - App-specific tracking
9. RUM tools - Production monitoring
10. Performance budgets - Set limits

Best Practices:
- Profile in production mode
- Test on slower devices
- Monitor real user metrics
- Set performance budgets
- Profile regularly
- Fix biggest issues first
- Measure before and after optimization
*/

