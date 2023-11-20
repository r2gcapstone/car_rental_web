import React, { useState, useMemo } from 'react'
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
  Center
} from '@chakra-ui/react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useAccountManagementActions } from 'lib'
import { LazySpinner, Pagination } from 'components'
import { Button } from '@chakra-ui/react'

const columnHelper = createColumnHelper()

export const SubscriptionTable = ({
  users,
  loading,
  jumpPerPage,
  previousPage,
  nextPage,
  numbers,
  currentPage
}) => {
  const [sorting, setSorting] = useState([])

  const { triggerDeactivateModal } = useAccountManagementActions()

  const columns = useMemo(
    () => [
      columnHelper.accessor('Subscription', {
        header: 'Subscription',
        cell: ({ row }) => <Text>{row.original.subscriptionType}</Text>,
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
              onClick={() => handleApprove(row.original.carId)}
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
              onClick={() => handleDecline(row.original.carId)}
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
    [triggerDeactivateModal]
  )

  const table = useReactTable({
    data: users,
    columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  if (loading) {
    return (
      <Center mt='2rem'>
        <LazySpinner />
      </Center>
    )
  }

  const handleApprove = (userId) => {
    // Logic to handle approving subscription for the user with userId
    console.log(`Approved subscription for user ${userId}`)
  }

  const handleDecline = (userId) => {
    // Logic to handle declining subscription for the user with userId
    console.log(`Declined subscription for user ${userId}`)
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
