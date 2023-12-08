import { Box, Center, Flex, Grid, GridItem, Icon, Text } from '@chakra-ui/react'

export const Cards = ({ details }) => (
  <Grid templateRows='repeat(2, 1fr)' templateColumns='repeat(3, 1fr)' gap={4}>
    {details.map((_, index) => {
      const isLastIndex = index === 3
      return (
        <GridItem
          key={index}
          colSpan={isLastIndex ? 3 : 1}
          width='100%'
          mt='1rem'
        >
          {isLastIndex ? (
            <Flex
              rounded='1.25rem'
              padding='1rem 3rem 0 2rem'
              background='blue.slitedark'
              alignItems='center'
              justifyContent='space-between'
            >
              <Flex alignItems='center' gap={2}>
                <Icon
                  as={_.icon}
                  color='transparent'
                  width={150}
                  height={150}
                />
                <Text fontSize='2.25rem'>{_.title}</Text>
              </Flex>
              <Text fontSize='2.25rem'>{_.total}</Text>
            </Flex>
          ) : (
            <Box rounded='1.25rem' padding='1rem' background='blue.slitedark'>
              <Center as='header' paddingTop='1rem'>
                <Text fontSize='1.5625rem'>{_.title}</Text>
              </Center>
              <Flex alignItems='center'>
                <Icon as={_.icon} width={150} height={150} />
                <Text fontSize='2.25rem'>{_.total}</Text>
              </Flex>
            </Box>
          )}
        </GridItem>
      )
    })}
  </Grid>
)
