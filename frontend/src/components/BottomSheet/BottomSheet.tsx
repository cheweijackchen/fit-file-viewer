'use client'

import { useViewportSize } from '@mantine/hooks'
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'
import { useMemo } from 'react'
import styles from './BottomSheet.module.scss'
import { useDragResize } from './useDragResize'

const DEFAULT_HEIGHT = 320
const MIN_HEIGHT = 120
const MAX_HEIGHT_RATIO = 0.85

interface Props {
  defaultHeight?: number;
  minHeight?: number;
  maxHeightRatio?: number;
  children: React.ReactNode;
}

export function BottomSheet({
  defaultHeight = DEFAULT_HEIGHT,
  minHeight = MIN_HEIGHT,
  maxHeightRatio = MAX_HEIGHT_RATIO,
  children,
}: Props) {
  const { height: viewportHeight } = useViewportSize()
  const maxHeight = useMemo(
    () => viewportHeight * maxHeightRatio || defaultHeight,
    [viewportHeight, maxHeightRatio, defaultHeight],
  )

  const { height, isDragging, isCollapsed, toggleCollapse, handleProps } = useDragResize({
    defaultHeight,
    minHeight,
    maxHeight,
  })

  const CollapseIcon = isCollapsed ? IconChevronUp : IconChevronDown

  return (
    <div
      className={`${styles.sheet} fixed bottom-0 left-0 right-0 z-100 flex flex-col overflow-visible rounded-t-2xl bg-(--mantine-color-body) shadow-[0_-4px_20px_rgba(0,0,0,0.1)]`}
      style={{ height }}
      data-dragging={isDragging}
    >
      {/* Toggle Button */}
      <button
        className="absolute -top-7 left-1/2 flex h-7 w-12 -translate-x-1/2 cursor-pointer items-center justify-center rounded-t-lg border-none bg-(--mantine-color-body) shadow-[0_-2px_8px_rgba(0,0,0,0.08)]"
        aria-label={isCollapsed ? 'Expand sheet' : 'Collapse sheet'}
        onClick={toggleCollapse}
      >
        <CollapseIcon
          size={16}
          className="text-gray-400"
        />
      </button>

      {!isCollapsed && (
        <>
          {/* Drag Handle */}
          <div
            className={`${styles.handle} flex shrink-0 items-center justify-center py-2`}
            {...handleProps}
          >
            <div className="h-1 w-10 rounded-full bg-gray-300" />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            {children}
          </div>
        </>
      )}
    </div>
  )
}
