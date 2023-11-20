import React from 'react';
import { CarMarker, AccordionDown } from '../';
import { Icon, Text, Flex, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useUserCredentials } from '../../services/zustandVariables';
import { useAccount } from '../../lib';

const AdminNavbar = () => {
  const email = useUserCredentials((state) => state.email);
  const { signOut } = useAccount();

  return (
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
      <Menu>
        <MenuButton as='button'>
          <Flex alignItems='center' gap='2'>
            <Flex flexDirection='column' alignItems='flex-end'>
              <Text fontSize='0.9375rem' aria-label='admin-email'>
                {email}
              </Text>
              <Text
                color='dark.lightBrown'
                fontSize='0.6875rem'
                aria-label='admin-status'
              >
                Administrator
              </Text>
            </Flex>
            <Icon as={AccordionDown} width={4} height={4} />
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={signOut}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default AdminNavbar;
