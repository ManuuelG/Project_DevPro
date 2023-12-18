import React from 'react'
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Container,
  Avatar,
  Button,
  Tooltip,
  Typography,
  MenuItem,
  Menu,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import FolderSpecialOutlinedIcon from '@mui/icons-material/FolderSpecialOutlined'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream'
import { Link } from 'react-router-dom'
import { useAuth } from 'hooks'

function Navbar() {
  const [user] = useAuth()
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenNavMenu = event => setAnchorElNav(event.currentTarget)
  const handleOpenUserMenu = event => setAnchorElUser(event.currentTarget)

  const optionsMainMenu = user.auth
    ? [
        { label: <HomeOutlinedIcon />, to: '/' },
        { label: <FolderOutlinedIcon />, to: '/' },
        { label: <FolderSpecialOutlinedIcon />, to: '/favorites' },
      ]
    : [{ label: <FolderOutlinedIcon />, to: '/' }]

  const optionsUserMenu = user.auth
    ? [{ label: 'Logout', to: '/logout' }]
    : [
        { label: 'Login', to: '/login' },
        { label: 'Register', to: '/register' },
      ]

  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SettingsSystemDaydreamIcon
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            DevPro
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {optionsMainMenu.map(option => (
                <MenuItem
                  key={option.label}
                  onClick={() => setAnchorElNav(null)}
                >
                  <Typography
                    textAlign="center"
                    component={Link}
                    to={option.to}
                    sx={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    {option.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <SettingsSystemDaydreamIcon
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            DevPro
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {optionsMainMenu.map(option => (
              <Button
                key={option.label}
                component={Link}
                to={option.to}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {option.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" sx={{ cursor: 'pointer' }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: 1, mr: 1 }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
            >
              {optionsUserMenu.map(option => (
                <MenuItem
                  key={option.label}
                  onClick={() => setAnchorElUser(null)}
                >
                  <Typography
                    textAlign="center"
                    component={Link}
                    to={option.to}
                    sx={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    {option.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
