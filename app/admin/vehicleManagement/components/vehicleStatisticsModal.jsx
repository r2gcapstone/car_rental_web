import { shallow } from 'zustand/shallow'
import { Center, Text } from '@chakra-ui/react'
import { useStatisticsModal } from 'services/zustandVariables'
import { statisticsMenu } from '../helpers/constant'
import { useSubManagementActions } from 'lib'
import ModalContainer2 from 'components/Modals/ModalContainer2'
import { useState } from 'react'
import StatRegisteredModal from './vehicleRegisteredModal'

export const SubscriptionStatisticsModal = () => {
  const { menu, isOpen } = useStatisticsModal(
    (state) => ({ ...state }),
    shallow
  )
  const { isCloseStatistics } = useSubManagementActions()
  const isOpenStatisticsModal = menu === 'statistics' && isOpen
  const [isModal, setIsModal] = useState(false)
  const [option, setOption] = useState({})

  const totalModal = (key, content) => {
    setOption({ key: key, title: content })
    setIsModal((prev) => !prev)
  }

  return (
    <>
      <ModalContainer2
        title='Subscription Totals / Statistics'
        isOpen={isOpenStatisticsModal}
        onClose={isCloseStatistics}
      >
        {statisticsMenu.map(({ key, content }) => (
          <Center
            key={key}
            borderTop='1px solid white'
            padding='1rem'
            cursor='pointer'
            _hover={{
              background: 'blue.slitedark'
            }}
            onClick={() => totalModal(key, content)}
          >
            <Text>{content}</Text>
          </Center>
        ))}
      </ModalContainer2>

      {isModal && (
        <StatRegisteredModal
          option={option}
          isOpen={isModal}
          setIsOpen={setIsModal}
        />
      )}
    </>
  )
}
