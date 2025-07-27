import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layouts/RootLayout';
import Home from '../pages/Home/Home';
import AuthLayout from '../Layouts/AuthLayout';
import Login from '../Authentication/Login/Login';
import Register from '../Authentication/Register/Register';

const router = createBrowserRouter([
    {
        path:'/',
        element: <RootLayout></RootLayout>,
        children:[
            {
                index: true,
               element: <Home></Home>
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
            element:<Register></Register>
          }
        ]
      },
])

export default router;