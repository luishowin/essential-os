# Essential OS Release and Support Policy

**Document status:** Draft for project adoption  
**Version:** 0.1  
**Last updated:** 31 October 2026  
**Applies to:** Essential OS distributions, desktop components, first-party applications, package repositories, installers and supported release branches

> A stable release should be dependable without becoming technologically frozen.

## 1. Purpose

This policy defines Essential OS release channels, versioning, release qualification, LTS support, security maintenance, platform updates and end-of-life handling.

Essential OS aims to let users choose how quickly they adopt change. Users who enjoy frequent improvements can use Canary or Beta. Users who prioritise predictability can use Stable. Users who want to remain on a major release can use its LTS maintenance branch for the published support period without being forced to adopt the next major release immediately.

The project must not promise a support period that it cannot realistically maintain. Every published LTS commitment must have a named owner, a supported platform strategy and a documented end-of-life date.

## 2. Release model

Essential OS uses three release channels: Canary, Beta and Stable. LTS is a support designation applied to every declared major Stable release; it is not a fourth channel.

| Channel/designation | Purpose | Audience | Change profile |
|---|---|---|---|
| Canary | Early integration and experimentation | Developers and early testers | Frequent, potentially breaking changes |
| Beta | Public pre-release validation | Testers and interested users | Feature-complete or near-complete; fixes and polish |
| Stable | Production release channel | General users | Reviewed, tested and documented updates |
| LTS | Extended maintenance commitment for a major Stable release | Users prioritising continuity | Security, serious bug fixes and controlled compatible updates |

A user may remain on a supported LTS release and decline a newer major release. They must still apply the maintenance updates needed to keep that LTS secure and supported.

## 3. Versioning

Before the first LTS, use a simple sequential development series: `0.0.NNN`, where `NNN` is an incrementing release number (for example, `0.0.001`, `0.0.014`, `0.0.125`). This allows the project to ship frequent improvements, fixes and feature requests without implying that a long-term support contract already exists. A channel or pre-release suffix may be added where useful, such as `0.0.014-canary`, `0.0.014-beta` or `0.0.014-rc.1`.

Once the first LTS is declared, use a SemVer-inspired product version for supported major release lines. Examples:

- `1.0.0-rc.1`
- `1.0.0`
- `1.0.1`
- `1.1.0`
- `2.0.0-rc.1`
- `2.0.0`

### 3.1 Version meanings

- **Pre-LTS `0.0.NNN`:** Sequential development and preview releases. They may move through Canary, Beta and Stable channels, but they do not carry an LTS support commitment.
- **Major:** A new product generation and a new LTS line. May include substantial changes, but must include a migration path for supported users where practical. Every major Stable release is intended to qualify as an LTS.
- **Minor:** Backward-compatible product features, improvements and integrations within the major release's compatibility commitments.
- **Patch:** Bug fixes, security fixes and low-risk maintenance changes.
- **Pre-release identifier:** Indicates Canary, Beta or release-candidate status. Pre-releases are not production support commitments.

The project may revise this scheme before the first public Stable release. Once adopted, published releases must use it consistently.

### 3.2 Product version versus platform version

The Essential OS product version is distinct from the underlying Linux platform, Fedora base, kernel, desktop infrastructure and application versions.

For example, Essential OS 1 LTS may receive a supported platform refresh while retaining its product identity, desktop interaction commitments and application compatibility expectations.

Release notes must clearly identify both:

- Essential OS product release and package versions.
- Underlying platform/base version, kernel track and major system component versions.

Do not imply that an LTS release uses the same kernel or userspace forever.

## 4. Channel promotion

### 4.1 Canary

Canary receives changes after automated development checks pass. It is intended to reveal integration problems early.

Requirements:

- Automated build and test checks pass before publication, except explicitly labelled experimental builds.
- Known breakage is documented.
- Users are warned that upgrades and configuration changes may be disruptive.
- Canary must not be recommended for systems whose owners require production reliability.
- Canary packages and data formats should not be assumed to be migration-compatible with Stable.

Canary does not receive an LTS support commitment.

### 4.2 Beta

Beta is used to validate a proposed Stable release with a broader group of users and hardware configurations.

Requirements:

- Feature scope is frozen or changes are limited to approved corrections.
- Release notes and known issues are published.
- Installation, upgrade, recovery and core desktop tests are run.
- Hardware and application compatibility are assessed against the declared support matrix.
- User reports are triaged and linked to the release candidate.

Beta may contain defects. It is not an LTS release and should not be presented as production-ready.

### 4.3 Stable

Stable is the production channel. Updates must be reviewed, tested, documented and packaged through the authorised release process.

Stable updates are divided into:

