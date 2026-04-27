import { TRAIL_NODE_TYPE_BADGE_STYLE } from '@/constants/hiking-trails/dayPlanCard'
import { type TrailNodeType } from '@/constants/hiking-trails/hikingTrail'

interface Props {
  nodeType: TrailNodeType;
}

export function NodeTypeBadge({ nodeType }: Props) {
  const style = TRAIL_NODE_TYPE_BADGE_STYLE[nodeType]

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
      <svg
        width={14}
        height={14}
        viewBox="0 0 24 24"
        fill="none"
        stroke={style.iconColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <LucideIconPath name={style.iconName} />
      </svg>
    </div>
  )
}

export function LucideIconPath({ name }: { name: string; }) {
  switch (name) {
    case 'home':
      return (
        <>
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </>
      )
    case 'tent':
      return (
        <>
          <path d="M19 20 10 4" />
          <path d="m5 20 9-16" />
          <path d="M3 20h18" />
          <path d="m12 15-3 5" />
          <path d="m12 15 3 5" />
        </>
      )
    case 'droplet':
      return <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    case 'mountain':
      return (
        <>
          <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
          <path d="M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19" />
        </>
      )
    case 'git-branch-2':
      return (
        <>
          <circle
            cx="18"
            cy="18"
            r="3"
          />
          <circle
            cx="6"
            cy="6"
            r="3"
          />
          <path d="M6 21V9a9 9 0 0 0 9 9" />
        </>
      )
    case 'map-pin':
      return (
        <>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle
            cx="12"
            cy="10"
            r="3"
          />
        </>
      )
    default:
      return null
  }
}
