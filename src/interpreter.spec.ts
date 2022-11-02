import { describe, it, expect } from "vitest";
import { interpret } from "./interpreter";

describe.concurrent("numbers", () => {
  it.concurrent("works for a number literal", () => {
    expect(
      interpret({
        result: { type: "number-literal", value: 42 },
        numbers: {},
        strings: {},
        booleans: {},
        records: {},
      })
    ).toBe(42);
    expect(
      interpret({
        result: { type: "number-literal", value: -42 },
        numbers: {},
        strings: {},
        booleans: {},
        records: {},
      })
    ).toBe(-42);
  });

  it.concurrent("works for a number unary", () => {
    expect(
      interpret({
        result: { type: "number-unary", operator: "-", expression: "1" },
        numbers: { "1": { type: "number-literal", value: 42 } },
        strings: {},
        booleans: {},
        records: {},
      })
    ).toBe(-42);
    expect(
      interpret({
        result: { type: "number-unary", operator: "-", expression: "1" },
        numbers: { "1": { type: "number-literal", value: -42 } },
        strings: {},
        booleans: {},
        records: {},
      })
    ).toBe(42);
  });

  it.concurrent("works for a number binary", () => {
    expect(
      interpret({
        result: { type: "number-binary", operator: "-", left: "1", right: "2" },
        numbers: {
          "1": { type: "number-literal", value: 42 },
          "2": { type: "number-literal", value: 13 },
        },
        strings: {},
        booleans: {},
        records: {},
      })
    ).toBe(29);
    expect(
      interpret({
        result: { type: "number-binary", operator: "+", left: "1", right: "2" },
        numbers: {
          "1": { type: "number-literal", value: 42 },
          "2": { type: "number-literal", value: 13 },
        },
        strings: {},
        booleans: {},
        records: {},
      })
    ).toBe(55);
    expect(
      interpret({
        result: { type: "number-binary", operator: "*", left: "1", right: "2" },
        numbers: {
          "1": { type: "number-literal", value: 42 },
          "2": { type: "number-literal", value: 13 },
        },
        strings: {},
        booleans: {},
        records: {},
      })
    ).toBe(546);
    expect(
      interpret({
        result: { type: "number-binary", operator: "/", left: "1", right: "2" },
        numbers: {
          "1": { type: "number-literal", value: 42 },
          "2": { type: "number-literal", value: 13 },
        },
        strings: {},
        booleans: {},
        records: {},
      })
    ).toBe(3.230769230769231);
  });

  it.concurrent("works when accessing a record's number", () => {
    expect(
      interpret({
        result: { type: "number-record-access", key: "number", record: "1" },
        numbers: { "1": { type: "number-literal", value: 42 } },
        strings: { "1": { type: "string-literal", value: "hello world" } },
        booleans: { "1": { type: "boolean-literal", value: true } },
        records: {
          "1": {
            type: "record-literal",
            value: {
              number: ["number", "1"],
              string: ["string", "1"],
              boolean: ["boolean", "1"],
            },
          },
        },
      })
    ).toBe(42);
  });
});

describe.concurrent("strings", () => {
  it.concurrent("works for a string literal", () => {
    expect(
      interpret({
        result: { type: "string-literal", value: "hello world" },
        numbers: {},
        strings: {},
        booleans: {},
        records: {},
      })
    ).toBe("hello world");
  });

  it.concurrent("works for a string binary", () => {
    expect(
      interpret({
        result: {
          type: "string-binary",
          operator: "+",
          left: "1",
          right: "2",
        },
        numbers: {},
        strings: {
          "1": { type: "string-literal", value: "hello " },
          "2": { type: "string-literal", value: "world" },
        },
        booleans: {},
        records: {},
      })
    ).toBe("hello world");
  });

  it.concurrent("works when accessing a record's string", () => {
    expect(
      interpret({
        result: { type: "string-record-access", key: "string", record: "1" },
        numbers: { "1": { type: "number-literal", value: 42 } },
        strings: { "1": { type: "string-literal", value: "hello world" } },
        booleans: { "1": { type: "boolean-literal", value: true } },
        records: {
          "1": {
            type: "record-literal",
            value: {
              number: ["number", "1"],
              string: ["string", "1"],
              boolean: ["boolean", "1"],
            },
          },
        },
      })
    ).toBe("hello world");
  });
});

