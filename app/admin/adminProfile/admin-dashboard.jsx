import { useState } from 'react'
import { Flex, Box, Image, Text, Button } from '@chakra-ui/react'

export const AdminProfile = () => {
  const [userData, setUserData] = useState({
    id: '',
    fullName: '',
    address: '',
    email: '',
    mobileNumber: '',
    imageUrl: '',
    dateCreated: ''
  })

  const userDetails = [
    {
      title: 'Full Name',
      content: userData.fullName
    },
    {
      title: 'Address',
      content: userData.address
    },
    {
      title: 'Email',
      content: userData.email
    },
    {
      title: 'Mobile Number',
      content: userData.mobileNumber
    }
  ]

  return (
    <Box title='Account Information' background='dark.brown' width={'100%'}>
      <Box padding='1rem'>
        <Flex alignItems='center' gap='1rem'>
          <Flex
            flex='2'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
            gap='0.125rem'
          >
            <Image
              src={userData.imageUrl || '/image/avatar.jpg'}
              width={250}
              height={250}
              objectFit='cover'
              alt='user avatar'
              aria-label='user-avatar'
              rounded='full'
            />
            <Text fontSize='1.375rem'>{userData.email}</Text>
            <Text fontSize='0.75rem'>
              Account Created: {userData.dateCreated}
            </Text>
          </Flex>
          <Box border='1px solid white' height='300px' />
          <Flex flex='3' flexDirection='column' fontSize='1.375rem'>
            <Text
              arial-label='title'
              color='orange.primary'
              fontSize='2.1875rem'
              fontWeight='bold'
            >
              More Information
            </Text>
            {userDetails &&
              userDetails.map(({ title, content }) => (
                <Flex key={title} gap='0.5rem' mt='0.5rem'>
                  <Text color='orange.primary'>{title}:</Text>
                  <Text>{content}</Text>
                </Flex>
              ))}
          </Flex>
        </Flex>
        <Flex flexDirection={'column'} gap={4} marginTop={10}>
          <Button
            fontSize={'2xl'}
            fontWeight={'normal'}
            background={'#0DA800'}
            borderRadius={'md'}
          >
            Edit Personal Information
          </Button>
          <Button
            fontSize={'2xl'}
            fontWeight={'normal'}
            background={'#CF0202'}
            borderRadius={'md'}
          >
            Change Password
          </Button>
          <Button
            fontSize={'2xl'}
            fontWeight={'normal'}
            background={'#526D82'}
            borderRadius={'md'}
          >
            List of Admin
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}

export default AdminProfile
