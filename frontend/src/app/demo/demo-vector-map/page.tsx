'use client'

import { useState, useCallback } from 'react'
// import { ElevationProfile } from '@/components/ElevationProfile'
import { GpxFileUploader } from '@/components/GpxFileUploader'
import { MapView } from '@/components/VectorMap/MapView'
import { useGpxParser } from '@/hooks/useGpxParser'
import { formatDuration } from '@/lib/elevationUtils'
import type { ParsedTrack } from '@/model/gpx'

function StatBadge({ label, value }: { label: string; value: string; }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span
        style={{
          fontSize: 9,
          color: 'var(--color-text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 13,
          color: 'var(--color-text-primary)',
          fontWeight: 600,
        }}
      >
        {value}
      </span>
    </div>
  )
}

interface SidebarProps {
  track: ParsedTrack | null;
  parseState: ReturnType<typeof useGpxParser>['state'];
  onFile: (file: File) => void;
  onReset: () => void;
}

function Sidebar({ track, parseState, onFile, onReset }: SidebarProps) {
  const isParsing = parseState.status === 'parsing'
  const hasError = parseState.status === 'error'

  return (
    <aside
      style={{
        width: 280,
        background: 'var(--color-surface)',
        borderRight: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.05em',
            color: 'var(--color-text-primary)',
          }}
        >
          GPX 3D 軌跡地圖
        </h1>
        <p
          style={{
            margin: '4px 0 0',
            fontSize: 11,
            color: 'var(--color-text-secondary)',
          }}
        >
          上傳 .gpx 檔案以顯示軌跡
        </p>
      </div>

      {/* Uploader */}
      <div style={{ padding: 16 }}>
        <GpxFileUploader
          isParsing={isParsing}
          onFile={onFile}
        />

        {hasError && parseState.status === 'error' && (
          <div
            style={{
              marginTop: 10,
              padding: '8px 12px',
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 6,
              fontSize: 12,
              color: '#f87171',
            }}
          >
            ⚠️ {parseState.message}
          </div>
        )}
      </div>

      {/* Track stats */}
      {track && (
        <div
          style={{
            padding: '0 16px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            overflow: 'auto',
            flex: 1,
          }}
        >
          {/* Track name */}
          <div
            style={{
              padding: '10px 14px',
              background: 'rgba(249,115,22,0.08)',
              border: '1px solid rgba(249,115,22,0.2)',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              color: '#f97316',
              wordBreak: 'break-all',
            }}
          >
            📍 {track.name}
          </div>

          {/* Stats grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px 16px',
              padding: '14px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 8,
              border: '1px solid var(--color-border)',
            }}
          >
            <StatBadge
              label="總距離"
              value={`${track.stats.distance} km`}
            />
            <StatBadge
              label="軌跡點"
              value={`${track.stats.totalPoints.toLocaleString()}`}
            />
            <StatBadge
              label="最高海拔"
              value={`${track.stats.maxElevation} m`}
            />
            <StatBadge
              label="最低海拔"
              value={`${track.stats.minElevation} m`}
            />
            <StatBadge
              label="累積爬升"
              value={`↑ ${track.stats.elevationGain} m`}
            />
            <StatBadge
              label="累積下降"
              value={`↓ ${track.stats.elevationLoss} m`}
            />
            {track.stats.duration !== null && (
              <StatBadge
                label="總時間"
                value={formatDuration(track.stats.duration)}
              />
            )}
          </div>

          {/* Reset button */}
          <button
            style={{
              padding: '8px 0',
              background: 'transparent',
              border: '1px solid var(--color-border)',
              borderRadius: 6,
              color: 'var(--color-text-secondary)',
              fontSize: 12,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'border-color 0.15s, color 0.15s',
            }}
            onClick={onReset}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#ef4444'
              e.currentTarget.style.color = '#ef4444'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)'
              e.currentTarget.style.color = 'var(--color-text-secondary)'
            }}
          >
            ✕ 清除軌跡
          </button>
        </div>
      )}
    </aside>
  )
}

export default function DemoVectorMap() {
  const { state: parseState, parseFile, reset } = useGpxParser()
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)

  const track = parseState.status === 'success' ? parseState.track : null

  const handleReset = useCallback(() => {
    reset()
    setHighlightedIndex(null)
  }, [reset])

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar
        track={track}
        parseState={parseState}
        onFile={parseFile}
        onReset={handleReset}
      />

      {/* Right: map + elevation profile */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <MapView
            track={track}
            highlightedIndex={highlightedIndex}
          />
        </div>

        {/* {track && track.points.some((p) => p.elevation !== null) && (
          <ElevationProfile
            points={track.points}
            highlightedIndex={highlightedIndex}
            onHoverIndex={setHighlightedIndex}
          />
        )} */}
      </div>
    </div>
  )
}
