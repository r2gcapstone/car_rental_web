import { create } from 'zustand'

export type Steps = 'registrationForm' | 'uploadImage' | 'success'

interface UseGetRegistrationTypes {
  email: string
  authId: string
  step: Steps
  loading: boolean
  updateRegistration: (args: {
    email: string
    authId: string
    step: Steps
    loading: boolean
  }) => void
}

export const useGetRegistration = create<UseGetRegistrationTypes>((set) => ({
  email: '',
  authId: '',
  step: 'registrationForm',
  loading: false,
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
