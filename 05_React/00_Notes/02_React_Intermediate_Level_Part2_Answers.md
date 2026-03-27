# React Interview Questions - Intermediate Level (Q36-Q45 Detailed Answers)

## 36. What are controlled components?

**Answer:**

**Controlled components** are form elements (input, textarea, select) where **React controls the value**. React keeps track of what the user types and updates the display.

### Simple Analogy:

Think of it like a **puppet on strings**. React is the puppet master:
- User types something
- React updates its state (pulls a string)
- Display updates to show what was typed

### How Controlled Components Work:

```javascript
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Step 1: Store value in state
  // Step 2: Display value from state
  // Step 3: Update state when user types
  
  const handleSubmit = (e) => {
    e.preventDefault(); // Don't reload page
    console.log('Submitting:', { email, password });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Email input - controlled by React */}
      <input
        type="email"
        value={email}  // Display from state
        onChange={(e) => setEmail(e.target.value)}  // Update state
        placeholder="Enter email"
      />
      
      {/* Password input - controlled by React */}
      <input
        type="password"
        value={password}  // Display from state
        onChange={(e) => setPassword(e.target.value)}  // Update state
        placeholder="Enter password"
      />
      
      <button type="submit">Login</button>
    </form>
  );
}
```

### Step-by-Step Flow:

```
User types "a" in email field:
  ↓ onChange event fires
  ↓ setEmail('a') called
  ↓ state updates to {email: 'a', password: ''}
  ↓ Component re-renders
  ↓ Input shows 'a' (from state)

User types "l" (now "al"):
  ↓ onChange event fires
  ↓ setEmail('al') called
  ↓ state updates to {email: 'al', password: ''}
  ↓ Component re-renders
  ↓ Input shows 'al' (from state)
```

### Real Example - With Validation:

```javascript
function SignUpForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // For checkbox, use checked; for others use value
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (!formData.email.includes('@')) {
      newErrors.email = 'Email must be valid';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form is valid! Submitting:', formData);
      // Send to server
    } else {
      console.log('Form has errors');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
      </div>
      
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>
      
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>
      
      <div>
        <label>
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
          />
          I agree to terms and conditions
        </label>
        {errors.agreeToTerms && <p style={{ color: 'red' }}>{errors.agreeToTerms}</p>}
      </div>
      
      <button type="submit">Sign Up</button>
    </form>
  );
}
```

### Benefits of Controlled Components:

✅ **Always know the input value** - It's in state  
✅ **Easy validation** - Check value in real-time  
✅ **Easy to disable/enable buttons** - Based on form state  
✅ **Can reset form** - Just reset state  
✅ **Real-time feedback** - Show errors immediately  

---

## 37. What are uncontrolled components?

**Answer:**

**Uncontrolled components** are form elements where the **DOM stores the value**, not React. React doesn't keep track of what the user types.

### Simple Analogy:

Think of it like a **form on paper**:
- You fill it out
- You keep the filled paper
- The person reading the form doesn't know what you wrote until you show them

### How Uncontrolled Components Work:

```javascript
import { useRef } from 'react';

function LoginForm() {
  // Create references to DOM elements
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get values from DOM (when we need them)
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    
    console.log('Submitting:', { email, password });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* No value prop, no onChange - uncontrolled */}
      <input
        ref={emailRef}
        type="email"
        placeholder="Enter email"
        defaultValue=""  // Optional: set initial value
      />
      
      {/* No value prop, no onChange - uncontrolled */}
      <input
        ref={passwordRef}
        type="password"
        placeholder="Enter password"
        defaultValue=""  // Optional: set initial value
      />
      
      <button type="submit">Login</button>
    </form>
  );
}
```

### Step-by-Step Flow:

```
User types "john@example.com" in email field:
  ↓ No onChange handler (we don't care yet)
  ↓ User continues typing...
  ↓ Value stored in DOM, not in React state
  ↓ Component doesn't re-render

User clicks Submit:
  ↓ handleSubmit called
  ↓ We access emailRef.current.value (get from DOM)
  ↓ We finally see what was typed
  ↓ Submit the data
```

### Real Example - File Upload (Must Use Uncontrolled):

