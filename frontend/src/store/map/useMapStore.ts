import { create } from 'zustand'
import type { ParsedTrack } from '@/model/gpx'
import { createSelectors } from '../utils'

interface MapStoreState {
  track: ParsedTrack | null;
  actions: {
    setTrack: (track: ParsedTrack | null) => void;
  };
}

const useMapStoreBase = create<MapStoreState>((set) => ({
  track: null,
  actions: {
    setTrack: (track) => set((state) => ({
      ...state,
      track 
    })),
  },
}))

export const useMapStore = createSelectors(useMapStoreBase)

export const useMapActions = useMapStore.use.actions
