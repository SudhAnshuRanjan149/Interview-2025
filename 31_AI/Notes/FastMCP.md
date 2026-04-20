# 🚀 What is MCP (Model Context Protocol)?

Before coding, understand this clearly:

> MCP is a **standard way to expose tools/functions to LLM agents**

Instead of writing tool logic inside every agent:

* You create a **central MCP server**
* Agents **import and use tools from it**

---

# 🧠 What is Fast MCP?

FastMCP is a lightweight Python framework to:

* Create MCP servers
* Register tools
* Expose them to agents (LangChain / LangGraph / OpenAI)

---

# 🏗️ Architecture (Simple)

```
Agent (LangGraph / LLM)
        ↓
   MCP Client
        ↓
   MCP Server (FastMCP)
        ↓
   Tools (Python functions)
```

---

# 🛠️ Step-by-Step Implementation

---

## ✅ 1. Install Dependencies

```bash
pip install fastmcp uvicorn
```

---

## ✅ 2. Create MCP Server

### 📄 `server.py`

```python
from fastmcp import FastMCP

# Initialize MCP server
mcp = FastMCP("My MCP Server")
```

---

## ✅ 3. Register Tools

### 👉 Tool = normal Python function + decorator

```python
@mcp.tool()
def add_numbers(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b


@mcp.tool()
def get_weather(city: str) -> str:
    """Get weather info for a city"""
    return f"The weather in {city} is sunny"
```

---

## ✅ 4. Run MCP Server

```python
if __name__ == "__main__":
    mcp.run()
```

👉 This starts a server like:

```
http://localhost:8000
```

---

## 🔥 Full Code (Clean Version)

```python
from fastmcp import FastMCP

# Create server
mcp = FastMCP("Demo MCP Server")

# Tool 1
@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b

# Tool 2
@mcp.tool()
def multiply(a: int, b: int) -> int:
    """Multiply two numbers"""
    return a * b

# Tool 3
@mcp.tool()
def greet(name: str) -> str:
    """Greet user"""
    return f"Hello {name}!"

# Run server
if __name__ == "__main__":
    mcp.run()
```

---

# 🔗 5. Connect MCP to Agent (Client Side)

Example with LangChain-style usage:

```python
from langchain.tools import tool
import requests

def call_mcp_tool(tool_name, payload):
    url = f"http://localhost:8000/{tool_name}"
    response = requests.post(url, json=payload)
    return response.json()

# Example usage
result = call_mcp_tool("add", {"a": 5, "b": 3})
print(result)
```

---

# 🧠 What’s Happening Internally?

FastMCP:

* Converts Python functions → API endpoints
* Adds metadata (name, description, schema)
* Makes them **LLM-callable tools**

---

# 🔥 Interview Explanation (IMPORTANT)

If interviewer asks:

> “How did you implement MCP?”

Say this:

> “I created a centralized MCP server using FastMCP where I registered reusable tools using decorators. Each tool is exposed as a structured API endpoint with defined input schema.
>
> My agents connect to this MCP server and invoke tools dynamically instead of embedding tool logic locally, which improves reusability, modularity, and maintainability across multiple agents.”

---

# ⚠️ Common Mistakes (Avoid)

❌ Writing tools inside each agent
❌ Not defining docstrings (LLM uses them!)
❌ No schema validation
❌ Tight coupling between agent & tool

---

# 💡 Pro Tip (Advanced)

You can:

* Add authentication
* Connect to databases
* Integrate external APIs
* Create async tools


