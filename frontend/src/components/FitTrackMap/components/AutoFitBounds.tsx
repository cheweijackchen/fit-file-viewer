import type { LatLngBounds } from 'leaflet'
import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { FIT_BOUNDS_PADDING } from '@/constants/map'

export interface AutoFitBoundsProps {
  bounds: LatLngBounds;
}

/**
 * Adjust the map view to fit the given bounds
 * to make sure all specified bounds are visible.
 * Should be used inside a MapContainer.
 */
export function AutoFitBounds({ bounds }: AutoFitBoundsProps) {
  const map = useMap()

  useEffect(() => {
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [FIT_BOUNDS_PADDING, FIT_BOUNDS_PADDING] })
    }
  }, [map, bounds])

  return null
}
