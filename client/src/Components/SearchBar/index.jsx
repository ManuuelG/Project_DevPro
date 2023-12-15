import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import userService from 'services/user-service'

function SearchBar({ onSearch, setError }) {
  const [searchUser, setsearchUser] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService
      .get()
      .then(response => {})
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
    <TextField
      label="Search User..."
      variant="outlined"
      fullWidth
      value={searchUser}
      onChange={handleSearchChange}
      error={false}
      helperText={false}
      sx={{
        width: '30%',
        '& .MuiOutlinedInput-root': {
          borderRadius: '25px',
        },
      }}
    />
  )
}

export default SearchBar
