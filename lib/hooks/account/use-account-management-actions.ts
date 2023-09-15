import {
  useStatisticsModal,
  useAddNewUser,
  MenuTypes,
  useDeactivateAccount,
  UserDataTypes
} from 'services/zustandVariables'

interface UseAccountManagementActionsTypes {
  isOpenStatistics: (status: MenuTypes) => void
  isCloseStatistics: () => void
  triggerDeactivateModal: (isOpen: boolean, data: UserDataTypes) => void
  triggerNewUserModal: (isOpen: boolean) => void
}

export const useAccountManagementActions =
  (): UseAccountManagementActionsTypes => {
    const updateDeactivateAccount = useDeactivateAccount(
      (state) => state.updateModal
    )

    const updateStatisticsModal = useStatisticsModal(
      (state) => state.updateStatisticsModal
    )

    const updateNewUserModal = useAddNewUser((state) => state.updateModal)

    const triggerDeactivateModal = (
      isOpen: boolean,
      data: UserDataTypes
    ): void => {
      updateDeactivateAccount(isOpen, data)
    }

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
      triggerDeactivateModal,
      triggerNewUserModal,
      isOpenStatistics,
      isCloseStatistics
    }
  }
