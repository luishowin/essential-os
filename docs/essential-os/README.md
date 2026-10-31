# Essential OS

**The substrate of the platform.**

**Status:** Vision + research · **Date:** 2026-10-07

**The full statement:** the consolidated product and technical specification is
[`docs/essential-os-specification.md`](../essential-os-specification.md) (v0.2).
This page is the layer's narrative; the specification is the whole system in one
document.

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

## Product brief

**Status:** Hypothesis · **Date:** 2026-10-27

### Working description

Essential OS is an open-source, Linux-based desktop operating system designed to
make everyday computing feel coherent and approachable without hiding the
flexibility of a real computer. Its experience emphasises **exploration,
creation and play** through a consistent visual language, considered motion,
dependable system utilities and first-party creative tools.

This is a working statement, not a marketing claim. Validate it with users before
polishing the website around it.

### Problem to solve

Linux offers capable software and a flexible foundation, but the experience can
feel fragmented: applications use different design conventions, setup and system
tasks vary in quality, and a user must assemble many independent parts to get a
desktop that feels intentionally designed. Essential OS should reduce that
fragmentation without trying to control every application or rebuilding mature
infrastructure unnecessarily.

### Initial audience hypothesis

Start with one primary audience rather than "everyone who uses a computer."
Suggested hypothesis: technically curious desktop users who value polish,
control, open technology, creative work and repairability, but do not want
everyday maintenance to become a hobby.

Validate through short interviews and usability tests. Do not assume people want
a Linux OS because they admire the aesthetic.

### Product principles

1. **Coherence:** one design language across shell, settings, utilities and
   first-party apps.
2. **Control without needless complexity:** advanced capability exists, but
   ordinary tasks have clear defaults.
3. **Local-first where sensible:** core desktop functions work without an
   account or mandatory cloud service.
4. **Recoverability:** system changes are understandable and, where practical,
   reversible.
5. **Open and maintainable:** prefer public standards, upstream fixes, auditable
   code and reproducible build steps.
6. **Accessible by design:** keyboard navigation, text scaling, contrast,
   reduced motion and screen-reader labels are requirements, not polish.
7. **Performance with evidence:** measure startup, memory, responsiveness and
   battery on named reference hardware.

### Product boundary

Essential OS is initially a Fedora-based operating system and desktop experience.
It reuses the Linux kernel, drivers, packaging/build infrastructure and mature
system services. Essential may replace the shell and first-party applications
over time, but will not rewrite the kernel, hardware drivers, package manager or
every ecosystem application for the first release.

### First-use promise (hypothesis)

A user can install or boot a preview image, enter a clean desktop, launch and
switch between applications, connect to a network, manage basic system
preferences, inspect disk and battery status, install supported apps and recover
from a failed update without needing to understand Linux internals.

Only advertise this promise once the release candidate demonstrably meets it.

### Differentiators to investigate

- A distinctive but restrained visual identity and motion system.
- A shared design system for shell and first-party apps.
- High-quality storage, battery, device, network and task utilities.
- A simple theming and icon workflow, potentially including an icon composer.
- Creative tools such as Artcraft and Rawmakase, if still strategically
  important after the core system is viable.
- Defaults that respect privacy, avoid account lock-in and support offline use.

Do not treat every idea here as a launch requirement. Select a single reason to
try the first preview and prove it.

### Success hypothesis

People choose Essential OS because the desktop feels coherent and dependable,
not only because screenshots look attractive. The first preview should prove that
a small set of daily workflows is easier, clearer or more satisfying than the
user's current setup.

### Decisions required in Phase 0

- First reference hardware and minimum target hardware.
- The primary user and the first three to five jobs to be done.
- Whether the first deliverable is a custom session on Fedora, an installable
  image, or both in sequence.
- Which existing compositor/window-management layer the first prototype uses.
- Whether first-party apps use GTK 4 + Rust as the default, with explicit
  exceptions when justified.
- Initial package/app distribution approach: Fedora RPMs, Flatpak, or a
  deliberate mix.
- Licence strategy for code, icons, fonts, wallpapers and website assets.
- What "local-first" means for the first release and what data, if any, leaves
  the device.

## The open question

Ida was built for Fedora / GNOME and is now being ported to KDE Plasma. The
desktop assembly is Plasma-based. Which desktop base is *canonical* for
Essential OS is genuinely undecided, and is recorded as ADR
[0009](../decisions/0009-desktop-base-open.md). Both are documented rather than
one being quietly assumed.
