import ModalContainer2 from 'components/Modals/ModalContainer2'
import { useState } from 'react'
import { Center, Text } from '@chakra-ui/react'

export const TransactionHistoryModal = (bool) => {
  const [isOpen, isClose] = useState(false)

  return (
    <ModalContainer2
      title='Subscription History'
      isOpen={isOpen}
      onClose={isClose}
    ></ModalContainer2>
  )
}
