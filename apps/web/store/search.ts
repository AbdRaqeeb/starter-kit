import { create } from 'zustand';

export interface SearchStore {
    open: boolean;
    setOpen: (open: boolean) => void;
    toggle: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
    open: false,
    setOpen: (open) => set({ open }),
    toggle: () => set((state) => ({ open: !state.open })),
}));
