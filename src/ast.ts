export type AST<
  NumberSlug extends string = string,
  StringSlug extends string = string,
  BooleanSlug extends string = string,
  RecordSlug extends string = string
> = {
  result: Expression<NumberSlug, StringSlug, BooleanSlug, RecordSlug>;
  numbers: Record<NumberSlug, NumberExpression<NumberSlug, RecordSlug>>;
  strings: Record<StringSlug, StringExpression<StringSlug, RecordSlug>>;
  booleans: Record<
    BooleanSlug,
    BooleanExpression<NumberSlug, StringSlug, BooleanSlug, RecordSlug>
  >;
  records: Record<
    RecordSlug,
    RecordExpression<NumberSlug, StringSlug, BooleanSlug, RecordSlug>
  >;
};

export type Expression<
  NumberSlug extends string,
  StringSlug extends string,
  BooleanSlug extends string,
  RecordSlug extends string
> =
  | NumberExpression<NumberSlug, RecordSlug>
  | StringExpression<StringSlug, RecordSlug>
  | BooleanExpression<NumberSlug, StringSlug, BooleanSlug, RecordSlug>
  | RecordExpression<NumberSlug, StringSlug, BooleanSlug, RecordSlug>;

export type ActualValue = number | string | boolean | ActualRecord;

// Number

export type NumberExpression<
  NumberSlug extends string,
  RecordSlug extends string
> =
  | NumberLiteral
  | NumberUnary<NumberSlug>
  | NumberBinary<NumberSlug>
  | NumberRecordAccess<RecordSlug>;

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

// String

export type StringExpression<
  StringSlug extends string,
  RecordSlug extends string
> = StringLiteral | StringBinary<StringSlug> | StringRecordAccess<RecordSlug>;

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

// Boolean

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

// Record

export type ActualRecord = { [key: string]: ActualValue };

export type RecordExpression<
  N extends string,
  S extends string,
  B extends string,
  R extends string
> = RecordLiteral<N, S, B, R>;

type Reference<
  N extends string,
  S extends string,
  B extends string,
  R extends string
> = ["number", N] | ["string", S] | ["boolean", B] | ["record", R];

export interface RecordLiteral<
  N extends string,
  S extends string,
  B extends string,
  R extends string
> {
  type: "record-literal";
  value: Record<string, Reference<N, S, B, R>>;
}

// Checkers

// Number

export const isNumberExpression = <
  N extends string,
  S extends string,
  B extends string,
  R extends string
>(
  expression: Expression<N, S, B, R>
): expression is NumberExpression<N, R> =>
  isNumberLiteral(expression) ||
  isNumberUnary(expression) ||
  isNumberBinary(expression) ||
  isNumberRecordAccess(expression);

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

// String

export const isStringExpression = <
  N extends string,
  S extends string,
  B extends string,
  R extends string
>(
  expression: Expression<N, S, B, R>
): expression is StringExpression<S, R> =>
  isStringLiteral(expression) ||
  isStringBinary(expression) ||
  isStringRecordAccess(expression);

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

// Boolean

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
