# AI Fine-Tuning Interview Guide — Questions 1–10

Beginner-friendly preparation notes for AI Engineer interviews

> **How to use these notes:** Start with the mental models and decision framework, then work through the concepts, code, pitfalls, and interview questions. The examples use Hugging Face-style Python APIs where practical. Library versions and model-specific APIs change, so verify arguments against the installed versions before running production jobs.

## Contents

1. Choosing prompting, RAG, continued pretraining, SFT, preference optimization, distillation, or a hybrid
2. Designing, cleaning, deduplicating, and validating SFT instruction data
3. Evol-Instruct, UltraFeedback, and synthetic-data risks
4. Teacher–student distillation and reasoning limitations
5. SFT, causal language modeling, loss masking, and sequence packing
6. Training hyperparameters and their effects
7. Train/validation splits, contamination, and evaluation leakage
8. Catastrophic forgetting, memorization, label noise, and capability regression
9. LoRA: parameters, rank, alpha, target modules, and dropout
10. QLoRA and other parameter-efficient fine-tuning (PEFT) methods
11. Integrated worked example and production checklist
12. Scenario-based interview questions
13. Rapid-review glossary

---

# 1. Choosing the right adaptation method

## 1.1 Background: what is a language model?

A language model learns patterns in text and predicts likely next tokens. A **token** is a chunk of text: sometimes a word, part of a word, punctuation, or whitespace. During pretraining, a model sees a very large collection of text and learns general language, facts, styles, and patterns.

A pretrained model is not automatically the best fit for every application. A product may need up-to-date facts, a particular response format, specialized vocabulary, or consistent behavior. Different techniques address different needs.

Imagine a new employee:
- **Prompting** is giving the employee clearer instructions for each task.
- **RAG** is letting the employee consult a current reference library before answering.
- **Continued pretraining** is giving the employee more reading material in a specialized field.
- **SFT** is demonstrating examples of the exact behavior you want.
- **Preference optimization** is showing which of two acceptable-looking answers is better and why.
- **Distillation** is teaching a smaller, cheaper employee to imitate a more capable one.

## 1.2 Comparison table

| Method | Changes model weights? | Main purpose | Best when | Main limitation |
|---|---:|---|---|---|
| Prompting / few-shot examples | No | Guide behavior at inference time | Instructions are enough; fast iteration matters | Context is limited; behavior may be inconsistent |
| Retrieval-augmented generation (RAG) | Usually no | Supply relevant external facts at answer time | Knowledge changes, must be cited, or is private | Retrieval can miss or retrieve wrong passages |
| Continued pretraining (CPT) | Yes | Improve domain language and patterns using raw text | Large, high-quality domain corpus exists | Expensive; may not teach instruction-following |
| Supervised fine-tuning (SFT) | Yes | Teach desired input-to-output behavior | Good demonstrations exist | Can overfit or imitate errors |
| Preference optimization (DPO and related methods) | Yes | Make responses better match preferences | Chosen/rejected comparisons are reliable | Preferences may be noisy or biased |
| Distillation | Usually yes for the student | Transfer useful behavior from a teacher to a smaller model | Cost, latency, or deployment footprint matters | Student cannot reliably exceed teacher/data coverage |
| Hybrid | Often | Combine complementary methods | A single method cannot meet all needs | More components and more failure modes |

## 1.3 A practical decision process

1. **Is the problem mainly about instructions, tone, or output format?** Try a prompt and a few examples first.
2. **Does the answer depend on current, private, or auditable information?** Use RAG or a tool/API. Training facts into weights is not a substitute for a live source of truth.
3. **Does the model struggle with domain language even when the information is supplied?** Consider continued pretraining if you have a substantial clean domain corpus.
4. **Does the model have the right information but repeatedly behave incorrectly?** SFT may teach the desired pattern.
5. **Can you reliably say which response is better, but lack ideal target answers?** Preference optimization may help.
6. **Is the model too costly or slow?** Consider distillation and/or quantization, after defining acceptable quality.
7. **Do you need multiple benefits?** Use a hybrid, but establish which component is responsible for each requirement.

### Example: an internal HR assistant

- Policies change every quarter: RAG over approved, versioned HR documents.
- Answers must cite a policy section: RAG plus citation checks.
- The model writes in an unhelpfully verbose style: prompt first; SFT if prompt-only behavior remains unreliable.
- The model does not understand company-specific abbreviations despite relevant retrieved text: consider domain adaptation, improved retrieval, or targeted SFT.
- Inference cost is too high: test a smaller distilled model with the same evaluation suite.

## 1.4 Important distinctions and trade-offs

**Knowledge vs. behavior:** RAG supplies information; fine-tuning primarily changes learned behavior and representations. Fine-tuning can teach facts, but those facts can be forgotten, become stale, or be recalled unreliably.

**CPT vs. SFT:** CPT commonly continues next-token prediction on raw domain text. SFT trains on curated examples of instructions and ideal answers. CPT can improve fluency with specialized material; SFT is more directly aligned to a task.

**SFT vs. preference optimization:** SFT says “here is a good answer.” Preference learning says “between these answers, this one is preferred.” Preference optimization often follows SFT rather than replacing it.

**Hybrid example:** RAG supplies current documentation; SFT teaches the model to answer in a structured support format; preference optimization improves helpfulness; a smaller student is distilled for deployment.

## 1.5 Common mistakes

- Fine-tuning to memorize frequently changing prices or policies instead of retrieving them.
- Starting expensive training before testing a strong baseline prompt.
- Assuming more training always improves quality.
- Using preference optimization before confirming basic instruction-following.
- Measuring only average benchmark score while ignoring latency, cost, safety, and citation accuracy.

## 1.6 Interview questions and answers

**Q: When would you choose RAG over fine-tuning?**  
A: When answers rely on changing or private facts, need source attribution, or must reflect a particular document version. RAG can update the index without retraining the model. Fine-tuning is more suitable for stable behavioral patterns.

**Q: Can RAG and fine-tuning be combined?**  
A: Yes. RAG supplies evidence; fine-tuning can teach the model how to use that evidence, abstain when it is insufficient, and format citations.

**Q: Why not always use the biggest model?**  
A: Larger models can improve capability but increase cost, latency, and deployment requirements. Evaluate quality against the actual task and operational constraints.

---

# 2. Designing, cleaning, deduplicating, and validating SFT datasets

## 2.1 What is an instruction dataset?

Supervised fine-tuning needs examples of what the model should do. A simple record might contain:
- **Instruction:** “Summarize the report in three bullets.”
- **Optional context/input:** the report text.
- **Target/output:** the ideal three-bullet summary.

The target is not merely “some plausible text.” It is the behavior you want the model to learn. Inconsistent or low-quality targets teach inconsistent behavior.

## 2.2 Build a data specification before collecting examples

Define:
- The task and intended user.
- Input fields and required output schema.
- Desired tone, length, and refusal behavior.
- What counts as correct, incomplete, unsafe, or unsupported.
- Whether answers must cite sources or follow structured formats.
- Which examples are in scope and out of scope.

Create a written labeling guide with positive and negative examples. If multiple annotators are involved, have them label a shared sample and discuss disagreements before scaling up.

## 2.3 Common conversation formats

A simple instruction/output record:

```json
{
  "instruction": "Explain photosynthesis to a beginner.",
  "input": "",
  "output": "Plants use sunlight to turn water and carbon dioxide into sugars..."
}
```

A chat-style record:

```json
{
  "messages": [
    {"role": "system", "content": "Answer clearly and accurately."},
    {"role": "user", "content": "What is photosynthesis?"},
    {"role": "assistant", "content": "Photosynthesis is the process..."}
  ]
}
```

