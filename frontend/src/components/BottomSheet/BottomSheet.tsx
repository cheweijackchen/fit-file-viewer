'use client'

import { useViewportSize } from '@mantine/hooks'
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

  const { height, isDragging, handleProps } = useDragResize({
    defaultHeight,
    minHeight,
    maxHeight,
  })

  return (
    <div
      className={`${styles.sheet} fixed bottom-0 left-0 right-0 z-100 flex flex-col rounded-t-2xl bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)]`}
      style={{ height }}
      data-dragging={isDragging}
    >
      {/* Drag Handle */}
      <div
        className={`${styles.handle} flex shrink-0 items-center justify-center pt-1 pb-2`}
        {...handleProps}
      >
        <div className="h-1 w-10 rounded-full bg-gray-300" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        {children}
      </div>
    </div>
  )
}
