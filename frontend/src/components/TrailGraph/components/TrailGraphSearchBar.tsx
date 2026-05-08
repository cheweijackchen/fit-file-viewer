'use client'

import { ActionIcon, Button, TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import clsx from 'clsx'

interface Props {
  open: boolean;
  query: string;
  placeholder: string;
  searchLabel: string;
  className?: string;
  onToggle: () => void;
  onQueryChange: (q: string) => void;
  onSearch: () => void;
}

export function TrailGraphSearchBar({
  open,
  query,
  placeholder,
  searchLabel,
  className,
  onToggle,
  onQueryChange,
  onSearch,
}: Props) {
  return (
    <div className={clsx('flex items-center gap-1', className)}>
      <ActionIcon
        aria-label="search nodes"
        size="sm"
        variant="default"
        onClick={onToggle}
      >
        <IconSearch size={14} />
      </ActionIcon>
      {open && (
        <>
          <TextInput
            autoFocus
            className="flex-1 min-w-0 sm:flex-none sm:w-48"
            placeholder={placeholder}
            size="xs"
            value={query}
            onChange={(e) => onQueryChange(e.currentTarget.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          />
          <Button
            className="shrink-0"
            size="xs"
            onClick={onSearch}
          >
            {searchLabel}
          </Button>
        </>
      )}
    </div>
  )
}
