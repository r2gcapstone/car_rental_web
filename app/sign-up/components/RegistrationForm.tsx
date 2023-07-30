import React, { useContext } from 'react'
import { AuthContext } from 'context'
import { InputField } from 'components'
import { Stack, Box, Grid, GridItem, Button } from '@chakra-ui/react'
import { EmailRegEx } from 'helpers'
import { useAccount } from 'lib'
import { useForm } from 'react-hook-form'

type Names =
  | 'email'
  | 'firstName'
  | 'lastName'
  | 'address'
  | 'password'
  | 'confirmPassword'

interface SignUpTypes {
  email: string
  firstName: string
  lastName: string
  address: string
  password: string
  confirmPassword: string
}
interface InputFieldTypes {
  label: string
  name: Names
  ariaLabel: string
  placeholder?: string
  type?: string
}

export const RegistrationForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    setError,
    watch,
    reset,
    formState: { errors }
  } = useForm<SignUpTypes>()
  const { validateStrongPassword, registerUser } = useAccount()
  const { state } = useContext(AuthContext)

  const formValues = watch([
    'email',
    'firstName',
    'lastName',
    'address',
    'password',
    'confirmPassword'
  ])

  const isDisable = formValues.findIndex((find) => !find) > -1

  const onSubmit = (data: SignUpTypes): void => {
    const { checkError } = errorHandler(data)

    const { email, password } = data

    if (!checkError) {
      registerUser({
        email,
        password,
        config: { ...data, imageUrl: '' }
      })
      reset()
    }
  }

  const errorHandler = (data: SignUpTypes): { checkError: boolean } => {
    const { email, firstName, lastName, password, confirmPassword } = data
    const { validation: passwordValidation, message: errorMessage } =
      validateStrongPassword(password)

    let isCheckError = false

    if (!EmailRegEx.test(email)) {
      setError('email', {
        message: 'This email is not valid.'
      })
      isCheckError = true
    }

    if (firstName.length === 50) {
      setError('firstName', {
        type: 'server',
        message: 'Maximum 50 characters only.'
      })
      isCheckError = true
    }

    if (lastName.length === 50) {
      setError('firstName', {
        message: 'Maximum 50 characters only.'
      })
      isCheckError = true
    }

    if (!passwordValidation) {
      setError('password', {
        message: errorMessage
      })
      isCheckError = false
    }

    if (password.trim() !== confirmPassword.trim()) {
      setError('confirmPassword', {
        message: 'Your password and confirm password is not match.'
      })
      isCheckError = true
    }

    return {
      checkError: isCheckError
    }
  }

  const leftInputFields: InputFieldTypes[] = [
    {
      label: 'Email',
      ariaLabel: 'email',
      placeholder: 'email here...',
      name: 'email',
      type: 'text'
    },
    {
      label: 'First name',
      ariaLabel: 'firstname',
      placeholder: 'first name here...',
      name: 'firstName',
      type: 'text'
    },
    {
      label: 'Last name',
      ariaLabel: 'lastname',
      placeholder: 'lastname here...',
      name: 'lastName',
      type: 'text'
    }
  ]

  const rightInputField: InputFieldTypes[] = [
    {
      label: 'Address',
      ariaLabel: 'address',
      placeholder: 'address here...',
      name: 'address',
      type: 'text'
    },
    {
      label: 'Password',
      ariaLabel: 'password',
      placeholder: 'password here...',
      name: 'password',
      type: 'password'
    },
    {
      label: 'Confirm password',
      ariaLabel: 'confirm-password',
      placeholder: 'confirm password here...',
      name: 'confirmPassword',
      type: 'password'
    }
  ]

  return (
    <Stack as='form' mt='2.56rem' onSubmit={handleSubmit(onSubmit)}>
      <Grid height='100%' templateColumns='repeat(2, 1fr)' gap='2.63rem'>
        <GridItem width='100%'>
          {leftInputFields.map(
            ({ label, ariaLabel, placeholder, type, name }) => (
              <Box mt='4' key={label}>
                <InputField
                  type={type}
                  label={label}
                  placeholder={placeholder}
                  arial-label={ariaLabel}
                  height='3rem'
                  isError={!!errors[name]}
                  errorMessage={errors[name]?.message}
                  {...register(name)}
                />
              </Box>
            )
          )}
        </GridItem>
        <GridItem width='100%'>
          {rightInputField.map(
            ({ label, ariaLabel, placeholder, type, name }) => (
              <Box mt='4' key={label}>
                <InputField
                  type={type}
                  label={label}
                  placeholder={placeholder}
                  arial-label={ariaLabel}
                  height='3rem'
                  isError={!!errors[name]}
                  errorMessage={errors[name]?.message}
                  {...register(name)}
                />
              </Box>
            )
          )}
        </GridItem>
      </Grid>

      <Button
        role='button'
        type='submit'
        mt='8'
        variant='primary'
        fontSize='1rem'
        height='3rem'
        isDisabled={isDisable}
      >
        Submit
      </Button>
    </Stack>
  )
}
