#!/usr/bin/env python3
"""Client to test the streaming server (Project 2)

Usage:
  # Stream a response (shows tokens as they arrive):
  python stream_client.py "Tell me a joke"
  
  # Compare streaming vs non-streaming:
  python stream_client.py --compare "Explain machine learning"
  
  # Custom temperature:
  python stream_client.py --temp 0.9 "Write a creative story"
"""

import argparse
import json
import sys
import time
from typing import Generator

import requests


def parse_args():
    p = argparse.ArgumentParser(description="Test the streaming server")
    p.add_argument("message", nargs="*", help="Message to send")
    p.add_argument("--host", default="http://localhost:8000", help="Server URL")
    p.add_argument("--temp", type=float, default=0.7, help="Temperature (0.0-1.0)")
    p.add_argument("--compare", action="store_true", help="Compare streaming vs non-streaming")
    return p.parse_args()


def stream_response(host: str, message: str, temp: float = 0.7) -> Generator[str, None, None]:
    """Stream response from the server and yield tokens."""
    url = f"{host}/stream"
    payload = {"message": message, "temperature": temp}
    
    try:
        response = requests.post(url, json=payload, stream=True, timeout=30)
        response.raise_for_status()
        
        for line in response.iter_lines():
            if line:
                line = line.decode() if isinstance(line, bytes) else line
                if line.startswith("data: "):
                    try:
                        json_str = line[6:]  # Remove "data: " prefix
                        chunk = json.loads(json_str)
                        
                        if chunk.get("type") == "content":
                            yield chunk.get("content", "")
                        elif chunk.get("type") == "error":
                            print(f"\n❌ Error: {chunk.get('error')}", file=sys.stderr)
                        elif chunk.get("type") == "finish":
                            pass  # End of stream
                    except json.JSONDecodeError:
                        pass
    except requests.RequestException as e:
        print(f"❌ Request failed: {e}", file=sys.stderr)


def non_streaming_response(host: str, message: str, temp: float = 0.7) -> str:
    """Get non-streaming response from the server."""
    url = f"{host}/chat"
    payload = {"message": message, "temperature": temp}
    
    try:
        response = requests.post(url, json=payload, timeout=30)
        response.raise_for_status()
        data = response.json()
        
        if data.get("status") == "success":
            return data.get("message", "")
        else:
            print(f"❌ Error: {data.get('message')}", file=sys.stderr)
            return ""
    except requests.RequestException as e:
        print(f"❌ Request failed: {e}", file=sys.stderr)
        return ""


def main():
    args = parse_args()
    
    if not args.message:
        print("Error: No message provided")
        sys.exit(1)
    
    message = " ".join(args.message)
    
    if args.compare:
        print("\n" + "="*70)
        print("STREAMING (real-time tokens):")
        print("="*70)
        start = time.time()
        print("\n", end="", flush=True)
        for token in stream_response(args.host, message, args.temp):
            print(token, end="", flush=True)
        stream_time = time.time() - start
        print(f"\n\n✓ Streaming completed in {stream_time:.2f}s\n")
        
        print("="*70)
        print("NON-STREAMING (wait for full response):")
        print("="*70)
        start = time.time()
        response = non_streaming_response(args.host, message, args.temp)
        non_stream_time = time.time() - start
        print(f"\n{response}\n")
        print(f"✓ Non-streaming completed in {non_stream_time:.2f}s\n")
        
        print("="*70)
        print(f"Time comparison: Streaming {stream_time:.2f}s vs Non-streaming {non_stream_time:.2f}s")
        if stream_time > 0:
            print(f"Speedup: {non_stream_time/stream_time:.1f}x faster (perceived)")
        print("="*70 + "\n")
    else:
        print("\n🔄 Streaming response (watch tokens appear in real-time):\n")
        for token in stream_response(args.host, message, args.temp):
            print(token, end="", flush=True)
        print("\n\n✓ Done!\n")


if __name__ == "__main__":
    main()
