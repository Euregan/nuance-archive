import { Expression } from "./Expression";

export type BooleanExpression<
  NumberSlug extends string,
  StringSlug extends string,
  BooleanSlug extends string,
  RecordSlug extends string
> =
  | BooleanLiteral
  | BooleanUnary<BooleanSlug>
  | BooleanBinary<NumberSlug, StringSlug, BooleanSlug>
  | BooleanRecordAccess<RecordSlug>;

export interface BooleanLiteral {
  type: "boolean-literal";
  value: boolean;
}

export interface BooleanUnary<BooleanSlug extends string> {
  type: "boolean-unary";
  operator: "!";
  expression: BooleanSlug;
}

interface BooleanNumberBinary<NumberSlug extends string> {
  type: "boolean-number-binary";
  left: NumberSlug;
  operator: BooleanNumberOperator;
  right: NumberSlug;
}
interface BooleanStringBinary<StringSlug extends string> {
  type: "boolean-string-binary";
  left: StringSlug;
  operator: BooleanStringOperator;
  right: StringSlug;
}
interface BooleanBooleanBinary<BooleanSlug extends string> {
  type: "boolean-boolean-binary";
  left: BooleanSlug;
  operator: BooleanBooleanOperator;
  right: BooleanSlug;
}
export type BooleanBinary<
  NumberSlug extends string,
  StringSlug extends string,
  BooleanSlug extends string
> =
  | BooleanNumberBinary<NumberSlug>
  | BooleanStringBinary<StringSlug>
  | BooleanBooleanBinary<BooleanSlug>;

export type BooleanNumberOperator = "==" | "!=" | "<" | "<=" | ">" | ">=";
export type BooleanStringOperator = "==" | "!=";
export type BooleanBooleanOperator = "&&" | "||";

export interface BooleanRecordAccess<
  RecordSlug extends string,
  K extends string = string
> {
  type: "boolean-record-access";
  record: RecordSlug;
  key: K;
}

// Checkers

export const isBooleanExpression = <
  N extends string,
  S extends string,
  B extends string,
  R extends string
>(
  expression: Expression<N, S, B, R>
): expression is BooleanExpression<N, S, B, R> =>
  isBooleanLiteral(expression) ||
  isBooleanUnary(expression) ||
  isBooleanBinary(expression) ||
  isBooleanRecordAccess(expression);

export const isBooleanLiteral = <
  N extends string,
  S extends string,
  B extends string,
  R extends string
>(
  expression: Expression<N, S, B, R>
): expression is BooleanLiteral => expression.type === "boolean-literal";

export const isBooleanUnary = <
  N extends string,
  S extends string,
  B extends string,
  R extends string
>(
  expression: Expression<N, S, B, R>
): expression is BooleanUnary<B> => expression.type === "boolean-unary";

export const isBooleanBinary = <
  N extends string,
  S extends string,
  B extends string,
  R extends string
>(
  expression: Expression<N, S, B, R>
): expression is BooleanBinary<N, S, B> =>
  isBooleanNumberBinary(expression) ||
  isBooleanStringBinary(expression) ||
  isBooleanBooleanBinary(expression);
export const isBooleanNumberBinary = <
  N extends string,
  S extends string,
  B extends string,
  R extends string
>(
  expression: Expression<N, S, B, R>
): expression is BooleanNumberBinary<N> =>
  expression.type === "boolean-number-binary";
export const isBooleanStringBinary = <
  N extends string,
  S extends string,
  B extends string,
  R extends string
>(
  expression: Expression<N, S, B, R>
): expression is BooleanStringBinary<S> =>
  expression.type === "boolean-string-binary";
export const isBooleanBooleanBinary = <
  N extends string,
  S extends string,
  B extends string,
  R extends string
>(
  expression: Expression<N, S, B, R>
): expression is BooleanBooleanBinary<B> =>
  expression.type === "boolean-boolean-binary";

export const isBooleanRecordAccess = <
  N extends string,
  S extends string,
  B extends string,
  R extends string
>(
  expression: Expression<N, S, B, R>
): expression is BooleanRecordAccess<R> =>
  expression.type === "boolean-record-access";
