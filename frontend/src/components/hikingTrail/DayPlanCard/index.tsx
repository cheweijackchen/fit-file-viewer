'use client'

import { ActionIcon, Menu, Text } from '@mantine/core'
import { IconDotsVertical, IconEraser, IconPencil, IconTrash } from '@tabler/icons-react'
import { useMemo } from 'react'
import { PACE_TIERS } from '@/constants/hiking-trails/dayPlanCard'
import { TrailNodeType } from '@/constants/hiking-trails/hikingTrail'
import { formatTrailMinutes } from '@/lib/timeFormatter'
import { buildTrailAdjacencyList, calculatePathTime } from '@/lib/trailGraph'
import type { DayPlan, Trail } from '@/model/hikingTrail'
import { DayPlanForm } from './components/DayPlanForm'
import { NodeTypeBadge } from './components/NodeTypeBadge'
import { RouteIndicator } from './components/RouteIndicator'

interface Props {
  dayPlan: DayPlan;
  dayIndex: number;
  trail: Trail;
  paceMultiplier: number;
  mode: 'view' | 'edit';
  showOptions?: boolean;
  onEdit?: () => void;
  onClearRoute?: () => void;
  onDelete?: () => void;
  // Edit mode — in-progress planning state
  editStopIds?: string[];
  onStartingNodeChange?: (nodeId: string) => void;
  onNodeSelect?: (nodeId: string) => void;
  onUndo?: () => void;
  onCompleteRoute?: () => void;
}

const ACCOMMODATION_TYPES = new Set<TrailNodeType>([TrailNodeType.Hut, TrailNodeType.Camp])

