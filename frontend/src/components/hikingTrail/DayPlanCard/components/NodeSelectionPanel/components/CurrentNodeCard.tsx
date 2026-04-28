import { TRAIL_NODE_TYPE_BADGE_STYLE } from '@/constants/hiking-trails/dayPlanCard'
import { TrailNodeType } from '@/constants/hiking-trails/hikingTrail'
import type { TrailNode } from '@/model/hikingTrail'

interface Props {
  node: TrailNode | undefined;
}

export function CurrentNodeCard({ node }: Props) {
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
