# Research library and reference sources

**Status:** Living record · **Date:** 2026-10-27

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

## First-party development

- [GTK and Rust](https://www.gtk.org/docs/language-bindings/rust) — official GTK
  overview of Rust bindings.
- [GUI development with Rust and GTK 4](https://gtk-rs.org/gtk4-rs/stable/latest/book/)
  — hands-on foundation for a first-party app prototype.
- [GTK 4 API reference](https://docs.gtk.org/gtk4/) — API details; pair with the
  exact GTK version available in the target image.

## Fedora, updates and reliability

- [Fedora Spins Guidelines](https://fedoraproject.org/wiki/Spins_Guidelines) —
  expectations around tested, installable Fedora spins; a personal downstream
  project is not automatically an official Fedora Spin.
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
