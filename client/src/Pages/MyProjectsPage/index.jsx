import { useEffect, useState } from 'react'
import { Container, Grid, Box, Button, CircularProgress } from '@mui/material'
import { ProjectCard, MultiSelect, SearchBar } from 'components'
import projectService from 'services/project-service'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import { Link } from 'react-router-dom'
import { useProjects, useAuth } from 'hooks'
import { useNavigate } from 'react-router-dom'

function ProjectPage() {
  const navigate = useNavigate()
  const { projects, loading, errors, setProjects } = useProjects()
  const [filteredProjects, setFilteredProjects] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [{ auth, username }] = useAuth()

  useEffect(() => {
    projectService
      .get()
      .then(response => {
        setFilteredProjects(response.data)
      })
      .catch(error => {
        console.error('Error fetching data', error)
      })
  }, [])

  const handleSkillChange = selectedSkills => {
    if (selectedSkills.length === 0) {
      setFilteredProjects(projects)
    } else {
      const filtered = projects.filter(project =>
        project.skills.some(skill => selectedSkills.includes(skill.name))
      )
      setFilteredProjects(filtered)
    }
  }

  const handleSearch = term => {
    setSearchTerm(term)

    const filtered = projects.filter(project =>
      project.author?.username.toLowerCase().includes(term.toLowerCase())
    )
    setFilteredProjects(filtered)
  }

  const handleEdit = projectId => navigate('projects/edit/' + projectId)
  const handleDelete = projectId =>
    projectService
      .delete(projectId)
      .then(({ data }) =>
        setFilteredProjects(
          filteredProjects.filter(projects => projects._id !== data._id)
        )
      )
      .catch(err => console.log(err))

  if (loading) return <CircularProgress />

  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: 2,
          gap: 2,
        }}
      >
        {auth && (
          <Button
            variant="contained"
            component={Link}
            to="/projects/new"
            sx={{
              backgroundColor: 'red',
              gap: 1,
            }}
          >
            <CreateNewFolderIcon /> Nuevo Proyecto
          </Button>
        )}
        <SearchBar onSearch={handleSearch} />
        <MultiSelect onSkillChange={handleSkillChange} />
      </Box>
      <Grid container spacing={2} sx={{ marginTop: 2, marginBottom: 2 }}>
        {filteredProjects.length === 0 ? (
          <Box
            component="img"
            sx={{
              display: 'block',
              margin: 'auto',
              maxWidth: '100%',
              maxHeight: '100%',
              marginTop: 2,
            }}
            alt="Meme"
            src="/meme.png"
          />
        ) : (
          filteredProjects.map(project => (
            <Grid item key={project._id} xs={12} sm={6} md={4} lg={3}>
              <ProjectCard
                project={project}
                showActions={auth}
                onEdit={() => handleEdit(project._id)}
                onDelete={() => handleDelete(project._id)}
                canEditAndDelete={auth && username === project.author?.username}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  )
}

export default ProjectPage
