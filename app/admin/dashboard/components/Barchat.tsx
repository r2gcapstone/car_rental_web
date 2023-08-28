import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { Box, Center, Text } from '@chakra-ui/react'
import { colors } from 'theme/colors'

const data = [
  {
    name: 'January',
    amt: 2400
  },
  {
    name: 'February',
    amt: 2210
  },
  {
    name: 'March',
    amt: 2290
  },
  {
    name: 'April',
    amt: 3000
  },
  {
    name: 'May',
    amt: 250
  },
  {
    name: 'Jun',
    amt: 100
  },
  {
    name: 'July',
    amt: 50
  }
]

export const Barchart: React.FC = () => (
  <Box
    background={colors.blue.dark}
    borderRadius='0.9375rem'
    width='100%'
    height='70%'
  >
    <Center padding='1rem'>
      <Text color='white.0' fontWeight='bold'>
        Rate of vehicle rented 2022
      </Text>
    </Center>
    <ResponsiveContainer width='100%' height='80%'>
      <BarChart data={data}>
        <XAxis stroke={colors.white[0]} dataKey='name' />
        <YAxis stroke={colors.white[0]} />
        <Tooltip />
        <Bar dataKey='amt'>
          {data.map((_, index) => {
            const isEvenIndex = index % 2 === 1
            return (
              <Cell
                key={_.name}
                fill={
                  isEvenIndex ? colors.blue.slitedark : colors.blue.lightblue
                }
              />
            )
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </Box>
)
