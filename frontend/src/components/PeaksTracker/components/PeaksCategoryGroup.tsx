'use client'

import { Button } from '@mantine/core'
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react'
import type { PeakGroup } from '@/lib/peakGrouper'
import { PeakCheckboxItem } from './PeakCheckboxItem'

interface Props {
  group: PeakGroup;
  isExpanded: boolean;
  onToggle: () => void;
  checkedIds: Set<string>;
  onTogglePeak: (id: string) => void;
  onSelectAll: (ids: string[]) => void;
  onDeselectAll: (ids: string[]) => void;
}

export function PeaksCategoryGroup({
  group,
  isExpanded,
  onToggle,
  checkedIds,
  onTogglePeak,
  onSelectAll,
  onDeselectAll,
}: Props) {
  const checkedCount = group.peaks.filter((p) => checkedIds.has(p.id)).length
  const totalCount = group.peaks.length
  const allChecked = checkedCount === totalCount

  const peakIds = group.peaks.map((p) => p.id)

  function handleSelectAll(e: React.MouseEvent) {
    e.stopPropagation()
    if (allChecked) {
      onDeselectAll(peakIds)
    } else {
      onSelectAll(peakIds)
    }
  }

  const ChevronIcon = isExpanded ? IconChevronDown : IconChevronRight
  const hasChecked = checkedCount > 0

  return (
    <div>
      <div
        className="flex items-center justify-between py-1.5 px-1 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          <ChevronIcon
            size={16}
            color={hasChecked ? 'var(--mantine-color-dark-9)' : 'var(--mantine-color-gray-6)'}
          />
          <span
            className="text-sm font-semibold"
            style={{ color: hasChecked ? 'var(--mantine-color-dark-9)' : 'var(--mantine-color-gray-6)' }}
          >
            {group.category}
          </span>
          <span
            className="text-xs font-medium"
            style={{ color: hasChecked ? 'var(--mantine-color-gray-6)' : 'var(--mantine-color-gray-5)' }}
          >
            {checkedCount}/{totalCount}
          </span>
        </div>
        <Button
          variant="subtle"
          size="compact-xs"
          color={hasChecked ? 'yellow.5' : 'gray.4'}
          className="text-xs font-medium"
          p={4}
          onClick={handleSelectAll}
        >
          {allChecked ? '取消全選' : '全選'}
        </Button>
      </div>

      {isExpanded && group.peaks.map((entry) => (
        <PeakCheckboxItem
          key={entry.id}
          id={entry.id}
          peak={entry.peak}
          isChecked={checkedIds.has(entry.id)}
          onToggle={onTogglePeak}
        />
      ))}
    </div>
  )
}
