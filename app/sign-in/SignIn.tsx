import { Flex, Icon, Stack, Button, Box } from '@chakra-ui/react'
import { CarMarker } from '@/components'

export const SignIn = () => (
  <Flex aria-label='sign-in' maxWidth='1600px' height='100%' margin='0 auto'>
    <Box flex='1' bg='blue' alignItems='center' justifyContent='center'>
      <Icon as={CarMarker} width={204} height={268} />
    </Box>
    <Stack as='form' flex='1' bg='red'>
      <Button variant='primary' fontSize='1rem'>
        Login
      </Button>
    </Stack>
  </Flex>
)
