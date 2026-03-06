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
    <div className="flex">
      <Sidebar
        track={track}
        parseState={parseState}
        onFile={parseFile}
        onReset={handleReset}
      />

      {/* Right: map + elevation profile */}
      <div className="flex flex-1 column">
        <div className="flex-1 h-[calc(100vh-92px)]">
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
