import { ReactNode } from 'react'
import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { useSafePush } from 'lib'
import { RedirectLinksTypes } from 'helpers'
import { useRouter } from 'next/router'
import { auth } from 'services/firebase'

export const Sidebar: React.FC<{
  children: ReactNode
  links: RedirectLinksTypes[]
}> = ({ children, links }) => {
  const { safePush } = useSafePush()
  const router = useRouter()

  const pathnameConverter = router.pathname.split('/')

  const handleClick = (path: string): void => {
    safePush(path)
  }

  const email = auth.currentUser?.email

  const isSuperAdmin = () => {
    const currentUserEmail = email
    return currentUserEmail === 'superadmin@gmail.com'
  }

  return (
    <Flex height='100%'>
      <Box flex='1' background='blue.dark' cursor='pointer'>
        {links.map(
          ({ path, name, icon }) =>
            (path !== 'administrator-management' || isSuperAdmin()) && (
              <Flex
                onClick={() => handleClick(path)}
                key={name}
                alignItems='center'
                gap='4'
                padding='4'
                background={
                  pathnameConverter[2] === path ? 'gray.primary' : 'blue.dark'
                }
                _hover={{
                  bg: 'gray.primary'
                }}
              >
                <Icon as={icon} height={8} width={8} />
                <Text>{name}</Text>
              </Flex>
            )
        )}
      </Box>
      <Flex flex='5' mb='8' overflowY='scroll'>
        {children}
      </Flex>
    </Flex>
  )
}
