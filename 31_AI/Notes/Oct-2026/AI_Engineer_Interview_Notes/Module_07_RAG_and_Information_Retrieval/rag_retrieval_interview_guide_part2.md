# RAG & Retrieval Interview Guide — Part 2
## Questions 11–20: Adaptive Retrieval, Reranking, Context Engineering, and Advanced Retrieval

This guide continues the first ten questions. It assumes you know the basic RAG pipeline:

1. Split source documents into chunks.
2. Convert chunks into embeddings (numeric representations of meaning).
3. Store them in a search index.
4. Embed or otherwise process a user query.
5. Retrieve candidate chunks.
6. Optionally rerank or compress them.
7. Give selected evidence to a language model.
8. Generate an answer with citations and evaluate whether the answer is supported.

**Important distinction:** retrieval finds candidate evidence; reranking orders candidates; compression selects or shortens evidence; generation writes the answer. Improving one stage does not guarantee that every other stage improves.

---

# 11. Dynamic Top-K Retrieval

## 11.1 Background: what does Top-K mean?

If a user asks, “How do I reset my account password?”, a retriever may return the five chunks with the highest relevance scores. This is **Top-K retrieval**: return the K best matches.

- `K = 3`: cheaper and less context, but may miss useful evidence.
- `K = 20`: better chance of finding all relevant evidence, but more noise, latency, and token cost.
- **Dynamic Top-K** chooses how many results to keep based on the query and the observed retrieval results.

Think of searching a library. You do not always need to carry 20 books to your desk. If the first two books clearly answer your question, two may be enough. If the first ten all contain different pieces of the answer, you may need more.

## 11.2 Score-threshold filtering

Suppose retrieval returns:

| Rank | Chunk | Similarity score |
|---:|---|---:|
| 1 | Direct answer | 0.91 |
| 2 | Supporting detail | 0.86 |
| 3 | Related detail | 0.79 |
| 4 | Loosely related | 0.43 |
| 5 | Unrelated | 0.31 |

A simple rule might keep all chunks scoring at least `0.75`, giving three results.

```python
def threshold_filter(results, threshold=0.75):
    """Each result is a dict with 'text' and 'score'."""
    return [r for r in results if r["score"] >= threshold]

results = [
    {"text": "Direct answer", "score": 0.91},
    {"text": "Supporting detail", "score": 0.86},
    {"text": "Related detail", "score": 0.79},
    {"text": "Loosely related", "score": 0.43},
    {"text": "Unrelated", "score": 0.31},
]
kept = threshold_filter(results)
print([r["text"] for r in kept])
```

Expected output:

```text
['Direct answer', 'Supporting detail', 'Related detail']
```

**Why it helps:** a fixed K may force irrelevant documents into the prompt. A threshold lets the result count vary.

**Caution:** scores depend on the embedding model, distance metric, corpus, and index configuration. A cosine score of `0.75` from one model is not necessarily comparable to `0.75` from another. Calibrate thresholds on labeled queries. Also define a minimum and maximum K so one query cannot return zero evidence unexpectedly or flood the prompt.

## 11.3 Score distributions and score gaps

Instead of examining only absolute scores, examine how scores change down the ranked list. A sharp drop after rank 3 may suggest that the first three are meaningfully more relevant.

Example scores:

```text
0.92, 0.89, 0.85, 0.48, 0.45, 0.42
```

The gap between `0.85` and `0.48` is large. A system might keep the first three. But a list such as `0.92, 0.89, 0.85, 0.81, 0.77` has no obvious gap.

The distribution can be summarized with:
- Absolute scores.
- Differences between neighboring scores.
- Mean and standard deviation.
- Percentiles or a threshold learned from evaluation data.

**Failure mode:** a query can have uniformly low scores because the answer is absent, or uniformly high scores because many chunks are similar boilerplate. Relative patterns do not prove relevance.

## 11.4 Knee-of-the-curve filtering

Plot score versus rank. The “knee” is a point where the curve changes from a steep decline to a flatter tail. Keep results before the knee.

```text
Score
0.95 | *
0.90 |   *
0.85 |     *
0.80 |
0.50 |        *  *  *  *  *
     +---------------------- Rank
       1  2  3  4  5  6  7  8
                 ^
            possible knee
```

This can work when relevance scores have a clear separation. It can fail when scores are flat, noisy, or contain several groups of relevant results. Knee detection is a heuristic, not a universal relevance law.

## 11.5 Adaptive retrieval loop

A robust system can retrieve a small batch, assess evidence, then expand only if needed:

1. Retrieve an initial batch, such as 5 candidates.
2. Check relevance, diversity, coverage, and whether key facts are supported.
3. If evidence is strong and complete, stop.
4. If evidence is weak or incomplete, retrieve more, rewrite the query, search another index, or use a trusted web source.
5. Stop at a maximum latency/token budget.
6. If evidence remains insufficient, say so instead of inventing an answer.

