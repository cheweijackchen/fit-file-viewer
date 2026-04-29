import type { CSSProperties } from 'react'
import { formatTrailMinutes } from '@/lib/timeFormatter'
import type { TrailAdjacencyList, TrailNode } from '@/model/hikingTrail'

interface Props {
  stopIds: string[];
  nodeMap: Record<string, TrailNode>;
  highlightLast?: boolean;
  chipBackground?: string;
  fontWeight?: CSSProperties['fontWeight'];
  showDuration?: boolean;
  adj?: TrailAdjacencyList;
}

export function RouteIndicator({
  stopIds,
  nodeMap,
  highlightLast = false,
  chipBackground = 'var(--mantine-color-stone-1)',
  fontWeight,
  showDuration = false,
  adj,
}: Props) {
  return (
    <div
      className="flex items-center flex-wrap"
      style={{ gap: 4 }}
    >
      {stopIds.map((id, i) => {
        const isHighlighted = highlightLast && i === stopIds.length - 1
        const bg = isHighlighted ? 'var(--color-sepia-9)' : chipBackground
        const minutes = showDuration ? adj?.get(id)?.get(stopIds[i + 1])?.minutes : undefined
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
              showDuration
                ? (
                  <div style={{
                    position: 'relative',
                    width: 60,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  >
                    <span style={{
                      position: 'absolute',
                      top: -14,
                      left: 0,
                      right: 0,
                      textAlign: 'center',
                      fontSize: 9,
                      color: 'var(--mantine-color-stone-4)',
                      fontWeight: 'normal',
                    }}
                    >
                      {minutes != null ? formatTrailMinutes(minutes) : ''}
                    </span>
                    <div style={{
                      flex: 1,
                      height: 1,
                      backgroundColor: 'var(--mantine-color-stone-4)',
                    }}
                    />
                    <svg
                      width={6}
                      height={8}
                      viewBox="0 0 6 8"
                    >
                      <path
                        d="M0 0l6 4-6 4z"
                        fill="var(--mantine-color-stone-4)"
                      />
                    </svg>
                  </div>
                )
                : (
                  <span style={{
                    fontSize: 12,
                    color: 'var(--mantine-color-stone-4)',
                  }}
                  >→</span>
                )
            )}
          </div>
        )
      })}
    </div>
  )
}
