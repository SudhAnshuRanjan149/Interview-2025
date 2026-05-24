# FusionAIX Interview Preparation Guide

### AI Systems Engineer / GenAI Backend Engineer

> **Strategy:** If you prepare ONE thing, prepare: *"Design an AI assistant using RAG + Agents + FastAPI + Vector DB"* — it covers 70% of the interview.

---

## SECTION 1 — LLM / GENAI

---

### Q1. What is a Large Language Model (LLM)?

**One-line answer:** An LLM is a deep learning model trained on massive text data to understand and generate human language using the Transformer architecture.

**How to answer:**

> "An LLM is a neural network — typically based on the Transformer architecture — trained on billions of tokens of text using self-supervised learning. It learns to predict the next token, and through that process captures language patterns, world knowledge, and reasoning. Models like GPT-4, Claude, and Gemini are LLMs. They're used for text generation, summarization, Q&A, code generation, and more."

**Key terms to know:**

* **Transformer:** Attention-based architecture (Encoder-Decoder or Decoder-only)
* **Pre-training:** Learning from raw unlabeled text at scale
* **Fine-tuning:** Adapting a pre-trained model to a specific task
* **RLHF:** Reinforcement Learning from Human Feedback — used to align models with human preferences

---

### Q2. Explain how GPT works internally.

**One-line answer:** GPT is a decoder-only Transformer that predicts the next token using masked self-attention across all previous tokens.

**How to answer:**

> "GPT uses a stack of Transformer decoder blocks. Input text is tokenized and converted to embeddings. Each block applies masked multi-head self-attention — so each token can attend to all previous tokens — followed by a feed-forward network. The final layer outputs a probability distribution over the vocabulary, and the model picks the next token. This is repeated autoregressively to generate text."

**Key concepts:**

* **Self-attention:** Each token computes relevance scores against all other tokens
* **Masked attention:** Future tokens are hidden during training to prevent cheating
* **Autoregressive generation:** Tokens are generated one at a time, each conditioned on all prior tokens
* **Context window:** Maximum number of tokens the model can attend to at once

---

### Q3. What are tokens and how do they affect cost?

**One-line answer:** Tokens are the smallest units of text an LLM processes — roughly 4 characters or ¾ of a word — and API cost is directly proportional to tokens consumed.

**How to answer:**

> "LLMs don't process characters or words — they process tokens. A token is roughly 3–4 characters; 'unhappiness' might be 3 tokens. Cost is billed per 1,000 tokens (input + output). So a long system prompt, large context, or verbose response all increase cost. To optimize: compress prompts, truncate retrieved context, cache repeated calls, and limit `max_tokens` in responses."

**Practical numbers (approximate):**

* 1,000 tokens ≈ 750 words
* GPT-4 Turbo: ~$0.01/1K input tokens, ~$0.03/1K output
* Long context (128K) = 128× higher potential cost per call

---

### Q4. What is temperature and top_p?

**One-line answer:** Temperature controls randomness; top_p controls vocabulary diversity — both shape how the model samples its next token.

**How to answer:**

> "After the model scores all possible next tokens, we sample from that distribution. Temperature scales the logits: temp=0 is greedy (always pick the highest probability token), temp=1 is the raw distribution, and temp>1 makes responses more random. `top_p` (nucleus sampling) restricts sampling to the smallest set of tokens whose cumulative probability exceeds `p` — e.g., top_p=0.9 means we only sample from tokens that together sum to 90% probability. For deterministic tasks like SQL or code, I use low temp (0–0.2). For creative tasks, higher (0.7–1.0)."

| Setting         | Value | Use Case              |
| --------------- | ----- | --------------------- |
| `temperature` | 0     | SQL, factual Q&A      |
| `temperature` | 0.7   | General chat          |
| `temperature` | 1.0+  | Creative writing      |
| `top_p`       | 0.9   | Default for most apps |

---

### Q5. What is prompt engineering? Give examples.

**One-line answer:** Prompt engineering is the practice of crafting and structuring inputs to an LLM to reliably produce desired outputs.

**How to answer:**

> "Prompt engineering means designing system prompts and user message formats that guide LLM behavior. Techniques include: giving the model a role ('You are a senior SQL developer'), specifying output format ('Respond only in JSON'), providing examples (few-shot), using chain-of-thought ('Think step by step'), and constraining scope ('Only answer from the provided context'). Good prompts reduce hallucination and improve consistency."

