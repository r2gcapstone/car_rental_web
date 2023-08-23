import { Box } from '@chakra-ui/react'
import { redirectLinks } from 'helpers'
import { AdminNavbar, Sidebar } from 'components'

interface DefaultLayoutTypes {
  children: React.ReactNode
}

export const AdminLayout: React.FC<DefaultLayoutTypes> = ({ children }) => (
  <Box background='dark.brown' height='100vh' overflow='hidden'>
    <AdminNavbar />
    <Sidebar links={redirectLinks}>{children}</Sidebar>
  </Box>
)
