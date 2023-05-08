import { Drawer as MuiDrawer } from '@mui/material';
import { PropsWithChildren } from 'react';

import { DRAWER_WIDTH } from 'utils/index.ts';

const Drawer = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <MuiDrawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {children}
    </MuiDrawer>
  );
};

export default Drawer;
