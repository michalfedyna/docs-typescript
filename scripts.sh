#!/bin/bash

# Available scripts
# - develop - builds docs-typescript and extracts docs from development package

case $1 in
develop)
	pnpm -r run build && cd apps/development
	rm -rf docs
	npm run extract && npm run docs
	cd ../..
	;;
esac
