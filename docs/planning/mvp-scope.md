# First release scope and non-goals

**Status:** Planned · **Date:** 2026-10-27

## Product slice to prove

The first Essential OS preview should prove that a custom, coherent desktop
experience can be delivered on a maintainable Linux foundation. It is not a
proof that one person can rebuild every layer of a commercial operating system
at once.

## Proposed first-preview scope

### Essential
- Boots and reaches a usable desktop session in a VM.
- Distinctive Essential visual system: palette, typography, icon direction,
  spacing, shapes, motion and window/panel behaviour.
- Application launcher and basic window switching.
- One consistent system/control surface and a small, functional Settings area.
- Battery, storage and system information shown using system-provided data;
  unavailable readings are handled honestly.
- One useful first-party utility implemented against shared components.
- System fonts, icon theme and supported GTK/Qt appearance integration.
- A repeatable build, documented installation/test method, error reporting and
  known limitations.
- Keyboard operation, visible focus, text scaling, contrast consideration and
  reduced-motion support.

### Nice-to-have only if the core is stable
- Themed login/greeter polish while retaining existing authentication
  mechanisms.
- A small collection of custom icons.
- Theme chooser for built-in presets.
- Simple update/recovery UI backed by proven system mechanisms.

## Explicit non-goals for the first public preview

- A new Linux kernel, driver stack, display server, package manager or init
  system.
- A universal guarantee that every third-party app adopts Essential's full
  styling.
- An original replacement for every GNOME/KDE/system utility.
- A full creative suite (Artcraft / Rawmakase included) unless a minimal
  vertical slice is explicitly chosen as the first differentiator.
- A general-purpose icon composer or "composer for everything." The first
  iteration may be a design-time tool or an internal asset pipeline, not a
  shipped app.
- A new login/authentication/security stack. Reuse mature display manager and
  authentication components until there is a strong, security-reviewed reason
  not to.
- Mobile, ARM phone, tablet and multi-architecture support in the first preview.
- Guaranteed support for every laptop, GPU, printer, dock, fingerprint reader or
  hybrid graphics setup.
- Cloud account, sync, telemetry, app-store backend, social community platform
  or customer support SLA.
- Paid support or enterprise compliance claims.
- Perfect battery estimates or power optimisation claims before measurements
  exist.
- "Zero bugs," "unhackable," "works with every app," or other claims that cannot
  be proved.

## Cut-line rule

If work threatens the bootable demo, core tasks, recovery or security testing,
remove a visual extra or secondary utility from the release. Do not remove the
test or recovery work to preserve a screenshot feature.

## Feature request test

Before adding a feature, answer:

1. Which target user problem does it solve?
2. Which first-release success measure does it influence?
3. Can an existing Linux service or application already solve it adequately?
4. What is the smallest credible version?
5. What maintenance and compatibility burden does it introduce?
6. What current commitment will be delayed or dropped?

If these answers are vague, keep it in the ideas backlog.
