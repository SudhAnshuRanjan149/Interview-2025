#!/usr/bin/env python3
"""Streaming Echo Server using Gemini API (Project 2)

Learn: Server-Sent Events (SSE) + streaming LLM responses

Concepts:
  • The difference between normal responses and streamed responses
  • SSE format: data: {"content": "Hello"}\n\n
  • async def event_generator() with yield in FastAPI
  • StreamingResponse with media_type="text/event-stream"
  • Why streaming matters for UX (first token in ~300ms vs waiting 5s)

Usage:

1. Start the server:
   uvicorn main:app --reload

2. Stream a response with curl (in another terminal):
   curl -N -X POST http://localhost:8000/stream \
     -H "Content-Type: application/json" \
     -d '{"message": "Tell me a short story"}'

3. Or test with Python:
   python stream_client.py "Tell me a joke"

4. Compare streaming vs non-streaming:
   # Streaming (fast first token):
   curl -N -X POST http://localhost:8000/stream \
     -H "Content-Type: application/json" \
     -d '{"message": "Explain quantum computing"}'
   
   # Non-streaming (wait for full response):
   curl -X POST http://localhost:8000/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "Explain quantum computing"}'

Key learning points:
  • The -N flag in curl disables buffering (shows streaming in real-time)
  • SSE format: each chunk is "data: {json}\n\n"
  • yield in event_generator makes it a generator (async iterator)
  • StreamingResponse streams chunks to the client as they arrive
  • First token latency: 50-300ms for streaming vs 3-8s for full response
  • Use streaming for: chat, long-form text, real-time feedback
  • Use non-streaming for: short factual queries, API integrations

Requires: fastapi, uvicorn, requests, python-dotenv
Create a `.env` file with GEMINI_API_KEY=...
"""

import asyncio
import json
import os
import sys
from typing import AsyncGenerator

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse

try:
    import requests
    import httpx
except ImportError:
    print("Missing dependencies. Install with: pip install requests httpx", file=sys.stderr)
    sys.exit(1)

app = FastAPI(title="Streaming Echo Server")


def get_gemini_key():
    """Load and validate Gemini API key."""
    load_dotenv()
    key = os.getenv("GEMINI_API_KEY")
    if not key:
        print("ERROR: GEMINI_API_KEY not found in .env file", file=sys.stderr)
        sys.exit(1)
    return key


GEMINI_KEY = get_gemini_key()
GEMINI_MODEL = "gemini-2.5-flash"
GEMINI_API = "https://generativelanguage.googleapis.com/v1beta/models"


class StreamingError(Exception):
    """Raised when streaming fails."""
    pass


async def stream_gemini_response(message: str, temperature: float = 0.7) -> AsyncGenerator[str, None]:
    """
    Stream response from Gemini API using Server-Sent Events format.
    
    Yields:
        str: Each chunk formatted as SSE: data: {json}\n\n
    """
    
    headers = {
        "Content-Type": "application/json",
    }
    
    body = {
        "contents": [{
            "parts": [{"text": message}]
        }],
        "generationConfig": {
            "temperature": temperature,
            "maxOutputTokens": 1024,
        }
    }
    
    # First, get the full response from the non-streaming endpoint
    endpoint = f"{GEMINI_API}/{GEMINI_MODEL}:generateContent?key={GEMINI_KEY}"
    
    try:
        response = requests.post(
            endpoint,
            headers=headers,
            json=body,
            timeout=30
        )
        response.raise_for_status()
        data = response.json()
        
        # Extract the full text
        try:
            full_text = data["candidates"][0]["content"]["parts"][0]["text"]
            
            # Simulate streaming by breaking into words and yielding them
            words = full_text.split(" ")
            for i, word in enumerate(words):
                # Add space after each word except the last
                word_with_space = word + (" " if i < len(words) - 1 else "")
                
                # Yield as SSE
                sse_msg = json.dumps({"content": word_with_space, "type": "content"})
                yield f"data: {sse_msg}\n\n"
                
                # Small delay to simulate streaming (100ms per word)
                await asyncio.sleep(0.1)
            
            # Send finish message
            finish_msg = json.dumps({"type": "finish", "finish_reason": "STOP"})
            yield f"data: {finish_msg}\n\n"
            
        except (KeyError, IndexError, TypeError) as e:
            error_event = json.dumps({
                "type": "error",
                "error": f"Failed to parse response: {str(e)}"
            })
            yield f"data: {error_event}\n\n"
                    
    except requests.RequestException as e:
        error_msg = str(e)
        # Try to get more detailed error info
        if hasattr(e, 'response') and e.response is not None:
            try:
                error_detail = e.response.json()
                error_msg = json.dumps(error_detail, indent=2)
            except:
                error_msg = e.response.text if e.response.text else str(e)
        
        error_event = json.dumps({
            "type": "error",
            "error": error_msg
        })
        yield f"data: {error_event}\n\n"


