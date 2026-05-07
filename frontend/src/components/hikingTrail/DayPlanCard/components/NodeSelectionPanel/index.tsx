'use client'

import { useMediaQuery } from '@mantine/hooks'
import { formatTrailMinutes } from '@/lib/timeFormatter'
import { getEdge, getNeighbors } from '@/lib/trailGraph'
import type { TrailAdjacencyList, TrailNode } from '@/model/hikingTrail'
import { NodeSelectionDesktopLayout } from './components/NodeSelectionDesktopLayout'
import { NodeSelectionMobileLayout } from './components/NodeSelectionMobileLayout'

interface Props {
  adj: TrailAdjacencyList;
  nodeMap: Record<string, TrailNode>;
  stopIds: string[];
  onNodeSelect: (nodeId: string) => void;
  onQuickJump?: () => void;
  enableRest?: boolean;
  currentNodeRestMinutes?: number;
  onCurrentNodeRestMinutesChange?: (minutes: number | undefined) => void;
}

export function NodeSelectionPanel({ adj, nodeMap, stopIds, onNodeSelect, onQuickJump, enableRest, currentNodeRestMinutes, onCurrentNodeRestMinutesChange }: Props) {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const currentNodeId = stopIds[stopIds.length - 1]!
  const previousNodeId = stopIds.length >= 2 ? stopIds[stopIds.length - 2] : undefined
  const forwardIds = getNeighbors(adj, currentNodeId).filter((id) => id !== previousNodeId)

  const currentNode = nodeMap[currentNodeId]
  const previousNode = previousNodeId ? nodeMap[previousNodeId] : undefined

  function edgeTimeLabel(fromId: string, toId: string): string {
    const forward = getEdge(adj, fromId, toId)
    const backward = getEdge(adj, toId, fromId)
    const minutes = forward?.minutes ?? backward?.minutes
    return minutes !== undefined ? formatTrailMinutes(minutes) : '—'
  }

  const restProps = {
    enableRest,
    currentNodeRestMinutes,
    onCurrentNodeRestMinutesChange,
  }

  if (isMobile) {
    return (
      <NodeSelectionMobileLayout
        adj={adj}
        nodeMap={nodeMap}
        currentNode={currentNode}
        previousNode={previousNode}
        previousNodeId={previousNodeId}
        forwardIds={forwardIds}
        edgeTimeLabel={edgeTimeLabel}
        onNodeSelect={onNodeSelect}
        onQuickJump={onQuickJump}
        {...restProps}
      />
    )
  }

  return (
    <NodeSelectionDesktopLayout
      adj={adj}
      nodeMap={nodeMap}
      currentNode={currentNode}
      previousNode={previousNode}
      previousNodeId={previousNodeId}
      forwardIds={forwardIds}
      edgeTimeLabel={edgeTimeLabel}
      onNodeSelect={onNodeSelect}
      onQuickJump={onQuickJump}
      {...restProps}
    />
  )
}