**Examples:**

```
# Role + Format constraint
System: You are a customer support agent. Reply in 2 sentences max. Never mention competitors.

# Chain-of-thought
User: What is 17 × 24? Think step by step.

# Output format
User: Extract name and email from this text. Return as JSON: {"name": "", "email": ""}
```

---

### Q6. What are few-shot vs zero-shot prompts?

**One-line answer:** Zero-shot gives no examples; few-shot includes 2–5 examples to teach the model the expected pattern.

**How to answer:**

> "Zero-shot means you describe the task and let the model figure it out. Few-shot means you include labeled examples in the prompt so the model learns the format and logic from demonstration. Few-shot is more reliable for structured outputs, edge cases, or non-standard formats. The trade-off is token cost — examples consume context window space."

```
# Zero-shot
Classify the sentiment of: "The delivery was late." Answer: Positive/Negative/Neutral.

# Few-shot
"Great product!" → Positive
"Terrible experience." → Negative
"It was okay." → Neutral
Now classify: "The delivery was late." →
```

---

### Q7. What is hallucination in LLMs?

**One-line answer:** Hallucination is when an LLM generates factually incorrect or fabricated content with apparent confidence.

**How to answer:**

> "LLMs are trained to generate plausible text, not necessarily true text. When the model doesn't know something, it may still produce a confident-sounding answer — a 'hallucination'. This is a core challenge in production AI. Types include: fabricated facts, wrong citations, made-up function names in code, and wrong calculations. It happens because the model optimizes for token probability, not factual accuracy."

---

### Q8. How do you reduce hallucination?

**How to answer:**

> "My primary approach is RAG — retrieval-augmented generation. Instead of relying on the model's parametric memory, I retrieve relevant documents and instruct the model to answer only from those documents. I also use: explicit instructions like 'If you don't know, say so', structured output with validation (Pydantic), confidence scoring, and human-in-the-loop review for high-stakes outputs. For code, I run the output in a sandbox and verify it executes correctly."

**Techniques checklist:**

* RAG with source attribution
* System prompt: `"Only answer from the provided context. Say 'I don't know' if the answer isn't there."`
* Structured outputs (JSON schema) to catch format errors
* Self-consistency: run multiple samples, compare
* LLM-as-judge: use another LLM to verify the output

---

### Q9. What are guardrails in LLM systems?

**One-line answer:** Guardrails are safety and quality checks that validate LLM inputs and outputs to prevent harmful, off-topic, or incorrect responses.

**How to answer:**

> "Guardrails sit around the LLM call — input guardrails block malicious or out-of-scope prompts (prompt injection, PII in input), and output guardrails validate and filter responses before they reach the user. Tools like NVIDIA NeMo Guardrails, Guardrails AI, or custom classifiers can implement this. In production, I always validate that the response matches the expected schema and doesn't contain PII or unsafe content."

**Examples:**

* Input: detect prompt injection, block competitors' names, strip PII
* Output: validate JSON schema, toxicity filter, fact-check against source docs

---

### Q10. How do you evaluate LLM outputs?

**How to answer:**

> "LLM evaluation is multi-dimensional. I use: automated metrics like ROUGE/BLEU for summarization tasks, semantic similarity (cosine similarity with embeddings) for RAG, and LLM-as-judge where GPT-4 scores outputs on criteria like accuracy, helpfulness, and groundedness. For RAG specifically, I measure retrieval precision/recall and answer faithfulness. I also maintain an eval dataset of golden Q&A pairs and run regression tests on every deployment."

**Evaluation frameworks:** RAGAS (for RAG), DeepEval, TruLens, LangSmith

| Metric            | What it measures                 |
| ----------------- | -------------------------------- |
| Faithfulness      | Answer supported by source docs? |
| Answer Relevance  | Does it answer the question?     |
| Context Precision | Were retrieved docs relevant?    |
| ROUGE-L           | Text overlap vs reference        |

---

## SECTION 2 — RAG (RETRIEVAL-AUGMENTED GENERATION)

---

### Q11. What is RAG architecture?

**One-line answer:** RAG combines a retrieval system (vector search over documents) with an LLM generator, so the model answers based on retrieved facts rather than its training memory.

**How to answer:**

