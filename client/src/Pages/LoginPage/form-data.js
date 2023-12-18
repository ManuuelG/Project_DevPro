import * as yup from 'yup'

const fields = [
  {
    name: 'username',
    label: 'Username',
  },
  {
    name: 'password',
    label: 'Contraseña',
    type: 'password',
  },
]

const schema = yup
  .object({
    username: yup.string().required('Nombre de usuario obligatorio'),
    password: yup.string().required('Contraseña obligatoria'),
  })
  .required()

export { fields, schema }
