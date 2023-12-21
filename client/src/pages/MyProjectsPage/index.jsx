import React, { useEffect, useState } from 'react'
import {
  Container,
  Grid,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { ProjectCard, MultiSelect } from 'components'
import projectService from 'services/project-service'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import { Link } from 'react-router-dom'
import { useProjects, useAuth } from 'hooks'
import { useNavigate } from 'react-router-dom'

function MyProjectPage() {
  const navigate = useNavigate()
  const [{ auth, username, id, admin }] = useAuth()
  const { loading } = useProjects()
  const [filteredProjects, setFilteredProjects] = useState([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState(null)

  useEffect(() => {
    if (id) {
      projectService
        .get()
        .then(response => {
          const userProjects = response.data.filter(
            project => project.author.username === username
          )

          const projectsData = userProjects.map(project => ({
            ...project,
            faved: project.faved.includes(id),
          }))

          setFilteredProjects(projectsData)
        })
        .catch(error => {
          console.error('Error fetching data', error)
        })
    }
  }, [id])

  const handleSkillChange = selectedSkills => {
    if (selectedSkills.length === 0) {
      projectService
        .get()
        .then(response => {
          const userProjects = response.data.filter(
            project => project.author.username === username
          )
          setFilteredProjects(userProjects)
        })
        .catch(error => {
          console.error('Error fetching data', error)
        })
    } else {
      const filtered = filteredProjects.filter(project =>
        project.skills.some(skill => selectedSkills.includes(skill.name))
      )
      setFilteredProjects(filtered)
    }
  }

  const handleEdit = projectId => navigate('edit/' + projectId)

  const handleDelete = projectId => {
    setProjectToDelete(projectId)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    projectService
      .delete(projectToDelete)
      .then(({ data }) => {
        setFilteredProjects(prevProjects =>
          prevProjects.filter(project => project._id !== data._id)
        )
        setDeleteDialogOpen(false)
      })
      .catch(err => {
        console.log(err)
        setDeleteDialogOpen(false)
      })
  }

  const handleCancelDelete = () => {
    setProjectToDelete(null)
    setDeleteDialogOpen(false)
  }

  const handleToggleFav = projectId => {
    projectService
      .addFav(projectId)
      .then(() =>
        setFilteredProjects(prevProjects =>
          prevProjects.map(project =>
            project._id === projectId
              ? { ...project, faved: !project.faved }
              : project
          )
        )
      )
      .catch(err => {
        console.error('Error dando fav desde page', err)
      })
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
        {auth && (
          <Button
            variant="contained"
            component={Link}
            to="/projects/new"
            sx={{
              gap: 1,
            }}
          >
            <CreateNewFolderIcon /> New Project
          </Button>
        )}

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
                onFav={handleToggleFav}
                onEdit={() => handleEdit(project._id)}
                onDetails={() => handleViewDetails(project._id)}
                onDelete={() => handleDelete(project._id)}
                canEditAndDelete={auth && username === project.author?.username}
              />
            </Grid>
          ))
        )}
      </Grid>

      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this project?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default MyProjectPage
