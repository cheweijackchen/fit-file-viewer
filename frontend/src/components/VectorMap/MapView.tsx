import maplibregl from 'maplibre-gl'
import type { Map } from 'maplibre-gl'
import { useRef, useEffect, useState } from 'react'
import { TrackLayer } from '@/components/VectorMap/TrackLayer'
import { TrackPopup } from '@/components/VectorMap/TrackPopup'
import {
  applyBaseMapMode,
  applyTerrain,
  DEFAULT_BASE_MAP,
  VECTOR_STYLE_URL,
  type BaseMapMode,
} from '@/hooks/useBaseMap'
import { useTrackFitBounds } from '@/hooks/useTrackFitBounds'
import type { ParsedTrack } from '@/model/gpx'

import { BaseMapSelector } from './BaseMapSelector'
import { MapControlPanel } from './MapControlPanel'
import { TerrainToggle } from './TerrainToggle'

interface MapViewProps {
  track: ParsedTrack | null;
  highlightedIndex: number | null;
}

export function MapView({ track, highlightedIndex }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<Map | null>(null)
  const [isMapReady, setIsMapReady] = useState(false)
  const [baseMap, setBaseMap] = useState<BaseMapMode>(DEFAULT_BASE_MAP)
  const [showTerrain, setShowTerrain] = useState(true)

  // Initialize map once
  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return
    }

    const instance = new maplibregl.Map({
      container,
      style: VECTOR_STYLE_URL,
      center: [121.0, 24.0],
      zoom: 7,
      pitch: 45,
      bearing: 0,
      centerClampedToGround: false,
      trackResize: false,
    })

    instance.addControl(
      new maplibregl.NavigationControl({ visualizePitch: true }),
      'top-right',
    )
    instance.addControl(
      new maplibregl.ScaleControl({ unit: 'metric' }),
      'bottom-left',
    )
    instance.addControl(
      new maplibregl.FullscreenControl({ container: wrapperRef.current ?? undefined }),
      'top-right',
    )

    instance.on('load', () => {
      setIsMapReady(true)
    })

    let rafId: number | null = null
    const resizeObserver = new ResizeObserver(() => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      rafId = requestAnimationFrame(() => {
        instance.resize()
        rafId = null
      })
    })
    resizeObserver.observe(container)

    setMap(instance)

    return () => {
      resizeObserver.disconnect()
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      instance.remove()
      setMap(null)
      setIsMapReady(false)
    }

  }, [])

  // Apply base map mode (satellite layer + vector layer visibility)
  useEffect(() => {
    if (!map || !isMapReady) {
      return
    }
    applyBaseMapMode(map, baseMap)
  }, [map, isMapReady, baseMap])

  // Apply terrain & hillshade (hillshade only in standard mode)
  useEffect(() => {
    if (!map || !isMapReady) {
      return
    }
    applyTerrain(map, {
      terrain: showTerrain,
      hillshade: showTerrain && baseMap === 'standard',
    })
  }, [map, isMapReady, showTerrain, baseMap])

  const points = track?.points ?? []

  useTrackFitBounds(map, points, isMapReady)

  return (
    // position: relative so absolute children (selector, controls) are anchored here
    <div
      ref={wrapperRef}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      <div
        ref={containerRef}
        style={{ width: '100%', height: '100%' }}
      />

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

      {/* z-index must exceed MapLibre canvas (which sits at z-index 0) */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <MapControlPanel>
          <TerrainToggle
            value={showTerrain}
            onChange={setShowTerrain}
          />
          <BaseMapSelector
            value={baseMap}
            onChange={setBaseMap}
          />
        </MapControlPanel>
      </div>
    </div>
  )
}