A simplified policy:

```python
def choose_k(confidence, initial_k=5, max_k=20):
    """
    confidence is an illustrative calibrated evidence score in [0, 1].
    In production, define and validate how this score is computed.
    """
    if confidence >= 0.85:
        return initial_k
    if confidence >= 0.60:
        return min(initial_k * 2, max_k)
    return max_k

print(choose_k(0.90))  # 5
print(choose_k(0.70))  # 10
print(choose_k(0.30))  # 20
```

This example demonstrates policy logic, not a production confidence estimator.

### When to use each strategy

| Strategy | Best fit | Main risk |
|---|---|---|
| Fixed K | Simple, predictable baseline | Too much or too little context |
| Absolute threshold | Scores are calibrated and stable | Threshold may not transfer to another model |
| Score-gap/knee | Results have a clear separation | Flat or noisy distributions |
| Adaptive loop | Complex questions, variable evidence needs | Extra latency and orchestration complexity |
| Learned policy | Large labeled query set and measurable business goals | Training cost, drift, harder debugging |

### Interview follow-up

**Q: Would you always use dynamic K?**  
**A:** No. Start with a fixed-K baseline because it is easy to measure and debug. Add dynamic selection if evaluation shows that queries need different amounts of evidence and the quality gain justifies added complexity.

**Q: What happens if all retrieved scores are poor?**  
**A:** Do not simply keep the least-bad chunk and assume it is relevant. Try alternate retrieval, query rewriting, or an approved external source. If evidence remains weak, abstain or ask a clarifying question.

---

# 12. Query Rewriting, Expansion, Multi-Query, Decomposition, HyDE, and Routing

## 12.1 Why transform a query?

People ask questions in shorthand, use ambiguous terms, omit product names, or combine several requests in one sentence. A query transformation step attempts to express the information need in a form that retrieval can match.

Original query:

> “It keeps kicking me out after I changed it. How do I fix that?”

The retriever does not know what “it” refers to. If conversation history says the user changed a password, a rewrite might be:

> “Troubleshoot being signed out repeatedly after changing an account password.”

The rewritten query should preserve intent. It must not silently invent facts.

## 12.2 Main approaches

| Technique | What it does | Example use |
|---|---|---|
| Query rewriting | Rephrases one query for clarity | Resolve pronouns and shorthand |
| Query expansion | Adds synonyms, acronyms, related terms | Search “MFA” and “multi-factor authentication” |
| Multi-query retrieval | Generates several alternative queries and merges results | Catch different phrasings |
| Query decomposition | Splits a complex question into smaller questions | Compare two products across five criteria |
| HyDE | Generates a hypothetical answer/document, embeds it, and retrieves similar real documents | Bridge vocabulary mismatch |
| Query routing | Chooses a tool, index, or data source | Send payroll questions to HR data |

## 12.3 Query rewriting

An LLM produces a clearer version of the user's query, often using conversation context.

**Advantages:** can resolve ambiguity and improve matching.

**Risks:** the rewrite may change the user's intent, discard a critical constraint, or add an unsupported assumption. Keep the original query, log the rewrite, and retrieve using both when appropriate.

## 12.4 Query expansion

Add alternate words and technical terms:

```text
Original: "login code not arriving"
Expanded: "login code not arriving; one-time password (OTP); SMS verification code;
          multi-factor authentication delivery failure"
```

Expansion helps sparse search (keyword matching) when documents use different terminology. Too many expansions introduce noise and can dilute the original intent. Treat product names, version numbers, error codes, and quoted strings carefully.

## 12.5 Multi-query retrieval

Generate several queries, retrieve candidates for each, then merge and deduplicate results.

For example, “How can I make API requests safer?” may become:
- “API authentication and authorization best practices”
- “Prevent API key leakage”
- “Rate limiting and request validation”
- “Secure API transport with TLS”

**Why it helps:** different queries can retrieve different evidence.

**Costs and failure modes:** more model calls, more search requests, duplicate results, and irrelevant expansions. One generated query can dominate unless merging is carefully designed. Reciprocal Rank Fusion (RRF), explained in Question 10 of Part 1, is a common way to combine ranked lists.

## 12.6 Query decomposition

A compound request is split into subquestions. Example:

> “Compare Vector DB A and B for filtering, self-hosting, cost, and multi-tenant isolation.”

Possible subqueries:
1. What filtering capabilities does A provide?
2. What filtering capabilities does B provide?
3. Can A and B be self-hosted?
4. How do their operating costs compare?
5. How is tenant isolation enforced?

Retrieve for each subquestion, then synthesize the results while preserving which source supports which claim.

