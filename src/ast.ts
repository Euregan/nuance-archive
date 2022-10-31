export type Expression =
  | NumberExpression
  | StringExpression
  | BooleanExpression;

// Number

export type NumberExpression = number | NumberUnary | NumberBinary;

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

// String

export type StringExpression = string | StringBinary;

export interface StringBinary {
  type: "string-binary";
  left: StringExpression;
  operator: StringOperator;
  right: StringExpression;
}

export type StringOperator = "+";

// Boolean

export type BooleanExpression = boolean | BooleanUnary | BooleanBinary;

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
  isNumberBinary(expression);

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

// String

export const isStringExpression = (
  expression: Expression
): expression is StringExpression =>
  isString(expression) || isStringBinary(expression);

export const isString = (expression: Expression): expression is string =>
  typeof expression === "string";

export const isStringBinary = (
  expression: Expression
): expression is NumberBinary =>
  !isLiteral(expression) && expression.type === "string-binary";

// Boolean

export const isBooleanExpression = (
  expression: Expression
): expression is BooleanExpression =>
  isBoolean(expression) ||
  isBooleanUnary(expression) ||
  isBooleanBinary(expression);

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
  isBooleanStringrBinary(expression) ||
  isBooleanBooleanBinary(expression);
export const isBooleanNumberBinary = (
  expression: Expression
): expression is BooleanNumberBinary =>
  !isLiteral(expression) && expression.type === "boolean-number-binary";
export const isBooleanStringrBinary = (
  expression: Expression
): expression is BooleanStringBinary =>
  !isLiteral(expression) && expression.type === "boolean-string-binary";
export const isBooleanBooleanBinary = (
  expression: Expression
): expression is BooleanBooleanBinary =>
  !isLiteral(expression) && expression.type === "boolean-boolean-binary";
