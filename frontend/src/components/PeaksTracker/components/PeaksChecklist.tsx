'use client'

import clsx from 'clsx'
import { useMemo, useState } from 'react'
import type { PeakGroup } from '@/lib/peakGrouper'
import { PeaksCategoryGroup } from './PeaksCategoryGroup'

interface Props {
  className: string;
  groups: PeakGroup[];
  searchQuery: string;
  checkedIds: Set<string>;
  onTogglePeak: (id: string) => void;
  onSelectAll: (ids: string[]) => void;
  onDeselectAll: (ids: string[]) => void;
}

export function PeaksChecklist({
  className,
  groups,
  searchQuery,
  checkedIds,
  onTogglePeak,
  onSelectAll,
  onDeselectAll,
}: Props) {
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(() => {
    const collapsed = new Set<string>()
    for (const group of groups) {
      const hasChecked = group.peaks.some((p) => checkedIds.has(p.id))
      if (!hasChecked) {
        collapsed.add(group.category)
      }
    }
    return collapsed
  })

  function handleToggleGroup(category: string) {
    setCollapsedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(category)) {
        next.delete(category)
      } else {
        next.add(category)
      }
      return next
    })
  }

  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) {
      return groups
    }
    return groups
      .map((group) => ({
        ...group,
        peaks: group.peaks.filter((p) =>
          p.peak.name.includes(searchQuery.trim()),
        ),
      }))
      .filter((group) => group.peaks.length > 0)
  }, [groups, searchQuery])

  return (
    <div className={clsx('flex-1 overflow-y-auto', className)}>
      {filteredGroups.map((group) => (
        <PeaksCategoryGroup
          key={group.category}
          group={group}
          isExpanded={
            searchQuery.trim() !== '' || !collapsedCategories.has(group.category)
          }
          checkedIds={checkedIds}
          onToggle={() => handleToggleGroup(group.category)}
          onTogglePeak={onTogglePeak}
          onSelectAll={onSelectAll}
          onDeselectAll={onDeselectAll}
        />
      ))}
    </div>
  )
}
