import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Text,
  Button
} from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import { useState } from 'react'
import { rejectSubscriptionRequest } from 'services/apis'
import Swal from 'sweetalert2'

export function WriteMessageModal({ docId, isOpen, isClose, filter }) {
  const [value, setValue] = useState('')

  let handleInputChange = (e) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }

  const postMessage = async () => {
    try {
      const result = await rejectSubscriptionRequest(
        'adminMessage',
        value,
        docId
      )

      if (!result.error) {
        await rejectSubscriptionRequest('status', 'declined', docId)
        filter((prevVehicle) =>
          prevVehicle.filter((Vehicles) => Vehicles.id !== docId)
        )
        handleOnclose()
        Swal.fire(
          'Successfully Rejected!',
          'The vehicle subscription is declined!',
          'success'
        )
      }
    } catch (error) {}
  }

  const handleOnclose = () => {
    isClose((prev) => !prev)
  }

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
            <Textarea
              height={200}
              onChange={handleInputChange}
              placeholder='Write a message...'
            />
          </ModalBody>

          <Button
            bg={'red.500'}
            justifyContent={'center'}
            marginTop={4}
            w={'full'}
            onClick={() => postMessage()}
          >
            <Text fontSize={14}>Reject Vehicle Subsription Request</Text>
          </Button>

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