> "RAG solves the hallucination and stale knowledge problem. The architecture has two phases: offline indexing — documents are chunked, embedded into vectors, and stored in a vector DB — and online querying — the user's question is embedded, similar document chunks are retrieved, and those chunks are stuffed into the LLM's context window along with the question. The LLM then answers grounded in the retrieved content. This is cheaper and more updatable than fine-tuning."

```
User Question
     ↓
[Embed Question] → Vector DB → [Top-K Chunks]
                                      ↓
                          [LLM Prompt = Chunks + Question]
                                      ↓
                               Grounded Answer
```

---

### Q12. Explain the embedding → retrieval → generation pipeline.

**How to answer:**

> "Embedding: text is converted to a dense numerical vector (e.g. 1536-dim with OpenAI's ada-002) that captures semantic meaning. Similar meaning = similar vector direction. Retrieval: the user's query is embedded, and we run nearest-neighbor search in the vector DB to find the top-K most semantically similar document chunks. Generation: those chunks are injected into the LLM prompt as context, and the LLM generates an answer grounded in that context."

---

### Q13. What is chunking? Best practices?

**One-line answer:** Chunking is splitting documents into smaller pieces before embedding, since embedding entire documents loses granularity and exceeds context limits.

**How to answer:**

> "Chunking strategy significantly impacts retrieval quality. A chunk that's too large is noisy; too small loses context. My default is 512–1024 tokens with a 10–20% overlap between chunks to avoid cutting mid-sentence. For structured docs, I chunk by section or heading. I also store metadata (source, page number, section) with each chunk for citation. Advanced: use recursive text splitting or semantic chunking (split on meaning boundaries, not just character count)."

**Strategies:**

* Fixed-size with overlap (most common)
* Recursive character splitter (LangChain default)
* Semantic chunking (embedding-based boundary detection)
* Document-structure-aware (by heading, paragraph)

---

### Q14. What is a vector database?

**One-line answer:** A vector database stores high-dimensional embeddings and supports fast approximate nearest-neighbor (ANN) search to find semantically similar vectors.

**How to answer:**

> "A vector DB is purpose-built for embedding storage and similarity search. Unlike SQL which finds exact matches, a vector DB finds vectors close in embedding space — meaning semantically related content. It uses indexing algorithms like HNSW or IVF for fast approximate search at scale. I use it as the retrieval backbone in RAG systems."

---

### Q15. Difference between FAISS, Pinecone, Weaviate?

|                    | FAISS                       | Pinecone              | Weaviate                   |
| ------------------ | --------------------------- | --------------------- | -------------------------- |
| Type               | Library (in-memory/on-disk) | Managed cloud service | Self-hosted or cloud       |
| Persistence        | Manual                      | Fully managed         | Built-in                   |
| Scalability        | Single-machine              | Auto-scales           | Horizontal scale           |
| Metadata filtering | Limited                     | Yes                   | Yes (with GraphQL)         |
| Best for           | Prototyping, research       | Production SaaS       | Production + hybrid search |

**How to answer:**

> "FAISS is Facebook's open-source library — great for prototyping or when everything fits in memory, but you manage persistence and scaling yourself. Pinecone is a fully managed cloud service with built-in metadata filtering — zero ops overhead, ideal for production SaaS apps. Weaviate is open-source with richer features: hybrid search (dense + BM25), GraphQL API, and can be self-hosted. I use FAISS for local dev, Pinecone or Weaviate for production."

---

### Q16. What is cosine similarity?

**One-line answer:** Cosine similarity measures the angle between two vectors — a value of 1 means identical direction (most similar), 0 means orthogonal (unrelated), -1 means opposite.

**How to answer:**

> "In vector search, we don't measure Euclidean distance — we measure the angle between vectors, which is direction-invariant. Cosine similarity = (A·B) / (|A| × |B|). Two semantically similar sentences will have embeddings pointing in nearly the same direction, giving a cosine similarity close to 1. This is why embedding models trained with contrastive loss work well — similar content clusters together in vector space."

---

### Q17. How do you improve retrieval quality?

**How to answer:**

> "Retrieval quality is the biggest lever in RAG performance. I improve it through: better chunking (smaller, more focused chunks with overlap), metadata filtering (pre-filter by date, category, user ID before vector search), hybrid search (combine dense vector search with BM25 keyword search), HyDE (generate a hypothetical answer and use that as the search query), and query expansion (rewrite the user query into multiple sub-queries). Re-ranking is the highest-impact single improvement."

