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
    <div className="flex items-center flex-wrap gap-1">
      {stopIds.map((id, i) => {
        const isHighlighted = highlightLast && i === stopIds.length - 1
        const bg = isHighlighted ? 'var(--color-sepia-9)' : chipBackground
        const minutes = showDuration ? adj?.get(id)?.get(stopIds[i + 1])?.minutes : undefined
        return (
          <div
            key={id}
            className="flex items-center gap-1"
          >
            <div
              className="flex items-center rounded py-[3px] px-2"
              style={{ background: bg }}
            >
              <span
                className={isHighlighted ? 'text-xs text-white' : 'text-xs text-(--mantine-color-stone-7)'}
                style={{ fontWeight }}
              >
                {nodeMap[id]?.name ?? id}
              </span>
            </div>
            {i < stopIds.length - 1 && (
              showDuration
                ? (
                  <div className="relative w-[60px] flex items-center">
                    <span className="absolute -top-[14px] left-0 right-0 text-center text-[9px] text-(--mantine-color-stone-4) font-normal">
                      {minutes != null ? formatTrailMinutes(minutes) : ''}
                    </span>
                    <div className="flex-1 h-px bg-(--mantine-color-stone-4)" />
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
                  <span className="text-xs text-(--mantine-color-stone-4)">→</span>
                )
            )}
          </div>
        )
      })}
    </div>
  )
}
