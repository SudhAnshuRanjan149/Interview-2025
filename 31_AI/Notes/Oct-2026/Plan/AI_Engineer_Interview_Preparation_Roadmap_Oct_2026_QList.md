## Prompt to genrate answers

Act as an expert AI Engineer mentor and technical interviewer. Answer every question listed below in detail, using simple, beginner-friendly, layman language. Assume I am completely new to the topics. Start with the necessary background or prerequisite concepts, then explain each topic step by step, using real-world analogies, practical examples, code snippets where relevant, and expected outputs. Explain not only **what** something is, but also **why it is needed, how it works internally, when to use it, and what problems it solves**. Include important variations, trade-offs, common mistakes, limitations, and follow-up interview questions with clear answers. For coding topics, provide working, well-commented code and explain it line by line. Connect related concepts, highlight practical production use cases, and include scenario-based interview questions. Structure the answer with clear headings, tables where useful, and concise summaries. Cover every question completely without skipping topics or assuming prior knowledge. Make the notes detailed enough for interview preparation while keeping every explanation easy to understand.








## Module 01 — Python and Software Engineering

1. What are Python’s built-in data types, and when would you use a list, tuple, set, or dictionary?
2. What is the difference between mutable and immutable objects, and how can mutability cause bugs?
3. What is the difference between `==` and `is`?
4. How do Python variables, references, shallow copies, deep copies, and object identity work?
5. What are functions, scope, closures, modules, packages, and import mechanisms in Python?
6. What are positional arguments, keyword arguments, default arguments, `*args`, and `**kwargs`, and why can mutable default arguments be dangerous?
7. What are classes, inheritance, composition, polymorphism, encapsulation, and abstraction, and when should composition be preferred over inheritance?
8. What are Python dunder methods, and how would you implement `__init__`, `__repr__`, `__eq__`, `__iter__`, and `__enter__`?
9. What are iterators, generators, generator expressions, comprehensions, decorators, and context managers, and when should each be used?
10. How do exceptions propagate in Python, how do you design custom exception classes, and how should resources be cleaned up after failures?
11. What are type hints, generics, `Protocol`, `TypedDict`, dataclasses, and Pydantic models, and how do they differ?
12. What is the difference between static type checking, runtime validation, and serialization?
13. What are SOLID principles, separation of concerns, dependency injection, clean architecture, and common design patterns, and how would you apply them to an LLM application?
14. What are the differences between synchronous execution, asynchronous execution, concurrency, and parallelism?
15. How do `asyncio`, `async`/`await`, tasks, task groups, cancellation, timeouts, semaphores, locks, and bounded queues work?
16. When should you use threads, processes, asynchronous I/O, or multiprocessing for CPU-bound and I/O-bound workloads?
17. What are race conditions, deadlocks, starvation, shared-state hazards, producer-consumer patterns, and backpressure, and how would you prevent them?
18. How would you build a thread-safe token-bucket or leaky-bucket rate limiter, and how would you test its behavior under concurrency?
19. How would you implement an asynchronous API client with typed inputs, connection pooling, bounded concurrency, timeouts, exponential backoff, jitter, retry budgets, and cancellation-safe cleanup?
20. How would you implement byte-pair encoding (BPE) from scratch, and how would you test tokenization, vocabulary construction, and token ID conversion?
21. How would you implement cosine similarity and a Top-K min-heap, and what are their time and space complexities?
22. How would you build a context buffer that preserves the system prompt, prioritizes recent or important messages, and stays within a token budget?
23. How do unit tests, integration tests, contract tests, regression tests, mocks, fixtures, and property-based tests differ?
24. How would you use Hypothesis, fuzz testing, mutation testing, and invariants to uncover defects in Python code?
25. How do test coverage, linting, formatting, static analysis, Git branching, pull requests, code reviews, and merge conflict resolution contribute to software quality?
26. How would you profile CPU time, memory allocation, memory leaks, connection usage, and algorithmic complexity in a Python service?
27. How do Big-O time complexity, space complexity, amortized analysis, and data-structure selection influence backend performance?
28. How would you debug an intermittent production failure using structured logs, request IDs, stack traces, and a minimal reproducible test?

## Module 02 — Mathematics, Machine Learning and Deep Learning

1. What are vectors, matrices, tensors, dot products, matrix multiplication, norms, and cosine similarity, and where are they used in machine learning?
2. How do eigenvalues and eigenvectors relate to linear transformations, dimensionality reduction, and principal component analysis?
3. How do conditional probability, Bayes’ theorem, independence, expectation, variance, and common probability distributions work?
4. What are sampling distributions, standard errors, confidence intervals, hypothesis tests, p-values, and statistical significance?
5. What are derivatives, partial derivatives, gradients, the chain rule, and Jacobians, and how are they used in neural-network training?
6. How do gradient descent, SGD, momentum, Adam, and AdamW differ, and when would you choose each optimizer?
7. What is the difference between learning rate, learning-rate scheduling, weight decay, and regularization?
8. What are supervised, unsupervised, self-supervised, and reinforcement learning, and how do their training objectives differ?
9. How do classification, regression, clustering, representation learning, and contrastive learning differ?
10. How should training, validation, and test datasets be constructed, and how does data leakage lead to misleading results?
11. What are overfitting, underfitting, the bias-variance trade-off, regularization, cross-validation, and baseline selection?
12. How do precision, recall, F1, confusion matrices, ROC-AUC, class imbalance, and threshold selection affect classification evaluation?
13. What are model calibration, reliability diagrams, expected calibration error, and selective prediction, and why can confidence scores be misleading?
14. What is entropy, cross-entropy, KL divergence, perplexity, and mutual information, and how are they used in language modeling?
15. How do neurons, layers, ReLU, GELU, SiLU/Swish, forward propagation, backpropagation, and loss functions work together?
16. How do weight initialization, LayerNorm, batch normalization, dropout, gradient clipping, and normalization affect training stability?
17. How do PyTorch tensors, broadcasting, autograd, `nn.Module`, datasets, dataloaders, optimizers, and training loops work?
18. How would you implement a reproducible PyTorch training pipeline with checkpoints, random seeds, experiment tracking, validation, and early stopping?
19. How would you diagnose exploding or vanishing gradients, unstable loss curves, poor convergence, and numerical instability?
20. What are mixed precision, FP16, BF16, gradient accumulation, gradient checkpointing, and their effects on training speed and memory?
21. How do model parameters, gradients, optimizer states, activations, and temporary tensors contribute to GPU memory consumption?
22. What are data parallelism, tensor parallelism, pipeline parallelism, and distributed training, and when are they appropriate?
23. How do contrastive losses, positive and negative pairs, hard-negative mining, and embedding-space geometry influence representation quality?
24. How would you distinguish label noise, dataset shift, distribution shift, and model failure when production performance degrades?
25. How would you train a small classifier, evaluate its learning curves, select a baseline, and explain its optimization and generalization trade-offs?

