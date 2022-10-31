import { describe, it, expect } from "vitest";
import { interpret } from "./interpreter";

describe.concurrent("numbers", () => {
  it.concurrent("works for a number literal", () => {
    expect(interpret(42)).toBe(42);
    expect(interpret(-42)).toBe(-42);
  });

  it.concurrent("works for a number unary", () => {
    expect(
      interpret({ type: "number-unary", operator: "-", expression: 42 })
    ).toBe(-42);
    expect(
      interpret({ type: "number-unary", operator: "-", expression: -42 })
    ).toBe(42);
  });

  it.concurrent("works for a number binary", () => {
    expect(
      interpret({ type: "number-binary", operator: "-", left: 42, right: 13 })
    ).toBe(29);
    expect(
      interpret({ type: "number-binary", operator: "+", left: 42, right: 13 })
    ).toBe(55);
    expect(
      interpret({ type: "number-binary", operator: "*", left: 42, right: 13 })
    ).toBe(546);
    expect(
      interpret({ type: "number-binary", operator: "/", left: 42, right: 13 })
    ).toBe(3.230769230769231);
  });
});

describe.concurrent("strings", () => {
  it.concurrent("works for a string literal", () => {
    expect(interpret("hello world")).toBe("hello world");
  });

  it.concurrent("works for a string binary", () => {
    expect(
      interpret({
        type: "string-binary",
        operator: "+",
        left: "hello ",
        right: "world",
      })
    ).toBe("hello world");
  });
});

describe.concurrent("booleans", () => {
  it.concurrent("works for a boolean literal", () => {
    expect(interpret(true)).toBe(true);
    expect(interpret(false)).toBe(false);
  });

  it.concurrent("works for a boolean unary", () => {
    expect(
      interpret({ type: "boolean-unary", operator: "!", expression: true })
    ).toBe(false);
    expect(
      interpret({ type: "boolean-unary", operator: "!", expression: false })
    ).toBe(true);
  });

  it.concurrent("works for a boolean number binary", () => {
    expect(
      interpret({
        type: "boolean-number-binary",
        operator: "==",
        left: 42,
        right: 13,
      })
    ).toBe(false);
    expect(
      interpret({
        type: "boolean-number-binary",
        operator: "==",
        left: 42,
        right: 42,
      })
    ).toBe(true);

    expect(
      interpret({
        type: "boolean-number-binary",
        operator: "!=",
        left: 42,
        right: 13,
      })
    ).toBe(true);
    expect(
      interpret({
        type: "boolean-number-binary",
        operator: "!=",
        left: 42,
        right: 42,
      })
    ).toBe(false);

    expect(
      interpret({
        type: "boolean-number-binary",
        operator: ">",
        left: 42,
        right: 13,
      })
    ).toBe(true);
    expect(
      interpret({
        type: "boolean-number-binary",
        operator: ">",
        left: 42,
        right: 42,
      })
    ).toBe(false);

    expect(
      interpret({
        type: "boolean-number-binary",
        operator: ">=",
        left: 42,
        right: 13,
      })
    ).toBe(true);
    expect(
      interpret({
        type: "boolean-number-binary",
        operator: ">=",
        left: 42,
        right: 42,
      })
    ).toBe(true);

    expect(
      interpret({
        type: "boolean-number-binary",
        operator: "<",
        left: 42,
        right: 13,
      })
    ).toBe(false);
    expect(
      interpret({
        type: "boolean-number-binary",
        operator: "<",
        left: 42,
        right: 42,
      })
    ).toBe(false);

    expect(
      interpret({
        type: "boolean-number-binary",
        operator: "<=",
        left: 42,
        right: 13,
      })
    ).toBe(false);
    expect(
      interpret({
        type: "boolean-number-binary",
        operator: "<=",
        left: 42,
        right: 42,
      })
    ).toBe(true);
  });

  it.concurrent("works for a boolean string binary", () => {
    expect(
      interpret({
        type: "boolean-string-binary",
        operator: "==",
        left: "hello",
        right: "world",
      })
    ).toBe(false);
    expect(
      interpret({
        type: "boolean-string-binary",
        operator: "==",
        left: "hello",
        right: "hello",
      })
    ).toBe(true);

    expect(
      interpret({
        type: "boolean-string-binary",
        operator: "!=",
        left: "hello",
        right: "world",
      })
    ).toBe(true);
    expect(
      interpret({
        type: "boolean-string-binary",
        operator: "!=",
        left: "hello",
        right: "hello",
      })
    ).toBe(false);
  });

  it.concurrent("works for a boolean boolean binary", () => {
    expect(
      interpret({
        type: "boolean-boolean-binary",
        operator: "&&",
        left: true,
        right: false,
      })
    ).toBe(false);
    expect(
      interpret({
        type: "boolean-boolean-binary",
        operator: "&&",
        left: true,
        right: true,
      })
    ).toBe(true);

    expect(
      interpret({
        type: "boolean-boolean-binary",
        operator: "||",
        left: true,
        right: false,
      })
    ).toBe(true);
    expect(
      interpret({
        type: "boolean-boolean-binary",
        operator: "||",
        left: true,
        right: true,
      })
    ).toBe(true);
  });
});
