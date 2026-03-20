'use client'

import { Button, Modal, Text } from '@mantine/core'

interface Props {
  opened: boolean
  title: string
  description: string
  onOk: () => void
  onCancel: () => void
  confirmLabel?: string
  cancelLabel?: string
}

export function ConfirmModal({
  opened,
  title,
  description,
  onOk,
  onCancel,
  confirmLabel = '確定',
  cancelLabel = '取消',
}: Props) {
  return (
    <Modal
      centered
      opened={opened}
      onClose={onCancel}
      title={title}
      size="sm"
    >
      <Text size="sm" c="dimmed">
        {description}
      </Text>
      <div className="flex justify-end gap-2 mt-6">
        <Button variant="default" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button onClick={onOk}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}
