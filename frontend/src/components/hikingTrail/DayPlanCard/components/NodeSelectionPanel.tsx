'use client'

import { useMediaQuery } from '@mantine/hooks'
import { IconArrowRight, IconArrowsHorizontal, IconCornerUpLeft, IconCornerUpRight } from '@tabler/icons-react'
import clsx from 'clsx'
import type React from 'react'
import { TRAIL_NODE_TYPE_BADGE_STYLE } from '@/constants/hiking-trails/dayPlanCard'
import { TrailNodeType } from '@/constants/hiking-trails/hikingTrail'
import { formatTrailMinutes } from '@/lib/timeFormatter'
import { getEdge, getNeighbors } from '@/lib/trailGraph'
import type { TrailAdjacencyList, TrailNode } from '@/model/hikingTrail'

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

interface LayoutProps {
  adj: TrailAdjacencyList;
  nodeMap: Record<string, TrailNode>;
  currentNode: TrailNode | undefined;
  previousNode: TrailNode | undefined;
  previousNodeId: string | undefined;
  forwardIds: string[];
  edgeTimeLabel: (from: string, to: string) => string;
  onNodeSelect: (nodeId: string) => void;
}

function CurrentNodeCard({ node }: { node: TrailNode | undefined; }) {
  const nodeType = node?.nodeType ?? TrailNodeType.Other
  const badgeStyle = TRAIL_NODE_TYPE_BADGE_STYLE[nodeType]

  return (
    <div className="flex flex-col relative overflow-hidden bg-(--color-sepia-9) rounded-[14px] p-4 gap-1.5 min-w-0 flex-1">
      {/* Deco icon — node-type icon, large, faded */}
      <div className="absolute right-3 top-2">
        <badgeStyle.icon
          size={88}
          color="rgba(255,255,255,0.12)"
          stroke={2}
        />
      </div>

      <span className="text-[10px] font-bold tracking-[0.08em] text-(--mantine-color-stone-5)">
        CURRENT NODE
      </span>
      <span className="text-base font-bold text-white leading-[1.2]">
        {node?.name ?? '—'}
      </span>
      <div className="inline-flex self-start bg-(--mantine-color-stone-7) rounded-full py-1 px-2.5">
        <span className="text-[11px] font-semibold text-white">
          {nodeType}
        </span>
      </div>
    </div>
  )
}

interface NodeCardProps {
  node: TrailNode | undefined;
  timeLabel: string;
  variant: 'back' | 'forward';
  onClick?: () => void;
}

function NodeCard({ node, timeLabel, variant, onClick }: NodeCardProps) {
  const isBack = variant === 'back'

  return (
    <button
      type="button"
      disabled={isBack && !onClick}
      className={clsx(
        'flex flex-col text-left w-full rounded-[12px] p-3.5 gap-1',
        isBack
          ? 'bg-(--mantine-color-stone-2) border-none opacity-80 cursor-default'
          : 'bg-(--mantine-color-stone-1) border-[1.5px] border-(--mantine-color-stone-7) cursor-pointer',
      )}
      onClick={onClick}
    >
      <span className={clsx('text-[13px] font-bold', isBack ? 'text-(--mantine-color-stone-7)' : 'text-(--mantine-color-stone-9)')}>
        {node?.name ?? '—'}
      </span>
      <span className="text-[11px] text-(--mantine-color-stone-6)">
        {node?.nodeType ?? TrailNodeType.Other} · {timeLabel}
      </span>
    </button>
  )
}

function DesktopLayout({
  nodeMap,
  currentNode,
  previousNode,
  previousNodeId,
  forwardIds,
  edgeTimeLabel,
  onNodeSelect,
}: LayoutProps) {
  const currentId = currentNode?.id ?? ''

  return (
    <div className="flex items-start gap-2 w-full">
      {/* Back col */}
      <div className="flex flex-1 min-w-0">
        {previousNode && previousNodeId ? (
          <NodeCard
            node={previousNode}
            timeLabel={edgeTimeLabel(previousNodeId, currentId)}
            variant="back"
          />
        ) : (
          <div className="flex-1" />
        )}
      </div>

      {/* move-horizontal icon */}
      <div className="flex items-center justify-center shrink-0 pt-4.5">
        <IconArrowsHorizontal
          size={16}
          color="var(--mantine-color-stone-5)"
          stroke={2}
        />
      </div>

      {/* Current node */}
      <div className="flex flex-1 min-w-0">
        <CurrentNodeCard node={currentNode} />
      </div>

      {/* arrow-right icon */}
      <div className="flex items-center justify-center shrink-0 pt-4.5">
        <IconArrowRight
          size={16}
          color="var(--mantine-color-stone-7)"
          stroke={2}
        />
      </div>

      {/* Forward col */}
      <div className="flex flex-col flex-1 gap-2 min-w-0">
        {forwardIds.length > 0 ? (
          forwardIds.map((id) => (
            <NodeCard
              key={id}
              node={nodeMap[id]}
              timeLabel={edgeTimeLabel(currentId, id)}
              variant="forward"
              onClick={() => onNodeSelect(id)}
            />
          ))
        ) : (
          <span className="text-xs text-(--mantine-color-stone-4) pt-3.5">
            無可繼續的節點
          </span>
        )}
      </div>
    </div>
  )
}

function MobileLayout({
  nodeMap,
  currentNode,
  previousNode,
  previousNodeId,
  forwardIds,
  edgeTimeLabel,
  onNodeSelect,
}: LayoutProps) {
  const currentId = currentNode?.id ?? ''

  return (
    <div className="flex flex-col gap-2.5 w-full">
      {/* Current node — full width */}
      <CurrentNodeCard node={currentNode} />

      {/* Two-col: back | forward */}
      <div className="flex gap-2.5 items-start">
        {/* Back col */}
        <div className="flex flex-col flex-1 gap-2 min-w-0">
          <SectionLabel
            muted
            icon={IconCornerUpLeft}
            label="往回走"
          />
          {previousNode && previousNodeId ? (
            <NodeCard
              node={previousNode}
              timeLabel={edgeTimeLabel(previousNodeId, currentId)}
              variant="back"
            />
          ) : (
            <span className="text-xs text-(--mantine-color-stone-4)">—</span>
          )}
        </div>

        {/* Forward col */}
        <div className="flex flex-col flex-1 gap-2 min-w-0">
          <SectionLabel
            icon={IconCornerUpRight}
            label="繼續走"
          />
          {forwardIds.length > 0 ? (
            forwardIds.map((id) => (
              <NodeCard
                key={id}
                node={nodeMap[id]}
                timeLabel={edgeTimeLabel(currentId, id)}
                variant="forward"
                onClick={() => onNodeSelect(id)}
              />
            ))
          ) : (
            <span className="text-xs text-(--mantine-color-stone-4)">無可繼續的節點</span>
          )}
        </div>
      </div>
    </div>
  )
}

function SectionLabel({ icon: Icon, label, muted }: { icon: React.ComponentType<{ size?: number; color?: string; stroke?: number; }>; label: string; muted?: boolean; }) {
  const color = muted ? 'var(--mantine-color-stone-4)' : 'var(--mantine-color-stone-7)'

  return (
    <div className="flex items-center gap-1">
      <Icon
        size={12}
        color={color}
        stroke={2}
      />
      <span className={clsx('text-[11px] font-semibold tracking-[0.05em]', muted ? 'text-(--mantine-color-stone-4)' : 'text-(--mantine-color-stone-7)')}>
        {label}
      </span>
    </div>
  )
}
