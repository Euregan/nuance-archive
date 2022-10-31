export type Expression =
  | NumberExpression
  | StringExpression
  | BooleanExpression
  | RecordExpression;

export type Literal = number | string | boolean | LiteralRecord;

// Number

export type NumberExpression =
  | number
  | NumberUnary
  | NumberBinary
  | NumberRecordAccess;

export interface NumberUnary {
  type: "number-unary";
  operator: "-";
  expression: NumberExpression;
}

export interface NumberBinary {
  type: "number-binary";
  left: NumberExpression;
  operator: NumberOperator;
  right: NumberExpression;
}

export type NumberOperator = "+" | "-" | "*" | "/";

export interface NumberRecordAccess<
  K extends string = string,
  O = Record<K, NumberExpression> & Record<Exclude<string, K>, Expression>
> {
  type: "number-record-access";
  record: O;
  key: K;
}

// String

export type StringExpression = string | StringBinary | StringRecordAccess;

export interface StringBinary {
  type: "string-binary";
  left: StringExpression;
  operator: StringOperator;
  right: StringExpression;
}

export type StringOperator = "+";

export interface StringRecordAccess<
  K extends string = string,
  O = Record<K, StringExpression> & Record<Exclude<string, K>, Expression>
> {
  type: "string-record-access";
  record: O;
  key: K;
}

// Boolean

export type BooleanExpression =
  | boolean
  | BooleanUnary
  | BooleanBinary
  | BooleanRecordAccess;

export interface BooleanUnary {
  type: "boolean-unary";
  operator: "!";
  expression: BooleanExpression;
}

interface BooleanNumberBinary {
  type: "boolean-number-binary";
  left: NumberExpression;
  operator: BooleanNumberOperator;
  right: NumberExpression;
}
interface BooleanStringBinary {
  type: "boolean-string-binary";
  left: StringExpression;
  operator: BooleanStringOperator;
  right: StringExpression;
}
interface BooleanBooleanBinary {
  type: "boolean-boolean-binary";
  left: BooleanExpression;
  operator: BooleanBooleanOperator;
  right: BooleanExpression;
}
export type BooleanBinary =
  | BooleanNumberBinary
  | BooleanStringBinary
  | BooleanBooleanBinary;

export type BooleanNumberOperator = "==" | "!=" | "<" | "<=" | ">" | ">=";
export type BooleanStringOperator = "==" | "!=";
export type BooleanBooleanOperator = "&&" | "||";

export interface BooleanRecordAccess<
  K extends string = string,
  O = Record<K, BooleanExpression> & Record<Exclude<string, K>, Expression>
> {
  type: "boolean-record-access";
  record: O;
  key: K;
}

// Record

export type LiteralRecord = { [key: string]: Literal };

export type NuanceRecord = { [key: string]: Expression };

export type RecordExpression = RecordLiteral;

export interface RecordLiteral {
  type: "record-literal";
  expression: NuanceRecord;
}

// Checkers

// General

export const isLiteral = (
  expression: Expression
): expression is number | string | boolean =>
  ["number", "string", "boolean"].includes(typeof expression);

export const isUnary = (
  expression: Expression
): expression is NumberUnary | BooleanUnary =>
  !isLiteral(expression) && expression.type.endsWith("unary");

// Number

export const isNumberExpression = (
  expression: Expression
): expression is NumberExpression =>
  isNumber(expression) ||
  isNumberUnary(expression) ||
  isNumberBinary(expression) ||
  isNumberRecordAccess(expression);

export const isNumber = (expression: Expression): expression is number =>
  typeof expression === "number";

export const isNumberUnary = (
  expression: Expression
): expression is NumberUnary =>
  !isLiteral(expression) && expression.type === "number-unary";

export const isNumberBinary = (
  expression: Expression
): expression is NumberBinary =>
  !isLiteral(expression) && expression.type === "number-binary";

export const isNumberRecordAccess = (
  expression: Expression
): expression is NumberRecordAccess =>
  !isLiteral(expression) && expression.type === "number-record-access";

// String

export const isStringExpression = (
  expression: Expression
): expression is StringExpression =>
  isString(expression) ||
  isStringBinary(expression) ||
  isStringRecordAccess(expression);

export const isString = (expression: Expression): expression is string =>
  typeof expression === "string";

export const isStringBinary = (
  expression: Expression
): expression is NumberBinary =>
  !isLiteral(expression) && expression.type === "string-binary";

export const isStringRecordAccess = (
  expression: Expression
): expression is StringRecordAccess =>
  !isLiteral(expression) && expression.type === "string-record-access";

// Boolean

export const isBooleanExpression = (
  expression: Expression
): expression is BooleanExpression =>
  isBoolean(expression) ||
  isBooleanUnary(expression) ||
  isBooleanBinary(expression) ||
  isBooleanRecordAccess(expression);

export const isBoolean = (expression: Expression): expression is boolean =>
  typeof expression === "boolean";

export const isBooleanUnary = (
  expression: Expression
): expression is BooleanUnary =>
  !isLiteral(expression) && expression.type === "boolean-unary";

export const isBooleanBinary = (
  expression: Expression
): expression is BooleanBinary =>
  isBooleanNumberBinary(expression) ||
  isBooleanStringBinary(expression) ||
  isBooleanBooleanBinary(expression);
export const isBooleanNumberBinary = (
  expression: Expression
): expression is BooleanNumberBinary =>
  !isLiteral(expression) && expression.type === "boolean-number-binary";
export const isBooleanStringBinary = (
  expression: Expression
): expression is BooleanStringBinary =>
  !isLiteral(expression) && expression.type === "boolean-string-binary";
export const isBooleanBooleanBinary = (
  expression: Expression
): expression is BooleanBooleanBinary =>
  !isLiteral(expression) && expression.type === "boolean-boolean-binary";

export const isBooleanRecordAccess = (
  expression: Expression
): expression is BooleanRecordAccess =>
  !isLiteral(expression) && expression.type === "boolean-record-access";