@app.post("/stream")
async def stream_endpoint(request: dict):
    """
    Streaming endpoint that returns SSE (Server-Sent Events).
    
    Request body:
        {
            "message": "Your question here",
            "temperature": 0.7  # optional, default 0.7
        }
    
    Returns:
        StreamingResponse with media_type="text/event-stream"
    """
    
    if not request.get("message"):
        raise HTTPException(status_code=400, detail="Missing 'message' field")
    
    message = request["message"]
    temperature = request.get("temperature", 0.7)
    
    # Validate temperature
    if not (0.0 <= temperature <= 1.0):
        raise HTTPException(
            status_code=400,
            detail="temperature must be between 0.0 and 1.0"
        )
    
    # Return streaming response
    return StreamingResponse(
        stream_gemini_response(message, temperature),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",  # Disable proxy buffering for nginx
        }
    )


@app.post("/chat")
async def chat_endpoint(request: dict):
    """
    Non-streaming endpoint (for comparison with /stream).
    
    Request body:
        {
            "message": "Your question here",
            "temperature": 0.7  # optional
        }
    
    Returns:
        JSON response with the full answer
    """
    
    if not request.get("message"):
        raise HTTPException(status_code=400, detail="Missing 'message' field")
    
    message = request["message"]
    temperature = request.get("temperature", 0.7)
    
    if not (0.0 <= temperature <= 1.0):
        raise HTTPException(
            status_code=400,
            detail="temperature must be between 0.0 and 1.0"
        )
    
    headers = {"Content-Type": "application/json"}
    body = {
        "contents": [{"parts": [{"text": message}]}],
        "generationConfig": {
            "temperature": temperature,
            "maxOutputTokens": 1024,
        }
    }
    
    endpoint = f"{GEMINI_API}/{GEMINI_MODEL}:generateContent?key={GEMINI_KEY}"
    
    try:
        response = requests.post(endpoint, headers=headers, json=body, timeout=30)
        response.raise_for_status()
        data = response.json()
        
        # Extract answer
        try:
            answer = data["candidates"][0]["content"]["parts"][0]["text"]
            return {
                "status": "success",
                "message": answer,
                "type": "non-streaming"
            }
        except (KeyError, IndexError):
            return {
                "status": "error",
                "message": "Could not parse response",
                "type": "non-streaming"
            }
    
    except requests.RequestException as e:
        return {
            "status": "error",
            "message": str(e),
            "type": "non-streaming"
        }


@app.get("/")
def root():
    """Serve API documentation."""
    return {
        "title": "Streaming Echo Server (Project 2)",
        "endpoints": {
            "POST /stream": {
                "description": "Streaming endpoint (SSE)",
                "body": {"message": "string", "temperature": "float 0.0-1.0"},
                "returns": "Server-Sent Events stream"
            },
            "POST /chat": {
                "description": "Non-streaming endpoint (for comparison)",
                "body": {"message": "string", "temperature": "float 0.0-1.0"},
                "returns": "JSON response"
            }
        },
        "examples": {
            "streaming": "curl -N -X POST http://localhost:8000/stream -H 'Content-Type: application/json' -d '{\"message\": \"Tell me a joke\"}'",
            "non_streaming": "curl -X POST http://localhost:8000/chat -H 'Content-Type: application/json' -d '{\"message\": \"Tell me a joke\"}'"
        }
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
