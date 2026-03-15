# 🚀 AgentIQ - Quick Reference Guide

## Daily Workflow Commands

### Starting Your Work Session
```bash
# 1. Navigate to project
cd /Users/priyaupadhyay/Desktop/sudhanshu/Code/InterviewPrep-2025/31_AI/Projects/ChatApp/Backend

# 2. Activate virtual environment
source .venv/bin/activate

# 3. Start Redis (if not running)
brew services start redis

# 4. Start development server
uvicorn app.main:app --reload
# OR use the quick start script:
./start.sh
```

### Testing Commands
```bash
# Run all tests
pytest tests/ -v

# Run specific test file
pytest tests/test_api.py -v

# Run with coverage report
pytest tests/ --cov=app --cov-report=html

# Run and watch for changes
pytest-watch
```

### Code Quality
```bash
# Lint code
ruff check .

# Format code
ruff format .

# Type checking (when we add more code)
pyright
```

### Git Workflow
```bash
# Initial commit
git add .
git commit -m "Phase 0: Project scaffold complete"

# Daily commits
git add .
git commit -m "Phase 1: RAG pipeline implementation"
```

---

## Environment Setup Checklist

- [ ] Python 3.11+ installed
- [ ] Homebrew installed (macOS)
- [ ] Redis installed and running
- [ ] Virtual environment created (`.venv/`)
- [ ] Dependencies installed (`pip install -r requirements.txt`)
- [ ] `.env` file created with API keys
- [ ] OpenAI API key configured
- [ ] Server starts successfully
- [ ] Tests pass

---

## API Endpoints Reference

### Health & System
```bash
# Health check
curl http://localhost:8000/health

# Root / welcome
curl http://localhost:8000/

# Metrics
curl http://localhost:8000/metrics

# API documentation
open http://localhost:8000/docs
```

### With API Key (for protected endpoints)
```bash
curl -X POST http://localhost:8000/endpoint \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-secret-api-key" \
  -d '{"key": "value"}'
```

---

## Project Structure Quick Reference

```
Backend/
├── app/                    # Main application code
│   ├── main.py            # FastAPI app + middleware
│   ├── config.py          # Settings
│   ├── api/               # Route handlers
│   ├── agents/            # LangGraph agents (Phase 2+)
│   ├── rag/               # RAG pipeline (Phase 1+)
│   ├── tools/             # LangChain tools (Phase 3+)
│   ├── memory/            # Conversation memory (Phase 6+)
│   ├── guardrails/        # Safety filters (Phase 7+)
│   └── schemas/           # Pydantic models
├── data/                  # Data storage
│   ├── documents/         # Upload PDFs/docs here
│   ├── chroma_db/         # Vector database
│   └── sqlite/            # Optional databases
├── tests/                 # Test suite
├── pyproject.toml         # Dependencies
├── .env                   # Secrets (never commit!)
└── README.md              # Full documentation
```

---

## Common Issues & Quick Fixes

### "Module not found" errors
```bash
source .venv/bin/activate
pip install -r requirements.txt
```

### Redis connection failed
```bash
brew services restart redis
redis-cli ping  # Should return PONG
```

### Port 8000 in use
```bash
kill -9 $(lsof -ti:8000)
# OR use different port:
uvicorn app.main:app --reload --port 8001
```

### Import errors in tests
```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx
```

### OpenAI API errors
```bash
# Verify API key is set
python -c "import os; from dotenv import load_dotenv; load_dotenv(); print(os.getenv('OPENAI_API_KEY'))"

# Test API call
python -c "from openai import OpenAI; import os; from dotenv import load_dotenv; load_dotenv(); c=OpenAI(api_key=os.getenv('OPENAI_API_KEY')); print(c.models.list())"
```

---

## Phase Timeline

| Phase | Days | Focus | Status |
|-------|------|-------|--------|
| **Phase 0** | Day 1 | Project scaffold, FastAPI setup | ✅ DONE |
| **Phase 1** | Days 2-3 | RAG pipeline (embeddings, vector DB) | 📋 NEXT |
| **Phase 2** | Days 4-5 | LangGraph state machine, supervisor | ⏳ TODO |
| **Phase 3** | Days 6-7 | Individual agents (RAG, LLM, Tools) | ⏳ TODO |
| **Phase 4** | Day 8 | MCP server for local tools | ⏳ TODO |
| **Phase 5** | Day 9 | Streaming SSE endpoints | ⏳ TODO |
| **Phase 6** | Day 10 | Memory system (Redis) | ⏳ TODO |
| **Phase 7** | Day 11 | Guardrails & observability | ⏳ TODO |
| **Phase 8** | Days 12-14 | Ingestion API, testing, polish | ⏳ TODO |

---

## Key Files to Remember

### Always check first:
- `.env` - Your API keys and secrets
- `app/config.py` - Configuration settings
- `app/main.py` - Application entry point

### When adding features:
- `app/api/` - New endpoints here
- `app/schemas/` - Pydantic models here
- `tests/` - Tests for new features

### Before committing:
- `pytest tests/ -v` - All tests pass
- `ruff check .` - No lint errors
- `.gitignore` - `.env` is ignored

---

## Useful Python Snippets

### Test OpenAI connection
```python
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Say hello!"}]
)
print(response.choices[0].message.content)
```

### Test Redis connection
```python
import redis
r = redis.Redis.from_url("redis://localhost:6379/0")
r.ping()  # Should return True
r.set("test", "value")
print(r.get("test"))  # Should return b'value'
```

### Load settings
```python
from app.config import settings
print(f"Environment: {settings.app_env}")
print(f"Model: {settings.openai_model}")
print(f"Redis: {settings.redis_url}")
```

---

## Learning Resources

### Core Technologies
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [LangChain Docs](https://python.langchain.com/)
- [Pydantic Docs](https://docs.pydantic.dev/)
- [Redis Docs](https://redis.io/docs/)

### AI Concepts
- [RAG Explained](https://www.pinecone.io/learn/retrieval-augmented-generation/)
- [LangGraph Tutorial](https://langchain-ai.github.io/langgraph/)
- [Embeddings Guide](https://platform.openai.com/docs/guides/embeddings)

### Testing
- [Pytest Docs](https://docs.pytest.org/)
- [FastAPI Testing](https://fastapi.tiangolo.com/tutorial/testing/)

---

## Contact & Support

- **Project README**: `Backend/readme.md` - Full documentation
- **Setup Guide**: `Backend/SETUP_INSTRUCTIONS.md` - Step-by-step setup
- **Day Summary**: `Backend/DAY1_SUMMARY.md` - What you learned today

---

**Happy Coding! 🚀**
