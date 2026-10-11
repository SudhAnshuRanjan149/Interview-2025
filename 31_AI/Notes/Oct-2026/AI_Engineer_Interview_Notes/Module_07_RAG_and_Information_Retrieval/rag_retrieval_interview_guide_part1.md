# RAG and Vector Retrieval: Beginner-to-Interview-Level Study Guide

**Topics covered:** RAG, chunking, document structure, dense and sparse retrieval, similarity metrics, ANN indexes, vector databases, filtering and tenant isolation, and Reciprocal Rank Fusion (RRF).

> **How to use these notes:** Start with the foundations, then study each numbered section. Code examples are small and self-contained; database-specific commands may require the corresponding database and client library to be installed. The best settings depend on your data and workload, so treat numerical settings as starting points—not universal rules.

---

## Foundations: understand the RAG pipeline first

### What problem are we trying to solve?

Imagine building an assistant that answers questions about a company's internal policies. The language model may know general facts, but it does not automatically know the company's latest leave policy, an internal troubleshooting document, or a file uploaded yesterday. We need a way to find the right source material and provide it to the model when a question is asked.

That is the central idea behind **retrieval-augmented generation (RAG)**: retrieve relevant information from an external knowledge source, then give that information to a language model so it can formulate an answer.

### The main pieces

| Term | Beginner-friendly meaning | Example |
|---|---|---|
| Corpus | The collection of information we can search | PDFs, manuals, tickets, wiki pages, source code |
| Document | One source item | `leave_policy.pdf` |
| Chunk | A manageable piece of a document | The paragraph explaining annual leave |
| Embedding | A list of numbers representing the meaning of text | `[0.12, -0.08, 0.44, ...]` |
| Vector database/index | A system that stores embeddings and helps find similar ones | pgvector, Qdrant, Pinecone |
| Retriever | The component that searches for relevant chunks | Vector search plus keyword search |
| Reranker | A component that reorders candidate results more carefully | A cross-encoder comparing the question with each chunk |
| Context | The information supplied to the model for this answer | Retrieved policy paragraphs and their source references |
| Grounded answer | An answer supported by supplied evidence | A summary that cites the policy page and section |

### Typical RAG architecture

```text
                    OFFLINE / INGESTION PIPELINE

  PDFs / HTML / DOCX / Wiki / Code
                 |
                 v
       Extract text and structure
                 |
                 v
       Clean and split into chunks
                 |
                 v
     Attach metadata and source IDs
                 |
                 v
       Generate embeddings -------------------+
                 |                            |
                 v                            |
       Store chunks + vectors + metadata      |
                 |                            |
                 v                            |
        Vector / keyword indexes              |
                                              |
                    ONLINE / QUESTION PIPELINE|
                                              v
  User question --> Normalize / rewrite query
                              |
                              v
                     Retrieve candidate chunks
                              |
                              v
                       Optional reranker
                              |
                              v
                Select context within token budget
                              |
                              v
                  LLM answers from the evidence
                              |
                              v
                 Answer + citations / abstention
```

**Critical distinction:** an embedding does not contain the original text in a directly readable form. It is a numeric representation useful for comparison. Store the original text, source identifiers, and metadata as well as the vector.

---

# 1. What is RAG, and when is it preferable to prompting alone, fine-tuning, or long-context input?

## 1.1 What is RAG?

**Retrieval-augmented generation (RAG)** is a pattern in which an application searches an external knowledge base for useful evidence and supplies that evidence to a generative model at answer time.

Think of an open-book exam:

- **The language model** is the student who can explain and reason.
- **The knowledge base** is the book shelf.
- **The retriever** is the librarian who finds the right pages.
- **The prompt context** is the selected pages placed on the student's desk.

The model is no longer expected to answer only from information encoded during training. It can use relevant material found at run time.

## 1.2 How RAG works step by step

1. **Ingest the source data.** Extract text from PDFs, web pages, databases, tickets, manuals, and other approved sources.
2. **Clean and chunk it.** Split long content into useful passages while keeping section headings and source references.
3. **Create searchable representations.** Generate embeddings for semantic search and, when useful, build keyword indexes such as BM25.
4. **Store the data.** Save chunk text, its vector, source ID, page, heading, permissions, version, and other metadata.
5. **Receive a question.** For example, “How many paid leave days can an employee carry forward?”
6. **Retrieve candidates.** Use dense search, keyword search, or hybrid search to find relevant passages.
7. **Optionally rerank.** A stronger relevance model can compare the question with each candidate and reorder them.
8. **Build the context.** Include the best evidence, clear instructions, and source information within the model's context-token budget.
9. **Generate the answer.** Ask the LLM to answer using the supplied evidence, cite sources, and say when the evidence is insufficient.
10. **Evaluate and monitor.** Check retrieval quality, factual support, citations, latency, cost, and failure cases.

## 1.3 Why not just put everything in the prompt?

A prompt is the instruction and information sent directly to the model. Prompting alone works well when the information is short, already available, or general. It becomes a poor fit when the information is large, private, changing, or needs precise source references.

For example, suppose there are 20,000 policy documents. Sending all of them on every question would be expensive, slow, and possibly exceed the context limit. RAG attempts to send only the passages relevant to the current question.

## 1.4 RAG versus prompting, fine-tuning, and long context

| Approach | What it changes | Best fit | Main limitation |
|---|---|---|---|
| Prompting alone | Instructions and examples in the request | Short tasks, stable facts, style guidance, small context | Cannot magically access missing private or current information |
| RAG | The evidence retrieved and supplied at answer time | Large or changing knowledge bases, traceability, private documents | Retrieval can miss relevant evidence; ingestion and indexes need maintenance |
| Fine-tuning | Model parameters/behavior through additional training | Consistent style, task behavior, domain-specific patterns, classification, structured output habits | Not a reliable way to keep a large changing knowledge base current; training/evaluation costs money and time |
| Long-context input | The amount of source material directly supplied in one request | Small-to-medium document sets, document-wide synthesis, cases where many portions must be considered together | More tokens can mean higher cost/latency; the model may still overlook details in a long input |
| RAG + fine-tuning | Retrieval supplies facts; tuning shapes behavior | Specialized production assistants needing both domain behavior and external evidence | More components and more evaluation work |

**Key interview point:** RAG and fine-tuning solve different problems. RAG mainly changes *what evidence is available at inference time*. Fine-tuning changes *how the model tends to behave*. They can be used together.

## 1.5 When RAG is a good choice

Use RAG when:

- The source information changes often and should be refreshed without retraining a model.
- The data is private or specific to an organization.
- Answers should point to documents, pages, or sections.
- The whole knowledge base cannot fit sensibly into each prompt.
- Different users have different permissions and must retrieve different evidence.
- You need to update or delete source material independently of the LLM.

RAG may not be necessary when the task is simple, the needed facts are already provided in a short prompt, there is no external knowledge, or a small and stable dataset can be passed directly to the model.

## 1.6 What RAG does not guarantee

RAG **reduces some knowledge-related failure modes; it does not eliminate hallucinations**. The retriever may return irrelevant passages, the source itself may be wrong, the model may misinterpret evidence, or the prompt may contain too much noise.

Production safeguards include:

- Ask the model to answer only when evidence supports the claim.
- Include source references and check that citations actually support the answer.
- Return “I could not find enough information” when evidence is weak.
- Apply permission filters before exposing retrieved content.
- Evaluate retrieval and answer quality separately.

## 1.7 Mini example

**Question:** “What is the warranty period for Model X?”

Retrieved passage: “Model X products purchased after 1 January 2026 have a two-year limited warranty. Proof of purchase is required.”

A grounded answer might be: “Model X has a two-year limited warranty for purchases after 1 January 2026, and proof of purchase is required. Source: Warranty Policy, section ‘Coverage’.”

If no matching warranty text is found, the safer behavior is to say the knowledge base did not provide enough evidence—not to invent a warranty period.

## Interview follow-ups

**Q: Does RAG update the language model's weights?**  
**A:** No. In standard RAG, external evidence is retrieved and inserted into the request. Updating the source documents and index can refresh knowledge without retraining the LLM.

**Q: Why can a RAG system still hallucinate?**  
**A:** Retrieval can return poor evidence, source text can be incomplete, or the model can make unsupported claims. Better chunking, retrieval, reranking, prompts, citations, and evaluation reduce—but cannot fully remove—this risk.

**Q: Should every application use a vector database?**  
**A:** No. For a small dataset, SQL, full-text search, or even direct prompt context may be simpler. Use a vector index when semantic retrieval is useful at the scale and latency required.

---

# 2. How do fixed-size, overlapping, sentence-based, paragraph-based, semantic, Markdown-aware, and code-aware chunking differ?

