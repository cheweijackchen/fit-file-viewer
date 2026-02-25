import type { Map } from 'maplibre-gl'

// ---------------------------------------------------------------------------
// BaseMap definitions
// ---------------------------------------------------------------------------

export type BaseMapMode = 'standard' | 'satellite' | 'hybrid'

export interface BaseMapOption {
  id: BaseMapMode;
  label: string;
}

export const BASE_MAP_OPTIONS: BaseMapOption[] = [
  { id: 'standard', label: '標準' },
  { id: 'satellite', label: '衛星' },
  { id: 'hybrid', label: '混合' },
]

export const DEFAULT_BASE_MAP: BaseMapMode = 'standard'

export const VECTOR_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty'

const SATELLITE_TILES =
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'

const SATELLITE_SOURCE_ID = 'esri-satellite'
const SATELLITE_LAYER_ID = 'esri-satellite-layer'
const TERRAIN_SOURCE_ID = 'terrain-dem'
const HILLSHADE_LAYER_ID = 'terrain-hillshade'

const ALWAYS_VISIBLE = /^gpx-/i

// ---------------------------------------------------------------------------
// Layer visibility rules
// ---------------------------------------------------------------------------

const MATCH_TYPE = {
  EXACT: 'exact',
  PREFIX: 'prefix',
} as const

type MatchType = typeof MATCH_TYPE[keyof typeof MATCH_TYPE]

interface LayerRule {
  match: string;
  type: MatchType;
  visible: boolean;
}

const HYBRID_LAYER_RULES: LayerRule[] = [
  { match: 'background', type: MATCH_TYPE.EXACT, visible: false },
  { match: 'landcover', type: MATCH_TYPE.PREFIX, visible: false },
  { match: 'landuse', type: MATCH_TYPE.PREFIX, visible: false },
  { match: 'park', type: MATCH_TYPE.PREFIX, visible: false },
  { match: 'aeroway', type: MATCH_TYPE.PREFIX, visible: false },
  { match: 'building', type: MATCH_TYPE.PREFIX, visible: false },
  { match: 'hillshade', type: MATCH_TYPE.PREFIX, visible: false },
  { match: 'waterway', type: MATCH_TYPE.PREFIX, visible: true },
  { match: 'water', type: MATCH_TYPE.EXACT, visible: false },
]

