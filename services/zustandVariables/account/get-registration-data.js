import create from 'zustand';

const initialState = {
  email: '',
  authId: '',
  step: 'registrationForm',
  loading: false,
};

const useGetRegistration = create((set) => ({
  ...initialState,
  updateRegistration: (args) =>
    set((state) => ({
      ...state,
      email: args?.email || '',
      authId: args?.authId || '',
      step: args?.step || 'registrationForm',
      loading: args?.loading || false,
    })),
}));

export default useGetRegistration;
