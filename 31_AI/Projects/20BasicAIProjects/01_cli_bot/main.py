#!/usr/bin/env python3
"""CLI Q&A bot using Gemini API (Project 1)

Learn: LLM API basics — tokens, temperature, system prompts, message roles, and API costs.

Usage examples:

Basic queries:
  python main.py "What is the capital of France?"
  python main.py "Write a haiku about Python"

With custom model and temperature:
  python main.py -m gemini-2.5-pro -t 0.9 "Write a creative story"
  python main.py -m gemini-2.5-flash -t 0.0 "What is 2+2?"

System prompts (custom behavior):
  python main.py -s "You are a pirate" "Hello, how are you?"
  python main.py -s "Answer in exactly 3 words" "What is machine learning?"

Token usage & cost tracking:
  python main.py --show-usage "Explain quantum computing"

Compare temperatures (see how creativity changes):
  python main.py --compare-temps "Tell me about cats"
  # Shows responses at temp=0.0 (deterministic), 0.5 (balanced), 1.0 (creative)

Input from pipes:
  echo "Summarize the plot of Romeo and Juliet" | python main.py
  
List all available models:
  python main.py --list-models

Debug mode (see API requests):
  python main.py --debug "Hello"

Requires: requests, python-dotenv
Create a `.env` file with GEMINI_API_KEY=...

Key learning concepts:
  • How messages array / roles affect model behavior (system, user, assistant)
  • How temperature (0.0-1.0) controls response creativity vs determinism
  • How max_tokens limits response length
  • How to read token usage and estimate API costs
  • How system prompts shape model behavior
"""


import argparse
import json
import os
import sys

from dotenv import load_dotenv

try:
    import requests
except Exception:
    print("Missing dependency 'requests'. Install with: pip install requests python-dotenv", file=sys.stderr)
    raise


def make_parser():
    p = argparse.ArgumentParser(description="Simple CLI Q&A bot using Gemini API")
    p.add_argument("-t", "--temperature", type=float, default=0.2, help="Sampling temperature (0.0 - 1.0)")
    p.add_argument("-m", "--model", default=None, help="Model to use. Default is gemini-2.5-flash.")
    p.add_argument("-s", "--system", default=None, help="System prompt to guide the assistant behavior.")
    p.add_argument("--max-tokens", type=int, default=512, help="Maximum tokens to generate for the response")
    p.add_argument("--show-usage", action="store_true", help="Display token usage and cost estimates.")
    p.add_argument("--compare-temps", action="store_true", help="Compare responses at different temperatures (0.0, 0.5, 1.0).")
    p.add_argument("--debug", action="store_true", help="Enable verbose debug output for API calls.")
    p.add_argument("--list-models", action="store_true", help="List available Gemini models and exit.")
    p.add_argument("question", nargs="*", help="Question to ask. If omitted, reads from stdin.")
    return p


def list_available_models(gemini_key):
    """Fetch and print available models from Gemini API."""
    try:
        # Try v1beta
        endpoint = "https://generativelanguage.googleapis.com/v1beta/models"
        r = requests.get(f"{endpoint}?key={gemini_key}", timeout=10)
        r.raise_for_status()
        j = r.json()
        
        if "models" in j:
            print("Available models in v1beta:")
            for model in j["models"]:
                name = model.get("name", "unknown").replace("models/", "")
                supported_methods = model.get("supportedGenerationMethods", [])
                print(f"  {name} — methods: {', '.join(supported_methods)}")
        else:
            print("Response:", json.dumps(j, indent=2))
    except Exception as e:
        print(f"Error listing models: {str(e)}", file=sys.stderr)


