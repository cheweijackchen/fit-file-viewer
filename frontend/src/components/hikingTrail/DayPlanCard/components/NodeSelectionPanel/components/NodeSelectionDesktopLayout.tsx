import { IconArrowRight, IconArrowsHorizontal } from '@tabler/icons-react'
import type { TrailAdjacencyList, TrailNode } from '@/model/hikingTrail'
import { CurrentNodeCard } from './CurrentNodeCard'
import { NodeCard } from './NodeCard'

export interface LayoutProps {
  adj: TrailAdjacencyList;
  nodeMap: Record<string, TrailNode>;
  currentNode: TrailNode | undefined;
  previousNode: TrailNode | undefined;
  previousNodeId: string | undefined;
  forwardIds: string[];
  edgeTimeLabel: (from: string, to: string) => string;
  onNodeSelect: (nodeId: string) => void;
}

export function NodeSelectionDesktopLayout({
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
