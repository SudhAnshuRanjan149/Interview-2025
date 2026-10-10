# AI Engineer Interview Preparation Roadmap
## October 2026 | Beginner → Intermediate → Advanced

**Target roles:** Generative AI Engineer · Agentic AI Engineer · Forward Deployed Engineer (FDE)

**Purpose:** A structured, end-to-end study plan that preserves the core topics from the original `index.md`, adds important missing topics, and organizes them from foundations to production-level engineering.

> **Notes Creation Rules**
> - **Simplicity:** Use simple, layman language that is easy to follow for both beginners and advanced students.
> - **Practicality:** Explain concepts clearly using concrete examples and code snippets.
> - **Interview-Ready:** Divide topics into an interview-ready Q&A format.
> - **Completeness:** Never miss any topic in any module as per this plan.
> - **Consistency:** Always keep new notes creation in sync with the roadmap structure.

> **Priority guide**
> - **P0 — Essential:** Know and practice for all relevant interviews.
> - **P1 — Important:** Strong differentiator; prioritize according to the job description.
> - **P2 — Specialization:** Advanced or role-dependent.
>
> The three roles overlap. Study the shared foundations first, then specialize. Do not try to memorize every framework; learn the underlying concepts and be able to implement, evaluate, debug, and explain trade-offs.

---

## 1. Role expectations

| Area | Generative AI Engineer | Agentic AI Engineer | Forward Deployed Engineer |
|---|---|---|---|
| Primary focus | Model-powered applications, RAG, fine-tuning, inference | Tool-using agents, orchestration, memory, reliable task execution | Enterprise problem-solving, integration, deployment, customer outcomes |
| Core skills | Transformers, embeddings, RAG, evaluation, serving | Tool calling, state graphs, planning, MCP, recovery and safety | Python, SQL, APIs, distributed systems, cloud, security, debugging |
| Typical interview emphasis | Retrieval quality, model adaptation, latency/cost trade-offs | Agent design, tool correctness, loop prevention, persistence, evaluation | System design, live debugging, ambiguous requirements, delivery trade-offs |
| Shared foundation | Python, APIs, databases, LLM fundamentals, testing, security, system design | Same | Same |

---

## 2. How to use this roadmap

For every module, use this learning cycle:

1. **Understand:** explain the concept in your own words.
2. **Implement:** build a small version without relying entirely on a framework.
3. **Test:** write unit, integration, and failure-case tests.
4. **Measure:** define quality, latency, cost, and reliability metrics where relevant.
5. **Explain:** describe trade-offs and defend your design in an interview.

### Suggested readiness standard

You are ready to move on when you can:
- [ ] Explain the core concepts without notes.
- [ ] Implement a small working example.
- [ ] Debug at least two realistic failure cases.
- [ ] Describe security, scalability, and cost implications where relevant.
- [ ] Answer follow-up questions and compare alternative designs.

---

# PART I — BEGINNER: FOUNDATIONS

**Goal:** Write reliable Python applications and understand the fundamentals behind machine learning, transformers, LLMs, APIs, and data systems.

## Module 1. Python and software engineering — P0

### Core Python
- [ ] Data types, strings, lists, tuples, sets, dictionaries.
- [ ] Functions, scope, modules, packages and imports.
- [ ] Classes, inheritance, composition, polymorphism and dunder methods.
- [ ] Iterators, generators, comprehensions, decorators and context managers.
- [ ] Exceptions, custom exception classes and resource cleanup.
- [ ] Type hints, generics, protocols, dataclasses and Pydantic models.

### Async and performance
- [ ] `asyncio`, `async`/`await`, tasks, cancellation and timeouts.
- [ ] Concurrency versus parallelism; threads, processes and multiprocessing.
- [ ] Semaphores, locks, race conditions and shared state.
- [ ] Profiling, memory use, CPU-bound versus I/O-bound workloads.

### Software engineering practices
- [ ] SOLID principles, composition, dependency injection and separation of concerns.
- [ ] Clean architecture, common design patterns and maintainable module boundaries.
- [ ] Git, branching, pull requests, code review and conflict resolution.
- [ ] Logging, exception handling, configuration and environment variables.
- [ ] Unit tests, integration tests, mocks, fixtures and test coverage.
- [ ] Contract tests, regression tests, linting and formatting.
- [ ] Live coding implementations from scratch: BPE Tokenizer, Cosine Similarity Top-K Min-Heap, thread-safe Token/Leaky Bucket Rate Limiter, Context Buffer with System Prompt preservation.

**Practice:** Implement an asynchronous API client with typed inputs, timeouts, bounded concurrency, retries with exponential backoff and jitter, and unit tests.

## Module 2. Mathematics, machine learning and deep learning — P0

### Mathematics
- [ ] Linear algebra: vectors, matrices, dot products, matrix multiplication, norms, cosine similarity, eigenvalues and eigenvectors.
- [ ] Probability: conditional probability, Bayes' theorem, common distributions, expectation and variance.
- [ ] Statistics: sampling, distributions, confidence intervals, hypothesis testing and statistical significance.
- [ ] Calculus: derivatives, partial derivatives, chain rule and gradients.
- [ ] Optimization: gradient descent, SGD, Adam, AdamW, learning-rate schedules and weight decay.

### Machine learning
- [ ] Supervised, unsupervised and self-supervised learning.
- [ ] Classification, regression, clustering and representation learning.
- [ ] Train/validation/test splits, cross-validation and data leakage.
- [ ] Overfitting, underfitting, regularization and class imbalance.
- [ ] Metrics: precision, recall, F1, ROC-AUC, confusion matrix and calibration basics.
- [ ] Bias/variance trade-off and baseline selection.

