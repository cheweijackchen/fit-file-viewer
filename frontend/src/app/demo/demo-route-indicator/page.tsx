'use client'

import { Stack, Text, Title } from '@mantine/core'
import { useMemo } from 'react'
import { RouteIndicator } from '@/components/hikingTrail/DayPlanCard/components/RouteIndicator'
import { southSecondSection } from '@/constants/hiking-trails/southSecondSection'
import { buildTrailAdjacencyList } from '@/lib/trailGraph'

const FOUR_STOPS = [
  'global_dongpu-spring',
  'global_yunlong-fall',
  'global_lele-hut',
  'global_guangao-station',
]

const TWO_STOPS = [
  'global_dongpu-spring',
  'global_yunlong-fall',
]

const ONE_STOP = [
  'global_dongpu-spring',
]

export default function DemoRouteIndicatorPage() {
  const nodeMap = useMemo(
    () => Object.fromEntries(southSecondSection.nodes.map((n) => [n.id, n])),
    [],
  )

  const adj = useMemo(() => buildTrailAdjacencyList(southSecondSection), [])

  return (
    <Stack
      p="xl"
      gap="xl"
      maw={800}
    >
      <Title order={2}>RouteIndicator</Title>

      <Stack gap="sm">
        <Text
          size="sm"
          fw={600}
          c="dimmed"
        >Basic (no duration)</Text>
        <RouteIndicator
          stopIds={FOUR_STOPS}
          nodeMap={nodeMap}
        />
      </Stack>

      <Stack gap="sm">
        <Text
          size="sm"
          fw={600}
          c="dimmed"
        >Basic + highlightLast</Text>
        <RouteIndicator
          highlightLast
          stopIds={FOUR_STOPS}
          nodeMap={nodeMap}
        />
      </Stack>

      <Stack gap="sm">
        <Text
          size="sm"
          fw={600}
          c="dimmed"
        >With duration</Text>
        <RouteIndicator
          showDuration
          stopIds={FOUR_STOPS}
          nodeMap={nodeMap}
          adj={adj}
        />
      </Stack>

      <Stack gap="sm">
        <Text
          size="sm"
          fw={600}
          c="dimmed"
        >With duration + highlightLast</Text>
        <RouteIndicator
          showDuration
          highlightLast
          stopIds={FOUR_STOPS}
          nodeMap={nodeMap}
          adj={adj}
        />
      </Stack>

      <Stack gap="sm">
        <Text
          size="sm"
          fw={600}
          c="dimmed"
        >With duration, no adj (arrow only)</Text>
        <RouteIndicator
          showDuration
          stopIds={FOUR_STOPS}
          nodeMap={nodeMap}
        />
      </Stack>

      <Stack gap="sm">
        <Text
          size="sm"
          fw={600}
          c="dimmed"
        >Two stops with duration</Text>
        <RouteIndicator
          showDuration
          stopIds={TWO_STOPS}
          nodeMap={nodeMap}
          adj={adj}
        />
      </Stack>

      <Stack gap="sm">
        <Text
          size="sm"
          fw={600}
          c="dimmed"
        >Single stop</Text>
        <RouteIndicator
          showDuration
          stopIds={ONE_STOP}
          nodeMap={nodeMap}
          adj={adj}
        />
      </Stack>
    </Stack>
  )
}
