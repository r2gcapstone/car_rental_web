import React, { useEffect, useState } from 'react'
import ModalContainer2 from 'components/Modals/ModalContainer2'
import { Button, Flex, Icon, Text, Box, Stack } from '@chakra-ui/react'
import { CarMarker, InputField, SearchIcon } from 'components'
import { getSubTotalStat } from 'services/apis'
import formatTime from 'helpers/formatTime'

function StatRegisteredModal({ isOpen, setIsOpen, option: { key, title } }) {
  const onClose = () => {
    setIsOpen(false)
  }

  const currentDate = new Date()

  const [size, setSize] = useState(0)

  const fetchStatData = async (subType) => {
    try {
      const result = await getSubTotalStat(subType)

      setSize(result)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchStatData(title)
  }, [])

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
            As of {currentDate.toLocaleTimeString()}
            {', '}
            {currentDate.toDateString()}
          </Text>

          <Flex justifyContent={'space-between'} justifyItems={'center'}>
            {key == 5 ? (
              <Text fontSize='1.5rem' width={'75%'}>
                {title} :
              </Text>
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
              {size}
            </Text>
          </Flex>
        </Box>
        <Flex justifyContent={'center'}>
          <Button fontSize={'1.5rem'} marginTop={20} bgColor={'red'}>
            Download as PDF
          </Button>
        </Flex>
      </Box>
    </ModalContainer2>
  )
}

export default StatRegisteredModal
