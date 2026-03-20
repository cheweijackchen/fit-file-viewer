'use client'

import { Button, TextInput } from '@mantine/core'
import { IconSearch, IconUser, IconShare2 } from '@tabler/icons-react'

interface Props {
  searchValue: string;
  onSearchChange: (value: string) => void;
  userName: string;
  onUserNameChange: (value: string) => void;
  onShare: () => void;
}

export function PeaksActionBar({
  searchValue,
  onSearchChange,
  userName,
  onUserNameChange,
  onShare,
}: Props) {
  return (
    <div className="flex flex-col gap-3 w-full">
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
          leftSection={<IconShare2 size={16} />}
          className="shrink-0"
          onClick={onShare}
        >
          產生分享圖片
        </Button>
      </div>
      <TextInput
        placeholder="搜尋山名..."
        value={searchValue}
        leftSection={
          <IconSearch
            size={16}
            color="#B0B0B0"
          />
        }
        radius={4}
        styles={{
          input: {
            backgroundColor: '#FAFAF8',
            borderColor: '#E8E5E0',
            fontSize: 14,
          },
        }}
        onChange={(e) => onSearchChange(e.currentTarget.value)}
      />
    </div>
  )
}
