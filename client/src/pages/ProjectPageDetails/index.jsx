import React, { useEffect, useState } from 'react'
import {
  Paper,
  Typography,
  Button,
  CircularProgress,
  Chip,
} from '@mui/material'
import { useParams, Link } from 'react-router-dom'
import projectService from 'services/project-service'
import skillService from 'services/skill-service'
import userService from 'services/user-service'
import { useProject } from 'hooks'

const ProjectPageDetails = () => {
  const { projectId } = useParams()
  const { project, loading, errors, setProject } = useProject(projectId)

  const [users, setUsers] = useState([])
  const [skills, setSkills] = useState([])
  const [skillsWithColor, setSkillsWithColor] = useState([])

  useEffect(() => {
    userService
      .get()
      .then(response => {
        setUsers(response.data)
      })
      .catch(error => {
        console.error('Error fetching skills', error)
      })
  }, [])

  useEffect(() => {
    skillService
      .get()
      .then(response => {
        setSkills(response.data)

        const skillsWithColorData = response.data.map(skill => ({
          ...skill,
          color: skill.color || '#000000',
        }))
        setSkillsWithColor(skillsWithColorData)
      })

      .catch(error => {
        console.error('Error fetching skills', error)
      })
  }, [])

  useEffect(() => {
    projectService
      .getById(projectId)
      .then(response => {
        setProject(response.data)
      })
      .catch(error => {
        console.error('Error fetching project details', error)
      })
  }, [projectId])

  if (loading) {
    return <CircularProgress />
  }

  if (!project) {
    return <Typography variant="h6">No se encontró el proyecto</Typography>
  }

  return (
    <Paper
      elevation={3}
      sx={{
        padding: '30px',
        marginTop: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        boxShadow: '0px 0px 15px 5px rgba(255, 255, 255, 0.75)',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ marginBottom: '20px', textAlign: 'center' }}
      >
        {project.name}
      </Typography>
      <Typography variant="body1" paragraph sx={{ marginBottom: '15px' }}>
        User:{' '}
        {users.find(user => user._id === project.author)?.username ||
          'Desconocido'}
      </Typography>
      <Typography variant="body1" paragraph sx={{ marginBottom: '15px' }}>
        Date: {project.date}
      </Typography>
      <Typography variant="body1" paragraph sx={{ marginBottom: '15px' }}>
        Deploy Link: <a href={project.deploylink}>{project.deploylink}</a>
      </Typography>
      <Typography variant="body1" paragraph sx={{ marginBottom: '15px' }}>
        Repository Link: <a href={project.repolink}>{project.repolink}</a>
      </Typography>
      <Typography variant="body1" paragraph sx={{ marginBottom: '15px' }}>
        Skills:
        {project.skills.map(skillId => {
          const skill = skills.find(s => s._id === skillId)
          return skill ? (
            <Chip
              key={skill._id}
              label={skill.name}
              sx={{
                margin: '0 5px',
                backgroundColor:
                  skillsWithColor.find(s => s.name === skill.name)?.color ||
                  '#000000',
                color: 'white',
              }}
            />
          ) : null
        })}
      </Typography>
      <Typography variant="body1" paragraph sx={{ marginBottom: '15px' }}>
        Description: {project.description}
      </Typography>

      <Button
        component={Link}
        to="/"
        color="primary"
        variant="contained"
        sx={{
          marginTop: '15px',
          display: 'block',
          marginX: 'auto',
          width: 'fit-content',
        }}
      >
        Return to all projects
      </Button>
    </Paper>
  )
}

export default ProjectPageDetails
