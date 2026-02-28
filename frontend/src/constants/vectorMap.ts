// Base map modes
export const BaseMapMode = {
  Standard: 'standard',
  Satellite: 'satellite',
  Hybrid: 'hybrid',
} as const

export type BaseMapMode = typeof BaseMapMode[keyof typeof BaseMapMode]

// MapLibre GL source IDs
export const SOURCE_LINE = 'gpx-track-line'
export const SOURCE_POINTS = 'gpx-track-points'

// MapLibre GL layer IDs
export const LAYER_LINE = 'gpx-track-line-layer'
export const LAYER_LINE_SHADOW = 'gpx-track-line-shadow'
export const LAYER_POINTS = 'gpx-track-points-layer'
