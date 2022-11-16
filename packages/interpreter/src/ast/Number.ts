import type { Expression } from "./Expression";

export type NumberExpression<
  NumberSlug extends string,
  BooleanSlug extends string,
  RecordSlug extends string
> =
  | NumberLiteral
  | NumberUnary<NumberSlug>
  | NumberBinary<NumberSlug>
  | NumberRecordAccess<RecordSlug>
  | NumberIf<NumberSlug, BooleanSlug>;

export interface NumberLiteral {
  type: "number-literal";
  value: number;
}

export interface NumberUnary<NumberSlug extends string> {
  type: "number-unary";
  operator: "-";
  expression: NumberSlug;
}

export interface NumberBinary<NumberSlug extends string> {
  type: "number-binary";
  left: NumberSlug;
  operator: NumberOperator;
  right: NumberSlug;
}

export type NumberOperator = "+" | "-" | "*" | "/";

export interface NumberRecordAccess<
  RecordSlug extends string,
  K extends string = string
> {
  type: "number-record-access";
  record: RecordSlug;
  key: K;
}

export interface NumberIf<N extends string, B extends string> {
  type: "number-if";
  condition: B;
  true: N;
  false: N;
}

// Checkers

export const isNumberExpression = <
  N extends string,
  S extends string,
  B extends string,
  R extends string
>(
  expression: Expression<N, S, B, R>
): expression is NumberExpression<N, B, R> =>
  isNumberLiteral(expression) ||
  isNumberUnary(expression) ||
  isNumberBinary(expression) ||
  isNumberRecordAccess(expression) ||
  isNumberIf(expression);

export const isNumberLiteral = <
  N extends string,
  S extends string,
  B extends string,
  R extends string
>(
  expression: Expression<N, S, B, R>
): expression is NumberLiteral => expression.type === "number-literal";

export const isNumberUnary = <
  N extends string,
  S extends string,
  B extends string,
  R extends string
>(
  expression: Expression<N, S, B, R>
): expression is NumberUnary<N> => expression.type === "number-unary";

export const isNumberBinary = <
  N extends string,
  S extends string,
  B extends string,
  R extends string
>(
  expression: Expression<N, S, B, R>
): expression is NumberBinary<N> => expression.type === "number-binary";

export const isNumberRecordAccess = <
  N extends string,
  S extends string,
  B extends string,
  R extends string
>(
  expression: Expression<N, S, B, R>
): expression is NumberRecordAccess<R> =>
  expression.type === "number-record-access";

export const isNumberIf = <
  N extends string,
  S extends string,
  B extends string,
  R extends string
>(
  expression: Expression<N, S, B, R>
): expression is NumberIf<N, B> => expression.type === "number-if";
