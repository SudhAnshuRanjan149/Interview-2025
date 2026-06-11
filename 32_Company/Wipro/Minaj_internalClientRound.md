# Interview Preparation Guide

## Temporal Architecture · Terraform · Azure Key Vault · Azure App Services · DB Optimization · API Certifications

---

# 1. Temporal Architecture

> Temporal is an open-source durable workflow orchestration platform. It ensures workflows are resilient to failures via event sourcing, deterministic replay, and durable execution.

---

### Q1. What is Temporal and why is it used?

**Answer:**
Temporal is a durable workflow orchestration platform that lets you write long-running business processes as code. It handles retries, timeouts, state persistence, and fault tolerance automatically.

**Why use it:**

* Eliminates the need to manage distributed state manually
* Workflows survive process restarts, network failures, and crashes
* Developer experience: write workflows like normal code, not state machines
* Built-in visibility (Temporal UI) and history for debugging

**Use cases:** Payment processing, order fulfillment, user onboarding, ETL pipelines, saga patterns, scheduled tasks.

---

### Q2. What is the Temporal execution model? Explain event sourcing and replay.

**Answer:**
Temporal uses **event sourcing + deterministic replay** to guarantee durability.

**How it works:**

1. Every action in a workflow (activity scheduled, timer started, signal received) is recorded as an **event** in the  **Workflow Event History** .
2. When a worker restarts, Temporal **replays** the history to reconstruct the exact in-memory state of the workflow — no state is lost.
3. Workflow code must be **deterministic** — the same event history must always produce the same execution path.

**Key constraint:** Never use random numbers, `Date.now()`, or async I/O directly in workflow code — use Temporal's SDK equivalents (e.g., `workflow.sleep()`, `workflow.now()`).

---

### Q3. What is the difference between a Workflow and an Activity in Temporal?

**Answer:**

|                       | Workflow                                             | Activity                                                |
| --------------------- | ---------------------------------------------------- | ------------------------------------------------------- |
| **Purpose**     | Orchestration logic — defines the sequence of steps | Individual units of work — side effects, I/O, DB calls |
| **Determinism** | Must be deterministic (replay-safe)                  | No determinism requirement                              |
| **State**       | Persisted in event history                           | Stateless                                               |
| **Retries**     | Not retried by default                               | Auto-retried with configurable policies                 |
| **I/O**         | No direct I/O                                        | Full I/O allowed                                        |
| **Duration**    | Can run for years                                    | Short to medium duration                                |

**Rule of thumb:** Put all non-deterministic operations (DB queries, HTTP calls, file I/O) inside Activities. Keep Workflows as pure orchestrators.

---

### Q4. What are Signals and Queries in Temporal? How do they differ?

**Answer:**

**Signals:**

* Asynchronous messages sent **to** a running workflow
* Change workflow state or trigger branching logic
* Example: `cancelOrder` signal pauses an order workflow

```typescript
// Define signal handler inside workflow
const cancelSignal = defineSignal<[string]>('cancel');
wf.setHandler(cancelSignal, (reason) => {
  isCancelled = true;
});
```

**Queries:**

* Synchronous read of current workflow state — do NOT modify state
* Safe to call at any time
* Example: return the current order status

```typescript
const statusQuery = defineQuery<string>('status');
wf.setHandler(statusQuery, () => currentStatus);
```

**Key difference:** Signals write/mutate state. Queries only read state. Signals are durable; queries are not recorded in history.

---

### Q5. What is the Temporal Server architecture? What are its components?

**Answer:**
Temporal Server consists of multiple services:

| Service               | Responsibility                                              |
| --------------------- | ----------------------------------------------------------- |
| **Frontend**    | gRPC gateway — handles all SDK/CLI requests                |
| **History**     | Core workflow engine — manages event histories, scheduling |
| **Matching**    | Task queue management — matches tasks to workers           |
| **Worker**      | Internal workflows (archival, background tasks)             |
| **Persistence** | Stores event history (Cassandra, MySQL, PostgreSQL)         |
| **Visibility**  | Search/filter workflows (ElasticSearch / built-in)          |

**Execution flow:** SDK calls → Frontend → History Service → persists event → Matching Service queues task → Worker polls → executes → reports back.

---

### Q6. Explain Task Queues in Temporal.

**Answer:**
Task Queues are lightweight named channels that decouple workflow/activity scheduling from execution.

**How they work:**

* Workers **poll** task queues for tasks to execute
* Temporal never pushes tasks — workers always pull
* Workers register specific workflow/activity handlers when they start
* Multiple workers can poll the same queue for horizontal scaling

**Best practices:**

* Use separate queues for different workload types (e.g., `payment-queue`, `email-queue`)
* Match worker capacity to task queue load
* Versioning: use different queues to route to versioned workers

---

### Q7. How does Temporal handle retries and timeouts?

**Answer:**
Temporal has a layered timeout model:

**Activity Timeouts:**

| Timeout                    | Description                                             |
| -------------------------- | ------------------------------------------------------- |
| `scheduleToStartTimeout` | Max wait time in queue before a worker picks it up      |
| `startToCloseTimeout`    | Max time for activity execution once started            |
| `scheduleToCloseTimeout` | Total max time from scheduling to completion            |
| `heartbeatTimeout`       | Max time between heartbeats for long-running activities |

**Retry Policy (for Activities):**

```typescript
const retryPolicy: RetryPolicy = {
  initialInterval: '1s',
  backoffCoefficient: 2,
  maximumAttempts: 5,
  maximumInterval: '60s',
  nonRetryableErrorTypes: ['InvalidInputError']
};
```

**Workflow Timeouts:**

* `workflowExecutionTimeout`: Max overall workflow lifespan
* `workflowRunTimeout`: Max per run (resets on continue-as-new)
* `workflowTaskTimeout`: Max time to process a single workflow task

---

### Q8. What is `continue-as-new` and when should you use it?

**Answer:**
`continue-as-new` creates a new workflow run with a fresh event history, while carrying over any state you choose to pass.

**Why it's needed:** Temporal's event history has a size limit (~50,000 events). Long-running workflows (e.g., a subscription that processes events daily for years) will hit this limit.

**How to use:**

```typescript
import { continueAsNew } from '@temporalio/workflow';

async function subscriptionWorkflow(state: SubscriptionState): Promise<void> {
  if (state.cycleCount >= 100) {
    await continueAsNew<typeof subscriptionWorkflow>({ ...state, cycleCount: 0 });
  }
  // ... workflow logic
}
```

**When to use:**

* Infinite loops / cron-like workflows
* High-event-volume workflows
* Any workflow expected to run for months or years

---

### Q9. How do you version workflow code in Temporal safely?

**Answer:**
Since Temporal replays history, changing workflow code can break determinism on in-flight workflows.

**Solution: `workflow.patched()` (TypeScript) / `GetVersion` (Go/Java)**

```typescript
import { patched } from '@temporalio/workflow';

async function myWorkflow() {
  if (patched('my-feature-v2')) {
    // New code path for new executions
    await executeActivity(newActivity);
  } else {
    // Old code path for replaying old histories
    await executeActivity(oldActivity);
  }
}
```

**Deployment strategy:**

1. Deploy workers with both old and new code paths using `patched()`
2. Wait for all old workflow runs to complete
3. Remove the old code path and deprecate the patch

---

### Q10. What is the Saga pattern and how does Temporal implement it?

**Answer:**
The Saga pattern manages distributed transactions by executing a sequence of local transactions with compensating actions for rollback.

**Temporal implementation:**

```typescript
async function orderSagaWorkflow(order: Order) {
  const compensations: (() => Promise<void>)[] = [];

  try {
    await executeActivity(reserveInventory, order);
    compensations.push(() => executeActivity(releaseInventory, order));

    await executeActivity(chargePayment, order);
    compensations.push(() => executeActivity(refundPayment, order));

    await executeActivity(scheduleShipping, order);
  } catch (err) {
    // Run compensations in reverse
    for (const comp of compensations.reverse()) {
      await comp();
    }
    throw err;
  }
}
```

**Temporal advantages over manual Saga:**

* Durable execution means compensations always run even after crashes
* Built-in retries for both forward steps and compensations
* Full visibility via Temporal UI

---

### Q11. How does Temporal differ from traditional message queues (e.g., Kafka, RabbitMQ)?

**Answer:**

| Feature                          | Temporal                                    | Message Queues               |
| -------------------------------- | ------------------------------------------- | ---------------------------- |
| **State**                  | Full durable workflow state                 | Stateless message passing    |
| **Retries**                | Automatic, configurable                     | Manual, consumer-managed     |
| **Visibility**             | Full history + UI                           | Limited (dead letter queues) |
| **Orchestration**          | First-class (sequences, conditions, timers) | None (choreography only)     |
| **Replay**                 | Yes (deterministic)                         | No                           |
| **Long-running processes** | Native support                              | Complex workarounds          |

**When to use Temporal:** Complex multi-step business processes, when you need state, timers, and observability. **When to use queues:** Simple fire-and-forget messaging, high-throughput pub/sub.

---

### Q12. How do Workers work in Temporal? What happens when a worker goes down?

**Answer:**
A **Worker** is a long-running process that:

1. Polls task queues for workflow/activity tasks
2. Executes workflow code (replay for workflow tasks)
3. Executes activity code (actual side effects)
4. Reports results back to Temporal Server

**When a worker goes down:**

* In-flight  **Activities** : Temporal waits until `scheduleToCloseTimeout`. Another worker picks up the activity task once the `startToCloseTimeout` expires or the heartbeat fails.
* In-flight  **Workflow Tasks** : Temporal reschedules on another worker after the `workflowTaskTimeout`.
* **No data is lost** — all state is in Temporal's persistence layer.

---

### Q13. Explain Child Workflows and when to use them.

**Answer:**
A Child Workflow is a workflow started by another (parent) workflow. It runs with its own event history, workers, and retry policies.

**When to use:**

