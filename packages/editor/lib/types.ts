export type Type = 'number' | 'string' | 'boolean' | 'record';

export const typeToLabel: Record<Type, string> = {
  number: 'Number',
  string: 'Text',
  boolean: 'True/False',
  record: 'Data',
};