Use the chat template expected by the chosen model. The exact role tokens and separators are model-specific. Do not invent a template or assume that all models share one.

## 2.4 A reliable data pipeline

1. **Collect with provenance:** record source, license/permission, collection date, and any applicable consent or retention restrictions.
2. **Normalize:** standardize encodings and line endings; trim accidental whitespace; normalize fields without destroying meaningful code, tables, or formatting.
3. **Validate schema:** required keys exist, types are correct, and messages have valid roles.
4. **Filter quality:** remove empty, corrupt, irrelevant, malformed, or low-effort examples.
5. **Review safety and privacy:** remove secrets and personal data that should not be used; review harmful or policy-incompatible targets.
6. **Deduplicate:** exact duplicates first, then near-duplicates where appropriate.
7. **Check target quality:** factual correctness, instruction adherence, completeness, tone, and formatting.
8. **Check diversity and coverage:** ensure the dataset represents the intended tasks and edge cases.
9. **Split before fitting preprocessing decisions:** keep related examples together to prevent leakage.
10. **Version and document:** save raw and processed data versions, filters, counts, and known limitations.

## 2.5 Deduplication: why and how

Exact duplicates can make a model overemphasize a small set of examples and can inflate evaluation results if copies land in both train and validation sets. Near-duplicates include paraphrases, copied passages with minor edits, or the same answer attached to slightly different prompts.

Useful levels:
- **Exact row/hash deduplication:** cheap and precise for identical records.
- **Normalized-text deduplication:** catches formatting-only changes.
- **Near-duplicate detection:** n-gram similarity, MinHash/LSH, or embedding similarity.
- **Semantic review:** necessary when similar text can still have meaningfully different labels.

Do not automatically remove every similar example. Repeated patterns may be legitimate, and superficially similar questions may differ in a crucial constraint.

## 2.6 Working Python example: basic dataset validation and exact deduplication

This example uses a JSONL file where each line has `instruction` and `output` fields. It validates records, removes blank entries and exact normalized duplicates, and reports counts. It is intentionally a baseline, not a complete production data-governance system.

```python
import json
import hashlib
from pathlib import Path

INPUT_PATH = Path("sft_raw.jsonl")
OUTPUT_PATH = Path("sft_clean.jsonl")

def normalize(text: str) -> str:
    # Collapse repeated whitespace for duplicate detection.
    # Preserve the original text in the output record.
    return " ".join(text.split()).casefold()

def fingerprint(instruction: str, output: str) -> str:
    # Hash the normalized pair so identical examples share a key.
    payload = normalize(instruction) + "\n<ANSWER>\n" + normalize(output)
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()

seen = set()
kept = 0
dropped_blank = 0
dropped_duplicate = 0
dropped_invalid = 0

with INPUT_PATH.open("r", encoding="utf-8") as source, \
     OUTPUT_PATH.open("w", encoding="utf-8") as target:
    for line_number, line in enumerate(source, start=1):
        try:
            row = json.loads(line)
        except json.JSONDecodeError:
            dropped_invalid += 1
            continue

        if not isinstance(row, dict):
            dropped_invalid += 1
            continue

        instruction = row.get("instruction")
        answer = row.get("output")

        if not isinstance(instruction, str) or not isinstance(answer, str):
            dropped_invalid += 1
            continue

        if not instruction.strip() or not answer.strip():
            dropped_blank += 1
            continue

        key = fingerprint(instruction, answer)
        if key in seen:
            dropped_duplicate += 1
            continue

        seen.add(key)
        target.write(json.dumps(
            {"instruction": instruction.strip(), "output": answer.strip()},
            ensure_ascii=False
        ) + "\n")
        kept += 1

print({
    "kept": kept,
    "blank": dropped_blank,
    "duplicates": dropped_duplicate,
    "invalid": dropped_invalid
})
```

**Line-by-line concepts**
- `json.loads` parses one JSON object per line; JSONL is convenient for large datasets.
- `isinstance` checks that the record and its fields have expected types.
- `normalize` makes duplicate comparison less sensitive to case and whitespace.
- `sha256` creates a compact fingerprint for a normalized instruction/answer pair.
- `seen` prevents writing the same fingerprint more than once.
- `ensure_ascii=False` preserves readable Unicode characters in the output.

**Important limitation:** This detects exact duplicates after simple normalization, not semantic near-duplicates. It also does not verify whether answers are correct, whether the source is permitted, or whether sensitive information is present. Those need separate checks.

Illustrative output for a small file might be:

```text
{'kept': 8200, 'blank': 35, 'duplicates': 410, 'invalid': 7}
```

These numbers are only an example; your counts depend on your data.

## 2.7 Quality validation

Use a combination of:
- **Automated checks:** schema, length, malformed messages, language, duplicate rate, forbidden strings, output-format validation.
- **Programmatic tests:** run code answers, validate JSON, check SQL against a test database, or verify citations.
- **Reference checks:** compare factual answers against trusted sources where possible.
- **Human review:** assess usefulness, correctness, safety, completeness, and tone.
- **Adversarial review:** include ambiguous, out-of-scope, misleading, and edge-case prompts.
- **Inter-annotator agreement:** measure or discuss whether annotators apply the rubric consistently.

A model-generated judge can help triage data, but it can share biases with the model being trained. Calibrate it against human-reviewed examples and do not treat its score as ground truth.

## 2.8 Common dataset pitfalls

- **Answer leakage:** target answers accidentally appear in input fields.
- **Template artifacts:** the model learns repeated headers or strange formatting instead of the intended task.
- **Label inconsistency:** one example says “always provide detail,” another says “answer in one sentence.”
- **Class imbalance:** almost every example is one easy task, while important edge cases are rare.
- **Synthetic uniformity:** generated examples have the same style, assumptions, and errors.
- **License/provenance gaps:** the team cannot explain where data came from or whether it can be used.
- **Over-filtering:** aggressive cleaning removes rare but important examples.

## 2.9 Interview questions and answers

**Q: What makes a good SFT example?**  
A: It is representative of the target task, has a clear instruction, a correct and complete target, consistent formatting, and traceable provenance. It should not include unnecessary sensitive information.

**Q: Why deduplicate if repeated examples can reinforce behavior?**  
A: Some repetition is useful, but accidental duplication can overweight examples and contaminate evaluation. Deliberate weighting should be explicit and measured.

**Q: How do you evaluate annotator quality?**  
A: Use a shared rubric, blind overlap samples, disagreement analysis, adjudication, and periodic audits. Agreement alone is not enough if everyone follows a flawed rubric.

---

# 3. Evol-Instruct, UltraFeedback, and synthetic-data risks

## 3.1 Synthetic data in plain language

Synthetic data is generated rather than directly collected from real user interactions. It can expand coverage, create rare edge cases, and provide demonstrations where human examples are scarce. It can also amplify the generator's mistakes.

A useful mental model: asking an experienced teacher to write practice problems can help, but if the teacher misunderstands a topic, hundreds of polished practice problems can repeat the same error.

## 3.2 Evol-Instruct

**Evol-Instruct** is a method associated with the WizardLM line of work. It uses an instruction-evolution process to turn simpler instructions into more complex or demanding ones. Evolution operations can add constraints, deepen reasoning requirements, broaden scope, or make the task more challenging.

Example:
- Basic: “Explain how a solar panel works.”
- Evolved: “Explain how a solar panel works to a homeowner, compare cloudy and sunny conditions, identify two maintenance issues, and keep the answer under 200 words.”

The point is not just to make prompts longer. The new instruction should require a meaningfully richer capability while remaining coherent and solvable.

**Benefits**
- More coverage of multi-step and constrained tasks.
- Less dependence on manually writing every prompt.
- A curriculum from simple to difficult examples.

