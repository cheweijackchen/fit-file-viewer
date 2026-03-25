'use client'

import { Checkbox } from '@mantine/core'
import clsx from 'clsx'
import type { MountainPeak } from '@/constants/peaks'

interface Props {
  id: string;
  peak: MountainPeak;
  isChecked: boolean;
  onToggle: (id: string) => void;
}

export function PeakCheckboxItem({ id, peak, isChecked, onToggle }: Props) {
  const elevation = peak.elevation.toLocaleString()

  return (
    <div
      className="flex items-center justify-between py-2 px-1 pl-7 cursor-pointer"
      onClick={() => onToggle(id)}
    >
      <div className="flex items-center gap-2.5">
        <Checkbox
          checked={isChecked}
          color="#F0C142"
          size="xs"
          radius={3}
          styles={{
            input: {
              cursor: 'pointer',
            },
          }}
          onChange={() => onToggle(id)}
          onClick={(e) => e.stopPropagation()}
        />
        <span
          className={clsx(
            'text-[13px]',
            isChecked ? 'font-medium text-(--text-emphasis)' : 'font-normal text-(--text-secondary)',
          )}
        >
          {peak.name}
        </span>
      </div>
      <span
        className={clsx(
          'text-xs font-medium',
          isChecked ? 'text-(--text-subtitle)' : 'text-(--text-muted)',
        )}
      >
        {elevation}m
      </span>
    </div>
  )
}
