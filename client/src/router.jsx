import React from 'react'

import { createBrowserRouter } from 'react-router-dom'

import RootLayout from 'layouts/RootLayout'
import ErrorPage from 'pages/ErrorPage'
import ProjectPage from 'pages/ProjectPage'
// import AddProjectPage from 'pages/AddProjectPage'
// import EditProjectPage from 'pages/EditProjectPage'
// import RegisterPage from 'pages/RegisterPage'
// import LoginPage from 'pages/LoginPage'
// import LogoutPage from 'pages/LogoutPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <ProjectPage />,
      },
      {
        path: '/customers',
        element: false,
      },
      {
        path: '/customer/new',
        element: false,
      },
      {
        path: '/customer/edit/:customerId',
        element: false,
      },
      {
        path: '/login',
        element: false,
      },
      {
        path: '/register',
        element: false,
      },
      {
        path: '/logout',
        element: false,
      },
    ],
  },
])

export default router
