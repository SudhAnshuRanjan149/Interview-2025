# DAY 0 — Python OOP Foundations for AI/ML Engineers

# Goal of DAY 0

Before learning advanced AI/ML systems, you must understand:

- Object-Oriented Programming (OOP)
- Python class structure
- Python execution flow
- Real-world backend architecture concepts

This foundation is heavily used in:

- FastAPI
- LangChain
- LangGraph
- AI agents
- ML pipelines
- MLOps systems

---

# 1. WHAT IS OOP?

OOP stands for:
> Object-Oriented Programming

It is a programming paradigm where code is organized using:
- objects
- classes

instead of only functions.

---

# Why OOP Exists

Without OOP:
- code becomes messy
- duplication increases
- maintenance becomes difficult

OOP helps with:
- scalability
- reusability
- modularity
- maintainability

VERY IMPORTANT for:
- enterprise AI systems
- backend APIs
- large ML pipelines

---

# Real-World Analogy

## Example: Car

A real car has:
- color
- speed
- engine

and behaviors:
- start()
- stop()
- accelerate()

In OOP:
- Car = Class
- Individual car = Object

---

# 2. WHAT IS A CLASS?

A class is:
> A blueprint/template for creating objects.

---

# Example

```python
class Car:
    pass
```

This creates a blueprint.

No actual car yet.

---

# 3. WHAT IS AN OBJECT?

An object is:
> An instance created from a class.

---

# Example

```python
class Car:
    pass

bmw = Car()
audi = Car()
```

Now:
- bmw = object
- audi = object

Both are created from Car class.

---

# 4. IMPORTANT BLOCKS INSIDE PYTHON CLASS

# Structure Overview

```python
class MyClass:

    class_variable = "shared"

    def __init__(self):
        pass

    def method(self):
        pass


if __name__ == "__main__":
    pass
```

---

# 5. EXPLAINING EACH BLOCK

# A. Class Name

```python
class AIModel:
```

Defines class blueprint.

Convention:
- PascalCase

Examples:
- AIModel
- UserService
- ChatAgent

---

# B. Class Variables

```python
class AIModel:
    model_type = "LLM"
```

Shared across all objects.

---

# Theory

Class variables:
- belong to class itself
- shared among all instances

---

# Example

```python
class AIModel:
    model_type = "LLM"

m1 = AIModel()
m2 = AIModel()

print(m1.model_type)
print(m2.model_type)
```

Both share same value.

---

# Real AI Usage

Used for:
- shared configs
- model metadata
- constants

---

# C. __init__ Method

MOST IMPORTANT

---

# What is __init__?

```python
def __init__(self):
```

This is:
> Constructor method

Automatically runs when object is created.

---

# Purpose

Used to initialize object data.

---

# Example

```python
class AIModel:

    def __init__(self, name):
        self.name = name

model = AIModel("GPT-4")
```

---

# What is self?

VERY IMPORTANT interview question.

`self` refers to:
> current object instance

---

# Memory Understanding

```python
model = AIModel("GPT-4")
```

Internally:

```text
self ---> model object
```

---

# Real AI Example

```python
class EmbeddingModel:

    def __init__(self, model_name, dimension):
        self.model_name = model_name
        self.dimension = dimension
```

Used in:
- embedding pipelines
- vector DB systems
- inference services

---

# D. Instance Variables

```python
self.name = name
```

These belong to:
- individual object

---

# Example

```python
class User:

    def __init__(self, name):
        self.name = name

u1 = User("Alice")
u2 = User("Bob")
```

Each object has different value.

---

# E. Methods

Methods are:
> Functions inside class

---

# Example

```python
class Chatbot:

    def reply(self):
        print("Hello")
```

---

# Real AI Usage

Methods represent behaviors:

```python
class LLMService:

    def generate(self):
        pass

    def tokenize(self):
        pass

    def embed(self):
        pass
```

---

# F. __str__ Method

Used for:
> Human-readable object representation

---

# Example

```python
class User:

    def __init__(self, name):
        self.name = name

    def __str__(self):
        return self.name
```

---

# G. __repr__ Method

Used for:
> Developer/debug representation

Very common in production debugging.

---

# Example

```python
def __repr__(self):
    return f"User({self.name})"
```

---

# H. if __name__ == "__main__"

VERY IMPORTANT

---

# Theory

Python files can run in two ways:

