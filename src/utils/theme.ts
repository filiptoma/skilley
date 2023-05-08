import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#392ccf',
    },
    secondary: {
      main: '#000000',
    },
  },
  typography: {
    fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
  },
});

export default theme;
