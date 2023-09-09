import {
  useStatisticsModal,
  useAddNewUser,
  MenuTypes
} from 'services/zustandVariables'

interface UseAccountManagementActionsTypes {
  isOpenStatistics: (status: MenuTypes) => void
  isCloseStatistics: () => void
  triggerNewUserModal: (isOpen: boolean) => void
}

export const useAccountManagementActions =
  (): UseAccountManagementActionsTypes => {
    const updateStatisticsModal = useStatisticsModal(
      (state) => state.updateStatisticsModal
    )

    const updateNewUserModal = useAddNewUser((state) => state.updateModal)

    const triggerNewUserModal = (isOpen: boolean): void => {
      updateNewUserModal(isOpen)
    }

    const isOpenStatistics = (status: MenuTypes): void => {
      updateStatisticsModal(true, status)
    }

    const isCloseStatistics = (): void => {
      updateStatisticsModal(false, null)
    }

    return {
      triggerNewUserModal,
      isOpenStatistics,
      isCloseStatistics
    }
  }
