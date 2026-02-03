import { useMemo } from 'react'
import { isValidCoordinate } from '@/lib/geoUtils'
import type { TrackData } from '@/model/map'

export interface DataQualityInfoProps {
  tracks: TrackData[];
}

interface DataQualityStats {
  totalRecords: number;
  validRecords: number;
  filteredRecords: number;
  qualityPercentage: string;
}

function computeDataQualityStats(tracks: TrackData[]): DataQualityStats {
  let totalRecords = 0;
  let validRecords = 0;

  tracks.forEach((track) => {
    totalRecords += track.records.length;
    validRecords += track.records.filter((record) =>
      isValidCoordinate(record.position_lat, record.position_long)
    ).length;
  });

  return {
    totalRecords,
    validRecords,
    filteredRecords: totalRecords - validRecords,
    qualityPercentage: totalRecords > 0
      ? ((validRecords / totalRecords) * 100).toFixed(1)
      : '0',
  };
}

export function DataQualityInfo({ tracks }: DataQualityInfoProps) {
  const stats = useMemo(() => computeDataQualityStats(tracks), [tracks]);

  if (stats.filteredRecords === 0) {
    return null;
  }

  return (
    <div className="absolute top-2.5 left-2.5 z-1000 bg-white/95 rounded-lg shadow-md px-3 py-2 text-sm font-sans">
      <div className="font-semibold text-gray-800 mb-1">資料品質</div>
      <div className="text-gray-500">
        有效點: {stats.validRecords} / {stats.totalRecords}
        {' '}({stats.qualityPercentage}%)
      </div>
      <div className="text-amber-500 text-xs mt-0.5">
        ⚠️ 已過濾 {stats.filteredRecords} 個無效點
      </div>
    </div>
  );
}
