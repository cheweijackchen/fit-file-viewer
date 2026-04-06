import { southSecondSection } from '@/constants/hiking-trails/southSecondSection'
import type { Trail } from '@/model/hikingTrail'
import { northFirstSection } from './hiking-trails/northFirstSection'

export const HIKING_TRAILS: Trail[] = [
  southSecondSection,
  northFirstSection
]

export const HIKING_TRAIL_MAP: Record<string, Trail> = Object.fromEntries(
  HIKING_TRAILS.map(trail => [trail.id, trail])
)
