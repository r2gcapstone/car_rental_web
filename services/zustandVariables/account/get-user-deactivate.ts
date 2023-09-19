import { create } from 'zustand'

export interface UserDataTypes {
  id?: string
  dateCreated: string
  email: string
  fullName: string
  address: string
  mobileNumber: string
  deactivatedAt?: string
  imageUrl?: string
}

interface UseDeactivateAccount {
  isOpen: boolean
  data: UserDataTypes
  updateModal: (isOpen: boolean, data: UserDataTypes) => void
}

export const initialDataState = {
  id: '',
  dateCreated: '',
  email: '',
  fullName: '',
  address: '',
  mobileNumber: '',
  imageUrl: ''
}

export const useDeactivateAccount = create<UseDeactivateAccount>((set) => ({
  data: initialDataState,
  isOpen: false,
  updateModal: (isOpen: boolean, data: UserDataTypes) =>
    set((state) => ({
      ...state,
      data,
      isOpen
    }))
}))