## Module 03 — NLP, Tokenization, Embeddings and Transformers

1. How did AI language processing evolve from statistical NLP and recurrent neural networks to modern transformer-based models?
2. How do RNNs, LSTMs, GRUs, and sequence-to-sequence architectures process text, and what limitations do they have?
3. Why do vanishing gradients, exploding gradients, and sequential computation make long-sequence RNN training difficult?
4. How did Bahdanau attention and Luong attention address the fixed-length-vector bottleneck in sequence-to-sequence models?
5. How does self-attention enable transformers to process tokens in parallel, and what did the Transformer architecture change compared with RNNs?
6. What are text normalization, vocabularies, tokens, special tokens, token IDs, token budgets, and sequence lengths?
7. How do BPE, WordPiece, and SentencePiece differ in subword construction and tokenization behavior?
8. How do padding, truncation, attention masks, special tokens, and token ID conversion work in a tokenizer pipeline?
9. How does BPE work internally, and how would you implement and test a small BPE tokenizer?
10. How do Word2Vec, static embeddings, contextual embeddings, and transformer-derived representations differ?
11. How do cosine similarity, dot product, and Euclidean distance differ, and how do vector normalization and embedding norms affect retrieval?
12. What are Query, Key, and Value projections, and how are their tensor dimensions calculated?
13. How does scaled dot-product attention work mathematically, and why is attention scaled by the square root of the key dimension?
14. How does multi-head self-attention work, and how are attention heads combined?
15. How do causal masks, padding masks, attention masks, and tensor broadcasting affect the attention computation?
16. How do residual connections, LayerNorm, RMSNorm, feed-forward blocks, and pre-normalization versus post-normalization affect transformer training?
17. How do sinusoidal positional embeddings, learned positional embeddings, RoPE, and ALiBi encode positional information?
18. How do encoder-only, decoder-only, and encoder-decoder architectures differ, and where are BERT, GPT-style models, and T5 appropriate?
19. How do multi-head attention (MHA), multi-query attention (MQA), and grouped-query attention (GQA) compare in memory consumption, quality, and throughput?
20. Why does standard self-attention have quadratic sequence-length complexity, and what are the practical limitations of long-context processing?
21. How would you implement scaled dot-product attention and a transformer block in PyTorch, including correct tensor shapes and masking?
22. What is FlashAttention, and how does memory-efficient attention improve practical performance without changing the intended attention computation?
23. What are mixture-of-experts (MoE) models, sparse activation, expert routing, load balancing, and expert-capacity constraints?
24. How do state-space models (SSMs), selective state-space models, Mamba, Mamba-2, and hybrid Transformer-SSM architectures such as Jamba differ from traditional transformers?
25. How do masked language modeling, causal language modeling, denoising objectives, and contrastive objectives influence model capabilities?
26. What is the difference between advertised context length and effective context length, and what are lost-in-the-middle and positional extrapolation problems?
27. How are embedding models trained with contrastive objectives, how are hard negatives selected, and how can embeddings be adapted to a specific domain?

## Module 04 — LLM Foundations, Prompting and APIs

1. How does next-token prediction work, and how do pretraining, instruction tuning, post-training, and inference differ?
2. How do context windows, token budgets, truncation, conversation history, and output reservations affect an LLM request?
3. What are hallucinations, uncertainty, refusal behavior, and common model limitations, and how can applications mitigate their impact?
4. How would you compare two language models for a task using quality, reasoning capability, latency, cost, privacy, context capacity, and reliability?
5. How do greedy decoding, beam search, temperature, top-k, top-p, repetition penalties, and random seeds affect generated output?
6. What are system, developer, and user instructions, and how do zero-shot, few-shot, instruction, and example-based prompting differ?
7. What is the difference between prompt engineering and context engineering, and how do delimiters, task decomposition, examples, and relevant context improve outcomes?
8. How would you design prompt templates that are reusable, testable, versioned, and resistant to accidental instruction conflicts?
9. How do JSON Schema, Pydantic validation, constrained decoding, grammar-constrained decoding, Outlines, Guidance, and vLLM structured-output constraints work?
10. How should an application handle malformed JSON, schema violations, partial streaming output, invalid fields, and failed structured-output generation?
11. How does tool or function calling work, and why must the application validate and authorize proposed calls instead of trusting the model?
12. What is prompt injection, and how should an application distinguish trusted instructions from untrusted user input, retrieved documents, and tool outputs?
13. How do API keys, environment variables, secrets managers, request schemas, response schemas, and usage accounting contribute to reliable API integration?
14. How would you implement streaming responses, partial-output handling, cancellation, and tool-call processing in an LLM client?
15. How should an LLM application handle rate limits, provider errors, timeouts, exponential backoff, jitter, retry budgets, and non-retryable status codes?
16. How do model fallbacks and model routing work, and how can you ensure that fallback models satisfy the application's capability and privacy requirements?
17. How would you build a provider-neutral model interface that handles differences in tool calling, structured output, streaming, and model capabilities?
18. How would you measure input tokens, output tokens, cache hits, cost per request, cost per successful task, and usage-limit violations?
19. When should an application ask the user for clarification, abstain, use a tool, retrieve evidence, or return an answer directly?
20. How would you build and test a command-line LLM client supporting structured output, streaming, retries, usage logging, and a mock-provider mode?

## Module 05 — Databases, Networking, Linux and Infrastructure

