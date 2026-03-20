/*

========================================================
SECTION 7 — FORMS & VALIDATION
========================================================
59. What are controlled components?  
60. What are uncontrolled components?  
61. What is useFormik or Formik library?  
62. What is Yup validation?  
63. What is React Hook Form and why is it performant?  

*/




/**
59. What are controlled components?
-----------------------------------

A controlled component is a form element whose value is controlled by React state.
The component's value is always driven by React state, making React the "single source
of truth" for the form data.

Characteristics:
- Value stored in React state
- onChange handler updates state
- Value prop receives state
- React controls the input value
- Predictable and testable

Basic Controlled Component:
----------------------------

import { useState } from 'react';

function ControlledInput() {
  const [value, setValue] = useState('');
  
  return (
    <div>
      <input
        type="text"
        value={value}  // ← Controlled by state
        onChange={(e) => setValue(e.target.value)}  // ← Updates state
      />
      <p>Current value: {value}</p>
    </div>
  );
}

// Flow:
// 1. User types in input
// 2. onChange fires
// 3. setState updates React state
// 4. Component re-renders
// 5. Input displays new state value

Different Input Types:
----------------------

function ControlledForm() {
  const [formData, setFormData] = useState({
    // Text input
    username: '',
    
    // Email input
    email: '',
    
    // Password input
    password: '',
    
    // Number input
    age: '',
    
    // Textarea
    bio: '',
    
    // Checkbox
    agreeToTerms: false,
    
    // Radio buttons
    gender: '',
    
    // Select dropdown
    country: '',
    
    // Multi-select
    interests: []
  });
  
  // Generic change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Multi-select handler
  const handleMultiSelect = (e) => {
    const options = e.target.options;
    const selected = [];
    
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    
    setFormData(prev => ({ ...prev, interests: selected }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Text Input * /}
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />
      
      {/* Email Input * /}
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      
      {/* Password Input * /}
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      
      {/* Number Input * /}
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
      />
      
      {/* Textarea * /}
      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        placeholder="Bio"
      />
      
      {/* Checkbox * /}
      <label>
        <input
          type="checkbox"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleChange}
        />
        I agree to terms
      </label>
      
      {/* Radio Buttons * /}
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
      
      {/* Select Dropdown * /}
      <select
        name="country"
        value={formData.country}
        onChange={handleChange}
      >
        <option value="">Select Country</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
      </select>
      
      {/* Multi-Select * /}
      <select
        name="interests"
        multiple
        value={formData.interests}
        onChange={handleMultiSelect}
      >
        <option value="sports">Sports</option>
        <option value="music">Music</option>
        <option value="reading">Reading</option>
        <option value="travel">Travel</option>
      </select>
      
      <button type="submit">Submit</button>
    </form>
  );
}

Benefits of Controlled Components:
-----------------------------------

// 1. Instant Validation
function EmailInput() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // Validate on every keystroke
    if (!value.includes('@')) {
      setError('Invalid email');
    } else {
      setError('');
    }
  };
  
  return (
    <div>
      <input value={email} onChange={handleChange} />
      {error && <span className="error">{error}</span>}
    </div>
  );
}

// 2. Input Formatting
function PhoneInput() {
  const [phone, setPhone] = useState('');
  
  const handleChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    // Format: (123) 456-7890
    if (value.length > 3 && value.length <= 6) {
      value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    } else if (value.length > 6) {
      value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
    }
    
    setPhone(value);
  };
  
  return <input value={phone} onChange={handleChange} />;
}

// 3. Uppercase Transformation
function UsernameInput() {
  const [username, setUsername] = useState('');
  
  const handleChange = (e) => {
    setUsername(e.target.value.toUpperCase()); // Force uppercase
  };
  
  return <input value={username} onChange={handleChange} />;
}

// 4. Character Limit
function BioInput() {
  const [bio, setBio] = useState('');
  const maxLength = 200;
  
  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setBio(value);
    }
  };
  
  return (
    <div>
      <textarea value={bio} onChange={handleChange} />
      <p>{bio.length} / {maxLength}</p>
    </div>
  );
}

// 5. Conditional Fields
function RegistrationForm() {
  const [userType, setUserType] = useState('personal');
  const [companyName, setCompanyName] = useState('');
  const [firstName, setFirstName] = useState('');
  
  return (
    <form>
      <select value={userType} onChange={e => setUserType(e.target.value)}>
        <option value="personal">Personal</option>
        <option value="business">Business</option>
      </select>
      
      {userType === 'business' && (
        <input
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
          placeholder="Company Name"
        />
      )}
      
      <input
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        placeholder="First Name"
      />
    </form>
  );
}

Complex Form Example:
---------------------

function UserRegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  // Validation rules
  const validate = () => {
    const newErrors = {};
    
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (formData.age && formData.age < 18) {
      newErrors.age = 'Must be 18 or older';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validate();
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    if (validate()) {
      console.log('Form submitted:', formData);
      // Submit to API
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Username"
        />
        {touched.username && errors.username && (
          <span className="error">{errors.username}</span>
        )}
      </div>
      
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Email"
        />
        {touched.email && errors.email && (
          <span className="error">{errors.email}</span>
        )}
      </div>
      
      <div>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Password"
        />
        {touched.password && errors.password && (
          <span className="error">{errors.password}</span>
        )}
      </div>
      
      <div>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Confirm Password"
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <span className="error">{errors.confirmPassword}</span>
        )}
      </div>
      
      <div>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Age"
        />
        {touched.age && errors.age && (
          <span className="error">{errors.age}</span>
        )}
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
        {touched.agreeToTerms && errors.agreeToTerms && (
          <span className="error">{errors.agreeToTerms}</span>
        )}
      </div>
      
      <button type="submit">Register</button>
    </form>
  );
}

Custom Controlled Input Hook:
------------------------------

function useInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);
  
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  
  const reset = () => {
    setValue(initialValue);
  };
  
  return {
    value,
    onChange: handleChange,
    reset
  };
}

// Usage
function LoginForm() {
  const email = useInput('');
  const password = useInput('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', email.value, password.value);
    email.reset();
    password.reset();
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" {...email} placeholder="Email" />
      <input type="password" {...password} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}

When to Use Controlled Components:
-----------------------------------

✅ Need instant validation
✅ Format input (phone numbers, credit cards)
✅ Transform input (uppercase, trim)
✅ Enforce input constraints (max length, patterns)
✅ Conditional fields based on other inputs
✅ Dynamic forms
✅ Multi-step forms
✅ Need to disable submit until valid
✅ Need to clear/reset form programmatically

Common Mistakes:
----------------

// ❌ Mistake 1: Not providing onChange
<input value={value} />
// Input becomes read-only!

// ✅ Fix: Always provide onChange
<input value={value} onChange={e => setValue(e.target.value)} />

// ❌ Mistake 2: Undefined initial value
const [value, setValue] = useState();
<input value={value} onChange={e => setValue(e.target.value)} />
// Warning: changing from uncontrolled to controlled

// ✅ Fix: Initialize with empty string
const [value, setValue] = useState('');

// ❌ Mistake 3: Wrong event target for checkbox
<input
  type="checkbox"
  checked={checked}
  onChange={e => setChecked(e.target.value)} // Wrong!
/>

// ✅ Fix: Use e.target.checked
<input
  type="checkbox"
  checked={checked}
  onChange={e => setChecked(e.target.checked)}
/>

Summary:

Controlled Components:
- React state is single source of truth
- Value prop tied to state
- onChange updates state
- Component re-renders with new value
- Full control over input behavior
- Instant validation possible
- Can format/transform input
- More React-like approach
- Recommended for most cases
*/


