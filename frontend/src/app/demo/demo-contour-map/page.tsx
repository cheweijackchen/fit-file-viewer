'use client'

import { Card, Loader } from '@mantine/core'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const ContourMapNoSSR = dynamic(
  () => import('@/components/ContourMap/ContourMapView').then((mod) => mod.ContourMapView),
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

export default function DemoContourMap() {
  const [showPeaks, setShowPeaks] = useState(true)

  return (
    <div className="h-[calc(100vh-92px)]">
      <ContourMapNoSSR
        showPeaks={showPeaks}
        onShowPeaksChange={setShowPeaks}
      />
    </div>
  )
}
