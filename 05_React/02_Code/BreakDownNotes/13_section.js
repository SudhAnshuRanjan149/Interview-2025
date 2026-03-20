/*

========================================================
SECTION 13 — ADVANCED REACT PATTERNS
========================================================
96. What is the uncontrolled component pattern?  
97. What is the controlled component pattern?  
98. What are custom hooks and when should you create one?  
99. What is the pub-sub (observer) pattern in React?  
100. What is the state machine pattern (XState) in React?  
101. What is state colocation and why does it matter?  
102. What is React Portal and when do you use it?  

*/




/**
96. What is the uncontrolled component pattern?
----------------------------------------------

Uncontrolled components are form inputs that maintain their own internal state
in the DOM, rather than being controlled by React state. You access their values
using refs instead of controlled state updates.

Basic Uncontrolled Component:
------------------------------

// Uncontrolled input with ref
function UncontrolledForm() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Access values directly from DOM
    console.log('Name:', nameRef.current.value);
    console.log('Email:', emailRef.current.value);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={nameRef}
        type="text"
        name="name"
        defaultValue="John"  // defaultValue, not value
      />
      <input
        ref={emailRef}
        type="email"
        name="email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// Key characteristics:
// ✅ Uses ref to access values
// ✅ Uses defaultValue instead of value
// ✅ DOM maintains state, not React
// ✅ No onChange handlers needed

File Input (Always Uncontrolled):
----------------------------------

// File inputs are always uncontrolled
function FileUpload() {
  const fileRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const files = fileRef.current.files;
    if (files.length > 0) {
      console.log('Selected file:', files[0].name);
      // Upload file
      uploadFile(files[0]);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
      />
      <button type="submit">Upload</button>
    </form>
  );
}

// File inputs cannot be controlled (security reasons)
// Must use ref to access

Uncontrolled with Default Values:
----------------------------------

function UncontrolledInput() {
  const inputRef = useRef(null);
  
  return (
    <div>
      {/* Use defaultValue for initial value * /}
      <input
        ref={inputRef}
        type="text"
        defaultValue="Initial text"
      />
      
      {/* Use defaultChecked for checkboxes * /}
      <input
        type="checkbox"
        defaultChecked={true}
      />
      
      {/* Use defaultValue for select * /}
      <select defaultValue="option2">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
    </div>
  );
}

Complex Uncontrolled Form:
---------------------------

function UncontrolledComplexForm() {
  const formRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get form data using FormData API
    const formData = new FormData(formRef.current);
    
    const data = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
      gender: formData.get('gender'),
      newsletter: formData.get('newsletter') === 'on',
      interests: formData.getAll('interests')
    };
    
    console.log('Form data:', data);
    submitForm(data);
  };
  
  const handleReset = () => {
    formRef.current.reset();
  };
  
  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input
        name="username"
        type="text"
        placeholder="Username"
        defaultValue=""
      />
      
      <input
        name="email"
        type="email"
        placeholder="Email"
        defaultValue=""
      />
      
      <input
        name="password"
        type="password"
        placeholder="Password"
      />
      
      <fieldset>
        <legend>Gender</legend>
        <label>
          <input type="radio" name="gender" value="male" defaultChecked />
          Male
        </label>
        <label>
          <input type="radio" name="gender" value="female" />
          Female
        </label>
      </fieldset>
      
      <label>
        <input type="checkbox" name="newsletter" />
        Subscribe to newsletter
      </label>
      
      <fieldset>
        <legend>Interests</legend>
        <label>
          <input type="checkbox" name="interests" value="coding" />
          Coding
        </label>
        <label>
          <input type="checkbox" name="interests" value="reading" />
          Reading
        </label>
        <label>
          <input type="checkbox" name="interests" value="gaming" />
          Gaming
        </label>
      </fieldset>
      
      <button type="submit">Submit</button>
      <button type="button" onClick={handleReset}>Reset</button>
    </form>
  );
}

When to Use Uncontrolled Components:
-------------------------------------

// ✅ Use uncontrolled when:

// 1. Simple forms without validation
function SimpleContactForm() {
  const formRef = useRef();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    sendContactForm(formData);
  };
  
  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" required />
      <input name="email" placeholder="Email" type="email" required />
      <textarea name="message" placeholder="Message" required />
      <button type="submit">Send</button>
    </form>
  );
}

// 2. File uploads (must be uncontrolled)
function FileUploadForm() {
  const fileRef = useRef();
  
  const handleUpload = () => {
    const file = fileRef.current.files[0];
    uploadFile(file);
  };
  
  return (
    <div>
      <input ref={fileRef} type="file" />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

// 3. Integrating with non-React libraries
function TinyMCEEditor() {
  const editorRef = useRef();
  
  useEffect(() => {
    // Initialize TinyMCE (non-React library)
    tinymce.init({
      target: editorRef.current,
      plugins: 'link image code',
    });
    
    return () => {
      tinymce.remove();
    };
  }, []);
  
  return <textarea ref={editorRef} />;
}

// 4. Performance optimization (rare)
// Avoid re-renders for every keystroke
function LargeForm() {
  // 100 inputs that don't need real-time validation
  return (
    <form>
      {Array.from({ length: 100 }).map((_, i) => (
        <input key={i} name={`field-${i}`} />
      ))}
    </form>
  );
}

Pros and Cons:
--------------

// Pros:
// ✅ Less code (no state, no onChange)
// ✅ Better performance (no re-renders)
// ✅ Simple for basic forms
// ✅ Works with FormData API
// ✅ Native HTML behavior

// Cons:
// ❌ No real-time validation
// ❌ Harder to conditionally disable submit
// ❌ Can't easily format input
// ❌ Less React-like
// ❌ Harder to test
// ❌ No access to value until submit

Summary:

Uncontrolled Components:
- DOM maintains state, not React [web:172][web:174]
- Access values with refs [web:173]
- Use defaultValue/defaultChecked [web:174]
- Less code but less control [web:175]
- Good for simple forms [web:172]
- Required for file inputs [web:173]
- Better performance (no re-renders) [web:174]
*/


