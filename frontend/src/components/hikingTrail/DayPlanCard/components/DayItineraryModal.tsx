'use client'

import { Modal, Text, Timeline } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconClockHour9 } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { TrailNodeType } from '@/constants/hiking-trails/hikingTrail'
import { calcDepartureTime, formatTrailMinutes } from '@/lib/timeFormatter'
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
      runningMinutes += stops[i]!.restMinutes ?? 0
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
          lineWidth={4}
          mx="lg"
        >
          {stops.map((stop, i) => {
            const node = nodeMap[stop.nodeId]
            const departureTime = calcDepartureTime(dayPlan.startingTime, accumulatedMinutes[i]!)
            const edgeToNext =
              i < stops.length - 1
                ? getEdge(adj, stop.nodeId, stops[i + 1]!.nodeId)
                : undefined
            const travelToNext = edgeToNext
              ? t('planDetail.dayItinerary.travelTime', {
                adjustedTime: formatTrailMinutes(Math.round(edgeToNext.minutes * paceMultiplier)),
                originalTime: formatTrailMinutes(edgeToNext.minutes),
                paceMultiplier,
              })
              : null
            const showBadge = node?.nodeType !== undefined && BADGE_TYPES.has(node.nodeType)

            return (
              <Timeline.Item
                key={stop.nodeId}
                mt="md"
                title={
                  <Text
                    size="sm"
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
                {(stop.restMinutes ?? 0) > 0 && (
                  <div className="flex items-center gap-1 mt-1">
                    <IconClockHour9
                      size={12}
                      color="var(--mantine-color-blue-5)"
                    />
                    <Text
                      size="xs"
                      c="blue.5"
                    >{formatTrailMinutes(stop.restMinutes!)}</Text>
                  </div>
                )}
                {travelToNext !== null && (
                  <Text
                    size="xs"
                    c="stone.6"
                    mt="sm"
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
