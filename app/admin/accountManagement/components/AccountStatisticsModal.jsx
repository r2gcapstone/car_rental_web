import { ModalContainer } from 'components'
import { shallow } from 'zustand/shallow'
import { Center, Text } from '@chakra-ui/react'
import { useStatisticsModal } from 'services/zustandVariables'
import { statisticsMenu } from '../helpers/constant'
import { useAccountManagementActions } from 'lib'

export const AccountStatisticsModal = () => {
  const { menu, isOpen } = useStatisticsModal(
    (state) => ({ ...state }),
    shallow
  )
  const { isCloseStatistics, isOpenStatistics } = useAccountManagementActions()

  const isOpenStatisticsModal = menu === 'statistics' && isOpen

  return (
    <ModalContainer
      title='Registered user statistics'
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
          onClick={() => isOpenStatistics(key)}
        >
          <Text>{content}</Text>
        </Center>
      ))}
    </ModalContainer>
  )
}
