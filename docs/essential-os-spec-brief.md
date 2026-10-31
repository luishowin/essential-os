# ESSENTIAL OS
## Product and Technical Specification Brief

**Version:** 0.1 — Working brief  
**Date:** 24 October 2026  
**Status:** Direction agreed; implementation choices remain open  
**Purpose:** Consolidate the current product vision, desktop architecture, application bundle, update strategy, and engineering principles into one reference document.

> **Core proposition:** Essential OS should make an open Linux desktop feel deliberately designed and ready for creative work, while reusing mature Linux infrastructure for hardware support, security, and system maintenance.

---

## 1. Executive summary

Essential OS is an open-source, design-led Linux desktop operating system inspired by the coherence and polish of Apple's desktop experience, but built around Linux flexibility, open standards, user control, and long-term ownership. Its distinctiveness should come primarily from its interface, system integration, curated applications, and interaction quality—not from rewriting every underlying component.

The proposed architecture is to own the Essential OS desktop shell and design system while initially reusing an established Wayland compositor and a maintained Linux distribution as the system foundation. Kernel updates, firmware, supported drivers, graphics infrastructure, security fixes, and core system packages should come from upstream distribution repositories. Essential OS would maintain its own shell, first-party applications, app curation, installer/image, release testing, and user experience.

The desktop should minimize third-party dependencies where practical, especially in the visible shell and Essential OS-specific functionality. This is not a rule to reinvent mature infrastructure. Each dependency should justify its maintenance cost, security surface, and role in the product. A small set of well-maintained dependencies is preferable to a large chain of fragile plugins; a trusted upstream component is preferable to a custom security-sensitive implementation that the project cannot adequately maintain.

The intended software experience includes the ArtCraft suite of creative applications and RAWmakase as a RAW photography workflow tool. The long-term goal is to deliver them preinstalled and coherently integrated. Their current development maturity must be reflected honestly: the official ArtCraft app directory currently describes three apps as early alpha and the others as in development; RAWmakase's project warns that it remains pre-1.0 and that rendering and backward compatibility may change. Essential OS must therefore curate versions, test updates, preserve user data, and visibly distinguish mature software from preview software.

## 2. Product vision and principles

### 2.1 Vision

Deliver a cohesive, open-source operating system that feels intentional from the first boot: a restrained visual language, consistent controls, smooth but purposeful motion, useful native applications, good hardware integration, and a creative software environment that does not require users to spend hours assembling it themselves.

Essential OS is not simply a theme applied to a generic desktop. It is a product with an owned interface and a maintained compatibility contract, built on the wider Linux ecosystem rather than isolated from it.

### 2.2 Guiding principles

1. **Own the experience.** Essential OS controls its shell, interaction model, visual language, application defaults, onboarding, and release experience.
2. **Reuse the foundation.** Use upstream kernel, firmware, driver, graphics, authentication, audio, networking, and system-service projects wherever they provide mature, maintained interfaces.
3. **Minimize dependencies deliberately.** Reduce unnecessary dependencies, plugins, background services, and duplicated system components. Do not equate fewer dependencies with better security by itself.
4. **Rust-first, not Rust-at-any-cost.** Prefer Rust for new Essential OS components where it is a good fit. Do not rewrite reliable components merely to satisfy a language preference.
5. **Open source and auditable.** Publish source for Essential OS-specific software, document licenses, track upstream dependencies, and make security and update policies understandable.
6. **Protect user work.** System and application updates must not casually break projects, photos, catalogs, preferences, or personal data. Backups, migration behavior, and rollback are product requirements.
7. **Design for real hardware.** The desktop must be tested on actual laptops, including suspend/resume, Wi-Fi, Bluetooth, audio, brightness, power profiles, external displays, scaling, and battery life.
8. **Polish with purpose.** Blur, transitions, animations, sounds, and hardware feedback should improve clarity and perceived quality without making the interface slow, distracting, or power-hungry.
9. **Curate, do not merely bundle.** Preinstalled software should have clear provenance, a known version, an update policy, file associations, and documented maturity.

### 2.3 Related product direction