describe.concurrent("booleans", () => {
  it.concurrent("works for a boolean literal", () => {
    expect(
      interpret({
        result: { type: "boolean-literal", value: true },
        numbers: {},
        strings: {},
        booleans: {},
        records: {},
      })
    ).toBe(true);
    expect(
      interpret({
        result: { type: "boolean-literal", value: false },
        numbers: {},
        strings: {},
        booleans: {},
        records: {},
      })
    ).toBe(false);
  });

  it.concurrent("works for a boolean unary", () => {
    expect(
      interpret({
        result: { type: "boolean-unary", operator: "!", expression: "1" },
        numbers: {},
        strings: {},
        booleans: { "1": { type: "boolean-literal", value: true } },
        records: {},
      })
    ).toBe(false);
    expect(
      interpret({
        result: { type: "boolean-unary", operator: "!", expression: "1" },
        numbers: {},
        strings: {},
        booleans: { "1": { type: "boolean-literal", value: false } },
        records: {},
      })
    ).toBe(true);
  });

  it.concurrent("works for a boolean number binary", () => {
    expect(
      interpret({
        result: {
          type: "boolean-number-binary",
          operator: "==",
          left: "1",
          right: "2",
        },
        numbers: {
          "1": { type: "number-literal", value: 42 },
          "2": { type: "number-literal", value: 13 },
        },
        strings: {},
        booleans: {},
        records: {},
      })
    ).toBe(false);
    expect(
      interpret({
        result: {
          type: "boolean-number-binary",
          operator: "==",
          left: "1",
          right: "2",
        },
        numbers: {
          "1": { type: "number-literal", value: 42 },
          "2": { type: "number-literal", value: 42 },
        },
        strings: {},
        booleans: {},
        records: {},
      })
    ).toBe(true);

    expect(
      interpret({
        result: {
          type: "boolean-number-binary",
          operator: "!=",
          left: "1",
          right: "2",
        },
        numbers: {
          "1": { type: "number-literal", value: 42 },
          "2": { type: "number-literal", value: 13 },
        },
        strings: {},
        booleans: {},
        records: {},
      })
    ).toBe(true);
    expect(
      interpret({
        result: {
          type: "boolean-number-binary",
          operator: "!=",
          left: "1",
          right: "2",
        },
        numbers: {
          "1": { type: "number-literal", value: 42 },
          "2": { type: "number-literal", value: 42 },
        },
        strings: {},
        booleans: {},
        records: {},
      })
    ).toBe(false);

    expect(
      interpret({
        result: {
          type: "boolean-number-binary",
          operator: ">",
          left: "1",
          right: "2",
        },
        numbers: {
          "1": { type: "number-literal", value: 42 },
          "2": { type: "number-literal", value: 13 },
        },
        strings: {},
        booleans: {},
        records: {},
      })
    ).toBe(true);
    expect(
      interpret({
        result: {
          type: "boolean-number-binary",
          operator: ">",
          left: "1",
          right: "2",
        },
        numbers: {
          "1": { type: "number-literal", value: 42 },
          "2": { type: "number-literal", value: 42 },
        },
        strings: {},
        booleans: {},
        records: {},
      })
    ).toBe(false);

    expect(
      interpret({
        result: {
          type: "boolean-number-binary",
          operator: ">=",
          left: "1",
          right: "2",
        },
        numbers: {
          "1": { type: "number-literal", value: 42 },
          "2": { type: "number-literal", value: 13 },
        },
        strings: {},
        booleans: {},
        records: {},
      })
    ).toBe(true);
    expect(
      interpret({
        result: {
          type: "boolean-number-binary",
          operator: ">=",
          left: "1",
          right: "2",
        },
        numbers: {
          "1": { type: "number-literal", value: 42 },
          "2": { type: "number-literal", value: 42 },
        },
        strings: {},
        booleans: {},
        records: {},
      })
    ).toBe(true);

    expect(
      interpret({
        result: {
          type: "boolean-number-binary",
          operator: "<",
          left: "1",
          right: "2",
        },
        numbers: {
          "1": { type: "number-literal", value: 42 },
          "2": { type: "number-literal", value: 13 },
        },
        strings: {},
        booleans: {},
        records: {},
      })
    ).toBe(false);
    expect(
      interpret({
        result: {
          type: "boolean-number-binary",
          operator: "<",
          left: "1",
          right: "2",
        },
        numbers: {
          "1": { type: "number-literal", value: 42 },
          "2": { type: "number-literal", value: 42 },
        },
        strings: {},
        booleans: {},
        records: {},
      })
    ).toBe(false);

    expect(
      interpret({
        result: {
          type: "boolean-number-binary",
          operator: "<=",
          left: "1",
          right: "2",
        },
        numbers: {
          "1": { type: "number-literal", value: 42 },
          "2": { type: "number-literal", value: 13 },
        },
        strings: {},
        booleans: {},
        records: {},
      })
    ).toBe(false);
    expect(
      interpret({
        result: {
          type: "boolean-number-binary",
          operator: "<=",
          left: "1",
          right: "2",
        },
        numbers: {
          "1": { type: "number-literal", value: 42 },
          "2": { type: "number-literal", value: 42 },
        },
        strings: {},
        booleans: {},
        records: {},
      })
    ).toBe(true);
  });

  it.concurrent("works for a boolean string binary", () => {
    expect(
      interpret({
        result: {
          type: "boolean-string-binary",
          operator: "==",
          left: "1",
          right: "2",
        },
        numbers: {},
        strings: {
          "1": { type: "string-literal", value: "hello" },
          "2": { type: "string-literal", value: "world" },
        },
        booleans: {},
        records: {},
      })
    ).toBe(false);
    expect(
      interpret({
        result: {
          type: "boolean-string-binary",
          operator: "==",
          left: "1",
          right: "2",
        },
        numbers: {},
        strings: {
          "1": { type: "string-literal", value: "hello" },
          "2": { type: "string-literal", value: "hello" },
        },
        booleans: {},
        records: {},
      })
    ).toBe(true);

    expect(
      interpret({
        result: {
          type: "boolean-string-binary",
          operator: "!=",
          left: "1",
          right: "2",
        },
        numbers: {},
        strings: {
          "1": { type: "string-literal", value: "hello" },
          "2": { type: "string-literal", value: "world" },
        },
        booleans: {},
        records: {},
      })
    ).toBe(true);
    expect(
      interpret({
        result: {
          type: "boolean-string-binary",
          operator: "!=",
          left: "1",
          right: "2",
        },
        numbers: {},
        strings: {
          "1": { type: "string-literal", value: "hello" },
          "2": { type: "string-literal", value: "hello" },
        },
        booleans: {},
        records: {},
      })
    ).toBe(false);
  });

  it.concurrent("works for a boolean boolean binary", () => {
    expect(
      interpret({
        result: {
          type: "boolean-boolean-binary",
          operator: "&&",
          left: "1",
          right: "2",
        },
        numbers: {},
        strings: {},
        booleans: {
          "1": { type: "boolean-literal", value: true },
          "2": { type: "boolean-literal", value: false },
        },
        records: {},
      })
    ).toBe(false);
    expect(
      interpret({
        result: {
          type: "boolean-boolean-binary",
          operator: "&&",
          left: "1",
          right: "2",
        },
        numbers: {},
        strings: {},
        booleans: {
          "1": { type: "boolean-literal", value: true },
          "2": { type: "boolean-literal", value: true },
        },
        records: {},
      })
    ).toBe(true);
    expect(
      interpret({
        result: {
          type: "boolean-boolean-binary",
          operator: "&&",
          left: "1",
          right: "2",
        },
        numbers: {},
        strings: {},
        booleans: {
          "1": { type: "boolean-literal", value: false },
          "2": { type: "boolean-literal", value: false },
        },
        records: {},
      })
    ).toBe(false);

    expect(
      interpret({
        result: {
          type: "boolean-boolean-binary",
          operator: "||",
          left: "1",
          right: "2",
        },
        numbers: {},
        strings: {},
        booleans: {
          "1": { type: "boolean-literal", value: true },
          "2": { type: "boolean-literal", value: false },
        },
        records: {},
      })
    ).toBe(true);
    expect(
      interpret({
        result: {
          type: "boolean-boolean-binary",
          operator: "||",
          left: "1",
          right: "2",
        },
        numbers: {},
        strings: {},
        booleans: {
          "1": { type: "boolean-literal", value: true },
          "2": { type: "boolean-literal", value: true },
        },
        records: {},
      })
    ).toBe(true);
    expect(
      interpret({
        result: {
          type: "boolean-boolean-binary",
          operator: "||",
          left: "1",
          right: "2",
        },
        numbers: {},
        strings: {},
        booleans: {
          "1": { type: "boolean-literal", value: false },
          "2": { type: "boolean-literal", value: false },
        },
        records: {},
      })
    ).toBe(false);
  });

  it.concurrent("works when accessing a record's boolean", () => {
    expect(
      interpret({
        result: { type: "boolean-record-access", key: "boolean", record: "1" },
        numbers: { "1": { type: "number-literal", value: 42 } },
        strings: { "1": { type: "string-literal", value: "hello world" } },
        booleans: { "1": { type: "boolean-literal", value: true } },
        records: {
          "1": {
            type: "record-literal",
            value: {
              number: ["number", "1"],
              string: ["string", "1"],
              boolean: ["boolean", "1"],
            },
          },
        },
      })
    ).toBe(true);
  });
});

