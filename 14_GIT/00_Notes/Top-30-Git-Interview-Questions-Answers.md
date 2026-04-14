# Top 30 Git Interview Questions – Detailed Answers with Examples

---

## 1. What is Git and how is it different from other version control systems?

**Answer:**

Git is a **distributed version control system (DVCS)**. It helps you track changes in source code, collaborate with others, and go back to previous versions when needed.

### Key ideas

- **Distributed**: Every developer has a full copy of the repository (including history) on their machine.
- **Snapshots, not diffs**: Git stores snapshots of files, not just line-by-line differences.
- **Fast branching and merging**: Branches are cheap and easy, which encourages workflows like feature branches.

### How Git differs from older systems (like SVN)

- **SVN** is **centralized**: there is one main server; you need to be online to commit.
- **Git** is **distributed**: you can commit and work offline; you only need network to sync.

Example: Initialize a Git repo and make your first commit:

```bash
mkdir demo-git
cd demo-git
git init                      # create empty Git repository
echo "Hello Git" > hello.txt
git add hello.txt             # stage file
git commit -m "Initial commit"
```

---

## 2. What is the difference between Git and GitHub/GitLab/Bitbucket?

**Answer:**

- **Git**: A command-line tool / system that runs on your machine. It manages versions of files.
- **GitHub / GitLab / Bitbucket**: Online **hosting platforms** for Git repositories plus collaboration features.

### Git provides

- Local commits, branches, merges, rebases.
- Commands like `git add`, `git commit`, `git status`, `git log`.

### Hosting platforms provide

- Remote repositories (URL-based).
- Pull requests / merge requests.
- Code reviews, issues, wikis, CI/CD.

Example: Push a local Git repo to GitHub:

```bash
# After git init and at least one commit
git remote add origin https://github.com/yourname/demo-git.git
git push -u origin main      # or master, depending on your default branch
```

---

## 3. What is a Git repository (local vs remote)?

**Answer:**

A **Git repository** (repo) is a directory that contains:

- Your project files.
- A hidden `.git` folder containing the entire history, branches, tags, etc.

### Local repository

- Lives on your machine.
- Created with `git init` or `git clone`.
- You can commit, branch, and inspect history offline.

### Remote repository

- Lives on a server (GitHub, GitLab, internal Git server).
- Used to share code and collaborate.
- You interact with it using `git push`, `git pull`, `git fetch`.

Example: Create a local repo:

```bash
mkdir my-project
cd my-project
git init
```

Example: Clone (create local from remote):

```bash
git clone https://github.com/user/repo.git
```

---

## 4. Explain the basic Git workflow from editing files to pushing to remote.

**Answer:**

Typical workflow:

1. **Edit files** in your working directory.
2. **Stage changes** with `git add`.
3. **Commit** staged changes with `git commit`.
4. **Push** commits to a remote repository with `git push`.

Example:

```bash
# 1) Check status
git status

# 2) Edit a file
echo "New line" >> file.txt

# 3) Stage the change
git add file.txt

# 4) Commit
git commit -m "Add new line to file.txt"

# 5) Push to remote
git push origin main
```

---

## 5. What is the difference between `git add` and `git commit`?

**Answer:**

- `git add` **moves changes** from your working directory to the **staging area** (index).
- `git commit` **takes what is in the staging area** and creates a **new commit** in the repository history.

You can think:

- `git add` = _“I want these specific changes in my next snapshot.”_
- `git commit` = _“Create a snapshot now with all staged changes.”_

Example:

```bash
echo "Change 1" >> a.txt
echo "Change 2" >> b.txt

git add a.txt          # only a.txt staged
git status             # shows a.txt staged, b.txt unstaged

git commit -m "Update a.txt"   # commit only a.txt
```

---

## 6. What is the staging area (index) in Git?

**Answer:**

The **staging area** (or **index**) is an intermediate area where Git stores changes that will go into the **next commit**.

### Why useful?

- You can edit multiple files but only stage some of them.
- You can build a clean, logical commit by choosing exactly what to include.

Example: Stage selectively

```bash
echo "Change 1" >> app.js
echo "Debug log" >> debug.log

git add app.js         # only app.js is staged
git status             # debug.log remains unstaged

git commit -m "Add feature to app.js"
```

---

## 7. What is the purpose of a `.gitignore` file? Give some common examples.

**Answer:**

A `.gitignore` file tells Git **which files or patterns to ignore** (not track).

