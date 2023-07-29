import { render, screen, userEvent, waitScreenUpdate } from 'utils/test.utils'
import { RegistrationForm } from '../RegistrationForm'

describe('<RegistrationForm />', () => {
  const user = userEvent.setup()

  beforeEach(async () => {
    render(<RegistrationForm />)
    await waitScreenUpdate()
  })

  //* TODO test input behavior
  //* TODO test if field is empty
  //* TODO test input validation

  test('Render all components', () => {
    expect(screen.getByLabelText('sign-up-description')).toHaveTextContent(
      'Please provide an input to the given fields to create an admin account'
    )
  })

  test('Display error if email is not correct', async () => {
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
    const password = screen.getByRole('textbox', {
      name: /password/i
    })
    const confitmPassword = screen.getByRole('textbox', {
      name: /confitmPassword/i
    })
    const buttonSubmit = screen.getByRole('button', {
      name: /submit/i
    })

    await user.type(email, 'test@email')
    await user.type(firstName, 'firstname')
    await user.type(lastname, 'lastname')
    await user.type(address, 'address')
    await user.type(password, '1234567890aSDFG')
    await user.type(confitmPassword, '1234567890aSDFG')
    await user.click(buttonSubmit)

    await waitScreenUpdate()
    expect(buttonSubmit).toBeEnabled()
    expect(
      screen.getAllByText('This email is not valid.')[0]
    ).toBeInTheDocument()
  })
})
