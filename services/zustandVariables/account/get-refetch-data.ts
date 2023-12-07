import { create } from 'zustand'

interface UseFetchDataType {
  isRefetch: boolean
  updateRefetch: (isRefetch: boolean) => void
}

export const useRefetchData = create<UseFetchDataType>((set) => ({
  isRefetch: false,
  updateRefetch: (isRefetch: boolean): void =>
    set((state) => ({
      ...state,
      isRefetch
    }))
}))