1. How do SQL joins, grouping, aggregation, subqueries, CTEs, and window functions work, and when should each be used?
2. How do database indexes improve queries, and what are the trade-offs of B-tree indexes, composite indexes, and indexing frequently updated columns?
3. What are ACID transactions, isolation levels, dirty reads, non-repeatable reads, phantom reads, MVCC, and deadlocks?
4. How would you analyze a PostgreSQL query plan, identify a slow query, and decide which index or query rewrite to apply?
5. How do PostgreSQL schemas, migrations, JSONB, connection pooling, and transaction boundaries support production applications?
6. How would you investigate database lock contention, transaction failures, inconsistent records, and connection-pool exhaustion?
7. How do Redis TTLs, eviction policies, atomic operations, cache invalidation, and cache stampede prevention work?
8. When would you choose PostgreSQL, Redis, a document database, object storage, or a vector database for an AI application?
9. What is pgvector, and how does it support vector storage, similarity search, filtering, and indexing?
10. How do HTTP methods, status codes, headers, TLS, DNS, TCP, connection reuse, and timeouts affect application communication?
11. How do REST, gRPC, WebSockets, and Server-Sent Events differ, and when would you choose each for an AI application?
12. What are reverse proxies, load balancers, service discovery, connection pooling, and health checks?
13. How do Linux processes, threads, signals, file permissions, environment variables, shell commands, and log inspection help with production debugging?
14. How do Docker images, layers, containers, volumes, networking, and multi-stage builds work?
15. How would you build a secure container using a non-root user, minimal base image, secret management, image scanning, and resource limits?
16. How would you design CI/CD pipelines using GitHub Actions or an equivalent platform for tests, artifact creation, deployment, and rollback?
17. What are cloud compute, object storage, managed databases, IAM, VPCs, network policies, and secrets managers?
18. What are Kubernetes Pods, Deployments, Services, ConfigMaps, Secrets, readiness probes, liveness probes, resource requests, limits, and autoscaling?
19. What are replication, partitioning, sharding, consensus, eventual consistency, and the CAP trade-off, and how do they affect distributed applications?
20. How do event-driven systems, message ordering, at-most-once delivery, at-least-once delivery, dead-letter queues, replay, and schema compatibility work?
21. How do Terraform, infrastructure as code, environment parity, workload identity, credential rotation, and short-lived credentials improve deployment reliability?
22. How would you containerize and deploy a FastAPI application connected to PostgreSQL with migrations, health checks, automated tests, and a CI pipeline?
23. How would you debug an application that works locally but fails in a container or cloud environment?

## Module 06 — Document Processing and Data Pipelines

1. How do you design document ingestion for PDFs, scanned PDFs, DOCX, PPTX, HTML, Markdown, CSV, images, and source code?
2. How do native PDF parsing and OCR differ, and how do you decide when OCR is needed?
3. How do layout-aware extraction and ordinary text extraction differ when processing columns, tables, headers, footers, captions, and page references?
4. How would you process a document containing multi-page tables, complex layouts, nested structures, and ambiguous reading order?
5. How can vision-language models help extract information from images and documents, and how should their outputs be validated?
6. How would you normalize extracted content while preserving meaningful formatting, metadata, page numbers, source locations, and provenance?
7. How would you deduplicate documents and identify the same entity across inconsistent customer names, IDs, and source systems?
8. How can field-level confidence scores, schema validation, deterministic checks, and human review improve extraction reliability?
9. How do batch and streaming ingestion differ, and when would you use ETL, ELT, scheduled jobs, event-driven pipelines, or CDC?
10. How would you design incremental ingestion, backfills, idempotent processing, duplicate prevention, and failure recovery?
11. How should document versioning, re-indexing, schema evolution, data contracts, lineage, and quality checks be implemented?
12. How would you propagate a document update or deletion through extracted artifacts, summaries, embeddings, vector indexes, caches, and memory stores?
13. How can you ensure reproducibility using immutable input snapshots, versioned parsers, extraction models, transformation configurations, and derived artifacts?
14. When would you use Airflow, Spark, Ray, queues, or custom workers for document-processing pipelines?
15. How do you enforce tenant-level and document-level access control throughout ingestion and downstream processing?
16. How would you meet data classification, retention, data residency, privacy, consent, and deletion requirements?
17. How should a pipeline handle corrupted documents, incomplete extraction, stale records, conflicting sources, and parser upgrades?
18. How would you design a repeatable enterprise document-ingestion pipeline with incremental updates, provenance, extraction validation, monitoring, and deletion support?

## Module 07 — RAG and Information Retrieval

1. What is retrieval-augmented generation (RAG), and when is it preferable to prompting alone, fine-tuning, or long-context input?
2. How do fixed-size, overlapping, sentence-based, paragraph-based, semantic, Markdown-aware, and code-aware chunking differ?
3. What are parent-child, hierarchical, and document-aware chunking, and how do you choose chunk size and overlap?
4. How should tables, long documents, metadata, headings, page references, and document structure be represented during chunking?
5. How do dense retrieval, sparse retrieval, BM25, hybrid search, and exact versus approximate nearest-neighbor search work?
6. How do cosine similarity, dot product, and Euclidean distance affect vector retrieval, and why are similarity scores not automatically probabilities?
7. How do HNSW, IVF, product quantization, and IVF-PQ trade retrieval accuracy for memory use and query speed?
8. How do pgvector, Qdrant, Pinecone, Milvus, and Weaviate differ in architecture, filtering, deployment, multitenancy, and operational trade-offs?
9. How do metadata filters, namespaces, index lifecycle, access-control filters, and tenant isolation affect retrieval?
10. What is Reciprocal Rank Fusion (RRF), and how would you combine keyword and vector retrieval results?
11. How would you implement dynamic Top-K retrieval using score thresholds, score distributions, knee-of-the-curve filtering, or adaptive retrieval?
12. How do query rewriting, query expansion, multi-query retrieval, query decomposition, HyDE, and query routing work, and what failure modes can they introduce?
13. How does cross-encoder reranking work, and how would you evaluate a BGE-Reranker or Cohere reranker against the baseline?
14. How do parent-document retrieval, context compression, token pruning, prompt compression, prompt caching, and long-context processing affect answer quality and cost?
15. What is Self-RAG, and how do its IS-REL, IS-SUP, and IS-USE reflection signals relate to adaptive retrieval and answer assessment?
16. What is Corrective RAG (CRAG), and how could a system invoke web search when retrieved evidence is insufficient or unreliable?
17. How does RAPTOR organize recursively summarized document representations, and when can hierarchical retrieval help?
18. What is Anthropic Contextual Retrieval, and how does prepending chunk-level context before embedding affect retrieval?
19. How do ColBERT v2, late-interaction retrieval, the PLAID index, and the MaxSim operator differ from single-vector retrieval?
20. How does ColPali perform vision-language retrieval over PDF page images, and when could it outperform text extraction and OCR-based indexing?
21. How do GraphRAG and knowledge-graph retrieval represent entities, relationships, communities, and multi-hop questions?
22. When should you choose RAG, SQL, text-to-SQL, a knowledge graph, or a combination of structured and unstructured retrieval?
23. How would you design temporal retrieval for effective dates, revised policies, superseded documents, and questions requiring an answer as of a historical date?
24. How would you implement citation generation, source attribution, claim-level citation validation, evidence ordering, abstention, and contradiction handling?
25. How would you diagnose retrieval misses, chunk-boundary errors, query mismatches, reranking failures, context-assembly errors, and generation hallucinations separately?
26. How would you detect stale indexes, propagate deletions, support embedding-model migration, and safely roll back an indexing change?
27. How would you prevent poisoned documents and indirect prompt injection from influencing the model or bypassing authorization?
28. How would you implement ACL-aware retrieval with tenant isolation, document permissions, source freshness, and auditable access decisions?
29. How would you evaluate caching strategies for retrieval, embeddings, query results, and generated answers without serving stale or unauthorized content?
30. How would you benchmark dense, sparse, hybrid, reranked, hierarchical, graph-based, and multimodal retrieval strategies on a representative query dataset?

