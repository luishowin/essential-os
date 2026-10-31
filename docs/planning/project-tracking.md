# Project tracking and weekly operating system

**Status:** Living process · **Date:** 2026-10-27

## Keep the toolchain small

Recommended starter system:

- **Git + GitHub repository:** canonical project docs and code.
- **GitHub Issues:** discrete work, bugs, design tasks and research spikes.
- **GitHub Projects board:** status and current priorities.
- **Design tool:** design source, linked rather than duplicated.
- **One budget spreadsheet or CSV:** actual recurring costs and caps, held
  locally.
- **This docs folder:** product, architecture, quality and release decisions.

Do not mirror every issue and document across several systems. That creates
competing truths.

## Board columns

1. **Inbox** — untriaged; no commitment implied.
2. **Backlog** — plausible future work, not scheduled.
3. **Ready** — top priority, acceptance criteria written, dependencies known.
4. **In progress** — currently being worked on; WIP limit 2.
5. **Blocked** — waiting on an external answer or failed prerequisite; state the
   blocker.
6. **Review / Test** — implementation exists but is not done.
7. **Done** — acceptance criteria passed and documentation / release notes
   updated where needed.

## Labels

`type:feature`, `type:bug`, `type:design`, `type:research`, `type:docs`,
`type:security`, `type:release`; `priority:P0`, `priority:P1`, `priority:P2`,
`priority:P3`; `area:shell`, `area:settings`, `area:apps`, `area:theme`,
`area:installer`, `area:updates`, `area:website`, `area:infra`.

P0 is a release blocker or immediate security/data-loss risk, P1 is needed for
the current phase exit gate, P2 is useful but not blocking, P3 is a speculative
idea.

## Priority formula

Use a rough score, not mathematical theatre:

**Priority score = (user impact × confidence × urgency) / effort**

Rate each input 1–5. Security, data loss, accessibility blockers and broken
release gates override the score. Low-confidence/high-effort ideas should be
research spikes, not implementation tasks.

## Issue template

```text
Title:
Type / area / priority:
User problem or why this matters:
Expected outcome:
Acceptance criteria (observable):
Out of scope:
Dependencies / risks:
Design / research links:
Test plan:
Documentation or release-note impact:
```

## Definition of ready

A task can enter Ready when it has a clear outcome, acceptance criteria, a
reasonable size, known dependencies and a design or technical reference if
needed. If the task is too large to estimate or test, split it or run a
time-boxed spike.

## Definition of done

- Acceptance criteria pass in the target environment.
- Automated tests run where practical; manual checks are recorded when
  automation is unavailable.
- Error, loading, empty and accessibility states are covered where relevant.
- No known severe regression is left unexplained.
- Secrets, licences, dependencies and permissions have been checked when
  relevant.
- Docs, screenshots, compatibility matrix or release notes are updated if the
  user-facing behaviour changed.
- The issue links to the relevant commit / pull request and evidence.

## Weekly cadence (about 45–60 minutes)

### Start of week — plan
- Review the current phase exit gate.
- Select **one main outcome** and up to two supporting tasks.
- Write "done means…" before starting.
- Confirm budget remaining and time available.

### During the week
- Capture new ideas in Inbox, not in the middle of the sprint.
- Log blockers immediately.
- When an experiment fails, record what it proved so it is not repeated
  blindly.

### End of week — review
- What shipped or was verified?
- What changed in the risk register?
- What did AI cost, and was the work accepted after tests?
- What did a real user or test reveal?
- What is the single next priority?
- Update the weekly log and move stale tasks out of In progress.

The weekly log and risk register are held locally, not published.

## Monthly review

Reassess product scope, roadmap, subscriptions/API spend, licensing, hardware,
technical debt, research and maintenance burden. Do not add major commitments
without removing or delaying something else.
