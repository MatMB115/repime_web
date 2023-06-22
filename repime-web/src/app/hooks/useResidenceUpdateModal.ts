import { create } from "zustand";

interface ResidenceUpdateModalStore {
    isOpen: boolean;
    residenceId: Number | null;
    onOpen: () => void;
    onClose: () => void;
    setResidenceId: (id: Number) => void;
}

const useResidenceUpdateModal = create<ResidenceUpdateModalStore>((set) => ({
    isOpen: false,
    residenceId: null,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({isOpen: false}),
    setResidenceId: (id: Number) => set({ residenceId: Number(id) }),
}))

export default useResidenceUpdateModal;