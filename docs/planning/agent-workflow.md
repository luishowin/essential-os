# Essential OS Agent Workflow

**Document status:** Draft for project adoption  
**Version:** 0.1  
**Last updated:** 31 October 2026  
**Applies to:** Essential OS repositories, packages, applications, documentation, build pipelines and release operations  
**Authority:** Subordinate to the Essential OS product specification, accepted architecture decisions and security policy

> Agents increase the project's capacity. They do not become the project's owners.

## 1. Purpose

This document defines how automated agents and conventional automation help develop, test and maintain Essential OS. It establishes responsibilities, handoffs, permissions, evidence requirements and points where Luis, acting as Head of Product and Quality, must make a decision.

The intended operating model is a small, AI-assisted software organisation. Agents should reduce the time spent monitoring repositories, investigating reports, writing implementation plans, fixing well-understood defects and exercising the product. Human attention should be reserved for product direction, consequential technical decisions, quality judgement and release approval.

The workflow must remain understandable and useful even when no AI provider is available. Deterministic checks, scripts, CI and documented procedures should perform work that does not require model reasoning.

## 2. Governing principles

1. **Human product authority.** Luis owns the product vision, roadmap, priorities, experience principles, accepted architecture decisions and final release approval.
2. **Evidence before action.** An agent must distinguish observed facts, reproducible results, hypotheses and recommendations.
3. **Least privilege.** Agents receive only the repository, environment, credentials and permissions needed for their assigned work.
4. **No direct production authority.** Agents may prepare changes and release candidates, but must not independently publish production packages, sign releases, change repository protection or merge into protected release branches.
5. **Independent verification.** The agent or process implementing a change must not be the only source of evidence that the change works.
6. **Small, reviewable changes.** Prefer narrow pull requests with clear acceptance criteria over broad autonomous refactors.
7. **Reversible execution.** Agent work happens on branches, disposable worktrees or isolated test environments with a recoverable baseline.
8. **Explicit uncertainty.** Missing information must be recorded, not guessed into a task.
9. **No silent policy changes.** Changes to product scope, support commitments, security policy, architecture or release criteria require a human decision and an appropriate decision record.
10. **Maintainability over agent activity.** The objective is a healthier product, not a high volume of generated issues, comments, commits or pull requests.

## 3. Roles and responsibilities

Roles are responsibilities, not necessarily separate always-running models. A single model may perform more than one role when the workflow keeps duties and review boundaries distinct. Scheduled jobs and ordinary scripts should handle routine deterministic checks.

### 3.1 Human owner: Head of Product and Quality

**Accountable:** Luis.

Responsibilities:

- Maintain product vision, principles, scope and roadmap.
- Decide whether a feature request belongs in Essential OS.
- Approve material changes to architecture, product behaviour, permissions, data handling, supported hardware or compatibility commitments.
- Set priorities when trade-offs affect user experience, project capacity or long-term maintenance.
- Resolve disagreements between product value, implementation cost and technical risk.
- Approve stable releases and LTS declarations.
- Approve changes to this workflow and the release/support policy.

The human owner is not expected to approve every low-risk bug fix. The purpose of the workflow is to make approval requests selective and decision-ready.

### 3.2 Sentinel: repository and ecosystem monitor

**Purpose:** Find signals that may require attention and create traceable findings.

Responsibilities:

- Monitor CI failures, failed builds and test regressions.
- Monitor dependency updates, upstream release notes and known end-of-life notices.
- Run or review vulnerability and licence scans.
- Watch for changes in relevant Fedora, kernel, desktop, graphics, audio, networking and toolkit interfaces.
- Review crash reports, reproducible error reports and project issue queues where access is authorised.
- Run scheduled health checks on supported build targets and test images.
- Detect stale, duplicated or unanswered reports.
- Produce a concise periodic health summary.

Sentinel must not label an unverified signal as a confirmed defect. Its output is a finding with a source, timestamp, affected component, confidence and recommended next step.

**Suggested cadence:** event-driven CI and security alerts; daily issue and build-health scan; weekly dependency/upstream review; monthly maintenance summary. Cadence can be reduced for repositories or components that are not yet active.

### 3.3 Triage: issue investigator

**Purpose:** Establish whether a report is valid, identify its impact and decide where it should go next.

Responsibilities:

- Reproduce or seek independent confirmation of a reported problem.
- Ask for missing reproduction information when necessary.
- Search for duplicate reports and link related issues.
- Identify affected versions, components, platforms and hardware where known.
- Classify the report as bug, security issue, regression, compatibility issue, UX issue, feature request, documentation issue or unsupported configuration.
- Assign severity and confidence using the criteria in this document.
- Recommend an owner and next action.
- Identify whether the issue is eligible for bounded autonomous implementation.

