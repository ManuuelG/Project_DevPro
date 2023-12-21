import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import EditIcon from '@mui/icons-material/Edit'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined'
import { useState, useEffect } from 'react'
import Chip from '@mui/material/Chip'
import skillService from 'services/skill-service'

function ProjectCard({
  project,
  onEdit,
  onDelete,
  onFav,
  onDetails,
  showActions,
  canEditAndDelete,
}) {
  const { name, image, author, skills, faved } = project
  const [isFaved, setIsFaved] = useState(false)
  const [skillsWithColor, setSkillsWithColor] = useState([])

  useEffect(() => {
    setIsFaved(faved)
  }, [faved])

  useEffect(() => {
    skillService
      .get('/skills')
      .then(response => {
        const skillsWithColorData = response.data.map(skill => ({
          ...skill,
          color: skill.color || '#000000',
        }))
        setSkillsWithColor(skillsWithColorData)
      })
      .catch(error => {
        console.error('Error fetching skills with color', error)
      })
  }, [])

  const handleToggleFaved = async () => {
    try {
      await onFav(project._id)
      setIsFaved(prevFaved => !prevFaved)
    } catch (error) {
      console.error('Error dando fav desde card', error)
    }
  }

  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: '#EEEEEE',
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: '0 0 10px rgba(7, 59, 76, 0.5)',
        },
      }}
    >
      <CardMedia
        sx={{ width: '100%', height: 140, backgroundSize: 'cover' }}
        image={image}
        title={name}
      />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 1 }}
        >
          {author?.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {skills.map(skill => (
            <Chip
              key={skill._id}
              label={skill.name}
              sx={{
                backgroundColor:
                  skillsWithColor.find(s => s.name === skill.name)?.color ||
                  '#000000',
                color: 'white',
                margin: '2px',
              }}
            />
          ))}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {showActions && (
          <>
            <IconButton size="small" onClick={handleToggleFaved}>
              {isFaved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <IconButton size="small" onClick={onDetails}>
              {' '}
              <PageviewOutlinedIcon />
            </IconButton>

            {canEditAndDelete && (
              <>
                <IconButton size="small" onClick={onEdit}>
                  {' '}
                  <EditIcon />
                </IconButton>
                <IconButton size="small" onClick={onDelete}>
                  {' '}
                  <HighlightOffIcon />
                </IconButton>
              </>
            )}
          </>
        )}
      </CardActions>
    </Card>
  )
}

export default ProjectCard
