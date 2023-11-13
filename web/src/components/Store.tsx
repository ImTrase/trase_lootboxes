import { create } from 'zustand';

type Store = {
  selectedBox: number | null;
  setSelectedBox: (box: number | null) => void;
};

export const selectedData = create<Store>((set) => ({
  selectedBox: null,
  setSelectedBox: (box) => set(() => ({ selectedBox: box })),
}));