**Risks**
- Evolution can produce impossible, ambiguous, repetitive, or overly complex instructions.
- A generated instruction may look difficult without testing the intended capability.
- The answer generator may hallucinate or fail to satisfy all constraints.
- The resulting dataset may overrepresent the generator's style.

## 3.3 UltraFeedback

**UltraFeedback** is a large feedback dataset used in research on instruction-following and preference optimization. It contains model-generated responses and feedback or ratings along dimensions such as instruction following, truthfulness, helpfulness, and related quality criteria, depending on the release and annotation schema.

A typical preference-training workflow:
1. Gather prompts.
2. Generate multiple candidate responses.
3. Score or compare the responses using annotators or model-based judges.
4. Build chosen/rejected pairs or scalar feedback records.
5. Filter and audit the resulting labels.
6. Train a preference model or use a preference-optimization method such as DPO, subject to the dataset's format and license.

**Key point:** a preference dataset is not automatically a set of verified factual answers. A response can sound polished and still be wrong.

## 3.4 Risks when using synthetic instruction or preference data

| Risk | What happens | Mitigation |
|---|---|---|
| Hallucinated targets | The model learns false claims | Verify factual claims; use trusted references and executable tests |
| Judge bias | Preferred answers reflect a judge's style or blind spots | Human audits, diverse judges, rubric calibration |
| Length/style bias | Longer or more confident answers win regardless of correctness | Explicit rubrics; length-controlled comparisons |
| Distribution collapse | Examples resemble the generator's narrow style | Mix real, human-written, and diverse generated data |
| Self-reinforcement | A model trains on its own errors or similar models' errors | Independent evaluation and provenance tracking |
| Prompt contamination | Synthetic prompts include benchmark questions | Screen against evaluation sets and known benchmarks |
| Unsafe content | Generated examples normalize harmful or disallowed responses | Safety filters and expert review |
| Low diversity | Many near-identical examples inflate dataset size | Semantic deduplication and coverage analysis |
| License/provenance issues | Generated outputs may have uncertain terms or source influence | Review applicable licenses, contracts, and data policies |

## 3.5 Practical controls

- Keep a field identifying whether each record is human-written, model-generated, or transformed from another source.
- Record generator model/version, prompt template, date, and any scoring model.
- Use independent sources for verification where possible.
- Evaluate synthetic-data quality on a human-reviewed sample before scaling.
- Deduplicate prompts and answers.
- Use diverse candidate responses rather than one generator's single preferred answer.
- Test whether synthetic-data training improves a held-out real-world evaluation set.
- Keep safety-critical examples under expert review.
- Never assume that high model-judge scores imply factual truth.

## 3.6 Interview questions and answers

**Q: Why use Evol-Instruct?**  
A: It systematically increases instruction complexity and can improve coverage of constrained, multi-step tasks. Generated instructions and answers still need quality control.

**Q: What does UltraFeedback contribute?**  
A: It provides feedback or preference-style signals about candidate model responses, which can be used to study or train preference alignment. Its labels are signals of judged quality, not infallible truth.

**Q: How do you prevent a synthetic-data feedback loop?**  
A: Track provenance, mix data sources, independently validate outputs, deduplicate, retain human-reviewed gold evaluations, and monitor performance on real held-out tasks.

---

# 4. Distillation: transferring behavior from a teacher to a student

## 4.1 The basic idea

**Knowledge distillation** trains a smaller **student** model to imitate a larger **teacher** model. The teacher may be more capable but too slow or expensive for a production workload. The student is optimized to reproduce useful behavior at lower cost.

Analogy: an expert creates worked examples and coaching notes for a junior colleague. The junior can learn many routines, but may not inherit every ability of the expert.

## 4.2 Common distillation forms

1. **Response/sequence distillation:** the teacher generates target answers; the student is trained with ordinary next-token loss on those answers.
2. **Logit distillation:** the student learns from the teacher's probability distribution over tokens, often using a temperature-scaled KL-divergence objective. This requires access to teacher logits, not just text responses.
3. **Feature/intermediate-state distillation:** the student is trained to match selected hidden representations or intermediate computations. This requires compatible model access and careful design.
4. **Task-specific distillation:** teacher-generated labels, explanations, classifications, tool-call traces, or structured outputs are used for a particular task.
5. **Self-distillation:** a model or a stronger checkpoint supplies targets for a related student or later training stage.

## 4.3 Logit distillation intuition

A teacher may assign probabilities to next tokens like:
- “Paris”: 0.70
- “Lyon”: 0.15
- “Marseille”: 0.08
- other tokens: 0.07

A student trained only on the hard target “Paris” learns the correct answer. A student trained on the teacher's distribution may also learn that Lyon is a more plausible alternative than an unrelated word. The distribution can convey “dark knowledge”—relative preferences among alternatives.

A simplified objective combines student-to-teacher distribution matching with, optionally, the usual ground-truth language-model loss:

\[
L = \lambda T^2\, KL(p_{\text{teacher}}^{(T)} \,\|\, p_{\text{student}}^{(T)})
+ (1-\lambda)L_{\text{task}}
\]

Here, \(T\) is temperature and \(\lambda\) balances the two losses. Implementations differ in the direction of KL, reduction, masking, and scaling conventions, so the exact equation should be checked against the training library.

## 4.4 Response-distillation example

A simple data-generation sketch:

```python
# Pseudocode: exact client API depends on your model provider.
prompts = [
    "Explain recursion to a beginner.",
    "Return valid JSON describing a book."
]

teacher_examples = []
for prompt in prompts:
    teacher_answer = call_teacher_model(
        prompt=prompt,
        temperature=0.2
    )
    teacher_examples.append({
        "instruction": prompt,
        "output": teacher_answer
    })

# Validate the teacher outputs before training the student.
# Then fine-tune the student on the accepted examples.
```

This is intentionally provider-neutral pseudocode because `call_teacher_model` is not a universal Python function. In a real system, implement retries, rate limits, logging, privacy controls, and output validation.

## 4.5 What can and cannot be distilled?

A student can learn patterns present in the teacher's outputs and data coverage. It cannot be guaranteed to inherit every capability, hidden internal computation, or robustness property of the teacher. Distillation is not a magic copy operation.

Reasoning-oriented models pose special challenges:
- **Answer-only targets:** correct final answers may omit the intermediate structure needed to solve related problems.
- **Rationale quality:** generated explanations may be post-hoc, incomplete, or not faithful to the teacher's internal computation.
- **Long-context and multi-step behavior:** a small student may lack capacity to reproduce long chains or maintain constraints.
- **Search and tool use:** reasoning may depend on external tools, execution, or repeated verification rather than text alone.
- **Distribution shift:** student performance may drop on novel tasks even when teacher-generated training scores are high.
- **Capacity bottleneck:** the student may not have enough parameters or context capacity for the full teacher behavior.

For reasoning distillation, collect diverse problem types, include verifiable final answers, use executable tests where possible, and evaluate generalization—not just imitation of the teacher's phrasing. If explanations are included, treat them as training targets, not proof that the model reasons faithfully.

## 4.6 When to use it

Use distillation when:
- A large teacher performs well on the target task.
- You can generate or access high-quality teacher targets.
- A smaller model meets latency, memory, privacy, or cost requirements.
- You can measure the quality loss acceptable for deployment.

Do not assume the student will be better than the teacher on the same distribution. A student can outperform the teacher on a narrow metric if the training process and data improve that metric, but this is an empirical result—not a guarantee.

## 4.7 Interview questions and answers

**Q: What is the difference between distillation and quantization?**  
A: Distillation trains a student to imitate a teacher; quantization represents model weights or activations with lower-precision numbers. They can be combined.