/**
97. What is the controlled component pattern?
--------------------------------------------

Controlled components have their form data controlled by React state. The component
renders based on state and updates state through event handlers, giving React
complete control over the form elements.

Basic Controlled Component:
----------------------------

function ControlledForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Name:', name);
    console.log('Email:', email);
    submitForm({ name, email });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}  // Controlled by state
        onChange={(e) => setName(e.target.value)}  // Updates state
        placeholder="Name"
      />
      
      <input
        type="email"
        value={email}  // Controlled by state
        onChange={(e) => setEmail(e.target.value)}  // Updates state
        placeholder="Email"
      />
      
      <button type="submit">Submit</button>
    </form>
  );
}

// Key characteristics:
// ✅ Uses value prop (not defaultValue)
// ✅ Uses onChange handler
// ✅ React state as single source of truth
// ✅ Can validate in real-time

Controlled with Validation:
----------------------------

function ControlledWithValidation() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  
  const validateEmail = (value) => {
    if (!value) {
      return 'Email is required';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Invalid email format';
    }
    return '';
  };
  
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // Real-time validation
    const error = validateEmail(value);
    setEmailError(error);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }
    
    submitForm({ email });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          className={emailError ? 'error' : ''}
        />
        {emailError && <span className="error-message">{emailError}</span>}
      </div>
      
      <button type="submit" disabled={!!emailError}>
        Submit
      </button>
    </form>
  );
}

Complex Controlled Form:
------------------------

function ControlledComplexForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
    newsletter: false,
    interests: [],
    country: 'US'
  });
  
  const [errors, setErrors] = useState({});
  
  // Generic handler for text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handler for checkboxes
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  // Handler for multiple checkboxes (interests)
  const handleInterests = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      interests: checked
        ? [...prev.interests, value]
        : prev.interests.filter(i => i !== value)
    }));
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      console.log('Form data:', formData);
      submitForm(formData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        />
        {errors.username && <span className="error">{errors.username}</span>}
      </div>
      
      <div>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      
      <div>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      
      <div>
        <input
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
      </div>
      
      <fieldset>
        <legend>Gender</legend>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={formData.gender === 'male'}
            onChange={handleChange}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === 'female'}
            onChange={handleChange}
          />
          Female
        </label>
      </fieldset>
      
      <label>
        <input
          name="newsletter"
          type="checkbox"
          checked={formData.newsletter}
          onChange={handleCheckbox}
        />
        Subscribe to newsletter
      </label>
      
      <fieldset>
        <legend>Interests</legend>
        {['coding', 'reading', 'gaming'].map(interest => (
          <label key={interest}>
            <input
              type="checkbox"
              value={interest}
              checked={formData.interests.includes(interest)}
              onChange={handleInterests}
            />
            {interest.charAt(0).toUpperCase() + interest.slice(1)}
          </label>
        ))}
      </fieldset>
      
      <select
        name="country"
        value={formData.country}
        onChange={handleChange}
      >
        <option value="US">United States</option>
        <option value="UK">United Kingdom</option>
        <option value="CA">Canada</option>
      </select>
      
      <button type="submit">Submit</button>
    </form>
  );
}

Input Formatting:
-----------------

// Format input value as user types
function PhoneInput() {
  const [phone, setPhone] = useState('');
  
  const formatPhone = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as (123) 456-7890
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
  };
  
  const handleChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };
  
  return (
    <input
      type="tel"
      value={phone}
      onChange={handleChange}
      placeholder="(123) 456-7890"
    />
  );
}

// Format currency
function CurrencyInput() {
  const [amount, setAmount] = useState('');
  
  const handleChange = (e) => {
    const value = e.target.value;
    
    // Allow only numbers and decimal point
    if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
      setAmount(value);
    }
  };
  
  return (
    <div>
      <span>$</span>
      <input
        type="text"
        value={amount}
        onChange={handleChange}
        placeholder="0.00"
      />
    </div>
  );
}

Conditional Rendering Based on Input:
--------------------------------------

function ConditionalForm() {
  const [accountType, setAccountType] = useState('personal');
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    taxId: ''
  });
  
  return (
    <form>
      <select
        value={accountType}
        onChange={(e) => setAccountType(e.target.value)}
      >
        <option value="personal">Personal</option>
        <option value="business">Business</option>
      </select>
      
      <input
        name="name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        placeholder="Your Name"
      />
      
      {accountType === 'business' && (
        <>
          <input
            name="companyName"
            value={formData.companyName}
            onChange={(e) => setFormData({...formData, companyName: e.target.value})}
            placeholder="Company Name"
          />
          <input
            name="taxId"
            value={formData.taxId}
            onChange={(e) => setFormData({...formData, taxId: e.target.value})}
            placeholder="Tax ID"
          />
        </>
      )}
    </form>
  );
}

When to Use Controlled Components:
-----------------------------------

// ✅ Use controlled when:

// 1. Need validation
function ValidatedForm() {
  const [email, setEmail] = useState('');
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  return (
    <div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button disabled={!isValid}>Submit</button>
    </div>
  );
}

// 2. Need input formatting
function FormattedInput() {
  const [value, setValue] = useState('');
  
  const handleChange = (e) => {
    // Force uppercase
    setValue(e.target.value.toUpperCase());
  };
  
  return <input value={value} onChange={handleChange} />;
}

// 3. Multiple fields depend on each other
function DependentFields() {
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const total = price * quantity;
  
  return (
    <div>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <p>Total: ${total}</p>
    </div>
  );
}

// 4. Need to trigger side effects
function SearchInput() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    if (query.length > 2) {
      searchAPI(query).then(setResults);
    }
  }, [query]);
  
  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Results data={results} />
    </div>
  );
}

Controlled vs Uncontrolled Comparison:
---------------------------------------

// Uncontrolled
function UncontrolledExample() {
  const inputRef = useRef();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputRef.current.value);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} defaultValue="" />
      <button>Submit</button>
    </form>
  );
}

// Controlled
function ControlledExample() {
  const [value, setValue] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button>Submit</button>
    </form>
  );
}

// Feature              | Uncontrolled     | Controlled
// ---------------------|------------------|------------------
// State location       | DOM              | React state
// Access value         | ref              | state variable
// Initial value        | defaultValue     | state initial value
// Update value         | N/A              | setState
// Real-time validation | No               | Yes
// Formatting           | No               | Yes
// Conditional logic    | Hard             | Easy
// Performance          | Better           | More re-renders
// Code                 | Less             | More
// React way            | No               | Yes

Pros and Cons:
--------------

// Pros:
// ✅ React controls everything [web:174][web:175]
// ✅ Real-time validation [web:172]
// ✅ Conditional rendering [web:174]
// ✅ Input formatting [web:172]
// ✅ Easy to test [web:175]
// ✅ Single source of truth [web:174]

// Cons:
// ❌ More boilerplate code [web:175]
// ❌ Re-renders on every keystroke [web:174]
// ❌ Verbose for simple forms [web:172]

Summary:

Controlled Components:
- React state controls form data [web:172][web:174]
- Use value prop with onChange [web:174]
- Real-time validation possible [web:172][web:175]
- Can format input [web:172]
- More React-like approach [web:175]
- Recommended for most forms [web:172][web:174]
- Single source of truth [web:174]
*/


