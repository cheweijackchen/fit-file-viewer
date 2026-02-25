import type { Map } from 'maplibre-gl'
import { useCallback } from 'react'

// ---------------------------------------------------------------------------
// BaseMap definitions
// ---------------------------------------------------------------------------

export type BaseMapId = 'vector' | 'satellite' | 'satellite-roads'

export interface BaseMapOption {
  id: BaseMapId;
  label: string;
}

export const BASE_MAP_OPTIONS: BaseMapOption[] = [
  { id: 'vector', label: '地形圖' },
  { id: 'satellite', label: '衛星圖' },
  { id: 'satellite-roads', label: '衛星 + 道路' },
]

export const DEFAULT_BASE_MAP: BaseMapId = 'vector'

// Vector style served by OpenFreeMap — no API key required
export const VECTOR_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty'

// ESRI World Imagery — free, no API key, non-commercial use
const SATELLITE_TILES =
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'

const SATELLITE_SOURCE_ID = 'esri-satellite'
const SATELLITE_LAYER_ID = 'esri-satellite-layer'
const TERRAIN_SOURCE_ID = 'terrain-dem'

// Layers that should always stay visible regardless of mode (GPX track layers)
const ALWAYS_VISIBLE = /^gpx-/i

// ---------------------------------------------------------------------------
// Layer visibility rules for satellite modes
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

// Rules are evaluated in order — last match wins.
// This allows a specific EXACT rule to override a broader PREFIX rule.
// null result (no rule matched) means: leave the layer's original visibility.
const SATELLITE_ROADS_RULES: LayerRule[] = [
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
// Helper: add terrain DEM (idempotent)
// ---------------------------------------------------------------------------
function ensureTerrain(map: Map): void {
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
}

// ---------------------------------------------------------------------------
// Helper: add satellite raster source + layer at the very bottom
// ---------------------------------------------------------------------------
function addSatelliteLayer(map: Map): void {
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
}

// ---------------------------------------------------------------------------
// Helper: remove satellite raster layer + source
// ---------------------------------------------------------------------------
function removeSatelliteLayer(map: Map): void {
  if (map.getLayer(SATELLITE_LAYER_ID)) {
    map.removeLayer(SATELLITE_LAYER_ID)
  }
  if (map.getSource(SATELLITE_SOURCE_ID)) {
    map.removeSource(SATELLITE_SOURCE_ID)
  }
}

// ---------------------------------------------------------------------------
// Core: unconditionally apply a baseMap mode
// No diffing — always sets every layer to the correct visibility state.
// This ensures correctness on first load and after any mode switch.
// ---------------------------------------------------------------------------
function applyMode(map: Map, id: BaseMapId): void {
  if (id === 'vector') {
    removeSatelliteLayer(map)
    for (const layer of map.getStyle().layers) {
      if (ALWAYS_VISIBLE.test(layer.id)) {
        continue
      }
      map.setLayoutProperty(layer.id, 'visibility', 'visible')
    }
  } else if (id === 'satellite') {
    addSatelliteLayer(map)
    for (const layer of map.getStyle().layers) {
      if (ALWAYS_VISIBLE.test(layer.id)) {
        continue
      }
      if (layer.id === SATELLITE_LAYER_ID) {
        continue
      }
      map.setLayoutProperty(layer.id, 'visibility', 'none')
    }
  } else {
    // satellite-roads: satellite underlay + roads/labels on top,
    // with fine-grained control via SATELLITE_ROADS_RULES
    addSatelliteLayer(map)
    for (const layer of map.getStyle().layers) {
      if (ALWAYS_VISIBLE.test(layer.id)) {
        continue
      }
      if (layer.id === SATELLITE_LAYER_ID) {
        continue
      }
      const visible = resolveVisibility(layer.id, SATELLITE_ROADS_RULES)
      if (visible !== null) {
        map.setLayoutProperty(layer.id, 'visibility', visible ? 'visible' : 'none')
      }
    }
  }

  ensureTerrain(map)
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

interface UseBaseMapReturn {
  applyBaseMap: (map: Map, id: BaseMapId) => void;
}

export function useBaseMap(): UseBaseMapReturn {
  const applyBaseMap = useCallback((map: Map, id: BaseMapId) => {
    if (!map.isStyleLoaded()) {
      return
    }
    applyMode(map, id)
  }, [])

  return { applyBaseMap }
}