**Q: Why are teacher logits useful?**  
A: They contain relative probabilities across many possible tokens, not just the single selected token. This can provide richer learning signals, but requires access to logits and more complex training.

**Q: How do you know if distillation worked?**  
A: Compare teacher and student on held-out task metrics, robustness, safety, latency, memory, and cost. Evaluate both common and difficult cases.

---

# 5. SFT, causal language modeling, loss masking, and sequence packing

## 5.1 Supervised fine-tuning

**SFT** is training a pretrained model on examples that demonstrate desired responses. In many chat models, the model is trained to predict the next token in the assistant's target response, given the conversation prefix.

SFT does not usually train a model by directly storing a list of rules. It adjusts neural-network weights to make desired token sequences more likely in relevant contexts.

## 5.2 Causal language-modeling objective

For a token sequence \(x_1, x_2, \ldots, x_n\), a causal language model predicts each token using the preceding tokens:

\[
P(x_1,\ldots,x_n)=\prod_{t=1}^{n}P(x_t\mid x_{<t})
\]

Training typically minimizes negative log-likelihood (cross-entropy):

\[
L=-\sum_{t=1}^{n}\log P_\theta(x_t\mid x_{<t})
\]

In plain language: for each target token, the model is penalized when it assigns too little probability to the correct next token. The causal attention mask prevents the model from seeing future tokens when predicting the current one.

## 5.3 Why loss masking matters

A chat training sequence can contain:
- system instructions,
- user messages,
- assistant answers,
- separators and end-of-turn tokens.

Often the model should condition on system and user text but be directly supervised mainly on assistant tokens. A **loss mask** marks which positions contribute to the loss. Many implementations represent ignored labels with a sentinel such as `-100`, but the exact convention depends on the framework.

Example:

```text
System: Answer briefly.
User: What is 2 + 2?
Assistant: 4
```

The model sees the full conversation prefix. If only assistant tokens are supervised, the loss is applied to the assistant answer and possibly its end-of-turn token, not to the user's question. Training on all tokens is possible in some setups, but it changes the objective and may waste capacity on reproducing user text.

**Common mistake:** masking the assistant answer by accident, resulting in little or no useful SFT signal. Another mistake is supervising on user tokens when the intended recipe is assistant-only loss.

## 5.4 Sequence packing

GPU work is often more efficient when sequences have similar lengths. If each example is padded to a fixed length, many positions may contain only padding. **Packing** places multiple shorter examples into a longer training sequence to reduce wasted computation.

Example: three sequences of lengths 100, 120, and 80 might occupy 300 useful tokens if packed together, rather than three separate 512-token padded rows.

However, packing requires care:
- Ensure attention does not accidentally allow one example to see another example's content if isolation is intended.
- Ensure loss labels and example boundaries are correct.
- Handle position IDs according to the model and training recipe.
- Do not let a target cross from one example into the next.
- Understand whether the implementation uses block-diagonal attention, sequence-boundary masks, or a simpler concatenation scheme.

Packing is not automatically safe just because the tensor fits. Verify the data collator and attention behavior.

## 5.5 Minimal causal-LM fine-tuning sketch

The following is a conceptual Hugging Face Transformers pattern. Model IDs, chat templates, tokenizer fields, hardware requirements, and library arguments vary. Start with a tiny dataset and verify the actual labels before launching a long job.

```python
from datasets import Dataset
from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
    TrainingArguments,
    Trainer,
    DataCollatorForLanguageModeling,
)

model_id = "gpt2"  # Small example model; not a production recommendation.

tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id)

# GPT-2 has no separate pad token by default.
# Reusing EOS as padding is a common simple setup for this example.
tokenizer.pad_token = tokenizer.eos_token
model.config.pad_token_id = tokenizer.pad_token_id

rows = [
    {"text": "Question: What is 2 + 2?\nAnswer: 4"},
    {"text": "Question: Name a primary color.\nAnswer: Red"},
]

dataset = Dataset.from_list(rows)

def tokenize(batch):
    return tokenizer(
        batch["text"],
        truncation=True,
        max_length=128,
    )

tokenized = dataset.map(tokenize, batched=True, remove_columns=["text"])

# This collator creates labels for causal LM training.
# It masks padding labels, but does NOT implement assistant-only masking.
collator = DataCollatorForLanguageModeling(
    tokenizer=tokenizer,
    mlm=False,
)

args = TrainingArguments(
    output_dir="./sft-demo-output",
    per_device_train_batch_size=2,
    num_train_epochs=1,
    learning_rate=5e-5,
    logging_steps=1,
    save_strategy="no",
    report_to="none",
)

trainer = Trainer(
    model=model,
    args=args,
    train_dataset=tokenized,
    data_collator=collator,
)

trainer.train()
```

### What this example demonstrates—and what it does not

- It shows the basic mechanics of next-token training with a tiny text dataset.
- It does not implement a production chat template or assistant-only loss masking.
- It does not include a validation set, LoRA, mixed precision, packing, or checkpoint selection.
- It may require adjustment for your installed Transformers and datasets versions.
- A two-example dataset is only for understanding the workflow; it cannot produce a useful general assistant.

For real chat SFT, apply the model's chat template and use a collator or preprocessing function that correctly masks non-target tokens if assistant-only loss is desired. Inspect several rendered training examples and their labels before training.

## 5.6 Interview questions and answers

**Q: Why is it called causal language modeling?**  
A: The model predicts the next token from earlier tokens, using a causal mask so future tokens are not visible.

**Q: What does `-100` mean in many Transformers training pipelines?**  
A: It is a common ignored-label value. Loss is not calculated at those positions by standard cross-entropy implementations that honor the ignore index.

**Q: Why pack sequences?**  
A: To reduce padding and improve throughput. But boundaries, attention isolation, and labels must be handled correctly.

---

# 6. Fine-tuning hyperparameters

Hyperparameters control how training proceeds. There is no universally correct setting; the right values depend on model size, dataset size and quality, sequence length, hardware, optimizer, and objective.

## 6.1 Batch size and effective batch size

- **Per-device batch size:** examples processed by one device in one forward/backward pass.
- **Gradient accumulation:** perform several micro-batches before applying one optimizer update.
- **Data-parallel world size:** number of devices processing different examples.

A common approximation is:

\[
B_{\text{effective}} = B_{\text{per-device}}\times N_{\text{devices}}\times N_{\text{accumulation}}
\]

For example, 2 examples/device × 4 devices × 8 accumulation steps = effective batch size 64 examples per optimizer update. Token-based training complicates this because sequence lengths differ; report tokens per update as well when possible.

**Trade-off:** larger batches can stabilize gradients and improve hardware utilization, but require memory or accumulation steps and may change optimization behavior. Smaller batches are noisier but can sometimes generalize well.

## 6.2 Learning rate

The learning rate controls the size of weight updates. Too high can destabilize training or erase useful pretrained behavior; too low can make adaptation extremely slow.

Fine-tuning commonly uses a smaller learning rate than training a model from scratch. Parameter-efficient methods may tolerate different settings than full fine-tuning, but this is not a universal rule.

Practical approach:
- Start with a conservative baseline recommended for the model and method.
- Run a short learning-rate sweep.
- Monitor training loss and held-out task metrics.
- Watch for sudden loss spikes or rapid regression on general capabilities.

## 6.3 Warmup and learning-rate schedules

**Warmup** gradually raises the learning rate at the start of training. It can reduce instability while the optimizer's running statistics are still developing.

Common schedules include:
- Constant learning rate.
- Linear decay.
- Cosine decay.
- Warmup followed by one of the above.

Warmup is often expressed as a fraction of total training steps or as a fixed number of steps. Excessive warmup wastes training time; too little may cause unstable early updates for some setups.

