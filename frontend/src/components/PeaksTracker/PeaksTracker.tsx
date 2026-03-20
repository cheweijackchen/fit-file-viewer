'use client'

import { Divider } from '@mantine/core'
import { useMemo, useState } from 'react'
import { peakGroups, TOTAL_PEAKS } from '@/lib/peakGrouper'
import { usePeaksStore, usePeaksActions } from '@/store/peaks/usePeaksStore'
import { PeaksActionBar } from './components/PeaksActionBar'
import { PeaksChecklist } from './components/PeaksChecklist'
import { PeaksHeader } from './components/PeaksHeader'
import { PeaksProgress } from './components/PeaksProgress'

export function PeaksTracker() {
  const checkedPeakIds = usePeaksStore.use.checkedPeakIds()
  const userName = usePeaksStore.use.userName()
  const {
    togglePeak,
    checkAllInCategory,
    uncheckAllInCategory,
    clearAll,
    setUserName,
  } = usePeaksActions()

  const [searchQuery, setSearchQuery] = useState('')

  const checkedSet = useMemo(
    () => new Set(checkedPeakIds),
    [checkedPeakIds],
  )

  function handleShare() {
    // TODO: 產生分享圖片
  }

  return (
    <div className="flex h-[calc(100vh-60px)]">
      {/* Left Panel */}
      <div
        className="flex flex-col w-[420px] shrink-0 overflow-hidden"
        style={{
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #E8E5E0',
          padding: '32px 28px 24px 28px',
        }}
      >
        <div className="flex flex-col gap-5">
          <PeaksHeader onClear={clearAll} />
          <PeaksProgress
            completedCount={checkedPeakIds.length}
            total={TOTAL_PEAKS}
          />
          <Divider color="#E8E5E0" />
          <PeaksActionBar
            searchValue={searchQuery}
            userName={userName}
            onSearchChange={setSearchQuery}
            onUserNameChange={setUserName}
            onShare={handleShare}
          />
          <Divider color="#E8E5E0" />
        </div>
        <PeaksChecklist
          groups={peakGroups}
          searchQuery={searchQuery}
          checkedIds={checkedSet}
          onTogglePeak={togglePeak}
          onSelectAll={checkAllInCategory}
          onDeselectAll={uncheckAllInCategory}
        />
      </div>

      {/* Right Panel - Map Placeholder */}
      <div
        className="flex-1 flex items-center justify-center"
        style={{ backgroundColor: '#FAFAF8' }}
      >
        <span
          className="text-lg"
          style={{ color: '#B0B0B0' }}
        >
          地圖功能即將推出
        </span>
      </div>
    </div>
  )
}
