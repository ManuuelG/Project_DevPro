import { useEffect, useState } from 'react'
import { Container, Grid, Box, CircularProgress } from '@mui/material'
import { ProjectCard, SearchBar } from 'components'
import projectService from 'services/project-service'
import { useProjects, useAuth } from 'hooks'
import { useNavigate } from 'react-router-dom'

function MyFavoritePage() {
  const navigate = useNavigate()
  const { loading } = useProjects()
  const [favoriteProjects, setFavoriteProjects] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [{ id }] = useAuth()

  useEffect(() => {
    projectService
      .getFav()
      .then(response => console.log(response.data))
      .catch(error => console.error('Error', error))
  }, [id])

  const handleSearch = term => {
    setSearchTerm(term)

    const filtered = favoriteProjects.filter(project =>
      project.author?.username.toLowerCase().includes(term.toLowerCase())
    )
    setFavoriteProjects(filtered)
  }

  const handleViewDetails = projectId => navigate('/' + projectId)

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
        <SearchBar onSearch={handleSearch} />
      </Box>
      <Grid container spacing={2} sx={{ marginTop: 2, paddingBottom: 2 }}>
        {favoriteProjects.length === 0 ? (
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
          favoriteProjects.map(project => (
            <Grid item key={project._id} xs={12} sm={6} md={4} lg={3}>
              <ProjectCard
                project={project}
                onDetails={() => handleViewDetails(project._id)}
                showActions={false}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  )
}

export default MyFavoritePage