/**
60. What are uncontrolled components?
-------------------------------------

An uncontrolled component is a form element that maintains its own internal state
in the DOM, like traditional HTML form elements. You access values using refs instead
of state.

Characteristics:
- DOM is the source of truth
- No value prop (use defaultValue)
- Access value via ref.current.value
- Less code, simpler
- Values read when needed (on submit)

Basic Uncontrolled Component:
------------------------------

import { useRef } from 'react';

function UncontrolledInput() {
  const inputRef = useRef();
  
  const handleSubmit = () => {
    // Read value from DOM when needed
    console.log('Value:', inputRef.current.value);
  };
  
  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        defaultValue="Initial value"  // Not value!
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

// Flow:
// 1. User types in input
// 2. DOM maintains value internally
// 3. On submit, read value from ref
// 4. No component re-renders during typing

Complete Uncontrolled Form:
----------------------------

function UncontrolledForm() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const ageRef = useRef();
  const bioRef = useRef();
  const agreeRef = useRef();
  const genderRef = useRef();
  const countryRef = useRef();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Read all values from DOM
    const formData = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      age: ageRef.current.value,
      bio: bioRef.current.value,
      agreeToTerms: agreeRef.current.checked,
      gender: genderRef.current.value,
      country: countryRef.current.value
    };
    
    console.log('Form data:', formData);
    
    // Validate
    if (!formData.username) {
      alert('Username is required');
      return;
    }
    
    // Submit to API
    submitForm(formData);
  };
  
  const handleReset = () => {
    // Reset using form.reset()
    document.getElementById('myForm').reset();
  };
  
  return (
    <form id="myForm" onSubmit={handleSubmit}>
      {/* Text Input * /}
      <input
        ref={usernameRef}
        type="text"
        name="username"
        defaultValue=""
        placeholder="Username"
      />
      
      {/* Email Input * /}
      <input
        ref={emailRef}
        type="email"
        name="email"
        defaultValue=""
        placeholder="Email"
      />
      
      {/* Password Input * /}
      <input
        ref={passwordRef}
        type="password"
        name="password"
        defaultValue=""
        placeholder="Password"
      />
      
      {/* Number Input * /}
      <input
        ref={ageRef}
        type="number"
        name="age"
        defaultValue=""
        placeholder="Age"
      />
      
      {/* Textarea * /}
      <textarea
        ref={bioRef}
        name="bio"
        defaultValue=""
        placeholder="Bio"
      />
      
      {/* Checkbox * /}
      <label>
        <input
          ref={agreeRef}
          type="checkbox"
          name="agreeToTerms"
          defaultChecked={false}
        />
        I agree to terms
      </label>
      
      {/* Radio Buttons * /}
      <label>
        <input
          ref={genderRef}
          type="radio"
          name="gender"
          value="male"
          defaultChecked
        />
        Male
      </label>
      <label>
        <input
          type="radio"
          name="gender"
          value="female"
        />
        Female
      </label>
      
      {/* Select * /}
      <select ref={countryRef} name="country" defaultValue="">
        <option value="">Select Country</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
      </select>
      
      <button type="submit">Submit</button>
      <button type="button" onClick={handleReset}>Reset</button>
    </form>
  );
}

File Input (Always Uncontrolled):
----------------------------------

function FileUpload() {
  const fileRef = useRef();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Access file from DOM
    const file = fileRef.current.files[0];
    
    if (!file) {
      alert('Please select a file');
      return;
    }
    
    console.log('File:', file.name, file.size, file.type);
    
    // Upload file
    const formData = new FormData();
    formData.append('file', file);
    
    uploadFile(formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* File inputs are ALWAYS uncontrolled * /}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
      />
      <button type="submit">Upload</button>
    </form>
  );
}

Using FormData API:
-------------------

function UncontrolledFormWithFormData() {
  const formRef = useRef();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get all form data automatically
    const formData = new FormData(formRef.current);
    
    // Convert to object
    const data = Object.fromEntries(formData);
    
    console.log('Form data:', data);
    
    // Or iterate
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    
    // Submit
    fetch('/api/submit', {
      method: 'POST',
      body: formData
    });
  };
  
  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input name="username" defaultValue="" />
      <input name="email" type="email" defaultValue="" />
      <textarea name="message" defaultValue="" />
      <button type="submit">Submit</button>
    </form>
  );
}

Reading Values Imperatively:
-----------------------------

function UncontrolledWithActions() {
  const inputRef = useRef();
  
  const getValue = () => {
    alert(`Current value: ${inputRef.current.value}`);
  };
  
  const setValue = () => {
    inputRef.current.value = 'New value';
  };
  
  const clearValue = () => {
    inputRef.current.value = '';
  };
  
  const focusInput = () => {
    inputRef.current.focus();
  };
  
  return (
    <div>
      <input ref={inputRef} defaultValue="Initial" />
      
      <button onClick={getValue}>Get Value</button>
      <button onClick={setValue}>Set Value</button>
      <button onClick={clearValue}>Clear</button>
      <button onClick={focusInput}>Focus</button>
    </div>
  );
}

Validation with Uncontrolled:
------------------------------

function UncontrolledWithValidation() {
  const emailRef = useRef();
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const email = emailRef.current.value;
    
    // Validate on submit
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!email.includes('@')) {
      setError('Invalid email format');
      return;
    }
    
    setError('');
    console.log('Email:', email);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={emailRef}
        type="email"
        defaultValue=""
        placeholder="Email"
      />
      {error && <span className="error">{error}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}

HTML5 Validation:
-----------------

function UncontrolledWithHTML5Validation() {
  const formRef = useRef();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if form is valid
    if (!formRef.current.checkValidity()) {
      // Browser will show validation messages
      return;
    }
    
    const formData = new FormData(formRef.current);
    console.log('Valid form data:', Object.fromEntries(formData));
  };
  
  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input
        name="username"
        required
        minLength={3}
        placeholder="Username (min 3 chars)"
      />
      
      <input
        name="email"
        type="email"
        required
        placeholder="Email"
      />
      
      <input
        name="age"
        type="number"
        min={18}
        max={100}
        placeholder="Age (18-100)"
      />
      
      <input
        name="website"
        type="url"
        placeholder="Website URL"
      />
      
      <button type="submit">Submit</button>
    </form>
  );
}

Hybrid Approach:
----------------

// Use uncontrolled for most fields, controlled for specific ones
function HybridForm() {
  const formRef = useRef();
  const [username, setUsername] = useState('');  // Controlled for validation
  
  const handleUsernameChange = (e) => {
    // Transform to lowercase
    setUsername(e.target.value.toLowerCase());
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get uncontrolled values
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    
    // Combine with controlled value
    data.username = username;
    
    console.log('Form data:', data);
  };
  
  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      {/* Controlled (need transformation) * /}
      <input
        name="username"
        value={username}
        onChange={handleUsernameChange}
        placeholder="Username (lowercase)"
      />
      
      {/* Uncontrolled (simple fields) * /}
      <input name="email" type="email" defaultValue="" />
      <input name="password" type="password" defaultValue="" />
      <textarea name="bio" defaultValue="" />
      
      <button type="submit">Submit</button>
    </form>
  );
}

When to Use Uncontrolled Components:
-------------------------------------

✅ Simple forms (contact, login)
✅ Integrating with non-React libraries
✅ File uploads (always uncontrolled)
✅ Don't need instant validation
✅ Don't need to transform input
✅ Form with many fields (performance)
✅ Quick prototypes
✅ HTML5 validation sufficient

When NOT to Use:
----------------

❌ Need instant validation
❌ Need to format/transform input
❌ Conditional fields based on input
❌ Dynamic forms
❌ Need to disable submit until valid
❌ Multi-step forms
❌ Need to enforce input patterns

Controlled vs Uncontrolled Comparison:
---------------------------------------

// Controlled
function ControlledExample() {
  const [value, setValue] = useState('');
  
  return (
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
}

// Uncontrolled
function UncontrolledExample() {
  const inputRef = useRef();
  
  return <input ref={inputRef} defaultValue="" />;
}

// Controlled: More code, more control
// Uncontrolled: Less code, less control

Performance Comparison:
-----------------------

// Controlled: Re-renders on every keystroke
function ControlledPerformance() {
  const [value, setValue] = useState('');
  
  console.log('Render');  // Logs on every keystroke
  
  return <input value={value} onChange={e => setValue(e.target.value)} />;
}

// Uncontrolled: No re-renders during typing
function UncontrolledPerformance() {
  const inputRef = useRef();
  
  console.log('Render');  // Only logs on mount
  
  return <input ref={inputRef} defaultValue="" />;
}

Common Patterns:
----------------

// Pattern 1: Quick form with FormData
function QuickForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    submitToAPI(data);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" />
      <input name="email" type="email" />
      <button type="submit">Submit</button>
    </form>
  );
}

// Pattern 2: Focus management
function FocusExample() {
  const firstInputRef = useRef();
  
  useEffect(() => {
    firstInputRef.current.focus();
  }, []);
  
  return <input ref={firstInputRef} defaultValue="" />;
}

// Pattern 3: Clear form
function ClearForm() {
  const formRef = useRef();
  
  const handleClear = () => {
    formRef.current.reset();
  };
  
  return (
    <form ref={formRef}>
      <input name="field1" />
      <input name="field2" />
      <button type="button" onClick={handleClear}>Clear</button>
    </form>
  );
}

Common Mistakes:
----------------

// ❌ Mistake 1: Using value instead of defaultValue
<input ref={inputRef} value="" />
// Creates controlled component!

// ✅ Fix: Use defaultValue
<input ref={inputRef} defaultValue="" />

// ❌ Mistake 2: Switching between controlled and uncontrolled
const [value, setValue] = useState();
<input value={value} onChange={e => setValue(e.target.value)} />
// value is undefined initially

// ✅ Fix: Always initialize with string or use uncontrolled
const [value, setValue] = useState('');

// ❌ Mistake 3: Not preventing default on submit
const handleSubmit = () => {
  const value = inputRef.current.value;
  // Form submits and page refreshes!
};

// ✅ Fix: Prevent default
const handleSubmit = (e) => {
  e.preventDefault();
  const value = inputRef.current.value;
};

Summary:

Uncontrolled Components:
- DOM maintains state
- Access via refs
- Use defaultValue (not value)
- Read values when needed
- Less code, simpler
- Better performance (no re-renders)
- File inputs always uncontrolled
- Good for simple forms
- Use controlled for complex scenarios
*/


