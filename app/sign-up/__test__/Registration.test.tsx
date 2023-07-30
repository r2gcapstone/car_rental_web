import { render, screen, userEvent, waitScreenUpdate } from 'utils/test.utils'
import { RegistrationForm } from '../components/RegistrationForm'

describe('<RegistrationForm />', () => {
  const user = userEvent.setup()

  beforeEach(async () => {
    render(<RegistrationForm />)
    await waitScreenUpdate()
  })

  test('Enabled button if all the field is not empty and display valid errors', async () => {
    const email = screen.getByRole('textbox', {
      name: /email/i
    })
    const firstName = screen.getByRole('textbox', {
      name: /first name/i
    })
    const lastname = screen.getByRole('textbox', {
      name: /last name/i
    })
    const address = screen.getByRole('textbox', {
      name: /address/i
    })
    const password = screen.getAllByLabelText(/password/i)[0]
    const confirmPassword = screen.getAllByLabelText(/confirm password/i)[0]
    const buttonSubmit = screen.getByRole('button', {
      name: /submit/i
    })

    await user.type(email, 'test@email')
    await user.type(firstName, 'firstname')
    await user.type(lastname, 'lastname')
    await user.type(address, 'address')
    await user.type(password, '1234567890aSDFG')
    await user.type(confirmPassword, '1234567890aSDFG')

    expect(buttonSubmit).toBeEnabled()

    await user.click(buttonSubmit)
    await waitScreenUpdate()

    expect(screen.getByText('This email is not valid.')).toBeInTheDocument()
  })

  test('Show error if password and confirm password does not match', async () => {
    const email = screen.getByRole('textbox', {
      name: /email/i
    })
    const firstName = screen.getByRole('textbox', {
      name: /first name/i
    })
    const lastname = screen.getByRole('textbox', {
      name: /last name/i
    })
    const address = screen.getByRole('textbox', {
      name: /address/i
    })
    const password = screen.getAllByLabelText(/password/i)[0]
    const confirmPassword = screen.getAllByLabelText(/confirm password/i)[0]
    const buttonSubmit = screen.getByRole('button', {
      name: /submit/i
    })

    await user.type(email, 'test@email.com')
    await user.type(firstName, 'firstname')
    await user.type(lastname, 'lastname')
    await user.type(address, 'address')
    await user.type(password, '1234567890aSDFG')
    await user.type(confirmPassword, '1234567890aS')

    expect(buttonSubmit).toBeEnabled()

    await user.click(buttonSubmit)
    await waitScreenUpdate()

    expect(
      screen.getByText('Your password and confirm password is not match.')
    ).toBeInTheDocument()
  })
})
