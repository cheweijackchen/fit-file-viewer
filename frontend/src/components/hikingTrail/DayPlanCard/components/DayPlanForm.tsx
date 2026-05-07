'use client'

import { Alert, Button, Select, Text } from '@mantine/core'
import { TimePicker } from '@mantine/dates'
import { IconAlertTriangle, IconArrowBackUp, IconCheck } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { formatTrailMinutes } from '@/lib/timeFormatter'
import { applyQuickJump } from '@/lib/trailGraph'
import type { Trail, TrailAdjacencyList, TrailNode } from '@/model/hikingTrail'
import classes from './DayPlanForm.module.scss'
import { NodeSelectionPanel } from './NodeSelectionPanel'
import { QuickJumpModal } from './QuickJumpModal'
import { RouteIndicator } from './RouteIndicator'

interface Props {
  trail: Trail;
  adj: TrailAdjacencyList;
  nodeMap: Record<string, TrailNode>;
  paceMultiplier: number;
  stopIds: string[];
  weightedMinutes: number;
  rawMinutes: number;
  prevDayLastStopId?: string;
  startingTime?: string;
  onStartingNodeChange: (nodeId: string) => void;
  onStartingTimeChange?: (time: string) => void;
  onNodeSelect: (nodeId: string) => void;
  onUndo: () => void;
  onCompleteRoute: () => void;
  onRouteExtended?: (newStops: string[]) => void;
  enableRest?: boolean;
  editRestMinutes?: Record<string, number>;
  onRestMinutesChange?: (nodeId: string, minutes: number | undefined) => void;
}

