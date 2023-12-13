import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './router.jsx'
import ThemeProvider from './theme.jsx'

import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
)
