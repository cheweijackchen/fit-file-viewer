import { IconCornerUpLeft, IconCornerUpRight } from '@tabler/icons-react'
import { CurrentNodeCard } from './CurrentNodeCard'
import { NodeCard } from './NodeCard'
import type { LayoutProps } from './NodeSelectionDesktopLayout'
import { SectionLabel } from './SectionLabel'

export function NodeSelectionMobileLayout({
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
              onClick={() => onNodeSelect(previousNodeId)}
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
