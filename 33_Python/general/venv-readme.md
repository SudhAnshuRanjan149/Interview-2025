# 🐍 Python Virtual Environments (venv) — Complete Notes

> A **virtual environment** is an isolated Python environment that lets you install packages
> for a specific project without affecting your system-wide Python installation or other projects.

---

## 📋 Table of Contents

1. [What is a Virtual Environment?](#what-is-a-virtual-environment)
2. [Why Use a Virtual Environment?](#why-use-a-virtual-environment)
3. [How it Works](#how-it-works)
4. [Setup & Usage](#setup--usage)
   - [macOS](#macos)
   - [Linux](#linux)
   - [Windows](#windows)
5. [Common Workflow](#common-workflow)
6. [Managing Packages Inside venv](#managing-packages-inside-venv)
7. [requirements.txt](#requirementstxt)
8. [Virtual Environment Tools Comparison](#virtual-environment-tools-comparison)
9. [Common Issues & Fixes](#common-issues--fixes)
10. [Best Practices](#best-practices)

---

## What is a Virtual Environment?

A **virtual environment** (venv) is a **self-contained directory** that holds:
- A copy of (or symlink to) the Python interpreter
- Its own `pip` and `setuptools`
- Its own isolated `site-packages` folder for installed libraries

Think of it like a **clean room** for each Python project — what you install in one project stays in that project only.

### Without venv (problem):
```
System Python 3.14
└── site-packages/
    ├── requests==2.28   ← Project A needs this
    ├── requests==2.31   ← Project B needs this ← CONFLICT!
    ├── numpy==1.24
    └── django==3.2
```

### With venv (solution):
```
project-a/
└── .venv/
    └── site-packages/
        └── requests==2.28   ✅ Isolated

project-b/
└── .venv/
    └── site-packages/
        └── requests==2.31   ✅ Isolated
```

---

## Why Use a Virtual Environment?

| Problem | Solution with venv |
|---------|-------------------|
| Conflicting package versions across projects | Each project has its own isolated packages |
| System Python gets polluted with packages | Packages install only inside the venv |
| "Works on my machine" issues | `requirements.txt` captures exact versions |
| Need different Python versions per project | Each venv can use a different Python |
| Accidentally break system tools | System Python stays untouched |
| Deploying to production | Ship only what the project actually needs |

### Real-World Example
```
Project A — Django web app → needs Django 3.2, requests 2.28
Project B — Data Science   → needs numpy 1.24, pandas 1.5
Project C — CLI tool       → needs click 8.0, rich 13.0
```
With venv, all three coexist perfectly on the same machine.

---

## How it Works

```
Before activation:
  python  →  /usr/bin/python3        (system Python)
  pip     →  /usr/bin/pip3           (system pip)

After activation:
  python  →  ./myenv/bin/python3     (venv Python)
  pip     →  ./myenv/bin/pip         (venv pip)
```

Activating a venv **prepends** the venv's `bin/` (or `Scripts/` on Windows) to your `PATH`.
All `python` and `pip` commands then point to the venv instead of the system.

### venv Directory Structure

```
.venv/
├── bin/                    # macOS / Linux
│   ├── python              # symlink to Python interpreter
│   ├── python3
│   ├── pip
│   ├── pip3
│   └── activate            # activation script
├── Scripts/                # Windows equivalent of bin/
│   ├── python.exe
│   ├── pip.exe
│   ├── Activate.ps1        # PowerShell activation
│   └── activate.bat        # CMD activation
├── lib/
│   └── python3.x/
│       └── site-packages/  # your installed packages go here
├── include/
└── pyvenv.cfg              # config: which Python, version info
```

---

## Setup & Usage

### macOS

#### Step 1 — Check Python version

```bash
python3 --version
# Python 3.14.0
```

#### Step 2 — Create a virtual environment

```bash
# Basic (uses default python3)
python3 -m venv .venv

# With a specific Python version
python3.12 -m venv .venv
python3.11 -m venv .venv

# With a custom name (instead of .venv)
python3 -m venv myenv
python3 -m venv env
```

> **Convention**: Name it `.venv` — it's the most widely recognized name and is
> automatically ignored by many tools and `.gitignore` templates.

#### Step 3 — Activate the virtual environment

```bash
source .venv/bin/activate
```

Your terminal prompt changes to show the active venv:
```
(.venv) user@mac project %
```

#### Step 4 — Verify activation

```bash
which python        # should show: /path/to/project/.venv/bin/python
which pip           # should show: /path/to/project/.venv/bin/pip
python --version    # Python version used by venv
```

#### Step 5 — Deactivate when done

```bash
deactivate
```

---

### Linux

#### Step 1 — Install Python & venv module

```bash
# Ubuntu / Debian
sudo apt update
sudo apt install python3 python3-venv python3-pip

# Fedora / RHEL / CentOS
sudo dnf install python3 python3-pip

# Arch Linux
sudo pacman -S python python-pip

# Check Python version
python3 --version
```

> On some Ubuntu systems, `venv` is a separate package. If you get
> `No module named venv`, run: `sudo apt install python3-venv`

#### Step 2 — Create a virtual environment

```bash
# In your project directory
cd my-project
python3 -m venv .venv

# With specific version (if multiple Python versions installed)
python3.12 -m venv .venv
python3.11 -m venv .venv
```

#### Step 3 — Activate

```bash
source .venv/bin/activate
```

Prompt changes to:
```
(.venv) user@ubuntu:~/my-project$
```

#### Step 4 — Verify

```bash
which python     # /home/user/my-project/.venv/bin/python
which pip        # /home/user/my-project/.venv/bin/pip
python --version
```

#### Step 5 — Deactivate

```bash
deactivate
```

---

### Windows

#### Step 1 — Check Python version

Open **PowerShell** or **Command Prompt**:

```powershell
python --version
# Python 3.14.0

# If 'python' not found, try:
python3 --version
```

> Make sure Python is installed from [python.org](https://www.python.org/downloads/) and
> **"Add Python to PATH"** was checked during installation.

#### Step 2 — Create a virtual environment

```powershell
# PowerShell or CMD
python -m venv .venv

# With specific Python version (if multiple installed)
py -3.12 -m venv .venv
py -3.11 -m venv .venv
```

> Windows uses `py` launcher if you have multiple Python versions installed.

#### Step 3 — Activate

**PowerShell:**
```powershell
.venv\Scripts\Activate.ps1
```

**Command Prompt (CMD):**
```cmd
.venv\Scripts\activate.bat
```

**Git Bash:**
```bash
source .venv/Scripts/activate
```

> If PowerShell blocks the script with an execution policy error:
> ```powershell
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> ```
> Then try activating again.

Prompt changes to:
```
(.venv) PS C:\Users\user\my-project>
```

#### Step 4 — Verify

```powershell
where python     # C:\...\my-project\.venv\Scripts\python.exe
where pip        # C:\...\my-project\.venv\Scripts\pip.exe
python --version
```

#### Step 5 — Deactivate

```powershell
deactivate
```

---

## Common Workflow

Here's the full workflow you'll use for every Python project:

```bash
# 1. Create your project folder
mkdir my-project
cd my-project

# 2. Create a virtual environment
python3 -m venv .venv           # macOS / Linux
python -m venv .venv            # Windows

# 3. Activate it
source .venv/bin/activate       # macOS / Linux
.venv\Scripts\Activate.ps1      # Windows PowerShell

# 4. Install your dependencies
pip install requests flask numpy

# 5. Save dependencies to requirements.txt
pip freeze > requirements.txt

# 6. Work on your project...

# 7. Deactivate when done
deactivate
```

---

## Managing Packages Inside venv

Once the venv is **activated**, use `pip` normally:

```bash
# Install a package
pip install requests
pip install "django>=4.2"
pip install numpy pandas matplotlib

# Install a specific version
pip install requests==2.31.0

# Upgrade a package
pip install --upgrade requests

# Uninstall a package
pip uninstall requests

# List all installed packages
pip list

# Show details of a specific package
pip show requests

# Check for outdated packages
pip list --outdated

# Install packages from requirements.txt
pip install -r requirements.txt
```

---

## requirements.txt

`requirements.txt` is a plain text file listing all packages your project needs.

### Generate it

```bash
# Save all currently installed packages (with exact versions)
pip freeze > requirements.txt
```

### Example requirements.txt

```
Django==4.2.7
requests==2.31.0
numpy==1.26.0
pandas==2.1.1
python-dotenv==1.0.0
```

### Install from it

```bash
# On a new machine or in a fresh venv:
pip install -r requirements.txt
```

### Pinned vs Unpinned

```
# Pinned (exact version) — best for apps / deployment
requests==2.31.0

# Minimum version — best for libraries
requests>=2.28.0

# Compatible release — allows minor updates
requests~=2.31.0

# Any version
requests
```

### .gitignore — Don't commit the venv!

Add this to your `.gitignore`:

```
# Virtual environments
.venv/
venv/
env/
ENV/
__pycache__/
*.pyc
```

> Commit `requirements.txt` (or `pyproject.toml`) — NOT the `.venv/` folder.
> The venv folder can be hundreds of MBs and must be recreated per OS anyway.

---

## Virtual Environment Tools Comparison

| Tool | Command | Speed | Features |
|------|---------|-------|---------|
| **venv** (built-in) | `python3 -m venv` | Medium | Basic — ships with Python 3.3+ |
| **virtualenv** | `virtualenv .venv` | Medium | Supports Python 2, more options |
| **conda** | `conda create -n myenv` | Slow | Manages Python versions + non-Python packages |
| **pipenv** | `pipenv install` | Slow | Combines pip + venv + Pipfile |
| **poetry** | `poetry install` | Medium | Full project management |
| **uv** | `uv venv` | ⚡ Fastest | Modern, Rust-based, replaces all of the above |

> For most use cases, **venv** (built-in) is perfectly sufficient.
> For speed and modern workflows, use **uv**.

---

## Common Issues & Fixes

### Issue: `python3 -m venv .venv` fails on Ubuntu

```
Error: The virtual environment was not created successfully because ensurepip is not available.
```

**Fix:**
```bash
sudo apt install python3-venv
```

---

### Issue: PowerShell blocks activation on Windows

```
.venv\Scripts\Activate.ps1 cannot be loaded because running scripts is disabled
```

**Fix:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

### Issue: `python` command not found on macOS/Linux

```bash
# Use python3 explicitly
python3 -m venv .venv
# After activation, both 'python' and 'python3' should work inside the venv
```

---

### Issue: pip installs to the wrong place (system instead of venv)

**Check:** Is the venv activated?
```bash
which pip     # should point to .venv/bin/pip, NOT /usr/bin/pip
```

If not activated, activate first:
```bash
source .venv/bin/activate
```

---

### Issue: Deleting and recreating the venv

```bash
# Just delete the folder and recreate
rm -rf .venv                        # macOS / Linux
Remove-Item -Recurse -Force .venv   # Windows PowerShell

python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

---

### Issue: Wrong Python version in venv

```bash
# Check what Python is being used
python --version

# Specify version explicitly when creating
python3.12 -m venv .venv    # macOS/Linux
py -3.12 -m venv .venv      # Windows
```

---

## Best Practices

- ✅ **Always use a venv** — never install project packages to system Python
- ✅ **Name it `.venv`** — industry standard, IDE auto-detection
- ✅ **Add `.venv/` to `.gitignore`** — never commit the environment folder
- ✅ **Commit `requirements.txt`** — so others can recreate the environment
- ✅ **One venv per project** — don't share environments between projects
- ✅ **Recreate venv if broken** — deleting and recreating is always safe
- ✅ **Use `pip freeze > requirements.txt`** after installing new packages
- ✅ **Activate before installing** — always check `which python` / `where python`
- ❌ **Don't move the venv folder** — paths are hardcoded inside it; recreate instead
- ❌ **Don't use `sudo pip`** — always work inside an activated venv

---

## Quick Reference

```bash
# ── CREATE ──────────────────────────────────────
python3 -m venv .venv                  # macOS / Linux
python -m venv .venv                   # Windows

# ── ACTIVATE ────────────────────────────────────
source .venv/bin/activate              # macOS / Linux (bash/zsh)
.venv\Scripts\Activate.ps1            # Windows PowerShell
.venv\Scripts\activate.bat            # Windows CMD

# ── VERIFY ──────────────────────────────────────
which python                           # macOS / Linux
where python                           # Windows

# ── INSTALL ─────────────────────────────────────
pip install package-name
pip install -r requirements.txt

# ── SAVE DEPS ───────────────────────────────────
pip freeze > requirements.txt

# ── DEACTIVATE ──────────────────────────────────
deactivate

# ── DELETE & RECREATE ───────────────────────────
rm -rf .venv && python3 -m venv .venv  # macOS / Linux
```

---

*Reference: [Python venv docs](https://docs.python.org/3/library/venv.html) | Last Updated: July 2026*
