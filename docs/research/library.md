# Research library and reference sources

**Status:** Living record · **Date:** 2026-10-31

Use primary sources first. For each meaningful source, store the exact page,
date checked, useful section, a 2–5 sentence summary in your own words, and the
decision or question it informs. Do not turn research into an ever-growing
bookmark pile.

This is the reference shelf. The running record of what was learned lives in
[project-log.md](project-log.md) and [ida-history.md](ida-history.md).

## Product and UX

- [GNOME Human Interface Guidelines](https://developer.gnome.org/hig/) —
  patterns for navigation, UI styling, accessibility, text, icons, keyboard and
  scaling. Use as a reference, not as a requirement to copy GNOME's product
  identity.
- [GNOME accessibility guidelines](https://developer.gnome.org/hig/guidelines/accessibility.html)
  — keyboard-only, text-size, high-contrast and screen-reader checks to
  incorporate into component definitions.
- [W3C Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/TR/WCAG22/)
  — baseline reference for the website; selectively relevant to desktop
  patterns, but do not claim the desktop is WCAG-certified.

## Linux desktop integration

- [XDG Desktop Portal Settings interface](https://flatpak.github.io/xdg-desktop-portal/docs/doc-org.freedesktop.portal.Settings.html)
  — standardised appearance preferences include colour scheme and accent
  colour; support is opt-in and the portal is not a complete settings database.
- [Flatpak desktop integration / theming](https://docs.flatpak.org/en/latest/desktop-integration.html)
  — how GTK/Qt theme extensions and portals interact with sandboxed apps. Avoid
  broad filesystem permissions just to impose styling.
- [XDG File Chooser portal](https://flatpak.github.io/xdg-desktop-portal/docs/doc-org.freedesktop.portal.FileChooser.html)
  — standard file-picker integration useful for sandboxed applications.
- [Wayland protocol explorer: xdg-shell](https://wayland.app/protocols/xdg-shell)
  — key window and popup protocol surface; use it when evaluating compositor or
  shell integration.
- [wlroots documentation](https://wlroots.pages.freedesktop.org/wlroots/) — one
  reference option if considering a wlroots-based Wayland compositor; evaluate
  maintenance and feature coverage before adopting it.
- [Wayland architecture](https://wayland.freedesktop.org/architecture.html) —
  background on the compositor as display server, input router and window
  manager; read before deciding how much session ownership is appropriate.

## Desktop shell and toolkits

- [Quickshell — About](https://quickshell.org/about/) — a Qt Quick/QML toolkit
  for building desktop-shell components, not a complete desktop environment.
  Useful as a prototyping reference for a custom shell; carries a QML/Qt
  dependency.
- [Smithay](https://github.com/Smithay/smithay) — Rust building blocks for
  Wayland compositors, not a drop-in compositor. Relevant only to the longer-term
  research path, not the initial release.

## First-party development

- [GTK and Rust](https://www.gtk.org/docs/language-bindings/rust) — official GTK
  overview of Rust bindings.
- [GUI development with Rust and GTK 4](https://gtk-rs.org/gtk4-rs/stable/latest/book/)
  — hands-on foundation for a first-party app prototype.
- [GTK 4 API reference](https://docs.gtk.org/gtk4/) — API details; pair with the
  exact GTK version available in the target image.

## Creative applications

- [ArtCraft — the crafting apps](https://getartcraft.com/apps) — the official
  app directory and current maturity labels. Statuses change; recheck before each
  release and do not describe the suite as stable until the project's own gates
  justify it.
- [RAWmakase](https://github.com/pch/rawmakase) — non-destructive RAW developer
  in Rust. The project is pre-1.0: rendering can change between versions and
  backward compatibility is not guaranteed, so exports and update policy matter.

## Fedora, updates and reliability

- [Fedora Spins Guidelines](https://fedoraproject.org/wiki/Spins_Guidelines) —
  expectations around tested, installable Fedora spins; a personal downstream
  project is not automatically an official Fedora Spin.
- [Fedora release lifecycle](https://fedoraproject.org/wiki/Fedora_Release_Life_Cycle)
  — release cadence and support window. Fedora is not an LTS base; each cycle
  must be planned for.
- [Ubuntu release cycle](https://ubuntu.com/about/release-cycle) — the LTS
  alternative, with its own support and hardware-enablement trade-offs.
- [bootc update service](https://bootc-dev.github.io/bootc/man/bootc-fetch-apply-updates.service.5.html)
  — image-based update workflow concepts, relevant to evaluating an atomic
  deployment model after the shell prototype.
- [OSTree overview](https://ostreedev.github.io/ostree/introduction/) —
  architecture for deploying complete filesystem trees.
- [OSTree atomic upgrades](https://ostreedev.github.io/ostree/atomic-upgrades/) —
  how atomic deployment and upgrades work conceptually.
- [OSTree atomic rollbacks](https://ostreedev.github.io/ostree/atomic-rollbacks/) —
  rollback concepts and options. Verify which mechanism the selected image
  approach uses.

## Security and operations

- [OpenSSF Development and Support self-assessment](https://security-assessments.openssf.org/self-assessment/development-and-support/)
  — release pipeline, dependency, vulnerability-reporting and support practices
  to adapt as the project matures.
- [GitHub Pages custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)
  — official static-site publishing and domain setup reference.
- [GitHub Actions billing and usage](https://docs.github.com/en/actions/concepts/billing-and-usage)
  — confirm current build quota and costs before automating heavyweight OS-image
  jobs.

## Research entry template

```text
Title:
URL:
Date checked:
Primary / secondary source:
Question this answers:
Relevant finding (in your own words):
Limitations / assumptions:
Decision or issue affected:
Next action:
```

## Research rules

- Prefer upstream docs, standards and source repositories to tutorials for
  architectural decisions.
- Use tutorials to learn the mechanics, not as the sole basis for security or
  compatibility choices.
- Record version numbers when an API is version-sensitive.
- Distinguish an upstream guarantee, a local experiment, a personal opinion and
  an untested assumption.
- Recheck critical links when a dependency version or release target changes.
