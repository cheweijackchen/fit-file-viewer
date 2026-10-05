import { get, set, del } from 'idb-keyval'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { StateStorage } from 'zustand/middleware'
import createHikingTrailSlice, { type HikingTrailSlice } from './hikingTrailSlice'
import { createSelectors } from '../utils'

const idbStorage: StateStorage = {
  getItem: async (name) => (await get<string>(name)) ?? null,
  setItem: (name, value) => set(name, value),
  removeItem: (name) => del(name),
}

const useHikingTrailStoreBase = create<HikingTrailSlice>()(
  persist(
    (...rest) => ({
      ...createHikingTrailSlice(...rest),
    }),
    {
      name: 'hiking-trail-planner',
      storage: createJSONStorage(() => idbStorage),
      partialize: (state) => ({ plans: state.plans }),
    },
  ),
)

export const useHikingTrailStore = createSelectors(useHikingTrailStoreBase)

export const useHikingTrailActions = useHikingTrailStore.use.actions
