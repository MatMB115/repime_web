import { create } from "zustand";

interface UserUpdateModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useUserUpdateModal = create<UserUpdateModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({isOpen: false}),
}))

export default useUserUpdateModal;