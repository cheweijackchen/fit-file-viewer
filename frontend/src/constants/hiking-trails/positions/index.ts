import type { NodePositions } from '@/model/trailPositions'
import { beidawuPositions } from './beidawu-positions'
import { ganzhuowanGroupPositions } from './ganzhuowan-group-positions'
import { hehuanGroupPositions } from './hehuan-group-positions'
import { holyRidgePositions } from './holy-ridge-positions'
import { jundaXiluandaPositions } from './junda-xiluanda-positions'
import { maboTraversePositions } from './mabo-traverse-positions'
import { nenggaoGroupPositions } from './nenggao-group-positions'
import { northFirstSectionPositions } from './north-first-section-positions'

import { northSecondSectionPositions } from './north-second-section-positions'
import { qicaiLakePositions } from './qicai-lake-positions'
import { qilaiGroupPositions } from './qilai-group-positions'
import { southFirstSectionPositions } from './south-first-section-positions'
import { southSecondSectionPositions } from './south-second-section-positions'
import { xinkangTraversePositions } from './xinkang-traverse-positions'
import { xueshanGroupPositions } from './xueshan-group-positions'
import { yushanGroupPositions } from './yushan-group-positions'
import { zhonghengFourSpicyPositions } from './zhongheng-4-spicy-positions'

const TRAIL_POSITIONS_MAP: Record<string, NodePositions> = {
  'south-second-section': southSecondSectionPositions,
  'north-first-section': northFirstSectionPositions,
  'yushan-group': yushanGroupPositions,
  'nenggao-group': nenggaoGroupPositions,
  'ganzhuowan-group': ganzhuowanGroupPositions,
  'north-second-section': northSecondSectionPositions,
  'zhongheng-4-spicy': zhonghengFourSpicyPositions,
  'south-first-section': southFirstSectionPositions,
  'xinkang-traverse': xinkangTraversePositions,
  'xueshan-group': xueshanGroupPositions,
  'hehuan-group': hehuanGroupPositions,
  'qilai-group': qilaiGroupPositions,
  'junda-xiluanda': jundaXiluandaPositions,
  'qicai-lake': qicaiLakePositions,
  'beidawu': beidawuPositions,
  'mabo-traverse': maboTraversePositions,
  'holy-ridge': holyRidgePositions,
}

export function getTrailPositions(trailId: string): NodePositions | undefined {
  return TRAIL_POSITIONS_MAP[trailId]
}
