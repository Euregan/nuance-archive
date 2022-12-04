import type { Expression } from 'interpreter/src/ast/Expression';

export type Type = 'number' | 'string' | 'boolean' | 'record';

export const typeToLabel: Record<Type, string> = {
  number: 'Number',
  string: 'Text',
  boolean: 'True/False',
  record: 'Data',
};

interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

type Leaf = Size & Position & Expression<string, string, string, string>;

type Temporary = ({ from: string } | { to: string }) &
  Position &
  Size & { type: Type };

export interface Graph {
  viewport: Size;
  return:
    | null
    | ({
        type: Type;
      } & Position &
        Size);
  nodes: Array<Leaf>;
  temporary?: Temporary;
}