---

### Q18. What is re-ranking?

**One-line answer:** Re-ranking is a second-pass scoring step that takes the top-K retrieved chunks and reorders them using a more powerful cross-encoder model before passing them to the LLM.

**How to answer:**

> "Vector search is fast but approximate — it uses bi-encoders that embed query and document separately. Re-rankers use cross-encoders that jointly attend to both query and document, giving much more accurate relevance scores. The workflow: retrieve top-50 candidates with vector search, re-rank with a cross-encoder (e.g. Cohere Rerank, BGE-Reranker), pass only the top-5 to the LLM. This dramatically improves precision at minimal latency cost."

---

### Q19. How do you handle large documents in RAG?

**How to answer:**

> "Large documents (100+ pages) need special handling. My approach: chunk at the section/heading level for structure-aware splitting, store parent-child relationships (small chunk for retrieval, larger surrounding context for generation — 'small-to-big' retrieval), use document summarization as a metadata field for filtering, and implement a 'map-reduce' pattern for full-document Q&A — process each chunk independently then aggregate answers."

---

### Q20. How do you cache RAG results?

**How to answer:**

> "LLM calls are expensive and slow. I cache at two levels: semantic caching — if a new query is very similar (cosine similarity > 0.95) to a cached query, return the cached answer (using Redis + embeddings with GPTCache); and exact caching — hash the exact prompt and cache in Redis with a TTL. For high-traffic systems, I also pre-compute and cache answers for common FAQ-style queries during off-peak hours."

---

## SECTION 3 — AGENTIC AI

---

### Q21. What is an AI agent?

**One-line answer:** An AI agent is an LLM that can take actions — calling tools, making decisions, and iterating — to complete a goal, rather than just producing a single response.

**How to answer:**

> "A basic LLM takes input and returns text. An agent is an LLM in a loop: it receives a goal, decides what action to take (call a tool, search the web, query a DB), observes the result, and repeats until the goal is achieved. The key addition over a standard LLM is tool use + loop + memory. Think of it as giving the LLM hands — it can now act on the world, not just describe it."

---

### Q22. Difference between LLM and agent?

|                 | LLM                 | Agent                            |
| --------------- | ------------------- | -------------------------------- |
| Execution       | Single inference    | Multi-step loop                  |
| Tools           | None                | Can call external tools          |
| Memory          | Context window only | Can read/write persistent memory |
| Decision-making | Responds to input   | Plans and acts autonomously      |
| Examples        | Chat completion     | AutoGPT, ReAct agent             |

---

### Q23. What is tool/function calling?

**One-line answer:** Function calling lets the LLM output a structured JSON object requesting a specific tool be called with specific parameters, instead of free-form text.

**How to answer:**

> "You define tools as JSON schemas — name, description, parameters. The LLM, instead of answering in prose, outputs a JSON object like `{tool: 'search_db', args: {query: 'revenue 2024'}}`. Your application code then executes that tool and feeds the result back to the LLM. This is the foundation of agents — it allows the LLM to interact with external systems in a structured, reliable way."

```python
tools = [{
    "name": "get_weather",
    "description": "Get current weather for a city",
    "parameters": {
        "type": "object",
        "properties": {
            "city": {"type": "string"}
        },
        "required": ["city"]
    }
}]
# LLM responds: {"name": "get_weather", "arguments": {"city": "Mumbai"}}
```

---

### Q24. Explain multi-agent systems.

**One-line answer:** Multi-agent systems are architectures where multiple specialized AI agents collaborate — each handling a subtask — to complete a complex goal no single agent handles well.

**How to answer:**

> "Complex tasks benefit from specialization. A multi-agent system might have a planner agent that breaks a goal into subtasks, researcher agents that gather information, a writer agent that drafts output, and a critic agent that reviews it. Agents communicate by passing messages or sharing a scratchpad. This mirrors how teams work — and it improves reliability since each agent has a focused, testable responsibility."

---

### Q25. How do agents communicate?

**How to answer:**

> "Agents can communicate via shared memory/state (a shared dict or DB both agents read/write), message passing (one agent outputs a structured message, the next reads it as input), or an orchestrator pattern (a supervisor agent routes tasks and collects results). In frameworks like LangGraph, agents communicate through a graph with typed state. In CrewAI, agents pass messages with task descriptions and outputs."

