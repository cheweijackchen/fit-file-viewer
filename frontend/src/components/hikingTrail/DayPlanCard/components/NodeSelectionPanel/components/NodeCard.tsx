import clsx from 'clsx'
import { TrailNodeType } from '@/constants/hiking-trails/hikingTrail'
import type { TrailNode } from '@/model/hikingTrail'

export interface NodeCardProps {
  node: TrailNode | undefined;
  timeLabel: string;
  variant: 'back' | 'forward';
  onClick?: () => void;
}

export function NodeCard({ node, timeLabel, variant, onClick }: NodeCardProps) {
  const isBack = variant === 'back'

  return (
    <button
      type="button"
      disabled={isBack && !onClick}
      className={clsx(
        'flex flex-col text-left w-full rounded-xl p-3.5 gap-1 bg-(--mantine-color-stone-1) hover:bg-(--mantine-color-stone-2) border',
        isBack
          ? 'border-(--mantine-color-stone-3) hover:border-(--mantine-color-stone-5)'
          : 'border-(--mantine-color-stone-7) hover:border-(--mantine-color-stone-9)',
        onClick ? 'cursor-pointer' : 'cursor-default',
      )}
      onClick={onClick}
    >
      <span className="text-[13px] font-bold text-(--mantine-color-stone-9)">
        {node?.name ?? '—'}
      </span>
      <span className="text-[11px] text-(--mantine-color-stone-6)">
        {node?.nodeType ?? TrailNodeType.Other} · {timeLabel}
      </span>
    </button>
  )
}
