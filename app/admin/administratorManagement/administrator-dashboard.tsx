import { useState } from 'react'
import { Button, Flex, Icon, Text, Box, Stack } from '@chakra-ui/react'
import {
  AccountTable,
  RegisteredUserModal,
  AddNewUserModal,
  AccountDetailsModal
} from './components'
import { useForm } from 'react-hook-form'
import { InfoIcon, InputField, PlusIcon, SearchIcon } from 'components'
import { useFetchAll, useAccountManagementActions } from 'lib'
import { AccountDataTypes } from 'helpers'

interface SearchTypes {
  email: string
  fullName: string
  mobileNumber: string
}

interface SearchedAccountTypes {
  dateCreated: string
  email: string
  fullName: string
  address: string
  mobileNumber: string
}

const AdministratorDashboard: React.FC = () => {
  const {
    records,
    loading,
    nextPage,
    previousPage,
    jumpPerPage,
    currentPage,
    numbers
  } = useFetchAll<AccountDataTypes>('adminUsers')
  const { isOpenStatistics, triggerNewUserModal } =
    useAccountManagementActions()

  const [searchedData, setSearchedData] = useState<
    SearchedAccountTypes[] | null
  >(null)

  const { handleSubmit, register, watch } = useForm<SearchTypes>()

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
    }) => ({
      id,
      dateCreated: dateCreated,
      email,
      fullName: `${firstName} ${lastName}`,
      address,
      mobileNumber: mobileNumber || 'N/A',
      imageUrl,
      deactivatedAt
    })
  )

  const onSearch = (searchData: SearchTypes): void => {
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
              Find an Adminstrator
            </Text>
          </Flex>
        </Flex>

        <Stack as='form' onSubmit={handleSubmit(onSearch)} mt='1rem'>
          <Flex gap='2' alignItems='center'>
            <InputField
              label='Admin Email Address'
              placeholder='Enter email'
              {...register('email')}
            />
            <InputField
              label='Admin Full name'
              placeholder='Enter fulllname'
              {...register('fullName')}
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
            <InputField
              hidden={true}
              label=''
              placeholder='Enter fulllname'
              {...register('fullName')}
            />
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
      <RegisteredUserModal />
      <AddNewUserModal />
    </Box>
  )
}

export default AdministratorDashboard