## 2.1 What is chunking, and why is it needed?

A model can accept only a limited amount of input at one time. A ten-page manual may contain many unrelated topics. If we embed the whole manual as one unit, a query about one small detail may match the manual broadly but give the model too much unrelated text. If we split it into tiny fragments, we may separate a rule from its explanation or exception.

**Chunking** breaks a source into passages that can be indexed and retrieved individually. Good chunks are large enough to preserve meaning and small enough to retrieve precisely.

## 2.2 Main chunking strategies

| Strategy | How it works | Advantages | Risks / best use |
|---|---|---|---|
| Fixed-size | Split after a chosen number of tokens or characters | Simple, predictable, easy to implement | Can cut a sentence, table, or code block in half; good baseline |
| Fixed-size with overlap | Each chunk repeats some content from the previous chunk | Helps preserve information around boundaries | Repeats data, increases storage and duplicate retrieval; helpful when boundaries may split context |
| Sentence-based | Group complete sentences until a target size is reached | Keeps grammatical units intact | A single sentence can be too long or too vague; useful for prose and Q&A |
| Paragraph-based | Use paragraph boundaries as chunk boundaries | Preserves author-created thought units | Paragraphs can vary greatly in length; best when document formatting is reliable |
| Semantic | Split where topic or meaning changes, sometimes using embedding similarity | Can create coherent topic-focused chunks | More compute, more parameters, and harder-to-predict chunk sizes; useful for mixed-topic content |
| Markdown-aware | Respect headings, lists, tables, block quotes, and fenced code blocks | Keeps content aligned with document structure | Requires reliable parsing; large sections still may need subdivision |
| Code-aware | Split by syntax such as classes, functions, methods, or AST nodes | Preserves callable units and symbol context | Requires language-aware tooling and may struggle with generated or invalid code |

## 2.3 Fixed-size chunking

Suppose the target is 400 tokens. The text is split into consecutive blocks of approximately 400 tokens. Token counts are usually better than character counts because LLM context limits are measured in tokens, not characters.

**Advantages:** easy to build; consistent chunk size; easy to benchmark.  
**Disadvantages:** it may split a heading from its content, separate a definition from an exception, or cut off a sentence.

Use it as a baseline or when source structure is poor. Do not assume a fixed size is best merely because it is easy to configure.

## 2.4 Overlapping chunks

If the chunk size is 400 tokens and overlap is 60 tokens, the next chunk starts 340 tokens after the previous start. The 60 repeated tokens help retain context near boundaries.

```text
Chunk 1: [--------------------- 400 tokens ---------------------]
Chunk 2:                                    [--------------------- 400 tokens ---------------------]
                                             <--- 60 overlap --->
```

Overlap can help when an answer depends on a sentence that crosses a boundary. Too much overlap creates near-duplicate chunks, increases indexing costs, and can crowd the final context with repeated information.

## 2.5 Sentence-based and paragraph-based chunking

Sentence-based splitting respects sentence endings and then groups sentences until a target size is reached. Paragraph-based splitting treats each paragraph as a meaningful unit, possibly combining small paragraphs or splitting very long ones.

These methods often work better than blind character slicing for normal prose. But a sentence such as “It is not permitted unless an exception applies” may be meaningless without the preceding statement defining the exception. Structure and context still matter.

## 2.6 Semantic chunking

Semantic chunking attempts to detect topic changes. One common approach is:

1. Split the text into candidate sentences or small groups.
2. Create embeddings for neighboring candidates.
3. Compare neighboring embeddings.
4. Treat a sufficiently large drop in similarity as a possible topic boundary.
5. Merge resulting units while respecting minimum and maximum chunk sizes.

Example: a manual moves from “battery charging” to “camera calibration.” A semantic method may create separate chunks even when both topics fall in the middle of a long paragraph.

**Trade-off:** semantic chunking can improve topical coherence, but embedding calls and boundary thresholds add complexity. It may also create inconsistent chunk lengths and requires evaluation against a simpler baseline.

## 2.7 Markdown-aware chunking

A Markdown-aware splitter recognizes structures such as:

- `#` and `##` headings;
- ordered and unordered lists;
- fenced code blocks;
- tables;
- block quotes;
- links and reference sections.

For example, do not detach this heading from the paragraph that explains it:

```markdown
## Reset the device

1. Turn off the device.
2. Hold the reset button for five seconds.
3. Wait until the indicator turns green.
```

The chunk should ideally store the heading and the steps together. If the section is too long, split it into child chunks that retain the parent heading path, such as `Troubleshooting > Reset the device`.

## 2.8 Code-aware chunking

For a code repository, splitting every 500 characters can divide a function in the middle and make the retrieved fragment impossible to understand. Code-aware chunking uses language parsers or repository metadata to split at logical boundaries, for example:

- module or file;
- class;
- function or method;
- interface/type definition;
- test case;
- configuration block.

Preserve important context such as imports, class name, file path, symbol name, and nearby docstrings. Very large functions may still need smaller chunks, while short methods may be grouped with the class or related methods.

**Example metadata for a code chunk:** `repo=vehicle-assistant`, `path=src/can/client.py`, `symbol=send_frame`, `language=python`, `commit=abc123`.

## 2.9 A simple working chunking example

This example shows fixed-size chunking with overlap using characters, which keeps the example dependency-free. **For a real LLM pipeline, prefer token-aware splitting** because characters and tokens do not map one-to-one.

```python
from typing import List


def chunk_text(text: str, chunk_size: int = 500, overlap: int = 80) -> List[str]:
    """Split text into overlapping character windows.

    chunk_size: maximum characters per chunk
    overlap: characters repeated between neighboring chunks
    """
    if chunk_size <= 0:
        raise ValueError("chunk_size must be greater than zero")
    if overlap < 0:
        raise ValueError("overlap cannot be negative")
    if overlap >= chunk_size:
        raise ValueError("overlap must be smaller than chunk_size")

    chunks = []
    start = 0

    while start < len(text):
        end = min(start + chunk_size, len(text))
        chunks.append(text[start:end])

        # Move forward, leaving an overlap with the previous chunk.
        start += chunk_size - overlap

    return chunks


sample = "RAG retrieves evidence. Chunking affects what can be found. " * 8
for number, chunk in enumerate(chunk_text(sample, chunk_size=80, overlap=15), start=1):
    print(f"Chunk {number}: {len(chunk)} characters")
```

**How it works:** the function validates the settings, takes a window, appends that window, then advances by `chunk_size - overlap`. It stops when the start position reaches the end of the text.

**Expected output:** several lines similar to `Chunk 1: 80 characters`, followed by the final shorter chunk. Exact lengths depend on the sample string. Adjacent chunks share 15 characters except where the final chunk ends.

**Limitations:** this does not preserve sentences, headings, tables, or code syntax. It is a teaching example, not a complete production splitter.

## Common mistakes

- Choosing chunk size only by habit rather than testing retrieval quality.
- Using character count when the model's limit is token-based.
- Creating extremely small chunks that lose meaning.
- Using huge chunks that dilute retrieval with irrelevant text.
- Adding large overlap that floods results with duplicates.
- Ignoring headers, source boundaries, or document version.
- Treating code, tables, and normal prose as if they had identical structure.

## Interview follow-ups

**Q: Is smaller chunk size always better?**  
**A:** No. Smaller chunks can improve precision but may lose context and increase the number of candidates. Larger chunks preserve context but may include irrelevant text. Evaluate the trade-off on representative questions.

**Q: Why use overlap?**  
**A:** To reduce loss of meaning around split boundaries. The cost is extra storage and repeated content in retrieval results.

**Q: Would you use semantic chunking for all documents?**  
**A:** Not automatically. It can help mixed-topic prose, but incurs extra processing and complexity. Markdown-aware, paragraph-aware, or code-aware splitting may be more appropriate for structured sources.

---

# 3. What are parent-child, hierarchical, and document-aware chunking, and how do you choose chunk size and overlap?

## 3.1 Parent-child chunking

Parent-child chunking stores at least two levels of content:

- **Parent:** a larger section that preserves broad context.
- **Child:** a smaller passage optimized for accurate retrieval.

Example:

```text
Parent: Employee Leave Policy (Section 4: Carry-forward)
  |-- Child 4.1: Who is eligible
  |-- Child 4.2: Maximum days carried forward
  |-- Child 4.3: Expiry and exceptions
```

The system searches child chunks because they are focused. When a child matches, it can fetch the parent section—or nearby siblings—to give the LLM enough surrounding context.

**Why useful?** Small chunks often make retrieval precise, while the parent keeps qualifications and explanations together. This pattern is sometimes called small-to-big retrieval.

