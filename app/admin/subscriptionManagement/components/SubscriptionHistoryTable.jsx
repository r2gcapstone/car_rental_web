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
  Center
} from '@chakra-ui/react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { Pagination, LazySpinner } from 'components'
import formatFirebaseTimestamp from 'helpers/formatFirebaseTimestamp'

const columnHelper = createColumnHelper()

export const SubscriptionHistoryTable = ({
  subscriptions,
  loading,
  jumpPerPage,
  previousPage,
  nextPage,
  numbers,
  currentPage
}) => {
  console.log(subscriptions)
  const [sorting, setSorting] = useState([])
  const [filteredSubscription, setFilteredSubscription] =
    useState(subscriptions)

  useEffect(() => {
    setFilteredSubscription(subscriptions)
  }, [subscriptions])

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
        cell: ({ row }) => <Text>{row.original.vehicleOwner}</Text>,
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
      columnHelper.accessor('Purchase Date', {
        header: 'Purchase Date',
        cell: ({ row }) => (
          <Text>{formatFirebaseTimestamp(row.original.dateCreated)}</Text>
        ),
        sortDescFirst: true
      }),
      columnHelper.accessor('Status', {
        header: 'Status',
        cell: ({ row }) => (
          <Text
            fontWeight={'bold'}
            color={row.original.status === 'approved' ? 'blue' : 'red'}
          >
            {row.original.status.toUpperCase()}
          </Text>
        ),
        sortDescFirst: true
      })
      // Add other columns as needed...
    ],
    []
  )

  const table = useReactTable({
    data: filteredSubscription,
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
