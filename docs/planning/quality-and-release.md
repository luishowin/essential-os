# Quality, test strategy and release gates

**Status:** Planned · **Date:** 2026-10-27

## Testing levels

### 1. Fast checks per change
- Formatting, lint and compiler checks for affected projects.
- Unit tests for parsing, state transitions, settings and non-UI logic.
- UI smoke tests for launch, primary controls and error states where feasible.
- Dependency/licence scan when dependencies change.

### 2. VM integration checks
- Build the image from a clean checkout.
- Boot and log in, open/close applications, switch windows, open settings and
  notification/control surfaces.
- Verify file chooser, notifications, keyboard focus, display scaling and
  suspend/resume if supported.
- Test no-network, low-disk, missing-device-data and failed-service behaviour.
- Test update failure / rollback once that capability exists.
- Shut down and reboot; capture logs for failures.

### 3. Hardware checks
Start with one named reference laptop. Record model, CPU/GPU, firmware, display
resolution/scaling, Wi-Fi, audio, camera, touchpad, suspend behaviour, battery
and peripherals. Add devices based on user demand, not a vague promise of
universal compatibility.

### 4. Compatibility checks
Test one representative app for each class: GTK 3, GTK 4/libadwaita, Qt,
Electron and Flatpak. Record application version, installation method, theme
result, launch reliability, file-picker behaviour, notifications, display
scaling and known issues.

### 5. User testing
For each core task, ask a tester to think aloud without receiving step-by-step
help. Record where they hesitate, where the interface misleads them and what
they expect to happen. Separate genuine usability issues from aesthetic
preferences.

## Release gate checklist

### Product
- [ ] Release scope is explicit; unsupported features are not implied.
- [ ] Core flows have been tested by someone other than the creator.
- [ ] Website, install guide, supported hardware and known issues agree with the
  build.

### Reliability and recovery
- [ ] Clean image build documented and repeated.
- [ ] Clean VM install/boot/login passes the target number of trials.
- [ ] No open critical/high-severity data-loss or boot/session failures.
- [ ] Upgrade/failure/recovery paths tested if advertised.
- [ ] Backup warning and recovery instructions are clear.

### Security and privacy
- [ ] No secrets embedded in source, images, logs or prompts.
- [ ] Shipped dependencies and licences inventoried.
- [ ] Security update source and policy documented.
- [ ] Privileged operations use least privilege and are reviewed.
- [ ] No unexplained outbound telemetry; data collection is documented and
  opt-in where appropriate.
- [ ] Vulnerability contact / reporting procedure published before broad
  release.

### Accessibility and performance
- [ ] Core tasks work with keyboard only.
- [ ] Focus is visible; text scales; high contrast and reduced motion are
  checked.
- [ ] Screen-reader labels are checked for custom controls where practical.
- [ ] Startup, memory, idle use and battery are measured on named hardware with
  conditions recorded.

### Release hygiene
- [ ] Version, changelog, checksums and source link are present.
- [ ] Build artefact can be fetched without confusing users about its maturity.
- [ ] Known issues, installation/uninstallation and support policy are linked.
- [ ] The release is reproducible enough that a future maintainer can understand
  what shipped.

Do not waive security, data-loss or authentication blockers to hit a date. If
other criteria are not met, label the build an internal development image rather
than a public preview.
