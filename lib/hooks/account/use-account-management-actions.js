import {
  useStatisticsModal,
  useAddNewUser,
  useDeactivateAccount,
  UserDataTypes,
  MenuTypes
} from '../../../services/zustandVariables';

export const useAccountManagementActions = () => {
  const updateDeactivateAccount = useDeactivateAccount(
    (state) => state.updateModal
  );

  const updateStatisticsModal = useStatisticsModal(
    (state) => state.updateStatisticsModal
  );

  const updateNewUserModal = useAddNewUser((state) => state.updateModal);

  const triggerDeactivateModal = (isOpen, data) => {
    updateDeactivateAccount(isOpen, data);
  };

  const triggerNewUserModal = (isOpen) => {
    updateNewUserModal(isOpen);
  };

  const isOpenStatistics = (status) => {
    updateStatisticsModal(true, status);
  };

  const isCloseStatistics = () => {
    updateStatisticsModal(false, null);
  };

  return {
    triggerDeactivateModal,
    triggerNewUserModal,
    isOpenStatistics,
    isCloseStatistics
  };
};
