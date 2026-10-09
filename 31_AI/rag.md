# Comprehensive Vector Search & Embeddings Cheat Sheet (Lessons 1–6)

---

## 1. Fundamentals of Embedding Models

### Core Pipeline

$$\text{Raw Text} \xrightarrow{\text{Tokenizer}} \text{Token IDs} \xrightarrow{\text{Lookup Table}} \text{Static Embeddings} \xrightarrow{\text{+ Positional Encodings}} \text{Transformer Layers} \xrightarrow{\text{Self-Attention}} \text{Contextual Embeddings} \xrightarrow{\text{Pooling}} \text{Single Vector}$$

* **Tokenizer:** Splittings text into tokens and outputs a sequence of integer IDs.
* **Input Token Embeddings:** A static lookup table mapping each token ID to a context-independent vector learned during training.
* **Positional Encodings:** Sinusoidal/learned functions added to token vectors to incorporate sequence order into the model.
* **Transformer Stack (Encoder-only):** Self-attention mechanisms allow tokens to interact, turning static vectors into dynamic, **context-aware representations**.
* **Pooling Layer:** Aggregates token-level representations (typically via **Mean Pooling**) into a single fixed-dimensional vector representing the full text.

---

## 2. Tokenization Strategies & Algorithms

### Tokenization Granularities

| Level | Pros | Cons |
| --- | --- | --- |
| **Character / Byte** | Tiny vocabulary size; handles any input or unknown characters gracefully. | Lacks initial semantic meaning; places heavy burden on transformer layers to learn character relationships. |
| **Word** | High initial semantic weight per token. | Exploding vocabulary size; fails completely on Out-Of-Vocabulary (OOV) words. |
| **Subword** *(Standard)* | Balances vocabulary size and semantic coverage; handles unseen words via root and affix sub-components. | Can struggle with ultra-rare alphanumeric codes, typos, or special characters. |

### Tokenization Algorithms Comparison

| Algorithm | Direction | Merge / Prune Criterion | Unique Characteristics / Behavior | Typical Usage |
| --- | --- | --- | --- | --- |
| **Byte Pair Encoding (BPE)** | Bottom-Up | Merges the most **frequently adjacent pair** of tokens iteratively. | Preserves natural word boundaries via pre-tokenization whitespace splits. | OpenAI GPT series, LLMs |
| **WordPiece** | Bottom-Up | Merges token pairs based on a **likelihood score** (co-occurrence relative to individual frequencies). | Uses a `##` prefix for middle/suffix subwords; throws errors or requires an explicit `[UNK]` token for unseen characters. | BERT, Sentence-Transformers |
| **Unigram** | Top-Down | Starts with a large candidate vocabulary and iteratively **prunes tokens** that increase global loss the least. | Avoids "glitch tokens" because unused or nonsensical candidates are systematically removed. | Cohere multilingual models |
| **SentencePiece** | Wrapper | Applied over BPE or Unigram algorithms. | Treats **whitespace as a regular character** (e.g., `_`); can create tokens spanning spaces (e.g., `"San Francisco"` or code indentation). | LLaMA, T5, Code models |

---

## 3. Vector Search Pitfalls & Solutions

### Common Failure Modes of Pure Semantic Search

```
               ┌──────────────────────────────────────────────┐
               │         Semantic Search Failures             │
               └──────────────────────┬───────────────────────┘
                                      │
     ┌──────────────────┬─────────────┴───────┬───────────────────┐
     ▼                  ▼                     ▼                   ▼
Emoji / Symbols   Product Codes          Typos / Slang       Numbers / Dates
`[UNK]` mapping   Fragmented subwords   Altered token IDs    Token overlap > values

```

1. **Emojis & Special Symbols:** Often map to `[UNK]` or generic bytes, causing opposite emotions (e.g., 🙂 vs 🙁) to map to identical vectors.
2. **Product Codes / SKU Numbers:** Model identifiers like `BCM2712` get chopped into meaningless sub-tokens.
3. **Typos & Misspellings:** Small spelling errors alter token sequences, significantly dropping similarity scores.
4. **Numbers & Prices:** String/token overlap dominates distance logic; `$55` and `$559` often appear closer semantically than `$55` and `$40`.
5. **Date Formats:** Differing formats (`2026-10-09` vs `Oct 9, 2026`) frequently map to separate vector spaces despite sharing identical meanings.

### Solution: Hybrid Metadata Filtering

* **Payload Indexing:** Create metadata indexes in vector databases (e.g., Qdrant) to enforce deterministic domain rules alongside semantic search:
```
Filter: (price < 40) AND (category == "Clothing")

```