## 6.4 Epochs and training steps

An **epoch** is one pass through the training dataset. More epochs mean more opportunities to learn the examples, but also more risk of overfitting or memorization.

The right stopping point is determined by validation behavior and task performance—not by the assumption that a fixed number of epochs is always best.

## 6.5 Gradient accumulation

Gradient accumulation lets a memory-limited device simulate a larger batch by accumulating gradients over multiple micro-batches before updating weights.

It reduces activation memory compared with processing the entire effective batch at once, but it does not eliminate all memory costs. It can also affect throughput and optimizer-step counts. Learning-rate schedules and logging should be based on the correct number of optimizer steps.

## 6.6 Optimizer choice

- **AdamW:** widely used; maintains adaptive first and second moments and decouples weight decay from the gradient update.
- **SGD with momentum:** simpler, but often needs more tuning for large transformer fine-tuning.
- **8-bit optimizers:** reduce optimizer-state memory in supported setups; numerical and compatibility behavior should be tested.
- **Adafactor and other memory-oriented choices:** may be useful in particular model/training regimes.

The optimizer is only one part of training. Data quality, learning rate, schedule, precision, and objective may matter more than switching optimizers blindly.

## 6.7 Sequence length

Longer sequences allow the model to learn from longer context, but they usually increase memory and computation. For standard dense attention, attention compute and memory can scale roughly quadratically with sequence length, although optimized attention implementations change practical costs.

Truncation can remove crucial evidence or the end of an answer. Conversely, using very long sequences when the task is short wastes resources. Measure real input-length distributions and choose a maximum length that covers important cases.

## 6.8 A tuning table

| Hyperparameter | If too low/small | If too high/large | What to monitor |
|---|---|---|---|
| Learning rate | Slow or incomplete adaptation | Instability, regression, forgetting | Loss curves, validation quality |
| Effective batch | Noisy gradients; variable updates | Memory/throughput trade-offs; may change generalization | Tokens/update, metric stability |
| Epochs | Underfitting | Overfitting and memorization | Validation and regression suite |
| Warmup | May start abruptly | Wastes steps or delays useful learning | Early loss stability |
| Sequence length | Important context truncated | Higher memory and compute | Truncation rate, task score |
| LoRA rank | Limited adaptation capacity | More parameters/memory and possible overfit | Quality vs. trainable parameter count |
| Weight decay | Little regularization | Can suppress useful adaptation | Validation quality |
| Dropout | Less regularization | Underfitting or noisy adaptation | Train/validation gap |

## 6.9 Practical tuning workflow

1. Establish a baseline model and fixed evaluation set.
2. Run a tiny smoke test to verify data, labels, and hardware.
3. Start from a conservative recipe appropriate to the model.
4. Change one or a small number of variables at a time.
5. Log loss, validation task metrics, throughput, GPU memory, and failures.
6. Save checkpoints at meaningful intervals.
7. Choose a checkpoint by held-out quality and regression constraints, not just lowest training loss.
8. Repeat with multiple seeds when results are close or the task is sensitive.

## 6.10 Interview questions and answers

**Q: What is effective batch size?**  
A: The approximate number of examples contributing gradients to one optimizer update, considering devices and gradient accumulation. With variable-length sequences, token counts also matter.

**Q: Why can training loss decrease while quality gets worse?**  
A: The model may be overfitting, memorizing examples, learning annotation artifacts, or sacrificing general capabilities to fit the fine-tuning distribution.

**Q: How would you debug unstable loss?**  
A: Check malformed samples and labels, learning rate, precision, gradient norms, sequence lengths, batch settings, and data-collator behavior. Reproduce with a small controlled run.

---

# 7. Training/validation splits, contamination, and evaluation leakage

## 7.1 Why splits matter

The training set teaches the model. The validation set helps you select checkpoints and tune hyperparameters. A final test set estimates performance after decisions are complete.

If near-identical examples appear in both training and evaluation, the score can reflect memorization rather than generalization.

## 7.2 Split by the unit that must generalize

Random row-level splitting is not always safe. Group related examples before splitting:
- Same source document or document family.
- Same conversation or user session.
- Same customer, patient, or account when privacy and policy permit such grouping.
- Same code repository or problem template.
- Same underlying question with paraphrases.
- Same time period or entity if the deployment task requires future generalization.

For temporal tasks, a time-based split can be more realistic: train on earlier records and evaluate on later ones.

## 7.3 Three-way split

- **Train:** used for gradient updates.
- **Validation/dev:** used for model selection and hyperparameter decisions.
- **Test:** reserved for a final, less frequently consulted assessment.

The exact percentages depend on dataset size and diversity. A tiny dataset may need cross-validation or careful grouped evaluation. A very large dataset can reserve a relatively small but representative test set.

## 7.4 Contamination and leakage

**Data contamination** occurs when evaluation examples or their close relatives are present in training data or in a model's prior training corpus. **Evaluation leakage** is broader: information from the evaluation process influences training or model selection in a way that makes the score optimistic.

Examples:
- The same benchmark question appears in both train and test.
- A target answer is accidentally included in the input.
- A preprocessing step uses validation examples to fit vocabulary, thresholds, or deduplication decisions.
- Developers repeatedly tune prompts against the test set until it no longer acts as an independent test.
- A benchmark solution is copied into synthetic training examples.
- Multiple paraphrases of the same question are split across train and test.

## 7.5 Detection techniques

1. Exact hashes across splits.
2. Normalized-text matching.
3. N-gram overlap or MinHash/LSH for near-duplicates.
4. Embedding similarity for semantic relatives, followed by review.
5. Source/document ID grouping.
6. Search training data for known benchmark questions and distinctive answer strings.
7. Inspect unusually high test performance on examples similar to training data.
8. Maintain a hidden or newly collected evaluation set where possible.

Similarity thresholds are task-specific. High similarity does not prove leakage; low lexical similarity does not prove independence. Human review is often needed.

## 7.6 Example: grouped splitting

With scikit-learn, group related records so members of a group cannot cross the split. The group might be a source-document ID or a canonical problem ID.

```python
from sklearn.model_selection import GroupShuffleSplit
import numpy as np

# X contains examples; groups[i] identifies the source family for X[i].
X = np.array(["doc A chunk 1", "doc A chunk 2", "doc B chunk 1", "doc C chunk 1"])
groups = np.array(["A", "A", "B", "C"])

splitter = GroupShuffleSplit(
    n_splits=1,
    test_size=0.25,
    random_state=42,
)

train_idx, test_idx = next(splitter.split(X, groups=groups))

train_groups = set(groups[train_idx])
test_groups = set(groups[test_idx])

assert train_groups.isdisjoint(test_groups), "A group crossed the split!"
print("Train groups:", sorted(train_groups))
print("Test groups:", sorted(test_groups))
```

The exact resulting groups depend on the number of groups and the splitter. With only three groups, the split is illustrative and statistically weak. Real evaluations need enough independent groups.

## 7.7 Interview questions and answers

**Q: Why is random splitting sometimes wrong?**  
A: Because related examples can leak across partitions, making test data easier than genuinely new cases. Split by the real unit of independence.

**Q: How do you keep a test set trustworthy?**  
A: Restrict access, avoid tuning against it, version it, screen for contamination, and periodically add new private or real-world cases.

**Q: Is a 99% benchmark score always evidence of a strong model?**  
A: No. Check leakage, benchmark saturation, sample representativeness, confidence intervals, and real-world task performance.

---

# 8. Catastrophic forgetting, memorization, label noise, and capability regression

These are related but distinct failure modes.

## 8.1 Catastrophic forgetting

During adaptation, a model can lose performance on abilities it previously had. The new task's gradients may shift weights away from representations or behaviors useful for earlier tasks.

