.DEFAULT_GOAL := build
.PHONY: build

SHELL := /bin/bash
BIN = $(shell yarn bin)

test: test-node test-browser
.PHONY: test

test-watch:
	@echo 'Not implemented!'
	@exit 1

test-node:
	@${BIN}/jest

test-node-watch:
	@${BIN}/jest --watch

test-browser:
	@${BIN}/karma start --single-run

test-browser-watch:
	@${BIN}/karma start

test-cross-browser:
	@env CROSS_BROWSER=true ${BIN}/karma --single-run

build:
	@rm -rf lib
	@env BABEL_ENV=commonjs ${BIN}/babel src --source-root src --out-dir lib --extensions .ts --out-file-extension .js --ignore "src/**/test.ts" --quiet
	@env BABEL_ENV=esm ${BIN}/babel src --source-root src --out-dir lib --extensions .ts --out-file-extension .mjs --ignore "src/**/test.ts" --quiet
	@${BIN}/tsc
	@${BIN}/prettier "lib/**/*.*js" --write --loglevel silent
	@cp {package.json,*.md} lib
	@rsync --archive --prune-empty-dirs --exclude '*.ts' --relative src/./ lib

docs: build
	@${BIN}/api-extractor run --local --verbose
.PHONY: docs

publish: build
	cd lib && npm publish --access public