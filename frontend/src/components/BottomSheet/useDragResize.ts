import { useCallback, useRef, useState } from 'react'

interface UseDragResizeOptions {
  defaultHeight: number;
  minHeight: number;
  maxHeight: number;
}

export function useDragResize({ defaultHeight, minHeight, maxHeight }: UseDragResizeOptions) {
  const [height, setHeight] = useState(defaultHeight)
  const [isDragging, setIsDragging] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const dragRef = useRef({
    startY: 0,
    startHeight: 0,
  })
  const heightBeforeCollapse = useRef(defaultHeight)

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragRef.current = {
      startY: e.clientY,
      startHeight: height,
    }
    setIsDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }, [height])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) {
      return
    }
    const delta = dragRef.current.startY - e.clientY
    const newHeight = Math.min(maxHeight, Math.max(minHeight, dragRef.current.startHeight + delta))
    setHeight(newHeight)
  }, [isDragging, minHeight, maxHeight])

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDragging) {
      return
    }
    setIsDragging(false)
    e.currentTarget.releasePointerCapture(e.pointerId)
  }, [isDragging])

  const toggleCollapse = useCallback(() => {
    if (isCollapsed) {
      setHeight(heightBeforeCollapse.current)
      setIsCollapsed(false)
    } else {
      heightBeforeCollapse.current = height
      setHeight(0)
      setIsCollapsed(true)
    }
  }, [isCollapsed, height])

  const handleProps = {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerUp,
  }

  return {
    height,
    isDragging,
    isCollapsed,
    toggleCollapse,
    handleProps,
  }
}
