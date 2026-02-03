import { type LatLngExpression } from 'leaflet';
import {
  EARTH_RADIUS_KM,
  LATITUDE_MIN,
  LATITUDE_MAX,
  LONGITUDE_MIN,
  LONGITUDE_MAX,
  MAX_SEGMENT_DISTANCE_KM,
} from '@/constants/map';
import { type FitRecord } from '@/model/map';

export interface DistanceMarkerPoint {
  position: LatLngExpression;
  distance: number;
}

/**
 * validate latitude and longitude.
 * filter out invalid coordinates.
 */
export function isValidCoordinate(lat?: number | null, lng?: number | null): boolean {
  return (
    lat != null &&
    lng != null &&
    !isNaN(lat) &&
    !isNaN(lng) &&
    lat >= LATITUDE_MIN &&
    lat <= LATITUDE_MAX &&
    lng >= LONGITUDE_MIN &&
    lng <= LONGITUDE_MAX
  );
}

/**
 * Calculate the distance between two coordinates in kilometers.
 * User Haversine formula.
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180

  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return EARTH_RADIUS_KM * c
}

/**
 * Calculate the number of decimal places in a number.
 * For example, 0.2 → 1、0.05 → 2、5 → 0。
 * Used to format distance marker labels appropriately.
 */
function getDecimalPlaces(value: number): number {
  const str = String(value);
  const dotIndex = str.indexOf('.');
  return dotIndex === -1 ? 0 : str.length - dotIndex - 1;
}

/**
 * Calculate distance markers at specified intervals along the track records.
 * Skips invalid coordinates and abnormal jumps.
 */
export function calculateDistanceMarkers(
  records: FitRecord[],
  interval: number
): DistanceMarkerPoint[] {
  if (records.length < 2) {
    return [];
  }

  const markers: DistanceMarkerPoint[] = [];
  const decimalPlaces = getDecimalPlaces(interval)
  let accumulatedDistance = 0
  let nextMarkerDistance = interval

  for (let i = 1; i < records.length; i++) {
    const prev = records[i - 1]
    const curr = records[i]

    if (
      !isValidCoordinate(prev.position_lat, prev.position_long) ||
      !isValidCoordinate(curr.position_lat, curr.position_long)
    ) {
      continue
    }

    const segmentDistance = calculateDistance(
      prev.position_lat,
      prev.position_long,
      curr.position_lat,
      curr.position_long
    );

    // Skip abnormal jumps
    if (isNaN(segmentDistance) || segmentDistance > MAX_SEGMENT_DISTANCE_KM) {
      continue
    }

    accumulatedDistance += segmentDistance

    // there may be multiple markers in one segment when interval is small
    while (accumulatedDistance >= nextMarkerDistance) {
      const excessDistance = accumulatedDistance - nextMarkerDistance
      const ratio = 1 - (excessDistance / segmentDistance)

      const markerLat = prev.position_lat + ((curr.position_lat - prev.position_lat) * ratio)
      const markerLng = prev.position_long + ((curr.position_long - prev.position_long) * ratio)

      markers.push({
        position: [markerLat, markerLng],
        distance: Number(nextMarkerDistance.toFixed(decimalPlaces))
      })

      nextMarkerDistance += interval
    }
  }

  return markers
}
