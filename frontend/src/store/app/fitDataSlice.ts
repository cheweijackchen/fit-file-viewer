import type { StateCreator } from 'zustand'
import type { ParsedFit } from '@/model/fitParser'

export interface FitDataSlice {
  fileName: string | undefined;
  fitData: ParsedFit | undefined;
  actions: {
    setFileName: (name: string) => void;
    setFitData: (data: ParsedFit) => void;
  };
}

const createFitDataSlice: StateCreator<FitDataSlice> = (set) => {
  return {
    fileName: undefined,
    fitData: undefined,
    actions: {
      setFileName: (name: string) =>
        set((state) => {
          return { ...state, fileName: name }
        }),
      setFitData: (data: ParsedFit) =>
        set((state) => {
          return { ...state, fitData: data }
        }),
    }
  }
}

export default createFitDataSlice
