import { useState, useMemo } from 'react'
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
  Icon,
  Center
} from '@chakra-ui/react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table'
import { useAccountManagementActions } from 'lib'
import { ViewIcon, TooltipText, LazySpinner, Pagination } from 'components'
import { AccountTableTypes } from '../helpers/constant'
import { toSentenceCase } from 'helpers'

interface UserDataTypes {
  users: AccountTableTypes[]
  loading: boolean
  jumpPerPage: (id: number) => void
  previousPage: () => void
  nextPage: () => void
  numbers: number[]
  currentPage: number
}

const columnHelper = createColumnHelper<AccountTableTypes>()

export const AccountTable: React.FC<UserDataTypes> = ({
  users,
  loading,
  jumpPerPage,
  previousPage,
  nextPage,
  numbers,
  currentPage
}) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const { triggerDeactivateModal } = useAccountManagementActions()

  const columns = useMemo(
    () => [
      columnHelper.accessor('dateCreated', {
        header: 'Date of Registration',
        cell: ({ row }) => <Text>{row.original.dateCreated}</Text>,
        sortDescFirst: true
      }),
      columnHelper.accessor('email', {
        header: 'email',
        cell: ({ row }) => <Text>{row.original.email}</Text>,
        sortDescFirst: true
      }),
      columnHelper.accessor('fullName', {
        header: 'Full Name',
        cell: ({ row }) => <Text>{toSentenceCase(row.original.fullName)}</Text>,
        sortDescFirst: true
      }),
      columnHelper.accessor('address', {
        header: 'Address',
        cell: ({ row }) => (
          <TooltipText
            text={toSentenceCase(
              row.original.address
                .split(', ')
                .filter(Boolean)
                .slice(0, 3)
                .join(', ')
            )}
          />
        ),
        sortDescFirst: true
      }),

      columnHelper.accessor('mobileNumber', {
        header: 'Mobile Num.',
        cell: ({ row }) => <Text>{row.original.mobileNumber}</Text>,
        sortDescFirst: true
      }),
      columnHelper.accessor('deactivatedAt', {
        header: 'status.',
        cell: ({ row }) => {
          const status =
            row.original.deactivatedAt === null ? 'activated' : 'deactivated'

          return (
            <Center
              bg={status === 'activated' ? 'green.500' : 'red.500'}
              p='0.2rem'
              rounded='xl'
            >
              <Text
                textTransform='uppercase'
                fontWeight='bold'
                fontSize='0.9rem'
              >
                {status}
              </Text>
            </Center>
          )
        },
        sortDescFirst: true
      }),
      columnHelper.accessor('action', {
        header: 'View',
        cell: ({ row }) => (
          <Icon
            as={ViewIcon}
            onClick={() => triggerDeactivateModal(true, row.original)}
            width='2.23438rem'
            height='1.40625rem'
            cursor='pointer'
          />
        ),
        sortDescFirst: true
      })
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