- Security fixes.
- Critical and high-severity bug fixes.
- Compatibility and platform maintenance.
- Low-risk quality improvements.
- Compatible features that do not break the release's published commitments.

Large feature changes, major UX redesigns and breaking changes should normally wait for a new major release or an explicitly approved migration.

### 4.4 LTS designation

Every major Stable release is intended to become an LTS release. The LTS designation is granted only after the qualification process in Section 6 is complete and the project publishes its support dates and maintenance scope.

A major release must not be advertised as LTS before that declaration.

## 5. Update classes and user choice

Users may choose whether and when to move to a newer major release. They should not be required to move to the next major version merely to receive security fixes during the current LTS support period.

Within an LTS major release, updates are classified as follows:

| Update class | LTS treatment |
|---|---|
| Critical security fix | Backport or deliver a supported component update as soon as safely possible |
| High-severity security fix | Backport or deliver a supported component update on a risk-based schedule |
| Critical data-loss or boot regression | Prioritise a corrective update |
| Normal bug fix | Eligible for a patch release when verified and low risk |
| Compatible platform maintenance | Allowed when it preserves the LTS compatibility contract and passes testing |
| Major UX or product redesign | Normally deferred to a later major release |
| Breaking dependency or data-format change | Requires a documented migration strategy and human approval |
| New optional application or feature | May be offered separately or included when it does not undermine LTS stability |

Users can defer optional features and major upgrades. They should be clearly informed when a required security or platform update is being withheld and what risk that creates.

## 6. LTS qualification

The project owner's proposed stability signal is at least 120 consecutive days without a newly confirmed valid bug report against the release candidate in the declared supported configuration. This is a meaningful signal, but it is not sufficient on its own: the release must also pass the test, security, compatibility and maintenance-readiness gates below.

### 6.1 Qualification observation period

A proposed major release must complete at least 120 days of public Beta or Release Candidate observation before LTS declaration. The period begins when the release is feature-frozen and the first public qualification build is available. Record the start date, candidate version, supported test profiles and issue tracker query used to evaluate the period.

A **valid bug report** is a report that Triage confirms describes an actual defect in a declared supported configuration, rather than a feature request, duplicate, unsupported setup, misunderstanding or expected behaviour. A confirmed valid bug report against the candidate resets the 120-day clock for the affected release. The clock restarts when a corrected candidate containing the fix is made available for public testing.

A report does not become invalid merely because it is difficult to reproduce. Triage must record why a report is confirmed, remains unconfirmed or is rejected. Feature requests, usability suggestions and documentation improvements are tracked separately and do not reset the bug-free observation clock unless they reveal an actual defect.

The release must still have no unresolved S0 or S1 defects at declaration. Lower-severity issues discovered before the observation period may be fixed or explicitly documented with impact, workaround and rationale. If a new valid defect is confirmed during the observation period, the clock resets even when the defect is low severity.

The project owner may extend the period when testing coverage, hardware coverage or maintenance readiness is insufficient.

### 6.2 Mandatory release gates

Before LTS declaration, all of the following must be satisfied:

1. No unresolved S0 or S1 defects affecting the declared supported configuration.
2. No known exploitable critical security issue without a mitigation and a published handling plan.
3. Installation and first-boot tests pass on the defined reference hardware and virtual-machine profiles.
4. Upgrade, rollback and recovery procedures have been tested.
5. The core desktop workflow suite passes.
6. Major hardware integration areas have been tested, including graphics, networking, audio, Bluetooth, storage, suspend and resume.
7. Package provenance, signatures, repository metadata and update paths are verified.
8. The dependency and licence inventory is current.
9. Known issues and unsupported configurations are published.
10. A support owner, security-response process, platform maintenance strategy and end-of-life date are published.
11. Release artifacts can be rebuilt from the documented source and build pipeline to the extent supported by the project's reproducibility goals.
12. The project owner approves the LTS declaration.

A zero-bug target is not realistic. The release decision must be based on known risk, impact, test evidence and maintenance capacity.

## 7. LTS duration and support promise

### 7.1 Initial policy proposal

**Recommended initial LTS duration: 24 months from the Stable release date.**

This is a proposed commitment, not an automatic promise. Before the first LTS release, the project owner must confirm that the package, security and platform maintenance workload can be sustained for the full period.

Each LTS release page must state:

- Stable release date.
- Support start and end dates.
- Supported architectures and hardware scope.
- Supported repositories and update channels.
- Kernel and platform maintenance strategy.
- Security reporting and advisory process.
- Upgrade and migration guidance.
- Known exclusions and unsupported configurations.

### 7.2 What LTS support includes

During the published support period, the project intends to provide:

