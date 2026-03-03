export interface TrackPoint {
  lat: number;
  lon: number;
  elevation: number | null;
  time: Date | null;
}

export interface TrackStats {
  totalPoints: number;
  distance: number;          // km
  elevationGain: number;     // m
  elevationLoss: number;     // m
  maxElevation: number;      // m
  minElevation: number;      // m
  startTime: Date | null;
  endTime: Date | null;
  duration: number | null;   // seconds
}

export interface Waypoint {
  lat: number;
  lon: number;
  elevation: number | null;
  name: string | null;
  description: string | null;
  symbol: string | null;
  time: Date | null;
}

export interface ParsedTrack {
  name: string;
  points: TrackPoint[];
  waypoints: Waypoint[];
  stats: TrackStats;
}
