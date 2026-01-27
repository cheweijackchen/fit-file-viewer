import { getFilteredChartTooltipPayload } from '@mantine/charts';
import { Flex, getThemeColor, Paper, Text, useMantineTheme } from '@mantine/core';
import { HeartRateZoneAnalyzer } from '@/lib/heartRateZoneAnalyzer';
import { formatElapsedTime } from '@/lib/timeFormatter';


interface ChartTooltipProps {
  label: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: Record<string, any>[] | undefined;
  restingHeartRate: number;
  maxHeartRate: number;
}

export function HeartRateZoneChartTooltip({ label, payload, restingHeartRate, maxHeartRate }: ChartTooltipProps) {
  const theme = useMantineTheme()

  if (!payload) {
    return null;
  }

  const heartRateZoneAnalyzer = new HeartRateZoneAnalyzer(restingHeartRate, maxHeartRate)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const zoneLabel = getFilteredChartTooltipPayload(payload).map((item: any) => {
    const zone = heartRateZoneAnalyzer.getZone(item.value)
    if (zone !== item.name) {
      return
    }

    return <Flex
      key={item.name}
      align="center"
      justify="space-between"
    >
      <Flex
        align="center"
        gap="xs"
        mr="xl"
      >
        <svg className="w-3 h-3 min-w-3 min-h-3">
          <circle
            r={6}
            fill={getThemeColor(item.color, theme)}
            width={12}
            height={12}
            cx={6}
            cy={6}
          />
        </svg>
        <Text
          fz="sm"
          tt="capitalize"
        >
          {item.name}
        </Text>
      </Flex>
      <Text
        fz="sm"
        c="bright"
      >
        {item.value}
      </Text>
    </Flex>
  }).filter(item => item)

  return (
    <Paper
      withBorder
      px="md"
      py="sm"
      shadow="md"
      radius="sm"
      miw={150}
    >
      <Text
        c="bright"
        fw={500}
        mb={5}
      >
        {label && formatElapsedTime(Number(label))}
      </Text>
      {zoneLabel}
    </Paper>
  );
}
