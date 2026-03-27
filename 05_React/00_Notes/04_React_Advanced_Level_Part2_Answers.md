# React Interview Questions - Advanced Level Part 2 (Q81-Q100 Detailed Answers)

## 81. How do you implement throttling in React?

**Answer:**

**Throttling** limits how often a function runs, even if triggered repeatedly. It ensures a function runs at most once every X milliseconds.

### Difference from Debouncing:

| Aspect | Debounce | Throttle |
|--------|----------|----------|
| **When** | After user stops | At regular intervals |
| **Use** | Search input | Scroll, resize |
| **Example** | Wait 500ms after typing | Run every 300ms while scrolling |

### Problem Without Throttling:

```javascript
function App() {
  // User scrolls - fires 60 times per second!
  window.addEventListener('scroll', () => {
    console.log('Scrolled');
    fetchMoreData(); // 60 API calls per second!
  });
}
```

### Solution - Throttling:

```javascript
function useThrottle(callback, delay) {
  const lastRun = React.useRef(Date.now());
  
  return React.useCallback((...args) => {
    const now = Date.now();
    
    if (now - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = now;
    }
  }, [callback, delay]);
}

function ScrollApp() {
  const handleScroll = React.useCallback(() => {
    console.log('Scrolled');
    fetchMoreData(); // Runs max every 300ms
  }, []);
  
  const throttledScroll = useThrottle(handleScroll, 300);
  
  React.useEffect(() => {
    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [throttledScroll]);
}
```

### Simple Implementation:

```javascript
function throttle(func, limit) {
  let inThrottle;
  
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Use it
const handleResize = throttle(() => {
  console.log('Resizing');
  recalculateLayout();
}, 300);

window.addEventListener('resize', handleResize);
```

### Real Example - Scroll Position:

```javascript
function InfiniteScrollList() {
  const [items, setItems] = React.useState([]);
  const scrollTimeoutRef = React.useRef(null);
  
  const handleScroll = React.useCallback(() => {
    if (scrollTimeoutRef.current) return; // Throttle active
    
    scrollTimeoutRef.current = setTimeout(() => {
      scrollTimeoutRef.current = null;
      
      // Check if at bottom
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loadMoreItems();
      }
    }, 300);
  }, []);
  
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  
  return <div>{/* items */}</div>;
}
```

### Timeline Example:

```
User scrolls continuously:
0ms: Throttle fires → Handle scroll
50ms: Another scroll (ignored, throttled)
100ms: Another scroll (ignored, throttled)
300ms: Throttle fires again → Handle scroll
400ms: Another scroll (ignored, throttled)

Result: Runs every 300ms (not 60 times/second!)
```

### Use Cases:

✅ Window resize  
✅ Scroll events  
✅ Mouse move tracking  
✅ Window size calculations  

---

## 82. How do you implement form handling?

**Answer:**

Form handling in React means managing form input values and submissions using state.

### Simple Form:

```javascript
function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    
    // Validate
    if (!email || !password) {
      setError('All fields required');
      return;
    }
    
    // Submit
    console.log('Submitting:', { email, password });
    setError('');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}
```

### Form with Multiple Fields:

```javascript
function RegistrationForm() {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    country: 'US',
    agreeToTerms: false
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <select name="country" value={formData.country} onChange={handleChange}>
        <option value="US">United States</option>
        <option value="UK">United Kingdom</option>
        <option value="CA">Canada</option>
      </select>
      <label>
        <input
          type="checkbox"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleChange}
        />
        I agree to terms
      </label>
      <button type="submit">Register</button>
    </form>
  );
}
```

### Custom Hook for Forms:

