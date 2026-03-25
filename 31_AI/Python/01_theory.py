'''

# 🟢 1. Basics (Foundation – MUST BE STRONG)

### 📌 Concepts:
- Variables & Data Types  
  - int, float, str, bool, list, tuple, dict, set
- Input / Output  
- Type casting  
- Operators (arithmetic, logical, comparison)

'''


# 🟢 1. Basics (Foundation – MUST BE STRONG)
# ### Variables & Data Types
x = 10          # int
y = 3.14        # float
name = "Alice"  # str
is_valid = True # bool 


print("Integer:", x)
print("Float:", y)
print("String:", name)
print("Boolean:", is_valid)

# ------------------------------------------

### Type casting
x = "10"           # string
y = int(x)         # convert to int → 10
z = float(x)       # convert to float → 10.0
s = str(25)        # convert to string → "25"

print("Converted to int:", y)
print("Converted to float:", z)
print("Converted to string:", s)   


# ------------------------------------------

list1 = [1, 2, 3] #list 
print("List:", list1)

# About List: Ordered, mutable collection of elements
# Mutable means you can change the contents of the list after it has been created.
# You can add, remove, or modify elements in a list.
# Methods: append(), pop(), sort(), etc.

tuple1 = (4, 5, 6) #tuple
print("Tuple:", tuple1)

# About Tuple: Ordered, immutable collection of elements
# Immutable means you cannot change the contents of the tuple after it has been created.
# Methods: count(), index(), etc.

dict1 = {"name": "Alice", "age": 30} #dictionary
print("Dictionary:", dict1)

# About Dictionary: Unordered collection of key-value pairs
# Keys must be unique and immutable (e.g., strings, numbers, tuples)
# Values can be of any type

set1 = {7, 8, 9} #set
print("Set:", set1)

# About Set: Unordered collection of unique elements
# Methods: add(), remove(), discard(), etc.

# ------------------------------------------


# List Methods - list1 = [1, 2, 3]
list1.append(4)        # [1, 2, 3, 4] - append() adds an element to the end of the list.
list1.pop()            # [1, 2, 3] (removes 4) - pop() removes the last element by default, but you can also specify an index to remove a specific element.
list1.insert(1, 99)    # [1, 99, 2, 3] - inserts 99 at index 1
list1.remove(99)       # [1, 2, 3] - removes the first occurrence of 99
list1.sort()           # already sorted - sorts the list in ascending order
list1.reverse()        # [3, 2, 1] - reverses the order of the list
list2 = list1.copy()   # creates a shallow copy of the list
list2.sort(reverse=True)  # sorts list2 in descending order

print("Modified List:", list1)
print("Count of 2 in List:", list1.count(2))  # 1
print("Index of 3 in List:", list1.index(3))  # 2
list1.extend([5, 6])     # [3, 2, 1, 5, 6]
print("Extended List:", list1)  # [3, 2, 1, 5, 6]
list1.clear()           # [] (removes all elements)
print("Cleared List:", list1)  # []


# ------------------------------------------

# tuple1 Methods - tuple1 = (4, 5, 6)
print("Count of 5 in Tuple:", tuple1.count(5))  # 1 - counts how many times 5 appears in the tuple
print("Index of 6 in Tuple:", tuple1.index(6))  # 2 - finds the index of the first occurrence of 6 in the tuple

# converting tuple to list to modify it
temp_list = list(tuple1)  # convert tuple to list
temp_list.append(7)       # modify the list
tuple1 = tuple(temp_list) # convert back to tuple
print("Modified Tuple:", tuple1)  # (4, 5, 6, 7)


# ------------------------------------------


# dictionary Methods - dict1 = {"name": "Alice", "age": 30}
print("Keys in Dictionary:", dict1.keys())  # dict_keys(['name', 'age']) - returns a view object of the dictionary's keys
print("Values in Dictionary:", dict1.values())  # dict_values(['Alice', 30]) - returns a view object of the dictionary's values
print("Items in Dictionary:", dict1.items())  # dict_items([('name', 'Alice'), ('age', 30)]) - returns a view object of the dictionary's key-value pairs

print("Get 'name':", dict1.get("name")) # Alice # get() method - returns the value for a key if it exists, otherwise returns a default value
print("Get 'city' with default:", dict1.get("city", "Unknown"))  # Unknown (since 'city' key doesn't exist)

dict1["city"] = "New York"  # adds a new key-value pair to the dictionary
print("Updated Dictionary:", dict1)  # {'name': 'Alice', 'age': 30, 'city': 'New York'}

dict1.pop("age", None)  # removes the key 'age' and its associated value from the dictionary - can give a default value to return if key doesn't exist
print("After popping 'age':", dict1)  # {'name': 'Alice', 'city': 'New York'}

