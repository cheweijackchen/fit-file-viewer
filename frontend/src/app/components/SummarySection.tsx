'use client'
import { Card, Stack, Text } from '@mantine/core'
import { IconStopwatch, IconTrendingUp, IconTrendingDown, IconHeartbeat, IconRun, IconRulerMeasure } from '@tabler/icons-react';
import { useFitDataSummary } from '@/hooks/useFitDataSummary';
import useScreen from '@/hooks/useScreen';
export function SummarySection() {
  const { summary } = useFitDataSummary()
  const { onMobile } = useScreen()

  const cardList = [
    {
      name: 'total-distance',
      icon: IconRulerMeasure,
      label: 'Total Distance',
      value: summary.totalDistance ?? '-'
    },
    {
      name: 'total-time',
      icon: IconStopwatch,
      label: 'Total Time',
      value: summary.totalTimerTime ?? '-'
    },
    {
      name: 'average-heart-rate',
      icon: IconHeartbeat,
      label: 'Avg. Heart Rate',
      value: summary.averageHeartRate ?? '-'
    },
    {
      name: 'average-pace',
      icon: IconRun,
      label: 'Avg. Pace',
      value: summary.averagePace ?? '-'
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
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {
        cardList.map(item => {
          return (
            <Card
              key={item.name}
              radius="md"
              p="md"
            >
              <Stack
                gap="2xl"
              >
                {!onMobile && <item.icon
                  size={30}
                  color="var(--mantine-primary-color-filled)"
                  className="mt-4 mx-auto"
                ></item.icon>}
                <div>
                  <Text
                    size="xs"
                    c="gray.5"
                    fw="bolder"
                    tt="uppercase"
                    className="text-nowrap"
                  >{item.label}</Text>
                  <Text
                    size="lg"
                    fw="bold"
                    className="text-nowrap"
                  >{String(item.value)}</Text>
                </div>
              </Stack>
            </Card>
          )
        })
      }
    </div>
  )
}
