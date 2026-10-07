#!/usr/bin/env node
// The contract validator.
//
// Zero dependencies. Run with:
//     node --test contract/test.mjs
//
// It does three jobs:
//   1. validates the schemas and fixtures against each other;
//   2. proves the positive intent fixtures resolve to real capabilities;
//   3. proves the security fixtures never become unrestricted shell execution.
//
// This is the only code the essential-os repository owns. It defines the
// platform's interface contract; the implementation (luishowin/ida) is expected
// to satisfy the same contract with its own tests.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

const here = dirname(fileURLToPath(import.meta.url));
const load = (p) => JSON.parse(readFileSync(join(here, p), "utf8"));

const intentSchema = load("schemas/intent.schema.json");
const capabilitySchema = load("schemas/capability.schema.json");
const resultSchema = load("schemas/execution-result.schema.json");
const capabilities = load("fixtures/capabilities.json").capabilities;
const intentFixtures = load("fixtures/intents.json");
const securityFixtures = load("fixtures/security.json");

// ---------------------------------------------------------------------------
// A minimal JSON Schema validator, covering exactly the keywords the contract
// schemas use. Deliberately small: no $ref, no remote resolution.
// ---------------------------------------------------------------------------

function validate(schema, data, path = "$") {
  const errors = [];

  if (schema.type !== undefined) {
    const t = schema.type;
    const ok =
      (t === "object" && data !== null && typeof data === "object" && !Array.isArray(data)) ||
      (t === "array" && Array.isArray(data)) ||
      (t === "string" && typeof data === "string") ||
      (t === "number" && typeof data === "number" && Number.isFinite(data)) ||
      (t === "integer" && Number.isInteger(data)) ||
      (t === "boolean" && typeof data === "boolean") ||
      (t === "null" && data === null);
    if (!ok) {
      errors.push(`${path}: expected ${t}, got ${JSON.stringify(data)}`);
      return errors; // further keywords are meaningless if the type is wrong
    }
  }

  if (schema.const !== undefined && data !== schema.const) {
    errors.push(`${path}: expected const ${JSON.stringify(schema.const)}`);
  }

  if (schema.enum !== undefined && !schema.enum.includes(data)) {
    errors.push(`${path}: ${JSON.stringify(data)} is not one of ${JSON.stringify(schema.enum)}`);
  }

  if (typeof data === "string") {
    if (schema.pattern !== undefined && !new RegExp(schema.pattern).test(data)) {
      errors.push(`${path}: ${JSON.stringify(data)} does not match ${schema.pattern}`);
    }
    if (schema.minLength !== undefined && data.length < schema.minLength) {
      errors.push(`${path}: string shorter than ${schema.minLength}`);
    }
  }

  if (typeof data === "number") {
    if (schema.minimum !== undefined && data < schema.minimum) {
      errors.push(`${path}: ${data} < minimum ${schema.minimum}`);
    }
    if (schema.maximum !== undefined && data > schema.maximum) {
      errors.push(`${path}: ${data} > maximum ${schema.maximum}`);
    }
  }

  if (Array.isArray(data)) {
    if (schema.minItems !== undefined && data.length < schema.minItems) {
      errors.push(`${path}: fewer than ${schema.minItems} items`);
    }
    if (schema.maxItems !== undefined && data.length > schema.maxItems) {
      errors.push(`${path}: more than ${schema.maxItems} items`);
    }
    if (schema.items !== undefined) {
      data.forEach((item, i) => errors.push(...validate(schema.items, item, `${path}[${i}]`)));
    }
  }

  if (data !== null && typeof data === "object" && !Array.isArray(data)) {
    for (const key of schema.required ?? []) {
      if (!(key in data)) errors.push(`${path}: missing required property ${key}`);
    }
    const props = schema.properties ?? {};
    for (const [key, value] of Object.entries(data)) {
      if (props[key] !== undefined) {
        errors.push(...validate(props[key], value, `${path}.${key}`));
      } else if (schema.additionalProperties === false) {
        errors.push(`${path}: unexpected property ${key}`);
      } else if (schema.additionalProperties && typeof schema.additionalProperties === "object") {
        errors.push(...validate(schema.additionalProperties, value, `${path}.${key}`));
      }
    }
  }

  return errors;
}

const assertValid = (schema, data, label) => {
  const errors = validate(schema, data);
  assert.deepEqual(errors, [], `${label} did not validate:\n  ${errors.join("\n  ")}`);
};

const capabilityById = new Map(capabilities.map((c) => [c.id, c]));

// ---------------------------------------------------------------------------
// 1. The schemas themselves are well formed and the registry is sound.
// ---------------------------------------------------------------------------

