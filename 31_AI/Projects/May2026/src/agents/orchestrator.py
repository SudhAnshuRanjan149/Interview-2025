import yaml
from typing import Dict
import os

from .web_fetcher import fetch_url_text
from .rag_retriever import RAGRetriever
from .model_agent import ModelAgent


class Orchestrator:
    def __init__(self, config_path: str = "config/routing.yaml"):
        with open(config_path, "r") as f:
            self.config = yaml.safe_load(f)
        self.rag = RAGRetriever("data/lance_db")
        self.model = ModelAgent()

    def classify_intent(self, query: str) -> str:
        # Very simple keyword-based intent (replaceable with Gemini calls)
        for rule in self.config.get("rules", []):
            kws = rule.get("match_keywords", [])
            if any(k in query.lower() for k in kws):
                return rule.get("route")
        return "model_agent"

    def handle_query(self, query: str) -> Dict:
        route = self.classify_intent(query)
        if route == "web_fetcher":
            # expect query like: "search: https://..." or plain url
            if query.startswith("http"):
                text = fetch_url_text(query)
            else:
                # naive: extract first url
                text = ""  # TODO: implement search -> url resolution
            return {"route": "web_fetcher", "result": text}
        elif route == "rag_retriever":
            results = self.rag.retrieve(query, top_k=5)
            synth = self.model.generate("Summarize:\n\n" + "\n\n".join([r["text"] for r in results]))
            return {"route": "rag_retriever", "snippets": results, "synthesis": synth}
        else:
            resp = self.model.generate(query)
            return {"route": "model_agent", "result": resp}


if __name__ == "__main__":
    o = Orchestrator()
    print(o.handle_query("Tell me about the document trends."))
