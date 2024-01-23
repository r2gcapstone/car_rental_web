import React, { useState } from 'react'
import { Button, Flex, Icon, Text, Box, Stack } from '@chakra-ui/react'
import { InfoIcon, InputField, SearchIcon } from 'components'
import { VehicleTable } from './components'
import { useFetchAll2 } from 'lib'
import { useForm } from 'react-hook-form'
import { TransactionHistoryModal } from './components'

export const VehicleDashboard = () => {
  const {
    records,
    loading,
    nextPage,
    previousPage,
    jumpPerPage,
    currentPage,
    numbers
  } = useFetchAll2('cars', 'pending')

  const { handleSubmit, register, watch } = useForm()
  const [searchedData, setSearchedData] = useState()
  const [setUpdateTableKey] = useState(0)
  const watchForm = watch(['vehicleName', 'ownerName'])

  const [isSubHistoryOpen, setIsSubHistoryOpen] = useState(false)

  const vehicles = records
    .filter((user) => user.status === 'pending')
    .map(
      ({
        id,
        carId,
        vehicleDetails: { vehicleName },
        ownerNumber,
        ownerName
      }) => ({
        id,
        carId,
        vehicleName,
        ownerNumber,
        ownerName
      })
    )

  const onSearch = (searchData) => {
    const { vehicleName, ownerName } = searchData

    const isNotEmpty = watchForm.findIndex((find) => !!find) > -1

    const searchedValue = vehicles.filter((value) => {
      const lowercaseVehicleName =
        typeof value['vehicleName'] === 'string'
          ? value['vehicleName'].toLowerCase()
          : value['vehicleName']
      const lowercaseOwnerName =
        typeof value['ownerName'] === 'string'
          ? value['ownerName'].toLowerCase()
          : value['ownerName']

      return (
        lowercaseVehicleName ===
          (vehicleName ? vehicleName.toLowerCase() : '') ||
        lowercaseOwnerName === (ownerName ? ownerName.toLowerCase() : '')
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
              Find Vehicle
            </Text>
          </Flex>
          <Flex gap={2}>
            <Button
              background='blue.500'
              fontSize='1.25rem'
              padding='1rem'
              height='10px'
              fontWeight='normal'
              // onClick={() => isOpenStatistics('statistics')}
            >
              Registered Vehicle
            </Button>
            <Button
              background='blue.dark'
              fontSize='1.25rem'
              padding='1rem'
              height='10px'
              fontWeight='normal'
              // onClick={() => setIsSubHistoryOpen(true)}
            >
              Past Declined Vehicle
            </Button>
          </Flex>
        </Flex>

        <Stack as='form' onSubmit={handleSubmit(onSearch)} mt='1rem'>
          {/* <Stack as='form' mt='1rem'> */}
          <Flex gap='2' alignItems='center'>
            <InputField
              label='Vehicle'
              placeholder='Enter Vehicles Name'
              {...register('vehicleName')}
            />
            <InputField
              label='Owner'
              placeholder='Enter Owners Name'
              {...register('ownerName')}
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
            <InputField hidden={true} label='' placeholder='' />
          </Flex>
        </Stack>
      </Flex>
      <VehicleTable
        key={setUpdateTableKey}
        numbers={numbers}
        vehicles={searchedData || vehicles}
        loading={loading}
        nextPage={nextPage}
        previousPage={previousPage}
        jumpPerPage={jumpPerPage}
        currentPage={currentPage}
      />

      {/* Account Modals */}
      <TransactionHistoryModal
        isOpen={isSubHistoryOpen}
        setIsOpen={setIsSubHistoryOpen}
      />
    </Box>
  )
}
