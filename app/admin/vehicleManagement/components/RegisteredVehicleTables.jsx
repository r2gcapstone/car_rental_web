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
import { VehicleInfoModal } from './vehicleInfoModal'
import { UserInfoModal } from './userInfoModal'
import { updateVehicleField } from 'services/apis'

const columnHelper = createColumnHelper()

export const RegisteredVehicleTable = ({
  refetchData,
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
  const [isModal2Open, setIsModal2Open] = useState(false)
  const [targetId, setTargetId] = useState('')

  useEffect(() => {
    setFilteredVehicles(vehicles)
  }, [vehicles])

  const uniqueCarIds = new Set()

  const handleId = (key, id) => {
    if (key === 'vehicle') {
      setIsModal1Open((prev) => !prev)
    } else if (key === 'user') {
      setIsModal2Open((prev) => !prev)
    }

    setTargetId(id)
  }

  const handleArchiveBtn = async (row) => {
    try {
      const Archive = row.original.isHidden

      const result = await updateVehicleField(
        'isHidden',
        Archive ? false : true,
        row.original.carId
      )
      if (!result.error) {
        refetchData()
      }
    } catch (error) {}
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

  const ArchiveBtn = ({ row }) => (
    <Button
      size={'lg'}
      mr={2}
      onClick={() => handleArchiveBtn(row)}
      backgroundColor={row.original.isHidden ? 'red.500' : 'blue.500'}
      opacity={0.8}
      transition='0.2s'
      _hover={{
        backgroundColor: 'blue.400',
        opacity: 1,
        transform: 'scale(1.05)'
      }}
    >
      {row.original.isHidden ? 'Unarchive' : 'Archive'}
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
      columnHelper.accessor('Status', {
        header: 'Status',
        cell: ({ row }) => (
          <Text
            fontWeight={'bold'}
            color={row.original.isRented ? 'green.300' : 'white'}
          >
            {row.original.isRented ? 'Booked' : 'Not Booked'}
          </Text>
        ),
        sortDescFirst: true
      }),
      columnHelper.accessor('Action', {
        header: 'Action',
        cell: ({ row }) => <ArchiveBtn row={row} />,
        sortDescFirst: true
      })
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
            // Check if carId is unique, if not, skip rendering the row
            if (uniqueCarIds.has(row.original.carId)) {
              return null
            }

            // Add the carId to the set
            uniqueCarIds.add(row.original.carId)

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
