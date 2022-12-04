import type { AST } from 'interpreter/src/ast';
import { themeClass } from '../ui/theme.css';
import Editor from '../ui/Editor';

const ast: AST = {
  result: { type: 'boolean-record-access', key: 'boolean', record: '1' },
  numbers: {
    '1': {
      type: 'number-binary',
      left: '2',
      operator: '+',
      right: '3',
    },
    '2': {
      type: 'number-literal',
      value: 100,
    },
    '3': {
      type: 'number-unary',
      operator: '-',
      expression: '4',
    },
    '4': {
      type: 'number-literal',
      value: 58,
    },
    '5': { type: 'number-literal', value: 50 },
    '6': { type: 'number-literal', value: 40 },
  },
  strings: {
    '1': {
      type: 'string-binary',
      left: '2',
      operator: '+',
      right: '3',
    },
    '2': {
      type: 'string-literal',
      value: 'hello',
    },
    '3': {
      type: 'string-binary',
      left: '4',
      operator: '+',
      right: '5',
    },
    '4': {
      type: 'string-literal',
      value: ' ',
    },
    '5': {
      type: 'string-literal',
      value: 'world',
    },
  },
  booleans: {
    '1': {
      type: 'boolean-boolean-binary',
      left: '2',
      operator: '||',
      right: '3',
    },
    '2': {
      type: 'boolean-unary',
      operator: '!',
      expression: '4',
    },
    '3': {
      type: 'boolean-number-binary',
      left: '5',
      operator: '>',
      right: '6',
    },
    '4': {
      type: 'boolean-literal',
      value: true,
    },
  },
  records: {
    '1': {
      type: 'record-literal',
      value: {
        number: ['number', '1'],
        string: ['string', '1'],
        boolean: ['boolean', '1'],
      },
    },
  },
};

const Page = () => (
  <main className={themeClass} style={{ width: '100vw', height: '100vh' }}>
    <Editor ast={ast} />
  </main>
);

export default Page;