**Risk:** if the parent is extremely long, inserting the entire parent may exceed the context budget. Select a bounded parent section or a few adjacent siblings instead.

## 3.2 Hierarchical chunking

Hierarchical chunking organizes content at multiple levels of granularity. A simple hierarchy is:

```text
Document
  |
  +-- Chapter
       |
       +-- Section
            |
            +-- Paragraph / child chunk
```

Retrieval can happen in stages: identify a likely document or chapter, search within the relevant section, then return the best paragraphs. Another approach indexes summaries of large sections alongside their detailed children. A summary can help find the right region, while the detailed child supplies the evidence.

This is useful for long manuals, legal documents, technical specifications, large policy collections, and books with a meaningful hierarchy.

**Trade-off:** more levels require more indexing logic, metadata, and tests. A hierarchy does not automatically improve accuracy; summaries can omit important details, so final answers should be grounded in original source text when possible.

## 3.3 Document-aware chunking

Document-aware chunking respects the source's natural structure and boundaries. The source may be a web page, PDF, Markdown file, source-code repository, spreadsheet, or scanned document.

Examples:

- PDF: keep page number, section heading, table boundaries, and reading order.
- HTML: keep title, heading path, paragraph, list, and link context.
- Markdown: keep heading path and fenced code blocks.
- Code: keep file path, class, function, and line range.
- Spreadsheet: retain sheet name, column headers, row keys, and units.

Document-aware chunking is less a single algorithm than a design principle: **the split logic should understand the type and structure of the content being indexed.**

## 3.4 How to choose chunk size

There is no universal correct chunk size. It depends on the embedding model, source type, question style, context window, and desired level of answer detail.

Use these practical principles:

1. **Preserve a meaningful unit.** A policy rule plus its exception may need to stay together.
2. **Avoid mixing topics.** A passage about installation should not casually include unrelated billing content.
3. **Keep enough context to interpret references.** “It expires after 30 days” is weak without knowing what “it” refers to.
4. **Respect the embedding model.** If the input is truncated by the embedding model, part of a chunk may not be represented.
5. **Leave room for multiple results.** The final prompt needs space for the question, instructions, evidence, and answer.
6. **Measure, do not guess.** Compare retrieval and answer quality across candidate chunk sizes on a representative evaluation set.

As a starting experiment for ordinary prose, teams often compare several sizes—such as roughly 200, 400, and 800 tokens—with low or moderate overlap. These are **test points, not universal recommendations**. Code, tables, and short FAQs may need very different boundaries.

## 3.5 How to choose overlap

Overlap should be large enough to protect boundary context but small enough to avoid needless duplication. For an initial experiment, compare no overlap with a modest overlap (for example, around 10–15% of the chunk size) and inspect actual boundary failures. This percentage is a heuristic, not a rule.

Overlap is less important when the splitter reliably respects semantic structure. It may still be useful for long paragraphs or sections that have to be split due to size limits.

## 3.6 Selection guide

| Content/use case | Good starting strategy | Additional detail to preserve |
|---|---|---|
| FAQ or short articles | Sentence or paragraph chunks | Question/answer pairing, article title |
| Employee policies | Heading-aware, parent-child | Rule, exception, effective date, page/section |
| Long technical manuals | Hierarchical + document-aware | Chapter, section, step order, figures/tables |
| Markdown documentation | Markdown-aware | Heading path, list and code-block integrity |
| Source code | Code-aware | Repository, file path, symbol, commit, line range |
| Scanned PDF | OCR/layout-aware extraction, then document-aware chunks | Page number, reading order, OCR confidence where available |
| Large contracts | Clause-aware hierarchical chunks | Clause number, definitions, referenced clauses, version |

## Interview follow-ups

**Q: Why retrieve a child but return a parent?**  
**A:** The child gives a precise match; the parent provides the surrounding context needed to interpret it correctly.

**Q: Do parent and child need separate embeddings?**  
**A:** Not necessarily, but a common design indexes child chunks for detailed search and may also index parent summaries for broad discovery. The right choice depends on the retrieval strategy and evaluation results.

**Q: How do you tune chunk size in production?**  
**A:** Build a fixed test set of questions and supporting source passages, vary chunk sizes and overlap, measure retrieval recall/precision and downstream answer grounding, and include latency, token usage, and duplicate-result rates.

---

# 4. How should tables, long documents, metadata, headings, page references, and document structure be represented during chunking?

## 4.1 A chunk should be more than a string

Avoid storing only raw text and a vector. Store a structured record with enough information to identify the original source, filter results, rebuild the index, and cite evidence.

Example record:

```json
{
  "chunk_id": "policy-v7-p12-c03",
  "document_id": "employee-leave-policy-v7",
  "text": "Employees may carry forward up to five unused leave days...",
  "embedding": [0.12, -0.08, 0.44],
  "metadata": {
    "title": "Employee Leave Policy",
    "section_path": ["Annual Leave", "Carry-forward"],
    "page_start": 12,
    "page_end": 12,
    "chunk_index": 3,
    "document_version": "7",
    "effective_date": "2026-01-01",
    "source_uri": "https://intranet.example/policies/leave-v7",
    "tenant_id": "company-123",
    "access_groups": ["employees"],
    "language": "en"
  }
}
```

The short vector above is only illustrative; real embedding dimensions are typically much larger. In many databases the vector is stored as a dedicated field, while metadata is stored in separate structured fields or a JSON payload.

## 4.2 Headings and section paths

A chunk from a section called “Troubleshooting > Camera Calibration > Error E17” should retain that path. The text can begin with a compact heading prefix:

```text
Document: ADAS Service Manual
Section: Troubleshooting > Camera Calibration > Error E17
Content: Error E17 appears when the calibration target cannot be detected...
```

This prefix helps both semantic and keyword search. Keep the same information in metadata as well, so it can be filtered, displayed, or cited without parsing the text.

Be careful not to repeat an enormous heading hierarchy in every chunk. Store the full path in metadata and include a concise prefix in the searchable text when beneficial.

## 4.3 Tables

Tables are easy to damage by splitting cells away from headers. Consider this table:

| Model | Max load | Warranty |
|---|---:|---|
| A1 | 10 kg | 1 year |
| B2 | 20 kg | 2 years |

If a chunk contains only `B2 | 20 kg | 2 years`, a retriever or LLM may not know which values correspond to load and warranty.

Better strategies:

- Preserve the table's title and column headers.
- Keep a small table together if it fits the chunk budget.
- For large tables, split by rows or meaningful row groups and repeat the header in each chunk.
- Keep units, footnotes, captions, and row labels.
- Store sheet/table ID and page reference.
- For highly structured questions, consider loading table data into SQL or a structured query tool rather than relying only on text retrieval.

Example normalized text:

```text
Table: Product specifications
Columns: Model | Maximum load | Warranty
Row: Model B2 | Maximum load: 20 kg | Warranty: 2 years
Source: Product Manual, page 18
```

## 4.4 Long documents

For a long document, use both local and global structure:

- Global metadata: document title, ID, source URL, version, owner, effective date, and permissions.
- Hierarchical metadata: chapter, section, subsection, clause, or heading path.
- Local metadata: chunk index, page start/end, character/token offsets, and neighboring chunk IDs.
- Content metadata: source type, language, extraction method, and content checksum.

If a question needs information spread across distant sections, consider retrieving more than one chunk, using a summary/index of sections, or using a multi-step retrieval strategy. Do not assume one chunk can represent an entire long document faithfully.

## 4.5 PDF page references and citations

For PDFs, preserve page numbers as the user sees them, and if PDF pages have both printed numbers and physical file-page indices, record both. For example:

```json
{
  "pdf_page_index": 14,
  "printed_page_label": "12",
  "section_path": ["Safety", "Warning lights"],
  "char_start": 20810,
  "char_end": 21602
}
```

Page references support useful citations such as “Safety Manual, printed page 12.” Character offsets can help locate text in the extracted source, though they do not replace page-level citations. If extraction is performed with OCR, verify text and layout for high-risk documents; OCR can confuse characters, reading order, and table structure.

## 4.6 Metadata fields: filterable versus descriptive

Think about the purpose of each field:

| Field type | Examples | How it is used |
|---|---|---|
| Identity | `chunk_id`, `document_id` | Deduplication, updates, deletions, citation links |
| Source | `source_uri`, `title`, `page_start` | Traceability and display to users |
| Structure | `section_path`, `heading`, `chunk_index` | Context, filtering, hierarchical retrieval |
| Business filters | `product`, `region`, `effective_date`, `status` | Restrict search to relevant records |
| Security | `tenant_id`, `allowed_group_ids`, `classification` | Authorization-aware retrieval |
| Versioning | `document_version`, `content_hash`, `indexed_at` | Detect stale content and update safely |

