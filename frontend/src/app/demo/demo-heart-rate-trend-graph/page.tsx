'use client'

import { Card, Title } from '@mantine/core'
import { HeartRateTrendGraph } from '@/components/HeartRateTrendGraph'
import type { ParsedRecord } from '@/model/fitParser'
import { mockedRecords } from './mockData'

export default function DemoHeartRateTrendGraph() {
  return (
    <Card>
      <Title
        order={3}
        mb="md"
      >Heart Rate Trend Graph</Title>
      <div>
        <HeartRateTrendGraph
          records={mockedRecords as ParsedRecord[]}
          restingHeartRate={65}
          maxHeartRate={195}
        />
      </div>
    </Card>
  )
}
