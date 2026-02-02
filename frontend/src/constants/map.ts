export const EARTH_RADIUS_KM = 6371;

// latitude valid range
export const LATITUDE_MIN = -90;
export const LATITUDE_MAX = 90;

// longitude valid range
export const LONGITUDE_MIN = -180;
export const LONGITUDE_MAX = 180;

/**maximum distance (km) between two consecutive points to be considered in the same segment */
export const MAX_SEGMENT_DISTANCE_KM = 1;

// map defaults
export const DEFAULT_ZOOM = 13;

/**
 * mapping of leaflet zoom level and distance marker interval (km)
 * zoom level not listed in the table will be clamped to the boundary level in the table
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

// zoom level not listed in the table will be clamped to the min and max level in the table
export const DISTANCE_MARKER_ZOOM_MIN = 7;
export const DISTANCE_MARKER_ZOOM_MAX = 18;

/** padding of fit bounds (in pixels) */
export const FIT_BOUNDS_PADDING = 50;

// OpenStreetMap
export const OSM_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
export const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// track color palette
export const DEFAULT_TRACK_COLORS = [
  '#FF6B6B', // red
  '#4ECDC4', // green
  '#45B7D1', // blue
  '#FFA07A', // orange
  '#98D8C8', // mint
  '#FFD93D', // yellow
  '#6C5CE7', // purple
  '#A8E6CF', // light green
];

// Polyline Style
export const POLYLINE_WEIGHT = 4;
export const POLYLINE_OPACITY = 0.8;
