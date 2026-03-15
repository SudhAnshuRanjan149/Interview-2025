# Project 2 — Streaming Echo Server

**Concept:** Server-Sent Events (SSE) + streaming LLM responses

## What You Build

A FastAPI server with two endpoints:
- **`/stream`** — streams tokens in real-time as Server-Sent Events (SSE)
- **`/chat`** — returns full response at once (for comparison)

This teaches you why streaming matters for user experience: first token appears in ~300ms vs waiting 5+ seconds for the full response.

## Key Concepts

### 1. **Server-Sent Events (SSE)**
```
data: {"content": "Hello"}\n\n
data: {"content": " world"}\n\n
data: {"type": "finish", "finish_reason": "STOP"}\n\n
```

Each message is prefixed with `data: ` and ends with `\n\n`. The browser/client's `EventSource` API automatically parses these.

### 2. **Streaming vs Non-Streaming**

**Streaming (UX advantage):**
- First token: ~100-300ms
- User sees response appearing
- Better for long-form text, chat, code generation

**Non-Streaming (API advantage):**
- First token: ~3-8s
- Simpler to implement
- Better for short factual queries, integrations

### 3. **FastAPI + Async Generators**

```python
async def stream_gemini_response(message: str) -> AsyncGenerator[str, None]:
    for chunk in response.iter_lines():
        yield f"data: {json.dumps({'content': text})}\n\n"

return StreamingResponse(
    stream_gemini_response(message),
    media_type="text/event-stream"
)
```

The `yield` makes it a generator — each chunk is streamed to the client as it arrives.

### 4. **curl `-N` Flag**

```bash
curl -N http://localhost:8000/stream ...
```

The `-N` flag disables buffering so you see tokens appear in real-time.

## Files

```
02_streaming/
├── main.py           # FastAPI server with /stream and /chat endpoints
├── stream_client.py  # Python client to test streaming
└── README.md         # This file
```

## Setup

1. Install dependencies:
   ```bash
   pip install fastapi uvicorn requests python-dotenv
   ```

2. Create `.env` with `GEMINI_API_KEY=...`

## Run the Server

```bash
cd 02_streaming
uvicorn main:app --reload
```

You should see:
```
Uvicorn running on http://127.0.0.1:8000
```

## Test the Streaming Endpoint

### Option 1: curl (see raw SSE stream)

```bash
curl -N -X POST http://localhost:8000/stream \
  -H "Content-Type: application/json" \
  -d '{"message": "Tell me a short story"}'
```

You'll see tokens appearing line by line:
```
data: {"content": "Once", "type": "content"}

data: {"content": " upon", "type": "content"}

data: {"content": " a", "type": "content"}

...
```

### Option 2: Python client (cleaner output)

```bash
python stream_client.py "Tell me a joke"
```

Output:
```
🔄 Streaming response (watch tokens appear in real-time):

Why did the chicken cross the road? To get to the other side!
```

### Option 3: Compare streaming vs non-streaming

```bash
python stream_client.py --compare "Explain quantum computing"
```

Output:
```
======================================================================
STREAMING (real-time tokens):
======================================================================

Quantum computing is a revolutionary technology...

✓ Streaming completed in 2.34s

======================================================================
NON-STREAMING (wait for full response):
======================================================================

Quantum computing is a revolutionary technology...

✓ Non-streaming completed in 2.91s

======================================================================
Time comparison: Streaming 2.34s vs Non-streaming 2.91s
Speedup: 1.2x faster (perceived)
======================================================================
```

## Advanced Usage

### Custom Temperature

```bash
# More creative (temperature=0.9)
python stream_client.py --temp 0.9 "Write a creative story"

# Deterministic (temperature=0.0)
python stream_client.py --temp 0.0 "What is 2+2?"
```

### Custom Host

```bash
# If server is on a different machine
python stream_client.py --host http://192.168.1.100:8000 "Hello"
```

## Learning Exercises

### Exercise 1: Measure first token latency
Modify `stream_client.py` to print the time until the first token:
```python
first_token_time = None
for i, token in enumerate(stream_response(...)):
    if i == 0:
        first_token_time = time.time() - start
        print(f"First token in {first_token_time*1000:.0f}ms")
```

### Exercise 2: Add a retry mechanism
If the streaming request fails, retry 3 times with exponential backoff.

### Exercise 3: Buffer chunks into words
Instead of yielding character by character, buffer until you have a full word before yielding.

### Exercise 4: Add context length tracking
Track how many tokens have been sent/received and display a progress bar.

### Exercise 5: Multi-message streaming
Modify the endpoint to accept a list of messages (conversation history) and stream the response.

## Common Issues

### Problem: "Connection refused"
**Solution:** Make sure the server is running:
```bash
uvicorn main:app --reload
```

### Problem: No output from curl
**Solution:** Add the `-N` flag to disable buffering:
```bash
curl -N -X POST http://localhost:8000/stream ...
```

### Problem: Slow first token (>1s)
**Solution:** 
- Check your internet connection
- Try a faster model (gemini-2.5-flash is faster than gemini-2.5-pro)
- The Gemini API takes 1-3s sometimes

### Problem: "GEMINI_API_KEY not found"
**Solution:** Create a `.env` file in the project directory with:
```
GEMINI_API_KEY=sk-...
```

## Real-World Applications

1. **Chat interfaces:** Stream assistant responses for better UX
2. **Content generation:** Show generated text as it's being created
3. **Data pipelines:** Stream large result sets without loading into memory
4. **Real-time dashboards:** Push metric updates as they arrive
5. **Video/audio:** Stream processing results during upload

## Next Steps

- **Project 3:** Prompt engineering — compare different system prompts
- **Project 7:** Full RAG pipeline with streaming
- **Project 11:** ReAct agent with streaming thoughts
- **Project 18:** Cache streaming responses with Redis

## Key Takeaways

✅ Streaming is ~50-100% faster **perceived** (first token sooner)  
✅ SSE format is simple: `data: {json}\n\n`  
✅ FastAPI makes streaming easy with `StreamingResponse` + generators  
✅ Always use `-N` in curl to see streaming output  
✅ Streaming is crucial for good UX in chat/AI apps  