The broader Essential OS concept includes modular hardware, repairability, direct and transparent interaction with hardware, small native Rust applications, and an “alive” interface with carefully chosen micro-animations and hardware feedback. A future lightweight Essential OS laptop concept—sometimes referred to as Slate—can inform performance and portability targets, but the initial OS should work on compatible general-purpose laptops rather than depend on custom hardware.

Future integrations such as Ida, the local-compute-first assistant, should be possible through documented APIs and OS actions, but should remain separately scoped from the initial desktop-shell MVP.

## 3. Goals and non-goals

### Goals

- Ship an Essential OS-branded installation with a coherent, first-party desktop shell.
- Make Wayland the preferred display architecture.
- Reuse an established compositor initially rather than writing a complete compositor as the first milestone.
- Deliver kernel, hardware support, firmware, and security maintenance through an established distribution.
- Preinstall and coherently integrate the ArtCraft creative suite and RAWmakase, with version pinning or tested update promotion.
- Keep Essential OS-specific UI cohesive and mostly implemented in Rust where practical.
- Provide a transparent update path, data-preserving upgrades, recovery guidance, and an eventual rollback-capable system-image model.
- Build the project as an open-source system with explicit dependency and release policies.

### Non-goals for the first release

- Writing a new Linux kernel, driver stack, package manager, init system, authentication system, audio server, or networking stack.
- Building a complete Wayland compositor from scratch before the shell and product experience are validated.
- Promising that every upstream creative application is production-stable merely because Essential OS includes it.
- Supporting every desktop compositor or every hardware model on day one.
- Reimplementing every application feature that an existing open-source project already provides well.

## 4. Desktop architecture: terminology and mental model

Linux desktops are assembled from related components. They are not always separate programs: mature desktop environments often combine or coordinate several responsibilities.

- **Desktop environment (DE):** A complete desktop experience: shell, window management, settings, app integration, notifications, and often a family of apps. Examples: GNOME and KDE Plasma.
- **Desktop shell:** The interface around applications: panel, dock, launcher, menus, quick settings, notifications, widgets, overview, and related interaction. Examples: GNOME Shell and Omarchy Shell, which is built with Quickshell.
- **Window manager (WM):** Controls window placement, sizing, focus, stacking or tiling, and switching. A floating WM behaves more like a conventional desktop; a tiling WM automatically arranges windows.
- **Compositor:** Combines window surfaces into the final display image and commonly provides effects, frame scheduling, and display composition. On Wayland it commonly also acts as the display server and window manager. Examples include Hyprland, Mutter, and KWin.
- **Display protocol / architecture:** Defines how applications communicate their surfaces and input with the display system. Wayland is the preferred modern architecture; X11 is the older system.
- **Display manager:** Presents the graphical login and starts a user session. GDM is one example. It is distinct from the desktop shell.
- **UI toolkit:** Supplies widgets, drawing, accessibility, and interaction primitives used to build interfaces. GTK and Qt Quick/QML are examples. Toolkits bring dependencies of their own.
- **Base distribution:** Packages the kernel, libraries, firmware, system services, security fixes, installer, and repositories. Fedora and Ubuntu LTS are examples.

### 4.1 Wayland and X11

Wayland is the preferred direction for Essential OS. In a Wayland session, the compositor is central to window composition and input handling. This can simplify the conceptual architecture and gives Essential OS a modern base for scaling, effects, input security, and future display features.

X11 is the older window-system architecture. Essential OS should not target X11 as its primary session, but should retain Xwayland support for legacy applications where the selected compositor and distribution provide it. This offers compatibility without making X11 the foundation of the Essential OS shell.

Wayland does not itself provide a desktop environment, shell, dock, or window manager. Those are built around it.

### 4.2 The Omarchy reference

Omarchy illustrates a modular approach: Hyprland provides Wayland compositor and window-management functionality; Quickshell is used to build visible desktop-shell components. Quickshell is a toolkit based on Qt Quick/QML, not a complete desktop environment by itself.

This separation is architecturally useful: changing the shell does not inherently require replacing the compositor. However, Essential OS should not copy the stack blindly. Quickshell, Hyprland, and other candidates must be evaluated against the project's dependency, stability, security, accessibility, power, and maintenance requirements.

