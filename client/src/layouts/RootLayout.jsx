import { Outlet } from 'react-router-dom'

import { Container } from '@mui/material'

import { Navbar } from 'components'
import { ToastContainer } from 'react-toastify'
function RootLayout() {
  return (
    <Container display="flex" maxWidth="xxl" disableGutters>
      <Navbar />

      <Container maxWidth="xl" sx={{ mt: 5 }}>
        <Outlet />
      </Container>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Container>
  )
}
export default RootLayout
