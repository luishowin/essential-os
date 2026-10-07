# 0008. The LLM is a translator and planner, not the executor

- **Status:** Accepted
- **Date:** 2026-10-07

## Context

The default shape of an "AI agent" is a model in a loop with tools, deciding
what to do and doing it. That shape makes the model the source of both intent
and action, which means the system cannot meaningfully validate, permission or
verify anything: the model has already acted.

## Decision

The model's job is to **translate and plan**: turn language (and context) into
structured `Intent` values, and possibly a plan. It never executes. Execution is
the runtime's job, behind validation, permission and confirmation.

The model is therefore not asked to "chat with the user" as its primary
function. It is asked to emit structured intent.

## Reasoning

- This is the single boundary that keeps Ida from becoming "an LLM that can run
  shell commands."
- It makes the model replaceable: a better model improves translation and
  planning, and changes nothing about safety.
- It makes the system testable: the model's output is data, and data can be
  validated and tested.
- It is what lets a *small* model be useful: the model does not need to be
  trusted, because it is not trusted.

## Alternatives

- **Model-in-the-loop with tools.** Rejected: no meaningful boundary.
- **Model only for chat, deterministic only for actions.** Rejected: too rigid;
  a model is genuinely needed for paraphrase, ambiguity and multi-step plans.

## Consequences

- Model output only ever becomes an `Intent` through registry validation.
- The runtime is a state machine with explicit failure states, not a model
  conversation.
- A small local model can be used for intent classification and tool selection,
  with validation absorbing its weaknesses.
- Model calls are isolated to one stage of the pipeline.
