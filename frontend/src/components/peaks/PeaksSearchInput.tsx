'use client'

import { TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { IconSearch } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

interface Props {
  onChange: (value: string) => void;
}

export function PeaksSearchInput({ onChange }: Props) {
  const [inputValue, setInputValue] = useState('')
  const [debouncedInputValue] = useDebouncedValue(inputValue, 300)

  useEffect(() => {
    onChange(debouncedInputValue)
  }, [debouncedInputValue, onChange])

  return (
    <TextInput
      placeholder="搜尋山名..."
      value={inputValue}
      leftSection={
        <IconSearch
          size={16}
          color="var(--mantine-color-gray-5)"
        />
      }
      styles={{
        input: {
          borderColor: '#E8E5E0'
        },
      }}
      variant="filled"
      onChange={(e) => setInputValue(e.currentTarget.value)}
    />
  )
}
