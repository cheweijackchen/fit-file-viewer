'use client'

import { Button } from '@mantine/core'

interface Props {
  onAction: () => void;
}

export function PeaksActionBar({ onAction }: Props) {
  return (
    <Button
      onClick={onAction}
    >
      檢視結果
    </Button>
  )
}
