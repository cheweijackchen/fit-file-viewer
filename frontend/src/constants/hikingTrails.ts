import { beidawu } from '@/constants/hiking-trails/beidawu'
import { ganzhuowanGroup } from '@/constants/hiking-trails/ganzhuowanGroup'
import { hehuanGroup } from '@/constants/hiking-trails/hehuanGroup'
import { holyRidge } from '@/constants/hiking-trails/holyRidge'
import { jundaXiluanda } from '@/constants/hiking-trails/jundaXiluanda'
import { maboTraverse } from '@/constants/hiking-trails/maboTraverse'
import { nenggaoGroup } from '@/constants/hiking-trails/nenggaoGroup'
import { northFirstSection } from '@/constants/hiking-trails/northFirstSection'
import { northSecondSection } from '@/constants/hiking-trails/northSecondSection'
import { qicaiLake } from '@/constants/hiking-trails/qicaiLake'
import { qilaiEastRidge } from '@/constants/hiking-trails/qilaiEastRidge'
import { qilaiGroup } from '@/constants/hiking-trails/qilaiGroup'
import { southFirstSection } from '@/constants/hiking-trails/southFirstSection'
import { southSecondSection } from '@/constants/hiking-trails/southSecondSection'
import { southThirdSection } from '@/constants/hiking-trails/southThirdSection'
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
  xueshanGroup,
  hehuanGroup,
  qilaiGroup,
  jundaXiluanda,
  qicaiLake,
  beidawu,
  maboTraverse,
  holyRidge,
  qilaiEastRidge,
  southThirdSection
]

export const HIKING_TRAIL_MAP: Record<string, Trail> = Object.fromEntries(
  HIKING_TRAILS.map(trail => [trail.id, trail])
)
