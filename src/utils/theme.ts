import { createTheme, ThemeOptions } from '@mui/material';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#3089ff',
    },
    secondary: {
      main: '#10c94c',
    },
    background: {
      default: '#111118',
      paper: '#2b2b33',
    },
    text: {
      primary: '#dadada',
    },
  },
  typography: {
    fontFamily: ['PT Sans', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    button: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h1: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        sx: {
          height: [36, 48],
          px: [2, 3],
          letterSpacing: 0.8,
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
