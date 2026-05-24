# 🚀 Complete Guide to MCP (Model Context Protocol) with FastMCP

> **From Zero to Production** — Building MCP Servers, Integrating APIs, and Consuming in LangChain & LangGraph

---

## Table of Contents

1. [What is MCP?](https://claude.ai/chat/02d29a4c-8637-4589-a374-36242454676c#1-what-is-mcp)
2. [FastMCP Framework](https://claude.ai/chat/02d29a4c-8637-4589-a374-36242454676c#2-fastmcp-framework)
3. [Architecture Deep Dive](https://claude.ai/chat/02d29a4c-8637-4589-a374-36242454676c#3-architecture-deep-dive)
4. [Installation &amp; Environment Setup](https://claude.ai/chat/02d29a4c-8637-4589-a374-36242454676c#4-installation--environment-setup)
5. [Building Your First MCP Server](https://claude.ai/chat/02d29a4c-8637-4589-a374-36242454676c#5-building-your-first-mcp-server)
6. [Tool Types &amp; Advanced Registration](https://claude.ai/chat/02d29a4c-8637-4589-a374-36242454676c#6-tool-types--advanced-registration)
7. [Integrating External APIs as Tools](https://claude.ai/chat/02d29a4c-8637-4589-a374-36242454676c#7-integrating-external-apis-as-tools)
8. [Exposing MCP on Custom Ports &amp; Hosts](https://claude.ai/chat/02d29a4c-8637-4589-a374-36242454676c#8-exposing-mcp-on-custom-ports--hosts)
9. [Authentication &amp; Security](https://claude.ai/chat/02d29a4c-8637-4589-a374-36242454676c#9-authentication--security)
10. [Consuming MCP in LangChain](https://claude.ai/chat/02d29a4c-8637-4589-a374-36242454676c#10-consuming-mcp-in-langchain)
11. [Consuming MCP in LangGraph](https://claude.ai/chat/02d29a4c-8637-4589-a374-36242454676c#11-consuming-mcp-in-langgraph)
12. [Production-Grade Patterns](https://claude.ai/chat/02d29a4c-8637-4589-a374-36242454676c#12-production-grade-patterns)
13. [Error Handling &amp; Observability](https://claude.ai/chat/02d29a4c-8637-4589-a374-36242454676c#13-error-handling--observability)
14. [Common Mistakes &amp; Best Practices](https://claude.ai/chat/02d29a4c-8637-4589-a374-36242454676c#14-common-mistakes--best-practices)
15. [Interview Cheat Sheet](https://claude.ai/chat/02d29a4c-8637-4589-a374-36242454676c#15-interview-cheat-sheet)

---

## 1. What is MCP?

**Model Context Protocol (MCP)** is an open standard (introduced by Anthropic) that defines a universal interface between LLM agents and the tools/data sources they use.

### The Problem MCP Solves

Without MCP, every agent duplicates tool logic:

```
Agent A:  [LLM] + [search fn] + [db fn] + [weather fn]
Agent B:  [LLM] + [search fn] + [db fn] + [email fn]   ← search/db duplicated!
Agent C:  [LLM] + [search fn] + [email fn] + [calc fn]
```

With MCP, tools live in one place:

```
           ┌─────────────────────────────┐
           │        MCP Server           │
           │  [search] [db] [weather]    │
           │  [email]  [calc] [files]    │
           └─────────────────────────────┘
                  ↑        ↑       ↑
              Agent A   Agent B  Agent C
```

### Core Concepts

| Concept             | Description                                                     |
| ------------------- | --------------------------------------------------------------- |
| **Server**    | A process that exposes tools and resources to agents            |
| **Tool**      | A callable function with a defined input/output schema          |
| **Resource**  | Read-only data exposed to agents (files, DB rows, configs)      |
| **Client**    | The agent-side component that connects to and calls the server  |
| **Transport** | How client and server communicate (stdio, SSE, WebSocket, HTTP) |

---

## 2. FastMCP Framework

**FastMCP** is the fastest way to build MCP servers in Python. It wraps the low-level MCP spec with a clean, decorator-based API — think FastAPI, but for agent tools.

### Why FastMCP?

* Automatic schema generation from Python type hints
* Built-in input validation (via Pydantic)
* LLM-readable docstrings → tool descriptions
* Multiple transport modes (HTTP, stdio, SSE)
* Async-first, production ready

---

## 3. Architecture Deep Dive

```
┌──────────────────────────────────────────────────────────────────┐
│                        Your Application                          │
│                                                                  │
│   ┌────────────────────────────────────────────────────────┐     │
│   │              LangGraph / LangChain Agent               │     │
│   │                                                        │     │
│   │   ┌──────────┐    ┌────────────────────────────────┐   │     │
│   │   │   LLM    │◄──►│         MCP Client             │   │     │
│   │   │ (GPT-4 / │    │  - Discovers available tools   │   │     │
│   │   │  Claude) │    │  - Formats tool calls          │   │     │
│   │   └──────────┘    │  - Parses tool responses       │   │     │
│   │                   └────────────┬───────────────────┘   │     │
│   └───────────────────────────────┼────────────────────────┘     │
│                                   │  HTTP / SSE / stdio           │
│   ┌───────────────────────────────▼────────────────────────┐     │
│   │                    MCP Server (FastMCP)                 │     │
│   │                                                         │     │
│   │   ┌──────────┐  ┌──────────┐  ┌──────────────────────┐ │     │
│   │   │  Tool 1  │  │  Tool 2  │  │       Tool N         │ │     │
│   │   │  (calc)  │  │ (search) │  │   (external API)     │ │     │
│   │   └──────────┘  └──────────┘  └──────────────────────┘ │     │
│   └─────────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────────┘
```

### Transport Layer Options

| Transport | Use Case                              | Latency  |
| --------- | ------------------------------------- | -------- |
| `stdio` | Local agents, CLI tools               | Lowest   |
| `http`  | REST-style, stateless requests        | Low      |
| `sse`   | Streaming responses, real-time agents | Low      |
| `ws`    | Bidirectional, persistent connections | Very Low |

---

## 4. Installation & Environment Setup

```bash
# Create a virtual environment
python -m venv mcp-env
source mcp-env/bin/activate  # Windows: mcp-env\Scripts\activate

# Core dependencies
pip install fastmcp uvicorn httpx pydantic

# For LangChain/LangGraph integration
pip install langchain langchain-openai langgraph langchain-anthropic

# For API integrations
pip install requests aiohttp python-dotenv

# Optional: for async tools
pip install asyncio
```

### Project Structure

```
mcp-project/
├── server/
│   ├── __init__.py
│   ├── main.py              ← MCP server entry point
│   ├── tools/
│   │   ├── __init__.py
│   │   ├── math_tools.py    ← Math/calculation tools
│   │   ├── weather_tools.py ← Weather API tools
│   │   ├── search_tools.py  ← Web search tools
│   │   ├── db_tools.py      ← Database tools
│   │   └── file_tools.py    ← File system tools
│   └── config.py            ← Server configuration
├── client/
│   ├── langchain_client.py  ← LangChain integration
│   └── langgraph_client.py  ← LangGraph integration
├── .env                     ← API keys
└── requirements.txt
```

---

## 5. Building Your First MCP Server

### Minimal Example

```python
# server/main.py
from fastmcp import FastMCP

mcp = FastMCP("My First MCP Server")

@mcp.tool()
def hello(name: str) -> str:
    """Greet a user by name."""
    return f"Hello, {name}! Welcome to MCP."

if __name__ == "__main__":
    mcp.run()
```

### Run it

```bash
python server/main.py
# Server starts at http://localhost:8000
```

### Verify it works

```bash
# List available tools
curl http://localhost:8000/tools

# Call a tool
curl -X POST http://localhost:8000/tools/call \
  -H "Content-Type: application/json" \
  -d '{"name": "hello", "arguments": {"name": "Alice"}}'
```

---

## 6. Tool Types & Advanced Registration

### 6.1 Synchronous Tools

```python
from fastmcp import FastMCP
from pydantic import BaseModel, Field
from typing import Optional

mcp = FastMCP("Advanced Tools Server")

# Simple tool with type hints
@mcp.tool()
def add(a: float, b: float) -> float:
    """Add two numbers and return the result."""
    return a + b

# Tool with optional parameters and defaults
@mcp.tool()
def format_date(
    date_str: str,
    format: str = "%Y-%m-%d",
    locale: Optional[str] = None
) -> str:
    """
    Format a date string.
  
    Args:
        date_str: ISO format date string (e.g. '2024-01-15')
        format: Output format string (default: '%Y-%m-%d')
        locale: Optional locale for month names (e.g. 'en_US')
  
    Returns:
        Formatted date string
    """
    from datetime import datetime
    dt = datetime.fromisoformat(date_str)
    return dt.strftime(format)
```

### 6.2 Async Tools (Recommended for I/O)

```python
import asyncio
import httpx

@mcp.tool()
async def fetch_url(url: str, timeout: int = 10) -> dict:
    """
    Fetch content from a URL asynchronously.
  
    Args:
        url: The URL to fetch
        timeout: Request timeout in seconds (default: 10)
  
    Returns:
        dict with 'status', 'content', and 'headers'
    """
    async with httpx.AsyncClient() as client:
        response = await client.get(url, timeout=timeout)
        return {
            "status": response.status_code,
            "content": response.text[:2000],  # limit response
            "headers": dict(response.headers)
        }
```

### 6.3 Tools with Pydantic Models (Complex Inputs)

```python
from pydantic import BaseModel, Field
from typing import List, Literal

class SearchQuery(BaseModel):
    query: str = Field(..., description="Search query text")
    max_results: int = Field(default=5, ge=1, le=20, description="Max results to return")
    language: Literal["en", "es", "fr", "de"] = Field(default="en")
    include_metadata: bool = Field(default=False)

class SearchResult(BaseModel):
    title: str
    url: str
    snippet: str
    score: float

@mcp.tool()
def advanced_search(query: SearchQuery) -> List[SearchResult]:
    """
    Perform an advanced search with filtering options.
    Accepts structured query parameters for precise control.
    """
    # Simulated results — replace with real search logic
    return [
        SearchResult(
            title=f"Result for '{query.query}'",
            url=f"https://example.com/result-1",
            snippet=f"This is a relevant snippet about {query.query}...",
            score=0.95
        )
    ]
```

### 6.4 Resource Exposure (Read-only Data)

```python
from fastmcp import FastMCP

mcp = FastMCP("Resource Server")

@mcp.resource("config://app-settings")
def get_app_settings() -> dict:
    """Expose application configuration as a resource."""
    return {
        "version": "1.0.0",
        "environment": "production",
        "features": ["search", "weather", "calculator"]
    }

@mcp.resource("db://users/{user_id}")
def get_user(user_id: str) -> dict:
    """Fetch a specific user record by ID."""
    # Replace with real DB query
    return {"id": user_id, "name": "Alice", "role": "admin"}
```

---

## 7. Integrating External APIs as Tools

### 7.1 Weather API (OpenWeatherMap)

```python
# server/tools/weather_tools.py
import os
import httpx
from typing import Optional
from pydantic import BaseModel

class WeatherData(BaseModel):
    city: str
    temperature_celsius: float
    temperature_fahrenheit: float
    description: str
    humidity: int
    wind_speed_kmh: float
    feels_like_celsius: float

def register_weather_tools(mcp):
  
    @mcp.tool()
    async def get_current_weather(city: str, country_code: Optional[str] = None) -> WeatherData:
        """
        Get current weather for a city using OpenWeatherMap API.
      
        Args:
            city: City name (e.g., 'London', 'New York')
            country_code: ISO country code (e.g., 'US', 'GB') for disambiguation
      
        Returns:
            WeatherData object with temperature, humidity, and wind info
        """
        api_key = os.getenv("OPENWEATHER_API_KEY")
        if not api_key:
            raise ValueError("OPENWEATHER_API_KEY environment variable not set")
      
        location = f"{city},{country_code}" if country_code else city
      
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                "https://api.openweathermap.org/data/2.5/weather",
                params={"q": location, "appid": api_key, "units": "metric"}
            )
            resp.raise_for_status()
            data = resp.json()
      
        temp_c = data["main"]["temp"]
        return WeatherData(
            city=data["name"],
            temperature_celsius=round(temp_c, 1),
            temperature_fahrenheit=round((temp_c * 9/5) + 32, 1),
            description=data["weather"][0]["description"],
            humidity=data["main"]["humidity"],
            wind_speed_kmh=round(data["wind"]["speed"] * 3.6, 1),
            feels_like_celsius=round(data["main"]["feels_like"], 1)
        )
  
    @mcp.tool()
    async def get_weather_forecast(city: str, days: int = 5) -> dict:
        """
        Get weather forecast for the next N days.
      
        Args:
            city: City name
            days: Number of forecast days (1-5, default: 5)
      
        Returns:
            Dictionary with daily forecast data
        """
        api_key = os.getenv("OPENWEATHER_API_KEY")
        days = max(1, min(days, 5))  # clamp between 1 and 5
      
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                "https://api.openweathermap.org/data/2.5/forecast",
                params={"q": city, "appid": api_key, "units": "metric", "cnt": days * 8}
            )
            resp.raise_for_status()
            data = resp.json()
      
        # Group by day
        forecasts = {}
        for item in data["list"]:
            date = item["dt_txt"][:10]
            if date not in forecasts:
                forecasts[date] = {
                    "date": date,
                    "min_temp": item["main"]["temp_min"],
                    "max_temp": item["main"]["temp_max"],
                    "description": item["weather"][0]["description"]
                }
      
        return {"city": city, "forecast": list(forecasts.values())[:days]}
```

### 7.2 Web Search API (SerpAPI / Brave Search)

```python
# server/tools/search_tools.py
import os
import httpx
from typing import List, Optional

def register_search_tools(mcp):

    @mcp.tool()
    async def web_search(
        query: str,
        num_results: int = 5,
        search_type: str = "web"
    ) -> List[dict]:
        """
        Search the web using Brave Search API.
      
        Args:
            query: Search query string
            num_results: Number of results (1-10, default: 5)
            search_type: 'web', 'news', or 'images'
      
        Returns:
            List of search results with title, url, and description
        """
        api_key = os.getenv("BRAVE_SEARCH_API_KEY")
        num_results = max(1, min(num_results, 10))
      
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                "https://api.search.brave.com/res/v1/web/search",
                headers={"Accept": "application/json", "X-Subscription-Token": api_key},
                params={"q": query, "count": num_results}
            )
            resp.raise_for_status()
            data = resp.json()
      
        results = []
        for item in data.get("web", {}).get("results", []):
            results.append({
                "title": item.get("title", ""),
                "url": item.get("url", ""),
                "description": item.get("description", ""),
                "published": item.get("page_age", "unknown")
            })
      
        return results

    @mcp.tool()
    async def get_page_content(url: str, max_chars: int = 3000) -> dict:
        """
        Fetch and extract text content from a web page.
      
        Args:
            url: Full URL of the page to fetch
            max_chars: Maximum characters to return (default: 3000)
      
        Returns:
            Dictionary with 'url', 'title', and 'content'
        """
        async with httpx.AsyncClient(follow_redirects=True) as client:
            resp = await client.get(url, timeout=15)
            resp.raise_for_status()
      
        # Basic HTML stripping (use BeautifulSoup for production)
        import re
        text = re.sub(r'<[^>]+>', ' ', resp.text)
        text = re.sub(r'\s+', ' ', text).strip()
      
        return {
            "url": url,
            "status": resp.status_code,
            "content": text[:max_chars]
        }
```

### 7.3 Database Tools (PostgreSQL)

```python
# server/tools/db_tools.py
import os
import json
from typing import List, Dict, Any, Optional

def register_db_tools(mcp):

    def get_connection():
        import psycopg2
        return psycopg2.connect(os.getenv("DATABASE_URL"))

    @mcp.tool()
    def query_database(
        sql: str,
        params: Optional[List[Any]] = None,
        limit: int = 100
    ) -> List[Dict[str, Any]]:
        """
        Execute a SELECT query on the PostgreSQL database.
        Only SELECT queries are allowed for safety.
      
        Args:
            sql: SQL SELECT query (parameterized with %s placeholders)
            params: Optional list of query parameters
            limit: Maximum rows to return (default: 100)
      
        Returns:
            List of row dictionaries
      
        Example:
            sql="SELECT * FROM users WHERE age > %s", params=[25]
        """
        # Security: only allow SELECT
        if not sql.strip().upper().startswith("SELECT"):
            raise ValueError("Only SELECT queries are allowed")
      
        # Inject LIMIT if not present
        if "LIMIT" not in sql.upper():
            sql = f"{sql} LIMIT {limit}"
      
        conn = get_connection()
        try:
            with conn.cursor() as cur:
                cur.execute(sql, params or [])
                columns = [desc[0] for desc in cur.description]
                rows = cur.fetchall()
                return [dict(zip(columns, row)) for row in rows]
        finally:
            conn.close()

    @mcp.tool()
    def get_table_schema(table_name: str) -> Dict[str, Any]:
        """
        Get the schema (columns, types, constraints) of a database table.
      
        Args:
            table_name: Name of the table to inspect
      
        Returns:
            Dictionary with column definitions and constraints
        """
        conn = get_connection()
        try:
            with conn.cursor() as cur:
                cur.execute("""
                    SELECT column_name, data_type, is_nullable, column_default
                    FROM information_schema.columns
                    WHERE table_name = %s
                    ORDER BY ordinal_position
                """, [table_name])
                columns = cur.fetchall()
                return {
                    "table": table_name,
                    "columns": [
                        {"name": c[0], "type": c[1], "nullable": c[2], "default": c[3]}
                        for c in columns
                    ]
                }
        finally:
            conn.close()
```

### 7.4 File System Tools

```python
# server/tools/file_tools.py
import os
import json
from pathlib import Path
from typing import List, Optional

BASE_DIR = Path(os.getenv("MCP_FILES_DIR", "/tmp/mcp-files"))

def register_file_tools(mcp):

    @mcp.tool()
    def read_file(filename: str) -> str:
        """
        Read the contents of a file from the MCP files directory.
      
        Args:
            filename: Filename (relative to MCP files directory)
      
        Returns:
            File contents as a string
        """
        filepath = BASE_DIR / filename
        # Security: prevent path traversal
        if not str(filepath.resolve()).startswith(str(BASE_DIR.resolve())):
            raise ValueError("Access denied: path traversal not allowed")
      
        if not filepath.exists():
            raise FileNotFoundError(f"File '{filename}' not found")
      
        return filepath.read_text(encoding="utf-8")

    @mcp.tool()
    def write_file(filename: str, content: str, overwrite: bool = False) -> dict:
        """
        Write content to a file in the MCP files directory.
      
        Args:
            filename: Target filename
            content: Text content to write
            overwrite: Allow overwriting existing file (default: False)
      
        Returns:
            Dictionary with 'path' and 'bytes_written'
        """
        filepath = BASE_DIR / filename
        BASE_DIR.mkdir(parents=True, exist_ok=True)
      
        if filepath.exists() and not overwrite:
            raise FileExistsError(f"File '{filename}' exists. Set overwrite=True to replace.")
      
        filepath.write_text(content, encoding="utf-8")
        return {"path": str(filepath), "bytes_written": len(content.encode())}

    @mcp.tool()
    def list_files(directory: str = "") -> List[dict]:
        """
        List files in the MCP files directory (or a subdirectory).
      
        Args:
            directory: Optional subdirectory path (default: root)
      
        Returns:
            List of file info dicts with name, size, and modified time
        """
        target = BASE_DIR / directory
        if not target.exists():
            return []
      
        files = []
        for p in target.iterdir():
            stat = p.stat()
            files.append({
                "name": p.name,
                "type": "directory" if p.is_dir() else "file",
                "size_bytes": stat.st_size if p.is_file() else None,
                "modified": stat.st_mtime
            })
        return sorted(files, key=lambda x: x["name"])
```

---

## 8. Exposing MCP on Custom Ports & Hosts

### 8.1 Composite Server (All Tools Together)

```python
# server/main.py
import os
from fastmcp import FastMCP
from tools.weather_tools import register_weather_tools
from tools.search_tools import register_search_tools
from tools.db_tools import register_db_tools
from tools.file_tools import register_file_tools

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

# Initialize the MCP server
mcp = FastMCP(
    name="Production MCP Server",
    version="1.0.0",
    description="Centralized tool server for all agents"
)

# Register all tool groups
register_weather_tools(mcp)
register_search_tools(mcp)
register_db_tools(mcp)
register_file_tools(mcp)

# Also register some inline tools
@mcp.tool()
def calculate(expression: str) -> float:
    """
    Safely evaluate a mathematical expression.
  
    Args:
        expression: Math expression (e.g. '2 * (3 + 4) / 7')
  
    Returns:
        Numeric result
  
    Note: Only mathematical operations are allowed.
    """
    import ast
    import operator
  
    ALLOWED_OPS = {
        ast.Add: operator.add,
        ast.Sub: operator.sub,
        ast.Mult: operator.mul,
        ast.Div: operator.truediv,
        ast.Pow: operator.pow,
        ast.Mod: operator.mod,
    }
  
    def eval_node(node):
        if isinstance(node, ast.Constant):
            return node.value
        elif isinstance(node, ast.BinOp):
            op = ALLOWED_OPS.get(type(node.op))
            if not op:
                raise ValueError(f"Unsupported operator: {type(node.op)}")
            return op(eval_node(node.left), eval_node(node.right))
        elif isinstance(node, ast.UnaryOp) and isinstance(node.op, ast.USub):
            return -eval_node(node.operand)
        else:
            raise ValueError(f"Unsupported expression: {type(node)}")
  
    tree = ast.parse(expression, mode="eval")
    return eval_node(tree.body)
```

### 8.2 Custom Port & Host Configuration

```python
# server/config.py
import os

class ServerConfig:
    HOST: str = os.getenv("MCP_HOST", "0.0.0.0")
    PORT: int = int(os.getenv("MCP_PORT", "8080"))
    TRANSPORT: str = os.getenv("MCP_TRANSPORT", "http")  # http | stdio | sse
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "info")
    WORKERS: int = int(os.getenv("MCP_WORKERS", "4"))
    RELOAD: bool = os.getenv("MCP_RELOAD", "false").lower() == "true"
```

```python
# server/main.py (updated run section)
from config import ServerConfig

if __name__ == "__main__":
    cfg = ServerConfig()
  
    if cfg.TRANSPORT == "stdio":
        # For local CLI agents
        mcp.run(transport="stdio")
  
    elif cfg.TRANSPORT == "sse":
        # For streaming / real-time agents
        mcp.run(
            transport="sse",
            host=cfg.HOST,
            port=cfg.PORT
        )
  
    else:
        # Default: HTTP (stateless REST-style)
        mcp.run(
            transport="http",
            host=cfg.HOST,
            port=cfg.PORT
        )
```

### 8.3 Running with Uvicorn Directly (Production)

```bash
# Development
uvicorn server.main:mcp.app --host 0.0.0.0 --port 8080 --reload

# Production (multiple workers)
uvicorn server.main:mcp.app --host 0.0.0.0 --port 8080 --workers 4 --log-level info

# Using gunicorn with uvicorn workers
gunicorn server.main:mcp.app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8080
```

### 8.4 Docker Deployment

```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY server/ ./server/
COPY .env .

EXPOSE 8080

CMD ["uvicorn", "server.main:mcp.app", "--host", "0.0.0.0", "--port", "8080", "--workers", "4"]
```

```yaml
# docker-compose.yml
version: "3.9"
services:
  mcp-server:
    build: .
    ports:
      - "8080:8080"
    environment:
      - MCP_HOST=0.0.0.0
      - MCP_PORT=8080
      - OPENWEATHER_API_KEY=${OPENWEATHER_API_KEY}
      - BRAVE_SEARCH_API_KEY=${BRAVE_SEARCH_API_KEY}
      - DATABASE_URL=${DATABASE_URL}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

---

## 9. Authentication & Security

### 9.1 API Key Authentication Middleware

```python
# server/middleware/auth.py
from fastapi import Request, HTTPException
from fastapi.middleware.base import BaseHTTPMiddleware
import os

class APIKeyMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, api_key: str):
        super().__init__(app)
        self.api_key = api_key
  
    async def dispatch(self, request: Request, call_next):
        # Skip auth for health check
        if request.url.path in ["/health", "/docs"]:
            return await call_next(request)
      
        key = request.headers.get("X-API-Key") or request.query_params.get("api_key")
        if key != self.api_key:
            raise HTTPException(status_code=401, detail="Invalid API key")
      
        return await call_next(request)

# Register middleware in main.py
from fastapi import FastAPI
from middleware.auth import APIKeyMiddleware

app = mcp.get_app()  # Get the underlying FastAPI app
app.add_middleware(APIKeyMiddleware, api_key=os.getenv("MCP_API_KEY", "secret"))
```

---

## 10. Consuming MCP in LangChain

### 10.1 Basic MCP Client Wrapper

```python
# client/mcp_client.py
import httpx
import asyncio
from typing import Any, Dict, List, Optional
from langchain.tools import BaseTool
from pydantic import BaseModel

class MCPClient:
    """Async client for communicating with an MCP server."""
  
    def __init__(self, base_url: str, api_key: Optional[str] = None, timeout: int = 30):
        self.base_url = base_url.rstrip("/")
        self.headers = {"Content-Type": "application/json"}
        if api_key:
            self.headers["X-API-Key"] = api_key
        self.timeout = timeout
  
    async def list_tools(self) -> List[dict]:
        """Discover all available tools from the MCP server."""
        async with httpx.AsyncClient(headers=self.headers) as client:
            resp = await client.get(f"{self.base_url}/tools", timeout=self.timeout)
            resp.raise_for_status()
            return resp.json().get("tools", [])
  
    async def call_tool(self, tool_name: str, arguments: dict) -> Any:
        """Call a specific tool on the MCP server."""
        async with httpx.AsyncClient(headers=self.headers) as client:
            resp = await client.post(
                f"{self.base_url}/tools/call",
                json={"name": tool_name, "arguments": arguments},
                timeout=self.timeout
            )
            resp.raise_for_status()
            result = resp.json()
          
            if result.get("isError"):
                raise RuntimeError(f"Tool error: {result.get('content')}")
          
            return result.get("content")
```

### 10.2 Dynamic LangChain Tool Factory

```python
# client/langchain_client.py
import asyncio
import json
from typing import Any, Optional, Type
from langchain.tools import BaseTool
from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor, create_openai_functions_agent
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from mcp_client import MCPClient

class MCPTool(BaseTool):
    """A LangChain-compatible tool backed by an MCP server endpoint."""
  
    name: str
    description: str
    mcp_client: Any  # MCPClient instance
    tool_schema: dict  # JSON schema for validation
  
    class Config:
        arbitrary_types_allowed = True
  
    def _run(self, **kwargs) -> str:
        """Synchronous wrapper around the async tool call."""
        loop = asyncio.new_event_loop()
        try:
            return loop.run_until_complete(self._arun(**kwargs))
        finally:
            loop.close()
  
    async def _arun(self, **kwargs) -> str:
        """Async tool execution — preferred for production."""
        result = await self.mcp_client.call_tool(self.name, kwargs)
        if isinstance(result, (dict, list)):
            return json.dumps(result, indent=2)
        return str(result)


def build_mcp_tools(mcp_client: MCPClient) -> list[BaseTool]:
    """
    Dynamically discover and build LangChain tools from an MCP server.
  
    Usage:
        client = MCPClient("http://localhost:8080")
        tools = asyncio.run(build_mcp_tools_async(client))
    """
    async def _build():
        tool_defs = await mcp_client.list_tools()
        tools = []
        for tool_def in tool_defs:
            tool = MCPTool(
                name=tool_def["name"],
                description=tool_def.get("description", ""),
                mcp_client=mcp_client,
                tool_schema=tool_def.get("inputSchema", {})
            )
            tools.append(tool)
        return tools
  
    return asyncio.run(_build())


# ── Main agent setup ──────────────────────────────────────────────────────────

def create_langchain_agent(mcp_url: str, api_key: Optional[str] = None):
    """
    Create a LangChain agent that uses MCP tools.
  
    Args:
        mcp_url: Base URL of the MCP server
        api_key: Optional API key for authentication
  
    Returns:
        AgentExecutor ready to run
    """
    # 1. Connect to MCP
    client = MCPClient(mcp_url, api_key=api_key)
    tools = build_mcp_tools(client)
  
    print(f"✅ Loaded {len(tools)} tools from MCP server:")
    for t in tools:
        print(f"   - {t.name}: {t.description[:60]}...")
  
    # 2. Define the LLM
    llm = ChatOpenAI(model="gpt-4o", temperature=0)
  
    # 3. Build prompt
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a helpful assistant with access to various tools. "
                   "Use them to answer questions accurately and concisely."),
        MessagesPlaceholder("chat_history", optional=True),
        ("human", "{input}"),
        MessagesPlaceholder("agent_scratchpad"),
    ])
  
    # 4. Create the agent
    agent = create_openai_functions_agent(llm, tools, prompt)
  
    return AgentExecutor(
        agent=agent,
        tools=tools,
        verbose=True,
        max_iterations=5,
        handle_parsing_errors=True,
        return_intermediate_steps=True
    )


# ── Usage Example ─────────────────────────────────────────────────────────────

if __name__ == "__main__":
    agent = create_langchain_agent("http://localhost:8080")
  
    # Single question
    result = agent.invoke({"input": "What's the weather in Tokyo, and what's 123 * 456?"})
    print("\n🤖 Answer:", result["output"])
  
    # With chat history (multi-turn)
    from langchain_core.messages import HumanMessage, AIMessage
  
    history = [
        HumanMessage(content="My name is Alex"),
        AIMessage(content="Nice to meet you, Alex!"),
    ]
    result2 = agent.invoke({
        "input": "What is my name and what's the weather in London?",
        "chat_history": history
    })
    print("\n🤖 Answer:", result2["output"])
```

---

## 11. Consuming MCP in LangGraph

LangGraph gives you fine-grained control over agent behavior using a stateful graph architecture. This is the preferred approach for production agents.

### 11.1 State Schema

```python
# client/langgraph_client.py
from typing import Annotated, List, Optional
from typing_extensions import TypedDict
from langchain_core.messages import BaseMessage, AnyMessage
import operator

class AgentState(TypedDict):
    """State that flows through the LangGraph agent."""
    messages: Annotated[List[AnyMessage], operator.add]  # append-only
    user_query: str
    tool_calls_count: int
    max_tool_calls: int
    final_answer: Optional[str]
```

### 11.2 Full LangGraph Agent with MCP

```python
import json
import asyncio
from typing import Literal
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, AIMessage, ToolMessage, SystemMessage
from langgraph.graph import StateGraph, END
from mcp_client import MCPClient
from langchain_client import MCPTool, build_mcp_tools

# ── Node Functions ────────────────────────────────────────────────────────────

def make_agent_node(llm_with_tools):
    """Node: LLM decides what to do next."""
    async def agent_node(state: AgentState) -> dict:
        messages = state["messages"]
      
        # Add system message if this is the first turn
        if not any(isinstance(m, SystemMessage) for m in messages):
            messages = [
                SystemMessage(content=(
                    "You are a powerful AI assistant. You have access to tools for "
                    "weather, search, math, files, and databases. "
                    "Use tools when needed. Be concise and accurate."
                ))
            ] + messages
      
        response = await llm_with_tools.ainvoke(messages)
      
        return {
            "messages": [response],
            "tool_calls_count": state["tool_calls_count"]
        }
  
    return agent_node


def make_tool_node(tools: list):
    """Node: Execute the tools the LLM requested."""
    tool_map = {t.name: t for t in tools}
  
    async def tool_node(state: AgentState) -> dict:
        last_message = state["messages"][-1]
        tool_results = []
      
        for tool_call in last_message.tool_calls:
            tool_name = tool_call["name"]
            tool_args = tool_call["args"]
            tool_call_id = tool_call["id"]
          
            if tool_name not in tool_map:
                content = f"Error: Tool '{tool_name}' not found"
            else:
                try:
                    tool = tool_map[tool_name]
                    content = await tool._arun(**tool_args)
                except Exception as e:
                    content = f"Tool error: {str(e)}"
          
            tool_results.append(
                ToolMessage(content=content, tool_call_id=tool_call_id)
            )
      
        return {
            "messages": tool_results,
            "tool_calls_count": state["tool_calls_count"] + 1
        }
  
    return tool_node


def should_continue(state: AgentState) -> Literal["tools", "end"]:
    """
    Edge router: Decide whether to call tools or finish.
    """
    last_message = state["messages"][-1]
  
    # Stop if max tool calls reached
    if state["tool_calls_count"] >= state["max_tool_calls"]:
        return "end"
  
    # Continue if the LLM wants to call tools
    if hasattr(last_message, "tool_calls") and last_message.tool_calls:
        return "tools"
  
    return "end"


# ── Graph Assembly ────────────────────────────────────────────────────────────

def build_langgraph_agent(mcp_url: str, api_key: str = None, max_tool_calls: int = 10):
    """
    Build and compile a LangGraph agent that uses MCP tools.
  
    Args:
        mcp_url: MCP server URL
        api_key: Optional API key
        max_tool_calls: Safety limit on tool call iterations
  
    Returns:
        Compiled LangGraph runnable
    """
    # Discover MCP tools
    client = MCPClient(mcp_url, api_key=api_key)
    tools = build_mcp_tools(client)
  
    print(f"✅ Loaded {len(tools)} MCP tools into LangGraph agent")
  
    # Bind tools to LLM
    llm = ChatOpenAI(model="gpt-4o", temperature=0, streaming=True)
    llm_with_tools = llm.bind_tools(tools)
  
    # Build the graph
    workflow = StateGraph(AgentState)
  
    # Add nodes
    workflow.add_node("agent", make_agent_node(llm_with_tools))
    workflow.add_node("tools", make_tool_node(tools))
  
    # Define edges
    workflow.set_entry_point("agent")
  
    workflow.add_conditional_edges(
        "agent",
        should_continue,
        {"tools": "tools", "end": END}
    )
  
    workflow.add_edge("tools", "agent")  # Always return to agent after tools
  
    return workflow.compile()


# ── Usage ─────────────────────────────────────────────────────────────────────

async def run_agent(query: str, mcp_url: str = "http://localhost:8080"):
    """Run the LangGraph agent with a single query."""
    graph = build_langgraph_agent(mcp_url)
  
    initial_state: AgentState = {
        "messages": [HumanMessage(content=query)],
        "user_query": query,
        "tool_calls_count": 0,
        "max_tool_calls": 10,
        "final_answer": None
    }
  
    result = await graph.ainvoke(initial_state)
  
    # Extract the final answer
    final_message = result["messages"][-1]
    return final_message.content


async def run_streaming_agent(query: str, mcp_url: str = "http://localhost:8080"):
    """Run the agent with streaming output (see tokens as they arrive)."""
    graph = build_langgraph_agent(mcp_url)
  
    initial_state: AgentState = {
        "messages": [HumanMessage(content=query)],
        "user_query": query,
        "tool_calls_count": 0,
        "max_tool_calls": 10,
        "final_answer": None
    }
  
    print("🤖 Agent: ", end="", flush=True)
    async for chunk in graph.astream(initial_state, stream_mode="values"):
        last_msg = chunk["messages"][-1]
        if hasattr(last_msg, "content") and isinstance(last_msg.content, str):
            # Only print agent text messages
            if not hasattr(last_msg, "tool_calls") or not last_msg.tool_calls:
                print(last_msg.content, end="", flush=True)
    print()  # newline at end


if __name__ == "__main__":
    queries = [
        "What's the current weather in Mumbai and Paris?",
        "Search the web for latest AI news and summarize the top 3 results",
        "Calculate the compound interest on $10,000 at 7% for 10 years",
    ]
  
    for q in queries:
        print(f"\n📝 Query: {q}")
        answer = asyncio.run(run_agent(q))
        print(f"💡 Answer: {answer}")
```

### 11.3 Multi-Agent LangGraph (Supervisor Pattern)

```python
# Multi-agent where a supervisor routes to specialized sub-agents

from langgraph.graph import StateGraph, END
from langchain_core.messages import HumanMessage

class SupervisorState(TypedDict):
    messages: Annotated[List[AnyMessage], operator.add]
    next_agent: str  # Which agent to route to next
    task_complete: bool

def build_multi_agent_system(mcp_url: str):
    """
    Build a system with specialized agents:
    - Research Agent: uses search + web fetch tools
    - Data Agent: uses database + calculation tools  
    - Supervisor: decides which agent handles the task
    """
    client = MCPClient(mcp_url)
    all_tools = build_mcp_tools(client)
  
    # Split tools by type
    research_tools = [t for t in all_tools if t.name in ["web_search", "get_page_content"]]
    data_tools     = [t for t in all_tools if t.name in ["query_database", "calculate"]]
    utility_tools  = [t for t in all_tools if t.name in ["get_current_weather", "read_file"]]
  
    llm = ChatOpenAI(model="gpt-4o", temperature=0)
  
    # Supervisor router
    def supervisor(state: SupervisorState) -> dict:
        last_msg = state["messages"][-1].content
      
        routing_prompt = f"""
        Task: {last_msg}
      
        Route to:
        - "research" → web search, current events, news
        - "data" → calculations, database queries, numbers
        - "utility" → weather, files, general tasks
        - "done" → task is complete
      
        Respond with ONLY one word: research, data, utility, or done
        """
        response = llm.invoke([HumanMessage(content=routing_prompt)])
        next_agent = response.content.strip().lower()
      
        if next_agent not in ["research", "data", "utility"]:
            next_agent = "done"
      
        return {"next_agent": next_agent}
  
    graph = StateGraph(SupervisorState)
    graph.add_node("supervisor", supervisor)
    # Add sub-agent nodes here (similar to build_langgraph_agent above)
    # ...
  
    return graph.compile()
```

---

## 12. Production-Grade Patterns

### 12.1 Tool Retry Logic

```python
import asyncio
from functools import wraps

def with_retry(max_retries: int = 3, delay: float = 1.0, backoff: float = 2.0):
    """Decorator to add retry logic to MCP tools."""
    def decorator(fn):
        @wraps(fn)
        async def wrapper(*args, **kwargs):
            last_error = None
            wait = delay
            for attempt in range(max_retries):
                try:
                    return await fn(*args, **kwargs)
                except Exception as e:
                    last_error = e
                    if attempt < max_retries - 1:
                        await asyncio.sleep(wait)
                        wait *= backoff
            raise last_error
        return wrapper
    return decorator

# Usage:
@mcp.tool()
@with_retry(max_retries=3, delay=0.5)
async def fetch_with_retry(url: str) -> dict:
    """Fetch URL with automatic retry on failure."""
    # ... implementation
```

### 12.2 Tool Rate Limiting

```python
import time
from collections import defaultdict
import threading

class RateLimiter:
    def __init__(self, calls_per_minute: int):
        self.calls_per_minute = calls_per_minute
        self.calls = defaultdict(list)
        self.lock = threading.Lock()
  
    def check(self, tool_name: str) -> bool:
        now = time.time()
        window = 60  # 1 minute
      
        with self.lock:
            # Remove old calls outside the window
            self.calls[tool_name] = [t for t in self.calls[tool_name] if now - t < window]
          
            if len(self.calls[tool_name]) >= self.calls_per_minute:
                return False  # Rate limit exceeded
          
            self.calls[tool_name].append(now)
            return True

limiter = RateLimiter(calls_per_minute=30)

def rate_limited(calls_per_minute: int = 30):
    def decorator(fn):
        @wraps(fn)
        async def wrapper(*args, **kwargs):
            if not limiter.check(fn.__name__):
                raise RuntimeError(f"Rate limit exceeded for tool '{fn.__name__}'")
            return await fn(*args, **kwargs)
        return wrapper
    return decorator
```

### 12.3 Caching Expensive Tool Results

```python
import hashlib
import json
from functools import wraps
from typing import Optional

_cache: dict = {}

def cached(ttl_seconds: int = 300):
    """Cache tool results for TTL seconds."""
    def decorator(fn):
        @wraps(fn)
        async def wrapper(*args, **kwargs):
            # Create cache key from function name + arguments
            key_data = json.dumps({"fn": fn.__name__, "args": args, "kwargs": kwargs}, sort_keys=True)
            cache_key = hashlib.md5(key_data.encode()).hexdigest()
          
            # Check cache
            if cache_key in _cache:
                result, expires_at = _cache[cache_key]
                if time.time() < expires_at:
                    return result
          
            # Call the function and cache the result
            result = await fn(*args, **kwargs)
            _cache[cache_key] = (result, time.time() + ttl_seconds)
            return result
        return wrapper
    return decorator

# Usage:
@mcp.tool()
@cached(ttl_seconds=600)  # Cache weather for 10 minutes
async def get_cached_weather(city: str) -> dict:
    """Get weather with 10-minute caching to reduce API calls."""
    # ... real implementation
```

---

## 13. Error Handling & Observability

### 13.1 Structured Error Responses

```python
from fastmcp.exceptions import ToolError

@mcp.tool()
async def safe_weather(city: str) -> dict:
    """Get weather with proper error handling."""
    if not city or not city.strip():
        raise ToolError("City name cannot be empty", code="INVALID_INPUT")
  
    try:
        return await get_current_weather(city)
    except httpx.HTTPStatusError as e:
        if e.response.status_code == 404:
            raise ToolError(f"City '{city}' not found", code="CITY_NOT_FOUND")
        raise ToolError(f"Weather API error: {e.response.status_code}", code="API_ERROR")
    except httpx.TimeoutException:
        raise ToolError("Weather API timed out. Try again.", code="TIMEOUT")
```

### 13.2 Logging & Tracing

```python
import logging
import time
from functools import wraps

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s - %(message)s"
)
logger = logging.getLogger("mcp-server")

def traced(fn):
    """Log tool calls with timing and arguments."""
    @wraps(fn)
    async def wrapper(*args, **kwargs):
        start = time.perf_counter()
        logger.info(f"🔧 Tool called: {fn.__name__} | args={kwargs}")
        try:
            result = await fn(*args, **kwargs)
            elapsed = (time.perf_counter() - start) * 1000
            logger.info(f"✅ Tool success: {fn.__name__} | {elapsed:.1f}ms")
            return result
        except Exception as e:
            elapsed = (time.perf_counter() - start) * 1000
            logger.error(f"❌ Tool failed: {fn.__name__} | {elapsed:.1f}ms | {e}")
            raise
    return wrapper
```

### 13.3 Health Check Endpoint

```python
# Add a health check endpoint to the MCP server app
from fastapi import FastAPI

app = mcp.get_app()

@app.get("/health")
async def health_check():
    """Health check endpoint for load balancers and Docker."""
    return {
        "status": "healthy",
        "server": mcp.name,
        "version": "1.0.0",
        "tools_count": len(await mcp.list_tools()),
        "timestamp": time.time()
    }
```

---

## 14. Common Mistakes & Best Practices

### ❌ Common Mistakes

| Mistake                                      | Why It's Bad                            | Fix                                                     |
| -------------------------------------------- | --------------------------------------- | ------------------------------------------------------- |
| Embedding tool logic in each agent           | Duplication, hard to update             | Centralize in MCP server                                |
| Missing or vague docstrings                  | LLM can't understand what the tool does | Write clear, detailed docstrings                        |
| No input validation                          | Silent failures, security holes         | Use Pydantic models or type hints                       |
| Synchronous I/O in async tools               | Blocks the event loop                   | Use `async`/`await`with `httpx`,`asyncpg`, etc. |
| No error handling                            | Agent gets cryptic errors               | Use try/except +`ToolError`                           |
| Tight coupling (agent imports tool directly) | Defeats the purpose of MCP              | Always go through the MCP client                        |
| No rate limiting on API tools                | Burn through API quota                  | Add rate limiting decorators                            |
| Exposing all DB operations                   | Security risk                           | Allow only SELECT; validate input                       |
| Ignoring caching                             | Repeated identical API calls            | Cache time-stable results                               |
| No health check                              | Deployment/monitoring issues            | Add `/health`endpoint                                 |

### ✅ Best Practices Checklist

* [ ] Every tool has a clear, detailed docstring (the LLM reads it!)
* [ ] All inputs are typed with Python type hints or Pydantic models
* [ ] I/O-bound tools use `async def`
* [ ] External API calls have timeout + retry logic
* [ ] Results are cached where appropriate
* [ ] Sensitive tools require authentication
* [ ] Server exposes `/health` endpoint
* [ ] Tools return structured data (dict/list), not raw strings
* [ ] Path traversal and SQL injection are prevented
* [ ] Rate limits protect third-party APIs

---

## 15. Interview Cheat Sheet

### One-Sentence Explanation

> "MCP is a standard protocol for exposing Python functions as structured, LLM-callable tools through a centralized server, enabling any agent to discover and use them without coupling to implementation details."

### Architecture Question

> "I designed a FastMCP server with tool groups for weather, search, database, and file operations. Each tool is a typed Python function decorated with `@mcp.tool()`. Agents connect via an HTTP client, discover tools dynamically, and call them by name with JSON arguments. This gives us full separation between tool logic and agent logic."

### Why Not Just Use LangChain Tools Directly?

> "LangChain tools live inside the agent process. MCP tools live in a separate server, which means: (1) any agent or language can use them, (2) tools can be updated without redeploying agents, (3) tools can be scaled independently, and (4) you get a central audit log of all tool calls."

### Transport Choice

> "For local development I use `stdio`. For distributed production systems I use `http` with Uvicorn. For real-time streaming agents I use `sse`. The server config makes this a one-line change."

### LangGraph vs LangChain Agents

> "LangChain agents are simpler but less controllable — great for quick prototypes. LangGraph gives you a stateful, inspectable graph where you define exactly how the agent loops: `agent → tools → agent → END`. This makes it easier to add safety limits, human-in-the-loop steps, and complex branching logic."

---

*Built with FastMCP · LangChain · LangGraph · Python 3.11+*