```javascript
import { useRef } from 'react';

function FileUploader() {
  const fileRef = useRef(null);
  
  const handleUpload = () => {
    // File inputs MUST be uncontrolled
    // (Security reason - we can't set file value)
    const file = fileRef.current.files[0];
    
    if (file) {
      console.log('File name:', file.name);
      console.log('File size:', file.size);
      console.log('File type:', file.type);
      
      // Upload file to server
      uploadToServer(file);
    }
  };
  
  return (
    <div>
      <input ref={fileRef} type="file" />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
```

### Controlled vs Uncontrolled:

| Aspect | Controlled | Uncontrolled |
|--------|-----------|-------------|
| **Value stored** | React state | DOM |
| **Getting value** | From state | From DOM ref |
| **When to check** | Real-time (onChange) | On submit |
| **Validation** | Real-time | On submit |
| **Resetting** | setFormData({}) | ref.current.value = '' |
| **Complexity** | More code | Less code |
| **Best for** | Complex forms | Simple forms |

### Real Example - Simple Contact Form (Uncontrolled):

```javascript
import { useRef } from 'react';

function ContactForm() {
  const nameRef = useRef(null);
  const messageRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const name = nameRef.current.value;
    const message = messageRef.current.value;
    
    // Send to server
    sendEmail({ name, message });
    
    // Reset form
    nameRef.current.value = '';
    messageRef.current.value = '';
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} type="text" placeholder="Your name" required />
      <textarea ref={messageRef} placeholder="Your message" required />
      <button type="submit">Send</button>
    </form>
  );
}
```

### When to Use Each:

**Use Controlled:**
✅ Login forms (email, password)  
✅ Search bars with auto-suggestions  
✅ Forms with validation  
✅ Multi-step forms  

**Use Uncontrolled:**
✅ File uploads (no choice)  
✅ Simple forms  
✅ Integration with non-React code  
✅ When performance matters (large forms)  

---

## 38. What is Higher Order Component (HOC)?

**Answer:**

An **HOC** is a **function that takes a component and returns an enhanced version** of it. It's like wrapping a gift - you take something and wrap it to make it better.

### Simple Analogy:

Think of it like adding a **protective case to a phone**:
- Phone = original component
- Case = HOC wrapper
- Enhanced phone = better component (with protection)

### Basic Pattern:

```javascript
// HOC function (factory)
function withFeature(OriginalComponent) {
  // Return enhanced component
  return function EnhancedComponent(props) {
    // Add new logic here
    const newProp = 'Extra feature!';
    
    // Return original component with new prop
    return <OriginalComponent {...props} feature={newProp} />;
  };
}

// Original component
function MyComponent(props) {
  return <div>{props.feature}</div>;
}

// Enhanced component
const EnhancedComponent = withFeature(MyComponent);

// Use it
<EnhancedComponent /> // Shows "Extra feature!"
```

### Real Example 1 - Authentication HOC:

```javascript
// HOC that checks if user is logged in
function withAuth(ProtectedComponent) {
  return function AuthComponent(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    
    // Check login status
    useEffect(() => {
      checkLoginStatus().then(data => {
        if (data.isLoggedIn) {
          setIsLoggedIn(true);
          setUser(data.user);
        }
      });
    }, []);
    
    if (!isLoggedIn) {
      return <div>Please log in to access this page</div>;
    }
    
    // If logged in, show the protected component
    return <ProtectedComponent {...props} user={user} />;
  };
}

// Protected component
function Dashboard(props) {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {props.user.name}!</p>
    </div>
  );
}

// Enhanced component
const ProtectedDashboard = withAuth(Dashboard);

// Use it
<ProtectedDashboard /> // Shows login message or dashboard
```

### Real Example 2 - Theme HOC:

```javascript
// HOC that provides theme
function withTheme(Component) {
  return function ThemedComponent(props) {
    const [isDark, setIsDark] = useState(false);
    
    const theme = {
      isDark,
      toggleTheme: () => setIsDark(!isDark),
      background: isDark ? '#333' : '#fff',
      text: isDark ? '#fff' : '#000'
    };
    
    return (
      <div style={{ background: theme.background, color: theme.text }}>
        <Component {...props} theme={theme} />
      </div>
    );
  };
}

// Component that uses theme
function Page(props) {
  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={props.theme.toggleTheme}>
        {props.theme.isDark ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
}

// Enhanced component
const ThemedPage = withTheme(Page);

// Use it
<ThemedPage /> // Shows page with theme toggle
```

### Real Example 3 - Data Fetching HOC:

