import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#073b4c',
    },
    secondary: {
      main: '#118ab2',
    },
    error: {
      main: '#ef476f',
    },
    warning: {
      main: '#ffd166',
    },
    success: {
      main: '#06d6a0',
    },
  },

  typography: {
    h2: {
      fontSize: '2.5rem',
    },
  },
})

const ThemeProvider = ({ children }) => (
  <MUIThemeProvider theme={theme}>
    <CssBaseline />

    {children}
  </MUIThemeProvider>
)

export default ThemeProvider