export function DayPlanCard({
  dayPlan,
  dayIndex,
  trail,
  paceMultiplier,
  mode,
  showOptions,
  onEdit,
  onClearRoute,
  onDelete,
  editStopIds,
  onStartingNodeChange,
  onNodeSelect,
  onUndo,
  onCompleteRoute,
}: Props) {
  const adj = useMemo(() => buildTrailAdjacencyList(trail), [trail])

  const nodeMap = useMemo(
    () => Object.fromEntries(trail.nodes.map((n) => [n.id, n])),
    [trail],
  )

  // In edit mode, use editStopIds for time display if provided; fallback to dayPlan.stops
  const activeStopIds = useMemo(
    () =>
      mode === 'edit' && editStopIds !== undefined
        ? editStopIds
        : dayPlan.stops.map((s) => s.nodeId),
    [mode, editStopIds, dayPlan.stops],
  )

  let rawMinutes = 0
  try {
    rawMinutes = calculatePathTime(adj, activeStopIds)
  } catch {
    // invalid path — show 0
  }

  const weightedMinutes = Math.round(rawMinutes * paceMultiplier)
  const paceTier = PACE_TIERS.find((t) => weightedMinutes / 60 < t.maxHours) ?? PACE_TIERS[PACE_TIERS.length - 1]!

  const lastStop = activeStopIds.length > 0 ? nodeMap[activeStopIds[activeStopIds.length - 1]!] : undefined
  const lastNodeType = lastStop?.nodeType
  const accommodationBadge =
    lastNodeType && ACCOMMODATION_TYPES.has(lastNodeType) ? lastNodeType : null

  const hasWaterSource = activeStopIds.some(
    (id) => nodeMap[id]?.nodeType === TrailNodeType.WaterSource,
  )

  const dayLabel = String(dayIndex).padStart(2, '0')

  // The original horizontal card row content (shared between view and edit)
  const cardRow = (
    <>
      {/* Stub col — day number */}
      <div
        className="flex flex-col shrink-0"
        style={{
          width: 44,
          gap: -2,
        }}
      >
        <Text
          component="span"
          style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: 'var(--mantine-color-yellow-7)',
            lineHeight: 1,
          }}
        >
          DAY
        </Text>
        <Text
          component="span"
          style={{
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: 'var(--mantine-color-stone-9)',
            lineHeight: 1,
          }}
        >
          {dayLabel}
        </Text>
      </div>

      {/* Dotted vertical divider */}
      <svg
        width={1}
        height={56}
        className="shrink-0"
        style={{ overflow: 'visible' }}
      >
        <line
          x1={0.5}
          y1={0}
          x2={0.5}
          y2={56}
          stroke="var(--mantine-color-stone-3)"
          strokeWidth={1.2}
          strokeDasharray="3 4"
          strokeLinecap="round"
        />
      </svg>

      {/* Content col — badges + route */}
      <div
        className="flex flex-col flex-1 min-w-0"
        style={{ gap: 10 }}
      >
        {/* Icon badge row */}
        {(accommodationBadge !== null || hasWaterSource) && (
          <div
            className="flex items-center"
            style={{ gap: 6 }}
          >
            {accommodationBadge !== null && (
              <NodeTypeBadge nodeType={accommodationBadge} />
            )}
            {hasWaterSource && (
              <NodeTypeBadge nodeType={TrailNodeType.WaterSource} />
            )}
          </div>
        )}

        {/* Route chip row */}
        {activeStopIds.length === 0 ? (
          <Text
            size="xs"
            style={{ color: 'var(--mantine-color-stone-4)' }}
          >
            —
          </Text>
        ) : (
          <RouteIndicator
            stopIds={activeStopIds}
            nodeMap={nodeMap}
          />
        )}
      </div>

      {/* Time col */}
      <div
        className="flex flex-col items-end shrink-0"
        style={{ gap: 6 }}
      >
        {/* SPEC time */}
        <div
          className="flex flex-col items-end"
          style={{ gap: 1 }}
        >
          <Text
            component="span"
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: 'var(--mantine-color-stone-5)',
              lineHeight: 1,
            }}
          >
            SPEC
          </Text>
          <Text
            component="span"
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: 'var(--mantine-color-stone-5)',
              lineHeight: 1,
            }}
          >
            {formatTrailMinutes(rawMinutes)}
          </Text>
        </div>

        {/* YOU time */}
        <div className="flex flex-col items-end">
          <Text
            component="span"
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: paceTier.color,
              lineHeight: 1,
            }}
          >
            YOU
          </Text>
          <Text
            component="span"
            style={{
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: paceTier.color,
              lineHeight: 1,
            }}
          >
            {formatTrailMinutes(weightedMinutes)}
          </Text>
        </div>
      </div>

      {/* Dots menu — shown when showOptions, top-aligned */}
      {showOptions && (
        <div className="self-start">
          <Menu
            withinPortal
            position="bottom-end"
          >
            <Menu.Target>
              <ActionIcon
                size={32}
                radius="xl"
                style={{
                  background: 'var(--mantine-color-stone-1)',
                  color: 'var(--mantine-color-stone-6)',
                  flexShrink: 0,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <IconDotsVertical size={16} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconPencil size={14} />}
                onClick={onEdit}
              >
                編輯
              </Menu.Item>
              <Menu.Item
                leftSection={<IconEraser size={14} />}
                onClick={onClearRoute}
              >
                清除路線
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                color="red"
                leftSection={<IconTrash size={14} />}
                onClick={onDelete}
              >
                刪除
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      )}
    </>
  )

  const cardBase = {
    padding: '16px 20px',
    background: '#ffffff',
    border: '1px solid var(--mantine-color-stone-2)',
    boxShadow: '0 1px 6px -3px rgba(44,36,24,0.06)',
  }

  if (mode === 'edit') {
    return (
      <div
        className="flex flex-col rounded-xl"
        style={cardBase}
      >
        {/* Original header row — unchanged */}
        <div
          className="flex items-center"
          style={{ gap: 20 }}
        >
          {cardRow}
        </div>

        {/* Horizontal divider */}
        <div
          style={{
            height: 1,
            background: 'var(--mantine-color-stone-2)',
            margin: '12px 0',
          }}
        />

        {/* DayPlanForm */}
        <DayPlanForm
          trail={trail}
          adj={adj}
          nodeMap={nodeMap}
          paceMultiplier={paceMultiplier}
          stopIds={editStopIds ?? []}
          rawMinutes={rawMinutes}
          weightedMinutes={weightedMinutes}
          onStartingNodeChange={onStartingNodeChange ?? (() => {})}
          onNodeSelect={onNodeSelect ?? (() => {})}
          onUndo={onUndo ?? (() => {})}
          onCompleteRoute={onCompleteRoute ?? (() => {})}
        />
      </div>
    )
  }

  return (
    <div
      className="flex items-center rounded-xl"
      style={{
        ...cardBase,
        gap: 20,
      }}
    >
      {cardRow}
    </div>
  )
}
