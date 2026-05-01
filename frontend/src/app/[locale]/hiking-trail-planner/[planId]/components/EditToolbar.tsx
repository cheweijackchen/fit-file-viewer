'use client'

import { ActionIcon, Text } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

interface Props {
  onCancel: () => void;
  onFinish: () => void;
}

export function EditToolbar({ onCancel, onFinish }: Props) {
  const t = useTranslations('hiking-trail-planner')

  return (
    <div
      className="flex items-center justify-between px-20 shrink-0 h-[52px] bg-(--mantine-color-yellow-0) border-b border-(--mantine-color-yellow-3)"
    >
      {/* Left: status */}
      <div className="flex items-center gap-2.5">
        <div className="rounded-full shrink-0 w-2 h-2 bg-(--mantine-color-yellow-5)" />
        <Text
          size="sm"
          fw={600}
          c="stone.9"
        >
          {t('planDetail.editToolbar.editing')}
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
          {t('planDetail.editToolbar.unsavedChanges')}
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
          className="flex items-center gap-1.5 px-4 rounded-lg cursor-pointer border-none h-[34px] bg-(--mantine-color-yellow-4) text-(--mantine-color-stone-9) font-semibold text-sm"
          onClick={onFinish}
        >
          <IconCheck size={14} />
          {t('planDetail.editToolbar.finishEditing')}
        </button>
      </div>
    </div>
  )
}
