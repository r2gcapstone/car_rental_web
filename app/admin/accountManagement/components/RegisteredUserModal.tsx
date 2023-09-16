import {
  useAccountManagementActions,
  useFetchStatistcs,
  useFetchAll
} from 'lib'
import { useStatisticsModal } from 'services/zustandVariables'
import { shallow } from 'zustand/shallow'
import { Flex, Text, Button } from '@chakra-ui/react'
import { ModalContainer } from 'components'
import { AccountDataTypes } from 'helpers'
import { timeAndDate } from 'helpers'
import {
  findHighestRegisteredDate,
  findHighestRegisteredPerMonth
} from 'helpers'
import { ReactElement } from 'react'

interface ShowAllTypes {
  isOpen: boolean
  isClose: () => void
  todayCount: number
  highestPerDay: number
  highestCountMonths: number[]
  allUsersCount: number
  dateTime: string
}

const ShowAll: React.FC<ShowAllTypes> = ({
  isOpen,
  isClose,
  highestPerDay,
  todayCount,
  highestCountMonths,
  allUsersCount,
  dateTime
}) => {
  const registeredStatisticsObject = [
    {
      content: 'Number of New Registered Users:',
      total: todayCount
    },
    {
      content: 'Average Number of New Registered Users (Per Day):',
      total: highestPerDay
    },
    {
      content: 'Average Number of New Registered Users (Monthly):',
      total: highestCountMonths
    },
    {
      content: 'Total Registered Users (All-Time):',
      total: allUsersCount
    }
  ]

  return (
    <ModalContainer
      title='Statistics of registered user'
      isOpen={!!isOpen}
      onClose={isClose}
      showIcon={true}
      modalWidth='lg'
    >
      <Flex
        paddingX='1.5rem'
        paddingBottom='2rem'
        flexDirection='column'
        gap='1rem'
      >
        <Text fontSize='1.375rem'>{dateTime}</Text>
        {registeredStatisticsObject.map(({ content, total }) => (
          <Flex
            key={content}
            alignItems='center'
            justifyContent='space-between'
          >
            <Text fontSize='1rem'>{content}</Text>
            <Text fontWeight='bold'>{total}</Text>
          </Flex>
        ))}
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

export const RegisteredUserModal: React.FC = () => {
  const { menu, isOpen: openModal } = useStatisticsModal(
    (state) => ({ ...state }),
    shallow
  )

  const collectionName = 'adminUsers'

  const { dateTime, dateOnly } = timeAndDate()
  const { perDay } = useFetchStatistcs(collectionName, dateOnly)
  const { data } = useFetchAll<AccountDataTypes[]>(collectionName)

  const allUsers = data as AccountDataTypes[]

  const { highestCount } = findHighestRegisteredDate(allUsers)
  const { highestCountMonths } = findHighestRegisteredPerMonth(allUsers)

  const { isCloseStatistics } = useAccountManagementActions()

  const menuTypes = [
    'all',
    'today',
    'per-day',
    'monthly',
    'all-time',
    'show-all'
  ]

  const isOpen = menuTypes.includes(menu || '') && openModal

  const registeredStatisticsMenu: { [key: string]: string | ReactElement } = {
    today: `Number of New Registered Users: ${perDay.length}`,
    'per-day': `Average Number of New Registered Users (Per Day): ${highestCount}`,
    monthly: `Average Number of New Registered Users (Monthly): ${Object.values(
      highestCountMonths
    )}`,
    'all-time': `Total Registered Users (All-Time): ${allUsers.length}`,
    'show-all': (
      <ShowAll
        dateTime={dateTime}
        isOpen={!!isOpen}
        isClose={isCloseStatistics}
        todayCount={perDay.length}
        highestPerDay={highestCount}
        highestCountMonths={Object.values(highestCountMonths)}
        allUsersCount={allUsers.length}
      />
    )
  }

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
        <Text fontSize='1.375rem'>{dateTime}</Text>
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
