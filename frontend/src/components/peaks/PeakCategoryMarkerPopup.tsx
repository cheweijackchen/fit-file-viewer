import { Button, Text } from '@mantine/core'

interface Props {
  category: string;
  checkedCount: number;
  totalCount: number;
  allChecked: boolean;
  onToggleAll: () => void;
}

export function PeakCategoryMarkerPopup({
  category,
  checkedCount,
  totalCount,
  allChecked,
  onToggleAll,
}: Props) {
  return (
    <div className="flex flex-col gap-1 min-w-32">
      <Text
        fw={700}
        size="sm"
      >
        {category}
      </Text>
      <div className="flex justify-between gap-6">
        <Text
          size="xs"
          c="dimmed"
        >
          完成
        </Text>
        <Text size="xs">{checkedCount} / {totalCount}</Text>
      </div>
      <Button
        fullWidth
        size="xs"
        variant="outline"
        mt={4}
        onClick={onToggleAll}
      >
        {allChecked ? '取消全選' : '全選'}
      </Button>
    </div>
  )
}
