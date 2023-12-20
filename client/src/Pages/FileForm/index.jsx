import * as React from 'react'
import * as yup from 'yup'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { ProjectForm } from 'components'
const TYPES = {
  'image/jpeg': 'jpeg',
  'image/gif': 'gif',
  'image/png': 'png',
}

const schema = yup
  .object({
    image: yup.mixed(),
  })
  .required()

const fields = [
  {
    name: 'avatar',
    type: 'file',
    label: 'Avatar',
  },
]

function LoginPage() {
  const onSubmit = data => {
    console.log(data)
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      <ProjectForm
        inputs={fields}
        onSubmit={onSubmit}
        validationSchema={schema}
        submitLabel="Sign In"
      />
    </Container>
  )
}

export default LoginPage
