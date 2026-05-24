# Multi-Agent RAG System (LangGraph + LanceDB + FastMCP)

This project implements a multi-agent RAG system using LangGraph, LanceDB (or fallback), FastMCP for state/checkpoints, a human-in-loop approval flow, and an Ollama local model for final answers. It includes a PDF ingestion pipeline (chunking + embeddings).

Follow the `scripts/setup_venv.sh` to create a virtual environment and install dependencies.

Place a PDF at `data/docs/sample.pdf` before running the ingestion script.

See `src/` for implementation skeletons.