You use it to avoid committing:

- Build artifacts (e.g., `dist/`, `build/`).
- IDE files (e.g., `.vscode/`, `.idea/`).
- OS files (e.g., `.DS_Store` on macOS).
- Secrets (e.g., `.env`), though secrets should be managed carefully.

Example `.gitignore`:

```gitignore
# Node.js
node_modules/
dist/

# Logs
*.log

# OS
.DS_Store

# Env files
.env
```

Usage:

```bash
echo "node_modules/" >> .gitignore
git add .gitignore
git commit -m "Add .gitignore"
```

---

## 8. What is `HEAD` in Git and how is it used?

**Answer:**

`HEAD` is a **pointer** to the **current commit** (usually the latest commit on your current branch).

- When you commit, `HEAD` moves to the new commit.
- When you checkout another branch, `HEAD` points to that branch.

You can use `HEAD` in many commands:

- `HEAD~1` or `HEAD^` = one commit before current.
- `HEAD~2` = two commits before current.

Examples:

```bash
git show HEAD          # show current commit
git show HEAD~1        # show previous commit

# Reset working tree to current HEAD (discard local changes)
git reset --hard HEAD
```

---

## 9. What are branches in Git and why are they used?

**Answer:**

A **branch** is a **movable pointer to a commit**. The default branch is often `main` or `master`.

Branches are used to:

- Work on new features without affecting main code.
- Isolate bug fixes (e.g., `bugfix/login-issue`).
- Experiment safely.

Example:

```bash
# List branches
git branch

# Create a new branch
git branch feature/login

# Switch to the new branch
git checkout feature/login
```

---

## 10. How do you create, switch, and delete branches in Git?

**Answer:**

### Create a branch

```bash
git branch feature/api
```

### Create and switch in one command

```bash
git checkout -b feature/api
# or in newer Git
git switch -c feature/api
```

### Switch to existing branch

```bash
git checkout main
# or
git switch main
```

### Delete a branch

```bash
# Delete local branch (safe – only if merged)
git branch -d feature/api

# Force delete (even if not merged)
git branch -D feature/api
```

---

## 11. What is the difference between `git merge` and `git rebase`?

**Answer:**

Both combine changes from one branch into another, but they do it differently.

### `git merge`

- Creates a **merge commit**.
- Keeps the **true history** (non-linear graph with branches and merges).
- Safe for shared branches.

Example:

```bash
# On main
git merge feature/login
```

### `git rebase`

- **Replays commits** from your branch on top of another.
- Produces a **linear history** (no merge commit).
- **Rewrites history**, so avoid rebasing public/shared branches.

Example:

```bash
# On feature branch
git checkout feature/login
git rebase main
```

---

## 12. What is a fast-forward merge vs a non–fast-forward merge?

**Answer:**

### Fast-forward merge

- Happens when the target branch has **no new commits** since you branched off.
- Git simply moves the branch pointer forward.

Example:

```bash
git checkout main
git merge feature/login   # if main has no new commits, this is fast-forward
```

No extra merge commit is created.

### Non–fast-forward merge

- Happens when both branches have new commits.
- Git creates a **merge commit** to combine histories.

```bash
git checkout main
git merge feature/login   # creates a merge commit if histories diverged
```

You can **force a merge commit** even when fast-forward is possible:

```bash
git merge --no-ff feature/login
```

---

## 13. What is a merge conflict? How do you identify and resolve it?

**Answer:**

A **merge conflict** occurs when Git cannot automatically combine changes from two branches because **the same part** of a file was changed in both.

### Identify

- During merge, Git prints messages like: `CONFLICT (content): Merge conflict in file.txt`
- `git status` shows conflicted files.

Conflict markers appear in files:

```text
<<<<<<< HEAD
code from current branch
=======
code from other branch
>>>>>>> feature/login
```

### Resolve

1. Open the conflicted file.
2. Edit the file to keep the correct code (remove conflict markers).
3. Stage the resolved file.
4. Complete the merge.

Example:

```bash
git status                      # see conflicted files
# edit file.txt and fix it
git add file.txt                # mark as resolved
git commit                      # finish merge (if needed)
```

In editors like VS Code, you can click “Accept Current / Incoming / Both” to resolve.

---

## 14. Explain `git fetch` vs `git pull`.

**Answer:**

