import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from './theme.css';
import * as computerStyles from './Computer.css';

export const card = styleVariants(theme.color.type, (_, type) => [
  computerStyles.card[type],
  {
    width: 'fit-content',
    background: theme.color.white,
  },
]);

export const output = style([
  computerStyles.output,
  {
    gap: '0.55rem',
    padding: '0.75rem',
  },
]);

export const connector = computerStyles.connector;
