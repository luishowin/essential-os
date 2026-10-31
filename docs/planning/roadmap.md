# Phased roadmap

**Status:** Planned · **Date:** 2026-10-27

The durations are rough elapsed-time estimates for a solo developer working
consistently. They are not commitments. A custom desktop environment can take
substantially longer depending on whether an existing compositor is reused or a
new one is built. **Advance based on exit criteria, not calendar pressure.**

## Phase 0 — Define the product and build the operating system for the project

**Indicative effort:** 1–2 weeks.

### Deliverables
- Product brief, audience hypothesis, use cases, non-goals and initial success
  measures.
- Git repository for docs and code; issue/project board; decision log; risk
  register; recurring weekly review.
- Design index, existing-note inventory, research library, licence inventory.
- Budget cap and AI usage log.
- Three architecture spikes selected by risk, not novelty.

### Exit gate
A stranger can read the brief and understand what the first release is, who it
is for, what it will not attempt, and how success will be evaluated. The next
technical experiment is clear and testable.

## Phase 1 — Design foundation and usability evidence

**Indicative effort:** 2–5 weeks.

### Deliverables
- Design principles, tokens, typography, icon grid/stroke/style rules, motion
  rules, spacing and shape rules.
- Core components and interaction states.
- Clickable flow for setup/first run, desktop overview, app launching/window
  switching, Settings, notification/control panel and one utility.
- At least five task-based usability sessions across likely users, even if they
  are informal and remote.
- Prioritised design issues, not just visual feedback.

### Exit gate
A user unfamiliar with the design can complete the key prototype tasks without
the designer explaining every step. The design works at the target display
scaling, with keyboard navigation and reduced-motion considerations documented.

### Do not do yet
Do not design every settings subpage, every utility, the full icon library or
every animation. Prove a repeatable component system and the first core journey
first.

## Phase 2 — Architecture proof and technical spikes

**Indicative effort:** 3–8 weeks; can overlap lightly with Phase 1.

### Required experiments
1. **Desktop session:** compare a custom shell on an existing compositor /
   window manager against a more custom Wayland stack. Record startup behaviour,
   window management, multi-monitor support, notifications, screen lock and
   effort.
2. **First-party app toolkit:** build a small Rust application with the intended
   shared components; check accessibility and styling.
3. **System integration:** read battery, storage, network and power status
   through existing system services rather than privileged shell commands where
   possible.
4. **Packaging and delivery:** generate and boot a repeatable test image in
   QEMU/KVM; decide how source, binaries, assets and configuration ship.
5. **Theme interoperability:** test representative GTK 3, GTK 4/libadwaita, Qt,
   Electron and Flatpak apps. Document limitations rather than promising
   universal theming.

### Exit gate
Choose an architecture with a written rationale, known trade-offs and a small
end-to-end proof. Do not start a custom compositor merely because it is
architecturally satisfying; do it only if the prototype demonstrates that
existing foundations cannot meet the product needs.

## Phase 3 — Bootable developer preview

**Indicative effort:** 4–10 weeks after Phase 2.

### Scope
- Repeatable image build and boot in a VM.
- Essential branding, login/greeter path using existing secure infrastructure,
  desktop session, application launcher, basic panel/system menu, window
  management and settings entry point.
- One first-party utility with real system data.
- Keyboard navigation, focus states, readable scaling, basic accessibility and
  reduced motion.
- Build instructions and known limitations.

### Exit gate
The image can be built from documented steps, booted from a clean VM, logged
into, used for a short session, shut down and rebuilt after changes. A broken
build does not corrupt the host or require undocumented manual repair.

## Phase 4 — Alpha vertical slice

**Indicative effort:** 2–4 months.

Deliver one coherent daily-use journey rather than a large menu of mostly
decorative features. Suggested journey:

1. User starts Essential OS and reaches a usable session.
2. Opens an application, switches windows and uses the notification/control
   surface.
3. Changes appearance or a common system setting.
4. Checks storage and battery state using real readings and understandable
   explanations.
5. Installs or launches a supported third-party application.
6. Encounters an error and can find a clear recovery or help path.

### Candidate first-party scope
- Essential shell and shared component library.
- Settings: appearance, display/scaling, keyboard, network entry points, power,
  accessibility and About.
- A basic system monitor / device overview or storage utility.
- Theme and icon package integration.
- App launching and software installation through established system tooling.

### Exit gate
At least three uninvolved testers can complete the chosen tasks in a VM or
reference machine; no known data-loss or critical security bug is open; main UI
flows have loading, empty, error and recovery states.

## Phase 5 — Reliability, packaging, update and recovery

**Indicative effort:** 2–4 months, likely iterative.

### Deliverables
- Installation, upgrade, rollback/recovery design and tested procedures.
- Disk-space behaviour, update failure behaviour and clear low-storage
  messaging.
- Security update policy and source of security notices.
- Crash/error logging policy that respects privacy.
- Repeated VM test runs and at least one real-hardware test path.
- Power/battery baselines using controlled conditions.
- Accessibility pass and application compatibility matrix.
- Signed or otherwise verifiable release artefacts, checksums and reproducible
  build notes where feasible.

### Exit gate
Recovery and update failure cases have been deliberately tested, not merely
documented. A release can be installed from scratch and upgraded using published
instructions. Critical failures are not being papered over as "known issues."

## Phase 6 — Private beta and support loop

**Indicative effort:** 4–8 weeks after a stable candidate exists.

### Deliverables
- Small, opt-in tester cohort, ideally 5–15 people with varied Linux experience.
- Clear tester expectations, privacy note, backup warning, supported hardware
  statement, issue template and known-issues page.
- A weekly triage cadence and changelog.
- User feedback categories: installation, hardware, visual consistency,
  reliability, performance, accessibility, app compatibility and documentation.

### Exit gate
Testers can report issues with enough detail to reproduce them; the project can
close the loop with acknowledgement and fixes without consuming all development
time; unresolved support obligations are known.

## Phase 7 — Public preview / v1 decision

Do not call it v1 merely because the interface looks finished. Ship when the
project can responsibly maintain the thing being released.

### Required release assets
- Install image, checksums, supported hardware matrix, install/rollback
  instructions, known issues, release notes, privacy/security statement, licence
  notices, source links, feedback channel and security contact.
- Release cadence and support-window policy.
- A budget that covers updates and distribution, not only the initial build.
- A clear distinction between preview, beta and stable releases.

### Exit gate
The release meets all quality criteria in
[quality-and-release.md](quality-and-release.md), and the maintainer is willing
and able to support it for the announced period.

## Roadmap rule

Keep only the **current phase**, the **next phase** and a separate **ideas
backlog** visible as active work. Everything else is a hypothesis, not a
promise.
