import '@fontsource/lato';

import { ThemeProvider, Typography } from '@mui/material';

import theme from 'utils/theme.ts';

const App = () => (
  <ThemeProvider theme={theme}>
    <div>
      <Typography>Skilley</Typography>
    </div>
  </ThemeProvider>
);

export default App;
