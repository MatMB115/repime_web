import { create } from "zustand";

interface DeleteStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useDeleteModal = create<DeleteStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({isOpen: false}),
}))

export default useDeleteModal;