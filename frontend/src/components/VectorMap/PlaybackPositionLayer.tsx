import { useMantineTheme } from '@mantine/core'
import { type GeoJSONSource, type Map } from 'maplibre-gl'
import { useEffect, useRef } from 'react'
import { LAYER_PLAYBACK, SOURCE_PLAYBACK } from '@/constants/vectorMap'

interface Props {
  map: Map | null;
  isMapReady: boolean;
  position: [number, number] | null; // [lon, lat]
}

function makePoint(position: [number, number] | null): GeoJSON.FeatureCollection {
  if (position === null) {
    return { type: 'FeatureCollection', features: [] }
  }
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: position },
        properties: {},
      },
    ],
  }
}

export function PlaybackPositionLayer({ map, isMapReady, position }: Props) {
  const theme = useMantineTheme()
  const addedRef = useRef(false)

  // Add source and layer once the map is ready
  useEffect(() => {
    if (!map || !isMapReady) {
      return
    }

    map.addSource(SOURCE_PLAYBACK, {
      type: 'geojson',
      data: makePoint(position),
    })

    map.addLayer({
      id: LAYER_PLAYBACK,
      type: 'circle',
      source: SOURCE_PLAYBACK,
      paint: {
        'circle-radius': 4,
        'circle-color': '#ffffff',
        'circle-stroke-width': 4,
        'circle-stroke-color': theme.colors.blue[5],
      },
    })

    addedRef.current = true

    return () => {
      try {
        if (map.getLayer(LAYER_PLAYBACK)) {
          map.removeLayer(LAYER_PLAYBACK)
        }
        if (map.getSource(SOURCE_PLAYBACK)) {
          map.removeSource(SOURCE_PLAYBACK)
        }
      } catch {
        // map may have been destroyed before cleanup runs
      }
      addedRef.current = false
    }
  }, [map, isMapReady]) // eslint-disable-line react-hooks/exhaustive-deps

  // Update position via setData whenever it changes
  useEffect(() => {
    if (!map || !addedRef.current) {
      return
    }
    const src = map.getSource(SOURCE_PLAYBACK) as GeoJSONSource | undefined
    src?.setData(makePoint(position))
  }, [map, position])

  return null
}
