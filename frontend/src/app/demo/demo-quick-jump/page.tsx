'use client'

import { Select, Stack, Text, Title } from '@mantine/core'
import { useMemo, useState } from 'react'
import { QuickJumpButton } from '@/components/hikingTrail/DayPlanCard/components/QuickJumpButton'
import { QuickJumpModal } from '@/components/hikingTrail/DayPlanCard/components/QuickJumpModal'
import { RouteIndicator } from '@/components/hikingTrail/DayPlanCard/components/RouteIndicator'
import { HIKING_TRAILS } from '@/constants/hikingTrails'
import { applyQuickJump, buildTrailAdjacencyList } from '@/lib/trailGraph'

const SECTION_LABEL_STYLE = {
  letterSpacing: '0.08em',
  color: 'var(--mantine-color-stone-5)',
}

export default function DemoQuickJumpPage() {
  const [selectedTrailId, setSelectedTrailId] = useState<string>(HIKING_TRAILS[0]!.id)
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null)
  const [route, setRoute] = useState<string[]>([])
  const [modalOpen, setModalOpen] = useState(false)

  const trail = useMemo(
    () => HIKING_TRAILS.find((t) => t.id === selectedTrailId) ?? HIKING_TRAILS[0]!,
    [selectedTrailId],
  )

  const adj = useMemo(() => buildTrailAdjacencyList(trail), [trail])

  const nodeMap = useMemo(
    () => Object.fromEntries(trail.nodes.map((n) => [n.id, n])),
    [trail],
  )

  const trailSelectData = HIKING_TRAILS.map((t) => ({
    value: t.id,
    label: t.name 
  }))
  const nodeSelectData = trail.nodes.map((n) => ({
    value: n.id,
    label: n.name 
  }))

  function handleTrailChange(trailId: string | null) {
    if (!trailId) {
      return
    }
    setSelectedTrailId(trailId)
    setCurrentNodeId(null)
    setRoute([])
  }

  function handleCurrentNodeChange(nodeId: string | null) {
    if (!nodeId) {
      return
    }
    setCurrentNodeId(nodeId)
    setRoute([nodeId])
  }

  function handleJump(targetId: string) {
    const newRoute = applyQuickJump(route, targetId, adj)
    if (newRoute) {
      setRoute(newRoute)
      setCurrentNodeId(targetId)
    }
    setModalOpen(false)
  }

  return (
    <Stack
      p="xl"
      gap="xl"
      maw={800}
    >
      <div>
        <Title order={2}>QuickJumpButton</Title>
        <Text
          c="dimmed"
          size="sm"
          mt={4}
        >
          Select a current position, then use Quick Jump to auto-fill the shortest path to any destination.
        </Text>
      </div>

      <Stack gap="sm">
        <Text
          size="xs"
          fw={700}
          tt="uppercase"
          style={SECTION_LABEL_STYLE}
        >
          Controls
        </Text>
        <Select
          label="Trail"
          data={trailSelectData}
          value={selectedTrailId}
          style={{ maxWidth: 360 }}
          onChange={handleTrailChange}
        />
        <Select
          searchable
          label="Current Node"
          data={nodeSelectData}
          value={currentNodeId}
          placeholder="Set current position"
          style={{ maxWidth: 360 }}
          onChange={handleCurrentNodeChange}
        />
      </Stack>

      {route.length > 0 && (
        <Stack gap="sm">
          <Text
            size="xs"
            fw={700}
            tt="uppercase"
            style={SECTION_LABEL_STYLE}
          >
            Route
          </Text>
          <RouteIndicator
            showDuration
            highlightLast
            stopIds={route}
            nodeMap={nodeMap}
            adj={adj}
          />
        </Stack>
      )}

      <QuickJumpButton
        disabled={!currentNodeId}
        onClick={() => setModalOpen(true)}
      />

      <QuickJumpModal
        opened={modalOpen}
        nodes={trail.nodes}
        currentNodeId={currentNodeId ?? undefined}
        onClose={() => setModalOpen(false)}
        onConfirm={handleJump}
      />
    </Stack>
  )
}
