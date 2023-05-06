import { Box, BoxProps, useTheme } from '@mui/material';
import { PropsWithChildren, useLayoutEffect, useRef, useState } from 'react';

type Props = {
  align: 'top' | 'bottom' | 'auto';
} & BoxProps;

const Fixed = (props: PropsWithChildren<Props>) => {
  const { align, children } = props;

  const theme = useTheme();

  const ref = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(0);
  useLayoutEffect(() => {
    setHeight(ref.current?.offsetHeight ?? 0);
  }, []);

  const isTop = align === 'top';
  const isAuto = align === 'auto';

  return (
    <>
      <Box
        ref={ref}
        sx={{
          position: 'fixed',
          left: 0,
          right: 0,
          top: isTop ? 0 : 'auto',
          bottom: isTop || isAuto ? 'auto' : 0,
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        {children}
      </Box>
      {isAuto ? (
        <Box style={{ height }} />
      ) : (
        <Box style={{ height: height - 16 }} />
      )}
    </>
  );
};

export default Fixed;
