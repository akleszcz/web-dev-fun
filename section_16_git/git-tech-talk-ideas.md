# Tech Talk: Git, Recovering from Mistakes

## Content candidates

### Core toolbox

- `git rebase -i`: squash, reorder, reword, fixup before opening an MR.
- `git bisect` (including `bisect run`): find the commit that broke something.
- `git reflog`: safety net after `reset --hard` or a bad rebase.
- `git stash` beyond basics: `stash push -p`, named stashes, `apply` vs `pop`.
- `git add -p` / `commit -p`: atomic commits through hunk staging.
- `git worktree`: work on several branches at once without stashing.
- `git blame` tricks: `-L` for line ranges, `-w` to ignore whitespace, `--ignore-rev` to skip mass-reformat commits.
- Git hooks and Husky: compare Git's built-in hooks with Husky's project-level setup; consider a frontend example such as running lint-staged before a commit.
- `.gitignore` vs `.git/info/exclude`: both keep untracked paths out of status, but `.gitignore` can be committed and shared while `info/exclude` is local to a clone.
- Git submodules (optional segue from the demo setup): show what happens when a nested demo repo is not ignored and is staged in the parent (a gitlink to a commit, without the nested repo's contents or a fetch URL); then compare a proper submodule, which adds `.gitmodules` with the repository URL and path so clones can fetch the pinned commit.
- Aliases and `git config` tweaks.

### Tricky scenarios (the memorable part)

1. **Lost commit and the reflog isn't enough.** The reflog entry expired or doesn't exist in this clone. Use `git fsck --lost-found` / `--unreachable`, inspect with `git show`, then reattach with a branch or cherry-pick.
2. **Bisecting a bug that isn't a clean pass/fail.** Some commits don't build. Use `git bisect skip` and `git bisect run` with exit codes: `0` = good, `1` = bad, `125` = untestable.
3. **The same rebase conflict on every commit.** Use `git rerere` (reuse recorded resolution), plus `--skip` and `--abort`.
4. **A bad force-push overwrote a teammate's commits.** The teammate's local reflog is the recovery path. Prevention: `--force-with-lease`.
5. **Splitting a commit after the fact.** `rebase -i` → `edit` → `git reset HEAD^` → `add -p` → two commits.
6. **A merge commit introduced a bug.** Use `git log --merges` and `git bisect --first-parent` (needs a recent git version, so check before the talk).
7. **A deleted branch that is truly gone.** Show the limits of recovery. A talk where every demo ends in "and it worked!" is less credible, and this scenario motivates good practices.

**Structuring tip:** for each scenario, show the naive first attempt failing, then the real fix. That is what makes it feel tricky.

## Demo preparation

- **Use throwaway local repos** (about 15-20 commits) in a gitignored `section_16_git/demos/` directory; keep their templates and setup scripts in a tracked `section_16_git/templates/` directory.
- Have setup scripts copy a template into the ignored demos directory, initialize a fresh Git repository there, and create the history needed by the demo. Keep template files free of `.git` so each run starts with fresh history.
- Mention that `.gitignore` is committed and shared, while `.git/info/exclude` is a clone-local alternative for personal generated files.
- Keep the live demo repos out of the parent repo's index; submodules can be explained separately without adding setup overhead to the demos.
- **Script the setup** so the repo can be recreated quickly if a demo goes wrong. `git commit --allow-empty -m "..."` works for filler commits.
- **Per-demo setup:**
  - `bisect`: one commit introduces a behavioral bug in a tiny npm package. Keep the bisect checker outside the live demo repo so it remains available while commits are checked out; it installs dependencies from the lockfile and directly checks the exported method's behavior.
  - `rebase -i`: a messy sequence with fixup-worthy commits, squash candidates and a typo in a message.
  - `reflog`: `reset --hard`, then recover.
  - `worktree`: second branch in a sibling folder, shown in split terminals.
  - `stash -p` / `add -p`: one file with several unrelated changes.
- **Fallback:** record an asciinema clip or GIF per demo, and keep the exact commands written down for pasting.

## Suggested outline

1. Intro: the fear of losing work (2-3 min).
2. Safety net basics: `reflog`, `reset` modes.
3. Tricky scenarios 1-7 above, each as "naive attempt → fix".
4. Bonus: `worktree`, `add -p`, `blame` tricks.
5. Takeaways: a short cheat sheet slide.