## Module 08 — LLM and RAG Evaluation

1. How would you build a golden evaluation dataset that represents production queries, document types, edge cases, and adversarial inputs?
2. How do human-labeled, synthetic, and production-derived evaluation datasets differ in reliability and coverage?
3. How can benchmark leakage, train/test contamination, duplicated examples, and selection bias lead to misleading evaluation results?
4. How should evaluation rubrics, acceptance thresholds, release gates, and dataset versions be defined and maintained?
5. What are Recall\@K, Precision\@K, Hit Rate, Mean Reciprocal Rank (MRR), and normalized Discounted Cumulative Gain (nDCG)?
6. How would you calculate and interpret retrieval metrics for a query with multiple relevant documents?
7. How do correctness, completeness, relevance, faithfulness, groundedness, and citation accuracy differ when evaluating generated answers?
8. What are context precision and context recall, and how do they help diagnose RAG failures?
9. When should you use deterministic checks, reference-based evaluation, human review, or an LLM-as-judge?
10. How would you design an LLM-as-judge rubric, calibrate it, measure human agreement, and detect false positives?
11. What are position bias, prompt sensitivity, judge inconsistency, and length bias, and how would you reduce their impact?
12. How would you use Ragas, DeepEval, TruLens, Arize Phoenix, or a custom evaluation harness in a repeatable workflow?
13. How do regression tests, offline experiments, online A/B tests, shadow evaluations, and canary evaluations differ?
14. How would you conduct paired comparisons, bootstrap confidence intervals, statistical significance testing, and power analysis for model changes?
15. How would you measure inter-annotator agreement and resolve disagreements between human evaluators?
16. How can evaluation coverage be measured, and how do you determine whether a benchmark reflects real production traffic?
17. How would you compare quality, latency, and cost across models using fixed examples and randomized answer ordering?
18. How would you measure cost per successful task, quality at a latency target, and quality per dollar?
19. How would you cluster failures by root cause, severity, frequency, and fix priority?
20. How would you identify the gap between offline benchmark improvements and actual production-user outcomes?
21. How would you build an evaluation pipeline that compares retrieval and answer quality, tracks regressions, and blocks unsafe or low-quality releases in CI?
22. How would you measure quality drift after changing the prompt, model, embedding model, chunking strategy, retriever, reranker, or context-assembly logic?

## Module 09 — Fine-Tuning and Alignment

1. When should you use prompting, RAG, continued pretraining, supervised fine-tuning, preference optimization, distillation, or a hybrid approach?
2. How do you design, clean, deduplicate, and validate instruction datasets for supervised fine-tuning?
3. What are Evol-Instruct and UltraFeedback, and what risks arise when using synthetic training or preference data?
4. How does model distillation transfer capabilities from a larger teacher model to a smaller student model, and what are the limitations of distilling reasoning-oriented models?
5. What are supervised fine-tuning (SFT), causal language-modeling objectives, loss masking, and sequence packing?
6. How do batch size, learning rate, warmup, epochs, gradient accumulation, optimizer choice, and sequence length affect fine-tuning?
7. How should training and validation splits be constructed, and how can data contamination and evaluation leakage be detected?
8. What are catastrophic forgetting, memorization, label noise, and capability regression, and how would you detect them after adaptation?
9. How does LoRA reduce the number of trainable parameters, and how do rank, alpha, target modules, and dropout influence the adaptation?
10. How do QLoRA, quantization, low-rank adapters, prefix tuning, prompt tuning, and other parameter-efficient fine-tuning methods differ?
11. What are DoRA, rsLoRA, and LoRA+, and what problems or trade-offs do they target?
12. How do TIES, DARE, and SVD-based adapter or model merging work conceptually, and what compatibility problems can arise when merging specialized adapters?
13. How do FP16, BF16, INT8, INT4, QLoRA, optimizer states, and activation memory affect fine-tuning resource requirements?
14. What are RLHF, PPO, reward models, preference data, DPO, KTO, and ORPO, and how do their learning objectives differ?
15. How can poor preference labels, reward hacking, distribution mismatch, and judge bias undermine alignment training?
16. How would you use Hugging Face Transformers, Datasets, PEFT, TRL, Unsloth, and experiment-tracking tools in a reproducible fine-tuning workflow?
17. How do continued pretraining and instruction tuning differ when adapting a language model to a specialized domain?
18. How can synthetic-data pipelines introduce teacher errors or reduce diversity, and how would you filter and verify their outputs?
19. How would you reproduce a fine-tuning run using fixed dataset versions, seeds, configuration snapshots, checkpoints, and tracked dependencies?
20. How would you compare the base and adapted models on a held-out dataset for quality, safety, generalization, capability retention, latency, memory, and cost?
21. How would you decide whether a LoRA adaptation is worthwhile compared with improving RAG, prompts, data quality, or application logic?

## Module 10 — Inference, Quantization and Serving

