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

export interface ParsedTrack {
  name: string;
  points: TrackPoint[];
  stats: TrackStats;
}
