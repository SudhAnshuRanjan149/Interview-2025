# 🚀 UV — Python Environment Setup Guide

> **uv** is an extremely fast Python package and project manager, written in Rust.
> It replaces `pip`, `pip-tools`, `pipx`, `poetry`, `pyenv`, `virtualenv`, and more.
> Developed by [Astral](https://astral.sh) — the team behind `ruff`.

---

## 📋 Table of Contents

1. [What is uv?](#what-is-uv)
2. [Installation](#installation)
   - [macOS](#macos)
   - [Linux](#linux)
   - [Windows](#windows)
3. [Creating a Virtual Environment](#creating-a-virtual-environment)
4. [Managing Python Versions](#managing-python-versions)
5. [Working with Projects](#working-with-projects)
6. [Installing Packages](#installing-packages)
7. [Running Scripts](#running-scripts)
8. [Common Commands Reference](#common-commands-reference)
9. [Migrating from pip / venv](#migrating-from-pip--venv)

---

## What is uv?

`uv` is a single binary that handles:
- Python version management (like `pyenv`)
- Virtual environment creation (like `venv` / `virtualenv`)
- Package installation (like `pip`)
- Dependency locking (like `pip-tools`)
- Project management (like `poetry`)

**Speed**: uv is 10–100x faster than pip.

---

## Installation

### macOS

#### Option 1 — Official Installer (Recommended)

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

After installation, restart your terminal or run:

```bash
source ~/.zshrc      # for zsh (default on macOS)
source ~/.bashrc     # for bash
```

Verify installation:

```bash
uv --version
```

#### Option 2 — Homebrew

```bash
brew install uv
```

#### Option 3 — pip3

```bash
pip3 install uv
```

> **Note**: `pip3` installs uv into your Python's site-packages.
> If you prefer isolation for CLI tools, install `pipx` first (`pip3 install pipx`) then run `pipx install uv`.

---

### Linux

#### Option 1 — Official Installer (Recommended)

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

After installation, add uv to your PATH:

```bash
source ~/.bashrc     # for bash
source ~/.zshrc      # for zsh
```

Or add manually to `~/.bashrc` / `~/.zshrc`:

```bash
export PATH="$HOME/.cargo/bin:$PATH"
```

Verify installation:

```bash
uv --version
```

#### Option 2 — pip3

```bash
pip3 install uv
```

> **Note**: `pip3` is available by default on most Linux distros with Python 3 installed.
> If you want CLI isolation, first install pipx via `pip3 install pipx`, then run `pipx install uv`.

#### Option 3 — Download Binary Directly

```bash
# For x86_64 Linux
curl -LO https://github.com/astral-sh/uv/releases/latest/download/uv-x86_64-unknown-linux-musl.tar.gz
tar -xzf uv-x86_64-unknown-linux-musl.tar.gz
sudo mv uv /usr/local/bin/
sudo mv uvx /usr/local/bin/
```

---

### Windows

#### Option 1 — PowerShell Installer (Recommended)

Open **PowerShell** (as regular user, not Admin) and run:

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

After installation, restart PowerShell or reload the profile:

```powershell
. $PROFILE
```

Verify installation:

```powershell
uv --version
```

#### Option 2 — Scoop

```powershell
scoop install main/uv
```

#### Option 3 — Winget

```powershell
winget install --id=astral-sh.uv -e
```

#### Option 4 — pip

```powershell
pip install uv
```

> **Note**: On Windows, uv is installed to `%USERPROFILE%\.local\bin`. Make sure this is in your `PATH`.
> To add it: `System Properties → Environment Variables → Path → Edit → New → %USERPROFILE%\.local\bin`

---

## Creating a Virtual Environment

### Basic Virtual Environment

```bash
# Create a .venv directory in the current folder
uv venv

# Activate the environment
# macOS / Linux:
source .venv/bin/activate

# Windows (PowerShell):
.venv\Scripts\Activate.ps1

# Windows (Command Prompt):
.venv\Scripts\activate.bat
```

### With a Custom Name

```bash
uv venv my-env

# Activate:
source my-env/bin/activate        # macOS / Linux
my-env\Scripts\Activate.ps1       # Windows PowerShell
```

### With a Specific Python Version

```bash
# uv will auto-download the requested Python version if not present
uv venv --python 3.11
uv venv --python 3.12
uv venv --python 3.10.14         # exact version

# With a custom name and specific Python
uv venv my-env --python 3.11
```

### With System Python

```bash
# Use the Python already installed on your system
uv venv --python python3.11
```

### Deactivating the Environment

```bash
deactivate     # works on all platforms (macOS, Linux, Windows)
```

---

## Managing Python Versions

uv can download and manage Python versions automatically.

```bash
# Install a specific Python version
uv python install 3.12
uv python install 3.11
uv python install 3.10 3.11 3.12   # install multiple

# List available Python versions (installable)
uv python list

# List installed Python versions
uv python list --only-installed

# Set the default Python version for a project
uv python pin 3.12    # creates a .python-version file

# Find where a Python version is installed
uv python find 3.12
```

---

## Working with Projects

uv has a full project management system similar to poetry.

### Initialize a New Project

```bash
# Create a new project in the current directory
uv init

# Create a new project in a new directory
uv init my-project
cd my-project
```

This creates:
```
my-project/
├── pyproject.toml      # project config & dependencies
├── README.md
├── .python-version     # pinned Python version
└── src/
    └── my_project/
        └── __init__.py
```

### Add Dependencies

```bash
# Add a package to the project
uv add requests
uv add numpy pandas matplotlib

# Add a dev dependency
uv add --dev pytest ruff black

# Add with version constraint
uv add "fastapi>=0.100"
uv add "django~=4.2"
```

### Remove Dependencies

```bash
uv remove requests
uv remove --dev pytest
```

### Install All Dependencies (from pyproject.toml)

```bash
uv sync
```

### Lock Dependencies

```bash
# Generate/update uv.lock file
uv lock
```

---

## Installing Packages

### In an Active Virtual Environment

```bash
# Activate venv first, then:
uv pip install requests
uv pip install numpy pandas scipy
uv pip install "fastapi[all]"

# Install from requirements.txt
uv pip install -r requirements.txt

# Install current project in editable mode
uv pip install -e .
```

### Without Activating (using --project or inline)

```bash
# Install directly into the venv
uv pip install --python .venv/bin/python requests
```

### Generate requirements.txt

```bash
uv pip freeze > requirements.txt

# Or compile from pyproject.toml
uv pip compile pyproject.toml -o requirements.txt
```

### Listing Installed Packages

```bash
uv pip list
uv pip show requests      # details of a specific package
```

### Uninstalling Packages

```bash
uv pip uninstall requests
```

---

## Running Scripts

### Run a Script in the venv Context

```bash
# Run a Python script using the venv's Python
uv run python script.py
uv run python -m pytest
uv run python -c "import sys; print(sys.version)"
```

### Run with Inline Dependencies (no venv needed!)

```bash
# uv automatically creates an isolated env for the script
uv run --with requests python -c "import requests; print(requests.get('https://httpbin.org/get').status_code)"
```

### Run Tools Globally (like pipx)

```bash
# Run a tool without installing it permanently
uvx ruff check .
uvx black .
uvx mypy .

# Install a tool globally (persists)
uv tool install ruff
uv tool install black
uv tool list
```

---

## Common Commands Reference

### Quick Reference Table

| Task | Command |
|------|---------|
| Install uv (macOS/Linux) | `curl -LsSf https://astral.sh/uv/install.sh \| sh` |
| Install uv (Windows) | `irm https://astral.sh/uv/install.ps1 \| iex` |
| Check uv version | `uv --version` |
| Create venv | `uv venv` |
| Create venv with Python version | `uv venv --python 3.12` |
| Activate venv (macOS/Linux) | `source .venv/bin/activate` |
| Activate venv (Windows PS) | `.venv\Scripts\Activate.ps1` |
| Deactivate venv | `deactivate` |
| Install a package | `uv pip install <package>` |
| Install from requirements.txt | `uv pip install -r requirements.txt` |
| List installed packages | `uv pip list` |
| Uninstall a package | `uv pip uninstall <package>` |
| Install Python version | `uv python install 3.12` |
| List Python versions | `uv python list` |
| Initialize a project | `uv init` |
| Add dependency | `uv add <package>` |
| Remove dependency | `uv remove <package>` |
| Sync dependencies | `uv sync` |
| Run script in venv | `uv run python script.py` |
| Update uv itself | `uv self update` |

---

## Migrating from pip / venv

### Old Way (pip + venv)

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
pip install requests pandas
pip freeze > requirements.txt
```

### New Way (uv)

```bash
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
uv pip install requests pandas
uv pip freeze > requirements.txt
```

### Full Project Migration

```bash
# 1. Create venv
uv venv --python 3.12

# 2. Activate
source .venv/bin/activate   # macOS/Linux
.venv\Scripts\Activate.ps1  # Windows

# 3. Install existing dependencies
uv pip install -r requirements.txt

# 4. Going forward — use uv init for new projects
uv init
uv add requests pandas
uv sync
```

---

## Platform-Specific Notes

### macOS
- Default shell is `zsh` → profile file is `~/.zshrc`
- uv binary installed to `~/.cargo/bin/uv` (via curl installer) or `/opt/homebrew/bin/uv` (via Homebrew)
- For Apple Silicon (M1/M2/M3), uv is natively compiled for `arm64`

### Linux
- uv supports `x86_64` and `aarch64` (ARM)
- Profile file is `~/.bashrc` (bash) or `~/.zshrc` (zsh)
- On Ubuntu/Debian, no `sudo` needed for user-level install
- CI/CD: use the curl installer in GitHub Actions, GitLab CI, etc.

### Windows
- Use PowerShell 5.1+ or PowerShell 7+
- If script execution is blocked, run: `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`
- Activate script: `.venv\Scripts\Activate.ps1` (PowerShell) or `.venv\Scripts\activate.bat` (CMD)
- WSL2 (Windows Subsystem for Linux): use the Linux instructions above

---

## GitHub Actions Example

```yaml
- name: Install uv
  uses: astral-sh/setup-uv@v3

- name: Set up Python
  run: uv python install 3.12

- name: Install dependencies
  run: uv sync --all-extras --dev

- name: Run tests
  run: uv run pytest
```

---

*Reference: [uv documentation](https://docs.astral.sh/uv/) | Last Updated: July 2026*
