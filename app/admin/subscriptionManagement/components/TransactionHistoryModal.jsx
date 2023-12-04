import ModalContainer2 from 'components/Modals/ModalContainer2'
import { useState } from 'react'
import { useFetchAll } from 'lib'
import { useForm } from 'react-hook-form'
import { SubscriptionHistoryTable } from './SubscriptionHistoryTable'
import { Button, Flex, Icon, Text, Box, Stack } from '@chakra-ui/react'
import { CarMarker, InputField, SearchIcon } from 'components'

export const TransactionHistoryModal = ({ isOpen, setIsOpen }) => {
  const [updateTableKey, setUpdateTableKey] = useState(0)
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
  const watchForm = watch(['vehicleOwner', 'vehicleName'])

  const subscription = records
    .filter((user) => user.status === 'approved' || user.status === 'declined')
    .map(
      ({
        id,
        carId,
        subscriptionType,
        vehicleName,
        walletNumber,
        dateCreated,
        status,
        vehicleOwner
      }) => ({
        id,
        carId,
        subscriptionType,
        vehicleName,
        walletNumber,
        dateCreated,
        status,
        vehicleOwner
      })
    )

  const onSearch = (searchData) => {
    const { vehicleName, vehicleOwner } = searchData

    const searchedValue = subscription.filter((value) => {
      const lowercaseVehicleOwner =
        typeof value['vehicleOwner'] === 'string'
          ? value['vehicleOwner'].toLowerCase()
          : ''
      const lowercaseVehicleName =
        typeof value['vehicleName'] === 'string'
          ? value['vehicleName'].toLowerCase()
          : ''

      const matchVehicleOwner = vehicleOwner
        ? lowercaseVehicleOwner.includes(vehicleOwner.toLowerCase())
        : true

      const matchVehicleName = vehicleName
        ? lowercaseVehicleName.includes(vehicleName.toLowerCase())
        : true

      return matchVehicleOwner && matchVehicleName
    })

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
                Past Transaction
              </Box>

              <InputField
                label='Vehicle Owner'
                placeholder='Enter owners name'
                {...register('vehicleOwner')}
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
        <SubscriptionHistoryTable
          key={setUpdateTableKey}
          numbers={numbers}
          subscriptions={searchedData || subscription}
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
