import {
  useDeactivateAccount,
  initialDataState
} from 'services/zustandVariables'
import { useAccountManagementActions, useAccount } from 'lib'
import { Flex, Box, Image, Text, Button } from '@chakra-ui/react'
import { ModalContainer } from 'components'
import { shallow } from 'zustand/shallow'
import { colors } from 'theme/colors'
import swal from 'sweetalert2'

export const AccountDetailsModal = () => {
  const {
    isOpen,
    data: {
      id,
      fullName,
      address,
      email,
      mobileNumber,
      imageUrl,
      dateCreated,
      deactivatedAt
    }
  } = useDeactivateAccount((state) => ({ ...state }), shallow)
  const { triggerDeactivateModal } = useAccountManagementActions()
  const { changeAccountStatus } = useAccount()

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

  const isStatusChange = async (isDeactivate, message) => {
    triggerDeactivateModal(false, initialDataState)
    const { isConfirmed, isDenied } = await swal.fire({
      title: 'Are you sure?',
      text: message,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      confirmButtonColor: colors.red[0],
      denyButtonColor: colors.blue.dark,
      icon: 'question'
    })

    if (isConfirmed) {
      changeAccountStatus(id, isDeactivate)
      return
    }

    if (isDenied) {
      swal.fire('Changes are not saved', '', 'info')
    }
  }

  const onDeactivateAccount = () => {
    isStatusChange(true, 'The user will not be able to access this account.')
  }

  const onActivateAccount = () => {
    isStatusChange(false, 'The user will be able to access this account again.')
  }

  const isCheckDeactivate = deactivatedAt !== ''

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
        <Button
          type='button'
          bg={isCheckDeactivate ? 'green.0' : 'red'}
          width='100%'
          fontSize='1.2rem'
          mt='2rem'
          onClick={isCheckDeactivate ? onActivateAccount : onDeactivateAccount}
        >
          {isCheckDeactivate ? 'Activate account' : 'Deactivate Account'}
        </Button>
      </Box>
    </ModalContainer>
  )
}
