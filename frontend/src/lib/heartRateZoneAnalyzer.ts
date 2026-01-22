import { HeartRateZoneLowerBounds } from '@/constants/heartRateZone';

type HeartRateZone = 'zone1' | 'zone2' | 'zone3' | 'zone4' | 'zone5' | null;

interface HeartRateZoneLowerBounds {
  zone1: number;
  zone2: number;
  zone3: number;
  zone4: number;
  zone5: number;
  max: number;
}

interface HeartRateRecord {
  timestamp: string | Date;
  heartRate: number;
}

interface ClassifiedRecord extends HeartRateRecord {
  zone: HeartRateZone;
  hrrPercentage: number;
}

interface ZoneStatistics {
  total: number;
  validRecords: number;
  invalidRecords: number;
  data: {
    [K in NonNullable<HeartRateZone>]: {
      count: number;
      percentage: number;
    }
  } & {
    null?: {
      count: number;
      percentage: number;
    };
  };
}

// Getter function type for flexible data extraction
type HeartRateGetter<T> = (record: T) => number;

class HeartRateZoneAnalyzer {
  private static readonly MIN_RESTING_HR = 30;
  private static readonly MAX_RESTING_HR = 100;
  private static readonly MIN_MAX_HR = 100;
  private static readonly MAX_MAX_HR = 220;

  private restingHR: number;
  private maxHR: number;
  private hrReserve: number;

  private readonly zoneLowerBounds: HeartRateZoneLowerBounds = HeartRateZoneLowerBounds

  constructor(restingHR: number, maxHR: number) {
    if (restingHR >= maxHR) {
      throw new Error(`Resting heart rate (${restingHR}) should be greater than max heart rate (${maxHR})`);
    }
    if (restingHR < HeartRateZoneAnalyzer.MIN_RESTING_HR ||
      restingHR > HeartRateZoneAnalyzer.MAX_RESTING_HR) {
      throw new Error(
        `Resting heart rate (${restingHR}) is beyond reasonable range (${HeartRateZoneAnalyzer.MIN_RESTING_HR}-${HeartRateZoneAnalyzer.MAX_RESTING_HR} bpm)`
      );
    }
    if (maxHR < HeartRateZoneAnalyzer.MIN_MAX_HR ||
      maxHR > HeartRateZoneAnalyzer.MAX_MAX_HR) {
      throw new Error(
        `Max heart rate (${maxHR}) is beyond reasonable range (${HeartRateZoneAnalyzer.MIN_MAX_HR}-${HeartRateZoneAnalyzer.MAX_MAX_HR} bpm)`
      );
    }

    this.restingHR = restingHR;
    this.maxHR = maxHR;
    this.hrReserve = maxHR - restingHR;
  }

  private validateHeartRate(heartRate: number): void {
    if (typeof heartRate !== 'number' || !isFinite(heartRate)) {
      throw new Error(`invalid heart rate: ${heartRate}`);
    }
    if (heartRate < 0) {
      throw new Error(`heart rate cannot be negative: ${heartRate}`);
    }
  }

  calculateHRRPercentage(currentHR: number): number {
    this.validateHeartRate(currentHR);

    if (currentHR <= this.restingHR) {
      return 0;
    }
    if (currentHR >= this.maxHR) {
      return 1;
    }
    return (currentHR - this.restingHR) / this.hrReserve;
  }

  getZoneByPercentage(hrrPercentage: number): HeartRateZone {
    if (hrrPercentage < this.zoneLowerBounds.zone1) {
      return null;
    }
    if (hrrPercentage < this.zoneLowerBounds.zone2) {
      return 'zone1';
    }
    if (hrrPercentage < this.zoneLowerBounds.zone3) {
      return 'zone2';
    }
    if (hrrPercentage < this.zoneLowerBounds.zone4) {
      return 'zone3';
    }
    if (hrrPercentage < this.zoneLowerBounds.zone5) {
      return 'zone4';
    }
    if (hrrPercentage <= this.zoneLowerBounds.max) {
      return 'zone5';
    }
    return null;
  }

  getZone(currentHR: number): HeartRateZone {
    const percentage = this.calculateHRRPercentage(currentHR);
    return this.getZoneByPercentage(percentage);
  }

  calculateTargetHR(hrrPercentage: number): number {
    return Math.round(this.restingHR + (this.hrReserve * hrrPercentage));
  }

