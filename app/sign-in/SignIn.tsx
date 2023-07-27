import { Flex, Icon, Stack, Button, Text, Box, Center } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { CarMarker, InputField } from 'components'
import { EmailRegEx } from 'helpers'
import Link from 'next/link'

interface SignInTypes {
  email: string
  password: string
}

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInTypes>()

  const onSubmit = (data: SignInTypes) => {
    console.log(data)
  }

  return (
    <Flex aria-label='sign-in' maxWidth='1200px' height='100%' margin='0 auto'>
      {/* left side panel */}
      <Flex
        flex='1'
        alignItems='center'
        justifyContent='center'
        flexDirection='column'
      >
        <Icon as={CarMarker} width={204} height={268} />
        <Text color='white' fontSize='4rem' textTransform='uppercase'>
          R2G
        </Text>
        <Text
          color='white'
          textTransform='uppercase'
          fontSize='2.5rem'
          fontWeight='bold'
        >
          RENT TO GO
        </Text>
      </Flex>
      {/* right side panel */}
      <Stack
        as='form'
        flex='1'
        justifyContent='center'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Text
          fontSize='1.5625rem'
          mb='4'
          lineHeight='2rem'
          aria-label='signin-description'
        >
          Please enter your email and password of your admin account.
        </Text>

        <Box mb='2'>
          <InputField
            label='Email'
            placeholder='Email'
            arial-label='email'
            height='3rem'
            isError={!!errors.email}
            errorMessage={errors?.email?.message}
            {...register('email', {
              required: 'Required field.',
              maxLength: {
                value: 50,
                message: 'Email is not more than 50 characters.'
              },
              pattern: {
                value: EmailRegEx,
                message: 'Email is not valid.'
              }
            })}
          />
        </Box>
        <Box>
          <InputField
            type='password'
            label='Password'
            placeholder='Password'
            aria-label='password'
            height='3rem'
            isError={!!errors.password}
            errorMessage={errors?.password?.message}
            {...register('password', {
              required: 'Required field.'
            })}
          />
        </Box>

        <Link href='#'>
          <Text
            fontSize='1.375rem'
            _hover={{
              textDecor: 'underline'
            }}
          >
            Forgot password?
          </Text>
        </Link>

        <Button
          role='button'
          type='submit'
          mt='8'
          variant='primary'
          fontSize='1rem'
          height='3rem'
        >
          Login
        </Button>

        <Center
          width='100%'
          _hover={{
            textDecor: 'underline'
          }}
        >
          <Link href='/sign-up' style={{ color: 'white' }}>
            <Text mt='1.88rem' fontSize='1.2rem'>
              Create an Admin Account
            </Text>
          </Link>
        </Center>
      </Stack>
    </Flex>
  )
}
