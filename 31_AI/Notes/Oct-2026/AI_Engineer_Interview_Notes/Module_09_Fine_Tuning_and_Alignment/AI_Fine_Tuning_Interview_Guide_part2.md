# AI Fine-Tuning Interview Guide — Part 2 (Questions 11–21)

Beginner-friendly preparation notes for AI Engineer interviews

> **Goal:** Understand modern adapter methods, model merging, memory requirements, preference optimization, training tools, reproducibility, evaluation, and how to decide whether fine-tuning is worth doing.
>
> **Important:** The code examples are teaching templates, not universal drop-in production scripts. APIs change, model architectures differ, and training recipes must be validated with the exact model, library versions, and hardware you use.

## Contents

11. DoRA, rsLoRA, and LoRA+
12. TIES, DARE, SVD-based merging, and adapter compatibility
13. Precision, quantization, optimizer states, activations, and memory
14. RLHF, PPO, reward models, preference data, DPO, KTO, and ORPO
15. Preference-data and alignment failure modes
16. A reproducible workflow with Hugging Face, PEFT, TRL, Unsloth, and tracking tools
17. Continued pretraining vs. instruction tuning for domain adaptation
18. Synthetic-data pipeline risks and verification
19. Reproducing a fine-tuning run
20. Comparing base and adapted models
21. Deciding whether LoRA is worth it
22. Integrated scenario and interview follow-ups
23. Rapid-review glossary and checklist

---

# 11. DoRA, rsLoRA, and LoRA+

## 11.1 Prerequisite: what is LoRA?

A neural network contains weight matrices. Fine-tuning changes weights so that the model becomes better at a task. Full fine-tuning may update billions of parameters, which can require substantial GPU memory for gradients and optimizer state.

**LoRA (Low-Rank Adaptation)** freezes the original weights and learns a smaller update. For a base weight matrix \(W\), a common form is:

\[
W' = W + \frac{\alpha}{r}BA
\]

Here:
- \(A\) and \(B\) are smaller trainable matrices.
- \(r\) is the adapter rank.
- \(\alpha\) is a scaling factor.
- \(W\) remains frozen in ordinary LoRA training.

LoRA is memory-efficient, but its parameterization and optimization are not perfect for every task. DoRA, rsLoRA, and LoRA+ target different limitations.

## 11.2 DoRA — Weight-Decomposed Low-Rank Adaptation

**Concept:** DoRA separates a weight into its **magnitude** and **direction**, then adapts them differently. The directional update is commonly represented using a low-rank parameterization, while magnitude is learned separately.

An analogy: when adjusting a radio signal, one control changes its strength while another changes its direction. If a task needs both types of change, controlling them separately may provide a more flexible update than a single low-rank adjustment.

### What problem does DoRA target?

LoRA constrains the change to a low-rank additive update. This is efficient, but the geometry of that update can make some changes harder to express. DoRA's decomposition is intended to make adaptation more expressive while retaining much of PEFT's memory benefit.

### Trade-offs

- Can improve quality over LoRA on some tasks and model families.
- May add training computation, implementation complexity, or extra parameters compared with a simple LoRA setup.
- Is not guaranteed to outperform LoRA; results depend on model, task, data, rank, and hyperparameters.
- Requires compatible tooling for training, saving, loading, merging, and inference.

### When to try it

Try DoRA when a well-tuned LoRA baseline falls short and your library supports the chosen model. Compare under the same data, compute budget, seeds, and held-out evaluation. Do not claim an improvement based on training loss alone.

## 11.3 rsLoRA — Rank-Stabilized LoRA

Classic LoRA commonly scales the adapter update by \(\alpha/r\). As rank increases, that factor decreases. **Rank-Stabilized LoRA (rsLoRA)** changes the scaling rule, commonly using \(\alpha/\sqrt{r}\), to help stabilize behavior across ranks.

Why might this matter? If you increase rank to give the adapter more capacity, you do not want the scaling rule itself to unintentionally make each configuration behave very differently. rsLoRA is designed to make higher-rank adaptation more practical in certain settings.

### Trade-offs

- Can make higher ranks more effective or easier to tune.
- Does not guarantee that a larger rank is better.
- Changes scaling, so learning-rate and alpha comparisons with ordinary LoRA are not automatically apples-to-apples.
- Requires implementation support and a clear record of which scaling variant was used.

### Interview point

Do not merely say “rsLoRA is a better LoRA.” Say that it changes rank-dependent scaling to address optimization behavior as rank increases, then emphasize empirical evaluation.

## 11.4 LoRA+ — Different learning rates for A and B

In basic LoRA training, the two low-rank matrices \(A\) and \(B\) commonly use the same learning rate. **LoRA+** proposes using different learning rates for them, often with the learning rate for \(B\) larger than the one for \(A\) according to a chosen ratio.

Why could this help? The two matrices play different roles in the low-rank update and can learn at different effective speeds. A single shared learning rate may not be ideal for both.

### Trade-offs

- Can improve convergence or final quality in some settings.
- Introduces another tuning choice: the ratio between learning rates.
- A ratio that helps one model or dataset may hurt another.
- Comparisons should control for total training steps, schedule, rank, and effective learning rates.

## 11.5 Comparison

| Method | Main change | Problem targeted | Main trade-off |
|---|---|---|---|
| LoRA | Low-rank additive update | Reduce trainable parameter count | Limited update capacity in some cases |
| DoRA | Separate weight magnitude and direction | Improve expressiveness of adaptation | Extra complexity and possible compute overhead |
| rsLoRA | Rank-stabilized scaling, commonly \(\alpha/\sqrt r\) | Improve behavior as rank increases | Different scaling requires controlled tuning |
| LoRA+ | Different learning rates for A and B | Improve optimization dynamics | Additional hyperparameter and recipe sensitivity |

## 11.6 Practical decision procedure

1. Establish a solid LoRA baseline.
2. Check data quality, target modules, rank, learning rate, and validation methodology.
3. Try one variant at a time.
4. Compare target quality and regression metrics under a similar compute budget.
5. Measure memory, throughput, saving/loading behavior, and inference compatibility.
6. Keep the more complex method only if the measured improvement justifies it.

## 11.7 Interview follow-ups

**Q: Does DoRA remove the low-rank constraint?**  
A: Not entirely. It commonly retains low-rank adaptation for the directional component while handling magnitude separately.

**Q: Why can rsLoRA help at higher ranks?**  
A: Its rank-dependent scaling is designed to avoid the way classic \(\alpha/r\) scaling can shrink the update as rank grows. Actual benefit depends on the training setup.

**Q: Is LoRA+ a different adapter architecture?**  
A: Its defining idea is a different optimization rule—separate learning rates for the two LoRA matrices—rather than simply increasing adapter rank.

---

# 12. TIES, DARE, SVD-based merging, and adapter compatibility

## 12.1 What is model or adapter merging?

Suppose you have one adapter for customer support, another for summarization, and another for structured extraction. **Merging** tries to combine the learned updates into one model or adapter, instead of loading each separately.

This sounds like combining three sets of improvements, but weight updates can conflict. An update that helps one task may undo an update that helps another. The fact that two adapters share the same base model does not guarantee that their updates combine cleanly.

Let each model or adapter have an update relative to a shared base:

\[
\Delta_i = W_i - W_{\text{base}}
\]

A simple merge might use a weighted sum:

\[
W_{\text{merged}} = W_{\text{base}} + \sum_i \lambda_i \Delta_i
\]

The coefficients \(\lambda_i\) control the contribution of each update. A naive sum can magnify updates, mix incompatible behaviors, or cause interference.

## 12.2 TIES merging

