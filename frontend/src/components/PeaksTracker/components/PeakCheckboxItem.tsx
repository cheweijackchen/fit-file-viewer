'use client'

import { Checkbox, Text } from '@mantine/core'
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
        <Text
          component="span"
          size="13px"
          fw={isChecked ? 500 : 400}
          c={isChecked ? 'var(--text-emphasis)' : 'var(--text-secondary)'}
        >
          {peak.name}
        </Text>
      </div>
      <Text
        component="span"
        size="xs"
        fw={500}
        c={isChecked ? 'var(--text-subtitle)' : 'var(--text-muted)'}
      >
        {elevation}m
      </Text>
    </div>
  )
}