Triage may close spam, duplicates and clearly invalid reports with an explanation. It must not close a credible report solely because it is difficult to reproduce.

### 3.4 Planner: task and specification coordinator

**Purpose:** Turn validated work into actionable tasks.

Responsibilities:

- Convert accepted issues into tasks with a clear problem statement.
- Define scope, affected components, dependencies and acceptance criteria.
- Identify required tests and documentation changes.
- Estimate risk and implementation size qualitatively: small, medium or large.
- Identify product, architecture, privacy, security or compatibility decisions that require human approval.
- Split broad issues into independently reviewable tasks.
- Maintain links between the originating issue, plan, pull request and test evidence.

A task is not ready for implementation until its expected behaviour and completion conditions are understandable.

### 3.5 Builder: implementation agent

**Purpose:** Implement approved, sufficiently scoped work.

Responsibilities:

- Work only on an assigned branch, fork or disposable worktree.
- Read the relevant product specification, architecture records, repository instructions and tests before changing code.
- Implement the smallest change that satisfies the task.
- Add or update tests for changed behaviour.
- Run required formatting, lint, static analysis, build and unit/integration checks.
- Update documentation and release notes where appropriate.
- Open a pull request with a clear summary, risk note and test evidence.
- Report incomplete work and uncertainty honestly.

Builder must not expand scope without updating the task and obtaining required approval. It must not weaken tests, remove security checks, change licensing, introduce a new runtime dependency, alter data formats or modify privileged operations merely to make a task pass without explicit approval.

### 3.6 QA Engineer: automated and computer-use tester

**Purpose:** Test user-visible behaviour, system integration and recovery paths independently of the implementation agent.

Responsibilities:

- Run automated unit, integration, system and packaging tests.
- Exercise the graphical desktop through supported computer-use tooling.
- Test ordinary workflows and deliberately awkward edge cases.
- Check installation, upgrades, rollback and recovery where relevant.
- Capture screenshots, logs, recordings or other reproducible evidence.
- Identify usability friction, confusing states, inconsistent interaction patterns and accessibility problems.
- Recommend UI/UX improvements with user goal, observed friction, evidence and proposed outcome.

QA must distinguish defects from subjective design preferences. It can recommend visual and interaction changes, but must not unilaterally redefine the design system or alter product behaviour outside the task scope.

### 3.7 Independent Reviewer: change and risk reviewer

**Purpose:** Provide a second perspective before a change is accepted.

Responsibilities:

- Review the diff against the issue and acceptance criteria.
- Inspect for correctness, maintainability, security, privacy, dependency and compatibility risks.
- Check whether tests meaningfully cover the changed behaviour.
- Confirm that the implementation did not silently expand scope.
- Review QA evidence and unresolved limitations.
- Recommend approve, request changes or escalate to the human owner.

Where possible, the reviewer should not be the same model instance or agent context that produced the implementation. Automated policy checks may supplement, but do not replace, review of consequential changes.

## 4. Standard issue-to-release workflow

The normal workflow is:

1. **Capture:** A user, monitoring job, test or contributor creates a report.
2. **Validate:** Sentinel or Triage checks the evidence, searches for duplicates and attempts reproduction.
3. **Classify:** Triage assigns category, severity, confidence, affected versions and next action.
4. **Decide:** Product or architectural questions are sent to the human owner. Routine, low-risk defects may proceed under the approved autonomy rules.
5. **Plan:** Planner creates or updates an implementation task and acceptance criteria.
6. **Build:** Builder implements the task on an isolated branch and opens a pull request.
7. **Test:** CI and QA verify the change. GUI tests run in a disposable environment when the change affects the user experience or system integration.
8. **Review:** Independent Reviewer checks the implementation and evidence.
9. **Approve:** A human approves changes that cross a human-approval boundary. Low-risk changes may be approved through a separately documented delegated policy, if one is adopted.
10. **Merge and release:** An authorised maintainer merges the change. Release automation builds and signs artifacts using protected credentials. A human approves publication to Stable or LTS channels.
11. **Close:** The issue is closed only when the fix is merged and the relevant verification or release condition is recorded.

### 4.1 Workflow states

Use a single authoritative GitHub issue/project workflow. Suggested states:

| State | Meaning |
|---|---|
| Inbox | Newly reported; not yet assessed |
| Investigating | Reproduction, evidence gathering or duplicate search in progress |
| Needs information | Reporter input or additional evidence required |
| Needs Luis | Product, architecture, security, scope or priority decision required |
| Ready | Validated, scoped and ready for implementation |
| Building | Implementation is in progress |
| Testing | Automated or manual verification is in progress |
| Review | Independent code or design review is in progress |
| Release queue | Accepted change is waiting for an appropriate release |
| Closed | Completed, verified and released or otherwise resolved |
| Deferred | Valid work intentionally postponed, with rationale |
| Won't do | Reviewed and rejected, with rationale |

