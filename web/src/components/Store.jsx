import { create } from 'zustand';

export const selectedData = create((set) => ({
  selectedBox: null,
  setSelectedBox: (box) => set(() => ({ selectedBox: box })),
  openingBox: false,
  setOpeningBox: (box) => set(() => ({ openingBox: true })),
  reset: () => set({ selectedBox: null, openingBox: false }), // Reset function
}));

export const setConfig = create((set) => ({
  config: null,
  setConfigData: (config) => set(() => ({ config: config })),
}));