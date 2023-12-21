import * as yup from 'yup'

const fields = [
  { name: 'name', label: 'Nombre', placeholder: 'Nombre del proyecto' },
  { name: 'date', label: 'Fecha', type: 'number' },
  {
    name: 'image',

    type: 'file',
    placeholder: 'URL de la imagen',
  },
  {
    name: 'repolink',
    label: 'Enlace al repositorio',
    placeholder: 'URL del repositorio',
  },
  {
    name: 'deploylink',
    label: 'Enlace de despliegue',
    placeholder: 'URL de despliegue',
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

const TYPES = {
  'image/jpeg': 'jpeg',
  'image/gif': 'gif',
  'image/png': 'png',
}

const schema = yup
  .object({
    name: yup.string().required('Nombre Obligatorio'),
    date: yup.number().typeError('Fecha Obligatoria').required(),
    image: yup.mixed().required('Imagen Obligatoria'),
    repolink: yup.string().required('URL de repositorio inválida'),
    deploylink: yup.string('URL de despliegue inválida'),
    description: yup.string(),
    skills: yup
      .array()
      .of(yup.string())
      .min(1, 'Debes seleccionar al menos una habilidad')
      .required(),
  })
  .required()

export { fields, schema }
