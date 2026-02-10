import { NumberFormatter, Paper, Text } from '@mantine/core'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: Record<string, any>[] | undefined;
}

export function AltitudeTooltip({ payload }: Props) {

  if (!payload) {
    return null
  }

  return (
    <Paper
      withBorder
      px="md"
      py="sm"
      shadow="md"
      radius="sm"
      miw={110}
    >
      <Text
        c="bright"
        fz="lg"
        fw={500}
        mb={5}
      >
        <NumberFormatter
          thousandSeparator
          value={payload?.[0]?.payload?.altitude}
          suffix=" m"
        />
      </Text>
      <Text
        fz="sm"
        c="bright"
      >
        <NumberFormatter
          value={payload?.[0]?.payload?.distance / 1000}
          suffix=" km"
          decimalScale={2}
        />
      </Text>
    </Paper>
  )
}
