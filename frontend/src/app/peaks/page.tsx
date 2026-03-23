'use client'

import { Divider } from '@mantine/core'
import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'
import { BottomSheet } from '@/components/BottomSheet'
import { PeaksActionBar } from '@/components/PeaksTracker/components/PeaksActionBar'
import { PeaksChecklist } from '@/components/PeaksTracker/components/PeaksChecklist'
import { PeaksHeader } from '@/components/PeaksTracker/components/PeaksHeader'
import { PeaksProgress } from '@/components/PeaksTracker/components/PeaksProgress'
import { PeaksProgressDialog } from '@/components/PeaksTracker/components/PeaksProgressDialog'
import { PeaksSearchInput } from '@/components/PeaksTracker/components/PeaksSearchInput'
import useScreen from '@/hooks/useScreen'
import { peakGroups, TOTAL_PEAKS } from '@/lib/peakGrouper'
import { usePeaksStore, usePeaksActions } from '@/store/peaks/usePeaksStore'

const PeaksMapNoSSR = dynamic(
  () => import('@/components/PeaksTracker/components/PeaksMap').then(mod => mod.PeaksMap),
  { ssr: false },
)

export default function PeaksPage() {
  const checkedPeakIds = usePeaksStore.use.checkedPeakIds()
  const {
    togglePeak,
    checkAllInCategory,
    uncheckAllInCategory,
    clearAll,
  } = usePeaksActions()

  const [searchQuery, setSearchQuery] = useState('')
  const [recordDialogOpened, setRecordDialogOpened] = useState(false)
  const { onMobile } = useScreen()

  const checkedSet = useMemo(
    () => new Set(checkedPeakIds),
    [checkedPeakIds],
  )

  function handleShowRecords() {
    setRecordDialogOpened(true)
  }

  const searchInput = (
    <PeaksSearchInput
      value={searchQuery}
      onChange={setSearchQuery}
    />
  )

  const panelHeader = (
    <div className="flex flex-col gap-3 sm:gap-4">
      <PeaksHeader
        showClear={checkedSet.size > 0}
        onClear={clearAll}
      />
      <PeaksProgress
        completedCount={checkedPeakIds.length}
        total={TOTAL_PEAKS}
      />
      <Divider color="#E8E5E0" />
      {!onMobile && (
        <PeaksActionBar
          onAction={handleShowRecords}
        />
      )}
    </div>
  )

  const peaksList = (
    <PeaksChecklist
      className="sm:mt-4"
      groups={peakGroups}
      searchQuery={searchQuery}
      checkedIds={checkedSet}
      onTogglePeak={togglePeak}
      onSelectAll={checkAllInCategory}
      onDeselectAll={uncheckAllInCategory}
    />
  )

  const progressDialog = (
    <PeaksProgressDialog
      opened={recordDialogOpened}
      checkedIds={checkedSet}
      onClose={() => setRecordDialogOpened(false)}
    />
  )

  // Mobile layout: full-screen map + bottom sheet
  if (onMobile) {
    return (
      <div className="relative h-screen">
        <PeaksMapNoSSR />
        <BottomSheet>
          <div className="flex flex-col px-5 pb-4">
            {panelHeader}
            <div className="sticky top-0 z-10 bg-white py-3 flex flex-col gap-3">
              <PeaksActionBar onAction={handleShowRecords} />
              {searchInput}
            </div>
            {peaksList}
          </div>
        </BottomSheet>
        {progressDialog}
      </div>
    )
  }

  // Desktop layout: side panel + map
  return (
    <div className="flex h-screen">
      <div
        className="flex flex-col w-80 py-6 px-4 shrink-0 overflow-hidden"
        style={{
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #E8E5E0',
        }}
      >
        {panelHeader}
        <div className="mt-4">
          {searchInput}
        </div>
        {peaksList}
      </div>

      <div className="flex-1">
        <PeaksMapNoSSR />
      </div>
      {progressDialog}
    </div>
  )
}