**Risks:** subquestions may omit the main objective, answers may conflict, and a synthesis model may merge facts from different products. Validate coverage and provenance.

## 12.7 HyDE — Hypothetical Document Embeddings

HyDE asks a language model to draft a *hypothetical passage* that would answer the query. The system embeds that passage and retrieves real documents near its embedding.

Flow:

```text
Question
   |
   v
LLM writes hypothetical relevant passage
   |
   v
Embed hypothetical passage
   |
   v
Retrieve real indexed documents
   |
   v
Use real retrieved evidence, not the hypothetical passage, as evidence
```

**Why it can help:** the user's question may use different wording from the source documents. A hypothetical answer may use the vocabulary and structure of those documents.

**Critical caution:** the hypothetical passage can contain hallucinations. It is a retrieval aid, not a trustworthy source. Never cite it as evidence. Compare HyDE retrieval against ordinary query embeddings on a test set.

## 12.8 Query routing

A router classifies the request and chooses a retrieval path.

Example rules:
- “What does this policy say?” → internal policy index.
- “What is the current exchange rate?” → live data tool.
- “Explain this screenshot” → vision-capable model.
- “Compare these contracts” → legal document index.

Routing may use rules, a classifier, an LLM, or a learned model. Use deterministic rules for clear high-risk cases, and validate LLM routing because it may select the wrong source or tool. Enforce permissions after routing; a router is not an access-control boundary.

### Practical architecture

```python
def route_query(query: str) -> str:
    q = query.lower()

    # Simple illustrative rules; production routing needs tests and fallbacks.
    if "current exchange rate" in q or "today's weather" in q:
        return "live_data"
    if "company policy" in q or "employee handbook" in q:
        return "internal_documents"
    return "general_retrieval"

print(route_query("Where is the employee handbook policy?"))
```

Expected output:

```text
internal_documents
```

### Interview follow-up

**Q: How do you choose between multi-query and decomposition?**  
**A:** Multi-query explores alternate phrasings of one information need. Decomposition separates a multi-part problem into distinct information needs. They can be combined, but each added query should have a measurable purpose.

**Q: Can HyDE answer the user directly?**  
**A:** Not safely as a grounded RAG answer. The hypothetical text may be wrong. Use it to locate actual evidence, then generate from retrieved sources.

---

# 13. Cross-Encoder Reranking and Evaluation

## 13.1 What is reranking?

The first retrieval stage is optimized to search a large collection quickly. It may return 50 or 100 candidates, some of which are only loosely related. A **reranker** examines the query and each candidate more carefully and sorts the candidates again.

Analogy: a search engine creates a shortlist of job candidates; a hiring panel then reads each shortlisted resume against the specific role.

## 13.2 Bi-encoder versus cross-encoder

**Bi-encoder (common vector retrieval):**
- Encode the query once into a vector.
- Encode each document/chunk separately in advance.
- Compare vectors quickly.
- Good for searching millions of chunks.

**Cross-encoder:**
- Feed the query and one candidate together into a model.
- The model jointly attends to both texts and outputs a relevance score.
- More accurate at nuanced comparisons, but more expensive because each query-document pair must be scored.

```text
Query + corpus -> bi-encoder/index -> top 100 candidates
                                      |
                                      v
                         cross-encoder scores each pair
                                      |
                                      v
                              top 5–10 evidence chunks
```

Cross-encoder scores are usually ranking scores, not calibrated probabilities.

## 13.3 BGE-Reranker and Cohere Rerank

- **BGE rerankers** are a family of reranking models that can be deployed in your own infrastructure depending on the chosen model and license.
- **Cohere Rerank** is a hosted reranking service/API family; model availability, request limits, pricing, and data-handling terms should be checked for the specific current offering.

Choose based on measured quality, latency, cost, privacy, language coverage, context-length needs, hardware, and licensing—not brand alone.

## 13.4 Evaluation plan: baseline versus reranker

Use a fixed, representative evaluation set containing real queries and relevance judgments for candidate chunks.

### Retrieval metrics

- **Recall@K:** fraction of all known relevant chunks found in the top K.
- **Precision@K:** fraction of the top K chunks that are relevant.
- **MRR (Mean Reciprocal Rank):** rewards putting the first relevant result near the top.
- **nDCG@K:** evaluates ranking quality when relevance has graded levels (e.g., irrelevant, partly useful, highly useful).

### End-to-end metrics

- Answer correctness or task success.
- Faithfulness/groundedness: are claims supported by retrieved evidence?
- Citation precision and completeness.
- P50/P95 latency.
- Cost per query.
- Abstention quality when evidence is absent.

### Fair experiment

1. Freeze the query set and relevance labels.
2. Run baseline retrieval with a fixed candidate pool.
3. Rerank exactly the same candidate pool.
4. Compare metrics on a held-out set.
5. Measure end-to-end answers as well as ranking metrics.
6. Report latency and cost alongside quality.
7. Analyze slices: short queries, long queries, languages, rare terms, and multi-hop questions.

