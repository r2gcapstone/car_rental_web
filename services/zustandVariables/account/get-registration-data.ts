import { create } from 'zustand'

export type Steps = 'registrationForm' | 'uploadImage' | 'success'

interface RegistrationTypes {
  email: string
  authId: string
  step: Steps
  loading: boolean
}

interface UseGetRegistrationTypes extends RegistrationTypes {
  updateRegistration: (args: {
    email: string
    authId: string
    step: Steps
    loading: boolean
  }) => void
}

export const initialState: RegistrationTypes = {
  email: '',
  authId: '',
  step: 'registrationForm',
  loading: false
}

export const useGetRegistration = create<UseGetRegistrationTypes>((set) => ({
  ...initialState,
  updateRegistration: (args: {
    email: string
    authId: string | undefined
    step: Steps
    loading: boolean
  }) =>
    set((state) => ({
      ...state,
      email: args?.email,
      authId: args?.authId,
      step: args?.step,
      loading: args?.loading
    }))
}))
