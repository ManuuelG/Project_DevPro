import React, { useState, useEffect } from 'react'
import { Stack, Typography, CircularProgress } from '@mui/material'
import { ProjectForm } from 'components'
import { fields, schema, getDefaultValues } from './form-data'
import projectService from 'services/project-service'
import skillService from 'services/skill-service'
import { useParams } from 'react-router-dom'
import { useProject } from 'hooks'

function EditProjectPage() {
  const { projectId } = useParams()
  const { project, loading, errors } = useProject(projectId)
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

  const onSubmit = project => {
    console.log('Proyecto:', project)
    projectService
      .update(projectId, project)
      .then(() => console.log(project))
      .catch(err => {
        console.error('Error al enviar la solicitud:', err)
        if (err.response.status === 400)
          setErrorsFromResponse(err.response.data)
      })
  }

  if (loading) return <CircularProgress />

  return (
    <Stack spacing={3}>
      <Typography variant="h2" component="h2">
        Editar Proyecto
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
        submitLabel="Guardar Cambios"
        defaultValues={getDefaultValues(project)}
      />
    </Stack>
  )
}

export default EditProjectPage
