'use client'

import { Select, Text } from '@mantine/core'
import { formatTrailMinutes } from '@/lib/timeFormatter'
import type { Trail, TrailAdjacencyList, TrailNode } from '@/model/hikingTrail'
import { NodeSelectionPanel } from './NodeSelectionPanel'

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
          <svg
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--mantine-color-yellow-7)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line
              x1="12"
              y1="9"
              x2="12"
              y2="13"
            />
            <line
              x1="12"
              y1="17"
              x2="12.01"
              y2="17"
            />
          </svg>
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
            <div
              className="flex items-center flex-wrap"
              style={{ gap: 4 }}
            >
              {stopIds.map((id, i) => {
                const isLast = i === stopIds.length - 1
                return (
                  <div
                    key={id}
                    className="flex items-center"
                    style={{ gap: 4 }}
                  >
                    <div
                      style={{
                        padding: '3px 8px',
                        borderRadius: 4,
                        background: isLast ? 'var(--color-sepia-9)' : 'var(--mantine-color-stone-2)',
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: isLast ? '#ffffff' : 'var(--mantine-color-stone-7)',
                        }}
                      >
                        {nodeMap[id]?.name ?? id}
                      </span>
                    </div>
                    {i < stopIds.length - 1 && (
                      <span style={{
                        fontSize: 11,
                        color: 'var(--mantine-color-stone-4)' 
                      }}
                      >→</span>
                    )}
                  </div>
                )
              })}
            </div>
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
          <svg
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--mantine-color-stone-7)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 7v6h6" />
            <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
          </svg>
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
          <svg
            width={15}
            height={15}
            viewBox="0 0 24 24"
            fill="none"
            stroke={hasStops ? '#ffffff' : 'var(--mantine-color-stone-5)'}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
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
