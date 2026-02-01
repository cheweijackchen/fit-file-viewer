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
export const DEFAULT_DISTANCE_INTERVAL_KM = 1;
export const DEFAULT_MIN_ZOOM_FOR_DISTANCE_MARKERS = 12;

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
