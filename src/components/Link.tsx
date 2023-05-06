import { Box, useTheme } from '@mui/material';
import { ReactNode } from 'react';

import { LinkProps, getLinkProps } from 'utils/index.ts';

type Props = LinkProps & {
  onClick?: () => void;
  children: ReactNode;
};

const Link = ({ onClick, ...props }: Props) => {
  const theme = useTheme();
  return (
    <Box
      {...getLinkProps(props)}
      onClick={onClick}
      sx={{
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': { textDecoration: 'underline' },
      }}
    >
      {props.children}
    </Box>
  );
};

export default Link;
