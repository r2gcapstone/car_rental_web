import {
  useAccountManagementActions,
  useFetchStatistcs,
  useFetchAll
} from 'lib'
import { useStatisticsModal } from 'services/zustandVariables'
import { shallow } from 'zustand/shallow'
import { Flex, Text } from '@chakra-ui/react'
import { ModalContainer, PDFDocument } from 'components'
import { PDFDownloadLink, StyleSheet } from '@react-pdf/renderer'
import { AccountDataTypes, timeAndDate } from 'helpers'
import {
  findHighestRegisteredDate,
  findHighestRegisteredPerMonth
} from 'helpers'
import { ReactElement } from 'react'

interface StatistcsObjectTypes {
  content: string
  value: number[] | number
}

interface ShowAllTypes {
  isOpen: boolean
  isClose: () => void
  registeredStatisticsObject: StatistcsObjectTypes[]
  PDFData: StatistcsObjectTypes[]
  dateTime: string
}

const style = StyleSheet.create({
  button: {
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'red',
    width: '100%',
    padding: '0.5rem',
    borderRadius: '0.5rem'
  }
})

const ShowAll: React.FC<ShowAllTypes> = ({
  isOpen,
  isClose,
  registeredStatisticsObject,
  dateTime,
  PDFData
}) => (
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
      {registeredStatisticsObject.map(({ content, value }) => (
        <Flex key={content} alignItems='center' justifyContent='space-between'>
          <Text fontSize='1rem'>{content}</Text>
          <Text fontWeight='bold'>{value}</Text>
        </Flex>
      ))}
      <PDFDownloadLink
        document={<PDFDocument data={PDFData} />}
        fileName='download.pdf'
        style={style.button}
      >
        Download PDF
      </PDFDownloadLink>
    </Flex>
  </ModalContainer>
)

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

  const todayCount = perDay.length
  const highestPerDay = highestCount
  const highestCountMonthsNum = Object.values(highestCountMonths)
  const allUsersCounts = allUsers.length

  const registeredStatisticsObject: {
    [key: string]: StatistcsObjectTypes[]
  } = {
    today: [
      {
        content: 'Number of New Registered Users:',
        value: todayCount
      }
    ],
    'per-day': [
      {
        content: 'Average Number of New Registered Users (Per Day):',
        value: highestPerDay
      }
    ],
    monthly: [
      {
        content: 'Average Number of New Registered Users (Monthly):',
        value: highestCountMonthsNum
      }
    ],
    'all-time': [
      {
        content: 'Average Number of New Registered Users (Monthly):',
        value: highestCountMonthsNum
      }
    ],
    'show-all': [
      {
        content: 'Number of New Registered Users:',
        value: todayCount
      },
      {
        content: 'Average Number of New Registered Users (Per Day):',
        value: highestPerDay
      },
      {
        content: 'Average Number of New Registered Users (Monthly):',
        value: highestCountMonthsNum
      },
      {
        content: 'Total Registered Users (All-Time):',
        value: allUsersCounts
      }
    ]
  }

  const showAllStatistics = [
    {
      content: 'Number of New Registered Users:',
      value: todayCount
    },
    {
      content: 'Average Number of New Registered Users (Per Day):',
      value: highestPerDay
    },
    {
      content: 'Average Number of New Registered Users (Monthly):',
      value: highestCountMonthsNum
    },
    {
      content: 'Total Registered Users (All-Time):',
      value: allUsersCounts
    }
  ]

  const registeredStatisticsMenu: { [key: string]: string | ReactElement } = {
    today: `Number of New Registered Users: ${todayCount}`,
    'per-day': `Average Number of New Registered Users (Per Day): ${highestPerDay}`,
    monthly: `Average Number of New Registered Users (Monthly): ${highestCountMonthsNum}`,
    'all-time': `Total Registered Users (All-Time): ${allUsersCounts}`,
    'show-all': (
      <ShowAll
        dateTime={dateTime}
        isOpen={!!isOpen}
        isClose={isCloseStatistics}
        registeredStatisticsObject={showAllStatistics}
        PDFData={registeredStatisticsObject[menu as string]}
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
        <PDFDownloadLink
          document={
            <PDFDocument data={registeredStatisticsObject[menu || '']} />
          }
          fileName='download.pdf'
          style={style.button}
        >
          Download PDF
        </PDFDownloadLink>
      </Flex>
    </ModalContainer>
  )
}
