import React, { ReactElement } from 'react'
import { Box, Flex, Icon, Text, Center } from '@chakra-ui/react'
import { useGetRegistration } from 'services/zustandVariables'
import { CarMarker, LazySpinner } from 'components'
import { UploadProfile, RegistrationForm, Success } from './components'
import { shallow } from 'zustand/shallow'

export const CreateAccount = () => {
  const { step: stepsVars, loading: isLoading } = useGetRegistration(
    (state) => ({ step: state.step, loading: state.loading }),
    shallow
  )

  const renderStep = (type) => {
    switch (type) {
      case 'registrationForm': {
        return <RegistrationForm />
      }
      case 'uploadImage': {
        return <UploadProfile />
      }
      case 'success': {
        return <Success />
      }
      default: {
        return ''
      }
    }
  }

  const description = {
    registrationForm:
      'Please provide an input to the given fields to create an admin account',
    uploadImage: 'Please upload an image for your profile picture'
  }

  if (isLoading) {
    return (
      <Center width='100%' height='100vh'>
        <LazySpinner />
      </Center>
    )
  }

  return (
    <Box maxWidth='1200px' margin='0 auto' py='3.25rem'>
      {stepsVars !== 'success' && (
        <Flex alignItems='center' gap='1rem'>
          <Icon as={CarMarker} width={125} height={162} />
          <Text
            fontSize='1.75rem'
            width='50rem'
            aria-label='sign-up-description'
          >
            {description[stepsVars]}
          </Text>
        </Flex>
      )}
      {renderStep(stepsVars)}
    </Box>
  )
}
