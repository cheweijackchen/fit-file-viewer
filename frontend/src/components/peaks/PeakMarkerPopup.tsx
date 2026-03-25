import { Button, Text } from '@mantine/core'

interface Props {
  name: string;
  elevation: number;
  category: string;
  isChecked: boolean;
  onToggle: () => void;
}

export function PeakMarkerPopup({
  name,
  elevation,
  category,
  isChecked,
  onToggle,
}: Props) {
  return (
    <div className="flex flex-col gap-1 min-w-32">
      <Text
        fw={700}
        size="sm"
      >
        {name}
      </Text>
      <div className="flex justify-between gap-6">
        <Text
          size="xs"
          c="dimmed"
        >
          海拔
        </Text>
        <Text size="xs">{elevation} m</Text>
      </div>
      <div className="flex justify-between gap-6">
        <Text
          size="xs"
          c="dimmed"
        >
          路線
        </Text>
        <Text size="xs">{category}</Text>
      </div>
      <Button
        fullWidth
        size="xs"
        variant="outline"
        mt={4}
        onClick={onToggle}
      >
        {isChecked ? '移除' : '加入'}
      </Button>
    </div>
  )
}
