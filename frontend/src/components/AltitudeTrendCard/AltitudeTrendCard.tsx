import { AreaChart } from '@mantine/charts'
import { Card, Stack, Title, useMantineColorScheme } from '@mantine/core'
import { LTTB } from 'downsample'
import { convertFitDataLength } from '@/lib/converter'
import type { ParsedRecord } from '@/model/fitParser'
import { AltitudeTooltip } from './components/AltitudeTooltip'

interface Props {
  records: ParsedRecord[];
}

const CHART_RESOLUTION = 200
const DISTANCE_TICK_GAP = 1000
const FILL_OPACITY_FOR_DARK_MODE = 1
const FILL_OPACITY_FOR_LIGHT_MODE = 0.5

export function AltitudeTrendCard({ records }: Props) {
  const { colorScheme } = useMantineColorScheme()
  const fillOpacity = (colorScheme === 'dark')
    ? FILL_OPACITY_FOR_DARK_MODE
    : FILL_OPACITY_FOR_LIGHT_MODE

  /**
   * generate X axis ticks array
   * @param totalDistance (m)
   * @param interval (m)
   * @returns number[] e.g. [0, 500, 1000, 1500, ...]
   */
  const getDistanceTicks = (totalDistance: number, interval: number): number[] => {
    const ticks: number[] = []
    for (let i = 0; i <= totalDistance; i += interval) {
      ticks.push(i)
    }
    // if the last tick is very close to the total distance (e.g., less than 100m left),
    // consider adding totalDistance as the last tick
    // if (totalDistance - ticks[ticks.length - 1] > 100) {
    //   ticks.push(totalDistance);
    // }

    return ticks
  }
  const totalDistance = (records.length > 0)
    ? (records[records.length - 1].distance)
    : undefined
  const ticks = totalDistance ? getDistanceTicks(convertFitDataLength(totalDistance, 'm'), DISTANCE_TICK_GAP) : []

  const altitudeDistanceList = records.flatMap(record =>
    (record.distance !== undefined && (record.enhanced_altitude !== undefined || record.altitude !== undefined))
      ? [[
        Math.round(convertFitDataLength(record.distance, 'm')),
        Math.round(convertFitDataLength((record.enhanced_altitude ?? record.altitude) as number, 'm'))
      ] as [number, number]]
      : []
  )

  function downsample(data: [number, number][]): [number, number][] {
    return LTTB(data, CHART_RESOLUTION) as [number, number][]
  }

  // TODO: useMemo
  const downsampledRecords = downsample(altitudeDistanceList)

  function convertDownsampledListToChartData(list: [number, number][]): { distance: number; altitude: number; }[] {
    return list.map(dataPoint => ({
      distance: dataPoint[0],
      altitude: dataPoint[1]
    }))
  }

  const chartData = convertDownsampledListToChartData(downsampledRecords)

  return (
    <Card>
      <Stack
        gap="md"
      >
        <Title
          size="h5"
          order={3}
          c="bright"
        >Altitude</Title>
        <AreaChart
          h={250}
          data={chartData}
          dataKey="distance"
          type="default"
          curveType="monotone"
          withDots={false}
          withGradient={false}
          fillOpacity={fillOpacity}
          gridAxis="xy"
          gridProps={{ yAxisId: 'left' }} // horizontal grid lines missing without this will be fixed at Recharts 9.0
          series={[{ name: 'altitude', color: 'yellow.4' }]}
          areaProps={{
            connectNulls: false
          }}
          xAxisProps={{
            type: 'number',
            ticks: ticks,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            tickFormatter: (value, index) => parseFloat((value / 1000).toFixed(1)) + ' km' // removing trailing zero with parseFloat
          }}
          yAxisProps={{
            tickCount: 6
          }}
          tooltipProps={{
            position: { y: 125 },
            offset: 25,
            content: ({ payload }) => (
              <AltitudeTooltip
                payload={payload ? [...payload] : undefined}
              />
            )
          }}
        />
      </Stack>
    </Card>
  )
}
