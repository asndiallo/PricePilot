import { create } from "zustand";

export type ModalType = "prediction";

interface ModalData {
    value?: string;
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;    
    isOpen: boolean;
    onOpen: (type: ModalType) => void;
    onClose: () => void;
}

export const UseModalStore = create<ModalStore>((set) => ({
    type: null,
    isOpen: false,
    data: {},
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false }),
}));