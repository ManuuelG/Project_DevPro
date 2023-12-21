import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
// import ErrorPage from 'pages/ErrorPage'
import RootLayout from 'layouts/RootLayout'
import ProjectPage from 'pages/ProjectPage'
import MyProjectPage from 'pages/MyProjectsPage'
import AddProjectPage from 'pages/AddProjectPage'
import EditProjectPage from 'pages/EditProjectPage'
import ProjectPageDetails from 'pages/ProjectPageDetails'
import MyFavoritePage from 'pages/MyFavoritePage'
import RegisterPage from 'pages/RegisterPage'
import LoginPage from 'pages/LoginPage'
import LogoutPage from 'pages/LogoutPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <ProjectPage />,
      },
      {
        path: '/myprojects',
        element: <MyProjectPage />,
      },
      {
        path: '/:projectId',
        element: <ProjectPageDetails />,
      },
      {
        path: '/projects/new',
        element: <AddProjectPage />,
      },
      {
        path: '/projects/edit/:projectId',
        element: <EditProjectPage />,
      },
      {
        path: '/favorites',
        element: <MyFavoritePage />,
      },

      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/logout',
        element: <LogoutPage />,
      },
    ],
  },
])

export default router
