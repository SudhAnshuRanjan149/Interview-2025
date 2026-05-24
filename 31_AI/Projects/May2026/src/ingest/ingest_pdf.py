import argparse
import os
import json
from typing import List

import numpy as np

try:
    import pdfplumber
except Exception:
    pdfplumber = None

try:
    from sentence_transformers import SentenceTransformer
except Exception:
    SentenceTransformer = None

try:
    import lance
except Exception:
    lance = None


def load_pdf_text(path: str) -> List[str]:
    pages = []
    if pdfplumber is None:
        raise RuntimeError("pdfplumber not installed")
    with pdfplumber.open(path) as pdf:
        for p in pdf.pages:
            pages.append(p.extract_text() or "")
    return pages


def chunk_text(text: str, chunk_size: int = 512, overlap: int = 64):
    tokens = text.split()
    chunks = []
    i = 0
    while i < len(tokens):
        chunk = tokens[i : i + chunk_size]
        chunks.append(" ".join(chunk))
        i += chunk_size - overlap
    return chunks


def embed_texts(texts: List[str], model_name: str = "all-MiniLM-L6-v2"):
    if SentenceTransformer is None:
        raise RuntimeError("sentence-transformers not installed")
    model = SentenceTransformer(model_name)
    embeddings = model.encode(texts, show_progress_bar=True)
    return np.array(embeddings)


def save_vectors_local(out_dir: str, texts: List[str], embeddings: np.ndarray, metadata: List[dict]):
    os.makedirs(out_dir, exist_ok=True)
    np.save(os.path.join(out_dir, "embeddings.npy"), embeddings)
    with open(os.path.join(out_dir, "texts.json"), "w") as f:
        json.dump(texts, f)
    with open(os.path.join(out_dir, "metadata.json"), "w") as f:
        json.dump(metadata, f)


def write_to_lance(out_dir: str, texts, embeddings, metadata):
    if lance is None:
        raise RuntimeError("lance package not available")
    import pandas as pd

    df = pd.DataFrame(metadata)
    df["text"] = texts
    df_embeddings = np.asarray(embeddings)
    ds = lance.write_dataset(df, path=out_dir, embedding_columns={"embedding": df_embeddings})
    return ds


def ingest(pdf_path: str, out_dir: str):
    pages = load_pdf_text(pdf_path)
    all_texts = []
    metadata = []
    for page_idx, page_text in enumerate(pages):
        chunks = chunk_text(page_text)
        for i, c in enumerate(chunks):
            all_texts.append(c)
            metadata.append({"page": page_idx + 1, "chunk_id": i})

    embeddings = embed_texts(all_texts)
    try:
        write_to_lance(out_dir, all_texts, embeddings, metadata)
        print("Wrote vectors to LanceDB at", out_dir)
    except Exception:
        print("Lance write failed or not available, saving locally")
        save_vectors_local(out_dir, all_texts, embeddings.tolist(), metadata)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True)
    parser.add_argument("--out", required=True)
    args = parser.parse_args()
    ingest(args.input, args.out)


if __name__ == "__main__":
    main()
