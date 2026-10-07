# Essential OS: design principles

**Status:** Vision · **Date:** 2026-10-07

These are the rules that keep an assembled system coherent rather than a pile of
unrelated parts.

---

## 1. Assemble from proven components

Do not write what is already excellent. The project's value is in the
integration and the experience, not in reimplementing a kernel.

## 2. One system, not many

Every chosen component must be configured to behave as part of one environment:
one visual language, one keyboard model, one set of conventions, one story for
where things live. The test is whether a person can tell where one part ends and
another begins.

## 3. Own what you can

Prefer components that can be inspected, changed and kept working without a
vendor's permission. "Build what you can own" is the durable principle; avoiding
a specific company is not.

## 4. Simple at rest, powerful on demand

The system should be quiet and efficient when idle, and become serious when a
workload requires it. This is both an energy principle and a UX principle: the
machine should not demand attention it does not need.

## 5. Local-first, not local-only

The system works offline and keeps personal data local by default. It may reach
outward when that is genuinely better, and only with the minimum necessary
context.

## 6. Documented, reproducible, recoverable

A system you cannot reconstruct is a system you do not own. Configuration is
recorded, changes are reversible, and the reasoning behind a change is written
down. This mirrors the documentation discipline of the whole project.

## 7. Invariants are explicit

Some things must keep working no matter what: the session starts, the network
works, audio works, suspend and resume work, and a change can be rolled back. A
change that threatens an invariant needs a snapshot and a recorded decision.

## 8. User-level over system-level

Prefer changes that live in the user's environment over changes to the system.
They are easier to reason about, easier to reverse, and they do not require
privilege to maintain.

## 9. No unnecessary daemons

Do not add a service that duplicates something the platform already provides.
Idle cost is a design constraint, not an afterthought.

## 10. The intelligence proposes; the system disposes

Ida reaches the system only through structured capabilities, with validation and
permission in between. The desktop never grants the intelligence an unrestricted
handle on the machine.

## 11. Restraint in the visual language

Understated, technical, mathematical, elegant. No excessive gradients, glowing
circuitry, robot imagery, or generic "futuristic" aesthetics. The identity
anchor is typographic: **E∬ENTIAL OS**, **`<∫>` Ida**, **SLATE**.
