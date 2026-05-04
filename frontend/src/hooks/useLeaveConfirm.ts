'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

interface UseLeaveConfirmOptions {
  shouldBlock: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: string;
}

type PendingAction =
  | { type: 'navigate'; href: string; }
  | { type: 'back'; }

export function useLeaveConfirm({
  shouldBlock,
  title = '確認離開',
  description = '確定要離開嗎？',
  confirmLabel = '離開',
  cancelLabel = '取消',
  confirmColor = undefined,
}: UseLeaveConfirmOptions) {
  const router = useRouter()
  const [opened, setOpened] = useState(false)
  const pendingActionRef = useRef<PendingAction | null>(null)
  const skipNextPopstateRef = useRef(false)
  const isConfirmingRef = useRef(false)

  // 1. Browser close / refresh
  useEffect(() => {
    if (!shouldBlock) {
      return
    }
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [shouldBlock])

  // 2. Browser back button
  useEffect(() => {
    if (!shouldBlock) {
      return
    }
    window.history.pushState(null, '', window.location.href)
    const handler = () => {
      if (skipNextPopstateRef.current) {
        skipNextPopstateRef.current = false
        return
      }
      window.history.pushState(null, '', window.location.href)
      pendingActionRef.current = { type: 'back' }
      setOpened(true)
    }
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [shouldBlock])

  // 3. All <a> clicks — intercept before Next.js (capture phase)
  useEffect(() => {
    if (!shouldBlock) {
      return
    }
    const handler = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a')
      if (!anchor) {
        return
      }
      const href = anchor.getAttribute('href')
      if (!href) {
        return
      }
      const url = new URL(href, window.location.origin)
      if (url.origin !== window.location.origin) {
        return
      }
      if (url.pathname === window.location.pathname) {
        return
      }
      e.preventDefault()
      e.stopImmediatePropagation()
      pendingActionRef.current = {
        type: 'navigate',
        href 
      }
      setOpened(true)
    }
    document.addEventListener('click', handler, true)
    return () => document.removeEventListener('click', handler, true)
  }, [shouldBlock])

  // 4. Programmatic router.push() — intercept via pushState monkey-patch
  useEffect(() => {
    if (!shouldBlock) {
      return
    }
    const original = window.history.pushState.bind(window.history)
    window.history.pushState = function (...args: Parameters<typeof window.history.pushState>) {
      if (isConfirmingRef.current) {
        return original(...args)
      }
      const newUrl = args[2]
      if (!newUrl) {
        return original(...args)
      }
      const newPathname = new URL(String(newUrl), window.location.origin).pathname
      if (newPathname === window.location.pathname) {
        return original(...args)
      }
      pendingActionRef.current = {
        type: 'navigate',
        href: String(newUrl) 
      }
      setOpened(true)
    }
    return () => {
      window.history.pushState = original
    }
  }, [shouldBlock])

  function onOk() {
    setOpened(false)
    const action = pendingActionRef.current
    pendingActionRef.current = null
    if (action?.type === 'back') {
      skipNextPopstateRef.current = true
      window.history.go(-2)
    } else if (action?.type === 'navigate') {
      isConfirmingRef.current = true
      router.push(action.href)
    }
  }

  function onCancel() {
    setOpened(false)
    pendingActionRef.current = null
  }

  return {
    modalProps: {
      opened,
      title,
      description,
      confirmLabel,
      cancelLabel,
      confirmColor,
      onOk,
      onCancel,
    },
  }
}
