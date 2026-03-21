import type { StateCreator } from 'zustand'

export interface PeaksSlice {
  checkedPeakIds: string[];
  userName: string;
  actions: {
    togglePeak: (id: string) => void;
    checkAllInCategory: (ids: string[]) => void;
    uncheckAllInCategory: (ids: string[]) => void;
    clearAll: () => void;
    setUserName: (name: string) => void;
  };
}

const createPeaksSlice: StateCreator<PeaksSlice> = (set) => {
  return {
    checkedPeakIds: [],
    userName: '',
    actions: {
      togglePeak: (id: string) =>
        set((state) => {
          const exists = state.checkedPeakIds.includes(id)
          return {
            ...state,
            checkedPeakIds: exists
              ? state.checkedPeakIds.filter((pid) => pid !== id)
              : [...state.checkedPeakIds, id],
          }
        }),
      checkAllInCategory: (ids: string[]) =>
        set((state) => {
          const current = new Set(state.checkedPeakIds)
          for (const id of ids) {
            current.add(id)
          }
          return { ...state, checkedPeakIds: [...current] }
        }),
      uncheckAllInCategory: (ids: string[]) =>
        set((state) => {
          const toRemove = new Set(ids)
          return {
            ...state,
            checkedPeakIds: state.checkedPeakIds.filter((pid) => !toRemove.has(pid)),
          }
        }),
      clearAll: () =>
        set((state) => {
          return { ...state, checkedPeakIds: [], userName: '' }
        }),
      setUserName: (name: string) =>
        set((state) => {
          return { ...state, userName: name }
        }),
    },
  }
}

export default createPeaksSlice
