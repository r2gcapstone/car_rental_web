import { useAccountManagementActions } from 'lib'
import { useStatisticsModal } from 'services/zustandVariables'
import { shallow } from 'zustand/shallow'
import { Center, Text } from '@chakra-ui/react'
import { ModalContainer } from 'components'

export const RegisteredUserModal: React.FC = () => {
  const { menu, isOpen: openModal } = useStatisticsModal(
    (state) => ({ ...state }),
    shallow
  )

  const { isCloseStatistics } = useAccountManagementActions()

  const registeredStatisticsMenu: { [key: string]: string } = {
    today: 'Number of New Registered Users: 224',
    'per-day': 'Average Number of New Registered Users (Per Day): 210',
    monthly: 'Average Number of New Registered Users (Monthly): 210',
    'all-time': 'Total Registered Users (All-Time): 10,294',
    'show-all': 'show all'
  }

  const menuTypes = [
    'all',
    'today',
    'per-day',
    'monthly',
    'all-time',
    'show-all'
  ]

  const isOpen = menuTypes.includes(menu) && openModal

  return (
    <ModalContainer
      title='Statistics of registered user'
      isOpen={!!isOpen}
      onClose={isCloseStatistics}
    >
      <Center
        borderTop='1px solid white'
        padding='1rem'
        cursor='pointer'
        _hover={{
          background: 'blue.slitedark'
        }}
      >
        <Text>{registeredStatisticsMenu[menu || '']}</Text>
      </Center>
    </ModalContainer>
  )
}