### Deep learning and PyTorch
- [ ] Neurons, layers, activation functions (ReLU, GELU, SiLU/Swish).
- [ ] Forward propagation, backpropagation, loss functions and optimizers.
- [ ] Initialization, normalization, dropout, gradient clipping.
- [ ] Tensors, broadcasting, autograd, `nn.Module`, datasets and dataloaders.
- [ ] Training loops, checkpoints, reproducibility and experiment tracking.
- [ ] Diagnosing exploding/vanishing gradients and unstable loss curves.

### Advanced extensions
- [ ] Mixed precision, gradient accumulation and gradient checkpointing.
- [ ] Distributed training concepts and GPU memory profiling.
- [ ] Parameter, gradient, optimizer-state and activation memory.

**Practice:** Train a small classifier, inspect its learning curves, and explain overfitting and optimization choices.

## Module 3. NLP, tokenization, embeddings and transformers — P0

### History of AI Before Transformers & Tokenization
- [ ] History of AI before Transformers: Recurrent Neural Networks (RNNs), LSTMs, GRUs, and Seq2Seq architectures.
- [ ] The Sequential Processing Bottleneck: Vanishing/exploding gradients and why RNNs could not parallelize computation over long sequences.
- [ ] Bahdanau & Luong Attention Mechanisms: How attention solved the fixed-length vector bottleneck in Seq2Seq models.
- [ ] The Transformer Breakthrough: How parallel self-attention eliminated the sequential bottleneck.
- [ ] Text normalization, vocabulary, tokens, special tokens and sequence lengths.
- [ ] BPE, WordPiece and SentencePiece.
- [ ] Padding, truncation, attention masks and token ID conversion.
- [ ] Word2Vec, static embeddings versus contextual embeddings, and semantic similarity (Cosine, Dot Product, L2).

### Transformer architecture
- [ ] Query, Key and Value projections.
- [ ] Scaled dot-product attention and multi-head self-attention.
- [ ] Causal masks, padding masks and attention shapes.
- [ ] Residual connections, LayerNorm, RMSNorm and feed-forward blocks.
- [ ] Positional information: sinusoidal, learned, RoPE and ALiBi.
- [ ] Encoder-only, decoder-only and encoder-decoder models.
- [ ] BERT, GPT-style models and T5 as architecture examples.
- [ ] MHA, MQA and GQA: quality, memory and throughput trade-offs.
- [ ] Attention complexity and limitations of long-context processing.

### Practice and advanced topics
- [ ] Implement scaled dot-product attention in PyTorch.
- [ ] Implement a small transformer block and explain tensor dimensions.
- [ ] Understand FlashAttention conceptually and why memory-efficient attention matters.
- [ ] Learn mixture-of-experts (MoE) concepts, routing and sparse activation at a high level.
- [ ] State Space Models (SSMs) & Selective State Spaces: Mamba, Mamba-2, and Hybrid Transformer-SSM models (Jamba).

## Module 4. LLM foundations, prompting and APIs — P0

### LLM concepts
- [ ] Next-token prediction, pretraining, instruction tuning and inference.
- [ ] Context windows, token budgets, truncation and context limits.
- [ ] Hallucination, uncertainty, refusal behavior and model limitations.
- [ ] Model families and how to compare models by task rather than name alone.

### Decoding and prompting
- [ ] Greedy decoding, beam search, temperature, top-k, top-p and repetition penalties.
- [ ] System, developer and user instructions; zero-shot and few-shot prompting.
- [ ] Prompt templates, examples, delimiters, task decomposition and context engineering.
- [ ] Structured output, JSON Schema, Pydantic validation and constrained decoding.
- [ ] Grammar-constrained decoding & sampling engines (Outlines, Guidance, vLLM JSON-schema grammar constraints).
- [ ] Tool/function calling: model proposes a call; application validates and executes it.
- [ ] Prompt injection basics and the distinction between instructions and untrusted content.

### API integration
- [ ] API keys and secrets, request/response schemas and usage accounting.
- [ ] Streaming responses and tool-call response handling.
- [ ] Rate limits, status codes, retries, timeouts and provider errors.
- [ ] Model fallback, model routing and provider abstraction.
- [ ] Token usage and cost measurement.

**Practice:** Build a command-line LLM client that supports structured output, streaming, retries, token/cost logging and a mock-provider test mode.

## Module 5. Databases, networking, Linux and infrastructure — P0

### SQL and data stores
- [ ] SQL: joins, aggregation, subqueries, CTEs, window functions and indexes.
- [ ] Transactions, ACID, isolation levels, deadlocks and query plans.
- [ ] PostgreSQL schemas, migrations, JSONB and connection pooling.
- [ ] Redis: TTL, caching, eviction, atomic operations and cache invalidation.
- [ ] NoSQL/document database concepts and choosing the right storage model.
- [ ] Object storage for raw documents and derived artifacts.
- [ ] Vector database fundamentals and pgvector basics.

### Networking and Linux
- [ ] HTTP methods, status codes, headers, TLS, DNS and TCP basics.
- [ ] REST versus gRPC; WebSockets versus Server-Sent Events.
- [ ] Reverse proxies, load balancers, connection pooling and service discovery.
- [ ] Linux processes, signals, permissions, environment variables, shell commands and log inspection.

### Containers and cloud
- [ ] Docker images, layers, containers, volumes, networking and multi-stage builds.
- [ ] Non-root execution, image scanning and secret handling.
- [ ] CI/CD with GitHub Actions or equivalent.
- [ ] Cloud concepts: compute, object storage, managed databases, IAM, VPCs and secrets managers.
- [ ] Kubernetes basics: Pods, Deployments, Services, ConfigMaps, Secrets, probes, requests/limits and autoscaling concepts.

