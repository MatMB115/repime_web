import { create } from "zustand";

interface PlaceModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    id: number;
}

const usePlaceModal = create<PlaceModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({isOpen: false}),
    id: 0
}))

export default usePlaceModal;