# AI Engineering Mini-Projects Guide

> 20 focused projects to learn Agentic AI, RAG, and LLMs from scratch.
> Each project teaches  **one concept** , completable in 2–3 hours.

---

## How to Use This Guide

1. Work through projects **in order within each phase**
2. Each project builds on the previous one
3. Don't skip — the small ones teach the most important fundamentals

**Recommended order:** Foundation → RAG → Agents → Memory → Tools → Production

---

## Mac Setup (Do This First)

```bash
# Install uv (fast Python package manager)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Install Redis
brew install redis && brew services start redis

# Create a shared virtual environment for all projects
mkdir ~/ai-projects && cd ~/ai-projects
uv venv --python 3.11
source .venv/bin/activate

# Install all packages you'll need across all projects
uv pip install openai langchain langchain-openai langchain-community \
  langgraph chromadb sentence-transformers rank-bm25 \
  fastapi uvicorn httpx redis python-dotenv \
  pypdf python-docx fastmcp ragas langsmith pydantic
```

Create a single `.env` file in `~/ai-projects/`:

```
OPENAI_API_KEY=sk-proj-...
OPENWEATHER_API_KEY=...        # free at openweathermap.org
NEWS_API_KEY=...               # free at newsapi.org
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=ls__...      # free at smith.langchain.com
REDIS_URL=redis://localhost:6379/0
```

---

## Phase 1 — Foundation

> Understand LLMs, tokens, streaming, and embeddings before touching RAG or agents.

---

### Project 1 — CLI Q&A Bot

**Concept:** LLM API basics — tokens, temperature, system prompts

**What you build:** A 30-line Python script that reads a question from stdin, calls OpenAI, and prints the answer. Add `--temperature` and `--model` CLI flags.

**Requirements:**

* Python, `openai` SDK, `python-dotenv`
* OpenAI API key

**File:** `01_cli_bot/main.py`

```
01_cli_bot/
└── main.py
```

**Key things to learn:**

* How `messages` array works (`system`, `user`, `assistant` roles)
* What tokens are and how `max_tokens` limits response length
* How `temperature=0` gives consistent answers vs `temperature=1` gives creative ones
* How to read API cost from `response.usage`

**Run it:**

```bash
python main.py "What is the capital of France?"
python main.py --temperature 0.9 "Write a haiku about Python"
```

---

### Project 2 — Streaming Echo Server

**Concept:** Server-Sent Events (SSE) + streaming LLM responses

**What you build:** A FastAPI endpoint that calls OpenAI with `stream=True` and forwards each token chunk as an SSE event. Test with `curl -N`.

**Requirements:**

* `fastapi`, `uvicorn`, `openai`, `python-dotenv`

**File structure:**

```
02_streaming/
└── main.py
```

**Key things to learn:**

* The difference between a normal response and a streamed one
* SSE format: `data: {"content": "Hello"}\n\n`
* `async def event_generator()` with `yield` in FastAPI
* `StreamingResponse` with `media_type="text/event-stream"`
* Why streaming matters for UX (first token in ~300ms vs waiting 5s)

**Run it:**

```bash
uvicorn main:app --reload
curl -N -X POST http://localhost:8000/stream \
  -H "Content-Type: application/json" \
  -d '{"message": "Tell me a short story"}'
```

---

### Project 3 — Prompt Comparator

**Concept:** Prompt engineering — system prompts, few-shot, chain-of-thought

**What you build:** A script that sends the same question with 5 different system prompts and prints all responses side-by-side so you can see how much prompts change the output.

**Requirements:**

* `openai`, `python-dotenv`

**File structure:**

```
03_prompt_eng/
└── compare.py
```

**Key things to learn:**

* How system prompt wording changes response tone, length, and accuracy
* Few-shot prompting: give 2–3 examples in the prompt to guide format
* Chain-of-thought: adding "Think step by step" improves reasoning
* LangChain `PromptTemplate` and `ChatPromptTemplate` for reusable prompts
* `f-strings` vs `PromptTemplate` — when to use each

**Prompts to compare:**

