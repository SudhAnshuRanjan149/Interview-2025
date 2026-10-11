# AI Engineering Interview Guide — Part 2
## Evaluation Reliability, Experimentation, Production Outcomes, and CI Quality Gates

Beginner-friendly preparation notes for Questions 11–22.

This guide continues the evaluation topics in Part 1. It uses a fictional RAG assistant that answers questions from company policies, manuals, and support documents. The same methods apply to chatbots, agents, search systems, classifiers, and other AI products.

---

# 11. What are position bias, prompt sensitivity, judge inconsistency, and length bias, and how would you reduce their impact?

## Background: why can an LLM judge be biased?

An LLM-as-judge is a language model used to score or compare another model's output. It can be useful for flexible judgments such as relevance, completeness, or evidence support, but it is not a perfectly stable measuring instrument. The judge's score can depend on irrelevant presentation details.

Think of an exam grader who gives a different score depending on which essay is shown first, how long it is, or the wording of the grading instructions. Those effects are measurement bias, not necessarily a real difference in answer quality.

## 11.1 Position bias

**Position bias** occurs when a judge prefers the first or second answer in a pairwise comparison merely because of its position.

Example: Answer A is shown first and answer B second. The judge picks A. When the order is swapped, it picks B—even though the content has not changed.

Why it happens:
- The model may have a learned tendency to anchor on the first option.
- The prompt may unintentionally imply an order.
- The judge may compare one answer more carefully than the other.

How to reduce it:
1. Randomize answer order for each comparison.
2. Evaluate both orders: A vs. B and B vs. A.
3. Record order disagreement as a diagnostic metric.
4. Hide system/model identities where possible.
5. Use explicit criteria and require evidence for the preference.
6. For critical comparisons, have humans review order-sensitive cases.

A useful measure is **order-flip rate**: the fraction of pairs for which the winner changes when the order is reversed. A high rate means the comparison is not robust.

## 11.2 Prompt sensitivity

**Prompt sensitivity** means small changes in the judge instructions can materially change scores.

Examples:
- “Be generous” produces more passes than “be strict.”
- Moving an important rubric rule lower in a long prompt changes its influence.
- Adding examples unintentionally teaches the judge to favor one style.

Mitigations:
- Keep the rubric explicit, short, and dimension-specific.
- Version the exact judge prompt.
- Test paraphrases of the judge instructions on a calibration set.
- Freeze prompt and model settings during a benchmark run.
- Avoid tuning the judge prompt on the final holdout.
- Use structured output and explicit decision rules.
- Recalibrate whenever the judge model or prompt changes.

Do not try to remove all prompt sensitivity by writing an enormous prompt. Long prompts can introduce new ambiguity and distract from the key criteria.

## 11.3 Judge inconsistency

**Judge inconsistency** is the judge giving different ratings to the same case across repeated runs under supposedly identical conditions.

Potential causes:
- sampling temperature or stochastic decoding,
- model service updates,
- nondeterministic infrastructure,
- ambiguous rubric,
- long contexts and missed evidence,
- unstable formatting or truncated inputs.

How to measure it:
1. Select a representative sample.
2. Run each case multiple times under the same configuration.
3. Compare exact labels, score variance, and critical-failure decisions.
4. Repeat with a fixed model version and low-variance decoding where available.
5. Investigate cases that change from pass to fail.

For ordinal scores, report the fraction of exact agreement and perhaps average absolute score difference. For binary decisions, report pass/fail flip rate. A stable score is not necessarily a correct score, so consistency must be measured alongside human agreement.

## 11.4 Length bias

**Length bias** occurs when a judge favors longer answers or penalizes them, independent of substantive quality.

Example: Answer A directly gives the correct policy limit and exception in three sentences. Answer B repeats the same facts in eight paragraphs. A judge might prefer B because it sounds comprehensive, or penalize B because it is verbose.

Reduce length bias by:
- explicitly saying not to reward verbosity,
- scoring completeness against a checklist of required facts,
- comparing answers at similar lengths when practical,
- measuring judge scores against answer length,
- checking whether the winner changes after concise normalization,
- using claim-level evidence checks rather than overall style impressions.

Do not automatically shorten every answer. Length is sometimes necessary for multi-part questions; the target is useful completeness, not minimum word count.

## 11.5 Other related biases

- **Style bias:** polished language is mistaken for correctness.
- **Self-preference:** a judge favors outputs resembling its own model family.
- **Reference bias:** the judge assumes a reference answer is perfect even when it is wrong.
- **Context neglect:** a subtle contradiction is missed in a long context.
- **Position/order bias:** one option gets more attention than another.
- **Prompt injection:** text inside a document or candidate answer tries to instruct the judge.

Mitigations include blind evaluation, evidence-first rubrics, claim-level checks, source-span validation, randomized order, and human audits.

## 11.6 Example: test for position and length bias

For each pair of answers:
1. Score A vs. B.
2. Swap the order and score B vs. A.
3. Compare the selected winner after mapping results back to A and B.
4. Record both answers' lengths.
5. Compare judge choices with human-adjudicated choices.

Do not conclude that a judge is unbiased simply because it agrees with humans on an easy set. Include borderline cases and subtle factual errors.

### Interview answer
“I’d measure judge reliability rather than assume it. For position bias, I’d randomize and swap answer order and track winner-flip rate. For prompt sensitivity, I’d version and perturb the rubric on a calibration set. For inconsistency, I’d repeat runs and track label flips. For length bias, I’d compare scores with answer length and use claim-based criteria. I’d calibrate all of these against human judgments and keep critical checks deterministic where possible.”

### Follow-up questions

**Q: Does temperature zero guarantee deterministic judging?**  
No. It can reduce sampling variability, but service changes, infrastructure, ties, and implementation details can still create variation.

**Q: If a judge is consistent, can I trust it?**  
Not automatically. It can consistently apply a flawed rubric. Measure both consistency and agreement with reliable human labels.

---

# 12. How would you use Ragas, DeepEval, TruLens, Arize Phoenix, or a custom evaluation harness in a repeatable workflow?

## 12.1 First understand the evaluation workflow

An evaluation framework is a toolkit for running tests, calculating metrics, logging results, and comparing system versions. It does not automatically guarantee valid labels or meaningful metrics.

A repeatable workflow needs:
- fixed test cases and source snapshots,
- a defined system configuration,
- stable metric definitions,
- recorded model and prompt versions,
- consistent output schemas,
- human-reviewed calibration examples,
- saved per-case results,
- CI integration and release rules.

Framework APIs and feature names can change, so verify current package documentation before adopting a specific version. Choose based on your architecture, metric needs, tracing requirements, deployment constraints, and team familiarity—not popularity alone.

## 12.2 Ragas

Ragas is associated with evaluating RAG systems. Depending on version and configuration, its metric ecosystem can include dimensions such as context precision, context recall, faithfulness, and answer relevance/correctness.

