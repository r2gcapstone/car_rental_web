import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Flex,
  ModalCloseButton,
  Text,
  Button,
  Box,
  Image,
  Center
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getRentingDoc } from 'services/apis/rental'
import { Timestamp } from 'firebase/firestore'
import formatDate from 'utils/formatDate'
import formatTime from 'utils/formatTime'
import { toSentenceCase } from 'helpers'

export function TransactionDetailsModal({ docId, isOpen, isClose }) {
  const [data, setData] = useState({})

  let dataArray = []
  try {
    const {
      vehicleDetails: { vehicleName },
      dateTime,
      pickupLocation,
      dropoffLocation,
      rentDuration,
      priceRate,
      paymentMethod,
      totalPayment,
      ownerName,
      status,
      outsideRate,
      rentee,
      dateCreated
    } = data

    const convertedDateTime = {
      startDate: Timestamp.fromDate(
        new Date(dateTime.startDate.seconds * 1000)
      ),
      startTime: Timestamp.fromDate(
        new Date(dateTime.startTime.seconds * 1000)
      ),
      endDate: Timestamp.fromDate(new Date(dateTime.endDate.seconds * 1000)),
      endTime: Timestamp.fromDate(new Date(dateTime.endTime.seconds * 1000))
    }

    const p = { ...pickupLocation }
    const d = { ...dropoffLocation }
    const pickUp = [
      p.streetName,
      p.houseNumber,
      p.barangay.name,
      p.municipality.name,
      p.zipCode,
      p.province.name
    ]
      .filter(Boolean)
      .join(', ')

    const dropOff = [
      d.streetName,
      d.houseNumber,
      d.barangay.name,
      d.municipality.name,
      d.zipCode,
      d.province.name
    ]
      .filter(Boolean)
      .join(', ')

    dataArray = [
      {
        id: 0,
        label: 'Application Status',
        value: toSentenceCase(status)
      },
      {
        id: 1,
        label: 'Date of Application',
        value: formatDate(dateCreated)
      },
      {
        id: 2,
        label: 'Vehicle Renter',
        value: toSentenceCase(rentee)
      },
      { id: 3, label: 'Vehicle Name', value: toSentenceCase(vehicleName) },
      {
        id: 4,
        label: 'Vehicle Owner',
        value: toSentenceCase(ownerName)
      },
      { id: 5, label: 'Pick-up Location', value: toSentenceCase(pickUp) },

      {
        id: 6,
        label: 'Pick-up Date',
        value:
          formatDate(convertedDateTime.startDate) +
          ' ' +
          formatTime(convertedDateTime.startTime)
      },
      { id: 7, label: 'Drop-off Location', value: toSentenceCase(dropOff) },
      {
        id: 8,
        label: 'Drop-off Date',
        value:
          formatDate(convertedDateTime.endDate) +
          ' ' +
          formatTime(convertedDateTime.endTime)
      },
      {
        id: 9,
        label: 'Payment Method',
        value: paymentMethod
      },
      {
        id: 10,
        label: 'Rate Per Day',
        value: priceRate && priceRate.toLocaleString()
      },
      {
        id: 11,
        label: 'Outside of Origin(Add-on)',
        value: outsideRate && outsideRate.toLocaleString()
      },
      { id: 12, label: 'Rent Duration', value: `${rentDuration} Day(s)` },
      {
        id: 13,
        label: 'Total Amount',
        value: totalPayment.toLocaleString()
      }
    ]
  } catch (error) {}

  const fetchData = async (docId) => {
    try {
      const result = await getRentingDoc(docId)

      if (!result.error) {
        setData(result)
      }
    } catch (error) {
      alert(error)
    }
  }

  const handleOnclose = () => {
    isClose((prev) => !prev)
  }

  useEffect(() => {
    if (isOpen) {
      fetchData(docId)
    }
  }, [docId, isOpen])
  return (
    <>
      <Modal size={'5xl'} isCentered isOpen={isOpen} onClose={handleOnclose}>
        <ModalOverlay />
        <ModalContent
          justifyContent={'center'}
          padding={4}
          gap={2}
          bg={'blue.800'}
        >
          <ModalHeader>
            <Text>View Transaction</Text>
            <ModalCloseButton color={'red'} />
          </ModalHeader>
          <Flex gap={4}>
            <Center bg={'#526D82'} borderRadius={4}>
              {data && (
                <Image w={400} height={'fit-content'} src={data.imageUrl} />
              )}
            </Center>

            <ModalBody borderRadius={10} color={'white'} flex={3}>
              {dataArray.map((item) => (
                <Flex
                  marginTop={1}
                  justifyContent={'space-between'}
                  key={item.id}
                >
                  <Text fontWeight={'bold'}>{item.label} :</Text>
                  <Text w={'50%'}>
                    {[10, 11, 13].includes(item.id) && 'PHP '}
                    {[7, 8].includes(item.id)
                      ? item.value.toLocaleString()
                      : item.value}
                  </Text>
                </Flex>
              ))}
            </ModalBody>
          </Flex>

          {/* <ModalFooter></ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  )
}

const styles = {
  header: {
    textAlign: 'center',
    width: 'full',
    color: 'white',
    paddingBottom: 2,
    marginBottom: 3,
    fontSize: 18,
    fontWeight: 'bold'
  }
}
