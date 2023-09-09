/* eslint-disable unicorn/consistent-function-scoping */
import { AuthServices } from 'services/apis'
import {
  useGetRegistration,
  useRefetchData,
  useLoadingIndicator
} from 'services/zustandVariables'
import { shallow } from 'zustand/shallow'
import { setCookie, deleteCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import swal from 'sweetalert2'

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
  registerUserAdmin: <FormValues>(args: {
    email: string
    password: string
    config: FormValues
    image: File[]
  }) => Promise<void>
  checkLoading: () => void
  signOut: () => void
  signIn: (email: string, password: string) => Promise<void>
}

export const useAccount = (): UseAccountTypes => {
  const router = useRouter()

  const {
    updateRegistration: updateRegistrationVars,
    step,
    ...state
  } = useGetRegistration(
    (state) => ({ ...state, updateRegistration: state.updateRegistration }),
    shallow
  )

  const isCheckLoagind = useLoadingIndicator((state) => state.updateLoading)

  const updateRefetch = useRefetchData((state) => state.updateRefetch)

  const checkLoading = (): void =>
    updateRegistrationVars({
      ...state,
      step,
      loading: true
    })

  const subscribeLoading = (): void => isCheckLoagind(true)
  const unSubscribeLoading = (): void => isCheckLoagind(false)

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

  const registerUserAdmin = async <FormValues>(args: {
    email: string
    password: string
    config: FormValues
    image: File[]
  }): Promise<void> => {
    const { authRegisterAdmin } = new AuthServices()
    subscribeLoading()

    const response = await authRegisterAdmin(
      args.email,
      args.password,
      args.config,
      args.image
    )

    if (response?.authId) {
      swal.fire({
        title: 'Success',
        text: 'successfully added new user',
        icon: 'success'
      })
      unSubscribeLoading()
    }

    updateRefetch(true)
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

    updateRefetch(true)
  }

  const signOut = (): void => {
    const { signOut } = new AuthServices()
    signOut()
    deleteCookie('ADMIN_TOKEN')
    router.push('/sign-in')
  }

  const signIn = async (email: string, password: string): Promise<void> => {
    const { signInService } = new AuthServices()

    const response = await signInService(email, password)
    const userToken = await response?.token

    if (response?.token) {
      swal.fire({
        title: 'Success',
        text: 'successfully logged in',
        icon: 'success'
      })
      router.push('admin/dashboard')
      setCookie('ADMIN_TOKEN', {
        token: userToken || '',
        email: response.response.user.email
      })
    }
  }

  return {
    checkLoading,
    uploadAvatar,
    registerUserAdmin,
    validateStrongPassword,
    registerUser,
    signOut,
    signIn
  }
}
/* eslint-enable unicorn/consistent-function-scoping */
