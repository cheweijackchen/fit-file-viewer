import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import createPeaksSlice, { type PeaksSlice } from './peaksSlice'
import { createSelectors } from '../utils'

const usePeaksStoreBase = create<PeaksSlice>()(
  persist(
    (...rest) => ({
      ...createPeaksSlice(...rest),
    }),
    {
      name: 'peaks-tracker',
      partialize: (state) => ({
        checkedPeakIds: state.checkedPeakIds,
        userName: state.userName,
      }),
    },
  ),
)

export const usePeaksStore = createSelectors(usePeaksStoreBase)

export const usePeaksActions = usePeaksStore.use.actions
