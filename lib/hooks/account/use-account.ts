/* eslint-disable unicorn/consistent-function-scoping */
import { AuthServices } from 'services/apis'
import { useGetRegistration } from 'services/zustandVariables'
import { shallow } from 'zustand/shallow'

interface UseAccountTypes {
  validateStrongPassword: (password: string) => {
    validation: boolean
    message: string
  }
  uploadAvatar: (authId: string, file: File[]) => Promise<void>
  registerUser: <FormValues>(args: {
    email: string
    password: string
    config: FormValues
  }) => Promise<void>
  checkLoading: () => void
}

export const useAccount = (): UseAccountTypes => {
  const {
    updateRegistration: updateRegistrationVars,
    step,
    ...state
  } = useGetRegistration(
    (state) => ({ ...state, updateRegistration: state.updateRegistration }),
    shallow
  )

  const checkLoading = (): void =>
    updateRegistrationVars({
      ...state,
      step,
      loading: true
    })

  const validateStrongPassword = (
    password: string
  ): { validation: boolean; message: string } => {
    const formatted = password.trim() // removes whitespace

    // at least 8 characters, 1 number, 1 lowercase letter, and 1 uppercase letter
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\W\w]{8,}$/
    const errorMessage = `The password isn't strong enough. \n- Must be at least 8 characters \n- Must include at least a number, and upper case and lower case alphabets`

    return {
      validation: regex.test(formatted),
      message: errorMessage
    }
  }

  const uploadAvatar = async (authId: string, file: File[]): Promise<void> => {
    const { uploadAvatar } = new AuthServices()
    checkLoading()
    const response = await uploadAvatar(authId, file)
    response &&
      updateRegistrationVars({
        ...state,
        step: 'success',
        loading: false
      })
  }

  const registerUser = async <FormValues>(args: {
    email: string
    password: string
    config: FormValues
  }): Promise<void> => {
    const { authRegister } = new AuthServices()
    checkLoading()
    const response = await authRegister(args.email, args.password, args.config)

    response &&
      updateRegistrationVars({
        email: args?.email,
        authId: response?.authId,
        step: 'uploadImage',
        loading: false
      })
  }

  return {
    checkLoading,
    uploadAvatar,
    validateStrongPassword,
    registerUser
  }
}
/* eslint-enable unicorn/consistent-function-scoping */