---

### Q26. What is orchestration vs choreography?

**How to answer:**

> "Orchestration has a central controller — a supervisor agent or workflow engine — that decides what each agent does and when. It's easier to reason about and debug. Choreography means agents react to events with no central controller — each agent knows its triggers and outputs. Orchestration is better for structured, predictable workflows (like a document processing pipeline). Choreography suits loosely coupled, event-driven systems. For LLM agents, I usually prefer orchestration because debugging agent behavior without a central trace is very hard."

---

### Q27. How do you design agent workflows?

**How to answer:**

> "I start by mapping the task as a DAG — nodes are subtasks, edges are data dependencies. Each node becomes an agent or tool call. I identify: what's parallelizable (run concurrently), what's sequential (strict dependency), and where human-in-the-loop checkpoints are needed. I define typed inputs/outputs for each agent, implement retry logic on failures, and use LangGraph or Prefect to enforce the workflow. I always add observability from day one — tracing every agent call with LangSmith or similar."

---

### Q28. What are retry/fallback strategies?

**How to answer:**

> "LLM calls fail: timeouts, rate limits, malformed outputs. My strategy: exponential backoff with jitter for transient failures (3 retries: 1s, 2s, 4s). For malformed outputs, I use output parsers with repair prompts — 'Your last output was invalid JSON. Here was the error: {error}. Please fix it.' For critical paths, I implement fallback models (primary: GPT-4, fallback: GPT-3.5-Turbo). For tools, circuit breakers prevent cascading failures."

---

### Q29. How do you maintain state in agents?

**How to answer:**

> "Agents need state for multi-turn tasks. I use a few patterns: in-memory state for short sessions (Python dict passed through the graph), Redis for session state across API calls (keyed by session_id), a database for long-running or resumable workflows, and a scratchpad pattern where the agent appends observations to a running text buffer. LangGraph uses a typed `State` object threaded through the graph — my preferred approach for complex workflows."

---

### Q30. What frameworks have you used (LangChain, CrewAI, etc)?

**How to answer:**

> "I've worked with LangChain for chains and RAG pipelines — it has the broadest ecosystem. LangGraph for stateful, multi-step agent workflows — it models agents as graphs which makes complex flows debuggable. CrewAI for role-based multi-agent systems where you define agents by persona and goal. I've also used the OpenAI Assistants API for simpler agent use cases. My preference: LangGraph for production agents — the graph model + built-in state management + LangSmith tracing is a complete stack."

---

## SECTION 4 — PYTHON + BACKEND

---

### Q31. Why FastAPI over Flask/Django?

**How to answer:**

> "FastAPI is purpose-built for modern async API development. Flask is synchronous by default and requires extensions for everything. Django is a full web framework — great for traditional apps but heavy for microservices. FastAPI gives me: native async/await support (critical for LLM calls and DB queries), automatic OpenAPI docs, Pydantic input validation out of the box, and excellent performance (comparable to Node.js). For AI APIs that make concurrent LLM calls, async is non-negotiable."

|            | FastAPI                | Flask          | Django            |
| ---------- | ---------------------- | -------------- | ----------------- |
| Async      | Native                 | Via extensions | Partial           |
| Validation | Pydantic built-in      | Manual         | Forms/serializers |
| Docs       | Auto OpenAPI           | Manual         | DRF only          |
| Best for   | AI APIs, microservices | Simple apps    | Full web apps     |

---

### Q32. How do you design REST APIs?

**How to answer:**

> "I follow REST conventions: resources as nouns in URLs (`/users/{id}`, not `/getUser`), correct HTTP verbs (GET for read, POST for create, PUT/PATCH for update, DELETE for remove), proper status codes (200, 201, 400, 404, 422, 500), and versioning (`/v1/...`). For AI APIs specifically, I expose streaming endpoints using SSE or WebSockets for LLM responses, async task endpoints for long-running jobs (returns a job ID, poll `/jobs/{id}/status`), and consistent error response schema."

---

### Q33. What is async programming in Python?

**One-line answer:** Async programming lets a Python process handle multiple I/O-bound tasks concurrently without blocking, using `async/await` and an event loop.

**How to answer:**

