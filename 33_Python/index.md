# 🐍 Python Mastery Roadmap — Beginner to Advanced

> **Goal**: Complete Python mastery from zero to interview-ready.
> **Structure**: Topics are grouped by level — work through them in order.
> **Legend**: `[ ]` Not started · `[/]` In Progress · `[x]` Done

---

## 📋 Table of Contents

1. [Phase 1 — Foundations (Beginner)](#phase-1--foundations-beginner)
2. [Phase 2 — Core Python (Intermediate)](#phase-2--core-python-intermediate)
3. [Phase 3 — Advanced Python](#phase-3--advanced-python)
4. [Phase 4 — Python for DSA & Problem Solving](#phase-4--python-for-dsa--problem-solving)
5. [Phase 5 — Python Ecosystem & Real-World Skills](#phase-5--python-ecosystem--real-world-skills)
6. [Phase 6 — Expert-Level Python](#phase-6--expert-level-python)

---

## Phase 1 — Foundations (Beginner)

> **Duration**: ~2–3 weeks
> **Goal**: Understand Python syntax, data types, and control flow.

### 1.1 Getting Started
- [ ] What is Python? History and use cases
- [ ] Installing Python & setting up the environment (Python 3.x)
- [ ] Python IDEs: VS Code, PyCharm, Jupyter Notebook
- [ ] Running Python: Script mode vs Interactive mode (REPL)
- [ ] Python 2 vs Python 3 key differences
- [ ] `print()`, `input()`, comments (`#`, `"""`)

### 1.2 Variables & Data Types
- [ ] Variables: declaration, naming conventions (PEP 8)
- [ ] `int` — Integers and arithmetic
- [ ] `float` — Floating point numbers
- [ ] `complex` — Complex numbers
- [ ] `bool` — Boolean (`True` / `False`)
- [ ] `str` — Strings (single, double, triple quotes)
- [ ] `type()` and `isinstance()`
- [ ] Type casting: `int()`, `float()`, `str()`, `bool()`
- [ ] `None` type

### 1.3 Operators
- [ ] Arithmetic operators: `+`, `-`, `*`, `/`, `//`, `%`, `**`
- [ ] Comparison operators: `==`, `!=`, `>`, `<`, `>=`, `<=`
- [ ] Logical operators: `and`, `or`, `not`
- [ ] Assignment operators: `=`, `+=`, `-=`, `*=`, `/=`, `//=`, `%=`, `**=`
- [ ] Bitwise operators: `&`, `|`, `^`, `~`, `<<`, `>>`
- [ ] Identity operators: `is`, `is not`
- [ ] Membership operators: `in`, `not in`
- [ ] Operator precedence and associativity

### 1.4 Strings (Deep Dive)
- [ ] String indexing and slicing (`s[0]`, `s[1:5]`, `s[::-1]`)
- [ ] String immutability
- [ ] String methods: `upper()`, `lower()`, `strip()`, `split()`, `join()`, `replace()`, `find()`, `count()`, `startswith()`, `endswith()`, `isalpha()`, `isdigit()`, `isalnum()`
- [ ] String formatting: `%`, `.format()`, f-strings (PEP 498)
- [ ] Multiline strings
- [ ] Escape characters: `\n`, `\t`, `\\`, `\'`, `\"`
- [ ] Raw strings: `r"..."`
- [ ] String concatenation and repetition
- [ ] `len()`, `ord()`, `chr()`

### 1.5 Control Flow
- [ ] `if` / `elif` / `else`
- [ ] Nested conditionals
- [ ] Ternary / conditional expression: `x if condition else y`
- [ ] `while` loop
- [ ] `for` loop
- [ ] `range()` function
- [ ] `break`, `continue`, `pass`
- [ ] `else` clause with loops
- [ ] Nested loops

### 1.6 Built-in Functions (Basic)
- [ ] `print()`, `input()`
- [ ] `len()`, `type()`, `id()`
- [ ] `abs()`, `round()`, `pow()`, `divmod()`
- [ ] `min()`, `max()`, `sum()`
- [ ] `sorted()`, `reversed()`
- [ ] `range()`, `enumerate()`, `zip()`
- [ ] `map()`, `filter()`

---

## Phase 2 — Core Python (Intermediate)

> **Duration**: ~3–4 weeks
> **Goal**: Master data structures, functions, and OOP.

### 2.1 Lists
- [ ] Creating and accessing lists
- [ ] List indexing and slicing
- [ ] List mutability
- [ ] List methods: `append()`, `extend()`, `insert()`, `remove()`, `pop()`, `clear()`, `index()`, `count()`, `sort()`, `reverse()`, `copy()`
- [ ] List comprehensions: `[expr for item in iterable if condition]`
- [ ] Nested lists (2D arrays)
- [ ] `del` statement
- [ ] Unpacking: `a, b, c = [1, 2, 3]`
- [ ] Spread operator: `*`

### 2.2 Tuples
- [ ] Creating tuples (with single element: `(1,)`)
- [ ] Tuple immutability
- [ ] Tuple indexing and slicing
- [ ] Tuple methods: `count()`, `index()`
- [ ] Tuple packing and unpacking
- [ ] Named tuples (`collections.namedtuple`)
- [ ] When to use tuples vs lists

### 2.3 Dictionaries
- [ ] Creating dictionaries: `{}`, `dict()`
- [ ] Accessing, adding, updating, deleting keys
- [ ] Dictionary methods: `keys()`, `values()`, `items()`, `get()`, `setdefault()`, `update()`, `pop()`, `popitem()`, `clear()`, `copy()`
- [ ] Dictionary comprehensions
- [ ] Nested dictionaries
- [ ] Merging dictionaries (`|` operator, `{**d1, **d2}`)
- [ ] `defaultdict` and `OrderedDict` from `collections`
- [ ] Dictionary iteration patterns

### 2.4 Sets
- [ ] Creating sets: `{}`, `set()`
- [ ] Set properties: unordered, unique elements
- [ ] Set operations: union `|`, intersection `&`, difference `-`, symmetric difference `^`
- [ ] Set methods: `add()`, `remove()`, `discard()`, `pop()`, `clear()`, `union()`, `intersection()`, `difference()`, `issubset()`, `issuperset()`, `isdisjoint()`
- [ ] Set comprehensions
- [ ] `frozenset`

### 2.5 Functions
- [ ] Defining functions: `def`
- [ ] Parameters vs arguments
- [ ] Default parameter values
- [ ] Keyword arguments
- [ ] `*args` — Variable positional arguments
- [ ] `**kwargs` — Variable keyword arguments
- [ ] Return values and `return` statement
- [ ] Multiple return values (tuple unpacking)
- [ ] Docstrings
- [ ] Variable scope: Local, Enclosing, Global, Built-in (LEGB rule)
- [ ] `global` and `nonlocal` keywords
- [ ] Lambda functions: `lambda x: x + 1`
- [ ] Higher-order functions: passing and returning functions
- [ ] Recursion and base cases
- [ ] Memoization (manual and `functools.lru_cache`)

### 2.6 Object-Oriented Programming (OOP)
- [ ] Classes and objects
- [ ] `__init__()` constructor
- [ ] Instance variables vs class variables
- [ ] Instance methods, class methods (`@classmethod`), static methods (`@staticmethod`)
- [ ] `self` parameter
- [ ] **Encapsulation**: Public, protected (`_`), private (`__`) attributes
- [ ] **Inheritance**: Single, multilevel, multiple
- [ ] `super()` function
- [ ] Method overriding
- [ ] **Polymorphism**: Duck typing, method overriding
- [ ] **Abstraction**: Abstract classes (`abc` module), `@abstractmethod`
- [ ] Special / Dunder methods: `__str__`, `__repr__`, `__len__`, `__eq__`, `__lt__`, `__add__`, `__contains__`, `__iter__`, `__next__`, `__getitem__`, `__setitem__`, `__del__`, `__call__`
- [ ] `__slots__`
- [ ] Dataclasses (`@dataclass`)
- [ ] `property` decorator: getters, setters, deleters
- [ ] MRO — Method Resolution Order (`__mro__`, C3 linearization)

### 2.7 Modules & Packages
- [ ] Importing modules: `import`, `from ... import`, `import ... as`
- [ ] Creating your own module
- [ ] `__name__` and `if __name__ == "__main__"`
- [ ] Python Standard Library overview
- [ ] Packages and `__init__.py`
- [ ] Relative vs absolute imports
- [ ] `sys.path` and `PYTHONPATH`

### 2.8 File Handling
- [ ] Opening files: `open()`, modes (`r`, `w`, `a`, `rb`, `wb`)
- [ ] Reading: `read()`, `readline()`, `readlines()`
- [ ] Writing: `write()`, `writelines()`
- [ ] Context manager: `with open(...) as f:`
- [ ] File methods: `seek()`, `tell()`, `flush()`, `close()`
- [ ] Working with paths: `os.path`, `pathlib.Path`
- [ ] Reading/writing CSV files: `csv` module
- [ ] Reading/writing JSON: `json` module
- [ ] Binary file I/O

### 2.9 Exception Handling
- [ ] Errors vs Exceptions
- [ ] `try`, `except`, `else`, `finally`
- [ ] Catching specific exceptions
- [ ] Catching multiple exceptions
- [ ] `Exception` hierarchy
- [ ] Raising exceptions: `raise`
- [ ] Custom exceptions (user-defined exception classes)
- [ ] `assert` statement
- [ ] Context managers and exception safety

---

## Phase 3 — Advanced Python

> **Duration**: ~4–5 weeks
> **Goal**: Master Pythonic idioms, metaprogramming, and performance.

### 3.1 Iterators & Generators
- [ ] Iterables vs Iterators
- [ ] `iter()` and `next()`
- [ ] The Iterator Protocol (`__iter__`, `__next__`)
- [ ] Custom iterators
- [ ] Generator functions with `yield`
- [ ] Generator expressions: `(x**2 for x in range(10))`
- [ ] `send()` method on generators
- [ ] `yield from` — delegating to sub-generators
- [ ] Infinite generators
- [ ] `itertools` module: `count`, `cycle`, `repeat`, `chain`, `islice`, `product`, `permutations`, `combinations`, `groupby`, `starmap`, `accumulate`

### 3.2 Decorators
- [ ] First-class functions recap
- [ ] Closures and `nonlocal`
- [ ] What is a decorator?
- [ ] Writing a basic decorator
- [ ] `functools.wraps` — preserving metadata
- [ ] Decorators with arguments (decorator factories)
- [ ] Stacking multiple decorators
- [ ] Class-based decorators
- [ ] Built-in decorators: `@property`, `@staticmethod`, `@classmethod`, `@functools.lru_cache`, `@functools.cache`, `@functools.total_ordering`
- [ ] Practical decorator patterns: timing, logging, retry, authentication

### 3.3 Context Managers
- [ ] `with` statement internals
- [ ] `__enter__` and `__exit__` protocol
- [ ] Writing class-based context managers
- [ ] `contextlib.contextmanager` decorator
- [ ] `contextlib.suppress`
- [ ] Nested context managers
- [ ] Use cases: file handling, DB connections, locks

### 3.4 Comprehensions (Advanced)
- [ ] List comprehensions (nested)
- [ ] Dictionary comprehensions
- [ ] Set comprehensions
- [ ] Generator expressions
- [ ] Walrus operator `:=` (assignment expressions, PEP 572)
- [ ] When NOT to use comprehensions (readability)

### 3.5 Functional Programming
- [ ] Pure functions and side effects
- [ ] `map()`, `filter()`, `reduce()` (`functools.reduce`)
- [ ] `functools.partial` — partial function application
- [ ] Immutability patterns
- [ ] `operator` module
- [ ] Function pipelines

### 3.6 Type Hints & Annotations
- [ ] Basic type hints: `int`, `str`, `float`, `bool`, `None`
- [ ] `typing` module: `List`, `Dict`, `Tuple`, `Set`, `Optional`, `Union`, `Any`
- [ ] `typing.Callable`, `typing.Iterator`, `typing.Generator`
- [ ] `typing.TypeVar` — Generic types
- [ ] `typing.Protocol` — Structural subtyping
- [ ] `dataclasses` with type hints
- [ ] `TypedDict`
- [ ] `Literal`, `Final`, `ClassVar`
- [ ] Runtime type checking vs static analysis (`mypy`)
- [ ] Python 3.10+ union syntax: `int | str`

### 3.7 Concurrency & Parallelism
- [ ] Concurrency vs Parallelism vs Asynchrony
- [ ] GIL — Global Interpreter Lock (what it is and its impact)
- [ ] **Threading**: `threading` module, `Thread`, `Lock`, `RLock`, `Semaphore`, `Event`, `Condition`, `Barrier`, `ThreadPoolExecutor`
- [ ] Thread safety and race conditions
- [ ] **Multiprocessing**: `multiprocessing` module, `Process`, `Pool`, `Queue`, `Pipe`, `Manager`, `ProcessPoolExecutor`
- [ ] Shared memory and inter-process communication
- [ ] `concurrent.futures` — unified interface

### 3.8 Async Programming (asyncio)
- [ ] Event loops
- [ ] `async def` and `await`
- [ ] `asyncio.run()`
- [ ] Coroutines vs threads vs processes
- [ ] `asyncio.sleep()`, `asyncio.gather()`, `asyncio.wait()`, `asyncio.create_task()`
- [ ] Async context managers (`async with`)
- [ ] Async iterators (`async for`, `__aiter__`, `__anext__`)
- [ ] Async generators
- [ ] `asyncio.Queue`
- [ ] Exception handling in async code
- [ ] Common async patterns: producer-consumer, timeouts

### 3.9 Memory Management & Performance
- [ ] Python memory model — stack vs heap
- [ ] Reference counting (`sys.getrefcount`)
- [ ] Garbage collector (`gc` module)
- [ ] `sys.getsizeof()` — object memory size
- [ ] Object interning (strings, small integers)
- [ ] Memory profiling: `tracemalloc`, `memory_profiler`
- [ ] `__slots__` for memory optimization
- [ ] Profiling code: `cProfile`, `pstats`, `timeit`, `line_profiler`
- [ ] Bytecode and `dis` module

### 3.10 Metaprogramming
- [ ] Introspection: `dir()`, `vars()`, `getattr()`, `setattr()`, `hasattr()`, `delattr()`
- [ ] `type()` as a metaclass
- [ ] Creating classes dynamically with `type()`
- [ ] Metaclasses: `__new__`, `__init__`, `__prepare__`
- [ ] `__init_subclass__`
- [ ] Class decorators
- [ ] `__getattr__`, `__getattribute__`, `__setattr__`, `__delattr__`
- [ ] Descriptors: `__get__`, `__set__`, `__delete__`
- [ ] `inspect` module
- [ ] `ast` module — Abstract Syntax Trees
- [ ] `exec()` and `eval()`

---

## Phase 4 — Python for DSA & Problem Solving

> **Duration**: ~4–6 weeks (ongoing)
> **Goal**: Use Python efficiently for data structures and algorithms.

### 4.1 Python Built-ins for DSA
- [ ] `collections.deque` — O(1) append/pop from both ends
- [ ] `collections.Counter` — frequency counting
- [ ] `collections.defaultdict` — auto-initialized dicts
- [ ] `collections.OrderedDict`
- [ ] `heapq` — min-heap operations: `heappush`, `heappop`, `heapify`, `nlargest`, `nsmallest`
- [ ] Max-heap using negation trick
- [ ] `bisect` — binary search on sorted lists: `bisect_left`, `bisect_right`, `insort`
- [ ] `functools.cmp_to_key` for custom sorting

### 4.2 Complexity Analysis
- [ ] Big-O notation
- [ ] Time complexity of Python operations (list, dict, set)
- [ ] Space complexity
- [ ] Best / Average / Worst case analysis
- [ ] Amortized analysis

### 4.3 Sorting Algorithms (Implementation)
- [ ] Bubble Sort
- [ ] Selection Sort
- [ ] Insertion Sort
- [ ] Merge Sort
- [ ] Quick Sort
- [ ] Heap Sort
- [ ] Counting Sort / Radix Sort / Bucket Sort
- [ ] Python's built-in `sorted()` and `.sort()` (Timsort)
- [ ] Custom sort keys: `key=lambda`, `key=functools.cmp_to_key`

### 4.4 Searching
- [ ] Linear Search
- [ ] Binary Search (iterative & recursive)
- [ ] Binary search on answer / search space

### 4.5 Recursion & Backtracking
- [ ] Recursion fundamentals and call stack
- [ ] Tail recursion
- [ ] Tree recursion
- [ ] Backtracking template
- [ ] Classic problems: N-Queens, Sudoku, Permutations, Subsets, Combination Sum

### 4.6 Dynamic Programming
- [ ] Memoization (top-down)
- [ ] Tabulation (bottom-up)
- [ ] State definition and transitions
- [ ] Classic DP problems: Fibonacci, 0/1 Knapsack, Longest Common Subsequence, Longest Increasing Subsequence, Coin Change, Edit Distance

### 4.7 Data Structures Implementation
- [ ] Linked List (Singly, Doubly, Circular)
- [ ] Stack (using list and deque)
- [ ] Queue (using list, deque, `queue.Queue`)
- [ ] Binary Tree and Binary Search Tree
- [ ] Heap / Priority Queue
- [ ] Hash Map (collision handling: chaining, open addressing)
- [ ] Graph (adjacency list, adjacency matrix)
- [ ] Trie
- [ ] Disjoint Set / Union-Find
- [ ] Segment Tree, Fenwick Tree (BIT)

### 4.8 Graph Algorithms
- [ ] BFS and DFS (iterative and recursive)
- [ ] Topological Sort (Kahn's algorithm, DFS-based)
- [ ] Shortest Path: Dijkstra, Bellman-Ford, Floyd-Warshall
- [ ] Minimum Spanning Tree: Kruskal, Prim
- [ ] Cycle detection (directed and undirected)
- [ ] Connected components
- [ ] Bipartite check
- [ ] Strongly Connected Components (Tarjan, Kosaraju)

---

## Phase 5 — Python Ecosystem & Real-World Skills

> **Duration**: ~3–4 weeks
> **Goal**: Use Python for production and real-world applications.

### 5.1 Standard Library Essentials
- [ ] `os` — OS interaction, paths, environment variables
- [ ] `sys` — system parameters and functions
- [ ] `pathlib` — object-oriented filesystem paths
- [ ] `datetime`, `time`, `calendar`
- [ ] `math`, `cmath`, `statistics`, `decimal`, `fractions`
- [ ] `random`, `secrets`
- [ ] `re` — Regular Expressions
- [ ] `string` — string constants and templates
- [ ] `io` — I/O streams
- [ ] `hashlib`, `hmac` — cryptographic hashing
- [ ] `subprocess` — running system commands
- [ ] `shutil` — file operations
- [ ] `glob`, `fnmatch` — file pattern matching
- [ ] `logging` — structured logging
- [ ] `argparse` — command-line argument parsing
- [ ] `configparser`, `tomllib` — config files
- [ ] `pickle`, `shelve` — object serialization
- [ ] `copy` — `copy()` vs `deepcopy()`
- [ ] `pprint` — pretty printing
- [ ] `unittest`, `doctest`

### 5.2 Virtual Environments & Package Management
- [ ] `venv` — creating virtual environments
- [ ] `pip` — installing packages
- [ ] `requirements.txt`
- [ ] `pyproject.toml` and `setup.py`
- [ ] `pipenv`, `poetry` — modern dependency management

### 5.3 Testing
- [ ] `unittest` framework: `TestCase`, assertions, test discovery
- [ ] `pytest` — fixtures, parametrize, markers
- [ ] Mocking: `unittest.mock`, `Mock`, `MagicMock`, `patch`
- [ ] TDD — Test Driven Development workflow
- [ ] Code coverage: `coverage.py`
- [ ] Integration tests vs unit tests

### 5.4 Debugging & Tooling
- [ ] `pdb` — Python Debugger
- [ ] `breakpoint()` (Python 3.7+)
- [ ] VS Code / PyCharm debugger
- [ ] `logging` module (levels, handlers, formatters)
- [ ] Linting: `flake8`, `pylint`, `ruff`
- [ ] Formatting: `black`, `isort`
- [ ] Type checking: `mypy`
- [ ] `pre-commit` hooks

### 5.5 Regular Expressions (`re` module)
- [ ] Pattern syntax: `.`, `*`, `+`, `?`, `{n,m}`, `[]`, `^`, `$`, `\d`, `\w`, `\s`, `|`, `()`
- [ ] Greedy vs non-greedy matching
- [ ] Groups: capturing, non-capturing, named groups
- [ ] Lookahead and lookbehind assertions
- [ ] `re.match()`, `re.search()`, `re.findall()`, `re.finditer()`, `re.sub()`, `re.split()`, `re.compile()`
- [ ] Flags: `re.IGNORECASE`, `re.MULTILINE`, `re.DOTALL`

### 5.6 Working with Data
- [ ] `json` — JSON serialization / deserialization
- [ ] `csv` — CSV read/write
- [ ] `xml.etree.ElementTree` — XML parsing
- [ ] `sqlite3` — SQLite database
- [ ] `numpy` — numerical computing (arrays, broadcasting, vectorization)
- [ ] `pandas` — DataFrames, Series, data manipulation
- [ ] `matplotlib` / `seaborn` — data visualization
- [ ] API calls with `requests` / `httpx`
- [ ] Web scraping: `BeautifulSoup`, `scrapy`

### 5.7 Networking & Web
- [ ] `socket` programming
- [ ] HTTP basics and REST APIs
- [ ] `requests` library
- [ ] `Flask` — micro web framework
- [ ] `FastAPI` — modern async web framework
- [ ] `Django` — full-stack web framework (overview)
- [ ] WebSockets

---

## Phase 6 — Expert-Level Python

> **Duration**: Ongoing
> **Goal**: Deep internals, C extensions, and cutting-edge Python.

### 6.1 CPython Internals
- [ ] Python execution model: source to bytecode to execution
- [ ] `dis` module — inspecting bytecode
- [ ] PyObject and reference counting internals
- [ ] Small integer cache and string interning
- [ ] The GIL — why it exists and ongoing efforts (PEP 703)
- [ ] CPython source code navigation

### 6.2 C Extensions & Interfacing
- [ ] `ctypes` — calling C functions from Python
- [ ] `cffi` — C Foreign Function Interface
- [ ] Writing C extensions with Python/C API
- [ ] `Cython` — compiling Python to C
- [ ] `Numba` — JIT compilation for NumPy code

### 6.3 Design Patterns in Python
- [ ] Creational: Singleton, Factory, Abstract Factory, Builder, Prototype
- [ ] Structural: Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy
- [ ] Behavioral: Chain of Responsibility, Command, Iterator, Mediator, Observer, State, Strategy, Template, Visitor
- [ ] Pythonic alternatives to classic OOP patterns

### 6.4 Advanced OOP Patterns
- [ ] Mixins
- [ ] Abstract Base Classes (ABCs) deep dive
- [ ] Descriptors deep dive
- [ ] Metaclass use cases (ORMs, validation, singletons)
- [ ] Protocol classes vs ABCs

### 6.5 Security
- [ ] Common vulnerabilities: injection, deserialization attacks
- [ ] `secrets` module for cryptographic randomness
- [ ] `hashlib` — secure hashing
- [ ] `ssl` module
- [ ] Input validation and sanitization
- [ ] Safe use of `eval()` and `exec()`

### 6.6 Python Packaging & Distribution
- [ ] `pyproject.toml` deep dive
- [ ] Building with `setuptools`, `flit`, `hatch`
- [ ] Publishing to PyPI
- [ ] Semantic versioning
- [ ] Namespace packages

### 6.7 Modern Python Features (3.8–3.13)
- [ ] Walrus operator `:=` (3.8, PEP 572)
- [ ] Positional-only parameters `/` (3.8, PEP 570)
- [ ] `TypedDict`, `Literal`, `Final` (3.8)
- [ ] Match statement — structural pattern matching (3.10, PEP 634)
- [ ] `ExceptionGroup` and `except*` (3.11, PEP 654)
- [ ] `tomllib` (3.11)
- [ ] `typing.Self` (3.11)
- [ ] `asyncio.TaskGroup` (3.11)
- [ ] `typing.override` (3.12)
- [ ] Type parameter syntax `type X = ...` (3.12, PEP 695)
- [ ] Free-threaded CPython (3.13, PEP 703, experimental)

---

## 📅 Suggested Weekly Study Schedule

| Week | Topics |
|------|--------|
| Week 1 | Variables, Data Types, Operators, Strings |
| Week 2 | Control Flow, Built-in Functions |
| Week 3 | Lists, Tuples |
| Week 4 | Dictionaries, Sets |
| Week 5 | Functions (args, kwargs, lambda, scope) |
| Week 6 | Recursion, Modules, File Handling |
| Week 7 | Exception Handling, OOP (Classes, Inheritance) |
| Week 8 | OOP (Advanced: Dunder, ABC, Properties) |
| Week 9 | Iterators, Generators, `itertools` |
| Week 10 | Decorators, Context Managers, Functional Programming |
| Week 11 | Type Hints, Comprehensions (Advanced) |
| Week 12 | Concurrency: Threading, Multiprocessing |
| Week 13 | Asyncio & Async Programming |
| Week 14 | Memory, Profiling, Metaprogramming |
| Week 15 | Standard Library, Regex, Testing |
| Week 16 | DSA with Python (heapq, bisect, collections) |
| Week 17–20 | Data Structures & Algorithm Implementation |
| Week 21–24 | Design Patterns, CPython Internals, Advanced Features |

---

## 📚 Recommended Resources

### Books
- *Automate the Boring Stuff with Python* — Al Sweigart (Beginner)
- *Python Crash Course* — Eric Matthes (Beginner)
- *Fluent Python* — Luciano Ramalho (Intermediate–Advanced)
- *Effective Python* — Brett Slatkin (Intermediate–Advanced)
- *Python Cookbook* — David Beazley (Advanced)
- *High Performance Python* — Micha Gorelick (Expert)

### Online
- [Official Python Docs](https://docs.python.org/3/)
- [Real Python](https://realpython.com) — practical tutorials
- [Python Weekly](https://www.pythonweekly.com) — newsletter
- [PyMOTW](https://pymotw.com/3/) — Python Module of the Week

### Practice Platforms
- [LeetCode](https://leetcode.com) — DSA problems
- [HackerRank Python](https://www.hackerrank.com/domains/python) — Python-specific challenges
- [Exercism Python Track](https://exercism.org/tracks/python) — guided practice

---

## 📝 Progress Tracker

| Phase | Status | Start Date | End Date | Notes |
|-------|--------|------------|----------|-------|
| Phase 1 — Foundations | Not Started | | | |
| Phase 2 — Core Python | Not Started | | | |
| Phase 3 — Advanced Python | Not Started | | | |
| Phase 4 — DSA | Not Started | | | |
| Phase 5 — Ecosystem | Not Started | | | |
| Phase 6 — Expert | Not Started | | | |

---

*Last Updated: July 2026*
