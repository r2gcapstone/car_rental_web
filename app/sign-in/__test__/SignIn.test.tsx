import { render, screen, userEvent } from 'utils/test.utils'
import { SignIn } from '../SignIn'

describe('<SignIn />', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    render(<SignIn />)
  })

  it('render a proper component', () => {
    expect(screen.getByLabelText('signin-description')).toHaveTextContent(
      'Please enter your username and password of your admin account.'
    )
  })

  it('Check required field and invalid email error', async () => {
    const inputEmail = screen.getByRole('textbox', {
      name: /email/i
    })
    const loginButton = screen.getByRole('button', { name: /login/i })

    await user.type(inputEmail, 'johndoe@')
    await user.click(loginButton)
    expect(screen.getAllByText('Email is not valid.')[0]).toBeInTheDocument()
  })

  it('Check password is required', async () => {
    const loginButton = screen.getByRole('button', { name: /login/i })
    const inputPassword = screen.getByLabelText(/password/i)

    await user.clear(inputPassword)
    await user.click(loginButton)
    expect(screen.getAllByText('Required field.')[0]).toBeInTheDocument()
  })

  it('Check email is required', async () => {
    const loginButton = screen.getByRole('button', { name: /login/i })
    const inputEmail = screen.getByLabelText(/email/i)

    await user.clear(inputEmail)
    await user.click(loginButton)
    expect(screen.getAllByText('Required field.')[0]).toBeInTheDocument()
  })

  it('Check email is not more than 50 characters', async () => {
    const loginButton = screen.getByRole('button', { name: /login/i })
    const inputEmail = screen.getByLabelText(/email/i)

    await user.type(
      inputEmail,
      'dawodgauwdgauiwdgiaugdiuawgdiuawgduiawgduiawgduiagwdiuagwudauiwgdiuawgdgauida@yahoo.com'
    )
    await user.click(loginButton)
    expect(screen.getAllByText('Required field.')[0]).toBeInTheDocument()
  })
})
