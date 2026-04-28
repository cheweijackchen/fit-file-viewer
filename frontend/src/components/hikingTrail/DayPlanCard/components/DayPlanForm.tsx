'use client'

import { Select, Text } from '@mantine/core'
import { IconAlertTriangle, IconArrowBackUp, IconCheck } from '@tabler/icons-react'
import { formatTrailMinutes } from '@/lib/timeFormatter'
import type { Trail, TrailAdjacencyList, TrailNode } from '@/model/hikingTrail'
import classes from './DayPlanForm.module.scss'
import { NodeSelectionPanel } from './NodeSelectionPanel'
import { RouteIndicator } from './RouteIndicator'

interface Props {
  trail: Trail;
  adj: TrailAdjacencyList;
  nodeMap: Record<string, TrailNode>;
  paceMultiplier: number;
  stopIds: string[];
  weightedMinutes: number;
  rawMinutes: number;
  onStartingNodeChange: (nodeId: string) => void;
  onNodeSelect: (nodeId: string) => void;
  onUndo: () => void;
  onCompleteRoute: () => void;
}

export function DayPlanForm({
  trail,
  adj,
  nodeMap,
  paceMultiplier,
  stopIds,
  weightedMinutes,
  rawMinutes,
  onStartingNodeChange,
  onNodeSelect,
  onUndo,
  onCompleteRoute,
}: Props) {
  const showWarning = weightedMinutes / 60 >= 8
  const hasStops = stopIds.length > 0
  const canUndo = stopIds.length > 1

  const selectData = trail.nodes.map((n) => ({
    value: n.id,
    label: n.name
  }))
  const startingNodeId = stopIds[0] ?? null

  return (
    <div className="flex flex-col gap-3">
      {/* Warning banner */}
      {showWarning && (
        <div className="flex items-center gap-2 rounded-lg border border-(--mantine-color-orange-4) bg-(--mantine-color-orange-0) px-[14px] py-[10px]">
          <IconAlertTriangle
            size={14}
            stroke={2}
            color="var(--mantine-color-yellow-7)"
            className="shrink-0"
          />
          <Text
            c="orange.9"
            size="xs"
            component="span"
            className="font-medium"
          >
            目前累積時間已超過 8 小時，考慮是否在此結束本日。
          </Text>
        </div>
      )}

      {/* Starting Point */}
      <div className="flex flex-col gap-1.5">
        <Text
          c="stone.6"
          size="xs"
          component="span"
          className="font-semibold"
        >
          Starting Point
        </Text>
        <Select
          searchable
          data={selectData}
          value={startingNodeId}
          placeholder="選擇起點"
          classNames={{ input: classes.selectInput }}
          onChange={(val) => val && onStartingNodeChange(val)}
        />
      </div>

      {/* Route Summary */}
      {hasStops && (
        <div className="flex items-center gap-3 rounded-[10px] border border-(--day-plan-summary-border) bg-(--mantine-color-stone-1) px-3 py-[10px]">
          {/* Left: label + chips */}
          <div className="flex flex-col flex-1 min-w-0 gap-1.5">
            <span className="text-[9px] font-bold tracking-[0.08em] text-(--mantine-color-yellow-8)">
              TODAY&apos;S ROUTE
            </span>
            <RouteIndicator
              highlightLast
              stopIds={stopIds}
              nodeMap={nodeMap}
              chipBackground="var(--mantine-color-stone-2)"
              fontWeight={600}
            />
          </div>

          {/* Right: time */}
          <div className="flex flex-col items-end shrink-0 gap-px">
            <span className="text-xl font-extrabold text-(--mantine-color-yellow-7) leading-none">
              {formatTrailMinutes(rawMinutes)}
            </span>
            <span className="text-[11px] text-(--mantine-color-yellow-8)">
              × {paceMultiplier.toFixed(1)} = {formatTrailMinutes(weightedMinutes)}
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
          onNodeSelect={onNodeSelect}
        />
      )}

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
            復原上一步
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
            完成路線
          </span>
        </button>
      </div>
    </div>
  )
}
