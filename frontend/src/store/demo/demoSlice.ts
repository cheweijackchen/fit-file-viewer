import type { StateCreator } from 'zustand'

export interface DemoSlice {
  isNavbarCollapse: boolean;
  openNavbar: () => void;
  closeNavbar: () => void;
  toggleNavbar: () => void;
}

const createDemoSlice: StateCreator<DemoSlice> = (set) => {
  return {
    isNavbarCollapse: true,
    openNavbar: () =>
      set((state) => {
        return { ...state, isNavbarCollapse: true }
      }),
    closeNavbar: () =>
      set((state) => {
        return { ...state, isNavbarCollapse: false }
      }),
    toggleNavbar: () =>
      set((state) => {
        return { ...state, isNavbarCollapse: !state.isNavbarCollapse }
      }),
  }
}

export default createDemoSlice