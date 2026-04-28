'use client'

import { ActionIcon, Divider, Menu, Text } from '@mantine/core'
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

const cardCls = 'px-5 py-4 bg-white border border-(--mantine-color-stone-2) shadow-[0_1px_6px_-3px_rgba(44,36,24,0.06)] rounded-xl'

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
      <div className="flex flex-col shrink-0 w-11">
        <Text
          component="span"
          size="2xs"
          c="yellow.7"
          fw={700}
          lh={1}
          className="tracking-[0.12em]"
        >
          DAY
        </Text>
        <Text
          component="span"
          size="3xl"
          c="stone.9"
          fw={800}
          lh={1}
          className="tracking-[-0.04em]"
        >
          {dayLabel}
        </Text>
      </div>

      <Divider
        orientation="vertical"
        color="stone.3"
        className="shrink-0 self-stretch"
      />

      {/* Content col — badges + route */}
      <div className="flex flex-col flex-1 min-w-0 gap-[10px]">
        {/* Icon badge row */}
        {(accommodationBadge !== null || hasWaterSource) && (
          <div className="flex items-center gap-1.5">
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
            c="stone.4"
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
      <div className="flex flex-col items-end shrink-0 gap-1.5">
        {/* SPEC time */}
        <div className="flex flex-col items-end gap-px">
          <Text
            component="span"
            size="2xs"
            c="stone.5"
            fw={700}
            lh={1}
            className="tracking-[0.12em]"
          >
            SPEC
          </Text>
          <Text
            component="span"
            size="sm"
            c="stone.5"
            fw={500}
            lh={1}
          >
            {formatTrailMinutes(rawMinutes)}
          </Text>
        </div>

        {/* YOU time */}
        <div className="flex flex-col items-end">
          <Text
            component="span"
            size="2xs"
            c={paceTier.color}
            fw={700}
            lh={1}
            className="tracking-[0.12em]"
          >
            YOU
          </Text>
          <Text
            component="span"
            size="3xl"
            c={paceTier.color}
            fw={800}
            lh={1}
            className="tracking-[-0.02em]"
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
                color="stone.1"
                c="stone.6"
                className="shrink-0"
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

  if (mode === 'edit') {
    return (
      <div className={`${cardCls} flex flex-col`}>
        {/* Original header row — unchanged */}
        <div className="flex items-center gap-5">
          {cardRow}
        </div>

        {/* Horizontal divider */}
        <div className="h-px bg-(--mantine-color-stone-2) my-3" />

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
    <div className={`${cardCls} flex items-center gap-5`}>
      {cardRow}
    </div>
  )
}