/**
98. What are custom hooks and when should you create one?
---------------------------------------------------------

Custom hooks are JavaScript functions that use React hooks and encapsulate
reusable stateful logic. They let you extract component logic into reusable
functions, following React's composition model.

Basic Custom Hook:
------------------

// Custom hook for toggle functionality
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);
  
  const setTrue = useCallback(() => {
    setValue(true);
  }, []);
  
  const setFalse = useCallback(() => {
    setValue(false);
  }, []);
  
  return [value, { toggle, setTrue, setFalse }];
}

// Usage
function ModalComponent() {
  const [isOpen, { toggle, setTrue, setFalse }] = useToggle(false);
  
  return (
    <div>
      <button onClick={setTrue}>Open Modal</button>
      
      {isOpen && (
        <Modal onClose={setFalse}>
          <p>Modal content</p>
        </Modal>
      )}
    </div>
  );
}

Custom Hook Rules:
------------------

// 1. Must start with "use" [web:176][web:179]
// ✅ Good
function useCounter() { }
function useLocalStorage() { }
function useFetch() { }

// ❌ Bad
function counter() { } // Missing "use" prefix
function getUser() { } // Not a hook

// 2. Can only be called from React functions [web:176]
// ✅ Good
function Component() {
  const data = useCustomHook(); // In component
}

function useAnotherHook() {
  const data = useCustomHook(); // In another hook
}

// ❌ Bad
function regularFunction() {
  const data = useCustomHook(); // Can't use in regular function
}

// 3. Follow all hooks rules
// - Don't call in loops, conditions, or nested functions
// - Only call at top level

Common Custom Hooks:
--------------------

// 1. useLocalStorage - Persist state in localStorage
function useLocalStorage(key, initialValue) {
  // Get from localStorage or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  // Update localStorage when value changes
  const setValue = (value) => {
    try {
      // Allow value to be a function like useState
      const valueToStore = value instanceof Function
        ? value(storedValue)
        : value;
      
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue];
}

// Usage
function App() {
  const [name, setName] = useLocalStorage('name', 'Guest');
  
  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Hello, {name}!</p>
    </div>
  );
}

// 2. useFetch - Data fetching
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let cancelled = false;
    
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        
        if (!cancelled) {
          setData(json);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    };
    
    fetchData();
    
    return () => {
      cancelled = true;
    };
  }, [url]);
  
  return { data, loading, error };
}

// Usage
function UserProfile({ userId }) {
  const { data, loading, error } = useFetch(`/api/users/${userId}`);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No user found</div>;
  
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
    </div>
  );
}

// 3. useDebounce - Debounce value changes
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    // Set timeout to update debounced value
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    // Clear timeout if value changes before delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

// Usage
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  useEffect(() => {
    if (debouncedSearchTerm) {
      // Search API only after user stops typing for 500ms
      searchAPI(debouncedSearchTerm).then(setResults);
    }
  }, [debouncedSearchTerm]);
  
  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}

// 4. useWindowSize - Track window dimensions
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return windowSize;
}

// Usage
function ResponsiveComponent() {
  const { width } = useWindowSize();
  
  return (
    <div>
      {width < 768 ? (
        <MobileView />
      ) : (
        <DesktopView />
      )}
    </div>
  );
}

// 5. useEventListener - Add event listeners [web:179]
function useEventListener(eventName, handler, element = window) {
  const savedHandler = useRef();
  
  // Update ref when handler changes
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  
  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;
    
    // Create event listener that calls handler from ref
    const eventListener = (event) => savedHandler.current(event);
    
    element.addEventListener(eventName, eventListener);
    
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

// Usage
function ClickTracker() {
  const [clickCount, setClickCount] = useState(0);
  
  useEventListener('click', () => {
    setClickCount(count => count + 1);
  });
  
  return <div>Clicks: {clickCount}</div>;
}

// 6. useForm - Form state management
function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setValues(prev => ({
      ...prev,
      [name]: newValue
    }));
  };
  
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
    }
  };
  
  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    
    const validationErrors = validate ? validate(values) : {};
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
    }
  };
  
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };
  
  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  };
}

// Usage
function LoginForm() {
  const initialValues = { email: '', password: '' };
  
  const validate = (values) => {
    const errors = {};
    
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Invalid email';
    }
    
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    return errors;
  };
  
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit
  } = useForm(initialValues, validate);
  
  const onSubmit = (values) => {
    console.log('Submit:', values);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.email && errors.email && <span>{errors.email}</span>}
      </div>
      
      <div>
        <input
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.password && errors.password && <span>{errors.password}</span>}
      </div>
      
      <button type="submit">Login</button>
    </form>
  );
}

// 7. usePrevious - Get previous value
function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

// Usage
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  
  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

When to Create Custom Hooks:
-----------------------------

// ✅ Create custom hook when: [web:176]

// 1. Logic is reused across multiple components [web:176]
// Same data fetching in many components
function useUserData(userId) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  return user;
}

// 2. Complex stateful logic needs encapsulation [web:176][web:179]
// Complex form logic
function useComplexForm() {
  // Many useState, useEffect, etc.
  // Returns clean API
}

// 3. Side effects need cleanup [web:179]
// Event listeners, subscriptions
function useWebSocket(url) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const ws = new WebSocket(url);
    ws.onmessage = (e) => setData(e.data);
    return () => ws.close(); // Cleanup
  }, [url]);
  
  return data;
}

// 4. Non-visual logic can be extracted
// Authentication logic
function useAuth() {
  const [user, setUser] = useState(null);
  const login = async (credentials) => { /* ... * / };
  const logout = () => { /* ... * / };
  return { user, login, logout };
}

Best Practices: [web:176][web:179]
------------------------------------

// 1. Start with "use" [web:176][web:179]
function useCustomHook() { } // ✅
function customHook() { } // ❌

// 2. Keep hooks focused [web:176][web:179]
// ✅ Good - single responsibility
function useFetch(url) { /* only fetching * / }

// ❌ Bad - too much responsibility
function useFetchAndCacheAndValidate(url) { /* doing too much * / }

// 3. Return only necessary data [web:176]
// ✅ Good
function useFetch(url) {
  return { data, loading, error };
}

// ❌ Bad - returning internal state
function useFetch(url) {
  return { data, loading, error, internalState, cache, etc };
}

// 4. Document your hooks [web:176][web:179]
/**
 * Custom hook for fetching data
 * @param {string} url - API endpoint
 * @returns {{data: any, loading: boolean, error: string}}
 * /
function useFetch(url) { }

// 5. Use TypeScript for better DX
function useFetch<T>(url: string): {
  data: T | null;
  loading: boolean;
  error: string | null;
} { }

Summary:

Custom Hooks:
- Extract reusable logic [web:176]
- Must start with "use" [web:176][web:179]
- Can use other hooks [web:176]
- Share stateful logic [web:176]
- Keep focused on one task [web:176][web:179]
- Return only necessary data [web:176]
- Document thoroughly [web:176][web:179]
- Test independently [web:179]
*/


