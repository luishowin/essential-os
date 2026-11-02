# ESSENTIAL OS
## Product & Technical Specification

**Version:** 0.2  
**Last updated:** 31 October 2026  
**Status:** Working specification  
**Project horizon:** 2030  
**Repository:** github.com/luishowin/essential-os

> EXPLORATION. CREATION. PLAY.

---

## 1. Product definition

Essential OS is an open-source, Linux-based personal computing environment assembled from proven open-source technologies and developed around a cohesive desktop experience.

It combines a carefully designed desktop environment, an integrated collection of productivity and creative applications, useful system utilities, local-first functionality and an optional intelligent interaction layer.

The objective is to make a computer feel complete from the first boot: capable, approachable, enjoyable and independently maintainable.

Essential OS is not a Linux distribution written from scratch. It is a deliberately assembled computing platform that owns its experience while reusing mature infrastructure wherever practical.

**Core philosophy:**

- Build what can be owned.
- Use existing technology intelligently.
- One system, one coherent experience.
- Simple at rest, powerful on demand.
- Local-first, not local-only.
- Documented, reproducible and recoverable.
- Exploration, Creation and Play.

## 2. Product objectives

Essential OS should:

1. Provide a distinctive, cohesive desktop experience.
2. Make everyday computing intuitive without hiding advanced functionality.
3. Include useful productivity, creative and entertainment software out of the box.
4. Operate independently of mandatory cloud accounts and internet connectivity.
5. Make configuration, backup and recovery straightforward.
6. Maintain good hardware compatibility, performance and power efficiency.
7. Provide a consistent design language across the desktop and first-party applications.
8. Offer a safe, structured interface through which intelligent software can interact with the operating system.
9. Remain open, inspectable, modular and replaceable.

## 3. Target audience

**Initial audience hypothesis:**

Technically curious desktop users, independent creators, students and professionals who appreciate polished software, open technology, customization and control without wanting to spend their time maintaining their computer.

Essential OS should not assume that its users are Linux experts.

The system should offer sensible defaults while allowing advanced users to explore and modify its underlying components.

Initial development should prioritize x86-64 desktop and laptop computers. Broader architecture and hardware support can follow after the core experience is stable.

## 4. System architecture

Essential OS consists of five interacting layers.

### 4.1 Foundation

Reuse established Linux infrastructure:

- Linux kernel
- UEFI boot infrastructure
- Hardware drivers and firmware
- systemd
- Filesystem and storage management
- Power and thermal management
- Hardware security mechanisms

Btrfs is a candidate default filesystem, with snapshots and rollback considered important recovery capabilities.

### 4.2 System services

Reuse and integrate established services:

- Wayland graphics infrastructure
- Window management and compositing
- Mesa graphics stack
- PipeWire and WirePlumber
- NetworkManager
- BlueZ
- Secret and credential management
- Package management and updates
- Authentication and permissions

Avoid unnecessary background services and duplicated functionality.

### 4.3 Desktop infrastructure

The Essential Desktop layer owns the primary user experience.

It includes:

- Desktop shell
- Panels and dock
- Application launcher
- Window management integration
- Application switching
- Notifications
- Control centre
- System settings
- Session management
- Desktop search, powered by Sam
- Workspace management
- Lock screen integration
- Desktop widgets where justified

The initial implementation should reuse a mature compositor/window-management foundation rather than immediately creating a custom Wayland compositor.

### 4.4 Experience and applications

A shared design system governs the desktop, first-party applications and system utilities.

Applications should be independently maintainable, modular and integrated through defined interfaces.

### 4.5 Intelligence

Intelligent capabilities integrate through structured interfaces and explicit permissions.

The intelligence layer must never receive unrestricted access to the operating system.

Essential OS separates two systems with different responsibilities:

