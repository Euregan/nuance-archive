import type { Expression } from "./Expression";

export type StringExpression<
  StringSlug extends string,
  BooleanSlug extends string,
  RecordSlug extends string
> =
  | StringLiteral
  | StringBinary<StringSlug>
  | StringRecordAccess<RecordSlug>
  | StringIf<StringSlug, BooleanSlug>;

export interface StringLiteral {
  type: "string-literal";
  value: string;
}

export interface StringBinary<StringSlug extends string> {
  type: "string-binary";
  left: StringSlug;
  operator: StringOperator;
  right: StringSlug;
}

export type StringOperator = "+";

export interface StringRecordAccess<
  RecordSlug extends string,
  K extends string = string
> {
  type: "string-record-access";
  record: RecordSlug;
  key: K;
}

export interface StringIf<S extends string, B extends string> {
  type: "string-if";
  condition: B;
  true: S;
  false: S;
}

// Checkers

export const isStringExpression = <
  N extends string,
  S extends string,
  B extends string,
  R extends string
>(
  expression: Expression<N, S, B, R>
): expression is StringExpression<S, B, R> =>
  isStringLiteral(expression) ||
  isStringBinary(expression) ||
  isStringRecordAccess(expression) ||
  isStringIf(expression);

export const isStringLiteral = <
  N extends string,
  S extends string,
  B extends string,
  R extends string
>(
  expression: Expression<N, S, B, R>
): expression is StringLiteral => expression.type === "string-literal";

export const isStringBinary = <
  N extends string,
  S extends string,
  B extends string,
  R extends string
>(
  expression: Expression<N, S, B, R>
): expression is StringBinary<S> => expression.type === "string-binary";

export const isStringRecordAccess = <
  N extends string,
  S extends string,
  B extends string,
  R extends string
>(
  expression: Expression<N, S, B, R>
): expression is StringRecordAccess<R> =>
  expression.type === "string-record-access";

export const isStringIf = <
  N extends string,
  S extends string,
  B extends string,
  R extends string
>(
  expression: Expression<N, S, B, R>
): expression is StringIf<S, B> => expression.type === "string-if";
