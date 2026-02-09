import { Card, Stack, Title } from '@mantine/core'
import { DEFAULT_MAX_HEART_RATE, DEFAULT_RESTING_HEART_RATE } from '@/constants/heartRate'
import { type ParsedFit } from '@/model/fitParser'
import { HeartRateDonutChart } from './HeartRateDonutChart'
import { HeartRateTrendGraph } from './HeartRateTrendGraph'

interface Props {
  fitData: ParsedFit;
}

export function HeartRateZoneCard({ fitData }: Props) {
  const restingHeartRate = fitData?.user_profile?.resting_heart_rate ?? DEFAULT_RESTING_HEART_RATE
  const maxHeartRate = fitData?.zones_target?.max_heart_rate ?? DEFAULT_MAX_HEART_RATE

  return (
    <Card>
      <Stack
        gap="md"
      >
        <Title
          size="h5"
          order={3}
          c="bright"
        >Heart Rate Zones</Title>
        <div className="flex flex-wrap gap-x-4 gap-y-6 align-center justify-center md:justify-left">
          <HeartRateDonutChart
            records={fitData.records ?? []}
            restingHeartRate={restingHeartRate}
            maxHeartRate={maxHeartRate}
          />
          <div className="w-full sm:flex-1">
            <HeartRateTrendGraph
              records={fitData.records ?? []}
              restingHeartRate={restingHeartRate}
              maxHeartRate={maxHeartRate}
            />
          </div>
        </div>
      </Stack>
    </Card>
  )
}
