import { Flex, Icon, Text, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { CarMarker } from 'components'

export const Success: React.FC = () => {
  const router = useRouter()

  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
      height='100%'
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
        onClick={() => router.push('/sign-in')}
      >
        Login
      </Button>
    </Flex>
  )
}
