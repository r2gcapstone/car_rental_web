import { create } from 'zustand'

interface UseAddNewUserTypes {
  isOpen: boolean
  updateModal: (isOpen: boolean) => void
}

export const useAddNewUser = create<UseAddNewUserTypes>((set) => ({
  isOpen: false,
  updateModal: (isOpen: boolean): void =>
    set((state) => ({
      ...state,
      isOpen
    }))
}))
