import {
  isNumberExpression,
  isNumberLiteral,
  isNumberUnary,
  isNumberRecordAccess,
  isStringExpression,
  isStringLiteral,
  isStringRecordAccess,
  isBooleanExpression,
  isBooleanLiteral,
  isBooleanUnary,
  isBooleanNumberBinary,
  isBooleanStringBinary,
  isBooleanRecordAccess,
} from "./ast";
import type {
  AST,
  Expression,
  NumberExpression,
  StringExpression,
  BooleanExpression,
  RecordExpression,
  ActualValue,
  ActualRecord,
} from "./ast";

export const interpret = (ast: AST): ActualValue =>
  interpretExpression<
    keyof typeof ast.numbers,
    keyof typeof ast.strings,
    keyof typeof ast.booleans,
    keyof typeof ast.records
  >(ast.result, ast);

const interpretExpression = <
  N extends string,
  S extends string,
  B extends string,
  R extends string
>(
  expression: Expression<N, S, B, R>,
  ast: AST<N, S, B, R>
): ActualValue => {
  if (isNumberExpression(expression)) {
    return interpretNumber(expression, ast);
  } else if (isStringExpression(expression)) {
    return interpretString(expression, ast);
  } else if (isBooleanExpression(expression)) {
    return interpretBoolean(expression, ast);
  } else {
    return interpretRecord(expression, ast);
  }
};

const interpretNumber = <
  N extends string,
  S extends string,
  B extends string,
  R extends string
>(
  expression: NumberExpression<N, R>,
  ast: AST<N, S, B, R>
): number => {
  if (isNumberLiteral(expression)) {
    return expression.value;
  } else if (isNumberUnary(expression)) {
    switch (expression.operator) {
      case "-":
        return -interpretNumber(ast.numbers[expression.expression], ast);
    }
  } else if (isNumberRecordAccess(expression)) {
    return interpretRecord(ast.records[expression.record], ast)[
      expression.key
    ] as number;
  } else {
    switch (expression.operator) {
      case "-":
        return (
          interpretNumber(ast.numbers[expression.left], ast) -
          interpretNumber(ast.numbers[expression.right], ast)
        );
      case "+":
        return (
          interpretNumber(ast.numbers[expression.left], ast) +
          interpretNumber(ast.numbers[expression.right], ast)
        );
      case "*":
        return (
          interpretNumber(ast.numbers[expression.left], ast) *
          interpretNumber(ast.numbers[expression.right], ast)
        );
      case "/":
        return (
          interpretNumber(ast.numbers[expression.left], ast) /
          interpretNumber(ast.numbers[expression.right], ast)
        );
    }
  }
};

const interpretString = <
  N extends string,
  S extends string,
  B extends string,
  R extends string
>(
  expression: StringExpression<S, R>,
  ast: AST<N, S, B, R>
): string => {
  if (isStringLiteral(expression)) {
    return expression.value;
  } else if (isStringRecordAccess(expression)) {
    return interpretRecord(ast.records[expression.record], ast)[
      expression.key
    ] as string;
  } else {
    switch (expression.operator) {
      case "+":
        return (
          interpretString(ast.strings[expression.left], ast) +
          interpretString(ast.strings[expression.right], ast)
        );
    }
  }
};

const interpretBoolean = <
  N extends string,
  S extends string,
  B extends string,
  R extends string
>(
  expression: BooleanExpression<N, S, B, R>,
  ast: AST<N, S, B, R>
): boolean => {
  if (isBooleanLiteral(expression)) {
    return expression.value;
  } else if (isBooleanUnary(expression)) {
    switch (expression.operator) {
      case "!":
        return !interpretBoolean(ast.booleans[expression.expression], ast);
    }
  } else if (isBooleanNumberBinary(expression)) {
    switch (expression.operator) {
      case "==":
        return (
          interpretNumber(ast.numbers[expression.left], ast) ===
          interpretNumber(ast.numbers[expression.right], ast)
        );
      case "!=":
        return (
          interpretNumber(ast.numbers[expression.left], ast) !==
          interpretNumber(ast.numbers[expression.right], ast)
        );
      case "<":
        return (
          interpretNumber(ast.numbers[expression.left], ast) <
          interpretNumber(ast.numbers[expression.right], ast)
        );
      case "<=":
        return (
          interpretNumber(ast.numbers[expression.left], ast) <=
          interpretNumber(ast.numbers[expression.right], ast)
        );
      case ">":
        return (
          interpretNumber(ast.numbers[expression.left], ast) >
          interpretNumber(ast.numbers[expression.right], ast)
        );
      case ">=":
        return (
          interpretNumber(ast.numbers[expression.left], ast) >=
          interpretNumber(ast.numbers[expression.right], ast)
        );
    }
  } else if (isBooleanStringBinary(expression)) {
    switch (expression.operator) {
      case "==":
        return (
          interpretString(ast.strings[expression.left], ast) ===
          interpretString(ast.strings[expression.right], ast)
        );
      case "!=":
        return (
          interpretString(ast.strings[expression.left], ast) !==
          interpretString(ast.strings[expression.right], ast)
        );
    }
  } else if (isBooleanRecordAccess(expression)) {
    return interpretRecord(ast.records[expression.record], ast)[
      expression.key
    ] as boolean;
  } else {
    switch (expression.operator) {
      case "&&":
        return (
          interpretBoolean(ast.booleans[expression.left], ast) &&
          interpretBoolean(ast.booleans[expression.right], ast)
        );
      case "||":
        return (
          interpretBoolean(ast.booleans[expression.left], ast) ||
          interpretBoolean(ast.booleans[expression.right], ast)
        );
    }
  }
};

const interpretRecord = <
  N extends string,
  S extends string,
  B extends string,
  R extends string
>(
  expression: RecordExpression<N, S, B, R>,
  ast: AST<N, S, B, R>
): ActualRecord => {
  const record: ActualRecord = {};

  Object.entries(expression.value).forEach(([key, value]) => {
    switch (value[0]) {
      case "number":
        record[key] = interpretNumber(ast.numbers[value[1]], ast);
        break;
      case "string":
        record[key] = interpretString(ast.strings[value[1]], ast);
        break;
      case "boolean":
        record[key] = interpretBoolean(ast.booleans[value[1]], ast);
        break;
      case "record":
        record[key] = interpretRecord(ast.records[value[1]], ast);
        break;
    }
  });

  return record;
};
