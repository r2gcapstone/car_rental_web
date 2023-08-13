import { create } from 'zustand'

interface useUserCredentialsTypes {
  email: string
  updateUserCred: (email: string) => void
}

export const useUserCredentials = create<useUserCredentialsTypes>((set) => ({
  email: '',
  updateUserCred: (email): void => {
    set((state) => ({
      ...state,
      email
    }))
  }
}))
