import { DonutChart } from '@mantine/charts'
import { Card, Stack, Title } from '@mantine/core';
import { EmptyState } from '@/components/EmptyState'
import { HeartRateZoneAnalyzer } from '@/lib/heartRateZoneAnalyzer'
import { type ParsedFit } from '@/model/fitParser'

interface Props {
  fitData: ParsedFit;
}

const DEFAULT_RESTING_HEART_RATE = 60
const DEFAULT_MAX_HEART_RATE = 200

export function HeartRateZoneCard({ fitData }: Props) {
  const restingHeartRate = fitData?.user_profile?.resting_heart_rate ?? DEFAULT_RESTING_HEART_RATE
  const maxHeartRate = fitData?.zones_target?.max_heart_rate ?? DEFAULT_MAX_HEART_RATE

  const analyzer = new HeartRateZoneAnalyzer(restingHeartRate, maxHeartRate)

  const heartRateStatistics = (fitData?.records && fitData?.records?.length > 0)
    ? analyzer.calculateZoneStatistics(fitData.records, record => record.heart_rate ?? 0)
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

  return (
    <Card>
      <Stack
        gap="md"
      >
        <Title size="h5">Heart Rate Zones</Title>
        {
          donutChartData ?
            <DonutChart
              size={160}
              thickness={30}
              data={donutChartData}
            /> :
            <EmptyState />
        }
      </Stack>
    </Card>
  )
}
