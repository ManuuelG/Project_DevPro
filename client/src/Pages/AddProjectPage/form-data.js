import * as yup from 'yup'

const fields = [
  { name: 'name', label: 'Nombre', placeholder: 'Prueba placeholder' },
  { name: 'date', label: 'Fecha', type: 'number' },
  { name: 'image', label: 'Imagen', placeholder: 'URL de la imagen' },
  {
    name: 'repolink',
    label: 'Enlace al Repositorio',
    placeholder: 'URL del repositorio',
  },
  {
    name: 'deploylink',
    label: 'Enlace de Implementación',
    placeholder: 'URL de implementación',
  },
  {
    name: 'description',
    label: 'Descripción',
    placeholder: 'Describa su proyecto',
  },

  {
    name: 'skills',
    label: 'Skills',
    type: 'select',
    options: [],
  },
]

const schema = yup
  .object({
    name: yup.string().required('Nombre Obligatorio'),
    date: yup.number().typeError('Fecha Obligatoria').required(),
    image: yup.string().required('URL de imagen inválida'),
    repolink: yup.string().required('URL de repositorio inválida'),
    deploylink: yup.string('URL de implementación inválida'),
    description: yup.string(),
    skills: yup
      .array()
      .of(yup.string())
      .min(1, 'Debes seleccionar al menos una habilidad')
      .required(),
  })
  .required()

export { fields, schema }