Do not put every descriptive field in the embedding text. Keep data structured so it can be filtered and maintained. On the other hand, information like product names or section titles can be repeated in the searchable text when it improves retrieval.

## 4.7 Updating and deleting documents

A production ingestion pipeline should be idempotent: processing the same source twice should not create uncontrolled duplicates. A common pattern is:

1. Identify a document with a stable ID.
2. Calculate a content hash or version.
3. Detect whether its content changed.
4. Delete or supersede old chunks associated with the previous version.
5. Create the new chunks and vectors.
6. Mark the new version as active only when it has been indexed successfully.
7. Retain audit information if business or legal requirements demand it.

Otherwise, a RAG system can retrieve an outdated policy beside the new one and give contradictory answers.

## Interview follow-ups

**Q: Why store a source ID and page number if the text is already stored?**  
**A:** They support reliable citations, debugging, auditability, deduplication, and locating the original material.

**Q: Should metadata be added to the embedding text?**  
**A:** Some descriptive context—such as title or section heading—often helps retrieval. Authorization and filter fields should also be stored as structured metadata so they can be enforced reliably rather than inferred from text.

**Q: How do you handle a table that is too large for one chunk?**  
**A:** Split at meaningful row groups, repeat the column headers and table title in each chunk, retain units and footnotes, and consider structured SQL/tool access for calculations or exact lookups.

---

# 5. How do dense retrieval, sparse retrieval, BM25, hybrid search, and exact versus approximate nearest-neighbor search work?

## 5.1 Dense retrieval

Dense retrieval uses **dense embeddings**: vectors where most dimensions have numeric values. An embedding model transforms a query and each passage into vectors in the same vector space.

The search system finds passages whose vectors are close to the query vector according to a selected distance or similarity metric.

Example:

- User asks: “How can I make my phone last longer before charging?”
- A source says: “To extend battery life, reduce screen brightness and disable unused background services.”

Even though the wording differs, a good embedding model may place these texts near each other because their meanings are related.

**Strength:** semantic matching and paraphrases.  
**Weakness:** may miss exact IDs, rare names, codes, error strings, and unusual acronyms—especially if they were not represented well in the embedding.

## 5.2 Sparse retrieval

Sparse retrieval represents a query or document using a large vocabulary where only a relatively small number of terms have non-zero weights. Traditional inverted indexes map each term to the documents that contain it.

Example query: `ERR_CAN_1047`.

An exact keyword-oriented system can directly find documents containing this error ID. Dense semantic retrieval may not treat a rare identifier as important enough unless the embedding model is especially good at it.

Sparse methods include classical TF-IDF and BM25, plus learned sparse methods such as SPLADE. “Sparse” refers to the representation, not to low importance.

## 5.3 BM25 in plain language

**BM25** is a widely used keyword-ranking function. It estimates relevance by considering:

- **Term frequency:** how often query terms appear in the document; repeating a term helps, but with diminishing returns.
- **Inverse document frequency:** a rare term across the collection tends to be more informative than a very common term.
- **Document length normalization:** a long document should not win simply because it contains more words.

A simplified intuition is:

> A document scores well when it contains the query's important terms, especially rare ones, without being rewarded endlessly for repetition or merely for being long.

BM25 is not a semantic understanding system. Tokenization, stemming, language, punctuation, and query operators affect its behavior. It is particularly useful for exact names, product numbers, error codes, acronyms, and terms that appear verbatim in source documents.

## 5.4 Dense versus sparse retrieval

| Situation | Dense often helps | Sparse/BM25 often helps |
|---|---|---|
| Paraphrased question | “How do I get my money back?” matching “refund procedure” | May work if the words overlap |
| Exact error code | Can help if context is known | Usually strong when code is indexed exactly |
| Product name or serial number | Sometimes inconsistent | Often strong |
| Broad conceptual question | Often strong | Depends on wording overlap |
| Typo or synonym | May help, depending on embedding model | May fail without fuzzy matching or spelling correction |
| Legal / technical wording | Useful for related concepts | Essential when exact terms have defined meaning |

## 5.5 Hybrid search

Hybrid search combines the output of dense retrieval and sparse retrieval. The idea is to capture semantic relevance and exact term relevance in the same search flow.

```text
                         User question
                              |
                   +----------+----------+
                   |                     |
                   v                     v
             Dense retrieval        Sparse / BM25
             semantic match         keyword match
                   |                     |
                   +----------+----------+
                              |
                    Fusion / combination
                              |
                    Optional reranking
                              |
                      Final top results
```

There are several ways to combine results:

- **Score fusion:** combine scores after normalization or weighting. This can work well, but scores from different systems may use different scales.
- **Rank fusion:** combine based on each result's rank rather than trusting raw score scales. RRF is a common method; see Section 10.
- **Reranking:** send a candidate set to a stronger model that scores query-document pairs.

Hybrid search is useful for many enterprise RAG systems because users mix natural-language questions with precise identifiers and domain vocabulary. It adds retrieval complexity and cost, so measure whether it improves your evaluation set.

## 5.6 Exact nearest-neighbor search

Given a query vector, **exact nearest-neighbor search** compares it with every eligible stored vector and returns the true closest results under the chosen metric.

Analogy: checking every book on every shelf before deciding which ones are closest to your topic.

- **Advantage:** exact result under the selected metric; useful for ground-truth evaluation and smaller datasets.
- **Disadvantage:** work grows with the number of vectors and their dimensions, so it can become slow at large scale.

## 5.7 Approximate nearest-neighbor (ANN) search

ANN indexes use a data structure to avoid examining every vector. Examples include HNSW graphs and IVF clusters. The search is faster but may miss some of the mathematically closest vectors.

Analogy: ask a librarian to take you to likely shelves rather than inspect every book in the building. Much faster, but a relevant book may sit in a shelf the librarian does not visit.

Key measures:

- **Recall@k:** how many of the exact top-k results appear in the approximate top-k results.
- **Latency:** how long the query takes.
- **Throughput:** how many queries the system can serve per second under a load.
- **Memory/storage:** resources used by vectors and indexes.

For a given question, compare ANN results with exact search on a manageable evaluation sample. “Approximate” does not necessarily mean low quality; it means the algorithm has a speed-accuracy trade-off that needs measurement.

## Interview follow-ups

**Q: Why is hybrid retrieval frequently used in enterprise RAG?**  
**A:** Enterprise questions include both conceptual language and exact identifiers. Dense retrieval handles paraphrases; sparse retrieval handles precise terms. Fusing both can improve coverage.

**Q: Is BM25 a language model?**  
**A:** No. BM25 is a ranking function built around term statistics. It does not generate answers or understand meaning in the same way an embedding model attempts to represent semantic relationships.

**Q: How do you measure ANN quality?**  
**A:** Compare approximate results against exact nearest-neighbor results and calculate recall at the required k, then evaluate latency, resource use, and downstream answer quality.

---

# 6. How do cosine similarity, dot product, and Euclidean distance affect vector retrieval, and why are similarity scores not automatically probabilities?

## 6.1 Vectors in simple language

A vector is an ordered list of numbers. If an embedding model turns text into a 768-dimensional vector, that text is represented by 768 numeric coordinates. You do not normally interpret each coordinate individually; you compare vectors using a metric.

The metric must be compatible with how the embedding model was trained. A search system that uses the wrong distance function can rank results poorly even when the embeddings themselves are good.

## 6.2 Cosine similarity

Cosine similarity measures the angle between two vectors. It mainly cares about direction rather than vector magnitude.

\[
\operatorname{cosine}(A,B)=\frac{A\cdot B}{\|A\|\|B\|}
\]

For non-zero vectors, the mathematical range is from -1 to 1:

- Near 1: similar direction.
- Near 0: approximately orthogonal directions.
- Near -1: opposite directions.

In many text-embedding systems, cosine similarity is useful because the direction of the embedding is more meaningful than its length. However, actual distributions depend on the model; many text embeddings do not produce scores spread uniformly across this entire range.

## 6.3 Dot product (inner product)

The dot product is:

\[
A\cdot B=\sum_{i=1}^{n} A_iB_i
\]

It depends on both direction and magnitude. If vectors are normalized to unit length, dot product equals cosine similarity. If they are not normalized, vector magnitude can affect the ranking.

Some embedding models are trained for dot-product similarity, and some retrieval systems use inner product for efficiency. Follow the embedding model's recommendation rather than choosing a metric by habit.

## 6.4 Euclidean distance (L2 distance)

Euclidean distance measures the straight-line distance between vectors:

\[
 d(A,B)=\sqrt{\sum_{i=1}^{n}(A_i-B_i)^2}
\]

Smaller distance means closer vectors. Unlike similarity scores that are larger-is-better, this distance is usually lower-is-better.

