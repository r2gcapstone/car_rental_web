import React, { useEffect, useState } from 'react'
import ModalContainer2 from 'components/Modals/ModalContainer2'
import { Button, Flex, Icon, Text, Box } from '@chakra-ui/react'
import { CarMarker } from 'components'
import { getSubTotalStat } from 'services/apis'
import { PDFDocument } from 'components'
import { PDFDownloadLink, StyleSheet } from '@react-pdf/renderer'

function StatRegisteredModal({ isOpen, setIsOpen, option: { key, title } }) {
  const onClose = () => {
    setIsOpen(false)
  }
  const currentDate = new Date()

  const [size, setSize] = useState(0)

  const [fetchedVal, setFetchedVal] = useState({
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0,
    val6: 0
  })

  const fetchStatData = async (subType) => {
    try {
      const result = await getSubTotalStat(subType)
      return result
    } catch (error) {
      return 0
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (key == 7) {
        const values = {
          val1: await fetchStatData('1 MONTH'),
          val2: await fetchStatData('3 MONTHS'),
          val3: await fetchStatData('6 MONTHS'),
          val4: await fetchStatData('1 YEAR'),
          val5: await fetchStatData('Average Subscription Count (Per Month)'),
          val6: await fetchStatData('Subscription Count')
        }
        setFetchedVal(values)
      } else {
        const result = await fetchStatData(title)
        setSize(result)
      }
    }

    fetchData()
  }, [key, title])

  const valArray = [
    { key: 1, title: '1 Month', value: fetchedVal.val1 },
    { key: 2, title: '3 Months', value: fetchedVal.val2 },
    { key: 3, title: '6 Months', value: fetchedVal.val3 },
    { key: 4, title: '1 Year', value: fetchedVal.val4 },
    {
      key: 5,
      title: 'Average Subscription Purchase (Per Month)',
      value: fetchedVal.val5
    },
    {
      key: 6,
      title: 'Subscription Count',
      value: fetchedVal.val6
    }
  ]

  const PDFData = {
    1: [
      {
        title: '1 Month',
        content: 'Total Number of 1 Month Subscription Purchase',
        value: size
      }
    ],
    2: [
      {
        title: '3 Months',
        content: 'Total Number of 3 Months Subscription Purchase',
        value: size
      }
    ],
    3: [
      {
        title: '6 Months',
        content: 'Total Number of 6 Months Subscription Purchase',
        value: size
      }
    ],
    4: [
      {
        title: '1 Year',
        content: 'Total Number of 1 Year Subscription Purchase',
        value: size
      }
    ],
    5: [
      {
        title: 'Average Subscription Purchase (Per Month)',
        content: 'Average Subscription Purchase (Per Month)',
        value: size
      }
    ],
    6: [
      {
        title: 'Subscription Count',
        content: 'Total Number of Subscription Purchase',
        value: size
      }
    ],
    7: [
      {
        title: '1 Month',
        content: 'Total Number of 1 Month Subscription Purchase',
        value: fetchedVal.val1
      },
      {
        title: '3 Months',
        content: 'Total Number of 3 Months Subscription Purchase',
        value: fetchedVal.val2
      },
      {
        title: '6 Months',
        content: 'Total Number of 6 Months Subscription Purchase',
        value: fetchedVal.val3
      },
      {
        title: '1 Year',
        content: 'Total Number of 1 Year Subscription Purchase',
        value: fetchedVal.val4
      },
      {
        title: 'Average Subscription Purchase (Per Month)',
        content: 'Average Subscription Purchase (Per Month)',
        value: fetchedVal.val5
      },
      {
        title: 'Subscription Count',
        content: 'Total Number of Subscription Purchase',
        value: fetchedVal.val6
      }
    ]
  }

  return (
    <ModalContainer2
      isOpen={isOpen}
      onClose={onClose}
      title=''
      modalWidth='2xl'
    >
      <Box paddingX={'1.5rem'} paddingBottom={'2rem'}>
        <Flex gap='2' alignItems='center' marginBottom={6}>
          <Icon as={CarMarker} width='5rem' height='5rem' />
          <Text
            color={'white'}
            fontSize='2rem'
            fontWeight={'bold'}
            marginRight={'3rem'}
          >
            Statistics of Registered Users
          </Text>
        </Flex>
        <Box gap='2' alignItems='center' paddingX={'4'}>
          <Text marginBottom={6} fontSize='1.5rem'>
            As of {currentDate.toLocaleTimeString()},{' '}
            {currentDate.toDateString()}
          </Text>
          <Flex justifyContent={'space-between'} justifyItems={'center'}>
            {key == 5 ? (
              <Text fontSize='1.5rem' width={'75%'}>
                {title} :
              </Text>
            ) : key == 7 ? (
              <Box width={'100%'}>
                {valArray.map((item) => (
                  <Flex
                    key={item.key}
                    justifyContent={'space-between'}
                    justifyItems={'center'}
                    paddingBottom={4}
                  >
                    <Text fontSize='1.5rem' width={'75%'}>
                      {item.title}
                    </Text>
                    <Text
                      fontWeight={'bold'}
                      alignSelf={'center'}
                      fontSize='1.5rem'
                    >
                      {item.value}
                    </Text>
                  </Flex>
                ))}
              </Box>
            ) : (
              <Text fontSize='1.5rem' width={'75%'}>
                Total Number of{' '}
                {title === 'Subscription Count' || title === 'Show All'
                  ? ' '
                  : title}{' '}
                Subscription Purchase :{' '}
              </Text>
            )}
            <Text fontWeight={'bold'} alignSelf={'center'} fontSize='1.5rem'>
              {key != 7 && size}
            </Text>
          </Flex>
        </Box>
        <Flex justifyContent={'center'} marginTop={10}>
          <PDFDownloadLink
            document={<PDFDocument data={PDFData[key]} />}
            fileName='download.pdf'
            style={style.button}
          >
            Download PDF
          </PDFDownloadLink>
        </Flex>
      </Box>
    </ModalContainer2>
  )
}

export default StatRegisteredModal

const style = StyleSheet.create({
  button: {
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'red',
    width: '100%',
    padding: '0.5rem',
    borderRadius: '0.5rem'
  }
})
