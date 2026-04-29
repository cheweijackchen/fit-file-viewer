'use client'

import { Button, Modal, Text } from '@mantine/core'

interface Props {
  opened: boolean;
  title: string;
  description: string;
  onOk: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: string;
}

export function ConfirmModal({
  opened,
  title,
  description,
  onOk,
  onCancel,
  confirmLabel = '確定',
  cancelLabel = '取消',
  confirmColor,
}: Props) {
  return (
    <Modal
      centered
      opened={opened}
      title={title}
      size="sm"
      onClose={onCancel}
    >
      <Text
        size="sm"
        c="dimmed"
      >
        {description}
      </Text>
      <div className="flex justify-end gap-2 mt-6">
        <Button
          variant="default"
          onClick={onCancel}
        >
          {cancelLabel}
        </Button>
        <Button
          color={confirmColor}
          onClick={onOk}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}
