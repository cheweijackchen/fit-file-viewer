'use client'

import { Button, Popover, SegmentedControl, Slider, Stack, Text } from '@mantine/core'
import { useState } from 'react'

const SPEED_OPTIONS = [
  { value: '1', label: '1×' },
  { value: '2', label: '2×' },
  { value: '4', label: '4×' },
  { value: '8', label: '8×' },
]

const PRESET_VALUES = new Set([1, 2, 4, 8])

interface Props {
  speed: number;
  onSpeedChange: (speed: number) => void;
}

export function PlaybackSpeedControl({ speed, onSpeedChange }: Props) {
  const [opened, setOpened] = useState(false)

  const segmentedValue = PRESET_VALUES.has(speed) ? String(speed) : ''

  function handleSegmentChange(value: string) {
    onSpeedChange(Number(value))
  }

  function handleSliderChange(value: number) {
    onSpeedChange(value)
  }

  const speedLabel = Number.isInteger(speed) ? `${speed}×` : `${speed}×`

  return (
    <Popover
      opened={opened}
      position="top"
      offset={12}
      withinPortal={false}
      onChange={setOpened}
    >
      <Popover.Target>
        <Button
          variant="subtle"
          color="white"
          size="xs"
          px="xs"
          onClick={() => setOpened(o => !o)}
        >
          <div className="min-w-8.5">
            {speedLabel}
          </div>
        </Button>
      </Popover.Target>

      <Popover.Dropdown p="sm">
        <Stack gap="xs">
          <Text
            size="xs"
            fw={600}
            c="dimmed"
          >Playback Speed</Text>
          <Slider
            value={speed}
            min={0.25}
            max={8}
            step={0.25}
            size="xs"
            color="blue"
            label={v => `${v}×`}
            onChange={handleSliderChange}
          />
          <SegmentedControl
            value={segmentedValue}
            data={SPEED_OPTIONS}
            size="xs"
            color="blue"
            onChange={handleSegmentChange}
          />
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
}
