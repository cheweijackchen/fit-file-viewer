'use client'
import { Card, Stack, Text } from '@mantine/core'
import { IconStopwatch, IconTrendingUp, IconTrendingDown, IconHeartbeat, IconRun, IconRulerMeasure, IconFlame, IconBolt } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useFitDataSummary } from '@/hooks/useFitDataSummary'
import useScreen from '@/hooks/useScreen'
export function SummarySection() {
  const { summary } = useFitDataSummary()
  const { onMobile } = useScreen()
  const t = useTranslations('fit-file-viewer')

  const cardList = [
    {
      name: 'total-distance',
      icon: IconRulerMeasure,
      label: t('summary.totalDistance'),
      value: summary.totalDistance?.value ?? '-',
      unit: summary.totalDistance?.unit
    },
    {
      name: 'total-time',
      icon: IconStopwatch,
      label: t('summary.totalTime'),
      value: summary.totalTimerTime?.value ?? '-',
      unit: summary.totalTimerTime?.unit
    },
    {
      name: 'average-heart-rate',
      icon: IconHeartbeat,
      label: t('summary.avgHeartRate'),
      value: summary.averageHeartRate?.value ?? '-',
      unit: summary.averageHeartRate?.unit
    },
    {
      name: 'average-pace',
      icon: IconRun,
      label: t('summary.avgPace'),
      value: summary.averagePace?.value ?? '-',
      unit: '/km'
    },
    {
      name: 'total-ascend',
      icon: IconTrendingUp,
      label: t('summary.totalAscent'),
      value: summary.totalAscent?.value ?? '-',
      unit: summary.totalAscent?.unit
    },
    {
      name: 'total-descent',
      icon: IconTrendingDown,
      label: t('summary.totalDescent'),
      value: summary.totalDescent?.value ?? '-',
      unit: summary.totalDescent?.unit
    },
    {
      name: 'calories',
      icon: IconFlame,
      label: t('summary.calories'),
      value: summary.calories ?? '-',
      unit: 'kcal'
    },
    {
      name: 'power',
      icon: IconBolt,
      label: t('summary.avgPower'),
      value: summary.power ?? '-',
      unit: 'W'
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
