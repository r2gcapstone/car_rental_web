import create from 'zustand';

export const useUserCredentials = create((set) => ({
  email: '',
  updateUserCred: (email) => {
    set((state) => ({
      ...state,
      email,
    }));
  },
}));