```javascript
function useForm(initialValues) {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    onSubmit(values);
  };
  
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };
  
  return {
    values,
    handleChange,
    handleSubmit,
    resetForm,
    setErrors,
    errors
  };
}

// Use it
function MyForm() {
  const { values, handleChange, handleSubmit } = useForm({
    email: '',
    password: ''
  });
  
  const onSubmit = (formData) => {
    console.log('Submitting:', formData);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="email" value={values.email} onChange={handleChange} />
      <input name="password" value={values.password} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## 83. How do you validate forms?

**Answer:**

Form validation checks that user input is correct before submitting.

### Simple Validation:

```javascript
function SignupForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({});
  
  const validate = () => {
    const newErrors = {};
    
    // Email validation
    if (!email) {
      newErrors.email = 'Email required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    
    // Password validation
    if (!password) {
      newErrors.password = 'Password required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be 8+ characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      console.log('Form valid, submitting');
    } else {
      console.log('Form has errors');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>
      
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>
      
      <button type="submit">Sign Up</button>
    </form>
  );
}
```

### Real-Time Validation:

```javascript
function EmailInput() {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');
  
  const validateEmail = (value) => {
    if (!value) {
      setError('Email required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError('Invalid email format');
    } else {
      setError('');
    }
  };
  
  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value); // Validate while typing
  };
  
  return (
    <div>
      <input
        value={email}
        onChange={handleChange}
        placeholder="Enter email"
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && email && <p style={{ color: 'green' }}>✓ Valid email</p>}
    </div>
  );
}
```

### Validation Schema with Regex:

```javascript
const validationRules = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Invalid email address'
  },
  password: {
    pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message: 'Password must have uppercase, number, special char'
  },
  phone: {
    pattern: /^\d{10}$/,
    message: 'Phone must be 10 digits'
  }
};

function validateField(name, value) {
  const rule = validationRules[name];
  if (!rule) return '';
  if (!rule.pattern.test(value)) return rule.message;
  return '';
}
```

---

## 84. How do you handle file uploads?

**Answer:**

File uploads allow users to select and upload files to your server.

### Simple File Upload:

```javascript
function FileUpload() {
  const [file, setFile] = React.useState(null);
  const [preview, setPreview] = React.useState('');
  const [uploading, setUploading] = React.useState(false);
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      setFile(selectedFile);
      
      // Create preview for images
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setPreview(event.target.result);
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  };
  
  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      console.log('Upload success:', result);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        disabled={uploading}
      />
      
      {preview && <img src={preview} alt="Preview" width={100} />}
      
      {file && (
        <div>
          <p>File: {file.name} ({file.size} bytes)</p>
          <button onClick={handleUpload} disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      )}
    </div>
  );
}
```

### Multiple File Upload:

```javascript
function MultiFileUpload() {
  const [files, setFiles] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);
  
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };
  
  const handleUpload = async () => {
    setUploading(true);
    
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    
    try {
      const response = await fetch('/api/upload-multiple', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      console.log('Upload success:', result);
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        disabled={uploading}
      />
      
      <ul>
        {files.map((file, idx) => (
          <li key={idx}>{file.name}</li>
        ))}
      </ul>
      
      <button onClick={handleUpload} disabled={uploading || files.length === 0}>
        Upload {files.length} files
      </button>
    </div>
  );
}
```

### File Upload with Progress:

```javascript
function FileUploadWithProgress() {
  const [progress, setProgress] = React.useState(0);
  const [uploading, setUploading] = React.useState(false);
  
  const handleUpload = async (file) => {
    setUploading(true);
    
    const formData = new FormData();
    formData.append('file', file);
    
    const xhr = new XMLHttpRequest();
    
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const percentComplete = (e.loaded / e.total) * 100;
        setProgress(percentComplete);
      }
    });
    
    xhr.addEventListener('load', () => {
      setProgress(100);
      setUploading(false);
    });
    
    xhr.open('POST', '/api/upload');
    xhr.send(formData);
  };
  
  return (
    <div>
      <progress value={progress} max="100"></progress>
      <p>{Math.round(progress)}%</p>
    </div>
  );
}
```

---

## 85. How do you implement search with debounce?

**Answer:**

Combining search functionality with debouncing to avoid excessive API calls while typing.

### Implementation:

```javascript
function SearchUsers() {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const timeoutRef = React.useRef(null);
  
  const performSearch = React.useCallback(async (searchTerm) => {
    if (!searchTerm) {
      setResults([]);
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`/api/users/search?q=${searchTerm}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }, []);
  
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Clear previous timeout
    clearTimeout(timeoutRef.current);
    
    // Set new timeout (debounce)
    timeoutRef.current = setTimeout(() => {
      performSearch(value);
    }, 500);
  };
  
  return (
    <div>
      <input
        value={query}
        onChange={handleChange}
        placeholder="Search users..."
      />
      
      {loading && <p>Searching...</p>}
      
      <ul>
        {results.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Using Custom Hook:

```javascript
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}

function SearchWithHook() {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState([]);
  const debouncedQuery = useDebounce(query, 500);
  
  React.useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }
    
    // API call only when debouncedQuery changes
    fetch(`/api/search?q=${debouncedQuery}`)
      .then(res => res.json())
      .then(data => setResults(data));
  }, [debouncedQuery]);
  
  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 86. How do you handle API calls?

**Answer:**

Making requests to backend APIs and handling responses and errors.

### Basic API Call:

```javascript
function UsersList() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/users');
        
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Custom Hook for API Calls:

```javascript
function useFetch(url) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('API error');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);
  
  return { data, loading, error };
}

