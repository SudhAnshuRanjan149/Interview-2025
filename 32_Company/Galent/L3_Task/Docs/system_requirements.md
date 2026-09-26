# System Requirements & Installation Guide
## Automotive Fleet Health & Predictive Maintenance Engine

> **Version:** 1.0 | **Date:** 2026-09-26  
> **Companion Docs:** [HLD](./hld.md) | [LLD](./lld.md) | [Task](./Task.md) | [Task Planner](./task_planner.md)

---

## Table of Contents

1. [Minimum Hardware Requirements](#1-minimum-hardware-requirements)
2. [Operating System Support](#2-operating-system-support)
3. [Software Overview (All Modules)](#3-software-overview-all-modules)
4. [Installation — Core Prerequisites](#4-installation--core-prerequisites)
   - 4.1 [Git](#41-git)
   - 4.2 [Docker & Docker Compose](#42-docker--docker-compose)
   - 4.3 [Python 3.12](#43-python-312)
   - 4.4 [Node.js 20 LTS](#44-nodejs-20-lts)
   - 4.5 [Make](#45-make)
5. [Installation — Python Tooling](#5-installation--python-tooling)
   - 5.1 [pip & virtualenv](#51-pip--virtualenv)
   - 5.2 [Poetry (optional alternative)](#52-poetry-optional-alternative)
6. [Installation — Infrastructure (via Docker)](#6-installation--infrastructure-via-docker)
   - 6.1 [PostgreSQL 15 + TimescaleDB](#61-postgresql-15--timescaledb)
   - 6.2 [Redis 7](#62-redis-7)
   - 6.3 [Apache Kafka (KRaft)](#63-apache-kafka-kraft)
7. [Installation — Local CLI Tools (optional but recommended)](#7-installation--local-cli-tools-optional-but-recommended)
   - 7.1 [psql (PostgreSQL Client)](#71-psql-postgresql-client)
   - 7.2 [Redis CLI](#72-redis-cli)
   - 7.3 [Kafka CLI Tools](#73-kafka-cli-tools)
8. [Installation — Python Dependencies per Service](#8-installation--python-dependencies-per-service)
   - 8.1 [Ingestion API](#81-ingestion-api)
   - 8.2 [Rule Engine](#82-rule-engine)
   - 8.3 [Alert Processor](#83-alert-processor)
   - 8.4 [CSV Batch Ingestion](#84-csv-batch-ingestion)
   - 8.5 [Parts API Mock](#85-parts-api-mock)
   - 8.6 [Webhook Receiver](#86-webhook-receiver)
   - 8.7 [Dashboard API](#87-dashboard-api)
   - 8.8 [Scheduler](#88-scheduler)
9. [Installation — Frontend (React)](#9-installation--frontend-react)
10. [Installation — Testing Tools](#10-installation--testing-tools)
11. [Installation — Observability Stack (optional)](#11-installation--observability-stack-optional)
12. [Installation — Development Tools](#12-installation--development-tools)
13. [Environment Setup (`.env` file)](#13-environment-setup-env-file)
14. [Full Stack Startup (Quick Start)](#14-full-stack-startup-quick-start)
15. [Verification Checklist](#15-verification-checklist)

---

## 1. Minimum Hardware Requirements

| Resource | Minimum | Recommended |
|----------|---------|------------|
| **CPU** | 4 cores | 8 cores |
| **RAM** | 8 GB | 16 GB |
| **Disk Space** | 20 GB free | 40 GB free |
| **Network** | Internet access for pulling Docker images | |

> ⚠️ **Note:** Kafka + Postgres + Redis + all services running simultaneously are memory-intensive. 8 GB RAM minimum; 16 GB strongly recommended for smooth local development.

---

## 2. Operating System Support

| OS | Version | Support Level |
|----|---------|--------------|
| **macOS** | 13 Ventura+ | ✅ Fully supported |
| **Ubuntu/Debian Linux** | 22.04 LTS+ | ✅ Fully supported |
| **Windows** | 11 with WSL2 | ✅ Supported via WSL2 |
| **Windows** | 10/11 native | ⚠️ Docker Desktop required; some steps differ |

> 💡 **Windows users:** All shell commands assume WSL2 (Ubuntu). Install WSL2 first — see [Microsoft WSL2 guide](https://learn.microsoft.com/en-us/windows/wsl/install).

---

## 3. Software Overview (All Modules)

> **System scan run on:** 2026-09-26 | **Machine:** macOS (Apple)

| Status | Software | Installed Version | Required Version | Used By | Install Method |
|--------|----------|------------------|-----------------|---------|---------------|
| ✅ Installed | Git | 2.39.5 (Apple Git-154) | 2.40+ | All | — already available |
| ✅ Installed | Docker | 29.1.3 | 26.0+ | All services | — already available |
| ✅ Installed | Docker Compose | v2.40.3-desktop.1 | v2.24+ | All services | — already available |
| ✅ Installed | Python | 3.14.0 | 3.12+ | All backend services | — already available |
| ✅ Installed | pip | 25.2 | 24.0+ | All Python services | — already available |
| ✅ Installed | Node.js | v24.9.0 | 20 LTS+ | Frontend | — already available |
| ✅ Installed | npm | 11.6.0 | 10.0+ | Frontend | — already available |
| ✅ Installed | Make | GNU Make 3.81 | 3.8+ | Dev automation | — already available |
| ✅ Installed | Homebrew | 5.0.7 | any | macOS pkg manager | — already available |
| ❌ Missing | pyenv | — | recommended | Python version mgmt | `brew install pyenv` |
| ❌ Missing | nvm | — | recommended | Node version mgmt | see §4.4 |
| ❌ Missing | virtualenv | — | 20.0+ | All Python services | `pip3 install virtualenv` |
| ❌ Missing | Poetry | — | optional | Python dep mgmt | see §5.2 |
| ❌ Missing | psql (client) | — | 15+ | DB inspection | `brew install postgresql@15` |
| ❌ Missing | redis-cli | — | 7.0+ | Cache inspection | `brew install redis` |
| ❌ Missing | Alembic | — | 1.13+ | DB migrations | `pip3 install alembic` |
| ❌ Missing | pytest | — | 8.0+ | Testing | `pip3 install pytest` |
| ❌ Missing | ruff | — | 0.4+ | Linting/formatting | `pip3 install ruff` |
| ❌ Missing | uvicorn | — | 0.30+ | ASGI server | `pip3 install uvicorn` |
| ❌ Missing | FastAPI | — | 0.111+ | All API services | `pip3 install fastapi` |
| ❌ Missing | SQLAlchemy | — | 2.0+ | ORM | `pip3 install sqlalchemy[asyncio]` |
| ❌ Missing | asyncpg | — | 0.29+ | Async Postgres driver | `pip3 install asyncpg` |
| ❌ Missing | redis-py | — | 5.0+ | Redis async client | `pip3 install redis[asyncio]` |
| ❌ Missing | aiokafka | — | 0.10+ | Kafka async client | `pip3 install aiokafka` |
| ❌ Missing | pydantic | — | 2.7+ | Data validation | `pip3 install pydantic` |
| ❌ Missing | httpx | — | 0.27+ | HTTP client / tests | `pip3 install httpx` |
| ❌ Missing | python-jose | — | 3.3+ | JWT auth | `pip3 install python-jose[cryptography]` |
| ❌ Missing | APScheduler | — | 3.10+ | Scheduler service | `pip3 install apscheduler` |
| ❌ Missing | websockets | — | 12.0+ | WebSocket support | `pip3 install websockets` |
| ❌ Missing | PyYAML | — | 6.0+ | Rule config loader | `pip3 install pyyaml` |
| ❌ Missing | bcrypt | — | 4.0+ | API key hashing | `pip3 install bcrypt` |
| ❌ Missing | Vite | — | 5.0+ | Frontend build tool | `npm install -g vite` |
| ❌ Missing | React | — | 18+ | Frontend UI | `npm install react react-dom` |
| ℹ️ Via Docker | PostgreSQL 15 + TimescaleDB | — | — | Time-series DB | Docker image |
| ℹ️ Via Docker | Redis 7 | — | — | Cache / queue | Docker image |
| ℹ️ Via Docker | Apache Kafka (KRaft) | — | — | Message queue | Docker image |
| ❓ Unknown | VS Code | — | recommended | IDE | see §12 |

### Summary
| Category | Count |
|----------|-------|
| ✅ Already installed | 9 |
| ❌ Needs installation | 23 |
| ℹ️ Runs via Docker (no local install needed) | 3 |

> **Good news:** The 3 heaviest components — PostgreSQL, Redis, and Kafka — run entirely in Docker. You already have Docker installed, so these are ready to go.  
> **Main gap:** Python packages (pip install) and a few CLI tools (psql, redis-cli) need to be installed.

---

## 4. Installation — Core Prerequisites

### 4.1 Git

**macOS:**
```bash
# Check if already installed
git --version

# Install via Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install git

# Verify
git --version
# Expected: git version 2.x.x
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install -y git

# Verify
git --version
```

**Configure Git (all platforms):**
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

---

### 4.2 Docker & Docker Compose

> Docker Compose v2 is required (bundled with Docker Desktop and modern Docker Engine). **Do NOT use the legacy `docker-compose` (v1)** — use `docker compose` (v2).

**macOS:**
```bash
# 1. Download Docker Desktop for Mac
#    https://www.docker.com/products/docker-desktop/
#    Choose Apple Silicon (M1/M2/M3) or Intel depending on your Mac

# 2. Install the downloaded .dmg file

# 3. Start Docker Desktop from Applications

# 4. Verify
docker --version
# Expected: Docker version 26.x.x

docker compose version
# Expected: Docker Compose version v2.x.x

# 5. (Optional) Increase Docker memory to 8+ GB:
#    Docker Desktop → Settings → Resources → Memory → 8 GB
```

**Ubuntu/Debian:**
```bash
# 1. Remove old versions
sudo apt remove docker docker-engine docker.io containerd runc

# 2. Install dependencies
sudo apt update
sudo apt install -y ca-certificates curl gnupg lsb-release

# 3. Add Docker's official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
    sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# 4. Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
    https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 5. Install Docker Engine + Compose plugin
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io \
    docker-buildx-plugin docker-compose-plugin

# 6. Add current user to docker group (no sudo needed)
sudo usermod -aG docker $USER
newgrp docker

# 7. Start Docker service
sudo systemctl enable docker
sudo systemctl start docker

# 8. Verify
docker --version
docker compose version
```

**Windows (WSL2):**
```powershell
# 1. Install Docker Desktop for Windows:
#    https://www.docker.com/products/docker-desktop/

# 2. During install: enable WSL2 backend (not Hyper-V)

# 3. Open Docker Desktop → Settings → Resources → WSL Integration
#    Enable for your WSL2 distro (e.g., Ubuntu)

# 4. Inside WSL2 terminal, verify:
docker --version
docker compose version
```

---

### 4.3 Python 3.12

> We recommend using **pyenv** to manage Python versions cleanly.

**macOS (via pyenv):**
```bash
# 1. Install pyenv
brew install pyenv

# 2. Add pyenv to shell (add to ~/.zshrc or ~/.bash_profile)
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(pyenv init -)"' >> ~/.zshrc
source ~/.zshrc

# 3. Install Python 3.12
pyenv install 3.12.4

# 4. Set as global default
pyenv global 3.12.4

# 5. Verify
python --version
# Expected: Python 3.12.4

python -m pip --version
# Expected: pip 24.x.x
```

**Ubuntu/Debian (via pyenv):**
```bash
# 1. Install build dependencies
sudo apt update
sudo apt install -y make build-essential libssl-dev zlib1g-dev \
    libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm \
    libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev \
    libffi-dev liblzma-dev

# 2. Install pyenv
curl https://pyenv.run | bash

# 3. Add to ~/.bashrc
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(pyenv init -)"' >> ~/.bashrc
source ~/.bashrc

# 4. Install Python 3.12
pyenv install 3.12.4
pyenv global 3.12.4

# 5. Verify
python --version
python -m pip --version
```

---

### 4.4 Node.js 20 LTS

> We recommend **nvm** (Node Version Manager) for clean version management.

**macOS:**
```bash
# 1. Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# 2. Reload shell
source ~/.zshrc   # or ~/.bashrc

# 3. Install Node.js 20 LTS
nvm install 20
nvm use 20
nvm alias default 20

# 4. Verify
node --version
# Expected: v20.x.x

npm --version
# Expected: 10.x.x
```

**Ubuntu/Debian:**
```bash
# 1. Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc

# 2. Install Node.js 20 LTS
nvm install 20
nvm use 20
nvm alias default 20

# 3. Verify
node --version
npm --version
```

---

### 4.5 Make

**macOS:**
```bash
# Usually pre-installed with Xcode Command Line Tools
make --version

# If not installed:
xcode-select --install
# Or:
brew install make
```

**Ubuntu/Debian:**
```bash
sudo apt install -y make

# Verify
make --version
```

---

## 5. Installation — Python Tooling

### 5.1 pip & virtualenv

```bash
# Upgrade pip to latest
python -m pip install --upgrade pip

# Install virtualenv
pip install virtualenv

# Verify
virtualenv --version
```

#### Creating a virtual environment per service:
```bash
# Navigate to a service directory
cd services/ingestion_api/

# Create venv
python -m venv .venv

# Activate
source .venv/bin/activate        # macOS / Linux
# .venv\Scripts\activate.bat     # Windows CMD
# .venv\Scripts\Activate.ps1     # Windows PowerShell

# Deactivate when done
deactivate
```

---

### 5.2 Poetry (optional alternative)

> Poetry provides dependency locking and project management. Use instead of pip+virtualenv if preferred.

```bash
# Install Poetry
curl -sSL https://install.python-poetry.org | python3 -

# Add to PATH (add to ~/.zshrc or ~/.bashrc)
export PATH="$HOME/.local/bin:$PATH"
source ~/.zshrc

# Verify
poetry --version
# Expected: Poetry (version 1.8.x)

# Usage in a service directory:
cd services/ingestion_api/
poetry install          # installs from pyproject.toml
poetry shell            # activates the virtualenv
```

---

## 6. Installation — Infrastructure (via Docker)

> All infrastructure services (Postgres, Redis, Kafka) run inside Docker containers. You do **not** need to install them natively. The `docker-compose.yml` handles everything.

### 6.1 PostgreSQL 15 + TimescaleDB

```bash
# Pulled automatically by docker compose up
# Image: timescale/timescaledb:latest-pg15

# To manually pull the image ahead of time:
docker pull timescale/timescaledb:latest-pg15

# Verify image pulled
docker images | grep timescaledb
```

**To inspect the database (once running):**
```bash
# Connect via docker exec
docker exec -it fleet-postgres psql -U fleet -d fleet_db

# Or using local psql client (see §7.1)
psql postgresql://fleet:secret@localhost:5432/fleet_db
```

---

### 6.2 Redis 7

```bash
# Pulled automatically by docker compose up
# Image: redis:7-alpine

# To manually pull:
docker pull redis:7-alpine

# Verify
docker images | grep redis
```

**To inspect Redis (once running):**
```bash
# Connect via docker exec
docker exec -it fleet-redis redis-cli

# Or using local redis-cli (see §7.2)
redis-cli -h localhost -p 6379
```

---

### 6.3 Apache Kafka (KRaft)

```bash
# Pulled automatically by docker compose up
# Image: confluentinc/cp-kafka:7.6.0 (KRaft mode — no Zookeeper)

# To manually pull:
docker pull confluentinc/cp-kafka:7.6.0

# Verify
docker images | grep cp-kafka
```

**To inspect Kafka topics (once running):**
```bash
# List topics via docker exec
docker exec -it fleet-kafka \
    kafka-topics --bootstrap-server localhost:9092 --list
```

---

## 7. Installation — Local CLI Tools (optional but recommended)

> These tools are optional but useful for debugging and inspecting data during development.

### 7.1 psql (PostgreSQL Client)

**macOS:**
```bash
brew install postgresql@15

# Add to PATH
echo 'export PATH="/opt/homebrew/opt/postgresql@15/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Verify
psql --version
# Expected: psql (PostgreSQL) 15.x
```

**Ubuntu/Debian:**
```bash
sudo apt install -y postgresql-client-15

# Verify
psql --version
```

**Connect to running container:**
```bash
psql postgresql://fleet:secret@localhost:5432/fleet_db
```

---

### 7.2 Redis CLI

**macOS:**
```bash
brew install redis

# Verify (redis-cli only — server NOT needed locally, it runs in Docker)
redis-cli --version
# Expected: redis-cli 7.x.x
```

**Ubuntu/Debian:**
```bash
sudo apt install -y redis-tools

# Verify
redis-cli --version
```

**Connect to running container:**
```bash
redis-cli -h 127.0.0.1 -p 6379
```

**Useful Redis commands for debugging:**
```bash
# See all dedup keys
redis-cli -h 127.0.0.1 -p 6379 KEYS "dedup:*"

# See alert fingerprints
redis-cli -h 127.0.0.1 -p 6379 KEYS "alert:fingerprint:*"

# Check retry queue
redis-cli -h 127.0.0.1 -p 6379 ZRANGE "retry:parts_requests" 0 -1 WITHSCORES
```

---

### 7.3 Kafka CLI Tools

Kafka CLI is bundled inside the running Kafka container. No local install needed.

```bash
# List topics
docker exec -it fleet-kafka \
    kafka-topics --bootstrap-server localhost:9092 --list

# Consume messages from telemetry.raw (from beginning)
docker exec -it fleet-kafka \
    kafka-console-consumer \
    --bootstrap-server localhost:9092 \
    --topic telemetry.raw \
    --from-beginning

# Produce a test message manually
docker exec -it fleet-kafka \
    kafka-console-producer \
    --bootstrap-server localhost:9092 \
    --topic telemetry.raw

# Describe consumer group lag
docker exec -it fleet-kafka \
    kafka-consumer-groups \
    --bootstrap-server localhost:9092 \
    --describe --group fleet-maintenance
```

---

## 8. Installation — Python Dependencies per Service

> Each service has its own `requirements.txt`. Install into a per-service virtual environment.

---

### 8.1 Ingestion API

**`services/ingestion_api/requirements.txt`:**
```text
fastapi==0.111.0
uvicorn[standard]==0.30.1
pydantic==2.7.1
pydantic-settings==2.2.1
aiokafka==0.10.0
redis[asyncio]==5.0.4
python-jose[cryptography]==3.3.0
python-json-logger==2.0.7
httpx==0.27.0
pytest==8.2.0
pytest-asyncio==0.23.7
respx==0.21.1
```

**Install:**
```bash
cd services/ingestion_api/
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Verify FastAPI installed
python -c "import fastapi; print(fastapi.__version__)"
```

---

### 8.2 Rule Engine

**`services/rule_engine/requirements.txt`:**
```text
aiokafka==0.10.0
redis[asyncio]==5.0.4
pydantic==2.7.1
pydantic-settings==2.2.1
pyyaml==6.0.1
python-json-logger==2.0.7
pytest==8.2.0
pytest-asyncio==0.23.7
```

**Install:**
```bash
cd services/rule_engine/
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Verify PyYAML
python -c "import yaml; print(yaml.__version__)"
```

---

### 8.3 Alert Processor

**`services/alert_processor/requirements.txt`:**
```text
fastapi==0.111.0
aiokafka==0.10.0
sqlalchemy[asyncio]==2.0.30
asyncpg==0.29.0
redis[asyncio]==5.0.4
httpx==0.27.0
pydantic==2.7.1
pydantic-settings==2.2.1
python-json-logger==2.0.7
pytest==8.2.0
pytest-asyncio==0.23.7
respx==0.21.1
```

**Install:**
```bash
cd services/alert_processor/
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Verify SQLAlchemy
python -c "import sqlalchemy; print(sqlalchemy.__version__)"
```

---

### 8.4 CSV Batch Ingestion

**`services/csv_ingestion/requirements.txt`:**
```text
aiokafka==0.10.0
redis[asyncio]==5.0.4
pydantic==2.7.1
pydantic-settings==2.2.1
python-json-logger==2.0.7
pytest==8.2.0
```

**Install:**
```bash
cd services/csv_ingestion/
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

---

### 8.5 Parts API Mock

**`services/parts_api_mock/requirements.txt`:**
```text
fastapi==0.111.0
uvicorn[standard]==0.30.1
pydantic==2.7.1
pydantic-settings==2.2.1
pytest==8.2.0
pytest-asyncio==0.23.7
httpx==0.27.0
```

**Install:**
```bash
cd services/parts_api_mock/
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

---

### 8.6 Webhook Receiver

**`services/webhook_receiver/requirements.txt`:**
```text
fastapi==0.111.0
uvicorn[standard]==0.30.1
sqlalchemy[asyncio]==2.0.30
asyncpg==0.29.0
redis[asyncio]==5.0.4
pydantic==2.7.1
pydantic-settings==2.2.1
python-json-logger==2.0.7
pytest==8.2.0
pytest-asyncio==0.23.7
httpx==0.27.0
```

**Install:**
```bash
cd services/webhook_receiver/
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

---

### 8.7 Dashboard API

**`services/dashboard_api/requirements.txt`:**
```text
fastapi==0.111.0
uvicorn[standard]==0.30.1
sqlalchemy[asyncio]==2.0.30
asyncpg==0.29.0
redis[asyncio]==5.0.4
aiokafka==0.10.0
python-jose[cryptography]==3.3.0
pydantic==2.7.1
pydantic-settings==2.2.1
python-json-logger==2.0.7
websockets==12.0
pytest==8.2.0
pytest-asyncio==0.23.7
httpx==0.27.0
```

**Install:**
```bash
cd services/dashboard_api/
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

---

### 8.8 Scheduler

**`services/scheduler/requirements.txt`:**
```text
apscheduler==3.10.4
redis[asyncio]==5.0.4
httpx==0.27.0
pydantic-settings==2.2.1
python-json-logger==2.0.7
pytest==8.2.0
```

**Install:**
```bash
cd services/scheduler/
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Verify APScheduler
python -c "import apscheduler; print(apscheduler.__version__)"
```

---

### Shared Library Install

```bash
# Install shared utilities in editable mode into each service venv
cd services/ingestion_api/
source .venv/bin/activate
pip install -e ../../shared/

# Repeat for each service that depends on shared/
```

---

### Database Migration Tools (Alembic)

```bash
cd shared/
python -m venv .venv
source .venv/bin/activate
pip install alembic==1.13.1 asyncpg==0.29.0 sqlalchemy[asyncio]==2.0.30

# Verify
alembic --version
# Expected: alembic 1.13.1

# Run migrations (with Postgres running in Docker)
cd shared/db/migrations/
alembic upgrade head
```

---

## 9. Installation — Frontend (React)

```bash
# Navigate to frontend directory
cd frontend/

# Install all npm dependencies
npm install

# Verify key packages installed
npm list react react-dom vite
# Expected: react@18.x.x, react-dom@18.x.x, vite@5.x.x

# Start development server
npm run dev
# Expected: Local: http://localhost:5173/
```

**Required packages (auto-installed from `package.json`):**

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^18.3.0 | UI framework |
| `react-dom` | ^18.3.0 | DOM rendering |
| `vite` | ^5.2.0 | Build tool / dev server |
| `@vitejs/plugin-react` | ^4.3.0 | React plugin for Vite |
| `zustand` | ^4.5.0 | State management |
| `axios` | ^1.7.0 | HTTP client |

**Initialize new React project (if `frontend/` doesn't exist yet):**
```bash
npm create vite@latest frontend -- --template react
cd frontend/
npm install
npm install zustand axios
```

---

## 10. Installation — Testing Tools

### Python Testing Stack

```bash
# Install in each service's venv — already included in requirements.txt above
# For running acceptance/integration tests, install into a shared test venv:

python -m venv .venv-test
source .venv-test/bin/activate

pip install \
    pytest==8.2.0 \
    pytest-asyncio==0.23.7 \
    pytest-docker==3.1.1 \
    httpx==0.27.0 \
    respx==0.21.1 \
    pytest-cov==5.0.0

# Verify
pytest --version
# Expected: pytest 8.2.x
```

### Run Unit Tests

```bash
# Run all unit tests across all services
cd services/rule_engine/
source .venv/bin/activate
pytest tests/ -v

# With coverage report
pytest tests/ -v --cov=app --cov-report=term-missing
```

### Run Acceptance Tests

```bash
# Ensure full docker compose stack is running first
docker compose up -d

# Run acceptance tests
source .venv-test/bin/activate
pytest tests/acceptance/ -v

# Or via Makefile
make test-acceptance
```

### Frontend Tests (optional)

```bash
cd frontend/
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom

# Run tests
npm test
```

---

## 11. Installation — Observability Stack (optional)

> Prometheus + Grafana for metrics visualization. Only needed if you want full observability locally.

**Add to `docker-compose.yml`:**
```bash
# Pull images manually ahead of time
docker pull prom/prometheus:latest
docker pull grafana/grafana:latest
docker pull grafana/loki:latest
```

**Or start observability profile separately:**
```bash
docker compose --profile observability up -d
```

**Access:**

| Tool | URL | Default Login |
|------|-----|--------------|
| Grafana | http://localhost:3001 | admin / admin |
| Prometheus | http://localhost:9090 | — |

---

## 12. Installation — Development Tools

> Recommended tools to improve development experience.

### VS Code

```bash
# Download: https://code.visualstudio.com/

# macOS (via Homebrew)
brew install --cask visual-studio-code
```

**Recommended VS Code Extensions:**

```bash
# Install via VS Code Extensions panel or CLI:
code --install-extension ms-python.python
code --install-extension ms-python.pylance
code --install-extension charliermarsh.ruff          # Python linting
code --install-extension esbenp.prettier-vscode      # JS/CSS formatting
code --install-extension dbaeumer.vscode-eslint      # JS linting
code --install-extension ms-azuretools.vscode-docker # Docker management
code --install-extension bradlc.vscode-tailwindcss   # (optional)
code --install-extension yzhang.markdown-all-in-one  # Markdown editing
code --install-extension humao.rest-client           # Test REST APIs inline
```

---

### Postman (API Testing)

```bash
# Download: https://www.postman.com/downloads/

# macOS (via Homebrew)
brew install --cask postman
```

**Import the API collection:**
- After setup, import `docs/postman_collection.json` (to be created)
- Pre-configured requests for all `ingestion_api` and `dashboard_api` endpoints

---

### Python Linting & Formatting

```bash
# Install ruff (fast Python linter + formatter)
pip install ruff==0.4.4

# Verify
ruff --version

# Lint a service
cd services/ingestion_api/
ruff check app/

# Format a service
ruff format app/
```

---

## 13. Environment Setup (`.env` file)

```bash
# 1. Copy the example file
cp .env.example .env

# 2. Edit with your values (defaults work for local development)
nano .env     # or use VS Code: code .env
```

**`.env.example` contents (copy this):**
```dotenv
# ─── Database ───────────────────────────────────────────
DATABASE_URL=postgresql+asyncpg://fleet:secret@localhost:5432/fleet_db
POSTGRES_USER=fleet
POSTGRES_PASSWORD=secret
POSTGRES_DB=fleet_db

# ─── Kafka ──────────────────────────────────────────────
KAFKA_BOOTSTRAP_SERVERS=localhost:9092
KAFKA_CONSUMER_GROUP_ID=fleet-maintenance

# ─── Redis ──────────────────────────────────────────────
REDIS_URL=redis://localhost:6379/0

# ─── Security ───────────────────────────────────────────
# Generate with: python -c "import secrets; print(secrets.token_hex(32))"
API_KEY_HASH=changeme-replace-with-bcrypt-hash
JWT_SECRET=changeme-replace-with-32-char-random-string
WEBHOOK_HMAC_SECRET=changeme-replace-with-32-char-random-string

# ─── Services ───────────────────────────────────────────
PARTS_API_BASE_URL=http://localhost:8004
PARTS_API_MODE=normal

# ─── App Config ─────────────────────────────────────────
APP_ENV=development
LOG_LEVEL=INFO
MAX_BATCH_SIZE=100
TELEMETRY_DEDUP_TTL_HOURS=24
ALERT_FINGERPRINT_TTL_DAYS=30
PARTS_API_MAX_RETRIES=5
CSV_INGEST_INTERVAL_MINUTES=5
CSV_INCOMING_DIR=./data/incoming
WS_HEARTBEAT_INTERVAL_SECONDS=30
CACHE_FLEET_HEALTH_TTL_SECONDS=10

# ─── Frontend ───────────────────────────────────────────
VITE_API_BASE_URL=http://localhost:8002
VITE_WS_BASE_URL=ws://localhost:8002
```

**Generate secure secrets:**
```bash
# Generate JWT_SECRET
python -c "import secrets; print(secrets.token_hex(32))"

# Generate WEBHOOK_HMAC_SECRET
python -c "import secrets; print(secrets.token_hex(32))"

# Generate API key and its bcrypt hash
python -c "
import secrets, bcrypt
key = secrets.token_hex(32)
hashed = bcrypt.hashpw(key.encode(), bcrypt.gensalt()).decode()
print(f'API Key (share with vehicle agent): {key}')
print(f'API_KEY_HASH (put in .env): {hashed}')
"
# pip install bcrypt if needed: pip install bcrypt
```

---

## 14. Full Stack Startup (Quick Start)

Once all prerequisites are installed:

```bash
# 1. Clone the repository
git clone <repo-url>
cd fleet-maintenance-engine

# 2. Copy and configure environment
cp .env.example .env
# Edit .env if needed (defaults work for local dev)

# 3. Start all services
make up
# Or: docker compose up -d --build

# 4. Wait for all services to be healthy (~60 seconds)
docker compose ps
# All services should show: running (healthy)

# 5. Run database migrations
make migrate
# Or: docker exec fleet-ingestion-api alembic upgrade head

# 6. Ingest sample data
make seed
# Or: docker compose run --rm csv-ingestion python main.py --file /data/service_records.csv

# 7. Open the dashboard
open http://localhost:3000        # macOS
xdg-open http://localhost:3000   # Linux

# 8. Run acceptance tests
make test-acceptance

# 9. View all service logs
make logs
# Or: docker compose logs -f

# 10. Stop everything
make down
# Or: docker compose down -v
```

**`Makefile` targets:**

```makefile
up:             ## Start all services
	docker compose up -d --build

down:           ## Stop all services
	docker compose down -v

logs:           ## Tail all service logs
	docker compose logs -f

migrate:        ## Run database migrations
	docker exec fleet-dashboard-api alembic upgrade head

seed:           ## Load sample CSV data
	docker compose run --rm csv-ingestion python main.py --file /data/service_records.csv

test:           ## Run all unit tests
	pytest services/*/tests/ -v

test-acceptance:  ## Run acceptance tests (requires running stack)
	pytest tests/acceptance/ -v

lint:           ## Lint all Python code
	ruff check services/ shared/

format:         ## Format all Python code
	ruff format services/ shared/

ps:             ## Show running containers
	docker compose ps

clean:          ## Remove all containers, volumes, and images
	docker compose down -v --rmi local
```

---

## 15. Verification Checklist

Run through this checklist after setup to confirm everything is working:

```
Infrastructure:
  [ ] docker compose ps → all containers show "running (healthy)"
  [ ] psql connects to fleet_db → tables exist (SELECT * FROM vehicles LIMIT 1)
  [ ] redis-cli PING → PONG
  [ ] kafka-topics --list → shows telemetry.raw, service.records, alerts.notifications

Backend Services:
  [ ] GET http://localhost:8001/health → 200 {"status":"ok"}  (ingestion-api)
  [ ] GET http://localhost:8002/fleet/health → 200 JSON        (dashboard-api)
  [ ] GET http://localhost:8004/parts/available?codes=P001 → 200 (parts-api-mock)
  [ ] POST http://localhost:8003/webhooks/service-status → 401 (missing sig = correct)

Ingestion:
  [ ] POST http://localhost:8001/telemetry with valid payload → 202
  [ ] POST same payload again → 200 (deduplicated)

Rule Engine & Alerts:
  [ ] Send 3 overheating events → alert appears in GET /alerts

Dashboard:
  [ ] http://localhost:3000 → React dashboard loads
  [ ] WebSocket connects (green "Live" dot visible)
  [ ] New alert appears without page refresh

Acceptance Tests:
  [ ] make test-acceptance → all 3 tests PASS
```

---

## Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| `docker compose up` fails | Port already in use | `lsof -i :5432` → kill conflicting process |
| Kafka container exits | Not enough memory | Increase Docker memory to 8 GB |
| `psql: connection refused` | Postgres not healthy yet | Wait 30s; `docker compose ps` |
| `ModuleNotFoundError` | Wrong venv activated | `source .venv/bin/activate` |
| `alembic: command not found` | Alembic not in PATH | Activate venv first |
| Frontend blank page | `VITE_API_BASE_URL` wrong | Check `.env` and restart `npm run dev` |
| Acceptance tests fail | Stack not fully started | Wait 60s after `make up`; check `docker compose ps` |

---

*System Requirements v1.0 — Automotive Fleet Health & Predictive Maintenance Engine*  
*See also: [HLD](./hld.md) | [LLD](./lld.md) | [Task Planner](./task_planner.md)*