Example: a general assistant is fine-tuned on thousands of short classification labels and begins answering ordinary questions in terse labels.

**Detection**
- Evaluate general capability benchmarks before and after adaptation.
- Keep a fixed regression suite covering language, reasoning, coding, safety, formatting, and target-domain behavior.
- Compare performance by category, not only one aggregate score.

**Mitigation**
- Use a smaller learning rate and fewer epochs.
- Mix in representative general instruction data when appropriate.
- Use parameter-efficient tuning when it meets the quality target.
- Apply regularization or methods designed to preserve prior behavior.
- Keep the base checkpoint and support rollback.

## 8.2 Memorization

Memorization occurs when the model learns specific training examples too closely, potentially reproducing rare strings or personal data. Some memorization is normal in neural networks; the concern is unwanted reproduction or poor generalization.

**Detection**
- Search for verbatim or near-verbatim output on held-out prompts.
- Use canary strings only in controlled, authorized experiments.
- Test extraction risks with privacy/security experts.
- Compare train and validation performance; a large gap can signal overfit.
- Audit data for secrets and personal information before training.

**Mitigation**
- Remove unnecessary sensitive data.
- Deduplicate and reduce repeated exposure to rare strings.
- Use early stopping, appropriate regularization, and data minimization.
- Evaluate privacy risk; do not assume fine-tuning automatically anonymizes data.

## 8.3 Label noise

Label noise means examples contain incorrect, inconsistent, ambiguous, or low-quality targets. It can come from annotator mistakes, weak labeling rules, model-generated answers, or unreliable preference judges.

**Detection**
- Sample and manually audit labels.
- Identify annotator disagreement and suspicious outliers.
- Use executable tests, reference answers, or schema validators.
- Compare model errors against target quality; some apparent model failures are bad labels.

**Mitigation**
- Clarify the rubric and adjudicate disagreements.
- Correct or remove unreliable records.
- Weight examples according to justified quality signals, with care.
- Maintain a clean, high-quality evaluation set.

## 8.4 Capability regression

Capability regression is a measurable decline in one or more important behaviors after training, quantization, prompt changes, or deployment changes. It is an outcome, not necessarily one specific mechanism. Forgetting and label noise can cause it, but so can altered decoding, tool routing, tokenizer handling, or system prompts.

**Detection**
- Run pre/post evaluation with identical prompts and decoding settings.
- Compare quality by category and severity.
- Test the full production path, not just the raw model.
- Track latency, error rate, refusal rate, format validity, and grounding.

## 8.5 A practical regression table

| Symptom | Possible cause | Diagnostic |
|---|---|---|
| Training loss improves; validation worsens | Overfitting, label noise, split mismatch | Inspect data, splits, and checkpoint trajectory |
| General questions become poor | Catastrophic forgetting or prompt changes | Run general regression suite and compare serving configuration |
| Model repeats training strings | Memorization or prompt/data overlap | Privacy audit and controlled extraction tests |
| Outputs are consistently wrong in one format | Bad labels or template mismatch | Inspect rendered inputs and labels |
| Offline evaluation is good but production is poor | Retrieval/tool/serving difference | End-to-end traces and production-like tests |

## 8.6 Interview questions and answers

**Q: How do you tell forgetting from overfitting?**  
A: Overfitting is usually indicated by a widening train–validation gap on the target task. Forgetting is indicated by deterioration on previously learned or general tasks. Both can happen together.

**Q: What is the first response to capability regression?**  
A: Reproduce it with controlled pre/post tests, isolate whether the model or serving pipeline changed, inspect data and training curves, then roll back if the regression affects users.

**Q: Does LoRA prevent forgetting?**  
A: No. It restricts which parameters are updated and can reduce some risks, but an adapter can still learn harmful behavior or regress on the target evaluation distribution.

---

# 9. LoRA: low-rank adaptation

## 9.1 Why LoRA exists

A large model may have billions of parameters. Updating all weights requires storing gradients and optimizer states, which can be expensive. **LoRA (Low-Rank Adaptation)** freezes most pretrained weights and learns small additional matrices in selected layers.

For a weight matrix \(W\), a full fine-tuning step learns a full-size update \(\Delta W\). LoRA represents the update as a product of two smaller matrices:

\[
W' = W + \Delta W,\qquad \Delta W = \frac{\alpha}{r}BA
\]

If \(W\) maps from dimension \(d_{\text{in}}\) to \(d_{\text{out}}\), a full update has \(d_{\text{in}}d_{\text{out}}\) entries. LoRA uses:
- \(A\): shape \(r \times d_{\text{in}}\)
- \(B\): shape \(d_{\text{out}} \times r\)

So it trains roughly \(r(d_{\text{in}}+d_{\text{out}})\) parameters instead of \(d_{\text{in}}d_{\text{out}}\), when rank \(r\) is much smaller than the layer dimensions.

Example: for a 4096×4096 matrix, full update size is 16,777,216 parameters. At rank 8, LoRA has \(8(4096+4096)=65,536\) trainable parameters for that matrix—about 256 times fewer.

## 9.2 How it works intuitively

Imagine a huge mixing board with thousands of settings. Full fine-tuning changes every setting. LoRA keeps the original board fixed and learns a small set of coordinated adjustments that can influence many outputs. It is effective because many task adaptations can be represented by lower-rank updates, though this is an empirical property rather than a guarantee.

During training:
1. Freeze the base model weights.
2. Insert trainable low-rank matrices into selected modules.
3. Run forward and backward passes.
4. Update only the adapter parameters (and any explicitly unfrozen modules).
5. Save the adapter separately, or merge it into the base weights for deployment if supported.

## 9.3 Rank (`r`)

Rank controls the adapter's capacity.
- Low rank: fewer trainable parameters, lower adapter memory, potentially insufficient adaptation.
- Higher rank: more capacity, more memory/compute, and possibly greater overfitting risk.

Do not assume the highest rank is best. Tune against held-out task metrics and operational constraints.

## 9.4 Alpha (`lora_alpha`)

Alpha scales the adapter update. In the classic formulation, the scale is commonly \(\alpha/r\), though variants such as rank-stabilized LoRA change the scaling rule. Alpha and rank should be considered together. Exact behavior depends on the library and configuration.

A larger alpha is not simply “more intelligence”; it changes the magnitude of the learned update and can make optimization more or less stable depending on the rest of the recipe.

## 9.5 Target modules

Target modules determine where adapters are inserted.
- Attention projections often include query (`q_proj`), key (`k_proj`), value (`v_proj`), and output (`o_proj`) projections.
- Some recipes also target MLP/feed-forward projections such as gate, up, and down projections.
- Names vary by architecture. GPT-2, Llama-like models, and other families use different module names.

Targeting only query/value projections can be cheaper. Targeting more attention and MLP modules can increase adaptation capacity and cost. Inspect the actual model modules; never copy a target-module list blindly.

## 9.6 Dropout

LoRA dropout randomly drops adapter activations during training as a regularizer. A nonzero value may help with small or repetitive datasets; too much can impede learning. It is often set to zero or a small value depending on the recipe and data size.

## 9.7 Common LoRA mistakes

- Wrong target-module names, causing no adapters to be attached or an error.
- Accidentally training the entire base model instead of freezing it.
- Choosing rank based on habit instead of evaluation.
- Forgetting to save tokenizer/chat-template/configuration alongside the adapter.
- Evaluating with the wrong base model or wrong adapter.
- Merging adapters and assuming every serving stack handles merged and unmerged weights identically.
- Assuming LoRA eliminates privacy, safety, or forgetting risks.

## 9.8 Hugging Face PEFT configuration example

