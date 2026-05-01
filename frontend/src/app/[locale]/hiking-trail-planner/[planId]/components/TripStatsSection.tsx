'use client'

import { Text } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { formatTrailMinutes } from '@/lib/timeFormatter'

interface Props {
  totalRawMinutes: number
  totalWeightedMinutes: number
  paceMultiplier: number
}

export function TripStatsSection({ totalRawMinutes, totalWeightedMinutes, paceMultiplier }: Props) {
  const t = useTranslations('hiking-trail-planner')

  return (
    <div className="flex flex-col gap-3">
      <Text
        size="xs"
        fw={700}
        c="stone.5"
        className="tracking-[0.08em]"
      >
        {t('planDetail.sections.tripStats')}
      </Text>
      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-1 rounded-xl bg-white border border-(--mantine-color-stone-2) p-4">
          <Text
            size="xs"
            c="stone.5"
          >
            {t('planDetail.tripStats.rawTime')}
          </Text>
          <Text
            size="xl"
            fw={700}
            c="stone.9"
          >
            {formatTrailMinutes(totalRawMinutes)}
          </Text>
        </div>
        <div className="flex-1 flex flex-col gap-1 rounded-xl bg-white border border-(--mantine-color-stone-2) p-4">
          <Text
            size="xs"
            c="stone.5"
          >
            {t('planDetail.tripStats.weightedTime', { multiplier: paceMultiplier.toFixed(1) })}
          </Text>
          <Text
            size="xl"
            fw={700}
            c="stone.6"
          >
            {formatTrailMinutes(totalWeightedMinutes)}
          </Text>
        </div>
      </div>
    </div>
  )
}