# popitem() - removes and returns an arbitrary key-value pair from the dictionary (useful for LIFO or FIFO operations)
popped_item = dict1.popitem()  # removes the last inserted key-value pair ('city', 'New York')
print("Popped Item:", popped_item)  # ('city', 'New York')

# update() - updates the dictionary with key-value pairs from another dictionary or an iterable of key-value pairs
dict1.update({"age": 30, "country": "USA"})  # updates dict1 with new key-value pairs
print("After update:", dict1)  # {'name': 'Alice', 'age': 30, 'country': 'USA'}

dict1.setdefault("hobby", "Reading")  # adds 'hobby' key with value 'Reading' if it doesn't exist
print("After setdefault:", dict1)  # {'name': 'Alice', 'age': 30, 'country': 'USA', 'hobby': 'Reading'}

dict1_copy = dict1.copy()  # returns a shallow copy of the dictionary
print("Copied Dictionary:", dict1_copy)  # {'name': 'Alice', 'age': 30, 'country': 'USA', 'hobby': 'Reading'}

dict1.clear()  # removes all key-value pairs from the dictionary
print("Cleared Dictionary:", dict1)  # {}


# ------------------------------------------

# set Methods - set1 = {7, 8, 9}
set1.add(10)  # adds 10 to the set
print("After adding 10:", set1)  # {7, 8, 9, 10}

set1.remove(8)  # removes 8 from the set (raises KeyError if 8 is not present)
print("After removing 8:", set1)  # {7, 9, 10}

set1.discard(9)  # removes 9 from the set (does nothing if 9 is not present)
print("After discarding 9:", set1)  # {7, 10}

set1.update({11, 12})  # adds multiple elements to the set
print("After updating with {11, 12}:", set1)  # {7, 10, 11, 12}

# pop() - removes arbitrary element
item = set1.pop()   # removes random element

# Set Operations
set2 = {10, 12, 13}

union = set1.union(set2)              # {7, 10, 11, 12, 13}
intersection = set1.intersection(set2) # {10, 12}
difference = set1.difference(set2)     # {7, 11}
sym_diff = set1.symmetric_difference(set2)  # {7, 11, 13}

# copy() - shallow copy
set3 = set1.copy()

set1.clear()  # removes all elements from the set
print("Cleared Set:", set1)  # set()


# ------------------------------------------

# Input / Output
name = input("Enter your name: ")  # takes user input as a string
age = int(input("Enter your age: "))  # takes user input and converts it to an integer
print(f"Hello, {name}! You are {age} years old.")  # formatted string output

# ------------------------------------------

# Type Casting
num_str = "123"
num_int = int(num_str)  # converts string to integer
num_float = float(num_str)  # converts string to float
num_str_back = str(num_int)  # converts integer back to string

# ------------------------------------------

# Operators

# Arithmetic Operators
x = 10
y = 3
print("Addition:", x + y)  # 13
print("Subtraction:", x - y)  # 7
print("Multiplication:", x * y)  # 30
print("Division:", x / y)  # 3.3333333333333335
print("Modulus:", x % y)  # 1
print("Exponentiation:", x ** y)  # 1000
print("Floor Division:", x // y)  # 3

# Logical Operators
x = True
y = False
z = x and y  # False
w = x or y   # True
v = not x    # False

print("AND:", z)  # False
print("OR:", w)   # True
print("NOT:", v)  # False

# Comparison Operators
a = 5
b = 10
print("Equal:", a == b)  # False
print("Not Equal:", a != b)  # True
print("Greater than:", a > b)  # False
print("Less than:", a < b)  # True
print("Greater than or equal:", a >= b)  # False
print("Less than or equal:", a <= b)  # True





# -------------------------------------------


'''

# 🔁 2. Control Flow

### 📌 Concepts:
- if / else / elif  
- for loop, while loop  
- break, continue, pass  


'''


# --------------------------------------------



### if / else / elif
x = 10
if x > 0:
    print("Positive")
elif x < 0:
    print("Negative")
else:
    print("Zero")


# --------------------------------------------

### for loop
for i in range(5):
    print(i)

# --------------------------------------------

### while loop
i = 0
while i < 5:
    print(i)
    i += 1

# --------------------------------------------

### break, continue, pass
for i in range(10):
    if i == 3:
        continue  # skip the rest of the loop for i=3
    if i == 7:
        break     # exit the loop when i=7
    print(i)


# ---------------------------------------------------------------


'''

# 📦 3. Data Structures (VERY IMPORTANT 🔥)

### 📌 Lists
- slicing, indexing  
- list methods (append, pop, sort)

### 📌 Tuples
- immutable nature  

### 📌 Sets
- unique elements  
- union, intersection  

### 📌 Dictionaries
- key-value pairs  
- hashing concept  

'''


# --------------------------------------------