1. How do FP32, FP16, BF16, INT8, and INT4 differ in numerical precision, model memory, throughput, and hardware compatibility?
2. What are post-training quantization and quantization-aware training, and when would you use each?
3. How do AWQ, GPTQ, GGUF, and EXL2 differ in quantization approach, formats, ecosystems, and supported inference runtimes?
4. How would you estimate model-weight memory, KV-cache memory, activation memory, and runtime overhead before deploying a model?
5. How do vLLM, Hugging Face TGI, TensorRT-LLM, and local inference runtimes differ in their deployment and performance trade-offs?
6. What happens during the prefill and decode phases of LLM inference, and why do they have different compute and memory characteristics?
7. What is prefill-decode disaggregation, and how can systems such as vLLM and Mooncake use KV-cache transfer, including RDMA-based approaches, to improve serving architecture?
8. What is a KV cache, and how do sequence length, batch size, model dimensions, number of layers, and KV-head count affect its memory consumption?
9. How do PagedAttention, memory fragmentation, KV-cache eviction, and quantized KV caches using FP8 or INT4 storage affect serving?
10. How do continuous batching, dynamic batching, admission control, queue scheduling, and request prioritization affect throughput and latency?
11. How do FlashAttention and speculative decoding improve inference performance, and under what conditions might they provide limited benefit?
12. How do semantic caching approaches such as GPTCache and Redis vector caching reduce inference cost, and what correctness and privacy problems can arise?
13. How does prompt caching based on prefix matching reduce repeated computation and time to first token, and what affects cache hits?
14. How do tensor parallelism, pipeline parallelism, data parallelism, and distributed inference differ?
15. What are time to first token (TTFT), inter-token latency, end-to-end latency, queue time, tokens per second, and p50/p95/p99 latency?
16. How would you distinguish compute-bound, memory-bandwidth-bound, communication-bound, and scheduler-bound workloads?
17. How do GPU utilization, memory bandwidth, concurrency, sequence-length distribution, and workload burstiness affect saturation?
18. How would you perform queueing and capacity analysis for serving traffic under varying request rates and token lengths?
19. How should a serving system handle queue saturation, overload, timeouts, load shedding, graceful degradation, and autoscaling?
20. How would you estimate cost per request and cost per successful task across model size, quantization, caching, retries, and hardware utilization?
21. How would you benchmark two quantization or serving configurations reproducibly while controlling hardware, warm-up, cache state, request concurrency, and input/output lengths?
22. How would you roll out a new model artifact safely with validation, warm-up, readiness checks, sufficient GPU capacity, rollback, and compatibility testing?
23. How would you decide between managed model APIs and self-hosted inference based on total cost, traffic, quality, privacy, reliability, and operational burden?

## Module 11 — Backend Services and Production APIs

1. How do FastAPI, REST, gRPC, WebSockets, and Server-Sent Events differ, and which are best suited to different AI-serving use cases?
2. How would you design an API contract for LLM generation, retrieval, tool execution, and long-running agent tasks?
3. How would you stream model tokens and tool progress while handling partial output, client disconnects, cancellation, and cleanup?
4. How do asynchronous I/O, worker pools, background jobs, task queues, Kafka, and RabbitMQ differ in their roles?
5. How would you design a long-running API workflow using job IDs, polling, callbacks, resumable execution, and cancellation?
6. How do timeouts, retries, exponential backoff, jitter, retry budgets, circuit breakers, and dependency isolation interact?
7. What are idempotency keys, deduplication, at-most-once delivery, at-least-once delivery, and effectively-once business execution?
8. How would you handle an external operation whose outcome is unknown because its API timed out after the operation may have completed?
9. What are transactional outbox patterns, sagas, compensating actions, and reconciliation jobs, and when should each be used?
10. How do database transactions, connection pooling, isolation levels, and consistency requirements affect AI workflows that update external business systems?
11. How do API versioning, schema validation, consistent error contracts, pagination, and backward compatibility improve service reliability?
12. How do caching, invalidation, cache stampedes, stale responses, and request deduplication affect API correctness and performance?
13. How should health checks, graceful shutdown, cancellation propagation, worker draining, and readiness probes be implemented?
14. How do authentication, authorization, audit logs, tenant-aware request context, RBAC, and ABAC protect production APIs?
15. How would you implement per-tenant quotas, rate limits, bounded concurrency, noisy-neighbor protection, and fair scheduling?
16. How would you separate durable business state from transient model conversation state and agent working memory?
17. How would you implement tracing, structured logging, metrics, request IDs, and correlated tool/model call identifiers?
18. How would you design a rate-limited streaming LLM service with safe retries, request tracing, schema validation, cancellation, and integration tests?
19. How would you test failure behavior involving duplicate events, delayed dependencies, partial streaming, provider outages, and database connection exhaustion?
20. How would you deploy and operate a production AI API with health checks, schema migrations, configuration management, secure secrets, and rollback procedures?

## Module 12 — Single-Agent Design and Tool Execution

1. What is an AI agent, how does it differ from a deterministic workflow, and when should you avoid an agent?
2. How do ReAct, plan-and-execute, routing, iterative refinement, and reflection-based approaches differ?
3. How would you design an agent loop consisting of model calls, action selection, tool execution, observation, verification, and termination?
4. How do tool schemas, typed arguments, JSON Schema validation, authorization, allowlists, and output validation improve tool correctness?
5. How should an agent discover, select, execute, and interpret tools when multiple tools have overlapping capabilities?
6. How should agent state represent messages, task status, tool outputs, intermediate artifacts, assumptions, and verified results?
7. How would you enforce least privilege, scoped credentials, tool authorization, and execution-time permission checks?
8. What are action preconditions, postconditions, invariants, and state-transition correctness, and how would you enforce them in an agent?
9. How would you prevent infinite loops, repeated tool calls, oscillating plans, no-progress behavior, and unbounded token or cost usage?
10. How should an agent classify read-only, reversible, irreversible, external, and consequential actions to determine when human approval is required?
11. How should an agent recover from timeouts, malformed tool results, unavailable tools, partial responses, and uncertain external operation outcomes?
12. How would you distinguish a tool invocation that succeeded, a business operation that succeeded, and a user task that is actually complete?
13. How would you make tool calls idempotent and handle duplicate execution when an agent retries after a timeout?
14. How would you sandbox agent-generated code using E2B, Modal, Daytona, Docker, execution enclaves, resource quotas, and network egress restrictions?
15. How should an agent use tools safely when tool descriptions or results contain indirect prompt injections or adversarial instructions?
16. How would you preserve critical system instructions, relevant state, recent actions, and important evidence within a limited context window?
17. How would you design explicit completion criteria, progress detection, maximum-step limits, deadlines, and verification policies?
18. How would you implement a plain-Python agent with two tools, typed schemas, authorization checks, bounded execution, failure recovery, and unit tests?
19. How would you test an agent whose tool returns success but whose underlying business operation silently fails?
20. How would you compare an agent-based implementation with a deterministic workflow using task success, safety, latency, cost, and maintainability?

## Module 13 — Agent Orchestration and Durable Execution

