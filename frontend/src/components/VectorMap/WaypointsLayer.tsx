import { useMantineTheme, MantineProvider, Text } from '@mantine/core'
import { IconFlag } from '@tabler/icons-react'
import maplibregl, { type GeoJSONSource, type Map } from 'maplibre-gl'
import { useEffect, useRef } from 'react'
import { flushSync } from 'react-dom'
import { createRoot, type Root } from 'react-dom/client'
import {
  LAYER_WAYPOINTS,
  LAYER_WAYPOINTS_HALO,
  LAYER_WAYPOINTS_LABELS,
  SOURCE_WAYPOINTS,
} from '@/constants/vectorMap'
import { waypointsToPointCollection } from '@/lib/gpxToGeoJson'
import type { Waypoint } from '@/model/gpx'
import appTheme from '@/styles/theme'

interface Props {
  map: Map | null;
  isMapReady: boolean;
  waypoints: Waypoint[];
  show: boolean;
  showLabels: boolean;
}

interface PopupContentProps {
  waypoint: Waypoint;
}

function WaypointPopupContent({ waypoint }: PopupContentProps) {
  const rows: [string, string][] = [
    ['海拔', waypoint.elevation !== null ? `${waypoint.elevation.toFixed(1)} m` : '—'],
    ['緯度', waypoint.lat.toFixed(6)],
    ['經度', waypoint.lon.toFixed(6)],
    ...(waypoint.time
      ? [[
          '時間',
          waypoint.time.toLocaleString('zh-TW', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          }),
        ] as [string, string]]
      : []),
  ]

  return (
    <div className="flex flex-col gap-1 min-w-32">
      <div className="flex items-center gap-1.5 mb-1.5">
        <IconFlag
          size={14}
          stroke={2}
          color="var(--mantine-color-orange-6)"
        />
        <Text
          fw={600}
          size="sm"
          c="orange.6"
        >
          {waypoint.name ?? '航點'}
        </Text>
      </div>
      {waypoint.description && (
        <Text
          size="xs"
          c="dimmed"
          mb={4}
        >
          {waypoint.description}
        </Text>
      )}
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

export function WaypointsLayer({ map, isMapReady, waypoints, show, showLabels }: Props) {
  const theme = useMantineTheme()
  const markerColor = theme.colors.orange[5]!

  const addedRef = useRef(false)
  const popupRef = useRef<maplibregl.Popup | null>(null)
  const rootRef = useRef<Root | null>(null)

  // Add source and layers once when the map is ready
  useEffect(() => {
    if (!map || !isMapReady) {
      return
    }

    try {
      map.addSource(SOURCE_WAYPOINTS, {
        type: 'geojson',
        data: waypointsToPointCollection(waypoints),
      })

      // White halo for contrast against the base map
      map.addLayer({
        id: LAYER_WAYPOINTS_HALO,
        type: 'circle',
        source: SOURCE_WAYPOINTS,
        layout: { visibility: show ? 'visible' : 'none' },
        paint: {
          'circle-radius': 13,
          'circle-color': '#ffffff',
          'circle-opacity': 0.7,
          'circle-pitch-scale': 'viewport',
        },
      })

      // Filled orange dot
      map.addLayer({
        id: LAYER_WAYPOINTS,
        type: 'circle',
        source: SOURCE_WAYPOINTS,
        layout: { visibility: show ? 'visible' : 'none' },
        paint: {
          'circle-radius': 8,
          'circle-color': markerColor,
          'circle-stroke-width': 2.5,
          'circle-stroke-color': '#ffffff',
          'circle-pitch-scale': 'viewport',
        },
      })

      // Text labels above each waypoint
      map.addLayer({
        id: LAYER_WAYPOINTS_LABELS,
        type: 'symbol',
        source: SOURCE_WAYPOINTS,
        layout: {
          'text-field': ['get', 'name'],
          'text-anchor': 'bottom',
          'text-offset': [0, -1.8],
          'text-size': 12,
          'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
          visibility: show && showLabels ? 'visible' : 'none',
        },
        paint: {
          'text-color': '#333333',
          'text-halo-color': '#ffffff',
          'text-halo-width': 2,
        },
      })

      // Explicitly move waypoint layers to the top so they are always rendered
      // above the track layers regardless of React effect execution order.
      map.moveLayer(LAYER_WAYPOINTS_HALO)
      map.moveLayer(LAYER_WAYPOINTS)
      map.moveLayer(LAYER_WAYPOINTS_LABELS)

      addedRef.current = true
    } catch {
      // map may have been destroyed or source/layer already exists
    }

    return () => {
      try {
        popupRef.current?.remove()
        rootRef.current?.unmount()
        rootRef.current = null
        if (map.getLayer(LAYER_WAYPOINTS_LABELS)) {
          map.removeLayer(LAYER_WAYPOINTS_LABELS)
        }
        if (map.getLayer(LAYER_WAYPOINTS)) {
          map.removeLayer(LAYER_WAYPOINTS)
        }
        if (map.getLayer(LAYER_WAYPOINTS_HALO)) {
          map.removeLayer(LAYER_WAYPOINTS_HALO)
        }
        if (map.getSource(SOURCE_WAYPOINTS)) {
          map.removeSource(SOURCE_WAYPOINTS)
        }
      } catch {
        // map may have been destroyed before cleanup ran
      }
      addedRef.current = false
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, isMapReady])

  // Update GeoJSON data when waypoints change
  useEffect(() => {
    if (!map || !addedRef.current) {
      return
    }
    const src = map.getSource(SOURCE_WAYPOINTS) as GeoJSONSource | undefined
    src?.setData(waypointsToPointCollection(waypoints))
  }, [map, waypoints])

  // Toggle layer and label visibility
  useEffect(() => {
    if (!map || !addedRef.current) {
      return
    }
    const dotsVisibility = show ? 'visible' : 'none'
    const labelsVisibility = show && showLabels ? 'visible' : 'none'
    if (map.getLayer(LAYER_WAYPOINTS)) {
      map.setLayoutProperty(LAYER_WAYPOINTS, 'visibility', dotsVisibility)
    }
    if (map.getLayer(LAYER_WAYPOINTS_HALO)) {
      map.setLayoutProperty(LAYER_WAYPOINTS_HALO, 'visibility', dotsVisibility)
    }
    if (map.getLayer(LAYER_WAYPOINTS_LABELS)) {
      map.setLayoutProperty(LAYER_WAYPOINTS_LABELS, 'visibility', labelsVisibility)
    }
    if (!show) {
      popupRef.current?.remove()
    }
  }, [map, show, showLabels])

  // Click interaction: show popup for the nearest waypoint
  useEffect(() => {
    if (!map || !isMapReady || waypoints.length === 0) {
      return
    }

    const onMouseEnter = () => {
      map.getCanvas().style.cursor = 'pointer'
    }
    const onMouseLeave = () => {
      map.getCanvas().style.cursor = ''
    }

    function showWaypointPopup(waypoint: Waypoint) {
      popupRef.current?.remove()
      rootRef.current?.unmount()
      const container = document.createElement('div')
      const root = createRoot(container)
      rootRef.current = root
      flushSync(() => {
        root.render(
          <MantineProvider theme={appTheme}>
            <WaypointPopupContent waypoint={waypoint} />
          </MantineProvider>,
        )
      })
      popupRef.current = new maplibregl.Popup({ closeButton: true, maxWidth: '280px' })
        .setLngLat([waypoint.lon, waypoint.lat])
        .setDOMContent(container)
        .addTo(map!)
    }

    const onClick = (e: maplibregl.MapMouseEvent) => {
      const { lng, lat } = e.lngLat
      const nearest = waypoints.reduce((best, wp) => {
        const dist = ((wp.lat - lat) ** 2) + ((wp.lon - lng) ** 2)
        return dist < best.dist ? { wp, dist } : best
      }, { wp: waypoints[0]!, dist: Infinity }).wp
      showWaypointPopup(nearest)
    }

    map.on('mouseenter', LAYER_WAYPOINTS, onMouseEnter)
    map.on('mouseleave', LAYER_WAYPOINTS, onMouseLeave)
    map.on('click', LAYER_WAYPOINTS, onClick)

    return () => {
      map.off('mouseenter', LAYER_WAYPOINTS, onMouseEnter)
      map.off('mouseleave', LAYER_WAYPOINTS, onMouseLeave)
      map.off('click', LAYER_WAYPOINTS, onClick)
      popupRef.current?.remove()
      rootRef.current?.unmount()
      rootRef.current = null
    }
  }, [map, isMapReady, waypoints])

  return null
}
