import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useState, useEffect } from 'react'

function ProjectCard({ project }) {
  const { name, image, author, skills, faved } = project
  const [isFaved, setIsFaved] = useState(false)

  useEffect(() => {
    setIsFaved(faved)
  }, [faved])

  const handleToggleFaved = () => {
    setIsFaved(!isFaved)
    onToggleFaved(project)
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140, backgroundSize: 'contain' }}
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
        <Typography variant="body2" color="text.secondary">
          {author?.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {skills.map(skill => skill.name).join(', ')}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconButton size="small" onClick={handleToggleFaved}>
          {!isFaved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default ProjectCard
