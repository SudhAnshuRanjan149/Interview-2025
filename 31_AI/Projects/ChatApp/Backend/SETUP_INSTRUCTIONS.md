# 🚀 AgentIQ Setup Instructions - Day 1

## Prerequisites

Before starting, ensure you have:
- **macOS** 12.0+ (or Linux/Windows with adaptations)
- **Python** 3.11 or higher
- **Homebrew** installed (macOS)
- **Redis** installed and running

---

## Step-by-Step Setup

### 1. Install System Dependencies

```bash
# Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Python 3.11+
brew install python@3.11

# Install Redis
brew install redis

# Start Redis as a background service
brew services start redis

# Verify Redis is running
redis-cli ping
# Expected output: PONG
```

### 2. Install uv (Fast Python Package Manager)

```bash
# Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# Restart terminal or run:
source ~/.zshrc

# Verify installation
uv --version
```

### 3. Set Up Python Virtual Environment

```bash
# Navigate to the Backend directory
cd /Users/priyaupadhyay/Desktop/sudhanshu/Code/InterviewPrep-2025/31_AI/Projects/ChatApp/Backend

# Create virtual environment with Python 3.11
uv venv --python 3.11

# Activate the virtual environment
source .venv/bin/activate

# Install all dependencies
uv pip install -e ".[dev]"
# OR using regular pip:
pip install -r requirements.txt
```

### 4. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your API keys
nano .env
# OR use your preferred editor:
# code .env  (VS Code)
# vim .env   (Vim)
```

**Required API Keys to Add:**

1. **OpenAI API Key** (Required)
   - Get it from: https://platform.openai.com/api-keys
   - Update: `OPENAI_API_KEY=sk-proj-your-actual-key`

2. **OpenWeather API Key** (Optional - for weather tool)
   - Get free key from: https://openweathermap.org/api
   - Update: `OPENWEATHER_API_KEY=your-key`

3. **News API Key** (Optional - for news tool)
   - Get free key from: https://newsapi.org/
   - Update: `NEWS_API_KEY=your-key`

4. **LangSmith API Key** (Optional - for observability)
   - Get free key from: https://smith.langchain.com/
   - Update: `LANGCHAIN_API_KEY=ls__your-key`

### 5. Verify Installation

```bash
# Test Python packages
python -c "
import fastapi, langchain, structlog
print('✅ FastAPI:', fastapi.__version__)
print('✅ LangChain:', langchain.__version__)
print('✅ Structlog:', structlog.__version__)
print()
print('All packages installed successfully!')
"

# Test Redis connection
python -c "
import redis
r = redis.Redis.from_url('redis://localhost:6379/0')
r.ping()
print('✅ Redis connection: OK')
"

# Test OpenAI API key (make sure .env is configured first)
python -c "
import os
from dotenv import load_dotenv
load_dotenv()

from openai import OpenAI
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
models = client.models.list()
print('✅ OpenAI API: OK')
print(f'   Available models: {len(list(models.data))} models found')
"
```

### 6. Start the Application

```bash
# Make sure you're in the Backend directory with venv activated
cd /Users/priyaupadhyay/Desktop/sudhanshu/Code/InterviewPrep-2025/31_AI/Projects/ChatApp/Backend
source .venv/bin/activate

# Start the FastAPI server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [xxxxx] using WatchFiles
INFO:     Started server process [xxxxx]
INFO:     Waiting for application startup.
starting_agentiq environment='development' log_level='INFO'
development_mode message='Running in development mode with auto-reload enabled'
INFO:     Application startup complete.
```

### 7. Test the API

Open a new terminal and test the endpoints:

```bash
# Test health endpoint
curl http://localhost:8000/health

# Expected response:
# {
#   "status": "healthy",
#   "timestamp": "2026-03-15T...",
#   "version": "0.1.0",
#   "environment": "development",
#   ...
# }

# Test root endpoint
curl http://localhost:8000/

# Test metrics endpoint
curl http://localhost:8000/metrics

# Test API docs (open in browser)
open http://localhost:8000/docs
```

### 8. Test API Key Authentication

```bash
# This should fail (no API key)
curl -X GET http://localhost:8000/protected-endpoint

# This should work (with API key from .env)
curl -X GET http://localhost:8000/protected-endpoint \
  -H "X-API-Key: your-secret-api-key"
```

---

## Troubleshooting

### Redis Connection Issues
```bash
# Check if Redis is running
brew services list | grep redis

# Restart Redis
brew services restart redis

# Test connection manually
redis-cli
> PING
> exit
```

### Python Version Issues
```bash
# Check Python version
python3 --version

# If below 3.11, install:
brew install python@3.11

# Create venv with specific Python
uv venv --python /opt/homebrew/bin/python3.11
```

### OpenAI API Issues
```bash
# Verify your API key is set
echo $OPENAI_API_KEY  # Should NOT be empty

# Test with a simple call
python -c "
from openai import OpenAI
import os
from dotenv import load_dotenv
load_dotenv()

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
response = client.chat.completions.create(
    model='gpt-4o-mini',
    messages=[{'role': 'user', 'content': 'Say hello'}]
)
print(response.choices[0].message.content)
"
```

### Port Already in Use
```bash
# Find process using port 8000
lsof -ti:8000

# Kill the process
kill -9 $(lsof -ti:8000)

# Or use a different port
uvicorn app.main:app --reload --port 8001
```

---

## 🎉 Success!

If all tests pass, you've successfully completed **Phase 0 - Day 1**!

### What We Built Today:
- ✅ Complete project structure
- ✅ Configuration management with Pydantic
- ✅ FastAPI application with middleware
- ✅ Health check and metrics endpoints
- ✅ API key authentication
- ✅ Structured logging
- ✅ CORS configuration
- ✅ Development environment setup

### Next Steps (Day 2-3):
Phase 1 will implement the RAG pipeline:
- Document ingestion and chunking
- Embeddings with OpenAI
- ChromaDB vector store
- BM25 keyword search
- Hybrid retrieval
- Reranking

---

## Useful Commands Reference

```bash
# Activate virtual environment
source .venv/bin/activate

# Deactivate virtual environment
deactivate

# Install new package
uv pip install package-name

# Update all packages
uv pip install --upgrade -e ".[dev]"

# Run linting
ruff check .

# Format code
ruff format .

# Run tests (when we add them later)
pytest tests/ -v

# Start server
uvicorn app.main:app --reload

# Start server on different port
uvicorn app.main:app --reload --port 8001

# Check Redis
redis-cli ping

# Monitor Redis
redis-cli monitor

# View logs in real-time
tail -f logs/app.log  # (when we add logging)
```

---

**Need Help?** Check the main README.md for detailed explanations of all concepts!
