import { Card, Stack, Title } from '@mantine/core'
import { useTranslations } from 'next-intl'
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
  const t = useTranslations('fit-file-viewer')

  return (
    <Card>
      <Stack
        gap="md"
      >
        <Title
          size="h5"
          order={3}
          c="bright"
        >{t('heartRate.title')}</Title>
        <div className="flex flex-wrap gap-x-4 gap-y-6 align-center justify-center md:justify-left">
          <HeartRateDonutChart
            records={fitData.records ?? []}
            restingHeartRate={restingHeartRate}
            maxHeartRate={maxHeartRate}
            zoneLabels={{
              zone1: t('heartRate.zone1'),
              zone2: t('heartRate.zone2'),
              zone3: t('heartRate.zone3'),
              zone4: t('heartRate.zone4'),
              zone5: t('heartRate.zone5'),
            }}
            emptyMessage={t('emptyState.noDataFound')}
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
