import { LoadingOverlay } from '@mantine/core'
import clsx from 'clsx'
import maplibregl from 'maplibre-gl'
import type { Map } from 'maplibre-gl'
import { useRef, useEffect, useState } from 'react'
import mapStyles from '@/components/VectorMap/MapView.module.scss'
import { VECTOR_STYLE_URL } from '@/constants/vectorMap'
import { MapDebugOverlay } from './MapDebugOverlay'
import { PeakCategoryMarkersLayer } from './PeakCategoryMarkersLayer'
import { PeakMarkersLayer } from './PeakMarkersLayer'
import peaksStyles from './PeaksMap.module.scss'

const LABEL_LAYERS = [
  'label_other',
  'label_village',
  'label_town',
  'label_state',
  'label_city',
  'label_city_capital',
  'label_country_3',
  'label_country_2',
  'label_country_1',
]

function applyDimmedLabels(map: Map) {
  const dimmed = getComputedStyle(document.documentElement)
    .getPropertyValue('--mantine-color-dimmed').trim()

  for (const id of LABEL_LAYERS) {
    map.setPaintProperty(id, 'text-color', dimmed)
  }
}

interface Props {
  debug?: boolean;
}

export function PeaksMap({ debug = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<Map | null>(null)
  const [isMapReady, setIsMapReady] = useState(false)
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
      trackResize: false,
      dragRotate: false,
      touchPitch: false,
      pitchWithRotate: false,
    })

    instance.touchZoomRotate.disableRotation()

    instance.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      'top-right',
    )
    instance.addControl(
      new maplibregl.ScaleControl({ unit: 'metric' }),
      'bottom-left',
    )

    instance.on('load', () => {
      applyDimmedLabels(instance)
      setIsMapReady(true)
    })

    setMap(instance)

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

  return (
    <div className={clsx(mapStyles.wrapper, peaksStyles.wrapper, 'relative w-full h-full')}>
      <div
        ref={containerRef}
        className="w-full h-full"
      />
      <PeakMarkersLayer
        map={map}
        isMapReady={isMapReady}
      />
      <PeakCategoryMarkersLayer
        map={map}
        isMapReady={isMapReady}
      />
      <LoadingOverlay visible={!isMapReady} />
      {debug && (
        <MapDebugOverlay
          map={map}
          isMapReady={isMapReady}
        />
      )}
    </div>
  )
}