- `git fetch`:
  - Downloads commits, branches, and tags from remote.
  - **Does not** change your working files or current branch.
  - Safe to check what changed remotely.

- `git pull`:
  - Does `git fetch` **+** `git merge` (or rebase, depending on config).
  - Updates your current branch with remote changes.

Examples:

```bash
# Only get remote updates
git fetch origin
git log HEAD..origin/main --oneline   # see what's new on remote

# Get updates and merge into current branch
git pull origin main
```

---

## 15. How does `git clone` differ from `git init`?

**Answer:**

- `git init`:
  - Creates a **new, empty** Git repository in the current folder.
  - You add files and set up remotes manually.

```bash
mkdir new-project
cd new-project
git init
```

- `git clone`:
  - Copies an **existing remote repository** (including full history).
  - Automatically sets `origin` remote.

```bash
git clone https://github.com/user/repo.git
```

---

## 16. What is `git reset` (soft, mixed, hard) and when would you use each?

**Answer:**

`git reset` moves the **current branch pointer** to another commit. Depending on mode, it also affects staging area and working directory.

1. **Soft reset (`--soft`)**
   - Moves `HEAD` only.
   - Keeps changes **staged**.
   - Use when you want to **rewrite the last commit message** or merge commits.

   ```bash
   git reset --soft HEAD~1   # undo last commit, keep changes staged
   ```

2. **Mixed reset (default)**
   - Moves `HEAD` and **unstages** changes.
   - Keeps changes in working directory.
   - Use when you committed too early and want to edit the changes.

   ```bash
   git reset HEAD~1          # undo last commit, changes become unstaged
   ```

3. **Hard reset (`--hard`)**
   - Moves `HEAD`, resets staging area, and **discards working directory changes**.
   - Use with caution.

   ```bash
   git reset --hard HEAD~1   # lose last commit and its changes
   ```

---

## 17. How is `git revert` different from `git reset`?

**Answer:**

- `git reset` **moves branch pointers** and optionally discards changes.
  - Used mainly on local/unshared history.
  - Can rewrite history, dangerous on shared branches.

- `git revert` **creates a new commit** that undoes the changes of a previous commit.
  - Does **not** rewrite history.
  - Safe for shared branches.

Example: Revert a commit that has already been pushed:

```bash
# Find commit ID
git log --oneline

# Revert it
git revert <commit-hash>
git push origin main
```

This adds a new commit that reverses the previous one.

---

## 18. What is `git stash` and in which scenarios is it useful?

**Answer:**

`git stash` saves your **uncommitted changes** (staged and unstaged) into a temporary stack and **cleans your working directory**.

Useful when:

- You need to switch branches, but you’re not ready to commit.
- You want to quickly test something on another branch.

Example:

```bash
# You edited some files but don't want to commit yet
git status

git stash                  # save changes and clean working directory
git switch other-branch    # or git checkout other-branch

# Later, come back
git switch your-branch
git stash pop              # apply latest stash and remove it from stack
```

You can see stashes:

```bash
git stash list
git stash show -p stash@{0}
```

---

## 19. What is `git cherry-pick` and when would you use it?

**Answer:**

`git cherry-pick` takes **one or more specific commits** from another branch and applies them to your current branch.

Use cases:

- Apply a bug fix from `develop` to `main` without merging all new features.
- Move only selected commits between branches.

Example:

```bash
# On branch 'main'
git log feature/login --oneline   # find commit hash to pick
git cherry-pick <commit-hash>     # apply that commit to main
```

If conflicts occur, resolve them and run:

```bash
git add <files>
git cherry-pick --continue
```

---

## 20. What is `git log` and how can you customize its output?

**Answer:**

`git log` shows the **commit history**.

Basic:

```bash
git log
```

Useful customizations:

- One-line summary:

  ```bash
  git log --oneline
  ```

- Graph view with branches:

  ```bash
  git log --oneline --graph --decorate --all
  ```

- Filter by author:

  ```bash
  git log --author="Your Name"
  ```

- Show commits that touched a file:

  ```bash
  git log -- file.txt
  ```

You can also format output:

```bash
git log --pretty=format:"%h - %an, %ar : %s"
```

---

## 21. What is `git reflog` and how can it help recover lost commits?

**Answer:**

`git reflog` records **every movement of `HEAD`** (checkouts, commits, resets, rebases).

Even if you **lose a branch** or do a `reset --hard`, the reflog often still knows about the old commit.

Example: Recover lost commit after hard reset:

```bash
git reflog              # find the commit hash you lost
# Example output: abc1234 HEAD@{2}: commit: Some commit

git checkout abc1234    # go to that commit
# or move your branch back
git branch recovered abc1234
```

This makes reflog very powerful for **recovery**.

---

## 22. What are tags in Git? Difference between lightweight and annotated tags.

**Answer:**

Tags mark **specific commits** (often for releases, like `v1.0.0`).

### Lightweight tag

- Just a **name pointing to a commit**.
- No extra metadata.

```bash
git tag v1.0.0
```

### Annotated tag

- Stores extra info: tagger name, date, message, and can be GPG-signed.
- Preferred for releases.

```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
```

Push tags to remote:

```bash
git push origin v1.0.0     # single tag
git push origin --tags     # all tags
```

---

## 23. What is the difference between forking and cloning a repository?

**Answer:**

- **Cloning**:
  - `git clone` copies a repository (and history) from remote to your local machine.
  - Common when you have **write access** to the original repo.

- **Forking** (on platforms like GitHub):
  - Creates a **new repository under your account**, based on another repository.
  - You own the fork and can push freely.
  - Good for contributing to open-source projects where you don’t have direct write access.

Typical open-source flow:

1. Fork repo on GitHub.
2. Clone your fork locally:

   ```bash
   git clone https://github.com/yourname/project.git
   ```

3. Push changes to **your fork**, then open a **pull request** to original repo.

---

## 24. What is a pull request (PR) and how does it fit into a typical workflow?

**Answer:**

A **Pull Request (PR)** (GitHub) or **Merge Request (MR)** (GitLab) is a request to merge changes from one branch/repo into another.

### Typical workflow

1. Create a feature branch:

   ```bash
   git checkout -b feature/login
   ```

2. Commit and push to remote:

   ```bash
   git push origin feature/login
   ```

3. On GitHub/GitLab:
   - Open a PR from `feature/login` → `main`.
   - Other developers review code, add comments, ask for changes.
   - After approval, the branch is merged using a chosen strategy (merge, squash, rebase+merge).

PRs are useful for:

- Code review.
- Discussion.
- CI checks before merging.

---

## 25. What are some best practices for writing good Git commit messages?

**Answer:**

Good commit messages make history **easy to read and understand**.

### Recommendations

1. **Short, descriptive subject line** (50 chars or less):
   - Use imperative mood: “Add login validation”, not “Added…”.

2. **Optional body**:
   - Explain **what** and **why**, not every detail of **how**.
   - Wrap lines at 72 characters.

3. **One logical change per commit**:
   - Avoid mixing unrelated changes.

4. Use **Conventional Commits** style if team agrees:
   - `feat: add login form`
   - `fix: handle null user`

Example:

```text
fix: handle null user when logging in

Previously, the login endpoint crashed if user data was null.
This change adds a null check and returns a 400 error instead.
```

---

## 26. What are the different Git merge strategies (e.g. fast-forward, no-fast-forward, recursive, ours, octopus) and when would you use each?

**Answer:**

Git has **merge strategies** that decide how histories are combined.

### 1. Fast-forward (`--ff`)

- Default when possible.
- Simply **moves the branch pointer** forward.
- No merge commit created.
- Used when target branch has no extra commits.

```bash
git merge feature/login         # fast-forward if main hasn’t moved
```

### 2. No fast-forward (`--no-ff`)

- Forces a **merge commit**, even if fast-forward is possible.
- Makes it clear when a feature branch was merged.

```bash
git merge --no-ff feature/login
```

Use in teams when you want to **visually keep feature branches** in history.

### 3. Recursive (default strategy for 2 branches)

- Default algorithm used for merging two branches.
- Can handle complex merges and rename detection.
- You rarely specify it manually.

```bash
git merge -s recursive feature/login
```

### 4. Ours strategy

- For merges where you want to **ignore all changes from the other branch** and keep **current branch content** for conflicting files.
- Dangerous if misused; mostly for advanced/edge cases.

```bash
git merge -s ours old-experiment-branch
```

### 5. Octopus strategy

- Used to **merge more than two branches at once**.
- Best for simple, non-conflicting merges.

```bash
git merge feature1 feature2 feature3
```

If conflicts appear, Git may refuse and you’ll need separate merges.

---

## 27. What is a squash merge in Git (`git merge --squash` or “Squash and merge” in hosting platforms) and what are its advantages and disadvantages?

