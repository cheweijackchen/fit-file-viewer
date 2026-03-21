'use client'

import { TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function PeaksSearchInput({ value, onChange }: Props) {
  return (
    <TextInput
      placeholder="搜尋山名..."
      value={value}
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
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  )
}