- **Sam** is the native search and retrieval service. It answers questions about the computer and its permitted local information through a versioned registry, local indexes and deterministic handlers. It uses no generative model, performs no reasoning and keeps no personal memory.
- **Ida** is the personal assistant. It understands requests, resolves context, uses approved tools, executes native actions, converses, reasons and escalates complex work to local or cloud models through a privacy gate.

They are peers. Sam is not a tier of Ida, and Ida does not own the operating system's search architecture. Ida may call Sam through a typed interface.

## 5. Platform and development strategy

**Base distribution:** Fedora Linux.

**Primary package format:** RPM.

**Package management:** DNF.

**Initial desktop prototype:** Fedora + KDE Plasma assembly.

Essential Desktop should become an independently installable desktop session rather than requiring a separate Linux installation during development.

### Development installation

The intended installation experience:

`sudo dnf install essential-os`

This installs the Essential OS desktop session and its required components through a dedicated package repository.

The user should be able to select Essential OS at the login screen alongside existing GNOME and KDE sessions.

Installing or removing Essential OS must not unnecessarily overwrite or damage other desktop environments.

System services already provided by Fedora should be reused rather than duplicated.

The installation process should be reversible and preserve the host system's existing configuration.

### Packaging structure

Proposed package groups:

- `essential-os`: top-level installation package
- `essential-session`: desktop session definition
- `essential-shell`: desktop shell
- `essential-system`: integration services and utilities
- `essential-settings`: system configuration interface
- `essential-theme`: visual assets and appearance defaults
- `essential-apps`: core application collection
- `essential-creative`: creative software collection
- `essential-office`: productivity software collection
- `essential-games`: curated games
- `essential-search`: Sam, the native search and retrieval service

The exact package boundaries remain subject to implementation and dependency testing.

The canonical desktop base and window-management implementation remain subject to a formal architecture decision.

## 6. Desktop experience

The desktop should feel intentional, responsive and consistent.

### Core interface

- Desktop workspace
- Top panel or equivalent system information surface
- Dock or application access surface
- Application launcher
- Search (Sam)
- Window previews and switching
- Notifications
- Control centre
- System status indicators
- Desktop context menus
- Integrated settings

### Visual identity

The visual language should follow the existing Essential OS brand direction:

- Restrained, technical and elegant.
- Strong typography and deliberate spacing.
- Dark and light appearance support.
- Faded light-blue accent direction.
- Consistent iconography and component geometry.
- Considered transitions and animations.
- Clear visual hierarchy.
- Readable surfaces without excessive transparency or blur.

The experience should remain usable at different display resolutions, scaling factors and accessibility settings.

Exploration, Creation and Play should influence the interaction design, not just the branding.

### Accessibility

Accessibility requirements include:

- Keyboard navigation.
- Visible focus states.
- Text scaling.
- Sufficient contrast.
- Screen-reader labels.
- Reduced-motion support.
- Predictable keyboard shortcuts.

## 7. Application ecosystem

Essential OS should ship with a curated collection of useful software rather than presenting an empty desktop.

The aim is to reduce the amount of installation and configuration needed after first boot.

### 7.1 Creative suite

A collection of applications for creative work.

Priority areas:

- Raster image editing and photography.
- RAW image development.
- Illustration and design.
- Media creation and conversion.
- Audio and video workflows.
- Asset and file management.

Artcraft and Rawmakase are planned first-party creative projects within the wider ecosystem.

Third-party applications should be integrated where they already solve a problem well.

### 7.2 Office suite

A usable offline productivity collection:

- Word processing.
- Spreadsheets.
- Presentations.
- PDF viewing and basic document handling.
- Document and file utilities.

Default applications should be available immediately after installation.

### 7.3 System tools and utilities

Essential OS should provide practical tools for understanding and maintaining a computer.

Priority areas:

- System and hardware information.
- Task and process management.
- Storage and disk analysis.
- Network monitoring.
- Battery and power management.
- Bluetooth and connected devices.
- Backup and restore.
- Application management.
- File search and previews.
- Basic system diagnostics.

Utilities should expose understandable information rather than simply reproducing technical command-line output.