/**
99. What is the pub-sub (observer) pattern in React?
---------------------------------------------------

The Publisher-Subscriber (Pub-Sub) pattern is a messaging pattern where publishers
emit events without knowing who will receive them, and subscribers listen for
specific events without knowing who sent them. It enables loose coupling between
components.

Basic Pub-Sub Implementation:
------------------------------

// Simple event bus
class EventBus {
  constructor() {
    this.subscribers = {};
  }
  
  // Subscribe to event
  subscribe(event, callback) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    
    this.subscribers[event].push(callback);
    
    // Return unsubscribe function
    return () => {
      this.subscribers[event] = this.subscribers[event].filter(
        cb => cb !== callback
      );
    };
  }
  
  // Publish event
  publish(event, data) {
    if (!this.subscribers[event]) return;
    
    this.subscribers[event].forEach(callback => {
      callback(data);
    });
  }
  
  // Unsubscribe all from event
  unsubscribeAll(event) {
    delete this.subscribers[event];
  }
}

// Create global instance
const eventBus = new EventBus();

export default eventBus;

// Usage in components:

// Publisher component
function PublisherComponent() {
  const handleClick = () => {
    eventBus.publish('userLoggedIn', {
      userId: '123',
      username: 'john',
      timestamp: Date.now()
    });
  };
  
  return <button onClick={handleClick}>Login</button>;
}

// Subscriber component
function SubscriberComponent() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Subscribe to event
    const unsubscribe = eventBus.subscribe('userLoggedIn', (data) => {
      console.log('User logged in:', data);
      setUser(data);
    });
    
    // Cleanup on unmount
    return () => {
      unsubscribe();
    };
  }, []);
  
  return (
    <div>
      {user ? (
        <p>Welcome, {user.username}!</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}

Custom Hook for Pub-Sub:
-------------------------

// useEventBus hook
function useEventBus(event, callback) {
  useEffect(() => {
    const unsubscribe = eventBus.subscribe(event, callback);
    return unsubscribe;
  }, [event, callback]);
}

// useEventPublish hook
function useEventPublish() {
  return useCallback((event, data) => {
    eventBus.publish(event, data);
  }, []);
}

// Usage
function Component() {
  const publish = useEventPublish();
  
  useEventBus('dataUpdated', (data) => {
    console.log('Data updated:', data);
  });
  
  const handleUpdate = () => {
    publish('dataUpdated', { id: 1, value: 'new' });
  };
  
  return <button onClick={handleUpdate}>Update</button>;
}

Real-World Examples:
--------------------

// Example 1: Notification System

// NotificationService.js
class NotificationService {
  constructor() {
    this.subscribers = [];
  }
  
  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }
  
  notify(message, type = 'info') {
    this.subscribers.forEach(callback => {
      callback({ message, type, id: Date.now() });
    });
  }
  
  success(message) {
    this.notify(message, 'success');
  }
  
  error(message) {
    this.notify(message, 'error');
  }
  
  warning(message) {
    this.notify(message, 'warning');
  }
}

export const notificationService = new NotificationService();

// NotificationProvider.jsx
function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    const unsubscribe = notificationService.subscribe((notification) => {
      setNotifications(prev => [...prev, notification]);
      
      // Auto-remove after 3 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 3000);
    });
    
    return unsubscribe;
  }, []);
  
  return (
    <>
      {children}
      <div className="notifications">
        {notifications.map(notification => (
          <div key={notification.id} className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        ))}
      </div>
    </>
  );
}

// Any component can publish notifications
function UserForm() {
  const handleSubmit = async (data) => {
    try {
      await saveUser(data);
      notificationService.success('User saved successfully!');
    } catch (error) {
      notificationService.error('Failed to save user');
    }
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}

// Example 2: Shopping Cart

// CartService.js
class CartService {
  constructor() {
    this.subscribers = [];
    this.cart = [];
  }
  
  subscribe(callback) {
    this.subscribers.push(callback);
    // Send current state immediately
    callback(this.cart);
    
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }
  
  notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.cart));
  }
  
  addItem(item) {
    const existingItem = this.cart.find(i => i.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ ...item, quantity: 1 });
    }
    
    this.notifySubscribers();
  }
  
  removeItem(itemId) {
    this.cart = this.cart.filter(item => item.id !== itemId);
    this.notifySubscribers();
  }
  
  updateQuantity(itemId, quantity) {
    const item = this.cart.find(i => i.id === itemId);
    if (item) {
      item.quantity = quantity;
      this.notifySubscribers();
    }
  }
  
  clear() {
    this.cart = [];
    this.notifySubscribers();
  }
  
  getTotal() {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}

export const cartService = new CartService();

// useCart hook
function useCart() {
  const [cart, setCart] = useState([]);
  
  useEffect(() => {
    const unsubscribe = cartService.subscribe(setCart);
    return unsubscribe;
  }, []);
  
  return {
    cart,
    addItem: cartService.addItem.bind(cartService),
    removeItem: cartService.removeItem.bind(cartService),
    updateQuantity: cartService.updateQuantity.bind(cartService),
    clear: cartService.clear.bind(cartService),
    total: cartService.getTotal()
  };
}

// Product component (publisher)
function ProductCard({ product }) {
  const { addItem } = useCart();
  
  return (
    <div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => addItem(product)}>
        Add to Cart
      </button>
    </div>
  );
}

// Cart component (subscriber)
function CartWidget() {
  const { cart, total } = useCart();
  
  return (
    <div>
      <span>Cart ({cart.length})</span>
      <span>${total}</span>
    </div>
  );
}

// Cart page (subscriber)
function CartPage() {
  const { cart, removeItem, updateQuantity, clear } = useCart();
  
  return (
    <div>
      <h1>Shopping Cart</h1>
      {cart.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
          />
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <button onClick={clear}>Clear Cart</button>
    </div>
  );
}

Pub-Sub with Context API:
--------------------------

// Combine pub-sub with Context for better integration

// EventContext.js
const EventContext = createContext();

export function EventProvider({ children }) {
  const eventBusRef = useRef(new EventBus());
  
  const publish = useCallback((event, data) => {
    eventBusRef.current.publish(event, data);
  }, []);
  
  const subscribe = useCallback((event, callback) => {
    return eventBusRef.current.subscribe(event, callback);
  }, []);
  
  return (
    <EventContext.Provider value={{ publish, subscribe }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvent() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within EventProvider');
  }
  return context;
}

// Custom hook for subscribing
export function useEventSubscription(event, callback) {
  const { subscribe } = useEvent();
  
  useEffect(() => {
    return subscribe(event, callback);
  }, [event, callback, subscribe]);
}

// Usage
function App() {
  return (
    <EventProvider>
      <PublisherComponent />
      <SubscriberComponent />
    </EventProvider>
  );
}

function PublisherComponent() {
  const { publish } = useEvent();
  
  return (
    <button onClick={() => publish('buttonClicked', { time: Date.now() })}>
      Click Me
    </button>
  );
}

function SubscriberComponent() {
  useEventSubscription('buttonClicked', (data) => {
    console.log('Button clicked at:', data.time);
  });
  
  return <div>Listening for button clicks...</div>;
}

When to Use Pub-Sub:
--------------------

// ✅ Use pub-sub when:

// 1. Multiple components need to react to same event
// - Notification system
// - Shopping cart updates
// - User authentication state

// 2. Components are far apart in tree
// - Deep nesting makes prop drilling painful
// - Context would cause unnecessary re-renders

// 3. Loose coupling desired
// - Publisher doesn't need to know subscribers
// - Subscribers can be added/removed dynamically

// 4. Event-driven architecture
// - Analytics tracking
// - Logging
// - Real-time updates

// ❌ Don't use pub-sub when:

// 1. Simple parent-child communication
// - Use props instead

// 2. Complex state management needed
// - Use Redux/Zustand instead

// 3. Type safety important
// - Pub-sub is harder to type check

Advantages and Disadvantages:
------------------------------

// Advantages:
// ✅ Loose coupling
// ✅ Easy to add new subscribers
// ✅ No prop drilling
// ✅ Event-driven architecture
// ✅ Flexible communication

// Disadvantages:
// ❌ Harder to debug (implicit connections)
// ❌ Can lead to memory leaks (forgot unsubscribe)
// ❌ Less type-safe
// ❌ Can become complex
// ❌ Hard to track data flow

Summary:

Pub-Sub Pattern:
- Decouples publishers and subscribers
- Event-based communication
- Loose coupling between components
- Great for notifications, cart updates
- Requires cleanup (unsubscribe)
- Can be combined with Context
- Use when components far apart
- Avoid for simple parent-child communication
*/


