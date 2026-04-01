# JavaScript Top 50 Code-Based, Output-Based & Tricky Interview Questions

## Table of Contents
1. [Closures & Scope (Q1-10)](#section-1-closures--scope)
2. [Hoisting & Temporal Dead Zone (Q11-15)](#section-2-hoisting--temporal-dead-zone)
3. [Type Coercion & Equality (Q16-25)](#section-3-type-coercion--equality)
4. [This Binding & Prototypes (Q26-35)](#section-4-this-binding--prototypes)
5. [Promises & Async (Q36-45)](#section-5-promises--async)
6. [Edge Cases & Tricky Behavior (Q46-50)](#section-6-edge-cases--tricky-behavior)

---

## SECTION 1: CLOSURES & SCOPE (Q1-10)

## Q1: What will this output?

```javascript
function counter() {
  let count = 0;
  
  return function() {
    count++;
    return count;
  };
}

const increment = counter();
console.log(increment()); // ?
console.log(increment()); // ?
console.log(increment()); // ?
```

**What logs?**

A) 1, 1, 1  
B) 1, 2, 3  
C) 0, 1, 2  
D) Error  

**Answer: B) 1, 2, 3**

**Explanation:**
- `counter()` returns a function that has access to `count` (closure)
- Each call to `increment()` increments and returns the count
- count persists between calls (closure captures it)
- Output: 1, 2, 3

---

## Q2: What will this output?

```javascript
const funcs = [];

for (var i = 0; i < 3; i++) {
  funcs.push(() => i);
}

console.log(funcs[0]()); // ?
console.log(funcs[1]()); // ?
console.log(funcs[2]()); // ?
```

**What logs?**

A) 0, 1, 2  
B) 3, 3, 3  
C) undefined, undefined, undefined  
D) Error  

**Answer: B) 3, 3, 3**

**Explanation:**
- `var i` is function-scoped (not block-scoped)
- Loop completes: i = 3
- All functions reference the same `i` variable
- When functions execute, i = 3
- Output: 3, 3, 3

**Fix with let:**
```javascript
for (let i = 0; i < 3; i++) {
  funcs.push(() => i); // Each loop has its own i
}
// Output: 0, 1, 2
```

---

## Q3: What will this output?

```javascript
const funcs = [];

for (let i = 0; i < 3; i++) {
  funcs.push(() => i);
}

console.log(funcs[0]()); // ?
console.log(funcs[1]()); // ?
console.log(funcs[2]()); // ?
```

**What logs?**

A) 0, 1, 2  
B) 3, 3, 3  
C) undefined, undefined, undefined  
D) Error  

**Answer: A) 0, 1, 2**

**Explanation:**
- `let i` is block-scoped
- Each iteration creates a new block scope with its own i
- First iteration: i = 0, captured
- Second iteration: i = 1, captured
- Third iteration: i = 2, captured
- Output: 0, 1, 2

---

## Q4: What will this output?

```javascript
function outer() {
  let x = 10;
  
  function inner() {
    let x = 20;
    
    function deepInner() {
      return x;
    }
    
    return deepInner();
  }
  
  return inner();
}

console.log(outer()); // ?
```

**What logs?**

A) 10  
B) 20  
C) undefined  
D) Error  

**Answer: B) 20**

**Explanation:**
- `deepInner` looks for x in its scope
- Not in `deepInner` scope
- Finds x = 20 in `inner` scope
- Returns 20
- Scope chain: deepInner → inner → outer

---

## Q5: What will this output?

```javascript
let x = 10;

function test() {
  console.log(x); // ?
  let x = 20;
  console.log(x); // ?
}

test();
```

**What logs?**

A) 10, 20  
B) undefined, 20  
C) ReferenceError  
D) 10, 10  

**Answer: C) ReferenceError**

**Explanation:**
- Even though x is declared with let later, it's in Temporal Dead Zone
- Can't access let variable before declaration in same scope
- Throws: "Cannot access 'x' before initialization"

---

## Q6: What will this output?

```javascript
const obj = {
  x: 10,
  getX: function() {
    return function() {
      return this.x;
    };
  }
};

console.log(obj.getX()()); // ?
```

**What logs?**

A) 10  
B) undefined  
C) Error  
D) { x: 10 }  

