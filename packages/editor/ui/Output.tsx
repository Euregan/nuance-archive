import * as styles from './Output.css';
import type { Type } from '../lib/types';
import { typeToLabel } from '../lib/types';

interface Props {
  type: Type;
  onClickInput: (type: Type) => void;
}

const Output = ({ type, onClickInput }: Props) => (
  <div className={styles.card[type]}>
    <div className={styles.input}>
      <div
        className={styles.connector[type]}
        onClick={() => onClickInput(type)}
      />
      {typeToLabel[type]}
    </div>
  </div>
);

export default Output;