Typical workflow:
1. Prepare rows with a question, retrieved contexts, generated answer, and reference information if the chosen metric requires it.
2. Run the selected metrics.
3. Inspect per-example results, not only aggregate averages.
4. Validate LLM-based metric outputs against human labels.
5. Save the dataset, metric version, judge model, and configuration.

Use it when you want a RAG-oriented evaluation workflow and metrics that operate on questions, contexts, and answers. Check the exact definitions: similarly named metrics across libraries may not use identical formulas.

## 12.3 DeepEval

DeepEval is a testing-oriented evaluation framework often used to define test cases, metrics, and evaluation runs for LLM applications.

Typical workflow:
1. Define test cases and expected information.
2. Select relevant metrics and thresholds.
3. Run the evaluation locally or in CI.
4. Review failed cases and their reasons.
5. Gate a build when required metrics fail.

Use it when a team wants an evaluation workflow that feels similar to a test suite. Confirm how each metric is computed and whether it requires a judge model.

## 12.4 TruLens

TruLens focuses on evaluating and observing LLM applications, including RAG-style feedback functions and tracing-oriented workflows, depending on the version and integrations.

Typical workflow:
1. Instrument the application so inputs, retrieval, context, and outputs are recorded.
2. Define feedback/evaluation functions for the dimensions of interest.
3. Run representative evaluations.
4. inspect traces to identify where the system failed.
5. Compare quality signals across application versions.

Use it when understanding the path through an LLM application is as important as obtaining a final score. Ensure logs do not expose secrets or data users are not authorized to see.

## 12.5 Arize Phoenix

Arize Phoenix is associated with observability, tracing, and evaluation workflows for LLM applications. Exact capabilities depend on release and integration.

Typical workflow:
1. Instrument traces for query, retrieval, context, model call, and response.
2. Attach evaluation labels or run evaluators over traces.
3. Filter traces by failure category or application version.
4. Inspect examples and compare cohorts.
5. Feed recurring production failures into the offline benchmark.

Use observability tooling when the key question is “where did this production request go wrong?” rather than only “what is the aggregate score?”

## 12.6 Custom evaluation harness

A custom harness is code your team owns to load test cases, call system versions, compute metrics, and produce reports.

Use one when:
- the product has unusual requirements,
- you need precise control over metrics or privacy,
- existing frameworks do not fit the data model,
- you need a small, transparent CI test suite,
- integration with internal systems is important.

Trade-off: your team must maintain metrics, reporting, retries, storage, and compatibility.

## 12.7 Framework comparison

| Tool | Typical strength | Useful when | Watch out for |
|---|---|---|---|
| Ragas | RAG-oriented metrics | Comparing retrieval context and answer behavior | Metric definitions and judge calibration |
| DeepEval | Test-case and threshold workflow | CI-style LLM tests | Version/API changes and metric assumptions |
| TruLens | Feedback and application evaluation | Connecting feedback to app behavior | Instrumentation and data governance |
| Arize Phoenix | Tracing and evaluation observability | Debugging individual traces and production cohorts | Trace privacy and integration details |
| Custom harness | Full control and tailored logic | Specialized metrics or strict internal requirements | Maintenance burden |

These are not mutually exclusive. For example, a team may use tracing/observability for production diagnosis and a custom, deterministic CI harness for release gates.

## 12.8 Recommended repeatable workflow

1. **Freeze test inputs:** dataset version, expected evidence, and corpus snapshot.
2. **Freeze configuration:** model ID/version, prompt, embedding model, retriever, reranker, chunking, top-K, and decoding settings.
3. **Run retrieval:** save ranked document IDs and scores.
4. **Run generation:** save context, answer, citations, latency, token use, and errors.
5. **Calculate deterministic metrics:** schema validity, IDs, exact fields, retrieval metrics.
6. **Calculate semantic metrics:** calibrated judge metrics for groundedness, relevance, and completeness.
7. **Save per-case output:** include failure category, not just averages.
8. **Compare to baseline:** compute absolute and relative changes, including category slices.
9. **Apply release gates:** critical invariants, quality thresholds, regression limits, cost, and latency.
10. **Publish artifacts:** machine-readable results plus a human-readable summary.
11. **Review failures:** turn new failure types into test cases.
12. **Version everything:** dataset, corpus, code, metrics, judge, and system config.

### Minimal custom harness sketch

```python
def evaluate_case(case, system, metrics):
    # The system should expose retrieval and generation separately.
    retrieved = system.retrieve(case["query"])
    answer = system.generate(case["query"], retrieved)

    result = {
        "case_id": case["case_id"],
        "retrieved_ids": [item["id"] for item in retrieved],
        "answer": answer["text"],
        "citations": answer.get("citations", []),
    }

    # Metric functions receive the gold labels and observed output.
    for name, metric_fn in metrics.items():
        result[name] = metric_fn(case, retrieved, answer)

    return result
```

This is an illustrative interface; actual method names depend on your application. A production harness also needs error handling, retries, timeouts, logging controls, deterministic configuration, and secure storage.

### Interview answer
“I’d choose the framework based on whether I need RAG metrics, CI-style test cases, application feedback, or trace-level observability. Regardless of tool, I’d freeze datasets and configurations, save per-case retrieval and answer outputs, calibrate semantic judges, compare against a baseline, and enforce release gates in CI. The framework is an implementation aid; the quality of labels and experimental design remains our responsibility.”

### Follow-up questions

**Q: Should I use every framework?**  
No. Start with the smallest set that meets your needs. More tools can mean duplicate metrics, inconsistent definitions, and operational overhead.

**Q: Can framework scores be compared directly?**  
Only after checking their definitions, inputs, aggregation, judge models, and versions. Two metrics with the same name may differ.

---

# 13. Regression tests, offline experiments, online A/B tests, shadow evaluations, and canary evaluations

These methods answer different questions. Think of them as stages of confidence, from repeatable lab tests to cautious exposure to real traffic.

## 13.1 Regression tests

A regression test checks whether a change broke behavior that used to work.

Examples:
- A known policy question no longer retrieves the current policy.
- A citation ID becomes invalid.
- A prompt change causes the model to omit a required exception.
- A permission filter starts returning restricted content.

**Strengths:** fast, repeatable, good for CI and known failure prevention.  
**Limitations:** only covers cases represented in the tests; does not prove production success.

## 13.2 Offline experiments

Run candidate systems on a fixed dataset without exposing users to them.

Compare:
- retrieval quality,
- answer quality,
- citations,
- latency and token cost,
- category-level failure rates.

**Strengths:** controlled, reproducible, cheaper and safer than exposing every candidate to users.  
**Limitations:** benchmark may not represent live traffic, and judges or labels may be imperfect.

## 13.3 Online A/B tests

Randomly assign eligible users or sessions to a control system and a treatment system, then compare outcomes.

Possible outcomes:
- task completion,
- user satisfaction,
- escalation rate,
- successful self-service,
- time to answer,
- abandonment,
- repeat contacts.