For unit-normalized vectors, cosine similarity and Euclidean distance produce equivalent rankings because:

\[
\|A-B\|^2=2-2(A\cdot B)
\]

when \(\|A\|=\|B\|=1\). That equivalence no longer generally holds when vector magnitudes vary.

## 6.5 Tiny numerical example

Let the query vector be `A = [1, 0]`.

- `B = [0.9, 0.1]` points almost in the same direction.
- `C = [10, 0]` points in exactly the same direction but has a much larger magnitude.
- `D = [0, 1]` points at a right angle from A.

Expected behavior:

| Pair | Cosine similarity | Dot product | Euclidean distance |
|---|---:|---:|---:|
| A and B | About 0.994 | 0.9 | About 0.141 |
| A and C | 1.0 | 10.0 | 9.0 |
| A and D | 0.0 | 0.0 | About 1.414 |

Cosine considers A and C perfectly aligned, while dot product gives the larger vector C a larger score. Euclidean distance says B is closer to A than C is because their coordinates are numerically closer.

## 6.6 Quick Python example

```python
import math


def dot(a, b):
    return sum(x * y for x, y in zip(a, b))


def euclidean(a, b):
    return math.sqrt(sum((x - y) ** 2 for x, y in zip(a, b)))


def cosine(a, b):
    magnitude_a = math.sqrt(sum(x * x for x in a))
    magnitude_b = math.sqrt(sum(y * y for y in b))
    if magnitude_a == 0 or magnitude_b == 0:
        raise ValueError("Cosine similarity is undefined for a zero vector")
    return dot(a, b) / (magnitude_a * magnitude_b)


query = [1.0, 0.0]
candidates = {
    "B": [0.9, 0.1],
    "C": [10.0, 0.0],
    "D": [0.0, 1.0],
}

for name, vector in candidates.items():
    print(
        name,
        "cosine=", round(cosine(query, vector), 3),
        "dot=", round(dot(query, vector), 3),
        "L2=", round(euclidean(query, vector), 3),
    )
```

**Expected output, approximately:**

```text
B cosine= 0.994 dot= 0.9 L2= 0.141
C cosine= 1.0 dot= 10.0 L2= 9.0
D cosine= 0.0 dot= 0.0 L2= 1.414
```

The code explicitly rejects zero vectors for cosine, since the denominator would be zero.

## 6.7 Why a similarity score is not a probability

A cosine score of `0.82` does **not** automatically mean “82% chance this document is correct.” A similarity score is a geometric measurement in an embedding space, not a calibrated probability of relevance or truth.

Why not?

- Different embedding models produce different score distributions.
- Similarity depends on the corpus and the query.
- A high-scoring passage may still not answer the question.
- A score does not assess whether the source is current, authoritative, or permitted for the user.
- The relationship between score and actual relevance is not usually calibrated out of the box.

If you need a confidence estimate, calibrate it against labeled evaluation data or use a separate relevance model. Even then, “relevance confidence” is not the same as “the generated answer is factually true.”

## Common mistakes

- Assuming that every database ranks higher scores as more relevant; distance metrics often use lower-is-better.
- Mixing embeddings from different models or dimensions in one index without a deliberate design.
- Changing the metric without reevaluating ranking quality.
- Treating similarity thresholds as universal across models or datasets.
- Comparing raw BM25, cosine, and reranker scores as if they had the same meaning.

## Interview follow-ups

**Q: When are cosine similarity and dot product equivalent?**  
**A:** When both vectors are normalized to unit length, their dot product equals cosine similarity.

**Q: Is cosine similarity of 0.9 a 90% confidence score?**  
**A:** No. It is a geometric similarity score. Its relationship to relevance or correctness must be validated and calibrated separately.

**Q: Which metric should I use?**  
**A:** Follow the embedding model's guidance, verify the vector database's metric semantics, and compare retrieval metrics on representative questions.

---

# 7. How do HNSW, IVF, product quantization, and IVF-PQ trade retrieval accuracy for memory use and query speed?

## 7.1 Why indexes are needed

Comparing a query against every vector is exact, but becomes costly as data grows. An index organizes vectors so the system can examine a promising subset. Index design trades among query latency, recall, build time, memory, storage, and update cost.

## 7.2 HNSW (Hierarchical Navigable Small World)

HNSW builds a graph of connected vectors, with multiple layers. Upper layers contain fewer nodes and help the search jump across the dataset; lower layers are denser and refine the search.

A simplified picture:

```text
Top layer:       A -------- M
                 |          |
Middle layer:    A --- F --- M -------- T
                  \   |     |          /
Bottom layer:    A--B--C--D--E--F--G--H--M--N--T
```

During a query, search begins at a high-level entry point, moves toward closer nodes, descends through the layers, and explores nearby graph connections. The graph lets the algorithm avoid a brute-force scan.

**Common trade-off:** usually strong query speed and recall, but the graph adds memory overhead and can cost more to build. Insertion and deletion characteristics depend on the implementation. Common parameters include:

- `M`: controls the approximate number of connections per node; higher values often use more memory and can improve recall.
- `efConstruction`: search effort while building the graph; higher values can improve graph quality but increase build cost.
- `efSearch` (or a similarly named query parameter): how much work to do at query time; higher values usually improve recall but increase latency.

Exact names and defaults differ by library/database.

## 7.3 IVF (Inverted File Index)

IVF clusters vectors into groups, often using k-means. Each group has a centroid. At query time, the system finds the centroids closest to the query and searches only selected clusters.

```text
All vectors
    |
    +-- Cluster 1 (centroid A): v1, v2, v3, ...
    +-- Cluster 2 (centroid B): v4, v5, v6, ...
    +-- Cluster 3 (centroid C): v7, v8, v9, ...

Query -> choose closest centroids -> search selected clusters only
```

Important terms:

- `nlist`: number of clusters/lists created during indexing.
- `nprobe`: number of clusters examined for a query.

More probes generally improve recall because more candidates are examined, but increase latency. Too few clusters can make each list large; too many can produce tiny lists and make training or probing less effective. IVF usually needs representative data to train its centroids, which affects initial build and refresh workflow.

## 7.4 Product quantization (PQ)

Product quantization compresses vectors. It divides a high-dimensional vector into smaller sub-vectors, then represents each sub-vector by the ID of a learned centroid in a codebook.

Analogy: instead of storing every detail of a full-resolution picture, store compact references to a set of learned patterns. This saves space but introduces approximation error.

A high-level example:

```text
Original vector (many dimensions)
             |
             v
  Split into sub-vectors: [part 1] [part 2] [part 3] [part 4]
             |
             v
  Replace each part with its nearest codebook-centroid ID
             |
             v
  Compact code representing the vector approximately
```

PQ can reduce memory use substantially, but distances computed from compressed representations are approximate. Some systems keep original or higher-precision vectors for reranking the best candidates.

## 7.5 IVF-PQ

IVF-PQ combines both ideas:

1. IVF narrows the search to a limited set of clusters.
2. PQ stores compact codes for vectors in those clusters and supports approximate distance calculations.
3. The system returns candidates, optionally reranks them using full-precision vectors, and chooses the final top-k.

The combined approach can be useful for very large collections where memory matters. It adds complexity and can reduce recall if too few clusters are searched or compression is too aggressive.

## 7.6 Compare the approaches

| Approach | Main idea | Memory | Search speed | Recall / accuracy | Build and operations |
|---|---|---|---|---|---|
| Exact / flat scan | Compare all eligible vectors | Stores vectors; little ANN-index overhead | Can be slow at large scale | Exact under the chosen metric | Simple; valuable as evaluation ground truth |
| HNSW | Multi-layer proximity graph | Typically higher index overhead | Often very fast | Often strong, but approximate | Can be expensive to build; tuning matters |
| IVF-Flat | Cluster vectors and search chosen lists, using full vectors | Moderate | Depends heavily on clusters/probes | Can be high with enough probes | Requires training/cluster configuration |
| PQ alone | Compress vector representation | Low | Compact distance calculations can be fast | Approximation error from compression | Requires training codebooks |
| IVF-PQ | IVF candidate selection plus PQ compression | Often much lower | Fast for large collections when tuned | May lose recall; reranking can help | More tuning and rebuild considerations |

This is a qualitative comparison. Exact performance depends on dataset size, dimensionality, hardware, implementation, filtering, and parameter choices.

## 7.7 How to choose and tune

- Start with exact search on a representative sample to establish a quality baseline.
- Try the default ANN index and measure recall@k, latency percentiles, memory, and throughput.
- Increase HNSW query effort or IVF probes if recall is too low and latency allows it.
- Consider compression when memory or storage is a major constraint.
- Use reranking to recover quality after broad candidate retrieval, where feasible.
- Benchmark filtered queries separately; filters may significantly change recall and latency.
- Test inserts, updates, deletes, and index rebuilds—not only a static search demo.

