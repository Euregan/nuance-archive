import { style } from '@vanilla-extract/css';

export const editor = style({
  display: 'grid',
  gridTemplateColumns: '200px auto',
  height: '100%',
});

export const pane = style({});

export const inputs = style({
  all: 'unset',
  listStyle: 'none',
});
