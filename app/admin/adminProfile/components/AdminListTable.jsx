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

const columnHelper = createColumnHelper()

export const AdminListTable = ({
  admins,
  loading,
  jumpPerPage,
  previousPage,
  nextPage,
  numbers,
  currentPage
}) => {
  const [sorting, setSorting] = useState([])

  const columns = useMemo(
    () => [
      columnHelper.accessor('Full Name', {
        header: 'Full Name',
        cell: ({ row }) => (
          <Text>{row.original.firstName + ' ' + row.original.lastName}</Text>
        ),
        sortDescFirst: true
      }),
      columnHelper.accessor('Email', {
        header: 'Email',
        cell: ({ row }) => <Text>{row.original.email}</Text>,
        sortDescFirst: true
      }),
      columnHelper.accessor('Mobile Number', {
        header: 'Mobile Number',
        cell: ({ row }) => <Text>{row.original.mobileNumber}</Text>,
        sortDescFirst: true
      }),
      columnHelper.accessor('Address', {
        header: 'Address',
        cell: ({ row }) => <Text>{row.original.address}</Text>,
        sortDescFirst: true
      })
    ],
    []
  )

  const table = useReactTable({
    data: admins,
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
    </TableContainer>
  )
}