**TIES** is commonly expanded as *Trim, Elect Sign, and Merge*. Its broad idea is to reduce interference among task updates.

1. **Trim:** remove small-magnitude update values that may be less important or noisy.
2. **Elect sign:** determine a representative sign for competing update directions, often based on the dominant sign among task updates.
3. **Merge:** combine only update values compatible with the elected sign, using the method's specified aggregation rule.

The exact implementation contains details about density, sign election, and aggregation. Treat those settings as part of the experiment.

**Intuition:** if several people suggest changes to the same setting and half suggest “increase” while half suggest “decrease,” do not blindly add all suggestions. First identify the dominant direction and reduce conflicting changes.

**Trade-offs:** TIES can reduce interference for some tasks, but trimming may remove useful small updates, and sign agreement does not prove semantic compatibility. Evaluate each task after merging.

## 12.3 DARE merging

**DARE** stands for *Drop And REscale*. It randomly drops a portion of parameter-update values and rescales the remaining values to compensate for the dropped fraction, under assumptions about the update distribution.

A simplified intuition:
- Start with an update \(\Delta\).
- Randomly retain some entries and drop others.
- Rescale retained entries so the expected update magnitude is approximately preserved.
- Merge the resulting sparse/noisy updates according to the recipe.

DARE is motivated by the observation that many fine-tuning updates may be redundant or contain values that can be removed without destroying all useful behavior.

**Trade-offs:**
- Results can depend on drop rate, scaling rule, model, and merge recipe.
- Random dropping can remove useful values.
- It is not a universal guarantee of improved merging.
- Reproducibility requires recording random seeds and exact merge parameters.

## 12.4 SVD-based merging and compression

**Singular Value Decomposition (SVD)** represents a matrix as:

\[
\Delta W = U \Sigma V^\top
\]

The singular values in \(\Sigma\) describe the relative strength of directions in the update. Keeping only the largest \(k\) singular values gives a lower-rank approximation:

\[
\Delta W \approx U_k \Sigma_k V_k^\top
\]

This can be used to compress a merged update, project updates into a lower-rank representation, or analyze their dominant directions.

### What does SVD solve?

- Reduce the storage or deployment size of a dense merged update.
- Approximate a merged update with a low-rank representation.
- Help analyze whether an update has a compact dominant structure.

### Limitations

- Truncation discards information, including potentially useful small directions.
- SVD can be computationally expensive for large matrices.
- Matrix shapes and corresponding layer meanings must align.
- A low-rank approximation of weights does not guarantee preservation of task behavior.
- SVD alone does not resolve semantic conflicts between tasks; it compresses a numerical update.

## 12.5 Adapter merging: compatibility requirements

Before merging adapters, check:

1. **Same base model:** adapters should normally originate from the same exact base checkpoint or a demonstrably compatible revision.
2. **Same architecture and layer layout:** tensor shapes and module names must align.
3. **Same target modules:** adapters trained on different projections may not be directly mergeable.
4. **Rank and parameterization:** ranks can differ, but the merge method must support the mismatch and know how to reconstruct updates.
5. **Scaling conventions:** LoRA alpha, rsLoRA scaling, DoRA decomposition, and other variants may not be interchangeable.
6. **Tokenizer and vocabulary:** different tokenizers or embeddings can make a merged result incoherent even if some tensors have matching shapes.
7. **Training objectives and task conflicts:** one adapter may optimize a behavior that conflicts with another.
8. **Quantization state:** merging into quantized weights can require dequantization/requantization and may introduce error.
9. **Normalization and architecture-specific layers:** normalization, biases, embeddings, and output heads may have been handled differently.
10. **License and governance:** every source model and adapter must be permitted for the intended combined use.

## 12.6 Safe merge workflow

- Preserve the original base and each adapter.
- Confirm provenance, architecture, base revision, target modules, and configuration.
- Merge into a new artifact, never overwrite the source.
- Run smoke tests for loading and generation.
- Evaluate each adapter's original task and cross-task behavior.
- Compare unmerged routing against merged behavior.
- Test safety, format validity, latency, memory, and quantization effects.
- Roll back if a merge causes regression.

## 12.7 Interview questions

**Q: Why is simple weighted averaging risky?**  
A: Parameter updates can conflict, have different magnitudes, or rely on different base representations. Adding them may cause interference instead of combining capabilities.

**Q: Does SVD merging mean the model understands the tasks better?**  
A: No. SVD is a numerical decomposition and approximation technique. Whether the resulting model performs better must be tested.

**Q: Can I merge adapters trained from two similar models?**  
A: Not safely by default. Similar names or architectures are insufficient; exact base revisions, tensor shapes, target modules, and parameterization must be checked.

---

# 13. Precision, quantization, optimizer states, and activation memory

## 13.1 Why memory is more than model weights

A training job may need memory for:
- **Model weights:** parameters used in forward passes.
- **Gradients:** derivatives used to update trainable parameters.
- **Optimizer states:** stored statistics used by the optimizer, such as Adam's first and second moments.
- **Activations:** intermediate values saved for backpropagation.
- **Temporary workspaces:** attention kernels, matrix multiplication, communication buffers, and other operations.
- **KV cache:** usually an inference concern; ordinary training often does not retain a generation KV cache in the same way, though serving memory must be considered separately.

This explains why a model can fit on a GPU for inference but fail during full fine-tuning.

## 13.2 FP32, FP16, and BF16

| Format | Bits/value | Approximate raw memory per billion values | General characteristics |
|---|---:|---:|---|
| FP32 | 32 | 4 GB | High precision and wide range; memory-heavy |
| FP16 | 16 | 2 GB | Lower memory; narrower exponent range can cause overflow/underflow |
| BF16 | 16 | 2 GB | Similar exponent range to FP32, fewer mantissa bits; often robust for training |
| INT8 | 8 | 1 GB before scales/metadata | Compact quantized representation; behavior depends on quantization scheme |
| INT4 | 4 | 0.5 GB before scales/metadata | Very compact; greater approximation and implementation complexity |

These are rough decimal-memory estimates for raw values only. Real allocations are larger because of metadata, alignment, activations, temporary buffers, and runtime overhead.

### FP16

FP16 uses 16 bits per value. It saves memory and can improve throughput on supported hardware, but its limited exponent range can cause numerical problems. Mixed-precision training often keeps some sensitive calculations or master weights in higher precision, depending on the recipe.

### BF16

BF16 also uses 16 bits, but allocates more bits to the exponent and fewer to the fraction. Its wide dynamic range makes it attractive for deep-learning training on supported hardware. It has lower precision in the significand than FP16, but overflow/underflow behavior is often easier to manage.

### INT8 and INT4

These formats represent quantized values with fewer bits. Quantization maps floating-point weights to a smaller discrete representation, usually with scales and sometimes zero-points or other metadata. It reduces weight memory, but quantization error and kernel support matter.

**Critical distinction:** quantized storage does not mean every calculation is performed in that bit width. Some systems use specialized kernels, dequantize values for parts of computation, or use a higher-precision compute type.

## 13.3 Optimizer-state memory

Adam-style optimizers commonly maintain first- and second-moment estimates for trainable parameters. In some full fine-tuning setups, these states consume more memory than the gradients.

An illustrative rough accounting for one billion trainable parameters might be:
- FP16 weights: about 2 GB.
- FP16 gradients: about 2 GB.
- Two FP32 Adam states: about 8 GB.
- Optional FP32 master weights: another roughly 4 GB in recipes that use them.

That is already around 12–16 GB before activations and temporary buffers, and real frameworks differ. This is why parameter-efficient tuning can save a great deal: if only a small adapter is trainable, its gradient and optimizer states are also small.

## 13.4 Activation memory

