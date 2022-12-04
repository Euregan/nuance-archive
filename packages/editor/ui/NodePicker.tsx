import { Type } from '../lib/types';
import type { Expression } from 'interpreter/src/ast/Expression';
import * as styles from './NodePicker.css';

type Filter = { input: Type } | { output: Type };

interface Props {
  filter: Filter;
}

type Processor = Expression<string, string, string, string>['type'];

const processorLabels: Record<Processor, string> = {
  'number-literal': 'Number',
  'number-unary': 'number-unary',
  'number-binary': 'number-binary',
  'number-record-access': 'number-record-access',
  'number-if': 'number-if',
  'string-literal': 'string-literal',
  'string-binary': 'string-binary',
  'string-record-access': 'string-record-access',
  'string-if': 'string-if',
  'boolean-literal': 'boolean-literal',
  'boolean-unary': 'boolean-unary',
  'boolean-number-binary': 'boolean-number-binary',
  'boolean-string-binary': 'boolean-string-binary',
  'boolean-boolean-binary': 'boolean-boolean-binary',
  'boolean-record-access': 'boolean-record-access',
  'record-literal': 'record-literal',
  'record-if': 'record-if',
};

const availableProcessors = (filter: Filter): Array<Processor> => {
  if ('input' in filter) {
    if (filter.input === 'number') {
      return [
        'number-unary',
        'number-binary',
        'boolean-number-binary',
        'number-if',
      ];
    } else if (filter.input === 'string') {
      return ['string-binary', 'boolean-string-binary', 'string-if'];
    } else if (filter.input === 'boolean') {
      return [
        'number-if',
        'string-if',
        'boolean-unary',
        'boolean-boolean-binary',
        'record-if',
      ];
    } else if (filter.input === 'record') {
      return [
        'number-record-access',
        'string-record-access',
        'boolean-record-access',
      ];
    }
  } else {
    if (filter.output === 'number') {
      return [
        'number-literal',
        'number-unary',
        'number-if',
        'number-record-access',
      ];
    } else if (filter.output === 'string') {
      return ['string-literal', 'string-if', 'string-record-access'];
    } else if (filter.output === 'boolean') {
      return [
        'boolean-literal',
        'boolean-unary',
        'boolean-number-binary',
        'boolean-string-binary',
        'boolean-boolean-binary',
      ];
    } else if (filter.output === 'record') {
      return ['record-literal', 'record-if'];
    }
  }
  // Should never happen
  return [];
};

const NodePicker = ({ filter }: Props) => {
  const filteredProcessors = availableProcessors(filter);

  return (
    <ul className={styles.list}>
      {filteredProcessors.map((processor) => (
        <li key={processor}>
          <button>{processorLabels[processor]}</button>
        </li>
      ))}
    </ul>
  );
};

export default NodePicker;
