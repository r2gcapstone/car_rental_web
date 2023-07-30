import { create } from 'zustand'

export type Steps = 'registrationForm' | 'uploadImage' | 'success'

interface UseGetRegistrationTypes {
  email: string
  authId: string
  step: Steps
  updateRegistration: (args: {
    email: string
    authId: string
    step: Steps
  }) => void
}

export const useGetRegistration = create<UseGetRegistrationTypes>((set) => ({
  email: '',
  authId: '',
  step: 'uploadImage',
  updateRegistration: (args: {
    email: string
    authId: string | undefined
    step: Steps
  }) =>
    set((state) => ({
      ...state,
      email: args?.email,
      authId: args?.authId,
      step: args?.step
    }))
}))
