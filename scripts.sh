#!/bin/bash

# Available scripts
# - Build - builds docs-typescript and extracts docs from development package

case $1 in
build)
	pnpm -r run build && cd apps/development
	npm run extract && npm run docs
	cd ../..
	;;
esac
