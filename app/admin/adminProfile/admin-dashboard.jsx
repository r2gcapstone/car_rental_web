import { Flex, Box, Image, Text, Button } from '@chakra-ui/react'
import { getUserData } from 'services/apis/account/users'
import { useEffect, useState } from 'react'
export const AdminProfile = () => {
  const [userData, setUserData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    mobileNumber: '',
    imageUrl: '',
    dateCreated: ''
  })

  const fetchData = async () => {
    try {
      const result = await getUserData()
      setUserData(result)
    } catch (error) {
      console.error
    }
  }

  const userDetails = [
    {
      title: 'Full Name',
      content: userData.firstName + ' ' + userData.lastName
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

  useEffect(() => {
    fetchData()
  }, [])

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
            <Text fontSize='0.75rem'>Administrator</Text>
          </Flex>
          <Box border='1px solid white' height='300px' />
          <Flex flex='3' flexDirection='column' fontSize='1.375rem'>
            <Text
              arial-label='title'
              color='white'
              fontSize='2.1875rem'
              fontWeight='bold'
            >
              Personal Information
            </Text>
            {userDetails &&
              userDetails.map(({ title, content }) => (
                <Flex
                  key={title}
                  width={'80%'}
                  justifyContent={'space-between'}
                  gap='0.5rem'
                  mt='0.5rem'
                >
                  <Text fontWeight={'bold'} color='white'>
                    {' '}
                    {title}:
                  </Text>
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
