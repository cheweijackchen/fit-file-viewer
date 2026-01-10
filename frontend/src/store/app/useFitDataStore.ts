import { create } from 'zustand'
import createFitDataSlice, { type FitDataSlice } from './fitDataSlice'

export const useFitDataStore = create<FitDataSlice>((...rest) => ({
  ...createFitDataSlice(...rest),
}))