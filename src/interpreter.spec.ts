import { describe, it, expect } from "vitest";
import { interpret } from "./interpreter";
import type {
  Expression,
  NumberRecordAccess,
  StringRecordAccess,
  BooleanRecordAccess,
} from "./ast";

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

  it.concurrent("works when accessing a record's number", () => {
    const ast: NumberRecordAccess<"number"> = {
      type: "number-record-access",
      key: "number",
      record: {
        type: "record-literal",
        expression: {
          number: 42,
          string: "hello world",
          boolean: true,
        },
      },
    };
    expect(interpret(ast as Expression)).toBe(42);
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

  it.concurrent("works when accessing a record's string", () => {
    const ast: StringRecordAccess<"string"> = {
      type: "string-record-access",
      key: "string",
      record: {
        type: "record-literal",
        expression: {
          number: 42,
          string: "hello world",
          boolean: true,
        },
      },
    };
    expect(interpret(ast as Expression)).toBe("hello world");
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

  it.concurrent("works when accessing a record's boolean", () => {
    const ast: BooleanRecordAccess<"boolean"> = {
      type: "boolean-record-access",
      key: "boolean",
      record: {
        type: "record-literal",
        expression: {
          number: 42,
          string: "hello world",
          boolean: true,
        },
      },
    };
    expect(interpret(ast as Expression)).toBe(true);
  });
});

describe.concurrent("records", () => {
  it.concurrent("works for a record literal", () => {
    expect(
      interpret({
        type: "record-literal",
        expression: {
          number: 42,
          string: "hello world",
          boolean: true,
        },
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
    const ast: NumberRecordAccess<"number"> = {
      type: "number-record-access",
      key: "number",
      record: {
        type: "record-literal",
        expression: {
          number: {
            type: "number-binary",
            left: 100,
            operator: "+",
            right: {
              type: "number-unary",
              operator: "-",
              expression: 58,
            },
          },
          string: "hello world",
          boolean: true,
        },
      },
    };
    expect(interpret(ast as Expression)).toBe(42);
  });

  it.concurrent("works with a large AST returning a string", () => {
    const ast: StringRecordAccess<"string"> = {
      type: "string-record-access",
      key: "string",
      record: {
        type: "record-literal",
        expression: {
          number: {
            type: "number-binary",
            left: 100,
            operator: "+",
            right: {
              type: "number-unary",
              operator: "-",
              expression: 58,
            },
          },
          string: {
            type: "string-binary",
            left: "hello",
            operator: "+",
            right: {
              type: "string-binary",
              left: " ",
              operator: "+",
              right: "world",
            },
          },
          boolean: true,
        },
      },
    };
    expect(interpret(ast as Expression)).toBe("hello world");
  });

  it.concurrent("works with a large AST returning a boolean", () => {
    const ast: BooleanRecordAccess<"boolean"> = {
      type: "boolean-record-access",
      key: "boolean",
      record: {
        type: "record-literal",
        expression: {
          number: {
            type: "number-binary",
            left: 100,
            operator: "+",
            right: {
              type: "number-unary",
              operator: "-",
              expression: 58,
            },
          },
          string: {
            type: "string-binary",
            left: "hello",
            operator: "+",
            right: {
              type: "string-binary",
              left: " ",
              operator: "+",
              right: "world",
            },
          },
          boolean: {
            type: "boolean-boolean-binary",
            left: {
              type: "boolean-unary",
              operator: "!",
              expression: true,
            },
            operator: "||",
            right: {
              type: "boolean-number-binary",
              left: 50,
              operator: ">",
              right: 40,
            },
          },
        },
      },
    };
    expect(interpret(ast as Expression)).toBe(true);
  });
});