```python
from peft import LoraConfig, TaskType, get_peft_model
from transformers import AutoModelForCausalLM

model_id = "your-compatible-causal-lm"
model = AutoModelForCausalLM.from_pretrained(model_id)

config = LoraConfig(
    task_type=TaskType.CAUSAL_LM,
    r=8,                       # Low-rank adapter capacity
    lora_alpha=16,             # Scaling factor in the classic formulation
    lora_dropout=0.05,          # Regularization applied to adapter path
    target_modules=["q_proj", "v_proj"],  # Must match this model's module names
    bias="none",
)

model = get_peft_model(model, config)
model.print_trainable_parameters()
```

This attaches adapters but does not train them. You still need tokenization, a correct data collator, training arguments, a trainer, evaluation, and checkpoint saving. The example's target module names are suitable only for model architectures that use those names.

Illustrative output might say that only a small percentage of parameters are trainable. The exact count depends on model architecture and configuration.

## 9.9 Interview questions and answers

**Q: Why is LoRA parameter-efficient?**  
A: It represents weight updates with two small low-rank matrices while freezing the original matrix, reducing trainable parameters and optimizer-state memory.

**Q: What happens if rank is too small?**  
A: The adapter may not have enough capacity to represent the required task changes. You may see underfitting or a performance ceiling.

**Q: Can multiple LoRA adapters be used?**  
A: Yes, depending on the framework. Adapters can be selected, composed, or merged, but combinations are not guaranteed to behave linearly or safely. Evaluate every composition.

---

# 10. QLoRA and other parameter-efficient fine-tuning methods

## 10.1 The distinction between quantization and PEFT

**Quantization** reduces numerical precision used to represent model weights or activations. **PEFT** reduces the number of parameters trained. They address different resource costs and can be combined.

**QLoRA** commonly means training LoRA adapters while keeping the frozen base model in low-bit quantized form. This can reduce memory enough to fine-tune a model on more modest hardware. The adapters still have their own training precision and memory requirements.

## 10.2 Comparison table

| Method | What is trained? | Main resource benefit | Strengths | Limitations |
|---|---|---|---|---|
| Full fine-tuning | Most/all model weights | No parameter-count reduction | Maximum flexibility | High optimizer, gradient, and memory cost |
| LoRA | Low-rank matrices in selected layers | Fewer trainable parameters and optimizer states | Popular, modular, easy to save adapters | Base weights still need to fit in usable memory |
| QLoRA | LoRA adapters; base is quantized/frozen | Lower base-weight memory plus PEFT savings | Enables larger models on less memory | Quantization kernels and training setup add complexity |
| Adapter layers | Small added neural modules | Train only added modules | Modular task-specific components | Adds inference layers and deployment complexity |
| Prefix tuning | Trainable virtual tokens/prefix states, often per layer | Few trainable parameters | Leaves base weights frozen | Can be sensitive to sequence and architecture details |
| Prompt tuning | Trainable embeddings for virtual input tokens | Very small trainable parameter count | Simple parameter-efficient adaptation | May have less capacity than LoRA for difficult tasks |
| IA³ | Learned scaling vectors for selected activations | Very few trainable parameters | Compact adaptation | Architecture/task compatibility and capacity limits |
| BitFit | Bias terms only | Very few trainable parameters | Simple and lightweight | Often insufficient for complex adaptations |
| DoRA | Weight-magnitude and directional adaptation, commonly combined with low-rank updates | PEFT-style training | Can improve adaptation in some settings | More implementation complexity and not universally superior |

## 10.3 Quantization basics

Floating-point weights can be represented with different precision, such as 32-bit, 16-bit, or lower-bit formats. Lower precision can reduce memory and sometimes improve throughput, but may introduce approximation error or require specialized kernels.

A rough memory intuition: storing one billion parameters at 16 bits requires about 2 GB just for raw weights, while 4-bit storage is roughly 0.5 GB before metadata, scales, padding, and runtime overhead. Actual GPU memory use is higher because of activations, temporary buffers, caches, adapters, and framework overhead.

## 10.4 QLoRA concepts

Common QLoRA recipes combine:
- A frozen base model stored in low-bit form, often 4-bit.
- LoRA adapters trained in a suitable higher-precision format.
- A quantization format designed for weight storage, such as NF4 in widely used implementations.
- Optional double quantization to reduce the overhead of quantization constants.
- Memory-efficient optimizers and gradient checkpointing when needed.

Exact configurations depend on library versions, hardware, and model architecture. Quantization does not mean every operation runs in four-bit arithmetic; weights may be dequantized or used through specialized kernels for computation.

### Conceptual setup sketch

```python
import torch
from transformers import AutoModelForCausalLM, BitsAndBytesConfig
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training

model_id = "your-compatible-causal-lm"

quant_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_use_double_quant=True,
    bnb_4bit_compute_dtype=torch.bfloat16,
)

base_model = AutoModelForCausalLM.from_pretrained(
    model_id,
    quantization_config=quant_config,
    device_map="auto",
)

base_model = prepare_model_for_kbit_training(base_model)

lora_config = LoraConfig(
    task_type="CAUSAL_LM",
    r=16,
    lora_alpha=32,
    lora_dropout=0.05,
    target_modules=["q_proj", "v_proj"],
    bias="none",
)

model = get_peft_model(base_model, lora_config)
model.print_trainable_parameters()
```

**Important:** this is a configuration sketch, not a complete training script. It requires compatible versions of Transformers, PEFT, bitsandbytes, PyTorch, model architecture, and hardware. Some GPUs do not support `bfloat16`; in that case use a supported compute dtype. Target-module names must match the chosen model. Add a correct dataset, chat template, data collator, training arguments, validation, and saving procedure.

## 10.5 Prompt tuning vs. prefix tuning vs. LoRA

- **Prompt tuning:** adds trainable virtual token embeddings at the input. These are learned vectors, not human-readable prompt words.
- **Prefix tuning:** learns continuous prefix states, often injected at multiple transformer layers.
- **LoRA:** learns low-rank updates to selected weight matrices.
- **Full fine-tuning:** changes the original weights directly.

Prompt/prefix methods can be extremely parameter-efficient, but may have lower capacity or be more sensitive to architecture and task. LoRA is widely used because it often provides a practical balance between quality, memory, and modularity.

## 10.6 How to choose

- Use **full fine-tuning** when you need maximum flexibility, have sufficient resources, and have a well-controlled training setup.
- Use **LoRA** when you want a strong general-purpose PEFT baseline and can fit the frozen base model.
- Use **QLoRA** when base-model memory is the main constraint.
- Try **prompt/prefix tuning** when trainable parameter count must be extremely small or the task is compatible with these methods.
- Try **IA³ or BitFit** for lightweight experiments where their lower capacity is acceptable.
- Evaluate **DoRA** if it is supported and a LoRA baseline is not sufficient; do not assume it wins for every model or task.

## 10.7 Common mistakes

- Confusing low-bit weight storage with low-bit optimizer states.
- Assuming a 4-bit model uses only the raw weight memory estimate.
- Using unsupported compute dtypes or incompatible kernels.
- Assuming QLoRA is always faster; quantization can introduce overhead.
- Comparing methods with different data, steps, seeds, or evaluation settings.
- Forgetting to save adapter configuration and the exact base-model revision.
- Merging adapters without testing numerical differences and serving compatibility.

## 10.8 Interview questions and answers

**Q: How is QLoRA different from LoRA?**  
A: Both train low-rank adapters, but QLoRA also keeps the frozen base model in low-bit quantized form to reduce memory. LoRA alone does not require a quantized base.

**Q: Does quantization change the model's knowledge?**  
A: It approximates the weight values, so outputs can change slightly or sometimes materially. The effect depends on quantization scheme, model, task, and implementation.

