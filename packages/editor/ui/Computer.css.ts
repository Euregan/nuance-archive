import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from './theme.css';

const cardRadius = '1rem';

const cardBase = style({
  position: 'relative',
  fontFamily: theme.font,
  borderRadius: cardRadius,
  background: theme.color.gray,
  width: '10rem',
  display: 'flex',
  flexDirection: 'column',
  border: '2.5px solid',
});

export const card = styleVariants(theme.color.type, (borderColor) => [
  cardBase,
  {
    borderColor,
  },
]);

export const label = style({
  padding: '0.75rem 0.75rem 0.75rem 1.3rem',
  background: theme.color.white,
  fontWeight: 600,
  borderTopRightRadius: cardRadius,
  borderTopLeftRadius: cardRadius,
});

export const ios = style({
  all: 'unset',
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  background: theme.color.white,
  padding: '0.75rem',
  ':last-of-type': {
    borderBottomRightRadius: cardRadius,
    borderBottomLeftRadius: cardRadius,
  },
});

const io = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1rem',
});

export const input = style([
  io,
  { alignSelf: 'flex-start', marginLeft: '-1.3rem' },
]);

export const output = style([
  io,
  { alignSelf: 'flex-end', marginRight: '-1.3rem' },
]);

const connectorBase = style({
  width: '0.3rem',
  height: '0.3rem',
  borderRadius: '50%',
  border: '5px solid',
  cursor: 'pointer',
  background: theme.color.white,
});

export const connector = styleVariants(theme.color.type, (borderColor) => [
  connectorBase,
  {
    borderColor,
  },
]);
