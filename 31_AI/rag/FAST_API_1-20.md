# FastAPI Interview Questions for Google Cloud AI Engineer

For your Google Cloud AI Engineer interview, I would prioritize FastAPI fundamentals, production API design, asynchronous execution, security, and serving GenAI/RAG applications.

Based on your prep-call transcript, Round 1 focuses on AI domain knowledge, while Round 2 includes coding and system design. FastAPI questions could appear in either round, particularly when discussing how you expose an LLM, RAG pipeline, or agent as a production service.

Given your experience with Python, LangGraph, RAG, Azure AI Foundry, and agentic AI, prepare to explain not just how FastAPI works, but how you would use it to build a reliable, secure AI service.

## 1. The 15 most important FastAPI questions

| #  | Expected question                                                                  | Priority  |
| -- | ---------------------------------------------------------------------------------- | --------- |
| 1  | What is FastAPI, and why use it?                                                   | Very high |
| 2  | FastAPI vs Flask vs Django?                                                        | Very high |
| 3  | What is the difference between `async def` and `def`?                              | Very high |
| 4  | How does FastAPI handle request validation?                                        | Very high |
| 5  | What is Pydantic?                                                                  | Very high |
| 6  | How do you implement exception handling?                                           | High      |
| 7  | What is dependency injection in FastAPI?                                           | Very high |
| 8  | How do you implement authentication and authorization?                             | Very high |
| 9  | How do you handle long-running LLM requests?                                       | Very high |
| 10 | How do you stream LLM responses?                                                   | High      |
| 11 | How do you handle concurrent requests?                                             | Very high |
| 12 | How do you implement rate limiting?                                                | High      |
| 13 | How do you manage database connections?                                            | High      |
| 14 | How do you deploy FastAPI using Docker and cloud services?                         | Very high |
| 15 | How would you design a production FastAPI service for a RAG or multi-agent system? | Very high |

## 2. Core FastAPI questions with interview-ready answers

### Q1. What is FastAPI, and why would you use it for GenAI applications?

Interview-ready answer:

“FastAPI is a Python web framework for building APIs. It supports type hints, automatic request validation through Pydantic, dependency injection, asynchronous request handling, and automatic OpenAPI documentation.

For GenAI applications, I can use FastAPI to expose endpoints for RAG queries, LLM inference, agent execution, document ingestion, and health checks. It also integrates well with Python AI libraries such as LangChain, LangGraph, and model-serving libraries.

However, FastAPI's asynchronous support does not automatically make model inference faster. For production workloads, I still need appropriate concurrency controls, timeouts, resource management, and potentially a separate inference service.”

Example:

```
from fastapi import FastAPIapp = FastAPI()@app.get("/health")async def health_check():    return {"status": "healthy"}
```

This creates a health endpoint at `/health`.

### Q2. FastAPI vs Flask vs Django?

Interview-ready answer:

“FastAPI is particularly suitable for typed APIs and asynchronous workloads. Flask is a lightweight framework with a simple programming model, while Django provides a more comprehensive framework with features such as an ORM, authentication, and an admin interface.

For a GenAI microservice that exposes RAG and agent workflows, I would generally consider FastAPI because of its request validation, API documentation, and async support. The final choice depends on the application’s requirements and existing architecture.”

| Feature           | FastAPI                   | Flask                                          | Django                               |
| ----------------- | ------------------------- | ---------------------------------------------- | ------------------------------------ |
| Primary focus     | API development           | Lightweight web applications                   | Full-stack web applications          |
| Validation        | Integrated with Pydantic  | Usually added separately                       | Forms/serializers depending on stack |
| Async support     | Built-in                  | Supported, with limitations depending on usage | Supported in modern versions         |
| API documentation | Automatic OpenAPI         | Usually added via extensions                   | Commonly via REST Framework tooling  |
| Best fit          | AI APIs and microservices | Simple services                                | Larger integrated web applications   |

### Q3. What is the difference between `async def` and `def` in FastAPI?

Interview-ready answer:

“An `async def` function can use `await` to suspend execution while waiting for an asynchronous operation, allowing the event loop to handle other tasks. A normal `def` endpoint is executed in an external thread pool by FastAPI/Starlette rather than directly blocking the event loop.

For I/O-bound workloads, such as asynchronous HTTP calls to an LLM provider, async execution can improve concurrency. For CPU-intensive work or blocking operations, simply declaring a function as async does not help and can block the event loop if the work runs directly inside it.”