## 5. Proposed Essential OS desktop architecture

### 5.1 Layered design

**Layer A — Essential OS shell and UX (first-party):** panel/top bar, dock, application launcher, overview/workspaces UI, quick settings, notifications, system menus, desktop surfaces, shortcut model, consistent transitions, theming, and Essential OS-specific settings presentation. This is the primary area of product ownership.

**Layer B — Compositor and window management (upstream initially):** one established Wayland compositor handles window lifecycle, focus, workspaces, display outputs, rendering, and input integration. Essential OS adds a narrow compatibility adapter for compositor-specific commands rather than scattering compositor-specific calls throughout the shell.

**Layer C — Linux desktop services (upstream):** use the distribution's established services for audio, networking, Bluetooth, power profiles, device discovery, authentication, mounting, printing, and similar functions. Essential OS should provide a consistent UI for these services rather than implement competing daemon infrastructure.

**Layer D — Base operating system (upstream):** kernel, drivers, firmware, Mesa/graphics components, systemd and core libraries, security fixes, package management and supported update channels.

### 5.2 Shell implementation

The preferred direction is a first-party shell, with Rust as the default implementation language for Essential OS-specific logic. It should use an established UI and rendering toolkit rather than immediately creating a custom rendering engine and widget system. The toolkit decision remains open and should be made through a small technical prototype measuring accessibility, Wayland layer surfaces, HiDPI scaling, input, performance, dependency footprint, maintainability, and developer ergonomics.

Quickshell is a useful prototype or reference option, particularly for rapidly testing a custom shell. Its Qt Quick/QML foundation and integrations can reduce initial work, but also introduce a meaningful toolkit dependency. A Rust-native approach may align better with the long-term language preference, but does not automatically reduce total dependency count or engineering effort.

**Recommendation:** prototype the Essential OS shell independently from the compositor; define internal interfaces for window actions and shell services; keep the UI toolkit and compositor replaceable at the architecture boundary; avoid promising full compositor portability until tested.

### 5.3 Compositor selection

Do not build a custom compositor for the initial release. Prototype against an established Wayland compositor. Hyprland is a candidate because it demonstrates composable, animated desktop behavior and is the stack used by Omarchy, but it is not automatically the final choice.

Evaluate the selected compositor for: release quality, security response, protocol support, HiDPI, multi-monitor setups, suspend/resume, screen recording and sharing, accessibility, keyboard navigation, fractional scaling, GPU compatibility, laptop power use, Xwayland compatibility, and the availability of stable integration interfaces.

If the selected compositor requires private IPC for essential operations, isolate that dependency behind an Essential OS adapter and document it. Keep a fallback session or recovery path available during development.

A future Rust compositor built using a project such as Smithay is a possible longer-term research path, not an MVP commitment. Smithay provides reusable building blocks for Wayland compositors; it is not a complete drop-in compositor. A custom compositor would substantially expand the security, hardware-compatibility, and long-term maintenance burden.

### 5.4 Security boundaries

- Run the shell and normal desktop applications as the logged-in user, not as root.
- Delegate privileged actions to established system services and authorization mechanisms.
- Treat authentication, lock-screen enforcement, display-manager behavior, and session startup as security-sensitive. Reuse trusted components initially rather than building a lock screen that merely looks correct.
- Do not let the shell execute arbitrary privileged commands from UI strings or plugin configuration.
- Separate shell UI concerns from system service calls and keep a narrow, auditable API between them.

## 6. Base operating system and update strategy

### 6.1 Requirement

Essential OS should receive upstream kernel updates, security fixes, firmware, supported hardware drivers, graphics-stack updates, and core system maintenance. The project should not create an independent kernel or driver maintenance program unless there is a specific, justified need.

The distribution foundation is therefore a strategic decision. Its release lifecycle shapes how often Essential OS must validate major upgrades and how long it can support a stable release.

### 6.2 Candidate foundations

**Fedora**

