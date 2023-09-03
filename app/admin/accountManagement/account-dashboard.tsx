import { Button, Flex, Icon, Text, Box } from '@chakra-ui/react'
import { AccountTable } from './components'
import { InfoIcon, InputField, PlusIcon, SearchIcon } from 'components'
import { useFetchAll } from 'lib'
import { formatDateCreated } from 'helpers'
import Link from 'next/link'

interface AccountDataTypes {
  dateCreated: {
    seconds: number
    nanoseconds: number
  }
  email: string
  firstName: string
  lastName: string
  address: string
  mobileNumber: string
}

export const AccountDashboard: React.FC = () => {
  const { data, loading } = useFetchAll('adminUsers')

  const accountTypes = data as AccountDataTypes[]

  const users = accountTypes.map(
    ({ dateCreated, email, firstName, lastName, address, mobileNumber }) => ({
      dateCreated: formatDateCreated(dateCreated.seconds) || 'N/A',
      email,
      fullName: `${firstName} ${lastName}`,
      address,
      mobileNumber: mobileNumber || 'N/A'
    })
  )

  return (
    <Box width='100%'>
      <Flex
        flexDirection='column'
        height='220px'
        paddingX='2rem'
        background='blue.slitedark'
        justifyContent='center'
      >
        <Flex alignItems='center' justifyContent='space-between'>
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
            <Link href='/sign-up'>
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
            </Link>
          </Flex>
        </Flex>

        <Flex mt='1rem' gap='2' alignItems='center'>
          <InputField label='Email' placeholder='Enter email' />
          <InputField label='Full name' placeholder='Enter fulllname' />
          <InputField label='Mobile Number' placeholder='Mobile number' />
          <Button
            mt='2.5rem'
            background='blue.dark'
            fontSize='1.25rem'
            padding='1.2rem'
            height='10px'
            width='30rem'
            fontWeight='normal'
            gap='2'
          >
            <Icon as={SearchIcon} width='1.5rem' height='1.5rem' />
            Search
          </Button>
        </Flex>
      </Flex>
      <AccountTable users={users} loading={loading} />
    </Box>
  )
}
