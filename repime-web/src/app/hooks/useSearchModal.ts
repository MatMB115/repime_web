import { create } from "zustand";

interface SearchModelStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useSearchModal = create<SearchModelStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({isOpen: false}),
}))

export default useSearchModal;