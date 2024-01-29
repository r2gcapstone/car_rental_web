import { Flex, Box, Image, Text, Button } from '@chakra-ui/react'
import ModalContainer2 from 'components/Modals/ModalContainer2'
import { colors } from 'theme/colors'
import { updateUserFeild } from 'services/apis/account/users'
import { useState, useEffect } from 'react'

const AccountDetailsModal = ({ data, isOpen, setIsOpen, refetchData }) => {
  const [userDetails, setUserDetails] = useState([])

  useEffect(() => {
    try {
      const { fullName, address, email, mobileNumber } = data

      setUserDetails([
        { title: 'Full Name', content: fullName },
        { title: 'Address', content: address },
        { title: 'Email', content: email },
        { title: 'Mobile Number', content: mobileNumber }
      ])
    } catch (error) {}
  }, [data])

  const handleOnClick = async (userId) => {
    try {
      const result = await updateUserFeild(
        'deactivatedAt',
        data.deactivatedAt ? '' : new Date(),
        userId
      )
      if (!result.error) {
        refetchData()
        onClose()
      }
    } catch (error) {
      refetchData()
    }
  }

  const onClose = () => {
    setIsOpen(false)
  }

  return (
    <ModalContainer2
      isOpen={isOpen}
      onClose={onClose}
      title=''
      modalWidth='5xl'
    >
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
              src={(data && data.imageUrl) || '/image/avatar.jpg'}
              width={250}
              height={250}
              objectFit='cover'
              alt='user avatar'
              aria-label='user-avatar'
              rounded='full'
            />
            <Text fontSize='1.375rem'>{data?.email}</Text>
            <Text fontSize='0.75rem'>Account Created: {data?.dateCreated}</Text>
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
            {userDetails.map(({ title, content }) => (
              <Flex key={title} gap='0.5rem' mt='0.5rem'>
                <Text color='orange.primary'>{title}:</Text>
                <Text>{content}</Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
        <Button
          type='button'
          bg={data?.deactivatedAt ? 'green.0' : 'red'}
          width='100%'
          fontSize='1.2rem'
          mt='2rem'
          onClick={() => handleOnClick(data.id)}
        >
          {data?.deactivatedAt ? 'Activate account' : 'Deactivate Account'}
        </Button>
      </Box>
    </ModalContainer2>
  )
}

export default AccountDetailsModal
