import { Stack, Text } from '@mantine/core'

interface Props {
  label: string;
  value: string;
}

export function StatBadge({ label, value }: Props) {
  return (
    <Stack gap={2}>
      <Text
        fz={9}
        c="dimmed"
        tt="uppercase"
        className="tracking-[0.08em]"
      >
        {label}
      </Text>
      <Text
        size="sm"
        fw={600}
      >
        {value}
      </Text>
    </Stack>
  )
}
