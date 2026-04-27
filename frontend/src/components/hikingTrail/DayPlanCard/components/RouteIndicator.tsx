import type { TrailNode } from '@/model/hikingTrail'

interface Props {
  stopIds: string[];
  nodeMap: Record<string, TrailNode>;
  highlightLast?: boolean;
}

export function RouteIndicator({ stopIds, nodeMap, highlightLast = false }: Props) {
  return (
    <div
      className="flex items-center flex-wrap"
      style={{ gap: 4 }}
    >
      {stopIds.map((id, i) => {
        const isHighlighted = highlightLast && i === stopIds.length - 1
        return (
          <div
            key={id}
            className="flex items-center"
            style={{ gap: 4 }}
          >
            <div
              style={{
                padding: '3px 8px',
                borderRadius: 4,
                background: isHighlighted ? 'var(--color-sepia-9)' : 'var(--mantine-color-stone-2)',
              }}
            >
              <span
                className={isHighlighted ? 'text-white' : ''}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: isHighlighted ? undefined : 'var(--mantine-color-stone-7)',
                }}
              >
                {nodeMap[id]?.name ?? id}
              </span>
            </div>
            {i < stopIds.length - 1 && (
              <span style={{
                fontSize: 11,
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
