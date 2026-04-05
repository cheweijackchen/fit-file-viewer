export const TrailNodeType = {
  Peak: 'peak',
  Hut: 'hut',
  Camp: 'camp',
  WaterSource: 'water-source',
  Fork: 'fork',
  Other: 'other'
} as const

export type TrailNodeType = typeof TrailNodeType[keyof typeof TrailNodeType]