export function DayPlanForm({
  trail,
  adj,
  nodeMap,
  paceMultiplier,
  stopIds,
  weightedMinutes,
  rawMinutes,
  prevDayLastStopId,
  startingTime,
  onStartingNodeChange,
  onStartingTimeChange,
  onNodeSelect,
  onUndo,
  onCompleteRoute,
  onRouteExtended,
  enableRest,
  editRestMinutes,
  onRestMinutesChange,
}: Props) {
  const t = useTranslations('hiking-trail-planner')
  const [jumpModalOpen, setJumpModalOpen] = useState(false)

  const showWarning = weightedMinutes / 60 >= 8
  const hasStops = stopIds.length > 0
  const canUndo = stopIds.length > 1

  const selectData = trail.nodes.map((n) => ({
    value: n.id,
    label: n.name
  }))
  const startingNodeId = stopIds[0] ?? null

  useEffect(() => {
    if (stopIds.length === 0 && prevDayLastStopId) {
      onStartingNodeChange(prevDayLastStopId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const prevDayLastNode = prevDayLastStopId ? nodeMap[prevDayLastStopId] : undefined
  const isDiscontinuous =
    prevDayLastStopId !== undefined &&
    startingNodeId !== null &&
    startingNodeId !== prevDayLastStopId

  return (
    <div className="flex flex-col gap-3">
      {/* Warning banner */}
      {showWarning && (
        <Alert
          variant="light"
          color="yellow"
          icon={
            <IconAlertTriangle
              size={14}
              stroke={2}
            />
          }
          py="xs"
          px="sm"
          fz="xs"
          title={t('planDetail.dayPlanCard.form.overTimeWarning')}
        >
        </Alert>
      )}
      {isDiscontinuous && prevDayLastNode && (
        <Alert
          variant="light"
          color="orange"
          icon={
            <IconAlertTriangle
              size={14}
              stroke={2}
            />
          }
          py="xs"
          px="sm"
          fz="xs"
        >
          <div className="flex items-center justify-between gap-2">
            <Text
              c="orange" 
              size="sm"
              fw="700"
            >{t('planDetail.dayPlanCard.form.discontinuousAlert', { prevDayLastNodeName: prevDayLastNode.name })}</Text>
            <Button
              size="compact-xs"
              variant="filled"
              color="orange"
              onClick={() => onStartingNodeChange(prevDayLastStopId!)}
            >
              {t('planDetail.dayPlanCard.form.usePrevEndpoint')}
            </Button>
          </div>
        </Alert>
      )}

      {/* Starting Point + Starting Time */}
      <div className="flex flex-col gap-3 md:flex-row md:gap-4">
        
        <div className="md:flex-1">
          <Select
            searchable
            label={t('planDetail.dayPlanCard.form.startingPointLabel')}
            data={selectData}
            value={startingNodeId}
            placeholder={t('planDetail.dayPlanCard.form.startingPointPlaceholder')}
            classNames={{
              input: classes.selectInput,
              label: 'text-xs! text-(--mantine-color-stone-6)' 
            }}
            onChange={(val) => val && onStartingNodeChange(val)}
          />
        </div>
        <div className="md:flex-1">
          <TimePicker
            clearable
            label={t('planDetail.dayPlanCard.form.startingTimeLabel')}
            value={startingTime ?? ''}
            classNames={{
              input: classes.selectInput,
              label: 'text-xs! text-(--mantine-color-stone-6)',
              field: `${classes.timeField} w-6`
            }}
            onChange={(val) => onStartingTimeChange?.(val)}
          />
        </div>
      </div>

      {/* Route Summary */}
      {hasStops && (
        <div className="flex gap-3 rounded-[10px] border border-(--mantine-color-stone-3) bg-(--mantine-color-stone-1) px-3 py-[10px]">
          {/* Left: label + chips */}
          <div className="flex flex-col flex-1 min-w-0 gap-1.5">
            <span className="text-[9px] font-bold tracking-[0.08em] text-(--mantine-color-stone-8)">
              {t('planDetail.dayPlanCard.form.todaysRoute')}
            </span>
            <RouteIndicator
              highlightLast
              stopIds={stopIds}
              nodeMap={nodeMap}
              chipBackground="var(--mantine-color-stone-2)"
              fontWeight={600}
              editMode={enableRest}
              restMinutes={editRestMinutes}
              onRestMinutesChange={onRestMinutesChange}
            />
          </div>

          {/* Right: time */}
          <div className="flex flex-col items-end shrink-0">
            <span className="text-xl font-extrabold text-(--mantine-color-stone-8) leading-none">
              {formatTrailMinutes(weightedMinutes)}
            </span>
            <span className="text-[11px] text-(--mantine-color-stone-8)">
              {formatTrailMinutes(rawMinutes)} × {paceMultiplier.toFixed(1)}
            </span>
          </div>
        </div>
      )}

      {/* Node Selection Panel */}
      {hasStops && (
        <NodeSelectionPanel
          adj={adj}
          nodeMap={nodeMap}
          stopIds={stopIds}
          enableRest={enableRest}
          currentNodeRestMinutes={editRestMinutes?.[stopIds[stopIds.length - 1] ?? '']}
          onNodeSelect={onNodeSelect}
          onQuickJump={onRouteExtended ? () => setJumpModalOpen(true) : undefined}
          onCurrentNodeRestMinutesChange={(minutes) => {
            const currentId = stopIds[stopIds.length - 1]
            if (currentId) {
              onRestMinutesChange?.(currentId, minutes)
            }
          }}
        />
      )}

      <QuickJumpModal
        opened={jumpModalOpen}
        nodes={trail.nodes}
        currentNodeId={stopIds[stopIds.length - 1]}
        onClose={() => setJumpModalOpen(false)}
        onConfirm={(targetId) => {
          const newRoute = applyQuickJump(stopIds, targetId, adj)
          if (newRoute) {
            onRouteExtended?.(newRoute)
          }
          setJumpModalOpen(false)
        }}
      />

      {/* Footer */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          disabled={!canUndo}
          className={`flex items-center justify-center shrink-0 w-[140px] h-11 rounded-[10px] bg-(--mantine-color-stone-1) border border-(--mantine-color-stone-3) gap-1.5 ${canUndo ? 'cursor-pointer opacity-100' : 'cursor-not-allowed opacity-40'}`}
          onClick={onUndo}
        >
          <IconArrowBackUp
            size={14}
            stroke={2}
            color="var(--mantine-color-stone-7)"
          />
          <span className="text-[13px] font-semibold text-(--mantine-color-stone-7)">
            {t('planDetail.dayPlanCard.form.undo')}
          </span>
        </button>

        <button
          type="button"
          disabled={!hasStops}
          className={`flex items-center justify-center flex-1 h-11 rounded-[10px] border-none gap-2 ${hasStops ? 'bg-(--mantine-color-yellow-5) cursor-pointer' : 'bg-(--mantine-color-stone-2) cursor-not-allowed'}`}
          onClick={onCompleteRoute}
        >
          <IconCheck
            size={15}
            stroke={2.5}
            color={hasStops ? 'white' : 'var(--mantine-color-stone-5)'}
          />
          <span className={`text-sm font-bold ${hasStops ? 'text-white' : 'text-(--mantine-color-stone-5)'}`}>
            {t('planDetail.dayPlanCard.form.completeRoute')}
          </span>
        </button>
      </div>
    </div>
  )
}