/**
100. What is the state machine pattern (XState) in React?
---------------------------------------------------------

State machines are a way to model application state as a finite set of states
with explicit transitions between them. XState is a library that implements
state machines in JavaScript/React, making complex state management predictable.

Basic State Machine Concept:
-----------------------------

// Traffic light example - finite states with transitions

// States: GREEN, YELLOW, RED
// Transitions:
//   GREEN -> YELLOW (timer)
//   YELLOW -> RED (timer)
//   RED -> GREEN (timer)

// Without state machine (complex boolean logic)
function TrafficLight() {
  const [isGreen, setIsGreen] = useState(true);
  const [isYellow, setIsYellow] = useState(false);
  const [isRed, setIsRed] = useState(false);
  
  // Complex logic to manage state
  const next = () => {
    if (isGreen) {
      setIsGreen(false);
      setIsYellow(true);
    } else if (isYellow) {
      setIsYellow(false);
      setIsRed(true);
    } else if (isRed) {
      setIsRed(false);
      setIsGreen(true);
    }
  };
  
  return (
    <div>
      <div className={isGreen ? 'active' : ''}>Green</div>
      <div className={isYellow ? 'active' : ''}>Yellow</div>
      <div className={isRed ? 'active' : ''}>Red</div>
      <button onClick={next}>Next</button>
    </div>
  );
}

// With state machine (explicit states)
import { createMachine } from 'xstate';

const trafficLightMachine = createMachine({
  id: 'trafficLight',
  initial: 'green',
  states: {
    green: {
      on: {
        NEXT: 'yellow'
      }
    },
    yellow: {
      on: {
        NEXT: 'red'
      }
    },
    red: {
      on: {
        NEXT: 'green'
      }
    }
  }
});

Basic XState Setup:
-------------------

// Installation
npm install xstate @xstate/react

// Simple toggle machine
import { createMachine } from 'xstate';
import { useMachine } from '@xstate/react';

const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: {
      on: {
        TOGGLE: 'active'
      }
    },
    active: {
      on: {
        TOGGLE: 'inactive'
      }
    }
  }
});

function ToggleComponent() {
  const [state, send] = useMachine(toggleMachine);
  
  return (
    <div>
      <p>Status: {state.value}</p>
      <button onClick={() => send('TOGGLE')}>
        Toggle
      </button>
    </div>
  );
}

State Machine with Context:
----------------------------

// Machine with data (context) [web:177][web:180]

const counterMachine = createMachine({
  id: 'counter',
  initial: 'active',
  context: {
    count: 0,
    step: 1
  },
  states: {
    active: {
      on: {
        INCREMENT: {
          actions: 'increment'
        },
        DECREMENT: {
          actions: 'decrement'
        },
        SET_STEP: {
          actions: 'setStep'
        }
      }
    }
  }
}, {
  actions: {
    increment: (context) => {
      context.count += context.step;
    },
    decrement: (context) => {
      context.count -= context.step;
    },
    setStep: (context, event) => {
      context.step = event.value;
    }
  }
});

function Counter() {
  const [state, send] = useMachine(counterMachine);
  
  return (
    <div>
      <p>Count: {state.context.count}</p>
      <p>Step: {state.context.step}</p>
      
      <button onClick={() => send('INCREMENT')}>+</button>
      <button onClick={() => send('DECREMENT')}>-</button>
      
      <input
        type="number"
        value={state.context.step}
        onChange={(e) => send({ type: 'SET_STEP', value: Number(e.target.value) })}
      />
    </div>
  );
}

Entry and Exit Actions:
------------------------

// Actions that run when entering/exiting states [web:177][web:180]

const doorMachine = createMachine({
  id: 'door',
  initial: 'closed',
  context: {
    timesOpened: 0
  },
  states: {
    closed: {
      entry: 'logClosed',  // Runs when entering closed state [web:177]
      on: {
        OPEN: 'opened'
      }
    },
    opened: {
      entry: 'incrementOpened',  // Runs when entering opened state [web:177]
      exit: 'logClosing',  // Runs when exiting opened state [web:177]
      on: {
        CLOSE: 'closed'
      }
    }
  }
}, {
  actions: {
    logClosed: () => console.log('Door is closed'),
    incrementOpened: (context) => {
      context.timesOpened += 1;  // [web:177][web:180]
      console.log(`Door opened ${context.timesOpened} times`);
    },
    logClosing: () => console.log('Closing door...')
  }
});

Real-World Example: Form Machine:
----------------------------------

import { createMachine, assign } from 'xstate';
import { useMachine } from '@xstate/react';

const formMachine = createMachine({
  id: 'form',
  initial: 'editing',
  context: {
    formData: {
      name: '',
      email: ''
    },
    errors: {}
  },
  states: {
    editing: {
      on: {
        CHANGE: {
          actions: 'updateField'
        },
        SUBMIT: {
          target: 'validating'
        }
      }
    },
    validating: {
      entry: 'validateForm',
      always: [
        { target: 'submitting', cond: 'isValid' },
        { target: 'editing', actions: 'setErrors' }
      ]
    },
    submitting: {
      invoke: {
        id: 'submitForm',
        src: (context) => submitFormAPI(context.formData),
        onDone: {
          target: 'success'
        },
        onError: {
          target: 'error',
          actions: 'setApiError'
        }
      }
    },
    success: {
      entry: 'showSuccessMessage',
      on: {
        RESET: {
          target: 'editing',
          actions: 'clearForm'
        }
      }
    },
    error: {
      on: {
        RETRY: 'submitting',
        CANCEL: {
          target: 'editing',
          actions: 'clearErrors'
        }
      }
    }
  }
}, {
  actions: {
    updateField: assign((context, event) => ({
      formData: {
        ...context.formData,
        [event.field]: event.value
      }
    })),
    validateForm: assign((context) => {
      const errors = {};
      
      if (!context.formData.name) {
        errors.name = 'Name is required';
      }
      
      if (!context.formData.email) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(context.formData.email)) {
        errors.email = 'Invalid email';
      }
      
      return { errors };
    }),
    setErrors: (context) => {
      console.log('Validation errors:', context.errors);
    },
    setApiError: assign((context, event) => ({
      errors: { api: event.data.message }
    })),
    showSuccessMessage: () => {
      console.log('Form submitted successfully!');
    },
    clearForm: assign({
      formData: { name: '', email: '' },
      errors: {}
    }),
    clearErrors: assign({ errors: {} })
  },
  guards: {
    isValid: (context) => Object.keys(context.errors).length === 0
  }
});

function FormComponent() {
  const [state, send] = useMachine(formMachine);
  
  const { formData, errors } = state.context;
  
  const handleChange = (field, value) => {
    send({ type: 'CHANGE', field, value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    send('SUBMIT');
  };
  
  if (state.matches('success')) {
    return (
      <div>
        <p>Form submitted successfully!</p>
        <button onClick={() => send('RESET')}>Submit Another</button>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Name"
          disabled={state.matches('submitting')}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      
      <div>
        <input
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="Email"
          disabled={state.matches('submitting')}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      
      {state.matches('error') && (
        <div>
          <p className="error">{errors.api}</p>
          <button type="button" onClick={() => send('RETRY')}>
            Retry
          </button>
          <button type="button" onClick={() => send('CANCEL')}>
            Cancel
          </button>
        </div>
      )}
      
      <button type="submit" disabled={state.matches('submitting')}>
        {state.matches('submitting') ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

Authentication State Machine:
------------------------------

const authMachine = createMachine({
  id: 'auth',
  initial: 'checkingAuth',
  context: {
    user: null,
    error: null
  },
  states: {
    checkingAuth: {
      invoke: {
        id: 'checkAuth',
        src: () => checkAuthStatus(),
        onDone: {
          target: 'authenticated',
          actions: assign((context, event) => ({
            user: event.data
          }))
        },
        onError: 'unauthenticated'
      }
    },
    unauthenticated: {
      on: {
        LOGIN: 'loggingIn'
      }
    },
    loggingIn: {
      invoke: {
        id: 'login',
        src: (context, event) => loginAPI(event.credentials),
        onDone: {
          target: 'authenticated',
          actions: assign((context, event) => ({
            user: event.data,
            error: null
          }))
        },
        onError: {
          target: 'unauthenticated',
          actions: assign((context, event) => ({
            error: event.data.message
          }))
        }
      }
    },
    authenticated: {
      on: {
        LOGOUT: {
          target: 'unauthenticated',
          actions: assign({
            user: null,
            error: null
          })
        }
      }
    }
  }
});

Benefits of State Machines: [web:177]
---------------------------------------

// 1. Impossible states are impossible
// Can't be both loading and error at same time

// 2. Explicit transitions
// All possible state changes documented

// 3. Visualizable
// Can generate state diagrams

// 4. Testable
// Test all state transitions

// 5. Predictable
// Same input always produces same output

When to Use State Machines:
----------------------------

// ✅ Use state machines when:

// 1. Complex state logic
// - Multi-step forms
// - Authentication flows
// - Game states

// 2. Many possible states
// - Fetching, success, error, idle
// - Multiple user flows

// 3. Need to prevent invalid states
// - Can't be loading and showing data
// - Explicit state transitions

// 4. State visualization needed
// - Complex flows
// - Documentation

Summary:

State Machines (XState):
- Finite set of states [web:177]
- Explicit transitions [web:177]
- Context for data [web:177][web:180]
- Entry/exit actions [web:177][web:180]
- Guards for conditions [web:177]
- Invoke for async [web:177]
- Prevents impossible states [web:177]
- Visualizable and testable [web:177]
- Great for complex flows [web:177]
*/


