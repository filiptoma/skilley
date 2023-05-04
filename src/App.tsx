import '@fontsource/lato';
import 'dayjs/locale/cs';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { AuthProvider } from 'hooks/useLoggedInUser.tsx';
import Router from 'Router.tsx';
import theme from 'utils/theme.ts';

const App = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs">
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </AuthProvider>
  </LocalizationProvider>
);

export default App;
