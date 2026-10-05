'use client'

import { Card, Loader } from '@mantine/core'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useMapStore } from '@/store/map/useMapStore'

const VectorMapNoSSR = dynamic(
  () => import('@/components/VectorMap').then((mod) => mod.VectorMap),
  {
    ssr: false,
    loading: () => (
      <Card
        radius="md"
        className="w-full h-full"
      >
        <Loader className="m-auto" />
      </Card>
    ),
  },
)

export default function MapPage() {
  const track = useMapStore.use.track()
  const [highlightedIndex] = useState<number | null>(null)

  return (
    <div className="h-[calc(100vh-60px)] w-full">
      <VectorMapNoSSR
        track={track}
        highlightedIndex={highlightedIndex}
      />
    </div>
  )
}
