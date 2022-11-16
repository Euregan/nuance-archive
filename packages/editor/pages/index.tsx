import { themeClass } from '../ui/theme.css';
import Computer from '../ui/Computer';
import Constant from '../ui/Constant';

const Page = () => (
  <main
    className={themeClass}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '3rem',
      padding: '3rem',
    }}
  >
    <Constant
      value={{
        type: 'string-literal',
        value: 'hello',
      }}
    />
    <Constant
      value={{
        type: 'string-literal',
        value: 'world',
      }}
    />
    <Constant
      value={{
        type: 'number-literal',
        value: 42,
      }}
    />
    <Constant
      value={{
        type: 'number-literal',
        value: 13,
      }}
    />
    <Constant
      value={{
        type: 'number-literal',
        value: 9,
      }}
    />
    <Computer
      label="Equal"
      type="boolean"
      inputs={{ Left: 'string', Right: 'string' }}
    />
    <Computer
      label="Addition"
      type="number"
      inputs={{ Left: 'number', Right: 'number' }}
    />
    <Computer
      label="If"
      type="number"
      inputs={{ Condition: 'boolean', True: 'number', False: 'number' }}
    />
  </main>
);

export default Page;