test("schemas declare draft 2020-12 and an id", () => {
  for (const [name, schema] of Object.entries({ intentSchema, capabilitySchema, resultSchema })) {
    assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema", name);
    assert.match(schema.$id, /^https:\/\/essential-os\.dev\//, name);
  }
});

test("every capability satisfies the capability schema", () => {
  assert.ok(capabilities.length >= 20, "the registry should be substantial");
  for (const cap of capabilities) {
    assertValid(capabilitySchema, cap, `capability ${cap.id}`);
  }
});

test("capability ids are unique", () => {
  assert.equal(capabilityById.size, capabilities.length);
});

test("permission and confirmation are independent axes", () => {
  const permissions = new Set(capabilities.map((c) => c.permission));
  const confirmations = new Set(capabilities.map((c) => c.confirmation));
  assert.ok(permissions.size > 1, "more than one permission level is in use");
  assert.ok(confirmations.size > 1, "more than one confirmation policy is in use");
});

// ---------------------------------------------------------------------------
// 2. Positive intent fixtures resolve to real capabilities.
// ---------------------------------------------------------------------------

test("every intent fixture is well formed", () => {
  for (const c of intentFixtures.cases) {
    assert.ok(c.id, "a case needs an id");
    assert.equal(typeof c.input, "string");
    assert.ok(["automatic", "user", "model", "voice"].includes(c.source), c.id);
    assert.ok(c.expect && typeof c.expect.kind === "string", c.id);
  }
});

test("every intent fixture's action exists in the registry", () => {
  for (const c of intentFixtures.cases) {
    if (c.expect.kind !== "intent") continue;
    assert.ok(
      capabilityById.has(c.expect.action),
      `${c.id}: ${c.expect.action} is not a registered capability`,
    );
  }
});

test("every expected intent satisfies the intent schema", () => {
  for (const c of intentFixtures.cases) {
    if (c.expect.kind !== "intent") continue;
    const intent = {
      action: c.expect.action,
      args: c.expect.args ?? {},
      source: c.source,
      confidence: 1,
    };
    assertValid(intentSchema, intent, `intent for ${c.id}`);
  }
});

test("calculations are direct results, not intents", () => {
  const calc = intentFixtures.cases.find((c) => c.expect.kind === "calculation");
  assert.ok(calc, "the brief's calculation example must be present");
  assert.equal(calc.expect.value, 714);
});

// ---------------------------------------------------------------------------
// 3. Security fixtures never become unrestricted execution.
// ---------------------------------------------------------------------------

test("every security fixture is refused", () => {
  assert.ok(securityFixtures.cases.length >= 5);
  for (const c of securityFixtures.cases) {
    assert.equal(c.expect.kind, "refused", `${c.id} must be refused, not actioned`);
  }
});

test("no security fixture carries an action", () => {
  for (const c of securityFixtures.cases) {
    assert.equal(c.expect.action, undefined, `${c.id} must not name an action`);
  }
});

test("shell.run can never be auto-approved", () => {
  const shell = capabilityById.get("shell.run");
  assert.ok(shell, "shell.run must exist as a controlled capability");
  assert.notEqual(shell.permission, "read", "shell.run must not be a read capability");
  assert.notEqual(shell.confirmation, "never", "shell.run must never run without confirmation");
  assert.equal(shell.confirmation, "when_ambiguous");
});

test("there is no unrestricted run_shell capability", () => {
  // The generic, dangerous tool must not exist under any obvious name.
  for (const forbidden of ["shell.exec", "run_shell", "system.shell", "terminal.exec"]) {
    assert.equal(capabilityById.has(forbidden), false, `${forbidden} must not exist`);
  }
});

// ---------------------------------------------------------------------------
// 4. Coverage: the brief's four examples are all accounted for.
// ---------------------------------------------------------------------------

test("the brief's four examples are covered, divergences recorded", () => {
  const brief = intentFixtures.cases.filter((c) => c.brief);
  assert.equal(brief.length, 4, "all four brief examples must be present");
  for (const c of brief) {
    assert.ok(c.note, `${c.id} must record how it diverges from the brief`);
  }
});

// ---------------------------------------------------------------------------
// 5. ExecutionResult shape.
// ---------------------------------------------------------------------------

test("a structured result validates", () => {
  assertValid(
    resultSchema,
    {
      status: "success",
      entities: [{ id: "app:firefox", type: "application", name: "Firefox" }],
      output: "Opened Firefox.",
    },
    "example result",
  );
});

test("an unknown status is rejected", () => {
  const errors = validate(resultSchema, { status: "maybe" });
  assert.ok(errors.length > 0, "a non-contract status must fail");
});
