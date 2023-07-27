import { CarMarker, InputField } from 'components'
import {
  Stack,
  Icon,
  Text,
  Flex,
  Box,
  Grid,
  GridItem,
  Button
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

interface InputFieldTypes {
  label: string
  ariaLabel: string
  placeholder?: string
  type?: string
}

export const SignUp = () => {
  const leftInputFields: InputFieldTypes[] = [
    {
      label: 'Email',
      ariaLabel: 'email',
      placeholder: 'email here...',
      type: 'text'
    },
    {
      label: 'First name',
      ariaLabel: 'firstname',
      placeholder: 'first name here...',
      type: 'text'
    },
    {
      label: 'Last name',
      ariaLabel: 'lastname',
      placeholder: 'lastname here...',
      type: 'text'
    }
  ]

  const rightInputField: InputFieldTypes[] = [
    {
      label: 'Address',
      ariaLabel: 'address',
      placeholder: 'address here...',
      type: 'text'
    },
    {
      label: 'Password',
      ariaLabel: 'password',
      placeholder: 'password here...',
      type: 'password'
    },
    {
      label: 'Confirm password',
      ariaLabel: 'confirm-password',
      placeholder: 'confirm password here...',
      type: 'password'
    }
  ]

  return (
    <Box maxWidth='1200px' height='100%' margin='0 auto' pt='3.25rem'>
      <Flex alignItems='center' gap='1rem'>
        <Icon as={CarMarker} width={125} height={162} />
        <Text fontSize='1.75rem' width='50rem'>
          Please provide an input to the given fields to create an admin account
        </Text>
      </Flex>

      <Stack as='form' mt='2.56rem'>
        <Grid height='100%' templateColumns='repeat(2, 1fr)' gap='2.63rem'>
          <GridItem width='100%'>
            {leftInputFields.map(({ label, ariaLabel, placeholder, type }) => (
              <Box mt='4'>
                <InputField
                  type={type}
                  label={label}
                  placeholder={placeholder}
                  arial-label={ariaLabel}
                  height='3rem'
                />
              </Box>
            ))}
          </GridItem>
          <GridItem width='100%'>
            {rightInputField.map(({ label, ariaLabel, placeholder, type }) => (
              <Box mt='4'>
                <InputField
                  type={type}
                  label={label}
                  placeholder={placeholder}
                  arial-label={ariaLabel}
                  height='3rem'
                />
              </Box>
            ))}
          </GridItem>
        </Grid>

        <Button
          role='button'
          type='submit'
          mt='8'
          variant='primary'
          fontSize='1rem'
          height='3rem'
        >
          Submit
        </Button>
      </Stack>
    </Box>
  )
}
