import {
  isNumberLiteral,
  isStringLiteral,
  isBooleanLiteral,
  isRecordLiteral,
} from 'interpreter/src/ast/LiteralValue';
import type { LiteralValue } from 'interpreter/src/ast/LiteralValue';
import * as styles from './Constant.css';

interface Props<
  N extends string,
  S extends string,
  B extends string,
  R extends string,
> {
  value: LiteralValue<N, S, B, R>;
}

const typeOf = <
  N extends string,
  S extends string,
  B extends string,
  R extends string,
>(
  value: LiteralValue<N, S, B, R>,
) => {
  if (isNumberLiteral(value)) {
    return 'number';
  }
  if (isStringLiteral(value)) {
    return 'string';
  }
  if (isBooleanLiteral(value)) {
    return 'boolean';
  }

  return 'record';
};

const Constant = <
  N extends string,
  S extends string,
  B extends string,
  R extends string,
>({
  value,
}: Props<N, S, B, R>) => (
  <div className={styles.card[typeOf(value)]}>
    <div className={styles.output}>
      {isRecordLiteral(value) ? 'tmp' : value.value}
      <div className={styles.connector[typeOf(value)]} />
    </div>
  </div>
);

export default Constant;
