import type { LngLatBounds, Map, MapMouseEvent } from 'maplibre-gl'
import { useEffect, useRef, useState } from 'react'

interface Props {
  map: Map | null;
  isMapReady: boolean;
}

function useMapDebugInfo(map: Map | null, isMapReady: boolean) {
  const initialised = useRef(false)
  const [zoom, setZoom] = useState(7)
  const [cursor, setCursor] = useState({
    lng: 0,
    lat: 0,
  })
  const [bounds, setBounds] = useState<LngLatBounds | null>(null)

  useEffect(() => {
    if (!map || !isMapReady) {
      return
    }

    function handleZoom() {
      setZoom(map!.getZoom())
    }

    function handleMousemove(e: MapMouseEvent) {
      setCursor({
        lng: e.lngLat.lng,
        lat: e.lngLat.lat,
      })
    }

    function handleMoveend() {
      setBounds(map!.getBounds())
    }

    if (!initialised.current) {
      initialised.current = true
      handleZoom()
      handleMoveend()
    }

    map.on('zoom', handleZoom)
    map.on('mousemove', handleMousemove)
    map.on('moveend', handleMoveend)

    return () => {
      map.off('zoom', handleZoom)
      map.off('mousemove', handleMousemove)
      map.off('moveend', handleMoveend)
    }
  }, [map, isMapReady])

  return {
    zoom,
    cursor,
    bounds,
  }
}

export function MapDebugOverlay({ map, isMapReady }: Props) {
  const { zoom, cursor, bounds } = useMapDebugInfo(map, isMapReady)

  if (!bounds) {
    return null
  }

  return (
    <div className="absolute top-2 left-2 z-10 rounded bg-black/70 px-3 py-2 font-mono text-xs text-white pointer-events-none">
      <div>Zoom: {zoom.toFixed(2)}</div>
      <div>Cursor: {cursor.lng.toFixed(5)}, {cursor.lat.toFixed(5)}</div>
      <div>SW: {bounds.getWest().toFixed(5)}, {bounds.getSouth().toFixed(5)}</div>
      <div>NE: {bounds.getEast().toFixed(5)}, {bounds.getNorth().toFixed(5)}</div>
    </div>
  )
}