1. No system prompt
2. `"You are a helpful assistant."`
3. `"You are a concise assistant. Answer in one sentence only."`
4. `"Think step by step before answering."`
5. `"You are an expert. Here are two examples: [examples]"` (few-shot)

---

### Project 4 — Sentence Similarity Scorer

**Concept:** Embeddings and cosine similarity

**What you build:** A script that takes two sentences, gets their embeddings from OpenAI, computes cosine similarity with numpy, and prints a score from 0 to 1.

**Requirements:**

* `openai`, `numpy`, `python-dotenv`

**File structure:**

```
04_embeddings/
└── similarity.py
```

**Key things to learn:**

* Embeddings are just lists of floats (1536 numbers for `text-embedding-3-small`)
* Cosine similarity formula: `dot(A, B) / (norm(A) * norm(B))`
* Score of 1.0 = identical meaning, 0.0 = unrelated, negative = opposite
* Why "puppy" and "dog" score ~0.92 but "cat" and "Python" score ~0.15
* Model `text-embedding-3-small` is cheap; `text-embedding-3-large` is more accurate

**Run it:**

```bash
python similarity.py "The dog ran fast" "The puppy sprinted quickly"
# Output: Similarity: 0.94

python similarity.py "I love pizza" "The stock market crashed"
# Output: Similarity: 0.08
```

---

## Phase 2 — RAG (Retrieval-Augmented Generation)

> Build the full pipeline: store documents → retrieve relevant chunks → generate grounded answers.

---

### Project 5 — Personal Notes Search

**Concept:** Vector database basics (ChromaDB)

**What you build:** Create 20 fake "notes" as strings. Embed and store them in ChromaDB. Build a `search(query)` function that returns the top-3 most similar notes.

**Requirements:**

* `chromadb`, `openai`, `python-dotenv`

**File structure:**

```
05_vector_db/
└── notes_search.py
```

**Key things to learn:**

* ChromaDB collections: like a table, but for vectors
* `collection.add(documents, ids)` — stores text + auto-embeds
* `collection.query(query_texts, n_results=3)` — finds similar docs
* `persist_directory` — data survives script restart
* Metadata filtering: `where={"category": "work"}` to filter results

**Run it:**

```bash
python notes_search.py
# > Enter search: remind me about the project deadline
# Result 1 (score 0.91): "Need to submit the Q3 report by Friday..."
# Result 2 (score 0.87): "Meeting with team about project timeline..."
```

---

### Project 6 — Chunking Visualizer

**Concept:** Document chunking strategies

**What you build:** Load a 2-page PDF. Try 3 different chunking strategies. Print chunk count, average length, and show where one chunk ends and the next begins.

**Requirements:**

* `langchain`, `langchain-community`, `pypdf`, `python-dotenv`

**File structure:**

```
06_chunking/
├── sample.pdf       # any 2-page PDF
└── visualize.py
```

**Key things to learn:**

* `RecursiveCharacterTextSplitter` — tries to split by `\n\n`, then `\n`, then , then character
* `chunk_size=800, chunk_overlap=100` — the sweet spot for most use cases
* Too small (< 200 chars): chunks lose context. Too large (> 2000): retrieves too much noise
* Overlap prevents important sentences from being split across chunks
* `PyPDFLoader` for PDFs, `TextLoader` for `.txt`, `Docx2txtLoader` for Word

**Output to print:**

```
Strategy: RecursiveCharacterTextSplitter(size=500, overlap=50)
Total chunks: 14  |  Avg length: 423 chars  |  Min: 201  |  Max: 498
--- Chunk 1 ends: "...the model predicts the next token based on"
--- Chunk 2 starts: "on all previous tokens in the sequence..."
```

---

### Project 7 — FAQ Bot from a PDF

**Concept:** Full RAG pipeline — ingest, retrieve, generate

**What you build:** Load any PDF, chunk and embed it, store in ChromaDB. Build a `/ask` FastAPI endpoint that retrieves the top-3 relevant chunks and generates an answer with source page numbers.

**Requirements:**

* `fastapi`, `uvicorn`, `langchain`, `langchain-openai`, `langchain-community`, `chromadb`, `pypdf`, `python-dotenv`

