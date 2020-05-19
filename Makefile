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

build:
	@rm -rf lib
	@env BABEL_ENV=commonjs ${BIN}/babel src --source-root src --out-dir lib --extensions .ts --out-file-extension .js --ignore "src/**/test.ts"
	@env BABEL_ENV=esm ${BIN}/babel src --source-root src --out-dir lib --extensions .ts --out-file-extension .mjs --ignore "src/**/test.ts"
	@${BIN}/prettier "lib/**/*.*js" --write --loglevel silent
	@cp {package.json,*.md} lib
	@rsync --archive --prune-empty-dirs --exclude '*.ts' --relative src/./ lib

publish: build
	cd lib && npm publish --access public