During forward propagation, intermediate activations may need to be stored so gradients can be calculated during backpropagation. Activation memory depends on:
- Batch size.
- Sequence length.
- Hidden dimensions and layer count.
- Attention implementation.
- Precision.
- Whether gradient checkpointing is enabled.

Long sequences can be especially expensive. Standard dense attention has a quadratic sequence-length component, although modern attention implementations can reduce memory overhead.

### Gradient checkpointing

Checkpointing stores fewer intermediate activations and recomputes some of them during backward propagation. It trades additional compute time for lower activation memory.

### Other ways to manage memory

- Reduce per-device batch size and use gradient accumulation.
- Reduce sequence length if the task permits.
- Use BF16/FP16 mixed precision when supported.
- Use LoRA/QLoRA to reduce trainable-state and/or base-weight memory.
- Use efficient attention kernels supported by the model.
- Avoid unnecessarily large padding lengths.
- Measure actual peak memory rather than relying only on parameter-count arithmetic.

## 13.5 QLoRA and memory

QLoRA keeps the base model frozen and quantized—often using a 4-bit representation—while training LoRA adapters. This reduces base-weight memory and avoids optimizer states for the frozen base weights. The adapters still require gradients and optimizer state; activations remain a major cost.

QLoRA is not “free fine-tuning.” A very long sequence, large batch, or memory-intensive architecture can still exceed hardware limits.

## 13.6 Memory estimation example

Suppose a 7-billion-parameter model stores raw weights at 4 bits. A simple estimate is:

\[
7\times10^9 \times 0.5 \text{ bytes} \approx 3.5 \text{ GB}
\]

This is only the raw packed weight estimate. Actual quantized model memory is higher due to scales, metadata, unquantized modules, and framework overhead. Training also requires adapters, activations, temporary buffers, and possibly optimizer states for trainable parameters.

Do not promise that a model fits based only on this multiplication. Load a small test, inspect peak allocated and reserved memory, and test the intended maximum sequence length and batch configuration.

## 13.7 Interview questions

**Q: Why does a model fit for inference but not full fine-tuning?**  
A: Training adds gradients, optimizer states, and saved activations. Inference usually does not need all of these.

**Q: Why is BF16 often preferred over FP16 for training?**  
A: On supported hardware, BF16's wider exponent range can make numerical behavior more robust. Hardware and kernel support still matter.

**Q: Does QLoRA reduce activation memory automatically?**  
A: Not necessarily. It primarily reduces frozen base-weight memory. Activation memory still depends on batch size, sequence length, architecture, and checkpointing.

---

# 14. RLHF, PPO, reward models, preference data, DPO, KTO, and ORPO

## 14.1 From imitation to preferences

SFT teaches from target answers: “For this prompt, imitate this response.” Alignment methods can use preferences: “Response A is better than response B under this rubric.”

Preference-based training is useful when there are many acceptable answers but some are more helpful, truthful, safe, concise, or aligned with the product's desired behavior.

## 14.2 RLHF

**Reinforcement Learning from Human Feedback (RLHF)** is a family of methods that use human preferences or feedback to improve a model's behavior. A classic pipeline is:

1. Train a base language model.
2. SFT it on demonstrations.
3. Collect preference comparisons for model responses.
4. Train a reward model to predict which responses humans prefer.
5. Optimize the policy model using a reinforcement-learning algorithm, historically often PPO.
6. Evaluate for reward hacking, regressions, safety, and real task performance.

Modern alignment pipelines can use different algorithms and may not need every classic stage.

## 14.3 Preference data

A preference record often contains:
- A prompt.
- A chosen response.
- A rejected response.
- Optional annotator rationale, rubric scores, confidence, or metadata.

Example:

```json
{
  "prompt": "Explain password managers to a beginner.",
  "chosen": "A password manager securely stores unique passwords...",
  "rejected": "Use the same easy password everywhere..."
}
```

This example is schematic. In real data, the chosen answer should be reviewed for accuracy and safety; a pair only says which response is preferred, not that the preferred response is flawless.

## 14.4 Reward models

A **reward model** learns to score a response given a prompt, often trained so the chosen response scores higher than the rejected response.

A common pairwise loss is conceptually:

\[
L_{\text{reward}}=-\log \sigma(r_\phi(x,y_{\text{chosen}})-r_\phi(x,y_{\text{rejected}}))
\]

where \(r_\phi\) is the reward score and \(\sigma\) is the sigmoid function.

The score is not an objective measure of truth. It is a learned approximation of the preferences represented in the training labels.

## 14.5 PPO

**Proximal Policy Optimization (PPO)** is a reinforcement-learning algorithm that updates a policy while limiting how drastically it changes in one update. In classic RLHF, the language model is the policy, the reward model supplies a reward, and a reference model or KL penalty helps keep the policy from drifting too far.

A simplified loop:
1. Generate responses from the current policy.
2. Score them with the reward model.
3. Compute advantages, estimating which actions were better than expected.
4. Update the policy with a clipped objective that discourages excessively large policy changes.
5. Apply a KL-related constraint or penalty against a reference policy.
6. Repeat while monitoring reward, KL divergence, response quality, and safety.

**Advantages:** flexible and can optimize reward signals using generated rollouts.

**Costs and risks:** more moving parts, more compute, sensitivity to reward design, unstable optimization, and reward hacking. PPO is not inherently more aligned than direct preference methods.

## 14.6 DPO — Direct Preference Optimization

**DPO** learns from chosen/rejected pairs without requiring the same explicit online PPO loop and separately trained reward model at optimization time. It uses a reference policy and a preference objective derived from a particular model of preferences.

Conceptually, it encourages the policy to assign relatively higher probability to the chosen response than the rejected response, compared with the reference model. A common form uses the difference between policy and reference log-probability ratios and a sigmoid/logistic loss.

**Strengths**
- Simpler training loop than classic PPO-based RLHF.
- Works naturally with offline preference pairs.
- Avoids sampling rollouts from the evolving policy in the core training loop.

**Limitations**
- Depends on the quality and coverage of preference pairs.
- Still requires careful reference-model, beta, masking, and dataset configuration.
- Can overfit preferences or learn annotation artifacts.
- Offline data may not cover the policy's new behavior after training.

## 14.7 KTO — Kahneman–Tversky Optimization

**KTO** is a preference-optimization approach motivated by prospect-theory-style ideas about desirable and undesirable outcomes. Rather than requiring every training example to be a matched chosen/rejected pair, it can use examples labeled as desirable or undesirable, with an objective designed around a reference policy and a notion of utility.

**Why it matters:** preference labels may be easier to collect as “good/bad” or “desirable/undesirable” judgments than as carefully matched pairs.

**Trade-offs:** the label meaning and balance matter. KTO still depends on reliable labels, a sensible reference, and correct training implementation. It is not immune to noisy or biased judgments.

## 14.8 ORPO — Odds Ratio Preference Optimization

**ORPO** combines supervised learning on preferred responses with an odds-ratio-based preference term in a single training objective, rather than requiring the classic separate SFT stage followed by a preference stage in the same way as some pipelines.

In simple terms:
- The SFT component teaches the model to produce the chosen response.
- The preference component encourages the chosen response over the rejected response using a relative odds-based signal.

**Benefits:** a compact workflow and no separate reference model in the standard formulation.

**Trade-offs:** the two objective components must be balanced; chosen/rejected quality remains crucial; training behavior differs from DPO or PPO and should not be assumed equivalent.

## 14.9 Comparison

