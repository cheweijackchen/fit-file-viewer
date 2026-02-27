import type { Map } from 'maplibre-gl'
import { useEffect, useRef } from 'react'
import {
  trackPointsToLineString,
  trackPointsToPointCollection,
} from '@/lib/gpxToGeoJson'
import type { TrackPoint } from '@/model/gpx'

const SOURCE_LINE = 'gpx-track-line'
const SOURCE_POINTS = 'gpx-track-points'
const LAYER_LINE = 'gpx-track-line-layer'
const LAYER_LINE_SHADOW = 'gpx-track-line-shadow'
const LAYER_POINTS = 'gpx-track-points-layer'

interface TrackLayerProps {
  map: Map | null;
  points: TrackPoint[];
  isMapReady: boolean;
  /** Highlighted point index from elevation profile hover */
  highlightedIndex: number | null;
}

export function TrackLayer({
  map,
  points,
  isMapReady,
  highlightedIndex,
}: TrackLayerProps) {
  const addedRef = useRef(false)

  // Add or update GeoJSON sources and layers when points change
  useEffect(() => {
    if (!map || !isMapReady || points.length === 0) {
      return
    }

    const lineFeature = trackPointsToLineString(points)
    const pointCollection = trackPointsToPointCollection(points)

    if (!addedRef.current) {
      // --- Sources ---
      map.addSource(SOURCE_LINE, { type: 'geojson', data: lineFeature })
      map.addSource(SOURCE_POINTS, { type: 'geojson', data: pointCollection })

      // --- Main track line ---
      map.addLayer({
        id: LAYER_LINE,
        type: 'line',
        source: SOURCE_LINE,
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': '#f97316',
          'line-width': 5,
        },
      })

      // --- Track points (invisible by default, shown on hover/highlight) ---
      map.addLayer({
        id: LAYER_POINTS,
        type: 'circle',
        source: SOURCE_POINTS,
        paint: {
          'circle-radius': 4,
          'circle-color': '#f97316',
        },
      })

      addedRef.current = true
    } else {
      // Update existing sources
      const lineSrc = map.getSource(SOURCE_LINE)
      const pointsSrc = map.getSource(SOURCE_POINTS)
      if (lineSrc?.type === 'geojson') {
        lineSrc.setData(lineFeature)
      }
      if (pointsSrc?.type === 'geojson') {
        pointsSrc.setData(pointCollection)
      }
    }
  }, [map, points, isMapReady])

  // Update highlighted point circle opacity via feature-state or filter
  useEffect(() => {
    if (!map || !addedRef.current) {
      return
    }

    if (highlightedIndex === null) {
      map.setPaintProperty(LAYER_POINTS, 'circle-opacity', 0)
    } else {
      map.setPaintProperty(LAYER_POINTS, 'circle-opacity', [
        'case',
        ['==', ['id'], highlightedIndex],
        1,
        0,
      ])
    }
  }, [map, highlightedIndex])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (!map) {
        return
      }
      const layers = [LAYER_POINTS, LAYER_LINE, LAYER_LINE_SHADOW]
      const sources = [SOURCE_LINE, SOURCE_POINTS]
      for (const layer of layers) {
        if (map.getLayer(layer)) {
          map.removeLayer(layer)
        }
      }
      for (const source of sources) {
        if (map.getSource(source)) {
          map.removeSource(source)
        }
      }
      addedRef.current = false
    }
  }, [map])

  return null
}
