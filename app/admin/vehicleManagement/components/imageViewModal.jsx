import { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Image,
  Box,
  IconButton,
  ModalHeader
} from '@chakra-ui/react'

export const imageViewModal = ({ imageUrl, onOpen, onClose }) => {
  const handleOnclose = () => {
    onClose((prev) => !prev)
  }

  return (
    <Modal isCentered isOpen={onOpen} onClose={handleOnclose}>
      <ModalOverlay />
      <ModalContent padding={4} gap={2} bg={'blue.800'}>
        <ModalHeader>
          <ModalCloseButton color={'red'} />
        </ModalHeader>
        <IconButton
          aria-label='Close'
          onClick={handleOnclose}
          position='absolute'
          top={2}
          right={2}
        />
        <Image src={imageUrl} />
      </ModalContent>
    </Modal>
  )
}