// Returns null when no rule matches — caller should leave the layer untouched.
function resolveVisibility(layerId: string, rules: LayerRule[]): boolean | null {
  let result: boolean | null = null
  for (const rule of rules) {
    if (rule.type === MATCH_TYPE.EXACT && layerId === rule.match) {
      result = rule.visible
    } else if (rule.type === MATCH_TYPE.PREFIX && layerId.startsWith(rule.match)) {
      result = rule.visible
    }
  }
  return result
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
interface TerrainOptions {
  terrain: boolean;
  hillshade: boolean;
}

function ensureTerrain(map: Map, { terrain, hillshade }: TerrainOptions): void {
  if (terrain) {
    if (!map.getSource(TERRAIN_SOURCE_ID)) {
      map.addSource(TERRAIN_SOURCE_ID, {
        type: 'raster-dem',
        encoding: 'terrarium',
        tiles: [
          'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png',
        ],
        tileSize: 256,
        maxzoom: 15,
        attribution: 'Terrain Mapzen / AWS',
      })
    }
    map.setTerrain({ source: TERRAIN_SOURCE_ID, exaggeration: 1.5 })
  } else {
    map.setTerrain(null)
  }

  if (hillshade) {
    if (!map.getLayer(HILLSHADE_LAYER_ID)) {
      // Insert hillshade above landcover/landuse but below roads and labels.
      // Find the first road layer as the insertion point.
      const firstRoadLayer = map.getStyle().layers.find((l) =>
        l.id.startsWith('road') || l.id.startsWith('tunnel') || l.id.startsWith('bridge'),
      )
      map.addLayer(
        {
          id: HILLSHADE_LAYER_ID,
          type: 'hillshade',
          source: TERRAIN_SOURCE_ID,
          paint: {
            'hillshade-exaggeration': 0.5,
            'hillshade-shadow-color': '#000000',
            'hillshade-highlight-color': '#ffffff',
            'hillshade-accent-color': '#000000',
            'hillshade-illumination-anchor': 'viewport',
          },
        },
        firstRoadLayer?.id,
      )
    } else {
      map.setLayoutProperty(HILLSHADE_LAYER_ID, 'visibility', 'visible')
    }
  } else {
    if (map.getLayer(HILLSHADE_LAYER_ID)) {
      map.setLayoutProperty(HILLSHADE_LAYER_ID, 'visibility', 'none')
    }
  }
}

function setSatelliteLayer(map: Map, visible: boolean): void {
  if (visible) {
    if (!map.getSource(SATELLITE_SOURCE_ID)) {
      map.addSource(SATELLITE_SOURCE_ID, {
        type: 'raster',
        tiles: [SATELLITE_TILES],
        tileSize: 256,
        attribution: 'Tiles © Esri',
        maxzoom: 19,
      })
    }
    if (!map.getLayer(SATELLITE_LAYER_ID)) {
      const firstLayerId = map.getStyle().layers[0]?.id
      map.addLayer(
        { id: SATELLITE_LAYER_ID, type: 'raster', source: SATELLITE_SOURCE_ID },
        firstLayerId,
      )
    }
  } else {
    if (map.getLayer(SATELLITE_LAYER_ID)) {
      map.removeLayer(SATELLITE_LAYER_ID)
    }
    if (map.getSource(SATELLITE_SOURCE_ID)) {
      map.removeSource(SATELLITE_SOURCE_ID)
    }
  }
}

// ---------------------------------------------------------------------------
// Core: unconditionally apply a mode
// ---------------------------------------------------------------------------

interface ApplyModeOptions {
  showTerrain: boolean;
}

function applyMode(map: Map, mode: BaseMapMode, { showTerrain }: ApplyModeOptions): void {
  switch (mode) {
    case 'satellite': {
      setSatelliteLayer(map, true)
      for (const layer of map.getStyle().layers) {
        if (ALWAYS_VISIBLE.test(layer.id)) {
          continue
        }
        if (layer.id === SATELLITE_LAYER_ID) {
          continue
        }
        if (layer.id === HILLSHADE_LAYER_ID) {
          continue
        }
        map.setLayoutProperty(layer.id, 'visibility', 'none')
      }
      ensureTerrain(map, { terrain: showTerrain, hillshade: false })
      break
    }

    case 'hybrid': {
      setSatelliteLayer(map, true)
      for (const layer of map.getStyle().layers) {
        if (ALWAYS_VISIBLE.test(layer.id)) {
          continue
        }
        if (layer.id === SATELLITE_LAYER_ID) {
          continue
        }
        if (layer.id === HILLSHADE_LAYER_ID) {
          continue
        }
        // null means no rule matched — default to visible so that switching
        // from satellite (where everything is hidden) correctly restores
        // road and label layers that are not covered by any rule.
        const visible = resolveVisibility(layer.id, HYBRID_LAYER_RULES) ?? true
        map.setLayoutProperty(layer.id, 'visibility', visible ? 'visible' : 'none')
      }
      ensureTerrain(map, { terrain: showTerrain, hillshade: false })
      break
    }

    case 'standard':
    default: {
      setSatelliteLayer(map, false)
      for (const layer of map.getStyle().layers) {
        if (ALWAYS_VISIBLE.test(layer.id)) {
          continue
        }
        if (layer.id === HILLSHADE_LAYER_ID) {
          continue
        }
        map.setLayoutProperty(layer.id, 'visibility', 'visible')
      }
      ensureTerrain(map, { terrain: showTerrain, hillshade: showTerrain })
      break
    }
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function applyBaseMap(
  map: Map,
  mode: BaseMapMode,
  options: Partial<ApplyModeOptions> = {},
): void {
  try {
    applyMode(map, mode, { showTerrain: true, ...options })
  } catch (err) {
    console.warn('[applyBaseMap] ', err)
  }
}