An issue must not be moved directly from Inbox to Building without validation and acceptance criteria.

### 4.2 Human attention queue

The `Needs Luis` state is a decision queue, not a general notification bucket. Each item must include:

- The decision required, phrased as a specific question.
- Why the decision cannot be made under existing policy.
- Available options and their trade-offs.
- The agent's recommendation and confidence.
- Consequences of delaying the decision.
- Links to relevant issues, evidence, specifications and decision records.

Batch routine decisions into a periodic digest. Escalate immediately only when delay creates material security, data-loss, release or project risk.

## 5. Severity, confidence and priority

Severity measures user or system impact. Priority determines scheduling. They are related but not interchangeable.

### 5.1 Severity levels

| Level | Definition | Examples |
|---|---|---|
| S0 — Critical | Active security compromise, widespread data loss, unsafe privileged behaviour or unusable release with no reasonable workaround | Update signing compromise; destructive data corruption |
| S1 — High | Boot/login failure, repeated crash in core workflow, severe regression, major security exposure or failure affecting a supported hardware class | Desktop cannot start; update leaves system unbootable |
| S2 — Normal | Material feature failure with a workaround or a limited set of affected users | Bluetooth fails after resume on a subset of devices |
| S3 — Low | Minor defect, visual inconsistency or non-critical workflow friction | Misaligned control; confusing but recoverable setting |
| S4 — Suggestion | Enhancement, request or polish opportunity without an existing defect | New launcher behaviour or optional utility |

Security reports should use the project's private security-reporting process and must not expose exploit details in public issues before coordinated handling.

### 5.2 Confidence levels

- **Confirmed:** Reproduced or independently verified with sufficient evidence.
- **Probable:** Strong evidence, but not yet reproduced.
- **Unconfirmed:** Plausible report with insufficient information.
- **Rejected:** Evidence establishes that the report is invalid, duplicate or outside supported scope.

Agents must not inflate severity to obtain attention or reduce severity because a fix is difficult.

## 6. Autonomy and approval boundaries

Agent autonomy is granted by task class, not by general trust in an agent.

### 6.1 Allowed without case-by-case approval

Subject to repository permissions and CI policy, agents may:

- Read authorised repository content and issue history.
- Run tests, static analysis, dependency and licence scans.
- Create draft issue comments and internal reports.
- Create branches and draft pull requests.
- Fix narrow, reproducible, low-risk defects with clear acceptance criteria.
- Improve tests and documentation within an approved scope.
- Update patch-level dependencies when automated compatibility checks pass and the change is reversible.
- Generate release-note drafts.
- Run tests in disposable VMs or containers.

### 6.2 Human approval required

Obtain explicit human approval before:

- Changing product scope, core UX principles or the roadmap.
- Accepting a substantial feature request.
- Making or reversing an architecture decision.
- Changing login, authentication, permissions, privilege boundaries or security policy.
- Changing data formats, migration behaviour, encryption or backup semantics.
- Adding a new privileged service or high-impact dependency.
- Changing supported hardware or compatibility commitments.
- Removing or replacing a core system component.
- Changing package signing, repository trust, release keys or update infrastructure.
- Making a breaking change to a stable or LTS branch.
- Publishing a Stable release, declaring an LTS release or changing its support commitment.

### 6.3 Prohibited actions

Agents must never:

- Access or copy personal files from the human owner's workstation unless explicitly provided for the task.
- Read, export or disclose secrets, tokens, private keys or credentials.
- Request or store release-signing private keys in model context, issues, logs or ordinary CI artifacts.
- Push directly to protected branches or bypass required reviews.
- Merge their own pull requests when independent review is required.
- Publish packages or releases without authorised release approval.
- Disable security controls, tests or repository protections to force a successful build.
- Run destructive commands against a host system or non-disposable test environment.
- Send user data or crash dumps to an external service without an approved privacy and data-handling basis.
- Invent test results, reproduction steps, user reports or evidence.

## 7. Computer-use and system testing rules

Computer-use agents are useful because desktop software can fail in ways unit tests do not reveal. They are also potentially dangerous because GUI actions can affect real files, settings and accounts.

### 7.1 Test environment

- Use disposable virtual machines, snapshots or dedicated test devices.
- Do not give GUI agents access to the owner's daily-driver desktop session.
- Use synthetic test accounts and test data.
- Disable or isolate access to personal cloud drives, password managers, payment accounts and private messaging.
- Keep network access restricted to what the test requires.
- Reset the test environment to a known baseline between destructive scenarios.
- Record the image, package set, virtual hardware and test configuration used.

### 7.2 Test coverage

Maintain test suites for at least:

