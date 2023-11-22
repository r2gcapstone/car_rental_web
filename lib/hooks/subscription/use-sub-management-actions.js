import { useStatisticsModal } from '../../../services/zustandVariables'

export const useSubManagementActions = () => {
  const updateStatisticsModal = useStatisticsModal(
    (state) => state.updateStatisticsModal
  )

  const isOpenStatistics = (status) => {
    updateStatisticsModal(true, status)
  }

  const isCloseStatistics = () => {
    updateStatisticsModal(false, null)
  }
  return {
    isOpenStatistics,
    isCloseStatistics
  }
}