> "Python's `asyncio` runs an event loop on a single thread. When an async function hits an `await`, it yields control so other coroutines can run during the wait. This is ideal for LLM API calls, DB queries, HTTP requests — anything I/O-bound. With FastAPI, I define route handlers as `async def`, and all concurrent requests share the event loop without spawning threads. For CPU-bound work (e.g. data processing), I use `asyncio.run_in_executor` to offload to a thread/process pool."

```python
async def call_llm(prompt: str) -> str:
    # Non-blocking: other requests can run while awaiting
    response = await openai_client.chat.completions.create(
        model="gpt-4", messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content
```

---

### Q34. What is Pydantic?

**One-line answer:** Pydantic is a Python library for data validation and serialization using type annotations — FastAPI uses it for request/response models.

**How to answer:**

> "Pydantic models are Python classes where fields are declared with type annotations. At runtime, Pydantic validates input data against those types, coerces types where possible, and raises clear validation errors otherwise. In FastAPI, I define request bodies and response models as Pydantic classes — this gives me free input validation, auto-generated JSON schema, and IDE support. I also use Pydantic to parse and validate LLM JSON outputs."

```python
from pydantic import BaseModel, validator

class QueryRequest(BaseModel):
    question: str
    max_tokens: int = 500
  
    @validator('question')
    def question_not_empty(cls, v):
        if not v.strip():
            raise ValueError('Question cannot be empty')
        return v
```

---

### Q35. How do you validate API inputs/outputs?

**How to answer:**

> "For inputs: Pydantic models in FastAPI handle type validation, required fields, and custom validators automatically — returning 422 Unprocessable Entity on failure. For business logic validation (e.g. user has permission to access resource), I add dependency injection checks. For LLM outputs: I use structured output mode (OpenAI response_format: json_object) and parse with Pydantic. If parsing fails, I have a retry loop that sends the error back to the LLM for self-correction."

---

### Q36. How do you handle errors in APIs?

**How to answer:**

> "I define a consistent error response schema: `{error: str, code: str, details: dict}`. I use FastAPI exception handlers to catch and format errors at the app level, keeping route handlers clean. For LLM-specific errors: I distinguish between retriable errors (rate limit → backoff and retry), non-retriable (invalid API key → 500 with alert), and validation errors (bad output → retry with corrective prompt). I always log full stack traces with request context, and return user-friendly messages — never raw exceptions."

---

## SECTION 5 — SYSTEM DESIGN

---

### Q37. Design a scalable AI assistant system.

**How to answer (walk through this structure):**

> "I'd design it as a layered system:
>
> 1. **API Gateway** (FastAPI) — handles auth, rate limiting, request routing
> 2. **Session Service** — manages conversation history in Redis
> 3. **RAG Pipeline** — query → embed → vector search → re-rank → context assembly
> 4. **Agent Orchestrator** — decides if a tool call is needed or pure generation
> 5. **LLM Service** — abstraction over multiple providers (OpenAI, Azure OpenAI) with fallback
> 6. **Vector DB** (Pinecone/Weaviate) — document knowledge base
> 7. **Cache Layer** — semantic cache for repeated queries
> 8. **Observability** — LangSmith traces, Prometheus metrics, structured logs"

**Key design decisions to mention:**

* Async throughout for concurrency
* Streaming responses via SSE
* Rate limiting per user/tenant
* Horizontal scaling of stateless components

---

### Q38. How would you build a ChatGPT-like system?

**How to answer:**

> "Core components: a stateless API server (FastAPI), conversation history stored in Redis keyed by session ID, streaming via Server-Sent Events for real-time token output, a system prompt per deployment that defines the assistant's persona, RAG for domain knowledge, and a content moderation layer on both input and output. For scale: I'd put the API behind a load balancer, use Redis Cluster for session state, and batch requests to the LLM using async queuing. Streaming is the user-visible performance win — first token in ~500ms feels fast even if full response takes 5s."

---

### Q39. How do you scale microservices?

**How to answer:**

> "Horizontal scaling (more instances behind a load balancer) for stateless services. For stateful services, use sticky sessions or extract state to Redis/DB. I containerize with Docker, deploy on Kubernetes, and use HPA (Horizontal Pod Autoscaler) to scale on CPU/memory metrics — or for AI services, on request queue depth. Service discovery via Kubernetes DNS. Inter-service communication: sync calls via REST/gRPC for request-response, async via message queue (Kafka/RabbitMQ) for event-driven flows."

