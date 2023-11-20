import create from 'zustand';

export const initialDataState = {
  id: '',
  dateCreated: '',
  email: '',
  fullName: '',
  address: '',
  mobileNumber: '',
  imageUrl: ''
};

export const useDeactivateAccount = create((set) => ({
  data: initialDataState,
  isOpen: false,
  updateModal: (isOpen, data) =>
    set((state) => ({
      ...state,
      data,
      isOpen
    }))
}));
