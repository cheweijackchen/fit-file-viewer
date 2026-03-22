import clsx from 'clsx'
import maplibregl from 'maplibre-gl'
import type { Map } from 'maplibre-gl'
import { useRef, useEffect, useState } from 'react'
import { VECTOR_STYLE_URL } from '@/constants/vectorMap'
import {
  ensureContourLayers,
  ensureMountainPeakLayer,
  LAYER_CONTOUR_LINE,
  LAYER_CONTOUR_LABEL,
  LAYER_MOUNTAIN_PEAK,
} from '@/lib/baseMap'

import { MountainPeakToggle } from './MountainPeakToggle'
import { MapControlPanel } from '../VectorMap/MapControlPanel'
import styles from '../VectorMap/MapView.module.scss'

const CONTOUR_LINE_COLOR = '#000000'
const CONTOUR_LINE_WIDTH = 3

interface Props {
  showPeaks: boolean;
  onShowPeaksChange: (value: boolean) => void;
}

export function ContourMapView({ showPeaks, onShowPeaksChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
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
      style: VECTOR_STYLE_URL,
      center: [121.0, 24.0],
      zoom: 7,
      pitch: 0,
      bearing: 0,
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
      // Hide all default vector style layers
      for (const layer of instance.getStyle().layers) {
        instance.setLayoutProperty(layer.id, 'visibility', 'none')
      }

      // Add contour layers with custom styling
      ensureContourLayers(instance)
      instance.setPaintProperty(LAYER_CONTOUR_LINE, 'line-color', CONTOUR_LINE_COLOR)
      instance.setPaintProperty(LAYER_CONTOUR_LINE, 'line-width', CONTOUR_LINE_WIDTH)
      instance.setPaintProperty(LAYER_CONTOUR_LINE, 'line-opacity', 1)
      instance.setLayoutProperty(LAYER_CONTOUR_LINE, 'visibility', 'visible')
      instance.setLayoutProperty(LAYER_CONTOUR_LABEL, 'visibility', 'visible')

      // Add mountain peak layer
      ensureMountainPeakLayer(instance)
      instance.setLayoutProperty(LAYER_MOUNTAIN_PEAK, 'visibility', 'visible')

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

  // Toggle mountain peak visibility
  useEffect(() => {
    if (!map || !isMapReady) {
      return
    }
    if (map.getLayer(LAYER_MOUNTAIN_PEAK)) {
      map.setLayoutProperty(LAYER_MOUNTAIN_PEAK, 'visibility', showPeaks ? 'visible' : 'none')
    }
  }, [map, isMapReady, showPeaks])

  return (
    <div
      ref={wrapperRef}
      className={clsx(styles.wrapper, 'relative w-full h-full')}
    >
      <div
        ref={containerRef}
        className="w-full h-full"
      />

      <div className="absolute inset-0 pointer-events-none z-20">
        <MapControlPanel>
          <MountainPeakToggle
            value={showPeaks}
            onChange={onShowPeaksChange}
          />
        </MapControlPanel>
      </div>
    </div>
  )
}
