import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import RootLayout from 'layouts/RootLayout'
import ErrorPage from 'pages/ErrorPage'
import ProjectPage from 'pages/ProjectPage'
import MyProjectPage from './Pages/MyProjectsPage'
import AddProjectPage from 'pages/AddProjectPage'
import EditProjectPage from 'pages/EditProjectPage'
import ProjectPageDetails from 'pages/ProjectPageDetails'
import MyFavoritePage from 'pages/MyFavoritePage'
import RegisterPage from 'pages/RegisterPage'
import LoginPage from 'pages/LoginPage'
import LogoutPage from 'pages/LogoutPage'
import FileForm from 'pages/FileForm'

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
        path: '/file',
        element: <FileForm />,
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
