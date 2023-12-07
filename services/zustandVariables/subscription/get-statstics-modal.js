import { create } from 'zustand'

export const useStatisticsModal = create((set) => ({
  menu: null,
  isOpen: false,
  updateStatisticsModal: (isOpen, menu) =>
    set((state) => ({
      ...state,
      menu,
      isOpen
    }))
}))
