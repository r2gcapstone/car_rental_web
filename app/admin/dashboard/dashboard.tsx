import { TransactionDashboardIcon, UsersIcon, VehicleIcon } from 'components'
import { Box } from '@chakra-ui/react'
import { CardsTypes } from './helpers/constant'
import { useFetchAll } from 'lib'
import { AccountDataTypes } from 'helpers'
import { Barchart, Cards } from './components'

export const Dashboard: React.FC = () => {
  const { data } = useFetchAll<AccountDataTypes>('adminUsers')

  const cardsDetails: CardsTypes[] = [
    {
      title: 'Registered Users',
      total: data.length,
      icon: UsersIcon
    },
    {
      title: 'Vehicle Rented',
      total: 1095,
      icon: VehicleIcon
    },
    {
      title: 'Number of Transactions',
      total: 1905,
      icon: TransactionDashboardIcon
    },
    {
      title: 'Vehicles for rent',
      total: 1905,
      icon: VehicleIcon
    }
  ]

  return (
    <Box width='100%' mt='4' padding='2' paddingX='1rem'>
      <Barchart />
      <Cards details={cardsDetails} />
    </Box>
  )
}
