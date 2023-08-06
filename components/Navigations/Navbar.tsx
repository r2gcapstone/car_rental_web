import { CarMarker, AccordionDown } from 'components/icons'
import { Box, Icon, Text, Flex } from '@chakra-ui/react'

export const AdminNavbar: React.FC = () => (
  <Flex
    alignItems='center'
    justifyContent='space-between'
    background='blue.dark'
    padding='0.625rem'
  >
    <Flex gap='1'>
      <Icon as={CarMarker} width={10} height={10} />
      <Text
        color='white'
        fontSize='1.5rem'
        fontWeight='bold'
        textTransform='uppercase'
      >
        R2G
      </Text>
    </Flex>
    <Flex alignItems='center' gap='2'>
      <Box>
        <Text fontSize='0.9375rem'>kanye west</Text>
        <Text color='dark.lightBrown' fontSize='0.6875rem'>
          Administrator
        </Text>
      </Box>
      <Icon as={AccordionDown} width={4} height={4} />
    </Flex>
  </Flex>
)