/**
101. What is state colocation and why does it matter?
----------------------------------------------------

State colocation means keeping state as close as possible to where it's used.
Instead of lifting state to a common ancestor, keep it local to the component
that needs it until it's actually needed elsewhere.

The Problem - Global State:
----------------------------

// ❌ Bad: Everything in global state
function App() {
  // All state at top level
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('home');
  const [notifications, setNotifications] = useState([]);
  // ... 50 more state variables
  
  return (
    <div>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        notifications={notifications}
      />
      <Sidebar
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <MainContent
        userName={userName}
        userEmail={userEmail}
        setUserName={setUserName}
        setUserEmail={setUserEmail}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

// Problems:
// - App re-renders when ANY state changes
// - All children re-render unnecessarily
// - Prop drilling everywhere
// - Hard to maintain

The Solution - Colocated State:
--------------------------------

// ✅ Good: State where it's used
function App() {
  return (
    <div>
      <Header />
      <Sidebar />
      <MainContent />
      <ModalContainer />
    </div>
  );
}

function Header() {
  // State colocated in Header
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  
  return (
    <header>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <Notifications items={notifications} />
    </header>
  );
}

function Sidebar() {
  // State colocated in Sidebar
  const [selectedTab, setSelectedTab] = useState('home');
  
  return (
    <aside>
      <Tabs selected={selectedTab} onSelect={setSelectedTab} />
    </aside>
  );
}

function MainContent() {
  // State colocated in MainContent
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  
  return (
    <main>
      <input value={userName} onChange={(e) => setUserName(e.target.value)} />
      <input value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
    </main>
  );
}

// Benefits:
// - Each component manages only its state
// - Changes don't affect other components
// - No prop drilling
// - Easier to understand and maintain

Real-World Example:
-------------------

// ❌ Bad: Premature lifting
function Dashboard() {
  // Lifted too early
  const [userFormData, setUserFormData] = useState({});
  const [productFilters, setProductFilters] = useState({});
  const [chartConfig, setChartConfig] = useState({});
  
  return (
    <div>
      <UserPanel
        formData={userFormData}
        setFormData={setUserFormData}
      />
      <ProductList
        filters={productFilters}
        setFilters={setProductFilters}
      />
      <Analytics
        config={chartConfig}
        setConfig={setChartConfig}
      />
    </div>
  );
}

// ✅ Good: Colocated
function Dashboard() {
  return (
    <div>
      <UserPanel />  {/* Manages own state * /}
      <ProductList />  {/* Manages own state * /}
      <Analytics />  {/* Manages own state * /}
    </div>
  );
}

function UserPanel() {
  // State lives here, not in parent
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  
  const handleSubmit = () => {
    saveUser(formData);
  };
  
  return (
    <div>
      <input
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
      />
      <input
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
      />
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}

When to Lift State:
-------------------

// Lift state only when actually needed by multiple components

// ✅ Good: Lift when shared
function ShoppingCart() {
  // Cart is shared between CartWidget and CartPage
  const [cart, setCart] = useState([]);
  
  return (
    <div>
      <Header>
        <CartWidget items={cart} />
      </Header>
      <CartPage items={cart} setItems={setCart} />
    </div>
  );
}

// ✅ Better: Use Context for deep sharing
const CartContext = createContext();

function ShoppingApp() {
  const [cart, setCart] = useState([]);
  
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <Header />  {/* Can access cart * /}
      <CartPage />  {/* Can access cart * /}
      <ProductList />  {/* Can access cart * /}
    </CartContext.Provider>
  );
}

Form Example:
-------------

// ❌ Bad: All fields in parent
function RegistrationForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  // ... 20 more fields
  
  return (
    <form>
      <PersonalInfo
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
      />
      <AccountInfo
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
      />
      <AddressInfo
        address={address}
        setAddress={setAddress}
        city={city}
        setCity={setCity}
        zipCode={zipCode}
        setZipCode={setZipCode}
      />
    </form>
  );
}

// ✅ Good: Each section manages own state
function RegistrationForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Collect data from refs or form data
    const formData = new FormData(e.target);
    submitRegistration(formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <PersonalInfo />
      <AccountInfo />
      <AddressInfo />
      <button type="submit">Register</button>
    </form>
  );
}

function PersonalInfo() {
  // State colocated here
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  return (
    <fieldset>
      <legend>Personal Information</legend>
      <input
        name="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        name="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
    </fieldset>
  );
}

Modal Example:
--------------

// ❌ Bad: Modal state in App
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div>
      <Header />
      <Content />
      <Footer openModal={() => setIsModalOpen(true)} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

// ✅ Good: Modal state where it's triggered
function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <footer>
      <button onClick={() => setIsModalOpen(true)}>
        Contact Us
      </button>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ContactForm />
      </Modal>
    </footer>
  );
}

Benefits of State Colocation:
------------------------------

// 1. Performance
// - Only relevant components re-render
// - Smaller component trees affected

// 2. Maintainability
// - State logic near where it's used
// - Easier to understand
// - Less cognitive load

// 3. Reusability
// - Components are self-contained
// - Can move/reuse easily

// 4. Testing
// - Test component in isolation
// - No need to setup parent state

// 5. Refactoring
// - Safe to move components
// - Less coupling

Guidelines:
-----------

// 1. Start local, lift when needed
function Component() {
  const [state, setState] = useState(); // Start here
  
  // Lift only when:
  // - Multiple siblings need it
  // - Parent needs to coordinate
  // - Need to persist across unmounts
}

// 2. Use composition over props
// ❌ Props drilling
<Parent>
  <Child data={data} setData={setData} />
</Parent>

// ✅ Composition
<Parent>
  {/* Child manages own state * /}
  <Child />
</Parent>

// 3. Use Context sparingly
// Only for truly global state:
// - Auth user
// - Theme
// - Language

// Not for everything:
// - Form fields
// - UI state
// - Temporary data

// 4. Keep related state together
// ✅ Good
const [user, setUser] = useState({
  name: '',
  email: ''
});

// ❌ Bad
const [userName, setUserName] = useState('');
const [userEmail, setUserEmail] = useState('');

Summary:

State Colocation:
- Keep state close to where it's used
- Don't lift state prematurely
- Lift only when actually shared
- Improves performance
- Easier to maintain
- More reusable components
- Better testing
- Start local, lift when needed
*/


