import { Box } from '@chakra-ui/react'
import { AdminNavbar } from 'components'

interface DefaultLayoutTypes {
  children: React.ReactNode
}

export const AdminLayout: React.FC<DefaultLayoutTypes> = ({ children }) => (
  <Box background='dark.brown' height='100vh'>
    <AdminNavbar />
    {children}
  </Box>
)