// Use it
function App() {
  const { data: users, loading, error } = useFetch('/api/users');
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return <div>{/* Render users */}</div>;
}
```

### POST Request:

```javascript
function CreateUser() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  
  const createUser = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) throw new Error('Failed to create');
      
      const newUser = await response.json();
      console.log('User created:', newUser);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <button onClick={() => createUser({ name: 'John' })} disabled={loading}>
      {loading ? 'Creating...' : 'Create User'}
    </button>
  );
}
```

---

## 87. How do you handle errors in API calls?

**Answer:**

Properly handling and displaying API errors.

### Error Handling Strategies:

```javascript
function ApiWithErrorHandling() {
  const [error, setError] = React.useState(null);
  
  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      
      // Check HTTP status
      if (!response.ok) {
        // Server returned error status
        if (response.status === 404) {
          throw new Error('Resource not found');
        } else if (response.status === 401) {
          throw new Error('Unauthorized - please login');
        } else if (response.status === 500) {
          throw new Error('Server error - try again later');
        } else {
          throw new Error(`HTTP error ${response.status}`);
        }
      }
      
      const data = await response.json();
      console.log('Success:', data);
    } catch (err) {
      // Handle different error types
      if (err instanceof TypeError) {
        // Network error
        setError('Network error - check your connection');
      } else if (err instanceof SyntaxError) {
        // Invalid JSON
        setError('Invalid data received');
      } else {
        // Custom error
        setError(err.message);
      }
    }
  };
  
  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
```

### Retry Logic:

```javascript
function useRetryFetch(url, retries = 3) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  
  React.useEffect(() => {
    let attempt = 0;
    
    const fetchWithRetry = async () => {
      try {
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('API failed');
        
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        attempt++;
        
        if (attempt < retries) {
          // Retry after delay
          setTimeout(fetchWithRetry, 1000 * attempt);
        } else {
          setError(err);
          setLoading(false);
        }
      }
    };
    
    fetchWithRetry();
  }, [url, retries]);
  
  return { data, loading, error };
}
```

---

## 88. How do you implement loading states?

**Answer:**

Showing loading indicators while data is being fetched.

### Simple Loading State:

```javascript
function DataComponent() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <button onClick={fetchData}>Load Data</button>
      
      {loading && <div className="spinner">Loading...</div>}
      
      {!loading && data && (
        <div>{/* Render data */}</div>
      )}
    </div>
  );
}
```

### Different Loading States:

```javascript
function AdvancedLoading() {
  const [state, setState] = React.useState('idle');
  // 'idle' | 'loading' | 'success' | 'error'
  
  const handleFetch = async () => {
    setState('loading');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setState('success');
    } catch {
      setState('error');
    }
  };
  
  return (
    <div>
      <button onClick={handleFetch} disabled={state === 'loading'}>
        Fetch
      </button>
      
      {state === 'loading' && <p>⏳ Loading...</p>}
      {state === 'success' && <p>✓ Success!</p>}
      {state === 'error' && <p>✗ Error</p>}
    </div>
  );
}
```

### Loading Skeleton:

```javascript
function LoadingSkeleton() {
  return (
    <div>
      <div style={{
        height: '20px',
        backgroundColor: '#e0e0e0',
        marginBottom: '10px',
        borderRadius: '4px',
        animation: 'pulse 1s infinite'
      }}>
      </div>
      <div style={{
        height: '20px',
        backgroundColor: '#e0e0e0',
        borderRadius: '4px',
        animation: 'pulse 1s infinite'
      }}>
      </div>
    </div>
  );
}