**Answer: B) undefined**

**Explanation:**
- `obj.getX()` returns a function
- Calling that function with `()` is a regular function call
- `this` is not bound, defaults to window/global
- `this.x` is undefined (no x on global object)

---

## Q7: What will this output?

```javascript
const obj = {
  x: 10,
  getX: () => {
    return this.x;
  }
};

console.log(obj.getX()); // ?
```

**What logs?**

A) 10  
B) undefined  
C) Error  
D) { x: 10 }  

**Answer: B) undefined**

**Explanation:**
- Arrow function doesn't have its own `this`
- Inherits `this` from outer scope (global/module scope)
- `this.x` is undefined

---

## Q8: What will this output?

```javascript
function makeCounter() {
  let count = 0;
  
  return {
    increment() { return ++count; },
    decrement() { return --count; },
    getCount() { return count; }
  };
}

const counter = makeCounter();
console.log(counter.increment()); // ?
console.log(counter.increment()); // ?
console.log(counter.decrement()); // ?
console.log(counter.getCount()); // ?
```

**What logs?**

A) 1, 2, 1, 1  
B) 1, 2, 1, 2  
C) 0, 1, 2, 1  
D) Error  

**Answer: A) 1, 2, 1, 1**

**Explanation:**
- All methods share same closure (count)
- increment: ++count → 1
- increment: ++count → 2
- decrement: --count → 1
- getCount: return 1

---

## Q9: What will this output?

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 100);
}
```

**What logs?**

A) 0, 1, 2  
B) 3, 3, 3  
C) 0, 0, 0  
D) Error  

**Answer: B) 3, 3, 3**

**Explanation:**
- Loop completes immediately: i = 3
- After 100ms, callbacks execute
- All callbacks reference i = 3
- Output: 3, 3, 3

**Fix with let:**
```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2
```

---

## Q10: What will this output?

```javascript
const x = {
  a: function() {
    console.log(this);
  },
  b() {
    console.log(this);
  }
};

x.a();
x.b();

const a = x.a;
const b = x.b;

a();
b();
```

**What logs?**

A) x, x, x, x  
B) x, x, window, window  
C) x, x, undefined, undefined  
D) window, window, window, window  

**Answer: B) x, x, window, window**

**Explanation:**
- `x.a()` → this = x
- `x.b()` → this = x
- `a()` → regular call, this = window
- `b()` → regular call, this = window

---

## SECTION 2: HOISTING & TEMPORAL DEAD ZONE (Q11-15)

## Q11: What will this output?

```javascript
console.log(typeof x); // ?
var x = 5;
```

**What logs?**

A) 5  
B) "undefined"  
C) Error  
D) "number"  

**Answer: B) "undefined"**

**Explanation:**
- `var x` is hoisted as `var x;` (declaration only)
- Before assignment, x = undefined
- typeof undefined = "undefined" (string)

---

## Q12: What will this output?

```javascript
console.log(typeof y); // ?
let y = 5;
```

**What logs?**

A) 5  
B) "undefined"  
C) Error  
D) "number"  

**Answer: C) Error (ReferenceError)**

**Explanation:**
- `let y` is hoisted but in Temporal Dead Zone
- Can't access before declaration
- Throws: "Cannot access 'y' before initialization"

---

## Q13: What will this output?

```javascript
console.log(x);  // ?
x = 5;
console.log(x); // ?

var x;
```

**What logs?**

A) Error, 5  
B) undefined, 5  
C) 5, 5  
D) ReferenceError  

**Answer: B) undefined, 5**

**Explanation:**
- `var x;` declaration hoisted to top
- x = undefined initially
- `x = 5` assignment stays where it is
- First log: undefined
- Second log: 5

---

## Q14: What will this output?

```javascript
console.log(test()); // ?

function test() {
  return 'hello';
}
```

**What logs?**

A) Error  
B) undefined  
C) "hello"  
D) [Function: test]  

**Answer: C) "hello"**

**Explanation:**
- Function declarations are fully hoisted (declaration + initialization)
- Can call before defining
- Returns "hello"

---

## Q15: What will this output?

```javascript
console.log(test()); // ?