## Interview follow-ups

**Q: Why does HNSW use several layers?**  
**A:** Sparse upper layers help the algorithm travel quickly across the search space; denser lower layers refine the search locally.

**Q: What happens when IVF uses more probes?**  
**A:** It examines more clusters, which usually improves recall but increases query work and latency.

**Q: Why use PQ if it can reduce accuracy?**  
**A:** At large scale, vector memory can become very expensive. Compression lowers the memory footprint; reranking or a less aggressive configuration can recover some accuracy.

---

# 8. How do pgvector, Qdrant, Pinecone, Milvus, and Weaviate differ in architecture, filtering, multitenancy, and operational trade-offs?

> **Important:** These products evolve. The comparison below is an architectural decision guide, not a claim that one product always wins. Verify features, pricing, limits, and deployment options for the version and plan you intend to use.

## 8.1 At-a-glance comparison

| Option | What it is | Architecture / operations | Filtering and search | Multitenancy considerations | Good fit when... |
|---|---|---|---|---|---|
| **pgvector** | PostgreSQL extension for vector data and similarity search | Keeps vectors beside relational tables; reuse PostgreSQL transactions, SQL, backup, and operational tooling | SQL `WHERE` filters, joins, indexes, and vector distance operators; supports exact search plus approximate HNSW and IVFFlat indexes | Can use row-level security, tenant columns, schemas, tables, or partitioning; secure SQL policies still need careful design | You already run Postgres, need joins/transactions, and dataset scale/performance fit a relational deployment |
| **Qdrant** | Purpose-built vector search engine with vectors and structured payloads | Commonly self-hosted or managed cloud; records are points with vectors plus payload | Vector search, payload filters/indexes, dense/sparse and hybrid query options; filtering strategy and payload indexes matter | Payload-based isolation may suit many tenants; dedicated shard keys can improve isolation for a modest number of large tenants at extra resource cost | You need a vector-first system with rich filtering and an open-source/self-managed option |
| **Pinecone** | Managed vector database service | Provider-managed infrastructure; minimizes cluster operations, subject to the current offering/plan | Vector search with metadata filters and dense/sparse or hybrid patterns depending on index/API setup | Namespaces are a common logical partitioning mechanism; namespace selection and authorization must be enforced by the application | You prefer a managed service and want to reduce infrastructure operations |
| **Milvus** | Open-source vector database designed for scale, with standalone and distributed deployments | Standalone can simplify smaller deployment; distributed architecture separates services/workers for scale and high load, adding operational complexity | Multiple index families, scalar metadata filtering, partitions and partition keys; performance depends on index, schema, and deployment configuration | Can isolate by database, collection, partition, or partition key depending on design; avoid unbounded manual partition creation | Large-scale vector retrieval, flexible index choices, and control over distributed deployment matter |
| **Weaviate** | Vector database with integrated vector search, keyword search, and object properties | Available as a managed offering or self-hosted deployment; stores objects and associated vectors | Vector, BM25, hybrid fusion, metadata filters, and configurable vector indexes | Supports tenant-aware designs; documentation describes vector indexing at collection/tenant scope, so many small tenants and index overhead should be designed carefully | You want integrated semantic + keyword search and object-centric retrieval patterns |

## 8.2 pgvector: vectors inside PostgreSQL

### How to think about it

If the application already has customers, orders, documents, access rules, and audit data in PostgreSQL, pgvector lets vector search sit next to those tables. It can reduce the need to operate a separate vector database and makes normal SQL joins convenient.

Example table:

```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE document_chunks (
    chunk_id       text PRIMARY KEY,
    tenant_id      text NOT NULL,
    document_title text NOT NULL,
    chunk_text     text NOT NULL,
    embedding      vector(3) NOT NULL
);
```

`vector(3)` is used only to keep the example small; replace it with the actual embedding dimension.

Example nearest-neighbor query using cosine distance:

```sql
SELECT chunk_id, document_title, chunk_text,
       embedding <=> '[0.12, -0.08, 0.44]' AS cosine_distance
FROM document_chunks
WHERE tenant_id = 'tenant-123'
ORDER BY embedding <=> '[0.12, -0.08, 0.44]'
LIMIT 5;
```

With pgvector, `<=>` is cosine distance (lower is better); `<->` is L2 distance; `<#>` is negative inner product, which allows ascending order to retrieve the largest inner product first. Confirm operators for the installed version.

### Operational trade-offs

- **Strengths:** SQL joins, transactional consistency with relational data, existing backups and access controls, one less system to run.
- **Risks:** vector search shares CPU, memory, and I/O with normal database work; large-scale ANN tuning and filtered recall need testing. Approximate index filtering may not always return enough eligible results unless configured appropriately.
- **Indexes:** HNSW is a common choice when query performance is important; IVFFlat can use less memory/build faster in some workloads but requires cluster/probe tuning.

## 8.3 Qdrant

Qdrant models its stored records as **points**, each with an ID, one or more vectors, and an optional **payload** for metadata. Payload indexes can speed up filtering. Qdrant supports dense, sparse, and multivector configurations and has query fusion options such as RRF for hybrid retrieval.

Important operational lesson: index the fields you filter on frequently and test filtered search. Filter selectivity can change the best search strategy, and unindexed payload fields may make filtering slower. Qdrant also offers custom/user-defined sharding for stronger per-tenant routing/isolation, with extra resource overhead.

## 8.4 Pinecone

Pinecone is commonly selected when the team prefers a managed vector database instead of operating database servers and clusters directly. Its API concepts include indexes, vectors, metadata filters, and namespaces.

A namespace can partition records logically, for example by customer or environment. This can simplify querying a chosen subset, but a namespace is not a substitute for authorization. The backend must derive the namespace and filter scope from authenticated application identity rather than trusting arbitrary values supplied by a client.

Compare current pricing, regional availability, index types, scaling limits, and supported hybrid features for the chosen Pinecone product/plan before committing; managed-service capabilities and billing can change.

## 8.5 Milvus

Milvus supports multiple vector index families, including graph-based and IVF/quantization-based options. Its standalone deployment consolidates components for easier operation, while a distributed deployment separates components and is intended for high-load, scalable deployments.

Its partitioning and partition-key capabilities can narrow the search scope for multitenant data. However, partition design, number of tenants, index loading, data lifecycle, and operational complexity need deliberate planning. Do not create a separate partition for every small entity without understanding platform limits and overhead.

## 8.6 Weaviate

Weaviate combines vector search with object properties and supports keyword/BM25 and hybrid queries. Its hybrid search can fuse keyword and vector results; available fusion options and controls depend on version. It supports vector index options such as HNSW and flat, as well as additional variants described in its docs.

That integrated search can be convenient when one API should handle semantic retrieval, keyword retrieval, filtering, and fusion. Still, evaluate indexing resources, filtering behavior, multi-tenancy design, and the shape of your data.

## 8.7 Which one should you choose?

Use a decision process rather than memorizing a universal ranking:

1. **Already using PostgreSQL with a moderate corpus?** Try pgvector first, especially if relational joins and transactional consistency matter.
2. **Need vector-first filtering and self-hosting flexibility?** Evaluate Qdrant.
3. **Want minimal infrastructure management?** Evaluate Pinecone or another managed service against cost, region, features, and data governance needs.
4. **Need extensive index choices and distributed scale control?** Evaluate Milvus, including the operational burden of distributed deployment.
5. **Want integrated vector + BM25 hybrid queries in an object-centric system?** Evaluate Weaviate.
6. **For every option:** benchmark the same embedding model, corpus, filters, top-k, workload, recall target, and latency target.

## Interview follow-ups

**Q: Is a dedicated vector database always faster than pgvector?**  
**A:** No universal answer. Performance depends on scale, index, filtering, hardware, concurrency, and query pattern. pgvector can be an excellent choice when the data already belongs in PostgreSQL; a dedicated system may offer more specialized scaling or features for some workloads.

**Q: What is the difference between a namespace and a metadata filter?**  
**A:** A namespace typically separates a logical subset of a dataset. A metadata filter selects records based on fields such as tenant, region, status, or date. Their behavior and security guarantees depend on the product.

**Q: How should I compare databases fairly?**  
**A:** Use the same dataset, embeddings, filters, query set, top-k, concurrency, and evaluation metric. Measure recall, p50/p95/p99 latency, throughput, memory, ingestion speed, update/delete behavior, and total operating cost.

---

# 9. How do metadata filters, namespaces, index lifecycle, access-control filters, and tenant isolation affect retrieval?

