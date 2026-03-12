test:
	@pnpm exec vitest run
.PHONY: test

test-watch:
	@pnpm exec vitest

types:
	@pnpm exec tsc

types-watch:
	@pnpm exec tsc --watch

test-types: build
	@cd dist && pnpm pack --out ../tmp/pkg.tgz
	@pnpm exec attw ./tmp/pkg.tgz

bench:
	pnpm exec tsx benchmark.ts

size:
	@echo "========= xxh32 =========\n"
	@node size.ts ./src/xxh32/index.ts
	@echo "========= xxh64 =========\n"
	@node size.ts ./src/xxh64/index.ts

build: prepare-build
	@pnpm exec tsc --project tsconfig.dist.json
	@env BABEL_ENV=esm pnpm exec babel src --config-file ./babel.config.json --source-root src --out-dir dist --extensions .js,.ts --out-file-extension .js --quiet
	@env BABEL_ENV=cjs pnpm exec babel src --config-file ./babel.config.json --source-root src --out-dir dist --extensions .js,.ts --out-file-extension .cjs --quiet
	@node copy.ts
	@make build-cts

build-cts:
	@find dist -name '*.d.ts' | while read file; do \
		new_file=$${file%.d.ts}.d.cts; \
		cp $$file $$new_file; \
	done

prepare-build:
	@rm -rf dist
	@mkdir -p dist

publish: build
	cd dist && pnpm publish --access public

publish-next: build
	cd dist && pnpm publish --access public --tag next

link:
	@cd dist && pnpm link