**Practice:** Containerize a FastAPI application with PostgreSQL, tests, health checks and a simple CI pipeline.

---

# PART II — INTERMEDIATE: BUILD GENAI SYSTEMS

**Goal:** Build, measure and debug complete LLM applications rather than isolated demos.

## Module 6. Document processing and data pipelines — P0

### Ingestion
- [ ] PDFs, scanned documents, DOCX, PPTX, HTML, Markdown, CSV and code.
- [ ] Parsing, OCR, layout-aware extraction, tables, headers, footers and page references.
- [ ] Image/document understanding and extraction validation.
- [ ] Normalization, deduplication, metadata extraction and source tracking.

### Data lifecycle
- [ ] Batch versus streaming ingestion.
- [ ] ETL/ELT, incremental ingestion, scheduling and backfills.
- [ ] Document versioning, re-indexing and deletion propagation.
- [ ] Schema evolution, data contracts, data lineage and quality checks.
- [ ] Idempotent ingestion jobs and duplicate prevention.
- [ ] CDC (change data capture) concepts and event-driven ingestion.
- [ ] Airflow and Spark/Ray fundamentals where relevant.

### Enterprise considerations
- [ ] Tenant and document-level access control.
- [ ] Data classification, retention, residency and deletion requirements.
- [ ] Handling corrupted, incomplete, stale and conflicting source data.

**Practice:** Create a repeatable document ingestion pipeline with version tracking, incremental updates and deletion support.

## Module 7. RAG and information retrieval — P0

### Chunking
- [ ] Fixed-size, overlap-based, sentence/paragraph and semantic chunking.
- [ ] Markdown/code-aware chunking.
- [ ] Parent-child, hierarchical and document-aware chunking.
- [ ] Tables, long documents, metadata and chunk-size experiments.

### Embeddings and vector search
- [ ] Dense versus sparse retrieval.
- [ ] Cosine similarity, dot product and Euclidean distance.
- [ ] Exact nearest-neighbor search and approximate nearest-neighbor search.
- [ ] HNSW, IVF and product quantization (PQ/IVF-PQ).
- [ ] Vector database choices: pgvector, Qdrant, Pinecone, Milvus and Weaviate.
- [ ] Metadata filtering, namespaces, index lifecycle and multitenancy.

### Retrieval strategies & Token Optimization
- [ ] BM25 (sparse), dense retrieval and hybrid search.
- [ ] Reciprocal Rank Fusion (RRF).
- [ ] Dynamic Top-K Retrieval (score thresholding, knee-of-the-curve filtering, adaptive top-k).
- [ ] Context & Token Optimization (token pruning, prompt compression, prompt caching).
- [ ] Query rewriting, expansion, decomposition and multi-query retrieval.
- [ ] HyDE and query routing.
- [ ] Cross-encoder reranking (Cohere, BGE-Reranker).
- [ ] Parent-document retrieval, context compression and long-context trade-offs.
- [ ] Self-RAG (adaptive retrieval & reflection tokens: IS-REL, IS-SUP, IS-USE).
- [ ] Corrective RAG (CRAG) with web search fallback when retrieval confidence is low.
- [ ] RAPTOR (Recursive Abstractive Processing for Tree-Organized Retrieval).
- [ ] Anthropic Contextual Retrieval (prepending chunk-level context before embedding).
- [ ] Late Interaction Retrieval (ColBERT v2 & PLAID index with MaxSim operator).
- [ ] Vision-Language RAG (ColPali): Embedding raw PDF page images directly without OCR text parsing.
- [ ] GraphRAG and knowledge-graph retrieval.
- [ ] Caching and freshness considerations.

### Generation and grounding
- [ ] Context selection, ordering and token budgeting.
- [ ] Citation generation, source attribution and citation validation.
- [ ] Abstention when evidence is missing or contradictory.
- [ ] Handling stale, conflicting, irrelevant or adversarial documents.

### RAG debugging and security
- [ ] Separate ingestion, retrieval, reranking, context assembly and generation errors.
- [ ] Measure retrieval misses versus generation mistakes.
- [ ] ACL-aware retrieval and filtering before information reaches the model.
- [ ] Detect stale indexes and ensure deletions propagate.
- [ ] Test poisoned documents and indirect prompt injection.

**Practice:** Build a hybrid-search RAG system with reranking, source citations, access controls and a repeatable benchmark.

## Module 8. LLM and RAG evaluation — P0

### Dataset and methodology
- [ ] Golden datasets, representative samples, edge cases and adversarial cases.
- [ ] Train/test contamination and benchmark leakage.
- [ ] Human-written labels, synthetic data and review of generated test cases.
- [ ] Evaluation rubrics, acceptance thresholds and release gates.

### Retrieval metrics
- [ ] Recall@K, Precision@K, Hit Rate, MRR and nDCG.
- [ ] Evaluation by query type, document type and difficulty.

### Generation metrics
- [ ] Correctness, completeness, relevance, faithfulness/groundedness and citation accuracy.
- [ ] Context precision and context recall.
- [ ] Deterministic checks versus model-based judges.

### Judge quality and experimentation
- [ ] LLM-as-judge rubric design, calibration and human agreement.
- [ ] Position bias, prompt sensitivity and judge false positives.
- [ ] Regression testing, offline experiments, online A/B testing and shadow evaluations.
- [ ] Confidence intervals and statistical significance.
- [ ] Error analysis and tracking quality changes between versions.

### Tools
- [ ] Ragas, DeepEval, TruLens, Arize Phoenix and custom evaluation harnesses.