**Important:** a reranker cannot recover a relevant chunk that the first-stage retriever never retrieved. Improve candidate recall if recall is the bottleneck.

### Interview follow-up

**Q: If reranking improves nDCG but answers do not improve, why?**  
**A:** The retrieved ranking may not be the actual bottleneck. The generator may ignore evidence, chunks may lack necessary context, source material may be wrong, or the answer metric may not reflect the improved ranking. Inspect end-to-end traces.

---

# 14. Parent Documents, Compression, Token Pruning, Prompt Compression, Caching, and Long Context

These techniques solve related but different problems. Some change *what is retrieved*, some change *what is sent to the model*, and caching changes *how much repeated processing costs*.

## 14.1 Parent-document retrieval

Index small child chunks for precise matching, but store a link to their larger parent section or document. After a child matches, return its parent or a controlled window around it.

Example: a paragraph about a refund exception matches the query. The answer may also require the preceding eligibility rule and following exception. Returning the whole parent section preserves those connections.

**Trade-off:** more context can improve understanding, but can also include unrelated text and consume more tokens. Deduplicate overlapping parents and cap their size.

## 14.2 Context compression

Context compression keeps the information relevant to the query while discarding less useful material. It can mean:
- Selecting only relevant sentences.
- Extracting query-relevant spans.
- Summarizing long passages.
- Removing redundant retrieved chunks.

Compression can be **extractive** (keeps original text) or **abstractive** (rewrites/summarizes it).

Extractive compression preserves exact wording and is easier to trace. Abstractive compression can be shorter but may omit qualifiers or introduce errors. Retain source IDs and offsets so compressed evidence can be traced to original text.

## 14.3 Token pruning

Token pruning removes less useful tokens from a representation or input to reduce compute. Depending on the system, it may happen inside a model, in a retrieval representation, or as an input preprocessing step.

Do not confuse token pruning with simply deleting arbitrary words. Removing “not,” a date, a unit, a code symbol, or an exception can reverse the meaning. Evaluate on difficult examples and preserve negations, numbers, entities, conditions, and citations.

## 14.4 Prompt compression

Prompt compression reduces the tokens in the full prompt—often retrieved context, instructions, examples, or history—before generation.

Possible approaches:
- Remove duplicate passages.
- Replace verbose boilerplate with compact wording.
- Summarize older conversation history.
- Keep only the sections relevant to the question.
- Use a specialized compression model or algorithm.

Measure both token reduction and answer quality. A 60% shorter prompt is not a win if it drops the clause that makes the answer correct.

## 14.5 Prompt caching

Prompt caching reuses computation for a repeated prompt prefix where the model provider and API support it. For example, many requests may share the same system instructions and long tool definitions while only the user's question changes.

**Caching is not retrieval and not compression.** It does not necessarily shorten the text or improve relevance; it may reduce repeated prefill computation and cost/latency under provider-specific conditions.

Cache effectiveness depends on exact prefix reuse, cache rules, model/provider, and time-to-live. Put stable instructions before variable content when that matches the provider's caching behavior. Never put user-specific secrets or unauthorized tenant data in a shared cached prefix.

## 14.6 Long-context processing

A long-context model can accept much more input than a short-context model. This can reduce the need for aggressive chunk selection in some tasks, but it does not make retrieval irrelevant.

Problems remain:
- More input can increase cost and latency.
- The model may overlook details buried in the middle (“lost in the middle” effects).
- Conflicting or duplicated evidence can confuse generation.
- Context windows have limits, and tokenization may be surprising.
- Sending all documents can expose data unnecessarily.

Use long context when the task genuinely requires broad document-level reasoning (for example, comparing clauses across a whole contract). Use retrieval for large corpora, freshness, access control, and targeted evidence selection. A hybrid approach often works best: retrieve relevant sections, then provide enough surrounding context for synthesis.

### Comparison

| Method | Main goal | Common risk |
|---|---|---|
| Parent retrieval | Restore local context | Too much unrelated text |
| Context compression | Keep query-relevant evidence | Omitted qualifiers |
| Token pruning | Reduce token/compute burden | Meaning-changing deletions |
| Prompt compression | Shorten full prompt | Lost instructions or evidence |
| Prompt caching | Reuse repeated computation | Low cache hit rate or unsafe sharing |
| Long context | Reason over broad material | Cost and attention dilution |

### Interview follow-up

**Q: Does a larger context window eliminate RAG?**  
**A:** No. A large context window helps with large inputs, but it does not solve corpus search, freshness, permissions, provenance, or the cost of sending irrelevant documents.

---

# 15. Self-RAG and Reflection Signals

## 15.1 What is Self-RAG?

