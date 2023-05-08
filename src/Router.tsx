import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { Role } from 'firebase/database.ts';
import useLoggedInUser from 'hooks/useLoggedInUser.tsx';
import Dashboard from 'layout/Dashboard.tsx';
import CompaniesDashboard from 'pages/admin/CompaniesDashboard.tsx';
import IndexDashboard from 'pages/admin/IndexDashboard.tsx';
import OffersDashboard from 'pages/admin/OffersDashboard.tsx';
import PersonsDashboard from 'pages/admin/PersonsDashboard.tsx';
import TagsDashboard from 'pages/admin/TagsDashboard.tsx';
import EditOffer from 'pages/company/EditOffer.tsx';
import EditProfile from 'pages/company/EditProfile.tsx';
import CompanyHome from 'pages/company/Home.tsx';
import NewOffer from 'pages/company/NewOffer.tsx';
import CompanyProfile from 'pages/company/Profile.tsx';
import Company from 'pages/Company.tsx';
import PublicHome from 'pages/Home.tsx';
import Login from 'pages/Login.tsx';
import NotFound from 'pages/NotFound.tsx';
import Offer from 'pages/Offer.tsx';
import PersonHome from 'pages/person/Home.tsx';
import PersonProfile from 'pages/person/Profile.tsx';
import Register from 'pages/Register.tsx';

const Routes: Record<Role | 'PUBLIC', RouteObject[]> = {
  PUBLIC: [
    {
      path: '/',
      element: <Navigate to="/offers" replace />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/offers',
      element: <PublicHome />,
    },
    {
      path: '/offers/:id',
      element: <Offer />,
    },
    {
      path: '/company/:id',
      element: <Company />,
    },
  ],
  ADMIN: [
    {
      path: '/',
      element: <Navigate to="/dashboard" replace />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
      children: [
        {
          index: true,
          element: <IndexDashboard />,
        },
        {
          path: '/dashboard/offers',
          element: <OffersDashboard />,
        },
        {
          path: '/dashboard/persons',
          element: <PersonsDashboard />,
        },
        {
          path: '/dashboard/companies',
          element: <CompaniesDashboard />,
        },
        {
          path: '/dashboard/tags',
          element: <TagsDashboard />,
        },
      ],
    },
  ],
  PERSON: [
    {
      path: '/',
      element: <Navigate to="/offers" replace />,
    },
    {
      path: '/offers',
      element: <PersonHome />,
    },
    {
      path: '/offers/:id',
      element: <Offer />,
    },
    {
      path: '/profile',
      element: <PersonProfile />,
    },
    {
      path: '/profile/edit',
      element: <EditProfile />,
    },
    {
      path: '/company/:id',
      element: <Company />,
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
    {
      path: '/offers/:id',
      element: <Offer />,
    },
    {
      path: '/offers/:id/edit',
      element: <EditOffer />,
    },
    {
      path: '/profile',
      element: <CompanyProfile />,
    },
    {
      path: '/profile/edit',
      element: <EditProfile />,
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
