import { RouteObject, useRoutes } from 'react-router-dom';

import { Role } from 'firebase/database.ts';
import useLoggedInUser from 'hooks/useLoggedInUser.tsx';
import Login from 'pages/Login.tsx';
import Noop from 'pages/Noop.tsx';
import NotFound from 'pages/NotFound.tsx';

const Routes: Record<Role | 'PUBLIC', RouteObject[]> = {
  PUBLIC: [
    {
      path: '/',
      element: <Login />,
    },
  ],
  ADMIN: [
    {
      path: '/',
      element: <Noop />,
    },
  ],
  PERSON: [
    {
      path: '/',
      element: <Noop />,
    },
  ],
  COMPANY: [
    {
      path: '/',
      element: <Noop />,
    },
  ],
};

const Router = () => {
  const user = useLoggedInUser();
  return useRoutes([
    ...Routes[user ? user.data.role : 'PUBLIC'],
    { path: '*', element: <NotFound /> },
  ]);
};

export default Router;