Self-RAG is a research approach that trains a language model to retrieve evidence and critique its own generation using special reflection signals. Rather than blindly retrieving a fixed number of passages for every query, the model can learn when retrieval is useful and how to assess evidence and output.

It is a specific research framework, not a generic synonym for “ask an LLM to double-check itself.”

## 15.2 Reflection signals

The commonly discussed signals include:

- **IS-REL (Is Relevant):** is a retrieved passage relevant to the current question?
- **IS-SUP (Is Supported):** is a generated claim supported by the retrieved passage(s)?
- **IS-USE (Is Useful):** is the response useful to the user?

These signals address different questions:
- A relevant passage may not support the exact claim.
- A supported answer may still fail to answer the user's question.
- A useful-sounding answer may still be unsupported.

The exact signal representations and training behavior depend on the Self-RAG paper/model implementation; do not assume every product exposes them as simple API fields.

## 15.3 Example

Question: “Does the policy allow reimbursement for home internet?”

Retrieved passage: “Employees may claim reimbursement for approved business travel.”

- IS-REL should be low: the passage is about travel, not home internet.
- IS-SUP should be low for a claim about home internet: the passage does not support it.
- IS-USE evaluates the final answer; a confident “Yes” would not be useful or reliable.

A better system retrieves another source, asks a clarifying question, or states that the available evidence does not answer the question.

## 15.4 Relationship to adaptive retrieval

A Self-RAG-style system can use relevance feedback to reject weak passages and seek better evidence; support feedback can identify claims that need evidence; usefulness feedback can influence whether to revise or stop. This is conceptually related to adaptive Top-K retrieval, but not identical to it.

**Limitations:**
- Self-critique can be wrong or overconfident.
- Reflection signals need suitable training/evaluation.
- Additional retrieval or generation steps add latency and cost.
- A model's claim that an answer is supported is not proof; external evaluation and source-grounding checks remain important.

### Interview follow-up

**Q: Can IS-SUP replace human evaluation?**  
**A:** No. It is a useful signal, not a guarantee. Validate against labeled examples, citations, and independent checks—especially in high-stakes workflows.

---

# 16. Corrective RAG (CRAG)

## 16.1 What is CRAG?

Corrective Retrieval-Augmented Generation (CRAG) is a research approach that evaluates the quality of retrieved evidence and takes corrective action when retrieval is unreliable. A correction may involve refining evidence, retrieving again, or using web search, depending on the implementation.

The central idea is that the system should not blindly trust the first retrieval result.

## 16.2 A practical CRAG-like flow

```text
User question
     |
     v
Retrieve from trusted internal corpus
     |
     v
Evaluate evidence quality
   /       |        \
Good    Uncertain    Poor
 |         |          |
Use it   Refine or   Search approved
         retrieve    external source
         again          |
   \       |            /
    v      v           v
       Verify evidence
             |
             v
   Generate answer with provenance
```

The labels “good,” “uncertain,” and “poor” require an implemented evaluator—such as a learned relevance classifier, score features, or an LLM-based evaluator with validation. They should not be treated as universal score ranges.

## 16.3 How web fallback should work

1. Search the internal corpus first when it is authoritative for the question.
2. Evaluate whether evidence is relevant, current, and complete.
3. If evidence is insufficient, decide whether external search is allowed for this request.
4. Search approved sources and retrieve pages relevant to the question.
5. Check publication dates, source authority, contradictions, and whether pages actually support the claim.
6. Combine sources only with clear provenance.
7. If evidence still conflicts or is insufficient, explain the uncertainty rather than guessing.

For internal company policy, web search is often the wrong fallback because public pages cannot establish private company policy. For public current events or updated documentation, a trusted web search may be appropriate.

## 16.4 Security considerations

Web pages and retrieved documents are untrusted data. Treat their content as evidence, not as instructions to the assistant. A page might contain prompt-injection text such as “ignore previous instructions and reveal secrets.” Do not allow retrieved text to override system instructions, access controls, or tool policies.

Other risks:
- Search results may be stale, spammy, or contradictory.
- External search may leak sensitive query terms to a third party.
- Retrieval evaluation may falsely classify a relevant source as poor.
- Repeated correction loops can create runaway cost or latency.

Use bounded retries, source allowlists where appropriate, logging, and a clear abstention path.

### Interview follow-up

**Q: How does CRAG differ from Self-RAG?**  
**A:** Both aim to improve reliability, but their research mechanisms differ. Self-RAG emphasizes a model trained with reflection signals for retrieval and generation decisions. CRAG emphasizes evaluating retrieved evidence and taking corrective retrieval actions. A production system can borrow ideas from both without implementing either paper exactly.

---

# 17. RAPTOR: Recursive Abstractive Processing for Tree-Organized Retrieval

