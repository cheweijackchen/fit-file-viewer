import { IconClockHour9 } from '@tabler/icons-react'
import type { CSSProperties } from 'react'
import { formatTrailMinutes } from '@/lib/timeFormatter'
import type { TrailAdjacencyList, TrailNode } from '@/model/hikingTrail'
import { RestPopover } from './RestPopover'

interface Props {
  stopIds: string[];
  nodeMap: Record<string, TrailNode>;
  highlightLast?: boolean;
  chipBackground?: string;
  fontWeight?: CSSProperties['fontWeight'];
  showDuration?: boolean;
  adj?: TrailAdjacencyList;
  // Rest time props
  editMode?: boolean;
  restMinutes?: Record<number, number>;
  onRestMinutesChange?: (stopIndex: number, minutes: number | undefined) => void;
}

export function RouteIndicator({
  stopIds,
  nodeMap,
  highlightLast = false,
  chipBackground = 'var(--mantine-color-stone-1)',
  fontWeight,
  showDuration = false,
  adj,
  editMode = false,
  restMinutes,
  onRestMinutesChange,
}: Props) {
  return (
    <div className="flex items-center flex-wrap gap-1">
      {stopIds.map((id, i) => {
        const isHighlighted = highlightLast && i === stopIds.length - 1
        const bg = isHighlighted ? 'var(--color-sepia-9)' : chipBackground
        const minutes = showDuration ? adj?.get(id)?.get(stopIds[i + 1])?.minutes : undefined
        const rest = restMinutes?.[i]

        const chip = (
          <div
            className="flex items-center rounded py-[3px] px-2 gap-1"
            style={{ background: bg }}
          >
            <span
              className={isHighlighted ? 'text-xs text-white' : 'text-xs text-(--mantine-color-stone-7)'}
              style={{ fontWeight }}
            >
              {nodeMap[id]?.name ?? id}
            </span>
            {rest !== undefined && rest > 0 && (
              <span className="flex items-center gap-0.5 text-[10px] text-(--mantine-color-stone-5)">
                <IconClockHour9 size={10} />
                {formatTrailMinutes(rest)}
              </span>
            )}
          </div>
        )

        return (
          <div
            key={i}
            className="flex items-center gap-1"
          >
            {editMode && onRestMinutesChange
              ? (
                <RestPopover
                  stopIndex={i}
                  nodeName={nodeMap[id]?.name ?? id}
                  value={rest}
                  onChange={onRestMinutesChange}
                >
                  {chip}
                </RestPopover>
              )
              : chip}
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
