import React, { useState, useMemo, useEffect } from 'react'
import {
  Box,
  TableContainer,
  Tr,
  Td,
  Th,
  Table,
  Tbody,
  Text,
  Thead,
  Flex,
  Center,
  Button
} from '@chakra-ui/react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { updateSubscriptionField } from 'services/apis'
import { Pagination, LazySpinner } from 'components'
import Swal from 'sweetalert2'

const columnHelper = createColumnHelper()

export const SubscriptionTable = ({
  users,
  loading,
  jumpPerPage,
  previousPage,
  nextPage,
  numbers,
  currentPage,
  key
}) => {
  const [sorting, setSorting] = useState([])
  const [filteredUsers, setFilteredUsers] = useState(users)

  useEffect(() => {
    setFilteredUsers(users)
  }, [users])

  const subscriptionTypeMap = {
    MONTHLY: '1 Month',
    '3 MONTHS': '3 Months',
    '6 MONTHS': '6 Months',
    '1 YEAR': '1 Year'
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor('Subscription', {
        header: 'Subscription',
        cell: ({ row }) => (
          <Text>
            {subscriptionTypeMap[row.original.subscriptionType] ||
              row.original.subscriptionType}
          </Text>
        ),
        sortDescFirst: true
      }),
      columnHelper.accessor('Buyer', {
        header: 'Buyer',
        cell: ({ row }) => <Text>{row.original.userName}</Text>,
        sortDescFirst: true
      }),
      columnHelper.accessor('Vehicle', {
        header: 'Vehicle',
        cell: ({ row }) => <Text>{row.original.vehicleName}</Text>,
        sortDescFirst: true
      }),
      columnHelper.accessor('Mobile Number', {
        header: 'Mobile Number',
        cell: ({ row }) => <Text>{row.original.walletNumber}</Text>,
        sortDescFirst: true
      }),
      columnHelper.accessor('Decision', {
        header: 'Subscription Request Action',
        cell: ({ row }) => (
          <Flex>
            <Button
              size={'lg'}
              mr={2}
              onClick={() => handleApprove(row.original.id, row.original.carId)}
              backgroundColor='blue'
              opacity={0.8}
              transition='0.2s'
              _hover={{
                backgroundColor: 'blue',
                opacity: 1,
                transform: 'scale(1.05)'
              }}
            >
              Approve
            </Button>
            <Button
              size={'lg'}
              onClick={() => handleDecline(row.original.id, row.original.carId)}
              backgroundColor='red'
              opacity={0.8}
              transition='0.2s'
              _hover={{
                backgroundColor: 'red',
                opacity: 1,
                transform: 'scale(1.05)'
              }}
            >
              Decline
            </Button>
          </Flex>
        ),
        sortDescFirst: true
      })
      // Add other columns as needed...
    ],
    []
  )

  const table = useReactTable({
    data: filteredUsers,
    columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  const handleApprove = async (docId, carId) => {
    try {
      // Display SweetAlert2 modal for approval confirmation
      const confirmed = await Swal.fire({
        title: 'Are you sure?',
        text: 'This will approve the user’s subscription.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      })

      if (confirmed.isConfirmed) {
        await updateSubscriptionField('status', 'approved', docId, carId)
        setFilteredUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== docId)
        )

        Swal.fire(
          'Approved!',
          'The subscription is now applied to the vehicle.',
          'success'
        )
      } else {
        Swal.fire('Cancelled', 'Subscription approval was cancelled.', 'error')
      }
    } catch (error) {
      // Handle error
    }
  }

  const handleDecline = async (docId, carId) => {
    try {
      // Display SweetAlert2 modal for decline confirmation
      const confirmed = await Swal.fire({
        title: 'Are you sure?',
        text: 'This will reject the user’s subscription purchase.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        confirmButtonColor: '#dc3545'
      })

      if (confirmed.isConfirmed) {
        await updateSubscriptionField('status', 'declined', docId, carId)
        setFilteredUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== docId)
        )

        Swal.fire(
          'Declined!',
          'The subscription is rejected and will not be applied to the vehicle.',
          'success'
        )
      } else {
        Swal.fire('Cancelled', 'Subscription rejection was cancelled.', 'error')
      }
    } catch (error) {
      // Handle error
    }
  }

  if (loading) {
    return (
      <Center mt='2rem'>
        <LazySpinner />
      </Center>
    )
  }

  return (
    <TableContainer mb='10' mt='4' px='6'>
      <Table variant='unstyled' aria-label='account-table'>
        <Thead>
          {table.getHeaderGroups().map((headerGrp) => (
            <Tr key={headerGrp.id}>
              {headerGrp.headers.map((header, index) => (
                <Th
                  key={header.id}
                  color='white'
                  borderBottom='1px solid white'
                  pl={index === 0 ? '4' : '2'}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <Flex alignItems='center' gap='2'>
                    <Box>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Box>
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr
              key={row.id}
              aria-label='account-row'
              borderBottom='1px solid white'
            >
              {row.getVisibleCells().map((cell, index) => (
                <Td py='1rem' px='0' key={cell.id} height='auto'>
                  <Box
                    {...(index === 0 && { ml: '4' })}
                    {...(index !== 0 && { ml: '2' })}
                  >
                    <>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </>
                  </Box>
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Pagination
        numbers={numbers}
        nextPage={nextPage}
        previousPage={previousPage}
        jumpPerPage={jumpPerPage}
        totalPage={numbers.length}
        currentPage={currentPage}
      />
    </TableContainer>
  )
}