**Strengths:** measures real-user outcomes under live conditions.  
**Limitations:** requires enough traffic and careful randomization; can be confounded by novelty, seasonality, interference between users, or concurrent product changes.

Choose the randomization unit carefully. If one user sees both systems, carryover effects may contaminate results; user-level assignment can avoid that when appropriate.

## 13.4 Shadow evaluation

The production request is served by the current system, while a candidate system also processes a copy of the request in the background. The candidate response is not shown to the user.

Useful for:
- measuring candidate latency and cost,
- checking behavior on real query distributions,
- comparing retrieval and answer quality,
- finding edge cases before rollout.

Limitations:
- candidate calls still cost money,
- user data must be handled under the same privacy and permission rules,
- generated answers may need offline judges or human labels because users did not see them,
- side effects must be disabled for agents that can act.

## 13.5 Canary evaluation

A candidate is exposed to a small portion of live traffic or a small set of users, with monitoring and a rollback path.

Useful for detecting:
- unexpected production latency,
- infrastructure problems,
- quality failures missed offline,
- changes in cost and error rates.

A canary is not automatically a statistically powered A/B test. Its primary purpose may be safe exposure and early fault detection rather than proving a small quality improvement.

## 13.6 Comparison table

| Method | Where it runs | User sees candidate? | Main purpose |
|---|---|---:|---|
| Regression test | Fixed tests / CI | No | Prevent known failures |
| Offline experiment | Frozen benchmark | No | Compare controlled candidate behavior |
| Shadow evaluation | Live request copies | No | Test against real traffic distribution |
| Canary | Small live cohort | Yes, some users | Detect rollout risks safely |
| A/B test | Randomized live cohorts | Yes | Estimate causal effect on user outcomes |

## 13.7 A sensible progression

1. Run unit and deterministic regression tests.
2. Run offline retrieval and answer evaluation.
3. Shadow the candidate on privacy-safe live traffic.
4. Canary the candidate to a small cohort with strict rollback triggers.
5. Run a powered A/B test when you need evidence of user-outcome improvement.
6. Continue monitoring after full rollout.

The order can vary with risk and architecture. A safety-critical change may require stronger offline evidence and expert review before any live exposure.

### Interview answer
“Regression tests protect known behavior, offline experiments compare candidates on fixed data, shadow evaluation tests candidates on real request distributions without showing their answers, canaries limit exposure while monitoring risk, and A/B tests estimate live user impact through randomization. I’d choose based on the question being answered and the risk of exposing users.”

### Follow-up question

**Q: If a canary looks good, do we still need an A/B test?**  
If the goal is merely to verify operational safety, perhaps not. If the goal is to prove that a small quality or business-outcome improvement is real, a properly designed experiment may be necessary.

---

# 14. Paired comparisons, bootstrap confidence intervals, significance testing, and power analysis

## 14.1 Why statistics matter

Suppose a new model scores 91% and the current model scores 90%. Is the new model truly better, or did it happen to receive easier cases? Statistics help quantify uncertainty. They do not repair bad labels, biased sampling, or an irrelevant benchmark.

## 14.2 Paired comparisons

In a paired design, both systems are evaluated on the same cases.

Example:

| Case | Current model | New model |
|---|---:|---:|
| 1 | 1 | 1 |
| 2 | 0 | 1 |
| 3 | 1 | 1 |
| 4 | 1 | 0 |

Here 1 means pass and 0 means fail. The new model gains on case 2 and loses on case 4. Compare the case-level outcomes, not just separate averages.

Why pairing helps: each case has its own difficulty. Testing both systems on the same questions controls for much of that variation.

For binary outcomes, McNemar's test can be useful because it focuses on discordant pairs. For paired continuous or ordinal scores, paired permutation tests or appropriate paired tests may be useful. Select a test that matches the metric and design.

## 14.3 Bootstrap confidence intervals

Bootstrapping estimates uncertainty by repeatedly resampling observed examples with replacement and recalculating a statistic.

For comparing systems:
1. Store each case's score for both systems.
2. Sample case IDs with replacement.
3. Calculate the metric difference for the sampled cases.
4. Repeat many times.
5. Use percentiles of the resulting differences as a confidence interval.

For paired data, resample **cases as pairs**, not each system's scores independently. This preserves the within-case relationship.

A 95% bootstrap interval for the score difference that lies entirely above zero is evidence of a positive difference under that resampling procedure. It is not proof that the improvement generalizes to every production population.

## 14.4 Statistical significance testing

A significance test evaluates how compatible the observed data are with a specified null hypothesis.

Common concepts:
- **Null hypothesis:** no difference under the test's assumptions.
- **p-value:** probability, assuming the null and model assumptions, of observing results at least as extreme as those seen.
- **Significance level:** a prechosen threshold such as 0.05.
- **Effect size:** how large the difference is, not just whether it is statistically detectable.

A p-value is not the probability that the null hypothesis is true. Statistical significance is not the same as practical importance.

When many metrics or slices are tested, false discoveries become more likely. Predefine primary metrics and consider appropriate multiple-comparison procedures.

## 14.5 Power analysis

Power analysis estimates how many observations are needed to detect an effect of a chosen size with a chosen probability, given assumptions about variability and significance level.

Inputs often include:
- baseline rate or variance,
- minimum effect worth detecting,
- desired statistical power (often 80% or 90%),
- significance level,
- whether the design is paired or independent,
- expected attrition or unusable observations.

**Minimum detectable effect (MDE)** is the smallest effect the experiment is designed to reliably detect. A tiny MDE generally requires more data.

Do power analysis before the experiment where possible. Repeatedly checking results and stopping as soon as p < 0.05 can inflate false-positive rates unless a valid sequential-testing plan is used.

## 14.6 Illustrative paired bootstrap code

This example compares two systems on a binary pass/fail metric and estimates a confidence interval for the difference in pass rate. It uses the same case indices for both systems.

```python
import random
import statistics

def paired_bootstrap_difference(old_scores, new_scores,
                                n_boot=10000, seed=7):
    """
    Scores are aligned per case; each score is 0 or 1.
    Returns observed new-minus-old difference and a percentile interval.
    """
    if len(old_scores) != len(new_scores):
        raise ValueError("Systems must be evaluated on the same cases.")
    if not old_scores:
        raise ValueError("At least one case is required.")

    rng = random.Random(seed)
    n = len(old_scores)
    observed = statistics.mean(new_scores) - statistics.mean(old_scores)
    differences = []

    for _ in range(n_boot):
        # Sample case indices as pairs, preserving each case's two outcomes.
        indices = [rng.randrange(n) for _ in range(n)]
        old_mean = statistics.mean(old_scores[i] for i in indices)
        new_mean = statistics.mean(new_scores[i] for i in indices)
        differences.append(new_mean - old_mean)

    differences.sort()
    lower = differences[int(0.025 * n_boot)]
    upper = differences[min(int(0.975 * n_boot), n_boot - 1)]
    return observed, (lower, upper)

old = [1, 0, 1, 1, 0, 1, 0, 1]
new = [1, 1, 1, 1, 0, 1, 1, 1]

difference, interval = paired_bootstrap_difference(old, new)
print("Observed difference:", round(difference, 3))
print("Approx. 95% bootstrap interval:",
      (round(interval[0], 3), round(interval[1], 3)))
```

