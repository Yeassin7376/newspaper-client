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
import AllArticlesPublic from '../pages/AllArticlesPublic/AllArticlesPublic';
import ArticleDetails from '../pages/ArticleDetails/ArticleDetails';
import PrivateRoute from '../routes/PrivateRoute';
import AdminRoute from '../routes/AdminRoute';
import Forbidden from '../shared/Forbidden/Forbidden';
import MyArticles from '../pages/MyArticles/MyArticles';
import MyProfile from '../pages/MyProfile/MyProfile';

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
        path: 'allArticlePublic',
        Component: AllArticlesPublic
      },
      {
        path: 'addArticle',
        element: (
          <PrivateRoute>
            <AddArticle></AddArticle>
          </PrivateRoute>
        )
      },
      {
        path: 'articleDetails/:id',
        element: (
          <PrivateRoute>
            <ArticleDetails></ArticleDetails>
          </PrivateRoute>
        )
      },
      {
        path: 'myArticles',
        element: (
          <PrivateRoute>
            <MyArticles></MyArticles>
          </PrivateRoute>
        )
      },
      {
        path: 'myProfile',
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        )
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
    element: (
      <AdminRoute>
        <DashboardLayout></DashboardLayout>
      </AdminRoute>
    ),
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
  },
  {
    path: 'forbidden',
    element: <Forbidden></Forbidden>
  }
]);

export default router;
