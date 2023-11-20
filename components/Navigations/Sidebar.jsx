import React, { ReactNode } from 'react';
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { useSafePush } from '../../lib';
import { RedirectLinksTypes } from '../../helpers';
import { useRouter } from 'next/router';

const Sidebar = ({ children, links }) => {
  const { safePush } = useSafePush();
  const router = useRouter();

  const pathnameConverter = router.pathname.split('/');

  const handleClick = (path) => {
    safePush(path);
  };

  return (
    <Flex height='100%'>
      <Box flex='1' background='blue.dark' cursor='pointer'>
        {links.map(({ path, name, icon }) => (
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
              bg: 'gray.primary',
            }}
          >
            <Icon as={icon} height={8} width={8} />
            <Text>{name}</Text>
          </Flex>
        ))}
      </Box>
      <Flex flex='5' mb='8' overflowY='scroll'>
        {children}
      </Flex>
    </Flex>
  );
};

export default Sidebar;
