import { ChangeEvent, useState, useEffect } from 'react'
import {
  Box,
  Button,
  Grid,
  GridItem,
  Image,
  Flex,
  Input,
  Stack,
  Text
} from '@chakra-ui/react'
import { useAddNewUser, useLoadingIndicator } from 'services/zustandVariables'
import { shallow } from 'zustand/shallow'
import { uploadNewImage, EmailRegEx } from 'helpers'
import { useAccountManagementActions, useAccount } from 'lib'
import { ModalContainer, InputField } from 'components'
import { useForm } from 'react-hook-form'
import { SignUpTypes } from 'helpers'

export const AddNewUserModal: React.FC = () => {
  const { isOpen } = useAddNewUser((state) => ({ ...state }), shallow)
  const { triggerNewUserModal } = useAccountManagementActions()
  const [state, setState] = useState<{ rawImage: File[]; preview: string }>({
    rawImage: [],
    preview: ''
  })

  const isSaving = useLoadingIndicator((state) => state.isLoading)

  const { validateStrongPassword, registerUserAdmin } = useAccount()

  const {
    handleSubmit,
    register,
    watch,
    setError,
    reset,
    formState: { errors },
    clearErrors
  } = useForm<SignUpTypes>()

  const watchForm = watch([
    'email',
    'firstName',
    'lastName',
    'address',
    'mobileNumber',
    'password',
    'confirmPassword'
  ])

  const onUploadChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { rawImage, preview } = uploadNewImage(e)

    if (rawImage.length > 0) {
      setState({ rawImage, preview })
    }
  }

  const onSubmit = async (data: SignUpTypes): Promise<void> => {
    const { checkError } = errorHandler(data)

    const { email, password, firstName, lastName, address, mobileNumber } = data
    const saveToDoc = {
      firstName,
      lastName,
      address,
      password,
      email,
      mobileNumber
    }

    if (!checkError && state.rawImage.length > 0) {
      await registerUserAdmin({
        email,
        password,
        config: { ...saveToDoc },
        image: state.rawImage || ''
      })
      triggerNewUserModal(false)
      clearErrors()
      setState({ rawImage: [], preview: '' })
      reset()
    }

    setError('uploadImage', {
      message: 'Required to upload image.'
    })
  }

  // clearErrors if upload image has value
  useEffect(() => {
    if (state.rawImage.length > 0) {
      clearErrors()
    }
  }, [state.rawImage, clearErrors])

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
      setError('lastName', {
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

  const hasFormValue = watchForm.findIndex((find) => !find) > -1

  return (
    <ModalContainer
      title='Add User'
      isOpen={isOpen}
      onClose={() => triggerNewUserModal(!isOpen)}
      contentWidth='51.1875rem'
    >
      <Flex paddingX='2rem' paddingBottom='2rem'>
        <Flex flexDirection='column' alignItems='center' gap='1rem' flex='1'>
          <Image
            src={state.preview || '/image/avatar.jpg'}
            width={150}
            height={150}
            objectFit='cover'
            alt='user avatar'
            aria-label='user-avatar'
            rounded='full'
          />
          <Box position='relative'>
            <Button
              type='button'
              variant='primary'
              fontSize='0.9rem'
              rounded='full'
              width={200}
            >
              Upload Image
            </Button>
            {!state.preview && (
              <Input
                type='file'
                height='100%'
                width='100%'
                position='absolute'
                top='0'
                left='0'
                opacity='0'
                aria-hidden='true'
                accept='image/*'
                cursor='pointer'
                onChange={(e) => onUploadChange(e)}
              />
            )}
          </Box>
          {!!errors.uploadImage && (
            <Text color='red.500'>{errors.uploadImage?.message}</Text>
          )}
        </Flex>
        <Stack as='form' onSubmit={handleSubmit(onSubmit)}>
          <Grid
            templateColumns='repeat(2, 1fr)'
            templateRows='3'
            flex='2'
            gap='5'
          >
            <GridItem width='100%'>
              <Box>
                <InputField
                  type='email'
                  labelWeight='noraml'
                  labelSize='1rem'
                  label='Email:'
                  inputProps={{ height: '2.25rem' }}
                  {...register('email')}
                  isError={!!errors.email}
                  errorMessage={errors.email?.message}
                />
              </Box>
              <Box marginTop='1rem'>
                <InputField
                  type='text'
                  labelWeight='noraml'
                  labelSize='1rem'
                  label='Full Name:'
                  inputProps={{ height: '2.25rem' }}
                  {...register('firstName')}
                  isError={!!errors.firstName}
                  errorMessage={errors.firstName?.message}
                />
              </Box>
              <Box marginTop='1rem'>
                <InputField
                  type='text'
                  labelWeight='noraml'
                  labelSize='1rem'
                  label='Last Name:'
                  inputProps={{ height: '2.25rem' }}
                  {...register('lastName')}
                  isError={!!errors.lastName}
                  errorMessage={errors.lastName?.message}
                />
              </Box>
              <Box marginTop='1rem'>
                <InputField
                  type='text'
                  labelWeight='noraml'
                  labelSize='1rem'
                  label='Address:'
                  inputProps={{ height: '2.25rem' }}
                  {...register('address')}
                  isError={!!errors.address}
                  errorMessage={errors.address?.message}
                />
              </Box>
            </GridItem>
            <GridItem width='100%'>
              <Box>
                <InputField
                  type='text'
                  labelWeight='noraml'
                  labelSize='1rem'
                  label='Mobile Number:'
                  inputProps={{ height: '2.25rem' }}
                  {...register('mobileNumber')}
                  isError={!!errors.mobileNumber}
                  errorMessage={errors.mobileNumber?.message}
                />
              </Box>
              <Box marginTop='1rem'>
                <InputField
                  type='password'
                  labelWeight='noraml'
                  labelSize='1rem'
                  label='Password:'
                  inputProps={{ height: '2.25rem' }}
                  {...register('password')}
                  isError={!!errors.password}
                  errorMessage={errors.password?.message}
                />
              </Box>
              <Box marginTop='1rem'>
                <InputField
                  type='password'
                  labelWeight='noraml'
                  labelSize='1rem'
                  label='Repeat Password:'
                  inputProps={{ height: '2.25rem' }}
                  {...register('confirmPassword')}
                  isError={!!errors.confirmPassword}
                  errorMessage={errors.confirmPassword?.message}
                />
              </Box>
            </GridItem>
            <GridItem colSpan={2}>
              <Button
                type='submit'
                width='100%'
                fontSize='1rem'
                loadingText='Add User'
                isLoading={isSaving}
                isDisabled={hasFormValue}
              >
                Add User
              </Button>
            </GridItem>
          </Grid>
        </Stack>
      </Flex>
    </ModalContainer>
  )
}
