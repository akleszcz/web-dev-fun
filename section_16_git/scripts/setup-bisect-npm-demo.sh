#!/bin/sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
SECTION_DIR=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)
TEMPLATE_DIR="$SECTION_DIR/templates/bisect-npm"
DEMOS_DIR="$SECTION_DIR/demos"
DEMO_DIR="$DEMOS_DIR/bisect-npm"

if [ -e "$DEMO_DIR" ]; then
  echo "Demo already exists: $DEMO_DIR" >&2
  echo "Remove that generated demo directory before setting it up again." >&2
  exit 1
fi

mkdir -p "$DEMOS_DIR"
cp -R "$TEMPLATE_DIR" "$DEMO_DIR"
cd "$DEMO_DIR"
git init -b main
git config user.name "Git Tech Talk Demo"
git config user.email "git-demo@example.invalid"
git add .gitignore package.json package-lock.json index.js
git commit -m "Create cart subtotal package"
git tag known-good

for step in 1 2 3 4 5 6 7 8 9 10 11 12; do
  printf 'History step %s\n' "$step" >> HISTORY.md

  if [ "$step" -eq 6 ]; then
    sed 's/price \* quantity/price/' index.js > index.js.tmp
    mv index.js.tmp index.js
    git add index.js
    git commit -m "Calculate subtotal without quantity"
    git tag known-bad
  else
    git add HISTORY.md
    git commit -m "Record history step $step"
  fi
done

echo
echo "Demo ready at: $DEMO_DIR"
echo "Known good: $(git rev-parse known-good) (tag: known-good)"
echo "Known bad:  $(git rev-parse known-bad) (tag: known-bad)"
echo "The current branch is at the known-bad commit."
