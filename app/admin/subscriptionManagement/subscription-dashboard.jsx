import React, { useState } from 'react'
import { Button, Flex, Icon, Text, Box, Stack } from '@chakra-ui/react'
// import { useForm } from 'react-hook-form'
import { InfoIcon, InputField, SearchIcon } from 'components'
import { SubscriptionTable } from './components'
import { useFetchAll2 } from 'lib'
import { useForm } from 'react-hook-form'
import {
  SubscriptionStatisticsModal,
  TransactionHistoryModal
} from './components'
import { useSubManagementActions } from 'lib'

export const SubscriptionDashboard = () => {
  const {
    records,
    loading,
    nextPage,
    previousPage,
    jumpPerPage,
    currentPage,
    numbers
  } = useFetchAll2('subscription', 'pending')

  const { handleSubmit, register, watch } = useForm()
  const [searchedData, setSearchedData] = useState()
  const [setUpdateTableKey] = useState(0)
  const watchForm = watch(['vehicleName', 'userName', 'ownerNumber'])

  const { isOpenStatistics } = useSubManagementActions()

  const [isSubHistoryOpen, setIsSubHistoryOpen] = useState(false)

  const subscription = records
    .filter((user) => user.status === 'pending')
    .map(
      ({
        id,
        userId,
        carId,
        subscriptionType,
        vehicleName,
        ownerNumber,
        userName,
        dateCreated
      }) => ({
        id,
        userId,
        carId,
        subscriptionType,
        vehicleName,
        ownerNumber,
        userName,
        dateCreated
      })
    )

  const onSearch = (searchData) => {
    const { vehicleName, userName, ownerNumber } = searchData

    const isNotEmpty = watchForm.findIndex((find) => !!find) > -1

    const searchedValue = subscription.filter((value) => {
      const lowercaseVehicleName =
        typeof value['vehicleName'] === 'string'
          ? value['vehicleName'].toLowerCase()
          : value['vehicleName']
      const lowercaseUserName =
        typeof value['userName'] === 'string'
          ? value['userName'].toLowerCase()
          : value['userName']
      const searchownerNumber =
        typeof value['ownerNumber'] === 'string'
          ? value['ownerNumber']
          : value['ownerNumber'].toString()

      return (
        lowercaseVehicleName ===
          (vehicleName ? vehicleName.toLowerCase() : '') ||
        lowercaseUserName === (userName ? userName.toLowerCase() : '') ||
        searchownerNumber ===
          (ownerNumber ? ownerNumber : ownerNumber.toString())
      )
    })

    if (isNotEmpty) {
      setSearchedData(searchedValue)
      return
    }

    setSearchedData(null)
  }

  return (
    <Box width='100%'>
      <Flex
        flexDirection='column'
        height='220px'
        paddingX='2rem'
        background='blue.slitedark'
        justifyContent='center'
      >
        <Flex alignItems='center' justifyContent='space-between'>
          <Flex alignItems='center' gap={4}>
            <Icon as={SearchIcon} width='2.125rem' height='2.25rem' />
            <Text fontWeight='bold' fontSize='2rem'>
              Find Subscription Buyer
            </Text>
            <Icon as={InfoIcon} width='1.875rem' height='1.875rem' />
          </Flex>
          <Flex gap={2}>
            <Button
              background='blue.dark'
              fontSize='1.25rem'
              padding='1rem'
              height='10px'
              fontWeight='normal'
              onClick={() => isOpenStatistics('statistics')}
            >
              Statistics of Subscription
            </Button>
            <Button
              background='blue.dark'
              fontSize='1.25rem'
              padding='1rem'
              height='10px'
              fontWeight='normal'
              onClick={() => setIsSubHistoryOpen(true)}
            >
              View Past Transactions
            </Button>
          </Flex>
        </Flex>

        <Stack as='form' onSubmit={handleSubmit(onSearch)} mt='1rem'>
          {/* <Stack as='form' mt='1rem'> */}
          <Flex gap='2' alignItems='center'>
            <InputField
              label='Vehicle'
              placeholder='Enter Vehicle'
              {...register('vehicleName')}
            />
            <InputField
              label='Vehicle Owner'
              placeholder='Enter Vehicle Username'
              {...register('userName')}
            />
            <InputField
              label='Vehicle Class'
              placeholder='Enter Vehicle Class'
              {...register('ownerNumber')}
            />
            <Button
              type='submit'
              mt='2.5rem'
              background='blue.dark'
              fontSize='1.25rem'
              padding='1.2rem'
              height='10px'
              width='30rem'
              fontWeight='normal'
              gap='2'
            >
              <Icon as={SearchIcon} width='1.5rem' height='1.5rem' />
              Search
            </Button>
          </Flex>
        </Stack>
      </Flex>
      <SubscriptionTable
        key={setUpdateTableKey}
        numbers={numbers}
        users={searchedData || subscription}
        loading={loading}
        nextPage={nextPage}
        previousPage={previousPage}
        jumpPerPage={jumpPerPage}
        currentPage={currentPage}
      />

      <SubscriptionStatisticsModal />
      <TransactionHistoryModal
        isOpen={isSubHistoryOpen}
        setIsOpen={setIsSubHistoryOpen}
      />
    </Box>
  )
}
