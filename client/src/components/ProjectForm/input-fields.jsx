import { TextField, MenuItem } from '@mui/material'

const input = ({ name, errors, ...rest }) => {
  return (
    <TextField
      id={name}
      sx={{
        backgroundColor: '#EEEEEE',
        maxWidth: '350px',
        borderRadius: 2,
        '& fieldset': { border: 'none' },
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: '0 0 10px rgba(7, 59, 76, 0.5)',
        },
      }}
      name={name}
      variant="outlined"
      error={Boolean(errors)}
      helperText={errors?.message}
      {...rest}
    />
  )
}

const select = ({ name, errors, options, placeholder, ...rest }) => {
  return (
    <TextField
      select
      id={name}
      sx={{
        maxWidth: '350px',
        backgroundColor: '#EEEEEE',
        borderRadius: 2,
        '& fieldset': { border: 'none' },
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: '0 0 10px rgba(7, 59, 76, 0.5)',
        },
      }}
      name={name}
      variant="outlined"
      error={Boolean(errors)}
      helperText={errors?.message}
      defaultValue={[]}
      SelectProps={{ multiple: true }}
      {...rest}
    >
      <MenuItem disabled value="">
        {placeholder}
      </MenuItem>
      {options.map(option => (
        <MenuItem key={option.value} value={option.value}>
          <span
            style={{
              display: 'inline-block',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              marginRight: '5px',
              backgroundColor: option.color,
            }}
          />
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  )
}

export { input, select }
