import * as styles from './Computer.css';

type Type = 'number' | 'string' | 'boolean' | 'record';

interface Props {
  label: string;
  type: Type;
  inputs: Record<string, Type>;
}

const Computer = ({ label, type, inputs }: Props) => (
  <div className={styles.card[type]}>
    <label className={styles.label}>{label}</label>
    <ul className={styles.ios}>
      {Object.entries(inputs).map(([label, type]) => (
        <li key={label} className={styles.input}>
          <div className={styles.connector[type]} />
          {label}
        </li>
      ))}
    </ul>
    <ul className={styles.ios}>
      <li className={styles.output}>
        Result
        <div className={styles.connector[type]} />
      </li>
    </ul>
  </div>
);

export default Computer;