* **LLM Constraint Extraction:** Use structured outputs from LLMs to convert natural language queries into explicit filter parameters prior to database retrieval.

---

## 4. Search Evaluation Metrics

To evaluate search quality, ground-truth judgments (`Qrels`) map queries to target document relevancy (binary or numerical scores).

| Metric | Type | Purpose & Formula | Key Focus |
| --- | --- | --- | --- |
| **Precision@K** | Relevancy | $\frac{\text{Relevant Docs in Top } K}{K}$ | Fraction of top-$K$ results that are relevant. |
| **Recall@K** | Relevancy | $\frac{\text{Relevant Docs in Top } K}{\text{Total Relevant Docs in Corpus}}$ | Fraction of all possible relevant documents retrieved. |
| **MRR** *(Mean Reciprocal Rank)* | Ranking | $\frac{1}{\vert{}Q\vert{}} \sum_{i=1}^{\vert{}Q\vert{}} \frac{1}{r_i}$ *(where $r_i$ is rank of 1st relevant item)* | Evaluates how quickly the system delivers its **first** relevant result. |
| **nDCG@K** *(Normalized DCG)* | Score-Graded | $\text{nDCG}@K = \frac{\text{DCG}@K}{\text{IDCG}@K}$ | Evaluates ranking quality while penalizing relevant items placed lower in the list. |

---

## 5. HNSW Graph Optimization

**Hierarchical Navigable Small World (HNSW)** is a multi-layer graph index for Approximate Nearest Neighbor (ANN) search.

```
Layer 2 (Sparse Express Lanes)    [Node A] -----------------------> [Node Z]
                                      │                                │
Layer 1 (Medium Density)          [Node A] -----> [Node K] -------> [Node Z]
                                      │              │                 │
Layer 0 (Dense Full Graph)        [Node A] -> ... [Node K] -> ...  [Node Z]

```

### Core Configuration Parameters

| Parameter | Function | Impact of Higher Values | Trade-Offs |
| --- | --- | --- | --- |
| **$M$** | Number of bidirectional edges created per node in each layer. | Increases graph connectivity; moves search closer to exact $K$-NN. | Higher RAM usage; slower index construction. |
| **$ef$ / $ef\_search$** | Size of the dynamic candidate list maintained during layer traversal. | Increases candidate evaluation pool; improves retrieval recall/precision. | Higher query latency. |

### Evaluation Rule

* **Exact Search Baseline:** Always establish a performance ground truth using exact brute-force search (`exact=True` / pure $K$-NN).
* **Evaluating HNSW Quality:** Use **Precision@K** against the exact $K$-NN baseline to optimize $M$ and $ef$ for speed vs. recall targets.
* **Segmentation:** Production vector databases split data into **non-overlapping segments** with independent HNSW graphs for parallel querying and incremental index rebuilding.

---

## 6. Vector Quantization & Memory Compression

Quantization reduces memory footprints by converting standard 32-bit floating-point numbers (`float32` = 4 bytes/dim) into lower-precision representations.

### Quantization Methods Comparison

| Quantization Type | Mechanism | Memory Compression | Characteristics & Performance |
| --- | --- | --- | --- |
| **Scalar (SQ)** | Maps floating-point ranges to 8-bit integers (`int8` $0\dots255$). | **$4\times$ reduction** (75% savings) | Industry default; preserves high search precision ($>0.98$) with faster search speeds. |
| **Product (PQ)** | Splits vectors into sub-vectors and maps them to **256 centroids** via $K$-Means clustering. | **$16\times$ to $64\times$ reduction** | Maximum RAM savings; causes noticeable precision degradation without rescoring. |
| **Binary (BQ)** | Converts positive values to `1` and negative/zero to `0` (1 bit per dimension). | **$32\times$ reduction** (~97% savings) | Ultra-fast query execution (up to **$40\times$ speedup** via bitwise XOR/Hamming distance). |

### Key Techniques for Maintaining Precision

1. **Segment-Level Quantization:** Quantization bounds are calculated per immutable database segment rather than globally, accommodating shifting min/max parameter ranges.
2. **Rescoring / Two-Stage Retrieval:**
* **Stage 1:** Retrieve candidate vectors quickly from RAM using quantized representations.
* **Stage 2:** Load original `float32` vectors from disk to re-compute exact similarity scores for top candidates.


3. **Oversampling (Binary Quantization):** Query a larger top-$K$ candidate pool ($2\times - 5\times$) using binary vectors, then re-rank candidates using full-precision vectors to resolve score ties.