**Answer:**

A **squash merge** takes all commits from a feature branch and **combines them into a single commit** on the target branch.

### CLI example

```bash
# On main
git merge --squash feature/login
git commit -m "Add login feature"
```

### Hosting platforms (GitHub/GitLab)

- When merging a PR, select **“Squash and merge”**.

### Advantages

- Cleaner history: one commit per feature.
- Hides noisy WIP commits (“fix typo”, “try again”).
- Easier to read `git log`.

### Disadvantages

- You lose the **original commit structure** of the feature.
- `git blame` will point to the single squash commit, not intermediate ones.
- Harder to bisect within the feature branch later.

Use squash merge when:

- You want a **clean, linear history**.
- WIP commits are not important to keep.

---

## 28. How does squash merge differ from a regular merge and from rebase in terms of commit history and conflict resolution?

**Answer:**

### Regular merge

- Keeps **all commits** from the feature branch.
- Adds a **merge commit** connecting histories.
- History becomes **non-linear** (a merge bubble).

```bash
git merge feature/login
```

### Squash merge

- Takes **all changes** from the branch, but creates **one new commit** on target.
- Feature branch’s commit hashes are **not preserved**.
- No merge commit; just one new commit (from target branch’s perspective).

```bash
git merge --squash feature/login
git commit -m "Add login feature"
```

### Rebase

- **Rewrites** feature branch history to sit on top of the target branch.
- All commits are kept but get **new hashes**.
- Produces a **linear history**.

```bash
git checkout feature/login
git rebase main
```

### Conflict resolution

- Regular merge: Resolve conflicts **once**, in the merge commit.
- Squash merge: If using `git merge --squash`, conflicts resolved during squash.
- Rebase: You may need to resolve conflicts **multiple times**, as each commit is replayed.

---

## 29. When would you choose “Squash and merge” vs “Rebase and merge” on GitHub/GitLab, and how do they affect history readability and `git blame`?

**Answer:**

### Squash and merge

- Good when:
  - The feature branch has many small WIP commits.
  - You want **one commit per PR** on main.
- Effect on history:
  - Very clean: each PR = one commit.
  - Harder to see intermediate steps.
- Effect on `git blame`:
  - All lines changed in the PR point to the **single squash commit**.

### Rebase and merge

- Good when:
  - You want to keep **individual logical commits** from the feature.
  - You want a **linear history** without merge commits.
- Effect on history:
  - Still clean and linear, but with multiple commits per PR.
- Effect on `git blame`:
  - Each line can point to the **exact commit** that changed it.
  - More granular blame.

### When to choose what

- **Small, well-structured PR with meaningful commits**:
  - Use **Rebase and merge** (preserves commit structure).
- **Noisy PR with many “fix typo”/“WIP” commits**:
  - Use **Squash and merge**.

---

## 30. In a team/CI workflow, how do different merge strategies (merge commit, squash+merge, rebase+merge) impact debugging, `git bisect`, and rollback strategies?

**Answer:**

### Merge commit (regular merge)

- **Pros**:
  - Preserves full history of feature branches.
  - Easy to see when and where a feature was merged.
  - Good for `git bisect`:
    - You can bisect across merge commits and individual commits.
- **Cons**:
  - History can get noisy, many merge bubbles.

### Squash + merge

- **Pros**:
  - Very clean main branch: one commit per PR.
  - Simple to roll back a whole feature:

    ```bash
    git revert <squash-commit-hash>
    ```

- **Cons**:
  - `git bisect` can only narrow down to the **squash commit**, not inside the feature.
  - Losing internal commit history can make debugging harder.

### Rebase + merge (linear history, multiple commits)

- **Pros**:
  - Linear history; easier to read and reason about.
  - Excellent for `git bisect`: you can find the exact commit that introduced a bug.
  - `git blame` more precise.
- **Cons**:
  - Requires discipline: developers must not rebase shared branches incorrectly.
  - Slightly more complex workflow.

### Summary (for CI & production debugging)

- If you care most about **simple rollbacks**:  
  - **Squash+merge** is convenient (revert one commit).
- If you care about **fine-grained debugging and `git bisect`**:  
  - **Rebase+merge** or **merge commits** (with clean commits) are better.
- Many teams:
  - Use **squash+merge** for small/experimental PRs.
  - Use **rebase+merge** (with curated commits) for important features.