### 7.4 Games and entertainment

Include a small, curated collection of lightweight games.

The selection should favour:

- Small installation footprint.
- Good Linux compatibility.
- Offline play.
- Open-source licensing and redistributable assets where possible.
- Variety rather than quantity.

Media playback and common multimedia formats should work out of the box.

### 7.5 Wallpapers and personalization

The default installation should include a carefully curated photographic wallpaper collection.

Requirements:

- High-quality photography.
- Multiple visual themes and environments.
- Suitable resolutions for common desktop displays.
- Dark and light desktop compatibility.
- Offline availability.
- Clear redistribution licences and attribution.

The first-use experience should feel visually complete, drawing inspiration from the attention Windows and macOS give to wallpapers and desktop presentation.

Additional wallpaper collections can be distributed separately.

## 8. Intelligent interaction

Essential OS contains two separate intelligent systems. They may share read-only operating-system data services, but they do not share a registry, an interface or a decision policy.

| Characteristic | Ida | Sam |
|---|---|---|
| Product role | Personal assistant | OS search assistant |
| Primary purpose | Understand, assist and act | Retrieve and present OS information |
| Generative model | Yes, through Tier 2 | No |
| Reasoning | Yes, through Tier 2 | No |
| Voice | Voice-first | Primarily search UI; integration as required |
| Conversational memory | May maintain controlled context | None |
| Cache | Where useful | Bounded performance cache |
| Domain | General assistance and computer interaction | The computer itself |
| Web search | Can request it | Never invokes it itself |
| Multi-step work | Yes, through Hermes | No |
| OS integration | Uses approved executors and tools | Uses registered local sources and handlers |

### Sam: native search and retrieval

Sam is the native search assistant embedded in Essential OS. Its knowledge boundary is the computer it runs on: the operating system, installed applications, settings, hardware, devices, services, local documentation, indexed files and other permitted local information.

Sam is not a language model, chatbot, agent or general-purpose assistant. It recognises a supported intent, retrieves the matching registry entry, runs a predefined read-only handler and presents structured results. It does not reason, generate original explanations, hold a conversation or build a personal profile.

**Knowledge domains:** filesystem and local content; applications; settings and OS navigation; hardware and devices; live system state; networking; media and codecs; local documentation; and Essential OS itself.

**Out of domain:** general knowledge, current affairs, external research, open-ended explanation, creative writing, planning, multi-step agent work and general conversation. Sam returns a typed handoff rather than guessing.

**Technical direction:**

- deterministic, non-generative runtime;
- a versioned registry of domains, intents, phrasings, slots, handlers, templates and evaluation cases;
- hybrid retrieval: exact and lexical matching first, optional compact embeddings when useful, deterministic ranking and calibrated confidence thresholds;
- predefined, read-only handlers over approved local sources;
- a bounded operational cache with TTL and dependency invalidation — never personal memory;
- no network egress and no provider selection;
- structured results with provenance, freshness and constrained result actions;
- low resource cost, with 4 GB systems as the compatibility target.

**Status:** specified only; design stage, no implementation. See <https://github.com/luishowin/sam>.

### Ida: personal assistant

Ida is the personal assistant and an independent project. It is voice-first and local-first: it understands natural-language requests, resolves context, selects approved tools, controls the system through an executor, converses, reasons and delegates complex work to local or cloud models under a privacy gate.

Ida keeps its Tier 0 (deterministic commands), Tier 1 (small action model) and Tier 2 (advanced intelligence) architecture. Hermes remains the agent loop for multi-step work. Ida is the user-facing assistant and routing layer, not a competing agent framework.

Ida may use Sam as a specialised utility for OS search and information retrieval. Ida interprets Sam's results, explains them conversationally or decides that further reasoning is required.

Essential OS must remain fully usable without Ida. Ida's identity, memory, personal context and roadmap are not tied to Sam. Its personality and voice are its own and are not part of Sam.