/**
61. What is useFormik or Formik library?
----------------------------------------

Formik is a popular library for building forms in React. It handles form state,
validation, error messages, and submission, reducing boilerplate and making forms
easier to manage.

Purpose:
- Simplify form state management
- Built-in validation support
- Error handling
- Touch tracking
- Form submission
- Reduce boilerplate code

Installation:
-------------

npm install formik

Basic useFormik Hook:
---------------------

import { useFormik } from 'formik';

function LoginForm() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      // Submit to API
      loginAPI(values);
    }
  });
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        type="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      
      <input
        type="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      
      <button type="submit">Login</button>
    </form>
  );
}

With Validation:
----------------

import { useFormik } from 'formik';

function RegistrationForm() {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    
    // Validation function
    validate: (values) => {
      const errors = {};
      
      if (!values.username) {
        errors.username = 'Required';
      } else if (values.username.length < 3) {
        errors.username = 'Must be at least 3 characters';
      }
      
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      
      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 8) {
        errors.password = 'Must be at least 8 characters';
      }
      
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords must match';
      }
      
      return errors;
    },
    
    onSubmit: (values) => {
      console.log('Registration:', values);
      registerAPI(values);
    }
  });
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <input
          type="text"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Username"
        />
        {formik.touched.username && formik.errors.username && (
          <div className="error">{formik.errors.username}</div>
        )}
      </div>
      
      <div>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Email"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="error">{formik.errors.email}</div>
        )}
      </div>
      
      <div>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Password"
        />
        {formik.touched.password && formik.errors.password && (
          <div className="error">{formik.errors.password}</div>
        )}
      </div>
      
      <div>
        <input
          type="password"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Confirm Password"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <div className="error">{formik.errors.confirmPassword}</div>
        )}
      </div>
      
      <button type="submit" disabled={formik.isSubmitting}>
        Register
      </button>
    </form>
  );
}

getFieldProps Helper:
---------------------

// Simplify field props with getFieldProps
function SimpleForm() {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: values => console.log(values)
  });
  
  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Instead of manually adding value, onChange, onBlur * /}
      <input
        type="email"
        {...formik.getFieldProps('email')}
        placeholder="Email"
      />
      
      <input
        type="password"
        {...formik.getFieldProps('password')}
        placeholder="Password"
      />
      
      <button type="submit">Submit</button>
    </form>
  );
}

// getFieldProps returns:
// {
//   name: 'email',
//   value: formik.values.email,
//   onChange: formik.handleChange,
//   onBlur: formik.handleBlur
// }

Formik Component (Alternative API):
------------------------------------

import { Formik, Form, Field, ErrorMessage } from 'formik';

function FormikComponentExample() {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log('Submitting:', values);
          setSubmitting(false);
        }, 1000);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          
          <div>
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

Custom Field Components:
------------------------

import { Field } from 'formik';

// Custom text input
function TextField({ label, ...props }) {
  return (
    <Field name={props.name}>
      {({ field, form, meta }) => (
        <div>
          <label>{label}</label>
          <input {...field} {...props} />
          {meta.touched && meta.error && (
            <div className="error">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
}

// Custom select
function SelectField({ label, options, ...props }) {
  return (
    <Field name={props.name}>
      {({ field, meta }) => (
        <div>
          <label>{label}</label>
          <select {...field} {...props}>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {meta.touched && meta.error && (
            <div className="error">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
}

// Custom checkbox
function CheckboxField({ label, ...props }) {
  return (
    <Field name={props.name} type="checkbox">
      {({ field, meta }) => (
        <div>
          <label>
            <input type="checkbox" {...field} {...props} />
            {label}
          </label>
          {meta.touched && meta.error && (
            <div className="error">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
}

// Usage
<Formik initialValues={{ name: '', country: '', agree: false }} onSubmit={handleSubmit}>
  <Form>
    <TextField label="Name" name="name" />
    <SelectField
      label="Country"
      name="country"
      options={[
        { value: 'us', label: 'United States' },
        { value: 'uk', label: 'United Kingdom' }
      ]}
    />
    <CheckboxField label="I agree to terms" name="agree" />
    <button type="submit">Submit</button>
  </Form>
</Formik>

Async Validation:
-----------------

function AsyncValidationForm() {
  const formik = useFormik({
    initialValues: { username: '' },
    
    validate: async (values) => {
      const errors = {};
      
      if (values.username) {
        // Check if username is taken
        const isTaken = await checkUsernameAvailability(values.username);
        if (isTaken) {
          errors.username = 'Username is already taken';
        }
      }
      
      return errors;
    },
    
    onSubmit: values => console.log(values)
  });
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <input {...formik.getFieldProps('username')} />
      {formik.touched.username && formik.errors.username && (
        <div>{formik.errors.username}</div>
      )}
      {formik.isValidating && <div>Checking username...</div>}
      <button type="submit">Submit</button>
    </form>
  );
}

Field Arrays (Dynamic Fields):
-------------------------------

import { Formik, Form, Field, FieldArray } from 'formik';

function FieldArrayExample() {
  return (
    <Formik
      initialValues={{
        friends: ['']
      }}
      onSubmit={values => console.log(values)}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="friends">
            {({ push, remove }) => (
              <div>
                {values.friends.map((friend, index) => (
                  <div key={index}>
                    <Field name={`friends.${index}`} placeholder="Friend's name" />
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => push('')}>
                  Add Friend
                </button>
              </div>
            )}
          </FieldArray>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}

Nested Objects:
---------------

function NestedObjectForm() {
  const formik = useFormik({
    initialValues: {
      user: {
        firstName: '',
        lastName: '',
        address: {
          street: '',
          city: '',
          zipCode: ''
        }
      }
    },
    onSubmit: values => console.log(values)
  });
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        {...formik.getFieldProps('user.firstName')}
        placeholder="First Name"
      />
      <input
        {...formik.getFieldProps('user.lastName')}
        placeholder="Last Name"
      />
      <input
        {...formik.getFieldProps('user.address.street')}
        placeholder="Street"
      />
      <input
        {...formik.getFieldProps('user.address.city')}
        placeholder="City"
      />
      <input
        {...formik.getFieldProps('user.address.zipCode')}
        placeholder="Zip Code"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

Form State and Helpers:
------------------------

function FormStateExample() {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: values => console.log(values)
  });
  
  console.log('Form State:');
  console.log('values:', formik.values);
  console.log('errors:', formik.errors);
  console.log('touched:', formik.touched);
  console.log('isValid:', formik.isValid);
  console.log('isSubmitting:', formik.isSubmitting);
  console.log('dirty:', formik.dirty); // Has form changed?
  
  // Helpers
  const manuallySetValue = () => {
    formik.setFieldValue('email', 'new@example.com');
  };
  
  const manuallySetError = () => {
    formik.setFieldError('email', 'Custom error');
  };
  
  const manuallySetTouched = () => {
    formik.setFieldTouched('email', true);
  };
  
  const resetForm = () => {
    formik.resetForm();
  };
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <input {...formik.getFieldProps('email')} />
      <input {...formik.getFieldProps('password')} />
      
      <button type="submit">Submit</button>
      <button type="button" onClick={resetForm}>Reset</button>
      <button type="button" onClick={manuallySetValue}>Set Email</button>
    </form>
  );
}

FormikHelpers in onSubmit:
---------------------------

function FormWithHelpers() {
  const formik = useFormik({
    initialValues: { email: '' },
    
    onSubmit: (values, formikHelpers) => {
      console.log('Values:', values);
      
      // formikHelpers methods:
      formikHelpers.setSubmitting(false);
      formikHelpers.setErrors({ email: 'Server error' });
      formikHelpers.setFieldError('email', 'Error');
      formikHelpers.setFieldValue('email', 'new value');
      formikHelpers.setFieldTouched('email', true);
      formikHelpers.resetForm();
      formikHelpers.setStatus('Form submitted successfully');
    }
  });
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <input {...formik.getFieldProps('email')} />
      {formik.status && <div>{formik.status}</div>}
      <button type="submit">Submit</button>
    </form>
  );
}

Real-World Complete Example:
-----------------------------

import { useFormik } from 'formik';

function UserProfileForm() {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      bio: '',
      country: '',
      agreeToTerms: false
    },
    
    validate: (values) => {
      const errors = {};
      
      if (!values.firstName) errors.firstName = 'Required';
      if (!values.lastName) errors.lastName = 'Required';
      
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email';
      }
      
      if (values.phone && !/^\d{10}$/.test(values.phone)) {
        errors.phone = 'Must be 10 digits';
      }
      
      if (values.bio && values.bio.length > 200) {
        errors.bio = 'Maximum 200 characters';
      }
      
      if (!values.country) errors.country = 'Required';
      
      if (!values.agreeToTerms) {
        errors.agreeToTerms = 'You must agree to terms';
      }
      
      return errors;
    },
    
    onSubmit: async (values, { setSubmitting, setErrors, setStatus }) => {
      try {
        await updateProfile(values);
        setStatus('Profile updated successfully!');
        setSubmitting(false);
      } catch (error) {
        setErrors({ submit: error.message });
        setSubmitting(false);
      }
    }
  });
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>First Name *</label>
        <input type="text" {...formik.getFieldProps('firstName')} />
        {formik.touched.firstName && formik.errors.firstName && (
          <div className="error">{formik.errors.firstName}</div>
        )}
      </div>
      
      <div>
        <label>Last Name *</label>
        <input type="text" {...formik.getFieldProps('lastName')} />
        {formik.touched.lastName && formik.errors.lastName && (
          <div className="error">{formik.errors.lastName}</div>
        )}
      </div>
      
      <div>
        <label>Email *</label>
        <input type="email" {...formik.getFieldProps('email')} />
        {formik.touched.email && formik.errors.email && (
          <div className="error">{formik.errors.email}</div>
        )}
      </div>
      
      <div>
        <label>Phone</label>
        <input type="tel" {...formik.getFieldProps('phone')} />
        {formik.touched.phone && formik.errors.phone && (
          <div className="error">{formik.errors.phone}</div>
        )}
      </div>
      
      <div>
        <label>Bio</label>
        <textarea {...formik.getFieldProps('bio')} />
        <small>{formik.values.bio.length} / 200</small>
        {formik.touched.bio && formik.errors.bio && (
          <div className="error">{formik.errors.bio}</div>
        )}
      </div>
      
      <div>
        <label>Country *</label>
        <select {...formik.getFieldProps('country')}>
          <option value="">Select...</option>
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="ca">Canada</option>
        </select>
        {formik.touched.country && formik.errors.country && (
          <div className="error">{formik.errors.country}</div>
        )}
      </div>
      
      <div>
        <label>
          <input
            type="checkbox"
            {...formik.getFieldProps('agreeToTerms')}
            checked={formik.values.agreeToTerms}
          />
          I agree to terms and conditions *
        </label>
        {formik.touched.agreeToTerms && formik.errors.agreeToTerms && (
          <div className="error">{formik.errors.agreeToTerms}</div>
        )}
      </div>
      
      {formik.errors.submit && (
        <div className="error">{formik.errors.submit}</div>
      )}
      
      {formik.status && (
        <div className="success">{formik.status}</div>
      )}
      
      <button
        type="submit"
        disabled={formik.isSubmitting || !formik.isValid}
      >
        {formik.isSubmitting ? 'Saving...' : 'Save Profile'}
      </button>
      
      <button type="button" onClick={() => formik.resetForm()}>
        Reset
      </button>
    </form>
  );
}

Summary:

Formik:
- Simplifies form management
- Handles form state automatically
- Built-in validation support
- Touch tracking
- Error handling
- Submission helpers
- useFormik hook or <Formik> component
- getFieldProps for less boilerplate
- Field and Form components
- Works with Yup validation
- Reduces code significantly
*/