def call_gemini(question, gemini_key, model, temperature, max_tokens, system_prompt=None, debug=False):
    """Call Gemini API and return response JSON."""
    headers = {"Content-Type": "application/json"}
    
    # Build contents with optional system instruction
    contents = [{
        "parts": [{"text": question}]
    }]
    
    body = {
        "contents": contents,
        "generationConfig": {
            "temperature": temperature,
            "maxOutputTokens": max_tokens,
        }
    }
    
    # Add system instruction if provided (Gemini API v1beta format)
    if system_prompt:
        body["system_instruction"] = {
            "parts": [{"text": system_prompt}]
        }
    
    endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
    
    if debug:
        print(f"--- Gemini Debug ---", file=sys.stderr)
        print(f"Temperature: {temperature}", file=sys.stderr)
        print(f"Endpoint: {endpoint}", file=sys.stderr)
        print(f"Body: {json.dumps(body, indent=2)}", file=sys.stderr)
        print(f"--------------------", file=sys.stderr)

    try:
        r = requests.post(f"{endpoint}?key={gemini_key}", headers=headers, json=body, timeout=30)
        r.raise_for_status()
        return r.json()
    except Exception as e:
        print("Gemini API call failed:", str(e), file=sys.stderr)
        if 'r' in locals() and r is not None:
            try:
                print("Response status:", r.status_code, file=sys.stderr)
                print(r.text, file=sys.stderr)
            except Exception:
                pass
        return None


def extract_answer(j):
    """Extract answer text from Gemini response."""
    try:
        return j["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError, TypeError):
        return None


def extract_usage(j):
    """Extract token usage from Gemini response."""
    try:
        usage = j.get("usageMetadata", {})
        input_tokens = usage.get("promptTokenCount", 0)
        output_tokens = usage.get("candidatesTokenCount", 0)
        return input_tokens, output_tokens
    except Exception:
        return 0, 0


def print_usage_info(input_tokens, output_tokens):
    """Print token usage and estimated cost."""
    print("\n--- Token Usage ---", file=sys.stderr)
    print(f"Input tokens:  {input_tokens}", file=sys.stderr)
    print(f"Output tokens: {output_tokens}", file=sys.stderr)
    print(f"Total tokens:  {input_tokens + output_tokens}", file=sys.stderr)
    
    # Gemini pricing (approximate as of March 2025)
    input_cost = input_tokens * 0.075 / 1_000_000  # $0.075 per 1M input tokens
    output_cost = output_tokens * 0.30 / 1_000_000  # $0.30 per 1M output tokens
    total_cost = input_cost + output_cost
    
    print(f"Estimated cost: ${total_cost:.6f}", file=sys.stderr)
    print("-------------------", file=sys.stderr)


def main():
    load_dotenv()

    # Get Gemini API key
    gemini_key = os.getenv("GEMINI_API_KEY")
    if not gemini_key:
        print("ERROR: GEMINI_API_KEY not found. Create a .env file or export the env var.")
        print("See README for setup instructions.")
        sys.exit(1)

    parser = make_parser()
    args = parser.parse_args()

    # Handle --list-models flag
    if args.list_models:
        list_available_models(gemini_key)
        sys.exit(0)

    model = args.model or "gemini-2.5-flash"

    if args.question:
        question = " ".join(args.question).strip()
    else:
        try:
            # Read a line from stdin (useful for piping)
            if not sys.stdin.isatty():
                question = sys.stdin.read().strip()
            else:
                question = input("Question: ")
        except KeyboardInterrupt:
            print()
            sys.exit(0)

    if not question:
        print("No question provided. Exiting.")
        sys.exit(0)

    # Handle --compare-temps: show responses at different temperatures
    if args.compare_temps:
        temps = [0.0, 0.5, 1.0]
        print("=== Temperature Comparison ===", file=sys.stderr)
        print(f"Question: {question}\n", file=sys.stderr)
        
        for temp in temps:
            print(f"\n--- Temperature: {temp} ---", file=sys.stderr)
            j = call_gemini(question, gemini_key, model, temp, args.max_tokens, args.system, args.debug)
            if j is None:
                print(f"Failed to get response at temperature {temp}", file=sys.stderr)
                continue
            
            answer = extract_answer(j)
            if answer:
                print(f"\nResponse:\n{answer}")
            else:
                print("Could not parse response", file=sys.stderr)
        
        sys.exit(0)

    # Normal single query mode
    j = call_gemini(question, gemini_key, model, args.temperature, args.max_tokens, args.system, args.debug)
    
    if j is None:
        sys.exit(2)

    # Parse the Gemini response
    answer = extract_answer(j)

    if not answer:
        print("Could not parse Gemini response; full JSON below:", file=sys.stderr)
        print(json.dumps(j, indent=2), file=sys.stderr)
        sys.exit(3)

    print(answer.strip())

    # Optionally print token usage and cost
    if args.show_usage:
        input_tokens, output_tokens = extract_usage(j)
        print_usage_info(input_tokens, output_tokens)


if __name__ == "__main__":
    main()
