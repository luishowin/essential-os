# Essential OS — components

**Status:** Research · **Date:** 2026-10-07

The table below records, per component, the current intent: **choose** an
existing proven component, **configure** one that exists, or **build** our own.
Most rows are "choose". The "build" rows are where the project's effort belongs.

> These are directions, not commitments. A component changes when an ADR records
> why.

| Layer | Concern | Direction | Candidate / note | Status |
|---|---|---|---|---|
| Foundation | Kernel | choose | Linux | Prototype |
| Foundation | Firmware / boot | choose | UEFI + standard bootloader | Prototype |
| Foundation | Drivers | choose | In-kernel + distribution packaging | Prototype |
| Foundation | Init / service manager | choose | systemd | Prototype |
| Foundation | Filesystem | choose | btrfs (snapshots/rollback) | Prototype |
| Foundation | Power / thermals | configure | `tuned` / `power-profiles-daemon` / amd-pstate | Prototype |
| Services | Display server | choose | Wayland compositor (base-dependent) | Prototype |
| Services | Graphics | choose | Mesa + VA-API | Prototype |
| Services | Audio | choose | PipeWire + WirePlumber | Prototype |
| Services | Networking | choose | NetworkManager | Prototype |
| Services | Bluetooth | choose | BlueZ | Prototype |
| Services | Secrets | choose | platform keyring / `ksecretd` | Prototype |
| Services | Packaging | choose | RPM / distribution tooling | Prototype |
| Services | Updates | configure | Manual, nothing locked | Prototype |
| Desktop | Shell / WM | choose + configure | Plasma (current) or GNOME | Prototype |
| Desktop | Session | choose | base-dependent | Prototype |
| Desktop | App presentation | **build (config)** | human app naming, theming, app family | Prototype |
| Desktop | Visual language | **build** | colour, type, motion, icons | Prototype |
| Desktop | Keyboard model | **build (config)** | global shortcuts, interaction model | Prototype |
| Experience | App family | choose + configure | Files, Photos, Music, Notes, Terminal, Settings… | Prototype |
| Experience | Design system | **build** | the E∬ENTIAL OS language | Design |
| Intelligence | Runtime | **build** | Ida `<∫>` | Implemented (Core) |
| Intelligence | Capability layer | **build** | the registry and trust path | Implemented |
| Intelligence | Model routing | **build** | provider-agnostic router | Prototype |
| Intelligence | Local models | choose | small action models, embeddings | Research |

## The rule for choosing a component

A component is acceptable if it is:

1. **proven** — it is already doing this job well, somewhere real;
2. **inspectable** — its behaviour can be understood and changed;
3. **replaceable** — it does not trap the project;
4. **licence-compatible** — it can be part of an owned system.

If a component fails these, we either configure around it or build the part we
need. We do not build a whole subsystem to avoid configuring a good one.

## Build-versus-choose, in one sentence

> Choose everything that is genuinely solved; build only the experience and the
> intelligence, which are the reasons this project exists.

## Dependency discipline

No dependency is introduced without recording why it is needed. This applies to
software components and to libraries inside our own code. The Ida core, for
example, holds itself to a tiny dependency allowlist that a test enforces.