/**
62. What is Yup validation?
---------------------------

Yup is a JavaScript schema validation library that works perfectly with Formik.
It provides a declarative way to define validation rules and error messages.

Purpose:
- Schema-based validation
- Declarative validation rules
- Reusable validation schemas
- Type coercion
- Async validation
- Custom error messages

Installation:
-------------

npm install yup

Basic Yup Schema:
-----------------

import * as Yup from 'yup';

const validationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Must be at least 3 characters')
    .max(20, 'Must be at most 20 characters'),
  
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Must contain uppercase, lowercase, and number'
    ),
  
  age: Yup.number()
    .required('Age is required')
    .positive('Must be positive')
    .integer('Must be an integer')
    .min(18, 'Must be at least 18'),
  
  website: Yup.string()
    .url('Must be a valid URL'),
  
  agreeToTerms: Yup.boolean()
    .oneOf([true], 'You must accept terms')
});

Yup with Formik:
----------------

import { useFormik } from 'formik';
import * as Yup from 'yup';

function RegistrationForm() {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: '',
      website: '',
      agreeToTerms: false
    },
    
    // Pass Yup schema to validationSchema
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Required')
        .min(3, 'Too short'),
      
      email: Yup.string()
        .required('Required')
        .email('Invalid email'),
      
      password: Yup.string()
        .required('Required')
        .min(8, 'Too short'),
      
      confirmPassword: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
      
      age: Yup.number()
        .required('Required')
        .min(18, 'Must be 18+'),
      
      website: Yup.string()
        .url('Invalid URL'),
      
      agreeToTerms: Yup.boolean()
        .oneOf([true], 'Must agree')
    }),
    
    onSubmit: values => console.log(values)
  });
  
  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Form fields * /}
    </form>
  );
}

String Validations:
-------------------

const schema = Yup.object({
  // Required
  name: Yup.string().required('Name is required'),
  
  // Min/Max length
  username: Yup.string()
    .min(3, 'Minimum 3 characters')
    .max(20, 'Maximum 20 characters'),
  
  // Email
  email: Yup.string().email('Invalid email'),
  
  // URL
  website: Yup.string().url('Must be a valid URL'),
  
  // Matches regex
  phone: Yup.string().matches(
    /^\d{10}$/,
    'Must be exactly 10 digits'
  ),
  
  // Lowercase/Uppercase
  lowercase: Yup.string().lowercase(),
  uppercase: Yup.string().uppercase(),
  
  // Trim whitespace
  trimmed: Yup.string().trim(),
  
  // One of specific values
  gender: Yup.string().oneOf(['male', 'female', 'other'], 'Invalid gender'),
  
  // Custom test
  specialName: Yup.string().test(
    'no-admin',
    'Cannot use "admin"',
    value => value !== 'admin'
  )
});

Number Validations:
-------------------

const schema = Yup.object({
  // Required number
  age: Yup.number().required('Age is required'),
  
  // Min/Max
  age: Yup.number()
    .min(18, 'Must be at least 18')
    .max(100, 'Must be at most 100'),
  
  // Positive/Negative
  price: Yup.number().positive('Must be positive'),
  debt: Yup.number().negative('Must be negative'),
  
  // Integer
  count: Yup.number().integer('Must be whole number'),
  
  // Less than / More than
  discount: Yup.number().lessThan(100, 'Cannot exceed 100%'),
  quantity: Yup.number().moreThan(0, 'Must be greater than 0')
});

Boolean Validations:
--------------------

const schema = Yup.object({
  // Must be true
  agreeToTerms: Yup.boolean()
    .oneOf([true], 'You must agree to terms'),
  
  // Required boolean
  subscribe: Yup.boolean().required('Please select')
});

Date Validations:
-----------------

const schema = Yup.object({
  // Required date
  birthDate: Yup.date().required('Date of birth required'),
  
  // Min/Max date
  startDate: Yup.date().min(new Date(), 'Must be in future'),
  endDate: Yup.date().max(new Date('2025-12-31'), 'Too far in future'),
  
  // Date must be before another field
  endDate: Yup.date().min(
    Yup.ref('startDate'),
    'End date must be after start date'
  )
});

Array Validations:
------------------

const schema = Yup.object({
  // Array with min/max length
  tags: Yup.array()
    .min(1, 'At least one tag required')
    .max(5, 'Maximum 5 tags'),
  
  // Array of strings
  interests: Yup.array().of(
    Yup.string().required('Interest cannot be empty')
  ),
  
  // Array of objects
  users: Yup.array().of(
    Yup.object({
      name: Yup.string().required(),
      age: Yup.number().required()
    })
  ),
  
  // Required array
  selectedItems: Yup.array().required('Must select at least one')
});

Object Validations:
-------------------

const schema = Yup.object({
  // Nested object
  address: Yup.object({
    street: Yup.string().required(),
    city: Yup.string().required(),
    zipCode: Yup.string()
      .required()
      .matches(/^\d{5}$/, 'Must be 5 digits')
  }),
  
  // Optional object
  metadata: Yup.object().nullable(),
  
  // Object with dynamic keys
  settings: Yup.object().shape({
    theme: Yup.string(),
    notifications: Yup.boolean()
  })
});

Conditional Validation:
------------------------

const schema = Yup.object({
  accountType: Yup.string().required(),
  
  // Conditional: required if accountType is 'business'
  companyName: Yup.string().when('accountType', {
    is: 'business',
    then: (schema) => schema.required('Company name required'),
    otherwise: (schema) => schema.notRequired()
  }),
  
  // Multiple conditions
  taxId: Yup.string().when(['accountType', 'country'], {
    is: (accountType, country) => accountType === 'business' && country === 'US',
    then: (schema) => schema.required('Tax ID required for US businesses')
  })
});

Reference Other Fields:
-----------------------

const schema = Yup.object({
  password: Yup.string()
    .required('Password required')
    .min(8, 'Too short'),
  
  // Must match password field
  confirmPassword: Yup.string()
    .required('Please confirm password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  
  // Age must be greater than minAge field
  age: Yup.number().min(
    Yup.ref('minAge'),
    'Age must be at least ${min}'
  )
});

Custom Validation:
------------------

const schema = Yup.object({
  // Custom test method
  username: Yup.string()
    .required()
    .test(
      'unique-username',
      'Username already taken',
      async (value) => {
        if (!value) return true;
        const isAvailable = await checkUsernameAvailability(value);
        return isAvailable;
      }
    ),
  
  // Test with access to context
  confirmEmail: Yup.string()
    .test(
      'emails-match',
      'Emails must match',
      function(value) {
        return value === this.parent.email;
      }
    ),
  
  // Custom validation function
  customField: Yup.string()
    .test('custom', 'Custom error', (value, context) => {
      // Access other fields via context.parent
      // Access root values via context.from[0].value
      return someValidationLogic(value);
    })
});

Type Coercion:
--------------

const schema = Yup.object({
  // Transform string to number
  age: Yup.number().transform((value, originalValue) => {
    return originalValue === '' ? undefined : value;
  }),
  
  // Trim strings
  name: Yup.string().trim(),
  
  // Lowercase
  email: Yup.string().lowercase().email()
});

Nullable and Optional:
----------------------

const schema = Yup.object({
  // Optional (can be undefined)
  middleName: Yup.string(),
  
  // Nullable (can be null)
  bio: Yup.string().nullable(),
  
  // Can be null or undefined
  description: Yup.string().nullable().optional(),
  
  // Required unless null
  phone: Yup.string().nullable().required('Phone required')
});

Default Values:
---------------

const schema = Yup.object({
  // Provide default value
  role: Yup.string().default('user'),
  
  // Default if value is undefined/null
  status: Yup.string().default('active'),
  
  // Function as default
  createdAt: Yup.date().default(() => new Date())
});

Reusable Schemas:
-----------------

// Define reusable schema parts
const emailSchema = Yup.string()
  .required('Email is required')
  .email('Invalid email');

const passwordSchema = Yup.string()
  .required('Password is required')
  .min(8, 'Minimum 8 characters')
  .matches(/[A-Z]/, 'Must contain uppercase')
  .matches(/[a-z]/, 'Must contain lowercase')
  .matches(/[0-9]/, 'Must contain number');

// Use in multiple forms
const loginSchema = Yup.object({
  email: emailSchema,
  password: passwordSchema
});

const registrationSchema = Yup.object({
  username: Yup.string().required().min(3),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'Passwords must match')
});

Complete Example with Formik:
------------------------------

import { useFormik } from 'formik';
import * as Yup from 'yup';

function CompleteForm() {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: '',
      phone: '',
      website: '',
      country: '',
      bio: '',
      interests: [],
      agreeToTerms: false
    },
    
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required('Required')
        .min(2, 'Too short')
        .max(50, 'Too long'),
      
      lastName: Yup.string()
        .required('Required')
        .min(2, 'Too short')
        .max(50, 'Too long'),
      
      email: Yup.string()
        .required('Required')
        .email('Invalid email'),
      
      password: Yup.string()
        .required('Required')
        .min(8, 'At least 8 characters')
        .matches(/[A-Z]/, 'Need uppercase')
        .matches(/[a-z]/, 'Need lowercase')
        .matches(/[0-9]/, 'Need number'),
      
      confirmPassword: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
      
      age: Yup.number()
        .required('Required')
        .positive('Must be positive')
        .integer('Must be integer')
        .min(18, 'Must be 18+')
        .max(120, 'Invalid age'),
      
      phone: Yup.string()
        .matches(/^\d{10}$/, 'Must be 10 digits'),
      
      website: Yup.string()
        .url('Must be valid URL'),
      
      country: Yup.string()
        .required('Required')
        .oneOf(['US', 'UK', 'CA'], 'Invalid country'),
      
      bio: Yup.string()
        .max(200, 'Maximum 200 characters'),
      
      interests: Yup.array()
        .min(1, 'Select at least one'),
      
      agreeToTerms: Yup.boolean()
        .oneOf([true], 'Must accept terms')
    }),
    
    onSubmit: values => {
      console.log('Form submitted:', values);
    }
  });
  
  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Render form fields with errors * /}
      <div>
        <input {...formik.getFieldProps('firstName')} />
        {formik.touched.firstName && formik.errors.firstName && (
          <div className="error">{formik.errors.firstName}</div>
        )}
      </div>
      
      {/* ... other fields ... * /}
      
      <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
        Submit
      </button>
    </form>
  );
}

Summary:

Yup:
- Schema-based validation
- Declarative validation rules
- Works perfectly with Formik
- String, number, boolean, date, array, object validation
- Conditional validation (.when())
- Reference other fields (Yup.ref())
- Custom validation (.test())
- Async validation support
- Type coercion and transformation
- Reusable schemas
- Clear error messages
- Reduces validation code significantly
*/