function DataWithSkeleton() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);
  
  React.useEffect(() => {
    setTimeout(() => {
      setData({ name: 'John' });
      setLoading(false);
    }, 2000);
  }, []);
  
  return (
    <div>
      {loading ? <LoadingSkeleton /> : <div>{data.name}</div>}
    </div>
  );
}
```

---

## 89. How do you implement pagination?

**Answer:**

Splitting data into pages and allowing users to navigate between them.

### Simple Pagination:

```javascript
function PaginatedList() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [items, setItems] = React.useState([]);
  const itemsPerPage = 10;
  
  React.useEffect(() => {
    // Fetch items for current page
    fetch(`/api/items?page=${currentPage}&limit=${itemsPerPage}`)
      .then(res => res.json())
      .then(data => setItems(data));
  }, [currentPage]);
  
  const nextPage = () => setCurrentPage(p => p + 1);
  const prevPage = () => setCurrentPage(p => Math.max(1, p - 1));
  
  return (
    <div>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      
      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
}
```

### Advanced Pagination:

```javascript
function AdvancedPagination() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [items, setItems] = React.useState([]);
  const itemsPerPage = 10;
  
  React.useEffect(() => {
    fetch(`/api/items?page=${currentPage}&limit=${itemsPerPage}`)
      .then(res => res.json())
      .then(data => {
        setItems(data.items);
        setTotalPages(data.totalPages);
      });
  }, [currentPage]);
  
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <div>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      
      <div className="pagination">
        {pages.map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            style={{
              fontWeight: page === currentPage ? 'bold' : 'normal',
              backgroundColor: page === currentPage ? '#007bff' : '#f0f0f0'
            }}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
```

---

## 90. How do you implement infinite scroll? (Revisited)

**Answer:**

Already covered in Q79. This is a duplicate for completeness in the question list.

### Quick Summary:

Load more content as user scrolls to bottom:

```javascript
function InfiniteScrollList() {
  const [items, setItems] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const observerRef = React.useRef(null);
  
  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(p => p + 1);
      }
    });
    
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  React.useEffect(() => {
    fetch(`/api/items?page=${page}`)
      .then(res => res.json())
      .then(data => setItems(prev => [...prev, ...data]));
  }, [page]);
  
  return (
    <div>
      {items.map(item => <div key={item.id}>{item.name}</div>)}
      <div ref={observerRef}>Loading...</div>
    </div>
  );
}
```

---

## 91. What is Redux?

**Answer:**

**Redux** is a state management library that manages application state in one central place (store).

### Problem Redux Solves:

Without Redux (passing state through props):

```javascript
<App user={user} setUser={setUser} />
  <Header user={user} />
  <Sidebar user={user} setUser={setUser} />
  <Main user={user} setUser={setUser} />
// Passing same props through many levels (prop drilling)!
```

### With Redux:

All components access state directly from Redux store:

```javascript
// Component 1
const user = useSelector(state => state.user);

// Component 2
const user = useSelector(state => state.user);

// Component 3
const dispatch = useDispatch();
dispatch(updateUser(newUser));
```

### Redux Flow:

```
Action: User clicks "Update"
  ↓
Action Creator: createAction({ type: 'UPDATE_USER' })
  ↓
Reducer: Processes action, returns new state
  ↓
Store: Updates central state
  ↓
Components: Subscribe and re-render with new state
```

### Simple Redux Example:

```javascript
// Store setup
import { createStore } from 'redux';

const initialState = {
  count: 0
};

const reducer = (state = initialState, action) => {
  if (action.type === 'INCREMENT') {
    return { ...state, count: state.count + 1 };
  }
  if (action.type === 'DECREMENT') {
    return { ...state, count: state.count - 1 };
  }
  return state;
};

const store = createStore(reducer);

// Use in component
import { useSelector, useDispatch } from 'react-redux';

function Counter() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
}
```

---

## 92. What are actions in Redux?

**Answer:**

**Actions** are plain JavaScript objects that describe what happened.

### Action Structure:

```javascript
{
  type: 'ACTION_NAME',    // Required - describes what happened
  payload: someData       // Optional - data to send
}
```

### Simple Actions:

```javascript
// Action 1: Increment counter
{ type: 'INCREMENT' }

// Action 2: Add item with data
{ type: 'ADD_TODO', payload: { id: 1, text: 'Learn Redux' } }

// Action 3: Set user
{ type: 'SET_USER', payload: { name: 'Alice', id: 123 } }
```

### Action Creators:

Functions that create actions:

```javascript
// Action creator
function incrementAction() {
  return { type: 'INCREMENT' };
}