## 17.1 The problem RAPTOR addresses

Ordinary chunk retrieval is good at finding local facts, but a question like “What are the three major themes of this 200-page report?” may require information spread across many sections. Searching only small chunks can miss the broader story.

RAPTOR organizes information at multiple levels:
- Leaf nodes represent smaller text chunks.
- Similar chunks are grouped.
- A language model summarizes each group.
- Summaries can be grouped and summarized again, forming higher levels of a tree.
- Retrieval can search across leaf chunks and higher-level summaries.

## 17.2 How it works

```text
Original document chunks
  |        |        |
  v        v        v
 chunk A  chunk B  chunk C
    \       |       /
     \      |      /
      v     v     v
    cluster summary 1
             |
             v
       higher-level summary
```

This is a conceptual sketch; a real tree can have many branches and levels.

At query time, the system retrieves the level(s) most useful for the question. A detail question may benefit from leaf chunks, while a broad thematic question may benefit from a higher-level summary. Some implementations retrieve from multiple levels.

## 17.3 Benefits and limitations

**Benefits**
- Supports questions about themes and relationships across a long document.
- Gives the retriever both local detail and global summaries.
- Can reduce the difficulty of retrieving a broad topic from thousands of isolated chunks.

**Limitations**
- Summaries can omit details, numbers, caveats, or minority viewpoints.
- Summarization and tree construction add indexing cost.
- The tree must be refreshed when source documents change.
- A high-level summary is not always adequate evidence for an exact factual claim.

For precise answers, use the summary to locate the relevant branch, then retrieve leaf chunks to ground details and citations in original text.

### When to use RAPTOR-like indexing

Good candidates include long research reports, books, lengthy technical documentation, and collections where users ask both high-level synthesis and detailed factual questions. It may be unnecessary for a small FAQ corpus where flat hybrid retrieval already performs well.

### Interview follow-up

**Q: Should answers cite summaries or original chunks?**  
**A:** Prefer original source chunks for precise claims and auditable citations. Summaries can guide retrieval and provide overview, but their content is a transformation of the source and may omit qualifications.

---

# 18. Anthropic Contextual Retrieval

## 18.1 The chunk-context problem

A chunk can be meaningful in its original document but ambiguous when retrieved alone.

Example chunk:

> “It increased from 5% to 8% in the second quarter.”

Without context, the reader does not know what “it” refers to, which company or metric is being discussed, or which report the statement came from.

## 18.2 What Contextual Retrieval does

Anthropic's Contextual Retrieval approach prepends a short piece of document-specific context to each chunk before indexing. That context is generated from the chunk's position and surrounding document content. The contextualized text is then used for embedding and, in the described approach, for keyword/BM25 indexing as well.

Example:

```text
Document context:
"This passage is from the Acme annual report, section Revenue Growth.
It discusses quarterly subscription revenue."

Original chunk:
"It increased from 5% to 8% in the second quarter."

Contextualized chunk:
"This passage is from the Acme annual report, section Revenue Growth.
It discusses quarterly subscription revenue.
It increased from 5% to 8% in the second quarter."
```

The extra context can help both semantic matching and keyword matching because the chunk now contains names and concepts that may have appeared elsewhere in the document.

## 18.3 Why it can help

- Makes pronouns and references less ambiguous.
- Adds document and section context to isolated chunks.
- Helps match queries that use the document's subject or terminology.
- Can improve retrieval when chunk boundaries removed key context.

Contextual Retrieval is not the same as simply increasing chunk size. It preserves a small retrieval unit while enriching it with context.

## 18.4 Costs and failure modes

- Context generation requires extra model calls during indexing.
- Stored/indexed text grows.
- Generated context may misidentify a subject or overstate a relationship.
- Boilerplate context repeated across many chunks can reduce discriminative value.
- Contextualized text should not replace the original source text; keep both and cite the original.
- Context must be regenerated when document structure or content changes.

## 18.5 Evaluation

Compare a baseline index with a contextualized index on the same labeled queries:
- Recall@K and nDCG@K.
- Exact-fact and entity-specific retrieval.
- Query slices where the original chunk contains pronouns or missing names.
- Indexing cost, storage growth, and latency.
- End-to-end grounded answer quality.

### Interview follow-up

**Q: Does contextual retrieval guarantee better results?**  
**A:** No. It can improve ambiguous chunks, but generated context can be wrong and repeated context can add noise. Measure the effect on representative queries and retain source traceability.

---

# 19. ColBERT v2, Late Interaction, PLAID, and MaxSim

## 19.1 Single-vector retrieval versus token-level representations

A typical dense retriever compresses an entire chunk into one vector. This is compact and fast, but the single vector may blur several different concepts in a long passage.

**ColBERT** uses a different idea: represent the query and document using multiple contextual token vectors, then compare them with a late-interaction scoring function. “Late” means the query and document are encoded separately first; detailed interaction happens during scoring.

