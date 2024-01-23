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
import { updateVehicleField } from 'services/apis'
import { Pagination, LazySpinner } from 'components'
import Swal from 'sweetalert2'
import { VehicleInfoModal } from './vehicleInfoModal'

const columnHelper = createColumnHelper()

export const VehicleTable = ({
  vehicles,
  loading,
  jumpPerPage,
  previousPage,
  nextPage,
  numbers,
  currentPage
}) => {
  const [sorting, setSorting] = useState([])
  const [filteredVehicles, setFilteredVehicles] = useState(vehicles)
  const [isModal1Open, setIsModal1Open] = useState(false)
  const [targetId, setTargetId] = useState('')

  useEffect(() => {
    setFilteredVehicles(vehicles)
  }, [vehicles])

  const handleId = (id) => {
    setIsModal1Open((prev) => !prev)
    setTargetId(id)
  }

  //columns
  const RegistrationAction = ({ row }) => (
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
  )

  const VehicleInfo = ({ row }) => (
    <Button
      size={'lg'}
      mr={2}
      onClick={() => handleId(row.original.carId)}
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
      // onClick={() => handleApprove(row.original.id, row.original.carId)}
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
      columnHelper.accessor('Vehicle Name', {
        header: 'Vehicle Name',
        cell: ({ row }) => <Text>{row.original.vehicleName}</Text>,
        sortDescFirst: true
      }),
      columnHelper.accessor('Owner', {
        header: 'Owner',
        cell: ({ row }) => <Text>{row.original.ownerName}</Text>,
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
      columnHelper.accessor('Action', {
        header: 'Registration Request Action',
        cell: ({ row }) => <RegistrationAction row={row} />,
        sortDescFirst: true
      })
      // Add other columns as needed...
    ],
    []
  )

  const table = useReactTable({
    data: filteredVehicles,
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
        text: 'This will approve the user’s vehicle Registration.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      })

      if (confirmed.isConfirmed) {
        await updateVehicleField('status', 'approved', docId, carId)
        setFilteredVehicles((prevUsers) =>
          prevUsers.filter((user) => user.id !== docId)
        )

        Swal.fire(
          'Approved!',
          'The vehicle is now approved and ready to rent.',
          'success'
        )
      } else {
        Swal.fire('Cancelled', 'Registration approval aborted.', 'error')
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
        text: 'This will reject the user’s vehicle registration.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        confirmButtonColor: '#dc3545'
      })

      if (confirmed.isConfirmed) {
        await updateVehicleField('status', 'declined', docId, carId)
        setFilteredVehicles((prevUsers) =>
          prevUsers.filter((user) => user.id !== docId)
        )

        Swal.fire(
          'Declined!',
          'The vehicle Registration is rejected and will not be applied to the vehicle.',
          'success'
        )
      } else {
        Swal.fire('Cancelled', 'Decline action aborted.', 'error')
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
      <VehicleInfoModal
        docId={targetId}
        isOpen={isModal1Open}
        isClose={setIsModal1Open}
      />
    </TableContainer>
  )
}
