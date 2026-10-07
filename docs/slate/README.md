# SLATE ULTRABOOK

**The eventual hardware expression of the project.**

**Status:** Speculative, a hardware concept, not a product · **Date:** 2026-10-07

---

## What it is

An extremely light, thin, modular personal computer, most likely based around a
Framework-style motherboard architecture.

The concept:

- **999 g**
- **no more than 13 inches**
- thin and light
- highly portable
- efficient at rest
- capable of bursting into much higher performance when needed
- modular and repairable
- designed around one idea: **simple at rest, powerful on demand**

## What it is not

- It is not a product, a design render, or a Kickstarter.
- It is not a workstation masquerading as an ultrabook.
- It is not being built now. It is the direction the rest of the project points
  toward.

## Documentation map

| Document | What it covers |
|---|---|
| [vision.md](vision.md) | Why this machine, and what it is for |
| [hardware-requirements.md](hardware-requirements.md) | The concrete targets and their tensions |

## Relationship to the other layers

SLATE is not just a host for the software. It is designed around the idea that
Ida helps the user **exploit the hardware**: deciding when to be quiet and when
to burst, and eventually deciding where computation belongs across a personal
computing fabric.

```text
SLATE            ← designed around "simple at rest, powerful on demand"
   ↓
Essential OS     ← assembled, owned, local-first
   ↓
Ida <∫>          ← the intelligence that uses the machine well
```
