#!/usr/bin/sh

echo ">>>>> Running pre-commit hook..."

# fixes all auto fixable things and commits them
yarn lint
git add --update --verbose

# checks if linting error exist
if yarn lint; then
   echo "No errors found"
else
   exit 1
fi

echo ">>>>> End of pre-commit hook"