var test = function() {
  return 'hello';
};
```

**What logs?**

A) Error  
B) "hello"  
C) TypeError  
D) undefined  

**Answer: C) TypeError**

**Explanation:**
- `var test;` is hoisted (undefined)
- Assignment stays in place
- Trying to call undefined as function: TypeError

---

## SECTION 3: TYPE COERCION & EQUALITY (Q16-25)

## Q16: What will this output?

```javascript
console.log(1 + '1');     // ?
console.log('1' + 1);     // ?
console.log(1 - '1');     // ?
console.log('1' - 1);     // ?
```

**What logs?**

A) "11", "11", "0", "0"  
B) "11", "11", 0, 0  
C) Error  
D) 2, 2, 0, 0  

**Answer: B) "11", "11", 0, 0**

**Explanation:**
- `1 + '1'` → string concatenation → "11"
- `'1' + 1` → string concatenation → "11"
- `1 - '1'` → numeric subtraction, "1" coerced to number → 0
- `'1' - 1` → numeric subtraction → 0

---

## Q17: What will this output?

```javascript
console.log([] == false);   // ?
console.log([] === false);  // ?
console.log([1] == true);   // ?
console.log([1] === true);  // ?
```

**What logs?**

A) true, true, true, true  
B) true, false, true, false  
C) false, false, false, false  
D) Error  

**Answer: B) true, false, true, false**

**Explanation:**
- `[] == false` → [] coerced to "" → "" == false → true
- `[] === false` → different types → false
- `[1] == true` → [1] coerced to "1" → "1" == true → 1 == 1 → true
- `[1] === true` → different types → false

---

## Q18: What will this output?

```javascript
console.log(NaN == NaN);    // ?
console.log(NaN === NaN);   // ?
console.log(Object.is(NaN, NaN)); // ?
```

**What logs?**

A) true, true, true  
B) false, false, true  
C) true, false, true  
D) Error  

**Answer: B) false, false, true**

**Explanation:**
- NaN is never equal to anything, including itself
- `NaN == NaN` → false
- `NaN === NaN` → false
- `Object.is()` treats NaN as equal to itself → true

---

## Q19: What will this output?

```javascript
console.log('' == false);   // ?
console.log('' === false);  // ?
console.log(0 == false);    // ?
console.log(0 === false);   // ?
console.log(null == undefined); // ?
console.log(null === undefined); // ?
```

**What logs?**

A) true, true, true, true, true, true  
B) true, false, true, false, true, false  
C) false, false, false, false, true, true  
D) Error  

**Answer: B) true, false, true, false, true, false**

**Explanation:**
- `'' == false` → "" coerced to 0, false to 0 → 0 == 0 → true
- `'' === false` → different types → false
- `0 == false` → 0 == 0 → true
- `0 === false` → different types → false
- `null == undefined` → special rule → true
- `null === undefined` → different types → false

---

## Q20: What will this output?

```javascript
console.log(typeof null);      // ?
console.log(typeof undefined); // ?
console.log(null instanceof Object); // ?
```

**What logs?**

A) "null", "undefined", true  
B) "object", "undefined", false  
C) "object", "undefined", true  
D) "null", "null", true  

**Answer: B) "object", "undefined", false**

**Explanation:**
- `typeof null` → "object" (famous JS bug)
- `typeof undefined` → "undefined"
- `null instanceof Object` → false (null is not an instance of Object)

---

## Q21: What will this output?

```javascript
console.log('5' + 3);     // ?
console.log('5' - 3);     // ?
console.log('5' * '2');   // ?
console.log('10' / '2');  // ?
```

**What logs?**

A) "8", "2", "10", "5"  
B) "53", 2, 10, 5  
C) Error  
D) 8, 2, "10", "5"  

**Answer: B) "53", 2, 10, 5**

**Explanation:**
- `'5' + 3` → string concatenation → "53"
- `'5' - 3` → numeric operation, "5" coerced → 2
- `'5' * '2'` → numeric operation → 10
- `'10' / '2'` → numeric operation → 5

---

## Q22: What will this output?

```javascript
console.log(true + true);    // ?
console.log(true + false);   // ?
console.log(true * 2);       // ?
console.log(false + false);  // ?
```

**What logs?**

A) "true", "true", "true", "false"  
B) Error  
C) 2, 1, 2, 0  
D) true, false, 2, false  

**Answer: C) 2, 1, 2, 0**

**Explanation:**
- Booleans coerced to numbers in arithmetic
- true = 1, false = 0
- `true + true` → 1 + 1 → 2
- `true + false` → 1 + 0 → 1
- `true * 2` → 1 * 2 → 2
- `false + false` → 0 + 0 → 0

---

## Q23: What will this output?

```javascript
const a = new Boolean(false);
console.log(a == false);  // ?
console.log(a === false); // ?
console.log(a);           // ?
console.log(!!a);         // ?
```

**What logs?**

A) true, true, false, true  
B) true, false, [Boolean: false], true  
C) false, false, false, false  
D) Error  

**Answer: B) true, false, [Boolean: false], true**

**Explanation:**
- `new Boolean(false)` creates object (not primitive)
- `a == false` → object coerced → false == false → true
- `a === false` → different types → false
- `a` → [Boolean: false]
- `!!a` → !!{} → true (all objects are truthy)

---

## Q24: What will this output?

```javascript
console.log(1 == '1');  // ?
console.log(1 === '1'); // ?
console.log('0' == false);  // ?
console.log('0' === false); // ?
```

**What logs?**

A) true, true, true, true  
B) true, false, true, false  
C) false, false, false, false  
D) Error  

**Answer: B) true, false, true, false**

**Explanation:**
- `1 == '1'` → "1" coerced to 1 → 1 == 1 → true
- `1 === '1'` → different types → false
- `'0' == false` → '0' coerced to 0, false to 0 → 0 == 0 → true
- `'0' === false` → different types → false

---

## Q25: What will this output?

```javascript
console.log([] + []);      // ?
console.log([] + {});      // ?
console.log({} + []);      // ?
console.log({} + {});      // ?
```

**What logs?**

A) Error  
B) "", "[object Object]", "[object Object]", "[object Object]"  
C) "", "[object Object]0", "[object Object]", NaN  
D) "", "[object Object]", "[object Object]", "[object Object]"  

**Answer: B) "", "[object Object]", "[object Object]", "[object Object]"**

**Explanation:**
- `[] + []` → "" + "" → ""
- `[] + {}` → "" + "[object Object]" → "[object Object]"
- `{} + []` → "[object Object]" + "" → "[object Object]"
- `{} + {}` → "[object Object]" + "[object Object]" → "[object Object][object Object]"

Wait, last one should be "[object Object][object Object]". Let me reconsider...

Actually: `{} + {}` → NaN (the first {} is treated as code block, second {} + second {} is confusing)

Better answer: **D) "", "[object Object]", "[object Object]", "[object Object][object Object]"**

---

## SECTION 4: THIS BINDING & PROTOTYPES (Q26-35)

## Q26: What will this output?

```javascript
const obj = {
  name: 'Alice',
  sayName() {
    console.log(this.name);
  }
};