Example:

```
import httpxfrom fastapi import FastAPIapp = FastAPI()@app.get("/model-info")async def model_info():    async with httpx.AsyncClient() as client:        response = await client.get(            "https://example.com/model-info",            timeout=10.0        )        response.raise_for_status()        return response.json()
```

Important distinction:

- `async def` + `await` on non-blocking I/O → supports concurrency.
- `async def` + blocking network call → may block the event loop.
- CPU-heavy inference → consider a separate worker or inference service.

### Q4. What is Pydantic, and how does FastAPI use it?

Interview-ready answer:

“Pydantic is a Python data validation library that uses type annotations to validate and parse data into defined models. FastAPI uses Pydantic models to validate request bodies, define response schemas, and generate API documentation.

In a RAG service, I would use Pydantic to validate the user's question, optional retrieval parameters, and response structure before the request reaches the retrieval or generation pipeline.”

Example:

```
from pydantic import BaseModel, Fieldclass RAGRequest(BaseModel):    question: str = Field(min_length=1, max_length=2000)    top_k: int = Field(default=5, ge=1, le=20)
```

FastAPI can use this model as a request body:

```
from fastapi import FastAPIapp = FastAPI()@app.post("/rag/query")async def query_rag(request: RAGRequest):    return {        "question": request.question,        "top_k": request.top_k    }
```

Invalid input, such as `top_k=0`, is rejected during validation.

Google-level follow-up: Input validation is not authorization. A valid `tenant_id` supplied by a client does not prove that the client is allowed to access that tenant's data.

### Q5. How does dependency injection work in FastAPI?

Interview-ready answer:

“Dependency injection lets FastAPI resolve and provide shared components or request-specific resources to endpoints. I can use it for authentication, database sessions, configuration, service objects, and other reusable functionality.

For example, in an enterprise RAG application, I can create a dependency that authenticates the user and returns their trusted identity and permissions. The endpoint then uses those permissions when retrieving documents.”

Example:

```
from typing import Annotatedfrom fastapi import Depends, FastAPIapp = FastAPI()def get_current_user():    # Illustrative only; production code verifies a real credential.    return {"user_id": "user123", "role": "reader"}@app.get("/profile")async def profile(    user: Annotated[dict, Depends(get_current_user)]):    return {"user_id": user["user_id"]}
```

This example demonstrates dependency wiring only; the function is not actual authentication.

Benefits: Reusability, testability, separation of concerns, and centralized enforcement of common requirements.

### Q6. How do you handle exceptions in FastAPI?

Interview-ready answer:

“I use `HTTPException` for expected HTTP errors and custom exception handlers for consistent application-wide error responses. I distinguish client errors, authentication failures, rate limits, timeouts, and internal server errors.

For an LLM service, I avoid returning raw stack traces, provider credentials, prompts, or internal document content to clients. I log diagnostic information securely and return a stable error code and request ID.”

Example:

```
from fastapi import FastAPI, HTTPExceptionapp = FastAPI()@app.get("/documents/{document_id}")async def get_document(document_id: str):    document = None  # Replace with database lookup.    if document is None:        raise HTTPException(            status_code=404,            detail="Document not found"        )    return document
```

Know these status codes:

- `400` — Invalid request.
- `401` — Authentication required or invalid.
- `403` — Access denied.
- `404` — Resource not found.
- `422` — Request validation failure in typical FastAPI validation handling.
- `429` — Rate limit exceeded.
- `500` — Unexpected server error.
- `502` / `503` / `504` — Upstream or service availability/timeout issues, depending on the failure.

## 3. FastAPI for production GenAI systems

### Q7. How would you implement authentication and authorization?

Interview-ready answer:

“I would use an established identity provider and validate access tokens server-side. FastAPI dependencies can enforce authentication and authorization before invoking the business logic.

For a multi-tenant RAG application, I would derive the tenant and permissions from the verified identity or trusted policy service, then apply them to database queries, document retrieval, caches, and tool calls. I would use least-privilege service identities, secure secrets management, TLS, and audit logs.”

Important: Hiding an endpoint or checking a role in the frontend is not security. The backend must enforce access controls.

### Q8. How would you handle a long-running LLM request?

Interview-ready answer:

“First, I would establish a request timeout and understand the latency requirements. For short requests, I may return the result synchronously. For long-running agent workflows, I would submit a job to a queue, return a job ID with an appropriate HTTP status, and expose endpoints to check job status or retrieve the result.

I would also use bounded concurrency, retry policies for transient failures, idempotency where appropriate, and a mechanism to report failures. I would not keep an HTTP connection open indefinitely while an agent performs a long workflow.”

Example architecture:

Client

FastAPI endpoint

Queue / job store

Worker → LangGraph / RAG / LLM

Client polls job status or receives a completion notification.

For Google Cloud, an implementation could use Cloud Run for the API and a suitable queue and worker service. The exact services depend on latency, workload duration, and deployment requirements.

### Q9. How would you stream LLM responses using FastAPI?

Interview-ready answer:

“I can use `StreamingResponse` to return chunks as they become available instead of waiting for the entire response. For a conversational AI application, I would typically consider Server-Sent Events (SSE) for one-way streaming from server to client, or WebSockets when bidirectional real-time communication is required.

I would propagate cancellation when possible, handle provider errors during streaming, and ensure that sensitive internal reasoning or hidden prompts are not exposed.”

Example:

```
import asynciofrom fastapi import FastAPIfrom fastapi.responses import StreamingResponseapp = FastAPI()async def generate_stream():    for token in ["Hello", " from", " the", " AI", " service."]:        yield token        await asyncio.sleep(0.1)@app.get("/chat/stream")async def chat_stream():    return StreamingResponse(        generate_stream(),        media_type="text/plain"    )
```

This is a simplified streaming demonstration, not an actual LLM integration. A production implementation would consume the model provider's streaming iterator and handle disconnects and errors.

### Q10. How do you handle concurrent requests?

Interview-ready answer:

“I would distinguish I/O-bound work from CPU- or GPU-intensive inference. Async I/O helps when requests spend time waiting on external APIs or databases. I would use bounded semaphores or equivalent concurrency controls around expensive model calls, connection pooling, timeouts, and rate limits.

For heavy inference, I would use a dedicated model-serving layer or worker architecture rather than allowing unlimited requests to consume resources. I would load-test the system and scale based on actual bottlenecks, not just the number of incoming requests.”

Potential bottlenecks:

- LLM provider quotas and rate limits.
- Vector database query throughput.
- Database connection pool exhaustion.
- CPU/GPU memory and inference throughput.
- Blocking code inside async endpoints.
- Too many simultaneous agent/tool calls.

### Q11. How would you implement rate limiting?

Interview-ready answer:

“I would enforce rate limits at the API gateway or reverse proxy and, where needed, within the application. I would apply limits based on authenticated user, tenant, endpoint, or workload cost. For a distributed deployment, I would use a shared store or gateway-level policy rather than relying only on an in-memory counter in each worker.

For GenAI, I would consider request rate, token consumption, concurrent generations, and provider quotas. I would return HTTP 429 when a limit is exceeded and include retry guidance where appropriate.”

## 4. Database, deployment, and architecture questions

### Q12. How do you manage database connections in FastAPI?

Interview-ready answer:

“I use a connection pool rather than creating a new database connection for every request. I manage resource initialization and cleanup through application lifespan or the relevant dependency lifecycle, and I ensure sessions are closed even when an exception occurs.

For a RAG application, I may use PostgreSQL for application metadata and transactional data, a vector database for embeddings, and Redis for caching or shared state. I would tune pool sizes based on the number of application workers and the database's connection limits.”

What to remember:

- Reuse connection pools.
- Close request-scoped sessions reliably.
- Avoid sharing non-thread-safe sessions across concurrent requests.
- Monitor pool exhaustion and query latency.
- Keep secrets outside source code.

### Q13. How do you deploy a FastAPI application?

Interview-ready answer:

“I package the application and its dependencies into a Docker image, configure environment-specific settings through environment variables or a secrets manager, and deploy it to a managed container platform or Kubernetes depending on the requirements.

For production, I include health checks, structured logging, metrics, authentication, TLS, autoscaling, resource limits, and CI/CD. I also separate the API service from GPU-heavy inference where appropriate, because API scaling and model inference scaling often have different requirements.”

Google Cloud example:

| Requirement              | Potential Google Cloud service                                     |
| ------------------------ | ------------------------------------------------------------------ |
| Run FastAPI containers   | Cloud Run                                                          |
| Kubernetes orchestration | Google Kubernetes Engine (GKE)                                     |
| Container images         | Artifact Registry                                                  |
| Secrets                  | Secret Manager                                                     |
| Logs and metrics         | Cloud Logging and Cloud Monitoring                                 |
| Managed model APIs       | Gemini through the appropriate Google Cloud AI platform            |
| Background jobs          | Cloud Tasks, Pub/Sub, or another suitable queue-based architecture |

Choose services based on workload constraints rather than using every service by default.

### Q14. How do you test a FastAPI application?

Interview-ready answer:

“I use unit tests for business logic, integration tests for databases and external services, and API tests to validate status codes, response schemas, authentication, and error handling. FastAPI's `TestClient` supports convenient endpoint testing, and asynchronous tests can be used where needed.

For GenAI applications, I additionally test retrieval quality, groundedness, tool behavior, provider timeouts, and authorization boundaries. I mock external LLM calls for deterministic unit tests and maintain separate evaluation datasets for end-to-end AI quality.”

Example:

```
from fastapi.testclient import TestClientfrom fastapi import FastAPIapp = FastAPI()@app.get("/health")def health():    return {"status": "healthy"}client = TestClient(app)def test_health():    response = client.get("/health")    assert response.status_code == 200    assert response.json() == {"status": "healthy"}
```

Know the distinction between unit tests, integration tests, and end-to-end tests.

### Q15. Design a production FastAPI service for a RAG or multi-agent system.

This is the most important architecture question for your profile.

Interview-ready answer:

“I would design FastAPI as the application API layer, responsible for request validation, authentication, authorization, routing, and response delivery. I would keep the RAG and agent business logic in separate service modules so that the API layer remains thin and testable.

The query flow would authenticate the user, validate the request, apply tenant-aware access controls, retrieve relevant documents, optionally rerank them, and call the LLM or agent workflow. I would add timeouts, rate limiting, retries for transient failures, and structured observability.

For scalability, I would keep API instances stateless, store conversation state in a suitable external store, use asynchronous I/O for supported operations, and separate long-running workflows or model inference into independently scalable workers or services.”

Architecture you can draw on a whiteboard:

Client / Frontend

API Gateway / Load Balancer

TLS, quotas, routing

FastAPI service

Pydantic validation · Auth · Dependencies

RAG service

Retriever · Reranker · Vector DB

Agent service

LangGraph · Tools · MCP

LLM / Gemini / Model-serving layer

Redis / State

Logs / Metrics / Traces

What the interviewer may ask next:

- What if the LLM provider is down?
- How do you handle 10,000 concurrent users?
- How do you prevent unauthorized retrieval?
- What if the agent takes 60 seconds to respond?
- How would you stream responses?
- How do you scale the API separately from model inference?
- How do you monitor token costs and failures?

A strong answer addresses these without turning the architecture into an unnecessarily complicated collection of services.

## 5. Five additional Python/FastAPI questions worth revising

These are useful follow-ups for a hands-on technical interview.

| Question                                             | What you should explain                                                                                                    |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| What is middleware?                                  | Logic applied across requests and responses, such as request IDs, timing, and selected cross-cutting policies.             |
| What is the FastAPI lifespan mechanism?              | Managing application-level initialization and cleanup, such as shared clients and connection pools.                        |
| What is `BackgroundTasks`?                           | Running small tasks after returning a response; not a replacement for a durable distributed job queue for heavy workloads. |
| How do you handle environment variables and secrets? | Environment-specific configuration, Secret Manager, least privilege, and no hardcoded credentials.                         |
| How do you monitor FastAPI in production?            | Request latency, throughput, error rate, saturation, dependency failures, tracing, and application-specific metrics.       |

## 6. What I would prioritize for your Google interview

If you have limited preparation time, master these six topics first:

1. `async def` vs `def`, event loops, and blocking operations.
2. Pydantic validation and dependency injection.
3. Authentication, authorization, and tenant isolation.
4. Timeouts, retries, rate limiting, and concurrent LLM calls.
5. FastAPI + LangGraph/RAG integration.
6. Docker deployment, observability, and scalable architecture.

One final practice exercise: prepare a five-minute explanation of how you would expose your Azure AI Foundry investment-banking chatbot through FastAPI, including request validation, authenticated RAG retrieval, Fabric Data Agent integration, streaming, error handling, and monitoring. This will connect your existing project experience directly to the kind of production-engineering reasoning Google is evaluating.
