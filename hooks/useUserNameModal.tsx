import { create } from 'zustand';

interface useUserNameModalInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useUserNameModal = create<useUserNameModalInterface>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));