**File structure:**

```
07_rag_pipeline/
├── ingest.py        # run once to load your PDF
├── query.py         # the RAG logic
├── main.py          # FastAPI app
└── data/
    └── your_doc.pdf
```

**Key things to learn:**

* The two phases of RAG: **index time** (ingest once) vs **query time** (retrieve every request)
* `RetrievalQA` chain from LangChain — wires retriever + LLM together
* How to inject retrieved chunks into a prompt as context
* How to extract and return source page numbers from `doc.metadata`
* The difference between `similarity_search` and `max_marginal_relevance_search` (MMR avoids redundant results)

**Run it:**

```bash
python ingest.py                 # run once
uvicorn main:app --reload
curl -X POST http://localhost:8000/ask \
  -d '{"question": "What does chapter 2 cover?"}'
# {"answer": "Chapter 2 covers...", "sources": ["page 8", "page 9"]}
```

---

### Project 8 — Search Quality Comparer

**Concept:** Hybrid search (BM25 + vector + Reciprocal Rank Fusion)

**What you build:** Same 50-doc corpus, same 10 test queries. Run pure vector, pure BM25, and hybrid search. Print the top-3 results for each method side by side.

**Requirements:**

* `chromadb`, `rank-bm25`, `openai`, `python-dotenv`, `numpy`

**File structure:**

```
08_hybrid_search/
└── compare.py
```

**Key things to learn:**

* BM25: a keyword-frequency algorithm (better for exact term matching like product codes or names)
* Vector search: semantic similarity (better for meaning-based queries)
* Hybrid wins: "FastAPI async connection pool" needs both keyword AND semantic matching
* Reciprocal Rank Fusion formula: `score = 1/(60 + rank)` — merges two ranked lists
* `alpha` parameter controls the blend (0.5 = equal weight)

**Print a table like:**

```
Query: "database connection timeout error"
Vector top-1:  "Async DB connections can slow down under heavy load"
BM25   top-1:  "connection timeout: increase POOL_TIMEOUT in config"
Hybrid top-1:  "connection timeout: increase POOL_TIMEOUT in config"  ✓ best
```

---

### Project 9 — RAG Quality Scorecard

**Concept:** RAG evaluation with RAGAS

**What you build:** Build a RAG system over one document. Manually create 10 question-answer pairs. Run RAGAS evaluation. Print a scorecard. Change one thing (chunk size, retrieval k) and re-run to see improvement.

**Requirements:**

* `ragas`, `langchain`, `langchain-openai`, `chromadb`, `datasets`, `python-dotenv`

**File structure:**

```
09_rag_eval/
├── rag.py           # your RAG pipeline from project 7
├── eval_data.json   # 10 hand-crafted Q&A pairs
└── evaluate.py      # runs RAGAS and prints scorecard
```

**Key things to learn:**

* **Faithfulness** : is the answer grounded in retrieved context? (detects hallucination)
* **Answer relevancy** : does the answer actually address the question?
* **Context precision** : are the retrieved chunks relevant to the question?
* **Context recall** : did retrieval find all the chunks needed to answer?
* How to build an `EvaluationDataset` in RAGAS format
* Why eval-driven development matters: change chunk size from 500 → 800, re-run, see if precision improves

**Output:**

```
===== RAG Scorecard =====
Faithfulness:      0.87
Answer Relevancy:  0.91
Context Precision: 0.74   ← this is low, try smaller chunks
Context Recall:    0.82
========================
```

---

## Phase 3 — Agents

> Build AI agents that reason, pick tools, and loop until they find an answer.

---

### Project 10 — Calculator Agent

**Concept:** Function/tool calling

**What you build:** Define `add`, `subtract`, `multiply`, `divide` as tools. Send a math word problem. The LLM picks the right function, you execute it, and return the result.

**Requirements:**

* `openai`, `python-dotenv`

**File structure:**

```
10_tool_calling/
└── calculator.py
```

**Key things to learn:**

