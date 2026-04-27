import type { CSSProperties } from 'react'
import type { TrailNode } from '@/model/hikingTrail'

interface Props {
  stopIds: string[];
  nodeMap: Record<string, TrailNode>;
  highlightLast?: boolean;
  chipBackground?: string;
  fontWeight?: CSSProperties['fontWeight'];
}

export function RouteIndicator({
  stopIds,
  nodeMap,
  highlightLast = false,
  chipBackground = 'var(--mantine-color-stone-1)',
  fontWeight,
}: Props) {
  return (
    <div
      className="flex items-center flex-wrap"
      style={{ gap: 4 }}
    >
      {stopIds.map((id, i) => {
        const isHighlighted = highlightLast && i === stopIds.length - 1
        const bg = isHighlighted ? 'var(--color-sepia-9)' : chipBackground
        return (
          <div
            key={id}
            className="flex items-center"
            style={{ gap: 4 }}
          >
            <div
              className="flex items-center rounded"
              style={{
                padding: '3px 8px',
                background: bg,
              }}
            >
              <span
                className={isHighlighted ? 'text-white' : ''}
                style={{
                  fontSize: 12,
                  fontWeight,
                  color: isHighlighted ? undefined : 'var(--mantine-color-stone-7)',
                }}
              >
                {nodeMap[id]?.name ?? id}
              </span>
            </div>
            {i < stopIds.length - 1 && (
              <span style={{
                fontSize: 12,
                color: 'var(--mantine-color-stone-4)',
              }}
              >→</span>
            )}
          </div>
        )
      })}
    </div>
  )
}
