import type { StateCreator } from 'zustand'
import type { HikingPlan } from '@/model/hikingTrail'

export interface HikingTrailSlice {
  plans: HikingPlan[];
  actions: {
    createPlan: (name: string, trailIds: string[]) => string;
    updatePlan: (planId: string, plan: HikingPlan) => void;
    deletePlan: (planId: string) => void;
  };
}

const createHikingTrailSlice: StateCreator<HikingTrailSlice> = (set) => ({
  plans: [],
  actions: {
    createPlan: (name, trailIds) => {
      const id = crypto.randomUUID()
      const now = Date.now()
      const newPlan: HikingPlan = {
        id,
        name,
        trailIds,
        paceMultiplier: 1.0,
        days: [],
        createdAt: now,
        updatedAt: now,
      }
      set((state) => ({ plans: [...state.plans, newPlan] }))
      return id
    },
    updatePlan: (planId, plan) =>
      set((state) => ({
        plans: state.plans.map((p) => (p.id === planId ? plan : p)),
      })),
    deletePlan: (planId) =>
      set((state) => ({
        plans: state.plans.filter((p) => p.id !== planId),
      })),
  },
})

export default createHikingTrailSlice
