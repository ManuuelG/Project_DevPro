import React, { useState, useEffect } from 'react'
import { Stack, Typography, Paper, Container } from '@mui/material'
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

  const onSubmit = (project, { reset }) => {
    console.log('Proyecto:', project)

    const formData = new FormData()

    formData.append('name', project.name)
    formData.append('date', project.date)
    formData.append('image', project.image[0], project.image[0].name)
    formData.append('repolink', project.repolink)
    formData.append('deploylink', project.deploylink)
    formData.append('description', project.description)
    project.skills.forEach(skill => {
      formData.append('skills', skill)
    })

    projectService
      .create(formData)
      .then(
        response =>
          console.log('Proyecto creado en el servidor:', response.data),
        reset()
      )
      .catch(err => {
        console.error('Error al enviar la solicitud:', err)
        if (err.response.status === 400)
          setErrorsFromResponse(err.response.data)
      })
  }

  return (
    <Container maxWidth="sm" sx={{ paddingBottom: 2 }}>
      {' '}
      <Paper
        elevation={3}
        sx={{
          backgroundColor: 'transparent',
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h2" component="h2" sx={{ textAlign: 'center' }}>
            Nuevo Proyecto
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
      </Paper>
    </Container>
  )
}

export default CreateProjectPage
