# Senior AI/ML + Generative AI Interview Preparation

# DAY 1 — Python Foundations (Theory + Production + Interview Focus)

---

# Topic: Mutable vs Immutable Objects in Python

---

# 1. THEORY

## What is an Object in Python?

Everything in Python is an object.

Examples:
- integers
- strings
- lists
- functions
- classes

Each object has:
- identity (memory address)
- type
- value

---

## What Does “Mutable” Mean?

Mutable means:
> The object can be modified after creation.

You can change:
- values
- elements
- contents

WITHOUT creating a new object.

---

## What Does “Immutable” Mean?

Immutable means:
> The object cannot be changed after creation.

If you modify it:
Python creates a NEW object in memory.

---

# Examples

| Mutable | Immutable |
|---|---|
| list | int |
| dict | float |
| set | string |
| bytearray | tuple |

---

# 2. INTERNAL MEMORY UNDERSTANDING

## Immutable Example

```python
x = 10
```

Memory:

```text
x ---> 10
```

Now:

```python
x = x + 1
```

Python creates NEW object:

```text
x ---> 11
```

Old object `10` may be garbage collected.

---

## Mutable Example

```python
a = [1, 2]
```

Memory:

```text
a ---> [1,2]
```

Now:

```python
a.append(3)
```

Same object modified:

```text
a ---> [1,2,3]
```

No new object created.

---

# 3. WHY PYTHON HAS IMMUTABLE OBJECTS

# Advantages

## 1. Thread Safety

Immutable objects are safer in concurrent systems.

Reason:
No accidental modification.

VERY IMPORTANT in:
- distributed AI systems
- multithreaded inference servers

---

## 2. Hashability

Immutable objects can become dictionary keys.

Example:

```python
d = {
    "model": "gpt"
}
```

Why strings work as keys:
Because strings are immutable.

---

## 3. Predictability

No hidden side effects.

Good for:
- debugging
- caching
- functional programming

---

# 4. WHAT DOES “ORDERED” MEAN?

Ordered means:
> Elements maintain insertion order.

Example:

```python
a = [10, 20, 30]
```

Order preserved:
- 10
- 20
- 30

---

# Ordered vs Unordered

| Data Structure | Ordered? |
|---|---|
| List | Yes |
| Tuple | Yes |
| Dict | Yes (Python 3.7+) |
| Set | No |

---

# Why Ordering Matters in AI Systems

## Example: Chat History

Conversation order matters.

Wrong:

```python
set(messages)
```

Why bad?
Set destroys order.

Correct:
Use list.

---

# 5. REAL-WORLD PRODUCTION SCENARIOS

# Scenario 1 — Embedding Pipeline Bug

## Problem

Original embeddings changed unexpectedly.

Code:

```python
def normalize(vectors):
    vectors.append([0.1, 0.2])
```

Issue:
List is mutable.

Original data modified accidentally.

---

# Fix

Use copy:

```python
vectors.copy()
```

or:

```python
deepcopy(vectors)
```

---

# Scenario 2 — Caching Failure

## Problem

Using list as dictionary key:

```python
cache[[1,2]] = "embedding"
```

Error occurs.

Why?

Lists are mutable → not hashable.

---

# Correct

Use tuple:

```python
cache[(1,2)] = "embedding"
```

---

# 6. INTERVIEW QUESTIONS

## Q1:
Why are strings immutable in Python?

### Expected Answer

Reasons:
- memory optimization
- interning
- thread safety
- hashability
- performance

---

## Q2:
Why can tuples be dictionary keys but lists cannot?

### Expected Answer

Tuple:
- immutable
- hashable

List:
- mutable
- hash value can change

---

## Q3:
Why are immutable objects safer in distributed AI systems?

### Expected Answer

Avoids:
- race conditions
- accidental state mutation
- inconsistent shared state

---

# 7. COMMON MISTAKES

## Mistake 1

Modifying original list unintentionally.

---

## Mistake 2

Using mutable default arguments.

BAD:

```python
def add(item, arr=[]):
    arr.append(item)
```

VERY COMMON interview question.

---

# Correct

```python
def add(item, arr=None):
    arr = arr or []
```

---

# 8. SENIOR-LEVEL UNDERSTANDING

# Interviewers Expect You To Explain

| Basic Candidate | Senior Candidate |
|---|---|
| List is mutable | Explains memory implications |
| Tuple is immutable | Explains hashability + thread safety |
| Dict is ordered | Explains Python 3.7 implementation |
| Uses deepcopy | Explains nested object references |

---

# 9. ADVANCED INTERNALS

## What is Hashability?

Hashability means:
> Object has fixed hash value during lifetime.

Needed for:
- dictionary keys
- sets
- caching

---

## Why Mutable Objects Are Dangerous as Keys

Imagine:

```python
x = [1,2]
```

Hash depends on content.

If content changes:

```python
x.append(3)
```

Hash changes.

Dictionary lookup breaks.

That’s why Python disallows it.

---

# 10. PRODUCTION AI SYSTEM CONNECTIONS

# Where This Appears in Real AI Systems

| Area | Usage |
|---|---|
| Embedding caching | Immutable keys |
| Redis cache | Hashable objects |
| Agent memory | Ordered conversation storage |
| Vector pipelines | Avoid mutation bugs |
| Async systems | Immutable shared configs |
| ML preprocessing | Deep copy protection |

---

# HOW ALL YOUR NOTES SHOULD BE STRUCTURED

For every topic:

1. Definition
2. Why it exists
3. Internal working
4. Real-world analogy
5. Production usage
6. Interview questions
7. Coding examples
8. Common mistakes
9. Optimization techniques
10. Senior-level insights

---

# Recommended Study Method

For EACH topic:

| Step | Action |
|---|---|
| 1 | Learn theory |
| 2 | Understand internals |
| 3 | Write code |
| 4 | Build mini project |
| 5 | Solve interview questions |
| 6 | Explain aloud |
| 7 | Connect to production systems |

---

# DAY 1 REVISION CHECKLIST

✅ Mutable vs immutable  
✅ Ordered vs unordered  
✅ Hashability  
✅ Deep copy vs shallow copy  
✅ Production debugging scenarios  
✅ Interview-focused explanations  
✅ AI system relevance  