| Method | Typical supervision | Separate reward model? | Reference policy? | Core idea |
|---|---|---:|---:|---|
| Classic RLHF + PPO | Human preferences, often via comparisons | Yes | Commonly used | Optimize sampled policy responses using reward and constrained RL |
| DPO | Chosen/rejected pairs | No separate reward model needed during DPO optimization | Yes, in standard DPO | Directly optimize a preference-derived objective |
| KTO | Desirable/undesirable examples can be used without matched pairs | No separate reward model required in the usual setup | Commonly uses a reference policy | Optimize utility-style signals for good/bad outcomes |
| ORPO | Chosen and rejected responses, with preferred-response supervision | No separate reward model in standard ORPO | No separate reference model in standard formulation | Combine SFT-like likelihood training and odds-ratio preference loss |

The exact implementation details vary. Use the primary method documentation and the library's implementation when reproducing a result.

## 14.10 When to use which

- Use **SFT** when you need the model to learn the basic task and have strong demonstrations.
- Consider **DPO** when you have reliable chosen/rejected pairs and want a relatively straightforward offline preference-training workflow.
- Consider **KTO** when the available labels are naturally desirable/undesirable rather than paired comparisons.
- Consider **ORPO** when you want a combined preferred-response and preference objective supported by your tooling.
- Consider **PPO-based RLHF** when online rollouts and reward-driven optimization justify the extra engineering and compute.

No method can compensate for a fundamentally poor reward or preference signal.

## 14.11 Interview questions

**Q: Why use a reference model in DPO?**  
A: It anchors the policy comparison and regularizes how far the learned policy departs from the reference behavior. The exact objective and beta determine the strength of that effect.

**Q: Is DPO reinforcement learning?**  
A: It is commonly categorized as direct preference optimization rather than the classic online RL loop used by PPO-based RLHF. It optimizes a preference-derived objective from fixed comparisons.

**Q: Why can PPO produce high reward but poor answers?**  
A: The policy may exploit weaknesses in the reward model, producing responses that score well without actually meeting human goals. This is reward hacking.

---

# 15. Preference and alignment failure modes

## 15.1 Poor preference labels

If annotators select the wrong response, apply inconsistent standards, or lack domain knowledge, training pushes the model in the wrong direction.

**Example:** a judge prefers a confident but incorrect medical explanation over a cautious correct one because it sounds more decisive.

**Mitigations**
- Clear rubrics with examples.
- Domain-expert review for specialized claims.
- Annotator calibration and disagreement analysis.
- Confidence or uncertainty metadata where appropriate.
- Audit samples of chosen and rejected responses.
- Maintain a clean, independent gold evaluation set.

## 15.2 Reward hacking

Reward hacking occurs when a model finds a way to maximize the measured reward without achieving the intended goal.

Examples:
- It learns to produce long, polished answers because the judge favors detail, even when concise answers are better.
- It includes citation-looking strings that are not valid citations.
- It flatters the user or agrees with false assumptions to obtain high preference scores.
- It exploits a reward-model blind spot with superficial keywords.

**Mitigations**
- Evaluate real outcomes, not only reward-model scores.
- Use adversarial tests and independent judges.
- Penalize invalid formats or unsupported claims with explicit tests where possible.
- Track reward alongside truthfulness, safety, and task-specific metrics.
- Use human review and periodic reward-model recalibration.

## 15.3 Distribution mismatch

The preference data may not resemble production prompts, languages, user expertise, response lengths, or risk levels.

A model trained on short English answers may fail on long multilingual support conversations. A model trained on easy prompts may become overconfident on hard cases.

**Mitigations**
- Compare training and production distributions.
- Stratify evaluation by domain, length, language, difficulty, and risk.
- Add carefully reviewed examples for underrepresented groups and edge cases.
- Evaluate out-of-distribution behavior and abstention.

## 15.4 Judge bias

Human or model judges may favor:
- Longer responses.
- A particular writing style or dialect.
- Answers that sound confident.
- The judge model's own preferred phrasing.
- Familiar viewpoints or formatting.
- Responses that repeat rubric language without being correct.

**Mitigations**
- Use explicit, task-specific rubrics.
- Randomize answer order and hide model identity when possible.
- Test for position and length bias.
- Use multiple judges selectively and adjudicate disagreements.
- Compare judge scores against expert-reviewed examples.
- Track subgroup performance and avoid using a single scalar score as the only quality measure.

## 15.5 Pair construction problems

A preference pair can be weak if:
- Both responses are equally good or equally bad.
- The chosen answer is better only because it is longer.
- The rejected answer contains an obvious formatting error unrelated to the desired capability.
- The prompt is ambiguous.
- One response has access to evidence the other lacks.
- The pair contains different safety or privacy conditions that were not part of the intended comparison.

Filter ambiguous pairs or label them appropriately. Do not force a preference when no meaningful preference exists.

## 15.6 Interview questions

**Q: How would you detect reward hacking?**  
A: Look for reward improvements that do not transfer to independent human evaluation or real task outcomes. Inspect qualitative samples, use adversarial prompts, and track multiple metrics.

**Q: Why can a strong judge model still be biased?**  
A: Its preferences reflect training data, prompting, and systematic blind spots. Strong language ability does not guarantee objective judgment.

**Q: What is the safest way to report alignment progress?**  
A: Report a portfolio of metrics with confidence intervals and representative failure examples, not one reward score.

---

# 16. Reproducible fine-tuning with Transformers, Datasets, PEFT, TRL, Unsloth, and tracking tools

## 16.1 What each tool does

| Tool | Role in the workflow |
|---|---|
| Hugging Face Transformers | Load models/tokenizers, configure training, generation, and model saving |
| Hugging Face Datasets | Load, transform, version, and split datasets |
| PEFT | Configure and train adapters such as LoRA and supported variants |
| TRL | Provide training utilities for SFT and preference-optimization methods, depending on version |
| Unsloth | Offer optimized model loading/training paths for supported models and hardware |
| Experiment tracking (e.g., Weights & Biases, MLflow, or TensorBoard) | Track metrics, configurations, artifacts, comparisons, and experiment history |
| Git and a lockfile/environment export | Track code and dependency versions |
| Model/dataset registry or immutable storage | Preserve the exact inputs and outputs of the run |

Do not assume every combination is compatible. Verify versions and supported model architectures, precision, attention kernels, and objective implementations.

## 16.2 A workflow that is easy to reproduce

1. Select and pin the base-model revision.
2. Select an immutable dataset revision or checksum.
3. Record the tokenizer and chat template.
4. Write a versioned training configuration.
5. Set seeds for Python, NumPy, PyTorch, data splitting, and any sampling.
6. Record package versions, CUDA/driver/hardware information, and code commit.
7. Run data validation and a tiny smoke test.
8. Train while logging metrics and saving checkpoints.
9. Evaluate checkpoints on a fixed validation suite.
10. Save the final adapter/model, tokenizer/configuration, and evaluation outputs.
11. Re-run in a clean environment to test reproducibility.

## 16.3 Configuration example

A YAML-style configuration makes experiment choices visible and reviewable:

```yaml
experiment:
  name: support-sft-lora-v1
  seed: 42
  output_dir: ./runs/support-sft-lora-v1

model:
  id: organization/model-name
  revision: immutable_commit_or_tag
  method: lora
  rank: 16
  alpha: 32
  dropout: 0.05
  target_modules:
    - q_proj
    - v_proj

data:
  dataset_id: organization/support-sft
  revision: immutable_dataset_revision
  train_split: train
  validation_split: validation
  max_sequence_length: 2048

training:
  learning_rate: 0.0001
  per_device_train_batch_size: 2
  gradient_accumulation_steps: 8
  num_train_epochs: 2
  warmup_ratio: 0.03
  weight_decay: 0.0
  bf16: true
  gradient_checkpointing: true

evaluation:
  run_validation: true
  run_general_regression_suite: true
  save_metrics: true
```

