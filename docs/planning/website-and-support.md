# Website, support and public communication

**Status:** Planned · **Date:** 2026-10-27

## Website job

The early website's job is to explain the project honestly, show the direction,
recruit informed testers/contributors and direct people to the source. It does
not need to be a large marketing site or a backend application.

The live site is published from [`site/`](../../site/) at
<https://luishowin.github.io/essential-os/>.

## Suggested site structure

### Before there is a downloadable build
- Home: clear product statement, current status and a small number of visuals.
- Vision / principles: what Essential is trying to improve.
- Progress: phases, recent changes and a public roadmap link.
- Development: source repository, design notes and contribution expectations.
- Privacy and security: what is and is not collected; how to report a
  vulnerability.
- Contact / updates: one sustainable route to follow the project.

### When a preview exists
Add a Download page with version, date, maturity, checksum, supported hardware,
VM instructions, installation cautions, known issues and recovery steps. Add
release notes and a feedback link.

## Website non-goals for early stages

- No account system, dynamic dashboard, community platform, newsletter backend
  or telemetry until there is a demonstrated need.
- No polished feature promises that are not present in the downloadable build.
- No "coming soon" page for every idea in the backlog.
- No custom download server before traffic or artefact limits require it.

## Publishing checklist

- [ ] Static build and links work on mobile and desktop.
- [ ] Page is accessible by keyboard and supports readable zoom.
- [ ] Text is clear about the current maturity (concept, developer preview,
  alpha, beta or stable).
- [ ] Screenshots match a real build or are clearly marked conceptual.
- [ ] External fonts/assets have redistribution licences; tracking scripts are
  avoided unless necessary and disclosed.
- [ ] Domain renewal, DNS, HTTPS and account recovery details are recorded
  securely.
- [ ] Website has an obvious source link and one feedback route.

## Support policy for a solo maintainer

Early on, do not promise customer support in a commercial-product sense. Publish
a support boundary: supported release versions, reference hardware, how to
report bugs, what information to include, what will not receive priority
(unsupported devices, local modifications, third-party app bugs) and an
approximate response expectation without guaranteeing turnaround.

Use one intake route. GitHub Issues may be appropriate for public, reproducible
bugs; security reports must not be posted publicly before a fix is available. Do
not ask users to post private files, logs containing personal data, passwords or
secret keys.

## Bug report minimum fields

- Essential OS version and image build.
- Hardware / VM details and installation method.
- Expected result and actual result.
- Steps to reproduce.
- Frequency and severity / work impact.
- Relevant redacted logs or screenshots.
- Whether the issue started after a change.

## Support triage

- P0: security, data loss, broken boot/update, widespread critical failure. Stop
  release work and investigate.
- P1: blocks a core workflow on supported hardware. Fix before expanding the
  cohort.
- P2: secondary workflow / documented workaround available.
- P3: cosmetic or low-impact issue.

Acknowledge when practical, link to the issue, state what is known and do not
speculate. If the issue is upstream, identify the upstream project and avoid
silently owning maintenance that another team controls.
