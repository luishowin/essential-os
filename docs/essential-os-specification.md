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
- Desktop search
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
- `essential-assistant`: optional lightweight action assistant

The exact package boundaries remain subject to implementation and dependency testing.

The canonical desktop base and window-management implementation remain subject to a formal architecture decision.

## 6. Desktop experience

The desktop should feel intentional, responsive and consistent.

### Core interface

- Desktop workspace
- Top panel or equivalent system information surface
- Dock or application access surface
- Application launcher
- Search
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

Essential OS may include a small, local-first action assistant.

This is distinct from Ida.

The bundled assistant's purpose is to provide a convenient, system-level interaction interface for common tasks, similar to a traditional voice or command assistant rather than a general-purpose chatbot.

### Intended capabilities

- Launch applications.
- Find files.
- Change common system settings.
- Control Bluetooth and Wi-Fi.
- Adjust power profiles.
- Manage reminders.
- Provide system information.
- Trigger registered application actions.

### Technical direction

- Keyboard-first interaction.
- Optional voice input.
- Deterministic command handling.
- Small local intent or action model where useful.
- Structured capability registry.
- Explicit permission and policy checks.
- Controlled execution and result verification.

The model must not execute arbitrary shell commands or bypass the operating system's permission model.

The assistant should remain optional, replaceable and independently maintainable.

Its product name is TBD.

### Ida

Ida remains Luis's personal assistant and an independent project.

Ida can integrate deeply with Essential OS, use its structured capabilities and eventually coordinate work across local and external computing resources.

Essential OS must remain fully usable without Ida.

Ida's identity, memory, personal context and development roadmap should not be tied to the generic assistant bundled with the operating system.

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
- Lightweight action assistant.
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
8. Action assistant implementation and model choice.
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
| Desktop UI discovery | In progress, approximately 20% by current owner estimate |
| Design system | In progress |
| First-party application ecosystem | Planned |
| RPM packaging and DNF installation | Planned |
| Configuration restoration pipeline | Planned |
| Bootable ISO | Planned |
| Lightweight bundled action assistant | Hypothesis |
| SLATE hardware | Speculative |

---

## Product success statement

Essential OS succeeds when a person can install it, boot into a coherent desktop, explore their computer, create useful work, enjoy their free time and maintain their system without having to assemble the experience themselves.

The computer should feel complete without feeling restrictive.

**ESSENTIAL OS**

*Exploration. Creation. Play.*
