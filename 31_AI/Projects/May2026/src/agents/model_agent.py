import requests
import os
from typing import Optional


class ModelAgent:
    def __init__(self, ollama_url: Optional[str] = "http://localhost:11434"):
        self.ollama_url = ollama_url

    def generate(self, prompt: str, model: str = "small") -> str:
        # Try Ollama local API (if available)
        try:
            url = f"{self.ollama_url}/api/generate"
            payload = {"model": model, "prompt": prompt}
            resp = requests.post(url, json=payload, timeout=15)
            resp.raise_for_status()
            data = resp.json()
            # Ollama API shape may vary; try common keys
            return data.get("text") or data.get("response") or str(data)
        except Exception:
            return "[ModelAgent] Ollama not available or request failed."


if __name__ == "__main__":
    ma = ModelAgent()
    print(ma.generate("Say hello"))
