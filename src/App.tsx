import '@fontsource/lato';
import { ThemeProvider, Typography } from '@mui/material';

import { AuthProvider } from 'hooks/useLoggedInUser.tsx';
import theme from 'utils/theme.ts';

const App = () => (
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <div>
        <Typography>Skilley</Typography>
      </div>
    </ThemeProvider>
  </AuthProvider>
);

export default App;
