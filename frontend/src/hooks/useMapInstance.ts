import maplibregl, { type Map, type StyleSpecification } from 'maplibre-gl'
import { useRef, useEffect, useCallback } from 'react'

// Using OpenFreeMap — no API key required
const MAP_STYLE =
  'https://tiles.openfreemap.org/styles/liberty' as unknown as StyleSpecification

interface UseMapInstanceOptions {
  containerRef: React.RefObject<HTMLDivElement | null>;
  initialCenter?: [number, number];
  initialZoom?: number;
  initialPitch?: number;
  initialBearing?: number;
}

interface UseMapInstanceReturn {
  mapRef: React.MutableRefObject<Map | null>;
  isReady: boolean;
}

export function useMapInstance({
  containerRef,
  initialCenter = [121.0, 24.0],
  initialZoom = 7,
  initialPitch = 45,
  initialBearing = 0,
}: UseMapInstanceOptions): UseMapInstanceReturn {
  const mapRef = useRef<Map | null>(null)
  const isReadyRef = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container || mapRef.current) {
      return
    }

    const map = new maplibregl.Map({
      container,
      style: MAP_STYLE,
      center: initialCenter,
      zoom: initialZoom,
      pitch: initialPitch,
      bearing: initialBearing,
      canvasContextAttributes: {
        antialias: true,
      },
    })

    // Add navigation controls (zoom, rotation, compass, pitch)
    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right')
    // Scale bar
    map.addControl(new maplibregl.ScaleControl({ unit: 'metric' }), 'bottom-left')
    // Full screen
    map.addControl(new maplibregl.FullscreenControl(), 'top-right')

    map.on('load', () => {
      isReadyRef.current = true
    })

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
      isReadyRef.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isReady = isReadyRef.current

  return { mapRef, isReady }
}

/**
 * Reset pitch and bearing to default values.
 */
export function resetMapView(map: Map): void {
  map.easeTo({ pitch: 45, bearing: 0, duration: 600 })
}

export { useCallback }
