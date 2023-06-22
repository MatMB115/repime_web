import { create } from "zustand";

interface ResidenceModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useResidenceModal = create<ResidenceModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({isOpen: false}),
}))

export default useResidenceModal;