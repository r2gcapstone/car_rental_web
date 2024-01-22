import { useState } from 'react'
import { Button, Flex, Icon, Text, Box, Stack } from '@chakra-ui/react'
import {
  AccountTable,
  AccountStatisticsModal,
  RegisteredUserModal,
  AddNewUserModal
} from './components'
import { useForm } from 'react-hook-form'
import { InfoIcon, InputField, PlusIcon, SearchIcon } from 'components'
import { useFetchAll, useAccountManagementActions } from 'lib'
import { AccountDetailsModal } from './components'
import formatFirebaseTimestamp from 'helpers/formatFirebaseTimestamp'

export const AccountDashboard = () => {
  const {
    records,
    loading,
    nextPage,
    previousPage,
    jumpPerPage,
    currentPage,
    numbers
  } = useFetchAll('users')
  const { isOpenStatistics, triggerNewUserModal } =
    useAccountManagementActions()

  const [searchedData, setSearchedData] = useState(null)

  const { handleSubmit, register, watch } = useForm()

  const watchForm = watch(['email', 'fullName', 'mobileNumber'])

  const users = records.map(
    ({
      id,
      dateCreated,
      email,
      firstName,
      lastName,
      address,
      mobileNumber,
      imageUrl,
      deactivatedAt
    }) => {
      const a = { ...address }
      const concatenatedAddress = [
        a.street,
        a.barangay.name,
        a.municipality.name,
        a.subdivision,
        a.province.name,
        a.country
      ]
        .filter(Boolean)
        .join(', ')

      return {
        id,
        dateCreated: formatFirebaseTimestamp(dateCreated),
        email,
        fullName: `${firstName} ${lastName}`,
        address: concatenatedAddress,
        mobileNumber: mobileNumber || 'N/A',
        imageUrl,
        deactivatedAt: deactivatedAt
      }
    }
  )

  const onSearch = (searchData) => {
    const { email, fullName, mobileNumber } = searchData

    const isNotEmpty = watchForm.findIndex((find) => !!find) > -1

    const searchedValue = users.filter(
      (value) =>
        value['email'] === email ||
        value['fullName'] === fullName ||
        value['mobileNumber'] === mobileNumber
    )

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
              Find User
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
              Statistics of Registered Users
            </Button>
            <Button
              background='blue.dark'
              fontSize='1.25rem'
              padding='1rem'
              height='10px'
              fontWeight='normal'
              onClick={() => triggerNewUserModal(true)}
            >
              Add user
              <Icon as={PlusIcon} width='1.5rem' height='1.5rem' ml='2' />
            </Button>
          </Flex>
        </Flex>

        <Stack as='form' onSubmit={handleSubmit(onSearch)} mt='1rem'>
          <Flex gap='2' alignItems='center'>
            <InputField
              label='Email'
              placeholder='Enter email'
              {...register('email')}
            />
            <InputField
              label='Full name'
              placeholder='Enter fulllname'
              {...register('fullName')}
            />
            <InputField
              label='Mobile Number'
              placeholder='Mobile number'
              {...register('mobileNumber')}
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
      <AccountTable
        numbers={numbers}
        users={searchedData || users}
        loading={loading}
        nextPage={nextPage}
        previousPage={previousPage}
        jumpPerPage={jumpPerPage}
        currentPage={currentPage}
      />

      {/* Account Modals */}
      <AccountDetailsModal />
      <AccountStatisticsModal />
      <RegisteredUserModal />
      <AddNewUserModal />
    </Box>
  )
}