- Security updates for Essential OS-maintained packages.
- Security updates for supported underlying platform components through supported upstream updates, backports or controlled platform refreshes.
- Kernel updates through a supported kernel track or tested platform migration.
- Critical and high-severity fixes affecting supported configurations.
- Maintenance of the Essential OS session, services, package metadata and update mechanisms.
- Documentation for supported upgrades and recovery.
- Public release notes and security advisories.

The exact scope depends on the published support matrix. The project must not claim responsibility for proprietary drivers, third-party applications or upstream components it cannot patch or distribute.

### 7.3 What LTS does not mean

LTS does not mean:

- No updates are needed.
- Every application receives new features indefinitely.
- Every upstream dependency remains frozen at its original version.
- Every device released during the support period is automatically supported.
- The project can guarantee security for software it does not maintain or control.
- A release remains supported forever.

Users who stay on an LTS release must install its maintenance updates. They may skip the next major version, but they cannot receive support beyond the published end-of-life date without a new project decision.

## 8. Platform maintenance strategy

A product-level LTS must not be implemented by freezing an unsupported Fedora base or leaving critical dependencies unpatched.

The platform strategy must separate stable product behaviour from the underlying components used to deliver it.

### 8.1 Platform refreshes within an LTS

Where the underlying Fedora release or another platform component approaches end of support, Essential OS must choose one of the following before upstream support ends:

1. Migrate the LTS to a newer supported platform base while preserving the Essential OS compatibility contract; or
2. Maintain the required components through a documented backport and security-maintenance programme; or
3. Declare that the component or configuration cannot remain supported and provide a clear migration path.

A platform refresh within an LTS is allowed when it preserves the user's Essential OS experience and passes qualification tests. It must be versioned and documented as a platform maintenance update, not silently presented as a trivial patch.

### 8.2 Compatibility contract

The LTS compatibility contract should prioritise:

- User data and configuration preservation.
- Stable first-party application behaviour and file formats.
- Desktop interaction and accessibility commitments.
- Package identity and supported update paths.
- Documented system integration interfaces.

The contract does not guarantee that every internal library, kernel ABI, compositor implementation or third-party application version remains unchanged.

### 8.3 Dependency lifecycle

Every important dependency must have:

- An identified upstream and maintenance status.
- A reason for inclusion.
- A support and security update path.
- A compatibility test strategy.
- An owner for local patches, if any.
- A replacement or migration plan when it becomes unsuitable.

Do not replace a dependency solely because it is old. Replace or refresh it when there is a demonstrated security, hardware support, compatibility, performance or maintainability reason.

## 9. Security maintenance and response

Security maintenance applies to supported Stable and LTS releases. Canary and Beta users should expect fixes to arrive first in the active development stream, but they are not substitutes for supported production updates.

### 9.1 Security handling

- Provide a private channel for vulnerability reports.
- Restrict access to reports until coordinated disclosure is appropriate.
- Assess affected releases, severity, exploitability and user impact.
- Identify upstream fixes and whether backporting is practical.
- Test fixes against supported release branches.
- Publish an advisory with affected versions, severity, mitigation and fixed versions.
- Maintain a record of the fix and the release branches to which it was applied.

### 9.2 Response priorities

| Priority | Example | Handling principle |
|---|---|---|
| Critical | Remote compromise, signing compromise, severe privilege escalation or widespread data exposure | Immediate escalation; prepare mitigation and coordinated update |
| High | Serious exploitable vulnerability affecting supported installations | Prioritise a verified update and advisory |
| Moderate | Limited exploitability or impact | Schedule based on risk and available upstream fixes |
| Low | Minimal security impact | Handle in normal maintenance, documenting any accepted risk |

Do not publish a fixed response-time guarantee until the project has enough maintainer capacity to meet it. Internal targets may be used for planning and improved as capacity grows.

### 9.3 Supply-chain controls

- Sign official packages and repository metadata.
- Protect signing keys outside agent-accessible environments.
- Use protected CI environments for release signing.
- Record source revisions and build inputs for release artifacts.
- Restrict package publication to authorised maintainers or approved release automation.
- Keep build logs and provenance records.
- Test update metadata and rollback procedures.

No autonomous agent may access private signing keys or publish official Stable/LTS packages without an authorised human release action.

## 10. Release quality and test matrix

Every Stable release and every significant LTS platform refresh must be tested against a documented matrix.

### 10.1 Core installation and system tests

- Boot media integrity and signature verification.
- UEFI boot and installer startup.
- Clean installation, partitioning and disk encryption options.
- First user login and session selection.
- Network setup and offline usability.
- Package installation and updates.
- Reboot, shutdown, suspend and resume.
- Recovery and rollback.

### 10.2 Desktop and application tests

- Launcher, dock/panel, window management and workspaces.
- File manager and removable storage.
- Display, scaling, sound, Bluetooth and network settings.
- Notifications and permission prompts.
- Accessibility and keyboard navigation.
- Office, creative, media and bundled game smoke tests.
- Configuration backup and restoration.

