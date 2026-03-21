import { MantineProvider } from '@mantine/core'
import maplibregl from 'maplibre-gl'
import type { Map } from 'maplibre-gl'
import { useEffect, useMemo, useRef } from 'react'
import { flushSync } from 'react-dom'
import { createRoot, type Root } from 'react-dom/client'
import { peakGroups, type PeakGroup } from '@/lib/peakGrouper'
import { usePeaksStore, usePeaksActions } from '@/store/peaks/usePeaksStore'
import appTheme from '@/styles/theme'
import { PeakCategoryMarkerPopup } from './PeakCategoryMarkerPopup'
import styles from './PeaksMap.module.scss'

const ZOOM_THRESHOLD = 9

interface CategoryData {
  group: PeakGroup;
  center: [number, number]; // [lng, lat]
  peakIds: string[];
}

function computeCategoryData(): CategoryData[] {
  return peakGroups.map((group) => {
    const lats = group.peaks.map((p) => p.peak.coordinate.lat)
    const lngs = group.peaks.map((p) => p.peak.coordinate.lng)
    const avgLat = lats.reduce((a, b) => a + b, 0) / lats.length
    const avgLng = lngs.reduce((a, b) => a + b, 0) / lngs.length
    return {
      group,
      center: [avgLng, avgLat],
      peakIds: group.peaks.map((p) => p.id),
    }
  })
}

const categoryData = computeCategoryData()

interface MarkerEntry {
  marker: maplibregl.Marker;
  triangleEl: SVGElement;
  countEl: HTMLElement;
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

interface CategoryMarkerElements {
  el: HTMLDivElement;
  triangleEl: SVGElement;
  countEl: HTMLElement;
}

function createCategoryMarkerElement(
  category: string,
  totalCount: number,
): CategoryMarkerElements {
  const el = document.createElement('div')
  el.className = styles.categoryMarker!

  const triangleEl = createTriangleSvg(28)
  triangleEl.classList.add(styles.categoryTriangle!)
  el.appendChild(triangleEl)

  const label = document.createElement('div')
  label.className = styles.categoryLabel!

  const nameSpan = document.createElement('span')
  nameSpan.className = styles.categoryName!
  nameSpan.textContent = category

  const countEl = document.createElement('span')
  countEl.className = styles.categoryCount!
  countEl.textContent = `0/${totalCount}`

  label.appendChild(nameSpan)
  label.appendChild(countEl)
  el.appendChild(label)

  return {
    el,
    triangleEl,
    countEl,
  }
}

interface Props {
  map: Map | null;
  isMapReady: boolean;
}

export function PeakCategoryMarkersLayer({ map, isMapReady }: Props) {
  const checkedPeakIds = usePeaksStore.use.checkedPeakIds()
  const { checkAllInCategory, uncheckAllInCategory } = usePeaksActions()

  const checkedSet = useMemo(
    () => new Set(checkedPeakIds),
    [checkedPeakIds],
  )

  const markersRef = useRef<Map<number, MarkerEntry> | null>(null)
  const popupRef = useRef<maplibregl.Popup | null>(null)
  const rootRef = useRef<Root | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const openCategoryIndexRef = useRef<number | null>(null)

  // Create markers once when map is ready
  useEffect(() => {
    if (!map || !isMapReady) {
      return
    }

    const markers = new window.Map<number, MarkerEntry>()

    categoryData.forEach((data, index) => {
      const { el, triangleEl, countEl } = createCategoryMarkerElement(
        data.group.category,
        data.group.peaks.length,
      )

      const marker = new maplibregl.Marker({
        element: el,
        anchor: 'bottom',
      })
        .setLngLat(data.center)
        .addTo(map)

      el.addEventListener('click', (e) => {
        e.stopPropagation()
        showCategoryPopup(index)
      })

      // Hide initially if zoom >= threshold
      if (map.getZoom() >= ZOOM_THRESHOLD) {
        el.style.display = 'none'
      }

      markers.set(index, {
        marker,
        triangleEl,
        countEl,
      })
    })

    markersRef.current = markers

    function onZoom() {
      const zoom = map!.getZoom()
      const visible = zoom < ZOOM_THRESHOLD
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
    categoryData.forEach((data, index) => {
      const entry = markersRef.current!.get(index)
      if (!entry) {
        return
      }
      const checkedCount = data.peakIds.filter((id) => checkedSet.has(id)).length
      const hasChecked = checkedCount > 0

      if (hasChecked) {
        entry.triangleEl.classList.add(styles.categoryTriangleChecked!)
      } else {
        entry.triangleEl.classList.remove(styles.categoryTriangleChecked!)
      }

      entry.countEl.textContent = `${checkedCount}/${data.group.peaks.length}`
      if (hasChecked) {
        entry.countEl.classList.add(styles.categoryCountActive!)
      } else {
        entry.countEl.classList.remove(styles.categoryCountActive!)
      }
    })

    // Re-render popup if one is open
    const openIndex = openCategoryIndexRef.current
    if (openIndex !== null && containerRef.current) {
      renderPopupContent(openIndex)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedSet])

  function renderPopupContent(index: number) {
    if (!containerRef.current) {
      return
    }
    rootRef.current?.unmount()
    const root = createRoot(containerRef.current)
    rootRef.current = root

    const data = categoryData[index]!
    const checkedCount = data.peakIds.filter((id) => checkedSet.has(id)).length
    const totalCount = data.group.peaks.length
    const allChecked = checkedCount === totalCount

    flushSync(() => {
      root.render(
        <MantineProvider theme={appTheme}>
          <PeakCategoryMarkerPopup
            category={data.group.category}
            checkedCount={checkedCount}
            totalCount={totalCount}
            allChecked={allChecked}
            onToggleAll={() => {
              if (allChecked) {
                uncheckAllInCategory(data.peakIds)
              } else {
                checkAllInCategory(data.peakIds)
              }
            }}
          />
        </MantineProvider>,
      )
    })
  }

  function showCategoryPopup(index: number) {
    popupRef.current?.remove()
    rootRef.current?.unmount()

    const container = document.createElement('div')
    containerRef.current = container
    openCategoryIndexRef.current = index

    renderPopupContent(index)

    const popup = new maplibregl.Popup({
      closeButton: true,
      maxWidth: '240px',
    })
      .setLngLat(categoryData[index]!.center)
      .setDOMContent(container)
      .addTo(map!)

    popup.on('close', () => {
      openCategoryIndexRef.current = null
    })

    popupRef.current = popup
  }

  return null
}
