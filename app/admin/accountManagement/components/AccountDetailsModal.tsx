import {
  useDeactivateAccount,
  initialDataState
} from 'services/zustandVariables'
import { useAccountManagementActions } from 'lib'
import { Flex, Box, Image, Text, Button } from '@chakra-ui/react'
import { ModalContainer } from 'components'
import { shallow } from 'zustand/shallow'

export const AccountDetailsModal: React.FC = () => {
  const {
    isOpen,
    data: { fullName, address, email, mobileNumber, imageUrl, dateCreated }
  } = useDeactivateAccount((state) => ({ ...state }), shallow)
  const { triggerDeactivateModal } = useAccountManagementActions()

  const userDetails = [
    {
      title: 'Full Name',
      content: fullName
    },
    {
      title: 'Address',
      content: address
    },
    {
      title: 'Email',
      content: email
    },
    {
      title: 'Mobile Number',
      content: mobileNumber
    }
  ]

  return (
    <ModalContainer
      title='Account Information'
      isOpen={isOpen}
      onClose={() => triggerDeactivateModal(false, initialDataState)}
      background='blue.slitedark'
      modalWidth='3xl'
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
              src={imageUrl || '/image/avatar.jpg'}
              width={250}
              height={250}
              objectFit='cover'
              alt='user avatar'
              aria-label='user-avatar'
              rounded='full'
            />
            <Text fontSize='1.375rem'>{email}</Text>
            <Text fontSize='0.75rem'>Account Created: {dateCreated}</Text>
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
        <Button bg='red' width='100%' fontSize='1.2rem' mt='2rem'>
          Deactivate Account
        </Button>
      </Box>
    </ModalContainer>
  )
}
