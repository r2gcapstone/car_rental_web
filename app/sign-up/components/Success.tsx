import { Flex, Icon, Text, Button } from '@chakra-ui/react'
import { useGetRegistration, initialState } from 'services/zustandVariables'
import { useRouter } from 'next/router'
import { CarMarker } from 'components'

export const Success: React.FC = () => {
  const router = useRouter()
  const updateRegistration = useGetRegistration(
    (state) => state.updateRegistration
  )

  const navigateToLogin = (): void => {
    router.push('/sign-in')
    updateRegistration({ ...initialState })
  }

  return (
    <Flex
      mt='5rem'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
    >
      <Icon as={CarMarker} width={300} height={300} />
      <Text
        mt='4'
        fontSize='1.8125rem'
        width={400}
        textAlign='center'
        aria-label='success-title'
      >
        You have now an account to R2G’s Administration
      </Text>
      <Button
        mt='4'
        variant='primary'
        fontSize='1rem'
        width={300}
        onClick={navigateToLogin}
      >
        Login
      </Button>
    </Flex>
  )
}