/**
63. What is React Hook Form and why is it performant?
-----------------------------------------------------

React Hook Form is a performant, flexible form library that uses uncontrolled
components and refs, minimizing re-renders and improving performance compared to
traditional controlled form solutions like Formik.

Key Features:
- Uses uncontrolled components (refs)
- Minimal re-renders
- Small bundle size (~9KB)
- Easy integration
- Built-in validation
- Works with UI libraries
- TypeScript support

Installation:
-------------

npm install react-hook-form

Basic Usage:
------------

import { useForm } from 'react-hook-form';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log('Form data:', data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', { required: 'Email is required' })}
        type="email"
        placeholder="Email"
      />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input
        {...register('password', { required: 'Password is required' })}
        type="password"
        placeholder="Password"
      />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit">Login</button>
    </form>
  );
}

// register() returns: { name, ref, onChange, onBlur }
// Connects input to React Hook Form

With Validation Rules:
----------------------

function RegistrationForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  
  const password = watch('password'); // Watch password for confirmPassword validation
  
  const onSubmit = (data) => {
    console.log('Registration:', data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          {...register('username', {
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Minimum 3 characters'
            },
            maxLength: {
              value: 20,
              message: 'Maximum 20 characters'
            }
          })}
          placeholder="Username"
        />
        {errors.username && <span>{errors.username.message}</span>}
      </div>
      
      <div>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          type="email"
          placeholder="Email"
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      
      <div>
        <input
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Minimum 8 characters'
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
              message: 'Must contain uppercase, lowercase, and number'
            }
          })}
          type="password"
          placeholder="Password"
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      
      <div>
        <input
          {...register('confirmPassword', {
            required: 'Please confirm password',
            validate: value =>
              value === password || 'Passwords do not match'
          })}
          type="password"
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
      </div>
      
      <div>
        <input
          {...register('age', {
            required: 'Age is required',
            min: {
              value: 18,
              message: 'Must be at least 18'
            },
            max: {
              value: 120,
              message: 'Invalid age'
            }
          })}
          type="number"
          placeholder="Age"
        />
        {errors.age && <span>{errors.age.message}</span>}
      </div>
      
      <button type="submit">Register</button>
    </form>
  );
}

Built-in Validation Rules:
---------------------------

register('fieldName', {
  // Required
  required: 'This field is required',
  required: true, // Default message
  
  // Min/Max length (strings)
  minLength: { value: 3, message: 'Min 3 chars' },
  maxLength: { value: 20, message: 'Max 20 chars' },
  
  // Min/Max value (numbers)
  min: { value: 18, message: 'Min 18' },
  max: { value: 100, message: 'Max 100' },
  
  // Pattern (regex)
  pattern: {
    value: /^[A-Z]/,
    message: 'Must start with uppercase'
  },
  
  // Custom validation
  validate: value => value !== 'admin' || 'Cannot use admin',
  
  // Multiple validations
  validate: {
    positive: v => v > 0 || 'Must be positive',
    lessThan: v => v < 100 || 'Must be less than 100'
  }
});

Why React Hook Form is Performant:
-----------------------------------

// 1. Uncontrolled components (no re-renders on input change)

// Formik/Controlled (re-renders on every keystroke):
function FormikForm() {
  const [value, setValue] = useState('');
  
  console.log('Render'); // Logs on every keystroke
  
  return (
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
}

// React Hook Form (no re-renders during typing):
function RHFForm() {
  const { register } = useForm();
  
  console.log('Render'); // Only logs on mount
  
  return <input {...register('name')} />;
}

// 2. Isolated re-renders (only components that need to update)

// Watch specific field (only that component re-renders)
function FieldWatcher() {
  const { watch } = useForm();
  const email = watch('email'); // Only re-renders when email changes
  
  return <div>Email: {email}</div>;
}

// 3. No unnecessary validation calls
// Validates on blur/submit by default, not on every keystroke

Default Values:
---------------

function FormWithDefaults() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: 'john_doe',
      email: 'john@example.com',
      age: 25,
      country: 'US',
      subscribe: true
    }
  });
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('username')} />
      <input {...register('email')} />
      <input {...register('age')} type="number" />
      <select {...register('country')}>
        <option value="US">USA</option>
        <option value="UK">UK</option>
      </select>
      <input {...register('subscribe')} type="checkbox" />
      <button type="submit">Submit</button>
    </form>
  );
}

Async Default Values:
----------------------

function FormWithAsyncDefaults() {
  const { register, handleSubmit, reset } = useForm();
  
  useEffect(() => {
    // Fetch user data
    fetchUser().then(user => {
      reset({
        username: user.username,
        email: user.email,
        age: user.age
      });
    });
  }, [reset]);
  
  return <form>{/* fields * /}</form>;
}

Validation Modes:
-----------------

const { register } = useForm({
  mode: 'onSubmit', // Default: validate on submit
  // mode: 'onBlur',    // Validate on blur
  // mode: 'onChange',  // Validate on every change
  // mode: 'onTouched', // Validate on first blur, then on change
  // mode: 'all'        // Validate on blur and change
});

Watch Values:
-------------

function WatchExample() {
  const { register, watch } = useForm();
  
  // Watch single field
  const username = watch('username');
  
  // Watch multiple fields
  const [email, password] = watch(['email', 'password']);
  
  // Watch all fields
  const allValues = watch();
  
  // Watch with callback
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log(`${name} changed to ${value[name]} via ${type}`);
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  
  return (
    <div>
      <input {...register('username')} />
      <p>Username: {username}</p>
    </div>
  );
}

Form State:
-----------

function FormStateExample() {
  const { register, handleSubmit, formState } = useForm();
  
  const {
    errors,        // Validation errors
    isDirty,       // Form has been modified
    isValid,       // Form is valid
    isSubmitting,  // Form is being submitted
    isSubmitted,   // Form has been submitted
    isSubmitSuccessful, // Submit was successful
    submitCount,   // Number of times submitted
    touchedFields, // Fields that have been touched
    dirtyFields    // Fields that have been modified
  } = formState;
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      
      <p>Dirty: {isDirty ? 'Yes' : 'No'}</p>
      <p>Valid: {isValid ? 'Yes' : 'No'}</p>
      
      <button type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

Set/Get Values Programmatically:
---------------------------------

function ManualControl() {
  const { register, getValues, setValue, reset } = useForm();
  
  const fillForm = () => {
    setValue('username', 'john_doe');
    setValue('email', 'john@example.com');
  };
  
  const logValues = () => {
    console.log('All values:', getValues());
    console.log('Username:', getValues('username'));
  };
  
  const resetForm = () => {
    reset(); // Reset to default values
  };
  
  const resetWithValues = () => {
    reset({ username: 'new_user', email: '' });
  };
  
  return (
    <form>
      <input {...register('username')} />
      <input {...register('email')} />
      
      <button type="button" onClick={fillForm}>Fill Form</button>
      <button type="button" onClick={logValues}>Log Values</button>
      <button type="button" onClick={resetForm}>Reset</button>
    </form>
  );
}

Error Handling:
---------------

function ErrorHandling() {
  const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm();
  
  const onSubmit = async (data) => {
    try {
      await submitToAPI(data);
    } catch (error) {
      // Set server errors
      if (error.field === 'email') {
        setError('email', {
          type: 'server',
          message: 'Email already exists'
        });
      }
      
      // Set form-level error
      setError('root.serverError', {
        type: 'server',
        message: 'Something went wrong'
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      
      {errors.root?.serverError && (
        <div className="error">{errors.root.serverError.message}</div>
      )}
      
      <button type="submit">Submit</button>
      <button type="button" onClick={() => clearErrors()}>
        Clear Errors
      </button>
    </form>
  );
}

Field Arrays (Dynamic Fields):
-------------------------------

import { useForm, useFieldArray } from 'react-hook-form';

function DynamicFields() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      users: [{ name: '', email: '' }]
    }
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'users'
  });
  
  const onSubmit = (data) => {
    console.log('Users:', data.users);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input
            {...register(`users.${index}.name`, { required: true })}
            placeholder="Name"
          />
          <input
            {...register(`users.${index}.email`, { required: true })}
            placeholder="Email"
          />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      
      <button
        type="button"
        onClick={() => append({ name: '', email: '' })}
      >
        Add User
      </button>
      
      <button type="submit">Submit</button>
    </form>
  );
}

Integration with Yup:
---------------------

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const schema = Yup.object({
  username: Yup.string().required().min(3),
  email: Yup.string().required().email(),
  age: Yup.number().required().min(18)
});

function FormWithYup() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('username')} />
      {errors.username && <span>{errors.username.message}</span>}
      
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input {...register('age')} type="number" />
      {errors.age && <span>{errors.age.message}</span>}
      
      <button type="submit">Submit</button>
    </form>
  );
}

Controller (for Custom Components):
------------------------------------

import { useForm, Controller } from 'react-hook-form';

function CustomComponentForm() {
  const { control, handleSubmit } = useForm();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* For custom components that don't expose ref * /}
      <Controller
        name="customSelect"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <CustomSelect
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        )}
      />
      
      {/* React Select integration * /}
      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <ReactSelect
            {...field}
            options={countryOptions}
          />
        )}
      />
      
      <button type="submit">Submit</button>
    </form>
  );
}

Performance Comparison:
-----------------------

// React Hook Form: ~9KB
// Formik: ~13KB + dependencies
// Final Form: ~6KB + ~8KB for React bindings

// Re-renders:
// Type 'Hello' in input (5 characters):
// - Formik: 5 re-renders
// - React Hook Form: 0 re-renders

// Validation:
// - Formik: Validates on every keystroke (default)
// - React Hook Form: Validates on blur/submit (default)

Summary:

React Hook Form:
- Uncontrolled components (uses refs)
- Minimal re-renders (highly performant)
- Small bundle size (~9KB)
- Built-in validation rules
- Works with Yup, Zod, etc.
- Field arrays for dynamic fields
- Controller for custom components
- TypeScript support
- Easy integration with UI libraries
- Better performance than Formik for large forms
- Default validation on blur/submit (less aggressive)
- Recommended for performance-critical forms
*/

