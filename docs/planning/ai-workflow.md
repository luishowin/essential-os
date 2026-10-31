# AI-assisted development workflow

**Status:** Living process · **Date:** 2026-10-27

AI is a force multiplier only if the code can be understood, reviewed, tested
and maintained. Generated volume is not the goal. Prefer a smaller verified
change to a broad agent-generated rewrite.

## Before each substantial AI task

Write a task brief containing:

- Goal and why it matters to the current phase.
- Relevant architecture and constraints.
- Exact files or subsystem allowed to change.
- Required conventions and dependency constraints.
- Tests to run and expected observable results.
- What must not change.
- Stop condition, time limit and spend limit if API use is metered.

Keep one task per agent run where possible. Do not ask multiple agents to rewrite
the same files concurrently.

## Verification checklist

- [ ] Read the complete diff; do not approve by summary alone.
- [ ] Understand every new dependency and its licence / maintenance status.
- [ ] Run formatters, compiler, tests, lint and targeted manual tests.
- [ ] Inspect error paths, null/empty values, permissions, input validation and
  resource cleanup.
- [ ] Check whether the solution uses an existing API instead of a fragile
  shell-command parser.
- [ ] Test on the supported Fedora/VM environment and note version assumptions.
- [ ] Confirm no secrets, personal data or private assets were added to prompts
  or logs.
- [ ] Record failed approaches and the final decision.

## Use models intentionally

- Cheap / small models: boilerplate, test scaffolding, summaries, docs
  formatting, straightforward refactors.
- Stronger models: architecture alternatives, difficult debugging, cross-module
  review, adversarial edge cases and security questions.
- Local tools: formatting, compilation, tests, grep, static analysis, package
  checks, reproducible builds and simple file transformations. These should not
  consume API calls unnecessarily.

## Agent safety boundaries

- Do not allow an agent to run broad destructive commands or alter the host OS
  without explicit review.
- Prefer working in a VM, disposable branch, container or worktree.
- Do not run untrusted install scripts as root.
- Keep API keys in environment-specific secret storage; never commit `.env`
  files.
- Require explicit review before changing authentication, privileged services,
  update/rollback logic, disk operations, encryption, networking/firewall rules
  or release-signing code.
- For long tasks, create a checkpoint commit before starting and inspect the
  working tree afterwards.

## AI usage log template

The actual log is held locally with the budget record.

| Date | Provider/model | Task | Spend | Files changed | Tests passed | Accepted? | Lesson |
|---|---|---|---|---:|---|---|---|---|
| YYYY-MM-DD | TODO | TODO | $0.00 | TODO | TODO | Yes/No | TODO |

## Red flags

- A model invents APIs or version details: verify against primary docs.
- A solution changes many files without a test explaining why.
- An agent retries the same failing command with small variations.
- A change adds a large framework to solve a small problem.
- Security behaviour is explained confidently but not tested.
- The prompt asks for "finish the whole OS" instead of one bounded change.