**Practice:** Build an evaluation script that reports retrieval and answer metrics, groups errors by cause and fails CI when quality regresses.

## Module 9. Fine-tuning and alignment — P1

### Data and training
- [ ] Instruction dataset design, cleaning, deduplication and synthetic data curation (Evol-Instruct, UltraFeedback).
- [ ] Model Distillation: distilling reasoning capabilities from R1/o1 models into smaller models (3B/8B).
- [ ] Supervised fine-tuning (SFT), loss masking, sequence packing and training objectives.
- [ ] Train/validation splits and contamination checks.
- [ ] Batch size, learning rate, warmup, epochs and gradient accumulation.

### Parameter-efficient fine-tuning
- [ ] LoRA, QLoRA, adapters, prefix tuning and prompt tuning.
- [ ] Advanced LoRA variants: DoRA (Weight-Decomposed LoRA), rsLoRA (Rank-Stabilized LoRA), and LoRA+.
- [ ] Adapter merging algorithms (TIES, DARE, SVD merging) for combining specialized adapters without retraining.
- [ ] Quantization interactions and adapter merging.
- [ ] GPU memory requirements and training cost.

### Preference optimization
- [ ] RLHF and PPO concepts.
- [ ] DPO, KTO and ORPO at conceptual and practical overview level.
- [ ] Reward models and preference data quality.

### Tooling and model selection
- [ ] Hugging Face Transformers, Datasets, PEFT, TRL, Unsloth and experiment tracking.
- [ ] When prompting, RAG, fine-tuning or a hybrid approach is appropriate.
- [ ] Compare base and adapted models on the same held-out evaluation set.

**Practice:** Fine-tune a small model or reproduce a LoRA experiment; report quality, memory, runtime and cost.

## Module 10. Inference, quantization and serving — P1

### Model formats and quantization
- [ ] FP32, FP16, BF16, INT8 and INT4.
- [ ] Post-training quantization and quantization-aware training concepts.
- [ ] AWQ, GPTQ, GGUF and EXL2 formats/ecosystems.
- [ ] Quality, memory, throughput and hardware compatibility trade-offs.

### Serving and inference internals
- [ ] vLLM, Hugging Face TGI, TensorRT-LLM and local runtimes.
- [ ] Prefill versus decode phase dynamics & Prefill-Decode Disaggregation architecture (vLLM / Mooncake RDMA KV-transfer).
- [ ] KV cache size, memory fragmentation, PagedAttention, and Quantized KV Cache (FP8 & INT4 KV Cache storage).
- [ ] Continuous batching, dynamic batching and request scheduling.
- [ ] FlashAttention and speculative decoding.
- [ ] Semantic Caching (GPTCache, Redis Vector Caching) to bypass LLM calls.
- [ ] Prompt Caching optimization (prefix matching, Anthropic/OpenAI prompt cache hits for TTFT reduction).
- [ ] Tensor, pipeline and data parallelism fundamentals.

### Performance and capacity planning
- [ ] Time to First Token (TTFT), inter-token latency and end-to-end latency.
- [ ] Tokens per second, throughput, p50/p95/p99 latency and queue time.
- [ ] GPU memory, bandwidth, utilization and model-fit calculations.
- [ ] Concurrency limits, load shedding, autoscaling and saturation.
- [ ] Cost per request and cost per successful task.
- [ ] Benchmark design and reproducible performance tests.

**Practice:** Benchmark two serving or quantization configurations and explain the quality/latency/cost trade-offs.

## Module 11. Backend services and production APIs — P0

- [ ] FastAPI, REST, gRPC, WebSockets and SSE.
- [ ] Streaming token and tool progress to clients.
- [ ] Async I/O, worker pools, background jobs and task queues.
- [ ] Message queues and Kafka/RabbitMQ concepts.
- [ ] Timeouts, retries, jitter, retry budgets and circuit breakers.
- [ ] Idempotency keys, deduplication and safe retry semantics.
- [ ] Rate limiting, quotas, backpressure and load shedding.
- [ ] Database transactions, isolation, connection pooling and consistency.
- [ ] API versioning, schema validation and error contracts.
- [ ] Caching, invalidation and cache stampede prevention.
- [ ] Health checks, graceful shutdown and cancellation.
- [ ] Authentication, authorization, audit logs and tenant-aware request context.

**Practice:** Create a rate-limited, streaming LLM service with safe retries, request IDs, tracing and integration tests.

---

# PART III — ADVANCED: AGENTS AND PRODUCTION SYSTEMS

**Goal:** Design systems that can execute multi-step tasks safely, recover from failures, and meet enterprise requirements.

## Module 12. Single-agent design and tool execution — P0

- [ ] Agent versus deterministic workflow: choosing the simplest reliable design.
- [ ] ReAct (reason and act), plan-and-execute, routing and iterative refinement.
- [ ] Tool/function schemas, typed arguments and validation.
- [ ] Tool discovery, selection, execution and result interpretation.
- [ ] State: messages, task state, tool outputs and intermediate artifacts.
- [ ] Tool authorization, allowlists, scoped credentials and least privilege.
- [ ] Timeouts, retries, malformed results and unavailable tools.
- [ ] Bounded loops, maximum steps, token/cost budgets and deadlines.
- [ ] Agent sandboxing & execution enclaves (E2B Code Interpreter, Modal, Daytona, Docker containers, network egress rules).
- [ ] Idempotent tool calls and handling duplicate execution.
- [ ] Output validation and completion verification.
- [ ] Human approval for external or consequential actions.

**Practice:** Implement a small agent loop in plain Python with two tools, schema validation, bounded steps and unit tests.