### 10.3 Reliability and edge cases

- Interrupted downloads and package transactions.
- Network loss during update.
- Low disk space.
- Unplugged external storage during operations.
- Display changes and monitor hot-plugging.
- Bluetooth and audio device loss.
- Interrupted suspend/resume.
- User configuration migration from a previous supported release.

Test evidence must record the image/build identifier, hardware or VM profile, test version, date, result and relevant logs or screenshots.

## 11. Updates, migration and rollback

### 11.1 Maintenance updates

Users should receive clear information about update type, size, important changes, restart requirements and known issues.

Security and stability updates should not be hidden among unrelated feature announcements. Where practical, users should be able to defer optional feature changes while still applying necessary security updates.

### 11.2 Major-version migration

A newer major release should provide:

- A clear upgrade path from supported previous LTS releases.
- Data and configuration migration checks.
- Pre-upgrade backup guidance and, where feasible, automated snapshots.
- A recovery procedure if migration fails.
- Release notes describing removed, changed and deprecated functionality.
- A way to review compatibility issues before proceeding.

Users must not be forced to upgrade to the newest major release before the current LTS end-of-life date, unless a specific security or legal issue makes continued support impossible. Such an exception requires a public explanation and migration guidance.

### 11.3 Rollback

Rollback support depends on the filesystem, package and update design. It must be tested rather than assumed.

The project should investigate Btrfs snapshots or an equivalent mechanism for system-state recovery. User data backups remain a separate responsibility; a system snapshot is not a substitute for a backup.

## 12. End of life

Every LTS release has a published end-of-life date.

Before end of life, the project should publish notices at least 180 days and 30 days before the end date where the release infrastructure permits. Notices should explain:

- The exact end-of-life date.
- Which updates will stop.
- What happens to package repositories and downloads.
- The recommended supported upgrade path.
- How to back up and migrate personal data and configuration.

After end of life, the release must be clearly marked unsupported. Old packages may remain available for archival purposes, but must not be presented as receiving security maintenance.

An extension requires an explicit project-owner decision, a named maintenance owner and a revised published end date.

## 13. Release publication checklist

Before publishing a Stable or LTS release, confirm:

- [ ] Release version and channel are correct.
- [ ] LTS support dates and scope are approved, if applicable.
- [ ] Release-blocking issues are resolved or explicitly accepted with rationale.
- [ ] Automated and manual qualification tests pass.
- [ ] Supported hardware and known issues are documented.
- [ ] Package and repository signatures verify.
- [ ] Release artifacts and source revisions are recorded.
- [ ] Update and recovery paths are tested.
- [ ] Security and dependency reviews are complete.
- [ ] Release notes and upgrade instructions are published.
- [ ] Human release approval is recorded.
- [ ] Monitoring and rollback procedures are ready.

## 14. Initial policy defaults and decisions still required

The following defaults are recommended for planning. They are not binding commitments until accepted by the project owner and reflected in a public support statement.

| Decision | Proposed default | Status |
|---|---|---|
| Release channels | Canary, Beta, Stable | Proposed |
| LTS designation | Every major Stable release may qualify as LTS | Proposed |
| Pre-LTS release numbering | Sequential `0.0.NNN` releases | Proposed |
| LTS qualification observation | Minimum 120 consecutive days without a newly confirmed valid bug report against the candidate | Proposed |
| Bug-free criterion | A confirmed valid bug report resets the observation clock; no unresolved S0/S1 defects at declaration | Proposed |
| Initial LTS duration | 24 months | Requires capacity confirmation |
| Underlying platform | Fedora-based initially; product and platform versions separated | Current development direction; long-term policy open |
| Platform refreshes | Allowed within LTS when compatibility is preserved and tests pass | Proposed |
| Kernel maintenance | Supported kernel track or tested platform migration | Requires implementation decision |
| Architecture | x86-64 initially | Proposed |
| Release signing | Protected signing infrastructure; never agent-accessible | Mandatory principle |
| Stable release approval | Human approval | Mandatory principle |

Before the first public LTS release, create a release-specific support statement that fills in all dates, supported components, architecture, repositories and maintenance ownership.

## 15. Policy review

Review this policy before the first public Beta, before the first LTS declaration and whenever the platform, project capacity or support model changes materially.

The project owner must approve policy revisions. Published support commitments must not be silently shortened; any exceptional change requires an explicit public explanation and user migration guidance.

---

**Essential OS commitment:** Users should be able to choose stability without being abandoned on obsolete or vulnerable components. Essential OS will preserve the product experience where practical, maintain the underlying platform responsibly and be honest about the limits of its support capacity.
