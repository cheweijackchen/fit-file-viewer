'use client'

import { ActionIcon, Text } from '@mantine/core'
import { IconMinus, IconPlus } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

interface Props {
  paceMultiplier: number;
  readonly: boolean;
  onIncrease?: () => void;
  onDecrease?: () => void;
}

const MIN_MULTIPLIER = 0.3
const MAX_MULTIPLIER = 2.0

export function PaceCard({ paceMultiplier, readonly, onIncrease, onDecrease }: Props) {
  const t = useTranslations('hiking-trail-planner')
  const displayValue = readonly
    ? parseFloat(paceMultiplier.toFixed(2))
    : paceMultiplier.toFixed(2)

  return (
    <div className="flex flex-col gap-3">
      <Text
        size="xs"
        fw={700}
        c="stone.5"
        className="tracking-[0.08em]"
      >
        {t('planDetail.sections.pace')}
      </Text>
      {readonly ? (
        <div className="flex items-center justify-between rounded-xl bg-white border border-(--mantine-color-stone-2) px-5 py-4">
          <Text
            size="xs"
            c="stone.5"
            className="tracking-[0.08em]"
          >
            {t('planDetail.pace.multiplierLabel')}
          </Text>
          <span
            className="text-4xl font-bold text-(--mantine-color-stone-9)"
            style={{ fontFamily: 'var(--mantine-font-family-monospace)' }}
          >
            ×{displayValue}
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-4 rounded-xl bg-white border border-(--mantine-color-stone-2) p-5">
          <div className="flex flex-col gap-2">
            <Text
              size="xs"
              c="stone.5"
              className="tracking-[0.08em]"
            >
              {t('planDetail.pace.multiplierLabel')}
            </Text>
            <div className="flex items-center justify-center gap-5">
              <ActionIcon
                size={32}
                radius="xl"
                variant="default"
                c="stone.6"
                disabled={paceMultiplier <= MIN_MULTIPLIER}
                onClick={onDecrease}
              >
                <IconMinus size={14} />
              </ActionIcon>
              <span
                className="font-bold text-(--mantine-color-stone-9)"
                style={{
                  fontFamily: 'var(--mantine-font-family-monospace)',
                  fontSize: '44px'
                }}
              >
                ×{displayValue}
              </span>
              <ActionIcon
                size={40}
                radius="xl"
                variant="filled"
                color="yellow.4"
                c="stone.8"
                disabled={paceMultiplier >= MAX_MULTIPLIER}
                onClick={onIncrease}
              >
                <IconPlus size={16} />
              </ActionIcon>
            </div>
          </div>
          <Text
            size="xs"
            c="stone.4"
            fs="italic"
          >
            {t('planDetail.pace.updateNote')}
          </Text>
        </div>
      )}
    </div>
  )
}