Expected output:

```text
Observed difference: 0.25
Approx. 95% bootstrap interval: (0.0, 0.5)
```

Exact percentile output can depend on implementation details. With this small sample, the interval is wide; the observed improvement is promising but uncertain.

### Limitations of this example
- Eight cases are far too few for a robust general conclusion.
- Percentile bootstrap intervals can be rough for small, discrete samples.
- Real evaluations may require stratified or cluster bootstrap if cases are grouped by user, customer, or document.
- A binary pass metric loses information from graded scores.

## 14.7 Practical statistical workflow

1. Choose a primary metric before looking at results.
2. Define the target population and sampling method.
3. Evaluate both candidates on the same cases when possible.
4. Estimate the effect size and uncertainty.
5. Choose a suitable paired test or bootstrap procedure.
6. Check category-level and critical-failure results.
7. Account for multiple comparisons when necessary.
8. Decide whether the improvement is practically meaningful, not only statistically significant.
9. For live experiments, define sample size and stopping rules in advance.

### Interview answer
“I’d use paired examples to control for query difficulty, estimate uncertainty with a paired bootstrap, and select significance tests that match the metric. I’d run power analysis before an online test using a minimum detectable effect and desired power. I’d report effect sizes and confidence intervals, control multiple comparisons, and avoid interpreting a p-value as proof of practical value.”

### Follow-up questions

**Q: Why not compare two independent averages?**  
You can, but paired evaluation usually has better precision when both systems answer the same cases because case difficulty is controlled.

**Q: If the confidence interval includes zero, is the new model useless?**  
Not necessarily. The experiment may be underpowered. The result means the data do not clearly distinguish the difference at that uncertainty level; inspect interval width and the effect size that matters.

---

# 15. Measuring inter-annotator agreement and resolving human disagreements

## 15.1 Why agreement matters

Human labels often become the reference for evaluating models and judges. If two trained reviewers cannot apply the rubric consistently, the dataset may not support precise conclusions.

Agreement is not the same as truth: two reviewers can agree and both be wrong. Use authoritative sources, expert adjudication, and label audits as well.

## 15.2 Raw agreement

For two reviewers, raw agreement is:

\[
\text{Agreement}=\frac{\text{cases with matching labels}}{\text{cases reviewed by both}}
\]

If they agree on 90 of 100 cases, raw agreement is 90%.

It is simple but does not adjust for agreement expected from the label distribution. If almost every example is “pass,” reviewers can have high raw agreement by mostly choosing pass.

## 15.3 Cohen's kappa

For two raters assigning categorical labels:

\[
\kappa=\frac{p_o-p_e}{1-p_e}
\]

- \(p_o\): observed agreement.
- \(p_e\): expected agreement from the raters' label distributions under the kappa model.

Kappa adjusts for chance agreement, but it can behave unexpectedly when labels are highly imbalanced. Always report the confusion matrix and class counts too.

## 15.4 Weighted kappa and other measures

- **Weighted Cohen's kappa:** for ordered labels such as 0, 1, 2; larger disagreements can receive larger penalties.
- **Krippendorff's alpha:** supports multiple raters and different measurement levels with an appropriate variant.
- **Fleiss' kappa:** commonly used for multiple raters assigning categorical labels under its assumptions.
- **Intraclass correlation (ICC):** may be useful for continuous numeric ratings, depending on the design.

Choose a measure that matches the label type, number of raters, missing labels, and study design. Do not select a statistic merely because it is familiar.

## 15.5 A good disagreement-resolution workflow

1. **Write an operational rubric.** Define labels with positive and negative examples.
2. **Train reviewers.** Score a small pilot and discuss misunderstandings before full labeling.
3. **Label independently.** Reviewers should not see each other's scores initially.
4. **Measure agreement.** Report raw agreement, a suitable chance-adjusted metric, class counts, and confusion matrices.
5. **Review disagreements.** Categorize them: ambiguous query, unclear rubric, missing evidence, outdated source, or reviewer error.
6. **Adjudicate.** A qualified domain expert or a documented consensus process decides the final label.
7. **Improve the rubric.** If a disagreement reveals a rule gap, update the rubric and version it.
8. **Audit after changes.** Re-label a sample to ensure the revised instructions improve consistency.

Do not resolve disagreements by automatically taking the majority vote when the underlying evidence is ambiguous or one reviewer has relevant domain expertise. Use documented adjudication.

## 15.6 Example

Reviewers score answer groundedness as 0, 1, or 2:
- Reviewer A: `[2, 2, 1, 0, 2]`
- Reviewer B: `[2, 1, 1, 0, 2]`

They agree on 4 of 5 cases, or 80% raw agreement. The disagreement on case 2 should be inspected. Perhaps one reviewer considers an unsupported detail material, while the other considers it minor. The fix may be a clearer rubric definition, not merely telling one reviewer to change the label.

### Interview answer
“I’d have reviewers label independently against a rubric, calculate raw and suitable chance-adjusted agreement, and inspect the confusion matrix. I’d categorize disagreements, adjudicate with a domain expert, update the rubric when rules are unclear, and version any relabeling. Agreement is a measure of consistency, not proof that the labels are correct.”

### Follow-up question
**What if agreement is low?** Pause large-scale annotation, inspect disagreement causes, clarify definitions and examples, retrain reviewers, and pilot again. Low agreement can make downstream benchmark scores unreliable.

---

# 16. Measuring evaluation coverage and deciding whether a benchmark reflects production traffic

## 16.1 Coverage is more than dataset size

Evaluation coverage asks whether the test suite adequately represents the scenarios the product must handle. A benchmark can contain many examples and still miss important dimensions.

Useful coverage dimensions:
- query intents and frequency bands,
- document and source types,
- answerability,
- risk severity,
- languages,
- temporal behavior,
- number of evidence sources,
- user roles and permissions,
- latency and context length,
- known failure modes,
- new or long-tail user behaviors.

## 16.2 Measure coverage explicitly

Create a coverage matrix with expected categories and observed case counts.

Example:

| Category | Estimated production share | Evaluation cases | Coverage concern |
|---|---:|---:|---|
| Common FAQ | 50% | 500 | Well represented |
| Multi-document | 25% | 40 | May be too small for precise slice score |
| Unanswerable | 15% | 100 | Deliberately oversampled |
| Temporal/high-risk | 10% | 100 | Oversampled for safety |

The example intentionally oversamples rare but important categories. This can be appropriate for stress testing, but the resulting raw overall average no longer represents production traffic unless weights are adjusted.

