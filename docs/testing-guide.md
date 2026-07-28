# Test Organization Cheat Sheet

This note contains practical conventions for organizing unit tests. The names below are common patterns, not strict rules.

## Common test groups

- `Basic behavior` or `Happy path` — normal usage with valid arguments.
- `Edge cases` — boundary cases such as an empty array, zero, one item, or a missing match.
- `Validation` or `Invalid input` — invalid arguments and expected errors.
- `Default values` or `Omitted arguments` — omitted arguments and default behavior.
- `Error handling` — failures from dependencies and other exceptional situations.
- `Immutability` — verifies that input values are not mutated.
- `Side effects` — API calls, storage writes, logging, and callbacks.
- `Permissions` or `Authorization` — behavior for different access levels.
- `Regression` — protects against a specific bug that was previously found.

Only create groups that describe real behavior in the tested code. A small test file does not need every group.

## Grouping by behavior category

```js
describe('priceIncrease', () => {
  describe('Basic behavior', () => {})
  describe('Omitted arguments', () => {})
  describe('Edge cases', () => {})
  describe('Factor validation', () => {})
  describe('Immutability', () => {})
})
```

This style is useful when tests naturally fall into recognizable categories.

## Grouping by condition

```js
describe('priceIncrease', () => {
  describe('when id is provided', () => {})
  describe('when id is omitted', () => {})
  describe('when input is empty', () => {})
  describe('when factor is invalid', () => {})
})
```

This style is useful when behavior depends mainly on input conditions or application state.

## Practical rules

1. The outer `describe` usually names the function, component, or feature being tested.
2. A nested `describe` names a shared condition or behavior category.
3. A `test` name describes one observable expectation.
4. Avoid a group containing unrelated cases, such as a valid `id` and an invalid `factor`.
5. Avoid nesting when it does not make the test report easier to understand.
6. Prefer clear names over numbering tests: tests may be reordered or new cases inserted later.

The goal is that the console report reads like a short description of the tested behavior.
