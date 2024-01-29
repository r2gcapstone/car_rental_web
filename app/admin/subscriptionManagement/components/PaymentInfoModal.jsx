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
import { ImagePreviewer } from './ImagePreview'
import { ImageModal } from './ImageViewModal'
import { getUserData } from 'services/apis/account/users'
import formatDate from 'utils/formatDate'

export function PaymentInfoModal({ data, isOpen, isClose }) {
  const [date, setDate] = useState()
  const [fetchedData, setFetchedData] = useState()
  const [onOpen, setOnOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  let appenedAddress = []

  try {
    appenedAddress = [
      fetchedData.address.street,
      fetchedData.address.subdivision,
      fetchedData.address.barangay.name,
      fetchedData.address.municipality.name,
      fetchedData.address.province.name
    ]
      .filter(Boolean)
      .join(', ')
  } catch (error) {}

  const fetchData = async (docId) => {
    try {
      const result = await getUserData(docId)

      if (!result.error) {
        setFetchedData(result)
        setDate(result.dateCreated)
      }
    } catch (error) {
      alert(error)
    }
  }

  const handleOnclose = () => {
    isClose((prev) => !prev)
  }

  const dataArray = [
    {
      key: 0,
      label: 'Name',
      value: fetchedData?.firstName + ' ' + fetchedData?.lastName
    },
    { key: 1, label: 'Email', value: fetchedData?.email },
    { key: 2, label: 'Mobile Number', value: fetchedData?.mobileNumber },
    { key: 3, label: 'Address', value: appenedAddress }
  ]

  const subscriptionTypeMap = {
    MONTHLY: '1 Month',
    '3 MONTHS': '3 Months',
    '6 MONTHS': '6 Months',
    '1 YEAR': '1 Year'
  }

  const paymentInfoArray = [
    {
      key: 0,
      label: 'Subscription Type',
      value: subscriptionTypeMap[data.subscriptionType] || data.subscriptionType
    },
    { key: 1, label: 'Ammount to Pay', value: 'PHP' + ' ' + data.ammount },
    {
      key: 2,
      label: 'Request Date',
      value: data.dateCreated && formatDate(data.dateCreated)
    },
    { key: 3, label: 'For Vehicle', value: data.vehicleName }
  ]

  useEffect(() => {
    if (isOpen) {
      fetchData(data.userId)
    }
  }, [data, isOpen])
  return (
    <>
      <Modal size={'3xl'} isCentered isOpen={isOpen} onClose={handleOnclose}>
        <ModalOverlay />
        <ModalContent
          justifyContent={'center'}
          padding={4}
          gap={2}
          bg={'blue.800'}
        >
          <ModalHeader>
            <ModalCloseButton color={'red'} />
          </ModalHeader>

          <Flex gap={2}>
            <ModalBody flex={2} color={'white'}>
              <Center flexDirection={'column'}>
                {data.carImage && (
                  <Image
                    w={200}
                    h={200}
                    borderRadius={'full'}
                    src={data.carImage}
                  />
                )}

                <Text style={styles.header} marginTop={4}>
                  Date of Registration
                </Text>
                <Text textAlign={'center'}>{date && formatDate(date)}</Text>
              </Center>
            </ModalBody>
            <Flex flexDirection={'column'} gap={4} flex={4}>
              <ModalBody
                borderRadius={10}
                bg={'#526D82'}
                color={'white'}
                height={220}
                flex={3}
              >
                <Text style={styles.header}>Buyer Information</Text>
                {fetchData &&
                  dataArray.map((item) => (
                    <Flex
                      gap={'35%'}
                      justifyContent={'space-between'}
                      key={item.key}
                    >
                      <Text whiteSpace={'nowrap'} fontWeight={'bold'}>
                        {item.label} :
                      </Text>
                      <Text>{item.value}</Text>
                    </Flex>
                  ))}
              </ModalBody>
              <ModalBody
                borderRadius={10}
                bg={'#526D82'}
                color={'white'}
                height={220}
                flex={3}
              >
                <Text style={styles.header}>Payment Information</Text>
                {paymentInfoArray.map((item) => (
                  <Flex
                    gap={'35%'}
                    justifyContent={'space-between'}
                    key={item.key}
                  >
                    <Text w={'20%'} whiteSpace={'nowrap'} fontWeight={'bold'}>
                      {item.label} :
                    </Text>
                    <Text>{item.value}</Text>
                  </Flex>
                ))}
              </ModalBody>
            </Flex>
          </Flex>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <ImageModal imageUrl={imageUrl} onOpen={onOpen} onClose={setOnOpen} />
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
