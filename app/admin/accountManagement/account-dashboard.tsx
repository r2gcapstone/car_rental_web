import { Button, Flex, Icon, Text } from '@chakra-ui/react'
import { InfoIcon, PlusIcon, SearchIcon } from 'components'

export const AccountDashboard: React.FC = () => (
  <Flex
    alignItems='center'
    justifyContent='space-between'
    width='100%'
    height='100px'
    paddingX='2rem'
    background='blue.slitedark'
  >
    <Flex alignItems='center' gap={4}>
      <Icon as={SearchIcon} width='2.125rem' height='2.25rem' />
      <Text fontWeight='bold' fontSize='2rem'>
        Find User
      </Text>
      <Icon as={InfoIcon} width='1.875rem' height='1.875rem' />
    </Flex>
    <Flex gap={2}>
      <Button
        background='blue.dark'
        fontSize='1.25rem'
        padding='1rem'
        height='10px'
        fontWeight='normal'
      >
        Statistics of Registered Users
      </Button>
      <Button
        background='blue.dark'
        fontSize='1.25rem'
        padding='1rem'
        height='10px'
        fontWeight='normal'
      >
        Add user
        <Icon as={PlusIcon} width='1.5rem' height='1.5rem' ml='2' />
      </Button>
    </Flex>
  </Flex>
)
