'use client'

import { ActionIcon, Divider, Menu, Text } from '@mantine/core'
import { IconDotsVertical, IconEraser, IconPencil, IconPencilOff, IconTrash } from '@tabler/icons-react'
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
  editDisabled?: boolean;
  onEdit?: () => void;
  onCancelEdit?: () => void;
  onClearRoute?: () => void;
  onDelete?: () => void;
  // Edit mode — in-progress planning state
  editStopIds?: string[];
  prevDayLastStopId?: string;
  onStartingNodeChange?: (nodeId: string) => void;
  onNodeSelect?: (nodeId: string) => void;
  onUndo?: () => void;
  onCompleteRoute?: () => void;
  onRouteExtended?: (newStops: string[]) => void;
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
  editDisabled,
  onEdit,
  onCancelEdit,
  onClearRoute,
  onDelete,
  editStopIds,
  prevDayLastStopId,
  onStartingNodeChange,
  onNodeSelect,
  onUndo,
  onCompleteRoute,
  onRouteExtended,
}: Props) {
  const adj = useMemo(() => buildTrailAdjacencyList(trail), [trail])

  const nodeMap = useMemo(
    () => Object.fromEntries(trail.nodes.map((n) => [n.id, n])),
    [trail],
  )

  // Header always shows committed (saved) state
  const committedStopIds = useMemo(
    () => dayPlan.stops.map((s) => s.nodeId),
    [dayPlan.stops],
  )

  // Form shows in-progress editing state
  const formStopIds = useMemo(
    () => editStopIds ?? committedStopIds,
    [editStopIds, committedStopIds],
  )

  let rawMinutes = 0
  try {
    rawMinutes = calculatePathTime(adj, committedStopIds)
  } catch {
    // invalid path — show 0
  }

  const weightedMinutes = Math.round(rawMinutes * paceMultiplier)

  let formRawMinutes = rawMinutes
  let formWeightedMinutes = weightedMinutes
  if (mode === 'edit') {
    try {
      formRawMinutes = calculatePathTime(adj, formStopIds)
    } catch {
      // invalid path — show 0
    }
    formWeightedMinutes = Math.round(formRawMinutes * paceMultiplier)
  }

  const paceTier = PACE_TIERS.find((t) => weightedMinutes / 60 < t.maxHours) ?? PACE_TIERS[PACE_TIERS.length - 1]!

  const lastStop = committedStopIds.length > 0 ? nodeMap[committedStopIds[committedStopIds.length - 1]!] : undefined
  const lastNodeType = lastStop?.nodeType
  const accommodationBadge =
    lastNodeType && ACCOMMODATION_TYPES.has(lastNodeType) ? lastNodeType : null

  const hasWaterSource = committedStopIds.some(
    (id) => nodeMap[id]?.nodeType === TrailNodeType.WaterSource,
  )

  const dayLabel = String(dayIndex).padStart(2, '0')

  const menuDropdown = (
    <Menu.Dropdown>
      {mode === 'edit' ? (
        <>
          <Menu.Item
            c="bright"
            color="stone"
            leftSection={<IconPencilOff size={14} />}
            onClick={onCancelEdit}
          >
            取消編輯
          </Menu.Item>
          <Menu.Item
            c="bright"
            color="stone"
            leftSection={<IconEraser size={14} />}
            onClick={onClearRoute}
          >
            清除路線
          </Menu.Item>
        </>
      ) : (
        <Menu.Item
          disabled={editDisabled}
          c="bright"
          color="stone"
          leftSection={<IconPencil size={14} />}
          onClick={onEdit}
        >
          編輯
        </Menu.Item>
      )}
      <Menu.Divider />
      <Menu.Item
        color="red"
        leftSection={<IconTrash size={14} />}
        onClick={onDelete}
      >
        刪除
      </Menu.Item>
    </Menu.Dropdown>
  )

  const badges = (accommodationBadge !== null || hasWaterSource) ? (
    <div className="flex items-center gap-1.5">
      {accommodationBadge !== null && (
        <NodeTypeBadge nodeType={accommodationBadge} />
      )}
      {hasWaterSource && (
        <NodeTypeBadge nodeType={TrailNodeType.WaterSource} />
      )}
    </div>
  ) : null

  const route = committedStopIds.length === 0 ? (
    <Text
      size="xs"
      c="stone.4"
    >
      —
    </Text>
  ) : (
    <RouteIndicator
      stopIds={committedStopIds}
      nodeMap={nodeMap}
    />
  )

  const cardRow = (
    <>
      {/* ─── MOBILE LAYOUT (hidden at md+) ─── */}
      <div className="@md/day-plan:hidden flex flex-col gap-3">
        {/* Header: [day stub + badges] ←→ [time + menu] */}
        <div className="flex items-center justify-between gap-3">
          {/* Left: day stub + badges */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col shrink-0 w-9">
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
                size="2xl"
                c="stone.9"
                fw={800}
                lh={1}
                className="tracking-[-0.04em]"
              >
                {dayLabel}
              </Text>
            </div>
            {mode !== 'edit' && badges}
          </div>

          {/* Right: time + menu */}
          <div className="flex items-center gap-2">
            {mode !== 'edit' && (
              <div className="flex flex-col items-end shrink-0 gap-1">
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
                    size="xs"
                    c="stone.5"
                    fw={500}
                    lh={1}
                  >
                    {formatTrailMinutes(rawMinutes)}
                  </Text>
                </div>
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
                    size="2xl"
                    c={paceTier.color}
                    fw={800}
                    lh={1}
                    className="tracking-[-0.02em]"
                  >
                    {formatTrailMinutes(weightedMinutes)}
                  </Text>
                </div>
              </div>
            )}
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
                  {menuDropdown}
                </Menu>
              </div>
            )}
          </div>
        </div>

        {/* Horizontal divider */}
        {mode !== 'edit' && <div className="h-px bg-(--mantine-color-stone-2)" />}

        {/* Route */}
        {mode !== 'edit' && (
          <div>{route}</div>
        )}
      </div>

      {/* ─── DESKTOP LAYOUT (hidden below md) ─── */}

      {/* Stub col */}
      <div className="hidden @md/day-plan:flex flex-col shrink-0 w-11">
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
        className="hidden @md/day-plan:block shrink-0 self-stretch"
      />

      {/* Content col — badges + route */}
      <div className={`hidden @md/day-plan:flex flex-col flex-1 min-w-0 gap-[10px] ${mode === 'edit' ? 'opacity-40' : ''}`}>
        {badges}
        {route}
      </div>

      {/* Time col */}
      <div className={`hidden @md/day-plan:flex flex-col items-end self-start shrink-0 gap-1.5 ${mode === 'edit' ? 'opacity-40' : ''}`}>
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

      {/* Dots menu */}
      {showOptions && (
        <div className="hidden @md/day-plan:block self-start">
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
            {menuDropdown}
          </Menu>
        </div>
      )}
    </>
  )

  if (mode === 'edit') {
    return (
      <div className={`${cardCls} flex flex-col`}>
        {/* Original header row — responsive */}
        <div className="flex flex-col gap-3 @md/day-plan:flex-row @md/day-plan:items-center @md/day-plan:gap-5">
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
          stopIds={formStopIds}
          rawMinutes={formRawMinutes}
          weightedMinutes={formWeightedMinutes}
          prevDayLastStopId={prevDayLastStopId}
          onStartingNodeChange={onStartingNodeChange ?? (() => {})}
          onNodeSelect={onNodeSelect ?? (() => {})}
          onUndo={onUndo ?? (() => {})}
          onCompleteRoute={onCompleteRoute ?? (() => {})}
          onRouteExtended={onRouteExtended}
        />
      </div>
    )
  }

  return (
    <div className={`${cardCls}`}>
      <div className="flex flex-col gap-3 @md/day-plan:flex-row @md/day-plan:items-center @md/day-plan:gap-5">
        {cardRow}
      </div>
    </div>
  )
}
