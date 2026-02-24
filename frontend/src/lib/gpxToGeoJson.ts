import type { GeoJSON, Feature, LineString, FeatureCollection, Point } from 'geojson'
import type { TrackPoint } from '@/model/gpx'

/**
 * Convert an array of TrackPoints to a GeoJSON LineString Feature.
 * The elevation (if available) is stored as the third coordinate (Z).
 */
export function trackPointsToLineString(
  points: TrackPoint[],
): Feature<LineString> {
  return {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: points.map((p) =>
        p.elevation !== null
          ? [p.lon, p.lat, p.elevation]
          : [p.lon, p.lat],
      ),
    },
  }
}

/**
 * Convert an array of TrackPoints to a GeoJSON FeatureCollection of Points.
 * Each point feature carries elevation and time metadata as properties,
 * which can be used for popups or elevation profile interaction.
 */
export function trackPointsToPointCollection(
  points: TrackPoint[],
): FeatureCollection<Point> {
  return {
    type: 'FeatureCollection',
    features: points.map((p, index) => ({
      type: 'Feature',
      id: index,
      properties: {
        index,
        elevation: p.elevation,
        time: p.time?.toISOString() ?? null,
        lat: p.lat,
        lon: p.lon,
      },
      geometry: {
        type: 'Point',
        coordinates:
          p.elevation !== null
            ? [p.lon, p.lat, p.elevation]
            : [p.lon, p.lat],
      },
    })),
  }
}

export type { GeoJSON }