**Status:** prototype to early architecture; Ida Core is implemented and released. See <https://github.com/luishowin/ida>.

### The boundary

- Sam proposes; the caller validates and acts. Sam has no execution path.
- Sam never chooses or invokes a web search, local model or cloud model. It returns a typed handoff and the calling layer decides.
- Ida's executor remains the single policy choke point for state-changing operations.
- A shared file, application or device catalogue must have one owner and one versioned interface. Sharing an index does not mean sharing memory, registries or policies.
- Sam and Ida have independent evaluation criteria and independent roadmaps.

## 9. Configuration, reproducibility and recovery

A clean installation should be reproducible without manually rebuilding the user's desktop.

The system should use version-controlled configuration, declarative package manifests and automated setup procedures.

### Configuration management

Maintain separate configuration layers:

1. Distribution defaults.
2. System-level configuration.
3. User-specific configuration.
4. Machine-specific configuration.
5. Personal data and backups.

Use appropriate tools for configuration management, dotfiles, package manifests and system provisioning.

Potential tools include Ansible and chezmoi, subject to evaluation.

### Backup and restoration

A user should be able to:

- Back up their Essential OS configuration.
- Reinstall the operating system.
- Restore their previous desktop preferences.
- Recreate their installed application collection.
- Restore personal data separately.

A clean restore should not depend on blindly copying an old `/etc` directory or overwriting system configuration.

Sensitive credentials must not be stored in public configuration repositories.

**Target:** Restore a prepared personal configuration profile in approximately one minute after a compatible Essential OS installation, excluding personal data transfer and any missing software downloads.

Configuration restoration should be idempotent, documented and reversible.

## 10. Distribution and installation

Essential OS should eventually be available as a complete bootable installation image.

### Distribution approach

Build the distribution using Fedora's established image composition and installation infrastructure.

The ISO should contain the same Essential OS packages and configuration used during development.

The initial image should provide an offline installation experience.

### ISO size targets

| Measure | Target |
|---|---:|
| Preferred ISO size | Approximately 3.0 GB |
| Maximum ISO size | 5.00 GB |
| Installation time | Under 5 minutes |
| Internet required during installation | No |
| Architecture | x86-64 initially |

ISO size refers to the final compressed distribution image.

The 3 GB figure is a preferred target, not a reason to compromise system integrity or application quality.

The 5 GB ceiling is a design constraint.

If the full application collection cannot fit within the target, applications should be curated, optimized or separated into optional packages.

### Installation experience

- Graphical installation.
- Sensible automatic partitioning.
- User account creation.
- Optional disk encryption.
- Minimal configuration requirements.
- Offline operation.
- Functional desktop immediately after installation.
- No mandatory post-installation downloads.

The installation-time target must be benchmarked on defined reference hardware, with documented storage, USB and encryption conditions. It is not a guarantee for every machine.

## 11. Security and privacy

Essential OS should preserve the security benefits of its underlying distribution.

Requirements:

- Enforced user permissions.
- SELinux enforcement where supported by the selected Fedora configuration.
- Verified package sources.
- Authenticated software updates.
- No unnecessary privileged services.
- No mandatory cloud account.
- No telemetry by default.
- Local storage of personal information.
- Explicit permissions for intelligent actions.
- Clear application and system security boundaries.

System changes should be understandable and reversible wherever practical.

## 12. Performance and reliability

Essential OS should be efficient at rest and responsive under normal workloads.

Performance targets should be established using repeatable measurements.

Areas of evaluation:

- Startup time.
- Application launch time.
- Desktop responsiveness.
- Idle CPU and memory usage.
- Battery consumption.
- Suspend and resume reliability.
- Disk usage.
- Graphics performance.
- Background service overhead.

Power management is a core product concern, not a late optimization.

Do not publish battery-life or performance claims without comparable measurements on named reference hardware.

## 13. Development milestones

### Phase 1: Essential Desktop

Build and test Essential OS as a desktop session on Fedora.

