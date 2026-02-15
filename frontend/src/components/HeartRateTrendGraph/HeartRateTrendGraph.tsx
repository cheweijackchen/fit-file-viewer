'use client'

import { AreaChart } from '@mantine/charts'
import { LTTB } from 'downsample'
import { HeartRateZoneAnalyzer } from '@/lib/heartRateZoneAnalyzer'
import { formatElapsedTime } from '@/lib/timeFormatter'
import { type ParsedRecord } from '@/model/fitParser'
import { type HeartRateZone } from '@/model/heartRate'
import { HeartRateZoneChartTooltip } from './components/HeartRateZoneChartTooltip'

interface Props {
  records: ParsedRecord[];
  restingHeartRate: number;
  maxHeartRate: number;
}

// FIXME: add zone0 to type HeartRateZone
type HeartRateChartData = ({ [x: string]: number; elapsedTime: number; } | { elapsedTime: number; zone0: number; })[]

const CHART_WIDTH = 200
const MIN_TICK_GAP = 50

export function HeartRateTrendGraph({ records, restingHeartRate, maxHeartRate }: Props) {
  const analyzer = new HeartRateZoneAnalyzer(restingHeartRate, maxHeartRate)

  const baseTime = records[0].timestamp.getTime()
  const heartRateTimestampList = records.flatMap(record =>
    record.heart_rate
      ? [[record.timestamp.getTime() - baseTime, record.heart_rate] as [number, number]]
      : []
  )

  function downsample(data: [number, number][]): [number, number][] {
    return LTTB(data, CHART_WIDTH) as [number, number][]
  }

  const downsampledRecords = downsample(heartRateTimestampList)

  function convertDownsampledListToChartDataByZone(list: [number, number][]): HeartRateChartData {
    const result = list.map((dataPoint, index) => {
      const zone = analyzer.getZone(dataPoint[1])

      // filling up gaps between zone areas
      const next = (index < list.length - 1) ? list[index + 1] : null
      const nextZone: HeartRateZone | null = list?.[index + 1]?.[1] ? analyzer.getZone(list[index + 1][1]) : null
      const shouldAddNext = !!next && nextZone !== zone

      return zone
        ? {
          elapsedTime: dataPoint[0],
          [zone]: dataPoint[1],
          ...shouldAddNext ? { [nextZone ?? 'zone0']: dataPoint[1] } : {}
        }
        : {
          elapsedTime: dataPoint[0],
          zone0: dataPoint[1],
          ...shouldAddNext ? { [nextZone ?? 'zone0']: dataPoint[1] } : {}
        }
    })
    return result
  }

  const chartData = convertDownsampledListToChartDataByZone(downsampledRecords)

  return (
    <AreaChart
      h={250}
      data={chartData}
      dataKey="elapsedTime"
      type="default"
      curveType="monotone"
      withDots={false}
      withGradient={false}
      fillOpacity={1}
      series={[
        { name: 'zone0', color: 'gray.5' },
        { name: 'zone1', color: 'cyan.5' },
        { name: 'zone2', color: 'teal.5' },
        { name: 'zone3', color: 'yellow.4' },
        { name: 'zone4', color: 'orange.5' },
        { name: 'zone5', color: 'red.6' },
      ]}
      areaProps={{
        connectNulls: false
      }}
      xAxisProps={{
        type: 'number',
        scale: 'time',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        tickFormatter: (value, index) => formatElapsedTime(value, false),
        minTickGap: MIN_TICK_GAP
      }}
      yAxisProps={{
        domain: [restingHeartRate, maxHeartRate]
      }}
      tooltipProps={{
        position: { y: 135 },
        content: ({ label, payload }) => (
          <HeartRateZoneChartTooltip
            label={label}
            payload={payload ? [...payload] : undefined}
            restingHeartRate={restingHeartRate}
            maxHeartRate={maxHeartRate}
          />
        )
      }}
    />
  )
}
