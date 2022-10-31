import {
  isNumberExpression,
  isNumber,
  isNumberUnary,
  isNumberRecordAccess,
  isStringExpression,
  isString,
  isStringRecordAccess,
  isBooleanExpression,
  isBoolean,
  isBooleanUnary,
  isBooleanNumberBinary,
  isBooleanStringBinary,
  isBooleanRecordAccess,
} from "./ast";
import type {
  Expression,
  NumberExpression,
  StringExpression,
  BooleanExpression,
  RecordExpression,
  Literal,
  LiteralRecord,
} from "./ast";

export const interpret = (ast: Expression): Literal => {
  if (isNumberExpression(ast)) {
    return interpretNumber(ast);
  } else if (isStringExpression(ast)) {
    return interpretString(ast);
  } else if (isBooleanExpression(ast)) {
    return interpretBoolean(ast);
  } else {
    return interpretRecord(ast);
  }
};

const interpretNumber = (expression: NumberExpression): number => {
  if (isNumber(expression)) {
    return expression;
  } else if (isNumberUnary(expression)) {
    switch (expression.operator) {
      case "-":
        return -interpretNumber(expression.expression);
    }
  } else if (isNumberRecordAccess(expression)) {
    return interpretNumber(expression.record[expression.key]);
  } else {
    switch (expression.operator) {
      case "-":
        return (
          interpretNumber(expression.left) - interpretNumber(expression.right)
        );
      case "+":
        return (
          interpretNumber(expression.left) + interpretNumber(expression.right)
        );
      case "*":
        return (
          interpretNumber(expression.left) * interpretNumber(expression.right)
        );
      case "/":
        return (
          interpretNumber(expression.left) / interpretNumber(expression.right)
        );
    }
  }
};

const interpretString = (expression: StringExpression): string => {
  if (isString(expression)) {
    return expression;
  } else if (isStringRecordAccess(expression)) {
    return interpretString(expression.record[expression.key]);
  } else {
    switch (expression.operator) {
      case "+":
        return (
          interpretString(expression.left) + interpretString(expression.right)
        );
    }
  }
};

const interpretBoolean = (expression: BooleanExpression): boolean => {
  if (isBoolean(expression)) {
    return expression;
  } else if (isBooleanUnary(expression)) {
    switch (expression.operator) {
      case "!":
        return !interpretBoolean(expression.expression);
    }
  } else if (isBooleanNumberBinary(expression)) {
    switch (expression.operator) {
      case "==":
        return (
          interpretNumber(expression.left) === interpretNumber(expression.right)
        );
      case "!=":
        return (
          interpretNumber(expression.left) !== interpretNumber(expression.right)
        );
      case "<":
        return (
          interpretNumber(expression.left) < interpretNumber(expression.right)
        );
      case "<=":
        return (
          interpretNumber(expression.left) <= interpretNumber(expression.right)
        );
      case ">":
        return (
          interpretNumber(expression.left) > interpretNumber(expression.right)
        );
      case ">=":
        return (
          interpretNumber(expression.left) >= interpretNumber(expression.right)
        );
    }
  } else if (isBooleanStringBinary(expression)) {
    switch (expression.operator) {
      case "==":
        return (
          interpretString(expression.left) === interpretString(expression.right)
        );
      case "!=":
        return (
          interpretString(expression.left) !== interpretString(expression.right)
        );
    }
  } else if (isBooleanRecordAccess(expression)) {
    return interpretBoolean(expression.record[expression.key]);
  } else {
    switch (expression.operator) {
      case "&&":
        return (
          interpretBoolean(expression.left) &&
          interpretBoolean(expression.right)
        );
      case "||":
        return (
          interpretBoolean(expression.left) ||
          interpretBoolean(expression.right)
        );
    }
  }
};

const interpretRecord = (expression: RecordExpression): Literal => {
  const record: LiteralRecord = {};

  Object.entries(expression.expression).forEach(([key, value]) => {
    record[key] = interpret(value);
  });

  return record;
};