```javascript
// HOC that fetches data
function withDataFetching(url) {
  return function DataComponent(OriginalComponent) {
    return function WithDataComponent(props) {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      
      useEffect(() => {
        fetch(url)
          .then(res => res.json())
          .then(data => {
            setData(data);
            setLoading(false);
          })
          .catch(err => {
            setError(err);
            setLoading(false);
          });
      }, []);
      
      return (
        <OriginalComponent
          {...props}
          data={data}
          loading={loading}
          error={error}
        />
      );
    };
  };
}

// Component that displays data
function UsersList(props) {
  if (props.loading) return <p>Loading...</p>;
  if (props.error) return <p>Error: {props.error.message}</p>;
  
  return (
    <ul>
      {props.data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Enhanced component
const UsersListWithData = withDataFetching('/api/users')(UsersList);

// Use it
<UsersListWithData /> // Shows loading, error, or list
```

### When to Use HOC:

✅ Authentication checks  
✅ Theme providers  
✅ Data fetching  
✅ Props manipulation  
✅ Code reuse  

---

## 39. What are render props?

**Answer:**

**Render props** is a pattern where a component accepts a **function as a prop** to decide what to render. It's like giving the component a recipe to follow.

### Simple Analogy:

Think of it like a **restaurant that serves your custom recipe**:
- You bring your recipe
- Restaurant cooks it
- You get exactly what you want

### Basic Pattern:

```javascript
// Component that uses render prop
function DataProvider({ render }) {
  const [data, setData] = useState('Hello');
  
  // Call the function prop to render
  return render(data);
}

// Use it with a function prop
<DataProvider
  render={(data) => <h1>{data}</h1>}
/>
// Shows: <h1>Hello</h1>
```

### Real Example 1 - Mouse Tracker:

```javascript
// Component that tracks mouse position
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Call render prop with position
  return render(position);
}

// Use it
<MouseTracker
  render={(position) => (
    <div>
      <p>Mouse at: {position.x}, {position.y}</p>
      <div style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: '10px',
        height: '10px',
        backgroundColor: 'red',
        borderRadius: '50%'
      }} />
    </div>
  )}
/>
```

### Real Example 2 - Data Fetching with Render Props:

```javascript
// Component that fetches data
function DataFetcher({ url, render }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);
  
  // Call render prop
  return render({ data, loading, error });
}

// Use it
<DataFetcher
  url="/api/users"
  render={({ data, loading, error }) => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;
    
    return (
      <ul>
        {data.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    );
  }}
/>
```

### Using Children as Render Prop:

```javascript
// Using children instead of render prop
function Toggle({ children }) {
  const [isOn, setIsOn] = useState(false);
  
  // children is a function
  return children({
    isOn,
    toggle: () => setIsOn(!isOn)
  });
}

// Use it
<Toggle>
  {({ isOn, toggle }) => (
    <button onClick={toggle}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  )}
</Toggle>
```

### Render Props vs HOC:

| Aspect | Render Props | HOC |
|--------|-------------|-----|
| **Pattern** | Function as prop | Wrapping component |
| **Readability** | Clear at use site | Clear at definition |
| **Debugging** | Easier to trace | Extra component layer |
| **Props** | Explicit passing | Hidden in wrapper |

---

## 40. What is compound component pattern?

**Answer:**

**Compound components** are components that work together - parent provides state, children display different parts. Like LEGO blocks that fit together.

### Simple Analogy:

Think of it like a **car dashboard**:
- Dashboard = parent component
- Speedometer, fuel gauge, etc. = child components
- They work together to show car info

### Real Example - Accordion:

```javascript
import { createContext, useContext, useState } from 'react';

// Create context for sharing state
const AccordionContext = createContext();

// Parent component
function Accordion({ children }) {
  const [activeIndex, setActiveIndex] = useState(null);
  
  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  return (
    <AccordionContext.Provider value={{ activeIndex, toggleItem }}>
      <div className="accordion">
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

// Child component - Item
function AccordionItem({ children, index }) {
  const { activeIndex } = useContext(AccordionContext);
  const isActive = activeIndex === index;
  
  return (
    <div className="accordion-item">
      {children(isActive)}
    </div>
  );
}

// Child component - Header
function AccordionHeader({ children, index }) {
  const { toggleItem } = useContext(AccordionContext);
  
  return (
    <button onClick={() => toggleItem(index)} className="accordion-header">
      {children}
    </button>
  );
}

// Child component - Content
function AccordionContent({ children, isActive }) {
  return isActive ? (
    <div className="accordion-content">
      {children}
    </div>
  ) : null;
}

// Use it
<Accordion>
  <AccordionItem index={0}>
    {(isActive) => (
      <>
        <AccordionHeader index={0}>
          Section 1
        </AccordionHeader>
        <AccordionContent isActive={isActive}>
          Content for section 1
        </AccordionContent>
      </>
    )}
  </AccordionItem>
  
  <AccordionItem index={1}>
    {(isActive) => (
      <>
        <AccordionHeader index={1}>
          Section 2
        </AccordionHeader>
        <AccordionContent isActive={isActive}>
          Content for section 2
        </AccordionContent>
      </>
    )}
  </AccordionItem>
</Accordion>
```

