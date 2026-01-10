import { create } from 'zustand'
import createDemoSlice, { type DemoSlice } from './demoSlice'

export const useDemoStore = create<DemoSlice>((...rest) => ({
  ...createDemoSlice(...rest),
}))
