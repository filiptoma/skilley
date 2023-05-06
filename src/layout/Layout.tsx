import { Box, CircularProgress } from '@mui/material';
import { PropsWithChildren } from 'react';

import useLoggedInUser from 'hooks/useLoggedInUser.tsx';

import Centered from './Centered.tsx';
import Header from './Header.tsx';

const Layout = (props: PropsWithChildren) => {
  const { children } = props;

  const [user] = useLoggedInUser();

  const isUserLoading = localStorage.getItem('auth') !== null && !user?.data;

  return (
    <>
      <Header />
      {isUserLoading ? (
        <Centered fullHeight>
          <CircularProgress color="primary" />
        </Centered>
      ) : (
        <Box sx={{ px: 4, py: 6 }}>{children}</Box>
      )}
    </>
  );
};

export default Layout;
