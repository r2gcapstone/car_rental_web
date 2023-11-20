import create from 'zustand';

const useRefetchData = create((set) => ({
  isRefetch: false,
  updateRefetch: (isRefetch) =>
    set((state) => ({
      ...state,
      isRefetch,
    })),
}));

export default useRefetchData;