## Module 13. Agent orchestration and durable execution — P0

### State and workflow graphs
- [ ] Nodes, edges, conditional transitions, reducers and typed state.
- [ ] LangGraph, AutoGen, CrewAI and custom state machines.
- [ ] Sequential, router, parallel, supervisor and hierarchical patterns.
- [ ] Fan-out/fan-in, shared state and concurrency hazards.

### Persistence and recovery
- [ ] Checkpointing, state stores and resumable execution.
- [ ] Recovery after process restart or tool failure.
- [ ] Pause/resume and human approval.
- [ ] Duplicate event delivery and idempotent task handling.
- [ ] Cancellation, deadlines and graceful termination.
- [ ] Compensating actions for partially completed workflows.
- [ ] Replay, audit history and state migration/versioning.

### Reliability
- [ ] Loop and cycle detection.
- [ ] Retry policies and error classification.
- [ ] Partial success and recovery paths.
- [ ] Budgets for time, tokens, tool calls and money.
- [ ] When not to use an agent or multi-agent architecture.

**Practice:** Build a durable workflow that can pause for approval and resume from a checkpoint after a simulated failure.

## Module 14. Planning, memory and multi-agent systems — P1

### Planning and reasoning patterns
- [ ] Task decomposition, dependency graphs and plan validation.
- [ ] Extended Reasoning & Test-Time Compute Scaling (DeepSeek-R1, OpenAI o1/o3, System 1 vs System 2 thinking).
- [ ] Process Reward Models (PRMs) & Monte Carlo Tree Search (MCTS) for agent planning.
- [ ] ReAct, reflection, critique-and-revise and verification.
- [ ] Tree of Thoughts, Graph of Thoughts and search-based planning concepts.
- [ ] Independent verification, executable tests and evidence-based completion.
- [ ] Cost and reliability trade-offs of iterative reasoning.

### Memory
- [ ] Working/context memory, episodic memory and semantic memory.
- [ ] Vector-backed memory and entity/knowledge graphs.
- [ ] Memory extraction, consolidation, retrieval and update.
- [ ] Expiration, deletion, user control and memory poisoning risks.
- [ ] Summarization, context compression and token-budget management.

### Multi-agent systems
- [ ] Supervisor, leader-follower, peer collaboration and consensus.
- [ ] Task delegation, typed handoffs and ownership.
- [ ] Shared versus isolated context.
- [ ] Disagreement resolution and independent verification.
- [ ] Duplicate work, communication overhead and infinite message loops.
- [ ] When multiple agents outperform a single agent—and when they do not.

**Practice:** Compare a single-agent implementation with a multi-agent version on the same task and report completion rate, latency and cost.

## Module 15. Model Context Protocol (MCP) and interoperability — P1

- [ ] MCP architecture, hosts, clients and servers.
- [ ] The Pre-MCP Era: What developers used before MCP (Custom OpenAPI specs, hardcoded tool adapters, per-framework wrappers) and why MCP standardized tool/resource access.
- [ ] FastMCP Python SDK (`@mcp.tool()`, `@mcp.resource()`, `@mcp.prompt()`).
- [ ] Transport protocols (stdio vs SSE), sessions and initialization lifecycle.
- [ ] Building a custom FastMCP server and connecting clients (Cursor, Claude Desktop, custom agents).
- [ ] Agent-to-Agent (A2A) Protocol vs Model Context Protocol (MCP) for client-server tool integration.
- [ ] Remote/local deployment and version compatibility.
- [ ] Authentication, authorization, secrets and scoped permissions.
- [ ] Untrusted tool output, prompt injection and data exfiltration risks.
- [ ] Timeouts, failures, logging, auditing and compatibility tests.
- [ ] MCP versus ordinary function calling, REST and custom adapters.

**Practice:** Build an MCP server for a safe internal operation, connect an agent, validate arguments and enforce authorization.

> MCP evolves. Check the current official specification and SDK documentation when preparing for a particular interview.

## Module 16. Agent evaluation, observability and operations — P0

### Evaluation
- [ ] Task completion rate and success criteria.
- [ ] Tool-selection accuracy and argument correctness.
- [ ] Trajectory/step-level evaluation and recovery success.
- [ ] Unauthorized-action rate and policy compliance.
- [ ] Scenario simulation, synthetic tasks and adversarial tests.
- [ ] Human review and reproducible agent benchmarks.
- [ ] Benchmarks such as SWE-bench, GAIA, WebArena and HumanEval where appropriate to the task.

### Observability
- [ ] OpenTelemetry traces, spans, trace IDs and correlated logs.
- [ ] Tool calls, model calls, state transitions and agent handoffs.
- [ ] Token usage, cost, latency, retries and error rates.
- [ ] Quality monitoring, drift and regression detection.
- [ ] Privacy-safe logs, redaction and retention.

### Reliability engineering
- [ ] SLIs, SLOs, SLAs and error budgets.
- [ ] Timeouts, fallbacks, graceful degradation and dependency isolation.
- [ ] Shadow evaluations, canary releases and rollback.
- [ ] Incident triage, reproduction, mitigation and root-cause analysis.
- [ ] Alerting on quality, cost, latency and security anomalies.

### Useful tooling
- [ ] OpenTelemetry, LangSmith, Langfuse, Arize Phoenix, Prometheus and Grafana.

**Practice:** Add traces and evaluation to an agent, inject tool failures, and show how you identify and fix a failed run.

## Module 17. AI security, privacy and governance — P0