// Action creator with payload
function addTodoAction(text) {
  return {
    type: 'ADD_TODO',
    payload: { id: Date.now(), text }
  };
}

// Use them
dispatch(incrementAction());
dispatch(addTodoAction('Learn Redux'));
```

### In Components:

```javascript
function MyComponent() {
  const dispatch = useDispatch();
  
  // Dispatch action
  const handleClick = () => {
    dispatch({ type: 'INCREMENT' });
  };
  
  return <button onClick={handleClick}>Increment</button>;
}
```

---

## 93. What are reducers in Redux?

**Answer:**

**Reducers** are pure functions that take current state and action, return new state.

### Reducer Structure:

```javascript
const reducer = (state = initialState, action) => {
  // Return new state based on action type
};
```

### Simple Reducer:

```javascript
const initialState = {
  count: 0
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'RESET':
      return { ...state, count: 0 };
    default:
      return state;
  }
};
```

### Complex Reducer:

```javascript
const initialState = {
  todos: [],
  filter: 'all'
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.payload)
      };
    
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    
    default:
      return state;
  }
};
```

### Pure Functions Rule:

✅ CORRECT - Pure:
```javascript
const increment = (state, action) => {
  return { count: state.count + 1 }; // Returns new state
};
```

❌ WRONG - Mutates state:
```javascript
const increment = (state, action) => {
  state.count++; // ❌ Mutating!
  return state;
};
```

---

## 94. What is Redux middleware?

**Answer:**

**Middleware** intercepts actions before they reach the reducer. Useful for logging, async operations, etc.

### How Middleware Works:

```
dispatch(action)
    ↓
Middleware (intercept)
    ↓
Reducer (update state)
    ↓
Store (update)
```

### Simple Middleware:

```javascript
const logger = store => next => action => {
  console.log('Action:', action);
  console.log('Previous state:', store.getState());
  
  const result = next(action);
  
  console.log('New state:', store.getState());
  
  return result;
};

// Apply middleware
const store = createStore(reducer, applyMiddleware(logger));
```

### Common Middleware:

**Logging:**
```javascript
const logger = store => next => action => {
  console.log(action);
  return next(action);
};
```

**Error handling:**
```javascript
const errorHandler = store => next => action => {
  try {
    return next(action);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
```

---

## 95. What are Redux selectors?

**Answer:**

**Selectors** are functions that extract specific data from Redux store state.

### Simple Selectors:

```javascript
// Get all todos
const selectTodos = (state) => state.todos;

// Get count
const selectCount = (state) => state.count;

// Use in component
function Component() {
  const todos = useSelector(selectTodos);
  const count = useSelector(selectCount);
}
```

### Computed Selectors:

```javascript
// Select filtered todos
const selectFilteredTodos = (state) => {
  const { todos, filter } = state;
  
  if (filter === 'completed') {
    return todos.filter(t => t.completed);
  }
  if (filter === 'active') {
    return todos.filter(t => !t.completed);
  }
  return todos;
};

// Use it
const filteredTodos = useSelector(selectFilteredTodos);
```

### Reselect for Performance:

```javascript
import { createSelector } from 'reselect';

const selectTodos = state => state.todos;
const selectFilter = state => state.filter;

// Only recomputes if todos or filter changed
const selectFilteredTodos = createSelector(
  [selectTodos, selectFilter],
  (todos, filter) => {
    if (filter === 'completed') return todos.filter(t => t.completed);
    return todos;
  }
);
```

---

## 96. What is Redux Thunk?

**Answer:**

**Redux Thunk** middleware lets you write action creators that return functions instead of objects, useful for async operations.

### Problem Without Thunk:

```javascript
// Can't do async in action creators
function fetchUser() {
  return { type: 'SET_USER', payload: ??? }; // Can't fetch here!
}
```

### With Thunk:

```javascript
// Can return function!
function fetchUser(userId) {
  return async (dispatch) => {
    dispatch({ type: 'LOADING' });
    
    try {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      dispatch({ type: 'SET_USER', payload: data });
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error });
    }
  };
}

// Use it
dispatch(fetchUser(123));
```

---

## 97. What is Redux Saga?

**Answer:**

**Redux Saga** is middleware for handling side effects (like API calls) using generator functions.

### Simple Saga:

```javascript
import { takeEvery, put, call } from 'redux-saga/effects';