- Installation and first boot.
- Login, logout, lock and session recovery.
- Launching, switching, resizing and closing applications.
- File creation, copy, move, rename, delete, search and external storage.
- Network, Bluetooth, audio, display and power settings.
- Suspend, resume, shutdown and restart.
- Package installation, update, interruption and rollback.
- Backup and configuration restoration.
- Common office and creative workflows.
- Keyboard navigation, scaling, focus and reduced-motion behaviour.
- Low disk space, network loss, unplugged devices and interrupted operations.

Tests should identify which behaviours are expected, which are unsupported and what evidence constitutes a failure.

### 7.3 UX and UI findings

A UX report should include:

- User goal and starting state.
- Exact interaction sequence.
- Expected outcome.
- Observed outcome.
- Screenshot or recording where useful.
- Reproducibility and affected versions.
- Impact on discoverability, efficiency, comprehension, accessibility or error recovery.
- A proposed improvement, clearly labelled as a recommendation.

Agents should not infer user preferences from a single test run. UX recommendations need a reasoned connection to Essential OS principles and, where possible, validation with people.

## 8. Builder task and pull-request contract

Every implementation task should include:

```text
Task ID:
Originating issue:
Title:
Problem statement:
Expected behaviour:
In scope:
Out of scope:
Affected components:
Dependencies:
Severity / priority:
Risk level:
Human approval required: yes / no
Acceptance criteria:
Required tests:
Documentation impact:
Rollback considerations:
```

Every builder pull request should include:

```text
Summary:
Problem addressed:
Implementation approach:
Files/components changed:
Tests run (exact commands):
Test results:
QA evidence:
Security/privacy considerations:
Compatibility considerations:
Known limitations:
Migration or rollback notes:
Related issue/task:
```

A task is not complete merely because code has been written. It is complete when the agreed acceptance criteria have been tested, the change is reviewed and the issue's release status is clear.

## 9. Dependency and upstream maintenance

Sentinel should maintain an inventory of important dependencies, including:

- Name, version and upstream project.
- Purpose within Essential OS.
- License and redistribution conditions.
- Upstream support or end-of-life status.
- Security advisory source.
- Whether the dependency is runtime, build-time or optional.
- Local patches and the reason they exist.
- Replacement or migration options for critical dependencies.

Flag dependencies that are unmaintained, have unresolved high-severity vulnerabilities, block required hardware support or prevent a platform migration.

Do not replace a component merely because it is old. Recommend replacement when there is a demonstrated security, compatibility, performance, maintainability or product-quality reason. Avoid accumulating local patches without owners and retirement plans.

## 10. Auditability and reporting

Every agent action that changes project state should be attributable to an agent identity or automation account and linked to its task.

Keep:

- Source issue and evidence.
- Agent role and tool/workflow identifier.
- Model/provider identifier where policy permits and it is useful for audit.
- Branch and commit references.
- Tests and results.
- Reviewer outcome.
- Human approvals and decision records.
- Release in which the change shipped.

Do not store secrets or unnecessary personal data in logs.

### 10.1 Weekly project digest

The weekly report should be concise and include:

1. Critical and high-severity findings.
2. Newly confirmed issues and repeated regressions.
3. Pull requests awaiting review or testing.
4. Items requiring Luis's decision.
5. Dependency, security and upstream risks.
6. Release-channel health and test coverage changes.
7. Suggested next priorities.

The digest is a summary, not a replacement for the issue tracker or decision records.

## 11. Initial rollout

Do not launch all roles as autonomous agents on day one. Introduce capability in stages.

### Stage 1 — Reliable automation

- CI for builds, lint, formatting and tests.
- Dependency and vulnerability monitoring.
- Issue templates and labels.
- Protected branches and pull-request checks.

### Stage 2 — Monitoring and triage

- Sentinel health summaries.
- Triage classification and duplicate detection.
- Human decision queue.
- Evidence and confidence requirements.

### Stage 3 — Planning and implementation

- Planner task templates.
- Builder branches and draft pull requests.
- Narrow low-risk autonomous fixes.
- Independent review requirements.

### Stage 4 — Desktop QA

- Disposable virtual-machine images.
- openQA or an equivalent OS-level test harness.
- Computer-use workflows for core desktop tasks.
- Reproducible screenshots, logs and test reports.

### Stage 5 — Release operations

- Signed build pipeline with protected signing infrastructure.
- Release qualification reports.
- Human-approved Stable and LTS publication.
- Automated maintenance reporting for supported releases.

## 12. Adoption and change control

This document is a working policy until accepted by the project owner. Initial adoption should begin with the permission boundaries, issue states, task templates and CI protections. More autonomous behaviour should be added only after the preceding stage has demonstrated reliable results.

Changes to agent permissions, approval boundaries or release authority require an explicit human decision and a recorded rationale.

---

**Project rule:** Agents may increase the pace of Essential OS development. They must not reduce the owner's control over what Essential OS becomes or the user's trust in what gets shipped.