## 9.1 Metadata filters

Metadata filters constrain the eligible results using structured conditions. For example:

- `document_type = "policy"`
- `region = "IN"`
- `effective_date <= today`
- `status = "active"`
- `tenant_id = authenticated_tenant`

A question about the current Indian leave policy should not retrieve an old US policy simply because its vector is semantically similar. Filters express hard constraints that semantic similarity alone cannot guarantee.

## 9.2 Filtering before, during, or after search

Different systems can apply filtering in different ways:

- **Pre-filter:** identify eligible records first, then search within them. Can be effective for highly selective filters, but the implementation may have to intersect candidate sets efficiently.
- **Filter-aware traversal:** search an ANN structure while accounting for filter conditions. More complex; index design can help or hurt performance.
- **Post-filter:** get vector candidates first and remove records that fail the filter. This can return too few results if most initial candidates are excluded.

Example: the nearest 20 chunks globally contain only two records from the requested tenant. If filtering is applied only after those 20 are selected, the application may return only two results even though many eligible tenant records exist deeper in the index.

This is both a quality and latency concern. Tune and test the actual database's filtering behavior rather than assuming every filter is applied the same way.

## 9.3 Metadata indexes

A metadata field can be logically filterable without being efficiently indexed. Indexes for tenant IDs, dates, categories, product names, and access labels can reduce the cost of filtering.

But indexing every field is not always ideal: each index consumes resources and adds write/update work. Index the fields used by important query patterns, select appropriate types, and monitor their performance.

## 9.4 Namespaces, collections, partitions, and shards

These terms are related but not interchangeable:

| Concept | General meaning | Typical purpose |
|---|---|---|
| Namespace | A named logical subset inside an index (product-specific) | Environment/customer separation or search scoping |
| Collection | A named group of records/vectors (product-specific) | Organize data and define vector/index configuration |
| Partition | A subset of a collection or table | Narrow search scope or organize data lifecycle |
| Shard | A data partition used for distribution and scaling | Spread data and workload across resources |
| Metadata filter | A query condition over fields | Restrict eligible records at retrieval time |

A dedicated collection or shard per tenant can give stronger isolation but increases operational overhead. A shared collection with a tenant field may be efficient for many small tenants but depends on correct filters and access controls. There is no one best design for all tenant sizes or compliance levels.

## 9.5 Access-control filtering is a security boundary

A RAG system must not leak a document simply because the embedding ranks it highly. Authorization must be enforced before retrieved text is sent to an LLM or shown to a user.

A safe conceptual flow is:

```text
Authenticated user
       |
       v
Resolve tenant and permissions from trusted identity
       |
       v
Construct mandatory server-side filters
       |
       v
Retrieve only eligible chunks
       |
       v
Verify document-level access if needed
       |
       v
Send approved evidence to the LLM
       |
       v
Return answer and permitted citations
```

**Do not trust the client to choose its own `tenant_id`, namespace, or allowed groups.** Derive those values from authenticated server-side identity and enforce them on every query. If the model itself is allowed to formulate tool queries, it must not be able to override security predicates.

For sensitive systems, add database-level access controls or physically separate storage where appropriate. Consider indirect leakage too: citations, titles, metadata, error messages, logging, caching, and reranker inputs can reveal protected information.

## 9.6 Tenant isolation patterns

### Shared collection + tenant filter

- Efficient for many small tenants.
- Fewer collections/indexes to manage.
- Every query must include correct tenant scoping, and filtered ANN behavior must be tested.
- A missed filter can create a data leak; application-level discipline and defense in depth are essential.

### Namespace/partition per tenant

- Easier to scope queries to a specific subset in products that support it.
- Can reduce cross-tenant search interference.
- May introduce limits or overhead when tenant counts become very large.
- Still enforce authentication and authorization before selecting the namespace/partition.

### Dedicated collection/index/database per tenant

- Stronger logical separation and independent configuration/lifecycle.
- Helpful for large tenants, data-residency requirements, or strict isolation needs.
- More operational work, resource overhead, and migration complexity.

A hybrid pattern is common: many small tenants share a logical resource; large or regulated tenants receive dedicated resources.

## 9.7 Index lifecycle and stale data

Indexes need a lifecycle, not just a one-time creation step. Consider:

- **Ingestion:** validate records, generate chunks/vectors, and write them in batches.
- **Index readiness:** do not expose a new version as active before the required index is queryable.
- **Updates:** replace all chunks for the changed source or use version-aware activation.
- **Deletes:** remove all chunks and vectors for the source, including cached or replicated copies where required.
- **Re-embedding:** when the embedding model changes, re-embed the corpus consistently; vectors from different embedding spaces should not be casually mixed.
- **Index rebuild:** estimate downtime/latency and resource requirements; use staged or blue-green rebuilds where necessary.
- **Monitoring:** track ingestion failures, old versions, duplicate chunks, filter selectivity, search recall, and index health.

## 9.8 Caching and isolation

If you cache retrieval results or final answers, include the security scope in the cache key. Otherwise, a response retrieved for one tenant or user might be served to another.

An answer cache key may need: normalized query, tenant ID, user/permission scope, relevant filter values, index/document version, and model/prompt version. Be careful about privacy and retention of cache entries.

## Interview follow-ups

**Q: Why can post-filtering cause poor retrieval?**  
**A:** The ANN search may return a global top-k that contains few records matching the filter. Removing ineligible results leaves too few candidates, even if eligible matches exist deeper in the index.

**Q: Is a namespace a security mechanism by itself?**  
**A:** Not necessarily. It is a data-organization feature. The server must authenticate the caller, select an authorized namespace, enforce mandatory filters, and protect related caches and citations.

**Q: What should happen when a source document is deleted?**  
**A:** Delete or deactivate all associated chunks and vectors, make sure stale versions are no longer retrievable, and account for caches, backups, and retention requirements.

---

# 10. What is Reciprocal Rank Fusion (RRF), and how would you combine keyword and vector retrieval results?

## 10.1 The problem RRF solves

Suppose dense retrieval returns a ranked list based on vector similarity and BM25 returns a ranked list based on keyword relevance. Their raw scores do not necessarily mean the same thing:

- A BM25 score might be `12.4`.
- A cosine similarity might be `0.81`.

Adding these raw scores directly is usually unjustified because the scales and distributions differ. **Reciprocal Rank Fusion (RRF)** combines result lists using their ranks rather than comparing their raw scores.

## 10.2 RRF formula

A commonly used form is:

\[
\operatorname{RRF}(d)=\sum_{r \in R}\frac{1}{k+\operatorname{rank}_r(d)}
\]

Where:

- \(d\) is a document/chunk.
- \(R\) is the set of ranked result lists (for example, dense and BM25).
- \(\operatorname{rank}_r(d)\) is the position of document \(d\) in list \(r\), starting at 1.
- \(k\) is a positive constant that reduces the difference between high and lower ranks. A commonly used value is 60, although implementations and use cases differ.
- If a document does not appear in a list, that list contributes zero to its score.

Some implementations use zero-based ranks or a different default for the constant. Always check the implementation's convention; the core principle is the same.

## 10.3 Worked example

Imagine these two lists:

**Dense/vector results**

1. Chunk A — a relevant paraphrase
2. Chunk B — useful background
3. Chunk C — a policy passage

**BM25/keyword results**

1. Chunk C — contains the exact policy term
2. Chunk A — contains related wording
3. Chunk D — mentions the exact phrase but less context

Using `k = 60` and one-based ranks:

| Chunk | Dense rank | BM25 rank | RRF score calculation | Approx. score |
|---|---:|---:|---|---:|
| A | 1 | 2 | `1/61 + 1/62` | 0.03252 |
| C | 3 | 1 | `1/63 + 1/61` | 0.03227 |
| B | 2 | — | `1/62` | 0.01613 |
| D | — | 3 | `1/63` | 0.01587 |

Chunks A and C score highly because both retrieval methods rank them near the top. RRF does not require the dense and keyword scores to share a numerical scale.

## 10.4 Working Python implementation

The implementation accepts multiple ranked lists, assigns a score to each item based on its rank, then returns the highest-scoring items. Use stable chunk IDs rather than text strings as result identifiers in production.