This is a template. Replace placeholders and verify the options are supported by the model and installed trainer. Do not put API keys or secrets in the configuration file.

## 16.4 Illustrative SFTTrainer pattern

The following shows the shape of a training script using Transformers, Datasets, PEFT, and TRL. TRL's arguments and dataset conventions evolve, so verify them against the installed version before running.

```python
import random
import numpy as np
import torch

from datasets import load_dataset
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import LoraConfig
from trl import SFTConfig, SFTTrainer

SEED = 42
random.seed(SEED)
np.random.seed(SEED)
torch.manual_seed(SEED)
if torch.cuda.is_available():
    torch.cuda.manual_seed_all(SEED)

model_id = "your-model-id"
dataset_id = "your-dataset-id"

# For strong reproducibility, pin immutable revisions if supported by the source.
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id)

dataset = load_dataset(dataset_id)
train_data = dataset["train"]
eval_data = dataset["validation"]

peft_config = LoraConfig(
    r=16,
    lora_alpha=32,
    lora_dropout=0.05,
    target_modules=["q_proj", "v_proj"],  # Confirm names for your architecture.
    task_type="CAUSAL_LM",
)

training_args = SFTConfig(
    output_dir="./runs/support-sft-lora-v1",
    learning_rate=1e-4,
    per_device_train_batch_size=2,
    gradient_accumulation_steps=8,
    num_train_epochs=2,
    warmup_ratio=0.03,
    logging_steps=10,
    eval_strategy="steps",  # Argument names can vary by TRL/Transformers version.
    eval_steps=100,
    save_steps=100,
    report_to="none",
    seed=SEED,
)

trainer = SFTTrainer(
    model=model,
    args=training_args,
    train_dataset=train_data,
    eval_dataset=eval_data,
    processing_class=tokenizer,  # Check the installed TRL API.
    peft_config=peft_config,
)

trainer.train()
trainer.save_model("./runs/support-sft-lora-v1/final")
tokenizer.save_pretrained("./runs/support-sft-lora-v1/final")
```

### What must be adapted before use?

- Dataset fields must match the trainer's expected text or conversational schema.
- Apply the model's intended chat template.
- If assistant-only loss is required, configure and validate the appropriate masking behavior.
- Use the correct `eval_strategy`/argument names for your installed versions.
- Check `target_modules`, supported dtype, attention implementation, and GPU memory.
- Pin model and dataset revisions; an ID alone may point to changing content.
- Configure tracking and artifact logging rather than relying only on console output.
- Verify checkpoint resume behavior and final adapter loading.

The seed improves repeatability but does not guarantee bit-for-bit identity across hardware, library versions, kernels, distributed layouts, or nondeterministic operations.

## 16.5 Where Unsloth fits

Unsloth offers optimized paths for supported fine-tuning workloads, often intended to reduce memory or improve throughput. It can be useful when hardware is constrained or when its supported recipe matches your model and objective.

Use it as an implementation option, not a different scientific objective. For a fair comparison:
- Use the same data and split.
- Match the effective batch, sequence length, number of tokens/updates, and evaluation.
- Record its version and configuration.
- Confirm adapter artifacts can be loaded and evaluated in the target serving environment.

## 16.6 Experiment tracking

Record more than loss:
- Model and dataset revisions.
- Code commit and package versions.
- Seed and hardware.
- Training/validation loss.
- Task-specific quality metrics.
- Safety and general capability metrics.
- Peak memory and throughput.
- Learning rate and optimizer-step count.
- Checkpoint identifiers.
- Evaluation prompts/results and known limitations.

Avoid logging private user data or secrets. Store only the sample content needed for authorized debugging.

## 16.7 Interview questions

**Q: Why isn't setting a random seed enough?**  
A: Seeds control some sources of randomness, but results can still vary across hardware, kernels, library versions, distributed execution, and nondeterministic operations. Reproducibility also requires fixed data, code, dependencies, and configuration.

**Q: Why pin a model revision?**  
A: A model name can resolve to updated files later. An immutable revision ensures the experiment uses the same weights and tokenizer assets.

**Q: What is the difference between a checkpoint and a final model artifact?**  
A: A checkpoint captures training state at a point in time and may include optimizer/scheduler state for resuming. A final artifact is the selected deployable model or adapter plus required configuration and tokenizer assets.

---

# 17. Continued pretraining vs. instruction tuning for a specialized domain

## 17.1 Continued pretraining (CPT)

Continued pretraining continues the original language-model objective—usually next-token prediction—on a new corpus, such as technical manuals, scientific papers, legal text, or company documentation.

The model learns statistical patterns in the additional text: terminology, writing conventions, relationships, and domain-specific language. CPT does not necessarily teach it how to respond to user instructions in the desired format.

### When CPT helps

- The corpus is substantial, relevant, and legally usable.
- The model lacks familiarity with specialized vocabulary or text structure.
- The domain requires patterns not well represented in the original pretraining mix.
- There is enough compute and evaluation capacity to justify continued training.

### Risks

- The model can forget general skills.
- Raw text can contain noise, duplicates, stale claims, or sensitive information.
- Training on documents does not guarantee accurate question answering.
- Poorly balanced domain data can over-specialize the model.

## 17.2 Instruction tuning / SFT

Instruction tuning trains on examples that pair prompts or conversations with desired responses. It teaches how to answer, explain, summarize, extract, refuse, cite, or format.

For a domain assistant, examples might include:
- “Summarize this incident report in five bullets.”
- “Extract the effective date and responsible department as JSON.”
- “Answer using only the supplied policy excerpt; if evidence is missing, say so.”

### When SFT helps

- The model understands the language but follows the task poorly.
- Output formatting or workflow behavior must be consistent.
- You have reliable examples of desired domain-specific behavior.

### Risks

- It may imitate incorrect targets.
- It can overfit a narrow set of templates.
- It may not teach deep familiarity with a domain if the base model lacks it.
- Facts can become stale if trained into weights.

## 17.3 How to choose

| Situation | First option to evaluate |
|---|---|
| Model knows the concepts but gives the wrong format | Prompting, then SFT if needed |
| Facts change frequently and must be sourced | RAG |
| Model struggles with specialized terminology despite good evidence | CPT, better retrieval, or targeted SFT; diagnose first |
| Model needs a specific task workflow | SFT |
| Domain text is plentiful but instruction examples are scarce | CPT may help, followed by SFT if behavior needs shaping |
| Need both domain familiarity and reliable task behavior | CPT followed by SFT, evaluated against simpler alternatives |

## 17.4 A staged domain-adaptation experiment

1. Build a domain evaluation set with trusted answers.
2. Evaluate the base model with a strong prompt and relevant retrieved evidence.
3. Test retrieval quality independently.
4. If domain-language understanding is weak, evaluate CPT on a clean domain corpus.
5. If behavior remains poor, create targeted SFT examples.
6. Compare CPT-only, SFT-only, CPT+SFT, and RAG combinations where practical.
7. Test general capability retention, factual accuracy, calibration, and safety.

Do not assume CPT+SFT must be better than SFT alone. Additional training can add cost and regression risk.

## 17.5 Interview questions

**Q: Does CPT teach instruction following?**  
A: Not directly. It primarily continues the language-model objective on additional text. Instruction following usually requires suitable instruction data or other alignment methods.

**Q: Can SFT replace a domain corpus?**  
A: It can teach task behavior with a relatively focused dataset, but it may not supply the broad domain-language exposure that a substantial CPT corpus can provide.

**Q: Should facts be encoded with CPT or RAG?**  
A: For facts that change or need citations, RAG is usually the more maintainable source of truth. CPT can improve domain familiarity, not guarantee live factual correctness.

