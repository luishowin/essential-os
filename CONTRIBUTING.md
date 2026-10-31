# Contributing

This is a long-term personal project, but it is worked on with AI assistance,
which means **documentation quality is part of the engineering system**. These
rules exist so that a change made today is still understandable in three years.

## The workflow for anything significant

1. Explain the problem.
2. Document the proposed solution.
3. Identify the risks.
4. Implement.
5. Test.
6. Document what actually happened.
7. Update the roadmap and status.

Prefer small, reversible steps.

## Rules

- **Record decisions.** Every important architectural choice becomes an ADR in
  [`docs/decisions/`](docs/decisions/README.md). Never edit a past decision;
  supersede it with a new one and mark the old one `Superseded`.
- **Label claims.** Every technical claim is one of **Implemented**,
  **Prototype**, **Planned**, **Hypothesis** or **Open question**. Do not
  present speculation as fact.
- **Do not rewrite the architecture** because a newer library or model looks
  exciting. Propose it as an ADR first.
- **Do not introduce a dependency** without recording why it is needed.
- **Do not hard-code the project to one AI provider.** The capability model is
  ours; models are interchangeable components.
- **Do not make MCP the fundamental architecture.** Ida's own capability model
  is the primary abstraction; MCP may eventually be an interoperability layer.
- **Do not expose unrestricted shell execution to the agent.** Terminal access
  is one controlled capability among many, with validation and risk levels.
- **Do not build persistent memory** before ephemeral context and entity
  resolution are useful.
- **Do not over-engineer future requirements** before the current layer works.

## Where things live

| Kind of change | Repository |
|---|---|
| Vision, roadmap, ADRs, brand, site, contract | **this repo** (`essential-os`) |
| Ida's implementation and its detailed spec | [`luishowin/ida`](https://github.com/luishowin/ida) |
| Desktop assembly, shell, energy policy | the Essential Desktop working tree |

Implementation detail for Ida belongs in Ida's own `ARCHITECTURE.md` and
`DECISIONS.md`, not here. This repository links to it rather than copying it, so
there is exactly one owner for every fact.

## Working rules

1. Work on one primary outcome at a time. Keep no more than **two tasks in
   progress**, including research and coding.
2. A design is not done because it looks good in a design tool; it needs
   behaviour, empty/error/loading states, keyboard and accessibility
   consideration, and an implementation path.
3. A feature is not done until it is tested in the target environment and
   documented where a future maintainer would look.
4. Prefer established system APIs and services over custom replacements unless
   the replacement materially improves the product.
5. Every important technical decision gets a short record in
   [`docs/decisions/`](docs/decisions/README.md).
6. For AI-generated code: inspect the diff, run tests, check licences and
   dependencies, test failure cases, and never accept security-sensitive code
   without human review.
7. No public promise of hardware support, update safety or security properties
   until the claim has been tested.

See [`docs/planning/`](docs/planning/README.md) for the roadmap, first-release
scope, quality gates and weekly process.

## Commit style

Commits describe the change and its reason, in the present tense, e.g.
`decisions: record the desktop-base question (0009)`. Keep the tree buildable,
for this repository that means the contract validator passes:

```sh
node contract/test.mjs
```
