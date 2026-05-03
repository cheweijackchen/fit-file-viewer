import type { NodePositions } from '@/model/trailPositions'
import { southSecondSectionPositions } from './south-second-section-positions'

const TRAIL_POSITIONS_MAP: Record<string, NodePositions> = {
  'south-second-section': southSecondSectionPositions,
}

export function getTrailPositions(trailId: string): NodePositions | undefined {
  return TRAIL_POSITIONS_MAP[trailId]
}
