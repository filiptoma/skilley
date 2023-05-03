import '@fontsource/lato';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { AuthProvider } from 'hooks/useLoggedInUser.tsx';
import Router from 'Router.tsx';
import theme from 'utils/theme.ts';

const App = () => (
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  </AuthProvider>
);

export default App;
