'use client'

import { ActionIcon, NumberInput } from '@mantine/core'
import { IconCoffee, IconX } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { TRAIL_NODE_TYPE_BADGE_STYLE } from '@/constants/hiking-trails/dayPlanCard'
import { TrailNodeType } from '@/constants/hiking-trails/hikingTrail'
import type { TrailNode } from '@/model/hikingTrail'

interface Props {
  node: TrailNode | undefined;
  enableRest?: boolean;
  restMinutes?: number;
  onRestMinutesChange?: (minutes: number | undefined) => void;
}

export function CurrentNodeCard({ node, enableRest, restMinutes, onRestMinutesChange }: Props) {
  const t = useTranslations('hiking-trail-planner')
  const nodeType = node?.nodeType ?? TrailNodeType.Other
  const badgeStyle = TRAIL_NODE_TYPE_BADGE_STYLE[nodeType]

  const [expanded, setExpanded] = useState(false)
  const [draft, setDraft] = useState<number | string>('')

  function handleOpen() {
    setDraft(restMinutes ?? '')
    setExpanded(true)
  }

  function handleCommit() {
    const parsed = typeof draft === 'number' ? draft : parseInt(String(draft), 10)
    onRestMinutesChange?.(!isNaN(parsed) && parsed > 0 ? parsed : undefined)
    setExpanded(false)
  }

  function handleClear() {
    onRestMinutesChange?.(undefined)
    setDraft('')
    setExpanded(false)
  }

  return (
    <div className="flex flex-col relative overflow-hidden bg-(--color-sepia-9) rounded-xl p-4 gap-1.5 min-w-0 flex-1">
      {/* Deco icon — node-type icon, large, faded */}
      <div className="absolute right-3 -top-2">
        <badgeStyle.icon
          size={88}
          color="rgba(255,255,255,0.12)"
          stroke={2}
        />
      </div>

      <span className="uppercase text-[10px] font-bold tracking-[0.08em] text-(--mantine-color-stone-5)">
        {t('planDetail.dayPlanCard.currentNode')}
      </span>
      <span className="text-base font-bold text-white leading-[1.2]">
        {node?.name ?? '—'}
      </span>

      {enableRest && node && (
        <div className="mt-1 border-t border-white/10 pt-2">
          {!expanded
            ? (
              <button
                type="button"
                className="flex items-center gap-1 text-[11px] text-(--mantine-color-stone-4) hover:text-(--mantine-color-stone-2) cursor-pointer transition-colors"
                onClick={handleOpen}
              >
                <IconCoffee size={11} />
                {restMinutes !== undefined && restMinutes > 0
                  ? `${restMinutes} 分鐘`
                  : t('planDetail.dayPlanCard.restTime.add')}
              </button>
            )
            : (
              <div className="flex items-center gap-1.5">
                <NumberInput
                  size="xs"
                  min={0}
                  max={300}
                  step={5}
                  placeholder="0"
                  value={draft}
                  onChange={setDraft}
                  autoFocus
                  className="flex-1"
                  classNames={{ input: 'bg-white/10 border-white/20 text-white placeholder:text-white/30 text-xs' }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') { handleCommit() }
                    if (e.key === 'Escape') { setExpanded(false) }
                  }}
                  onBlur={handleCommit}
                  rightSection={
                    <span className="text-[10px] text-white/50 pr-1">分鐘</span>
                  }
                  rightSectionWidth={36}
                />
                <ActionIcon
                  size="sm"
                  variant="subtle"
                  onClick={handleClear}
                >
                  <IconX
                    size={12}
                    color="rgba(255,255,255,0.5)"
                  />
                </ActionIcon>
              </div>
            )}
        </div>
      )}
    </div>
  )
}