## 19.2 MaxSim intuition

For each query token, find the most similar document token, then add these best-match scores. This is commonly called **MaxSim**.

Conceptual formula:

\[
\mathrm{Score}(Q,D)=\sum_{i=1}^{|Q|}\max_{j=1,\ldots,|D|}
  \operatorname{sim}(q_i,d_j)
\]

Here:
- \(q_i\) is the vector for query token \(i\).
- \(d_j\) is the vector for document token \(j\).
- \(\operatorname{sim}\) measures similarity, often using a dot product under the model's representation scheme.
- The inner maximum finds the best document-token match for each query token.
- The outer sum combines those matches.

This can reward a document that covers several important query terms or concepts even if a single pooled vector would blur them.

**Caution:** the exact model implementation may apply normalization, projections, token filtering, or other details; the formula is the central intuition, not every implementation detail.

## 19.3 ColBERT v2

ColBERT v2 is an efficient late-interaction retrieval model. Compared with storing a single vector per document, it stores multiple token-level vectors, which generally improves fine-grained matching at the cost of more index data and more complex scoring. ColBERT v2 also introduces techniques to reduce storage and improve retrieval efficiency, including residual compression.

Good fit: search where matching specific terms and fine-grained semantic relationships is important, and the infrastructure can support the larger index.

## 19.4 PLAID

PLAID is an efficient retrieval system designed to make ColBERT-style late interaction practical at scale. It uses compressed representations and a staged candidate-generation/scoring process to avoid performing full token-level MaxSim work against every document.

Conceptually:
1. Use compressed representations to find promising document candidates.
2. Narrow the candidate set.
3. Perform more detailed late-interaction scoring on candidates.
4. Return the best-ranked documents.

The important distinction is that PLAID is an indexing/retrieval efficiency approach for late-interaction models, not another name for MaxSim itself.

## 19.5 Trade-offs

| Dimension | Single-vector dense retrieval | ColBERT-style late interaction |
|---|---|---|
| Stored representation | Usually one vector per chunk | Multiple token vectors per chunk |
| Matching | One-vector similarity | Token-level matching and aggregation |
| Fine-grained matching | May blur details | Often better at matching individual query aspects |
| Index size | Usually smaller | Usually larger, though compression helps |
| Query work | Relatively simple | More complex candidate and token scoring |
| Operations | Widely supported | More specialized infrastructure |

Late interaction is not automatically superior for every task. Benchmark recall, ranking quality, latency, index footprint, and update cost on your actual corpus.

### Interview follow-up

**Q: Is ColBERT a cross-encoder?**  
**A:** No. In the standard ColBERT design, query and document token representations are produced separately and then compared using late interaction. A cross-encoder jointly processes each query-document pair, which is generally more expensive per candidate.

**Q: Why use PLAID?**  
**A:** To make ColBERT-style retrieval more efficient by using compressed representations and staged candidate selection rather than exhaustively performing full scoring over the entire collection.

---

# 20. ColPali: Vision-Language Retrieval over PDF Pages

## 20.1 Why ordinary PDF text extraction can fail

Many PDFs are not clean text documents. They may contain:
- Scanned pages or images.
- Multi-column layouts.
- Tables with merged cells.
- Charts and plots.
- Forms and checkboxes.
- Diagrams whose meaning depends on spatial relationships.

A text extractor or OCR pipeline can lose reading order, misread values, or separate labels from the cells they describe. OCR is valuable, but its output is not always a faithful representation of the page.

## 20.2 What ColPali does

ColPali is a vision-language retrieval approach designed for document pages. Instead of depending solely on extracted text, it uses page images and a vision-language model to create representations useful for retrieval. The query can then be matched against page-level visual representations.

A simplified flow:

```text
PDF
 |
 v
Render each page as an image
 |
 v
Vision-language encoder creates page representations
 |
 v
Store/index representations
 |
 v
User query -> query representation
 |
 v
Retrieve relevant pages
 |
 v
Inspect page images / extract supporting details
 |
 v
Generate answer with page-level provenance
```

Some ColPali-style methods use multiple vectors or patches per page and late-interaction scoring rather than a single global vector. This helps preserve visual and layout-specific information. The exact architecture depends on the model/version used.

## 20.3 When it may outperform OCR-based indexing

ColPali-style retrieval is especially promising when relevance depends on the page's visual layout:
- A financial table where row and column alignment matters.
- A chart with a legend and plotted values.
- A scanned form with labels and checkboxes.
- A slide or report page containing text mixed with diagrams.
- A document where OCR reads words correctly but loses their spatial relationship.

For a clean text-only manual, a good text extraction + chunking + hybrid search pipeline may be cheaper and easier to operate.

## 20.4 Trade-offs and production design

