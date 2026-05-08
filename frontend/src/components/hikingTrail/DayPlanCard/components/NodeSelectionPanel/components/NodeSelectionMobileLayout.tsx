import { IconCornerUpLeft, IconCornerUpRight } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { CurrentNodeCard } from './CurrentNodeCard'
import { NodeCard } from './NodeCard'
import type { LayoutProps } from './NodeSelectionDesktopLayout'
import { SectionLabel } from './SectionLabel'
import { QuickJumpButton } from '../../QuickJumpButton'

export function NodeSelectionMobileLayout({
  nodeMap,
  currentNode,
  previousNode,
  previousNodeId,
  forwardIds,
  edgeTimeLabel,
  onNodeSelect,
  onQuickJump,
  enableRest,
  currentNodeRestMinutes,
  onCurrentNodeRestMinutesChange,
}: LayoutProps) {
  const t = useTranslations('hiking-trail-planner')
  const currentId = currentNode?.id ?? ''

  return (
    <div className="flex flex-col gap-2.5 w-full">
      {/* Current node — full width */}
      <CurrentNodeCard
        node={currentNode}
        enableRest={enableRest}
        restMinutes={currentNodeRestMinutes}
        onRestMinutesChange={onCurrentNodeRestMinutesChange}
      />
      {onQuickJump && <QuickJumpButton onClick={onQuickJump} />}

      {/* Two-col: back | forward */}
      <div className="flex gap-2.5 items-start">
        {/* Back col */}
        <div className="flex flex-col flex-1 gap-2 min-w-0">
          <SectionLabel
            muted
            icon={IconCornerUpLeft}
            label={t('planDetail.dayPlanCard.nodeSelection.back')}
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
            label={t('planDetail.dayPlanCard.nodeSelection.forward')}
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
            <span className="text-xs text-(--mantine-color-stone-4)">{t('planDetail.dayPlanCard.nodeSelection.noNodes')}</span>
          )}
        </div>
      </div>
    </div>
  )
}