Track:
- **category coverage:** are all required categories present?
- **sample sufficiency:** is each category large enough for a useful estimate?
- **feature coverage:** are key combinations represented, such as temporal + multi-hop?
- **failure-mode coverage:** are known incidents represented as regression tests?
- **distribution similarity:** how closely does the sample match real traffic?
- **unknown unknowns:** use recent production audits and open-ended failure discovery.

A coverage percentage can be useful, but it must be defined. “We cover 90% of categories” is not meaningful unless categories and importance are specified.

## 16.3 Compare benchmark and production distributions

For important features, compare distributions between the benchmark and production:
- query length,
- language,
- intent/category,
- answerability,
- retrieval depth,
- document types,
- user role,
- context size,
- traffic time period.

Possible tools include:
- difference in category proportions,
- histograms and quantiles,
- population stability index (PSI) where appropriate,
- divergence measures such as Jensen–Shannon divergence for distributions,
- embedding-space comparisons for semantic patterns.

These measures flag differences; they do not prove representativeness. The categories and features must capture what matters.

## 16.4 Weighting and oversampling

There are two different goals:

1. **Production estimate:** estimate average performance under the actual production distribution. Use representative sampling or appropriate traffic weights.
2. **Stress test:** deliberately emphasize rare, difficult, or high-risk cases. Report it separately.

If the evaluation oversamples a category, use production weights to estimate traffic-average performance when those weights are trustworthy. Also report unweighted category-level results so poor performance on rare high-risk cases is not hidden.

## 16.5 Avoid survivorship bias

Do not sample only successful conversations, only cases with user feedback, or only questions that have obvious reference answers. Include abandoned tasks, escalations, unanswerable questions, and negative feedback when lawfully and appropriately available.

### Interview answer
“I’d define coverage dimensions from product requirements and observed failures, measure counts and uncertainty per category, and compare the benchmark's feature distribution with recent production traffic. I’d distinguish a production-representative score from an intentionally oversampled stress-test score, using traffic weights only when the sampling assumptions are defensible.”

### Follow-up question
**Should the benchmark match production exactly?** Not entirely. It should represent production for realistic estimates while deliberately including rare critical cases for safety. Report these two purposes separately.

---

# 17. Comparing quality, latency, and cost across models using fixed examples and randomized answer ordering

## 17.1 Use a controlled comparison

To compare model A and model B fairly:
- use the same fixed test cases,
- provide the same relevant context and instructions when comparing generation alone,
- use the same retrieval outputs when isolating generation quality,
- use the same retrieval configuration when evaluating end-to-end systems,
- record model versions, prompts, decoding settings, token counts, latency, and failures,
- randomize answer order in human or LLM pairwise comparisons.

Be clear about what is being compared:
- **Generation-only comparison:** hold context fixed.
- **Retrieval comparison:** compare ranked evidence and retrieval metrics.
- **End-to-end comparison:** each complete system retrieves and generates using its own pipeline.

Changing multiple components at once may be valid for an end-to-end product comparison, but it makes root-cause attribution harder.

## 17.2 Randomize answer ordering

In pairwise evaluation, hide model names and randomly present A/B or B/A. Preferably score both orders on a subset or all pairs, then map the selected answer back to its true identity.

Record:
- win/tie/loss,
- order-flip rate,
- human or judge rationale,
- quality dimensions,
- category and severity.

A tie option is important. Forcing a winner can turn indistinguishable outputs into noisy “wins.”

## 17.3 Measure quality

Choose metrics based on the task:
- retrieval Recall@K, Precision@K, MRR, nDCG,
- correctness, completeness, groundedness, citation accuracy,
- task success and abstention quality,
- human preference or user outcomes.

Avoid a single blended score unless the weights are justified and component metrics remain visible.

## 17.4 Measure latency correctly

Record per request:
- end-to-end latency,
- retrieval latency,
- reranking latency,
- generation latency,
- time to first token if streaming,
- p50, p90, p95, and p99 latency,
- timeout and error rates.

Average latency can hide a poor tail. For interactive systems, p95 or p99 may matter more than the mean.

Use comparable hardware, concurrency, network conditions, caching rules, and warm/cold-start policies. Repeat measurements and record whether latency is measured sequentially or under realistic load.

## 17.5 Measure cost

Capture:
- input and output tokens,
- embedding and reranking calls,
- model price or internal serving cost,
- retries and failed calls,
- cached vs. uncached requests,
- tool/API costs,
- human escalation costs where relevant.

A cheaper model may trigger more retries or escalations, making total cost higher. Use a consistent accounting boundary.

## 17.6 Compare with a scorecard

| Measure | Model A | Model B | Decision question |
|---|---:|---:|---|
| Groundedness | 0.94 | 0.96 | Is the difference reliable and meaningful? |
| Task success | 0.82 | 0.84 | Is there a real user benefit? |
| p95 latency | 1.8 s | 2.4 s | Does it meet the latency SLO? |
| Cost per request | $0.012 | $0.009 | Is quality worth the cost? |
| Critical failures | 0 | 1 | Does either violate a release invariant? |

These numbers are illustrative. A single critical failure may block a model regardless of average performance.

### Interview answer
“I’d evaluate the same cases under controlled conditions, distinguish generation-only from end-to-end tests, randomize and swap answer order to reduce judge position bias, and record quality, p95 latency, errors, and fully accounted cost. I’d compare paired differences and inspect critical failures and category slices before deciding.”

---

# 18. Measuring cost per successful task, quality at a latency target, and quality per dollar

A model's price per call is not the same as its economic value. The useful unit is often the cost of achieving a successful outcome.

## 18.1 Cost per successful task

\[
\text{Cost per successful task}=
\frac{\text{total evaluation or operating cost}}
{\text{number of successful tasks}}
\]

Suppose a system handles 1,000 tasks at a total cost of $20 and 800 tasks succeed. Cost per successful task = $20/800 = $0.025.

If another system costs $15 but only 500 tasks succeed, its cost per successful task is $0.03. The cheaper system per request is not cheaper per success.

Define “success” carefully: it may require correctness, completeness, valid citations, and no critical policy violation. A judge's pass label should be calibrated before using it for financial comparisons.

Include retries, tool calls, retrieval, reranking, and escalations if the goal is total operating cost.

## 18.2 Quality at a latency target

This asks: **among systems that meet a latency constraint, which delivers the best quality?**

Example:
- Product target: p95 end-to-end latency ≤ 2 seconds.
- Model A quality = 0.91 and p95 = 1.7 s.
- Model B quality = 0.95 and p95 = 2.8 s.

Model B has higher offline quality but fails the latency target. You might optimize it, stream output, or use it only for harder queries. Do not hide latency failures in an average score.

Evaluate under realistic concurrency, cache conditions, and request sizes. A model that meets p95 latency in a low-load test may fail under production traffic.

## 18.3 Quality per dollar

A simple ratio is:

\[
\text{Quality per dollar}=\frac{\text{quality score}}{\text{cost}}
\]

