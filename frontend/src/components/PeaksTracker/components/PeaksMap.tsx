import maplibregl from 'maplibre-gl'
import { useRef, useEffect } from 'react'
import styles from '@/components/VectorMap/MapView.module.scss'
import { VECTOR_STYLE_URL } from '@/constants/vectorMap'

export function PeaksMap() {
  const containerRef = useRef<HTMLDivElement>(null)
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
    })

    instance.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      'top-right',
    )
    instance.addControl(
      new maplibregl.ScaleControl({ unit: 'metric' }),
      'bottom-left',
    )

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
    }
  }, [])

  return (
    <div className={`${styles.wrapper} w-full h-full`}>
      <div
        ref={containerRef}
        className="w-full h-full"
      />
    </div>
  )
}
