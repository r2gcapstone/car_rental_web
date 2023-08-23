import { ReactNode } from 'react'
import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { useSafePush } from 'lib'
import { RedirectLinksTypes } from 'helpers'

export const Sidebar: React.FC<{
  children: ReactNode
  links: RedirectLinksTypes[]
}> = ({ children, links }) => {
  const { safePush } = useSafePush()

  const handleClick = (path: string): void => {
    safePush(path)
  }

  return (
    <Flex height='100%' gap='6'>
      <Box flex='1' background='blue.dark' cursor='pointer'>
        {links.map(({ path, name, icon }) => (
          <Flex
            onClick={() => handleClick(path)}
            key={name}
            alignItems='center'
            gap='4'
            padding='4'
            _hover={{
              bg: 'gray.primary'
            }}
          >
            <Icon as={icon} height={8} width={8} />
            <Text>{name}</Text>
          </Flex>
        ))}
      </Box>
      <Flex flex='5' mt='4'>
        {children}
      </Flex>
    </Flex>
  )
}
