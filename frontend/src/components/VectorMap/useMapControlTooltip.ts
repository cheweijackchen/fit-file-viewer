'use client'

import { useState, useEffect, useRef } from 'react'

interface TooltipState {
  text: string;
  right: number;
  top: number;
}

export function useMapControlTooltip(
  wrapperRef: React.RefObject<HTMLDivElement | null>,
): TooltipState | null {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) {
      return
    }

    function clearTimer() {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }

    function handleMouseOver(e: MouseEvent) {
      const button = (e.target as Element).closest('.maplibregl-ctrl-group button')
      if (!(button instanceof HTMLButtonElement)) {
        return
      }

      // Sync: re-strip title in case MapLibre re-set it (e.g. after fullscreen toggle)
      if (button.title) {
        button.setAttribute('data-mltip', button.title)
        button.removeAttribute('title')
      }

      const text = button.getAttribute('data-mltip') ?? ''
      if (!text) {
        return
      }

      clearTimer()
      timerRef.current = setTimeout(() => {
        const wrapperRect = wrapper.getBoundingClientRect()
        const buttonRect = button.getBoundingClientRect()
        setTooltip({
          text,
          right: wrapperRect.right - buttonRect.left + 8,
          top: buttonRect.top - wrapperRect.top + buttonRect.height / 2,
        })
      }, 750)
    }

    function handleMouseOut(e: MouseEvent) {
      if (!(e.target as Element).closest('.maplibregl-ctrl-group button')) {
        return
      }
      clearTimer()
      setTooltip(null)
    }

    wrapper.addEventListener('mouseover', handleMouseOver)
    wrapper.addEventListener('mouseout', handleMouseOut)

    return () => {
      clearTimer()
      wrapper.removeEventListener('mouseover', handleMouseOver)
      wrapper.removeEventListener('mouseout', handleMouseOut)
      wrapper.querySelectorAll('button[data-mltip]').forEach(btn => {
        btn.setAttribute('title', btn.getAttribute('data-mltip') ?? '')
        btn.removeAttribute('data-mltip')
      })
    }
  }, [wrapperRef])

  return tooltip
}
