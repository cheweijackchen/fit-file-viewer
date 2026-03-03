'use client'

import { MantineProvider, Text } from '@mantine/core'
import { IconMapPin } from '@tabler/icons-react'
import maplibregl, { type Map } from 'maplibre-gl'
import { useEffect, useRef } from 'react'
import { flushSync } from 'react-dom'
import { createRoot, type Root } from 'react-dom/client'
import { LAYER_LINE, LAYER_WAYPOINTS } from '@/constants/vectorMap'
import type { TrackPoint } from '@/model/gpx'
import theme from '@/styles/theme'

interface TrackPopupProps {
  map: Map | null;
  points: TrackPoint[];
  isMapReady: boolean;
  showTrackPoints: boolean;
}

interface ContentProps {
  index: number;
  elevation: string;
  time: string;
  lat: string;
  lon: string;
}

function TrackPopupContent({ index, elevation, time, lat, lon }: ContentProps) {
  const rows = [
    ['海拔', elevation],
    ['緯度', lat],
    ['經度', lon],
    ['時間', time],
  ] as const

  return (
    <div className="flex flex-col gap-1 min-w-32">
      <div className="flex items-center gap-1.5 mb-1.5">
        <IconMapPin
          size={14}
          stroke={2}
          color="var(--mantine-color-yellow-6)"
        />
        <Text
          fw={600}
          size="sm"
          c="yellow.6"
        >
          軌跡點 #{index}
        </Text>
      </div>
      {rows.map(([label, value]) => (
        <div
          key={label}
          className="flex justify-between gap-6"
        >
          <Text
            size="xs"
            c="dimmed"
          >
            {label}
          </Text>
          <Text size="xs">{value}</Text>
        </div>
      ))}
    </div>
  )
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
export function TrackPopup({ map, points, isMapReady, showTrackPoints }: TrackPopupProps) {
  const popupRef = useRef<maplibregl.Popup | null>(null)
  const rootRef = useRef<Root | null>(null)

  useEffect(() => {
    if (!map || !isMapReady || points.length === 0 || !showTrackPoints) {
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
      // If a waypoint marker is at this location, let WaypointsLayer handle the click
      if (
        map.getLayer(LAYER_WAYPOINTS)
        && map.queryRenderedFeatures(e.point, { layers: [LAYER_WAYPOINTS] }).length > 0
      ) {
        return
      }

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
      rootRef.current?.unmount()

      const container = document.createElement('div')
      const root = createRoot(container)
      rootRef.current = root

      flushSync(() => {
        root.render(
          <MantineProvider theme={theme}>
            <TrackPopupContent
              index={nearestIndex + 1}
              elevation={elevStr}
              time={timeStr}
              lat={latStr}
              lon={lonStr}
            />
          </MantineProvider>,
        )
      })

      popupRef.current = new maplibregl.Popup({ closeButton: true, maxWidth: '280px' })
        .setLngLat([nearest.lon, nearest.lat])
        .setDOMContent(container)
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
      rootRef.current?.unmount()
      rootRef.current = null
    }
  }, [map, points, isMapReady, showTrackPoints])

  return null
}
