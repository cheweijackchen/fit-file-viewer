import type { Map } from 'maplibre-gl'
import { BaseMapMode } from '@/constants/vectorMap'

export type { BaseMapMode }

// ---------------------------------------------------------------------------
// BaseMap definitions
// ---------------------------------------------------------------------------

export interface BaseMapOption {
  id: BaseMapMode;
  label: string;
}

export const BASE_MAP_OPTIONS: BaseMapOption[] = [
  { id: BaseMapMode.Standard, label: '標準' },
  { id: BaseMapMode.Satellite, label: '衛星' },
  { id: BaseMapMode.Hybrid, label: '混合' },
]

export const DEFAULT_BASE_MAP: BaseMapMode = BaseMapMode.Standard

export const VECTOR_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty'

const SATELLITE_TILES =
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'

const SATELLITE_SOURCE_ID = 'esri-satellite'
const SATELLITE_LAYER_ID = 'esri-satellite-layer'
const TERRAIN_SOURCE_ID = 'terrain-dem'
const HILLSHADE_LAYER_ID = 'terrain-hillshade'
const MOUNTAIN_PEAK_LAYER_ID = 'natural-peak'

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
// Satellite layer — ensure once, toggle visibility thereafter
// ---------------------------------------------------------------------------

function ensureSatelliteLayer(map: Map): void {
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
// Mountain peak layer
// ---------------------------------------------------------------------------

function findVectorSourceId(map: Map): string | undefined {
  const { layers, sources } = map.getStyle()
  // Reuse the same vector source as the existing POI layers
  const poiLayer = layers.find(l => l.id.startsWith('poi_'))
  if (poiLayer && 'source' in poiLayer) {
    return poiLayer.source as string
  }
  // Fallback: any vector source
  return Object.keys(sources).find((id) => sources[id].type === 'vector')
}

function ensureMountainPeakLayer(map: Map): void {
  if (map.getLayer(MOUNTAIN_PEAK_LAYER_ID)) {
    return
  }
  const sourceId = findVectorSourceId(map)
  if (!sourceId) {
    return
  }
  map.addLayer({
    id: MOUNTAIN_PEAK_LAYER_ID,
    type: 'symbol',
    source: sourceId,
    'source-layer': 'mountain_peak',
    minzoom: 10,
    layout: {
      'icon-image': 'triangle',
      'icon-size': 0.8,
      'icon-anchor': 'bottom',
      'text-field': [
        'format',
        ['get', 'name'], {},
        '\n', {},
        ['case', ['has', 'ele'], ['concat', ['get', 'ele'], 'm'], ''],
        { 'font-scale': 0.85 },
      ],
      'text-size': 14,
      'text-anchor': 'top',
      'text-offset': [0, 0.2],
      'text-optional': true,
    },
    paint: {
      'icon-color': '#5B3F20',
      'text-color': '#5B3F20',
      'text-halo-color': 'white',
      'text-halo-width': 1.5,
    },
  })
}

function setSatelliteVisibility(map: Map, visible: boolean): void {
  if (visible) {
    ensureSatelliteLayer(map)
  }
  if (map.getLayer(SATELLITE_LAYER_ID)) {
    map.setLayoutProperty(SATELLITE_LAYER_ID, 'visibility', visible ? 'visible' : 'none')
  }
}

// ---------------------------------------------------------------------------
// Terrain & hillshade
// ---------------------------------------------------------------------------

export interface TerrainOptions {
  terrain: boolean;
  hillshade: boolean;
}

function ensureTerrainSource(map: Map): void {
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
}

function applyTerrainInternal(map: Map, { terrain, hillshade }: TerrainOptions): void {
  const currentTerrain = map.getTerrain()

  if (terrain) {
    ensureTerrainSource(map)
    if (!currentTerrain) {
      map.setTerrain({ source: TERRAIN_SOURCE_ID, exaggeration: 1.5 })
    }
  } else {
    if (currentTerrain) {
      map.setTerrain(null)
    }
  }

  if (hillshade) {
    ensureTerrainSource(map)
    if (!map.getLayer(HILLSHADE_LAYER_ID)) {
      // Insert hillshade above landcover/landuse but below roads and labels.
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

// ---------------------------------------------------------------------------
// Base map mode — handles satellite + vector layer visibility
// ---------------------------------------------------------------------------

function applyBaseMapModeInternal(map: Map, mode: BaseMapMode): void {
  switch (mode) {
    case BaseMapMode.Satellite: {
      ensureMountainPeakLayer(map)
      setSatelliteVisibility(map, true)
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
        if (layer.id === MOUNTAIN_PEAK_LAYER_ID) {
          continue
        }
        map.setLayoutProperty(layer.id, 'visibility', 'none')
      }
      // Hide peaks on pure satellite — they'd clutter the imagery
      map.setLayoutProperty(MOUNTAIN_PEAK_LAYER_ID, 'visibility', 'none')
      break
    }

    case BaseMapMode.Hybrid: {
      ensureMountainPeakLayer(map)
      setSatelliteVisibility(map, true)
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
        if (layer.id === MOUNTAIN_PEAK_LAYER_ID) {
          continue
        }
        // null means no rule matched — default to visible so that switching
        // from satellite (where everything is hidden) correctly restores
        // road and label layers that are not covered by any rule.
        const visible = resolveVisibility(layer.id, HYBRID_LAYER_RULES) ?? true
        map.setLayoutProperty(layer.id, 'visibility', visible ? 'visible' : 'none')
      }
      map.setLayoutProperty(MOUNTAIN_PEAK_LAYER_ID, 'visibility', 'visible')
      break
    }

    case BaseMapMode.Standard:
    default: {
      ensureMountainPeakLayer(map)
      setSatelliteVisibility(map, false)
      for (const layer of map.getStyle().layers) {
        if (ALWAYS_VISIBLE.test(layer.id)) {
          continue
        }
        if (layer.id === HILLSHADE_LAYER_ID) {
          continue
        }
        if (layer.id === MOUNTAIN_PEAK_LAYER_ID) {
          continue
        }
        map.setLayoutProperty(layer.id, 'visibility', 'visible')
      }
      map.setLayoutProperty(MOUNTAIN_PEAK_LAYER_ID, 'visibility', 'visible')
      break
    }
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function applyBaseMapMode(map: Map, mode: BaseMapMode): void {
  try {
    applyBaseMapModeInternal(map, mode)
  } catch (err) {
    console.warn('[applyBaseMapMode] ', err)
  }
}

export function applyTerrain(map: Map, options: TerrainOptions): void {
  try {
    applyTerrainInternal(map, options)
  } catch (err) {
    console.warn('[applyTerrain] ', err)
  }
}
