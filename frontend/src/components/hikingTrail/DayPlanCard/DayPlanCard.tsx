'use client'

import { ActionIcon, Divider, Menu, Text } from '@mantine/core'
import { IconDotsVertical, IconEraser, IconPencil, IconPencilOff, IconTrash } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import { PACE_TIERS } from '@/constants/hiking-trails/dayPlanCard'
import { TrailNodeType } from '@/constants/hiking-trails/hikingTrail'
import { formatTrailMinutes } from '@/lib/timeFormatter'
import { buildTrailAdjacencyList, calculatePathTime } from '@/lib/trailGraph'
import type { DayPlan, Trail } from '@/model/hikingTrail'
import { DayItineraryModal } from './components/DayItineraryModal'
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
  showDuration?: boolean;
  editDisabled?: boolean;
  enableRest?: boolean;
  onEdit?: () => void;
  onCancelEdit?: () => void;
  onClearRoute?: () => void;
  onDelete?: () => void;
  // Edit mode — in-progress planning state
  editStopIds?: string[];
  editRestMinutes?: Record<string, number>;
  prevDayLastStopId?: string;
  onStartingNodeChange?: (nodeId: string) => void;
  onNodeSelect?: (nodeId: string) => void;
  onUndo?: () => void;
  onCompleteRoute?: () => void;
  onRouteExtended?: (newStops: string[]) => void;
  onStartingTimeChange?: (time: string) => void;
  onRestMinutesChange?: (nodeId: string, minutes: number | undefined) => void;
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
  showDuration,
  editDisabled,
  enableRest,
  onEdit,
  onCancelEdit,
  onClearRoute,
  onDelete,
  editStopIds,
  editRestMinutes,
  prevDayLastStopId,
  onStartingNodeChange,
  onNodeSelect,
  onUndo,
  onCompleteRoute,
  onRouteExtended,
  onStartingTimeChange,
  onRestMinutesChange,
}: Props) {
  const t = useTranslations('hiking-trail-planner')
  const [itineraryModalOpen, setItineraryModalOpen] = useState(false)

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

  const totalRestMinutes = enableRest
    ? dayPlan.stops.reduce((sum, s) => sum + (s.restMinutes ?? 0), 0)
    : 0
  const youMinutes = weightedMinutes + totalRestMinutes

  let formRawMinutes = rawMinutes
  let formWeightedMinutes = weightedMinutes
  let formTotalRestMinutes = 0
  if (mode === 'edit') {
    try {
      formRawMinutes = calculatePathTime(adj, formStopIds)
    } catch {
      // invalid path — show 0
    }
    formWeightedMinutes = Math.round(formRawMinutes * paceMultiplier)
    if (enableRest && editRestMinutes) {
      formTotalRestMinutes = Object.values(editRestMinutes).reduce((sum, m) => sum + m, 0)
    }
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
            {t('planDetail.dayPlanCard.menu.cancelEdit')}
          </Menu.Item>
          <Menu.Item
            c="bright"
            color="stone"
            leftSection={<IconEraser size={14} />}
            onClick={onClearRoute}
          >
            {t('planDetail.dayPlanCard.menu.clearRoute')}
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
          {t('planDetail.dayPlanCard.menu.edit')}
        </Menu.Item>
      )}
      <Menu.Divider />
      <Menu.Item
        color="red"
        leftSection={<IconTrash size={14} />}
        onClick={onDelete}
      >
        {t('planDetail.dayPlanCard.menu.delete')}
      </Menu.Item>
    </Menu.Dropdown>
  )

  const showBadges = false
  const badges = showBadges && (accommodationBadge !== null || hasWaterSource) ? (
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
      showDuration={showDuration}
      adj={adj}
      restMinutes={enableRest
        ? Object.fromEntries(dayPlan.stops.filter(s => s.restMinutes).map(s => [s.nodeId, s.restMinutes!]))
        : undefined}
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
                    {t('planDetail.dayPlanCard.spec')}
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
                    {t('planDetail.dayPlanCard.you')}
                  </Text>
                  <Text
                    component="span"
                    size="2xl"
                    c={paceTier.color}
                    fw={800}
                    lh={1}
                    className="tracking-[-0.02em]"
                  >
                    {formatTrailMinutes(youMinutes)}
                  </Text>
                  {totalRestMinutes > 0 && (
                    <Text
                      component="span"
                      size="2xs"
                      c="stone.4"
                      lh={1}
                    >
                      {t('planDetail.dayPlanCard.includesRest', { minutes: totalRestMinutes })}
                    </Text>
                  )}
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
            {t('planDetail.dayPlanCard.spec')}
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
            {t('planDetail.dayPlanCard.you')}
          </Text>
          <Text
            component="span"
            size="3xl"
            c={paceTier.color}
            fw={800}
            lh={1}
            className="tracking-[-0.02em]"
          >
            {formatTrailMinutes(youMinutes)}
          </Text>
          {totalRestMinutes > 0 && (
            <Text
              component="span"
              size="2xs"
              c="stone.4"
              lh={1}
            >
              {t('planDetail.dayPlanCard.includesRest', { minutes: totalRestMinutes })}
            </Text>
          )}
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
          weightedMinutes={formWeightedMinutes + formTotalRestMinutes}
          enableRest={enableRest}
          editRestMinutes={editRestMinutes}
          prevDayLastStopId={prevDayLastStopId}
          startingTime={dayPlan.startingTime}
          onStartingNodeChange={onStartingNodeChange ?? (() => {})}
          onStartingTimeChange={onStartingTimeChange}
          onNodeSelect={onNodeSelect ?? (() => {})}
          onUndo={onUndo ?? (() => {})}
          onCompleteRoute={onCompleteRoute ?? (() => {})}
          onRouteExtended={onRouteExtended}
          onRestMinutesChange={onRestMinutesChange}
        />
      </div>
    )
  }

  return (
    <div
      className={`${cardCls}${!showOptions ? ' cursor-pointer' : ''}`}
      onClick={!showOptions ? () => setItineraryModalOpen(true) : undefined}
    >
      <div className="flex flex-col gap-3 @md/day-plan:flex-row @md/day-plan:items-center @md/day-plan:gap-5">
        {cardRow}
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <DayItineraryModal
          opened={itineraryModalOpen}
          dayPlan={dayPlan}
          trail={trail}
          paceMultiplier={paceMultiplier}
          dayIndex={dayIndex}
          adj={adj}
          nodeMap={nodeMap}
          onClose={() => setItineraryModalOpen(false)}
        />
      </div>
    </div>
  )
}