1. What are workflow nodes, edges, conditional transitions, reducers, typed state, and graph-based execution?
2. How do LangGraph, AutoGen, CrewAI, custom state machines, and traditional workflow engines differ?
3. How do sequential, router, parallel, supervisor, and hierarchical orchestration patterns work?
4. How would you implement fan-out/fan-in, shared state, result aggregation, and concurrency control in an agent workflow?
5. What is the difference between workflow persistence, checkpointing, durable execution, event replay, and resumable execution?
6. How would you design an agent workflow that survives a process restart or a tool failure without losing completed work?
7. How would you implement pause/resume, human approval, cancellation, deadlines, and graceful termination?
8. How do duplicate event delivery, idempotent task handlers, deduplication, and state consistency affect durable workflows?
9. What are sagas and compensating transactions, and how can they recover from partially completed workflows spanning multiple services?
10. How should a workflow recover when a tool times out after an external side effect may already have occurred?
11. How would you detect repeated states, cycles, no-progress steps, and loop behavior across graph nodes or agent turns?
12. How would you classify retryable, non-retryable, transient, permanent, and business-logic errors?
13. How should an agent workflow enforce budgets for elapsed time, tokens, model calls, tool calls, and money?
14. What are the limitations of deterministic replay when executions include external APIs, real time, randomness, and non-deterministic model outputs?
15. How would you manage workflow state schema evolution when resuming checkpoints created by an older version of the application?
16. How would you build replayable audit history that records actions, observations, state transitions, approvals, and failures without exposing sensitive data?
17. How would you test checkpoint restoration, process crashes, duplicate events, failed compensation, and interrupted approvals?
18. When should you use Temporal or another durable execution engine instead of implementing orchestration solely with an LLM framework?
19. How would you implement a workflow that pauses for human approval, survives a simulated process crash, resumes from a checkpoint, and verifies its final state?
20. How would you decide whether a multi-step task needs an autonomous agent, a state machine, a durable workflow, or a combination?

## Module 14 — Planning, Memory and Multi-Agent Systems

1. How do task decomposition, dependency graphs, subtask ordering, plan validation, and replanning work in agent systems?
2. How can an agent detect impossible dependencies, unavailable resources, invalid assumptions, and plans that cannot meet a deadline?
3. What are extended reasoning and test-time compute scaling, and how do DeepSeek-R1, OpenAI o1/o3-style reasoning models, and System 1/System 2 analogies relate to them?
4. What are process reward models (PRMs), outcome reward models, and Monte Carlo Tree Search (MCTS), and how can they guide agent planning?
5. How do ReAct, reflection, critique-and-revise, verification, Tree of Thoughts, and Graph of Thoughts differ as reasoning or search strategies?
6. Why are generated explanations not sufficient evidence of correctness, and how can independent verification, executable tests, and external evidence improve reliability?
7. How do additional reasoning steps trade off against latency, cost, and the possibility of compounding errors?
8. What are working/context memory, episodic memory, semantic memory, vector-backed memory, and knowledge-graph memory?
9. How should an agent extract, consolidate, retrieve, update, summarize, and compress memories across long-running tasks?
10. How can an agent distinguish observed facts, inferred facts, uncertain claims, conflicting facts, and stale information in memory?
11. How should memory systems handle expiration, deletion, user control, provenance, contradictions, and privacy requirements?
12. What is memory poisoning, how can malicious or incorrect facts enter an agent's memory, and how can the system mitigate that risk?
13. How do supervisor, leader-follower, peer collaboration, hierarchical delegation, and consensus-based multi-agent designs differ?
14. How should tasks, typed handoffs, responsibilities, permissions, and result ownership be assigned between agents?
15. What are the trade-offs between shared and isolated context across multiple agents?
16. How can multi-agent systems resolve disagreement, verify results independently, and avoid accepting correlated errors as consensus?
17. How do duplicate work, communication overhead, repeated inference, shared-state races, message loops, and coordination failures affect multi-agent systems?
18. How would you prevent infinite agent-to-agent conversations and uncontrolled delegation?
19. Under what conditions can multiple agents outperform a single agent, and when is a single agent or deterministic workflow preferable?
20. How would you benchmark single-agent and multi-agent versions of the same task using success rate, correctness, latency, cost, failure recovery, and safety?

## Module 15 — Model Context Protocol and Interoperability

1. What problem does the Model Context Protocol (MCP) solve, and why was it introduced?
2. What did developers use before MCP, including custom OpenAPI descriptions, hardcoded tool adapters, and framework-specific wrappers, and what interoperability problems did these approaches create?
3. What are the roles of MCP hosts, clients, and servers, and how do they interact?
4. What is the difference between MCP tools, resources, prompts, and application-defined execution policies?
5. How does the FastMCP Python SDK work, and how do `@mcp.tool()`, `@mcp.resource()`, and `@mcp.prompt()` differ?
6. How do stdio and remote transports differ, and what transport and lifecycle behavior should be verified against the current MCP specification?
7. How do MCP initialization, capability negotiation, sessions, protocol versions, and feature compatibility work?
8. How would you build a custom FastMCP server that exposes a safe internal operation with typed inputs and validated results?
9. How would you connect an MCP server to Cursor, Claude Desktop, a custom agent, or another compatible client?
10. How do local and remote MCP deployments differ in connectivity, authentication, operational requirements, and trust boundaries?
11. How do MCP and the Agent-to-Agent (A2A) protocol differ in purpose, and when would client-server tool access and agent-to-agent communication be combined?
12. How does MCP differ from ordinary function calling, REST APIs, custom adapters, and workflow engines?
13. How should MCP tools enforce authentication, authorization, scoped credentials, least privilege, tenant isolation, and audit logging?
14. How can malicious tool descriptions, untrusted resources, and returned content trigger prompt injection or data exfiltration?
15. How would you handle MCP server outages, malformed messages, transport disconnections, cancellation, timeouts, and incompatible protocol versions?
16. How would you validate server identity, tool provenance, capability declarations, and permission boundaries before allowing an agent to execute a tool?
17. How would you test malformed inputs, unauthorized requests, compatibility failures, duplicate tool calls, and server unavailability?
18. How would you log MCP calls and errors without exposing secrets or sensitive user data?
19. How would you deploy and upgrade an MCP server safely while maintaining backward compatibility with existing clients?
20. How would you compare MCP with direct SDK integrations when deciding the simplest secure architecture for an enterprise application?

## Module 16 — Agent Evaluation, Observability and Operations

