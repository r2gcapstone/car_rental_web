import { render, screen, mockUseRouter } from 'utils/test.utils'
import { AdminNavbar } from 'components/Navigations'

describe('<AdminNavbar />', () => {
  mockUseRouter(() => '/admin/dashboard', '', '', { id: '' }, '')
  beforeEach(() => {
    render(<AdminNavbar />)
  })

  it('Render all components', () => {
    expect(screen.getByLabelText('admin-email')).toBeInTheDocument()
    expect(screen.getByLabelText('admin-status')).toBeInTheDocument()
  })
})