---

### Q40. How do you manage rate limits?

**How to answer:**

> "Two perspectives: enforcing limits on my API (to protect downstream), and handling limits from upstream providers (OpenAI). For my API: token bucket or sliding window algorithm in Redis, enforced per user/tenant in FastAPI middleware. For upstream LLM rate limits: use a queue (Redis queue or Celery) to serialize requests, implement exponential backoff with jitter on 429 responses, and distribute load across multiple API keys if the provider allows it."

---

### Q41. How do you design caching for LLM calls?

**How to answer:**

> "Three layers: L1 exact cache — hash the full prompt, store result in Redis with a 1h TTL, 100% hit rate for identical prompts. L2 semantic cache — embed the query, store in a vector index alongside the answer; if a new query has cosine similarity > 0.95 to a cached query, return cached answer (GPTCache implements this). L3 pre-computation — for known FAQ-type queries, pre-generate and store answers offline. L2 is the highest-impact for conversational AI where users rephrase the same question."

---

### Q42. How do you reduce inference latency?

**How to answer:**

> "Key levers: streaming (first token fast, perceived latency drops dramatically), prompt compression (remove redundant context, summarize history), smaller models for simple tasks (use GPT-3.5 for classification, GPT-4 for complex reasoning), caching (avoid the call entirely), and parallel calls (fan out independent LLM calls concurrently with `asyncio.gather`). At infrastructure level: deploy models in the same region as users, use Azure OpenAI's provisioned throughput for consistent latency."

---

## SECTION 6 — PERFORMANCE & OPTIMIZATION

---

### Q43. How do you measure latency in LLM apps?

**How to answer:**

> "I track four latency metrics: TTFT (Time to First Token) — most important for user experience, measures how quickly streaming starts; total response time; retrieval latency (vector search + re-ranking); and end-to-end pipeline latency. I instrument with OpenTelemetry spans wrapping each stage, export to Jaeger/Grafana for visualization. I set SLO targets: TTFT < 1s, total < 10s for most queries. I alert when P95 latency exceeds threshold."

---

### Q44. GPU vs CPU inference — when to use?

**How to answer:**

> "GPU inference is 10–100× faster for large models thanks to parallelized matrix operations. For production LLM inference, always GPU. CPU is fine for: small embedding models, lightweight classifiers, and low-traffic scenarios where latency isn't critical. For self-hosted models (LLaMA, Mistral), I use GPU servers with vLLM for efficient batched inference. For embedding generation at ingestion time (offline), CPU + batching is cost-effective. Cloud APIs (OpenAI) abstract this entirely."

---

### Q45. What is batching?

**One-line answer:** Batching groups multiple inference requests together and processes them in a single forward pass, dramatically improving GPU utilization and throughput.

**How to answer:**

> "Sending requests one-by-one to a GPU leaves it underutilized between requests. Batching groups N requests, processes them together, and returns N results. For embedding generation during document indexing, I batch 100+ texts per API call instead of one-by-one. For self-hosted models with vLLM, continuous batching dynamically groups incoming requests. Trade-off: batching increases throughput but adds latency for individual requests waiting to be batched."

---

### Q46. How to reduce token cost?

**How to answer:**

> "Token cost = (input tokens + output tokens) × price/token. Reduction strategies: compress system prompts (remove verbose instructions, use concise language), truncate conversation history (keep only last N turns or summarize older turns), limit retrieved context (top-3 chunks, not top-10), constrain `max_tokens` in the response, use cheaper models for simpler tasks (GPT-3.5 for classification, GPT-4 only for complex generation), and cache repeated calls. I track token usage per request in logs and set budget alerts."

---

### Q47. How to optimize memory usage?

**How to answer:**

> "For self-hosted models: use quantization (4-bit or 8-bit with bitsandbytes reduces model memory by 2–4×), load models in float16 not float32, and use model sharding across GPUs for very large models. For Python application memory: profile with memory_profiler, avoid loading large datasets into RAM (use generators/streaming), offload embeddings to disk-backed vector stores rather than in-memory FAISS, and recycle document chunks after ingestion rather than holding them in memory."

---

## SECTION 7 — TESTING & DEBUGGING

---

### Q48. How do you test LLM systems?

