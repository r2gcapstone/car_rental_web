import ModalContainer2 from 'components/Modals/ModalContainer2'
import { useState } from 'react'
import { useFetchAll2 } from 'lib'
import { useForm } from 'react-hook-form'
// import { VehicleDeclinedTable } from './VehicleDeclinedTable'
// import { SubscriptionHistoryTable } from './SubscriptionHistoryTable'
import { Button, Flex, Icon, Text, Box, Stack } from '@chakra-ui/react'
import { CarMarker, InputField, SearchIcon } from 'components'
import { AdminListTable } from './AdminListTable'

export const ListOfAdmins = ({ isOpen, setIsOpen }) => {
  const [updateTableKey, setUpdateTableKey] = useState(0)
  const {
    records,
    loading,
    nextPage,
    previousPage,
    jumpPerPage,
    currentPage,
    numbers
  } = useFetchAll2('adminUsers', '')

  const { handleSubmit, register, watch } = useForm()
  const [searchedData, setSearchedData] = useState()
  const watchForm = watch(['email'])

  const admins = records.map(
    ({ id, firstName, lastName, email, mobileNumber, address }) => ({
      id,
      firstName,
      lastName,
      email,
      mobileNumber,
      address
    })
  )

  const onSearch = (searchData) => {
    const { email } = searchData

    const isNotEmpty = watchForm.findIndex((find) => !!find) > -1

    const searchedValue = admins.filter((value) => {
      const lowercaseEmail =
        typeof value['email'] === 'string' ? value['email'].toLowerCase() : ''

      const matchEmail = email
        ? lowercaseEmail.includes(email.toLowerCase())
        : true

      return matchEmail
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
                List of Admins
              </Box>

              <InputField
                label='Email'
                placeholder='Enter admins email'
                {...register('email')}
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

        <AdminListTable
          key={setUpdateTableKey}
          numbers={numbers}
          admins={searchedData || admins}
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
