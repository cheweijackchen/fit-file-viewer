'use client'

import { Button } from '@mantine/core'
import { IconCampfire } from '@tabler/icons-react'

interface Props {
  onAction: () => void;
}

export function PeaksActionBar({ onAction }: Props) {
  return (
    <Button
      leftSection={<IconCampfire size={16} />}
      onClick={onAction}
    >
      紀錄
    </Button>
  )
}
