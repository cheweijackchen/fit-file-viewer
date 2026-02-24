import maplibregl from 'maplibre-gl'
import type { Map } from 'maplibre-gl'
import type { StyleSpecification } from 'maplibre-gl'
import { useRef, useEffect, useState } from 'react'
import { TrackLayer } from '@/components/VectorMap/TrackLayer'
import { TrackPopup } from '@/components/VectorMap/TrackPopup'
import { useTrackFitBounds } from '@/hooks/useTrackFitBounds'
import type { ParsedTrack } from '@/model/gpx'


const MAP_STYLE =
  'https://tiles.openfreemap.org/styles/liberty' as unknown as StyleSpecification

interface MapViewProps {
  track: ParsedTrack | null;
  highlightedIndex: number | null;
}

export function MapView({ track, highlightedIndex }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  // Store the map instance in state so child components re-render correctly
  // when the map becomes available. Reading mapRef.current during render is
  // disallowed in React 19.
  const [map, setMap] = useState<Map | null>(null)
  const [isMapReady, setIsMapReady] = useState(false)

  // Initialize map once
  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return
    }

    const instance = new maplibregl.Map({
      container,
      style: MAP_STYLE,
      center: [121.0, 24.0],
      zoom: 7,
      pitch: 45,
      bearing: 0,
      canvasContextAttributes: {
        antialias: true,
      },
    })

    instance.addControl(
      new maplibregl.NavigationControl({ visualizePitch: true }),
      'top-right',
    )
    instance.addControl(new maplibregl.ScaleControl({ unit: 'metric' }), 'bottom-left')
    instance.addControl(new maplibregl.FullscreenControl(), 'top-right')

    instance.on('load', () => {
      setIsMapReady(true)
    })
    // instance.on('load', () => {
    //   // Add Terrarium raster-DEM — free, no API key required.
    //   // To switch to Maptiler, replace tiles with:
    //   // https://api.maptiler.com/tiles/terrain-rgb/tiles.json?key=YOUR_KEY
    //   // and change encoding to 'mapbox'
    //   instance.addSource('terrain-dem', {
    //     type: 'raster-dem',
    //     encoding: 'terrarium',
    //     tiles: [
    //       'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png',
    //     ],
    //     tileSize: 256,
    //     maxzoom: 15,
    //     attribution: 'Terrain © Mapzen / AWS',
    //   })

    //   instance.setTerrain({ source: 'terrain-dem', exaggeration: 1.5 })

    //   setIsMapReady(true)
    // })

    setMap(instance)

    return () => {
      instance.remove()
      setMap(null)
      setIsMapReady(false)
    }

  }, [])

  const points = track?.points ?? []

  useTrackFitBounds(map, points, isMapReady)

  return (
    <div className="relative w-full h-full">
      <div
        ref={containerRef}
        className="w-full h-full"
      />

      {/* Render track layers as logic-only components */}
      <TrackLayer
        map={map}
        points={points}
        isMapReady={isMapReady}
        highlightedIndex={highlightedIndex}
      />
      <TrackPopup
        map={map}
        points={points}
        isMapReady={isMapReady}
      />
    </div>
  )
}