// Worker saga
function* fetchUserSaga(action) {
  try {
    const data = yield call(fetch, `/api/users/${action.payload}`);
    const user = yield data.json();
    yield put({ type: 'SET_USER', payload: user });
  } catch (error) {
    yield put({ type: 'ERROR', payload: error });
  }
}

// Watcher saga
function* watchFetchUser() {
  yield takeEvery('FETCH_USER', fetchUserSaga);
}
```

### Redux Saga vs Thunk:

| Aspect | Thunk | Saga |
|--------|-------|------|
| **Learning** | Easier | Harder |
| **Complexity** | Simple | Complex |
| **Features** | Basic async | Advanced effects |
| **Use** | Simple apps | Large apps |

---

## 98. What is Zustand?

**Answer:**

**Zustand** is a simpler, lighter-weight alternative to Redux for state management.

### Simple Zustand Store:

```javascript
import create from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 }))
}));

// Use in component
function Counter() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

### Zustand vs Redux:

✅ **Zustand:** Simpler, less boilerplate  
✅ **Redux:** More mature, larger ecosystem  

---

## 99. What is Recoil?

**Answer:**

**Recoil** is state management for React using atoms and selectors (like Redux but atom-based).

### Recoil Basics:

```javascript
import { atom, selector, useRecoilState } from 'recoil';

// Atom (state unit)
const counterAtom = atom({
  key: 'counter',
  default: 0
});

// Selector (derived state)
const isEvenSelector = selector({
  key: 'isEven',
  get: ({ get }) => {
    const count = get(counterAtom);
    return count % 2 === 0;
  }
});

// Use in component
function Counter() {
  const [count, setCount] = useRecoilState(counterAtom);
  const isEven = useRecoilValue(isEvenSelector);
  
  return (
    <div>
      <p>Count: {count} ({isEven ? 'Even' : 'Odd'})</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

---

## 100. When should you use external state management?

**Answer:**

Use external state management (Redux, Zustand, etc.) when:

✅ **Complex state logic** - Many related state updates  
✅ **Shared state** - Multiple distant components need same data  
✅ **State history** - Need to track previous states  
✅ **Debugging** - Redux DevTools helps debug  
✅ **Large apps** - Many components, complex interactions  

❌ **Don't use** for:
- Simple apps
- Prop drilling isn't too deep
- Just parent-child data flow
- useState and Context API sufficient

### Decision Tree:

```
Is your state simple?
├─ Yes → Use useState
└─ No → Multiple components need it?
    ├─ No → Use useState
    └─ Yes → Is it many levels deep?
        ├─ No → Use Context API
        └─ Yes → Use Redux/Zustand
```

### Real Example:

```javascript
// Use useState (simple)
function Counter() {
  const [count, setCount] = React.useState(0);
}

// Use Context API (prop drilling)
const UserContext = React.createContext();
<UserProvider>
  <App /> {/* All children access user */}
</UserProvider>

// Use Redux (complex app)
// Store: { users, posts, comments, filters, ui }
// Many nested components need different parts
```

---

## Summary of Advanced Level Part 2 (Q81-Q100)

You now understand:

✅ Throttling - Limit function calls  
✅ Form handling - Managing form inputs  
✅ Form validation - Checking input correctness  
✅ File uploads - Upload files to server  
✅ Search with debounce - Search without hammering API  
✅ API calls - Fetch data from backend  
✅ Error handling - Deal with API errors  
✅ Loading states - Show loading indicators  
✅ Pagination - Split data into pages  
✅ Infinite scroll - Load more on scroll  
✅ Redux - State management library  
✅ Redux actions - Describe what happened  
✅ Redux reducers - Update state from actions  
✅ Redux middleware - Intercept actions  
✅ Redux selectors - Extract data from store  
✅ Redux Thunk - Handle async in Redux  
✅ Redux Saga - Advanced effect management  
✅ Zustand - Simpler state management  
✅ Recoil - Atom-based state management  
✅ When to use state management libraries  

---

## Complete React Interview Coverage

**Basic (Q1-25):** Core concepts  
**Intermediate (Q26-60):** Patterns and hooks  
**Advanced Part 1 (Q61-80):** Rendering and performance  
**Advanced Part 2 (Q81-100):** Implementation and state management  

**Total: 120 comprehensive React interview questions with detailed explanations!** 🚀