- **Advantages:** Current kernel and desktop stack; close fit with the project's current Fedora development environment; broad developer tooling.
- **Trade-offs:** Fedora releases approximately every six months and each release receives about 13 months of updates, so Essential OS must plan frequent base upgrades. Fedora is not an official LTS base.
- **Initial assessment:** Strong prototype base and potentially a good choice if the project prioritizes newer hardware support over long upgrade intervals.

**Ubuntu LTS**

- **Advantages:** Five years of standard security maintenance for packages in the Main repository; slower, predictable LTS cadence; established hardware and commercial ecosystem.
- **Trade-offs:** Not every package in every repository has the same support scope; newer hardware may require supported hardware-enablement stacks or additional validation; some creative-app packaging may need more work.
- **Initial assessment:** Strong candidate if long-lived, lower-frequency Essential OS releases are the top priority.

The source distribution's security window is not automatically a support guarantee for Essential OS's own shell or third-party apps. Essential OS must separately maintain what it ships and be clear about package support coverage.

### 6.3 Recommendation

Use Fedora for the earliest prototype because it reduces friction for development and provides a familiar, current environment. Before declaring a stable public release strategy, make a deliberate decision between Fedora's faster-moving base and an LTS-oriented base such as Ubuntu LTS. Do not imply that a Fedora-based release has LTS support simply because Essential OS intends to be stable.

Evaluate an image-based operating-system model—such as Fedora's image-mode ecosystem or bootc—after the prototype proves the shell architecture. An image-based model could make the system easier to reproduce, update atomically, validate as a complete unit, and potentially roll back. It also requires an intentional application-installation strategy and a well-maintained image build pipeline.

### 6.4 Update channels and responsibilities

- **Base-system updates:** sourced from the chosen distribution's supported repositories or official image stream.
- **Essential OS shell updates:** first-party releases, tested against supported compositor and system versions.
- **Creative application updates:** curated packages or verified upstream releases, tested before promotion to the default stable channel.
- **Firmware and proprietary drivers:** handled according to upstream distribution policies and hardware support; do not promise universal support for every device.
- **Major OS upgrades:** a documented migration path, pre-upgrade checks, user data preservation, recovery instructions, and testing on representative hardware.

The product should show update status and communicate when a reboot is required. Security updates should not be blocked indefinitely by cosmetic shell work. When a base update introduces a regression, provide clear recovery guidance and, where the chosen update model supports it, rollback to a known-good system deployment.

## 7. Creative software experience

### 7.1 ArtCraft suite

Essential OS should ship with the ArtCraft suite as a central part of its creative-workstation identity. The official suite lists 13 open-source creative and productivity projects, primarily built in Rust:

**PhotoCraft** (image editing); **VectorCraft** (vector illustration); **FilmCraft** (video editing); **LightCraft** (photo library and RAW development); **PdfCraft** (PDF workbench); **EffectCraft** (motion graphics and visual effects); **DesignCraft** (page layout and publishing); **FigCraft** (interface design and prototyping); **WordCraft** (word processing); **SoundCraft** (digital audio workstation); **DeckCraft** (presentations); **CADCraft** (computer-aided design and drafting); **GridCraft** (spreadsheets and data analysis).

The intended experience is not simply to install the binaries. Essential OS should provide proper application names and icons, searchable launcher entries, sensible MIME/file associations, consistent launch behavior, documentation links, and a tested update policy.

The suite's current maturity makes release governance critical. The official app directory currently marks PhotoCraft, PdfCraft, and FigCraft as early alpha and describes the other listed apps as in development. Those statuses can change and must be rechecked before each Essential OS release. Essential OS must not describe the entire suite as production-stable until its own release criteria justify doing so.

### 7.2 RAWmakase

Preinstall RAWmakase as a dedicated RAW-photography tool and evaluate it alongside ArtCraft's LightCraft. The two apps may overlap in some workflows; Essential OS should avoid confusing users by defining their intended roles based on actual testing rather than assuming one is a replacement for the other.

RAWmakase is a non-destructive RAW developer written in Rust, available for Linux among other platforms, with catalog-based edits and exports. Its upstream project currently states that it is in active, pre-1.0 development; rendering can change between versions and backward compatibility is not guaranteed. Its documentation advises keeping exports of finished work. Essential OS must expose this reality in preview builds and avoid silently updating the app in a way that changes a user's established rendering results without notice.

