import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layouts/RootLayout';
import Home from '../pages/Home/Home';
import AuthLayout from '../Layouts/AuthLayout';
import Login from '../Authentication/Login/Login';
import Register from '../Authentication/Register/Register';
import DashboardLayout from '../Layouts/DashBoardLayout';
import AllUsers from '../pages/Dashboard/AllUsers/AllUsers';
import AllArticles from '../pages/Dashboard/AllArticles/AllArticles';
import AddPublisher from '../pages/Dashboard/AddPublisher/AddPublisher';
import AddArticle from '../pages/AddArticle/AddArticle';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: 'addArticle',
        element: <AddArticle></AddArticle>
      }
    ]
  },
  {
    path: '/',
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: 'all-users',
        element: <AllUsers></AllUsers>
      },
      {
        path: 'all-articles',
        element: <AllArticles></AllArticles>
      },
      {
        path: 'add-publisher',
        element: <AddPublisher></AddPublisher>
      }
    ]
  }
]);

export default router;
