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
      className="ml-5 cursor-pointer"
      onClick={() => onToggle(id)}
    >
      <Checkbox
        className="checkbox-hover-effect py-2 px-1 pl-2"
        checked={isChecked}
        size="xs"
        radius={3}
        label={
          <div className="flex items-center justify-between w-full">
            <Text
              component="div"
              className="flex-1"
              size="13px"
              fw={isChecked ? 500 : 400}
              c={isChecked ? 'var(--text-emphasis)' : 'var(--text-secondary)'}
            >
              {peak.name}
            </Text>
            <Text
              component="div"
              size="xs"
              fw={500}
              c={isChecked ? 'var(--text-subtitle)' : 'var(--text-muted)'}
            >
              {elevation}m
            </Text>
          </div>
        }
        styles={{ input: { cursor: 'pointer' } }}
        classNames={{
          label: 'pointer-events-none',
          labelWrapper: 'w-full',
        }}
        onChange={() => onToggle(id)}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}
