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
import { Pagination, LazySpinner } from 'components'
import { VehicleInfoModal } from './PaymentInfoModal'
import { UserInfoModal } from './ReceiptImg'

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
  const [sorting, setSorting] = useState([])
  const [filteredSubscription, setFilteredSubscription] =
    useState(subscriptions)
  const [isModal1Open, setIsModal1Open] = useState(false)
  const [isModal2Open, setIsModal2Open] = useState(false)
  const [targetId, setTargetId] = useState('')

  useEffect(() => {
    setFilteredSubscription(subscriptions)
  }, [subscriptions])

  const uniqueDocIds = new Set()

  const handleId = (key, id) => {
    if (key === 'vehicle') {
      setIsModal1Open((prev) => !prev)
    } else if (key === 'user') {
      setIsModal2Open((prev) => !prev)
    }

    setTargetId(id)
  }

  const subscriptionTypeMap = {
    MONTHLY: '1 Month',
    '3 MONTHS': '3 Months',
    '6 MONTHS': '6 Months',
    '1 YEAR': '1 Year'
  }

  //components
  const VehicleInfo = ({ row }) => (
    <Button
      size={'lg'}
      mr={2}
      onClick={() => handleId('vehicle', row.original.carId)}
      backgroundColor='blue.700'
      opacity={0.8}
      transition='0.2s'
      _hover={{
        backgroundColor: 'blue.400',
        opacity: 1,
        transform: 'scale(1.05)'
      }}
    >
      View Vehicle's Info
    </Button>
  )

  const OwnerInfo = ({ row }) => (
    <Button
      size={'lg'}
      mr={2}
      onClick={() => handleId('user', row.original.userId)}
      backgroundColor='blue.700'
      opacity={0.8}
      transition='0.2s'
      _hover={{
        backgroundColor: 'blue.400',
        opacity: 1,
        transform: 'scale(1.05)'
      }}
    >
      View Owner's Info
    </Button>
  )

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
      columnHelper.accessor('Vehicle Name', {
        header: 'Vehicle Name',
        cell: ({ row }) => <Text>{row.original.vehicleName}</Text>,
        sortDescFirst: true
      }),
      columnHelper.accessor('Owner', {
        header: 'Owner',
        cell: ({ row }) => <Text>{row.original.userName}</Text>,
        sortDescFirst: true
      }),
      columnHelper.accessor('Vehicle Info', {
        header: 'Vehicle Info',
        cell: ({ row }) => <VehicleInfo row={row} />,
        sortDescFirst: true
      }),
      columnHelper.accessor('Owner Info', {
        header: 'Owner Info',
        cell: ({ row }) => <OwnerInfo row={row} />,
        sortDescFirst: true
      }),
      columnHelper.accessor('Status', {
        header: 'Status',
        cell: ({ row }) => (
          <Text
            fontWeight={'bold'}
            color={
              row.original.status === 'approved'
                ? 'blue'
                : row.original.status === 'declined'
                ? 'red'
                : 'white'
            }
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
          {table.getRowModel().rows.map((row) => {
            if (uniqueDocIds.has(row.original.docId)) {
              return null
            }
            uniqueDocIds.add(row.original.docId)

            return (
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
            )
          })}
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

      <VehicleInfoModal
        docId={targetId}
        isOpen={isModal1Open}
        isClose={setIsModal1Open}
      />

      <UserInfoModal
        docId={targetId}
        isOpen={isModal2Open}
        isClose={setIsModal2Open}
      />
    </TableContainer>
  )
}
