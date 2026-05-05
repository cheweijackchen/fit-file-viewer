'use client'

import { Modal, Text, Timeline } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useTranslations } from 'next-intl'
import { TrailNodeType } from '@/constants/hiking-trails/hikingTrail'
import { formatTrailMinutes } from '@/lib/timeFormatter'
import { getEdge } from '@/lib/trailGraph'
import type { DayPlan, Trail, TrailAdjacencyList, TrailNode } from '@/model/hikingTrail'
import { NodeTypeBadge } from './NodeTypeBadge'

interface Props {
  opened: boolean;
  onClose: () => void;
  dayPlan: DayPlan;
  trail: Trail;
  paceMultiplier: number;
  dayIndex: number;
  adj: TrailAdjacencyList;
  nodeMap: Record<string, TrailNode>;
}

const BADGE_TYPES = new Set<TrailNodeType>([
  TrailNodeType.Camp,
  TrailNodeType.Hut,
  TrailNodeType.WaterSource,
  TrailNodeType.Peak,
])

function calcDepartureTime(startingTime: string | undefined, accumulatedMinutes: number): string {
  if (!startingTime) {
    return '—'
  }
  const parts = startingTime.split(':')
  const h = Number(parts[0])
  const m = Number(parts[1])
  const total = h * 60 + m + accumulatedMinutes
  return `${String(Math.floor(total / 60) % 24).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`
}

export function DayItineraryModal({
  opened,
  onClose,
  dayPlan,
  paceMultiplier,
  dayIndex,
  adj,
  nodeMap,
}: Props) {
  const t = useTranslations('hiking-trail-planner')
  const isMobile = useMediaQuery('(max-width: 768px)')

  const stops = dayPlan.stops

  // Pre-compute cumulative weighted minutes at each stop
  const accumulatedMinutes: number[] = []
  let runningMinutes = 0
  for (let i = 0; i < stops.length; i++) {
    accumulatedMinutes.push(runningMinutes)
    if (i < stops.length - 1) {
      const edge = getEdge(adj, stops[i]!.nodeId, stops[i + 1]!.nodeId)
      runningMinutes += Math.round((edge?.minutes ?? 0) * paceMultiplier)
    }
  }

  return (
    <Modal
      centered
      opened={opened}
      fullScreen={isMobile ?? false}
      title={
        <Text
          fw={700}
          size="md"
        >
          {t('planDetail.dayItinerary.title', { day: dayIndex })}
        </Text>
      }
      onClose={onClose}
    >
      {stops.length === 0 ? (
        <Text
          size="sm"
          c="stone.4"
        >—</Text>
      ) : (
        <Timeline
          active={stops.length - 1}
          bulletSize={16}
          lineWidth={2}
        >
          {stops.map((stop, i) => {
            const node = nodeMap[stop.nodeId]
            const departureTime = calcDepartureTime(dayPlan.startingTime, accumulatedMinutes[i]!)
            const edgeToNext =
              i < stops.length - 1
                ? getEdge(adj, stop.nodeId, stops[i + 1]!.nodeId)
                : undefined
            const travelToNext = edgeToNext
              ? formatTrailMinutes(Math.round(edgeToNext.minutes * paceMultiplier))
              : null
            const showBadge = node?.nodeType !== undefined && BADGE_TYPES.has(node.nodeType)

            return (
              <Timeline.Item
                key={stop.nodeId}
                title={
                  <Text
                    size="xs"
                    c="stone.5"
                    fw={500}
                  >
                    {departureTime}
                  </Text>
                }
              >
                <div className="flex items-center gap-1.5">
                  <Text
                    fw={700}
                    size="sm"
                  >{node?.name ?? stop.nodeId}</Text>
                  {showBadge && node?.nodeType !== undefined && (
                    <NodeTypeBadge nodeType={node.nodeType} />
                  )}
                </div>
                {travelToNext !== null && (
                  <Text
                    size="xs"
                    c="stone.5"
                    mt={2}
                  >{travelToNext}</Text>
                )}
              </Timeline.Item>
            )
          })}
        </Timeline>
      )}
    </Modal>
  )
}
