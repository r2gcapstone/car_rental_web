import React, { useState } from 'react'
import { Button, Flex, Icon, Text, Box, Stack } from '@chakra-ui/react'
// import { useForm } from 'react-hook-form'
import { InfoIcon, InputField, SearchIcon } from 'components'
import { SubscriptionTable } from './components'
import { useFetchAll } from 'lib'
import { useForm } from 'react-hook-form'

export const SubscriptionDashboard = () => {
  const {
    records,
    loading,
    nextPage,
    previousPage,
    jumpPerPage,
    currentPage,
    numbers
  } = useFetchAll('subscription')
  const { handleSubmit, register, watch } = useForm()

  const [searchedData, setSearchedData] = useState()

  const watchForm = watch(['vehicleName', 'userName', 'walletNumber'])

  console.log(records)

  const subscription = records.map(
    ({ carId, subscriptionType, vehicleName, walletNumber, userName }) => ({
      carId,
      subscriptionType,
      vehicleName,
      walletNumber,
      userName
    })
  )

  const onSearch = (searchData) => {
    const { vehicleName, userName, walletNumber } = searchData

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
      const searchWalletNumber =
        typeof value['walletNumber'] === 'string'
          ? value['walletNumber']
          : value['walletNumber'].toString()

      return (
        lowercaseVehicleName ===
          (vehicleName ? vehicleName.toLowerCase() : '') ||
        lowercaseUserName === (userName ? userName.toLowerCase() : '') ||
        searchWalletNumber ===
          (walletNumber ? walletNumber : walletNumber.toString())
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
              // onClick={() => isOpenStatistics('statistics')}
            >
              Statistics of Subscription
            </Button>
            <Button
              background='blue.dark'
              fontSize='1.25rem'
              padding='1rem'
              height='10px'
              fontWeight='normal'
              // onClick={() => triggerNewUserModal(true)}
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
              {...register('walletNumber')}
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
        numbers={numbers}
        users={searchedData || subscription}
        loading={loading}
        nextPage={nextPage}
        previousPage={previousPage}
        jumpPerPage={jumpPerPage}
        currentPage={currentPage}
      />

      {/* Account Modals */}
      {/* <AccountDetailsModal />
      <AccountStatisticsModal />
      <RegisteredUserModal />
      <AddNewUserModal /> */}
    </Box>
  )
}
