import { Button, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
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

        const { ref, ...registerProps } = register(name)

        return (
          <Input
            key={name}
            type={type}
            errors={errors[name]}
            inputRef={ref}
            {...registerProps}
            {...rest}
          />
        )
      })}

      <Button type="submit">{submitLabel}</Button>
    </Stack>
  )
}

export default ProjectForm
