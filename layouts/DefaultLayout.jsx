import { Box } from '@chakra-ui/react';

export const DefaultLayout = ({ children }) => (
  <Box background='blue.dark' height='100%' minHeight='100vh'>
    {children}
  </Box>
);