obj.sayName();
const sayName = obj.sayName;
sayName();
```

**What logs?**

A) "Alice", "Alice"  
B) "Alice", undefined  
C) "Alice", Error  
D) undefined, undefined  

**Answer: B) "Alice", undefined**

**Explanation:**
- `obj.sayName()` → this = obj → "Alice"
- `sayName()` → this = window → undefined

---

## Q27: What will this output?

```javascript
const obj = {
  name: 'Alice',
  sayName: () => {
    console.log(this.name);
  }
};

obj.sayName();
```

**What logs?**

A) "Alice"  
B) undefined  
C) Error  
D) obj object  

**Answer: B) undefined**

**Explanation:**
- Arrow function doesn't have own this
- Inherits from outer (global) scope
- this.name is undefined

---

## Q28: What will this output?

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.getName = function() {
  return this.name;
};

const p1 = new Person('Alice');
console.log(p1.getName()); // ?

const getName = p1.getName;
console.log(getName()); // ?
```

**What logs?**

A) "Alice", "Alice"  
B) "Alice", undefined  
C) "Alice", Error  
D) undefined, undefined  

**Answer: B) "Alice", undefined**

**Explanation:**
- `p1.getName()` → this = p1 → "Alice"
- `getName()` → this = window → undefined

---

## Q29: What will this output?

