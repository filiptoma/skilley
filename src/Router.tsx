import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { Role } from 'firebase/database.ts';
import useLoggedInUser from 'hooks/useLoggedInUser.tsx';
import FormShowcase from 'pages/FormShowcase.tsx';
import Login from 'pages/Login.tsx';
import NotFound from 'pages/NotFound.tsx';
import Register from 'pages/Register.tsx';

const Routes: Record<Role | 'PUBLIC', RouteObject[]> = {
  PUBLIC: [
    {
      path: '/',
      element: <Navigate to="/login" replace />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
  ],
  ADMIN: [
    {
      path: '/',
      element: <FormShowcase />,
    },
  ],
  PERSON: [
    {
      path: '/',
      element: <FormShowcase />,
    },
  ],
  COMPANY: [
    {
      path: '/',
      element: <FormShowcase />,
    },
  ],
};

const Router = () => {
  const [user] = useLoggedInUser();
  return useRoutes([
    ...Routes[user && user.data ? user.data.role : 'PUBLIC'],
    { path: '*', element: <NotFound /> },
  ]);
};

export default Router;
