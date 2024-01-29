import ModalContainer2 from 'components/Modals/ModalContainer2'
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  ModalFooter,
  ModalBody,
  Center
} from '@chakra-ui/react'
import { useState } from 'react'
import swal from 'sweetalert2'
import { updateUserPassword } from 'services/apis/account/users'

export const ChangePassModal = ({ isOpen, setIsOpen }) => {
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'password') {
      setPassword(value)
    } else if (name === 'newPassword') {
      setNewPassword(value)
    } else if (name === 'repeatPassword') {
      setRepeatPassword(value)
    }
  }

  const onSaveChanges = async () => {
    try {
      // Add validation for matching new and repeated passwords
      if (newPassword !== repeatPassword) {
        throw new Error("New password and repeated password don't match")
      }

      // Call your updatePassword function
      const result = await updateUserPassword(newPassword)

      if (!result.error) {
        swal.fire({
          title: 'Success',
          text: 'Password successfully updated!',
          icon: 'success'
        })
      }
    } catch (error) {
      swal.fire({
        title: 'Error',
        text: error.message || 'An error occurred',
        icon: 'error'
      })
    }

    onClose()
  }

  const onClose = () => {
    setIsOpen(false)
  }

  return (
    <ModalContainer2
      isOpen={isOpen}
      onClose={onClose}
      title=''
      modalWidth='3xl'
    >
      <Box width='100%'>
        <Flex
          flexDirection='column'
          paddingX='2rem'
          background='blue.dark'
          justifyContent='center'
          gap={1}
        >
          <ModalBody>
            <Center gap={4} flexDirection={'column'}>
              {/* Additional UI components can be added here */}
            </Center>
          </ModalBody>

          <Text color='white'>New Password:</Text>
          <Input
            bg={'white'}
            style={styles.text}
            type='password'
            name='newPassword'
            value={newPassword}
            onChange={handleInputChange}
            placeholder='New Password'
          />
          <Text color='white'>Repeat Password:</Text>
          <Input
            bg={'white'}
            style={styles.text}
            type='password'
            name='repeatPassword'
            value={repeatPassword}
            onChange={handleInputChange}
            placeholder='Repeat Password'
          />
          <Button
            fontSize={20}
            mt={4}
            colorScheme='blue'
            onClick={onSaveChanges}
          >
            Change Password
          </Button>
          <ModalFooter />
        </Flex>
      </Box>
    </ModalContainer2>
  )
}

const styles = {
  text: {
    color: 'black',
    bg: 'white'
  }
}
