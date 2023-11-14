import { create } from 'zustand';

type Store = {
  selectedBox: number | null;
  setSelectedBox: (box: number | null) => void;
  openingBox: boolean;
  setOpeningBox: (box: number) => void;
  reset: () => void; // Add reset function
};

export const selectedData = create<Store>((set) => ({
  selectedBox: null,
  setSelectedBox: (box) => set(() => ({ selectedBox: box })),
  openingBox: false,
  setOpeningBox: (box) => set(() => ({ openingBox: true })),
  reset: () => set({ selectedBox: null, openingBox: false }), // Reset function
}));

type Config = {
  config: object | null;
  setConfigData: (config: object) => void;
};

export const setConfig = create<Config>((set) => ({
  config: null,
  setConfigData: (config) => set(() => ({ config: config })),
}));