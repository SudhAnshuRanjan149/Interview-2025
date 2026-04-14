# Git Cheat Sheet – Quick Revision

## 1. Setup & Config

```bash
# Global identity
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Show config
git config --list
```

---

## 2. Start a Repository

```bash
# New repo in current folder
git init

# Clone existing repo
git clone https://github.com/user/repo.git
```

---

## 3. Basic Workflow

```bash
# Status of changes
git status

# Stage files
git add file.txt          # single file
git add .                 # everything

# Commit
git commit -m "Meaningful message"

# Skip staging (quick commit)
git commit -am "Message"  # only tracks modified, NOT new untracked files
```

---

## 4. Working Directory, Staging, Commits

- **Working directory**: your files.
- **Staging area (index)**: what will go into next commit.
- **Commit**: snapshot of staged files.

```bash
# Unstage a file (keep changes in working dir)
git reset HEAD file.txt

# Discard changes in a file
git checkout -- file.txt        # or: git restore file.txt (newer Git)
```

---

## 5. Branching

```bash
# List branches
git branch

# Create branch
git branch feature/login

# Create + switch
git checkout -b feature/login
# or
git switch -c feature/login

# Switch branches
git checkout main
git switch main

# Delete branch
git branch -d feature/login     # safe delete
git branch -D feature/login     # force delete
```

---

## 6. Merging & Merge Strategies

```bash
# Merge feature into main (fast-forward if possible)
git checkout main
git merge feature/login

# Force a merge commit (no fast-forward)
git merge --no-ff feature/login

# Squash merge (single commit)
git merge --squash feature/login
git commit -m "Add login feature"
```

**Quick rules:**

- **Merge commit**: keeps full branch history.
- **Squash merge**: 1 commit per feature, cleaner history.
- **Rebase**: rewrite feature branch onto another branch (linear history).

```bash
# Rebase feature onto main
git checkout feature/login
git rebase main
```

---

## 7. Merge Conflicts (Quick Steps)

```bash
git merge feature/login   # conflict happens

# 1. Open conflicted files, edit to final version.
# 2. Remove conflict markers <<<<<<, ======, >>>>>>.
# 3. Mark resolved:
git add <file>

# 4. Finish merge (if needed):
git commit
```

---

## 8. Working with Remotes

```bash
# Show remotes
git remote -v

# Add remote
git remote add origin https://github.com/user/repo.git

# Remove remote
git remote remove origin

# Fetch (update remote tracking branches, no merge)
git fetch origin

# Pull (fetch + merge into current branch)
git pull origin main

# Push
git push origin main
```

---

## 9. Inspecting History: log, show, diff, blame

```bash
# Simple log
git log

# Compact log
git log --oneline

# Graph view of branches
git log --oneline --graph --decorate --all

# Show a commit
git show <commit>

# Diff working vs last commit
git diff

# Diff staged vs last commit
git diff --cached

# Diff between two commits
git diff <commit1> <commit2>

# Who changed each line
git blame file.txt
```

---

## 10. Undo with Reset & Revert

```bash
# Undo last commit, keep changes staged
git reset --soft HEAD~1

# Undo last commit, keep changes (unstaged)
git reset HEAD~1

# Dangerous: throw away last commit and its changes
git reset --hard HEAD~1
```

```bash
# Safely undo a pushed commit (create new "revert" commit)
git revert <commit>
```

---

## 11. Stash (Save Work in Progress)

```bash
# Save current changes
git stash

# Save with message
git stash push -m "WIP: login form"

# List stashes
git stash list

# Apply last stash and keep it in list
git stash apply

# Apply specific stash
git stash apply stash@{1}

# Apply and remove from list
git stash pop

# Drop a stash
git stash drop stash@{1}
```

---

## 12. Tags (Releases)

```bash
# Lightweight tag
git tag v1.0.0

# Annotated tag
git tag -a v1.0.0 -m "Release 1.0.0"

# List tags
git tag

# Push tags
git push origin v1.0.0      # single
git push origin --tags      # all
```

---

## 13. reflog (Recover Lost Commits)

```bash
# Show where HEAD has been
git reflog

# Recover a lost commit
git checkout <commit>
git branch recovered <commit>   # new branch pointing to recovered commit
```

---

## 14. Cherry-pick (Pick Specific Commits)

```bash
# Apply a specific commit to current branch
git cherry-pick <commit>
```

---

## 15. Frequent Shortcuts / Patterns

### Quick fix on main from a feature commit

```bash
git checkout main
git cherry-pick <bugfix-commit>
git push origin main
```

### Clean up last few commits into one (interactive rebase)

```bash
git rebase -i HEAD~3    # mark first as 'pick', others as 'squash' or 'fixup'
```

---

## 16. Squash vs Merge vs Rebase – One‑Line Summary

- **Merge**: keeps full branch history, adds merge commit.
- **Squash merge**: combine branch commits into 1 commit on target.
- **Rebase**: replay commits onto new base, linear history, rewrites commit hashes.

Use this sheet to recall the **command**, the **idea**, and typical **usage** quickly.
