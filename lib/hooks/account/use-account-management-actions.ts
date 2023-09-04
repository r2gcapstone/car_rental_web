import { useStatisticsModal, MenuTypes } from 'services/zustandVariables'

interface UseAccountManagementActionsTypes {
  isOpenStatistics: (status: MenuTypes) => void
  isCloseStatistics: () => void
}

export const useAccountManagementActions =
  (): UseAccountManagementActionsTypes => {
    const updateStatisticsModal = useStatisticsModal(
      (state) => state.updateStatisticsModal
    )

    const isOpenStatistics = (status: MenuTypes): void => {
      updateStatisticsModal(true, status)
    }

    const isCloseStatistics = (): void => {
      updateStatisticsModal(false, null)
    }

    return {
      isOpenStatistics,
      isCloseStatistics
    }
  }