* Breaking up large workflows for event history limits
* Parallelizing independent sub-processes
* Isolating failure domains (child failure doesn't crash parent by default)
* Reusing workflow logic across multiple parent workflows

```typescript
// In parent workflow
const result = await executeChild(processOrderWorkflow, {
  args: [orderId],
  taskQueue: 'order-processing-queue',
  workflowExecutionTimeout: '1 day',
});
```

**Parent-child relationship options:**

* `TERMINATE` — parent terminates child on parent termination
* `ABANDON` — child continues independently
* `REQUEST_CANCEL` — parent sends cancel request to child

---

### Q14. What observability tools does Temporal provide?

**Answer:**

**Temporal UI:**

* Visualize running, completed, and failed workflows
* Inspect full event history for any workflow run
* Search by workflow ID, type, status, time range
* Replay failed workflows from a specific point

**Temporal CLI (`tctl` / `temporal`):**

* Start, cancel, signal, query workflows from terminal
* List all workflows by status/type

**Metrics (Prometheus):**

* `temporal_workflow_completed_count`
* `temporal_activity_poll_no_task` (worker utilization)
* `temporal_request_latency`

**Tracing:**

* OpenTelemetry integration for distributed tracing across activities

**Best practice:** Use structured logging inside activities (not workflows) and correlate by `workflowId` and `runId`.

---

### Q15. What are the best practices for designing Temporal workflows in production?

**Answer:**

1. **Keep workflows thin** — all business logic and I/O in activities
2. **Idempotent activities** — activities may retry; ensure they're safe to call multiple times
3. **Use heartbeats** for long-running activities to detect worker crashes early
4. **Set all timeouts explicitly** — never rely on defaults
5. **Use `continue-as-new`** for workflows that loop indefinitely
6. **Version code changes** with `patched()` before deploying
7. **Dedicated task queues** per workload type for capacity planning
8. **Avoid large payloads** in workflow inputs/outputs — use data stores and pass IDs
9. **Namespace isolation** — separate namespaces for prod/staging
10. **Test with the Temporal test suite** for deterministic unit testing of workflow logic

---

# 2. Terraform

> Terraform by HashiCorp is an open-source Infrastructure as Code (IaC) tool that lets you define and provision infrastructure using a declarative configuration language (HCL).

---

### Q1. What is Terraform and how does it work?

**Answer:**
Terraform is an IaC tool that uses HCL (HashiCorp Configuration Language) to define infrastructure resources. It follows a **plan → apply** workflow.

**How it works:**

1. Write `.tf` configuration files describing desired infrastructure
2. `terraform init` — initializes providers and backend
3. `terraform plan` — computes diff between desired and current state
4. `terraform apply` — provisions/modifies/destroys resources to match desired state
5. State is stored in a **state file** (`terraform.tfstate`)

**Core concepts:** Providers, Resources, Data Sources, Modules, State, Variables, Outputs.

---

### Q2. What is Terraform state? Why is it important?

**Answer:**
Terraform state is a JSON file (`terraform.tfstate`) that maps your configuration to real-world resources.

**Why it's critical:**

* Tracks which resources Terraform manages
* Enables `plan` to compute the diff between desired vs actual
* Stores metadata (resource IDs, dependencies)
* Enables resource updates without recreation

**Problems with local state (default):**

* Not shareable across teams
* No locking — race conditions on concurrent applies
* Risk of accidental deletion

**Solution: Remote state backends (e.g., Azure Storage, S3, Terraform Cloud):**

```hcl
terraform {
  backend "azurerm" {
    resource_group_name  = "tfstate-rg"
    storage_account_name = "tfstatestorage"
    container_name       = "tfstate"
    key                  = "prod.terraform.tfstate"
  }
}
```

---

### Q3. What is `terraform plan` and why should you always run it before `apply`?

**Answer:**
`terraform plan` is a dry-run that shows exactly what changes will be made without making them.

**Output symbols:**

* `+` — resource will be created
* `-` — resource will be destroyed
* `~` — resource will be updated in-place
* `-/+` — resource will be destroyed and recreated (forces replacement)

**Why always run it first:**

* Prevents unintended destructive changes
* Reviewable in CI/CD pipelines (plan as PR artifact)
* Catches configuration errors before they hit production
* Can be saved and used in apply: `terraform plan -out=tfplan && terraform apply tfplan`

---

### Q4. What are Terraform providers? How do you configure them?

**Answer:**
Providers are plugins that interface with APIs (AWS, Azure, GCP, GitHub, etc.). They translate HCL resource blocks into API calls.

```hcl
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
  tenant_id       = var.tenant_id
}
```

**Key points:**

* Always pin provider versions to avoid breaking changes
* `~> 3.0` means `>= 3.0.0, < 4.0.0` (patch/minor upgrades allowed)
* Multiple provider aliases are supported for multi-region setups

---

### Q5. What is the difference between `terraform destroy` and removing a resource from config?

**Answer:**

|                      | `terraform destroy`           | Remove from config                             |
| -------------------- | ------------------------------- | ---------------------------------------------- |
| **Scope**      | Destroys ALL managed resources  | Destroys only the removed resource             |
| **Next apply** | N/A (done)                      | Resource destroyed on next `terraform apply` |
| **Use case**   | Tear down an entire environment | Remove a specific resource                     |
| **Risk**       | High — destroys everything     | Targeted                                       |

**Important:** Simply removing a resource from `.tf` files and running `apply` will destroy it. Always use `terraform plan` first to confirm the deletion.

**Safer alternative:** Use `terraform state rm <resource>` to remove from state without destroying the real resource (useful for migrating resources to a new config).

---

### Q6. What are Terraform modules and why should you use them?

**Answer:**
Modules are reusable, self-contained groups of Terraform configuration. They accept input variables and produce outputs.

**Structure:**

```
modules/
  azure-webapp/
    main.tf
    variables.tf
    outputs.tf
```

**Usage:**

```hcl
module "webapp" {
  source              = "./modules/azure-webapp"
  app_name            = "my-app-prod"
  resource_group_name = azurerm_resource_group.main.name
  location            = var.location
  sku_name            = "P1v3"
}
```

**Why use modules:**

* **DRY** — reuse across environments (dev/staging/prod)
* **Encapsulation** — hide complexity, expose clean interfaces
* **Versioning** — modules can be versioned in registries
* **Team collaboration** — platform teams publish modules; app teams consume them

---

### Q7. Explain Terraform state locking and how to handle state lock issues.

**Answer:**
State locking prevents concurrent `apply` operations from corrupting the state file.

**How it works:**

* Backends like S3+DynamoDB, Azure Storage, GCS implement locking
* Terraform acquires a lock before any operation that modifies state
* Lock is released after apply completes

**Handling stuck locks:**

* If a previous apply crashed, the lock may not be released
* Force-unlock: `terraform force-unlock <LOCK_ID>`
* **Only do this when you're certain no apply is running**

**Azure Storage state locking:**

* Uses blob lease mechanism for locking automatically
* No extra setup needed (unlike S3 which needs DynamoDB)

---

### Q8. What is `terraform import` and when would you use it?

**Answer:**
`terraform import` brings existing infrastructure under Terraform management by writing it to the state file.

```bash
# Import existing Azure resource group
terraform import azurerm_resource_group.main /subscriptions/<sub-id>/resourceGroups/my-rg
```

**Workflow:**

1. Write the Terraform resource block for the existing resource
2. Run `terraform import`
3. Run `terraform plan` — should show no changes if config matches reality
4. Adjust config until `plan` shows no diff

**When to use:**

* Migrating manually created resources to IaC
* Adopting Terraform in brownfield environments
* Recovering after state file loss

**Terraform 1.5+ import blocks (declarative import):**

```hcl
import {
  to = azurerm_resource_group.main
  id = "/subscriptions/.../resourceGroups/my-rg"
}
```

---

### Q9. What is a `data` source in Terraform? How does it differ from a `resource`?

**Answer:**

|                     | `resource`                   | `data`                      |
| ------------------- | ------------------------------ | ----------------------------- |
| **Purpose**   | Creates/manages infrastructure | Reads existing infrastructure |
| **State**     | Tracked in state               | Not tracked (read-only)       |
| **Lifecycle** | Manages full CRUD              | Only read                     |
| **Example**   | `azurerm_resource_group`     | `azurerm_client_config`     |

**Example:**

```hcl
# Read existing resource (data source)
data "azurerm_key_vault" "existing" {
  name                = "my-existing-kv"
  resource_group_name = "my-rg"
}

# Use its ID in a new resource
resource "azurerm_key_vault_secret" "secret" {
  key_vault_id = data.azurerm_key_vault.existing.id
  name         = "db-password"
  value        = var.db_password
}
```

---

### Q10. Explain the Terraform resource lifecycle. What are `create_before_destroy`, `prevent_destroy`, and `ignore_changes`?

**Answer:**
Terraform's `lifecycle` block overrides default resource behavior:

```hcl
resource "azurerm_app_service" "app" {
  # ...
  lifecycle {
    create_before_destroy = true  # Create replacement before destroying old
    prevent_destroy       = true  # Block accidental terraform destroy
    ignore_changes        = [tags] # Ignore drift in specific fields
  }
}
```

**`create_before_destroy`:** Useful for zero-downtime replacements. Creates the new resource first, then destroys the old one.

**`prevent_destroy`:** Terraform will error if the plan tries to destroy this resource. Protects databases, stateful services.

**`ignore_changes`:** Useful when external processes modify resources (e.g., auto-tagging by a cloud governance tool). Prevents Terraform from reverting those changes.

---

### Q11. What are Terraform workspaces? When should you use them vs. separate directories?

**Answer:**
Workspaces allow multiple state files within a single configuration — useful for managing multiple environments.

```bash
terraform workspace new staging
terraform workspace select prod
terraform workspace list
```

**When to use workspaces:**

* Simple environment isolation (dev/staging/prod) with identical configs
* Feature branch testing

**When NOT to use workspaces (use separate directories instead):**

* Environments have significantly different configurations
* Different teams manage different environments
* When you need per-environment backend configuration

**Better pattern — separate directories:**

```
envs/
  dev/
    main.tf → calls root module
    terraform.tfvars
  prod/
    main.tf → calls root module
    terraform.tfvars
```

---

### Q12. How do you manage secrets in Terraform?

**Answer:**
**Never hardcode secrets in `.tf` files.** Strategies:

**Environment variables:**

```bash
export TF_VAR_db_password="supersecret"
```

**Sensitive variables:**

```hcl
variable "db_password" {
  type      = string
  sensitive = true  # Redacted in plan/apply output
}
```

**Vault integration (HashiCorp Vault):**

```hcl
data "vault_generic_secret" "db_creds" {
  path = "secret/myapp/db"
}
```

**Azure Key Vault + data source:**

```hcl
data "azurerm_key_vault_secret" "db_pass" {
  name         = "db-password"
  key_vault_id = data.azurerm_key_vault.main.id
}
```

**Best practices:**

* Never commit `.tfvars` files with secrets to version control
* Use `.gitignore` to exclude sensitive var files
* Use remote backends with encryption at rest

---

### Q13. What is `terraform taint` and `terraform untaint`? (and its modern replacement)

**Answer:**
`taint` marked a resource for forced recreation on the next `apply`. It was used when a resource was in a broken state that Terraform couldn't detect automatically.

**Modern replacement (Terraform 1.0+):** `terraform apply -replace`

```bash
# Force recreate a specific resource
terraform apply -replace="azurerm_virtual_machine.main"
```

**When to use:**

* VM is in a bad state and needs reprovisioning
* A configuration management step failed and needs rerunning
* A resource was manually modified and needs to be returned to IaC-managed state

---

### Q14. Explain Terraform's dependency graph and the `depends_on` meta-argument.

**Answer:**
Terraform automatically builds a **dependency graph** from resource references:

```hcl
resource "azurerm_resource_group" "rg" { ... }

resource "azurerm_app_service_plan" "plan" {
  resource_group_name = azurerm_resource_group.rg.name  # Implicit dependency
}
```

Terraform resolves the graph and creates resources in parallel where no dependencies exist.

**`depends_on`** is used when an implicit dependency doesn't exist but a real ordering constraint does:

```hcl
resource "azurerm_role_assignment" "example" {
  depends_on = [azurerm_key_vault_access_policy.app_policy]
  # ...
}
```

**Visualize the graph:**

```bash
terraform graph | dot -Tsvg > graph.svg
```

---

### Q15. What is a Terraform backend and what are the options?

**Answer:**
A backend determines **where state is stored** and  **how operations are executed** .

**Local (default):**

```hcl
terraform {
  backend "local" {
    path = "terraform.tfstate"
  }
}
```

**Remote backends:**

| Backend           | Locking    | Use Case                  |
| ----------------- | ---------- | ------------------------- |
| Azure Storage     | Blob lease | Azure-native teams        |
| AWS S3 + DynamoDB | DynamoDB   | AWS teams                 |
| GCS               | Native     | GCP teams                 |
| Terraform Cloud   | Native     | Full managed state + runs |
| HTTP              | Custom     | Custom state servers      |

**Remote state access (across configs):**

```hcl
data "terraform_remote_state" "network" {
  backend = "azurerm"
  config = {
    storage_account_name = "tfstate"
    container_name       = "tfstate"
    key                  = "network.tfstate"
  }
}
```

---

### Q16. What are `count` and `for_each` in Terraform? When do you use each?

**Answer:**

**`count`** — creates multiple instances by index:

```hcl
resource "azurerm_resource_group" "rg" {
  count    = 3
  name     = "rg-${count.index}"
  location = "East US"
}
```

**`for_each`** — creates instances by key from a map or set:

```hcl
variable "environments" {
  default = { dev = "East US", prod = "West US" }
}

resource "azurerm_resource_group" "rg" {
  for_each = var.environments
  name     = "rg-${each.key}"
  location = each.value
}
```

**Key differences:**

|                                | `count`                                     | `for_each`                      |
| ------------------------------ | --------------------------------------------- | --------------------------------- |
| **Indexing**             | By integer                                    | By key (string)                   |
| **Removing middle item** | Forces recreation of all subsequent resources | Only removes the specific key     |
| **Recommendation**       | Simple numeric repetition                     | Almost always prefer `for_each` |

---

### Q17. How does Terraform handle provider versioning and what is the `.terraform.lock.hcl` file?

**Answer:**
`.terraform.lock.hcl` is a **dependency lock file** that pins exact provider versions and their checksums.

**Why it matters:**

* Ensures everyone on the team uses the exact same provider version
* Prevents unexpected provider upgrades that could cause drift
* Should be committed to version control

**Example:**

```hcl
provider "registry.terraform.io/hashicorp/azurerm" {
  version     = "3.75.0"
  constraints = "~> 3.0"
  hashes = [
    "h1:abc123...",
  ]
}
```

**Updating providers:**

```bash
terraform init -upgrade  # Updates all providers to latest within constraints
```

---

### Q18. What is a dynamic block in Terraform?

**Answer:**
Dynamic blocks generate repeated nested configuration blocks programmatically.

```hcl
variable "inbound_rules" {
  default = [
    { port = 80, protocol = "Tcp", priority = 100 },
    { port = 443, protocol = "Tcp", priority = 110 },
  ]
}

resource "azurerm_network_security_group" "nsg" {
  name                = "example-nsg"
  resource_group_name = azurerm_resource_group.main.name
  location            = var.location

  dynamic "security_rule" {
    for_each = var.inbound_rules
    content {
      name                       = "rule-${security_rule.value.port}"
      priority                   = security_rule.value.priority
      direction                  = "Inbound"
      access                     = "Allow"
      protocol                   = security_rule.value.protocol
      destination_port_range     = tostring(security_rule.value.port)
      source_address_prefix      = "*"
      destination_address_prefix = "*"
    }
  }
}
```

**When to use:** Whenever nested blocks (like `security_rule`, `ip_configuration`, `listener`) need to be generated from a variable list or map.

---

### Q19. How do you structure Terraform code for a large team / multiple environments?

**Answer:**
**Recommended project structure:**

```
infra/
  modules/
    networking/       # VNet, subnets, NSGs
    compute/          # VMs, App Services
    database/         # SQL, CosmosDB
    security/         # Key Vault, RBAC
  envs/
    dev/
      main.tf         # Calls modules
      variables.tf
      terraform.tfvars
      backend.tf
    staging/
    prod/
  shared/
    state-backend/    # Bootstraps storage account for state
```

**Best practices:**

* Separate state per environment and layer
* Use remote modules from a private registry for shared infra
* Limit blast radius with small, focused state files
* Pin all module and provider versions
* Use CI/CD (GitHub Actions, Azure DevOps) for plan/apply with manual approval for prod

---

### Q20. What is `terraform validate` vs `terraform fmt` vs `terraform lint`?

**Answer:**

| Command                | Purpose                                                                            |
| ---------------------- | ---------------------------------------------------------------------------------- |
| `terraform fmt`      | Auto-formats `.tf`files to canonical style (indentation, spacing)                |
| `terraform validate` | Validates config syntax and internal consistency (checks provider schema)          |
| `tflint`             | Third-party linter — catches provider-specific errors, bad patterns, deprecations |
| `checkov`/`tfsec`  | Security/compliance scanning — detects misconfigurations                          |

**CI/CD pipeline order:**

```
terraform fmt -check → terraform validate → tflint → checkov → terraform plan → (manual approval) → terraform apply
```

---

### Q21. What is the `moved` block in Terraform?

**Answer:**
The `moved` block (Terraform 1.1+) lets you rename resources in configuration without destroying and recreating them.

```hcl
moved {
  from = azurerm_resource_group.old_name
  to   = azurerm_resource_group.new_name
}
```

**Use cases:**

* Renaming resources during refactoring
* Moving resources into modules (or out of modules)
* Changing `for_each` keys

**Before `moved`:** You'd have to manually run `terraform state mv`, which is error-prone and not version-controlled. The `moved` block is declarative and tracked in git.

---

### Q22. How does Terraform handle circular dependencies?

**Answer:**
Terraform detects circular dependencies and throws an error: `Cycle: resource_a, resource_b`.

**Common causes:**

* Two resources reference each other's attributes
* Incorrect use of `depends_on` creating a loop

**Solutions:**

1. **Restructure** the dependency — introduce an intermediate resource
2. **Use data sources** instead of direct resource references where possible
3. **Move logic into a module** to break the cycle
4. **Separate into different apply steps** using remote state

**Example of a cycle fix:**
Instead of Security Group and Subnet referencing each other, create the Security Group independently and associate it to the Subnet as a separate resource.

---

### Q23. What is Terraform Cloud / Terraform Enterprise? How is it different from open-source Terraform?

**Answer:**

| Feature                    | Open-source Terraform      | Terraform Cloud/Enterprise           |
| -------------------------- | -------------------------- | ------------------------------------ |
| **State storage**    | Manual setup required      | Managed, encrypted, versioned        |
| **Locking**          | Backend-specific           | Automatic                            |
| **Remote runs**      | Local machine              | Runs in Terraform Cloud (VCS-driven) |
| **Team access**      | Manual                     | RBAC, SSO                            |
| **Policy as code**   | Third-party (Sentinel/OPA) | Native Sentinel integration          |
| **Private registry** | None                       | Module + provider registry           |
| **Audit logs**       | None                       | Built-in                             |

**Terraform Cloud** is the SaaS version. **Terraform Enterprise** is self-hosted for compliance-sensitive environments.

---

### Q24. How would you test Terraform code?

**Answer:**

**Unit testing (module-level):**

* `terraform validate` — catches syntax/schema errors
* `tflint` — provider rule violations
* Mock providers (Terraform 1.7+) for testing module logic without real cloud calls

**Integration testing:**

* **Terratest** (Go library) — provisions real infrastructure, runs tests, then destroys

```go
func TestAzureWebApp(t *testing.T) {
  opts := terraform.WithDefaultRetryableErrors(t, &terraform.Options{
    TerraformDir: "../modules/webapp",
    Vars: map[string]interface{}{ "name": "test-app" },
  })
  defer terraform.Destroy(t, opts)
  terraform.InitAndApply(t, opts)
  // Assert on outputs
}
```

**Policy testing:**

* Sentinel (Terraform Cloud) — enforce policies before apply
* Checkov / tfsec — static security analysis in CI

---

### Q25. What is `terraform refresh` and when would you use it?

**Answer:**
`terraform refresh` (deprecated in favor of `terraform apply -refresh-only`) reconciles the state file with real-world infrastructure — it updates state to match actual resource attributes without making changes.

**When to use:**

* After manual changes were made to infrastructure outside of Terraform
* To detect drift before planning
* When state file is out of sync with reality

**Modern approach:**

```bash
terraform apply -refresh-only
```

This generates a plan showing only state updates, not infrastructure changes, and requires explicit approval.

**Note:** In Terraform 1.x, `plan` and `apply` automatically refresh state by default. Disable with `-refresh=false` for speed when drift is not expected.

---

# 3. Azure Key Vault

> Azure Key Vault is a cloud service for securely storing and accessing secrets, keys, and certificates. It provides centralized secret management, hardware security modules (HSM), and fine-grained access control.

---

### Q1. What is Azure Key Vault and what can it store?

**Answer:**
Azure Key Vault is a secure store for three types of objects:

| Object                 | Description                  | Use Cases                                  |
| ---------------------- | ---------------------------- | ------------------------------------------ |
| **Secrets**      | Key-value strings            | DB passwords, API keys, connection strings |
| **Keys**         | Cryptographic keys (RSA, EC) | Encryption, signing, key wrapping          |
| **Certificates** | X.509 TLS/SSL certificates   | App authentication, mTLS                   |

**Additional capabilities:**

* Hardware Security Module (HSM) backing for keys (Premium tier)
* Soft-delete and purge protection
* Versioning — all secrets have full version history
* Managed identity integration for passwordless access
* Audit logging via Azure Monitor

---

### Q2. What is the difference between Key Vault Access Policy and Azure RBAC?

**Answer:**
Azure Key Vault supports two permission models:

**Vault Access Policy (legacy):**

* Permissions set at the **vault level** for a principal
* Cannot scope to individual secrets/keys
* Max 1024 access policies per vault
* Managed in Key Vault's own plane, separate from Azure RBAC

**Azure RBAC (recommended):**

* Uses Azure role assignments, same as all other Azure resources
* Can scope permissions to vault, secret, key, or certificate level
* Integrates with Privileged Identity Management (PIM) for JIT access
* Supports Conditional Access policies

**Built-in RBAC roles:**

| Role                          | Permissions                     |
| ----------------------------- | ------------------------------- |
| `Key Vault Administrator`   | Full control                    |
| `Key Vault Secrets Officer` | Read/write/delete secrets       |
| `Key Vault Secrets User`    | Read secret values only         |
| `Key Vault Reader`          | Metadata only, no secret values |

**Recommendation:** Use RBAC for new Key Vaults. It provides better least-privilege granularity.

---

### Q3. How does Managed Identity work with Azure Key Vault?

**Answer:**
Managed Identity eliminates the need for credentials to access Key Vault. Azure handles identity lifecycle automatically.

**Types:**

* **System-assigned** : Tied to a specific resource; deleted with the resource
* **User-assigned** : Independent identity; can be shared across resources

**Flow:**

1. Enable Managed Identity on Azure resource (App Service, VM, Function App)
2. Grant Key Vault access via RBAC or access policy to the identity's Object ID
3. Application code requests a token from the Azure Instance Metadata Service
4. Uses the token to authenticate to Key Vault — no secrets in code

**Node.js example using DefaultAzureCredential:**

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

const credential = new DefaultAzureCredential(); // Uses Managed Identity in Azure
const client = new SecretClient("https://my-vault.vault.azure.net/", credential);

const secret = await client.getSecret("db-connection-string");
console.log(secret.value);
```

---

### Q4. What is soft-delete and purge protection in Key Vault?

**Answer:**

**Soft-delete:**

* When enabled, deleted secrets/keys/certificates are retained in a "deleted" state for 7–90 days
* Can be recovered during the retention period: `az keyvault secret recover`
* Prevents accidental permanent deletion
* **Enabled by default** (and cannot be disabled) for new Key Vaults

**Purge protection:**

* When enabled, even soft-deleted objects cannot be permanently purged until the retention period expires
* Prevents malicious actors from immediately purging deleted secrets
* **Required for BYOK (Bring Your Own Key) with Azure Disk Encryption**
* Once enabled, **cannot be disabled**

```bash
# Enable purge protection on a Key Vault
az keyvault update --name my-vault --enable-purge-protection true
```

**Recommendation:** Always enable both, especially in production. They protect against both accidental and malicious deletion.

---

### Q5. How do you implement secret rotation in Azure Key Vault?

**Answer:**
Secret rotation ensures credentials change regularly without application downtime.

**Manual rotation:**

* Create new version of a secret: `az keyvault secret set --vault-name my-vault --name db-password --value newpass`
* Applications always get the latest version unless pinned to a specific version ID

**Automated rotation with Azure Functions:**

1. Azure Event Grid emits `SecretNearExpiry` event (triggered 30 days before expiry)
2. Azure Function receives event, generates new credential, updates secret in Key Vault and the target service (e.g., database)

**Near-expiry notification setup:**

```bash
az eventgrid event-subscription create \
  --name secret-rotation-sub \
  --source-resource-id /subscriptions/.../vaults/my-vault \
  --endpoint https://my-rotation-func.azurewebsites.net/api/rotate \
  --included-event-types Microsoft.KeyVault.SecretNearExpiry
```

**Zero-downtime pattern:** Store two versions (current and next) and alternate between them during rotation. Applications try both.

---

### Q6. How do you access Key Vault secrets in an Azure App Service or Function App?

**Answer:**
Two approaches:

**1. Key Vault References (recommended — no code changes needed):**

* Set App Service configuration values as Key Vault references
* Format: `@Microsoft.KeyVault(SecretUri=https://vault.azure.net/secrets/my-secret/)`
* Or using latest version: `@Microsoft.KeyVault(VaultName=my-vault;SecretName=my-secret)`
* App Service fetches and injects the secret as an environment variable
* Requires Managed Identity with `Key Vault Secrets User` role

**2. SDK-based access (programmatic):**

```typescript
const client = new SecretClient(vaultUri, new DefaultAzureCredential());
const { value } = await client.getSecret("my-secret");
```

**Key Vault References are preferred** because:

* No secret handling in application code
* Automatic cache refresh when secrets are rotated
* Works with any language/framework
* Secret value never appears in App Service configuration UI

---

### Q7. What is Key Vault Private Endpoint and why is it used?

**Answer:**
A Private Endpoint assigns a private IP from your VNet to Key Vault, routing all traffic through your private network instead of the public internet.

**Why use it:**

* Prevents Key Vault from being accessible over public internet
* Data exfiltration protection
* Required for compliance (PCI-DSS, HIPAA, ISO 27001)
* Combined with `publicNetworkAccess: Disabled` for full network isolation

**Setup:**

```hcl
resource "azurerm_private_endpoint" "kv_pe" {
  name                = "kv-private-endpoint"
  resource_group_name = var.rg_name
  location            = var.location
  subnet_id           = azurerm_subnet.private.id

  private_service_connection {
    name                           = "kv-psc"
    private_connection_resource_id = azurerm_key_vault.main.id
    subresource_names              = ["vault"]
    is_manual_connection           = false
  }
}
```

**DNS resolution:** Private endpoint requires a Private DNS Zone (`privatelink.vaultcore.azure.net`) linked to your VNet for name resolution to resolve to the private IP.

---

### Q8. How do you audit and monitor Key Vault access?

**Answer:**
Azure Key Vault generates diagnostic logs for all data plane operations.

**Enable diagnostic logging:**

```bash
az monitor diagnostic-settings create \
  --name kv-diagnostics \
  --resource /subscriptions/.../vaults/my-vault \
  --logs '[{"category": "AuditEvent", "enabled": true}]' \
  --workspace /subscriptions/.../workspaces/my-law
```

**Key log fields:**

* `operationName` — e.g., `SecretGet`, `SecretSet`, `KeyUnwrapKey`
* `identity` — who accessed (user, service principal, managed identity)
* `resultType` — `Success` or `Failed`
* `callerIPAddress`

**KQL query for unauthorized access:**

```kql
AzureDiagnostics
| where ResourceType == "VAULTS"
| where ResultType != "Success"
| summarize count() by identity_claim_upn_s, OperationName, bin(TimeGenerated, 1h)
```

**Alerts to configure:**

* Failed access attempts exceeding a threshold
* Access from unexpected IPs or regions
* Secret deletion events

---

### Q9. What is the Key Vault Firewall and how does it interact with Trusted Services?

**Answer:**
Key Vault Firewall restricts which IP addresses and VNets can access the vault.

**Configuration options:**

* **Allow all networks** (default, not recommended for prod)
* **Selected networks** — specific VNets + IP ranges
* **Private endpoint only** — fully locked down

**Trusted Microsoft Services bypass:**
Certain Azure services (Azure Backup, Azure Site Recovery, Azure DevOps, Azure Resource Manager) need Key Vault access even when the firewall is enabled. The "Allow trusted Microsoft services" option permits these.

```hcl
resource "azurerm_key_vault" "main" {
  network_acls {
    default_action             = "Deny"
    bypass                     = "AzureServices"  # Allow trusted MS services
    virtual_network_subnet_ids = [azurerm_subnet.app.id]
    ip_rules                   = ["203.0.113.0/24"]
  }
}
```

---

### Q10. What is the difference between HSM-backed keys and software-protected keys in Key Vault?

**Answer:**

|                           | Software-protected         | HSM-protected                                        |
| ------------------------- | -------------------------- | ---------------------------------------------------- |
| **Key Vault tier**  | Standard or Premium        | Premium only                                         |
| **Storage**         | Encrypted in Azure storage | Never leaves HSM hardware                            |
| **Key types**       | RSA, EC                    | RSA-HSM, EC-HSM                                      |
| **FIPS compliance** | FIPS 140-2 Level 1         | FIPS 140-2 Level 2                                   |
| **Cost**            | Lower                      | Higher                                               |
| **Use case**        | Most applications          | PCI-DSS, high-security signing, regulated industries |

**Managed HSM:**
For workloads requiring FIPS 140-2 Level 3 compliance, Azure offers **Managed HSM** — a fully managed, dedicated HSM cluster where you hold the security domain.

---

### Q11. How do you implement least-privilege access for Key Vault in a microservices architecture?

**Answer:**
**Principles:**

* Each service gets its own Managed Identity
* Each identity gets minimum necessary RBAC role
* Never share identities between services
* Use separate Key Vaults per environment (dev/staging/prod)

**Example — 3 microservices with different needs:**

```bash
# Service A (payment) — needs to read payment secrets
az role assignment create \
  --role "Key Vault Secrets User" \
  --assignee <payment-service-identity-id> \
  --scope "/subscriptions/.../vaults/kv-prod/secrets/payment-api-key"

# Service B (notifications) — needs to read SMTP secrets
az role assignment create \
  --role "Key Vault Secrets User" \
  --assignee <notification-service-identity-id> \
  --scope "/subscriptions/.../vaults/kv-prod/secrets/smtp-password"
```

**Key practices:**

* Scope to individual secrets, not the entire vault
* Periodically review and revoke unused assignments
* Use Azure Policy to enforce Key Vault security baseline
* Enable Defender for Key Vault for threat detection

---

### Q12. How do you rotate a Key Vault secret used by multiple applications without downtime?

**Answer:**
**Two-version rotation pattern:**

1. **Store two secrets** : `db-password-current` and `db-password-next`
2. **All apps read both** and try current first, fall back to next
3. **Rotation steps:**
   * Update target service (DB) to accept both old and new password
   * Set `db-password-next` to new value
   * Update all apps to primary = next, fallback = current
   * Once all apps updated, update DB to only accept new password
   * Archive `db-password-current`

**Automated with Azure Automation or Logic Apps:**

* Trigger on `SecretNearExpiry` Event Grid event
* Invoke rotation Function App
* Send notification on completion

**Key Vault secret versioning helps:** Apps pinned to `latest` automatically get new values. Apps pinned to a specific version ID are unaffected until they update.

---

### Q13. What is Certificate Management in Azure Key Vault?

**Answer:**
Key Vault manages the full lifecycle of X.509 certificates.

**Capabilities:**

* **Auto-renewal** — integrates with DigiCert and GlobalSign CAs for automatic renewal before expiry
* **Import** — import existing PFX/PEM certificates
* **Self-signed** — generate for dev/test use
* **Export** (if `exportable = true`) — retrieve private key for use in non-Azure services

**Create certificate with auto-renewal:**

```bash
az keyvault certificate create \
  --vault-name my-vault \
  --name my-app-cert \
  --policy "$(az keyvault certificate get-default-policy)"
```

**Use in App Service:**

```hcl
resource "azurerm_app_service_certificate" "cert" {
  name                = "my-cert"
  resource_group_name = var.rg_name
  location            = var.location
  key_vault_secret_id = azurerm_key_vault_certificate.cert.secret_id
}
```

---

### Q14. How would you use Azure Key Vault in a CI/CD pipeline?

**Answer:**
**Azure DevOps — Azure Key Vault task:**

```yaml
- task: AzureKeyVault@2
  inputs:
    azureSubscription: 'my-service-connection'
    KeyVaultName: 'my-vault'
    SecretsFilter: 'db-password, api-key'
    RunAsPreJob: true
```

Secrets become pipeline variables automatically.

**GitHub Actions — azure/get-keyvault-secrets:**

```yaml
- uses: Azure/get-keyvault-secrets@v1
  with:
    keyvault: "my-vault"
    secrets: "db-password, api-key"
  id: mySecrets

- name: Use secret
  run: echo "DB=${{ steps.mySecrets.outputs.db-password }}"
```

**Best practices:**

* CI/CD service principal should have `Key Vault Secrets User` role (read-only)
* Never log secrets — mask them in pipeline output
* Use separate Key Vaults for build-time vs runtime secrets
* Rotate pipeline credentials regularly

---

### Q15. How does Key Vault Defender (Microsoft Defender for Key Vault) work?

**Answer:**
Microsoft Defender for Key Vault detects unusual and potentially harmful access patterns.

**What it detects:**

* Access from unusual IPs or geographies
* High volume of access operations (potential credential stuffing)
* Access from known malicious IPs (threat intelligence)
* Application impersonation (access patterns inconsistent with normal app behavior)
* Potential data exfiltration patterns (bulk secret reads)

**Alerts examples:**

* `Unusual application accessed a Key Vault`
* `Access from a TOR exit node`
* `Volume anomaly in Key Vault operations`

**Enabling:**

```bash
az security pricing create --name KeyVaults --tier standard
```

**Integrate alerts:**

* Route to Azure Sentinel for SIEM correlation
* Configure Logic App playbooks for automated response (e.g., revoke access on alert)

---

# 4. Azure App Services

> Azure App Service is a fully managed PaaS for hosting web applications, REST APIs, and mobile backends. It supports multiple languages, auto-scaling, built-in CI/CD, and rich DevOps integrations.

---

### Q1. What is Azure App Service and what are its key components?

**Answer:**
Azure App Service is a managed platform for hosting web applications with the following components:

| Component                               | Description                                                                    |
| --------------------------------------- | ------------------------------------------------------------------------------ |
| **App Service Plan**              | The underlying compute — defines VM size, OS, pricing tier                    |
| **Web App**                       | The hosted application (can be .NET, Node.js, Java, Python, PHP, Ruby, Docker) |
| **Deployment Slots**              | Named environments (staging, production) within an App Service                 |
| **App Service Environment (ASE)** | Fully isolated, dedicated infrastructure within your VNet                      |

**Key features:**

* Built-in auto-scaling (horizontal and vertical)
* Custom domains + managed TLS certificates
* Integrated CI/CD with GitHub, Azure DevOps, Bitbucket
* WebJobs for background tasks
* Hybrid connections to on-premises services

---

### Q2. Explain the App Service Plans and their pricing tiers.

**Answer:**
An App Service Plan defines the compute resources shared across apps.

| Tier                       | Features                                                              | Use Case                            |
| -------------------------- | --------------------------------------------------------------------- | ----------------------------------- |
| **Free/Shared**      | Shared infrastructure, no SLA, limited                                | Dev/test only                       |
| **Basic**            | Dedicated VMs, manual scale, custom domains                           | Dev/test, low traffic               |
| **Standard**         | Auto-scale, deployment slots (5), daily backups                       | Production apps                     |
| **Premium**          | More memory/CPU, more slots (20), VNet integration, private endpoints | High-performance production         |
| **Isolated / ASEv3** | Dedicated VNet, max scale, highest compliance                         | Regulated industries, max isolation |

**Multiple apps per plan:** All apps in a plan share the same compute resources. Use separate plans for apps with different scaling needs to prevent resource contention.

---

### Q3. What are Deployment Slots and how does Blue-Green deployment work?

**Answer:**
Deployment Slots are live environments within an App Service (e.g., production, staging, QA). Each slot has its own hostname.

**Blue-Green deployment flow:**

1. **Production** slot serves live traffic (`myapp.azurewebsites.net`)
2. Deploy new version to **Staging** slot (`myapp-staging.azurewebsites.net`)
3. Run smoke tests on staging
4. **Swap** slots — routing switches instantly; staging becomes production, production becomes staging
5. Previous production (now in staging) is available for **instant rollback**

```bash
# Swap staging to production
az webapp deployment slot swap \
  --name my-app \
  --resource-group my-rg \
  --slot staging \
  --target-slot production
```

**Slot settings (sticky):** Mark settings as "slot settings" so they don't swap (e.g., connection strings pointing to production DB stay in production slot).

---

### Q4. How does App Service VNet Integration work?

**Answer:**
VNet Integration allows an App Service to make **outbound** calls to resources in a VNet (databases, internal services) without public internet.

**Regional VNet Integration:**

* App Service connects to a dedicated subnet in your VNet
* Supports Azure routes and NSG rules
* Requires a `/28` or larger subnet dedicated to App Service
* Does NOT allow inbound traffic from VNet (use Private Endpoint for that)

```hcl
resource "azurerm_app_service_virtual_network_swift_connection" "vnet_int" {
  app_service_id = azurerm_app_service.app.id
  subnet_id      = azurerm_subnet.app_integration.id
}
```

**Gateway-required VNet Integration:** For connecting to VNets in different regions or classic VNets — uses a VPN gateway.

**Routing all traffic through VNet:**
Set `WEBSITE_VNET_ROUTE_ALL = 1` to route all outbound traffic (including internet) through the VNet (for NVAs/firewalls).

---

### Q5. What are App Service Private Endpoints?

**Answer:**
A Private Endpoint assigns a private IP from your VNet to an App Service, enabling **inbound** traffic only from within the VNet (and connected networks).

**Effect:**

* App Service's public endpoint is disabled (or firewalled)
* Traffic to `myapp.azurewebsites.net` resolves to a private IP
* Required for apps that must not be accessible from the internet

**Combination for full isolation:**

```
Internet → Application Gateway (WAF) → Private Endpoint → App Service → VNet Integration → Internal DB
```

**DNS:** Requires Private DNS Zone `privatelink.azurewebsites.net` linked to the VNet.

**Difference from VNet Integration:**

* **Private Endpoint** = inbound isolation (secure ingress)
* **VNet Integration** = outbound routing (secure egress to private resources)

---

### Q6. How does autoscaling work in Azure App Services?

**Answer:**
App Service supports two types of scaling:

**Scale Up (Vertical):** Increase the App Service Plan tier (more CPU/RAM). Requires a brief restart.

**Scale Out (Horizontal):** Add more instances. No downtime. Available on Standard tier+.

**Autoscale configuration (scale out):**

```json
{
  "rules": [
    {
      "metricTrigger": {
        "metricName": "CpuPercentage",
        "threshold": 70,
        "operator": "GreaterThan",
        "timeAggregation": "Average"
      },
      "scaleAction": { "direction": "Increase", "value": "1", "cooldown": "PT5M" }
    },
    {
      "metricTrigger": {
        "metricName": "CpuPercentage",
        "threshold": 30,
        "operator": "LessThan"
      },
      "scaleAction": { "direction": "Decrease", "value": "1", "cooldown": "PT10M" }
    }
  ],
  "capacity": { "minimum": "2", "maximum": "10", "default": "2" }
}
```

**Key metrics for scaling:** CPU%, Memory%, HTTP queue length, requests per second.

---

### Q7. How do you configure CI/CD for Azure App Services?

**Answer:**
**Option 1: GitHub Actions (recommended):**

```yaml
- name: Deploy to Azure Web App
  uses: azure/webapps-deploy@v2
  with:
    app-name: 'my-app'
    slot-name: 'staging'
    publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
    package: './dist'
```

**Option 2: Azure DevOps Pipeline:**

```yaml
- task: AzureWebApp@1
  inputs:
    azureSubscription: 'my-service-connection'
    appName: 'my-app'
    deployToSlotOrASE: true
    resourceGroupName: 'my-rg'
    slotName: 'staging'
    package: '$(Build.ArtifactStagingDirectory)/**/*.zip'
```

**Option 3: App Service Deployment Center:**
Connects directly to GitHub/Bitbucket — configures a GitHub Action automatically. Good for quick setup.

**Best CI/CD flow:**
Build → Test → Deploy to Staging → Smoke Test → Swap to Production → Monitor

---

### Q8. What is App Service Authentication / Easy Auth?

**Answer:**
Easy Auth is a built-in authentication middleware for App Services — adds identity provider integration without writing auth code.

**Supported providers:**

* Azure Active Directory (Entra ID)
* Microsoft Account
* Facebook, Google, Twitter
* Any OpenID Connect provider

**How it works:**

* HTTP requests are intercepted at the platform level before reaching your app
* Unauthenticated requests are redirected to the identity provider
* After auth, a session cookie + claims are injected into request headers (`X-MS-CLIENT-PRINCIPAL`)

**When to use Easy Auth:**

* Quickly securing internal tools
* Apps where all routes require authentication
* Not suitable for fine-grained authorization logic

**When to use app-level auth:**

* Role-based access control (RBAC) within the app
* API endpoints with different auth requirements
* Custom token validation logic

---

### Q9. How does App Service handle application settings and connection strings?

**Answer:**
App Service provides two types of environment configuration:

**Application Settings:**

* Exposed as environment variables to the app
* Override any `appsettings.json` values (for .NET apps)
* Can reference Key Vault with `@Microsoft.KeyVault(...)` syntax

**Connection Strings:**

* Special handling for .NET apps — injected into `ConnectionStrings` configuration section
* Types: SQLServer, MySQL, PostgreSQL, Custom
* Also support Key Vault references

**Slot settings (sticky):** Check "Deployment slot setting" to prevent a setting from swapping — keeps prod DB connection in the production slot.

**Access in Node.js:**

```typescript
const dbConn = process.env.DATABASE_URL; // Set in App Settings
```

**Terraform example:**

```hcl
resource "azurerm_app_service" "app" {
  app_settings = {
    "NODE_ENV"       = "production"
    "DB_PASSWORD"    = "@Microsoft.KeyVault(VaultName=my-vault;SecretName=db-password)"
    "APPINSIGHTS_KEY" = azurerm_application_insights.main.instrumentation_key
  }
}
```

---

### Q10. What is Application Insights and how does it integrate with App Services?

**Answer:**
Application Insights is Azure's APM (Application Performance Monitoring) solution. It provides:

* **Live Metrics** — real-time request rate, failure rate, response time
* **Distributed tracing** — end-to-end request tracing across microservices
* **Exception tracking** — automatic capture with full stack traces
* **Dependency tracking** — DB query times, external HTTP call durations
* **Custom events and metrics** — business-level telemetry
* **Smart Detection** — AI-powered anomaly detection and alerts

**Enable in App Service:**

```hcl
resource "azurerm_application_insights" "main" {
  name             = "my-app-insights"
  application_type = "web"
}

resource "azurerm_app_service" "app" {
  app_settings = {
    "APPINSIGHTS_INSTRUMENTATIONKEY"        = azurerm_application_insights.main.instrumentation_key
    "APPLICATIONINSIGHTS_CONNECTION_STRING" = azurerm_application_insights.main.connection_string
  }
}
```

**Node.js SDK:**

```typescript
import { setup, start } from 'applicationinsights';
setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING).start();
```

---

### Q11. What are WebJobs in Azure App Service?

**Answer:**
WebJobs run background tasks alongside your web app, sharing the same App Service Plan resources.

**Types:**

| Type                            | Trigger                           | Use Case                 |
| ------------------------------- | --------------------------------- | ------------------------ |
| **Continuous**            | Runs constantly, restarts on exit | Message queue processors |
| **Triggered (Manual)**    | On-demand via API/portal          | Batch jobs               |
| **Triggered (Scheduled)** | CRON expression                   | Nightly data exports     |

**Supported executables:** .cmd, .bat, .exe, .sh, .py, .php, .js, .ps1, .jar, .fsx, .R

**Example CRON schedule (run at midnight daily):**

```json
{ "schedule": "0 0 0 * * *" }
```

**Modern alternative:** Azure Functions are the preferred solution for background tasks in new architectures. WebJobs are better when you need to run an existing executable or when the Function consumption model doesn't fit.

---

### Q12. How do you secure an App Service? Key security configurations.

**Answer:**

**1. Disable FTP/FTPS:**

```bash
az webapp config set --name my-app --ftps-state Disabled
```

**2. Enforce HTTPS only:**

```bash
az webapp update --name my-app --https-only true
```

**3. Set minimum TLS version:**

```bash
az webapp config set --name my-app --min-tls-version 1.2
```

**4. Disable public network access + use Private Endpoint**

**5. Enable Managed Identity for all external service access**

**6. Configure network access restrictions:**

```bash
az webapp config access-restriction add \
  --name my-app --rule-name "AllowFrontDoor" \
  --priority 100 --ip-address <FrontDoor-IP-Prefix>
```

**7. Enable Microsoft Defender for App Service**

**8. Use `WEBSITE_RUN_FROM_PACKAGE=1`** for read-only deployment (prevents code tampering)

**9. Enable diagnostic logging** — send logs to Log Analytics for security analysis

---

### Q13. What is App Service Environment (ASE) and when is it needed?

**Answer:**
App Service Environment (ASE) is a fully isolated, single-tenant deployment of Azure App Service within your own VNet.

**ASEv3 features:**

* All inbound and outbound traffic stays within your VNet
* Dedicated compute (no shared infrastructure with other customers)
* Maximum scale: 200 instances per App Service Plan
* Supports zone redundancy for HA
* No public IP required (Internal Load Balancer mode)

**When to use ASE:**

* Regulated industries (banking, healthcare, government) requiring full isolation
* Apps requiring very high scale
* Apps that must communicate with on-premises resources over ExpressRoute
* PCI-DSS, HIPAA, FedRAMP compliance requirements

**Cost:** Significantly higher than regular App Service (dedicated infrastructure). Only use when isolation is a hard requirement.

---

### Q14. How do you monitor and troubleshoot an Azure App Service?

**Answer:**

**Built-in diagnostics tools:**

* **Log stream** — real-time console logs: `az webapp log tail --name my-app --resource-group my-rg`
* **Diagnose and Solve Problems** — guided troubleshooting in Azure Portal
* **App Service Logs** — enable HTTP logging, application logging

**Enable logging:**

```bash
az webapp log config --name my-app \
  --application-logging filesystem \
  --level information \
  --web-server-logging filesystem \
  --detailed-error-messages true
```

**Key metrics to monitor:**

* `Http5xx` — server errors
* `Http4xx` — client errors
* `AverageResponseTime` — latency
* `MemoryWorkingSet` — memory pressure
* `CpuTime` — CPU consumption

**Common issues and diagnosis:**

* **Cold start** → Check minimum instance count, enable Always On
* **OutOfMemory** → Scale up or fix memory leaks
* **Timeouts** → Check ARR affinity, async/await patterns
* **Failed deployments** → Check Kudu console (`https://app.scm.azurewebsites.net`)

---

### Q15. What is ARR Affinity and when should you disable it?

**Answer:**
ARR (Application Request Routing) Affinity is a session-stickiness cookie (`ARRAffinity`) that routes a user's requests to the same App Service instance.

**When to keep enabled (default):**

* Applications storing session state in-memory
* Applications not designed for multi-instance scale

**When to disable:**

* Stateless applications (recommended architecture)
* When session state is stored externally (Redis, database)
* To improve load distribution across instances

```bash
az webapp update --name my-app --client-affinity-enabled false
```

**Best practice:** Design stateless applications and disable ARR Affinity. Store session state in Azure Cache for Redis. This enables true horizontal scaling without routing constraints.

---

# 5. How to Optimise a Database

---

### Q1. What are indexes and how do they improve query performance?

**Answer:**
An index is a separate data structure (typically a B-tree) that allows the database engine to find rows without scanning the entire table.

**Types of indexes:**

| Type                            | Description                                                              |
| ------------------------------- | ------------------------------------------------------------------------ |
| **Clustered**             | Physical order of rows = index order; one per table; usually primary key |
| **Non-clustered**         | Separate structure with pointers to data rows; multiple per table        |
| **Covering index**        | Includes all columns needed by a query (index + included columns)        |
| **Composite**             | Multi-column index — column order matters                               |
| **Partial/Filtered**      | Index only on a subset of rows                                           |
| **GIN/GiST (PostgreSQL)** | For JSON, arrays, full-text search                                       |

**Covering index example:**

```sql
-- Query: SELECT name, email FROM users WHERE country = 'IN'
-- Covering index: no table access needed
CREATE INDEX idx_users_country_covering ON users (country) INCLUDE (name, email);
```

**When NOT to over-index:**

* Every index slows down INSERT/UPDATE/DELETE
* Indexes consume disk space
* Index maintenance causes lock contention

---

### Q2. How do you identify slow queries and what tools do you use?

**Answer:**

**PostgreSQL:**

```sql
-- Enable slow query logging
SET log_min_duration_statement = 1000; -- Log queries > 1 second

-- Find top slow queries
SELECT query, mean_exec_time, calls, total_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;
```

**MySQL:**

```sql
-- Enable slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;

-- Analyze with EXPLAIN
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 100;
```

**Azure SQL / SQL Server:**

```sql
-- Query Store (always-on by default in Azure SQL)
SELECT TOP 10 qt.query_sql_text, rs.avg_duration, rs.count_executions
FROM sys.query_store_query_text qt
JOIN sys.query_store_plan qp ON qt.query_text_id = qp.query_text_id
JOIN sys.query_store_runtime_stats rs ON qp.plan_id = rs.plan_id
ORDER BY rs.avg_duration DESC;
```

**Tools:** Azure Query Performance Insight, pgBadger (PostgreSQL), Percona Toolkit (MySQL), DataDog APM, New Relic.

---

### Q3. What is query execution plan analysis? What are the key bad patterns to look for?

**Answer:**
Execution plans show how the database engine processes a query. Always analyze plans for slow queries.

**How to get:**

```sql
EXPLAIN ANALYZE SELECT o.id, u.name
FROM orders o JOIN users u ON o.user_id = u.id
WHERE o.status = 'pending';
```

**Bad patterns in execution plans:**

| Pattern                                 | Problem                            | Fix                                    |
| --------------------------------------- | ---------------------------------- | -------------------------------------- |
| **Seq Scan on large table**       | Full table scan — no index used   | Add index on filter column             |
| **Nested Loop on large tables**   | O(n²) join — missing index       | Add index on join column               |
| **Sort without index**            | Sorting millions of rows in memory | Index on ORDER BY column               |
| **High estimated vs actual rows** | Stale statistics                   | Run `ANALYZE`/`UPDATE STATISTICS`  |
| **Hash Join spilling to disk**    | Insufficient `work_mem`          | Increase `work_mem`or optimize query |

**Key EXPLAIN output fields:**

* `cost` — estimated cost (relative, not milliseconds)
* `actual time` — actual execution time in ms
* `rows` — actual vs estimated rows
* `Buffers` — cache hits vs disk reads

---

### Q4. What is database connection pooling and why is it essential?

**Answer:**
Connection pooling maintains a pool of pre-established database connections that are reused across requests, instead of creating/destroying a connection per request.

**Without pooling:** Each request → new TCP connection → auth handshake → query → close. For 1000 req/s: 1000 new connections/second — overwhelming the DB.

**With pooling:** App requests a connection from the pool → uses it → returns it. Pool maintains ~10-50 connections total.

**Node.js example with `pg` pool:**

```typescript
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST,
  database: 'mydb',
  max: 20,           // Max connections in pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Usage
const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
```

**Azure SQL connection pool sizing:**

* Max connections per Azure SQL tier are limited
* DTU-based: Basic = 30, Standard = 300, Premium = 1000 connections max
* Use `pgBouncer` (PostgreSQL) or `HikariCP` (Java) for external poolers

---

### Q5. What are the key database optimization strategies for a production application?

**Answer:**

**Query-level:**

* Index frequently filtered, sorted, and joined columns
* Use covering indexes for high-frequency queries
* Rewrite N+1 queries with JOINs or batch fetching
* Use pagination (`LIMIT/OFFSET` or keyset pagination)
* Avoid `SELECT *` — fetch only needed columns

**Schema-level:**

* Normalize to remove data duplication (3NF)
* Denormalize strategically for read-heavy tables
* Partition large tables (range, list, hash partitioning)
* Archive or delete old data regularly
* Use appropriate data types (store dates as `DATE`, not `VARCHAR`)

**Database-level:**

* Connection pooling
* Read replicas for read-heavy workloads
* Caching layer (Redis) for frequently read, rarely changed data
* Query result caching where appropriate
* Vacuum/Analyze (PostgreSQL) — reclaim space and update statistics

**Infrastructure-level:**

* Scale up DB compute for CPU/memory-bound workloads
* Use SSD storage (Premium tier in Azure)
* Place DB in same region/zone as application
* Monitor with Query Performance Insight / pg_stat_statements

**Caching pattern (Redis):**

```typescript
const cached = await redis.get(`user:${userId}`);
if (cached) return JSON.parse(cached);

const user = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
await redis.set(`user:${userId}`, JSON.stringify(user), 'EX', 300); // 5 min TTL
return user;
```

---

### Q6. What is N+1 query problem and how do you fix it?

**Answer:**
The N+1 problem occurs when an application executes 1 query to fetch N records, then N additional queries to fetch related data for each record.

**Example (bad — N+1):**

```typescript
const orders = await db.query('SELECT * FROM orders'); // 1 query
for (const order of orders) {
  const user = await db.query('SELECT * FROM users WHERE id = $1', [order.user_id]); // N queries
}
// Total: 1 + N queries
```

**Fix 1: JOIN:**

```sql
SELECT o.*, u.name, u.email
FROM orders o
JOIN users u ON o.user_id = u.id;
```

**Fix 2: Batch load (DataLoader pattern):**

```typescript
const userIds = orders.map(o => o.user_id);
const users = await db.query('SELECT * FROM users WHERE id = ANY($1)', [userIds]);
const userMap = Object.fromEntries(users.rows.map(u => [u.id, u]));
orders.forEach(o => { o.user = userMap[o.user_id]; });
```

**Detection:** Count distinct SQL queries per request in APM tools. Use ORM eager loading (`include`, `with`, `joins`).

---

### Q7. What is database sharding and when would you use it?

**Answer:**
Sharding is horizontal partitioning — splitting data across multiple database instances (shards) where each shard holds a subset of the data.

**Sharding strategies:**

| Strategy                  | How                                | Example                                   |
| ------------------------- | ---------------------------------- | ----------------------------------------- |
| **Range-based**     | Shard by range of a key            | user_id 1-1M → Shard 1, 1M-2M → Shard 2 |
| **Hash-based**      | `shard = hash(key) % num_shards` | Consistent hashing in distributed systems |
| **Directory-based** | Lookup table maps keys to shards   | Geographic routing                        |

**When to shard:**

* Table has billions of rows that won't fit on one server
* Write throughput exceeds single-server capacity
* Database CPU/memory is fully saturated after optimization

**Challenges:**

* Cross-shard queries (JOINs, aggregations) are expensive
* Rebalancing shards is complex
* Application must be shard-aware

**When NOT to shard:**

* Most applications can scale with read replicas, better indexes, caching, and vertical scaling — try those first.

---

### Q8. What is database partitioning? How does it differ from sharding?

**Answer:**

|                        | Partitioning                                | Sharding                                 |
| ---------------------- | ------------------------------------------- | ---------------------------------------- |
| **Location**     | Multiple partitions on**same server** | Partitions on**different servers** |
| **Managed by**   | Database engine                             | Application layer                        |
| **Transparency** | Transparent to app                          | App must be shard-aware                  |
| **Use case**     | Large tables, time-series data              | Extreme scale beyond single server       |

**PostgreSQL table partitioning (time-series):**

```sql
CREATE TABLE events (
  id BIGINT,
  event_time TIMESTAMPTZ NOT NULL,
  data JSONB
) PARTITION BY RANGE (event_time);

CREATE TABLE events_2024_q1 PARTITION OF events
  FOR VALUES FROM ('2024-01-01') TO ('2024-04-01');

CREATE TABLE events_2024_q2 PARTITION OF events
  FOR VALUES FROM ('2024-04-01') TO ('2024-07-01');
```

**Benefits:** Query pruning (only scans relevant partitions), partition-level VACUUM, faster archival/deletion of old data.

---

# 6. Multiple Certifications in API Service & Express.js

> This covers SSL/TLS certificates, mutual TLS (mTLS), client certificates, and multi-cert patterns in Express.js APIs.

---

### Q1. What are SSL/TLS certificates and why do APIs need them?

**Answer:**
SSL/TLS certificates are cryptographic certificates that enable:

* **Encryption** — data in transit is encrypted (TLS 1.2/1.3)
* **Authentication** — proves the server's identity (clients verify they're talking to the right server)
* **Integrity** — ensures data hasn't been tampered with

**Why APIs need them:**

* Protect sensitive data (credentials, PII, tokens) in transit
* Required by compliance standards (PCI-DSS, HIPAA, GDPR)
* Browser APIs reject HTTP endpoints (mixed content)
* Authentication mechanisms (JWTs, API keys) become useless if intercepted via plain HTTP

**Types of certificates:**

| Type                        | Validation Level                 | Use Case                 |
| --------------------------- | -------------------------------- | ------------------------ |
| DV (Domain Validated)       | Proves domain ownership          | Dev/test, internal APIs  |
| OV (Organization Validated) | Proves domain + organization     | Business APIs            |
| EV (Extended Validation)    | Full org vetting                 | Consumer-facing services |
| Wildcard (`*.domain.com`) | Covers all subdomains            | API + subdomains         |
| mTLS / Client cert          | Client proves identity to server | Service-to-service auth  |

---

### Q2. What is mutual TLS (mTLS) and how does it differ from standard TLS?

**Answer:**

**Standard TLS (one-way):**

* Server presents its certificate to the client
* Client verifies server identity
* Client remains anonymous

**mTLS (mutual/two-way):**

* Server presents its certificate (client verifies server)
* **Client also presents its certificate (server verifies client)**
* Both parties are cryptographically authenticated

**When to use mTLS:**

* Service-to-service communication in microservices
* API security where you need to authenticate the calling service
* Zero-trust network architectures
* Replacing API keys with certificate-based auth

**Express.js mTLS setup:**

```typescript
import https from 'https';
import fs from 'fs';
import express from 'express';

const app = express();

const server = https.createServer({
  key: fs.readFileSync('./certs/server.key'),
  cert: fs.readFileSync('./certs/server.crt'),
  ca: fs.readFileSync('./certs/ca.crt'),     // CA that signed client certs
  requestCert: true,                          // Request client certificate
  rejectUnauthorized: true,                   // Reject if client cert invalid/missing
}, app);

server.listen(443);
```

---

### Q3. How do you add HTTPS with a single TLS certificate in Express.js?

**Answer:**

```typescript
import https from 'https';
import fs from 'fs';
import express from 'express';

const app = express();

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const options: https.ServerOptions = {
  key: fs.readFileSync('/etc/ssl/private/app.key'),
  cert: fs.readFileSync('/etc/ssl/certs/app.crt'),
  // Intermediate certificates (chain file)
  ca: fs.readFileSync('/etc/ssl/certs/intermediate.crt'),
  // Force TLS 1.2+
  minVersion: 'TLSv1.2',
};

const server = https.createServer(options, app);
server.listen(443, () => console.log('HTTPS server on port 443'));

// Redirect HTTP → HTTPS
import http from 'http';
http.createServer((req, res) => {
  res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
  res.end();
}).listen(80);
```

---

### Q4. What are multiple certificates in an API context? When would you need them?

**Answer:**
Multiple certificates refer to scenarios where an API handles more than one certificate simultaneously.

**Use cases:**

**1. Multi-domain / SNI (Server Name Indication):**

* One server hosts APIs for multiple domains
* Each domain has its own certificate
* TLS extension SNI allows the server to select the right cert based on hostname

**2. Certificate rotation (zero-downtime):**

* Load both the old and new certificate during transition
* Clients can connect with either during the overlap window

**3. mTLS with multiple client CAs:**

* Trust clients from multiple organizations, each with their own CA
* Server trusts all CAs in a CA bundle

**4. Different certs per subdomain:**

* `api.myapp.com` — API certificate
* `admin.myapp.com` — Admin panel certificate
* `internal.myapp.com` — Internal service certificate

---

### Q5. How do you implement SNI (multiple certificates) in Express.js using `tls.createSecureContext`?

**Answer:**
SNI allows serving different certificates based on the requesting hostname in a single server.

```typescript
import https from 'https';
import tls from 'tls';
import fs from 'fs';
import express from 'express';

const app = express();

// Create secure contexts for each domain
const sniContexts: Record<string, tls.SecureContext> = {
  'api.domain-a.com': tls.createSecureContext({
    key: fs.readFileSync('./certs/domain-a.key'),
    cert: fs.readFileSync('./certs/domain-a.crt'),
  }),
  'api.domain-b.com': tls.createSecureContext({
    key: fs.readFileSync('./certs/domain-b.key'),
    cert: fs.readFileSync('./certs/domain-b.crt'),
  }),
};

// Default context (fallback)
const defaultContext = tls.createSecureContext({
  key: fs.readFileSync('./certs/default.key'),
  cert: fs.readFileSync('./certs/default.crt'),
});

const serverOptions: https.ServerOptions = {
  // SNI callback — called per connection
  SNICallback: (serverName, callback) => {
    const ctx = sniContexts[serverName] ?? defaultContext;
    callback(null, ctx);
  },
  // Default cert (required even with SNICallback)
  key: fs.readFileSync('./certs/default.key'),
  cert: fs.readFileSync('./certs/default.crt'),
};

https.createServer(serverOptions, app).listen(443, () => {
  console.log('Multi-cert HTTPS server running');
});
```

---

### Q6. How do you implement certificate pinning in an Express.js API client?

**Answer:**
Certificate pinning ensures the client only trusts a specific certificate (or its public key hash), preventing MITM attacks even if a CA is compromised.

**Server-side (Express — accepting only pinned client cert):**

```typescript
import https from 'https';
import crypto from 'crypto';
import express from 'express';
import { Request, Response, NextFunction } from 'express';

const PINNED_CERT_FINGERPRINT = 'AB:CD:EF:...'; // SHA-256 fingerprint

const app = express();

// Middleware to verify client certificate fingerprint
app.use((req: Request, res: Response, next: NextFunction) => {
  const socket = req.socket as tls.TLSSocket;
  const cert = socket.getPeerCertificate();

  if (!cert || !Object.keys(cert).length) {
    return res.status(401).json({ error: 'Client certificate required' });
  }

  const fingerprint = cert.fingerprint256;
  if (fingerprint !== PINNED_CERT_FINGERPRINT) {
    return res.status(403).json({ error: 'Certificate not trusted' });
  }

  next();
});
```

**Client-side (Node.js HTTP client with pinning):**

```typescript
import https from 'https';
import tls from 'tls';

const options: https.RequestOptions = {
  hostname: 'api.myservice.com',
  checkServerIdentity: (host, cert) => {
    // Custom verification — check fingerprint
    if (cert.fingerprint256 !== KNOWN_FINGERPRINT) {
      throw new Error('Certificate fingerprint mismatch');
    }
    return undefined; // Return undefined = no error
  },
};
```

---

### Q7. How do you handle certificate rotation in an Express.js API without downtime?

**Answer:**
Certificate rotation without downtime requires reloading certificates while the server is running.

**Hot reload pattern using `tls.createSecureContext`:**

```typescript
import https from 'https';
import tls from 'tls';
import fs from 'fs';
import express from 'express';

const app = express();

let currentContext = tls.createSecureContext({
  key: fs.readFileSync('./certs/server.key'),
  cert: fs.readFileSync('./certs/server.crt'),
});

// SNI callback always uses the latest context
const server = https.createServer({
  SNICallback: (_servername, cb) => cb(null, currentContext),
  key: fs.readFileSync('./certs/server.key'),
  cert: fs.readFileSync('./certs/server.crt'),
}, app);

// Reload certificates without restarting the server
function reloadCertificates() {
  try {
    currentContext = tls.createSecureContext({
      key: fs.readFileSync('./certs/server.key'),
      cert: fs.readFileSync('./certs/server.crt'),
    });
    console.log('Certificates reloaded at', new Date().toISOString());
  } catch (err) {
    console.error('Certificate reload failed:', err);
  }
}

// Reload every hour (or on SIGHUP signal)
setInterval(reloadCertificates, 60 * 60 * 1000);
process.on('SIGHUP', reloadCertificates);

server.listen(443);
```

---

### Q8. How do you validate client certificates in Express.js for API authentication?

**Answer:**
Client certificate validation replaces password/token-based auth with cryptographic identity.

```typescript
import https from 'https';
import express, { Request, Response, NextFunction } from 'express';
import { TLSSocket } from 'tls';
import fs from 'fs';

const app = express();

// Middleware to extract and validate client cert
function requireClientCert(req: Request, res: Response, next: NextFunction) {
  const socket = req.socket as TLSSocket;
  const cert = socket.getPeerCertificate(true);

  if (!cert || !Object.keys(cert).length) {
    return res.status(401).json({ error: 'Client certificate required' });
  }

  if (!socket.authorized) {
    return res.status(403).json({
      error: 'Invalid client certificate',
      reason: socket.authorizationError
    });
  }

  // Extract identity from certificate
  const clientId = cert.subject?.CN;           // Common Name
  const orgUnit = cert.subject?.OU;            // Org Unit (e.g., service name)
  const validFrom = new Date(cert.valid_from);
  const validTo = new Date(cert.valid_to);

  if (new Date() > validTo) {
    return res.status(403).json({ error: 'Client certificate expired' });
  }

  // Attach to request for use in route handlers
  (req as any).clientIdentity = { clientId, orgUnit };
  next();
}

app.use('/api/secure', requireClientCert);

app.get('/api/secure/data', (req: any, res) => {
  res.json({ message: `Hello, ${req.clientIdentity.clientId}` });
});

https.createServer({
  key: fs.readFileSync('./certs/server.key'),
  cert: fs.readFileSync('./certs/server.crt'),
  ca: fs.readFileSync('./certs/client-ca.crt'),
  requestCert: true,
  rejectUnauthorized: false, // Handle in middleware for custom error responses
}, app).listen(443);
```

---

### Q9. What is the difference between self-signed certificates, CA-signed certificates, and Let's Encrypt?

**Answer:**

| Type                    | Signed by                            | Trust                                 | Use Case                         |
| ----------------------- | ------------------------------------ | ------------------------------------- | -------------------------------- |
| **Self-signed**   | The server itself                    | Not trusted by browsers/OS by default | Local dev, internal mTLS         |
| **CA-signed**     | Commercial CA (DigiCert, GlobalSign) | Trusted globally                      | Production public APIs           |
| **Let's Encrypt** | ISRG (non-profit CA)                 | Trusted by all major browsers         | Production (free, auto-renewing) |
| **Private CA**    | Internal CA (Azure Key Vault CA)     | Trusted within org                    | Internal microservices mTLS      |

**Let's Encrypt in Express.js (using `acme-client`):**

```typescript
import acme from 'acme-client';

async function getCertificate(domain: string) {
  const client = new acme.Client({
    directoryUrl: acme.directory.letsencrypt.production,
    accountKey: await acme.crypto.createPrivateKey(),
  });

  const [key, csr] = await acme.crypto.createCsr({ commonName: domain });
  const cert = await client.auto({
    csr,
    email: 'admin@mydomain.com',
    termsOfServiceAgreed: true,
    challengeCreateFn: async (authz, challenge, keyAuthorization) => {
      // Serve HTTP-01 challenge at /.well-known/acme-challenge/
    },
    challengeRemoveFn: async () => {},
  });

  return { key, cert };
}
```

---

### Q10. How would you set up a production-ready HTTPS Express.js API with best practices?

**Answer:**

```typescript
import express from 'express';
import https from 'https';
import http from 'http';
import helmet from 'helmet';
import fs from 'fs';
import tls from 'tls';

const app = express();

// Security headers
app.use(helmet({
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  contentSecurityPolicy: true,
}));

// Force HTTPS
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https') {
    return res.redirect(301, `https://${req.header('host')}${req.url}`);
  }
  next();
});

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