**Q: Why not use prompt tuning for everything?**  
A: It trains very few parameters, but may not have enough adaptation capacity for complex behavioral changes. Choose based on evaluation rather than parameter count alone.

---

# 11. Integrated worked example: adapting a support assistant

Suppose a company needs an assistant that answers questions using product documentation, follows a concise format, and runs cheaply.

## Step 1: Establish the baseline

Create a fixed evaluation set containing:
- Common questions.
- Rare edge cases.
- Questions with missing evidence.
- Questions requiring citations.
- Safety and privacy cases.
- General capability regression cases.

Measure answer correctness, citation validity, refusal behavior, latency, and cost.

## Step 2: Choose architecture and method

- Use **RAG** for current product documentation.
- Improve prompts first for output format and “say when evidence is missing.”
- If formatting and evidence-use behavior remain inconsistent, use **SFT** on high-quality demonstrations.
- Use **preference optimization** only if you have reliable comparisons that express the desired trade-offs.
- Consider **LoRA/QLoRA** if full fine-tuning resource costs are too high.
- Consider **distillation** if the final serving model must be smaller and faster.

## Step 3: Prepare data

- Remove secrets and irrelevant personal data.
- Normalize schema and validate records.
- Deduplicate exact and near-duplicate examples.
- Keep all examples derived from the same source family in one partition.
- Verify targets and citations.
- Track human vs. synthetic provenance.

## Step 4: Train a controlled experiment

Start with a small, conservative run. Verify the chat template and loss mask. Log training loss and validation metrics. Save checkpoints and configuration. Do not change the data, model, and hyperparameters simultaneously if you need to understand why performance changed.

## Step 5: Evaluate beyond training loss

Compare:
- Base model with prompt only.
- RAG baseline.
- SFT model.
- RAG + SFT.
- Quantized/adapted version.
- Smaller distilled model, if relevant.

Keep the simplest configuration that meets the product requirements. A more complicated system is not automatically better.

## Step 6: Deploy safely

- Version the base model, adapter, tokenizer, chat template, retrieval index, and prompts.
- Run production-like tests with the actual serving stack.
- Monitor failures and feedback.
- Have a rollback plan.
- Re-evaluate after changing data, quantization, adapters, prompts, or retrieval.

---

# 12. Scenario-based interview questions

## Scenario 1: “Our policy facts change weekly. Should we fine-tune them into the model?”

**Strong answer:** Usually not as the primary source of truth. Use RAG over versioned policy documents and cite the retrieved evidence. Fine-tuning may help the model follow the retrieval-and-citation workflow, but the live facts should come from the current approved source. Test stale-document and conflicting-version cases.

## Scenario 2: “Training loss keeps falling, but validation accuracy declines.”

**Strong answer:** Suspect overfitting, noisy labels, data leakage differences, or a mismatch between training and evaluation formats. Check checkpoint curves, sample quality, splits, sequence truncation, and the exact evaluation pipeline. Select a checkpoint based on held-out performance and consider fewer epochs, lower learning rate, or stronger data controls.

## Scenario 3: “The model learned our ticket format but became worse at ordinary questions.”

**Strong answer:** This is capability regression and may indicate catastrophic forgetting or an inference-pipeline change. Compare base and adapted models on the same general regression suite with identical decoding and system prompts. Consider mixing general instruction examples, reducing training intensity, or using a smaller adapter. Keep rollback available.

## Scenario 4: “We have one GPU and want to adapt a large open model.”

**Strong answer:** First estimate model-weight, optimizer, activation, and sequence-length memory. QLoRA is a candidate because it combines a quantized frozen base with trainable adapters. Check hardware/dtype compatibility and begin with a short smoke test. Gradient checkpointing and shorter sequences may help, but measure throughput and quality.

## Scenario 5: “A synthetic-data run improves judge scores but not real user outcomes.”

**Strong answer:** The judge may reward stylistic features or share biases with the generator. Audit a human-reviewed sample, test against independently sourced real tasks, examine length and confidence bias, and compare error categories. Keep provenance and avoid treating judge scores as truth.

## Scenario 6: “Our test score is unexpectedly perfect.”

**Strong answer:** Do not celebrate immediately. Check duplicates, paraphrases, benchmark contamination, answer leakage, group boundaries, repeated prompt tuning on the test set, and sample size. Evaluate on a newly collected hidden set and report uncertainty.

## Scenario 7: “LoRA rank 64 is worse than rank 16.”

**Strong answer:** More capacity is not automatically better. The higher rank may overfit, change optimization behavior, or need a different learning rate. Check validation curves and trainable parameter counts; compare under controlled settings and keep the configuration that meets the target constraints.

## Scenario 8: “Can a student distilled from a reasoning model be trusted to reason the same way?”

**Strong answer:** Not by default. The student may imitate outputs without reproducing the teacher's process and may fail on novel or longer problems. Evaluate generalization with verifiable tasks, adversarial cases, tool-use tests, and uncertainty/abstention behavior. Treat rationales as targets, not proof of faithful internal reasoning.

---

# 13. Rapid-review glossary

- **Adapter:** A small set of trainable parameters added to a mostly frozen model.
- **Batch size:** Number of examples contributing to an update, with accumulation and distributed training affecting the effective batch.
- **Causal LM:** A model trained to predict each token from preceding tokens.
- **Catastrophic forgetting:** Loss of previously learned abilities during adaptation.
- **Checkpoint:** A saved model state from a particular point in training.
- **Contamination:** Evaluation examples or close relatives are present in training or prior data.
- **Continued pretraining:** Continuing language-model training on additional text, often domain-specific.
- **Distillation:** Training a student model using signals from a teacher model.
- **DPO:** Direct Preference Optimization, a method for learning from preference pairs without the same separate reward-model/RL loop used by some earlier pipelines.
- **Epoch:** One pass through the training examples.
- **Gradient accumulation:** Combining gradients from multiple micro-batches before an optimizer update.
- **Label noise:** Incorrect, inconsistent, or ambiguous training targets.
- **Learning rate:** Controls the size of optimization updates.
- **Loss masking:** Excluding selected token positions from the training loss.
- **LoRA:** Low-Rank Adaptation; trains small low-rank weight updates while freezing base weights.
- **PEFT:** Parameter-Efficient Fine-Tuning.
- **Preference data:** Comparisons or ratings that indicate which outputs are preferred.
- **QLoRA:** LoRA training with a frozen quantized base model.
- **RAG:** Retrieval-Augmented Generation; retrieves external evidence at inference time.
- **Sequence packing:** Combining shorter examples to reduce padding waste, while correctly preserving boundaries.
- **SFT:** Supervised Fine-Tuning on examples of desired behavior.
- **Synthetic data:** Data generated or transformed by a model or program rather than directly collected in its final form from real cases.
- **Validation leakage:** Information from validation/test data influences training or selection, inflating reported performance.
- **Warmup:** Gradually increasing learning rate at the beginning of training.

## Final interview checklist

Before fine-tuning, be able to explain:
- What failure a model change is intended to fix.
- Why prompting or RAG alone is insufficient.
- Where the training data came from and how it was audited.
- How the training objective and loss mask work.
- How splits prevent near-duplicate leakage.
- Which hyperparameters were tested and why.
- How you detect forgetting, memorization, and regression.
- Why you chose full fine-tuning, LoRA, QLoRA, or another PEFT method.
- How you compare quality, latency, memory, and cost.
- How you will roll back and monitor the deployed model.

**Core principle:** Fine-tuning is an experiment, not a guarantee. Start from a measurable baseline, use trustworthy data, change variables deliberately, evaluate beyond training loss, and deploy only after checking the complete system.
