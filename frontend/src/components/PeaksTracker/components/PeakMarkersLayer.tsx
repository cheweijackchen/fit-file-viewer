import { MantineProvider } from '@mantine/core'
import maplibregl from 'maplibre-gl'
import type { Map } from 'maplibre-gl'
import { useEffect, useMemo, useRef } from 'react'
import { flushSync } from 'react-dom'
import { createRoot, type Root } from 'react-dom/client'
import { Taiwan100MountainPeak } from '@/constants/peaks'
import { usePeaksStore, usePeaksActions } from '@/store/peaks/usePeaksStore'
import appTheme from '@/styles/theme'
import { PeakMarkerPopup } from './PeakMarkerPopup'
import styles from './PeaksMap.module.scss'

const ZOOM_THRESHOLD = 9

interface Props {
  map: Map | null;
  isMapReady: boolean;
}

interface MarkerEntry {
  marker: maplibregl.Marker;
  triangleEl: SVGElement;
}

function createTriangleSvg(size: number): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', String(size))
  svg.setAttribute('height', String(size))
  svg.setAttribute('viewBox', '0 0 16 16')
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', 'M8 2L14 13H2Z')
  svg.appendChild(path)
  return svg
}

interface PeakMarkerElements {
  el: HTMLDivElement;
  triangleEl: SVGElement;
}

function createPeakMarkerElement(name: string, elevation: number): PeakMarkerElements {
  const el = document.createElement('div')
  el.className = styles.marker!

  const triangleEl = createTriangleSvg(14)
  triangleEl.classList.add(styles.triangle!)
  el.appendChild(triangleEl)

  const label = document.createElement('div')
  label.className = styles.label!

  const nameSpan = document.createElement('span')
  nameSpan.className = styles.peakName!
  nameSpan.textContent = name

  const elevSpan = document.createElement('span')
  elevSpan.className = styles.peakElevation!
  elevSpan.textContent = `${elevation}m`

  label.appendChild(nameSpan)
  label.appendChild(elevSpan)
  el.appendChild(label)

  return {
    el,
    triangleEl,
  }
}

export function PeakMarkersLayer({ map, isMapReady }: Props) {
  const checkedPeakIds = usePeaksStore.use.checkedPeakIds()
  const { togglePeak } = usePeaksActions()

  const checkedSet = useMemo(
    () => new Set(checkedPeakIds),
    [checkedPeakIds],
  )

  const markersRef = useRef<Map<string, MarkerEntry> | null>(null)
  const popupRef = useRef<maplibregl.Popup | null>(null)
  const rootRef = useRef<Root | null>(null)
  const openPeakIdRef = useRef<string | null>(null)

  // Create markers once when map is ready
  useEffect(() => {
    if (!map || !isMapReady) {
      return
    }

    const markers = new window.Map<string, MarkerEntry>()

    for (const [id, peak] of Object.entries(Taiwan100MountainPeak)) {
      const { el, triangleEl } = createPeakMarkerElement(peak.name, peak.elevation)

      const marker = new maplibregl.Marker({
        element: el,
        anchor: 'bottom',
      })
        .setLngLat([peak.coordinate.lng, peak.coordinate.lat])
        .addTo(map)

      el.addEventListener('click', (e) => {
        e.stopPropagation()
        showPeakPopup(id, peak)
      })

      // Hide initially if zoom < threshold
      if (map.getZoom() < ZOOM_THRESHOLD) {
        el.style.display = 'none'
      }

      markers.set(id, {
        marker,
        triangleEl,
      })
    }

    markersRef.current = markers

    function onZoom() {
      const zoom = map!.getZoom()
      const visible = zoom >= ZOOM_THRESHOLD
      for (const { marker } of markers.values()) {
        marker.getElement().style.display = visible ? '' : 'none'
      }
    }

    map.on('zoom', onZoom)

    return () => {
      map.off('zoom', onZoom)
      popupRef.current?.remove()
      rootRef.current?.unmount()
      rootRef.current = null
      for (const { marker } of markers.values()) {
        marker.remove()
      }
      markersRef.current = null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, isMapReady])

  // Update checked visual state and re-render open popup
  useEffect(() => {
    if (!markersRef.current) {
      return
    }
    for (const [id, { triangleEl }] of markersRef.current.entries()) {
      if (checkedSet.has(id)) {
        triangleEl.classList.add(styles.triangleChecked!)
      } else {
        triangleEl.classList.remove(styles.triangleChecked!)
      }
    }

    // Re-render popup if one is open
    const openId = openPeakIdRef.current
    if (openId && rootRef.current) {
      const peak = Taiwan100MountainPeak[openId as keyof typeof Taiwan100MountainPeak]
      if (peak) {
        renderPopupContent(openId, peak)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedSet])

  function renderPopupContent(peakId: string, peak: typeof Taiwan100MountainPeak[keyof typeof Taiwan100MountainPeak]) {
    if (!rootRef.current) {
      return
    }
    const isChecked = checkedSet.has(peakId)
    flushSync(() => {
      rootRef.current!.render(
        <MantineProvider theme={appTheme}>
          <PeakMarkerPopup
            name={peak.name}
            elevation={peak.elevation}
            category={peak.category}
            isChecked={isChecked}
            onToggle={() => {
              togglePeak(peakId)
            }}
          />
        </MantineProvider>,
      )
    })
  }

  function showPeakPopup(peakId: string, peak: typeof Taiwan100MountainPeak[keyof typeof Taiwan100MountainPeak]) {
    popupRef.current?.remove()
    rootRef.current?.unmount()

    const container = document.createElement('div')
    const root = createRoot(container)
    rootRef.current = root
    openPeakIdRef.current = peakId

    renderPopupContent(peakId, peak)

    const popup = new maplibregl.Popup({
      closeButton: true,
      maxWidth: '240px',
    })
      .setLngLat([peak.coordinate.lng, peak.coordinate.lat])
      .setDOMContent(container)
      .addTo(map!)

    popup.on('close', () => {
      openPeakIdRef.current = null
    })

    popupRef.current = popup
  }

  return null
}
