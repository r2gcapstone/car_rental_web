import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Flex,
  ModalCloseButton,
  Image,
  Center
} from '@chakra-ui/react'
import { useState } from 'react'

export function ReceiptImg({ img, isOpen, isClose }) {
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

          <Flex gap={2}>
            <ModalBody flex={2} color={'white'}>
              <Center>
                {img && (
                  <Image alignSelf={'center'} borderRadius={4} src={img} />
                )}
              </Center>
            </ModalBody>
          </Flex>

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