### Benefits:

✅ **Flexible** - Components work together  
✅ **Readable** - Clear at use site what components are related  
✅ **Reusable** - Each component is independent  
✅ **Maintainable** - Easy to understand structure  

---

## 41. What is the container/presentational component pattern?

**Answer:**

**Container components** manage state and logic (the "smart" parts).
**Presentational components** just display data (the "dumb" parts).

### Simple Analogy:

- **Container** = Brain (decides what to do)
- **Presentational** = Face (shows the result)

### Real Example:

```javascript
// PRESENTATIONAL component (just displays data)
function UserProfileUI({ user, onFollow, isFollowing }) {
  return (
    <div className="profile">
      <img src={user.photo} alt={user.name} />
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
      <button onClick={onFollow}>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
}

// CONTAINER component (manages state and logic)
function UserProfileContainer({ userId }) {
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch user data
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);
  
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    // Send to server
  };
  
  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;
  
  // Container renders presentational component
  return (
    <UserProfileUI
      user={user}
      onFollow={handleFollow}
      isFollowing={isFollowing}
    />
  );
}

// Use container
<UserProfileContainer userId={123} />
```

### Benefits:

✅ **Separation of concerns** - Logic separate from UI  
✅ **Reusable** - Presentational can be used with different containers  
✅ **Testable** - Easy to test each separately  
✅ **Readable** - Clear what each component does  

---

## 42. What are error boundaries?

**Answer:**

**Error boundaries** are React components that catch errors in child components and display a fallback UI instead of crashing the whole app.

### Real Example:

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  // Called when child component throws error
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  // Called for logging
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
    // Send to error logging service
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', border: '1px solid red' }}>
          <h1>Something went wrong</h1>
          <p>{this.state.error?.toString()}</p>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Use it to wrap components
<ErrorBoundary>
  <YourApp />
</ErrorBoundary>
```

---

## 43. How do you handle errors in React?

**Answer:**

Multiple ways:

1. **Try-catch** (for synchronous code)
2. **Error boundaries** (for React rendering errors)
3. **Error states** (track errors in state)

### Real Example - Error State:

```javascript
function DataFetcher() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/data');
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>
      
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data && <p>Data: {data}</p>}
    </div>
  );
}
```

---

## 44. What is Suspense in React?

**Answer:**

**Suspense** lets you show a loading state while waiting for data or code to load.

### Real Example:

```javascript
import { Suspense, lazy } from 'react';

// Lazy load component
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

---

## 45. What is React.memo?

**Answer:**

**React.memo** prevents a component from re-rendering if its props haven't changed.

### Real Example:

```javascript
// Without memo - re-renders every time parent renders
function UserCard(props) {
  return <div>{props.name}</div>;
}

// With memo - only re-renders if props change
const MemoUserCard = React.memo(function UserCard(props) {
  return <div>{props.name}</div>;
});

// Only re-renders when 'name' actually changes
<MemoUserCard name="Alice" /> // Re-render only if name changes
```

---

## Summary of Q36-Q45

You now understand:

✅ **Controlled components** - React tracks form values  
✅ **Uncontrolled components** - DOM stores values  
✅ **HOC** - Wrap components to add features  
✅ **Render props** - Pass function to control rendering  
✅ **Compound components** - Components work together  
✅ **Container/Presentational** - Separate logic from UI  
✅ **Error boundaries** - Catch component errors  
✅ **Error handling** - Multiple strategies  
✅ **Suspense** - Show loading state  
✅ **React.memo** - Prevent unnecessary re-renders  

**These patterns help you write better, more reusable React code!** 🎉
