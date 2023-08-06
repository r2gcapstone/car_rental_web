import { render, screen } from 'utils/test.utils'
import { mockUseRouter } from 'utils/test.utils'
import { Success } from '../components'

describe('<Success />', () => {
  mockUseRouter(() => 'sign-in', '', '', { id: '' }, '')
  beforeEach(() => {
    render(<Success />)
  })

  test('Render all components', () => {
    expect(screen.getByLabelText('success-title')).toHaveTextContent(
      'You have now an account to R2G’s Administration'
    )
    expect(
      screen.getByRole('button', {
        name: /login/i
      })
    ).toHaveTextContent('Login')
  })
})
