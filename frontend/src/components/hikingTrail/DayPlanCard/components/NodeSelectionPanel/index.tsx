'use client'

import { useMediaQuery } from '@mantine/hooks'
import { formatTrailMinutes } from '@/lib/timeFormatter'
import { getEdge, getNeighbors } from '@/lib/trailGraph'
import type { TrailAdjacencyList, TrailNode } from '@/model/hikingTrail'
import { DesktopLayout } from './components/DesktopLayout'
import { MobileLayout } from './components/MobileLayout'

interface Props {
  adj: TrailAdjacencyList;
  nodeMap: Record<string, TrailNode>;
  stopIds: string[];
  onNodeSelect: (nodeId: string) => void;
}

export function NodeSelectionPanel({ adj, nodeMap, stopIds, onNodeSelect }: Props) {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const currentNodeId = stopIds[stopIds.length - 1]!
  const previousNodeId = stopIds.length >= 2 ? stopIds[stopIds.length - 2] : undefined
  const forwardIds = getNeighbors(adj, currentNodeId).filter((id) => !stopIds.includes(id))

  const currentNode = nodeMap[currentNodeId]
  const previousNode = previousNodeId ? nodeMap[previousNodeId] : undefined

  function edgeTimeLabel(fromId: string, toId: string): string {
    const forward = getEdge(adj, fromId, toId)
    const backward = getEdge(adj, toId, fromId)
    const minutes = forward?.minutes ?? backward?.minutes
    return minutes !== undefined ? formatTrailMinutes(minutes) : '—'
  }

  if (isMobile) {
    return (
      <MobileLayout
        adj={adj}
        nodeMap={nodeMap}
        currentNode={currentNode}
        previousNode={previousNode}
        previousNodeId={previousNodeId}
        forwardIds={forwardIds}
        edgeTimeLabel={edgeTimeLabel}
        onNodeSelect={onNodeSelect}
      />
    )
  }

  return (
    <DesktopLayout
      adj={adj}
      nodeMap={nodeMap}
      currentNode={currentNode}
      previousNode={previousNode}
      previousNodeId={previousNodeId}
      forwardIds={forwardIds}
      edgeTimeLabel={edgeTimeLabel}
      onNodeSelect={onNodeSelect}
    />
  )
}
