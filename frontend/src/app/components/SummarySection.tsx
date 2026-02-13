'use client'
import { Card, Stack, Text } from '@mantine/core'
import { IconStopwatch, IconTrendingUp, IconTrendingDown, IconHeartbeat, IconRun, IconRulerMeasure } from '@tabler/icons-react'
import { useFitDataSummary } from '@/hooks/useFitDataSummary'
import useScreen from '@/hooks/useScreen'
export function SummarySection() {
  const { summary } = useFitDataSummary()
  const { onMobile } = useScreen()

  const cardList = [
    {
      name: 'total-distance',
      icon: IconRulerMeasure,
      label: 'Total Distance',
      value: summary.totalDistance?.value ?? '-',
      unit: summary.totalDistance?.unit
    },
    {
      name: 'total-time',
      icon: IconStopwatch,
      label: 'Total Time',
      value: summary.totalTimerTime?.value ?? '-',
      unit: summary.totalTimerTime?.unit
    },
    {
      name: 'average-heart-rate',
      icon: IconHeartbeat,
      label: 'Avg. Heart Rate',
      value: summary.averageHeartRate?.value ?? '-',
      unit: summary.averageHeartRate?.unit
    },
    {
      name: 'average-pace',
      icon: IconRun,
      label: 'Avg. Pace',
      value: summary.averagePace?.value ?? '-',
      unit: '/km'
    },
    {
      name: 'total-ascend',
      icon: IconTrendingUp,
      label: 'Total Ascent',
      value: summary.totalAscent?.value ?? '-',
      unit: summary.totalAscent?.unit
    },
    {
      name: 'total-descent',
      icon: IconTrendingDown,
      label: 'Total Descent',
      value: summary.totalDescent?.value ?? '-',
      unit: summary.totalDescent?.unit
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
                gap="xl"
              >
                {!onMobile && <item.icon
                  size={30}
                  color="var(--mantine-primary-color-filled)"
                  className="mt-4 mx-auto"
                ></item.icon>}
                <div>
                  <div className="flex items-end gap-1">
                    <Text
                      c="bright"
                      size="2xl"
                      fw="bold"
                      className="text-nowrap"
                    >{String(item.value)}</Text>
                    <Text
                      size="sm"
                      c="gray.6"
                      className="text-nowrap"
                    >{item.unit}</Text>
                  </div>
                  <Text
                    size="xs"
                    c="gray.5"
                    fw="bolder"
                    tt="uppercase"
                    className="text-nowrap"
                  >{item.label}</Text>
                </div>
              </Stack>
            </Card>
          )
        })
      }
    </div>
  )
}
