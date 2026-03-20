'use client'

import { Checkbox } from '@mantine/core'
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
          className="text-[13px]"
          style={{
            fontWeight: isChecked ? 500 : 400,
            color: isChecked ? '#1A1A1A' : '#5A5A5A',
          }}
        >
          {peak.name}
        </span>
      </div>
      <span
        className="text-xs font-medium"
        style={{ color: isChecked ? '#8C8C8C' : '#B0B0B0' }}
      >
        {elevation}m
      </span>
    </div>
  )
}
