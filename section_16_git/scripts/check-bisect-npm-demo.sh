#!/bin/sh
set -u

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
DEMO_DIR=$(pwd)

if ! npm ci --ignore-scripts --no-audit --no-fund; then
  echo "Could not install this commit's dependencies; marking it untestable." >&2
  exit 125
fi

node "$SCRIPT_DIR/assert-bisect-npm-demo.cjs" "$DEMO_DIR"
exit $?