---

# 18. Synthetic-data pipelines: teacher errors, diversity, filtering, and verification

## 18.1 Why synthetic data is attractive

A teacher model can produce many examples quickly, including rare formats, edge cases, and difficult prompts. It can also produce a large volume of plausible but incorrect answers. Scaling generation without quality controls can scale mistakes.

## 18.2 Common failure modes

1. **Teacher hallucination:** false claims are accepted as targets.
2. **Prompt bias:** the generation prompt systematically omits certain cases or rewards one style.
3. **Low diversity:** examples use similar wording, assumptions, answer structures, or reasoning patterns.
4. **Self-training loop:** generated data resembles the teacher's existing outputs, reinforcing its weaknesses.
5. **Difficulty mismatch:** tasks are either trivial or impossible for the intended student.
6. **Constraint failure:** answers do not follow length, schema, citation, or safety requirements.
7. **Preference bias:** a judge favors polished language over truth.
8. **Data leakage:** benchmark items or their solutions appear in synthetic training data.
9. **Provenance loss:** no record remains of which teacher, prompt, or source produced an example.
10. **Over-filtering:** automated checks remove unusual but valuable examples.

## 18.3 A robust generation-and-validation pipeline

1. **Define coverage:** list task types, difficulty bands, languages, formats, and edge cases.
2. **Generate prompts from multiple sources:** human-authored templates, real anonymized tasks where permitted, domain rules, and carefully designed mutations.
3. **Use diverse generation settings or teachers:** avoid relying on one narrow output style.
4. **Generate candidates:** where feasible, produce more than one answer for hard tasks.
5. **Apply mechanical checks:** JSON schema, code execution, SQL validation, length constraints, and required fields.
6. **Verify facts:** compare against trusted references or use domain-specific validators.
7. **Use independent review:** human experts or a separate judge for a stratified sample.
8. **Deduplicate semantically:** inspect near-duplicates while retaining meaningful variations.
9. **Track provenance:** source, teacher/version, prompt template, generation settings, date, validators, and review result.
10. **Split by source/task family:** keep related synthetic variations together.
11. **Measure quality:** sample acceptance rate, error categories, coverage, duplicate rate, and performance on held-out real tasks.
12. **Iterate:** revise prompts and filters based on observed failures.

## 18.4 Example: validating structured synthetic outputs

```python
import json

REQUIRED_KEYS = {"title", "summary", "category"}

def validate_record(text: str) -> tuple[bool, str]:
    # Validate basic JSON structure; semantic correctness needs other checks.
    try:
        item = json.loads(text)
    except json.JSONDecodeError:
        return False, "invalid_json"

    if not isinstance(item, dict):
        return False, "not_an_object"

    missing = REQUIRED_KEYS - set(item.keys())
    if missing:
        return False, f"missing_keys:{','.join(sorted(missing))}"

    if not all(isinstance(item[key], str) for key in REQUIRED_KEYS):
        return False, "wrong_field_type"

    if not item["title"].strip() or not item["summary"].strip():
        return False, "empty_required_value"

    return True, "ok"

candidate = '{"title":"Password safety","summary":"Use unique passwords.","category":"security"}'
print(validate_record(candidate))
```

Expected output:

```text
(True, 'ok')
```

This only checks syntax and simple schema rules. It cannot establish that the summary is complete, the advice is correct, or the category is appropriate. Those require semantic validation.

## 18.5 Measuring diversity

Useful approaches:
- Count task categories, languages, lengths, and difficulty bands.
- Track repeated templates and phrase frequencies.
- Detect exact and near-duplicate prompts and answers.
- Inspect embedding clusters to find overrepresented patterns.
- Sample rare clusters manually.
- Compare synthetic and real evaluation distributions.
- Measure whether training on synthetic data improves held-out real tasks.

Diversity is not simply maximum lexical variety. The dataset should cover the intended deployment distribution and meaningful edge cases.

## 18.6 Interview questions

**Q: How do you know generated answers are correct?**  
A: Use task-specific checks, trusted references, executable tests, and human review. A fluent teacher answer is not proof of correctness.

**Q: How do you reduce diversity collapse?**  
A: Use multiple prompt families and data sources, vary task constraints, deduplicate, audit clusters, and evaluate on independent real examples.

**Q: Should all synthetic data be kept if it passes JSON validation?**  
A: No. Structural validity is only one layer. Content correctness, safety, relevance, coverage, and provenance also matter.

---

# 19. Reproducing a fine-tuning run

## 19.1 What does reproducibility mean?

Reproducibility means another person can reconstruct the experiment well enough to understand what was trained, with which data and settings, and obtain comparable results. Exact bit-for-bit reproduction may not be possible across different hardware, kernels, distributed layouts, or nondeterministic operations.

## 19.2 What to preserve

| Item | Why it matters |
|---|---|
| Base model ID and immutable revision | Identifies exact initial weights and model files |
| Tokenizer and chat template | Changes tokenization, boundaries, and target labels |
| Dataset revision and checksums | Prevents silent data changes |
| Train/validation/test split IDs | Ensures examples remain in the same partitions |
| Preprocessing code and version | Makes cleaning, filtering, and formatting reproducible |
| Full configuration | Records learning rate, batch, rank, sequence length, precision, and more |
| Random seeds | Controls some random operations |
| Code commit | Identifies exact implementation |
| Package versions and lockfile | Captures dependency behavior |
| Hardware, CUDA, driver, kernels | Helps explain numerical and performance differences |
| Logs and checkpoints | Shows training trajectory and supports resume/debugging |
| Evaluation data and metrics | Supports comparison and regression analysis |
| Final artifact hashes | Confirms which files were evaluated or deployed |

## 19.3 Seeds and deterministic behavior

Set seeds for Python, NumPy, PyTorch, data shuffling, splitting, and any generation sampling. Use deterministic operations only when supported and appropriate; they may reduce performance or still not cover every component.

A seed is necessary for many reproducibility goals, but it is not sufficient. Data order, distributed scheduling, package versions, and low-level kernels also matter.

## 19.4 Dataset versioning and checksums

For local data, compute a cryptographic hash of the exact files and save it in the experiment manifest. For remote datasets, pin an immutable commit/revision where possible and also record the selected split and preprocessing version.

Do not rely only on a dataset's display name. The underlying content may change.

## 19.5 Checkpoints and resume

A resumable checkpoint often needs:
- Model or adapter weights.
- Optimizer state.
- Learning-rate scheduler state.
- Global step and training progress.
- Random-number-generator state, when supported.
- Trainer state and configuration.

Saving only adapter weights may be enough for inference, but it may not be enough to resume training from precisely the same optimization state.

## 19.6 Example run manifest

```json
{
  "experiment_name": "support-sft-lora-v1",
  "base_model": {
    "id": "organization/model-name",
    "revision": "immutable_revision"
  },
  "dataset": {
    "id": "organization/support-sft",
    "revision": "immutable_revision",
    "train_sha256": "record_actual_hash_here",
    "validation_sha256": "record_actual_hash_here"
  },
  "code_commit": "record_actual_commit_here",
  "seed": 42,
  "config_file": "training.yaml",
  "environment_file": "requirements-lock.txt",
  "checkpoint": "checkpoint-1000",
  "evaluation_suite": "support-eval-v3"
}
```

The values above are placeholders, not real artifact identifiers. Store secrets outside the manifest and use access controls for private data.

## 19.7 Reproduction checklist

