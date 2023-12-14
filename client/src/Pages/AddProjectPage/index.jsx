import React, { useState, useEffect } from 'react'
import { Stack, Typography } from '@mui/material'
import { ProjectForm } from 'components'
import { fields, schema } from './form-data'
import projectService from 'services/project-service'
import skillService from 'services/skill-service'
import { toast } from 'react-toastify'

function CreateProjectPage() {
  const [errorsFromResponse, setErrorsFromResponse] = useState([])

  const [skills, setSkills] = useState([])

  useEffect(() => {
    skillService
      .get()
      .then(response => {
        setSkills(response.data)
      })
      .catch(error => {
        console.error('Error fetching skills', error)
      })
  }, [])

  console.log(skills)
  console.log(
    skills.map(skill => ({
      value: skill._id,
      label: skill.name,
    }))
  )

  const onSubmit = (project, { reset }) => {
    console.log('Proyecto:', project)

    projectService
      .create(project)
      .then(
        response => console.log('Respuesta del servidor:', response.data),
        reset()
      )
      .catch(err => {
        console.error('Error al enviar la solicitud:', err)
        if (err.response.status === 400)
          setErrorsFromResponse(err.response.data)
      })
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h2" component="h2">
        Crear Nuevo Proyecto
      </Typography>

      <ProjectForm
        inputs={fields.map(field => {
          if (field.name === 'skills') {
            return {
              ...field,
              options: skills.map(skill => ({
                value: skill._id,
                label: skill.name,
              })),
            }
          }
          return field
        })}
        onSubmit={onSubmit}
        validationSchema={schema}
        errorsFromResponse={errorsFromResponse}
        submitLabel="Crear"
      />
    </Stack>
  )
}

export default CreateProjectPage
