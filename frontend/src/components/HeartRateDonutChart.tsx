import { DonutChart } from '@mantine/charts'
import { Box, Flex, Indicator, Text } from '@mantine/core'
import { HeartRateZoneAnalyzer } from '@/lib/heartRateZoneAnalyzer'
import type { ParsedRecord } from '@/model/fitParser'
import { EmptyState } from './EmptyState'

interface Props {
  restingHeartRate: number;
  maxHeartRate: number;
  records: ParsedRecord[];
}

export function HeartRateDonutChart({ restingHeartRate, maxHeartRate, records }: Props) {

  const analyzer = new HeartRateZoneAnalyzer(restingHeartRate, maxHeartRate)

  const heartRateStatistics = (records && records?.length > 0)
    ? analyzer.calculateZoneStatistics(records, record => record.heart_rate ?? 0)
    : null

  const donutChartData = heartRateStatistics
    ? [
      {
        name: 'Zone 1',
        value: heartRateStatistics.data.zone1.percentage,
        color: 'cyan.5'
      },
      {
        name: 'Zone 2',
        value: heartRateStatistics.data.zone2.percentage,
        color: 'teal.5'
      },
      {
        name: 'Zone 3',
        value: heartRateStatistics.data.zone3.percentage,
        color: 'yellow.4'
      },
      {
        name: 'Zone 4',
        value: heartRateStatistics.data.zone4.percentage,
        color: 'orange.5'
      },
      {
        name: 'Zone 5',
        value: heartRateStatistics.data.zone5.percentage,
        color: 'red.6'
      },
    ]
    : null



  function formatDecimalToPercentage(value: number): string {
    return `${Math.round(value)}%`
  }

  return donutChartData
    ? (
      <Flex
        align="center"
        gap="md"
        className="w-auto"
      >
        <DonutChart
          size={160}
          thickness={30}
          data={donutChartData}
          tooltipDataSource="segment"
          tooltipProps={{ offset: 50 }}
          styles={{
            tooltip: { minWidth: '120px' }
          }}
          valueFormatter={formatDecimalToPercentage}
        />
        <Box>
          {(donutChartData ?? []).map(zone => {
            return (
              <Flex key={zone.name}>
                <Indicator
                  position="middle-start"
                  color={zone.color}
                  radius="xs"
                  mx="md"
                ></Indicator>
                <Text fz="sm">{zone.name}</Text>
              </Flex>
            )
          })}
        </Box>
      </Flex>
    )
    : <EmptyState />
}