1. How would you define measurable task-completion criteria for an agent whose outputs and execution paths can vary?
2. How do task success rate, tool-selection accuracy, argument correctness, trajectory quality, recovery success, and unauthorized-action rate differ?
3. How would you evaluate complete execution trajectories rather than judging only an agent's final answer?
4. How would you create reproducible scenario simulations, synthetic tasks, adversarial tests, and human-reviewed benchmarks for agent applications?
5. What do SWE-bench, GAIA, WebArena, and HumanEval measure, and how would you determine whether each benchmark is appropriate for a particular agent?
6. How do human review, model-based evaluation, deterministic assertions, and reference-based scoring complement one another?
7. What are OpenTelemetry traces, spans, trace IDs, correlated logs, and distributed tracing, and how would you apply them to model and tool execution?
8. How would you trace model calls, tool calls, state transitions, retries, workflow nodes, and agent handoffs in a single request?
9. Which operational metrics should you monitor for token usage, model cost, tool latency, queue time, success rates, retries, errors, and policy violations?
10. How would you design privacy-safe tracing, redaction, retention, and access control while preserving enough evidence for debugging?
11. What are SLIs, SLOs, SLAs, and error budgets, and how would you define them for a production AI service?
12. How would you detect quality drift, changes in user queries, retrieval degradation, provider behavior changes, and tool reliability regressions?
13. How do shadow evaluations, canary releases, staged rollouts, rollback, and online monitoring reduce release risk?
14. How would you perform incident triage, reproduce a failed run, identify a root cause, mitigate the issue, and document corrective actions?
15. How would you inject tool failures, delayed responses, provider outages, corrupted checkpoints, and queue saturation to test resilience?
16. How would you replay and debug an agent trajectory using model inputs, tool outputs, state transitions, and task evidence?
17. How would you measure recovery quality separately from first-attempt success?
18. How would you test graceful degradation when a provider, retrieval index, external API, or observability dependency becomes unavailable?
19. How would you create alerts for cost runaway, latency regressions, quality drops, security anomalies, and unauthorized tool activity?
20. How would you use LangSmith, Langfuse, Arize Phoenix, Prometheus, Grafana, and OpenTelemetry in an integrated observability workflow?
21. How would you distinguish an application-quality failure from a provider outage, bad retrieval, invalid tool result, or infrastructure incident?
22. How would you build an agent evaluation and observability system that supports replay, failure injection, regression detection, and release decisions?

## Module 17 — AI Security, Privacy and Governance

1. How would you perform threat modeling for an LLM application by identifying assets, trust boundaries, attacker goals, attack paths, and mitigations?
2. What are direct and indirect prompt injection, jailbreaks, untrusted retrieved content, and tool-result injection, and how do they differ?
3. Why is prompt wording alone insufficient as a security boundary, and how should sensitive operations be protected independently of model decisions?
4. How do NeMo Guardrails, Guardrails AI, Llama Guard 3, and OpenInference-related conventions fit into AI application security, and what are their limitations?
5. How can RAG poisoning, malicious documents, compromised embeddings, and untrusted metadata influence retrieval and generation?
6. How can an agent accidentally or intentionally disclose sensitive information or exfiltrate data through tools, URLs, or generated output?
7. What are excessive agency and confused-deputy problems, and how can an agent exercise privileges that the requesting user does not possess?
8. How do OAuth 2.0, OpenID Connect (OIDC), API keys, service identities, RBAC, ABAC, and least privilege support secure AI applications?
9. How would you propagate end-user identity through retrieval, tool execution, background jobs, and external service calls?
10. How would you prevent cross-tenant data leakage in vector databases, caches, logs, agent memory, and shared infrastructure?
11. What is the time-of-check versus time-of-use problem, and why should permissions be revalidated when a consequential action executes?
12. How should an application validate model-generated SQL, URLs, shell commands, code, HTML, and external tool arguments?
13. How would you mitigate SQL injection, server-side request forgery (SSRF), unsafe output rendering, and malicious tool input?
14. How would you sandbox generated code, restrict network egress, enforce resource limits, and isolate filesystem access?
15. How should secrets managers, dependency scanning, artifact provenance, model-weight provenance, and supply-chain security be implemented?
16. How do PII identification, redaction, data minimization, encryption in transit and at rest, key management, and data retention interact?
17. How would you propagate deletion requests across raw documents, extracted text, derived summaries, embedding indexes, caches, memory stores, and evaluation data?
18. How do SOC 2, GDPR, HIPAA, consent, data residency, auditability, vendor data-handling policies, and zero-data-retention terms affect deployment decisions?
19. How would you assess privacy and authorization risks when sending enterprise data to an external model provider?
20. How would you protect against prompt injection hidden in images, PDFs, OCR text, audio transcripts, and extracted metadata?
21. How would you conduct red teaming, adversarial testing, security regression testing, and incident investigation for agentic applications?
22. How would you enforce tool allowlists, scoped credentials, human approvals, quotas, rate limits, and runaway-cost protections?
23. How would you threat-model a RAG agent that reads a customer database and creates tickets, and demonstrate that malicious retrieved content cannot bypass permissions?
24. How would you assess commercial-use permissions, model licenses, dataset licenses, model artifact integrity, and third-party tool-server trust?

## Module 18 — AI System Design

1. How would you translate an ambiguous AI product request into functional requirements, non-functional requirements, measurable acceptance criteria, and explicit assumptions?
2. How would you estimate average and peak requests per second, concurrency, session duration, input/output tokens, and workload variability?
3. How would you design API boundaries, services, data flows, storage, queues, caches, and ownership boundaries for a production AI system?
4. How would you reason about consistency, availability, durability, replication, partitioning, failure domains, and disaster recovery?
5. How would you design backpressure, retries, idempotency, rate limits, load shedding, graceful degradation, and dependency isolation?
6. How would you incorporate authentication, authorization, tenant isolation, auditability, observability, operational ownership, and privacy into an AI architecture?
7. How would you estimate the capacity and cost of a RAG system over millions of documents, including ingestion, embeddings, index growth, retrieval, reranking, and generation?
8. How would you design a RAG service supporting metadata filters, document-level access control, citations, data freshness, and deletion propagation?
9. How would you design an enterprise assistant that reads customer records, calls APIs, updates tickets, requests approvals, and recovers from failed operations?
10. How would you design a coding agent that indexes a repository, edits files, executes sandboxed tests, verifies patches, and safely returns changes?
11. How would you design a high-throughput inference API that supports streaming, quotas, model fallbacks, caching, queue management, and autoscaling?
12. How would you design a multitenant AI platform with per-tenant quotas, fair scheduling, cost attribution, and strong data isolation?
13. How would you design a private-cloud or on-premises inference platform with monitoring, model updates, controlled network access, and rollback?
14. How would you design a document-intelligence service that processes PDFs, PowerPoint files, images, tables, and scanned documents while preserving citations and layout?
15. How would you design a real-time streaming agent and a background agent workflow, and when would synchronous and asynchronous execution be preferable?
16. How would you choose between managed model APIs and self-hosting based on quality, latency, cost, privacy, hardware, reliability, and operations?
17. How would you choose among RAG, fine-tuning, prompting, deterministic workflows, autonomous agents, single-agent designs, and multi-agent designs?
18. How would you decide between SQL, object storage, vector databases, relational metadata, and knowledge graphs for a particular workload?
19. How would you calculate model-weight memory, KV-cache memory, tokens per second, storage growth, approximate request cost, and cost per successful task?
20. How would you identify compute, memory, network, queueing, retrieval, and provider bottlenecks when latency increases?
21. How would you use queueing models and realistic load tests to identify saturation points and predict p95/p99 latency?
22. How would you define SLOs, test overload and dependency failures, and select fallback strategies that preserve minimum acceptable quality?
23. How would you design evaluation gates, staged deployment, rollback, model migration, and incident recovery for AI-specific changes?
24. How would you explain architecture decisions and trade-offs to a skeptical stakeholder who prioritizes different objectives?
25. How would you document system assumptions, alternative designs, risks, capacity estimates, security boundaries, and operational responsibilities in an architecture decision record?

