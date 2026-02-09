'use client'

import { Card, Title } from '@mantine/core'
import { HeartRateDonutChart } from '@/components/HeartRateDonutChart'
import type { ParsedRecord } from '@/model/fitParser'
import { mockedRecords } from '../demo-heart-rate-trend-graph/mockData'

export default function DemoHeartRateTrendGraph() {
  return (
    <Card>
      <Title
        order={3}
        mb="md"
      >Heart Rate Donut Chart</Title>
      <div>
        <HeartRateDonutChart
          records={mockedRecords as ParsedRecord[]}
          restingHeartRate={65}
          maxHeartRate={195}
        />
      </div>
    </Card>
  )
}
