import { useRef, useEffect, useState } from 'react'
import { BASE_MAP_OPTIONS, type BaseMapMode } from '@/hooks/useBaseMap'

interface BaseMapSelectorProps {
  value: BaseMapMode;
  onChange: (mapMode: BaseMapMode) => void;
}

export function BaseMapSelector({ value, onChange }: BaseMapSelectorProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const current = BASE_MAP_OPTIONS.find((o) => o.id === value)!

  // Close on outside click
  useEffect(() => {
    if (!open) {
      return
    }
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    // Positioned relative to the inset overlay div in MapView
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        bottom: 40,
        right: 16,
      }}
    >
      {/* Dropdown menu — renders above the button */}
      {open && (
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 6px)',
            right: 0,
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 8,
            overflow: 'hidden',
            minWidth: 148,
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          }}
        >
          {BASE_MAP_OPTIONS.map((option) => (
            <button
              key={option.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                width: '100%',
                padding: '9px 14px',
                background: 'transparent',
                border: 'none',
                color: option.id === value
                  ? 'var(--color-accent-hover)'
                  : 'var(--color-text-primary)',
                fontSize: 12,
                fontFamily: 'inherit',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background 0.1s',
              }}
              onClick={() => {
                onChange(option.id)
                setOpen(false)
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-border)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <span style={{ opacity: option.id === value ? 1 : 0 }}>✓</span>
              {option.label}
            </button>
          ))}
        </div>
      )}

      {/* Trigger button */}
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '7px 12px',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 6,
          color: 'var(--color-text-secondary)',
          fontSize: 12,
          fontFamily: 'inherit',
          cursor: 'pointer',
          transition: 'border-color 0.15s, color 0.15s',
          whiteSpace: 'nowrap',
        }}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-accent)'
          e.currentTarget.style.color = 'var(--color-text-primary)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-border)'
          e.currentTarget.style.color = 'var(--color-text-secondary)'
        }}
      >
        🗺 {current.label}
        <span style={{
          fontSize: 9,
          opacity: 0.6,
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.15s',
          display: 'inline-block',
        }}
        >▲</span>
      </button>
    </div>
  )
}