```javascript
const obj = {
  x: 10,
  getX: function() {
    const inner = function() {
      return this.x;
    };
    return inner();
  }
};

console.log(obj.getX()); // ?
```

**What logs?**

A) 10  
B) undefined  
C) Error  
D) { x: 10 }  

**Answer: B) undefined**

**Explanation:**
- `obj.getX()` → this = obj
- `inner()` is regular function call → this = window
- return this.x → window.x → undefined

---

## Q30: What will this output?

```javascript
const obj = {
  x: 10,
  getX: function() {
    const inner = () => this.x;
    return inner();
  }
};

console.log(obj.getX()); // ?
```

**What logs?**

A) 10  
B) undefined  
C) Error  
D) obj object  

**Answer: A) 10**

**Explanation:**
- `obj.getX()` → this = obj
- Arrow function inherits this from outer (getX) → this = obj
- return this.x → 10

---

## Q31: What will this output?

```javascript
const obj = {
  name: 'Alice',
  getName: function() {
    console.log(this.name);
  }
};

const boundGetName = obj.getName.bind({ name: 'Bob' });
boundGetName();
obj.getName.call({ name: 'Charlie' });
obj.getName.apply({ name: 'Diana' });
```

**What logs?**

A) "Alice", "Alice", "Alice"  
B) "Bob", "Charlie", "Diana"  
C) "Bob", "Bob", "Bob"  
D) Error  

**Answer: B) "Bob", "Charlie", "Diana"**

**Explanation:**
- `bind()` creates new function with fixed this
- `call()` invokes with specified this
- `apply()` invokes with specified this

---

## Q32: What will this output?

```javascript
function Parent() {
  this.x = 10;
}

Parent.prototype.getX = function() {
  return this.x;
};

function Child() {
  Parent.call(this);
  this.y = 20;
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

const c = new Child();
console.log(c.getX()); // ?
```

**What logs?**

A) undefined  
B) 10  
C) Error  
D) 20  

**Answer: B) 10**

**Explanation:**
- Child inherits from Parent (prototype chain)
- `new Child()` calls Parent.call(this) → this.x = 10
- `c.getX()` found on Parent.prototype → returns 10

---

## Q33: What will this output?

```javascript
const obj = {};

Object.defineProperty(obj, 'x', {
  get() {
    return 10;
  }
});

console.log(obj.x);    // ?
console.log(obj.hasOwnProperty('x')); // ?
```

**What logs?**

A) 10, true  
B) 10, false  
C) undefined, false  
D) Error  

**Answer: A) 10, true**

**Explanation:**
- Getter defined on obj
- `obj.x` calls getter → 10
- `hasOwnProperty('x')` → true (x is own property)

---

## Q34: What will this output?

```javascript
const obj = Object.create(null);
console.log(obj.toString);     // ?
console.log(obj.hasOwnProperty); // ?
```

**What logs?**

A) [Function], [Function]  
B) undefined, undefined  
C) null, null  
D) Error  

**Answer: B) undefined, undefined**

**Explanation:**
- `Object.create(null)` creates object with no prototype
- No toString or hasOwnProperty
- Both undefined

---

## Q35: What will this output?

```javascript
function test() {}

console.log(test.prototype === Object.getPrototypeOf(test)); // ?
console.log(test.prototype.constructor === test); // ?
console.log(typeof test.prototype); // ?
```

**What logs?**

A) true, true, "object"  
B) true, false, "function"  
C) false, true, "object"  
D) false, false, "object"  

**Answer: C) false, true, "object"**

**Explanation:**
- `test.prototype` !== `Object.getPrototypeOf(test)`
- `test.prototype.constructor === test` → true
- `typeof test.prototype` → "object"

---

## SECTION 5: PROMISES & ASYNC (Q36-45)

## Q36: What will this output?

```javascript
console.log('Start');

Promise.resolve()
  .then(() => console.log('Promise 1'))
  .then(() => console.log('Promise 2'));

console.log('End');
```

**What logs?**

A) Start, End, Promise 1, Promise 2  
B) Start, Promise 1, Promise 2, End  
C) Start, Promise 1, End, Promise 2  
D) Error  

**Answer: A) Start, End, Promise 1, Promise 2**

**Explanation:**
- Synchronous code runs first
- Promise callbacks are microtasks
- Event loop: sync → microtasks → macrotasks