* Tool schema in JSON: `{"name": "add", "parameters": {"a": int, "b": int}}`
* How the LLM returns a `tool_calls` object instead of text
* How to dispatch: `tool_calls[0].function.name` → call the right Python function
* The tool result goes back as a new `tool` role message
* `tool_choice="auto"` vs `tool_choice="required"` — when to force tool use

**Run it:**

```bash
python calculator.py "If I have 15 apples and give away 7, then triple what's left, how many do I have?"
# Thought: subtract(15, 7) = 8, then multiply(8, 3) = 24
# Answer: 24
```

---

### Project 11 — Weather + News Agent

**Concept:** ReAct agent loop (Reasoning + Acting)

**What you build:** Give the agent two tools: `get_weather(city)` and `get_news(topic)`. Ask a compound question. Watch the full `Thought → Action → Observation` loop print in the terminal.

**Requirements:**

* `langchain`, `langchain-openai`, `httpx`, `python-dotenv`
* OpenWeatherMap API key (free tier)
* NewsAPI key (free tier)

**File structure:**

```
11_react_agent/
├── tools.py         # WeatherTool and NewsTool
└── agent.py         # AgentExecutor setup
```

**Key things to learn:**

* ReAct pattern: the agent alternates between **Thought** (what should I do?) and **Action** (call tool)
* `AgentExecutor` with `verbose=True` prints every reasoning step — read these carefully
* `max_iterations=5` prevents infinite loops
* How intermediate steps are captured in `result["intermediate_steps"]`
* Error handling: what happens if the weather API is down?

**Run it:**

```bash
python agent.py "What's the weather in Mumbai and any news about monsoon?"
# Thought: I need weather for Mumbai and monsoon news
# Action: get_weather("Mumbai")
# Observation: 31°C, humid, partly cloudy
# Action: get_news("monsoon India")
# Observation: "IMD predicts above-normal monsoon..."
# Final Answer: Mumbai is currently 31°C...
```

---

### Project 12 — Two-Node Classifier Graph

**Concept:** LangGraph basics — nodes, edges, state, routing

**What you build:** A 3-node LangGraph: `classify_intent` → routes to either `math_agent` OR `text_agent` → `done`. Each node just logs what it received. Run 5 messages and trace the routing.

**Requirements:**

* `langgraph`, `langchain-openai`, `python-dotenv`

**File structure:**

```
12_langgraph_basics/
└── graph.py
```

**Key things to learn:**

* `StateGraph(TypedDict)` — the state flows through every node like a baton
* `Annotated[list, operator.add]` — state fields can accumulate (append) not just replace
* `add_node`, `add_edge`, `add_conditional_edges` — how to wire the graph
* `set_entry_point` and `END` — where the graph starts and terminates
* `graph.compile()` then `graph.invoke(initial_state)` — two separate steps
* `astream_events` for seeing every step as it happens

**State to track:**

```python
class State(TypedDict):
    messages: Annotated[list, operator.add]
    intent: str | None
    route_log: list[str]
```

---

### Project 13 — Research + Summary Duo

**Concept:** Multi-agent supervisor pattern

**What you build:** A Supervisor agent that routes queries to either a Research Agent (has web search tool) or a Summary Agent (has summarize tool). Supervisor merges both outputs into one final answer.

**Requirements:**

* `langgraph`, `langchain`, `langchain-openai`, `langchain-community`, `python-dotenv`

**File structure:**

```
13_multi_agent/
├── agents.py        # research_agent, summary_agent
├── supervisor.py    # routing logic
└── graph.py         # full graph wiring
```

**Key things to learn:**

* **Supervisor pattern** : one orchestrator agent, N specialist sub-agents
* How to pass results between agents using shared state
* Why specialization helps: a focused agent with one tool outperforms a general agent with many
* `Command(goto="agent_name")` — LangGraph's way of doing agent handoff
* How to handle the case where you need BOTH agents to run (parallel paths)

---

## Phase 4 — Memory

---

### Project 14 — Stateful Chat CLI

**Concept:** Conversation memory with Redis

**What you build:** A CLI chat loop where every message is stored in Redis. Restart the script and the history is still there. Add a `/clear` command. Print how many tokens of history are being sent each turn.

