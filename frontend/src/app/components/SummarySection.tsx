'use client'
import { Box, Card, Stack, Text } from '@mantine/core'
import { IconStopwatch, IconTrendingUp, IconTrendingDown, IconHeartbeat, IconRun, IconRulerMeasure } from '@tabler/icons-react';

export function SummarySection () {

  const cardList = [
    {
      name: 'total-time',
      icon: IconStopwatch,
      label: 'Total Time',
      value: '01:00:00'
    },
    {
      name: 'total-ditaance',
      icon: IconRulerMeasure,
      label: 'Total Distance',
      value: '10 km'
    },
    {
      name: 'total-ascend',
      icon: IconTrendingUp,
      label: 'Total Ascent',
      value: '1220 m'
    },
    {
      name: 'total-descent',
      icon: IconTrendingDown,
      label: 'Total Descent',
      value: '300 m'
    },
    {
      name: 'average-pace',
      icon: IconRun,
      label: 'Avg. Pace',
      value: '05:30 /km'
    },
    {
      name: 'average-heart-rate',
      icon: IconHeartbeat,
      label: 'Avg. Heart Rate',
      value: '165 bpm'
    },
  ]

  return (
    <Box className='bg-canvas-body p-4 rounded-xl'>
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
                  <item.icon size={36}></item.icon>
                  <Text size="lg">{item.value}</Text>
                  <Text size="sm">{item.label}</Text>
                </Stack>
              </Card>
            )
          })
        }
      </div>
    </Box>
  )
}
