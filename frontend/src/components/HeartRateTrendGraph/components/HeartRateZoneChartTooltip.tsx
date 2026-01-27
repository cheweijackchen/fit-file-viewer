import { getFilteredChartTooltipPayload } from '@mantine/charts';
import { Flex, getThemeColor, Paper, Text, useMantineTheme } from '@mantine/core';
import { formatElapsedTime } from '@/lib/timeFormatter';


interface ChartTooltipProps {
  label: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: Record<string, any>[] | undefined;
}

export function HeartRateZoneChartTooltip({ label, payload }: ChartTooltipProps) {
  const theme = useMantineTheme()

  if (!payload) {
    return null;
  }

  return (
    <Paper
      withBorder
      px="md"
      py="sm"
      shadow="md"
      radius="md"
      miw={150}
    >
      <Text
        fw={500}
        mb={5}
      >
        {label && formatElapsedTime(Number(label), false)}
      </Text>
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getFilteredChartTooltipPayload(payload).map((item: any) => (
          <Flex
            key={item.name}
            align="center"
            justify="space-between"
          >
            <Flex
              align="center"
              gap="sm"
              mr="sm"
            >
              <svg className="w-4 h-4 min-w-4 min-h-4">
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
        ))
      }
    </Paper>
  );
}