---

## Q37: What will this output?

```javascript
setTimeout(() => console.log('Timeout'), 0);
Promise.resolve().then(() => console.log('Promise'));
console.log('Sync');
```

**What logs?**

A) Timeout, Promise, Sync  
B) Sync, Timeout, Promise  
C) Sync, Promise, Timeout  
D) Error  

**Answer: C) Sync, Promise, Timeout**

**Explanation:**
- Sync runs first → "Sync"
- Microtasks (Promise) run before macrotasks → "Promise"
- Macrotasks (setTimeout) run last → "Timeout"

---

## Q38: What will this output?

```javascript
const p1 = Promise.resolve(1);
const p2 = p1.then(() => {
  throw new Error('Error!');
});

p2.catch(err => console.log('Caught:', err.message));
console.log('Done');
```

**What logs?**

A) Done, Caught: Error!  
B) Caught: Error!, Done  
C) Error thrown  
D) Done only  

**Answer: A) Done, Caught: Error!**

**Explanation:**
- Sync code (Done) runs first
- Promise rejection caught later
- Output: Done, then Caught: Error!

---

## Q39: What will this output?

```javascript
async function test() {
  console.log('1');
  await Promise.resolve();
  console.log('2');
}

console.log('Start');
test();
console.log('End');
```

**What logs?**

A) Start, 1, 2, End  
B) Start, 1, End, 2  
C) Start, End, 1, 2  
D) Error  

**Answer: B) Start, 1, End, 2**

**Explanation:**
- Start (sync)
- test() called: logs 1 (sync)
- await pauses (microtask)
- End (sync)
- Microtask executes: logs 2

---

## Q40: What will this output?

```javascript
async function test() {
  return 42;
}

test().then(result => console.log(result));
console.log('Done');
```

**What logs?**

A) 42, Done  
B) Done, 42  
C) Error  
D) 42 only  

**Answer: B) Done, 42**

**Explanation:**
- Sync code (Done) runs first
- Promise.then() (42) runs after

---

## Q41: What will this output?

```javascript
Promise.reject('Error')
  .then(() => console.log('Then'))
  .catch(() => console.log('Catch'));
```

**What logs?**

A) Then  
B) Catch  
C) Then, Catch  
D) Error (unhandled)  

**Answer: B) Catch**

**Explanation:**
- Promise rejected
- .then() skipped
- .catch() handles rejection

---

## Q42: What will this output?

```javascript
Promise.resolve()
  .then(() => {
    throw new Error('Error 1');
  })
  .catch(() => {
    throw new Error('Error 2');
  })
  .catch(() => console.log('Final catch'));
```

**What logs?**

A) Final catch  
B) Error (unhandled)  
C) Nothing  
D) Final catch, Error 1  

**Answer: A) Final catch**

**Explanation:**
- First .catch() throws Error 2
- Second .catch() handles Error 2
- Logs: "Final catch"

---

## Q43: What will this output?

```javascript
async function test() {
  try {
    await Promise.reject('Error');
  } catch (e) {
    console.log('Caught:', e);
  }
}

test();
console.log('Done');
```

**What logs?**

A) Done, Caught: Error  
B) Caught: Error, Done  
C) Error (unhandled)  
D) Done only  

**Answer: A) Done, Caught: Error**

**Explanation:**
- Done (sync)
- test() runs: await causes pause
- Microtask: Caught: Error

---

## Q44: What will this output?

```javascript
Promise.all([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.reject(3)
]).then(result => console.log(result))
  .catch(err => console.log('Error:', err));
```

**What logs?**

A) [1, 2, 3]  
B) Error: 3  
C) [1, 2]  
D) Nothing  

**Answer: B) Error: 3**

**Explanation:**
- One promise rejected
- Promise.all rejects if any promise rejects
- Caught by .catch()

---

## Q45: What will this output?

```javascript
Promise.race([
  Promise.resolve(1),
  Promise.resolve(2)
]).then(result => console.log(result));
```

**What logs?**

A) 1  
B) 2  
C) [1, 2]  
D) Error  

**Answer: A) 1**

**Explanation:**
- Promise.race resolves with first settled promise
- First one (resolve 1) wins
- Output: 1

---

