import { useAccountManagementActions } from 'lib'
import { useStatisticsModal } from 'services/zustandVariables'
import { shallow } from 'zustand/shallow'
import { Flex, Text, Button } from '@chakra-ui/react'
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

  const isOpen = menuTypes.includes(menu || '') && openModal

  return (
    <ModalContainer
      title='Statistics of registered user'
      isOpen={!!isOpen}
      onClose={isCloseStatistics}
      showIcon={true}
      modalWidth='sm'
    >
      <Flex
        paddingX='1.5rem'
        paddingBottom='2rem'
        flexDirection='column'
        gap='1rem'
      >
        <Text fontSize='1.375rem'>As of 07:30 AM June 09, 203</Text>
        <Text>{registeredStatisticsMenu[menu || '']}</Text>
        <Button
          mt='2rem'
          type='button'
          background='red'
          width='100%'
          fontSize='1rem'
        >
          Download PDF
        </Button>
      </Flex>
    </ModalContainer>
  )
}
