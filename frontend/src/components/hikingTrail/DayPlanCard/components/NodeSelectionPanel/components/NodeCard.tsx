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
        'flex flex-col text-left w-full rounded-[12px] p-3.5 gap-1',
        isBack
          ? 'bg-(--mantine-color-stone-2) border-none opacity-80 cursor-default'
          : 'bg-(--mantine-color-stone-1) border-[1.5px] border-(--mantine-color-stone-7) cursor-pointer',
      )}
      onClick={onClick}
    >
      <span className={clsx('text-[13px] font-bold', isBack ? 'text-(--mantine-color-stone-7)' : 'text-(--mantine-color-stone-9)')}>
        {node?.name ?? '—'}
      </span>
      <span className="text-[11px] text-(--mantine-color-stone-6)">
        {node?.nodeType ?? TrailNodeType.Other} · {timeLabel}
      </span>
    </button>
  )
}
