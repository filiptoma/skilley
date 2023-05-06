import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
import '@fontsource/lato/900.css';
import '@fontsource/fugaz-one';
import 'dayjs/locale/cs';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from 'hooks/useLoggedInUser.tsx';
import Layout from 'layout/Layout.tsx';
import Router from 'Router.tsx';
import theme from 'utils/theme.ts';

const App = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs">
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Router />
        </Layout>
        <Toaster position="top-left" />
      </ThemeProvider>
    </AuthProvider>
  </LocalizationProvider>
);

export default App;