### Threat modeling
- [ ] Assets, trust boundaries, attacker goals and threat modeling.
- [ ] Direct and indirect prompt injection.
- [ ] Guardrails Frameworks (NeMo Guardrails, Guardrails AI, Llama Guard 3, OpenInference conventions).
- [ ] Jailbreaks, untrusted retrieved documents and tool-result injection.
- [ ] RAG poisoning and vector/embedding security.
- [ ] Sensitive information disclosure and data exfiltration.
- [ ] Excessive agency and confused-deputy problems.

### Application and tool security
- [ ] OAuth 2.0, OIDC, API keys and service identities.
- [ ] RBAC, ABAC, least privilege and tenant isolation.
- [ ] Tool allowlists, scoped credentials and approval gates.
- [ ] Input validation, output escaping, SQL injection and SSRF prevention.
- [ ] Sandboxed code execution, resource limits and network isolation.
- [ ] Secrets managers, dependency scanning and artifact/model provenance.

### Data and compliance
- [ ] PII identification, redaction and data minimization.
- [ ] Encryption in transit/at rest and key management concepts.
- [ ] Retention, deletion, residency, consent and audit trails.
- [ ] SOC 2, GDPR, HIPAA and other requirements when applicable to the deployment.
- [ ] Vendor data handling and zero-data-retention terms where relevant.
- [ ] Abuse controls, quotas, rate limits and runaway cost protection.

**Practice:** Threat-model a RAG agent that can query a database and create tickets; demonstrate that a malicious document cannot override permissions.

---

# PART IV — ADVANCED: SYSTEM DESIGN AND FORWARD DEPLOYED ENGINEERING

## Module 18. AI system design — P0

Practice taking an ambiguous prompt from requirements through a production architecture.

### System design fundamentals
- [ ] Functional and non-functional requirements.
- [ ] Workload estimates, peak traffic and concurrency.
- [ ] API boundaries, service decomposition and data flow.
- [ ] Data stores, indexes, queues and caches.
- [ ] Consistency, availability, durability and failure domains.
- [ ] Backpressure, retries, idempotency and disaster recovery.
- [ ] Observability, security and operational ownership.
- [ ] Cost estimation and quality/latency trade-offs.

### AI-specific architectures
- [ ] RAG over millions of documents.
- [ ] Enterprise assistant with tools and human escalation.
- [ ] Coding agent with repository indexing, patching and sandboxed tests.
- [ ] Document intelligence and multimodal extraction.
- [ ] High-throughput model inference service.
- [ ] Multitenant AI platform with usage quotas.
- [ ] On-premises/private-cloud inference.
- [ ] Real-time streaming agent and background task workflows.

### Trade-offs to defend
- [ ] Managed model API versus self-hosting.
- [ ] RAG versus fine-tuning versus prompting.
- [ ] SQL, object storage, vector DB and knowledge graph.
- [ ] Deterministic workflow versus autonomous agent.
- [ ] Single-agent versus multi-agent.
- [ ] Synchronous versus asynchronous execution.
- [ ] Quality versus latency, cost and privacy.

### Capacity planning exercises
- [ ] Estimate requests per second and concurrent sessions.
- [ ] Estimate input/output tokens and total token throughput.
- [ ] Estimate model-weight and KV-cache memory.
- [ ] Estimate storage and index growth.
- [ ] Identify latency bottlenecks and saturation points.
- [ ] Calculate approximate cost per request and per successful task.
- [ ] Define SLOs, load-test scenarios and fallback strategies.

**Practice:** Design a RAG service for a large enterprise corpus and an agentic support system. State assumptions and calculate rough capacity instead of relying on unsupported numbers.

## Module 19. Forward Deployed Engineer (FDE) — P0

### Customer and product discovery
- [ ] Stakeholder interviews, workflow mapping and user personas.
- [ ] Translate vague needs into technical requirements.
- [ ] Define success metrics, acceptance criteria and constraints.
- [ ] Identify data access, compliance and deployment restrictions.
- [ ] Determine when AI is unsuitable or a simpler solution is better.
- [ ] Manage scope changes and prioritize trade-offs.

### Enterprise integration
- [ ] Legacy APIs, databases, CRM/ticketing systems and internal services.
- [ ] REST, gRPC, webhooks, event-driven integration and batch pipelines.
- [ ] SSO, OAuth/OIDC, service accounts, RBAC, ABAC, and Relationship-Based Access Control (ReBAC / OpenFGA / Zanzibar model).
- [ ] Pre-retrieval row-level security (RLS) and document tuple permission graphs for enterprise RAG.
- [ ] Data contracts, schema changes, error handling and integration testing.
- [ ] Tenant isolation, private networking and data residency.
- [ ] On-premises, private cloud and restricted/air-gapped environments.

### Delivery and operations
- [ ] Proof-of-concept milestones and measurable exit criteria.
- [ ] Deployment plans, rollbacks and migration strategies.
- [ ] SLA/SLO ownership, incident response and runbooks.
- [ ] Observability, cost allocation and operational handover.
- [ ] Documentation, training and support ownership.
- [ ] Communicate limitations, risks and uncertainty to non-technical stakeholders.

### FDE interview practice
- [ ] Debug an API integration using logs and error responses.
- [ ] Write SQL to investigate a customer issue.
- [ ] Adapt an architecture when a requirement changes mid-implementation.
- [ ] Explain how you would securely access customer data.
- [ ] Present a trade-off to a skeptical stakeholder.
- [ ] Estimate the business impact and operating cost of an AI workflow.

**Practice:** Build and deploy an AI service connected to a database and an external API, then document the architecture, failure modes, security model and operating procedures.

## Module 20. Multimodal AI and specialist topics — P2

Prioritize these based on target job descriptions.

