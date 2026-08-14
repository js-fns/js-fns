# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning].

This change log follows the format documented in [Keep a CHANGELOG].

[semantic versioning]: http://semver.org/
[keep a changelog]: http://keepachangelog.com/

## v1.1.0 - 2026-03-13

### Added

- Added return type inference to the `xxh32Str`, `xxh64Str`, `xxh32Any`, and `xxh64Any` helper functions, allowing them to be used with branded string types without explicit casting.

### Fixed

- Removed the `encoding` parameter from the `xxh32Any` and `xxh64Any` functions, as it is not applicable when hashing canonized (hence already stringified) values. This simplifies the API and prevents confusion about encoding options for non-string inputs. Technically it is a breaking change, but given low usage and the recent `1.0.0` release, it is included in a minor version bump.

### Changed

- Renamed `xxhStr.Input` to `xxhStr.StringLike`. This better reflects the intent of the type. Technically a breaking change, but see reasoning above.

## v1.0.0 - 2026-03-12

### Added

- Added `xxh64` counterpart to the existing `xxh32` function.

- Added string hashing helper functions: `xxh32Str` and `xxh64Str` exported from the `smolxxh/str` module.

- Added any JS value hashing helper functions: `xxh32Any` and `xxh64Any` exported from the `smolxxh/any` module. These depend on the presence of the `smolcanon` package for canonization.

## v0.1.0 - 2025-02-19

Initial version
