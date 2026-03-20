'use client'

import { Divider } from '@mantine/core'
import { useMemo, useState } from 'react'
import { BottomSheet } from '@/components/BottomSheet'
import { PeaksActionBar } from '@/components/PeaksTracker/components/PeaksActionBar'
import { PeaksChecklist } from '@/components/PeaksTracker/components/PeaksChecklist'
import { PeaksHeader } from '@/components/PeaksTracker/components/PeaksHeader'
import { PeaksProgress } from '@/components/PeaksTracker/components/PeaksProgress'
import useScreen from '@/hooks/useScreen'
import { peakGroups, TOTAL_PEAKS } from '@/lib/peakGrouper'
import { usePeaksStore, usePeaksActions } from '@/store/peaks/usePeaksStore'

export default function PeaksPage() {
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
  const { onMobile } = useScreen()

  const checkedSet = useMemo(
    () => new Set(checkedPeakIds),
    [checkedPeakIds],
  )

  function handleShare() {
    // TODO: 產生分享圖片
  }

  const panelContent = (
    <>
      <div className="flex flex-col gap-5">
        <PeaksHeader
          showClear={checkedSet.size > 0}
          onClear={clearAll}
        />
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
    </>
  )

  // Mobile layout: full-screen map + bottom sheet
  if (onMobile) {
    return (
      <div className="relative h-screen">
        <div
          className="h-full flex items-center justify-center"
          style={{ backgroundColor: '#FAFAF8' }}
        >
          <span
            className="text-lg"
            style={{ color: '#B0B0B0' }}
          >
            地圖功能即將推出
          </span>
        </div>
        <BottomSheet>
          <div className="flex flex-col px-5 pb-4">
            {panelContent}
          </div>
        </BottomSheet>
      </div>
    )
  }

  // Desktop layout: side panel + map
  return (
    <div className="flex h-screen">
      <div
        className="flex flex-col w-90 shrink-0 overflow-hidden"
        style={{
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #E8E5E0',
          padding: '32px 28px 24px 28px',
        }}
      >
        {panelContent}
      </div>

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
