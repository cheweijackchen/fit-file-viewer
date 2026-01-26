import { AreaChart } from '@mantine/charts';
import { LTTB } from 'downsample'
// import { HeartRateZoneAnalyzer } from '@/lib/heartRateZoneAnalyzer'
import { formatElapsedTime } from '@/lib/timeFormatter';
import { type ParsedRecord } from '@/model/fitParser'

interface Props {
  records: ParsedRecord[];
  restingHeartRate: number;
  maxHeartRate: number;
}

const CHART_WIDTH = 100
const MIN_TICK_GAP = 50

export function HeartRateTrendGraph({ records, restingHeartRate, maxHeartRate }: Props) {
  // const analyzer = new HeartRateZoneAnalyzer(restingHeartRate, maxHeartRate)
  // const heartRateZoneRange = analyzer.getZoneRanges()

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

  const chartData = downsampledRecords.map(record => {
    return {
      elapsedTime: record[0],
      heartRate: record[1]
    }
  })

  return (
    <AreaChart
      h={300}
      data={chartData}
      dataKey="elapsedTime"
      type="stacked"
      curveType="natural"
      withDots={false}
      series={[
        { name: 'heartRate', color: 'yellow.4' }
      ]}
      xAxisProps={{
        scale: 'time',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        tickFormatter: (value, index) => formatElapsedTime(value, false),
        minTickGap: MIN_TICK_GAP
      }}
      yAxisProps={{
        domain: [restingHeartRate, maxHeartRate]
      }}
      tooltipProps={{
        position: { x: 75, y: 180 },
        labelFormatter: (value) => formatElapsedTime(value)
      }}
    />
  )
}
