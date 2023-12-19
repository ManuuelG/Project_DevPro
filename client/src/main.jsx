import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './router.jsx'
import ThemeProvider from './theme.jsx'
import { AuthProvider } from 'hooks'
import 'react-toastify/dist/ReactToastify.css'

import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </ThemeProvider>
)
