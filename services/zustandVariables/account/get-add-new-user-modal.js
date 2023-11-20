import create from 'zustand';

const useAddNewUser = create((set) => ({
  isOpen: false,
  updateModal: (isOpen) =>
    set((state) => ({
      ...state,
      isOpen
    }))
}));

export default useAddNewUser;
