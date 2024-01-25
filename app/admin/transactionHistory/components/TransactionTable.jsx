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
  Button,
  Icon
} from '@chakra-ui/react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { updateSubscriptionField } from 'services/apis'
import { ViewIcon, Pagination, LazySpinner } from 'components'
import Swal from 'sweetalert2'
import formatFirebaseTimestamp from 'helpers/formatFirebaseTimestamp'
import { TransactionDetailsModal } from './transactionDetailsModal'

const columnHelper = createColumnHelper()

export const TransactionTable = ({
  users,
  loading,
  jumpPerPage,
  previousPage,
  nextPage,
  numbers,
  currentPage
}) => {
  const [sorting, setSorting] = useState([])
  const [filteredUsers, setFilteredUsers] = useState(users)
  const [isViewModal, setIsViewModal] = useState(false)
  const [targetId, setTargetId] = useState('')

  useEffect(() => {
    setFilteredUsers(users)
  }, [users])

  const handleId = (id) => {
    setIsViewModal((prev) => !prev)
    setTargetId(id)
  }

  const ViewBtn = ({ row }) => (
    <Icon
      as={ViewIcon}
      onClick={() => handleId(row.original.docId)}
      width='2.23438rem'
      height='1.40625rem'
      cursor='pointer'
    />
  )

  const columns = useMemo(
    () => [
      columnHelper.accessor('VehicleName', {
        header: 'VehicleName',
        cell: ({ row }) => (
          <Text>{row.original.vehicleDetails.vehicleName}</Text>
        ),
        sortDescFirst: true
      }),
      columnHelper.accessor('VehicleOwner', {
        header: 'VehicleOwner',
        cell: ({ row }) => <Text>{row.original.ownerName}</Text>,
        sortDescFirst: true
      }),
      columnHelper.accessor('VehicleRenter', {
        header: 'VehicleRenter',
        cell: ({ row }) => <Text>{row.original.rentee}</Text>,
        sortDescFirst: true
      }),
      columnHelper.accessor('Application Status', {
        header: 'Application Status',
        cell: ({ row }) => <Text>{row.original.status}</Text>,
        sortDescFirst: true
      }),
      columnHelper.accessor('Date of Application', {
        header: 'Date of Application',
        cell: ({ row }) => (
          <Text>{formatFirebaseTimestamp(row.original.dateCreated)}</Text>
        ),
        sortDescFirst: true
      }),
      columnHelper.accessor('View', {
        header: 'View',
        cell: ({ row }) => <ViewBtn row={row} />,
        sortDescFirst: true
      })
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

      <TransactionDetailsModal
        docId={targetId}
        isOpen={isViewModal}
        isClose={setIsViewModal}
      />
    </TableContainer>
  )
}
