import { Box } from '@chakra-ui/react'

interface DefaultLayoutTypes {
  children: React.ReactNode
}

export const DefaultLayout: React.FC<DefaultLayoutTypes> = ({ children }) => (
  <Box background='blue.dark' height='100vh'>
    {children}
  </Box>
)
