// MultiSelect.jsx
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import axios from 'axios'

function MultiSelect({ onSkillChange }) {
  const [skills, setSkills] = useState([])
  const [selectedSkills, setSelectedSkills] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/skills')
      .then(response => {
        setSkills(response.data)
      })
      .catch(error => {
        console.error('Error fetching skills', error)
      })
  }, [])

  const handleChange = event => {
    const selectedValues = Array.isArray(event.target.value)
      ? event.target.value
      : []
    setSelectedSkills(selectedValues)
    onSkillChange(selectedValues)
  }

  const getRandomColor = () => {
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`

    return randomColor
  }

  return (
    <Box sx={{ width: '20%' }}>
      <FormControl fullWidth>
        <InputLabel id="skills-select-label">Skills</InputLabel>
        <Select
          labelId="skills-select-label"
          id="skills-select"
          multiple
          value={selectedSkills}
          onChange={handleChange}
          label="Skills"
          renderValue={selected => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map(value => (
                <Box
                  key={value}
                  sx={{ display: 'flex', alignItems: 'center', marginRight: 1 }}
                >
                  <span
                    style={{
                      backgroundColor: getRandomColor(),
                      borderRadius: '50%',
                      width: '12px',
                      height: '12px',
                      marginRight: '4px',
                    }}
                  ></span>
                  <span>{value}</span>
                </Box>
              ))}
            </Box>
          )}
        >
          {skills.map(skill => (
            <MenuItem key={skill._id} value={skill.name}>
              <Checkbox checked={selectedSkills.indexOf(skill.name) > -1} />
              <ListItemText primary={skill.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default MultiSelect
