import { northFirstSection } from '@/constants/hiking-trails/northFirstSection'
import { southSecondSection } from '@/constants/hiking-trails/southSecondSection'
import { yushanGroup } from '@/constants/hiking-trails/yushanGroup'
import type { Trail } from '@/model/hikingTrail'

export const HIKING_TRAILS: Trail[] = [
  southSecondSection,
  northFirstSection,
  yushanGroup
]

export const HIKING_TRAIL_MAP: Record<string, Trail> = Object.fromEntries(
  HIKING_TRAILS.map(trail => [trail.id, trail])
)
