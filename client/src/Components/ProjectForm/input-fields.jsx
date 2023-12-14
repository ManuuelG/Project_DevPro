import { TextField, MenuItem } from '@mui/material'

const input = ({ name, errors, ...rest }) => {
  return (
    <TextField
      id={name}
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
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  )
}

export { input, select }
