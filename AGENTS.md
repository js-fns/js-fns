# Agents Instructions

Start with the [README.md](README.md) file. It contains the core overview of the project.

At this point:

- Library has never been published to npm, so we can change things without looking back.
- The current goal is to bring the set of minimal packages I created over the years under one roof.
- The library's focus and goals are still being defined, so we might experiment and steer the project in a different direction if we find a better approach.

## Roadmap

Currently we're focused on consolidating the existing packages into a single library and shaping how the library should look like.

Additionally, we want to experiment and come up with a way to vendor small parts of the library into other projects without adding js-fns as a dependency. The goal is to build the `js` CLI that can pull in parts of the library into, say, `./vendor/<subpackage-name>`, and then optionally update them when needed.

### Consolidation

When we pull in code from other packages, we do the following:

- Create a `js-fns` branch in the package repo, prefixing every commit with `(<js-fns-subpackage-name>): <commit-message>`.
- Import it as a git subtree into the `./pkgs/<original-package-name>` folder.
- Move code from the package into the `./pkgs/core/src/<subpackage-name>` folder.
- Organize the code following existing patterns in the library, and make sure it is consistent with the rest of the codebase.
- Remove the original package from the `./pkgs` folder.

Your goal is to assist on whatever step we are currently on.

### Shaping

We are still defining the library's focus and goals. When you see a pattern emerge that humans might not recognize yet, chime in and point that out.

### Vendoring

While vendoring functionality doesn't exist yet, we want to keep it in mind when shaping the library.

### Breaking Change-Free

Another experiment we would like to try is to avoid breaking changes in the library. It is unclear how and even if this is possible, but exploring the idea is one of the main goals.

This could mean that we might have to create a new subpackage when a breaking change is needed, instead of changing the existing one.

### Minimalism-First

All of the high-level abstractions in the library should start as a minimalistic, "absolutely necessary" implementation, to cover the first 90% of use cases.

When a niche use case arises and it still makes sense to add it to the library, instead of adding it to the existing implementation, we should think how to introduce it with zero overhead for the base implementation.

Just like with breaking-change-free, this might mean a new subpackage based on the existing one.