But ratios can be misleading. Quality scores may not have a meaningful zero, and a critical failure cannot be offset by a low price. Use the ratio as a rough comparison, not the only decision rule.

Better approaches:
- compare quality at a fixed cost budget,
- compare cost at a fixed quality target,
- plot a cost-quality Pareto frontier,
- impose hard quality, latency, and safety constraints first.

## 18.4 Pareto frontier

A system is Pareto-dominated if another system is at least as good on all selected dimensions and strictly better on at least one. For example, if model A is more expensive, slower, and less accurate than model B, A is dominated under those metrics.

The Pareto frontier contains systems for which no other candidate is better on every chosen dimension. The final choice depends on product constraints and risk tolerance.

## 18.5 Example

| System | Success rate | Cost per 1,000 tasks | Cost per success |
|---|---:|---:|---:|
| A | 80% | $20 | $20 / 800 = $0.025 |
| B | 90% | $24 | $24 / 900 ≈ $0.0267 |
| C | 70% | $12 | $12 / 700 ≈ $0.0171 |

System C is cheapest per success in this simplified calculation, but its 70% success rate may violate the product's minimum quality requirement. The correct decision is constrained optimization, not blindly choosing the lowest ratio.

### Interview answer
“I’d define success with calibrated quality criteria, calculate total cost including retries and tools, and divide by successful tasks. I’d also evaluate quality only among configurations meeting the latency SLO, and compare the cost-quality frontier. Safety and minimum quality constraints come first; ratios are supporting evidence, not the sole decision rule.”

### Follow-up question
**Can a cheaper model be more expensive overall?** Yes. If it needs more retries, creates more failures, or increases human escalation, total cost per successful task can rise.

---

# 19. Clustering failures by root cause, severity, frequency, and fix priority

## 19.1 Why cluster failures?

A list of 500 failed queries is hard to act on. Grouping failures reveals patterns such as stale policies, poor table extraction, query ambiguity, missing permissions, or unsupported claims.

The goal is not just to count failures. It is to turn them into engineering work with measurable impact.

## 19.2 Capture useful failure metadata

For each failed case, store where permitted:
- query and case ID,
- retrieved document IDs and ranks,
- source version/effective date,
- generated answer and citations,
- evaluation dimensions that failed,
- failure category and severity,
- model/prompt/retriever configuration,
- latency, token use, and errors,
- user outcome or feedback when available.

Avoid storing unnecessary sensitive content. Use redaction, access control, retention policies, and stable references to evidence.

## 19.3 Classify by root cause

A practical taxonomy:

| Stage | Example root cause |
|---|---|
| Ingestion | Document missing, OCR failure, table extraction error |
| Chunking | Key condition split from its definition |
| Query processing | Ambiguity, bad rewrite, missing conversation context |
| Retrieval | Wrong candidates, poor recall, noisy results |
| Ranking | Correct source found but ranked too low |
| Context assembly | Truncation, duplicates, conflicting passages |
| Generation | Misinterpretation, omission, unsupported claim |
| Citation | Wrong source/span, missing citation |
| Governance | Stale source, unclear authority, wrong effective date |
| Security | Permission leakage or prompt injection |
| Operations | Timeout, rate limit, tool failure |

Allow multiple labels when a failure has multiple contributing causes, but identify a primary root cause for reporting.

## 19.4 Measure severity and frequency separately

- **Frequency:** how often does the failure occur?
- **Severity:** how harmful is it when it occurs?
- **Reach:** how many users, tenants, or workflows are affected?
- **Detectability:** how likely is it to be noticed before causing harm?
- **Fixability:** how confidently can the team remediate it?

A rare permission leak may deserve higher priority than a frequent harmless formatting issue.

## 19.5 Prioritize fixes

A simple triage score might be:

\[
\text{Priority score}=
\text{frequency}\times\text{severity}\times\text{reach}
\]

This is only a heuristic. Scores must use defined scales, and critical safety or compliance issues should be hard escalations rather than waiting for a numeric score.

A more complete process:
1. Cluster similar failures using tags, embeddings, or manual review.
2. Validate clusters with a human; embedding similarity is not proof of shared root cause.
3. Estimate frequency and impact from representative samples.
4. Identify the system stage responsible.
5. Propose a fix and a measurable success criterion.
6. Add a regression test for the failure.
7. Test the fix offline and compare collateral regressions.
8. Monitor production after release.

## 19.6 Example prioritization

| Failure cluster | Frequency | Severity | Suggested action |
|---|---|---|---|
| Wrong current policy version | Medium | High | Fix version metadata and retrieval filters; add temporal tests |
| Missing receipt requirement | High | Medium | Improve completeness criteria and multi-passage retrieval |
| Citation points to wrong paragraph | Medium | High | Add claim-to-span validation |
| Extra paragraph in harmless FAQ | High | Low | Lower priority unless it harms usability |
| Cross-tenant document returned | Rare | Critical | Immediate security incident and release block |

### Interview answer
“I’d retain per-case traces and structured failure labels, cluster them by pipeline stage, then score frequency, severity, and reach. I’d prioritize critical security failures separately, turn each recurring root cause into a fix and regression test, and verify that the fix improves the target category without harming others.”

### Follow-up question
**Should an embedding cluster automatically define a root cause?** No. It can group similar text, but the same symptom can have different causes. Validate clusters with evidence and pipeline traces.

---

# 20. Identifying the gap between offline benchmark improvements and actual production-user outcomes

## 20.1 Offline quality is a proxy

A benchmark measures performance on selected cases. Production outcomes depend on more:
- actual query distribution,
- user goals and behavior,
- latency and availability,
- UI and workflow design,
- source freshness,
- permissions,
- users' trust and ability to act on answers,
- fallback and escalation paths.

A model can improve benchmark correctness but make users less successful if it is slower, more verbose, harder to use, or poorly integrated into the workflow.

## 20.2 Define the outcome first

Examples of production outcomes:
- successful task completion,
- reduced support escalation,
- fewer repeat contacts,
- fewer corrections,
- improved user satisfaction,
- shorter time to resolution,
- fewer policy violations.

Avoid optimizing a proxy such as answer length or click-through if it does not reliably track user value.

## 20.3 Diagnose the gap

1. **Check representativeness.** Does the offline dataset reflect live queries and users?
2. **Check metric validity.** Does the judge score correlate with human quality or task success?
3. **Inspect latency and reliability.** Did slower responses increase abandonment or timeouts?
4. **Inspect product integration.** Did the UI hide citations or make the next action unclear?
5. **Analyze user cohorts.** Did quality improve for common questions but regress for a language or role?
6. **Check source freshness and permissions.** Did production documents differ from the evaluation snapshot?
7. **Use randomized experiments.** Estimate whether the change caused an outcome difference.
8. **Collect qualitative feedback.** Review escalations, corrections, and user comments.
9. **Update the benchmark.** Add representative failures without tuning away the holdout.

## 20.4 Leading and lagging indicators

