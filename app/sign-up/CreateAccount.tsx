import { ReactElement, useContext } from 'react'
import { AuthContext } from 'context'
import { CarMarker } from 'components'
import { UploadProfile, RegistrationForm } from './components'
import { Box, Flex, Icon, Text } from '@chakra-ui/react'

export const CreateAccount: React.FC = () => {
  const { state } = useContext(AuthContext)

  const renderStep = (type: string): ReactElement | '' => {
    switch (type) {
      case 'registrationForm': {
        return <RegistrationForm />
      }
      case 'uploadProfile': {
        return <UploadProfile />
      }
      default: {
        return ''
      }
    }
  }

  const description: { [key: string]: string } = {
    registrationForm:
      'Please provide an input to the given fields to create an admin account',
    UploadProfile: 'Please upload an image for your profile picture'
  }

  return (
    <Box maxWidth='1200px' height='100%' margin='0 auto' pt='3.25rem'>
      <Flex alignItems='center' gap='1rem'>
        <Icon as={CarMarker} width={125} height={162} />
        <Text fontSize='1.75rem' width='50rem' aria-label='sign-up-description'>
          {description[state.step]}
        </Text>
      </Flex>
      {renderStep(state.step)}
    </Box>
  )
}
