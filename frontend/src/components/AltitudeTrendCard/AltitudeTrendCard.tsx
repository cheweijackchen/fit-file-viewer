import { AreaChart } from '@mantine/charts'
import { Card, Stack, Title } from '@mantine/core'
import { LTTB } from 'downsample'
import { convertFitDataLength } from '@/lib/converter'
import type { ParsedRecord } from '@/model/fitParser'

interface Props {
  records: ParsedRecord[];
}

const CHART_RESOLUTION = 200

export function AltitudeTrendCard({ records }: Props) {

  const altitudeDistanceList = records.flatMap(record =>
    (record.distance !== undefined && record.enhanced_altitude !== undefined)
      ? [[
        Math.round(convertFitDataLength(record.distance, 'm')),
        Math.round(convertFitDataLength(record.enhanced_altitude, 'm'))
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
          fillOpacity={1}
          series={[{ name: 'altitude', color: 'yellow.4' }
          ]}
          areaProps={{
            connectNulls: false
          }}
          xAxisProps={{
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            tickFormatter: (value, index) => (value / 1000).toFixed(1) + ' km'
          }}
        />
      </Stack>
    </Card>
  )
}
