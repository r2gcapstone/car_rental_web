import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Text
} from '@chakra-ui/react'
import { getVehicleData } from 'services/apis'
import { useEffect, useState } from 'react'

export function MessageModal({ docId, isOpen, isClose }) {
  const [data, setData] = useState({})

  const fetchData = async (docId) => {
    try {
      const result = await getVehicleData(docId)
      if (!result.error) {
        setData(result)
      }
    } catch (error) {
      alert(error)
    }
  }

  const MessageComponent = () => (
    <>
      {data.adminMessage
        ? data.adminMessage.split('\n').map((line, index) => (
            <Text whiteSpace={'break-spaces'} key={index}>
              {`\n`}
              {line}
            </Text>
          ))
        : ''}
    </>
  )

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

          <ModalBody
            marginTop={4}
            rounded={'2xl'}
            bg={'#526D82'}
            flex={2}
            color={'white'}
          >
            <MessageComponent />
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
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
