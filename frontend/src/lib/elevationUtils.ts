import type { TrackPoint, TrackStats } from '@/model/gpx'

const EARTH_RADIUS_KM = 6371

function toRad(deg: number): number {
  return (deg * Math.PI) / 180
}

/**
 * Haversine distance between two lat/lon points in kilometres.
 */
function haversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

/**
 * Compute summary statistics for a track.
 */
export function computeTrackStats(points: TrackPoint[]): TrackStats {
  if (points.length === 0) {
    return {
      totalPoints: 0,
      distance: 0,
      elevationGain: 0,
      elevationLoss: 0,
      maxElevation: 0,
      minElevation: 0,
      startTime: null,
      endTime: null,
      duration: null,
    }
  }

  let distance = 0
  let elevationGain = 0
  let elevationLoss = 0
  let maxElevation = -Infinity
  let minElevation = Infinity

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]!
    const curr = points[i]!

    distance += haversineKm(prev.lat, prev.lon, curr.lat, curr.lon)

    if (curr.elevation !== null && prev.elevation !== null) {
      const diff = curr.elevation - prev.elevation
      if (diff > 0) {
        elevationGain += diff
      } else {
        elevationLoss += Math.abs(diff)
      }
    }
  }

  for (const p of points) {
    if (p.elevation !== null) {
      if (p.elevation > maxElevation) {
        maxElevation = p.elevation
      }
      if (p.elevation < minElevation) {
        minElevation = p.elevation
      }
    }
  }

  const startTime = points[0]?.time ?? null
  const endTime = points[points.length - 1]?.time ?? null
  const duration =
    startTime && endTime
      ? (endTime.getTime() - startTime.getTime()) / 1000
      : null

  return {
    totalPoints: points.length,
    distance: Math.round(distance * 100) / 100,
    elevationGain: Math.round(elevationGain),
    elevationLoss: Math.round(elevationLoss),
    maxElevation: maxElevation === -Infinity ? 0 : Math.round(maxElevation),
    minElevation: minElevation === Infinity ? 0 : Math.round(minElevation),
    startTime,
    endTime,
    duration,
  }
}

/**
 * Format seconds into "HH:mm:ss" string.
 */
export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':')
}
