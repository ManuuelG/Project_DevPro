import React, { useState, useEffect } from 'react'
import {
  Stack,
  Typography,
  CircularProgress,
  Container,
  Paper,
} from '@mui/material'
import { ProjectForm } from 'components'
import { fields, schema, getDefaultValues } from './form-data'
import projectService from 'services/project-service'
import skillService from 'services/skill-service'
import { useParams } from 'react-router-dom'
import { useProject } from 'hooks'
import { useNavigate } from 'react-router-dom'

function EditProjectPage() {
  const navigate = useNavigate()
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

    const formData = new FormData()

    formData.append('name', project.name)
    formData.append('date', project.date)
    formData.append('image', project.image)
    formData.append('repolink', project.repolink)
    formData.append('deploylink', project.deploylink)
    formData.append('description', project.description)
    project.skills.forEach(skill => {
      formData.append('skills', skill)
    })

    projectService
      .update(projectId, formData)
      .then(() => {
        console.log(project), navigate('/')
      })
      .catch(err => {
        console.error('Error al enviar la solicitud:', err)
        if (err.response.status === 400)
          setErrorsFromResponse(err.response.data)
      })
  }

  if (loading) return <CircularProgress />

  return (
    <Container maxWidth="sm" sx={{ paddingBottom: 2 }}>
      {' '}
      <Paper
        elevation={3}
        sx={{
          backgroundColor: 'transparent',
          boxShadow: '0px 0px 15px 5px rgba(255, 255, 255, 0.75)',
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h2" component="h2" sx={{ textAlign: 'center' }}>
            Edit Project
          </Typography>

          <ProjectForm
            inputs={fields.map(field => {
              if (field.name === 'skills') {
                return {
                  ...field,
                  options: skills.map(skill => ({
                    value: skill._id,
                    label: skill.name,
                    color: skill.color,
                  })),
                }
              }
              return field
            })}
            onSubmit={onSubmit}
            validationSchema={schema}
            errorsFromResponse={errorsFromResponse}
            submitLabel="Save Changes"
            defaultValues={getDefaultValues(project)}
          />
        </Stack>
      </Paper>
    </Container>
  )
}

export default EditProjectPage
