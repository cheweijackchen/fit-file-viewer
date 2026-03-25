'use client'

import { Button, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconRotate } from '@tabler/icons-react'
import { ConfirmModal } from '@/components/ConfirmModal'
import useScreen from '@/hooks/useScreen'

interface Props {
  showClear: boolean;
  onClear: () => void;
}

export function PeaksHeader({ showClear, onClear }: Props) {
  const { onMobile } = useScreen()
  const [opened, { open: openConfirmClearDialog, close: closeConfirmClearDialog }] = useDisclosure(false)

  function handleConfirmClear() {
    onClear()
    closeConfirmClearDialog()
  }

  return (
    <div className="flex items-start justify-between w-full">
      <div className="flex flex-col gap-1">
        <Title
          c="bright"
          order={1}
          fz={onMobile ? 'h4' : 28}
          fw={600}
          style={{ letterSpacing: -1 }}
        >
          台灣百岳
        </Title>
        <Text
          size="xs"
          c="dimmed"
        >
          Taiwan 100 Peaks
        </Text>
      </div>
      {showClear && (
        <Button
          variant="default"
          size="xs"
          c="dimmed"
          leftSection={<IconRotate size={14} />}
          onClick={openConfirmClearDialog}
        >
          清除紀錄
        </Button>
      )}
      <ConfirmModal
        opened={opened}
        title="清除紀錄"
        description="確定要清除所有勾選紀錄嗎？"
        onOk={handleConfirmClear}
        onCancel={closeConfirmClearDialog}
      />
    </div>
  )
}
