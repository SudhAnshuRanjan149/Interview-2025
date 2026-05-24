# Top 5 Most Asked Python Coding Questions (DAY 0 + DAY 1)

These questions are extremely common in:

- AI/ML Engineer interviews
- Backend interviews
- GenAI engineering rounds
- Python screening rounds
- Senior engineering interviews

For EACH question, this document includes:

1. Problem Statement  
2. Theory Behind Problem  
3. 3 Different Approaches  
4. Time Complexity  
5. Space Complexity  
6. Why Complexity Matters  
7. Interview Discussion  
8. Production Relevance  

---

# QUESTION 1 — Reverse a String

# Problem

Reverse a string.

Input:

```python
"hello"
```

Output:

```python
"olleh"
```

---

# THEORY

## What is String Reversal?

String reversal means:
> Reordering characters from end to beginning.

---

# Important Theory

Strings in Python are:
- immutable
- ordered

Since immutable:
- original string cannot change
- new string is created

---

# Approach 1 — Using Slicing

## Code

```python
def reverse_string(s):
    return s[::-1]
```

---

# How It Works

Syntax:

```python
[start:end:step]
```

`-1` means:
- traverse backwards

---

# Time Complexity

## O(n)

Why?

Python visits every character once.

If string length = n:
- total operations proportional to n

---

# Space Complexity

## O(n)

Why?

New reversed string created in memory.

---

# Interview Discussion

Pros:
- concise
- optimized internally
- pythonic

Cons:
- interviewer may ask internal implementation

---

# Approach 2 — Using Loop

## Code

```python
def reverse_string(s):

    rev = ""

    for char in s:
        rev = char + rev

    return rev
```

---

# Time Complexity

## O(n²)

VERY IMPORTANT

---

# Why O(n²)?

String concatenation creates NEW string every time.

Example:

```python
"a" + "bc"
```

creates new memory object.

For n characters:
- repeated copying happens

Total cost becomes quadratic.

---

# Space Complexity

## O(n)

New reversed string stored.

---

# Interview Insight

Many candidates incorrectly say O(n).

Senior engineers explain:
- string immutability
- repeated memory allocations

---

# Approach 3 — Using Two Pointers

## Code

```python
def reverse_string(s):

    chars = list(s)

    left = 0
    right = len(chars) - 1

    while left < right:

        chars[left], chars[right] = chars[right], chars[left]

        left += 1
        right -= 1

    return "".join(chars)
```

---

# Time Complexity

## O(n)

Single traversal.

---

# Space Complexity

## O(n)

Because:
- list conversion creates new memory

---

# Production Relevance

Used in:
- token processing
- preprocessing pipelines
- NLP transformations

---

# QUESTION 2 — Find Duplicates in List

# Problem

Find duplicate numbers.

Input:

```python
[1,2,3,2,4,1]
```

Output:

```python
[1,2]
```

---

# THEORY

This problem tests:
- hashing
- lookup optimization
- time-space tradeoff

VERY IMPORTANT for:
- caching systems
- embeddings
- recommendation systems

---

# Approach 1 — Nested Loops

## Code

```python
def find_duplicates(nums):

    duplicates = []

    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):

            if nums[i] == nums[j]:
                duplicates.append(nums[i])

    return list(set(duplicates))
```

---

# Time Complexity

## O(n²)

Why?

Two nested loops.

For n elements:
- inner loop runs n times

Total:
n × n

---

# Space Complexity

## O(k)

k = duplicates stored.

---

# Approach 2 — Using Set

## Code

```python
def find_duplicates(nums):

    seen = set()
    duplicates = set()

    for num in nums:

        if num in seen:
            duplicates.add(num)

        seen.add(num)

    return list(duplicates)
```

---

# Time Complexity

## O(n)

Why?

Set lookup:
- average O(1)

Loop runs n times.

---

# Space Complexity

## O(n)

Need extra memory for set.

---

# Why Sets Are Fast

Sets use:
- hash tables

Hash lookup:
- constant time average

---

# Approach 3 — Using Counter

## Code

```python
from collections import Counter

def find_duplicates(nums):

    freq = Counter(nums)

    return [k for k, v in freq.items() if v > 1]
```

---

# Time Complexity

## O(n)

Counter internally traverses once.

---

# Space Complexity

## O(n)

Stores frequency map.

---

# Production Usage

Used in:
- duplicate embeddings
- cache deduplication
- event stream cleaning

---

# QUESTION 3 — Flatten Nested List

# Problem

Convert:

```python
[[1,2],[3,4],[5]]
```

to:

```python
[1,2,3,4,5]
```

---

# THEORY

Tests:
- recursion
- iteration
- memory efficiency

VERY IMPORTANT in:
- JSON processing
- AI pipelines
- nested model outputs

---

# Approach 1 — Nested Loops

## Code

```python
def flatten(arr):

    result = []

    for sublist in arr:
        for item in sublist:
            result.append(item)

    return result
```

---

# Time Complexity

## O(n)

All elements visited once.

---

# Space Complexity

## O(n)

Need result list.

---

# Approach 2 — List Comprehension

## Code

```python
def flatten(arr):

    return [item for sublist in arr for item in sublist]
```

---

