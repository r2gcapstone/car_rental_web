import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Flex,
  ModalCloseButton,
  Text,
  Button,
  Box,
  Image,
  Center
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { ImagePreviewer } from './ImagePreview'
import { ImageModal } from './ImageViewModal'
import { getUserData } from 'services/apis/account/users'

export function UserInfoModal({ docId, isOpen, isClose }) {
  const [data, setData] = useState({})
  const [onOpen, setOnOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  let appenedAddress = []

  try {
    appenedAddress = [
      data.address.street,
      data.address.subdivision,
      data.address.barangay.name,
      data.address.municipality.name,
      data.address.province.name
    ]
      .filter(Boolean)
      .join(', ')
  } catch (error) {}

  const dataArray = [
    { key: 0, label: 'Name', value: data.firstName + ' ' + data.lastName },
    { key: 1, label: 'Email', value: data.email },
    { key: 2, label: 'Mobile Number', value: data.mobileNumber },
    { key: 3, label: 'Address', value: appenedAddress }
  ]

  const fetchData = async (docId) => {
    try {
      const result = await getUserData(docId)
      if (!result.error) {
        setData(result)
      }
    } catch (error) {
      alert(error)
    }
  }

  const handleOnclose = () => {
    isClose((prev) => !prev)
  }

  useEffect(() => {
    if (isOpen) {
      fetchData(docId)
    }
  }, [docId, isOpen])
  return (
    <>
      <Modal size={'3xl'} isCentered isOpen={isOpen} onClose={handleOnclose}>
        <ModalOverlay />
        <ModalContent
          justifyContent={'center'}
          padding={4}
          gap={2}
          bg={'blue.800'}
        >
          <ModalHeader>
            <ModalCloseButton color={'red'} />
          </ModalHeader>

          <Flex gap={2}>
            <ModalBody flex={2} color={'white'}>
              <Center>
                {data.imageUrl && (
                  <Image
                    alignSelf={'center'}
                    w={200}
                    h={200}
                    borderRadius={'full'}
                    src={data.imageUrl}
                  />
                )}
              </Center>
              <Text style={styles.header} marginTop={4}>
                Date of Registration
              </Text>
              <Text textAlign={'center'}>11/24/2023</Text>
            </ModalBody>
            <ModalBody
              borderRadius={10}
              bg={'#526D82'}
              color={'white'}
              height={220}
              flex={3}
            >
              <Text style={styles.header}>Vehicle Owner</Text>
              {dataArray.map((item) => (
                <Flex
                  gap={'40%'}
                  justifyContent={'space-between'}
                  key={item.key}
                >
                  <Text whiteSpace={'nowrap'} fontWeight={'bold'}>
                    {item.label} :
                  </Text>
                  <Text>{item.value}</Text>
                </Flex>
              ))}
            </ModalBody>
          </Flex>

          {/* <ModalFooter></ModalFooter> */}
        </ModalContent>
      </Modal>
      <ImageModal imageUrl={imageUrl} onOpen={onOpen} onClose={setOnOpen} />
    </>
  )
}

const styles = {
  header: {
    textAlign: 'center',
    width: 'full',
    color: 'white',
    paddingBottom: 2,
    marginBottom: 3,
    fontSize: 18,
    fontWeight: 'bold'
  }
}
