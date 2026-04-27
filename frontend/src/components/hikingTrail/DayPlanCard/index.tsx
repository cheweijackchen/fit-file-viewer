'use client'

import { ActionIcon, Menu, Text } from '@mantine/core'
import { IconDotsVertical, IconEraser, IconPencil, IconTrash } from '@tabler/icons-react'
import { useMemo } from 'react'
import { PACE_TIERS, TRAIL_NODE_TYPE_BADGE_STYLE } from '@/constants/hiking-trails/dayPlanCard'
import { TrailNodeType } from '@/constants/hiking-trails/hikingTrail'
import { formatTrailMinutes } from '@/lib/timeFormatter'
import { buildTrailAdjacencyList, calculatePathTime } from '@/lib/trailGraph'
import type { DayPlan, Trail } from '@/model/hikingTrail'

interface Props {
  dayPlan: DayPlan;
  dayIndex: number;
  trail: Trail;
  paceMultiplier: number;
  mode: 'view' | 'edit';
  onEdit?: () => void;
  onClearRoute?: () => void;
  onDelete?: () => void;
}

const ACCOMMODATION_TYPES = new Set<TrailNodeType>([TrailNodeType.Hut, TrailNodeType.Camp])

export function DayPlanCard({
  dayPlan,
  dayIndex,
  trail,
  paceMultiplier,
  mode,
  onEdit,
  onClearRoute,
  onDelete,
}: Props) {
  const adj = useMemo(() => buildTrailAdjacencyList(trail), [trail])

  const nodeMap = useMemo(
    () => Object.fromEntries(trail.nodes.map((n) => [n.id, n])),
    [trail],
  )

  const stopIds = dayPlan.stops.map((s) => s.nodeId)

  let rawMinutes = 0
  try {
    rawMinutes = calculatePathTime(adj, stopIds)
  } catch {
    // invalid path — show 0
  }

  const weightedMinutes = Math.round(rawMinutes * paceMultiplier)
  const paceTier = PACE_TIERS.find((t) => weightedMinutes / 60 < t.maxHours) ?? PACE_TIERS[PACE_TIERS.length - 1]!

  const lastStop = stopIds.length > 0 ? nodeMap[stopIds[stopIds.length - 1]!] : undefined
  const lastNodeType = lastStop?.nodeType
  const accommodationBadge =
    lastNodeType && ACCOMMODATION_TYPES.has(lastNodeType) ? lastNodeType : null

  const hasWaterSource = stopIds.some(
    (id) => nodeMap[id]?.nodeType === TrailNodeType.WaterSource,
  )

  const dayLabel = String(dayIndex).padStart(2, '0')

  return (
    <div
      className="flex items-center rounded-xl"
      style={{
        padding: '16px 20px',
        gap: 20,
        background: '#ffffff',
        border: '1px solid var(--mantine-color-stone-2)',
        boxShadow: '0 1px 6px -3px rgba(44,36,24,0.06)',
      }}
    >
      {/* Stub col — day number */}
      <div
        className="flex flex-col shrink-0"
        style={{
          width: 44,
          gap: -2 
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
        <div
          className="flex items-center flex-wrap"
          style={{ gap: 4 }}
        >
          {stopIds.length === 0 ? (
            <Text
              size="xs"
              style={{ color: 'var(--mantine-color-stone-4)' }}
            >
              —
            </Text>
          ) : (
            stopIds.map((id, i) => (
              <div
                key={id}
                className="flex items-center"
                style={{ gap: 4 }}
              >
                <div
                  className="flex items-center rounded"
                  style={{
                    padding: '3px 8px',
                    background: 'var(--mantine-color-stone-1)',
                  }}
                >
                  <Text
                    component="span"
                    style={{
                      fontSize: 12,
                      color: 'var(--mantine-color-stone-7)',
                    }}
                  >
                    {nodeMap[id]?.name ?? id}
                  </Text>
                </div>
                {i < stopIds.length - 1 && (
                  <Text
                    component="span"
                    style={{
                      fontSize: 12,
                      color: 'var(--mantine-color-stone-4)',
                    }}
                  >
                    →
                  </Text>
                )}
              </div>
            ))
          )}
        </div>
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

      {/* Dots menu — edit mode only, top-aligned */}
      {mode === 'edit' && (
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
    </div>
  )
}

interface NodeTypeBadgeProps {
  nodeType: TrailNodeType;
}

function NodeTypeBadge({ nodeType }: NodeTypeBadgeProps) {
  const style = TRAIL_NODE_TYPE_BADGE_STYLE[nodeType]

  return (
    <div
      className="flex items-center justify-center shrink-0"
      style={{
        width: 26,
        height: 26,
        borderRadius: 9999,
        background: style.bg,
      }}
    >
      <svg
        width={14}
        height={14}
        viewBox="0 0 24 24"
        fill="none"
        stroke={style.iconColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <LucideIconPath name={style.iconName} />
      </svg>
    </div>
  )
}

function LucideIconPath({ name }: { name: string; }) {
  switch (name) {
    case 'home':
      return (
        <>
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </>
      )
    case 'tent':
      return (
        <>
          <path d="M19 20 10 4" />
          <path d="m5 20 9-16" />
          <path d="M3 20h18" />
          <path d="m12 15-3 5" />
          <path d="m12 15 3 5" />
        </>
      )
    case 'droplet':
      return <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    case 'mountain':
      return (
        <>
          <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
          <path d="M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19" />
        </>
      )
    case 'git-branch-2':
      return (
        <>
          <circle
            cx="18"
            cy="18"
            r="3"
          />
          <circle
            cx="6"
            cy="6"
            r="3"
          />
          <path d="M6 21V9a9 9 0 0 0 9 9" />
        </>
      )
    case 'map-pin':
      return (
        <>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle
            cx="12"
            cy="10"
            r="3"
          />
        </>
      )
    default:
      return null
  }
}
