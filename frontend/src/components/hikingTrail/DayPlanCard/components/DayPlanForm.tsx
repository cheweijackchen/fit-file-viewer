'use client'

import { Select, Text } from '@mantine/core'
import { IconAlertTriangle, IconArrowBackUp, IconCheck } from '@tabler/icons-react'
import { formatTrailMinutes } from '@/lib/timeFormatter'
import type { Trail, TrailAdjacencyList, TrailNode } from '@/model/hikingTrail'
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
    <div
      className="flex flex-col"
      style={{ gap: 12 }}
    >
      {/* Warning banner */}
      {showWarning && (
        <div
          className="flex items-center"
          style={{
            background: 'var(--mantine-color-orange-0)',
            border: '1px solid var(--mantine-color-orange-4)',
            borderRadius: 8,
            padding: '10px 14px',
            gap: 8,
          }}
        >
          <IconAlertTriangle
            size={14}
            stroke={2}
            color="var(--mantine-color-yellow-7)"
            className="shrink-0"
          />
          <Text
            component="span"
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: 'var(--mantine-color-orange-9)',
            }}
          >
            目前累積時間已超過 8 小時，考慮是否在此結束本日。
          </Text>
        </div>
      )}

      {/* Starting Point */}
      <div
        className="flex flex-col"
        style={{ gap: 6 }}
      >
        <Text
          component="span"
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--mantine-color-stone-6)',
          }}
        >
          Starting Point
        </Text>
        <Select
          searchable
          data={selectData}
          value={startingNodeId}
          placeholder="選擇起點"
          styles={{
            input: {
              background: 'var(--mantine-color-stone-1)',
              border: '1px solid var(--mantine-color-stone-3)',
              borderRadius: 8,
              height: 36,
              fontSize: 13,
            },
          }}
          onChange={(val) => val && onStartingNodeChange(val)}
        />
      </div>

      {/* Route Summary */}
      {hasStops && (
        <div
          className="flex items-center"
          style={{
            background: 'var(--mantine-color-stone-1)',
            border: '1px solid var(--day-plan-summary-border)',
            borderRadius: 10,
            padding: '10px 12px',
            gap: 12,
          }}
        >
          {/* Left: label + chips */}
          <div
            className="flex flex-col flex-1 min-w-0"
            style={{ gap: 6 }}
          >
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: 'var(--mantine-color-yellow-8)',
              }}
            >
              TODAY&apos;S ROUTE
            </span>
            <RouteIndicator
              highlightLast
              stopIds={stopIds}
              nodeMap={nodeMap}
            />
          </div>

          {/* Right: time */}
          <div
            className="flex flex-col items-end shrink-0"
            style={{ gap: 1 }}
          >
            <span
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: 'var(--mantine-color-yellow-7)',
                lineHeight: 1,
              }}
            >
              {formatTrailMinutes(rawMinutes)}
            </span>
            <span
              style={{
                fontSize: 11,
                color: 'var(--mantine-color-yellow-8)',
              }}
            >
              × 0.9 = {formatTrailMinutes(weightedMinutes)}
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
      <div
        className="flex items-center"
        style={{ gap: 10 }}
      >
        <button
          type="button"
          disabled={!canUndo}
          className="flex items-center justify-center shrink-0"
          style={{
            width: 140,
            height: 44,
            borderRadius: 10,
            background: 'var(--mantine-color-stone-1)',
            border: '1px solid var(--mantine-color-stone-3)',
            gap: 6,
            cursor: canUndo ? 'pointer' : 'not-allowed',
            opacity: canUndo ? 1 : 0.4,
          }}
          onClick={onUndo}
        >
          <IconArrowBackUp
            size={14}
            stroke={2}
            color="var(--mantine-color-stone-7)"
          />
          <span style={{
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--mantine-color-stone-7)' 
          }}
          >
            復原上一步
          </span>
        </button>

        <button
          type="button"
          disabled={!hasStops}
          className="flex items-center justify-center flex-1"
          style={{
            height: 44,
            borderRadius: 10,
            background: hasStops ? 'var(--mantine-color-yellow-5)' : 'var(--mantine-color-stone-2)',
            border: 'none',
            gap: 8,
            cursor: hasStops ? 'pointer' : 'not-allowed',
          }}
          onClick={onCompleteRoute}
        >
          <IconCheck
            size={15}
            stroke={2.5}
            color={hasStops ? '#ffffff' : 'var(--mantine-color-stone-5)'}
          />
          <span style={{
            fontSize: 14,
            fontWeight: 700,
            color: hasStops ? '#ffffff' : 'var(--mantine-color-stone-5)' 
          }}
          >
            完成路線
          </span>
        </button>
      </div>
    </div>
  )
}
