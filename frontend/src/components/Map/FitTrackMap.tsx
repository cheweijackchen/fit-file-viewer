import { LatLngBounds, type LatLngExpression } from 'leaflet';
import React, { useState, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
  DEFAULT_DISTANCE_INTERVAL_KM,
  DEFAULT_MIN_ZOOM_FOR_DISTANCE_MARKERS,
  DEFAULT_TRACK_COLORS,
  DEFAULT_ZOOM,
  OSM_ATTRIBUTION,
  OSM_TILE_URL
} from '@/constants/map';
import { calculateDistanceMarkers, isValidCoordinate } from '@/lib/geoUtils';
import { type DataFilterInfo } from '@/model/map';
import { AutoFitBounds } from './components/AutoFitBounds';
import { DataQualityInfo } from './components/DataQualityInfo';
import { ZoomMonitor } from './components/ZoomMonitor';
import { ZoomControls } from './controls/ZoomControls';
import { DistanceMarker } from './markers/DistanceMarker';
import { EndMarker } from './markers/EndMarker';
import { StartMarker } from './markers/StartMarker';

// FIT 檔案 record 的介面定義
export interface FitRecord {
  position_lat: number;
  position_long: number;
  timestamp?: string | Date;
  altitude?: number;
  heart_rate?: number;
  cadence?: number;
  distance?: number;
}

// 單條軌跡的資料結構
export interface TrackData {
  id: string;
  name?: string;
  records: FitRecord[];
  color?: string;
}

// 組件的 Props
export interface FitTrackMapProps {
  tracks: TrackData | TrackData[];
  height?: string;
  defaultZoom?: number;

  // 功能開關
  showZoomControls?: boolean;
  showStartMarker?: boolean;
  showEndMarker?: boolean;
  showDistanceMarkers?: boolean;
  showDataQualityInfo?: boolean; // 顯示資料品質資訊

  // 距離標記設定
  distanceInterval?: number; // 公里間隔，預設為 1
  minZoomForDistanceMarkers?: number; // 最小縮放級別才顯示距離標記

  // 顏色設定
  defaultColors?: string[];
  className?: string;

  // 地圖設定
  tileLayerUrl?: string;
  tileLayerAttribution?: string;

  // 回調函數
  onDataFiltered?: (info: {
    totalTracks: number;
    totalRecords: number;
    validRecords: number;
    filteredRecords: number;
  }) => void;
}

/** 將單一或多個 TrackData 標準化為陣列，並過濾無效座標點 */
function normalizeAndFilterTracks(
  tracks: TrackData | TrackData[],
  onDataFiltered?: (info: DataFilterInfo) => void
): TrackData[] {
  const rawTracks = Array.isArray(tracks) ? tracks : [tracks];

  let totalRecords = 0;
  let validRecords = 0;

  const filtered = rawTracks
    .map((track) => {
      totalRecords += track.records.length;

      const validRecordsList = track.records.filter((record) =>
        isValidCoordinate(record.position_lat, record.position_long)
      );
      validRecords += validRecordsList.length;

      return { ...track, records: validRecordsList };
    })
    .filter((track) => track.records.length > 0);

  onDataFiltered?.({
    totalTracks: rawTracks.length,
    totalRecords,
    validRecords,
    filteredRecords: totalRecords - validRecords,
  });

  return filtered;
}

/** calculate the LatLngBounds that contains all tracks */
function computeBounds(tracks: TrackData[]): LatLngBounds {
  const bounds = new LatLngBounds([])
  tracks.forEach((track) => {
    track.records.forEach((record) => {
      bounds.extend([record.position_lat, record.position_long])
    })
  })
  return bounds;
}

export function FitTrackMap({
  className,
  tracks,
  defaultZoom = DEFAULT_ZOOM,
  showZoomControls = true,
  showStartMarker = true,
  showEndMarker = true,
  showDistanceMarkers = true,
  showDataQualityInfo = false,
  distanceInterval = DEFAULT_DISTANCE_INTERVAL_KM,
  minZoomForDistanceMarkers = DEFAULT_MIN_ZOOM_FOR_DISTANCE_MARKERS,
  defaultColors = DEFAULT_TRACK_COLORS,
  tileLayerUrl = OSM_TILE_URL,
  tileLayerAttribution = OSM_ATTRIBUTION,
  onDataFiltered,
}: FitTrackMapProps) {
  const [currentZoom, setCurrentZoom] = useState(defaultZoom);

  // onDataFiltered 在 useMemo 的 deps 裡使用，
  // 用 useCallback 穩定引用以避免不必要的重新計算
  const stableOnDataFiltered = useCallback(
    (info: DataFilterInfo) => {
      onDataFiltered?.(info);
    },
    [onDataFiltered]
  );

  const tracksArray = useMemo(
    () => normalizeAndFilterTracks(tracks, stableOnDataFiltered),
    [tracks, stableOnDataFiltered]
  );

  const bounds = useMemo(() => computeBounds(tracksArray), [tracksArray])

  // center of the map
  const center = useMemo(() => {
    if (bounds.isValid()) {
      const c = bounds.getCenter();
      return [c.lat, c.lng] as LatLngExpression;
    }
    return [0, 0] as LatLngExpression;
  }, [bounds]);

  /** tracks with metadata including color, positions, and distanceMarkers */
  const tracksWithMetadata = useMemo(() => {
    return tracksArray.map((track, index) => {
      const color = track.color || defaultColors[index % defaultColors.length];
      const positions: LatLngExpression[] = track.records.map((record) => [
        record.position_lat,
        record.position_long,
      ]);
      const distanceMarkers = showDistanceMarkers
        ? calculateDistanceMarkers(track.records, distanceInterval)
        : [];

      return { ...track, color, positions, distanceMarkers };
    });
  }, [tracksArray, defaultColors, showDistanceMarkers, distanceInterval]);

  const handleZoomChange = useCallback((zoom: number) => {
    setCurrentZoom(zoom);
  }, []);

  // 決定是否顯示距離標記
  const shouldShowDistanceMarkers = currentZoom >= minZoomForDistanceMarkers;

  return (
    <div
      className={`relative ${className || ''}`}
    // style={{ height }}
    >
      <MapContainer
        center={center}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        className="rounded-lg shadow-lg"
      >
        <TileLayer
          url={tileLayerUrl}
          attribution={tileLayerAttribution}
        />

        <AutoFitBounds bounds={bounds} />
        <ZoomMonitor onZoomChange={handleZoomChange} />

        {showDataQualityInfo && <DataQualityInfo tracks={tracksArray} />}

        {/* 渲染所有軌跡 */}
        {tracksWithMetadata.map((track) => (
          <React.Fragment key={track.id}>
            {/* 軌跡線 */}
            <Polyline
              positions={track.positions}
              color={track.color}
              weight={4}
              opacity={0.8}
            />

            {/* 起點標記 */}
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

            {/* 終點標記 */}
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

            {/* 距離標記 */}
            {showDistanceMarkers &&
              shouldShowDistanceMarkers &&
              track.distanceMarkers.map((marker, idx) => (
                <DistanceMarker
                  key={`${track.id}-distance-${idx}`}
                  position={marker.position}
                  distance={marker.distance}
                  color={track.color}
                />
              ))}
          </React.Fragment>
        ))}

        {/* 縮放控制 */}
        {showZoomControls && <ZoomControls />}
      </MapContainer>
    </div>
  );
};

export default FitTrackMap;
