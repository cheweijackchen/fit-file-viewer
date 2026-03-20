'use client'

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
        className="flex items-center justify-between py-2.5 px-1 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          <ChevronIcon
            size={16}
            color={hasChecked ? '#1A1A1A' : '#8C8C8C'}
          />
          <span
            className="text-sm font-semibold"
            style={{ color: hasChecked ? '#1A1A1A' : '#8C8C8C' }}
          >
            {group.category}
          </span>
          <span
            className="text-xs font-medium"
            style={{ color: hasChecked ? '#8C8C8C' : '#B0B0B0' }}
          >
            {checkedCount}/{totalCount}
          </span>
        </div>
        <span
          className="text-xs font-medium cursor-pointer"
          style={{ color: hasChecked ? '#F0C142' : '#D0D0D0' }}
          onClick={handleSelectAll}
        >
          全選
        </span>
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
