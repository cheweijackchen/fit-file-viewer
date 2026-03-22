import clsx from 'clsx'
import type { FeatureCollection, Point } from 'geojson'
import maplibregl from 'maplibre-gl'
import type { Map } from 'maplibre-gl'
import { useRef, useEffect, useState } from 'react'
import { Taiwan100MountainPeak } from '@/constants/peaks'
import { VECTOR_STYLE_URL } from '@/constants/vectorMap'
import { ensureContourLayers } from '@/lib/baseMap'

import { CaptureMapButton } from './CaptureMapButton'
import { MountainPeakToggle } from './MountainPeakToggle'
import { MapControlPanel } from '../VectorMap/MapControlPanel'
import styles from '../VectorMap/MapView.module.scss'

const CONTOUR_LINE_COLOR = '#000000'
const CONTOUR_LINE_WIDTH = 3

const SOURCE_TAIWAN_100_PEAKS = 'taiwan-100-peaks-source'
const LAYER_TAIWAN_100_PEAKS = 'taiwan-100-peaks-layer'

function buildPeaksGeoJson(): FeatureCollection<Point> {
  const features = Object.values(Taiwan100MountainPeak).map((peak) => ({
    type: 'Feature' as const,
    geometry: {
      type: 'Point' as const,
      coordinates: [peak.coordinate.lng, peak.coordinate.lat],
    },
    properties: {
      name: peak.name,
      elevation: peak.elevation,
    },
  }))
  return {
    type: 'FeatureCollection',
    features
  }
}

function ensureTaiwan100PeaksLayer(map: Map): void {
  if (!map.getSource(SOURCE_TAIWAN_100_PEAKS)) {
    map.addSource(SOURCE_TAIWAN_100_PEAKS, {
      type: 'geojson',
      data: buildPeaksGeoJson(),
    })
  }

  if (!map.getLayer(LAYER_TAIWAN_100_PEAKS)) {
    map.addLayer({
      id: LAYER_TAIWAN_100_PEAKS,
      type: 'symbol',
      source: SOURCE_TAIWAN_100_PEAKS,
      layout: {
        'icon-image': 'triangle',
        'icon-size': 0.8,
        'icon-anchor': 'bottom',
        'text-field': [
          'format',
          ['get', 'name'], {},
          '\n', {},
          ['concat', ['to-string', ['get', 'elevation']], 'm'],
          { 'font-scale': 0.85 },
        ],
        'text-size': 14,
        'text-anchor': 'top',
        'text-offset': [0, 0.2],
        'text-optional': true,
      },
      paint: {
        'icon-color': '#5B3F20',
        'text-color': '#5B3F20',
        'text-halo-color': 'white',
        'text-halo-width': 1.5,
      },
    })
  }
}

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
      // Hide all default vector style layers (keep background to avoid black screen in fullscreen)
      for (const layer of instance.getStyle().layers) {
        if (layer.id === 'background') {
          continue
        }
        instance.setLayoutProperty(layer.id, 'visibility', 'none')
      }

      // Add contour layers with custom styling and lower zoom thresholds
      const contourIds = ensureContourLayers(instance, {
        thresholds: {
          1: [2000, 10000],
          5: [1000, 5000],
          8: [500, 2000],
          11: [200, 1000],
          12: [100, 500],
          14: [50, 200],
        },
        lineColor: CONTOUR_LINE_COLOR,
        lineWidth: CONTOUR_LINE_WIDTH,
        lineOpacity: 1,
      })
      instance.setLayoutProperty(contourIds.line, 'visibility', 'visible')
      instance.setLayoutProperty(contourIds.label, 'visibility', 'visible')

      // Add Taiwan 100 peaks layer (visible at all zoom levels)
      ensureTaiwan100PeaksLayer(instance)

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
    if (map.getLayer(LAYER_TAIWAN_100_PEAKS)) {
      map.setLayoutProperty(LAYER_TAIWAN_100_PEAKS, 'visibility', showPeaks ? 'visible' : 'none')
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
          <CaptureMapButton
            map={map}
            isMapReady={isMapReady}
          />
          <MountainPeakToggle
            value={showPeaks}
            onChange={onShowPeaksChange}
          />
        </MapControlPanel>
      </div>
    </div>
  )
}
