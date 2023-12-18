import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { ProjectForm } from 'components'
import { fields, schema } from './form-data'
import { Link as RouterLink } from 'react-router-dom'
import { useState } from 'react'

import { login } from 'services/auth-service'

import { toast } from 'react-toastify'

import { useAuth } from 'hooks'

import { useNavigate } from 'react-router-dom'

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        DevPro
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

function LoginPage() {
  const navigate = useNavigate()
  const [, dispatch] = useAuth()
  const [errorsFromResponse, setErrorsFromResponse] = useState([])

  const onSubmit = user => {
    login(user)
      .then(decodedJWT => {
        const { username, isAdmin } = decodedJWT

        const type = isAdmin ? 'admin' : 'login'

        dispatch({ type, username })
        navigate('/', {})
      })
      .catch(err => {
        const { data, status } = err.response

        if (Array.isArray(data) && status === 400) {
          setErrorsFromResponse(err.response.data)
        } else {
          toast.error(data.message)
        }
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box noValidate sx={{ mt: 3 }}>
          <ProjectForm
            inputs={fields}
            validationSchema={schema}
            onSubmit={onSubmit}
            submitLabel="Sign In"
          />
          <Grid container sx={{ gap: 6, marginTop: 2 }}>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}

export default LoginPage
