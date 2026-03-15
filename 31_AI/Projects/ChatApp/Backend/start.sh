#!/bin/bash

# 🚀 AgentIQ Quick Start Script
# This script verifies your setup and starts the development server

set -e  # Exit on any error

echo "════════════════════════════════════════════════════════"
echo "  🤖 AgentIQ - Setup Verification & Quick Start"
echo "════════════════════════════════════════════════════════"
echo ""

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Python version
echo "📋 Checking Python version..."
python_version=$(python3 --version 2>&1 | awk '{print $2}')
required_version="3.11.0"

if [ "$(printf '%s\n' "$required_version" "$python_version" | sort -V | head -n1)" = "$required_version" ]; then 
    echo -e "${GREEN}✅ Python $python_version (OK)${NC}"
else
    echo -e "${RED}❌ Python $python_version is too old. Need 3.11+${NC}"
    exit 1
fi

# Check if Redis is running
echo ""
echo "📋 Checking Redis connection..."
if redis-cli ping > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Redis is running${NC}"
else
    echo -e "${RED}❌ Redis is not running${NC}"
    echo -e "${YELLOW}   Run: brew services start redis${NC}"
    exit 1
fi

# Check if .env exists
echo ""
echo "📋 Checking environment configuration..."
if [ -f ".env" ]; then
    echo -e "${GREEN}✅ .env file found${NC}"
    
    # Check for required keys
    if grep -q "OPENAI_API_KEY=sk-" .env; then
        echo -e "${GREEN}✅ OpenAI API key configured${NC}"
    else
        echo -e "${YELLOW}⚠️  OpenAI API key not set in .env${NC}"
        echo -e "${YELLOW}   Please update OPENAI_API_KEY in .env file${NC}"
    fi
else
    echo -e "${RED}❌ .env file not found${NC}"
    echo -e "${YELLOW}   Run: cp .env.example .env${NC}"
    echo -e "${YELLOW}   Then edit .env with your API keys${NC}"
    exit 1
fi

# Check if virtual environment exists
echo ""
echo "📋 Checking virtual environment..."
if [ -d ".venv" ]; then
    echo -e "${GREEN}✅ Virtual environment exists${NC}"
else
    echo -e "${YELLOW}⚠️  Virtual environment not found${NC}"
    echo "   Creating virtual environment..."
    python3 -m venv .venv
    echo -e "${GREEN}✅ Virtual environment created${NC}"
fi

# Activate virtual environment
echo ""
echo "📋 Activating virtual environment..."
source .venv/bin/activate

# Check if packages are installed
echo ""
echo "📋 Checking Python packages..."
if python -c "import fastapi" 2>/dev/null; then
    echo -e "${GREEN}✅ FastAPI installed${NC}"
else
    echo -e "${YELLOW}⚠️  Dependencies not installed${NC}"
    echo "   Installing dependencies..."
    pip install -r requirements.txt --quiet
    echo -e "${GREEN}✅ Dependencies installed${NC}"
fi

# Test imports
echo ""
echo "📋 Testing core imports..."
python3 << 'PYEOF'
try:
    import fastapi
    import langchain
    import structlog
    from app.config import settings
    print("\033[0;32m✅ All core packages imported successfully\033[0m")
except ImportError as e:
    print(f"\033[0;31m❌ Import error: {e}\033[0m")
    exit(1)
PYEOF

# Create data directories if they don't exist
echo ""
echo "📋 Checking data directories..."
mkdir -p data/documents data/chroma_db data/sqlite
echo -e "${GREEN}✅ Data directories ready${NC}"

echo ""
echo "════════════════════════════════════════════════════════"
echo -e "${GREEN}  ✅ All checks passed! Ready to start AgentIQ${NC}"
echo "════════════════════════════════════════════════════════"
echo ""
echo "📚 Quick Commands:"
echo "   • Start server:  uvicorn app.main:app --reload"
echo "   • View docs:     http://localhost:8000/docs"
echo "   • Health check:  curl http://localhost:8000/health"
echo ""
echo -e "${YELLOW}Starting development server...${NC}"
echo ""

# Start the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
