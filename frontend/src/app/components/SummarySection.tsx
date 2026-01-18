'use client'
import { Card, Stack, Text } from '@mantine/core'
import { IconStopwatch, IconTrendingUp, IconTrendingDown, IconHeartbeat, IconRun, IconRulerMeasure } from '@tabler/icons-react';
import { useFitDataSummary } from '@/hooks/useFitDataSummary';
export function SummarySection() {
  const { summary } = useFitDataSummary()

  const cardList = [
    {
      name: 'total-time',
      icon: IconStopwatch,
      label: 'Total Time',
      value: summary.totalTimerTime ?? '-'
    },
    {
      name: 'total-distance',
      icon: IconRulerMeasure,
      label: 'Total Distance',
      value: summary.totalDistance ?? '-'
    },
    {
      name: 'total-ascend',
      icon: IconTrendingUp,
      label: 'Total Ascent',
      value: summary.totalAscent ?? '-'
    },
    {
      name: 'total-descent',
      icon: IconTrendingDown,
      label: 'Total Descent',
      value: summary.totalDescent ?? '-'
    },
    {
      name: 'average-pace',
      icon: IconRun,
      label: 'Avg. Pace',
      value: summary.averagePace ?? '-'
    },
    {
      name: 'average-heart-rate',
      icon: IconHeartbeat,
      label: 'Avg. Heart Rate',
      value: summary.averageHeartRate ?? '-'
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {
        cardList.map(item => {
          return (
            <Card
              key={item.name}
              radius="md"
            >
              <Stack
                align="center"
                gap="0"
              >
                <item.icon size={30}></item.icon>
                <Text
                  size="xl"
                  fw="bold"
                  className="text-nowrap"
                >{String(item.value)}</Text>
                <Text
                  size="sm"
                  className="text-nowrap"
                >{item.label}</Text>
              </Stack>
            </Card>
          )
        })
      }
    </div>
    // </Box>
  )
}