```python
from collections import defaultdict
from typing import Hashable, Iterable, List, Tuple


def reciprocal_rank_fusion(
    ranked_lists: Iterable[Iterable[Hashable]],
    k: int = 60,
) -> List[Tuple[Hashable, float]]:
    """Fuse ranked result lists using Reciprocal Rank Fusion.

    Each input list must be ordered best result first.
    Ranks are one-based: first result has rank 1.
    Items missing from a list contribute zero for that list.
    """
    if k <= 0:
        raise ValueError("k must be greater than zero")

    scores = defaultdict(float)

    for ranked_list in ranked_lists:
        # enumerate(..., start=1) makes ranks one-based.
        for rank, item_id in enumerate(ranked_list, start=1):
            scores[item_id] += 1.0 / (k + rank)

    # Sort by fused score, descending. repr(item) provides a stable
    # tie-breaker for simple mixed identifier types.
    return sorted(scores.items(), key=lambda pair: (-pair[1], repr(pair[0])))


vector_results = ["A", "B", "C"]
bm25_results = ["C", "A", "D"]

for item_id, score in reciprocal_rank_fusion([vector_results, bm25_results], k=60):
    print(f"{item_id}: {score:.5f}")
```

**Expected output, approximately:**

```text
A: 0.03252
C: 0.03227
B: 0.01613
D: 0.01587
```

**Line-by-line logic:**

1. `defaultdict(float)` starts each document's fused score at zero.
2. The outer loop processes each retrieval method's ranked list.
3. `enumerate(..., start=1)` gives the first result rank 1.
4. `1 / (k + rank)` adds a larger contribution to better-ranked items.
5. Items found in several lists receive contributions from each of those lists.
6. The final sort returns descending fused score.

For production use, deduplicate IDs within each individual ranked list if the retrieval engine could emit the same ID multiple times; otherwise a duplicate could contribute more than once from a single source. Also consider result-list depth: items beyond the candidate cutoff contribute nothing because they are not returned by the retriever.

## 10.5 How to combine dense and BM25 retrieval in production

A common high-level pattern is:

1. Normalize the user question only when appropriate; preserve exact identifiers and quoted phrases.
2. Execute dense retrieval and BM25 in parallel.
3. Retrieve a candidate pool from each method, often deeper than the final answer needs.
4. Fuse the ranked lists using RRF.
5. Optionally deduplicate or group chunks from the same document.
6. Rerank the fused candidate set using a cross-encoder or domain-specific reranker.
7. Select a diverse set of passages within the prompt budget.
8. Generate the response with citations and a clear abstention behavior.

The candidate count and rank-fusion constant should be tuned by evaluation. Increasing each retriever's result depth can improve the chance of finding evidence but also raises latency and creates more candidates for reranking.

## 10.6 RRF versus weighted score fusion

| Method | How it combines results | Strength | Weakness |
|---|---|---|---|
| RRF | Combines ranks | Avoids the need to calibrate raw score scales; simple and robust | Discards the magnitude of the original scores |
| Weighted score fusion | Normalizes/weights dense and sparse scores | Can express a preference for one retriever and use score strength | Sensitive to normalization and score distribution; must be tuned |
| Reranker | Scores each query-candidate pair with a relevance model | Often improves ordering using token-level interactions | Extra model cost/latency; limited to retrieved candidates |

RRF is a reliable baseline, not a guarantee of the best ranking for every workload. A learned or calibrated fusion method may work better if you have sufficient labeled relevance data.

## Interview follow-ups

**Q: Why not add cosine similarity and BM25 score directly?**  
**A:** Their score scales have different meanings and distributions. Direct addition may let one retriever dominate for numerical reasons. RRF combines ranks instead.

**Q: What happens when the same chunk appears in both result lists?**  
**A:** It receives a contribution from each list, often moving it higher in the final ranking.

**Q: Does RRF understand document meaning?**  
**A:** No. It combines rankings that other retrieval methods produced. The dense model, BM25, and any reranker provide the relevance signals; RRF fuses their positions.

---

# Production checklist: what an interviewer expects you to connect

A production RAG system is not “just embeddings plus a vector database.” It is a retrieval and evidence-management pipeline. Be ready to discuss all of the following:

## Data and ingestion

- Do we have reliable text extraction for PDF, HTML, tables, OCR, and code?
- Are chunk boundaries aligned to source structure?
- Are document IDs, versions, page references, and permissions preserved?
- Are updates and deletes idempotent, observable, and recoverable?
- Is the embedding model/version recorded so the corpus can be re-embedded consistently?

## Retrieval quality

- Do we have a labeled test set of questions and relevant source chunks?
- Do we measure Recall@k, Precision@k, MRR or nDCG where appropriate?
- Do we test exact names, acronyms, rare IDs, paraphrases, multi-hop questions, and “no answer” cases?
- Have we compared dense, sparse, hybrid, and reranked retrieval?
- Are ANN recall and filter behavior tested against exact search where feasible?

## Generation and grounding

- Does the prompt clearly identify the retrieved material as evidence, not trusted instructions?
- Can the answer point to source pages or sections?
- Does the model distinguish missing evidence from a negative answer?
- Do we evaluate whether citations support the claims—not merely whether citations exist?
- Are prompt injection and malicious text inside retrieved documents considered?

## Security and operations

- Are tenant and permission filters mandatory and constructed server-side?
- Are caches scoped by user/tenant permissions?
- Are index freshness, latency, failures, cost, and token usage monitored?
- Can we delete or supersede documents throughout the retrieval lifecycle?
- Have we tested load, concurrent writes, backups, restore, and index rebuilds?

## A compact end-to-end interview answer

> “I would ingest and normalize the sources, split them using document-aware chunking, and preserve source IDs, versions, headings, page references, and permissions. I would generate embeddings and build dense retrieval, while adding BM25 for exact terms and identifiers. At query time I would apply server-side authorization filters, run dense and keyword retrieval, fuse candidates with RRF, and optionally rerank them. The prompt would contain only the best permitted evidence within a token budget, ask the model to cite sources and abstain when evidence is insufficient, and be evaluated using retrieval metrics, answer-grounding checks, latency, cost, and security tests. I would select the vector store and ANN index based on measured scale, filtering patterns, operational constraints, and quality targets—not on feature lists alone.”

---

# Suggested hands-on practice

1. Build a small corpus of 20–50 documents and attach a stable document ID, heading path, source URL, page/section, and version to each chunk.
2. Compare fixed-size chunks with sentence/heading-aware chunks. Create 20 realistic questions and record which chunks should answer them.
3. Compare dense search, BM25, and hybrid RRF on the same questions.
4. Add a tenant filter and test that queries never return another tenant's content—even when its text is a closer semantic match.
5. Compare exact search with HNSW or IVF on a larger dataset. Record recall@k, p95 latency, memory, and ingestion/update cost.
6. Add citations and check that each answer claim is supported by the cited text.

---

# References and further reading

These official documentation pages are useful for checking current product details and parameters. Product behavior, API syntax, default values, and pricing can change; consult the version you deploy.

1. **pgvector documentation and README** — indexes, operators, filtering, iterative scans, exact versus approximate search: https://github.com/pgvector/pgvector
2. **Qdrant hybrid queries** — dense/sparse retrieval and result fusion: https://qdrant.tech/documentation/search/hybrid-queries/
3. **Qdrant payload and filtering documentation** — structured filters and payload indexes: https://qdrant.tech/documentation/concepts/payload/ and https://qdrant.tech/documentation/search/filtering/
4. **Qdrant multitenancy** — user-defined sharding and tenant-oriented patterns: https://qdrant.tech/documentation/manage-data/multitenancy/
5. **Pinecone documentation** — consult the current official guides for namespaces, metadata filtering, hybrid search, index types, and service plans: https://docs.pinecone.io/
6. **Milvus index types** — comparison of FLAT, IVF, HNSW, and quantized index options: https://milvus.io/docs/index.md
7. **Milvus architecture** — standalone and distributed components: https://milvus.io/docs/main_components.md and https://milvus.io/docs/architecture_overview.md
8. **Milvus multitenancy / partition key** — tenant isolation and search scoping: https://milvus.io/docs/multi_tenancy.md and https://milvus.io/docs/use-partition-key.md
9. **Weaviate vector indexes** — HNSW, flat, and other index choices: https://docs.weaviate.io/weaviate/concepts/vector-index
10. **Weaviate hybrid search** — combining vector search and BM25: https://docs.weaviate.io/weaviate/search/hybrid
11. **Elasticsearch Reciprocal Rank Fusion** — formula and ranked-result combination: https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion
12. **Lewis et al., “Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks”** — foundational RAG paper: https://arxiv.org/abs/2005.11401
13. **Malkov and Yashunin, “Efficient and robust approximate nearest neighbor search using Hierarchical Navigable Small World graphs”** — foundational HNSW paper: https://arxiv.org/abs/1603.09320

---

**Final takeaway:** The quality of a RAG application depends on the complete chain: source extraction, chunking, metadata, embeddings, retrieval, filtering, ranking, context selection, grounded generation, and evaluation. A sophisticated vector index cannot compensate for broken source structure, unsafe filters, stale documents, or weak evaluation.
