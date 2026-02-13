import { FIT_PARSER_LENGTH_UNIT, FIT_PARSER_SPEED_UNIT } from '@/constants/fitData'
import { FitDataField, FitDataFormatter } from '@/lib/fitDataFormatter'
import { useFitDataStore } from '@/store/app/useFitDataStore'


export function useFitDataSummary() {
  const fitData = useFitDataStore.use.fitData()
  const formatter = new FitDataFormatter(
    { lengthUnit: FIT_PARSER_LENGTH_UNIT, speedUnit: FIT_PARSER_SPEED_UNIT }, // Parser input units
    { lengthUnit: FIT_PARSER_LENGTH_UNIT, speedUnit: FIT_PARSER_SPEED_UNIT } // Display output units
  )

  const totalDistanceIndicator = fitData?.sessions?.[0]?.total_distance
    ? formatter.format(FitDataField.distance, fitData.sessions[0].total_distance)
    : undefined
  const distanceOfFinalRecord = (fitData?.records && (fitData?.records?.length > 0))
    ? fitData.records[fitData.records.length - 1]?.distance
    : undefined
  const distanceOfFinalRecordIndicator = distanceOfFinalRecord
    ? formatter.format(FitDataField.distance, distanceOfFinalRecord)
    : undefined

  const totalAscentIndicator = fitData?.sessions?.[0]?.total_ascent
    ? formatter.format(FitDataField.elevation, fitData.sessions[0].total_ascent, { lengthUnit: 'm' })
    : undefined

  const totalDescentIndicator = fitData?.sessions?.[0]?.total_descent
    ? formatter.format(FitDataField.elevation, fitData.sessions[0].total_descent, { lengthUnit: 'm' })
    : undefined

  const averageHeartRateIndicator = fitData?.sessions?.[0]?.avg_heart_rate
    ? formatter.format(FitDataField.heartRate, fitData.sessions[0].avg_heart_rate)
    : undefined

  const totalTimerTimeIndicator = fitData?.sessions?.[0]?.total_timer_time
    ? formatter.format(FitDataField.duration, fitData.sessions[0].total_timer_time)
    : undefined

  const averagePaceIndicator = fitData?.sessions?.[0]?.enhanced_avg_speed
    ? formatter.format(FitDataField.speed, fitData.sessions[0].enhanced_avg_speed)
    : undefined

  const summary = {
    totalDistance: totalDistanceIndicator ?? distanceOfFinalRecordIndicator,
    totalAscent: totalAscentIndicator,
    totalDescent: totalDescentIndicator,
    averageHeartRate: averageHeartRateIndicator,
    averagePace: averagePaceIndicator,
    totalTimerTime: totalTimerTimeIndicator
  }

  return {
    summary
  }
}