Deliverables:
- Installable RPM packages.
- Desktop session.
- Shell and core navigation.
- Launcher and window switching.
- Control centre.
- Basic Settings.
- System integration.
- Shared design system.

Exit condition: Essential OS can be installed, selected at login, used and removed without damaging existing desktop sessions.

### Phase 2: Essential Environment

Integrate the core application ecosystem.

Deliverables:
- Essential Files and system utilities.
- Appearance integration.
- Office applications.
- Core creative tools.
- Media playback.
- Wallpaper collection.
- Configuration and restore workflow.

Exit condition: A coherent everyday computing environment can be used without immediately installing additional software.

### Phase 3: Essential Ecosystem

Develop and integrate first-party applications.

Deliverables:
- Artcraft.
- Rawmakase.
- Additional utilities.
- Curated games.
- Sam, the native search and retrieval service.
- Expanded application integration.

Exit condition: The operating environment has a useful, cohesive application ecosystem.

### Phase 4: Essential OS Distribution

Create the bootable installation image.

Deliverables:
- Repeatable build pipeline.
- Fedora-based ISO.
- Offline installation.
- Graphical installer.
- Hardware testing.
- Package signing and verification.
- Installation and recovery documentation.

Exit condition: A clean installation can reliably produce a working Essential OS system within the established installation and image-size targets.

### Phase 5: Public preview and maintenance

Deliverables:
- Public installation image.
- Supported hardware matrix.
- Known issues.
- Security and update policy.
- Release notes.
- Feedback and issue reporting.
- Documented recovery procedures.

Exit condition: The project can responsibly maintain the system it releases.

## 14. Non-goals

Essential OS will not initially attempt to:

- Write a new Linux kernel.
- Replace the existing Linux driver ecosystem.
- Build a custom package manager.
- Replace systemd.
- Build a new audio or networking stack.
- Build a custom Wayland compositor without demonstrated need.
- Rewrite every third-party application.
- Guarantee universal application theming.
- Support every hardware configuration at launch.
- Become a mobile operating system in its first release.
- Require proprietary cloud services.
- Depend on Ida to perform ordinary desktop functions.

The eventual SLATE ultrabook remains a separate, speculative hardware project.

## 15. Open architectural decisions

The following require formal decisions and supporting prototypes:

1. Canonical desktop foundation: KDE Plasma, GNOME or a more independent shell built on selected existing infrastructure.
2. Compositor and window-management strategy.
3. First-party application toolkit and shared UI library.
4. Exact RPM packaging and repository structure.
5. Default filesystem and rollback strategy.
6. Installer and partitioning implementation.
7. Exact default creative and office application selection.
8. Sam interface, IPC mechanism, catalogue ownership and default-enabled domains.
9. Wallpaper distribution and licensing process.
10. Final minimum hardware requirements.

Decisions should be documented in the architecture decision record system and should supersede earlier decisions rather than silently rewriting project history.

## 16. Current project status

| Component | Status |
|---|---|
| Product philosophy and brand | Defined |
| Project architecture | Documented |
| Linux/Fedora direction | Chosen as current foundation |
| Fedora + KDE desktop assembly | Prototype |
| Canonical desktop base | Open question |
| Ida Core | Implemented / released |
| Ida capability and trust architecture | Implemented foundation |
| Sam architecture and boundary | Specified |
| Sam implementation | Not started |
| Desktop UI discovery | In progress, approximately 20% by current owner estimate |
| Design system | In progress |
| First-party application ecosystem | Planned |
| RPM packaging and DNF installation | Planned |
| Configuration restoration pipeline | Planned |
| Bootable ISO | Planned |
| SLATE hardware | Speculative |

---

## Product success statement

Essential OS succeeds when a person can install it, boot into a coherent desktop, explore their computer, create useful work, enjoy their free time and maintain their system without having to assemble the experience themselves.

The computer should feel complete without feeling restrictive.

**ESSENTIAL OS**

*Exploration. Creation. Play.*