**How to answer:**

> "LLM testing is non-deterministic, so I test at multiple levels. Unit tests: test individual components — chunking logic, retrieval (mock the vector DB), output parsers — with standard pytest. Integration tests: test the RAG pipeline end-to-end with a fixed test dataset, assert that answers contain expected keywords or match golden answers. LLM-specific tests: maintain an eval dataset of (question, expected_answer) pairs, run them on every deployment, measure scores with RAGAS. I also do regression tests: if a new model/prompt change causes score drops > 5%, block the deploy."

---

### Q49. What are unit vs integration tests in AI systems?

**How to answer:**

> "Unit tests isolate a single component. In AI systems: test that a chunker splits text correctly, that a parser correctly extracts JSON from LLM output, that a retriever returns the right number of results. Mock all external calls (LLM API, vector DB). Integration tests run the full pipeline together — real vector DB, real or stubbed LLM — to verify that data flows correctly across components. I use deterministic test fixtures (fixed documents, fixed embeddings) to make integration tests reproducible."

---

### Q50. How do you debug hallucination or wrong outputs?

**How to answer:**

> "My debugging process: first, check the retrieved context — did the right documents come back? If not, it's a retrieval problem (chunking, embedding, or query issue). If context is correct, check the prompt — is the instruction clear enough? Is there conflicting information in the context? Next, check model temperature — high temp increases variability. I use LangSmith traces to see the exact prompt sent to the LLM for every step. For systematic analysis, I log input, retrieved context, and output for every failing case and look for patterns."

---

## BONUS TOPICS

---

### RAG vs Fine-tuning — Tradeoffs

**How to answer:**

> "RAG is better when: knowledge changes frequently (no retraining needed), you need source citations, or you have a small dataset. Fine-tuning is better when: you need to change the model's behavior/style (not just add knowledge), when inference latency matters (no retrieval step), or when the domain is highly specialized with consistent patterns. In most enterprise AI projects, I start with RAG — it's faster to build, cheaper, and more maintainable. Fine-tuning is a later optimization for specific failure modes."

|                   | RAG                     | Fine-tuning            |
| ----------------- | ----------------------- | ---------------------- |
| Knowledge updates | Easy (re-index)         | Expensive (retrain)    |
| Cost              | Low                     | High                   |
| Latency           | Higher (retrieval step) | Lower                  |
| Hallucination     | Lower (grounded)        | Depends                |
| Best for          | Dynamic knowledge base  | Style/behavior changes |

---

### Security concerns in AI apps

**How to answer:**

> "Key threats: prompt injection — malicious user input that hijacks the system prompt (mitigate with input sanitization and output validation); data leakage — RAG system returning documents the user shouldn't access (mitigate with per-user metadata filtering in vector search); PII exposure — user data in prompts reaching the LLM provider (mitigate with PII detection/masking before sending); and model inversion — extracting training data through carefully crafted prompts. I also apply standard API security: auth, rate limiting, input length limits."

---

### Logging & Observability (OpenTelemetry)

**How to answer:**

> "For AI systems, observability is critical because failures are often silent — the LLM returns something, just not what you wanted. I instrument with OpenTelemetry: traces for every pipeline step (retrieval, re-ranking, LLM call, response parsing), metrics (latency, token count, cache hit rate, error rate), and structured logs with request ID for correlation. I export to Grafana + Jaeger for visualization. LangSmith adds LLM-specific tracing — I can see the exact prompt, response, and latency for every LLM call in production."

---

### End-to-End AI System Project (Be Ready to Explain)

**Structure your answer as:**

> "I built a RAG-based document assistant for [domain]. Users ask questions in natural language. Architecture: documents ingested via a FastAPI ingest endpoint → chunked with 512-token recursive splitter with 10% overlap → embedded with OpenAI ada-002 → stored in Pinecone with metadata. On query: user question embedded → top-10 chunks retrieved → re-ranked with Cohere Rerank → top-5 injected into GPT-4 prompt → streamed response via SSE. Deployed on Azure with Docker + Kubernetes. LangSmith for tracing, Prometheus for metrics. Results: 85% user satisfaction, ~2s TTFT, $0.008 per query average cost."

---

*Tip: In every answer, connect back to real production concerns — cost, latency, reliability, and observability. That's what distinguishes a senior AI engineer from a prototype builder.*
