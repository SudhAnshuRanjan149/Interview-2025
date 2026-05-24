import os
import json
import numpy as np
from typing import List, Dict

try:
    from sentence_transformers import SentenceTransformer
except Exception:
    SentenceTransformer = None

try:
    import lance
except Exception:
    lance = None


class RAGRetriever:
    def __init__(self, index_dir: str, embed_model: str = "all-MiniLM-L6-v2"):
        self.index_dir = index_dir
        self.embed_model = embed_model
        if SentenceTransformer is not None:
            self.model = SentenceTransformer(embed_model)
        else:
            self.model = None

    def _load_local(self):
        emb_path = os.path.join(self.index_dir, "embeddings.npy")
        txt_path = os.path.join(self.index_dir, "texts.json")
        meta_path = os.path.join(self.index_dir, "metadata.json")
        if not os.path.exists(emb_path):
            raise FileNotFoundError("Local embeddings not found")
        embeddings = np.load(emb_path)
        with open(txt_path, "r") as f:
            texts = json.load(f)
        with open(meta_path, "r") as f:
            metadata = json.load(f)
        return embeddings, texts, metadata

    def retrieve(self, query: str, top_k: int = 5) -> List[Dict]:
        # Try LanceDB first
        if lance is not None:
            try:
                ds = lance.dataset(self.index_dir)
                q_emb = self.model.encode([query])[0] if self.model else None
                if q_emb is not None:
                    res = ds.search(q_emb, n=top_k)
                    results = []
                    for r in res:
                        results.append({"text": r["text"], "score": float(r["score"]), "meta": r})
                    return results
            except Exception:
                pass

        embeddings, texts, metadata = self._load_local()
        if self.model is None:
            raise RuntimeError("No embedding model available for query embedding")
        q_emb = self.model.encode([query])[0]
        # cosine similarity
        norms = np.linalg.norm(embeddings, axis=1) * np.linalg.norm(q_emb)
        sims = (embeddings @ q_emb) / (norms + 1e-10)
        idx = np.argsort(-sims)[:top_k]
        results = []
        for i in idx:
            results.append({"text": texts[i], "score": float(sims[i]), "meta": metadata[i]})
        return results


if __name__ == "__main__":
    r = RAGRetriever("data/lance_db")
    res = r.retrieve("What is described in the document?", top_k=3)
    print(res)