describe.concurrent("records", () => {
  it.concurrent("works for a record literal", () => {
    expect(
      interpret({
        result: {
          type: "record-literal",
          value: {
            number: ["number", "1"],
            string: ["string", "1"],
            boolean: ["boolean", "1"],
          },
        },
        numbers: { "1": { type: "number-literal", value: 42 } },
        strings: { "1": { type: "string-literal", value: "hello world" } },
        booleans: { "1": { type: "boolean-literal", value: true } },
        records: {},
      })
    ).toEqual({
      number: 42,
      string: "hello world",
      boolean: true,
    });
  });
});

describe.concurrent("big ASTs", () => {
  it.concurrent("works with a large AST returning a number", () => {
    expect(
      interpret({
        result: { type: "number-record-access", key: "number", record: "1" },
        numbers: {
          "1": {
            type: "number-binary",
            left: "2",
            operator: "+",
            right: "3",
          },
          "2": {
            type: "number-literal",
            value: 100,
          },
          "3": {
            type: "number-unary",
            operator: "-",
            expression: "4",
          },
          "4": {
            type: "number-literal",
            value: 58,
          },
          "5": { type: "number-literal", value: 50 },
          "6": { type: "number-literal", value: 40 },
        },
        strings: {
          "1": {
            type: "string-binary",
            left: "2",
            operator: "+",
            right: "3",
          },
          "2": {
            type: "string-literal",
            value: "hello",
          },
          "3": {
            type: "string-binary",
            left: "4",
            operator: "+",
            right: "5",
          },
          "4": {
            type: "string-literal",
            value: " ",
          },
          "5": {
            type: "string-literal",
            value: "world",
          },
        },
        booleans: {
          "1": {
            type: "boolean-boolean-binary",
            left: "2",
            operator: "||",
            right: "3",
          },
          "2": {
            type: "boolean-unary",
            operator: "!",
            expression: "4",
          },
          "3": {
            type: "boolean-number-binary",
            left: "5",
            operator: ">",
            right: "6",
          },
          "4": {
            type: "boolean-literal",
            value: true,
          },
        },
        records: {
          "1": {
            type: "record-literal",
            value: {
              number: ["number", "1"],
              string: ["string", "1"],
              boolean: ["boolean", "1"],
            },
          },
        },
      })
    ).toBe(42);
  });

  it.concurrent("works with a large AST returning a string", () => {
    expect(
      interpret({
        result: { type: "string-record-access", key: "string", record: "1" },
        numbers: {
          "1": {
            type: "number-binary",
            left: "2",
            operator: "+",
            right: "3",
          },
          "2": {
            type: "number-literal",
            value: 100,
          },
          "3": {
            type: "number-unary",
            operator: "-",
            expression: "4",
          },
          "4": {
            type: "number-literal",
            value: 58,
          },
          "5": { type: "number-literal", value: 50 },
          "6": { type: "number-literal", value: 40 },
        },
        strings: {
          "1": {
            type: "string-binary",
            left: "2",
            operator: "+",
            right: "3",
          },
          "2": {
            type: "string-literal",
            value: "hello",
          },
          "3": {
            type: "string-binary",
            left: "4",
            operator: "+",
            right: "5",
          },
          "4": {
            type: "string-literal",
            value: " ",
          },
          "5": {
            type: "string-literal",
            value: "world",
          },
        },
        booleans: {
          "1": {
            type: "boolean-boolean-binary",
            left: "2",
            operator: "||",
            right: "3",
          },
          "2": {
            type: "boolean-unary",
            operator: "!",
            expression: "4",
          },
          "3": {
            type: "boolean-number-binary",
            left: "5",
            operator: ">",
            right: "6",
          },
          "4": {
            type: "boolean-literal",
            value: true,
          },
        },
        records: {
          "1": {
            type: "record-literal",
            value: {
              number: ["number", "1"],
              string: ["string", "1"],
              boolean: ["boolean", "1"],
            },
          },
        },
      })
    ).toBe("hello world");
  });

  it.concurrent("works with a large AST returning a boolean", () => {
    expect(
      interpret({
        result: { type: "boolean-record-access", key: "boolean", record: "1" },
        numbers: {
          "1": {
            type: "number-binary",
            left: "2",
            operator: "+",
            right: "3",
          },
          "2": {
            type: "number-literal",
            value: 100,
          },
          "3": {
            type: "number-unary",
            operator: "-",
            expression: "4",
          },
          "4": {
            type: "number-literal",
            value: 58,
          },
          "5": { type: "number-literal", value: 50 },
          "6": { type: "number-literal", value: 40 },
        },
        strings: {
          "1": {
            type: "string-binary",
            left: "2",
            operator: "+",
            right: "3",
          },
          "2": {
            type: "string-literal",
            value: "hello",
          },
          "3": {
            type: "string-binary",
            left: "4",
            operator: "+",
            right: "5",
          },
          "4": {
            type: "string-literal",
            value: " ",
          },
          "5": {
            type: "string-literal",
            value: "world",
          },
        },
        booleans: {
          "1": {
            type: "boolean-boolean-binary",
            left: "2",
            operator: "||",
            right: "3",
          },
          "2": {
            type: "boolean-unary",
            operator: "!",
            expression: "4",
          },
          "3": {
            type: "boolean-number-binary",
            left: "5",
            operator: ">",
            right: "6",
          },
          "4": {
            type: "boolean-literal",
            value: true,
          },
        },
        records: {
          "1": {
            type: "record-literal",
            value: {
              number: ["number", "1"],
              string: ["string", "1"],
              boolean: ["boolean", "1"],
            },
          },
        },
      })
    ).toBe(true);
  });
});