- [ ] Vision-language models, image embeddings and visual question answering.
- [ ] OCR, document layout analysis, table extraction and image-based reasoning.
- [ ] Audio transcription, speech synthesis and real-time voice interactions.
- [ ] Multimodal retrieval and cross-modal embeddings.
- [ ] Small language models and edge inference.
- [ ] Mixture-of-experts architectures and sparse computation.
- [ ] Advanced fine-tuning, preference optimization and distributed training.
- [ ] Knowledge graphs, entity resolution and advanced GraphRAG.
- [ ] Advanced GPU serving, distributed inference and hardware-specific optimization.
- [ ] Specialized evaluation benchmarks for coding, web interaction and multimodal tasks.

---

# PART V — CODING AND INTERVIEW PRACTICE

## 3. Coding exercises checklist

Complete these without blindly copying a framework tutorial.

### Python and backend
- [ ] Implement an async LLM caller with timeout, bounded concurrency, exponential backoff and jitter.
- [ ] Write a rate limiter and explain its concurrency behavior.
- [ ] Implement idempotency for a retryable API operation.
- [ ] Write unit and integration tests with mocked model and tool responses.
- [ ] Debug a failing API from structured logs and traces.

### ML and LLMs
- [ ] Implement scaled dot-product attention in PyTorch.
- [ ] Explain a transformer block and tensor shapes.
- [ ] Calculate approximate model-weight and KV-cache memory.
- [ ] Compare two models or prompts using a fixed evaluation dataset.
- [ ] Run a small LoRA fine-tuning experiment or explain its training pipeline.

### RAG
- [ ] Implement document chunking with metadata and source references.
- [ ] Build BM25 plus vector retrieval and combine results with RRF.
- [ ] Add a reranker and compare Recall@K/MRR or nDCG before and after.
- [ ] Generate citations and test whether they support the answer.
- [ ] Enforce document-level access filters and test cross-tenant isolation.
- [ ] Create an evaluation harness that detects regressions.

### Agents
- [ ] Implement a custom ReAct/tool-calling loop.
- [ ] Validate tool arguments and enforce an allowlist.
- [ ] Add maximum steps, deadlines, token budgets and a stop condition.
- [ ] Implement checkpoint/resume or a durable workflow.
- [ ] Add human approval for a consequential tool.
- [ ] Test prompt injection through a retrieved document or tool output.
- [ ] Compare single-agent and multi-agent solutions on the same benchmark.

### Infrastructure and FDE
- [ ] Build a Dockerized FastAPI service with health checks.
- [ ] Write SQL queries to debug a data issue.
- [ ] Add tracing, structured logging and metrics.
- [ ] Test retry behavior, duplicate events and dependency failures.
- [ ] Estimate throughput, p95/p99 latency and cost for a workload.
- [ ] Write a short architecture document and an incident runbook.

## 4. System design prompts

Practice drawing the architecture, clarifying requirements, estimating load and discussing failure cases.

1. Design an enterprise RAG system over millions of documents with access control and citations.
2. Design a support agent that can read customer records and create or update tickets safely.
3. Design a coding agent that edits repositories and executes tests in a sandbox.
4. Design a multitenant LLM API with streaming, rate limits, retries and model fallbacks.
5. Design a private/on-premises LLM deployment with monitoring and controlled model updates.
6. Design an ingestion pipeline that processes document updates and propagates deletions.
7. Design an evaluation platform that blocks model/application releases when quality regresses.
8. Design a customer-facing AI service with defined SLOs, auditability and cost controls.

For each prompt, cover requirements, API contracts, architecture, data model, scaling, security, observability, evaluation, failure recovery and cost.

## 5. Behavioral and scenario preparation

- [ ] Explain a time you debugged an ambiguous technical failure.
- [ ] Explain how you would handle changing customer requirements mid-deployment.
- [ ] Describe how you would respond to a quality regression after a model update.
- [ ] Explain how you would persuade stakeholders to adopt a safer but slower design.
- [ ] Describe a case where you would not use an LLM or agent.
- [ ] Explain how you would prioritize quality, latency, privacy and cost when they conflict.
- [ ] Prepare a clear walkthrough of each portfolio project's architecture, trade-offs and limitations.

---

# PART VI — 12-WEEK STUDY SCHEDULE

**Suggested start:** October 12, 2026. A full 12-week cycle continues into January 2027.

| Week | Main focus | Deliverable |
|---|---|---|
| 1 | Python, testing, async, Git and APIs | Tested asynchronous LLM client |
| 2 | ML, PyTorch, NLP and transformers | Attention implementation and model fundamentals |
| 3 | Document processing, chunking and embeddings | Ingestion and indexing pipeline |
| 4 | Hybrid retrieval, reranking and citations | Working RAG application |
| 5 | Evaluation, testing and error analysis | Evaluation dataset and benchmark report |
| 6 | SFT, LoRA/QLoRA and model adaptation | Small fine-tuning experiment or reproducible walkthrough |
| 7 | Quantization, serving, performance and Docker | Inference benchmark and deployed API |
| 8 | Tool calling, agent loops and state | Single-agent implementation |
| 9 | Orchestration, checkpoints, memory and recovery | Resumable agent workflow |
| 10 | MCP, authorization, sandboxing and guardrails | Secure tool integration |
| 11 | Enterprise system design, FDE, distributed systems | Deployed integrated AI service and architecture document |
| 12 | Coding, system design, debugging and behavioral mocks | Interview portfolio and readiness review |

### Weekly routine

A reasonable weekly split:
- [ ] 40% implementation and debugging.
- [ ] 20% concepts and technical reading.
- [ ] 20% evaluation and project documentation.
- [ ] 20% coding questions, system design and mock interviews.

