'use client'

import { ActionIcon, Button, Container, Text } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

interface Props {
  onCancel: () => void;
  onFinish: () => void;
}

export function EditToolbar({ onCancel, onFinish }: Props) {
  const t = useTranslations('hiking-trail-planner')

  return (
    <div className="shrink-0 h-[52px] bg-(--mantine-color-yellow-0) border-b border-(--mantine-color-yellow-3)">
      <Container
        size="xl"
        h="100%"
      >
        <div className="flex items-center justify-between h-full">
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
            <Button
              color="yellow"
              variant="filled"
              size="sm"
              radius="md"
              leftSection={<IconCheck size={14} />}
              onClick={onFinish}
            >
              {t('planDetail.editToolbar.finishEditing')}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
