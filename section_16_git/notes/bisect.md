# Finding a regression with `git bisect`

`git bisect` searches commit history to find the change that introduced a regression. The manual workflow marks one commit as known good and another as known bad; Git checks intermediate commits until it narrows down the first bad commit.

This example models a bug that passed review because the project did not yet have a unit test for it. The demo package exports `calculateSubtotal`. Its initial implementation multiplies each item's price by its quantity. A later commit accidentally drops the quantity. A separate checker, outside the live demo repository, verifies the behavior at each checked-out commit.

## Prepare the demo

From the root of `web-dev-fun`, with Node.js, npm, and Git available:

```sh
section_16_git/scripts/bisect-npm/setup-demo.sh
```

This copies the tracked template from `section_16_git/templates/bisect-npm/` into the ignored `section_16_git/demos/bisect-npm/` directory, initializes a new local repository, and creates a known-good baseline followed by fourteen history commits. Step 6 introduces the regression; later commits represent continued work while the bug remains. Step 7 requests a demo-only lodash version that does not match the lockfile, so `npm ci` cannot install that commit. With this history, step 7 is the first commit selected by bisect, giving the checker a commit to skip before it narrows down to the regression.

The setup script prints the `known-good` and `known-bad` commit IDs. It tags the baseline as `known-good` and the latest commit as `known-bad`, modeling a bug report against the current version. The checker scripts remain in the tracked parent repository, outside the generated repository, so Git can check out any demo commit without hiding the checker.

The behavior checker uses the `.cjs` extension to make its CommonJS format explicit. It would also work as `.js` in the current directory structure, but `.cjs` keeps it CommonJS if a parent `package.json` later sets `"type": "module"`.

## Manual bisect

Start from the generated repo and save the path to the checker before bisect starts changing the checked-out commit:

```sh
cd section_16_git/demos/bisect-npm
CHECKER="$(cd ../../.. && pwd)/section_16_git/scripts/bisect-npm/assert-demo.cjs"
git bisect start
git bisect bad known-bad
git bisect good known-good
```

At each commit Git checks out, install its dependencies:

```sh
npm ci --ignore-scripts --no-audit --no-fund
```

If installation succeeds, run the behavior check:

```sh
node "$CHECKER" "$PWD"
```

> **Note:** `CHECKER` stores the checker's absolute path. The `cd ../../.. && pwd` command gets the repository root from the demo directory; command substitution runs it without changing the current directory. `$PWD` passes the demo repo's path to the checker, so it can load the `index.js` from the commit currently checked out.

Then mark the checked-out commit based on the result:

- If `npm ci` fails on the intentional manifest/lockfile mismatch, run `git bisect skip`.
- If the checker says the subtotal is correct, run `git bisect good`.
- If the checker reports the wrong subtotal, run `git bisect bad`.

Git checks out the next candidate after each mark. When it identifies the first bad commit, leave bisect mode with `git bisect reset`.

## Run the automatic search

In a terminal, start at the root of `web-dev-fun` and run:

```sh
cd section_16_git/demos/bisect-npm
git bisect start
git bisect bad known-bad
git bisect good known-good
git bisect run "$(git rev-parse --show-toplevel)/../../scripts/bisect-npm/check-demo.sh"
```

The last command runs the checker once for each commit selected by Git. The checker executes `npm ci` using that commit's lockfile, then loads `index.js` and checks the exported function against a small example cart. The expected subtotal is 11: two coffees at 4 each and one bagel at 3.

Git reports the first bad commit when the search finishes. Inspect it with:

```sh
git show <reported-commit>
```

Then leave bisect mode and return to the original branch:

```sh
git bisect reset
```

## Exit codes from the checker

`git bisect run` interprets the checker’s exit code:

- `0`: the commit is good.
- `1` through `124`, or `126` through `127`: the commit is bad.
- `125`: the commit cannot be tested; Git skips it.
- Any other exit code stops the run.

> **Note:** If the change is in or near a skipped commit, Git may not be able to identify one exact culprit.

The shell checker returns `125` if `npm ci` fails or if the package cannot be loaded, because those failures do not prove the behavior is broken. It returns `1` when the package loads but the function throws or returns the wrong subtotal. This distinction matters: a missing dependency, a broken build, and a genuine behavioral regression are different outcomes.

In the generated history, the unavailable lodash version is intentional: `package.json` asks for `99.99.99-demo-missing`, while `package-lock.json` still records the working version. `npm ci` rejects the mismatch, so the checker exits `125` and Git skips step 7. The following commit restores the manifest, allowing the rest of the automatic search to continue.

In a real project, choose the contract check carefully. It should fail only when the behavior under investigation is wrong; unrelated setup failures should be treated as untestable (125) or fixed before the search. The demo runs `npm ci` at each step, so dependency installation time and registry access affect the total run time. npm's cache can make later installs faster.

## Reuse or recreate the demo

To reuse the existing demo repository after a bisect, run `git bisect reset`. This leaves the generated repo on its original branch; run the bisect commands again without running setup.

To recreate its history from the template, return from the generated demo repo to the root of `web-dev-fun` and run the setup script again:

```sh
cd ../../..
section_16_git/scripts/bisect-npm/setup-demo.sh
```

The script recognizes demos it created and prompts before deleting and replacing one. It refuses to replace an unrecognized directory.
