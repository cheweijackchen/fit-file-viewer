import { TRAIL_NODE_TYPE_BADGE_STYLE } from '@/constants/hiking-trails/dayPlanCard'
import { type TrailNodeType } from '@/constants/hiking-trails/hikingTrail'

interface Props {
  nodeType: TrailNodeType;
}

export function NodeTypeBadge({ nodeType }: Props) {
  const style = TRAIL_NODE_TYPE_BADGE_STYLE[nodeType]
  const Icon = style.icon

  return (
    <div
      className="flex items-center justify-center shrink-0"
      style={{
        width: 26,
        height: 26,
        borderRadius: 9999,
        background: style.bg,
      }}
    >
      <Icon
        size={14}
        color={style.iconColor}
        stroke={2}
      />
    </div>
  )
}