const tlsOptions: https.ServerOptions = {
  key: fs.readFileSync(process.env.TLS_KEY_PATH!),
  cert: fs.readFileSync(process.env.TLS_CERT_PATH!),
  ca: process.env.TLS_CA_PATH ? fs.readFileSync(process.env.TLS_CA_PATH) : undefined,
  minVersion: 'TLSv1.2',
  ciphers: [
    'TLS_AES_256_GCM_SHA384',
    'TLS_CHACHA20_POLY1305_SHA256',
    'ECDHE-RSA-AES256-GCM-SHA384',
  ].join(':'),
  honorCipherOrder: true,
  sessionTimeout: 300,
};

// HTTPS server
https.createServer(tlsOptions, app).listen(443, () => {
  console.log('HTTPS API server on :443');
});

// HTTP → HTTPS redirect
http.createServer(app).listen(80);
```

**Production checklist:**

* TLS 1.2+ only
* Strong cipher suites (disable weak ciphers)
* HSTS header with long max-age
* Certificate auto-renewal (Let's Encrypt or Key Vault)
* Private key permissions: `chmod 400` (owner read-only)
* Disable TLS session resumption if compliance requires it
* Monitor certificate expiry with Alerting

---

*End of Interview Preparation Guide*
*Topics: Temporal Architecture · Terraform · Azure Key Vault · Azure App Services · DB Optimization · API Certifications in Express.js*
