import { Box, BoxProps } from '@mui/material';
import { PropsWithChildren } from 'react';

const Centered = (
  props: {
    fullWidth?: boolean;
    fullHeight?: boolean;
  } & PropsWithChildren<BoxProps>,
) => {
  const { fullWidth, fullHeight, children, ...boxProps } = props;
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={fullHeight ? '100vh' : 'inherit'}
      {...boxProps}
    >
      {fullWidth ? <Box flexBasis="100%">{children}</Box> : children}
    </Box>
  );
};

export default Centered;
