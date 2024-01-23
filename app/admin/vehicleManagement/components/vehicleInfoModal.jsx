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
  Box
} from '@chakra-ui/react'
import { getVehicleData } from 'services/apis'
import { useEffect, useState } from 'react'
import { ImagePreviewer } from './ImagePreview'
import { ImageModal } from './imageViewModal'

export function VehicleInfoModal({ docId, isOpen, isClose }) {
  const [data, setData] = useState({})
  const [onOpen, setOnOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  let dataArray = []
  try {
    const {
      vehicleDetails: {
        vehicleName,
        gearType,
        fuelType,
        luggageCount,
        plateNumber
      },
      pickupLocation,
      dropoffLocation,
      priceRate,
      outsideRate
    } = data

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
      { key: 0, label: 'Vehicle Name', value: vehicleName },
      { key: 1, label: 'Gear Shift', value: gearType },
      { key: 2, label: 'Fuel', value: fuelType },
      { key: 3, label: 'Baggage(s)', value: luggageCount },
      { key: 4, label: 'Plate Number', value: plateNumber },
      { key: 5, label: 'Pick-up Location', value: pickUp },
      { key: 6, label: 'Drop-off Location', value: dropOff },
      { key: 7, label: 'Price Rate Per Day', value: priceRate },
      { key: 8, label: 'Outside of Origin Rate(per km)', value: outsideRate }
    ]
  } catch (error) {}

  let btnArray = []
  try {
    btnArray = [
      { key: 0, label: 'View Valid ID', value: data.document.governmentId },
      {
        key: 1,
        label: 'View Birth Certificate',
        value: data.document.BirthCert
      },
      {
        key: 2,
        label: 'View Certificate of Registration',
        value: data.document.CertificateOfReg
      }
    ]
  } catch (error) {}

  const handleOnPress = (key) => {
    if (key === 0) {
      setImageUrl(btnArray[key].value)
    } else if (key === 1) {
      setImageUrl(btnArray[key].value)
    } else if (key === 2) {
      setImageUrl(btnArray[key].value)
    }

    setOnOpen((prev) => !prev)
  }

  const fetchData = async (docId) => {
    try {
      const result = await getVehicleData(docId)
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
          <Flex
            alignSelf={'center'}
            marginBottom={2}
            color={'white'}
            width={'500px'}
          >
            {data && <ImagePreviewer imageUrls={data.imageUrls} />}
          </Flex>
          <Flex gap={2}>
            <ModalBody
              flex={2}
              borderRadius={10}
              bg={'#526D82'}
              color={'white'}
            >
              <Text style={styles.header} borderBottom={'1px'}>
                Vehicle Information
              </Text>
              {dataArray.map((item) => (
                <Flex justifyContent={'space-between'} key={item.key}>
                  <Text fontWeight={'bold'}>{item.label} :</Text>
                  <Text>
                    {[7, 8].includes(item.key) && 'PHP '}
                    {[7, 8].includes(item.key)
                      ? item.value.toLocaleString()
                      : item.value}
                  </Text>
                </Flex>
              ))}
            </ModalBody>
            <ModalBody borderRadius={10} bg={'#526D82'} color={'white'}>
              <Text style={styles.header} borderBottom={'1px'}>
                Documents
              </Text>
              <Flex flexDirection={'column'}>
                {btnArray.map((item) => (
                  <Button
                    bg={'blue.800'}
                    justifyContent={'center'}
                    key={item.key}
                    marginTop={4}
                    w={'full'}
                    onClick={() => handleOnPress(item.key)}
                  >
                    <Text fontSize={14}>{item.label}</Text>
                  </Button>
                ))}
              </Flex>
            </ModalBody>
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
    textAlign: 'start',
    width: 'full',
    color: 'white',
    paddingBottom: 2,
    marginBottom: 3,
    fontSize: 24,
    fontWeight: 'bold'
  }
}