**Requirements:**

* `openai`, `redis`, `tiktoken`, `python-dotenv`

**File structure:**

```
14_conv_memory/
└── chat.py
```

**Key things to learn:**

* Redis `RPUSH key value` to append messages, `LRANGE key 0 -1` to read all
* `EXPIRE key 86400` — conversations auto-expire after 24 hours (TTL)
* `tiktoken.encoding_for_model("gpt-4o")` — count tokens before sending
* Why you need a sliding window: if history grows too large it exceeds the context window
* The difference between `ConversationBufferMemory` (keeps all) vs `ConversationSummaryMemory` (compresses old turns)

---

### Project 15 — User Fact Memory Bot

**Concept:** Long-term vector memory — store and recall user facts

**What you build:** After each chat turn, extract any user facts with a prompt (`"Does this message reveal anything about the user? Extract as bullet points"`). Store extracted facts in ChromaDB. On the next query, retrieve relevant facts and inject into system prompt.

**Requirements:**

* `openai`, `chromadb`, `python-dotenv`

**File structure:**

```
15_long_term_memory/
└── memory_bot.py
```

**Key things to learn:**

* Why vector-based long-term memory scales: retrieve only the relevant facts, not all facts
* Fact extraction prompt design: how to get clean, concise facts from messy chat
* Memory consolidation: deduplicating similar facts before storing
* The difference between **in-context memory** (in the prompt), **external memory** (DB), and **episodic memory** (summary of past sessions)

---

## Phase 5 — Tools

---

### Project 16 — Weather Tool (LangChain Pattern)

**Concept:** Wrapping an external API as a LangChain tool

**What you build:** Wrap the OpenWeatherMap API as a proper `BaseTool` subclass with a Pydantic input schema. Test it standalone, then plug it into a LangChain agent. Handle API errors.

**Requirements:**

* `langchain`, `langchain-openai`, `httpx`, `pydantic`, `python-dotenv`

**File structure:**

```
16_langchain_tool/
├── weather_tool.py  # BaseTool subclass
└── agent.py         # agent that uses it
```

**Key things to learn:**

* `BaseTool` subclass: set `name`, `description`, `args_schema`, implement `_arun`
* `args_schema` is a Pydantic model — the LLM sees the field names + descriptions as its API doc
* `description` is critical: the LLM reads it to decide when to use this tool
* `_run` (sync) vs `_arun` (async) — always implement async for production
* How to raise a `ToolException` so the agent retries instead of crashing

---

### Project 17 — Local File Reader MCP Server

**Concept:** MCP (Model Context Protocol) server

**What you build:** A FastMCP server with two tools: `list_files()` and `read_file(name)`. Run it on stdio. Connect via a LangChain MCP adapter. Ask the LLM to list your files and summarize one.

**Requirements:**

* `fastmcp`, `langchain`, `langchain-openai`, `python-dotenv`

**File structure:**

```
17_mcp_server/
├── server.py        # FastMCP server (run separately)
├── client.py        # LangChain agent using the MCP server
└── data/
    ├── notes.txt
    └── ideas.txt
```

**Key things to learn:**

* MCP is a protocol (like REST) — defines how LLMs discover and call tools
* `@mcp.tool()` decorator — registers a Python function as an MCP tool
* Stdio transport: server and client communicate via stdin/stdout (no HTTP needed locally)
* Why MCP matters: build a tool once, use it from any MCP-compatible LLM client
* Security: always validate file paths to prevent directory traversal attacks

---

## Phase 6 — Production

---

### Project 18 — Smart Cache Middleware

**Concept:** Rate limiting and LLM response caching with Redis

**What you build:** FastAPI middleware that checks Redis for a cached LLM response (keyed by query hash). Rate-limits to 10 requests/minute per IP. Logs cache hit/miss ratio. Test with curl in a loop.

**Requirements:**

* `fastapi`, `uvicorn`, `redis`, `openai`, `python-dotenv`

**File structure:**

```
18_cache_ratelimit/
└── main.py
```

**Key things to learn:**

