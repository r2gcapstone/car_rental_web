import React, { useState } from 'react'
import { Button, Flex, Icon, Text, Box, Stack } from '@chakra-ui/react'
// import { useForm } from 'react-hook-form'
import { InfoIcon, InputField, SearchIcon } from 'components'
import { TransactionTable } from './components'
import { useFetchAll } from 'lib'
import { useForm } from 'react-hook-form'
import {
  SubscriptionStatisticsModal,
  TransactionHistoryModal
} from './components'
import { useSubManagementActions } from 'lib'

export const TransactionDashboard = () => {
  const {
    records,
    loading,
    nextPage,
    previousPage,
    jumpPerPage,
    currentPage,
    numbers
  } = useFetchAll('rentals')

  const { handleSubmit, register, watch } = useForm()
  const [searchedData, setSearchedData] = useState()
  const [setUpdateTableKey] = useState(0)
  const watchForm = watch(['vehicleName', 'ownerName', 'status'])

  const { isOpenStatistics } = useSubManagementActions()

  const [isSubHistoryOpen, setIsSubHistoryOpen] = useState(false)

  const subscription = records.map(
    ({
      carId,
      subscriptionType,
      vehicleDetails,
      vehicleDetails: { vehicleName },
      ownerNumber,
      ownerName,
      status,
      pickupLocation,
      dropoffLocation,
      dateTime,
      rentDuration,
      totalPayment,
      priceRate,
      ownerId,
      paymentMethod,
      outsideRate,
      rentee,
      dateCreated,
      docId,
      imageUrl
    }) => ({
      carId,
      subscriptionType,
      vehicleName,
      vehicleDetails,
      ownerNumber,
      ownerName,
      status,
      pickupLocation,
      dropoffLocation,
      dateTime,
      rentDuration,
      totalPayment,
      priceRate,
      ownerId,
      paymentMethod,
      outsideRate,
      rentee,
      dateCreated,
      docId,
      imageUrl
    })
  )

  const onSearch = (searchData) => {
    const { vehicleName, ownerName, status } = searchData

    const isNotEmpty = watchForm.findIndex((find) => !!find) > -1

    const searchedValue = subscription.filter((value) => {
      const lowercaseVehicleName =
        typeof value['vehicleName'] === 'string'
          ? value['vehicleName'].toLowerCase()
          : value['vehicleName']
      const lowercaseOwnerName =
        typeof value['ownerName'] === 'string'
          ? value['ownerName'].toLowerCase()
          : value['ownerName']
      const searchStatus =
        typeof value['status'] === 'string'
          ? value['status']
          : value['status'].toString()

      return (
        lowercaseVehicleName ===
          (vehicleName ? vehicleName.toLowerCase() : '') ||
        lowercaseOwnerName === (ownerName ? ownerName.toLowerCase() : '') ||
        searchStatus === (status ? status : status.toString())
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
              Find a Transaction
            </Text>
          </Flex>
        </Flex>

        <Stack as='form' onSubmit={handleSubmit(onSearch)} mt='1rem'>
          {/* <Stack as='form' mt='1rem'> */}
          <Flex gap='2' alignItems='center'>
            <InputField
              label='Vehicle Name'
              placeholder='Enter Vehicle'
              {...register('vehicleName')}
            />
            <InputField
              label='Owner Name'
              placeholder='Enter Vehicle ownerName'
              {...register('ownerName')}
            />
            <InputField
              label='Status'
              placeholder='Enter Application Status'
              {...register('status')}
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
      <TransactionTable
        key={setUpdateTableKey}
        numbers={numbers}
        users={searchedData || subscription}
        loading={loading}
        nextPage={nextPage}
        previousPage={previousPage}
        jumpPerPage={jumpPerPage}
        currentPage={currentPage}
      />
    </Box>
  )
}
