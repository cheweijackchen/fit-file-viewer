import type { NodePositions } from '@/model/trailPositions'
import { northFirstSectionPositions } from './north-first-section-positions'
import { southSecondSectionPositions } from './south-second-section-positions'

const TRAIL_POSITIONS_MAP: Record<string, NodePositions> = {
  'south-second-section': southSecondSectionPositions,
  'north-first-section': northFirstSectionPositions,
}

export function getTrailPositions(trailId: string): NodePositions | undefined {
  return TRAIL_POSITIONS_MAP[trailId]
}
