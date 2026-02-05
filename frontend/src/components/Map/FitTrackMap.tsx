import { LatLngBounds, type LatLngExpression } from 'leaflet'
import React, { useState, useMemo, useCallback } from 'react'
import { MapContainer, TileLayer, Polyline, ScaleControl } from 'react-leaflet'
import {
  DEFAULT_TRACK_COLORS,
  DEFAULT_ZOOM,
  DISTANCE_MARKER_ZOOM_MAX,
  DISTANCE_MARKER_ZOOM_MIN,
  MAX_ZOOM,
  MIN_ZOOM,
  OSM_ATTRIBUTION,
  OSM_TILE_URL,
  ZOOM_TO_DISTANCE_INTERVAL_KM
} from '@/constants/map'
import {
  calculateDistanceMarkers,
  isValidCoordinate,
  type DistanceMarkerPoint
} from '@/lib/geoUtils'
import { type DataFilterInfo } from '@/model/map'
import { AutoFitBounds } from './components/AutoFitBounds'
import { DataQualityInfo } from './components/DataQualityInfo'
import { ZoomMonitor } from './components/ZoomMonitor'
import { ZoomControls } from './controls/ZoomControls'
import { DistanceMarker } from './markers/DistanceMarker'
import { EndMarker } from './markers/EndMarker'
import { StartMarker } from './markers/StartMarker'

export interface FitRecord {
  position_lat: number;
  position_long: number;
  timestamp?: string | Date;
  altitude?: number;
  heart_rate?: number;
  cadence?: number;
  distance?: number;
}

export interface TrackData {
  id: string;
  name?: string;
  records: FitRecord[];
  color?: string;
}

export interface FitTrackMapProps {
  tracks: TrackData | TrackData[];
  height?: string;
  defaultZoom?: number;

  showZoomControls?: boolean;
  showStartMarker?: boolean;
  showEndMarker?: boolean;
  showDistanceMarkers?: boolean;
  showDataQualityInfo?: boolean;

  trackColors?: string[];
  className?: string;

  tileLayerUrl?: string;
  tileLayerAttribution?: string;

  onDataFiltered?: (info: {
    totalTracks: number;
    totalRecords: number;
    validRecords: number;
    filteredRecords: number;
  }) => void;
}

function normalizeAndFilterTracks(
  tracks: TrackData | TrackData[],
  onDataFiltered?: (info: DataFilterInfo) => void
): TrackData[] {
  const rawTracks = Array.isArray(tracks) ? tracks : [tracks]

  let totalRecords = 0
  let validRecords = 0

  const filtered = rawTracks
    .map((track) => {
      totalRecords += track.records.length

      const validRecordsList = track.records.filter((record) =>
        isValidCoordinate(record.position_lat, record.position_long)
      )
      validRecords += validRecordsList.length

      return { ...track, records: validRecordsList }
    })
    .filter((track) => track.records.length > 0)

  onDataFiltered?.({
    totalTracks: rawTracks.length,
    totalRecords,
    validRecords,
    filteredRecords: totalRecords - validRecords,
  })

  return filtered
}

/** calculate the LatLngBounds that contains all tracks */
function computeBounds(tracks: TrackData[]): LatLngBounds {
  const bounds = new LatLngBounds([])
  tracks.forEach((track) => {
    track.records.forEach((record) => {
      bounds.extend([record.position_lat, record.position_long])
    })
  })
  return bounds
}

export default function FitTrackMap({
  className,
  tracks,
  defaultZoom = DEFAULT_ZOOM,
  showZoomControls = true,
  showStartMarker = true,
  showEndMarker = true,
  showDistanceMarkers = true,
  showDataQualityInfo = false,
  trackColors = DEFAULT_TRACK_COLORS,
  tileLayerUrl = OSM_TILE_URL,
  tileLayerAttribution = OSM_ATTRIBUTION,
  onDataFiltered,
}: FitTrackMapProps) {
  const [currentZoom, setCurrentZoom] = useState(defaultZoom)

  // use useCallback to avoid unnecessary computation
  const stableOnDataFiltered = useCallback(
    (info: DataFilterInfo) => {
      onDataFiltered?.(info)
    },
    [onDataFiltered]
  )

  const tracksArray = useMemo(
    () => normalizeAndFilterTracks(tracks, stableOnDataFiltered),
    [tracks, stableOnDataFiltered]
  )

  const bounds = useMemo(() => computeBounds(tracksArray), [tracksArray])

  // center of the map
  const center = useMemo(() => {
    if (bounds.isValid()) {
      const c = bounds.getCenter()
      return [c.lat, c.lng] as LatLngExpression
    }
    return [0, 0] as LatLngExpression
  }, [bounds])

  const tracksWithMetadata = useMemo(() => {
    return tracksArray.map((track, index) => {
      const color = track.color || trackColors[index % trackColors.length]
      const positions: LatLngExpression[] = track.records.map((record) => [
        record.position_lat,
        record.position_long,
      ])
      return { ...track, color, positions }
    })
  }, [tracksArray, trackColors])

  /**
   * show distance markers with appropriate interval according to zoom level
   */
  const distanceMarkersByTrack = useMemo<Map<string, DistanceMarkerPoint[]>>(() => {
    if (!showDistanceMarkers) {
      return new Map()
    }

    const clampedZoom = Math.min(
      Math.max(currentZoom, DISTANCE_MARKER_ZOOM_MIN),
      DISTANCE_MARKER_ZOOM_MAX
    )
    const interval = ZOOM_TO_DISTANCE_INTERVAL_KM[clampedZoom]

    const result = new Map<string, ReturnType<typeof calculateDistanceMarkers>>()
    tracksWithMetadata.forEach((track) => {
      result.set(track.id, calculateDistanceMarkers(track.records, interval))
    })
    return result
  }, [showDistanceMarkers, currentZoom, tracksWithMetadata])

  const handleZoomChange = useCallback((zoom: number) => {
    setCurrentZoom(zoom)
  }, [])

  return (
    <div
      className={`relative ${className || ''}`}
    >
      <MapContainer
        center={center}
        zoom={defaultZoom}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg shadow-lg"
      >
        <TileLayer
          url={tileLayerUrl}
          attribution={tileLayerAttribution}
        />

        <AutoFitBounds bounds={bounds} />
        <ZoomMonitor onZoomChange={handleZoomChange} />

        {showDataQualityInfo && <DataQualityInfo tracks={tracksArray} />}

        {tracksWithMetadata.map((track) => (
          <React.Fragment key={track.id}>
            <Polyline
              positions={track.positions}
              color={track.color}
              weight={4}
              opacity={0.8}
            />

            {showStartMarker && track.records.length > 0 && (
              <StartMarker
                position={[
                  track.records[0].position_lat,
                  track.records[0].position_long,
                ]}
                color={track.color}
                trackName={track.name}
              />
            )}

            {showEndMarker && track.records.length > 0 && (
              <EndMarker
                position={[
                  track.records[track.records.length - 1].position_lat,
                  track.records[track.records.length - 1].position_long,
                ]}
                color={track.color}
                trackName={track.name}
              />
            )}

            {showDistanceMarkers &&
              (distanceMarkersByTrack.get(track.id) ?? []).map((marker, idx) => (
                <DistanceMarker
                  key={`${track.id}-distance-${idx}`}
                  position={marker.position}
                  distance={marker.distance}
                  color={track.color}
                />
              ))}
          </React.Fragment>
        ))}

        {showZoomControls && <ZoomControls />}

        <ScaleControl position="bottomleft" />
      </MapContainer>
    </div>
  )
}
