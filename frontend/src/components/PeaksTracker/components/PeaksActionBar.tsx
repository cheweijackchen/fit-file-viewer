'use client'

import { Button, TextInput } from '@mantine/core'
import { IconUser, IconCampfire } from '@tabler/icons-react'

interface Props {
  userName: string;
  onUserNameChange: (value: string) => void;
  onAction: () => void;
}

export function PeaksActionBar({
  userName,
  onUserNameChange,
  onAction,
}: Props) {
  return (
    <div className="flex gap-2 w-full">
      <TextInput
        placeholder="你的名字"
        value={userName}
        leftSection={
          <IconUser
            size={16}
            color="#B0B0B0"
          />
        }
        radius={4}
        className="flex-1"
        styles={{
          input: {
            backgroundColor: '#FAFAF8',
            borderColor: '#E8E5E0',
            fontSize: 14,
          },
        }}
        onChange={(e) => onUserNameChange(e.currentTarget.value)}
      />
      <Button
        leftSection={<IconCampfire size={16} />}
        className="shrink-0"
        onClick={onAction}
      >
        紀錄
      </Button>
    </div>
  )
}