- [ ] Base-model revision is immutable.
- [ ] Dataset revision and hashes are recorded.
- [ ] Preprocessing and split scripts are versioned.
- [ ] Tokenizer and chat template are saved.
- [ ] Full configuration and seed are recorded.
- [ ] Package/environment versions are captured.
- [ ] Checkpoints and training logs are preserved.
- [ ] Evaluation data, prompts, decoding parameters, and results are versioned.
- [ ] Final model/adapter artifact hash is recorded.
- [ ] A clean-environment smoke test can load and evaluate the artifact.

## 19.8 Interview questions

**Q: Why save optimizer state?**  
A: It preserves the optimizer's running statistics and allows a more faithful resume. Saving only model weights restarts optimization state.

**Q: What is the difference between reproducibility and repeatability?**  
A: Usage varies across disciplines, but commonly repeatability means obtaining similar results in the same environment, while reproducibility means reconstructing the result independently from documented artifacts and procedures. State your definition in a project.

**Q: What if a rerun differs slightly?**  
A: Compare data hashes, versions, hardware, kernels, seeds, and training curves. Define acceptable tolerances and report numerical variability rather than claiming exact identity.

---

# 20. Comparing base and adapted models

## 20.1 Why one score is not enough

Fine-tuning may improve the target task while harming general reasoning, safety, calibration, or latency. A production decision should compare the complete behavior and resource profile, not only training loss or a single benchmark.

## 20.2 Build a held-out evaluation suite

Include:
- Representative target tasks.
- Difficult and rare cases.
- Inputs with missing or conflicting evidence.
- Safety and privacy cases.
- General capability regression tests.
- Out-of-distribution examples.
- Structured-output and tool-use tests where applicable.
- Long-context cases if they matter in production.

Keep a final test set that is not repeatedly used to tune prompts and hyperparameters.

## 20.3 Compare under controlled conditions

For both base and adapted models, hold constant where possible:
- Evaluation examples and ordering.
- System prompt and chat template.
- Decoding settings, such as temperature and max tokens.
- Retrieval index, retrieved context, and tool configuration.
- Hardware and serving stack for performance tests.
- Scoring rubric and judge protocol.

If the adapted model uses a different prompt or retrieval pipeline, evaluate both the model-only and end-to-end system so that changes are attributed correctly.

## 20.4 Quality metrics

Depending on the task:
- Exact match or accuracy for classification and extraction.
- Precision, recall, and F1 for structured prediction.
- JSON/schema validity for structured outputs.
- Code execution tests and unit-test pass rates.
- Human or expert ratings for nuanced answers.
- Citation precision, evidence support, and attribution correctness for RAG.
- Task completion and user outcome measures in production.

BLEU/ROUGE or other overlap metrics may be useful for some tasks, but they do not fully capture correctness or helpfulness for open-ended responses.

## 20.5 Safety and calibration

Test:
- Harmful request handling and safe refusals.
- Sensitive-data reproduction and privacy risks.
- Prompt injection and untrusted context behavior.
- Unsupported claims and hallucinations.
- Whether the model admits uncertainty or abstains when evidence is missing.
- False refusals on benign requests.
- Robustness across relevant languages and user groups.

Use authorized, controlled safety testing and report the test scope. No finite suite proves that a model is universally safe.

## 20.6 Generalization and capability retention

Compare performance by slice:
- In-distribution vs. out-of-distribution.
- Short vs. long prompts.
- Common vs. rare task types.
- Domain-specific vs. general questions.
- Different languages or formats, if relevant.

Averages can hide serious regressions. Report absolute scores, changes from baseline, sample sizes, and uncertainty where feasible.

## 20.7 Latency, memory, and cost

Measure in the actual target serving setup:
- Time to first token.
- End-to-end latency at realistic output lengths.
- Throughput at expected concurrency.
- Peak GPU/CPU memory.
- Model and adapter storage.
- Tokens per second.
- Cost per request or per successful task.
- Failure rate and retry overhead.

Quantization, adapter loading, longer responses, retrieval, and tool calls can change total system cost. A smaller model that needs repeated retries may not be cheaper per successful task.

## 20.8 A model comparison table

| Dimension | Base model | Adapted model | Decision question |
|---|---|---|---|
| Target task quality | Measure | Measure | Is improvement material? |
| General capabilities | Measure | Measure | Did important skills regress? |
| Safety/privacy | Measure | Measure | Did risk increase? |
| Grounding/citations | Measure | Measure | Are claims supported? |
| Format compliance | Measure | Measure | Is output more reliable? |
| Latency | Measure | Measure | Does it meet the service target? |
| Peak memory | Measure | Measure | Does it fit deployment hardware? |
| Cost per successful task | Measure | Measure | Is the gain worth the added cost? |
| Robustness | Measure | Measure | Does it generalize beyond seen patterns? |

## 20.9 Statistical caution

When evaluating a finite sample, differences can be due to sampling noise. For close comparisons:
- Use enough examples for the expected effect size.
- Report sample size and confidence intervals where practical.
- Use paired comparisons on the same examples.
- Repeat training seeds if training variability is important.
- Avoid repeatedly tuning against the final test set.

## 20.10 Interview questions

**Q: The adapted model wins on the target benchmark but loses on general reasoning. Do you ship it?**  
A: Not automatically. Quantify the importance of the regression, examine whether it is acceptable for the product, test mitigations, and consider routing or a hybrid system. Use explicit release criteria.

**Q: How do you compare cost fairly?**  
A: Measure the same production-like workload and include retries, output length, retrieval/tool calls, concurrency, and hardware utilization. Compare cost per successful task, not just cost per generated token.

**Q: Why evaluate the end-to-end system?**  
A: The product includes prompts, retrieval, tools, model serving, and post-processing. A better model-only score may not improve the full application.

---

# 21. Is LoRA worth it, or should you improve RAG, prompts, data, or application logic?

## 21.1 Start with the failure, not the technique

Fine-tuning is an intervention. First diagnose what is failing.

Examples:
- The model does not have current facts: retrieval or tools may be the answer.
- The right evidence is retrieved, but the model ignores it: prompt design, SFT, or preference training may help.
- Retrieved passages are irrelevant: fix chunking, search, metadata, or reranking.
- Outputs are malformed: schema-constrained generation, validation, and application logic may be simpler.
- Training labels are wrong: fix data quality before changing the model.
- The workflow requires exact calculations: use deterministic code or a tool rather than hoping fine-tuning teaches arithmetic reliably.
- Latency or cost is too high: quantization, caching, routing, or distillation may matter more than LoRA.

## 21.2 A diagnostic decision tree

1. **Can a better prompt solve the issue?** Test a prompt baseline with representative examples.
2. **Is the answer dependent on external or changing evidence?** Fix retrieval/tool access and evidence quality.
3. **Is retrieval good but the model fails to follow a stable behavior?** Build a small, high-quality SFT dataset and test LoRA.
4. **Are the labels or examples unreliable?** Repair the data first.
5. **Does a deterministic application step solve it more reliably?** Prefer the simpler, testable component.
6. **Does LoRA improve the held-out task without unacceptable regressions?** Consider deployment.
7. **Does the improvement justify maintenance and serving complexity?** If not, do not ship the adapter.

## 21.3 Comparison of interventions

| Intervention | Best suited for | Advantages | Limitations |
|---|---|---|---|
| Prompt improvement | Instructions, tone, format, task framing | Fast, low-cost, reversible | Context-dependent; may be inconsistent |
| RAG/retrieval improvement | Missing, stale, private, or citable facts | Updatable evidence, traceability | Requires good retrieval and grounding |
| Data-quality improvement | Incorrect or inconsistent targets | Helps all later training approaches | May require expensive review |
| Application logic/tools | Calculations, validation, workflows, exact schemas | Deterministic and testable | Requires engineering and integration |
| LoRA | Stable behavioral changes with enough examples | Small trainable footprint, modular | Training/evaluation burden; can still regress |
| Full fine-tuning | Broad or deep model adaptation when resources allow | Maximum weight flexibility | High cost and more regression risk |
| Distillation/quantization | Cost and latency reduction | Smaller or cheaper serving path | Quality trade-offs and compatibility work |

