import ModalContainer2 from 'components/Modals/ModalContainer2'
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  ModalFooter,
  ModalBody,
  Image,
  Center
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { updateUserData } from 'services/apis/account/users'
import swal from 'sweetalert2'

export const EditAdminProfileModal = ({
  isOpen,
  setIsOpen,
  adminData,
  selectedImage,
  setSelectedImage
}) => {
  const [editableData, setEditableData] = useState({})

  useEffect(() => {
    setEditableData(adminData)
  }, [adminData])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditableData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setSelectedImage(file)
    setEditableData((prev) => ({
      ...prev,
      imageUrl: file
    }))
  }

  const onSaveChanges = async (docId) => {
    try {
      const result = await updateUserData(editableData, docId)

      if (!result.error) {
        swal.fire({
          title: 'Success',
          text: 'successfully Updated!',
          icon: 'success'
        })
      }
    } catch (error) {}
    onClose()
  }

  const onClose = () => {
    setIsOpen((prev) => !prev)
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
              <Image
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : editableData.imageUrl
                    ? editableData.imageUrl
                    : '/image/avatar.jpg'
                }
                width={300}
                height={300}
                objectFit='cover'
                alt='user avatar'
                aria-label='user-avatar'
                rounded='full'
              />
              <label htmlFor='imageInput'>
                <Button fontSize={20} as='span' colorScheme='blue'>
                  Replace Avatar
                </Button>
                <Input
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  mt={4}
                  display='none'
                  id='imageInput'
                />
              </label>
            </Center>
          </ModalBody>
          <Text color='white'>{`Name:`}</Text>
          <Flex color={'white'} gap={2}>
            <Input
              bg={'white'}
              style={styles.text}
              type='text'
              name='firstName'
              value={editableData.firstName || ''}
              onChange={handleInputChange}
              placeholder='First Name'
            />
            <Input
              bg={'white'}
              style={styles.text}
              type='text'
              name='lastName'
              value={editableData.lastName || ''}
              onChange={handleInputChange}
              placeholder='Last Name'
            />
          </Flex>
          <Text color='white'>{`Address:`}</Text>
          <Input
            bg={'white'}
            style={styles.text}
            type='text'
            name='address'
            value={editableData.address || ''}
            onChange={handleInputChange}
            placeholder='Address'
          />
          <Text color='white'>{`Email:`}</Text>
          <Input
            bg={'white'}
            type='email'
            name='email'
            style={styles.text}
            value={editableData.email || ''}
            onChange={handleInputChange}
            placeholder='Email'
          />
          <Text color='white'>{`Mobile Number:`}</Text>
          <Input
            bg={'white'}
            style={styles.text}
            type='text'
            name='mobileNumber'
            value={editableData.mobileNumber || ''}
            onChange={handleInputChange}
            placeholder='Mobile Number'
          />
          <Button
            fontSize={20}
            mt={4}
            colorScheme='blue'
            onClick={() => onSaveChanges(adminData.id)}
          >
            Save Changes
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
