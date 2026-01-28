import { LatLngBounds, type LatLngExpression } from 'leaflet';
import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
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

// 自動調整地圖視野的組件
const AutoFitBounds: React.FC<{ bounds: LatLngBounds; }> = ({ bounds }) => {
  const map = useMap();

  useEffect(() => {
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, bounds]);

  return null;
};

// 計算兩點之間的距離（公里）
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // 地球半徑（公里）
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// 計算軌跡上的距離標記位置
const calculateDistanceMarkers = (
  records: FitRecord[],
  interval: number
): Array<{ position: LatLngExpression; distance: number; }> => {
  if (records.length < 2) {
    return [];
  }

  const markers: Array<{ position: LatLngExpression; distance: number; }> = [];
  let accumulatedDistance = 0;
  let nextMarkerDistance = interval;

  for (let i = 1; i < records.length; i++) {
    const prev = records[i - 1];
    const curr = records[i];

    // 跳過無效的座標點
    if (
      !prev.position_lat || !prev.position_long ||
      !curr.position_lat || !curr.position_long
    ) {
      continue;
    }

    const segmentDistance = calculateDistance(
      prev.position_lat,
      prev.position_long,
      curr.position_lat,
      curr.position_long
    );

    // 跳過異常的距離（例如 GPS 跳點）
    if (isNaN(segmentDistance) || segmentDistance > 1) {
      continue;
    }

    accumulatedDistance += segmentDistance;

    // 如果累積距離超過下一個標記點
    while (accumulatedDistance >= nextMarkerDistance) {
      // 在這個線段上插值找到精確的標記位置
      const excessDistance = accumulatedDistance - nextMarkerDistance;
      const ratio = 1 - excessDistance / segmentDistance;

      const markerLat = prev.position_lat + (curr.position_lat - prev.position_lat) * ratio;
      const markerLng = prev.position_long + (curr.position_long - prev.position_long) * ratio;

      markers.push({
        position: [markerLat, markerLng],
        distance: nextMarkerDistance,
      });

      nextMarkerDistance += interval;
    }
  }

  return markers;
};

export const FitTrackMap: React.FC<FitTrackMapProps> = ({
  tracks,
  // height = '600px',
  defaultZoom = 13,
  showZoomControls = true,
  showStartMarker = true,
  showEndMarker = true,
  showDistanceMarkers = true,
  showDataQualityInfo = false,
  distanceInterval = 1,
  minZoomForDistanceMarkers = 12,
  defaultColors = [
    '#FF6B6B', // 紅色
    '#4ECDC4', // 青綠色
    '#45B7D1', // 藍色
    '#FFA07A', // 淺橙色
    '#98D8C8', // 薄荷綠
    '#FFD93D', // 黃色
    '#6C5CE7', // 紫色
    '#A8E6CF', // 淺綠色
  ],
  className,
  tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  tileLayerAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  onDataFiltered,
}) => {
  // 驗證座標是否有效
  const isValidCoordinate = (lat?: number, lng?: number): boolean => {
    return (
      lat !== undefined &&
      lat !== null &&
      lng !== undefined &&
      lng !== null &&
      !isNaN(lat) &&
      !isNaN(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    );
  };

  // 標準化 tracks 為陣列，並過濾無效的座標點
  const tracksArray = useMemo(() => {
    const rawTracks = Array.isArray(tracks) ? tracks : [tracks];

    let totalRecords = 0;
    let validRecords = 0;

    // 過濾每條軌跡中的無效記錄點
    const filtered = rawTracks.map((track) => {
      const originalLength = track.records.length;
      totalRecords += originalLength;

      const validRecordsList = track.records.filter((record) =>
        isValidCoordinate(record.position_lat, record.position_long)
      );

      validRecords += validRecordsList.length;

      return {
        ...track,
        records: validRecordsList,
      };
    }).filter((track) => track.records.length > 0); // 移除沒有有效點的軌跡

    // 觸發回調函數
    if (onDataFiltered) {
      onDataFiltered({
        totalTracks: rawTracks.length,
        totalRecords,
        validRecords,
        filteredRecords: totalRecords - validRecords,
      });
    }

    return filtered;
  }, [tracks, onDataFiltered]);

  // 計算所有軌跡的邊界
  const bounds = useMemo(() => {
    const bounds = new LatLngBounds([]);

    tracksArray.forEach((track) => {
      track.records.forEach((record) => {
        bounds.extend([record.position_lat, record.position_long]);
      });
    });

    return bounds;
  }, [tracksArray]);

  // 計算中心點
  const center = useMemo(() => {
    if (bounds.isValid()) {
      const c = bounds.getCenter();
      return [c.lat, c.lng] as LatLngExpression;
    }
    return [0, 0] as LatLngExpression;
  }, [bounds]);

  // 為每條軌跡分配顏色並計算距離標記
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

      return {
        ...track,
        color,
        positions,
        distanceMarkers,
      };
    });
  }, [tracksArray, defaultColors, showDistanceMarkers, distanceInterval]);

  const [currentZoom, setCurrentZoom] = React.useState(defaultZoom);

  // 監控縮放等級的組件
  const ZoomMonitor: React.FC = () => {
    const map = useMap();

    useEffect(() => {
      const handleZoom = () => {
        setCurrentZoom(map.getZoom());
      };

      map.on('zoomend', handleZoom);
      setCurrentZoom(map.getZoom());

      return () => {
        map.off('zoomend', handleZoom);
      };
    }, [map]);

    return null;
  };

  // 計算資料品質統計
  const dataQualityStats = useMemo(() => {
    const rawTracks = Array.isArray(tracks) ? tracks : [tracks];
    let totalRecords = 0;
    let validRecords = 0;

    rawTracks.forEach((track) => {
      totalRecords += track.records.length;
      validRecords += track.records.filter((record) =>
        isValidCoordinate(record.position_lat, record.position_long)
      ).length;
    });

    return {
      totalRecords,
      validRecords,
      filteredRecords: totalRecords - validRecords,
      qualityPercentage: totalRecords > 0 ? ((validRecords / totalRecords) * 100).toFixed(1) : '0',
    };
  }, [tracks]);

  // 決定是否顯示距離標記
  const shouldShowDistanceMarkers = currentZoom >= minZoomForDistanceMarkers;

  return (
    <div
      className={`relative ${className || ''}`}
    // style={{ height }}
    >
      {/* 資料品質資訊（可選） */}
      {showDataQualityInfo && dataQualityStats.filteredRecords > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            zIndex: 1000,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            padding: '8px 12px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            fontSize: '13px',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div style={{ fontWeight: '600', color: '#333', marginBottom: '4px' }}>
            資料品質
          </div>
          <div style={{ color: '#666' }}>
            有效點: {dataQualityStats.validRecords} / {dataQualityStats.totalRecords}
            {' '}({dataQualityStats.qualityPercentage}%)
          </div>
          {dataQualityStats.filteredRecords > 0 && (
            <div style={{ color: '#f59e0b', fontSize: '12px', marginTop: '2px' }}>
              ⚠️ 已過濾 {dataQualityStats.filteredRecords} 個無效點
            </div>
          )}
        </div>
      )}

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
        <ZoomMonitor />

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
