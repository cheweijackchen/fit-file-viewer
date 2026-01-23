import { FIT_PARSER_LENGTH_UNIT, FIT_PARSER_SPEED_UNIT } from '@/constants/fitData';
import { METERS_PER_KILOMETER, METERS_PER_MILE, METERS_PER_FOOT, KMH_TO_MS_FACTOR, MPH_TO_MS_FACTOR, SECONDS_PER_MINUTE } from '@/constants/units';

type LengthUnit = 'm' | 'km' | 'mi' | 'ft'
type SpeedUnit = 'm/s' | 'km/h' | 'mph' | 'min/km'

function convertLength(value: number, fromUnit: LengthUnit, toUnit: LengthUnit): number {
  if (fromUnit === toUnit) {
    return value
  }

  const meters = (() => {
    switch (fromUnit) {
      case 'm': return value
      case 'km': return value * METERS_PER_KILOMETER
      case 'mi': return value * METERS_PER_MILE
      case 'ft': return value * METERS_PER_FOOT
    }
  })()

  switch (toUnit) {
    case 'm': return meters
    case 'km': return meters / METERS_PER_KILOMETER
    case 'mi': return meters / METERS_PER_MILE
    case 'ft': return meters / METERS_PER_FOOT
  }
}

function convertSpeed(value: number, fromUnit: SpeedUnit, toUnit: SpeedUnit): number {
  if (fromUnit === toUnit) {
    return value
  }

  const metersPerSecond = (() => {
    switch (fromUnit) {
      case 'm/s': return value
      case 'km/h': return value / KMH_TO_MS_FACTOR
      case 'mph': return value * MPH_TO_MS_FACTOR
      case 'min/km': return value > 0
        ? (METERS_PER_KILOMETER / (value * SECONDS_PER_MINUTE))
        : 0
    }
  })()

  switch (toUnit) {
    case 'm/s': return metersPerSecond
    case 'km/h': return metersPerSecond * KMH_TO_MS_FACTOR
    case 'mph': return metersPerSecond / MPH_TO_MS_FACTOR
    case 'min/km': return metersPerSecond > 0
      ? (METERS_PER_KILOMETER / (metersPerSecond * SECONDS_PER_MINUTE))
      : 0
  }
}

export function convertFitDataLength(value: number, toUnit: LengthUnit): number {
  return convertLength(value, FIT_PARSER_LENGTH_UNIT, toUnit)
}

export function convertFitDataSpeed(value: number, toUnit: SpeedUnit): number {
  return convertSpeed(value, FIT_PARSER_SPEED_UNIT, toUnit)
}