### 7.3 Stable OS versus stable applications

An Essential OS LTS release does not make every bundled app an LTS app. Upstream may not offer long-term-support branches or commit to backward compatibility for the same duration as the OS.

Essential OS should maintain an **Essential OS Verified** application set: a known list of app versions tested against each OS release. Pin or constrain application versions where necessary, test updates, and promote versions deliberately. Where an upstream app remains experimental, provide an honest maturity label and a way to separate preview updates from the stable system channel.

The preferred user experience is for the suite and RAWmakase to be present from first boot. During development and preview releases, the full suite can be installed by default with clear maturity labels. For a production release, each app's default status should depend on its Essential OS quality gate. If it does not meet the stable bar, the project should decide explicitly whether to keep it installed in a clearly labeled Preview group or move it to an easy-to-install optional bundle—not misrepresent its state.

### 7.4 App lifecycle and user data

- Keep originals, catalogs and project files in user-owned locations, not inside disposable system-image paths.
- Back up or migrate application settings and catalogs deliberately.
- Test uninstall/reinstall and OS upgrade flows to ensure they do not delete user files.
- Preserve exported final deliverables for creative apps whose rendering or file compatibility may change between versions.
- Publish the packaged version and upstream source for each included app.
- Provide a clear path for users to report a bug to Essential OS versus upstream.

## 8. Dependency and open-source policy

Essential OS should minimize third-party dependencies in the desktop experience while reusing trusted system infrastructure. It should not optimize for the smallest possible dependency count at the expense of accessibility, security, reliability, or maintainability.

### Dependency policy

1. **Every dependency has an owner and a reason.** Record what it does, why it is needed, its license, upstream, update path, and whether it is required at runtime or only at build time.
2. **Prefer stable protocols and APIs.** Avoid unnecessary reliance on undocumented/private interfaces. When unavoidable, isolate and test the adapter.
3. **Choose one coherent UI toolkit for first-party shell work.** Avoid accumulating multiple widget frameworks for small shell components.
4. **Avoid plugin sprawl.** Built-in shell capabilities should be preferred over a long list of extensions that each require separate maintenance.
5. **Reuse mature services.** Do not implement competing daemons for audio, network, Bluetooth, device discovery, authentication, or power management without a compelling justification.
6. **Track security and licenses.** Maintain a software bill of materials, monitor upstream advisories, and define a process for vulnerable or abandoned dependencies.
7. **Keep the shell modular.** The shell's UI should not directly own every system interaction. Use narrow service adapters and documented interfaces.
8. **Contribute fixes upstream where feasible.** Avoid permanent private forks. If a fork is necessary, document why, track divergence, and assign maintenance ownership.

All Essential OS-specific code should be open source under a clearly stated license. Upstream applications may use their own licenses; include attribution, license texts, notices, and any required source availability. “Open source” should mean the actual source and build instructions are available—not merely that a binary is downloadable.

## 9. Visual and interaction requirements

The visual system should be restrained, consistent, and deliberately composed rather than a collection of unrelated theme tweaks.

- Establish shared tokens for color, typography, spacing, corner radii, shadows, blur, motion and density.
- Build reusable components for panels, menus, dialogs, controls, toasts, system status, app launchers and settings surfaces.
- Support keyboard navigation and discoverable shortcuts alongside pointer and touchpad use.
- Provide accessible contrast, clear focus indicators, scalable text, and reduced-motion behavior.
- Keep animations short and purposeful; provide an option to reduce or disable motion and effects.
- Treat blur and transparency as progressive enhancements, not requirements for readability or function.
- Design for dark and light modes if both are in scope; define the first-release mode decision rather than allowing apps to drift.
- Test real display scaling, fractional scaling where supported, multiple monitors, screen recording, screenshots and mixed-DPI arrangements.
- Keep battery use and idle resource use measurable, especially for the panel, status polling, blur, animations and background services.

The desired “alive” quality can include subtle interaction sounds and future hardware feedback, but it must remain configurable, respect accessibility and privacy, and never compromise battery life or task focus.

## 10. Quality, security, and release requirements

