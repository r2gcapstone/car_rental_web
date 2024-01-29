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
import { PaymentInfoModal } from './PaymentInfoModal'
import { ReceiptImg } from './ReceiptImg'
import { WriteMessageModal } from './WriteMessageModal'

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
  const [filteredVehicles, setFilteredVehicles] = useState(users)
  const [isPaymentInfoOpen, setIsPaymentInfoOpen] = useState(false)
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false)
  const [isWriteMessage, setIsWriteMessage] = useState(false)
  const [targetId, setTargetId] = useState('')
  const [img, setImg] = useState('')
  const [paymentData, setPaymentData] = useState('')

  useEffect(() => {
    setFilteredVehicles(users)
  }, [users])

  const handleId = (key, data) => {
    if (key === 'paymentInfo') {
      setIsPaymentInfoOpen((prev) => !prev)
      setPaymentData(data)
    } else if (key === 'receipt') {
      setImg(data)
      setIsReceiptModalOpen((prev) => !prev)
    }

    setTargetId(data)
  }
  //components

  const SubscriptionAction = ({ row }) => (
    <Flex>
      <Button
        size={'lg'}
        mr={2}
        onClick={() => handleApprove(row.original.id, row.original.docId)}
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
        onClick={() => handleDecline(row.original.id, row.original.docId)}
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

  const PaymentInfo = ({ row }) => (
    <Button
      size={'lg'}
      mr={2}
      onClick={() => handleId('paymentInfo', row)}
      backgroundColor='blue.700'
      opacity={0.8}
      transition='0.2s'
      _hover={{
        backgroundColor: 'blue.400',
        opacity: 1,
        transform: 'scale(1.05)'
      }}
    >
      View Payment Info
    </Button>
  )

  const ViewReceipt = ({ row }) => (
    <Button
      size={'lg'}
      mr={2}
      onClick={() => handleId('receipt', row.receiptImg)}
      backgroundColor='blue.700'
      opacity={0.8}
      transition='0.2s'
      _hover={{
        backgroundColor: 'blue.400',
        opacity: 1,
        transform: 'scale(1.05)'
      }}
    >
      View Receipt
    </Button>
  )

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
      columnHelper.accessor('Payment Info', {
        header: 'Payment Info',
        cell: ({ row }) => <PaymentInfo row={row.original} />,
        sortDescFirst: true
      }),
      columnHelper.accessor('View Receipt', {
        header: 'View Receipt',
        cell: ({ row }) => <ViewReceipt row={row.original} />,
        sortDescFirst: true
      }),
      columnHelper.accessor('Action', {
        header: 'Action',
        cell: ({ row }) => <SubscriptionAction row={row} />,
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
        setFilteredVehicles((prevUsers) =>
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
  const handleDecline = async (docId) => {
    setTargetId(docId)
    setIsWriteMessage((prev) => !prev)
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

      <PaymentInfoModal
        data={paymentData}
        isOpen={isPaymentInfoOpen}
        isClose={setIsPaymentInfoOpen}
      />

      <ReceiptImg
        img={img}
        isOpen={isReceiptModalOpen}
        isClose={setIsReceiptModalOpen}
      />

      {isWriteMessage && targetId && (
        <WriteMessageModal
          filter={setFilteredVehicles}
          docId={targetId}
          isOpen={isWriteMessage}
          isClose={setIsWriteMessage}
        />
      )}
    </TableContainer>
  )
}
