import { render, screen, waitScreenUpdate } from 'utils/test.utils'
import { UploadProfile } from '../components'

describe('<UploadProfile />', () => {
  beforeEach(async () => {
    render(<UploadProfile />)
    await waitScreenUpdate()
  })

  test('Render all components', () => {
    expect(screen.getByLabelText('user-avatar')).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: /upload image/i
      })
    ).toBeInTheDocument()
    expect(screen.getByText('Skip for now')).toBeInTheDocument()
  })
})
