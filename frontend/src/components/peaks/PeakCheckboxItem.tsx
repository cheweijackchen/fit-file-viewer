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
      className="ml-5"
    >
      <Checkbox
        className="py-2 px-1 pl-2 checkbox-hover-effect cursor-pointer"
        checked={isChecked}
        size="xs"
        radius={3}
        label={
          <div className="flex items-center justify-between w-full cursor-pointer">
            <Text
              component="div"
              className="flex-1 cursor-pointer"
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
          labelWrapper: 'w-full',
        }}
        onChange={() => onToggle(id)}
      />
      {/* </div> */}
    </div>
  )
}
