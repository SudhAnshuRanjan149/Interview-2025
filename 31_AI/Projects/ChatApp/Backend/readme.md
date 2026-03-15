# 🤖 AgentIQ — Advanced Agentic AI Chat Backend

> A production-grade, multi-agent chat backend built with FastAPI, LangChain, LangGraph, RAG, MCP Server, and vector databases. Designed as a **complete learning resource** for developers new to Agentic AI, Generative AI, LLMs, and RAG systems.

---

## 📖 Table of Contents

1. [Project Overview](https://claude.ai/chat/3c244263-eb8c-4cea-af57-bae73b51fd8b#-project-overview)
2. [Architecture Deep Dive](https://claude.ai/chat/3c244263-eb8c-4cea-af57-bae73b51fd8b#-architecture-deep-dive)
3. [Core Concepts Explained](https://claude.ai/chat/3c244263-eb8c-4cea-af57-bae73b51fd8b#-core-concepts-explained)
4. [Tech Stack](https://claude.ai/chat/3c244263-eb8c-4cea-af57-bae73b51fd8b#-tech-stack)
5. [Project Structure](https://claude.ai/chat/3c244263-eb8c-4cea-af57-bae73b51fd8b#-project-structure)
6. [Local Mac Setup Guide](https://claude.ai/chat/3c244263-eb8c-4cea-af57-bae73b51fd8b#-local-mac-setup-guide)
7. [Implementation Plan — Phase by Phase](https://claude.ai/chat/3c244263-eb8c-4cea-af57-bae73b51fd8b#-implementation-plan--phase-by-phase)
8. [API Reference](https://claude.ai/chat/3c244263-eb8c-4cea-af57-bae73b51fd8b#-api-reference)
9. [Environment Variables](https://claude.ai/chat/3c244263-eb8c-4cea-af57-bae73b51fd8b#-environment-variables)
10. [Testing Strategy](https://claude.ai/chat/3c244263-eb8c-4cea-af57-bae73b51fd8b#-testing-strategy)
11. [Interview Concepts Cheat Sheet](https://claude.ai/chat/3c244263-eb8c-4cea-af57-bae73b51fd8b#-interview-concepts-cheat-sheet)

---

## 🎯 Project Overview

**AgentIQ** is an intelligent multi-agent chat system that routes user queries to the most appropriate intelligence source:

```
User Query
    │
    ▼
┌─────────────────────────────────────────────┐
│           Query Router Agent                │
│  (LangGraph supervisor — decides intent)    │
└──────┬──────────┬──────────┬───────────────┘
       │          │          │
       ▼          ▼          ▼
  Local RAG   OpenAI LLM  External APIs
  Agent       Agent       Agent
  (your docs) (general    (weather,
              knowledge)   news, stocks)
       │          │          │
       └──────────┴──────────┘
                  │
                  ▼
         Response Synthesizer
         (merges + formats output)
                  │
                  ▼
         Streaming SSE Response
         back to client
```

### What makes this "Advanced"?

| Feature                             | Description                                               |
| ----------------------------------- | --------------------------------------------------------- |
| **Multi-Agent Orchestration** | LangGraph supervisor routes between 4+ specialized agents |
| **Hybrid RAG**                | BM25 + vector search + reranking for superior retrieval   |
| **MCP Server**                | Custom Model Context Protocol server exposing local tools |
| **Streaming**                 | Server-Sent Events (SSE) for real-time token streaming    |
| **Agent Memory**              | Short-term (conversation) + long-term (user facts) memory |
| **Observability**             | LangSmith tracing + custom metrics dashboard endpoint     |
| **Guardrails**                | Input validation, output filtering, hallucination checks  |
| **Async Everything**          | Fully async FastAPI with connection pooling               |

---

## 🏗️ Architecture Deep Dive

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│              (Any frontend / curl / Postman)                    │
└─────────────────────────┬───────────────────────────────────────┘
                          │ HTTP / SSE
┌─────────────────────────▼───────────────────────────────────────┐
│                    FASTAPI APPLICATION                          │
│  ┌─────────────┐  ┌────────────┐  ┌─────────────────────────┐  │
│  │  /chat SSE  │  │ /ingest    │  │ /metrics  /health       │  │
│  │  endpoint   │  │ documents  │  │ /sessions /admin        │  │
│  └──────┬──────┘  └─────┬──────┘  └─────────────────────────┘  │
│         │               │                                        │
│  ┌──────▼───────────────▼───────────────────────────────────┐   │
│  │              MIDDLEWARE LAYER                            │   │
│  │  Auth (API Key) │ Rate Limiter │ Request Logger          │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│               LANGGRAPH ORCHESTRATION LAYER                     │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              SUPERVISOR AGENT (Router)                    │  │
│  │  - Classifies intent (RAG / general / tools / chitchat)   │  │
│  │  - Manages conversation state across turns                │  │
│  │  - Decides which agent(s) to invoke                       │  │
│  └───────┬─────────────┬──────────────┬─────────────────────┘  │
│          │             │              │                          │
│  ┌───────▼──┐  ┌───────▼──┐  ┌───────▼──────────────────────┐  │
│  │ LOCAL    │  │ OPENAI   │  │ TOOLS AGENT                  │  │
│  │ RAG      │  │ LLM      │  │ (Weather / News / Calculator) │  │
│  │ AGENT    │  │ AGENT    │  │                              │  │
│  └───────┬──┘  └───────┬──┘  └───────┬──────────────────────┘  │
│          │             │              │                          │
│  ┌───────▼─────────────▼──────────────▼──────────────────────┐  │
│  │              RESPONSE SYNTHESIZER                         │  │
│  │  - Merges multi-source answers                            │  │
│  │  - Adds citations and confidence scores                   │  │
│  │  - Applies output guardrails                              │  │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────┬───────────────────────────────────────┘
                          │
     ┌────────────────────┼─────────────────────┐
     │                    │                      │
┌────▼─────┐   ┌──────────▼──────┐   ┌──────────▼──────┐
│ CHROMADB │   │   MCP SERVER    │   │  REDIS CACHE    │
│ Vector   │   │  (local tools,  │   │  (sessions,     │
│ Store    │   │   file system,  │   │   rate limits,  │
│          │   │   code runner)  │   │   LLM cache)    │
└──────────┘   └─────────────────┘   └─────────────────┘
```

### LangGraph Agent State Machine

```
START
  │
  ▼
[classify_intent]  ──── routes to ────►  [rag_agent]
  │                                           │
  ├──── routes to ────►  [llm_agent]          ▼
  │                           │         [retrieve_docs]
  └──── routes to ────►  [tools_agent]        │
                              │               ▼
                         [tool_call]    [rerank_results]
                              │               │
                         [tool_result]        ▼
                              │         [generate_answer]
                              │               │
                              └───────┬───────┘
                                      │
                                      ▼
                              [synthesize_response]
                                      │
                                      ▼
                              [check_guardrails]
                                      │
                                      ▼
                                     END
```

---

## 📚 Core Concepts Explained

> This section is written for developers new to AI/LLM concepts. Read this before writing any code.

### 1. What is a Large Language Model (LLM)?

An LLM (like GPT-4 or Claude) is a neural network trained on vast amounts of text. It predicts the next token given a sequence of input tokens.

```
Input tokens:  ["The", "capital", "of", "France", "is"]
                                                        ↓
                             LLM (billions of parameters)
                                                        ↓
Output token:  "Paris" (highest probability next token)
```

**Key parameters you'll control:**

* `temperature` — randomness (0 = deterministic, 1 = creative, 2 = chaotic)
* `max_tokens` — maximum response length
* `top_p` — nucleus sampling (alternative to temperature)
* `system_prompt` — instructions that shape the model's persona/behavior

### 2. What are Tokens?

Tokens are the unit of text that LLMs process. A token ≈ 0.75 words in English.

```
"Hello, how are you?" → ["Hello", ",", " how", " are", " you", "?"]  = 6 tokens
```

Why this matters:

* **Cost** : APIs charge per token (input + output)
* **Context window** : Maximum tokens in one request (e.g., GPT-4 = 128k tokens)
* **Latency** : More tokens = slower response

### 3. What are Embeddings?

Embeddings convert text into a list of numbers (a vector) that capture semantic meaning. Similar texts produce vectors that are close together in high-dimensional space.

```python
# These two sentences have very similar embedding vectors
"The dog ran quickly."    → [0.23, -0.41, 0.87, 0.12, ...]  # 1536 dimensions
"The puppy sprinted fast." → [0.25, -0.39, 0.85, 0.14, ...]  # very similar!

# This sentence is semantically different
"I love spaghetti."       → [-0.67, 0.82, -0.23, 0.91, ...]  # far away in space
```

We measure similarity using  **cosine similarity** :

```
similarity = cos(θ) = (A · B) / (|A| × |B|)

Result: 1.0 = identical meaning, 0 = unrelated, -1 = opposite
```

### 4. What is RAG (Retrieval-Augmented Generation)?

RAG solves the problem of LLMs having a knowledge cutoff date and no access to your private data.

```
PROBLEM: "What did our Q3 2024 earnings report say about India?"
          ↓
LLM doesn't know — it wasn't trained on your private documents!

RAG SOLUTION:
1. INDEX TIME (one-time):
   Your PDF → chunk into paragraphs → embed each chunk → store in vector DB

2. QUERY TIME:
   Question → embed question → find similar chunks → give chunks + question to LLM

   [Question] + [Relevant Doc Chunks] → LLM → [Accurate Answer with Citations]
```

 **Why this works** : You're giving the LLM the information it needs at query time, so it doesn't need to "remember" it from training.

### 5. What is a Vector Database?

A specialized database optimized for storing and querying embeddings (vectors). Unlike SQL which matches exact values, a vector DB finds "approximately similar" items.

```
Traditional DB:  SELECT * WHERE name = "John"   → exact match
Vector DB:       find_similar([0.23, -0.41, ...]) → approximate nearest neighbors
```

Popular options: ChromaDB (local), Pinecone (cloud), Weaviate, pgvector (PostgreSQL extension)

**Key operations:**

* `add(documents, embeddings, ids)` — store documents
* `query(query_embedding, n_results=5)` — find top-N similar docs
* `delete(ids)` — remove documents

### 6. What is an AI Agent?

An agent is an LLM that can take actions (use tools) in a loop until it achieves a goal.

```
Traditional LLM:  Question → LLM → Answer  (single step)

Agent:            Question → LLM → "I need to search the web"
                                    → Tool: web_search("latest AI news")
                                    → Result: "OpenAI released GPT-5..."
                                    → LLM → "I need to summarize this"
                                    → Tool: summarize(text)
                                    → Result: "Summary: ..."
                                    → LLM → Final Answer  (multi-step loop)
```

The **ReAct** pattern (Reasoning + Acting):

```
Thought: I need to find the current weather in Mumbai
Action: weather_tool({"city": "Mumbai"})
Observation: {"temp": 32, "condition": "humid", "humidity": 85}
Thought: I now have the data I need
Action: FINISH
Answer: "It's currently 32°C and humid in Mumbai."
```

### 7. What is LangChain?

LangChain is a framework for building LLM applications. Think of it as "Express.js for AI apps."

```python
# Without LangChain: verbose, repetitive boilerplate
import openai
client = openai.OpenAI()
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": prompt}]
)
text = response.choices[0].message.content

# With LangChain: clean, composable chains
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

chain = ChatPromptTemplate.from_template("Answer: {question}") | ChatOpenAI()
result = chain.invoke({"question": "What is RAG?"})
```

 **LCEL (LangChain Expression Language)** : The `|` pipe operator composes chains:

```python
chain = prompt | llm | output_parser | post_processor
```

### 8. What is LangGraph?

LangGraph extends LangChain with **stateful, cyclical workflows** — it lets you build agents that loop, branch, and maintain state.

```python
# LangGraph models your agent as a graph
from langgraph.graph import StateGraph

graph = StateGraph(AgentState)
graph.add_node("classify", classify_intent)
graph.add_node("rag_agent", run_rag)
graph.add_node("llm_agent", run_llm)

# Conditional routing — like a router in Express
graph.add_conditional_edges("classify", route_decision, {
    "rag": "rag_agent",
    "llm": "llm_agent",
    "tools": "tools_agent"
})
```

LangGraph is the backbone of all production agentic systems in 2024-2025.

### 9. What is MCP (Model Context Protocol)?

MCP is an open standard (by Anthropic) for connecting AI models to external tools and data sources. Think of it as a "USB-C for AI" — a universal plug for tools.

```
LLM ←──── MCP Client ←──── MCP Server ←──── Your Tools
                                          (files, databases,
                                           APIs, code runners)
```

You'll build a custom MCP server that exposes:

* File system access (read/write local files)
* Code execution (run Python snippets)
* Database queries (search your local data)
* Custom business logic functions

### 10. What is Chunking?

When you ingest documents into RAG, you split them into smaller pieces (chunks) because:

* LLMs have context limits
* Smaller chunks = more precise retrieval
* You only want to retrieve the relevant part, not the whole document

```
Strategies:
├── Fixed-size chunking:    split every 500 characters (simple but crude)
├── Recursive chunking:     split by paragraph → sentence → character (LangChain default)
├── Semantic chunking:      split where meaning changes (expensive but best)
└── Document-aware:         split by headers/sections (best for structured docs)

Overlap: Always add 50-100 character overlap between chunks to avoid splitting mid-sentence
```

### 11. What is Hybrid Search?

Combining vector search (semantic) with BM25 (keyword) for better retrieval:

```
Query: "FastAPI async database connection pooling"

Vector search finds:    "Asynchronous DB connections improve throughput..." (semantically similar)
BM25 keyword search:    "FastAPI with asyncpg for PostgreSQL..." (keyword match)

Hybrid fusion merges both result sets using Reciprocal Rank Fusion (RRF):
score = (1/(k + rank_vector)) + (1/(k + rank_bm25))
```

### 12. What is Reranking?

A second-pass model that re-scores your retrieved chunks. More accurate than cosine similarity but slower.

```
Initial retrieval: Top 20 chunks (fast, approximate)
         ↓
Reranker (cross-encoder): Scores each chunk against query (slower, accurate)
         ↓
Final result: Top 5 chunks, properly ranked
```

---

## 🛠️ Tech Stack

| Category                   | Technology              | Purpose                            |
| -------------------------- | ----------------------- | ---------------------------------- |
| **Web Framework**    | FastAPI                 | Async API server, SSE streaming    |
| **AI Orchestration** | LangGraph               | Multi-agent state machine          |
| **LLM Framework**    | LangChain               | Chains, prompts, tools abstraction |
| **LLM Provider**     | OpenAI (GPT-4o)         | General intelligence               |
| **Embeddings**       | text-embedding-3-small  | Document vectorization             |
| **Vector DB**        | ChromaDB                | Local vector storage               |
| **BM25 Search**      | rank_bm25               | Keyword search for hybrid RAG      |
| **Reranker**         | cross-encoder/ms-marco  | Result reranking                   |
| **MCP Server**       | FastMCP                 | Custom tool server                 |
| **Cache**            | Redis                   | Session cache, LLM response cache  |
| **External APIs**    | OpenWeatherMap, NewsAPI | Tool agent data sources            |
| **Observability**    | LangSmith               | LLM call tracing                   |
| **Document Parsing** | LangChain loaders       | PDF, DOCX, CSV, web URL ingestion  |
| **Validation**       | Pydantic v2             | Request/response schemas           |
| **Testing**          | pytest + pytest-asyncio | Async test suite                   |
| **Dev Tools**        | uv, ruff, pyright       | Fast package mgmt, linting, types  |

---

## 📁 Project Structure

```
agentiq/
├── README.md                          ← You are here
├── pyproject.toml                     ← Project dependencies (uv/pip)
├── .env.example                       ← Environment variable template
├── .env                               ← Your secrets (never commit this)
│
├── app/                               ← Main FastAPI application
│   ├── main.py                        ← App factory, middleware, startup
│   ├── config.py                      ← Settings (Pydantic BaseSettings)
│   │
│   ├── api/                           ← HTTP route handlers
│   │   ├── __init__.py
│   │   ├── chat.py                    ← POST /chat — main SSE endpoint
│   │   ├── ingest.py                  ← POST /ingest — document upload
│   │   ├── sessions.py                ← GET/DELETE /sessions
│   │   └── health.py                  ← GET /health, /metrics
│   │
│   ├── agents/                        ← LangGraph agent definitions
│   │   ├── __init__.py
│   │   ├── graph.py                   ← Main LangGraph StateGraph
│   │   ├── state.py                   ← AgentState TypedDict definition
│   │   ├── supervisor.py              ← Router/classifier agent
│   │   ├── rag_agent.py               ← Local knowledge retrieval agent
│   │   ├── llm_agent.py               ← OpenAI general-purpose agent
│   │   ├── tools_agent.py             ← Weather, news, calculator agent
│   │   └── synthesizer.py             ← Response merger and formatter
│   │
│   ├── rag/                           ← RAG pipeline
│   │   ├── __init__.py
│   │   ├── ingestion.py               ← Document loading + chunking
│   │   ├── embeddings.py              ← Embedding model wrapper
│   │   ├── vector_store.py            ← ChromaDB operations
│   │   ├── bm25_store.py              ← BM25 keyword index
│   │   ├── hybrid_retriever.py        ← Combines vector + BM25 results
│   │   └── reranker.py                ← Cross-encoder reranking
│   │
│   ├── mcp/                           ← Model Context Protocol server
│   │   ├── __init__.py
│   │   ├── server.py                  ← FastMCP server definition
│   │   └── tools/
│   │       ├── filesystem.py          ← Read/write local files
│   │       ├── code_runner.py         ← Safe Python code execution
│   │       └── data_query.py          ← Query local SQLite/CSV data
│   │
│   ├── tools/                         ← LangChain tools for agents
│   │   ├── __init__.py
│   │   ├── weather.py                 ← OpenWeatherMap tool
│   │   ├── news.py                    ← NewsAPI tool
│   │   ├── calculator.py              ← Math evaluation tool
│   │   └── web_search.py              ← DuckDuckGo search tool
│   │
│   ├── memory/                        ← Agent memory systems
│   │   ├── __init__.py
│   │   ├── conversation.py            ← Short-term chat history (Redis)
│   │   └── user_facts.py              ← Long-term user fact extraction
│   │
│   ├── guardrails/                    ← Safety and validation
│   │   ├── __init__.py
│   │   ├── input_filter.py            ← PII detection, prompt injection guard
│   │   └── output_filter.py           ← Hallucination check, toxicity filter
│   │
│   └── schemas/                       ← Pydantic models
│       ├── __init__.py
│       ├── chat.py                    ← ChatRequest, ChatResponse
│       └── ingest.py                  ← IngestRequest, IngestResponse
│
├── mcp_server/                        ← Standalone MCP server process
│   ├── __init__.py
│   └── main.py                        ← Run separately: python mcp_server/main.py
│
├── data/                              ← Local data directory
│   ├── documents/                     ← Drop your PDFs/docs here for ingestion
│   ├── chroma_db/                     ← ChromaDB persisted data
│   └── sqlite/                        ← Local SQLite databases
│
├── tests/                             ← Test suite
│   ├── conftest.py                    ← Shared fixtures
│   ├── test_rag.py                    ← RAG pipeline tests
│   ├── test_agents.py                 ← Agent routing tests
│   └── test_api.py                    ← API endpoint tests
│
└── scripts/                           ← Utility scripts
    ├── ingest_sample_docs.py          ← Seed vector DB with sample docs
    └── eval_rag.py                    ← Evaluate RAG quality
```

---

## 💻 Local Mac Setup Guide

> Complete step-by-step setup for macOS (Apple Silicon M1/M2/M3 or Intel). Estimated time: 30–45 minutes.

### Prerequisites Check

Open Terminal and verify:

```bash
# Check macOS version (need 12.0+)
sw_vers -productVersion

# Check if Homebrew is installed
brew --version
# If not installed:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Check Python version (need 3.11+)
python3 --version
# If not installed or old:
brew install python@3.11
```

### Step 1 — Install System Dependencies

```bash
# Redis (for session cache)
brew install redis

# Start Redis as a background service
brew services start redis

# Verify Redis is running
redis-cli ping
# Expected output: PONG

# (Optional but recommended) Redis GUI
brew install --cask another-redis-desktop-manager
```

### Step 2 — Set Up Python Environment with uv

`uv` is a blazing-fast Python package manager (replaces pip + virtualenv):

```bash
# Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# Restart terminal or run:
source ~/.zshrc   # or ~/.bash_profile

# Verify
uv --version
```

### Step 3 — Clone and Set Up Project

```bash
# Create project directory
mkdir -p ~/projects && cd ~/projects

# Clone (or create) the project
git clone https://github.com/your-username/agentiq.git
cd agentiq

# Create virtual environment and install ALL dependencies
uv venv --python 3.11
source .venv/bin/activate

# Install dependencies (see pyproject.toml section below)
uv pip install -e ".[dev]"
```

### Step 4 — Create pyproject.toml

Create this file in your project root:

```toml
[project]
name = "agentiq"
version = "0.1.0"
description = "Advanced Agentic AI Chat Backend"
requires-python = ">=3.11"
dependencies = [
    # Web framework
    "fastapi>=0.111.0",
    "uvicorn[standard]>=0.29.0",
    "python-multipart>=0.0.9",

    # LangChain ecosystem
    "langchain>=0.2.0",
    "langchain-openai>=0.1.0",
    "langchain-community>=0.2.0",
    "langchain-core>=0.2.0",
    "langgraph>=0.1.0",

    # Vector store
    "chromadb>=0.5.0",

    # Embeddings + reranking
    "sentence-transformers>=3.0.0",
    "rank-bm25>=0.2.2",

    # MCP
    "fastmcp>=0.1.0",

    # External API clients
    "httpx>=0.27.0",
    "aiohttp>=3.9.0",

    # Cache
    "redis[hiredis]>=5.0.0",

    # Document parsing
    "pypdf>=4.2.0",
    "python-docx>=1.1.0",
    "beautifulsoup4>=4.12.0",
    "unstructured>=0.14.0",

    # Utilities
    "pydantic>=2.7.0",
    "pydantic-settings>=2.2.0",
    "python-dotenv>=1.0.0",
    "tiktoken>=0.7.0",
    "tenacity>=8.3.0",         # Retry logic
    "structlog>=24.1.0",       # Structured logging

    # Observability
    "langsmith>=0.1.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=8.0.0",
    "pytest-asyncio>=0.23.0",
    "pytest-cov>=5.0.0",
    "httpx>=0.27.0",    # for TestClient
    "ruff>=0.4.0",
    "pyright>=1.1.360",
]

[tool.ruff]
line-length = 100
select = ["E", "F", "I", "N", "W", "UP"]

[tool.pytest.ini_options]
asyncio_mode = "auto"
```

```bash
# Install
uv pip install -e ".[dev]"
```

### Step 5 — Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit with your actual keys
nano .env      # or: code .env (if using VS Code)
```

Create `.env.example` with this content:

```dotenv
# ═══════════════════════════════════════════
# LLM PROVIDERS
# ═══════════════════════════════════════════
OPENAI_API_KEY=sk-proj-...          # Required — https://platform.openai.com/api-keys
OPENAI_MODEL=gpt-4o-mini            # gpt-4o for best quality, gpt-4o-mini for cost savings
OPENAI_EMBEDDING_MODEL=text-embedding-3-small

# Anthropic (optional — for Claude as alternative LLM)
ANTHROPIC_API_KEY=sk-ant-...

# ═══════════════════════════════════════════
# EXTERNAL TOOL APIs
# ═══════════════════════════════════════════
OPENWEATHER_API_KEY=...             # https://openweathermap.org/api (free tier available)
NEWS_API_KEY=...                    # https://newsapi.org/ (free tier: 100 req/day)

# ═══════════════════════════════════════════
# DATABASE / CACHE
# ═══════════════════════════════════════════
REDIS_URL=redis://localhost:6379/0
CHROMA_PERSIST_DIR=./data/chroma_db

# ═══════════════════════════════════════════
# APP CONFIG
# ═══════════════════════════════════════════
APP_ENV=development                 # development | production
LOG_LEVEL=INFO
API_KEY=your-secret-api-key         # Protect your local API
MAX_TOKENS=2048
TEMPERATURE=0.1                     # Low = more factual, High = more creative

# ═══════════════════════════════════════════
# OBSERVABILITY (optional but recommended)
# ═══════════════════════════════════════════
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=ls__...           # https://smith.langchain.com/ (free tier)
LANGCHAIN_PROJECT=agentiq-local
```

### Step 6 — Verify Installation

```bash
# Run the verification script
python -c "
import fastapi, langchain, langgraph, chromadb, redis
print('✅ FastAPI:', fastapi.__version__)
print('✅ LangChain:', langchain.__version__)
print('✅ LangGraph:', langgraph.__version__)
print('✅ ChromaDB:', chromadb.__version__)
print('✅ Redis:', redis.__version__)
print()
print('All packages installed successfully!')
"

# Test Redis connection
python -c "
import redis
r = redis.Redis.from_url('redis://localhost:6379/0')
r.ping()
print('✅ Redis connection: OK')
"

# Test OpenAI API key
python -c "
import os; from openai import OpenAI
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
r = client.models.list()
print('✅ OpenAI API: OK')
"
```

### Step 7 — Seed the Vector Database

```bash
# Create sample documents directory
mkdir -p data/documents

# Add some sample text files to test RAG
cat > data/documents/sample.txt << 'EOF'
AgentIQ is an advanced multi-agent AI chat system.
It supports RAG (Retrieval-Augmented Generation) for answering questions from local documents.
The system uses LangGraph for orchestrating multiple specialized AI agents.
EOF

# Run ingestion
python scripts/ingest_sample_docs.py
# Expected: "✅ Ingested 3 chunks from 1 document"
```

### Step 8 — Start the Application

```bash
# Terminal 1: Start the MCP server
python mcp_server/main.py
# Expected: "MCP Server running on stdio"

# Terminal 2: Start the FastAPI app
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
# Expected: "Uvicorn running on http://0.0.0.0:8000"
```

### Step 9 — Test with curl

```bash
# Health check
curl http://localhost:8000/health
# Expected: {"status": "healthy", "agents": {...}, "vector_db": "connected"}

# Send a chat message
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-secret-api-key" \
  -d '{
    "message": "What is AgentIQ?",
    "session_id": "test-session-001"
  }'

# Send a message that triggers the weather tool
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-secret-api-key" \
  -d '{
    "message": "What is the weather in Mumbai right now?",
    "session_id": "test-session-001"
  }'

# Stream response (SSE)
curl -N -X POST http://localhost:8000/chat/stream \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-secret-api-key" \
  -d '{"message": "Explain how RAG works", "session_id": "test-001"}'
```

---

## 📋 Implementation Plan — Phase by Phase

> Build the project incrementally. Each phase is fully working before moving to the next. Estimated total: **10–14 days** building 2–3 hours/day.

---

### ✅ Phase 0 — Project Scaffold (Day 1)

 **Goal** : Running FastAPI server with health check, project structure in place.

**Files to create:**

```
app/
├── main.py           ← FastAPI app with middleware
├── config.py         ← Pydantic Settings
└── api/health.py     ← /health endpoint
```

**app/config.py:**

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    openai_api_key: str
    openai_model: str = "gpt-4o-mini"
    redis_url: str = "redis://localhost:6379/0"
    chroma_persist_dir: str = "./data/chroma_db"
    log_level: str = "INFO"
    api_key: str = "dev-secret"

    class Config:
        env_file = ".env"

settings = Settings()
```

**app/main.py:**

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import health

app = FastAPI(title="AgentIQ", version="0.1.0")

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
app.include_router(health.router)

@app.on_event("startup")
async def startup():
    print("🚀 AgentIQ starting up...")
```

 **Verify** : `curl http://localhost:8000/health` returns `{"status": "healthy"}`

---

### ✅ Phase 1 — RAG Pipeline (Days 2–3)

 **Goal** : Ingest documents, store embeddings, retrieve relevant chunks.

 **Concepts practiced** : Embeddings, chunking, vector DB, cosine similarity

**Step 1.1 — Document Ingestion (app/rag/ingestion.py)**

```python
from langchain_community.document_loaders import (
    PyPDFLoader, TextLoader, Docx2txtLoader, WebBaseLoader
)
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from pathlib import Path
from typing import List

def load_document(file_path: str) -> List[Document]:
    """Load a document based on file extension."""
    ext = Path(file_path).suffix.lower()
    loaders = {
        ".pdf":  PyPDFLoader,
        ".txt":  TextLoader,
        ".docx": Docx2txtLoader,
    }
    loader_class = loaders.get(ext)
    if not loader_class:
        raise ValueError(f"Unsupported file type: {ext}")
    return loader_class(file_path).load()

def chunk_documents(docs: List[Document]) -> List[Document]:
    """
    Split documents into overlapping chunks.

    Why overlap? Prevents important context from being split across chunks.
    chunk_size=800: large enough for context, small enough for precision.
    chunk_overlap=100: ~1-2 sentences of overlap between adjacent chunks.
    """
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=100,
        separators=["\n\n", "\n", ". ", " ", ""],  # Try in order
        length_function=len,
    )
    return splitter.split_documents(docs)
```

**Step 1.2 — Vector Store (app/rag/vector_store.py)**

```python
import chromadb
from chromadb.config import Settings
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma
from app.config import settings
from typing import List, Tuple
from langchain_core.documents import Document

class VectorStore:
    def __init__(self):
        # OpenAI embeddings: 1536 dimensions, best quality
        # Alternative: HuggingFace "all-MiniLM-L6-v2" (free, local, 384 dims)
        self.embeddings = OpenAIEmbeddings(
            model=settings.openai_embedding_model,
            api_key=settings.openai_api_key
        )
        self.store = Chroma(
            collection_name="agentiq_docs",
            embedding_function=self.embeddings,
            persist_directory=settings.chroma_persist_dir,
        )

    def add_documents(self, docs: List[Document]) -> List[str]:
        """Add documents to the vector store. Returns list of IDs."""
        return self.store.add_documents(docs)

    def similarity_search(
        self, query: str, k: int = 10
    ) -> List[Tuple[Document, float]]:
        """
        Returns (document, score) pairs.
        Score is cosine similarity: higher = more similar.
        We return 10 for reranking, then reranker trims to 5.
        """
        return self.store.similarity_search_with_score(query, k=k)

    def get_collection_stats(self) -> dict:
        return {"total_documents": self.store._collection.count()}
```

**Step 1.3 — BM25 + Hybrid Search (app/rag/hybrid_retriever.py)**

```python
from rank_bm25 import BM25Okapi
from langchain_core.documents import Document
from typing import List, Tuple
import pickle, re

class HybridRetriever:
    """
    Combines vector search (semantic) with BM25 (keyword).

    Why hybrid? Vector search finds semantically similar docs but can miss
    exact keywords. BM25 excels at exact keyword matching but misses synonyms.
    Combining both gives best-of-both-worlds retrieval.
    """

    def __init__(self, vector_store, alpha: float = 0.5):
        """
        alpha: weight for vector search (1-alpha for BM25)
        alpha=0.5: equal weight. alpha=0.7: prefer semantic.
        """
        self.vector_store = vector_store
        self.alpha = alpha
        self.bm25: BM25Okapi | None = None
        self.bm25_docs: List[Document] = []

    def _tokenize(self, text: str) -> List[str]:
        return re.findall(r'\b\w+\b', text.lower())

    def build_bm25_index(self, docs: List[Document]):
        self.bm25_docs = docs
        tokenized = [self._tokenize(doc.page_content) for doc in docs]
        self.bm25 = BM25Okapi(tokenized)

    def retrieve(self, query: str, k: int = 5) -> List[Document]:
        # Get vector search results (semantic similarity)
        vector_results = self.vector_store.similarity_search(query, k=k*2)

        # Get BM25 results (keyword matching)
        if self.bm25:
            query_tokens = self._tokenize(query)
            bm25_scores = self.bm25.get_scores(query_tokens)
            bm25_results = sorted(
                zip(self.bm25_docs, bm25_scores),
                key=lambda x: x[1], reverse=True
            )[:k*2]
        else:
            bm25_results = []

        # Reciprocal Rank Fusion — merges ranked lists
        scores = {}
        for rank, (doc, _) in enumerate(vector_results):
            key = doc.page_content[:100]
            scores[key] = scores.get(key, 0) + self.alpha * (1 / (60 + rank))

        for rank, (doc, _) in enumerate(bm25_results):
            key = doc.page_content[:100]
            scores[key] = scores.get(key, 0) + (1-self.alpha) * (1 / (60 + rank))

        # Return top-k unique docs sorted by fusion score
        doc_map = {doc.page_content[:100]: doc
                   for doc, _ in vector_results + bm25_results}
        sorted_keys = sorted(scores, key=scores.get, reverse=True)[:k]
        return [doc_map[key] for key in sorted_keys if key in doc_map]
```

---

### ✅ Phase 2 — Agent State + Supervisor (Days 4–5)

 **Goal** : LangGraph graph with state machine, supervisor routing queries.

 **Concepts practiced** : LangGraph, agent state, conditional routing, intent classification

**Step 2.1 — Define Agent State (app/agents/state.py)**

```python
from typing import TypedDict, Annotated, List, Literal
from langchain_core.messages import BaseMessage
import operator

class AgentState(TypedDict):
    """
    The state that flows through the entire agent graph.
    Every node reads from and writes to this state.
    Annotated[list, operator.add] means: each node's output is APPENDED (not replaced).
    """
    messages: Annotated[List[BaseMessage], operator.add]  # Full conversation
    session_id: str                                        # Unique conversation ID
    intent: Literal["rag", "llm", "tools", "chitchat"] | None  # Classified intent
    retrieved_docs: List[dict]                             # RAG retrieved chunks
    tool_results: List[dict]                               # External API results
    final_answer: str                                      # Assembled response
    sources: List[str]                                     # Citation list
    confidence: float                                      # 0.0 to 1.0
    agent_trace: List[str]                                 # For debugging/observability
```

**Step 2.2 — Supervisor Agent (app/agents/supervisor.py)**

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from app.agents.state import AgentState
from app.config import settings

# The supervisor's ONLY job: classify intent
CLASSIFY_PROMPT = ChatPromptTemplate.from_messages([
    ("system", """You are a query router. Classify the user's message into exactly one category:

- "rag": Question about specific documents, files, internal knowledge base, company data
- "llm": General knowledge question, coding help, writing, analysis (no specific data needed)
- "tools": Needs real-time data: weather, news, stock prices, current events
- "chitchat": Greetings, small talk, meta-questions about the AI itself

Respond with ONLY the category word. Nothing else."""),
    ("human", "{message}")
])

async def classify_intent(state: AgentState) -> AgentState:
    """
    Router node — reads the latest user message, returns intent classification.
    This runs FIRST in the graph.
    """
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)  # Mini for speed + cost
    chain = CLASSIFY_PROMPT | llm

    last_message = state["messages"][-1].content
    result = await chain.ainvoke({"message": last_message})
    intent = result.content.strip().lower()

    # Validate — default to llm if unexpected value
    valid = {"rag", "llm", "tools", "chitchat"}
    intent = intent if intent in valid else "llm"

    return {
        "intent": intent,
        "agent_trace": [f"Supervisor classified: {intent}"]
    }

def route_by_intent(state: AgentState) -> str:
    """
    Conditional edge function — tells LangGraph which node to visit next.
    This is the "router" in the graph topology.
    """
    return state.get("intent", "llm")
```

**Step 2.3 — Build the Graph (app/agents/graph.py)**

```python
from langgraph.graph import StateGraph, END
from app.agents.state import AgentState
from app.agents.supervisor import classify_intent, route_by_intent
from app.agents.rag_agent import run_rag_agent
from app.agents.llm_agent import run_llm_agent
from app.agents.tools_agent import run_tools_agent
from app.agents.synthesizer import synthesize_response

def build_agent_graph():
    """
    Constructs the LangGraph state machine.

    Graph topology:
    START → classify → [conditional] → rag_agent OR llm_agent OR tools_agent
                                              ↓
                                       synthesize → END
    """
    graph = StateGraph(AgentState)

    # Add nodes (each is an async function that transforms state)
    graph.add_node("classify", classify_intent)
    graph.add_node("rag_agent", run_rag_agent)
    graph.add_node("llm_agent", run_llm_agent)
    graph.add_node("tools_agent", run_tools_agent)
    graph.add_node("synthesize", synthesize_response)

    # Entry point
    graph.set_entry_point("classify")

    # Conditional routing based on classified intent
    graph.add_conditional_edges(
        "classify",
        route_by_intent,
        {
            "rag":      "rag_agent",
            "llm":      "llm_agent",
            "tools":    "tools_agent",
            "chitchat": "llm_agent",   # chitchat also handled by LLM agent
        }
    )

    # All agents flow to synthesizer
    graph.add_edge("rag_agent",   "synthesize")
    graph.add_edge("llm_agent",   "synthesize")
    graph.add_edge("tools_agent", "synthesize")

    # Synthesizer is the terminal node
    graph.add_edge("synthesize", END)

    return graph.compile()

# Compile once at module level (expensive operation)
agent_graph = build_agent_graph()
```

---

### ✅ Phase 3 — Individual Agents (Days 6–7)

 **Goal** : RAG agent, LLM agent, and tools agent fully implemented.

**app/agents/rag_agent.py:**

```python
from app.agents.state import AgentState
from app.rag.hybrid_retriever import HybridRetriever
from app.rag.reranker import Reranker

async def run_rag_agent(state: AgentState) -> AgentState:
    """
    Retrieves relevant documents from the vector DB and passes them
    as context to the LLM for answer generation.
    """
    query = state["messages"][-1].content
    retriever = HybridRetriever(...)  # Inject from app state
    reranker = Reranker()

    # Step 1: Hybrid retrieval (vector + BM25) → top 10
    raw_docs = retriever.retrieve(query, k=10)

    # Step 2: Rerank → top 5
    reranked_docs = reranker.rerank(query, raw_docs, top_k=5)

    # Step 3: Format for LLM context
    context = "\n\n---\n\n".join([
        f"[Source {i+1}: {doc.metadata.get('source', 'Unknown')}]\n{doc.page_content}"
        for i, doc in enumerate(reranked_docs)
    ])

    # Step 4: Generate answer with retrieved context
    from langchain_openai import ChatOpenAI
    from langchain_core.prompts import ChatPromptTemplate

    rag_prompt = ChatPromptTemplate.from_messages([
        ("system", """You are a helpful assistant. Answer the question using ONLY the provided context.
If the context doesn't contain the answer, say so clearly.
Always cite which source you used (e.g., "According to Source 2...").

Context:
{context}"""),
        ("human", "{question}")
    ])

    llm = ChatOpenAI(model=settings.openai_model, temperature=0.1)
    chain = rag_prompt | llm
    result = await chain.ainvoke({"context": context, "question": query})

    return {
        "retrieved_docs": [{"content": d.page_content, "source": d.metadata.get("source")}
                           for d in reranked_docs],
        "final_answer": result.content,
        "sources": [d.metadata.get("source", "Unknown") for d in reranked_docs],
        "agent_trace": [f"RAG: retrieved {len(reranked_docs)} chunks, generated answer"]
    }
```

**app/agents/tools_agent.py:**

```python
from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain_core.prompts import ChatPromptTemplate
from app.tools.weather import WeatherTool
from app.tools.news import NewsTool
from app.tools.calculator import CalculatorTool
from app.agents.state import AgentState

async def run_tools_agent(state: AgentState) -> AgentState:
    """
    Uses LangChain's tool-calling agent to answer queries requiring
    real-time external data (weather, news, etc.)
    """
    tools = [WeatherTool(), NewsTool(), CalculatorTool()]
    llm = ChatOpenAI(model=settings.openai_model, temperature=0).bind_tools(tools)

    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a helpful assistant with access to real-time tools."),
        ("human", "{input}"),
        ("placeholder", "{agent_scratchpad}"),  # Required for tool-calling agents
    ])

    agent = create_tool_calling_agent(llm, tools, prompt)
    executor = AgentExecutor(agent=agent, tools=tools, verbose=True, max_iterations=5)

    query = state["messages"][-1].content
    result = await executor.ainvoke({"input": query})

    return {
        "final_answer": result["output"],
        "tool_results": result.get("intermediate_steps", []),
        "agent_trace": [f"Tools agent: {len(result.get('intermediate_steps', []))} tool calls"]
    }
```

**app/tools/weather.py:**

```python
from langchain_core.tools import BaseTool
from pydantic import BaseModel, Field
import httpx
from app.config import settings

class WeatherInput(BaseModel):
    city: str = Field(description="City name, e.g. 'Mumbai' or 'New York'")

class WeatherTool(BaseTool):
    name: str = "get_weather"
    description: str = "Get current weather conditions for a city. Use for weather queries."
    args_schema: type[BaseModel] = WeatherInput

    async def _arun(self, city: str) -> str:
        url = "https://api.openweathermap.org/data/2.5/weather"
        async with httpx.AsyncClient() as client:
            resp = await client.get(url, params={
                "q": city,
                "appid": settings.openweather_api_key,
                "units": "metric"
            })
            resp.raise_for_status()
            data = resp.json()
            return (
                f"Weather in {data['name']}: "
                f"{data['main']['temp']}°C, "
                f"{data['weather'][0]['description']}, "
                f"Humidity: {data['main']['humidity']}%"
            )

    def _run(self, city: str) -> str:
        raise NotImplementedError("Use async version")
```

---

### ✅ Phase 4 — MCP Server (Day 8)

 **Goal** : Custom MCP server exposing local filesystem and code execution tools.

**mcp_server/main.py:**

```python
from fastmcp import FastMCP
import subprocess, json, os
from pathlib import Path

mcp = FastMCP("AgentIQ Local Tools")

@mcp.tool()
def read_local_file(path: str) -> str:
    """Read contents of a local file. Path must be within ./data/ directory."""
    safe_path = Path("./data") / Path(path).name  # Security: prevent path traversal
    if not safe_path.exists():
        return f"Error: File {path} not found"
    return safe_path.read_text()

@mcp.tool()
def list_data_files() -> list[str]:
    """List all files in the ./data/documents directory."""
    return [f.name for f in Path("./data/documents").glob("*") if f.is_file()]

@mcp.tool()
def run_python_snippet(code: str) -> str:
    """
    Safely execute a Python code snippet and return stdout.
    Only allows: math, string operations, json parsing.
    No imports of dangerous modules.
    """
    # Security: block dangerous imports
    blocked = ["os", "sys", "subprocess", "socket", "requests", "open", "eval", "exec"]
    for term in blocked:
        if term in code:
            return f"Error: '{term}' is not allowed in code execution"

    try:
        result = subprocess.run(
            ["python3", "-c", code],
            capture_output=True, text=True, timeout=5
        )
        return result.stdout or result.stderr
    except subprocess.TimeoutExpired:
        return "Error: Code execution timed out (5s limit)"

if __name__ == "__main__":
    mcp.run()  # Runs on stdio — consumed by LangChain MCP adapter
```

---

### ✅ Phase 5 — Streaming SSE Endpoint (Day 9)

 **Goal** : Real-time streaming responses using Server-Sent Events.

**app/api/chat.py:**

```python
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from app.agents.graph import agent_graph
from app.schemas.chat import ChatRequest
from app.memory.conversation import ConversationMemory
from langchain_core.messages import HumanMessage
import json, asyncio

router = APIRouter(prefix="/chat", tags=["chat"])

@router.post("/stream")
async def chat_stream(request: ChatRequest):
    """
    Streaming chat endpoint using Server-Sent Events (SSE).

    SSE format (each line):
      data: {"type": "token", "content": "Hello"}\n\n
      data: {"type": "done", "sources": [...]}\n\n

    The client reads this as a stream, updating UI in real time.
    """
    memory = ConversationMemory(request.session_id)
    history = await memory.get_history()

    # Build initial state for the graph
    initial_state = {
        "messages": history + [HumanMessage(content=request.message)],
        "session_id": request.session_id,
        "intent": None,
        "retrieved_docs": [],
        "tool_results": [],
        "final_answer": "",
        "sources": [],
        "confidence": 0.0,
        "agent_trace": [],
    }

    async def event_generator():
        try:
            # Stream events from LangGraph execution
            async for event in agent_graph.astream_events(initial_state, version="v1"):
                event_type = event["event"]

                # Stream individual tokens as they're generated
                if event_type == "on_chat_model_stream":
                    chunk = event["data"]["chunk"]
                    if chunk.content:
                        yield f"data: {json.dumps({'type': 'token', 'content': chunk.content})}\n\n"

                # Notify client when a tool is being called
                elif event_type == "on_tool_start":
                    yield f"data: {json.dumps({'type': 'tool_call', 'tool': event['name']})}\n\n"

                # Send final metadata after streaming completes
                elif event_type == "on_chain_end" and event["name"] == "LangGraph":
                    output = event["data"].get("output", {})
                    yield f"data: {json.dumps({'type': 'done', 'sources': output.get('sources', []), 'intent': output.get('intent')})}\n\n"

            # Save to conversation memory
            await memory.add_message("user", request.message)

        except Exception as e:
            yield f"data: {json.dumps({'type': 'error', 'message': str(e)})}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",  # Disable nginx buffering
        }
    )
```

---

### ✅ Phase 6 — Memory System (Day 10)

 **Goal** : Persistent conversation history + long-term user fact extraction.

**app/memory/conversation.py:**

```python
import redis.asyncio as aioredis
import json
from langchain_core.messages import HumanMessage, AIMessage, BaseMessage
from app.config import settings

class ConversationMemory:
    """
    Stores conversation history in Redis.

    Redis key: "session:{session_id}:history"
    TTL: 24 hours (conversations expire)
    Max messages: 20 (sliding window — prevents context overflow)
    """
    MAX_MESSAGES = 20
    TTL_SECONDS = 86400  # 24 hours

    def __init__(self, session_id: str):
        self.session_id = session_id
        self.key = f"session:{session_id}:history"
        self.redis = aioredis.from_url(settings.redis_url)

    async def get_history(self) -> list[BaseMessage]:
        """Retrieve conversation history, trimmed to last MAX_MESSAGES."""
        raw = await self.redis.lrange(self.key, -self.MAX_MESSAGES, -1)
        messages = []
        for item in raw:
            data = json.loads(item)
            if data["role"] == "user":
                messages.append(HumanMessage(content=data["content"]))
            else:
                messages.append(AIMessage(content=data["content"]))
        return messages

    async def add_message(self, role: str, content: str):
        """Append message to history."""
        await self.redis.rpush(self.key, json.dumps({"role": role, "content": content}))
        await self.redis.expire(self.key, self.TTL_SECONDS)  # Reset TTL on activity
```

---

### ✅ Phase 7 — Guardrails + Observability (Day 11)

 **Goal** : Input validation, hallucination detection, LangSmith tracing.

**app/guardrails/input_filter.py:**

```python
import re
from dataclasses import dataclass

@dataclass
class FilterResult:
    is_safe: bool
    reason: str | None = None

PROMPT_INJECTION_PATTERNS = [
    r"ignore (all |previous |above )?instructions",
    r"you are now",
    r"forget your (system |previous )?prompt",
    r"jailbreak",
    r"DAN mode",
]

PII_PATTERNS = [
    r"\b\d{3}-\d{2}-\d{4}\b",           # SSN
    r"\b[A-Z]{2}\d{6}[A-Z]\b",          # Passport
    r"\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b",  # Credit card
]

def check_input(text: str) -> FilterResult:
    text_lower = text.lower()

    for pattern in PROMPT_INJECTION_PATTERNS:
        if re.search(pattern, text_lower):
            return FilterResult(False, f"Potential prompt injection detected")

    for pattern in PII_PATTERNS:
        if re.search(pattern, text):
            return FilterResult(False, "PII detected in input — please remove sensitive data")

    if len(text) > 4000:
        return FilterResult(False, "Message too long (max 4000 characters)")

    return FilterResult(True)
```

---

### ✅ Phase 8 — Document Ingestion API + Polish (Days 12–14)

 **Goal** : `/ingest` endpoint, rate limiting, error handling, full test suite.

**app/api/ingest.py:**

```python
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.rag.ingestion import load_document, chunk_documents
from app.rag.vector_store import VectorStore
from app.rag.bm25_store import BM25Store
import tempfile, os

router = APIRouter(prefix="/ingest", tags=["ingestion"])

@router.post("/")
async def ingest_document(file: UploadFile = File(...)):
    """
    Upload a document (PDF, TXT, DOCX) and add it to the RAG knowledge base.
    The document is chunked, embedded, and stored in ChromaDB + BM25 index.
    """
    allowed_types = {".pdf", ".txt", ".docx", ".md"}
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in allowed_types:
        raise HTTPException(400, f"Unsupported file type: {ext}")

    # Save to temp file (loaders need file paths)
    with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
        content = await file.read()
        tmp.write(content)
        tmp_path = tmp.name

    try:
        docs = load_document(tmp_path)
        chunks = chunk_documents(docs)

        # Add source metadata to each chunk
        for chunk in chunks:
            chunk.metadata["source"] = file.filename

        vector_store = VectorStore()
        ids = vector_store.add_documents(chunks)

        # Update BM25 index
        bm25_store = BM25Store()
        bm25_store.add_documents(chunks)

        return {
            "status": "success",
            "filename": file.filename,
            "chunks_created": len(chunks),
            "document_ids": ids[:5]  # Return first 5 as sample
        }
    finally:
        os.unlink(tmp_path)
```

---

## 📡 API Reference

### POST `/chat/stream`

Streaming chat endpoint (Server-Sent Events)

**Request:**

```json
{
  "message": "What is the weather in Delhi?",
  "session_id": "user-abc-123",
  "include_sources": true
}
```

**SSE Response stream:**

```
data: {"type": "tool_call", "tool": "get_weather"}

data: {"type": "token", "content": "The"}
data: {"type": "token", "content": " current"}
data: {"type": "token", "content": " weather"}

data: {"type": "done", "sources": [], "intent": "tools", "latency_ms": 1240}
```

### POST `/ingest`

Upload document to knowledge base

**Request:** `multipart/form-data` with `file` field

**Response:**

```json
{
  "status": "success",
  "filename": "q3-report.pdf",
  "chunks_created": 42,
  "document_ids": ["abc123", "def456"]
}
```

### GET `/health`

```json
{
  "status": "healthy",
  "vector_db": {"status": "connected", "total_documents": 156},
  "redis": "connected",
  "mcp_server": "running",
  "version": "0.1.0"
}
```

---

## 🔐 Environment Variables

| Variable                | Required    | Description                       |
| ----------------------- | ----------- | --------------------------------- |
| `OPENAI_API_KEY`      | ✅          | OpenAI API key                    |
| `OPENAI_MODEL`        | ✅          | Model name (default: gpt-4o-mini) |
| `OPENWEATHER_API_KEY` | For weather | Free at openweathermap.org        |
| `NEWS_API_KEY`        | For news    | Free at newsapi.org               |
| `REDIS_URL`           | ✅          | Redis connection string           |
| `API_KEY`             | ✅          | Your API protection key           |
| `LANGCHAIN_API_KEY`   | Recommended | LangSmith observability           |
| `CHROMA_PERSIST_DIR`  | ✅          | Path for ChromaDB data            |

---

## 🧪 Testing Strategy

```bash
# Run all tests
pytest tests/ -v --cov=app --cov-report=html

# Run only RAG tests
pytest tests/test_rag.py -v

# Run only agent routing tests
pytest tests/test_agents.py -v
```

**Key tests to write:**

```python
# tests/test_agents.py
import pytest
from app.agents.graph import agent_graph
from langchain_core.messages import HumanMessage

@pytest.mark.asyncio
async def test_weather_query_routes_to_tools():
    state = {"messages": [HumanMessage("What is the weather in Mumbai?")], ...}
    result = await agent_graph.ainvoke(state)
    assert result["intent"] == "tools"

@pytest.mark.asyncio
async def test_rag_query_routes_to_rag():
    state = {"messages": [HumanMessage("What does our Q3 report say about revenue?")], ...}
    result = await agent_graph.ainvoke(state)
    assert result["intent"] == "rag"
```

---

## 🎓 Interview Concepts Cheat Sheet

> Quick reference for AI engineering interviews.

**Q: What is the difference between RAG and fine-tuning?**

> RAG is retrieval at inference time — you give the model context on the fly. Fine-tuning bakes knowledge into model weights. RAG is better for: frequently changing data, private data, auditability, cost. Fine-tuning is better for: specific reasoning style, domain-specific language patterns, latency-sensitive tasks.

**Q: How do you evaluate a RAG system?**

> Use RAGAS metrics: (1) Faithfulness — is the answer grounded in retrieved context? (2) Answer Relevancy — does the answer address the question? (3) Context Precision — are retrieved docs actually useful? (4) Context Recall — did we retrieve all relevant docs?

**Q: What is the ReAct pattern?**

> Reasoning + Acting. The model interleaves Thought (reasoning about what to do) → Action (calling a tool) → Observation (tool result) → Thought again. Loop continues until the model decides to give a final answer.

**Q: When would you use LangGraph over LangChain?**

> LangGraph for stateful, cyclical workflows with branching logic and persistent state (agents, multi-step workflows). LangChain for linear, single-pass chains (summarize, classify, extract). LangGraph is built on top of LangChain.

**Q: How do you prevent hallucination in RAG?**

> (1) Ground answers in retrieved context only, (2) Use low temperature (0.0-0.1), (3) Add faithfulness check post-generation, (4) Include source citations so users can verify, (5) Use a "I don't know" fallback when context doesn't contain the answer.

**Q: What is chunking and why does chunk size matter?**

> Chunking splits documents for indexing. Too small (< 200 chars): loses context, incomplete sentences. Too large (> 2000 chars): retrieves too much irrelevant text, fills context window. Sweet spot: 500-1000 chars with 100-char overlap.

**Q: What is MCP?**

> Model Context Protocol — an open standard for connecting LLMs to external tools and data sources. Like USB-C but for AI tools. Allows LLMs to read files, call APIs, query databases through a standardized interface.

---

## 📚 Further Learning Resources

* [LangChain Docs](https://python.langchain.com/docs/get_started/introduction) — Official documentation
* [LangGraph Docs](https://langchain-ai.github.io/langgraph/) — Graph-based agent framework
* [RAGAS](https://docs.ragas.io/en/stable/) — RAG evaluation framework
* [ChromaDB Docs](https://docs.trychroma.com/) — Vector database
* [FastMCP](https://github.com/jlowin/fastmcp) — MCP server framework
* [LangSmith](https://smith.langchain.com/) — LLM observability platform
* [OpenAI Cookbook](https://cookbook.openai.com/) — Practical examples

---

*Built with ❤️ for developers learning Agentic AI. Star this repo if it helped you!*
