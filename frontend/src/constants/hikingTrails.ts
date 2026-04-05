import { southSecondSection } from '@/constants/hiking-trails/southSecondSection'
import type { Trail } from '@/model/hikingTrail'

export const HIKING_TRAILS: Trail[] = [
  southSecondSection,
]

export const HIKING_TRAIL_MAP: Record<string, Trail> = Object.fromEntries(
  HIKING_TRAILS.map(trail => [trail.id, trail])
)