## Module 19 — Forward Deployed Engineer (FDE)

1. How would you conduct stakeholder interviews, map an enterprise workflow, identify user personas, and convert vague requirements into technical specifications?
2. How would you establish measurable success metrics, acceptance criteria, constraints, scope boundaries, and delivery milestones before building an AI solution?
3. How would you decide whether the customer's problem actually requires AI, an LLM, an agent, or a simpler deterministic implementation?
4. How would you identify data-access constraints, privacy obligations, deployment restrictions, ownership boundaries, and integration dependencies during discovery?
5. How would you handle changing customer requirements mid-implementation while protecting delivery timelines and system reliability?
6. How would you investigate an unfamiliar legacy API, database, CRM, ticketing system, or internal service before integrating it?
7. How would you integrate external systems using REST, gRPC, webhooks, event-driven messaging, batch processing, and data pipelines?
8. How do OAuth/OIDC, service accounts, RBAC, ABAC, and relationship-based access control (ReBAC) differ in enterprise integration?
9. What are OpenFGA and the Zanzibar authorization model, and when are relationship-based permissions useful?
10. How would you enforce pre-retrieval row-level security (RLS), document-level access controls, and permission tuple graphs for enterprise RAG?
11. How would you manage data contracts, schema evolution, API version changes, error handling, integration testing, and backward compatibility?
12. How would you deploy an AI system in a private network, private cloud, on-premises environment, or air-gapped infrastructure?
13. How would you implement tenant isolation, private networking, data residency, customer-managed credentials, and restricted egress?
14. How would you define proof-of-concept milestones, measurable exit criteria, acceptance tests, and a path from prototype to production?
15. How would you plan deployment, migrations, rollback, monitoring, incident response, and operational handover?
16. How would you establish SLA/SLO ownership, runbooks, support responsibilities, escalation paths, and cost attribution?
17. How would you communicate uncertainty, system limitations, security risks, and performance trade-offs to non-technical stakeholders?
18. How would you debug a customer-reported API failure using request IDs, structured logs, traces, status codes, SQL queries, and a minimal reproduction?
19. How would you investigate a production data discrepancy using SQL joins, aggregation, window functions, transactions, and source-of-truth analysis?
20. How would you decide whether a reported AI error originates from source data, extraction, retrieval, prompting, generation, permissions, or downstream integration?
21. How would you securely access customer data while enforcing least privilege, approval boundaries, auditability, and privacy requirements?
22. How would you define business impact using a baseline for processing time, accuracy, throughput, user adoption, error reduction, and operating cost?
23. How would you explain a slower but safer system design to a stakeholder who prioritizes speed or cost?
24. How would you evaluate a deployed AI workflow against real customer acceptance criteria and decide whether it is ready for handover?
25. How would you document architecture, failure modes, data flows, security controls, operating procedures, limitations, and support ownership for a delivered solution?
26. How would you respond if a customer requirement becomes infeasible because of API limitations, insufficient data quality, privacy restrictions, or model reliability?
27. How would you prioritize bug fixes, customer requests, architectural improvements, and delivery deadlines when resources are limited?
28. How would you describe a complete FDE delivery lifecycle from customer discovery through prototype, production rollout, evaluation, monitoring, and operational ownership?

## Module 20 — Multimodal AI and Specialist Topics

1. What are vision-language models (VLMs), vision encoders, image embeddings, cross-attention, and multimodal alignment?
2. How do image patches, resolution, cropping, image tokenization, and vision-encoder choices affect multimodal model performance?
3. How do optical character recognition (OCR), document layout analysis, table extraction, and vision-language reasoning complement one another?
4. When should a document-processing application use OCR, a VLM, a layout-aware parser, a text parser, or a hybrid architecture?
5. How do image embeddings and cross-modal embeddings enable retrieval across text, image, and document modalities?
6. How would you evaluate visual question answering, OCR accuracy, spatial understanding, image grounding, and hallucination in multimodal applications?
7. How do speech recognition, speech synthesis, audio embeddings, voice activity detection, and real-time voice interactions work?
8. How do streaming transcription, chunk alignment, speech-to-speech generation, interruption handling, and end-to-end voice latency affect conversational agents?
9. How would you design a video-understanding pipeline using frame sampling, timestamps, temporal reasoning, audio-video alignment, and retrieval?
10. What are small language models, edge inference, on-device serving, quantization, and hardware constraints, and when are they useful?
11. How do mixture-of-experts architectures, sparse computation, routing, and load balancing affect performance and deployment?
12. How would you choose between standard fine-tuning, parameter-efficient fine-tuning, preference optimization, and distributed training for a specialist model?
13. How do advanced GPU serving, distributed inference, memory bandwidth, tensor parallelism, and hardware-specific optimizations affect throughput?
14. What are knowledge graphs, entity resolution, relationship extraction, and advanced GraphRAG, and when can they improve multimodal retrieval?
15. How would you evaluate coding agents, web-interaction agents, browser automation, and computer-use agents using task completion, action correctness, safety, latency, and cost?
16. How would you design a browser or computer-use agent that handles screenshots, changing UI state, action verification, permission boundaries, and recovery?
17. What are deep research agents, and how do they perform multi-step search, source verification, evidence comparison, synthesis, and citation validation?
18. How would you generate, filter, validate, and evaluate synthetic training and evaluation data while controlling teacher errors and diversity collapse?
19. How can production feedback and online learning improve AI systems, and what safeguards are needed to prevent feedback loops and unsafe automatic adaptation?
20. How do federated learning and privacy-preserving machine learning support deployments where data cannot be centralized?
21. What are the trade-offs of on-device inference, edge deployment, offline operation, limited memory, and hardware acceleration?
22. How would you evaluate model licenses, commercial-use permissions, dataset licensing, redistribution restrictions, provenance, and deployment constraints before selecting a model?
23. How would you compare specialist models using task-specific accuracy, robustness, latency, memory, hardware requirements, cost, and safety?
24. How would you determine whether a specialist topic is relevant enough to justify implementation effort for a particular Generative AI Engineer or Agentic AI Engineer role?