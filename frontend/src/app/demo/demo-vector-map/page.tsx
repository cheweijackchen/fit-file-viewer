'use client'

import { useCallback, useState } from 'react'
import { MapView } from '@/components/VectorMap/MapView'
import { useGpxParser } from '@/hooks/useGpxParser'

import { Sidebar } from './components/Sidebar'

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
        <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
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