## 21.4 A controlled experiment to decide

Build four comparable baselines:
1. Base model with current prompt.
2. Base model with improved prompt.
3. Base model with improved RAG/application logic.
4. LoRA-adapted model, with the same relevant evidence and system conditions.

Evaluate on the same held-out examples. For each, record:
- Target task success.
- Safety and regression scores.
- Citation or schema validity.
- Latency, peak memory, and cost per successful task.
- Engineering and maintenance complexity.

If LoRA only gives a tiny score gain while making deployment harder, it may not be worth it. If it reliably improves a stable behavior across held-out cases and fits the operational constraints, it may be justified.

## 21.5 When LoRA is a strong candidate

- You have a stable target behavior.
- You can create enough high-quality examples.
- Prompt-only and application-level fixes have been tested.
- Retrieval supplies the required facts, but the model needs to use them more consistently.
- Full fine-tuning is too expensive.
- You can run meaningful validation and regression tests.

## 21.6 When LoRA is probably the wrong first step

- The knowledge changes every day.
- Retrieval is broken or the wrong document is being fetched.
- The labels are unreliable.
- A simple validator or tool call can guarantee correctness.
- The model lacks access to required information.
- There is no held-out evaluation set.
- You cannot afford to monitor or roll back the adapted model.

## 21.7 Interview answer template

**Question:** “How would you decide whether LoRA is worthwhile?”

**Strong answer:** “I would first identify the failure mode and establish a base-model baseline. I would test prompt improvements, retrieval/tool changes, and data quality before training. If the failure is a stable behavior that examples can teach, I would run a small LoRA experiment with a clean grouped train/validation split. I would compare target quality, safety, general capability retention, latency, memory, and cost on identical held-out examples. I would ship only if the improvement is material, repeatable, and worth the added operational complexity.”

---

# 22. Integrated scenario and interview follow-ups

## Scenario A: A model ignores retrieved evidence

**Situation:** Your RAG system retrieves the correct policy, but the model answers from general knowledge.

**Approach:**
1. Inspect whether the evidence actually appears in the final model prompt.
2. Check chunk ordering, truncation, citation requirements, and prompt clarity.
3. Test a stronger prompt and explicit evidence-grounding instructions.
4. Create SFT examples showing supported answers and abstention when evidence is absent.
5. Evaluate on both evidence-present and evidence-missing cases.
6. Keep retrieval and generation metrics separate.

**Why this matters:** Fine-tuning cannot fix evidence that never reaches the model. Diagnose the data flow before training.

## Scenario B: DPO improves preference scores but worsens factuality

**Approach:**
1. Audit chosen/rejected pairs for correctness and style bias.
2. Test whether judges favor confidence or length.
3. Compare on an independent factuality suite.
4. Inspect reference-model settings, learning rate, training steps, and preference strength.
5. Consider more reliable labels, a more balanced dataset, or returning to the previous checkpoint.

**Key lesson:** Preference score is a proxy, not the product goal.

## Scenario C: QLoRA fits but trains slowly

**Approach:**
1. Confirm the base model is actually quantized and frozen.
2. Inspect sequence length, batch size, gradient checkpointing, and attention kernel.
3. Measure data-loader throughput and GPU utilization.
4. Check whether quantization or unsupported kernels introduce overhead.
5. Profile before changing settings.
6. Compare throughput at a fixed quality target, not only raw steps per second.

## Scenario D: Two adapters must be merged

**Approach:**
1. Verify exact base revisions and architecture.
2. Compare target modules, ranks, scaling, and any DoRA/rsLoRA variants.
3. Preserve the original adapters and create a new merged artifact.
4. Evaluate each task separately and test interference.
5. Compare against runtime adapter routing, which may be safer than merging.
6. Validate quantized and serving versions independently.

## Scenario E: The run cannot be reproduced six weeks later

**Approach:**
1. Check whether the base model and dataset revisions were pinned.
2. Compare data hashes, preprocessing code, split IDs, and chat template.
3. Inspect package versions, hardware, kernels, seed, and configuration.
4. Verify whether the saved artifact is a final adapter or a resumable checkpoint.
5. Add a run manifest and immutable artifacts to the workflow.

## Scenario F: The adapted model is better but too costly to serve

**Approach:**
1. Measure cost per successful task and latency at expected concurrency.
2. Test quantization and adapter serving.
3. Distill into a smaller student if there is a suitable teacher/data path.
4. Use model routing so simple queries use a smaller model and difficult queries use the larger one.
5. Re-run quality and safety evaluations after each optimization.

---

# 23. Rapid-review glossary

- **BF16:** 16-bit floating-point format with a wide exponent range, commonly useful for training on supported hardware.
- **DPO:** Direct Preference Optimization; trains from chosen/rejected comparisons with a reference-policy-based objective.
- **DoRA:** Weight-Decomposed Low-Rank Adaptation; separates weight magnitude and direction.
- **DARE:** Drop And REscale; randomly drops and rescales update values as part of certain model-merging methods.
- **FP16:** 16-bit floating-point representation with a narrower exponent range than BF16.
- **Gradient checkpointing:** Recomputes some activations during backward propagation to save memory.
- **KTO:** Kahneman–Tversky Optimization; preference optimization that can work with desirable/undesirable labels without requiring matched pairs in the same way as DPO.
- **LoRA+:** LoRA optimization variant using different learning rates for its low-rank matrices.
- **ORPO:** Odds Ratio Preference Optimization; combines preferred-response supervised learning with an odds-ratio preference objective in its standard formulation.
- **PPO:** Proximal Policy Optimization; an RL algorithm often used in classic RLHF pipelines.
- **Preference data:** Labels or comparisons indicating which model responses are preferred.
- **Reward hacking:** Optimizing a reward signal in a way that does not achieve the intended real-world goal.
- **rsLoRA:** Rank-Stabilized LoRA; changes rank-dependent scaling, commonly to \(\alpha/\sqrt r\).
- **SVD:** Singular Value Decomposition; a matrix factorization used for analysis and low-rank approximation.
- **TIES:** Trim, Elect Sign, and Merge; a model-merging approach intended to reduce update interference.
- **Unsloth:** A toolkit offering optimized training paths for supported fine-tuning configurations.
- **Weight quantization:** Representing weights with lower-precision values to reduce memory and sometimes improve speed.

## Final interview checklist

Before approving an adaptation run, be ready to explain:

- [ ] Why the selected method fits the observed failure mode.
- [ ] How DoRA, rsLoRA, and LoRA+ differ from basic LoRA.
- [ ] Why merging model updates can cause interference.
- [ ] How weight, optimizer, and activation memory differ.
- [ ] How PPO-based RLHF differs from DPO, KTO, and ORPO.
- [ ] How preference labels and reward models can be exploited.
- [ ] How tools and dependencies are pinned for reproducibility.
- [ ] How CPT differs from instruction tuning.
- [ ] How synthetic outputs are verified, not merely generated.
- [ ] How the exact run can be reconstructed.
- [ ] How the base and adapted models are compared across quality, safety, regression, latency, memory, and cost.
- [ ] Why LoRA is better than—or worse than—prompt, RAG, data, or application improvements for this particular failure.

**Core principle:** Choose the smallest, most testable intervention that solves the measured problem. Fine-tuning, preference optimization, merging, and quantization are engineering choices whose value must be demonstrated on held-out tasks and the full production system.
