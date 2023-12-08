import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { Box, Center, Text, Spinner } from '@chakra-ui/react'
import { colors } from 'theme/colors'
import { usefetchBargraphData } from 'lib'
import { useEffect, useState } from 'react'

export const Barchart = () => {
  const [bargraphData, setBargraphData] = useState([])
  const [loading, setLoading] = useState(true)
  const currentYear = new Date()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await usefetchBargraphData('approved')
        setBargraphData(data)
        setLoading(false) // Set loading to false when data is fetched
      } catch (error) {
        alert('Error fetching data:', error)
        // Handle errors if needed
      }
    }

    fetchData()
  }, [])

  return (
    <Box
      background={colors.blue.dark}
      borderRadius='0.9375rem'
      width='100%'
      height='70%'
      position='relative'
    >
      <Center padding='1rem'>
        <Text color='white.0' fontWeight='bold'>
          Rate of vehicle rented {currentYear.getFullYear()}
        </Text>
      </Center>
      {loading ? ( // Render loading spinner while data is being fetched
        <Center
          position='absolute'
          top='50%'
          left='50%'
          transform='translate(-50%, -50%)'
        >
          <Spinner color='white' />
        </Center>
      ) : (
        <ResponsiveContainer width='100%' height='80%'>
          <BarChart data={bargraphData}>
            <XAxis stroke={colors.white[0]} dataKey='month' />
            <YAxis stroke={colors.white[0]} />
            <Tooltip />
            <Bar dataKey='size'>
              {bargraphData.map((_, index) => {
                const isEvenIndex = index % 2 === 1
                return (
                  <Cell
                    key={_.month}
                    fill={
                      isEvenIndex
                        ? colors.blue.slitedark
                        : colors.blue.lightblue
                    }
                  />
                )
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Box>
  )
}
