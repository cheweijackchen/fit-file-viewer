import maplibregl, { type Map } from 'maplibre-gl'
import { useEffect } from 'react'
import type { TrackPoint } from '@/model/gpx'

const PADDING = 80 // px

/**
 * Automatically flies the map to fit all track points into view.
 * Triggered whenever `points` changes and the map is ready.
 */
export function useTrackFitBounds(
  map: Map | null,
  points: TrackPoint[],
  isMapReady: boolean,
): void {
  useEffect(() => {
    if (!map || !isMapReady || points.length === 0) {
      return
    }

    const bounds = new maplibregl.LngLatBounds()
    for (const p of points) {
      bounds.extend([p.lon, p.lat])
    }

    map.fitBounds(bounds, {
      padding: PADDING,
      pitch: 50,
      duration: 1200,
    })
  }, [map, points, isMapReady])
}