# Time Complexity

## O(n)

---

# Space Complexity

## O(n)

---

# Why Preferred?

- cleaner
- faster internally
- pythonic

---

# Approach 3 — Recursive Flatten

## Code

```python
def flatten(arr):

    result = []

    for item in arr:

        if isinstance(item, list):
            result.extend(flatten(item))
        else:
            result.append(item)

    return result
```

---

# Time Complexity

## O(n)

Every element visited once.

---

# Space Complexity

## O(d)

d = recursion depth

PLUS result storage.

---

# Interview Insight

Senior candidates discuss:
- recursion stack
- deep nesting risks
- iterative alternatives

---

# QUESTION 4 — Check Palindrome

# Problem

Check if string reads same forward and backward.

Input:

```python
"madam"
```

Output:

```python
True
```

---

# THEORY

Tests:
- string manipulation
- pointers
- optimization thinking

---

# Approach 1 — Reverse String

## Code

```python
def is_palindrome(s):

    return s == s[::-1]
```

---

# Time Complexity

## O(n)

---

# Space Complexity

## O(n)

New reversed string created.

---

# Approach 2 — Two Pointers

## Code

```python
def is_palindrome(s):

    left = 0
    right = len(s) - 1

    while left < right:

        if s[left] != s[right]:
            return False

        left += 1
        right -= 1

    return True
```

---

# Time Complexity

## O(n)

Half traversal.

Still proportional to n.

---

# Space Complexity

## O(1)

VERY IMPORTANT.

No extra memory.

---

# Why Better?

Memory optimized.

Preferred in:
- large-scale systems
- streaming systems

---

# Approach 3 — Recursion

## Code

```python
def is_palindrome(s):

    if len(s) <= 1:
        return True

    if s[0] != s[-1]:
        return False

    return is_palindrome(s[1:-1])
```

---

# Time Complexity

## O(n)

---

# Space Complexity

## O(n)

Due to:
- recursion stack
- slicing memory

---

# QUESTION 5 — Group Anagrams

# Problem

Input:

```python
["eat","tea","tan","ate","nat","bat"]
```

Output:

```python
[
 ["eat","tea","ate"],
 ["tan","nat"],
 ["bat"]
]
```

---

# THEORY

Tests:
- hashing
- string manipulation
- dictionary optimization

VERY IMPORTANT for:
- NLP systems
- token grouping
- search systems

---

# Approach 1 — Sorting Key

## Code

```python
from collections import defaultdict

def group_anagrams(words):

    groups = defaultdict(list)

    for word in words:

        key = "".join(sorted(word))

        groups[key].append(word)

    return list(groups.values())
```

---

# Time Complexity

## O(n * k log k)

Where:
- n = number of words
- k = average word length

Sorting each word:
- O(k log k)

Done for n words.

---

# Space Complexity

## O(nk)

Storage for groups.

---

# Approach 2 — Character Frequency Count

## Code

```python
from collections import defaultdict

def group_anagrams(words):

    groups = defaultdict(list)

    for word in words:

        count = [0] * 26

        for ch in word:
            count[ord(ch) - ord('a')] += 1

        groups[tuple(count)].append(word)

    return list(groups.values())
```

---

# Time Complexity

## O(n * k)

Why faster?

No sorting.

Only frequency counting.

---

# Space Complexity

## O(nk)

---

# Interview Insight

Senior candidates explain:
- avoiding sorting overhead
- hash optimization
- tuple immutability

---

# Approach 3 — Prime Number Hashing

## Theory

Assign prime number to each character.

Multiply primes to create unique signature.

Rare but advanced discussion topic.

---

# Complexity

## Time Complexity

O(n * k)

---

# Space Complexity

O(n)

---

# Senior-Level Complexity Understanding

# What Does O(n) Mean?

Operations grow linearly.

If input doubles:
runtime roughly doubles.

---

# What Does O(n²) Mean?

Operations grow quadratically.

If input doubles:
runtime becomes ~4x.

Dangerous for:
- big datasets
- AI pipelines
- inference systems

---

# Why Space Complexity Matters in AI

AI systems process:
- huge embeddings
- massive datasets
- streaming inputs

Memory optimization becomes critical.

---

# Most Important Complexity Questions Asked

# Q1:
Why is set lookup O(1)?

Expected Answer:
Hash table implementation.

---

# Q2:
Why is string concatenation expensive?

Expected Answer:
Strings are immutable.

New memory allocated every time.

---

# Q3:
Why can recursion become dangerous?

Expected Answer:
Stack overflow risk.

---

# Q4:
When should you trade memory for speed?

Expected Answer:
Caching/hash maps improve speed but increase memory usage.

---

# Most Important Interview Advice

Interviewers care about:

| Junior Candidate | Senior Candidate |
|---|---|
| Solves problem | Explains tradeoffs |
| Writes code | Explains memory impact |
| Knows syntax | Explains internals |
| Uses hashmap | Explains hashing complexity |

---

# Recommended Practice Order

1. Reverse String
2. Palindrome
3. Find Duplicates
4. Flatten List
5. Group Anagrams

Then move to:
- Sliding window
- Hash maps
- Two pointers
- Recursion
- Dynamic programming
