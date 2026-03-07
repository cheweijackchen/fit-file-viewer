'use client'

import { Card, Stack, Title } from '@mantine/core'
import dynamic from 'next/dynamic'
import type { TrackData } from '@/components/Map/FitTrackMap'

const FitTrackMap = dynamic(() => import('@/components/Map/FitTrackMap'), { ssr: false })

const mockTrack: TrackData = {
  id: 'demo-track',
  name: 'Demo Track',
  records: [
    { position_lat: 25.0626, position_long: 121.5375 },
    { position_lat: 25.0625, position_long: 121.5409 },
    { position_lat: 25.0629, position_long: 121.5397 },
    { position_lat: 25.0637, position_long: 121.5382 },
    { position_lat: 25.0643, position_long: 121.5385 },
    { position_lat: 25.0643, position_long: 121.5373 },
    { position_lat: 25.0658, position_long: 121.5366 },
    { position_lat: 25.0682, position_long: 121.5336 },
    { position_lat: 25.0683, position_long: 121.5336 },
    { position_lat: 25.0683, position_long: 121.5331 },
    { position_lat: 25.0703, position_long: 121.5332 },
    { position_lat: 25.0708, position_long: 121.5330 },
    { position_lat: 25.0713, position_long: 121.5327 },
    { position_lat: 25.0720, position_long: 121.5319 },
    { position_lat: 25.0720, position_long: 121.5315 },
    { position_lat: 25.0707, position_long: 121.5282 },
    { position_lat: 25.0684, position_long: 121.5282 },
    { position_lat: 25.0684, position_long: 121.5305 },
    { position_lat: 25.0674, position_long: 121.5305 },
    { position_lat: 25.0674, position_long: 121.5300 },
    { position_lat: 25.0666, position_long: 121.5300 },
    { position_lat: 25.0666, position_long: 121.5305 },
    { position_lat: 25.0644, position_long: 121.5304 },
    { position_lat: 25.0643, position_long: 121.5318 },
    { position_lat: 25.0635, position_long: 121.5317 },
    { position_lat: 25.0636, position_long: 121.5303 },
    { position_lat: 25.0627, position_long: 121.5303 },
    { position_lat: 25.0626, position_long: 121.5333 },
    { position_lat: 25.0635, position_long: 121.5333 },
    { position_lat: 25.0634, position_long: 121.5350 },
    { position_lat: 25.0625, position_long: 121.5350 },
    { position_lat: 25.0625, position_long: 121.5372 },
  ],
}

export default function DemoFitTrackMap() {
  return (
    <Stack gap="md">
      <Title order={3}>FitTrackMap</Title>
      <Card
        padding={0}
        className="overflow-hidden"
      >
        <FitTrackMap
          className="h-[calc(100vh-140px)]"
          tracks={mockTrack}
        />
      </Card>
    </Stack>
  )
}
