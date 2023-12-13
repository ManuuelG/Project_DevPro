import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import axios from 'axios'

function SearchBar({ onSearch, setError }) {
  const [searchUser, setsearchUser] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/users')
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching user data', error)
      })
  }, [])

  const handleSearchChange = event => {
    const user = event.target.value
    setsearchUser(user)
    onSearch(user, setError)
  }

  return (
    <Box sx={{ marginBottom: 2, width: '30%' }}>
      <TextField
        label="Search User..."
        variant="outlined"
        fullWidth
        value={searchUser}
        onChange={handleSearchChange}
        error={false}
        helperText={false}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '25px',
          },
        }}
      />
    </Box>
  )
}

export default SearchBar