### 10.1 Minimum desktop acceptance tests

A release candidate should pass, at minimum:

- Clean installation and first boot on the supported hardware list.
- Login, logout, lock, unlock, session restart and recovery behavior.
- Launch, focus, resize, move, tile, minimize, close and switch between applications.
- Keyboard navigation and shortcuts without requiring pointer use for core tasks.
- Wi-Fi reconnect, Bluetooth pairing, audio input/output, microphone privacy behavior, brightness and battery reporting.
- Suspend/resume, lid close/open, charging-state changes and power-profile behavior on laptops.
- External display connection/disconnection, supported resolutions, scaling and multi-monitor placement.
- Screen capture/recording and legacy application compatibility through Xwayland where applicable.
- Full system update, shell update, application update, interrupted-update recovery and documented rollback behavior.
- OS upgrade checks for user files, browser profile, application settings, RAW catalogs and creative project files.
- Dependency/license scan and review of known critical/high-severity vulnerabilities before release.

### 10.2 Security expectations

- Use upstream signed packages or verified, signed release artifacts wherever available.
- Publish checksums/signatures for Essential OS images and first-party releases.
- Define how security vulnerabilities are reported, triaged and disclosed.
- Maintain a supported-version policy and communicate end-of-support dates.
- Ship sensible firewall, permissions, update, and default-service behavior without adding opaque or unnecessary background services.
- Avoid collecting telemetry by default. Any diagnostic reporting should be transparent, minimized, optional where practical, and documented.
- Do not claim that open source alone guarantees security; security also depends on review, maintenance, patch delivery and operational discipline.

### 10.3 Reliability and observability

Provide a small, clear diagnostics path for failed shell launches, compositor startup, failed updates and hardware issues. Logs should be useful to troubleshoot and should avoid unnecessarily collecting personal data. Make it possible to fall back to a basic session or terminal/recovery mode if the Essential OS shell fails.

## 11. Delivery roadmap

### Phase 0 — Architecture spike

- Select a short list of candidate compositors and UI technologies.
- Build a minimal shell prototype: panel, app launcher, a basic status menu, and window/workspace interactions.
- Validate keyboard accessibility, HiDPI, multi-monitor, sleep/resume and resource use on representative laptops.
- Compare Fedora and Ubuntu LTS as base candidates against the same test matrix.
- Decide how ArtCraft and RAWmakase will be packaged, updated and separated into stable versus preview tracks.

### Phase 1 — Developer preview

- Produce a reproducible install image or install procedure.
- Implement shell navigation, dock/panel, launcher, quick settings, notifications, themes and keyboard shortcuts.
- Use the distro's established system services and authorization stack.
- Preinstall the ArtCraft suite and RAWmakase with maturity labels and clear update policies.
- Publish source, build instructions, dependency manifest, known issues and recovery guidance.

### Phase 2 — Beta

- Freeze the shell interaction model and visual system enough to test consistently.
- Establish a supported hardware list and automate core update and regression checks.
- Validate OS upgrades, user-data migrations, app catalogs, external displays and power behavior.
- Select the long-term base-distribution strategy and define the support window.
- Test image-based/atomic updates as a possible deployment mechanism without making them a prerequisite before evidence supports the change.

### Phase 3 — Essential OS 1.0

- Publish a stable install image, support policy and explicit hardware baseline.
- Promote only applications that meet the defined quality bar to the stable app channel; label any included preview apps accurately.
- Provide documented upgrade, recovery, backup and vulnerability-reporting paths.
- Make app and shell updates independently maintainable where feasible, while keeping compatibility tested as a system.

### Phase 4 — Long-term support release

- Define the actual LTS duration, support scope, security patch responsibilities and end-of-support date before marketing a release as LTS.
- Maintain a tested OS image and application version set during the support window.
- Provide a supported major-upgrade path and clear rules for backporting security fixes versus adding new features.
- Consider a custom Rust compositor only if product requirements, contributor capacity and maintenance funding justify it.

## 12. Key risks and mitigations

**Creative apps remain pre-1.0 for longer than expected.** Users may encounter breaking changes or changing renders. Mitigation: version pinning, explicit maturity labels, tested updates, export/backup guidance, and stable-versus-preview channels.

