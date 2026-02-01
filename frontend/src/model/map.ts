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

// 資料過濾後的統計資訊
export interface DataFilterInfo {
  totalTracks: number;
  totalRecords: number;
  validRecords: number;
  filteredRecords: number;
}
