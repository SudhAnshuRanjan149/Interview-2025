# 📓 Jupyter Notebook (.ipynb) — Complete Notes

> **Jupyter Notebook** is an interactive computing environment that lets you write and run
> code, visualize outputs, and document your work — all in one place.
> The `.ipynb` extension stands for **IPython Notebook**.

---

## 📋 Table of Contents

1. [What is a Jupyter Notebook?](#what-is-a-jupyter-notebook)
2. [How it Works](#how-it-works)
3. [Setup & Installation](#setup--installation)
   - [macOS](#macos)
   - [Linux](#linux)
   - [Windows](#windows)
4. [Running Jupyter Notebook](#running-jupyter-notebook)
5. [JupyterLab vs Jupyter Notebook](#jupyterlab-vs-jupyter-notebook)
6. [Using Jupyter in VS Code](#using-jupyter-in-vs-code)
7. [Kernel Management](#kernel-management)
8. [Using with Virtual Environments](#using-with-virtual-environments)
9. [Using with uv](#using-with-uv)
10. [Cell Types & Shortcuts](#cell-types--shortcuts)
11. [Common Magic Commands](#common-magic-commands)
12. [.ipynb File Format](#ipynb-file-format)
13. [Best Practices](#best-practices)

---

## What is a Jupyter Notebook?

A Jupyter Notebook is an **interactive document** that combines:
- ✅ **Live code** (Python, R, Julia, and 100+ languages)
- ✅ **Rich text** (Markdown, LaTeX math)
- ✅ **Visualizations** (charts, plots, images)
- ✅ **Outputs** (printed results, tables, graphs stored inline)

### Who uses it?
- **Data Scientists** — EDA, ML model training, analysis
- **Researchers** — reproducible experiments and reports
- **Students** — interactive learning and assignments
- **Engineers** — prototyping and quick experimentation

### Key Features
| Feature | Description |
|---------|-------------|
| **Cell-based execution** | Run code in small chunks, not all at once |
| **Inline output** | Results appear directly below each cell |
| **Persistent state** | Variables stay alive between cell runs |
| **Rich media** | Embed images, videos, HTML, LaTeX |
| **Export** | Convert to PDF, HTML, Python script |
| **Shareable** | `.ipynb` files can be shared and run by anyone |

---

## How it Works

```
Your Browser (UI)
      ↕ HTTP
Jupyter Server (local)
      ↕ ZMQ
Python Kernel (runs your code)
```

1. **Jupyter Server** — a local web server that hosts the notebook interface
2. **Kernel** — a running Python (or other language) process that executes code
3. **Browser** — the UI where you write and see results
4. **`.ipynb` file** — a JSON file storing cells, outputs, and metadata

When you click **Run**, the cell's code is sent to the kernel → executed → output is sent back → displayed in the browser.

---

## Setup & Installation

### macOS

#### Method 1 — pip3 (Recommended for beginners)

```bash
# Install Jupyter Notebook
pip3 install notebook

# Install JupyterLab (modern interface — recommended)
pip3 install jupyterlab

# Verify
jupyter --version
```

#### Method 2 — Homebrew

```bash
brew install jupyterlab
```

#### Method 3 — Anaconda (All-in-one bundle)

Download from [anaconda.com](https://www.anaconda.com/download) — installs Python, Jupyter, NumPy, Pandas, Matplotlib, and more in one click.

```bash
# After Anaconda install, Jupyter is already available:
jupyter notebook
jupyter lab
```

#### Method 4 — uv (Fastest)

```bash
uv pip install notebook jupyterlab
# or in a project:
uv add --dev notebook jupyterlab
```

---

### Linux

#### Method 1 — pip3

```bash
# Install pip3 if not present
sudo apt install python3-pip       # Ubuntu/Debian
sudo dnf install python3-pip       # Fedora/RHEL

# Install Jupyter
pip3 install notebook
pip3 install jupyterlab

# Verify
jupyter --version
```

#### Method 2 — System Package Manager

```bash
# Ubuntu/Debian
sudo apt install jupyter-notebook

# Fedora
sudo dnf install python3-notebook
```

#### Method 3 — Anaconda

```bash
# Download installer
wget https://repo.anaconda.com/archive/Anaconda3-latest-Linux-x86_64.sh
bash Anaconda3-latest-Linux-x86_64.sh

# After install:
jupyter notebook
```

#### Method 4 — uv

```bash
uv pip install jupyterlab
```

---

### Windows

#### Method 1 — pip (Recommended)

Open **Command Prompt** or **PowerShell**:

```powershell
pip install notebook
pip install jupyterlab

# Verify
jupyter --version
```

#### Method 2 — Anaconda (Easiest on Windows)

Download from [anaconda.com](https://www.anaconda.com/download):
- Opens **Anaconda Navigator** GUI
- Launch Jupyter Notebook or JupyterLab with one click
- No PATH setup needed

#### Method 3 — uv

```powershell
uv pip install jupyterlab
```

#### Method 4 — winget

```powershell
winget install -e --id Anaconda.Anaconda3
```

---

## Running Jupyter Notebook

### Classic Notebook

```bash
# Launch in current directory
jupyter notebook

# Launch in a specific directory
jupyter notebook --notebook-dir=/path/to/folder

# Launch on a specific port (default is 8888)
jupyter notebook --port=8889

# Launch without opening browser automatically
jupyter notebook --no-browser
```

Notebook opens at: `http://localhost:8888`

### JupyterLab (Modern UI — Recommended)

```bash
jupyter lab

# Specific port
jupyter lab --port=8889
```

JupyterLab opens at: `http://localhost:8888/lab`

### Stop the Server

Press `Ctrl + C` in the terminal where Jupyter is running.

---

## JupyterLab vs Jupyter Notebook

| Feature | Jupyter Notebook | JupyterLab |
|---------|-----------------|------------|
| Interface | Single notebook tab | Full IDE-like layout |
| Multiple files | One at a time | Side-by-side tabs |
| File browser | Basic | Full sidebar |
| Terminal | No | Built-in terminal |
| Extensions | Limited | Rich extension ecosystem |
| Drag & drop cells | No | Yes |
| Recommended? | Legacy | ✅ Yes — use this |

> **Use JupyterLab** for new projects. Notebook is the legacy interface.

---

## Using Jupyter in VS Code

VS Code has **native Jupyter support** — no browser needed.

### Setup

1. Install the **Python** extension in VS Code
2. Install the **Jupyter** extension in VS Code
3. Open any `.ipynb` file — it opens directly in VS Code
4. Select a kernel from the top-right kernel picker

### Benefits
- Full VS Code features: IntelliSense, Git, linting
- No browser tab needed
- Better debugging support
- Works with any virtual environment

### Create a new notebook in VS Code

```
Ctrl+Shift+P → "Create: New Jupyter Notebook"
```

---

## Kernel Management

A **kernel** is the process running your code. Each notebook connects to one kernel.

```bash
# List available kernels
jupyter kernelspec list

# Remove a kernel
jupyter kernelspec remove kernel-name

# Install IPython kernel for current Python
python3 -m ipykernel install --user

# Install with a display name
python3 -m ipykernel install --user --name=myenv --display-name="Python (myenv)"
```

### Kernel Actions (inside notebook)
| Action | How |
|--------|-----|
| Restart kernel | Menu → Kernel → Restart |
| Restart & run all | Menu → Kernel → Restart & Run All |
| Interrupt (stop) | Menu → Kernel → Interrupt |
| Change kernel | Menu → Kernel → Change Kernel |

---

## Using with Virtual Environments

To use a **venv** inside Jupyter:

### Step 1 — Create and activate venv

```bash
# Create venv
python3 -m venv myenv

# Activate
source myenv/bin/activate          # macOS / Linux
myenv\Scripts\Activate.ps1         # Windows PowerShell
```

### Step 2 — Install ipykernel inside the venv

```bash
pip install ipykernel
python -m ipykernel install --user --name=myenv --display-name="Python (myenv)"
```

### Step 3 — Launch Jupyter and select the kernel

```bash
jupyter lab
```

In the notebook, go to **Kernel → Change Kernel** and select **"Python (myenv)"**.

### Verify you're using the right env

```python
import sys
print(sys.executable)   # Should point to your venv's Python
```

---

## Using with uv

```bash
# Create a project with uv
uv init my-project
cd my-project

# Add Jupyter as a dev dependency
uv add --dev jupyterlab ipykernel

# Run Jupyter inside the uv environment
uv run jupyter lab

# Or activate uv's venv first
source .venv/bin/activate
jupyter lab
```

---

## Cell Types & Shortcuts

### Cell Types

| Type | Purpose | Shortcut to switch |
|------|---------|-------------------|
| **Code** | Run Python (or other language) code | `Y` |
| **Markdown** | Write formatted text, headings, math | `M` |
| **Raw** | Plain text, not executed or rendered | `R` |

### Essential Keyboard Shortcuts

#### Command Mode (press `Esc` to enter)
| Shortcut | Action |
|----------|--------|
| `A` | Insert cell **Above** |
| `B` | Insert cell **Below** |
| `D D` | **Delete** cell (press D twice) |
| `Z` | **Undo** cell deletion |
| `M` | Change to **Markdown** |
| `Y` | Change to **Code** |
| `Shift + Up/Down` | Select multiple cells |
| `Shift + M` | Merge selected cells |
| `Ctrl + Shift + -` | Split cell at cursor |
| `L` | Toggle line numbers |
| `O` | Toggle output |
| `H` | Show all shortcuts |

#### Edit Mode (press `Enter` to enter)
| Shortcut | Action |
|----------|--------|
| `Shift + Enter` | Run cell & move to next |
| `Ctrl + Enter` | Run cell & stay |
| `Alt + Enter` | Run cell & insert new below |
| `Ctrl + /` | Toggle comment |
| `Tab` | Code autocomplete |
| `Shift + Tab` | Show docstring / help |

---

## Common Magic Commands

Magic commands start with `%` (line magic) or `%%` (cell magic).

```python
# Measure execution time of a line
%time sum(range(1_000_000))

# Measure average execution time (runs multiple times)
%timeit sum(range(1_000_000))

# Measure time for entire cell
%%timeit
total = 0
for i in range(1_000_000):
    total += i

# List all variables in memory
%whos

# Run a Python script inside notebook
%run script.py

# Load a file into a cell
%load script.py

# Show matplotlib plots inline (default in modern Jupyter)
%matplotlib inline

# Interactive plots
%matplotlib widget

# Write cell content to a file
%%writefile output.py
def hello():
    print("Hello!")

# Execute shell commands
!ls -la
!pip install numpy
!git status

# Show current directory
%pwd

# Change directory
%cd /path/to/dir

# Show command history
%history

# Reset all variables (clear namespace)
%reset

# Show environment variables
%env

# Profile code
%prun my_function()
```

---

## .ipynb File Format

A `.ipynb` file is just a **JSON file**. You can open it in any text editor.

```json
{
  "nbformat": 4,
  "nbformat_minor": 5,
  "metadata": {
    "kernelspec": {
      "display_name": "Python 3",
      "language": "python",
      "name": "python3"
    },
    "language_info": {
      "name": "python",
      "version": "3.12.0"
    }
  },
  "cells": [
    {
      "cell_type": "code",
      "source": ["print('Hello, World!')"],
      "outputs": [
        {
          "output_type": "stream",
          "text": ["Hello, World!\n"]
        }
      ],
      "metadata": {},
      "execution_count": 1
    },
    {
      "cell_type": "markdown",
      "source": ["# My Heading\n", "Some **bold** text."],
      "outputs": [],
      "metadata": {}
    }
  ]
}
```

### Key fields
| Field | Description |
|-------|-------------|
| `nbformat` | Notebook format version (currently 4) |
| `metadata` | Kernel info, language info |
| `cells` | Array of all cells |
| `cell_type` | `"code"`, `"markdown"`, or `"raw"` |
| `source` | The content of the cell |
| `outputs` | Stored results from last run |
| `execution_count` | Order in which cell was executed |

> **Important**: Outputs are stored in the file. This can make `.ipynb` files large if they contain images or large datasets. Use `nbstripout` to strip outputs before committing to Git.

---

## Best Practices

### General
- [ ] Keep notebooks **short and focused** — one notebook per topic/task
- [ ] **Restart & Run All** before sharing to ensure reproducibility
- [ ] Use **Markdown cells** to document what each section does
- [ ] Put reusable code into `.py` files, import them into notebooks

### For Git
```bash
# Strip outputs before committing (keeps diffs clean)
pip install nbstripout
nbstripout --install    # auto-strips on git add

# Or manually strip outputs
jupyter nbconvert --clear-output --inplace notebook.ipynb
```

### Naming Cells / Sections
```python
# ── Section 1: Data Loading ──────────────────────────────────────────
import pandas as pd
df = pd.read_csv("data.csv")
```

### Exporting Notebooks
```bash
# Export to HTML
jupyter nbconvert --to html notebook.ipynb

# Export to PDF (requires LaTeX)
jupyter nbconvert --to pdf notebook.ipynb

# Export to Python script
jupyter nbconvert --to script notebook.ipynb

# Export to Markdown
jupyter nbconvert --to markdown notebook.ipynb
```

---

## Quick Setup Summary

```bash
# ── macOS / Linux ─────────────────────────
pip3 install jupyterlab ipykernel      # install
jupyter lab                             # launch

# ── Windows ───────────────────────────────
pip install jupyterlab ipykernel       # install
jupyter lab                            # launch

# ── With venv ─────────────────────────────
python3 -m venv myenv
source myenv/bin/activate              # macOS/Linux
pip install jupyterlab ipykernel
python -m ipykernel install --user --name=myenv --display-name="Python (myenv)"
jupyter lab

# ── With uv ───────────────────────────────
uv add --dev jupyterlab ipykernel
uv run jupyter lab
```

---

*Reference: [Jupyter Docs](https://jupyter.org/documentation) | Last Updated: July 2026*