- **Leading indicators:** retrieval recall, groundedness, citation validity, latency, timeout rate.
- **Lagging outcomes:** successful task completion, repeat contact, user satisfaction, support cost.

Leading indicators help diagnose. Lagging indicators tell you whether users benefited. Track both.

## 20.5 Beware of confounders

A production outcome may change because of seasonality, a new UI, changed traffic, promotions, or a separate product release. Use randomized assignment when feasible, hold other changes constant, and define the experimental unit. Observational correlations alone may not prove causation.

### Interview answer
“I’d treat offline metrics as leading indicators, not the final definition of success. I’d compare benchmark and production distributions, validate judge scores against humans, monitor latency and workflow friction, and run randomized online experiments against user outcomes. I’d investigate cohort-level gaps and feed verified production failures back into a versioned evaluation set.”

### Follow-up question
**What if offline quality rises but task completion falls?** First verify the experiment and metric integrity, then segment by query type, latency, answer length, and user cohort. Inspect real failures and workflow steps before deciding whether the model or product integration caused the drop.

---

# 21. Building an evaluation pipeline that compares retrieval and answer quality, tracks regressions, and blocks unsafe or low-quality releases in CI

## 21.1 What CI evaluation means

Continuous integration (CI) runs automated checks whenever code, prompts, models, indexes, or configuration change. An evaluation pipeline should detect regressions early and prevent releases that violate defined quality or safety requirements.

## 21.2 Architecture

A practical pipeline:

1. **Trigger:** code, prompt, model, embedding, chunking, retriever, or reranker change.
2. **Validate configuration:** ensure all versions and required metadata are recorded.
3. **Run deterministic tests:** schema validity, access control, citation IDs, required fields.
4. **Run retrieval tests:** Recall@K, Precision@K, MRR, nDCG, and context metrics.
5. **Run answer tests:** correctness, completeness, relevance, groundedness, citation support.
6. **Run operational tests:** latency, token use, cost, timeouts.
7. **Compare baseline:** paired case-level differences and category slices.
8. **Apply release gates:** critical invariants, minimum thresholds, regression bounds.
9. **Publish report:** per-case results, aggregate metrics, confidence intervals, failures.
10. **Block or approve:** fail closed for critical security checks; require review for uncertain or borderline cases.
11. **Archive artifacts:** dataset, corpus snapshot, system config, judge config, results.
12. **Deploy progressively:** shadow, canary, and monitor production.

## 21.3 Keep fast and slow test tiers

**Fast CI suite**
- deterministic checks,
- a small set of high-value regression cases,
- schema and permission tests,
- basic retrieval and answer smoke tests.

**Full evaluation suite**
- broader frozen benchmark,
- LLM-based metrics,
- larger samples and confidence intervals,
- stress tests,
- load and cost tests.

The fast suite should run on every relevant change; the full suite can run on merge, release candidate, or scheduled cadence depending on cost and risk.

## 21.4 Example release-gate logic

```python
def release_decision(metrics):
    """
    Example only. Thresholds must be selected from product risk
    and baseline evidence, not copied as universal values.
    """
    if metrics["critical_permission_violations"] > 0:
        return "BLOCK: critical permission violation"

    if metrics["recall_at_5"] < 0.90:
        return "BLOCK: retrieval recall below target"

    if metrics["groundedness"] < 0.95:
        return "BLOCK: groundedness below target"

    if metrics["p95_latency_seconds"] > 2.0:
        return "BLOCK: p95 latency exceeds SLO"

    if metrics["cost_per_success"] > metrics["cost_per_success_budget"]:
        return "BLOCK: cost per successful task exceeds budget"

    return "PASS: all configured gates satisfied"
```

The values above are illustrative. Real gates should consider sample size and uncertainty, and critical categories may need their own thresholds. A production pipeline should also distinguish “block,” “needs human review,” and “pass,” instead of forcing every uncertain result into a binary answer.

## 21.5 Baseline comparisons

Store per-case outputs from the current approved version. For each candidate:
- evaluate the same cases,
- calculate paired score differences,
- compare category-level results,
- flag new critical failures,
- detect changes in latency and cost,
- report confidence intervals when appropriate.

Do not rely only on aggregate scores. A candidate can improve overall quality while causing a severe regression in one important slice.

## 21.6 Safety and reliability gates

Hard gates can include:
- cross-tenant or permission leakage,
- disallowed content disclosure,
- invalid or fabricated source citations in high-risk contexts,
- missing required disclaimers or escalation paths where mandated,
- unsafe tool actions,
- use of superseded policy versions for “current” questions.

The exact gates depend on product and domain. Do not rely solely on an LLM judge for security or permission enforcement; use system-level access controls and deterministic checks.

## 21.7 Example CI pseudocode

```python
def run_evaluation_pipeline(candidate, baseline, dataset):
    candidate_results = run_all_cases(candidate, dataset)
    baseline_results = run_all_cases(baseline, dataset)

    deterministic_failures = check_deterministic_invariants(candidate_results)
    retrieval_report = calculate_retrieval_metrics(candidate_results, dataset)
    answer_report = calculate_answer_metrics(candidate_results, dataset)
    ops_report = calculate_latency_and_cost(candidate_results)

    comparison = compare_paired_results(
        baseline_results,
        candidate_results,
        dataset
    )

    decision = apply_release_gates(
        deterministic_failures,
        retrieval_report,
        answer_report,
        ops_report,
        comparison
    )

    save_versioned_report(
        candidate=candidate,
        dataset=dataset,
        retrieval=retrieval_report,
        answers=answer_report,
        operations=ops_report,
        comparison=comparison,
        decision=decision
    )

    return decision
```

This is architectural pseudocode; the functions must be implemented for the application and evaluation definitions. A robust system needs timeouts, retries, secure logging, reproducible environments, and a clear policy for failed evaluation jobs.

### Interview answer
“I’d trigger evaluation on any relevant system change, run deterministic and retrieval tests first, then answer-quality and operational evaluations. I’d compare the candidate with a frozen baseline on paired cases, enforce critical security gates and risk-based thresholds, publish per-case diagnostics, and archive all versions. Fast regression tests run on every change; the full suite runs on release candidates.”

### Follow-up questions

**Q: What if the judge service is unavailable in CI?**  
Do not silently treat missing evaluation as success. Use deterministic checks and known fallback policy, mark the run inconclusive or block release depending on risk.

**Q: How do you avoid excessive CI cost?**  
Use tiers: fast deterministic tests on every commit, broader semantic evaluations at appropriate checkpoints, caching only when inputs and versions match, and targeted reruns for diagnosis.

---

# 22. Measuring quality drift after changing the prompt, model, embedding model, chunking, retriever, reranker, or context assembly

## 22.1 What is quality drift?

**Quality drift** is a change in system behavior or performance over time or after a system change. It can be:
- a real regression,
- an improvement in one category but a regression in another,
- a change in the types of requests the system receives,
- a measurement artifact caused by changed labels, judges, or data.

