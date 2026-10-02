import { ganzhuowanGroup } from '@/constants/hiking-trails/ganzhuowanGroup'
import { nenggaoGroup } from '@/constants/hiking-trails/nenggaoGroup'
import { northFirstSection } from '@/constants/hiking-trails/northFirstSection'
import { northSecondSection } from '@/constants/hiking-trails/northSecondSection'
import { southFirstSection } from '@/constants/hiking-trails/southFirstSection'
import { southSecondSection } from '@/constants/hiking-trails/southSecondSection'
import { xinkangTraverse } from '@/constants/hiking-trails/xinkangTraverse'
import { xueshanGroup } from '@/constants/hiking-trails/xueshanGroup'
import { yushanGroup } from '@/constants/hiking-trails/yushanGroup'
import { zhonghengFourSpicy } from '@/constants/hiking-trails/zhonghengFourSpicy'
import type { Trail } from '@/model/hikingTrail'

export const HIKING_TRAILS: Trail[] = [
  southSecondSection,
  northFirstSection,
  yushanGroup,
  nenggaoGroup,
  ganzhuowanGroup,
  northSecondSection,
  zhonghengFourSpicy,
  southFirstSection,
  xinkangTraverse,
  xueshanGroup
]

export const HIKING_TRAIL_MAP: Record<string, Trail> = Object.fromEntries(
  HIKING_TRAILS.map(trail => [trail.id, trail])
)