**Too much custom desktop infrastructure too early.** Delivery slows and security, compatibility, and accessibility burdens rise. Mitigation: own the shell and design; reuse the compositor and system services; defer custom-compositor research.

**Base distribution has too short a support window.** Major upgrades require frequent testing and maintenance. Mitigation: decide the LTS strategy before 1.0; compare support cost, kernel freshness, and hardware needs.

**Too many third-party shell dependencies.** Upgrade breakage and security surface increase. Mitigation: enforce the dependency policy, choose one UI toolkit, avoid plugin sprawl, track the software bill of materials, and isolate adapters.

**Shell is tightly coupled to one compositor.** Changing the backend later becomes expensive. Mitigation: use an explicit compositor adapter and protocol-first design; test portability where it provides real value.

**New shell misses laptop edge cases.** Suspend, battery, display, input, or session behavior may break. Mitigation: test a hardware matrix early, not after visual polish.

**A system update breaks the session.** Users may be unable to reach their desktop. Mitigation: test known-good releases, provide a recovery session, support rollback where possible, and release shell updates independently when feasible.

## 13. Decisions and open questions

### Direction already established

- Essential OS should be open source and own its desktop experience.
- A cohesive first-party shell is preferred over a desktop assembled from many unrelated extensions.
- Rust is the preferred language for new Essential OS-specific components where practical.
- Avoid unnecessary third-party dependencies, but reuse mature system infrastructure.
- The system must receive upstream kernel, drivers/firmware and security updates.
- ArtCraft and RAWmakase should be part of the default creative experience.
- Stability and long-term support matter; upstream application maturity must be treated honestly.

### Recommendations in this brief, not yet final decisions

- Use Fedora for the prototype because it is the current development environment; compare against Ubuntu LTS before a long-term release commitment.
- Use Wayland as the primary display architecture and support Xwayland for relevant legacy apps.
- Start with an existing compositor. Evaluate Hyprland as a candidate, but do not lock the product to it without testing.
- Build a first-party Rust shell using one chosen UI toolkit; decide between candidates through a technical spike.
- Evaluate image-based/atomic update delivery after the shell prototype is validated.

### Decisions still required

1. Which base distribution and support window will underpin Essential OS 1.0?
2. Which compositor is the supported default, and what are the supported integration interfaces?
3. Which UI toolkit should the first-party shell use?
4. Will the first stable release be conventional-package-based or image-based?
5. Which ArtCraft apps meet the stable preinstallation bar, and how should preview apps be displayed and updated?
6. How will third-party apps be packaged and updated: distribution packages, Flatpak, AppImage, upstream installers, or a carefully managed mix?
7. What hardware list defines the first official support promise?
8. What is the exact LTS duration and who owns security maintenance for each shipped layer?

## 14. Reference links

These sources inform the current technical assumptions and should be rechecked before a release decision. Project maturity and support policies can change.

**ArtCraft — Crafting Apps:** [Official app directory](https://getartcraft.com/apps) — the app list and current maturity labels.

**RAWmakase official repository:** [GitHub repository](https://github.com/pch/rawmakase) — platform support, app capabilities, release and compatibility warnings.

**Quickshell — About:** [Official overview](https://quickshell.org/about/) — explains Quickshell as a Qt Quick/QML desktop-shell toolkit and lists built-in integrations.

**Smithay project:** [GitHub repository](https://github.com/Smithay/smithay) — Rust building blocks for Wayland compositors; not a complete compositor.

**Fedora release lifecycle:** [Fedora Project Wiki](https://fedoraproject.org/wiki/Fedora_Release_Life_Cycle) — Fedora release cadence and support window.

**Ubuntu release cycle:** [Official release lifecycle](https://ubuntu.com/about/release-cycle) — LTS and standard security-maintenance periods.

**bootc update service documentation:** [bootc documentation](https://bootc-dev.github.io/bootc/man/bootc-fetch-apply-updates.service.5.html) — image-based update workflow concepts.

**Wayland architecture:** [Wayland documentation](https://wayland.freedesktop.org/architecture.html) — display-system architecture background.
