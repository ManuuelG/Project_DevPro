import { useEffect, useState } from 'react'
import { Container, Grid, Box, Button } from '@mui/material'
import { ProjectCard, MultiSelect, SearchBar } from 'components'
import projectService from 'services/project-service'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import { Link } from 'react-router-dom'

const ProjectPage = () => {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    projectService
      .get()
      .then(response => {
        console.log(response.data)
        setProjects(response.data)
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
      project.author.username.toLowerCase().includes(term.toLowerCase())
    )
    setFilteredProjects(filtered)
  }

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
        {' '}
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
            <Grid item key={project.id} xs={12} sm={6} md={4} lg={3}>
              <ProjectCard project={project} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  )
}

export default ProjectPage
