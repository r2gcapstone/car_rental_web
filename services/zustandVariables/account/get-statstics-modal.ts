import { create } from 'zustand'

export type MenuTypes =
  | 'all'
  | 'today'
  | 'per-day'
  | 'monthly'
  | 'all-time'
  | 'show-all'
  | 'statistics'
  | null

interface StatisticsModalTypes {
  isOpen: boolean
  menu?: MenuTypes
  updateStatisticsModal: (isOpen: boolean, menu?: MenuTypes) => void
}

export const useStatisticsModal = create<StatisticsModalTypes>((set) => ({
  menu: null,
  isOpen: false,
  updateStatisticsModal: (isOpen: boolean, menu?: MenuTypes): void =>
    set((state) => ({
      ...state,
      menu,
      isOpen
    }))
}))
