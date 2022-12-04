import type { AST } from 'interpreter/src/ast';
import { isNumberExpression } from 'interpreter/src/ast/Number';
import { isStringExpression } from 'interpreter/src/ast/String';
import { isBooleanExpression } from 'interpreter/src/ast/Boolean';
import type { Type, Size, Position, Nodes } from './types';

export const typeToLabel: Record<Type, string> = {
  number: 'Number',
  string: 'Text',
  boolean: 'True/False',
  record: 'Data',
};

export const astToType = (ast: AST): Type => {
  if (isNumberExpression(ast.result)) {
    return 'number';
  }
  if (isStringExpression(ast.result)) {
    return 'string';
  }
  if (isBooleanExpression(ast.result)) {
    return 'boolean';
  }
  return 'record';
};

export const initSizeAndPosition = <A extends Record<string, any>>(
  anything: A,
): A & Size & Position => ({
  ...anything,
  width: 0,
  height: 0,
  x: 0,
  y: 0,
});

export const astToNodes = (ast: AST): Nodes => ({
  result: initSizeAndPosition(ast.result),
  numbers: map(ast.numbers, initSizeAndPosition),
  strings: map(ast.strings, initSizeAndPosition),
  booleans: map(ast.booleans, initSizeAndPosition),
  records: map(ast.records, initSizeAndPosition),
});

interface Dictionary<T> {
  [key: string]: T;
}
function map<In, Out>(object: Dictionary<In>, fun: (val: In) => Out) {
  const result = {} as Dictionary<Out>;

  for (const key of Object.keys(object)) {
    result[key] = fun(object[key]);
  }

  return result;
}
