import ModalContainer2 from 'components/Modals/ModalContainer2'
import { useState } from 'react'
import { useFetchAll } from 'lib'
import { useForm } from 'react-hook-form'
import { VehicleDeclinedTable } from './VehicleDeclinedTable'
// import { SubscriptionHistoryTable } from './SubscriptionHistoryTable'
import { Button, Flex, Icon, Text, Box, Stack } from '@chakra-ui/react'
import { CarMarker, InputField, SearchIcon } from 'components'

export const DeclinedVehicleModal = ({ isOpen, setIsOpen }) => {
  const [updateTableKey, setUpdateTableKey] = useState(0)
  const {
    records,
    loading,
    nextPage,
    previousPage,
    jumpPerPage,
    currentPage,
    numbers
  } = useFetchAll('cars')

  const { handleSubmit, register, watch } = useForm()
  const [searchedData, setSearchedData] = useState()
  const watchForm = watch(['ownerName', 'vehicleName'])

  const vehicles = records
    .filter((vehicle) => vehicle.status === 'declined')
    .map(
      ({
        id,
        carId,
        vehicleDetails: { vehicleName },
        ownerNumber,
        ownerName,
        userId
      }) => ({
        id,
        carId,
        vehicleName,
        ownerNumber,
        ownerName,
        userId
      })
    )

  const onSearch = (searchData) => {
    const { vehicleName, ownerName } = searchData

    const isNotEmpty = watchForm.findIndex((find) => !!find) > -1

    const searchedValue = vehicles.filter((value) => {
      const lowercaseownerName =
        typeof value['ownerName'] === 'string'
          ? value['ownerName'].toLowerCase()
          : ''
      const lowercaseVehicleName =
        typeof value['vehicleName'] === 'string'
          ? value['vehicleName'].toLowerCase()
          : ''

      const matchownerName = ownerName
        ? lowercaseownerName.includes(ownerName.toLowerCase())
        : true

      const matchVehicleName = vehicleName
        ? lowercaseVehicleName.includes(vehicleName.toLowerCase())
        : true

      return matchownerName && matchVehicleName
    })

    if (isNotEmpty) {
      setSearchedData(searchedValue)
      return
    }

    setSearchedData(searchedValue)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  return (
    <ModalContainer2
      isOpen={isOpen}
      onClose={onClose}
      title=''
      modalWidth='5xl'
    >
      <Box width='100%'>
        <Flex
          flexDirection='column'
          height='180px'
          paddingX='2rem'
          background='blue.dark'
          justifyContent='center'
        >
          <Stack as='form' onSubmit={handleSubmit(onSearch)} mt='1rem'>
            <Flex gap='2' alignItems='center'>
              <Icon as={CarMarker} width='7rem' height='7rem' />
              <Box
                color={'white'}
                fontSize='2.5rem'
                fontWeight={'bold'}
                marginRight={'3rem'}
              >
                Declined Vehicles
              </Box>

              <InputField
                label='Vehicle Owner'
                placeholder='Enter owners name'
                {...register('ownerName')}
              />
              <InputField
                label='Vehicle Name'
                placeholder='Enter vehicle name'
                {...register('vehicleName')}
              />
              <Button
                type='submit'
                mt='2.5rem'
                background='blue.slitedark'
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

        <VehicleDeclinedTable
          key={setUpdateTableKey}
          numbers={numbers}
          vehicles={searchedData || vehicles}
          loading={loading}
          nextPage={nextPage}
          previousPage={previousPage}
          jumpPerPage={jumpPerPage}
          currentPage={currentPage}
        />
      </Box>
    </ModalContainer2>
  )
}
