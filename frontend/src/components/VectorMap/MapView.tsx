import { ActionIcon, Tooltip } from '@mantine/core'
import { IconX } from '@tabler/icons-react'
import clsx from 'clsx'
import maplibregl from 'maplibre-gl'
import type { Map } from 'maplibre-gl'
import { useRef, useEffect, useState } from 'react'
import { TrackLayer } from '@/components/VectorMap/TrackLayer'
import { TrackPopupLayer } from '@/components/VectorMap/TrackPopupLayer'
import { type BaseMapMode, LAYER_WAYPOINTS_HALO, VECTOR_STYLE_URL } from '@/constants/vectorMap'
import { useTrackFitBounds } from '@/hooks/useTrackFitBounds'
import { useTrackPlayback } from '@/hooks/useTrackPlayback'
import {
  applyBaseMapMode,
  applyContour,
  applyTerrain,
  DEFAULT_BASE_MAP,
} from '@/lib/baseMap'
import type { ParsedTrack } from '@/model/gpx'

import { MapControlPanel } from './MapControlPanel'
import { MapOptionsPanel } from './MapOptionsPanel'
import styles from './MapView.module.scss'
import { PlaybackBar } from './PlaybackBar'
import { PlaybackButton } from './PlaybackButton'
import { PlaybackPositionLayer } from './PlaybackPositionLayer'
import { TerrainToggle } from './TerrainToggle'
import { useMapControlTooltip } from './useMapControlTooltip'
import { WaypointsLayer } from './WaypointsLayer'

interface Props {
  track: ParsedTrack | null;
  highlightedIndex: number | null;
}

