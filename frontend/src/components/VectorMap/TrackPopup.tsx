import maplibregl, { type Map } from 'maplibre-gl'
import { useEffect, useRef } from 'react'
import type { TrackPoint } from '@/model/gpx'

const LAYER_LINE = 'gpx-track-line-layer'

interface TrackPopupProps {
  map: Map | null;
  points: TrackPoint[];
  isMapReady: boolean;
}

function formatTime(date: Date): string {
  return date.toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

/**
 * Attaches click interaction to the track line layer.
 * On click, shows a MapLibre popup with elevation and time info
 * for the nearest track point.
 */
export function TrackPopup({ map, points, isMapReady }: TrackPopupProps) {
  const popupRef = useRef<maplibregl.Popup | null>(null)

  useEffect(() => {
    if (!map || !isMapReady || points.length === 0) {
      return
    }

    // Change cursor to pointer when hovering the line
    const onMouseEnter = () => {
      map.getCanvas().style.cursor = 'pointer'
    }
    const onMouseLeave = () => {
      map.getCanvas().style.cursor = ''
    }

    const onLineClick = (e: maplibregl.MapMouseEvent) => {
      const clickedLng = e.lngLat.lng
      const clickedLat = e.lngLat.lat

      // Find nearest point by Euclidean distance on lat/lon
      let nearestIndex = 0
      let minDist = Infinity

      for (let i = 0; i < points.length; i++) {
        const p = points[i]!
        const dist =
          (p.lat - clickedLat) ** 2 + (p.lon - clickedLng) ** 2
        if (dist < minDist) {
          minDist = dist
          nearestIndex = i
        }
      }

      const nearest = points[nearestIndex]!

      const elevStr =
        nearest.elevation !== null
          ? `${nearest.elevation.toFixed(1)} m`
          : '—'
      const timeStr = nearest.time ? formatTime(nearest.time) : '—'
      const latStr = nearest.lat.toFixed(6)
      const lonStr = nearest.lon.toFixed(6)

      popupRef.current?.remove()

      popupRef.current = new maplibregl.Popup({ closeButton: true, maxWidth: '260px' })
        .setLngLat([nearest.lon, nearest.lat])
        .setHTML(
          `<div style="line-height:1.7">
            <div style="color:#f97316;font-weight:600;margin-bottom:6px">📍 軌跡點 #${nearestIndex + 1}</div>
            <div><span style="color:#8b949e">海拔</span>&nbsp;&nbsp;${elevStr}</div>
            <div><span style="color:#8b949e">時間</span>&nbsp;&nbsp;${timeStr}</div>
            <div><span style="color:#8b949e">緯度</span>&nbsp;&nbsp;${latStr}</div>
            <div><span style="color:#8b949e">經度</span>&nbsp;&nbsp;${lonStr}</div>
          </div>`,
        )
        .addTo(map)
    }

    map.on('mouseenter', LAYER_LINE, onMouseEnter)
    map.on('mouseleave', LAYER_LINE, onMouseLeave)
    map.on('click', LAYER_LINE, onLineClick)

    return () => {
      map.off('mouseenter', LAYER_LINE, onMouseEnter)
      map.off('mouseleave', LAYER_LINE, onMouseLeave)
      map.off('click', LAYER_LINE, onLineClick)
      popupRef.current?.remove()
    }
  }, [map, points, isMapReady])

  return null
}
