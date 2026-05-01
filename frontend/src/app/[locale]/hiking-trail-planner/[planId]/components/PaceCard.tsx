'use client'

import { Text } from '@mantine/core'
import { IconMinus, IconPlus } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

interface Props {
  paceMultiplier: number;
  readonly: boolean;
  onIncrease?: () => void;
  onDecrease?: () => void;
}

const MIN_MULTIPLIER = 0.5
const MAX_MULTIPLIER = 2.0

export function PaceCard({ paceMultiplier, readonly, onIncrease, onDecrease }: Props) {
  const t = useTranslations('hiking-trail-planner')

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
            ×{paceMultiplier.toFixed(1)}
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
              <button
                type="button"
                disabled={paceMultiplier <= MIN_MULTIPLIER}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-(--mantine-color-stone-3) disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                onClick={onDecrease}
              >
                <IconMinus
                  size={14}
                  color="var(--mantine-color-stone-6)"
                />
              </button>
              <span
                className="font-bold text-(--mantine-color-stone-9)"
                style={{
                  fontFamily: 'var(--mantine-font-family-monospace)',
                  fontSize: '44px' 
                }}
              >
                ×{paceMultiplier.toFixed(1)}
              </span>
              <button
                type="button"
                disabled={paceMultiplier >= MAX_MULTIPLIER}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-(--mantine-color-yellow-4) disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                onClick={onIncrease}
              >
                <IconPlus
                  size={16}
                  color="var(--mantine-color-stone-8)"
                />
              </button>
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
