import type { StateCreator } from 'zustand'

export interface FitDataSlice {
  fileName: string | null;
  fitData: object | null;
  setFileName: (name: string) => void;
  setFitData: (data: object) => void;
}

const createFitDataSlice: StateCreator<FitDataSlice> = (set, get) => {
  return {
    fileName: null,
    fitData: null,
    setFileName: (name: string) =>
      set((state) => {
        return { ...state, fileName: name }
      }),
    setFitData: (data: object) =>
      set((state) => {
        return { ...state, fitData: data }
      }),
  }
}

export default createFitDataSlice