A prompt change may affect completeness; an embedding change may affect semantic recall; chunking may split important conditions; reranking may reorder evidence; context assembly may introduce duplicates or truncate relevant text.

## 22.2 Establish a stable baseline

Before changing a component:
1. Freeze the evaluation dataset and corpus snapshot.
2. Record system configuration and dependency versions.
3. Run the baseline and save per-case outputs.
4. Record retrieval rankings, selected context, answer, citations, latency, and cost.
5. Capture category-level metrics and critical failures.

Without a baseline, it is difficult to tell whether the new system changed quality.

## 22.3 Change one factor at a time when diagnosing

For causal attribution, change one component while holding others constant:
- prompt only,
- generation model only,
- embedding model only,
- chunking strategy only,
- retriever settings only,
- reranker only,
- context assembly only.

This is not always possible or desirable for an end-to-end release, but it is useful during diagnosis. If several components change together, test the combined system and use ablation experiments to identify contributions.

## 22.4 Use layer-specific metrics

| Changed component | Signals to inspect |
|---|---|
| Prompt | correctness, completeness, refusal/abstention, groundedness, format |
| Generation model | answer quality, calibration, latency, cost, critical failures |
| Embedding model | Recall@K, candidate coverage, semantic query slices |
| Chunking | evidence coverage, chunk duplication, context precision/recall |
| Retriever | recall, precision, latency, filter correctness |
| Reranker | MRR, nDCG, relevant evidence position, latency |
| Context assembly | truncation, duplicate rate, source balance, evidence coverage |
| Citation logic | citation validity, claim support, source/version accuracy |

## 22.5 Paired regression analysis

Run old and new systems on the same cases. For each case, record:
- old and new score,
- changed retrieval results,
- answer diff,
- failure category,
- latency and cost delta.

Report:
- mean/median score difference,
- confidence intervals,
- number improved / unchanged / regressed,
- severe new failures,
- category-specific changes.

A score change is not automatically drift if the evaluator or dataset also changed. Keep the evaluator stable or separately validate the new evaluator.

## 22.6 Production drift monitoring

Offline evaluation cannot detect every change in live traffic. Monitor:
- query-category and language distribution,
- query length and ambiguity,
- source freshness and ingestion failures,
- retrieval scores and empty-result rates,
- context length and truncation,
- answer and citation quality from sampled audits,
- refusal and escalation rates,
- latency, errors, retries, and cost,
- user feedback and task outcomes.

Use privacy-preserving sampling and clear retention controls. Monitor by cohort when appropriate, without exposing sensitive user data to unauthorized reviewers.

## 22.7 Distinguish system drift from data drift

- **System drift:** behavior changes because model, prompt, retrieval, index, or infrastructure changed.
- **Data drift:** the input distribution or source corpus changes.
- **Concept drift:** the meaning of success or relationship between inputs and correct outputs changes, such as policy rules changing over time.
- **Evaluation drift:** the benchmark, labels, rubric, judge, or scoring code changes, so scores are no longer directly comparable.

These can occur together. Versioning is necessary to separate them.

## 22.8 Use canaries and rollback thresholds

After offline tests pass:
1. shadow the candidate on live requests where safe,
2. deploy to a small canary cohort,
3. compare latency, errors, sampled quality, and critical failures,
4. define rollback triggers before deployment,
5. expand gradually if metrics remain healthy,
6. preserve the prior version for rollback.

A canary is especially important when a change affects latency, reliability, or data paths not fully represented offline.

### Interview answer
“I’d freeze the dataset, corpus, and evaluator; record a baseline; then compare old and new systems on paired cases. I’d inspect component-specific metrics and per-case regressions, not just the overall average. After offline validation, I’d use shadow or canary traffic and monitor input distribution, source freshness, retrieval behavior, answer quality, latency, and cost. I’d distinguish system drift from data and evaluation drift and maintain rollback criteria.”

### Follow-up questions

**Q: Why keep the evaluator fixed when changing the model?**  
Otherwise a score change may come from a different judge or rubric rather than the candidate system. If the evaluator must change, validate and version it separately.

**Q: What if overall quality improves but one category regresses?**  
Check category severity and product requirements. A critical or high-risk regression may block release even when the overall average improves.

---

# 23. Final interview revision sheet

| Concept | Short answer |
|---|---|
| Position bias | Judge preference changes with answer order; randomize and swap order |
| Prompt sensitivity | Small rubric wording changes alter scores; version and calibrate prompts |
| Judge inconsistency | Same case receives different scores; repeat runs and measure flip rates |
| Length bias | Judge rewards or penalizes length regardless of content; use fact-based rubrics |
| Ragas | RAG-oriented evaluation metrics and workflows |
| DeepEval | Test-case and threshold-oriented LLM evaluation |
| TruLens | Feedback/evaluation connected to application behavior |
| Arize Phoenix | Tracing and evaluation observability |
| Custom harness | Tailored, reproducible evaluation code with a maintenance cost |
| Regression test | Protects known behavior |
| Offline experiment | Compares candidates on fixed cases |
| Shadow evaluation | Candidate runs on live copies without serving its response |
| Canary | Small live exposure for safe rollout |
| A/B test | Randomized comparison of real user outcomes |
| Paired comparison | Both systems evaluated on the same cases |
| Bootstrap interval | Estimates uncertainty by resampling observed cases |
| Power analysis | Estimates sample size needed to detect a chosen effect |
| Inter-annotator agreement | Measures reviewer consistency, not necessarily truth |
| Coverage | Representation of important cases, categories, and combinations |
| Cost per success | Total cost divided by successful tasks |
| Pareto frontier | Candidates not dominated on all chosen dimensions |
| Failure clustering | Groups repeated symptoms to find actionable root causes |
| Offline/online gap | Difference between benchmark proxy metrics and actual user outcomes |
| CI evaluation | Repeatable checks and gates that prevent unsafe regressions |
| Quality drift | Change in behavior, input distribution, sources, or measurement over time |

## A concise answer to “How do you run evaluation as an engineering discipline?”

“I’d maintain a versioned, representative benchmark with evidence-backed labels, then evaluate retrieval, answer quality, citations, safety, latency, and cost on fixed paired cases. I’d calibrate LLM judges against humans, use statistical intervals for comparisons, and run regression tests in CI. Candidate changes would progress through offline testing, shadow evaluation, and canary or randomized online tests as appropriate. I’d cluster failures by root cause, monitor production outcomes and drift, and block releases that violate critical safety or quality gates.”

---

## Study plan

1. Learn Question 11's judge biases and explain one mitigation for each.
2. Compare the five evaluation-tool approaches in Question 12.
3. Practice explaining the difference between shadow, canary, and A/B tests.
4. Memorize the purpose—not just the names—of paired testing, bootstrap intervals, significance tests, and power analysis.
5. Practice diagnosing a benchmark-to-production gap using Question 20.
6. Explain the CI pipeline in Question 21 on a whiteboard.
7. Use Question 22 to describe how you would safely change one RAG component in production.
