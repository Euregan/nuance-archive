import { createTheme, globalStyle } from '@vanilla-extract/css';

export const [themeClass, theme] = createTheme({
  color: {
    white: '#fdfcff',
    gray: '#e3e3e3',

    type: {
      number: '#9e0142',
      boolean: '#d53e4f',
      string: '#f46d43',
      datetime: '#fdae61',
      // pending: '#fee08b',
      // pending: '#e6f598',
      // pending: '#abdda4',
      // pending: '#66c2a5',
      union: '#3288bd',
      record: '#5e4fa2',
    },
  },
  font: 'arial,sans-serif',
});

globalStyle('body', {
  all: 'unset',
  background: '#eef1f8',
});