* Cache key: `hashlib.md5(query.encode()).hexdigest()` — same query = same key
* `SETEX key 3600 value` — cache with 1-hour expiry
* Rate limiting: `INCR ip:127.0.0.1 → check > 10 → return 429`
* `EXPIRE ip:127.0.0.1 60` — resets the counter every 60 seconds
* How to measure cache hit rate: save hits/misses to Redis counters
* Cached responses save ~$0.002/query × thousands of queries = real money

---

### Project 19 — Traced RAG Pipeline

**Concept:** LLM observability with LangSmith

**What you build:** Take the RAG bot from project 7. Add `LANGCHAIN_TRACING_V2=true`. Run 5 queries. Open LangSmith dashboard and inspect: which step is slowest? Which prompt uses the most tokens?

**Requirements:**

* Everything from project 7 + `langsmith` + LangSmith account (free)

**File structure:**

```
19_observability/
└── rag_traced.py    # project 7 with tracing enabled
```

**Key things to learn:**

* LangSmith auto-instruments every `langchain` call — zero code changes needed
* A **trace** shows the full execution tree: retrieval → prompt formatting → LLM call → output parsing
* **Latency breakdown** : is the bottleneck the embedding call, the vector search, or the LLM?
* **Token usage per step** : see exactly which prompt template is burning tokens
* How to add custom metadata: `with tracing_context(metadata={"user_id": "u123"})`

---

### Project 20 — Request Filter Middleware

**Concept:** Input guardrails — prompt injection detection, PII filtering

**What you build:** FastAPI middleware that checks every `/chat` request for prompt injection phrases, PII patterns (SSN, credit card numbers), and message length. Returns a `400` with a reason. Logs all blocked requests to a file.

**Requirements:**

* `fastapi`, `uvicorn`, `python-dotenv`

**File structure:**

```
20_guardrails/
└── main.py
```

**Key things to learn:**

* Prompt injection patterns: `"ignore previous instructions"`, `"you are now"`, `"forget your prompt"`
* PII regex patterns: SSN `\d{3}-\d{2}-\d{4}`, credit card `\d{4}[\s-]?\d{4}...`
* Middleware order matters: guardrails run BEFORE the LLM call to save cost
* Why you log blocked requests: build a dataset of attack patterns to improve filters
* The limits of regex-based filtering: sophisticated injections get through; LLM-based classifiers are more robust but slower

---

## Quick Reference — Dependencies by Project

| #  | Project             | Key packages                                          |
| -- | ------------------- | ----------------------------------------------------- |
| 1  | CLI Q&A Bot         | `openai`                                            |
| 2  | Streaming Server    | `openai fastapi uvicorn`                            |
| 3  | Prompt Comparator   | `openai langchain`                                  |
| 4  | Similarity Scorer   | `openai numpy`                                      |
| 5  | Notes Search        | `chromadb openai`                                   |
| 6  | Chunking Visualizer | `langchain pypdf`                                   |
| 7  | FAQ Bot (RAG)       | `langchain langchain-openai chromadb pypdf fastapi` |
| 8  | Hybrid Search       | `chromadb rank-bm25 openai numpy`                   |
| 9  | RAG Scorecard       | `ragas langchain chromadb datasets`                 |
| 10 | Calculator Agent    | `openai`                                            |
| 11 | Weather+News Agent  | `langchain langchain-openai httpx`                  |
| 12 | Classifier Graph    | `langgraph langchain-openai`                        |
| 13 | Multi-Agent Duo     | `langgraph langchain langchain-openai`              |
| 14 | Stateful Chat CLI   | `openai redis tiktoken`                             |
| 15 | Fact Memory Bot     | `openai chromadb`                                   |
| 16 | Weather Tool        | `langchain langchain-openai httpx pydantic`         |
| 17 | MCP Server          | `fastmcp langchain langchain-openai`                |
| 18 | Cache Middleware    | `fastapi redis openai`                              |
| 19 | Traced RAG          | `langchain langchain-openai chromadb langsmith`     |
| 20 | Request Guardrails  | `fastapi`                                           |

---

*Complete all 20 → you are ready to build the full AgentIQ backend.*
