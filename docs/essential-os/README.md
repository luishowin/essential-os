# Essential OS

**The substrate of the platform.**

**Status:** Vision + research · **Date:** 2026-10-07

---

## What it is

Essential OS is a coherent, Linux-based operating system **assembled from
excellent existing components** rather than written from scratch.

```text
"I'm going to write a Linux distribution from scratch."   ← no
"Assemble a coherent OS from excellent existing parts."   ← yes
```

Kernel, drivers, utilities, desktop infrastructure, networking, audio, graphics,
package management and security come from the open-source ecosystem. Our own
work is the **UX, orchestration and system services** layered on top: the place
where differentiation actually exists.

## Why assemble rather than build

Linux provides decades of accumulated engineering. Rebuilding a kernel, a
graphics stack, an audio server and a package manager would consume the entire
project and produce something worse than what already exists. The realistic and
more interesting move is to stand on that engineering and concentrate effort on
the layer the user actually touches.

Essential OS is the **substrate**. Ida is the **intelligence**. Each makes the
other more valuable.

## Documentation map

| Document | What it covers |
|---|---|
| [architecture.md](architecture.md) | The five layers of the system, and the desktop-base question |
| [components.md](components.md) | What we choose versus what we build |
| [design-principles.md](design-principles.md) | The rules that keep it coherent |

## An existing artifact

There is already a real assembly in progress: an **Essential Desktop** working
tree: a Fedora + KDE Plasma environment with a defined shell, application
presentation, visual language, energy policy and interaction model, plus
documented invariants, rollback and audit. It is a strong concrete basis for
Essential OS, and it is where the desktop layer is actually being tested.

It is not yet a distributable operating system: it is a carefully assembled and
documented desktop. **Status: Prototype.**

## The open question

Ida was built for Fedora / GNOME and is now being ported to KDE Plasma. The
desktop assembly is Plasma-based. Which desktop base is *canonical* for
Essential OS is genuinely undecided, and is recorded as ADR
[0009](../decisions/0009-desktop-base-open.md). Both are documented rather than
one being quietly assumed.
