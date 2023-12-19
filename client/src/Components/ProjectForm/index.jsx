import { Button, Stack } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'

import * as fields from './input-fields'

function ProjectForm({
  inputs,
  validationSchema,
  onSubmit,
  errorsFromResponse = [],
  submitLabel,
  defaultValues,
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema), defaultValues })

  useEffect(() => {
    if (!Array.isArray(errorsFromResponse)) return

    errorsFromResponse.forEach(({ field, msg }) => {
      setError(field, { type: 'response', message: msg }, { shouldFocus: true })
    })
  }, [errorsFromResponse])

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(data => onSubmit(data, { setError, reset }))}
      spacing={5}
    >
      {inputs.map(({ name, type, ...rest }) => {
        const Input = fields[type] || fields.input

        if (type === 'select') {
          return (
            <Controller
              key={name}
              name={name}
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <Input
                  type={type}
                  errors={errors[name]}
                  inputRef={field.ref}
                  {...field}
                  {...rest}
                />
              )}
            />
          )
        }

        const { ref, ...registerProps } = register(name)

        return (
          <Input
            key={name}
            autoComplete="off"
            type={type}
            errors={errors[name]}
            inputRef={ref}
            {...registerProps}
            {...rest}
          />
        )
      })}

      <Button type="submit" sx={{ mt: 3, mb: 2 }} fullWidth variant="contained">
        {submitLabel}
      </Button>
    </Stack>
  )
}

export default ProjectForm
