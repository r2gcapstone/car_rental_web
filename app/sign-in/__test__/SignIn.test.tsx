import { render, screen } from '@testing-library/react'
import { SignIn } from '../SignIn'

describe('<SignIn />', () => {
  beforeEach(() => {
    render(<SignIn />)
  })

  it('render a proper component', () => {
    expect(screen.getByLabelText('sign-in')).toBeInTheDocument()
  })
})
