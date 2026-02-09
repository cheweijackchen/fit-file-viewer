'use client'

import { Text, Card, Slider, Stack, Title } from '@mantine/core'
import { useState } from 'react'
import { HeartRateTrendGraph } from '@/components/HeartRateTrendGraph'
import type { ParsedRecord } from '@/model/fitParser'
import { mockedRecords } from './mockData'

export default function DemoHeartRateTrendGraph() {
  const [restingHeartRateTmp, setRestingHeartRateTmp] = useState(65)
  const [restingHeartRate, setRestingHeartRate] = useState(65)
  const [maxHeartRateTmp, setMaxHeartRateTmp] = useState(195)
  const [maxHeartRate, setMaxHeartRate] = useState(195)

  return (
    <Card>
      <Stack gap="md">
        <Title
          order={3}
        >Heart Rate Trend Graph</Title>
        <div>
          <HeartRateTrendGraph
            records={mockedRecords as ParsedRecord[]}
            restingHeartRate={restingHeartRate}
            maxHeartRate={maxHeartRate}
          />
        </div>
        <div className="max-w-100">
          <div className="flex items-end gap-2">
            <Text size="sm">Resting Heart Rate:</Text>
            <Text fw="bold">{restingHeartRate}</Text>
          </div>
          <Slider
            value={restingHeartRateTmp}
            min={40}
            max={100}
            onChange={setRestingHeartRateTmp}
            onChangeEnd={setRestingHeartRate}
          />
        </div>
        <div className="max-w-100">
          <div className="flex items-end gap-2">
            <Text size="sm">Max Heart Rate: </Text>
            <Text fw="bold">{maxHeartRate}</Text>
          </div>
          <Slider
            value={maxHeartRateTmp}
            min={100}
            max={220}
            onChange={setMaxHeartRateTmp}
            onChangeEnd={setMaxHeartRate}
          />
        </div>
      </Stack>
    </Card>
  )
}
