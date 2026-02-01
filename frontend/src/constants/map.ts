export const EARTH_RADIUS_KM = 6371;

// latitude valid range
export const LATITUDE_MIN = -90;
export const LATITUDE_MAX = 90;

// longitude valid range
export const LONGITUDE_MIN = -180;
export const LONGITUDE_MAX = 180;

/** GPS 單段異常跳點的最大允許距離（公里） */
export const MAX_SEGMENT_DISTANCE_KM = 1;

// map defaults
export const DEFAULT_ZOOM = 13;
/**
 * Leaflet zoom level → 距離標記間隔（km）的對應表。
 *
 * zoom 每 +1 是畫面尺寸 ×2，因此適合的間隔大約每隔幾個 level 縮小一個刻度。
 * 間隔值全部取自 1-2-5 進制序列，讓標記上的數值看起來自然。
 * 表中沒列的 zoom（< 7 或 > 18）會用最接近端點的值。
 */
export const ZOOM_TO_DISTANCE_INTERVAL_KM: Record<number, number> = {
  7: 500,
  8: 200,
  9: 100,
  10: 50,
  11: 20,
  12: 10,
  13: 5,
  14: 2,
  15: 1,
  16: 1,
  17: 0.5,
  18: 0.2,
};

/** 對應表裡的最小和最大 zoom，用於 clamp 超出範圍的值 */
export const DISTANCE_MARKER_ZOOM_MIN = 7;
export const DISTANCE_MARKER_ZOOM_MAX = 18;

/** AutoFitBounds 時四周的 padding（像素） */
export const FIT_BOUNDS_PADDING = 50;

// OpenStreetMap
export const OSM_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
export const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// track color palette
export const DEFAULT_TRACK_COLORS = [
  '#FF6B6B', // 紅色
  '#4ECDC4', // 青綠色
  '#45B7D1', // 藍色
  '#FFA07A', // 淺橙色
  '#98D8C8', // 薄荷綠
  '#FFD93D', // 黃色
  '#6C5CE7', // 紫色
  '#A8E6CF', // 淺綠色
];

// Polyline Style
export const POLYLINE_WEIGHT = 4;
export const POLYLINE_OPACITY = 0.8;