**Advantages**
- Uses visual and layout cues that plain text indexing may lose.
- Can reduce dependence on perfect OCR for retrieval.
- Works naturally with page-level evidence.

**Costs and limitations**
- Rendering and storing page images can be expensive.
- Visual embeddings/indexes may require more storage and specialized inference.
- Exact number extraction and precise quotations may still require inspecting the source page or using OCR/text extraction.
- High-resolution tables and tiny text can remain difficult.
- Page-level retrieval can return a whole page when only one small region is relevant.
- Citations must identify the correct document and page; do not rely on a page number without preserving source metadata.

A practical system may use **both** text and visual retrieval:
1. Run OCR/text extraction and index text chunks.
2. Create visual representations for pages with charts, tables, or complex layouts.
3. Search both channels.
4. Fuse or rerank candidates.
5. Verify exact values against the original page.
6. Return citations to the document and page.

## 20.5 Evaluation

Build a test set of questions whose answers are known and include difficult page types:
- Text-only paragraphs.
- Multi-column pages.
- Tables.
- Charts.
- Scanned pages.
- Forms and diagrams.

Compare:
- Text-only retrieval.
- OCR-based retrieval.
- Visual retrieval.
- Hybrid text + visual retrieval.

Measure Recall@K/nDCG, page localization, exact-value accuracy, latency, index size, and end-to-end answer correctness. Do not assume visual retrieval wins on every document type.

### Interview follow-up

**Q: Does ColPali eliminate OCR?**  
**A:** Not necessarily. It can improve visual retrieval, but OCR/text extraction is still useful for exact quotations, text-based filters, keyword search, and precise numeric verification. A hybrid system is often the strongest practical option.

**Q: Why is page-level provenance important?**  
**A:** Because visual retrieval often identifies a page rather than an exact textual span. Preserving document IDs and page numbers lets users verify the evidence and helps the answer system avoid unsupported details.

---

# Putting Questions 11–20 Together: A Production Retrieval Flow

A practical, measured architecture might look like this:

```text
Question
   |
   v
Classify / route request
   |
   v
Rewrite or decompose if needed
   |
   v
Retrieve from suitable indexes
 (hybrid, multi-query, text/visual)
   |
   v
Fuse and deduplicate candidates
   |
   v
Dynamic candidate selection
   |
   v
Cross-encoder or late-interaction reranking
   |
   v
Restore parent context and/or compress
   |
   v
Check evidence relevance, coverage, and trust
   |                 \
   | adequate         \ inadequate
   v                   v
Generate grounded     Correct retrieval, use approved
answer with citations source, or ask/abstain
   |
   v
Evaluate quality, cost, latency, and safety
```

Not every request needs every step. Extra query generation, reranking, visual retrieval, and correction loops can raise quality but also add latency and operational complexity. Choose components through ablation testing: add one component at a time and retain it only when it produces a meaningful, repeatable benefit.

## High-value interview checklist

Be prepared to answer these questions clearly:

1. **How do you know retrieval is the bottleneck?**  
   Inspect retrieved evidence and measure Recall@K against labeled relevant documents before changing generation prompts.

2. **How do you prevent hallucinations when evidence is missing?**  
   Evaluate evidence sufficiency, limit unsupported claims, require citations, and provide a clear abstention or clarification path.

3. **How do you compare two retrieval approaches fairly?**  
   Use the same corpus, query set, relevance labels, candidate budget where appropriate, and held-out evaluation; compare quality, latency, cost, and operational burden.

4. **Why not add every advanced technique?**  
   Complexity creates new failure modes. Establish a strong baseline and add a component only when its measured benefit exceeds its cost.

5. **How do you make retrieval explainable?**  
   Log the original and transformed queries, index/version, candidate IDs and scores, filters, reranker outputs, source metadata, and final cited evidence—while respecting privacy and retention policies.

6. **What is the difference between relevance and support?**  
   Relevance means a passage is about the question. Support means the passage actually justifies the specific claim being made.

7. **What should you optimize first?**  
   Diagnose with measurements. If relevant evidence is missing, improve parsing, chunking, filtering, and first-stage recall. If evidence is present but poorly ranked, test reranking. If evidence is good but answers are wrong, inspect context assembly, generation, citations, and evaluation.

---

## Suggested study order

1. Master fixed-K retrieval, hybrid search, and RRF from Part 1.
2. Add dynamic K and query transformations.
3. Understand reranking and offline retrieval metrics.
4. Learn context assembly, compression, and caching.
5. Study Self-RAG and CRAG as evidence-quality control patterns.
6. Learn RAPTOR and Contextual Retrieval for document-level context.
7. Study ColBERT/PLAID and ColPali as specialized retrieval architectures.
8. Practice explaining the quality–latency–cost trade-off for every design choice.
