'use client'

import { ActionIcon, Text } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'

interface Props {
  onCancel: () => void;
  onFinish: () => void;
}

export function EditToolbar({ onCancel, onFinish }: Props) {
  return (
    <div
      className="flex items-center justify-between px-20 shrink-0"
      style={{
        height: 52,
        background: '#FFF8E1',
        borderBottom: '1px solid #F6D96A',
      }}
    >
      {/* Left: status */}
      <div className="flex items-center gap-2.5">
        <div
          className="rounded-full shrink-0"
          style={{
            width: 8,
            height: 8,
            background: 'var(--mantine-color-yellow-5)' 
          }}
        />
        <Text
          size="sm"
          fw={600}
          c="stone.9"
        >
          編輯中
        </Text>
        <Text
          size="sm"
          c="stone.4"
        >
          ·
        </Text>
        <Text
          size="sm"
          c="stone.6"
        >
          變更尚未儲存
        </Text>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        <ActionIcon
          variant="subtle"
          color="stone"
          c="stone.7"
          size={32}
          radius={8}
          onClick={onCancel}
        >
          <IconX size={15} />
        </ActionIcon>
        <button
          type="button"
          className="flex items-center gap-1.5 px-4 rounded-lg cursor-pointer"
          style={{
            height: 34,
            background: 'var(--mantine-color-yellow-4)',
            border: 'none',
            color: 'var(--mantine-color-stone-9)',
            fontWeight: 600,
            fontSize: 14,
          }}
          onClick={onFinish}
        >
          <IconCheck size={14} />
          完成編輯
        </button>
      </div>
    </div>
  )
}