export function MapView({ track, highlightedIndex }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<Map | null>(null)
  const [isMapReady, setIsMapReady] = useState(false)
  const [baseMap, setBaseMap] = useState<BaseMapMode>(DEFAULT_BASE_MAP)
  const [showTerrain, setShowTerrain] = useState(false)
  const [showContour, setShowContour] = useState(true)
  const [showTrackPoints, setShowTrackPoints] = useState(false)
  const [showWaypoints, setShowWaypoints] = useState(true)
  const [showWaypointLabels, setShowWaypointLabels] = useState(true)
  const [playbackOpen, setPlaybackOpen] = useState(false)

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

  // Apply contour lines
  useEffect(() => {
    if (!map || !isMapReady) {
      return
    }
    applyContour(map, showContour)
  }, [map, isMapReady, showContour])

  const prevShowTerrainRef = useRef(showTerrain)

  // Apply terrain & hillshade, and sequence pitch animation to avoid camera offset
  useEffect(() => {
    if (!map || !isMapReady) {
      return
    }

    const terrainChanged = prevShowTerrainRef.current !== showTerrain
    prevShowTerrainRef.current = showTerrain

    // When only baseMap changes (e.g. hillshade on/off), update without animation
    if (!terrainChanged) {
      applyTerrain(map, {
        terrain: showTerrain,
        hillshade: showTerrain && baseMap === 'standard',
      })
      return
    }

    if (showTerrain) {
      // Enable terrain first, then tilt the camera
      applyTerrain(map, { terrain: true, hillshade: baseMap === 'standard' })
      const id = setTimeout(() => {
        map.easeTo({ pitch: 45, duration: 1000 })
      }, 1000)
      return () => clearTimeout(id)
    } else {
      // Pitch back to flat first; only remove terrain after the animation ends
      // to avoid the 3D→2D reprojection causing a visible offset at pitch=45
      map.easeTo({ pitch: 0, duration: 800 })
      map.once('moveend', () => {
        applyTerrain(map, { terrain: false, hillshade: false })
      })
    }
  }, [map, isMapReady, showTerrain, baseMap])

  const mapControlTooltip = useMapControlTooltip(wrapperRef)

  const points = track?.points ?? []
  const waypoints = track?.waypoints ?? []

  useTrackFitBounds(map, points, isMapReady)

  const playback = useTrackPlayback({ map, points, enabled: playbackOpen, terrain: showTerrain })

  // Auto-play after all useTrackPlayback effects settle on the render where
  // playbackOpen becomes true. Calling play() synchronously in the event handler
  // would race against useTrackPlayback's effect cleanups (which run during the
  // same re-render). This effect is registered after useTrackPlayback so it
  // always runs last.
  // play() reads only from refs, so a stale closure is safe.
  useEffect(() => {
    if (playbackOpen) {
      playback.play()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playbackOpen])

  return (
    // position: relative so absolute children (selector, controls) are anchored here
    <div
      ref={wrapperRef}
      className={clsx(styles.wrapper, playback.isPlaying && styles.playing, 'relative w-full h-full')}
    >
      <div
        ref={containerRef}
        className="w-full h-full"
      />

      <TrackLayer
        map={map}
        points={points}
        isMapReady={isMapReady}
        highlightedIndex={highlightedIndex}
        options={{ showTrackPoints }}
        insertBefore={LAYER_WAYPOINTS_HALO}
      />
      <TrackPopupLayer
        map={map}
        points={points}
        isMapReady={isMapReady}
        showTrackPoints={showTrackPoints}
      />
      <WaypointsLayer
        map={map}
        isMapReady={isMapReady}
        waypoints={waypoints}
        show={showWaypoints}
        showLabels={showWaypointLabels}
      />

      {playbackOpen && (
        <PlaybackPositionLayer
          map={map}
          isMapReady={isMapReady}
          position={playback.currentPosition}
        />
      )}

      {mapControlTooltip !== null && (
        <div
          className={styles['map-control-tooltip']}
          style={{ right: mapControlTooltip.right, top: mapControlTooltip.top }}
          role="tooltip"
          aria-hidden="true"
        >
          {mapControlTooltip.text}
        </div>
      )}

      {/* z-index must exceed MapLibre canvas (which sits at z-index 0) */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {/* Close button at top-left: visible whenever playback is open */}
        {playbackOpen && (
          <div className="absolute top-2.5 left-2.5 pointer-events-auto">
            <Tooltip
              label="Close flyover"
              position="right"
              withinPortal={false}
              openDelay={750}
            >
              <ActionIcon
                size="lg"
                variant="default"
                aria-label="Close flyover"
                onClick={() => setPlaybackOpen(false)}
              >
                <IconX size={20} />
              </ActionIcon>
            </Tooltip>
          </div>
        )}

        {/* Control panel: hidden while playing, shown when paused or playback closed */}
        {!playback.isPlaying && (
          <MapControlPanel>
            <TerrainToggle
              value={showTerrain}
              onChange={setShowTerrain}
            />
            <MapOptionsPanel
              value={baseMap}
              showTrackPoints={showTrackPoints}
              showWaypoints={showWaypoints}
              showWaypointLabels={showWaypointLabels}
              showContour={showContour}
              hasWaypoints={waypoints.length > 0}
              onChange={setBaseMap}
              onTrackPointsChange={setShowTrackPoints}
              onWaypointsChange={setShowWaypoints}
              onWaypointLabelsChange={setShowWaypointLabels}
              onContourChange={setShowContour}
            />
            {!playbackOpen && (
              <PlaybackButton
                disabled={points.length < 2}
                onClick={() => setPlaybackOpen(true)}
              />
            )}
          </MapControlPanel>
        )}

        {playbackOpen && playback.totalDuration > 0 && (
          <PlaybackBar
            isPlaying={playback.isPlaying}
            progress={playback.progress}
            currentTime={playback.currentTime}
            totalDuration={playback.totalDuration}
            speed={playback.speed}
            onToggle={playback.toggle}
            onSeek={playback.seek}
            onSpeedChange={playback.setSpeed}
          />
        )}
      </div>
    </div>
  )
}
