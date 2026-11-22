# Finding a regression with `git bisect run`

`git bisect` searches commit history to find the change that introduced a regression. The manual workflow marks one commit as known good and another as known bad; Git checks intermediate commits until it narrows down the first bad commit.

This example models a bug that passed review because the project did not yet have a unit test for it. The demo package exports `calculateSubtotal`. Its initial implementation multiplies each item's price by its quantity. A later commit accidentally drops the quantity. A separate checker, outside the live demo repository, verifies the behavior at each checked-out commit.

## Prepare the demo

From the root of `web-dev-fun`, with Node.js, npm, and Git available:

```sh
section_16_git/scripts/setup-bisect-npm-demo.sh
```

This copies the tracked template from `section_16_git/templates/bisect-npm/` into the ignored `section_16_git/demos/bisect-npm/` directory, initializes a new local repository, and creates a known-good baseline followed by twelve history commits. Step 6 introduces the regression. The generated live repo has its own `.git` directory and is excluded from the parent repository by the root `.gitignore`.

The setup script prints the `known-good` and `known-bad` commit IDs. It also creates tags with those names. The checker scripts remain in the tracked parent repository, outside the generated repository, so Git can check out any demo commit without hiding the checker.

## Run the automatic search

In a terminal, start at the root of `web-dev-fun` and run:

```sh
cd section_16_git/demos/bisect-npm
git bisect start
git bisect bad known-bad
git bisect good known-good
git bisect run "$(git rev-parse --show-toplevel)/../../scripts/check-bisect-npm-demo.sh"
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

The shell checker returns `125` if `npm ci` fails or if the package cannot be loaded, because those failures do not prove the behavior is broken. It returns `1` when the package loads but the function throws or returns the wrong subtotal. This distinction matters: a missing dependency, a broken build, and a genuine behavioral regression are different outcomes.

In a real project, choose the contract check carefully. It should fail only when the behavior under investigation is wrong; unrelated setup failures should be treated as untestable (125) or fixed before the search. The demo runs `npm ci` at each step, so dependency installation time and registry access affect the total run time. npm's cache can make later installs faster.

## Recreate the demo

After finishing, move out of the generated repository and remove its ignored directory before running setup again:

```sh
cd ../../..
rm -rf section_16_git/demos/bisect-npm
section_16_git/scripts/setup-bisect-npm-demo.sh
```

Only use that removal command for this disposable generated demo. Alternatively, leave it in place and run `git bisect reset` to restore its branch before another presentation.
