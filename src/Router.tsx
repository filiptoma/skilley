import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { Role } from 'firebase/database.ts';
import useLoggedInUser from 'hooks/useLoggedInUser.tsx';
import Dashboard from 'pages/admin/Dashboard.tsx';
import CompanyHome from 'pages/company/Home.tsx';
import NewOffer from 'pages/company/NewOffer.tsx';
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
      element: <Dashboard />,
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
      element: <Navigate to="/offers/my" replace />,
    },
    {
      path: '/offers/my',
      element: <CompanyHome />,
    },
    {
      path: '/offers/new',
      element: <NewOffer />,
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
