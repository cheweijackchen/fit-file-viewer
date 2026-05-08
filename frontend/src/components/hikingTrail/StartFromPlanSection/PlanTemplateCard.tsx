'use client'

import { Button, Text } from '@mantine/core'
import { IconWalk } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

interface Props {
  name: string;
  trailName: string;
  days: number;
  onUse: () => void;
}

export function PlanTemplateCard({ name, trailName, days, onUse }: Props) {
  const t = useTranslations('hiking-trail-planner.startFromPlan')

  return (
    <div className="flex flex-col rounded-[14px] overflow-hidden border border-(--mantine-color-stone-3) bg-(--mantine-color-stone-2)">
      <div className="flex flex-col gap-3.5 p-[22px]">
        <div className="flex items-center justify-between">
          <Text
            fw={700}
            size="lg"
            c="stone.9"
          >
            {name}
          </Text>
          <div className="rounded-full bg-(--mantine-color-stone-3) px-3 py-1 shrink-0">
            <Text
              fw={600}
              c="stone.7"
              size="xs"
            >
              {t('days', { count: days })}
            </Text>
          </div>
        </div>

        <Text
          size="sm"
          c="stone.6"
        >
          {trailName}
        </Text>

        <Button
          fullWidth
          color="yellow"
          radius={8}
          fw={600}
          size="sm"
          leftSection={<IconWalk size={14} />}
          onClick={onUse}
        >
          {t('cta')}
        </Button>
      </div>
    </div>
  )
}
