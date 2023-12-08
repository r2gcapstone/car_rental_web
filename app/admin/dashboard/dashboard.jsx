import { TransactionDashboardIcon, UsersIcon, VehicleIcon } from 'components'
import { Box } from '@chakra-ui/react'
import { useFetchAll } from 'lib'
import { Barchart, Cards } from './components'
import { useFetchAll2 } from 'lib'

export const Dashboard = () => {
  //query all count for
  const totalUserCount = useFetchAll('users')?.data?.length
  const totalRentedCars = useFetchAll('rentals')?.data?.length
  const totalSubCount = useFetchAll2('subscription', 'approved')?.data?.length
  const totalSubCount2 = useFetchAll2('subscription', 'finisihed')?.data?.length
  const totalRentCount = useFetchAll2('rentals', 'finished')?.data?.length
  const totalCarCount = useFetchAll('cars')?.data?.length

  const cardsDetails = [
    {
      title: 'Registered Users',
      total: totalUserCount,
      icon: UsersIcon
    },
    {
      title: 'Vehicle Rented',
      total: totalRentedCars,
      icon: VehicleIcon
    },
    {
      title: 'Number of Transactions',
      total: totalSubCount + totalSubCount2 + totalRentCount,
      icon: TransactionDashboardIcon
    },
    {
      title: 'Vehicles for rent',
      total: totalCarCount,
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