/**
102. What is React Portal and when do you use it?
------------------------------------------------

React Portal provides a way to render children into a DOM node that exists
outside the parent component's DOM hierarchy. It allows you to "teleport"
JSX to a different part of the DOM while maintaining React's component tree.

Basic Portal Usage:
-------------------

import { createPortal } from 'react-dom';

function Modal({ isOpen, children }) {
  if (!isOpen) return null;
  
  // Render into #modal-root instead of parent
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')  // Target DOM node
  );
}

// HTML structure:
// <div id="root">
//   <!-- Your React app -->
// </div>
// <div id="modal-root">
//   <!-- Modals render here -->
// </div>

// Usage
function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="app">
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      
      {/* Modal renders outside app div * /}
      <Modal isOpen={isOpen}>
        <h2>Modal Title</h2>
        <p>Modal content</p>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}

Why Use Portals:
----------------

// 1. Avoid CSS issues

// Without Portal:
<div style={{ overflow: 'hidden', position: 'relative' }}>
  <Modal />  {/* Clipped by parent styles! * /}
</div>

// With Portal:
<div style={{ overflow: 'hidden', position: 'relative' }}>
  <Modal />  {/* Renders outside, not clipped * /}
</div>

// 2. Z-index stacking context

// Without Portal:
<div style={{ zIndex: 1 }}>
  <Modal />  {/* Can't escape parent z-index * /}
</div>

// With Portal:
// Modal renders at root level, independent z-index

// 3. DOM hierarchy independence
// Component logically in React tree
// But rendered elsewhere in DOM

Modal Implementation:
---------------------

// Complete modal with Portal

function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return;
    
    // Prevent body scroll when modal open
    document.body.style.overflow = 'hidden';
    
    // Handle Escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return createPortal(
    <div
      className="modal-overlay"
      onClick={onClose}  // Click outside to close
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}  // Don't close when clicking modal
      >
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

// Usage
function App() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div>
      <h1>My App</h1>
      <button onClick={() => setShowModal(true)}>
        Open Modal
      </button>
      
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2>Modal Title</h2>
        <p>This modal is rendered via Portal!</p>
      </Modal>
    </div>
  );
}

Tooltip with Portal:
--------------------

function Tooltip({ children, content }) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef(null);
  
  const showTooltip = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        x: rect.left + rect.width / 2,
        y: rect.top
      });
      setIsVisible(true);
    }
  };
  
  const hideTooltip = () => {
    setIsVisible(false);
  };
  
  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {children}
      </span>
      
      {isVisible && createPortal(
        <div
          className="tooltip"
          style={{
            position: 'absolute',
            left: position.x,
            top: position.y - 40,
            transform: 'translateX(-50%)'
          }}
        >
          {content}
        </div>,
        document.body
      )}
    </>
  );
}

// Usage
function App() {
  return (
    <div>
      <p>
        Hover over{' '}
        <Tooltip content="This is a tooltip!">
          <strong>this text</strong>
        </Tooltip>
        {' '}to see tooltip.
      </p>
    </div>
  );
}

Dropdown with Portal:
---------------------

function Dropdown({ trigger, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef(null);
  
  const toggle = () => {
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        x: rect.left,
        y: rect.bottom
      });
    }
    setIsOpen(!isOpen);
  };
  
  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (e) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);
  
  return (
    <>
      <div ref={triggerRef} onClick={toggle}>
        {trigger}
      </div>
      
      {isOpen && createPortal(
        <div
          className="dropdown"
          style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            zIndex: 1000
          }}
        >
          {children}
        </div>,
        document.body
      )}
    </>
  );
}

// Usage
function App() {
  return (
    <div>
      <Dropdown trigger={<button>Menu</button>}>
        <ul>
          <li>Profile</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </Dropdown>
    </div>
  );
}

Toast Notifications with Portal:
---------------------------------

const ToastContext = createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  
  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);
  
  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      
      {createPortal(
        <div className="toast-container">
          {toasts.map(toast => (
            <div key={toast.id} className={`toast toast-${toast.type}`}>
              {toast.message}
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

// Usage
function App() {
  return (
    <ToastProvider>
      <MyApp />
    </ToastProvider>
  );
}

function MyApp() {
  const { addToast } = useToast();
  
  return (
    <div>
      <button onClick={() => addToast('Success!', 'success')}>
        Show Success
      </button>
      <button onClick={() => addToast('Error!', 'error')}>
        Show Error
      </button>
    </div>
  );
}

Event Bubbling with Portals:
-----------------------------

// Events bubble through React tree, not DOM tree!

function App() {
  const handleClick = () => {
    console.log('Parent clicked!');
  };
  
  return (
    <div onClick={handleClick}>
      <ModalWithPortal>
        <button>Click me</button>
        {/* Clicking button triggers parent's onClick * /}
        {/* Even though modal is rendered outside parent in DOM * /}
      </ModalWithPortal>
    </div>
  );
}

// This is useful! Events work as expected in React tree

When to Use Portals:
--------------------

// ✅ Use Portals for:

// 1. Modals and dialogs
// Need to render above everything else
createPortal(<Modal />, document.body);

// 2. Tooltips and popovers
// Need to escape parent overflow/z-index
createPortal(<Tooltip />, document.body);

// 3. Dropdowns and menus
// Need absolute positioning from body
createPortal(<Dropdown />, document.body);

// 4. Toast notifications
// Need fixed position at screen edge
createPortal(<Toast />, document.body);

// 5. Full-screen overlays
// Cover entire viewport
createPortal(<Overlay />, document.body);

// ❌ Don't use Portals for:

// 1. Regular content
// Just use normal React rendering

// 2. Simple conditional rendering
// if/else or && operator sufficient

// 3. Components that don't need DOM independence
// No styling or z-index issues

Summary:

React Portal:
- Render children outside parent DOM hierarchy
- Use createPortal(children, domNode)
- Events bubble through React tree
- Perfect for modals, tooltips, dropdowns
- Solves CSS overflow/z-index issues
- Maintains React component hierarchy
- Common pattern for UI overlays
*/

