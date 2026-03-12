# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning].

This change log follows the format documented in [Keep a CHANGELOG].

[semantic versioning]: http://semver.org/
[keep a changelog]: http://keepachangelog.com/

## v1.0.0 - 2026-03-12

### Added

- Added `xxh64` counterpart to the existing `xxh32` function.

- Added string hashing helper functions: `xxh32Str` and `xxh64Str` exported from the `smolxxh/str` module.

- Added any JS value hashing helper functions: `xxh32Any` and `xxh64Any` exported from the `smolxxh/any` module. These depend on the presence of the `smolcanon` package for canonization.

## v0.1.0 - 2025-02-19

Initial version