## SECTION 6: EDGE CASES & TRICKY BEHAVIOR (Q46-50)

## Q46: What will this output?

```javascript
const a = [1, 2, 3];
const b = a;
b.push(4);

console.log(a); // ?
console.log(a === b); // ?
```

**What logs?**

A) [1, 2, 3], false  
B) [1, 2, 3, 4], true  
C) [1, 2, 3], true  
D) Error  

**Answer: B) [1, 2, 3, 4], true**

**Explanation:**
- b = a → same reference
- Push modifies both (same object)
- a === b → same reference → true

---

## Q47: What will this output?

```javascript
const obj = { a: { b: 1 } };
const copy = { ...obj };

copy.a.b = 2;

console.log(obj.a.b);  // ?
console.log(obj === copy); // ?
console.log(obj.a === copy.a); // ?
```

**What logs?**

A) 1, true, true  
B) 2, false, true  
C) 1, false, false  
D) Error  

**Answer: B) 2, false, true**

**Explanation:**
- Spread operator shallow copies
- obj.a and copy.a reference same object
- Changing copy.a.b affects obj.a.b
- obj !== copy (different objects)
- obj.a === copy.a (same nested object)

---

## Q48: What will this output?

```javascript
function test(a = 10) {
  console.log(a);
}

test(undefined);
test();
test(null);
test(0);
```

**What logs?**

A) 10, 10, 10, 10  
B) undefined, 10, null, 0  
C) 10, 10, null, 0  
D) Error  

**Answer: C) 10, 10, null, 0**

**Explanation:**
- Default parameters trigger only on undefined
- test(undefined) → 10 (missing)
- test() → 10 (missing)
- test(null) → null (not missing)
- test(0) → 0 (not missing)

---

## Q49: What will this output?

```javascript
const x = 10;

function test() {
  console.log(x); // ?
  var x = 20;
  console.log(x); // ?
}

test();
```

**What logs?**

A) 10, 20  
B) undefined, 20  
C) ReferenceError  
D) 20, 20  

**Answer: B) undefined, 20**

**Explanation:**
- var x declaration hoisted
- x is undefined initially (Temporal Dead Zone for var)
- First log: undefined
- x = 20 assignment
- Second log: 20

---

## Q50: What will this output?

```javascript
const funcs = [
  function() { return 1; },
  function() { return 2; },
  function() { return 3; }
];

const results = [];
for (var i = 0; i < funcs.length; i++) {
  results.push(funcs[i]());
}

console.log(results); // ?
```

**What logs?**

A) [1, 2, 3]  
B) [3, 3, 3]  
C) Error  
D) [undefined, undefined, undefined]  

**Answer: A) [1, 2, 3**

**Explanation:**
- Functions are called immediately in loop
- Each function returns its own value
- No closure issue (functions called immediately)
- Output: [1, 2, 3]

---

## Summary Table

| Q# | Topic | Key Concept |
|----|-------|-------------|
| 1-10 | Closures & Scope | Variable capturing, var vs let |
| 11-15 | Hoisting & TDZ | Declaration hoisting, temporal dead zone |
| 16-25 | Type Coercion & Equality | ==, ===, type conversion |
| 26-35 | This & Prototypes | this binding, prototype chain |
| 36-45 | Promises & Async | Event loop, microtasks, async/await |
| 46-50 | Edge Cases | Reference vs copy, defaults, hoisting |

---

## Most Important Takeaways

1. **var is function-scoped, let/const are block-scoped**
2. **Closures capture variables by reference**
3. **this is determined by how function is called (not where)**
4. **Type coercion can cause unexpected results with ==**
5. **Event loop: sync → microtasks (Promises) → macrotasks (setTimeout)**
6. **Hoisting happens at compile time, not runtime**
7. **Spread operator does shallow copy**
8. **Default parameters only trigger on undefined**
9. **Arrow functions don't have their own this**
10. **Prototype chain enables inheritance**

---

## Practice Tips

- Try to predict output **before** reading the answer
- Test these in browser console or Node.js
- Understand **why**, not just what happens
- Pay attention to **reference vs value**
- Remember **event loop** execution order
- Use **debugger** to trace execution
- Study **hoisting** rules carefully

Good luck with your JavaScript interviews! 🚀
