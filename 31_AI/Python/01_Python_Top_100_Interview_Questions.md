# Python Top 100 Interview Questions (Basic to Advanced)

## Table of Contents
1. [Basics (Q1-15)](#section-1-basics)
2. [Data Structures (Q16-35)](#section-2-data-structures)
3. [Functions & OOP (Q36-55)](#section-3-functions--oop)
4. [Advanced Python (Q56-75)](#section-4-advanced-python)
5. [Libraries & Modules (Q76-85)](#section-5-libraries--modules)
6. [Coding & Problem Solving (Q86-100)](#section-6-coding--problem-solving)

---

## SECTION 1: BASICS (Q1-15)

### Q1: What is Python and why is it popular?

**Answer:**

Python is a **high-level, interpreted, dynamically-typed programming language** created by Guido van Rossum in 1991.

### Why Popular:

✅ **Easy to learn** - Simple syntax, readable code  
✅ **Versatile** - Web, Data Science, AI/ML, Automation, Scripts  
✅ **Large community** - Tons of libraries and support  
✅ **Cross-platform** - Works on Windows, Mac, Linux  
✅ **Great libraries** - NumPy, Pandas, Django, Flask, etc.  

---

### Q2: What are the different data types in Python?

**Answer:**

```python
# Numbers
int_num = 42            # Integer
float_num = 3.14        # Float
complex_num = 3 + 4j    # Complex

# String
text = "Hello"

# Boolean
is_true = True
is_false = False

# Collections
my_list = [1, 2, 3]
my_tuple = (1, 2, 3)
my_dict = {'key': 'value'}
my_set = {1, 2, 3}

# None
nothing = None

# Check type
print(type(int_num))  # <class 'int'>
```

---

### Q3: What is the difference between list and tuple?

**Answer:**

| Feature | List | Tuple |
|---------|------|-------|
| **Mutability** | Mutable (can change) | Immutable (cannot change) |
| **Syntax** | [1, 2, 3] | (1, 2, 3) |
| **Performance** | Slower | Faster |
| **Use** | Data that changes | Data that doesn't change |
| **Hashable** | NO | YES (can be dict key) |

```python
# List - Mutable
my_list = [1, 2, 3]
my_list[0] = 99      # ✅ Can change
my_list.append(4)    # ✅ Can add

# Tuple - Immutable
my_tuple = (1, 2, 3)
# my_tuple[0] = 99   # ❌ Error!
# my_tuple.append(4) # ❌ Error!

# Tuple as dictionary key
my_dict = {(1, 2): "value"}  # ✅ Works
# my_dict = {[1, 2]: "value"} # ❌ Error (list not hashable)
```

---

### Q4: What is the difference between '==' and 'is'?

**Answer:**

| Operator | Meaning | Checks |
|----------|---------|--------|
| **==** | Equality | Same value? |
| **is** | Identity | Same object in memory? |

```python
# Example 1
a = [1, 2, 3]
b = [1, 2, 3]

print(a == b)   # True (same value)
print(a is b)   # False (different objects in memory)

# Example 2
a = 256
b = 256
print(a == b)   # True
print(a is b)   # True (Python caches small integers)

# Example 3
a = 257
b = 257
print(a == b)   # True
print(a is b)   # False (outside cached range)

# Example 4
a = None
b = None
print(a is b)   # True (only one None object exists)

# Example 5
a = "hello"
b = "hello"
print(a is b)   # True (string interning)
```

---

### Q5: What are mutable and immutable data types?

**Answer:**

**Immutable** = Cannot be changed after creation  
**Mutable** = Can be changed after creation

```python
# IMMUTABLE (cannot change)
int_val = 5           # immutable
str_val = "hello"     # immutable
tuple_val = (1, 2, 3) # immutable
frozenset_val = frozenset([1, 2, 3]) # immutable

# What actually happens:
a = 5
a = a + 1  # Creates NEW object, doesn't change old one
print(id(a))  # Different memory address

# MUTABLE (can change)
list_val = [1, 2, 3]      # mutable
dict_val = {'key': 'val'} # mutable
set_val = {1, 2, 3}       # mutable

# What actually happens:
b = [1, 2, 3]
b.append(4)       # Modifies SAME object
print(b)          # [1, 2, 3, 4]
print(id(b))      # Same memory address
```

---

### Q6: What is type casting?

**Answer:**

Converting one data type to another.

```python
# String to Integer
num_str = "42"
num = int(num_str)
print(num)  # 42

# Integer to String
num = 42
str_num = str(num)
print(str_num)  # "42"

# Float to Integer (loses decimal)
flt = 3.99
integer = int(flt)
print(integer)  # 3

# String to Float
flt_str = "3.14"
flt = float(flt_str)
print(flt)  # 3.14

# String to List
str_val = "hello"
lst = list(str_val)
print(lst)  # ['h', 'e', 'l', 'l', 'o']

# List to Tuple
lst = [1, 2, 3]
tpl = tuple(lst)
print(tpl)  # (1, 2, 3)
```

---

### Q7: What is the difference between '/' and '//' operators?

**Answer:**

| Operator | Name | Result | Example |
|----------|------|--------|---------|
| **/** | Division | Float | 7 / 2 = 3.5 |
| **//** | Floor Division | Integer | 7 // 2 = 3 |

```python
print(7 / 2)    # 3.5
print(7 // 2)   # 3 (floor, rounds down)

print(-7 / 2)   # -3.5
print(-7 // 2)  # -4 (floor, rounds down)

# ** is exponentiation
print(2 ** 3)   # 8 (2 to power 3)
```

---

### Q8: What is a variable and how do you declare it?

**Answer:**

A variable is a **named container that stores a value**.

```python
# Declare and assign
name = "Alice"
age = 25
height = 5.9

# Multiple assignment
x = y = z = 0

# Unpacking
a, b, c = 1, 2, 3

# Naming conventions
myVar = 10         # camelCase (not Pythonic)
my_var = 10        # snake_case (Pythonic) ✅
MY_VAR = 10        # UPPER_CASE (constants)
_my_var = 10       # private (by convention)
__my_var = 10      # name mangling

# Check variable exists
if 'my_var' in locals():
    print("my_var exists")
```

---

### Q9: What is operator precedence?

**Answer:**

Order in which operations are evaluated.

```python
# BODMAS / PEMDAS
# Brackets/Parentheses
# Orders/Exponents
# Division & Multiplication
# Addition & Subtraction

print(2 + 3 * 4)      # 14 (not 20) - multiplication first
print((2 + 3) * 4)    # 20 - parentheses first

print(10 - 3 + 2)     # 9 (left to right)
print(2 ** 3 ** 2)    # 512 (exponentiation right to left)

# Logical operators
# not > and > or
print(True or False and False)  # True
# Evaluates as: True or (False and False)
```

---

### Q10: What is a namespace in Python?

**Answer:**

A namespace is a **collection of names and the objects they refer to**.

```python
# Global namespace
x = 10

def func():
    # Local namespace
    y = 20
    print(x)  # Can access global
    print(y)  # Can access local
    
    def inner():
        # Enclosed namespace
        z = 30
        print(x)  # Global
        print(y)  # Enclosed
        print(z)  # Local

# Check what's in namespace
print(dir())        # All names in current namespace
print(globals())    # Global namespace dictionary
print(locals())     # Local namespace dictionary

# Variables don't exist outside their scope
def func2():
    a = 5
    
# print(a)  # ❌ Error - a doesn't exist here
```

---

### Q11: What is scope in Python?

**Answer:**

Scope determines where a variable can be accessed.

```python
# GLOBAL scope
global_var = "I'm global"

def func():
    # LOCAL scope
    local_var = "I'm local"
    print(global_var)    # ✅ Can access global
    print(local_var)     # ✅ Can access local

func()
print(global_var)        # ✅ Can access global
# print(local_var)       # ❌ Error - out of scope

# LEGB rule (order of scope lookup)
# L - Local
# E - Enclosed
# G - Global
# B - Built-in

def outer():
    x = "outer"
    
    def inner():
        x = "inner"  # This x is local to inner
        print(x)     # "inner"
    
    inner()
    print(x)         # "outer"

outer()

# Modify global variable
x = 10

def modify_global():
    global x
    x = 20

modify_global()
print(x)  # 20
```

---

### Q12: What is the difference between append, extend, and insert?

**Answer:**

```python
my_list = [1, 2, 3]

# append() - Add single item to end
my_list.append(4)
print(my_list)  # [1, 2, 3, 4]

# extend() - Add multiple items
my_list.extend([5, 6, 7])
print(my_list)  # [1, 2, 3, 4, 5, 6, 7]

# insert() - Add item at specific index
my_list.insert(2, 99)
print(my_list)  # [1, 2, 99, 3, 4, 5, 6, 7]

# Difference with append
my_list2 = [1, 2, 3]
my_list2.append([4, 5])
print(my_list2)  # [1, 2, 3, [4, 5]] - nested list

my_list3 = [1, 2, 3]
my_list3.extend([4, 5])
print(my_list3)  # [1, 2, 3, 4, 5] - individual items
```

---

### Q13: What does the pass statement do?

**Answer:**

`pass` is a **null operation** - nothing happens when executed. Used as placeholder.

```python
# Placeholder for future code
def incomplete_function():
    pass

# Placeholder in if statement
if condition:
    pass
else:
    print("something")

# Placeholder in class
class EmptyClass:
    pass

# Difference from other statements
for i in range(3):
    pass  # Loop runs but does nothing

# Empty list syntax is not valid, must use pass
# if True:
#      # ❌ Error - needs statement
# 
# if True:
#     pass  # ✅ Valid
```

---

### Q14: What are f-strings?

**Answer:**

**f-strings** are formatted string literals (Python 3.6+) that allow variable interpolation.

```python
name = "Alice"
age = 25

# f-string (modern)
print(f"Hello, {name}! You are {age} years old")
# Hello, Alice! You are 25 years old

# Format with operations
print(f"Next year you'll be {age + 1}")
# Next year you'll be 26

# Format with precision
price = 19.99
print(f"Price: ${price:.2f}")
# Price: $19.99

# Alignment
print(f"{name:>10}")  # Right align
print(f"{name:<10}")  # Left align
print(f"{name:^10}")  # Center align

# Old ways (still work)
print("Hello, " + name + "! You are " + str(age) + " years old")
print("Hello, %s! You are %d years old" % (name, age))
print("Hello, {}! You are {} years old".format(name, age))
```

---

### Q15: What is the difference between input() and raw_input()?

**Answer:**

In Python 3, `raw_input()` was renamed to `input()`.

```python
# Python 3
user_input = input("Enter your name: ")
print(type(user_input))  # <class 'str'>

# Python 2
# user_input = raw_input("Enter your name: ")  # Returns string
# eval_input = input("Enter value: ")          # Evaluates input

# Convert input to different types
num = int(input("Enter a number: "))
lst = input("Enter items (comma-separated): ").split(",")
```

---

## SECTION 2: DATA STRUCTURES (Q16-35)

### Q16: What is slicing and how does it work?

**Answer:**

Slicing extracts a portion of a sequence using `start:stop:step`.

```python
text = "Hello World"
lst = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# Basic slicing
print(text[0:5])    # "Hello" (index 0 to 4)
print(lst[2:7])     # [2, 3, 4, 5, 6]

# With step
print(lst[0:10:2])  # [0, 2, 4, 6, 8]
print(lst[::2])     # [0, 2, 4, 6, 8] (every 2nd)

# Negative indices
print(text[-5:])    # "World"
print(lst[-3:])     # [7, 8, 9]

# Reverse
print(text[::-1])   # "dlroW olleH"
print(lst[::-1])    # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

# Copy
original = [1, 2, 3]
copy = original[:]  # Creates copy
copy[0] = 99
print(original)     # [1, 2, 3] unchanged
```

---

### Q17: What is the difference between remove, pop, and del?

**Answer:**

```python
my_list = [1, 2, 3, 4, 5]

# remove() - Remove by VALUE
my_list.remove(3)
print(my_list)  # [1, 2, 4, 5]

# pop() - Remove by INDEX
removed = my_list.pop(1)  # Removes and returns element
print(removed)   # 2
print(my_list)   # [1, 4, 5]

# del - Delete by INDEX
del my_list[0]
print(my_list)   # [4, 5]

# Differences
my_list = [1, 2, 3]

# remove() - removes first occurrence, no return
my_list.remove(2)  # Returns None

# pop() - removes at index, returns value
val = my_list.pop()  # Returns last element

# del - no return value
del my_list[0]  # Just removes

# del can delete slices
my_list = [1, 2, 3, 4, 5]
del my_list[1:3]  # Deletes indices 1 and 2
print(my_list)  # [1, 4, 5]
```

---

### Q18: What are list comprehensions?

**Answer:**

Concise way to create lists.

```python
# Without comprehension
squared = []
for i in range(5):
    squared.append(i ** 2)
print(squared)  # [0, 1, 4, 9, 16]

# With comprehension
squared = [i ** 2 for i in range(5)]
print(squared)  # [0, 1, 4, 9, 16]

# With condition
evens = [i for i in range(10) if i % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8]

# Nested
matrix = [[i*j for j in range(3)] for i in range(3)]
# [[0, 0, 0], [0, 1, 2], [0, 2, 4]]

# String
chars = [c.upper() for c in "hello"]
print(chars)  # ['H', 'E', 'L', 'L', 'O']

# Dict comprehension
squares_dict = {i: i**2 for i in range(5)}
print(squares_dict)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Set comprehension
unique_squares = {i**2 for i in [1, 2, 1, 3, 2]}
print(unique_squares)  # {1, 4, 9}
```

---

### Q19: What is the difference between set and frozenset?

**Answer:**

| Feature | Set | Frozenset |
|---------|-----|-----------|
| **Mutability** | Mutable | Immutable |
| **Hashable** | NO | YES |
| **Methods** | add, remove, etc. | Limited |

```python
# Set - mutable
my_set = {1, 2, 3}
my_set.add(4)
print(my_set)  # {1, 2, 3, 4}

# Frozenset - immutable
frozen = frozenset([1, 2, 3])
# frozen.add(4)  # ❌ Error

# Frozenset can be dict key
d = {frozenset([1, 2]): "value"}
# d = {set([1, 2]): "value"}  # ❌ Error

# Set operations
set1 = {1, 2, 3}
set2 = {3, 4, 5}

print(set1 & set2)    # {3} - intersection
print(set1 | set2)    # {1, 2, 3, 4, 5} - union
print(set1 - set2)    # {1, 2} - difference
print(set1 ^ set2)    # {1, 2, 4, 5} - symmetric difference
```

---

### Q20: What is a dictionary and how do you use it?

**Answer:**

A dictionary stores **key-value pairs**.

```python
# Create dictionary
person = {
    'name': 'Alice',
    'age': 25,
    'city': 'New York'
}

# Access values
print(person['name'])        # Alice
print(person.get('name'))    # Alice
print(person.get('email'))   # None (safe access)

# Add/Update
person['email'] = 'alice@example.com'
person['age'] = 26

# Delete
del person['city']
person.pop('email')

# Methods
person.keys()          # dict_keys(['name', 'age'])
person.values()        # dict_values(['Alice', 26])
person.items()         # dict_items([('name', 'Alice'), ...])

# Iterate
for key, value in person.items():
    print(f"{key}: {value}")

# Check key exists
if 'name' in person:
    print(person['name'])

# Default value
person.setdefault('country', 'USA')
```

---

### Q21: What are defaultdict and Counter?

**Answer:**

Special dictionaries from `collections` module.

```python
from collections import defaultdict, Counter

# defaultdict - Returns default value for missing keys
dd = defaultdict(list)
dd['fruits'].append('apple')
dd['fruits'].append('banana')
print(dd)  # defaultdict(<class 'list'>, {'fruits': ['apple', 'banana']})

# Counter - Counts occurrences
words = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple']
counter = Counter(words)
print(counter)
# Counter({'apple': 3, 'banana': 2, 'cherry': 1})

# Most common
print(counter.most_common(2))
# [('apple', 3), ('banana', 2)]

# Count specific element
print(counter['apple'])  # 3
```

---

### Q22: What is the difference between sort() and sorted()?

**Answer:**

| Method | Type | Returns | Modifies |
|--------|------|---------|----------|
| **sort()** | List method | None | Original list |
| **sorted()** | Built-in | New list | Original unchanged |

```python
# sort() - modifies original
lst = [3, 1, 4, 1, 5, 9, 2, 6]
lst.sort()
print(lst)  # [1, 1, 2, 3, 4, 5, 6, 9]

# sorted() - returns new list
lst = [3, 1, 4, 1, 5, 9, 2, 6]
sorted_lst = sorted(lst)
print(lst)          # [3, 1, 4, 1, 5, 9, 2, 6] unchanged
print(sorted_lst)   # [1, 1, 2, 3, 4, 5, 6, 9]

# Reverse
sorted(lst, reverse=True)

# Sort by custom key
students = [
    {'name': 'Alice', 'grade': 85},
    {'name': 'Bob', 'grade': 92},
    {'name': 'Charlie', 'grade': 78}
]
sorted_students = sorted(students, key=lambda x: x['grade'])
```

---

### Q23: What is a generator?

**Answer:**

A generator is a function that returns values one at a time using `yield`.

```python
# Generator function
def count_up_to(n):
    i = 1
    while i <= n:
        yield i
        i += 1

# Use generator
for num in count_up_to(5):
    print(num)  # Prints 1, 2, 3, 4, 5

# Generator vs list
# Generator - lazy evaluation, memory efficient
gen = count_up_to(1000000)
next(gen)  # Gets next value only

# List - all values in memory
lst = list(range(1000000))  # All values created

# Generator expression
gen = (x**2 for x in range(5))
print(next(gen))  # 0
print(next(gen))  # 1
```

---

### Q24: What is a lambda function?

**Answer:**

Anonymous function defined with `lambda` keyword.

```python
# Regular function
def add(x, y):
    return x + y

# Lambda function
add_lambda = lambda x, y: x + y
print(add_lambda(3, 5))  # 8

# Used with map
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# Used with filter
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4]

# Sorting by lambda
students = [('Alice', 25), ('Bob', 20), ('Charlie', 23)]
sorted_students = sorted(students, key=lambda x: x[1])
print(sorted_students)
# [('Bob', 20), ('Charlie', 23), ('Alice', 25)]
```

---

### Q25: What are map, filter, and reduce?

**Answer:**

Higher-order functions that work with iterables.

```python
# map() - Apply function to each element
numbers = [1, 2, 3, 4, 5]
doubled = list(map(lambda x: x * 2, numbers))
print(doubled)  # [2, 4, 6, 8, 10]

# filter() - Keep elements where function is true
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4, 6, 8, 10]

# reduce() - Reduce to single value
from functools import reduce
numbers = [1, 2, 3, 4, 5]
product = reduce(lambda x, y: x * y, numbers)
print(product)  # 120

# Sum using reduce
total = reduce(lambda x, y: x + y, numbers)
print(total)  # 15
```

---

### Q26: What are *args and **kwargs?

**Answer:**

Allow functions to accept variable number of arguments.

```python
# *args - Variable positional arguments (tuple)
def func(*args):
    print(args)  # args is a tuple
    for arg in args:
        print(arg)

func(1, 2, 3)           # (1, 2, 3)
func('a', 'b', 'c', 'd')  # ('a', 'b', 'c', 'd')

# **kwargs - Variable keyword arguments (dictionary)
def func(**kwargs):
    print(kwargs)  # kwargs is a dictionary
    for key, value in kwargs.items():
        print(f"{key}: {value}")

func(name='Alice', age=25, city='NYC')
# {'name': 'Alice', 'age': 25, 'city': 'NYC'}

# Combined
def func(a, *args, **kwargs):
    print(f"a: {a}")
    print(f"args: {args}")
    print(f"kwargs: {kwargs}")

func(1, 2, 3, 4, name='Alice', age=25)
# a: 1
# args: (2, 3, 4)
# kwargs: {'name': 'Alice', 'age': 25}

# Unpacking
def add(a, b, c):
    return a + b + c

numbers = [1, 2, 3]
print(add(*numbers))  # 6

data = {'a': 1, 'b': 2, 'c': 3}
print(add(**data))    # 6
```

---

### Q27: What is string formatting?

**Answer:**

Different ways to format strings in Python.

```python
name = "Alice"
age = 25

# f-strings (modern, Python 3.6+)
print(f"Hello, {name}! You are {age} years old")

# format() method
print("Hello, {}! You are {} years old".format(name, age))
print("Hello, {n}! You are {a} years old".format(n=name, a=age))

# % operator (old style)
print("Hello, %s! You are %d years old" % (name, age))

# Format specifications
pi = 3.14159
print(f"Pi: {pi:.2f}")              # 3.14
print(f"Number: {100:05d}")         # 00100
print(f"Percentage: {0.75:.1%}")    # 75.0%
```

---

### Q28: What is unpacking?

**Answer:**

Extracting values from sequences.

```python
# List unpacking
my_list = [1, 2, 3]
a, b, c = my_list
print(a, b, c)  # 1 2 3

# Tuple unpacking
x, y = (10, 20)
print(x, y)  # 10 20

# With * operator
a, *b, c = [1, 2, 3, 4, 5]
print(a, b, c)  # 1 [2, 3, 4] 5

# Swap variables
x, y = 5, 10
x, y = y, x
print(x, y)  # 10 5

# Dictionary unpacking
d = {'a': 1, 'b': 2}
x, y = d
print(x, y)  # 'a' 'b' (keys)

x, y = d.values()
print(x, y)  # 1 2 (values)
```

---

### Q29: What is enumerate?

**Answer:**

Provides index and value when iterating.

```python
fruits = ['apple', 'banana', 'cherry']

# Without enumerate
for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")

# With enumerate (cleaner)
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
# 0: apple
# 1: banana
# 2: cherry

# With custom start index
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}: {fruit}")
# 1: apple
# 2: banana
# 3: cherry
```

---

### Q30: What is zip?

**Answer:**

Combines multiple iterables into tuples.

```python
names = ['Alice', 'Bob', 'Charlie']
ages = [25, 30, 35]
cities = ['NYC', 'LA', 'Chicago']

# zip combines into tuples
combined = zip(names, ages, cities)
for name, age, city in combined:
    print(f"{name} is {age} years old and lives in {city}")

# Unzip
combined = [('Alice', 25), ('Bob', 30), ('Charlie', 35)]
names, ages = zip(*combined)
print(names)  # ('Alice', 'Bob', 'Charlie')
print(ages)   # (25, 30, 35)

# Pair consecutive elements
lst = [1, 2, 3, 4, 5]
pairs = list(zip(lst, lst[1:]))
print(pairs)  # [(1, 2), (2, 3), (3, 4), (4, 5)]
```

---

### Q31: What is the difference between list() and tuple()?

**Answer:**

```python
# list() - Creates a mutable list
my_tuple = (1, 2, 3)
my_list = list(my_tuple)
print(my_list)  # [1, 2, 3]
my_list[0] = 99
print(my_list)  # [99, 2, 3]

# tuple() - Creates an immutable tuple
my_list = [1, 2, 3]
my_tuple = tuple(my_list)
print(my_tuple)  # (1, 2, 3)
# my_tuple[0] = 99  # ❌ Error

# From string
print(list("hello"))   # ['h', 'e', 'l', 'l', 'o']
print(tuple("hello"))  # ('h', 'e', 'l', 'l', 'o')

# From range
print(list(range(5)))  # [0, 1, 2, 3, 4]
print(tuple(range(5))) # (0, 1, 2, 3, 4)
```

---

### Q32: What is copy vs deepcopy?

**Answer:**

| Type | Copies | Nested Objects |
|------|--------|----------------|
| **Shallow copy** | Surface level | Not copied |
| **Deep copy** | All levels | All copied |

```python
import copy

# Shallow copy
original = [[1, 2], [3, 4]]
shallow = copy.copy(original)
shallow[0][0] = 99
print(original)   # [[99, 2], [3, 4]] - changed!

# Deep copy
original = [[1, 2], [3, 4]]
deep = copy.deepcopy(original)
deep[0][0] = 99
print(original)   # [[1, 2], [3, 4]] - unchanged

# Also works for lists
original = [1, 2, [3, 4]]
shallow = original[:]  # Shallow copy
deep = copy.deepcopy(original)  # Deep copy
```

---

### Q33: What is the difference between append and += for lists?

**Answer:**

```python
# append() - Adds to existing list
lst1 = [1, 2, 3]
lst1.append([4, 5])
print(lst1)  # [1, 2, 3, [4, 5]]

# += - Extends list (in-place)
lst2 = [1, 2, 3]
lst2 += [4, 5]
print(lst2)  # [1, 2, 3, 4, 5]

# For immutable types, += creates new object
a = [1, 2]
b = a
a += [3]
print(a, b)  # [1, 2, 3] [1, 2, 3] - both changed (in-place)

# For strings
s = "hello"
s2 = s
s += " world"
print(s, s2)  # "hello world" "hello" (different objects)
```

---

### Q34: What is the any() and all() function?

**Answer:**

Check conditions on iterables.

```python
# any() - Returns True if ANY element is True
print(any([False, False, True]))   # True
print(any([False, False, False]))  # False

# all() - Returns True if ALL elements are True
print(all([True, True, True]))     # True
print(all([True, False, True]))    # False

# With conditions
numbers = [1, 2, 3, 4, 5]
print(any(x > 3 for x in numbers))   # True (4 and 5 are > 3)
print(all(x > 0 for x in numbers))   # True (all positive)

# Common use
if all(condition(x) for x in items):
    print("All items pass condition")

if any(condition(x) for x in items):
    print("At least one item passes condition")
```

---

### Q35: What is the difference between is None and == None?

**Answer:**

```python
# Both work, but is None is preferred
x = None

# Using == (works)
if x == None:
    print("x is None")

# Using is (preferred, more efficient)
if x is None:
    print("x is None")

# Why is is better:
# 1. More efficient - checks object identity, not value
# 2. Only one None object exists - is is the right tool
# 3. Recommended by PEP 8 style guide

# Exception: With == you can override behavior
class Custom:
    def __eq__(self, other):
        return True  # Custom comparison

obj = Custom()
print(obj == None)   # True (custom behavior)
print(obj is None)   # False (actually different object)
```

---

## SECTION 3: FUNCTIONS & OOP (Q36-55)

### Q36: What are functions in Python?

**Answer:**

Functions are reusable blocks of code.

```python
# Define function
def greet(name, greeting="Hello"):
    """This is a docstring"""
    message = f"{greeting}, {name}!"
    return message

# Call function
print(greet("Alice"))                    # Hello, Alice!
print(greet("Bob", greeting="Hi"))       # Hi, Bob!

# Multiple return values
def get_coordinates():
    return 10, 20

x, y = get_coordinates()
print(x, y)  # 10 20

# No return (returns None)
def no_return():
    print("I don't return anything")

result = no_return()
print(result)  # None

# Type hints
def add(a: int, b: int) -> int:
    return a + b

print(add(3, 5))  # 8
```

---

### Q37: What is a decorator?

**Answer:**

A decorator wraps a function to modify its behavior.

```python
# Simple decorator
def my_decorator(func):
    def wrapper():
        print("Before function call")
        result = func()
        print("After function call")
        return result
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")
    return "Done"

say_hello()
# Before function call
# Hello!
# After function call

# Decorator with arguments
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        result = func(*args, **kwargs)
        return result
    return wrapper

@my_decorator
def add(a, b):
    return a + b

print(add(3, 5))  # Returns 8

# Practical decorator - timing
import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"Execution time: {end - start:.4f} seconds")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "Done"

slow_function()
```

---

### Q38: What are classes in Python?

**Answer:**

Classes define blueprints for objects.

```python
class Dog:
    # Class variable (shared by all instances)
    species = "Canis familiaris"
    
    # Constructor
    def __init__(self, name, age):
        self.name = name      # Instance variable
        self.age = age
    
    # Method
    def bark(self):
        return f"{self.name} says: Woof!"
    
    # Class method
    @classmethod
    def info(cls):
        return f"Species: {cls.species}"
    
    # Static method
    @staticmethod
    def description():
        return "Dogs are loyal pets"

# Create object
dog = Dog("Buddy", 3)

# Access instance variables
print(dog.name)        # Buddy
print(dog.age)         # 3

# Call methods
print(dog.bark())      # Buddy says: Woof!

# Access class variable
print(dog.species)     # Canis familiaris

# Call class method
print(Dog.info())      # Species: Canis familiaris

# Call static method
print(Dog.description())  # Dogs are loyal pets
```

---

### Q39: What is inheritance?

**Answer:**

Inheritance allows a class to inherit from another class.

```python
# Parent class
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        return "Some sound"

# Child class inherits from Animal
class Dog(Animal):
    def speak(self):  # Override parent method
        return f"{self.name} says: Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says: Meow!"

# Create objects
dog = Dog("Buddy")
cat = Cat("Whiskers")

print(dog.name)       # Buddy
print(dog.speak())    # Buddy says: Woof!
print(cat.speak())    # Whiskers says: Meow!

# Check inheritance
print(isinstance(dog, Animal))  # True
print(isinstance(dog, Dog))     # True
print(isinstance(dog, Cat))     # False
```

---

### Q40: What is super()?

**Answer:**

Calls methods from parent class.

```python
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        return "Some sound"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)  # Call parent constructor
        self.breed = breed
    
    def speak(self):
        # Call parent method and add to it
        parent_speak = super().speak()
        return f"{self.name} says: Woof! ({parent_speak})"

dog = Dog("Buddy", "Golden Retriever")
print(dog.name)     # Buddy
print(dog.breed)    # Golden Retriever
print(dog.speak())  # Buddy says: Woof! (Some sound)
```

---

### Q41: What is polymorphism?

**Answer:**

Objects of different types can use the same interface.

```python
# Polymorphism example
class Dog:
    def speak(self):
        return "Woof!"

class Cat:
    def speak(self):
        return "Meow!"

class Bird:
    def speak(self):
        return "Tweet!"

# Same function works with different types
def animal_sound(animal):
    print(animal.speak())

dog = Dog()
cat = Cat()
bird = Bird()

animal_sound(dog)    # Woof!
animal_sound(cat)    # Meow!
animal_sound(bird)   # Tweet!

# Duck typing - "If it quacks like a duck, it's a duck"
for animal in [dog, cat, bird]:
    animal_sound(animal)
```

---

### Q42: What is encapsulation?

**Answer:**

Hiding internal implementation and providing public interface.

```python
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance  # Private attribute
    
    # Public method
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            return f"Deposited ${amount}"
        return "Invalid amount"
    
    # Public method
    def withdraw(self, amount):
        if amount > 0 and amount <= self.__balance:
            self.__balance -= amount
            return f"Withdrawn ${amount}"
        return "Insufficient balance"
    
    # Public method to access private data
    def get_balance(self):
        return self.__balance

# Create object
account = BankAccount(1000)

# Can't access private attribute directly
# print(account.__balance)  # ❌ Error

# Use public methods
print(account.deposit(500))      # Deposited $500
print(account.withdraw(200))     # Withdrawn $200
print(account.get_balance())     # 1300

# Private attributes are name-mangled (weak privacy)
print(account._BankAccount__balance)  # 1300 (possible but discouraged)
```

---

### Q43: What is the difference between __str__ and __repr__?

**Answer:**

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    # __str__ - User-friendly string (for end users)
    def __str__(self):
        return f"{self.name} is {self.age} years old"
    
    # __repr__ - Developer-friendly string (for debugging)
    def __repr__(self):
        return f"Person(name='{self.name}', age={self.age})"

person = Person("Alice", 25)

print(str(person))   # Alice is 25 years old
print(repr(person))  # Person(name='Alice', age=25)

# In interactive shell
person  # Calls __repr__
# Person(name='Alice', age=25)
```

---

### Q44: What are properties in Python?

**Answer:**

Use @property to create getter/setter methods.

```python
class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius
    
    @property
    def celsius(self):
        """Getter"""
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        """Setter"""
        if value < -273.15:
            raise ValueError("Below absolute zero")
        self._celsius = value
    
    @property
    def fahrenheit(self):
        """Read-only property"""
        return (self._celsius * 9/5) + 32

# Use like attributes
temp = Temperature(25)
print(temp.celsius)      # 25 (calls getter)
print(temp.fahrenheit)   # 77.0

temp.celsius = 30        # Calls setter
print(temp.celsius)      # 30

# temp.fahrenheit = 100  # ❌ Error (no setter)
```

---

### Q45: What is the difference between class method and static method?

**Answer:**

```python
class MyClass:
    class_var = "I'm a class variable"
    
    # Instance method
    def instance_method(self):
        return f"Instance method called"
    
    # Class method (receives cls as first argument)
    @classmethod
    def class_method(cls):
        return f"Class method called. Class: {cls.__name__}"
    
    # Static method (doesn't receive self or cls)
    @staticmethod
    def static_method():
        return "Static method called"

obj = MyClass()

# Instance method - needs object
print(obj.instance_method())     # Instance method called

# Class method - needs class
print(MyClass.class_method())    # Class method called. Class: MyClass
print(obj.class_method())        # Also works from object

# Static method - needs neither
print(MyClass.static_method())   # Static method called
print(obj.static_method())       # Also works from object

# When to use:
# instance method - Most common, works with instance data
# class method - Work with class data, factory methods
# static method - Utility functions that don't need class/instance data
```

---

### Q46: What is multiple inheritance?

**Answer:**

A class can inherit from multiple classes.

```python
class Flyable:
    def fly(self):
        return "Flying..."

class Swimmable:
    def swim(self):
        return "Swimming..."

class Duck(Flyable, Swimmable):
    pass

duck = Duck()
print(duck.fly())    # Flying...
print(duck.swim())   # Swimming...

# MRO - Method Resolution Order
print(Duck.__mro__)
# (<class 'Duck'>, <class 'Flyable'>, <class 'Swimmable'>, <class 'object'>)

# Problems with multiple inheritance (Diamond Problem)
class A:
    def method(self):
        return "A"

class B(A):
    def method(self):
        return "B"

class C(A):
    def method(self):
        return "C"

class D(B, C):  # Diamond!
    pass

d = D()
print(d.method())   # "B" (follows MRO: D -> B -> C -> A)
```

---

### Q47: What are abstract classes?

**Answer:**

Abstract classes define interface that subclasses must implement.

```python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def speak(self):
        pass
    
    def move(self):  # Concrete method
        return "Moving..."

# Can't instantiate abstract class
# animal = Animal()  # ❌ Error

class Dog(Animal):
    def speak(self):  # Must implement abstract method
        return "Woof!"

dog = Dog()
print(dog.speak())  # Woof!
print(dog.move())   # Moving...
```

---

### Q48: What is an exception?

**Answer:**

Errors that occur during program execution.

```python
# Common exceptions
try:
    x = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")

try:
    lst = [1, 2, 3]
    print(lst[5])
except IndexError:
    print("Index out of range")

try:
    d = {'a': 1}
    print(d['b'])
except KeyError:
    print("Key not found")

try:
    int("abc")
except ValueError:
    print("Invalid value")

# Multiple except blocks
try:
    code()
except (ValueError, TypeError):
    print("Value or Type Error")
except Exception as e:
    print(f"Unexpected error: {e}")
finally:
    print("Always runs")

# Raise exception
def validate_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    return age

# Custom exception
class CustomError(Exception):
    pass

try:
    raise CustomError("Something went wrong")
except CustomError as e:
    print(f"Caught: {e}")
```

---

### Q49: What is the difference between try-except and try-finally?

**Answer:**

```python
# try-except - Handles errors
try:
    x = 10 / 0
except ZeroDivisionError:
    print("Error occurred")
print("Program continues")

# try-finally - Always runs finally block
try:
    x = 10 / 2
finally:
    print("This always runs")

# try-except-finally
try:
    x = 10 / 0
except ZeroDivisionError:
    print("Error handled")
finally:
    print("Cleanup happens here")

# Example: File handling
try:
    file = open("file.txt")
    # Do something
except FileNotFoundError:
    print("File not found")
finally:
    file.close()  # Always close file
```

---

### Q50: What is the difference between raise and except?

**Answer:**

```python
# except - Catches exceptions that occur
try:
    x = 10 / 0
except ZeroDivisionError:
    print("Caught an error")

# raise - Manually throw an exception
def validate(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    return age

try:
    validate(-5)
except ValueError as e:
    print(f"Error: {e}")

# Re-raise exception
try:
    x = 10 / 0
except ZeroDivisionError:
    print("Logging error...")
    raise  # Re-raise the same exception
```

---

### Q51: What is a context manager?

**Answer:**

Ensures resources are properly initialized and cleaned up.

```python
# Using with statement (context manager)
with open("file.txt") as f:
    data = f.read()  # File automatically closed after with block

# Create custom context manager
class MyContext:
    def __enter__(self):
        print("Enter")
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Exit")
        return False

with MyContext() as context:
    print("Inside")

# Using decorator
from contextlib import contextmanager

@contextmanager
def my_context():
    print("Setup")
    yield "Resource"
    print("Cleanup")

with my_context() as resource:
    print(f"Using {resource}")
```

---

### Q52: What is the __init__ method?

**Answer:**

Constructor that initializes object when created.

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        print(f"{name} created")

# Called automatically when creating object
person = Person("Alice", 25)  # Prints: Alice created

# Without __init__
class Empty:
    pass

e = Empty()
# print(e.name)  # ❌ No name attribute
```

---

### Q53: What is __del__ method?

**Answer:**

Destructor called when object is destroyed.

```python
class MyClass:
    def __init__(self, name):
        self.name = name
        print(f"{name} created")
    
    def __del__(self):
        print(f"{self.name} destroyed")

obj = MyClass("obj1")  # Prints: obj1 created
del obj                # Prints: obj1 destroyed

# Or when program ends
def func():
    obj2 = MyClass("obj2")
func()  # Prints: obj2 created, obj2 destroyed
```

---

### Q54: What is the difference between shallow and deep object copy?

**Answer:**

Already covered in Q32, but specific to classes:

```python
import copy

class Student:
    def __init__(self, name, grades):
        self.name = name
        self.grades = grades

# Shallow copy
student1 = Student("Alice", [90, 85])
student2 = copy.copy(student1)
student2.grades[0] = 100
print(student1.grades)  # [100, 85] - changed!

# Deep copy
student1 = Student("Alice", [90, 85])
student3 = copy.deepcopy(student1)
student3.grades[0] = 100
print(student1.grades)  # [90, 85] - unchanged
```

---

### Q55: What is the __str__ and __repr__ again (more examples)?

**Answer:**

More practical examples:

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __str__(self):
        return f"({self.x}, {self.y})"
    
    def __repr__(self):
        return f"Point({self.x}, {self.y})"
    
    def __add__(self, other):  # Operator overloading
        return Point(self.x + other.x, self.y + other.y)
    
    def __eq__(self, other):  # Equality comparison
        return self.x == other.x and self.y == other.y
    
    def __len__(self):  # For len()
        return int((self.x**2 + self.y**2)**0.5)

p1 = Point(3, 4)
print(str(p1))      # (3, 4)
print(repr(p1))     # Point(3, 4)
print(len(p1))      # 5 (Pythagorean distance)
print(p1 + Point(1, 2))  # (4, 6)
```

---

## SECTION 4: ADVANCED PYTHON (Q56-75)

### Q56: What is a list comprehension with conditions?

**Answer:**

Already covered in Q18, more examples:

```python
# Basic
squares = [x**2 for x in range(10)]

# With condition
evens = [x for x in range(10) if x % 2 == 0]

# With if-else
result = [x if x % 2 == 0 else -x for x in range(5)]
# [0, -1, 2, -3, 4]

# Nested
matrix = [[i*j for j in range(3)] for i in range(3)]
# [[0, 0, 0], [0, 1, 2], [0, 2, 4]]

# Flattening
nested = [[1, 2], [3, 4], [5, 6]]
flat = [x for row in nested for x in row]
# [1, 2, 3, 4, 5, 6]
```

---

### Q57: What are decorators with arguments?

**Answer:**

```python
def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def say_hello(name):
    print(f"Hello, {name}!")
    return "Done"

say_hello("Alice")
# Prints "Hello, Alice!" three times

# More complex
def log_calls(func_name=None):
    def decorator(func):
        def wrapper(*args, **kwargs):
            name = func_name or func.__name__
            print(f"Calling {name} with {args}, {kwargs}")
            result = func(*args, **kwargs)
            print(f"{name} returned {result}")
            return result
        return wrapper
    return decorator

@log_calls(func_name="add_function")
def add(a, b):
    return a + b

add(3, 5)
```

---

### Q58: What is *args unpacking in function calls?

**Answer:**

```python
def func(a, b, c):
    return a + b + c

# Unpack list
numbers = [1, 2, 3]
print(func(*numbers))  # 6

# Unpack tuple
numbers = (1, 2, 3)
print(func(*numbers))  # 6

# With **kwargs
def func2(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

data = {'a': 1, 'b': 2, 'c': 3}
func2(**data)
# a: 1
# b: 2
# c: 3

# Mixed
def func3(a, *args, **kwargs):
    print(f"a: {a}")
    print(f"args: {args}")
    print(f"kwargs: {kwargs}")

func3(1, 2, 3, x=10, y=20)
# a: 1
# args: (2, 3)
# kwargs: {'x': 10, 'y': 20}
```

---

### Q59: What is a generator expression?

**Answer:**

Like list comprehension but returns generator (lazy).

```python
# List comprehension (all values created)
squares_list = [x**2 for x in range(1000000)]

# Generator expression (values created on demand)
squares_gen = (x**2 for x in range(1000000))

# Get first value
print(next(squares_gen))  # 0

# Iterate through generator
for square in squares_gen:
    print(square)

# Convert to list
gen = (x for x in range(5))
lst = list(gen)
print(lst)  # [0, 1, 2, 3, 4]

# More efficient for large data
def process_large_file():
    with open("huge_file.txt") as f:
        # Process line by line (memory efficient)
        lines = (line.strip() for line in f)
        return lines
```

---

### Q60: What is the global and nonlocal keyword?

**Answer:**

```python
# global - Access global variable
global_var = 10

def change_global():
    global global_var
    global_var = 20

print(global_var)    # 10
change_global()
print(global_var)    # 20

# nonlocal - Access variable from enclosing function
def outer():
    x = 10
    
    def inner():
        nonlocal x
        x = 20
    
    print(x)  # 10
    inner()
    print(x)  # 20

outer()

# Without nonlocal/global
def outer2():
    x = 10
    
    def inner():
        x = 20  # Creates local x, doesn't change outer x
    
    print(x)  # 10
    inner()
    print(x)  # Still 10
```

---

### Q61: What are metaclasses?

**Answer:**

Classes of classes - define how classes behave.

```python
# Simple metaclass
class MyMeta(type):
    def __new__(mcs, name, bases, dct):
        print(f"Creating class {name}")
        return super().__new__(mcs, name, bases, dct)

# Use metaclass
class MyClass(metaclass=MyMeta):
    pass

# Prints: Creating class MyClass

# Metaclass that adds methods
class AutoPropertyMeta(type):
    def __new__(mcs, name, bases, dct):
        for key, value in dct.items():
            if isinstance(value, int):
                dct[f'_{key}'] = value
        return super().__new__(mcs, name, bases, dct)

class Person(metaclass=AutoPropertyMeta):
    age = 25
    height = 180

print(Person._age)  # 25
```

---

### Q62: What is the difference between callable and call?

**Answer:**

```python
# callable() - Check if object can be called
def func():
    pass

class MyClass:
    def __call__(self):
        return "Called"

print(callable(func))      # True
print(callable(MyClass))   # True
print(callable(MyClass())) # True (has __call__)
print(callable(5))         # False

# Actually calling
obj = MyClass()
result = obj()  # Calls __call__ method
print(result)   # "Called"
```

---

### Q63: What is *args with single asterisk?

**Answer:**

Already covered, more examples:

```python
def func(*args):
    print(type(args))  # <class 'tuple'>
    print(args)
    for arg in args:
        print(arg)

func(1, 2, 3)
# (1, 2, 3)
# 1
# 2
# 3

# Unpacking
lst = [1, 2, 3]
func(*lst)  # Same as func(1, 2, 3)
```

---

### Q64: What is **kwargs with double asterisk?

**Answer:**

Already covered, more examples:

```python
def func(**kwargs):
    print(type(kwargs))  # <class 'dict'>
    print(kwargs)
    for key, value in kwargs.items():
        print(f"{key} = {value}")

func(a=1, b=2, c=3)
# {'a': 1, 'b': 2, 'c': 3}
# a = 1
# b = 2
# c = 3

# Unpacking
d = {'x': 10, 'y': 20}
func(**d)  # Same as func(x=10, y=20)
```

---

### Q65: What is iteration and iteration protocol?

**Answer:**

Iteration protocol requires __iter__ and __next__.

```python
# Custom iterable
class CountUp:
    def __init__(self, max):
        self.max = max
    
    def __iter__(self):
        self.current = 0
        return self
    
    def __next__(self):
        if self.current < self.max:
            self.current += 1
            return self.current
        else:
            raise StopIteration

# Use it
counter = CountUp(3)
for num in counter:
    print(num)
# 1
# 2
# 3

# Or manually
counter = CountUp(3)
print(next(counter))  # 1
print(next(counter))  # 2
print(next(counter))  # 3
# print(next(counter))  # ❌ StopIteration
```

---

### Q66: What are magic methods?

**Answer:**

Special methods that begin and end with __.

```python
class Number:
    def __init__(self, value):
        self.value = value
    
    def __str__(self):
        return f"Number: {self.value}"
    
    def __repr__(self):
        return f"Number({self.value})"
    
    def __add__(self, other):
        return Number(self.value + other.value)
    
    def __sub__(self, other):
        return Number(self.value - other.value)
    
    def __mul__(self, other):
        return Number(self.value * other.value)
    
    def __eq__(self, other):
        return self.value == other.value
    
    def __lt__(self, other):
        return self.value < other.value
    
    def __len__(self):
        return abs(self.value)
    
    def __getitem__(self, index):
        return str(self.value)[index]

n1 = Number(5)
n2 = Number(3)

print(n1 + n2)        # Number: 8
print(n1 == Number(5)) # True
print(n1 < n2)        # False
print(len(Number(-5))) # 5
```

---

### Q67: What is the @property decorator again?

**Answer:**

Already covered in Q44, more examples:

```python
class Circle:
    def __init__(self, radius):
        self._radius = radius
    
    @property
    def radius(self):
        return self._radius
    
    @radius.setter
    def radius(self, value):
        if value <= 0:
            raise ValueError("Radius must be positive")
        self._radius = value
    
    @property
    def area(self):
        return 3.14159 * self._radius ** 2

c = Circle(5)
print(c.radius)  # 5
print(c.area)    # 78.53975

c.radius = 10
print(c.area)    # 314.159

# c.radius = -5  # ❌ Error
```

---

### Q68: What is slots?

**Answer:**

Optimize memory by pre-defining attributes.

```python
# Without slots
class PersonNormal:
    def __init__(self, name, age):
        self.name = name
        self.age = age

# With slots
class PersonSlots:
    __slots__ = ['name', 'age']
    
    def __init__(self, name, age):
        self.name = name
        self.age = age

p1 = PersonNormal("Alice", 25)
p1.email = "alice@example.com"  # Can add any attribute

p2 = PersonSlots("Bob", 30)
# p2.email = "bob@example.com"  # ❌ Error - not in slots
```

---

### Q69: What is type() and isinstance()?

**Answer:**

```python
# type() - Get exact type
x = 5
print(type(x))      # <class 'int'>
print(type("hi"))   # <class 'str'>

# isinstance() - Check if instance of class or subclass
class Animal:
    pass

class Dog(Animal):
    pass

d = Dog()
print(isinstance(d, Dog))     # True
print(isinstance(d, Animal))  # True (inheritance)
print(type(d) == Dog)         # True
print(type(d) == Animal)      # False

# isinstance with tuple of types
print(isinstance(5, (int, str)))   # True
print(isinstance("hi", (int, str)))  # True
print(isinstance(5.5, (int, str)))   # False
```

---

### Q70: What is dir()?

**Answer:**

Returns all attributes and methods of an object.

```python
class MyClass:
    class_var = 10
    
    def __init__(self):
        self.instance_var = 20
    
    def method(self):
        pass

obj = MyClass()

# All attributes and methods
print(dir(obj))
# [..., 'class_var', 'instance_var', 'method', ...]

# Filter to get only custom attributes
print([x for x in dir(obj) if not x.startswith('_')])
# ['class_var', 'instance_var', 'method']

# Check specific attribute
print('method' in dir(obj))  # True
print('nonexistent' in dir(obj))  # False
```

---

### Q71: What is help()?

**Answer:**

Get documentation on objects.

```python
# Get help on function
help(print)

# Get help on class
help(list)

# Get help on object
my_list = [1, 2, 3]
help(my_list)

# Or use ?
# In Jupyter notebook or IPython:
# print?
# list?
# my_list?
```

---

### Q72: What is sys module?

**Answer:**

Provides access to interpreter internals.

```python
import sys

# Python version
print(sys.version)
print(sys.version_info)

# Platform
print(sys.platform)  # 'linux', 'win32', 'darwin'

# Command line arguments
print(sys.argv)

# Paths
print(sys.path)

# Maximum integer
print(sys.maxsize)

# Exit program
# sys.exit()
```

---

### Q73: What is os module?

**Answer:**

Interact with operating system.

```python
import os

# Get current directory
print(os.getcwd())

# Change directory
os.chdir('/home')

# List files
print(os.listdir('.'))

# Create directory
os.mkdir('new_dir')

# Remove directory
os.rmdir('new_dir')

# File operations
os.remove('file.txt')
os.rename('old.txt', 'new.txt')

# Check if exists
print(os.path.exists('file.txt'))

# Join paths
path = os.path.join('folder', 'file.txt')

# Get file info
print(os.path.getsize('file.txt'))
```

---

### Q74: What is the time module?

**Answer:**

Work with time and dates.

```python
import time
from datetime import datetime, timedelta

# Current time
print(time.time())          # Seconds since epoch
print(datetime.now())       # Current datetime

# Sleep
time.sleep(1)              # Sleep for 1 second

# Format time
now = datetime.now()
print(now.strftime('%Y-%m-%d %H:%M:%S'))

# Time arithmetic
tomorrow = datetime.now() + timedelta(days=1)
print(tomorrow)

# Difference
date1 = datetime(2020, 1, 1)
date2 = datetime(2021, 1, 1)
diff = date2 - date1
print(diff.days)  # 365
```

---

### Q75: What is json module?

**Answer:**

Working with JSON data.

```python
import json

# Convert Python object to JSON string
data = {
    'name': 'Alice',
    'age': 25,
    'hobbies': ['reading', 'coding']
}

json_string = json.dumps(data)
print(json_string)
# {"name": "Alice", "age": 25, "hobbies": ["reading", "coding"]}

# Convert JSON string to Python object
parsed = json.loads(json_string)
print(parsed['name'])  # Alice

# Write to file
with open('data.json', 'w') as f:
    json.dump(data, f)

# Read from file
with open('data.json', 'r') as f:
    loaded_data = json.load(f)
```

---

## SECTION 5: LIBRARIES & MODULES (Q76-85)

### Q76: What is the collections module?

**Answer:**

Already covered in Q21, more details:

```python
from collections import Counter, defaultdict, OrderedDict, namedtuple

# Counter
words = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple']
counter = Counter(words)
print(counter)  # Counter({'apple': 3, 'banana': 2, 'cherry': 1})

# defaultdict
dd = defaultdict(list)
dd['a'].append(1)
print(dd)  # defaultdict(<class 'list'>, {'a': [1]})

# namedtuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)
print(p.x, p.y)  # 3 4
```

---

### Q77: What is the math module?

**Answer:**

Mathematical functions.

```python
import math

# Constants
print(math.pi)      # 3.14159...
print(math.e)       # 2.71828...

# Functions
print(math.sqrt(16))        # 4.0
print(math.pow(2, 3))       # 8.0
print(math.floor(3.7))      # 3
print(math.ceil(3.2))       # 4
print(math.fabs(-5))        # 5.0
print(math.factorial(5))    # 120
```

---

### Q78: What is the random module?

**Answer:**

Generate random numbers.

```python
import random

# Random float
print(random.random())           # 0.0 to 1.0

# Random integer
print(random.randint(1, 10))     # 1 to 10

# Random choice
print(random.choice([1, 2, 3]))  # Random element

# Shuffle
lst = [1, 2, 3, 4, 5]
random.shuffle(lst)
print(lst)  # Shuffled

# Sample
print(random.sample([1, 2, 3, 4, 5], 3))  # 3 unique random elements
```

---

### Q79: What is the itertools module?

**Answer:**

Create iterators for efficient looping.

```python
import itertools

# count - Infinite counter
counter = itertools.count(1)
print(next(counter))  # 1
print(next(counter))  # 2

# cycle - Repeat cycle
cycle = itertools.cycle([1, 2, 3])
print(next(cycle))  # 1
print(next(cycle))  # 2
print(next(cycle))  # 3
print(next(cycle))  # 1

# repeat - Repeat value
repeat = itertools.repeat(5, 3)
print(list(repeat))  # [5, 5, 5]

# combinations
combos = itertools.combinations([1, 2, 3], 2)
print(list(combos))  # [(1, 2), (1, 3), (2, 3)]

# permutations
perms = itertools.permutations([1, 2, 3], 2)
print(list(perms))  # [(1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2)]
```

---

### Q80: What is the functools module?

**Answer:**

Higher-order functions.

```python
import functools

# reduce
numbers = [1, 2, 3, 4, 5]
product = functools.reduce(lambda x, y: x * y, numbers)
print(product)  # 120

# lru_cache - Memoization
@functools.lru_cache(maxsize=128)
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))  # Fast due to caching

# partial
def power(base, exp):
    return base ** exp

square = functools.partial(power, exp=2)
print(square(5))  # 25
```

---

### Q81: What is the string module?

**Answer:**

String constants and utilities.

```python
import string

# Constants
print(string.ascii_letters)     # abcdefghijklmnopqrstuvwxyzABCDEF...
print(string.digits)            # 0123456789
print(string.punctuation)       # !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~

# Check characters
print(string.ascii_lowercase)   # abcdefghijklmnopqrstuvwxyz
print(string.ascii_uppercase)   # ABCDEFGHIJKLMNOPQRSTUVWXYZ
```

---

### Q82: What is enumerate with start?

**Answer:**

Already covered, quick recap:

```python
fruits = ['apple', 'banana', 'cherry']

# Default start=0
for i, fruit in enumerate(fruits):
    print(i, fruit)
# 0 apple
# 1 banana
# 2 cherry

# Custom start
for i, fruit in enumerate(fruits, start=1):
    print(i, fruit)
# 1 apple
# 2 banana
# 3 cherry
```

---

### Q83: What are regex (regular expressions)?

**Answer:**

Pattern matching for strings.

```python
import re

text = "Hello 123 World 456"

# find all patterns
numbers = re.findall(r'\d+', text)
print(numbers)  # ['123', '456']

# search - first match
match = re.search(r'\d+', text)
print(match.group())  # 123

# replace
result = re.sub(r'\d+', 'X', text)
print(result)  # Hello X World X

# split
words = re.split(r'\s+', text)
print(words)  # ['Hello', '123', 'World', '456']

# compile pattern
pattern = re.compile(r'\d{3}')
print(pattern.findall(text))  # ['123']

# Common patterns
# \d - digit
# \w - word character
# \s - whitespace
# . - any character
# + - one or more
# * - zero or more
# ? - zero or one
# [abc] - a, b, or c
# [a-z] - a to z
# ^ - start of string
# $ - end of string
```

---

### Q84: What is the pickle module?

**Answer:**

Serialize and deserialize Python objects.

```python
import pickle

# Serialize
data = {'name': 'Alice', 'age': 25}
pickled = pickle.dumps(data)  # Convert to bytes
print(pickled)

# Deserialize
unpickled = pickle.loads(pickled)
print(unpickled)  # {'name': 'Alice', 'age': 25}

# Save to file
with open('data.pkl', 'wb') as f:
    pickle.dump(data, f)

# Load from file
with open('data.pkl', 'rb') as f:
    loaded_data = pickle.load(f)
```

---

### Q85: What is the unittest module?

**Answer:**

Writing unit tests.

```python
import unittest

def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

class TestMath(unittest.TestCase):
    def test_add(self):
        self.assertEqual(add(2, 3), 5)
        self.assertEqual(add(-1, 1), 0)
    
    def test_subtract(self):
        self.assertEqual(subtract(5, 3), 2)
    
    def test_add_fails(self):
        self.assertNotEqual(add(2, 2), 5)

if __name__ == '__main__':
    unittest.main()

# Run tests
# python test_file.py
```

---

## SECTION 6: CODING & PROBLEM SOLVING (Q86-100)

### Q86: How do you find the largest number in a list?

**Answer:**

```python
numbers = [3, 7, 2, 9, 1]

# Method 1: Built-in max()
largest = max(numbers)
print(largest)  # 9

# Method 2: Loop
largest = numbers[0]
for num in numbers:
    if num > largest:
        largest = num
print(largest)  # 9

# Method 3: sorted()
largest = sorted(numbers, reverse=True)[0]
print(largest)  # 9
```

---

### Q87: How do you reverse a string?

**Answer:**

```python
text = "Hello"

# Method 1: Slicing
reversed_text = text[::-1]
print(reversed_text)  # "olleH"

# Method 2: reversed() function
reversed_text = ''.join(reversed(text))
print(reversed_text)  # "olleH"

# Method 3: Loop
reversed_text = ""
for char in text:
    reversed_text = char + reversed_text
print(reversed_text)  # "olleH"
```

---

### Q88: How do you check if a number is prime?

**Answer:**

```python
def is_prime(n):
    if n < 2:
        return False
    
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    
    return True

print(is_prime(7))   # True
print(is_prime(10))  # False
print(is_prime(17))  # True
```

---

### Q89: How do you find duplicates in a list?

**Answer:**

```python
numbers = [1, 2, 2, 3, 4, 4, 4, 5]

# Method 1: Set
duplicates = list(set([x for x in numbers if numbers.count(x) > 1]))
print(duplicates)  # [2, 4]

# Method 2: Using Counter
from collections import Counter
counter = Counter(numbers)
duplicates = [num for num, count in counter.items() if count > 1]
print(duplicates)  # [2, 4]

# Method 3: Dictionary
seen = {}
duplicates = []
for num in numbers:
    if num in seen:
        duplicates.append(num)
    else:
        seen[num] = True
print(duplicates)  # [2, 4, 4]
```

---

### Q90: How do you find the second largest number?

**Answer:**

```python
numbers = [3, 7, 2, 9, 1, 9]

# Method 1: Sort and get second last
sorted_nums = sorted(set(numbers), reverse=True)
second_largest = sorted_nums[1]
print(second_largest)  # 7

# Method 2: Remove max and find max again
numbers_copy = numbers.copy()
numbers_copy.remove(max(numbers_copy))
second_largest = max(numbers_copy)
print(second_largest)  # 7

# Method 3: Iterate
first_max = second_max = float('-inf')
for num in numbers:
    if num > first_max:
        second_max = first_max
        first_max = num
    elif num > second_max and num != first_max:
        second_max = num
print(second_max)  # 7
```

---

### Q91: How do you implement a simple calculator?

**Answer:**

```python
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        return "Cannot divide by zero"
    return a / b

def calculator():
    while True:
        print("\n1. Add\n2. Subtract\n3. Multiply\n4. Divide\n5. Exit")
        choice = input("Enter choice: ")
        
        if choice == '5':
            break
        
        if choice in ['1', '2', '3', '4']:
            a = float(input("Enter first number: "))
            b = float(input("Enter second number: "))
            
            if choice == '1':
                print(f"Result: {add(a, b)}")
            elif choice == '2':
                print(f"Result: {subtract(a, b)}")
            elif choice == '3':
                print(f"Result: {multiply(a, b)}")
            elif choice == '4':
                print(f"Result: {divide(a, b)}")
        else:
            print("Invalid choice")

# calculator()
```

---

### Q92: How do you remove duplicates from a list?

**Answer:**

```python
numbers = [1, 2, 2, 3, 4, 4, 4, 5]

# Method 1: Set (loses order)
unique = list(set(numbers))
print(unique)  # [1, 2, 3, 4, 5]

# Method 2: Preserve order
unique = []
for num in numbers:
    if num not in unique:
        unique.append(num)
print(unique)  # [1, 2, 3, 4, 5]

# Method 3: Dict.fromkeys()
unique = list(dict.fromkeys(numbers))
print(unique)  # [1, 2, 3, 4, 5]
```

---

### Q93: How do you find common elements between two lists?

**Answer:**

```python
list1 = [1, 2, 3, 4, 5]
list2 = [4, 5, 6, 7, 8]

# Method 1: Set intersection
common = list(set(list1) & set(list2))
print(common)  # [4, 5]

# Method 2: List comprehension
common = [x for x in list1 if x in list2]
print(common)  # [4, 5]

# Method 3: filter()
common = list(filter(lambda x: x in list2, list1))
print(common)  # [4, 5]
```

---

### Q94: How do you check if a string is a palindrome?

**Answer:**

```python
def is_palindrome(text):
    # Remove spaces and convert to lowercase
    text = text.replace(" ", "").lower()
    
    # Check if same as reverse
    return text == text[::-1]

print(is_palindrome("racecar"))      # True
print(is_palindrome("hello"))        # False
print(is_palindrome("A man a plan a canal Panama"))  # True
```

---

### Q95: How do you count the number of vowels in a string?

**Answer:**

```python
def count_vowels(text):
    vowels = "aeiouAEIOU"
    count = 0
    for char in text:
        if char in vowels:
            count += 1
    return count

# Or with list comprehension
def count_vowels(text):
    vowels = "aeiouAEIOU"
    return len([char for char in text if char in vowels])

print(count_vowels("Hello World"))  # 3
```

---

### Q96: How do you merge two lists?

**Answer:**

```python
list1 = [1, 2, 3]
list2 = [4, 5, 6]

# Method 1: + operator
merged = list1 + list2
print(merged)  # [1, 2, 3, 4, 5, 6]

# Method 2: extend()
merged = list1.copy()
merged.extend(list2)
print(merged)  # [1, 2, 3, 4, 5, 6]

# Method 3: unpacking
merged = [*list1, *list2]
print(merged)  # [1, 2, 3, 4, 5, 6]

# Method 4: itertools
import itertools
merged = list(itertools.chain(list1, list2))
print(merged)  # [1, 2, 3, 4, 5, 6]
```

---

### Q97: How do you flatten a nested list?

**Answer:**

```python
nested = [[1, 2], [3, 4], [5, 6]]

# Method 1: List comprehension
flat = [x for row in nested for x in row]
print(flat)  # [1, 2, 3, 4, 5, 6]

# Method 2: itertools.chain
import itertools
flat = list(itertools.chain(*nested))
print(flat)  # [1, 2, 3, 4, 5, 6]

# Method 3: Loop
flat = []
for row in nested:
    flat.extend(row)
print(flat)  # [1, 2, 3, 4, 5, 6]

# Method 4: Recursive (for deeply nested)
def flatten(nested):
    flat = []
    for item in nested:
        if isinstance(item, list):
            flat.extend(flatten(item))
        else:
            flat.append(item)
    return flat

deeply_nested = [[1, [2, 3]], [4, [5, [6]]]]
print(flatten(deeply_nested))  # [1, 2, 3, 4, 5, 6]
```

---

### Q98: How do you sort a list of dictionaries?

**Answer:**

```python
students = [
    {'name': 'Alice', 'score': 85},
    {'name': 'Bob', 'score': 92},
    {'name': 'Charlie', 'score': 78}
]

# Sort by score
sorted_students = sorted(students, key=lambda x: x['score'])
print(sorted_students)
# [{'name': 'Charlie', 'score': 78}, {'name': 'Alice', 'score': 85}, {'name': 'Bob', 'score': 92}]

# Sort by name
sorted_students = sorted(students, key=lambda x: x['name'])

# Sort in reverse
sorted_students = sorted(students, key=lambda x: x['score'], reverse=True)
```

---

### Q99: How do you implement a factorial function?

**Answer:**

```python
# Iterative
def factorial_iterative(n):
    if n < 0:
        return "Invalid"
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

# Recursive
def factorial_recursive(n):
    if n < 0:
        return "Invalid"
    if n == 0 or n == 1:
        return 1
    return n * factorial_recursive(n - 1)

# Using math module
import math
result = math.factorial(5)

print(factorial_iterative(5))    # 120
print(factorial_recursive(5))    # 120
print(math.factorial(5))         # 120
```

---

### Q100: How do you implement a binary search?

**Answer:**

```python
# Requires sorted list
def binary_search(lst, target):
    left, right = 0, len(lst) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if lst[mid] == target:
            return mid  # Found
        elif lst[mid] < target:
            left = mid + 1  # Search right
        else:
            right = mid - 1  # Search left
    
    return -1  # Not found

numbers = [1, 3, 5, 7, 9, 11, 13, 15]
print(binary_search(numbers, 7))   # 3
print(binary_search(numbers, 10))  # -1

# Recursive version
def binary_search_recursive(lst, target, left=0, right=None):
    if right is None:
        right = len(lst) - 1
    
    if left > right:
        return -1
    
    mid = (left + right) // 2
    
    if lst[mid] == target:
        return mid
    elif lst[mid] < target:
        return binary_search_recursive(lst, target, mid + 1, right)
    else:
        return binary_search_recursive(lst, target, left, mid - 1)
```

---

## Complete Summary

### Sections Covered:
1. **Basics (Q1-15)** - Data types, operators, variables
2. **Data Structures (Q16-35)** - Lists, tuples, dicts, sets
3. **Functions & OOP (Q36-55)** - Functions, classes, inheritance
4. **Advanced Python (Q56-75)** - Decorators, generators, modules
5. **Libraries & Modules (Q76-85)** - Built-in modules, regex, unittest
6. **Coding & Problem Solving (Q86-100)** - Real problems and algorithms

---

## Most Important Questions for Interviews

**Must Know:**
- Q11: List vs Tuple vs Dict
- Q36: Functions
- Q38: Classes
- Q39: Inheritance
- Q42: Polymorphism
- Q48: Exceptions
- Q56: List Comprehension
- Q86-100: Coding problems

---

## Interview Tips

✅ Practice coding problems on paper first  
✅ Explain your thinking out loud  
✅ Ask clarifying questions  
✅ Test edge cases (empty, None, negative)  
✅ Optimize after it works  

Good luck! 🚀
