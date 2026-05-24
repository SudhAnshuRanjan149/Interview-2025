import os
from src.ingest.ingest_pdf import chunk_text


def test_chunk_text():
    text = "".join([f"word{i} " for i in range(1200)])
    chunks = chunk_text(text, chunk_size=200, overlap=20)
    assert len(chunks) > 0
