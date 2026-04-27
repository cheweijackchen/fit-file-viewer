'use client'

import { useMediaQuery } from '@mantine/hooks'
import { IconArrowRight, IconArrowsHorizontal, IconCornerUpLeft, IconCornerUpRight } from '@tabler/icons-react'
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
    <div
      className="flex flex-col relative overflow-hidden"
      style={{
        background: 'var(--color-sepia-9)',
        borderRadius: 14,
        padding: 16,
        gap: 6,
        minWidth: 0,
        flex: 1,
      }}
    >
      {/* Deco icon — node-type icon, large, faded */}
      <div
        className="absolute"
        style={{
          right: 12,
          top: 8,
          opacity: 1
        }}
      >
        <badgeStyle.icon
          size={88}
          color="rgba(255,255,255,0.12)"
          stroke={2}
        />
      </div>

      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: 'var(--mantine-color-stone-5)',
        }}
      >
        CURRENT NODE
      </span>
      <span
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: '#ffffff',
          lineHeight: 1.2,
        }}
      >
        {node?.name ?? '—'}
      </span>
      <div
        style={{
          display: 'inline-flex',
          alignSelf: 'flex-start',
          background: 'var(--mantine-color-stone-7)',
          borderRadius: 9999,
          padding: '4px 10px',
        }}
      >
        <span style={{
          fontSize: 11,
          fontWeight: 600,
          color: '#ffffff' 
        }}
        >
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
      className="flex flex-col text-left w-full"
      style={{
        background: isBack ? 'var(--mantine-color-stone-2)' : 'var(--mantine-color-stone-1)',
        border: isBack ? 'none' : '1.5px solid var(--mantine-color-stone-7)',
        opacity: isBack ? 0.8 : 1,
        borderRadius: 12,
        padding: 14,
        gap: 4,
        cursor: isBack ? 'default' : 'pointer',
      }}
      onClick={onClick}
    >
      <span
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: isBack ? 'var(--mantine-color-stone-7)' : 'var(--mantine-color-stone-9)',
        }}
      >
        {node?.name ?? '—'}
      </span>
      <span style={{
        fontSize: 11,
        color: 'var(--mantine-color-stone-6)' 
      }}
      >
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
    <div
      className="flex items-start"
      style={{
        gap: 8,
        width: '100%' 
      }}
    >
      {/* Back col */}
      <div
        className="flex"
        style={{
          flex: 1,
          minWidth: 0 
        }}
      >
        {previousNode && previousNodeId ? (
          <NodeCard
            node={previousNode}
            timeLabel={edgeTimeLabel(previousNodeId, currentId)}
            variant="back"
          />
        ) : (
          <div style={{ flex: 1 }} />
        )}
      </div>

      {/* move-horizontal icon */}
      <div
        className="flex items-center justify-center shrink-0"
        style={{ paddingTop: 18 }}
      >
        <IconArrowsHorizontal
          size={16}
          color="var(--mantine-color-stone-5)"
          stroke={2}
        />
      </div>

      {/* Current node */}
      <div
        className="flex"
        style={{
          flex: 1,
          minWidth: 0 
        }}
      >
        <CurrentNodeCard node={currentNode} />
      </div>

      {/* arrow-right icon */}
      <div
        className="flex items-center justify-center shrink-0"
        style={{ paddingTop: 18 }}
      >
        <IconArrowRight
          size={16}
          color="var(--mantine-color-stone-7)"
          stroke={2}
        />
      </div>

      {/* Forward col */}
      <div
        className="flex flex-col"
        style={{
          flex: 1,
          gap: 8,
          minWidth: 0 
        }}
      >
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
          <span style={{
            fontSize: 12,
            color: 'var(--mantine-color-stone-4)',
            paddingTop: 14 
          }}
          >
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
    <div
      className="flex flex-col"
      style={{
        gap: 10,
        width: '100%' 
      }}
    >
      {/* Current node — full width */}
      <CurrentNodeCard node={currentNode} />

      {/* Two-col: back | forward */}
      <div
        className="flex"
        style={{
          gap: 10,
          alignItems: 'flex-start' 
        }}
      >
        {/* Back col */}
        <div
          className="flex flex-col"
          style={{
            flex: 1,
            gap: 8,
            minWidth: 0 
          }}
        >
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
            <span style={{
              fontSize: 12,
              color: 'var(--mantine-color-stone-4)' 
            }}
            >—</span>
          )}
        </div>

        {/* Forward col */}
        <div
          className="flex flex-col"
          style={{
            flex: 1,
            gap: 8,
            minWidth: 0 
          }}
        >
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
            <span style={{
              fontSize: 12,
              color: 'var(--mantine-color-stone-4)' 
            }}
            >無可繼續的節點</span>
          )}
        </div>
      </div>
    </div>
  )
}

function SectionLabel({ icon: Icon, label, muted }: { icon: React.ComponentType<{ size?: number; color?: string; stroke?: number; }>; label: string; muted?: boolean; }) {
  const color = muted ? 'var(--mantine-color-stone-4)' : 'var(--mantine-color-stone-7)'

  return (
    <div
      className="flex items-center"
      style={{ gap: 4 }}
    >
      <Icon
        size={12}
        color={color}
        stroke={2}
      />
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.05em',
          color,
        }}
      >
        {label}
      </span>
    </div>
  )
}
