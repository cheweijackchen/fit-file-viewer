'use client'

import { Button, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconRotate } from '@tabler/icons-react'
import { ConfirmModal } from '@/components/ConfirmModal'

interface Props {
  onClear: () => void;
}

export function PeaksHeader({ onClear }: Props) {
  const [opened, { open, close }] = useDisclosure(false)

  function handleConfirmClear() {
    onClear()
    close()
  }

  return (
    <div className="flex items-start justify-between w-full">
      <div className="flex flex-col gap-1">
        <Title
          order={1}
          fz={28}
          fw={600}
          style={{ letterSpacing: -1 }}
        >
          台灣百岳
        </Title>
        <Text
          size="xs"
          c="dimmed"
        >
          Taiwan 100 Peaks Tracker
        </Text>
      </div>
      <Button
        variant="default"
        size="xs"
        c="dimmed"
        leftSection={<IconRotate size={14} />}
        onClick={open}
      >
        清除紀錄
      </Button>
      <ConfirmModal
        opened={opened}
        title="清除紀錄"
        description="確定要清除所有勾選紀錄嗎？"
        onOk={handleConfirmClear}
        onCancel={close}
      />
    </div>
  )
}
