'use client'

import { ActionIcon, Button, Text, TextInput } from '@mantine/core'
import { IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react'
import clsx from 'clsx'

interface Props {
  open: boolean;
  query: string;
  placeholder: string;
  searchLabel: string;
  className?: string;
  matchIndex?: number;
  matchCount?: number;
  onToggle: () => void;
  onQueryChange: (q: string) => void;
  onSearch: () => void;
  onNavigatePrev?: () => void;
  onNavigateNext?: () => void;
}

export function TrailGraphSearchBar({
  open,
  query,
  placeholder,
  searchLabel,
  className,
  matchIndex,
  matchCount,
  onToggle,
  onQueryChange,
  onSearch,
  onNavigatePrev,
  onNavigateNext,
}: Props) {
  const rightSection = matchCount !== undefined && matchCount > 0
    ? (
      <div className="flex items-center gap-0.5 pr-0.5">
        <Text
          c="dimmed"
          size="xs"
        >
          {(matchIndex ?? 0) + 1}/{matchCount}
        </Text>
        {matchCount > 1 && (
          <>
            <ActionIcon
              aria-label="previous result"
              size="xs"
              variant="subtle"
              onClick={onNavigatePrev}
            >
              <IconChevronUp size={10} />
            </ActionIcon>
            <ActionIcon
              aria-label="next result"
              size="xs"
              variant="subtle"
              onClick={onNavigateNext}
            >
              <IconChevronDown size={10} />
            </ActionIcon>
          </>
        )}
      </div>
    )
    : undefined

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
            rightSection={rightSection}
            rightSectionPointerEvents="all"
            rightSectionWidth={matchCount !== undefined && matchCount > 1 ? 72 : matchCount ? 36 : undefined}
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