1. Direct execution
2. Imported as module

---

# What is __name__?

Python automatically sets special variable:

```python
__name__
```

---

# Case 1 — Direct Execution

```python
python app.py
```

Then:

```python
__name__ == "__main__"
```

becomes TRUE.

---

# Case 2 — Imported

```python
import app
```

Then:

```python
__name__ == "app"
```

---

# Why Main Block Exists

Used to:
- prevent accidental execution
- separate reusable code
- run entry point logic

---

# Example

```python
class AIService:

    def start(self):
        print("Starting AI service")


if __name__ == "__main__":

    service = AIService()
    service.start()
```

---

# Production Usage

VERY IMPORTANT in:
- FastAPI apps
- ML pipelines
- CLI tools
- AI services

---

# 6. FOUR PILLARS OF OOP

# A. Encapsulation

## Theory

Wrapping:
- data
- methods

inside single unit.

---

# Example

```python
class Bank:

    def __init__(self):
        self.balance = 0
```

---

# AI Usage

Encapsulating:
- model state
- embeddings
- cache logic

---

# B. Inheritance

## Theory

Child class inherits parent properties.

---

# Example

```python
class BaseModel:

    def predict(self):
        pass


class GPTModel(BaseModel):
    pass
```

---

# Production AI Usage

Very common in:
- model wrappers
- LangChain tools
- AI agent systems

---

# C. Polymorphism

## Theory

Same method behaves differently.

---

# Example

```python
class OpenAIModel:

    def generate(self):
        return "OpenAI response"


class ClaudeModel:

    def generate(self):
        return "Claude response"
```

Same method:
- different behavior

---

# Real AI Usage

Used in:
- multi-model orchestration
- provider abstraction layers

---

# D. Abstraction

## Theory

Hide implementation complexity.

Expose only necessary interface.

---

# Example

```python
from abc import ABC, abstractmethod


class LLM(ABC):

    @abstractmethod
    def generate(self):
        pass
```

---

# Real AI Usage

Used heavily in:
- SDK design
- AI frameworks
- plugin systems

---

# 7. INTERVIEW QUESTIONS

# Q1:
Difference between class variable and instance variable?

---

# Expected Answer

| Class Variable | Instance Variable |
|---|---|
| Shared | Unique per object |
| Defined outside init | Defined inside init |

---

# Q2:
Why is self needed?

Expected Answer:
To access current object instance.

---

# Q3:
Difference between __str__ and __repr__?

Expected Answer:

| __str__ | __repr__ |
|---|---|
| User-friendly | Developer/debugging |
| Readable | Detailed |

---

# Q4:
Why use OOP in AI systems?

Expected Answer:
- modularity
- scalability
- reusable components
- easier testing
- maintainability

---

# 8. COMMON MISTAKES

# Mistake 1

Forgetting self.

BAD:

```python
def generate():
```

Correct:

```python
def generate(self):
```

---

# Mistake 2

Confusing class variables with instance variables.

---

# Mistake 3

Putting too much logic inside one class.

Violates:
- SOLID principles

---

# 9. SENIOR-LEVEL UNDERSTANDING

Senior engineers should explain:

- Why abstraction matters in large AI systems
- Why inheritance can become dangerous
- Why composition is often better than inheritance
- How OOP helps scaling AI platforms

---

# 10. REAL PRODUCTION AI ARCHITECTURE EXAMPLE

```python
class BaseLLM:

    def generate(self, prompt):
        pass


class OpenAIModel(BaseLLM):

    def generate(self, prompt):
        return "GPT response"


class ClaudeModel(BaseLLM):

    def generate(self, prompt):
        return "Claude response"


class AIOrchestrator:

    def __init__(self, model):
        self.model = model

    def run(self, prompt):
        return self.model.generate(prompt)
```

---

# Why This Design Is Powerful

Benefits:
- easy model switching
- scalable architecture
- reusable orchestration layer
- cleaner testing
- production maintainability

---

# DAY 0 REVISION CHECKLIST

✅ Class vs object  
✅ __init__ method  
✅ self keyword  
✅ Class variables  
✅ Instance variables  
✅ Methods  
✅ __str__ vs __repr__  
✅ Main block  
✅ Encapsulation  
✅ Inheritance  
✅ Polymorphism  
✅ Abstraction  
✅ Production AI architecture usage  
