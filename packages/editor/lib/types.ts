import type { Expression } from 'interpreter/src/ast/Expression';
import type { NumberExpression } from 'interpreter/src/ast/Number';
import type { StringExpression } from 'interpreter/src/ast/String';
import type { BooleanExpression } from 'interpreter/src/ast/Boolean';
import type { RecordExpression } from 'interpreter/src/ast/Record';

export type Type = 'number' | 'string' | 'boolean' | 'record';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

type Temporary = ({ from: string } | { to: string }) &
  Position &
  Size & { type: Type };

export interface Nodes {
  result: Expression<string, string, string, string> & Size & Position;
  numbers: Record<
    string,
    NumberExpression<string, string, string> & Size & Position
  >;
  strings: Record<
    string,
    StringExpression<string, string, string> & Size & Position
  >;
  booleans: Record<
    string,
    BooleanExpression<string, string, string, string> & Size & Position
  >;
  records: Record<
    string,
    RecordExpression<string, string, string, string> & Size & Position
  >;
}

interface Return extends Position, Size {
  type: Type;
}

interface InitialGraph {
  viewport: Size;
}

interface GraphWithReturn extends InitialGraph {
  return: Return;
  temporary?: Temporary;
}

interface GraphWithNodes extends GraphWithReturn {
  nodes: Nodes;
}

export type Graph = InitialGraph | GraphWithReturn | GraphWithNodes;
