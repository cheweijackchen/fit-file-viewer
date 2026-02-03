import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

export interface ZoomMonitorProps {
  onZoomChange: (zoom: number) => void;
}

/**
 * Watch the map zoom level changes.
 * Should be used inside a MapContainer.
 */
export function ZoomMonitor({ onZoomChange }: ZoomMonitorProps) {
  const map = useMap()

  useEffect(() => {
    const handleZoom = () => {
      onZoomChange(map.getZoom())
    }

    // Sync initial zoom level
    onZoomChange(map.getZoom())

    map.on('zoomend', handleZoom)
    return () => {
      map.off('zoomend', handleZoom)
    }
  }, [map, onZoomChange])

  return null
}