Adjust this split to your strengths. If you already have production Python experience, allocate more time to RAG evaluation, agent reliability, model serving and system design.

---

# PART VII — RECOMMENDED LEARNING REFERENCES

Prefer official documentation for fast-changing frameworks and use textbooks or courses for stable foundations.

## Foundations and models
- [ ] PyTorch documentation: https://pytorch.org/docs/stable/
- [ ] Hugging Face Transformers: https://huggingface.co/docs/transformers/
- [ ] Hugging Face PEFT: https://huggingface.co/docs/peft/
- [ ] Hugging Face TRL: https://huggingface.co/docs/trl/

## Retrieval and orchestration
- [ ] LangGraph: https://docs.langchain.com/oss/python/langgraph/overview
- [ ] LlamaIndex: https://docs.llamaindex.ai/
- [ ] Model Context Protocol: https://modelcontextprotocol.io/
- [ ] vLLM: https://docs.vllm.ai/

## Evaluation, observability and security
- [ ] Ragas: https://docs.ragas.io/
- [ ] DeepEval: https://docs.confident-ai.com/
- [ ] OpenTelemetry: https://opentelemetry.io/docs/
- [ ] OWASP GenAI Security Project: https://genai.owasp.org/

## Backend and infrastructure
- [ ] FastAPI: https://fastapi.tiangolo.com/
- [ ] PostgreSQL: https://www.postgresql.org/docs/
- [ ] Docker: https://docs.docker.com/
- [ ] Kubernetes: https://kubernetes.io/docs/

Check current versions and supported APIs before using tutorials in an October 2026 interview preparation plan.

---

# FINAL PRIORITY SUMMARY

If time is short, do not attempt to master every advanced topic at once. Follow this order:

1. **P0 foundations:** Python, SQL, APIs, networking, ML basics, transformers and LLM APIs.
2. **P0 GenAI:** document processing, RAG, retrieval metrics, evaluation and structured outputs.
3. **P0 agentic:** tool calling, state machines, orchestration, bounded execution, checkpointing and recovery.
4. **P0 production:** tests, tracing, authorization, prompt-injection defenses and secure tool execution.
5. **P0 system design/FDE:** distributed systems, enterprise integration, cloud deployment, debugging and customer requirements.
6. **P1 specialization:** fine-tuning, inference optimization, advanced memory, MCP and multi-agent coordination.
7. **P2 specialization:** multimodal systems, advanced model architecture and hardware-specific optimization.

**Final rule:** For each important topic, aim to explain it, implement it, evaluate it, debug it and defend its trade-offs. That is a stronger interview strategy than simply completing a long list of tutorials.

---

# APPENDIX — FOLDER STRUCTURE

This roadmap corresponds to the following structured repository format for study notes and code exercises:

- [ ] **Module_01_Python_and_Software_Engineering/**
  - [ ] `notes.md`
  - [ ] `code.ipynb`
- [ ] **Module_02_Math_ML_and_Deep_Learning/**
  - [ ] `notes.md`
  - [ ] `code.ipynb`
- [ ] **Module_03_NLP_Tokenization_Embeddings_Transformers/**
  - [ ] `notes.md`
  - [ ] `code.ipynb`
- [ ] **Module_04_LLM_Foundations_Prompting_APIs/**
  - [ ] `notes.md`
  - [ ] `code.ipynb`
- [ ] **Module_05_Databases_Networking_Linux_Infrastructure/**
  - [ ] `notes.md`
  - [ ] `code.ipynb`
- [ ] **Module_06_Document_Processing_and_Data_Pipelines/**
  - [ ] `notes.md`
  - [ ] `code.ipynb`
- [ ] **Module_07_RAG_and_Information_Retrieval/**
  - [ ] `notes.md`
  - [ ] `code.ipynb`
- [ ] **Module_08_LLM_and_RAG_Evaluation/**
  - [ ] `notes.md`
  - [ ] `code.ipynb`
- [ ] **Module_09_Fine_Tuning_and_Alignment/**
  - [ ] `notes.md`
  - [ ] `code.ipynb`
- [ ] **Module_10_Inference_Quantization_Serving/**
  - [ ] `notes.md`
  - [ ] `code.ipynb`
- [ ] **Module_11_Backend_Services_and_Production_APIs/**
  - [ ] `notes.md`
  - [ ] `code.ipynb`
- [ ] **Module_12_Single_Agent_Design_and_Tool_Execution/**
  - [ ] `notes.md`
  - [ ] `code.ipynb`
- [ ] **Module_13_Agent_Orchestration_and_Durable_Execution/**
  - [ ] `notes.md`
  - [ ] `code.ipynb`
- [ ] **Module_14_Planning_Memory_and_Multi_Agent_Systems/**
  - [ ] `notes.md`
  - [ ] `code.ipynb`
- [ ] **Module_15_Model_Context_Protocol_and_Interoperability/**
  - [ ] `notes.md`
  - [ ] `code.ipynb`
- [ ] **Module_16_Agent_Evaluation_Observability_and_Operations/**
  - [ ] `notes.md`
  - [ ] `code.ipynb`
- [ ] **Module_17_AI_Security_Privacy_and_Governance/**
  - [ ] `notes.md`
  - [ ] `code.ipynb`
- [ ] **Module_18_AI_System_Design/**
  - [ ] `notes.md`
  - [ ] `code.ipynb`
- [ ] **Module_19_Forward_Deployed_Engineer/**
  - [ ] `notes.md`
  - [ ] `code.ipynb`
- [ ] **Module_20_Multimodal_AI_and_Specialist_Topics/**
  - [ ] `notes.md`
  - [ ] `code.ipynb`
