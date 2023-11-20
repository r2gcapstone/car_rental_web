import { create } from 'zustand'

interface UseLoadingIndicator {
  isLoading: boolean
  updateLoading: (isLoading: boolean) => void
}

export const useLoadingIndicator = create<UseLoadingIndicator>((set) => ({
  isLoading: false,
  updateLoading: (isLoading: boolean): void =>
    set((state) => ({
      ...state,
      isLoading
    }))
}))
