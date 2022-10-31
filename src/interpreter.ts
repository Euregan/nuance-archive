import {
  isNumberExpression,
  isNumber,
  isNumberUnary,
  isStringExpression,
  isString,
  isBoolean,
  isBooleanUnary,
  isBooleanNumberBinary,
  isBooleanStringrBinary,
} from "./ast";
import type {
  Expression,
  NumberExpression,
  StringExpression,
  BooleanExpression,
} from "./ast";

export const interpret = (
  expression: Expression
): number | string | boolean => {
  if (isNumberExpression(expression)) {
    return interpretNumber(expression);
  } else if (isStringExpression(expression)) {
    return interpretString(expression);
  } else {
    return interpretBoolean(expression);
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
  } else if (isBooleanStringrBinary(expression)) {
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