  getZoneRanges(): Record<NonNullable<HeartRateZone>, { min: number; max: number; }> {
    return {
      zone1: {
        min: this.calculateTargetHR(this.zoneLowerBounds.zone1),
        max: this.calculateTargetHR(this.zoneLowerBounds.zone2)
      },
      zone2: {
        min: this.calculateTargetHR(this.zoneLowerBounds.zone2),
        max: this.calculateTargetHR(this.zoneLowerBounds.zone3)
      },
      zone3: {
        min: this.calculateTargetHR(this.zoneLowerBounds.zone3),
        max: this.calculateTargetHR(this.zoneLowerBounds.zone4)
      },
      zone4: {
        min: this.calculateTargetHR(this.zoneLowerBounds.zone4),
        max: this.calculateTargetHR(this.zoneLowerBounds.zone5)
      },
      zone5: {
        min: this.calculateTargetHR(this.zoneLowerBounds.zone5),
        max: this.maxHR
      }
    };
  }

  classifyRecords(records: HeartRateRecord[]): ClassifiedRecord[];

  classifyRecords<T>(
    records: T[],
    heartRateGetter: HeartRateGetter<T>
  ): Array<T & { zone: HeartRateZone; hrrPercentage: number; }>;

  classifyRecords<T extends HeartRateRecord>(
    records: T[],
    heartRateGetter?: HeartRateGetter<T>
  ): Array<T & { zone: HeartRateZone; hrrPercentage: number; }> {
    if (!Array.isArray(records)) {
      throw new Error('records should be array');
    }

    const hrGetter: HeartRateGetter<T> = heartRateGetter ?? ((r: T) => (r as HeartRateRecord).heartRate);

    return records.map(record => {
      try {
        const hr = hrGetter(record);
        const hrrPercentage = this.calculateHRRPercentage(hr);
        const zone = this.getZoneByPercentage(hrrPercentage);

        return {
          ...record,
          hrrPercentage,
          zone
        };
      } catch (error) {
        return {
          ...record,
          hrrPercentage: 0,
          zone: null
        };
      }
    });
  }

  calculateZoneStatistics(records: HeartRateRecord[]): ZoneStatistics;

  calculateZoneStatistics<T>(
    records: T[],
    heartRateGetter: HeartRateGetter<T>
  ): ZoneStatistics;

  calculateZoneStatistics<T extends HeartRateRecord>(
    records: T[],
    heartRateGetter?: HeartRateGetter<T>
  ): ZoneStatistics {
    if (!Array.isArray(records)) {
      throw new Error('records should be array');
    }

    if (records.length === 0) {
      return this.createEmptyDistribution();
    }

    const hrGetter: HeartRateGetter<T> = heartRateGetter ?? ((r: T) => (r as HeartRateRecord).heartRate);

    const zoneMap = new Map<HeartRateZone, { count: number; }>();
    let invalidCount = 0;

    records.forEach(record => {
      try {
        const hr = hrGetter(record);
        this.validateHeartRate(hr);
        const zone = this.getZone(hr);

        const current = zoneMap.get(zone) ?? { count: 0 };
        zoneMap.set(zone, {
          count: current.count + 1
        });
      } catch (error) {
        invalidCount++;
      }
    });

    const total = records.length;
    const validRecords = total - invalidCount;

    const data: ZoneStatistics['data'] = {
      zone1: { count: 0, percentage: 0 },
      zone2: { count: 0, percentage: 0 },
      zone3: { count: 0, percentage: 0 },
      zone4: { count: 0, percentage: 0 },
      zone5: { count: 0, percentage: 0 }
    };

    const zones: Array<NonNullable<HeartRateZone> | null> = ['zone1', 'zone2', 'zone3', 'zone4', 'zone5', null];

    zones.forEach(zone => {
      const zoneData = zoneMap.get(zone);
      if (zoneData) {
        const count = zoneData.count;
        const percentage = validRecords > 0 ? Math.round((count / validRecords) * 10000) / 100 : 0;

        if (zone === null) {
          data.null = { count, percentage };
        } else {
          data[zone] = { count, percentage };
        }
      }
    });

    return {
      total,
      validRecords,
      invalidRecords: invalidCount,
      data
    };
  }

  private createEmptyDistribution(): ZoneStatistics {
    return {
      total: 0,
      validRecords: 0,
      invalidRecords: 0,
      data: {
        zone1: { count: 0, percentage: 0 },
        zone2: { count: 0, percentage: 0 },
        zone3: { count: 0, percentage: 0 },
        zone4: { count: 0, percentage: 0 },
        zone5: { count: 0, percentage: 0 }
      }
    };
  }

  getInfo() {
    return {
      restingHR: this.restingHR,
      maxHR: this.maxHR,
      hrReserve: this.hrReserve,
      zoneRanges: this.getZoneRanges()
    };
  }
}

export {
  HeartRateZoneAnalyzer
}
