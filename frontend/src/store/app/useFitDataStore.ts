import { create } from 'zustand'
import createFitDataSlice, { type FitDataSlice } from './fitDataSlice'
import { createSelectors } from '../utils'

export const useFitDataStoreBase = create<FitDataSlice>((...rest) => ({
  ...createFitDataSlice(...rest),
}))

export const useFitDataStore = createSelectors(useFitDataStoreBase)

export const useFitDataActions = useFitDataStore.use.actions
